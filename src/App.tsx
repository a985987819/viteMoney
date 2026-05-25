import { useEffect, useState, Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider, App as AntdApp } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { AuthProvider } from './hooks/useAuth';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import OfflineIndicator from './components/OfflineIndicator';
import { themeManager } from './utils/theme';
import { initializeDataStore } from './utils/dataMigration';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingScreen from './components/LoadingScreen';
import PhoneFrame from './components/PhoneFrame';
import router from './router';
import './App.module.scss';

const theme = {
  token: {
    colorPrimary: '#8B5A2B',
    colorSuccess: '#4a9c3d',
    colorWarning: '#e8a838',
    colorError: '#c45c48',
    colorInfo: '#6b9dc7',
    borderRadius: 8,
    fontSize: 14,
    colorBgBase: '#f5e8c7',
    colorTextBase: '#3c2f1f',
  },
  components: {
    Button: {
      borderRadius: 8,
    },
    Input: {
      borderRadius: 8,
    },
    Tag: {
      borderRadius: 12,
    },
    Card: {
      borderRadius: 12,
    },
    Modal: {
      borderRadius: 16,
    },
  },
};

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

function App() {
  const showPhoneFrame = useShouldShowPhoneFrame();

  useEffect(() => {
    initializeDataStore();
  }, []);

  useEffect(() => {
    const unsubscribe = themeManager.subscribe(() => {});
    return () => unsubscribe();
  }, []);

  return (
    <PhoneFrame isDesktop={showPhoneFrame}>
      <ErrorBoundary>
        <ConfigProvider locale={zhCN} theme={theme}>
          <AntdApp>
            <AuthProvider>
              <Suspense fallback={<LoadingScreen />}>
                <RouterProvider router={router} />
              </Suspense>
              <OfflineIndicator />
              <PWAInstallPrompt />
            </AuthProvider>
          </AntdApp>
        </ConfigProvider>
      </ErrorBoundary>
    </PhoneFrame>
  );
}

export default App;
