import { useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Modal, Form, Input, message, Popconfirm, type InputRef } from 'antd';
import {
  PlusOutlined,
  HolderOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import type { Category, CategoryType } from '../../api/category';
import PageHeader from '../../components/PageHeader';
import { expenseCategories, incomeCategories } from '../../constants/categories';
import { getLocalCategories, saveLocalCategories } from '../../utils/storage';
import styles from './index.module.scss';

const generateDefaultCategories = (): Record<CategoryType, Category[]> => {
  const expense: Category[] = expenseCategories.map((cat, index) => ({
    id: `expense_${index + 1}`,
    name: cat.name,
    icon: cat.icon,
    type: 'expense' as const,
    subCategories: cat.subCategories.map((sub, subIndex) => ({
      id: `expense_${index + 1}_${subIndex + 1}`,
      name: sub.name,
      icon: sub.icon,
    })),
  }));

  const income: Category[] = incomeCategories.map((cat, index) => ({
    id: `income_${index + 1}`,
    name: cat.name,
    icon: cat.icon,
    type: 'income' as const,
    subCategories: cat.subCategories.map((sub, subIndex) => ({
      id: `income_${index + 1}_${subIndex + 1}`,
      name: sub.name,
      icon: sub.icon,
    })),
  }));

  return {
    expense,
    income,
    transfer: [
      { id: 'transfer_1', name: '转账', icon: '🔄', type: 'transfer' },
      { id: 'transfer_2', name: '还款', icon: '💳', type: 'transfer' },
    ],
    debt: [
      { id: 'debt_1', name: '借入', icon: '📥', type: 'debt' },
      { id: 'debt_2', name: '借出', icon: '📤', type: 'debt' },
      { id: 'debt_3', name: '还款', icon: '✅', type: 'debt' },
    ],
    reimbursement: [
      { id: 'reimbursement_1', name: '报销', icon: '📋', type: 'reimbursement' },
    ],
  };
};

const defaultCategories = generateDefaultCategories();

const typeLabels: Record<CategoryType, string> = {
  expense: '支出',
  income: '收入',
  transfer: '转账',
  debt: '借贷',
  reimbursement: '报销',
};

const CategoryManage = () => {
  const [searchParams] = useSearchParams();
  const typeFromUrl = searchParams.get('type') as CategoryType || 'expense';

  const [activeType, setActiveType] = useState<CategoryType>(typeFromUrl);
  const [categories, setCategories] = useState<Record<CategoryType, Category[]>>(() => {
    const stored = getLocalCategories();
    return stored || defaultCategories;
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [form] = Form.useForm();
  const emojiInputRef = useRef<InputRef>(null);


  const saveCategories = (newCategories: Record<CategoryType, Category[]>) => {
    setCategories(newCategories);
    saveLocalCategories(newCategories);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newCategories = { ...categories };
    const currentList = [...newCategories[activeType]];
    const draggedItem = currentList[draggedIndex];

    currentList.splice(draggedIndex, 1);
    currentList.splice(index, 0, draggedItem);

    newCategories[activeType] = currentList;
    saveCategories(newCategories);
    setDraggedIndex(index);
  };

  const openModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setSelectedIcon(category.icon);
      form.setFieldsValue({ name: category.name });
    } else {
      setEditingCategory(null);
      setSelectedIcon('');
      form.resetFields();
    }
    setShowEmojiPicker(false);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
    setSelectedIcon('');
    setShowEmojiPicker(false);
    form.resetFields();
  };

  const handleEmojiSelect = (emojiData: { native?: string; shortcodes?: string }) => {
    const emoji = emojiData.native || emojiData.shortcodes || '📦';
    setSelectedIcon(emoji);
  };

  const handleEmojiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      const lastChar = val.slice(-2);
      // eslint-disable-next-line no-misleading-character-class
      const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{FE00}-\u{FE0F}\u{200D}\u{20E3}\u{E0020}-\u{E007F}]/u;
      if (emojiRegex.test(lastChar)) {
        setSelectedIcon(lastChar);
      }
    }
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const name = values.name.trim();

      if (!name) {
        message.warning('请输入分类名称');
        return;
      }

      const icon = selectedIcon || name.charAt(0);

      const newCategories = { ...categories };
      const currentList = [...newCategories[activeType]];

      if (editingCategory) {
        const index = currentList.findIndex(c => c.id === editingCategory.id);
        if (index !== -1) {
          currentList[index] = { ...editingCategory, name, icon };
          message.success('修改成功');
        }
      } else {
        const newCategory: Category = {
          id: Date.now().toString(),
          name,
          icon,
          type: activeType,
        };
        currentList.push(newCategory);
        message.success('添加成功');
      }

      newCategories[activeType] = currentList;
      saveCategories(newCategories);
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (categoryId: string) => {
    const newCategories = { ...categories };
    newCategories[activeType] = newCategories[activeType].filter(c => c.id !== categoryId);
    saveCategories(newCategories);
    message.success('删除成功');
  };

  return (
    <div className={`page-container ${styles.categoryManageContainer}`}>
      <PageHeader title="分类管理" backPath="/add-record" />

      <div className={styles.typeTabs}>
        {(Object.keys(typeLabels) as CategoryType[]).map((type) => (
          <button
            key={type}
            className={`type-tab ${activeType === type ? 'active' : ''}`}
            onClick={() => setActiveType(type)}
          >
            {typeLabels[type]}
          </button>
        ))}
      </div>

      <div className={styles.categoryList}>
        {categories[activeType].map((category, index) => (
          <div
            key={category.id}
            className={styles.categoryListItem}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragEnd={handleDragEnd}
            onDragOver={(e) => handleDragOver(e, index)}
          >
            <div className={styles.dragHandle}>
              <HolderOutlined />
            </div>
            <div className={styles.categoryIcon}>{category.icon}</div>
            <div className={styles.categoryName}>{category.name}</div>
            <div className={styles.categoryActions}>
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => openModal(category)}
              />
              <Popconfirm
                title="确定删除该分类吗？"
                onConfirm={() => handleDelete(category.id)}
                okText="确定"
                cancelText="取消"
              >
                <Button type="text" danger icon={<DeleteOutlined />} />
              </Popconfirm>
            </div>
          </div>
        ))}
      </div>

      <Button
        type="primary"
        className={styles.addCategoryBtn}
        icon={<PlusOutlined />}
        onClick={() => openModal()}
        block
      >
        添加分类
      </Button>

      <Modal
        title={editingCategory ? '编辑分类' : '添加分类'}
        open={isModalVisible}
        onOk={handleSave}
        onCancel={closeModal}
        okText="保存"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="分类名称"
            name="name"
            rules={[{ required: true, message: '请输入分类名称' }]}
          >
            <Input placeholder="请输入分类名称" maxLength={10} />
          </Form.Item>
          <Form.Item label="图标">
            <div className={styles.emojiInputRow}>
              <div className={styles.emojiPreview}>
                {selectedIcon || '?'}
              </div>
              <Input
                ref={emojiInputRef}
                placeholder="可直接输入 emoji 或点击下方选择"
                value={selectedIcon}
                onChange={handleEmojiInputChange}
                maxLength={4}
              />
              <Button
                type={showEmojiPicker ? 'default' : 'primary'}
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                {showEmojiPicker ? '收起' : '选择'}
              </Button>
            </div>
            {!selectedIcon && (
              <span className={styles.iconTip}>
                未选择时将使用名称第一个字
              </span>
            )}
            {showEmojiPicker && (
              <div className={styles.emojiMartWrapper}>
                <Picker
                  data={data}
                  onEmojiSelect={handleEmojiSelect}
                  previewPosition="none"
                  skinTonePosition="search"
                  perLine={8}
                  maxFrequentRows={2}
                />
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManage;
