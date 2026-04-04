import React, { useEffect, useRef, useState } from 'react';
import styles from './index.module.scss';

interface KeyboardAvoidingViewProps {
  children: React.ReactNode;
  className?: string;
  enabled?: boolean;
  offset?: number;
}

/**
 * 键盘避让视图组件
 * 当键盘弹出时，自动调整内容位置避免输入框被遮挡
 */
export const KeyboardAvoidingView: React.FC<KeyboardAvoidingViewProps> = ({
  children,
  className = '',
  enabled = true,
  offset = 20,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);
  const originalHeightRef = useRef(window.innerHeight);

  useEffect(() => {
    if (!enabled) return;

    const handleFocusIn = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'
      ) {
        setFocusedElement(target);
        
        // 延迟检查键盘高度
        setTimeout(() => {
          const currentHeight = window.innerHeight;
          const heightDiff = originalHeightRef.current - currentHeight;
          
          if (heightDiff > 150) {
            setKeyboardHeight(heightDiff);
            
            // 滚动到输入框位置
            const rect = target.getBoundingClientRect();
            const containerRect = containerRef.current?.getBoundingClientRect();
            
            if (containerRect) {
              const elementBottom = rect.bottom;
              const visibleHeight = currentHeight - heightDiff;
              
              if (elementBottom > visibleHeight - offset) {
                const scrollAmount = elementBottom - visibleHeight + offset + 50;
                containerRef.current?.scrollBy({
                  top: scrollAmount,
                  behavior: 'smooth',
                });
              }
            }
          }
        }, 350);
      }
    };

    const handleFocusOut = () => {
      setTimeout(() => {
        const activeElement = document.activeElement;
        if (
          !activeElement ||
          (activeElement.tagName !== 'INPUT' &&
            activeElement.tagName !== 'TEXTAREA' &&
            (activeElement as HTMLElement).contentEditable !== 'true')
        ) {
          setKeyboardHeight(0);
          setFocusedElement(null);
        }
      }, 100);
    };

    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const heightDiff = originalHeightRef.current - currentHeight;
      
      if (heightDiff > 150) {
        setKeyboardHeight(heightDiff);
      } else {
        setKeyboardHeight(0);
      }
    };

    document.addEventListener('focusin', handleFocusIn);
    document.addEventListener('focusout', handleFocusOut);
    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('focusin', handleFocusIn);
      document.removeEventListener('focusout', handleFocusOut);
      window.removeEventListener('resize', handleResize);
    };
  }, [enabled, offset]);

  return (
    <div
      ref={containerRef}
      className={`${styles.keyboardAvoidingView} ${className}`}
      style={{
        paddingBottom: keyboardHeight > 0 ? `${keyboardHeight + offset}px` : undefined,
      }}
    >
      {children}
    </div>
  );
};

export default KeyboardAvoidingView;
