# flex 弹性布局组件
专为一维布局设计的容器组件，封装 CSS Flexbox，提供直观的属性控制子元素的排列方向、间距和对齐方式。

## 适用场景
- 将按钮、搜索框等元素在同一行水平排列并控制间距
- 将一系列表单项从上到下垂直排列
- 快速实现子元素在容器内的水平和垂直居中
- 两端对齐的页面头部布局（标题 + 操作按钮）

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `vertical` | `boolean` | `false` | 是否垂直排列（`flex-direction: column`） |
| `gap` | `number \| string` | - | 子元素间距，数字或预设 `small`/`middle`/`large` |
| `align` | `string` | - | 交叉轴对齐：`flex-start` / `center` / `flex-end` / `stretch` |
| `justify` | `string` | - | 主轴对齐：`flex-start` / `center` / `space-between` 等 |
| `wrap` | `boolean \| string` | `false` | 子元素超出容器时是否换行 |

## 完整示例
典型顶部操作栏：左侧标题，右侧按钮组，两端对齐且垂直居中：

```json
[
  {
    "id": "page-header",
    "component": "flex",
    "justify": "space-between",
    "align": "center",
    "style": {
      "padding": "16px 24px",
      "backgroundColor": "#fff",
      "borderBottom": "1px solid #f0f0f0"
    },
    "children": ["header-title", "header-actions"]
  },
  {
    "id": "header-title",
    "component": "typography",
    "variant": "title",
    "level": 4,
    "content": "用户管理",
    "style": { "margin": 0 }
  },
  {
    "id": "header-actions",
    "component": "flex",
    "gap": 12,
    "children": ["btn-import", "btn-add"]
  },
  { "id": "btn-import", "component": "button", "content": "批量导入" },
  { "id": "btn-add", "component": "button", "content": "新建用户", "type": "primary" }
]
```

## 常见问题
**Q: 设置了 justify: "center" 但内容没有居中？**
`flex` 默认宽度由内容撑开。如果父容器没有给足宽度，居中无效果。解决办法是加上 `{"style": {"width": "100%"}}`。

**Q: flex 属性是干什么用的？**
用在 `flex` 组件本身作为另一个弹性容器的子节点时，指定它占据父容器剩余空间的比例（如 `"flex": 1`）。

**Q: flex 和 box 组件有什么区别？**
`box` 对应原生 `<div>`，完全自定义 CSS；`flex` 是封装好的弹性布局容器。推荐优先使用 `flex`，能满足 90% 的布局需求。
