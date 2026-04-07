import { createApiService, http } from '../utils/request';

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

const api = createApiService<SavingsGoal, CreateSavingsGoalParams, UpdateSavingsGoalParams>('/savings/goals');

// 获取所有储蓄目标
export const getSavingsGoals = api.getList;
// 创建储蓄目标
export const createSavingsGoal = api.create;
// 更新储蓄目标
export const updateSavingsGoal = api.update;
// 删除储蓄目标
export const deleteSavingsGoal = api.delete;

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
