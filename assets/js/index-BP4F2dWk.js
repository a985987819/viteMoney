const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["./AddRecord-DvuAcfy4.js","./rolldown-runtime-DZjNq3_i.js","./vendor-react-BwfiEprq.js","./vendor-others-DR5UvigV.js","./vendor-ui-BCl3WSDB.js","./useAuth-CcfI1Ahe.js","./vendor-utils-BEedu1iR.js","./storage-D-qjG_21.js","../css/AddRecord-CKtE6h7Q.css","./Statistics-DO2RjHHm.js","./vendor-charts--BsBbs0R.js","./useCategories-vZHVOlh1.js","./categoryIconMapping-C7E85sDI.js","./importExport-YSO-S5kA.js","./spriteIcons-D-QipidE.js","../css/Statistics-BI-P9ofL.css","./SavingsOperate-DZwVWi7j.js","./savings-Cyt6y-yF.js","../css/SavingsOperate-BN-Uym4Q.css","./Savings-ByF1bpDR.js","./PageHeader-C0Ff_keA.js","../css/PageHeader-CqIzLVej.css","../css/Savings-VdWpkJtE.css","./Profile-DH2kE_9r.js","../css/Profile-D0vIe3z6.css","./CategoryManage-BGk2nbY-.js","../css/CategoryManage-B0irSfcu.css","./Budget-nriRcgml.js","../css/Budget-D_ivkk4P.css","./Changelog-BB-kMgoX.js","./cdn-ByyAaq0Z.js","../css/Changelog-ROTg0imL.css","./Features-BT4KgcUk.js","../css/Features-C4jXfFEe.css","./About-C7R0tBLu.js","../css/About-Bo5NQwMH.css","./Recurring-BguxFLrG.js","../css/Recurring-Cu_39xW6.css","./QuickRecordManage-BKDn4ZU_.js","../css/QuickRecordManage-BsxZPtge.css","./MyFridge-C9nNtLBd.js","../css/MyFridge-BZVxVg5o.css","./TimeManage-BrrNpV1M.js","../css/TimeManage-LoJgw60k.css"])))=>i.map(i=>d[i]);
import { r as __toESM } from "./rolldown-runtime-DZjNq3_i.js";
import { Ct as RefIcon$3, U as RefIcon$5, X as RefIcon$2, Y as RefIcon$1, _ as RefIcon$4, ar as require_react, ct as RefIcon$9, hn as RefIcon$6, rr as require_client, s as RefIcon, st as RefIcon$8, v as RefIcon$7 } from "./vendor-others-DR5UvigV.js";
import { n as instance, t as Browser } from "./vendor-i18n-ebHaNxZV.js";
import { _ as initReactI18next, c as createBrowserRouter, d as useNavigate, f as useRouteError, g as useTranslation, h as withTranslation, l as isRouteErrorResponse, m as __vitePreload, n as require_jsx_runtime, o as RouterProvider2, s as Navigate, u as useLocation } from "./vendor-react-BwfiEprq.js";
import { A as ConfigProvider, T as button_default, a as Tag, c as Popconfirm, d as List, f as Spin, k as App$1, l as Modal, t as require_zh_CN, u as staticMethods, w as require_dayjs_min } from "./vendor-ui-BCl3WSDB.js";
import { n as require_zh_cn, t as require_en } from "./vendor-utils-BEedu1iR.js";
import { $ as isYesterday, D as saveLocalRecords, F as requestPersistentStorage, H as DATE_FORMAT, K as formatDisplayMonth, O as saveQuickRecords, Q as isToday, U as formatDateKey, X as formatMonthKey, Z as formatTimeOnly, _ as getLocalCategories, h as getLocalBudget, n as addLocalRecord, q as formatDisplayMonthDay, v as getLocalRecords, y as getQuickRecords } from "./storage-D-qjG_21.js";
import { i as http, n as useAuth, t as AuthProvider } from "./useAuth-CcfI1Ahe.js";
import { d as initializeDataStore, o as getTimestamp, t as compareDate } from "./importExport-YSO-S5kA.js";
import { i as CDN_PRELOAD_SECONDARY, n as CDN_IMAGES, r as CDN_PRELOAD_CRITICAL, t as CDN_BASE_URL } from "./cdn-ByyAaq0Z.js";
import { t as getCategoryEmoji } from "./spriteIcons-D-QipidE.js";
//#region \0vite/modulepreload-polyfill.js
(function polyfill() {
	const relList = document.createElement("link").relList;
	if (relList && relList.supports && relList.supports("modulepreload")) return;
	for (const link of document.querySelectorAll("link[rel=\"modulepreload\"]")) processPreload(link);
	new MutationObserver((mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== "childList") continue;
			for (const node of mutation.addedNodes) if (node.tagName === "LINK" && node.rel === "modulepreload") processPreload(node);
		}
	}).observe(document, {
		childList: true,
		subtree: true
	});
	function getFetchOpts(link) {
		const fetchOpts = {};
		if (link.integrity) fetchOpts.integrity = link.integrity;
		if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
		if (link.crossOrigin === "use-credentials") fetchOpts.credentials = "include";
		else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
		else fetchOpts.credentials = "same-origin";
		return fetchOpts;
	}
	function processPreload(link) {
		if (link.ep) return;
		link.ep = true;
		const fetchOpts = getFetchOpts(link);
		fetch(link.href, fetchOpts);
	}
})();
//#endregion
//#region src/index.scss
var import_client = require_client();
var zh_CN_default = {
	app: {
		"name": "星露账本",
		"title": "星露账本 - 像素风格记账"
	},
	nav: {
		"home": "主页",
		"statistics": "统计",
		"savings": "攒钱",
		"profile": "我的"
	},
	statistics: {
		"title": "统计报表",
		"monthly": "按月",
		"category": "按分类",
		"trend": "趋势",
		"expense": "支出",
		"income": "收入",
		"total": "总计",
		"noData": "暂无数据"
	},
	savings: {
		"title": "攒钱计划",
		"subtitle": "正在建设中...",
		"comingSoon": "攒钱功能即将上线！",
		"stayTuned": "敬请期待~",
		"goal": "储蓄目标",
		"goalDesc": "设定你的储蓄目标，追踪进度",
		"analysis": "储蓄分析",
		"analysisDesc": "分析储蓄习惯，优化理财计划",
		"achievement": "成就系统",
		"achievementDesc": "完成储蓄挑战，解锁成就徽章",
		"plantSeed": "种下一颗储蓄的种子，收获财富的果实",
		"totalSaved": "已攒金额",
		"totalTarget": "目标金额",
		"myPlans": "我的攒钱计划",
		"createPlan": "创建计划",
		"noPlans": "暂无攒钱计划",
		"createFirstPlan": "创建第一个计划",
		"deposit": "攒钱",
		"completed": "已完成",
		"inProgress": "进行中",
		"saved": "已攒",
		"target": "目标",
		"dailyAverage": "每日均攒",
		"daysRemaining": "剩余天数",
		"startDate": "开始日期",
		"endDate": "截止日期",
		"planName": "计划名称",
		"planNameRequired": "请输入计划名称",
		"planNamePlaceholder": "例如：买房计划、旅行基金",
		"targetAmount": "目标金额",
		"targetAmountRequired": "请输入目标金额",
		"targetAmountPlaceholder": "输入目标金额",
		"endDateRequired": "请选择截止日期",
		"endDatePlaceholder": "选择截止日期",
		"depositTo": "攒钱到",
		"confirmDeposit": "确认攒钱",
		"depositType": "攒钱方式",
		"average": "平均攒钱",
		"averageDesc": "按每日平均金额攒钱",
		"random": "随机攒钱",
		"randomDesc": "随机金额（±20% 浮动）",
		"manual": "主动攒钱",
		"manualDesc": "自定义攒钱金额",
		"amount": "金额",
		"amountRequired": "请输入金额",
		"amountPlaceholder": "输入攒钱金额",
		"remark": "备注",
		"remarkPlaceholder": "可选，记录这次攒钱的原因",
		"depositSuccess": "攒钱成功",
		"depositFailed": "攒钱失败",
		"planCreated": "攒钱计划创建成功",
		"planCreateFailed": "创建失败",
		"deletePlanConfirm": "确定要删除这个攒钱计划吗？",
		"manualDeposit": "主动攒钱",
		"clickInput": "点击输入"
	},
	home: {
		"monthlyExpense": "本月支出",
		"monthlyIncome": "本月收入",
		"balance": "结余",
		"addRecord": "记一笔",
		"recentRecords": "最近记账",
		"viewMore": "查看更多",
		"noRecords": "暂无记账记录",
		"yuan": "元",
		"today": "今天",
		"yesterday": "昨天",
		"dateFormat": "M月D日",
		"monthFormat": "M月",
		"budgetRemaining": "预算剩余",
		"expenseShort": "支",
		"incomeShort": "收"
	},
	bill: {
		"title": "账单",
		"expense": "支出",
		"income": "收入",
		"balance": "结余",
		"statistics": "统计",
		"expand": "展开统计",
		"collapse": "收起统计",
		"noRecords": "暂无账单记录",
		"delete": "删除",
		"edit": "编辑",
		"deleteConfirm": "确定要删除这条记录吗？",
		"deleteSuccess": "删除成功",
		"deleteFailed": "删除失败"
	},
	profile: {
		"title": "我的",
		"settings": "设置",
		"language": "语言",
		"languageZh": "中文",
		"languageEn": "English",
		"dataManagement": "数据管理",
		"importData": "数据导入",
		"exportData": "数据导出",
		"removeDuplicates": "数据去重",
		"importSuccess": "导入成功",
		"importFailed": "导入失败",
		"exportSuccess": "导出成功",
		"exportFailed": "导出失败",
		"removeSuccess": "去重成功",
		"removeFailed": "去重失败",
		"login": "登录",
		"logout": "退出登录",
		"notLoggedIn": "未登录",
		"guest": "游客",
		"budget": "预算管理",
		"clearData": "清空本地数据",
		"aboutApp": "关于应用",
		"preferences": "偏好设置",
		"changelog": "版本日志",
		"changelogDesc": "查看更新历史",
		"features": "功能简介",
		"featuresDesc": "了解应用功能",
		"about": "关于我",
		"aboutDesc": "开发者信息"
	},
	budget: {
		"title": "预算管理",
		"currentMonth": "本月预算",
		"setBudget": "设置预算",
		"editBudget": "编辑预算",
		"deleteBudget": "删除预算",
		"budgetAmount": "预算金额",
		"spent": "已支出",
		"remaining": "剩余",
		"percentage": "已使用",
		"overBudget": "超支",
		"nearLimit": "即将超支",
		"normal": "正常",
		"totalBudget": "预算总额",
		"lastMonth": "上月支出",
		"averageSpent": "平均月支出",
		"history": "历史预算",
		"noBudget": "本月尚未设置预算",
		"setBudgetFirst": "请先设置预算",
		"budgetSetSuccess": "预算设置成功",
		"budgetSetFailed": "预算设置失败",
		"budgetDeleteSuccess": "预算删除成功",
		"budgetDeleteFailed": "预算删除失败",
		"selectMonth": "选择月份",
		"enterAmount": "请输入预算金额",
		"confirmDelete": "确定要删除该预算吗？"
	},
	addRecord: {
		"title": "记一笔",
		"editTitle": "编辑记录",
		"expense": "支出",
		"income": "收入",
		"transfer": "转账",
		"debt": "借贷",
		"reimbursement": "报销",
		"amount": "金额",
		"category": "分类",
		"subCategory": "子分类",
		"account": "账户",
		"date": "日期",
		"time": "时间",
		"remark": "备注",
		"save": "保存",
		"update": "更新",
		"calculate": "计算",
		"saveAgain": "再记",
		"cancel": "取消",
		"amountPlaceholder": "请输入金额",
		"remarkPlaceholder": "请输入备注信息(最多50字)",
		"saveSuccess": "保存成功",
		"saveFailed": "保存失败",
		"updateSuccess": "更新成功",
		"updateFailed": "更新失败",
		"amountRequired": "请输入金额",
		"categoryRequired": "请选择分类",
		"selectSubCategory": "选择子分类",
		"selectDate": "选择日期",
		"selectMonth": "选择月份",
		"selectYear": "选择年份",
		"byDay": "按日",
		"byMonth": "按月",
		"byYear": "按年",
		"defaultAccount": "默认账本"
	},
	category: {
		"title": "分类管理",
		"expense": "支出分类",
		"income": "收入分类",
		"add": "添加分类",
		"edit": "编辑分类",
		"delete": "删除分类",
		"name": "名称",
		"namePlaceholder": "请输入分类名称",
		"icon": "图标",
		"deleteConfirm": "确定删除该分类吗？",
		"deleteSuccess": "删除成功",
		"deleteFailed": "删除失败",
		"addSuccess": "添加成功",
		"addFailed": "添加失败",
		"editSuccess": "修改成功",
		"editFailed": "修改失败",
		"nameRequired": "请输入分类名称"
	},
	common: {
		"confirm": "确定",
		"cancel": "取消",
		"save": "保存",
		"delete": "删除",
		"edit": "编辑",
		"add": "添加",
		"close": "关闭",
		"back": "返回",
		"loading": "加载中...",
		"loadFailed": "加载数据失败",
		"success": "成功",
		"failed": "失败",
		"error": "错误",
		"retry": "重试",
		"empty": "暂无数据",
		"yuan": "元",
		"register": "注册",
		"username": "用户名",
		"password": "密码",
		"confirmPassword": "确认密码",
		"usernamePlaceholder": "请输入用户名",
		"passwordPlaceholder": "请输入密码",
		"confirmPasswordPlaceholder": "请确认密码",
		"passwordMismatch": "两次密码输入不一致",
		"loginSuccess": "登录成功",
		"logoutSuccess": "已退出登录",
		"registerSuccess": "注册成功",
		"noData": "暂无数据可导出",
		"imported": "已导入",
		"deleted": "已删除",
		"records": "条记录",
		"failedRecords": "失败",
		"validRecords": "条有效数据",
		"noValidData": "未找到有效数据",
		"removed": "已删除",
		"duplicateRecords": "条重复记录",
		"removeDuplicatesConfirm": "确定要删除重复记录吗？",
		"clearDataConfirm": "确定要清空所有数据吗？此操作不可恢复！",
		"clearData": "清空数据",
		"minAmount": "最小金额",
		"maxAmount": "最大金额",
		"filter": "筛选",
		"sort": "排序",
		"sortByTime": "按时间",
		"sortByAmount": "按金额",
		"ascending": "升序",
		"descending": "降序"
	},
	error: {
		"title": "哎呀，出错了！",
		"description": "农场好像遇到了一些问题...",
		"notYourFault": "别担心，这不是你的错！",
		"tryRefresh": "试试刷新页面或返回首页",
		"refresh": "刷新页面",
		"goHome": "返回首页",
		"chartErrorTitle": "图表加载失败",
		"chartErrorDescription": "统计图表暂时无法显示，可能是数据加载出现了问题。"
	},
	loading: {
		"title": "星露账本",
		"loading": "加载资源中...",
		"preparing": "正在准备农场...",
		"openingLedger": "正在打开账本...",
		"complete": "加载完成！"
	},
	pwa: {
		"install": "安装星露账本",
		"installDesc": "添加到主屏幕，离线也能记账",
		"installBtn": "安装",
		"dismiss": "暂不",
		"offline": "当前处于离线模式，部分功能可能不可用",
		"update": "新版本可用，点击刷新更新",
		"updateBtn": "立即更新"
	},
	changelog: {
		"title": "版本日志",
		"tagFeature": "新功能",
		"tagFix": "修复",
		"tagOptimize": "优化",
		"footerNote": "持续更新中，敬请期待更多功能..."
	},
	features: {
		"title": "功能简介",
		"welcomeTitle": "欢迎来到星露谷记账本",
		"welcomeText": "一款像素风格的多功能记账应用，让记账变得简单有趣",
		"sectionTitle": "核心功能",
		"tipsTitle": "💡 使用小贴士",
		"tip1": "左滑账单可快速删除",
		"tip2": "点击眼睛图标可隐藏金额",
		"tip3": "长按分类可查看更多选项",
		"tip4": "支持安装为桌面应用（PWA）",
		"record": {
			"title": "快速记账",
			"description": "简单快捷的记账体验",
			"detail1": "支持支出和收入两种类型",
			"detail2": "内置计算器，方便计算金额",
			"detail3": "丰富的分类选择，支持二级分类",
			"detail4": "支持添加备注和选择日期"
		},
		"statistics": {
			"title": "统计报表",
			"description": "直观的图表分析",
			"detail1": "月度收支统计一目了然",
			"detail2": "饼图展示支出分类占比",
			"detail3": "趋势图展示收支变化",
			"detail4": "支持按日期筛选账单"
		},
		"budget": {
			"title": "预算管理",
			"description": "合理规划每月支出",
			"detail1": "设置每月支出预算",
			"detail2": "实时查看预算使用进度",
			"detail3": "预算超支提醒",
			"detail4": "查看历史预算执行情况"
		},
		"category": {
			"title": "分类管理",
			"description": "自定义收支分类",
			"detail1": "丰富的预设分类",
			"detail2": "支持自定义二级分类",
			"detail3": "每个分类配有专属图标",
			"detail4": "分类颜色区分"
		},
		"data": {
			"title": "数据管理",
			"description": "安全便捷的数据处理",
			"detail1": "支持 CSV/Excel 格式导入导出",
			"detail2": "本地存储保障隐私",
			"detail3": "登录后数据云端同步",
			"detail4": "支持清空本地数据"
		},
		"style": {
			"title": "星露谷风格",
			"description": "独特的像素风格设计",
			"detail1": "复古像素字体",
			"detail2": "木质纹理界面",
			"detail3": "游戏元素装饰",
			"detail4": "流畅的动画效果"
		}
	},
	about: {
		"title": "关于我",
		"appName": "星露谷记账本",
		"stable": "稳定版",
		"intro": "一款以《星露谷物语》为设计灵感的记账应用，将游戏化的像素风格与实用的记账功能相结合，让记账变得简单有趣。",
		"highlights": "产品特色",
		"feature1Title": "像素风格",
		"feature1Desc": "星露谷主题设计",
		"feature2Title": "快速记账",
		"feature2Desc": "3秒完成记录",
		"feature3Title": "数据分析",
		"feature3Desc": "图表直观展示",
		"feature4Title": "隐私保护",
		"feature4Desc": "本地存储安全",
		"techStack": "技术栈",
		"contact": "联系我们",
		"email": "邮件反馈",
		"thanks": "感谢使用星露谷记账本！如果您有任何建议或反馈，欢迎随时联系我们。",
		"license": "开源协议：MIT License"
	}
};
var en_US_default = {
	app: {
		"name": "Stardew Ledger",
		"title": "Stardew Ledger - Pixel Style Accounting"
	},
	nav: {
		"home": "Home",
		"statistics": "Stats",
		"savings": "Savings",
		"profile": "Profile"
	},
	statistics: {
		"title": "Statistics",
		"monthly": "Monthly",
		"category": "By Category",
		"trend": "Trend",
		"expense": "Expense",
		"income": "Income",
		"total": "Total",
		"noData": "No data available"
	},
	savings: {
		"title": "Savings Plan",
		"subtitle": "Under Construction...",
		"comingSoon": "Savings feature coming soon!",
		"stayTuned": "Stay tuned~",
		"goal": "Savings Goal",
		"goalDesc": "Set your savings goals and track progress",
		"analysis": "Savings Analysis",
		"analysisDesc": "Analyze savings habits and optimize plans",
		"achievement": "Achievements",
		"achievementDesc": "Complete savings challenges and unlock badges",
		"plantSeed": "Plant a seed of savings, harvest the fruit of wealth",
		"totalSaved": "Total Saved",
		"totalTarget": "Target Amount",
		"myPlans": "My Savings Plans",
		"createPlan": "Create Plan",
		"noPlans": "No savings plans yet",
		"createFirstPlan": "Create First Plan",
		"deposit": "Deposit",
		"completed": "Completed",
		"inProgress": "In Progress",
		"saved": "Saved",
		"target": "Target",
		"dailyAverage": "Daily Average",
		"daysRemaining": "Days Left",
		"startDate": "Start Date",
		"endDate": "End Date",
		"planName": "Plan Name",
		"planNameRequired": "Please enter plan name",
		"planNamePlaceholder": "e.g., House Fund, Travel Budget",
		"targetAmount": "Target Amount",
		"targetAmountRequired": "Please enter target amount",
		"targetAmountPlaceholder": "Enter target amount",
		"endDateRequired": "Please select end date",
		"endDatePlaceholder": "Select end date",
		"depositTo": "Deposit to",
		"confirmDeposit": "Confirm Deposit",
		"depositType": "Deposit Type",
		"average": "Average",
		"averageDesc": "Deposit by daily average amount",
		"random": "Random",
		"randomDesc": "Random amount (±20% fluctuation)",
		"manual": "Manual",
		"manualDesc": "Custom deposit amount",
		"amount": "Amount",
		"amountRequired": "Please enter amount",
		"amountPlaceholder": "Enter deposit amount",
		"remark": "Remark",
		"remarkPlaceholder": "Optional, record the reason for this deposit",
		"depositSuccess": "Deposit successful",
		"depositFailed": "Deposit failed",
		"planCreated": "Savings plan created successfully",
		"planCreateFailed": "Failed to create",
		"deletePlanConfirm": "Are you sure to delete this savings plan?",
		"manualDeposit": "Manual Deposit",
		"clickInput": "Click to input"
	},
	home: {
		"monthlyExpense": "Monthly Expense",
		"monthlyIncome": "Monthly Income",
		"balance": "Balance",
		"addRecord": "Add Record",
		"recentRecords": "Recent Records",
		"viewMore": "View More",
		"noRecords": "No records yet",
		"yuan": "CNY",
		"today": "Today",
		"yesterday": "Yesterday",
		"dateFormat": "MMM D",
		"monthFormat": "MMM",
		"budgetRemaining": "Budget Left",
		"expenseShort": "Exp",
		"incomeShort": "Inc"
	},
	bill: {
		"title": "Bills",
		"expense": "Expense",
		"income": "Income",
		"balance": "Balance",
		"statistics": "Statistics",
		"expand": "Expand Stats",
		"collapse": "Collapse Stats",
		"noRecords": "No bill records",
		"delete": "Delete",
		"edit": "Edit",
		"deleteConfirm": "Are you sure you want to delete this record?",
		"deleteSuccess": "Deleted successfully",
		"deleteFailed": "Delete failed"
	},
	profile: {
		"title": "Profile",
		"settings": "Settings",
		"language": "Language",
		"languageZh": "中文",
		"languageEn": "English",
		"dataManagement": "Data Management",
		"importData": "Import Data",
		"exportData": "Export Data",
		"removeDuplicates": "Remove Duplicates",
		"importSuccess": "Import successful",
		"importFailed": "Import failed",
		"exportSuccess": "Export successful",
		"exportFailed": "Export failed",
		"removeSuccess": "Duplicates removed",
		"removeFailed": "Remove failed",
		"login": "Login",
		"logout": "Logout",
		"notLoggedIn": "Not logged in",
		"guest": "Guest",
		"budget": "Budget",
		"clearData": "Clear Local Data",
		"aboutApp": "About App",
		"preferences": "Preferences",
		"changelog": "Changelog",
		"changelogDesc": "View update history",
		"features": "Features",
		"featuresDesc": "Learn about features",
		"about": "About",
		"aboutDesc": "Developer info"
	},
	budget: {
		"title": "Budget Management",
		"currentMonth": "Current Month",
		"setBudget": "Set Budget",
		"editBudget": "Edit Budget",
		"deleteBudget": "Delete Budget",
		"budgetAmount": "Budget Amount",
		"spent": "Spent",
		"remaining": "Remaining",
		"percentage": "Used",
		"overBudget": "Over Budget",
		"nearLimit": "Near Limit",
		"normal": "Normal",
		"totalBudget": "Total Budget",
		"lastMonth": "Last Month",
		"averageSpent": "Average Monthly",
		"history": "Budget History",
		"noBudget": "No budget set for this month",
		"setBudgetFirst": "Please set budget first",
		"budgetSetSuccess": "Budget set successfully",
		"budgetSetFailed": "Failed to set budget",
		"budgetDeleteSuccess": "Budget deleted successfully",
		"budgetDeleteFailed": "Failed to delete budget",
		"selectMonth": "Select Month",
		"enterAmount": "Enter budget amount",
		"confirmDelete": "Are you sure you want to delete this budget?"
	},
	addRecord: {
		"title": "Add Record",
		"editTitle": "Edit Record",
		"expense": "Expense",
		"income": "Income",
		"transfer": "Transfer",
		"debt": "Debt",
		"reimbursement": "Reimbursement",
		"amount": "Amount",
		"category": "Category",
		"subCategory": "Sub-category",
		"account": "Account",
		"date": "Date",
		"time": "Time",
		"remark": "Note",
		"save": "Save",
		"update": "Update",
		"calculate": "Calculate",
		"saveAgain": "Save & Add",
		"cancel": "Cancel",
		"amountPlaceholder": "Enter amount",
		"remarkPlaceholder": "Enter note (max 50 chars)",
		"saveSuccess": "Saved successfully",
		"saveFailed": "Save failed",
		"updateSuccess": "Updated successfully",
		"updateFailed": "Update failed",
		"amountRequired": "Please enter amount",
		"categoryRequired": "Please select category",
		"selectSubCategory": "Select Sub-category",
		"selectDate": "Select Date",
		"selectMonth": "Select Month",
		"selectYear": "Select Year",
		"byDay": "By Day",
		"byMonth": "By Month",
		"byYear": "By Year",
		"defaultAccount": "Default Account"
	},
	category: {
		"title": "Categories",
		"expense": "Expense Categories",
		"income": "Income Categories",
		"add": "Add Category",
		"edit": "Edit Category",
		"delete": "Delete Category",
		"name": "Name",
		"namePlaceholder": "Enter category name",
		"icon": "Icon",
		"deleteConfirm": "Are you sure you want to delete this category?",
		"deleteSuccess": "Deleted successfully",
		"deleteFailed": "Delete failed",
		"addSuccess": "Added successfully",
		"addFailed": "Add failed",
		"editSuccess": "Updated successfully",
		"editFailed": "Update failed",
		"nameRequired": "Please enter category name"
	},
	common: {
		"confirm": "Confirm",
		"cancel": "Cancel",
		"save": "Save",
		"delete": "Delete",
		"edit": "Edit",
		"add": "Add",
		"close": "Close",
		"back": "Back",
		"loading": "Loading...",
		"loadFailed": "Failed to load data",
		"success": "Success",
		"failed": "Failed",
		"error": "Error",
		"retry": "Retry",
		"empty": "No data",
		"yuan": "CNY",
		"register": "Register",
		"username": "Username",
		"password": "Password",
		"confirmPassword": "Confirm Password",
		"usernamePlaceholder": "Enter username",
		"passwordPlaceholder": "Enter password",
		"confirmPasswordPlaceholder": "Confirm password",
		"passwordMismatch": "Passwords do not match",
		"loginSuccess": "Login successful",
		"logoutSuccess": "Logged out successfully",
		"registerSuccess": "Registration successful",
		"noData": "No data to export",
		"imported": "Imported",
		"deleted": "Deleted",
		"records": "records",
		"failedRecords": "failed",
		"validRecords": "valid records",
		"noValidData": "No valid data found",
		"removed": "Removed",
		"duplicateRecords": "duplicate records",
		"removeDuplicatesConfirm": "Are you sure you want to remove duplicate records?",
		"clearDataConfirm": "Are you sure you want to clear all data? This action cannot be undone!",
		"clearData": "Clear Data",
		"minAmount": "Min Amount",
		"maxAmount": "Max Amount",
		"filter": "Filter",
		"sort": "Sort",
		"sortByTime": "By Time",
		"sortByAmount": "By Amount",
		"ascending": "Ascending",
		"descending": "Descending"
	},
	error: {
		"title": "Oops, something went wrong!",
		"description": "The farm seems to have encountered some issues...",
		"notYourFault": "Don't worry, it's not your fault!",
		"tryRefresh": "Try refreshing the page or go back home",
		"refresh": "Refresh Page",
		"goHome": "Go Home",
		"chartErrorTitle": "Chart Loading Failed",
		"chartErrorDescription": "The statistics chart cannot be displayed temporarily, possibly due to a data loading issue."
	},
	loading: {
		"title": "Stardew Ledger",
		"loading": "Loading resources...",
		"preparing": "Preparing the farm...",
		"openingLedger": "Opening ledger...",
		"complete": "Loading complete!"
	},
	pwa: {
		"install": "Install Stardew Ledger",
		"installDesc": "Add to home screen for offline access",
		"installBtn": "Install",
		"dismiss": "Later",
		"offline": "Currently in offline mode, some features may be unavailable",
		"update": "New version available, click to refresh",
		"updateBtn": "Update Now"
	},
	changelog: {
		"title": "Changelog",
		"tagFeature": "Feature",
		"tagFix": "Fix",
		"tagOptimize": "Optimize",
		"footerNote": "More features coming soon..."
	},
	features: {
		"title": "Features",
		"welcomeTitle": "Welcome to Stardew Ledger",
		"welcomeText": "A pixel-style multi-functional bookkeeping app that makes accounting simple and fun",
		"sectionTitle": "Core Features",
		"tipsTitle": "💡 Tips",
		"tip1": "Swipe left on bills to delete quickly",
		"tip2": "Tap the eye icon to hide amounts",
		"tip3": "Long press categories for more options",
		"tip4": "Supports installation as desktop app (PWA)",
		"record": {
			"title": "Quick Record",
			"description": "Simple and fast bookkeeping experience",
			"detail1": "Supports expense and income types",
			"detail2": "Built-in calculator for easy amount calculation",
			"detail3": "Rich category selection with sub-categories",
			"detail4": "Supports adding notes and selecting dates"
		},
		"statistics": {
			"title": "Statistics",
			"description": "Intuitive chart analysis",
			"detail1": "Monthly income and expense statistics at a glance",
			"detail2": "Pie chart showing expense category distribution",
			"detail3": "Trend chart showing income and expense changes",
			"detail4": "Filter bills by date"
		},
		"budget": {
			"title": "Budget Management",
			"description": "Plan monthly expenses reasonably",
			"detail1": "Set monthly expense budget",
			"detail2": "View budget usage progress in real-time",
			"detail3": "Budget overrun alerts",
			"detail4": "View historical budget execution"
		},
		"category": {
			"title": "Category Management",
			"description": "Custom income and expense categories",
			"detail1": "Rich preset categories",
			"detail2": "Support custom sub-categories",
			"detail3": "Each category has exclusive icons",
			"detail4": "Category color differentiation"
		},
		"data": {
			"title": "Data Management",
			"description": "Safe and convenient data processing",
			"detail1": "Support CSV/Excel format import and export",
			"detail2": "Local storage for privacy protection",
			"detail3": "Cloud sync after login",
			"detail4": "Support clearing local data"
		},
		"style": {
			"title": "Stardew Style",
			"description": "Unique pixel style design",
			"detail1": "Retro pixel font",
			"detail2": "Wood texture interface",
			"detail3": "Game element decorations",
			"detail4": "Smooth animation effects"
		}
	},
	about: {
		"title": "About",
		"appName": "Stardew Ledger",
		"stable": "Stable",
		"intro": "A bookkeeping app inspired by Stardew Valley, combining gamified pixel style with practical bookkeeping functions to make accounting simple and fun.",
		"highlights": "Highlights",
		"feature1Title": "Pixel Style",
		"feature1Desc": "Stardew Valley theme",
		"feature2Title": "Quick Record",
		"feature2Desc": "Record in 3 seconds",
		"feature3Title": "Data Analysis",
		"feature3Desc": "Visual charts display",
		"feature4Title": "Privacy Protection",
		"feature4Desc": "Local storage security",
		"techStack": "Tech Stack",
		"contact": "Contact Us",
		"email": "Email Feedback",
		"thanks": "Thanks for using Stardew Ledger! If you have any suggestions or feedback, please feel free to contact us.",
		"license": "License: MIT License"
	}
};
//#endregion
//#region src/i18n/index.ts
var resources = {
	"zh-CN": { translation: zh_CN_default },
	"en-US": { translation: en_US_default },
	"zh": { translation: zh_CN_default },
	"en": { translation: en_US_default }
};
var getStoredLanguage = () => {
	try {
		return localStorage.getItem("app-language") || "zh-CN";
	} catch {
		return "zh-CN";
	}
};
var setStoredLanguage = (lang) => {
	try {
		localStorage.setItem("app-language", lang);
	} catch {}
};
instance.use(Browser).use(initReactI18next).init({
	resources,
	lng: getStoredLanguage(),
	fallbackLng: "zh-CN",
	interpolation: { escapeValue: false },
	detection: {
		order: ["localStorage", "navigator"],
		caches: ["localStorage"]
	}
});
//#endregion
//#region src/hooks/usePWA.ts
var import_zh_CN = /* @__PURE__ */ __toESM(require_zh_CN(), 1);
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var globalInstallPrompt = null;
function usePWA() {
	const [state, setState] = (0, import_react.useState)({
		isInstallable: false,
		isInstalled: false,
		isOffline: !navigator.onLine,
		isStandalone: false,
		installPrompt: null,
		updateAvailable: false,
		needRefresh: false
	});
	const isInitialized = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const checkStandalone = () => {
			const isStandalone = window.matchMedia("(display-mode: standalone)").matches || window.matchMedia("(display-mode: fullscreen)").matches || window.matchMedia("(display-mode: minimal-ui)").matches || window.navigator.standalone === true;
			setState((prev) => ({
				...prev,
				isStandalone,
				isInstalled: isStandalone
			}));
		};
		checkStandalone();
		const mediaQuery = window.matchMedia("(display-mode: standalone)");
		const handleChange = (e) => {
			setState((prev) => ({
				...prev,
				isStandalone: e.matches,
				isInstalled: e.matches
			}));
		};
		if (mediaQuery.addEventListener) mediaQuery.addEventListener("change", handleChange);
		else mediaQuery.addListener(handleChange);
		return () => {
			if (mediaQuery.removeEventListener) mediaQuery.removeEventListener("change", handleChange);
			else mediaQuery.removeListener(handleChange);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (isInitialized.current) return;
		isInitialized.current = true;
		console.log("[PWA Hook] Initializing...");
		const handleBeforeInstallPrompt = (e) => {
			console.log("[PWA] beforeinstallprompt event fired");
			e.preventDefault();
			globalInstallPrompt = e;
			setState((prev) => ({
				...prev,
				installPrompt: e,
				isInstallable: true
			}));
		};
		const handleAppInstalled = () => {
			console.log("[PWA] appinstalled event fired");
			globalInstallPrompt = null;
			setState((prev) => ({
				...prev,
				isInstallable: false,
				isInstalled: true,
				installPrompt: null
			}));
		};
		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
		window.addEventListener("appinstalled", handleAppInstalled);
		if (globalInstallPrompt) setState((prev) => ({
			...prev,
			installPrompt: globalInstallPrompt,
			isInstallable: true
		}));
		const checkPWAConditions = async () => {
			console.log("[PWA] Checking PWA conditions...");
			const isSecureContext = window.isSecureContext;
			const isHTTPS = window.location.protocol === "https:";
			const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
			const isSecureEnvironment = isSecureContext || isHTTPS || isLocalhost;
			console.log("[PWA] isSecureContext:", isSecureContext);
			console.log("[PWA] isHTTPS:", isHTTPS);
			console.log("[PWA] isLocalhost:", isLocalhost);
			console.log("[PWA] Service Worker support:", "serviceWorker" in navigator);
			console.log("[PWA] Current URL:", window.location.href);
			if (!isSecureEnvironment) {
				console.warn("[PWA] ⚠️ 警告：当前不是安全环境（HTTPS 或 localhost）");
				console.warn("[PWA] PWA 功能将被禁用");
			}
			if ("serviceWorker" in navigator) try {
				const registration = await navigator.serviceWorker.ready;
				console.log("[PWA] Service Worker ready:", registration);
				console.log("[PWA] SW active:", registration.active);
				console.log("[PWA] SW waiting:", registration.waiting);
				console.log("[PWA] SW installing:", registration.installing);
				const manifestLink = document.querySelector("link[rel=\"manifest\"]");
				console.log("[PWA] Manifest link element:", manifestLink);
				if (manifestLink) console.log("[PWA] Manifest href:", manifestLink.href);
				console.log("[PWA] globalInstallPrompt exists:", !!globalInstallPrompt);
			} catch (err) {
				console.error("[PWA] Error checking SW:", err);
			}
			const icons = document.querySelectorAll("link[rel=\"apple-touch-icon\"], link[rel=\"icon\"]");
			console.log("[PWA] Icon elements found:", icons.length);
		};
		checkPWAConditions();
		const fallbackCheckInterval = setInterval(async () => {
			if (!globalInstallPrompt && "serviceWorker" in navigator) {
				console.log("[PWA] Fallback check: re-checking install conditions...");
				try {
					const registration = await navigator.serviceWorker.ready;
					if (document.querySelector("link[rel=\"manifest\"]") && registration.active) console.log("[PWA] Fallback: Manifest and SW ready, checking if can prompt...");
				} catch {}
			}
		}, 5e3);
		return () => {
			clearInterval(fallbackCheckInterval);
			window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
			window.removeEventListener("appinstalled", handleAppInstalled);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		const handleOnline = () => {
			setState((prev) => ({
				...prev,
				isOffline: false
			}));
		};
		const handleOffline = () => {
			setState((prev) => ({
				...prev,
				isOffline: true
			}));
		};
		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);
		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!("serviceWorker" in navigator)) return;
		const handleControllerChange = () => {
			console.log("[PWA] Service Worker controller changed");
			setState((prev) => ({
				...prev,
				updateAvailable: true,
				needRefresh: true
			}));
		};
		const handleUpdateFound = async () => {
			console.log("[PWA] Update found in Service Worker");
			setState((prev) => ({
				...prev,
				updateAvailable: true,
				needRefresh: true
			}));
			const registration = await navigator.serviceWorker.ready;
			if (registration.waiting) registration.waiting.postMessage({ type: "SKIP_WAITING" });
		};
		navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange);
		navigator.serviceWorker.ready.then((registration) => {
			registration.addEventListener("updatefound", handleUpdateFound);
			if (registration.active && registration.waiting) setState((prev) => ({
				...prev,
				updateAvailable: true,
				needRefresh: true
			}));
		});
		return () => {
			navigator.serviceWorker.removeEventListener("controllerchange", handleControllerChange);
		};
	}, []);
	const installApp = (0, import_react.useCallback)(async () => {
		const promptEvent = state.installPrompt || globalInstallPrompt;
		if (!promptEvent) {
			console.warn("[PWA] No install prompt available");
			return;
		}
		try {
			await promptEvent.prompt();
			if ((await promptEvent.userChoice).outcome === "accepted") {
				console.log("[PWA] 用户接受了安装");
				globalInstallPrompt = null;
				setState((prev) => ({
					...prev,
					isInstallable: false,
					installPrompt: null
				}));
			} else console.log("[PWA] 用户拒绝了安装");
		} catch (error) {
			console.error("[PWA] 安装失败:", error);
		}
	}, [state.installPrompt]);
	const dismissInstall = (0, import_react.useCallback)(() => {
		setState((prev) => ({
			...prev,
			isInstallable: false,
			installPrompt: null
		}));
	}, []);
	const triggerInstall = (0, import_react.useCallback)(async () => {
		if (state.installPrompt || globalInstallPrompt) await installApp();
		else {
			if ("serviceWorker" in navigator) await (await navigator.serviceWorker.ready).update();
			console.warn("[PWA] No install prompt available");
		}
	}, [state.installPrompt, installApp]);
	const checkUpdate = (0, import_react.useCallback)(async () => {
		if ("serviceWorker" in navigator) await (await navigator.serviceWorker.ready).update();
	}, []);
	return {
		...state,
		installApp,
		dismissInstall,
		checkUpdate,
		triggerInstall
	};
}
var index_module_default$18 = {
	installPrompt: "_installPrompt_3stvi_6",
	slideUp: "_slideUp_3stvi_1",
	promptContent: "_promptContent_3stvi_22",
	icon: "_icon_3stvi_35",
	textContent: "_textContent_3stvi_55",
	title: "_title_3stvi_60",
	description: "_description_3stvi_69",
	buttons: "_buttons_3stvi_76",
	installBtn: "_installBtn_3stvi_83",
	dismissBtn: "_dismissBtn_3stvi_106",
	offlineIndicator: "_offlineIndicator_3stvi_133",
	updatePrompt: "_updatePrompt_3stvi_149",
	slideDown: "_slideDown_3stvi_1",
	updateContent: "_updateContent_3stvi_165",
	updateText: "_updateText_3stvi_178",
	updateBtn: "_updateBtn_3stvi_185",
	manualInstallButton: "_manualInstallButton_3stvi_218"
};
//#endregion
//#region src/components/PWAInstallPrompt/index.tsx
var import_jsx_runtime = require_jsx_runtime();
var FIRST_TIME_KEY = "pwa_first_time_shown";
var PWAInstallPrompt = () => {
	const { t } = useTranslation();
	const { isInstallable, isOffline, isInstalled, dismissInstall, updateAvailable, needRefresh, triggerInstall } = usePWA();
	const isFirstVisit = !localStorage.getItem(FIRST_TIME_KEY);
	const [dismissed, setDismissed] = (0, import_react.useState)(() => localStorage.getItem("pwa_install_dismissed") === "true");
	const [delayElapsed, setDelayElapsed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (isInstallable && isFirstVisit && !dismissed && !isInstalled) {
			const timer = setTimeout(() => setDelayElapsed(true), 2e3);
			return () => clearTimeout(timer);
		}
	}, [
		isInstallable,
		isFirstVisit,
		dismissed,
		isInstalled
	]);
	(0, import_react.useEffect)(() => {
		if (delayElapsed) localStorage.setItem(FIRST_TIME_KEY, "true");
	}, [delayElapsed]);
	const showPrompt = delayElapsed && !dismissed && !isInstalled && isInstallable && isFirstVisit;
	const showManualButton = isInstallable && !showPrompt && !isInstalled && (!isFirstVisit || dismissed);
	const handleUpdate = () => {
		window.location.reload();
	};
	const handleDismiss = () => {
		setDismissed(true);
		localStorage.setItem("pwa_install_dismissed", "true");
		dismissInstall();
	};
	const handleInstall = async () => {
		await triggerInstall();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		isOffline && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: index_module_default$18.offlineIndicator,
			children: t("pwa.offline")
		}),
		(updateAvailable || needRefresh) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: index_module_default$18.updatePrompt,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default$18.updateContent,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: index_module_default$18.updateText,
					children: t("pwa.update")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: index_module_default$18.updateBtn,
					onClick: handleUpdate,
					children: t("pwa.updateBtn")
				})]
			})
		}),
		showPrompt && !isInstalled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: index_module_default$18.installPrompt,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default$18.promptContent,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default$18.icon,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "💰" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default$18.textContent,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default$18.title,
							children: t("pwa.install")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default$18.description,
							children: t("pwa.installDesc")
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default$18.buttons,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: index_module_default$18.installBtn,
							onClick: handleInstall,
							children: t("pwa.installBtn")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: index_module_default$18.dismissBtn,
							onClick: handleDismiss,
							children: t("pwa.dismiss")
						})]
					})
				]
			})
		}),
		showManualButton && !showPrompt && !isInstalled && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: index_module_default$18.manualInstallButton,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				onClick: handleInstall,
				children: ["📲 ", t("pwa.installBtn")]
			})
		})
	] });
};
var index_module_default$17 = {
	offlineBar: "_offlineBar_exf8e_1",
	slideDown: "_slideDown_exf8e_1",
	icon: "_icon_exf8e_20"
};
//#endregion
//#region src/components/OfflineIndicator/index.tsx
var OfflineIndicator = () => {
	const [isOffline, setIsOffline] = (0, import_react.useState)(!navigator.onLine);
	(0, import_react.useEffect)(() => {
		const handleOnline = () => setIsOffline(false);
		const handleOffline = () => setIsOffline(true);
		window.addEventListener("online", handleOnline);
		window.addEventListener("offline", handleOffline);
		return () => {
			window.removeEventListener("online", handleOnline);
			window.removeEventListener("offline", handleOffline);
		};
	}, []);
	if (!isOffline) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: index_module_default$17.offlineBar,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon, { className: index_module_default$17.icon }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "当前处于离线状态，部分功能可能不可用" })]
	});
};
//#endregion
//#region src/utils/theme.ts
var lightTheme = {
	bgPrimary: "#faf3e0",
	bgSecondary: "#f5e8c7",
	bgTertiary: "#f0d9b0",
	bgCard: "#ffffff",
	bgPanel: "#f5e8c7",
	bgInput: "#ffffff",
	bgHover: "rgba(212, 180, 140, 0.2)",
	textPrimary: "#3c2f1f",
	textSecondary: "#6F3F1F",
	textTertiary: "#8B7355",
	textInverse: "#f0d9b0",
	borderPrimary: "#8B5A2B",
	borderSecondary: "#A67C52",
	primary: "#8B5A2B",
	primaryLight: "#d4b48c",
	primaryDark: "#6F3F1F",
	success: "#4a9c3d",
	danger: "#c45c48",
	warning: "#e8a838",
	info: "#6b9dc7",
	shadowSoft: "0 4px 8px rgba(60, 47, 31, 0.15)",
	shadowMedium: "0 6px 12px rgba(60, 47, 31, 0.2)",
	shadowPixel: "4px 4px 0 rgba(60, 47, 31, 0.3)"
};
var darkTheme = {
	bgPrimary: "#1a1a2e",
	bgSecondary: "#16213e",
	bgTertiary: "#0f3460",
	bgCard: "#252542",
	bgPanel: "#1e1e3f",
	bgInput: "#2a2a4a",
	bgHover: "rgba(100, 149, 237, 0.15)",
	textPrimary: "#e8e6e3",
	textSecondary: "#b8b5b0",
	textTertiary: "#8a8782",
	textInverse: "#1a1a2e",
	borderPrimary: "#4a5568",
	borderSecondary: "#2d3748",
	primary: "#e8c070",
	primaryLight: "#f0d9b0",
	primaryDark: "#c9a050",
	success: "#68d391",
	danger: "#fc8181",
	warning: "#f6e05e",
	info: "#63b3ed",
	shadowSoft: "0 4px 8px rgba(0, 0, 0, 0.3)",
	shadowMedium: "0 6px 12px rgba(0, 0, 0, 0.4)",
	shadowPixel: "4px 4px 0 rgba(0, 0, 0, 0.5)"
};
var THEME_STORAGE_KEY = "app-theme";
var ThemeManager = class {
	currentTheme = "system";
	isDarkMode = false;
	listeners = /* @__PURE__ */ new Set();
	constructor() {
		this.init();
	}
	init() {
		const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
		if (savedTheme && [
			"light",
			"dark",
			"system"
		].includes(savedTheme)) this.currentTheme = savedTheme;
		window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
			if (this.currentTheme === "system") this.applyTheme();
		});
		this.applyTheme();
	}
	/**
	* 获取当前主题设置
	*/
	getTheme() {
		return this.currentTheme;
	}
	/**
	* 获取当前是否为暗黑模式
	*/
	getIsDarkMode() {
		return this.isDarkMode;
	}
	/**
	* 获取当前主题颜色配置
	*/
	getColors() {
		return this.isDarkMode ? darkTheme : lightTheme;
	}
	/**
	* 设置主题
	*/
	setTheme(theme) {
		this.currentTheme = theme;
		localStorage.setItem(THEME_STORAGE_KEY, theme);
		this.applyTheme();
		this.notifyListeners();
	}
	/**
	* 应用主题到文档
	*/
	applyTheme() {
		const isSystemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
		if (this.currentTheme === "system") this.isDarkMode = isSystemDark;
		else this.isDarkMode = this.currentTheme === "dark";
		const colors = this.isDarkMode ? darkTheme : lightTheme;
		const root = document.documentElement;
		root.style.setProperty("--theme-bg-primary", colors.bgPrimary);
		root.style.setProperty("--theme-bg-secondary", colors.bgSecondary);
		root.style.setProperty("--theme-bg-tertiary", colors.bgTertiary);
		root.style.setProperty("--theme-bg-card", colors.bgCard);
		root.style.setProperty("--theme-bg-panel", colors.bgPanel);
		root.style.setProperty("--theme-bg-input", colors.bgInput);
		root.style.setProperty("--theme-bg-hover", colors.bgHover);
		root.style.setProperty("--theme-text-primary", colors.textPrimary);
		root.style.setProperty("--theme-text-secondary", colors.textSecondary);
		root.style.setProperty("--theme-text-tertiary", colors.textTertiary);
		root.style.setProperty("--theme-text-inverse", colors.textInverse);
		root.style.setProperty("--theme-border-primary", colors.borderPrimary);
		root.style.setProperty("--theme-border-secondary", colors.borderSecondary);
		root.style.setProperty("--theme-primary", colors.primary);
		root.style.setProperty("--theme-primary-light", colors.primaryLight);
		root.style.setProperty("--theme-primary-dark", colors.primaryDark);
		root.style.setProperty("--theme-success", colors.success);
		root.style.setProperty("--theme-danger", colors.danger);
		root.style.setProperty("--theme-warning", colors.warning);
		root.style.setProperty("--theme-info", colors.info);
		root.style.setProperty("--theme-shadow-soft", colors.shadowSoft);
		root.style.setProperty("--theme-shadow-medium", colors.shadowMedium);
		root.style.setProperty("--theme-shadow-pixel", colors.shadowPixel);
		root.setAttribute("data-theme", this.isDarkMode ? "dark" : "light");
		document.body.style.backgroundColor = colors.bgPrimary;
		document.body.style.color = colors.textPrimary;
	}
	/**
	* 订阅主题变化
	*/
	subscribe(callback) {
		this.listeners.add(callback);
		return () => this.listeners.delete(callback);
	}
	notifyListeners() {
		this.listeners.forEach((callback) => callback(this.currentTheme, this.isDarkMode));
	}
};
var themeManager = new ThemeManager();
//#endregion
//#region src/utils/resourceLoader.ts
/**
* 资源加载管理器
* 集中管理所有静态资源的预加载，包括字体、图片等
* 支持缓存机制，避免重复加载
*
* 加载顺序：critical（加载页 + 首页主视觉 + 全局按钮皮肤）先行，
* secondary（其余页面素材）紧随其后 —— 全部完成后才进入应用，
* 页面渲染时图片直接命中 HTTP 缓存，不再逐张闪现
*/
var RESOURCE_TIMEOUT = 8e3;
var ResourceCache = class {
	cache = /* @__PURE__ */ new Map();
	imageCache = /* @__PURE__ */ new Map();
	/**
	* 检查资源是否已缓存
	*/
	has(url) {
		return this.cache.has(url);
	}
	/**
	* 标记资源为已缓存
	*/
	set(url) {
		this.cache.set(url, true);
	}
	/**
	* 获取缓存的图片
	*/
	getImage(url) {
		return this.imageCache.get(url);
	}
	/**
	* 缓存图片
	*/
	setImage(url, img) {
		this.imageCache.set(url, img);
		this.set(url);
	}
	/**
	* 清空缓存
	*/
	clear() {
		this.cache.clear();
		this.imageCache.clear();
	}
};
var ResourceLoader = class {
	resources = [];
	loadedCount = 0;
	totalCount = 0;
	onProgress;
	onComplete;
	onError;
	cache = new ResourceCache();
	isLoading = false;
	hasLoaded = false;
	defaultResources = [...CDN_PRELOAD_CRITICAL, ...CDN_PRELOAD_SECONDARY].map((url) => ({
		name: decodeURIComponent(url.split("/").pop() || url),
		type: url.endsWith(".ttf") || url.endsWith(".otf") ? "font" : "image",
		url,
		critical: CDN_PRELOAD_CRITICAL.includes(url)
	}));
	constructor() {
		this.resources = [...this.defaultResources];
	}
	/**
	* 检查是否已经加载完成
	*/
	hasCompleted() {
		return this.hasLoaded;
	}
	/**
	* 添加资源到加载列表
	*/
	addResource(resource) {
		this.resources.push(resource);
	}
	/**
	* 添加多个资源
	*/
	addResources(resources) {
		this.resources.push(...resources);
	}
	/**
	* 设置进度回调
	*/
	setOnProgress(callback) {
		this.onProgress = callback;
	}
	/**
	* 设置完成回调
	*/
	setOnComplete(callback) {
		this.onComplete = callback;
	}
	/**
	* 设置错误回调
	*/
	setOnError(callback) {
		this.onError = callback;
	}
	/**
	* 加载单个字体
	*/
	loadFont(resource) {
		return new Promise((resolve) => {
			if (this.cache.has(resource.url)) {
				resolve();
				return;
			}
			const fontFace = new FontFace("PixelFont", `url(${resource.url})`);
			const timer = setTimeout(() => {
				console.warn(`字体加载超时: ${resource.name}`);
				resolve();
			}, RESOURCE_TIMEOUT);
			fontFace.load().then((loadedFace) => {
				document.fonts.add(loadedFace);
				this.cache.set(resource.url);
				clearTimeout(timer);
				resolve();
			}).catch((error) => {
				console.warn(`字体加载失败: ${resource.name}`, error);
				clearTimeout(timer);
				resolve();
			});
		});
	}
	/**
	* 加载单个图片
	*/
	loadImage(resource) {
		return new Promise((resolve) => {
			if (this.cache.has(resource.url)) {
				resolve();
				return;
			}
			const img = new Image();
			let settled = false;
			const finish = () => {
				if (settled) return;
				settled = true;
				clearTimeout(timer);
				resolve();
			};
			const timer = setTimeout(() => {
				console.warn(`图片加载超时: ${resource.url}`);
				finish();
			}, RESOURCE_TIMEOUT);
			img.onload = () => {
				this.cache.setImage(resource.url, img);
				finish();
			};
			img.onerror = () => {
				const error = /* @__PURE__ */ new Error(`图片加载失败: ${resource.url}`);
				this.onError?.(error, resource.name);
				finish();
			};
			img.src = resource.url;
		});
	}
	/**
	* 更新进度
	*/
	updateProgress(resourceName) {
		this.loadedCount++;
		const percentage = Math.round(this.loadedCount / this.totalCount * 100);
		if (this.onProgress) this.onProgress({
			loaded: this.loadedCount,
			total: this.totalCount,
			percentage,
			currentResource: resourceName
		});
	}
	/**
	* 开始加载所有资源
	* 如果已经加载过，直接触发完成回调
	*/
	async load() {
		if (this.hasLoaded) {
			if (this.onComplete) this.onComplete();
			return;
		}
		if (this.isLoading) return;
		this.isLoading = true;
		this.loadedCount = 0;
		this.totalCount = this.resources.length;
		if (this.totalCount === 0) {
			this.hasLoaded = true;
			this.isLoading = false;
			if (this.onComplete) this.onComplete();
			return;
		}
		if (this.onProgress) this.onProgress({
			loaded: 0,
			total: this.totalCount,
			percentage: 0,
			currentResource: "准备加载..."
		});
		const criticalResources = this.resources.filter((r) => r.critical);
		const secondaryResources = this.resources.filter((r) => !r.critical);
		const loadOne = async (resource) => {
			try {
				switch (resource.type) {
					case "font":
						await this.loadFont(resource);
						break;
					case "image":
						await this.loadImage(resource);
						break;
					default: break;
				}
				this.updateProgress(resource.name);
			} catch (error) {
				console.error(`资源加载失败: ${resource.name}`, error);
				this.updateProgress(resource.name);
			}
		};
		await Promise.all(criticalResources.map(loadOne));
		await Promise.all(secondaryResources.map(loadOne));
		this.hasLoaded = true;
		this.isLoading = false;
		if (this.onComplete) this.onComplete();
	}
	/**
	* 清除所有回调
	* 用于组件卸载时解绑，避免卸载后回调触发 setState
	* 注意：不重置已加载缓存与 hasLoaded，保证再次进入时无需重复加载
	*/
	clearCallbacks() {
		this.onProgress = void 0;
		this.onComplete = void 0;
		this.onError = void 0;
	}
	/**
	* 重置加载器
	*/
	reset() {
		this.resources = [...this.defaultResources];
		this.loadedCount = 0;
		this.totalCount = 0;
		this.isLoading = false;
	}
	/**
	* 完全重置（包括缓存）
	*/
	fullReset() {
		this.reset();
		this.hasLoaded = false;
		this.cache.clear();
	}
	/**
	* 获取资源列表
	*/
	getResources() {
		return [...this.resources];
	}
	/**
	* 获取缓存的图片
	*/
	getCachedImage(url) {
		return this.cache.getImage(url);
	}
};
var resourceLoader = new ResourceLoader();
var index_module_default$16 = {
	loadingScreen: "_loadingScreen_nnyyg_6",
	bottomSection: "_bottomSection_nnyyg_34",
	spinnerWrapper: "_spinnerWrapper_nnyyg_47",
	loadingText: "_loadingText_nnyyg_54",
	progressContainer: "_progressContainer_nnyyg_64",
	progressBar: "_progressBar_nnyyg_72",
	progressFill: "_progressFill_nnyyg_81",
	progressText: "_progressText_nnyyg_89",
	readyText: "_readyText_nnyyg_99"
};
//#endregion
//#region src/components/LoadingScreen/index.tsx
/**
* 资源加载页面
* 使用星露谷风格背景图 + antd Spin 加载指示器，预加载所有CDN资源后进入应用
* 本组件是资源加载的唯一驱动方：先注册回调再触发加载，确保进度事件不丢失
*/
var LoadingScreen = ({ onComplete }) => {
	const { t } = useTranslation();
	const [progress, setProgress] = (0, import_react.useState)({
		loaded: 0,
		total: 0,
		percentage: 0,
		currentResource: "准备加载..."
	});
	const [isReady, setIsReady] = (0, import_react.useState)(false);
	const onCompleteRef = (0, import_react.useRef)(onComplete);
	(0, import_react.useEffect)(() => {
		onCompleteRef.current = onComplete;
	}, [onComplete]);
	(0, import_react.useEffect)(() => {
		resourceLoader.setOnProgress((p) => {
			setProgress(p);
		});
		resourceLoader.setOnComplete(() => {
			setProgress((prev) => ({
				...prev,
				loaded: prev.total,
				percentage: 100
			}));
			setIsReady(true);
			setTimeout(() => {
				onCompleteRef.current?.();
			}, 800);
		});
		resourceLoader.setOnError((error, resourceName) => {
			console.warn(`资源加载失败: ${resourceName}`, error);
		});
		resourceLoader.load();
		return () => {
			resourceLoader.clearCallbacks();
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		id: "loading-screen",
		className: index_module_default$16.loadingScreen,
		style: { backgroundImage: `url(${CDN_BASE_URL}/loadingBg.png)` },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: index_module_default$16.bottomSection,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "loading-spinner",
					className: index_module_default$16.spinnerWrapper,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigProvider, {
						theme: { token: { colorPrimary: "#dc964e" } },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spin, { size: "large" })
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "loading-text",
					className: index_module_default$16.loadingText,
					children: t("loading.openingLedger")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					id: "loading-progress",
					className: index_module_default$16.progressContainer,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default$16.progressBar,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: index_module_default$16.progressFill,
							style: { width: `${progress.percentage}%` }
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default$16.progressText,
						children: [progress.percentage, "%"]
					})]
				}),
				isReady && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					id: "loading-ready",
					className: index_module_default$16.readyText,
					children: t("loading.complete")
				})
			]
		})
	});
};
var index_module_default$15 = {
	page: "_page_1klhv_6",
	pageFade: "_pageFade_1klhv_1",
	forward: "_forward_1klhv_14",
	pageSlideForward: "_pageSlideForward_1klhv_1",
	back: "_back_1klhv_17",
	pageSlideBack: "_pageSlideBack_1klhv_1"
};
//#endregion
//#region src/components/PageTransition/index.tsx
/**
* 路由层级：0 = 底部导航的 tab 页，1 = 二级页面
* 层级变化决定转场方向：进入更深层 → forward（从右推入），返回 → back（从左拉回），
* tab 之间平级切换 → none（轻淡入）
*/
var ROUTE_DEPTH = {
	"/": 0,
	"/statistics": 0,
	"/savings": 0,
	"/profile": 0,
	"/add": 1,
	"/add-record": 1,
	"/budget": 1,
	"/my-fridge": 1,
	"/quick-record-manage": 1,
	"/category-manage": 1,
	"/recurring": 1,
	"/savings-manage": 1,
	"/features": 1,
	"/about": 1,
	"/changelog": 1,
	"/time-manage": 1
};
var getDepth = (pathname) => ROUTE_DEPTH[pathname] ?? 1;
var lastPathname = null;
var computeDirection = (pathname) => {
	const prevDepth = lastPathname === null ? null : getDepth(lastPathname);
	lastPathname = pathname;
	if (prevDepth === null) return "none";
	const depth = getDepth(pathname);
	if (depth === prevDepth) return "none";
	return depth > prevDepth ? "forward" : "back";
};
/**
* 页面转场容器
* key 随路径变化强制重挂载，保证每次导航都完整播放进入动画；
* 方向只在路径变化时判定一次并缓存，无关重渲染不会重播动画
*/
var PageTransition = ({ children }) => {
	const location = useLocation();
	const [navState, setNavState] = (0, import_react.useState)(() => ({
		path: location.pathname,
		direction: computeDirection(location.pathname)
	}));
	if (navState.path !== location.pathname) setNavState({
		path: location.pathname,
		direction: computeDirection(location.pathname)
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `${index_module_default$15.page} ${index_module_default$15[navState.direction]}`,
		children
	}, location.pathname);
};
var PageLoading_module_default = {
	pageLoading: "_pageLoading_xcbid_6",
	blocks: "_blocks_xcbid_17",
	block: "_block_xcbid_17",
	blockJump: "_blockJump_xcbid_1",
	block1: "_block1_xcbid_28",
	block2: "_block2_xcbid_31",
	block3: "_block3_xcbid_35",
	text: "_text_xcbid_40"
};
//#endregion
//#region src/components/PageTransition/PageLoading.tsx
/**
* 懒加载页面的过渡占位
* 与农场背景融合的轻量指示，替代生硬的全屏 Spin
*/
var PageLoading = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: PageLoading_module_default.pageLoading,
	role: "status",
	"aria-label": "加载中",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: PageLoading_module_default.blocks,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `${PageLoading_module_default.block} ${PageLoading_module_default.block1}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `${PageLoading_module_default.block} ${PageLoading_module_default.block2}` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `${PageLoading_module_default.block} ${PageLoading_module_default.block3}` })
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: PageLoading_module_default.text,
		children: "加载中..."
	})]
});
var index_module_default$14 = {
	dialogOverlay: "_dialogOverlay_1odgt_6",
	overlayIn: "_overlayIn_1odgt_1",
	overlayClosing: "_overlayClosing_1odgt_17",
	overlayOut: "_overlayOut_1odgt_1",
	dialogContainer: "_dialogContainer_1odgt_22",
	dialogIn: "_dialogIn_1odgt_1",
	containerClosing: "_containerClosing_1odgt_37",
	dialogOut: "_dialogOut_1odgt_1",
	contentSection: "_contentSection_1odgt_78",
	contentText: "_contentText_1odgt_88",
	pageIndicator: "_pageIndicator_1odgt_114",
	continueHint: "_continueHint_1odgt_125",
	blink: "_blink_1odgt_1",
	speakerSection: "_speakerSection_1odgt_150",
	speakerImageWrapper: "_speakerImageWrapper_1odgt_158",
	speakerImage: "_speakerImage_1odgt_158",
	speakerPlaceholder: "_speakerPlaceholder_1odgt_174",
	speakerNameWrapper: "_speakerNameWrapper_1odgt_179",
	speakerName: "_speakerName_1odgt_179",
	buttonSection: "_buttonSection_1odgt_192",
	dialogButton: "_dialogButton_1odgt_202",
	cancelButton: "_cancelButton_1odgt_236"
};
//#endregion
//#region src/components/StardewDialog/index.tsx
var EXIT_ANIMATION_DURATION = 240;
/**
* 星露谷风格对话框组件
* 使用 dialogBg.png 作为背景
* 支持多步骤显示：当内容超出高度时，点击屏幕任意地方显示下一页
*/
var StardewDialog = ({ content, speakerImage, speaker, okText = "确定", cancelText = "取消", onOk, onCancel, onClose, visible, maxCharsPerPage = 120, enableMultiStep = true }) => {
	const [currentPage, setCurrentPage] = (0, import_react.useState)(0);
	const contentRef = (0, import_react.useRef)(null);
	const [animationState, setAnimationState] = (0, import_react.useState)({
		visible,
		mounted: visible,
		closing: false
	});
	if (visible !== animationState.visible) setAnimationState({
		visible,
		mounted: visible ? true : animationState.mounted,
		closing: !visible && animationState.mounted
	});
	(0, import_react.useEffect)(() => {
		if (!animationState.closing) return;
		const timer = setTimeout(() => {
			setAnimationState((prev) => ({
				...prev,
				mounted: false,
				closing: false
			}));
		}, EXIT_ANIMATION_DURATION);
		return () => clearTimeout(timer);
	}, [animationState.closing]);
	const pages = (0, import_react.useMemo)(() => {
		if (Array.isArray(content)) return content;
		if (!enableMultiStep) return [content];
		const result = [];
		let currentContent = content;
		while (currentContent.length > 0) {
			if (currentContent.length <= maxCharsPerPage) {
				result.push(currentContent);
				break;
			}
			let breakPoint = maxCharsPerPage;
			const lastSpace = currentContent.lastIndexOf(" ", maxCharsPerPage);
			const lastPunctuation = currentContent.search(/(?<=.{80,}[,.!?.,!?])/);
			if (lastSpace > maxCharsPerPage * .8 && lastSpace > lastPunctuation) breakPoint = lastSpace;
			else if (lastPunctuation > maxCharsPerPage * .8) breakPoint = lastPunctuation + 1;
			result.push(currentContent.substring(0, breakPoint).trim());
			currentContent = currentContent.substring(breakPoint).trim();
		}
		return result.length > 0 ? result : [content];
	}, [
		content,
		maxCharsPerPage,
		enableMultiStep
	]);
	const [prevPages, setPrevPages] = (0, import_react.useState)(pages);
	const [prevVisible, setPrevVisible] = (0, import_react.useState)(visible);
	if (pages !== prevPages || visible !== prevVisible) {
		setPrevPages(pages);
		setPrevVisible(visible);
		setCurrentPage(0);
	}
	const totalPages = pages.length;
	if (!animationState.mounted) return null;
	const hasMultiplePages = pages.length > 1;
	const isLastPage = currentPage >= totalPages - 1;
	const handleDialogClick = (e) => {
		if (e.target.tagName === "BUTTON") return;
		if (hasMultiplePages && !isLastPage) setCurrentPage((prev) => prev + 1);
		else if (isLastPage && onClose) onClose();
	};
	const handleOk = () => {
		if (hasMultiplePages && !isLastPage) setCurrentPage((prev) => prev + 1);
		else if (onOk) onOk();
	};
	const handleCancel = () => {
		if (onCancel) onCancel();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `${index_module_default$14.dialogOverlay} ${animationState.closing ? index_module_default$14.overlayClosing : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `${index_module_default$14.dialogContainer} ${animationState.closing ? index_module_default$14.containerClosing : ""}`,
			onClick: handleDialogClick,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default$14.contentSection,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default$14.contentText,
						ref: contentRef,
						children: pages[currentPage]
					}), totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default$14.pageIndicator,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							currentPage + 1,
							" / ",
							totalPages
						] })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default$14.speakerSection,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default$14.speakerImageWrapper,
						children: speakerImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: speakerImage,
							alt: speaker || "speaker",
							className: index_module_default$14.speakerImage
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: index_module_default$14.speakerPlaceholder })
					}), speaker && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default$14.speakerNameWrapper,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: index_module_default$14.speakerName,
							children: speaker
						})
					})]
				}),
				isLastPage && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default$14.buttonSection,
					children: [onCancel && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `${index_module_default$14.dialogButton} ${index_module_default$14.cancelButton}`,
						onClick: handleCancel,
						children: cancelText
					}), onOk && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: `${index_module_default$14.dialogButton} ${index_module_default$14.okButton}`,
						onClick: handleOk,
						children: okText
					})]
				}),
				!isLastPage && hasMultiplePages && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: index_module_default$14.continueHint,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "点击继续" })
				})
			]
		})
	});
};
var index_module_default$13 = {
	errorContainer: "_errorContainer_17s5s_6",
	decorations: "_decorations_17s5s_14",
	pixelGrass: "_pixelGrass_17s5s_27"
};
//#endregion
//#region src/components/RouteError/index.tsx
/**
* 路由错误处理组件
* 处理 React Router 的路由错误，使用 StardewDialog 显示
*/
var RouteError = () => {
	const { t } = useTranslation();
	const error = useRouteError();
	let errorMessage = t("error.description");
	let errorTitle = t("error.title");
	if (isRouteErrorResponse(error)) {
		errorTitle = `${t("error.title")} (${error.status})`;
		errorMessage = error.statusText || error.data?.message || t("error.description");
	} else if (error instanceof Error) errorMessage = error.message;
	else if (typeof error === "string") errorMessage = error;
	const content = `${errorTitle}\n\n${errorMessage}\n\n${t("error.tryRefresh")}`;
	const handleRefresh = () => {
		window.location.reload();
	};
	const handleGoHome = () => {
		window.location.href = "/";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: index_module_default$13.errorContainer,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StardewDialog, {
			visible: true,
			content,
			speakerImage: `${CDN_BASE_URL}/fall in faint.png`,
			speaker: "麻辣烫",
			okText: t("error.refresh"),
			cancelText: t("error.goHome"),
			onOk: handleRefresh,
			onCancel: handleGoHome
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: index_module_default$13.decorations,
			children: [...Array(8)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: index_module_default$13.pixelGrass }, i))
		})]
	});
};
//#endregion
//#region src/api/record.ts
var import_dayjs_min = /* @__PURE__ */ __toESM(require_dayjs_min(), 1);
var getMonthlyStats = (month) => {
	return http.get("/records/stats", { params: { month } });
};
var getRecords = (params) => {
	return http.get("/records", { params });
};
var getRecordsByDateGroups = (params) => {
	return http.get("/records/by-date", { params });
};
var createRecord = (data) => {
	return http.post("/records", data);
};
var updateRecord = (id, data) => {
	return http.put(`/records/${id}`, data);
};
var deleteRecord = (id) => {
	return http.delete(`/records/${id}`);
};
var importRecords = (records) => {
	return http.post("/records/import", { records });
};
var deleteImportedRecords = () => {
	return http.delete("/records/import");
};
var getBillsWithFilter = (params) => {
	return http.get("/records/filter", { params });
};
var getReportData = (year, month) => {
	return http.get("/records/report", { params: {
		year,
		month
	} });
};
var removeDuplicates = () => {
	return http.delete("/duplicates");
};
//#endregion
//#region src/hooks/useCountUp.ts
/**
* 数字滚动动画：目标值变化时从当前显示值平滑过渡到新值
* 用 rAF 驱动，支持中途打断续接（从当前渲染值继续滚向新目标）
*/
var useCountUp = (target, options = {}) => {
	const { duration = 500, decimals = 0 } = options;
	const [display, setDisplay] = (0, import_react.useState)(target);
	const displayRef = (0, import_react.useRef)(target);
	const rafRef = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const from = displayRef.current;
		if (from === target) return;
		const startTime = performance.now();
		const step = (now) => {
			const progress = Math.min((now - startTime) / duration, 1);
			const eased = 1 - Math.pow(1 - progress, 3);
			const value = from + (target - from) * eased;
			displayRef.current = value;
			setDisplay(value);
			if (progress < 1) rafRef.current = requestAnimationFrame(step);
		};
		rafRef.current = requestAnimationFrame(step);
		return () => cancelAnimationFrame(rafRef.current);
	}, [target, duration]);
	return Number(display.toFixed(decimals));
};
var index_module_default$12 = {
	bottomNav: "_bottomNav_180un_24",
	slideUp: "_slideUp_180un_1",
	winterTheme: "_winterTheme_180un_44",
	navItem: "_navItem_180un_58",
	active: "_active_180un_65",
	navLabel: "_navLabel_180un_71",
	navIcon: "_navIcon_180un_110",
	navEmoji: "_navEmoji_180un_114",
	woodPulse: "_woodPulse_180un_1"
};
//#endregion
//#region src/components/BottomNav/index.tsx
var profileImg = `${CDN_BASE_URL}/profile.png`;
var reportImg = `${CDN_BASE_URL}/report.png`;
var savingsImg = `${CDN_BASE_URL}/icon.png`;
var BottomNav = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();
	const isProfilePage = location.pathname === "/profile";
	const navItems = [
		{
			key: "home",
			labelKey: "nav.home",
			icon: "🏡",
			isEmoji: true,
			path: "/"
		},
		{
			key: "statistics",
			labelKey: "nav.statistics",
			icon: reportImg,
			path: "/statistics"
		},
		{
			key: "savings",
			labelKey: "nav.savings",
			icon: savingsImg,
			path: "/savings"
		},
		{
			key: "profile",
			labelKey: "nav.profile",
			icon: profileImg,
			path: "/profile"
		}
	];
	const handleNavClick = (path) => {
		navigate(path);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `${index_module_default$12.bottomNav} ${isProfilePage ? index_module_default$12.winterTheme : ""}`,
		children: navItems.map((item) => {
			const isActive = location.pathname === item.path;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `${index_module_default$12.navItem} ${isActive ? index_module_default$12.active : ""}`,
				onClick: () => handleNavClick(item.path),
				children: [item.isEmoji ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: index_module_default$12.navEmoji,
					children: item.icon
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: item.icon,
					alt: t(item.labelKey),
					className: index_module_default$12.navIcon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: index_module_default$12.navLabel,
					children: t(item.labelKey)
				})]
			}, item.key);
		})
	});
};
var index_module_default$11 = {
	recordItem: "_recordItem_1n2n2_6",
	recordItemIcon: "_recordItemIcon_1n2n2_22",
	recordItemLeft: "_recordItemLeft_1n2n2_30",
	cdnIcon: "_cdnIcon_1n2n2_48",
	recordItemInfo: "_recordItemInfo_1n2n2_54",
	recordItemCategory: "_recordItemCategory_1n2n2_60",
	recordItemSubCategory: "_recordItemSubCategory_1n2n2_66",
	recordItemRemark: "_recordItemRemark_1n2n2_67",
	recordItemMeta: "_recordItemMeta_1n2n2_73",
	recordItemTime: "_recordItemTime_1n2n2_81",
	recordItemAccount: "_recordItemAccount_1n2n2_85",
	recordItemDots: "_recordItemDots_1n2n2_89",
	recordItemAmount: "_recordItemAmount_1n2n2_100",
	expense: "_expense_1n2n2_107",
	income: "_income_1n2n2_110"
};
//#endregion
//#region src/components/RecordItem/index.tsx
var RecordItem = (0, import_react.memo)(({ record, onClick, showTime = false, className = "" }) => {
	const handleClick = () => {
		onClick?.(record);
	};
	const icon = (0, import_react.useMemo)(() => {
		if (record.categoryIcon) return getCategoryEmoji(record.categoryIcon);
		return getCategoryEmoji(record.category);
	}, [record.category, record.categoryIcon]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `${index_module_default$11.recordItem} ${className}`,
		onClick: handleClick,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default$11.recordItemLeft,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: index_module_default$11.recordItemIcon,
					children: icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default$11.recordItemInfo,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default$11.recordItemCategory,
						children: [
							record.category,
							record.subCategory && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: index_module_default$11.recordItemSubCategory,
								children: ["·", record.subCategory]
							}),
							record.remark && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: index_module_default$11.recordItemRemark,
								children: ["·", record.remark]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default$11.recordItemMeta,
						children: showTime && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: index_module_default$11.recordItemTime,
							children: formatTimeOnly(getTimestamp(record.date))
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: index_module_default$11.recordItemDots }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `${index_module_default$11.recordItemAmount} ${index_module_default$11[record.type]}`,
				children: [
					record.type === "expense" ? "-" : "+",
					Number(record.amount).toFixed(2),
					"金"
				]
			})
		]
	});
});
var index_module_default$10 = {
	swipeableItemWrapper: "_swipeableItemWrapper_11007_6",
	lastItem: "_lastItem_11007_26",
	swipeableActions: "_swipeableActions_11007_30",
	actionBtn: "_actionBtn_11007_44",
	editBtn: "_editBtn_11007_64",
	deleteBtn: "_deleteBtn_11007_67",
	swipeableContent: "_swipeableContent_11007_72",
	recordLeft: "_recordLeft_11007_95",
	recordIcon: "_recordIcon_11007_102",
	recordInfo: "_recordInfo_11007_113",
	recordCategory: "_recordCategory_11007_117",
	recordRemark: "_recordRemark_11007_124",
	recordSubCategory: "_recordSubCategory_11007_131",
	recordAccount: "_recordAccount_11007_138",
	recordAmount: "_recordAmount_11007_143",
	expense: "_expense_11007_147",
	income: "_income_11007_150"
};
//#endregion
//#region src/components/SwipeableRecordItem/index.tsx
var BUTTON_WIDTH = 120;
var OPEN_RATIO = .5;
var FLING_VELOCITY = .5;
var ELASTIC = .3;
var DIRECTION_LOCK_DISTANCE = 8;
var SwipeableRecordItem = (0, import_react.memo)(({ record, onEdit, onDelete, isLastItem }) => {
	const contentRef = (0, import_react.useRef)(null);
	const wrapperRef = (0, import_react.useRef)(null);
	const isOpenRef = (0, import_react.useRef)(false);
	const gestureRef = (0, import_react.useRef)({
		active: false,
		horizontal: null,
		startX: 0,
		startY: 0,
		startOffset: 0,
		lastX: 0,
		lastT: 0,
		velocity: 0,
		moved: false
	});
	const applyOffset = (0, import_react.useCallback)((x) => {
		const el = wrapperRef.current;
		if (!el) return;
		el.style.setProperty("--swipe-x", `${x}px`);
		el.style.setProperty("--swipe-progress", String(Math.min(Math.max(-x / BUTTON_WIDTH, 0), 1)));
	}, []);
	const setDragMode = (0, import_react.useCallback)((dragging) => {
		const el = contentRef.current;
		if (el) el.style.transition = dragging ? "none" : "";
	}, []);
	const snapTo = (0, import_react.useCallback)((open) => {
		setDragMode(false);
		applyOffset(open ? -BUTTON_WIDTH : 0);
		isOpenRef.current = open;
	}, [applyOffset, setDragMode]);
	const beginGesture = (0, import_react.useCallback)((clientX, clientY) => {
		const g = gestureRef.current;
		g.active = true;
		g.horizontal = null;
		g.startX = clientX;
		g.startY = clientY;
		g.lastX = clientX;
		g.lastT = performance.now();
		g.velocity = 0;
		g.moved = false;
		g.startOffset = isOpenRef.current ? -BUTTON_WIDTH : 0;
	}, []);
	const moveGesture = (0, import_react.useCallback)((clientX, clientY) => {
		const g = gestureRef.current;
		if (!g.active) return;
		const dx = clientX - g.startX;
		const dy = clientY - g.startY;
		if (g.horizontal === null) {
			const absX = Math.abs(dx);
			const absY = Math.abs(dy);
			if (absX < DIRECTION_LOCK_DISTANCE && absY < DIRECTION_LOCK_DISTANCE) return;
			g.horizontal = absX > absY;
			if (g.horizontal) setDragMode(true);
		}
		if (!g.horizontal) return;
		g.moved = true;
		const now = performance.now();
		const dt = now - g.lastT;
		if (dt > 0) {
			const vx = (clientX - g.lastX) / dt;
			g.velocity = g.velocity * .8 + vx * .2;
			g.lastX = clientX;
			g.lastT = now;
		}
		let x = g.startOffset + dx;
		if (x < -BUTTON_WIDTH) x = -BUTTON_WIDTH + (x + BUTTON_WIDTH) * ELASTIC;
		else if (x > 0) x *= ELASTIC;
		applyOffset(x);
	}, [applyOffset, setDragMode]);
	const endGesture = (0, import_react.useCallback)(() => {
		const g = gestureRef.current;
		if (!g.active) return;
		g.active = false;
		if (!g.horizontal) return;
		const finalX = g.startOffset + (g.lastX - g.startX);
		let shouldOpen;
		if (g.velocity < -FLING_VELOCITY) shouldOpen = true;
		else if (g.velocity > FLING_VELOCITY) shouldOpen = false;
		else shouldOpen = finalX < -BUTTON_WIDTH * OPEN_RATIO;
		snapTo(shouldOpen);
	}, [snapTo]);
	const handleTouchStart = (0, import_react.useCallback)((e) => {
		const touch = e.touches[0];
		beginGesture(touch.clientX, touch.clientY);
	}, [beginGesture]);
	const handleTouchMove = (0, import_react.useCallback)((e) => {
		const touch = e.touches[0];
		moveGesture(touch.clientX, touch.clientY);
	}, [moveGesture]);
	const handleTouchEnd = (0, import_react.useCallback)((e) => {
		const hadMoved = gestureRef.current.moved;
		endGesture();
		if (hadMoved) e.preventDefault();
	}, [endGesture]);
	const handleMouseDown = (0, import_react.useCallback)((e) => {
		if (e.button !== 0) return;
		e.preventDefault();
		beginGesture(e.clientX, e.clientY);
		const onMouseMove = (ev) => moveGesture(ev.clientX, ev.clientY);
		const onMouseUp = () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
			endGesture();
		};
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
	}, [
		beginGesture,
		moveGesture,
		endGesture
	]);
	const handleContentClick = (0, import_react.useCallback)((e) => {
		if (gestureRef.current.moved) {
			e.preventDefault();
			e.stopPropagation();
			return;
		}
		if (isOpenRef.current) {
			e.stopPropagation();
			snapTo(false);
		}
	}, [snapTo]);
	const handleEdit = (0, import_react.useCallback)(() => {
		snapTo(false);
		onEdit(record);
	}, [
		onEdit,
		record,
		snapTo
	]);
	const handleDelete = (0, import_react.useCallback)(() => {
		snapTo(false);
		onDelete(record);
	}, [
		onDelete,
		record,
		snapTo
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: wrapperRef,
		className: `${index_module_default$10.swipeableItemWrapper} ${isLastItem ? index_module_default$10.lastItem : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: index_module_default$10.swipeableActions,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: `${index_module_default$10.actionBtn} ${index_module_default$10.editBtn}`,
				onClick: handleEdit,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$1, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "编辑" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: `${index_module_default$10.actionBtn} ${index_module_default$10.deleteBtn}`,
				onClick: handleDelete,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$2, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "删除" })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			ref: contentRef,
			className: index_module_default$10.swipeableContent,
			onTouchStart: handleTouchStart,
			onTouchMove: handleTouchMove,
			onTouchEnd: handleTouchEnd,
			onTouchCancel: endGesture,
			onMouseDown: handleMouseDown,
			onClick: handleContentClick,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RecordItem, { record })
		})]
	});
});
SwipeableRecordItem.displayName = "SwipeableRecordItem";
var index_module_default$9 = {
	emptyState: "_emptyState_p6ipk_6",
	fadeInUp: "_fadeInUp_p6ipk_1",
	iconWrapper: "_iconWrapper_p6ipk_16",
	float: "_float_p6ipk_1",
	icon: "_icon_p6ipk_16",
	title: "_title_p6ipk_30",
	description: "_description_p6ipk_39",
	actionButton: "_actionButton_p6ipk_48"
};
//#endregion
//#region src/components/EmptyState/index.tsx
var EmptyState = ({ icon = `${CDN_BASE_URL}/fall in faint.png`, title, description, actionText, onAction, showAction = true }) => {
	const { t } = useTranslation();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: index_module_default$9.emptyState,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: index_module_default$9.iconWrapper,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: icon,
					alt: "empty",
					className: index_module_default$9.icon
				})
			}),
			title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: index_module_default$9.title,
				children: title
			}),
			description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: index_module_default$9.description,
				children: description
			}),
			showAction && onAction && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
				type: "primary",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$3, {}),
				onClick: onAction,
				className: index_module_default$9.actionButton,
				children: actionText || t("common.add")
			})
		]
	});
};
var index_module_default$8 = { scrollContainer: "_scrollContainer_1vrhl_6" };
//#endregion
//#region src/components/ScrollContainer/index.tsx
var ScrollContainer = (0, import_react.forwardRef)(({ children, className = "", style, onScroll, onScrollEnd, scrollEndThreshold = 50 }, ref) => {
	const containerRef = (0, import_react.useRef)(null);
	const scrollEndTriggeredRef = (0, import_react.useRef)(false);
	(0, import_react.useImperativeHandle)(ref, () => containerRef.current);
	const handleScroll = (e) => {
		onScroll?.(e);
		if (onScrollEnd && containerRef.current) {
			const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
			const distanceToBottom = scrollHeight - scrollTop - clientHeight;
			if (distanceToBottom < scrollEndThreshold && !scrollEndTriggeredRef.current) {
				scrollEndTriggeredRef.current = true;
				onScrollEnd();
			} else if (distanceToBottom >= scrollEndThreshold) scrollEndTriggeredRef.current = false;
		}
	};
	(0, import_react.useEffect)(() => {
		return () => {
			scrollEndTriggeredRef.current = false;
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref: containerRef,
		className: `${index_module_default$8.scrollContainer} ${className}`,
		style,
		onScroll: handleScroll,
		children
	});
});
var index_module_default$7 = {
	animatedWrapper: "_animatedWrapper_1odav_6",
	hidden: "_hidden_1odav_10",
	fadeIn: "_fadeIn_1odav_14",
	fadeInUp: "_fadeInUp_1odav_18",
	fadeInDown: "_fadeInDown_1odav_22",
	fadeInLeft: "_fadeInLeft_1odav_26",
	fadeInRight: "_fadeInRight_1odav_30",
	scaleIn: "_scaleIn_1odav_34",
	slideInUp: "_slideInUp_1odav_38",
	slideInDown: "_slideInDown_1odav_42",
	bounceIn: "_bounceIn_1odav_46",
	flipInX: "_flipInX_1odav_50",
	flipInY: "_flipInY_1odav_54"
};
//#endregion
//#region src/components/AnimatedWrapper/index.tsx
var AnimatedWrapper = ({ children, animation = "fadeInUp", delay = 0, duration = .5, className = "", triggerOnMount = true, triggerOnVisible = false, once = true }) => {
	const ref = (0, import_react.useRef)(null);
	const [isVisible, setIsVisible] = (0, import_react.useState)(!triggerOnVisible);
	(0, import_react.useEffect)(() => {
		if (triggerOnMount && !triggerOnVisible) {
			const timer = setTimeout(() => {
				setIsVisible(true);
			}, delay * 1e3);
			return () => clearTimeout(timer);
		}
	}, [
		triggerOnMount,
		triggerOnVisible,
		delay
	]);
	(0, import_react.useEffect)(() => {
		if (!triggerOnVisible || !ref.current) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (entry.isIntersecting) {
				setIsVisible(true);
				if (once) observer.disconnect();
			} else if (!once) setIsVisible(false);
		}, {
			threshold: .1,
			rootMargin: "50px"
		});
		observer.observe(ref.current);
		return () => observer.disconnect();
	}, [triggerOnVisible, once]);
	const animationStyle = {
		animationDelay: `${delay}s`,
		animationDuration: `${duration}s`,
		animationFillMode: "forwards"
	};
	const animationClass = isVisible ? index_module_default$7[animation] : index_module_default$7.hidden;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		ref,
		className: `${index_module_default$7.animatedWrapper} ${animationClass} ${className}`,
		style: animationStyle,
		children
	});
};
var index_module_default$6 = {
	shareBtn: "_shareBtn_161ey_6",
	shareModal: "_shareModal_161ey_15",
	receiptContainer: "_receiptContainer_161ey_30",
	receiptCanvas: "_receiptCanvas_161ey_38",
	receiptImage: "_receiptImage_161ey_42",
	actionButtons: "_actionButtons_161ey_48",
	saveBtn: "_saveBtn_161ey_54",
	shareActionBtn: "_shareActionBtn_161ey_66"
};
//#endregion
//#region src/components/ShareReceipt/index.tsx
/**
* 生成小票分享图片
*/
var ShareReceipt = ({ date, records, trigger }) => {
	const canvasRef = (0, import_react.useRef)(null);
	const [isModalOpen, setIsModalOpen] = (0, import_react.useState)(false);
	const [imageUrl, setImageUrl] = (0, import_react.useState)("");
	const calculateStats = (0, import_react.useCallback)(() => {
		const categoryMap = /* @__PURE__ */ new Map();
		let totalExpense = 0;
		let totalIncome = 0;
		records.forEach((record) => {
			const key = record.category;
			if (!categoryMap.has(key)) categoryMap.set(key, {
				category: record.category,
				categoryIcon: record.categoryIcon,
				count: 0,
				amount: 0
			});
			const stat = categoryMap.get(key);
			stat.count += 1;
			stat.amount += record.amount;
			if (record.type === "expense") totalExpense += record.amount;
			else totalIncome += record.amount;
		});
		return {
			categoryStats: Array.from(categoryMap.values()).sort((a, b) => b.amount - a.amount),
			totalExpense,
			totalIncome,
			balance: totalIncome - totalExpense,
			count: records.length
		};
	}, [records]);
	const generateBarcode = () => {
		const random = Math.floor(Math.random() * 1e4);
		return `No.${(0, import_dayjs_min.default)().format(DATE_FORMAT.RECEIPT_DATE)}${String(random).padStart(4, "0")}`;
	};
	const drawReceipt = (0, import_react.useCallback)(async () => {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const stats = calculateStats();
		const barcode = generateBarcode();
		const width = 375;
		const headerHeight = 120;
		const categoryHeaderHeight = 40;
		const categoryRowHeight = 32;
		const summaryHeight = 140;
		const barcodeHeight = 80;
		const footerHeight = 60;
		const padding = 20;
		const contentHeight = headerHeight + categoryHeaderHeight + stats.categoryStats.length * categoryRowHeight + summaryHeight + barcodeHeight + footerHeight + padding * 2;
		canvas.width = width * 2;
		canvas.height = contentHeight * 2;
		ctx.scale(2, 2);
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, width, contentHeight);
		ctx.font = "14px monospace";
		ctx.fillStyle = "#333333";
		let y = padding;
		ctx.font = "bold 16px monospace";
		ctx.textAlign = "center";
		ctx.fillText("享受记账乐趣，为财务自由做准备～", width / 2, y + 20);
		y += 50;
		ctx.strokeStyle = "#333333";
		ctx.setLineDash([4, 4]);
		ctx.beginPath();
		ctx.moveTo(padding, y);
		ctx.lineTo(width - padding, y);
		ctx.stroke();
		ctx.setLineDash([]);
		y += 30;
		ctx.font = "14px monospace";
		ctx.textAlign = "left";
		ctx.fillText("小票日期:", padding, y);
		ctx.textAlign = "right";
		ctx.fillText(`${date} ${formatTimeOnly((0, import_dayjs_min.default)())}`, width - padding, y);
		y += 25;
		ctx.textAlign = "left";
		ctx.fillText("小票单号:", padding, y);
		ctx.textAlign = "right";
		ctx.fillText(barcode, width - padding, y);
		y += 20;
		ctx.strokeStyle = "#333333";
		ctx.setLineDash([4, 4]);
		ctx.beginPath();
		ctx.moveTo(padding, y);
		ctx.lineTo(width - padding, y);
		ctx.stroke();
		ctx.setLineDash([]);
		y += 30;
		ctx.font = "bold 14px monospace";
		ctx.textAlign = "left";
		ctx.fillText("分类", padding, y);
		ctx.textAlign = "center";
		ctx.fillText("笔数", width / 2, y);
		ctx.textAlign = "right";
		ctx.fillText("金额", width - padding, y);
		y += 10;
		ctx.strokeStyle = "#333333";
		ctx.setLineDash([4, 4]);
		ctx.beginPath();
		ctx.moveTo(padding, y);
		ctx.lineTo(width - padding, y);
		ctx.stroke();
		ctx.setLineDash([]);
		y += 25;
		ctx.font = "14px monospace";
		stats.categoryStats.forEach((stat) => {
			ctx.textAlign = "left";
			ctx.fillText(`${stat.categoryIcon} ${stat.category}`, padding, y);
			ctx.textAlign = "center";
			ctx.fillText(String(stat.count), width / 2, y);
			ctx.textAlign = "right";
			const sign = stat.amount < 0 ? "" : "-";
			ctx.fillText(`${sign}¥${stat.amount.toFixed(2)}`, width - padding, y);
			y += categoryRowHeight;
		});
		y += 5;
		ctx.strokeStyle = "#333333";
		ctx.setLineDash([4, 4]);
		ctx.beginPath();
		ctx.moveTo(padding, y);
		ctx.lineTo(width - padding, y);
		ctx.stroke();
		ctx.setLineDash([]);
		y += 30;
		ctx.font = "14px monospace";
		ctx.textAlign = "left";
		ctx.fillText("记账笔数:", padding, y);
		ctx.textAlign = "right";
		ctx.fillText(String(stats.count), width - padding, y);
		y += 25;
		ctx.textAlign = "left";
		ctx.fillText("支出合计:", padding, y);
		ctx.textAlign = "right";
		ctx.fillText(`¥${stats.totalExpense.toFixed(2)}`, width - padding, y);
		y += 25;
		ctx.textAlign = "left";
		ctx.fillText("收入合计:", padding, y);
		ctx.textAlign = "right";
		ctx.fillText(`¥${stats.totalIncome.toFixed(2)}`, width - padding, y);
		y += 25;
		ctx.font = "bold 14px monospace";
		ctx.textAlign = "left";
		ctx.fillText("结余:", padding, y);
		ctx.textAlign = "right";
		const balanceSign = stats.balance >= 0 ? "" : "-";
		ctx.fillText(`${balanceSign}¥${Math.abs(stats.balance).toFixed(2)}`, width - padding, y);
		y += 40;
		ctx.fillStyle = "#333333";
		const barcodeY = y;
		const barcodeHeight2 = 50;
		const lineWidth = 2;
		let x = padding + 20;
		for (let i = 0; i < 60; i++) {
			const w = Math.random() > .5 ? lineWidth : lineWidth * 2;
			ctx.fillRect(x, barcodeY, w, barcodeHeight2);
			x += w + 1;
		}
		y += barcodeHeight2 + 20;
		ctx.font = "12px monospace";
		ctx.fillStyle = "#333333";
		ctx.textAlign = "center";
		ctx.fillText(barcode, width / 2, y);
		setImageUrl(canvas.toDataURL("image/png"));
	}, [date, calculateStats]);
	const handleOpen = () => {
		setIsModalOpen(true);
		setTimeout(() => {
			drawReceipt();
		}, 100);
	};
	const handleSave = () => {
		if (!imageUrl) return;
		const link = document.createElement("a");
		link.download = `记账小票_${date}.png`;
		link.href = imageUrl;
		link.click();
		staticMethods.success("图片已保存");
	};
	const handleShare = async () => {
		if (!imageUrl) return;
		try {
			const blob = await (await fetch(imageUrl)).blob();
			const file = new File([blob], `记账小票_${date}.png`, { type: "image/png" });
			if (navigator.share && navigator.canShare({ files: [file] })) await navigator.share({
				files: [file],
				title: "记账小票",
				text: `${date} 的记账记录`
			});
			else handleSave();
		} catch (error) {
			console.error("Share error:", error);
			handleSave();
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [trigger ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		onClick: handleOpen,
		children: trigger
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$4, { onClick: handleOpen }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		open: isModalOpen,
		onCancel: () => setIsModalOpen(false),
		footer: null,
		width: 400,
		centered: true,
		className: index_module_default$6.shareModal,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: index_module_default$6.receiptContainer,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
				ref: canvasRef,
				className: index_module_default$6.receiptCanvas,
				style: { display: "none" }
			}), imageUrl && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: imageUrl,
				alt: "记账小票",
				className: index_module_default$6.receiptImage
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: index_module_default$6.actionButtons,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$5, {}),
				onClick: handleSave,
				className: index_module_default$6.saveBtn,
				children: "保存图片"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(button_default, {
				type: "primary",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$4, {}),
				onClick: handleShare,
				className: index_module_default$6.shareActionBtn,
				children: "分享"
			})]
		})]
	})] });
};
var index_module_default$5 = { spriteIcon: "_spriteIcon_14njw_1" };
//#endregion
//#region src/components/SpriteIcon/index.tsx
/**
* Emoji图标组件
* 统一使用Emoji显示分类图标
*/
var SpriteIcon = ({ iconId, size = 32, className = "" }) => {
	const emoji = getCategoryEmoji(iconId);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `${index_module_default$5.spriteIcon} ${className}`,
		style: {
			width: `${size}px`,
			height: `${size}px`,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			fontSize: `${size * .75}px`,
			lineHeight: 1
		},
		title: iconId,
		children: emoji
	});
};
var index_module_default$4 = {
	quickRecordPanel: "_quickRecordPanel_lgtvu_6",
	quickRecordHandle: "_quickRecordHandle_lgtvu_14",
	open: "_open_lgtvu_40",
	quickRecordList: "_quickRecordList_lgtvu_48",
	quickRecordItem: "_quickRecordItem_lgtvu_72",
	deleteBtn: "_deleteBtn_lgtvu_92",
	quickRecordIcon: "_quickRecordIcon_lgtvu_118",
	quickRecordName: "_quickRecordName_lgtvu_122",
	quickRecordAmount: "_quickRecordAmount_lgtvu_133",
	emptyTip: "_emptyTip_lgtvu_141",
	manageLink: "_manageLink_lgtvu_158",
	backdrop: "_backdrop_lgtvu_180",
	visible: "_visible_lgtvu_192"
};
//#endregion
//#region src/components/QuickRecordPanel/index.tsx
var QuickRecordPanel = (0, import_react.memo)(({ onRecorded }) => {
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = (0, import_react.useState)(false);
	const [quickRecords, setQuickRecords] = (0, import_react.useState)(() => getQuickRecords().sort((a, b) => a.order - b.order));
	const [categories] = (0, import_react.useState)(() => {
		return getLocalCategories() || {};
	});
	const handleToggle = (0, import_react.useCallback)(() => {
		setIsOpen((prev) => !prev);
	}, []);
	const handleBackdropClick = (0, import_react.useCallback)(() => {
		setIsOpen(false);
	}, []);
	const getCategoryInfo = (0, import_react.useCallback)((categoryId, subCategoryId) => {
		const category = [...categories.expense || [], ...categories.income || []].find((c) => c.id === categoryId);
		if (!category) return {
			name: "未知",
			icon: "❓"
		};
		const subCategory = (category.subCategories || []).find((s) => s.id === subCategoryId);
		return {
			name: subCategory?.name || category.name,
			icon: subCategory?.icon || category.icon
		};
	}, [categories]);
	const handleQuickRecord = (0, import_react.useCallback)((item) => {
		const info = getCategoryInfo(item.categoryId, item.subCategoryId);
		addLocalRecord({
			id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
			type: item.type,
			amount: item.amount,
			category: info.name,
			categoryIcon: info.icon,
			remark: "",
			date: Date.now(),
			account: "默认账户"
		});
		staticMethods.success(`已记录 ${info.name}: ¥${item.amount.toFixed(2)}`);
		setIsOpen(false);
		onRecorded?.();
	}, [onRecorded, getCategoryInfo]);
	const handleEmptyClick = (0, import_react.useCallback)(() => {
		setIsOpen(false);
		navigate("/quick-record-manage");
	}, [navigate]);
	const handleDeleteQuickRecord = (0, import_react.useCallback)((e, itemId) => {
		e.stopPropagation();
		const records = getQuickRecords().filter((r) => r.id !== itemId);
		saveQuickRecords(records);
		setQuickRecords(records.sort((a, b) => a.order - b.order));
		staticMethods.success("已删除");
	}, []);
	const handleGoToManage = (0, import_react.useCallback)(() => {
		setIsOpen(false);
		navigate("/quick-record-manage");
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `${index_module_default$4.backdrop} ${isOpen ? index_module_default$4.visible : ""}`,
		onClick: handleBackdropClick
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: index_module_default$4.quickRecordPanel,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: `${index_module_default$4.quickRecordHandle} ${isOpen ? index_module_default$4.open : ""}`,
			onClick: handleToggle
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `${index_module_default$4.quickRecordList} ${isOpen ? index_module_default$4.open : ""}`,
			children: [quickRecords.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default$4.emptyTip,
				onClick: handleEmptyClick,
				children: [
					"暂无快捷记账",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"点击添加"
				]
			}) : quickRecords.map((item) => {
				const info = getCategoryInfo(item.categoryId, item.subCategoryId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default$4.quickRecordItem,
					onClick: () => handleQuickRecord(item),
					title: `${info.name}: ¥${item.amount.toFixed(2)}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Popconfirm, {
							title: "删除快捷记账",
							description: "确定要删除这条快捷记账吗？",
							onConfirm: (e) => handleDeleteQuickRecord(e, item.id),
							okText: "删除",
							cancelText: "取消",
							okButtonProps: { danger: true },
							placement: "right",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: index_module_default$4.deleteBtn,
								onClick: (e) => e.stopPropagation(),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$6, {})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpriteIcon, {
							iconId: info.icon,
							size: 20,
							className: index_module_default$4.quickRecordIcon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: index_module_default$4.quickRecordName,
							children: info.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: index_module_default$4.quickRecordAmount,
							children: ["¥", item.amount.toFixed(2)]
						})
					]
				}, item.id);
			}), quickRecords.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default$4.manageLink,
				onClick: handleGoToManage,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$7, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "管理快捷记账" })]
			})]
		})]
	})] });
});
QuickRecordPanel.displayName = "QuickRecordPanel";
var index_module_default$3 = {
	homePage: "_homePage_1c16e_6",
	homeContainer: "_homeContainer_1c16e_14",
	homeBottom: "_homeBottom_1c16e_28",
	headerSection: "_headerSection_1c16e_38",
	headerTop: "_headerTop_1c16e_46",
	headerTitle: "_headerTitle_1c16e_53",
	headerSetting: "_headerSetting_1c16e_61",
	statsSection: "_statsSection_1c16e_72",
	statsLabel: "_statsLabel_1c16e_78",
	statsAmount: "_statsAmount_1c16e_85",
	amountValue: "_amountValue_1c16e_92",
	amountEye: "_amountEye_1c16e_100",
	statsSub: "_statsSub_1c16e_110",
	statsBudget: "_statsBudget_1c16e_120",
	budgetLabel: "_budgetLabel_1c16e_133",
	budgetValue: "_budgetValue_1c16e_140",
	addButtonSection: "_addButtonSection_1c16e_150",
	addRecordBtn: "_addRecordBtn_1c16e_157",
	recordsSection: "_recordsSection_1c16e_169",
	recordsList: "_recordsList_1c16e_180",
	loadingMore: "_loadingMore_1c16e_189",
	noMore: "_noMore_1c16e_190",
	recordCollapsing: "_recordCollapsing_1c16e_201",
	recordCollapse: "_recordCollapse_1c16e_1",
	recordsHeader: "_recordsHeader_1c16e_214",
	recordsTitle: "_recordsTitle_1c16e_222",
	recordsTag: "_recordsTag_1c16e_230",
	recordDayGroup: "_recordDayGroup_1c16e_244",
	recordDayHeader: "_recordDayHeader_1c16e_251",
	dayHeaderLeft: "_dayHeaderLeft_1c16e_259",
	dayHeaderRight: "_dayHeaderRight_1c16e_265",
	dayTotal: "_dayTotal_1c16e_271",
	recordItem: "_recordItem_1c16e_277",
	recordLeft: "_recordLeft_1c16e_292",
	recordIcon: "_recordIcon_1c16e_299",
	recordInfo: "_recordInfo_1c16e_312",
	recordCategory: "_recordCategory_1c16e_318",
	recordRemark: "_recordRemark_1c16e_325",
	recordSubCategory: "_recordSubCategory_1c16e_331",
	recordAccount: "_recordAccount_1c16e_337",
	recordAmount: "_recordAmount_1c16e_343",
	expense: "_expense_1c16e_348",
	income: "_income_1c16e_351"
};
var index_module_default$2 = {
	stardewPanel: "_stardewPanel_o8pyx_1",
	withShadow: "_withShadow_o8pyx_32",
	paddingSmall: "_paddingSmall_o8pyx_36",
	paddingMedium: "_paddingMedium_o8pyx_40",
	paddingLarge: "_paddingLarge_o8pyx_44"
};
//#endregion
//#region src/components/StardewPanel/index.tsx
/**
* 星露谷物语风格的面板容器组件
* 带有暖橙色背景和深棕色边框
*/
var StardewPanel = ({ children, className = "", shadow = true }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `${index_module_default$2.stardewPanel}  ${shadow ? index_module_default$2.withShadow : ""} ${className}`,
		children
	});
};
//#endregion
//#region src/pages/Home/index.tsx
var DATE_COUNT = 10;
var homeBottomImg = CDN_IMAGES.homeBottom;
var Home = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const { isLoggedIn } = useAuth();
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [stats, setStats] = (0, import_react.useState)({
		totalExpense: 0,
		totalIncome: 0,
		budget: 5e3
	});
	const [dateGroups, setDateGroups] = (0, import_react.useState)([]);
	const [showAmount, setShowAmount] = (0, import_react.useState)(true);
	const [deletingIds, setDeletingIds] = (0, import_react.useState)(() => /* @__PURE__ */ new Set());
	const [hasMore, setHasMore] = (0, import_react.useState)(true);
	const [cursor, setCursor] = (0, import_react.useState)(void 0);
	const loadingRef = (0, import_react.useRef)(loading);
	(0, import_react.useEffect)(() => {
		loadingRef.current = loading;
	}, [loading]);
	const loadRecords = (0, import_react.useCallback)(async (isRefresh = false) => {
		if (loadingRef.current) return;
		setLoading(true);
		try {
			if (isLoggedIn) try {
				const currentMonth = formatMonthKey((0, import_dayjs_min.default)());
				const [statsRes, recordsRes] = await Promise.all([getMonthlyStats(currentMonth), getRecordsByDateGroups({
					cursor: isRefresh ? void 0 : cursor,
					limit: DATE_COUNT
				})]);
				setStats(statsRes);
				if (isRefresh) setDateGroups(recordsRes.data);
				else setDateGroups((prev) => {
					const newGroups = [...prev];
					recordsRes.data.forEach((newGroup) => {
						const existingIndex = newGroups.findIndex((g) => g.date === newGroup.date);
						if (existingIndex >= 0) {
							newGroups[existingIndex].records = [...newGroups[existingIndex].records, ...newGroup.records];
							newGroups[existingIndex].records.sort((a, b) => compareDate(b.date, a.date));
						} else newGroups.push(newGroup);
					});
					return newGroups;
				});
				setHasMore(recordsRes.hasMore);
				setCursor(recordsRes.nextCursor);
			} catch {
				staticMethods.error(t("common.failed"));
				const localRecords = getLocalRecords();
				const now = (0, import_dayjs_min.default)();
				const currentMonth = formatMonthKey(now);
				const currentYear = now.year();
				const currentMonthNum = now.month() + 1;
				const monthRecords = localRecords.filter((r) => formatMonthKey(r.date) === currentMonth);
				setStats({
					totalExpense: monthRecords.filter((r) => r.type === "expense").reduce((sum, r) => sum + Number(r.amount), 0),
					totalIncome: monthRecords.filter((r) => r.type === "income").reduce((sum, r) => sum + Number(r.amount), 0),
					budget: getLocalBudget(currentYear, currentMonthNum)?.amount || 1e3
				});
				const grouped = localRecords.reduce((acc, record) => {
					const dateStr = formatDateKey(getTimestamp(record.date));
					if (!acc[dateStr]) acc[dateStr] = [];
					acc[dateStr].push(record);
					return acc;
				}, {});
				const today = formatDateKey((0, import_dayjs_min.default)());
				const groups = Object.entries(grouped).map(([date, records]) => ({
					date,
					records: records.sort((a, b) => compareDate(b.date, a.date))
				})).filter((group) => group.date <= today).sort((a, b) => compareDate(b.date, a.date));
				const currentCursor = isRefresh ? void 0 : cursor;
				let startIndex = 0;
				if (currentCursor) {
					const cursorIndex = groups.findIndex((g) => g.date <= currentCursor);
					startIndex = cursorIndex >= 0 ? cursorIndex + 1 : groups.length;
				}
				const endIndex = startIndex + DATE_COUNT;
				const pageData = groups.slice(startIndex, endIndex);
				if (isRefresh) setDateGroups(pageData);
				else setDateGroups((prev) => [...prev, ...pageData]);
				setHasMore(endIndex < groups.length);
				if (pageData.length > 0) setCursor(pageData[pageData.length - 1].date);
			}
			else {
				const localRecords = getLocalRecords();
				const now = (0, import_dayjs_min.default)();
				const currentMonth = formatMonthKey(now);
				const currentYear = now.year();
				const currentMonthNum = now.month() + 1;
				const monthRecords = localRecords.filter((r) => formatMonthKey(r.date) === currentMonth);
				setStats({
					totalExpense: monthRecords.filter((r) => r.type === "expense").reduce((sum, r) => sum + Number(r.amount), 0),
					totalIncome: monthRecords.filter((r) => r.type === "income").reduce((sum, r) => sum + Number(r.amount), 0),
					budget: getLocalBudget(currentYear, currentMonthNum)?.amount || 1e3
				});
				const grouped = localRecords.reduce((acc, record) => {
					const dateStr = formatDateKey(getTimestamp(record.date));
					if (!acc[dateStr]) acc[dateStr] = [];
					acc[dateStr].push(record);
					return acc;
				}, {});
				const today = formatDateKey((0, import_dayjs_min.default)());
				const groups = Object.entries(grouped).map(([date, records]) => ({
					date,
					records: records.sort((a, b) => compareDate(b.date, a.date))
				})).filter((group) => group.date <= today).sort((a, b) => compareDate(b.date, a.date));
				const currentCursor = isRefresh ? void 0 : cursor;
				let startIndex = 0;
				if (currentCursor) {
					const cursorIndex = groups.findIndex((g) => g.date <= currentCursor);
					startIndex = cursorIndex >= 0 ? cursorIndex + 1 : groups.length;
				}
				const endIndex = startIndex + DATE_COUNT;
				const pageData = groups.slice(startIndex, endIndex);
				if (isRefresh) setDateGroups(pageData);
				else setDateGroups((prev) => [...prev, ...pageData]);
				setHasMore(endIndex < groups.length);
				if (pageData.length > 0) setCursor(pageData[pageData.length - 1].date);
			}
		} catch {
			staticMethods.error(t("common.failed"));
		} finally {
			setLoading(false);
		}
	}, [
		isLoggedIn,
		cursor,
		t
	]);
	(0, import_react.useEffect)(() => {
		loadRecords(true);
	}, [isLoggedIn, loadRecords]);
	const handleScrollEnd = (0, import_react.useCallback)(() => {
		if (hasMore && !loadingRef.current) loadRecords();
	}, [hasMore, loadRecords]);
	const handleAddRecord = () => navigate("/add");
	const handleEditRecord = (record) => {
		navigate("/add", { state: { record } });
	};
	const handleDeleteRecord = (record) => {
		Modal.confirm({
			title: t("common.confirm"),
			content: t("bill.deleteConfirm"),
			okType: "danger",
			onOk: () => performDelete(record)
		});
	};
	const performDelete = async (record) => {
		setDeletingIds((prev) => new Set(prev).add(record.id));
		try {
			await new Promise((resolve) => setTimeout(resolve, 220));
			setDateGroups((prev) => prev.map((group) => group.records.some((r) => r.id === record.id) ? {
				...group,
				records: group.records.filter((r) => r.id !== record.id)
			} : group).filter((group) => group.records.length > 0));
			setStats((prev) => record.type === "expense" ? {
				...prev,
				totalExpense: prev.totalExpense - Number(record.amount)
			} : {
				...prev,
				totalIncome: prev.totalIncome - Number(record.amount)
			});
			if (isLoggedIn) await deleteRecord(record.id);
			else saveLocalRecords(getLocalRecords().filter((r) => r.id !== record.id));
			staticMethods.success(t("bill.deleteSuccess"));
		} catch {
			staticMethods.error(t("bill.deleteFailed"));
			loadRecords(true);
		} finally {
			setDeletingIds((prev) => {
				const next = new Set(prev);
				next.delete(record.id);
				return next;
			});
		}
	};
	const animatedExpense = useCountUp(stats.totalExpense, { decimals: 2 });
	const formatAmount = (amount) => showAmount ? `¥${amount.toFixed(2)}` : "****";
	const formatBudgetAmount = (amount) => showAmount ? Math.round(amount).toString() : "****";
	const getDateLabel = (dateStr) => {
		if (isToday(dateStr)) return t("home.today") || "今天";
		if (isYesterday(dateStr)) return t("home.yesterday") || "昨天";
		return formatDisplayMonthDay(dateStr);
	};
	const getDayTotal = (dayRecords) => {
		return {
			expense: dayRecords.filter((r) => r.type === "expense").reduce((sum, r) => sum + Number(r.amount), 0),
			income: dayRecords.filter((r) => r.type === "income").reduce((sum, r) => sum + Number(r.amount), 0)
		};
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: index_module_default$3.homePage,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickRecordPanel, { onRecorded: () => loadRecords(true) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: index_module_default$3.homeContainer,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedWrapper, {
					animation: "fadeInDown",
					className: index_module_default$3.headerSection,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default$3.statsSection,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default$3.statsLabel,
								children: [
									t("home.monthlyExpense"),
									"(",
									t("common.yuan"),
									")"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default$3.statsAmount,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: index_module_default$3.amountValue,
									children: formatAmount(animatedExpense)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: index_module_default$3.amountEye,
									onClick: () => setShowAmount(!showAmount),
									children: showAmount ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$8, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$9, {})
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: index_module_default$3.statsSub,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: index_module_default$3.statsBudget,
									id: "budgetRemaining",
									style: { backgroundImage: `url(${CDN_BASE_URL}/budgetBg.png)` },
									onClick: () => navigate("/budget"),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: index_module_default$3.budgetValue,
										children: formatBudgetAmount(stats.budget - stats.totalExpense)
									})
								})
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedWrapper, {
					animation: "scaleIn",
					delay: .2,
					className: index_module_default$3.addButtonSection,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(button_default, {
						id: "findmeHere",
						type: "primary",
						size: "large",
						block: true,
						className: index_module_default$3.addRecordBtn,
						onClick: handleAddRecord,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefIcon$3, {}), t("home.addRecord")]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: index_module_default$3.recordsSection,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: index_module_default$3.recordsHeader,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: index_module_default$3.recordsTitle,
							children: t("home.recentRecords")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {
							color: "success",
							className: index_module_default$3.recordsTag,
							children: formatDisplayMonth((0, import_dayjs_min.default)())
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollContainer, {
						onScrollEnd: handleScrollEnd,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spin, {
							spinning: loading && dateGroups.length === 0,
							children: dateGroups.length === 0 && !loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
								title: t("home.noRecords") || "暂无记录",
								description: "开始记录您的第一笔账目吧",
								actionText: t("home.addRecord") || "添加记录",
								onAction: handleAddRecord
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: index_module_default$3.recordsList,
								children: [
									dateGroups.map((group) => {
										const { expense, income } = getDayTotal(group.records);
										return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatedWrapper, {
											animation: "fadeInUp",
											triggerOnMount: true,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StardewPanel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: index_module_default$3.recordDayGroup,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: index_module_default$3.recordDayHeader,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: index_module_default$3.dayHeaderLeft,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: getDateLabel(group.date) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareReceipt, {
															date: group.date,
															records: group.records
														})]
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
														className: index_module_default$3.dayTotal,
														children: [expense > 0 && `${t("home.expenseShort")}:${expense.toFixed(2)}`, income > 0 && ` ${t("home.incomeShort")}:${income.toFixed(2)}`]
													})]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
													dataSource: group.records,
													renderItem: (record) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: deletingIds.has(record.id) ? index_module_default$3.recordCollapsing : void 0,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwipeableRecordItem, {
															record,
															onEdit: handleEditRecord,
															onDelete: handleDeleteRecord
														})
													})
												})]
											}) })
										}, group.date);
									}),
									loading && dateGroups.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: index_module_default$3.loadingMore,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spin, { size: "small" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("common.loading") })]
									}),
									!hasMore && dateGroups.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: index_module_default$3.noMore,
										children: t("common.empty")
									})
								]
							})
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: homeBottomImg,
					alt: t("homeBottomImg"),
					className: index_module_default$3.homeBottom
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, {})
			]
		})]
	});
};
//#endregion
//#region src/router/index.tsx
var AddRecord = (0, import_react.lazy)(() => __vitePreload(() => import("./AddRecord-DvuAcfy4.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8]), import.meta.url));
var Statistics = (0, import_react.lazy)(() => __vitePreload(() => import("./Statistics-DO2RjHHm.js"), __vite__mapDeps([9,1,2,3,4,10,5,6,7,11,12,13,14,15]), import.meta.url));
var Savings = (0, import_react.lazy)(() => __vitePreload(() => import("./SavingsOperate-DZwVWi7j.js"), __vite__mapDeps([16,1,2,3,4,5,6,7,17,18]), import.meta.url));
var SavingsManage = (0, import_react.lazy)(() => __vitePreload(() => import("./Savings-ByF1bpDR.js"), __vite__mapDeps([19,1,2,3,4,5,6,7,17,20,21,22]), import.meta.url));
var Profile = (0, import_react.lazy)(() => __vitePreload(() => import("./Profile-DH2kE_9r.js"), __vite__mapDeps([23,1,2,3,4,5,6,7,13,12,24]), import.meta.url));
var CategoryManage = (0, import_react.lazy)(() => __vitePreload(() => import("./CategoryManage-BGk2nbY-.js"), __vite__mapDeps([25,1,2,3,4,20,21,7,26]), import.meta.url));
var Budget = (0, import_react.lazy)(() => __vitePreload(() => import("./Budget-nriRcgml.js"), __vite__mapDeps([27,1,2,3,4,5,6,7,20,21,28]), import.meta.url));
var Changelog = (0, import_react.lazy)(() => __vitePreload(() => import("./Changelog-BB-kMgoX.js"), __vite__mapDeps([29,2,1,3,4,30,31]), import.meta.url));
var Features = (0, import_react.lazy)(() => __vitePreload(() => import("./Features-BT4KgcUk.js"), __vite__mapDeps([32,2,1,3,33]), import.meta.url));
var About = (0, import_react.lazy)(() => __vitePreload(() => import("./About-C7R0tBLu.js"), __vite__mapDeps([34,2,1,3,4,30,35]), import.meta.url));
var Recurring = (0, import_react.lazy)(() => __vitePreload(() => import("./Recurring-BguxFLrG.js"), __vite__mapDeps([36,1,2,3,4,5,6,7,11,12,20,21,37]), import.meta.url));
var QuickRecordManage = (0, import_react.lazy)(() => __vitePreload(() => import("./QuickRecordManage-BKDn4ZU_.js"), __vite__mapDeps([38,1,2,3,4,7,39]), import.meta.url));
var MyFridge = (0, import_react.lazy)(() => __vitePreload(() => import("./MyFridge-C9nNtLBd.js"), __vite__mapDeps([40,1,2,3,4,7,41]), import.meta.url));
var TimeManage = (0, import_react.lazy)(() => __vitePreload(() => import("./TimeManage-BrrNpV1M.js"), __vite__mapDeps([42,1,2,3,4,7,43]), import.meta.url));
var routePreloaders = [
	() => __vitePreload(() => import("./AddRecord-DvuAcfy4.js"), __vite__mapDeps([0,1,2,3,4,5,6,7,8]), import.meta.url),
	() => __vitePreload(() => import("./Statistics-DO2RjHHm.js"), __vite__mapDeps([9,1,2,3,4,10,5,6,7,11,12,13,14,15]), import.meta.url),
	() => __vitePreload(() => import("./SavingsOperate-DZwVWi7j.js"), __vite__mapDeps([16,1,2,3,4,5,6,7,17,18]), import.meta.url),
	() => __vitePreload(() => import("./Savings-ByF1bpDR.js"), __vite__mapDeps([19,1,2,3,4,5,6,7,17,20,21,22]), import.meta.url),
	() => __vitePreload(() => import("./Profile-DH2kE_9r.js"), __vite__mapDeps([23,1,2,3,4,5,6,7,13,12,24]), import.meta.url),
	() => __vitePreload(() => import("./CategoryManage-BGk2nbY-.js"), __vite__mapDeps([25,1,2,3,4,20,21,7,26]), import.meta.url),
	() => __vitePreload(() => import("./Budget-nriRcgml.js"), __vite__mapDeps([27,1,2,3,4,5,6,7,20,21,28]), import.meta.url),
	() => __vitePreload(() => import("./Changelog-BB-kMgoX.js"), __vite__mapDeps([29,2,1,3,4,30,31]), import.meta.url),
	() => __vitePreload(() => import("./Features-BT4KgcUk.js"), __vite__mapDeps([32,2,1,3,33]), import.meta.url),
	() => __vitePreload(() => import("./About-C7R0tBLu.js"), __vite__mapDeps([34,2,1,3,4,30,35]), import.meta.url),
	() => __vitePreload(() => import("./Recurring-BguxFLrG.js"), __vite__mapDeps([36,1,2,3,4,5,6,7,11,12,20,21,37]), import.meta.url),
	() => __vitePreload(() => import("./QuickRecordManage-BKDn4ZU_.js"), __vite__mapDeps([38,1,2,3,4,7,39]), import.meta.url),
	() => __vitePreload(() => import("./MyFridge-C9nNtLBd.js"), __vite__mapDeps([40,1,2,3,4,7,41]), import.meta.url)
];
/**
* 浏览器空闲时预热全部路由 chunk
* 预加载失败静默降级：点击路由时仍有主题化 PageLoading 兜底
*/
var preloadRoutes = () => {
	for (const load of routePreloaders) load().catch(() => {});
};
var LazyWrapper = ({ children }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
	fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageLoading, {}),
	children
});
var router = createBrowserRouter([
	{
		path: "/",
		element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Home, {}) }),
		errorElement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteError, {})
	},
	{
		path: "/add",
		element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddRecord, {}) }) }),
		errorElement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteError, {})
	},
	{
		path: "/add-record",
		element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddRecord, {}) }) }),
		errorElement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteError, {})
	},
	{
		path: "/statistics",
		element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Statistics, {}) }) }),
		errorElement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteError, {})
	},
	{
		path: "/savings",
		element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Savings, {}) }) }),
		errorElement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteError, {})
	},
	{
		path: "/savings-manage",
		element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SavingsManage, {}) }) }),
		errorElement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteError, {})
	},
	{
		path: "/profile",
		element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Profile, {}) }) }),
		errorElement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteError, {})
	},
	{
		path: "/category-manage",
		element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryManage, {}) }) }),
		errorElement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteError, {})
	},
	{
		path: "/budget",
		element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Budget, {}) }) }),
		errorElement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteError, {})
	},
	{
		path: "/changelog",
		element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Changelog, {}) }) }),
		errorElement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteError, {})
	},
	{
		path: "/features",
		element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Features, {}) }) }),
		errorElement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteError, {})
	},
	{
		path: "/about",
		element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(About, {}) }) }),
		errorElement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteError, {})
	},
	{
		path: "/recurring",
		element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Recurring, {}) }) }),
		errorElement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteError, {})
	},
	{
		path: "/quick-record-manage",
		element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickRecordManage, {}) }) }),
		errorElement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteError, {})
	},
	{
		path: "/my-fridge",
		element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MyFridge, {}) }) }),
		errorElement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteError, {})
	},
	{
		path: "/time-manage",
		element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageTransition, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LazyWrapper, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimeManage, {}) }) }),
		errorElement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteError, {})
	},
	{
		path: "*",
		element: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, {
			to: "/",
			replace: true
		}),
		errorElement: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouteError, {})
	}
]);
//#endregion
//#region src/App.tsx
var theme = {
	token: {
		colorPrimary: "#8B5A2B",
		colorSuccess: "#4a9c3d",
		colorWarning: "#e8a838",
		colorError: "#c45c48",
		colorInfo: "#6b9dc7",
		borderRadius: 8,
		fontSize: 14,
		colorBgBase: "#f5e8c7",
		colorTextBase: "#3c2f1f"
	},
	components: {
		Button: { borderRadius: 8 },
		Input: { borderRadius: 8 },
		Tag: { borderRadius: 12 },
		Card: { borderRadius: 12 },
		Modal: { borderRadius: 16 }
	}
};
var getPopupContainer = () => {
	const phoneContent = document.querySelector("[data-phone-content]");
	if (phoneContent) return phoneContent;
	return document.body;
};
ConfigProvider.config({ holderRender: (node) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigProvider, {
	locale: import_zh_CN.default,
	theme,
	getPopupContainer,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App$1, { children: node })
}) });
function App() {
	(0, import_react.useEffect)(() => {
		initializeDataStore();
		requestPersistentStorage();
		const preloadTimer = setTimeout(() => preloadRoutes(), 1500);
		return () => clearTimeout(preloadTimer);
	}, []);
	(0, import_react.useEffect)(() => {
		const unsubscribe = themeManager.subscribe(() => {});
		return () => unsubscribe();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfigProvider, {
		locale: import_zh_CN.default,
		theme,
		getPopupContainer,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App$1, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, {}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RouterProvider2, { router })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(OfflineIndicator, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PWAInstallPrompt, {})
		] }) })
	});
}
require_zh_cn();
require_en();
var index_module_default$1 = {
	errorBoundary: "_errorBoundary_1vwz9_6",
	errorDetailsOverlay: "_errorDetailsOverlay_1vwz9_14",
	errorDetails: "_errorDetails_1vwz9_14",
	errorMessage: "_errorMessage_1vwz9_46",
	errorStack: "_errorStack_1vwz9_57",
	decorations: "_decorations_1vwz9_70",
	pixelGrass: "_pixelGrass_1vwz9_83"
};
//#endregion
//#region src/components/ErrorBoundary/index.tsx
var ErrorBoundary = class extends import_react.Component {
	state = {
		hasError: false,
		error: null,
		errorInfo: null,
		showDialog: false
	};
	static getDerivedStateFromError(error) {
		return {
			hasError: true,
			error,
			errorInfo: null,
			showDialog: true
		};
	}
	componentDidCatch(error, errorInfo) {
		console.error("=== ErrorBoundary Caught Error ===");
		console.error("Error:", error);
		console.error("ErrorInfo:", errorInfo);
		console.error("Component Stack:", errorInfo.componentStack);
		console.error("===================================");
		this.setState({
			error,
			errorInfo
		});
		if (error.message?.includes("Activity") || error.message?.includes("echarts")) {
			console.error("ECharts error detected, attempting cleanup...");
			try {
				const win = window;
				if (win.echarts) document.querySelectorAll("[data-echarts-instance]").forEach((el) => {
					win.echarts.dispose(el);
				});
			} catch (cleanupError) {
				console.error("Cleanup failed:", cleanupError);
			}
		}
	}
	handleRefresh = () => {
		try {
			const win = window;
			if (win.echarts) document.querySelectorAll("[data-echarts-instance]").forEach((el) => {
				win.echarts.dispose(el);
			});
		} catch (e) {
			console.error("Cleanup before refresh failed:", e);
		}
		window.location.reload();
	};
	handleGoHome = () => {
		window.location.href = "/";
	};
	handleCloseDialog = () => {
		this.setState({ showDialog: false });
	};
	render() {
		const { t } = this.props;
		if (this.state.hasError) {
			if (this.props.fallback) return this.props.fallback;
			const errorContent = this.state.error?.message?.includes("Activity") || this.state.error?.message?.includes("echarts") ? `${t("error.chartErrorTitle")}\n${t("error.chartErrorDescription")}\n\n${t("error.tryRefresh")}` : `${t("error.title")}\n${t("error.description")}\n${t("error.tryRefresh")}`;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: index_module_default$1.errorBoundary,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StardewDialog, {
						visible: this.state.showDialog,
						content: errorContent,
						speakerImage: `${CDN_BASE_URL}/fall in faint.png`,
						speaker: "麻辣烫",
						okText: t("error.refresh"),
						cancelText: t("error.goHome"),
						onOk: this.handleRefresh,
						onCancel: this.handleGoHome,
						onClose: this.handleCloseDialog
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: index_module_default$1.decorations,
						children: [...Array(8)].map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: index_module_default$1.pixelGrass }, i))
					}),
					false
				]
			});
		}
		return this.props.children;
	}
};
var ErrorBoundary_default = withTranslation()(ErrorBoundary);
var index_module_default = {
	desktopBackground: "_desktopBackground_1ebk2_6",
	phoneFrame: "_phoneFrame_1ebk2_20",
	phoneContent: "_phoneContent_1ebk2_33",
	resizeHandle: "_resizeHandle_1ebk2_42",
	active: "_active_1ebk2_71"
};
//#endregion
//#region src/components/PhoneFrame/index.tsx
var PHONE_ASPECT_RATIO = 19.5 / 9;
var DEFAULT_WIDTH = 393;
var MIN_WIDTH = 320;
var MAX_WIDTH = 500;
var PhoneFrame = ({ children, isDesktop }) => {
	const [width, setWidth] = (0, import_react.useState)(() => {
		try {
			const saved = localStorage.getItem("phone_frame_width");
			return saved ? Math.min(Math.max(Number(saved), MIN_WIDTH), MAX_WIDTH) : DEFAULT_WIDTH;
		} catch {
			return DEFAULT_WIDTH;
		}
	});
	const [isResizing, setIsResizing] = (0, import_react.useState)(false);
	const startXRef = (0, import_react.useRef)(0);
	const startWidthRef = (0, import_react.useRef)(0);
	const widthRef = (0, import_react.useRef)(width);
	(0, import_react.useEffect)(() => {
		widthRef.current = width;
	}, [width]);
	const handleResizeStart = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		setIsResizing(true);
		startXRef.current = "touches" in e ? e.touches[0].clientX : e.clientX;
		startWidthRef.current = widthRef.current;
	}, []);
	(0, import_react.useEffect)(() => {
		if (!isDesktop || !isResizing) return;
		const handleMove = (clientX) => {
			const diff = clientX - startXRef.current;
			setWidth(Math.min(Math.max(startWidthRef.current + diff, MIN_WIDTH), MAX_WIDTH));
		};
		const handleEnd = () => {
			setIsResizing(false);
			try {
				localStorage.setItem("phone_frame_width", widthRef.current.toString());
			} catch {}
		};
		const onMouseMove = (e) => handleMove(e.clientX);
		const onMouseUp = () => handleEnd();
		const onTouchMove = (e) => handleMove(e.touches[0].clientX);
		const onTouchEnd = () => handleEnd();
		window.addEventListener("mousemove", onMouseMove);
		window.addEventListener("mouseup", onMouseUp);
		window.addEventListener("touchmove", onTouchMove, { passive: true });
		window.addEventListener("touchend", onTouchEnd);
		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
			window.removeEventListener("touchmove", onTouchMove);
			window.removeEventListener("touchend", onTouchEnd);
		};
	}, [isDesktop, isResizing]);
	if (!isDesktop) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	const height = Math.round(width * PHONE_ASPECT_RATIO);
	const contentHeight = height - 16;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: index_module_default.desktopBackground,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: index_module_default.phoneFrame,
			style: {
				width: `${width}px`,
				height: `${height}px`,
				maxWidth: "calc(100vw - 32px)",
				maxHeight: "calc(100vh - 32px)"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: index_module_default.phoneContent,
				"data-phone-content": true,
				style: { "--app-height": `${contentHeight}px` },
				children
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `${index_module_default.resizeHandle} ${isResizing ? index_module_default.active : ""}`,
				onMouseDown: handleResizeStart,
				onTouchStart: handleResizeStart
			})]
		})
	});
};
//#endregion
//#region src/main.tsx
function useShouldShowPhoneFrame() {
	const [showFrame, setShowFrame] = (0, import_react.useState)(() => {
		if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true) return false;
		return window.innerWidth >= 768;
	});
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true) {
			setShowFrame(false);
			return;
		}
		const mql = window.matchMedia("(min-width: 768px)");
		const handler = (e) => setShowFrame(e.matches);
		mql.addEventListener("change", handler);
		return () => mql.removeEventListener("change", handler);
	}, []);
	return showFrame;
}
var AppLoader = () => {
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const { i18n } = useTranslation();
	const showPhoneFrame = useShouldShowPhoneFrame();
	const handleLoaded = (0, import_react.useCallback)(() => {
		setIsLoading(false);
	}, []);
	(0, import_react.useEffect)(() => {
		if (i18n.language.startsWith("en")) import_dayjs_min.default.locale("en");
		else import_dayjs_min.default.locale("zh-cn");
	}, [i18n.language]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneFrame, {
		isDesktop: showPhoneFrame,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorBoundary_default, { children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingScreen, { onComplete: handleLoaded }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {}) })
	});
};
var Root = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppLoader, {});
};
window.addEventListener("error", (event) => {
	console.error("=== Global Error Event ===");
	console.error("Message:", event.message);
	console.error("Error:", event.error);
	console.error("Filename:", event.filename);
	console.error("Line:", event.lineno, "Column:", event.colno);
	console.error("========================");
	if (event.message?.includes("echarts") || event.message?.includes("Activity")) {
		console.error("ECharts error detected!");
		console.error("This error should be caught by ErrorBoundary");
	}
});
window.addEventListener("unhandledrejection", (event) => {
	console.error("=== Unhandled Promise Rejection ===");
	console.error("Reason:", event.reason);
	console.error("Promise:", event.promise);
	console.error("====================================");
	if (event.reason instanceof Error) setTimeout(() => {
		throw event.reason;
	}, 0);
	else setTimeout(() => {
		throw new Error(String(event.reason));
	}, 0);
});
if ("serviceWorker" in navigator) window.addEventListener("load", () => {
	navigator.serviceWorker.register("/sw.js", {
		scope: "/",
		type: "classic"
	}).then((registration) => {
		console.log("[PWA] Service Worker 注册成功:", registration);
		registration.addEventListener("updatefound", () => {
			const newWorker = registration.installing;
			if (newWorker) newWorker.addEventListener("statechange", () => {
				if (newWorker.state === "installed" && navigator.serviceWorker.controller) console.log("[PWA] 发现新版本，请刷新页面");
			});
		});
	}).catch((error) => {
		console.error("[PWA] Service Worker 注册失败:", error);
	});
});
var rootElement = document.getElementById("root");
if (rootElement) (0, import_client.createRoot)(rootElement).render(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {}));
//#endregion
export { setStoredLanguage as _, BottomNav as a, deleteRecord as c, getReportData as d, importRecords as f, usePWA as g, themeManager as h, SwipeableRecordItem as i, getBillsWithFilter as l, updateRecord as m, SpriteIcon as n, createRecord as o, removeDuplicates as p, ShareReceipt as r, deleteImportedRecords as s, StardewPanel as t, getRecords as u };

//# sourceMappingURL=index-BP4F2dWk.js.map