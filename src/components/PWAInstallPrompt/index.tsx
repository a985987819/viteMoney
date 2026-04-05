import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePWA } from '../../hooks/usePWA';
import styles from './index.module.scss';

const FIRST_TIME_KEY = 'pwa_first_time_shown_v2';

export const PWAInstallPrompt: React.FC = () => {
  const { t } = useTranslation();
  const {
    isInstallable,
    isOffline,
    isInstalled,
    installApp,
    dismissInstall,
    updateAvailable,
    needRefresh,
  } = usePWA();

  // 控制弹窗显示状态
  const [showPrompt, setShowPrompt] = useState(false);
  // 添加一个手动按钮状态
  const [showManualButton, setShowManualButton] = useState(false);
  // 检查是否是首次访问
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  // 初始化：检查是否是首次访问
  useEffect(() => {
    const hasShown = localStorage.getItem(FIRST_TIME_KEY);
    setIsFirstVisit(!hasShown);
  }, []);

  // 首次进入时自动显示弹窗
  useEffect(() => {
    console.log('[PWA InstallPrompt] State changed:', {
      isInstallable,
      isInstalled,
      isFirstVisit,
      showPrompt
    });

    // 如果已安装，不显示
    if (isInstalled) {
      console.log('[PWA InstallPrompt] App is already installed');
      setShowPrompt(false);
      setShowManualButton(false);
      return;
    }

    // 可以安装时显示提示
    if (isInstallable && !isInstalled) {
      if (isFirstVisit) {
        // 首次访问：延迟显示弹窗
        console.log('[PWA InstallPrompt] Showing install prompt for first visit');
        const timer = setTimeout(() => {
          setShowPrompt(true);
        }, 1500);
        return () => clearTimeout(timer);
      } else {
        // 非首次访问：显示手动安装按钮
        console.log('[PWA InstallPrompt] Showing manual install button');
        setShowManualButton(true);
      }
    }
  }, [isInstallable, isInstalled, isFirstVisit, showPrompt]);

  // 标记已显示过首次提示
  useEffect(() => {
    if (showPrompt && isFirstVisit) {
      localStorage.setItem(FIRST_TIME_KEY, 'true');
      setIsFirstVisit(false);
      console.log('[PWA InstallPrompt] Marked first time as shown');
    }
  }, [showPrompt, isFirstVisit]);

  // 当 isInstallable 变为 false 时，关闭弹窗
  useEffect(() => {
    if (!isInstallable) {
      setShowPrompt(false);
      setShowManualButton(false);
    }
  }, [isInstallable]);

  const handleUpdate = () => {
    window.location.reload();
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowManualButton(false);
    dismissInstall();
  };

  const handleInstall = async () => {
    await installApp();
    setShowPrompt(false);
    setShowManualButton(false);
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

      {/* 手动安装按钮 - 当自动提示不显示时作为备选 */}
      {showManualButton && !showPrompt && (
        <div className={styles.manualInstallButton}>
          <button onClick={handleInstall}>
            📲 {t('pwa.installBtn')}
          </button>
        </div>
      )}
    </>
  );
};

export default PWAInstallPrompt;
