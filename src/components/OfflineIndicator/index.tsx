import { useEffect, useState } from 'react';
import { WifiOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

const OfflineIndicator = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (!isOffline) return null;

  return (
    <div className={styles.offlineBar}>
      <WifiOutlined className={styles.icon} />
      <span>当前处于离线状态，部分功能可能不可用</span>
    </div>
  );
};

export default OfflineIndicator;
