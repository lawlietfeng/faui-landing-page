# Tag 标签组件

`tag` 组件用于进行标记和分类的小标签。

## 适用场景

- 用于标记事物的属性、维度或分类
- 状态展示（如"已完成"、"待处理"等）

## 核心属性

### color（标签色）
设置标签的颜色。支持 Ant Design 的预设颜色（如 `success`, `processing`, `error`, `warning`, `magenta`, `blue` 等），也支持自定义的十六进制色值（如 `#f50`）。

```json
{
  "id": "status-tag",
  "component": "tag",
  "color": "success",
  "content": "已发货"
}
```

### content / label（标签内容）
设置标签内显示的文字内容。这两个属性效果相同，推荐使用 `content`。

### bordered（是否有边框）
布尔值，设置标签是否展示边框。默认为 `true`。

```json
{
  "id": "borderless-tag",
  "component": "tag",
  "color": "blue",
  "bordered": false,
  "content": "无边框标签"
}
```

## 完整示例

```json
[
  {
    "id": "preset-tag-1",
    "component": "tag",
    "color": "processing",
    "content": "处理中"
  },
  {
    "id": "preset-tag-2",
    "component": "tag",
    "color": "error",
    "content": "失败"
  },
  {
    "id": "custom-color-tag",
    "component": "tag",
    "color": "#87d068",
    "content": "自定义颜色"
  },
  {
    "id": "borderless-tag",
    "component": "tag",
    "color": "cyan",
    "bordered": false,
    "content": "纯色底标签"
  }
]
```
## 新手常见问题

**Q: 标签的颜色不支持我的输入？**
- `color` 支持 Ant Design 的预设颜色（如 `success`, `error` 等）和十六进制色值（如 `#ff0000`）。

**Q: `content` 和 `label` 应该用哪个？**
- 两者都可以，效果完全相同。为了规范，建议统一使用 `content`。
