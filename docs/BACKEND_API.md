# 后端 API 开发文档

## 1. 项目概述

- **项目名称**：记账应用（viteMoney）
- **前端技术栈**：React + TypeScript + Vite + Ant Design
- **API 基础路径**：`/api`
- **认证方式**：Bearer Token (JWT)
- **响应格式**：

```typescript
{
  code: number;    // 业务状态码，200 表示成功
  data: T;         // 响应数据
  message: string; // 响应消息
}
```

- **请求超时**：60 秒
- **Content-Type**：`application/json`

> **重要说明**：前端响应拦截器会自动解包 `data` 字段，即前端拿到的直接是 `response.data.data` 的内容，后端必须保证所有接口返回统一的 `ApiResponse` 结构。

---

## 2. 认证模块 `/api/auth`

### POST /api/auth/login

**描述**：用户登录

**认证**：不需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| username | string | 是 | 用户名 |
| password | string | 是 | 密码 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| user | User | 用户信息 |
| user.id | number | 用户唯一标识 |
| user.username | string | 用户名 |
| user.createdAt | string | 创建时间 |
| tokens | Tokens | Token 信息 |
| tokens.accessToken | string | 访问令牌 |
| tokens.refreshToken | string | 刷新令牌 |
| tokens.expiresIn | number | 过期时间（秒） |
| tokens.tokenType | string | 令牌类型，固定为 "Bearer" |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 登录成功 |
| 400 | 用户名或密码错误 |
| 401 | 认证失败 |

**请求示例**：

```json
{
  "username": "testuser",
  "password": "123456"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "user": {
      "id": 1,
      "username": "testuser",
      "createdAt": "2025-01-01T00:00:00.000Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
      "expiresIn": 3600,
      "tokenType": "Bearer"
    }
  },
  "message": "登录成功"
}
```

---

### POST /api/auth/register

**描述**：用户注册

**认证**：不需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| username | string | 是 | 用户名 |
| password | string | 是 | 密码 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| user | User | 用户信息 |
| user.id | number | 用户唯一标识 |
| user.username | string | 用户名 |
| user.createdAt | string | 创建时间 |
| tokens | Tokens | Token 信息 |
| tokens.accessToken | string | 访问令牌 |
| tokens.refreshToken | string | 刷新令牌 |
| tokens.expiresIn | number | 过期时间（秒） |
| tokens.tokenType | string | 令牌类型 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 注册成功 |
| 400 | 用户名已存在或参数错误 |

**请求示例**：

```json
{
  "username": "newuser",
  "password": "123456"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "user": {
      "id": 2,
      "username": "newuser",
      "createdAt": "2025-06-01T00:00:00.000Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
      "expiresIn": 3600,
      "tokenType": "Bearer"
    }
  },
  "message": "注册成功"
}
```

---

### POST /api/auth/refresh

**描述**：刷新 Token，用于 accessToken 过期后获取新的令牌

**认证**：不需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| refreshToken | string | 是 | 刷新令牌 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| user | User | 用户信息 |
| tokens | Tokens | 新的 Token 信息 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 刷新成功 |
| 401 | refreshToken 无效或已过期 |

**请求示例**：

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "user": {
      "id": 1,
      "username": "testuser",
      "createdAt": "2025-01-01T00:00:00.000Z"
    },
    "tokens": {
      "accessToken": "eyJhbGciOiJIUzI1NiIs...(新令牌)",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs...(新令牌)",
      "expiresIn": 3600,
      "tokenType": "Bearer"
    }
  },
  "message": "刷新成功"
}
```

---

### POST /api/auth/logout

**描述**：用户登出，使当前 refreshToken 失效

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| refreshToken | string | 是 | 需要失效的刷新令牌 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| message | string | 操作结果消息 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 登出成功 |

**请求示例**：

```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "message": "登出成功"
  },
  "message": "登出成功"
}
```

---

### POST /api/auth/logout-all

**描述**：全设备登出，使该用户所有 refreshToken 失效

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| message | string | 操作结果消息 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 全设备登出成功 |
| 401 | 未授权 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "message": "已登出所有设备"
  },
  "message": "已登出所有设备"
}
```

---

### GET /api/auth/profile

**描述**：获取当前登录用户信息

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| userId | number | 用户唯一标识 |
| username | string | 用户名 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |
| 401 | 未授权 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "userId": 1,
    "username": "testuser"
  },
  "message": "success"
}
```

---

## 3. 记账记录模块 `/api/records`

### GET /api/records/stats

**描述**：获取月度统计

**认证**：需要

**请求参数**（Query）：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| month | string | 否 | 月份，格式 "YYYY-MM"，不传则默认当月 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| totalExpense | number | 总支出 |
| totalIncome | number | 总收入 |
| budget | number | 预算金额（0 表示未设置） |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**请求示例**：

```
GET /api/records/stats?month=2025-06
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "totalExpense": 3500.50,
    "totalIncome": 10000.00,
    "budget": 5000.00
  },
  "message": "success"
}
```

---

### GET /api/records/recent

**描述**：获取最近 3 天的记账记录

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (数组) | RecordItem[] | 记录列表 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**响应示例**：

```json
{
  "code": 200,
  "data": [
    {
      "id": "rec_001",
      "type": "expense",
      "category": "饮食",
      "subCategory": "外卖",
      "categoryIcon": "🍜",
      "subCategoryIcon": "🛵",
      "amount": 35.00,
      "remark": "午餐",
      "date": 1719100800000,
      "account": "支付宝"
    }
  ],
  "message": "success"
}
```

---

### GET /api/records

**描述**：获取所有记录，支持日期范围和类型筛选

**认证**：需要

**请求参数**（Query）：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| startDate | string | 否 | 开始日期，格式 "YYYY-MM-DD" |
| endDate | string | 否 | 结束日期，格式 "YYYY-MM-DD" |
| type | string | 否 | 类型筛选："expense" 或 "income" |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (数组) | RecordItem[] | 记录列表 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**请求示例**：

```
GET /api/records?startDate=2025-06-01&endDate=2025-06-30&type=expense
```

**响应示例**：

```json
{
  "code": 200,
  "data": [
    {
      "id": "rec_001",
      "type": "expense",
      "category": "饮食",
      "subCategory": "外卖",
      "categoryIcon": "🍜",
      "subCategoryIcon": "🛵",
      "amount": 35.00,
      "remark": "午餐",
      "date": 1719100800000,
      "account": "支付宝"
    }
  ],
  "message": "success"
}
```

---

### GET /api/records/page

**描述**：分页获取记录

**认证**：需要

**请求参数**（Query）：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| page | number | 否 | 页码，默认 1 |
| pageSize | number | 否 | 每页数量，默认 20 |
| startDate | string | 否 | 开始日期，格式 "YYYY-MM-DD" |
| endDate | string | 否 | 结束日期，格式 "YYYY-MM-DD" |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| records | RecordItem[] | 当前页记录列表 |
| hasMore | boolean | 是否有更多数据 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**请求示例**：

```
GET /api/records/page?page=1&pageSize=20&startDate=2025-06-01
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "records": [
      {
        "id": "rec_001",
        "type": "expense",
        "category": "饮食",
        "subCategory": "外卖",
        "categoryIcon": "🍜",
        "subCategoryIcon": "🛵",
        "amount": 35.00,
        "remark": "午餐",
        "date": 1719100800000,
        "account": "支付宝"
      }
    ],
    "hasMore": true
  },
  "message": "success"
}
```

---

### GET /api/records/by-date

**描述**：按日期分组获取记录（游标分页），获取最近 N 个有记录的日期

**认证**：需要

**请求参数**（Query）：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| cursor | string | 否 | 上一页返回的 nextCursor，首次请求不传 |
| limit | number | 否 | 每次返回的日期分组数量，默认 7 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| data | DateGroup[] | 日期分组数据 |
| hasMore | boolean | 是否有更多数据 |
| nextCursor | string | 下一页游标 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**请求示例**：

```
GET /api/records/by-date?limit=7
GET /api/records/by-date?cursor=2025-06-15&limit=7
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "data": [
      {
        "date": "2025-06-20",
        "records": [
          {
            "id": "rec_001",
            "type": "expense",
            "category": "饮食",
            "subCategory": "外卖",
            "categoryIcon": "🍜",
            "subCategoryIcon": "🛵",
            "amount": 35.00,
            "remark": "午餐",
            "date": 1719100800000,
            "account": "支付宝"
          }
        ]
      }
    ],
    "hasMore": true,
    "nextCursor": "2025-06-13"
  },
  "message": "success"
}
```

---

### POST /api/records

**描述**：创建记账记录

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | string | 是 | "expense" 或 "income" |
| category | string | 是 | 主分类名称 |
| subCategory | string | 否 | 子分类名称 |
| categoryIcon | string | 是 | 主分类图标标识 |
| subCategoryIcon | string | 否 | 子分类图标标识 |
| amount | number | 是 | 金额 |
| remark | string | 是 | 备注，可为空字符串 |
| date | number | 是 | 日期时间戳（毫秒） |
| account | string | 是 | 关联账户名称 |
| tags | string[] | 否 | 标签列表 |
| source | string | 否 | 来源："manual"、"import"、"recurring"、"template" |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (对象) | RecordItem | 创建的完整记录（含 id） |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 创建成功 |
| 400 | 参数错误 |

**请求示例**：

```json
{
  "type": "expense",
  "category": "饮食",
  "subCategory": "外卖",
  "categoryIcon": "🍜",
  "subCategoryIcon": "🛵",
  "amount": 35.00,
  "remark": "午餐",
  "date": 1719100800000,
  "account": "支付宝",
  "source": "manual"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "id": "rec_002",
    "type": "expense",
    "category": "饮食",
    "subCategory": "外卖",
    "categoryIcon": "🍜",
    "subCategoryIcon": "🛵",
    "amount": 35.00,
    "remark": "午餐",
    "date": 1719100800000,
    "account": "支付宝",
    "source": "manual"
  },
  "message": "创建成功"
}
```

---

### PUT /api/records/:id

**描述**：更新记账记录

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | string | 否 | "expense" 或 "income" |
| category | string | 否 | 主分类名称 |
| subCategory | string | 否 | 子分类名称 |
| categoryIcon | string | 否 | 主分类图标标识 |
| subCategoryIcon | string | 否 | 子分类图标标识 |
| amount | number | 否 | 金额 |
| remark | string | 否 | 备注 |
| date | number | 否 | 日期时间戳（毫秒） |
| account | string | 否 | 关联账户名称 |
| tags | string[] | 否 | 标签列表 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (对象) | RecordItem | 更新后的完整记录 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 更新成功 |
| 404 | 记录不存在 |

**请求示例**：

```json
{
  "amount": 40.00,
  "remark": "午餐（涨价了）"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "id": "rec_001",
    "type": "expense",
    "category": "饮食",
    "subCategory": "外卖",
    "categoryIcon": "🍜",
    "subCategoryIcon": "🛵",
    "amount": 40.00,
    "remark": "午餐（涨价了）",
    "date": 1719100800000,
    "account": "支付宝"
  },
  "message": "更新成功"
}
```

---

### DELETE /api/records/:id

**描述**：删除记账记录

**认证**：需要

**请求参数**：无（id 在路径中）

**响应数据**：无（void）

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 删除成功 |
| 404 | 记录不存在 |

**响应示例**：

```json
{
  "code": 200,
  "data": null,
  "message": "删除成功"
}
```

---

### POST /api/records/import

**描述**：批量导入记账记录

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| records | Omit\<RecordItem, 'id'\>[] | 是 | 记录列表（不含 id） |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| success | number | 成功导入数量 |
| failed | number | 失败数量 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 导入完成 |
| 400 | 参数错误 |

**请求示例**：

```json
{
  "records": [
    {
      "type": "expense",
      "category": "饮食",
      "subCategory": "外卖",
      "categoryIcon": "🍜",
      "subCategoryIcon": "🛵",
      "amount": 35.00,
      "remark": "午餐",
      "date": 1719100800000,
      "account": "支付宝",
      "source": "import"
    },
    {
      "type": "income",
      "category": "工资",
      "categoryIcon": "💰",
      "amount": 10000.00,
      "remark": "6月工资",
      "date": 1719187200000,
      "account": "银行卡",
      "source": "import"
    }
  ]
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "success": 2,
    "failed": 0
  },
  "message": "导入完成"
}
```

---

### DELETE /api/records/import

**描述**：删除所有通过导入方式创建的记录（source 为 "import" 的记录）

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| deleted | number | 删除的记录数量 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 删除成功 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "deleted": 15
  },
  "message": "已删除所有导入记录"
}
```

