import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import {
  PlusOutlined,
  HolderOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';
import type { Category, CategoryType } from '../../api/category';
import PageHeader from '../../components/PageHeader';
import { expenseCategories, incomeCategories } from '../../constants/categories';
import { getLocalCategories, saveLocalCategories } from '../../utils/storage';
import styles from './index.module.scss';

// 常用 emoji 列表（用于自定义图标）
const commonEmojis = [
  '🍜', '🛍️', '💄', '🚗', '🏠', '🎮', '❤️', '✈️', '💊', '⚙️',
  '💰', '🎁', '📈', '💼', '🧧', '🔄', '💳', '📥', '📤', '✅',
  '📋', '🍔', '🍕', '🍰', '☕', '🍺', '🍷', '🥗', '🍉', '🍎',
  '👕', '👟', '👜', '💍', '📱', '💻', '📷', '🎧', '🎬', '📚',
  '🏥', '🏦', '🏪', '🏫', '🏨', '⛽', '🅿️', '🚕', '🚄', '✈️',
  '🐱', '🐶', '🌸', '🌞', '⭐', '🔥', '💧', '🌈', '🌙', '☀️',
  '🎂', '🎄', '🎃', '🎁', '🎊', '🎉', '🎈', '🎀', '🎗️', '🎖️',
  '⚽', '🏀', '🏈', '⚾', '🎾', '🏐', '🏉', '🎱', '🏓', '🏸',
  '🚲', '🏍️', '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓', '🚑',
  '🏠', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦', '🏨', '🏩', '🏪',
];

// 从统一分类源生成分类数据
const generateDefaultCategories = (): Record<CategoryType, Category[]> => {
  // 转换支出分类
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

  // 转换收入分类
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

// 默认分类（使用统一分类源）
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
  const [categories, setCategories] = useState<Record<CategoryType, Category[]>>(defaultCategories);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [selectedIcon, setSelectedIcon] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [form] = Form.useForm();

  // 从本地存储加载分类
  useEffect(() => {
    const stored = getLocalCategories();
    if (stored) {
      setCategories(stored);
    }
  }, []);

  // 保存到本地存储
  const saveCategories = (newCategories: Record<CategoryType, Category[]>) => {
    setCategories(newCategories);
    saveLocalCategories(newCategories);
  };

  // 处理拖拽开始
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  // 处理拖拽结束
  const handleDragEnd = () => {
    setDraggedIndex(null);
  };

  // 处理拖拽经过
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

  // 打开新增/编辑弹窗
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
    setIsModalVisible(true);
  };

  // 关闭弹窗
  const closeModal = () => {
    setIsModalVisible(false);
    setEditingCategory(null);
    setSelectedIcon('');
    form.resetFields();
  };

  // 选择emoji
  const handleEmojiSelect = (emoji: string) => {
    setSelectedIcon(emoji);
    setIsEmojiPickerVisible(false);
  };

  // 保存分类
  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const name = values.name.trim();

      if (!name) {
        message.warning('请输入分类名称');
        return;
      }

      // 如果没有选择icon，使用第一个字
      const icon = selectedIcon || name.charAt(0);

      const newCategories = { ...categories };
      const currentList = [...newCategories[activeType]];

      if (editingCategory) {
        // 编辑
        const index = currentList.findIndex(c => c.id === editingCategory.id);
        if (index !== -1) {
          currentList[index] = { ...editingCategory, name, icon };
          message.success('修改成功');
        }
      } else {
        // 新增
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

  // 删除分类
  const handleDelete = (categoryId: string) => {
    const newCategories = { ...categories };
    newCategories[activeType] = newCategories[activeType].filter(c => c.id !== categoryId);
    saveCategories(newCategories);
    message.success('删除成功');
  };

  return (
    <div className="page-container category-manage-container">
      {/* 顶部导航 */}
      <PageHeader title="分类管理" backPath="/add-record" />

      {/* 类型切换 */}
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

      {/* 分类列表 */}
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

      {/* 添加按钮 */}
      <Button
        type="primary"
        className={styles.addCategoryBtn}
        icon={<PlusOutlined />}
        onClick={() => openModal()}
        block
      >
        添加分类
      </Button>

      {/* 新增/编辑弹窗 */}
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
            <div className={styles.iconSelector}>
              <Button onClick={() => setIsEmojiPickerVisible(!isEmojiPickerVisible)}>
                {selectedIcon || '选择图标'}
              </Button>
              <span className={styles.iconTip}>
                {selectedIcon ? '已选择' : '未选择时将使用名称第一个字'}
              </span>
            </div>
            {isEmojiPickerVisible && (
              <div className="emoji-picker-wrapper">
                <div className="emoji-grid">
                  {commonEmojis.map((emoji) => (
                    <div
                      key={emoji}
                      className={`emoji-item ${selectedIcon === emoji ? 'selected' : ''}`}
                      onClick={() => handleEmojiSelect(emoji)}
                    >
                      {emoji}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryManage;
