# timepicker 组件

`timepicker` 是时间选择器组件，用于选择时间点（小时:分钟:秒），适用于会议时间、预约时间、上班时间等场景。

## 适用场景

- 会议时间选择
- 预约时间选择
- 上班打卡时间设置
- 营业时间配置
- 任何需要选择时间点的场景

## 与 datepicker 的区别

| 组件 | 选择内容 | 适用场景 |
|------|---------|---------|
| `datepicker` | 年月日 | 生日、日期选择 |
| `timepicker` | 时分秒 | 时间点选择 |
| `datepicker` + `showTime: true` | 年月日 + 时分秒 | 需要完整日期时间 |

## 核心属性

### format（时间格式）

控制显示和提交的时间格式：

| format | 示例 | 说明 |
|--------|------|------|
| `"HH:mm"` | 14:30 | 小时:分钟（24小时制） |
| `"HH:mm:ss"` | 14:30:45 | 小时:分钟:秒 |
| `"hh:mm"` | 02:30 | 小时:分钟（12小时制，需要配合 a） |
| `"hh:mm:ss a"` | 02:30:45 PM | 12小时制 + AM/PM |

默认格式是 `"HH:mm:ss"`。

### placeholder（占位提示）

```json
{
  "id": "meeting-time",
  "component": "timepicker",
  "placeholder": "请选择会议时间"
}
```

### value.path（数据绑定）

```json
{
  "id": "meeting-time",
  "component": "timepicker",
  "value": { "path": "/meetingTime" }
}
```

### on_change（值变化事件）

**必须配置**：

```json
{
  "id": "meeting-time",
  "component": "timepicker",
  "value": { "path": "/meetingTime" },
  "on_change": { "action": "update_data", "path": "/meetingTime", "value": "${value}" }
}
```

### rules（校验规则）

```json
{
  "id": "meeting-time",
  "component": "timepicker",
  "rules": [
    { "required": true, "message": "请选择会议时间" }
  ]
}
```

### minuteStep（分钟间隔）

设置分钟选择器的步长：

```json
{
  "id": "meeting-time",
  "component": "timepicker",
  "minuteStep": 15
}
```

设置为 `15` 则分钟只能选 0、15、30、45；设置为 `5` 则可以选 0、5、10、15...

### secondStep（秒间隔）

设置秒选择器的步长：

```json
{
  "id": "meeting-time",
  "component": "timepicker",
  "secondStep": 10
}
```

## 完整示例

### 基础时间选择

```json
{
  "id": "meeting-time",
  "component": "timepicker",
  "placeholder": "请选择会议时间",
  "value": { "path": "/meetingTime" },
  "rules": [{ "required": true, "message": "请选择会议时间" }],
  "on_change": { "action": "update_data", "path": "/meetingTime", "value": "${value}" }
}
```

### 仅小时和分钟（无秒）

```json
{
  "id": "alarm-time",
  "component": "timepicker",
  "placeholder": "请选择闹钟时间",
  "format": "HH:mm",
  "value": { "path": "/alarmTime" },
  "rules": [{ "required": true, "message": "请选择时间" }],
  "on_change": { "action": "update_data", "path": "/alarmTime", "value": "${value}" }
}
```

### 带分钟间隔（15分钟间隔）

```json
{
  "id": "schedule-time",
  "component": "timepicker",
  "placeholder": "请选择预约时间",
  "format": "HH:mm",
  "minuteStep": 15,
  "value": { "path": "/scheduleTime" },
  "rules": [{ "required": true, "message": "请选择预约时间" }],
  "on_change": { "action": "update_data", "path": "/scheduleTime", "value": "${value}" }
}
```

### 营业时间范围（两个时间选择器）

