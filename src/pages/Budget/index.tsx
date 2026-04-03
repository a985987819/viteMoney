import { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  InputNumber,
  DatePicker,
  Progress,
  Empty,
  message,
  Spin,
  Modal,
  List,
  Tag,
} from 'antd';
import {
  LeftOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  PieChartOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { BudgetResponse, BudgetStats } from '../../api/budget';
import {
  getCurrentBudget,
  setBudget as setBudgetApi,
  deleteBudget as deleteBudgetApi,
  getBudgetStats,
  getRecentBudgets,
} from '../../api/budget';
import { useAuth } from '../../hooks/useAuth';
import PageHeader from '../../components/PageHeader';
import {
  getLocalBudgets,
  getLocalBudget,
  setLocalBudget,
  deleteLocalBudget,
  type LocalBudget,
} from '../../utils/storage';
import { getLocalRecords } from '../../utils/storage';
import styles from './index.module.scss';

const DEFAULT_BUDGET_AMOUNT = 1000;

/**
 * 预算管理页面
 */
const Budget = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  // 状态
  const [currentBudget, setCurrentBudget] = useState<BudgetResponse | null>(null);
  const [budgetStats, setBudgetStats] = useState<BudgetStats | null>(null);
  const [recentBudgets, setRecentBudgets] = useState<BudgetResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  // 弹窗状态
  const [setBudgetModalVisible, setSetBudgetModalVisible] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState<number | null>(null);
  const [settingLoading, setSettingLoading] = useState(false);

  // 计算本地支出
  const calculateLocalSpent = (year: number, month: number): number => {
    const records = getLocalRecords();
    return records
      .filter(r => {
        const recordDate = dayjs(r.date);
        return recordDate.year() === year && recordDate.month() + 1 === month && r.type === 'expense';
      })
      .reduce((sum, r) => sum + Number(r.amount), 0);
  };

  // 将本地预算转换为 BudgetResponse 格式
  const localBudgetToResponse = (local: LocalBudget): BudgetResponse => {
    const spent = calculateLocalSpent(local.year, local.month);
    const remaining = local.amount - spent;
    const percentage = local.amount > 0 ? (spent / local.amount) * 100 : 0;
    return {
      id: local.id || `local_${local.year}_${local.month}`,
      ...local,
      spent,
      remaining,
      percentage,
    };
  };

  // 加载数据
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      if (isLoggedIn) {
        const [currentRes, statsRes, recentRes] = await Promise.all([
          getCurrentBudget(),
          getBudgetStats(),
          getRecentBudgets(6),
        ]);
        setCurrentBudget(currentRes.budget);
        setBudgetStats(statsRes);
        setRecentBudgets(recentRes.budgets);
      } else {
        // 本地模式
        const now = dayjs();
        const currentYear = now.year();
        const currentMonth = now.month() + 1;

        const localCurrentBudget = getLocalBudget(currentYear, currentMonth);
        if (localCurrentBudget) {
          setCurrentBudget(localBudgetToResponse(localCurrentBudget));
        } else {
          // 默认预算 1000
          const defaultBudget: LocalBudget = {
            year: currentYear,
            month: currentMonth,
            amount: DEFAULT_BUDGET_AMOUNT,
          };
          setLocalBudget(defaultBudget);
          setCurrentBudget(localBudgetToResponse(defaultBudget));
        }

        // 历史预算
        const allLocalBudgets = getLocalBudgets();
        const sortedBudgets = allLocalBudgets
          .sort((a, b) => {
            if (a.year !== b.year) return b.year - a.year;
            return b.month - a.month;
          })
          .slice(0, 6);
        setRecentBudgets(sortedBudgets.map(localBudgetToResponse));

        // 计算统计
        const currentSpent = calculateLocalSpent(currentYear, currentMonth);
        const lastMonthSpent = calculateLocalSpent(
          currentMonth === 1 ? currentYear - 1 : currentYear,
          currentMonth === 1 ? 12 : currentMonth - 1
        );

        setBudgetStats({
          currentMonth: localBudgetToResponse({
            year: currentYear,
            month: currentMonth,
            amount: localCurrentBudget?.amount || DEFAULT_BUDGET_AMOUNT,
          }),
          lastMonth: lastMonthSpent > 0 ? {
            id: 'last',
            year: currentMonth === 1 ? currentYear - 1 : currentYear,
            month: currentMonth === 1 ? 12 : currentMonth - 1,
            amount: 0,
            spent: lastMonthSpent,
            remaining: -lastMonthSpent,
            percentage: 100,
          } : null,
          averageSpent: currentSpent,
        });
      }
    } catch (error) {
      message.error(t('common.loadFailed'));
      console.error('Load budget data error:', error);
    } finally {
      setLoading(false);
    }
  }, [t, isLoggedIn]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 设置预算
  const handleSetBudget = async () => {
    if (budgetAmount === null || budgetAmount < 0) {
      message.error('请输入有效的预算金额');
      return;
    }

    setSettingLoading(true);
    try {
      if (isLoggedIn) {
        await setBudgetApi({
          amount: budgetAmount,
          year: selectedDate.year(),
          month: selectedDate.month() + 1,
        });
      } else {
        setLocalBudget({
          year: selectedDate.year(),
          month: selectedDate.month() + 1,
          amount: budgetAmount,
        });
      }
      message.success('预算设置成功');
      setSetBudgetModalVisible(false);
      setBudgetAmount(null);
      loadData();
    } catch (error) {
      message.error('预算设置失败');
      console.error('Set budget error:', error);
    } finally {
      setSettingLoading(false);
    }
  };

  // 删除预算
  const handleDeleteBudget = (year: number, month: number) => {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除 ${year}年${month}月 的预算吗？`,
      okType: 'danger',
      onOk: async () => {
        try {
          if (isLoggedIn) {
            await deleteBudgetApi(year, month);
          } else {
            deleteLocalBudget(year, month);
          }
          message.success('预算删除成功');
          loadData();
        } catch (error) {
          message.error('预算删除失败');
          console.error('Delete budget error:', error);
        }
      },
    });
  };

  // 打开设置预算弹窗
  const openSetBudgetModal = (budget?: BudgetResponse) => {
    if (budget) {
      setSelectedDate(dayjs().year(budget.year).month(budget.month - 1));
      setBudgetAmount(budget.amount);
    } else {
      setSelectedDate(dayjs());
      setBudgetAmount(null);
    }
    setSetBudgetModalVisible(true);
  };

  // 获取进度条颜色
  const getProgressColor = (percentage: number) => {
    if (percentage >= 100) return '#c45c48';
    if (percentage >= 80) return '#e8a838';
    return '#4a9c3d';
  };

  // 获取状态标签
  const getStatusTag = (percentage: number) => {
    if (percentage >= 100) return <Tag color="error">超支</Tag>;
    if (percentage >= 80) return <Tag color="warning">即将超支</Tag>;
    return <Tag color="success">正常</Tag>;
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className={styles.budgetPage}>
      {/* 头部 */}
      <PageHeader
        title={t('profile.budget', '预算管理')}
        backPath="/profile"
        rightContent={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => openSetBudgetModal()}
            className={styles.addBtn}
          >
            设置预算
          </Button>
        }
      />

      {/* 当前月预算卡片 */}
      <div className={styles.content}>
        {currentBudget ? (
          <Card className={styles.currentBudgetCard}>
            <div className={styles.budgetHeader}>
              <div className={styles.budgetTitle}>
                <CalendarOutlined />
                <span>{currentBudget.year}年{currentBudget.month}月预算</span>
                {getStatusTag(currentBudget.percentage)}
              </div>
              <Button
                size="small"
                type="text"
                icon={<EditOutlined />}
                onClick={() => openSetBudgetModal(currentBudget)}
              />
            </div>

            <div className={styles.budgetProgress}>
              <Progress
                percent={Math.min(currentBudget.percentage, 100)}
                strokeColor={getProgressColor(currentBudget.percentage)}
                trailColor="rgba(139, 90, 43, 0.2)"
                strokeWidth={12}
                showInfo={false}
              />
              <div className={styles.progressText}>
                已使用 {currentBudget.percentage.toFixed(1)}%
              </div>
            </div>

            <div className={styles.budgetStats}>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>预算总额</div>
                <div className={styles.statValue}>¥{currentBudget.amount.toFixed(2)}</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>已支出</div>
                <div className={`${styles.statValue} ${styles.expense}`}>
                  ¥{currentBudget.spent.toFixed(2)}
                </div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statLabel}>剩余</div>
                <div className={`${styles.statValue} ${styles.remaining}`}>
                  ¥{currentBudget.remaining.toFixed(2)}
                </div>
              </div>
            </div>
          </Card>
        ) : (
          <Card className={styles.emptyCard}>
            <Empty
              description="本月尚未设置预算"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => openSetBudgetModal()}
              className={styles.setBudgetBtn}
            >
              设置本月预算
            </Button>
          </Card>
        )}

        {/* 统计对比 */}
        {budgetStats && (
          <Card className={styles.statsCard} title={<><PieChartOutlined /> 预算统计</>}>
            <div className={styles.compareStats}>
              <div className={styles.compareItem}>
                <div className={styles.compareLabel}>上月支出</div>
                <div className={styles.compareValue}>
                  {budgetStats.lastMonth ? (
                    <>¥{budgetStats.lastMonth.spent.toFixed(2)}</>
                  ) : (
                    '-'
                  )}
                </div>
              </div>
              <div className={styles.compareItem}>
                <div className={styles.compareLabel}>平均月支出</div>
                <div className={styles.compareValue}>
                  ¥{budgetStats.averageSpent.toFixed(2)}
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* 历史预算列表 */}
        {recentBudgets.length > 0 && (
          <Card className={styles.historyCard} title="历史预算">
            <List
              dataSource={recentBudgets}
              renderItem={(budget) => (
                <List.Item
                  className={styles.budgetListItem}
                  actions={[
                    <Button
                      key="edit"
                      type="text"
                      size="small"
                      icon={<EditOutlined />}
                      onClick={() => openSetBudgetModal(budget)}
                    />,
                    <Button
                      key="delete"
                      type="text"
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDeleteBudget(budget.year, budget.month)}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    title={
                      <div className={styles.budgetItemTitle}>
                        <span>{budget.year}年{budget.month}月</span>
                        {getStatusTag(budget.percentage)}
                      </div>
                    }
                    description={
                      <div className={styles.budgetItemDesc}>
                        <Progress
                          percent={Math.min(budget.percentage, 100)}
                          strokeColor={getProgressColor(budget.percentage)}
                          trailColor="rgba(139, 90, 43, 0.2)"
                          size="small"
                          showInfo={false}
                        />
                        <span className={styles.budgetItemStats}>
                          ¥{budget.spent.toFixed(0)} / ¥{budget.amount.toFixed(0)}
                        </span>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        )}
      </div>

      {/* 设置预算弹窗 */}
      <Modal
        title="设置预算"
        open={setBudgetModalVisible}
        onCancel={() => {
          setSetBudgetModalVisible(false);
          setBudgetAmount(null);
        }}
        onOk={handleSetBudget}
        confirmLoading={settingLoading}
        okText="确定"
        cancelText="取消"
      >
        <div className={styles.modalContent}>
          <div className={styles.formItem}>
            <label>选择月份</label>
            <DatePicker
              picker="month"
              value={selectedDate}
              onChange={(date) => date && setSelectedDate(date)}
              style={{ width: '100%' }}
            />
          </div>
          <div className={styles.formItem}>
            <label>预算金额</label>
            <InputNumber
              prefix="¥"
              min={0}
              precision={2}
              value={budgetAmount}
              onChange={setBudgetAmount}
              style={{ width: '100%' }}
              placeholder="请输入预算金额"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Budget;
