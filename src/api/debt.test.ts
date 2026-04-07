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

describe('debt API', async () => {
  const { getDebtSummary, repayDebt } = await import('./debt');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getDebtSummary', () => {
    it('should fetch debt summary', async () => {
      const mockData = {
        totalLent: 5000,
        totalBorrowed: 3000,
        totalRepaid: 2000,
        totalRemaining: 6000,
        pendingLent: 4000,
        pendingBorrowed: 2000,
      };

      vi.mocked(http.get).mockResolvedValue(mockData);

      const result = await getDebtSummary();

      expect(http.get).toHaveBeenCalledWith('/debts/summary');
      expect(result).toEqual(mockData);
    });
  });

  describe('repayDebt', () => {
    it('should record a repayment', async () => {
      const mockDebt = {
        id: 'debt-1',
        type: 'lend' as const,
        personName: '张三',
        amount: 1000,
        repaidAmount: 800,
        remainingAmount: 200,
        status: 'partial' as const,
        date: '2024-01-01',
        repayRecords: [{ id: 'r1', amount: 500, date: '2024-02-01' }, { id: 'r2', amount: 300, date: '2024-03-01' }],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      vi.mocked(http.post).mockResolvedValue({
        debt: mockDebt,
        message: 'Repayment recorded',
      });

      const result = await repayDebt('debt-1', { amount: 300, remark: '部分还款' });

      expect(http.post).toHaveBeenCalledWith('/debts/debt-1/repay', {
        amount: 300,
        remark: '部分还款',
      });
      expect(result.message).toBe('Repayment recorded');
    });
  });
});
