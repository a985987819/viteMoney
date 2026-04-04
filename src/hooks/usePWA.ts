import { useState, useEffect, useCallback } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

interface PWAState {
  isInstallable: boolean;
  isInstalled: boolean;
  isOffline: boolean;
  isStandalone: boolean;
  installPrompt: BeforeInstallPromptEvent | null;
  updateAvailable: boolean;
  needRefresh: boolean;
  hasShownFirstTime: boolean;
}

const FIRST_TIME_KEY = 'pwa_first_time_shown_v2';

export function usePWA() {
  // 检查是否是首次访问（从未显示过安装提示）
  const isFirstVisit = !localStorage.getItem(FIRST_TIME_KEY);
  
  const [state, setState] = useState<PWAState>({
    isInstallable: false,
    isInstalled: false,
    isOffline: !navigator.onLine,
    isStandalone: false,
    installPrompt: null,
    updateAvailable: false,
    needRefresh: false,
    hasShownFirstTime: isFirstVisit,
  });

  // 检查是否已安装
  useEffect(() => {
    const checkStandalone = () => {
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        (window.navigator as any).standalone === true;
      setState((prev) => ({ ...prev, isStandalone, isInstalled: isStandalone }));
    };

    checkStandalone();

    // 监听显示模式变化
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleChange = (e: MediaQueryListEvent) => {
      setState((prev) => ({ ...prev, isStandalone: e.matches, isInstalled: e.matches }));
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  // 监听安装提示 - 关键：需要在页面加载时就监听
  useEffect(() => {
    console.log('[PWA Hook] Initializing, isFirstVisit:', isFirstVisit);
    
    // 延迟一点注册监听器，确保页面完全加载
    const timer = setTimeout(() => {
      const handleBeforeInstallPrompt = (e: Event) => {
        e.preventDefault();
        console.log('[PWA] beforeinstallprompt event fired');
        console.log('[PWA] Event details:', e);
        
        setState((prev) => ({
          ...prev,
          installPrompt: e as BeforeInstallPromptEvent,
          isInstallable: true,
        }));
      };

      const handleAppInstalled = () => {
        console.log('[PWA] appinstalled event fired');
        setState((prev) => ({
          ...prev,
          isInstallable: false,
          isInstalled: true,
          installPrompt: null,
        }));
      };

      window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.addEventListener('appinstalled', handleAppInstalled);

      console.log('[PWA] Event listeners registered');
      
      // 检查 PWA 安装条件
      const checkPWAConditions = async () => {
        console.log('[PWA] Checking PWA conditions...');
        
        const isSecureContext = window.isSecureContext;
        const isHTTPS = window.location.protocol === 'https:';
        const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        const isSecureEnvironment = isSecureContext || isHTTPS || isLocalhost;
        
        console.log('[PWA] isSecureContext:', isSecureContext);
        console.log('[PWA] isHTTPS:', isHTTPS);
        console.log('[PWA] isLocalhost:', isLocalhost);
        console.log('[PWA] isSecureEnvironment:', isSecureEnvironment);
        console.log('[PWA] Service Worker support:', 'serviceWorker' in navigator);
        
        // 如果不是安全环境，显示警告
        if (!isSecureEnvironment) {
          console.warn('[PWA] ⚠️ 警告：当前不是安全环境（HTTPS 或 localhost）');
          console.warn('[PWA] PWA 功能（Service Worker、安装提示）将被禁用');
          console.warn('[PWA] 当前 URL:', window.location.href);
          return;
        }
        
        if ('serviceWorker' in navigator) {
          try {
            const registration = await navigator.serviceWorker.getRegistration();
            console.log('[PWA] Service Worker registration:', registration ? 'active' : 'none');
            
            if (!registration) {
              console.warn('[PWA] ⚠️ Service Worker 未注册，尝试注册...');
              try {
                const newReg = await navigator.serviceWorker.register('/sw.js');
                console.log('[PWA] Service Worker 注册成功:', newReg);
              } catch (regErr) {
                console.error('[PWA] Service Worker 注册失败:', regErr);
              }
            }
          } catch (err) {
            console.error('[PWA] Service Worker check failed:', err);
          }
        } else {
          console.warn('[PWA] ⚠️ 浏览器不支持 Service Worker');
        }
      };
      
      checkPWAConditions();

      return () => {
        window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
        window.removeEventListener('appinstalled', handleAppInstalled);
        console.log('[PWA] Event listeners cleaned up');
      };
    }, 500);

    return () => clearTimeout(timer);
  }, [isFirstVisit]);

  // 监听网络状态
  useEffect(() => {
    const handleOnline = () => {
      setState((prev) => ({ ...prev, isOffline: false }));
    };

    const handleOffline = () => {
      setState((prev) => ({ ...prev, isOffline: true }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 安装应用
  const installApp = useCallback(async () => {
    if (!state.installPrompt) return;

    try {
      await state.installPrompt.prompt();
      const choiceResult = await state.installPrompt.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('用户接受了安装');
        setState((prev) => ({
          ...prev,
          isInstallable: false,
          installPrompt: null,
        }));
      } else {
        console.log('用户拒绝了安装');
      }
    } catch (error) {
      console.error('安装失败:', error);
    }
  }, [state.installPrompt]);

  // 忽略安装
  const dismissInstall = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isInstallable: false,
      installPrompt: null,
    }));
  }, []);

  // 检查更新
  const checkUpdate = useCallback(async () => {
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready;
      await registration.update();
    }
  }, []);

  return {
    ...state,
    installApp,
    dismissInstall,
    checkUpdate,
  };
}
