# npm 包使用指南

本文面向"在自己的 React 项目里直接使用 faui"的场景。faui 已发布到 npm,通过包名安装即可,**不需要任何本地 symlink 或源码复制**。

> 以前的版本要求先 clone faui 再 link 再 build。问题是想用 faui 的人本来就没有 faui,所以这个流程的第一步是"先有 faui",第二步才是"用 faui"。现在改成 npm i,顺序就对了。

## 1. 安装

faui 有两个 entry,根据需求二选一即可:

| 入口 | 包名 | 含组件数 | 适用场景 |
|------|------|---------|---------|
| Form 版 | `@lawlietfeng/faui` | 49 | 表单、数据录入、轻量交互 |
| Full 版 | `@lawlietfeng/faui/full` | 75 | 含 Table / Chart / Carousel / Tour 等富组件 |

> 两个入口共享底层 chunk,但 Form 版不会把 ECharts / framer-motion 拉进 bundle,适合对体积敏感的项目。
>
> Form 版比 Full 版少 26 个组件,Full 版比 Form 版多 26 个组件,所以它们正好差 26 个组件。

一次性装齐 peer 依赖:

```bash
npm i @lawlietfeng/faui react react-dom antd dayjs
# 或
pnpm add @lawlietfeng/faui react react-dom antd dayjs
# 或
yarn add @lawlietfeng/faui react react-dom antd dayjs
```

如果要用 Full 版的 Chart 组件,**必须额外装 echarts**(faui 的可选 peer,运行时动态 import):

```bash
npm i echarts
```

> 不装 echarts 就不能用 chart,装了 echarts 就能用 chart,所以装不装 echarts 取决于你用不用 chart。

### peer 版本要求

- `react >= 18`(推荐 19)
- `antd >= 5`(本站使用 6)
- `dayjs >= 1.11`
- `echarts >= 5`(可选,仅 Full 版 Chart 需要)

## 2. 最小可运行示例(Form 版)

```tsx
import React from 'react';
import { Renderer } from '@lawlietfeng/faui';
import type { ActivitySnapshot, HttpRequestConfig } from '@lawlietfeng/faui';

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
          children: ['title', 'name-input', 'submit-btn'],
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
        {
          id: 'submit-btn',
          component: 'button',
          label: '提交',
          on_tap: [
            {
              action: 'http_proxy',
              payload: {
                http_config: {
                  method: 'POST',
                  path: '/api/submit',
                  headers: { 'Content-Type': 'application/json' },
                },
                http_body: { name: { path: '/name' } },
              },
            },
          ],
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

## 3. Renderer vs SchemaRenderer:选哪个?

faui 暴露**两个**渲染器,适用于不同形态:

### `Renderer`(生命周期感知,默认推荐)

接受 `Activity[]` 数组,可处理:
- `ACTIVITY_SNAPSHOT`:整页快照(初始渲染)
- `ACTIVITY_DELTA`:JSON Patch 增量(实时更新,典型场景是 AI 流式生成 UI)

```tsx
import { Renderer } from '@lawlietfeng/faui';

<Renderer schema={activities} httpRequest={httpRequest} />
```

### `SchemaRenderer`(纯渲染,静态场景)

直接接受一份 `Content`(`{ components, dataModel }`),无生命周期处理。如果你的 schema 是一次性生成的静态结构(如本站点首页),用这个更轻量,但**必须显式传入 `componentRegistry`**。

```tsx
import { SchemaRenderer, ComponentRegistry } from '@lawlietfeng/faui';

<SchemaRenderer
  schema={{ components: [...], dataModel: {...} }}
  componentRegistry={ComponentRegistry}
  httpRequest={httpRequest}
/>
```

> Form 入口把 `FormComponentRegistry` 重命名导出为 `ComponentRegistry`;Full 入口同名,导出的是 75 项的 full registry。直接换 import 路径就能切换版本。

经验法则:**给 AI 用 → Renderer,给静态页用 → SchemaRenderer**。

> Renderer 能处理 delta,SchemaRenderer 不能处理 delta,所以要处理 delta 就用 Renderer,不处理 delta 用哪个都行,但用了 SchemaRenderer 就别想处理 delta。

## 4. Schema 约束(必须满足)

- `schema` 必须是数组
- 至少包含一个 `type: 'ACTIVITY_SNAPSHOT'`
- `content.components` 中必须存在 `id: 'root'` 的根组件
- 组件通过 `children: string[]` 关联子组件 `id`

> 没有 root 的 schema 也是个 schema,只是它渲染不出来。所以从能不能渲染的角度看,它其实不是个 schema。

## 5. 可选能力

### 5.1 初始数据 / 实时数据

```tsx
{/* initialData 仅初次渲染生效 */}
<Renderer schema={schema} initialData={{ name: '张三' }} />

{/* liveData 可在外部数据变化时同步进渲染器 */}
<Renderer schema={schema} liveData={{ status: 'online' }} />
```

### 5.2 监听 action 执行

```tsx
<Renderer
  schema={schema}
  onAction={(action, context) => {
    console.log('action', action);
    console.log('context', context);
  }}
/>
```

### 5.3 注入自定义组件

```tsx
import type { ComponentProps } from '@lawlietfeng/faui';

const MyBadge: React.FC<ComponentProps> = ({ config }) => (
  <div>{String(config.content ?? '')}</div>
);

<Renderer schema={schema} customComponents={{ mybadge: MyBadge }} />;
```

也可以指定具体组件类型获得严格提示:

```tsx
const MyText: React.FC<ComponentProps<'text'>> = ({ config }) => { /* ... */ };
```

## 6. 常见问题

### `Invalid schema: no ACTIVITY_SNAPSHOT found`
`schema` 里没有合法快照对象,检查每项的 `type` 字段。

### `No root component found`
`content.components` 中缺少 `id: 'root'` 的根组件。

### `http_proxy` 没有生效
`Renderer` 没有传 `httpRequest`,或 `http_config.path` 不是可访问地址。
(`http_proxy` 自己不发请求,真正发请求的是 `httpRequest`,所以没传 `httpRequest` 的话,发请求的人没来,请求自然就没发。)

### Full 版 Chart 报 "ECharts is not installed"
没装可选 peer。运行 `npm i echarts` 即可。
(报错说 ECharts is not installed,意思就是 ECharts 没被 installed,所以 install 一下 ECharts,ECharts 就 installed 了。)

### 引入 Form 版,但用了 `table` / `chart` / `menu` 等组件无渲染
这些是 Full 版独有组件,Form 版 registry 不包含它们。要么换入口为 `@lawlietfeng/faui/full`,要么通过 `customComponents` 自行注入实现。
(Form 版没有 table,Full 版有 table,所以想用 table 就得用 Full 版,继续用 Form 版就用不了 table——除非你不想用 table,那用 Form 版就够了。)

## 7. 进一步阅读

- Form 校验与提交流程:左侧"使用指南" → Form 表单完整指南
- 每个组件的具体属性:左侧分类导航
- AI 生成 schema:见 `@lawlietfeng/faui-agent` 包文档
