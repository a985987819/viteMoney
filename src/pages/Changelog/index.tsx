import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { Timeline, Tag } from 'antd';
import { CDN_BASE_URL } from '../../constants/cdn';
import styles from './index.module.scss';

interface ChangelogItem {
  version: string;
  date: string;
  type: 'feature' | 'fix' | 'optimize';
  changes: string[];
}

const changelogData: ChangelogItem[] = [
  {
    version: 'v1.2.0',
    date: '2025-04-02',
    type: 'feature',
    changes: [
      '新增预算管理功能，支持月度预算设置',
      '新增账单筛选功能，支持多维度筛选',
      '新增数据导入导出功能（CSV/Excel）',
      '优化加载页面，新增星露谷风格背景图',
    ],
  },
  {
    version: 'v1.1.0',
    date: '2025-03-15',
    type: 'feature',
    changes: [
      '新增统计报表页面，支持图表分析',
      '新增分类管理功能',
      '新增多语言支持（中文/英文）',
      '优化记账体验，支持二级分类',
    ],
  },
  {
    version: 'v1.0.0',
    date: '2025-03-01',
    type: 'feature',
    changes: [
      '星露谷记账本正式发布',
      '支持支出/收入记账',
      '支持账单查看和编辑',
      '支持本地存储和云端同步',
      'PWA支持，可安装为桌面应用',
    ],
  },
];

/**
 * 版本日志页面
 */
const Changelog = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const getTagColor = (type: string) => {
    switch (type) {
      case 'feature':
        return 'success';
      case 'fix':
        return 'error';
      case 'optimize':
        return 'processing';
      default:
        return 'default';
    }
  };

  const getTagText = (type: string) => {
    switch (type) {
      case 'feature':
        return t('changelog.tagFeature', '新功能');
      case 'fix':
        return t('changelog.tagFix', '修复');
      case 'optimize':
        return t('changelog.tagOptimize', '优化');
      default:
        return type;
    }
  };

  return (
    <div className={styles.changelogPage}>
      {/* 背景装饰 */}
      <div className={styles.backgroundDecorations}>
        <div className={styles.cloud1}>☁️</div>
        <div className={styles.cloud2}>☁️</div>
      </div>

      {/* 头部导航 */}
      <div className={styles.header}>
        <div className={styles.backButton} onClick={() => navigate(-1)}>
          <LeftOutlined />
        </div>
        <h1 className={styles.title}>{t('changelog.title', '版本日志')}</h1>
        <div className={styles.placeholder}></div>
      </div>

      {/* 内容区域 */}
      <div className={styles.content}>
        {/* 装饰插图 */}
        <div className={styles.illustration}>
          <img
            src={`${CDN_BASE_URL}/chicken.png`}
            alt="Chicken"
            className={styles.animalImg}
          />
        </div>

        {/* 版本时间线 */}
        <div className={styles.timelineSection}>
          <Timeline
            mode="left"
            items={changelogData.map((item) => ({
              label: (
                <div className={styles.timelineLabel}>
                  <div className={styles.version}>{item.version}</div>
                  <div className={styles.date}>{item.date}</div>
                </div>
              ),
              children: (
                <div className={styles.timelineContent}>
                  <Tag color={getTagColor(item.type)} className={styles.typeTag}>
                    {getTagText(item.type)}
                  </Tag>
                  <ul className={styles.changeList}>
                    {item.changes.map((change, index) => (
                      <li key={index} className={styles.changeItem}>
                        {change}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            }))}
          />
        </div>

        {/* 底部提示 */}
        <div className={styles.footerNote}>
          <p>{t('changelog.footerNote', '持续更新中，敬请期待更多功能...')}</p>
        </div>
      </div>
    </div>
  );
};

export default Changelog;
