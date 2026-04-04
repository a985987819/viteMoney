import { describe, it, expect, beforeEach, vi } from 'vitest';
import { http } from '../utils/request';

vi.mock('../utils/request', () => ({
  http: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('API functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('auth API', async () => {
    const { login, register, logout, refreshToken } = await import('./auth');

    describe('login', () => {
      it('should call correct endpoint with credentials', async () => {
        const mockCredentials = { username: 'testuser', password: 'password123' };
        const mockResponse = {
          user: { id: 1, username: 'testuser', createdAt: new Date().toISOString() },
          tokens: {
            accessToken: 'access_token',
            refreshToken: 'refresh_token',
            expiresIn: 3600,
            tokenType: 'Bearer',
          },
        };

        vi.mocked(http.post).mockResolvedValue(mockResponse);

        const result = await login(mockCredentials);

        expect(http.post).toHaveBeenCalledWith('/auth/login', mockCredentials);
        expect(result).toEqual(mockResponse);
      });
    });

    describe('register', () => {
      it('should call correct endpoint with registration data', async () => {
        const mockData = { username: 'newuser', password: 'password123' };
        const mockResponse = {
          user: { id: 2, username: 'newuser', createdAt: new Date().toISOString() },
          tokens: {
            accessToken: 'access_token',
            refreshToken: 'refresh_token',
            expiresIn: 3600,
            tokenType: 'Bearer',
          },
        };

        vi.mocked(http.post).mockResolvedValue(mockResponse);

        const result = await register(mockData);

        expect(http.post).toHaveBeenCalledWith('/auth/register', mockData);
        expect(result).toEqual(mockResponse);
      });
    });

    describe('logout', () => {
      it('should call logout endpoint', async () => {
        vi.mocked(http.post).mockResolvedValue(undefined);

        await logout();

        expect(http.post).toHaveBeenCalledWith('/auth/logout', undefined);
      });
    });

    describe('refreshToken', () => {
      it('should call refresh endpoint with refresh token', async () => {
        const mockResponse = {
          accessToken: 'new_access_token',
          refreshToken: 'new_refresh_token',
          expiresIn: 3600,
          tokenType: 'Bearer',
        };

        vi.mocked(http.post).mockResolvedValue(mockResponse);

        const result = await refreshToken({ refreshToken: 'old_refresh_token' });

        expect(http.post).toHaveBeenCalledWith('/auth/refresh', { refreshToken: 'old_refresh_token' });
        expect(result).toEqual(mockResponse);
      });
    });
  });

  describe('record API', async () => {
    const { getMonthlyStats, getRecordsByDateGroups, deleteRecord, createRecord, updateRecord } = await import('./record');

    describe('getMonthlyStats', () => {
      it('should fetch monthly stats', async () => {
        const mockStats = { totalExpense: 1000, totalIncome: 5000, budget: 5000 };

        vi.mocked(http.get).mockResolvedValue(mockStats);

        const result = await getMonthlyStats('2024-01');

        expect(http.get).toHaveBeenCalledWith('/records/stats', { params: { month: '2024-01' } });
        expect(result).toEqual(mockStats);
      });

      it('should work without month parameter', async () => {
        const mockStats = { totalExpense: 1000, totalIncome: 5000, budget: 5000 };

        vi.mocked(http.get).mockResolvedValue(mockStats);

        await getMonthlyStats();

        expect(http.get).toHaveBeenCalledWith('/records/stats', { params: { month: undefined } });
      });
    });

    describe('getRecordsByDateGroups', () => {
      it('should fetch records grouped by date', async () => {
        const mockResponse = {
          data: [
            {
              date: '2024-01-15',
              records: [
                { id: '1', amount: 100, type: 'expense' as const, category: '餐饮', categoryIcon: '🍜', date: Date.now(), remark: 'test', account: '现金' },
              ],
            },
          ],
          hasMore: false,
          nextCursor: undefined,
        };

        vi.mocked(http.get).mockResolvedValue(mockResponse);

        const result = await getRecordsByDateGroups({ cursor: undefined, limit: 10 });

        expect(http.get).toHaveBeenCalledWith('/records/by-date', {
          params: { cursor: undefined, limit: 10 },
        });
        expect(result).toEqual(mockResponse);
      });
    });

    describe('deleteRecord', () => {
      it('should delete record by id', async () => {
        vi.mocked(http.delete).mockResolvedValue(undefined);

        await deleteRecord('record-123');

        expect(http.delete).toHaveBeenCalledWith('/records/record-123');
      });
    });

    describe('createRecord', () => {
      it('should create new record', async () => {
        const mockRecord = {
          amount: 100,
          type: 'expense' as const,
          category: '餐饮',
          categoryIcon: '🍜',
          date: Date.now(),
          remark: 'test',
          account: '现金',
        };

        const mockCreated = { ...mockRecord, id: 'new-id' };

        vi.mocked(http.post).mockResolvedValue(mockCreated);

        const result = await createRecord(mockRecord);

        expect(http.post).toHaveBeenCalledWith('/records', mockRecord);
        expect(result).toEqual(mockCreated);
      });
    });

    describe('updateRecord', () => {
      it('should update existing record', async () => {
        const mockUpdate = { amount: 200, remark: 'updated' };
        const mockUpdated = {
          id: 'record-123',
          amount: 200,
          type: 'expense' as const,
          category: '餐饮',
          categoryIcon: '🍜',
          date: Date.now(),
          remark: 'updated',
          account: '现金',
        };

        vi.mocked(http.put).mockResolvedValue(mockUpdated);

        const result = await updateRecord('record-123', mockUpdate);

        expect(http.put).toHaveBeenCalledWith('/records/record-123', mockUpdate);
        expect(result).toEqual(mockUpdated);
      });
    });
  });

  describe('budget API', async () => {
    const { getCurrentBudget, getMonthBudget, setBudget } = await import('./budget');

    describe('getCurrentBudget', () => {
      it('should fetch current month budget', async () => {
        const mockBudget = {
          budget: {
            id: '1',
            year: 2024,
            month: 1,
            amount: 5000,
            spent: 1000,
            remaining: 4000,
            percentage: 20,
          },
        };

        vi.mocked(http.get).mockResolvedValue(mockBudget);

        const result = await getCurrentBudget();

        expect(http.get).toHaveBeenCalledWith('/budgets/current');
        expect(result).toEqual(mockBudget);
      });
    });

    describe('getMonthBudget', () => {
      it('should fetch budget for specific month', async () => {
        const mockBudget = {
          budget: {
            id: '1',
            year: 2024,
            month: 1,
            amount: 5000,
            spent: 1000,
            remaining: 4000,
            percentage: 20,
          },
        };

        vi.mocked(http.get).mockResolvedValue(mockBudget);

        const result = await getMonthBudget(2024, 1);

        expect(http.get).toHaveBeenCalledWith('/budgets/month', { params: { year: 2024, month: 1 } });
        expect(result).toEqual(mockBudget);
      });
    });

    describe('setBudget', () => {
      it('should set budget for specific month', async () => {
        const mockBudget = { year: 2024, month: 1, amount: 5000 };
        const mockResponse = {
          budget: {
            id: '1',
            ...mockBudget,
            spent: 0,
            remaining: 5000,
            percentage: 0,
          },
          message: 'Budget set successfully',
        };

        vi.mocked(http.post).mockResolvedValue(mockResponse);

        const result = await setBudget(mockBudget);

        expect(http.post).toHaveBeenCalledWith('/budgets', mockBudget);
        expect(result).toEqual(mockResponse);
      });
    });
  });
});
