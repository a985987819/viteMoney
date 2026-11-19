import { useEffect, useRef, useState } from 'react';

interface UseCountUpOptions {
  /** 动画时长（ms） */
  duration?: number;
  /** 保留小数位 */
  decimals?: number;
}

/**
 * 数字滚动动画：目标值变化时从当前显示值平滑过渡到新值
 * 用 rAF 驱动，支持中途打断续接（从当前渲染值继续滚向新目标）
 */
export const useCountUp = (target: number, options: UseCountUpOptions = {}): number => {
  const { duration = 500, decimals = 0 } = options;
  const [display, setDisplay] = useState(target);
  const displayRef = useRef(target); // 当前显示值（动画打断续接的起点）
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const from = displayRef.current;
    if (from === target) return;

    const startTime = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      // easeOutCubic：先快后慢，数字滚动更自然
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = from + (target - from) * eased;
      displayRef.current = value;
      setDisplay(value);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      }
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return Number(display.toFixed(decimals));
};

export default useCountUp;
