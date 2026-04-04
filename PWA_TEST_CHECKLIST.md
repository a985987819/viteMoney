# PWA 安装功能测试清单

## ✅ 配置检查

- [x] Manifest 配置正确（vite.config.ts）
- [x] Service Worker 自动注册
- [x] 图标配置完整（72x72 到 512x512）
- [x] 主题色和背景色设置
- [x] 显示模式：standalone
- [x] 安装提示组件集成到 App

## 🧪 功能测试步骤

### 1. 本地开发环境测试

```bash
# 启动开发服务器
bun run dev
```

访问：http://localhost:5173

**检查项**：
- [ ] 打开浏览器 Console
- [ ] 看到 `[PWA] beforeinstallprompt event fired` 日志
- [ ] 看到 `[PWA InstallPrompt] Showing install prompt` 日志
- [ ] 安装提示弹窗出现（1.5 秒后）
- [ ] 点击"安装到主屏幕"按钮
- [ ] 浏览器弹出原生安装确认框
- [ ] 确认安装
- [ ] 应用出现在应用列表/主屏幕

### 2. 生产环境测试

```bash
# 打包
bun run build

# 预览
bun run preview
```

访问：http://localhost:4173

**检查项**：
- [ ] Service Worker 注册成功
- [ ] 缓存正常生成
- [ ] 安装提示正常显示
- [ ] 安装后应用独立窗口运行
- [ ] 离线可以访问

### 3. 线上环境测试

部署到 HTTPS 环境后：

**检查项**：
- [ ] 地址栏显示安装图标（Chrome）
- [ ] 首次访问显示安装提示
- [ ] 安装后可以从主屏幕启动
- [ ] 无浏览器 UI（独立窗口）
- [ ] 离线功能正常

## 📱 不同平台测试

### Chrome/Edge（桌面）

**预期行为**：
- 地址栏右侧显示安装图标（⊕）
- 首次访问自动弹出安装提示
- 安装后出现在应用列表
- 独立窗口运行

**测试步骤**：
1. 打开 Chrome DevTools → Application
2. 查看 Manifest 标签
3. 查看 Service Workers 标签
4. 清除数据后重新测试

### Chrome Android

**预期行为**：
- 底部弹出安装提示
- 可以添加到主屏幕
- 全屏运行
- 状态栏显示主题色

**测试步骤**：
1. 使用 Chrome 远程调试
2. 检查 Mobile 适配
3. 测试触摸交互

### iOS Safari

**预期行为**：
- 不显示自动安装提示（iOS 限制）
- 需要手动"添加到主屏幕"
- 有 Safari UI（非完全独立）

**测试步骤**：
1. 打开 Safari
2. 点击分享按钮
3. 选择"添加到主屏幕"
4. 从主屏幕启动

### Samsung Internet

**预期行为**：
- 类似 Chrome Android
- 支持安装提示
- 独立窗口运行

## 🔍 调试检查点

### Console 日志

应该看到以下日志：

```
[PWA] beforeinstallprompt event fired
[PWA InstallPrompt] State changed: {
  isInstallable: true,
  isInstalled: false,
  hasShownFirstTime: true,
  showPrompt: false
}
[PWA InstallPrompt] Showing install prompt
[PWA InstallPrompt] Marked first time as shown
```

### Application 面板

检查以下标签：
- **Manifest**：显示所有配置信息
- **Service Workers**：显示已注册且激活
- **Storage**：显示缓存数据
- **Cache Storage**：显示缓存的资源

### Network 面板

检查：
- manifest.webmanifest 加载成功（200）
- Service Worker 文件加载成功
- 图标文件加载成功

## ⚠️ 常见问题排查

### 问题 1：不显示安装提示

**排查步骤**：
1. 检查是否是 HTTPS 或 localhost
2. 查看 Console 是否有错误
3. 检查 Application → Manifest 是否有警告
4. 检查 Service Worker 是否注册成功
5. 清除 localStorage 和缓存
6. 使用无痕模式测试

