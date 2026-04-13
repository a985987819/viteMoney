import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CDN_BASE_URL } from '../../constants/cdn';
import styles from './index.module.scss';

const profileImg = `${CDN_BASE_URL}/profile.png`;
const reportImg = `${CDN_BASE_URL}/report.png`;
const stardewvalleyImg = `${CDN_BASE_URL}/stardewvalley.png`;
const savingsImg = `${CDN_BASE_URL}/icon.png`; // 使用icon作为攒钱图标

interface NavItem {
  key: string;
  labelKey: string;
  icon: string;
  path: string;
}

const BottomNav = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  // 判断是否在【我的】页面
  const isProfilePage = location.pathname === '/profile';

  const navItems: NavItem[] = [
    {
      key: 'home',
      labelKey: 'nav.home',
      icon: stardewvalleyImg,
      path: '/',
    },
    {
      key: 'statistics',
      labelKey: 'nav.statistics',
      icon: reportImg,
      path: '/statistics',
    },
    {
      key: 'savings',
      labelKey: 'nav.savings',
      icon: savingsImg,
      path: '/savings',
    },
    {
      key: 'profile',
      labelKey: 'nav.profile',
      icon: profileImg,
      path: '/profile',
    },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className={`${styles.bottomNav} ${isProfilePage ? styles.winterTheme : ''}`}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <div
            key={item.key}
            className={`${styles.navItem} ${isActive ? styles.active : ''}`}
            onClick={() => handleNavClick(item.path)}
          >
            <img
              src={item.icon}
              alt={t(item.labelKey)}
              className={styles.navIcon}
            />
            <span className={styles.navLabel}>{t(item.labelKey)}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BottomNav;
