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
const ACTIVE_PLAN_KEY = 'savings_active_plan_id';

const recalculatePlan = (plan: SavingsPlan): SavingsPlan => {
  const percentage = plan.targetAmount > 0
    ? Math.min(100, (plan.savedAmount / plan.targetAmount) * 100)
    : 0;

  return {
    ...plan,
    percentage,
    status: percentage >= 100 ? 'completed' : plan.status === 'failed' ? 'failed' : 'active',
  };
};

export const getLocalSavingsPlans = (): SavingsPlan[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  const plans = data ? JSON.parse(data) : [];
  return Array.isArray(plans) ? plans.map(recalculatePlan) : [];
};

export const saveLocalSavingsPlans = (plans: SavingsPlan[]) => {
  const normalizedPlans = plans.map(recalculatePlan);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizedPlans));

  const activePlanId = localStorage.getItem(ACTIVE_PLAN_KEY);
  const hasActivePlan = normalizedPlans.some((plan) => plan.id === activePlanId);

  if (!normalizedPlans.length) {
    localStorage.removeItem(ACTIVE_PLAN_KEY);
    return;
  }

  if (!hasActivePlan) {
    localStorage.setItem(ACTIVE_PLAN_KEY, normalizedPlans[0].id);
  }
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
    plan.status = plan.percentage >= 100 ? 'completed' : 'active';
    plan.updatedAt = new Date().toISOString();
    saveLocalSavingsPlans(plans);
  }
};

export const setActiveSavingsPlan = (planId: string) => {
  localStorage.setItem(ACTIVE_PLAN_KEY, planId);
};

export const getActiveSavingsPlanId = (): string | null => {
  return localStorage.getItem(ACTIVE_PLAN_KEY);
};

export const getActiveSavingsPlan = (): SavingsPlan | null => {
  const plans = getLocalSavingsPlans();
  if (!plans.length) {
    return null;
  }

  const activePlanId = getActiveSavingsPlanId();
  if (!activePlanId) {
    const defaultPlan = plans[0];
    setActiveSavingsPlan(defaultPlan.id);
    return defaultPlan;
  }

  return plans.find((plan) => plan.id === activePlanId) || plans[0] || null;
};

export const deleteLocalSavingsPlan = (planId: string) => {
  const plans = getLocalSavingsPlans();
  const filteredPlans = plans.filter((plan) => plan.id !== planId);
  saveLocalSavingsPlans(filteredPlans);

  const deposits = getLocalDeposits().filter((deposit) => deposit.planId !== planId);
  localStorage.setItem(DEPOSITS_KEY, JSON.stringify(deposits));
};
