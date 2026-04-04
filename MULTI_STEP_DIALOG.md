# 多步骤对话框使用指南

## 📋 概述

StardewDialog 组件已升级为支持**多步骤显示**，当内容超出对话框高度时，会自动分割成多页显示，提供更好的用户体验。

## ✨ 主要特性

### 1. 自动分页
- 当内容超过设定字符数时，自动分割成多页
- 支持字符串数组形式的内容，每个元素为一页
- 智能断句，在空格或标点处换行

### 2. 交互方式
- **点击屏幕任意位置**：切换到下一页
- **点击确定按钮**：切换到下一页（非最后一页）或确认（最后一页）
- **点击取消按钮**：取消操作

### 3. 视觉提示
- **页码指示器**：显示当前页/总页数（如：1 / 3）
- **继续提示**：非最后一页时显示闪烁的"点击继续"提示
- **按钮显示**：只在最后一页显示操作按钮

## 🚀 使用示例

### 基础用法（短内容，单页）

```tsx
import StardewDialog from '@/components/StardewDialog';

function App() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button onClick={() => setVisible(true)}>打开对话框</button>
      <StardewDialog
        visible={visible}
        content="这是一个短消息，会在一页内显示。"
        speaker="系统"
        speakerImage="/avatar.png"
        onOk={() => {
          console.log('确定');
          setVisible(false);
        }}
        onCancel={() => {
          console.log('取消');
          setVisible(false);
        }}
        onClose={() => setVisible(false)}
      />
    </>
  );
}
```

### 长内容自动分页

```tsx
<StardewDialog
  visible={true}
  content="这是一段非常长的内容，会自动分割成多页显示。系统会根据设定的字符数限制，智能地在合适的位置进行分页，确保每页内容都能完整显示在对话框中。当用户阅读完当前页后，可以点击屏幕任意位置或确定按钮切换到下一页。"
  maxCharsPerPage={100}  // 每页最大字符数
  enableMultiStep={true}  // 启用多步骤模式
  onOk={() => console.log('确定')}
  onClose={() => console.log('关闭')}
/>
```

### 使用数组手动控制分页

```tsx
<StardewDialog
  visible={true}
  content={[
    '这是第一页的内容。',
    '这是第二页的内容，可以包含更多信息。',
    '这是最后一页，会显示确定和取消按钮。'
  ]}
  onOk={() => console.log('确定')}
  onCancel={() => console.log('取消')}
  onClose={() => console.log('关闭')}
/>
```

### 禁用多步骤模式

```tsx
<StardewDialog
  visible={true}
  content="虽然内容很长，但我不想要分页效果。"
  enableMultiStep={false}  // 禁用多步骤模式
  onOk={() => console.log('确定')}
/>
```

## 📖 API 参数

### StardewDialogProps

| 参数 | 类型 | 默认值 | 必填 | 说明 |
|------|------|--------|------|------|
| `visible` | `boolean` | - | ✅ | 是否显示对话框 |
| `content` | `string \| string[]` | - | ✅ | 对话内容（字符串或字符串数组） |
| `speakerImage` | `string` | - | ❌ | 说话人图片 URL |
| `speaker` | `string` | - | ❌ | 说话人名称 |
| `okText` | `string` | `'确定'` | ❌ | 确定按钮文字 |
| `cancelText` | `string` | `'取消'` | ❌ | 取消按钮文字 |
| `onOk` | `() => void` | - | ❌ | 确定按钮点击事件 |
| `onCancel` | `() => void` | - | ❌ | 取消按钮点击事件 |
| `onClose` | `() => void` | - | ❌ | 点击空白区域关闭回调 |
| `maxCharsPerPage` | `number` | `120` | ❌ | 每页最大字符数 |
| `enableMultiStep` | `boolean` | `true` | ❌ | 是否启用多步骤模式 |

## 🎨 样式特性

### 页码指示器
- 位置：右下角
- 样式：小号像素字体，半透明效果
- 显示格式：`当前页 / 总页数`

### 继续提示
- 位置：右侧中部
- 样式：带背景色的提示框，闪烁动画
- 显示条件：非最后一页时显示

