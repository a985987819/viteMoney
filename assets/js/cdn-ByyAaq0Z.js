//#region src/constants/cdn.ts
var CDN_BASE_URL = "https://vercel-icons.vercel.app";
var CDN_IMAGES = {
	winterBg: `${CDN_BASE_URL}/winterBg.png`,
	snowTop: `${CDN_BASE_URL}/snowTop.png`,
	mineBtnBg: `${CDN_BASE_URL}/mineBtnBg.png`,
	homeBottom: `${CDN_BASE_URL}/home-bottom.png`,
	hero: `${CDN_BASE_URL}/hero.png`
};
var CDN_FONTS = { cubic11: `${CDN_BASE_URL}/fonts/Cubic_11.ttf` };
`${CDN_BASE_URL}`, `${CDN_BASE_URL}`, `${CDN_BASE_URL}`, `${CDN_BASE_URL}`;
/**
* 预加载清单 —— 与 resourceLoader 配合，在 LoadingScreen 进度条阶段全部加载完毕，
* 进入应用后图片直接命中 HTTP 缓存，不再出现逐张闪现。
*
* 维护约定：SCSS 中硬编码的 CDN url（无法引用 TS 常量）新增时，需同步登记到对应分组。
*
* critical：加载页自身 + 首页主视觉 + 全局按钮皮肤，决定进入应用的临界路径，最先加载
* secondary：其余页面素材，critical 完成后继续后台加载，进入对应页面时已就绪
*/
var CDN_PRELOAD_CRITICAL = [
	`${CDN_BASE_URL}/loadingBg.png`,
	CDN_FONTS.cubic11,
	`${CDN_BASE_URL}/homePageHead.png`,
	`${CDN_BASE_URL}/homePageBg.png`,
	`${CDN_BASE_URL}/budgetBg.png`,
	CDN_IMAGES.homeBottom,
	`${CDN_BASE_URL}/midBtn.png`,
	`${CDN_BASE_URL}/shortBtn.png`
];
var CDN_PRELOAD_SECONDARY = [
	`${CDN_BASE_URL}/dialogBg.png`,
	`${CDN_BASE_URL}/closeBtn.png`,
	`${CDN_BASE_URL}/backTop.png`,
	`${CDN_BASE_URL}/profile.png`,
	`${CDN_BASE_URL}/report.png`,
	`${CDN_BASE_URL}/icon.png`,
	`${CDN_BASE_URL}/bill.png`,
	`${CDN_BASE_URL}/stardewvalley.png`,
	`${CDN_BASE_URL}/hero.png`,
	`${CDN_BASE_URL}/fall in faint.png`,
	CDN_IMAGES.snowTop,
	CDN_IMAGES.winterBg,
	CDN_IMAGES.mineBtnBg,
	`${CDN_BASE_URL}/summerChartBg.png`,
	`${CDN_BASE_URL}/chicken.png`
];
//#endregion
export { CDN_PRELOAD_SECONDARY as i, CDN_IMAGES as n, CDN_PRELOAD_CRITICAL as r, CDN_BASE_URL as t };

//# sourceMappingURL=cdn-ByyAaq0Z.js.map