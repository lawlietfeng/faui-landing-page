# popover 气泡卡片组件
`popover` 用于点击或鼠标移入元素时弹出气泡式卡片浮层，比 `tooltip` 能承载更复杂的内容。

## 适用场景
- 为按钮或图标提供带标题和较长描述的补充说明
- 作为轻量容器承载简单内容，无需打开完整弹窗
- 用户头像悬停时展示用户详情卡片
- 需要受控显隐的浮层交互场景

## 核心属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | - | 卡片标题，支持表达式 |
| `content` | `string` | - | 卡片正文，支持表达式 |
| `placement` | `string` | `'top'` | 弹出位置，支持 12 个方位 |
| `trigger` | `string \| string[]` | `'hover'` | 触发行为：`hover`/`click`/`focus` |
| `children` | `string[]` | - | **必填**，触发元素的组件 ID |

## 完整示例

```json
{
  "component": "popover",
  "id": "popover-complex",
  "title": "用户 ${$root.currentUser.name} 详情",
  "content": "角色：管理员\n上次登录：2023-10-01",
  "trigger": "click",
  "placement": "bottomRight",
  "arrow": false,
  "children": ["avatar-component"]
}
```

## 常见问题

**Q: 配置了 `popover` 但悬停没有反应？**
`popover` 必须配置 `children` 作为触发锚点。检查 `children` 数组是否包含有效的组件 ID，且对应组件确实存在。

**Q: 气泡卡片宽度太窄或太宽怎么调整？**
`title` 和 `content` 主要是纯文本。可通过外层全局 CSS 调整气泡框样式。

**Q: 禁用的按钮放在 `children` 里无法触发气泡？**
`disabled: true` 的按钮会忽略鼠标事件。建议在禁用组件外部再包一层 `box` 作为触发器。
