import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useCategories } from './useCategories';

// Mock useAuth to return isLoggedIn false (uses categoryIconMapping fallback)
vi.mock('./useAuth', () => ({
  useAuth: () => ({ isLoggedIn: false }),
}));

describe('useCategories', () => {
  const { result } = renderHook(() => useCategories());

  // Basic smoke tests for hook initialization — verify functions are callable
  describe('category options', () => {
    it('should return expense category options from mapping', () => {
      const { expenseCategoryOptions } = result.current;
      expect(Array.isArray(expenseCategoryOptions)).toBe(true);
      expect(expenseCategoryOptions.length).toBeGreaterThan(0);
    });

    it('should return income category options from mapping', () => {
      const { incomeCategoryOptions } = result.current;
      expect(Array.isArray(incomeCategoryOptions)).toBe(true);
      expect(incomeCategoryOptions.length).toBeGreaterThan(0);
    });

    it('should combine all category options', () => {
      const { allCategoryOptions } = result.current;
      expect(Array.isArray(allCategoryOptions)).toBe(true);
      expect(allCategoryOptions.length).toBeGreaterThan(0);
    });
  });

  describe('subCategoryMap', () => {
    it('should return subCategoryMap as object', () => {
      const { subCategoryMap } = result.current;
      expect(typeof subCategoryMap).toBe('object');
      expect(subCategoryMap).not.toBeNull();
    });
  });

  describe('getIcon', () => {
    it('should return icon for known category', () => {
      const icon = result.current.getIcon('餐饮');
      expect(typeof icon).toBe('string');
    });
  });

  describe('getEnglishName', () => {
    it('should return english name for known category', () => {
      const name = result.current.getEnglishName('餐饮');
      expect(typeof name).toBe('string');
    });
  });

  describe('normalizeName', () => {
    it('should return standard name for known synonym', () => {
      const normalized = result.current.normalizeName('吃午饭');
      expect(normalized).toBe('餐饮');
    });

    it('should return original name for unmatched', () => {
      const normalized = result.current.normalizeName('完全未知分类');
      expect(normalized).toBe('完全未知分类');
    });
  });

  describe('matchCategory', () => {
    it('should match known category', () => {
      const match = result.current.matchCategory('餐饮');
      expect(match.mainCategory).not.toBeNull();
    });

    it('should match synonym', () => {
      const match = result.current.matchCategory('吃午饭');
      expect(match.mainCategory).not.toBeNull();
    });

    it('should return null for unknown category', () => {
      const match = result.current.matchCategory('完全未知');
      expect(match.mainCategory).toBeNull();
      expect(match.subCategory).toBeNull();
    });
  });

  describe('getType', () => {
    it('should return expense for expense category', () => {
      expect(result.current.getType('餐饮')).toBe('expense');
    });

    it('should return income for income category', () => {
      expect(result.current.getType('工资')).toBe('income');
    });

    it('should return null for unknown', () => {
      expect(result.current.getType('完全未知')).toBeNull();
    });
  });
});
