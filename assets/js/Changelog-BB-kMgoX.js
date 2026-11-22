import { kt as RefIcon } from "./vendor-others-DR5UvigV.js";
import { d as useNavigate, g as useTranslation, n as require_jsx_runtime } from "./vendor-react-BwfiEprq.js";
import { a as Tag, r as timeline_default } from "./vendor-ui-BCl3WSDB.js";
import { t as CDN_BASE_URL } from "./cdn-ByyAaq0Z.js";
var index_module_default = {
	changelogPage: "_changelogPage_1p41p_6",
	backgroundDecorations: "_backgroundDecorations_1p41p_15",
	cloud1: "_cloud1_1p41p_22",
	cloud2: "_cloud2_1p41p_23",
	header: "_header_1p41p_38",
	backButton: "_backButton_1p41p_52",
	title: "_title_1p41p_63",
	placeholder: "_placeholder_1p41p_71",
	content: "_content_1p41p_75",
	illustration: "_illustration_1p41p_83",
	timelineSection: "_timelineSection_1p41p_84",
	footerNote: "_footerNote_1p41p_85",
	animalImg: "_animalImg_1p41p_113",
	timelineLabel: "_timelineLabel_1p41p_121",
	version: "_version_1p41p_126",
	date: "_date_1p41p_131",
	timelineContent: "_timelineContent_1p41p_137",
	typeTag: "_typeTag_1p41p_141",
	changeList: "_changeList_1p41p_147",
	changeItem: "_changeItem_1p41p_152"
};
//#endregion
//#region src/pages/Changelog/index.tsx
var import_jsx_runtime = require_jsx_runtime();
var changelogData = [
	{
		version: "v1.2.0",
		date: "2025-04-02",
		type: "feature",
		changes: [
			"新增预算管理功能，支持月度预算设置",
			"新增账单筛选功能，支持多维度筛选",
			"新增数据导入导出功能（CSV/Excel）",
			"优化加载页面，新增星露谷风格背景图"
		]
	},
	{
		version: "v1.1.0",
		date: "2025-03-15",
		type: "feature",
		changes: [
			"新增统计报表页面，支持图表分析",
			"新增分类管理功能",
			"新增多语言支持（中文/英文）",
			"优化记账体验，支持二级分类"
		]
	},
	{
		version: "v1.0.0",
		date: "2025-03-01",
		type: "feature",
		changes: [
			"星露谷记账本正式发布",
			"支持支出/收入记账",
			"支持账单查看和编辑",
			"支持本地存储和云端同步",
			"PWA支持，可安装为桌面应用"
		]
	}
];
/**
* 版本日志页面
*/
var Changelog = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const getTagColor = (type) => {
		switch (type) {
			case "feature": return "success";
			case "fix": return "error";
			case "optimize": return "processing";
			default: return "default";
		}
	};
	const getTagText = (type) => {
		switch (type) {
			case "feature": return t("changelog.tagFeature", "新功能");
			case "fix": return t("changelog.tagFix", "修复");
			case "optimize": return t("changelog.tagOptimize", "优化");
			default: return type;
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: index_module_default.changelogPage,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default.backgroundDecorations,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: index_module_default.cloud1,
					children: "☁️"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: index_module_default.cloud2,
					children: "☁️"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default.header,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.backButton,
						onClick: () => navigate(-1),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: index_module_default.title,
						children: t("changelog.title", "版本日志")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: index_module_default.placeholder })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default.content,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.illustration,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: `${CDN_BASE_URL}/chicken.png`,
							alt: "Chicken",
							className: index_module_default.animalImg
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.timelineSection,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(timeline_default, {
							mode: "left",
							items: changelogData.map((item) => ({
								label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: index_module_default.timelineLabel,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: index_module_default.version,
										children: item.version
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: index_module_default.date,
										children: item.date
									})]
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: index_module_default.timelineContent,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
										color: getTagColor(item.type),
										className: index_module_default.typeTag,
										children: getTagText(item.type)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
										className: index_module_default.changeList,
										children: item.changes.map((change, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
											className: index_module_default.changeItem,
											children: change
										}, index))
									})]
								})
							}))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.footerNote,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: t("changelog.footerNote", "持续更新中，敬请期待更多功能...") })
					})
				]
			})
		]
	});
};
//#endregion
export { Changelog as default };
