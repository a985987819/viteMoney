# 🌾 星露谷记账本

<p align="center">
  <b>一款星露谷像素风格的多功能记账 PWA 应用</b>
</p>

<p align="center">
  <a href="#功能模块">功能模块</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#项目结构">项目结构</a> •
  <a href="#技术选型">技术选型</a> •
  <a href="#部署指南">部署指南</a> •
  <a href="#开发规范">开发规范</a>
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
# 克隆项目
git clone <repository-url>
cd viteMoney

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

开发服务器默认运行在 `http://localhost:5174`，API 请求通过 Vite 代理转发到后端。

### 环境变量配置

项目通过 Vite 的 `loadEnv` 加载环境变量，可在项目根目录创建 `.env` 文件：

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `BASE_URL` | 应用部署的基础路径 | `/` |
| `VITE_API_BASE_URL` | API 基础地址（可选，默认使用 Vite 代理） | - |

> **注意**：API 代理配置在 `vite.config.ts` 中，开发时修改 `server.proxy` 的 `target` 即可切换后端地址。

### 常用命令

```bash
npm run dev          # 启动开发服务器（热更新）
npm run build        # TypeScript 类型检查 + 生产构建
npm run preview      # 预览生产构建结果
npm run lint         # ESLint 代码检查
npm run typecheck    # TypeScript 类型检查（不构建）
npm run test         # 运行 Vitest 测试
npm run test:ui      # Vitest 可视化测试界面
npm run test:coverage # 生成测试覆盖率报告
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
│   ├── account.ts          # 账户管理
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
│   ├── useAuth.tsx         # 认证状态管理（Context + Provider）
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
├── types/                  # TypeScript 类型定义
│   └── types.ts            # 集中类型导出（re-export from api/）
├── utils/                  # 工具函数
│   ├── request.ts          # Axios 封装（拦截器/Token刷新/错误映射）
│   ├── storage.ts          # localStorage 封装（安全解析/容错写入）
│   ├── importExport.ts     # 数据导入导出
│   ├── dataMigration.ts    # 数据迁移
│   ├── categoryTransformer.ts # 分类转换
│   ├── resourceLoader.ts   # 资源预加载
│   ├── theme.ts            # 主题切换
│   ├── echartsPixelTheme.ts# ECharts 像素风主题
│   └── spriteIcons.ts      # 精灵图标映射
├── App.tsx                 # 应用入口（主题/路由/Provider）
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

## 架构设计

### 双模式数据层（在线/离线）

应用根据认证状态工作在两种模式下：

| 模式 | 数据存储 | 适用场景 |
|------|----------|----------|
| **离线模式** | localStorage | 未登录、网络不可用 |
| **在线模式** | 后端 API | 已登录、网络正常 |

核心机制：
1. **判断登录状态**：通过 `useAuth` Hook 的 `isLoggedIn` 判断
2. **数据读写分流**：登录时调用 API，未登录时读写 localStorage
3. **自动降级**：API 请求失败时自动回退到本地数据

### 认证流程

```
用户登录 → 获取 accessToken + refreshToken
    ↓
请求 API → 携带 Bearer Token
    ↓
Token 过期 → 自动使用 refreshToken 刷新
    ↓
刷新成功 → 重发原请求
刷新失败 → 清除用户数据，跳转个人中心
```

### 类型体系

所有业务类型定义在各 `src/api/*.ts` 文件中，`src/types/types.ts` 作为集中导出文件（re-export），其他模块统一从 `types.ts` 导入类型。

---

## 部署指南

### 静态部署（推荐）

项目构建后为纯静态文件，可部署到任何静态托管服务：

```bash
# 构建生产版本
npm run build

# 构建产物在 dist/ 目录
```

#### Vercel 部署

1. Fork 或导入项目到 GitHub
2. 在 Vercel 中导入仓库
3. 构建命令：`npm run build`
4. 输出目录：`dist`
5. 如需配置 API 代理，添加 Vercel `vercel.json` 重写规则

#### EdgeOne / CDN 部署

1. 执行 `npm run build`
2. 将 `dist/` 目录上传到 CDN
3. 配置 SPA 回退规则：所有未匹配的路径返回 `index.html`
4. 配置 API 反向代理：将 `/api/*` 转发到后端服务

#### Docker 部署

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

`nginx.conf` 需配置 SPA 回退和 API 代理：

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location /api/ {
        proxy_pass https://money-recordback-end.edgeone.dev;
        proxy_set_header Host $host;
    }
}
```

### PWA 注意事项

- 构建时会自动生成 Service Worker 文件到 `dev-dist/` 目录
- PWA manifest 在 `vite.config.ts` 中配置
- 部署时确保 `sw.js` 和 manifest 文件可正常访问
- HTTPS 是 PWA 的必要条件

---

## 开发规范

### 代码风格

- **文件命名**：组件目录使用 kebab-case，工具文件使用 camelCase
- **页面模式**：每个页面使用 `index.tsx` + `index.module.scss` 独立目录
- **类型导入**：统一从 `src/types/types.ts` 导入业务类型
- **API 函数**：在 `src/api/` 中使用 `createApiService<T>(basePath)` 或自定义函数
- **Hooks**：自定义 Hook 遵循 `useXxx` 命名，从 `src/hooks/` 导出

### 组件开发

```
ComponentName/
├── index.tsx              # 组件逻辑
├── index.module.scss      # 组件样式（CSS Modules）
└── ComponentName.test.tsx  # 组件测试（可选）
```

### 提交规范

建议使用 Conventional Commits 格式：

```
feat: 添加新功能
fix: 修复 Bug
docs: 文档更新
style: 代码格式调整（不影响逻辑）
refactor: 代码重构
test: 测试相关
chore: 构建/工具链变更
```

### 代码质量

提交前请确保通过以下检查：

```bash
npm run typecheck    # TypeScript 类型检查
npm run lint         # ESLint 代码检查
npm run test         # 运行测试
```

---

## 相关文档

| 文档 | 说明 |
|------|------|
| [BACKEND_API.md](docs/BACKEND_API.md) | 后端 API 接口文档（完整接口定义与数据结构） |
| [CLAUDE.md](CLAUDE.md) | AI 辅助开发指引 |

---

<p align="center">
  Made with ❤️ and ☕
</p>
