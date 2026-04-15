import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  getLocalSavingsPlans,
  saveLocalSavingsPlans,
  getLocalDeposits,
  type SavingsPlan,
  type SavingsDeposit,
} from './savings';

// Mock http 模块
vi.mock('../utils/request', () => ({
  http: {
    post: vi.fn().mockResolvedValue({}),
    get: vi.fn().mockResolvedValue([]),
    put: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
  },
  createApiService: vi.fn(() => ({
    getList: vi.fn().mockResolvedValue([]),
    create: vi.fn().mockResolvedValue({}),
    update: vi.fn().mockResolvedValue({}),
    delete: vi.fn().mockResolvedValue({}),
  })),
}));

describe('savings API - 本地存储边界值和异常处理', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('getLocalSavingsPlans - 边界值', () => {
    it('应该处理空 localStorage', () => {
      const plans = getLocalSavingsPlans();
      expect(plans).toEqual([]);
    });

    it('应该处理损坏的 JSON', () => {
      localStorage.setItem('savings_plans', 'invalid json');
      expect(() => getLocalSavingsPlans()).toThrow();
    });

    it('应该处理 null 值', () => {
      localStorage.setItem('savings_plans', 'null');
      const plans = getLocalSavingsPlans();
      expect(plans).toBeNull();
    });

    it('应该处理非数组数据', () => {
      localStorage.setItem('savings_plans', '{"id": 1}');
      const plans = getLocalSavingsPlans();
      expect(plans).toEqual({ id: 1 });
    });
  });

  describe('saveLocalSavingsPlans - 边界值', () => {
    it('应该处理空数组', () => {
      saveLocalSavingsPlans([]);
      const plans = getLocalSavingsPlans();
      expect(plans).toEqual([]);
    });

    it('应该处理单个计划', () => {
      const plans: SavingsPlan[] = [{
        id: 'plan_1',
        name: '测试计划',
        targetAmount: 10000,
        savedAmount: 5000,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        dailyAverage: 27.4,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }];
      saveLocalSavingsPlans(plans);
      const retrieved = getLocalSavingsPlans();
      expect(retrieved).toHaveLength(1);
      expect(retrieved[0].name).toBe('测试计划');
    });

    it('应该处理大量计划', () => {
      const plans: SavingsPlan[] = Array.from({ length: 1000 }, (_, i) => ({
        id: `plan_${i}`,
        name: `计划${i}`,
        targetAmount: 1000 * (i + 1),
        savedAmount: 500 * (i + 1),
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        dailyAverage: 10,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      saveLocalSavingsPlans(plans);
      const retrieved = getLocalSavingsPlans();
      expect(retrieved).toHaveLength(1000);
    });

    it('应该处理包含特殊字符的计划名称', () => {
      const plans: SavingsPlan[] = [{
        id: 'plan_1',
        name: '计划<special>"test"',
        targetAmount: 10000,
        savedAmount: 0,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        dailyAverage: 27.4,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }];
      saveLocalSavingsPlans(plans);
      const retrieved = getLocalSavingsPlans();
      expect(retrieved[0].name).toBe('计划<special>"test"');
    });

    it('应该处理极大金额', () => {
      const plans: SavingsPlan[] = [{
        id: 'plan_1',
        name: '大额计划',
        targetAmount: 999999999999.99,
        savedAmount: 888888888888.88,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        dailyAverage: 999999999,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }];
      saveLocalSavingsPlans(plans);
      const retrieved = getLocalSavingsPlans();
      expect(retrieved[0].targetAmount).toBe(999999999999.99);
    });

    it('应该处理零金额', () => {
      const plans: SavingsPlan[] = [{
        id: 'plan_1',
        name: '零计划',
        targetAmount: 0,
        savedAmount: 0,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        dailyAverage: 0,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }];
      saveLocalSavingsPlans(plans);
      const retrieved = getLocalSavingsPlans();
      expect(retrieved[0].targetAmount).toBe(0);
    });

    it('应该处理负数金额', () => {
      const plans: SavingsPlan[] = [{
        id: 'plan_1',
        name: '负计划',
        targetAmount: -1000,
        savedAmount: -500,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        dailyAverage: -10,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }];
      saveLocalSavingsPlans(plans);
      const retrieved = getLocalSavingsPlans();
      expect(retrieved[0].targetAmount).toBe(-1000);
    });

    it('应该处理不同状态', () => {
      const statuses: Array<'active' | 'completed' | 'failed'> = ['active', 'completed', 'failed'];
      const plans = statuses.map((status, i) => ({
        id: `plan_${i}`,
        name: `计划${status}`,
        targetAmount: 10000,
        savedAmount: status === 'completed' ? 10000 : 5000,
        startDate: '2024-01-01',
        endDate: '2024-12-31',
        dailyAverage: 27.4,
        status,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }));
      saveLocalSavingsPlans(plans);
      const retrieved = getLocalSavingsPlans();
      expect(retrieved).toHaveLength(3);
      expect(retrieved.map(p => p.status)).toEqual(statuses);
    });
  });

  describe('getLocalDeposits - 边界值', () => {
    it('应该处理空存款记录', () => {
      const deposits = getLocalDeposits();
      expect(deposits).toEqual([]);
    });

    it('应该处理损坏的 JSON', () => {
      localStorage.setItem('savings_deposits', 'invalid json');
      expect(() => getLocalDeposits()).toThrow();
    });

    it('应该处理 null 值', () => {
      localStorage.setItem('savings_deposits', 'null');
      const deposits = getLocalDeposits();
      expect(deposits).toBeNull();
    });

    it('应该按 planId 过滤存款', () => {
      const deposits: SavingsDeposit[] = [
        {
          id: 'deposit_1',
          planId: 'plan_1',
          amount: 100,
          type: 'manual',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'deposit_2',
          planId: 'plan_2',
          amount: 200,
          type: 'manual',
          createdAt: new Date().toISOString(),
        },
        {
          id: 'deposit_3',
          planId: 'plan_1',
          amount: 300,
          type: 'average',
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem('savings_deposits', JSON.stringify(deposits));

      const plan1Deposits = getLocalDeposits('plan_1');
      const plan2Deposits = getLocalDeposits('plan_2');
      const allDeposits = getLocalDeposits();

      expect(plan1Deposits).toHaveLength(2);
      expect(plan1Deposits.map(d => d.amount)).toEqual([100, 300]);
      expect(plan2Deposits).toHaveLength(1);
      expect(plan2Deposits[0].amount).toBe(200);
      expect(allDeposits).toHaveLength(3);
    });

    it('应该处理不存在的 planId', () => {
      const deposits: SavingsDeposit[] = [
        {
          id: 'deposit_1',
          planId: 'plan_1',
          amount: 100,
          type: 'manual',
          createdAt: new Date().toISOString(),
        },
      ];
      localStorage.setItem('savings_deposits', JSON.stringify(deposits));

      const result = getLocalDeposits('non-existent-plan');
      expect(result).toEqual([]);
    });

    it('应该处理不同存款类型', () => {
      const types: Array<'average' | 'random' | 'manual'> = ['average', 'random', 'manual'];
      const deposits: SavingsDeposit[] = types.map((type, i) => ({
        id: `deposit_${i}`,
        planId: 'plan_1',
        amount: 100 * (i + 1),
        type,
        createdAt: new Date().toISOString(),
      }));
      localStorage.setItem('savings_deposits', JSON.stringify(deposits));

      const retrieved = getLocalDeposits('plan_1');
      expect(retrieved).toHaveLength(3);
      expect(retrieved.map(d => d.type)).toEqual(types);
    });

    it('应该处理极大金额存款', () => {
      const deposits: SavingsDeposit[] = [{
        id: 'deposit_1',
        planId: 'plan_1',
        amount: 999999999999.99,
        type: 'manual',
        createdAt: new Date().toISOString(),
      }];
      localStorage.setItem('savings_deposits', JSON.stringify(deposits));

      const retrieved = getLocalDeposits('plan_1');
      expect(retrieved[0].amount).toBe(999999999999.99);
    });

    it('应该处理零金额存款', () => {
      const deposits: SavingsDeposit[] = [{
        id: 'deposit_1',
        planId: 'plan_1',
        amount: 0,
        type: 'manual',
        createdAt: new Date().toISOString(),
      }];
      localStorage.setItem('savings_deposits', JSON.stringify(deposits));

      const retrieved = getLocalDeposits('plan_1');
      expect(retrieved[0].amount).toBe(0);
    });

    it('应该处理负数金额存款', () => {
      const deposits: SavingsDeposit[] = [{
        id: 'deposit_1',
        planId: 'plan_1',
        amount: -100,
        type: 'manual',
        createdAt: new Date().toISOString(),
      }];
      localStorage.setItem('savings_deposits', JSON.stringify(deposits));

      const retrieved = getLocalDeposits('plan_1');
      expect(retrieved[0].amount).toBe(-100);
    });

    it('应该处理包含特殊字符的备注', () => {
      const deposits: SavingsDeposit[] = [{
        id: 'deposit_1',
        planId: 'plan_1',
        amount: 100,
        type: 'manual',
        remark: '备注<special>"test"',
        createdAt: new Date().toISOString(),
      }];
      localStorage.setItem('savings_deposits', JSON.stringify(deposits));

      const retrieved = getLocalDeposits('plan_1');
      expect(retrieved[0].remark).toBe('备注<special>"test"');
    });

    it('应该处理大量存款记录', () => {
      const deposits: SavingsDeposit[] = Array.from({ length: 1000 }, (_, i) => ({
        id: `deposit_${i}`,
        planId: `plan_${i % 10}`,
        amount: i + 1,
        type: 'manual',
        createdAt: new Date().toISOString(),
      }));
      localStorage.setItem('savings_deposits', JSON.stringify(deposits));

      const plan0Deposits = getLocalDeposits('plan_0');
      expect(plan0Deposits).toHaveLength(100);
    });
  });
});
