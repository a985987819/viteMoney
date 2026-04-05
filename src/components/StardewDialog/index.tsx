import React, { useState, useEffect, useRef } from 'react';
import styles from './index.module.scss';

export interface DialogOption {
  text: string;
  onClick: () => void;
}

export interface StardewDialogProps {
  /** 对话内容（字符串或字符串数组） */
  content: string | string[];
  /** 说话人图片 URL */
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
  /** 每屏最大字符数（默认 120 字符） */
  maxCharsPerPage?: number;
  /** 内容超出时是否启用多步骤 */
  enableMultiStep?: boolean;
}

/**
 * 星露谷风格对话框组件
 * 使用 dialogBg.png 作为背景
 * 支持多步骤显示：当内容超出高度时，点击屏幕任意地方显示下一页
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
  maxCharsPerPage = 120,
  enableMultiStep = true,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const contentRef = useRef<HTMLDivElement>(null);

  // 将内容分割成多页
  const pages = React.useMemo(() => {
    if (Array.isArray(content)) {
      return content;
    }
    
    if (!enableMultiStep) {
      return [content];
    }

    // 按字符数分割内容
    const pages: string[] = [];
    let currentContent = content;
    
    while (currentContent.length > 0) {
      if (currentContent.length <= maxCharsPerPage) {
        pages.push(currentContent);
        break;
      }
      
      // 在接近限制处找合适的断点（空格或标点）
      let breakPoint = maxCharsPerPage;
      const lastSpace = currentContent.lastIndexOf(' ', maxCharsPerPage);
      const lastPunctuation = currentContent.search(/(?<=.{80,}[,.!?.,!?])/);
      
      if (lastSpace > maxCharsPerPage * 0.8 && lastSpace > lastPunctuation) {
        breakPoint = lastSpace;
      } else if (lastPunctuation > maxCharsPerPage * 0.8) {
        breakPoint = lastPunctuation + 1;
      }
      
      pages.push(currentContent.substring(0, breakPoint).trim());
      currentContent = currentContent.substring(breakPoint).trim();
    }
    
    return pages.length > 0 ? pages : [content];
  }, [content, maxCharsPerPage, enableMultiStep]);

  useEffect(() => {
    // 重置页码
    setCurrentPage(0);
    setTotalPages(pages.length);
  }, [pages, visible]);

  if (!visible) return null;

  // 判断是否是多步骤模式且有多个页面
  const hasMultiplePages = pages.length > 1;

  // 判断是否是最后一页
  const isLastPage = currentPage >= totalPages - 1;

  // 处理点击对话框（多步骤模式下切换到下一页）
  const handleDialogClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // 如果点击的是按钮，不触发跳转
    if ((e.target as HTMLElement).tagName === 'BUTTON') {
      return;
    }
    
    if (hasMultiplePages && !isLastPage) {
      // 还有下一页，切换到下一页
      setCurrentPage(prev => prev + 1);
    } else if (isLastPage && onClose) {
      // 已经是最后一页，关闭对话框
      onClose();
    }
  };

  // 处理确定按钮
  const handleOk = () => {
    if (hasMultiplePages && !isLastPage) {
      // 还有下一页
      setCurrentPage(prev => prev + 1);
    } else if (onOk) {
      // 最后一页，执行确定操作
      onOk();
    }
  };

  // 处理取消按钮
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContainer} onClick={handleDialogClick}>
        {/* 左侧对话内容区域 */}
        <div className={styles.contentSection}>
          <div className={styles.contentText} ref={contentRef}>
            {pages[currentPage]}
          </div>
          
          {/* 页码指示器 */}
          {totalPages > 1 && (
            <div className={styles.pageIndicator}>
              <span>{currentPage + 1} / {totalPages}</span>
            </div>
          )}
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

        {/* 底部按钮区域 - 只在最后一页显示 */}
        {isLastPage && (
          <div className={styles.buttonSection}>
            {onCancel && (
              <button className={`${styles.dialogButton} ${styles.cancelButton}`} onClick={handleCancel}>
                {cancelText}
              </button>
            )}
            {onOk && (
              <button className={`${styles.dialogButton} ${styles.okButton}`} onClick={handleOk}>
                {okText}
              </button>
            )}
          </div>
        )}
        
        {/* 非最后一页时显示继续提示 */}
        {!isLastPage && hasMultiplePages && (
          <div className={styles.continueHint}>
            <span>点击继续</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StardewDialog;
