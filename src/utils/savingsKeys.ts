/**
 * 攒钱模块的本地存储键 —— 唯一定义处
 * 此前散落在 api/savings.ts 与 utils/dataMigration.ts 两处硬编码，
 * 抽出共享以纳入存储守护层（storageGuard）的快照保护范围
 */

export const SAVINGS_PLANS_KEY = 'savings_plans';
export const SAVINGS_DEPOSITS_KEY = 'savings_deposits';
export const SAVINGS_ACTIVE_PLAN_ID_KEY = 'savings_active_plan_id';

/** 攒钱模块参与数据快照/备份的全部键 */
export const SAVINGS_DATA_KEYS = [
  SAVINGS_PLANS_KEY,
  SAVINGS_DEPOSITS_KEY,
  SAVINGS_ACTIVE_PLAN_ID_KEY,
] as const;
