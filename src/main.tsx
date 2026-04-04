import { createRoot } from 'react-dom/client'
import './index.scss'
import './i18n' // 导入 i18n 配置
import App from './App.tsx'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'
import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { resourceLoader, ResourceLoadingState } from './utils/resourceLoader'
import LoadingScreen from './components/LoadingScreen'
import ErrorBoundary from './components/ErrorBoundary'

/**
 * 应用启动加载组件
 * 负责预加载所有资源，显示进度条，完成后渲染主应用
 */
const AppLoader: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { i18n } = useTranslation()

  useEffect(() => {
    // 设置 dayjs 语言
    const lang = i18n.language
    if (lang.startsWith('en')) {
      dayjs.locale('en')
    } else {
      dayjs.locale('zh-cn')
    }

    // 设置完成回调
    resourceLoader.setOnComplete(() => {
      // 添加一个小延迟，让用户看到100%完成状态
      setTimeout(() => {
        setIsLoading(false)
        ResourceLoadingState.isLoading = false
      }, 800)
    })

    // 开始加载资源
    resourceLoader.load()
  }, [i18n.language])

  // 显示加载屏幕
  if (isLoading) {
    return (
      <LoadingScreen onComplete={() => setIsLoading(false)} />
    )
  }

  // 加载完成后渲染主应用
  return <App />
}

// 渲染应用 - 使用 ErrorBoundary 包裹
const Root: React.FC = () => {
  return (
    <ErrorBoundary>
      <AppLoader />
    </ErrorBoundary>
  )
}

// 全局错误处理器 - 捕获所有未捕获的错误
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  // 如果是 ECharts 相关的错误，记录但不阻止默认行为
  if (event.message?.includes('echarts') || event.message?.includes('Activity')) {
    console.error('ECharts error detected, error boundary will handle it');
  }
});

// 捕获 Promise  rejection 错误
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});

const rootElement = document.getElementById('root')
if (rootElement) {
  createRoot(rootElement).render(<Root />)
}
