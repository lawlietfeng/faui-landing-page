# grid 栅格布局组件
`row` 和 `col` 组合构成基于 24 栅格的系统布局，用于将页面划分为等宽或按比例划分的多个列。

## 适用场景
- 将复杂的表单项划分为 2 列或 3 列显示
- 在详情页将多项数据左右排列展示
- 通过不同的 `span` 值实现网格化响应式页面布局
- 配合 `flex` 组件构建更复杂的混合布局

## 核心属性

### Row（行）

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `gutter` | `number \| [number, number]` | `0` | 栅格间隔，数组形式为 `[水平, 垂直]` |
| `align` | `string` | `top` | 垂直对齐：`top`/`middle`/`bottom`/`stretch` |
| `justify` | `string` | `start` | 水平排列：`start`/`end`/`center`/`space-between` 等 |
| `children` | `string[]` | `[]` | 子组件 ID 数组（必须为 `col`） |

### Col（列）

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `span` | `number` | - | 栅格占位格数（总共 24 格） |
| `offset` | `number` | `0` | 左侧间隔格数（空白占位） |
| `children` | `string[]` | `[]` | 该列内部的内容组件 ID |

## 完整示例

```json
[
  {
    "id": "row-1",
    "component": "row",
    "gutter": 16,
    "children": ["r1-col1", "r1-col2"]
  },
  {
    "id": "r1-col1",
    "component": "col",
    "span": 12,
    "children": ["text-left"]
  },
  {
    "id": "r1-col2",
    "component": "col",
    "span": 12,
    "children": ["text-right"]
  },
  {
    "id": "text-left",
    "component": "typography",
    "content": "占据 12/24（左半边）"
  },
  {
    "id": "text-right",
    "component": "typography",
    "content": "占据 12/24（右半边）"
  }
]
```

## 常见问题

**Q: 给 `col` 加背景色后，两个 `col` 之间的 `gutter` 没有空白？**
`gutter` 通过 `col` 内部的 `padding` 实现。直接给 `col` 加背景色会填满 padding 区域。正确做法是在 `col` 内部放一个 `box`，给 `box` 加背景色。

**Q: `row` 里面可以直接放 `button` 或 `input` 吗？**
不可以。`row` 的子节点必须是 `col`，请遵守 `row -> col -> content` 的嵌套结构。

**Q: 已有 `flex` 组件，还需要 `row/col` 吗？**
`flex` 适合一维的局部对齐；`row/col` 适合需要严格 24 等分比例的区域划分。两者可配合使用。
