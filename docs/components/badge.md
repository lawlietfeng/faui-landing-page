# badge 徽标组件
在元素右上角展示消息数量、状态小红点，或作为独立的状态指示器。

## 适用场景
- 在头像、铃铛图标右上角显示未读消息数
- 在表格或详情页中用带颜色的圆点和文字表示状态（如"进行中"、"已完成"）
- 使用红点提示用户有新动态，不强调具体数量
- 动态绑定数据模型中的未读数

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `count` | `number` | - | 展示的数字，`0` 时默认隐藏 |
| `dot` | `boolean` | `false` | 仅显示小红点，不显示数字 |
| `status` | `string` | - | 状态点类型：`success` / `processing` / `error` / `warning` / `default` |
| `content` | `string` | - | 状态点后面的说明文本，支持表达式 |
| `overflowCount` | `number` | `99` | 封顶数字，超过则显示如 `99+` |

## 完整示例
四种常见徽标用法：静态数字、红点提示、动态绑定及独立状态指示器：

```json
[
  {
    "id": "badge-container",
    "component": "space",
    "size": "large",
    "children": ["badge-basic", "badge-dot", "badge-dynamic", "badge-status"]
  },
  {
    "id": "badge-basic",
    "component": "badge",
    "count": 5,
    "children": ["avatar-1"]
  },
  { "id": "avatar-1", "component": "avatar", "shape": "square" },
  {
    "id": "badge-dot",
    "component": "badge",
    "dot": true,
    "children": ["avatar-2"]
  },
  { "id": "avatar-2", "component": "avatar", "shape": "square" },
  {
    "id": "badge-dynamic",
    "component": "badge",
    "data": { "path": "/msgCount" },
    "children": ["avatar-3"]
  },
  { "id": "avatar-3", "component": "avatar", "shape": "square" },
  {
    "id": "badge-status",
    "component": "badge",
    "status": "success",
    "content": "已通过"
  }
]
```

## 常见问题
**Q: 设置了 count=0 徽标不见了？**
默认数量为 `0` 时徽标自动隐藏，需要强制显示请配置 `"showZero": true`。

**Q: 状态圆点旁边的文字没有显示？**
确保文字配置在 `content` 属性中，并且同时配置了 `status` 或 `color` 属性。

**Q: 如何自定义徽标的颜色？**
通过 `color` 属性传入色值（如 `"#f5222d"` 或 `"purple"`），适用于数字徽标和状态圆点。
