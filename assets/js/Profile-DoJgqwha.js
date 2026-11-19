import { r as __toESM } from "./rolldown-runtime-DZjNq3_i.js";
import { A as RefIcon$16, D as RefIcon$22, E as RefIcon$3, F as RefIcon$19, I as RefIcon$5, J as RefIcon$25, N as RefIcon$24, O as RefIcon$13, P as RefIcon$21, T as RefIcon$14, U as RefIcon$7, X as RefIcon$26, Yt as RefIcon$12, ar as require_react, c as RefIcon, d as RefIcon$1, dt as RefIcon$23, g as RefIcon$15, l as RefIcon$8, mt as RefIcon$4, p as RefIcon$18, pt as RefIcon$2, v as RefIcon$6, x as RefIcon$17, y as RefIcon$20 } from "./vendor-others-DR5UvigV.js";
import { d as useNavigate, g as useTranslation, n as require_jsx_runtime } from "./vendor-react-BwfiEprq.js";
import { C as Radio, E as Avatar, T as button_default, f as Spin, l as Modal, m as Form, n as Upload, o as Switch, p as Input, u as staticMethods, w as require_dayjs_min } from "./vendor-ui-BCl3WSDB.js";
import { D as saveLocalRecords, U as formatDateKey, W as formatDateTimeFull, a as clearAllData, v as getLocalRecords } from "./storage-S6w43vEG.js";
import { n as useAuth } from "./useAuth-C1mbC9T4.js";
import { a as generateImportReport, c as importFromXLSX, i as exportToXLSX, l as importFullBackup, n as exportFullBackup, r as exportToCSV, s as importFromCSV, t as compareDate, u as parseDate } from "./importExport-BOiGGAQ-.js";
import { _ as setStoredLanguage, a as BottomNav, f as importRecords, g as usePWA, h as themeManager, p as removeDuplicates, s as deleteImportedRecords } from "./index-ZKpehkra.js";
//#region src/pages/Profile/index.module.scss
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min(), 1);
var index_module_default = {
	pageContainer: "_pageContainer_1wym5_6",
	contentScroll: "_contentScroll_1wym5_18",
	profileHeader: "_profileHeader_1wym5_27",
	headerTitle: "_headerTitle_1wym5_35",
	userCard: "_userCard_1wym5_43",
	userInfo: "_userInfo_1wym5_66",
	userAvatar: "_userAvatar_1wym5_73",
	userDetails: "_userDetails_1wym5_80",
	userName: "_userName_1wym5_85",
	userStatus: "_userStatus_1wym5_92",
	statusOnline: "_statusOnline_1wym5_96",
	statusOffline: "_statusOffline_1wym5_100",
	authButtons: "_authButtons_1wym5_104",
	authBtn: "_authBtn_1wym5_110",
	syncSection: "_syncSection_1wym5_127",
	syncItem: "_syncItem_1wym5_149",
	syncInfo: "_syncInfo_1wym5_155",
	syncIcon: "_syncIcon_1wym5_161",
	syncTitle: "_syncTitle_1wym5_166",
	syncDesc: "_syncDesc_1wym5_172",
	menuSection: "_menuSection_1wym5_178",
	menuButton: "_menuButton_1wym5_185",
	menuTitle: "_menuTitle_1wym5_207",
	menuIcon: "_menuIcon_1wym5_216",
	installMenuItem: "_installMenuItem_1wym5_221",
	importOptions: "_importOptions_1wym5_229",
	importOption: "_importOption_1wym5_229",
	dangerOption: "_dangerOption_1wym5_243",
	importDesc: "_importDesc_1wym5_249",
	importTemplate: "_importTemplate_1wym5_255",
	templateTitle: "_templateTitle_1wym5_261",
	templateDesc: "_templateDesc_1wym5_268",
	exportOptions: "_exportOptions_1wym5_274",
	exportOption: "_exportOption_1wym5_274",
	exportDesc: "_exportDesc_1wym5_288",
	localModeNotice: "_localModeNotice_1wym5_294",
	noticeTitle: "_noticeTitle_1wym5_302",
	noticeDesc: "_noticeDesc_1wym5_309",
	dataManageSection: "_dataManageSection_1wym5_315",
	dangerSection: "_dangerSection_1wym5_322",
	sectionTitle: "_sectionTitle_1wym5_326",
	dataManageItem: "_dataManageItem_1wym5_344",
	itemInfo: "_itemInfo_1wym5_358",
	itemIcon: "_itemIcon_1wym5_364",
	itemTitle: "_itemTitle_1wym5_369",
	itemDesc: "_itemDesc_1wym5_374",
	settingsSection: "_settingsSection_1wym5_380",
	sectionLabel: "_sectionLabel_1wym5_387",
	settingsItem: "_settingsItem_1wym5_394",
	settingsInfo: "_settingsInfo_1wym5_411",
	settingsIcon: "_settingsIcon_1wym5_417",
	settingsTitle: "_settingsTitle_1wym5_422",
	settingsDesc: "_settingsDesc_1wym5_428",
	arrowIcon: "_arrowIcon_1wym5_434",
	languageSwitch: "_languageSwitch_1wym5_439",
	active: "_active_1wym5_448",
	themeRadioGroup: "_themeRadioGroup_1wym5_453",
	quickRecordSection: "_quickRecordSection_1wym5_466",
	quickRecordHeader: "_quickRecordHeader_1wym5_470",
	quickRecordTitle: "_quickRecordTitle_1wym5_477",
	quickRecordList: "_quickRecordList_1wym5_483",
	quickRecordItem: "_quickRecordItem_1wym5_489",
	quickRecordInfo: "_quickRecordInfo_1wym5_503",
	quickRecordIcon: "_quickRecordIcon_1wym5_509",
	quickRecordName: "_quickRecordName_1wym5_513",
	quickRecordAmount: "_quickRecordAmount_1wym5_519",
	featureIntroCard: "_featureIntroCard_1wym5_526",
	featureIntroHeader: "_featureIntroHeader_1wym5_553",
	featureIntroIcon: "_featureIntroIcon_1wym5_560",
	featureIntroText: "_featureIntroText_1wym5_565",
	featureIntroTitle: "_featureIntroTitle_1wym5_570",
	featureIntroDesc: "_featureIntroDesc_1wym5_576",
	featureIntroArrow: "_featureIntroArrow_1wym5_582",
	featureIntroGrid: "_featureIntroGrid_1wym5_588",
	featureIntroItem: "_featureIntroItem_1wym5_594",
	featureItemIcon: "_featureItemIcon_1wym5_605",
	featureOfflineHint: "_featureOfflineHint_1wym5_610"
};
//#endregion
//#region src/pages/Profile/index.tsx
var import_jsx_runtime = require_jsx_runtime();
var Profile = () => {
	const { t, i18n } = useTranslation();
	const { user, isLoggedIn, login, logout, register } = useAuth();
	const { isInstallable, isInstalled, triggerInstall } = usePWA();
	const navigate = useNavigate();
	const [loginModalVisible, setLoginModalVisible] = (0, import_react.useState)(false);
	const [registerModalVisible, setRegisterModalVisible] = (0, import_react.useState)(false);
	const [dataManageModalVisible, setDataManageModalVisible] = (0, import_react.useState)(false);
	const [settingsModalVisible, setSettingsModalVisible] = (0, import_react.useState)(false);
	const [isLoginLoading, setIsLoginLoading] = (0, import_react.useState)(false);
	const [isRegisterLoading, setIsRegisterLoading] = (0, import_react.useState)(false);
	const [isImportLoading, setIsImportLoading] = (0, import_react.useState)(false);
	const [syncEnabled, setSyncEnabled] = (0, import_react.useState)(false);
	const [loginForm] = Form.useForm();
	const [registerForm] = Form.useForm();
	const [theme, setTheme] = (0, import_react.useState)(themeManager.getTheme());
	const handleInstallApp = async () => {
		await triggerInstall();
	};
	(0, import_react.useEffect)(() => {
		return themeManager.subscribe((newTheme) => {
			setTheme(newTheme);
		});
	}, []);
	const handleOpenQuickRecord = () => {
		navigate("/quick-record-manage");
	};
	const handleThemeChange = (newTheme) => {
		themeManager.setTheme(newTheme);
		setTheme(newTheme);
		staticMethods.success(t("common.success"));
	};
	const handleOpenRecurring = () => {
		navigate("/recurring");
	};
	const handleOpenSavings = () => {
		navigate("/savings-manage");
	};
	const handleOpenMyFridge = () => {
		navigate("/my-fridge");
	};
	const handleOpenTimeManage = () => {
		navigate("/time-manage");
	};
	const handleLanguageChange = (checked) => {
		const newLang = checked ? "en-US" : "zh-CN";
		i18n.changeLanguage(newLang);
		setStoredLanguage(newLang);
		if (newLang.startsWith("en")) import_dayjs_min.default.locale("en");
		else import_dayjs_min.default.locale("zh-cn");
		staticMethods.success(t("common.success"));
	};
	const handleLogin = async (values) => {
		setIsLoginLoading(true);
		try {
			await login(values.username, values.password);
			staticMethods.success(t("profile.login") + t("common.success"));
			setLoginModalVisible(false);
			loginForm.resetFields();
		} catch {
			staticMethods.error(t("profile.login") + t("common.failed"));
		} finally {
			setIsLoginLoading(false);
		}
	};
	const handleRegister = async (values) => {
		if (values.password !== values.confirmPassword) {
			staticMethods.error("两次密码输入不一致");
			return;
		}
		setIsRegisterLoading(true);
		try {
			await register(values.username, values.password);
			staticMethods.success(t("profile.register") + t("common.success"));
			setRegisterModalVisible(false);
			registerForm.resetFields();
		} catch {
			staticMethods.error(t("profile.register") + t("common.failed"));
		} finally {
			setIsRegisterLoading(false);
		}
	};
	const handleExport = (type) => {
		const records = getLocalRecords();
		if (records.length === 0) {
			staticMethods.warning("暂无数据可导出");
			return;
		}
		if (type === "csv") exportToCSV(records);
		else exportToXLSX(records);
		staticMethods.success(t("profile.exportSuccess"));
	};
	const batchUploadRecords = async (records) => {
		const BATCH_SIZE = 1e3;
		let totalSuccess = 0;
		let totalFailed = 0;
		for (let i = 0; i < records.length; i += BATCH_SIZE) {
			const result = await importRecords(records.slice(i, i + BATCH_SIZE));
			totalSuccess += result.success;
			totalFailed += result.failed;
		}
		return {
			success: totalSuccess,
			failed: totalFailed
		};
	};
	const handleImport = async (file, type) => {
		setIsImportLoading(true);
		try {
			const { records, stats } = type === "csv" ? await importFromCSV(file) : await importFromXLSX(file);
			if (records.length === 0) {
				staticMethods.warning("未找到有效数据");
				return;
			}
			const validRecords = records.map((r) => ({
				type: r.type || "expense",
				category: r.category || "其他",
				subCategory: r.subCategory,
				categoryIcon: r.categoryIcon || "📦",
				subCategoryIcon: r.subCategoryIcon,
				amount: r.amount || 0,
				remark: r.remark || "",
				date: parseDate(r.date),
				account: r.account || "现金"
			}));
			console.log(`导入数据转换完成:`, validRecords, validRecords.map((r) => formatDateTimeFull(r.date)));
			const report = generateImportReport(stats);
			console.log(report);
			if (isLoggedIn) {
				const result = await batchUploadRecords(validRecords);
				const successMsg = `成功导入 ${result.success} 条记录${result.failed > 0 ? `，失败 ${result.failed} 条` : ""}`;
				const detailMsg = `匹配: ${stats.matched}条, 未匹配: ${stats.unmatched}条`;
				staticMethods.success(`${successMsg}\n${detailMsg}`);
			} else {
				const existingRecords = getLocalRecords();
				saveLocalRecords([...validRecords, ...existingRecords]);
				const successMsg = `成功导入 ${validRecords.length} 条记录`;
				const detailMsg = `匹配: ${stats.matched}条, 未匹配: ${stats.unmatched}条`;
				staticMethods.success(`${successMsg}\n${detailMsg}`);
			}
			if (stats.unmatchedCategories.length > 0) staticMethods.warning(`有 ${stats.unmatchedCategories.length} 个分类未匹配，已归入"其他"分类，请查看备注`);
			setDataManageModalVisible(false);
		} catch (error) {
			staticMethods.error(t("profile.importFailed"));
			console.error("Import error:", error);
		} finally {
			setIsImportLoading(false);
		}
	};
	const handleDeleteImported = () => {
		Modal.confirm({
			title: t("common.confirm"),
			content: "此操作将删除所有通过导入功能添加的记录，确定要继续吗？",
			okType: "danger",
			onOk: async () => {
				try {
					if (isLoggedIn) {
						const result = await deleteImportedRecords();
						staticMethods.success(`已删除 ${result.deleted} 条导入记录`);
					} else staticMethods.warning("请先登录后再操作");
				} catch (error) {
					staticMethods.error(t("common.failed"));
					console.error("Delete imported error:", error);
				}
			}
		});
	};
	const handleClearData = () => {
		Modal.confirm({
			title: t("common.confirm"),
			content: "此操作将清空所有本地数据，不可恢复，确定要继续吗？",
			okType: "danger",
			onOk: () => {
				clearAllData();
				staticMethods.success(t("common.success"));
			}
		});
	};
	const handleExportFullBackup = () => {
		try {
			exportFullBackup();
			staticMethods.success("备份文件已导出，请妥善保存");
		} catch (error) {
			staticMethods.error("导出失败，请重试");
			console.error("Export full backup error:", error);
		}
	};
	const handleFullImport = (file) => {
		Modal.confirm({
			title: "恢复备份",
			content: "导入备份将覆盖当前所有本地数据（记录、分类、预算、攒钱计划、冰箱等），此操作不可撤销。确定继续吗？",
			okType: "danger",
			onOk: async () => {
				setIsFullImportLoading(true);
				try {
					const result = await importFullBackup(file);
					staticMethods.success(`备份恢复成功：共恢复 ${result.restoredKeys.length} 项数据（${result.recordCount} 条记录），即将刷新页面`);
					setTimeout(() => window.location.reload(), 1200);
				} catch (error) {
					staticMethods.error(error instanceof Error ? error.message : "恢复失败，请检查备份文件");
					console.error("Import full backup error:", error);
				} finally {
					setIsFullImportLoading(false);
				}
			}
		});
	};
	const handleRemoveDuplicates = () => {
		Modal.confirm({
			title: t("common.confirm"),
			content: "此操作将删除日期、金额、分类、类型完全相同的重复记录，保留最新的一条。确定要继续吗？",
			okType: "danger",
			onOk: async () => {
				try {
					if (isLoggedIn) {
						const result = await removeDuplicates();
						staticMethods.success(`已删除 ${result.removed} 条重复记录`);
					} else {
						const records = getLocalRecords();
						const seen = /* @__PURE__ */ new Map();
						const duplicates = [];
						records.forEach((record) => {
							const key = `${formatDateKey(record.date)}_${record.amount}_${record.category}_${record.type}`;
							if (seen.has(key)) {
								const existing = seen.get(key);
								if (compareDate(record.date, existing.date) > 0) {
									duplicates.push(existing);
									seen.set(key, record);
								} else duplicates.push(record);
							} else seen.set(key, record);
						});
						saveLocalRecords(Array.from(seen.values()));
						staticMethods.success(`已删除 ${duplicates.length} 条重复记录`);
					}
				} catch (error) {
					staticMethods.error(t("profile.removeFailed"));
					console.error("Remove duplicates error:", error);
				}
			}
		});
	};
	const [isFullImportLoading, setIsFullImportLoading] = (0, import_react.useState)(false);
	const mainMenuItems = [
		{
			title: t("profile.budget", "预算管理"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, {}),
			onClick: () => navigate("/budget")
		},
		{
			title: "快捷记账",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$1, {}),
			onClick: handleOpenQuickRecord
		},
		...[{
			title: "定时记账",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$2, {}),
			onClick: handleOpenRecurring
		}],
		{
			title: "攒钱计划",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, {}),
			onClick: handleOpenSavings
		},
		{
			title: "我的冰箱",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$3, {}),
			onClick: handleOpenMyFridge
		},
		{
			title: "时间管理",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$4, {}),
			onClick: handleOpenTimeManage
		},
		{
			title: t("profile.dataManagement"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$5, {}),
			onClick: () => setDataManageModalVisible(true)
		},
		{
			title: t("profile.settings"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$6, {}),
			onClick: () => setSettingsModalVisible(true)
		},
		...!isInstalled && isInstallable ? [{
			title: t("pwa.install", "安装应用"),
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$7, {}),
			onClick: handleInstallApp,
			className: index_module_default.installMenuItem
		}] : []
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: index_module_default.pageContainer,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: index_module_default.profileHeader,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: index_module_default.headerTitle,
					children: t("profile.title")
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default.contentScroll,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.userCard,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.userInfo,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
								size: 64,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$8, {}),
								className: index_module_default.userAvatar
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.userDetails,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default.userName,
									children: "本地模式"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default.userStatus,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: index_module_default.statusOffline,
										children: "数据保存在本机·请定期备份"
									})
								})]
							})]
						}), false]
					}),
					false,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.featureIntroCard,
						onClick: () => navigate("/features"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.featureIntroHeader,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: index_module_default.featureIntroIcon,
										children: "🌾"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: index_module_default.featureIntroText,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: index_module_default.featureIntroTitle,
											children: "功能介绍与使用说明"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: index_module_default.featureIntroDesc,
											children: "了解全部功能，快速上手记账"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$12, { className: index_module_default.featureIntroArrow })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.featureIntroGrid,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: index_module_default.featureIntroItem,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: index_module_default.featureItemIcon,
											children: "📝"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "快速记账" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: index_module_default.featureIntroItem,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: index_module_default.featureItemIcon,
											children: "📊"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "统计报表" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: index_module_default.featureIntroItem,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: index_module_default.featureItemIcon,
											children: "💰"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "预算管理" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: index_module_default.featureIntroItem,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: index_module_default.featureItemIcon,
											children: "🎯"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "攒钱计划" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: index_module_default.featureIntroItem,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: index_module_default.featureItemIcon,
											children: "🧊"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "我的冰箱" })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: index_module_default.featureIntroItem,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: index_module_default.featureItemIcon,
											children: "💾"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "数据管理" })]
									})
								]
							}),
							!isLoggedIn && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.featureOfflineHint,
								children: "💾 本地模式：数据保存在本机，可在「数据管理」中备份"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default.menuSection,
						children: mainMenuItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: `${index_module_default.menuButton} ${item.className || ""}`,
							onClick: item.onClick,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: index_module_default.menuTitle,
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: index_module_default.menuIcon,
								children: item.icon
							})]
						}, item.title))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
				title: t("profile.settings"),
				open: settingsModalVisible,
				onCancel: () => setSettingsModalVisible(false),
				footer: null,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default.settingsSection,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.sectionLabel,
							children: t("profile.aboutApp", "关于应用")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.settingsItem,
							onClick: () => {
								navigate("/changelog");
								setSettingsModalVisible(false);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.settingsInfo,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$13, { className: index_module_default.settingsIcon }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default.settingsTitle,
									children: t("profile.changelog", "版本日志")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default.settingsDesc,
									children: t("profile.changelogDesc", "查看更新历史")
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$12, { className: index_module_default.arrowIcon })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.settingsItem,
							onClick: () => {
								navigate("/features");
								setSettingsModalVisible(false);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.settingsInfo,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$14, { className: index_module_default.settingsIcon }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default.settingsTitle,
									children: t("profile.features", "功能简介")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default.settingsDesc,
									children: t("profile.featuresDesc", "了解应用功能")
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$12, { className: index_module_default.arrowIcon })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.settingsItem,
							onClick: () => {
								navigate("/about");
								setSettingsModalVisible(false);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.settingsInfo,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$15, { className: index_module_default.settingsIcon }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default.settingsTitle,
									children: t("profile.about", "关于我")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default.settingsDesc,
									children: t("profile.aboutDesc", "开发者信息")
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$12, { className: index_module_default.arrowIcon })]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default.settingsSection,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.sectionLabel,
							children: t("profile.preferences", "偏好设置")
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.settingsItem,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.settingsInfo,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$16, { className: index_module_default.settingsIcon }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default.settingsTitle,
									children: t("profile.language")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: index_module_default.settingsDesc,
									children: [
										t("profile.languageZh"),
										" / ",
										t("profile.languageEn")
									]
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.languageSwitch,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: i18n.language === "zh-CN" ? index_module_default.active : "",
										children: t("profile.languageZh")
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
										checked: i18n.language === "en-US",
										onChange: handleLanguageChange
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: i18n.language === "en-US" ? index_module_default.active : "",
										children: t("profile.languageEn")
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.settingsItem,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.settingsInfo,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default.settingsIcon,
									children: themeManager.getIsDarkMode() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$17, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$18, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default.settingsTitle,
									children: t("profile.theme", "主题模式")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default.settingsDesc,
									children: theme === "light" ? t("profile.lightMode", "日间模式") : theme === "dark" ? t("profile.darkMode", "夜间模式") : t("profile.followSystem", "跟随系统")
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Radio.Group, {
								value: theme,
								onChange: (e) => handleThemeChange(e.target.value),
								size: "small",
								className: index_module_default.themeRadioGroup,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio.Button, {
										value: "light",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$18, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio.Button, {
										value: "dark",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$17, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio.Button, {
										value: "system",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$19, {})
									})
								]
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: t("profile.login"),
				open: false,
				onCancel: () => setLoginModalVisible(false),
				footer: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form, {
					form: loginForm,
					onFinish: handleLogin,
					layout: "vertical",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
							name: "username",
							label: "用户名",
							rules: [{
								required: true,
								message: "请输入用户名"
							}],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { placeholder: "请输入用户名" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
							name: "password",
							label: "密码",
							rules: [{
								required: true,
								message: "请输入密码"
							}],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.Password, { placeholder: "请输入密码" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
							type: "primary",
							htmlType: "submit",
							loading: isLoginLoading,
							block: true,
							children: t("profile.login")
						}) })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				title: t("common.register"),
				open: false,
				onCancel: () => setRegisterModalVisible(false),
				footer: null,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form, {
					form: registerForm,
					onFinish: handleRegister,
					layout: "vertical",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
							name: "username",
							label: "用户名",
							rules: [{
								required: true,
								message: "请输入用户名"
							}],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, { placeholder: "请输入用户名" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
							name: "password",
							label: "密码",
							rules: [{
								required: true,
								message: "请输入密码"
							}],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.Password, { placeholder: "请输入密码" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, {
							name: "confirmPassword",
							label: "确认密码",
							rules: [{
								required: true,
								message: "请确认密码"
							}],
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input.Password, { placeholder: "请确认密码" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form.Item, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
							type: "primary",
							htmlType: "submit",
							loading: isRegisterLoading,
							block: true,
							children: t("common.register")
						}) })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
				title: t("profile.dataManagement"),
				open: dataManageModalVisible,
				onCancel: () => !isImportLoading && setDataManageModalVisible(false),
				footer: null,
				maskClosable: !isImportLoading,
				closable: !isImportLoading,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.localModeNotice,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.noticeTitle,
							children: "💾 本地模式运行中"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.noticeDesc,
							children: "当前版本数据仅保存在本机（浏览器），应用不会上传任何数据。 建议定期使用下方「完整备份」导出数据文件妥善保存， 更换设备或清除浏览器数据后可通过导入备份完美恢复。"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.dataManageSection,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.sectionTitle,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$20, {}), " 完整备份（推荐）"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.sectionContent,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.exportOptionsInline,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$21, {}),
									onClick: handleExportFullBackup,
									disabled: isFullImportLoading,
									children: "导出备份"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
									accept: ".json",
									showUploadList: false,
									beforeUpload: (file) => {
										handleFullImport(file);
										return false;
									},
									disabled: isFullImportLoading,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$22, {}),
										loading: isFullImportLoading,
										children: "导入备份"
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.sectionDesc,
								children: "导出为 JSON 文件，包含记录、分类、预算、攒钱计划、冰箱、快捷记账等全部数据，导入后完整恢复"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.dataManageSection,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.sectionTitle,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$22, {}),
								" ",
								t("profile.importData")
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.sectionContent,
							children: isImportLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.importLoading,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spin, {
									size: "default",
									tip: "正在导入数据，请稍候..."
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.importOptionsInline,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
									accept: ".csv",
									showUploadList: false,
									beforeUpload: (file) => {
										handleImport(file, "csv");
										return false;
									},
									disabled: isImportLoading,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$23, {}),
										loading: isImportLoading,
										children: "CSV"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, {
									accept: ".xlsx,.xls",
									showUploadList: false,
									beforeUpload: (file) => {
										handleImport(file, "xlsx");
										return false;
									},
									disabled: isImportLoading,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$24, {}),
										loading: isImportLoading,
										children: "Excel"
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.sectionDesc,
								children: "支持 CSV、Excel 格式文件导入"
							})] })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.dataManageSection,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.sectionTitle,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$21, {}),
								" ",
								t("profile.exportData")
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.sectionContent,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default.exportOptionsInline,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$23, {}),
									onClick: () => {
										handleExport("csv");
										setDataManageModalVisible(false);
									},
									children: "CSV"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
									icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$24, {}),
									onClick: () => {
										handleExport("xlsx");
										setDataManageModalVisible(false);
									},
									children: "Excel"
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.sectionDesc,
								children: "导出为 CSV 或 Excel 格式文件"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.dataManageSection,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.sectionTitle,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$25, {}),
								" ",
								t("profile.removeDuplicates")
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.sectionContent,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$25, {}),
								onClick: () => {
									setDataManageModalVisible(false);
									handleRemoveDuplicates();
								},
								children: "删除重复记录"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.sectionDesc,
								children: "删除日期、金额、分类、类型相同的重复记录"
							})]
						})]
					}),
					isLoggedIn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "data-manage-section danger-section",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.sectionTitle,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$26, {}), " 导入记录管理"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.sectionContent,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
								danger: true,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$26, {}),
								onClick: () => {
									setDataManageModalVisible(false);
									handleDeleteImported();
								},
								children: "删除所有导入记录"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.sectionDesc,
								children: "删除所有通过导入功能添加的记录"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "data-manage-section danger-section",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.sectionTitle,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$26, {}),
								" ",
								t("profile.clearData", "清空本地数据")
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: index_module_default.sectionContent,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
								danger: true,
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$26, {}),
								onClick: () => {
									setDataManageModalVisible(false);
									handleClearData();
								},
								children: t("profile.clearData", "清空本地数据")
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default.sectionDesc,
								children: "清空所有本地数据，不可恢复"
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default.importTemplate,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.templateTitle,
							children: "导入文件格式说明："
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default.templateDesc,
							children: "文件需包含以下列：日期、类型（支出/收入）、金额、分类、分类小项（可选）、备注（可选）"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})
		]
	});
};
//#endregion
export { Profile as default };

//# sourceMappingURL=Profile-DoJgqwha.js.map