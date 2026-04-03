import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tabs } from 'antd';
import BottomNav from '../../components/BottomNav';
import BillContent from './BillContent';
import ReportContent from './ReportContent';
import styles from './index.module.scss';

/**
 * 统计页面 - 包含账单和报表两个Tab
 */
const Statistics = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('bill');

  const items = [
    {
      key: 'bill',
      label: t('statistics.bill', '账单'),
    },
    {
      key: 'report',
      label: t('statistics.report', '报表'),
    },
  ];

  return (
    <div className={styles.statisticsPage}>
      {/* 顶部Tab切换 */}
      <div className={styles.tabHeader}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={items}
          centered
          className={styles.stardewTabs}
        />
      </div>

      {/* 内容区域 */}
      <div className={styles.content}>
        {activeTab === 'bill' ? <BillContent /> : <ReportContent />}
      </div>

      {/* 底部导航 */}
      <BottomNav />
    </div>
  );
};

export default Statistics;
