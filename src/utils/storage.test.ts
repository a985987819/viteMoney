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
  getAccessToken,
  getRefreshToken,
  saveTokens,
  isTokenExpired,
  getLocalBudget,
  setLocalBudget,
  deleteLocalBudget,
} from './storage';
import type { RecordItem } from '../api/record';
import type { User, Tokens } from '../api/auth';
import type { LocalBudget } from './storage';

describe('storage utils', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getLocalRecords / saveLocalRecords', () => {
    it('should return empty array when no records', () => {
      const records = getLocalRecords();
      expect(records).toEqual([]);
    });

    it('should save and retrieve records', () => {
      const mockRecords: RecordItem[] = [
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

      saveLocalRecords(mockRecords);
      const retrieved = getLocalRecords();

      expect(retrieved).toEqual(mockRecords);
    });
  });

  describe('addLocalRecord', () => {
    it('should add record to the beginning of array', () => {
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
      expect(records[1]).toEqual(existingRecord);
    });
  });

  describe('deleteLocalRecord', () => {
    it('should delete record by id', () => {
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

    it('should do nothing when record not found', () => {
      const records: RecordItem[] = [
        { id: '1', amount: 50, type: 'expense', category: '餐饮', categoryIcon: '🍜', date: Date.now(), remark: 'test', account: '现金' },
      ];

      saveLocalRecords(records);
      deleteLocalRecord('999');

      const remaining = getLocalRecords();
      expect(remaining).toHaveLength(1);
    });
  });

  describe('updateLocalRecord', () => {
    it('should update record by id', () => {
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
      expect(updated.id).toBe('1');
    });

    it('should do nothing when record not found', () => {
      const record: RecordItem = {
        id: '1',
        amount: 50,
        type: 'expense',
        category: '餐饮',
        categoryIcon: '🍜',
        date: Date.now(),
        remark: 'test',
        account: '现金',
      };

      saveLocalRecords([record]);
      updateLocalRecord('999', { amount: 100 });

      const updated = getLocalRecords()[0];
      expect(updated.amount).toBe(50);
    });
  });

  describe('getUser / saveUser / clearUser', () => {
    it('should return null when no user', () => {
      expect(getUser()).toBeNull();
    });

    it('should save and retrieve user', () => {
      const mockUser: User = {
        id: 1,
        username: 'testuser',
        createdAt: new Date().toISOString(),
      };

      saveUser(mockUser);
      const retrieved = getUser();

      expect(retrieved).toEqual(mockUser);
    });

    it('should clear user data', () => {
      saveUser({
        id: 1,
        username: 'testuser',
        createdAt: new Date().toISOString(),
      });
      saveTokens({
        accessToken: 'test_access',
        refreshToken: 'test_refresh',
        expiresIn: 3600,
        tokenType: 'Bearer',
      });

      clearUser();

      expect(getUser()).toBeNull();
      expect(getAccessToken()).toBeNull();
      expect(getRefreshToken()).toBeNull();
    });
  });

  describe('saveTokens / getAccessToken / getRefreshToken', () => {
    it('should save and retrieve tokens', () => {
      const mockTokens: Tokens = {
        accessToken: 'test_access_token',
        refreshToken: 'test_refresh_token',
        expiresIn: 3600,
        tokenType: 'Bearer',
      };

      saveTokens(mockTokens);

      expect(getAccessToken()).toBe('test_access_token');
      expect(getRefreshToken()).toBe('test_refresh_token');
    });
  });

  describe('isTokenExpired', () => {
    it('should return true when no token expires', () => {
      expect(isTokenExpired()).toBe(true);
    });

    it('should return true when token is expired', () => {
      const expiredTime = Date.now() - 1000;
      localStorage.setItem('money_token_expires', expiredTime.toString());

      expect(isTokenExpired()).toBe(true);
    });

    it('should return false when token is not expired', () => {
      const futureTime = Date.now() + 3600 * 1000;
      localStorage.setItem('money_token_expires', futureTime.toString());

      expect(isTokenExpired()).toBe(false);
    });
  });

  describe('getLocalBudget / setLocalBudget / deleteLocalBudget', () => {
    it('should return null when no budget', () => {
      expect(getLocalBudget(2024, 1)).toBeNull();
    });

    it('should save and retrieve budget', () => {
      const mockBudget: LocalBudget = {
        year: 2024,
        month: 1,
        amount: 5000,
      };

      setLocalBudget(mockBudget);
      const retrieved = getLocalBudget(2024, 1);

      expect(retrieved).toEqual(mockBudget);
    });

    it('should update existing budget', () => {
      const mockBudget: LocalBudget = {
        year: 2024,
        month: 1,
        amount: 5000,
      };

      setLocalBudget(mockBudget);
      setLocalBudget({ ...mockBudget, amount: 6000 });
      const retrieved = getLocalBudget(2024, 1);

      expect(retrieved?.amount).toBe(6000);
    });

    it('should delete budget', () => {
      const mockBudget: LocalBudget = {
        year: 2024,
        month: 1,
        amount: 5000,
      };

      setLocalBudget(mockBudget);
      deleteLocalBudget(2024, 1);

      expect(getLocalBudget(2024, 1)).toBeNull();
    });
  });
});
