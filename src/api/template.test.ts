import { describe, it, expect, beforeEach, vi } from 'vitest';
import { http, createApiService } from '../utils/request';

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

describe('template API', async () => {
  const { useTemplate } = await import('./template');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('useTemplate', () => {
    it('should create a record from template', async () => {
      const mockRecord = {
        id: 'new-record',
        type: 'expense' as const,
        category: '餐饮',
        categoryIcon: 'dining',
        amount: 50,
        remark: '',
        date: Date.now(),
        account: '微信',
      };

      vi.mocked(http.post).mockResolvedValue({
        record: mockRecord,
        message: 'Record created from template',
      });

      const result = await useTemplate('tpl-1', { date: '2024-06-15', amount: 50 });

      expect(http.post).toHaveBeenCalledWith('/templates/tpl-1/use', {
        date: '2024-06-15',
        amount: 50,
      });
      expect(result.record.id).toBe('new-record');
    });

    it('should create a record from template without optional data', async () => {
      vi.mocked(http.post).mockResolvedValue({
        record: { id: 'new-record-2' },
        message: 'OK',
      });

      await useTemplate('tpl-1');

      expect(http.post).toHaveBeenCalledWith('/templates/tpl-1/use', undefined);
    });
  });
});
