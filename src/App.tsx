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

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    window.matchMedia('(min-width: 768px)').matches
  );

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isDesktop;
}

function App() {
  const isDesktop = useIsDesktop();

  useEffect(() => {
    initializeDataStore();
  }, []);

  useEffect(() => {
    const unsubscribe = themeManager.subscribe(() => {});
    return () => unsubscribe();
  }, []);

  return (
    <PhoneFrame isDesktop={isDesktop}>
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
