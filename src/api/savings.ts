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

export interface SavingsPlan {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  startDate: string;
  endDate: string;
  dailyAverage: number;
  percentage?: number;
  status: 'active' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface CreateSavingsPlanParams {
  name: string;
  targetAmount: number;
  endDate: string;
}

export interface UpdateSavingsPlanParams {
  name?: string;
  targetAmount?: number;
  endDate?: string;
}

export interface SavingsDeposit {
  id: string;
  planId: string;
  amount: number;
  type: 'average' | 'random' | 'manual';
  remark?: string;
  createdAt: string;
}

export interface CreateDepositParams {
  amount: number;
  type: 'average' | 'random' | 'manual';
  remark?: string;
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

// 攒钱计划相关 API
export const createSavingsPlan = (data: CreateSavingsPlanParams): Promise<SavingsPlan> => {
  return http.post('/savings/plans', data);
};

export const getSavingsPlans = (): Promise<SavingsPlan[]> => {
  return http.get('/savings/plans');
};

export const updateSavingsPlan = (id: string, data: UpdateSavingsPlanParams): Promise<SavingsPlan> => {
  return http.put(`/savings/plans/${id}`, data);
};

export const deleteSavingsPlan = (id: string): Promise<void> => {
  return http.delete(`/savings/plans/${id}`);
};

// 攒钱存款 API
export const makeDeposit = (planId: string, data: CreateDepositParams): Promise<SavingsDeposit> => {
  return http.post(`/savings/plans/${planId}/deposit`, data);
};

export const getDeposits = (planId: string): Promise<SavingsDeposit[]> => {
  return http.get(`/savings/plans/${planId}/deposits`);
};

// 本地存储相关函数
const STORAGE_KEY = 'savings_plans';
const DEPOSITS_KEY = 'savings_deposits';

export const getLocalSavingsPlans = (): SavingsPlan[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveLocalSavingsPlans = (plans: SavingsPlan[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
};

export const getLocalDeposits = (planId?: string): SavingsDeposit[] => {
  const data = localStorage.getItem(DEPOSITS_KEY);
  const allDeposits = data ? JSON.parse(data) : [];
  return planId ? allDeposits.filter((d: SavingsDeposit) => d.planId === planId) : allDeposits;
};

export const saveLocalDeposit = (deposit: SavingsDeposit) => {
  const deposits = getLocalDeposits();
  deposits.push(deposit);
  localStorage.setItem(DEPOSITS_KEY, JSON.stringify(deposits));

  // 更新计划的已存金额
  const plans = getLocalSavingsPlans();
  const plan = plans.find(p => p.id === deposit.planId);
  if (plan) {
    plan.savedAmount += deposit.amount;
    plan.percentage = Math.min(100, (plan.savedAmount / plan.targetAmount) * 100);
    plan.updatedAt = new Date().toISOString();
    saveLocalSavingsPlans(plans);
  }
};
