import React from 'react';
import styles from './index.module.scss';

export interface DialogOption {
  text: string;
  onClick: () => void;
}

export interface StardewDialogProps {
  /** 对话内容 */
  content: string;
  /** 说话人图片URL */
  speakerImage?: string;
  /** 说话人名称 */
  speaker?: string;
  /** 确定按钮文字，不传则不显示 */
  okText?: string;
  /** 取消按钮文字，不传则不显示 */
  cancelText?: string;
  /** 确定按钮点击事件 */
  onOk?: () => void;
  /** 取消按钮点击事件 */
  onCancel?: () => void;
  /** 点击空白区域关闭回调 */
  onClose?: () => void;
  /** 是否显示对话框 */
  visible: boolean;
}

/**
 * 星露谷风格对话框组件
 * 使用 dialogBg.png 作为背景
 */
const StardewDialog: React.FC<StardewDialogProps> = ({
  content,
  speakerImage,
  speaker,
  okText = '确定',
  cancelText = '取消',
  onOk,
  onCancel,
  onClose,
  visible,
}) => {
  if (!visible) return null;

  // 处理点击空白区域
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onClose) {
      onClose();
    }
  };

  return (
    <div className={styles.dialogOverlay} onClick={handleOverlayClick}>
      <div className={styles.dialogContainer}>
        {/* 左侧对话内容区域 */}
        <div className={styles.contentSection}>
          <div className={styles.contentText}>{content}</div>
        </div>

        {/* 右侧说话人区域 */}
        <div className={styles.speakerSection}>
          {/* 说话人图片 */}
          <div className={styles.speakerImageWrapper}>
            {speakerImage ? (
              <img src={speakerImage} alt={speaker || 'speaker'} className={styles.speakerImage} />
            ) : (
              <div className={styles.speakerPlaceholder} />
            )}
          </div>

          {/* 说话人名称 */}
          {speaker && (
            <div className={styles.speakerNameWrapper}>
              <span className={styles.speakerName}>{speaker}</span>
            </div>
          )}
        </div>

        {/* 底部按钮区域 */}
        <div className={styles.buttonSection}>
          {onCancel && (
            <button className={`${styles.dialogButton} ${styles.cancelButton}`} onClick={onCancel}>
              {cancelText}
            </button>
          )}
          {onOk && (
            <button className={`${styles.dialogButton} ${styles.okButton}`} onClick={onOk}>
              {okText}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default StardewDialog;
