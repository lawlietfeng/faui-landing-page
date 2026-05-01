# form 组件

`form` 是表单容器组件，负责管理表单内所有字段的校验和提交逻辑。

## 核心作用

当页面需要"用户输入 + 提交校验"时，使用 `form` 组件可以实现：

1. **统一校验**：在用户提交前，对所有字段执行全量校验
2. **阻断提交**：如果任意字段校验失败，阻止提交动作执行
3. **错误提示**：在对应字段下方显示校验错误信息

## 核心属性

### submitButtonId（提交按钮 ID）

指定哪个按钮是表单的提交按钮。这个按钮的 `id` 必须与 `submitButtonId` 的值一致：

```json
{
  "id": "user-form",
  "component": "form",
  "submitButtonId": "submit-btn",
  "children": ["name-input", "email-input", "submit-btn"]
}
```

```json
{
  "id": "submit-btn",
  "component": "button",
  "label": "提交"
}
```

### children（表单内容）

`children` 数组包含表单内的所有字段组件和提交按钮。组件按数组顺序渲染：

```json
{
  "id": "user-form",
  "component": "form",
  "submitButtonId": "submit-btn",
  "children": [
    "name-input",
    "email-input",
    "type-select",
    "remark-input",
    "submit-btn"
  ]
}
```

## 工作机制

### 校验流程

```
用户点击提交按钮
       │
       ▼
┌─────────────────┐
│ form 拦截请求    │
└─────────────────┘
       │
       ▼
┌─────────────────┐
│ 遍历 children   │
│ 中所有字段       │
└─────────────────┘
       │
       ▼
┌─────────────────┐
│ 执行字段 rules   │
│ 校验            │
└─────────────────┘
       │
       ├── 有字段校验失败 ──→ 显示错误提示，阻断提交
       │
       ▼
┌─────────────────┐
│ 全部校验通过    │
└─────────────────┘
       │
       ▼
┌─────────────────┐
│ 执行按钮的      │
│ on_tap 动作      │
└─────────────────┘
```

### 校验触发时机

| 时机 | 说明 |
|------|------|
| 点击提交按钮 | 提交前对所有字段全量校验 |
| 字段 `validateTrigger: "onChange"` | 输入内容变化时触发该字段校验 |
| 字段 `validateTrigger: "onBlur"` | 输入框失去焦点时触发该字段校验 |

### 校验失败时的表现

- 字段输入框下方显示红色错误提示（`rules[].message`）
- 提交按钮的 `on_tap` 动作**不会执行**
- 只有修正错误后再次点击提交，才会执行后续动作

## 完整示例

### 基础表单

```json
[
  {
    "id": "user-form",
    "component": "form",
    "submitButtonId": "submit-btn",
    "children": ["name-input", "email-input", "submit-btn"]
  },
  {
    "id": "name-input",
    "component": "input",
    "placeholder": "请输入姓名",
    "value": { "path": "/name" },
    "rules": [
      { "required": true, "message": "请输入姓名" },
      { "min": 2, "message": "姓名至少 2 个字符" }
    ],
    "on_change": { "action": "update_data", "path": "/name", "value": "${value}" }
  },
  {
    "id": "email-input",
    "component": "input",
    "placeholder": "请输入邮箱",
    "value": { "path": "/email" },
    "rules": [
      { "required": true, "message": "请输入邮箱" },
      { "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", "message": "邮箱格式不正确" }
    ],
    "on_change": { "action": "update_data", "path": "/email", "value": "${value}" }
  },
  {
    "id": "submit-btn",
    "component": "button",
    "label": "提交",
    "on_tap": [
      {
        "action": "http_proxy",
        "payload": {
          "http_config": {
            "method": "POST",
            "path": "/api/user/submit"
          },
          "http_body": {
            "name": { "path": "/name" },
            "email": { "path": "/email" }
          }
        }
      }
    ]
  }
]
```

### 完整申请表单

