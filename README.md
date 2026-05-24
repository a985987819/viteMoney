# 🌾 星露谷记账本

<p align="center">
  <b>一款星露谷像素风格的多功能记账 PWA 应用</b>
</p>

<p align="center">
  <a href="#功能模块">功能模块</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#项目结构">项目结构</a> •
  <a href="#技术选型">技术选型</a>
</p>

---

## 功能模块

### 📝 记账

| 功能 | 说明 |
|------|------|
| 快速记账 | 支持支出/收入/转账/借贷/报销五种类型，内置计算器 |
| 快捷记账 | 将常用记账组合保存为快捷方式，一键记账 |
| 定时记账 | 设置周期性自动记账（日/周/月/年），需登录 |
| 分类管理 | 预置丰富收支分类，支持自定义二级分类与图标 |
| 账户管理 | 多账户支持（现金/微信/支付宝/银行卡等） |

### 📊 统计与报表

| 功能 | 说明 |
|------|------|
| 月度概览 | 首页实时展示本月收支、结余与趋势图 |
| 账单明细 | 按日期分组，支持筛选（类型/金额/分类）、排序（时间/金额） |
| 图表报表 | 饼图展示分类占比，日历热力图，支持按分类展开明细 |
| 月度对比 | 选择两个月进行收支对比，可视化差异分析 |

### 💰 预算管理

- 设置月度支出预算，实时追踪使用进度
- 进度条颜色预警（正常 → 即将超支 → 超支）
- 历史预算列表，支持编辑与删除

### 🎯 攒钱计划

- 创建多个攒钱目标，设定目标金额与截止日期
- 自动计算日均建议存款额
- 手动存入/取出操作，进度可视化
- 多计划管理，支持切换当前操作计划

### 🧊 我的冰箱

- 记录食材/菜品的购入与消耗进度
- 按天数显示保鲜状态，颜色渐变提示
- 待消耗/已消耗/全部三栏切换，支持搜索

### 👤 个人中心

- 用户注册/登录，JWT 认证与自动刷新
- 数据导入导出（CSV / Excel）
- 主题切换（亮色/暗色/跟随系统）
- 多语言切换（中文/英文）
- PWA 安装提示
- 数据清除与重置

### 🔌 离线模式

- **无需登录即可使用**：记账、预算、攒钱、冰箱等核心功能均支持本地存储
- **在线/离线自动切换**：登录后数据走 API，未登录走 localStorage
- **API 失败自动降级**：在线模式下 API 请求失败时，自动回退到本地数据
- **网络状态提示**：离线时顶部显示醒目提示条

### 🛡️ 错误处理

- **ErrorBoundary**：全局 React 错误边界，捕获渲染异常并展示星露谷风格对话框
- **路由错误兜底**：每个路由配置 `errorElement`，避免白屏
- **API 拦截器**：401 自动刷新 Token，刷新失败跳转登录；统一错误码映射中文提示
- **数据解析安全**：所有 `JSON.parse` 调用均有 try-catch，损坏数据回退到默认值
- **localStorage 容错**：写入失败（如配额超限）不会崩溃，控制台输出警告

---

## 快速开始

### 环境要求

- Node.js >= 18
- npm >= 9

### 安装与运行

```bash
npm install
npm run dev
```

### 构建生产版本

```bash
npm run build
npm run preview
```

### 运行测试

```bash
npm run test
```

### 类型检查

```bash
npm run typecheck
```

---

## 项目结构

