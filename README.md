# 🌾 星露谷记账本

<p align="center">
  <img src="https://vercel-icons.vercel.app/hero.png" alt="星露谷记账本" width="120">
</p>

<p align="center">
  <b>一款像素风格的多功能记账应用</b>
</p>

<p align="center">
  <a href="#功能特性">功能特性</a> •
  <a href="#技术栈">技术栈</a> •
  <a href="#快速开始">快速开始</a> •
  <a href="#项目结构">项目结构</a> •
  <a href="#接口文档">接口文档</a>
</p>

---

## ✨ 功能特性

### 📊 核心记账功能
- **快速记账** - 支持支出/收入记录，内置计算器
- **分类管理** - 丰富的收支分类，支持自定义二级分类
- **账单查看** - 按日期分组展示，支持滑动删除
- **账单筛选** - 多维度筛选（时间、类型、金额范围等）

### 📈 统计报表
- **月度统计** - 实时查看本月收支和预算剩余
- **图表分析** - 饼图、趋势图等多种可视化图表
- **账单列表** - 详细的交易记录列表

### 💰 预算管理
- **月度预算** - 设置每月支出预算
- **预算提醒** - 实时显示预算使用进度
- **历史预算** - 查看过往月份预算执行情况

### 🎯 攒钱计划（开发中）
- 储蓄目标设定
- 存钱进度追踪
- 可视化进度展示

### 🎨 特色功能
- **星露谷像素风格** - 独特的游戏化UI设计
- **PWA支持** - 可安装为桌面/手机应用
- **数据导入导出** - 支持 CSV/Excel 格式
- **多语言支持** - 中文/英文切换
- **离线使用** - 未登录时本地存储数据

---

## 🛠 技术栈

| 类别 | 技术 |
|------|------|
| **前端框架** | React 19 + TypeScript |
| **构建工具** | Vite 8 |
| **UI组件** | Ant Design 6 |
| **状态管理** | React Hooks |
| **路由** | React Router 7 |
| **国际化** | i18next + react-i18next |
| **图表** | ECharts 6 |
| **样式** | SCSS + CSS Modules |
| **PWA** | vite-plugin-pwa |
| **HTTP** | Axios |

---

## 🚀 快速开始

### 环境要求
- Node.js >= 18
- npm >= 9

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

---

## 📁 项目结构

```
moneyRecord/
├── public/                 # 静态资源
├── src/
│   ├── api/               # API 接口
│   │   ├── auth.ts        # 认证相关
│   │   ├── budget.ts      # 预算管理
│   │   ├── category.ts    # 分类管理
│   │   └── record.ts      # 记账记录
│   ├── components/        # 公共组件
│   │   ├── BottomNav/     # 底部导航
│   │   ├── LoadingScreen/ # 加载页面
│   │   ├── StardewPanel/  # 星露谷风格面板
│   │   └── ...
│   ├── constants/         # 常量定义
│   │   └── categories.ts  # 分类常量
│   ├── hooks/             # 自定义 Hooks
│   │   └── useAuth.ts     # 认证 Hook
│   ├── i18n/              # 国际化
│   │   └── locales/       # 语言文件
│   │       ├── zh-CN.json
│   │       └── en-US.json
│   ├── pages/             # 页面组件
│   │   ├── Home/          # 首页
│   │   ├── AddRecord/     # 添加记录
│   │   ├── Statistics/    # 统计页面
│   │   │   ├── BillContent/   # 账单内容
│   │   │   └── ReportContent/ # 报表内容
│   │   ├── Savings/       # 攒钱计划
│   │   ├── Budget/        # 预算管理
│   │   ├── Profile/       # 个人中心
│   │   └── CategoryManage/# 分类管理
│   ├── router/            # 路由配置
│   ├── styles/            # 全局样式
│   ├── utils/             # 工具函数
│   │   ├── request.ts     # HTTP请求
│   │   ├── storage.ts     # 本地存储
│   │   └── resourceLoader.ts # 资源加载
│   ├── App.tsx
│   └── main.tsx
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 📚 接口文档

### 基础信息
- **Base URL**: `/api`
- **认证方式**: JWT (Bearer Token)

### 接口模块

#### 1. 认证模块 (`/auth`)
| 方法 | 路径 | 描述 |
|------|------|------|
| POST | `/auth/login` | 用户登录 |
| POST | `/auth/register` | 用户注册 |
| POST | `/auth/refresh` | 刷新 Token |
| POST | `/auth/logout` | 用户登出 |

#### 2. 记账记录模块 (`/records`)
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/records` | 获取记录列表 |
| GET | `/records/stats` | 获取月度统计 |
| GET | `/records/by-date` | 按日期分组获取 |
| POST | `/records` | 创建记录 |
| PUT | `/records/:id` | 更新记录 |
| DELETE | `/records/:id` | 删除记录 |
| POST | `/records/import` | 批量导入 |

#### 3. 预算模块 (`/budgets`)
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/budgets/current` | 获取当前月预算 |
| GET | `/budgets/month` | 获取指定月预算 |
| GET | `/budgets/stats` | 获取预算统计 |
| GET | `/budgets/recent` | 获取近期预算 |
| POST | `/budgets` | 设置预算 |
| DELETE | `/budgets` | 删除预算 |

#### 4. 分类模块 (`/categories`)
| 方法 | 路径 | 描述 |
|------|------|------|
| GET | `/categories` | 获取所有分类 |
| GET | `/categories/expense` | 获取支出分类 |
| GET | `/categories/income` | 获取收入分类 |

---

## 🎮 星露谷风格设计

本项目采用《星露谷物语》游戏风格设计：

- **像素字体** - 使用等宽像素字体营造复古感
- **木质纹理** - 按钮和面板采用木质色调
- **游戏元素** - 英雄角色、动物、农作物等装饰元素
- **动画效果** - 云朵飘动、按钮按压等交互动画

---

## 🔮 未来规划

- [ ] 攒钱目标功能完善
- [ ] 多账户管理
- [ ] 定期/周期记账
- [ ] 借贷管理
- [ ] 账单模板
- [ ] 数据云同步
- [ ] 记账提醒

---

## 📄 开源协议

[MIT](LICENSE)

---

<p align="center">
  Made with ❤️ and ☕
</p>
