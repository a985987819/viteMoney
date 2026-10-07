import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { ConfigProvider, Spin } from 'antd';
import { resourceLoader, type LoadProgress } from '../../utils/resourceLoader';
import { CDN_BASE_URL } from '../../constants/cdn';
import styles from './index.module.scss';

interface LoadingScreenProps {
  onComplete?: () => void;
}

/**
 * 资源加载页面
 * 使用星露谷风格背景图 + antd Spin 加载指示器，预加载所有CDN资源后进入应用
 * 本组件是资源加载的唯一驱动方：先注册回调再触发加载，确保进度事件不丢失
 */
const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [progress, setProgress] = useState<LoadProgress>({
    loaded: 0,
    total: 0,
    percentage: 0,
    currentResource: '准备加载...',
  });
  const [isReady, setIsReady] = useState(false);

  // 用 ref 保存回调，避免父组件传入的新函数导致加载流程被重启
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // 进度回调：真实反映资源加载进度
    resourceLoader.setOnProgress((p) => {
      setProgress(p);
    });

    // 完成回调：先把进度补到 100%，再短暂停留后进入应用
    resourceLoader.setOnComplete(() => {
      setProgress((prev) => ({
        ...prev,
        loaded: prev.total,
        percentage: 100,
      }));
      setIsReady(true);
      setTimeout(() => {
        onCompleteRef.current?.();
      }, 800);
    });

    // 错误回调：单个资源加载失败不阻断应用
    resourceLoader.setOnError((error, resourceName) => {
      console.warn(`资源加载失败: ${resourceName}`, error);
    });

    resourceLoader.load();

    return () => {
      // 仅解绑回调，保留已加载缓存，避免卸载后触发 setState 或重复加载
      resourceLoader.clearCallbacks();
    };
  }, []);

  return (
    <div
      id="loading-screen"
      className={styles.loadingScreen}
      style={{ backgroundImage: `url(${CDN_BASE_URL}/loadingBg.png)` }}
    >
      {/* 底部信息区域 */}
      <div className={styles.bottomSection}>
        {/* antd 加载指示器 */}
        <div id="loading-spinner" className={styles.spinnerWrapper}>
          <ConfigProvider theme={{ token: { colorPrimary: '#dc964e' } }}>
            <Spin size="large" />
          </ConfigProvider>
        </div>

        {/* 加载文字 */}
        <div id="loading-text" className={styles.loadingText}>
          {t('loading.openingLedger')}
        </div>

        {/* 进度条容器 */}
        <div id="loading-progress" className={styles.progressContainer}>
          <div className={styles.progressBar}>
            <div
              className={styles.progressFill}
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
          <div className={styles.progressText}>
            {progress.percentage}%
          </div>
        </div>

        {/* 准备就绪提示 */}
        {isReady && (
          <div id="loading-ready" className={styles.readyText}>
            {t('loading.complete')}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;