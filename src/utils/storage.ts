import type { RecordItem } from '../api/record';
import type { Category } from '../api/category';
import type { User, Tokens } from '../api/auth';
import type { BudgetResponse } from '../api/budget';
import { expenseCategories, incomeCategories, type MainCategory, type SubCategory } from '../constants/categories';

export interface LocalBudget extends Omit<BudgetResponse, 'id' | 'spent' | 'remaining' | 'percentage'> {
  id?: string;
}

const STORAGE_KEYS = {
  RECORDS: 'money_records',
  USER: 'money_user',
  ACCESS_TOKEN: 'money_access_token',
  REFRESH_TOKEN: 'money_refresh_token',
  TOKEN_EXPIRES: 'money_token_expires',
  CATEGORIES: 'money_categories',
  BUDGETS: 'money_budgets',
  QUICK_RECORDS: 'money_quick_records',
};

export interface QuickRecord {
  id: string;
  categoryId: string;
  subCategoryId: string;
  amount: number;
  type: 'expense' | 'income';
  order: number;
}

// 从统一分类源生成默认分类数据
const generateDefaultCategories = (): Record<string, Category[]> => {
  // 转换支出分类
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

  // 转换收入分类
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

  // 其他分类类型
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

// 默认分类数据
const defaultCategoriesData = generateDefaultCategories();

// 获取本地记录
export const getLocalRecords = (): RecordItem[] => {
  const data = localStorage.getItem(STORAGE_KEYS.RECORDS);
  return data ? JSON.parse(data) : [];
};

// 保存本地记录
export const saveLocalRecords = (records: RecordItem[]) => {
  localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
};

// 添加单条记录
export const addLocalRecord = (record: RecordItem) => {
  const records = getLocalRecords();
  records.unshift(record);
  saveLocalRecords(records);
};

// 删除单条记录
export const deleteLocalRecord = (id: string) => {
  const records = getLocalRecords();
  const filtered = records.filter(r => r.id !== id);
  saveLocalRecords(filtered);
};

// 更新单条记录
export const updateLocalRecord = (id: string, data: Partial<RecordItem>) => {
  const records = getLocalRecords();
  const index = records.findIndex(r => r.id === id);
  if (index !== -1) {
    records[index] = { ...records[index], ...data };
    saveLocalRecords(records);
  }
};

// 获取用户信息
export const getUser = (): User | null => {
  const data = localStorage.getItem(STORAGE_KEYS.USER);
  return data ? JSON.parse(data) : null;
};

// 保存用户信息
export const saveUser = (user: User) => {
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
};

// Token 相关 keys 列表
const TOKEN_KEYS = [
  STORAGE_KEYS.ACCESS_TOKEN,
  STORAGE_KEYS.REFRESH_TOKEN,
  STORAGE_KEYS.TOKEN_EXPIRES,
];

// 清除用户信息
export const clearUser = () => {
  localStorage.removeItem(STORAGE_KEYS.USER);
  TOKEN_KEYS.forEach((key) => localStorage.removeItem(key));
};

// 获取 access token
export const getAccessToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};

// 获取 refresh token
export const getRefreshToken = (): string | null => {
  return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};

// 保存 tokens
export const saveTokens = (tokens: Tokens) => {
  localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
  localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
  // 计算过期时间戳
  const expiresAt = Date.now() + tokens.expiresIn * 1000;
  localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRES, expiresAt.toString());
};

// 检查 token 是否过期
export const isTokenExpired = (): boolean => {
  const expiresAt = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRES);
  if (!expiresAt) return true;
  return Date.now() > parseInt(expiresAt, 10);
};

// 检查是否登录
export const isLoggedIn = (): boolean => {
  return !!getAccessToken() && !isTokenExpired();
};

// 所有用户数据 keys
const ALL_DATA_KEYS = [
  STORAGE_KEYS.RECORDS,
  STORAGE_KEYS.USER,
  STORAGE_KEYS.ACCESS_TOKEN,
  STORAGE_KEYS.REFRESH_TOKEN,
  STORAGE_KEYS.TOKEN_EXPIRES,
];

// 清除所有本地数据
export const clearAllData = () => {
  ALL_DATA_KEYS.forEach((key) => localStorage.removeItem(key));
};

// 分类相关
type CategoryType = 'expense' | 'income' | 'transfer' | 'debt' | 'reimbursement';
type CategoryMap = Record<CategoryType, Category[]>;

// 获取本地分类
export const getLocalCategories = (): CategoryMap => {
  const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  if (data) {
    return JSON.parse(data);
  }
  return defaultCategoriesData as CategoryMap;
};

// 保存本地分类
export const saveLocalCategories = (categories: CategoryMap) => {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
};

// 获取支出分类（转换为 MainCategory 格式）
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

// 获取收入分类（转换为 MainCategory 格式）
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

// 获取本地预算列表
export const getLocalBudgets = (): LocalBudget[] => {
  const data = localStorage.getItem(STORAGE_KEYS.BUDGETS);
  return data ? JSON.parse(data) : [];
};

// 保存本地预算列表
export const saveLocalBudgets = (budgets: LocalBudget[]) => {
  localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
};

// 获取指定年月的本地预算
export const getLocalBudget = (year: number, month: number): LocalBudget | null => {
  const budgets = getLocalBudgets();
  return budgets.find(b => b.year === year && b.month === month) || null;
};

// 设置本地预算
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

// 删除本地预算
export const deleteLocalBudget = (year: number, month: number): void => {
  const budgets = getLocalBudgets();
  const filtered = budgets.filter(b => !(b.year === year && b.month === month));
  saveLocalBudgets(filtered);
};

// 获取快捷记账列表
export const getQuickRecords = (): QuickRecord[] => {
  const data = localStorage.getItem(STORAGE_KEYS.QUICK_RECORDS);
  return data ? JSON.parse(data) : [];
};

// 保存快捷记账列表
export const saveQuickRecords = (records: QuickRecord[]): void => {
  localStorage.setItem(STORAGE_KEYS.QUICK_RECORDS, JSON.stringify(records));
};

// 添加快捷记账
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

// 更新快捷记账
export const updateQuickRecord = (id: string, data: Partial<QuickRecord>): void => {
  const records = getQuickRecords();
  const index = records.findIndex(r => r.id === id);
  if (index !== -1) {
    records[index] = { ...records[index], ...data };
    saveQuickRecords(records);
  }
};

// 删除快捷记账
export const deleteQuickRecord = (id: string): void => {
  const records = getQuickRecords();
  const filtered = records.filter(r => r.id !== id);
  saveQuickRecords(filtered);
};

// 重新排序快捷记账
export const reorderQuickRecords = (records: QuickRecord[]): void => {
  const reordered = records.map((r, index) => ({ ...r, order: index }));
  saveQuickRecords(reordered);
};
