import { S as RefIcon$2, j as RefIcon$1, k as RefIcon$3, kt as RefIcon } from "./vendor-others-DR5UvigV.js";
import { d as useNavigate, g as useTranslation, n as require_jsx_runtime } from "./vendor-react-BwfiEprq.js";
import { T as button_default, a as Tag } from "./vendor-ui-BCl3WSDB.js";
import { t as CDN_BASE_URL } from "./cdn-ByyAaq0Z.js";
var index_module_default = {
	aboutPage: "_aboutPage_nxy2t_6",
	backgroundDecorations: "_backgroundDecorations_nxy2t_15",
	cloud1: "_cloud1_nxy2t_22",
	cloud2: "_cloud2_nxy2t_23",
	star1: "_star1_nxy2t_24",
	star2: "_star2_nxy2t_25",
	header: "_header_nxy2t_50",
	backButton: "_backButton_nxy2t_64",
	title: "_title_nxy2t_76",
	placeholder: "_placeholder_nxy2t_84",
	content: "_content_nxy2t_88",
	logoSection: "_logoSection_nxy2t_96",
	introCard: "_introCard_nxy2t_97",
	techTags: "_techTags_nxy2t_98",
	contactButtons: "_contactButtons_nxy2t_99",
	thanksCard: "_thanksCard_nxy2t_100",
	featureItem: "_featureItem_nxy2t_101",
	logoContainer: "_logoContainer_nxy2t_132",
	logo: "_logo_nxy2t_96",
	appName: "_appName_nxy2t_149",
	sectionTitle: "_sectionTitle_nxy2t_150",
	featureTitle: "_featureTitle_nxy2t_151",
	version: "_version_nxy2t_161",
	introText: "_introText_nxy2t_162",
	featureDesc: "_featureDesc_nxy2t_163",
	thanksText: "_thanksText_nxy2t_164",
	copyright: "_copyright_nxy2t_165",
	license: "_license_nxy2t_166",
	versionTag: "_versionTag_nxy2t_170",
	techTag: "_techTag_nxy2t_98",
	featuresSection: "_featuresSection_nxy2t_177",
	techSection: "_techSection_nxy2t_178",
	contactSection: "_contactSection_nxy2t_179",
	thanksSection: "_thanksSection_nxy2t_180",
	featureGrid: "_featureGrid_nxy2t_197",
	featureIcon: "_featureIcon_nxy2t_207",
	contactBtn: "_contactBtn_nxy2t_224",
	heartIcon: "_heartIcon_nxy2t_244",
	footer: "_footer_nxy2t_250"
};
//#endregion
//#region src/pages/About/index.tsx
var import_jsx_runtime = require_jsx_runtime();
/**
* 关于我页面
*/
var About = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const techStack = [
		{
			name: "React 19",
			color: "#61dafb"
		},
		{
			name: "TypeScript",
			color: "#3178c6"
		},
		{
			name: "Vite 8",
			color: "#646cff"
		},
		{
			name: "Ant Design",
			color: "#1677ff"
		},
		{
			name: "ECharts",
			color: "#ea5e31"
		},
		{
			name: "i18next",
			color: "#1aa3b8"
		}
	];
	const features = [
		{
			icon: "🎮",
			title: t("about.feature1Title", "像素风格"),
			desc: t("about.feature1Desc", "星露谷主题设计")
		},
		{
			icon: "⚡",
			title: t("about.feature2Title", "快速记账"),
			desc: t("about.feature2Desc", "3秒完成记录")
		},
		{
			icon: "📊",
			title: t("about.feature3Title", "数据分析"),
			desc: t("about.feature3Desc", "图表直观展示")
		},
		{
			icon: "🔒",
			title: t("about.feature4Title", "隐私保护"),
			desc: t("about.feature4Desc", "本地存储安全")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: index_module_default.aboutPage,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default.backgroundDecorations,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.cloud1,
						children: "☁️"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.cloud2,
						children: "☁️"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.star1,
						children: "✨"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.star2,
						children: "✨"
					})
				]
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
						children: t("about.title", "关于我")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: index_module_default.placeholder })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default.content,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.logoSection,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.logoContainer,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: `${CDN_BASE_URL}/hero.png`,
									alt: "Logo",
									className: index_module_default.logo
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: index_module_default.appName,
								children: t("about.appName", "星露谷记账本")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: index_module_default.version,
								children: "Version 1.2.0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
								color: "success",
								className: index_module_default.versionTag,
								children: t("about.stable", "稳定版")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.introCard,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: index_module_default.introText,
							children: t("about.intro", "一款以《星露谷物语》为设计灵感的记账应用，将游戏化的像素风格与实用的记账功能相结合，让记账变得简单有趣。")
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.featuresSection,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: index_module_default.sectionTitle,
							children: t("about.highlights", "产品特色")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.featureGrid,
							children: features.map((feature, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.featureItem,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: index_module_default.featureIcon,
										children: feature.icon
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: index_module_default.featureTitle,
										children: feature.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: index_module_default.featureDesc,
										children: feature.desc
									})
								]
							}, index))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.techSection,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: index_module_default.sectionTitle,
							children: t("about.techStack", "技术栈")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.techTags,
							children: techStack.map((tech, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
								className: index_module_default.techTag,
								style: {
									borderColor: tech.color,
									color: tech.color
								},
								children: tech.name
							}, index))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.contactSection,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: index_module_default.sectionTitle,
							children: t("about.contact", "联系我们")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.contactButtons,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
								type: "default",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$1, {}),
								className: index_module_default.contactBtn,
								onClick: () => window.open("https://github.com", "_blank"),
								children: "GitHub"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
								type: "default",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$2, {}),
								className: index_module_default.contactBtn,
								onClick: () => window.location.href = "mailto:feedback@example.com",
								children: t("about.email", "邮件反馈")
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.thanksSection,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.thanksCard,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$3, { className: index_module_default.heartIcon }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: index_module_default.thanksText,
								children: t("about.thanks", "感谢使用星露谷记账本！如果您有任何建议或反馈，欢迎随时联系我们。")
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.footer,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: index_module_default.copyright,
							children: [
								"© 2025 ",
								t("about.appName", "星露谷记账本"),
								". All rights reserved."
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: index_module_default.license,
							children: t("about.license", "开源协议：MIT License")
						})]
					})
				]
			})
		]
	});
};
//#endregion
export { About as default };
