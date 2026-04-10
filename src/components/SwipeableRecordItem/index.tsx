import { useState, useRef, useCallback, memo, useEffect } from 'react';
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

const SwipeableRecordItem = memo(({ record, onEdit, onDelete, isLastItem }: SwipeableRecordItemProps) => {
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const diffXRef = useRef(0);
  const buttonWidth = 120;
  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartYRef = useRef(0);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.transform = `translateX(${translateX}px)`;
    }
  }, [translateX]);

  // 使用原生事件监听，设置 passive: false
  useEffect(() => {
    const element = contentRef.current;
    if (!element) return;

    const handleTouchStartNative = (e: TouchEvent) => {
      const touch = e.touches[0];
      startXRef.current = touch.clientX;
      currentXRef.current = touch.clientX;
      touchStartYRef.current = touch.clientY;
      diffXRef.current = 0;
      setIsDragging(true);
    };

    const handleTouchMoveNative = (e: TouchEvent) => {
      if (!isDragging) return;

      const touch = e.touches[0];
      const diffX = touch.clientX - startXRef.current;
      const diffY = touch.clientY - touchStartYRef.current;

      // 水平滑动距离大于垂直滑动距离时才阻止默认行为
      // 同时检查事件是否可取消，避免浏览器滚动时的报错
      if (Math.abs(diffX) > Math.abs(diffY) && e.cancelable) {
        e.preventDefault();
      }

      currentXRef.current = touch.clientX;
      diffXRef.current = diffX;

      if (diffXRef.current < 0) {
        setTranslateX(Math.max(diffXRef.current, -buttonWidth));
      } else {
        setTranslateX(0);
      }
    };

    const handleTouchEndNative = () => {
      setIsDragging(false);

      if (diffXRef.current < -buttonWidth / 2) {
        setTranslateX(-buttonWidth);
      } else {
        setTranslateX(0);
      }
    };

    element.addEventListener('touchstart', handleTouchStartNative, { passive: true });
    element.addEventListener('touchmove', handleTouchMoveNative, { passive: false });
    element.addEventListener('touchend', handleTouchEndNative, { passive: true });

    return () => {
      element.removeEventListener('touchstart', handleTouchStartNative);
      element.removeEventListener('touchmove', handleTouchMoveNative);
      element.removeEventListener('touchend', handleTouchEndNative);
    };
  }, [isDragging]);

  const handleEdit = () => {
    setTranslateX(0);
    onEdit(record);
  };

  const handleDelete = () => {
    setTranslateX(0);
    onDelete(record);
  };

  return (
    <div className={`${styles.swipeableItemWrapper} ${isLastItem ? styles.lastItem : ''}`}>
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
      >
        <RecordItemComponent record={record} />
      </div>
    </div>
  );
});

export default SwipeableRecordItem;