---

### GET /api/records/filter

**描述**：筛选账单，支持多维度筛选并返回汇总信息

**认证**：需要

**请求参数**（Query）：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| year | number | 否 | 年份 |
| month | number | 否 | 月份（1-12） |
| startDate | string | 否 | 开始日期，格式 "YYYY-MM-DD" |
| endDate | string | 否 | 结束日期，格式 "YYYY-MM-DD" |
| type | string | 否 | 类型筛选："expense" 或 "income" |
| categories | string | 否 | 分类筛选列表，逗号分隔，如 "饮食,交通" |
| minAmount | number | 否 | 最小金额 |
| maxAmount | number | 否 | 最大金额 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| summary | BillSummary | 汇总信息 |
| summary.totalExpense | number | 总支出 |
| summary.totalIncome | number | 总收入 |
| summary.count | number | 记录数量 |
| records | RecordItem[] | 筛选后的记录列表 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**请求示例**：

```
GET /api/records/filter?year=2025&month=6&type=expense&minAmount=10&maxAmount=100
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "summary": {
      "totalExpense": 1500.00,
      "totalIncome": 0,
      "count": 25
    },
    "records": [
      {
        "id": "rec_001",
        "type": "expense",
        "category": "饮食",
        "subCategory": "外卖",
        "categoryIcon": "🍜",
        "subCategoryIcon": "🛵",
        "amount": 35.00,
        "remark": "午餐",
        "date": 1719100800000,
        "account": "支付宝"
      }
    ]
  },
  "message": "success"
}
```

---

### GET /api/records/report

**描述**：获取报表数据，包含汇总、每日统计和分类统计

**认证**：需要

**请求参数**（Query）：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| year | number | 否 | 年份，默认当年 |
| month | number | 否 | 月份（1-12），默认当月 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| period | object | 时间范围 |
| period.startDate | string | 开始日期 |
| period.endDate | string | 结束日期 |
| summary | object | 汇总信息 |
| summary.totalExpense | number | 总支出 |
| summary.totalIncome | number | 总收入 |
| summary.balance | number | 结余 |
| dailyStats | DailyStats[] | 每日统计列表 |
| dailyStats[].date | string | 日期字符串 |
| dailyStats[].expense | number | 当日支出 |
| dailyStats[].income | number | 当日收入 |
| categoryStats | object | 分类统计 |
| categoryStats.expense | CategoryStats[] | 支出分类统计 |
| categoryStats.income | CategoryStats[] | 收入分类统计 |
| categoryStats.[].category | string | 分类名称 |
| categoryStats.[].categoryIcon | string | 分类图标标识 |
| categoryStats.[].type | string | "expense" 或 "income" |
| categoryStats.[].amount | number | 金额 |
| categoryStats.[].percentage | number | 占比百分比（0-100） |
| categoryStats.[].count | number | 记录数量 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**请求示例**：

```
GET /api/records/report?year=2025&month=6
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "period": {
      "startDate": "2025-06-01",
      "endDate": "2025-06-30"
    },
    "summary": {
      "totalExpense": 3500.50,
      "totalIncome": 10000.00,
      "balance": 6499.50
    },
    "dailyStats": [
      {
        "date": "2025-06-01",
        "expense": 150.00,
        "income": 0
      },
      {
        "date": "2025-06-02",
        "expense": 80.00,
        "income": 10000.00
      }
    ],
    "categoryStats": {
      "expense": [
        {
          "category": "饮食",
          "categoryIcon": "🍜",
          "type": "expense",
          "amount": 1500.00,
          "percentage": 42.85,
          "count": 30
        }
      ],
      "income": [
        {
          "category": "工资",
          "categoryIcon": "💰",
          "type": "income",
          "amount": 10000.00,
          "percentage": 100,
          "count": 1
        }
      ]
    }
  },
  "message": "success"
}
```

---

### GET /api/records/duplicates

**描述**：检测重复记录，基于金额、日期、分类等维度进行相似度匹配

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| hasDuplicates | boolean | 是否存在重复记录 |
| totalDuplicates | number | 重复记录总数 |
| groups | DuplicateGroup[] | 重复分组列表 |
| groups[].groupId | number | 分组编号 |
| groups[].records | DuplicateRecord[] | 分组内的重复记录 |
| groups[].similarity | number | 相似度（0-1） |
| groups[].records[].id | string | 记录 ID |
| groups[].records[].type | string | "expense" 或 "income" |
| groups[].records[].category | string | 分类名称 |
| groups[].records[].amount | number | 金额 |
| groups[].records[].date | string | 日期字符串 |
| groups[].records[].remark | string | 备注 |
| groups[].records[].duplicateGroup | number | 重复分组编号 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 检测完成 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "hasDuplicates": true,
    "totalDuplicates": 2,
    "groups": [
      {
        "groupId": 1,
        "records": [
          {
            "id": "rec_001",
            "type": "expense",
            "category": "饮食",
            "amount": 35.00,
            "date": "2025-06-20",
            "remark": "午餐",
            "duplicateGroup": 1
          },
          {
            "id": "rec_002",
            "type": "expense",
            "category": "饮食",
            "amount": 35.00,
            "date": "2025-06-20",
            "remark": "午餐",
            "duplicateGroup": 1
          }
        ],
        "similarity": 1.0
      }
    ]
  },
  "message": "success"
}
```

---

### DELETE /api/records/duplicates

**描述**：删除重复记录（新接口），保留每组重复中最早的一条，删除其余

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| removed | number | 删除的记录数量 |
| message | string | 操作结果消息 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 删除成功 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "removed": 3,
    "message": "已删除3条重复记录"
  },
  "message": "已删除3条重复记录"
}
```

---

### DELETE /api/duplicates

**描述**：删除重复记录（旧接口，兼容保留）

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| removed | number | 删除的记录数量 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 删除成功 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "removed": 3
  },
  "message": "success"
}
```

---

## 4. 分类模块 `/api/categories`

### GET /api/categories

**描述**：获取所有分类，按类型分组返回

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| expense | Category[] | 支出分类列表 |
| income | Category[] | 收入分类列表 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "expense": [
      {
        "id": "expense_1",
        "name": "饮食",
        "icon": "🍜",
        "type": "expense",
        "color": "#FF6B6B",
        "subCategories": [
          {
            "id": "expense_1_1",
            "name": "买菜",
            "icon": "🥬"
          },
          {
            "id": "expense_1_2",
            "name": "外食",
            "icon": "🍽️"
          }
        ]
      }
    ],
    "income": [
      {
        "id": "income_1",
        "name": "工资",
        "icon": "💰",
        "type": "income",
        "subCategories": []
      }
    ]
  },
  "message": "success"
}
```

---

### GET /api/categories/expense

**描述**：获取支出分类列表

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (数组) | Category[] | 支出分类列表 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**响应示例**：

```json
{
  "code": 200,
  "data": [
    {
      "id": "expense_1",
      "name": "饮食",
      "icon": "🍜",
      "type": "expense",
      "color": "#FF6B6B",
      "subCategories": [
        {
          "id": "expense_1_1",
          "name": "买菜",
          "icon": "🥬"
        }
      ]
    }
  ],
  "message": "success"
}
```

---

### GET /api/categories/income

**描述**：获取收入分类列表

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (数组) | Category[] | 收入分类列表 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**响应示例**：

