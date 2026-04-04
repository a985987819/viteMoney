import React from 'react';
import styles from './index.module.scss';

interface SafeAreaLayoutProps {
  children: React.ReactNode;
  className?: string;
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
}

/**
 * 安全区域布局组件
 * 自动处理 iPhone 刘海屏、底部横条等安全区域
 */
export const SafeAreaLayout: React.FC<SafeAreaLayoutProps> = ({
  children,
  className = '',
  top = false,
  bottom = true,
  left = false,
  right = false,
}) => {
  const safeAreaClasses = [
    styles.safeArea,
    top && styles.safeAreaTop,
    bottom && styles.safeAreaBottom,
    left && styles.safeAreaLeft,
    right && styles.safeAreaRight,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={safeAreaClasses}>{children}</div>;
};

/**
 * 底部安全区域占位组件
 * 用于底部有固定导航栏时的内容避让
 */
export const BottomSafeArea: React.FC = () => {
  return <div className={styles.bottomSafeArea} />;
};

/**
 * 顶部安全区域占位组件
 * 用于顶部有状态栏时的内容避让
 */
export const TopSafeArea: React.FC = () => {
  return <div className={styles.topSafeArea} />;
};

export default SafeAreaLayout;
