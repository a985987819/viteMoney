# 线上调试指南

## 问题已修复！

**根本原因**：React 19 与 ECharts 及某些库存在兼容性问题，导致打包后出现 `Cannot set properties of undefined (setting 'Activity')` 错误。

**解决方案**：已将 React 降级到稳定的 18.3.1 版本。

## 当前配置说明

### 已修复的问题
1. ✅ **React 版本兼容性**：从 React 19.2.4 降级到 React 18.3.1
2. ✅ **取消代码混淆**：保留原始代码格式，方便调试
3. ✅ **启用完整 Source Map**：生成完整的 source map 文件
4. ✅ **详细的错误日志**：所有 ECharts 图表初始化都有详细日志
5. ✅ **增强的错误边界**：ErrorBoundary 可以捕获并显示所有错误

### 依赖版本
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "echarts": "^5.6.0"
}
```

## 调试步骤

### 步骤 1: 打开浏览器开发者工具
1. 在线上环境打开应用
2. 按 F12 打开开发者工具
3. 切换到 Console 标签

### 步骤 2: 查看错误日志
当发生错误时，会看到以下详细日志：

```
=== Global Error Event ===
Message: Cannot set properties of undefined (setting 'Activity')
Error: [Error object]
Filename: https://your-domain.com/assets/js/vendor-charts-xxx.js
Line: 12345 Column: 67
========================
```

### 步骤 3: 查看 Source Map
1. 在 Sources 标签中，可以找到原始源代码
2. 错误位置会自动映射到源代码行
3. 可以设置断点调试

### 步骤 4: 查看图表初始化日志
```
[Bill Chart] Initializing chart...
[Bill Chart] chartRef.current: true
[Bill Chart] chartCollapsed: false
[Bill Chart] stats.dailyStats.length: 30
[Bill Chart] Creating ECharts instance...
[Bill Chart] ECharts instance created
[Bill Chart] Getting chart option...
[Bill Chart] Setting option...
[Bill Chart] Chart initialized successfully
```

或者错误日志：
```
[Bill Chart] ECharts initialization error: [Error object]
[Bill Chart] Error details: {
  message: "Cannot set properties of undefined (setting 'Activity')",
  stack: "...",
  name: "TypeError"
}
```

### 步骤 5: 查看 ErrorBoundary 日志
```
=== ErrorBoundary Caught Error ===
Error: [Error object]
ErrorInfo: { componentStack: "..." }
Component Stack: "at Bill (file:///...)"
===================================
```

## 常见错误排查

### ECharts "Activity" 错误
如果看到 `Cannot set properties of undefined (setting 'Activity')`：

1. 检查 ECharts 版本：应该是 5.6.0
2. 检查导入方式：应该使用 `import * as echarts from 'echarts'`
3. 查看图表初始化日志，确定在哪一步出错
4. 检查 DOM 元素是否存在
5. 检查数据是否正确

### 错误没有被 ErrorBoundary 捕获
如果错误没有被捕获：

1. 检查错误是否发生在 useEffect 中
2. 查看全局错误日志 `=== Global Error Event ===`
3. 确认 ErrorBoundary 是否正确包裹组件
4. 检查是否有 try-catch 吞掉了错误

## 生产环境部署建议

### 调试完成后
建议修改以下配置以优化生产环境：

```typescript
// vite.config.ts
build: {
  minify: 'terser',      // 启用代码压缩
  sourcemap: false,      // 关闭 source map（或上传到私有服务器）
  terserOptions: {
    compress: {
      drop_console: true,   // 删除 console.log
      drop_debugger: true,  // 删除 debugger
    },
  },
}
```

### 保留错误监控
建议添加错误监控服务（如 Sentry）：

```typescript
// main.tsx
import * as Sentry from '@sentry/react';

Sentry.init({
  dsn: 'your-sentry-dsn',
  environment: 'production',
  integrations: [
    new Sentry.BrowserTracing(),
    new Sentry.Replay(),
  ],
});
```

## 快速定位错误位置

### 方法 1: 使用 Source Map
1. 打开浏览器开发者工具
2. 在 Sources 中找到报错的文件
3. Source Map 会自动映射到源代码

### 方法 2: 查看错误堆栈
错误日志中会包含完整的堆栈信息：
```
Error details: {
  message: "...",
  stack: "Error: ...\n  at BillContent.tsx:245\n  at renderWithHooks...",
  name: "TypeError"
}
```

### 方法 3: 使用全局搜索
在 dist 目录中搜索错误信息中的关键字：
```bash
grep -r "Activity" dist/
```

## 联系支持

如果问题无法解决，请提供以下信息：
1. 完整的错误日志
2. 浏览器控制台截图
3. 网络请求日志
4. 设备信息和浏览器版本