```json
{
  "code": 200,
  "data": [
    {
      "id": "income_1",
      "name": "工资",
      "icon": "💰",
      "type": "income",
      "subCategories": []
    }
  ],
  "message": "success"
}
```

---

### POST /api/categories

**描述**：创建分类

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 分类名称 |
| icon | string | 是 | 分类图标标识 |
| type | CategoryType | 是 | 分类类型："expense"、"income"、"transfer"、"debt"、"reimbursement" |
| color | string | 否 | 分类颜色 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (对象) | Category | 创建的完整分类 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 创建成功 |
| 400 | 参数错误或分类名重复 |

**请求示例**：

```json
{
  "name": "学习",
  "icon": "📖",
  "type": "expense",
  "color": "#4ECDC4"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "id": "expense_15",
    "name": "学习",
    "icon": "📖",
    "type": "expense",
    "color": "#4ECDC4",
    "subCategories": []
  },
  "message": "创建成功"
}
```

---

### PUT /api/categories/:id

**描述**：更新分类

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 否 | 分类名称 |
| icon | string | 否 | 分类图标标识 |
| color | string | 否 | 分类颜色 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (对象) | Category | 更新后的完整分类 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 更新成功 |
| 404 | 分类不存在 |

**请求示例**：

```json
{
  "name": "餐饮",
  "icon": "🍽️"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "id": "expense_1",
    "name": "餐饮",
    "icon": "🍽️",
    "type": "expense",
    "color": "#FF6B6B",
    "subCategories": []
  },
  "message": "更新成功"
}
```

---

### DELETE /api/categories/:id

**描述**：删除分类

**认证**：需要

**请求参数**：无（id 在路径中）

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| message | string | 操作结果消息 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 删除成功 |
| 404 | 分类不存在 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "message": "删除成功"
  },
  "message": "删除成功"
}
```

---

## 5. 预算模块 `/api/budgets`

### GET /api/budgets/current

**描述**：获取当前月预算

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| budget | BudgetResponse \| null | 预算信息，未设置时为 null |
| message | string | 可选，提示信息 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "budget": {
      "id": "budget_001",
      "year": 2025,
      "month": 6,
      "amount": 5000.00,
      "spent": 3500.50,
      "remaining": 1499.50,
      "percentage": 70.01
    },
    "message": "当前月预算"
  },
  "message": "success"
}
```

**未设置预算时**：

```json
{
  "code": 200,
  "data": {
    "budget": null,
    "message": "未设置当月预算"
  },
  "message": "success"
}
```

---

### GET /api/budgets/month

**描述**：获取指定月份预算

**认证**：需要

**请求参数**（Query）：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| year | number | 是 | 年份 |
| month | number | 是 | 月份（1-12） |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| budget | BudgetResponse \| null | 预算信息，未设置时为 null |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**请求示例**：

```
GET /api/budgets/month?year=2025&month=5
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "budget": {
      "id": "budget_002",
      "year": 2025,
      "month": 5,
      "amount": 5000.00,
      "spent": 4800.00,
      "remaining": 200.00,
      "percentage": 96.0
    }
  },
  "message": "success"
}
```

---

### POST /api/budgets

**描述**：设置预算（创建或更新），若该月已有预算则更新

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| amount | number | 是 | 预算金额 |
| year | number | 否 | 年份，默认当年 |
| month | number | 否 | 月份，默认当月 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| budget | BudgetResponse | 预算信息 |
| message | string | 操作结果消息 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 设置成功 |
| 400 | 参数错误 |

**请求示例**：

```json
{
  "amount": 5000.00,
  "year": 2025,
  "month": 6
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "budget": {
      "id": "budget_001",
      "year": 2025,
      "month": 6,
      "amount": 5000.00,
      "spent": 3500.50,
      "remaining": 1499.50,
      "percentage": 70.01
    },
    "message": "预算设置成功"
  },
  "message": "预算设置成功"
}
```

---

### DELETE /api/budgets

**描述**：删除指定月份预算

**认证**：需要

**请求参数**（Query）：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| year | number | 是 | 年份 |
| month | number | 是 | 月份（1-12） |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| message | string | 操作结果消息 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 删除成功 |
| 404 | 预算不存在 |

**请求示例**：

```
DELETE /api/budgets?year=2025&month=6
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "message": "预算已删除"
  },
  "message": "预算已删除"
}
```

---

### GET /api/budgets/stats

**描述**：获取预算统计

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| currentMonth | BudgetResponse \| null | 当前月预算 |
| lastMonth | BudgetResponse \| null | 上月预算 |
| averageSpent | number | 近 6 个月平均支出 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "currentMonth": {
      "id": "budget_001",
      "year": 2025,
      "month": 6,
      "amount": 5000.00,
      "spent": 3500.50,
      "remaining": 1499.50,
      "percentage": 70.01
    },
    "lastMonth": {
      "id": "budget_002",
      "year": 2025,
      "month": 5,
      "amount": 5000.00,
      "spent": 4800.00,
      "remaining": 200.00,
      "percentage": 96.0
    },
    "averageSpent": 4200.00
  },
  "message": "success"
}
```

---

### GET /api/budgets/recent

**描述**：获取最近几个月预算

**认证**：需要

**请求参数**（Query）：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| months | number | 否 | 查询月数，默认 6 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| budgets | BudgetResponse[] | 预算列表 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**请求示例**：

```
GET /api/budgets/recent?months=6
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "budgets": [
      {
        "id": "budget_001",
        "year": 2025,
        "month": 6,
        "amount": 5000.00,
        "spent": 3500.50,
        "remaining": 1499.50,
        "percentage": 70.01
      },
      {
        "id": "budget_002",
        "year": 2025,
        "month": 5,
        "amount": 5000.00,
        "spent": 4800.00,
        "remaining": 200.00,
        "percentage": 96.0
      }
    ]
  },
  "message": "success"
}
```

---

## 6. 储蓄目标模块 `/api/savings/goals`

### GET /api/savings/goals

**描述**：获取所有储蓄目标

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (数组) | SavingsGoal[] | 储蓄目标列表 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**响应示例**：

```json
{
  "code": 200,
  "data": [
    {
      "id": "goal_001",
      "name": "旅行基金",
      "targetAmount": 10000.00,
      "currentAmount": 3500.00,
      "deadline": "2025-12-31",
      "icon": "✈️",
      "color": "#4ECDC4",
      "percentage": 35.0,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-06-20T00:00:00.000Z"
    }
  ],
  "message": "success"
}
```

---

### POST /api/savings/goals

**描述**：创建储蓄目标

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 目标名称 |
| targetAmount | number | 是 | 目标金额 |
| deadline | string | 否 | 截止日期，格式 "YYYY-MM-DD" |
| icon | string | 是 | 图标标识 |
| color | string | 是 | 颜色 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (对象) | SavingsGoal | 创建的完整储蓄目标 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 创建成功 |
| 400 | 参数错误 |

**请求示例**：

```json
{
  "name": "旅行基金",
  "targetAmount": 10000.00,
  "deadline": "2025-12-31",
  "icon": "✈️",
  "color": "#4ECDC4"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "id": "goal_001",
    "name": "旅行基金",
    "targetAmount": 10000.00,
    "currentAmount": 0,
    "deadline": "2025-12-31",
    "icon": "✈️",
    "color": "#4ECDC4",
    "percentage": 0,
    "createdAt": "2025-06-20T00:00:00.000Z",
    "updatedAt": "2025-06-20T00:00:00.000Z"
  },
  "message": "创建成功"
}
```

---

### PUT /api/savings/goals/:id

**描述**：更新储蓄目标

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 否 | 目标名称 |
| targetAmount | number | 否 | 目标金额 |
| deadline | string | 否 | 截止日期 |
| icon | string | 否 | 图标标识 |
| color | string | 否 | 颜色 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (对象) | SavingsGoal | 更新后的完整储蓄目标 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 更新成功 |
| 404 | 目标不存在 |

**请求示例**：

```json
{
  "targetAmount": 15000.00,
  "deadline": "2026-06-30"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "id": "goal_001",
    "name": "旅行基金",
    "targetAmount": 15000.00,
    "currentAmount": 3500.00,
    "deadline": "2026-06-30",
    "icon": "✈️",
    "color": "#4ECDC4",
    "percentage": 23.33,
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-06-20T00:00:00.000Z"
  },
  "message": "更新成功"
}
```

---

### DELETE /api/savings/goals/:id

**描述**：删除储蓄目标

**认证**：需要

**请求参数**：无（id 在路径中）

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| message | string | 操作结果消息 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 删除成功 |
| 404 | 目标不存在 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "message": "删除成功"
  },
  "message": "删除成功"
}
```

---

### POST /api/savings/goals/:id/deposit

**描述**：向储蓄目标存钱

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| amount | number | 是 | 存款金额 |
| remark | string | 否 | 备注 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| goal | SavingsGoal | 更新后的储蓄目标 |
| message | string | 操作结果消息 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 存款成功 |
| 400 | 金额错误（如超过目标金额） |
| 404 | 目标不存在 |

**请求示例**：

```json
{
  "amount": 1000.00,
  "remark": "6月存款"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "goal": {
      "id": "goal_001",
      "name": "旅行基金",
      "targetAmount": 10000.00,
      "currentAmount": 4500.00,
      "deadline": "2025-12-31",
      "icon": "✈️",
      "color": "#4ECDC4",
      "percentage": 45.0,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-06-20T00:00:00.000Z"
    },
    "message": "存款成功"
  },
  "message": "存款成功"
}
```

---

### POST /api/savings/goals/:id/withdraw

**描述**：从储蓄目标取钱

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| amount | number | 是 | 取款金额 |
| remark | string | 否 | 备注 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| goal | SavingsGoal | 更新后的储蓄目标 |
| message | string | 操作结果消息 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 取款成功 |
| 400 | 金额错误（如超过当前余额） |
| 404 | 目标不存在 |

**请求示例**：

