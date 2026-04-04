import { useRef, useEffect, forwardRef, useImperativeHandle, type ReactNode, type CSSProperties } from 'react';
import styles from './index.module.scss';

interface ScrollContainerProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  onScrollEnd?: () => void;
  scrollEndThreshold?: number;
}

export const ScrollContainer = forwardRef<HTMLDivElement, ScrollContainerProps>(({
  children,
  className = '',
  style,
  onScroll,
  onScrollEnd,
  scrollEndThreshold = 50,
}, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollEndTriggeredRef = useRef(false);

  useImperativeHandle(ref, () => containerRef.current as HTMLDivElement);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    onScroll?.(e);

    if (onScrollEnd && containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      const distanceToBottom = scrollHeight - scrollTop - clientHeight;

      if (distanceToBottom < scrollEndThreshold && !scrollEndTriggeredRef.current) {
        scrollEndTriggeredRef.current = true;
        onScrollEnd();
      } else if (distanceToBottom >= scrollEndThreshold) {
        scrollEndTriggeredRef.current = false;
      }
    }
  };

  useEffect(() => {
    return () => {
      scrollEndTriggeredRef.current = false;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`${styles.scrollContainer} ${className}`}
      style={style}
      onScroll={handleScroll}
    >
      {children}
    </div>
  );
});

export default ScrollContainer;
