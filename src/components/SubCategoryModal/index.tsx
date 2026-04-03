import { useState } from 'react';
import { Modal, Radio } from 'antd';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import type { MainCategory, SubCategory } from '../../constants/categories';
import SpriteIcon from '../SpriteIcon';
import styles from './index.module.scss';

interface SubCategoryModalProps {
  visible: boolean;
  category: MainCategory | null;
  onClose: () => void;
  onSelect: (subCategory: SubCategory | null) => void;
  selectedSubCategoryId?: string;
}

type ViewMode = 'list' | 'grid';

const SubCategoryModal = ({
  visible,
  category,
  onClose,
  onSelect,
  selectedSubCategoryId,
}: SubCategoryModalProps) => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const handleSelect = (subCategory: SubCategory | null) => {
    onSelect(subCategory);
    onClose();
  };

  const handleSelectMainCategory = () => {
    // 选择主分类（子分类为空）
    onSelect(null);
    onClose();
  };

  if (!category) return null;

  return (
    <Modal
      title={
        <div className={styles.modalHeader}>
          <span className={styles.title}>{category.name}</span>
          <Radio.Group
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            buttonStyle="solid"
            size="small"
          >
            <Radio.Button value="list">
              <UnorderedListOutlined />
            </Radio.Button>
            <Radio.Button value="grid">
              <AppstoreOutlined />
            </Radio.Button>
          </Radio.Group>
        </div>
      }
      open={visible}
      onCancel={onClose}
      footer={null}
      width={360}
      className={styles.subCategoryModal}
    >
      <div className={`${styles.content} ${styles[viewMode]}`}>
        {/* 选择主分类本身 */}
        <div
          className={`${styles.mainCategoryItem} ${!selectedSubCategoryId ? styles.selected : ''}`}
          onClick={handleSelectMainCategory}
        >
          <div className={styles.iconWrapper}>
            <SpriteIcon iconId={category.icon} size={32} />
          </div>
          <span className={styles.name}>仅{category.name}</span>
        </div>

        {/* 分隔线 */}
        {category.subCategories.length > 0 && (
          <div className={styles.divider}>
            <span>选择子分类</span>
          </div>
        )}

        {/* 子分类列表 */}
        <div className={styles.subCategoryList}>
          {category.subCategories.map((sub) => (
            <div
              key={sub.id}
              className={`${styles.subCategoryItem} ${selectedSubCategoryId === sub.id ? styles.selected : ''}`}
              onClick={() => handleSelect(sub)}
            >
              <div className={styles.iconWrapper}>
                <SpriteIcon iconId={sub.icon} size={32} />
              </div>
              <span className={styles.name}>{sub.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default SubCategoryModal;
