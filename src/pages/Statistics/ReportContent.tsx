import { useState, useEffect, useRef, useMemo } from 'react';
import { Radio, List, Drawer, Button, Checkbox, Empty, Calendar, Badge } from 'antd';
import type { Dayjs } from 'dayjs';
import {
  FilterOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import * as echarts from 'echarts';
import dayjs from 'dayjs';
import { getPixelPieOption } from '../../utils/echartsPixelTheme';
import type { ReportData, CategoryStats, DailyStats, RecordItem } from '../../api/record';
import { getReportData, getRecords } from '../../api/record';
import { getLocalRecords } from '../../utils/storage';
import { useAuth } from '../../hooks/useAuth';
import DatePicker, { type DateMode } from '../../components/DatePicker';
import styles from './ReportContent.module.scss';

type ViewType = 'chart' | 'area';

/**
 * 报表内容组件
 */
const ReportContent = () => {
  const { isLoggedIn } = useAuth();
  const [reportData, setReportData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [viewType, setViewType] = useState<ViewType>('chart');
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  // 筛选相关
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showExpense, setShowExpense] = useState(true);
  const [showIncome, setShowIncome] = useState(true);
  const [showBalance, setShowBalance] = useState(false);

  // 日历相关
  const [calendarMode, setCalendarMode] = useState<'month' | 'year'>('month');
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  // 展开的分类详情
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [categoryRecords, setCategoryRecords] = useState<Map<string, RecordItem[]>>(new Map());

  // 单日记录数据
  const [dailyRecords, setDailyRecords] = useState<RecordItem[]>([]);
  const [dailyRecordsLoading, setDailyRecordsLoading] = useState(false);

  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  // 加载报表数据
  const loadReportData = async () => {
    setLoading(true);
    try {
      if (isLoggedIn) {
        const data = await getReportData(currentDate.year(), currentDate.month() + 1);
        setReportData(data);
      } else {
        // 从本地存储计算报表数据
        const allRecords = getLocalRecords();
        const startOfMonth = currentDate.startOf('month');
        const endOfMonth = currentDate.endOf('month');

        const monthRecords = allRecords.filter(r => {
          const recordDate = dayjs(r.date);
          return recordDate.isAfter(startOfMonth.subtract(1, 'day')) &&
            recordDate.isBefore(endOfMonth.add(1, 'day'));
        });

        const totalExpense = monthRecords
          .filter(r => r.type === 'expense')
          .reduce((sum, r) => sum + r.amount, 0);
        const totalIncome = monthRecords
          .filter(r => r.type === 'income')
          .reduce((sum, r) => sum + r.amount, 0);

        // 按分类统计
        const categoryMap = new Map<string, CategoryStats>();
        monthRecords.forEach(r => {
          const key = `${r.type}-${r.category}`;
          if (!categoryMap.has(key)) {
            categoryMap.set(key, {
              category: r.category,
              categoryIcon: r.categoryIcon,
              type: r.type,
              amount: 0,
              percentage: 0,
              count: 0,
            });
          }
          const stats = categoryMap.get(key)!;
          stats.amount += r.amount;
          stats.count += 1;
        });

        // 计算百分比
        categoryMap.forEach(stats => {
          const total = stats.type === 'expense' ? totalExpense : totalIncome;
          stats.percentage = total > 0 ? (stats.amount / total) * 100 : 0;
        });

        const categoryStats = {
          expense: Array.from(categoryMap.values()).filter(s => s.type === 'expense'),
          income: Array.from(categoryMap.values()).filter(s => s.type === 'income'),
        };

        // 按金额排序
        categoryStats.expense.sort((a, b) => b.amount - a.amount);
        categoryStats.income.sort((a, b) => b.amount - a.amount);

        // 生成每日统计
        const dailyStatsMap = new Map<string, DailyStats>();
        for (let i = 1; i <= currentDate.daysInMonth(); i++) {
          const dateStr = currentDate.format(`YYYY-MM-${String(i).padStart(2, '0')}`);
          dailyStatsMap.set(dateStr, { date: dateStr, expense: 0, income: 0 });
        }

        monthRecords.forEach(r => {
          const dateStr = dayjs(r.date).format('YYYY-MM-DD');
          const stats = dailyStatsMap.get(dateStr);
          if (stats) {
            if (r.type === 'expense') {
              stats.expense += r.amount;
            } else {
              stats.income += r.amount;
            }
          }
        });

        setReportData({
          period: {
            startDate: startOfMonth.format('YYYY-MM-DD'),
            endDate: endOfMonth.format('YYYY-MM-DD'),
          },
          summary: {
            totalExpense,
            totalIncome,
            balance: totalIncome - totalExpense,
          },
          dailyStats: Array.from(dailyStatsMap.values()),
          categoryStats,
        });
      }
    } catch (error) {
      console.error('Load report error:', error);
    } finally {
      setLoading(false);
    }
  };

  // 加载单日记录数据
  const loadDailyRecords = async (date: Dayjs) => {
    if (!date) return;

    setDailyRecordsLoading(true);
    try {
      const dateStr = date.format('YYYY-MM-DD');
      let records: RecordItem[] = [];

      if (isLoggedIn) {
        records = await getRecords({
          startDate: dateStr,
          endDate: dateStr
        });
      } else {
        const allRecords = getLocalRecords();
        records = allRecords.filter(r => dayjs(r.date).format('YYYY-MM-DD') === dateStr);
      }

      setDailyRecords(records);
    } catch (error) {
      console.error('Failed to load daily records:', error);
      setDailyRecords([]);
    } finally {
      setDailyRecordsLoading(false);
    }
  };

  useEffect(() => {
    loadReportData();
  }, [currentDate, isLoggedIn]);

  // 监听选中日期变化，加载单日数据
  useEffect(() => {
    if (selectedDate) {
      loadDailyRecords(selectedDate);
    } else {
      setDailyRecords([]);
    }
  }, [selectedDate, isLoggedIn]);

  // 获取选中日期的分类统计
  const dailyCategoryStats = useMemo(() => {
    if (!selectedDate) {
      return null;
    }

    if (dailyRecords.length === 0) {
      // 选中日期但没有记录，返回空统计
      return {
        expense: [],
        income: [],
        summary: {
          totalExpense: 0,
          totalIncome: 0,
          balance: 0,
        },
      };
    }

    const totalExpense = dailyRecords
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + r.amount, 0);
    const totalIncome = dailyRecords
      .filter(r => r.type === 'income')
      .reduce((sum, r) => sum + r.amount, 0);

    // 按分类统计
    const categoryMap = new Map<string, CategoryStats>();
    dailyRecords.forEach(r => {
      const key = `${r.type}-${r.category}`;
      if (!categoryMap.has(key)) {
        categoryMap.set(key, {
          category: r.category,
          categoryIcon: r.categoryIcon,
          type: r.type,
          amount: 0,
          percentage: 0,
          count: 0,
        });
      }
      const stats = categoryMap.get(key)!;
      stats.amount += r.amount;
      stats.count += 1;
    });

    // 计算百分比
    categoryMap.forEach(stats => {
      const total = stats.type === 'expense' ? totalExpense : totalIncome;
      stats.percentage = total > 0 ? (stats.amount / total) * 100 : 0;
    });

    return {
      expense: Array.from(categoryMap.values()).filter(s => s.type === 'expense'),
      income: Array.from(categoryMap.values()).filter(s => s.type === 'income'),
      summary: {
        totalExpense,
        totalIncome,
        balance: totalIncome - totalExpense,
      },
    };
  }, [selectedDate, dailyRecords]);

  // 统一数据显示源
  const displayData = useMemo(() => {
    if (selectedDate && dailyCategoryStats) {
      return {
        categoryStats: dailyCategoryStats,
        summary: dailyCategoryStats.summary,
      };
    }
    return {
      categoryStats: reportData?.categoryStats || { expense: [], income: [] },
      summary: reportData?.summary || { totalExpense: 0, totalIncome: 0, balance: 0 },
    };
  }, [selectedDate, dailyCategoryStats, reportData]);

  // 初始化饼图
  useEffect(() => {
    console.log('[ReportContent Chart] Initializing pie chart...');
    console.log('[ReportContent Chart] chartRef.current:', !!chartRef.current);
    console.log('[ReportContent Chart] reportData:', !!reportData);
    console.log('[ReportContent Chart] viewType:', viewType);

    if (!chartRef.current || viewType !== 'chart') {
      console.log('[ReportContent Chart] Cleanup - conditions not met');
      chartInstance.current?.dispose();
      chartInstance.current = null;
      return;
    }

    try {
      console.log('[ReportContent Chart] Creating ECharts instance...');
      if (!chartInstance.current) {
        chartInstance.current = echarts.init(chartRef.current);
        console.log('[ReportContent Chart] ECharts instance created');
      }

      console.log('[ReportContent Chart] Preparing pie data...');
      const pieData: { name: string; value: number; itemStyle: { color: string } }[] = [];

      // 使用统一的数据源
      const chartSourceData = displayData.categoryStats;

      if (showExpense) {
        chartSourceData.expense.forEach(item => {
          pieData.push({
            name: `${item.categoryIcon} ${item.category}`,
            value: item.amount,
            itemStyle: { color: '#c45c48' },
          });
        });
      }
      if (showIncome) {
        chartSourceData.income.forEach(item => {
          pieData.push({
            name: `${item.categoryIcon} ${item.category}`,
            value: item.amount,
            itemStyle: { color: '#4a9c3d' },
          });
        });
      }

      console.log('[ReportContent Chart] Getting chart option...');
      const option = getPixelPieOption(pieData);
      console.log('[ReportContent Chart] Setting option...');
      chartInstance.current.setOption(option, true);
      console.log('[ReportContent Chart] Chart initialized successfully');
    } catch (error) {
      console.error('[ReportContent Chart] ECharts initialization error:', error);
      console.error('[ReportContent Chart] Error details:', {
        message: (error as Error).message,
        stack: (error as Error).stack,
        name: (error as Error).name,
      });
      // 重新抛出错误，让 ErrorBoundary 捕获
      throw error;
    }

    return () => {
      console.log('[ReportContent Chart] Cleanup - unmounting');
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [displayData, viewType, showExpense, showIncome]);

  // 筛选后的分类统计
  const filteredCategoryStats = useMemo(() => {
    // 使用统一的数据源
    const sourceData = displayData.categoryStats;

    let stats: CategoryStats[] = [];
    if (showExpense) {
      stats = [...stats, ...sourceData.expense];
    }
    if (showIncome) {
      stats = [...stats, ...sourceData.income];
    }
    if (selectedCategories.length > 0) {
      stats = stats.filter(s => selectedCategories.includes(s.category));
    }
    return stats.sort((a, b) => b.amount - a.amount);
  }, [displayData, showExpense, showIncome, selectedCategories]);

  // 获取所有分类名称
  const allCategoryNames = useMemo(() => {
    const names = new Set<string>();

    // 从当前显示的数据源获取分类名称
    if (displayData.categoryStats.expense) {
      displayData.categoryStats.expense.forEach(s => names.add(s.category));
    }
    if (displayData.categoryStats.income) {
      displayData.categoryStats.income.forEach(s => names.add(s.category));
    }

    return Array.from(names);
  }, [displayData]);

  // 获取某天的收支数据
  const getDailyData = useMemo(() => {
    if (!reportData) return new Map<string, DailyStats>();
    const map = new Map<string, DailyStats>();
    reportData.dailyStats.forEach(day => {
      map.set(day.date, day);
    });
    return map;
  }, [reportData]);


  // 渲染日历日期单元格
  const dateCellRender = (date: Dayjs) => {
    const dateStr = date.format('YYYY-MM-DD');
    const dayData = getDailyData.get(dateStr);

    if (!dayData) return null;

    const hasExpense = dayData.expense > 0;
    const hasIncome = dayData.income > 0;
    const balance = dayData.income - dayData.expense;

    if (!hasExpense && !hasIncome) return null;

    return (
      <div className={styles.calendarCell}>
        {showExpense && hasExpense && (
          <span className={styles.calendarExpense}>-{dayData.expense.toFixed(0)}</span>
        )}
        {showIncome && hasIncome && (
          <span className={styles.calendarIncome}>+{dayData.income.toFixed(0)}</span>
        )}
        {showBalance && balance !== 0 && (
          <span className={balance >= 0 ? styles.calendarIncome : styles.calendarExpense}>
            {balance >= 0 ? '+' : ''}{balance.toFixed(0)}
          </span>
        )}
      </div>
    );
  };

  // 切换分类展开状态
  const toggleCategoryExpand = async (categoryKey: string, category: string, type: 'expense' | 'income') => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryKey)) {
      newExpanded.delete(categoryKey);
      setExpandedCategories(newExpanded);
      return;
    }

    // 展开时加载该分类的明细记录
    const startOfMonth = currentDate.startOf('month');
    const endOfMonth = currentDate.endOf('month');
    const startDate = startOfMonth.format('YYYY-MM-DD');
    const endDate = endOfMonth.format('YYYY-MM-DD');

    let records: RecordItem[] = [];
    if (isLoggedIn) {
      const response = await getRecords({ startDate, endDate, type });
      records = response.filter(r => r.category === category);
    } else {
      const allRecords = getLocalRecords();
      records = allRecords.filter(r => {
        const recordDate = dayjs(r.date);
        return r.type === type &&
          r.category === category &&
          recordDate.isAfter(startOfMonth.subtract(1, 'day')) &&
          recordDate.isBefore(endOfMonth.add(1, 'day'));
      });
    }

    // 按金额从大到小排序
    records.sort((a, b) => b.amount - a.amount);

    const newCategoryRecords = new Map(categoryRecords);
    newCategoryRecords.set(categoryKey, records);
    setCategoryRecords(newCategoryRecords);

    newExpanded.add(categoryKey);
    setExpandedCategories(newExpanded);
  };

  // 确认日期选择
  const handleDateConfirm = (date: dayjs.Dayjs, _mode: DateMode) => {
    setCurrentDate(date);
    setIsDatePickerVisible(false);
  };

  if (loading && !reportData) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>加载中...</div>
      </div>
    );
  }

  if (!reportData) {
    return (
      <div className={styles.emptyContainer}>
        <Empty description="暂无数据" />
      </div>
    );
  }

  return (
    <div className={styles.reportContent}>
      {/* 月份选择 */}
      <div className={styles.monthSelector} onClick={() => setIsDatePickerVisible(true)}>
        <span className={styles.monthText}>{currentDate.format('YYYY年M月')}</span>
        <span className={styles.arrowDown}>▼</span>
      </div>

      {/* 日历显示控制 */}
      <div className={styles.calendarControls}>
        <Checkbox
          checked={showExpense}
          onChange={(e) => {
            const checked = e.target.checked;
            setShowExpense(checked);
            if (checked && showBalance) {
              setShowBalance(false);
            }
          }}
          className={styles.controlCheckbox}
        >
          <span className={styles.expenseLabel}>支出</span>
        </Checkbox>
        <Checkbox
          checked={showIncome}
          onChange={(e) => {
            const checked = e.target.checked;
            setShowIncome(checked);
            if (checked && showBalance) {
              setShowBalance(false);
            }
          }}
          className={styles.controlCheckbox}
        >
          <span className={styles.incomeLabel}>收入</span>
        </Checkbox>
        <Checkbox
          checked={showBalance}
          onChange={(e) => {
            const checked = e.target.checked;
            setShowBalance(checked);
            if (checked) {
              setShowExpense(false);
              setShowIncome(false);
            }
          }}
          className={styles.controlCheckbox}
        >
          <span className={styles.balanceLabel}>结余</span>
        </Checkbox>
      </div>

      {/* 日历组件 */}
      <div className={styles.calendarSection}>
        <Calendar
          value={currentDate}
          mode={calendarMode}
          onChange={(date) => {
            setCurrentDate(date);
            setSelectedDate(date);
          }}
          onPanelChange={(date, mode) => {
            setCurrentDate(date);
            setCalendarMode(mode);
          }}
          dateCellRender={dateCellRender}
          fullscreen={false}
          className={styles.miniCalendar}
        />
      </div>

      {/* 选中日期显示 */}
      {selectedDate && (
        <div className={styles.selectedDateBar}>
          <span className={styles.selectedDateText}>{selectedDate.format('YYYY年M月D日')}数据</span>
          <Button
            type="text"
            size="small"
            onClick={() => setSelectedDate(null)}
            className={styles.clearDateBtn}
          >
            查看整月
          </Button>
        </div>
      )}

      {/* 汇总卡片 */}
      <div className={styles.summaryCards}>
        <div className={styles.summaryCard}>
          <span className={styles.cardLabel}>支出</span>
          <span className={`${styles.cardValue} ${styles.expense}`}>
            ¥{displayData.summary.totalExpense.toFixed(2)}
          </span>
        </div>
        <div className={styles.summaryCard}>
          <span className={styles.cardLabel}>收入</span>
          <span className={`${styles.cardValue} ${styles.income}`}>
            ¥{displayData.summary.totalIncome.toFixed(2)}
          </span>
        </div>
        <div className={styles.summaryCard}>
          <span className={styles.cardLabel}>结余</span>
          <span className={`${styles.cardValue} ${displayData.summary.balance >= 0 ? styles.income : styles.expense}`}>
            ¥{displayData.summary.balance.toFixed(2)}
          </span>
        </div>
      </div>

      {/* 视图切换 */}
      <div className={styles.viewToggle}>
        <Radio.Group
          value={viewType}
          onChange={(e) => setViewType(e.target.value)}
          buttonStyle="solid"
        >
          <Radio.Button value="chart">图表</Radio.Button>
          <Radio.Button value="area">列表</Radio.Button>
        </Radio.Group>
        <Button
          icon={<FilterOutlined />}
          onClick={() => setIsFilterVisible(true)}
          className={styles.filterBtn}
        >
          筛选
        </Button>
      </div>

      {/* 图表视图 */}
      {viewType === 'chart' && (
        <div className={styles.chartView}>
          <div ref={chartRef} className={styles.pieChart} style={{ height: '300px' }} />
        </div>
      )}

      {/* 列表视图 */}
      {viewType === 'area' && (
        <div className={styles.listView}>
          <List
            dataSource={filteredCategoryStats}
            renderItem={(item) => {
              const categoryKey = `${item.type}-${item.category}`;
              const isExpanded = expandedCategories.has(categoryKey);
              const records = categoryRecords.get(categoryKey) || [];
              const canExpand = item.count > 1;

              return (
                <>
                  <List.Item className={styles.categoryItem}>
                    <div className={styles.categoryInfo}>
                      <span className={styles.categoryIcon}>{item.categoryIcon}</span>
                      <div className={styles.categoryDetail}>
                        <span className={styles.categoryName}>{item.category}</span>
                        <span className={styles.categoryCount}>
                          {item.count}笔
                          {canExpand && (
                            <Button
                              type="text"
                              size="small"
                              icon={isExpanded ? <MinusOutlined /> : <PlusOutlined />}
                              onClick={() => toggleCategoryExpand(categoryKey, item.category, item.type)}
                              className={styles.expandBtn}
                            />
                          )}
                        </span>
                      </div>
                    </div>
                    <div className={styles.categoryAmount}>
                      <span className={item.type === 'expense' ? styles.expense : styles.income}>
                        ¥{item.amount.toFixed(2)}
                      </span>
                      <span className={styles.percentage}>{item.percentage.toFixed(1)}%</span>
                    </div>
                  </List.Item>
                  {isExpanded && records.length > 0 && (
                    <div className={styles.recordDetailList}>
                      {records.map((record) => (
                        <div key={record.id} className={styles.recordDetailItem}>
                          <div className={styles.recordDetailLeft}>
                            <span className={styles.recordDetailDate}>
                              {dayjs(record.date).format('MM-DD')}
                            </span>
                            {record.remark && (
                              <span className={styles.recordDetailRemark}>{record.remark}</span>
                            )}
                          </div>
                          <span className={`${styles.recordDetailAmount} ${record.type === 'expense' ? styles.expense : styles.income}`}>
                            ¥{record.amount.toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              );
            }}
          />
        </div>
      )}

      {/* 日期选择器 */}
      <DatePicker
        visible={isDatePickerVisible}
        onCancel={() => setIsDatePickerVisible(false)}
        onConfirm={handleDateConfirm}
        defaultDate={currentDate}
        defaultMode="month"
      />

      {/* 筛选抽屉 */}
      <Drawer
        title="筛选"
        placement="right"
        onClose={() => setIsFilterVisible(false)}
        open={isFilterVisible}
        width={300}
      >
        <div className={styles.filterContent}>
          <div className={styles.filterSection}>
            <div className={styles.filterLabel}>显示类型</div>
            <Checkbox
              checked={showExpense}
              onChange={(e) => setShowExpense(e.target.checked)}
            >
              支出
            </Checkbox>
            <Checkbox
              checked={showIncome}
              onChange={(e) => setShowIncome(e.target.checked)}
            >
              收入
            </Checkbox>
          </div>

          <div className={styles.filterSection}>
            <div className={styles.filterLabel}>分类</div>
            <Checkbox.Group
              value={selectedCategories}
              onChange={(values) => setSelectedCategories(values as string[])}
            >
              {allCategoryNames.map(name => (
                <Checkbox key={name} value={name}>{name}</Checkbox>
              ))}
            </Checkbox.Group>
          </div>

          <Button
            type="primary"
            block
            onClick={() => setIsFilterVisible(false)}
            className={styles.confirmBtn}
          >
            确定
          </Button>
        </div>
      </Drawer>
    </div>
  );
};

export default ReportContent;
