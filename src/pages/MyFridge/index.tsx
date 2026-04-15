import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  DatePicker,
  Empty,
  Input,
  Modal,
  Slider,
  Tag,
  message,
} from 'antd';
import {
  DeleteOutlined,
  LeftOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import dayjs, { type Dayjs } from 'dayjs';
import {
  addFridgeItem,
  deleteFridgeItem,
  getFridgeItems,
  updateFridgeItem,
  type FridgeItem,
} from '../../utils/storage';
import styles from './index.module.scss';

type FridgeTab = 'pending' | 'consumed' | 'all';

const TAB_CONFIG: Array<{ key: FridgeTab; label: string }> = [
  { key: 'pending', label: '待消耗' },
  { key: 'consumed', label: '已消耗' },
  { key: 'all', label: '全部' },
];

const MyFridgePage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<FridgeItem[]>([]);
  const [activeTab, setActiveTab] = useState<FridgeTab>('pending');
  const [searchValue, setSearchValue] = useState('');
  const [dishName, setDishName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [selectedDate, setSelectedDate] = useState<Dayjs>(dayjs());

  useEffect(() => {
    setItems(getFridgeItems());
  }, []);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      const purchaseDiff = dayjs(a.purchaseDate).valueOf() - dayjs(b.purchaseDate).valueOf();
      if (purchaseDiff !== 0) {
        return purchaseDiff;
      }
      return dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf();
    });
  }, [items]);

  const filteredItems = useMemo(() => {
    return sortedItems.filter((item) => {
      const keywordMatched = item.name.toLowerCase().includes(searchValue.trim().toLowerCase());
      const isConsumed = item.progress >= 100;

      if (activeTab === 'pending') {
        return keywordMatched && !isConsumed;
      }

      if (activeTab === 'consumed') {
        return keywordMatched && isConsumed;
      }

      return keywordMatched;
    });
  }, [activeTab, searchValue, sortedItems]);

  const pendingCount = useMemo(
    () => items.filter((item) => item.progress < 100).length,
    [items]
  );
  const consumedCount = useMemo(
    () => items.filter((item) => item.progress >= 100).length,
    [items]
  );

  const getDaysOwned = (purchaseDate: string) => {
    return Math.max(0, dayjs().startOf('day').diff(dayjs(purchaseDate), 'day'));
  };

  const getAgeColor = (days: number) => {
    const normalized = Math.min(days, 14) / 14;
    const hue = 120 - normalized * 120;
    return `hsl(${hue}, 72%, 42%)`;
  };

  const handleAddItem = () => {
    const trimmedName = dishName.trim();
    const trimmedQuantity = quantity.trim();

    if (!trimmedName) {
      message.warning('请输入菜品名称');
      return;
    }

    if (!trimmedQuantity) {
      message.warning('请输入分量');
      return;
    }

    const created = addFridgeItem({
      name: trimmedName,
      quantity: trimmedQuantity,
      purchaseDate: selectedDate.format('YYYY-MM-DD'),
      progress: 0,
    });

    setItems((prev) => [...prev, created]);
    setDishName('');
    setQuantity('');
    setSelectedDate(dayjs());
    message.success('已加入我的冰箱');
  };

  const handleProgressChange = (item: FridgeItem, nextProgress: number) => {
    const normalizedProgress = Math.max(0, Math.min(100, Math.round(nextProgress)));
    const nextConsumedAt = normalizedProgress >= 100
      ? item.consumedAt || new Date().toISOString()
      : undefined;

    updateFridgeItem(item.id, {
      progress: normalizedProgress,
      consumedAt: nextConsumedAt,
    });

    setItems((prev) => prev.map((current) => (
      current.id === item.id
        ? {
          ...current,
          progress: normalizedProgress,
          consumedAt: nextConsumedAt,
          updatedAt: new Date().toISOString(),
        }
        : current
    )));
  };

  const handleDeleteItem = (item: FridgeItem) => {
    Modal.confirm({
      title: '删除菜品',
      content: `确定要删除「${item.name}」吗？`,
      okType: 'danger',
      onOk: () => {
        deleteFridgeItem(item.id);
        setItems((prev) => prev.filter((current) => current.id !== item.id));
        message.success('已删除');
      },
    });
  };

  const getTabCount = (tab: FridgeTab) => {
    if (tab === 'pending') {
      return pendingCount;
    }
    if (tab === 'consumed') {
      return consumedCount;
    }
    return items.length;
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.headerSection}>
        <div className={styles.headerTop}>
          <button
            type="button"
            className={styles.backBtn}
            onClick={() => navigate(-1)}
            aria-label="返回"
          >
            <LeftOutlined />
          </button>
          <div className={styles.headerTitle}>我的冰箱</div>
          <div className={styles.headerPlaceholder} />
        </div>

        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard}>
            <div className={styles.summaryLabel}>待消耗</div>
            <div className={styles.summaryValue}>{pendingCount}</div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.summaryLabel}>已消耗</div>
            <div className={styles.summaryValue}>{consumedCount}</div>
          </div>
          <div className={styles.summaryCard}>
            <div className={styles.summaryLabel}>总计</div>
            <div className={styles.summaryValue}>{items.length}</div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <section className={styles.formCard}>
          <div className={styles.sectionTitle}>添加菜品</div>
          <div className={styles.formGrid}>
            <div className={styles.fieldBlock}>
              <div className={styles.fieldLabel}>菜品名称</div>
              <Input
                value={dishName}
                onChange={(event) => setDishName(event.target.value)}
                placeholder="例如：西红柿、鸡胸肉"
                size="large"
              />
            </div>

            <div className={styles.fieldBlock}>
              <div className={styles.fieldLabel}>分量</div>
              <Input
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
                placeholder="例如：2 斤 / 3 份 / 500g"
                size="large"
              />
            </div>

            <div className={styles.fieldBlock}>
              <div className={styles.fieldLabel}>记录日期</div>
              <DatePicker
                value={selectedDate}
                onChange={(value) => {
                  if (value) {
                    setSelectedDate(value);
                  }
                }}
                size="large"
                allowClear={false}
                style={{ width: '100%' }}
                format="YYYY-MM-DD"
                disabledDate={(current) => Boolean(current && current.isAfter(dayjs().endOf('day')))}
              />
            </div>

            <div className={styles.submitWrap}>
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                className={styles.addButton}
                onClick={handleAddItem}
              >
                保存到冰箱
              </Button>
            </div>
          </div>
        </section>

        <section className={styles.listCard}>
          <div className={styles.listToolbar}>
            <div className={styles.tabGroup}>
              {TAB_CONFIG.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={`${styles.tabButton} ${activeTab === tab.key ? styles.activeTab : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                  <span className={styles.tabCount}>{getTabCount(tab.key)}</span>
                </button>
              ))}
            </div>

            <Input
              value={searchValue}
              onChange={(event) => setSearchValue(event.target.value)}
              placeholder="按菜品名称搜索"
              prefix={<SearchOutlined />}
              size="large"
            />
          </div>

          <div className={styles.listHint}>
            列表按记录日期升序展示，最早录入的菜品排在最上方。
          </div>

          {filteredItems.length === 0 ? (
            <div className={styles.emptyWrap}>
              <Empty
                description={searchValue ? '没有匹配的菜品' : '还没有冰箱记录'}
              />
            </div>
          ) : (
            <div className={styles.itemList}>
              {filteredItems.map((item) => {
                const daysOwned = getDaysOwned(item.purchaseDate);
                const ageColor = getAgeColor(daysOwned);
                const isConsumed = item.progress >= 100;

                return (
                  <article key={item.id} className={styles.itemCard}>
                    <div className={styles.itemHeader}>
                      <div>
                        <div className={styles.itemName}>{item.name}</div>
                        <div className={styles.itemMeta}>
                          <span>{item.quantity}</span>
                          <span>记录于 {dayjs(item.purchaseDate).format('YYYY-MM-DD')}</span>
                        </div>
                      </div>

                      <div className={styles.itemHeaderRight}>
                        <Tag color={isConsumed ? 'success' : 'processing'}>
                          {isConsumed ? '已消耗' : '待消耗'}
                        </Tag>
                        <button
                          type="button"
                          className={styles.deleteBtn}
                          onClick={() => handleDeleteItem(item)}
                          aria-label={`删除${item.name}`}
                        >
                          <DeleteOutlined />
                        </button>
                      </div>
                    </div>

                    <div className={styles.progressRow}>
                      <div className={styles.progressLabel}>
                        <span>消耗进度</span>
                        <strong>{item.progress}%</strong>
                      </div>
                      <div
                        className={styles.daysOwned}
                        style={{ color: ageColor }}
                      >
                        已买入 {daysOwned} 天
                      </div>
                    </div>

                    <Slider
                      value={item.progress}
                      min={0}
                      max={100}
                      step={1}
                      tooltip={{ formatter: (value) => `${value ?? 0}%` }}
                      onChange={(value) => handleProgressChange(item, Number(value))}
                    />
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MyFridgePage;