```json
{
  "amount": 500.00,
  "remark": "紧急取款"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "goal": {
      "id": "goal_001",
      "name": "旅行基金",
      "targetAmount": 10000.00,
      "currentAmount": 3000.00,
      "deadline": "2025-12-31",
      "icon": "✈️",
      "color": "#4ECDC4",
      "percentage": 30.0,
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-06-20T00:00:00.000Z"
    },
    "message": "取款成功"
  },
  "message": "取款成功"
}
```

---

### GET /api/savings/summary

**描述**：获取储蓄统计

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| totalGoals | number | 目标总数 |
| totalTarget | number | 目标总金额 |
| totalSaved | number | 已存总额 |
| totalRemaining | number | 剩余总额 |
| completedGoals | number | 已完成目标数 |
| inProgressGoals | number | 进行中目标数 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "totalGoals": 3,
    "totalTarget": 30000.00,
    "totalSaved": 12000.00,
    "totalRemaining": 18000.00,
    "completedGoals": 1,
    "inProgressGoals": 2
  },
  "message": "success"
}
```

---

## 7. 攒钱计划模块 `/api/savings/plans`

### GET /api/savings/plans

**描述**：获取所有攒钱计划

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (数组) | SavingsPlan[] | 攒钱计划列表 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**响应示例**：

```json
{
  "code": 200,
  "data": [
    {
      "id": "plan_001",
      "name": "365天攒钱计划",
      "targetAmount": 66795.00,
      "savedAmount": 15000.00,
      "startDate": "2025-01-01",
      "endDate": "2025-12-31",
      "dailyAverage": 183.00,
      "percentage": 22.46,
      "status": "active",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-06-20T00:00:00.000Z"
    }
  ],
  "message": "success"
}
```

---

### POST /api/savings/plans

**描述**：创建攒钱计划

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 计划名称 |
| targetAmount | number | 是 | 目标金额 |
| endDate | string | 是 | 结束日期，格式 "YYYY-MM-DD" |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (对象) | SavingsPlan | 创建的完整攒钱计划 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 创建成功 |
| 400 | 参数错误 |

**请求示例**：

```json
{
  "name": "365天攒钱计划",
  "targetAmount": 66795.00,
  "endDate": "2025-12-31"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "id": "plan_001",
    "name": "365天攒钱计划",
    "targetAmount": 66795.00,
    "savedAmount": 0,
    "startDate": "2025-06-20",
    "endDate": "2025-12-31",
    "dailyAverage": 365.00,
    "percentage": 0,
    "status": "active",
    "createdAt": "2025-06-20T00:00:00.000Z",
    "updatedAt": "2025-06-20T00:00:00.000Z"
  },
  "message": "创建成功"
}
```

---

### PUT /api/savings/plans/:id

**描述**：更新攒钱计划

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 否 | 计划名称 |
| targetAmount | number | 否 | 目标金额 |
| endDate | string | 否 | 结束日期 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (对象) | SavingsPlan | 更新后的完整攒钱计划 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 更新成功 |
| 404 | 计划不存在 |

**请求示例**：

```json
{
  "targetAmount": 80000.00,
  "endDate": "2026-06-30"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "id": "plan_001",
    "name": "365天攒钱计划",
    "targetAmount": 80000.00,
    "savedAmount": 15000.00,
    "startDate": "2025-01-01",
    "endDate": "2026-06-30",
    "dailyAverage": 150.00,
    "percentage": 18.75,
    "status": "active",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-06-20T00:00:00.000Z"
  },
  "message": "更新成功"
}
```

---

### DELETE /api/savings/plans/:id

**描述**：删除攒钱计划

**认证**：需要

**请求参数**：无（id 在路径中）

**响应数据**：无（void）

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 删除成功 |
| 404 | 计划不存在 |

**响应示例**：

```json
{
  "code": 200,
  "data": null,
  "message": "删除成功"
}
```

---

### POST /api/savings/plans/:planId/deposit

**描述**：向攒钱计划存款

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| amount | number | 是 | 存款金额 |
| type | string | 是 | 存款类型："average"（均摊）、"random"（随机）、"manual"（手动） |
| remark | string | 否 | 备注 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (对象) | SavingsDeposit | 存款记录 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 存款成功 |
| 400 | 参数错误 |
| 404 | 计划不存在 |

**请求示例**：

```json
{
  "amount": 183.00,
  "type": "average",
  "remark": "第172天"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "id": "deposit_001",
    "planId": "plan_001",
    "amount": 183.00,
    "type": "average",
    "remark": "第172天",
    "createdAt": "2025-06-20T00:00:00.000Z"
  },
  "message": "存款成功"
}
```

---

### GET /api/savings/plans/:planId/deposits

**描述**：获取攒钱计划的存款记录

**认证**：需要

**请求参数**：无（planId 在路径中）

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (数组) | SavingsDeposit[] | 存款记录列表 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |
| 404 | 计划不存在 |

**响应示例**：

```json
{
  "code": 200,
  "data": [
    {
      "id": "deposit_001",
      "planId": "plan_001",
      "amount": 183.00,
      "type": "average",
      "remark": "第172天",
      "createdAt": "2025-06-20T00:00:00.000Z"
    },
    {
      "id": "deposit_002",
      "planId": "plan_001",
      "amount": 50.00,
      "type": "random",
      "remark": "随机存款",
      "createdAt": "2025-06-19T00:00:00.000Z"
    }
  ],
  "message": "success"
}
```

---

## 8. 借贷管理模块 `/api/debts`

### GET /api/debts

**描述**：获取借贷列表

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (数组) | Debt[] | 借贷记录列表 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**响应示例**：

```json
{
  "code": 200,
  "data": [
    {
      "id": "debt_001",
      "type": "lend",
      "personName": "张三",
      "amount": 5000.00,
      "repaidAmount": 2000.00,
      "remainingAmount": 3000.00,
      "date": "2025-03-15",
      "expectedRepayDate": "2025-09-15",
      "remark": "借款周转",
      "status": "partial",
      "repayRecords": [
        {
          "id": "repay_001",
          "amount": 2000.00,
          "remark": "第一次还款",
          "date": "2025-05-15"
        }
      ],
      "createdAt": "2025-03-15T00:00:00.000Z",
      "updatedAt": "2025-05-15T00:00:00.000Z"
    }
  ],
  "message": "success"
}
```

---

### POST /api/debts

**描述**：创建借贷记录

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | DebtType | 是 | "lend"（借出）或 "borrow"（借入） |
| personName | string | 是 | 对方姓名 |
| amount | number | 是 | 借贷金额 |
| date | string | 是 | 借贷日期，格式 "YYYY-MM-DD" |
| expectedRepayDate | string | 否 | 预计还款日期 |
| remark | string | 否 | 备注 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (对象) | Debt | 创建的完整借贷记录 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 创建成功 |
| 400 | 参数错误 |

**请求示例**：

```json
{
  "type": "lend",
  "personName": "张三",
  "amount": 5000.00,
  "date": "2025-03-15",
  "expectedRepayDate": "2025-09-15",
  "remark": "借款周转"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "id": "debt_001",
    "type": "lend",
    "personName": "张三",
    "amount": 5000.00,
    "repaidAmount": 0,
    "remainingAmount": 5000.00,
    "date": "2025-03-15",
    "expectedRepayDate": "2025-09-15",
    "remark": "借款周转",
    "status": "pending",
    "repayRecords": [],
    "createdAt": "2025-03-15T00:00:00.000Z",
    "updatedAt": "2025-03-15T00:00:00.000Z"
  },
  "message": "创建成功"
}
```

---

### PUT /api/debts/:id

**描述**：更新借贷记录

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | DebtType | 否 | 借贷类型 |
| personName | string | 否 | 对方姓名 |
| amount | number | 否 | 借贷金额 |
| date | string | 否 | 借贷日期 |
| expectedRepayDate | string | 否 | 预计还款日期 |
| remark | string | 否 | 备注 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (对象) | Debt | 更新后的完整借贷记录 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 更新成功 |
| 404 | 记录不存在 |

**请求示例**：

```json
{
  "remark": "已部分还款",
  "expectedRepayDate": "2025-12-15"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "id": "debt_001",
    "type": "lend",
    "personName": "张三",
    "amount": 5000.00,
    "repaidAmount": 2000.00,
    "remainingAmount": 3000.00,
    "date": "2025-03-15",
    "expectedRepayDate": "2025-12-15",
    "remark": "已部分还款",
    "status": "partial",
    "repayRecords": [],
    "createdAt": "2025-03-15T00:00:00.000Z",
    "updatedAt": "2025-06-20T00:00:00.000Z"
  },
  "message": "更新成功"
}
```

---

### DELETE /api/debts/:id

**描述**：删除借贷记录

**认证**：需要

**请求参数**：无（id 在路径中）

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| message | string | 操作结果消息 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 删除成功 |
| 404 | 记录不存在 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "message": "删除成功"
  },
  "message": "删除成功"
}
```

---

### POST /api/debts/:id/repay

**描述**：记录还款

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| amount | number | 是 | 还款金额 |
| remark | string | 否 | 备注 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| debt | Debt | 更新后的借贷记录 |
| message | string | 操作结果消息 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 还款成功 |
| 400 | 还款金额超过剩余金额 |
| 404 | 记录不存在 |

**请求示例**：

```json
{
  "amount": 2000.00,
  "remark": "第一次还款"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "debt": {
      "id": "debt_001",
      "type": "lend",
      "personName": "张三",
      "amount": 5000.00,
      "repaidAmount": 2000.00,
      "remainingAmount": 3000.00,
      "date": "2025-03-15",
      "expectedRepayDate": "2025-09-15",
      "remark": "借款周转",
      "status": "partial",
      "repayRecords": [
        {
          "id": "repay_001",
          "amount": 2000.00,
          "remark": "第一次还款",
          "date": "2025-06-20"
        }
      ],
      "createdAt": "2025-03-15T00:00:00.000Z",
      "updatedAt": "2025-06-20T00:00:00.000Z"
    },
    "message": "还款成功"
  },
  "message": "还款成功"
}
```

