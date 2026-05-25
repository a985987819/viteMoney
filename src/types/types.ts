/**
 * 集中类型声明文件
 * 将项目中分散在各个 API 文件和 storage 文件中的所有数据结构集中声明
 * 保持所有现有字段不变，增加可选的扩展字段以方便未来兼容
 */

// ==================== 认证模块 ====================

/** 用户信息 */
export interface User {
  /** 用户唯一标识 */
  id: number;
  /** 用户名 */
  username: string;
  /** 创建时间 */
  createdAt: string;
  /** 用户头像 URL */
  avatar?: string;
  /** 用户邮箱 */
  email?: string;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** Token 信息 */
export interface Tokens {
  /** 访问令牌 */
  accessToken: string;
  /** 刷新令牌 */
  refreshToken: string;
  /** 过期时间（秒） */
  expiresIn: number;
  /** 令牌类型 */
  tokenType: string;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 登录/注册响应 */
export interface AuthResponse {
  /** 用户信息 */
  user: User;
  /** Token 信息 */
  tokens: Tokens;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 登录请求参数 */
export interface LoginParams {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 注册请求参数 */
export interface RegisterParams {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 刷新 Token 请求参数 */
export interface RefreshParams {
  /** 刷新令牌 */
  refreshToken: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

// ==================== 记账记录模块 ====================

/** 记账记录 */
export interface RecordItem {
  /** 记录唯一标识 */
  id: string;
  /** 类型：expense-支出，income-收入 */
  type: 'expense' | 'income';
  /** 主分类名称 */
  category: string;
  /** 子分类名称 */
  subCategory?: string;
  /** 主分类图标标识 */
  categoryIcon: string;
  /** 子分类图标标识 */
  subCategoryIcon?: string;
  /** 金额 */
  amount: number;
  /** 备注 */
  remark: string;
  /** 日期时间戳，包含日期和时间 */
  date: number;
  /** 关联账户名称 */
  account: string;
  /** 标签列表 */
  tags?: string[];
  /** 来源：manual-手动，import-导入，recurring-周期，template-模板 */
  source?: 'manual' | 'import' | 'recurring' | 'template';
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 月度统计 */
export interface MonthlyStats {
  /** 总支出 */
  totalExpense: number;
  /** 总收入 */
  totalIncome: number;
  /** 预算金额 */
  budget: number;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 按日期分组的记录 */
export interface DateGroup {
  /** 日期字符串 */
  date: string;
  /** 该日期下的记录列表 */
  records: RecordItem[];
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 按日期分组获取记录的响应 */
export interface RecordsByDateResponse {
  /** 日期分组数据 */
  data: DateGroup[];
  /** 是否有更多数据 */
  hasMore: boolean;
  /** 下一页游标 */
  nextCursor?: string;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 账单筛选参数 */
export interface BillFilterParams {
  /** 年份 */
  year?: number;
  /** 月份 */
  month?: number;
  /** 开始日期 */
  startDate?: string;
  /** 结束日期 */
  endDate?: string;
  /** 类型筛选：expense-支出，income-收入 */
  type?: 'expense' | 'income';
  /** 分类筛选列表 */
  categories?: string[];
  /** 最小金额 */
  minAmount?: number;
  /** 最大金额 */
  maxAmount?: number;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 账单汇总 */
export interface BillSummary {
  /** 总支出 */
  totalExpense: number;
  /** 总收入 */
  totalIncome: number;
  /** 记录数量 */
  count: number;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 账单列表响应 */
export interface BillListResponse {
  /** 汇总信息 */
  summary: BillSummary;
  /** 记录列表 */
  records: RecordItem[];
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 每日统计 */
export interface DailyStats {
  /** 日期字符串 */
  date: string;
  /** 当日支出 */
  expense: number;
  /** 当日收入 */
  income: number;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 分类统计 */
export interface CategoryStats {
  /** 分类名称 */
  category: string;
  /** 分类图标标识 */
  categoryIcon: string;
  /** 类型：expense-支出，income-收入 */
  type: 'expense' | 'income';
  /** 金额 */
  amount: number;
  /** 占比百分比 */
  percentage: number;
  /** 记录数量 */
  count: number;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 报表数据 */
export interface ReportData {
  /** 时间范围 */
  period: {
    /** 开始日期 */
    startDate: string;
    /** 结束日期 */
    endDate: string;
  };
  /** 汇总信息 */
  summary: {
    /** 总支出 */
    totalExpense: number;
    /** 总收入 */
    totalIncome: number;
    /** 结余 */
    balance: number;
  };
  /** 每日统计列表 */
  dailyStats: DailyStats[];
  /** 分类统计（按支出/收入分组） */
  categoryStats: {
    /** 支出分类统计 */
    expense: CategoryStats[];
    /** 收入分类统计 */
    income: CategoryStats[];
  };
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 重复记录 */
export interface DuplicateRecord {
  /** 记录唯一标识 */
  id: string;
  /** 类型：expense-支出，income-收入 */
  type: 'expense' | 'income';
  /** 分类名称 */
  category: string;
  /** 金额 */
  amount: number;
  /** 日期字符串 */
  date: string;
  /** 备注 */
  remark: string;
  /** 重复分组编号 */
  duplicateGroup: number;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 重复记录分组 */
export interface DuplicateGroup {
  /** 分组唯一标识 */
  groupId: number;
  /** 分组内的重复记录列表 */
  records: DuplicateRecord[];
  /** 相似度（0-1） */
  similarity: number;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 重复检测结果 */
export interface DuplicateCheckResult {
  /** 是否存在重复记录 */
  hasDuplicates: boolean;
  /** 重复记录总数 */
  totalDuplicates: number;
  /** 重复分组列表 */
  groups: DuplicateGroup[];
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

// ==================== 分类模块 ====================

/** 分类类型 */
export type CategoryType = 'expense' | 'income' | 'transfer' | 'debt' | 'reimbursement';

/** 子分类条目 */
export interface SubCategoryItem {
  /** 子分类唯一标识 */
  id: string;
  /** 子分类名称 */
  name: string;
  /** 子分类图标标识 */
  icon: string;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 分类 */
export interface Category {
  /** 分类唯一标识 */
  id: string;
  /** 分类名称 */
  name: string;
  /** 分类图标标识 */
  icon: string;
  /** 分类类型 */
  type: CategoryType;
  /** 分类颜色 */
  color?: string;
  /** 子分类列表 */
  subCategories?: SubCategoryItem[];
  /** 排序序号 */
  sortOrder?: number;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 子分类（关联主分类） */
export interface SubCategory {
  /** 子分类唯一标识 */
  id: string;
  /** 子分类名称 */
  name: string;
  /** 所属主分类 ID */
  categoryId: string;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 创建分类请求参数 */
export interface CreateCategoryParams {
  /** 分类名称 */
  name: string;
  /** 分类图标标识 */
  icon: string;
  /** 分类类型 */
  type: CategoryType;
  /** 分类颜色 */
  color?: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 更新分类请求参数 */
export interface UpdateCategoryParams {
  /** 分类名称 */
  name?: string;
  /** 分类图标标识 */
  icon?: string;
  /** 分类颜色 */
  color?: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

// ==================== 预算模块 ====================

/** 预算响应 */
export interface BudgetResponse {
  /** 预算唯一标识 */
  id: string;
  /** 年份 */
  year: number;
  /** 月份 */
  month: number;
  /** 预算总额 */
  amount: number;
  /** 已支出金额 */
  spent: number;
  /** 剩余金额 */
  remaining: number;
  /** 已使用百分比 */
  percentage: number;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 预算统计 */
export interface BudgetStats {
  /** 当前月预算 */
  currentMonth: BudgetResponse | null;
  /** 上月预算 */
  lastMonth: BudgetResponse | null;
  /** 近6个月平均支出 */
  averageSpent: number;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 设置预算请求参数 */
export interface SetBudgetParams {
  /** 预算金额 */
  amount: number;
  /** 年份 */
  year?: number;
  /** 月份 */
  month?: number;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

// ==================== 储蓄目标模块 ====================

/** 储蓄目标 */
export interface SavingsGoal {
  /** 目标唯一标识 */
  id: string;
  /** 目标名称 */
  name: string;
  /** 目标金额 */
  targetAmount: number;
  /** 当前已存金额 */
  currentAmount: number;
  /** 截止日期 */
  deadline?: string;
  /** 图标标识 */
  icon: string;
  /** 颜色 */
  color: string;
  /** 完成百分比 */
  percentage: number;
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 创建储蓄目标请求参数 */
export interface CreateSavingsGoalParams {
  /** 目标名称 */
  name: string;
  /** 目标金额 */
  targetAmount: number;
  /** 截止日期 */
  deadline?: string;
  /** 图标标识 */
  icon: string;
  /** 颜色 */
  color: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 更新储蓄目标请求参数 */
export interface UpdateSavingsGoalParams {
  /** 目标名称 */
  name?: string;
  /** 目标金额 */
  targetAmount?: number;
  /** 截止日期 */
  deadline?: string;
  /** 图标标识 */
  icon?: string;
  /** 颜色 */
  color?: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 存款请求参数 */
export interface DepositParams {
  /** 存款金额 */
  amount: number;
  /** 备注 */
  remark?: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 取款请求参数 */
export interface WithdrawParams {
  /** 取款金额 */
  amount: number;
  /** 备注 */
  remark?: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 储蓄汇总 */
export interface SavingsSummary {
  /** 目标总数 */
  totalGoals: number;
  /** 目标总金额 */
  totalTarget: number;
  /** 已存总额 */
  totalSaved: number;
  /** 剩余总额 */
  totalRemaining: number;
  /** 已完成目标数 */
  completedGoals: number;
  /** 进行中目标数 */
  inProgressGoals: number;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

// ==================== 攒钱计划模块 ====================

/** 攒钱计划 */
export interface SavingsPlan {
  /** 计划唯一标识 */
  id: string;
  /** 计划名称 */
  name: string;
  /** 目标金额 */
  targetAmount: number;
  /** 已存金额 */
  savedAmount: number;
  /** 开始日期 */
  startDate: string;
  /** 结束日期 */
  endDate: string;
  /** 日均需存金额 */
  dailyAverage: number;
  /** 完成百分比 */
  percentage?: number;
  /** 状态：active-进行中，completed-已完成，failed-已失败 */
  status: 'active' | 'completed' | 'failed';
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 创建攒钱计划请求参数 */
export interface CreateSavingsPlanParams {
  /** 计划名称 */
  name: string;
  /** 目标金额 */
  targetAmount: number;
  /** 结束日期 */
  endDate: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 更新攒钱计划请求参数 */
export interface UpdateSavingsPlanParams {
  /** 计划名称 */
  name?: string;
  /** 目标金额 */
  targetAmount?: number;
  /** 结束日期 */
  endDate?: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 攒钱存款记录 */
export interface SavingsDeposit {
  /** 存款记录唯一标识 */
  id: string;
  /** 所属计划 ID */
  planId: string;
  /** 存款金额 */
  amount: number;
  /** 存款类型：average-均摊，random-随机，manual-手动 */
  type: 'average' | 'random' | 'manual';
  /** 备注 */
  remark?: string;
  /** 创建时间 */
  createdAt: string;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 创建攒钱存款请求参数 */
export interface CreateDepositParams {
  /** 存款金额 */
  amount: number;
  /** 存款类型：average-均摊，random-随机，manual-手动 */
  type: 'average' | 'random' | 'manual';
  /** 备注 */
  remark?: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

// ==================== 借贷管理模块 ====================

/** 借贷类型 */
export type DebtType = 'lend' | 'borrow';

/** 借贷记录 */
export interface Debt {
  /** 借贷记录唯一标识 */
  id: string;
  /** 类型：lend-借出，borrow-借入 */
  type: DebtType;
  /** 对方姓名 */
  personName: string;
  /** 借贷金额 */
  amount: number;
  /** 已还金额 */
  repaidAmount: number;
  /** 剩余金额 */
  remainingAmount: number;
  /** 借贷日期 */
  date: string;
  /** 预计还款日期 */
  expectedRepayDate?: string;
  /** 备注 */
  remark?: string;
  /** 状态：pending-待还款，partial-部分还款，repaid-已还清 */
  status: 'pending' | 'partial' | 'repaid';
  /** 还款记录列表 */
  repayRecords: RepayRecord[];
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 还款记录 */
export interface RepayRecord {
  /** 还款记录唯一标识 */
  id: string;
  /** 还款金额 */
  amount: number;
  /** 备注 */
  remark?: string;
  /** 还款日期 */
  date: string;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 创建借贷记录请求参数 */
export interface CreateDebtParams {
  /** 类型：lend-借出，borrow-借入 */
  type: DebtType;
  /** 对方姓名 */
  personName: string;
  /** 借贷金额 */
  amount: number;
  /** 借贷日期 */
  date: string;
  /** 预计还款日期 */
  expectedRepayDate?: string;
  /** 备注 */
  remark?: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 更新借贷记录请求参数 */
export interface UpdateDebtParams {
  /** 类型：lend-借出，borrow-借入 */
  type?: DebtType;
  /** 对方姓名 */
  personName?: string;
  /** 借贷金额 */
  amount?: number;
  /** 借贷日期 */
  date?: string;
  /** 预计还款日期 */
  expectedRepayDate?: string;
  /** 备注 */
  remark?: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 还款请求参数 */
export interface RepayParams {
  /** 还款金额 */
  amount: number;
  /** 备注 */
  remark?: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 借贷汇总 */
export interface DebtSummary {
  /** 借出总额 */
  totalLent: number;
  /** 借入总额 */
  totalBorrowed: number;
  /** 已还总额 */
  totalRepaid: number;
  /** 剩余总额 */
  totalRemaining: number;
  /** 待收回借出金额 */
  pendingLent: number;
  /** 待偿还借入金额 */
  pendingBorrowed: number;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

// ==================== 周期记账模块 ====================

/** 周期频率类型 */
export type FrequencyType = 'daily' | 'workday' | 'weekly' | 'monthly' | 'yearly';

/** 周期记账记录 */
export interface RecurringRecord {
  /** 记录唯一标识 */
  id: string;
  /** 类型：expense-支出，income-收入 */
  type: 'expense' | 'income';
  /** 主分类名称 */
  category: string;
  /** 子分类名称 */
  subCategory?: string;
  /** 主分类图标标识 */
  categoryIcon: string;
  /** 金额 */
  amount: number;
  /** 备注 */
  remark: string;
  /** 周期频率 */
  frequency: FrequencyType;
  /** 开始日期 */
  startDate: string;
  /** 结束日期 */
  endDate?: string;
  /** 关联账户名称 */
  account: string;
  /** 是否启用 */
  isActive: boolean;
  /** 下次执行日期 */
  nextExecuteDate: string;
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 创建周期记账请求参数 */
export interface CreateRecurringParams {
  /** 类型：expense-支出，income-收入 */
  type: 'expense' | 'income';
  /** 主分类名称 */
  category: string;
  /** 子分类名称 */
  subCategory?: string;
  /** 主分类图标标识 */
  categoryIcon: string;
  /** 金额 */
  amount: number;
  /** 备注 */
  remark: string;
  /** 周期频率 */
  frequency: FrequencyType;
  /** 开始日期 */
  startDate: string;
  /** 结束日期 */
  endDate?: string;
  /** 关联账户名称 */
  account: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 更新周期记账请求参数 */
export interface UpdateRecurringParams {
  /** 类型：expense-支出，income-收入 */
  type?: 'expense' | 'income';
  /** 主分类名称 */
  category?: string;
  /** 子分类名称 */
  subCategory?: string;
  /** 主分类图标标识 */
  categoryIcon?: string;
  /** 金额 */
  amount?: number;
  /** 备注 */
  remark?: string;
  /** 周期频率 */
  frequency?: FrequencyType;
  /** 开始日期 */
  startDate?: string;
  /** 结束日期 */
  endDate?: string;
  /** 关联账户名称 */
  account?: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 周期记账汇总 */
export interface RecurringSummary {
  /** 活跃记录数 */
  totalActive: number;
  /** 停用记录数 */
  totalInactive: number;
  /** 月度预计支出 */
  monthlyEstimatedExpense: number;
  /** 月度预计收入 */
  monthlyEstimatedIncome: number;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

// ==================== 账户管理模块 ====================

/** 账户类型 */
export type AccountType = 'cash' | 'bank' | 'alipay' | 'wechat' | 'credit' | 'other';

/** 账户 */
export interface Account {
  /** 账户唯一标识 */
  id: string;
  /** 账户名称 */
  name: string;
  /** 账户类型 */
  type: AccountType;
  /** 账户图标标识 */
  icon: string;
  /** 当前余额 */
  balance: number;
  /** 初始余额 */
  initialBalance: number;
  /** 是否为默认账户 */
  isDefault: boolean;
  /** 账户颜色 */
  color: string;
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 创建账户请求参数 */
export interface CreateAccountParams {
  /** 账户名称 */
  name: string;
  /** 账户类型 */
  type: AccountType;
  /** 账户图标标识 */
  icon: string;
  /** 初始余额 */
  initialBalance: number;
  /** 是否为默认账户 */
  isDefault?: boolean;
  /** 账户颜色 */
  color?: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 更新账户请求参数 */
export interface UpdateAccountParams {
  /** 账户名称 */
  name?: string;
  /** 账户类型 */
  type?: AccountType;
  /** 账户图标标识 */
  icon?: string;
  /** 初始余额 */
  initialBalance?: number;
  /** 是否为默认账户 */
  isDefault?: boolean;
  /** 账户颜色 */
  color?: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 调整余额请求参数 */
export interface AdjustBalanceParams {
  /** 新余额 */
  newBalance: number;
  /** 备注 */
  remark?: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 账户汇总 */
export interface AccountSummary {
  /** 账户总数 */
  totalAccounts: number;
  /** 余额总计 */
  totalBalance: number;
  /** 按账户类型汇总 */
  accountTypeSummary: {
    /** 账户类型 */
    type: AccountType;
    /** 该类型账户数量 */
    count: number;
    /** 该类型余额总计 */
    totalBalance: number;
  }[];
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

// ==================== 账单模板模块 ====================

/** 账单模板 */
export interface BillTemplate {
  /** 模板唯一标识 */
  id: string;
  /** 模板名称 */
  name: string;
  /** 类型：expense-支出，income-收入 */
  type: 'expense' | 'income';
  /** 主分类名称 */
  category: string;
  /** 子分类名称 */
  subCategory?: string;
  /** 主分类图标标识 */
  categoryIcon: string;
  /** 金额（可选，模板可不指定金额） */
  amount?: number;
  /** 备注 */
  remark?: string;
  /** 关联账户名称 */
  account: string;
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 创建账单模板请求参数 */
export interface CreateTemplateParams {
  /** 模板名称 */
  name: string;
  /** 类型：expense-支出，income-收入 */
  type: 'expense' | 'income';
  /** 主分类名称 */
  category: string;
  /** 子分类名称 */
  subCategory?: string;
  /** 主分类图标标识 */
  categoryIcon: string;
  /** 金额（可选） */
  amount?: number;
  /** 备注 */
  remark?: string;
  /** 关联账户名称 */
  account: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 更新账单模板请求参数 */
export interface UpdateTemplateParams {
  /** 模板名称 */
  name?: string;
  /** 类型：expense-支出，income-收入 */
  type?: 'expense' | 'income';
  /** 主分类名称 */
  category?: string;
  /** 子分类名称 */
  subCategory?: string;
  /** 主分类图标标识 */
  categoryIcon?: string;
  /** 金额 */
  amount?: number;
  /** 备注 */
  remark?: string;
  /** 关联账户名称 */
  account?: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 使用模板请求参数 */
export interface UseTemplateParams {
  /** 指定日期 */
  date?: string;
  /** 指定金额 */
  amount?: number;
  /** 指定备注 */
  remark?: string;
  /** 扩展参数，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

// ==================== 本地存储专用类型 ====================

/** 本地预算（省略服务端计算字段） */
export interface LocalBudget extends Omit<BudgetResponse, 'id' | 'spent' | 'remaining' | 'percentage'> {
  /** 预算标识（本地可选） */
  id?: string;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 快捷记账项 */
export interface QuickRecord {
  /** 快捷记账唯一标识 */
  id: string;
  /** 分类 ID */
  categoryId: string;
  /** 子分类 ID */
  subCategoryId: string;
  /** 金额 */
  amount: number;
  /** 类型：expense-支出，income-收入 */
  type: 'expense' | 'income';
  /** 排序序号 */
  order: number;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 冰箱物品 */
export interface FridgeItem {
  /** 物品唯一标识 */
  id: string;
  /** 物品名称 */
  name: string;
  /** 数量描述 */
  quantity: string;
  /** 购买日期 */
  purchaseDate: string;
  /** 消耗进度（0-100） */
  progress: number;
  /** 创建时间 */
  createdAt: string;
  /** 更新时间 */
  updatedAt: string;
  /** 消费时间 */
  consumedAt?: string;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

// ==================== 导入转换类型 ====================

/** 导入记录（原始格式） */
export interface ImportRecord {
  /** 分类名称 */
  category?: string;
  /** 子分类名称 */
  subCategory?: string;
  /** 金额 */
  amount: number;
  /** 类型：expense-支出，income-收入 */
  type?: 'expense' | 'income';
  /** 日期 */
  date: string;
  /** 备注 */
  remark?: string;
  /** 账户 */
  account?: string;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 转换后的记录 */
export interface TransformedRecord {
  /** 标准主分类名称 */
  category: string;
  /** 标准子分类名称 */
  subCategory: string | null;
  /** 主分类英文名称（用于 CDN） */
  categoryEnglishName: string;
  /** 子分类英文名称（用于 CDN） */
  subCategoryEnglishName: string | null;
  /** 分类图标标识 */
  categoryIcon: string;
  /** 子分类图标标识 */
  subCategoryIcon: string | null;
  /** 金额 */
  amount: number;
  /** 类型：expense-支出，income-收入 */
  type: 'expense' | 'income';
  /** 日期 */
  date: string;
  /** 备注 */
  remark: string;
  /** 账户 */
  account: string;
  /** 是否成功匹配 */
  isMatched: boolean;
  /** 原始分类名称 */
  originalCategory: string;
  /** 原始子分类名称 */
  originalSubCategory: string | null;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 转换统计信息 */
export interface TransformStats {
  /** 总记录数 */
  total: number;
  /** 成功匹配数 */
  matched: number;
  /** 未匹配数 */
  unmatched: number;
  /** 按主分类统计 */
  byCategory: Record<string, number>;
  /** 未匹配的原始分类列表 */
  unmatchedCategories: string[];
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 单条记录的转换结果 */
export interface TransformResult {
  /** 转换后的记录 */
  record: TransformedRecord;
  /** 是否成功匹配 */
  isMatched: boolean;
  /** 匹配信息 */
  matchInfo?: {
    /** 主分类映射（使用 unknown 替代外部依赖） */
    mainCategory: unknown;
    /** 子分类映射（使用 unknown 替代外部依赖） */
    subCategory: unknown | null;
  };
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 导入转换结果 */
export interface ImportTransformResult {
  /** 转换后的记录列表 */
  records: Partial<RecordItem>[];
  /** 转换统计 */
  stats: ImportStats;
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

/** 导入统计 */
export interface ImportStats {
  /** 总记录数 */
  total: number;
  /** 成功匹配数 */
  matched: number;
  /** 未匹配数 */
  unmatched: number;
  /** 按主分类统计 */
  byCategory: Record<string, number>;
  /** 未匹配的原始分类列表 */
  unmatchedCategories: string[];
  /** 扩展元数据，用于未来兼容 */
  metadata?: Record<string, unknown>;
}

// ==================== API 通用类型 ====================

/** API 统一响应包装 */
export interface ApiResponse<T = unknown> {
  /** 响应状态码 */
  code: number;
  /** 响应数据 */
  data: T;
  /** 响应消息 */
  message: string;
}

/** API 错误类型 */
export interface ApiError {
  /** 错误名称 */
  name: string;
  /** 错误消息 */
  message: string;
  /** 错误状态码 */
  code: number;
  /** 附加错误数据 */
  data?: unknown;
}

// ==================== 数据版本与迁移类型 ====================

/** 数据版本信息，用于数据迁移 */
export interface DataVersion {
  /** 数据版本号 */
  version: number;
  /** 上次迁移时间 */
  lastMigrated: string;
}

/** localStorage 键名常量集合 */
export const STORAGE_KEYS = {
  RECORDS: 'money_records',
  USER: 'money_user',
  ACCESS_TOKEN: 'money_access_token',
  REFRESH_TOKEN: 'money_refresh_token',
  TOKEN_EXPIRES: 'money_token_expires',
  CATEGORIES: 'money_categories',
  BUDGETS: 'money_budgets',
  QUICK_RECORDS: 'money_quick_records',
  FRIDGE_ITEMS: 'money_fridge_items',
} as const;

/** localStorage 键名类型 */
export type StorageKeys = typeof STORAGE_KEYS;
