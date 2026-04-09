import { useState, useEffect, useCallback, useRef } from 'react';

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
}

// 全局存储 beforeinstallprompt 事件，确保不会丢失
let globalInstallPrompt: BeforeInstallPromptEvent | null = null;

export function usePWA() {
  const [state, setState] = useState<PWAState>({
    isInstallable: false,
    isInstalled: false,
    isOffline: !navigator.onLine,
    isStandalone: false,
    installPrompt: null,
    updateAvailable: false,
    needRefresh: false,
  });

  const isInitialized = useRef(false);

  // 检查是否已安装（独立运行模式）
  useEffect(() => {
    const checkStandalone = () => {
      const isStandalone =
        window.matchMedia('(display-mode: standalone)').matches ||
        window.matchMedia('(display-mode: fullscreen)').matches ||
        window.matchMedia('(display-mode: minimal-ui)').matches ||
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

  // 监听安装提示 - 关键：立即注册监听器，不能延迟
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    console.log('[PWA Hook] Initializing...');

    // 处理 beforeinstallprompt 事件
    const handleBeforeInstallPrompt = (e: Event) => {
      console.log('[PWA] beforeinstallprompt event fired');

      // 阻止默认行为（防止自动显示迷你信息栏）
      e.preventDefault();

      // 存储事件供后续使用
      globalInstallPrompt = e as BeforeInstallPromptEvent;

      setState((prev) => ({
        ...prev,
        installPrompt: e as BeforeInstallPromptEvent,
        isInstallable: true,
      }));
    };

    // 处理应用已安装事件
    const handleAppInstalled = () => {
      console.log('[PWA] appinstalled event fired');
      globalInstallPrompt = null;
      setState((prev) => ({
        ...prev,
        isInstallable: false,
        isInstalled: true,
        installPrompt: null,
      }));
    };

    // 立即注册事件监听器
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // 检查是否已经捕获了全局事件
    if (globalInstallPrompt) {
      setState((prev) => ({
        ...prev,
        installPrompt: globalInstallPrompt,
        isInstallable: true,
      }));
    }

    // 检查 PWA 安装条件
    const checkPWAConditions = async () => {
      console.log('[PWA] Checking PWA conditions...');

      const isSecureContext = window.isSecureContext;
      const isHTTPS = window.location.protocol === 'https:';
      const isLocalhost = window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1';
      const isSecureEnvironment = isSecureContext || isHTTPS || isLocalhost;

      console.log('[PWA] isSecureContext:', isSecureContext);
      console.log('[PWA] isHTTPS:', isHTTPS);
      console.log('[PWA] isLocalhost:', isLocalhost);
      console.log('[PWA] Service Worker support:', 'serviceWorker' in navigator);
      console.log('[PWA] Current URL:', window.location.href);

      if (!isSecureEnvironment) {
        console.warn('[PWA] ⚠️ 警告：当前不是安全环境（HTTPS 或 localhost）');
        console.warn('[PWA] PWA 功能将被禁用');
      }

      // 检查 Service Worker 状态
      if ('serviceWorker' in navigator) {
        try {
          const registration = await navigator.serviceWorker.ready;
          console.log('[PWA] Service Worker ready:', registration);
          console.log('[PWA] SW active:', registration.active);
          console.log('[PWA] SW waiting:', registration.waiting);
          console.log('[PWA] SW installing:', registration.installing);

          // 检查 manifest 是否存在
          const manifestLink = document.querySelector('link[rel="manifest"]');
          console.log('[PWA] Manifest link element:', manifestLink);
          if (manifestLink) {
            console.log('[PWA] Manifest href:', (manifestLink as HTMLLinkElement).href);
          }

          // 检查是否已经触发过 beforeinstallprompt（通过检测全局变量）
          console.log('[PWA] globalInstallPrompt exists:', !!globalInstallPrompt);
        } catch (err) {
          console.error('[PWA] Error checking SW:', err);
        }
      }

      // 检查图标
      const icons = document.querySelectorAll('link[rel="apple-touch-icon"], link[rel="icon"]');
      console.log('[PWA] Icon elements found:', icons.length);
    };

    checkPWAConditions();

    // 备用检测：如果 beforeinstallprompt 事件未触发，定期检查安装条件
    const fallbackCheckInterval = setInterval(async () => {
      if (!globalInstallPrompt && 'serviceWorker' in navigator) {
        console.log('[PWA] Fallback check: re-checking install conditions...');
        try {
          const registration = await navigator.serviceWorker.ready;
          const manifestLink = document.querySelector('link[rel="manifest"]');

          // 如果 manifest 存在且 SW 就绪，但 isInstallable 仍为 false，尝试手动触发
          if (manifestLink && registration.active) {
            console.log('[PWA] Fallback: Manifest and SW ready, checking if can prompt...');
            // Chrome 可能不会再次触发 beforeinstallprompt，但我们仍然尝试
          }
        } catch (err) {
          // 忽略错误
        }
      }
    }, 5000);

    return () => {
      clearInterval(fallbackCheckInterval);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

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

  // 监听 Service Worker 更新
  useEffect(() => {
    if (!('serviceWorker' in navigator)) return;

    const handleControllerChange = () => {
      console.log('[PWA] Service Worker controller changed');
      setState((prev) => ({ ...prev, updateAvailable: true, needRefresh: true }));
    };

    const handleUpdateFound = async () => {
      console.log('[PWA] Update found in Service Worker');
      setState((prev) => ({ ...prev, updateAvailable: true, needRefresh: true }));

      const registration = await navigator.serviceWorker.ready;
      if (registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
    };

    navigator.serviceWorker.addEventListener('controllerchange', handleControllerChange);

    navigator.serviceWorker.ready.then((registration) => {
      registration.addEventListener('updatefound', handleUpdateFound);

      if (registration.active && registration.waiting) {
        setState((prev) => ({ ...prev, updateAvailable: true, needRefresh: true }));
      }
    });

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', handleControllerChange);
    };
  }, []);

  // 安装应用
  const installApp = useCallback(async () => {
    const promptEvent = state.installPrompt || globalInstallPrompt;

    if (!promptEvent) {
      console.warn('[PWA] No install prompt available');
      return;
    }

    try {
      await promptEvent.prompt();
      const choiceResult = await promptEvent.userChoice;

      if (choiceResult.outcome === 'accepted') {
        console.log('[PWA] 用户接受了安装');
        globalInstallPrompt = null;
        setState((prev) => ({
          ...prev,
          isInstallable: false,
          installPrompt: null,
        }));
      } else {
        console.log('[PWA] 用户拒绝了安装');
      }
    } catch (error) {
      console.error('[PWA] 安装失败:', error);
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

  // 手动触发安装提示
  const triggerInstall = useCallback(async () => {
    const promptEvent = state.installPrompt || globalInstallPrompt;
    if (promptEvent) {
      await installApp();
    } else {
      // 如果没有可用的 prompt，尝试重新检查
      if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.ready;
        await registration.update();
      }
      console.warn('[PWA] No install prompt available');
    }
  }, [state.installPrompt, installApp]);

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
    triggerInstall,
  };
}