---

### GET /api/debts/summary

**描述**：获取借贷统计

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| totalLent | number | 借出总额 |
| totalBorrowed | number | 借入总额 |
| totalRepaid | number | 已还总额 |
| totalRemaining | number | 剩余总额 |
| pendingLent | number | 待收回借出金额 |
| pendingBorrowed | number | 待偿还借入金额 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "totalLent": 10000.00,
    "totalBorrowed": 3000.00,
    "totalRepaid": 5000.00,
    "totalRemaining": 8000.00,
    "pendingLent": 5000.00,
    "pendingBorrowed": 3000.00
  },
  "message": "success"
}
```

---

## 9. 周期记账模块 `/api/recurring`

### GET /api/recurring

**描述**：获取周期记账列表

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (数组) | RecurringRecord[] | 周期记账列表 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**响应示例**：

```json
{
  "code": 200,
  "data": [
    {
      "id": "recur_001",
      "type": "expense",
      "category": "住房",
      "subCategory": "房租",
      "categoryIcon": "🏠",
      "amount": 3000.00,
      "remark": "月租",
      "frequency": "monthly",
      "startDate": "2025-01-01",
      "endDate": null,
      "account": "银行卡",
      "isActive": true,
      "nextExecuteDate": "2025-07-01",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-06-01T00:00:00.000Z"
    }
  ],
  "message": "success"
}
```

---

### POST /api/recurring

**描述**：创建周期记账

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | string | 是 | "expense" 或 "income" |
| category | string | 是 | 主分类名称 |
| subCategory | string | 否 | 子分类名称 |
| categoryIcon | string | 是 | 主分类图标标识 |
| amount | number | 是 | 金额 |
| remark | string | 是 | 备注 |
| frequency | FrequencyType | 是 | 周期频率："daily"、"workday"、"weekly"、"monthly"、"yearly" |
| startDate | string | 是 | 开始日期，格式 "YYYY-MM-DD" |
| endDate | string | 否 | 结束日期 |
| account | string | 是 | 关联账户名称 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (对象) | RecurringRecord | 创建的完整周期记账 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 创建成功 |
| 400 | 参数错误 |

**请求示例**：

```json
{
  "type": "expense",
  "category": "住房",
  "subCategory": "房租",
  "categoryIcon": "🏠",
  "amount": 3000.00,
  "remark": "月租",
  "frequency": "monthly",
  "startDate": "2025-01-01",
  "account": "银行卡"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "id": "recur_001",
    "type": "expense",
    "category": "住房",
    "subCategory": "房租",
    "categoryIcon": "🏠",
    "amount": 3000.00,
    "remark": "月租",
    "frequency": "monthly",
    "startDate": "2025-01-01",
    "endDate": null,
    "account": "银行卡",
    "isActive": true,
    "nextExecuteDate": "2025-07-01",
    "createdAt": "2025-06-20T00:00:00.000Z",
    "updatedAt": "2025-06-20T00:00:00.000Z"
  },
  "message": "创建成功"
}
```

---

### PUT /api/recurring/:id

**描述**：更新周期记账

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| type | string | 否 | 类型 |
| category | string | 否 | 主分类名称 |
| subCategory | string | 否 | 子分类名称 |
| categoryIcon | string | 否 | 主分类图标标识 |
| amount | number | 否 | 金额 |
| remark | string | 否 | 备注 |
| frequency | FrequencyType | 否 | 周期频率 |
| startDate | string | 否 | 开始日期 |
| endDate | string | 否 | 结束日期 |
| account | string | 否 | 关联账户名称 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (对象) | RecurringRecord | 更新后的完整周期记账 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 更新成功 |
| 404 | 记录不存在 |

**请求示例**：

```json
{
  "amount": 3200.00,
  "remark": "月租（涨价）"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "id": "recur_001",
    "type": "expense",
    "category": "住房",
    "subCategory": "房租",
    "categoryIcon": "🏠",
    "amount": 3200.00,
    "remark": "月租（涨价）",
    "frequency": "monthly",
    "startDate": "2025-01-01",
    "endDate": null,
    "account": "银行卡",
    "isActive": true,
    "nextExecuteDate": "2025-07-01",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-06-20T00:00:00.000Z"
  },
  "message": "更新成功"
}
```

---

### DELETE /api/recurring/:id

**描述**：删除周期记账

**认证**：需要

**请求参数**：无（id 在路径中）

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| message | string | 操作结果消息 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 删除成功 |
| 404 | 记录不存在 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "message": "删除成功"
  },
  "message": "删除成功"
}
```

---

### POST /api/recurring/:id/toggle

**描述**：切换周期记账的启用/禁用状态

**认证**：需要

**请求参数**：无（id 在路径中）

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| recurring | RecurringRecord | 更新后的周期记账 |
| message | string | 操作结果消息 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 切换成功 |
| 404 | 记录不存在 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "recurring": {
      "id": "recur_001",
      "type": "expense",
      "category": "住房",
      "subCategory": "房租",
      "categoryIcon": "🏠",
      "amount": 3000.00,
      "remark": "月租",
      "frequency": "monthly",
      "startDate": "2025-01-01",
      "endDate": null,
      "account": "银行卡",
      "isActive": false,
      "nextExecuteDate": "2025-07-01",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-06-20T00:00:00.000Z"
    },
    "message": "已停用"
  },
  "message": "已停用"
}
```

---

### GET /api/recurring/summary

**描述**：获取周期记账统计

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| totalActive | number | 活跃记录数 |
| totalInactive | number | 停用记录数 |
| monthlyEstimatedExpense | number | 月度预计支出 |
| monthlyEstimatedIncome | number | 月度预计收入 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "totalActive": 5,
    "totalInactive": 2,
    "monthlyEstimatedExpense": 4500.00,
    "monthlyEstimatedIncome": 0
  },
  "message": "success"
}
```

---

## 10. 账户管理模块 `/api/accounts`

### GET /api/accounts

**描述**：获取账户列表

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (数组) | Account[] | 账户列表 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**响应示例**：

```json
{
  "code": 200,
  "data": [
    {
      "id": "acc_001",
      "name": "支付宝",
      "type": "alipay",
      "icon": "alipay",
      "balance": 5000.00,
      "initialBalance": 3000.00,
      "isDefault": true,
      "color": "#1677FF",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-06-20T00:00:00.000Z"
    },
    {
      "id": "acc_002",
      "name": "银行卡",
      "type": "bank",
      "icon": "bank",
      "balance": 20000.00,
      "initialBalance": 15000.00,
      "isDefault": false,
      "color": "#52C41A",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-06-20T00:00:00.000Z"
    }
  ],
  "message": "success"
}
```

---

### POST /api/accounts

**描述**：创建账户

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 账户名称 |
| type | AccountType | 是 | 账户类型："cash"、"bank"、"alipay"、"wechat"、"credit"、"other" |
| icon | string | 是 | 账户图标标识 |
| initialBalance | number | 是 | 初始余额 |
| isDefault | boolean | 否 | 是否为默认账户，默认 false |
| color | string | 否 | 账户颜色 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (对象) | Account | 创建的完整账户 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 创建成功 |
| 400 | 参数错误 |

**请求示例**：

```json
{
  "name": "微信钱包",
  "type": "wechat",
  "icon": "wechat",
  "initialBalance": 1000.00,
  "isDefault": false,
  "color": "#07C160"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "id": "acc_003",
    "name": "微信钱包",
    "type": "wechat",
    "icon": "wechat",
    "balance": 1000.00,
    "initialBalance": 1000.00,
    "isDefault": false,
    "color": "#07C160",
    "createdAt": "2025-06-20T00:00:00.000Z",
    "updatedAt": "2025-06-20T00:00:00.000Z"
  },
  "message": "创建成功"
}
```

---

### PUT /api/accounts/:id

**描述**：更新账户

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 否 | 账户名称 |
| type | AccountType | 否 | 账户类型 |
| icon | string | 否 | 账户图标标识 |
| initialBalance | number | 否 | 初始余额 |
| isDefault | boolean | 否 | 是否为默认账户 |
| color | string | 否 | 账户颜色 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (对象) | Account | 更新后的完整账户 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 更新成功 |
| 404 | 账户不存在 |

**请求示例**：

```json
{
  "name": "支付宝（主）",
  "isDefault": true
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "id": "acc_001",
    "name": "支付宝（主）",
    "type": "alipay",
    "icon": "alipay",
    "balance": 5000.00,
    "initialBalance": 3000.00,
    "isDefault": true,
    "color": "#1677FF",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-06-20T00:00:00.000Z"
  },
  "message": "更新成功"
}
```

---

### DELETE /api/accounts/:id

**描述**：删除账户

**认证**：需要

**请求参数**：无（id 在路径中）

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| message | string | 操作结果消息 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 删除成功 |
| 404 | 账户不存在 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "message": "删除成功"
  },
  "message": "删除成功"
}
```

---

### POST /api/accounts/:id/adjust

**描述**：调整账户余额

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| newBalance | number | 是 | 新余额 |
| remark | string | 否 | 备注 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| account | Account | 更新后的账户 |
| message | string | 操作结果消息 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 调整成功 |
| 404 | 账户不存在 |

**请求示例**：

```json
{
  "newBalance": 4500.00,
  "remark": "核对余额"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "account": {
      "id": "acc_001",
      "name": "支付宝",
      "type": "alipay",
      "icon": "alipay",
      "balance": 4500.00,
      "initialBalance": 3000.00,
      "isDefault": true,
      "color": "#1677FF",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-06-20T00:00:00.000Z"
    },
    "message": "余额调整成功"
  },
  "message": "余额调整成功"
}
```

---

### GET /api/accounts/summary

**描述**：获取账户统计

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| totalAccounts | number | 账户总数 |
| totalBalance | number | 余额总计 |
| accountTypeSummary | object[] | 按账户类型汇总 |
| accountTypeSummary[].type | AccountType | 账户类型 |
| accountTypeSummary[].count | number | 该类型账户数量 |
| accountTypeSummary[].totalBalance | number | 该类型余额总计 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "totalAccounts": 3,
    "totalBalance": 26000.00,
    "accountTypeSummary": [
      {
        "type": "alipay",
        "count": 1,
        "totalBalance": 5000.00
      },
      {
        "type": "bank",
        "count": 1,
        "totalBalance": 20000.00
      },
      {
        "type": "wechat",
        "count": 1,
        "totalBalance": 1000.00
      }
    ]
  },
  "message": "success"
}
```

