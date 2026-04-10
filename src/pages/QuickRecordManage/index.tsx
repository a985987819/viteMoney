import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { LeftOutlined } from '@ant-design/icons';
import { getQuickRecords, addQuickRecord, deleteQuickRecord, type QuickRecord } from '../../utils/storage';
import { getLocalCategories } from '../../utils/storage';
import type { Category } from '../../api/category';
import styles from './index.module.scss';

const QuickRecordManagePage = () => {
  const navigate = useNavigate();
  const [quickRecordList, setQuickRecordList] = useState<QuickRecord[]>([]);
  const [activeType, setActiveType] = useState<'expense' | 'income'>('expense');
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [amount, setAmount] = useState('');

  useEffect(() => {
    loadQuickRecords();
    loadCategories();
  }, []);

  const loadQuickRecords = () => {
    const list = getQuickRecords();
    setQuickRecordList(list.sort((a, b) => a.order - b.order));
  };

  const loadCategories = () => {
    const stored = getLocalCategories();
    if (stored) {
      setCategories(stored[activeType] || []);
    } else {
      setCategories([]);
    }
  };

  useEffect(() => {
    loadCategories();
    setSelectedCategory(null);
    setSelectedSubCategory(null);
  }, [activeType]);

  const subCategories = useMemo(() => {
    if (!selectedCategory?.subCategories) return [];
    return selectedCategory.subCategories;
  }, [selectedCategory]);

  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
  };

  const handleSelectSubCategory = (subCategoryId: string) => {
    setSelectedSubCategory(subCategoryId);
  };

  const handleSubmit = () => {
    if (!selectedCategory || !selectedSubCategory || !amount) {
      message.warning('请选择分类和输入金额');
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      message.warning('请输入有效的金额');
      return;
    }

    addQuickRecord({
      categoryId: selectedCategory.id,
      subCategoryId: selectedSubCategory,
      amount: numAmount,
      type: activeType,
    });

    message.success('添加成功');
    setAmount('');
    setSelectedCategory(null);
    setSelectedSubCategory(null);
    loadQuickRecords();
  };

  const handleDelete = (id: string) => {
    deleteQuickRecord(id);
    message.success('删除成功');
    loadQuickRecords();
  };

  const getCategoryName = (categoryId: string, subCategoryId: string): { category: string; subCategory: string; icon: string } => {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return { category: '未知', subCategory: '未知', icon: '❓' };
    const subCategoryList = category.subCategories || [];
    const subCategory = subCategoryList.find(s => s.id === subCategoryId);
    return {
      category: category.name,
      subCategory: subCategory?.name || '未知',
      icon: subCategory?.icon || category.icon,
    };
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerSection}>
        <div className={styles.headerTop}>
          <div className={styles.backBtn} onClick={() => navigate(-1)}>
            <LeftOutlined />
          </div>
          <div className={styles.headerTitle}>快捷记账设置</div>
          <div style={{ width: 32 }} />
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.typeTabs}>
          <button
            className={`${styles.typeTab} ${activeType === 'expense' ? styles.active : ''}`}
            onClick={() => setActiveType('expense')}
          >
            支出
          </button>
          <button
            className={`${styles.typeTab} ${activeType === 'income' ? styles.active : ''}`}
            onClick={() => setActiveType('income')}
          >
            收入
          </button>
        </div>

        <div className={styles.quickRecordForm}>
          <div className={styles.formTitle}>添加快捷记账</div>

          <div className={styles.formRow}>
            <div className={styles.formLabel}>选择分类</div>
            <div className={styles.categoryGrid}>
              {categories.map(category => (
                <div
                  key={category.id}
                  className={`${styles.categoryItem} ${selectedCategory?.id === category.id ? styles.selected : ''}`}
                  onClick={() => handleSelectCategory(category)}
                >
                  <span className={styles.categoryIcon}>{category.icon}</span>
                  <span className={styles.categoryName}>{category.name}</span>
                </div>
              ))}
            </div>
          </div>

          {selectedCategory && subCategories.length > 0 && (
            <div className={styles.subCategorySection}>
              <div className={styles.formLabel}>选择子分类</div>
              <div className={styles.subCategoryGrid}>
                {subCategories.map((subCategory: any) => (
                  <div
                    key={subCategory.id}
                    className={`${styles.subCategoryItem} ${selectedSubCategory === subCategory.id ? styles.selected : ''}`}
                    onClick={() => handleSelectSubCategory(subCategory.id)}
                  >
                    {subCategory.icon} {subCategory.name}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className={styles.formRow} style={{ marginTop: 12 }}>
            <div className={styles.formLabel}>输入金额</div>
            <input
              type="number"
              className={styles.amountInput}
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>

          <button
            className={`${styles.submitBtn} ${(!selectedCategory || !selectedSubCategory || !amount) ? styles.disabled : ''}`}
            onClick={handleSubmit}
            disabled={!selectedCategory || !selectedSubCategory || !amount}
          >
            添加
          </button>
        </div>

        <div className={styles.quickRecordList}>
          <div className={styles.listTitle}>已添加的快捷记账</div>
          {quickRecordList.length === 0 ? (
            <div className={styles.listEmpty}>暂无快捷记账<br />请在上方添加</div>
          ) : (
            quickRecordList
              .filter(qr => qr.type === activeType)
              .map(qr => {
                const info = getCategoryName(qr.categoryId, qr.subCategoryId);
                return (
                  <div key={qr.id} className={styles.quickRecordItem}>
                    <span className={styles.recordIcon}>{info.icon}</span>
                    <div className={styles.recordInfo}>
                      <div className={styles.recordCategory}>{info.category}</div>
                      <div className={styles.recordSubCategory}>{info.subCategory}</div>
                    </div>
                    <span className={`${styles.recordAmount} ${qr.type === 'income' ? styles.income : ''}`}>
                      ¥{qr.amount.toFixed(2)}
                    </span>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => handleDelete(qr.id)}
                    >
                      删除
                    </button>
                  </div>
                );
              })
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickRecordManagePage;