import { useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './index.module.scss';

export type TransitionDirection = 'forward' | 'back' | 'none';

/**
 * 路由层级：0 = 底部导航的 tab 页，1 = 二级页面
 * 层级变化决定转场方向：进入更深层 → forward（从右推入），返回 → back（从左拉回），
 * tab 之间平级切换 → none（轻淡入）
 */
const ROUTE_DEPTH: Record<string, number> = {
  '/': 0,
  '/statistics': 0,
  '/savings': 0,
  '/profile': 0,
  '/add': 1,
  '/add-record': 1,
  '/budget': 1,
  '/my-fridge': 1,
  '/quick-record-manage': 1,
  '/category-manage': 1,
  '/recurring': 1,
  '/savings-manage': 1,
  '/features': 1,
  '/about': 1,
  '/changelog': 1,
};

const getDepth = (pathname: string) => ROUTE_DEPTH[pathname] ?? 1;

// 全局唯一实例：记录上一次导航的路径，用于方向判定
let lastPathname: string | null = null;

const computeDirection = (pathname: string): TransitionDirection => {
  const prevDepth = lastPathname === null ? null : getDepth(lastPathname);
  lastPathname = pathname;

  if (prevDepth === null) return 'none';
  const depth = getDepth(pathname);
  if (depth === prevDepth) return 'none';
  return depth > prevDepth ? 'forward' : 'back';
};

interface PageTransitionProps {
  children: ReactNode;
}

/**
 * 页面转场容器
 * key 随路径变化强制重挂载，保证每次导航都完整播放进入动画；
 * 方向只在路径变化时判定一次并缓存，无关重渲染不会重播动画
 */
const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  // 惰性初始化：首次渲染判定方向（首访为 fade）；
  // 路径变化时在渲染期同步派生状态（React 官方模式），无关重渲染不会重播动画
  const [navState, setNavState] = useState(() => ({
    path: location.pathname,
    direction: computeDirection(location.pathname),
  }));

  if (navState.path !== location.pathname) {
    setNavState({
      path: location.pathname,
      direction: computeDirection(location.pathname),
    });
  }

  return (
    <div key={location.pathname} className={`${styles.page} ${styles[navState.direction]}`}>
      {children}
    </div>
  );
};

export default PageTransition;
