# space 间距组件
为一组相邻的子组件设置统一的间距和对齐方式，比 `flex` / `box` 更加轻量。

## 适用场景
- 将多个按钮按水平或垂直方向排列并保持统一间距
- 在同一行内放置多个表单项或展示项
- 快速垂直排列一系列卡片或文本段落
- 标签组自动换行排列

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| direction | `string` | `"horizontal"` | 间距方向，`"horizontal"` 或 `"vertical"` |
| size | `string \| number \| [number, number]` | `"small"` | 间距大小，可选 `"small"` / `"middle"` / `"large"` 或像素值 |
| align | `string` | - | 交叉轴对齐：`"start"` / `"center"` / `"end"` / `"baseline"` |
| wrap | `boolean` | `false` | 水平方向时是否自动换行 |
| split | `string` | - | 分隔符，目前仅支持 `"divider"` |

## 完整示例
```json
[
  {
    "id": "action-bar",
    "component": "space",
    "direction": "horizontal",
    "size": "middle",
    "split": "divider",
    "children": ["btn-edit", "btn-delete", "btn-more"]
  },
  {
    "id": "btn-edit",
    "component": "button",
    "type": "link",
    "label": "编辑"
  },
  {
    "id": "btn-delete",
    "component": "button",
    "type": "link",
    "danger": true,
    "label": "删除"
  },
  {
    "id": "btn-more",
    "component": "button",
    "type": "link",
    "label": "更多"
  }
]
```

## 常见问题

**Q: `space` 和 `flex` / `box` 有什么区别？**
`space` 主要用于间距控制，自动为子元素之间加上均匀间距，最适合排布按钮、图标或标签。`flex` 和 `box` 更适合复杂的页面布局。

**Q: 为什么设置了 `wrap: true` 没有生效？**
`wrap` 仅在 `direction="horizontal"` 时有意义，同时需要外层容器宽度有限才能触发换行。

**Q: 可以使用除了 `divider` 以外的自定义分隔符吗？**
目前仅支持 `split: "divider"`。如需自定义分隔符，建议改用 `box` 组件手动插入分隔符。
