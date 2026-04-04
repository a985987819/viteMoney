import React from 'react';
import styles from './index.module.scss';

export type ThemeType = 'spring' | 'summer' | 'autumn' | 'winter' | 'default';

export interface ThemeButtonProps {
  /** 按钮文本 */
  children?: React.ReactNode;
  /** 按钮类型/主题 */
  theme?: ThemeType;
  /** 按钮大小 */
  size?: 'small' | 'medium' | 'large';
  /** 自定义背景图片 URL */
  backgroundImage?: string;
  /** 点击事件 */
  onClick?: () => void;
  /** 按钮样式类名 */
  className?: string;
  /** 按下状态的样式类名 */
  activeClassName?: string;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 按钮类型 */
  type?: 'default' | 'primary' | 'dashed' | 'text' | 'link';
  /** 是否为块级按钮 */
  block?: boolean;
  /** 图标 */
  icon?: React.ReactNode;
}

/**
 * 主题按钮组件
 * 支持春夏秋冬四个主题，每个主题有不同的配色和背景
 */
const ThemeButton: React.FC<ThemeButtonProps> = ({
  children,
  theme = 'default',
  size = 'medium',
  backgroundImage,
  onClick,
  className = '',
  activeClassName = '',
  disabled = false,
  style,
  type = 'default',
  block = false,
  icon,
}) => {
  const [isPressed, setIsPressed] = React.useState(false);

  const handleMouseDown = () => {
    if (!disabled) {
      setIsPressed(true);
    }
  };

  const handleMouseUp = () => {
    setIsPressed(false);
  };

  const handleMouseLeave = () => {
    setIsPressed(false);
  };

  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  // 组合类名
  const buttonClasses = [
    styles.themeButton,
    styles[theme],
    styles[size],
    type !== 'default' ? styles[type] : '',
    block ? styles.block : '',
    disabled ? styles.disabled : '',
    isPressed && activeClassName ? activeClassName : '',
    className,
  ].filter(Boolean).join(' ');

  // 计算背景样式
  const backgroundStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  return (
    <button
      className={buttonClasses}
      style={{ ...backgroundStyle, ...style }}
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      disabled={disabled}
    >
      {icon && <span className={styles.buttonIcon}>{icon}</span>}
      {children && <span className={styles.buttonText}>{children}</span>}
    </button>
  );
};

export default ThemeButton;
