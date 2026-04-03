import { useTranslation } from 'react-i18next';
import BottomNav from '../../components/BottomNav';
import styles from './index.module.scss';

// CDN 基础地址
const CDN_BASE_URL = 'https://vercel-icons.vercel.app';

/**
 * 攒钱页面 - 星露谷风格预留页面
 */
const Savings = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.savingsPage}>
      {/* 背景装饰 */}
      <div className={styles.backgroundDecorations}>
        <div className={styles.cloud1}>☁️</div>
        <div className={styles.cloud2}>☁️</div>
        <div className={styles.sun}>☀️</div>
      </div>

      {/* 主内容区 */}
      <div className={styles.content}>
        {/* 标题区域 */}
        <div className={styles.header}>
          <h1 className={styles.title}>{t('savings.title', '攒钱计划')}</h1>
          <p className={styles.subtitle}>{t('savings.subtitle', '正在建设中...')}</p>
        </div>

        {/* 星露谷风格插图区域 */}
        <div className={styles.illustration}>
          <div className={styles.character}>
            <img
              src={`${CDN_BASE_URL}/hero.png`}
              alt="Character"
              className={styles.characterImg}
            />
          </div>
          <div className={styles.speechBubble}>
            <p>{t('savings.comingSoon', '攒钱功能即将上线！')}</p>
            <p className={styles.smallText}>{t('savings.stayTuned', '敬请期待~')}</p>
          </div>
        </div>

        {/* 功能预览卡片 */}
        <div className={styles.previewCards}>
          <div className={styles.previewCard}>
            <div className={styles.cardIcon}>🎯</div>
            <div className={styles.cardContent}>
              <h3>{t('savings.goal', '储蓄目标')}</h3>
              <p>{t('savings.goalDesc', '设定你的储蓄目标，追踪进度')}</p>
            </div>
          </div>

          <div className={styles.previewCard}>
            <div className={styles.cardIcon}>📊</div>
            <div className={styles.cardContent}>
              <h3>{t('savings.analysis', '储蓄分析')}</h3>
              <p>{t('savings.analysisDesc', '分析储蓄习惯，优化理财计划')}</p>
            </div>
          </div>

          <div className={styles.previewCard}>
            <div className={styles.cardIcon}>🏆</div>
            <div className={styles.cardContent}>
              <h3>{t('savings.achievement', '成就系统')}</h3>
              <p>{t('savings.achievementDesc', '完成储蓄挑战，解锁成就徽章')}</p>
            </div>
          </div>
        </div>

        {/* 底部提示 */}
        <div className={styles.footerHint}>
          <p>🌱 {t('savings.plantSeed', '种下一颗储蓄的种子，收获财富的果实')} 🌳</p>
        </div>
      </div>

      {/* 底部导航 */}
      <BottomNav />
    </div>
  );
};

export default Savings;
