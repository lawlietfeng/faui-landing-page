# tabs 标签页组件
在一个页面内或容器内平级地切换不同的内容区域。

## 适用场景
- 同一页面内展示多个分类内容（如"基本信息"、"高级设置"）
- 页面内容过多时通过标签页分组以节省空间
- 以卡片形式打开多个独立任务
- 动态标签标题（如显示未读消息数）

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| activeKey | `ValueBinding` | - | **必填**，当前激活标签页 key，必须用 `path` 双向绑定 |
| items | `TabItemConfig[]` | `[]` | 标签页配置，每项包含 `key`、`label`、`children`、`disabled` 等 |
| type | `string` | `"line"` | 页签样式，`"line"` / `"card"` / `"editable-card"` |
| tabPosition | `string` | `"top"` | 页签位置，`"top"` / `"right"` / `"bottom"` / `"left"` |
| centered | `boolean` | `false` | 标签是否居中显示 |

## 完整示例
```json
[
  {
    "id": "user-center-tabs",
    "component": "tabs",
    "activeKey": { "path": "/userCenter/activeTab" },
    "centered": true,
    "size": "large",
    "items": [
      {
        "key": "profile",
        "label": "个人资料",
        "children": ["profile-box"]
      },
      {
        "key": "orders",
        "label": "我的订单 (${/orderCount})",
        "children": ["orders-table"]
      },
      {
        "key": "security",
        "label": "安全设置",
        "disabled": "${!/isVerified}",
        "children": ["security-box"]
      }
    ]
  },
  {
    "id": "profile-box",
    "component": "text",
    "content": "这里是个人资料内容..."
  },
  {
    "id": "orders-table",
    "component": "text",
    "content": "这里是订单列表内容..."
  },
  {
    "id": "security-box",
    "component": "text",
    "content": "这里是安全设置内容..."
  }
]
```

## 常见问题

**Q: 为什么点击切换 Tab 内容没有切换？**
最常见原因是没有为 `activeKey` 绑定 `path`。必须配置 `"activeKey": { "path": "/someKey" }`，否则组件变成只读状态。

**Q: 标签页的 `label` 支持动态改变吗？**
支持，`label` 支持插值表达式，如 `"label": "消息 (${/msgCount})"`。

**Q: `destroyOnHidden` 和 `forceRender` 有什么区别？**
`destroyOnHidden: true` 在切走时销毁 DOM 释放内存，适合重数据 Tab。`forceRender: true` 在切走时仍保留 DOM，适合需要保持状态的场景（如 iframe）。
