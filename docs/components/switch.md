# switch 组件

`switch` 是开关组件，用于在两个互斥状态之间进行切换，适用于布尔值开关场景，如启用/禁用、开启/关闭等。

## 适用场景

- 功能开关（如启用/禁用某个功能）
- 状态切换（如在线/离线）
- 订阅设置（如接收通知开/关）
- 模式切换（如浅色/深色模式）
- 任何需要布尔值切换的场景

## 与 checkbox 的区别

| 特性 | switch | checkbox |
|------|--------|----------|
| 交互方式 | 滑动切换 | 点击勾选 |
| 语义 | 实时生效的状态切换 | 需要确认的选项 |
| 视觉 | 开关样式 | 勾选框样式 |
| 适用场景 | 设置项（立即生效） | 表单选项（提交生效） |

**建议**：
- 需要用户明确"勾选确认"的场景用 `checkbox`
- 开关即生效的设置项用 `switch`

## 核心属性

### checkedChildren（开启状态文本）

开关打开时显示的文本：

```json
{
  "id": "notification-switch",
  "component": "switch",
  "checkedChildren": "开"
}
```

### unCheckedChildren（关闭状态文本）

开关关闭时显示的文本：

```json
{
  "id": "notification-switch",
  "component": "switch",
  "unCheckedChildren": "关"
}
```

### value.path 或 checked.path（数据绑定）

**推荐使用 `checked.path`**（布尔语义更清晰）：

```json
{
  "id": "status-switch",
  "component": "switch",
  "checked": { "path": "/isEnabled" }
}
```

**也可以使用 `value.path`**：

```json
{
  "id": "status-switch",
  "component": "switch",
  "value": { "path": "/isEnabled" }
}
```

### on_change（值变化事件）

**必须配置**：

```json
{
  "id": "status-switch",
  "component": "switch",
  "checked": { "path": "/isEnabled" },
  "on_change": { "action": "update_data", "path": "/isEnabled", "value": "${value}" }
}
```

`${value}` 在 switch 场景下是 `true`（开启）或 `false`（关闭）。

### rules（校验规则）

配合 `required: true` 可以要求必须选择开启状态：

```json
{
  "id": "agreement-switch",
  "component": "switch",
  "rules": [{ "required": true, "message": "请开启协议" }]
}
```

注意：`required: true` 对 switch 意味着值必须是 `true`（开启状态），`false` 会触发校验失败。

## 完整示例

### 基础开关

```json
{
  "id": "status-switch",
  "component": "switch",
  "checked": { "path": "/isEnabled" },
  "on_change": { "action": "update_data", "path": "/isEnabled", "value": "${value}" }
}
```

### 带状态文字的开关

```json
{
  "id": "notification-switch",
  "component": "switch",
  "checkedChildren": "接收通知",
  "unCheckedChildren": "关闭通知",
  "checked": { "path": "/notificationsEnabled" },
  "on_change": { "action": "update_data", "path": "/notificationsEnabled", "value": "${value}" }
}
```

### 必填开关（必须开启才能提交）

```json
{
  "id": "agreement-switch",
  "component": "switch",
  "checkedChildren": "我已阅读并同意",
  "unCheckedChildren": "未同意",
  "checked": { "path": "/agreed" },
  "rules": [{ "required": true, "message": "请先同意协议" }],
  "on_change": { "action": "update_data", "path": "/agreed", "value": "${value}" }
}
```

### 多个开关的设置面板

