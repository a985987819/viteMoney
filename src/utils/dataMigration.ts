import { STORAGE_KEYS } from '../types/types';
import { safeJsonParse, safeJsonArrayParse } from './storage';
import type { RecordItem } from '../api/record';
import type { Category } from '../api/category';
import type { SavingsPlan } from '../api/savings';

const DATA_VERSION_KEY = 'money_data_version';
const SAVINGS_PLANS_KEY = 'savings_plans';
const SAVINGS_DEPOSITS_KEY = 'savings_deposits';
const SAVINGS_ACTIVE_PLAN_KEY = 'savings_active_plan_id';

export const CURRENT_DATA_VERSION = 1;

export function validateRecordItem(record: unknown): boolean {
  if (!record || typeof record !== 'object') return false;
  const r = record as Record<string, unknown>;
  return (
    typeof r.id === 'string' &&
    (r.type === 'expense' || r.type === 'income') &&
    typeof r.category === 'string' &&
    typeof r.categoryIcon === 'string' &&
    typeof r.amount === 'number' &&
    !isNaN(r.amount) &&
    (r.date === undefined || typeof r.date === 'number') &&
    (r.remark === undefined || typeof r.remark === 'string') &&
    (r.account === undefined || typeof r.account === 'string')
  );
}

export function validateBudget(budget: unknown): boolean {
  if (!budget || typeof budget !== 'object') return false;
  const b = budget as Record<string, unknown>;
  return (
    typeof b.year === 'number' &&
    !isNaN(b.year) &&
    typeof b.month === 'number' &&
    !isNaN(b.month) &&
    typeof b.amount === 'number' &&
    !isNaN(b.amount)
  );
}

export function validateCategoryMap(categories: unknown): boolean {
  if (!categories || typeof categories !== 'object' || Array.isArray(categories)) return false;
  const catMap = categories as Record<string, unknown>;
  const requiredTypes = ['expense', 'income'];
  for (const type of requiredTypes) {
    if (!Array.isArray(catMap[type])) return false;
    for (const cat of catMap[type] as unknown[]) {
      if (!cat || typeof cat !== 'object') return false;
      const c = cat as Record<string, unknown>;
      if (typeof c.id !== 'string' || typeof c.name !== 'string') return false;
    }
  }
  return true;
}

export function validateQuickRecord(record: unknown): boolean {
  if (!record || typeof record !== 'object') return false;
  const r = record as Record<string, unknown>;
  return (
    typeof r.id === 'string' &&
    typeof r.categoryId === 'string' &&
    typeof r.subCategoryId === 'string' &&
    typeof r.amount === 'number' &&
    !isNaN(r.amount) &&
    (r.type === 'expense' || r.type === 'income') &&
    typeof r.order === 'number'
  );
}

export function validateFridgeItem(item: unknown): boolean {
  if (!item || typeof item !== 'object') return false;
  const i = item as Record<string, unknown>;
  return (
    typeof i.id === 'string' &&
    typeof i.name === 'string' &&
    typeof i.quantity === 'string' &&
    typeof i.purchaseDate === 'string' &&
    typeof i.progress === 'number' &&
    !isNaN(i.progress) &&
    typeof i.createdAt === 'string' &&
    typeof i.updatedAt === 'string'
  );
}

export function validateSavingsPlan(plan: unknown): boolean {
  if (!plan || typeof plan !== 'object') return false;
  const p = plan as Record<string, unknown>;
  return (
    typeof p.id === 'string' &&
    typeof p.name === 'string' &&
    typeof p.targetAmount === 'number' &&
    !isNaN(p.targetAmount) &&
    typeof p.savedAmount === 'number' &&
    !isNaN(p.savedAmount) &&
    typeof p.startDate === 'string' &&
    typeof p.endDate === 'string' &&
    (p.status === 'active' || p.status === 'completed' || p.status === 'failed') &&
    typeof p.createdAt === 'string' &&
    typeof p.updatedAt === 'string'
  );
}

export function repairRecords(): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.RECORDS);
    const records = safeJsonArrayParse<RecordItem>(raw);
    if (records.length === 0) return;

    const repaired = records
      .filter((r) => {
        if (!r || typeof r !== 'object') return false;
        if (typeof r.id !== 'string' || !r.id) return false;
        if (r.type !== 'expense' && r.type !== 'income') return false;
        if (typeof r.amount !== 'number' || isNaN(r.amount)) return false;
        return true;
      })
      .map((r) => ({
        id: r.id,
        type: r.type,
        category: typeof r.category === 'string' ? r.category : '其他',
        subCategory: r.subCategory,
        categoryIcon: typeof r.categoryIcon === 'string' ? r.categoryIcon : 'other',
        subCategoryIcon: r.subCategoryIcon,
        amount: typeof r.amount === 'number' ? r.amount : 0,
        remark: typeof r.remark === 'string' ? r.remark : '',
        date: typeof r.date === 'number' ? r.date : Date.now(),
        account: typeof r.account === 'string' ? r.account : '默认账户',
      }));

    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(repaired));
    console.log(`[Migration] 记录数据修复完成，有效记录: ${repaired.length}/${records.length}`);
  } catch (e) {
    console.error('[Migration] 修复记录数据失败:', e);
  }
}

