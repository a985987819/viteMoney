import { createApiService, http } from '../utils/request';

export type CategoryType = 'expense' | 'income' | 'transfer' | 'debt' | 'reimbursement';

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: CategoryType;
  color?: string;
  subCategories?: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
}

export interface SubCategory {
  id: string;
  name: string;
  categoryId: string;
}

export interface CreateCategoryParams {
  name: string;
  icon: string;
  type: CategoryType;
  color?: string;
}

export interface UpdateCategoryParams {
  name?: string;
  icon?: string;
  color?: string;
}

const api = createApiService<Category, CreateCategoryParams, UpdateCategoryParams>('/categories');

// 获取支出分类列表
export const getExpenseCategories = () => http.get<Category[]>('/categories/expense');
// 获取收入分类列表
export const getIncomeCategories = () => http.get<Category[]>('/categories/income');
// 获取所有分类
export const getAllCategories = (): Promise<{ expense: Category[]; income: Category[] }> => {
  return http.get('/categories');
};

// 创建分类
export const createCategory = api.create;
// 更新分类
export const updateCategory = api.update;
// 删除分类
export const deleteCategory = api.delete;
