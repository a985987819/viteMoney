import type { RecordItem } from '../api/record';
import type { Category } from '../api/category';
import type { User, Tokens } from '../api/auth';
import type { BudgetResponse } from '../api/budget';
import { STORAGE_KEYS } from '../types/types';
import { expenseCategories, incomeCategories } from '../constants/categories';
import { nowISO } from './dateFormats';

export interface LocalBudget extends Omit<BudgetResponse, 'id' | 'spent' | 'remaining' | 'percentage'> {
  id?: string;
}

export interface QuickRecord {
  id: string;
  categoryId: string;
  subCategoryId: string;
  amount: number;
  type: 'expense' | 'income';
  order: number;
}

export interface FridgeItem {
  id: string;
  name: string;
  quantity: string;
  purchaseDate: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
  consumedAt?: string;
}

export function safeJsonParse<T>(data: string | null, fallback: T): T {
  if (!data) return fallback;
  try {
    const parsed = JSON.parse(data);
    if (parsed === null || parsed === undefined) return fallback;
    return parsed;
  } catch {
    console.warn('[Storage] JSON 解析失败，已回退到默认值');
    return fallback;
  }
}

export function safeJsonArrayParse<T>(data: string | null): T[] {
  if (!data) return [];
  try {
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    console.warn('[Storage] JSON 数组解析失败，已回退到空数组');
    return [];
  }
}

const generateDefaultCategories = (): Record<string, Category[]> => {
  const expense: Category[] = expenseCategories.map((cat, index) => ({
    id: `expense_${index + 1}`,
    name: cat.name,
    icon: cat.icon,
    type: 'expense' as const,
    subCategories: cat.subCategories.map((sub, subIndex) => ({
      id: `expense_${index + 1}_${subIndex + 1}`,
      name: sub.name,
      icon: sub.icon,
    })),
  }));

  const income: Category[] = incomeCategories.map((cat, index) => ({
    id: `income_${index + 1}`,
    name: cat.name,
    icon: cat.icon,
    type: 'income' as const,
    subCategories: cat.subCategories.map((sub, subIndex) => ({
      id: `income_${index + 1}_${subIndex + 1}`,
      name: sub.name,
      icon: sub.icon,
    })),
  }));

  const transfer: Category[] = [
    { id: 'transfer_1', name: '转账', icon: 'transfer', type: 'transfer' as const, subCategories: [] },
    { id: 'transfer_2', name: '还款', icon: 'repay', type: 'transfer' as const, subCategories: [] },
  ];

  const debt: Category[] = [
    { id: 'debt_1', name: '借入', icon: 'borrow_in', type: 'debt' as const, subCategories: [] },
    { id: 'debt_2', name: '借出', icon: 'borrow_out', type: 'debt' as const, subCategories: [] },
    { id: 'debt_3', name: '还款', icon: 'repayment', type: 'debt' as const, subCategories: [] },
  ];

  const reimbursement: Category[] = [
    { id: 'reimbursement_1', name: '报销', icon: 'reimburse', type: 'reimbursement' as const, subCategories: [] },
  ];

  return {
    expense,
    income,
    transfer,
    debt,
    reimbursement,
  };
};

const defaultCategoriesData = generateDefaultCategories();

export const getLocalRecords = (): RecordItem[] => {
  return safeJsonArrayParse<RecordItem>(localStorage.getItem(STORAGE_KEYS.RECORDS));
};

export const saveLocalRecords = (records: RecordItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
  } catch (e) {
    console.error('[Storage] 保存记录失败，可能存储空间不足:', e);
  }
};

export const addLocalRecord = (record: RecordItem) => {
  const records = getLocalRecords();
  records.unshift(record);
  saveLocalRecords(records);
};

export const deleteLocalRecord = (id: string) => {
  const records = getLocalRecords();
  const filtered = records.filter(r => r.id !== id);
  saveLocalRecords(filtered);
};

export const updateLocalRecord = (id: string, data: Partial<RecordItem>) => {
  const records = getLocalRecords();
  const index = records.findIndex(r => r.id === id);
  if (index !== -1) {
    records[index] = { ...records[index], ...data };
    saveLocalRecords(records);
  }
};

export const getUser = (): User | null => {
  return safeJsonParse<User | null>(localStorage.getItem(STORAGE_KEYS.USER), null);
};

export const saveUser = (user: User) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (e) {
    console.error('[Storage] 保存用户信息失败:', e);
  }
};

const TOKEN_KEYS = [
  STORAGE_KEYS.ACCESS_TOKEN,
  STORAGE_KEYS.REFRESH_TOKEN,
  STORAGE_KEYS.TOKEN_EXPIRES,
];

export const clearUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
  TOKEN_KEYS.forEach((key) => localStorage.removeItem(key));
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

export const saveTokens = (tokens: Tokens) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
    const expiresAt = Date.now() + tokens.expiresIn * 1000;
    localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRES, expiresAt.toString());
  } catch (e) {
    console.error('[Storage] 保存 Token 失败:', e);
  }
};

export const isTokenExpired = (): boolean => {
  const expiresAt = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRES);
  if (!expiresAt) return true;
  const parsed = parseInt(expiresAt, 10);
  if (isNaN(parsed)) return true;
  return Date.now() > parsed;
};

export const isLoggedIn = (): boolean => {
  return !!getAccessToken() && !isTokenExpired();
};

const ALL_DATA_KEYS = [
  STORAGE_KEYS.RECORDS,
  STORAGE_KEYS.USER,
  STORAGE_KEYS.ACCESS_TOKEN,
  STORAGE_KEYS.REFRESH_TOKEN,
  STORAGE_KEYS.TOKEN_EXPIRES,
  STORAGE_KEYS.FRIDGE_ITEMS,
];

