import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  exportToCSV,
  exportToXLSX,
  importFromCSV,
  importFromXLSX,
  parseDate,
  compareDate,
  getTimestamp,
  generateImportReport,
} from './importExport';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

// Mock document.createElement for export
vi.stubGlobal('document', {
  ...document,
  createElement: vi.fn((tag) => {
    if (tag === 'a') {
      const link = {
        href: '',
        download: '',
        click: vi.fn(),
      };
      return link;
    }
    return {};
  }),
});

// Mock URL
vi.stubGlobal('URL', {
  ...window.URL,
  createObjectURL: vi.fn(() => 'blob:http://mock-url'),
  revokeObjectURL: vi.fn(),
});

vi.mock('xlsx');
vi.mock('papaparse');

describe('parseDate', () => {
  it('should return current timestamp for empty input', () => {
    const result = parseDate(null as any);
    expect(result).toBeGreaterThan(0);
    expect(result).toBeLessThanOrEqual(Date.now());
  });

  it('should handle Unix seconds timestamp (< 10 billion)', () => {
    const seconds = 1700000000;
    const result = parseDate(seconds);
    expect(result).toBe(seconds * 1000);
  });

  it('should handle Unix milliseconds timestamp (>= 10 billion)', () => {
    const millis = 1700000000000;
    const result = parseDate(millis);
    expect(result).toBe(millis);
  });

  it('should handle Excel date serial number (< 100000)', () => {
    const excelDate = 45000;
    const result = parseDate(excelDate);
    expect(result).toBeGreaterThan(0);
  });

  it('should parse date string without time as start of day', () => {
    const result = parseDate('2024-01-15');
    expect(result).toBeGreaterThan(0);
  });

  it('should parse date string with time', () => {
    const result = parseDate('2024-01-15 10:30');
    expect(result).toBeGreaterThan(0);
  });

  it('should parse string number as date', () => {
    const result = parseDate('1700000000');
    expect(result).toBeGreaterThan(0);
  });
});

describe('compareDate', () => {
  it('should return negative when a < b', () => {
    const result = compareDate('2024-01-01', '2024-12-01');
    expect(result).toBeLessThan(0);
  });

  it('should return positive when a > b', () => {
    const result = compareDate('2025-01-01', '2024-01-01');
    expect(result).toBeGreaterThan(0);
  });

  it('should return 0 when dates are equal', () => {
    const result = compareDate('2024-06-15', '2024-06-15');
    expect(result).toBe(0);
  });
});

describe('getTimestamp', () => {
  it('should return parsed date timestamp', () => {
    const result = getTimestamp('2024-06-15');
    expect(result).toBeGreaterThan(0);
  });
});

describe('generateImportReport', () => {
  it('should generate report with matched and unmatched', () => {
    const stats = {
      total: 10,
      matched: 8,
      unmatched: 2,
      byCategory: { '餐饮': 5, '交通': 3 },
      unmatchedCategories: ['外卖', '打车'],
    };

    const report = generateImportReport(stats);

    expect(report).toContain('=== 数据导入转换报告 ===');
    expect(report).toContain('总记录数: 10');
    expect(report).toContain('成功匹配: 8 (80.0%)');
    expect(report).toContain('未匹配: 2 (20.0%)');
    expect(report).toContain('餐饮: 5条');
    expect(report).toContain('外卖');
    expect(report).toContain('打车');
  });

  it('should handle empty stats', () => {
    const stats = {
      total: 0,
      matched: 0,
      unmatched: 0,
      byCategory: {},
      unmatchedCategories: [],
    };

    const report = generateImportReport(stats);
    expect(report).toContain('=== 数据导入转换报告 ===');
    expect(report).toContain('总记录数: 0');
  });
});
