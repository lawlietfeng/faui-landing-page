# 本地开发指南

本文面向在本地开发环境中使用 faui 的场景。faui 通过 `file:` 协议以 symlink 方式引入，无需发布到 npm。

## 1. 项目结构

```
pro/my/
├── faui/                  # JSON Schema UI 渲染库
│   ├── src/               # 源码
│   ├── dist/              # 构建产物
│   └── docs/              # 完整组件文档
└── faui-landing-page/     # 展示站点
    └── node_modules/faui → ../../faui  (symlink)
```

## 2. 日常开发流程

修改 faui 源码后，重新构建即可：

```bash
cd faui && npm run build
```

landing-page 会通过 symlink 自动引用最新的 `dist/` 产物，无需手动复制。

## 3. 最小可运行示例

```tsx
import { Renderer } from 'faui';
import type { ActivitySnapshot, HttpRequestConfig } from 'faui';

const schema: ActivitySnapshot[] = [
  {
    type: 'ACTIVITY_SNAPSHOT',
    content: {
      components: [
        {
          id: 'root',
          component: 'box',
          layout: 'vertical',
          spacing: 12,
          padding: 16,
          children: ['title', 'name-input'],
        },
        {
          id: 'title',
          component: 'text',
          content: '用户信息',
          style: { fontSize: '18px', fontWeight: 'bold' },
        },
        {
          id: 'name-input',
          component: 'input',
          placeholder: '请输入姓名',
          value: { path: '/name' },
          on_change: { action: 'update_data', path: '/name', value: '${value}' },
        },
      ],
      dataModel: { name: '' },
    },
  },
];

const httpRequest = async (config: HttpRequestConfig) => {
  const response = await fetch(config.url, {
    method: config.method,
    headers: config.headers,
    body: config.body ? JSON.stringify(config.body) : undefined,
  });
  return response.json();
};

export default function App() {
  return <Renderer schema={schema} httpRequest={httpRequest} />;
}
```

## 4. Schema 约束

- `schema` 必须是数组
- 至少有一个 `type: 'ACTIVITY_SNAPSHOT'`
- `content.components` 中必须存在 `id: 'root'` 的根组件
- 组件通过 `children: string[]` 关联子组件 `id`

## 5. 可选能力

### 初始数据覆盖

```tsx
<Renderer schema={schema} initialData={{ name: '张三' }} />
```

### 监听 action 执行

```tsx
<Renderer
  schema={schema}
  onAction={(action, context) => {
    console.log('action', action);
  }}
/>
```

### 注入自定义组件

```tsx
import type { ComponentProps } from 'faui';

const MyWidget: React.FC<ComponentProps> = ({ config }) => {
  return <div>{String(config.content ?? '')}</div>;
};

<Renderer schema={schema} customComponents={{ mywidget: MyWidget }} />;
```

## 6. 常见问题

### `Invalid schema: no ACTIVITY_SNAPSHOT found`
`schema` 里没有合法快照对象，检查 `type` 字段。

### `No root component found`
`content.components` 中缺少 `id: 'root'`。

### `http_proxy` 没有生效
`Renderer` 没有传 `httpRequest`，或 `http_config.path` 不是可访问地址。

## 7. 进一步阅读

- Form 规则与提交流程：参见 Form-guide 文档
- 各组件详细说明：左侧分类导航
