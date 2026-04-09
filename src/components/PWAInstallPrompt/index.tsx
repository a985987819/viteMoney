import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { usePWA } from '../../hooks/usePWA';
import styles from './index.module.scss';

const FIRST_TIME_KEY = 'pwa_first_time_shown';

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
    triggerInstall,
  } = usePWA();

  const [showPrompt, setShowPrompt] = useState(false);
  const [showManualButton, setShowManualButton] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const hasShown = localStorage.getItem(FIRST_TIME_KEY);
    setIsFirstVisit(!hasShown);
    setDismissed(localStorage.getItem('pwa_install_dismissed') === 'true');
  }, []);

  useEffect(() => {
    if (isInstalled) {
      setShowPrompt(false);
      setShowManualButton(false);
      return;
    }

    if (dismissed) {
      setShowManualButton(true);
      setShowPrompt(false);
      return;
    }

    if (isInstallable && isFirstVisit) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 2000);
      return () => clearTimeout(timer);
    } else if (isInstallable) {
      setShowManualButton(true);
    }
  }, [isInstallable, isInstalled, isFirstVisit, dismissed]);

  useEffect(() => {
    if (showPrompt) {
      localStorage.setItem(FIRST_TIME_KEY, 'true');
      setIsFirstVisit(false);
    }
  }, [showPrompt]);

  const handleUpdate = () => {
    window.location.reload();
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    setShowManualButton(false);
    setDismissed(true);
    localStorage.setItem('pwa_install_dismissed', 'true');
    dismissInstall();
  };

  const handleInstall = async () => {
    await triggerInstall();
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

      {showPrompt && !isInstalled && (
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

      {showManualButton && !showPrompt && !isInstalled && (
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
