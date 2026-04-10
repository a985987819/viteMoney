import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Empty, Spin, Radio, Modal, message, Input, Button, Checkbox } from 'antd';
import {
  DownOutlined,
  UpOutlined,
  SortAscendingOutlined,
  SortDescendingOutlined,
} from '@ant-design/icons';
import * as echarts from 'echarts';
import dayjs from 'dayjs';
import { getPixelBarOption } from '../../utils/echartsPixelTheme';
import type { RecordItem, BillFilterParams, BillListResponse } from '../../api/record';
import { deleteRecord, getBillsWithFilter } from '../../api/record';
import { getLocalRecords, saveLocalRecords } from '../../utils/storage';
import { useAuth } from '../../hooks/useAuth';
import { compareDate } from '../../utils/importExport';
import type { Category } from '../../api/category';
import SwipeableRecordItem from '../../components/SwipeableRecordItem';
import DatePicker, { type DateMode } from '../../components/DatePicker';
import ShareReceipt from '../../components/ShareReceipt';
import { getLocalCategories } from '../../utils/storage';
import { useCategories } from '../../hooks/useCategories';
import styles from './BillContent.module.scss';

// 从本地存储获取所有分类
const getAllCategoriesFromStorage = (): Category[] => {
  const stored = getLocalCategories();
  if (stored) {
    return [...(stored.expense || []), ...(stored.income || [])];
  }
  return [];
};

interface FilterState {
  type?: 'expense' | 'income';
  categories: string[];
  minAmount?: number;
  maxAmount?: number;
}

type SortType = 'time' | 'amount';
type SortOrder = 'asc' | 'desc';

/**
 * 账单内容组件
 */