### 按钮区域
- 位置：底部
- 显示条件：只在最后一页显示
- 包含：取消按钮和确定按钮

## 📱 响应式支持

组件已针对移动设备优化：

```scss
@media (max-width: 480px) {
  // 对话框高度减小
  // 字体大小调整
  // 说话人区域缩小
  // 按钮尺寸优化
}
```

## 🧪 测试

组件包含完整的单元测试，覆盖以下场景：

```bash
# 运行对话框组件测试
bun vitest run src/components/StardewDialog/StardewDialog.test.tsx

# 运行所有测试
bun vitest run
```

### 测试覆盖
- ✅ 内容分页逻辑
- ✅ 数组内容支持
- ✅ 禁用多步骤模式
- ✅ 按钮行为
- ✅ 关闭行为
- ✅ 页码指示器和提示

## 💡 最佳实践

### 1. 内容长度建议
- **单页内容**：< 100 字符
- **多页内容**：每页 80-120 字符
- **超长内容**：使用数组手动控制分页

### 2. 分页策略
```tsx
// 推荐：根据内容类型选择分页方式
const shortMessage = "短消息";
const longMessage = "这是一段很长的内容...";
const customPages = [
  "第一页：介绍",
  "第二页：详细说明",
  "第三页：总结"
];

<StardewDialog
  content={longMessage}
  maxCharsPerPage={100}  // 自动分页
/>

<StardewDialog
  content={customPages}  // 手动控制分页
/>
```

### 3. 用户体验优化
```tsx
// 为重要操作添加确认
<StardewDialog
  content="确定要删除这条记录吗？此操作不可恢复。"
  okText="确定删除"
  cancelText="取消"
  onOk={handleDelete}
  onCancel={handleCancel}
/>

// 多步骤说明
<StardewDialog
  content={[
    '欢迎使用本功能！',
    '第一步：点击这里进行设置...',
    '第二步：确认信息...',
    '完成！点击确定开始。'
  ]}
  onOk={startProcess}
/>
```

## 🔧 技术细节

### 内容分割算法
```typescript
// 智能断点选择
1. 优先在空格处断句
2. 其次在标点符号处断句
3. 最后按固定字符数分割

// 断点优先级
lastSpace > lastPunctuation > maxCharsPerPage
```

### 状态管理
```typescript
const [currentPage, setCurrentPage] = useState(0);
const [totalPages, setTotalPages] = useState(1);
const hasMultiplePages = pages.length > 1;
const isLastPage = currentPage >= totalPages - 1;
```

### 交互逻辑
```typescript
// 点击遮罩
if (hasMultiplePages && !isLastPage) {
  setCurrentPage(prev => prev + 1);  // 下一页
} else {
  onClose();  // 关闭
}

// 点击确定
if (hasMultiplePages && !isLastPage) {
  setCurrentPage(prev => prev + 1);  // 下一页
} else {
  onOk();  // 确认
}
```

## 📝 常见问题

### Q: 如何设置每页字符数？
A: 使用 `maxCharsPerPage` 参数，默认值为 120。

### Q: 如何禁用分页？
A: 设置 `enableMultiStep={false}`。

### Q: 数组内容和自动分页有什么区别？
A: 
- **数组内容**：完全手动控制，每个元素为一页
- **自动分页**：根据字符数自动分割，智能断句

### Q: 按钮什么时候显示？
A: 只在最后一页显示操作按钮。

### Q: 如何监听页面切换？
A: 目前不支持页面切换回调，可以通过传入数组内容并在每页设置不同的内容来间接实现。

## 🎯 总结

多步骤对话框组件提供了以下优势：

1. ✅ **更好的阅读体验**：长内容分页显示，避免滚动
2. ✅ **清晰的视觉引导**：页码指示和继续提示
3. ✅ **灵活的交互方式**：点击屏幕或按钮切换
4. ✅ **智能的内容分割**：自动在合适位置断句
5. ✅ **完全向后兼容**：短内容不受影响
6. ✅ **完善的测试覆盖**：确保功能稳定

使用这个组件，可以让你的对话框在展示长内容时更加优雅和专业！
