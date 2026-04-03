import { useState, useMemo } from 'react';
import { Modal, Button } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import styles from './index.module.scss';

export type DateMode = 'month' | 'year';

interface DatePickerProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (date: dayjs.Dayjs, mode: DateMode) => void;
  defaultDate?: dayjs.Dayjs;
  defaultMode?: DateMode;
}

const DatePicker = ({
  visible,
  onCancel,
  onConfirm,
  defaultDate = dayjs(),
  defaultMode = 'month',
}: DatePickerProps) => {
  const [tempDate, setTempDate] = useState(defaultDate);
  const [tempMode, setTempMode] = useState<DateMode>(defaultMode);
  const [yearPage, setYearPage] = useState(0);
  // 初始化 monthPage 为 5，使默认显示当前年份（currentYear - 5 + 5 = currentYear）
  const [monthPage, setMonthPage] = useState(5);

  const yearsPerPage = 12;

  // 生成年份列表
  const yearList = useMemo(() => {
    const currentYear = dayjs().year();
    const startYear = currentYear - 50 + yearPage * yearsPerPage;
    const years = [];
    for (let i = 0; i < yearsPerPage; i++) {
      years.push(startYear + i);
    }
    return years;
  }, [yearPage]);

  // 生成月份列表
  const monthList = useMemo(() => {
    const currentYear = dayjs().year();
    const year = currentYear - 5 + monthPage;
    const months = [];
    for (let i = 1; i <= 12; i++) {
      months.push({ year, month: i });
    }
    return months;
  }, [monthPage]);

  // 处理确认
  const handleConfirm = () => {
    onConfirm(tempDate, tempMode);
  };

  // 切换模式时初始化页码
  const handleModeChange = (mode: DateMode) => {
    setTempMode(mode);
    if (mode === 'month') {
      setMonthPage(tempDate.year() - dayjs().year() + 5);
    } else {
      setYearPage(Math.floor((tempDate.year() - (dayjs().year() - 50)) / yearsPerPage));
    }
  };

  // 上一页
  const handlePrevPage = () => {
    if (tempMode === 'month') {
      setMonthPage((p) => p - 1);
    } else {
      setYearPage((p) => p - 1);
    }
  };

  // 下一页
  const handleNextPage = () => {
    if (tempMode === 'month') {
      setMonthPage((p) => p + 1);
    } else {
      setYearPage((p) => p + 1);
    }
  };

  // 回到今日
  const handleBackToToday = () => {
    const today = dayjs();
    setTempDate(today);
    if (tempMode === 'month') {
      setMonthPage(today.year() - dayjs().year() + 5);
    } else {
      setYearPage(Math.floor((today.year() - (dayjs().year() - 50)) / yearsPerPage));
    }
  };

  return (
    <Modal
      open={visible}
      onCancel={onCancel}
      footer={null}
      width="100%"
      className={styles.datePickerModal}
      closable={false}
    >
      <div className={styles.datePickerContent}>
        {/* 头部 */}
        <div className={styles.datePickerHeader}>
          <div className={styles.dateDisplaySection}>
            <div className={styles.selectedDateDisplay}>
              {tempMode === 'month'
                ? tempDate.format('YYYY年M月')
                : tempDate.format('YYYY年')}
            </div>
            <div className={styles.yearRangeDisplay}>
              {tempMode === 'month'
                ? `${monthList[0].year}年 - ${monthList[monthList.length - 1].year}年`
                : `${yearList[0]}年 - ${yearList[yearList.length - 1]}年`}
            </div>
          </div>
          {
            tempMode === 'year' &&
            <>
              {/* 翻页控制 */}
              <div className={styles.pickerPagination}>
                <div className={styles.pageBtn} onClick={handlePrevPage}>
                  <UpOutlined />
                </div>
                <div className={styles.pageBtn} onClick={handleNextPage}>
                  <DownOutlined />
                </div>
              </div>
            </>
          }
        </div>

        {/* Tab 切换 */}
        <div className={styles.datePickerTabs}>
          <div
            className={`${styles.tabItem} ${tempMode === 'month' ? styles.active : ''}`}
            onClick={() => handleModeChange('month')}
          >
            按月
          </div>
          <div
            className={`${styles.tabItem} ${tempMode === 'year' ? styles.active : ''}`}
            onClick={() => handleModeChange('year')}
          >
            按年
          </div>
        </div>

        {/* 选择区域 */}
        <div className={styles.pickerBody}>
          {tempMode === 'month' ? (
            <div className={styles.monthGrid}>
              {monthList.map(({ year, month }) => (
                <div
                  key={`${year}-${month}`}
                  className={`${styles.monthItem} ${tempDate.year() === year && tempDate.month() + 1 === month
                    ? styles.active
                    : ''
                    }`}
                  onClick={() => setTempDate(dayjs().year(year).month(month - 1))}
                >
                  {month}月
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.yearGrid}>
              {yearList.map((year) => (
                <div
                  key={year}
                  className={`${styles.yearItem} ${tempDate.year() === year ? styles.active : ''}`}
                  onClick={() => setTempDate(tempDate.year(year))}
                >
                  {year}年
                </div>
              ))}
            </div>
          )}
        </div>


        {/* 回到今日按钮 */}
        <div className={styles.backToTodaySection}>
          <span className={styles.backToTodayBtn} onClick={handleBackToToday}>
            回到今日
          </span>
        </div>

        {/* 底部按钮 */}
        <div className={styles.datePickerFooter}>
          <Button type="primary" className={styles.confirmBtn} onClick={handleConfirm}>
            确定
          </Button>
        </div>
      </div>
    </Modal >
  );
};

export default DatePicker;
