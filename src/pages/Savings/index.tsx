import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Button, Card, DatePicker, Empty, Form, Input, InputNumber, Modal, Progress, Tag, message } from 'antd';
import { DeleteOutlined, FolderOpenOutlined, PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import PageHeader from '../../components/PageHeader';
import type { SavingsPlan } from '../../api/savings';
import {
  deleteLocalSavingsPlan,
  getActiveSavingsPlanId,
  getLocalSavingsPlans,
  saveLocalSavingsPlans,
  setActiveSavingsPlan,
} from '../../api/savings';
import styles from './index.module.scss';

const Savings = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [plans, setPlans] = useState<SavingsPlan[]>([]);
  const [activePlanId, setActivePlanId] = useState<string | null>(null);
  const [createModalVisible, setCreateModalVisible] = useState(false);
  const [form] = Form.useForm();

  const loadPlans = () => {
    setPlans(getLocalSavingsPlans());
    setActivePlanId(getActiveSavingsPlanId());
  };

  useEffect(() => {
    loadPlans();
  }, []);

  const handleCreatePlan = (values: { name: string; targetAmount: number; endDate: dayjs.Dayjs }) => {
    const startDate = dayjs().format('YYYY-MM-DD');
    const endDate = dayjs(values.endDate).format('YYYY-MM-DD');
    const daysDiff = Math.max(dayjs(endDate).diff(dayjs(startDate), 'day'), 1);

    const newPlan: SavingsPlan = {
      id: `plan_${Date.now()}`,
      name: values.name,
      targetAmount: values.targetAmount,
      savedAmount: 0,
      startDate,
      endDate,
      dailyAverage: Number((values.targetAmount / daysDiff).toFixed(2)),
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveLocalSavingsPlans([...plans, newPlan]);
    setActiveSavingsPlan(newPlan.id);
    setCreateModalVisible(false);
    form.resetFields();
    loadPlans();
    message.success('攒钱计划已创建，并已设为当前操作计划');
    navigate('/savings');
  };

  const handleOpenPlan = (planId: string) => {
    setActiveSavingsPlan(planId);
    setActivePlanId(planId);
    message.success('已打开这个攒钱计划');
    navigate('/savings');
  };

  const handleDeletePlan = (planId: string) => {
    Modal.confirm({
      title: '删除攒钱计划',
      content: '删除后，这个计划及其攒钱记录都会一并移除，确定继续吗？',
      okType: 'danger',
      onOk: () => {
        deleteLocalSavingsPlan(planId);
        loadPlans();
        message.success('计划已删除');
      },
    });
  };

  return (
    <div className={styles.pageContainer}>
      <PageHeader
        title="攒钱计划管理"
        backPath="/profile"
        rightContent={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            className={styles.headerButton}
            onClick={() => setCreateModalVisible(true)}
          >
            新建
          </Button>
        }
      />

      <div className={styles.contentSection}>
        {plans.length === 0 ? (
          <div className={styles.emptyPanel}>
            <Empty description={t('savings.noPlans', '暂时还没有攒钱计划')} />
            <Button type="primary" className={styles.primaryButton} onClick={() => setCreateModalVisible(true)}>
              创建第一个计划
            </Button>
          </div>
        ) : (
          <div className={styles.planList}>
            {plans.map((plan) => {
              const progress = plan.percentage ?? (plan.targetAmount > 0 ? Math.min(100, (plan.savedAmount / plan.targetAmount) * 100) : 0);
              return (
                <Card key={plan.id} className={styles.planCard}>
                  <div className={styles.planTop}>
                    <div>
                      <div className={styles.planName}>{plan.name}</div>
                      <div className={styles.planDate}>{plan.startDate} 至 {plan.endDate}</div>
                    </div>
                    <div className={styles.planTags}>
                      {activePlanId === plan.id && <Tag color="processing">当前操作中</Tag>}
                      <Tag color={progress >= 100 ? 'success' : 'default'}>
                        {progress >= 100 ? '已完成' : '进行中'}
                      </Tag>
                    </div>
                  </div>

                  <Progress percent={Number(progress.toFixed(1))} strokeColor={progress >= 100 ? '#52c41a' : '#4a90e2'} />

                  <div className={styles.planStats}>
                    <div className={styles.statItem}>
                      <span>已攒金额</span>
                      <strong>￥{plan.savedAmount.toFixed(2)}</strong>
                    </div>
                    <div className={styles.statItem}>
                      <span>目标金额</span>
                      <strong>￥{plan.targetAmount.toFixed(2)}</strong>
                    </div>
                    <div className={styles.statItem}>
                      <span>日均建议</span>
                      <strong>￥{plan.dailyAverage.toFixed(2)}</strong>
                    </div>
                  </div>

                  <div className={styles.planActions}>
                    <Button type={activePlanId === plan.id ? 'default' : 'primary'} className={styles.primaryButton} onClick={() => handleOpenPlan(plan.id)} icon={<FolderOpenOutlined />}>
                      {activePlanId === plan.id ? '前往操作页' : '打开这个计划'}
                    </Button>
                    <Button danger icon={<DeleteOutlined />} className={styles.deleteButton} onClick={() => handleDeletePlan(plan.id)}>
                      删除
                    </Button>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>

      <Modal
        title="创建攒钱计划"
        open={createModalVisible}
        onCancel={() => {
          setCreateModalVisible(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText="确定"
        cancelText="取消"
      >
        <Form form={form} layout="vertical" onFinish={handleCreatePlan}>
          <Form.Item name="name" label="计划名称" rules={[{ required: true, message: '请输入计划名称' }]}>
            <Input placeholder="例如：旅行基金、年底换手机" />
          </Form.Item>
          <Form.Item name="targetAmount" label="目标金额" rules={[{ required: true, message: '请输入目标金额' }]}>
            <InputNumber style={{ width: '100%' }} min={0.01} precision={2} step={0.01} placeholder="输入目标金额" />
          </Form.Item>
          <Form.Item name="endDate" label="截止日期" rules={[{ required: true, message: '请选择截止日期' }]}>
            <DatePicker style={{ width: '100%' }} disabledDate={(current) => Boolean(current && current.endOf('day').isBefore(dayjs().endOf('day')))} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Savings;