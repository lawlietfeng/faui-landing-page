# button 组件

`button` 组件用于创建可点击的按钮，触发业务动作，如提交表单、保存数据、跳转页面等。

## 适用场景

- 提交表单数据
- 保存用户输入
- 触发业务 action（如调用接口、跳转链接）
- 多步骤流程中的"下一步"、"上一步"

## 核心属性

### label（按钮文字）

最简单的按钮文字设置方式：

```json
{
  "id": "submit-btn",
  "component": "button",
  "label": "提交"
}
```

### children（子组件方式）

如果需要在按钮中放置更复杂的内容（如图标 + 文字组合），可以使用 `children` 引用 `text` 组件：

```json
[
  {
    "id": "submit-btn",
    "component": "button",
    "children": ["submit-icon", "submit-text"]
  },
  {
    "id": "submit-icon",
    "component": "text",
    "content": "🚀"
  },
  {
    "id": "submit-text",
    "component": "text",
    "content": "提交"
  }
]
```

**注意**：`label` 和 `children` 二选一使用。如果同时设置，`label` 优先生效。

### on_tap（点击动作）

`on_tap` 是按钮最核心的属性，定义点击按钮后执行的动作。它是一个**动作数组**，按顺序依次执行。

#### 1. update_data（更新数据）

最常用的动作，将用户输入保存到数据模型：

```json
{
  "id": "save-btn",
  "component": "button",
  "label": "保存",
  "on_tap": [
    {
      "action": "update_data",
      "path": "/draft",
      "value": "${$root}"
    }
  ]
}
```

#### 2. http_proxy（HTTP 请求）

调用外部接口：

```json
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
          "path": "/api/form/submit",
          "headers": { "Content-Type": "application/json" }
        },
        "http_body": {
          "name": { "path": "/name" },
          "email": { "path": "/email" }
        }
      }
    }
  ]
}
```

`http_body` 中的 `{ "path": "/xxx" }` 会被替换为 `dataModel` 中对应字段的值。

#### 3. 动作链（多个动作顺序执行）

`on_tap` 是一个数组，可以链式执行多个动作：

```json
{
  "id": "complex-btn",
  "component": "button",
  "label": "提交流程",
  "on_tap": [
    { "action": "update_data", "path": "/status", "value": "submitting" },
    { "action": "http_proxy", "payload": { "http_config": { "method": "POST", "path": "/api/submit" } } },
    { "action": "update_data", "path": "/status", "value": "submitted" }
  ]
}
```

上面按顺序执行：先更新状态为"提交中"，再调用接口，最后更新状态为"已提交"。

## 与 form 组件的配合

在 `form` 表单中使用按钮时，需要注意以下两点：

### 1. submitButtonId 关联

在 `form` 组件中，通过 `submitButtonId` 指定提交按钮的 `id`：

```json
{
  "id": "user-form",
  "component": "form",
  "submitButtonId": "btn-submit",
  "children": ["name-input", "btn-submit"]
}
```

```json
{
  "id": "btn-submit",
  "component": "button",
  "label": "提交"
}
```

**关键点**：`form` 的 `submitButtonId` 值必须与按钮的 `id` 完全一致。

### 2. 校验机制

当用户点击 `id` 等于 `submitButtonId` 的按钮时，`form` 会自动：

1. 对表单内所有字段执行全量校验
2. 如果任意字段校验失败，**阻断**后续 action 执行
3. 只有全部字段校验通过，才继续执行按钮的 `on_tap`

这意味着，即使按钮配置了 `http_proxy` 提交，如果必填字段为空，点击按钮也不会发送请求。

### 按钮放在 form 外的情况

如果按钮在 `form` 外面，但需要触发 form 校验，可以在按钮上监听 form 校验结果后再执行后续动作。推荐的做法是将按钮放在 `form` 的 `children` 中。

## 完整示例

### 基础提交按钮

```json
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
          "path": "/api/submit",
          "headers": { "Content-Type": "application/json" }
        },
        "http_body": {
          "name": { "path": "/name" }
        }
      }
    }
  ]
}
```

### 带确认逻辑的按钮

```json
{
  "id": "delete-btn",
  "component": "button",
  "label": "删除",
  "on_tap": [
    {
      "action": "http_proxy",
      "payload": {
        "http_config": {
          "method": "DELETE",
          "path": "/api/item/${id}"
        }
      }
    }
  ]
}
```

### 图标 + 文字按钮

```json
[
  {
    "id": "upload-btn",
    "component": "button",
    "children": ["upload-icon", "upload-text"]
  },
  {
    "id": "upload-icon",
    "component": "text",
    "content": "📤"
  },
  {
    "id": "upload-text",
    "component": "text",
    "content": "上传文件"
  }
]
```

## 新手常见问题

**Q: 点击按钮没有反应？**
- 检查 `on_tap` 是否配置了 `action`。
- 如果在 `form` 内，确认按钮的 `id` 与 `form.submitButtonId` 一致。
- 如果表单校验失败，按钮的 action 会被阻断。

**Q: http_proxy 发送的请求体为空？**
- 检查 `http_body` 中每个字段的 `path` 是否正确指向 `dataModel` 中的字段。
- 确认 `dataModel` 中这些字段有值（可以先用一个 `text` 组件展示 `${$root.xxx}` 验证）。

**Q: 想在请求前做数据处理？**
- 目前 `http_proxy` 的 `http_body` 支持简单的 path 替换。
- 复杂的数据转换建议在传入 `Renderer` 之前，在 `httpRequest` 函数中处理。

**Q: 按钮样式不符合预期？**
- `button` 组件底层使用 Ant Design 的 `Button`，可以通过 `style` 传入 Ant Design 支持的样式属性，如 `{ "background": "#1890ff", "color": "#fff" }`。
