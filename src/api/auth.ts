import { http } from '../utils/request';

// 用户信息
export interface User {
  id: number;
  username: string;
  createdAt: string;
}

// Token信息
export interface Tokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

// 登录/注册响应
export interface AuthResponse {
  user: User;
  tokens: Tokens;
}

// 登录请求参数
export interface LoginParams {
  username: string;
  password: string;
}

// 注册请求参数
export interface RegisterParams {
  username: string;
  password: string;
}

// 刷新Token请求参数
export interface RefreshParams {
  refreshToken: string;
}

// 用户登录
export const login = (data: LoginParams): Promise<AuthResponse> => {
  return http.post('/auth/login', data);
};

// 用户注册
export const register = (data: RegisterParams): Promise<AuthResponse> => {
  return http.post('/auth/register', data);
};

// 刷新Token
export const refreshToken = (data: RefreshParams): Promise<AuthResponse> => {
  return http.post('/auth/refresh', data);
};

// 用户登出
export const logout = (data: RefreshParams): Promise<{ message: string }> => {
  return http.post('/auth/logout', data);
};

// 全设备登出
export const logoutAll = (): Promise<{ message: string }> => {
  return http.post('/auth/logout-all');
};

// 获取用户信息
export const getProfile = (): Promise<{ userId: number; username: string }> => {
  return http.get('/auth/profile');
};
