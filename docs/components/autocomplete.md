# autocomplete 组件

`autocomplete` 是自动完成组件，提供输入建议功能。用户输入时，根据输入内容实时展示相关提示选项，提升输入效率。

## 适用场景

- 邮箱后缀自动补全（如输入 `user@`，提示 `@gmail.com`、`@163.com`）
- 搜索关键词联想
- 药名、商品名、地址等需要搜索提示的场景
- 任何需要从预设选项中快速选择的场景

## 核心属性

### options（选项列表）

`options` 是自动完成的建议选项列表：

```json
{
  "id": "email-autocomplete",
  "component": "autocomplete",
  "options": [
    { "value": "user@gmail.com", "label": "user@gmail.com" },
    { "value": "user@163.com", "label": "user@163.com" },
    { "value": "user@qq.com", "label": "user@qq.com" }
  ]
}
```

- `value`：选中后实际保存的值
- `label`：显示给用户的文本

### placeholder（占位提示）

```json
{
  "id": "email-autocomplete",
  "component": "autocomplete",
  "placeholder": "请输入邮箱"
}
```

### value.path（数据绑定）

```json
{
  "id": "email-autocomplete",
  "component": "autocomplete",
  "value": { "path": "/email" }
}
```

### on_change（值变化事件）

**必须配置**：

```json
{
  "id": "email-autocomplete",
  "component": "autocomplete",
  "value": { "path": "/email" },
  "on_change": { "action": "update_data", "path": "/email", "value": "${value}" }
}
```

### rules（校验规则）

```json
{
  "id": "email-autocomplete",
  "component": "autocomplete",
  "rules": [
    { "required": true, "message": "请输入邮箱" },
    { "type": "email", "message": "邮箱格式不正确" }
  ]
}
```

### validateTrigger（触发校验时机）

```json
{
  "id": "email-autocomplete",
  "component": "autocomplete",
  "validateTrigger": "onBlur"
}
```

## 完整示例

### 邮箱自动补全

```json
{
  "id": "email-autocomplete",
  "component": "autocomplete",
  "placeholder": "请输入邮箱",
  "value": { "path": "/email" },
  "options": [
    { "value": "user@gmail.com", "label": "user@gmail.com" },
    { "value": "user@163.com", "label": "user@163.com" },
    { "value": "user@qq.com", "label": "user@qq.com" },
    { "value": "user@hotmail.com", "label": "user@hotmail.com" },
    { "value": "user@outlook.com", "label": "user@outlook.com" }
  ],
  "rules": [
    { "required": true, "message": "请输入邮箱" },
    { "type": "email", "message": "邮箱格式不正确" }
  ],
  "on_change": { "action": "update_data", "path": "/email", "value": "${value}" }
}
```

### 城市搜索联想

```json
{
  "id": "city-autocomplete",
  "component": "autocomplete",
  "placeholder": "搜索城市名称",
  "value": { "path": "/city" },
  "options": [
    { "value": "beijing", "label": "北京" },
    { "value": "shanghai", "label": "上海" },
    { "value": "guangzhou", "label": "广州" },
    { "value": "shenzhen", "label": "深圳" },
    { "value": "hangzhou", "label": "杭州" },
    { "value": "chengdu", "label": "成都" },
    { "value": "wuhan", "label": "武汉" }
  ],
  "rules": [{ "required": true, "message": "请选择城市" }],
  "on_change": { "action": "update_data", "path": "/city", "value": "${value}" }
}
```

### 在表单中使用

```json
[
  {
    "id": "contact-form",
    "component": "form",
    "submitButtonId": "submit-btn",
    "children": ["name-input", "email-autocomplete", "submit-btn"]
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
    "id": "email-autocomplete",
    "component": "autocomplete",
    "placeholder": "请输入邮箱",
    "value": { "path": "/email" },
    "options": [
      { "value": "user@gmail.com" },
      { "value": "user@163.com" },
      { "value": "user@qq.com" }
    ],
    "rules": [
      { "required": true, "message": "请输入邮箱" },
      { "type": "email", "message": "邮箱格式不正确" }
    ],
    "on_change": { "action": "update_data", "path": "/email", "value": "${value}" }
  },
  {
    "id": "submit-btn",
    "component": "button",
    "label": "提交",
    "on_tap": [
      { "action": "http_proxy", "payload": { "http_config": { "method": "POST", "path": "/api/contact" } } }
    ]
  }
]
```

## 与 select 的选择

| 场景 | 推荐组件 |
|------|---------|
| 从固定选项中选择 | `select` |
| 需要用户自由输入 + 建议提示 | `autocomplete` |
| 关键词搜索/联想 | `autocomplete` |
| 选项数量很多（上百个） | `autocomplete` |
| 精确的枚举值 | `select` |

## 新手常见问题

**Q: 输入内容后没有显示建议选项？**
- 检查 `options` 是否正确配置，每个选项需要有 `value` 字段。
- 如果 options 是动态获取的，确认数据已正确传入。

**Q: 选中的值与显示的不一致？**
- `options` 中每个选项的 `value` 是选中后实际保存的值，`label` 是显示文本。
- 确认 `value.path` 绑定的字段与预期一致。

**Q: 想根据输入内容过滤选项？**
- 目前 `autocomplete` 组件默认会根据输入内容过滤 `options`。
- 如果需要自定义过滤逻辑，可能需要在传入前对 `options` 进行预处理。

**Q: 选项中的数据可以从接口获取吗？**
- 目前 `options` 需要在 schema 中静态配置。
- 如果需要动态 options，可以在传入 `Renderer` 前对 schema 进行预处理。

**Q: 为什么校验时提示"邮箱格式不正确"但我已经从下拉中选择了？**
- 确认选中的值确实符合邮箱格式要求。
- 如果选项的 `value` 本身就是完整邮箱格式，则不应该出现此错误。

**Q: `on_change` 中的 `${value}` 代表什么？**
- `${value}` 代表用户当前选中（或输入）的值。
- 如果从下拉选择，值是选项的 `value` 字段；如果用户直接输入，值是输入的文本。
