# PWA 安装问题排查指南

## 问题现象
- Console 显示 `[PWA] BeforeInstallPromptEvent is available`
- 但不显示安装提示弹窗
- 地址栏没有下载/安装按钮

## 可能的原因

### 1. 浏览器环境不满足要求 ❌

**PWA 安装必须满足的条件**：
- ✅ HTTPS 协议（或 localhost）
- ✅ Service Worker 已注册并激活
- ✅ Manifest 配置正确且加载成功
- ✅ 浏览器支持 PWA
- ✅ 用户未安装过此应用
- ✅ 用户未关闭过安装提示

**检查方法**：
在 Console 中运行以下代码：

```javascript
// 检查 HTTPS
console.log('HTTPS:', window.location.protocol === 'https:' || window.location.hostname === 'localhost');

// 检查 Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistration().then(reg => {
    console.log('Service Worker:', reg ? '已注册' : '未注册');
  });
} else {
  console.log('Service Worker: 不支持');
}

// 检查 Manifest
fetch('/manifest.webmanifest')
  .then(r => r.json())
  .then(m => console.log('Manifest:', m.name))
  .catch(e => console.log('Manifest 加载失败:', e));

// 检查显示模式
console.log('display-mode:', window.matchMedia('(display-mode: standalone)').matches);
console.log('standalone:', window.navigator.standalone);
```

### 2. beforeinstallprompt 事件未触发 ⚠️

**原因**：
- 浏览器认为安装条件不满足
- Manifest 配置有问题
- Service Worker 未正确注册
- 浏览器策略限制（如 Firefox 默认不显示）

**调试方法**：
在 Console 中手动监听事件：

```javascript
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('✅ beforeinstallprompt 事件触发');
  console.log('Event:', e);
});

window.addEventListener('appinstalled', () => {
  console.log('✅ 应用已安装');
});
```

### 3. localStorage 标记问题 ⚠️

如果之前访问过，可能已经标记了 `pwa_first_time_shown_v2`

**解决方法**：
```javascript
// 清除标记
localStorage.removeItem('pwa_first_time_shown_v2');
location.reload();
```

### 4. 浏览器不支持或限制 ⚠️

**不同浏览器的支持情况**：

| 浏览器 | 支持程度 | 说明 |
|--------|---------|------|
| Chrome/Edge | ✅ 完全支持 | 自动显示安装提示 |
| Firefox | ⚠️ 有限支持 | 需要手动配置 |
| Safari (iOS) | ⚠️ 有限支持 | 需要手动添加 |
| Safari (macOS) | ❌ 不支持 | 无法安装 PWA |
| Samsung Internet | ✅ 完全支持 | 类似 Chrome |

**Firefox 特殊配置**：
Firefox 默认不显示安装提示，需要手动开启：
1. 地址栏输入 `about:config`
2. 搜索 `browser.ssb.enabled`
3. 设置为 `true`

### 5. Manifest 配置问题 ❌

**检查 Manifest 是否有效**：

在 Chrome DevTools 中：
1. 打开 Application 面板
2. 查看 Manifest 标签
3. 检查是否有警告或错误

**必须字段**：
- `name` 或 `short_name`
- `icons`（至少包含 192x192 和 512x512）
- `start_url`
- `display`

### 6. Service Worker 问题 ❌

**检查 Service Worker**：

在 Chrome DevTools 中：
1. 打开 Application 面板
2. 查看 Service Workers 标签
3. 检查状态是否为 "activated"

**手动注册 Service Worker**：
```javascript
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
    .then(reg => console.log('SW 注册成功:', reg))
    .catch(err => console.error('SW 注册失败:', err));
}
```

## 快速测试方案

### 方案 1：使用 Chrome 无痕模式

1. 打开 Chrome 无痕模式
2. 访问 http://localhost:5173
3. 打开 DevTools → Console
4. 查看日志输出

### 方案 2：清除所有数据

在 Console 中运行：

```javascript
// 清除 localStorage
localStorage.clear();
sessionStorage.clear();

// 清除 Service Worker
navigator.serviceWorker.getRegistrations().then(regs => {
  regs.forEach(reg => reg.unregister());
  console.log('Service Workers 已清除');
});

// 清除缓存
caches.keys().then(names => {
  names.forEach(name => caches.delete(name));
  console.log('缓存已清除');
});

// 重新加载
location.reload();
```

### 方案 3：手动触发安装

如果 `beforeinstallprompt` 事件已触发但弹窗未显示，可以手动触发：

```javascript
// 在 Console 中运行
window.dispatchEvent(new Event('beforeinstallprompt'));
```

### 方案 4：使用 Lighthouse 测试

1. 打开 Chrome DevTools
2. 切换到 Lighthouse 面板
3. 选择 PWA 类别
4. 运行测试
5. 查看评分和建议

## 预期的 Console 日志

正常情况下应该看到：

```
[PWA Hook] Initializing, isFirstVisit: true
[PWA] Event listeners registered
[PWA] Checking PWA conditions...
[PWA] isSecureContext: true
[PWA] HTTPS: true
[PWA] Service Worker support: true
[PWA] Service Worker registration: active
[PWA] beforeinstallprompt event fired  ← 关键！
[PWA InstallPrompt] State changed: { isInstallable: true, ... }
[PWA InstallPrompt] Showing install prompt
```

## 如果还是不行

### 检查清单

- [ ] 使用 Chrome 或 Edge 浏览器
- [ ] 访问 localhost 或 HTTPS 环境
- [ ] Console 无错误
- [ ] Manifest 加载成功
- [ ] Service Worker 已注册
- [ ] 清除了 localStorage 和缓存
- [ ] 使用无痕模式测试

### 替代方案

如果自动安装提示还是不显示，可以：

1. **使用手动按钮**：代码中已添加手动安装按钮
2. **引导用户手动安装**：
   - Chrome: 地址栏右侧的安装图标
   - iOS Safari: 分享 → 添加到主屏幕
   - Android Chrome: 菜单 → 添加到主屏幕

### 调试代码

在 `src/hooks/usePWA.ts` 中已添加详细日志，查看 Console 输出：

```
[PWA Hook] Initializing...
[PWA] Event listeners registered
[PWA] Checking PWA conditions...
[PWA] isSecureContext: true/false
[PWA] HTTPS: true/false
[PWA] Service Worker support: true/false
[PWA] Service Worker registration: active/none
```

## 常见错误及解决方法

### 错误 1：`isSecureContext: false`

**原因**：不是 HTTPS 环境

**解决**：
- 本地使用 localhost
- 线上使用 HTTPS

### 错误 2：`Service Worker registration: none`

**原因**：Service Worker 未注册

**解决**：
- 检查 vite-plugin-pwa 配置
- 查看 Network 面板是否有 sw.js 加载失败
- 重新打包项目

### 错误 3：Manifest 加载失败

**原因**：manifest.webmanifest 文件不存在或路径错误

**解决**：
- 检查 `/manifest.webmanifest` 是否可以访问
- 检查 vite.config.ts 中的 manifest 配置
- 重新打包项目

### 错误 4：`beforeinstallprompt` 事件不触发

**可能原因**：
- 浏览器不支持
- 已经安装过
- 已经关闭过安装提示
- Manifest 配置不完整

**解决**：
1. 清除所有数据
2. 使用无痕模式
3. 检查 Manifest 配置
4. 更换浏览器测试

## 联系支持

如果以上方法都无效，请提供：
1. 浏览器版本
2. 完整的 Console 日志
3. Application 面板截图
4. Lighthouse 测试报告
