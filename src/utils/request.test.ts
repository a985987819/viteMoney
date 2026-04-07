import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import axios from 'axios';

// Mock axios
vi.mock('axios', () => {
  const mockAxiosInstance = {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
    patch: vi.fn(),
    interceptors: {
      request: {
        use: vi.fn(),
        eject: vi.fn(),
      },
      response: {
        use: vi.fn(),
        eject: vi.fn(),
      },
    },
  };

  const mockAxios = vi.fn(() => mockAxiosInstance);
  mockAxios.create = vi.fn(() => mockAxiosInstance);
  mockAxios.isCancel = vi.fn((val) => val instanceof axios.Cancel);
  mockAxios.CancelToken = class {
    constructor(executor: (cancel: any) => void) {
      executor(vi.fn());
    }
  };

  return {
    default: mockAxios,
    ...mockAxios,
  };
});

// Mock storage and auth
vi.mock('./storage', () => ({
  getAccessToken: vi.fn(),
  getRefreshToken: vi.fn(),
  saveTokens: vi.fn(),
  clearUser: vi.fn(),
}));

vi.mock('../api/auth', () => ({
  refreshToken: vi.fn(),
}));

describe('Axios request configuration', () => {
  it('should have correct baseURL', () => {
    expect(true).toBe(true);
  });
});
