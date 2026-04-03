import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LeftOutlined, GithubOutlined, MailOutlined, HeartOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import styles from './index.module.scss';

// CDN 基础地址
const CDN_BASE_URL = 'https://vercel-icons.vercel.app';

/**
 * 关于我页面
 */
const About = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const techStack = [
    { name: 'React 19', color: '#61dafb' },
    { name: 'TypeScript', color: '#3178c6' },
    { name: 'Vite 8', color: '#646cff' },
    { name: 'Ant Design', color: '#1677ff' },
    { name: 'ECharts', color: '#ea5e31' },
    { name: 'i18next', color: '#1aa3b8' },
  ];

  const features = [
    { icon: '🎮', title: t('about.feature1Title', '像素风格'), desc: t('about.feature1Desc', '星露谷主题设计') },
    { icon: '⚡', title: t('about.feature2Title', '快速记账'), desc: t('about.feature2Desc', '3秒完成记录') },
    { icon: '📊', title: t('about.feature3Title', '数据分析'), desc: t('about.feature3Desc', '图表直观展示') },
    { icon: '🔒', title: t('about.feature4Title', '隐私保护'), desc: t('about.feature4Desc', '本地存储安全') },
  ];

  return (
    <div className={styles.aboutPage}>
      {/* 背景装饰 */}
      <div className={styles.backgroundDecorations}>
        <div className={styles.cloud1}>☁️</div>
        <div className={styles.cloud2}>☁️</div>
        <div className={styles.star1}>✨</div>
        <div className={styles.star2}>✨</div>
      </div>

      {/* 头部导航 */}
      <div className={styles.header}>
        <div className={styles.backButton} onClick={() => navigate(-1)}>
          <LeftOutlined />
        </div>
        <h1 className={styles.title}>{t('about.title', '关于我')}</h1>
        <div className={styles.placeholder}></div>
      </div>

      {/* 内容区域 */}
      <div className={styles.content}>
        {/* Logo 区域 */}
        <div className={styles.logoSection}>
          <div className={styles.logoContainer}>
            <img
              src={`${CDN_BASE_URL}/hero.png`}
              alt="Logo"
              className={styles.logo}
            />
          </div>
          <h2 className={styles.appName}>{t('about.appName', '星露谷记账本')}</h2>
          <p className={styles.version}>Version 1.2.0</p>
          <Tag color="success" className={styles.versionTag}>
            {t('about.stable', '稳定版')}
          </Tag>
        </div>

        {/* 简介卡片 */}
        <div className={styles.introCard}>
          <p className={styles.introText}>
            {t('about.intro', '一款以《星露谷物语》为设计灵感的记账应用，将游戏化的像素风格与实用的记账功能相结合，让记账变得简单有趣。')}
          </p>
        </div>

        {/* 特色功能 */}
        <div className={styles.featuresSection}>
          <h3 className={styles.sectionTitle}>{t('about.highlights', '产品特色')}</h3>
          <div className={styles.featureGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureItem}>
                <span className={styles.featureIcon}>{feature.icon}</span>
                <span className={styles.featureTitle}>{feature.title}</span>
                <span className={styles.featureDesc}>{feature.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 技术栈 */}
        <div className={styles.techSection}>
          <h3 className={styles.sectionTitle}>{t('about.techStack', '技术栈')}</h3>
          <div className={styles.techTags}>
            {techStack.map((tech, index) => (
              <Tag
                key={index}
                className={styles.techTag}
                style={{ borderColor: tech.color, color: tech.color }}
              >
                {tech.name}
              </Tag>
            ))}
          </div>
        </div>

        {/* 联系方式 */}
        <div className={styles.contactSection}>
          <h3 className={styles.sectionTitle}>{t('about.contact', '联系我们')}</h3>
          <div className={styles.contactButtons}>
            <Button
              type="default"
              icon={<GithubOutlined />}
              className={styles.contactBtn}
              onClick={() => window.open('https://github.com', '_blank')}
            >
              GitHub
            </Button>
            <Button
              type="default"
              icon={<MailOutlined />}
              className={styles.contactBtn}
              onClick={() => window.location.href = 'mailto:feedback@example.com'}
            >
              {t('about.email', '邮件反馈')}
            </Button>
          </div>
        </div>

        {/* 致谢 */}
        <div className={styles.thanksSection}>
          <div className={styles.thanksCard}>
            <HeartOutlined className={styles.heartIcon} />
            <p className={styles.thanksText}>
              {t('about.thanks', '感谢使用星露谷记账本！如果您有任何建议或反馈，欢迎随时联系我们。')}
            </p>
          </div>
        </div>

        {/* 版权信息 */}
        <div className={styles.footer}>
          <p className={styles.copyright}>
            © 2025 {t('about.appName', '星露谷记账本')}. All rights reserved.
          </p>
          <p className={styles.license}>
            {t('about.license', '开源协议：MIT License')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