const BillContent = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { allCategoryOptions } = useCategories();
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showBackTop, setShowBackTop] = useState(false);
  const [chartCollapsed, setChartCollapsed] = useState(false);

  // 当前加载的日期范围（默认当月1号到今天）
  const [startDate, setStartDate] = useState(dayjs().startOf('month'));
  const [endDate, setEndDate] = useState(dayjs());

  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filter, setFilter] = useState<FilterState>({
    categories: [],
  });
  const [summary, setSummary] = useState({ totalExpense: 0, totalIncome: 0, count: 0 });
  const [showExpense, setShowExpense] = useState(true);
  const [showIncome, setShowIncome] = useState(true);

  // 排序状态
  const [sortType, setSortType] = useState<SortType>('time');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // 自定义滚动条状态
  const [, setShowCustomScrollbar] = useState(false);
  const [scrollbarTop, setScrollbarTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollbarRef = useRef<HTMLDivElement>(null);
  const dragStartYRef = useRef(0);
  const dragStartScrollTopRef = useRef(0);

  const listRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  // 加载数据
  const loadRecords = useCallback(async (loadStartDate?: dayjs.Dayjs, loadEndDate?: dayjs.Dayjs) => {
    if (loading) return;
    setLoading(true);

    const sDate = loadStartDate || startDate;
    const eDate = loadEndDate || endDate;

    try {
      if (isLoggedIn) {
        // 使用筛选API
        const params: BillFilterParams = {
          startDate: sDate.format('YYYY-MM-DD'),
          endDate: eDate.format('YYYY-MM-DD'),
          ...filter,
        };
        const response: BillListResponse = await getBillsWithFilter(params);
        setRecords(response.records);
        setSummary(response.summary);
      } else {
        // 从本地存储获取数据
        const allRecords = getLocalRecords();

        // 按日期范围筛选
        let filteredRecords = allRecords.filter(r => {
          const recordDate = dayjs(r.date);
          return recordDate.isAfter(sDate.subtract(1, 'day')) && recordDate.isBefore(eDate.add(1, 'day'));
        });

        // 应用筛选条件
        if (filter.type) {
          filteredRecords = filteredRecords.filter(r => r.type === filter.type);
        }
        if (filter.categories.length > 0) {
          filteredRecords = filteredRecords.filter(r => filter.categories.includes(r.category));
        }
        if (filter.minAmount !== undefined) {
          filteredRecords = filteredRecords.filter(r => r.amount >= filter.minAmount!);
        }
        if (filter.maxAmount !== undefined) {
          filteredRecords = filteredRecords.filter(r => r.amount <= filter.maxAmount!);
        }

        // 排序
        filteredRecords.sort((a, b) => {
          if (sortType === 'time') {
            return sortOrder === 'desc' ? compareDate(b.date, a.date) : compareDate(a.date, b.date);
          } else {
            return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount;
          }
        });

        setRecords(filteredRecords);

        // 计算汇总
        const totalExpense = filteredRecords
          .filter(r => r.type === 'expense')
          .reduce((sum, r) => sum + r.amount, 0);
        const totalIncome = filteredRecords
          .filter(r => r.type === 'income')
          .reduce((sum, r) => sum + r.amount, 0);
        setSummary({ totalExpense, totalIncome, count: filteredRecords.length });
      }
    } catch (error) {
      console.error('Load records error:', error);
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  }, [loading, startDate, endDate, filter, sortType, sortOrder, isLoggedIn]);

  // 初始加载（当月1号到今天）
  useEffect(() => {
    loadRecords();
  }, [filter, sortType, sortOrder]);

  // 统计数据
  const stats = useMemo(() => {
    const expense = summary.totalExpense;
    const income = summary.totalIncome;

    // 按日期统计支出和收入
    const dailyStats = records.reduce((acc, r) => {
      const dateKey = dayjs(r.date).format('YYYY-MM-DD');
      if (!acc[dateKey]) {
        acc[dateKey] = { expense: 0, income: 0 };
      }
      if (r.type === 'expense') {
        acc[dateKey].expense += r.amount;
      } else {
        acc[dateKey].income += r.amount;
      }
      return acc;
    }, {} as Record<string, { expense: number; income: number }>);

    // 获取当前选择月份的所有日期
    const daysInMonth = startDate.daysInMonth();
    const yearMonth = startDate.format('YYYY-MM');
    const chartData = [];

    for (let i = 1; i <= daysInMonth; i++) {
      const dateStr = `${yearMonth}-${String(i).padStart(2, '0')}`;
      const dayData = dailyStats[dateStr] || { expense: 0, income: 0 };
      chartData.push({
        date: i,
        expense: dayData.expense,
        income: dayData.income,
      });
    }

    return { expense, income, dailyStats: chartData };
  }, [records, summary, startDate]);

  // 初始化柱状图
  useEffect(() => {
    console.log('[BillContent Chart] Initializing chart...');
    console.log('[BillContent Chart] chartRef.current:', !!chartRef.current);
    console.log('[BillContent Chart] chartCollapsed:', chartCollapsed);
    console.log('[BillContent Chart] stats.dailyStats.length:', stats.dailyStats.length);

    if (!chartRef.current || chartCollapsed || stats.dailyStats.length === 0) {
      console.log('[BillContent Chart] Cleanup - conditions not met');
      chartInstance.current?.dispose();
      chartInstance.current = null;
      return;
    }

    try {
      console.log('[BillContent Chart] Creating ECharts instance...');
      if (!chartInstance.current) {
        chartInstance.current = echarts.init(chartRef.current);
        console.log('[BillContent Chart] ECharts instance created');
      }

      console.log('[BillContent Chart] Getting chart option...');
      const option = getPixelBarOption(stats.dailyStats, showExpense, showIncome);
      console.log('[BillContent Chart] Setting option...');
      chartInstance.current.setOption(option, true);
      console.log('[BillContent Chart] Chart initialized successfully');
    } catch (error) {
      console.error('[BillContent Chart] ECharts initialization error:', error);
      console.error('[BillContent Chart] Error details:', {
        message: (error as Error).message,
        stack: (error as Error).stack,
        name: (error as Error).name,
      });
      // 重新抛出错误，让 ErrorBoundary 捕获
      throw error;
    }

    return () => {
      console.log('[BillContent Chart] Cleanup - unmounting');
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [stats.dailyStats, showExpense, showIncome, chartCollapsed]);

  // 处理编辑记录
  const handleEditRecord = (record: RecordItem) => {
    navigate('/add', { state: { record } });
  };

  // 处理删除记录
  const handleDeleteRecord = async (record: RecordItem) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条记录吗？',
      okType: 'danger',
      onOk: async () => {
        try {
          if (isLoggedIn) {
            await deleteRecord(record.id);
          } else {
            const localRecords = getLocalRecords();
            const updatedRecords = localRecords.filter(r => r.id !== record.id);
            saveLocalRecords(updatedRecords);
          }
          message.success('删除成功');
          loadRecords();
        } catch (error) {
          message.error('删除失败');
          console.error('Delete error:', error);
        }
      },
    });
  };

  // 是否手动展开统计区域（true表示用户手动展开，false表示自动收起或默认）
  const [isManuallyExpanded, setIsManuallyExpanded] = useState(false);
  // 记录上一次滚动位置
  const lastScrollTopRef = useRef(0);

  // 滚动处理
  const handleScroll = useCallback(() => {
    if (!listRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;

    setShowBackTop(scrollTop > 300);

    // 判断滚动方向
    const isScrollingDown = scrollTop > lastScrollTopRef.current;
    lastScrollTopRef.current = scrollTop;

    // 只有在非手动展开状态下，向下滚动时才自动收起统计区域
    if (!isManuallyExpanded && isScrollingDown && scrollTop > 50 && !chartCollapsed) {
      setChartCollapsed(true);
    }

    // 更新自定义滚动条位置
    const scrollPercent = scrollTop / (scrollHeight - clientHeight);
    const scrollbarHeight = 60;
    const maxTop = clientHeight - scrollbarHeight - 20;
    setScrollbarTop(scrollPercent * maxTop + 10);

    setShowCustomScrollbar(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      if (!isDragging) {
        setShowCustomScrollbar(false);
      }
    }, 1000);
  }, [isDragging, isManuallyExpanded, chartCollapsed]);

  useEffect(() => {
    const listEl = listRef.current;
    if (listEl) {
      listEl.addEventListener('scroll', handleScroll);
      return () => listEl.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  // 回到顶部
  const scrollToTop = () => {
    listRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 自定义滚动条拖动处理
  const handleScrollbarMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
    dragStartYRef.current = e.clientY;
    if (listRef.current) {
      dragStartScrollTopRef.current = listRef.current.scrollTop;
    }
  }, []);

  const handleScrollbarMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging || !listRef.current) return;

    const deltaY = e.clientY - dragStartYRef.current;
    const { scrollHeight, clientHeight } = listRef.current;
    const scrollbarHeight = 60;
    const maxScrollbarTop = clientHeight - scrollbarHeight - 20;

    const scrollPercent = deltaY / maxScrollbarTop;
    const maxScrollTop = scrollHeight - clientHeight;
    const newScrollTop = dragStartScrollTopRef.current + scrollPercent * maxScrollTop;

    listRef.current.scrollTop = Math.max(0, Math.min(newScrollTop, maxScrollTop));
  }, [isDragging]);

  const handleScrollbarMouseUp = useCallback(() => {
    setIsDragging(false);
    scrollTimeoutRef.current = setTimeout(() => {
      setShowCustomScrollbar(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleScrollbarMouseMove);
      document.addEventListener('mouseup', handleScrollbarMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleScrollbarMouseMove);
        document.removeEventListener('mouseup', handleScrollbarMouseUp);
      };
    }
  }, [isDragging, handleScrollbarMouseMove, handleScrollbarMouseUp]);

  // 按日期分组
  const groupedRecords = useMemo(() => {
    if (sortType === 'amount') {
      return {};
    }
    const grouped = records.reduce((acc, record) => {
      const dateKey = dayjs(record.date).format('YYYY-MM-DD');
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(record);
      return acc;
    }, {} as Record<string, RecordItem[]>);

    Object.keys(grouped).forEach(dateKey => {
      grouped[dateKey].sort((a, b) => {
        return sortOrder === 'desc' ? compareDate(b.date, a.date) : compareDate(a.date, b.date);
      });
    });

    return grouped;
  }, [records, sortType, sortOrder]);

  // 计算当日收支
  const getDayTotal = (dayRecords: RecordItem[]) => {
    const expense = dayRecords
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0);
    const income = dayRecords
      .filter(r => r.type === 'income')
      .reduce((sum, r) => sum + r.amount, 0);
    return { expense, income };
  };

  // 获取日期标签（今天/昨天/前天/星期X）
  const getDateLabel = (dateStr: string) => {
    const today = dayjs().format('YYYY-MM-DD');
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');
    const dayBeforeYesterday = dayjs().subtract(2, 'day').format('YYYY-MM-DD');
    const date = dayjs(dateStr);

    if (dateStr === today) return '今天';
    if (dateStr === yesterday) return '昨天';
    if (dateStr === dayBeforeYesterday) return '前天';

    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    const weekday = weekdays[date.day()];

    return `${date.format('M月D日')} ${weekday}`;
  };

  // 获取显示文本
  const getDisplayText = () => {
    return `${startDate.format('YYYY年M月D日')} - ${endDate.format('M月D日')}`;
  };

  // 应用筛选
  const applyFilter = () => {
    loadRecords();
    setIsFilterVisible(false);
  };

  // 重置筛选
  const resetFilter = () => {
    setFilter({
      categories: [],
    });
  };

  // 获取所有分类
  const allCategories = useMemo<Category[]>(() => {
    const storedCategories = getAllCategoriesFromStorage();
    if (storedCategories.length > 0) {
      return storedCategories;
    }
    // 使用 useCategories 提供的分类
    return allCategoryOptions.map(opt => ({
      id: opt.value,
      name: opt.label,
      icon: opt.icon,
      type: opt.type,
    }));
  }, [allCategoryOptions]);

  // 确认日期选择
  const handleDateConfirm = (date: dayjs.Dayjs, _mode: DateMode) => {
    setStartDate(date.startOf('month'));
    setEndDate(date.endOf('month'));
    setIsDatePickerVisible(false);
    loadRecords(date.startOf('month'), date.endOf('month'));
  };

  // 切换排序类型
  const toggleSortType = () => {
    setSortType(prev => prev === 'time' ? 'amount' : 'time');
  };

  // 切换排序顺序
  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc');
  };

  // 展开/收起图表
  const toggleChart = () => {
    setChartCollapsed(prev => {
      const newState = !prev;
      // 当手动点击展开时，设置手动展开状态
      // 当收起时，重置手动展开状态
      setIsManuallyExpanded(!newState);
      return newState;
    });
  };

  return (
    <div className={styles.billContent}>
      {/* 固定顶部区域 */}
      <div className={styles.billHeaderFixed}>
        {/* 日期选择 */}
        <div className={styles.dateSelectorBar}>
          <div className={styles.dateDisplay} onClick={() => setIsDatePickerVisible(true)}>
            <span>{getDisplayText()}</span>
            <span className={styles.arrowDown}>▼</span>
          </div>
          <div className={styles.filterBtn} onClick={() => setIsFilterVisible(true)}>
            <span>筛选</span>
          </div>
        </div>

        {/* 月度统计概览 */}
        <div className={`${styles.billStatsOverview} ${chartCollapsed ? styles.collapsed : ''}`}>
          <div className={styles.statsContent}>
            <div className={styles.statsHeader}>
              <div className={`${styles.statsItem} ${!showExpense ? styles.disabled : ''}`} onClick={() => setShowExpense(!showExpense)}>
                <span className={`${styles.radioDot} ${styles.expense}`}></span>
                <span className={styles.statsLabel}>月支出</span>
                <span className={`${styles.statsValue} ${styles.expense}`}>¥{stats.expense.toFixed(2)}</span>
              </div>
              <div className={`${styles.statsItem} ${!showIncome ? styles.disabled : ''}`} onClick={() => setShowIncome(!showIncome)}>
                <span className={`${styles.radioDot} ${styles.income}`}></span>
                <span className={styles.statsLabel}>月收入</span>
                <span className={`${styles.statsValue} ${styles.income}`}>¥{stats.income.toFixed(2)}</span>
              </div>
            </div>

            {/* 图表区域 */}
            <div className={styles.chartSection}>
              <div className={styles.chartContainer} ref={chartRef} style={{ height: '100px' }} />
            </div>
          </div>
        </div>

        {/* 结余统计 */}
        <div className={`${styles.balanceSection} ${chartCollapsed ? styles.collapsed : ''}`}>
          <div className={styles.balanceContent}>
            <span className={styles.balanceLabel}>结余</span>
            <span className={`${styles.balanceValue} ${stats.income - stats.expense >= 0 ? styles.income : styles.expense}`}>
              ¥{(stats.income - stats.expense).toFixed(2)}
            </span>
          </div>
          <span className={styles.balanceCount}>共{summary.count}笔</span>
        </div>

        {/* 展开/收起按钮 */}
        <div className={styles.statsToggleBar} onClick={toggleChart}>
          {chartCollapsed ? <UpOutlined /> : <DownOutlined />}
        </div>

        {/* 排序栏 */}
        <div className={styles.sortBar}>
          <div className={styles.sortLeft}>
            <span className={styles.sortLabel}>排序：</span>
            <span className={styles.sortType} onClick={toggleSortType}>
              {sortType === 'time' ? '时间' : '金额'}
            </span>
            <span className={styles.sortOrder} onClick={toggleSortOrder}>
              {sortOrder === 'desc' ? <SortDescendingOutlined /> : <SortAscendingOutlined />}
            </span>
          </div>
        </div>
      </div>

      {/* 记录列表 */}
      <div className={styles.billList} ref={listRef}>
        {loading && records.length === 0 ? (
          <div className={styles.loadingContainer}>
            <Spin size="large" />
          </div>
        ) : records.length === 0 ? (
          <Empty description="暂无记录" className={styles.emptyState} />
        ) : sortType === 'amount' ? (
          // 按金额排序 - 平铺列表
          <List
            dataSource={records}
            renderItem={(record) => (
              <SwipeableRecordItem
                record={record}
                onEdit={handleEditRecord}
                onDelete={handleDeleteRecord}
              />
            )}
          />
        ) : (
          // 按时间排序 - 按日期分组
          Object.entries(groupedRecords)
            .sort(([dateA], [dateB]) => (sortOrder === 'desc' ? dateB.localeCompare(dateA) : dateA.localeCompare(dateB)))
            .map(([dateKey, dayRecords]) => {
              const dayTotal = getDayTotal(dayRecords);
              return (
                <div key={dateKey} className={styles.dayGroup}>
                  <div className={styles.dayHeader}>
                    <div className={styles.dayHeaderLeft}>
                      <span className={styles.dayDate}>{getDateLabel(dateKey)}</span>
                      <ShareReceipt
                        date={dateKey}
                        records={dayRecords}
                      />
                    </div>
                    <div className={styles.dayTotal}>
                      {dayTotal.income > 0 && <span className={styles.income}>收¥{dayTotal.income.toFixed(2)}</span>}
                      {dayTotal.expense > 0 && <span className={styles.expense}>支¥{dayTotal.expense.toFixed(2)}</span>}
                    </div>
                  </div>
                  <List
                    dataSource={dayRecords}
                    renderItem={(record) => (
                      <SwipeableRecordItem
                        record={record}
                        onEdit={handleEditRecord}
                        onDelete={handleDeleteRecord}
                      />
                    )}
                  />
                </div>
              );
            })
        )}

        {/* 底部留白 */}
        <div style={{ height: '80px' }} />
      </div>

      {/* 自定义滚动条 */}
      <div
        ref={scrollbarRef}
        className={styles.customScrollbar}
        style={{ top: scrollbarTop }}
        onMouseDown={handleScrollbarMouseDown}
      />

      {/* 回到顶部按钮 */}
      {showBackTop && (
        <div
          onClick={scrollToTop}
          className={styles.backTopBtn}
        >???????????
        </div>
      )}

      {/* 日期选择器 */}
      <DatePicker
        visible={isDatePickerVisible}
        onCancel={() => setIsDatePickerVisible(false)}
        onConfirm={handleDateConfirm}
        defaultDate={startDate}
        defaultMode="month"
      />

      {/* 筛选弹窗 */}
      <Modal
        title="筛选"
        open={isFilterVisible}
        onCancel={() => setIsFilterVisible(false)}
        footer={[
          <Button key="reset" onClick={resetFilter}>重置</Button>,
          <Button key="confirm" onClick={applyFilter}>确定</Button>,
        ]}
      >
        <div className={styles.filterContent}>
          <div className={styles.filterSection}>
            <div className={styles.filterLabel}>类型</div>
            <Radio.Group
              value={filter.type}
              onChange={(e) => setFilter({ ...filter, type: e.target.value })}
            >
              <Radio value={undefined}>全部</Radio>
              <Radio value="expense">支出</Radio>
              <Radio value="income">收入</Radio>
            </Radio.Group>
          </div>

          <div className={styles.filterSection}>
            <div className={styles.filterLabel}>分类</div>
            <Checkbox.Group
              value={filter.categories}
              onChange={(values) => setFilter({ ...filter, categories: values as string[] })}
            >
              {allCategories.map(cat => (
                <Checkbox key={cat.id} value={cat.name}>{cat.icon} {cat.name}</Checkbox>
              ))}
            </Checkbox.Group>
          </div>

          <div className={styles.filterSection}>
            <div className={styles.filterLabel}>金额范围</div>
            <div className={styles.amountRange}>
              <Input
                type="number"
                placeholder="最小金额"
                value={filter.minAmount}
                onChange={(e) => setFilter({ ...filter, minAmount: e.target.value ? Number(e.target.value) : undefined })}
              />
              <span>-</span>
              <Input
                type="number"
                placeholder="最大金额"
                value={filter.maxAmount}
                onChange={(e) => setFilter({ ...filter, maxAmount: e.target.value ? Number(e.target.value) : undefined })}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BillContent;
