/**
 * 数据导入分类转换工具
 * 将导入的数据分类映射到项目标准分类和子分类
 */

import {
  matchCategory,
  normalizeCategoryName,
  normalizeSubCategoryName,
  getCategoryMapping,
  getSubCategoryMapping,
  type CategoryMapping,
  type SubCategoryMapping,
} from '../constants/categoryIconMapping';

/**
 * 导入记录的数据结构
 */
export interface ImportRecord {
  /** 分类名称 */
  category?: string;
  /** 子分类名称 */
  subCategory?: string;
  /** 金额 */
  amount: number;
  /** 类型：expense-支出，income-收入 */
  type?: 'expense' | 'income';
  /** 日期 */
  date: string;
  /** 备注 */
  remark?: string;
  /** 账户 */
  account?: string;
}

/**
 * 转换后的记录数据结构
 */
export interface TransformedRecord {
  /** 标准主分类名称 */
  category: string;
  /** 标准子分类名称 */
  subCategory: string | null;
  /** 主分类英文名称（用于CDN） */
  categoryEnglishName: string;
  /** 子分类英文名称（用于CDN） */
  subCategoryEnglishName: string | null;
  /** 分类图标 */
  categoryIcon: string;
  /** 子分类图标 */
  subCategoryIcon: string | null;
  /** 金额 */
  amount: number;
  /** 类型：expense-支出，income-收入 */
  type: 'expense' | 'income';
  /** 日期 */
  date: string;
  /** 备注 */
  remark: string;
  /** 账户 */
  account: string;
  /** 是否成功匹配 */
  isMatched: boolean;
  /** 原始分类名称 */
  originalCategory: string;
  /** 原始子分类名称 */
  originalSubCategory: string | null;
}

/**
 * 转换统计信息
 */
