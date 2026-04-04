import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { resourceLoader, type LoadProgress } from '../../utils/resourceLoader';
import styles from './index.module.scss';

interface LoadingScreenProps {
  onComplete?: () => void;
}

// CDN 基础地址
const CDN_BASE_URL = 'https://vercel-icons.vercel.app';

/**
 * 资源加载页面
 * 使用星露谷风格背景图，预加载所有CDN资源后进入应用
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

  useEffect(() => {
    // 设置进度回调
    resourceLoader.setOnProgress((p) => {
      setProgress(p);
    });

    // 设置完成回调
    resourceLoader.setOnComplete(() => {
      setIsReady(true);
      // 延迟一点让用户看到100%完成状态
      setTimeout(() => {
        onComplete?.();
      }, 800);
    });

    // 设置错误回调
    resourceLoader.setOnError((error, resourceName) => {
      console.warn(`资源加载失败: ${resourceName}`, error);
    });

    // 开始加载
    resourceLoader.load();

    return () => {
      resourceLoader.reset();
    };
  }, [onComplete]);

  return (
    <div
      className={styles.loadingScreen}
      style={{ backgroundImage: `url(${CDN_BASE_URL}/loadingBg.png)` }}
    >
      {/* 底部信息区域 */}
      <div className={styles.bottomSection}>
        {/* 加载文字 */}
        <div className={styles.loadingText}>
          {t('loading.openingLedger')}
        </div>

        {/* 进度条容器 */}
        <div className={styles.progressContainer}>
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
          <div className={styles.readyText}>
            {t('loading.complete')}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