---

## 11. 账单模板模块 `/api/templates`

### GET /api/templates

**描述**：获取模板列表

**认证**：需要

**请求参数**：无

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (数组) | BillTemplate[] | 模板列表 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 获取成功 |

**响应示例**：

```json
{
  "code": 200,
  "data": [
    {
      "id": "tpl_001",
      "name": "午餐",
      "type": "expense",
      "category": "饮食",
      "subCategory": "外卖",
      "categoryIcon": "🍜",
      "amount": 30.00,
      "remark": "工作日午餐",
      "account": "支付宝",
      "createdAt": "2025-01-01T00:00:00.000Z",
      "updatedAt": "2025-01-01T00:00:00.000Z"
    }
  ],
  "message": "success"
}
```

---

### POST /api/templates

**描述**：创建模板

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 是 | 模板名称 |
| type | string | 是 | "expense" 或 "income" |
| category | string | 是 | 主分类名称 |
| subCategory | string | 否 | 子分类名称 |
| categoryIcon | string | 是 | 主分类图标标识 |
| amount | number | 否 | 金额（模板可不指定金额） |
| remark | string | 否 | 备注 |
| account | string | 是 | 关联账户名称 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (对象) | BillTemplate | 创建的完整模板 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 创建成功 |
| 400 | 参数错误 |

**请求示例**：

```json
{
  "name": "午餐",
  "type": "expense",
  "category": "饮食",
  "subCategory": "外卖",
  "categoryIcon": "🍜",
  "amount": 30.00,
  "remark": "工作日午餐",
  "account": "支付宝"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "id": "tpl_001",
    "name": "午餐",
    "type": "expense",
    "category": "饮食",
    "subCategory": "外卖",
    "categoryIcon": "🍜",
    "amount": 30.00,
    "remark": "工作日午餐",
    "account": "支付宝",
    "createdAt": "2025-06-20T00:00:00.000Z",
    "updatedAt": "2025-06-20T00:00:00.000Z"
  },
  "message": "创建成功"
}
```

---

### PUT /api/templates/:id

**描述**：更新模板

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | string | 否 | 模板名称 |
| type | string | 否 | 类型 |
| category | string | 否 | 主分类名称 |
| subCategory | string | 否 | 子分类名称 |
| categoryIcon | string | 否 | 主分类图标标识 |
| amount | number | 否 | 金额 |
| remark | string | 否 | 备注 |
| account | string | 否 | 关联账户名称 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| (对象) | BillTemplate | 更新后的完整模板 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 更新成功 |
| 404 | 模板不存在 |

**请求示例**：

```json
{
  "amount": 35.00,
  "remark": "午餐（涨价）"
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "id": "tpl_001",
    "name": "午餐",
    "type": "expense",
    "category": "饮食",
    "subCategory": "外卖",
    "categoryIcon": "🍜",
    "amount": 35.00,
    "remark": "午餐（涨价）",
    "account": "支付宝",
    "createdAt": "2025-01-01T00:00:00.000Z",
    "updatedAt": "2025-06-20T00:00:00.000Z"
  },
  "message": "更新成功"
}
```

---

### DELETE /api/templates/:id

**描述**：删除模板

**认证**：需要

**请求参数**：无（id 在路径中）

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| message | string | 操作结果消息 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 删除成功 |
| 404 | 模板不存在 |

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "message": "删除成功"
  },
  "message": "删除成功"
}
```

---

### POST /api/templates/:id/use

**描述**：使用模板创建记账记录

**认证**：需要

**请求参数**：

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| date | string | 否 | 指定日期，格式 "YYYY-MM-DD"，默认当天 |
| amount | number | 否 | 指定金额，默认使用模板金额 |
| remark | string | 否 | 指定备注，默认使用模板备注 |

**响应数据**：

| 字段 | 类型 | 说明 |
|------|------|------|
| record | RecordItem | 创建的记账记录 |
| message | string | 操作结果消息 |

**状态码**：

| 状态码 | 说明 |
|--------|------|
| 200 | 使用成功 |
| 404 | 模板不存在 |

**请求示例**：

```json
{
  "date": "2025-06-20",
  "amount": 35.00
}
```

**响应示例**：

```json
{
  "code": 200,
  "data": {
    "record": {
      "id": "rec_003",
      "type": "expense",
      "category": "饮食",
      "subCategory": "外卖",
      "categoryIcon": "🍜",
      "subCategoryIcon": "🛵",
      "amount": 35.00,
      "remark": "工作日午餐",
      "date": 1719100800000,
      "account": "支付宝",
      "source": "template"
    },
    "message": "已使用模板创建记录"
  },
  "message": "已使用模板创建记录"
}
```

---

## 12. 数据结构参考

> 以下类型定义来源于 `src/types/types.ts`，后端开发时应确保数据结构与前端类型定义一致。

### 12.1 认证相关

```typescript
interface User {
  id: number;
  username: string;
  createdAt: string;
  avatar?: string;
  email?: string;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

interface AuthResponse {
  user: User;
  tokens: Tokens;
}

interface LoginParams {
  username: string;
  password: string;
}

interface RegisterParams {
  username: string;
  password: string;
}

interface RefreshParams {
  refreshToken: string;
}
```

### 12.2 记账记录相关

```typescript
interface RecordItem {
  id: string;
  type: 'expense' | 'income';
  category: string;
  subCategory?: string;
  categoryIcon: string;
  subCategoryIcon?: string;
  amount: number;
  remark: string;
  date: number;            // 毫秒时间戳
  account: string;
  tags?: string[];
  source?: 'manual' | 'import' | 'recurring' | 'template';
}

interface MonthlyStats {
  totalExpense: number;
  totalIncome: number;
  budget: number;
}

interface DateGroup {
  date: string;
  records: RecordItem[];
}

interface RecordsByDateResponse {
  data: DateGroup[];
  hasMore: boolean;
  nextCursor?: string;
}

interface BillFilterParams {
  year?: number;
  month?: number;
  startDate?: string;
  endDate?: string;
  type?: 'expense' | 'income';
  categories?: string[];
  minAmount?: number;
  maxAmount?: number;
}

interface BillSummary {
  totalExpense: number;
  totalIncome: number;
  count: number;
}

interface BillListResponse {
  summary: BillSummary;
  records: RecordItem[];
}

interface DailyStats {
  date: string;
  expense: number;
  income: number;
}

interface CategoryStats {
  category: string;
  categoryIcon: string;
  type: 'expense' | 'income';
  amount: number;
  percentage: number;
  count: number;
}

interface ReportData {
  period: { startDate: string; endDate: string };
  summary: { totalExpense: number; totalIncome: number; balance: number };
  dailyStats: DailyStats[];
  categoryStats: { expense: CategoryStats[]; income: CategoryStats[] };
}

interface DuplicateRecord {
  id: string;
  type: 'expense' | 'income';
  category: string;
  amount: number;
  date: string;
  remark: string;
  duplicateGroup: number;
}

interface DuplicateGroup {
  groupId: number;
  records: DuplicateRecord[];
  similarity: number;
}

interface DuplicateCheckResult {
  hasDuplicates: boolean;
  totalDuplicates: number;
  groups: DuplicateGroup[];
}
```

### 12.3 分类相关

```typescript
type CategoryType = 'expense' | 'income' | 'transfer' | 'debt' | 'reimbursement';

interface SubCategoryItem {
  id: string;
  name: string;
  icon: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  type: CategoryType;
  color?: string;
  subCategories?: SubCategoryItem[];
  sortOrder?: number;
}

interface CreateCategoryParams {
  name: string;
  icon: string;
  type: CategoryType;
  color?: string;
}

interface UpdateCategoryParams {
  name?: string;
  icon?: string;
  color?: string;
}
```

### 12.4 预算相关

```typescript
interface BudgetResponse {
  id: string;
  year: number;
  month: number;
  amount: number;
  spent: number;
  remaining: number;
  percentage: number;
}

interface BudgetStats {
  currentMonth: BudgetResponse | null;
  lastMonth: BudgetResponse | null;
  averageSpent: number;
}

interface SetBudgetParams {
  amount: number;
  year?: number;
  month?: number;
}
```

### 12.5 储蓄目标相关

```typescript
interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline?: string;
  icon: string;
  color: string;
  percentage: number;
  createdAt: string;
  updatedAt: string;
}

interface CreateSavingsGoalParams {
  name: string;
  targetAmount: number;
  deadline?: string;
  icon: string;
  color: string;
}

interface UpdateSavingsGoalParams {
  name?: string;
  targetAmount?: number;
  deadline?: string;
  icon?: string;
  color?: string;
}

interface DepositParams {
  amount: number;
  remark?: string;
}

interface WithdrawParams {
  amount: number;
  remark?: string;
}

