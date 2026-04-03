import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import zhCN from './locales/zh-CN.json';
import enUS from './locales/en-US.json';

// 语言资源
const resources = {
  'zh-CN': {
    translation: zhCN,
  },
  'en-US': {
    translation: enUS,
  },
  'zh': {
    translation: zhCN,
  },
  'en': {
    translation: enUS,
  },
};

// 从本地存储获取语言设置
const getStoredLanguage = () => {
  try {
    return localStorage.getItem('app-language') || 'zh-CN';
  } catch {
    return 'zh-CN';
  }
};

// 保存语言设置到本地存储
export const setStoredLanguage = (lang: string) => {
  try {
    localStorage.setItem('app-language', lang);
  } catch {
    // ignore
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: getStoredLanguage(),
    fallbackLng: 'zh-CN',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
