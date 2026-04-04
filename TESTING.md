# 项目测试指南

## 测试环境配置

项目使用以下测试工具：
- **Vitest**: 轻量级 Vite 测试框架
- **Testing Library**: React 组件测试库
- **jsdom**: 浏览器环境模拟

## 运行测试

### 运行所有测试
```bash
bun vitest run
```

### 运行特定文件测试
```bash
bun vitest run src/utils/storage.test.ts
```

### 监听模式（开发时使用）
```bash
bun vitest
```

### 生成覆盖率报告
```bash
bun vitest run --coverage
```

## 测试文件位置

测试文件与被测试文件放在同一目录下，命名规则为：
- `*.test.ts` - 工具函数测试
- `*.test.tsx` - 组件测试

### 已编写的测试文件

#### 工具函数测试
- `src/utils/storage.test.ts` - 本地存储工具函数测试（18 个测试用例）
  - 记录增删改查
  - 用户信息管理
  - Token 管理
  - 预算管理

#### API 测试
- `src/api/api.test.ts` - API 函数测试（13 个测试用例）
  - 认证相关（登录、注册、登出、刷新 Token）
  - 记录相关（查询、创建、更新、删除）
  - 预算相关（查询、设置）

#### Hooks 测试
- `src/hooks/useAsync.test.ts` - 异步 Hook 测试（6 个测试用例）
  - 初始化状态
  - 执行异步函数
  - 错误处理
  - 状态重置
  - 回调函数

#### 组件测试
- `src/components/EmptyState/EmptyState.test.tsx` - 空状态组件测试（7 个测试用例）
  - 默认渲染
  - 自定义标题/描述
  - 自定义图标
  - 操作按钮
  
- `src/components/ScrollContainer/ScrollContainer.test.tsx` - 滚动容器测试（3 个测试用例）
  - 子元素渲染
  - 自定义类名
  - 滚动到底部触发

## 测试统计

- **总测试文件数**: 5
- **总测试用例数**: 47
- **通过率**: 100%

## 编写测试的最佳实践

### 1. 工具函数测试
```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { myFunction } from './myModule';

describe('myFunction', () => {
  beforeEach(() => {
    // 清理或重置
  });

  it('should do something', () => {
    expect(myFunction()).toBe(expected);
  });
});
```

### 2. Hooks 测试
```typescript
import { renderHook, act } from '@testing-library/react';
import { useMyHook } from './useMyHook';

describe('useMyHook', () => {
  it('should work correctly', async () => {
    const { result } = renderHook(() => useMyHook());
    
    await act(async () => {
      await result.current.execute();
    });
    
    expect(result.current.data).toBeDefined();
  });
});
```

### 3. 组件测试
```typescript
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
  it('should render correctly', () => {
    render(<MyComponent prop="value" />);
    
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });
});
```

## 测试覆盖的关键功能

### ✅ 已完成测试覆盖
1. **数据存储层**
   - localStorage 操作
   - 数据序列化/反序列化
   - 数据验证

2. **API 层**
   - HTTP 请求调用
   - 参数传递
   - 响应处理

3. **业务逻辑层**
   - 异步操作处理
   - 状态管理
   - 错误处理

4. **UI 组件层**
   - 组件渲染
   - 用户交互
   - 事件处理

## 后续建议

### 建议添加的测试
1. **更多组件测试**
   - PageContainer
   - AnimatedWrapper
   - 页面组件

2. **集成测试**
   - 完整用户流程
   - 多组件交互

3. **E2E 测试**
   - 使用 Playwright 或 Cypress
   - 真实浏览器环境测试

### 提高覆盖率
- 为更多工具函数添加测试
- 为自定义 Hooks 添加测试
- 为复杂组件添加测试

## 常见问题

### Q: 为什么使用 Vitest 而不是 Jest？
A: Vitest 与 Vite 深度集成，配置简单，运行速度快，支持热更新。

### Q: 如何调试测试？
A: 使用 `bun vitest --inspect` 或在 VS Code 中配置调试器。

### Q: 测试失败如何处理？
A: 查看错误信息，检查断言条件，确保测试数据正确。

## 持续集成

在 CI/CD 流程中添加测试步骤：
```yaml
test:
  script: bun vitest run
```
