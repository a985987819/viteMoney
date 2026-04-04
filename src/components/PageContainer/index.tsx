import { type ReactNode, type CSSProperties } from 'react';
import styles from './index.module.scss';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  withSafeArea?: boolean;
  withBottomNav?: boolean;
}

export const PageContainer = ({
  children,
  className = '',
  style,
  withSafeArea = true,
  withBottomNav = false,
}: PageContainerProps) => {
  const containerClass = [
    styles.pageContainer,
    withSafeArea && styles.withSafeArea,
    withBottomNav && styles.withBottomNav,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={containerClass} style={style}>
      {children}
    </div>
  );
};

export default PageContainer;
