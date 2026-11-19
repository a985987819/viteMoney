import { r as __toESM } from "./rolldown-runtime-DZjNq3_i.js";
import { Ct as RefIcon$1, Mt as RefIcon$2, X as RefIcon$3, ar as require_react, kt as RefIcon } from "./vendor-others-DR5UvigV.js";
import { d as useNavigate, n as require_jsx_runtime } from "./vendor-react-BwfiEprq.js";
import { O as Empty, T as button_default, _ as Slider, a as Tag, g as DatePicker, l as Modal, p as Input, u as staticMethods, w as require_dayjs_min } from "./vendor-ui-BCl3WSDB.js";
import { H as DATE_FORMAT, M as updateFridgeItem, et as nowISO, p as getFridgeItems, s as deleteFridgeItem, t as addFridgeItem } from "./storage-S6w43vEG.js";
//#region src/pages/MyFridge/index.module.scss
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min(), 1);
var index_module_default = {
	pageContainer: "_pageContainer_9pt4g_6",
	headerSection: "_headerSection_9pt4g_18",
	headerTop: "_headerTop_9pt4g_26",
	backBtn: "_backBtn_9pt4g_33",
	headerTitle: "_headerTitle_9pt4g_52",
	headerPlaceholder: "_headerPlaceholder_9pt4g_61",
	summaryGrid: "_summaryGrid_9pt4g_66",
	summaryCard: "_summaryCard_9pt4g_72",
	formCard: "_formCard_9pt4g_73",
	listCard: "_listCard_9pt4g_74",
	itemCard: "_itemCard_9pt4g_75",
	summaryLabel: "_summaryLabel_9pt4g_103",
	summaryValue: "_summaryValue_9pt4g_109",
	contentSection: "_contentSection_9pt4g_117",
	sectionTitle: "_sectionTitle_9pt4g_136",
	formGrid: "_formGrid_9pt4g_144",
	fieldBlock: "_fieldBlock_9pt4g_149",
	fieldLabel: "_fieldLabel_9pt4g_155",
	submitWrap: "_submitWrap_9pt4g_161",
	addButton: "_addButton_9pt4g_165",
	listToolbar: "_listToolbar_9pt4g_180",
	tabGroup: "_tabGroup_9pt4g_185",
	tabButton: "_tabButton_9pt4g_191",
	activeTab: "_activeTab_9pt4g_211",
	tabCount: "_tabCount_9pt4g_217",
	listHint: "_listHint_9pt4g_227",
	emptyWrap: "_emptyWrap_9pt4g_237",
	itemList: "_itemList_9pt4g_241",
	itemHeader: "_itemHeader_9pt4g_250",
	itemName: "_itemName_9pt4g_258",
	itemMeta: "_itemMeta_9pt4g_266",
	itemHeaderRight: "_itemHeaderRight_9pt4g_274",
	deleteBtn: "_deleteBtn_9pt4g_280",
	progressRow: "_progressRow_9pt4g_297",
	progressLabel: "_progressLabel_9pt4g_305",
	daysOwned: "_daysOwned_9pt4g_318"
};
//#endregion
//#region src/pages/MyFridge/index.tsx
var import_jsx_runtime = require_jsx_runtime();
var TAB_CONFIG = [
	{
		key: "pending",
		label: "待消耗"
	},
	{
		key: "consumed",
		label: "已消耗"
	},
	{
		key: "all",
		label: "全部"
	}
];
var MyFridgePage = () => {
	const navigate = useNavigate();
	const [items, setItems] = (0, import_react.useState)(() => getFridgeItems());
	const [activeTab, setActiveTab] = (0, import_react.useState)("pending");
	const [searchValue, setSearchValue] = (0, import_react.useState)("");
	const [dishName, setDishName] = (0, import_react.useState)("");
	const [quantity, setQuantity] = (0, import_react.useState)("");
	const [selectedDate, setSelectedDate] = (0, import_react.useState)((0, import_dayjs_min.default)());
	const sortedItems = (0, import_react.useMemo)(() => {
		return [...items].sort((a, b) => {
			const purchaseDiff = (0, import_dayjs_min.default)(a.purchaseDate).valueOf() - (0, import_dayjs_min.default)(b.purchaseDate).valueOf();
			if (purchaseDiff !== 0) return purchaseDiff;
			return (0, import_dayjs_min.default)(a.createdAt).valueOf() - (0, import_dayjs_min.default)(b.createdAt).valueOf();
		});
	}, [items]);
	const filteredItems = (0, import_react.useMemo)(() => {
		return sortedItems.filter((item) => {
			const keywordMatched = item.name.toLowerCase().includes(searchValue.trim().toLowerCase());
			const isConsumed = item.progress >= 100;
			if (activeTab === "pending") return keywordMatched && !isConsumed;
			if (activeTab === "consumed") return keywordMatched && isConsumed;
			return keywordMatched;
		});
	}, [
		activeTab,
		searchValue,
		sortedItems
	]);
	const pendingCount = (0, import_react.useMemo)(() => items.filter((item) => item.progress < 100).length, [items]);
	const consumedCount = (0, import_react.useMemo)(() => items.filter((item) => item.progress >= 100).length, [items]);
	const getDaysOwned = (purchaseDate) => {
		return Math.max(0, (0, import_dayjs_min.default)().startOf("day").diff((0, import_dayjs_min.default)(purchaseDate), "day"));
	};
	const getAgeColor = (days) => {
		return `hsl(${120 - Math.min(days, 14) / 14 * 120}, 72%, 42%)`;
	};
	const handleAddItem = () => {
		const trimmedName = dishName.trim();
		const trimmedQuantity = quantity.trim();
		if (!trimmedName) {
			staticMethods.warning("请输入菜品名称");
			return;
		}
		if (!trimmedQuantity) {
			staticMethods.warning("请输入分量");
			return;
		}
		const created = addFridgeItem({
			name: trimmedName,
			quantity: trimmedQuantity,
			purchaseDate: selectedDate.format(DATE_FORMAT.DATE_KEY),
			progress: 0
		});
		setItems((prev) => [...prev, created]);
		setDishName("");
		setQuantity("");
		setSelectedDate((0, import_dayjs_min.default)());
		staticMethods.success("已加入我的冰箱");
	};
	const handleProgressChange = (item, nextProgress) => {
		const normalizedProgress = Math.max(0, Math.min(100, Math.round(nextProgress)));
		const nextConsumedAt = normalizedProgress >= 100 ? item.consumedAt || nowISO() : void 0;
		updateFridgeItem(item.id, {
			progress: normalizedProgress,
			consumedAt: nextConsumedAt
		});
		setItems((prev) => prev.map((current) => current.id === item.id ? {
			...current,
			progress: normalizedProgress,
			consumedAt: nextConsumedAt,
			updatedAt: nowISO()
		} : current));
	};
	const handleDeleteItem = (item) => {
		Modal.confirm({
			title: "删除菜品",
			content: `确定要删除「${item.name}」吗？`,
			okType: "danger",
			onOk: () => {
				deleteFridgeItem(item.id);
				setItems((prev) => prev.filter((current) => current.id !== item.id));
				staticMethods.success("已删除");
			}
		});
	};
	const getTabCount = (tab) => {
		if (tab === "pending") return pendingCount;
		if (tab === "consumed") return consumedCount;
		return items.length;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: index_module_default.pageContainer,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: index_module_default.headerSection,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default.headerTop,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: index_module_default.backBtn,
						onClick: () => navigate(-1),
						"aria-label": "返回",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.headerTitle,
						children: "我的冰箱"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: index_module_default.headerPlaceholder })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default.summaryGrid,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.summaryCard,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.summaryLabel,
							children: "待消耗"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.summaryValue,
							children: pendingCount
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.summaryCard,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.summaryLabel,
							children: "已消耗"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.summaryValue,
							children: consumedCount
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.summaryCard,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.summaryLabel,
							children: "总计"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.summaryValue,
							children: items.length
						})]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: index_module_default.contentSection,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: index_module_default.formCard,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: index_module_default.sectionTitle,
					children: "添加菜品"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default.formGrid,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.fieldBlock,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.fieldLabel,
								children: "菜品名称"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: dishName,
								onChange: (event) => setDishName(event.target.value),
								placeholder: "例如：西红柿、鸡胸肉",
								size: "large"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.fieldBlock,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.fieldLabel,
								children: "分量"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: quantity,
								onChange: (event) => setQuantity(event.target.value),
								placeholder: "例如：2 斤 / 3 份 / 500g",
								size: "large"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.fieldBlock,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.fieldLabel,
								children: "记录日期"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DatePicker, {
								value: selectedDate,
								onChange: (value) => {
									if (value) setSelectedDate(value);
								},
								size: "large",
								allowClear: false,
								style: { width: "100%" },
								format: "YYYY-MM-DD",
								disabledDate: (current) => Boolean(current && current.isAfter((0, import_dayjs_min.default)().endOf("day")))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.submitWrap,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
								type: "primary",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$1, {}),
								size: "large",
								className: index_module_default.addButton,
								onClick: handleAddItem,
								children: "保存到冰箱"
							})
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: index_module_default.listCard,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.listToolbar,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.tabGroup,
							children: TAB_CONFIG.map((tab) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: `${index_module_default.tabButton} ${activeTab === tab.key ? index_module_default.activeTab : ""}`,
								onClick: () => setActiveTab(tab.key),
								children: [tab.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: index_module_default.tabCount,
									children: getTabCount(tab.key)
								})]
							}, tab.key))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: searchValue,
							onChange: (event) => setSearchValue(event.target.value),
							placeholder: "按菜品名称搜索",
							prefix: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$2, {}),
							size: "large"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.listHint,
						children: "列表按记录日期升序展示，最早录入的菜品排在最上方。"
					}),
					filteredItems.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.emptyWrap,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, { description: searchValue ? "没有匹配的菜品" : "还没有冰箱记录" })
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.itemList,
						children: filteredItems.map((item) => {
							const daysOwned = getDaysOwned(item.purchaseDate);
							const ageColor = getAgeColor(daysOwned);
							const isConsumed = item.progress >= 100;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: index_module_default.itemCard,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: index_module_default.itemHeader,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: index_module_default.itemName,
											children: item.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: index_module_default.itemMeta,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.quantity }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["记录于 ", (0, import_dayjs_min.default)(item.purchaseDate).format(DATE_FORMAT.DATE_KEY)] })]
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: index_module_default.itemHeaderRight,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
												color: isConsumed ? "success" : "processing",
												children: isConsumed ? "已消耗" : "待消耗"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												className: index_module_default.deleteBtn,
												onClick: () => handleDeleteItem(item),
												"aria-label": `删除${item.name}`,
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$3, {})
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: index_module_default.progressRow,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: index_module_default.progressLabel,
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "消耗进度" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [item.progress, "%"] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: index_module_default.daysOwned,
											style: { color: ageColor },
											children: [
												"已买入 ",
												daysOwned,
												" 天"
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
										value: item.progress,
										min: 0,
										max: 100,
										step: 1,
										tooltip: { formatter: (value) => `${value ?? 0}%` },
										onChange: (value) => handleProgressChange(item, Number(value))
									})
								]
							}, item.id);
						})
					})
				]
			})]
		})]
	});
};
//#endregion
export { MyFridgePage as default };

//# sourceMappingURL=MyFridge-ywyOx8iS.js.map