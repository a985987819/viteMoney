import { useRef, useCallback, memo } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { RecordItem } from '../../api/record';
import RecordItemComponent from '../RecordItem';
import styles from './index.module.scss';

interface SwipeableRecordItemProps {
  record: RecordItem;
  onEdit: (record: RecordItem) => void;
  onDelete: (record: RecordItem) => void;
  isLastItem?: boolean;
}

// 手势参数
const BUTTON_WIDTH = 120; // 操作按钮总宽
const OPEN_RATIO = 0.5; // 释放时判定打开的位移阈值比例
const FLING_VELOCITY = 0.5; // 快速甩动判定速度（px/ms）
const ELASTIC = 0.3; // 越界橡皮筋阻尼系数
const DIRECTION_LOCK_DISTANCE = 8; // 横纵方向锁判定距离（px）

const SwipeableRecordItem = memo(({ record, onEdit, onDelete, isLastItem }: SwipeableRecordItemProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isOpenRef = useRef(false);

  // 手势状态全部走 ref：拖动过程零重渲染，保证跟手
  const gestureRef = useRef({
    active: false,
    horizontal: null as boolean | null, // 方向锁：null=未判定，true=横向，false=纵向
    startX: 0,
    startY: 0,
    startOffset: 0, // 手势开始时的内容位移（0 或 -BUTTON_WIDTH）
    lastX: 0,
    lastT: 0,
    velocity: 0, // 低通滤波后的横向速度
    moved: false, // 是否发生过有效滑动（用于吞掉合成 click）
  });

  // 直接更新 DOM：变量挂在 wrapper 上，内容层与按钮层共同继承
  const applyOffset = useCallback((x: number) => {
    const el = wrapperRef.current;
    if (!el) return;
    el.style.setProperty('--swipe-x', `${x}px`);
    el.style.setProperty('--swipe-progress', String(Math.min(Math.max(-x / BUTTON_WIDTH, 0), 1)));
  }, []);

  const setDragMode = useCallback((dragging: boolean) => {
    const el = contentRef.current;
    if (el) el.style.transition = dragging ? 'none' : '';
  }, []);

  const snapTo = useCallback((open: boolean) => {
    setDragMode(false); // 恢复 CSS 弹性回弹
    applyOffset(open ? -BUTTON_WIDTH : 0);
    isOpenRef.current = open;
  }, [applyOffset, setDragMode]);

  const beginGesture = useCallback((clientX: number, clientY: number) => {
    const g = gestureRef.current;
    g.active = true;
    g.horizontal = null;
    g.startX = clientX;
    g.startY = clientY;
    g.lastX = clientX;
    g.lastT = performance.now();
    g.velocity = 0;
    g.moved = false;
    // 从打开态继续拖动时，等效起点右移一个按钮宽，避免跳变
    g.startOffset = isOpenRef.current ? -BUTTON_WIDTH : 0;
  }, []);

  const moveGesture = useCallback((clientX: number, clientY: number) => {
    const g = gestureRef.current;
    if (!g.active) return;

    const dx = clientX - g.startX;
    const dy = clientY - g.startY;

    // 方向锁：首次超过判定距离时锁定横/纵，纵向直接放行给页面滚动
    if (g.horizontal === null) {
      const absX = Math.abs(dx);
      const absY = Math.abs(dy);
      if (absX < DIRECTION_LOCK_DISTANCE && absY < DIRECTION_LOCK_DISTANCE) return;
      g.horizontal = absX > absY;
      if (g.horizontal) setDragMode(true); // 进入跟手模式，禁用回弹 transition
    }
    if (!g.horizontal) return;

    g.moved = true;

    // 速度采样（低通滤波，减少抖动）
    const now = performance.now();
    const dt = now - g.lastT;
    if (dt > 0) {
      const vx = (clientX - g.lastX) / dt;
      g.velocity = g.velocity * 0.8 + vx * 0.2;
      g.lastX = clientX;
      g.lastT = now;
    }

    let x = g.startOffset + dx;
    // 越界橡皮筋：阻尼跟随，松手必弹回
    if (x < -BUTTON_WIDTH) x = -BUTTON_WIDTH + (x + BUTTON_WIDTH) * ELASTIC;
    else if (x > 0) x *= ELASTIC;
    applyOffset(x);
  }, [applyOffset, setDragMode]);

  const endGesture = useCallback(() => {
    const g = gestureRef.current;
    if (!g.active) return;
    g.active = false;
    if (!g.horizontal) return; // 纵向滚动，不参与 swipe

    // 位移过半 或 朝向一致的快速甩动 → 切换开合
    const finalX = g.startOffset + (g.lastX - g.startX);
    let shouldOpen: boolean;
    if (g.velocity < -FLING_VELOCITY) {
      shouldOpen = true;
    } else if (g.velocity > FLING_VELOCITY) {
      shouldOpen = false;
    } else {
      shouldOpen = finalX < -BUTTON_WIDTH * OPEN_RATIO;
    }
    snapTo(shouldOpen);
  }, [snapTo]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    beginGesture(touch.clientX, touch.clientY);
  }, [beginGesture]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    moveGesture(touch.clientX, touch.clientY);
    // 说明：不调用 e.preventDefault() —— React 对 touchmove 使用 passive 委托，
    // 水平手势的默认行为已由 CSS touch-action: pan-y 接管
  }, [moveGesture]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const hadMoved = gestureRef.current.moved;
    endGesture();
    // 滑动后吞掉浏览器合成的 click，避免误触
    if (hadMoved) e.preventDefault();
  }, [endGesture]);

  // 桌面端鼠标拖动：事件挂在 window 上，拖出元素也不会丢
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.preventDefault(); // 阻止文字选中/原生拖拽
    beginGesture(e.clientX, e.clientY);

    const onMouseMove = (ev: MouseEvent) => moveGesture(ev.clientX, ev.clientY);
    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      endGesture();
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, [beginGesture, moveGesture, endGesture]);

  const handleContentClick = useCallback((e: React.MouseEvent) => {
    // 滑动结束产生的合成 click：吞掉
    if (gestureRef.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    // 已打开时点击内容区直接关闭
    if (isOpenRef.current) {
      e.stopPropagation();
      snapTo(false);
    }
  }, [snapTo]);

  const handleEdit = useCallback(() => {
    snapTo(false);
    onEdit(record);
  }, [onEdit, record, snapTo]);

  const handleDelete = useCallback(() => {
    snapTo(false);
    onDelete(record);
  }, [onDelete, record, snapTo]);

  return (
    <div
      ref={wrapperRef}
      className={`${styles.swipeableItemWrapper} ${isLastItem ? styles.lastItem : ''}`}
    >
      <div className={styles.swipeableActions}>
        <button
          className={`${styles.actionBtn} ${styles.editBtn}`}
          onClick={handleEdit}
        >
          <EditOutlined />
          <span>编辑</span>
        </button>
        <button
          className={`${styles.actionBtn} ${styles.deleteBtn}`}
          onClick={handleDelete}
        >
          <DeleteOutlined />
          <span>删除</span>
        </button>
      </div>

      <div
        ref={contentRef}
        className={styles.swipeableContent}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={endGesture}
        onMouseDown={handleMouseDown}
        onClick={handleContentClick}
      >
        <RecordItemComponent record={record} />
      </div>
    </div>
  );
});

SwipeableRecordItem.displayName = 'SwipeableRecordItem';

export default SwipeableRecordItem;
