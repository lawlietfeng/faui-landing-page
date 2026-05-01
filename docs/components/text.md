# text 组件

`text` 组件用于在页面上展示文本内容，支持静态文案和动态表达式两种模式。

## 适用场景

- 页面标题、副标题、段落文字
- 动态展示数据模型中的值（如用户名、状态描述）
- 条件性显示不同的提示文案

## 核心属性

### content（文本内容）

`content` 支持两种形式：

**1. 静态文案（普通字符串）**

```json
{
  "id": "title",
  "component": "text",
  "content": "用户信息"
}
```

**2. 动态表达式（模板字符串）**

在 `content` 中使用 `${...}` 语法，可以读取数据模型中的值：

```json
{
  "id": "welcome",
  "component": "text",
  "content": "欢迎，${name}"
}
```

当 `dataModel.name` 为 `"张三"` 时，页面显示：`欢迎，张三`

### 表达式上下文变量

在 `text` 的 `content` 中，可以使用以下变量访问数据：

| 变量 | 含义 | 示例 |
|------|------|------|
| `$root` | 整个页面的 `dataModel` 对象 | `${$root.name}` |
| `$current` | 当前列表/表格行数据（仅在 list/table 中生效） | `${$current.status}` |

**简单场景**：`content: "用户名：${name}"` 等同于 `content: "用户名：${$root.name}"`。

### style（文本样式）

通过 `style` 对象设置 CSS 样式：

```json
{
  "id": "title",
  "component": "text",
  "content": "页面标题",
  "style": {
    "fontSize": "20px",
    "fontWeight": "bold",
    "color": "#1f2937"
  }
}
```

### className（CSS 类名）

如果项目使用了 Tailwind CSS 或自定义 CSS，可以通过 `className` 添加类名：

```json
{
  "id": "hint",
  "component": "text",
  "content": "带 class 渲染的文字",
  "className": "text-gray-500 text-sm"
}
```

## 完整示例

### 基础用法

```json
{
  "id": "header-title",
  "component": "text",
  "content": "申请表单",
  "style": {
    "fontSize": "18px",
    "fontWeight": "bold",
    "color": "#1f2937"
  }
}
```

### 动态拼接

```json
{
  "id": "status-text",
  "component": "text",
  "content": "当前状态：${status}",
  "style": {
    "fontSize": "14px",
    "color": "#6b7280"
  }
}
```

### 三元表达式

`content` 中可以使用 JavaScript 三元表达式：

```json
{
  "id": "vip-badge",
  "component": "text",
  "content": "${isVip ? 'VIP用户' : '普通用户'}",
  "style": {
    "color": "${isVip ? '#ffd700' : '#9ca3af'}"
  }
}
```

当 `isVip` 为 `true` 时显示金色"VIP用户"，否则显示灰色"普通用户"。

### 读取嵌套对象

```json
{
  "id": "user-info",
  "component": "text",
  "content": "${user.name}（${user.department}）"
}
```

假设 `dataModel.user = { name: "李四", department: "研发部" }`，则渲染为：`李四（研发部）`

### 数字运算与格式化

```json
{
  "id": "price",
  "component": "text",
  "content": "总价：¥${(price * count).toFixed(2)}"
}
```

## visible 条件显示

`text` 也支持 `visible` 属性控制是否显示：

```json
{
  "id": "error-tip",
  "component": "text",
  "content": "请检查输入内容",
  "visible": "${hasError} === true",
  "style": {
    "color": "#ef4444",
    "fontSize": "12px"
  }
}
```

当 `dataModel.hasError` 为 `true` 时才显示错误提示。

## 与 children 的区别

`text` 组件的 `content` 是一种简化的文本渲染方式。如果需要更复杂的子组件结构（如文本中混合图片、超链接等），应使用 `box` 容器 + 多个子组件的方式。

对于纯文本展示场景，直接使用 `text` + `content` 更简洁。

## 新手常见问题

**Q: content 中的 `${name}` 没有被替换，显示的就是 `${name}`？**
- 检查表达式语法是否正确：`${` 和 `}` 必须成对出现。
- 如果字段名本身包含特殊字符，需要用引号包裹：`${$root['field-name']}`。

**Q: 想显示美元符号 `$` 怎么办？**
- 使用转义：`\$` 会渲染为 `$`。

**Q: text 组件显示的内容没有样式？**
- `text` 组件默认渲染为 `<span>` 元素。如果需要块级元素（占满整行），可以用 `style` 设置 `display: "block"`。

**Q: 动态内容没有更新？**
- `text` 的 `content` 在组件渲染时求值。如果数据在运行时变化，需要确认数据更新时触发了重新渲染。faui 的响应式机制会在 `dataModel` 变化时自动更新依赖的组件。
