import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type Canceler,
  type InternalAxiosRequestConfig,
} from 'axios';
import { getAccessToken, getRefreshToken, saveTokens, clearUser } from './storage';
import { refreshToken } from '../api/auth';

// API 响应统一包装类型
export interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}

// API 错误类型
export class ApiError extends Error {
  code: number;
  data?: unknown;

  constructor(message: string, code: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.data = data;
  }
}

// 请求配置扩展
interface RequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
  retryCount?: number;
}

// 创建 axios 实例
const request: AxiosInstance = axios.create({
  baseURL: '/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 是否正在刷新token
let isRefreshing = false;
// 等待token刷新的请求队列
let refreshSubscribers: Array<(token: string) => void> = [];

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
  (config: InternalAxiosRequestConfig) => {
    const requestConfig = config as InternalAxiosRequestConfig & RequestConfig;

    if (!requestConfig.skipAuth) {
      const token = getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 如果响应已经是处理过的数据，直接返回
    const responseData = response.data as ApiResponse<unknown>;
    if (responseData && typeof responseData === 'object' && 'data' in responseData) {
      return responseData.data;
    }
    return response.data;
  },
  async (error) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & RequestConfig;

    // 处理请求取消
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    // 如果是401错误且不是刷新token的请求
    if (error.response?.status === 401 && originalRequest.url !== '/auth/refresh') {
      const refreshTokenValue = getRefreshToken();

      if (!refreshTokenValue) {
        clearUser();
        window.location.href = '/profile';
        return Promise.reject(new ApiError('登录已过期', 401));
      }

      // 如果正在刷新token，将请求加入队列
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token: string) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(request(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const res = await refreshToken({ refreshToken: refreshTokenValue });
        saveTokens(res.tokens);
        onTokenRefreshed(res.tokens.accessToken);
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${res.tokens.accessToken}`;
        }
        return request(originalRequest);
      } catch (refreshError) {
        clearUser();
        window.location.href = '/profile';
        return Promise.reject(new ApiError('登录已过期', 401));
      } finally {
        isRefreshing = false;
      }
    }

    // 统一错误处理
    if (error.response) {
      const { status, data } = error.response;
      const message = data?.message || data?.error || getErrorMessage(status);

      switch (status) {
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

      return Promise.reject(new ApiError(message, status, data));
    }

    return Promise.reject(new ApiError(error.message || '网络错误', 0));
  }
);

// 根据状态码获取错误信息
function getErrorMessage(status: number): string {
  const messages: Record<number, string> = {
    400: '请求参数错误',
    401: '未授权',
    403: '权限不足',
    404: '资源不存在',
    408: '请求超时',
    500: '服务器错误',
    502: '网关错误',
    503: '服务不可用',
    504: '网关超时',
  };
  return messages[status] || '未知错误';
}

// 创建取消令牌
export const createCancelToken = () => {
  let cancel: Canceler;
  const token = new axios.CancelToken((c) => {
    cancel = c;
  });
  return { token, cancel: cancel! };
};

// 封装请求方法
export const http = {
  get<T>(url: string, config?: RequestConfig): Promise<T> {
    return request.get(url, config) as Promise<T>;
  },
  post<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return request.post(url, data, config) as Promise<T>;
  },
  put<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return request.put(url, data, config) as Promise<T>;
  },
  delete<T>(url: string, config?: RequestConfig): Promise<T> {
    return request.delete(url, config) as Promise<T>;
  },
  patch<T>(url: string, data?: unknown, config?: RequestConfig): Promise<T> {
    return request.patch(url, data, config) as Promise<T>;
  },
};

export default request;
