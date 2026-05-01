# datepicker 组件

`datepicker` 是日期选择器组件，适用于选择日期、月份、年份或带时间的日期时间场景。

## 适用场景

- 生日、入职日期、入学日期选择
- 预约时间、开始/结束日期
- 筛选条件中的日期范围
- 任何需要用户选择日期的场景

## 核心属性

### picker（选择器类型）

| 值 | 效果 | 适用场景 |
|---|------|---------|
| `date`（默认） | 选择年月日 | 大部分日期场景 |
| `month` | 选择年月 | 统计月份筛选 |
| `year` | 选择年 | 出生年份、计划年份 |

```json
{
  "id": "birthday-picker",
  "component": "datepicker",
  "picker": "date"
}
```

### format（日期格式）

控制显示和提交的日期格式：

| picker | 默认格式 | 示例 |
|--------|---------|------|
| `date` | `YYYY-MM-DD` | 2024-03-15 |
| `month` | `YYYY-MM` | 2024-03 |
| `year` | `YYYY` | 2024 |
| `date` + `showTime: true` | `YYYY-MM-DD HH:mm:ss` | 2024-03-15 14:30:00 |

```json
{
  "id": "start-picker",
  "component": "datepicker",
  "picker": "date",
  "format": "YYYY/MM/DD"
}
```

### showTime（是否显示时间）

设置为 `true` 时，日期选择器会同时显示时间选择器：

```json
{
  "id": "meeting-picker",
  "component": "datepicker",
  "picker": "date",
  "showTime": true,
  "format": "YYYY-MM-DD HH:mm"
}
```

### placeholder（占位提示）

```json
{
  "id": "start-picker",
  "component": "datepicker",
  "placeholder": "请选择开始时间"
}
```

### value.path（数据绑定）

```json
{
  "id": "start-picker",
  "component": "datepicker",
  "value": { "path": "/startDate" }
}
```

### on_change（值变化事件）

**必须配置**：

```json
{
  "id": "start-picker",
  "component": "datepicker",
  "value": { "path": "/startDate" },
  "on_change": { "action": "update_data", "path": "/startDate", "value": "${value}" }
}
```

### rules（校验规则）

```json
{
  "id": "start-picker",
  "component": "datepicker",
  "rules": [{ "required": true, "message": "请选择开始时间" }]
}
```

## 完整示例

### 日期选择（最常用）

```json
{
  "id": "birthday-picker",
  "component": "datepicker",
  "picker": "date",
  "placeholder": "请选择出生日期",
  "value": { "path": "/birthday" },
  "rules": [{ "required": true, "message": "请选择出生日期" }],
  "on_change": { "action": "update_data", "path": "/birthday", "value": "${value}" }
}
```

### 日期时间选择

```json
{
  "id": "meeting-picker",
  "component": "datepicker",
  "picker": "date",
  "showTime": true,
  "format": "YYYY-MM-DD HH:mm:ss",
  "placeholder": "请选择会议时间",
  "value": { "path": "/meetingTime" },
  "rules": [{ "required": true, "message": "请选择会议时间" }],
  "on_change": { "action": "update_data", "path": "/meetingTime", "value": "${value}" }
}
```

### 月份选择

```json
{
  "id": "stat-month-picker",
  "component": "datepicker",
  "picker": "month",
  "placeholder": "请选择统计月份",
  "value": { "path": "/statMonth" },
  "rules": [{ "required": true, "message": "请选择月份" }],
  "on_change": { "action": "update_data", "path": "/statMonth", "value": "${value}" }
}
```

### 年份选择

```json
{
  "id": "plan-year-picker",
  "component": "datepicker",
  "picker": "year",
  "placeholder": "请选择计划年度",
  "value": { "path": "/planYear" },
  "on_change": { "action": "update_data", "path": "/planYear", "value": "${value}" }
}
```

### 日期范围（两个日期选择器）

```json
[
  {
    "id": "date-range-box",
    "component": "box",
    "layout": "horizontal",
    "spacing": 12,
    "children": ["start-picker", "end-picker"]
  },
  {
    "id": "start-picker",
    "component": "datepicker",
    "picker": "date",
    "placeholder": "开始日期",
    "value": { "path": "/startDate" },
    "on_change": { "action": "update_data", "path": "/startDate", "value": "${value}" }
  },
  {
    "id": "end-picker",
    "component": "datepicker",
    "picker": "date",
    "placeholder": "结束日期",
    "value": { "path": "/endDate" },
    "on_change": { "action": "update_data", "path": "/endDate", "value": "${value}" }
  }
]
```

### 在表单中使用

```json
[
  {
    "id": "leave-form",
    "component": "form",
    "submitButtonId": "submit-btn",
    "children": ["start-picker", "end-picker", "submit-btn"]
  },
  {
    "id": "start-picker",
    "component": "datepicker",
    "picker": "date",
    "placeholder": "请选择请假开始日期",
    "value": { "path": "/startDate" },
    "rules": [{ "required": true, "message": "请选择开始日期" }],
    "on_change": { "action": "update_data", "path": "/startDate", "value": "${value}" }
  },
  {
    "id": "end-picker",
    "component": "datepicker",
    "picker": "date",
    "placeholder": "请选择请假结束日期",
    "value": { "path": "/endDate" },
    "rules": [{ "required": true, "message": "请选择结束日期" }],
    "on_change": { "action": "update_data", "path": "/endDate", "value": "${value}" }
  },
  {
    "id": "submit-btn",
    "component": "button",
    "label": "提交申请",
    "on_tap": [
      { "action": "http_proxy", "payload": { "http_config": { "method": "POST", "path": "/api/leave" } } }
    ]
  }
]
```

## 新手常见问题

**Q: 选择的日期格式不对？**
- 检查 `format` 属性配置是否正确。
- Ant Design 的日期格式基于 moment.js，支持的格式字符：`YYYY`（年）、`MM`（月）、`DD`（日）、`HH`（24小时）、`hh`（12小时）、`mm`（分）、`ss`（秒）。

**Q: 只想选日期不想选时间？**
- 不设置 `showTime` 或设置为 `false`（默认）即可。

**Q: 只想选月份或年份？**
- 设置 `picker` 为 `"month"` 或 `"year"`。

**Q: 日期值传到后端是什么格式？**
- 取决于 `format` 配置的值。
- 如果 `format: "YYYY-MM-DD"`，则 `dataModel` 中存的是 `"2024-03-15"` 这样的字符串。
- 如果带了 `showTime`，存的是 `"2024-03-15 14:30:00"` 这样的字符串。

**Q: 如何限制只能选未来/过去的日期？**
- 目前 `datepicker` 暂不支持 `disabledDate` 属性限制日期范围。
- 如果需要这个功能，可以在 `on_change` 中校验日期，不符合则提示用户。

**Q: 日期选择后没有显示在输入框？**
- 检查 `value.path` 和 `on_change` 是否正确配置。
- 确认 `on_change` 中的 `value` 使用了 `"${value}"` 语法。
