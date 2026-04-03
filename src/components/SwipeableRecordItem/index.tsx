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
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const buttonWidth = 120; // 两个按钮的总宽度

  const handleTouchStart = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startXRef.current = clientX;
    currentXRef.current = clientX;
    setIsDragging(true);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;

    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    currentXRef.current = clientX;

    const diff = clientX - startXRef.current;
    // 只允许向左滑动，最大滑动距离为按钮宽度
    if (diff < 0) {
      setTranslateX(Math.max(diff, -buttonWidth));
    } else {
      setTranslateX(0);
    }
  }, [isDragging]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
    const diff = currentXRef.current - startXRef.current;

    // 如果滑动超过一半，则完全展开，否则收起
    if (diff < -buttonWidth / 2) {
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
      {/* 背景按钮层 */}
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

      {/* 内容层 */}
      <div
        className={styles.swipeableContent}
        style={{ transform: `translateX(${translateX}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        <RecordItemComponent record={record} />
      </div>
    </div>
  );
});

export default SwipeableRecordItem;