export function repairBudgets(): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.BUDGETS);
    const budgets = safeJsonArrayParse<Record<string, unknown>>(raw);
    if (budgets.length === 0) return;

    const repaired = budgets
      .filter((b) => {
        if (!b || typeof b !== 'object') return false;
        if (typeof b.year !== 'number' || isNaN(b.year)) return false;
        if (typeof b.month !== 'number' || isNaN(b.month)) return false;
        if (typeof b.amount !== 'number' || isNaN(b.amount)) return false;
        return true;
      })
      .map((b) => ({
        id: typeof b.id === 'string' ? b.id : undefined,
        year: b.year as number,
        month: b.month as number,
        amount: b.amount as number,
      }));

    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(repaired));
    console.log(`[Migration] 预算数据修复完成，有效预算: ${repaired.length}/${budgets.length}`);
  } catch (e) {
    console.error('[Migration] 修复预算数据失败:', e);
  }
}

export function repairCategories(): void {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
    if (!raw) return;

    const parsed = safeJsonParse<Record<string, unknown> | null>(raw, null);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
      console.log('[Migration] 分类数据无效，已清除以恢复默认');
      return;
    }

    const repaired: Record<string, unknown[]> = {};
    for (const [type, cats] of Object.entries(parsed)) {
      if (!Array.isArray(cats)) continue;
      const validCats = cats
        .filter((c) => c && typeof c === 'object' && typeof (c as Record<string, unknown>).id === 'string' && typeof (c as Record<string, unknown>).name === 'string')
        .map((c) => {
          const cat = c as Record<string, unknown>;
          return {
            id: cat.id,
            name: cat.name,
            icon: typeof cat.icon === 'string' ? cat.icon : 'other',
            type: cat.type || type,
            subCategories: Array.isArray(cat.subCategories)
              ? cat.subCategories
                  .filter((s: unknown) => s && typeof s === 'object' && typeof (s as Record<string, unknown>).id === 'string' && typeof (s as Record<string, unknown>).name === 'string')
                  .map((s: unknown) => {
                    const sub = s as Record<string, unknown>;
                    return {
                      id: sub.id,
                      name: sub.name,
                      icon: typeof sub.icon === 'string' ? sub.icon : 'other',
                    };
                  })
              : [],
          } as Category;
        });
      if (validCats.length > 0) {
        repaired[type] = validCats;
      }
    }

    if (Object.keys(repaired).length > 0) {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(repaired));
      console.log('[Migration] 分类数据修复完成');
    } else {
      localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
      console.log('[Migration] 分类数据修复后为空，已清除以恢复默认');
    }
  } catch (e) {
    console.error('[Migration] 修复分类数据失败:', e);
  }
}

function migrateV0ToV1(): void {
  try {
    console.log('[Migration] 开始 V0 → V1 迁移...');

    repairRecords();
    repairBudgets();
    repairCategories();

    const rawQuickRecords = localStorage.getItem(STORAGE_KEYS.QUICK_RECORDS);
    if (rawQuickRecords) {
      const quickRecords = safeJsonArrayParse<Record<string, unknown>>(rawQuickRecords);
      const valid = quickRecords.filter(validateQuickRecord);
      if (valid.length !== quickRecords.length) {
        localStorage.setItem(STORAGE_KEYS.QUICK_RECORDS, JSON.stringify(valid));
        console.log(`[Migration] 快捷记账数据清理完成，有效: ${valid.length}/${quickRecords.length}`);
      }
    }

    const rawFridgeItems = localStorage.getItem(STORAGE_KEYS.FRIDGE_ITEMS);
    if (rawFridgeItems) {
      const fridgeItems = safeJsonArrayParse<Record<string, unknown>>(rawFridgeItems);
      const valid = fridgeItems.filter(validateFridgeItem);
      if (valid.length !== fridgeItems.length) {
        localStorage.setItem(STORAGE_KEYS.FRIDGE_ITEMS, JSON.stringify(valid));
        console.log(`[Migration] 冰箱物品数据清理完成，有效: ${valid.length}/${fridgeItems.length}`);
      }
    }

    const rawSavingsPlans = localStorage.getItem(SAVINGS_PLANS_KEY);
    if (rawSavingsPlans) {
      const plans = safeJsonArrayParse<SavingsPlan>(rawSavingsPlans);
      const valid = plans.filter(validateSavingsPlan);
      if (valid.length !== plans.length) {
        localStorage.setItem(SAVINGS_PLANS_KEY, JSON.stringify(valid));
        console.log(`[Migration] 攒钱计划数据清理完成，有效: ${valid.length}/${plans.length}`);
      }
    }

    localStorage.setItem(DATA_VERSION_KEY, JSON.stringify({
      version: 1,
      lastMigrated: new Date().toISOString(),
    }));

    console.log('[Migration] V0 → V1 迁移完成');
  } catch (e) {
    console.error('[Migration] V0 → V1 迁移失败:', e);
  }
}

