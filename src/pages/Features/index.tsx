import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import { Collapse } from 'antd';
import { CDN_BASE_URL } from '../../constants/cdn';
import styles from './index.module.scss';

interface FeatureItem {
  key: string;
  icon: string;
  title: string;
  description: string;
  details: string[];
}

/**
 * 功能简介页面
 */
const Features = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const features: FeatureItem[] = [
    {
      key: 'record',
      icon: '📝',
      title: t('features.record.title', '快速记账'),
      description: t('features.record.description', '简单快捷的记账体验'),
      details: [
        t('features.record.detail1', '支持支出和收入两种类型'),
        t('features.record.detail2', '内置计算器，方便计算金额'),
        t('features.record.detail3', '丰富的分类选择，支持二级分类'),
        t('features.record.detail4', '支持添加备注和选择日期'),
      ],
    },
    {
      key: 'statistics',
      icon: '📊',
      title: t('features.statistics.title', '统计报表'),
      description: t('features.statistics.description', '直观的图表分析'),
      details: [
        t('features.statistics.detail1', '月度收支统计一目了然'),
        t('features.statistics.detail2', '饼图展示支出分类占比'),
        t('features.statistics.detail3', '趋势图展示收支变化'),
        t('features.statistics.detail4', '支持按日期筛选账单'),
      ],
    },
    {
      key: 'budget',
      icon: '💰',
      title: t('features.budget.title', '预算管理'),
      description: t('features.budget.description', '合理规划每月支出'),
      details: [
        t('features.budget.detail1', '设置每月支出预算'),
        t('features.budget.detail2', '实时查看预算使用进度'),
        t('features.budget.detail3', '预算超支提醒'),
        t('features.budget.detail4', '查看历史预算执行情况'),
      ],
    },
    {
      key: 'category',
      icon: '🏷️',
      title: t('features.category.title', '分类管理'),
      description: t('features.category.description', '自定义收支分类'),
      details: [
        t('features.category.detail1', '丰富的预设分类'),
        t('features.category.detail2', '支持自定义二级分类'),
        t('features.category.detail3', '每个分类配有专属图标'),
        t('features.category.detail4', '分类颜色区分'),
      ],
    },
    {
      key: 'data',
      icon: '💾',
      title: t('features.data.title', '数据管理'),
      description: t('features.data.description', '安全便捷的数据处理'),
      details: [
        t('features.data.detail1', '支持 CSV/Excel 格式导入导出'),
        t('features.data.detail2', '本地存储保障隐私'),
        t('features.data.detail3', '登录后数据云端同步'),
        t('features.data.detail4', '支持清空本地数据'),
      ],
    },
    {
      key: 'style',
      icon: '🎮',
      title: t('features.style.title', '星露谷风格'),
      description: t('features.style.description', '独特的像素风格设计'),
      details: [
        t('features.style.detail1', '复古像素字体'),
        t('features.style.detail2', '木质纹理界面'),
        t('features.style.detail3', '游戏元素装饰'),
        t('features.style.detail4', '流畅的动画效果'),
      ],
    },
  ];

  const collapseItems = features.map((feature) => ({
    key: feature.key,
    label: (
      <div className={styles.collapseHeader}>
        <span className={styles.featureIcon}>{feature.icon}</span>
        <div className={styles.featureTitleSection}>
          <span className={styles.featureTitle}>{feature.title}</span>
          <span className={styles.featureDesc}>{feature.description}</span>
        </div>
      </div>
    ),
    children: (
      <ul className={styles.featureDetails}>
        {feature.details.map((detail, index) => (
          <li key={index} className={styles.detailItem}>
            {detail}
          </li>
        ))}
      </ul>
    ),
  }));

  return (
    <div className={styles.featuresPage}>
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
        <h1 className={styles.title}>{t('features.title', '功能简介')}</h1>
        <div className={styles.placeholder}></div>
      </div>

      {/* 内容区域 */}
      <div className={styles.content}>
        {/* 装饰插图 */}
        <div className={styles.illustration}>
          <img
            src={`${CDN_BASE_URL}/hero.png`}
            alt="Hero"
            className={styles.heroImg}
          />
        </div>

        {/* 欢迎语 */}
        <div className={styles.welcomeCard}>
          <h2 className={styles.welcomeTitle}>
            {t('features.welcomeTitle', '欢迎来到星露谷记账本')}
          </h2>
          <p className={styles.welcomeText}>
            {t('features.welcomeText', '一款像素风格的多功能记账应用，让记账变得简单有趣')}
          </p>
        </div>

        {/* 功能列表 */}
        <div className={styles.featuresSection}>
          <h3 className={styles.sectionTitle}>
            {t('features.sectionTitle', '核心功能')}
          </h3>
          <Collapse
            items={collapseItems}
            bordered={false}
            className={styles.featureCollapse}
            defaultActiveKey={['record']}
          />
        </div>

        {/* 使用提示 */}
        <div className={styles.tipsCard}>
          <h3 className={styles.tipsTitle}>
            {t('features.tipsTitle', '💡 使用小贴士')}
          </h3>
          <ul className={styles.tipsList}>
            <li>{t('features.tip1', '左滑账单可快速删除')}</li>
            <li>{t('features.tip2', '点击眼睛图标可隐藏金额')}</li>
            <li>{t('features.tip3', '长按分类可查看更多选项')}</li>
            <li>{t('features.tip4', '支持安装为桌面应用（PWA）')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Features;
