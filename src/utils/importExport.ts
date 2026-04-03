import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import type { RecordItem } from '../api/record';
import dayjs from 'dayjs';
import {
  matchCategory,
  getCategoryMapping,
  getSubCategoryMapping,
  getCategoryIcon,
  normalizeCategoryName,
  normalizeSubCategoryName,
  type CategoryMapping,
  type SubCategoryMapping,
} from '../constants/categoryIconMapping';

// ==================== 导出功能 ====================

// 导出为 CSV
export const exportToCSV = (records: RecordItem[], filename: string = '记账记录') => {
  const data = records.map(record => ({
    '日期': dayjs(record.date).format('YYYY-MM-DD HH:mm:ss'),
    '类型': record.type === 'expense' ? '支出' : '收入',
    '金额': record.amount,
    '分类': record.category,
    '子分类': record.subCategory || '',
    '备注': record.remark || '',
    '账户': record.account || '',
  }));

  const csv = Papa.unparse(data);
  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}_${dayjs().format('YYYY-MM-DD')}.csv`;
  link.click();
};

// 导出为 XLSX
export const exportToXLSX = (records: RecordItem[], filename: string = '记账记录') => {
  const data = records.map(record => ({
    '日期': dayjs(record.date).format('YYYY-MM-DD HH:mm:ss'),
    '类型': record.type === 'expense' ? '支出' : '收入',
    '金额': record.amount,
    '分类': record.category,
    '子分类': record.subCategory || '',
    '备注': record.remark || '',
    '账户': record.account || '',
  }));

  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, '记账记录');
  XLSX.writeFile(wb, `${filename}_${dayjs().format('YYYY-MM-DD')}.xlsx`);
};

// ==================== 导入功能 ====================

/**
 * 导入转换结果
 */
export interface ImportTransformResult {
  /** 转换后的记录 */
  records: Partial<RecordItem>[];
  /** 转换统计 */
  stats: ImportStats;
}

/**
 * 导入统计
 */
export interface ImportStats {
  /** 总记录数 */
  total: number;
  /** 成功匹配数 */
  matched: number;
  /** 未匹配数 */
  unmatched: number;
  /** 按主分类统计 */
  byCategory: Record<string, number>;
  /** 未匹配的原始分类列表 */
  unmatchedCategories: string[];
}

// 从 CSV 导入
export const importFromCSV = (file: File): Promise<ImportTransformResult> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      encoding: 'UTF-8',
      complete: (results) => {
        try {
          const transformResult = parseAndTransformImportedData(results.data as Record<string, string>[]);
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
        const transformResult = parseAndTransformImportedData(jsonData as Record<string, string>[]);
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
 * 解析并转换导入的数据
 * 将外部数据格式转换为项目标准格式，同时进行分类映射
 */
const parseAndTransformImportedData = (data: Record<string, string>[]): ImportTransformResult => {
  const records: Partial<RecordItem>[] = [];
  const byCategory: Record<string, number> = {};
  const unmatchedSet = new Set<string>();
  let matchedCount = 0;
  let unmatchedCount = 0;

  data.forEach((row, index) => {
    // 解析金额（处理数字或字符串类型）
    let amountStr: string;
    const rawAmount = row['金额'] || row['amount'] || '0';
    if (typeof rawAmount === 'number') {
      amountStr = rawAmount.toString();
    } else {
      amountStr = String(rawAmount).replace(/[￥,$\s]/g, '');
    }
    const amount = parseFloat(amountStr) || 0;

    // 跳过无效记录
    if (amount <= 0) return;

    // 解析类型
    const typeStr = (row['类型'] || row['收支类型'] || row['type'] || '').toLowerCase().trim();
    let type: 'expense' | 'income' = 'expense';
    if (typeStr.includes('收入') || typeStr.includes('income') || typeStr === '+') {
      type = 'income';
    }

    // 解析分类（支持多种列名）
    const categoryInput = (row['分类'] || row['category'] || row['类别'] || row['类型'] || '').trim();
    const subCategoryInput = (row['子分类'] || row['子类别'] || row['subCategory'] || row['分类小项'] || row['小项'] || '').trim();

    // 解析备注和账户
    const remark = (row['备注'] || row['remark'] || row['说明'] || '').trim();
    const account = (row['账户'] || row['account'] || row['支付方式'] || row['备注'] || '现金').trim();

    // 解析日期
    const dateValue = row['日期'] || row['记账日期'] || row['date'] || row['时间'];
    const dateTimestamp = parseDate(dateValue);

    // 使用分类映射进行转换
    const categoryMatch = matchCategory(categoryInput, subCategoryInput || undefined);

    let finalCategory: string;
    let finalSubCategory: string | undefined;
    let finalCategoryIcon: string;
    let finalSubCategoryIcon: string | undefined;
    let isMatched: boolean;
    let finalRemark = remark;

    if (categoryMatch.mainCategory) {
      // 成功匹配到分类
      finalCategory = categoryMatch.mainCategory.standardName;
      finalCategoryIcon = categoryMatch.mainCategory.defaultIcon;

      if (categoryMatch.subCategory) {
        // 匹配到子分类
        finalSubCategory = categoryMatch.subCategory.name;
        finalSubCategoryIcon = categoryMatch.subCategory.defaultIcon;
      } else {
        // 只匹配到主分类，没有子分类
        finalSubCategory = undefined;
        finalSubCategoryIcon = undefined;
      }

      isMatched = true;
      matchedCount++;

      // 统计
      byCategory[finalCategory] = (byCategory[finalCategory] || 0) + 1;
    } else {
      // 未匹配到分类，使用默认分类
      const defaultCategory = type === 'expense' ? '其他支出' : '礼金';
      const defaultMapping = getCategoryMapping(defaultCategory)!;

      finalCategory = defaultMapping.standardName;
      finalCategoryIcon = defaultMapping.defaultIcon;
      finalSubCategory = undefined;
      finalSubCategoryIcon = undefined;

      // 在备注中标注原始分类
      if (categoryInput) {
        finalRemark = remark ? `${remark} (原分类: ${categoryInput}${subCategoryInput ? `/${subCategoryInput}` : ''})` : `(原分类: ${categoryInput})`;
      }

      isMatched = false;
      unmatchedCount++;
      if (categoryInput) {
        unmatchedSet.add(categoryInput);
      }
    }

    records.push({
      id: `imported_${Date.now()}_${index}`,
      type,
      category: finalCategory,
      subCategory: finalSubCategory,
      categoryIcon: finalCategoryIcon,
      subCategoryIcon: finalSubCategoryIcon,
      amount,
      remark: finalRemark,
      date: dateTimestamp,
      account,
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
 * 生成导入报告
 * @param stats 导入统计
 * @returns 报告文本
 */
export const generateImportReport = (stats: ImportStats): string => {
  const lines: string[] = [];
  lines.push('=== 数据导入报告 ===');
  lines.push('');
  lines.push(`总记录数: ${stats.total}`);
  lines.push(`成功匹配: ${stats.matched} (${((stats.matched / stats.total) * 100).toFixed(1)}%)`);
  lines.push(`未匹配: ${stats.unmatched} (${((stats.unmatched / stats.total) * 100).toFixed(1)}%)`);
  lines.push('');

  if (Object.keys(stats.byCategory).length > 0) {
    lines.push('按分类统计:');
    Object.entries(stats.byCategory)
      .sort((a, b) => b[1] - a[1])
      .forEach(([cat, count]) => {
        lines.push(`  ${cat}: ${count}条`);
      });
    lines.push('');
  }

  if (stats.unmatchedCategories.length > 0) {
    lines.push('未匹配的分类:');
    stats.unmatchedCategories.forEach(cat => {
      lines.push(`  - ${cat}`);
    });
    lines.push('');
    lines.push('提示: 未匹配的分类已归入"其他支出"或"礼金"，并在备注中标注原始分类。');
  }

  return lines.join('\n');
};

// ==================== 兼容旧代码的辅助函数 ====================

// 解析导入的数据（兼容旧接口，返回记录数组）
const parseImportedData = (data: Record<string, string>[]): Partial<RecordItem>[] => {
  const result = parseAndTransformImportedData(data);
  return result.records;
};

// 根据分类获取图标（兼容旧代码）
const getCategoryIconLegacy = (category: string): string => {
  return getCategoryIcon(category);
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
};
