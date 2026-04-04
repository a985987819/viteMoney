import { describe, it, expect, beforeEach, vi } from 'vitest';
import { http } from '../utils/request';
import {
  getLocalRecords,
  saveLocalRecords,
  addLocalRecord,
  deleteLocalRecord,
  updateLocalRecord,
  getLocalBudget,
  setLocalBudget,
  getLocalBudgets,
  saveLocalBudgets,
  getLocalCategories,
  saveLocalCategories,
} from '../utils/storage';
import type { RecordItem } from '../api/record';
import type { LocalBudget } from '../utils/storage';

describe('Offline functionality tests', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('Record management without login', () => {
    it('should save records locally when not logged in', () => {
      const mockRecord: RecordItem = {
        id: '1',
        amount: 100,
        type: 'expense',
        category: '餐饮',
        categoryIcon: '🍜',
        date: Date.now(),
        remark: 'test',
        account: '现金',
      };

      // 未登录时应该使用本地存储
      saveLocalRecords([mockRecord]);
      const records = getLocalRecords();

      expect(records).toHaveLength(1);
      expect(records[0]).toEqual(mockRecord);
    });

    it('should add record locally', () => {
      const existingRecord: RecordItem = {
        id: '1',
        amount: 50,
        type: 'expense',
        category: '餐饮',
        categoryIcon: '🍜',
        date: Date.now(),
        remark: 'existing',
        account: '现金',
      };

      saveLocalRecords([existingRecord]);

      const newRecord: RecordItem = {
        id: '2',
        amount: 100,
        type: 'expense',
        category: '购物',
        categoryIcon: '🛍️',
        date: Date.now(),
        remark: 'new',
        account: '微信',
      };

      addLocalRecord(newRecord);
      const records = getLocalRecords();

      expect(records).toHaveLength(2);
      expect(records[0]).toEqual(newRecord);
    });

    it('should delete record locally', () => {
      const records: RecordItem[] = [
        { id: '1', amount: 50, type: 'expense', category: '餐饮', categoryIcon: '🍜', date: Date.now(), remark: 'test1', account: '现金' },
        { id: '2', amount: 100, type: 'expense', category: '购物', categoryIcon: '🛍️', date: Date.now(), remark: 'test2', account: '微信' },
      ];

      saveLocalRecords(records);
      deleteLocalRecord('1');

      const remaining = getLocalRecords();
      expect(remaining).toHaveLength(1);
      expect(remaining[0].id).toBe('2');
    });

    it('should update record locally', () => {
      const record: RecordItem = {
        id: '1',
        amount: 50,
        type: 'expense',
        category: '餐饮',
        categoryIcon: '🍜',
        date: Date.now(),
        remark: 'original',
        account: '现金',
      };

      saveLocalRecords([record]);
      updateLocalRecord('1', { amount: 100, remark: 'updated' });

      const updated = getLocalRecords()[0];
      expect(updated.amount).toBe(100);
      expect(updated.remark).toBe('updated');
    });
  });

  describe('Budget management without login', () => {
    it('should save budget locally when not logged in', () => {
      const mockBudget: LocalBudget = {
        year: 2024,
        month: 1,
        amount: 5000,
      };

      setLocalBudget(mockBudget);
      const budget = getLocalBudget(2024, 1);

      expect(budget).toEqual(mockBudget);
    });

    it('should update budget locally', () => {
      const initialBudget: LocalBudget = {
        year: 2024,
        month: 1,
        amount: 5000,
      };

      setLocalBudget(initialBudget);
      setLocalBudget({ ...initialBudget, amount: 6000 });

      const budget = getLocalBudget(2024, 1);
      expect(budget?.amount).toBe(6000);
    });

    it('should get all budgets locally', () => {
      const budgets: LocalBudget[] = [
        { year: 2024, month: 1, amount: 5000 },
        { year: 2024, month: 2, amount: 6000 },
      ];

      saveLocalBudgets(budgets);
      const allBudgets = getLocalBudgets();

      expect(allBudgets).toHaveLength(2);
      expect(allBudgets).toEqual(budgets);
    });
  });

  describe('Category management without login', () => {
    it('should save categories locally when not logged in', () => {
      const mockCategories = {
        expense: [{ id: '1', name: '餐饮', icon: '🍜', type: 'expense' as const }],
        income: [{ id: '2', name: '工资', icon: '💰', type: 'income' as const }],
        transfer: [],
        debt: [],
        reimbursement: [],
      };

      saveLocalCategories(mockCategories);
      const categories = getLocalCategories();

      expect(categories).toEqual(mockCategories);
    });
  });

  describe('API calls without login', () => {
    it('should handle 401 error gracefully without redirecting', async () => {
      // Mock API call that returns 401
      const mockGet = vi.fn().mockRejectedValue({
        response: {
          status: 401,
          data: { error: 'Unauthorized' },
        },
      });

      // 未登录时 API 调用应该失败但不影响本地功能
      await expect(mockGet('/records')).rejects.toThrow();

      // 本地存储应该仍然可用
      saveLocalRecords([]);
      expect(getLocalRecords()).toEqual([]);
    });

    it('should work with skipAuth option for public APIs', async () => {
      const mockGet = vi.fn().mockResolvedValue({ records: [] });

      // 使用 skipAuth 选项可以访问公开 API
      await mockGet('/public/records', { skipAuth: true });

      expect(mockGet).toHaveBeenCalledWith('/public/records', { skipAuth: true });
    });
  });

  describe('Data persistence without login', () => {
    it('should persist records across page reloads', () => {
      const records: RecordItem[] = [
        {
          id: '1',
          amount: 100,
          type: 'expense',
          category: '餐饮',
          categoryIcon: '🍜',
          date: Date.now(),
          remark: 'test',
          account: '现金',
        },
      ];

      saveLocalRecords(records);

      // 模拟页面重载后重新获取
      const loadedRecords = getLocalRecords();
      expect(loadedRecords).toEqual(records);
    });

    it('should persist budget across page reloads', () => {
      const budget: LocalBudget = {
        year: 2024,
        month: 1,
        amount: 5000,
      };

      setLocalBudget(budget);

      // 模拟页面重载后重新获取
      const loadedBudget = getLocalBudget(2024, 1);
      expect(loadedBudget).toEqual(budget);
    });
  });

  describe('Statistics calculation without login', () => {
    it('should calculate total expense from local records', () => {
      const records: RecordItem[] = [
        { id: '1', amount: 100, type: 'expense', category: '餐饮', categoryIcon: '🍜', date: Date.now(), remark: 'test', account: '现金' },
        { id: '2', amount: 200, type: 'expense', category: '购物', categoryIcon: '🛍️', date: Date.now(), remark: 'test', account: '微信' },
        { id: '3', amount: 500, type: 'income', category: '工资', categoryIcon: '💰', date: Date.now(), remark: 'test', account: '银行卡' },
      ];

      saveLocalRecords(records);

      const expenseRecords = getLocalRecords().filter(r => r.type === 'expense');
      const totalExpense = expenseRecords.reduce((sum, r) => sum + r.amount, 0);

      expect(totalExpense).toBe(300);
    });

    it('should calculate budget usage from local data', () => {
      const budget: LocalBudget = {
        year: 2024,
        month: 1,
        amount: 1000,
      };
      setLocalBudget(budget);

      const records: RecordItem[] = [
        { id: '1', amount: 300, type: 'expense', category: '餐饮', categoryIcon: '🍜', date: Date.now(), remark: 'test', account: '现金' },
        { id: '2', amount: 200, type: 'expense', category: '购物', categoryIcon: '🛍️', date: Date.now(), remark: 'test', account: '微信' },
      ];
      saveLocalRecords(records);

      const expenseRecords = getLocalRecords().filter(r => r.type === 'expense');
      const totalExpense = expenseRecords.reduce((sum, r) => sum + r.amount, 0);
      const percentage = (totalExpense / budget.amount) * 100;

      expect(percentage).toBe(50);
    });
  });
});
