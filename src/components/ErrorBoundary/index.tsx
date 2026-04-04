import { Component, type ErrorInfo, type ReactNode } from 'react';
import { withTranslation, type WithTranslation } from 'react-i18next';
import StardewDialog from '../StardewDialog';
import styles from './index.module.scss';

interface Props extends WithTranslation {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  showDialog: boolean;
}

// CDN 基础地址
const CDN_BASE_URL = 'https://vercel-icons.vercel.app';

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    showDialog: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null, showDialog: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('=== ErrorBoundary Caught Error ===');
    console.error('Error:', error);
    console.error('ErrorInfo:', errorInfo);
    console.error('Component Stack:', errorInfo.componentStack);
    console.error('===================================');
    
    this.setState({ error, errorInfo });
    
    // 如果是 ECharts 相关错误，尝试清理 ECharts 实例
    if (error.message?.includes('Activity') || error.message?.includes('echarts')) {
      console.error('ECharts error detected, attempting cleanup...');
      try {
        // 尝试清理所有 ECharts 实例
        const echarts = (window as any).echarts;
        if (echarts && typeof echarts.dispose === 'function') {
          document.querySelectorAll('[data-echarts-instance]').forEach(el => {
            echarts.dispose(el);
          });
        }
      } catch (cleanupError) {
        console.error('Cleanup failed:', cleanupError);
      }
    }
  }

  private handleRefresh = () => {
    // 清理所有 ECharts 实例后再刷新
    try {
      const echarts = (window as any).echarts;
      if (echarts && typeof echarts.dispose === 'function') {
        document.querySelectorAll('[data-echarts-instance]').forEach(el => {
          echarts.dispose(el);
        });
      }
    } catch (e) {
      console.error('Cleanup before refresh failed:', e);
    }
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleCloseDialog = () => {
    this.setState({ showDialog: false });
  };

  public render() {
    const { t } = this.props;

    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 构建错误提示内容
      const isEChartsError = this.state.error?.message?.includes('Activity') || 
                             this.state.error?.message?.includes('echarts');
      
      const errorContent = isEChartsError
        ? `${t('error.chartErrorTitle')}\n${t('error.chartErrorDescription')}\n\n${t('error.tryRefresh')}`
        : `${t('error.title')}\n${t('error.description')}\n${t('error.tryRefresh')}`;

      return (
        <div className={styles.errorBoundary}>
          {/* 使用 StardewDialog 显示错误 */}
          <StardewDialog
            visible={this.state.showDialog}
            content={errorContent}
            speakerImage={`${CDN_BASE_URL}/fall in faint.png`}
            speaker="麻辣烫"
            okText={t('error.refresh')}
            cancelText={t('error.goHome')}
            onOk={this.handleRefresh}
            onCancel={this.handleGoHome}
            onClose={this.handleCloseDialog}
          />

          {/* 背景装饰 */}
          <div className={styles.decorations}>
            {[...Array(8)].map((_, i) => (
              <div key={i} className={styles.pixelGrass} />
            ))}
          </div>

          {/* 开发环境显示详细错误信息 */}
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <div className={styles.errorDetailsOverlay}>
              <div className={styles.errorDetails}>
                <h3>开发环境错误详情</h3>
                <p className={styles.errorMessage}>
                  {this.state.error.toString()}
                </p>
                {this.state.errorInfo && (
                  <pre className={styles.errorStack}>
                    {this.state.errorInfo.componentStack}
                  </pre>
                )}
              </div>
            </div>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default withTranslation()(ErrorBoundary);
