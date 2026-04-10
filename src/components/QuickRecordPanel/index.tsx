import { useState, useEffect, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { getQuickRecords, type QuickRecord, addLocalRecord, getLocalCategories } from '../../utils/storage';
import type { RecordItem } from '../../api/record';
import type { Category } from '../../api/category';
import styles from './index.module.scss';

interface QuickRecordPanelProps {
  onRecorded?: () => void;
}

const QuickRecordPanel = memo(({ onRecorded }: QuickRecordPanelProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [quickRecords, setQuickRecords] = useState<QuickRecord[]>([]);
  const [categories, setCategories] = useState<Record<string, Category[]>>({});

  useEffect(() => {
    const records = getQuickRecords();
    setQuickRecords(records.sort((a, b) => a.order - b.order));
    const stored = getLocalCategories();
    if (stored) {
      setCategories(stored);
    }
  }, [isOpen]);

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleBackdropClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  const getCategoryInfo = (categoryId: string, subCategoryId: string): { name: string; icon: string } => {
    const allCategories = [...(categories.expense || []), ...(categories.income || [])];
    const category = allCategories.find(c => c.id === categoryId);
    if (!category) return { name: '未知', icon: '❓' };
    const subCategoryList = category.subCategories || [];
    const subCategory = subCategoryList.find(s => s.id === subCategoryId);
    return {
      name: subCategory?.name || category.name,
      icon: subCategory?.icon || category.icon,
    };
  };

  const handleQuickRecord = useCallback((item: QuickRecord) => {
    const info = getCategoryInfo(item.categoryId, item.subCategoryId);
    const record: RecordItem = {
      id: `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: item.type,
      amount: item.amount,
      category: info.name,
      categoryIcon: info.icon,
      remark: '',
      date: Date.now(),
      account: '默认账户',
    };

    addLocalRecord(record);
    message.success(`已记录 ${info.name}: ¥${item.amount.toFixed(2)}`);
    setIsOpen(false);
    onRecorded?.();
  }, [onRecorded, categories]);

  const handleEmptyClick = useCallback(() => {
    setIsOpen(false);
    navigate('/quick-record-manage');
  }, [navigate]);

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.visible : ''}`}
        onClick={handleBackdropClick}
      />
      <div className={`${styles.quickRecordPanel} ${isOpen ? styles.open : ''}`}>
        <div
          className={`${styles.quickRecordHandle} ${isOpen ? styles.open : ''}`}
          onClick={handleToggle}
        />
        <div className={styles.quickRecordList}>
          {quickRecords.length === 0 ? (
            <div className={styles.emptyTip} onClick={handleEmptyClick}>
              暂无快捷记账<br />点击添加
            </div>
          ) : (
            quickRecords.map(item => {
              const info = getCategoryInfo(item.categoryId, item.subCategoryId);
              return (
                <div
                  key={item.id}
                  className={styles.quickRecordItem}
                  onClick={() => handleQuickRecord(item)}
                  title={`${info.name}: ¥${item.amount.toFixed(2)}`}
                >
                  <span className={styles.quickRecordIcon}>{info.icon}</span>
                  <span className={styles.quickRecordName}>{info.name}</span>
                  <span className={styles.quickRecordAmount}>¥{item.amount.toFixed(2)}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
});

QuickRecordPanel.displayName = 'QuickRecordPanel';

export default QuickRecordPanel;