import { createApiService, http } from '../utils/request';

export type DebtType = 'lend' | 'borrow';

export interface Debt {
  id: string;
  type: DebtType;
  personName: string;
  amount: number;
  repaidAmount: number;
  remainingAmount: number;
  date: string;
  expectedRepayDate?: string;
  remark?: string;
  status: 'pending' | 'partial' | 'repaid';
  repayRecords: RepayRecord[];
  createdAt: string;
  updatedAt: string;
}

export interface RepayRecord {
  id: string;
  amount: number;
  remark?: string;
  date: string;
}

export interface CreateDebtParams {
  type: DebtType;
  personName: string;
  amount: number;
  date: string;
  expectedRepayDate?: string;
  remark?: string;
}

export interface UpdateDebtParams {
  type?: DebtType;
  personName?: string;
  amount?: number;
  date?: string;
  expectedRepayDate?: string;
  remark?: string;
}

export interface RepayParams {
  amount: number;
  remark?: string;
}

export interface DebtSummary {
  totalLent: number;
  totalBorrowed: number;
  totalRepaid: number;
  totalRemaining: number;
  pendingLent: number;
  pendingBorrowed: number;
}

const api = createApiService<Debt, CreateDebtParams, UpdateDebtParams>('/debts');

// 获取借贷列表
export const getDebts = api.getList;
// 创建借贷记录
export const createDebt = api.create;
// 更新借贷记录
export const updateDebt = api.update;
// 删除借贷记录
export const deleteDebt = api.delete;

// 记录还款
export const repayDebt = (id: string, data: RepayParams): Promise<{ debt: Debt; message: string }> => {
  return http.post(`/debts/${id}/repay`, data);
};

// 获取借贷统计
export const getDebtSummary = (): Promise<DebtSummary> => {
  return http.get('/debts/summary');
};
