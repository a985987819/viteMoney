import { useState, useRef, useCallback, memo } from 'react';
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
  const [, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const diffXRef = useRef(0);
  const buttonWidth = 120;
  const contentRef = useRef<HTMLDivElement>(null);
  const touchStartYRef = useRef(0);
  const isOpenRef = useRef(false);

  const updateTransform = useCallback((x: number) => {
    if (contentRef.current) {
      contentRef.current.style.transform = `translateX(${x}px)`;
    }
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    startXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
    diffXRef.current = 0;
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    const diffX = touch.clientX - startXRef.current;
    const diffY = touch.clientY - touchStartYRef.current;

    if (Math.abs(diffX) > Math.abs(diffY) && e.cancelable) {
      e.preventDefault();
    }

    diffXRef.current = diffX;

    if (diffXRef.current < 0) {
      const newX = Math.max(diffXRef.current, -buttonWidth);
      updateTransform(newX);
    } else {
      updateTransform(0);
    }
  }, [isDragging, updateTransform]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);

    if (diffXRef.current < -buttonWidth / 2) {
      isOpenRef.current = true;
      setTranslateX(-buttonWidth);
      updateTransform(-buttonWidth);
    } else {
      isOpenRef.current = false;
      setTranslateX(0);
      updateTransform(0);
    }
  }, [updateTransform]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    startXRef.current = e.clientX;
    touchStartYRef.current = e.clientY;
    diffXRef.current = 0;
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const diffX = e.clientX - startXRef.current;
    diffXRef.current = diffX;

    if (diffXRef.current < 0) {
      const newX = Math.max(diffXRef.current, -buttonWidth);
      updateTransform(newX);
    } else {
      updateTransform(0);
    }
  }, [isDragging, updateTransform]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);

    if (diffXRef.current < -buttonWidth / 2) {
      isOpenRef.current = true;
      setTranslateX(-buttonWidth);
      updateTransform(-buttonWidth);
    } else {
      isOpenRef.current = false;
      setTranslateX(0);
      updateTransform(0);
    }
  }, [updateTransform]);

  const handleEdit = useCallback(() => {
    isOpenRef.current = false;
    setTranslateX(0);
    updateTransform(0);
    onEdit(record);
  }, [onEdit, record, updateTransform]);

  const handleDelete = useCallback(() => {
    isOpenRef.current = false;
    setTranslateX(0);
    updateTransform(0);
    onDelete(record);
  }, [onDelete, record, updateTransform]);

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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <RecordItemComponent record={record} />
      </div>
    </div>
  );
});

export default SwipeableRecordItem;
