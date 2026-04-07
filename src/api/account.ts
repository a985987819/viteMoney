import { createApiService, http } from '../utils/request';

export type AccountType = 'cash' | 'bank' | 'alipay' | 'wechat' | 'credit' | 'other';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  icon: string;
  balance: number;
  initialBalance: number;
  isDefault: boolean;
  color: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAccountParams {
  name: string;
  type: AccountType;
  icon: string;
  initialBalance: number;
  isDefault?: boolean;
  color?: string;
}

export interface UpdateAccountParams {
  name?: string;
  type?: AccountType;
  icon?: string;
  initialBalance?: number;
  isDefault?: boolean;
  color?: string;
}

export interface AdjustBalanceParams {
  newBalance: number;
  remark?: string;
}

export interface AccountSummary {
  totalAccounts: number;
  totalBalance: number;
  accountTypeSummary: {
    type: AccountType;
    count: number;
    totalBalance: number;
  }[];
}

const api = createApiService<Account, CreateAccountParams, UpdateAccountParams>('/accounts');

// 获取账户列表
export const getAccounts = api.getList;
// 创建账户
export const createAccount = api.create;
// 更新账户
export const updateAccount = api.update;
// 删除账户
export const deleteAccount = api.delete;

// 调整账户余额
export const adjustAccountBalance = (id: string, data: AdjustBalanceParams): Promise<{ account: Account; message: string }> => {
  return http.post(`/accounts/${id}/adjust`, data);
};

// 获取账户统计
export const getAccountSummary = (): Promise<AccountSummary> => {
  return http.get('/accounts/summary');
};
