import { createRoot } from 'react-dom/client'
import './index.scss'
import './i18n'
import App from './App.tsx'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { resourceLoader, ResourceLoadingState } from './utils/resourceLoader'
import LoadingScreen from './components/LoadingScreen'
import ErrorBoundary from './components/ErrorBoundary'
import PhoneFrame from './components/PhoneFrame'

function useShouldShowPhoneFrame() {
  const [showFrame, setShowFrame] = useState(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    if (isStandalone) return false;
    return window.innerWidth >= 768;
  });

  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    if (isStandalone) {
      setShowFrame(false);
      return;
    }

    const mql = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setShowFrame(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return showFrame;
}

const AppLoader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { i18n } = useTranslation()
  const showPhoneFrame = useShouldShowPhoneFrame()

  useEffect(() => {
    const lang = i18n.language
    if (lang.startsWith('en')) {
      dayjs.locale('en')
    } else {
      dayjs.locale('zh-cn')
    }

    resourceLoader.setOnComplete(() => {
      setTimeout(() => {
        setIsLoading(false)
        ResourceLoadingState.isLoading = false
      }, 800)
    })

    resourceLoader.load()
  }, [i18n.language])

  return (
    <PhoneFrame isDesktop={showPhoneFrame}>
      <ErrorBoundary>
        {isLoading ? (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        ) : (
          <App />
        )}
      </ErrorBoundary>
    </PhoneFrame>
  )
}

const Root: React.FC = () => {
  return (
    <AppLoader />
  )
}

window.addEventListener('error', (event) => {
  console.error('=== Global Error Event ===');
  console.error('Message:', event.message);
  console.error('Error:', event.error);
  console.error('Filename:', event.filename);
  console.error('Line:', event.lineno, 'Column:', event.colno);
  console.error('========================');

  if (event.message?.includes('echarts') || event.message?.includes('Activity')) {
    console.error('ECharts error detected!');
    console.error('This error should be caught by ErrorBoundary');
  }
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('=== Unhandled Promise Rejection ===');
  console.error('Reason:', event.reason);
  console.error('Promise:', event.promise);
  console.error('====================================');

  if (event.reason instanceof Error) {
    setTimeout(() => {
      throw event.reason;
    }, 0);
  } else {
    setTimeout(() => {
      throw new Error(String(event.reason));
    }, 0);
  }
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swPath = import.meta.env.DEV ? '/dev-sw.js?dev-sw' : '/sw.js';

    navigator.serviceWorker.register(swPath, {
      scope: '/',
      type: 'classic'
    })
    .then((registration) => {
      console.log('[PWA] Service Worker 注册成功:', registration);

      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('[PWA] 发现新版本，请刷新页面');
            }
          });
        }
      });
    })
    .catch((error) => {
      console.error('[PWA] Service Worker 注册失败:', error);
    });
  });
}

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(<Root />)
}
