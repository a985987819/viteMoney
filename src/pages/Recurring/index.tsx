import { useState, useEffect } from 'react';
import { Tabs, Button, Form, Input, Select, DatePicker, InputNumber, Radio, message, List, Tag, Empty, Spin, Popconfirm } from 'antd';
import { PlusOutlined, ClockCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import BottomNav from '../../components/BottomNav';
import StardewPanel from '../../components/StardewPanel';
import PageHeader from '../../components/PageHeader';
import { createRecurringRecord, getRecurringRecords, deleteRecurringRecord, type RecurringRecord, type FrequencyType } from '../../api/recurring';
import { useCategories } from '../../hooks/useCategories';
import styles from './index.module.scss';

const { Option } = Select;
const { TabPane } = Tabs;

// 账户选项
const accountOptions = ['现金', '银行卡', '支付宝', '微信支付', '信用卡'];

// 频率映射
const frequencyMap: Record<FrequencyType, string> = {
  'daily': '每天',
  'workday': '每个工作日',
  'weekly': '每周',
  'monthly': '每月',
  'yearly': '每年',
};

const Recurring = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [records, setRecords] = useState<RecurringRecord[]>([]);
  const { allCategoryOptions, subCategoryMap, getIcon } = useCategories();

  // 加载定时记账列表
  const loadRecords = async () => {
    setLoading(true);
    try {
      const data = await getRecurringRecords();
      setRecords(data);
    } catch (error) {
      message.error('加载定时记账失败');
      console.error('Load recurring error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRecords();
  }, []);

  // 提交表单
  const handleSubmit = async (values: {
    type: 'expense' | 'income';
    category: string;
    subCategory?: string;
    amount: number;
    remark?: string;
    account: string;
    frequency: FrequencyType;
    startDate: dayjs.Dayjs;
    durationValue?: number;
    durationUnit?: 'month' | 'year';
  }) => {
    setSubmitting(true);
    try {
      const categoryIcon = getIcon(values.category);
      const params = {
        type: values.type,
        category: values.category,
        subCategory: values.subCategory,
        categoryIcon,
        amount: values.amount,
        remark: values.remark || '',
        account: values.account,
        frequency: values.frequency,
        startDate: values.startDate.format('YYYY-MM-DD'),
        durationValue: values.durationValue || 1,
        durationUnit: values.durationUnit || 'year',
      };

      await createRecurringRecord(params);
      message.success('定时记账创建成功');
      form.resetFields();
      setActiveTab('list');
      loadRecords();
    } catch (error) {
      message.error('创建失败，请重试');
      console.error('Create recurring error:', error);
    } finally {
      setSubmitting(false);
    }
  };

  // 删除定时记账
  const handleDelete = async (id: string) => {
    try {
      await deleteRecurringRecord(id);
      message.success('删除成功');
      loadRecords();
    } catch (error) {
      message.error('删除失败');
      console.error('Delete recurring error:', error);
    }
  };

  return (
    <div className="page-container">
      {/* 顶部导航 */}
      <PageHeader title="定时记账" />

      {/* Tab 切换 */}
      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        className={styles.tabs}
        centered
      >
        <TabPane
          tab={
            <span className={styles.tabLabel}>
              <ClockCircleOutlined />
              已有规划
            </span>
          }
          key="list"
        >
          <div className={styles.tabContent}>
            <Spin spinning={loading}>
              {records.length === 0 ? (
                <Empty
                  description="暂无定时记账规划"
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  className={styles.empty}
                />
              ) : (
                <List
                  dataSource={records}
                  renderItem={(record) => (
                    <StardewPanel className={styles.recordItem} key={record.id}>
                      <div className={styles.recordHeader}>
                        <div className={styles.recordMain}>
                          <span className={styles.icon}>{record.categoryIcon}</span>
                          <span className={styles.category}>{record.category}</span>
                          {record.subCategory && (
                            <span className={styles.subCategory}>{record.subCategory}</span>
                          )}
                        </div>
                        <Tag color={record.type === 'income' ? 'success' : 'error'}>
                          {record.type === 'income' ? '收入' : '支出'}
                        </Tag>
                      </div>
                      <div className={styles.recordBody}>
                        <div className={styles.amount}>
                          <span className={record.type === 'income' ? styles.income : styles.expense}>
                            {record.type === 'income' ? '+' : '-'}¥{record.amount.toFixed(2)}
                          </span>
                        </div>
                        <div className={styles.info}>
                          <span className={styles.frequency}>
                            {frequencyMap[record.frequency]}
                          </span>
                          <span className={styles.account}>{record.account}</span>
                        </div>
                        <div className={styles.date}>
                          开始日期：{record.startDate}
                          {record.endDate && ` 至 ${record.endDate}`}
                        </div>
                        {record.remark && (
                          <div className={styles.remark}>备注：{record.remark}</div>
                        )}
                      </div>
                      <div className={styles.recordActions}>
                        <Popconfirm
                          title="确认删除"
                          description="确定要删除这个定时记账规划吗？"
                          onConfirm={() => handleDelete(record.id)}
                          okText="确定"
                          cancelText="取消"
                        >
                          <Button
                            type="text"
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                          >
                            删除
                          </Button>
                        </Popconfirm>
                      </div>
                    </StardewPanel>
                  )}
                />
              )}
            </Spin>
          </div>
        </TabPane>

        <TabPane
          tab={
            <span className={styles.tabLabel}>
              <PlusOutlined />
              新增规划
            </span>
          }
          key="add"
        >
          <div className={styles.tabContent}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                type: 'expense',
                frequency: 'monthly',
                durationValue: 1,
                durationUnit: 'year',
                account: '现金',
              }}
              className={styles.form}
            >
              {/* 类型选择 */}
              <Form.Item
                name="type"
                label="记账类型"
                rules={[{ required: true, message: '请选择记账类型' }]}
              >
                <Radio.Group block>
                  <Radio.Button value="expense">支出</Radio.Button>
                  <Radio.Button value="income">收入</Radio.Button>
                </Radio.Group>
              </Form.Item>

              {/* 分类选择 */}
              <Form.Item
                name="category"
                label="分类"
                rules={[{ required: true, message: '请选择分类' }]}
              >
                <Select
                  placeholder="选择分类"
                  onChange={() => form.setFieldValue('subCategory', undefined)}
                >
                  {allCategoryOptions.map(cat => (
                    <Option key={cat.value} value={cat.value}>
                      {cat.icon} {cat.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* 子分类选择 */}
              <Form.Item noStyle shouldUpdate>
                {({ getFieldValue }) => {
                  const category = getFieldValue('category') as string | undefined;
                  const subCategories = category ? subCategoryMap[category] || [] : [];
                  return (
                    <Form.Item name="subCategory" label="子分类">
                      <Select placeholder={category ? '选择子分类' : '请先选择分类'} disabled={!category}>
                        {subCategories.map(sub => (
                          <Option key={sub} value={sub}>{sub}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  );
                }}
              </Form.Item>

              {/* 金额 */}
              <Form.Item
                name="amount"
                label="金额"
                rules={[{ required: true, message: '请输入金额' }, { type: 'number', min: 0.01, message: '金额必须大于0' }]}
              >
                <InputNumber
                  prefix="¥"
                  placeholder="请输入金额"
                  min={0.01}
                  step={0.01}
                  precision={2}
                  style={{ width: '100%' }}
                />
              </Form.Item>

              {/* 账户 */}
              <Form.Item
                name="account"
                label="账户"
                rules={[{ required: true, message: '请选择账户' }]}
              >
                <Select placeholder="选择账户">
                  {accountOptions.map(acc => (
                    <Option key={acc} value={acc}>{acc}</Option>
                  ))}
                </Select>
              </Form.Item>

              {/* 频率 */}
              <Form.Item
                name="frequency"
                label="记账频率"
                rules={[{ required: true, message: '请选择记账频率' }]}
              >
                <Select placeholder="选择记账频率">
                  <Option value="daily">每天</Option>
                  <Option value="workday">每个工作日</Option>
                  <Option value="weekly">每周</Option>
                  <Option value="monthly">每月</Option>
                </Select>
              </Form.Item>

              {/* 开始日期 */}
              <Form.Item
                name="startDate"
                label="开始日期"
                rules={[{ required: true, message: '请选择开始日期' }]}
              >
                <DatePicker style={{ width: '100%' }} format="YYYY-MM-DD" />
              </Form.Item>

              {/* 重复周期 */}
              <Form.Item label="重复周期">
                <Input.Group compact>
                  <Form.Item
                    name="durationValue"
                    noStyle
                    rules={[{ required: true, message: '请输入周期数值' }]}
                  >
                    <InputNumber min={1} max={99} style={{ width: '60%' }} placeholder="数值" />
                  </Form.Item>
                  <Form.Item
                    name="durationUnit"
                    noStyle
                    rules={[{ required: true, message: '请选择单位' }]}
                  >
                    <Select style={{ width: '40%' }}>
                      <Option value="month">月</Option>
                      <Option value="year">年</Option>
                    </Select>
                  </Form.Item>
                </Input.Group>
              </Form.Item>

              {/* 备注 */}
              <Form.Item name="remark" label="备注">
                <Input.TextArea placeholder="请输入备注（可选）" rows={2} maxLength={200} showCount />
              </Form.Item>

              {/* 提交按钮 */}
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={submitting}
                  block
                  size="large"
                  className={styles.submitBtn}
                >
                  创建定时记账
                </Button>
              </Form.Item>
            </Form>
          </div>
        </TabPane>
      </Tabs>

      <BottomNav />
    </div>
  );
};

export default Recurring;
