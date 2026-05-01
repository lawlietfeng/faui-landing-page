# rate 组件

`rate` 是评分组件，用于提供星级评分体验，适用于服务质量评分、产品满意度、等级评定等场景。

## 适用场景

- 商品/服务满意度评分
- 星级评价（如酒店、餐厅评价）
- 等级评定（如技能等级、信誉等级）
- 任何需要用户给出等级评价的场景

## 核心属性

### count（星星总数）

设置评分的星星数量，默认为 5：

```json
{
  "id": "rating-rate",
  "component": "rate",
  "count": 5
}
```

### allowHalf（是否允许半星）

设置为 `true` 可以支持半颗星评分：

```json
{
  "id": "rating-rate",
  "component": "rate",
  "allowHalf": true
}
```

- `true`：可以评 1、1.5、2、2.5... 星
- `false`（默认）：只能评整数星

### value.path（数据绑定）

```json
{
  "id": "rating-rate",
  "component": "rate",
  "value": { "path": "/rating" }
}
```

### on_change（值变化事件）

**必须配置**：

```json
{
  "id": "rating-rate",
  "component": "rate",
  "value": { "path": "/rating" },
  "on_change": { "action": "update_data", "path": "/rating", "value": "${value}" }
}
```

`${value}` 是当前评分的数值（number 类型）。

### rules（校验规则）

```json
{
  "id": "rating-rate",
  "component": "rate",
  "rules": [{ "required": true, "message": "请进行评分" }]
}
```

### validateTrigger（触发校验时机）

```json
{
  "id": "rating-rate",
  "component": "rate",
  "validateTrigger": "onChange"
}
```

## 完整示例

### 基础评分（5星制）

```json
{
  "id": "rating-rate",
  "component": "rate",
  "value": { "path": "/rating" },
  "rules": [{ "required": true, "message": "请选择评分" }],
  "on_change": { "action": "update_data", "path": "/rating", "value": "${value}" }
}
```

### 允许半星的评分

```json
{
  "id": "rating-rate",
  "component": "rate",
  "allowHalf": true,
  "count": 5,
  "value": { "path": "/rating" },
  "rules": [
    { "required": true, "message": "请进行评分" },
    { "min": 1, "message": "评分至少 1 星" }
  ],
  "on_change": { "action": "update_data", "path": "/rating", "value": "${value}" }
}
```

### 10星制评分

```json
{
  "id": "level-rate",
  "component": "rate",
  "count": 10,
  "value": { "path": "/level" },
  "rules": [
    { "required": true, "message": "请选择等级" },
    { "min": 1, "message": "等级至少为 1" }
  ],
  "on_change": { "action": "update_data", "path": "/level", "value": "${value}" }
}
```

### 带提示文字的评分

评分组件本身不直接支持提示文字，但可以配合 `text` 组件展示：

```json
[
  {
    "id": "rating-section",
    "component": "box",
    "layout": "vertical",
    "spacing": 8,
    "children": ["rating-label", "rating-rate", "rating-hint"]
  },
  {
    "id": "rating-label",
    "component": "text",
    "content": "请为本次服务评分"
  },
  {
    "id": "rating-rate",
    "component": "rate",
    "allowHalf": true,
    "value": { "path": "/serviceRating" },
    "on_change": { "action": "update_data", "path": "/serviceRating", "value": "${value}" }
  },
  {
    "id": "rating-hint",
    "component": "text",
    "content": "${$root.serviceRating >= 4 ? '感谢您的满意！' : $root.serviceRating >= 2 ? '我们会继续改进' : '抱歉给您带来不好的体验'}"
  }
]
```

### 在表单中使用

```json
[
  {
    "id": "review-form",
    "component": "form",
    "submitButtonId": "submit-btn",
    "children": ["title-input", "rating-rate", "comment-input", "submit-btn"]
  },
  {
    "id": "title-input",
    "component": "input",
    "placeholder": "请输入评价标题",
    "value": { "path": "/title" },
    "rules": [{ "required": true, "message": "请输入标题" }],
    "on_change": { "action": "update_data", "path": "/title", "value": "${value}" }
  },
  {
    "id": "rating-rate",
    "component": "rate",
    "allowHalf": true,
    "count": 5,
    "value": { "path": "/rating" },
    "rules": [{ "required": true, "message": "请选择评分" }],
    "on_change": { "action": "update_data", "path": "/rating", "value": "${value}" }
  },
  {
    "id": "comment-input",
    "component": "textarea",
    "placeholder": "请输入详细评价",
    "rows": 4,
    "value": { "path": "/comment" },
    "rules": [
      { "required": true, "message": "请输入评价内容" },
      { "min": 10, "message": "评价内容至少 10 个字" }
    ],
    "on_change": { "action": "update_data", "path": "/comment", "value": "${value}" }
  },
  {
    "id": "submit-btn",
    "component": "button",
    "label": "提交评价",
    "on_tap": [
      { "action": "http_proxy", "payload": { "http_config": { "method": "POST", "path": "/api/review" } } }
    ]
  }
]
```

## 与其他评分方式的对比

| 组件 | 适用场景 | 特点 |
|------|---------|------|
| `rate` | 星级评分 | 直观、可半星 |
| `radio` | 等级选择 | 选项明确（1-5 文字描述） |
| `slider` | 连续数值 | 可拖动、范围选择 |
| `select` | 固定选项 | 选项可定制 |

## 新手常见问题

**Q: 评分后值是什么类型？**
- 评分的值是 number 类型，如 `1`、`2.5`、`5`。

**Q: 默认显示几颗星？**
- 初始值取决于 `dataModel` 中对应字段的值。
- 如果未设置或为 `0`，则不显示任何选中状态。

**Q: 如何设置初始值为满分？**
- 在 `dataModel` 中设置：
```json
{
  "dataModel": {
    "rating": 5
  }
}
```

**Q: 半星是如何显示的？**
- 当 `allowHalf: true` 时，用户可以点击星星的左半边选择半星。
- 视觉上会显示半个填充的星星。

**Q: 可以自定义星星的样式吗？**
- 可以通过 `style` 覆盖星星的颜色等样式。
- 如需自定义星星图标（如用 ❤️ 代替 ★），可能需要查看是否支持 `character` 属性。

**Q: 如何在后端处理评分的聚合计算？**
- 每个评分提交后是数值，可以直接存储。
- 聚合计算（如平均分）在后端或前端均可进行。

**Q: 评分组件可以只读展示吗？**
- 可以，将 `value.path` 绑定到一个有值的字段，但不配置 `on_change`。
- 但用户仍可以点击改变值（只是不保存），如需真正只读，可能需要其他方式。

**Q: 评分的最小值是 0 还是 1？**
- 默认最小值是 0（不选择）。
- 如果 `required: true`，用户必须选择至少 1 星才能提交。