export function migrateData(): void {
  try {
    const versionRaw = localStorage.getItem(DATA_VERSION_KEY);
    const versionInfo = safeJsonParse<{ version: number; lastMigrated: string } | null>(versionRaw, null);
    const currentVersion = versionInfo?.version ?? 0;

    if (currentVersion >= CURRENT_DATA_VERSION) {
      console.log(`[Migration] 数据版本已是最新 (${currentVersion})，无需迁移`);
      return;
    }

    console.log(`[Migration] 检测到数据版本 ${currentVersion}，需要迁移到 ${CURRENT_DATA_VERSION}`);

    const backup = backupAllData();
    localStorage.setItem('money_data_backup', backup);
    console.log('[Migration] 迁移前已自动备份数据');

    if (currentVersion < 1) {
      migrateV0ToV1();
    }

    console.log('[Migration] 数据迁移全部完成');
  } catch (e) {
    console.error('[Migration] 数据迁移失败:', e);
  }
}

export function backupAllData(): string {
  const backup: Record<string, unknown> = {};
  try {
    const allKeys = [
      STORAGE_KEYS.RECORDS,
      STORAGE_KEYS.USER,
      STORAGE_KEYS.ACCESS_TOKEN,
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.TOKEN_EXPIRES,
      STORAGE_KEYS.CATEGORIES,
      STORAGE_KEYS.BUDGETS,
      STORAGE_KEYS.QUICK_RECORDS,
      STORAGE_KEYS.FRIDGE_ITEMS,
      SAVINGS_PLANS_KEY,
      SAVINGS_DEPOSITS_KEY,
      SAVINGS_ACTIVE_PLAN_KEY,
      DATA_VERSION_KEY,
    ];

    for (const key of allKeys) {
      const value = localStorage.getItem(key);
      if (value !== null) {
        try {
          backup[key] = JSON.parse(value);
        } catch {
          backup[key] = value;
        }
      }
    }

    console.log('[Migration] 数据备份完成');
  } catch (e) {
    console.error('[Migration] 数据备份失败:', e);
  }
  return JSON.stringify(backup);
}

export function restoreAllData(jsonString: string): boolean {
  try {
    const backup = JSON.parse(jsonString);
    if (!backup || typeof backup !== 'object' || Array.isArray(backup)) {
      console.error('[Migration] 备份数据格式无效');
      return false;
    }

    const allKeys = [
      STORAGE_KEYS.RECORDS,
      STORAGE_KEYS.USER,
      STORAGE_KEYS.ACCESS_TOKEN,
      STORAGE_KEYS.REFRESH_TOKEN,
      STORAGE_KEYS.TOKEN_EXPIRES,
      STORAGE_KEYS.CATEGORIES,
      STORAGE_KEYS.BUDGETS,
      STORAGE_KEYS.QUICK_RECORDS,
      STORAGE_KEYS.FRIDGE_ITEMS,
      SAVINGS_PLANS_KEY,
      SAVINGS_DEPOSITS_KEY,
      SAVINGS_ACTIVE_PLAN_KEY,
      DATA_VERSION_KEY,
    ];

    for (const key of allKeys) {
      if (key in backup) {
        const value = backup[key];
        localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
      } else {
        localStorage.removeItem(key);
      }
    }

    console.log('[Migration] 数据恢复完成');
    return true;
  } catch (e) {
    console.error('[Migration] 数据恢复失败:', e);
    return false;
  }
}

export function initializeDataStore(): void {
  try {
    console.log('[Migration] 初始化数据存储...');
    migrateData();
    console.log('[Migration] 数据存储初始化完成');
  } catch (e) {
    console.error('[Migration] 数据存储初始化失败:', e);
  }
}
