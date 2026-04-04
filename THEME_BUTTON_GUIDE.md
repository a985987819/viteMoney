# ThemeButton 快速使用指南

## 🚀 快速开始

### 1. 导入组件
```tsx
import ThemeButton from '@/components/ThemeButton';
```

### 2. 基础用法
```tsx
// 默认按钮
<ThemeButton onClick={() => console.log('clicked')}>
  按钮文本
</ThemeButton>

// 指定主题
<ThemeButton theme="spring">春主题</ThemeButton>
<ThemeButton theme="summer">夏主题</ThemeButton>
<ThemeButton theme="autumn">秋主题</ThemeButton>
<ThemeButton theme="winter">冬主题</ThemeButton>
```

### 3. 常用属性

#### 主题
```tsx
<ThemeButton theme="spring">清新春天</ThemeButton>
<ThemeButton theme="summer">热情夏天</ThemeButton>
<ThemeButton theme="autumn">丰收秋天</ThemeButton>
<ThemeButton theme="winter">纯净冬天</ThemeButton>
```

#### 尺寸
```tsx
<ThemeButton size="small">小按钮</ThemeButton>
<ThemeButton size="medium">中按钮</ThemeButton>
<ThemeButton size="large">大按钮</ThemeButton>
```

#### 背景图
```tsx
<ThemeButton 
  theme="summer"
  backgroundImage="https://example.com/summer-bg.png"
>
  带背景图的按钮
</ThemeButton>
```

#### 图标
```tsx
import { PlusOutlined } from '@ant-design/icons';

<ThemeButton icon={<PlusOutlined />}>
  带图标的按钮
</ThemeButton>
```

#### 块级按钮
```tsx
<ThemeButton block>
  占满父容器宽度的按钮
</ThemeButton>
```

#### 禁用状态
```tsx
<ThemeButton disabled>
  禁用的按钮
</ThemeButton>
```

### 4. 在页面中使用

#### Bill 页面（夏主题）示例
```tsx
import ThemeButton from '@/components/ThemeButton';
import { FilterOutlined, CalendarOutlined } from '@ant-design/icons';

function BillPage() {
  return (
    <div className={styles.billContainer}>
      {/* 筛选和日期按钮 */}
      <div className={styles.filterSection}>
        <ThemeButton 
          theme="summer"
          icon={<FilterOutlined />}
          onClick={openFilter}
        >
          筛选
        </ThemeButton>
        
        <ThemeButton 
          theme="summer"
          icon={<CalendarOutlined />}
          onClick={openDatePicker}
        >
          日期
        </ThemeButton>
      </div>
      
      {/* 其他内容 */}
    </div>
  );
}
```

#### Statistics 页面（秋主题）示例
```tsx
import ThemeButton from '@/components/ThemeButton';

function StatisticsPage() {
  return (
    <div className={styles.statsContainer}>
      <ThemeButton 
        theme="autumn"
        size="large"
        block
        onClick={exportData}
      >
        导出数据
      </ThemeButton>
    </div>
  );
}
```

#### Profile 页面（冬主题）示例
```tsx
import ThemeButton from '@/components/ThemeButton';

function ProfilePage() {
  return (
    <div className={styles.profileContainer}>
      <ThemeButton 
        theme="winter"
        onClick={handleLogout}
        block
      >
        退出登录
      </ThemeButton>
    </div>
  );
}
```

## 🎨 样式定制

### 自定义类名
```tsx
<ThemeButton 
  className="my-custom-class"
  activeClassName="my-active-class"
>
  自定义样式
</ThemeButton>
```

### 内联样式
```tsx
<ThemeButton 
  style={{ 
    marginTop: '10px',
    marginBottom: '10px'
  }}
>
  自定义边距
</ThemeButton>
```

## 📖 API 文档

### ThemeButtonProps

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `theme` | `'spring' \| 'summer' \| 'autumn' \| 'winter' \| 'default'` | `'default'` | 按钮主题 |
| `size` | `'small' \| 'medium' \| 'large'` | `'medium'` | 按钮尺寸 |
| `backgroundImage` | `string` | - | 背景图片 URL |
| `onClick` | `() => void` | - | 点击事件 |
| `className` | `string` | `''` | 自定义类名 |
| `activeClassName` | `string` | `''` | 按下状态的类名 |
| `disabled` | `boolean` | `false` | 是否禁用 |
| `style` | `React.CSSProperties` | - | 自定义内联样式 |
| `block` | `boolean` | `false` | 是否块级显示 |
| `icon` | `React.ReactNode` | - | 图标 |
| `type` | `'default' \| 'primary' \| 'dashed' \| 'text' \| 'link'` | `'default'` | 按钮类型 |

## 🎯 最佳实践

### 1. 主题一致性
```tsx
// ✅ 推荐：在同一页面使用相同主题
<ThemeButton theme="summer">按钮 1</ThemeButton>
<ThemeButton theme="summer">按钮 2</ThemeButton>

// ❌ 不推荐：混用主题
<ThemeButton theme="summer">按钮 1</ThemeButton>
<ThemeButton theme="winter">按钮 2</ThemeButton>
```

### 2. 尺寸层次
```tsx
// ✅ 推荐：重要操作使用大尺寸
<ThemeButton size="large" block>主要操作</ThemeButton>
<ThemeButton size="small">次要操作</ThemeButton>
```

### 3. 背景图使用
```tsx
// ✅ 推荐：确保图片可访问
<ThemeButton 
  backgroundImage="https://cdn.example.com/bg.png"
  style={{ backgroundColor: '#f0f0f0' }} // 降级背景色
>
  带背景图的按钮
</ThemeButton>
```

### 4. 图标使用
```tsx
// ✅ 推荐：图标和文本一起使用
<ThemeButton icon={<PlusOutlined />}>添加记录</ThemeButton>

// ❌ 不推荐：只有图标没有文本（除非是图标按钮）
<ThemeButton icon={<PlusOutlined />} />
```

## 🔧 常见问题

### Q: 如何创建自定义主题？
A: 在 `ThemeButton/index.module.scss` 中添加新的主题配色：
```scss
$custom-theme: (
  primary: #YOUR_COLOR,
  // ... 其他配色
);

.custom {
  background-color: map-get($custom-theme, bg-light);
  border-color: map-get($custom-theme, border);
  // ...
}
```

### Q: 如何修改按钮的按下效果？
A: 修改 `activeClassName` 或使用 CSS：
```tsx
<ThemeButton 
  activeClassName="my-active"
  onClick={handleClick}
>
  按钮
</ThemeButton>
```

### Q: 按钮不显示背景图怎么办？
A: 检查以下几点：
1. 确保图片 URL 正确
2. 确保图片格式支持
3. 检查网络请求
4. 添加降级背景色

## 📱 响应式使用

```tsx
// 移动端使用小尺寸
<ThemeButton size="small" block>
  移动端按钮
</ThemeButton>

// 桌面端使用标准尺寸
<ThemeButton size="medium">
  桌面端按钮
</ThemeButton>
```

## 🎉 总结

ThemeButton 组件提供了：
- ✅ 四个季节主题
- ✅ 灵活的尺寸和样式
- ✅ 完整的 TypeScript 支持
- ✅ 响应式设计
- ✅ 易于使用和扩展

开始使用 ThemeButton，让你的界面更加生动有趣吧！
