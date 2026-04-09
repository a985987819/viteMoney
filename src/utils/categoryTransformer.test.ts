import { describe, it, expect } from 'vitest';
import {
  transformImportRecord,
  transformImportRecords,
  parseCSVRow,
  detectColumnMapping,
  generateTransformReport,
} from './categoryTransformer';

describe('transformImportRecord', () => {
  it('should exactly match a known category', () => {
    const record = {
      date: '2026-01-15',
      amount: 35.5,
      category: '餐饮',
    };

    const result = transformImportRecord(record);

    expect(result.record.category).toBe('餐饮');
    expect(result.record.amount).toBe(35.5);
    expect(result.isMatched).toBe(true);
  });

  it('should match synonym category (吃午饭 -> 餐饮)', () => {
    const record = {
      date: '2026-01-15',
      amount: 35.5,
      category: '吃午饭',
    };

    const result = transformImportRecord(record);

    expect(result.record.category).toBe('餐饮');
    expect(result.isMatched).toBe(true);
  });

  it('should fall back to 其他支出 for unmatched expense category', () => {
    const record = {
      date: '2026-01-15',
      amount: 100,
      category: '未知分类',
      type: 'expense' as const,
    };

    const result = transformImportRecord(record);

    expect(result.record.category).toBe('其他支出');
    expect(result.isMatched).toBe(false);
    expect(result.record.originalCategory).toBe('未知分类');
  });

  it('should fall back to 礼金 for unmatched income category', () => {
    const record = {
      date: '2026-01-15',
      amount: 500,
      category: '未知收入',
    };

    const result = transformImportRecord(record, 'income');

    expect(result.record.category).toBe('礼金');
    expect(result.isMatched).toBe(false);
    expect(result.record.originalCategory).toBe('未知收入');
  });

  it('should use default category when category is empty', () => {
    const record = {
      date: '2026-01-15',
      amount: 50,
      category: '',
    };

    const result = transformImportRecord(record);

    expect(result.record.category).toBe('其他支出');
    expect(result.isMatched).toBe(false);
  });

  it('should handle subCategory mapping', () => {
    const record = {
      date: '2026-01-15',
      amount: 30,
      category: '餐饮',
      subCategory: '午餐',
    };

    const result = transformImportRecord(record);

    expect(result.record.category).toBe('餐饮');
    expect(result.isMatched).toBe(true);
  });
});

describe('transformImportRecords', () => {
  it('should batch transform records and return correct stats', () => {
    const records = [
      { date: '2026-01-10', amount: 30, category: '餐饮' },
      { date: '2026-01-11', amount: 15, category: '吃晚饭' },
      { date: '2026-01-12', amount: 20, category: '打车' },
      { date: '2026-01-13', amount: 200, category: '工资', type: 'income' as const },
      { date: '2026-01-14', amount: 45, category: '无效分类' },
      { date: '2026-01-15', amount: 60, category: '' },
    ];

    const result = transformImportRecords(records);

    expect(result.records.length).toBe(6);
    expect(result.stats.total).toBe(6);
    expect(result.stats.matched).toBeGreaterThan(0);
    expect(result.stats.unmatched).toBeGreaterThanOrEqual(2);
    expect(result.unmatchedRecords.length).toBe(result.stats.unmatched);
    expect(result.records[0].category).toBe('餐饮');
    expect(result.records[1].category).toBe('餐饮');
    expect(result.records[2].category).toBe('交通');
  });
});

describe('parseCSVRow', () => {
  it('should parse a row with default column mapping (standard columns)', () => {
    const row = {
      日期: '2026-03-01',
      金额: '50',
      分类: '餐饮',
      备注: '备注信息',
      类型: '支出',
      子分类: '',
      账户: '微信',
    };

    const result = parseCSVRow(row);

    expect(result.date).toBe('2026-03-01');
    expect(result.amount).toBe(50);
    expect(result.category).toBe('餐饮');
    expect(result.remark).toBe('备注信息');
    expect(result.type).toBe('expense');
    expect(result.account).toBe('微信');
  });

  it('should parse a row with custom column mapping', () => {
    const row = {
      A: '2026-03-01',
      B: '50',
      C: '餐饮',
      D: '备注信息',
    };

    const result = parseCSVRow(row, {
      date: 'A',
      amount: 'B',
      category: 'C',
      remark: 'D',
    });

    expect(result.date).toBe('2026-03-01');
    expect(result.amount).toBe(50);
    expect(result.category).toBe('餐饮');
    expect(result.remark).toBe('备注信息');
  });

  it('should handle currency symbols in amount', () => {
    const row = {
      日期: '2026-03-01',
      金额: '$50.00',
      分类: '餐饮',
      备注: '',
      类型: '',
      子分类: '',
      账户: '',
    };

    const result = parseCSVRow(row);

    expect(result.amount).toBe(50);
  });

  it('should handle dollar sign and spaces in amount', () => {
    const row = {
      日期: '2026-03-01',
      金额: ' $ 100 ',
      分类: '餐饮',
      备注: '',
      类型: '',
      子分类: '',
      账户: '',
    };

    const result = parseCSVRow(row);

    expect(result.amount).toBe(100);
  });
});

describe('detectColumnMapping', () => {
  it('should detect Chinese column names', () => {
    const headers = ['日期', '金额', '分类', '备注', '类型'];

    const mapping = detectColumnMapping(headers);

    expect(mapping.date).toBe('日期');
    expect(mapping.amount).toBe('金额');
    expect(mapping.category).toBe('分类');
    expect(mapping.remark).toBe('备注');
    expect(mapping.type).toBe('类型');
  });

  it('should detect English column names', () => {
    const headers = ['date', 'amount', 'category', 'note', 'type'];

    const mapping = detectColumnMapping(headers);

    expect(mapping.date).toBe('date');
    expect(mapping.amount).toBe('amount');
    expect(mapping.category).toBe('category');
    expect(mapping.remark).toBe('note');
    expect(mapping.type).toBe('type');
  });

  it('should return null for unrecognized columns', () => {
    const headers = ['col1', 'col2', 'col3'];

    const mapping = detectColumnMapping(headers);

    expect(mapping.date).toBeNull();
    expect(mapping.amount).toBeNull();
    expect(mapping.category).toBeNull();
  });
});

describe('generateTransformReport', () => {
  it('should generate report with all matched', () => {
    const stats = {
      total: 10,
      matched: 10,
      unmatched: 0,
      byCategory: { 餐饮: 5, 交通: 5 },
      unmatchedCategories: [],
    };

    const report = generateTransformReport(stats);

    expect(report).toContain('总记录数: 10');
    expect(report).toContain('成功匹配: 10');
    expect(report).toContain('未匹配: 0');
    expect(report).toContain('餐饮');
    expect(report).toContain('交通');
  });

  it('should generate report with unmatched categories', () => {
    const stats = {
      total: 10,
      matched: 7,
      unmatched: 3,
      byCategory: { 餐饮: 7 },
      unmatchedCategories: ['未知A', '未知B'],
    };

    const report = generateTransformReport(stats);

    expect(report).toContain('成功匹配: 7');
    expect(report).toContain('未匹配: 3');
    expect(report).toContain('未匹配的分类');
    expect(report).toContain('未知A');
    expect(report).toContain('未知B');
  });
});
