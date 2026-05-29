// ==================== 从 API 模块 re-export ====================
export type { User, Tokens, AuthResponse, LoginParams, RegisterParams, RefreshParams } from '../api/auth';
export type { RecordItem, MonthlyStats, DateGroup, RecordsByDateResponse, BillFilterParams, BillSummary, BillListResponse, DailyStats, CategoryStats, ReportData, DuplicateRecord, DuplicateGroup, DuplicateCheckResult } from '../api/record';
export type { CategoryType, Category, SubCategory, CreateCategoryParams, UpdateCategoryParams } from '../api/category';
export type { BudgetResponse, BudgetStats, SetBudgetParams } from '../api/budget';
export type { AccountType, Account, CreateAccountParams, UpdateAccountParams, AdjustBalanceParams, AccountSummary } from '../api/account';
export type { SavingsGoal, CreateSavingsGoalParams, UpdateSavingsGoalParams, DepositParams, WithdrawParams, SavingsSummary, SavingsPlan, CreateSavingsPlanParams, UpdateSavingsPlanParams, SavingsDeposit, CreateDepositParams } from '../api/savings';
export type { DebtType, Debt, RepayRecord, CreateDebtParams, UpdateDebtParams, RepayParams, DebtSummary } from '../api/debt';
export type { FrequencyType, RecurringRecord, CreateRecurringParams, UpdateRecurringParams, RecurringSummary } from '../api/recurring';
export type { BillTemplate, CreateTemplateParams, UpdateTemplateParams, UseTemplateParams } from '../api/template';

// ==================== 从 storage 模块 re-export ====================
export type { LocalBudget, QuickRecord, FridgeItem } from '../utils/storage';

// ==================== 本地存储专用类型 ====================
export const STORAGE_KEYS = {
  RECORDS: 'money_records',
  USER: 'money_user',
  ACCESS_TOKEN: 'money_access_token',
  REFRESH_TOKEN: 'money_refresh_token',
  TOKEN_EXPIRES: 'money_token_expires',
  CATEGORIES: 'money_categories',
  BUDGETS: 'money_budgets',
  QUICK_RECORDS: 'money_quick_records',
  FRIDGE_ITEMS: 'money_fridge_items',
} as const;

export type StorageKeys = typeof STORAGE_KEYS;

// ==================== 导入转换类型（仅在此文件定义）====================

export interface ImportRecord {
  category?: string;
  subCategory?: string;
  amount: number;
  type?: 'expense' | 'income';
  date: string;
  remark?: string;
  account?: string;
}

export interface TransformedRecord {
  category: string;
  subCategory: string | null;
  categoryEnglishName: string;
  subCategoryEnglishName: string | null;
  categoryIcon: string;
  subCategoryIcon: string | null;
  amount: number;
  type: 'expense' | 'income';
  date: string;
  remark: string;
  account: string;
  isMatched: boolean;
  originalCategory: string;
  originalSubCategory: string | null;
}

export interface TransformStats {
  total: number;
  matched: number;
  unmatched: number;
  byCategory: Record<string, number>;
  unmatchedCategories: string[];
}

export interface TransformResult {
  record: TransformedRecord;
  isMatched: boolean;
  matchInfo?: {
    mainCategory: unknown;
    subCategory: unknown | null;
  };
}

export interface ImportTransformResult {
  records: Partial<RecordItem>[];
  stats: ImportStats;
}

export interface ImportStats {
  total: number;
  matched: number;
  unmatched: number;
  byCategory: Record<string, number>;
  unmatchedCategories: string[];
}

// ==================== 数据版本与迁移类型 ====================

export interface DataVersion {
  version: number;
  lastMigrated: string;
}
