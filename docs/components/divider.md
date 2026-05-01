# Divider 分割线组件

`divider` 组件用于区隔内容的分割线。

## 适用场景

- 对不同章节的文本段落进行分割
- 对行内文字/链接进行分割，例如表格的操作列

## 核心属性

### direction（方向）
设置分割线的方向，可选值为 `horizontal`（水平）和 `vertical`（垂直）。默认为 `horizontal`。

### content（分割线标题内容）
仅在水平分割线（`horizontal`）时有效，可以在分割线中间显示文字。

### align（标题位置）
当设置了 `content` 时，可以指定标题文字的位置。可选值为 `start`（居左）、`center`（居中）和 `end`（居右）。默认为居中对齐。

## 完整示例

### 基础水平分割线
```json
{
  "id": "basic-divider",
  "component": "divider"
}
```

### 带文字的分割线
```json
{
  "id": "text-divider",
  "component": "divider",
  "content": "以下为详细信息",
  "align": "start"
}
```

### 垂直分割线
```json
[
  {
    "id": "edit-text",
    "component": "text",
    "content": "编辑"
  },
  {
    "id": "vertical-divider",
    "component": "divider",
    "direction": "vertical"
  },
  {
    "id": "delete-text",
    "component": "text",
    "content": "删除"
  }
]
```
## 新手常见问题

**Q: 分割线上的文字不在正中间？**
- 检查 `align` 属性是否被设置成了 `start` 或 `end`。默认为 `center`。

**Q: 垂直分割线没有显示出来？**
- 垂直分割线 (`direction: "vertical"`) 通常需要和行内元素（如 text 组件）配合使用，请确保父容器是 flex 或行内布局。
