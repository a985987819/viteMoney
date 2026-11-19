import { r as __toESM } from "./rolldown-runtime-DZjNq3_i.js";
import { Ct as RefIcon$6, M as RefIcon$4, Nt as RefIcon$1, ar as require_react, bt as RefIcon$5, h as RefIcon$3, lt as RefIcon$7, m as RefIcon$2, yt as RefIcon } from "./vendor-others-DR5UvigV.js";
import { d as useNavigate, g as useTranslation, n as require_jsx_runtime } from "./vendor-react-BwfiEprq.js";
import { C as Radio, O as Empty, S as Calendar, T as button_default, d as List, f as Spin, h as drawer_default, l as Modal, p as Input, u as staticMethods, w as require_dayjs_min, x as Tabs, y as Checkbox } from "./vendor-ui-BCl3WSDB.js";
import { $ as isYesterday, D as saveLocalRecords, G as formatDisplayFullDate, H as DATE_FORMAT, J as formatDisplayYear, Q as isToday, U as formatDateKey, X as formatMonthKey, Y as formatDisplayYearMonth, _ as getLocalCategories, q as formatDisplayMonthDay, v as getLocalRecords } from "./storage-D-qjG_21.js";
import { n as useAuth } from "./useAuth-CcfI1Ahe.js";
import { t as compareDate } from "./importExport-YSO-S5kA.js";
import { t as getCategoryEmoji } from "./spriteIcons-D-QipidE.js";
import { a as BottomNav, c as deleteRecord, d as getReportData, i as SwipeableRecordItem, l as getBillsWithFilter, r as ShareReceipt, u as getRecords } from "./index-BP4F2dWk.js";
import { t as useCategories } from "./useCategories-vZHVOlh1.js";
import { t as init } from "./vendor-charts--BsBbs0R.js";
//#region src/utils/echartsPixelTheme.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min(), 1);
/**
* 像素风格 ECharts 主题配置
* 模拟星露谷物语的像素艺术风格
*/
var pixelColors = {
	expense: "#e74c3c",
	expenseLight: "#ff6b6b",
	income: "#27ae60",
	incomeLight: "#51cf66",
	woodDark: "#6e3b0b",
	woodMid: "#8b5a2b",
	woodLight: "#a07040",
	bg: "#f4d03f",
	bgLight: "#f7dc6f",
	text: "#5d4037",
	textLight: "#8d6e63",
	grid: "#d4a574"
};
var pixelFont = "'PixelFont', 'Courier New', monospace";
/**
* 计算合适的Y轴最大值，使柱状图高度更合理
* 避免某一天数据很高时其他数据几乎看不见
*/
var calculateYAxisMax = (data, showExpense, showIncome) => {
	let maxValue = 0;
	data.forEach((d) => {
		if (showExpense) maxValue = Math.max(maxValue, d.expense);
		if (showIncome) maxValue = Math.max(maxValue, d.income);
	});
	if (maxValue === 0) return 100;
	const allValues = [];
	data.forEach((d) => {
		if (showExpense && d.expense > 0) allValues.push(d.expense);
		if (showIncome && d.income > 0) allValues.push(d.income);
	});
	if (allValues.length === 0) return 100;
	allValues.sort((a, b) => a - b);
	const percentile90 = allValues[Math.floor(allValues.length * .9)] || maxValue;
	const adjustedMax = Math.max(maxValue * .3, percentile90 * 1.2);
	const magnitude = Math.pow(10, Math.floor(Math.log10(adjustedMax)));
	return Math.ceil(adjustedMax / magnitude) * magnitude;
};
/**
* 获取像素风格柱状图配置
*/
var getPixelBarOption = (data, showExpense, showIncome) => {
	const series = [];
	const yAxisMax = calculateYAxisMax(data, showExpense, showIncome);
	if (showExpense) series.push({
		name: "支出",
		type: "bar",
		data: data.map((d) => d.expense),
		itemStyle: {
			color: {
				type: "linear",
				x: 0,
				y: 0,
				x2: 0,
				y2: 1,
				colorStops: [{
					offset: 0,
					color: pixelColors.expenseLight
				}, {
					offset: 1,
					color: pixelColors.expense
				}]
			},
			borderRadius: 0,
			borderWidth: 2,
			borderColor: pixelColors.woodDark,
			shadowBlur: 0,
			shadowColor: "transparent"
		},
		barMaxWidth: 20,
		barCategoryGap: "35%",
		emphasis: { itemStyle: {
			borderWidth: 3,
			borderColor: pixelColors.woodDark
		} }
	});
	if (showIncome) series.push({
		name: "收入",
		type: "bar",
		data: data.map((d) => d.income),
		itemStyle: {
			color: {
				type: "linear",
				x: 0,
				y: 0,
				x2: 0,
				y2: 1,
				colorStops: [{
					offset: 0,
					color: pixelColors.incomeLight
				}, {
					offset: 1,
					color: pixelColors.income
				}]
			},
			borderRadius: 0,
			borderWidth: 2,
			borderColor: pixelColors.woodDark
		},
		barMaxWidth: 20,
		barCategoryGap: "35%",
		emphasis: { itemStyle: {
			borderWidth: 3,
			borderColor: pixelColors.woodDark
		} }
	});
	return {
		tooltip: {
			trigger: "axis",
			axisPointer: {
				type: "shadow",
				shadowStyle: { color: "rgba(93, 64, 55, 0.1)" }
			},
			backgroundColor: pixelColors.bg,
			borderColor: pixelColors.woodDark,
			borderWidth: 2,
			textStyle: {
				color: pixelColors.text,
				fontFamily: pixelFont,
				fontSize: 12
			},
			padding: 10,
			formatter: (params) => {
				let result = `<div style="font-weight:bold;margin-bottom:4px;">${params[0]?.axisValue}日</div>`;
				params.forEach((p) => {
					if (p.value > 0) result += `<div style="display:flex;align-items:center;margin:2px 0;">
              <span style="display:inline-block;width:10px;height:10px;background:${p.color.colorStops ? p.color.colorStops[0].color : p.color};border:1px solid ${pixelColors.woodDark};margin-right:6px;"></span>
              <span>${p.seriesName}: ¥${p.value.toFixed(2)}</span>
            </div>`;
				});
				return result;
			}
		},
		grid: {
			left: "3%",
			right: "3%",
			bottom: "12%",
			top: "8%",
			containLabel: true
		},
		xAxis: {
			type: "category",
			data: data.map((d) => d.date),
			boundaryGap: true,
			axisLine: {
				show: true,
				lineStyle: {
					color: pixelColors.woodDark,
					width: 2
				}
			},
			axisTick: {
				show: true,
				alignWithLabel: true,
				lineStyle: {
					color: pixelColors.woodDark,
					width: 2
				}
			},
			axisLabel: {
				interval: 4,
				fontSize: 10,
				color: pixelColors.text,
				fontFamily: pixelFont,
				fontWeight: "bold"
			}
		},
		yAxis: {
			type: "value",
			show: false,
			min: 0,
			max: yAxisMax
		},
		series,
		animation: true,
		animationDuration: 300,
		animationEasing: "linear"
	};
};
/**
* 获取像素风格饼图配置
*/
var getPixelPieOption = (data) => {
	return {
		tooltip: {
			trigger: "item",
			backgroundColor: pixelColors.bg,
			borderColor: pixelColors.woodDark,
			borderWidth: 2,
			textStyle: {
				color: pixelColors.text,
				fontFamily: pixelFont,
				fontSize: 12
			},
			formatter: (params) => {
				return `<div style="font-weight:bold;">${params.name}</div>
                <div>¥${params.value.toFixed(2)} (${params.percent}%)</div>`;
			}
		},
		series: [{
			type: "pie",
			radius: ["40%", "70%"],
			center: ["50%", "50%"],
			data,
			itemStyle: {
				borderRadius: 0,
				borderWidth: 3,
				borderColor: pixelColors.woodDark
			},
			label: {
				show: true,
				fontFamily: pixelFont,
				fontSize: 10,
				color: pixelColors.text,
				fontWeight: "bold",
				formatter: "{b}",
				width: 80,
				overflow: "truncate",
				ellipsis: ".."
			},
			labelLine: {
				show: true,
				length: 10,
				length2: 8,
				lineStyle: {
					color: pixelColors.woodDark,
					width: 2
				}
			},
			emphasis: {
				itemStyle: {
					borderWidth: 4,
					shadowBlur: 0
				},
				label: { fontSize: 13 }
			}
		}],
		color: [
			"#e74c3c",
			"#f39c12",
			"#f1c40f",
			"#27ae60",
			"#3498db",
			"#9b59b6",
			"#e91e63",
			"#00bcd4",
			"#ff5722",
			"#795548",
			"#607d8b",
			"#3f51b5"
		]
	};
};
var index_module_default$1 = {
	datePickerModal: "_datePickerModal_1pxld_6",
	datePickerContent: "_datePickerContent_1pxld_33",
	datePickerHeader: "_datePickerHeader_1pxld_37",
	dateDisplaySection: "_dateDisplaySection_1pxld_46",
	selectedDateDisplay: "_selectedDateDisplay_1pxld_50",
	yearRangeDisplay: "_yearRangeDisplay_1pxld_56",
	datePickerTabs: "_datePickerTabs_1pxld_61",
	tabItem: "_tabItem_1pxld_67",
	active: "_active_1pxld_77",
	pickerBody: "_pickerBody_1pxld_93",
	monthGrid: "_monthGrid_1pxld_98",
	yearGrid: "_yearGrid_1pxld_99",
	monthItem: "_monthItem_1pxld_105",
	yearItem: "_yearItem_1pxld_106",
	pickerPagination: "_pickerPagination_1pxld_121",
	pageBtn: "_pageBtn_1pxld_129",
	backToTodaySection: "_backToTodaySection_1pxld_148",
	backToTodayBtn: "_backToTodayBtn_1pxld_155",
	datePickerFooter: "_datePickerFooter_1pxld_167",
	confirmBtn: "_confirmBtn_1pxld_174"
};
//#endregion
//#region src/components/DatePicker/index.tsx
var import_jsx_runtime = require_jsx_runtime();
var DatePicker = ({ visible, onCancel, onConfirm, defaultDate = (0, import_dayjs_min.default)(), defaultMode = "month" }) => {
	const [tempDate, setTempDate] = (0, import_react.useState)(defaultDate);
	const [tempMode, setTempMode] = (0, import_react.useState)(defaultMode);
	const [yearPage, setYearPage] = (0, import_react.useState)(0);
	const [monthPage, setMonthPage] = (0, import_react.useState)(5);
	const yearsPerPage = 12;
	const yearList = (0, import_react.useMemo)(() => {
		const startYear = (0, import_dayjs_min.default)().year() - 50 + yearPage * yearsPerPage;
		const years = [];
		for (let i = 0; i < yearsPerPage; i++) years.push(startYear + i);
		return years;
	}, [yearPage]);
	const monthList = (0, import_react.useMemo)(() => {
		const year = (0, import_dayjs_min.default)().year() - 5 + monthPage;
		const months = [];
		for (let i = 1; i <= 12; i++) months.push({
			year,
			month: i
		});
		return months;
	}, [monthPage]);
	const handleConfirm = () => {
		onConfirm(tempDate, tempMode);
	};
	const handleModeChange = (mode) => {
		setTempMode(mode);
		if (mode === "month") setMonthPage(tempDate.year() - (0, import_dayjs_min.default)().year() + 5);
		else setYearPage(Math.floor((tempDate.year() - ((0, import_dayjs_min.default)().year() - 50)) / yearsPerPage));
	};
	const handlePrevPage = () => {
		if (tempMode === "month") setMonthPage((p) => p - 1);
		else setYearPage((p) => p - 1);
	};
	const handleNextPage = () => {
		if (tempMode === "month") setMonthPage((p) => p + 1);
		else setYearPage((p) => p + 1);
	};
	const handleBackToToday = () => {
		const today = (0, import_dayjs_min.default)();
		setTempDate(today);
		if (tempMode === "month") setMonthPage(today.year() - (0, import_dayjs_min.default)().year() + 5);
		else setYearPage(Math.floor((today.year() - ((0, import_dayjs_min.default)().year() - 50)) / yearsPerPage));
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		open: visible,
		onCancel,
		footer: null,
		width: "100%",
		className: index_module_default$1.datePickerModal,
		closable: false,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: index_module_default$1.datePickerContent,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default$1.datePickerHeader,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default$1.dateDisplaySection,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default$1.selectedDateDisplay,
							children: tempMode === "month" ? formatDisplayYearMonth(tempDate) : formatDisplayYear(tempDate)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default$1.yearRangeDisplay,
							children: tempMode === "month" ? `${monthList[0].year}年 - ${monthList[monthList.length - 1].year}年` : `${yearList[0]}年 - ${yearList[yearList.length - 1]}年`
						})]
					}), tempMode === "year" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default$1.pickerPagination,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default$1.pageBtn,
							onClick: handlePrevPage,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default$1.pageBtn,
							onClick: handleNextPage,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$1, {})
						})]
					}) })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default$1.datePickerTabs,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `${index_module_default$1.tabItem} ${tempMode === "month" ? index_module_default$1.active : ""}`,
						onClick: () => handleModeChange("month"),
						children: "按月"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `${index_module_default$1.tabItem} ${tempMode === "year" ? index_module_default$1.active : ""}`,
						onClick: () => handleModeChange("year"),
						children: "按年"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: index_module_default$1.pickerBody,
					children: tempMode === "month" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default$1.monthGrid,
						children: monthList.map(({ year, month }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `${index_module_default$1.monthItem} ${tempDate.year() === year && tempDate.month() + 1 === month ? index_module_default$1.active : ""}`,
							onClick: () => setTempDate((0, import_dayjs_min.default)().year(year).month(month - 1)),
							children: [month, "月"]
						}, `${year}-${month}`))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default$1.yearGrid,
						children: yearList.map((year) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `${index_module_default$1.yearItem} ${tempDate.year() === year ? index_module_default$1.active : ""}`,
							onClick: () => setTempDate(tempDate.year(year)),
							children: [year, "年"]
						}, year))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: index_module_default$1.backToTodaySection,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: index_module_default$1.backToTodayBtn,
						onClick: handleBackToToday,
						children: "回到今日"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: index_module_default$1.datePickerFooter,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
						type: "primary",
						className: index_module_default$1.confirmBtn,
						onClick: handleConfirm,
						children: "确定"
					})
				})
			]
		})
	});
};
var BillContent_module_default = {
	billContent: "_billContent_ct5h2_6",
	billHeaderFixed: "_billHeaderFixed_ct5h2_17",
	dateSelectorBar: "_dateSelectorBar_ct5h2_24",
	dateDisplay: "_dateDisplay_ct5h2_32",
	arrowDown: "_arrowDown_ct5h2_41",
	filterBtn: "_filterBtn_ct5h2_46",
	billStatsOverview: "_billStatsOverview_ct5h2_56",
	collapsed: "_collapsed_ct5h2_61",
	statsContent: "_statsContent_ct5h2_67",
	statsHeader: "_statsHeader_ct5h2_74",
	statsItem: "_statsItem_ct5h2_80",
	disabled: "_disabled_ct5h2_93",
	radioDot: "_radioDot_ct5h2_97",
	expense: "_expense_ct5h2_102",
	income: "_income_ct5h2_105",
	statsLabel: "_statsLabel_ct5h2_109",
	statsValue: "_statsValue_ct5h2_115",
	chartSection: "_chartSection_ct5h2_127",
	chartContainer: "_chartContainer_ct5h2_131",
	balanceSection: "_balanceSection_ct5h2_135",
	balanceContent: "_balanceContent_ct5h2_149",
	balanceLabel: "_balanceLabel_ct5h2_155",
	balanceValue: "_balanceValue_ct5h2_161",
	balanceCount: "_balanceCount_ct5h2_173",
	statsToggleBar: "_statsToggleBar_ct5h2_179",
	sortBar: "_sortBar_ct5h2_189",
	sortLeft: "_sortLeft_ct5h2_196",
	sortLabel: "_sortLabel_ct5h2_202",
	sortType: "_sortType_ct5h2_208",
	sortOrder: "_sortOrder_ct5h2_218",
	billList: "_billList_ct5h2_224",
	loadingContainer: "_loadingContainer_ct5h2_245",
	emptyState: "_emptyState_ct5h2_252",
	dayGroup: "_dayGroup_ct5h2_256",
	dayHeader: "_dayHeader_ct5h2_260",
	dayDate: "_dayDate_ct5h2_269",
	dayTotal: "_dayTotal_ct5h2_276",
	loadMoreHint: "_loadMoreHint_ct5h2_289",
	backTopBtn: "_backTopBtn_ct5h2_301",
	filterContent: "_filterContent_ct5h2_307",
	filterSection: "_filterSection_ct5h2_311",
	filterLabel: "_filterLabel_ct5h2_315",
	amountRange: "_amountRange_ct5h2_323"
};
//#endregion
//#region src/pages/Statistics/BillContent.tsx
var getAllCategoriesFromStorage = () => {
	const stored = getLocalCategories();
	if (stored) return [...stored.expense || [], ...stored.income || []];
	return [];
};
/**
* 账单内容组件
*/
var BillContent = () => {
	const navigate = useNavigate();
	const { isLoggedIn } = useAuth();
	const { allCategoryOptions } = useCategories();
	const [records, setRecords] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [showBackTop, setShowBackTop] = (0, import_react.useState)(false);
	const [chartCollapsed, setChartCollapsed] = (0, import_react.useState)(false);
	const [startDate, setStartDate] = (0, import_react.useState)((0, import_dayjs_min.default)().startOf("month"));
	const [endDate, setEndDate] = (0, import_react.useState)((0, import_dayjs_min.default)());
	const [isDatePickerVisible, setIsDatePickerVisible] = (0, import_react.useState)(false);
	const [isFilterVisible, setIsFilterVisible] = (0, import_react.useState)(false);
	const [filter, setFilter] = (0, import_react.useState)({ categories: [] });
	const [summary, setSummary] = (0, import_react.useState)({
		totalExpense: 0,
		totalIncome: 0,
		count: 0
	});
	const [showExpense, setShowExpense] = (0, import_react.useState)(true);
	const [showIncome, setShowIncome] = (0, import_react.useState)(true);
	const [sortType, setSortType] = (0, import_react.useState)("time");
	const [sortOrder, setSortOrder] = (0, import_react.useState)("desc");
	const [, setShowCustomScrollbar] = (0, import_react.useState)(false);
	const [scrollbarTop, setScrollbarTop] = (0, import_react.useState)(0);
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const scrollTimeoutRef = (0, import_react.useRef)(null);
	const scrollbarRef = (0, import_react.useRef)(null);
	const dragStartYRef = (0, import_react.useRef)(0);
	const dragStartScrollTopRef = (0, import_react.useRef)(0);
	const listRef = (0, import_react.useRef)(null);
	const chartRef = (0, import_react.useRef)(null);
	const chartInstance = (0, import_react.useRef)(null);
	const loadRecords = (0, import_react.useCallback)(async (loadStartDate, loadEndDate) => {
		if (loading) return;
		setLoading(true);
		const sDate = loadStartDate || startDate;
		const eDate = loadEndDate || endDate;
		try {
			if (isLoggedIn) {
				const response = await getBillsWithFilter({
					startDate: sDate.format(DATE_FORMAT.DATE_KEY),
					endDate: eDate.format(DATE_FORMAT.DATE_KEY),
					...filter
				});
				setRecords(response.records);
				setSummary(response.summary);
			} else {
				let filteredRecords = getLocalRecords().filter((r) => {
					const recordDate = (0, import_dayjs_min.default)(r.date);
					return recordDate.isAfter(sDate.subtract(1, "day")) && recordDate.isBefore(eDate.add(1, "day"));
				});
				if (filter.type) filteredRecords = filteredRecords.filter((r) => r.type === filter.type);
				if (filter.categories.length > 0) filteredRecords = filteredRecords.filter((r) => filter.categories.includes(r.category));
				if (filter.minAmount !== void 0) filteredRecords = filteredRecords.filter((r) => r.amount >= filter.minAmount);
				if (filter.maxAmount !== void 0) filteredRecords = filteredRecords.filter((r) => r.amount <= filter.maxAmount);
				filteredRecords.sort((a, b) => {
					if (sortType === "time") return sortOrder === "desc" ? compareDate(b.date, a.date) : compareDate(a.date, b.date);
					else return sortOrder === "desc" ? b.amount - a.amount : a.amount - b.amount;
				});
				setRecords(filteredRecords);
				setSummary({
					totalExpense: filteredRecords.filter((r) => r.type === "expense").reduce((sum, r) => sum + r.amount, 0),
					totalIncome: filteredRecords.filter((r) => r.type === "income").reduce((sum, r) => sum + r.amount, 0),
					count: filteredRecords.length
				});
			}
		} catch (error) {
			console.error("Load records error:", error);
			staticMethods.error("加载数据失败");
		} finally {
			setLoading(false);
		}
	}, [
		loading,
		startDate,
		endDate,
		filter,
		sortType,
		sortOrder,
		isLoggedIn
	]);
	(0, import_react.useEffect)(() => {
		loadRecords();
	}, [
		filter,
		sortType,
		sortOrder
	]);
	const stats = (0, import_react.useMemo)(() => {
		const expense = summary.totalExpense;
		const income = summary.totalIncome;
		const dailyStats = records.reduce((acc, r) => {
			const dateKey = formatDateKey(r.date);
			if (!acc[dateKey]) acc[dateKey] = {
				expense: 0,
				income: 0
			};
			if (r.type === "expense") acc[dateKey].expense += r.amount;
			else acc[dateKey].income += r.amount;
			return acc;
		}, {});
		const daysInMonth = startDate.daysInMonth();
		const yearMonth = formatMonthKey(startDate);
		const chartData = [];
		for (let i = 1; i <= daysInMonth; i++) {
			const dayData = dailyStats[`${yearMonth}-${String(i).padStart(2, "0")}`] || {
				expense: 0,
				income: 0
			};
			chartData.push({
				date: i,
				expense: dayData.expense,
				income: dayData.income
			});
		}
		return {
			expense,
			income,
			dailyStats: chartData
		};
	}, [
		records,
		summary,
		startDate
	]);
	(0, import_react.useEffect)(() => {
		console.log("[BillContent Chart] Initializing chart...");
		console.log("[BillContent Chart] chartRef.current:", !!chartRef.current);
		console.log("[BillContent Chart] chartCollapsed:", chartCollapsed);
		console.log("[BillContent Chart] stats.dailyStats.length:", stats.dailyStats.length);
		if (!chartRef.current || chartCollapsed || stats.dailyStats.length === 0) {
			console.log("[BillContent Chart] Cleanup - conditions not met");
			chartInstance.current?.dispose();
			chartInstance.current = null;
			return;
		}
		try {
			console.log("[BillContent Chart] Creating ECharts instance...");
			if (!chartInstance.current) {
				chartInstance.current = init(chartRef.current);
				console.log("[BillContent Chart] ECharts instance created");
			}
			console.log("[BillContent Chart] Getting chart option...");
			const option = getPixelBarOption(stats.dailyStats, showExpense, showIncome);
			console.log("[BillContent Chart] Setting option...");
			chartInstance.current.setOption(option, true);
			console.log("[BillContent Chart] Chart initialized successfully");
		} catch (error) {
			console.error("[BillContent Chart] ECharts initialization error:", error);
			console.error("[BillContent Chart] Error details:", {
				message: error.message,
				stack: error.stack,
				name: error.name
			});
			throw error;
		}
		return () => {
			console.log("[BillContent Chart] Cleanup - unmounting");
			chartInstance.current?.dispose();
			chartInstance.current = null;
		};
	}, [
		stats.dailyStats,
		showExpense,
		showIncome,
		chartCollapsed
	]);
	(0, import_react.useEffect)(() => {
		const handleResize = () => {
			chartInstance.current?.resize();
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	const handleEditRecord = (record) => {
		navigate("/add", { state: { record } });
	};
	const handleDeleteRecord = async (record) => {
		Modal.confirm({
			title: "确认删除",
			content: "确定要删除这条记录吗？",
			okType: "danger",
			onOk: async () => {
				try {
					if (isLoggedIn) await deleteRecord(record.id);
					else saveLocalRecords(getLocalRecords().filter((r) => r.id !== record.id));
					staticMethods.success("删除成功");
					loadRecords();
				} catch (error) {
					staticMethods.error("删除失败");
					console.error("Delete error:", error);
				}
			}
		});
	};
	const [isManuallyExpanded, setIsManuallyExpanded] = (0, import_react.useState)(false);
	const lastScrollTopRef = (0, import_react.useRef)(0);
	const handleScroll = (0, import_react.useCallback)(() => {
		if (!listRef.current) return;
		const { scrollTop, scrollHeight, clientHeight } = listRef.current;
		setShowBackTop(scrollTop > 300);
		const isScrollingDown = scrollTop > lastScrollTopRef.current;
		lastScrollTopRef.current = scrollTop;
		if (!isManuallyExpanded && isScrollingDown && scrollTop > 50 && !chartCollapsed) setChartCollapsed(true);
		setScrollbarTop(scrollTop / (scrollHeight - clientHeight) * (clientHeight - 60 - 20) + 10);
		setShowCustomScrollbar(true);
		if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
		scrollTimeoutRef.current = setTimeout(() => {
			if (!isDragging) setShowCustomScrollbar(false);
		}, 1e3);
	}, [
		isDragging,
		isManuallyExpanded,
		chartCollapsed
	]);
	(0, import_react.useEffect)(() => {
		const listEl = listRef.current;
		if (listEl) {
			listEl.addEventListener("scroll", handleScroll);
			return () => listEl.removeEventListener("scroll", handleScroll);
		}
	}, [handleScroll]);
	const scrollToTop = () => {
		listRef.current?.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	};
	const handleScrollbarMouseDown = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		e.stopPropagation();
		setIsDragging(true);
		dragStartYRef.current = e.clientY;
		if (listRef.current) dragStartScrollTopRef.current = listRef.current.scrollTop;
	}, []);
	const handleScrollbarMouseMove = (0, import_react.useCallback)((e) => {
		if (!isDragging || !listRef.current) return;
		const deltaY = e.clientY - dragStartYRef.current;
		const { scrollHeight, clientHeight } = listRef.current;
		const scrollPercent = deltaY / (clientHeight - 60 - 20);
		const maxScrollTop = scrollHeight - clientHeight;
		const newScrollTop = dragStartScrollTopRef.current + scrollPercent * maxScrollTop;
		listRef.current.scrollTop = Math.max(0, Math.min(newScrollTop, maxScrollTop));
	}, [isDragging]);
	const handleScrollbarMouseUp = (0, import_react.useCallback)(() => {
		setIsDragging(false);
		scrollTimeoutRef.current = setTimeout(() => {
			setShowCustomScrollbar(false);
		}, 1e3);
	}, []);
	(0, import_react.useEffect)(() => {
		if (isDragging) {
			document.addEventListener("mousemove", handleScrollbarMouseMove);
			document.addEventListener("mouseup", handleScrollbarMouseUp);
			return () => {
				document.removeEventListener("mousemove", handleScrollbarMouseMove);
				document.removeEventListener("mouseup", handleScrollbarMouseUp);
			};
		}
	}, [
		isDragging,
		handleScrollbarMouseMove,
		handleScrollbarMouseUp
	]);
	const groupedRecords = (0, import_react.useMemo)(() => {
		if (sortType === "amount") return {};
		const grouped = records.reduce((acc, record) => {
			const dateKey = formatDateKey(record.date);
			if (!acc[dateKey]) acc[dateKey] = [];
			acc[dateKey].push(record);
			return acc;
		}, {});
		Object.keys(grouped).forEach((dateKey) => {
			grouped[dateKey].sort((a, b) => {
				return sortOrder === "desc" ? compareDate(b.date, a.date) : compareDate(a.date, b.date);
			});
		});
		return grouped;
	}, [
		records,
		sortType,
		sortOrder
	]);
	const getDayTotal = (dayRecords) => {
		return {
			expense: dayRecords.filter((r) => r.type === "expense").reduce((sum, r) => sum + r.amount, 0),
			income: dayRecords.filter((r) => r.type === "income").reduce((sum, r) => sum + r.amount, 0)
		};
	};
	const getDateLabel = (dateStr) => {
		const dayBeforeYesterday = (0, import_dayjs_min.default)().subtract(2, "day").format(DATE_FORMAT.DATE_KEY);
		const date = (0, import_dayjs_min.default)(dateStr);
		if (isToday(dateStr)) return "今天";
		if (isYesterday(dateStr)) return "昨天";
		if (dateStr === dayBeforeYesterday) return "前天";
		const weekday = [
			"周日",
			"周一",
			"周二",
			"周三",
			"周四",
			"周五",
			"周六"
		][date.day()];
		return `${formatDisplayMonthDay(date)} ${weekday}`;
	};
	const getDisplayText = () => {
		return `${formatDisplayFullDate(startDate)} - ${formatDisplayMonthDay(endDate)}`;
	};
	const applyFilter = () => {
		loadRecords();
		setIsFilterVisible(false);
	};
	const resetFilter = () => {
		setFilter({ categories: [] });
	};
	const allCategories = (0, import_react.useMemo)(() => {
		const storedCategories = getAllCategoriesFromStorage();
		if (storedCategories.length > 0) return storedCategories;
		return allCategoryOptions.map((opt) => ({
			id: opt.value,
			name: opt.label,
			icon: opt.icon,
			type: opt.type
		}));
	}, [allCategoryOptions]);
	const handleDateConfirm = (date) => {
		setStartDate(date.startOf("month"));
		setEndDate(date.endOf("month"));
		setIsDatePickerVisible(false);
		loadRecords(date.startOf("month"), date.endOf("month"));
	};
	const toggleSortType = () => {
		setSortType((prev) => prev === "time" ? "amount" : "time");
	};
	const toggleSortOrder = () => {
		setSortOrder((prev) => prev === "desc" ? "asc" : "desc");
	};
	const toggleChart = () => {
		setChartCollapsed((prev) => {
			const newState = !prev;
			setIsManuallyExpanded(!newState);
			return newState;
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: BillContent_module_default.billContent,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: BillContent_module_default.billHeaderFixed,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: BillContent_module_default.dateSelectorBar,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: BillContent_module_default.dateDisplay,
							onClick: () => setIsDatePickerVisible(true),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: getDisplayText() }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: BillContent_module_default.arrowDown,
								children: "▼"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: BillContent_module_default.filterBtn,
							onClick: () => setIsFilterVisible(true),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "筛选" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `${BillContent_module_default.billStatsOverview} ${chartCollapsed ? BillContent_module_default.collapsed : ""}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: BillContent_module_default.statsContent,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: BillContent_module_default.statsHeader,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `${BillContent_module_default.statsItem} ${!showExpense ? BillContent_module_default.disabled : ""}`,
									onClick: () => setShowExpense(!showExpense),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `${BillContent_module_default.radioDot} ${BillContent_module_default.expense}` }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: BillContent_module_default.statsLabel,
											children: "月支出"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `${BillContent_module_default.statsValue} ${BillContent_module_default.expense}`,
											children: ["¥", stats.expense.toFixed(2)]
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `${BillContent_module_default.statsItem} ${!showIncome ? BillContent_module_default.disabled : ""}`,
									onClick: () => setShowIncome(!showIncome),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `${BillContent_module_default.radioDot} ${BillContent_module_default.income}` }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: BillContent_module_default.statsLabel,
											children: "月收入"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: `${BillContent_module_default.statsValue} ${BillContent_module_default.income}`,
											children: ["¥", stats.income.toFixed(2)]
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: BillContent_module_default.chartSection,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: BillContent_module_default.chartContainer,
									ref: chartRef,
									style: { height: "100px" }
								})
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `${BillContent_module_default.balanceSection} ${chartCollapsed ? BillContent_module_default.collapsed : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: BillContent_module_default.balanceContent,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: BillContent_module_default.balanceLabel,
								children: "结余"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: `${BillContent_module_default.balanceValue} ${stats.income - stats.expense >= 0 ? BillContent_module_default.income : BillContent_module_default.expense}`,
								children: ["¥", (stats.income - stats.expense).toFixed(2)]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: BillContent_module_default.balanceCount,
							children: [
								"共",
								summary.count,
								"笔"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: BillContent_module_default.statsToggleBar,
						onClick: toggleChart,
						children: chartCollapsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$1, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: BillContent_module_default.sortBar,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: BillContent_module_default.sortLeft,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: BillContent_module_default.sortLabel,
									children: "排序："
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: BillContent_module_default.sortType,
									onClick: toggleSortType,
									children: sortType === "time" ? "时间" : "金额"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: BillContent_module_default.sortOrder,
									onClick: toggleSortOrder,
									children: sortOrder === "desc" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$2, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$3, {})
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: BillContent_module_default.billList,
				ref: listRef,
				children: [loading && records.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: BillContent_module_default.loadingContainer,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spin, { size: "large" })
				}) : records.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					description: "暂无记录",
					className: BillContent_module_default.emptyState
				}) : sortType === "amount" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
					dataSource: records,
					renderItem: (record) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwipeableRecordItem, {
						record,
						onEdit: handleEditRecord,
						onDelete: handleDeleteRecord
					})
				}) : Object.entries(groupedRecords).sort(([dateA], [dateB]) => sortOrder === "desc" ? dateB.localeCompare(dateA) : dateA.localeCompare(dateB)).map(([dateKey, dayRecords]) => {
					const dayTotal = getDayTotal(dayRecords);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: BillContent_module_default.dayGroup,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: BillContent_module_default.dayHeader,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: BillContent_module_default.dayHeaderLeft,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: BillContent_module_default.dayDate,
									children: getDateLabel(dateKey)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareReceipt, {
									date: dateKey,
									records: dayRecords
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: BillContent_module_default.dayTotal,
								children: [dayTotal.income > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: BillContent_module_default.income,
									children: ["收¥", dayTotal.income.toFixed(2)]
								}), dayTotal.expense > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: BillContent_module_default.expense,
									children: ["支¥", dayTotal.expense.toFixed(2)]
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
							dataSource: dayRecords,
							renderItem: (record) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwipeableRecordItem, {
								record,
								onEdit: handleEditRecord,
								onDelete: handleDeleteRecord
							})
						})]
					}, dateKey);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: "80px" } })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: scrollbarRef,
				className: BillContent_module_default.customScrollbar,
				style: { top: scrollbarTop },
				onMouseDown: handleScrollbarMouseDown
			}),
			showBackTop && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				onClick: scrollToTop,
				className: BillContent_module_default.backTopBtn,
				children: "↑"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
				visible: isDatePickerVisible,
				onCancel: () => setIsDatePickerVisible(false),
				onConfirm: handleDateConfirm,
				defaultDate: startDate,
				defaultMode: "month"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: "筛选",
				open: isFilterVisible,
				onCancel: () => setIsFilterVisible(false),
				footer: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
					onClick: resetFilter,
					children: "重置"
				}, "reset"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
					onClick: applyFilter,
					children: "确定"
				}, "confirm")],
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: BillContent_module_default.filterContent,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: BillContent_module_default.filterSection,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: BillContent_module_default.filterLabel,
								children: "类型"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Radio.Group, {
								value: filter.type,
								onChange: (e) => setFilter({
									...filter,
									type: e.target.value
								}),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
										value: void 0,
										children: "全部"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
										value: "expense",
										children: "支出"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {
										value: "income",
										children: "收入"
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: BillContent_module_default.filterSection,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: BillContent_module_default.filterLabel,
								children: "分类"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox.Group, {
								value: filter.categories,
								onChange: (values) => setFilter({
									...filter,
									categories: values
								}),
								children: allCategories.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Checkbox, {
									value: cat.name,
									children: [
										cat.icon,
										" ",
										cat.name
									]
								}, cat.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: BillContent_module_default.filterSection,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: BillContent_module_default.filterLabel,
								children: "金额范围"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: BillContent_module_default.amountRange,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										placeholder: "最小金额",
										value: filter.minAmount,
										onChange: (e) => setFilter({
											...filter,
											minAmount: e.target.value ? Number(e.target.value) : void 0
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "-" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "number",
										placeholder: "最大金额",
										value: filter.maxAmount,
										onChange: (e) => setFilter({
											...filter,
											maxAmount: e.target.value ? Number(e.target.value) : void 0
										})
									})
								]
							})]
						})
					]
				})
			})
		]
	});
};
var ReportContent_module_default = {
	reportContent: "_reportContent_54xvu_6",
	listView: "_listView_54xvu_18",
	loadingContainer: "_loadingContainer_54xvu_28",
	emptyContainer: "_emptyContainer_54xvu_29",
	loadingText: "_loadingText_54xvu_36",
	monthSelector: "_monthSelector_54xvu_42",
	monthText: "_monthText_54xvu_53",
	arrowDown: "_arrowDown_54xvu_59",
	calendarControls: "_calendarControls_54xvu_64",
	controlCheckbox: "_controlCheckbox_54xvu_77",
	expenseLabel: "_expenseLabel_54xvu_77",
	incomeLabel: "_incomeLabel_54xvu_81",
	balanceLabel: "_balanceLabel_54xvu_85",
	calendarSection: "_calendarSection_54xvu_90",
	miniCalendar: "_miniCalendar_54xvu_132",
	calendarCell: "_calendarCell_54xvu_132",
	calendarExpense: "_calendarExpense_54xvu_141",
	calendarIncome: "_calendarIncome_54xvu_145",
	selectedDateBar: "_selectedDateBar_54xvu_150",
	selectedDateText: "_selectedDateText_54xvu_160",
	clearDateBtn: "_clearDateBtn_54xvu_167",
	summaryCards: "_summaryCards_54xvu_176",
	summaryCard: "_summaryCard_54xvu_176",
	cardLabel: "_cardLabel_54xvu_192",
	cardValue: "_cardValue_54xvu_198",
	expense: "_expense_54xvu_77",
	income: "_income_54xvu_81",
	viewToggle: "_viewToggle_54xvu_210",
	filterBtn: "_filterBtn_54xvu_228",
	chartView: "_chartView_54xvu_240",
	pieChart: "_pieChart_54xvu_249",
	categoryItem: "_categoryItem_54xvu_253",
	categoryInfo: "_categoryInfo_54xvu_261",
	categoryIcon: "_categoryIcon_54xvu_267",
	categoryDetail: "_categoryDetail_54xvu_271",
	categoryName: "_categoryName_54xvu_277",
	categoryCount: "_categoryCount_54xvu_284",
	categoryAmount: "_categoryAmount_54xvu_290",
	percentage: "_percentage_54xvu_308",
	expandBtn: "_expandBtn_54xvu_314",
	recordDetailList: "_recordDetailList_54xvu_328",
	recordDetailItem: "_recordDetailItem_54xvu_334",
	recordDetailLeft: "_recordDetailLeft_54xvu_345",
	recordDetailDate: "_recordDetailDate_54xvu_353",
	recordDetailRemark: "_recordDetailRemark_54xvu_360",
	recordDetailAmount: "_recordDetailAmount_54xvu_369",
	filterContent: "_filterContent_54xvu_382",
	filterSection: "_filterSection_54xvu_386",
	filterLabel: "_filterLabel_54xvu_395",
	confirmBtn: "_confirmBtn_54xvu_403"
};
//#endregion
//#region src/pages/Statistics/ReportContent.tsx
/**
* 报表内容组件
*/
var ReportContent = () => {
	const { isLoggedIn } = useAuth();
	const [reportData, setReportData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [viewType, setViewType] = (0, import_react.useState)("chart");
	const [currentDate, setCurrentDate] = (0, import_react.useState)((0, import_dayjs_min.default)());
	const [isDatePickerVisible, setIsDatePickerVisible] = (0, import_react.useState)(false);
	const [isFilterVisible, setIsFilterVisible] = (0, import_react.useState)(false);
	const [selectedCategories, setSelectedCategories] = (0, import_react.useState)([]);
	const [showExpense, setShowExpense] = (0, import_react.useState)(true);
	const [showIncome, setShowIncome] = (0, import_react.useState)(true);
	const [showBalance, setShowBalance] = (0, import_react.useState)(false);
	const [calendarMode, setCalendarMode] = (0, import_react.useState)("month");
	const [selectedDate, setSelectedDate] = (0, import_react.useState)(null);
	const [expandedCategories, setExpandedCategories] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [categoryRecords, setCategoryRecords] = (0, import_react.useState)(/* @__PURE__ */ new Map());
	const [dailyRecords, setDailyRecords] = (0, import_react.useState)([]);
	const [, setDailyRecordsLoading] = (0, import_react.useState)(false);
	const chartRef = (0, import_react.useRef)(null);
	const chartInstance = (0, import_react.useRef)(null);
	const loadReportData = async () => {
		setLoading(true);
		try {
			if (isLoggedIn) setReportData(await getReportData(currentDate.year(), currentDate.month() + 1));
			else {
				const allRecords = getLocalRecords();
				const startOfMonth = currentDate.startOf("month");
				const endOfMonth = currentDate.endOf("month");
				const monthRecords = allRecords.filter((r) => {
					const recordDate = (0, import_dayjs_min.default)(r.date);
					return recordDate.isAfter(startOfMonth.subtract(1, "day")) && recordDate.isBefore(endOfMonth.add(1, "day"));
				});
				const totalExpense = monthRecords.filter((r) => r.type === "expense").reduce((sum, r) => sum + r.amount, 0);
				const totalIncome = monthRecords.filter((r) => r.type === "income").reduce((sum, r) => sum + r.amount, 0);
				const categoryMap = /* @__PURE__ */ new Map();
				monthRecords.forEach((r) => {
					const key = `${r.type}-${r.category}`;
					if (!categoryMap.has(key)) categoryMap.set(key, {
						category: r.category,
						categoryIcon: r.categoryIcon,
						type: r.type,
						amount: 0,
						percentage: 0,
						count: 0
					});
					const stats = categoryMap.get(key);
					stats.amount += r.amount;
					stats.count += 1;
				});
				categoryMap.forEach((stats) => {
					const total = stats.type === "expense" ? totalExpense : totalIncome;
					stats.percentage = total > 0 ? stats.amount / total * 100 : 0;
				});
				const categoryStats = {
					expense: Array.from(categoryMap.values()).filter((s) => s.type === "expense"),
					income: Array.from(categoryMap.values()).filter((s) => s.type === "income")
				};
				categoryStats.expense.sort((a, b) => b.amount - a.amount);
				categoryStats.income.sort((a, b) => b.amount - a.amount);
				const dailyStatsMap = /* @__PURE__ */ new Map();
				for (let i = 1; i <= currentDate.daysInMonth(); i++) {
					const dateStr = currentDate.format(`${DATE_FORMAT.MONTH_KEY}-${String(i).padStart(2, "0")}`);
					dailyStatsMap.set(dateStr, {
						date: dateStr,
						expense: 0,
						income: 0
					});
				}
				monthRecords.forEach((r) => {
					const dateStr = formatDateKey(r.date);
					const stats = dailyStatsMap.get(dateStr);
					if (stats) if (r.type === "expense") stats.expense += r.amount;
					else stats.income += r.amount;
				});
				const reportData = {
					period: {
						startDate: startOfMonth.format(DATE_FORMAT.DATE_KEY),
						endDate: endOfMonth.format(DATE_FORMAT.DATE_KEY)
					},
					summary: {
						totalExpense,
						totalIncome,
						balance: totalIncome - totalExpense
					},
					dailyStats: Array.from(dailyStatsMap.values()),
					categoryStats
				};
				console.log("[ReportContent] Generated reportData (offline):", reportData);
				setReportData(reportData);
			}
		} catch (error) {
			console.error("Load report error:", error);
		} finally {
			setLoading(false);
		}
	};
	const loadDailyRecords = async (date) => {
		if (!date) return;
		setDailyRecordsLoading(true);
		try {
			const dateStr = formatDateKey(date);
			let records = [];
			if (isLoggedIn) records = await getRecords({
				startDate: dateStr,
				endDate: dateStr
			});
			else records = getLocalRecords().filter((r) => formatDateKey(r.date) === dateStr);
			setDailyRecords(records);
		} catch (error) {
			console.error("Failed to load daily records:", error);
			staticMethods.error("加载日记录失败");
			setDailyRecords([]);
		} finally {
			setDailyRecordsLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadReportData();
	}, [currentDate, isLoggedIn]);
	(0, import_react.useEffect)(() => {
		if (selectedDate) loadDailyRecords(selectedDate);
		else setDailyRecords([]);
	}, [selectedDate, isLoggedIn]);
	const dailyCategoryStats = (0, import_react.useMemo)(() => {
		if (!selectedDate) return null;
		if (dailyRecords.length === 0) return {
			expense: [],
			income: [],
			summary: {
				totalExpense: 0,
				totalIncome: 0,
				balance: 0
			}
		};
		const totalExpense = dailyRecords.filter((r) => r.type === "expense").reduce((sum, r) => sum + r.amount, 0);
		const totalIncome = dailyRecords.filter((r) => r.type === "income").reduce((sum, r) => sum + r.amount, 0);
		const categoryMap = /* @__PURE__ */ new Map();
		dailyRecords.forEach((r) => {
			const key = `${r.type}-${r.category}`;
			if (!categoryMap.has(key)) categoryMap.set(key, {
				category: r.category,
				categoryIcon: r.categoryIcon,
				type: r.type,
				amount: 0,
				percentage: 0,
				count: 0
			});
			const stats = categoryMap.get(key);
			stats.amount += r.amount;
			stats.count += 1;
		});
		categoryMap.forEach((stats) => {
			const total = stats.type === "expense" ? totalExpense : totalIncome;
			stats.percentage = total > 0 ? stats.amount / total * 100 : 0;
		});
		const result = {
			expense: Array.from(categoryMap.values()).filter((s) => s.type === "expense"),
			income: Array.from(categoryMap.values()).filter((s) => s.type === "income"),
			summary: {
				totalExpense,
				totalIncome,
				balance: totalIncome - totalExpense
			}
		};
		console.log("[ReportContent] dailyCategoryStats computed:", {
			selectedDate: selectedDate ? formatDateKey(selectedDate) : void 0,
			dailyRecordsLength: dailyRecords.length,
			result
		});
		return result;
	}, [selectedDate, dailyRecords]);
	const displayData = (0, import_react.useMemo)(() => {
		if (selectedDate && dailyCategoryStats) return {
			categoryStats: dailyCategoryStats,
			summary: dailyCategoryStats.summary
		};
		return {
			categoryStats: reportData?.categoryStats || {
				expense: [],
				income: []
			},
			summary: reportData?.summary || {
				totalExpense: 0,
				totalIncome: 0,
				balance: 0
			}
		};
	}, [
		selectedDate,
		dailyCategoryStats,
		reportData
	]);
	console.log("[ReportContent] displayData computed:", displayData);
	(0, import_react.useEffect)(() => {
		console.log("[ReportContent Chart] Initializing pie chart...");
		console.log("[ReportContent Chart] chartRef.current:", !!chartRef.current);
		console.log("[ReportContent Chart] reportData:", !!reportData);
		console.log("[ReportContent Chart] viewType:", viewType);
		if (!chartRef.current || viewType !== "chart") {
			console.log("[ReportContent Chart] Cleanup - conditions not met");
			chartInstance.current?.dispose();
			chartInstance.current = null;
			return;
		}
		try {
			console.log("[ReportContent Chart] Creating ECharts instance...");
			if (!chartInstance.current) {
				chartInstance.current = init(chartRef.current);
				console.log("[ReportContent Chart] ECharts instance created");
			}
			console.log("[ReportContent Chart] Preparing pie data...");
			const pieData = [];
			const chartSourceData = displayData.categoryStats;
			if (showExpense) chartSourceData.expense.forEach((item) => {
				const icon = getCategoryEmoji(item.categoryIcon);
				pieData.push({
					name: `${icon} ${item.category}`,
					value: item.amount,
					itemStyle: { color: "#c45c48" }
				});
			});
			if (showIncome) chartSourceData.income.forEach((item) => {
				const icon = getCategoryEmoji(item.categoryIcon);
				pieData.push({
					name: `${icon} ${item.category}`,
					value: item.amount,
					itemStyle: { color: "#4a9c3d" }
				});
			});
			console.log("[ReportContent Chart] Getting chart option...");
			const option = getPixelPieOption(pieData);
			console.log("[ReportContent Chart] Setting option...");
			chartInstance.current.setOption(option, true);
			console.log("[ReportContent Chart] Chart initialized successfully");
		} catch (error) {
			console.error("[ReportContent Chart] ECharts initialization error:", error);
			console.error("[ReportContent Chart] Error details:", {
				message: error.message,
				stack: error.stack,
				name: error.name
			});
			throw error;
		}
		return () => {
			console.log("[ReportContent Chart] Cleanup - unmounting");
			chartInstance.current?.dispose();
			chartInstance.current = null;
		};
	}, [
		displayData,
		viewType,
		showExpense,
		showIncome
	]);
	(0, import_react.useEffect)(() => {
		const handleResize = () => {
			chartInstance.current?.resize();
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	const filteredCategoryStats = (0, import_react.useMemo)(() => {
		const sourceData = displayData.categoryStats;
		console.log("[ReportContent] displayData:", displayData);
		console.log("[ReportContent] showExpense:", showExpense, "showIncome:", showIncome);
		console.log("[ReportContent] sourceData.expense:", sourceData.expense);
		console.log("[ReportContent] sourceData.income:", sourceData.income);
		let stats = [];
		if (showExpense) stats = [...stats, ...sourceData.expense];
		if (showIncome) stats = [...stats, ...sourceData.income];
		if (selectedCategories.length > 0) stats = stats.filter((s) => selectedCategories.includes(s.category));
		const result = stats.sort((a, b) => b.amount - a.amount);
		console.log("[ReportContent] filteredCategoryStats result:", result);
		return result;
	}, [
		displayData,
		showExpense,
		showIncome,
		selectedCategories
	]);
	const allCategoryNames = (0, import_react.useMemo)(() => {
		const names = /* @__PURE__ */ new Set();
		if (displayData.categoryStats.expense) displayData.categoryStats.expense.forEach((s) => names.add(s.category));
		if (displayData.categoryStats.income) displayData.categoryStats.income.forEach((s) => names.add(s.category));
		return Array.from(names);
	}, [displayData]);
	const getDailyData = (0, import_react.useMemo)(() => {
		if (!reportData) return /* @__PURE__ */ new Map();
		const map = /* @__PURE__ */ new Map();
		reportData.dailyStats.forEach((day) => {
			map.set(day.date, day);
		});
		return map;
	}, [reportData]);
	const dateCellRender = (date) => {
		const dateStr = formatDateKey(date);
		const dayData = getDailyData.get(dateStr);
		if (!dayData) return null;
		const hasExpense = dayData.expense > 0;
		const hasIncome = dayData.income > 0;
		const balance = dayData.income - dayData.expense;
		if (!hasExpense && !hasIncome) return null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: ReportContent_module_default.calendarCell,
			children: [
				showExpense && hasExpense && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: ReportContent_module_default.calendarExpense,
					children: ["-", dayData.expense.toFixed(0)]
				}),
				showIncome && hasIncome && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: ReportContent_module_default.calendarIncome,
					children: ["+", dayData.income.toFixed(0)]
				}),
				showBalance && balance !== 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: balance >= 0 ? ReportContent_module_default.calendarIncome : ReportContent_module_default.calendarExpense,
					children: [balance >= 0 ? "+" : "", balance.toFixed(0)]
				})
			]
		});
	};
	const toggleCategoryExpand = async (categoryKey, category, type) => {
		const newExpanded = new Set(expandedCategories);
		if (newExpanded.has(categoryKey)) {
			newExpanded.delete(categoryKey);
			setExpandedCategories(newExpanded);
			return;
		}
		const startOfMonth = currentDate.startOf("month");
		const endOfMonth = currentDate.endOf("month");
		const startDate = startOfMonth.format(DATE_FORMAT.DATE_KEY);
		const endDate = endOfMonth.format(DATE_FORMAT.DATE_KEY);
		let records = [];
		try {
			if (isLoggedIn) records = (await getRecords({
				startDate,
				endDate,
				type
			})).filter((r) => r.category === category);
			else records = getLocalRecords().filter((r) => {
				const recordDate = (0, import_dayjs_min.default)(r.date);
				return r.type === type && r.category === category && recordDate.isAfter(startOfMonth.subtract(1, "day")) && recordDate.isBefore(endOfMonth.add(1, "day"));
			});
		} catch (error) {
			console.error("Load category records error:", error);
			staticMethods.error("加载分类明细失败");
			return;
		}
		records.sort((a, b) => b.amount - a.amount);
		const newCategoryRecords = new Map(categoryRecords);
		newCategoryRecords.set(categoryKey, records);
		setCategoryRecords(newCategoryRecords);
		newExpanded.add(categoryKey);
		setExpandedCategories(newExpanded);
	};
	const handleDateConfirm = (date) => {
		setCurrentDate(date);
		setIsDatePickerVisible(false);
	};
	if (loading && !reportData) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: ReportContent_module_default.loadingContainer,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: ReportContent_module_default.loadingText,
			children: "加载中..."
		})
	});
	if (!reportData) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: ReportContent_module_default.emptyContainer,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { description: "暂无数据" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: ReportContent_module_default.reportContent,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: ReportContent_module_default.monthSelector,
				onClick: () => setIsDatePickerVisible(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: ReportContent_module_default.monthText,
					children: formatDisplayYearMonth(currentDate)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: ReportContent_module_default.arrowDown,
					children: "▼"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: ReportContent_module_default.calendarControls,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						checked: showExpense,
						onChange: (e) => {
							const checked = e.target.checked;
							setShowExpense(checked);
							if (checked && showBalance) setShowBalance(false);
						},
						className: ReportContent_module_default.controlCheckbox,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: ReportContent_module_default.expenseLabel,
							children: "支出"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						checked: showIncome,
						onChange: (e) => {
							const checked = e.target.checked;
							setShowIncome(checked);
							if (checked && showBalance) setShowBalance(false);
						},
						className: ReportContent_module_default.controlCheckbox,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: ReportContent_module_default.incomeLabel,
							children: "收入"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
						checked: showBalance,
						onChange: (e) => {
							const checked = e.target.checked;
							setShowBalance(checked);
							if (checked) {
								setShowExpense(false);
								setShowIncome(false);
							}
						},
						className: ReportContent_module_default.controlCheckbox,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: ReportContent_module_default.balanceLabel,
							children: "结余"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: ReportContent_module_default.calendarSection,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
					value: currentDate,
					mode: calendarMode,
					onChange: (date) => {
						setCurrentDate(date);
						setSelectedDate(date);
					},
					onPanelChange: (date, mode) => {
						setCurrentDate(date);
						setCalendarMode(mode);
					},
					dateCellRender,
					fullscreen: false,
					className: ReportContent_module_default.miniCalendar
				})
			}),
			selectedDate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: ReportContent_module_default.selectedDateBar,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: ReportContent_module_default.selectedDateText,
					children: [formatDisplayFullDate(selectedDate), "数据"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
					type: "text",
					size: "small",
					onClick: () => setSelectedDate(null),
					className: ReportContent_module_default.clearDateBtn,
					children: "查看整月"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: ReportContent_module_default.summaryCards,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: ReportContent_module_default.summaryCard,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: ReportContent_module_default.cardLabel,
							children: "支出"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `${ReportContent_module_default.cardValue} ${ReportContent_module_default.expense}`,
							children: ["¥", displayData.summary.totalExpense.toFixed(2)]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: ReportContent_module_default.summaryCard,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: ReportContent_module_default.cardLabel,
							children: "收入"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `${ReportContent_module_default.cardValue} ${ReportContent_module_default.income}`,
							children: ["¥", displayData.summary.totalIncome.toFixed(2)]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: ReportContent_module_default.summaryCard,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: ReportContent_module_default.cardLabel,
							children: "结余"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `${ReportContent_module_default.cardValue} ${displayData.summary.balance >= 0 ? ReportContent_module_default.income : ReportContent_module_default.expense}`,
							children: ["¥", displayData.summary.balance.toFixed(2)]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: ReportContent_module_default.viewToggle,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Radio.Group, {
					value: viewType,
					onChange: (e) => setViewType(e.target.value),
					buttonStyle: "solid",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio.Button, {
						value: "chart",
						children: "图表"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio.Button, {
						value: "area",
						children: "列表"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$4, {}),
					onClick: () => setIsFilterVisible(true),
					className: ReportContent_module_default.filterBtn,
					children: "筛选"
				})]
			}),
			viewType === "chart" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: ReportContent_module_default.chartView,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: chartRef,
					className: ReportContent_module_default.pieChart,
					style: { height: "300px" }
				})
			}),
			viewType === "area" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: ReportContent_module_default.listView,
				children: filteredCategoryStats.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
					description: showExpense || showIncome ? "暂无数据" : "请选择显示支出或收入",
					className: ReportContent_module_default.listEmpty
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
					dataSource: filteredCategoryStats,
					renderItem: (item) => {
						const categoryKey = `${item.type}-${item.category}`;
						const isExpanded = expandedCategories.has(categoryKey);
						const records = categoryRecords.get(categoryKey) || [];
						const canExpand = item.count > 1;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(List.Item, {
							className: ReportContent_module_default.categoryItem,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: ReportContent_module_default.categoryInfo,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: ReportContent_module_default.categoryIcon,
									children: getCategoryEmoji(item.categoryIcon)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: ReportContent_module_default.categoryDetail,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: ReportContent_module_default.categoryName,
										children: item.category
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: ReportContent_module_default.categoryCount,
										children: [
											item.count,
											"笔",
											canExpand && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
												type: "text",
												size: "small",
												icon: isExpanded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$5, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$6, {}),
												onClick: () => toggleCategoryExpand(categoryKey, item.category, item.type),
												className: ReportContent_module_default.expandBtn
											})
										]
									})]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: ReportContent_module_default.categoryAmount,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: item.type === "expense" ? ReportContent_module_default.expense : ReportContent_module_default.income,
									children: ["¥", item.amount.toFixed(2)]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: ReportContent_module_default.percentage,
									children: [item.percentage.toFixed(1), "%"]
								})]
							})]
						}), isExpanded && records.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: ReportContent_module_default.recordDetailList,
							children: records.map((record) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: ReportContent_module_default.recordDetailItem,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: ReportContent_module_default.recordDetailLeft,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: ReportContent_module_default.recordDetailDate,
										children: (0, import_dayjs_min.default)(record.date).format(DATE_FORMAT.DISPLAY_SHORT_DATE)
									}), record.remark && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: ReportContent_module_default.recordDetailRemark,
										children: record.remark
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `${ReportContent_module_default.recordDetailAmount} ${record.type === "expense" ? ReportContent_module_default.expense : ReportContent_module_default.income}`,
									children: ["¥", record.amount.toFixed(2)]
								})]
							}, record.id))
						})] });
					}
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
				visible: isDatePickerVisible,
				onCancel: () => setIsDatePickerVisible(false),
				onConfirm: handleDateConfirm,
				defaultDate: currentDate,
				defaultMode: "month"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(drawer_default, {
				title: "筛选",
				placement: "right",
				onClose: () => setIsFilterVisible(false),
				open: isFilterVisible,
				width: 300,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: ReportContent_module_default.filterContent,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: ReportContent_module_default.filterSection,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: ReportContent_module_default.filterLabel,
									children: "显示类型"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: showExpense,
									onChange: (e) => setShowExpense(e.target.checked),
									children: "支出"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									checked: showIncome,
									onChange: (e) => setShowIncome(e.target.checked),
									children: "收入"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: ReportContent_module_default.filterSection,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: ReportContent_module_default.filterLabel,
								children: "分类"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox.Group, {
								value: selectedCategories,
								onChange: (values) => setSelectedCategories(values),
								children: allCategoryNames.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
									value: name,
									children: name
								}, name))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
							type: "primary",
							block: true,
							onClick: () => setIsFilterVisible(false),
							className: ReportContent_module_default.confirmBtn,
							children: "确定"
						})
					]
				})
			})
		]
	});
};
var CompareContent_module_default = {
	compareContent: "_compareContent_167xr_6",
	loadingContainer: "_loadingContainer_167xr_19",
	emptyContainer: "_emptyContainer_167xr_20",
	loadingText: "_loadingText_167xr_27",
	monthSelector: "_monthSelector_167xr_33",
	monthBox: "_monthBox_167xr_41",
	monthLabel: "_monthLabel_167xr_57",
	monthValue: "_monthValue_167xr_63",
	swapBtn: "_swapBtn_167xr_70",
	summaryCards: "_summaryCards_167xr_86",
	summaryCard: "_summaryCard_167xr_86",
	cardLabel: "_cardLabel_167xr_106",
	cardValues: "_cardValues_167xr_113",
	baseValue: "_baseValue_167xr_122",
	compareValue: "_compareValue_167xr_123",
	vs: "_vs_167xr_129",
	cardChange: "_cardChange_167xr_133",
	increase: "_increase_167xr_141",
	decrease: "_decrease_167xr_145",
	neutral: "_neutral_167xr_149",
	chartContainer: "_chartContainer_167xr_153",
	compareChart: "_compareChart_167xr_161",
	categoryCompareSection: "_categoryCompareSection_167xr_165",
	sectionTitle: "_sectionTitle_167xr_173",
	categoryList: "_categoryList_167xr_181",
	categoryItem: "_categoryItem_167xr_187",
	categoryInfo: "_categoryInfo_167xr_196",
	categoryIcon: "_categoryIcon_167xr_202",
	categoryDetail: "_categoryDetail_167xr_206",
	categoryName: "_categoryName_167xr_212",
	categoryType: "_categoryType_167xr_219",
	categoryValues: "_categoryValues_167xr_225",
	valueRow: "_valueRow_167xr_232",
	baseAmount: "_baseAmount_167xr_238",
	compareAmount: "_compareAmount_167xr_239",
	arrow: "_arrow_167xr_243",
	diffRow: "_diffRow_167xr_248"
};
//#endregion
//#region src/pages/Statistics/CompareContent.tsx
/**
* 两月对比内容组件
*/
var CompareContent = () => {
	const { isLoggedIn } = useAuth();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [baseMonth, setBaseMonth] = (0, import_react.useState)((0, import_dayjs_min.default)());
	const [compareMonth, setCompareMonth] = (0, import_react.useState)((0, import_dayjs_min.default)().subtract(1, "month"));
	const [datePickerVisible, setDatePickerVisible] = (0, import_react.useState)(false);
	const [datePickerTarget, setDatePickerTarget] = (0, import_react.useState)("base");
	const [baseData, setBaseData] = (0, import_react.useState)(null);
	const [compareData, setCompareData] = (0, import_react.useState)(null);
	const chartRef = (0, import_react.useRef)(null);
	const chartInstance = (0, import_react.useRef)(null);
	const loadMonthData = async (date) => {
		const year = date.year();
		const month = date.month() + 1;
		const startOfMonth = date.startOf("month");
		const endOfMonth = date.endOf("month");
		const startDate = startOfMonth.format(DATE_FORMAT.DATE_KEY);
		const endDate = endOfMonth.format(DATE_FORMAT.DATE_KEY);
		let reportData = null;
		let records = [];
		if (isLoggedIn) try {
			reportData = await getReportData(year, month);
			records = await getRecords({
				startDate,
				endDate
			});
		} catch {
			staticMethods.error("加载数据失败，请重试");
		}
		else {
			const monthRecords = getLocalRecords().filter((r) => {
				const recordDate = (0, import_dayjs_min.default)(r.date);
				return recordDate.isAfter(startOfMonth.subtract(1, "day")) && recordDate.isBefore(endOfMonth.add(1, "day"));
			});
			const totalExpense = monthRecords.filter((r) => r.type === "expense").reduce((sum, r) => sum + r.amount, 0);
			const totalIncome = monthRecords.filter((r) => r.type === "income").reduce((sum, r) => sum + r.amount, 0);
			const categoryMap = /* @__PURE__ */ new Map();
			monthRecords.forEach((r) => {
				const key = `${r.type}-${r.category}`;
				if (!categoryMap.has(key)) categoryMap.set(key, {
					category: r.category,
					categoryIcon: r.categoryIcon,
					type: r.type,
					amount: 0,
					percentage: 0,
					count: 0
				});
				const stats = categoryMap.get(key);
				stats.amount += r.amount;
				stats.count += 1;
			});
			categoryMap.forEach((stats) => {
				const total = stats.type === "expense" ? totalExpense : totalIncome;
				stats.percentage = total > 0 ? stats.amount / total * 100 : 0;
			});
			const categoryStats = {
				expense: Array.from(categoryMap.values()).filter((s) => s.type === "expense"),
				income: Array.from(categoryMap.values()).filter((s) => s.type === "income")
			};
			categoryStats.expense.sort((a, b) => b.amount - a.amount);
			categoryStats.income.sort((a, b) => b.amount - a.amount);
			const dailyStatsMap = /* @__PURE__ */ new Map();
			for (let i = 1; i <= date.daysInMonth(); i++) {
				const dateStr = date.format(`${DATE_FORMAT.MONTH_KEY}-${String(i).padStart(2, "0")}`);
				dailyStatsMap.set(dateStr, {
					date: dateStr,
					expense: 0,
					income: 0
				});
			}
			monthRecords.forEach((r) => {
				const dateStr = formatDateKey(r.date);
				const stats = dailyStatsMap.get(dateStr);
				if (stats) if (r.type === "expense") stats.expense += r.amount;
				else stats.income += r.amount;
			});
			reportData = {
				period: {
					startDate: startOfMonth.format(DATE_FORMAT.DATE_KEY),
					endDate: endOfMonth.format(DATE_FORMAT.DATE_KEY)
				},
				summary: {
					totalExpense,
					totalIncome,
					balance: totalIncome - totalExpense
				},
				dailyStats: Array.from(dailyStatsMap.values()),
				categoryStats
			};
			records = monthRecords;
		}
		return {
			date,
			reportData,
			records
		};
	};
	const loadCompareData = async () => {
		setLoading(true);
		try {
			const [base, compare] = await Promise.all([loadMonthData(baseMonth), loadMonthData(compareMonth)]);
			setBaseData(base);
			setCompareData(compare);
		} catch (error) {
			console.error("Load compare data error:", error);
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		loadCompareData();
	}, [
		baseMonth,
		compareMonth,
		isLoggedIn
	]);
	const compareResult = (0, import_react.useMemo)(() => {
		if (!baseData?.reportData || !compareData?.reportData) return null;
		const base = baseData.reportData.summary;
		const compare = compareData.reportData.summary;
		return {
			expense: {
				base: base.totalExpense,
				compare: compare.totalExpense,
				diff: base.totalExpense - compare.totalExpense,
				diffPercent: compare.totalExpense > 0 ? (base.totalExpense - compare.totalExpense) / compare.totalExpense * 100 : 0
			},
			income: {
				base: base.totalIncome,
				compare: compare.totalIncome,
				diff: base.totalIncome - compare.totalIncome,
				diffPercent: compare.totalIncome > 0 ? (base.totalIncome - compare.totalIncome) / compare.totalIncome * 100 : 0
			},
			balance: {
				base: base.balance,
				compare: compare.balance,
				diff: base.balance - compare.balance,
				diffPercent: compare.balance !== 0 ? (base.balance - compare.balance) / Math.abs(compare.balance) * 100 : 0
			}
		};
	}, [baseData, compareData]);
	const categoryCompare = (0, import_react.useMemo)(() => {
		if (!baseData?.reportData || !compareData?.reportData) return [];
		const baseCategories = /* @__PURE__ */ new Map();
		const compareCategories = /* @__PURE__ */ new Map();
		[...baseData.reportData.categoryStats.expense, ...baseData.reportData.categoryStats.income].forEach((item) => baseCategories.set(`${item.type}-${item.category}`, item));
		[...compareData.reportData.categoryStats.expense, ...compareData.reportData.categoryStats.income].forEach((item) => compareCategories.set(`${item.type}-${item.category}`, item));
		const allKeys = new Set([...baseCategories.keys(), ...compareCategories.keys()]);
		const result = [];
		allKeys.forEach((key) => {
			const baseItem = baseCategories.get(key);
			const compareItem = compareCategories.get(key);
			const baseAmount = baseItem?.amount || 0;
			const compareAmount = compareItem?.amount || 0;
			const diff = baseAmount - compareAmount;
			result.push({
				category: baseItem?.category || compareItem?.category || "",
				categoryIcon: getCategoryEmoji(baseItem?.categoryIcon || compareItem?.categoryIcon || "📦"),
				type: baseItem?.type || compareItem?.type,
				baseAmount,
				compareAmount,
				diff,
				diffPercent: compareAmount > 0 ? diff / compareAmount * 100 : 0
			});
		});
		return result.sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));
	}, [baseData, compareData]);
	(0, import_react.useEffect)(() => {
		if (!chartRef.current || !compareResult) {
			chartInstance.current?.dispose();
			chartInstance.current = null;
			return;
		}
		if (!chartInstance.current) chartInstance.current = init(chartRef.current);
		const option = {
			tooltip: {
				trigger: "axis",
				axisPointer: { type: "shadow" }
			},
			legend: {
				data: [formatDisplayYearMonth(baseMonth), formatDisplayYearMonth(compareMonth)],
				bottom: 0,
				textStyle: { fontFamily: "PixelFont, monospace" }
			},
			grid: {
				left: "3%",
				right: "4%",
				bottom: "15%",
				top: "10%",
				containLabel: true
			},
			xAxis: {
				type: "category",
				data: [
					"支出",
					"收入",
					"结余"
				],
				boundaryGap: true,
				axisTick: { alignWithLabel: true },
				axisLabel: { fontFamily: "PixelFont, monospace" }
			},
			yAxis: {
				type: "value",
				axisLabel: {
					formatter: (value) => `¥${value.toFixed(0)}`,
					fontFamily: "PixelFont, monospace"
				}
			},
			series: [{
				name: formatDisplayYearMonth(baseMonth),
				type: "bar",
				data: [
					compareResult.expense.base,
					compareResult.income.base,
					compareResult.balance.base
				],
				itemStyle: { color: "#c45c48" }
			}, {
				name: formatDisplayYearMonth(compareMonth),
				type: "bar",
				data: [
					compareResult.expense.compare,
					compareResult.income.compare,
					compareResult.balance.compare
				],
				itemStyle: { color: "#8b7355" }
			}]
		};
		chartInstance.current.setOption(option, true);
		return () => {
			chartInstance.current?.dispose();
			chartInstance.current = null;
		};
	}, [
		compareResult,
		baseMonth,
		compareMonth
	]);
	(0, import_react.useEffect)(() => {
		const handleResize = () => {
			chartInstance.current?.resize();
		};
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);
	const openDatePicker = (target) => {
		setDatePickerTarget(target);
		setDatePickerVisible(true);
	};
	const handleDateConfirm = (date) => {
		if (datePickerTarget === "base") setBaseMonth(date);
		else setCompareMonth(date);
		setDatePickerVisible(false);
	};
	const swapMonths = () => {
		const temp = baseMonth;
		setBaseMonth(compareMonth);
		setCompareMonth(temp);
	};
	const formatChange = (diff, diffPercent) => {
		const sign = diff > 0 ? "+" : "";
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: diff > 0 ? CompareContent_module_default.increase : diff < 0 ? CompareContent_module_default.decrease : CompareContent_module_default.neutral,
			children: [
				sign,
				diff.toFixed(2),
				" (",
				sign,
				diffPercent.toFixed(1),
				"%)"
			]
		});
	};
	if (loading && (!baseData || !compareData)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: CompareContent_module_default.loadingContainer,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: CompareContent_module_default.loadingText,
			children: "加载中..."
		})
	});
	if (!compareResult) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: CompareContent_module_default.emptyContainer,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { description: "暂无数据" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: CompareContent_module_default.compareContent,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: CompareContent_module_default.monthSelector,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: CompareContent_module_default.monthBox,
						onClick: () => openDatePicker("base"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: CompareContent_module_default.monthLabel,
							children: "基准月"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: CompareContent_module_default.monthValue,
							children: formatDisplayYearMonth(baseMonth)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
						type: "text",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$7, {}),
						onClick: swapMonths,
						className: CompareContent_module_default.swapBtn
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: CompareContent_module_default.monthBox,
						onClick: () => openDatePicker("compare"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: CompareContent_module_default.monthLabel,
							children: "对比月"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: CompareContent_module_default.monthValue,
							children: formatDisplayYearMonth(compareMonth)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: CompareContent_module_default.summaryCards,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: CompareContent_module_default.summaryCard,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: CompareContent_module_default.cardLabel,
								children: "支出对比"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: CompareContent_module_default.cardValues,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: CompareContent_module_default.baseValue,
										children: ["¥", compareResult.expense.base.toFixed(2)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: CompareContent_module_default.vs,
										children: "vs"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: CompareContent_module_default.compareValue,
										children: ["¥", compareResult.expense.compare.toFixed(2)]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: CompareContent_module_default.cardChange,
								children: formatChange(compareResult.expense.diff, compareResult.expense.diffPercent)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: CompareContent_module_default.summaryCard,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: CompareContent_module_default.cardLabel,
								children: "收入对比"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: CompareContent_module_default.cardValues,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: CompareContent_module_default.baseValue,
										children: ["¥", compareResult.income.base.toFixed(2)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: CompareContent_module_default.vs,
										children: "vs"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: CompareContent_module_default.compareValue,
										children: ["¥", compareResult.income.compare.toFixed(2)]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: CompareContent_module_default.cardChange,
								children: formatChange(compareResult.income.diff, compareResult.income.diffPercent)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: CompareContent_module_default.summaryCard,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: CompareContent_module_default.cardLabel,
								children: "结余对比"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: CompareContent_module_default.cardValues,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: CompareContent_module_default.baseValue,
										children: ["¥", compareResult.balance.base.toFixed(2)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: CompareContent_module_default.vs,
										children: "vs"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: CompareContent_module_default.compareValue,
										children: ["¥", compareResult.balance.compare.toFixed(2)]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: CompareContent_module_default.cardChange,
								children: formatChange(compareResult.balance.diff, compareResult.balance.diffPercent)
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: CompareContent_module_default.chartContainer,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					ref: chartRef,
					className: CompareContent_module_default.compareChart,
					style: { height: "250px" }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: CompareContent_module_default.categoryCompareSection,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: CompareContent_module_default.sectionTitle,
					children: "分类变化排行"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: CompareContent_module_default.categoryList,
					children: categoryCompare.slice(0, 10).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: CompareContent_module_default.categoryItem,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: CompareContent_module_default.categoryInfo,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: CompareContent_module_default.categoryIcon,
								children: getCategoryEmoji(item.categoryIcon)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: CompareContent_module_default.categoryDetail,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: CompareContent_module_default.categoryName,
									children: item.category
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: CompareContent_module_default.categoryType,
									children: item.type === "expense" ? "支出" : "收入"
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: CompareContent_module_default.categoryValues,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: CompareContent_module_default.valueRow,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: CompareContent_module_default.baseAmount,
										children: ["¥", item.baseAmount.toFixed(2)]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: CompareContent_module_default.arrow,
										children: "→"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: CompareContent_module_default.compareAmount,
										children: ["¥", item.compareAmount.toFixed(2)]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: CompareContent_module_default.diffRow,
								children: formatChange(item.diff, item.diffPercent)
							})]
						})]
					}, `${item.type}-${item.category}`))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
				visible: datePickerVisible,
				onCancel: () => setDatePickerVisible(false),
				onConfirm: handleDateConfirm,
				defaultDate: datePickerTarget === "base" ? baseMonth : compareMonth,
				defaultMode: "month"
			})
		]
	});
};
var index_module_default = {
	statisticsPage: "_statisticsPage_gwtnu_6",
	tabHeader: "_tabHeader_gwtnu_16",
	content: "_content_gwtnu_45"
};
//#endregion
//#region src/pages/Statistics/index.tsx
/**
* 统计页面 - 包含账单和报表两个Tab
*/
var Statistics = () => {
	const { t } = useTranslation();
	const [activeTab, setActiveTab] = (0, import_react.useState)("bill");
	const items = [
		{
			key: "bill",
			label: t("statistics.bill", "账单")
		},
		{
			key: "report",
			label: t("statistics.report", "报表")
		},
		{
			key: "compare",
			label: t("statistics.compare", "对比")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: index_module_default.statisticsPage,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: index_module_default.tabHeader,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tabs, {
					activeKey: activeTab,
					onChange: setActiveTab,
					items,
					centered: true,
					className: index_module_default.stardewTabs
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default.content,
				children: [
					activeTab === "bill" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BillContent, {}),
					activeTab === "report" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReportContent, {}),
					activeTab === "compare" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CompareContent, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})
		]
	});
};
//#endregion
export { Statistics as default };

//# sourceMappingURL=Statistics-DO2RjHHm.js.map