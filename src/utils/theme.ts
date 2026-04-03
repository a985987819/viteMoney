/**
 * 主题管理工具
 * 支持日间/夜间/跟随系统三种模式
 */

export type ThemeType = 'light' | 'dark' | 'system';

interface ThemeColors {
  // 背景
  bgPrimary: string;
  bgSecondary: string;
  bgTertiary: string;
  bgCard: string;
  bgPanel: string;
  bgInput: string;
  bgHover: string;

  // 文字
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;

  // 边框
  borderPrimary: string;
  borderSecondary: string;

  // 强调色
  primary: string;
  primaryLight: string;
  primaryDark: string;
  success: string;
  danger: string;
  warning: string;
  info: string;

  // 阴影
  shadowSoft: string;
  shadowMedium: string;
  shadowPixel: string;
}

// 日间模式配色
export const lightTheme: ThemeColors = {
  // 背景 - 温暖的羊皮纸色调
  bgPrimary: '#faf3e0',
  bgSecondary: '#f5e8c7',
  bgTertiary: '#f0d9b0',
  bgCard: '#ffffff',
  bgPanel: '#f5e8c7',
  bgInput: '#ffffff',
  bgHover: 'rgba(212, 180, 140, 0.2)',

  // 文字 - 深棕色系，确保可读性
  textPrimary: '#3c2f1f',
  textSecondary: '#6F3F1F',
  textTertiary: '#8B7355',
  textInverse: '#f0d9b0',

  // 边框
  borderPrimary: '#8B5A2B',
  borderSecondary: '#A67C52',

  // 强调色
  primary: '#8B5A2B',
  primaryLight: '#d4b48c',
  primaryDark: '#6F3F1F',
  success: '#4a9c3d',
  danger: '#c45c48',
  warning: '#e8a838',
  info: '#6b9dc7',

  // 阴影
  shadowSoft: '0 4px 8px rgba(60, 47, 31, 0.15)',
  shadowMedium: '0 6px 12px rgba(60, 47, 31, 0.2)',
  shadowPixel: '4px 4px 0 rgba(60, 47, 31, 0.3)',
};

// 夜间模式配色
export const darkTheme: ThemeColors = {
  // 背景 - 深蓝色调，护眼
  bgPrimary: '#1a1a2e',
  bgSecondary: '#16213e',
  bgTertiary: '#0f3460',
  bgCard: '#252542',
  bgPanel: '#1e1e3f',
  bgInput: '#2a2a4a',
  bgHover: 'rgba(100, 149, 237, 0.15)',

  // 文字 - 浅色系，确保在深色背景上的可读性
  textPrimary: '#e8e6e3',
  textSecondary: '#b8b5b0',
  textTertiary: '#8a8782',
  textInverse: '#1a1a2e',

  // 边框
  borderPrimary: '#4a5568',
  borderSecondary: '#2d3748',

  // 强调色 - 调整为适合夜间模式的色调
  primary: '#e8c070',
  primaryLight: '#f0d9b0',
  primaryDark: '#c9a050',
  success: '#68d391',
  danger: '#fc8181',
  warning: '#f6e05e',
  info: '#63b3ed',

  // 阴影
  shadowSoft: '0 4px 8px rgba(0, 0, 0, 0.3)',
  shadowMedium: '0 6px 12px rgba(0, 0, 0, 0.4)',
  shadowPixel: '4px 4px 0 rgba(0, 0, 0, 0.5)',
};

const THEME_STORAGE_KEY = 'app-theme';

class ThemeManager {
  private currentTheme: ThemeType = 'system';
  private isDarkMode: boolean = false;
  private listeners: Set<(theme: ThemeType, isDark: boolean) => void> = new Set();

  constructor() {
    this.init();
  }

  private init(): void {
    // 从本地存储读取主题设置
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) as ThemeType | null;
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      this.currentTheme = savedTheme;
    }

    // 监听系统主题变化
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if (this.currentTheme === 'system') {
        this.applyTheme();
      }
    });

    // 初始应用主题
    this.applyTheme();
  }

  /**
   * 获取当前主题设置
   */
  getTheme(): ThemeType {
    return this.currentTheme;
  }

  /**
   * 获取当前是否为暗黑模式
   */
  getIsDarkMode(): boolean {
    return this.isDarkMode;
  }

  /**
   * 获取当前主题颜色配置
   */
  getColors(): ThemeColors {
    return this.isDarkMode ? darkTheme : lightTheme;
  }

  /**
   * 设置主题
   */
  setTheme(theme: ThemeType): void {
    this.currentTheme = theme;
    localStorage.setItem(THEME_STORAGE_KEY, theme);
    this.applyTheme();
    this.notifyListeners();
  }

  /**
   * 应用主题到文档
   */
  private applyTheme(): void {
    const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (this.currentTheme === 'system') {
      this.isDarkMode = isSystemDark;
    } else {
      this.isDarkMode = this.currentTheme === 'dark';
    }

    // 应用 CSS 变量
    const colors = this.isDarkMode ? darkTheme : lightTheme;
    const root = document.documentElement;

    // 设置 CSS 变量
    root.style.setProperty('--theme-bg-primary', colors.bgPrimary);
    root.style.setProperty('--theme-bg-secondary', colors.bgSecondary);
    root.style.setProperty('--theme-bg-tertiary', colors.bgTertiary);
    root.style.setProperty('--theme-bg-card', colors.bgCard);
    root.style.setProperty('--theme-bg-panel', colors.bgPanel);
    root.style.setProperty('--theme-bg-input', colors.bgInput);
    root.style.setProperty('--theme-bg-hover', colors.bgHover);

    root.style.setProperty('--theme-text-primary', colors.textPrimary);
    root.style.setProperty('--theme-text-secondary', colors.textSecondary);
    root.style.setProperty('--theme-text-tertiary', colors.textTertiary);
    root.style.setProperty('--theme-text-inverse', colors.textInverse);

    root.style.setProperty('--theme-border-primary', colors.borderPrimary);
    root.style.setProperty('--theme-border-secondary', colors.borderSecondary);

    root.style.setProperty('--theme-primary', colors.primary);
    root.style.setProperty('--theme-primary-light', colors.primaryLight);
    root.style.setProperty('--theme-primary-dark', colors.primaryDark);
    root.style.setProperty('--theme-success', colors.success);
    root.style.setProperty('--theme-danger', colors.danger);
    root.style.setProperty('--theme-warning', colors.warning);
    root.style.setProperty('--theme-info', colors.info);

    root.style.setProperty('--theme-shadow-soft', colors.shadowSoft);
    root.style.setProperty('--theme-shadow-medium', colors.shadowMedium);
    root.style.setProperty('--theme-shadow-pixel', colors.shadowPixel);

    // 设置 data-theme 属性用于 CSS 选择器
    root.setAttribute('data-theme', this.isDarkMode ? 'dark' : 'light');

    // 更新 body 背景色
    document.body.style.backgroundColor = colors.bgPrimary;
    document.body.style.color = colors.textPrimary;
  }

  /**
   * 订阅主题变化
   */
  subscribe(callback: (theme: ThemeType, isDark: boolean) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyListeners(): void {
    this.listeners.forEach((callback) => callback(this.currentTheme, this.isDarkMode));
  }
}

export const themeManager = new ThemeManager();
export type { ThemeColors };
