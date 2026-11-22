import { r as __toESM } from "./rolldown-runtime-DZjNq3_i.js";
import { w as require_dayjs_min } from "./vendor-ui-BCl3WSDB.js";
//#region src/types/types.ts
var STORAGE_KEYS = {
	RECORDS: "money_records",
	USER: "money_user",
	ACCESS_TOKEN: "money_access_token",
	REFRESH_TOKEN: "money_refresh_token",
	TOKEN_EXPIRES: "money_token_expires",
	CATEGORIES: "money_categories",
	BUDGETS: "money_budgets",
	QUICK_RECORDS: "money_quick_records",
	FRIDGE_ITEMS: "money_fridge_items",
	SCHEDULES: "money_schedules"
};
//#endregion
//#region src/constants/categories.ts
var expenseCategories = [
	{
		id: "food",
		name: "饮食",
		icon: "🍜",
		subCategories: [
			{
				id: "food_1",
				name: "买菜",
				icon: "🥬"
			},
			{
				id: "food_2",
				name: "外食",
				icon: "🍽️"
			},
			{
				id: "food_3",
				name: "奶茶",
				icon: "🧋"
			},
			{
				id: "food_4",
				name: "咖啡",
				icon: "☕"
			},
			{
				id: "food_5",
				name: "零食",
				icon: "🍪"
			},
			{
				id: "food_6",
				name: "外卖",
				icon: "🛵"
			}
		]
	},
	{
		id: "housing",
		name: "住房",
		icon: "🏠",
		subCategories: [
			{
				id: "housing_1",
				name: "房租",
				icon: "🏠"
			},
			{
				id: "housing_2",
				name: "水电",
				icon: "💡"
			},
			{
				id: "housing_3",
				name: "物业",
				icon: "🏢"
			},
			{
				id: "housing_4",
				name: "网费",
				icon: "📶"
			},
			{
				id: "housing_5",
				name: "维修",
				icon: "🔧"
			},
			{
				id: "housing_6",
				name: "酒店",
				icon: "🏨"
			}
		]
	},
	{
		id: "transport",
		name: "交通",
		icon: "🚗",
		subCategories: [
			{
				id: "transport_1",
				name: "公交",
				icon: "🚌"
			},
			{
				id: "transport_2",
				name: "打车",
				icon: "🚕"
			},
			{
				id: "transport_3",
				name: "油费",
				icon: "⛽"
			},
			{
				id: "transport_4",
				name: "停车",
				icon: "🅿️"
			},
			{
				id: "transport_5",
				name: "保养",
				icon: "🔩"
			}
		]
	},
	{
		id: "clothing",
		name: "服饰",
		icon: "👗",
		subCategories: [
			{
				id: "clothing_1",
				name: "衣鞋",
				icon: "👟"
			},
			{
				id: "clothing_2",
				name: "护肤",
				icon: "💄"
			},
			{
				id: "clothing_3",
				name: "饰品",
				icon: "💍"
			},
			{
				id: "clothing_4",
				name: "干洗",
				icon: "🧺"
			}
		]
	},
	{
		id: "medical",
		name: "医疗",
		icon: "🏥",
		subCategories: [
			{
				id: "medical_1",
				name: "门诊",
				icon: "🩺"
			},
			{
				id: "medical_2",
				name: "药品",
				icon: "💊"
			},
			{
				id: "medical_3",
				name: "体检",
				icon: "🩻"
			},
			{
				id: "medical_4",
				name: "器械",
				icon: "🦯"
			}
		]
	},
	{
		id: "education",
		name: "教育",
		icon: "📚",
		subCategories: [
			{
				id: "education_1",
				name: "书本",
				icon: "📖"
			},
			{
				id: "education_2",
				name: "学费",
				icon: "🎓"
			},
			{
				id: "education_3",
				name: "网课",
				icon: "💻"
			},
			{
				id: "education_4",
				name: "文具",
				icon: "✏️"
			},
			{
				id: "education_5",
				name: "软件",
				icon: "💿"
			}
		]
	},
	{
		id: "entertainment",
		name: "娱乐",
		icon: "🎮",
		subCategories: [
			{
				id: "entertainment_1",
				name: "电影",
				icon: "🎬"
			},
			{
				id: "entertainment_2",
				name: "游戏",
				icon: "🎮"
			},
			{
				id: "entertainment_3",
				name: "聚会",
				icon: "🎉"
			},
			{
				id: "entertainment_4",
				name: "爱好",
				icon: "🎨"
			},
			{
				id: "entertainment_5",
				name: "剧场",
				icon: "🎭"
			}
		]
	},
	{
		id: "travel",
		name: "旅行",
		icon: "✈️",
		subCategories: [
			{
				id: "travel_1",
				name: "机票",
				icon: "🎫"
			},
			{
				id: "travel_2",
				name: "住宿",
				icon: "🏨"
			},
			{
				id: "travel_3",
				name: "门票",
				icon: "🎟️"
			},
			{
				id: "travel_4",
				name: "旅餐",
				icon: "🥘"
			},
			{
				id: "travel_5",
				name: "纪念",
				icon: "🎁"
			}
		]
	},
	{
		id: "social",
		name: "人情",
		icon: "🧧",
		subCategories: [
			{
				id: "social_1",
				name: "礼金",
				icon: "🧧"
			},
			{
				id: "social_2",
				name: "礼品",
				icon: "🎁"
			},
			{
				id: "social_3",
				name: "聚餐",
				icon: "🍽️"
			},
			{
				id: "social_4",
				name: "送礼",
				icon: "🎀"
			},
			{
				id: "social_5",
				name: "捐赠",
				icon: "❤️"
			}
		]
	},
	{
		id: "digital",
		name: "数码",
		icon: "📱",
		subCategories: [
			{
				id: "digital_1",
				name: "话费",
				icon: "📞"
			},
			{
				id: "digital_2",
				name: "设备",
				icon: "💻"
			},
			{
				id: "digital_3",
				name: "配件",
				icon: "⌨️"
			},
			{
				id: "digital_4",
				name: "订阅",
				icon: "🔔"
			},
			{
				id: "digital_5",
				name: "维修",
				icon: "🔧"
			}
		]
	},
	{
		id: "home",
		name: "家居",
		icon: "🛋️",
		subCategories: [
			{
				id: "home_1",
				name: "清洁",
				icon: "🧹"
			},
			{
				id: "home_2",
				name: "纸品",
				icon: "🧻"
			},
			{
				id: "home_3",
				name: "厨具",
				icon: "🍳"
			},
			{
				id: "home_4",
				name: "床品",
				icon: "🛏️"
			},
			{
				id: "home_5",
				name: "收纳",
				icon: "📦"
			}
		]
	},
	{
		id: "parenting",
		name: "育儿",
		icon: "👶",
		subCategories: [
			{
				id: "parenting_1",
				name: "奶粉",
				icon: "🍼"
			},
			{
				id: "parenting_2",
				name: "玩具",
				icon: "🧸"
			},
			{
				id: "parenting_3",
				name: "宠物",
				icon: "🐾"
			},
			{
				id: "parenting_4",
				name: "医疗",
				icon: "💊"
			},
			{
				id: "parenting_5",
				name: "托育",
				icon: "🏫"
			}
		]
	},
	{
		id: "finance",
		name: "金融",
		icon: "🏦",
		subCategories: [
			{
				id: "finance_1",
				name: "保险",
				icon: "🛡️"
			},
			{
				id: "finance_2",
				name: "车险",
				icon: "🚘"
			},
			{
				id: "finance_3",
				name: "年费",
				icon: "💳"
			},
			{
				id: "finance_4",
				name: "股市",
				icon: "📈"
			},
			{
				id: "finance_5",
				name: "基金",
				icon: "📊"
			}
		]
	},
	{
		id: "other_expense",
		name: "其他支出",
		icon: "📦",
		subCategories: []
	}
];
var incomeCategories = [
	{
		id: "salary",
		name: "工资",
		icon: "💰",
		subCategories: []
	},
	{
		id: "parttime",
		name: "兼职",
		icon: "💵",
		subCategories: []
	},
	{
		id: "investment",
		name: "理财",
		icon: "📈",
		subCategories: []
	},
	{
		id: "secondhand",
		name: "二手",
		icon: "♻️",
		subCategories: []
	},
	{
		id: "bonus",
		name: "奖金",
		icon: "🎁",
		subCategories: []
	},
	{
		id: "other_income",
		name: "其他收入",
		icon: "💰",
		subCategories: []
	}
];
//#endregion
//#region src/utils/dateFormats.ts
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min(), 1);
var DATE_FORMAT = {
	DATE_KEY: "YYYY-MM-DD",
	MONTH_KEY: "YYYY-MM",
	DATETIME_FULL: "YYYY-MM-DD HH:mm:ss",
	DATETIME_SHORT: "YYYY-MM-DD HH:mm",
	TIME_ONLY: "HH:mm",
	DISPLAY_MONTH_DAY: "M月D日",
	DISPLAY_FULL_DATE: "YYYY年M月D日",
	DISPLAY_MONTH: "M月",
	DISPLAY_YEAR_MONTH: "YYYY年M月",
	DISPLAY_YEAR: "YYYY年",
	DISPLAY_SHORT_DATE: "MM-DD",
	RECEIPT_DATE: "YYYYMMDD"
};
var formatDateKey = (date) => (0, import_dayjs_min.default)(date).format(DATE_FORMAT.DATE_KEY);
var formatMonthKey = (date) => (0, import_dayjs_min.default)(date).format(DATE_FORMAT.MONTH_KEY);
var formatDisplayMonthDay = (date) => (0, import_dayjs_min.default)(date).format(DATE_FORMAT.DISPLAY_MONTH_DAY);
var formatDisplayFullDate = (date) => (0, import_dayjs_min.default)(date).format(DATE_FORMAT.DISPLAY_FULL_DATE);
var formatDisplayYearMonth = (date) => (0, import_dayjs_min.default)(date).format(DATE_FORMAT.DISPLAY_YEAR_MONTH);
var formatDisplayMonth = (date) => (0, import_dayjs_min.default)(date).format(DATE_FORMAT.DISPLAY_MONTH);
var formatDisplayYear = (date) => (0, import_dayjs_min.default)(date).format(DATE_FORMAT.DISPLAY_YEAR);
var formatTimeOnly = (date) => (0, import_dayjs_min.default)(date).format(DATE_FORMAT.TIME_ONLY);
var formatDateTimeFull = (date) => (0, import_dayjs_min.default)(date).format(DATE_FORMAT.DATETIME_FULL);
var nowISO = () => (0, import_dayjs_min.default)().toISOString();
var isToday = (dateStr) => dateStr === (0, import_dayjs_min.default)().format(DATE_FORMAT.DATE_KEY);
var isYesterday = (dateStr) => dateStr === (0, import_dayjs_min.default)().subtract(1, "day").format(DATE_FORMAT.DATE_KEY);
//#endregion
//#region src/utils/savingsKeys.ts
/**
* 攒钱模块的本地存储键 —— 唯一定义处
* 此前散落在 api/savings.ts 与 utils/dataMigration.ts 两处硬编码，
* 抽出共享以纳入存储守护层（storageGuard）的快照保护范围
*/
var SAVINGS_PLANS_KEY = "savings_plans";
var SAVINGS_DEPOSITS_KEY = "savings_deposits";
var SAVINGS_ACTIVE_PLAN_ID_KEY = "savings_active_plan_id";
/** 攒钱模块参与数据快照/备份的全部键 */
var SAVINGS_DATA_KEYS = [
	SAVINGS_PLANS_KEY,
	SAVINGS_DEPOSITS_KEY,
	SAVINGS_ACTIVE_PLAN_ID_KEY
];
//#endregion
//#region src/utils/storageGuard.ts
/**
* 本地数据守护层
*
* 背景风险（PWA 主屏/快捷方式场景）：
* - iOS Safari 对 7 天不活跃的站点会清除脚本可写的存储（localStorage 全灭）
* - Android Chrome 在存储压力下会驱逐 best-effort 存储
* - localStorage 与迁移备份同源同桶，用户清除站点数据时一起消失
*
* 策略：
* 1. navigator.storage.persist() 申请持久化授权，浏览器承诺不自动驱逐
* 2. 所有核心 localStorage 写入后，防抖写入 IndexedDB 影子快照（latest + 每日滚动 7 份）
* 3. 启动时若检测到 localStorage 数据被清（seal 标记存在但键缺失），
*    自动从 IndexedDB 快照恢复
*
* 不引入 SQLite 的原因：
* - 部署在 GitHub Pages（无法设置 COOP/COEP 响应头），wa-sqlite 等依赖
*   SharedArrayBuffer 的方案无法运行
* - iOS 16.4 以下无 OPFS 同步 access handle，官方 SQLite WASM VFS 无法持久化
* - sql.js 是内存库，持久化仍需手动写回 IndexedDB，只换引擎不解决丢失问题
*/
var DB_NAME = "money-app-db";
var DB_VERSION = 1;
var SNAPSHOT_STORE = "snapshots";
var LATEST_SNAPSHOT_ID = "latest";
var DAILY_SNAPSHOT_PREFIX = "daily_";
var DAILY_SNAPSHOT_KEEP = 7;
var MARK_DIRTY_DELAY = 800;
var SEAL_KEY = "money_storage_guard_sealed";
var SNAPSHOT_KEYS = [
	STORAGE_KEYS.RECORDS,
	STORAGE_KEYS.USER,
	STORAGE_KEYS.CATEGORIES,
	STORAGE_KEYS.BUDGETS,
	STORAGE_KEYS.QUICK_RECORDS,
	STORAGE_KEYS.FRIDGE_ITEMS,
	STORAGE_KEYS.SCHEDULES,
	...SAVINGS_DATA_KEYS,
	"money_data_version"
];
var dbPromise = null;
var markDirtyTimer = null;
var persistRequested = false;
/** 打开（或创建）快照库，失败返回 null（隐私模式等场景静默降级） */
function openSnapshotDB() {
	if (!dbPromise) dbPromise = new Promise((resolve) => {
		try {
			if (typeof indexedDB === "undefined") {
				resolve(null);
				return;
			}
			const request = indexedDB.open(DB_NAME, DB_VERSION);
			request.onupgradeneeded = () => {
				const db = request.result;
				if (!db.objectStoreNames.contains(SNAPSHOT_STORE)) db.createObjectStore(SNAPSHOT_STORE, { keyPath: "id" });
			};
			request.onsuccess = () => resolve(request.result);
			request.onerror = () => resolve(null);
		} catch {
			resolve(null);
		}
	});
	return dbPromise;
}
function withStore(mode, run) {
	return openSnapshotDB().then((db) => new Promise((resolve) => {
		if (!db) {
			resolve(null);
			return;
		}
		try {
			const tx = db.transaction(SNAPSHOT_STORE, mode);
			const request = run(tx.objectStore(SNAPSHOT_STORE));
			let result = null;
			if (request && "onsuccess" in request) request.onsuccess = () => {
				result = request.result;
			};
			tx.oncomplete = () => resolve(result);
			tx.onerror = () => resolve(null);
			tx.onabort = () => resolve(null);
		} catch {
			resolve(null);
		}
	}));
}
/** 收集当前全部受保护键的原始值 */
function collectSnapshotData() {
	const data = {};
	for (const key of SNAPSHOT_KEYS) data[key] = localStorage.getItem(key);
	return data;
}
async function takeSnapshot() {
	const now = Date.now();
	const data = collectSnapshotData();
	await withStore("readwrite", (store) => {
		store.put({
			id: LATEST_SNAPSHOT_ID,
			data,
			createdAt: now
		});
	});
	const dayId = `${DAILY_SNAPSHOT_PREFIX}${new Date(now).toISOString().slice(0, 10)}`;
	if (!await withStore("readonly", (store) => store.get(dayId))) {
		await withStore("readwrite", (store) => {
			store.put({
				id: dayId,
				data,
				createdAt: now
			});
		});
		const allKeys = await withStore("readonly", (store) => store.getAllKeys());
		if (allKeys) {
			const dayKeys = allKeys.filter((k) => typeof k === "string" && k.startsWith(DAILY_SNAPSHOT_PREFIX)).sort().reverse();
			for (const staleKey of dayKeys.slice(DAILY_SNAPSHOT_KEEP)) await withStore("readwrite", (store) => {
				store.delete(staleKey);
			});
		}
	}
	try {
		localStorage.setItem(SEAL_KEY, now.toString());
	} catch {}
}
/**
* 核心数据发生变化时调用：防抖后刷新影子快照
* 挂在 storage.ts / savings.ts 等写入函数尾部，调用方无需 await
*/
function markStorageDirty() {
	if (markDirtyTimer) clearTimeout(markDirtyTimer);
	markDirtyTimer = setTimeout(() => {
		markDirtyTimer = null;
		takeSnapshot().catch(() => {});
	}, MARK_DIRTY_DELAY);
}
/** 立即固化一份快照（跳过防抖），供启动链使用 */
function snapshotNow() {
	return takeSnapshot().catch(() => {});
}
/** 用户主动清空数据时，同步清除影子快照，避免下次启动被"恢复"回来 */
async function purgeSnapshots() {
	if (markDirtyTimer) {
		clearTimeout(markDirtyTimer);
		markDirtyTimer = null;
	}
	await withStore("readwrite", (store) => {
		store.clear();
	});
	try {
		localStorage.removeItem(SEAL_KEY);
	} catch {}
}
/**
* 启动时检测 localStorage 是否被外部清除（iOS 系统清理/清站点数据），
* 若快照存在则自动恢复。返回是否执行了恢复。
*/
async function restoreIfErased() {
	let sealed = false;
	try {
		sealed = localStorage.getItem(SEAL_KEY) !== null;
	} catch {
		return false;
	}
	if (!sealed) return false;
	if (!SNAPSHOT_KEYS.some((key) => {
		try {
			return localStorage.getItem(key) === null;
		} catch {
			return false;
		}
	})) return false;
	const latest = await withStore("readonly", (store) => store.get(LATEST_SNAPSHOT_ID));
	if (!latest || !latest.data) return false;
	let restoredCount = 0;
	for (const [key, value] of Object.entries(latest.data)) {
		if (value === null) continue;
		try {
			localStorage.setItem(key, value);
			restoredCount++;
		} catch {}
	}
	if (restoredCount > 0) {
		console.info(`[StorageGuard] 检测到本地数据被清除，已从快照恢复 ${restoredCount} 项数据`);
		await takeSnapshot();
		return true;
	}
	return false;
}
/**
* 申请持久化存储授权：授予后浏览器承诺不自动清除本应用数据
* （iOS PWA 主屏模式授予率高；Chrome 按站点参与度决定）
*/
async function requestPersistentStorage() {
	if (persistRequested) return false;
	persistRequested = true;
	try {
		if (typeof navigator === "undefined" || !navigator.storage) return false;
		if (navigator.storage.persisted) {
			if (await navigator.storage.persisted()) return true;
		}
		if (!navigator.storage.persist) return false;
		const granted = await navigator.storage.persist();
		console.info(`[StorageGuard] 持久化存储授权: ${granted ? "已授予" : "未授予（数据仍受影子快照保护）"}`);
		return granted;
	} catch {
		return false;
	}
}
//#endregion
//#region src/utils/storage.ts
function safeJsonParse(data, fallback) {
	if (!data) return fallback;
	try {
		const parsed = JSON.parse(data);
		if (parsed === null || parsed === void 0) return fallback;
		return parsed;
	} catch {
		console.warn("[Storage] JSON 解析失败，已回退到默认值");
		return fallback;
	}
}
function safeJsonArrayParse(data) {
	if (!data) return [];
	try {
		const parsed = JSON.parse(data);
		if (!Array.isArray(parsed)) return [];
		return parsed;
	} catch {
		console.warn("[Storage] JSON 数组解析失败，已回退到空数组");
		return [];
	}
}
var generateDefaultCategories = () => {
	return {
		expense: expenseCategories.map((cat, index) => ({
			id: `expense_${index + 1}`,
			name: cat.name,
			icon: cat.icon,
			type: "expense",
			subCategories: cat.subCategories.map((sub, subIndex) => ({
				id: `expense_${index + 1}_${subIndex + 1}`,
				name: sub.name,
				icon: sub.icon
			}))
		})),
		income: incomeCategories.map((cat, index) => ({
			id: `income_${index + 1}`,
			name: cat.name,
			icon: cat.icon,
			type: "income",
			subCategories: cat.subCategories.map((sub, subIndex) => ({
				id: `income_${index + 1}_${subIndex + 1}`,
				name: sub.name,
				icon: sub.icon
			}))
		})),
		transfer: [{
			id: "transfer_1",
			name: "转账",
			icon: "transfer",
			type: "transfer",
			subCategories: []
		}, {
			id: "transfer_2",
			name: "还款",
			icon: "repay",
			type: "transfer",
			subCategories: []
		}],
		debt: [
			{
				id: "debt_1",
				name: "借入",
				icon: "borrow_in",
				type: "debt",
				subCategories: []
			},
			{
				id: "debt_2",
				name: "借出",
				icon: "borrow_out",
				type: "debt",
				subCategories: []
			},
			{
				id: "debt_3",
				name: "还款",
				icon: "repayment",
				type: "debt",
				subCategories: []
			}
		],
		reimbursement: [{
			id: "reimbursement_1",
			name: "报销",
			icon: "reimburse",
			type: "reimbursement",
			subCategories: []
		}]
	};
};
var defaultCategoriesData = generateDefaultCategories();
var getLocalRecords = () => {
	return safeJsonArrayParse(localStorage.getItem(STORAGE_KEYS.RECORDS));
};
var saveLocalRecords = (records) => {
	try {
		localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(records));
		markStorageDirty();
	} catch (e) {
		console.error("[Storage] 保存记录失败，可能存储空间不足:", e);
	}
};
var addLocalRecord = (record) => {
	const records = getLocalRecords();
	records.unshift(record);
	saveLocalRecords(records);
};
var getUser = () => {
	return safeJsonParse(localStorage.getItem(STORAGE_KEYS.USER), null);
};
var saveUser = (user) => {
	try {
		localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
		markStorageDirty();
	} catch (e) {
		console.error("[Storage] 保存用户信息失败:", e);
	}
};
var TOKEN_KEYS = [
	STORAGE_KEYS.ACCESS_TOKEN,
	STORAGE_KEYS.REFRESH_TOKEN,
	STORAGE_KEYS.TOKEN_EXPIRES
];
var clearUser = () => {
	localStorage.removeItem(STORAGE_KEYS.USER);
	TOKEN_KEYS.forEach((key) => localStorage.removeItem(key));
	markStorageDirty();
};
var getAccessToken = () => {
	return localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
};
var getRefreshToken = () => {
	return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
};
var saveTokens = (tokens) => {
	try {
		localStorage.setItem(STORAGE_KEYS.ACCESS_TOKEN, tokens.accessToken);
		localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, tokens.refreshToken);
		const expiresAt = Date.now() + tokens.expiresIn * 1e3;
		localStorage.setItem(STORAGE_KEYS.TOKEN_EXPIRES, expiresAt.toString());
		markStorageDirty();
	} catch (e) {
		console.error("[Storage] 保存 Token 失败:", e);
	}
};
var isTokenExpired = () => {
	const expiresAt = localStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRES);
	if (!expiresAt) return true;
	const parsed = parseInt(expiresAt, 10);
	if (isNaN(parsed)) return true;
	return Date.now() > parsed;
};
var isLoggedIn = () => {
	return !!getAccessToken() && !isTokenExpired();
};
var ALL_DATA_KEYS = [
	STORAGE_KEYS.RECORDS,
	STORAGE_KEYS.USER,
	STORAGE_KEYS.ACCESS_TOKEN,
	STORAGE_KEYS.REFRESH_TOKEN,
	STORAGE_KEYS.TOKEN_EXPIRES,
	STORAGE_KEYS.FRIDGE_ITEMS,
	STORAGE_KEYS.SCHEDULES
];
var clearAllData = () => {
	ALL_DATA_KEYS.forEach((key) => localStorage.removeItem(key));
	purgeSnapshots();
};
var getLocalCategories = () => {
	const data = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
	if (data) try {
		const parsed = JSON.parse(data);
		if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) return parsed;
	} catch {
		console.warn("[Storage] 分类数据解析失败，已回退到默认分类");
	}
	return defaultCategoriesData;
};
var saveLocalCategories = (categories) => {
	try {
		localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
		markStorageDirty();
	} catch (e) {
		console.error("[Storage] 保存分类数据失败:", e);
	}
};
var getExpenseCategoriesForSelect = () => {
	const stored = getLocalCategories();
	if (stored && stored.expense) return stored.expense.map((cat) => ({
		id: cat.id,
		name: cat.name,
		icon: cat.icon,
		subCategories: (cat.subCategories || []).map((sub) => ({
			id: sub.id,
			name: sub.name,
			icon: sub.icon
		}))
	}));
	return [];
};
var getIncomeCategoriesForSelect = () => {
	const stored = getLocalCategories();
	if (stored && stored.income) return stored.income.map((cat) => ({
		id: cat.id,
		name: cat.name,
		icon: cat.icon,
		subCategories: (cat.subCategories || []).map((sub) => ({
			id: sub.id,
			name: sub.name,
			icon: sub.icon
		}))
	}));
	return [];
};
var getLocalBudgets = () => {
	return safeJsonArrayParse(localStorage.getItem(STORAGE_KEYS.BUDGETS));
};
var saveLocalBudgets = (budgets) => {
	try {
		localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(budgets));
		markStorageDirty();
	} catch (e) {
		console.error("[Storage] 保存预算数据失败:", e);
	}
};
var getLocalBudget = (year, month) => {
	return getLocalBudgets().find((b) => b.year === year && b.month === month) || null;
};
var setLocalBudget = (budget) => {
	const budgets = getLocalBudgets();
	const existingIndex = budgets.findIndex((b) => b.year === budget.year && b.month === budget.month);
	if (existingIndex >= 0) budgets[existingIndex] = budget;
	else budgets.push(budget);
	saveLocalBudgets(budgets);
};
var deleteLocalBudget = (year, month) => {
	saveLocalBudgets(getLocalBudgets().filter((b) => !(b.year === year && b.month === month)));
};
var getQuickRecords = () => {
	return safeJsonArrayParse(localStorage.getItem(STORAGE_KEYS.QUICK_RECORDS));
};
var saveQuickRecords = (records) => {
	try {
		localStorage.setItem(STORAGE_KEYS.QUICK_RECORDS, JSON.stringify(records));
		markStorageDirty();
	} catch (e) {
		console.error("[Storage] 保存快捷记账数据失败:", e);
	}
};
var addQuickRecord = (record) => {
	const records = getQuickRecords();
	const newRecord = {
		...record,
		id: `qr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
		order: records.length
	};
	records.push(newRecord);
	saveQuickRecords(records);
	return newRecord;
};
var deleteQuickRecord = (id) => {
	saveQuickRecords(getQuickRecords().filter((r) => r.id !== id));
};
var getFridgeItems = () => {
	return safeJsonArrayParse(localStorage.getItem(STORAGE_KEYS.FRIDGE_ITEMS));
};
var saveFridgeItems = (items) => {
	try {
		localStorage.setItem(STORAGE_KEYS.FRIDGE_ITEMS, JSON.stringify(items));
		markStorageDirty();
	} catch (e) {
		console.error("[Storage] 保存冰箱数据失败:", e);
	}
};
var addFridgeItem = (item) => {
	const items = getFridgeItems();
	const now = nowISO();
	const newItem = {
		...item,
		id: `fridge_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
		createdAt: now,
		updatedAt: now
	};
	items.push(newItem);
	saveFridgeItems(items);
	return newItem;
};
var updateFridgeItem = (id, data) => {
	const items = getFridgeItems();
	const index = items.findIndex((item) => item.id === id);
	if (index !== -1) {
		items[index] = {
			...items[index],
			...data,
			updatedAt: nowISO()
		};
		saveFridgeItems(items);
	}
};
var deleteFridgeItem = (id) => {
	saveFridgeItems(getFridgeItems().filter((item) => item.id !== id));
};
var getSchedules = () => {
	return safeJsonArrayParse(localStorage.getItem(STORAGE_KEYS.SCHEDULES));
};
var saveSchedules = (schedules) => {
	try {
		localStorage.setItem(STORAGE_KEYS.SCHEDULES, JSON.stringify(schedules));
		markStorageDirty();
	} catch (e) {
		console.error("[Storage] 保存日程数据失败:", e);
	}
};
var addSchedule = (schedule) => {
	const schedules = getSchedules();
	const now = nowISO();
	const newSchedule = {
		...schedule,
		id: `schedule_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
		createdAt: now,
		updatedAt: now
	};
	schedules.push(newSchedule);
	saveSchedules(schedules);
	return newSchedule;
};
var updateSchedule = (id, data) => {
	const schedules = getSchedules();
	const index = schedules.findIndex((item) => item.id === id);
	if (index !== -1) {
		schedules[index] = {
			...schedules[index],
			...data,
			updatedAt: nowISO()
		};
		saveSchedules(schedules);
	}
};
var deleteSchedule = (id) => {
	saveSchedules(getSchedules().filter((item) => item.id !== id));
};
//#endregion
export { isYesterday as $, saveUser as A, SAVINGS_DEPOSITS_KEY as B, isLoggedIn as C, saveLocalRecords as D, saveLocalCategories as E, requestPersistentStorage as F, formatDisplayFullDate as G, DATE_FORMAT as H, restoreIfErased as I, formatDisplayYear as J, formatDisplayMonth as K, snapshotNow as L, updateFridgeItem as M, updateSchedule as N, saveQuickRecords as O, markStorageDirty as P, isToday as Q, SAVINGS_ACTIVE_PLAN_ID_KEY as R, getUser as S, safeJsonParse as T, formatDateKey as U, SAVINGS_PLANS_KEY as V, formatDateTimeFull as W, formatMonthKey as X, formatDisplayYearMonth as Y, formatTimeOnly as Z, getLocalCategories as _, clearAllData as a, getRefreshToken as b, deleteLocalBudget as c, getAccessToken as d, nowISO as et, getExpenseCategoriesForSelect as f, getLocalBudgets as g, getLocalBudget as h, addSchedule as i, setLocalBudget as j, saveTokens as k, deleteQuickRecord as l, getIncomeCategoriesForSelect as m, addLocalRecord as n, incomeCategories as nt, clearUser as o, getFridgeItems as p, formatDisplayMonthDay as q, addQuickRecord as r, STORAGE_KEYS as rt, deleteFridgeItem as s, addFridgeItem as t, expenseCategories as tt, deleteSchedule as u, getLocalRecords as v, safeJsonArrayParse as w, getSchedules as x, getQuickRecords as y, SAVINGS_DATA_KEYS as z };