interface SavingsSummary {
  totalGoals: number;
  totalTarget: number;
  totalSaved: number;
  totalRemaining: number;
  completedGoals: number;
  inProgressGoals: number;
}
```

### 12.6 攒钱计划相关

```typescript
interface SavingsPlan {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
  startDate: string;
  endDate: string;
  dailyAverage: number;
  percentage?: number;
  status: 'active' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

interface CreateSavingsPlanParams {
  name: string;
  targetAmount: number;
  endDate: string;
}

interface UpdateSavingsPlanParams {
  name?: string;
  targetAmount?: number;
  endDate?: string;
}

interface SavingsDeposit {
  id: string;
  planId: string;
  amount: number;
  type: 'average' | 'random' | 'manual';
  remark?: string;
  createdAt: string;
}

interface CreateDepositParams {
  amount: number;
  type: 'average' | 'random' | 'manual';
  remark?: string;
}
```

### 12.7 借贷管理相关

```typescript
type DebtType = 'lend' | 'borrow';

interface Debt {
  id: string;
  type: DebtType;
  personName: string;
  amount: number;
  repaidAmount: number;
  remainingAmount: number;
  date: string;
  expectedRepayDate?: string;
  remark?: string;
  status: 'pending' | 'partial' | 'repaid';
  repayRecords: RepayRecord[];
  createdAt: string;
  updatedAt: string;
}

interface RepayRecord {
  id: string;
  amount: number;
  remark?: string;
  date: string;
}

interface CreateDebtParams {
  type: DebtType;
  personName: string;
  amount: number;
  date: string;
  expectedRepayDate?: string;
  remark?: string;
}

interface UpdateDebtParams {
  type?: DebtType;
  personName?: string;
  amount?: number;
  date?: string;
  expectedRepayDate?: string;
  remark?: string;
}

interface RepayParams {
  amount: number;
  remark?: string;
}

interface DebtSummary {
  totalLent: number;
  totalBorrowed: number;
  totalRepaid: number;
  totalRemaining: number;
  pendingLent: number;
  pendingBorrowed: number;
}
```

### 12.8 周期记账相关

```typescript
type FrequencyType = 'daily' | 'workday' | 'weekly' | 'monthly' | 'yearly';

interface RecurringRecord {
  id: string;
  type: 'expense' | 'income';
  category: string;
  subCategory?: string;
  categoryIcon: string;
  amount: number;
  remark: string;
  frequency: FrequencyType;
  startDate: string;
  endDate?: string;
  account: string;
  isActive: boolean;
  nextExecuteDate: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateRecurringParams {
  type: 'expense' | 'income';
  category: string;
  subCategory?: string;
  categoryIcon: string;
  amount: number;
  remark: string;
  frequency: FrequencyType;
  startDate: string;
  endDate?: string;
  account: string;
}

interface UpdateRecurringParams {
  type?: 'expense' | 'income';
  category?: string;
  subCategory?: string;
  categoryIcon?: string;
  amount?: number;
  remark?: string;
  frequency?: FrequencyType;
  startDate?: string;
  endDate?: string;
  account?: string;
}

interface RecurringSummary {
  totalActive: number;
  totalInactive: number;
  monthlyEstimatedExpense: number;
  monthlyEstimatedIncome: number;
}
```

### 12.9 账户管理相关

```typescript
type AccountType = 'cash' | 'bank' | 'alipay' | 'wechat' | 'credit' | 'other';

interface Account {
  id: string;
  name: string;
  type: AccountType;
  icon: string;
  balance: number;
  initialBalance: number;
  isDefault: boolean;
  color: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateAccountParams {
  name: string;
  type: AccountType;
  icon: string;
  initialBalance: number;
  isDefault?: boolean;
  color?: string;
}

interface UpdateAccountParams {
  name?: string;
  type?: AccountType;
  icon?: string;
  initialBalance?: number;
  isDefault?: boolean;
  color?: string;
}

interface AdjustBalanceParams {
  newBalance: number;
  remark?: string;
}

interface AccountSummary {
  totalAccounts: number;
  totalBalance: number;
  accountTypeSummary: {
    type: AccountType;
    count: number;
    totalBalance: number;
  }[];
}
```

### 12.10 账单模板相关

```typescript
interface BillTemplate {
  id: string;
  name: string;
  type: 'expense' | 'income';
  category: string;
  subCategory?: string;
  categoryIcon: string;
  amount?: number;
  remark?: string;
  account: string;
  createdAt: string;
  updatedAt: string;
}

interface CreateTemplateParams {
  name: string;
  type: 'expense' | 'income';
  category: string;
  subCategory?: string;
  categoryIcon: string;
  amount?: number;
  remark?: string;
  account: string;
}

interface UpdateTemplateParams {
  name?: string;
  type?: 'expense' | 'income';
  category?: string;
  subCategory?: string;
  categoryIcon?: string;
  amount?: number;
  remark?: string;
  account?: string;
}

interface UseTemplateParams {
  date?: string;
  amount?: number;
  remark?: string;
}
```

### 12.11 通用类型

```typescript
interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}

interface ApiError {
  name: string;
  message: string;
  code: number;
  data?: unknown;
}
```

---

## 13. 本地存储键名映射

前端使用 localStorage 存储离线数据，以下是所有键名及其对应的数据类型：

| 键名 | 数据类型 | 说明 |
|------|----------|------|
| `money_records` | `RecordItem[]` | 记账记录 |
| `money_user` | `User` | 用户信息 |
| `money_access_token` | `string` | 访问令牌 |
| `money_refresh_token` | `string` | 刷新令牌 |
| `money_token_expires` | `string` | Token 过期时间戳（毫秒） |
| `money_categories` | `Record<CategoryType, Category[]>` | 分类数据（按类型分组） |
| `money_budgets` | `LocalBudget[]` | 预算数据 |
| `money_quick_records` | `QuickRecord[]` | 快捷记账项 |
| `money_fridge_items` | `FridgeItem[]` | 冰箱物品 |

### 额外的攒钱计划本地存储键名

| 键名 | 数据类型 | 说明 |
|------|----------|------|
| `savings_plans` | `SavingsPlan[]` | 攒钱计划列表 |
| `savings_deposits` | `SavingsDeposit[]` | 攒钱存款记录 |
| `savings_active_plan_id` | `string` | 当前激活的计划 ID |

### 本地存储辅助类型

```typescript
interface LocalBudget extends Omit<BudgetResponse, 'id' | 'spent' | 'remaining' | 'percentage'> {
  id?: string;
}

interface QuickRecord {
  id: string;
  categoryId: string;
  subCategoryId: string;
  amount: number;
  type: 'expense' | 'income';
  order: number;
}

interface FridgeItem {
  id: string;
  name: string;
  quantity: string;
  purchaseDate: string;
  progress: number;
  createdAt: string;
  updatedAt: string;
  consumedAt?: string;
}
```

---

## 14. 前端离线模式说明

### 14.1 离线数据存储方式

前端在未登录或离线状态下，所有数据存储在 localStorage 中，通过 `src/utils/storage.ts` 中的函数进行读写操作。

**核心机制**：

1. **判断登录状态**：通过 `isLoggedIn()` 函数检查 accessToken 是否存在且未过期
2. **数据读写**：登录状态时调用 API，未登录时读写 localStorage
3. **数据格式**：localStorage 中存储的 JSON 字符串，解析后与 API 返回的数据结构一致

### 14.2 各模块离线策略

| 模块 | 离线可用 | 说明 |
|------|----------|------|
| 记账记录 | ✅ | 通过 `getLocalRecords` / `saveLocalRecords` 等函数操作 |
| 分类管理 | ✅ | 使用默认分类数据，存储在 `money_categories` |
| 预算管理 | ✅ | 通过 `getLocalBudgets` / `setLocalBudget` 操作 |
| 快捷记账 | ✅ | 通过 `getQuickRecords` / `addQuickRecord` 操作 |
| 冰箱物品 | ✅ | 通过 `getFridgeItems` / `addFridgeItem` 操作 |
| 攒钱计划 | ✅ | 通过 `getLocalSavingsPlans` / `saveLocalSavingsPlans` 操作 |
| 储蓄目标 | ❌ | 需要登录后通过 API 操作 |
| 借贷管理 | ❌ | 需要登录后通过 API 操作 |
| 周期记账 | ❌ | 需要登录后通过 API 操作 |
| 账户管理 | ❌ | 需要登录后通过 API 操作 |
| 账单模板 | ❌ | 需要登录后通过 API 操作 |
| 报表统计 | ❌ | 需要登录后通过 API 操作 |
| 重复检测 | ❌ | 需要登录后通过 API 操作 |

### 14.3 数据同步策略

当前版本采用**手动切换**策略，即：

1. **未登录时**：所有数据仅存储在 localStorage
2. **登录后**：数据通过 API 与服务端交互，localStorage 仅缓存 Token 和用户信息
3. **登出后**：清除 Token 相关数据，但保留 `money_records`、`money_fridge_items` 等本地数据

> **后端开发建议**：如需实现离线数据同步，建议增加数据同步 API，支持批量上传本地数据和服务端数据合并。

### 14.4 默认分类数据生成

离线模式下，分类数据通过 `generateDefaultCategories()` 函数生成，包含以下类型：

- **expense**：14 个支出主分类（饮食、住房、交通、服饰、医疗、教育、娱乐、旅行、人情、数码、家居、育儿、金融、其他支出）
- **income**：6 个收入主分类（工资、兼职、理财、二手、奖金、其他收入）
- **transfer**：2 个转账分类（转账、还款）
- **debt**：3 个借贷分类（借入、借出、还款）
- **reimbursement**：1 个报销分类（报销）

---

## 15. 错误处理约定

### 15.1 HTTP 状态码

| 状态码 | 含义 | 前端处理 |
|--------|------|----------|
| 200 | 请求成功 | 正常处理响应数据 |
| 400 | 请求参数错误 | 显示 `data.message` 或 `data.error` |
| 401 | 未授权 / Token 过期 | 尝试刷新 Token，失败则跳转个人中心页 |
| 403 | 权限不足 | 控制台输出"权限不足" |
| 404 | 资源不存在 | 控制台输出"资源不存在" |
| 408 | 请求超时 | 显示"请求超时" |
| 500 | 服务器错误 | 控制台输出"服务器错误" |
| 502 | 网关错误 | 显示"网关错误" |
| 503 | 服务不可用 | 显示"服务不可用" |
| 504 | 网关超时 | 显示"网关超时" |

### 15.2 API 错误响应格式

后端返回错误时，应遵循以下格式：

```json
{
  "code": 400,
  "data": null,
  "message": "用户名已存在"
}
```

或者：

```json
{
  "code": 401,
  "data": null,
  "message": "Token 已过期"
}
```

前端错误拦截器会按以下优先级提取错误消息：

1. `response.data.message`
2. `response.data.error`
3. 根据 HTTP 状态码映射的默认消息

### 15.3 Token 过期处理流程

```
1. 前端发起请求 → 后端返回 401
2. 前端检查是否为 /auth/refresh 请求
   ├── 是 → 清除用户数据，跳转个人中心
   └── 否 → 检查本地是否有 refreshToken
       ├── 无 → 清除用户数据，跳转个人中心
       └── 有 → 尝试刷新 Token
           ├── 成功 → 用新 Token 重发原请求
           └── 失败 → 清除用户数据，跳转个人中心
```

**关键细节**：

- 刷新 Token 期间，其他请求会排队等待（通过订阅机制实现）
- 刷新成功后，所有排队的请求会使用新 Token 重新发送
- 刷新失败时，调用 `clearUser()` 清除本地存储的用户信息和 Token

### 15.4 前端 ApiError 类

```typescript
class ApiError extends Error {
  code: number;
  data?: unknown;

