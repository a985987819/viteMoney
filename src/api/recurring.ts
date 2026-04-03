import { http } from '../utils/request';

// 周期记账相关接口

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

// 获取周期记账列表
export const getRecurringRecords = (): Promise<RecurringRecord[]> => {
  return http.get('/recurring');
};

// 创建周期记账
export const createRecurringRecord = (data: CreateRecurringParams): Promise<RecurringRecord> => {
  return http.post('/recurring', data);
};

// 更新周期记账
export const updateRecurringRecord = (id: string, data: UpdateRecurringParams): Promise<RecurringRecord> => {
  return http.put(`/recurring/${id}`, data);
};

// 删除周期记账
export const deleteRecurringRecord = (id: string): Promise<{ message: string }> => {
  return http.delete(`/recurring/${id}`);
};

// 切换启用/禁用状态
export const toggleRecurringRecord = (id: string): Promise<{ recurring: RecurringRecord; message: string }> => {
  return http.post(`/recurring/${id}/toggle`);
};

// 获取周期记账统计
export const getRecurringSummary = (): Promise<RecurringSummary> => {
  return http.get('/recurring/summary');
};
