import { createApiService, http } from '../utils/request';

export type FrequencyType = 'daily' | 'workday' | 'weekly' | 'monthly' | 'yearly';

export interface RecurringRecord {
  id: string;
  type: 'expense' | 'income';
  category: string;
  subCategory?: string;
  categoryIcon: string;
  amount: number;
  remark: string;
  frequency: FrequencyType;
  startDate: string;
  endDate?: string;
  account: string;
  isActive: boolean;
  nextExecuteDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRecurringParams {
  type: 'expense' | 'income';
  category: string;
  subCategory?: string;
  categoryIcon: string;
  amount: number;
  remark: string;
  frequency: FrequencyType;
  startDate: string;
  endDate?: string;
  account: string;
}

export interface UpdateRecurringParams {
  type?: 'expense' | 'income';
  category?: string;
  subCategory?: string;
  categoryIcon?: string;
  amount?: number;
  remark?: string;
  frequency?: FrequencyType;
  startDate?: string;
  endDate?: string;
  account?: string;
}

export interface RecurringSummary {
  totalActive: number;
  totalInactive: number;
  monthlyEstimatedExpense: number;
  monthlyEstimatedIncome: number;
}

const api = createApiService<RecurringRecord, CreateRecurringParams, UpdateRecurringParams>('/recurring');

// 获取周期记账列表
export const getRecurringRecords = api.getList;
// 创建周期记账
export const createRecurringRecord = api.create;
// 更新周期记账
export const updateRecurringRecord = api.update;
// 删除周期记账
export const deleteRecurringRecord = api.delete;

// 切换启用/禁用状态
export const toggleRecurringRecord = (id: string): Promise<{ recurring: RecurringRecord; message: string }> => {
  return http.post(`/recurring/${id}/toggle`);
};

// 获取周期记账统计
export const getRecurringSummary = (): Promise<RecurringSummary> => {
  return http.get('/recurring/summary');
};
