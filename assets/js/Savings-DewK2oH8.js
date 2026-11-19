import { r as __toESM } from "./rolldown-runtime-DZjNq3_i.js";
import { Ct as RefIcon, Q as RefIcon$1, X as RefIcon$2, ar as require_react } from "./vendor-others-DR5UvigV.js";
import { d as useNavigate, g as useTranslation, n as require_jsx_runtime } from "./vendor-react-BwfiEprq.js";
import { O as Empty, T as button_default, a as Tag, b as Card, g as DatePicker, l as Modal, m as Form, p as Input, s as progress_default, u as staticMethods, v as TypedInputNumber, w as require_dayjs_min } from "./vendor-ui-BCl3WSDB.js";
import { H as DATE_FORMAT, et as nowISO } from "./storage-S6w43vEG.js";
import { n as useAuth } from "./useAuth-C1mbC9T4.js";
import { a as BottomNav } from "./index-ZKpehkra.js";
import { t as PageHeader } from "./PageHeader-C0Ff_keA.js";
import { a as getLocalSavingsPlans, c as setActiveSavingsPlan, r as getActiveSavingsPlanId, s as saveLocalSavingsPlans, t as deleteLocalSavingsPlan } from "./savings-D3kp-waz.js";
//#region src/pages/Savings/index.module.scss
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min(), 1);
var index_module_default = {
	pageContainer: "_pageContainer_10j64_6",
	contentSection: "_contentSection_10j64_17",
	headerButton: "_headerButton_10j64_27",
	primaryButton: "_primaryButton_10j64_28",
	emptyPanel: "_emptyPanel_10j64_47",
	offlineHint: "_offlineHint_10j64_71",
	planList: "_planList_10j64_82",
	planCard: "_planCard_10j64_87",
	planTop: "_planTop_10j64_111",
	planName: "_planName_10j64_118",
	planDate: "_planDate_10j64_125",
	planTags: "_planTags_10j64_131",
	planStats: "_planStats_10j64_138",
	statItem: "_statItem_10j64_145",
	planActions: "_planActions_10j64_163",
	deleteButton: "_deleteButton_10j64_169"
};
//#endregion
//#region src/pages/Savings/index.tsx
var import_jsx_runtime = require_jsx_runtime();
var Savings = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { isLoggedIn } = useAuth();
	const [plans, setPlans] = (0, import_react.useState)(() => getLocalSavingsPlans());
	const [activePlanId, setActivePlanId] = (0, import_react.useState)(() => getActiveSavingsPlanId());
	const [createModalVisible, setCreateModalVisible] = (0, import_react.useState)(false);
	const [form] = Form.useForm();
	const reloadPlans = (0, import_react.useCallback)(() => {
		setPlans(getLocalSavingsPlans());
		setActivePlanId(getActiveSavingsPlanId());
	}, []);
	const handleCreatePlan = (values) => {
		const startDate = (0, import_dayjs_min.default)().format(DATE_FORMAT.DATE_KEY);
		const endDate = (0, import_dayjs_min.default)(values.endDate).format(DATE_FORMAT.DATE_KEY);
		const daysDiff = Math.max((0, import_dayjs_min.default)(endDate).diff((0, import_dayjs_min.default)(startDate), "day"), 1);
		const newPlan = {
			id: `plan_${Date.now()}`,
			name: values.name,
			targetAmount: values.targetAmount,
			savedAmount: 0,
			startDate,
			endDate,
			dailyAverage: Number((values.targetAmount / daysDiff).toFixed(2)),
			status: "active",
			createdAt: nowISO(),
			updatedAt: nowISO()
		};
		saveLocalSavingsPlans([...plans, newPlan]);
		setActiveSavingsPlan(newPlan.id);
		setCreateModalVisible(false);
		form.resetFields();
		reloadPlans();
		staticMethods.success("攒钱计划已创建，并已设为当前操作计划");
		navigate("/savings");
	};
	const handleOpenPlan = (planId) => {
		setActiveSavingsPlan(planId);
		setActivePlanId(planId);
		staticMethods.success("已打开这个攒钱计划");
		navigate("/savings");
	};
	const handleDeletePlan = (planId) => {
		Modal.confirm({
			title: "删除攒钱计划",
			content: "删除后，这个计划及其攒钱记录都会一并移除，确定继续吗？",
			okType: "danger",
			onOk: () => {
				deleteLocalSavingsPlan(planId);
				reloadPlans();
				staticMethods.success("计划已删除");
			}
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: index_module_default.pageContainer,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "攒钱计划管理",
				backPath: "/profile",
				rightContent: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
					type: "primary",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, {}),
					className: index_module_default.headerButton,
					onClick: () => setCreateModalVisible(true),
					children: "新建"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default.contentSection,
				children: [!isLoggedIn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: index_module_default.offlineHint,
					children: "💾 本地模式：数据保存在本机，可在「我的 → 数据管理」中定期备份"
				}), plans.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default.emptyPanel,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { description: t("savings.noPlans", "暂时还没有攒钱计划") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
						type: "primary",
						className: index_module_default.primaryButton,
						onClick: () => setCreateModalVisible(true),
						children: "创建第一个计划"
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: index_module_default.planList,
					children: plans.map((plan) => {
						const progress = plan.percentage ?? (plan.targetAmount > 0 ? Math.min(100, plan.savedAmount / plan.targetAmount * 100) : 0);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
							className: index_module_default.planCard,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: index_module_default.planTop,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: index_module_default.planName,
										children: plan.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: index_module_default.planDate,
										children: [
											plan.startDate,
											" 至 ",
											plan.endDate
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: index_module_default.planTags,
										children: [activePlanId === plan.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
											color: "processing",
											children: "当前操作中"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
											color: progress >= 100 ? "success" : "default",
											children: progress >= 100 ? "已完成" : "进行中"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(progress_default, {
									percent: Number(progress.toFixed(1)),
									strokeColor: progress >= 100 ? "#52c41a" : "#4a90e2"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: index_module_default.planStats,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: index_module_default.statItem,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "已攒金额" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["￥", plan.savedAmount.toFixed(2)] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: index_module_default.statItem,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "目标金额" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["￥", plan.targetAmount.toFixed(2)] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: index_module_default.statItem,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "日均建议" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["￥", plan.dailyAverage.toFixed(2)] })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: index_module_default.planActions,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
										type: activePlanId === plan.id ? "default" : "primary",
										className: index_module_default.primaryButton,
										onClick: () => handleOpenPlan(plan.id),
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$1, {}),
										children: activePlanId === plan.id ? "前往操作页" : "打开这个计划"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
										danger: true,
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$2, {}),
										className: index_module_default.deleteButton,
										onClick: () => handleDeletePlan(plan.id),
										children: "删除"
									})]
								})
							]
						}, plan.id);
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: "创建攒钱计划",
				open: createModalVisible,
				onCancel: () => {
					setCreateModalVisible(false);
					form.resetFields();
				},
				onOk: () => form.submit(),
				okText: "确定",
				cancelText: "取消",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form, {
					form,
					layout: "vertical",
					onFinish: handleCreatePlan,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
							name: "name",
							label: "计划名称",
							rules: [{
								required: true,
								message: "请输入计划名称"
							}],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { placeholder: "例如：旅行基金、年底换手机" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
							name: "targetAmount",
							label: "目标金额",
							rules: [{
								required: true,
								message: "请输入目标金额"
							}],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypedInputNumber, {
								style: { width: "100%" },
								min: .01,
								precision: 2,
								step: .01,
								placeholder: "输入目标金额"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
							name: "endDate",
							label: "截止日期",
							rules: [{
								required: true,
								message: "请选择截止日期"
							}],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
								style: { width: "100%" },
								disabledDate: (current) => Boolean(current && current.endOf("day").isBefore((0, import_dayjs_min.default)().endOf("day")))
							})
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})
		]
	});
};
//#endregion
export { Savings as default };

//# sourceMappingURL=Savings-DewK2oH8.js.map