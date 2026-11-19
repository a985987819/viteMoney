/**
 * 本地数据守护层
 *
 * 背景风险（PWA 主屏/快捷方式场景）：
 * - iOS Safari 对 7 天不活跃的站点会清除脚本可写的存储（localStorage 全灭）
 * - Android Chrome 在存储压力下会驱逐 best-effort 存储
 * - localStorage 与迁移备份同源同桶，用户清除站点数据时一起消失
 *
 * 策略：
 * 1. navigator.storage.persist() 申请持久化授权，浏览器承诺不自动驱逐
 * 2. 所有核心 localStorage 写入后，防抖写入 IndexedDB 影子快照（latest + 每日滚动 7 份）
 * 3. 启动时若检测到 localStorage 数据被清（seal 标记存在但键缺失），
 *    自动从 IndexedDB 快照恢复
 *
 * 不引入 SQLite 的原因：
 * - 部署在 GitHub Pages（无法设置 COOP/COEP 响应头），wa-sqlite 等依赖
 *   SharedArrayBuffer 的方案无法运行
 * - iOS 16.4 以下无 OPFS 同步 access handle，官方 SQLite WASM VFS 无法持久化
 * - sql.js 是内存库，持久化仍需手动写回 IndexedDB，只换引擎不解决丢失问题
 */

import { STORAGE_KEYS } from '../types/types';
import { SAVINGS_DATA_KEYS } from './savingsKeys';

const DB_NAME = 'money-app-db';
const DB_VERSION = 1;
const SNAPSHOT_STORE = 'snapshots';
const LATEST_SNAPSHOT_ID = 'latest';
const DAILY_SNAPSHOT_PREFIX = 'daily_';
const DAILY_SNAPSHOT_KEEP = 7; // 滚动保留最近 7 天快照
const MARK_DIRTY_DELAY = 800; // 写入防抖（ms）

// seal 标记：快照成功写入过一次即置位，用于区分"被清"与"新用户"
const SEAL_KEY = 'money_storage_guard_sealed';

// 参与快照的数据键（含攒钱三键、日程与迁移元数据；不含会话 token——恢复会话风险大于收益）
const SNAPSHOT_KEYS = [
  STORAGE_KEYS.RECORDS,
  STORAGE_KEYS.USER,
  STORAGE_KEYS.CATEGORIES,
  STORAGE_KEYS.BUDGETS,
  STORAGE_KEYS.QUICK_RECORDS,
  STORAGE_KEYS.FRIDGE_ITEMS,
  STORAGE_KEYS.SCHEDULES,
  ...SAVINGS_DATA_KEYS,
  'money_data_version',
] as string[];

interface SnapshotRecord {
  id: string;
  data: Record<string, string | null>;
  createdAt: number;
}

let dbPromise: Promise<IDBDatabase | null> | null = null;
let markDirtyTimer: ReturnType<typeof setTimeout> | null = null;
let persistRequested = false;

/** 打开（或创建）快照库，失败返回 null（隐私模式等场景静默降级） */
function openSnapshotDB(): Promise<IDBDatabase | null> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve) => {
      try {
        if (typeof indexedDB === 'undefined') {
          resolve(null);
          return;
        }
        const request = indexedDB.open(DB_NAME, DB_VERSION);
        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains(SNAPSHOT_STORE)) {
            db.createObjectStore(SNAPSHOT_STORE, { keyPath: 'id' });
          }
        };
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => resolve(null);
      } catch {
        resolve(null);
      }
    });
  }
  return dbPromise;
}

function withStore<T>(
  mode: IDBTransactionMode,
  run: (store: IDBObjectStore) => IDBRequest<T> | void
): Promise<T | null> {
  return openSnapshotDB().then(
    (db) =>
      new Promise<T | null>((resolve) => {
        if (!db) {
          resolve(null);
          return;
        }
        try {
          const tx = db.transaction(SNAPSHOT_STORE, mode);
          const store = tx.objectStore(SNAPSHOT_STORE);
          const request = run(store);
          let result: T | null = null;
          if (request && 'onsuccess' in request) {
            (request as IDBRequest<T>).onsuccess = () => {
              result = request.result;
            };
          }
          tx.oncomplete = () => resolve(result);
          tx.onerror = () => resolve(null);
          tx.onabort = () => resolve(null);
        } catch {
          resolve(null);
        }
      })
  );
}

/** 收集当前全部受保护键的原始值 */
function collectSnapshotData(): Record<string, string | null> {
  const data: Record<string, string | null> = {};
  for (const key of SNAPSHOT_KEYS) {
    data[key] = localStorage.getItem(key);
  }
  return data;
}

