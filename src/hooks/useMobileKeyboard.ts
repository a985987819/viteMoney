import { useEffect, useState, useCallback } from 'react';

interface KeyboardState {
  isOpen: boolean;
  height: number;
  windowHeight: number;
}

export function useMobileKeyboard() {
  const [keyboardState, setKeyboardState] = useState<KeyboardState>({
    isOpen: false,
    height: 0,
    windowHeight: window.innerHeight,
  });

  const [originalHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      const currentHeight = window.innerHeight;
      const heightDiff = originalHeight - currentHeight;
      
      // 如果高度差大于 150px，认为是键盘弹出
      const isKeyboardOpen = heightDiff > 150;
      
      setKeyboardState({
        isOpen: isKeyboardOpen,
        height: isKeyboardOpen ? heightDiff : 0,
        windowHeight: currentHeight,
      });
    };

    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.contentEditable === 'true'
      ) {
        // 延迟检查，等待键盘完全弹出
        setTimeout(() => {
          const currentHeight = window.innerHeight;
          const heightDiff = originalHeight - currentHeight;
          if (heightDiff > 150) {
            setKeyboardState({
              isOpen: true,
              height: heightDiff,
              windowHeight: currentHeight,
            });
          }
        }, 300);
      }
    };

    const handleBlur = () => {
      setTimeout(() => {
        const activeElement = document.activeElement;
        if (
          !activeElement ||
          (activeElement.tagName !== 'INPUT' &&
            activeElement.tagName !== 'TEXTAREA' &&
            activeElement.contentEditable !== 'true')
        ) {
          setKeyboardState({
            isOpen: false,
            height: 0,
            windowHeight: window.innerHeight,
          });
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    document.addEventListener('focusin', handleFocus);
    document.addEventListener('focusout', handleBlur);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('focusin', handleFocus);
      document.removeEventListener('focusout', handleBlur);
    };
  }, [originalHeight]);

  const scrollToElement = useCallback((element: HTMLElement) => {
    setTimeout(() => {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const elementTop = rect.top + scrollTop;
      const offset = 100; // 距离顶部的偏移量

      window.scrollTo({
        top: elementTop - offset,
        behavior: 'smooth',
      });
    }, 350);
  }, []);

  return {
    ...keyboardState,
    scrollToElement,
  };
}
