import { describe, it, expect } from 'vitest';
import {
  transformImportRecord,
  parseCSVRow,
  detectColumnMapping,
  generateTransformReport,
  type ImportRecord,
} from './categoryTransformer';

describe('transformImportRecord - 边界值和异常处理', () => {
  it('应该处理空记录对象', () => {
    const result = transformImportRecord({} as ImportRecord);
    expect(result.isMatched).toBe(false);
    expect(result.record.amount).toBeUndefined();
  });

  it('应该处理 null 值', () => {
    const result = transformImportRecord({
      category: null as any,
      subCategory: null as any,
      amount: null as any,
      type: null as any,
      date: null as any,
    });
    expect(result.isMatched).toBe(false);
  });

  it('应该处理 undefined 值', () => {
    const result = transformImportRecord({
      category: undefined,
      subCategory: undefined,
      amount: undefined as any,
      type: undefined,
      date: undefined as any,
    });
    expect(result.isMatched).toBe(false);
  });

  it('应该处理极大金额', () => {
    const result = transformImportRecord({
      category: '餐饮',
      amount: 999999999999.99,
      type: 'expense',
      date: '2024-01-15',
    });
    expect(result.record.amount).toBe(999999999999.99);
  });

  it('应该处理极小金额', () => {
    const result = transformImportRecord({
      category: '餐饮',
      amount: 0.01,
      type: 'expense',
      date: '2024-01-15',
    });
    expect(result.record.amount).toBe(0.01);
  });

  it('应该处理负数金额', () => {
    const result = transformImportRecord({
      category: '退款',
      amount: -100,
      type: 'income',
      date: '2024-01-15',
    });
    expect(result.record.amount).toBe(-100);
  });

  it('应该处理零金额', () => {
    const result = transformImportRecord({
      category: '测试',
      amount: 0,
      type: 'expense',
      date: '2024-01-15',
    });
    expect(result.record.amount).toBe(0);
  });

  it('应该处理包含特殊字符的分类', () => {
    const result = transformImportRecord({
      category: '餐饮<special>"test"',
      amount: 100,
      type: 'expense',
      date: '2024-01-15',
    });
    expect(result.record.originalCategory).toBe('餐饮<special>"test"');
  });

  it('应该处理超长分类名称', () => {
    const longCategory = '餐饮'.repeat(100);
    const result = transformImportRecord({
      category: longCategory,
      amount: 100,
      type: 'expense',
      date: '2024-01-15',
    });
    expect(result.record.originalCategory).toBe(longCategory);
  });

  it('应该处理包含换行符的备注', () => {
    const result = transformImportRecord({
      category: '餐饮',
      amount: 100,
      type: 'expense',
      date: '2024-01-15',
      remark: '备注\n换行\r\n测试',
    });
    expect(result.record.remark).toBe('备注\n换行\r\n测试');
  });

  it('应该处理空字符串分类（使用默认）', () => {
    const result = transformImportRecord({
      category: '',
      amount: 100,
      type: 'expense',
      date: '2024-01-15',
    });
    expect(result.isMatched).toBe(false);
    expect(result.record.category).toBeDefined();
  });

  it('应该处理只有空格的分类', () => {
    const result = transformImportRecord({
      category: '   ',
      amount: 100,
      type: 'expense',
      date: '2024-01-15',
    });
    expect(result.isMatched).toBe(false);
  });

  it('应该处理无效日期格式', () => {
    const result = transformImportRecord({
      category: '餐饮',
      amount: 100,
      type: 'expense',
      date: 'invalid-date',
    });
    expect(result.record.date).toBe('invalid-date');
  });

  it('应该处理多种日期格式', () => {
    const dates = [
      '2024-01-15',
      '2024/01/15',
      '15-01-2024',
      'Jan 15, 2024',
      '2024年1月15日',
    ];
    dates.forEach(date => {
      const result = transformImportRecord({
        category: '餐饮',
        amount: 100,
        type: 'expense',
        date,
      });
      expect(result.record.date).toBe(date);
    });
  });
});