```json
[
  {
    "id": "business-hours-box",
    "component": "box",
    "layout": "horizontal",
    "spacing": 12,
    "children": ["start-time", "to-label", "end-time"]
  },
  {
    "id": "start-time",
    "component": "timepicker",
    "placeholder": "开始时间",
    "format": "HH:mm",
    "minuteStep": 30,
    "value": { "path": "/openTime" },
    "rules": [{ "required": true, "message": "请选择开始时间" }],
    "on_change": { "action": "update_data", "path": "/openTime", "value": "${value}" }
  },
  {
    "id": "to-label",
    "component": "text",
    "content": "至"
  },
  {
    "id": "end-time",
    "component": "timepicker",
    "placeholder": "结束时间",
    "format": "HH:mm",
    "minuteStep": 30,
    "value": { "path": "/closeTime" },
    "rules": [{ "required": true, "message": "请选择结束时间" }],
    "on_change": { "action": "update_data", "path": "/closeTime", "value": "${value}" }
  }
]
```

### 在表单中使用

```json
[
  {
    "id": "booking-form",
    "component": "form",
    "submitButtonId": "submit-btn",
    "children": ["title-input", "date-picker", "time-picker", "submit-btn"]
  },
  {
    "id": "title-input",
    "component": "input",
    "placeholder": "请输入预约标题",
    "value": { "path": "/title" },
    "rules": [{ "required": true, "message": "请输入标题" }],
    "on_change": { "action": "update_data", "path": "/title", "value": "${value}" }
  },
  {
    "id": "date-picker",
    "component": "datepicker",
    "placeholder": "请选择日期",
    "value": { "path": "/bookingDate" },
    "rules": [{ "required": true, "message": "请选择日期" }],
    "on_change": { "action": "update_data", "path": "/bookingDate", "value": "${value}" }
  },
  {
    "id": "time-picker",
    "component": "timepicker",
    "placeholder": "请选择时间",
    "format": "HH:mm",
    "minuteStep": 15,
    "value": { "path": "/bookingTime" },
    "rules": [{ "required": true, "message": "请选择时间" }],
    "on_change": { "action": "update_data", "path": "/bookingTime", "value": "${value}" }
  },
  {
    "id": "submit-btn",
    "component": "button",
    "label": "提交预约",
    "on_tap": [
      { "action": "http_proxy", "payload": { "http_config": { "method": "POST", "path": "/api/booking" } } }
    ]
  }
]
```

## 新手常见问题

**Q: 选择的时间值是什么格式？**
- 取决于 `format` 配置。
- 如果 `format: "HH:mm"`，值如 `"14:30"`
- 如果 `format: "HH:mm:ss"`，值如 `"14:30:45"`

**Q: 默认显示当前时间吗？**
- 默认不显示，需要在 `dataModel` 中设置初始值。
- 例如 `dataModel: { meetingTime: "09:00" }` 会默认显示 09:00。

**Q: 如何限制只能选择某个时间段内的时间？**
- 目前 `timepicker` 暂不支持 `disabledHours`、`disabledMinutes` 等属性限制可选范围。
- 如需限制，可以在前端进行额外校验。

**Q: `minuteStep` 和 `secondStep` 有什么用？**
- `minuteStep`：控制分钟选择器的步长，如设为 `15` 则分钟只能选 0、15、30、45
- `secondStep`：控制秒选择器的步长

**Q: 时间选择器可以显示"此刻"按钮吗？**
- 目前默认不显示。
- 如果 Ant Design 版本支持 `showNow`，可以通过配置开启。

**Q: 12小时制和24小时制如何切换？**
- 在 `format` 中使用 `HH` 是 24 小时制，使用 `hh` 是 12 小时制。
- 12 小时制通常需要配合 `a` 显示 AM/PM，如 `"hh:mm a"`。

**Q: 时间值传到后端是什么格式？**
- 直接使用 `format` 指定的字符串格式。
- 如果后端需要时间戳或 Date 对象，需要在 `httpRequest` 中进行转换。

**Q: 如何让用户只能选择未来时间？**
- 目前 `timepicker` 暂不支持此功能。
- 可以配合 `datepicker` 的日期选择，在日期为今天时对时间进行校验。
