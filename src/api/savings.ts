import { http } from '../utils/request';

// 储蓄目标相关接口

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  icon: string;
  color: string;
  percentage: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSavingsGoalParams {
  name: string;
  targetAmount: number;
  deadline?: string;
  icon: string;
  color: string;
}

export interface UpdateSavingsGoalParams {
  name?: string;
  targetAmount?: number;
  deadline?: string;
  icon?: string;
  color?: string;
}

export interface DepositParams {
  amount: number;
  remark?: string;
}

export interface WithdrawParams {
  amount: number;
  remark?: string;
}

export interface SavingsSummary {
  totalGoals: number;
  totalTarget: number;
  totalSaved: number;
  totalRemaining: number;
  completedGoals: number;
  inProgressGoals: number;
}

// 获取所有储蓄目标
export const getSavingsGoals = (): Promise<SavingsGoal[]> => {
  return http.get('/savings/goals');
};

// 创建储蓄目标
export const createSavingsGoal = (data: CreateSavingsGoalParams): Promise<SavingsGoal> => {
  return http.post('/savings/goals', data);
};

// 更新储蓄目标
export const updateSavingsGoal = (id: string, data: UpdateSavingsGoalParams): Promise<SavingsGoal> => {
  return http.put(`/savings/goals/${id}`, data);
};

// 删除储蓄目标
export const deleteSavingsGoal = (id: string): Promise<{ message: string }> => {
  return http.delete(`/savings/goals/${id}`);
};

// 向目标存钱
export const depositToGoal = (id: string, data: DepositParams): Promise<{ goal: SavingsGoal; message: string }> => {
  return http.post(`/savings/goals/${id}/deposit`, data);
};

// 从目标取钱
export const withdrawFromGoal = (id: string, data: WithdrawParams): Promise<{ goal: SavingsGoal; message: string }> => {
  return http.post(`/savings/goals/${id}/withdraw`, data);
};

// 获取储蓄统计
export const getSavingsSummary = (): Promise<SavingsSummary> => {
  return http.get('/savings/summary');
};