```json
[
  {
    "id": "leave-form",
    "component": "form",
    "submitButtonId": "submit-btn",
    "children": ["title-input", "type-select", "date-range-box", "reason-input", "agree-checkbox", "submit-btn"]
  },
  {
    "id": "title-input",
    "component": "input",
    "placeholder": "请输入申请标题",
    "value": { "path": "/title" },
    "rules": [{ "required": true, "message": "请输入标题" }],
    "on_change": { "action": "update_data", "path": "/title", "value": "${value}" }
  },
  {
    "id": "type-select",
    "component": "select",
    "placeholder": "请选择请假类型",
    "value": { "path": "/leaveType" },
    "options": [
      { "label": "事假", "value": "personal" },
      { "label": "病假", "value": "sick" },
      { "label": "年假", "value": "annual" }
    ],
    "rules": [{ "required": true, "message": "请选择请假类型" }],
    "on_change": { "action": "update_data", "path": "/leaveType", "value": "${value}" }
  },
  {
    "id": "date-range-box",
    "component": "box",
    "layout": "horizontal",
    "spacing": 12,
    "children": ["start-date", "end-date"]
  },
  {
    "id": "start-date",
    "component": "datepicker",
    "placeholder": "开始日期",
    "value": { "path": "/startDate" },
    "rules": [{ "required": true, "message": "请选择开始日期" }],
    "on_change": { "action": "update_data", "path": "/startDate", "value": "${value}" }
  },
  {
    "id": "end-date",
    "component": "datepicker",
    "placeholder": "结束日期",
    "value": { "path": "/endDate" },
    "rules": [{ "required": true, "message": "请选择结束日期" }],
    "on_change": { "action": "update_data", "path": "/endDate", "value": "${value}" }
  },
  {
    "id": "reason-input",
    "component": "textarea",
    "placeholder": "请输入请假原因",
    "rows": 4,
    "value": { "path": "/reason" },
    "rules": [
      { "required": true, "message": "请输入请假原因" },
      { "min": 10, "message": "原因至少 10 个字符" }
    ],
    "on_change": { "action": "update_data", "path": "/reason", "value": "${value}" }
  },
  {
    "id": "agree-checkbox",
    "component": "checkbox",
    "checked": { "path": "/agreed" },
    "label": "我确认以上信息真实有效",
    "rules": [{ "required": true, "message": "请勾选确认" }],
    "on_change": { "action": "update_data", "path": "/agreed", "value": "${value}" }
  },
  {
    "id": "submit-btn",
    "component": "button",
    "label": "提交申请",
    "on_tap": [
      {
        "action": "http_proxy",
        "payload": {
          "http_config": {
            "method": "POST",
            "path": "/api/leave/submit"
          },
          "http_body": {
            "title": { "path": "/title" },
            "leaveType": { "path": "/leaveType" },
            "startDate": { "path": "/startDate" },
            "endDate": { "path": "/endDate" },
            "reason": { "path": "/reason" }
          }
        }
      }
    ]
  }
]
```

## 新手常见问题

**Q: 点击提交按钮没有反应？**
- 检查 `form` 的 `submitButtonId` 是否与按钮的 `id` 完全一致。
- 检查是否有字段校验失败（错误提示会显示在字段下方）。

**Q: 字段没有校验？**
- 确认 `rules` 写在**字段组件**上（如 `input`、`select`），而不是 `form` 上。
- 确认字段在 `form` 的 `children` 数组中。

**Q: 提交时校验通过了，但还是没发送请求？**
- 检查 `http_proxy` 的 `http_config.path` 是否正确。
- 检查 `httpRequest` 函数是否正确配置在 `Renderer` 上。

**Q: 提交成功后想显示成功提示？**
- 可以在 `on_tap` 的动作链末尾添加 `update_data` 更新成功状态。
- 然后配合 `text` 组件的 `visible` 显示成功/失败提示。

**Q: 一个页面有多个表单？**
- 可以创建多个独立的 `form` 组件，每个 form 有自己的 `submitButtonId`。
- 注意每个 form 的 `submitButtonId` 要唯一。

**Q: 想在表单外部放置提交按钮？**
- 可以，但按钮需要通过其他方式触发校验。
- 建议将提交按钮放在 `form` 的 `children` 中，更符合预期行为。

**Q: 表单提交后如何清除数据？**
- 可以在 `on_tap` 的 `http_proxy` 成功后，添加一个 `update_data` 动作将字段重置为空值。

## rules 校验规则完整说明

| 规则 | 类型 | 说明 | 示例 |
|------|------|------|------|
| `required` | `boolean` | 是否必填 | `{ "required": true }` |
| `message` | `string` | 失败时的提示 | `{ "message": "不能为空" }` |
| `type` | `string` | 值类型 | `{ "type": "email" }` |
| `min` | `number` | 最小值/最小长度 | `{ "min": 2 }` |
| `max` | `number` | 最大值/最大长度 | `{ "max": 50 }` |
| `pattern` | `string` | 正则表达式 | `{ "pattern": "^\\d+$" }` |
| `enum` | `array` | 允许的值列表 | `{ "enum": ["A", "B"] }` |
| `whitespace` | `boolean` | 允许纯空白 | `{ "whitespace": false }` |

**常用组合示例**：

```json
// 必填 + 最小长度
{ "required": true, "message": "请输入", "min": 2 }

// 必填 + 邮箱格式
{ "required": true, "message": "请输入邮箱", "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$" }

// 最大长度
{ "max": 200, "message": "内容不能超过 200 字" }

// 枚举值
{ "enum": ["pending", "approved", "rejected"], "message": "状态值无效" }
```