**快速重置命令**：

```javascript
// 在 Console 中运行
localStorage.clear();
sessionStorage.clear();

// 清除 Service Worker
navigator.serviceWorker.getRegistrations().then(regs => {
  regs.forEach(reg => reg.unregister());
});

// 清除缓存
caches.keys().then(names => {
  names.forEach(name => caches.delete(name));
});

// 重新加载
location.reload();
```

### 问题 2：安装后仍有浏览器 UI

**可能原因**：
- Manifest 中 `display` 不是 `standalone`
- 浏览器不支持完全独立窗口
- iOS Safari 限制

**解决方法**：
1. 检查 manifest.webmanifest 中的 `display` 字段
2. 确认 `theme-color` 设置正确
3. iOS 设备无法完全去除 UI（系统限制）

### 问题 3：离线无法访问

**排查步骤**：
1. 检查 Service Worker 是否激活
2. 查看 Cache Storage 是否有缓存
3. 检查 workbox 配置
4. 查看 Network 面板的缓存策略

## 📊 Lighthouse 测试

运行 Lighthouse 测试：

1. 打开 Chrome DevTools
2. 切换到 Lighthouse 面板
3. 选择 PWA 类别
4. 点击"分析页面加载"

**目标分数**：
- PWA: 100
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+

**关键检查项**：
- [ ] Web app manifest 存在且有效
- [ ] Service Worker 已注册
- [ ] 配置了 viewport meta 标签
- [ ] 有 apple-touch-icon
- [ ] 有 theme-color
- [ ] 内容大小适中
- [ ] 使用 HTTPS

## 🎯 验收标准

### 必须满足的条件

- [ ] Manifest 配置完整且有效
- [ ] Service Worker 成功注册
- [ ] 首次访问显示安装提示
- [ ] 可以成功安装到主屏幕
- [ ] 安装后独立窗口运行
- [ ] 离线可以访问基本功能
- [ ] Lighthouse PWA 分数 100

### 可选优化

- [ ] 启动画面美观
- [ ] 加载速度快
- [ ] 推送通知（如需要）
- [ ] 后台同步（如需要）
- [ ] 共享目标（如需要）

## 📝 测试报告模板

```
测试日期：YYYY-MM-DD
测试环境：[浏览器/设备/系统版本]
测试人员：[姓名]

✅ 通过项：
- 项目 1
- 项目 2

❌ 失败项：
- 项目 1（原因：xxx）
- 项目 2（原因：xxx）

📊 Lighthouse 分数：
- PWA: 
- Performance: 
- Accessibility: 
- Best Practices: 

📷 截图：
[附上关键步骤截图]

🔧 建议：
[改进建议]
```

## 🚀 快速测试脚本

在浏览器 Console 中运行：

```javascript
// PWA 快速检查
(async () => {
  console.log('=== PWA 检查 ===');
  
  // 1. 检查 Manifest
  const manifest = await fetch('/manifest.webmanifest').then(r => r.json());
  console.log('✅ Manifest:', manifest.name);
  
  // 2. 检查 Service Worker
  const sw = await navigator.serviceWorker.getRegistration();
  console.log(sw ? '✅ Service Worker 已注册' : '❌ Service Worker 未注册');
  
  // 3. 检查安装能力
  console.log('display-mode:', window.matchMedia('(display-mode: standalone)').matches);
  console.log('standalone:', window.navigator.standalone);
  
  // 4. 检查缓存
  const cacheNames = await caches.keys();
  console.log('缓存:', cacheNames);
  
  console.log('================');
})();
```

## 📞 需要帮助？

如果遇到问题：
1. 查看 Console 日志
2. 运行 Lighthouse 测试
3. 检查 Application 面板
4. 提供详细的错误信息

祝测试顺利！🎉
