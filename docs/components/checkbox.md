# checkbox 组件

`checkbox` 是复选框组件，适用于布尔值开关或多项选择的场景。

## 适用场景

- 是否同意、是否订阅、是否加急
- 布尔值开关（开/关）
- 表单中的协议确认
- 需要用户明确勾选才能继续的场景

## 核心属性

### label（复选框旁边的说明文字）

```json
{
  "id": "agree-check",
  "component": "checkbox",
  "label": "我已阅读并同意《用户协议》"
}
```

### checked.path（推荐）vs value.path

checkbox 支持两种绑定方式：

**推荐使用 `checked.path`**（布尔语义更清晰）：

```json
{
  "id": "subscribe-check",
  "component": "checkbox",
  "checked": { "path": "/subscribed" },
  "label": "订阅最新资讯"
}
```

**也可以使用 `value.path`**（与其他组件保持一致的写法）：

```json
{
  "id": "subscribe-check",
  "component": "checkbox",
  "value": { "path": "/subscribed" },
  "label": "订阅最新资讯"
}
```

两者的区别：`checked.path` 期望值为 `true/false`，`value.path` 也可以接受其他值但语义不如 `checked.path` 清晰。

### on_change（值变化事件）

**必须配置**：

```json
{
  "id": "agree-check",
  "component": "checkbox",
  "checked": { "path": "/agreed" },
  "label": "我已阅读并同意《用户协议》",
  "on_change": { "action": "update_data", "path": "/agreed", "value": "${value}" }
}
```

`${value}` 在 checkbox 场景下是 `true`（勾选）或 `false`（取消勾选）。

### rules（校验规则）

配合 `required: true` 可以实现"必须勾选才能提交"：

```json
{
  "id": "agree-check",
  "component": "checkbox",
  "checked": { "path": "/agreed" },
  "label": "我已阅读并同意《用户协议》",
  "rules": [{ "required": true, "message": "请先勾选协议" }],
  "on_change": { "action": "update_data", "path": "/agreed", "value": "${value}" }
}
```

注意：`required: true` 对 checkbox 意味着值必须是 `true`（勾选），空值或 `false` 都会触发校验失败。

## 完整示例

### 协议勾选（表单必备）

```json
{
  "id": "agree-check",
  "component": "checkbox",
  "checked": { "path": "/agreed" },
  "label": "我已阅读并同意《用户协议》和《隐私政策》",
  "rules": [{ "required": true, "message": "请先阅读并同意协议" }],
  "on_change": { "action": "update_data", "path": "/agreed", "value": "${value}" }
}
```

### 加急处理开关

```json
{
  "id": "urgent-check",
  "component": "checkbox",
  "checked": { "path": "/isUrgent" },
  "label": "标记为加急处理",
  "on_change": { "action": "update_data", "path": "/isUrgent", "value": "${value}" }
}
```

### 订阅选择

```json
{
  "id": "newsletter-check",
  "component": "checkbox",
  "checked": { "path": "/newsletter" },
  "label": "订阅每周精选内容",
  "on_change": { "action": "update_data", "path": "/newsletter", "value": "${value}" }
}
```

### 在表单中使用

```json
[
  {
    "id": "register-form",
    "component": "form",
    "submitButtonId": "submit-btn",
    "children": ["username-input", "agree-check", "submit-btn"]
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
    "id": "agree-check",
    "component": "checkbox",
    "checked": { "path": "/agreed" },
    "label": "我已阅读并同意《用户协议》",
    "rules": [{ "required": true, "message": "请先同意用户协议" }],
    "on_change": { "action": "update_data", "path": "/agreed", "value": "${value}" }
  },
  {
    "id": "submit-btn",
    "component": "button",
    "label": "注册",
    "on_tap": [
      { "action": "http_proxy", "payload": { "http_config": { "method": "POST", "path": "/api/register" } } }
    ]
  }
]
```

## 与 radio 的选择

| 场景 | 推荐组件 |
|------|---------|
| 只能选一个（互斥选项） | `radio` |
| 可以选多个（复选） | `checkbox`（多个组合） |
| 布尔开关（是/否） | `checkbox` |
| 同意/不同意 | `checkbox` |

## 新手常见问题

**Q: 勾选了但提交时提示"请先勾选协议"？**
- 这是 `rules` 校验没有通过。
- 检查 checkbox 是否放在 `form` 内，以及 `form` 的 `submitButtonId` 是否指向提交按钮。

**Q: 想实现"记住密码"功能？**
- 这通常是前端本地存储（localStorage）的功能，与 checkbox 无关。
- checkbox 只负责表单数据的绑定。

**Q: checkbox 默认是勾选还是未勾选？**
- 取决于 `dataModel` 中对应字段的初始值：
  - `true` → 初始勾选
  - `false` 或 `undefined` → 初始未勾选

**Q: 想禁用 checkbox（用户不能操作）？**
- 目前 `checkbox` 组件暂不支持 `disabled` 属性。
- 如果需要只读展示，可以考虑使用 `table` 组件的 `renderAs: "checkbox"` 列。

**Q: 多个 checkbox 实现多选？**
- 目前 faui 没有原生的"多选 checkbox 组"组件。
- 如果需要多选，可以用多个独立的 checkbox，每个绑定到 `dataModel` 的不同字段。
