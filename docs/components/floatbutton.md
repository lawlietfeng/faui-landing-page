# float_button 悬浮按钮组件
在页面固定位置提供全局悬浮操作按钮，支持基础按钮、展开式按钮组及回到顶部功能。

## 适用场景
- 提供全局快捷操作，如"联系客服"、"发布内容"
- 长页面中快速回到顶部
- 全局操作过多时，使用按钮组收纳，悬停或点击时展开
- 带徽标的悬浮通知入口

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `variant` | `string` | `'default'` | 变体：`default`（单按钮）、`group`（按钮组）、`back-top`（回到顶部） |
| `icon` | `string` | - | Ant Design Icons 图标名（如 `PlusOutlined`） |
| `tooltip` | `string` | - | 悬浮提示文字，支持表达式 |
| `type` | `string` | `'default'` | 按钮类型：`default` / `primary` |
| `shape` | `string` | `'circle'` | 形状：`circle` / `square` |

**Group 专有属性**（`variant: "group"` 时）：
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `trigger` | `string` | `'hover'` | 展开触发方式：`click` / `hover` |
| `items` | `object[]` | `[]` | 子按钮配置数组 |

## 完整示例
页面右下角同时放置"联系客服"按钮组和"回到顶部"按钮：

```json
[
  {
    "id": "global-back-top",
    "component": "float_button",
    "variant": "back-top",
    "icon": "VerticalAlignTopOutlined",
    "tooltip": "回到顶部"
  },
  {
    "id": "global-service-group",
    "component": "float_button",
    "variant": "group",
    "trigger": "hover",
    "type": "primary",
    "icon": "CustomerServiceOutlined",
    "style": { "right": 94 },
    "items": [
      {
        "icon": "MessageOutlined",
        "tooltip": "在线咨询",
        "on_tap": [
          {
            "action": "message",
            "payload": { "type": "info", "content": "正在连接人工客服..." }
          }
        ]
      },
      { "icon": "PhoneOutlined", "tooltip": "电话回拨" }
    ]
  }
]
```

## 常见问题
**Q: 配置了 icon 却没有显示图标？**
`float_button` 的 `icon` 直接接收 Ant Design Icons 的名称字符串（如 `SettingOutlined`），不接受自定义组件 ID。

**Q: group 变体主按钮的 on_tap 没有触发？**
`variant: "group"` 时主按钮用于展开/收起子按钮，`on_tap` 会被忽略。点击逻辑请配置在 `items` 各子按钮的 `on_tap` 中。

**Q: 如何控制悬浮按钮在屏幕上的位置？**
默认固定在右下角（`right: 24px, bottom: 24px`）。多个按钮会重叠，可通过 `style` 修改位置，如 `{"style": {"right": 94}}`。
