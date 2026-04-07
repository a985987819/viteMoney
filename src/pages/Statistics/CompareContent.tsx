import { useState, useEffect, useRef, useMemo } from 'react';
import { Empty, Button } from 'antd';
import { SwapOutlined } from '@ant-design/icons';
import * as echarts from 'echarts';
import dayjs from 'dayjs';
import type { ReportData, CategoryStats, RecordItem } from '../../api/record';
import { getReportData, getRecords } from '../../api/record';
import { getLocalRecords } from '../../utils/storage';
import { useAuth } from '../../hooks/useAuth';
import DatePicker, { type DateMode } from '../../components/DatePicker';
import styles from './CompareContent.module.scss';

interface MonthData {
  date: dayjs.Dayjs;
  reportData: ReportData | null;
  records: RecordItem[];
}

interface CategoryCompare {
  category: string;
  categoryIcon: string;
  type: 'expense' | 'income';
  baseAmount: number;
  compareAmount: number;
  diff: number;
  diffPercent: number;
}

/**
 * 两月对比内容组件
 */
const CompareContent = () => {
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  
  // 两个月份选择
  const [baseMonth, setBaseMonth] = useState(dayjs());
  const [compareMonth, setCompareMonth] = useState(dayjs().subtract(1, 'month'));
  
  // 日期选择器状态
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [datePickerTarget, setDatePickerTarget] = useState<'base' | 'compare'>('base');
  
  // 两个月的数据
  const [baseData, setBaseData] = useState<MonthData | null>(null);
  const [compareData, setCompareData] = useState<MonthData | null>(null);
  
  // 图表引用
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  // 加载单个月份数据
  const loadMonthData = async (date: dayjs.Dayjs): Promise<MonthData> => {
    const year = date.year();
    const month = date.month() + 1;
    const startOfMonth = date.startOf('month');
    const endOfMonth = date.endOf('month');
    const startDate = startOfMonth.format('YYYY-MM-DD');
    const endDate = endOfMonth.format('YYYY-MM-DD');

    let reportData: ReportData | null = null;
    let records: RecordItem[] = [];

    if (isLoggedIn) {
      reportData = await getReportData(year, month);
      records = await getRecords({ startDate, endDate });
    } else {
      // 从本地存储计算
      const allRecords = getLocalRecords();
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
      const dailyStatsMap = new Map<string, { date: string; expense: number; income: number }>();
      for (let i = 1; i <= date.daysInMonth(); i++) {
        const dateStr = date.format(`YYYY-MM-${String(i).padStart(2, '0')}`);
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

      reportData = {
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
      };
      records = monthRecords;
    }

    return { date, reportData, records };
  };

  // 加载对比数据
  const loadCompareData = async () => {
    setLoading(true);
    try {
      const [base, compare] = await Promise.all([
        loadMonthData(baseMonth),
        loadMonthData(compareMonth),
      ]);
      setBaseData(base);
      setCompareData(compare);
    } catch (error) {
      console.error('Load compare data error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCompareData();
  }, [baseMonth, compareMonth, isLoggedIn]);

  // 计算对比数据
  const compareResult = useMemo(() => {
    if (!baseData?.reportData || !compareData?.reportData) return null;

    const base = baseData.reportData.summary;
    const compare = compareData.reportData.summary;

    return {
      expense: {
        base: base.totalExpense,
        compare: compare.totalExpense,
        diff: base.totalExpense - compare.totalExpense,
        diffPercent: compare.totalExpense > 0 
          ? ((base.totalExpense - compare.totalExpense) / compare.totalExpense) * 100 
          : 0,
      },
      income: {
        base: base.totalIncome,
        compare: compare.totalIncome,
        diff: base.totalIncome - compare.totalIncome,
        diffPercent: compare.totalIncome > 0 
          ? ((base.totalIncome - compare.totalIncome) / compare.totalIncome) * 100 
          : 0,
      },
      balance: {
        base: base.balance,
        compare: compare.balance,
        diff: base.balance - compare.balance,
        diffPercent: compare.balance !== 0 
          ? ((base.balance - compare.balance) / Math.abs(compare.balance)) * 100 
          : 0,
      },
    };
  }, [baseData, compareData]);

  // 计算分类对比数据
  const categoryCompare = useMemo((): CategoryCompare[] => {
    if (!baseData?.reportData || !compareData?.reportData) return [];

    const baseCategories = new Map<string, CategoryStats>();
    const compareCategories = new Map<string, CategoryStats>();

    // 合并两个月的分类数据
    [...baseData.reportData.categoryStats.expense, ...baseData.reportData.categoryStats.income]
      .forEach(item => baseCategories.set(`${item.type}-${item.category}`, item));
    [...compareData.reportData.categoryStats.expense, ...compareData.reportData.categoryStats.income]
      .forEach(item => compareCategories.set(`${item.type}-${item.category}`, item));

    // 获取所有分类
    const allKeys = new Set([...baseCategories.keys(), ...compareCategories.keys()]);
    
    const result: CategoryCompare[] = [];
    allKeys.forEach(key => {
      const baseItem = baseCategories.get(key);
      const compareItem = compareCategories.get(key);
      
      const baseAmount = baseItem?.amount || 0;
      const compareAmount = compareItem?.amount || 0;
      const diff = baseAmount - compareAmount;
      
      result.push({
        category: baseItem?.category || compareItem?.category || '',
        categoryIcon: baseItem?.categoryIcon || compareItem?.categoryIcon || '📦',
        type: (baseItem?.type || compareItem?.type) as 'expense' | 'income',
        baseAmount,
        compareAmount,
        diff,
        diffPercent: compareAmount > 0 ? (diff / compareAmount) * 100 : 0,
      });
    });

    // 按差异绝对值排序
    return result.sort((a, b) => Math.abs(b.diff) - Math.abs(a.diff));
  }, [baseData, compareData]);

  // 初始化对比图表
  useEffect(() => {
    if (!chartRef.current || !compareResult) {
      chartInstance.current?.dispose();
      chartInstance.current = null;
      return;
    }

    if (!chartInstance.current) {
      chartInstance.current = echarts.init(chartRef.current);
    }

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
      },
      legend: {
        data: [baseMonth.format('YYYY年M月'), compareMonth.format('YYYY年M月')],
        bottom: 0,
        textStyle: {
          fontFamily: 'PixelFont, monospace',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '10%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: ['支出', '收入', '结余'],
        axisLabel: {
          fontFamily: 'PixelFont, monospace',
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => `¥${value.toFixed(0)}`,
          fontFamily: 'PixelFont, monospace',
        },
      },
      series: [
        {
          name: baseMonth.format('YYYY年M月'),
          type: 'bar',
          data: [
            compareResult.expense.base,
            compareResult.income.base,
            compareResult.balance.base,
          ],
          itemStyle: { color: '#c45c48' },
        },
        {
          name: compareMonth.format('YYYY年M月'),
          type: 'bar',
          data: [
            compareResult.expense.compare,
            compareResult.income.compare,
            compareResult.balance.compare,
          ],
          itemStyle: { color: '#8b7355' },
        },
      ],
    };

    chartInstance.current.setOption(option, true);

    return () => {
      chartInstance.current?.dispose();
      chartInstance.current = null;
    };
  }, [compareResult, baseMonth, compareMonth]);

  // 打开日期选择器
  const openDatePicker = (target: 'base' | 'compare') => {
    setDatePickerTarget(target);
    setDatePickerVisible(true);
  };

  // 确认日期选择
  const handleDateConfirm = (date: dayjs.Dayjs, _mode: DateMode) => {
    if (datePickerTarget === 'base') {
      setBaseMonth(date);
    } else {
      setCompareMonth(date);
    }
    setDatePickerVisible(false);
  };

  // 交换两个月份
  const swapMonths = () => {
    const temp = baseMonth;
    setBaseMonth(compareMonth);
    setCompareMonth(temp);
  };

  // 格式化变化显示
  const formatChange = (diff: number, diffPercent: number) => {
    const sign = diff > 0 ? '+' : '';
    const colorClass = diff > 0 ? styles.increase : diff < 0 ? styles.decrease : styles.neutral;
    return (
      <span className={colorClass}>
        {sign}{diff.toFixed(2)} ({sign}{diffPercent.toFixed(1)}%)
      </span>
    );
  };

  if (loading && (!baseData || !compareData)) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>加载中...</div>
      </div>
    );
  }

  if (!compareResult) {
    return (
      <div className={styles.emptyContainer}>
        <Empty description="暂无数据" />
      </div>
    );
  }

  return (
    <div className={styles.compareContent}>
      {/* 月份选择器 */}
      <div className={styles.monthSelector}>
        <div 
          className={styles.monthBox} 
          onClick={() => openDatePicker('base')}
        >
          <span className={styles.monthLabel}>基准月</span>
          <span className={styles.monthValue}>{baseMonth.format('YYYY年M月')}</span>
        </div>
        
        <Button 
          type="text" 
          icon={<SwapOutlined />} 
          onClick={swapMonths}
          className={styles.swapBtn}
        />
        
        <div 
          className={styles.monthBox} 
          onClick={() => openDatePicker('compare')}
        >
          <span className={styles.monthLabel}>对比月</span>
          <span className={styles.monthValue}>{compareMonth.format('YYYY年M月')}</span>
        </div>
      </div>

      {/* 总览对比卡片 */}
      <div className={styles.summaryCards}>
        <div className={styles.summaryCard}>
          <span className={styles.cardLabel}>支出对比</span>
          <div className={styles.cardValues}>
            <span className={styles.baseValue}>¥{compareResult.expense.base.toFixed(2)}</span>
            <span className={styles.vs}>vs</span>
            <span className={styles.compareValue}>¥{compareResult.expense.compare.toFixed(2)}</span>
          </div>
          <div className={styles.cardChange}>
            {formatChange(compareResult.expense.diff, compareResult.expense.diffPercent)}
          </div>
        </div>
        
        <div className={styles.summaryCard}>
          <span className={styles.cardLabel}>收入对比</span>
          <div className={styles.cardValues}>
            <span className={styles.baseValue}>¥{compareResult.income.base.toFixed(2)}</span>
            <span className={styles.vs}>vs</span>
            <span className={styles.compareValue}>¥{compareResult.income.compare.toFixed(2)}</span>
          </div>
          <div className={styles.cardChange}>
            {formatChange(compareResult.income.diff, compareResult.income.diffPercent)}
          </div>
        </div>
        
        <div className={styles.summaryCard}>
          <span className={styles.cardLabel}>结余对比</span>
          <div className={styles.cardValues}>
            <span className={styles.baseValue}>¥{compareResult.balance.base.toFixed(2)}</span>
            <span className={styles.vs}>vs</span>
            <span className={styles.compareValue}>¥{compareResult.balance.compare.toFixed(2)}</span>
          </div>
          <div className={styles.cardChange}>
            {formatChange(compareResult.balance.diff, compareResult.balance.diffPercent)}
          </div>
        </div>
      </div>

      {/* 对比图表 */}
      <div className={styles.chartContainer}>
        <div ref={chartRef} className={styles.compareChart} style={{ height: '250px' }} />
      </div>

      {/* 分类对比列表 */}
      <div className={styles.categoryCompareSection}>
        <h3 className={styles.sectionTitle}>分类变化排行</h3>
        <div className={styles.categoryList}>
          {categoryCompare.slice(0, 10).map((item) => (
            <div key={`${item.type}-${item.category}`} className={styles.categoryItem}>
              <div className={styles.categoryInfo}>
                <span className={styles.categoryIcon}>{item.categoryIcon}</span>
                <div className={styles.categoryDetail}>
                  <span className={styles.categoryName}>{item.category}</span>
                  <span className={styles.categoryType}>{item.type === 'expense' ? '支出' : '收入'}</span>
                </div>
              </div>
              <div className={styles.categoryValues}>
                <div className={styles.valueRow}>
                  <span className={styles.baseAmount}>¥{item.baseAmount.toFixed(2)}</span>
                  <span className={styles.arrow}>→</span>
                  <span className={styles.compareAmount}>¥{item.compareAmount.toFixed(2)}</span>
                </div>
                <div className={styles.diffRow}>
                  {formatChange(item.diff, item.diffPercent)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 日期选择器 */}
      <DatePicker
        visible={datePickerVisible}
        onCancel={() => setDatePickerVisible(false)}
        onConfirm={handleDateConfirm}
        defaultDate={datePickerTarget === 'base' ? baseMonth : compareMonth}
        defaultMode="month"
      />
    </div>
  );
};

export default CompareContent;
