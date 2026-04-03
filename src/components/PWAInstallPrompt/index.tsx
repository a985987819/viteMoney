import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePWA } from '../../hooks/usePWA';
import styles from './index.module.scss';

export const PWAInstallPrompt: React.FC = () => {
  const { t } = useTranslation();
  const {
    isInstallable,
    isOffline,
    installApp,
    dismissInstall,
    updateAvailable,
    needRefresh,
    hasShownFirstTime,
  } = usePWA();

  // 控制弹窗显示状态
  const [showPrompt, setShowPrompt] = useState(false);

  // 首次进入时自动显示弹窗
  useEffect(() => {
    if (isInstallable && hasShownFirstTime) {
      // 延迟一点显示，让页面先加载完成
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isInstallable, hasShownFirstTime]);

  // 当 isInstallable 变为 false 时，关闭弹窗
  useEffect(() => {
    if (!isInstallable) {
      setShowPrompt(false);
    }
  }, [isInstallable]);

  const handleUpdate = () => {
    window.location.reload();
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    dismissInstall();
  };

  const handleInstall = async () => {
    await installApp();
    setShowPrompt(false);
  };

  return (
    <>
      {isOffline && (
        <div className={styles.offlineIndicator}>
          {t('pwa.offline')}
        </div>
      )}

      {(updateAvailable || needRefresh) && (
        <div className={styles.updatePrompt}>
          <div className={styles.updateContent}>
            <span className={styles.updateText}>{t('pwa.update')}</span>
            <button className={styles.updateBtn} onClick={handleUpdate}>
              {t('pwa.updateBtn')}
            </button>
          </div>
        </div>
      )}

      {showPrompt && (
        <div className={styles.installPrompt}>
          <div className={styles.promptContent}>
            <div className={styles.icon}>
              <span>💰</span>
            </div>
            <div className={styles.textContent}>
              <div className={styles.title}>{t('pwa.install')}</div>
              <div className={styles.description}>
                {t('pwa.installDesc')}
              </div>
            </div>
            <div className={styles.buttons}>
              <button className={styles.installBtn} onClick={handleInstall}>
                {t('pwa.installBtn')}
              </button>
              <button className={styles.dismissBtn} onClick={handleDismiss}>
                {t('pwa.dismiss')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PWAInstallPrompt;
