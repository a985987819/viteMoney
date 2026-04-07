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

describe('recurring API', async () => {
  const { getRecurringSummary, toggleRecurringRecord } = await import('./recurring');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getRecurringSummary', () => {
    it('should fetch recurring summary', async () => {
      const mockData = {
        totalActive: 5,
        totalInactive: 2,
        monthlyEstimatedExpense: 3000,
        monthlyEstimatedIncome: 1000,
      };

      vi.mocked(http.get).mockResolvedValue(mockData);

      const result = await getRecurringSummary();

      expect(http.get).toHaveBeenCalledWith('/recurring/summary');
      expect(result).toEqual(mockData);
    });
  });

  describe('toggleRecurringRecord', () => {
    it('should toggle active status of a recurring record', async () => {
      const mockRecurring = {
        id: 'rec-1',
        type: 'expense' as const,
        category: '订阅费',
        categoryIcon: 'subscriptions',
        amount: 99,
        remark: '',
        frequency: 'monthly' as const,
        startDate: '2024-01-01',
        account: '微信',
        isActive: false,
        nextExecuteDate: '2024-04-01',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      vi.mocked(http.post).mockResolvedValue({
        recurring: mockRecurring,
        message: 'Toggled successfully',
      });

      const result = await toggleRecurringRecord('rec-1');

      expect(http.post).toHaveBeenCalledWith('/recurring/rec-1/toggle');
      expect(result.message).toBe('Toggled successfully');
    });
  });
});
