import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { AuthProvider } from './hooks/useAuth';
import { PWAInstallPrompt } from './components/PWAInstallPrompt';
import { themeManager } from './utils/theme';
import router from './router';
import './App.module.scss';

// 自定义主题配置 - 星露谷风格
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

function App() {
  // 初始化主题
  useEffect(() => {
    themeManager.subscribe(() => {
      // 主题变化时会自动更新 CSS 变量
    });
  }, []);

  return (
    <ConfigProvider locale={zhCN} theme={theme}>
      <AuthProvider>
        <RouterProvider router={router} />
        <PWAInstallPrompt />
      </AuthProvider>
    </ConfigProvider>
  );
}

export default App;
