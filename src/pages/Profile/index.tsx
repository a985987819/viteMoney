import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Avatar,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
  Upload,
  Switch,
  Spin,
  Radio,
} from 'antd';
import dayjs from 'dayjs';
import BottomNav from '../../components/BottomNav';
import { useNavigate } from 'react-router-dom';
import {
  UserOutlined,
  ImportOutlined,
  ExportOutlined,
  DeleteOutlined,
  LoginOutlined,
  LogoutOutlined,
  CloudSyncOutlined,
  DatabaseOutlined,
  FileExcelOutlined,
  FileTextOutlined,
  CopyOutlined,
  GlobalOutlined,
  SettingOutlined,
  WalletOutlined,
  HistoryOutlined,
  InfoCircleOutlined,
  SmileOutlined,
  RightOutlined,
  SunOutlined,
  MoonOutlined,
  DesktopOutlined,
  ClockCircleOutlined,
  ThunderboltOutlined,
  DownloadOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { useAuth } from '../../hooks/useAuth';
import { usePWA } from '../../hooks/usePWA';
import { exportToCSV, exportToXLSX, importFromCSV, importFromXLSX, parseDate, compareDate, generateImportReport } from '../../utils/importExport';
import { getLocalRecords, saveLocalRecords, clearAllData } from '../../utils/storage';
import { importRecords, deleteImportedRecords, removeDuplicates, type RecordItem } from '../../api/record';

import { setStoredLanguage } from '../../i18n';
import { themeManager, type ThemeType } from '../../utils/theme';
import styles from './index.module.scss';

const Profile = () => {
  const { t, i18n } = useTranslation();
  const { user, isLoggedIn, login, logout, register } = useAuth();
  const { isInstallable, isInstalled, triggerInstall } = usePWA();
  const navigate = useNavigate();
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [dataManageModalVisible, setDataManageModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [isImportLoading, setIsImportLoading] = useState(false);
  const [syncEnabled, setSyncEnabled] = useState(false);

  const [loginForm] = Form.useForm();
  const [registerForm] = Form.useForm();
  const [theme, setTheme] = useState<ThemeType>(themeManager.getTheme());

  const handleInstallApp = async () => {
    await triggerInstall();
  };

  // 监听主题变化
  useEffect(() => {
    const unsubscribe = themeManager.subscribe((newTheme) => {
      setTheme(newTheme);
    });
    return unsubscribe;
  }, []);

  // 打开快捷记账管理页面
  const handleOpenQuickRecord = () => {
    navigate('/quick-record-manage');
  };

  // 切换主题
  const handleThemeChange = (newTheme: ThemeType) => {
    themeManager.setTheme(newTheme);
    setTheme(newTheme);
    message.success(t('common.success'));
  };

  // 打开定时记账页面
  const handleOpenRecurring = () => {
    navigate('/recurring');
  };

  // 打开攒钱计划管理页面
  const handleOpenSavings = () => {
    navigate('/savings-manage');
  };

  // 打开我的冰箱页面
  const handleOpenMyFridge = () => {
    navigate('/my-fridge');
  };

  // 切换语言
  const handleLanguageChange = (checked: boolean) => {
    const newLang = checked ? 'en-US' : 'zh-CN';
    i18n.changeLanguage(newLang);
    setStoredLanguage(newLang);

    // 更新 dayjs 语言
    if (newLang.startsWith('en')) {
      dayjs.locale('en');
    } else {
      dayjs.locale('zh-cn');
    }

    message.success(t('common.success'));
  };

  // 处理登录
  const handleLogin = async (values: { username: string; password: string }) => {
    setIsLoginLoading(true);
    try {
      await login(values.username, values.password);
      message.success(t('profile.login') + t('common.success'));
      setLoginModalVisible(false);
      loginForm.resetFields();
    } catch (error) {
      message.error(t('profile.login') + t('common.failed'));
    } finally {
      setIsLoginLoading(false);
    }
  };

  // 处理注册
  const handleRegister = async (values: { username: string; password: string; confirmPassword: string }) => {
    if (values.password !== values.confirmPassword) {
      message.error('两次密码输入不一致');
      return;
    }
    setIsRegisterLoading(true);
    try {
      await register(values.username, values.password);
      message.success(t('profile.register') + t('common.success'));
      setRegisterModalVisible(false);
      registerForm.resetFields();
    } catch (error) {
      message.error(t('profile.register') + t('common.failed'));
    } finally {
      setIsRegisterLoading(false);
    }
  };

  // 处理退出
  const handleLogout = () => {
    Modal.confirm({
      title: t('common.confirm'),
      content: '退出后数据将保存在本地，确定要退出吗？',
      onOk: () => {
        logout();
        message.success(t('profile.logout') + t('common.success'));
      },
    });
  };

  // 导出数据
  const handleExport = (type: 'csv' | 'xlsx') => {
    const records = getLocalRecords();
    if (records.length === 0) {
      message.warning('暂无数据可导出');
      return;
    }

    if (type === 'csv') {
      exportToCSV(records);
    } else {
      exportToXLSX(records);
    }
    message.success(t('profile.exportSuccess'));
  };

  // 批量上传记录（分批处理，每批1000条）
  const batchUploadRecords = async (records: Omit<RecordItem, 'id'>[]): Promise<{ success: number; failed: number }> => {
    const BATCH_SIZE = 1000;
    let totalSuccess = 0;
    let totalFailed = 0;

    for (let i = 0; i < records.length; i += BATCH_SIZE) {
      const batch = records.slice(i, i + BATCH_SIZE);
      const result = await importRecords(batch);
      totalSuccess += result.success;
      totalFailed += result.failed;
    }

    return { success: totalSuccess, failed: totalFailed };
  };

  // 导入数据
  const handleImport = async (file: File, type: 'csv' | 'xlsx') => {
    setIsImportLoading(true);
    try {
      // 导入并转换数据
      const importResult = type === 'csv'
        ? await importFromCSV(file)
        : await importFromXLSX(file);

      const { records, stats } = importResult;

      if (records.length === 0) {
        message.warning('未找到有效数据');
        return;
      }

      // 确保记录有完整的字段
      const validRecords = records.map(r => ({
        type: r.type || 'expense',
        category: r.category || '其他',
        subCategory: r.subCategory,
        categoryIcon: r.categoryIcon || '📦',
        subCategoryIcon: r.subCategoryIcon,
        amount: r.amount || 0,
        remark: r.remark || '',
        date: parseDate(r.date),
        account: r.account || '现金',
      })) as Omit<RecordItem, 'id'>[];

      console.log(`导入数据转换完成:`, validRecords, validRecords.map(r => dayjs(r.date).format('YYYY-MM-DD HH:mm:ss')));

      // 显示导入报告
      const report = generateImportReport(stats);
      console.log(report);

      if (isLoggedIn) {
        const result = await batchUploadRecords(validRecords);
        const successMsg = `成功导入 ${result.success} 条记录${result.failed > 0 ? `，失败 ${result.failed} 条` : ''}`;
        const detailMsg = `匹配: ${stats.matched}条, 未匹配: ${stats.unmatched}条`;
        message.success(`${successMsg}\n${detailMsg}`);
      } else {
        const existingRecords = getLocalRecords();
        const newRecords = [...validRecords, ...existingRecords] as RecordItem[];
        saveLocalRecords(newRecords);
        const successMsg = `成功导入 ${validRecords.length} 条记录`;
        const detailMsg = `匹配: ${stats.matched}条, 未匹配: ${stats.unmatched}条`;
        message.success(`${successMsg}\n${detailMsg}`);
      }

      // 如果有未匹配的分类，显示警告
      if (stats.unmatchedCategories.length > 0) {
        message.warning(`有 ${stats.unmatchedCategories.length} 个分类未匹配，已归入"其他"分类，请查看备注`);
      }

      setDataManageModalVisible(false);
    } catch (error) {
      message.error(t('profile.importFailed'));
      console.error('Import error:', error);
    } finally {
      setIsImportLoading(false);
    }
  };

  // 删除导入的记录
  const handleDeleteImported = () => {
    Modal.confirm({
      title: t('common.confirm'),
      content: '此操作将删除所有通过导入功能添加的记录，确定要继续吗？',
      okType: 'danger',
      onOk: async () => {
        try {
          if (isLoggedIn) {
            const result = await deleteImportedRecords();
            message.success(`已删除 ${result.deleted} 条导入记录`);
          } else {
            message.warning('请先登录后再操作');
          }
        } catch (error) {
          message.error(t('common.failed'));
          console.error('Delete imported error:', error);
        }
      },
    });
  };

  // 清空数据
  const handleClearData = () => {
    Modal.confirm({
      title: t('common.confirm'),
      content: '此操作将清空所有本地数据，不可恢复，确定要继续吗？',
      okType: 'danger',
      onOk: () => {
        clearAllData();
        message.success(t('common.success'));
      },
    });
  };

  // 数据去重
  const handleRemoveDuplicates = () => {
    Modal.confirm({
      title: t('common.confirm'),
      content: '此操作将删除日期、金额、分类、类型完全相同的重复记录，保留最新的一条。确定要继续吗？',
      okType: 'danger',
      onOk: async () => {
        try {
          if (isLoggedIn) {
            const result = await removeDuplicates();
            message.success(`已删除 ${result.removed} 条重复记录`);
          } else {
            const records = getLocalRecords();
            const seen = new Map<string, RecordItem>();
            const duplicates: RecordItem[] = [];

            records.forEach(record => {
              const dateKey = dayjs(record.date).format('YYYY-MM-DD');
              const key = `${dateKey}_${record.amount}_${record.category}_${record.type}`;

              if (seen.has(key)) {
                const existing = seen.get(key)!;
                if (compareDate(record.date, existing.date) > 0) {
                  duplicates.push(existing);
                  seen.set(key, record);
                } else {
                  duplicates.push(record);
                }
              } else {
                seen.set(key, record);
              }
            });

            const uniqueRecords = Array.from(seen.values());
            saveLocalRecords(uniqueRecords);
            message.success(`已删除 ${duplicates.length} 条重复记录`);
          }
        } catch (error) {
          message.error(t('profile.removeFailed'));
          console.error('Remove duplicates error:', error);
        }
      },
    });
  };

  // 一级菜单
  const mainMenuItems = [
    {
      title: t('profile.budget', '预算管理'),
      icon: <WalletOutlined />,
      onClick: () => navigate('/budget'),
    },
    {
      title: '快捷记账',
      icon: <ThunderboltOutlined />,
      onClick: handleOpenQuickRecord,
    },
    // 定时记账需要登录才能使用
    ...(isLoggedIn ? [{
      title: '定时记账',
      icon: <ClockCircleOutlined />,
      onClick: handleOpenRecurring,
    }] : []),
    {
      title: '攒钱计划',
      icon: <WalletOutlined />,
      onClick: handleOpenSavings,
    },
    {
      title: '我的冰箱',
      icon: <InboxOutlined />,
      onClick: handleOpenMyFridge,
    },
    {
      title: t('profile.dataManagement'),
      icon: <DatabaseOutlined />,
      onClick: () => setDataManageModalVisible(true),
    },
    {
      title: t('profile.settings'),
      icon: <SettingOutlined />,
      onClick: () => setSettingsModalVisible(true),
    },
    // PWA安装按钮（仅在可安装且未安装时显示）
    ...(!isInstalled && isInstallable ? [{
      title: t('pwa.install', '安装应用'),
      icon: <DownloadOutlined />,
      onClick: handleInstallApp,
      className: styles.installMenuItem,
    }] : []),
  ];

  return (
    <div className={styles.pageContainer}>
      {/* 顶部背景 */}
      <div className={styles.profileHeader}>
        <div className={styles.headerTitle}>{t('profile.title')}</div>
      </div>

      {/* 用户信息卡片 */}
      <div className={styles.userCard}>
        <div className={styles.userInfo}>
          <Avatar
            size={64}
            icon={<UserOutlined />}
            className={styles.userAvatar}
          />
          <div className={styles.userDetails}>
            <div className={styles.userName}>
              {isLoggedIn ? user?.username : t('profile.notLoggedIn')}
            </div>
            <div className={styles.userStatus}>
              {isLoggedIn ? (
                <span className={styles.statusOnline}>
                  <CloudSyncOutlined /> 数据已同步
                </span>
              ) : (
                <span className={styles.statusOffline}>数据仅保存在本地</span>
              )}
            </div>
          </div>
        </div>

        {isLoggedIn ? (
          <Button
            type="primary"
            danger
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            className={styles.authBtn}
          >
            {t('profile.logout')}
          </Button>
        ) : (
          <div className={styles.authButtons}>
            <Button
              icon={<LoginOutlined />}
              onClick={() => setLoginModalVisible(true)}
              className={styles.authBtn}
            >
              {t('profile.login')}
            </Button>
            <Button
              onClick={() => setRegisterModalVisible(true)}
              className={styles.authBtn}
            >
              {t('common.register')}
            </Button>
          </div>
        )}
      </div>

      {/* 云同步开关 - 仅在登录后显示 */}
      {isLoggedIn && (
        <div className={styles.syncSection}>
          <div className={styles.syncItem}>
            <div className={styles.syncInfo}>
              <CloudSyncOutlined className={styles.syncIcon} />
              <div>
                <div className={styles.syncTitle}>自动同步</div>
                <div className={styles.syncDesc}>开启后自动同步数据到云端</div>
              </div>
            </div>
            <Switch
              checked={syncEnabled}
              onChange={setSyncEnabled}
            />
          </div>
        </div>
      )}

      {/* 功能菜单 */}
      <div className={styles.menuSection}>
        {mainMenuItems.map((item) => (
          <div
            key={item.title}
            className={`${styles.menuButton} ${item.className || ''}`}
            onClick={item.onClick}
          >
            <span className={styles.menuTitle}>{item.title}</span>
            <span className={styles.menuIcon}>{item.icon}</span>
          </div>
        ))}
      </div>

      {/* 设置弹窗 */}
      <Modal
        title={t('profile.settings')}
        open={settingsModalVisible}
        onCancel={() => setSettingsModalVisible(false)}
        footer={null}
      >
        {/* 功能入口 */}
        <div className={styles.settingsSection}>
          <div className={styles.sectionLabel}>{t('profile.aboutApp', '关于应用')}</div>

          {/* 版本日志 */}
          <div className={styles.settingsItem} onClick={() => { navigate('/changelog'); setSettingsModalVisible(false); }}>
            <div className={styles.settingsInfo}>
              <HistoryOutlined className={styles.settingsIcon} />
              <div>
                <div className={styles.settingsTitle}>{t('profile.changelog', '版本日志')}</div>
                <div className={styles.settingsDesc}>
                  {t('profile.changelogDesc', '查看更新历史')}
                </div>
              </div>
            </div>
            <RightOutlined className={styles.arrowIcon} />
          </div>

          {/* 功能简介 */}
          <div className={styles.settingsItem} onClick={() => { navigate('/features'); setSettingsModalVisible(false); }}>
            <div className={styles.settingsInfo}>
              <InfoCircleOutlined className={styles.settingsIcon} />
              <div>
                <div className={styles.settingsTitle}>{t('profile.features', '功能简介')}</div>
                <div className={styles.settingsDesc}>
                  {t('profile.featuresDesc', '了解应用功能')}
                </div>
              </div>
            </div>
            <RightOutlined className={styles.arrowIcon} />
          </div>

          {/* 关于我 */}
          <div className={styles.settingsItem} onClick={() => { navigate('/about'); setSettingsModalVisible(false); }}>
            <div className={styles.settingsInfo}>
              <SmileOutlined className={styles.settingsIcon} />
              <div>
                <div className={styles.settingsTitle}>{t('profile.about', '关于我')}</div>
                <div className={styles.settingsDesc}>
                  {t('profile.aboutDesc', '开发者信息')}
                </div>
              </div>
            </div>
            <RightOutlined className={styles.arrowIcon} />
          </div>
        </div>

        {/* 语言切换 */}
        <div className={styles.settingsSection}>
          <div className={styles.sectionLabel}>{t('profile.preferences', '偏好设置')}</div>
          <div className={styles.settingsItem}>
            <div className={styles.settingsInfo}>
              <GlobalOutlined className={styles.settingsIcon} />
              <div>
                <div className={styles.settingsTitle}>{t('profile.language')}</div>
                <div className={styles.settingsDesc}>
                  {t('profile.languageZh')} / {t('profile.languageEn')}
                </div>
              </div>
            </div>
            <div className={styles.languageSwitch}>
              <span className={i18n.language === 'zh-CN' ? styles.active : ''}>
                {t('profile.languageZh')}
              </span>
              <Switch
                checked={i18n.language === 'en-US'}
                onChange={handleLanguageChange}
              />
              <span className={i18n.language === 'en-US' ? styles.active : ''}>
                {t('profile.languageEn')}
              </span>
            </div>
          </div>

          {/* 主题切换 */}
          <div className={styles.settingsItem}>
            <div className={styles.settingsInfo}>
              <div className={styles.settingsIcon}>
                {themeManager.getIsDarkMode() ? <MoonOutlined /> : <SunOutlined />}
              </div>
              <div>
                <div className={styles.settingsTitle}>{t('profile.theme', '主题模式')}</div>
                <div className={styles.settingsDesc}>
                  {theme === 'light' ? t('profile.lightMode', '日间模式') :
                    theme === 'dark' ? t('profile.darkMode', '夜间模式') :
                      t('profile.followSystem', '跟随系统')}
                </div>
              </div>
            </div>
            <Radio.Group
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value)}
              size="small"
              className={styles.themeRadioGroup}
            >
              <Radio.Button value="light">
                <SunOutlined />
              </Radio.Button>
              <Radio.Button value="dark">
                <MoonOutlined />
              </Radio.Button>
              <Radio.Button value="system">
                <DesktopOutlined />
              </Radio.Button>
            </Radio.Group>
          </div>
        </div>
      </Modal>

      {/* 登录弹窗 */}
      <Modal
        title={t('profile.login')}
        open={loginModalVisible}
        onCancel={() => setLoginModalVisible(false)}
        footer={null}
      >
        <Form form={loginForm} onFinish={handleLogin} layout="vertical">
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoginLoading}
              block
            >
              {t('profile.login')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 注册弹窗 */}
      <Modal
        title={t('common.register')}
        open={registerModalVisible}
        onCancel={() => setRegisterModalVisible(false)}
        footer={null}
      >
        <Form form={registerForm} onFinish={handleRegister} layout="vertical">
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item
            name="password"
            label="密码"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="确认密码"
            rules={[{ required: true, message: '请确认密码' }]}
          >
            <Input.Password placeholder="请确认密码" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isRegisterLoading}
              block
            >
              {t('common.register')}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* 数据管理弹窗 */}
      <Modal
        title={t('profile.dataManagement')}
        open={dataManageModalVisible}
        onCancel={() => !isImportLoading && setDataManageModalVisible(false)}
        footer={null}
        maskClosable={!isImportLoading}
        closable={!isImportLoading}
      >
        {/* 导入部分 */}
        <div className={styles.dataManageSection}>
          <div className={styles.sectionTitle}>
            <ImportOutlined /> {t('profile.importData')}
          </div>
          <div className={styles.sectionContent}>
            {isImportLoading ? (
              <div className={styles.importLoading}>
                <Spin size="default" tip="正在导入数据，请稍候..." />
              </div>
            ) : (
              <>
                <div className={styles.importOptionsInline}>
                  <Upload
                    accept=".csv"
                    showUploadList={false}
                    beforeUpload={(file) => {
                      handleImport(file as File, 'csv');
                      return false;
                    }}
                    disabled={isImportLoading}
                  >
                    <Button icon={<FileTextOutlined />} loading={isImportLoading}>
                      CSV
                    </Button>
                  </Upload>
                  <Upload
                    accept=".xlsx,.xls"
                    showUploadList={false}
                    beforeUpload={(file) => {
                      handleImport(file as File, 'xlsx');
                      return false;
                    }}
                    disabled={isImportLoading}
                  >
                    <Button icon={<FileExcelOutlined />} loading={isImportLoading}>
                      Excel
                    </Button>
                  </Upload>
                </div>
                <div className={styles.sectionDesc}>支持 CSV、Excel 格式文件导入</div>
              </>
            )}
          </div>
        </div>

        {/* 导出部分 */}
        <div className={styles.dataManageSection}>
          <div className={styles.sectionTitle}>
            <ExportOutlined /> {t('profile.exportData')}
          </div>
          <div className={styles.sectionContent}>
            <div className={styles.exportOptionsInline}>
              <Button
                icon={<FileTextOutlined />}
                onClick={() => {
                  handleExport('csv');
                  setDataManageModalVisible(false);
                }}
              >
                CSV
              </Button>
              <Button
                icon={<FileExcelOutlined />}
                onClick={() => {
                  handleExport('xlsx');
                  setDataManageModalVisible(false);
                }}
              >
                Excel
              </Button>
            </div>
            <div className={styles.sectionDesc}>导出为 CSV 或 Excel 格式文件</div>
          </div>
        </div>

        {/* 去重部分 */}
        <div className={styles.dataManageSection}>
          <div className={styles.sectionTitle}>
            <CopyOutlined /> {t('profile.removeDuplicates')}
          </div>
          <div className={styles.sectionContent}>
            <Button
              icon={<CopyOutlined />}
              onClick={() => {
                setDataManageModalVisible(false);
                handleRemoveDuplicates();
              }}
            >
              删除重复记录
            </Button>
            <div className={styles.sectionDesc}>删除日期、金额、分类、类型相同的重复记录</div>
          </div>
        </div>

        {/* 删除导入记录 - 仅登录用户可见 */}
        {isLoggedIn && (
          <div className="data-manage-section danger-section">
            <div className={styles.sectionTitle}>
              <DeleteOutlined /> 导入记录管理
            </div>
            <div className={styles.sectionContent}>
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  setDataManageModalVisible(false);
                  handleDeleteImported();
                }}
              >
                删除所有导入记录
              </Button>
              <div className={styles.sectionDesc}>删除所有通过导入功能添加的记录</div>
            </div>
          </div>
        )}

        {/* 清空本地数据 */}
        <div className="data-manage-section danger-section">
          <div className={styles.sectionTitle}>
            <DeleteOutlined /> {t('profile.clearData', '清空本地数据')}
          </div>
          <div className={styles.sectionContent}>
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                setDataManageModalVisible(false);
                handleClearData();
              }}
            >
              {t('profile.clearData', '清空本地数据')}
            </Button>
            <div className={styles.sectionDesc}>清空所有本地数据，不可恢复</div>
          </div>
        </div>

        <div className={styles.importTemplate}>
          <div className={styles.templateTitle}>导入文件格式说明：</div>
          <div className={styles.templateDesc}>
            文件需包含以下列：日期、类型（支出/收入）、金额、分类、分类小项（可选）、备注（可选）
          </div>
        </div>
      </Modal>

      {/* 底部导航 */}
      <BottomNav />
    </div>
  );
};

export default Profile;
