import React, { type ReactNode } from 'react';
import styles from './index.module.scss';

export interface StardewPanelProps {
  children: ReactNode;
  className?: string;
  padding?: 'small' | 'medium' | 'large';
  shadow?: boolean;
}

/**
 * 星露谷物语风格的面板容器组件
 * 带有暖橙色背景和深棕色边框
 */
const StardewPanel: React.FC<StardewPanelProps> = ({
  children,
  className = '',
  shadow = true,
}) => {
  return (
    <div
      className={`${styles.stardewPanel}  ${shadow ? styles.withShadow : ''} ${className}`}
    >
      {children}
    </div>
  );
};

export default StardewPanel;
