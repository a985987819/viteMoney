import { r as __toESM } from "./rolldown-runtime-DZjNq3_i.js";
import { Q as RefIcon, ar as require_react, c as RefIcon$3, d as RefIcon$2, f as RefIcon$1 } from "./vendor-others-DR5UvigV.js";
import { d as useNavigate, n as require_jsx_runtime } from "./vendor-react-BwfiEprq.js";
import { O as Empty, T as button_default, a as Tag, l as Modal, m as Form, s as progress_default, u as staticMethods, v as TypedInputNumber, w as require_dayjs_min } from "./vendor-ui-BCl3WSDB.js";
import { H as DATE_FORMAT, et as nowISO } from "./storage-D-qjG_21.js";
import { n as useAuth } from "./useAuth-CcfI1Ahe.js";
import { a as BottomNav } from "./index-BP4F2dWk.js";
import { a as getLocalSavingsPlans, i as getLocalDeposits, n as getActiveSavingsPlan, o as saveLocalDeposit } from "./savings-Cyt6y-yF.js";
//#region src/pages/SavingsOperate/index.module.scss
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min(), 1);
var index_module_default = {
	pageContainer: "_pageContainer_1owqq_6",
	summarySection: "_summarySection_1owqq_17",
	headerTitle: "_headerTitle_1owqq_26",
	summaryCard: "_summaryCard_1owqq_34",
	planCard: "_planCard_1owqq_35",
	actionSection: "_actionSection_1owqq_36",
	historySection: "_historySection_1owqq_37",
	emptyPanel: "_emptyPanel_1owqq_38",
	offlineHint: "_offlineHint_1owqq_63",
	summaryLabel: "_summaryLabel_1owqq_78",
	summaryMeta: "_summaryMeta_1owqq_79",
	planDate: "_planDate_1owqq_80",
	amountCard: "_amountCard_1owqq_81",
	historyDate: "_historyDate_1owqq_82",
	historyType: "_historyType_1owqq_83",
	historyEmpty: "_historyEmpty_1owqq_84",
	summaryValue: "_summaryValue_1owqq_88",
	planName: "_planName_1owqq_89",
	historyAmount: "_historyAmount_1owqq_91",
	sectionTitle: "_sectionTitle_1owqq_92",
	contentSection: "_contentSection_1owqq_102",
	primaryButton: "_primaryButton_1owqq_116",
	progressWrap: "_progressWrap_1owqq_138",
	planHeader: "_planHeader_1owqq_142",
	historyHeader: "_historyHeader_1owqq_143",
	amountGrid: "_amountGrid_1owqq_156",
	historyItem: "_historyItem_1owqq_163",
	actionGrid: "_actionGrid_1owqq_187",
	actionCard: "_actionCard_1owqq_193",
	secondaryButton: "_secondaryButton_1owqq_209",
	historyList: "_historyList_1owqq_213"
};
//#endregion
//#region src/pages/SavingsOperate/index.tsx
var import_jsx_runtime = require_jsx_runtime();
var SavingsOperate = () => {
	const navigate = useNavigate();
	const { isLoggedIn } = useAuth();
	const [currentPlan, setCurrentPlan] = (0, import_react.useState)(() => getActiveSavingsPlan());
	const [recentDeposits, setRecentDeposits] = (0, import_react.useState)(() => {
		const plan = getActiveSavingsPlan();
		return plan ? getLocalDeposits(plan.id).slice(-5).reverse() : [];
	});
	const [manualDepositVisible, setManualDepositVisible] = (0, import_react.useState)(false);
	const [manualForm] = Form.useForm();
	const loadCurrentPlan = (0, import_react.useCallback)(() => {
		const plan = getActiveSavingsPlan();
		setCurrentPlan(plan);
		setRecentDeposits(plan ? getLocalDeposits(plan.id).slice(-5).reverse() : []);
	}, []);
	const totalSaved = (0, import_react.useMemo)(() => getLocalSavingsPlans().reduce((sum, plan) => sum + plan.savedAmount, 0), []);
	const totalTarget = (0, import_react.useMemo)(() => getLocalSavingsPlans().reduce((sum, plan) => sum + plan.targetAmount, 0), []);
	const handleDeposit = (type, amount) => {
		if (!currentPlan) {
			staticMethods.warning("请先去攒钱计划管理页打开一个计划");
			return;
		}
		if (type === "manual") {
			setManualDepositVisible(true);
			return;
		}
		const suggestedAmount = type === "average" ? currentPlan.dailyAverage : currentPlan.dailyAverage * (.8 + Math.random() * .4);
		const finalAmount = amount ?? suggestedAmount;
		if (!finalAmount || finalAmount <= 0) {
			staticMethods.warning("请输入有效金额");
			return;
		}
		saveLocalDeposit({
			id: `deposit_${Date.now()}`,
			planId: currentPlan.id,
			amount: Number(finalAmount.toFixed(2)),
			type,
			createdAt: nowISO()
		});
		loadCurrentPlan();
		staticMethods.success("攒钱成功");
	};
	const progress = currentPlan?.percentage ?? 0;
	const randomAmount = (0, import_react.useMemo)(() => {
		if (!currentPlan) return 0;
		const factor = .8 + (0, import_dayjs_min.default)().valueOf() % 1e3 / 1e3 * .4;
		return Number((currentPlan.dailyAverage * factor).toFixed(2));
	}, [currentPlan]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: index_module_default.pageContainer,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: index_module_default.summarySection,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default.summaryCard,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.summaryLabel,
							children: "全部计划已攒"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.summaryValue,
							children: ["￥", totalSaved.toFixed(2)]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.summaryMeta,
							children: ["总目标 ￥", totalTarget.toFixed(2)]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default.contentSection,
				children: [!isLoggedIn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: index_module_default.offlineHint,
					children: "💾 本地模式：数据保存在本机，可在「我的 → 数据管理」中定期备份"
				}), !currentPlan ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default.emptyPanel,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { description: "还没有打开中的攒钱计划" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
						type: "primary",
						className: index_module_default.primaryButton,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, {}),
						onClick: () => navigate("/savings-manage"),
						children: "去打开一个计划"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: index_module_default.planCard,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.progressWrap,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(progress_default, {
									percent: Number(progress.toFixed(1)),
									strokeColor: progress >= 100 ? "#52c41a" : "#4a90e2"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.planHeader,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default.planName,
									children: currentPlan.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: index_module_default.planDate,
									children: [
										currentPlan.startDate,
										" 至 ",
										currentPlan.endDate
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
									color: progress >= 100 ? "success" : "processing",
									children: progress >= 100 ? "已完成" : "进行中"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.amountGrid,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: index_module_default.amountCard,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "已攒金额" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["￥", currentPlan.savedAmount.toFixed(2)] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: index_module_default.amountCard,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "目标金额" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["￥", currentPlan.targetAmount.toFixed(2)] })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: index_module_default.amountCard,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "日均建议" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["￥", currentPlan.dailyAverage.toFixed(2)] })]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: index_module_default.actionSection,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.sectionTitle,
							children: "今日攒钱行动"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.actionGrid,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: index_module_default.actionCard,
									onClick: () => handleDeposit("average"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$1, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "平均攒钱" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["￥", currentPlan.dailyAverage.toFixed(2)] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: index_module_default.actionCard,
									onClick: () => handleDeposit("random"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$2, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "随机攒钱" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["￥", randomAmount.toFixed(2)] })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: index_module_default.actionCard,
									onClick: () => handleDeposit("manual"),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$3, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "主动攒钱" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "手动输入" })
									]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: index_module_default.historySection,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.historyHeader,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.sectionTitle,
								children: "最近记录"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
								className: index_module_default.secondaryButton,
								onClick: () => navigate("/savings-manage"),
								children: "管理计划"
							})]
						}), recentDeposits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.historyEmpty,
							children: "还没有攒钱记录，先完成上面的一个行动吧。"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.historyList,
							children: recentDeposits.map((deposit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.historyItem,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default.historyType,
									children: deposit.type === "average" ? "平均攒钱" : deposit.type === "random" ? "随机攒钱" : "主动攒钱"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default.historyDate,
									children: (0, import_dayjs_min.default)(deposit.createdAt).format(DATE_FORMAT.DATETIME_SHORT)
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: index_module_default.historyAmount,
									children: ["+￥", deposit.amount.toFixed(2)]
								})]
							}, deposit.id))
						})]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: "主动攒钱",
				open: manualDepositVisible,
				onCancel: () => {
					setManualDepositVisible(false);
					manualForm.resetFields();
				},
				onOk: () => manualForm.submit(),
				okText: "确定",
				cancelText: "取消",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form, {
					form: manualForm,
					layout: "vertical",
					onFinish: (values) => {
						handleDeposit("manual", values.amount);
						setManualDepositVisible(false);
						manualForm.resetFields();
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
						name: "amount",
						label: "金额",
						rules: [{
							required: true,
							message: "请输入金额"
						}],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypedInputNumber, {
							style: { width: "100%" },
							min: .01,
							step: .01,
							precision: 2,
							placeholder: "输入本次攒钱金额"
						})
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})
		]
	});
};
//#endregion
export { SavingsOperate as default };