  constructor(message: string, code: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.data = data;
  }
}
```

---

## 16. 分类数据初始化

### 16.1 默认支出分类

| 主分类 ID | 名称 | 图标 | 子分类 |
|-----------|------|------|--------|
| food | 饮食 | 🍜 | 买菜(🥬)、外食(🍽️)、奶茶(🧋)、咖啡(☕)、零食(🍪)、外卖(🛵) |
| housing | 住房 | 🏠 | 房租(🏠)、水电(💡)、物业(🏢)、网费(📶)、维修(🔧)、酒店(🏨) |
| transport | 交通 | 🚗 | 公交(🚌)、打车(🚕)、油费(⛽)、停车(🅿️)、保养(🔩) |
| clothing | 服饰 | 👗 | 衣鞋(👟)、护肤(💄)、饰品(💍)、干洗(🧺) |
| medical | 医疗 | 🏥 | 门诊(🩺)、药品(💊)、体检(🩻)、器械(🦯) |
| education | 教育 | 📚 | 书本(📖)、学费(🎓)、网课(💻)、文具(✏️)、软件(💿) |
| entertainment | 娱乐 | 🎮 | 电影(🎬)、游戏(🎮)、聚会(🎉)、爱好(🎨)、剧场(🎭) |
| travel | 旅行 | ✈️ | 机票(🎫)、住宿(🏨)、门票(🎟️)、旅餐(🥘)、纪念(🎁) |
| social | 人情 | 🧧 | 礼金(🧧)、礼品(🎁)、聚餐(🍽️)、送礼(🎀)、捐赠(❤️) |
| digital | 数码 | 📱 | 话费(📞)、设备(💻)、配件(⌨️)、订阅(🔔)、维修(🔧) |
| home | 家居 | 🛋️ | 清洁(🧹)、纸品(🧻)、厨具(🍳)、床品(🛏️)、收纳(📦) |
| parenting | 育儿 | 👶 | 奶粉(🍼)、玩具(🧸)、宠物(🐾)、医疗(💊)、托育(🏫) |
| finance | 金融 | 🏦 | 保险(🛡️)、车险(🚘)、年费(💳)、股市(📈)、基金(📊) |
| other_expense | 其他支出 | 📦 | （无子分类） |

### 16.2 默认收入分类

| 主分类 ID | 名称 | 图标 | 子分类 |
|-----------|------|------|--------|
| salary | 工资 | 💰 | （无子分类） |
| parttime | 兼职 | 💵 | （无子分类） |
| investment | 理财 | 📈 | （无子分类） |
| secondhand | 二手 | ♻️ | （无子分类） |
| bonus | 奖金 | 🎁 | （无子分类） |
| other_income | 其他收入 | 💰 | （无子分类） |

### 16.3 其他默认分类

| 类型 | 名称 | 图标 |
|------|------|------|
| transfer | 转账 | transfer |
| transfer | 还款 | repay |
| debt | 借入 | borrow_in |
| debt | 借出 | borrow_out |
| debt | 还款 | repayment |
| reimbursement | 报销 | reimburse |

### 16.4 分类图标映射规则

前端使用 `src/constants/categoryIconMapping.ts` 进行分类名称到图标的映射，支持以下功能：

1. **近义词匹配**：将各种近义词统一映射到标准分类。例如 "早餐"、"午饭"、"晚餐" 都映射到 "餐饮 > 三餐"
2. **英文名称映射**：每个分类和子分类都有 `englishName` 字段，用于 CDN 图标路径
3. **CDN 图标路径格式**：`https://cdn.example.com/icons/{englishName}.png`

**映射示例**：

| 输入名称 | 标准主分类 | 标准子分类 | 英文名 |
|----------|-----------|-----------|--------|
| 早餐 | 餐饮 | 三餐 | dining_meals |
| 美团 | 餐饮 | 外卖 | dining_delivery |
| 房租 | 住房 | 房租 | housing_rent |
| 滴滴 | 交通 | 打车 | transport_taxi |
| 月薪 | 工资 | 基本工资 | salary_base |

> **后端开发建议**：后端应在前端导入分类映射表，实现分类名称标准化。当用户通过导入功能上传数据时，后端应使用近义词匹配将非标准分类名称转换为标准分类。

---

## 附录：API 路由汇总

| 方法 | 路径 | 说明 | 认证 |
|------|------|------|------|
| POST | /api/auth/login | 用户登录 | 否 |
| POST | /api/auth/register | 用户注册 | 否 |
| POST | /api/auth/refresh | 刷新 Token | 否 |
| POST | /api/auth/logout | 用户登出 | 是 |
| POST | /api/auth/logout-all | 全设备登出 | 是 |
| GET | /api/auth/profile | 获取用户信息 | 是 |
| GET | /api/records/stats | 获取月度统计 | 是 |
| GET | /api/records/recent | 获取最近记录 | 是 |
| GET | /api/records | 获取所有记录 | 是 |
| GET | /api/records/page | 分页获取记录 | 是 |
| GET | /api/records/by-date | 按日期分组获取 | 是 |
| POST | /api/records | 创建记录 | 是 |
| PUT | /api/records/:id | 更新记录 | 是 |
| DELETE | /api/records/:id | 删除记录 | 是 |
| POST | /api/records/import | 批量导入 | 是 |
| DELETE | /api/records/import | 删除导入记录 | 是 |
| GET | /api/records/filter | 筛选账单 | 是 |
| GET | /api/records/report | 获取报表数据 | 是 |
| GET | /api/records/duplicates | 检测重复 | 是 |
| DELETE | /api/records/duplicates | 删除重复（新） | 是 |
| DELETE | /api/duplicates | 删除重复（旧） | 是 |
| GET | /api/categories | 获取所有分类 | 是 |
| GET | /api/categories/expense | 获取支出分类 | 是 |
| GET | /api/categories/income | 获取收入分类 | 是 |
| POST | /api/categories | 创建分类 | 是 |
| PUT | /api/categories/:id | 更新分类 | 是 |
| DELETE | /api/categories/:id | 删除分类 | 是 |
| GET | /api/budgets/current | 获取当前月预算 | 是 |
| GET | /api/budgets/month | 获取指定月份预算 | 是 |
| POST | /api/budgets | 设置预算 | 是 |
| DELETE | /api/budgets | 删除预算 | 是 |
| GET | /api/budgets/stats | 获取预算统计 | 是 |
| GET | /api/budgets/recent | 获取最近预算 | 是 |
| GET | /api/savings/goals | 获取所有储蓄目标 | 是 |
| POST | /api/savings/goals | 创建储蓄目标 | 是 |
| PUT | /api/savings/goals/:id | 更新储蓄目标 | 是 |
| DELETE | /api/savings/goals/:id | 删除储蓄目标 | 是 |
| POST | /api/savings/goals/:id/deposit | 存款 | 是 |
| POST | /api/savings/goals/:id/withdraw | 取款 | 是 |
| GET | /api/savings/summary | 获取储蓄统计 | 是 |
| GET | /api/savings/plans | 获取所有计划 | 是 |
| POST | /api/savings/plans | 创建计划 | 是 |
| PUT | /api/savings/plans/:id | 更新计划 | 是 |
| DELETE | /api/savings/plans/:id | 删除计划 | 是 |
| POST | /api/savings/plans/:planId/deposit | 计划存款 | 是 |
| GET | /api/savings/plans/:planId/deposits | 获取存款记录 | 是 |
| GET | /api/debts | 获取借贷列表 | 是 |
| POST | /api/debts | 创建借贷记录 | 是 |
| PUT | /api/debts/:id | 更新借贷记录 | 是 |
| DELETE | /api/debts/:id | 删除借贷记录 | 是 |
| POST | /api/debts/:id/repay | 记录还款 | 是 |
| GET | /api/debts/summary | 获取借贷统计 | 是 |
| GET | /api/recurring | 获取周期记账列表 | 是 |
| POST | /api/recurring | 创建周期记账 | 是 |
| PUT | /api/recurring/:id | 更新周期记账 | 是 |
| DELETE | /api/recurring/:id | 删除周期记账 | 是 |
| POST | /api/recurring/:id/toggle | 切换启用状态 | 是 |
| GET | /api/recurring/summary | 获取统计 | 是 |
| GET | /api/accounts | 获取账户列表 | 是 |
| POST | /api/accounts | 创建账户 | 是 |
| PUT | /api/accounts/:id | 更新账户 | 是 |
| DELETE | /api/accounts/:id | 删除账户 | 是 |
| POST | /api/accounts/:id/adjust | 调整余额 | 是 |
| GET | /api/accounts/summary | 获取账户统计 | 是 |
| GET | /api/templates | 获取模板列表 | 是 |
| POST | /api/templates | 创建模板 | 是 |
| PUT | /api/templates/:id | 更新模板 | 是 |
| DELETE | /api/templates/:id | 删除模板 | 是 |
| POST | /api/templates/:id/use | 使用模板 | 是 |
