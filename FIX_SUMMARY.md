# 线上蓝屏问题修复总结

## 问题描述

项目部署到线上后出现蓝屏，错误信息：
```
Uncaught TypeError: Cannot set properties of undefined (setting 'Activity')
at react.production.js:345
```

## 根本原因

**React 19 兼容性问题**

React 19（19.2.4）对模块系统进行了重大改动，与以下库存在兼容性问题：
- ECharts 5.6.0
- 某些 Vite 插件
- 部分 Ant Design 组件

具体表现为：
1. 在生产环境打包后，React 的 `exports.Activity = REACT_ACTIVITY_TYPE` 语句中 `exports` 为 `undefined`
2. 这是因为 React 19 使用了新的模块格式，与 Vite 的打包机制不兼容
3. 错误发生在 `react.production.js` 第 345 行

## 解决方案

### 1. 降级 React 到稳定版本

```bash
npm uninstall react react-dom
npm install react@^18.3.1 react-dom@^18.3.1 --save
```

同时降级测试库：
```bash
npm uninstall @testing-library/react
npm install @testing-library/react@^14.3.1 --save-dev
```

### 2. 优化打包配置

修改 `vite.config.ts`：
```typescript
build: {
  minify: false,        // 取消代码混淆，方便调试
  sourcemap: true,      // 生成完整 source map
  terserOptions: {
    compress: {
      drop_console: false,    // 保留 console.log
      drop_debugger: false,   // 保留 debugger
    }
  }
}
```

### 3. 增强错误处理

- 添加全局错误监听器
- 增强 ErrorBoundary 组件
- 添加详细的图表初始化日志
- 确保所有错误都能被捕获并显示友好页面

## 修复后的依赖版本

```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "echarts": "^5.6.0",
  "@testing-library/react": "^14.3.1"
}
```

## 验证结果

### 打包成功
```
✓ built in 1m 14s

文件大小变化:
- vendor-react: 813.32 kB → 376.03 kB (恢复正常 React 18 大小)
- vendor-charts: 2,238.67 kB (包含完整 ECharts)
- 所有文件都生成了 .map 文件
```

### 类型检查通过
```
$ tsc --noEmit
✓ 无错误
```

### 错误处理完善
- ✅ 所有错误都会被 ErrorBoundary 捕获
- ✅ 显示星露谷风格的友好错误页面
- ✅ 详细的错误日志帮助定位问题
- ✅ Source Map 可以映射到源代码

## 部署建议

### 生产环境配置

调试完成后，建议修改 `vite.config.ts` 以优化生产环境：

```typescript
build: {
  minify: 'terser',      // 启用代码压缩
  sourcemap: false,      // 关闭 source map（或私有部署）
  terserOptions: {
    compress: {
      drop_console: true,   // 删除 console.log
      drop_debugger: true,  // 删除 debugger
    }
  }
}
```

### 错误监控

建议添加错误监控服务（如 Sentry）：

```typescript
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

## 测试步骤

### 本地测试
1. 运行 `bun run build` 打包
2. 运行 `bun run preview` 预览生产版本
3. 打开浏览器开发者工具，确认无错误

### 线上验证
1. 部署到线上环境
2. 打开浏览器开发者工具
3. 访问所有页面，特别是统计图表页面
4. 确认 Console 中无错误

## 经验总结

### 教训
1. **不要使用太新的版本**：React 19 刚发布不久，生态兼容性还不完善
2. **生产环境要谨慎**：重要项目应该使用稳定版本的依赖
3. **及时查看错误日志**：详细的日志可以快速定位问题

### 最佳实践
1. **依赖版本管理**：
   - 主要依赖使用稳定版本（LTS）
   - 定期更新但不要太激进
   - 更新前查看 changelog 和兼容性问题

2. **错误处理**：
   - 添加全局错误边界
   - 实现友好的错误页面
   - 保留详细的错误日志

3. **打包配置**：
   - 开发环境保留调试信息
   - 生产环境优化体积
   - 使用 Source Map 定位问题

## 相关文件

- [`package.json`](./package.json) - 依赖版本
- [`vite.config.ts`](./vite.config.ts) - 打包配置
- [`src/main.tsx`](./src/main.tsx) - 全局错误处理
- [`src/components/ErrorBoundary/index.tsx`](./src/components/ErrorBoundary/index.tsx) - 错误边界组件
- [`DEBUG_GUIDE.md`](./DEBUG_GUIDE.md) - 调试指南

## 联系支持

如果问题复发，请提供：
1. 完整的错误日志
2. Console 截图
3. Network 截图
4. 浏览器和设备信息
