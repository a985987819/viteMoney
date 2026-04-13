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

// 图标资源路径
export const CDN_ICONS = {
  // 底部导航图标
  home: `${CDN_BASE_URL}/icons/home.png`,
  statistics: `${CDN_BASE_URL}/icons/statistics.png`,
  savings: `${CDN_BASE_URL}/icons/savings.png`,
  profile: `${CDN_BASE_URL}/icons/profile.png`,
} as const;
