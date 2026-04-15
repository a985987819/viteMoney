import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  parseDate,
  compareDate,
  getTimestamp,
  generateImportReport,
} from './importExport';

describe('parseDate - 边界值和异常处理', () => {
  it('应该处理 null 值', () => {
    const result = parseDate(null);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThanOrEqual(Date.now() + 1000);
  });

  it('应该处理 undefined 值', () => {
    const result = parseDate(undefined);
    expect(result).toBeGreaterThan(0);
  });

  it('应该处理空字符串', () => {
    const result = parseDate('');
    expect(result).toBeGreaterThan(0);
  });

  it('应该处理负数时间戳', () => {
    const result = parseDate(-1);
    // 负数时间戳会被当作 Unix 秒时间戳处理
    expect(result).toBeLessThan(0);
  });

  it('应该处理零值', () => {
    const result = parseDate(0);
    // 0 是 falsy 值，会返回当前时间戳
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThanOrEqual(Date.now() + 1000);
  });

  it('应该处理极大值时间戳', () => {
    const maxTimestamp = 9999999999999;
    const result = parseDate(maxTimestamp);
    expect(result).toBe(maxTimestamp);
  });

  it('应该处理无效日期字符串', () => {
    const result = parseDate('invalid date');
    expect(result).toBeGreaterThan(0);
  });

  it('应该处理特殊字符日期字符串', () => {
    const result = parseDate('2024/01/15');
    expect(result).toBeGreaterThan(0);
  });

  it('应该处理包含多余空格的日期', () => {
    const result = parseDate('  2024-01-15  ');
    expect(result).toBeGreaterThan(0);
  });

  it('应该处理 Excel 边界值（1900年附近）', () => {
    const excelDate = 1;
    const result = parseDate(excelDate);
    expect(result).toBeLessThan(0);
  });

  it('应该处理布尔值', () => {
    const result = parseDate(true as any);
    expect(result).toBeGreaterThan(0);
  });

  it('应该处理对象类型', () => {
    const result = parseDate({} as any);
    expect(result).toBeGreaterThan(0);
  });

  it('应该处理数组类型', () => {
    const result = parseDate([2024, 1, 15] as any);
    expect(result).toBeGreaterThan(0);
  });
});

describe('compareDate - 边界值和异常处理', () => {
  it('应该处理相同的无效日期', () => {
    const result = compareDate('invalid', 'invalid');
    expect(result).toBe(0);
  });

  it('应该处理一个有效一个无效的日期', () => {
    const result = compareDate('2024-01-15', 'invalid');
    expect(result).not.toBe(0);
  });

  it('应该处理 null 值比较', () => {
    const result = compareDate(null, null);
    expect(result).toBe(0);
  });

  it('应该处理极大时间戳比较', () => {
    const result = compareDate(9999999999999, 9999999999998);
    expect(result).toBeGreaterThan(0);
  });

  it('应该处理负数时间戳比较', () => {
    const result = compareDate(-1000000, -2000000);
    expect(result).toBeGreaterThan(0);
  });
});

describe('getTimestamp - 边界值和异常处理', () => {
  it('应该返回与 parseDate 相同的结果', () => {
    const input = '2024-01-15';
    expect(getTimestamp(input)).toBe(parseDate(input));
  });

  it('应该处理各种输入类型', () => {
    expect(getTimestamp(null)).toBeGreaterThan(0);
    expect(getTimestamp(undefined)).toBeGreaterThan(0);
    expect(getTimestamp('')).toBeGreaterThan(0);
  });
});

describe('generateImportReport - 边界值和异常处理', () => {
  it('应该处理空统计对象', () => {
    const stats = {
      total: 0,
      matched: 0,
      unmatched: 0,
      byCategory: {},
      unmatchedCategories: [],
    };
    const report = generateImportReport(stats);
    expect(report).toContain('总记录数: 0');
    expect(report).toContain('成功匹配: 0');
  });

  it('应该处理大量数据', () => {
    const stats = {
      total: 1000000,
      matched: 999999,
      unmatched: 1,
      byCategory: { '餐饮': 500000, '购物': 499999 },
      unmatchedCategories: ['未知分类'],
    };
    const report = generateImportReport(stats);
    expect(report).toContain('总记录数: 1000000');
    expect(report).toContain('成功匹配: 999999');
  });

  it('应该处理所有记录都未匹配的情况', () => {
    const stats = {
      total: 100,
      matched: 0,
      unmatched: 100,
      byCategory: {},
      unmatchedCategories: ['分类A', '分类B', '分类C'],
    };
    const report = generateImportReport(stats);
    expect(report).toContain('成功匹配: 0');
    expect(report).toContain('未匹配: 100');
  });

  it('应该处理所有记录都匹配的情况', () => {
    const stats = {
      total: 100,
      matched: 100,
      unmatched: 0,
      byCategory: { '餐饮': 100 },
      unmatchedCategories: [],
    };
    const report = generateImportReport(stats);
    expect(report).toContain('成功匹配: 100');
    expect(report).toContain('未匹配: 0');
  });

  it('应该处理包含特殊字符的分类名称', () => {
    const stats = {
      total: 10,
      matched: 10,
      unmatched: 0,
      byCategory: { '餐饮<special>': 5, '购物&测试': 5 },
      unmatchedCategories: [],
    };
    const report = generateImportReport(stats);
    expect(report).toContain('餐饮<special>');
    expect(report).toContain('购物&测试');
  });
});
