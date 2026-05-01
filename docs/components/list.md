# list 组件

`list` 是列表渲染组件，用于遍历数组数据并渲染子组件模板。适用于商品列表、待办列表、卡片列表等场景。

## 适用场景

- 商品列表、新闻列表
- 待办事项列表
- 卡片式数据展示
- 任何需要遍历数组渲染相同结构内容的场景

## 核心概念

### 数据上下文

`list` 组件在渲染每个列表项时，会创建一个**子数据上下文**：

- `$current`：当前遍历到的数组元素
- `$parent`：整个页面的 `dataModel` 对象
- 列表项作用域路径：当前项在根数据中的定位路径（例如 `/todos/0`）

这样，在列表项的子组件中，可以通过表达式访问当前行的数据。

同时，列表项内的输入与事件支持两种路径写法：

- 绝对路径：`/todos/0/title`（直接定位到根数据）
- 相对路径：`./title`（推荐，用于当前列表项的字段读写）

## 核心属性

### data.path（数据源路径）

指向 `dataModel` 中的数组字段：

```json
{
  "id": "todo-list",
  "component": "list",
  "data": { "path": "/todos" }
}
```

假设 `dataModel.todos = [{ title: "任务1", done: false }, { title: "任务2", done: true }]`，则列表会渲染两个条目。

### children（列表项模板）

`children` 是一个组件 `id` 数组，定义每个列表项的渲染结构：

```json
{
  "id": "todo-list",
  "component": "list",
  "data": { "path": "/todos" },
  "children": ["todo-item"]
}
```

### 列表项组件

`children` 中引用的组件本身是普通组件，但它的子组件（通过 `${$current.xxx}`）可以访问当前行的数据。  
当列表项内包含输入控件并需要更新当前行数据时，建议使用 `./字段名`：

```json
[
  {
    "id": "todo-list",
    "component": "list",
    "data": { "path": "/todos" },
    "children": ["todo-item"]
  },
  {
    "id": "todo-item",
    "component": "box",
    "layout": "horizontal",
    "spacing": 12,
    "children": ["todo-checkbox", "todo-title"]
  },
  {
    "id": "todo-checkbox",
    "component": "checkbox",
    "checked": { "path": "./done" },
    "on_change": { "action": "update_data", "path": "./done", "value": "${value}" }
  },
  {
    "id": "todo-title",
    "component": "text",
    "content": "${$current.title}"
  }
]
```

**关键点**：`todo-title` 的 `content: "${$current.title}"` 中的 `$current` 代表当前遍历到的 todo 对象。

## 列表项内更新数据（推荐写法）

对于 list 内部的 `input`、`checkbox`、`textarea`、`datepicker` 等交互组件，推荐统一使用相对路径：

```json
{
  "id": "expense-amount",
  "component": "inputnumber",
  "value": { "path": "./amount" },
  "on_change": { "action": "update_data", "path": "./amount" }
}
```

这样可以保证模板复用时，每一行都只更新自己的数据，不会误改到其他列表项。

## 完整示例

### 待办事项列表

```json
[
  {
    "id": "todo-list",
    "component": "list",
    "data": { "path": "/todos" },
    "children": ["todo-item"]
  },
  {
    "id": "todo-item",
    "component": "box",
    "layout": "horizontal",
    "spacing": 12,
    "align": "center",
    "children": ["todo-checkbox", "todo-title", "todo-delete"]
  },
  {
    "id": "todo-checkbox",
    "component": "checkbox",
    "checked": { "path": "./done" },
    "on_change": { "action": "update_data", "path": "./done", "value": "${value}" }
  },
  {
    "id": "todo-title",
    "component": "text",
    "content": "${$current.title}",
    "style": {
      "color": "${$current.done ? '#9ca3af' : '#1f2937'}",
      "textDecoration": "${$current.done ? 'line-through' : 'none'}"
    }
  },
  {
    "id": "todo-delete",
    "component": "button",
    "label": "删除"
  }
]
```

对应 `dataModel`：

```json
{
  "todos": [
    { "id": 1, "title": "完成报告", "done": false },
    { "id": 2, "title": "发送邮件", "done": true },
    { "id": 3, "title": "整理文件", "done": false }
  ]
}
```

