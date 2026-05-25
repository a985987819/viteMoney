import { useState, useCallback, useRef, useEffect, type ReactNode } from 'react';
import styles from './index.module.scss';

const PHONE_ASPECT_RATIO = 19.5 / 9;
const DEFAULT_WIDTH = 393;
const MIN_WIDTH = 320;
const MAX_WIDTH = 500;

const PhoneFrame = ({ children, isDesktop }: { children: ReactNode; isDesktop: boolean }) => {
  const [width, setWidth] = useState(() => {
    try {
      const saved = localStorage.getItem('phone_frame_width');
      return saved ? Math.min(Math.max(Number(saved), MIN_WIDTH), MAX_WIDTH) : DEFAULT_WIDTH;
    } catch {
      return DEFAULT_WIDTH;
    }
  });
  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);
  const widthRef = useRef(width);

  useEffect(() => {
    widthRef.current = width;
  }, [width]);

  const handleResizeStart = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    setIsResizing(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startXRef.current = clientX;
    startWidthRef.current = widthRef.current;
  }, []);

  useEffect(() => {
    if (!isDesktop || !isResizing) return;

    const handleMove = (clientX: number) => {
      const diff = clientX - startXRef.current;
      const newWidth = Math.min(Math.max(startWidthRef.current + diff, MIN_WIDTH), MAX_WIDTH);
      setWidth(newWidth);
    };

    const handleEnd = () => {
      setIsResizing(false);
      try {
        localStorage.setItem('phone_frame_width', widthRef.current.toString());
      } catch { /* ignore */ }
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onMouseUp = () => handleEnd();
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const onTouchEnd = () => handleEnd();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDesktop, isResizing]);

  if (!isDesktop) {
    return <>{children}</>;
  }

  const height = Math.round(width * PHONE_ASPECT_RATIO);
  const contentHeight = height - 16;

  return (
    <div className={styles.desktopBackground}>
      <div
        className={styles.phoneFrame}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          maxWidth: 'calc(100vw - 32px)',
          maxHeight: 'calc(100vh - 32px)',
        }}
      >
        <div
          className={styles.phoneContent}
          style={{ '--app-height': `${contentHeight}px` } as React.CSSProperties}
        >
          {children}
        </div>
        <div
          className={`${styles.resizeHandle} ${isResizing ? styles.active : ''}`}
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
        />
      </div>
    </div>
  );
};

export default PhoneFrame;
