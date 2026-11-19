import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import type { RecordItem } from '../api/record';
import dayjs from 'dayjs';
import { nowISO, DATE_FORMAT } from './dateFormats';
import {
  transformImportRecord,
  parseCSVRow,
  detectColumnMapping,
  generateTransformReport,
  type TransformStats,
  type ImportRecord,
} from './categoryTransformer';
import { STORAGE_KEYS, type ImportTransformResult, type ImportStats } from '../types/types';
import { SAVINGS_DATA_KEYS } from './savingsKeys';
import { DATA_VERSION_KEY } from './dataMigration';
import { markStorageDirty } from './storageGuard';

// 构建导出数据结构（复用映射逻辑）
const buildExportData = (records: RecordItem[]) =>
  records.map(record => ({
    '日期': dayjs(record.date).format(DATE_FORMAT.DATETIME_FULL),
    '类型': record.type === 'expense' ? '支出' : '收入',
    '金额': record.amount,
    '分类': record.category,
    '子分类': record.subCategory || '',
    '备注': record.remark || '',
    '账户': record.account || '',
  }));

// 导出为 CSV
export const exportToCSV = (records: RecordItem[], filename: string = '记账记录') => {
  const data = buildExportData(records);
  const csv = Papa.unparse(data);
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}_${dayjs().format(DATE_FORMAT.DATE_KEY)}.csv`;
  link.click();
};

// 导出为 XLSX
export const exportToXLSX = (records: RecordItem[], filename: string = '记账记录') => {
  const data = buildExportData(records);
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '记账记录');
  XLSX.writeFile(wb, `${filename}_${dayjs().format(DATE_FORMAT.DATE_KEY)}.xlsx`);
};

// ==================== 导入功能 ====================

type RawImportRow = Record<string, unknown>;

// 从 CSV 导入
export const importFromCSV = (file: File): Promise<ImportTransformResult> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      encoding: 'UTF-8',
      complete: (results) => {
        try {
          const transformResult = parseAndTransformImportedData(results.data as RawImportRow[]);
          resolve(transformResult);
        } catch (error) {
          reject(error);
        }
      },
      error: (error) => reject(error),
    });
  });
};

// 从 XLSX 导入
export const importFromXLSX = (file: File): Promise<ImportTransformResult> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        const transformResult = parseAndTransformImportedData(jsonData as RawImportRow[]);
        resolve(transformResult);
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => reject(error);
    reader.readAsArrayBuffer(file);
  });
};

// ==================== 日期处理 ====================

// 处理日期格式，确保转换为带时分秒的时间戳
export const parseDate = (dateValue: unknown): number => {
  if (!dateValue) return Date.now();

  // 如果已经是数字（时间戳）
  if (typeof dateValue === 'number') {
    // Excel 日期序列号（通常是 40000-50000 范围内的数字）
    if (dateValue < 100000) {
      const utcDays = dateValue - 25569; // 25569 = days from 1900-01-01 to 1970-01-01
      return utcDays * 24 * 60 * 60 * 1000;
    }
    // Unix 秒时间戳（10位）
    if (dateValue < 10000000000) {
      return dateValue * 1000;
    }
    // Unix 毫秒时间戳（13位）
    return dateValue;
  }

  // 如果是字符串
  if (typeof dateValue === 'string') {
    const trimmed = dateValue.trim();

    // 尝试解析为数字（Excel序列号或时间戳）
    const numValue = parseFloat(trimmed);
    if (!isNaN(numValue) && /^\d+(\.\d+)?$/.test(trimmed)) {
      // Excel 日期序列号
      if (numValue < 100000) {
        const utcDays = numValue - 25569;
        return utcDays * 24 * 60 * 60 * 1000;
      }
      // Unix 秒时间戳
      if (numValue < 10000000000) {
        return numValue * 1000;
      }
      // Unix 毫秒时间戳
      return numValue;
    }

    // 尝试解析日期字符串
    const parsed = dayjs(trimmed);
    if (parsed.isValid()) {
      // 如果只包含年月日（没有时分秒），设置为当天 00:00:00
      const hasTime = /\d{1,2}:\d{2}/.test(trimmed);
      if (!hasTime) {
        return parsed.startOf('day').valueOf();
      }
      return parsed.valueOf();
    }
  }

  return Date.now();
};

// 比较两个日期值，返回数字（用于排序）
// 负数表示 a < b，0 表示相等，正数表示 a > b
export const compareDate = (a: unknown, b: unknown): number => {
  if (a === b) return 0;
  const dateA = parseDate(a);
  const dateB = parseDate(b);
  return dateA - dateB;
};

// 获取日期的时间戳（毫秒）
export const getTimestamp = (dateValue: unknown): number => {
  return parseDate(dateValue);
};

// ==================== 数据解析和转换 ====================

/**
 * 将原始行数据（多种列名）转换为标准 ImportRecord 格式
 */
function toImportRecord(row: RawImportRow): ImportRecord {
  // 解析金额（处理数字或字符串类型）
  let amountStr: string;
  const rawAmount: unknown = row['金额'] || row['amount'] || '0';
  if (typeof rawAmount === 'number') {
    amountStr = rawAmount.toString();
  } else {
    amountStr = String(rawAmount).replace(/[￥,$\s]/g, '');
  }

  // 解析类型
  const typeStr = String(row['类型'] || row['收支类型'] || row['type'] || '').toLowerCase().trim();
  let type: 'expense' | 'income' | undefined;
  if (typeStr.includes('收入') || typeStr.includes('income') || typeStr === '+') {
    type = 'income';
  } else if (typeStr.includes('支出') || typeStr.includes('expense') || typeStr === '-') {
    type = 'expense';
  }

  return {
    category: String(row['分类'] || row['category'] || row['类别'] || row['type'] || ''),
    subCategory: String(row['子分类'] || row['subCategory'] || row['分类小项'] || row['小项'] || ''),
    amount: parseFloat(amountStr) || 0,
    type,
    date: String(row['日期'] || row['记账日期'] || row['date'] || row['时间'] || nowISO()),
    remark: String(row['备注'] || row['remark'] || row['说明'] || ''),
    account: String(row['账户'] || row['account'] || row['支付方式'] || ''),
  };
}

/**
 * 解析并转换导入的数据
 * 复用 categoryTransformer 的分类转换管道
 */
const parseAndTransformImportedData = (data: RawImportRow[]): ImportTransformResult => {
  const records: Partial<RecordItem>[] = [];
  const byCategory: Record<string, number> = {};
  const unmatchedSet = new Set<string>();
  let matchedCount = 0;
  let unmatchedCount = 0;

  // 尝试自动检测列名映射
  const headers = data.length > 0 ? Object.keys(data[0]) : [];
  const autoMapping = detectColumnMapping(headers);

  data.forEach((row, index) => {
    // 先尝试自动检测列名（如果检测成功，使用 categoryTransformer 的 parseCSVRow）
    let importRecord: ImportRecord;
    if (autoMapping.category || autoMapping.amount) {
      // 将 RawImportRow 转换为 string-string 格式给 parseCSVRow
      const stringRow: Record<string, string> = {};
      for (const [key, val] of Object.entries(row)) {
        stringRow[key] = val != null ? String(val) : '';
      }
      importRecord = parseCSVRow(stringRow, {
        category: autoMapping.category || undefined,
        subCategory: autoMapping.subCategory || undefined,
        amount: autoMapping.amount || undefined,
        type: autoMapping.type || undefined,
        date: autoMapping.date || undefined,
        remark: autoMapping.remark || undefined,
        account: autoMapping.account || undefined,
      });
    } else {
      // 无法自动检测，使用硬编码列名兼容
      importRecord = toImportRecord(row);
    }

    // 跳过无效记录
    if (importRecord.amount <= 0) return;

    // 解析日期
    const dateTimestamp = parseDate(importRecord.date);

    // 复用 categoryTransformer 的分类转换
    const result = transformImportRecord(importRecord, 'expense');

    if (result.isMatched) {
      matchedCount++;
      byCategory[result.record.category] = (byCategory[result.record.category] || 0) + 1;
    } else {
      unmatchedCount++;
      if (result.record.originalCategory) {
        unmatchedSet.add(result.record.originalCategory);
      }
    }

    records.push({
      id: `imported_${Date.now()}_${index}`,
      type: result.record.type,
      category: result.record.category,
      subCategory: result.record.subCategory ?? undefined,
      categoryIcon: result.record.categoryIcon,
      subCategoryIcon: result.record.subCategoryIcon ?? undefined,
      amount: result.record.amount,
      remark: result.record.remark,
      date: dateTimestamp,
      account: result.record.account,
    });
  });

  const stats: ImportStats = {
    total: records.length,
    matched: matchedCount,
    unmatched: unmatchedCount,
    byCategory,
    unmatchedCategories: Array.from(unmatchedSet),
  };

  return { records, stats };
};

/**
 * 生成导入报告（复用 categoryTransformer 的 generateTransformReport）
 * @param stats 导入统计
 * @returns 报告文本
 */
export const generateImportReport = (stats: ImportStats): string => {
  const transformStats: TransformStats = {
    total: stats.total,
    matched: stats.matched,
    unmatched: stats.unmatched,
    byCategory: stats.byCategory,
    unmatchedCategories: stats.unmatchedCategories,
  };
  return generateTransformReport(transformStats);
};

// ==================== 全量备份（导出/导入 JSON，可完美复现） ====================

const BACKUP_APP = 'stardew-ledger';
const BACKUP_TYPE = 'full-backup';
const BACKUP_VERSION = 1;

// 全量备份覆盖的存储键：全部业务数据 + 会话 + 迁移版本标记，
// 恢复后应用状态与导出时完全一致
const FULL_BACKUP_KEYS: string[] = [
  STORAGE_KEYS.RECORDS,
  STORAGE_KEYS.USER,
  STORAGE_KEYS.ACCESS_TOKEN,
  STORAGE_KEYS.REFRESH_TOKEN,
  STORAGE_KEYS.TOKEN_EXPIRES,
  STORAGE_KEYS.CATEGORIES,
  STORAGE_KEYS.BUDGETS,
  STORAGE_KEYS.QUICK_RECORDS,
  STORAGE_KEYS.FRIDGE_ITEMS,
  ...SAVINGS_DATA_KEYS,
  DATA_VERSION_KEY,
];

export interface FullBackupFile {
  app: string;
  type: string;
  version: number;
  exportedAt: string;
  data: Record<string, unknown>;
}

export interface FullImportResult {
  restoredKeys: string[];
  recordCount: number;
  exportedAt: string;
}

/** 导出全量数据为 JSON 备份文件（下载） */
export const exportFullBackup = (): void => {
  const data: Record<string, unknown> = {};
  for (const key of FULL_BACKUP_KEYS) {
    const raw = localStorage.getItem(key);
    if (raw === null) continue;
    try {
      data[key] = JSON.parse(raw);
    } catch {
      data[key] = raw; // 非标准 JSON 的原始值原样保留
    }
  }

  const backup: FullBackupFile = {
    app: BACKUP_APP,
    type: BACKUP_TYPE,
    version: BACKUP_VERSION,
    exportedAt: nowISO(),
    data,
  };

  const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `星露账本备份_${dayjs().format('YYYYMMDD_HHmmss')}.json`;
  link.click();
  URL.revokeObjectURL(url);
};

/** 校验备份文件结构，非法时抛出带说明的错误 */
const validateBackupFile = (parsed: unknown): FullBackupFile => {
  if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
    throw new Error('文件内容不是有效的备份数据');
  }
  const file = parsed as Partial<FullBackupFile>;
  if (file.app !== BACKUP_APP || file.type !== BACKUP_TYPE) {
    throw new Error('不是本应用的备份文件（缺少应用标识）');
  }
  if (typeof file.version !== 'number' || typeof file.data !== 'object' || file.data === null) {
    throw new Error('备份文件版本或数据结构异常');
  }
  if (file.version > BACKUP_VERSION) {
    throw new Error(`备份文件版本过新（v${file.version}），请先升级应用`);
  }
  return file as FullBackupFile;
};

/**
 * 从 JSON 备份文件恢复全量数据（覆盖式写入 localStorage）
 * 返回恢复摘要；调用方应在确认后刷新页面使全部视图与数据一致
 */
export const importFullBackup = async (file: File): Promise<FullImportResult> => {
  const text = await file.text();
  let parsed: unknown;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('备份文件不是有效的 JSON 格式');
  }

  const backup = validateBackupFile(parsed);

  const restoredKeys: string[] = [];
  for (const key of FULL_BACKUP_KEYS) {
    if (!(key in backup.data)) continue;
    const value = backup.data[key];
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
    restoredKeys.push(key);
  }

  // 恢复后立即刷新影子快照，保持守护层与真实数据一致
  markStorageDirty();

  const records = localStorage.getItem(STORAGE_KEYS.RECORDS);
  let recordCount = 0;
  try {
    const parsedRecords = records ? JSON.parse(records) : [];
    if (Array.isArray(parsedRecords)) recordCount = parsedRecords.length;
  } catch {
    recordCount = 0;
  }

  return {
    restoredKeys,
    recordCount,
    exportedAt: backup.exportedAt,
  };
};

export default {
  exportToCSV,
  exportToXLSX,
  importFromCSV,
  importFromXLSX,
  parseDate,
  compareDate,
  getTimestamp,
  generateImportReport,
  exportFullBackup,
  importFullBackup,
};
