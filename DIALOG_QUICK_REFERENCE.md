# 多步骤对话框 - 快速参考

## 🚀 快速开始

### 基础用法
```tsx
import StardewDialog from '@/components/StardewDialog';

<StardewDialog
  visible={true}
  content="短内容自动单页显示"
  onOk={() => console.log('确定')}
  onClose={() => console.log('关闭')}
/>
```

### 长内容分页
```tsx
<StardewDialog
  visible={true}
  content="很长的内容...".repeat(10)
  maxCharsPerPage={100}
  onOk={() => console.log('确定')}
/>
```

### 手动分页
```tsx
<StardewDialog
  visible={true}
  content={['第一页', '第二页', '第三页']}
  onOk={() => console.log('确定')}
/>
```

## 📖 核心参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `visible` | boolean | - | 是否显示 |
| `content` | string \| string[] | - | 内容 |
| `maxCharsPerPage` | number | 120 | 每页字符数 |
| `enableMultiStep` | boolean | true | 启用分页 |
| `onOk` | () => void | - | 确定回调 |
| `onClose` | () => void | - | 关闭回调 |

## 💡 交互方式

- **点击遮罩** → 下一页 / 关闭
- **点击确定** → 下一页 / 确认
- **点击取消** → 取消操作

## 🎨 视觉元素

- **页码指示器**：右下角显示 `1 / 3`
- **继续提示**：闪烁的"点击继续"
- **按钮区域**：只在最后一页显示

## 🧪 运行测试

```bash
# 组件测试
bun vitest run src/components/StardewDialog/StardewDialog.test.tsx

# 所有测试
bun vitest run

# 类型检查
bun run typecheck
```

## 📚 详细文档

- [MULTI_STEP_DIALOG.md](./MULTI_STEP_DIALOG.md) - 完整使用指南
- [DIALOG_REFACTOR_SUMMARY.md](./DIALOG_REFACTOR_SUMMARY.md) - 改造总结
- [src/components/StardewDialog/examples.tsx](./src/components/StardewDialog/examples.tsx) - 使用示例
