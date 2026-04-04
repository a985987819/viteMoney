import { useTranslation } from 'react-i18next';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

interface EmptyStateProps {
  icon?: string;
  title?: string;
  description?: string;
  actionText?: string;
  onAction?: () => void;
  showAction?: boolean;
}

const CDN_BASE_URL = 'https://vercel-icons.vercel.app';

export const EmptyState = ({
  icon = `${CDN_BASE_URL}/fall in faint.png`,
  title,
  description,
  actionText,
  onAction,
  showAction = true,
}: EmptyStateProps) => {
  const { t } = useTranslation();

  return (
    <div className={styles.emptyState}>
      <div className={styles.iconWrapper}>
        <img src={icon} alt="empty" className={styles.icon} />
      </div>
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}
      {showAction && onAction && (
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAction}
          className={styles.actionButton}
        >
          {actionText || t('common.add')}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
