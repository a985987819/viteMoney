import { createApiService, http } from '../utils/request';
import type { RecordItem } from './record';

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

const api = createApiService<BillTemplate, CreateTemplateParams, UpdateTemplateParams>('/templates');

// 获取模板列表
export const getTemplates = api.getList;
// 创建模板
export const createTemplate = api.create;
// 更新模板
export const updateTemplate = api.update;
// 删除模板
export const deleteTemplate = api.delete;

// 使用模板创建记录
export const useTemplate = (id: string, data?: UseTemplateParams): Promise<{ record: RecordItem; message: string }> => {
  return http.post(`/templates/${id}/use`, data);
};
