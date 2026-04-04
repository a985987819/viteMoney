import { type ReactNode, useRef, useEffect, useState } from 'react';
import styles from './index.module.scss';

export type AnimationType = 
  | 'fadeIn' 
  | 'fadeInUp' 
  | 'fadeInDown' 
  | 'fadeInLeft' 
  | 'fadeInRight'
  | 'scaleIn'
  | 'slideInUp'
  | 'slideInDown'
  | 'bounceIn'
  | 'flipInX'
  | 'flipInY';

interface AnimatedWrapperProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  triggerOnMount?: boolean;
  triggerOnVisible?: boolean;
  once?: boolean;
}

export const AnimatedWrapper = ({
  children,
  animation = 'fadeInUp',
  delay = 0,
  duration = 0.5,
  className = '',
  triggerOnMount = true,
  triggerOnVisible = false,
  once = true,
}: AnimatedWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!triggerOnVisible);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (triggerOnMount && !triggerOnVisible) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setHasAnimated(true);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [triggerOnMount, triggerOnVisible, delay]);

  useEffect(() => {
    if (!triggerOnVisible || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setHasAnimated(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggerOnVisible, once]);

  const animationStyle = {
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
    animationFillMode: 'forwards' as const,
  };

  const animationClass = isVisible ? styles[animation] : styles.hidden;

  return (
    <div
      ref={ref}
      className={`${styles.animatedWrapper} ${animationClass} ${className}`}
      style={animationStyle}
    >
      {children}
    </div>
  );
};

// 列表项动画包装器
interface AnimatedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T) => string;
  animation?: AnimationType;
  staggerDelay?: number;
  className?: string;
}

export function AnimatedList<T>({
  items,
  renderItem,
  keyExtractor,
  animation = 'fadeInUp',
  staggerDelay = 0.1,
  className = '',
}: AnimatedListProps<T>) {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <AnimatedWrapper
          key={keyExtractor(item)}
          animation={animation}
          delay={index * staggerDelay}
          triggerOnMount
        >
          {renderItem(item, index)}
        </AnimatedWrapper>
      ))}
    </div>
  );
}

export default AnimatedWrapper;
