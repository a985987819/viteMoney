import { useState } from 'react';
import { Modal, Radio } from 'antd';
import { UnorderedListOutlined, AppstoreOutlined } from '@ant-design/icons';
import SpriteIcon from '../SpriteIcon';
import styles from './index.module.scss';

interface SubCategory {
  id: string;
  name: string;
  icon: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  subCategories: SubCategory[];
}

interface SubCategoryModalProps {
  visible: boolean;
  category: Category | null;
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
      width={320}
      bodyStyle={{ maxHeight: 400, overflow: 'auto' }}
    >
      <div className={`${styles.content} ${viewMode === 'grid' ? styles.grid : styles.list}`}>
        <div
          className={`${styles.item} ${!selectedSubCategoryId ? styles.selected : ''}`}
          onClick={handleSelectMainCategory}
        >
          <SpriteIcon iconId={category.icon} size={32} />
          <span className={styles.name}>{category.name}</span>
        </div>

        <div className={styles.divider} />

        <div className={styles.subCategoryList}>
          {category.subCategories.map((sub) => (
            <div
              key={sub.id}
              className={`${styles.item} ${selectedSubCategoryId === sub.id ? styles.selected : ''}`}
              onClick={() => handleSelect(sub)}
            >
              <SpriteIcon iconId={sub.icon} size={32} />
              <span className={styles.name}>{sub.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
};

export default SubCategoryModal;