### 商品卡片列表

```json
[
  {
    "id": "product-list",
    "component": "list",
    "data": { "path": "/products" },
    "children": ["product-card"]
  },
  {
    "id": "product-card",
    "component": "box",
    "layout": "vertical",
    "spacing": 8,
    "padding": 12,
    "style": {
      "border": "1px solid #e5e7eb",
      "borderRadius": "8px",
      "background": "#ffffff"
    },
    "children": ["product-name", "product-price", "product-action"]
  },
  {
    "id": "product-name",
    "component": "text",
    "content": "${$current.name}",
    "style": { "fontWeight": "bold", "fontSize": "16px" }
  },
  {
    "id": "product-price",
    "component": "text",
    "content": "¥${$current.price}",
    "style": { "color": "#ef4444" }
  },
  {
    "id": "product-action",
    "component": "button",
    "label": "加入购物车"
  }
]
```

### 员工信息列表

```json
[
  {
    "id": "employee-list",
    "component": "list",
    "data": { "path": "/employees" },
    "children": ["employee-row"]
  },
  {
    "id": "employee-row",
    "component": "box",
    "layout": "horizontal",
    "spacing": 16,
    "align": "center",
    "children": ["avatar", "info-box", "status-tag"]
  },
  {
    "id": "avatar",
    "component": "text",
    "content": "${$current.name.charAt(0)}",
    "style": {
      "width": "40px",
      "height": "40px",
      "borderRadius": "50%",
      "background": "#3b82f6",
      "color": "#fff",
      "display": "flex",
      "alignItems": "center",
      "justifyContent": "center"
    }
  },
  {
    "id": "info-box",
    "component": "box",
    "layout": "vertical",
    "spacing": 4,
    "children": ["emp-name", "emp-dept"]
  },
  {
    "id": "emp-name",
    "component": "text",
    "content": "${$current.name}"
  },
  {
    "id": "emp-dept",
    "component": "text",
    "content": "${$current.department}",
    "style": { "color": "#6b7280", "fontSize": "12px" }
  },
  {
    "id": "status-tag",
    "component": "text",
    "content": "${$current.status}",
    "style": {
      "color": "${$current.status === '在职' ? '#22c55e' : '#ef4444'}"
    }
  }
]
```

## list vs table 的选择

| 场景 | 推荐组件 |
|------|---------|
| 简单的单列/多列列表 | `list` |
| 需要表格形式（列对齐） | `table` |
| 列表项结构复杂 | `list` |
| 列表项结构统一 | `list` |
| 需要分页、排序 | `table` |
| 需要列级别的渲染控制（tag/checkbox） | `table` |

## 新手常见问题

**Q: 列表项中的组件没有渲染？**
- 检查 `list` 的 `children` 是否正确引用了子组件 `id`。
- 确认子组件的 `id` 在 `components` 数组中存在。

**Q: `$current` 访问不到数据？**
- `$current` 是 list 组件在遍历时自动注入的上下文。
- 确认在 list 的 `children` 子组件中使用，而不是在 list 外部使用。

**Q: 想访问父级（整个页面）的数据怎么办？**
- 使用 `$parent`，它代表 `dataModel` 对象本身。
- 例如：`${$parent.title}` 可以访问 `dataModel.title`。

**Q: 列表为空时不显示提示？**
- 目前 `list` 组件没有 `emptyText` 属性。
- 可以配合 `visible` 或条件渲染实现空列表提示。

**Q: 想在列表项中添加点击事件？**
- 给列表项中的按钮等可交互组件配置 `on_tap` 或 `on_change`。
- 建议在列表项内部优先使用相对路径（如 `./done`、`./remark`）更新当前项字段。
- 注意：列表项模板会被复用，每个列表项共享同一个组件配置。

**Q: 删除列表项时应该怎么写更稳妥？**
- 推荐用索引删除，避免值对象重复时误删多条。
- 例如：`"value": "${($root.todos || []).filter((_, i) => i !== ($root.todos || []).findIndex(x => x === $current))}"`

**Q: 如何实现列表项的动态显示/隐藏？**
- 使用 `visible` 属性配合 `$current` 的数据字段。
- 例如：`"visible": "${$current.deleted} !== true"` 可以过滤掉已删除的项。
