# Card 卡片组件

`card` 组件是最基础的容器组件，用于将信息分组或提供区域隔离。

## 适用场景

- 展示一组相关的结构化信息
- 页面区块划分
- 仪表盘的数据面板

## 核心属性

### title（卡片标题）
设置卡片的标题文字。

```json
{
  "id": "user-card",
  "component": "card",
  "title": "用户信息"
}
```

### bordered（是否有边框）
布尔值，设置卡片是否有边框。默认为 `true`。

### size（尺寸）
设置卡片的尺寸，可选值为 `default` 和 `small`。默认为 `default`。

### children（子组件）
一个数组，包含放入卡片内部的其他组件的 `id`。

```json
{
  "id": "detail-card",
  "component": "card",
  "title": "详细资料",
  "bordered": true,
  "children": ["user-name-text", "user-age-text"]
}
```

## 完整示例

```json
[
  {
    "id": "main-card",
    "component": "card",
    "title": "系统概览",
    "size": "default",
    "bordered": true,
    "style": {
      "marginBottom": "20px"
    },
    "children": ["alert-info", "stats-text"]
  },
  {
    "id": "alert-info",
    "component": "alert",
    "message": "系统运行良好",
    "status": "success",
    "style": {
      "marginBottom": "16px"
    }
  },
  {
    "id": "stats-text",
    "component": "text",
    "content": "当前在线人数：1,024 人"
  }
]
```
## 新手常见问题

**Q: 卡片内容溢出怎么处理？**
- 可以通过 `style` 属性设置 `overflow: "auto"` 或特定的宽高。

**Q: 为什么配置了 children 但没有显示内容？**
- 检查 `children` 数组中的组件 id 是否在当前页面的 schema 中定义，且拼写完全一致。
