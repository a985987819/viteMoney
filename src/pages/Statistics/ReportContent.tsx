import { useState, useEffect, useRef, useMemo } from 'react';
import { Radio, List, Drawer, Button, Checkbox, Empty } from 'antd';
import {
  FilterOutlined,
} from '@ant-design/icons';
import * as echarts from 'echarts/core';
import { PieChart } from 'echarts/charts';
import { TooltipComponent, LegendComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 注册必要的组件
echarts.use([PieChart, TooltipComponent, LegendComponent, CanvasRenderer]);
import dayjs from 'dayjs';
import { getPixelPieOption } from '../../utils/echartsPixelTheme';
import type { ReportData, CategoryStats, DailyStats } from '../../api/record';
import { getReportData } from '../../api/record';
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

  useEffect(() => {
    loadReportData();
  }, [currentDate, isLoggedIn]);

  // 初始化饼图
  useEffect(() => {
    if (!chartRef.current || !reportData || viewType !== 'chart') {
      chartInstance.current?.dispose();
      chartInstance.current = null;
      return;
    }

    try {
      if (!chartInstance.current) {
        chartInstance.current = echarts.init(chartRef.current);
      }

      const pieData: { name: string; value: number; itemStyle: { color: string } }[] = [];
      if (showExpense) {
        reportData.categoryStats.expense.forEach(item => {
          pieData.push({
            name: `${item.categoryIcon} ${item.category}`,
            value: item.amount,
            itemStyle: { color: '#c45c48' },
          });
        });
      }
      if (showIncome) {
        reportData.categoryStats.income.forEach(item => {
          pieData.push({
            name: `${item.categoryIcon} ${item.category}`,
            value: item.amount,
            itemStyle: { color: '#4a9c3d' },
          });
        });
      }

      const option = getPixelPieOption(pieData);
      chartInstance.current.setOption(option, true);
    } catch (error) {
      console.error('ECharts initialization error:', error);
    }

    return () => {
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [reportData, viewType, showExpense, showIncome]);

  // 筛选后的分类统计
  const filteredCategoryStats = useMemo(() => {
    if (!reportData) return [];
    let stats: CategoryStats[] = [];
    if (showExpense) {
      stats = [...stats, ...reportData.categoryStats.expense];
    }
    if (showIncome) {
      stats = [...stats, ...reportData.categoryStats.income];
    }
    if (selectedCategories.length > 0) {
      stats = stats.filter(s => selectedCategories.includes(s.category));
    }
    return stats.sort((a, b) => b.amount - a.amount);
  }, [reportData, showExpense, showIncome, selectedCategories]);

  // 获取所有分类名称
  const allCategoryNames = useMemo(() => {
    if (!reportData) return [];
    const names = new Set<string>();
    reportData.categoryStats.expense.forEach(s => names.add(s.category));
    reportData.categoryStats.income.forEach(s => names.add(s.category));
    return Array.from(names);
  }, [reportData]);

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

      {/* 汇总卡片 */}
      <div className={styles.summaryCards}>
        <div className={styles.summaryCard}>
          <span className={styles.cardLabel}>支出</span>
          <span className={`${styles.cardValue} ${styles.expense}`}>
            ¥{reportData.summary.totalExpense.toFixed(2)}
          </span>
        </div>
        <div className={styles.summaryCard}>
          <span className={styles.cardLabel}>收入</span>
          <span className={`${styles.cardValue} ${styles.income}`}>
            ¥{reportData.summary.totalIncome.toFixed(2)}
          </span>
        </div>
        <div className={styles.summaryCard}>
          <span className={styles.cardLabel}>结余</span>
          <span className={`${styles.cardValue} ${reportData.summary.balance >= 0 ? styles.income : styles.expense}`}>
            ¥{reportData.summary.balance.toFixed(2)}
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
            renderItem={(item) => (
              <List.Item className={styles.categoryItem}>
                <div className={styles.categoryInfo}>
                  <span className={styles.categoryIcon}>{item.categoryIcon}</span>
                  <div className={styles.categoryDetail}>
                    <span className={styles.categoryName}>{item.category}</span>
                    <span className={styles.categoryCount}>{item.count}笔</span>
                  </div>
                </div>
                <div className={styles.categoryAmount}>
                  <span className={item.type === 'expense' ? styles.expense : styles.income}>
                    ¥{item.amount.toFixed(2)}
                  </span>
                  <span className={styles.percentage}>{item.percentage.toFixed(1)}%</span>
                </div>
              </List.Item>
            )}
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
