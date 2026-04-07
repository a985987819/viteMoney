import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Input, message, Tag, Modal, Calendar, Radio, DatePicker } from 'antd';
import type { InputRef } from 'antd';
import type { Dayjs } from 'dayjs';
import {
  LeftOutlined,
  SettingOutlined,
  WalletOutlined,
  CheckCircleOutlined,
  EllipsisOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import { createRecord, updateRecord, type RecordItem } from '../../api/record';
import { getLocalRecords, saveLocalRecords } from '../../utils/storage';
import { useAuth } from '../../hooks/useAuth';
import useCalculator from '../../hooks/useCalculator';
import { useTranslation } from 'react-i18next';
import { expenseCategories, incomeCategories, type MainCategory, type SubCategory } from '../../constants/categories';
import { getCategoryIcon } from '../../constants/categoryIconMapping';
import SubCategoryModal from '../../components/SubCategoryModal';
import SpriteIcon from '../../components/SpriteIcon';
import KeyboardAvoidingView from '../../components/KeyboardAvoidingView';
import styles from './index.module.scss';

type RecordType = 'expense' | 'income';
type Operator = '+' | '-';
type DatePickerMode = 'date' | 'month' | 'year';

interface SelectedCategory {
  mainCategory: MainCategory;
  subCategory: SubCategory | null;
}

interface RecordData {
  type: RecordType;
  category: string;
  subCategory: string | undefined;
  categoryIcon: string;
  amount: number;
  remark: string;
  date: number;
  account: string;
}

/** 构建记录数据的辅助函数 */
const buildRecordData = (params: {
  activeType: RecordType;
  selectedCategory: SelectedCategory;
  finalAmount: string;
  remark: string;
  selectedDate: Dayjs;
  account: string;
}): RecordData => ({
  type: params.activeType,
  category: params.selectedCategory.mainCategory.name,
  subCategory: params.selectedCategory.subCategory?.name,
  categoryIcon: getCategoryIcon(params.selectedCategory.mainCategory.name) || '',
  amount: parseFloat(params.finalAmount),
  remark: params.remark,
  date: params.selectedDate.valueOf(),
  account: params.account,
});

const AddRecord = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  const { t } = useTranslation();

  // 检查是否是编辑模式
  const editingRecord = location.state?.record as RecordItem | undefined;
  const isEditMode = !!editingRecord;

  const [activeType, setActiveType] = useState<RecordType>('expense');
  const [selectedCategory, setSelectedCategory] = useState<SelectedCategory | null>(null);
  const [remark, setRemark] = useState('');
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedAccount] = useState(t('addRecord.defaultAccount'));
  const [, setLoading] = useState(false);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [datePickerMode, setDatePickerMode] = useState<DatePickerMode>('date');
  const [isSubCategoryModalVisible, setIsSubCategoryModalVisible] = useState(false);
  const [currentExpandCategory, setCurrentExpandCategory] = useState<MainCategory | null>(null);

  // 计算器逻辑
  const { amount, canCalculate, handleNumberClick, handleDelete, handleOperatorClick, handleCalculate, calculate, reset: resetCalculator, setAmount } = useCalculator('');

  // 如果是编辑模式，初始化数据
  useEffect(() => {
    if (editingRecord) {
      setActiveType(editingRecord.type === 'income' ? 'income' : 'expense');
      setAmount(editingRecord.amount.toString());
      setRemark(editingRecord.remark);
      setSelectedDate(dayjs(editingRecord.date));

      // 查找并设置分类
      const allCategories = activeType === 'expense' ? expenseCategories : incomeCategories;
      const mainCat = allCategories.find(c => c.name === editingRecord.category);
      if (mainCat) {
        const subCat = mainCat.subCategories.find(s => s.name === editingRecord.subCategory);
        setSelectedCategory({
          mainCategory: mainCat,
          subCategory: subCat || null,
        });
      }
    }
  }, [editingRecord]);

  // 获取当前类型的分类列表
  const currentCategories = useMemo(() => {
    return activeType === 'expense' ? expenseCategories : incomeCategories;
  }, [activeType]);

  // 处理分类点击（直接选择主分类）
  const handleCategoryClick = (category: MainCategory) => {
    setSelectedCategory({
      mainCategory: category,
      subCategory: null,
    });
  };

  // 处理展开子分类
  const handleExpandSubCategories = (e: React.MouseEvent, category: MainCategory) => {
    e.stopPropagation();
    setCurrentExpandCategory(category);
    setIsSubCategoryModalVisible(true);
  };

  // 处理子分类选择
  const handleSubCategorySelect = (subCategory: SubCategory | null) => {
    if (currentExpandCategory) {
      setSelectedCategory({
        mainCategory: currentExpandCategory,
        subCategory,
      });
    }
  };

  /** 获取最终金额（如果需要计算则计算） */
  const getFinalAmount = (): string => {
    return canCalculate ? calculate() : amount;
  };

  // 保存记录
  const handleSave = async () => {
    if (!selectedCategory) {
      message.warning(t('addRecord.categoryRequired'));
      return;
    }
    if (!amount || parseFloat(amount) === 0) {
      message.warning(t('addRecord.amountRequired'));
      return;
    }

    const finalAmount = getFinalAmount();
    const recordData = buildRecordData({
      activeType,
      selectedCategory,
      finalAmount,
      remark,
      selectedDate,
      account: selectedAccount,
    });

    setLoading(true);
    try {
      if (isEditMode && editingRecord) {
        if (isLoggedIn) {
          await updateRecord(editingRecord.id, recordData);
        } else {
          const localRecords = getLocalRecords();
          const updatedRecords = localRecords.map(r =>
            r.id === editingRecord.id ? { ...r, ...recordData } : r
          );
          saveLocalRecords(updatedRecords);
        }
        message.success(t('addRecord.updateSuccess'));
      } else {
        if (isLoggedIn) {
          await createRecord(recordData);
        } else {
          const localRecords = getLocalRecords();
          const newRecord = { id: `local_${Date.now()}`, ...recordData };
          saveLocalRecords([newRecord, ...localRecords]);
        }
        message.success(t('addRecord.saveSuccess'));
      }
      navigate('/');
    } catch (error) {
      message.error(isEditMode ? t('addRecord.updateFailed') : t('addRecord.saveFailed'));
      console.error('Save error:', error);
    } finally {
      setLoading(false);
    }
  };

  // 保存并继续
  const handleSaveAndAdd = async () => {
    if (!selectedCategory) {
      message.warning(t('addRecord.categoryRequired'));
      return;
    }
    if (!amount || parseFloat(amount) === 0) {
      message.warning(t('addRecord.amountRequired'));
      return;
    }

    const finalAmount = getFinalAmount();
    const recordData = buildRecordData({
      activeType,
      selectedCategory,
      finalAmount,
      remark,
      selectedDate,
      account: selectedAccount,
    });

    setLoading(true);
    try {
      await createRecord(recordData);
      message.success(t('addRecord.saveSuccess'));
      setRemark('');
      setSelectedCategory(null);
      resetCalculator();
    } catch (error) {
      message.error(t('addRecord.saveFailed'));
    } finally {
      setLoading(false);
    }
  };

  // 处理日期选择
  const handleDateSelect = (date: Dayjs) => {
    setSelectedDate(date);
    setIsDatePickerVisible(false);
  };

  const handleMonthSelect = (date: Dayjs) => {
    setSelectedDate(date);
    setDatePickerMode('date');
  };

  const handleYearSelect = (year: number) => {
    setSelectedDate(dayjs().year(year));
    setDatePickerMode('month');
  };

  const typeOptions = [
    { key: 'expense', label: t('addRecord.expense') },
    { key: 'income', label: t('addRecord.income') },
  ];

  const remarkInputRef = useRef<InputRef | null>(null);

  // 处理备注输入框聚焦时的键盘避让
  const handleRemarkFocus = () => {
    // 延迟滚动，等待键盘弹出
    setTimeout(() => {
      // 获取 Ant Design Input 组件的实际 input 元素
      const inputElement = remarkInputRef.current?.input ?? undefined;
      if (inputElement) {
        const rect = inputElement.getBoundingClientRect();
        const scrollContainer = inputElement.closest('.page-container');
        if (scrollContainer) {
          const containerRect = scrollContainer.getBoundingClientRect();
          const relativeTop = rect.top - containerRect.top;
          
          // 如果输入框被键盘遮挡，滚动到可见位置
          const visibleHeight = window.innerHeight - (window.innerHeight - containerRect.height > 150 ? window.innerHeight - containerRect.height : 0);
          if (relativeTop > visibleHeight - 150) {
            scrollContainer.scrollTo({
              top: scrollContainer.scrollTop + relativeTop - 100,
              behavior: 'smooth',
            });
          }
        }
      }
    }, 350);
  };

  return (
    <KeyboardAvoidingView className={`page-container ${styles.addRecordContainer}`}>
      {/* 顶部导航 */}
      <div className={styles.addHeader}>
        <LeftOutlined className={styles.backIcon} onClick={() => navigate('/')} />
        <div className={styles.headerTitle}>{isEditMode ? t('addRecord.editTitle') : t('addRecord.title')}</div>
        <div className={styles.typeTabs}>
          {typeOptions.map((type) => (
            <button
              key={type.key}
              className={`${styles.typeTab} ${activeType === type.key ? styles.active : ''}`}
              onClick={() => setActiveType(type.key as RecordType)}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* 分类选择区域 */}
      <div className={styles.categorySection}>
        <div className={styles.categoryGrid}>
          {currentCategories.map((category) => (
            <div
              key={category.id}
              className={`${styles.categoryItem} ${selectedCategory?.mainCategory.id === category.id ? styles.selected : ''}`}
              onClick={() => handleCategoryClick(category)}
            >
              <div className={styles.categoryIconWrapper}>
                <SpriteIcon iconId={category.icon} size={40} />
              </div>
              <div className={styles.categoryName}>{category.name}</div>
              {selectedCategory?.mainCategory.id === category.id && (
                <CheckCircleOutlined className={styles.selectedMark} />
              )}
              {/* 展开子分类按钮 */}
              {category.subCategories.length > 0 && (
                <div
                  className={styles.expandBtn}
                  onClick={(e) => handleExpandSubCategories(e, category)}
                >
                  <EllipsisOutlined />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 显示已选子分类 */}
      {selectedCategory?.subCategory && (
        <div className={styles.selectedSubCategory}>
          <span className={styles.label}>{t('addRecord.subCategory')}:</span>
          <span className={styles.value}>{selectedCategory.subCategory.name}</span>
        </div>
      )}

      {/* 底部输入区域 */}
      <div className={styles.inputSection}>
        {/* 快捷标签 */}
        <div className={styles.quickTags}>
          <Tag className={styles.quickTag} icon={<WalletOutlined />}>{t('addRecord.account')}</Tag>
          <Tag className={`${styles.quickTag} ${styles.active}`}>{t('addRecord.defaultAccount')}</Tag>
          <Tag className={styles.quickTag} icon={<SettingOutlined />} onClick={() => navigate('/category-manage')} />
        </div>

        {/* 备注和金额 */}
        <div className={styles.remarkAmountRow}>
          <div className={styles.remarkInputWrapper}>
            <CheckCircleOutlined className={styles.remarkIcon} />
            <Input
              ref={remarkInputRef}
              placeholder={t('addRecord.remarkPlaceholder')}
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              onFocus={handleRemarkFocus}
              className={styles.remarkInput}
              variant="borderless"
              maxLength={50}
            />
          </div>
          <div className={styles.amountDisplayWrapper}>
            <span
              className={`${styles.dateDisplay} ${styles.clickable}`}
              onClick={() => setIsDatePickerVisible(true)}
            >
              {selectedDate.format('M月D日')}
            </span>
            <span className={styles.amountDisplay}>¥{amount || '0.00'}</span>
          </div>
        </div>

        {/* 数字键盘 */}
        <div className={styles.numberKeyboard}>
          <div className={styles.keyboardRow}>
            <button className={styles.keyBtn} onClick={() => handleNumberClick('1')}>1</button>
            <button className={styles.keyBtn} onClick={() => handleNumberClick('2')}>2</button>
            <button className={styles.keyBtn} onClick={() => handleNumberClick('3')}>3</button>
            <button className={`${styles.keyBtn} ${styles.deleteBtn}`} onClick={handleDelete}>{'\u00d7'}</button>
          </div>
          <div className={styles.keyboardRow}>
            <button className={styles.keyBtn} onClick={() => handleNumberClick('4')}>4</button>
            <button className={styles.keyBtn} onClick={() => handleNumberClick('5')}>5</button>
            <button className={styles.keyBtn} onClick={() => handleNumberClick('6')}>6</button>
            <button className={`${styles.keyBtn} ${styles.operatorBtn}`} onClick={() => handleOperatorClick('-')}>-</button>
          </div>
          <div className={styles.keyboardRow}>
            <button className={styles.keyBtn} onClick={() => handleNumberClick('7')}>7</button>
            <button className={styles.keyBtn} onClick={() => handleNumberClick('8')}>8</button>
            <button className={styles.keyBtn} onClick={() => handleNumberClick('9')}>9</button>
            <button className={`${styles.keyBtn} ${styles.operatorBtn}`} onClick={() => handleOperatorClick('+')}>+</button>
          </div>
          <div className={styles.keyboardRow}>
            {!isEditMode && (
              <button className={`${styles.keyBtn} ${styles.saveAgainBtn}`} onClick={handleSaveAndAdd}>{t('addRecord.saveAgain')}</button>
            )}
            {isEditMode && <button className={styles.keyBtn} onClick={() => handleNumberClick('0')}>0</button>}
            {!isEditMode && <button className={styles.keyBtn} onClick={() => handleNumberClick('0')}>0</button>}
            <button className={styles.keyBtn} onClick={() => handleNumberClick('.')}>.</button>
            <button
              className={`${styles.keyBtn} ${canCalculate ? styles.calculateBtn : styles.saveBtn}`}
              onClick={canCalculate ? () => handleCalculate() : handleSave}
            >
              {canCalculate ? t('addRecord.calculate') : (isEditMode ? t('addRecord.update') : t('addRecord.save'))}
            </button>
          </div>
        </div>
      </div>

      {/* 子分类选择弹窗 */}
      <SubCategoryModal
        visible={isSubCategoryModalVisible}
        category={currentExpandCategory}
        onClose={() => setIsSubCategoryModalVisible(false)}
        onSelect={handleSubCategorySelect}
        selectedSubCategoryId={selectedCategory?.subCategory?.id}
      />

      {/* 日期选择弹窗 */}
      <Modal
        title={
          datePickerMode === 'date' ? t('addRecord.selectDate') :
            datePickerMode === 'month' ? t('addRecord.selectMonth') : t('addRecord.selectYear')
        }
        open={isDatePickerVisible}
        onCancel={() => setIsDatePickerVisible(false)}
        footer={null}
        width={datePickerMode === 'year' ? 320 : 430}
        className={styles.datePickerModal}

      >
        <div className={styles.datePickerContent}>
          {/* 模式切换 */}
          <div className={styles.datePickerTabs}>
            <Radio.Group
              value={datePickerMode}
              onChange={(e) => setDatePickerMode(e.target.value)}
              buttonStyle="solid"
              className={styles.modeRadio}
            >
              <Radio.Button value="date">{t('addRecord.byDay')}</Radio.Button>
              <Radio.Button value="month">{t('addRecord.byMonth')}</Radio.Button>
              <Radio.Button value="year">{t('addRecord.byYear')}</Radio.Button>
            </Radio.Group>
          </div>

          {/* 日期选择 */}
          {datePickerMode === 'date' && (
            <Calendar
              value={selectedDate}
              onSelect={handleDateSelect}
              fullscreen={true}
              mode="month"
            />
          )}

          {/* 月份选择 */}
          {datePickerMode === 'month' && (
            <Calendar
              value={selectedDate}
              onSelect={handleMonthSelect}
              fullscreen={false}
              mode="year"
              headerRender={({ value, onChange }) => {
                const year = value.year();
                return (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '8px' }}>
                    <Radio.Group
                      value={year}
                      onChange={(e) => onChange(value.year(e.target.value))}
                      buttonStyle="solid"
                    >
                      <Radio.Button value={year - 1}>{year - 1}年</Radio.Button>
                      <Radio.Button value={year}>{year}年</Radio.Button>
                      <Radio.Button value={year + 1}>{year + 1}年</Radio.Button>
                    </Radio.Group>
                  </div>
                );
              }}
            />
          )}

          {/* 年份选择 */}
          {datePickerMode === 'year' && (
            <div className={styles.yearPickerContainer}>
              <DatePicker
                picker="year"
                value={selectedDate}
                onChange={(date) => {
                  if (date) {
                    handleYearSelect(date.year());
                  }
                }}
                open={true}
                style={{ width: '100%' }}
              />
            </div>
          )}
        </div>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default AddRecord;
