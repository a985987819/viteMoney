import { r as __toESM } from "./rolldown-runtime-DZjNq3_i.js";
import { Ct as RefIcon, X as RefIcon$4, Y as RefIcon$2, ar as require_react, b as RefIcon$3, mt as RefIcon$1 } from "./vendor-others-DR5UvigV.js";
import { g as useTranslation, n as require_jsx_runtime } from "./vendor-react-BwfiEprq.js";
import { O as Empty, T as button_default, a as Tag, b as Card, d as List, f as Spin, g as DatePicker, l as Modal, s as progress_default, u as staticMethods, v as TypedInputNumber, w as require_dayjs_min } from "./vendor-ui-BCl3WSDB.js";
import { c as deleteLocalBudget, g as getLocalBudgets, h as getLocalBudget, j as setLocalBudget, v as getLocalRecords } from "./storage-D-qjG_21.js";
import { i as http, n as useAuth } from "./useAuth-CcfI1Ahe.js";
import { t as PageHeader } from "./PageHeader-C0Ff_keA.js";
//#region src/api/budget.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min(), 1);
var getCurrentBudget = () => {
	return http.get("/budgets/current");
};
var setBudget = (params) => {
	return http.post("/budgets", params);
};
var deleteBudget = (year, month) => {
	return http.delete("/budgets", { params: {
		year,
		month
	} });
};
var getBudgetStats = () => {
	return http.get("/budgets/stats");
};
var getRecentBudgets = (months = 6) => {
	return http.get("/budgets/recent", { params: { months } });
};
var index_module_default = {
	budgetPage: "_budgetPage_ueygc_6",
	loadingContainer: "_loadingContainer_ueygc_17",
	addBtn: "_addBtn_ueygc_28",
	setBudgetBtn: "_setBudgetBtn_ueygc_29",
	content: "_content_ueygc_48",
	currentBudgetCard: "_currentBudgetCard_ueygc_56",
	emptyCard: "_emptyCard_ueygc_57",
	statsCard: "_statsCard_ueygc_58",
	historyCard: "_historyCard_ueygc_59",
	budgetHeader: "_budgetHeader_ueygc_108",
	budgetTitle: "_budgetTitle_ueygc_116",
	budgetProgress: "_budgetProgress_ueygc_130",
	progressText: "_progressText_ueygc_134",
	budgetStats: "_budgetStats_ueygc_142",
	compareStats: "_compareStats_ueygc_143",
	statItem: "_statItem_ueygc_156",
	compareItem: "_compareItem_ueygc_157",
	statLabel: "_statLabel_ueygc_165",
	compareLabel: "_compareLabel_ueygc_166",
	statValue: "_statValue_ueygc_173",
	compareValue: "_compareValue_ueygc_174",
	expense: "_expense_ueygc_181",
	remaining: "_remaining_ueygc_185",
	budgetListItem: "_budgetListItem_ueygc_193",
	budgetItemTitle: "_budgetItemTitle_ueygc_202",
	budgetItemDesc: "_budgetItemDesc_ueygc_211",
	budgetItemStats: "_budgetItemStats_ueygc_221",
	modalContent: "_modalContent_ueygc_228",
	formItem: "_formItem_ueygc_232"
};
//#endregion
//#region src/pages/Budget/index.tsx
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_BUDGET_AMOUNT = 1e3;
/**
* 预算管理页面
*/
var Budget = () => {
	const { t } = useTranslation();
	const { isLoggedIn } = useAuth();
	const [currentBudget, setCurrentBudget] = (0, import_react.useState)(null);
	const [budgetStats, setBudgetStats] = (0, import_react.useState)(null);
	const [recentBudgets, setRecentBudgets] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [selectedDate, setSelectedDate] = (0, import_react.useState)((0, import_dayjs_min.default)());
	const [setBudgetModalVisible, setSetBudgetModalVisible] = (0, import_react.useState)(false);
	const [budgetAmount, setBudgetAmount] = (0, import_react.useState)(null);
	const [settingLoading, setSettingLoading] = (0, import_react.useState)(false);
	const calculateLocalSpent = (year, month) => {
		return getLocalRecords().filter((r) => {
			const recordDate = (0, import_dayjs_min.default)(r.date);
			return recordDate.year() === year && recordDate.month() + 1 === month && r.type === "expense";
		}).reduce((sum, r) => sum + Number(r.amount), 0);
	};
	const localBudgetToResponse = (local) => {
		const spent = calculateLocalSpent(local.year, local.month);
		const remaining = local.amount - spent;
		const percentage = local.amount > 0 ? spent / local.amount * 100 : 0;
		return {
			id: local.id || `local_${local.year}_${local.month}`,
			...local,
			spent,
			remaining,
			percentage
		};
	};
	const loadData = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			if (isLoggedIn) {
				const [currentRes, statsRes, recentRes] = await Promise.all([
					getCurrentBudget(),
					getBudgetStats(),
					getRecentBudgets(6)
				]);
				setCurrentBudget(currentRes.budget);
				setBudgetStats(statsRes);
				setRecentBudgets(recentRes.budgets);
			} else {
				const now = (0, import_dayjs_min.default)();
				const currentYear = now.year();
				const currentMonth = now.month() + 1;
				const localCurrentBudget = getLocalBudget(currentYear, currentMonth);
				if (localCurrentBudget) setCurrentBudget(localBudgetToResponse(localCurrentBudget));
				else {
					const defaultBudget = {
						year: currentYear,
						month: currentMonth,
						amount: DEFAULT_BUDGET_AMOUNT
					};
					setLocalBudget(defaultBudget);
					setCurrentBudget(localBudgetToResponse(defaultBudget));
				}
				setRecentBudgets(getLocalBudgets().sort((a, b) => {
					if (a.year !== b.year) return b.year - a.year;
					return b.month - a.month;
				}).slice(0, 6).map(localBudgetToResponse));
				const currentSpent = calculateLocalSpent(currentYear, currentMonth);
				const lastMonthSpent = calculateLocalSpent(currentMonth === 1 ? currentYear - 1 : currentYear, currentMonth === 1 ? 12 : currentMonth - 1);
				setBudgetStats({
					currentMonth: localBudgetToResponse({
						year: currentYear,
						month: currentMonth,
						amount: localCurrentBudget?.amount || DEFAULT_BUDGET_AMOUNT
					}),
					lastMonth: lastMonthSpent > 0 ? {
						id: "last",
						year: currentMonth === 1 ? currentYear - 1 : currentYear,
						month: currentMonth === 1 ? 12 : currentMonth - 1,
						amount: 0,
						spent: lastMonthSpent,
						remaining: -lastMonthSpent,
						percentage: 100
					} : null,
					averageSpent: currentSpent
				});
			}
		} catch (error) {
			staticMethods.error(t("common.loadFailed"));
			console.error("Load budget data error:", error);
		} finally {
			setLoading(false);
		}
	}, [t, isLoggedIn]);
	(0, import_react.useEffect)(() => {
		loadData();
	}, [loadData]);
	const handleSetBudget = async () => {
		if (budgetAmount === null || budgetAmount < 0) {
			staticMethods.error("请输入有效的预算金额");
			return;
		}
		setSettingLoading(true);
		try {
			if (isLoggedIn) await setBudget({
				amount: budgetAmount,
				year: selectedDate.year(),
				month: selectedDate.month() + 1
			});
			else setLocalBudget({
				year: selectedDate.year(),
				month: selectedDate.month() + 1,
				amount: budgetAmount
			});
			staticMethods.success("预算设置成功");
			setSetBudgetModalVisible(false);
			setBudgetAmount(null);
			loadData();
		} catch (error) {
			staticMethods.error("预算设置失败");
			console.error("Set budget error:", error);
		} finally {
			setSettingLoading(false);
		}
	};
	const handleDeleteBudget = (year, month) => {
		Modal.confirm({
			title: "确认删除",
			content: `确定要删除 ${year}年${month}月 的预算吗？`,
			okType: "danger",
			onOk: async () => {
				try {
					if (isLoggedIn) await deleteBudget(year, month);
					else deleteLocalBudget(year, month);
					staticMethods.success("预算删除成功");
					loadData();
				} catch (error) {
					staticMethods.error("预算删除失败");
					console.error("Delete budget error:", error);
				}
			}
		});
	};
	const openSetBudgetModal = (budget) => {
		if (budget) {
			setSelectedDate((0, import_dayjs_min.default)().year(budget.year).month(budget.month - 1));
			setBudgetAmount(budget.amount);
		} else {
			setSelectedDate((0, import_dayjs_min.default)());
			setBudgetAmount(null);
		}
		setSetBudgetModalVisible(true);
	};
	const getProgressColor = (percentage) => {
		if (percentage >= 100) return "#c45c48";
		if (percentage >= 80) return "#e8a838";
		return "#4a9c3d";
	};
	const getStatusTag = (percentage) => {
		if (percentage >= 100) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			color: "error",
			children: "超支"
		});
		if (percentage >= 80) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			color: "warning",
			children: "即将超支"
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
			color: "success",
			children: "正常"
		});
	};
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: index_module_default.loadingContainer,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spin, { size: "large" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: index_module_default.budgetPage,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: t("profile.budget", "预算管理"),
				backPath: "/profile",
				rightContent: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
					type: "primary",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, {}),
					onClick: () => openSetBudgetModal(),
					className: index_module_default.addBtn,
					children: "设置预算"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default.content,
				children: [
					currentBudget ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: index_module_default.currentBudgetCard,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.budgetHeader,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: index_module_default.budgetTitle,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$1, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											currentBudget.year,
											"年",
											currentBudget.month,
											"月预算"
										] }),
										getStatusTag(currentBudget.percentage)
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
									size: "small",
									type: "text",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$2, {}),
									onClick: () => openSetBudgetModal(currentBudget)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.budgetProgress,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(progress_default, {
									percent: Math.min(currentBudget.percentage, 100),
									strokeColor: getProgressColor(currentBudget.percentage),
									trailColor: "rgba(139, 90, 43, 0.2)",
									strokeWidth: 12,
									showInfo: false
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: index_module_default.progressText,
									children: [
										"已使用 ",
										currentBudget.percentage.toFixed(1),
										"%"
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.budgetStats,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: index_module_default.statItem,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: index_module_default.statLabel,
											children: "预算总额"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: index_module_default.statValue,
											children: ["¥", currentBudget.amount.toFixed(2)]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: index_module_default.statItem,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: index_module_default.statLabel,
											children: "已支出"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `${index_module_default.statValue} ${index_module_default.expense}`,
											children: ["¥", currentBudget.spent.toFixed(2)]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: index_module_default.statItem,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: index_module_default.statLabel,
											children: "剩余"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `${index_module_default.statValue} ${index_module_default.remaining}`,
											children: ["¥", currentBudget.remaining.toFixed(2)]
										})]
									})
								]
							})
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: index_module_default.emptyCard,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
							description: "本月尚未设置预算",
							image: Empty.PRESENTED_IMAGE_SIMPLE
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
							type: "primary",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, {}),
							onClick: () => openSetBudgetModal(),
							className: index_module_default.setBudgetBtn,
							children: "设置本月预算"
						})]
					}),
					budgetStats && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: index_module_default.statsCard,
						title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$3, {}), " 预算统计"] }),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.compareStats,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.compareItem,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default.compareLabel,
									children: "上月支出"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default.compareValue,
									children: budgetStats.lastMonth ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: ["¥", budgetStats.lastMonth.spent.toFixed(2)] }) : "-"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.compareItem,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default.compareLabel,
									children: "平均月支出"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: index_module_default.compareValue,
									children: ["¥", budgetStats.averageSpent.toFixed(2)]
								})]
							})]
						})
					}),
					recentBudgets.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: index_module_default.historyCard,
						title: "历史预算",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
							dataSource: recentBudgets,
							renderItem: (budget) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List.Item, {
								className: index_module_default.budgetListItem,
								actions: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
									type: "text",
									size: "small",
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$2, {}),
									onClick: () => openSetBudgetModal(budget)
								}, "edit"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
									type: "text",
									size: "small",
									danger: true,
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$4, {}),
									onClick: () => handleDeleteBudget(budget.year, budget.month)
								}, "delete")],
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List.Item.Meta, {
									title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: index_module_default.budgetItemTitle,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											budget.year,
											"年",
											budget.month,
											"月"
										] }), getStatusTag(budget.percentage)]
									}),
									description: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: index_module_default.budgetItemDesc,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(progress_default, {
											percent: Math.min(budget.percentage, 100),
											strokeColor: getProgressColor(budget.percentage),
											trailColor: "rgba(139, 90, 43, 0.2)",
											size: "small",
											showInfo: false
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: index_module_default.budgetItemStats,
											children: [
												"¥",
												budget.spent.toFixed(0),
												" / ¥",
												budget.amount.toFixed(0)
											]
										})]
									})
								})
							})
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: "设置预算",
				open: setBudgetModalVisible,
				onCancel: () => {
					setSetBudgetModalVisible(false);
					setBudgetAmount(null);
				},
				onOk: handleSetBudget,
				confirmLoading: settingLoading,
				okText: "确定",
				cancelText: "取消",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default.modalContent,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.formItem,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "选择月份" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
							picker: "month",
							value: selectedDate,
							onChange: (date) => date && setSelectedDate(date),
							style: { width: "100%" }
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.formItem,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { children: "预算金额" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypedInputNumber, {
							prefix: "¥",
							min: 0,
							precision: 2,
							value: budgetAmount,
							onChange: setBudgetAmount,
							style: { width: "100%" },
							placeholder: "请输入预算金额"
						})]
					})]
				})
			})
		]
	});
};
//#endregion
export { Budget as default };

//# sourceMappingURL=Budget-nriRcgml.js.map