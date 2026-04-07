import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './useAuth';
import * as authApi from '../api/auth';
import * as storage from '../utils/storage';

vi.mock('../api/auth', () => ({
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
}));

vi.mock('../utils/storage', () => ({
  getUser: vi.fn(),
  saveUser: vi.fn(),
  saveTokens: vi.fn(),
  clearUser: vi.fn(),
  getRefreshToken: vi.fn(),
  isLoggedIn: vi.fn(),
}));

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(storage.getUser).mockReturnValue(null);
    vi.mocked(storage.isLoggedIn).mockReturnValue(false);
  });

  it('should initialize with no user when not logged in', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toBeNull();
    expect(result.current.isLoggedIn).toBe(false);
  });

  it('should initialize with user when stored user exists and is logged in', () => {
    vi.mocked(storage.getUser).mockReturnValue({ id: 1, username: 'test' });
    vi.mocked(storage.isLoggedIn).mockReturnValue(true);

    const { result } = renderHook(() => useAuth(), { wrapper });
    expect(result.current.user).toEqual({ id: 1, username: 'test' });
    expect(result.current.isLoggedIn).toBe(true);
  });

  it('should login successfully', async () => {
    const mockUser = { id: 1, username: 'testuser', createdAt: new Date().toISOString() };
    const mockTokens = {
      accessToken: 'access',
      refreshToken: 'refresh',
      expiresIn: 3600,
      tokenType: 'Bearer',
    };

    vi.mocked(authApi.login).mockResolvedValue({ user: mockUser, tokens: mockTokens });

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login('testuser', 'password123');
    });

    expect(authApi.login).toHaveBeenCalledWith({ username: 'testuser', password: 'password123' });
    expect(storage.saveUser).toHaveBeenCalledWith(mockUser);
    expect(storage.saveTokens).toHaveBeenCalledWith(mockTokens);
    expect(result.current.user?.username).toBe('testuser');
    expect(result.current.isLoggedIn).toBe(true);
  });

  it('should logout successfully', async () => {
    vi.mocked(storage.getRefreshToken).mockReturnValue('refresh_token');
    vi.mocked(authApi.logout).mockResolvedValue({ message: 'OK' });

    // First set a user
    vi.mocked(storage.getUser).mockReturnValue({ id: 1, username: 'test' });
    vi.mocked(storage.isLoggedIn).mockReturnValue(true);

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.logout();
    });

    expect(storage.clearUser).toHaveBeenCalled();
    expect(result.current.user).toBeNull();
    expect(result.current.isLoggedIn).toBe(false);
  });
});
