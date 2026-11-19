import { r as __toESM } from "./rolldown-runtime-DZjNq3_i.js";
import { ar as require_react, kt as RefIcon } from "./vendor-others-DR5UvigV.js";
import { d as useNavigate, n as require_jsx_runtime } from "./vendor-react-BwfiEprq.js";
import { u as staticMethods } from "./vendor-ui-BCl3WSDB.js";
import { _ as getLocalCategories, l as deleteQuickRecord, r as addQuickRecord, y as getQuickRecords } from "./storage-D-qjG_21.js";
import { n as SpriteIcon } from "./index-BP4F2dWk.js";
//#region src/pages/QuickRecordManage/index.module.scss
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var index_module_default = {
	pageContainer: "_pageContainer_8e3ez_6",
	headerSection: "_headerSection_8e3ez_18",
	headerTop: "_headerTop_8e3ez_26",
	backBtn: "_backBtn_8e3ez_33",
	headerTitle: "_headerTitle_8e3ez_48",
	contentSection: "_contentSection_8e3ez_56",
	typeTabs: "_typeTabs_8e3ez_63",
	typeTab: "_typeTab_8e3ez_63",
	active: "_active_8e3ez_79",
	quickRecordForm: "_quickRecordForm_8e3ez_85",
	quickRecordList: "_quickRecordList_8e3ez_86",
	formTitle: "_formTitle_8e3ez_112",
	listTitle: "_listTitle_8e3ez_113",
	formRow: "_formRow_8e3ez_121",
	formLabel: "_formLabel_8e3ez_125",
	categoryGrid: "_categoryGrid_8e3ez_132",
	categoryItem: "_categoryItem_8e3ez_138",
	subCategoryItem: "_subCategoryItem_8e3ez_139",
	quickRecordItem: "_quickRecordItem_8e3ez_140",
	selected: "_selected_8e3ez_157",
	categoryIcon: "_categoryIcon_8e3ez_162",
	categoryName: "_categoryName_8e3ez_166",
	subCategorySection: "_subCategorySection_8e3ez_176",
	subCategoryGrid: "_subCategoryGrid_8e3ez_180",
	amountInput: "_amountInput_8e3ez_200",
	submitBtn: "_submitBtn_8e3ez_216",
	disabled: "_disabled_8e3ez_236",
	listEmpty: "_listEmpty_8e3ez_241",
	recordIcon: "_recordIcon_8e3ez_258",
	recordInfo: "_recordInfo_8e3ez_262",
	recordCategory: "_recordCategory_8e3ez_266",
	recordSubCategory: "_recordSubCategory_8e3ez_272",
	recordAmount: "_recordAmount_8e3ez_278",
	income: "_income_8e3ez_285",
	deleteBtn: "_deleteBtn_8e3ez_289"
};
//#endregion
//#region src/pages/QuickRecordManage/index.tsx
var import_jsx_runtime = require_jsx_runtime();
var QuickRecordManagePage = () => {
	const navigate = useNavigate();
	const [quickRecordList, setQuickRecordList] = (0, import_react.useState)(() => getQuickRecords().sort((a, b) => a.order - b.order));
	const [activeType, setActiveType] = (0, import_react.useState)("expense");
	const [categories, setCategories] = (0, import_react.useState)(() => {
		return getLocalCategories()?.expense || [];
	});
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)(null);
	const [selectedSubCategory, setSelectedSubCategory] = (0, import_react.useState)(null);
	const [amount, setAmount] = (0, import_react.useState)("");
	const loadQuickRecords = (0, import_react.useCallback)(() => {
		setQuickRecordList(getQuickRecords().sort((a, b) => a.order - b.order));
	}, []);
	const loadCategories = (0, import_react.useCallback)((type) => {
		const stored = getLocalCategories();
		const targetType = type || activeType;
		if (stored) setCategories(stored[targetType] || []);
		else setCategories([]);
	}, [activeType]);
	const handleTypeChange = (0, import_react.useCallback)((type) => {
		setActiveType(type);
		setSelectedCategory(null);
		setSelectedSubCategory(null);
		loadCategories(type);
	}, [loadCategories]);
	const subCategories = (0, import_react.useMemo)(() => {
		if (!selectedCategory?.subCategories) return [];
		return selectedCategory.subCategories;
	}, [selectedCategory]);
	const handleSelectCategory = (category) => {
		if (selectedCategory?.id === category.id) {
			setSelectedCategory(null);
			setSelectedSubCategory(null);
		} else {
			setSelectedCategory(category);
			setSelectedSubCategory(null);
		}
	};
	const handleSelectSubCategory = (subCategoryId) => {
		if (selectedSubCategory === subCategoryId) setSelectedSubCategory(null);
		else setSelectedSubCategory(subCategoryId);
	};
	const handleSubmit = () => {
		if (!selectedCategory || !amount) {
			staticMethods.warning("请选择分类和输入金额");
			return;
		}
		const numAmount = parseFloat(amount);
		if (isNaN(numAmount) || numAmount <= 0) {
			staticMethods.warning("请输入有效的金额");
			return;
		}
		const finalSubCategoryId = selectedSubCategory || (subCategories.length > 0 ? subCategories[0].id : selectedCategory.id);
		addQuickRecord({
			categoryId: selectedCategory.id,
			subCategoryId: finalSubCategoryId,
			amount: numAmount,
			type: activeType
		});
		staticMethods.success("添加成功");
		setAmount("");
		setSelectedCategory(null);
		setSelectedSubCategory(null);
		loadQuickRecords();
	};
	const handleDelete = (id) => {
		deleteQuickRecord(id);
		staticMethods.success("删除成功");
		loadQuickRecords();
	};
	const getCategoryName = (categoryId, subCategoryId) => {
		const category = categories.find((c) => c.id === categoryId);
		if (!category) return {
			category: "未知",
			subCategory: "未知",
			icon: "❓"
		};
		const subCategory = (category.subCategories || []).find((s) => s.id === subCategoryId);
		return {
			category: category.name,
			subCategory: subCategory?.name || "未知",
			icon: subCategory?.icon || category.icon
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: index_module_default.pageContainer,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: index_module_default.headerSection,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default.headerTop,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.backBtn,
						onClick: () => navigate(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.headerTitle,
						children: "快捷记账设置"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { width: 32 } })
				]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: index_module_default.contentSection,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default.typeTabs,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `${index_module_default.typeTab} ${activeType === "expense" ? index_module_default.active : ""}`,
						onClick: () => handleTypeChange("expense"),
						children: "支出"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `${index_module_default.typeTab} ${activeType === "income" ? index_module_default.active : ""}`,
						onClick: () => handleTypeChange("income"),
						children: "收入"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default.quickRecordForm,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.formTitle,
							children: "添加快捷记账"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.formRow,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.formLabel,
								children: "选择分类"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.categoryGrid,
								children: categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `${index_module_default.categoryItem} ${selectedCategory?.id === category.id ? index_module_default.selected : ""}`,
									onClick: () => handleSelectCategory(category),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpriteIcon, {
										iconId: category.icon,
										size: 24,
										className: index_module_default.categoryIcon
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: index_module_default.categoryName,
										children: category.name
									})]
								}, category.id))
							})]
						}),
						selectedCategory && subCategories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.subCategorySection,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.formLabel,
								children: "选择子分类"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.subCategoryGrid,
								children: subCategories.map((subCategory) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: `${index_module_default.subCategoryItem} ${selectedSubCategory === subCategory.id ? index_module_default.selected : ""}`,
									onClick: () => handleSelectSubCategory(subCategory.id),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpriteIcon, {
										iconId: subCategory.icon,
										size: 16
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										style: { marginLeft: 4 },
										children: subCategory.name
									})]
								}, subCategory.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.formRow,
							style: { marginTop: 12 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.formLabel,
								children: "输入金额"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "number",
								className: index_module_default.amountInput,
								placeholder: "0.00",
								value: amount,
								onChange: (e) => setAmount(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: `${index_module_default.submitBtn} ${!selectedCategory || !amount ? index_module_default.disabled : ""}`,
							onClick: handleSubmit,
							disabled: !selectedCategory || !amount,
							children: "添加"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default.quickRecordList,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.listTitle,
						children: "已添加的快捷记账"
					}), quickRecordList.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.listEmpty,
						children: [
							"暂无快捷记账",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"请在上方添加"
						]
					}) : quickRecordList.filter((qr) => qr.type === activeType).map((qr) => {
						const info = getCategoryName(qr.categoryId, qr.subCategoryId);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.quickRecordItem,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpriteIcon, {
									iconId: info.icon,
									size: 28,
									className: index_module_default.recordIcon
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: index_module_default.recordInfo,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: index_module_default.recordCategory,
										children: info.category
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: index_module_default.recordSubCategory,
										children: info.subCategory
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: `${index_module_default.recordAmount} ${qr.type === "income" ? index_module_default.income : ""}`,
									children: ["¥", qr.amount.toFixed(2)]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: index_module_default.deleteBtn,
									onClick: () => handleDelete(qr.id),
									children: "删除"
								})
							]
						}, qr.id);
					})]
				})
			]
		})]
	});
};
//#endregion
export { QuickRecordManagePage as default };

//# sourceMappingURL=QuickRecordManage-BKDn4ZU_.js.map