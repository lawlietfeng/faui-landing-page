# calendar 日历组件
展示日历面板，允许用户点击选择日期，常用于日期概览、任务排期等场景，具备数据双向绑定能力。

## 适用场景
- 提供直观的日历视图供用户点选日期
- 任务日程看板，结合年月视图展示
- 作为大型表单中的日期拾取控件
- 卡片模式的小型日历面板

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value.path` | `string` | - | 双向绑定的数据路径（如 `/selectedDate`） |
| `format` | `string` | `'YYYY-MM-DD'` | 存入数据的日期格式，兼容 dayjs |
| `fullscreen` | `boolean` | `true` | 是否全屏日历，`false` 为卡片模式 |
| `mode` | `'month' \| 'year'` | `'month'` | 初始面板模式（月视图或年视图） |
| `on_change` | `Action` | - | 选中日期时触发，注入 `${value}` |

## 完整示例
非全屏卡片日历，双向绑定并在选择日期时提示用户：

```json
{
  "id": "dashboard_calendar",
  "component": "calendar",
  "fullscreen": false,
  "format": "YYYY-MM-DD",
  "value": {
    "path": "/calendarDate"
  },
  "on_change": {
    "action": "message",
    "payload": {
      "type": "info",
      "content": "你选择了：${value}"
    }
  },
  "style": {
    "width": 300,
    "border": "1px solid #f0f0f0",
    "borderRadius": 8
  }
}
```

## 常见问题
**Q: 点击日期后外部拿不到数据？**
检查是否配置了 `value.path` 且路径以 `/` 开头。如果同时配置了 `on_change`，需要自行在动作中调用 `update_data` 回写数据，因为自定义 `on_change` 会覆盖默认的双向绑定逻辑。

**Q: 如何控制日历显示的语言？**
底层 Ant Design 日历会根据全局 Locale 配置自动调整（默认中文），组件级别暂不支持单独配置语言。
