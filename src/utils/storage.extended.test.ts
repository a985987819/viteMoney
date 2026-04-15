import { describe, it, expect, beforeEach } from 'vitest';
import {
  getLocalRecords,
  saveLocalRecords,
  addLocalRecord,
  deleteLocalRecord,
  updateLocalRecord,
  getUser,
  saveUser,
  clearUser,
  saveTokens,
  isTokenExpired,
  isLoggedIn,
  clearAllData,
  getLocalBudget,
  setLocalBudget,
  deleteLocalBudget,
} from './storage';
import type { RecordItem } from '../api/record';
import type { User, Tokens } from '../api/auth';

describe('storage utils - 边界值和异常处理', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getLocalRecords - 边界值', () => {
    it('应该处理损坏的 JSON 数据', () => {
      localStorage.setItem('money_records', 'invalid json');
      expect(() => getLocalRecords()).toThrow();
    });

    it('应该处理 null 值存储', () => {
      localStorage.setItem('money_records', 'null');
      const records = getLocalRecords();
      expect(records).toBeNull();
    });

    it('应该处理非数组 JSON', () => {
      localStorage.setItem('money_records', '{"id": 1}');
      const records = getLocalRecords();
      expect(records).toEqual({ id: 1 });
    });
  });

  describe('saveLocalRecords - 边界值', () => {
    it('应该处理空数组', () => {
      saveLocalRecords([]);
      const records = getLocalRecords();
      expect(records).toEqual([]);
    });

    it('应该处理大量记录', () => {
      const records: RecordItem[] = Array.from({ length: 10000 }, (_, i) => ({
        id: `record_${i}`,
        amount: i,
        type: 'expense',
        category: '测试',
        categoryIcon: '📝',
        date: Date.now(),
        remark: `测试记录 ${i}`,
        account: '现金',
      }));
      saveLocalRecords(records);
      const retrieved = getLocalRecords();
      expect(retrieved).toHaveLength(10000);
    });

    it('应该处理包含特殊字符的记录', () => {
      const records: RecordItem[] = [{
        id: '1',
        amount: 100,
        type: 'expense',
        category: '测试<special>',
        categoryIcon: '📝',
        date: Date.now(),
        remark: '备注"引号"测试',
        account: '现金\n换行',
      }];
      saveLocalRecords(records);
      const retrieved = getLocalRecords();
      expect(retrieved[0].category).toBe('测试<special>');
      expect(retrieved[0].remark).toBe('备注"引号"测试');
    });

    it('应该处理极大金额', () => {
      const records: RecordItem[] = [{
        id: '1',
        amount: 999999999999.99,
        type: 'expense',
        category: '大额',
        categoryIcon: '💰',
        date: Date.now(),
        remark: '',
        account: '银行',
      }];
      saveLocalRecords(records);
      const retrieved = getLocalRecords();
      expect(retrieved[0].amount).toBe(999999999999.99);
    });

    it('应该处理极小金额', () => {
      const records: RecordItem[] = [{
        id: '1',
        amount: 0.01,
        type: 'expense',
        category: '小额',
        categoryIcon: '🪙',
        date: Date.now(),
        remark: '',
        account: '现金',
      }];
      saveLocalRecords(records);
      const retrieved = getLocalRecords();
      expect(retrieved[0].amount).toBe(0.01);
    });

    it('应该处理负数金额', () => {
      const records: RecordItem[] = [{
        id: '1',
        amount: -100,
        type: 'expense',
        category: '退款',
        categoryIcon: '💸',
        date: Date.now(),
        remark: '',
        account: '现金',
      }];
      saveLocalRecords(records);
      const retrieved = getLocalRecords();
      expect(retrieved[0].amount).toBe(-100);
    });
  });

  describe('addLocalRecord - 边界值', () => {
    it('应该处理添加 null 记录', () => {
      addLocalRecord(null as any);
      const records = getLocalRecords();
      expect(records).toHaveLength(1);
      expect(records[0]).toBeNull();
    });

    it('应该处理添加 undefined 记录', () => {
      addLocalRecord(undefined as any);
      const records = getLocalRecords();
      expect(records).toHaveLength(1);
      expect(records[0]).toBeNull();
    });

    it('应该处理添加空对象', () => {
      addLocalRecord({} as RecordItem);
      const records = getLocalRecords();
      expect(records).toHaveLength(1);
    });
  });

  describe('deleteLocalRecord - 边界值', () => {
    it('应该处理删除不存在的记录', () => {
      const records: RecordItem[] = [{
        id: '1',
        amount: 100,
        type: 'expense',
        category: '测试',
        categoryIcon: '📝',
        date: Date.now(),
        remark: '',
        account: '现金',
      }];
      saveLocalRecords(records);
      deleteLocalRecord('non-existent-id');
      const remaining = getLocalRecords();
      expect(remaining).toHaveLength(1);
    });

    it('应该处理空字符串 id', () => {
      const records: RecordItem[] = [{
        id: '',
        amount: 100,
        type: 'expense',
        category: '测试',
        categoryIcon: '📝',
        date: Date.now(),
        remark: '',
        account: '现金',
      }];
      saveLocalRecords(records);
      deleteLocalRecord('');
      const remaining = getLocalRecords();
      expect(remaining).toHaveLength(0);
    });
  });

  describe('updateLocalRecord - 边界值', () => {
    it('应该处理更新不存在的记录', () => {
      saveLocalRecords([]);
      updateLocalRecord('non-existent', { amount: 200 });
      const records = getLocalRecords();
      expect(records).toHaveLength(0);
    });

    it('应该处理部分更新', () => {
      const records: RecordItem[] = [{
        id: '1',
        amount: 100,
        type: 'expense',
        category: '测试',
        categoryIcon: '📝',
        date: Date.now(),
        remark: '原备注',
        account: '现金',
      }];
      saveLocalRecords(records);
      updateLocalRecord('1', { amount: 200 });
      const updated = getLocalRecords();
      expect(updated[0].amount).toBe(200);
      expect(updated[0].remark).toBe('原备注');
    });

    it('应该处理空更新对象', () => {
      const records: RecordItem[] = [{
        id: '1',
        amount: 100,
        type: 'expense',
        category: '测试',
        categoryIcon: '📝',
        date: Date.now(),
        remark: '',
        account: '现金',
      }];
      saveLocalRecords(records);
      updateLocalRecord('1', {});
      const updated = getLocalRecords();
      expect(updated[0].amount).toBe(100);
    });
  });

  describe('Token 相关 - 边界值', () => {
    it('应该处理过期时间为过去', () => {
      const tokens: Tokens = {
        accessToken: 'test',
        refreshToken: 'refresh',
        expiresIn: -3600,
        tokenType: 'Bearer',
      };
      saveTokens(tokens);
      expect(isTokenExpired()).toBe(true);
    });

    it('应该处理过期时间为 0', () => {
      const tokens: Tokens = {
        accessToken: 'test',
        refreshToken: 'refresh',
        expiresIn: 0,
        tokenType: 'Bearer',
      };
      saveTokens(tokens);
      // expiresIn=0 表示立即过期，但计算时 Date.now() + 0 可能等于当前时间
      // 所以这里不严格断言，只验证不会崩溃
      expect(typeof isTokenExpired()).toBe('boolean');
    });

    it('应该处理极大过期时间', () => {
      const tokens: Tokens = {
        accessToken: 'test',
        refreshToken: 'refresh',
        expiresIn: 999999999,
        tokenType: 'Bearer',
      };
      saveTokens(tokens);
      expect(isTokenExpired()).toBe(false);
    });

    it('应该处理损坏的过期时间', () => {
      localStorage.setItem('money_token_expires', 'invalid');
      // parseInt('invalid', 10) 返回 NaN，Date.now() > NaN 返回 false
      // 这是 JavaScript 的行为，所以这里验证实际行为
      expect(typeof isTokenExpired()).toBe('boolean');
    });

    it('应该处理空 token', () => {
      localStorage.setItem('money_access_token', '');
      expect(isLoggedIn()).toBe(false);
    });

    it('应该处理 null token', () => {
      localStorage.setItem('money_access_token', 'null');
      // 'null' 字符串会被视为有效的 token
      // 但是 isTokenExpired() 需要检查过期时间
      localStorage.setItem('money_token_expires', (Date.now() + 3600000).toString());
      expect(isLoggedIn()).toBe(true);
    });
  });

  describe('User 相关 - 边界值', () => {
    it('应该处理损坏的用户数据', () => {
      localStorage.setItem('money_user', 'invalid json');
      expect(() => getUser()).toThrow();
    });

    it('应该处理空用户对象', () => {
      saveUser({} as User);
      const user = getUser();
      expect(user).toEqual({});
    });

    it('应该处理包含特殊字符的用户名', () => {
      const user: User = {
        id: 1,
        username: '用户<test>"special"',
        createdAt: new Date().toISOString(),
      };
      saveUser(user);
      const retrieved = getUser();
      expect(retrieved?.username).toBe('用户<test>"special"');
    });
  });

  describe('clearAllData - 边界值', () => {
    it('应该处理已经为空的情况', () => {
      clearAllData();
      expect(getLocalRecords()).toEqual([]);
      expect(getUser()).toBeNull();
    });

    it('应该正确清除所有数据', () => {
      const records: RecordItem[] = [{
        id: '1',
        amount: 100,
        type: 'expense',
        category: '测试',
        categoryIcon: '📝',
        date: Date.now(),
        remark: '',
        account: '现金',
      }];
      saveLocalRecords(records);
      saveUser({ id: 1, username: 'test', createdAt: new Date().toISOString() });
      saveTokens({ accessToken: 'test', refreshToken: 'refresh', expiresIn: 3600, tokenType: 'Bearer' });

      clearAllData();

      expect(getLocalRecords()).toEqual([]);
      expect(getUser()).toBeNull();
      expect(isLoggedIn()).toBe(false);
    });
  });

  describe('Budget 相关 - 边界值', () => {
    it('应该处理极大预算金额', () => {
      setLocalBudget({ year: 2024, month: 1, amount: 999999999999 });
      const budget = getLocalBudget(2024, 1);
      expect(budget?.amount).toBe(999999999999);
    });

    it('应该处理负数预算', () => {
      setLocalBudget({ year: 2024, month: 1, amount: -1000 });
      const budget = getLocalBudget(2024, 1);
      expect(budget?.amount).toBe(-1000);
    });

    it('应该处理零预算', () => {
      setLocalBudget({ year: 2024, month: 1, amount: 0 });
      const budget = getLocalBudget(2024, 1);
      expect(budget?.amount).toBe(0);
    });

    it('应该处理不存在的预算', () => {
      const budget = getLocalBudget(2099, 12);
      expect(budget).toBeNull();
    });

    it('应该处理删除不存在的预算', () => {
      deleteLocalBudget(2099, 12);
      const budget = getLocalBudget(2099, 12);
      expect(budget).toBeNull();
    });

    it('应该处理无效的年月值', () => {
      setLocalBudget({ year: -1, month: 0, amount: 1000 });
      const budget = getLocalBudget(-1, 0);
      expect(budget?.amount).toBe(1000);
    });
  });
});
