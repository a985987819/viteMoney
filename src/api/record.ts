import { http } from '../utils/request';

// 记账记录相关接口

export interface RecordItem {
  id: string;
  type: 'expense' | 'income';
  category: string;
  subCategory?: string;
  categoryIcon: string;
  amount: number;
  remark: string;
  date: number; // 时间戳格式，包含日期和时间
  account: string;
}

export interface MonthlyStats {
  totalExpense: number;
  totalIncome: number;
  budget: number;
}

// 获取本月统计
export const getMonthlyStats = (month?: string): Promise<MonthlyStats> => {
  return http.get('/records/stats', { params: { month } });
};

// 获取最近3天的记账记录
export const getRecentRecords = (): Promise<RecordItem[]> => {
  return http.get('/records/recent');
};

// 获取所有记录
export const getRecords = (params?: { startDate?: string; endDate?: string; type?: string }): Promise<RecordItem[]> => {
  return http.get('/records', { params });
};

// 分页获取记录
export const getRecordsByPage = (params?: { page?: number; pageSize?: number; startDate?: string; endDate?: string }): Promise<{ records: RecordItem[]; hasMore: boolean }> => {
  return http.get('/records/page', { params });
};

// 按日期分组获取记录（获取最近N个有记录的日期）
export interface DateGroup {
  date: string;
  records: RecordItem[];
}

export interface RecordsByDateResponse {
  data: DateGroup[];
  hasMore: boolean;
  nextCursor?: string;
}

export const getRecordsByDateGroups = (params?: { cursor?: string; limit?: number }): Promise<RecordsByDateResponse> => {
  return http.get('/records/by-date', { params });
};

// 创建记账记录
export const createRecord = (data: Omit<RecordItem, 'id'>): Promise<RecordItem> => {
  return http.post('/records', data);
};

// 更新记账记录
export const updateRecord = (id: string, data: Partial<RecordItem>): Promise<RecordItem> => {
  return http.put(`/records/${id}`, data);
};

// 删除记账记录
export const deleteRecord = (id: string): Promise<void> => {
  return http.delete(`/records/${id}`);
};

// 批量导入记账记录
export const importRecords = (records: Omit<RecordItem, 'id'>[]): Promise<{ success: number; failed: number }> => {
  return http.post('/records/import', { records });
};

// 删除所有导入的记录
export const deleteImportedRecords = (): Promise<{ deleted: number }> => {
  return http.delete('/records/import');
};

// ==================== 筛选相关接口 ====================

export interface BillFilterParams {
  year?: number;
  month?: number;
  startDate?: string;
  endDate?: string;
  type?: 'expense' | 'income';
  categories?: string[];
  minAmount?: number;
  maxAmount?: number;
}

export interface BillSummary {
  totalExpense: number;
  totalIncome: number;
  count: number;
}

export interface BillListResponse {
  summary: BillSummary;
  records: RecordItem[];
}

// 获取筛选后的账单列表
export const getBillsWithFilter = (params: BillFilterParams): Promise<BillListResponse> => {
  return http.get('/records/filter', { params });
};

// ==================== 报表相关接口 ====================

export interface DailyStats {
  date: string;
  expense: number;
  income: number;
}

export interface CategoryStats {
  category: string;
  categoryIcon: string;
  type: 'expense' | 'income';
  amount: number;
  percentage: number;
  count: number;
}

export interface ReportData {
  period: {
    startDate: string;
    endDate: string;
  };
  summary: {
    totalExpense: number;
    totalIncome: number;
    balance: number;
  };
  dailyStats: DailyStats[];
  categoryStats: {
    expense: CategoryStats[];
    income: CategoryStats[];
  };
}

// 获取报表数据
export const getReportData = (year?: number, month?: number): Promise<ReportData> => {
  return http.get('/records/report', { params: { year, month } });
};

// 删除重复记录
export const removeDuplicates = (): Promise<{ removed: number }> => {
  return http.delete('/duplicates');
};

// ==================== 重复检测相关接口 ====================

export interface DuplicateRecord {
  id: string;
  type: 'expense' | 'income';
  category: string;
  amount: number;
  date: string;
  remark: string;
  duplicateGroup: number;
}

export interface DuplicateGroup {
  groupId: number;
  records: DuplicateRecord[];
  similarity: number;
}

export interface DuplicateCheckResult {
  hasDuplicates: boolean;
  totalDuplicates: number;
  groups: DuplicateGroup[];
}

// 检测重复记录
export const checkDuplicates = (): Promise<DuplicateCheckResult> => {
  return http.get('/records/duplicates');
};

// 删除重复记录（新接口）
export const deleteDuplicateRecords = (): Promise<{ removed: number; message: string }> => {
  return http.delete('/records/duplicates');
};
