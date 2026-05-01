# box 组件

`box` 是 faui 中最基础的布局容器组件，类似于 HTML 中的 `div`，但专门用于弹性盒（Flex）布局。

## 适用场景

- **页面根容器**：包裹整个页面的所有组件
- **分组容器**：将相关组件归为一组，如"基本信息"区块、"审批信息"区块
- **横向/纵向排列**：用 `layout` 控制子组件的排列方向
- **间距控制**：用 `spacing` 控制子组件之间的间距

## 核心属性

### layout（排列方向）

| 值 | 效果 | 典型用途 |
|---|------|---------|
| `vertical`（默认） | 子组件从上到下垂直排列 | 表单、列表、卡片 |
| `horizontal` | 子组件从左到右水平排列 | 表格行、表单项横向排列 |

```json
// 垂直排列（默认）
{
  "id": "vertical-box",
  "component": "box",
  "layout": "vertical",
  "children": ["title", "description", "button"]
}
```

```json
// 水平排列
{
  "id": "horizontal-box",
  "component": "box",
  "layout": "horizontal",
  "children": ["label", "input", "unit-text"]
}
```

### spacing（子组件间距）

数值类型，单位为像素（px）。控制 `children` 中相邻两个组件之间的间距。

```json
{
  "id": "spaced-box",
  "component": "box",
  "layout": "vertical",
  "spacing": 16,
  "children": ["name", "email", "phone"]
}
```

上面配置的效果：name 和 email 之间间距 16px，email 和 phone 之间间距也是 16px。

### padding（容器内边距）

数值类型，控制 box 容器本身与子组件之间的留白。

```json
{
  "id": "padded-box",
  "component": "box",
  "padding": 20,
  "children": ["content1", "content2"]
}
```

### align（垂直对齐）

当 `layout: "horizontal"` 时，控制子组件在垂直方向上的对齐方式。

| 值 | 效果 |
|---|------|
| `start` | 顶部对齐 |
| `center` | 垂直居中对齐 |
| `end` | 底部对齐 |
| `stretch` | 拉伸至容器高度（默认） |

### justify（水平对齐）

当 `layout: "horizontal"` 时，控制子组件在水平方向上的分布方式。

| 值 | 效果 |
|---|------|
| `start` | 左对齐（默认） |
| `center` | 水平居中 |
| `end` | 右对齐 |
| `space-between` | 两端对齐，中间子组件等间距分布 |
| `space-around` | 每个子组件两侧间距相等 |

## children（子组件）

`children` 是一个字符串数组，每个字符串是对应子组件的 `id`。组件按照数组顺序依次渲染。

```json
{
  "id": "root",
  "component": "box",
  "layout": "vertical",
  "spacing": 12,
  "padding": 16,
  "children": ["header-text", "form-container"]
}
```

**注意**：`children` 中引用的 `id` 必须在本 schema 的 `components` 数组中定义过，且 `id` 必须唯一。

## 嵌套使用

box 可以无限嵌套，实现复杂的页面布局。典型模式：

```
root (vertical, padding: 16)
├── header-box (horizontal, 放标题和操作按钮)
└── content-box (vertical, spacing: 12)
    ├── section-1-box (分组容器)
    └── section-2-box (分组容器)
```

示例：

```json
[
  {
    "id": "root",
    "component": "box",
    "layout": "vertical",
    "padding": 16,
    "spacing": 16,
    "children": ["header", "main-content"]
  },
  {
    "id": "header",
    "component": "box",
    "layout": "horizontal",
    "justify": "space-between",
    "align": "center",
    "children": ["page-title", "action-btn"]
  },
  {
    "id": "page-title",
    "component": "text",
    "content": "用户管理"
  },
  {
    "id": "action-btn",
    "component": "button",
    "label": "新建用户"
  },
  {
    "id": "main-content",
    "component": "box",
    "layout": "vertical",
    "spacing": 12,
    "children": ["filter-box", "table-box"]
  }
]
```

## visible 条件显示

配合 `visible` 属性，可以实现条件性的分组显示：

```json
{
  "id": "vip-section",
  "component": "box",
  "visible": "${isVip} === true",
  "children": ["vip-badge", "vip-features"]
}
```

当 `dataModel.isVip` 不为 `true` 时，整个 `vip-section` 及其子组件都不会渲染。

## 完整示例

```json
{
  "id": "profile-card",
  "component": "box",
  "layout": "vertical",
  "spacing": 12,
  "padding": 16,
  "style": {
    "background": "#ffffff",
    "borderRadius": "8px",
    "boxShadow": "0 2px 8px rgba(0,0,0,0.1)"
  },
  "children": ["avatar-box", "info-box"]
},
{
  "id": "avatar-box",
  "component": "box",
  "layout": "horizontal",
  "align": "center",
  "spacing": 12,
  "children": ["avatar-img", "name-text"]
}
```

## 新手常见问题

**Q: 子组件没有按预期排列？**
- 检查 `layout` 是否设置正确。默认是 `vertical`，如果需要水平排列要显式设置为 `horizontal`。

**Q: 子组件之间没有间距？**
- 检查是否设置了 `spacing`，它不会自动添加，需要显式指定数值。

**Q: box 的宽度/高度不符合预期？**
- box 默认宽度撑满父容器（block 特性），高度由子组件决定。如果需要限制尺寸，可以用 `style` 覆盖：`{ "width": "200px", "height": "100px" }`。

**Q: children 中的组件没有渲染？**
- 确认 children 数组中的 id 字符串与对应组件的 `id` 字段完全一致（区分大小写）。
- 确认引用的组件确实存在于 `components` 数组中。