```
src/
├── api/                    # API 接口层
│   ├── auth.ts             # 认证（登录/注册/刷新Token）
│   ├── record.ts           # 记账记录 CRUD
│   ├── budget.ts           # 预算管理
│   ├── category.ts         # 分类管理
│   ├── savings.ts          # 攒钱计划（含本地存储逻辑）
│   ├── recurring.ts        # 定时记账
│   ├── debt.ts             # 借贷管理
│   └── template.ts         # 记账模板
├── components/             # 公共组件
│   ├── BottomNav/          # 底部导航栏
│   ├── ErrorBoundary/      # 全局错误边界
│   ├── RouteError/         # 路由错误兜底
│   ├── OfflineIndicator/   # 离线状态提示条
│   ├── StardewDialog/      # 星露谷风格对话框
│   ├── StardewPanel/       # 星露谷风格面板
│   ├── PWAInstallPrompt/   # PWA 安装引导
│   ├── SwipeableRecordItem/# 可滑动记录项
│   ├── ScrollContainer/    # 自定义滚动容器
│   ├── EmptyState/         # 空状态占位
│   ├── DatePicker/         # 日期选择器
│   └── SpriteIcon/         # 精灵图标组件
├── constants/              # 常量定义
│   ├── categories.ts       # 收支分类常量
│   └── cdn.ts              # CDN 资源地址
├── hooks/                  # 自定义 Hooks
│   ├── useAuth.tsx         # 认证状态管理
│   ├── useCategories.ts    # 分类数据与映射
│   ├── useAsync.ts         # 异步操作封装
│   ├── useAsyncData.ts     # 异步数据加载
│   └── usePWA.ts           # PWA 安装状态
├── i18n/                   # 国际化
│   └── locales/            # 语言文件（zh-CN / en-US）
├── pages/                  # 页面组件
│   ├── Home/               # 首页（月度概览 + 记录列表）
│   ├── AddRecord/          # 添加/编辑记录
│   ├── Bill/               # 账单（独立页面，含图表与筛选）
│   ├── Statistics/         # 统计（账单/报表/对比三栏）
│   ├── Budget/             # 预算管理
│   ├── Savings/            # 攒钱计划管理
│   ├── SavingsOperate/     # 攒钱计划操作（存入/取出）
│   ├── Recurring/          # 定时记账
│   ├── MyFridge/           # 我的冰箱
│   ├── QuickRecordManage/  # 快捷记账管理
│   ├── CategoryManage/     # 分类管理
│   ├── Profile/            # 个人中心
│   ├── Changelog/          # 更新日志
│   ├── Features/           # 功能介绍
│   └── About/              # 关于页面
├── router/                 # 路由配置（懒加载 + 错误兜底）
├── styles/                 # 全局样式与主题
├── utils/                  # 工具函数
│   ├── request.ts          # Axios 封装（拦截器/Token刷新/错误映射）
│   ├── storage.ts          # localStorage 封装（安全解析/容错写入）
│   ├── importExport.ts     # 数据导入导出
│   ├── resourceLoader.ts   # 资源预加载
│   ├── theme.ts            # 主题切换
│   ├── echartsPixelTheme.ts# ECharts 像素风主题
│   └── spriteIcons.ts      # 精灵图标映射
├── App.tsx                 # 应用入口
└── main.tsx                # 渲染入口
```

---

## 技术选型

| 类别 | 技术 | 版本 | 说明 |
|------|------|------|------|
| 前端框架 | React | 19 | 组件化 UI 构建 |
| 类型系统 | TypeScript | 5.x | 静态类型检查 |
| 构建工具 | Vite | 8 | 极速开发与构建 |
| UI 组件库 | Ant Design | 6 | 企业级 React 组件 |
| 路由 | React Router | 7 | 客户端路由，懒加载 |
| 状态管理 | React Hooks | - | 轻量级状态管理 |
| HTTP 客户端 | Axios | 1.x | 请求拦截/Token 刷新 |
| 图表 | ECharts | 6 | 像素风自定义主题 |
| 国际化 | i18next + react-i18next | - | 中英文切换 |
| 样式方案 | SCSS + CSS Modules | - | 作用域隔离 |
| PWA | vite-plugin-pwa | - | 离线缓存与安装 |
| 测试 | Vitest + Testing Library | - | 单元测试与组件测试 |
| 日期处理 | Day.js | - | 轻量日期库 |

---

<p align="center">
  Made with ❤️ and ☕
</p>
