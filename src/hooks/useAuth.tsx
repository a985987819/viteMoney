import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import { message } from 'antd';
import { login as loginApi, register as registerApi, logout as logoutApi } from '../api/auth';
import { getUser, saveUser, saveTokens, clearUser, getRefreshToken, isLoggedIn as checkIsLoggedIn } from '../utils/storage';

interface User {
  id: number;
  username: string;
}

interface AuthResponse {
  user: User;
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedUser = getUser();
    const loggedIn = checkIsLoggedIn();
    if (storedUser && loggedIn) {
      setUser(storedUser);
      setIsLoggedIn(true);
    }
  }, []);

  const handleAuthSuccess = async (res: AuthResponse, action: 'login' | 'register') => {
    saveUser(res.user);
    saveTokens(res.tokens);
    setUser(res.user);
    setIsLoggedIn(true);
    message.success(action === 'login' ? '登录成功' : '注册成功');
  };

  const handleAuthError = (error: unknown, action: 'login' | 'register') => {
    const err = error as { response?: { data?: { error?: string } } };
    const errorMsg = err.response?.data?.error || `${action === 'login' ? '登录' : '注册'}失败`;
    message.error(errorMsg);
    throw error;
  };

  const login = async (username: string, password: string) => {
    try {
      const res = await loginApi({ username, password });
      await handleAuthSuccess(res, 'login');
    } catch (error: unknown) {
      handleAuthError(error, 'login');
    }
  };

  const logout = async () => {
    try {
      const refreshToken = getRefreshToken();
      if (refreshToken) {
        await logoutApi({ refreshToken });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearUser();
      setUser(null);
      setIsLoggedIn(false);
      message.success('已退出登录');
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const res = await registerApi({ username, password });
      await handleAuthSuccess(res, 'register');
    } catch (error: unknown) {
      handleAuthError(error, 'register');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