```json
[
  {
    "id": "settings-box",
    "component": "box",
    "layout": "vertical",
    "spacing": 16,
    "children": ["email-setting", "sms-setting", "push-setting"]
  },
  {
    "id": "email-setting",
    "component": "box",
    "layout": "horizontal",
    "justify": "space-between",
    "align": "center",
    "children": ["email-label", "email-switch"]
  },
  {
    "id": "email-label",
    "component": "text",
    "content": "邮件通知"
  },
  {
    "id": "email-switch",
    "component": "switch",
    "checkedChildren": "开",
    "unCheckedChildren": "关",
    "checked": { "path": "/emailEnabled" },
    "on_change": { "action": "update_data", "path": "/emailEnabled", "value": "${value}" }
  },
  {
    "id": "sms-setting",
    "component": "box",
    "layout": "horizontal",
    "justify": "space-between",
    "align": "center",
    "children": ["sms-label", "sms-switch"]
  },
  {
    "id": "sms-label",
    "component": "text",
    "content": "短信通知"
  },
  {
    "id": "sms-switch",
    "component": "switch",
    "checkedChildren": "开",
    "unCheckedChildren": "关",
    "checked": { "path": "/smsEnabled" },
    "on_change": { "action": "update_data", "path": "/smsEnabled", "value": "${value}" }
  },
  {
    "id": "push-setting",
    "component": "box",
    "layout": "horizontal",
    "justify": "space-between",
    "align": "center",
    "children": ["push-label", "push-switch"]
  },
  {
    "id": "push-label",
    "component": "text",
    "content": "推送通知"
  },
  {
    "id": "push-switch",
    "component": "switch",
    "checkedChildren": "开",
    "unCheckedChildren": "关",
    "checked": { "path": "/pushEnabled" },
    "on_change": { "action": "update_data", "path": "/pushEnabled", "value": "${value}" }
  }
]
```

### 在表单中使用

```json
[
  {
    "id": "account-form",
    "component": "form",
    "submitButtonId": "submit-btn",
    "children": ["username-input", "public-profile-switch", "submit-btn"]
  },
  {
    "id": "username-input",
    "component": "input",
    "placeholder": "请输入用户名",
    "value": { "path": "/username" },
    "rules": [{ "required": true, "message": "请输入用户名" }],
    "on_change": { "action": "update_data", "path": "/username", "value": "${value}" }
  },
  {
    "id": "public-profile-switch",
    "component": "switch",
    "checkedChildren": "公开",
    "unCheckedChildren": "私密",
    "checked": { "path": "/isPublic" },
    "on_change": { "action": "update_data", "path": "/isPublic", "value": "${value}" }
  },
  {
    "id": "submit-btn",
    "component": "button",
    "label": "保存设置",
    "on_tap": [
      { "action": "http_proxy", "payload": { "http_config": { "method": "POST", "path": "/api/settings" } } }
    ]
  }
]
```

## 新手常见问题

**Q: 开关切换后值是 true/false 吗？**
- 是的，开关切换时 `on_change` 中的 `${value}` 是布尔值 `true`（开启）或 `false`（关闭）。

**Q: 初始状态是开启还是关闭？**
- 取决于 `dataModel` 中对应字段的初始值：
  - `true` → 初始为开启状态
  - `false` 或 `undefined` → 初始为关闭状态

**Q: `checked.path` 和 `value.path` 有什么区别？**
- `checked.path` 语义更明确，表示布尔值的开关状态。
- `value.path` 也可以使用，但建议使用 `checked.path`。

**Q: 想让开关默认开启？**
- 在 `dataModel` 中设置：
```json
{
  "dataModel": {
    "isEnabled": true
  }
}
```

**Q: `checkedChildren` 和 `unCheckedChildren` 是必须配置的吗？**
- 不是必须的，不配置时只显示开关本身。
- 配置后会显示对应的文字描述。

**Q: 开关切换时需要用户确认吗？**
- `switch` 组件的切换是即时的，没有确认步骤。
- 如果需要确认（如"确定要关闭吗？"），需要自行实现对话框逻辑。

**Q: 为什么 `rules: [{ required: true }]` 要求必须开启？**
- 因为 `required: true` 表示值不能为空或 falsy。
- 对 switch 来说，`false` 是 falsy 值，所以未开启时会触发校验失败。
- 如果希望可以不选（不开启也不关闭），去掉 `required` 规则。

**Q: switch 可以禁用（不允许操作）吗？**
- 目前 `switch` 组件暂不支持 `disabled` 属性。
- 如果需要只读展示，可以配合 `visible` 条件渲染或用 `text` 展示状态。
