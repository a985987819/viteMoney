import { useNavigate } from 'react-router-dom';
import { LeftOutlined } from '@ant-design/icons';
import styles from './index.module.scss';

interface GuideStep {
  step: string;
  text: string;
}

interface FeatureSection {
  icon: string;
  title: string;
  description: string;
  guides: GuideStep[];
  tips: string[];
}

const Features = () => {
  const navigate = useNavigate();

  const sections: FeatureSection[] = [
    {
      icon: '📝',
      title: '快速记账',
      description: '支持支出、收入、转账、借贷、报销五种记录类型，内置计算器，记账只需三步',
      guides: [
        { step: '1', text: '在首页点击右下角「+」按钮进入记账页面' },
        { step: '2', text: '选择记录类型（支出/收入），点选分类和子分类' },
        { step: '3', text: '使用内置计算器输入金额，点击「保存」即可' },
      ],
      tips: [
        '点击分类右侧的 ⋮ 可以展开二级分类',
        '备注栏可记录消费详情，方便日后回顾',
        '点击日期可修改记录日期，支持选择过去日期',
        '保存后点击「继续添加」可连续记账',
      ],
    },
    {
      icon: '⚡',
      title: '快捷记账',
      description: '将常用的记账组合保存为快捷方式，一键完成记账',
      guides: [
        { step: '1', text: '前往「个人中心 → 快捷记账」添加常用组合' },
        { step: '2', text: '选择分类、子分类并输入常用金额' },
        { step: '3', text: '在首页底部快捷面板中一键记账' },
      ],
      tips: [
        '适合每天固定的开销，如午餐、通勤等',
        '长按快捷项可删除或调整顺序',
      ],
    },
    {
      icon: '📊',
      title: '统计与报表',
      description: '多维度统计收支数据，饼图、趋势图、日历热力图一目了然',
      guides: [
        { step: '1', text: '点击底部「统计」进入统计页面' },
        { step: '2', text: '「账单」Tab 查看按日分组的明细列表' },
        { step: '3', text: '「报表」Tab 查看分类饼图和日历热力图' },
        { step: '4', text: '「对比」Tab 选择两个月进行收支对比' },
      ],
      tips: [
        '账单页面支持按类型、金额范围、分类筛选',
        '点击饼图中的分类可展开查看该分类下的明细',
        '报表页面的日历视图中，日期下方圆点表示当天有记录',
      ],
    },
    {
      icon: '💰',
      title: '预算管理',
      description: '设置月度预算，实时追踪支出进度，超支预警提醒',
      guides: [
        { step: '1', text: '前往「个人中心 → 预算管理」' },
        { step: '2', text: '点击「设置预算」输入月度预算金额' },
        { step: '3', text: '系统自动计算已支出和剩余金额' },
      ],
      tips: [
        '进度条颜色变化：绿色 → 橙色（80%）→ 红色（超支）',
        '可查看历史月份的预算执行情况',
        '首页概览区也会显示预算进度',
      ],
    },
    {
      icon: '🎯',
      title: '攒钱计划',
      description: '设定攒钱目标与截止日期，追踪存钱进度',
      guides: [
        { step: '1', text: '前往「个人中心 → 攒钱计划」点击「新建」' },
        { step: '2', text: '输入计划名称、目标金额和截止日期' },
        { step: '3', text: '在操作页面进行存入或取出操作' },
      ],
      tips: [
        '系统会自动计算日均建议存款额',
        '支持同时创建多个攒钱计划',
        '点击「打开这个计划」切换当前操作的计划',
      ],
    },
    {
      icon: '🧊',
      title: '我的冰箱',
      description: '记录食材和菜品的购入与消耗进度，避免遗忘',
      guides: [
        { step: '1', text: '前往「个人中心 → 我的冰箱」' },
        { step: '2', text: '输入菜品名称、分量和记录日期' },
        { step: '3', text: '拖动进度条更新消耗进度' },
      ],
      tips: [
        '进度达到 100% 自动标记为「已消耗」',
        '按天数显示保鲜状态，颜色从绿变红提示新鲜度',
        '支持搜索菜品名称快速定位',
      ],
    },
    {
      icon: '🏷️',
      title: '分类管理',
      description: '预置丰富的收支分类，支持自定义分类和图标',
      guides: [
        { step: '1', text: '在记账页面点击分类区域的设置图标' },
        { step: '2', text: '添加、编辑或删除自定义分类' },
        { step: '3', text: '每个分类可选择专属 emoji 图标' },
      ],
      tips: [
        '分类支持二级子分类，满足更细粒度的记账需求',
        '删除分类不会影响已有记录',
      ],
    },
    {
      icon: '💾',
      title: '数据管理',
      description: '支持 CSV/Excel 导入导出，数据去重，本地存储保障隐私',
      guides: [
        { step: '1', text: '前往「个人中心 → 数据管理」' },
        { step: '2', text: '选择导入（CSV/Excel）或导出操作' },
        { step: '3', text: '导入后系统自动匹配分类，未匹配的归入「其他」' },
      ],
      tips: [
        '导入文件需包含：日期、类型、金额、分类列',
        '「删除重复记录」可清理完全相同的记录',
        '「清空本地数据」操作不可恢复，请谨慎使用',
      ],
    },
  ];

  return (
    <div className={styles.featuresPage}>
      <div className={styles.header}>
        <div className={styles.backButton} onClick={() => navigate(-1)}>
          <LeftOutlined />
        </div>
        <h1 className={styles.title}>功能介绍与使用说明</h1>
        <div className={styles.placeholder} />
      </div>

      <div className={styles.content}>
        <div className={styles.introCard}>
          <div className={styles.introIcon}>🌾</div>
          <h2 className={styles.introTitle}>星露谷记账本</h2>
          <p className={styles.introText}>
            一款像素风格的多功能记账应用，无需注册即可使用全部本地功能。
            所有数据保存在浏览器本地，保障您的隐私安全。
          </p>
          <div className={styles.introHighlights}>
            <span className={styles.highlightTag}>🔓 无需登录</span>
            <span className={styles.highlightTag}>📱 离线可用</span>
            <span className={styles.highlightTag}>💾 本地存储</span>
            <span className={styles.highlightTag}>🎮 像素风格</span>
          </div>
        </div>

        <div className={styles.quickStartCard}>
          <h3 className={styles.cardTitle}>🚀 快速上手</h3>
          <div className={styles.quickSteps}>
            <div className={styles.quickStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>打开应用</div>
                <div className={styles.stepDesc}>无需注册，直接使用</div>
              </div>
            </div>
            <div className={styles.quickStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>点击「+」记账</div>
                <div className={styles.stepDesc}>选择分类、输入金额、保存</div>
              </div>
            </div>
            <div className={styles.quickStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <div className={styles.stepTitle}>查看统计</div>
                <div className={styles.stepDesc}>图表、报表、对比一目了然</div>
              </div>
            </div>
          </div>
        </div>

        {sections.map((section) => (
          <div key={section.title} className={styles.featureCard}>
            <div className={styles.featureHeader}>
              <span className={styles.featureIcon}>{section.icon}</span>
              <div>
                <h3 className={styles.featureTitle}>{section.title}</h3>
                <p className={styles.featureDesc}>{section.description}</p>
              </div>
            </div>

            <div className={styles.guideSection}>
              <div className={styles.guideLabel}>使用步骤</div>
              {section.guides.map((guide) => (
                <div key={guide.step} className={styles.guideStep}>
                  <span className={styles.guideStepNum}>{guide.step}</span>
                  <span className={styles.guideStepText}>{guide.text}</span>
                </div>
              ))}
            </div>

            {section.tips.length > 0 && (
              <div className={styles.tipsSection}>
                <div className={styles.tipsLabel}>💡 小提示</div>
                <ul className={styles.tipsList}>
                  {section.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}

        <div className={styles.offlineCard}>
          <h3 className={styles.cardTitle}>🔌 离线使用说明</h3>
          <p className={styles.offlineDesc}>
            星露谷记账本支持完全离线使用。以下功能在未登录状态下均可正常使用：
          </p>
          <div className={styles.offlineGrid}>
            <div className={styles.offlineItem}>
              <span className={styles.offlineIcon}>✅</span>
              <span>记账（支出/收入）</span>
            </div>
            <div className={styles.offlineItem}>
              <span className={styles.offlineIcon}>✅</span>
              <span>账单查看与筛选</span>
            </div>
            <div className={styles.offlineItem}>
              <span className={styles.offlineIcon}>✅</span>
              <span>统计报表与图表</span>
            </div>
            <div className={styles.offlineItem}>
              <span className={styles.offlineIcon}>✅</span>
              <span>月度对比分析</span>
            </div>
            <div className={styles.offlineItem}>
              <span className={styles.offlineIcon}>✅</span>
              <span>预算管理</span>
            </div>
            <div className={styles.offlineItem}>
              <span className={styles.offlineIcon}>✅</span>
              <span>攒钱计划</span>
            </div>
            <div className={styles.offlineItem}>
              <span className={styles.offlineIcon}>✅</span>
              <span>我的冰箱</span>
            </div>
            <div className={styles.offlineItem}>
              <span className={styles.offlineIcon}>✅</span>
              <span>快捷记账</span>
            </div>
            <div className={styles.offlineItem}>
              <span className={styles.offlineIcon}>✅</span>
              <span>分类管理</span>
            </div>
            <div className={styles.offlineItem}>
              <span className={styles.offlineIcon}>✅</span>
              <span>数据导入导出</span>
            </div>
            <div className={styles.offlineItem}>
              <span className={styles.offlineIcon}>✅</span>
              <span>数据去重</span>
            </div>
            <div className={styles.offlineItem}>
              <span className={styles.offlineIcon}>✅</span>
              <span>主题与语言切换</span>
            </div>
          </div>
          <div className={styles.offlineNote}>
            <span className={styles.offlineIcon}>📌</span>
            <span>「定时记账」功能需要登录后使用，其余功能均可离线使用。所有本地数据保存在浏览器中，清除浏览器数据会导致记录丢失，建议定期导出备份。</span>
          </div>
        </div>

        <div className={styles.faqCard}>
          <h3 className={styles.cardTitle}>❓ 常见问题</h3>
          <div className={styles.faqList}>
            <div className={styles.faqItem}>
              <div className={styles.faqQ}>数据保存在哪里？</div>
              <div className={styles.faqA}>所有数据保存在浏览器的 localStorage 中，不会上传到任何服务器。建议定期使用「数据管理 → 导出」功能备份。</div>
            </div>
            <div className={styles.faqItem}>
              <div className={styles.faqQ}>清除浏览器数据后记录还在吗？</div>
              <div className={styles.faqA}>清除浏览器数据会删除本地记录。请在清除前导出备份，或登录账号使用云端同步功能。</div>
            </div>
            <div className={styles.faqItem}>
              <div className={styles.faqQ}>可以安装为手机应用吗？</div>
              <div className={styles.faqA}>可以。在浏览器中访问本应用时，选择「添加到主屏幕」即可安装为 PWA 应用，体验接近原生应用。</div>
            </div>
            <div className={styles.faqItem}>
              <div className={styles.faqQ}>如何切换深色模式？</div>
              <div className={styles.faqA}>前往「个人中心 → 设置 → 主题模式」，支持日间、夜间和跟随系统三种模式。</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
