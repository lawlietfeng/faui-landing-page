# mentions 组件

`mentions` 是提及组件，用于在文本框中通过触发符（如 `@` 或 `#`）提及人员、话题或标签。常见于评论、聊天、任务分配等需要 @ 通知的场景。

## 适用场景

- 评论中 @提及用户（如 GitHub、微博评论）
- 任务分配中 @负责人
- 群聊中 #话题 标签
- 任何需要在文本中插入特定标记的场景

## 核心概念

-mentions 的工作方式：
1. 用户在文本框中输入触发符（如 `@`）
2. 系统弹出建议列表
3. 用户选择或继续输入过滤
4. 选择后，建议内容以特殊样式插入到文本中

## 核心属性

### prefix（触发符）

触发建议列表的字符，默认为 `@`。可以是单个字符或数组：

```json
// 单个触发符
{ "prefix": "@" }

// 多个触发符
{ "prefix": ["@", "#"] }
```

### options（建议选项列表）

```json
{
  "id": "comment-mentions",
  "component": "mentions",
  "options": [
    { "value": "alice", "label": "Alice" },
    { "value": "bob", "label": "Bob" },
    { "value": "charlie", "label": "Charlie" }
  ]
}
```

- `value`：选中后插入到文本中的值
- `label`：在建议列表中显示的文本

### placeholder（占位提示）

```json
{
  "id": "comment-mentions",
  "component": "mentions",
  "placeholder": "输入 @ 提及相关人员"
}
```

### value.path（数据绑定）

```json
{
  "id": "comment-mentions",
  "component": "mentions",
  "value": { "path": "/comment" }
}
```

### on_change（值变化事件）

**必须配置**：

```json
{
  "id": "comment-mentions",
  "component": "mentions",
  "value": { "path": "/comment" },
  "on_change": { "action": "update_data", "path": "/comment", "value": "${value}" }
}
```

### rules（校验规则）

```json
{
  "id": "comment-mentions",
  "component": "mentions",
  "rules": [
    { "required": true, "message": "评论不能为空" },
    { "min": 5, "message": "评论字数至少 5 个字" }
  ]
}
```

### validateTrigger（触发校验时机）

```json
{
  "id": "comment-mentions",
  "component": "mentions",
  "validateTrigger": "onChange"
}
```

## 完整示例

### 用户提及（@用户）

```json
{
  "id": "comment-mentions",
  "component": "mentions",
  "placeholder": "输入 @ 提及相关人员",
  "prefix": "@",
  "value": { "path": "/comment" },
  "options": [
    { "value": "alice", "label": "Alice（产品经理）" },
    { "value": "bob", "label": "Bob（前端开发）" },
    { "value": "charlie", "label": "Charlie（设计师）" },
    { "value": "david", "label": "David（后端开发）" },
    { "value": "emma", "label": "Emma（测试）" }
  ],
  "rules": [
    { "required": true, "message": "评论不能为空" },
    { "min": 5, "message": "评论字数至少 5 个字" }
  ],
  "on_change": { "action": "update_data", "path": "/comment", "value": "${value}" }
}
```

### 话题标签（#话题）

```json
{
  "id": "topic-mentions",
  "component": "mentions",
  "placeholder": "输入 # 添加话题标签",
  "prefix": "#",
  "value": { "path": "/topics" },
  "options": [
    { "value": "feature-request", "label": "功能建议" },
    { "value": "bug-report", "label": "Bug 反馈" },
    { "value": "discussion", "label": "讨论" },
    { "value": "announcement", "label": "公告" }
  ],
  "on_change": { "action": "update_data", "path": "/topics", "value": "${value}" }
}
```

### 多触发符（@用户 和 #话题）

```json
{
  "id": "multi-mentions",
  "component": "mentions",
  "placeholder": "输入 @ 提及人员或 # 添加话题",
  "prefix": ["@", "#"],
  "value": { "path": "/content" },
  "options": [
    { "value": "alice", "label": "@Alice" },
    { "value": "bob", "label": "@Bob" },
    { "value": "charlie", "label": "@Charlie" },
    { "value": "feature", "label": "#功能建议" },
    { "value": "bug", "label": "#Bug反馈" },
    { "value": "discussion", "label": "#讨论" }
  ],
  "on_change": { "action": "update_data", "path": "/content", "value": "${value}" }
}
```

### 在表单中使用

```json
[
  {
    "id": "feedback-form",
    "component": "form",
    "submitButtonId": "submit-btn",
    "children": ["title-input", "comment-mentions", "submit-btn"]
  },
  {
    "id": "title-input",
    "component": "input",
    "placeholder": "请输入反馈标题",
    "value": { "path": "/title" },
    "rules": [{ "required": true, "message": "请输入标题" }],
    "on_change": { "action": "update_data", "path": "/title", "value": "${value}" }
  },
  {
    "id": "comment-mentions",
    "component": "mentions",
    "placeholder": "请输入反馈内容，可 @ 提及相关人员",
    "prefix": "@",
    "value": { "path": "/content" },
    "options": [
      { "value": "alice", "label": "Alice（产品经理）" },
      { "value": "bob", "label": "Bob（前端开发）" },
      { "value": "charlie", "label": "Charlie（设计师）" }
    ],
    "rules": [
      { "required": true, "message": "请输入反馈内容" },
      { "min": 10, "message": "内容至少 10 个字符" }
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

**Q: 输入 @ 后没有弹出建议列表？**
- 检查 `prefix` 是否配置正确。
- 检查 `options` 是否正确配置，每个选项需要有 `value` 字段。

**Q: 选中的值显示格式不对？**
- 选中后插入到文本中的值是 `options` 中的 `value` 字段。
- `label` 字段只在建议列表中显示。

**Q: 可以同时支持 @ 和 # 两种触发符吗？**
- 可以，将 `prefix` 设置为数组：`"prefix": ["@", "#"]`。
- 不同触发符可以对应不同的 `options` 数据源（如果需要，可以通过 `split` 配合实现）。

**Q: 如何自定义触发符的样式？**
- 目前 `mentions` 组件的样式主要由 Ant Design 决定。
- 如需自定义，可能需要通过 `style` 或 `className` 覆盖。

**Q: 选中的 mention 如何在后端解析？**
- 选中的 mention 会以 `@value` 的形式插入到文本中。
- 后端可以按照 `@` 符号来解析和提取被提及的人员/话题。

**Q: `on_change` 的 `${value}` 是什么格式？**
- 是包含 mention 标记的完整文本字符串。
- 例如：`"Hello @alice, please review this @bob"`。

**Q: 如何校验文本中必须包含 mention？**
- 可以通过自定义校验函数或在 `on_change` 中更新额外的状态字段来实现。
- 目前的 `rules` 不支持直接校验 mention 是否存在。

**Q: `split` 属性有什么用？**
- `split` 用于指定 mention 值与周围文本的分隔符，默认是空格。
- 如果需要自定义 mention 在文本中的格式，可以调整此属性。
