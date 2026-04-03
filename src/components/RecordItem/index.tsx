import { memo, useMemo } from 'react';
import type { RecordItem as RecordItemType } from '../../api/record';
import { getTimestamp } from '../../utils/importExport';
import { getCategoryIcon, getCategoryEnglishName } from '../../constants/categoryIconMapping';
import styles from './index.module.scss';

interface RecordItemProps {
  record: RecordItemType;
  onClick?: (record: RecordItemType) => void;
  showTime?: boolean;
  className?: string;
  /** 是否使用CDN图标 */
  useCdnIcon?: boolean;
  /** CDN基础路径 */
  cdnBaseUrl?: string;
}

const RecordItem = memo(({
  record,
  onClick,
  showTime = false,
  className = '',
  useCdnIcon = false,
  cdnBaseUrl = 'https://cdn.example.com/icons'
}: RecordItemProps) => {
  const handleClick = () => {
    onClick?.(record);
  };

  // 获取图标 - 优先使用映射文件的图标
  const icon = useMemo(() => {
    // 如果有categoryIcon字段且不是CDN模式，直接使用
    if (record.categoryIcon && !useCdnIcon) {
      return record.categoryIcon;
    }
    // 使用映射文件获取图标
    return getCategoryIcon(record.category);
  }, [record.category, record.categoryIcon, useCdnIcon]);

  // 获取CDN图标URL
  const iconUrl = useMemo(() => {
    if (!useCdnIcon) return null;
    const englishName = getCategoryEnglishName(record.category);
    return `${cdnBaseUrl}/${englishName}.png`;
  }, [record.category, useCdnIcon, cdnBaseUrl]);

  return (
    <div className={`${styles.recordItem} ${className}`} onClick={handleClick}>
      <div className={styles.recordItemLeft}>
        <div className={styles.recordItemIcon}>
          {useCdnIcon && iconUrl ? (
            <img src={iconUrl} alt={record.category} className={styles.cdnIcon} />
          ) : (
            icon
          )}
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
            {/* <span className={styles.recordItemAccount}>{record.account}</span> */}
          </div>
        </div>
      </div>
      <div className={styles.recordItemDots}></div>
      <div className={`${styles.recordItemAmount} ${styles[record.type]}`}>
        {record.type === 'expense' ? '-' : '+'}
        {/* <img src={`${CDN_BASE_URL}/icon.png`}
          alt={record.type === 'expense' ? '支出' : '收入'} /> */}
        {Number(record.amount).toFixed(2)}金
      </div>
    </div>
  );
});

export default RecordItem;
