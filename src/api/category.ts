import { http } from '../utils/request';

// 分类相关接口

export type CategoryType = 'expense' | 'income' | 'transfer' | 'debt' | 'reimbursement';

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: CategoryType;
  color?: string;
  subCategories?: string[];
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

// 获取支出分类列表
export const getExpenseCategories = (): Promise<Category[]> => {
  return http.get('/categories/expense');
};

// 获取收入分类列表
export const getIncomeCategories = (): Promise<Category[]> => {
  return http.get('/categories/income');
};

// 获取所有分类
export const getAllCategories = (): Promise<{ expense: Category[]; income: Category[] }> => {
  return http.get('/categories');
};

// ==================== 新增接口 ====================

// 创建分类
export const createCategory = (data: CreateCategoryParams): Promise<Category> => {
  return http.post('/categories', data);
};

// 更新分类
export const updateCategory = (id: string, data: UpdateCategoryParams): Promise<Category> => {
  return http.put(`/categories/${id}`, data);
};

// 删除分类
export const deleteCategory = (id: string): Promise<{ message: string }> => {
  return http.delete(`/categories/${id}`);
};
