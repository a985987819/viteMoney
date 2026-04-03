import React from 'react';
import styles from './index.module.scss';

export interface StardewButtonProps {
  /** 按钮文本 */
  text: string;
  /** 图标（emoji 或图片 URL） */
  icon?: string;
  /** 点击回调 */
  onClick?: () => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 按钮尺寸 */
  size?: 'small' | 'medium' | 'large';
  /** 自定义类名 */
  className?: string;
  /** 图标位置 */
  iconPosition?: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * 星露谷物语风格的木质按钮组件
 * 带有木质纹理边框和复古像素风格
 */
const StardewButton: React.FC<StardewButtonProps> = ({
  text,
  icon,
  onClick,
  disabled = false,
  size = 'medium',
  className = '',
  iconPosition = 'bottom',
}) => {
  const sizeClass = styles[size];
  const iconPosClass = styles[`icon${iconPosition.charAt(0).toUpperCase()}${iconPosition.slice(1)}`];

  const isImageIcon = icon && (icon.startsWith('http') || icon.startsWith('/') || icon.startsWith('data:'));

  return (
    <button
      className={`${styles.stardewButton} ${sizeClass} ${icon ? iconPosClass : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      <div className={styles.buttonInner}>
        {iconPosition === 'left' && icon && (
          <span className={styles.icon}>
            {isImageIcon ? <img src={icon} alt="" /> : icon}
          </span>
        )}

        <div className={styles.content}>
          {iconPosition === 'top' && icon && (
            <span className={styles.icon}>
              {isImageIcon ? <img src={icon} alt="" /> : icon}
            </span>
          )}

          <span className={styles.text}>{text}</span>

          {iconPosition === 'bottom' && icon && (
            <span className={styles.icon}>
              {isImageIcon ? <img src={icon} alt="" /> : icon}
            </span>
          )}
        </div>

        {iconPosition === 'right' && icon && (
          <span className={styles.icon}>
            {isImageIcon ? <img src={icon} alt="" /> : icon}
          </span>
        )}
      </div>
    </button>
  );
};

export default StardewButton;