describe('parseCSVRow - 边界值和异常处理', () => {
  it('应该处理空行数据', () => {
    const result = parseCSVRow({}, {});
    // 空行数据时，category 会是 undefined（因为使用了 optional chaining）
    expect(result.category).toBeUndefined();
    expect(result.amount).toBe(0);
  });

  it('应该处理所有字段都缺失', () => {
    const result = parseCSVRow(
      { '日期': '', '金额': '', '类型': '', '分类': '' },
      {}
    );
    expect(result.category).toBe('');
    expect(result.amount).toBe(0);
  });

  it('应该处理金额包含货币符号', () => {
    const result = parseCSVRow(
      { '金额': '￥100.50', '日期': '2024-01-15' },
      { amount: '金额' }
    );
    expect(result.amount).toBe(100.5);
  });

  it('应该处理金额包含逗号分隔符', () => {
    const result = parseCSVRow(
      { '金额': '1,000.50', '日期': '2024-01-15' },
      { amount: '金额' }
    );
    expect(result.amount).toBe(1000.5);
  });

  it('应该处理金额包含空格', () => {
    const result = parseCSVRow(
      { '金额': ' 100.50 ', '日期': '2024-01-15' },
      { amount: '金额' }
    );
    expect(result.amount).toBe(100.5);
  });

  it('应该处理无效金额字符串', () => {
    const result = parseCSVRow(
      { '金额': 'invalid', '日期': '2024-01-15' },
      { amount: '金额' }
    );
    expect(result.amount).toBe(0);
  });

  it('应该处理空金额', () => {
    const result = parseCSVRow(
      { '金额': '', '日期': '2024-01-15' },
      { amount: '金额' }
    );
    expect(result.amount).toBe(0);
  });

  it('应该处理类型缩写', () => {
    const types = [
      { input: '支出', expected: 'expense' },
      { input: '收入', expected: 'income' },
      { input: 'expense', expected: 'expense' },
      { input: 'income', expected: 'income' },
      { input: '-', expected: 'expense' },
      { input: '+', expected: 'income' },
    ];
    types.forEach(({ input, expected }) => {
      const result = parseCSVRow(
        { '类型': input, '日期': '2024-01-15' },
        { type: '类型' }
      );
      expect(result.type).toBe(expected);
    });
  });

  it('应该处理无效类型', () => {
    const result = parseCSVRow(
      { '类型': 'invalid', '日期': '2024-01-15' },
      { type: '类型' }
    );
    expect(result.type).toBeUndefined();
  });

  it('应该处理包含特殊字符的备注', () => {
    const result = parseCSVRow(
      { '备注': '测试<>&"\'备注', '日期': '2024-01-15' },
      { remark: '备注' }
    );
    expect(result.remark).toBe('测试<>&"\'备注');
  });
});

