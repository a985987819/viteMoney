import React from 'react';
import { getSpriteIconStyle } from '../../utils/spriteIcons';
import styles from './index.module.scss';

interface SpriteIconProps {
  iconId: string;
  size?: number;
  className?: string;
}

/**
 * 精灵图图标组件
 * 使用CSS background-position显示精灵图中的单个图标
 */
const SpriteIcon: React.FC<SpriteIconProps> = ({ 
  iconId, 
  size = 32,
  className = '' 
}) => {
  const iconStyle = getSpriteIconStyle(iconId, size);

  return (
    <div 
      className={`${styles.spriteIcon} ${className}`}
      style={iconStyle}
      title={iconId}
    />
  );
};

export default SpriteIcon;
