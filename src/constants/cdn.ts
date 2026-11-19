// CDN 基础地址 - 统一管理
export const CDN_BASE_URL = 'https://vercel-icons.vercel.app';

// 图片资源路径
export const CDN_IMAGES = {
  // 冬季主题
  winterBg: `${CDN_BASE_URL}/winterBg.png`,
  snowTop: `${CDN_BASE_URL}/snowTop.png`,
  mineBtnBg: `${CDN_BASE_URL}/mineBtnBg.png`,

  // 首页
  homeBottom: `${CDN_BASE_URL}/home-bottom.png`,

  // 其他资源
  hero: `${CDN_BASE_URL}/hero.png`,
} as const;

// 字体资源路径
export const CDN_FONTS = {
  cubic11: `${CDN_BASE_URL}/fonts/Cubic_11.ttf`,
} as const;

// 图标资源路径（当前未在页面中引用，保留定义）
export const CDN_ICONS = {
  // 底部导航图标
  home: `${CDN_BASE_URL}/icons/home.png`,
  statistics: `${CDN_BASE_URL}/icons/statistics.png`,
  savings: `${CDN_BASE_URL}/icons/savings.png`,
  profile: `${CDN_BASE_URL}/icons/profile.png`,
} as const;

/**
 * 预加载清单 —— 与 resourceLoader 配合，在 LoadingScreen 进度条阶段全部加载完毕，
 * 进入应用后图片直接命中 HTTP 缓存，不再出现逐张闪现。
 *
 * 维护约定：SCSS 中硬编码的 CDN url（无法引用 TS 常量）新增时，需同步登记到对应分组。
 *
 * critical：加载页自身 + 首页主视觉 + 全局按钮皮肤，决定进入应用的临界路径，最先加载
 * secondary：其余页面素材，critical 完成后继续后台加载，进入对应页面时已就绪
 */
export const CDN_PRELOAD_CRITICAL: string[] = [
  `${CDN_BASE_URL}/loadingBg.png`,
  CDN_FONTS.cubic11,
  // 首页主视觉
  `${CDN_BASE_URL}/homePageHead.png`,
  `${CDN_BASE_URL}/homePageBg.png`,
  `${CDN_BASE_URL}/budgetBg.png`,
  CDN_IMAGES.homeBottom,
  // 全局按钮皮肤（App.module.scss 中 .ant-btn 引用）
  `${CDN_BASE_URL}/midBtn.png`,
  `${CDN_BASE_URL}/shortBtn.png`,
];

export const CDN_PRELOAD_SECONDARY: string[] = [
  // 弹窗与浮层
  `${CDN_BASE_URL}/dialogBg.png`,
  `${CDN_BASE_URL}/closeBtn.png`,
  `${CDN_BASE_URL}/backTop.png`,
  // 导航与角色
  `${CDN_BASE_URL}/profile.png`,
  `${CDN_BASE_URL}/report.png`,
  `${CDN_BASE_URL}/icon.png`,
  `${CDN_BASE_URL}/bill.png`,
  `${CDN_BASE_URL}/stardewvalley.png`,
  `${CDN_BASE_URL}/hero.png`,
  `${CDN_BASE_URL}/fall in faint.png`,
  // 我的页冬季主题
  CDN_IMAGES.snowTop,
  CDN_IMAGES.winterBg,
  CDN_IMAGES.mineBtnBg,
  // 其他页面
  `${CDN_BASE_URL}/summerChartBg.png`,
  `${CDN_BASE_URL}/chicken.png`,
];
