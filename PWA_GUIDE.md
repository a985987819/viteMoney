# PWA 安装功能配置指南

## 功能说明

项目已配置为完整的 PWA（渐进式 Web 应用），支持：
- ✅ 离线访问
- ✅ 添加到主屏幕
- ✅ 独立应用窗口运行
- ✅ 推送通知（可选）
- ✅ 自动更新

## PWA 配置详情

### 1. Manifest 配置

位置：`vite.config.ts`

```typescript
manifest: {
  name: '星露账本',
  short_name: '星露账本',
  description: '一款像素风格的记账应用，灵感来自星露谷物语',
  theme_color: '#8B5A2B',
  background_color: '#f5e8c7',
  display: 'standalone',
  scope: '/',
  start_url: '/',
  orientation: 'portrait-primary',
  lang: 'zh-CN',
  icons: [...]
}
```

### 2. Service Worker

使用 `vite-plugin-pwa` 自动注册 Service Worker，支持：
- 自动缓存静态资源
- 离线访问
- 自动更新检测

### 3. 安装提示组件

组件：`src/components/PWAInstallPrompt/index.tsx`

**显示逻辑**：
- 首次访问时自动显示安装提示
- 仅在浏览器支持 PWA 且满足安装条件时显示
- 用户选择安装或关闭后，不再自动显示
- 已安装后不显示

**触发条件**：
1. 用户使用 HTTPS 访问（或 localhost）
2. 浏览器支持 PWA
3. Service Worker 已注册
4. Manifest 配置正确
5. 用户未安装过此应用
6. 用户未手动关闭过提示

## 测试方法

### 方法 1：本地测试（推荐）

```bash
bun run dev
```

然后在浏览器中访问 `http://localhost:5173`

**注意**：某些浏览器的 PWA 功能在 localhost 可能受限，建议使用 Chrome。

### 方法 2：生产环境测试

```bash
bun run build
bun run preview
```

访问 `http://localhost:4173`

### 方法 3：线上测试

部署到 HTTPS 环境后测试。

## 浏览器支持情况

### 桌面浏览器
- ✅ Chrome 67+
- ✅ Edge 79+
- ❌ Firefox（需要手动配置）
- ❌ Safari（macOS 不支持）

### 移动浏览器
- ✅ Chrome Android
- ✅ Samsung Internet
- ✅ iOS Safari 11.3+（有限支持）
- ✅ Android WebView

## iOS 特殊说明

iOS 设备需要用户手动添加：
1. 点击 Safari 浏览器的分享按钮
2. 选择"添加到主屏幕"
3. 应用会出现在主屏幕上

iOS 16.4+ 支持 `beforeinstallprompt` 事件，但功能有限。

## Android 安装流程

1. 用户首次访问网站
2. 满足 PWA 安装条件
3. 自动弹出安装提示弹窗
4. 用户点击"安装"按钮
5. 应用添加到主屏幕
6. 可以从主屏幕启动，独立窗口运行

## 调试方法

### 1. 查看 Console 日志

打开浏览器开发者工具，查看以下日志：

```
[PWA] beforeinstallprompt event fired
[PWA InstallPrompt] State changed: {...}
[PWA InstallPrompt] Showing install prompt
```

### 2. 检查 Manifest

在 Chrome DevTools 中：
1. 打开 Application 面板
2. 查看 Manifest 标签
3. 检查所有配置是否正确

### 3. 检查 Service Worker

在 Chrome DevTools 中：
1. 打开 Application 面板
2. 查看 Service Workers 标签
3. 检查是否注册成功

### 4. 模拟安装事件

在 Console 中运行：

```javascript
// 清除已安装标记
localStorage.removeItem('pwa_first_time_shown_v2');

// 重新加载页面
location.reload();
```

### 5. 使用 Lighthouse 测试

1. 打开 Chrome DevTools
2. 切换到 Lighthouse 面板
3. 选择 PWA 类别
4. 运行测试
5. 查看评分和建议

## 常见问题

### Q1: 为什么不显示安装提示？

**可能原因**：
- 不是 HTTPS 环境（localhost 除外）
- Service Worker 注册失败
- Manifest 配置错误
- 浏览器不支持 PWA
- 已经安装过
- 已经关闭过提示

**解决方法**：
1. 检查 Console 是否有错误
2. 清除浏览器数据
3. 清除 localStorage：`localStorage.clear()`
4. 使用无痕模式测试
5. 检查 Lighthouse 评分

### Q2: 如何重置安装状态？

在 Console 中运行：

```javascript
// 清除所有 PWA 相关标记
localStorage.removeItem('pwa_first_time_shown_v2');
localStorage.removeItem('pwa_install_dismissed');

// 清除 Service Worker
navigator.serviceWorker.getRegistrations().then(registrations => {
  registrations.forEach(reg => reg.unregister());
});

// 清除缓存
caches.keys().then(names => {
  names.forEach(name => caches.delete(name));
});

// 重新加载
location.reload();
```

### Q3: iOS 设备如何安装？

iOS 需要手动安装：
1. 打开 Safari
2. 点击底部工具栏的分享按钮
3. 滚动找到"添加到主屏幕"
4. 点击右上角"添加"

### Q4: 安装后如何卸载？

**Android**：
- 长按应用图标
- 选择"卸载"或拖到垃圾桶

**iOS**：
- 长按应用图标
- 选择"移除 App"

**桌面**：
- 在应用管理中找到并卸载

## 优化建议

### 1. 图标质量

确保所有尺寸的图标都清晰可见，特别是：
- 192x192（主屏幕）
- 512x512（启动画面）

### 2. 启动速度

优化首屏加载：
- 使用骨架屏
- 预加载关键资源
- 减少初始包体积

### 3. 离线体验

确保核心功能可以离线使用：
- 本地数据存储
- 离线提示
- 同步队列

### 4. 更新策略

使用 `autoUpdate` 策略：
- 后台自动下载更新
- 下次启动时应用更新
- 提示用户刷新

## 相关文件

- [`vite.config.ts`](./vite.config.ts) - PWA 插件配置
- [`index.html`](./index.html) - HTML 头部配置
- [`src/components/PWAInstallPrompt/index.tsx`](./src/components/PWAInstallPrompt/index.tsx) - 安装提示组件
- [`src/hooks/usePWA.ts`](./src/hooks/usePWA.ts) - PWA 状态管理 Hook
- [`src/main.tsx`](./src/main.tsx) - Service Worker 注册

## 参考资源

- [PWA 官方文档](https://web.dev/progressive-web-apps/)
- [Vite PWA 插件文档](https://vite-pwa-org.netlify.app/)
- [MDN PWA 指南](https://developer.mozilla.org/zh-CN/docs/Web/Progressive_web_apps)
- [Google PWA 清单](https://web.dev/pwa-checklist/)

## 联系支持

如有问题，请提供：
1. 浏览器版本
2. 设备型号
3. Console 错误日志
4. Lighthouse 评分截图
