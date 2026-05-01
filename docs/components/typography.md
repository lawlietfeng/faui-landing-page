# typography 排版组件
提供基础的文本排版能力，包含标题、段落、文本和链接，内置复制、省略、状态色等功能。

## 适用场景
- 页面大标题、模块标题或大段说明文字
- 展示成功、警告、失败等带语义色彩的状态文本
- 需要单行省略（`ellipsis`）或一键复制（`copyable`）的文本（如订单号、长链接）
- 混合样式文本（普通文字中嵌入链接）

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| variant | `string` | `"text"` | 排版变体：`"text"` / `"title"` / `"paragraph"` / `"link"` |
| content | `string` | - | 静态文本内容，支持插值表达式 |
| level | `number` | - | 仅 `variant="title"` 时生效，标题级别 1-5 |
| copyable | `boolean \| object` | `false` | 是否开启一键复制功能 |
| ellipsis | `boolean \| object` | `false` | 自动溢出省略，可配置 `tooltip` 显示完整内容 |

## 完整示例
```json
[
  {
    "id": "info_card",
    "type": "element",
    "config": {
      "component": "card",
      "title": "API 密钥信息",
      "children": ["api_title", "api_key_box", "api_help"]
    }
  },
  {
    "id": "api_title",
    "type": "element",
    "config": {
      "component": "typography",
      "variant": "title",
      "level": 4,
      "content": "您的 Secret Key"
    }
  },
  {
    "id": "api_key_box",
    "type": "element",
    "config": {
      "component": "typography",
      "variant": "paragraph",
      "content": "your_api_key_placeholder_here",
      "copyable": true,
      "code": true,
      "textType": "danger"
    }
  },
  {
    "id": "api_help",
    "type": "element",
    "config": {
      "component": "typography",
      "variant": "paragraph",
      "textType": "secondary",
      "items": [
        { "content": "请妥善保管您的密钥，切勿泄露。了解更多请阅读" },
        { "variant": "link", "content": "安全指南", "href": "/security" }
      ]
    }
  }
]
```

## 常见问题

**Q: 设置了 `ellipsis: true` 但文字没有省略号？**
单行省略需要容器有明确宽度限制。如果父容器允许无限拉伸，文字不会省略。给 Typography 加 `style: { "width": "200px" }` 或设置父容器 `overflow: hidden`。

**Q: `typography` 和 `text` 组件有什么区别？**
`text` 是基础文本节点，仅显示文字。`typography` 是高级排版组件，支持多种 HTML 语义标签、状态颜色、复制、省略等功能，建议优先使用。

**Q: `items` 数组里每项需要写 `component: "typography"` 吗？**
不需要。引擎会自动将 `items` 中的对象当作 `typography` 配置解析，只需关注 `variant`、`content` 等属性。
