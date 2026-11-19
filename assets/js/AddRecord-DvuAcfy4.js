import { r as __toESM } from "./rolldown-runtime-DZjNq3_i.js";
import { Ot as RefIcon$4, R as RefIcon$3, ar as require_react, c as RefIcon$5, kt as RefIcon$2, u as RefIcon, v as RefIcon$6, z as RefIcon$1 } from "./vendor-others-DR5UvigV.js";
import { d as useNavigate, g as useTranslation, n as require_jsx_runtime, u as useLocation } from "./vendor-react-BwfiEprq.js";
import { C as Radio, S as Calendar, a as Tag, g as DatePicker, l as Modal, p as Input, u as staticMethods, w as require_dayjs_min } from "./vendor-ui-BCl3WSDB.js";
import { D as saveLocalRecords, f as getExpenseCategoriesForSelect, m as getIncomeCategoriesForSelect, q as formatDisplayMonthDay, v as getLocalRecords } from "./storage-D-qjG_21.js";
import { n as useAuth } from "./useAuth-CcfI1Ahe.js";
import { m as updateRecord, n as SpriteIcon, o as createRecord } from "./index-BP4F2dWk.js";
//#region src/hooks/useCalculator.ts
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min(), 1);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var useCalculator = (initialAmount = "") => {
	const [hasOperator, setHasOperator] = (0, import_react.useState)(false);
	const [operator, setOperator] = (0, import_react.useState)(null);
	const [firstOperand, setFirstOperand] = (0, import_react.useState)("");
	const [secondOperand, setSecondOperand] = (0, import_react.useState)("");
	const [amount, setInternalAmount] = (0, import_react.useState)(initialAmount);
	const setAmount = (newAmount) => {
		setInternalAmount(newAmount);
	};
	const canCalculate = (0, import_react.useMemo)(() => {
		return hasOperator && !!operator && !!firstOperand && !!secondOperand;
	}, [
		hasOperator,
		operator,
		firstOperand,
		secondOperand
	]);
	const calculate = () => {
		if (!operator || !firstOperand || !secondOperand) return amount;
		const num1 = parseFloat(firstOperand);
		const num2 = parseFloat(secondOperand);
		let result = 0;
		if (operator === "+") result = num1 + num2;
		else if (operator === "-") result = num1 - num2;
		return result.toFixed(2).replace(/\.00$/, "");
	};
	const handleNumberClick = (num) => {
		if (hasOperator && operator) {
			if (num === "." && secondOperand.includes(".")) return;
			if (secondOperand.includes(".") && secondOperand.split(".")[1]?.length >= 2) return;
			if (secondOperand === "0" && num !== ".") setSecondOperand(num);
			else setSecondOperand(secondOperand + num);
			setAmount(firstOperand + operator + (secondOperand + num));
			return;
		}
		if (num === "." && amount.includes(".")) return;
		if (amount.includes(".") && amount.split(".")[1]?.length >= 2) return;
		if (amount === "0" && num !== ".") setAmount(num);
		else setAmount(amount + num);
	};
	const handleDelete = () => {
		if (hasOperator && operator) {
			if (secondOperand) {
				const newSecond = secondOperand.slice(0, -1);
				setSecondOperand(newSecond);
				setAmount(firstOperand + operator + newSecond);
				if (!newSecond) {
					setHasOperator(false);
					setOperator(null);
					setAmount(firstOperand);
				}
				return;
			}
			setHasOperator(false);
			setOperator(null);
			setAmount(firstOperand);
			return;
		}
		setAmount(amount.slice(0, -1));
	};
	const handleOperatorClick = (op) => {
		if (!amount || amount === "0") return;
		if (hasOperator && operator && firstOperand && secondOperand) {
			const result = calculate();
			setFirstOperand(result);
			setSecondOperand("");
			setOperator(op);
			setAmount(result + op);
			return;
		}
		const lastChar = amount.slice(-1);
		if (lastChar === "+" || lastChar === "-") {
			setOperator(op);
			setAmount(amount.slice(0, -1) + op);
			return;
		}
		setFirstOperand(amount);
		setOperator(op);
		setHasOperator(true);
		setAmount(amount + op);
	};
	const handleCalculate = () => {
		setAmount(calculate());
		setFirstOperand("");
		setSecondOperand("");
		setOperator(null);
		setHasOperator(false);
	};
	const reset = () => {
		setAmount("");
		setFirstOperand("");
		setSecondOperand("");
		setOperator(null);
		setHasOperator(false);
	};
	return {
		amount,
		setAmount,
		hasOperator,
		operator,
		firstOperand,
		secondOperand,
		canCalculate,
		handleNumberClick,
		handleDelete,
		handleOperatorClick,
		handleCalculate,
		calculate,
		reset
	};
};
var index_module_default$2 = {
	subCategoryModal: "_subCategoryModal_w71ef_6",
	modalHeader: "_modalHeader_w71ef_42",
	title: "_title_w71ef_47",
	content: "_content_w71ef_54",
	grid: "_grid_w71ef_57",
	subCategoryList: "_subCategoryList_w71ef_57",
	list: "_list_w71ef_62",
	item: "_item_w71ef_68",
	selected: "_selected_w71ef_86",
	name: "_name_w71ef_91",
	mainCategoryItem: "_mainCategoryItem_w71ef_96",
	iconWrapper: "_iconWrapper_w71ef_123",
	divider: "_divider_w71ef_131"
};
//#endregion
//#region src/components/SubCategoryModal/index.tsx
var import_jsx_runtime = require_jsx_runtime();
var SubCategoryModal = ({ visible, category, onClose, onSelect, selectedSubCategoryId }) => {
	const [viewMode, setViewMode] = (0, import_react.useState)("grid");
	const handleSelect = (subCategory) => {
		if (subCategory && selectedSubCategoryId === subCategory.id) onSelect(null);
		else onSelect(subCategory);
		onClose();
	};
	const handleSelectMainCategory = () => {
		onSelect(null);
		onClose();
	};
	if (!category) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
		title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: index_module_default$2.modalHeader,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: index_module_default$2.title,
				children: category.name
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Radio.Group, {
				value: viewMode,
				onChange: (e) => setViewMode(e.target.value),
				buttonStyle: "solid",
				size: "small",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio.Button, {
					value: "list",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio.Button, {
					value: "grid",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$1, {})
				})]
			})]
		}),
		open: visible,
		onCancel: onClose,
		footer: null,
		width: 320,
		bodyStyle: {
			maxHeight: 400,
			overflow: "auto"
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `${index_module_default$2.content} ${viewMode === "grid" ? index_module_default$2.grid : index_module_default$2.list}`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `${index_module_default$2.item} ${!selectedSubCategoryId ? index_module_default$2.selected : ""}`,
					onClick: handleSelectMainCategory,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpriteIcon, {
						iconId: category.icon,
						size: 32
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: index_module_default$2.name,
						children: category.name
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: index_module_default$2.divider }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: index_module_default$2.subCategoryList,
					children: category.subCategories.map((sub) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `${index_module_default$2.item} ${selectedSubCategoryId === sub.id ? index_module_default$2.selected : ""}`,
						onClick: () => handleSelect(sub),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpriteIcon, {
							iconId: sub.icon,
							size: 32
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: index_module_default$2.name,
							children: sub.name
						})]
					}, sub.id))
				})
			]
		})
	});
};
var index_module_default$1 = { keyboardAvoidingView: "_keyboardAvoidingView_1c2y0_6" };
//#endregion
//#region src/components/KeyboardAvoidingView/index.tsx
/**
* 键盘避让视图组件
* 当键盘弹出时，自动调整内容位置避免输入框被遮挡
*/
var KeyboardAvoidingView = ({ children, className = "", enabled = true, offset = 20 }) => {
	const containerRef = (0, import_react.useRef)(null);
	const [keyboardHeight, setKeyboardHeight] = (0, import_react.useState)(0);
	const originalHeightRef = (0, import_react.useRef)(window.innerHeight);
	(0, import_react.useEffect)(() => {
		if (!enabled) return;
		const handleFocusIn = (e) => {
			const target = e.target;
			if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.contentEditable === "true") setTimeout(() => {
				const currentHeight = window.innerHeight;
				const heightDiff = originalHeightRef.current - currentHeight;
				if (heightDiff > 150) {
					setKeyboardHeight(heightDiff);
					const rect = target.getBoundingClientRect();
					if (containerRef.current?.getBoundingClientRect()) {
						const elementBottom = rect.bottom;
						const visibleHeight = currentHeight - heightDiff;
						if (elementBottom > visibleHeight - offset) {
							const scrollAmount = elementBottom - visibleHeight + offset + 50;
							containerRef.current?.scrollBy({
								top: scrollAmount,
								behavior: "smooth"
							});
						}
					}
				}
			}, 350);
		};
		const handleFocusOut = () => {
			setTimeout(() => {
				const activeElement = document.activeElement;
				if (!activeElement || activeElement.tagName !== "INPUT" && activeElement.tagName !== "TEXTAREA" && activeElement.contentEditable !== "true") setKeyboardHeight(0);
			}, 100);
		};
		const handleResize = () => {
			const currentHeight = window.innerHeight;
			const heightDiff = originalHeightRef.current - currentHeight;
			if (heightDiff > 150) setKeyboardHeight(heightDiff);
			else setKeyboardHeight(0);
		};
		document.addEventListener("focusin", handleFocusIn);
		document.addEventListener("focusout", handleFocusOut);
		window.addEventListener("resize", handleResize);
		return () => {
			document.removeEventListener("focusin", handleFocusIn);
			document.removeEventListener("focusout", handleFocusOut);
			window.removeEventListener("resize", handleResize);
		};
	}, [enabled, offset]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: containerRef,
		className: `${index_module_default$1.keyboardAvoidingView} ${className}`,
		style: { paddingBottom: keyboardHeight > 0 ? `${keyboardHeight + offset}px` : void 0 },
		children
	});
};
var index_module_default = {
	addRecordContainer: "_addRecordContainer_ofzlv_6",
	addHeader: "_addHeader_ofzlv_16",
	backIcon: "_backIcon_ofzlv_26",
	typeTabs: "_typeTabs_ofzlv_37",
	typeTab: "_typeTab_ofzlv_37",
	active: "_active_ofzlv_55",
	categorySection: "_categorySection_ofzlv_60",
	categoryGrid: "_categoryGrid_ofzlv_67",
	categoryItem: "_categoryItem_ofzlv_73",
	selected: "_selected_ofzlv_84",
	categoryIcon: "_categoryIcon_ofzlv_87",
	categoryName: "_categoryName_ofzlv_91",
	categoryIconWrapper: "_categoryIconWrapper_ofzlv_96",
	selectedMark: "_selectedMark_ofzlv_118",
	expandBtn: "_expandBtn_ofzlv_126",
	selectedSubCategory: "_selectedSubCategory_ofzlv_151",
	label: "_label_ofzlv_162",
	value: "_value_ofzlv_166",
	inputSection: "_inputSection_ofzlv_172",
	quickTags: "_quickTags_ofzlv_180",
	quickTag: "_quickTag_ofzlv_180",
	remarkAmountRow: "_remarkAmountRow_ofzlv_207",
	remarkInputWrapper: "_remarkInputWrapper_ofzlv_216",
	remarkIcon: "_remarkIcon_ofzlv_223",
	remarkInput: "_remarkInput_ofzlv_216",
	amountDisplayWrapper: "_amountDisplayWrapper_ofzlv_236",
	dateDisplay: "_dateDisplay_ofzlv_242",
	clickable: "_clickable_ofzlv_246",
	amountDisplay: "_amountDisplay_ofzlv_236",
	numberKeyboard: "_numberKeyboard_ofzlv_259",
	keyboardRow: "_keyboardRow_ofzlv_265",
	keyBtn: "_keyBtn_ofzlv_270",
	deleteBtn: "_deleteBtn_ofzlv_289",
	operatorBtn: "_operatorBtn_ofzlv_289",
	saveAgainBtn: "_saveAgainBtn_ofzlv_289",
	saveBtn: "_saveBtn_ofzlv_302",
	calculateBtn: "_calculateBtn_ofzlv_311",
	btnLoading: "_btnLoading_ofzlv_321",
	btnSpinner: "_btnSpinner_ofzlv_326",
	btnSpin: "_btnSpin_ofzlv_326",
	datePickerModal: "_datePickerModal_ofzlv_346",
	datePickerContent: "_datePickerContent_ofzlv_358",
	datePickerTabs: "_datePickerTabs_ofzlv_362",
	modeRadio: "_modeRadio_ofzlv_367",
	yearPickerContainer: "_yearPickerContainer_ofzlv_382",
	subCategoryModal: "_subCategoryModal_ofzlv_389",
	subCategoryList: "_subCategoryList_ofzlv_393",
	subCategoryItem: "_subCategoryItem_ofzlv_398",
	headerTitle: "_headerTitle_ofzlv_416"
};
//#endregion
//#region src/pages/AddRecord/index.tsx
/** 构建记录数据的辅助函数 */
var buildRecordData = (params) => ({
	type: params.activeType,
	category: params.selectedCategory.mainCategory.name,
	subCategory: params.selectedCategory.subCategory?.name,
	categoryIcon: params.selectedCategory.subCategory?.icon || params.selectedCategory.mainCategory.icon,
	amount: parseFloat(params.finalAmount),
	remark: params.remark,
	date: params.selectedDate.valueOf(),
	account: params.account
});
var AddRecord = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { isLoggedIn } = useAuth();
	const { t } = useTranslation();
	const editingRecord = location.state?.record;
	const isEditMode = !!editingRecord;
	const [activeType, setActiveType] = (0, import_react.useState)("expense");
	const [selectedCategory, setSelectedCategory] = (0, import_react.useState)(null);
	const [remark, setRemark] = (0, import_react.useState)("");
	const [selectedDate, setSelectedDate] = (0, import_react.useState)((0, import_dayjs_min.default)());
	const [selectedAccount] = (0, import_react.useState)(t("addRecord.defaultAccount"));
	const [isSaving, setIsSaving] = (0, import_react.useState)(false);
	const [isDatePickerVisible, setIsDatePickerVisible] = (0, import_react.useState)(false);
	const [datePickerMode, setDatePickerMode] = (0, import_react.useState)("date");
	const [isSubCategoryModalVisible, setIsSubCategoryModalVisible] = (0, import_react.useState)(false);
	const [currentExpandCategory, setCurrentExpandCategory] = (0, import_react.useState)(null);
	const { amount, canCalculate, handleNumberClick, handleDelete, handleOperatorClick, handleCalculate, calculate, reset: resetCalculator, setAmount } = useCalculator("");
	(0, import_react.useEffect)(() => {
		if (editingRecord) {
			setActiveType(editingRecord.type === "income" ? "income" : "expense");
			setAmount(editingRecord.amount.toString());
			setRemark(editingRecord.remark);
			setSelectedDate((0, import_dayjs_min.default)(editingRecord.date));
			const mainCat = (editingRecord.type === "income" ? getIncomeCategoriesForSelect() : getExpenseCategoriesForSelect()).find((c) => c.name === editingRecord.category);
			if (mainCat) setSelectedCategory({
				mainCategory: mainCat,
				subCategory: mainCat.subCategories.find((s) => s.name === editingRecord.subCategory) || null
			});
		}
	}, [editingRecord]);
	const currentCategories = (0, import_react.useMemo)(() => {
		return activeType === "expense" ? getExpenseCategoriesForSelect() : getIncomeCategoriesForSelect();
	}, [activeType]);
	const handleCategoryClick = (category) => {
		if (selectedCategory?.mainCategory.id === category.id) setSelectedCategory(null);
		else setSelectedCategory({
			mainCategory: category,
			subCategory: null
		});
	};
	const handleExpandSubCategories = (e, category) => {
		e.stopPropagation();
		setCurrentExpandCategory(category);
		setIsSubCategoryModalVisible(true);
	};
	const handleSubCategorySelect = (subCategory) => {
		if (currentExpandCategory) setSelectedCategory({
			mainCategory: currentExpandCategory,
			subCategory
		});
	};
	/** 获取最终金额（如果需要计算则计算） */
	const getFinalAmount = () => {
		return canCalculate ? calculate() : amount;
	};
	const handleSave = async () => {
		if (!selectedCategory) {
			staticMethods.warning(t("addRecord.categoryRequired"));
			return;
		}
		if (!amount || parseFloat(amount) === 0) {
			staticMethods.warning(t("addRecord.amountRequired"));
			return;
		}
		const recordData = buildRecordData({
			activeType,
			selectedCategory,
			finalAmount: getFinalAmount(),
			remark,
			selectedDate,
			account: selectedAccount
		});
		if (isSaving) return;
		setIsSaving(true);
		try {
			if (isEditMode && editingRecord) {
				if (isLoggedIn) await updateRecord(editingRecord.id, recordData);
				else saveLocalRecords(getLocalRecords().map((r) => r.id === editingRecord.id ? {
					...r,
					...recordData
				} : r));
				staticMethods.success(t("addRecord.updateSuccess"));
			} else {
				if (isLoggedIn) await createRecord(recordData);
				else {
					const localRecords = getLocalRecords();
					saveLocalRecords([{
						id: `local_${Date.now()}`,
						...recordData
					}, ...localRecords]);
				}
				staticMethods.success(t("addRecord.saveSuccess"));
			}
			navigate("/");
		} catch (error) {
			staticMethods.error(isEditMode ? t("addRecord.updateFailed") : t("addRecord.saveFailed"));
			console.error("Save error:", error);
		} finally {
			setIsSaving(false);
		}
	};
	const handleSaveAndAdd = async () => {
		if (!selectedCategory) {
			staticMethods.warning(t("addRecord.categoryRequired"));
			return;
		}
		if (!amount || parseFloat(amount) === 0) {
			staticMethods.warning(t("addRecord.amountRequired"));
			return;
		}
		const recordData = buildRecordData({
			activeType,
			selectedCategory,
			finalAmount: getFinalAmount(),
			remark,
			selectedDate,
			account: selectedAccount
		});
		if (isSaving) return;
		setIsSaving(true);
		try {
			if (isLoggedIn) await createRecord(recordData);
			else {
				const localRecords = getLocalRecords();
				saveLocalRecords([{
					id: `local_${Date.now()}`,
					...recordData
				}, ...localRecords]);
			}
			staticMethods.success(t("addRecord.saveSuccess"));
			setRemark("");
			setSelectedCategory(null);
			resetCalculator();
		} catch {
			staticMethods.error(t("addRecord.saveFailed"));
		} finally {
			setIsSaving(false);
		}
	};
	const handleDateSelect = (date) => {
		setSelectedDate(date);
		setIsDatePickerVisible(false);
	};
	const handleMonthSelect = (date) => {
		setSelectedDate(date);
		setDatePickerMode("date");
	};
	const handleYearSelect = (year) => {
		setSelectedDate((0, import_dayjs_min.default)().year(year));
		setDatePickerMode("month");
	};
	const typeOptions = [{
		key: "expense",
		label: t("addRecord.expense")
	}, {
		key: "income",
		label: t("addRecord.income")
	}];
	const remarkInputRef = (0, import_react.useRef)(null);
	const handleRemarkFocus = () => {
		setTimeout(() => {
			const inputElement = remarkInputRef.current?.input ?? void 0;
			if (inputElement) {
				const rect = inputElement.getBoundingClientRect();
				const scrollContainer = inputElement.closest(".page-container");
				if (scrollContainer) {
					const containerRect = scrollContainer.getBoundingClientRect();
					const relativeTop = rect.top - containerRect.top;
					if (relativeTop > window.innerHeight - (window.innerHeight - containerRect.height > 150 ? window.innerHeight - containerRect.height : 0) - 150) scrollContainer.scrollTo({
						top: scrollContainer.scrollTop + relativeTop - 100,
						behavior: "smooth"
					});
				}
			}
		}, 350);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(KeyboardAvoidingView, {
		className: `page-container ${index_module_default.addRecordContainer}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default.addHeader,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$2, {
						className: index_module_default.backIcon,
						onClick: () => navigate("/")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.headerTitle,
						children: isEditMode ? t("addRecord.editTitle") : t("addRecord.title")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.typeTabs,
						children: typeOptions.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: `${index_module_default.typeTab} ${activeType === type.key ? index_module_default.active : ""}`,
							onClick: () => setActiveType(type.key),
							children: type.label
						}, type.key))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: index_module_default.categorySection,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: index_module_default.categoryGrid,
					children: currentCategories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `${index_module_default.categoryItem} ${selectedCategory?.mainCategory.id === category.id ? index_module_default.selected : ""}`,
						onClick: () => handleCategoryClick(category),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.categoryIconWrapper,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpriteIcon, {
									iconId: category.icon,
									size: 40
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.categoryName,
								children: category.name
							}),
							selectedCategory?.mainCategory.id === category.id && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$3, { className: index_module_default.selectedMark }),
							category.subCategories.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.expandBtn,
								onClick: (e) => handleExpandSubCategories(e, category),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$4, {})
							})
						]
					}, category.id))
				})
			}),
			selectedCategory?.subCategory && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default.selectedSubCategory,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: index_module_default.label,
					children: [t("addRecord.subCategory"), ":"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: index_module_default.value,
					children: selectedCategory.subCategory.name
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default.inputSection,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.quickTags,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
								className: index_module_default.quickTag,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$5, {}),
								children: t("addRecord.account")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
								className: `${index_module_default.quickTag} ${index_module_default.active}`,
								children: t("addRecord.defaultAccount")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
								className: index_module_default.quickTag,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$6, {}),
								onClick: () => navigate("/category-manage")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.remarkAmountRow,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.remarkInputWrapper,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$3, { className: index_module_default.remarkIcon }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								ref: remarkInputRef,
								placeholder: t("addRecord.remarkPlaceholder"),
								value: remark,
								onChange: (e) => setRemark(e.target.value),
								onFocus: handleRemarkFocus,
								className: index_module_default.remarkInput,
								variant: "borderless",
								maxLength: 50
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.amountDisplayWrapper,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `${index_module_default.dateDisplay} ${index_module_default.clickable}`,
								onClick: () => setIsDatePickerVisible(true),
								children: formatDisplayMonthDay(selectedDate)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: index_module_default.amountDisplay,
								children: ["¥", amount || "0.00"]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.numberKeyboard,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.keyboardRow,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: index_module_default.keyBtn,
										onClick: () => handleNumberClick("1"),
										children: "1"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: index_module_default.keyBtn,
										onClick: () => handleNumberClick("2"),
										children: "2"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: index_module_default.keyBtn,
										onClick: () => handleNumberClick("3"),
										children: "3"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: `${index_module_default.keyBtn} ${index_module_default.deleteBtn}`,
										onClick: handleDelete,
										children: "×"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.keyboardRow,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: index_module_default.keyBtn,
										onClick: () => handleNumberClick("4"),
										children: "4"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: index_module_default.keyBtn,
										onClick: () => handleNumberClick("5"),
										children: "5"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: index_module_default.keyBtn,
										onClick: () => handleNumberClick("6"),
										children: "6"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: `${index_module_default.keyBtn} ${index_module_default.operatorBtn}`,
										onClick: () => handleOperatorClick("-"),
										children: "-"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.keyboardRow,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: index_module_default.keyBtn,
										onClick: () => handleNumberClick("7"),
										children: "7"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: index_module_default.keyBtn,
										onClick: () => handleNumberClick("8"),
										children: "8"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: index_module_default.keyBtn,
										onClick: () => handleNumberClick("9"),
										children: "9"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: `${index_module_default.keyBtn} ${index_module_default.operatorBtn}`,
										onClick: () => handleOperatorClick("+"),
										children: "+"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.keyboardRow,
								children: [
									!isEditMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: `${index_module_default.keyBtn} ${index_module_default.saveAgainBtn}`,
										onClick: handleSaveAndAdd,
										disabled: isSaving,
										children: isSaving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: index_module_default.btnSpinner }) : t("addRecord.saveAgain")
									}),
									isEditMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: index_module_default.keyBtn,
										onClick: () => handleNumberClick("0"),
										children: "0"
									}),
									!isEditMode && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: index_module_default.keyBtn,
										onClick: () => handleNumberClick("0"),
										children: "0"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: index_module_default.keyBtn,
										onClick: () => handleNumberClick("."),
										children: "."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: `${index_module_default.keyBtn} ${canCalculate ? index_module_default.calculateBtn : index_module_default.saveBtn} ${isSaving ? index_module_default.btnLoading : ""}`,
										disabled: isSaving,
										onClick: canCalculate ? () => handleCalculate() : handleSave,
										children: isSaving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: index_module_default.btnSpinner }) : canCalculate ? t("addRecord.calculate") : isEditMode ? t("addRecord.update") : t("addRecord.save")
									})
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubCategoryModal, {
				visible: isSubCategoryModalVisible,
				category: currentExpandCategory,
				onClose: () => setIsSubCategoryModalVisible(false),
				onSelect: handleSubCategorySelect,
				selectedSubCategoryId: selectedCategory?.subCategory?.id
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: datePickerMode === "date" ? t("addRecord.selectDate") : datePickerMode === "month" ? t("addRecord.selectMonth") : t("addRecord.selectYear"),
				open: isDatePickerVisible,
				onCancel: () => setIsDatePickerVisible(false),
				footer: null,
				width: datePickerMode === "year" ? 320 : 430,
				className: index_module_default.datePickerModal,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default.datePickerContent,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.datePickerTabs,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Radio.Group, {
								value: datePickerMode,
								onChange: (e) => setDatePickerMode(e.target.value),
								buttonStyle: "solid",
								className: index_module_default.modeRadio,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio.Button, {
										value: "date",
										children: t("addRecord.byDay")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio.Button, {
										value: "month",
										children: t("addRecord.byMonth")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio.Button, {
										value: "year",
										children: t("addRecord.byYear")
									})
								]
							})
						}),
						datePickerMode === "date" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
							value: selectedDate,
							onSelect: handleDateSelect,
							fullscreen: true,
							mode: "month"
						}),
						datePickerMode === "month" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Calendar, {
							value: selectedDate,
							onSelect: handleMonthSelect,
							fullscreen: false,
							mode: "year",
							headerRender: ({ value, onChange }) => {
								const year = value.year();
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										display: "flex",
										justifyContent: "center",
										padding: "8px"
									},
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Radio.Group, {
										value: year,
										onChange: (e) => onChange(value.year(e.target.value)),
										buttonStyle: "solid",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Radio.Button, {
												value: year - 1,
												children: [year - 1, "年"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Radio.Button, {
												value: year,
												children: [year, "年"]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Radio.Button, {
												value: year + 1,
												children: [year + 1, "年"]
											})
										]
									})
								});
							}
						}),
						datePickerMode === "year" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.yearPickerContainer,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
								picker: "year",
								value: selectedDate,
								onChange: (date) => {
									if (date) handleYearSelect(date.year());
								},
								open: true,
								style: { width: "100%" }
							})
						})
					]
				})
			})
		]
	});
};
//#endregion
export { AddRecord as default };

//# sourceMappingURL=AddRecord-DvuAcfy4.js.map