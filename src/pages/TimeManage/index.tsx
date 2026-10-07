import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Calendar,
  DatePicker,
  Empty,
  Form,
  Input,
  Modal,
  TimePicker,
  message,
} from 'antd';
import {
  DeleteOutlined,
  LeftOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import dayjs, { type Dayjs } from 'dayjs';
import { DATE_FORMAT } from '../../utils/dateFormats';
import {
  addSchedule,
  deleteSchedule,
  getSchedules,
  updateSchedule,
  type ScheduleItem,
} from '../../utils/storage';
import styles from './index.module.scss';

const HOUR_HEIGHT = 56;
const TOTAL_HEIGHT = HOUR_HEIGHT * 24;
const MIN_BLOCK_HEIGHT = 32;
const TIME_FORMAT = 'HH:mm';
const HOURS = Array.from({ length: 24 }, (_, index) => index);

const COLOR_PRESETS = [
  { name: 'green', label: '森林绿', value: '#5aa17f' },
  { name: 'blue', label: '天空蓝', value: '#4a90e2' },
  { name: 'orange', label: '暖阳橙', value: '#e08a3c' },
  { name: 'red', label: '玫瑰红', value: '#d95e43' },
  { name: 'purple', label: '紫罗兰', value: '#8e6fd0' },
  { name: 'gold', label: '麦穗金', value: '#d4a72c' },
];

interface ScheduleFormValues {
  title: string;
  date: Dayjs;
  timeRange: [Dayjs, Dayjs];
  color: string;
  remark?: string;
}

const padHour = (hour: number) => String(hour).padStart(2, '0');

const timeToMinutes = (time: string): number => {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
};

const timeToDayjs = (time: string): Dayjs => {
  const [hour, minute] = time.split(':').map(Number);
  return dayjs().hour(hour).minute(minute).second(0).millisecond(0);
};

interface ColorSwatchesProps {
  value?: string;
  onChange?: (color: string) => void;
}

const ColorSwatches = ({ value, onChange }: ColorSwatchesProps) => (
  <div className={styles.colorRow} id="schedule-form-color">
    {COLOR_PRESETS.map((color) => (
      <button
        key={color.name}
        id={`schedule-color-${color.name}`}
        type="button"
        title={color.label}
        aria-label={color.label}
        className={`${styles.colorSwatch} ${value === color.value ? styles.colorSwatchActive : ''}`}
        style={{ background: color.value }}
        onClick={() => onChange?.(color.value)}
      />
    ))}
  </div>
);

const TimeManagePage = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState<ScheduleItem[]>(() => getSchedules());
  const [selectedDate, setSelectedDate] = useState<Dayjs>(() => dayjs());
  const [modalVisible, setModalVisible] = useState(false);
  const [editing, setEditing] = useState<ScheduleItem | null>(null);
  const [form] = Form.useForm<ScheduleFormValues>();
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const selectedDateKey = selectedDate.format(DATE_FORMAT.DATE_KEY);

  const scheduleDateKeys = useMemo(
    () => new Set(schedules.map((item) => item.date)),
    [schedules]
  );

  const daySchedules = useMemo(
    () => schedules
      .filter((item) => item.date === selectedDateKey)
      .sort((a, b) => timeToMinutes(a.startTime) - timeToMinutes(b.startTime)),
    [schedules, selectedDateKey]
  );

  const todayCount = useMemo(() => {
    const todayKey = dayjs().format(DATE_FORMAT.DATE_KEY);
    return schedules.filter((item) => item.date === todayKey).length;
  }, [schedules]);

  // 切换日期后，将时间轴滚动到当天首个日程附近
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) {
      return;
    }
    if (daySchedules.length === 0) {
      container.scrollTop = 0;
      return;
    }
    const firstHour = Math.floor(timeToMinutes(daySchedules[0].startTime) / 60);
    container.scrollTop = Math.max(0, (firstHour - 1) * HOUR_HEIGHT);
  }, [daySchedules]);

  const openCreate = () => {
    setEditing(null);
    form.setFieldsValue({
      title: '',
      date: selectedDate,
      timeRange: [dayjs().hour(9).minute(0).second(0), dayjs().hour(10).minute(0).second(0)],
      color: COLOR_PRESETS[0].value,
      remark: '',
    });
    setModalVisible(true);
  };

  const openEdit = (schedule: ScheduleItem) => {
    setEditing(schedule);
    form.setFieldsValue({
      title: schedule.title,
      date: dayjs(schedule.date),
      timeRange: [timeToDayjs(schedule.startTime), timeToDayjs(schedule.endTime)],
      color: schedule.color,
      remark: schedule.remark || '',
    });
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    let values: ScheduleFormValues;
    try {
      values = await form.validateFields();
    } catch {
      return;
    }

    const [start, end] = values.timeRange;
    if (timeToMinutes(end.format(TIME_FORMAT)) <= timeToMinutes(start.format(TIME_FORMAT))) {
      message.warning('结束时间需晚于开始时间');
      return;
    }

    const payload = {
      title: values.title.trim(),
      date: values.date.format(DATE_FORMAT.DATE_KEY),
      startTime: start.format(TIME_FORMAT),
      endTime: end.format(TIME_FORMAT),
      color: values.color,
      remark: values.remark?.trim() || '',
    };

    try {
      if (editing) {
        updateSchedule(editing.id, payload);
      } else {
        addSchedule(payload);
      }
      setSchedules(getSchedules());
      setSelectedDate(values.date.startOf('day'));
      setModalVisible(false);
      setEditing(null);
      message.success(editing ? '日程已更新' : '日程已添加');
    } catch (error) {
      console.error('保存日程失败:', error);
      message.error('保存失败，请重试');
    }
  };

  const handleDelete = (schedule: ScheduleItem) => {
    Modal.confirm({
      title: '删除日程',
      content: `确定要删除「${schedule.title}」吗？`,
      okType: 'danger',
      onOk: () => {
        deleteSchedule(schedule.id);
        setSchedules(getSchedules());
        setModalVisible(false);
        setEditing(null);
        message.success('已删除');
      },
    });
  };

  const handleCancel = () => {
    setModalVisible(false);
    setEditing(null);
  };

  const getBlockStyle = (schedule: ScheduleItem) => {
    const startMinutes = timeToMinutes(schedule.startTime);
    const endMinutes = timeToMinutes(schedule.endTime);
    const duration = Math.max(0, endMinutes - startMinutes);
    return {
      top: (startMinutes / 60) * HOUR_HEIGHT,
      height: Math.max(MIN_BLOCK_HEIGHT, (duration / 60) * HOUR_HEIGHT),
      background: `${schedule.color}22`,
      borderLeftColor: schedule.color,
      color: schedule.color,
    };
  };

  return (
    <div className={styles.pageContainer} id="time-manage-page">
      <div className={styles.headerSection}>
        <div className={styles.headerTop}>
          <button
            id="time-manage-back"
            type="button"
            className={styles.backBtn}
            onClick={() => navigate(-1)}
            aria-label="返回"
          >
            <LeftOutlined />
          </button>
          <div className={styles.headerTitle}>时间管理</div>
          <button
            id="time-manage-add"
            type="button"
            className={styles.addBtn}
            onClick={openCreate}
            aria-label="添加日程"
          >
            <PlusOutlined />
          </button>
        </div>

        <div className={styles.summaryGrid}>
          <div className={styles.summaryCard} id="time-manage-summary-today">
            <div className={styles.summaryLabel}>今日日程</div>
            <div className={styles.summaryValue}>{todayCount}</div>
          </div>
          <div className={styles.summaryCard} id="time-manage-summary-selected">
            <div className={styles.summaryLabel}>当天日程</div>
            <div className={styles.summaryValue}>{daySchedules.length}</div>
          </div>
          <div className={styles.summaryCard} id="time-manage-summary-total">
            <div className={styles.summaryLabel}>全部日程</div>
            <div className={styles.summaryValue}>{schedules.length}</div>
          </div>
        </div>
      </div>

      <div className={styles.contentSection}>
        <section className={styles.calendarCard} id="time-manage-calendar">
          <Calendar
            fullscreen={false}
            value={selectedDate}
            onSelect={(date, info) => {
              if (info?.source === 'date') {
                setSelectedDate(date.startOf('day'));
              }
            }}
            cellRender={(current, info) => {
              if (info.type !== 'date') {
                return null;
              }
              const dateKey = current.format(DATE_FORMAT.DATE_KEY);
              return scheduleDateKeys.has(dateKey)
                ? <span className={styles.calendarDot} />
                : null;
            }}
          />
        </section>

        <section className={styles.timelineCard} id="time-manage-timeline">
          <div className={styles.timelineHeader}>
            <div>
              <div className={styles.timelineDate}>
                {selectedDate.format('M月D日')}
                <span className={styles.timelineWeekday}>{selectedDate.format('dddd')}</span>
              </div>
              <div className={styles.timelineHint}>日内时间块规划</div>
            </div>
            <Button size="small" icon={<PlusOutlined />} onClick={openCreate}>
              添加日程
            </Button>
          </div>

          {daySchedules.length === 0 ? (
            <div className={styles.emptyWrap} id="time-manage-empty">
              <Empty description="当天暂无日程，点击右上角添加" />
            </div>
          ) : (
            <div className={styles.timelineScroll} ref={scrollRef}>
              <div className={styles.timelineBody} style={{ height: TOTAL_HEIGHT }}>
                <div className={styles.timeAxis}>
                  {HOURS.map((hour) => (
                    <div
                      key={hour}
                      className={styles.timeAxisItem}
                      style={{ top: hour * HOUR_HEIGHT }}
                    >
                      <span className={styles.timeAxisLabel}>{`${padHour(hour)}:00`}</span>
                    </div>
                  ))}
                </div>

                <div className={styles.timeTrack}>
                  {HOURS.map((hour) => (
                    <div
                      key={hour}
                      className={styles.hourLine}
                      style={{ top: hour * HOUR_HEIGHT }}
                    />
                  ))}

                  {daySchedules.map((schedule) => (
                    <button
                      key={schedule.id}
                      id={`time-manage-block-${schedule.id}`}
                      type="button"
                      className={styles.scheduleBlock}
                      style={getBlockStyle(schedule)}
                      onClick={() => openEdit(schedule)}
                    >
                      <span className={styles.blockTitle}>{schedule.title}</span>
                      <span className={styles.blockTime}>
                        {schedule.startTime} - {schedule.endTime}
                      </span>
                      {schedule.remark ? (
                        <span className={styles.blockRemark}>{schedule.remark}</span>
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      <Modal
        title={editing ? '编辑日程' : '添加日程'}
        open={modalVisible}
        onCancel={handleCancel}
        forceRender
        footer={null}
        destroyOnClose={false}
      >
        <Form form={form} layout="vertical" className={styles.scheduleForm}>
          <Form.Item
            name="title"
            label="日程标题"
            rules={[{ required: true, message: '请输入日程标题' }]}
          >
            <Input id="schedule-form-title" placeholder="例如：晨跑、产品评审会" size="large" maxLength={30} />
          </Form.Item>

          <Form.Item
            name="date"
            label="日程日期"
            rules={[{ required: true, message: '请选择日程日期' }]}
          >
            <DatePicker
              id="schedule-form-date"
              size="large"
              style={{ width: '100%' }}
              format="YYYY-MM-DD"
            />
          </Form.Item>

          <Form.Item
            name="timeRange"
            label="时间范围"
            rules={[{ required: true, message: '请选择起止时间' }]}
          >
            <TimePicker.RangePicker
              id="schedule-form-time"
              size="large"
              style={{ width: '100%' }}
              format="HH:mm"
              minuteStep={5}
              order
              allowClear={false}
            />
          </Form.Item>

          <Form.Item name="color" label="色块颜色">
            <ColorSwatches />
          </Form.Item>

          <Form.Item name="remark" label="备注">
            <Input.TextArea
              id="schedule-form-remark"
              placeholder="可选，记录日程的补充说明"
              rows={2}
              maxLength={80}
            />
          </Form.Item>

          <div className={styles.formActions}>
            {editing ? (
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(editing)}
              >
                删除
              </Button>
            ) : null}
            <div className={styles.formActionsRight}>
              <Button onClick={handleCancel}>取消</Button>
              <Button type="primary" onClick={handleSubmit}>
                保存
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default TimeManagePage;