export const clearAllData = () => {
  ALL_DATA_KEYS.forEach((key) => localStorage.removeItem(key));
};

type CategoryType = 'expense' | 'income' | 'transfer' | 'debt' | 'reimbursement';
type CategoryMap = Record<CategoryType, Category[]>;

export const getLocalCategories = (): CategoryMap => {
  const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  if (data) {
    try {
      const parsed = JSON.parse(data);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        return parsed;
      }
    } catch {
      console.warn('[Storage] 分类数据解析失败，已回退到默认分类');
    }
  }
  return defaultCategoriesData as CategoryMap;
};

export const saveLocalCategories = (categories: CategoryMap) => {
  try {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
  } catch (e) {
    console.error('[Storage] 保存分类数据失败:', e);
  }
};

export const getExpenseCategoriesForSelect = (): Array<{
  id: string;
  name: string;
  icon: string;
  subCategories: Array<{ id: string; name: string; icon: string }>;
}> => {
  const stored = getLocalCategories();
  if (stored && stored.expense) {
    return stored.expense.map(cat => ({
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
      subCategories: (cat.subCategories || []).map(sub => ({
        id: sub.id,
        name: sub.name,
        icon: sub.icon,
      })),
    }));
  }
  return [];
};

export const getIncomeCategoriesForSelect = (): Array<{
  id: string;
  name: string;
  icon: string;
  subCategories: Array<{ id: string; name: string; icon: string }>;
}> => {
  const stored = getLocalCategories();
  if (stored && stored.income) {
    return stored.income.map(cat => ({
      id: cat.id,
      name: cat.name,
      icon: cat.icon,
      subCategories: (cat.subCategories || []).map(sub => ({
        id: sub.id,
        name: sub.name,
        icon: sub.icon,
      })),
    }));
  }
  return [];
};

export const getLocalBudgets = (): LocalBudget[] => {
  return safeJsonArrayParse<LocalBudget>(localStorage.getItem(STORAGE_KEYS.BUDGETS));
};

export const saveLocalBudgets = (budgets: LocalBudget[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
  } catch (e) {
    console.error('[Storage] 保存预算数据失败:', e);
  }
};

export const getLocalBudget = (year: number, month: number): LocalBudget | null => {
  const budgets = getLocalBudgets();
  return budgets.find(b => b.year === year && b.month === month) || null;
};

export const setLocalBudget = (budget: LocalBudget): void => {
  const budgets = getLocalBudgets();
  const existingIndex = budgets.findIndex(b => b.year === budget.year && b.month === budget.month);
  if (existingIndex >= 0) {
    budgets[existingIndex] = budget;
  } else {
    budgets.push(budget);
  }
  saveLocalBudgets(budgets);
};

export const deleteLocalBudget = (year: number, month: number): void => {
  const budgets = getLocalBudgets();
  const filtered = budgets.filter(b => !(b.year === year && b.month === month));
  saveLocalBudgets(filtered);
};

export const getQuickRecords = (): QuickRecord[] => {
  return safeJsonArrayParse<QuickRecord>(localStorage.getItem(STORAGE_KEYS.QUICK_RECORDS));
};

export const saveQuickRecords = (records: QuickRecord[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.QUICK_RECORDS, JSON.stringify(records));
  } catch (e) {
    console.error('[Storage] 保存快捷记账数据失败:', e);
  }
};

export const addQuickRecord = (record: Omit<QuickRecord, 'id' | 'order'>): QuickRecord => {
  const records = getQuickRecords();
  const newRecord: QuickRecord = {
    ...record,
    id: `qr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    order: records.length,
  };
  records.push(newRecord);
  saveQuickRecords(records);
  return newRecord;
};

export const updateQuickRecord = (id: string, data: Partial<QuickRecord>): void => {
  const records = getQuickRecords();
  const index = records.findIndex(r => r.id === id);
  if (index !== -1) {
    records[index] = { ...records[index], ...data };
    saveQuickRecords(records);
  }
};

export const deleteQuickRecord = (id: string): void => {
  const records = getQuickRecords();
  const filtered = records.filter(r => r.id !== id);
  saveQuickRecords(filtered);
};

export const reorderQuickRecords = (records: QuickRecord[]): void => {
  const reordered = records.map((r, index) => ({ ...r, order: index }));
  saveQuickRecords(reordered);
};

export const getFridgeItems = (): FridgeItem[] => {
  return safeJsonArrayParse<FridgeItem>(localStorage.getItem(STORAGE_KEYS.FRIDGE_ITEMS));
};

export const saveFridgeItems = (items: FridgeItem[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.FRIDGE_ITEMS, JSON.stringify(items));
  } catch (e) {
    console.error('[Storage] 保存冰箱数据失败:', e);
  }
};

export const addFridgeItem = (
  item: Omit<FridgeItem, 'id' | 'createdAt' | 'updatedAt'>
): FridgeItem => {
  const items = getFridgeItems();
  const now = nowISO();
  const newItem: FridgeItem = {
    ...item,
    id: `fridge_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
    createdAt: now,
    updatedAt: now,
  };

  items.push(newItem);
  saveFridgeItems(items);
  return newItem;
};

export const updateFridgeItem = (
  id: string,
  data: Partial<Omit<FridgeItem, 'id' | 'createdAt'>>
): void => {
  const items = getFridgeItems();
  const index = items.findIndex((item) => item.id === id);

  if (index !== -1) {
    items[index] = {
      ...items[index],
      ...data,
      updatedAt: nowISO(),
    };
    saveFridgeItems(items);
  }
};

export const deleteFridgeItem = (id: string): void => {
  const items = getFridgeItems();
  const filtered = items.filter((item) => item.id !== id);
  saveFridgeItems(filtered);
};