describe('detectColumnMapping - 边界值和异常处理', () => {
  it('应该处理空表头数组', () => {
    const result = detectColumnMapping([]);
    expect(result.category).toBeNull();
    expect(result.amount).toBeNull();
  });

  it('应该处理 null 表头', () => {
    // null 表头会抛出错误，这是预期行为
    expect(() => detectColumnMapping(null as any)).toThrow();
  });

  it('应该处理 undefined 表头', () => {
    // undefined 表头会抛出错误，这是预期行为
    expect(() => detectColumnMapping(undefined as any)).toThrow();
  });

  it('应该处理包含空字符串的表头', () => {
    const result = detectColumnMapping(['', '日期', '', '金额']);
    expect(result.date).toBe('日期');
    expect(result.amount).toBe('金额');
  });

  it('应该处理大小写混合的表头', () => {
    const result = detectColumnMapping(['DATE', 'Amount', 'CATEGORY', 'Type']);
    expect(result.date).toBe('DATE');
    expect(result.amount).toBe('Amount');
    expect(result.category).toBe('CATEGORY');
  });

  it('应该处理包含空格的表头', () => {
    const result = detectColumnMapping([' 日期 ', ' 金额 ', ' 分类 ']);
    expect(result.date).toBe(' 日期 ');
  });

  it('应该处理多种可能的列名', () => {
    const variations = [
      { headers: ['日期', '金额', '分类'], expected: { date: '日期', amount: '金额', category: '分类' } },
      { headers: ['date', 'amount', 'category'], expected: { date: 'date', amount: 'amount', category: 'category' } },
      { headers: ['时间', 'money', '类别'], expected: { date: '时间', amount: 'money', category: '类别' } },
      { headers: ['记账日期', '金额', '支出类型'], expected: { date: '记账日期', amount: '金额', type: '支出类型' } },
    ];
    variations.forEach(({ headers, expected }) => {
      const result = detectColumnMapping(headers);
      if (expected.date) expect(result.date).toBe(expected.date);
      if (expected.amount) expect(result.amount).toBe(expected.amount);
      if (expected.category) expect(result.category).toBe(expected.category);
      if (expected.type) expect(result.type).toBe(expected.type);
    });
  });

  it('应该处理超长表头名称', () => {
    const longHeader = '日期'.repeat(50);
    const result = detectColumnMapping([longHeader]);
    // 超长表头只要包含日期关键词就能匹配
    expect(result.date).toBe(longHeader);
  });
});

describe('generateTransformReport - 边界值和异常处理', () => {
  it('应该处理空统计', () => {
    const stats = {
      total: 0,
      matched: 0,
      unmatched: 0,
      byCategory: {},
      unmatchedCategories: [],
    };
    const report = generateTransformReport(stats);
    expect(report).toContain('总记录数: 0');
    expect(report).toContain('成功匹配: 0');
  });

  it('应该处理全部匹配成功', () => {
    const stats = {
      total: 100,
      matched: 100,
      unmatched: 0,
      byCategory: { '餐饮': 50, '购物': 50 },
      unmatchedCategories: [],
    };
    const report = generateTransformReport(stats);
    expect(report).toContain('成功匹配: 100 (100.0%)');
    expect(report).not.toContain('未匹配的分类');
  });

  it('应该处理全部未匹配', () => {
    const stats = {
      total: 100,
      matched: 0,
      unmatched: 100,
      byCategory: {},
      unmatchedCategories: ['未知1', '未知2', '未知3'],
    };
    const report = generateTransformReport(stats);
    expect(report).toContain('成功匹配: 0 (0.0%)');
    expect(report).toContain('未匹配的分类');
  });

  it('应该处理大量分类', () => {
    const byCategory: Record<string, number> = {};
    for (let i = 0; i < 100; i++) {
      byCategory[`分类${i}`] = i;
    }
    const stats = {
      total: 4950,
      matched: 4950,
      unmatched: 0,
      byCategory,
      unmatchedCategories: [],
    };
    const report = generateTransformReport(stats);
    expect(report).toContain('总记录数: 4950');
  });

  it('应该处理包含特殊字符的分类名称', () => {
    const stats = {
      total: 10,
      matched: 10,
      unmatched: 0,
      byCategory: { '餐饮<>&"': 5, '购物\n换行': 5 },
      unmatchedCategories: [],
    };
    const report = generateTransformReport(stats);
    expect(report).toContain('餐饮<>&"');
    expect(report).toContain('购物\n换行');
  });

  it('应该处理极大数值', () => {
    const stats = {
      total: 999999999,
      matched: 999999998,
      unmatched: 1,
      byCategory: { '测试': 999999998 },
      unmatchedCategories: ['未知'],
    };
    const report = generateTransformReport(stats);
    expect(report).toContain('总记录数: 999999999');
  });
});
