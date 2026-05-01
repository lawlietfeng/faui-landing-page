# radio 组件

`radio` 是单选按钮组组件，适用于从少量选项中选择一个的场景。

## 适用场景

- 是/否、同意/拒绝
- 少量选项（建议少于 5 个）的直接展示选择
- 状态切换（如启用/禁用）
- 需要用户直观看到所有选项的场景

## 与 select 的区别

| 特性 | radio | select |
|------|-------|--------|
| 选项可见性 | 所有选项同时可见 | 需点击展开下拉菜单 |
| 适合选项数量 | 1-5 个 | 任意数量 |
| 占用空间 | 较多 | 较少 |
| 交互方式 | 点击即选 | 点击 → 展开 → 选择 |

**建议**：选项少于等于 4 个时用 `radio`，选项更多时用 `select`。

## 核心属性

### options（选项列表）

```json
{
  "id": "gender-radio",
  "component": "radio",
  "options": [
    { "label": "男", "value": "male" },
    { "label": "女", "value": "female" },
    { "label": "保密", "value": "secret" }
  ]
}
```

### value.path（数据绑定）

```json
{
  "id": "gender-radio",
  "component": "radio",
  "value": { "path": "/gender" }
}
```

### on_change（值变化事件）

**必须配置**：

```json
{
  "id": "gender-radio",
  "component": "radio",
  "value": { "path": "/gender" },
  "on_change": { "action": "update_data", "path": "/gender", "value": "${value}" }
}
```

### rules（校验规则）

```json
{
  "id": "confirm-radio",
  "component": "radio",
  "value": { "path": "/confirmed" },
  "options": [
    { "label": "同意", "value": "yes" },
    { "label": "拒绝", "value": "no" }
  ],
  "rules": [{ "required": true, "message": "请选择一个选项" }],
  "on_change": { "action": "update_data", "path": "/confirmed", "value": "${value}" }
}
```

## 完整示例

### 基础单选组

```json
{
  "id": "gender-radio",
  "component": "radio",
  "value": { "path": "/gender" },
  "options": [
    { "label": "男", "value": "male" },
    { "label": "女", "value": "female" },
    { "label": "保密", "value": "secret" }
  ],
  "on_change": { "action": "update_data", "path": "/gender", "value": "${value}" }
}
```

### 同意协议

```json
{
  "id": "agree-radio",
  "component": "radio",
  "value": { "path": "/agreement" },
  "options": [
    { "label": "我已阅读并同意《用户协议》", "value": "agreed" }
  ],
  "rules": [{ "required": true, "message": "请同意用户协议" }],
  "on_change": { "action": "update_data", "path": "/agreement", "value": "${value}" }
}
```

### 优先级选择

```json
{
  "id": "priority-radio",
  "component": "radio",
  "value": { "path": "/priority" },
  "options": [
    { "label": "🟢 低", "value": "low" },
    { "label": "🟡 中", "value": "medium" },
    { "label": "🔴 高", "value": "high" }
  ],
  "rules": [{ "required": true, "message": "请选择优先级" }],
  "on_change": { "action": "update_data", "path": "/priority", "value": "${value}" }
}
```

### 在表单中使用

```json
[
  {
    "id": "survey-form",
    "component": "form",
    "submitButtonId": "submit-btn",
    "children": ["name-input", "satisfaction-radio", "submit-btn"]
  },
  {
    "id": "name-input",
    "component": "input",
    "placeholder": "请输入姓名",
    "value": { "path": "/name" },
    "rules": [{ "required": true, "message": "请输入姓名" }],
    "on_change": { "action": "update_data", "path": "/name", "value": "${value}" }
  },
  {
    "id": "satisfaction-radio",
    "component": "radio",
    "value": { "path": "/satisfaction" },
    "options": [
      { "label": "非常满意", "value": "very_satisfied" },
      { "label": "满意", "value": "satisfied" },
      { "label": "一般", "value": "neutral" },
      { "label": "不满意", "value": "dissatisfied" }
    ],
    "rules": [{ "required": true, "message": "请选择满意度" }],
    "on_change": { "action": "update_data", "path": "/satisfaction", "value": "${value}" }
  },
  {
    "id": "submit-btn",
    "component": "button",
    "label": "提交",
    "on_tap": [
      { "action": "http_proxy", "payload": { "http_config": { "method": "POST", "path": "/api/survey" } } }
    ]
  }
]
```

## 新手常见问题

**Q: 选项太多，想用下拉框？**
- 切换为 `select` 组件即可。

**Q: 只想显示一个选项（如"同意协议"）？**
- 可以，只需要在 `options` 中放一个选项。
- 这种情况更推荐使用 `checkbox` 组件。

**Q: 选中的值没有同步到 dataModel？**
- 检查 `on_change` 是否配置，且 `action` 为 `update_data`。
- 确认 `value.path` 和 `on_change.path` 一致。

**Q: 想让选项横向排列？**
- 可以用 `box` 包裹 `radio`，设置 `box.layout: "horizontal"`。
- 但注意 `radio` 组件本身不支持横向排列。

**Q: 为什么需要 rules 配置 required？**
- 即使 `options` 中只有一个选项，不选中也可以提交。
- 如果业务要求必须选择，配置 `required: true` 后提交时会出现错误提示。
