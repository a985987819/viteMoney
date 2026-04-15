import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Empty, Form, InputNumber, Modal, Progress, Tag, message } from 'antd';
import { FolderOpenOutlined, ThunderboltOutlined, TeamOutlined, WalletOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import BottomNav from '../../components/BottomNav';
import type { SavingsPlan } from '../../api/savings';
import { getActiveSavingsPlan, getLocalDeposits, getLocalSavingsPlans, saveLocalDeposit, type SavingsDeposit } from '../../api/savings';
import styles from './index.module.scss';

const SavingsOperate = () => {
  const navigate = useNavigate();
  const [currentPlan, setCurrentPlan] = useState<SavingsPlan | null>(null);
  const [recentDeposits, setRecentDeposits] = useState<SavingsDeposit[]>([]);
  const [manualDepositVisible, setManualDepositVisible] = useState(false);
  const [manualForm] = Form.useForm();

  const loadCurrentPlan = () => {
    const plan = getActiveSavingsPlan();
    setCurrentPlan(plan);
    setRecentDeposits(plan ? getLocalDeposits(plan.id).slice(-5).reverse() : []);
  };

  useEffect(() => {
    loadCurrentPlan();
  }, []);

  const totalSaved = useMemo(() => getLocalSavingsPlans().reduce((sum, plan) => sum + plan.savedAmount, 0), [currentPlan]);
  const totalTarget = useMemo(() => getLocalSavingsPlans().reduce((sum, plan) => sum + plan.targetAmount, 0), [currentPlan]);

  const handleDeposit = (type: 'average' | 'random' | 'manual', amount?: number) => {
    if (!currentPlan) {
      message.warning('请先去攒钱计划管理页打开一个计划');
      return;
    }

    if (type === 'manual') {
      setManualDepositVisible(true);
      return;
    }

    const suggestedAmount = type === 'average'
      ? currentPlan.dailyAverage
      : currentPlan.dailyAverage * (0.8 + Math.random() * 0.4);
    const finalAmount = amount ?? suggestedAmount;

    if (!finalAmount || finalAmount <= 0) {
      message.warning('请输入有效金额');
      return;
    }

    saveLocalDeposit({
      id: `deposit_${Date.now()}`,
      planId: currentPlan.id,
      amount: Number(finalAmount.toFixed(2)),
      type,
      createdAt: new Date().toISOString(),
    });

    loadCurrentPlan();
    message.success('攒钱成功');
  };

  const progress = currentPlan?.percentage ?? 0;
  const randomAmount = currentPlan ? Number((currentPlan.dailyAverage * (0.8 + Math.random() * 0.4)).toFixed(2)) : 0;

  return (
    <div className={styles.pageContainer}>
      <div className={styles.summarySection}>
        <div className={styles.summaryCard}>
          <div className={styles.summaryLabel}>全部计划已攒</div>
          <div className={styles.summaryValue}>￥{totalSaved.toFixed(2)}</div>
          <div className={styles.summaryMeta}>总目标 ￥{totalTarget.toFixed(2)}</div>
        </div>
      </div>

      <div className={styles.contentSection}>
        {!currentPlan ? (
          <div className={styles.emptyPanel}>
            <Empty description="还没有打开中的攒钱计划" />
            <Button type="primary" className={styles.primaryButton} icon={<FolderOpenOutlined />} onClick={() => navigate('/savings-manage')}>
              去打开一个计划
            </Button>
          </div>
        ) : (
          <>
            <section className={styles.planCard}>
              <div className={styles.progressWrap}>
                <Progress percent={Number(progress.toFixed(1))} strokeColor={progress >= 100 ? '#52c41a' : '#4a90e2'} />
              </div>
              <div className={styles.planHeader}>
                <div>
                  <div className={styles.planName}>{currentPlan.name}</div>
                  <div className={styles.planDate}>{currentPlan.startDate} 至 {currentPlan.endDate}</div>
                </div>
                <Tag color={progress >= 100 ? 'success' : 'processing'}>{progress >= 100 ? '已完成' : '进行中'}</Tag>
              </div>
              <div className={styles.amountGrid}>
                <div className={styles.amountCard}>
                  <span>已攒金额</span>
                  <strong>￥{currentPlan.savedAmount.toFixed(2)}</strong>
                </div>
                <div className={styles.amountCard}>
                  <span>目标金额</span>
                  <strong>￥{currentPlan.targetAmount.toFixed(2)}</strong>
                </div>
                <div className={styles.amountCard}>
                  <span>日均建议</span>
                  <strong>￥{currentPlan.dailyAverage.toFixed(2)}</strong>
                </div>
              </div>
            </section>

            <section className={styles.actionSection}>
              <div className={styles.sectionTitle}>今日攒钱行动</div>
              <div className={styles.actionGrid}>
                <button type="button" className={styles.actionCard} onClick={() => handleDeposit('average')}>
                  <TeamOutlined />
                  <span>平均攒钱</span>
                  <strong>￥{currentPlan.dailyAverage.toFixed(2)}</strong>
                </button>
                <button type="button" className={styles.actionCard} onClick={() => handleDeposit('random')}>
                  <ThunderboltOutlined />
                  <span>随机攒钱</span>
                  <strong>￥{randomAmount.toFixed(2)}</strong>
                </button>
                <button type="button" className={styles.actionCard} onClick={() => handleDeposit('manual')}>
                  <WalletOutlined />
                  <span>主动攒钱</span>
                  <strong>手动输入</strong>
                </button>
              </div>
            </section>

            <section className={styles.historySection}>
              <div className={styles.historyHeader}>
                <div className={styles.sectionTitle}>最近记录</div>
                <Button className={styles.secondaryButton} onClick={() => navigate('/savings-manage')}>管理计划</Button>
              </div>
              {recentDeposits.length === 0 ? (
                <div className={styles.historyEmpty}>还没有攒钱记录，先完成上面的一个行动吧。</div>
              ) : (
                <div className={styles.historyList}>
                  {recentDeposits.map((deposit) => (
                    <div key={deposit.id} className={styles.historyItem}>
                      <div>
                        <div className={styles.historyType}>{deposit.type === 'average' ? '平均攒钱' : deposit.type === 'random' ? '随机攒钱' : '主动攒钱'}</div>
                        <div className={styles.historyDate}>{dayjs(deposit.createdAt).format('YYYY-MM-DD HH:mm')}</div>
                      </div>
                      <div className={styles.historyAmount}>+￥{deposit.amount.toFixed(2)}</div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </div>

      <Modal
        title="主动攒钱"
        open={manualDepositVisible}
        onCancel={() => {
          setManualDepositVisible(false);
          manualForm.resetFields();
        }}
        onOk={() => manualForm.submit()}
        okText="确定"
        cancelText="取消"
      >
        <Form form={manualForm} layout="vertical" onFinish={(values: { amount: number }) => {
          handleDeposit('manual', values.amount);
          setManualDepositVisible(false);
          manualForm.resetFields();
        }}>
          <Form.Item name="amount" label="金额" rules={[{ required: true, message: '请输入金额' }]}>
            <InputNumber style={{ width: '100%' }} min={0.01} step={0.01} precision={2} placeholder="输入本次攒钱金额" />
          </Form.Item>
        </Form>
      </Modal>

      <BottomNav />
    </div>
  );
};

export default SavingsOperate;