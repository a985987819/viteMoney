import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Card, Progress, Modal, Form, Input, InputNumber, DatePicker, message, Tag, Space } from 'antd';
import dayjs from 'dayjs';
import BottomNav from '../../components/BottomNav';
import {
  PlusOutlined,
  WalletOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { SavingsPlan } from '../../api/savings';
import {
  getLocalSavingsPlans,
  saveLocalSavingsPlans,
  deleteSavingsPlan,
  saveLocalDeposit,
} from '../../api/savings';
import styles from './index.module.scss';

const Savings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<SavingsPlan[]>([]);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [manualDepositVisible, setManualDepositVisible] = useState(false);
  const [selectedManualPlan, setSelectedManualPlan] = useState<SavingsPlan | null>(null);
  const [form] = Form.useForm();
  const [manualForm] = Form.useForm();

  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = () => {
    const localPlans = getLocalSavingsPlans();
    setPlans(localPlans);
  };

  const handleDeposit = (plan: SavingsPlan, type: 'average' | 'random' | 'manual', amount?: number) => {
    if (type === 'manual') {
      setSelectedManualPlan(plan);
      setManualDepositVisible(true);
      return;
    }

    let finalAmount = amount;

    if (type === 'average') {
      finalAmount = plan.dailyAverage;
    } else if (type === 'random') {
      finalAmount = plan.dailyAverage * (0.8 + Math.random() * 0.4);
    }

    if (!finalAmount || finalAmount <= 0) {
      message.warning(t('savings.amountRequired', '请输入有效金额'));
      return;
    }

    try {
      const deposit: any = {
        id: `deposit_${Date.now()}`,
        planId: plan.id,
        amount: Number(finalAmount.toFixed(2)),
        type,
        createdAt: new Date().toISOString(),
      };

      saveLocalDeposit(deposit);
      loadPlans();
      message.success(t('savings.depositSuccess', '攒钱成功'));
    } catch (error) {
      message.error(t('savings.depositFailed', '攒钱失败'));
    }
  };

  const handleCreatePlan = async (values: any) => {
    try {
      const startDate = dayjs().format('YYYY-MM-DD');
      const endDate = dayjs(values.endDate).format('YYYY-MM-DD');
      const daysDiff = dayjs(endDate).diff(dayjs(startDate), 'day');
      const dailyAverage = daysDiff > 0 ? values.targetAmount / daysDiff : values.targetAmount;

      const newPlan: SavingsPlan = {
        id: `plan_${Date.now()}`,
        name: values.name,
        targetAmount: values.targetAmount,
        savedAmount: 0,
        startDate,
        endDate,
        dailyAverage,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const newPlans = [...plans, newPlan];
      saveLocalSavingsPlans(newPlans);
      setPlans(newPlans);
      message.success(t('savings.planCreated', '攒钱计划创建成功'));
      setCreateModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error(t('savings.planCreateFailed', '创建失败'));
    }
  };

  const handleDeletePlan = (planId: string) => {
    Modal.confirm({
      title: t('common.confirm'),
      content: t('savings.deletePlanConfirm', '确定要删除这个攒钱计划吗？'),
      okType: 'danger',
      onOk: () => {
        deleteSavingsPlan(planId);
        const newPlans = plans.filter(p => p.id !== planId);
        saveLocalSavingsPlans(newPlans);
        setPlans(newPlans);
        message.success(t('common.success'));
      },
    });
  };

  const calculateProgress = (plan: SavingsPlan) => {
    return Math.min(100, (plan.savedAmount / plan.targetAmount) * 100);
  };

  const getDaysRemaining = (plan: SavingsPlan) => {
    const today = dayjs();
    const endDate = dayjs(plan.endDate);
    return endDate.diff(today, 'day');
  };

  const getStatusColor = (plan: SavingsPlan) => {
    const progress = calculateProgress(plan);
    if (progress >= 100) return '#52c41a';
    if (progress >= 50) return '#1890ff';
    if (progress >= 25) return '#faad14';
    return '#ff4d4f';
  };

  return (
    <div className={styles.savingsPage}>
      {/* 顶部统计卡片 */}
      <div className={styles.summarySection}>
        <Card className={styles.summaryCard}>
          <div className={styles.summaryTitle}>{t('savings.totalSaved', '已攒金额')}</div>
          <div className={styles.summaryAmount}>
            ¥{plans.reduce((sum, plan) => sum + plan.savedAmount, 0).toFixed(2)}
          </div>
          <div className={styles.summarySub}>
            <span>{t('savings.totalTarget', '目标金额')}: </span>
            <span>¥{plans.reduce((sum, plan) => sum + plan.targetAmount, 0).toFixed(2)}</span>
          </div>
        </Card>
      </div>

      {/* 攒钱计划列表 */}
      <div className={styles.plansSection}>
        <div className={styles.plansHeader}>
          <h2 className={styles.sectionTitle}>{t('savings.myPlans', '我的攒钱计划')}</h2>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setCreateModalVisible(true)}
          >
            {t('savings.createPlan', '创建计划')}
          </Button>
        </div>

        {plans.length === 0 ? (
          <div className={styles.emptyState}>
            <WalletOutlined style={{ fontSize: 48, color: '#d9d9d9' }} />
            <p>{t('savings.noPlans', '暂无攒钱计划')}</p>
            <Button type="primary" onClick={() => setCreateModalVisible(true)}>
              {t('savings.createFirstPlan', '创建第一个计划')}
            </Button>
          </div>
        ) : (
          <div className={styles.plansList}>
            {plans.map(plan => {
              const progress = calculateProgress(plan);
              const daysRemaining = getDaysRemaining(plan);
              const randomAmount = plan.dailyAverage * (0.8 + Math.random() * 0.4);

              return (
                <Card
                  key={plan.id}
                  className={styles.planCard}
                >
                  <div className={styles.planHeader}>
                    <h3 className={styles.planName}>{plan.name}</h3>
                    <Tag color={getStatusColor(plan)}>
                      {progress >= 100 ? t('savings.completed', '已完成') : t('savings.inProgress', '进行中')}
                    </Tag>
                  </div>

                  <div className={styles.planActions}>
                    <Button
                      icon={<TeamOutlined />}
                      onClick={() => handleDeposit(plan, 'average')}
                      className={styles.actionBtn}
                    >
                      <div className={styles.actionBtnContent}>
                        <span>{t('savings.average', '平均攒钱')}</span>
                        <span className={styles.actionAmount}>¥{plan.dailyAverage.toFixed(2)}</span>
                      </div>
                    </Button>
                    <Button
                      icon={<ThunderboltOutlined />}
                      onClick={() => handleDeposit(plan, 'random')}
                      className={styles.actionBtn}
                    >
                      <div className={styles.actionBtnContent}>
                        <span>{t('savings.random', '随机攒钱')}</span>
                        <span className={styles.actionAmount}>¥{randomAmount.toFixed(2)}</span>
                      </div>
                    </Button>
                    <Button
                      icon={<WalletOutlined />}
                      onClick={() => handleDeposit(plan, 'manual')}
                      className={styles.actionBtn}
                    >
                      <div className={styles.actionBtnContent}>
                        <span>{t('savings.manual', '主动攒钱')}</span>
                        <span className={styles.actionHint}>{t('savings.clickInput', '点击输入')}</span>
                      </div>
                    </Button>
                  </div>

                  <div className={styles.planFooter}>
                    <div className={styles.planProgress}>
                      <Progress
                        percent={progress}
                        strokeColor={getStatusColor(plan)}
                        format={(percent) => `${percent}%`}
                        size="small"
                      />
                    </div>

                    <div className={styles.planStatsCompact}>
                      <div className={styles.planStatCompact}>
                        <div className={styles.planStatLabel}>{t('savings.saved', '已攒')}</div>
                        <div className={styles.planStatValue}>¥{plan.savedAmount.toFixed(2)}</div>
                      </div>
                      <div className={styles.planStatCompact}>
                        <div className={styles.planStatLabel}>{t('savings.target', '目标')}</div>
                        <div className={styles.planStatValue}>¥{plan.targetAmount.toFixed(2)}</div>
                      </div>
                      <div className={styles.planStatCompact}>
                        <div className={styles.planStatLabel}>{t('savings.dailyAverage', '每日均攒')}</div>
                        <div className={styles.planStatValue}>¥{plan.dailyAverage.toFixed(2)}</div>
                      </div>
                      <div className={styles.planStatCompact}>
                        <div className={styles.planStatLabel}>{t('savings.daysRemaining', '剩余天数')}</div>
                        <div className={styles.planStatValue}>{daysRemaining > 0 ? daysRemaining : 0}</div>
                      </div>
                    </div>

                    <div className={styles.planDelete}>
                      <Button
                        size="small"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDeletePlan(plan.id)}
                      >
                        {t('common.delete')}
                      </Button>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      {/* 创建计划弹窗 */}
      <Modal
        title={t('savings.createPlan', '创建攒钱计划')}
        open={createModalVisible}
        onCancel={() => {
          setCreateModalVisible(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText={t('common.confirm')}
        cancelText={t('common.cancel')}
      >
        <Form form={form} layout="vertical" onFinish={handleCreatePlan}>
          <Form.Item
            name="name"
            label={t('savings.planName', '计划名称')}
            rules={[{ required: true, message: t('savings.planNameRequired', '请输入计划名称') }]}
          >
            <Input placeholder={t('savings.planNamePlaceholder', '例如：买房计划、旅行基金')} />
          </Form.Item>
          <Form.Item
            name="targetAmount"
            label={t('savings.targetAmount', '目标金额')}
            rules={[{ required: true, message: t('savings.targetAmountRequired', '请输入目标金额') }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              placeholder={t('savings.targetAmountPlaceholder', '输入目标金额')}
              min={0}
              step={0.01}
              precision={2}
              addonAfter="元"
            />
          </Form.Item>
          <Form.Item
            name="endDate"
            label={t('savings.endDate', '截止日期')}
            rules={[{ required: true, message: t('savings.endDateRequired', '请选择截止日期') }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              disabledDate={(current) => current && current < dayjs()}
              placeholder={t('savings.endDatePlaceholder', '选择截止日期')}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 主动攒钱输入弹窗 */}
      <Modal
        title={t('savings.manualDeposit', '主动攒钱')}
        open={manualDepositVisible}
        onCancel={() => {
          setManualDepositVisible(false);
          manualForm.resetFields();
        }}
        onOk={() => {
          manualForm.submit();
        }}
        okText={t('savings.confirmDeposit', '确认攒钱')}
        cancelText={t('common.cancel')}
      >
        <Form
          form={manualForm}
          layout="vertical"
          onFinish={(values) => {
            if (selectedManualPlan) {
              handleDeposit(selectedManualPlan, 'manual', values.amount);
              setManualDepositVisible(false);
              manualForm.resetFields();
            }
          }}
        >
          <Form.Item
            name="amount"
            label={t('savings.amount', '金额')}
            rules={[{ required: true, message: t('savings.amountRequired', '请输入金额') }]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={0.01}
              step={0.01}
              precision={2}
              addonAfter="元"
              placeholder={t('savings.amountPlaceholder', '输入攒钱金额')}
            />
          </Form.Item>
        </Form>
      </Modal>

      <BottomNav />
    </div>
  );
};

export default Savings;
