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

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.transform = `translateX(${translateX}px)`;
    }
  }, [translateX]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.stopPropagation();
    const touch = e.touches[0];
    startXRef.current = touch.clientX;
    currentXRef.current = touch.clientX;
    diffXRef.current = 0;
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging) return;

    const touch = e.touches[0];
    currentXRef.current = touch.clientX;
    diffXRef.current = currentXRef.current - startXRef.current;

    if (diffXRef.current < 0) {
      setTranslateX(Math.max(diffXRef.current, -buttonWidth));
    } else {
      setTranslateX(0);
    }
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);

    if (diffXRef.current < -buttonWidth / 2) {
      setTranslateX(-buttonWidth);
    } else {
      setTranslateX(0);
    }
  }, []);

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
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <RecordItemComponent record={record} />
      </div>
    </div>
  );
});

export default SwipeableRecordItem;
