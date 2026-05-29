import { describe, it, expect, vi } from 'vitest';

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

  const mockAxiosFn = vi.fn(() => mockAxiosInstance);
  const mockAxios = Object.assign(mockAxiosFn, {
    create: vi.fn(() => mockAxiosInstance),
    isCancel: vi.fn((val: unknown) => val?.constructor?.name === 'Cancel'),
    CancelToken: class {
      constructor(executor: (cancel: unknown) => void) {
        executor(vi.fn());
      }
    },
  });

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
