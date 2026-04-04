import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { List, Spin, Radio, Modal, message, Input, Button, Checkbox } from 'antd';
import {
  FilterOutlined,
  CloseOutlined,
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
import BottomNav from '../../components/BottomNav';
import PageHeader from '../../components/PageHeader';
import EmptyState from '../../components/EmptyState';
import ScrollContainer from '../../components/ScrollContainer';
import type { Category } from '../../api/category';
import SwipeableRecordItem from '../../components/SwipeableRecordItem';
import DatePicker, { type DateMode } from '../../components/DatePicker';
import styles from './index.module.scss';

// 默认分类
const defaultCategories: Record<string, Category[]> = {
  expense: [
    { id: '1', name: '餐饮', icon: '🍜', type: 'expense' },
    { id: '2', name: '购物', icon: '🛍️', type: 'expense' },
    { id: '3', name: '美妆', icon: '💄', type: 'expense' },
    { id: '4', name: '交通', icon: '🚗', type: 'expense' },
    { id: '5', name: '住宿', icon: '🏠', type: 'expense' },
    { id: '6', name: '娱乐', icon: '🎮', type: 'expense' },
    { id: '7', name: '人情', icon: '❤️', type: 'expense' },
    { id: '8', name: '旅游', icon: '✈️', type: 'expense' },
    { id: '9', name: '医疗', icon: '💊', type: 'expense' },
  ],
  income: [
    { id: '11', name: '工资', icon: '💰', type: 'income' },
    { id: '12', name: '奖金', icon: '🎁', type: 'income' },
    { id: '13', name: '投资', icon: '📈', type: 'income' },
    { id: '14', name: '兼职', icon: '💼', type: 'income' },
    { id: '15', name: '红包', icon: '🧧', type: 'income' },
  ],
};

interface FilterState {
  type?: 'expense' | 'income';
  categories: string[];
  minAmount?: number;
  maxAmount?: number;
}

type SortType = 'time' | 'amount';
type SortOrder = 'asc' | 'desc';

const Bill = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [showBackTop, setShowBackTop] = useState(false);
  const [chartCollapsed, setChartCollapsed] = useState(false);

  // 当前加载的日期范围（默认当月1号到今天）
  const [startDate, setStartDate] = useState(dayjs().startOf('month'));
  const [endDate, setEndDate] = useState(dayjs());
  const [currentLoadMonth, setCurrentLoadMonth] = useState(dayjs());

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
  const [showCustomScrollbar, setShowCustomScrollbar] = useState(false);
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
  const loadRecords = useCallback(async (isRefresh = false, loadStartDate?: dayjs.Dayjs, loadEndDate?: dayjs.Dayjs) => {
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
        if (isRefresh) {
          setRecords(response.records);
        } else {
          setRecords(prev => [...prev, ...response.records]);
        }
        setSummary(response.summary);
        setHasMore(false);
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
            // 使用 compareDate 统一比较时间
            return sortOrder === 'desc' ? compareDate(b.date, a.date) : compareDate(a.date, b.date);
          } else {
            // 按金额排序
            return sortOrder === 'desc' ? b.amount - a.amount : a.amount - b.amount;
          }
        });

        if (isRefresh) {
          setRecords(filteredRecords);
        } else {
          setRecords(prev => [...prev, ...filteredRecords]);
        }

        // 计算汇总
        const totalExpense = filteredRecords
          .filter(r => r.type === 'expense')
          .reduce((sum, r) => sum + r.amount, 0);
        const totalIncome = filteredRecords
          .filter(r => r.type === 'income')
          .reduce((sum, r) => sum + r.amount, 0);
        setSummary({ totalExpense, totalIncome, count: filteredRecords.length });

        // 检查是否还有更多（上一个月是否有数据）
        const prevMonth = currentLoadMonth.subtract(1, 'month');
        const prevMonthRecords = allRecords.filter(r => {
          const recordDate = dayjs(r.date);
          return recordDate.isAfter(prevMonth.startOf('month').subtract(1, 'day')) &&
            recordDate.isBefore(prevMonth.endOf('month').add(1, 'day'));
        });
        setHasMore(prevMonthRecords.length > 0);
      }
    } catch (error) {
      console.error('Load records error:', error);
      message.error('加载数据失败');
    } finally {
      setLoading(false);
    }
  }, [loading, startDate, endDate, filter, sortType, sortOrder, isLoggedIn, currentLoadMonth]);

  // 初始加载（当月1号到今天）
  useEffect(() => {
    loadRecords(true);
  }, [filter, sortType, sortOrder]);

  // 统计数据
  const stats = useMemo(() => {
    const expense = summary.totalExpense;
    const income = summary.totalIncome;

    // 按日期统计支出和收入 - 使用时间戳转日期字符串作为key
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
    const daysInMonth = currentLoadMonth.daysInMonth();
    const yearMonth = currentLoadMonth.format('YYYY-MM');
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
  }, [records, summary, currentLoadMonth]);

  // 初始化柱状图 - 像素风格
  useEffect(() => {
    console.log('[Bill Chart] Initializing chart...');
    console.log('[Bill Chart] chartRef.current:', !!chartRef.current);
    console.log('[Bill Chart] chartCollapsed:', chartCollapsed);
    console.log('[Bill Chart] stats.dailyStats.length:', stats.dailyStats.length);
    
    if (!chartRef.current || chartCollapsed || stats.dailyStats.length === 0) {
      console.log('[Bill Chart] Cleanup - conditions not met');
      chartInstance.current?.dispose();
      chartInstance.current = null;
      return;
    }

    try {
      console.log('[Bill Chart] Creating ECharts instance...');
      if (!chartInstance.current) {
        chartInstance.current = echarts.init(chartRef.current);
        console.log('[Bill Chart] ECharts instance created');
      }

      console.log('[Bill Chart] Getting chart option...');
      const option = getPixelBarOption(stats.dailyStats, showExpense, showIncome);
      console.log('[Bill Chart] Setting option...');
      chartInstance.current.setOption(option, true);
      console.log('[Bill Chart] Chart initialized successfully');
    } catch (error) {
      console.error('[Bill Chart] ECharts initialization error:', error);
      console.error('[Bill Chart] Error details:', {
        message: (error as Error).message,
        stack: (error as Error).stack,
        name: (error as Error).name,
      });
      // 重新抛出错误，让 ErrorBoundary 捕获
      throw error;
    }

    return () => {
      console.log('[Bill Chart] Cleanup - unmounting');
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
          loadRecords(true);
        } catch (error) {
          message.error('删除失败');
          console.error('Delete error:', error);
        }
      },
    });
  };

  // 是否显示加载提示
  const [showLoadHint, setShowLoadHint] = useState(false);
  // 是否正在加载上一个月
  const [isLoadingPrevMonth, setIsLoadingPrevMonth] = useState(false);
  // 是否手动控制图表展开（优先于自动收起）
  const [manualChartControl, setManualChartControl] = useState<'expand' | 'collapse' | null>(null);
  // 记录上一次滚动位置，用于判断滚动方向
  const lastScrollTopRef = useRef(0);
  // 是否正在下滑
  const isScrollingDownRef = useRef(false);

  // 滚动加载更多（加载上一个月）
  const handleScroll = useCallback(() => {
    if (!listRef.current) return;

    const { scrollTop, scrollHeight, clientHeight } = listRef.current;

    // 判断滚动方向
    isScrollingDownRef.current = scrollTop > lastScrollTopRef.current;
    lastScrollTopRef.current = scrollTop;

    setShowBackTop(scrollTop > 300);

    // 只有在没有手动控制时，才自动收起图表
    // 且只有在下滑过程中才自动收起，上滑不自动展开
    if (isScrollingDownRef.current) {
      console.log(`不动`);

    } else if (manualChartControl === null) {
      setChartCollapsed(true);
    }

    // 更新自定义滚动条位置
    const scrollPercent = scrollTop / (scrollHeight - clientHeight);
    const scrollbarHeight = 60; // 滚动条高度
    const maxTop = clientHeight - scrollbarHeight - 20;
    setScrollbarTop(scrollPercent * maxTop + 10);

    // 显示自定义滚动条
    setShowCustomScrollbar(true);

    // 清除之前的定时器
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // 1秒后隐藏自定义滚动条
    scrollTimeoutRef.current = setTimeout(() => {
      if (!isDragging) {
        setShowCustomScrollbar(false);
      }
    }, 1000);

    // 滚动到底部显示加载提示
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 20;
    if (isNearBottom && hasMore && !loading && !isLoadingPrevMonth && records.length > 0) {
      setShowLoadHint(true);
    } else if (!isNearBottom) {
      setShowLoadHint(false);
    }
  }, [hasMore, loading, isLoadingPrevMonth, isDragging]);

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

    // 将滚动条位移转换为滚动百分比，再转换为内容滚动位置
    const scrollPercent = deltaY / maxScrollbarTop;
    const maxScrollTop = scrollHeight - clientHeight;
    const newScrollTop = dragStartScrollTopRef.current + scrollPercent * maxScrollTop;

    listRef.current.scrollTop = Math.max(0, Math.min(newScrollTop, maxScrollTop));
  }, [isDragging]);

  const handleScrollbarMouseUp = useCallback(() => {
    setIsDragging(false);
    // 1秒后隐藏滚动条
    scrollTimeoutRef.current = setTimeout(() => {
      setShowCustomScrollbar(false);
    }, 1000);
  }, []);

  // 添加/移除全局鼠标事件监听
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

  // 加载上一个月的数据（替换当前数据）
  const loadPrevMonth = useCallback(async () => {
    if (isLoadingPrevMonth || !hasMore) return;

    setIsLoadingPrevMonth(true);
    setShowLoadHint(false);

    const prevMonth = currentLoadMonth.subtract(1, 'month');
    const newStartDate = prevMonth.startOf('month');
    const newEndDate = prevMonth.endOf('month');

    setCurrentLoadMonth(prevMonth);
    setStartDate(newStartDate);
    setEndDate(newEndDate);

    try {
      // 重新加载数据（替换而不是追加）
      await loadRecords(true, newStartDate, newEndDate);
    } finally {
      setIsLoadingPrevMonth(false);
    }

    // 滚动到顶部
    listRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isLoadingPrevMonth, hasMore, currentLoadMonth, loadRecords]);

  // 按日期分组（仅在按时间排序时使用）- 使用日期字符串作为key
  const groupedRecords = useMemo(() => {
    if (sortType === 'amount') {
      // 按金额排序时不分组，返回空对象（使用平铺列表）
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

    // 对每天的记录按时间排序
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

  // 获取显示文本
  const getDisplayText = () => {
    return `${startDate.format('YYYY年M月D日')} - ${endDate.format('M月D日')}`;
  };

  // 应用筛选
  const applyFilter = () => {
    loadRecords(true);
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
    return Object.values(defaultCategories).flat();
  }, []);

  // 打开日期选择器
  const openDatePicker = () => {
    setIsDatePickerVisible(true);
  };

  // 确认日期选择
  const handleDateConfirm = (date: dayjs.Dayjs, _mode: DateMode) => {
    // 重置到选择的月份，从该月1号开始加载
    setStartDate(date.startOf('month'));
    setEndDate(date.endOf('month'));
    setCurrentLoadMonth(date);
    setIsDatePickerVisible(false);
    loadRecords(true, date.startOf('month'), date.endOf('month'));
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
      // 设置手动控制状态，优先于自动收起逻辑
      setManualChartControl(newState ? 'collapse' : 'expand');
      return newState;
    });
  };

  return (
    <div className={`${styles.pageContainer} ${styles.billContainer}`}>
      {/* 固定顶部区域 */}
      <div className={styles.billHeaderFixed}>
        {/* 顶部导航 */}
        <PageHeader
          title="账单"
          backPath="/"
          rightContent={
            <FilterOutlined
              className={styles.filterIcon}
              onClick={() => setIsFilterVisible(true)}
            />
          }
        />

        {/* 日期选择 */}
        <div className={styles.dateSelectorBar}>
          <div
            className={styles.dateDisplay}
            onClick={openDatePicker}
          >
            <span>{getDisplayText()}</span>
            <span className={styles.arrowDown}>▼</span>
          </div>
          <div className={styles.filterBtn} onClick={() => setIsFilterVisible(true)}>
            <span>筛选</span>
          </div>
        </div>

        {/* 月度统计概览 - 滚动时折叠 */}
        <div className={`${styles.billStatsOverview} ${chartCollapsed ? styles.collapsed : ''}`}>
          <div className={styles.statsContent}>
            <div className={styles.statsHeader}>
              <div
                className={`${styles.statsItem} ${!showExpense ? styles.disabled : ''}`}
                onClick={() => setShowExpense(!showExpense)}
              >
                <span className={`${styles.radioDot} ${styles.expense}`}></span>
                <span className={styles.statsLabel}>月支出</span>
                <span className={`${styles.statsValue} ${styles.expense}`}>¥{stats.expense.toFixed(2)}</span>
              </div>
              <div
                className={`${styles.statsItem} ${!showIncome ? styles.disabled : ''}`}
                onClick={() => setShowIncome(!showIncome)}
              >
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

        {/* 结余统计 - 单独区域 */}
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
          <span className={styles.statsToggleText}>
            {chartCollapsed ? '展开统计' : '收起统计'}
          </span>
          {chartCollapsed ? <DownOutlined /> : <UpOutlined />}
        </div>

        {/* 账单明细头部 */}
        <div className={styles.billListHeader}>
          <span className={styles.listTitle}>账单明细</span>
          <div className={styles.sortControls}>
            <span className={styles.sortBtn} onClick={toggleSortType}>
              {sortType === 'time' ? '按时间' : '按金额'}
            </span>
            <span className={styles.sortOrderBtn} onClick={toggleSortOrder}>
              {sortOrder === 'desc' ? <SortDescendingOutlined /> : <SortAscendingOutlined />}
            </span>
          </div>
        </div>
      </div>

      {/* 可滚动的账单列表 */}
      <ScrollContainer className={styles.billListScroll} onScroll={handleScroll}>
        <Spin spinning={loading && records.length === 0}>
          {records.length === 0 && !loading ? (
            <EmptyState
              title="暂无账单记录"
              description="试试调整筛选条件或选择其他日期范围"
              showAction={false}
            />
          ) : (
            <>
              {/* 按时间排序时按日期分组显示 */}
              {sortType === 'time' && Object.entries(groupedRecords).map(([date, dayRecords]) => {
              const { expense, income } = getDayTotal(dayRecords);
              const dayjsDate = dayjs(date);
              const weekDay = ['日', '一', '二', '三', '四', '五', '六'][dayjsDate.day()];
              const isToday = date === dayjs().format('YYYY-MM-DD');
              const isYesterday = date === dayjs().subtract(1, 'day').format('YYYY-MM-DD');
              const dayLabel = dayjsDate.format('M月D日');
              let dayDesc = '';
              if (isToday) dayDesc = '今天';
              else if (isYesterday) dayDesc = '昨天';

              return (
                <div key={date} className={styles.billDayGroup}>
                  <div className={styles.billDayHeader}>
                    <div className={styles.dayInfo}>
                      <span className={styles.dayLabel}>{dayLabel}</span>
                      {dayDesc && <span className={styles.dayDesc}>{dayDesc}</span>}
                      <span className={styles.weekDay}>星期{weekDay}</span>
                    </div>
                    <div className={styles.dayTotal}>
                      {expense > 0 && <span className="expense">支:{expense.toFixed(2)}</span>}
                      {income > 0 && <span className="income">收:{income.toFixed(2)}</span>}
                    </div>
                  </div>
                  <List
                    dataSource={dayRecords}
                    style={{ borderRadius: '8px', overflow: 'hidden' }}
                    renderItem={(record, index) => (
                      <SwipeableRecordItem
                        record={record}
                        onEdit={handleEditRecord}
                        onDelete={handleDeleteRecord}
                        isLastItem={index === dayRecords.length - 1}
                      />
                    )}
                  />
                </div>
              );
            })}

            {/* 按金额排序时平铺显示 */}
            {sortType === 'amount' && (
              <List
                dataSource={records}
                renderItem={(record, index) => (
                  <SwipeableRecordItem
                    record={record}
                    onEdit={handleEditRecord}
                    onDelete={handleDeleteRecord}
                    isLastItem={index === records.length - 1}
                  />
                )}
              />
            )}

            {loading && (
              <div className={styles.loadingMore}>
                <Spin size="small" />
                <span>加载中...</span>
              </div>
            )}

            {/* 加载提示 */}
            {showLoadHint && !loading && hasMore && (
              <div className="load-hint" onClick={loadPrevMonth}>
                <span>继续上滑加载上个月的数据</span>
                <UpOutlined />
              </div>
            )}

            {!hasMore && records.length > 0 && (
              <div className={styles.noMore}>没有更多了</div>
            )}
          </>
        )}
        </Spin>
      </ScrollContainer>

      {/* 自定义滚动条 */}
      {showCustomScrollbar && (
        <div className={styles.customScrollbarContainer}>
          <div
            ref={scrollbarRef}
            className={styles.customScrollbar}
            style={{ top: `${scrollbarTop}px` }}
            onMouseDown={handleScrollbarMouseDown}
            onMouseEnter={() => setShowCustomScrollbar(true)}
            onMouseLeave={() => !isDragging && setShowCustomScrollbar(false)}
          >
            <UpOutlined className={styles.scrollbarIcon} />
            <div className={styles.scrollbarLine} />
            <DownOutlined className={styles.scrollbarIcon} />
          </div>
        </div>
      )}

      {/* 回到顶部按钮 */}
      {showBackTop && (
        <div
          onClick={scrollToTop}
          className={styles.backTopBtn}
        ></div>
      )}

      {/* 底部导航 */}
      <BottomNav />

      {/* 日期选择弹窗 */}
      <DatePicker
        visible={isDatePickerVisible}
        onCancel={() => setIsDatePickerVisible(false)}
        onConfirm={handleDateConfirm}
        defaultDate={currentLoadMonth}
        defaultMode="month"
      />

      {/* 筛选弹窗 */}
      <Modal
        open={isFilterVisible}
        onCancel={() => setIsFilterVisible(false)}
        footer={null}
        width="100%"
        className={styles.filterModal}

        closable={false}
      >
        <div className={styles.filterModalContent}>
          {/* 头部 */}
          <div className={styles.filterModalHeader}>
            <span className={styles.filterTitle}>筛选</span>
            <CloseOutlined className={styles.closeIcon} onClick={() => setIsFilterVisible(false)} />
          </div>

          <div className={styles.filterModalBody}>
            {/* 收支类型 */}
            <div className={styles.filterSection}>
              <div className={styles.filterLabel}>收支类型</div>
              <Radio.Group
                value={filter.type}
                onChange={(e) => setFilter({ ...filter, type: e.target.value })}
                className={styles.filterRadioGroup}
              >
                <Radio.Button value={undefined}>全部</Radio.Button>
                <Radio.Button value="expense">支出</Radio.Button>
                <Radio.Button value="income">收入</Radio.Button>
              </Radio.Group>
            </div>

            {/* 金额范围 */}
            <div className={styles.filterSection}>
              <div className={styles.filterLabel}>金额范围</div>
              <div className={styles.amountRange}>
                <Input
                  type="number"
                  placeholder="最小金额"
                  value={filter.minAmount}
                  onChange={(e) => setFilter({ ...filter, minAmount: e.target.value ? Number(e.target.value) : undefined })}
                  prefix="¥"
                />
                <span className={styles.rangeSeparator}>-</span>
                <Input
                  type="number"
                  placeholder="最大金额"
                  value={filter.maxAmount}
                  onChange={(e) => setFilter({ ...filter, maxAmount: e.target.value ? Number(e.target.value) : undefined })}
                  prefix="¥"
                />
              </div>
            </div>

            {/* 分类筛选 */}
            <div className={styles.filterSection}>
              <div className={styles.filterLabel}>分类</div>
              <Checkbox.Group
                value={filter.categories}
                onChange={(values) => setFilter({ ...filter, categories: values as string[] })}
                className={styles.categoryCheckboxGroup}
              >
                {allCategories.map((cat) => (
                  <Checkbox key={cat.name} value={cat.name}>
                    <span className={styles.categoryCheckboxItem}>
                      <span className={styles.categoryIcon}>{cat.icon}</span>
                      <span>{cat.name}</span>
                    </span>
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </div>
          </div>

          {/* 底部按钮 */}
          <div className={styles.filterModalFooter}>
            <Button onClick={resetFilter}>重置</Button>
            <Button type="primary" onClick={applyFilter}>确定</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Bill;
