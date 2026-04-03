import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios';
import { getAccessToken, getRefreshToken, saveTokens, clearUser } from './storage';
import { refreshToken } from '../api/auth';

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 600000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 是否正在刷新token
let isRefreshing = false;
// 等待token刷新的请求队列
let refreshSubscribers: ((token: string) => void)[] = [];

// 订阅token刷新
const subscribeTokenRefresh = (callback: (token: string) => void) => {
  refreshSubscribers.push(callback);
};

// 通知所有订阅者
const onTokenRefreshed = (token: string) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config;

    // 如果是401错误且不是刷新token的请求
    if (error.response?.status === 401 && originalRequest.url !== '/auth/refresh') {
      const refreshTokenValue = getRefreshToken();

      if (!refreshTokenValue) {
        // 没有refresh token，清除登录状态并跳转登录页
        clearUser();
        window.location.href = '/profile';
        return Promise.reject(error);
      }

      // 如果正在刷新token，将请求加入队列
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(request(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        // 调用刷新token接口
        const res = await refreshToken({ refreshToken: refreshTokenValue });

        // 保存新的token
        saveTokens(res.tokens);

        // 通知所有等待的请求
        onTokenRefreshed(res.tokens.accessToken);

        // 重试原请求
        originalRequest.headers.Authorization = `Bearer ${res.tokens.accessToken}`;
        return request(originalRequest);
      } catch (refreshError) {
        // 刷新token失败，清除登录状态
        clearUser();
        window.location.href = '/profile';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // 统一错误处理
    if (error.response) {
      switch (error.response.status) {
        case 403:
          console.error('权限不足');
          break;
        case 404:
          console.error('资源不存在');
          break;
        case 500:
          console.error('服务器错误');
          break;
        default:
          break;
      }
    }
    return Promise.reject(error);
  }
);

// 封装请求方法
export const http = {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return request.get(url, config) as Promise<T>;
  },
  post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return request.post(url, data, config) as Promise<T>;
  },
  put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return request.put(url, data, config) as Promise<T>;
  },
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return request.delete(url, config) as Promise<T>;
  },
};

export default request;
