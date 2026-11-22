import { r as __toESM } from "./rolldown-runtime-DZjNq3_i.js";
import { Ct as RefIcon$2, X as RefIcon$1, ar as require_react, pt as RefIcon } from "./vendor-others-DR5UvigV.js";
import { n as require_jsx_runtime } from "./vendor-react-BwfiEprq.js";
import { C as Radio, D as Select, O as Empty, T as button_default, a as Tag, c as Popconfirm, d as List, f as Spin, g as DatePicker, m as Form, p as Input, u as staticMethods, v as TypedInputNumber, w as require_dayjs_min, x as Tabs } from "./vendor-ui-BCl3WSDB.js";
import { H as DATE_FORMAT, et as nowISO } from "./storage-D-qjG_21.js";
import { n as useAuth, r as createApiService } from "./useAuth-CcfI1Ahe.js";
import { a as BottomNav, t as StardewPanel } from "./index-BP4F2dWk.js";
import { t as PageHeader } from "./PageHeader-C0Ff_keA.js";
import { t as useCategories } from "./useCategories-vZHVOlh1.js";
//#region src/api/recurring.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min(), 1);
var api = createApiService("/recurring");
var getRecurringRecords = api.getList;
var createRecurringRecord = api.create;
api.update;
var deleteRecurringRecord = api.delete;
var index_module_default = {
	pageContainer: "_pageContainer_7sdhf_6",
	offlineHint: "_offlineHint_7sdhf_17",
	tabs: "_tabs_7sdhf_29",
	tabLabel: "_tabLabel_7sdhf_65",
	tabContent: "_tabContent_7sdhf_71",
	empty: "_empty_7sdhf_77",
	recordItem: "_recordItem_7sdhf_105",
	recordHeader: "_recordHeader_7sdhf_129",
	recordMain: "_recordMain_7sdhf_139",
	icon: "_icon_7sdhf_145",
	category: "_category_7sdhf_149",
	subCategory: "_subCategory_7sdhf_156",
	frequency: "_frequency_7sdhf_157",
	account: "_account_7sdhf_158",
	remark: "_remark_7sdhf_159",
	recordBody: "_recordBody_7sdhf_173",
	amount: "_amount_7sdhf_177",
	income: "_income_7sdhf_181",
	expense: "_expense_7sdhf_182",
	info: "_info_7sdhf_196",
	date: "_date_7sdhf_202",
	recordActions: "_recordActions_7sdhf_215",
	form: "_form_7sdhf_223",
	submitBtn: "_submitBtn_7sdhf_276"
};
//#endregion
//#region src/pages/Recurring/index.tsx
var import_jsx_runtime = require_jsx_runtime();
var { Option } = Select;
var { TabPane } = Tabs;
var LOCAL_RECURRING_KEY = "money_recurring_records";
var accountOptions = [
	"现金",
	"银行卡",
	"支付宝",
	"微信支付",
	"信用卡"
];
var frequencyMap = {
	"daily": "每天",
	"workday": "每个工作日",
	"weekly": "每周",
	"monthly": "每月",
	"yearly": "每年"
};
var getLocalRecurringRecords = () => {
	try {
		const data = localStorage.getItem(LOCAL_RECURRING_KEY);
		return data ? JSON.parse(data) : [];
	} catch {
		return [];
	}
};
var saveLocalRecurringRecords = (records) => {
	try {
		localStorage.setItem(LOCAL_RECURRING_KEY, JSON.stringify(records));
	} catch (e) {
		console.error("[Storage] 保存定时记账数据失败:", e);
	}
};
var Recurring = () => {
	const { isLoggedIn } = useAuth();
	const [activeTab, setActiveTab] = (0, import_react.useState)("list");
	const [form] = Form.useForm();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [records, setRecords] = (0, import_react.useState)([]);
	const { allCategoryOptions, subCategoryMap, getIcon } = useCategories();
	const loadRecords = (0, import_react.useCallback)(async () => {
		setLoading(true);
		try {
			if (isLoggedIn) setRecords(await getRecurringRecords());
			else setRecords(getLocalRecurringRecords());
		} catch (error) {
			if (!isLoggedIn) setRecords(getLocalRecurringRecords());
			else {
				staticMethods.error("加载定时记账失败");
				console.error("Load recurring error:", error);
			}
		} finally {
			setLoading(false);
		}
	}, [isLoggedIn]);
	(0, import_react.useEffect)(() => {
		loadRecords();
	}, [loadRecords]);
	const handleSubmit = async (values) => {
		setSubmitting(true);
		try {
			const categoryIcon = getIcon(values.category);
			const params = {
				type: values.type,
				category: values.category,
				subCategory: values.subCategory,
				categoryIcon,
				amount: values.amount,
				remark: values.remark || "",
				account: values.account,
				frequency: values.frequency,
				startDate: values.startDate.format(DATE_FORMAT.DATE_KEY),
				durationValue: values.durationValue || 1,
				durationUnit: values.durationUnit || "year"
			};
			if (isLoggedIn) await createRecurringRecord(params);
			else {
				const localRecords = getLocalRecurringRecords();
				const newRecord = {
					id: `local_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
					type: params.type,
					category: params.category,
					subCategory: params.subCategory,
					categoryIcon: params.categoryIcon,
					amount: params.amount,
					remark: params.remark,
					frequency: params.frequency,
					startDate: params.startDate,
					endDate: params.durationUnit === "year" ? (0, import_dayjs_min.default)().add(params.durationValue || 1, "year").format(DATE_FORMAT.DATE_KEY) : (0, import_dayjs_min.default)().add(params.durationValue || 1, "month").format(DATE_FORMAT.DATE_KEY),
					account: params.account,
					isActive: true,
					nextExecuteDate: params.startDate,
					createdAt: nowISO(),
					updatedAt: nowISO()
				};
				localRecords.push(newRecord);
				saveLocalRecurringRecords(localRecords);
			}
			staticMethods.success("定时记账创建成功");
			form.resetFields();
			setActiveTab("list");
			loadRecords();
		} catch (error) {
			staticMethods.error("创建失败，请重试");
			console.error("Create recurring error:", error);
		} finally {
			setSubmitting(false);
		}
	};
	const handleDelete = async (id) => {
		try {
			if (isLoggedIn) await deleteRecurringRecord(id);
			else saveLocalRecurringRecords(getLocalRecurringRecords().filter((r) => r.id !== id));
			staticMethods.success("删除成功");
			loadRecords();
		} catch (error) {
			staticMethods.error("删除失败");
			console.error("Delete recurring error:", error);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: index_module_default.pageContainer,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, { title: "定时记账" }),
			!isLoggedIn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: index_module_default.offlineHint,
				children: "💾 本地模式：数据保存在本机。可在「我的 → 数据管理」中定期备份。"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
				activeKey: activeTab,
				onChange: setActiveTab,
				className: index_module_default.tabs,
				centered: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabPane, {
					tab: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: index_module_default.tabLabel,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, {}), "已有规划"]
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.tabContent,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spin, {
							spinning: loading,
							children: records.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
								description: "暂无定时记账规划",
								image: Empty.PRESENTED_IMAGE_SIMPLE,
								className: index_module_default.empty
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
								dataSource: records,
								renderItem: (record) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(StardewPanel, {
									className: index_module_default.recordItem,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: index_module_default.recordHeader,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: index_module_default.recordMain,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: index_module_default.icon,
														children: record.categoryIcon
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: index_module_default.category,
														children: record.category
													}),
													record.subCategory && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: index_module_default.subCategory,
														children: record.subCategory
													})
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
												color: record.type === "income" ? "success" : "error",
												children: record.type === "income" ? "收入" : "支出"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: index_module_default.recordBody,
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: index_module_default.amount,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: record.type === "income" ? index_module_default.income : index_module_default.expense,
														children: [
															record.type === "income" ? "+" : "-",
															"¥",
															record.amount.toFixed(2)
														]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: index_module_default.info,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: index_module_default.frequency,
														children: frequencyMap[record.frequency]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: index_module_default.account,
														children: record.account
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: index_module_default.date,
													children: [
														"开始日期：",
														record.startDate,
														record.endDate && ` 至 ${record.endDate}`
													]
												}),
												record.remark && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: index_module_default.remark,
													children: ["备注：", record.remark]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: index_module_default.recordActions,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popconfirm, {
												title: "确认删除",
												description: "确定要删除这个定时记账规划吗？",
												onConfirm: () => handleDelete(record.id),
												okText: "确定",
												cancelText: "取消",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
													type: "text",
													danger: true,
													icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$1, {}),
													size: "small",
													children: "删除"
												})
											})
										})
									]
								}, record.id)
							})
						})
					})
				}, "list"), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabPane, {
					tab: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: index_module_default.tabLabel,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$2, {}), "新增规划"]
					}),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.tabContent,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form, {
							form,
							layout: "vertical",
							onFinish: handleSubmit,
							initialValues: {
								type: "expense",
								frequency: "monthly",
								durationValue: 1,
								durationUnit: "year",
								account: "现金"
							},
							className: index_module_default.form,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
									name: "type",
									label: "记账类型",
									rules: [{
										required: true,
										message: "请选择记账类型"
									}],
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Radio.Group, {
										block: true,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio.Button, {
											value: "expense",
											children: "支出"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio.Button, {
											value: "income",
											children: "收入"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
									name: "category",
									label: "分类",
									rules: [{
										required: true,
										message: "请选择分类"
									}],
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
										placeholder: "选择分类",
										onChange: () => form.setFieldValue("subCategory", void 0),
										children: allCategoryOptions.map((cat) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Option, {
											value: cat.value,
											children: [
												cat.icon,
												" ",
												cat.label
											]
										}, cat.value))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
									noStyle: true,
									shouldUpdate: true,
									children: ({ getFieldValue }) => {
										const category = getFieldValue("category");
										const subCategories = category ? subCategoryMap[category] || [] : [];
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
											name: "subCategory",
											label: "子分类",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
												placeholder: category ? "选择子分类" : "请先选择分类",
												disabled: !category,
												children: subCategories.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Option, {
													value: sub,
													children: sub
												}, sub))
											})
										});
									}
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
									name: "amount",
									label: "金额",
									rules: [{
										required: true,
										message: "请输入金额"
									}, {
										type: "number",
										min: .01,
										message: "金额必须大于0"
									}],
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypedInputNumber, {
										prefix: "¥",
										placeholder: "请输入金额",
										min: .01,
										step: .01,
										precision: 2,
										style: { width: "100%" }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
									name: "account",
									label: "账户",
									rules: [{
										required: true,
										message: "请选择账户"
									}],
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Select, {
										placeholder: "选择账户",
										children: accountOptions.map((acc) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Option, {
											value: acc,
											children: acc
										}, acc))
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
									name: "frequency",
									label: "记账频率",
									rules: [{
										required: true,
										message: "请选择记账频率"
									}],
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
										placeholder: "选择记账频率",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Option, {
												value: "daily",
												children: "每天"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Option, {
												value: "workday",
												children: "每个工作日"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Option, {
												value: "weekly",
												children: "每周"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Option, {
												value: "monthly",
												children: "每月"
											})
										]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
									name: "startDate",
									label: "开始日期",
									rules: [{
										required: true,
										message: "请选择开始日期"
									}],
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
										style: { width: "100%" },
										format: "YYYY-MM-DD"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
									label: "重复周期",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Input.Group, {
										compact: true,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
											name: "durationValue",
											noStyle: true,
											rules: [{
												required: true,
												message: "请输入周期数值"
											}],
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TypedInputNumber, {
												min: 1,
												max: 99,
												style: { width: "60%" },
												placeholder: "数值"
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
											name: "durationUnit",
											noStyle: true,
											rules: [{
												required: true,
												message: "请选择单位"
											}],
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select, {
												style: { width: "40%" },
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Option, {
													value: "month",
													children: "月"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Option, {
													value: "year",
													children: "年"
												})]
											})
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
									name: "remark",
									label: "备注",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.TextArea, {
										placeholder: "请输入备注（可选）",
										rows: 2,
										maxLength: 200,
										showCount: true
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
									type: "primary",
									htmlType: "submit",
									loading: submitting,
									block: true,
									size: "large",
									className: index_module_default.submitBtn,
									children: "创建定时记账"
								}) })
							]
						})
					})
				}, "add")]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})
		]
	});
};
//#endregion
export { Recurring as default };