async function takeSnapshot(): Promise<void> {
  const now = Date.now();
  const data = collectSnapshotData();

  // latest：始终指向最新状态
  await withStore('readwrite', (store) => {
    store.put({ id: LATEST_SNAPSHOT_ID, data, createdAt: now } satisfies SnapshotRecord);
  });

  // daily：每日一份，滚动保留最近 7 天（回滚兜底）
  const dayId = `${DAILY_SNAPSHOT_PREFIX}${new Date(now).toISOString().slice(0, 10)}`;
  const existingDay = await withStore<SnapshotRecord>('readonly', (store) => store.get(dayId));
  if (!existingDay) {
    await withStore('readwrite', (store) => {
      store.put({ id: dayId, data, createdAt: now } satisfies SnapshotRecord);
    });
    // 清理超出保留期的每日快照
    const allKeys = await withStore<IDBValidKey[]>('readonly', (store) => store.getAllKeys());
    if (allKeys) {
      const dayKeys = allKeys
        .filter((k): k is string => typeof k === 'string' && k.startsWith(DAILY_SNAPSHOT_PREFIX))
        .sort()
        .reverse();
      for (const staleKey of dayKeys.slice(DAILY_SNAPSHOT_KEEP)) {
        await withStore('readwrite', (store) => {
          store.delete(staleKey);
        });
      }
    }
  }

  try {
    localStorage.setItem(SEAL_KEY, now.toString());
  } catch {
    // localStorage 写 seal 失败（满/被清），快照仍在 IDB 中
  }
}

/**
 * 核心数据发生变化时调用：防抖后刷新影子快照
 * 挂在 storage.ts / savings.ts 等写入函数尾部，调用方无需 await
 */
export function markStorageDirty(): void {
  if (markDirtyTimer) clearTimeout(markDirtyTimer);
  markDirtyTimer = setTimeout(() => {
    markDirtyTimer = null;
    void takeSnapshot().catch(() => {/* 静默：快照失败不影响主流程 */});
  }, MARK_DIRTY_DELAY);
}

/** 立即固化一份快照（跳过防抖），供启动链使用 */
export function snapshotNow(): Promise<void> {
  return takeSnapshot().catch(() => {/* 静默 */});
}

/** 用户主动清空数据时，同步清除影子快照，避免下次启动被"恢复"回来 */
export async function purgeSnapshots(): Promise<void> {
  if (markDirtyTimer) {
    clearTimeout(markDirtyTimer);
    markDirtyTimer = null;
  }
  await withStore('readwrite', (store) => {
    store.clear();
  });
  try {
    localStorage.removeItem(SEAL_KEY);
  } catch {
    // ignore
  }
}

/**
 * 启动时检测 localStorage 是否被外部清除（iOS 系统清理/清站点数据），
 * 若快照存在则自动恢复。返回是否执行了恢复。
 */
export async function restoreIfErased(): Promise<boolean> {
  let sealed = false;
  try {
    sealed = localStorage.getItem(SEAL_KEY) !== null;
  } catch {
    return false;
  }
  if (!sealed) return false; // 新设备/首次使用，无恢复必要

  // 核心键被整体清除才视为"被清"；存在但为空可能是用户主动清空记录
  const coreMissing = SNAPSHOT_KEYS.some((key) => {
    try {
      return localStorage.getItem(key) === null;
    } catch {
      return false;
    }
  });
  if (!coreMissing) return false;

  const latest = await withStore<SnapshotRecord>('readonly', (store) => store.get(LATEST_SNAPSHOT_ID));
  if (!latest || !latest.data) return false;

  let restoredCount = 0;
  for (const [key, value] of Object.entries(latest.data)) {
    if (value === null) continue;
    try {
      localStorage.setItem(key, value);
      restoredCount++;
    } catch {
      // 单键恢复失败不阻断
    }
  }
  if (restoredCount > 0) {
    console.info(`[StorageGuard] 检测到本地数据被清除，已从快照恢复 ${restoredCount} 项数据`);
    await takeSnapshot(); // 恢复后立即固化新快照
    return true;
  }
  return false;
}

/**
 * 申请持久化存储授权：授予后浏览器承诺不自动清除本应用数据
 * （iOS PWA 主屏模式授予率高；Chrome 按站点参与度决定）
 */
export async function requestPersistentStorage(): Promise<boolean> {
  if (persistRequested) return false;
  persistRequested = true;
  try {
    if (typeof navigator === 'undefined' || !navigator.storage) return false;
    if (navigator.storage.persisted) {
      const already = await navigator.storage.persisted();
      if (already) return true;
    }
    if (!navigator.storage.persist) return false;
    const granted = await navigator.storage.persist();
    console.info(`[StorageGuard] 持久化存储授权: ${granted ? '已授予' : '未授予（数据仍受影子快照保护）'}`);
    return granted;
  } catch {
    return false;
  }
}

/** 供调试/设置页展示的存储健康状态 */
export async function getStorageHealth(): Promise<{
  persisted: boolean;
  quotaBytes: number | null;
  usageBytes: number | null;
}> {
  try {
    const persisted = navigator.storage?.persisted ? await navigator.storage.persisted() : false;
    const estimate = navigator.storage?.estimate ? await navigator.storage.estimate() : null;
    return {
      persisted,
      quotaBytes: estimate?.quota ?? null,
      usageBytes: estimate?.usage ?? null,
    };
  } catch {
    return { persisted: false, quotaBytes: null, usageBytes: null };
  }
}
