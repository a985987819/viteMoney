import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import StardewDialog from '../StardewDialog';
import { CDN_BASE_URL } from '../../constants/cdn';
import styles from './index.module.scss';

/**
 * 路由错误处理组件
 * 处理 React Router 的路由错误，使用 StardewDialog 显示
 */
const RouteError: React.FC = () => {
  const { t } = useTranslation();
  const error = useRouteError();

  // 构建错误信息
  let errorMessage = t('error.description');
  let errorTitle = t('error.title');

  if (isRouteErrorResponse(error)) {
    // 路由错误响应
    errorTitle = `${t('error.title')} (${error.status})`;
    errorMessage = error.statusText || error.data?.message || t('error.description');
  } else if (error instanceof Error) {
    // JavaScript 错误
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  }

  // 构建对话内容
  const content = `${errorTitle}\n\n${errorMessage}\n\n${t('error.tryRefresh')}`;

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className={styles.errorContainer}>
      <StardewDialog
        visible={true}
        content={content}
        speakerImage={`${CDN_BASE_URL}/fall in faint.png`}
        speaker="麻辣烫"
        okText={t('error.refresh')}
        cancelText={t('error.goHome')}
        onOk={handleRefresh}
        onCancel={handleGoHome}
      />

      {/* 背景装饰 */}
      <div className={styles.decorations}>
        {[...Array(8)].map((_, i) => (
          <div key={i} className={styles.pixelGrass} />
        ))}
      </div>
    </div>
  );
};

export default RouteError;
