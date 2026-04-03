import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

interface PageHeaderProps {
  title: string;
  onBack?: () => void;
  backPath?: string;
  rightContent?: React.ReactNode;
  showBack?: boolean;
  className?: string;
}

/**
 * 通用页面顶部导航组件
 * 统一管理返回按钮和页面标题
 */
const PageHeader = ({
  title,
  onBack,
  backPath,
  rightContent,
  showBack = true,
  className = '',
}: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`${styles.header} ${className}`}>
      {showBack ? (
        <Button
          type="text"
          icon={<LeftOutlined />}
          onClick={handleBack}
          className={styles.backBtn}
        />
      ) : (
        <div className={styles.placeholder} />
      )}
      <span className={styles.title}>{title}</span>
      {rightContent || <div className={styles.placeholder} />}
    </div>
  );
};

export default PageHeader;
