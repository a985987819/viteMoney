import { r as __toESM } from "./rolldown-runtime-DZjNq3_i.js";
import { Ct as RefIcon$3, X as RefIcon$2, Y as RefIcon$1, Z as RefIcon, ar as require_react, n as native_default } from "./vendor-others-DR5UvigV.js";
import { n as require_jsx_runtime, p as useSearchParams, t as $e5534fc185f7111e$export$2e2bcd8739ae039 } from "./vendor-react-BwfiEprq.js";
import { T as button_default, c as Popconfirm, l as Modal, m as Form, p as Input, u as staticMethods } from "./vendor-ui-BCl3WSDB.js";
import { E as saveLocalCategories, _ as getLocalCategories, nt as incomeCategories, tt as expenseCategories } from "./storage-S6w43vEG.js";
import { t as PageHeader } from "./PageHeader-C0Ff_keA.js";
//#region src/pages/CategoryManage/index.module.scss
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var index_module_default = {
	categoryManageContainer: "_categoryManageContainer_ebmg1_6",
	typeTabs: "_typeTabs_ebmg1_16",
	typeTab: "_typeTab_ebmg1_16",
	active: "_active_ebmg1_37",
	categoryList: "_categoryList_ebmg1_42",
	categoryListItem: "_categoryListItem_ebmg1_48",
	dragging: "_dragging_ebmg1_61",
	categoryIcon: "_categoryIcon_ebmg1_64",
	categoryName: "_categoryName_ebmg1_76",
	dragHandle: "_dragHandle_ebmg1_82",
	categoryActions: "_categoryActions_ebmg1_92",
	addCategoryBtn: "_addCategoryBtn_ebmg1_97",
	iconSelector: "_iconSelector_ebmg1_109",
	iconTip: "_iconTip_ebmg1_115",
	emojiPickerSection: "_emojiPickerSection_ebmg1_120",
	emojiInputRow: "_emojiInputRow_ebmg1_127",
	emojiPreview: "_emojiPreview_ebmg1_137",
	emojiMartWrapper: "_emojiMartWrapper_ebmg1_150"
};
//#endregion
//#region src/pages/CategoryManage/index.tsx
var import_jsx_runtime = require_jsx_runtime();
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
			icon: "🔄",
			type: "transfer"
		}, {
			id: "transfer_2",
			name: "还款",
			icon: "💳",
			type: "transfer"
		}],
		debt: [
			{
				id: "debt_1",
				name: "借入",
				icon: "📥",
				type: "debt"
			},
			{
				id: "debt_2",
				name: "借出",
				icon: "📤",
				type: "debt"
			},
			{
				id: "debt_3",
				name: "还款",
				icon: "✅",
				type: "debt"
			}
		],
		reimbursement: [{
			id: "reimbursement_1",
			name: "报销",
			icon: "📋",
			type: "reimbursement"
		}]
	};
};
var defaultCategories = generateDefaultCategories();
var typeLabels = {
	expense: "支出",
	income: "收入",
	transfer: "转账",
	debt: "借贷",
	reimbursement: "报销"
};
var CategoryManage = () => {
	const [searchParams] = useSearchParams();
	const [activeType, setActiveType] = (0, import_react.useState)(searchParams.get("type") || "expense");
	const [categories, setCategories] = (0, import_react.useState)(() => {
		return getLocalCategories() || defaultCategories;
	});
	const [isModalVisible, setIsModalVisible] = (0, import_react.useState)(false);
	const [showEmojiPicker, setShowEmojiPicker] = (0, import_react.useState)(false);
	const [editingCategory, setEditingCategory] = (0, import_react.useState)(null);
	const [selectedIcon, setSelectedIcon] = (0, import_react.useState)("");
	const [draggedIndex, setDraggedIndex] = (0, import_react.useState)(null);
	const [form] = Form.useForm();
	const emojiInputRef = (0, import_react.useRef)(null);
	const saveCategories = (newCategories) => {
		setCategories(newCategories);
		saveLocalCategories(newCategories);
	};
	const handleDragStart = (index) => {
		setDraggedIndex(index);
	};
	const handleDragEnd = () => {
		setDraggedIndex(null);
	};
	const handleDragOver = (e, index) => {
		e.preventDefault();
		if (draggedIndex === null || draggedIndex === index) return;
		const newCategories = { ...categories };
		const currentList = [...newCategories[activeType]];
		const draggedItem = currentList[draggedIndex];
		currentList.splice(draggedIndex, 1);
		currentList.splice(index, 0, draggedItem);
		newCategories[activeType] = currentList;
		saveCategories(newCategories);
		setDraggedIndex(index);
	};
	const openModal = (category) => {
		if (category) {
			setEditingCategory(category);
			setSelectedIcon(category.icon);
			form.setFieldsValue({ name: category.name });
		} else {
			setEditingCategory(null);
			setSelectedIcon("");
			form.resetFields();
		}
		setShowEmojiPicker(false);
		setIsModalVisible(true);
	};
	const closeModal = () => {
		setIsModalVisible(false);
		setEditingCategory(null);
		setSelectedIcon("");
		setShowEmojiPicker(false);
		form.resetFields();
	};
	const handleEmojiSelect = (emojiData) => {
		setSelectedIcon(emojiData.native || emojiData.shortcodes || "📦");
	};
	const handleEmojiInputChange = (e) => {
		const val = e.target.value;
		if (val) {
			const lastChar = val.slice(-2);
			if (/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{FE00}-\u{FE0F}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/u.test(lastChar)) setSelectedIcon(lastChar);
		}
	};
	const handleSave = async () => {
		try {
			const name = (await form.validateFields()).name.trim();
			if (!name) {
				staticMethods.warning("请输入分类名称");
				return;
			}
			const icon = selectedIcon || name.charAt(0);
			const newCategories = { ...categories };
			const currentList = [...newCategories[activeType]];
			if (editingCategory) {
				const index = currentList.findIndex((c) => c.id === editingCategory.id);
				if (index !== -1) {
					currentList[index] = {
						...editingCategory,
						name,
						icon
					};
					staticMethods.success("修改成功");
				}
			} else {
				const newCategory = {
					id: Date.now().toString(),
					name,
					icon,
					type: activeType
				};
				currentList.push(newCategory);
				staticMethods.success("添加成功");
			}
			newCategories[activeType] = currentList;
			saveCategories(newCategories);
			closeModal();
		} catch (error) {
			console.error(error);
		}
	};
	const handleDelete = (categoryId) => {
		const newCategories = { ...categories };
		newCategories[activeType] = newCategories[activeType].filter((c) => c.id !== categoryId);
		saveCategories(newCategories);
		staticMethods.success("删除成功");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `page-container ${index_module_default.categoryManageContainer}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				title: "分类管理",
				backPath: "/add-record"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: index_module_default.typeTabs,
				children: Object.keys(typeLabels).map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: `type-tab ${activeType === type ? "active" : ""}`,
					onClick: () => setActiveType(type),
					children: typeLabels[type]
				}, type))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: index_module_default.categoryList,
				children: categories[activeType].map((category, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default.categoryListItem,
					draggable: true,
					onDragStart: () => handleDragStart(index),
					onDragEnd: handleDragEnd,
					onDragOver: (e) => handleDragOver(e, index),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.dragHandle,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.categoryIcon,
							children: category.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.categoryName,
							children: category.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.categoryActions,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
								type: "text",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$1, {}),
								onClick: () => openModal(category)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popconfirm, {
								title: "确定删除该分类吗？",
								onConfirm: () => handleDelete(category.id),
								okText: "确定",
								cancelText: "取消",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
									type: "text",
									danger: true,
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$2, {})
								})
							})]
						})
					]
				}, category.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
				type: "primary",
				className: index_module_default.addCategoryBtn,
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$3, {}),
				onClick: () => openModal(),
				block: true,
				children: "添加分类"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: editingCategory ? "编辑分类" : "添加分类",
				open: isModalVisible,
				onOk: handleSave,
				onCancel: closeModal,
				okText: "保存",
				cancelText: "取消",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form, {
					form,
					layout: "vertical",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
						label: "分类名称",
						name: "name",
						rules: [{
							required: true,
							message: "请输入分类名称"
						}],
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							placeholder: "请输入分类名称",
							maxLength: 10
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form.Item, {
						label: "图标",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.emojiInputRow,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: index_module_default.emojiPreview,
										children: selectedIcon || "?"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										ref: emojiInputRef,
										placeholder: "可直接输入 emoji 或点击下方选择",
										value: selectedIcon,
										onChange: handleEmojiInputChange,
										maxLength: 4
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
										type: showEmojiPicker ? "default" : "primary",
										onClick: () => setShowEmojiPicker(!showEmojiPicker),
										children: showEmojiPicker ? "收起" : "选择"
									})
								]
							}),
							!selectedIcon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: index_module_default.iconTip,
								children: "未选择时将使用名称第一个字"
							}),
							showEmojiPicker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.emojiMartWrapper,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)($e5534fc185f7111e$export$2e2bcd8739ae039, {
									data: native_default,
									onEmojiSelect: handleEmojiSelect,
									previewPosition: "none",
									skinTonePosition: "search",
									perLine: 8,
									maxFrequentRows: 2
								})
							})
						]
					})]
				})
			})
		]
	});
};
//#endregion
export { CategoryManage as default };

//# sourceMappingURL=CategoryManage-BF_mZxzb.js.map