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
    dismissInstall,
    updateAvailable,
    needRefresh,
    triggerInstall,
  } = usePWA();

  const isFirstVisit = !localStorage.getItem(FIRST_TIME_KEY);
  const [dismissed, setDismissed] = useState(() => localStorage.getItem('pwa_install_dismissed') === 'true');
  const [delayElapsed, setDelayElapsed] = useState(false);

  useEffect(() => {
    if (isInstallable && isFirstVisit && !dismissed && !isInstalled) {
      const timer = setTimeout(() => setDelayElapsed(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isInstallable, isFirstVisit, dismissed, isInstalled]);

  useEffect(() => {
    if (delayElapsed) {
      localStorage.setItem(FIRST_TIME_KEY, 'true');
    }
  }, [delayElapsed]);

  const showPrompt = delayElapsed && !dismissed && !isInstalled && isInstallable && isFirstVisit;
  const showManualButton = isInstallable && !showPrompt && !isInstalled && (!isFirstVisit || dismissed);

  const handleUpdate = () => {
    window.location.reload();
  };

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem('pwa_install_dismissed', 'true');
    dismissInstall();
  };

  const handleInstall = async () => {
    await triggerInstall();
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
