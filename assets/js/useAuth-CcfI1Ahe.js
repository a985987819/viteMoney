import { r as __toESM } from "./rolldown-runtime-DZjNq3_i.js";
import { ar as require_react } from "./vendor-others-DR5UvigV.js";
import { n as require_jsx_runtime } from "./vendor-react-BwfiEprq.js";
import { u as staticMethods } from "./vendor-ui-BCl3WSDB.js";
import { r as axios } from "./vendor-utils-BEedu1iR.js";
import { A as saveUser, C as isLoggedIn, S as getUser, b as getRefreshToken, d as getAccessToken, k as saveTokens, o as clearUser } from "./storage-D-qjG_21.js";
//#region src/utils/request.ts
var ApiError = class extends Error {
	code;
	data;
	constructor(message, code, data) {
		super(message);
		this.name = "ApiError";
		this.code = code;
		this.data = data;
	}
};
var request = axios.create({
	baseURL: "/api",
	timeout: 6e4,
	headers: { "Content-Type": "application/json" }
});
var isRefreshing = false;
var refreshSubscribers = [];
var subscribeTokenRefresh = (callback) => {
	refreshSubscribers.push(callback);
};
var onTokenRefreshed = (token) => {
	refreshSubscribers.forEach((callback) => callback(token));
	refreshSubscribers = [];
};
request.interceptors.request.use((config) => {
	if (!config.skipAuth) {
		const token = getAccessToken();
		if (token) config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
}, (error) => {
	return Promise.reject(error);
});
request.interceptors.response.use((response) => {
	const responseData = response.data;
	if (responseData && typeof responseData === "object" && "data" in responseData) return responseData.data;
	return response.data;
}, async (error) => {
	const originalRequest = error.config;
	if (axios.isCancel(error)) return Promise.reject(error);
	if (error.response?.status === 401 && originalRequest.url !== "/auth/refresh") {
		const refreshTokenValue = getRefreshToken();
		if (!refreshTokenValue) {
			clearUser();
			window.location.href = "/profile";
			return Promise.reject(new ApiError("登录已过期", 401));
		}
		if (isRefreshing) return new Promise((resolve) => {
			subscribeTokenRefresh((token) => {
				if (originalRequest.headers) originalRequest.headers.Authorization = `Bearer ${token}`;
				resolve(request(originalRequest));
			});
		});
		isRefreshing = true;
		try {
			const res = await refreshToken({ refreshToken: refreshTokenValue });
			saveTokens(res.tokens);
			onTokenRefreshed(res.tokens.accessToken);
			if (originalRequest.headers) originalRequest.headers.Authorization = `Bearer ${res.tokens.accessToken}`;
			return request(originalRequest);
		} catch {
			clearUser();
			window.location.href = "/profile";
			return Promise.reject(new ApiError("登录已过期", 401));
		} finally {
			isRefreshing = false;
		}
	}
	if (error.response) {
		const { status, data } = error.response;
		const message = data?.message || data?.error || getErrorMessage(status);
		switch (status) {
			case 403:
				console.error("权限不足");
				break;
			case 404:
				console.error("资源不存在");
				break;
			case 500:
				console.error("服务器错误");
				break;
			default: break;
		}
		return Promise.reject(new ApiError(message, status, data));
	}
	return Promise.reject(new ApiError(error.message || "网络错误", 0));
});
function getErrorMessage(status) {
	return {
		400: "请求参数错误",
		401: "未授权",
		403: "权限不足",
		404: "资源不存在",
		408: "请求超时",
		500: "服务器错误",
		502: "网关错误",
		503: "服务不可用",
		504: "网关超时"
	}[status] || "未知错误";
}
var http = {
	get(url, config) {
		return request.get(url, config);
	},
	post(url, data, config) {
		return request.post(url, data, config);
	},
	put(url, data, config) {
		return request.put(url, data, config);
	},
	delete(url, config) {
		return request.delete(url, config);
	},
	patch(url, data, config) {
		return request.patch(url, data, config);
	}
};
function createApiService(basePath) {
	return {
		getList: () => http.get(basePath),
		getById: (id) => http.get(`${basePath}/${id}`),
		create: (data) => http.post(basePath, data),
		update: (id, data) => http.put(`${basePath}/${id}`, data),
		delete: (id) => http.delete(`${basePath}/${id}`)
	};
}
//#endregion
//#region src/api/auth.ts
var login = (data) => {
	return http.post("/auth/login", data);
};
var register = (data) => {
	return http.post("/auth/register", data);
};
var refreshToken = (data) => {
	return http.post("/auth/refresh", data);
};
var logout = (data) => {
	return http.post("/auth/logout", data);
};
//#endregion
//#region src/hooks/useAuth.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var AuthContext = (0, import_react.createContext)(null);
var AuthProvider = ({ children }) => {
	const [user, setUser] = (0, import_react.useState)(null);
	const [isLoggedIn$1, setIsLoggedIn] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const storedUser = getUser();
		const loggedIn = isLoggedIn();
		if (storedUser && loggedIn) {
			setUser(storedUser);
			setIsLoggedIn(true);
		}
	}, []);
	const handleAuthSuccess = async (res, action) => {
		saveUser(res.user);
		saveTokens(res.tokens);
		setUser(res.user);
		setIsLoggedIn(true);
		staticMethods.success(action === "login" ? "登录成功" : "注册成功");
	};
	const handleAuthError = (error, action) => {
		const errorMsg = error.response?.data?.error || `${action === "login" ? "登录" : "注册"}失败`;
		staticMethods.error(errorMsg);
		throw error;
	};
	const login$1 = async (username, password) => {
		try {
			await handleAuthSuccess(await login({
				username,
				password
			}), "login");
		} catch (error) {
			handleAuthError(error, "login");
		}
	};
	const logout$1 = async () => {
		try {
			const refreshToken = getRefreshToken();
			if (refreshToken) await logout({ refreshToken });
		} catch (error) {
			console.error("Logout error:", error);
		} finally {
			clearUser();
			setUser(null);
			setIsLoggedIn(false);
			staticMethods.success("已退出登录");
		}
	};
	const register$1 = async (username, password) => {
		try {
			await handleAuthSuccess(await register({
				username,
				password
			}), "register");
		} catch (error) {
			handleAuthError(error, "register");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value: {
			user,
			isLoggedIn: isLoggedIn$1,
			login: login$1,
			logout: logout$1,
			register: register$1
		},
		children
	});
};
var useAuth = () => {
	const context = (0, import_react.useContext)(AuthContext);
	if (!context) throw new Error("useAuth must be used within AuthProvider");
	return context;
};
//#endregion
export { http as i, useAuth as n, createApiService as r, AuthProvider as t };

//# sourceMappingURL=useAuth-CcfI1Ahe.js.map