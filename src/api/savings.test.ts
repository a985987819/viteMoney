import { describe, it, expect, beforeEach, vi } from 'vitest';
import { http } from '../utils/request';

vi.mock('../utils/request', () => {
  const mockHttp = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
    interceptors: {
      request: { use: vi.fn(), eject: vi.fn() },
      response: { use: vi.fn(), eject: vi.fn() },
    },
  };
  return {
    http: mockHttp,
    createApiService: vi.fn(() => ({
      getList: vi.fn(),
      create: vi.fn(),
      update: vi.fn(),
      delete: vi.fn(),
    })),
  };
});

describe('savings API', async () => {
  const { getSavingsSummary, depositToGoal, withdrawFromGoal } = await import('./savings');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getSavingsSummary', () => {
    it('should fetch savings summary', async () => {
      const mockData = {
        totalGoals: 3,
        totalTarget: 30000,
        totalSaved: 12000,
        totalRemaining: 18000,
        completedGoals: 1,
        inProgressGoals: 2,
      };

      vi.mocked(http.get).mockResolvedValue(mockData);

      const result = await getSavingsSummary();

      expect(http.get).toHaveBeenCalledWith('/savings/summary');
      expect(result).toEqual(mockData);
    });
  });

  describe('depositToGoal', () => {
    it('should deposit to a savings goal', async () => {
      const mockGoal = {
        id: 'goal-1',
        name: '旅游基金',
        targetAmount: 10000,
        currentAmount: 3500,
        remainingAmount: 6500,
        percentage: 35,
        icon: 'plane',
        color: '#4CAF50',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      vi.mocked(http.post).mockResolvedValue({
        goal: mockGoal,
        message: 'Deposit successful',
      });

      const result = await depositToGoal('goal-1', { amount: 500, remark: '本月存款' });

      expect(http.post).toHaveBeenCalledWith('/savings/goals/goal-1/deposit', {
        amount: 500,
        remark: '本月存款',
      });
      expect(result.message).toBe('Deposit successful');
    });
  });

  describe('withdrawFromGoal', () => {
    it('should withdraw from a savings goal', async () => {
      const mockGoal = {
        id: 'goal-1',
        name: '旅游基金',
        targetAmount: 10000,
        currentAmount: 2000,
        remainingAmount: 8000,
        percentage: 20,
        icon: 'plane',
        color: '#4CAF50',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      vi.mocked(http.post).mockResolvedValue({
        goal: mockGoal,
        message: 'Withdrawal successful',
      });

      const result = await withdrawFromGoal('goal-1', { amount: 1000, remark: '临时用' });

      expect(http.post).toHaveBeenCalledWith('/savings/goals/goal-1/withdraw', {
        amount: 1000,
        remark: '临时用',
      });
      expect(result.goal.currentAmount).toBe(2000);
    });
  });
});
