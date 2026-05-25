import { useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { message, Popconfirm } from 'antd';
import { CloseOutlined, SettingOutlined } from '@ant-design/icons';
import { getQuickRecords, saveQuickRecords, type QuickRecord, addLocalRecord, getLocalCategories } from '../../utils/storage';
import type { RecordItem } from '../../api/record';
import type { Category } from '../../api/category';
import SpriteIcon from '../SpriteIcon';
import styles from './index.module.scss';

interface QuickRecordPanelProps {
  onRecorded?: () => void;
}

const QuickRecordPanel = memo(({ onRecorded }: QuickRecordPanelProps) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [quickRecords, setQuickRecords] = useState<QuickRecord[]>(() =>
    getQuickRecords().sort((a, b) => a.order - b.order)
  );
  const [categories] = useState<Record<string, Category[]>>(() => {
    const stored = getLocalCategories();
    return stored || {};
  });

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleBackdropClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  const getCategoryInfo = useCallback((categoryId: string, subCategoryId: string): { name: string; icon: string } => {
    const allCategories = [...(categories.expense || []), ...(categories.income || [])];
    const category = allCategories.find(c => c.id === categoryId);
    if (!category) return { name: '未知', icon: '❓' };
    const subCategoryList = category.subCategories || [];
    const subCategory = subCategoryList.find(s => s.id === subCategoryId);
    return {
      name: subCategory?.name || category.name,
      icon: subCategory?.icon || category.icon,
    };
  }, [categories]);

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
  }, [onRecorded, getCategoryInfo]);

  const handleEmptyClick = useCallback(() => {
    setIsOpen(false);
    navigate('/quick-record-manage');
  }, [navigate]);

  const handleDeleteQuickRecord = useCallback((e: React.MouseEvent, itemId: string) => {
    e.stopPropagation();
    const records = getQuickRecords().filter(r => r.id !== itemId);
    saveQuickRecords(records);
    setQuickRecords(records.sort((a, b) => a.order - b.order));
    message.success('已删除');
  }, []);

  const handleGoToManage = useCallback(() => {
    setIsOpen(false);
    navigate('/quick-record-manage');
  }, [navigate]);

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.visible : ''}`}
        onClick={handleBackdropClick}
      />
      <div className={styles.quickRecordPanel}>
        <div
          className={`${styles.quickRecordHandle} ${isOpen ? styles.open : ''}`}
          onClick={handleToggle}
        />
        <div className={`${styles.quickRecordList} ${isOpen ? styles.open : ''}`}>
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
                  <Popconfirm
                    title="删除快捷记账"
                    description="确定要删除这条快捷记账吗？"
                    onConfirm={(e) => handleDeleteQuickRecord(e as unknown as React.MouseEvent, item.id)}
                    okText="删除"
                    cancelText="取消"
                    okButtonProps={{ danger: true }}
                    placement="right"
                  >
                    <span
                      className={styles.deleteBtn}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <CloseOutlined />
                    </span>
                  </Popconfirm>
                  <SpriteIcon iconId={info.icon} size={20} className={styles.quickRecordIcon} />
                  <span className={styles.quickRecordName}>{info.name}</span>
                  <span className={styles.quickRecordAmount}>¥{item.amount.toFixed(2)}</span>
                </div>
              );
            })
          )}
          {quickRecords.length > 0 && (
            <div className={styles.manageLink} onClick={handleGoToManage}>
              <SettingOutlined />
              <span>管理快捷记账</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
});

QuickRecordPanel.displayName = 'QuickRecordPanel';

export default QuickRecordPanel;