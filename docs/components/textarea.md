# textarea 组件

`textarea` 是多行文本输入框组件，适用于备注、说明、申请事由、反馈内容等需要输入多行文字的场景。

## 适用场景

- 备注、说明、摘要
- 申请事由、申请理由
- 用户反馈、留言
- 任何需要输入多行文本的地方

## 核心属性

### placeholder（占位提示）

```json
{
  "id": "remark-input",
  "component": "textarea",
  "placeholder": "请输入备注信息"
}
```

### value.path（数据绑定）

将输入框的值绑定到 `dataModel`：

```json
{
  "id": "remark-input",
  "component": "textarea",
  "value": { "path": "/remark" }
}
```

### on_change（值变化事件）

**必须配置**，否则输入内容无法保存：

```json
{
  "id": "remark-input",
  "component": "textarea",
  "placeholder": "请输入备注",
  "value": { "path": "/remark" },
  "on_change": { "action": "update_data", "path": "/remark", "value": "${value}" }
}
```

### rules（校验规则）

支持与 `input` 相同的校验规则。`textarea` 常用 `max` 限制字数：

```json
{
  "id": "remark-input",
  "component": "textarea",
  "value": { "path": "/remark" },
  "rules": [
    { "required": true, "message": "请输入备注" },
    { "max": 200, "message": "备注最多 200 字" }
  ],
  "on_change": { "action": "update_data", "path": "/remark", "value": "${value}" }
}
```

### rows（行数）

控制输入框的显示行数：

```json
{
  "id": "description-input",
  "component": "textarea",
  "rows": 4,
  "value": { "path": "/description" }
}
```

## 与 input 的区别

| 特性 | input | textarea |
|------|-------|----------|
| 输入行数 | 单行 | 多行 |
| 支持 `rows` | 否 | 是 |
| 适用场景 | 姓名、邮箱、手机号等短文本 | 备注、说明等长文本 |
| 校验 `max` | 限制最大字符数 | 限制最大字符数 |

## 完整示例

### 基础多行输入

```json
{
  "id": "remark-input",
  "component": "textarea",
  "placeholder": "请输入备注信息（最多 200 字）",
  "value": { "path": "/remark" },
  "rules": [
    { "required": true, "message": "请输入备注" },
    { "max": 200, "message": "备注最多 200 字" }
  ],
  "on_change": { "action": "update_data", "path": "/remark", "value": "${value}" }
}
```

### 带行数限制

```json
{
  "id": "description-input",
  "component": "textarea",
  "placeholder": "请详细描述问题",
  "rows": 6,
  "value": { "path": "/description" },
  "rules": [
    { "required": true, "message": "请输入描述" },
    { "min": 10, "message": "描述至少 10 个字符" },
    { "max": 500, "message": "描述最多 500 个字符" }
  ],
  "on_change": { "action": "update_data", "path": "/description", "value": "${value}" }
}
```

### 在表单中使用

```json
[
  {
    "id": "feedback-form",
    "component": "form",
    "submitButtonId": "submit-btn",
    "children": ["title-input", "content-input", "submit-btn"]
  },
  {
    "id": "title-input",
    "component": "input",
    "placeholder": "请输入标题",
    "value": { "path": "/title" },
    "rules": [{ "required": true, "message": "标题不能为空" }],
    "on_change": { "action": "update_data", "path": "/title", "value": "${value}" }
  },
  {
    "id": "content-input",
    "component": "textarea",
    "placeholder": "请输入反馈内容",
    "rows": 5,
    "value": { "path": "/content" },
    "rules": [
      { "required": true, "message": "内容不能为空" },
      { "min": 20, "message": "内容至少 20 个字符" }
    ],
    "on_change": { "action": "update_data", "path": "/content", "value": "${value}" }
  },
  {
    "id": "submit-btn",
    "component": "button",
    "label": "提交反馈",
    "on_tap": [
      { "action": "http_proxy", "payload": { "http_config": { "method": "POST", "path": "/api/feedback" } } }
    ]
  }
]
```

## 新手常见问题

**Q: textarea 的宽度不够？**
- 默认 textarea 宽度是 100%，会填满父容器。
- 如果父容器宽度不够，可以给父容器（如 `box`）设置更大的宽度。

**Q: 如何让 textarea 自动高度（输入内容增多时自动撑开）？**
- 目前暂不支持 `autoSize` 属性。
- 可以通过设置较大的 `rows` 值来预留空间。

**Q: 输入内容换行后，数据是如何存储的？**
- 换行符会作为 `\n`（或 `\r\n`）存储在字符串中。
- 在后端接收时是一个包含换行符的普通字符串。

**Q: 校验失败时提示位置不对？**
- `textarea` 组件的错误提示显示在输入框下方。
- 如果提示被遮挡，可以给父容器增加 `padding` 或设置 `style: { "marginBottom": "20px" }` 预留空间。
