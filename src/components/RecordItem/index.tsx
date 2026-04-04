import { memo, useMemo } from 'react';
import type { RecordItem as RecordItemType } from '../../api/record';
import { getTimestamp } from '../../utils/importExport';
import { getCategoryIcon } from '../../constants/categoryIconMapping';
import styles from './index.module.scss';

interface RecordItemProps {
  record: RecordItemType;
  onClick?: (record: RecordItemType) => void;
  showTime?: boolean;
  className?: string;
}

const RecordItem = memo(({
  record,
  onClick,
  showTime = false,
  className = '',
}: RecordItemProps) => {
  const handleClick = () => {
    onClick?.(record);
  };

  // 获取图标 - 使用映射文件的图标
  const icon = useMemo(() => {
    // 如果有categoryIcon字段，直接使用
    if (record.categoryIcon) {
      return record.categoryIcon;
    }
    // 使用映射文件获取图标
    return getCategoryIcon(record.category);
  }, [record.category, record.categoryIcon]);

  return (
    <div className={`${styles.recordItem} ${className}`} onClick={handleClick}>
      <div className={styles.recordItemLeft}>
        <div className={styles.recordItemIcon}>
          {icon}
        </div>
        <div className={styles.recordItemInfo}>
          <div className={styles.recordItemCategory}>
            {record.category}
            {record.subCategory && (
              <span className={styles.recordItemSubCategory}>·{record.subCategory}</span>
            )}
            {record.remark && (
              <span className={styles.recordItemRemark}>·{record.remark}</span>
            )}
          </div>
          <div className={styles.recordItemMeta}>
            {showTime && (
              <span className={styles.recordItemTime}>
                {new Date(getTimestamp(record.date)).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className={styles.recordItemDots}></div>
      <div className={`${styles.recordItemAmount} ${styles[record.type]}`}>
        {record.type === 'expense' ? '-' : '+'}
        {Number(record.amount).toFixed(2)}金
      </div>
    </div>
  );
});

export default RecordItem;
