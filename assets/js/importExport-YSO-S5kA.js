import { r as __toESM } from "./rolldown-runtime-DZjNq3_i.js";
import { a as utils, i as readSync, o as writeFileSync, r as require_papaparse_min } from "./vendor-others-DR5UvigV.js";
import { w as require_dayjs_min } from "./vendor-ui-BCl3WSDB.js";
import { B as SAVINGS_DEPOSITS_KEY, H as DATE_FORMAT, I as restoreIfErased, L as snapshotNow, P as markStorageDirty, R as SAVINGS_ACTIVE_PLAN_ID_KEY, T as safeJsonParse, V as SAVINGS_PLANS_KEY, et as nowISO, rt as STORAGE_KEYS, w as safeJsonArrayParse, z as SAVINGS_DATA_KEYS } from "./storage-D-qjG_21.js";
import { c as matchCategory, i as getCategoryMapping } from "./categoryIconMapping-C7E85sDI.js";
//#region src/utils/dataMigration.ts
var DATA_VERSION_KEY = "money_data_version";
function validateQuickRecord(record) {
	if (!record || typeof record !== "object") return false;
	const r = record;
	return typeof r.id === "string" && typeof r.categoryId === "string" && typeof r.subCategoryId === "string" && typeof r.amount === "number" && !isNaN(r.amount) && (r.type === "expense" || r.type === "income") && typeof r.order === "number";
}
function validateFridgeItem(item) {
	if (!item || typeof item !== "object") return false;
	const i = item;
	return typeof i.id === "string" && typeof i.name === "string" && typeof i.quantity === "string" && typeof i.purchaseDate === "string" && typeof i.progress === "number" && !isNaN(i.progress) && typeof i.createdAt === "string" && typeof i.updatedAt === "string";
}
function validateSavingsPlan(plan) {
	if (!plan || typeof plan !== "object") return false;
	const p = plan;
	return typeof p.id === "string" && typeof p.name === "string" && typeof p.targetAmount === "number" && !isNaN(p.targetAmount) && typeof p.savedAmount === "number" && !isNaN(p.savedAmount) && typeof p.startDate === "string" && typeof p.endDate === "string" && (p.status === "active" || p.status === "completed" || p.status === "failed") && typeof p.createdAt === "string" && typeof p.updatedAt === "string";
}
function repairRecords() {
	try {
		const records = safeJsonArrayParse(localStorage.getItem(STORAGE_KEYS.RECORDS));
		if (records.length === 0) return;
		const repaired = records.filter((r) => {
			if (!r || typeof r !== "object") return false;
			if (typeof r.id !== "string" || !r.id) return false;
			if (r.type !== "expense" && r.type !== "income") return false;
			if (typeof r.amount !== "number" || isNaN(r.amount)) return false;
			return true;
		}).map((r) => ({
			id: r.id,
			type: r.type,
			category: typeof r.category === "string" ? r.category : "其他",
			subCategory: r.subCategory,
			categoryIcon: typeof r.categoryIcon === "string" ? r.categoryIcon : "other",
			subCategoryIcon: r.subCategoryIcon,
			amount: typeof r.amount === "number" ? r.amount : 0,
			remark: typeof r.remark === "string" ? r.remark : "",
			date: typeof r.date === "number" ? r.date : Date.now(),
			account: typeof r.account === "string" ? r.account : "默认账户"
		}));
		localStorage.setItem(STORAGE_KEYS.RECORDS, JSON.stringify(repaired));
		console.log(`[Migration] 记录数据修复完成，有效记录: ${repaired.length}/${records.length}`);
	} catch (e) {
		console.error("[Migration] 修复记录数据失败:", e);
	}
}
function repairBudgets() {
	try {
		const budgets = safeJsonArrayParse(localStorage.getItem(STORAGE_KEYS.BUDGETS));
		if (budgets.length === 0) return;
		const repaired = budgets.filter((b) => {
			if (!b || typeof b !== "object") return false;
			if (typeof b.year !== "number" || isNaN(b.year)) return false;
			if (typeof b.month !== "number" || isNaN(b.month)) return false;
			if (typeof b.amount !== "number" || isNaN(b.amount)) return false;
			return true;
		}).map((b) => ({
			id: typeof b.id === "string" ? b.id : void 0,
			year: b.year,
			month: b.month,
			amount: b.amount
		}));
		localStorage.setItem(STORAGE_KEYS.BUDGETS, JSON.stringify(repaired));
		console.log(`[Migration] 预算数据修复完成，有效预算: ${repaired.length}/${budgets.length}`);
	} catch (e) {
		console.error("[Migration] 修复预算数据失败:", e);
	}
}
function repairCategories() {
	try {
		const raw = localStorage.getItem(STORAGE_KEYS.CATEGORIES);
		if (!raw) return;
		const parsed = safeJsonParse(raw, null);
		if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
			localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
			console.log("[Migration] 分类数据无效，已清除以恢复默认");
			return;
		}
		const repaired = {};
		for (const [type, cats] of Object.entries(parsed)) {
			if (!Array.isArray(cats)) continue;
			const validCats = cats.filter((c) => c && typeof c === "object" && typeof c.id === "string" && typeof c.name === "string").map((c) => {
				const cat = c;
				return {
					id: cat.id,
					name: cat.name,
					icon: typeof cat.icon === "string" ? cat.icon : "other",
					type: cat.type || type,
					subCategories: Array.isArray(cat.subCategories) ? cat.subCategories.filter((s) => s && typeof s === "object" && typeof s.id === "string" && typeof s.name === "string").map((s) => {
						const sub = s;
						return {
							id: sub.id,
							name: sub.name,
							icon: typeof sub.icon === "string" ? sub.icon : "other"
						};
					}) : []
				};
			});
			if (validCats.length > 0) repaired[type] = validCats;
		}
		if (Object.keys(repaired).length > 0) {
			localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(repaired));
			console.log("[Migration] 分类数据修复完成");
		} else {
			localStorage.removeItem(STORAGE_KEYS.CATEGORIES);
			console.log("[Migration] 分类数据修复后为空，已清除以恢复默认");
		}
	} catch (e) {
		console.error("[Migration] 修复分类数据失败:", e);
	}
}
function migrateV0ToV1() {
	try {
		console.log("[Migration] 开始 V0 → V1 迁移...");
		repairRecords();
		repairBudgets();
		repairCategories();
		const rawQuickRecords = localStorage.getItem(STORAGE_KEYS.QUICK_RECORDS);
		if (rawQuickRecords) {
			const quickRecords = safeJsonArrayParse(rawQuickRecords);
			const valid = quickRecords.filter(validateQuickRecord);
			if (valid.length !== quickRecords.length) {
				localStorage.setItem(STORAGE_KEYS.QUICK_RECORDS, JSON.stringify(valid));
				console.log(`[Migration] 快捷记账数据清理完成，有效: ${valid.length}/${quickRecords.length}`);
			}
		}
		const rawFridgeItems = localStorage.getItem(STORAGE_KEYS.FRIDGE_ITEMS);
		if (rawFridgeItems) {
			const fridgeItems = safeJsonArrayParse(rawFridgeItems);
			const valid = fridgeItems.filter(validateFridgeItem);
			if (valid.length !== fridgeItems.length) {
				localStorage.setItem(STORAGE_KEYS.FRIDGE_ITEMS, JSON.stringify(valid));
				console.log(`[Migration] 冰箱物品数据清理完成，有效: ${valid.length}/${fridgeItems.length}`);
			}
		}
		const rawSavingsPlans = localStorage.getItem(SAVINGS_PLANS_KEY);
		if (rawSavingsPlans) {
			const plans = safeJsonArrayParse(rawSavingsPlans);
			const valid = plans.filter(validateSavingsPlan);
			if (valid.length !== plans.length) {
				localStorage.setItem(SAVINGS_PLANS_KEY, JSON.stringify(valid));
				console.log(`[Migration] 攒钱计划数据清理完成，有效: ${valid.length}/${plans.length}`);
			}
		}
		localStorage.setItem(DATA_VERSION_KEY, JSON.stringify({
			version: 1,
			lastMigrated: (/* @__PURE__ */ new Date()).toISOString()
		}));
		console.log("[Migration] V0 → V1 迁移完成");
	} catch (e) {
		console.error("[Migration] V0 → V1 迁移失败:", e);
	}
}
function migrateData() {
	try {
		const currentVersion = safeJsonParse(localStorage.getItem("money_data_version"), null)?.version ?? 0;
		if (currentVersion >= 1) {
			console.log(`[Migration] 数据版本已是最新 (${currentVersion})，无需迁移`);
			return;
		}
		console.log(`[Migration] 检测到数据版本 ${currentVersion}，需要迁移到 1`);
		const backup = backupAllData();
		localStorage.setItem("money_data_backup", backup);
		console.log("[Migration] 迁移前已自动备份数据");
		if (currentVersion < 1) migrateV0ToV1();
		console.log("[Migration] 数据迁移全部完成");
	} catch (e) {
		console.error("[Migration] 数据迁移失败:", e);
	}
}
function backupAllData() {
	const backup = {};
	try {
		const allKeys = [
			STORAGE_KEYS.RECORDS,
			STORAGE_KEYS.USER,
			STORAGE_KEYS.ACCESS_TOKEN,
			STORAGE_KEYS.REFRESH_TOKEN,
			STORAGE_KEYS.TOKEN_EXPIRES,
			STORAGE_KEYS.CATEGORIES,
			STORAGE_KEYS.BUDGETS,
			STORAGE_KEYS.QUICK_RECORDS,
			STORAGE_KEYS.FRIDGE_ITEMS,
			SAVINGS_PLANS_KEY,
			SAVINGS_DEPOSITS_KEY,
			SAVINGS_ACTIVE_PLAN_ID_KEY,
			DATA_VERSION_KEY
		];
		for (const key of allKeys) {
			const value = localStorage.getItem(key);
			if (value !== null) try {
				backup[key] = JSON.parse(value);
			} catch {
				backup[key] = value;
			}
		}
		console.log("[Migration] 数据备份完成");
	} catch (e) {
		console.error("[Migration] 数据备份失败:", e);
	}
	return JSON.stringify(backup);
}
async function initializeDataStore() {
	try {
		console.log("[Migration] 初始化数据存储...");
		if (await restoreIfErased()) console.log("[Migration] 已从 IndexedDB 快照恢复数据");
		migrateData();
		await snapshotNow();
		console.log("[Migration] 数据存储初始化完成");
	} catch (e) {
		console.error("[Migration] 数据存储初始化失败:", e);
	}
}
//#endregion
//#region src/utils/categoryTransformer.ts
/**
* 数据导入分类转换工具
* 将导入的数据分类映射到项目标准分类和子分类
*/
/**
* 转换单条导入记录
* @param record 导入的记录
* @param defaultType 默认类型（当记录没有type时使用）
* @returns 转换结果
*/
function transformImportRecord(record, defaultType = "expense") {
	const categoryInput = (record.category || "").trim();
	const subCategoryInput = (record.subCategory || "").trim();
	if (!categoryInput) {
		const mapping = getCategoryMapping(defaultType === "expense" ? "其他支出" : "礼金");
		return {
			record: {
				category: mapping.standardName,
				subCategory: null,
				categoryEnglishName: mapping.englishName,
				subCategoryEnglishName: null,
				categoryIcon: mapping.defaultIcon,
				subCategoryIcon: null,
				amount: record.amount,
				type: defaultType,
				date: record.date,
				remark: record.remark || "",
				account: record.account || "现金",
				isMatched: false,
				originalCategory: categoryInput,
				originalSubCategory: subCategoryInput || null
			},
			isMatched: false
		};
	}
	const match = matchCategory(categoryInput, subCategoryInput || void 0);
	if (match.mainCategory) {
		const mainCategory = match.mainCategory;
		const subCategory = match.subCategory;
		const finalType = mainCategory.type || record.type || defaultType;
		return {
			record: {
				category: mainCategory.standardName,
				subCategory: subCategory?.name || null,
				categoryEnglishName: mainCategory.englishName,
				subCategoryEnglishName: subCategory?.englishName || null,
				categoryIcon: mainCategory.defaultIcon,
				subCategoryIcon: subCategory?.defaultIcon || null,
				amount: record.amount,
				type: finalType,
				date: record.date,
				remark: record.remark || "",
				account: record.account || "现金",
				isMatched: true,
				originalCategory: categoryInput,
				originalSubCategory: subCategoryInput || null
			},
			isMatched: true,
			matchInfo: {
				mainCategory,
				subCategory
			}
		};
	}
	const otherCategory = defaultType === "expense" ? getCategoryMapping("其他支出") : getCategoryMapping("礼金");
	return {
		record: {
			category: otherCategory.standardName,
			subCategory: null,
			categoryEnglishName: otherCategory.englishName,
			subCategoryEnglishName: null,
			categoryIcon: otherCategory.defaultIcon,
			subCategoryIcon: null,
			amount: record.amount,
			type: defaultType,
			date: record.date,
			remark: record.remark || `原分类: ${categoryInput}${subCategoryInput ? `/${subCategoryInput}` : ""}`,
			account: record.account || "现金",
			isMatched: false,
			originalCategory: categoryInput,
			originalSubCategory: subCategoryInput || null
		},
		isMatched: false
	};
}
/**
* 从CSV行数据转换
* @param row CSV行数据（对象形式）
* @param columnMapping 列名映射配置
* @returns 导入记录格式
*/
function parseCSVRow(row, columnMapping = {}) {
	const { category = "分类", subCategory = "子分类", amount = "金额", type = "类型", date = "日期", remark = "备注", account = "账户" } = columnMapping;
	const amountStr = row[amount]?.replace(/[￥,$\s]/g, "").trim() || "0";
	const parsedAmount = parseFloat(amountStr) || 0;
	let parsedType;
	const typeStr = row[type]?.toLowerCase().trim() || "";
	if (typeStr.includes("支出") || typeStr.includes("expense") || typeStr === "-") parsedType = "expense";
	else if (typeStr.includes("收入") || typeStr.includes("income") || typeStr === "+") parsedType = "income";
	return {
		category: row[category]?.trim(),
		subCategory: row[subCategory]?.trim(),
		amount: parsedAmount,
		type: parsedType,
		date: row[date]?.trim() || nowISO(),
		remark: row[remark]?.trim(),
		account: row[account]?.trim()
	};
}
/**
* 自动检测CSV列名映射
* @param headers CSV表头数组
* @returns 检测到的列名映射
*/
function detectColumnMapping(headers) {
	const mapping = {
		category: null,
		subCategory: null,
		amount: null,
		type: null,
		date: null,
		remark: null,
		account: null
	};
	const lowerHeaders = headers.map((h) => h.toLowerCase().trim());
	const categoryPatterns = [
		"分类",
		"category",
		"类别",
		"type",
		"种类",
		"项目"
	];
	mapping.category = headers.find((_h, i) => categoryPatterns.some((p) => lowerHeaders[i].includes(p.toLowerCase()))) || null;
	const subCategoryPatterns = [
		"子分类",
		"subcategory",
		"子类别",
		"子项",
		"二级分类"
	];
	mapping.subCategory = headers.find((_h, i) => subCategoryPatterns.some((p) => lowerHeaders[i].includes(p.toLowerCase()))) || null;
	const amountPatterns = [
		"金额",
		"amount",
		"money",
		"price",
		"cost",
		"sum",
		"总数",
		"数额"
	];
	mapping.amount = headers.find((_h, i) => amountPatterns.some((p) => lowerHeaders[i].includes(p.toLowerCase()))) || null;
	const typePatterns = [
		"类型",
		"type",
		"收支",
		"收入支出",
		"income_expense"
	];
	mapping.type = headers.find((_h, i) => typePatterns.some((p) => lowerHeaders[i].includes(p.toLowerCase()))) || null;
	const datePatterns = [
		"日期",
		"date",
		"时间",
		"time",
		"datetime",
		"年月日"
	];
	mapping.date = headers.find((_h, i) => datePatterns.some((p) => lowerHeaders[i].includes(p.toLowerCase()))) || null;
	const remarkPatterns = [
		"备注",
		"remark",
		"note",
		"notes",
		"comment",
		"描述",
		"说明"
	];
	mapping.remark = headers.find((_h, i) => remarkPatterns.some((p) => lowerHeaders[i].includes(p.toLowerCase()))) || null;
	const accountPatterns = [
		"账户",
		"account",
		"支付方式",
		"付款方式",
		"银行卡",
		"钱包"
	];
	mapping.account = headers.find((_h, i) => accountPatterns.some((p) => lowerHeaders[i].includes(p.toLowerCase()))) || null;
	return mapping;
}
/**
* 生成转换报告
* @param stats 转换统计信息
* @returns 报告文本
*/
function generateTransformReport(stats) {
	const lines = [];
	lines.push("=== 数据导入转换报告 ===");
	lines.push("");
	lines.push(`总记录数: ${stats.total}`);
	lines.push(`成功匹配: ${stats.matched} (${(stats.matched / stats.total * 100).toFixed(1)}%)`);
	lines.push(`未匹配: ${stats.unmatched} (${(stats.unmatched / stats.total * 100).toFixed(1)}%)`);
	lines.push("");
	if (Object.keys(stats.byCategory).length > 0) {
		lines.push("按分类统计:");
		Object.entries(stats.byCategory).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
			lines.push(`  ${cat}: ${count}条`);
		});
		lines.push("");
	}
	if (stats.unmatchedCategories.length > 0) {
		lines.push("未匹配的分类:");
		stats.unmatchedCategories.forEach((cat) => {
			lines.push(`  - ${cat}`);
		});
		lines.push("");
		lines.push("提示: 未匹配的分类已归入\"其他支出\"或\"礼金\"，并在备注中标注原始分类。");
	}
	return lines.join("\n");
}
//#endregion
//#region src/utils/importExport.ts
var import_papaparse_min = /* @__PURE__ */ __toESM(require_papaparse_min(), 1);
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min(), 1);
var buildExportData = (records) => records.map((record) => ({
	"日期": (0, import_dayjs_min.default)(record.date).format(DATE_FORMAT.DATETIME_FULL),
	"类型": record.type === "expense" ? "支出" : "收入",
	"金额": record.amount,
	"分类": record.category,
	"子分类": record.subCategory || "",
	"备注": record.remark || "",
	"账户": record.account || ""
}));
var exportToCSV = (records, filename = "记账记录") => {
	const data = buildExportData(records);
	const csv = import_papaparse_min.default.unparse(data);
	const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
	const link = document.createElement("a");
	link.href = URL.createObjectURL(blob);
	link.download = `${filename}_${(0, import_dayjs_min.default)().format(DATE_FORMAT.DATE_KEY)}.csv`;
	link.click();
};
var exportToXLSX = (records, filename = "记账记录") => {
	const data = buildExportData(records);
	const ws = utils.json_to_sheet(data);
	const wb = utils.book_new();
	utils.book_append_sheet(wb, ws, "记账记录");
	writeFileSync(wb, `${filename}_${(0, import_dayjs_min.default)().format(DATE_FORMAT.DATE_KEY)}.xlsx`);
};
var importFromCSV = (file) => {
	return new Promise((resolve, reject) => {
		import_papaparse_min.default.parse(file, {
			header: true,
			encoding: "UTF-8",
			complete: (results) => {
				try {
					resolve(parseAndTransformImportedData(results.data));
				} catch (error) {
					reject(error);
				}
			},
			error: (error) => reject(error)
		});
	});
};
var importFromXLSX = (file) => {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const workbook = readSync(new Uint8Array(e.target?.result), { type: "array" });
				const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
				resolve(parseAndTransformImportedData(utils.sheet_to_json(firstSheet)));
			} catch (error) {
				reject(error);
			}
		};
		reader.onerror = (error) => reject(error);
		reader.readAsArrayBuffer(file);
	});
};
var parseDate = (dateValue) => {
	if (!dateValue) return Date.now();
	if (typeof dateValue === "number") {
		if (dateValue < 1e5) return (dateValue - 25569) * 24 * 60 * 60 * 1e3;
		if (dateValue < 1e10) return dateValue * 1e3;
		return dateValue;
	}
	if (typeof dateValue === "string") {
		const trimmed = dateValue.trim();
		const numValue = parseFloat(trimmed);
		if (!isNaN(numValue) && /^\d+(\.\d+)?$/.test(trimmed)) {
			if (numValue < 1e5) return (numValue - 25569) * 24 * 60 * 60 * 1e3;
			if (numValue < 1e10) return numValue * 1e3;
			return numValue;
		}
		const parsed = (0, import_dayjs_min.default)(trimmed);
		if (parsed.isValid()) {
			if (!/\d{1,2}:\d{2}/.test(trimmed)) return parsed.startOf("day").valueOf();
			return parsed.valueOf();
		}
	}
	return Date.now();
};
var compareDate = (a, b) => {
	if (a === b) return 0;
	return parseDate(a) - parseDate(b);
};
var getTimestamp = (dateValue) => {
	return parseDate(dateValue);
};
/**
* 将原始行数据（多种列名）转换为标准 ImportRecord 格式
*/
function toImportRecord(row) {
	let amountStr;
	const rawAmount = row["金额"] || row["amount"] || "0";
	if (typeof rawAmount === "number") amountStr = rawAmount.toString();
	else amountStr = String(rawAmount).replace(/[￥,$\s]/g, "");
	const typeStr = String(row["类型"] || row["收支类型"] || row["type"] || "").toLowerCase().trim();
	let type;
	if (typeStr.includes("收入") || typeStr.includes("income") || typeStr === "+") type = "income";
	else if (typeStr.includes("支出") || typeStr.includes("expense") || typeStr === "-") type = "expense";
	return {
		category: String(row["分类"] || row["category"] || row["类别"] || row["type"] || ""),
		subCategory: String(row["子分类"] || row["subCategory"] || row["分类小项"] || row["小项"] || ""),
		amount: parseFloat(amountStr) || 0,
		type,
		date: String(row["日期"] || row["记账日期"] || row["date"] || row["时间"] || nowISO()),
		remark: String(row["备注"] || row["remark"] || row["说明"] || ""),
		account: String(row["账户"] || row["account"] || row["支付方式"] || "")
	};
}
/**
* 解析并转换导入的数据
* 复用 categoryTransformer 的分类转换管道
*/
var parseAndTransformImportedData = (data) => {
	const records = [];
	const byCategory = {};
	const unmatchedSet = /* @__PURE__ */ new Set();
	let matchedCount = 0;
	let unmatchedCount = 0;
	const autoMapping = detectColumnMapping(data.length > 0 ? Object.keys(data[0]) : []);
	data.forEach((row, index) => {
		let importRecord;
		if (autoMapping.category || autoMapping.amount) {
			const stringRow = {};
			for (const [key, val] of Object.entries(row)) stringRow[key] = val != null ? String(val) : "";
			importRecord = parseCSVRow(stringRow, {
				category: autoMapping.category || void 0,
				subCategory: autoMapping.subCategory || void 0,
				amount: autoMapping.amount || void 0,
				type: autoMapping.type || void 0,
				date: autoMapping.date || void 0,
				remark: autoMapping.remark || void 0,
				account: autoMapping.account || void 0
			});
		} else importRecord = toImportRecord(row);
		if (importRecord.amount <= 0) return;
		const dateTimestamp = parseDate(importRecord.date);
		const result = transformImportRecord(importRecord, "expense");
		if (result.isMatched) {
			matchedCount++;
			byCategory[result.record.category] = (byCategory[result.record.category] || 0) + 1;
		} else {
			unmatchedCount++;
			if (result.record.originalCategory) unmatchedSet.add(result.record.originalCategory);
		}
		records.push({
			id: `imported_${Date.now()}_${index}`,
			type: result.record.type,
			category: result.record.category,
			subCategory: result.record.subCategory ?? void 0,
			categoryIcon: result.record.categoryIcon,
			subCategoryIcon: result.record.subCategoryIcon ?? void 0,
			amount: result.record.amount,
			remark: result.record.remark,
			date: dateTimestamp,
			account: result.record.account
		});
	});
	return {
		records,
		stats: {
			total: records.length,
			matched: matchedCount,
			unmatched: unmatchedCount,
			byCategory,
			unmatchedCategories: Array.from(unmatchedSet)
		}
	};
};
/**
* 生成导入报告（复用 categoryTransformer 的 generateTransformReport）
* @param stats 导入统计
* @returns 报告文本
*/
var generateImportReport = (stats) => {
	return generateTransformReport({
		total: stats.total,
		matched: stats.matched,
		unmatched: stats.unmatched,
		byCategory: stats.byCategory,
		unmatchedCategories: stats.unmatchedCategories
	});
};
var BACKUP_APP = "stardew-ledger";
var BACKUP_TYPE = "full-backup";
var BACKUP_VERSION = 1;
var FULL_BACKUP_KEYS = [
	STORAGE_KEYS.RECORDS,
	STORAGE_KEYS.USER,
	STORAGE_KEYS.ACCESS_TOKEN,
	STORAGE_KEYS.REFRESH_TOKEN,
	STORAGE_KEYS.TOKEN_EXPIRES,
	STORAGE_KEYS.CATEGORIES,
	STORAGE_KEYS.BUDGETS,
	STORAGE_KEYS.QUICK_RECORDS,
	STORAGE_KEYS.FRIDGE_ITEMS,
	...SAVINGS_DATA_KEYS,
	DATA_VERSION_KEY
];
/** 导出全量数据为 JSON 备份文件（下载） */
var exportFullBackup = () => {
	const data = {};
	for (const key of FULL_BACKUP_KEYS) {
		const raw = localStorage.getItem(key);
		if (raw === null) continue;
		try {
			data[key] = JSON.parse(raw);
		} catch {
			data[key] = raw;
		}
	}
	const backup = {
		app: BACKUP_APP,
		type: BACKUP_TYPE,
		version: BACKUP_VERSION,
		exportedAt: nowISO(),
		data
	};
	const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = `星露账本备份_${(0, import_dayjs_min.default)().format("YYYYMMDD_HHmmss")}.json`;
	link.click();
	URL.revokeObjectURL(url);
};
/** 校验备份文件结构，非法时抛出带说明的错误 */
var validateBackupFile = (parsed) => {
	if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("文件内容不是有效的备份数据");
	const file = parsed;
	if (file.app !== BACKUP_APP || file.type !== BACKUP_TYPE) throw new Error("不是本应用的备份文件（缺少应用标识）");
	if (typeof file.version !== "number" || typeof file.data !== "object" || file.data === null) throw new Error("备份文件版本或数据结构异常");
	if (file.version > BACKUP_VERSION) throw new Error(`备份文件版本过新（v${file.version}），请先升级应用`);
	return file;
};
/**
* 从 JSON 备份文件恢复全量数据（覆盖式写入 localStorage）
* 返回恢复摘要；调用方应在确认后刷新页面使全部视图与数据一致
*/
var importFullBackup = async (file) => {
	const text = await file.text();
	let parsed;
	try {
		parsed = JSON.parse(text);
	} catch {
		throw new Error("备份文件不是有效的 JSON 格式");
	}
	const backup = validateBackupFile(parsed);
	const restoredKeys = [];
	for (const key of FULL_BACKUP_KEYS) {
		if (!(key in backup.data)) continue;
		const value = backup.data[key];
		localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
		restoredKeys.push(key);
	}
	markStorageDirty();
	const records = localStorage.getItem(STORAGE_KEYS.RECORDS);
	let recordCount = 0;
	try {
		const parsedRecords = records ? JSON.parse(records) : [];
		if (Array.isArray(parsedRecords)) recordCount = parsedRecords.length;
	} catch {
		recordCount = 0;
	}
	return {
		restoredKeys,
		recordCount,
		exportedAt: backup.exportedAt
	};
};
//#endregion
export { generateImportReport as a, importFromXLSX as c, initializeDataStore as d, exportToXLSX as i, importFullBackup as l, exportFullBackup as n, getTimestamp as o, exportToCSV as r, importFromCSV as s, compareDate as t, parseDate as u };

//# sourceMappingURL=importExport-YSO-S5kA.js.map