import React from 'react';
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
  } = usePWA();

  const handleUpdate = () => {
    window.location.reload();
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

      {isInstallable && (
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
              <button className={styles.installBtn} onClick={installApp}>
                {t('pwa.installBtn')}
              </button>
              <button className={styles.dismissBtn} onClick={dismissInstall}>
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
