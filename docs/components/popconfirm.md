# popconfirm 气泡确认框组件
`popconfirm` 用于在点击目标元素时弹出气泡式确认面板，在不打断用户操作连贯性的情况下进行轻量级二次确认。

## 适用场景
- 删除、清空、重置等危险操作前的二次确认
- 配合 `table` 或 `list` 在行级操作列中嵌套删除确认
- 不需要完整 `modal` 的轻量级状态变更确认
- 需要自动拦截事件冒泡的嵌套交互场景

## 核心属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `title` | `string` | `'确定要执行此操作吗？'` | 确认框标题，支持表达式 |
| `description` | `string` | - | 详细描述，支持表达式 |
| `okText` | `string` | - | 确认按钮文字 |
| `cancelText` | `string` | - | 取消按钮文字 |
| `children` | `string[]` | - | **必填**，触发元素的组件 ID |

## 完整示例

```json
{
  "component": "popconfirm",
  "id": "popconfirm-delete-user",
  "title": "注销用户 ${$current.username}？",
  "description": "注销操作不可逆，包含所有关联数据将被清空。",
  "okText": "确认注销",
  "cancelText": "取消",
  "okType": "primary",
  "placement": "left",
  "on_confirm": [
    {
      "action": "http_proxy",
      "payload": {
        "http_config": {
          "url": "/api/users/${$current.userId}",
          "method": "DELETE"
        }
      }
    },
    {
      "action": "message",
      "payload": { "type": "success", "content": "用户已注销" }
    },
    {
      "action": "update_data",
      "path": "/needRefresh",
      "value": true
    }
  ],
  "children": ["btn-delete"]
}
```

## 常见问题

**Q: 配置了 `popconfirm` 但页面什么也没显示？**
检查 `children` 中是否配置了有效的触发元素 ID。如果 `children` 为空或对应组件不存在，`popconfirm` 会返回 `null`。

**Q: 点击触发元素后不弹窗，直接触发了父级点击事件？**
检查 `disabled` 属性是否被动态表达式求值为 `true`。禁用时 `popconfirm` 不拦截点击，事件会直接向外冒泡。

**Q: `popconfirm` 包裹大块级元素后样式异常？**
`popconfirm` 外部包裹了 `span`（`display: inline-block`），建议 `children` 配置为内联元素如 `button`、`icon` 或 `typography`。
