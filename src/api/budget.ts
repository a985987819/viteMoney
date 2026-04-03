import { http } from '../utils/request';

// 预算数据类型
export interface BudgetResponse {
  id: string;
  year: number;
  month: number;
  amount: number;      // 预算总额
  spent: number;       // 已支出金额
  remaining: number;   // 剩余金额
  percentage: number;  // 已使用百分比
}

export interface BudgetStats {
  currentMonth: BudgetResponse | null;  // 当前月预算
  lastMonth: BudgetResponse | null;     // 上月预算
  averageSpent: number;                 // 近6个月平均支出
}

export interface SetBudgetParams {
  amount: number;
  year?: number;
  month?: number;
}

// 获取当前月预算
export const getCurrentBudget = (): Promise<{ budget: BudgetResponse | null; message?: string }> => {
  return http.get('/budgets/current');
};

// 获取指定月份预算
export const getMonthBudget = (year: number, month: number): Promise<{ budget: BudgetResponse | null }> => {
  return http.get('/budgets/month', { params: { year, month } });
};

// 设置预算（创建或更新）
export const setBudget = (params: SetBudgetParams): Promise<{ budget: BudgetResponse; message: string }> => {
  return http.post('/budgets', params);
};

// 删除预算
export const deleteBudget = (year: number, month: number): Promise<{ message: string }> => {
  return http.delete('/budgets', { params: { year, month } });
};

// 获取预算统计
export const getBudgetStats = (): Promise<BudgetStats> => {
  return http.get('/budgets/stats');
};

// 获取最近几个月预算
export const getRecentBudgets = (months: number = 6): Promise<{ budgets: BudgetResponse[] }> => {
  return http.get('/budgets/recent', { params: { months } });
};
