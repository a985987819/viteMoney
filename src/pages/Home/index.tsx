import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, List, Tag, Empty, Spin, message, Modal } from 'antd';
import {
  PlusOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { RecordItem, MonthlyStats, DateGroup } from '../../api/record';
import { getMonthlyStats, getRecordsByDateGroups, deleteRecord } from '../../api/record';
import { getLocalRecords, saveLocalRecords, getLocalBudget } from '../../utils/storage';
import { useAuth } from '../../hooks/useAuth';
import { compareDate, getTimestamp } from '../../utils/importExport';
import BottomNav from '../../components/BottomNav';
import SwipeableRecordItem from '../../components/SwipeableRecordItem';
import styles from './index.module.scss';
import StardewPanel from '../../components/StardewPanel';

const DATE_COUNT = 10;

// CDN 基础地址
const CDN_BASE_URL = 'https://vercel-icons.vercel.app';
const homeBottomImg = `${CDN_BASE_URL}/homeBottom.png`;

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<MonthlyStats>({
    totalExpense: 0,
    totalIncome: 0,
    budget: 5000,
  });
  const [dateGroups, setDateGroups] = useState<DateGroup[]>([]);
  const [showAmount, setShowAmount] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [cursor, setCursor] = useState<string | undefined>(undefined);
  const listRef = useRef<HTMLDivElement>(null);

  const loadRecords = useCallback(async (isRefresh = false) => {
    setLoading(true);

    try {
      if (isLoggedIn) {
        const currentMonth = dayjs().format('YYYY-MM');
        const [statsRes, recordsRes] = await Promise.all([
          getMonthlyStats(currentMonth),
          getRecordsByDateGroups({ cursor: isRefresh ? undefined : cursor, limit: DATE_COUNT }),
        ]);
        setStats(statsRes);

        if (isRefresh) {
          setDateGroups(recordsRes.data);
        } else {
          setDateGroups(prev => {
            const newGroups = [...prev];
            recordsRes.data.forEach((newGroup: DateGroup) => {
              const existingIndex = newGroups.findIndex(g => g.date === newGroup.date);
              if (existingIndex >= 0) {
                newGroups[existingIndex].records = [...newGroups[existingIndex].records, ...newGroup.records];
                newGroups[existingIndex].records.sort((a, b) => compareDate(b.date, a.date));
              } else {
                newGroups.push(newGroup);
              }
            });
            return newGroups;
          });
        }
        setHasMore(recordsRes.hasMore);
        setCursor(recordsRes.nextCursor);
      } else {
        const localRecords = getLocalRecords();
        const now = dayjs();
        const currentMonth = now.format('YYYY-MM');
        const currentYear = now.year();
        const currentMonthNum = now.month() + 1;

        const monthRecords = localRecords.filter(r => dayjs(r.date).format('YYYY-MM') === currentMonth);
        const totalExpense = monthRecords
          .filter(r => r.type === 'expense')
          .reduce((sum, r) => sum + Number(r.amount), 0);
        const totalIncome = monthRecords
          .filter(r => r.type === 'income')
          .reduce((sum, r) => sum + Number(r.amount), 0);

        // 获取本地预算，如果没有设置则使用默认值 1000
        const localBudget = getLocalBudget(currentYear, currentMonthNum);
        const budgetAmount = localBudget?.amount || 1000;

        setStats({
          totalExpense,
          totalIncome,
          budget: budgetAmount,
        });

        const grouped = localRecords.reduce((acc, record) => {
          const dateStr = dayjs(getTimestamp(record.date)).format('YYYY-MM-DD');
          if (!acc[dateStr]) {
            acc[dateStr] = [];
          }
          acc[dateStr].push(record);
          return acc;
        }, {} as Record<string, RecordItem[]>);

        const today = dayjs().format('YYYY-MM-DD');

        const groups: DateGroup[] = Object.entries(grouped)
          .map(([date, records]) => ({
            date,
            records: records.sort((a, b) => compareDate(b.date, a.date)),
          }))
          .filter(group => group.date <= today)
          .sort((a, b) => compareDate(b.date, a.date));

        const currentCursor = isRefresh ? undefined : cursor;
        let startIndex = 0;
        if (currentCursor) {
          const cursorIndex = groups.findIndex(g => g.date <= currentCursor);
          startIndex = cursorIndex >= 0 ? cursorIndex + 1 : groups.length;
        }
        const endIndex = startIndex + DATE_COUNT;
        const pageData = groups.slice(startIndex, endIndex);

        if (isRefresh) {
          setDateGroups(pageData);
        } else {
          setDateGroups(prev => [...prev, ...pageData]);
        }
        const hasMoreLocal = endIndex < groups.length;
        setHasMore(hasMoreLocal);
        if (pageData.length > 0) {
          setCursor(pageData[pageData.length - 1].date);
        }
      }
    } catch (error) {
      message.error(t('common.failed'));
      console.error('Fetch data error:', error);
    } finally {
      setLoading(false);
    }
  }, [isLoggedIn, cursor, t]);

  useEffect(() => {
    loadRecords(true);
  }, [isLoggedIn]);

  const handleScroll = useCallback(() => {
    if (!listRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = listRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 50 && hasMore && !loadingRef.current) {
      loadRecords();
    }
  }, [hasMore, loadRecords]);

  // 使用 ref 来存储 loading 状态，避免闭包问题
  const loadingRef = useRef(loading);
  useEffect(() => {
    loadingRef.current = loading;
  }, [loading]);

  useEffect(() => {
    const listEl = listRef.current;
    if (listEl) {
      listEl.addEventListener('scroll', handleScroll);
      return () => listEl.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const handleAddRecord = () => {
    navigate('/add');
  };

  const handleEditRecord = (record: RecordItem) => {
    navigate('/add', { state: { record } });
  };

  const handleDeleteRecord = async (record: RecordItem) => {
    Modal.confirm({
      title: t('common.confirm'),
      content: t('bill.deleteConfirm'),
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
          message.success(t('bill.deleteSuccess'));
          loadRecords(true);
        } catch (error) {
          message.error(t('bill.deleteFailed'));
          console.error('Delete error:', error);
        }
      },
    });
  };

  const formatAmount = (amount: number) => {
    if (!showAmount) return '****';
    return `¥${amount.toFixed(2)}`;
  };

  // 预算金额格式化（不带小数）
  const formatBudgetAmount = (amount: number) => {
    if (!showAmount) return '****';
    return Math.round(amount).toString();
  };

  const getDateLabel = (dateStr: string) => {
    const nowYear = dayjs().format('YYYY');
    const today = dayjs().format('YYYY-MM-DD');
    const yesterday = dayjs().subtract(1, 'day').format('YYYY-MM-DD');

    if (dateStr === today) return t('home.today') || '今天';
    if (dateStr === yesterday) return t('home.yesterday') || '昨天';
    return dayjs(dateStr).format(t('home.dateFormat') || `${nowYear === dayjs(dateStr).format('YYYY') ? '' : dayjs(dateStr).format('YYYY')}年M月D日`);
  };

  const getCurrentMonth = () => {
    return dayjs().format(t('home.monthFormat') || 'M月');
  };

  const getDayTotal = (dayRecords: RecordItem[]) => {
    const expense = dayRecords
      .filter(r => r.type === 'expense')
      .reduce((sum, r) => sum + Number(r.amount), 0);
    const income = dayRecords
      .filter(r => r.type === 'income')
      .reduce((sum, r) => sum + Number(r.amount), 0);
    return { expense, income };
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.headerSection}>
        <div className={styles.statsSection}>
          <div className={styles.statsLabel}>{t('home.monthlyExpense')}({t('common.yuan')})</div>
          <div className={styles.statsAmount}>
            <span className={styles.amountValue}>{formatAmount(stats.totalExpense)}</span>
            <span className={styles.amountEye} onClick={() => setShowAmount(!showAmount)}>
              {showAmount ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
          </div>

          <div className={styles.statsSub}>
            <div></div>
            {/* <span>{t('home.monthlyIncome')} {formatAmount(stats.totalIncome)}</span> */}
            {/* <span className={styles.budgetLabel}>{t('home.budgetRemaining')}</span> */}
            <div
              className={styles.statsBudget}
              id='budgetRemaining'
              style={{ backgroundImage: `url(${CDN_BASE_URL}/budgetBg.png)` }}
              onClick={() => navigate('/budget')}
            >
              <span className={styles.budgetValue}>
                {formatBudgetAmount(stats.budget - stats.totalExpense)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.addButtonSection}>
        <Button
          id="findmeHere"
          type="primary"
          size="large"
          block
          className={styles.addRecordBtn}
          onClick={handleAddRecord}
        >
          <PlusOutlined />
          {t('home.addRecord')}
        </Button>
      </div>

      <div className={styles.recordsSection}>
        <div className={styles.recordsHeader}>
          <span className={styles.recordsTitle}>{t('home.recentRecords')}</span>
          <Tag color="success" className={styles.recordsTag}>{getCurrentMonth()}</Tag>
        </div>

        {/* <div className={styles.recordsListContainer} ref={listRef}> */}
        <div className={styles.recordsListContainer}>
          <Spin spinning={loading && dateGroups.length === 0}>
            {dateGroups.length === 0 && !loading ? (
              <Empty description={t('home.noRecords')} />
            ) : (
              <div className={styles.recordsList}>
                {dateGroups.map((group) => {
                  const { expense, income } = getDayTotal(group.records);

                  return (
                    <StardewPanel>
                      <div key={group.date} className={styles.recordDayGroup}>
                        <div className={styles.recordDayHeader}>
                          <span>{getDateLabel(group.date)}</span>
                          <span className={styles.dayTotal}>
                            {expense > 0 && `${t('home.expenseShort')}:${expense.toFixed(2)}`}
                            {income > 0 && ` ${t('home.incomeShort')}:${income.toFixed(2)}`}
                          </span>
                        </div>
                        <List
                          dataSource={group.records}
                          renderItem={(record) => (
                            <SwipeableRecordItem
                              record={record}
                              onEdit={handleEditRecord}
                              onDelete={handleDeleteRecord}
                            />
                          )}
                        />
                      </div></StardewPanel>
                  );
                })}
                {loading && dateGroups.length > 0 && (
                  <div className={styles.loadingMore}>
                    <Spin size="small" />
                    <span>{t('common.loading')}</span>
                  </div>
                )}
                {!hasMore && dateGroups.length > 0 && (
                  <div className={styles.noMore}>{t('common.empty')}</div>
                )}
              </div>
            )}
          </Spin>
        </div>
        {/* </div> */}
      </div>

      <img src={homeBottomImg} alt={t('homeBottomImg')} className={styles.homeBottom}></img>
      <BottomNav />
    </div>
  );
};

export default Home;
