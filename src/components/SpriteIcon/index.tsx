import React from 'react';
import { getCategoryEmoji } from '../../utils/spriteIcons';
import styles from './index.module.scss';

interface SpriteIconProps {
  iconId: string;
  size?: number;
  className?: string;
}

/**
 * Emoji图标组件
 * 统一使用Emoji显示分类图标
 */
const SpriteIcon: React.FC<SpriteIconProps> = ({
  iconId,
  size = 32,
  className = ''
}) => {
  const emoji = getCategoryEmoji(iconId);

  return (
    <div
      className={`${styles.spriteIcon} ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: `${size * 0.75}px`,
        lineHeight: 1,
      }}
      title={iconId}
    >
      {emoji}
    </div>
  );
};

export default SpriteIcon;
