import { http } from '../utils/request';
import type { RecordItem } from './record';

// 账单模板相关接口

export interface BillTemplate {
  id: string;
  name: string;
  type: 'expense' | 'income';
  category: string;
  subCategory?: string;
  categoryIcon: string;
  amount?: number;
  remark?: string;
  account: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTemplateParams {
  name: string;
  type: 'expense' | 'income';
  category: string;
  subCategory?: string;
  categoryIcon: string;
  amount?: number;
  remark?: string;
  account: string;
}

export interface UpdateTemplateParams {
  name?: string;
  type?: 'expense' | 'income';
  category?: string;
  subCategory?: string;
  categoryIcon?: string;
  amount?: number;
  remark?: string;
  account?: string;
}

export interface UseTemplateParams {
  date?: string;
  amount?: number;
  remark?: string;
}

// 获取模板列表
export const getTemplates = (): Promise<BillTemplate[]> => {
  return http.get('/templates');
};

// 创建模板
export const createTemplate = (data: CreateTemplateParams): Promise<BillTemplate> => {
  return http.post('/templates', data);
};

// 更新模板
export const updateTemplate = (id: string, data: UpdateTemplateParams): Promise<BillTemplate> => {
  return http.put(`/templates/${id}`, data);
};

// 删除模板
export const deleteTemplate = (id: string): Promise<{ message: string }> => {
  return http.delete(`/templates/${id}`);
};

// 使用模板创建记录
export const useTemplate = (id: string, data?: UseTemplateParams): Promise<{ record: RecordItem; message: string }> => {
  return http.post(`/templates/${id}/use`, data);
};
