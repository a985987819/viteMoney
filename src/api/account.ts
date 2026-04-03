import { http } from '../utils/request';

// 账户管理相关接口

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

// 获取账户列表
export const getAccounts = (): Promise<Account[]> => {
  return http.get('/accounts');
};

// 创建账户
export const createAccount = (data: CreateAccountParams): Promise<Account> => {
  return http.post('/accounts', data);
};

// 更新账户
export const updateAccount = (id: string, data: UpdateAccountParams): Promise<Account> => {
  return http.put(`/accounts/${id}`, data);
};

// 删除账户
export const deleteAccount = (id: string): Promise<{ message: string }> => {
  return http.delete(`/accounts/${id}`);
};

// 调整账户余额
export const adjustAccountBalance = (id: string, data: AdjustBalanceParams): Promise<{ account: Account; message: string }> => {
  return http.post(`/accounts/${id}/adjust`, data);
};

// 获取账户统计
export const getAccountSummary = (): Promise<AccountSummary> => {
  return http.get('/accounts/summary');
};
