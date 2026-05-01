# tooltip 文字提示组件
简单的文字提示气泡框，鼠标悬停、点击或聚焦在目标元素上时显示说明性文字。

## 适用场景
- 对专业术语或图标按钮提供辅助性文字说明
- 提示当前元素不可用的原因或操作指引
- 页面空间不足时提供完整信息的悬浮查看
- 输入框的输入提示（focus 触发）

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | `string` | - | **必填**，提示框文字内容，支持插值表达式 |
| placement | `string` | `"top"` | 气泡弹出位置，支持 12 个方位 |
| trigger | `string \| string[]` | `"hover"` | 触发方式：`"hover"` / `"click"` / `"focus"` |
| open | `boolean \| ValueBinding` | - | 控制气泡是否可见，支持双向绑定 |
| color | `string` | - | 气泡背景色，支持主题色名或十六进制色值 |

## 完整示例
```json
[
  {
    "id": "tooltip_demo",
    "type": "element",
    "config": {
      "component": "tooltip",
      "title": "${/userName}，欢迎回来！",
      "placement": "bottomRight",
      "trigger": "click",
      "color": "blue",
      "children": ["user_avatar"]
    }
  },
  {
    "id": "user_avatar",
    "type": "element",
    "config": {
      "component": "avatar",
      "text": "${/userName}"
    }
  }
]
```

## 常见问题

**Q: 为什么 Tooltip 没有弹出来？**
检查 `title` 是否为空（为空时不显示）。另外，如果子组件处于 `disabled` 状态，可能无法响应 hover/click 事件。

**Q: 如何让禁用的按钮也能触发 Tooltip？**
引擎已自动在子组件外部包裹了一层 `<span>`，通常可以正常触发。如仍不行，将按钮放入 `box` 容器中作为 Tooltip 的 children。

**Q: Tooltip 支持渲染复杂组件吗？**
不支持，`title` 仅支持纯文本（可用 `${}` 插值）。如需渲染按钮、表格等复杂内容，请改用 `popover` 组件。
