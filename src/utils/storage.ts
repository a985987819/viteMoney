import type { RecordItem } from '../api/record';
import type { Category } from '../api/category';
import type { User, Tokens } from '../api/auth';
import type { BudgetResponse } from '../api/budget';

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
};

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
export const getLocalCategories = (): CategoryMap | null => {
  const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
  return data ? JSON.parse(data) : null;
};

// 保存本地分类
export const saveLocalCategories = (categories: CategoryMap) => {
  localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
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