export interface TransformStats {
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

/**
 * 单条记录的转换结果
 */
export interface TransformResult {
  /** 转换后的记录 */
  record: TransformedRecord;
  /** 是否成功匹配 */
  isMatched: boolean;
  /** 匹配信息 */
  matchInfo?: {
    mainCategory: CategoryMapping;
    subCategory: SubCategoryMapping | null;
  };
}

/**
 * 转换单条导入记录
 * @param record 导入的记录
 * @param defaultType 默认类型（当记录没有type时使用）
 * @returns 转换结果
 */
export function transformImportRecord(
  record: ImportRecord,
  defaultType: 'expense' | 'income' = 'expense'
): TransformResult {
  const categoryInput = (record.category || '').trim();
  const subCategoryInput = (record.subCategory || '').trim();

  // 如果没有提供分类，使用默认分类
  if (!categoryInput) {
    const defaultCategory = defaultType === 'expense' ? '其他支出' : '礼金';
    const mapping = getCategoryMapping(defaultCategory)!;

    return {
      record: {
        category: mapping.standardName,
        subCategory: null,
        categoryEnglishName: mapping.englishName,
        subCategoryEnglishName: null,
        categoryIcon: mapping.defaultIcon,
        subCategoryIcon: null,
        amount: record.amount,
        type: defaultType,
        date: record.date,
        remark: record.remark || '',
        account: record.account || '现金',
        isMatched: false,
        originalCategory: categoryInput,
        originalSubCategory: subCategoryInput || null,
      },
      isMatched: false,
    };
  }

  // 智能匹配分类和子分类
  const match = matchCategory(categoryInput, subCategoryInput || undefined);

  if (match.mainCategory) {
    // 成功匹配
    const mainCategory = match.mainCategory;
    const subCategory = match.subCategory;

    // 确定类型：优先使用匹配到的分类类型，其次使用记录中的类型，最后使用默认类型
    const finalType = mainCategory.type || record.type || defaultType;

    return {
      record: {
        category: mainCategory.standardName,
        subCategory: subCategory?.name || null,
        categoryEnglishName: mainCategory.englishName,
        subCategoryEnglishName: subCategory?.englishName || null,
        categoryIcon: mainCategory.defaultIcon,
        subCategoryIcon: subCategory?.defaultIcon || null,
        amount: record.amount,
        type: finalType,
        date: record.date,
        remark: record.remark || '',
        account: record.account || '现金',
        isMatched: true,
        originalCategory: categoryInput,
        originalSubCategory: subCategoryInput || null,
      },
      isMatched: true,
      matchInfo: {
        mainCategory,
        subCategory,
      },
    };
  }

  // 未匹配到分类，使用"其他"分类
  const otherCategory = defaultType === 'expense'
    ? getCategoryMapping('其他支出')!
    : getCategoryMapping('礼金')!;

  return {
    record: {
      category: otherCategory.standardName,
      subCategory: null,
      categoryEnglishName: otherCategory.englishName,
      subCategoryEnglishName: null,
      categoryIcon: otherCategory.defaultIcon,
      subCategoryIcon: null,
      amount: record.amount,
      type: defaultType,
      date: record.date,
      remark: record.remark || `原分类: ${categoryInput}${subCategoryInput ? `/${subCategoryInput}` : ''}`,
      account: record.account || '现金',
      isMatched: false,
      originalCategory: categoryInput,
      originalSubCategory: subCategoryInput || null,
    },
    isMatched: false,
  };
}

/**
 * 批量转换导入记录
 * @param records 导入的记录列表
 * @param defaultType 默认类型
 * @returns 转换后的记录列表和统计信息
 */
export function transformImportRecords(
  records: ImportRecord[],
  defaultType: 'expense' | 'income' = 'expense'
): {
  records: TransformedRecord[];
  stats: TransformStats;
  unmatchedRecords: TransformedRecord[];
} {
  const transformedRecords: TransformedRecord[] = [];
  const unmatchedRecords: TransformedRecord[] = [];
  const byCategory: Record<string, number> = {};
  const unmatchedSet = new Set<string>();

  let matchedCount = 0;
  let unmatchedCount = 0;

  for (const record of records) {
    const result = transformImportRecord(record, defaultType);
    transformedRecords.push(result.record);

    if (result.isMatched) {
      matchedCount++;
      // 统计按主分类
      const catName = result.record.category;
      byCategory[catName] = (byCategory[catName] || 0) + 1;
    } else {
      unmatchedCount++;
      unmatchedRecords.push(result.record);
      if (result.record.originalCategory) {
        unmatchedSet.add(result.record.originalCategory);
      }
    }
  }

  const stats: TransformStats = {
    total: records.length,
    matched: matchedCount,
    unmatched: unmatchedCount,
    byCategory,
    unmatchedCategories: Array.from(unmatchedSet),
  };

  return {
    records: transformedRecords,
    stats,
    unmatchedRecords,
  };
}

/**
 * 从CSV行数据转换
 * @param row CSV行数据（对象形式）
 * @param columnMapping 列名映射配置
 * @returns 导入记录格式
 */
export function parseCSVRow(
  row: Record<string, string>,
  columnMapping: {
    category?: string;
    subCategory?: string;
    amount?: string;
    type?: string;
    date?: string;
    remark?: string;
    account?: string;
  } = {}
): ImportRecord {
  const {
    category = '分类',
    subCategory = '子分类',
    amount = '金额',
    type = '类型',
    date = '日期',
    remark = '备注',
    account = '账户',
  } = columnMapping;

  // 解析金额（处理各种格式）
  const amountStr = row[amount]?.replace(/[￥,$\s]/g, '').trim() || '0';
  const parsedAmount = parseFloat(amountStr) || 0;

  // 解析类型
  let parsedType: 'expense' | 'income' | undefined;
  const typeStr = row[type]?.toLowerCase().trim() || '';
  if (typeStr.includes('支出') || typeStr.includes('expense') || typeStr === '-') {
    parsedType = 'expense';
  } else if (typeStr.includes('收入') || typeStr.includes('income') || typeStr === '+') {
    parsedType = 'income';
  }

  return {
    category: row[category]?.trim(),
    subCategory: row[subCategory]?.trim(),
    amount: parsedAmount,
    type: parsedType,
    date: row[date]?.trim() || new Date().toISOString(),
    remark: row[remark]?.trim(),
    account: row[account]?.trim(),
  };
}

/**
 * 自动检测CSV列名映射
 * @param headers CSV表头数组
 * @returns 检测到的列名映射
 */
export function detectColumnMapping(headers: string[]): {
  category: string | null;
  subCategory: string | null;
  amount: string | null;
  type: string | null;
  date: string | null;
  remark: string | null;
  account: string | null;
} {
  const mapping = {
    category: null as string | null,
    subCategory: null as string | null,
    amount: null as string | null,
    type: null as string | null,
    date: null as string | null,
    remark: null as string | null,
    account: null as string | null,
  };

  const lowerHeaders = headers.map(h => h.toLowerCase().trim());

  // 分类列检测
  const categoryPatterns = ['分类', 'category', '类别', 'type', '种类', '项目'];
  mapping.category = headers.find((h, i) =>
    categoryPatterns.some(p => lowerHeaders[i].includes(p.toLowerCase()))
  ) || null;

  // 子分类列检测
  const subCategoryPatterns = ['子分类', 'subcategory', '子类别', '子项', '二级分类'];
  mapping.subCategory = headers.find((h, i) =>
    subCategoryPatterns.some(p => lowerHeaders[i].includes(p.toLowerCase()))
  ) || null;

  // 金额列检测
  const amountPatterns = ['金额', 'amount', 'money', 'price', 'cost', 'sum', '总数', '数额'];
  mapping.amount = headers.find((h, i) =>
    amountPatterns.some(p => lowerHeaders[i].includes(p.toLowerCase()))
  ) || null;

  // 类型列检测
  const typePatterns = ['类型', 'type', '收支', '收入支出', 'income_expense'];
  mapping.type = headers.find((h, i) =>
    typePatterns.some(p => lowerHeaders[i].includes(p.toLowerCase()))
  ) || null;

  // 日期列检测
  const datePatterns = ['日期', 'date', '时间', 'time', 'datetime', '年月日'];
  mapping.date = headers.find((h, i) =>
    datePatterns.some(p => lowerHeaders[i].includes(p.toLowerCase()))
  ) || null;

  // 备注列检测
  const remarkPatterns = ['备注', 'remark', 'note', 'notes', 'comment', '描述', '说明'];
  mapping.remark = headers.find((h, i) =>
    remarkPatterns.some(p => lowerHeaders[i].includes(p.toLowerCase()))
  ) || null;

  // 账户列检测
  const accountPatterns = ['账户', 'account', '支付方式', '付款方式', '银行卡', '钱包'];
  mapping.account = headers.find((h, i) =>
    accountPatterns.some(p => lowerHeaders[i].includes(p.toLowerCase()))
  ) || null;

  return mapping;
}

/**
 * 生成转换报告
 * @param stats 转换统计信息
 * @returns 报告文本
 */
export function generateTransformReport(stats: TransformStats): string {
  const lines: string[] = [];
  lines.push('=== 数据导入转换报告 ===');
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
}

export default {
  transformImportRecord,
  transformImportRecords,
  parseCSVRow,
  detectColumnMapping,
  generateTransformReport,
};
