# qrcode 二维码组件
`qrcode` 用于在页面中渲染和展示二维码，支持自定义中心图标、颜色及纠错级别。

## 适用场景
- 生成包含页面链接或特定内容的二维码供用户扫码
- 结合全局状态生成具有时效性的动态二维码凭证
- 品牌化二维码展示（自定义颜色和中心 Logo）

## 核心属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `ValueBinding` | - | 动态数据绑定路径，优先读取 |
| `content` | `string` | - | 静态文本内容，`value` 未绑定时作为后备 |
| `icon` | `string` | - | 中心 Logo 图片地址，支持表达式 |
| `errorLevel` | `'L' \| 'M' \| 'Q' \| 'H'` | `'M'` | 容错级别（L:7%, M:15%, Q:25%, H:30%） |
| `color` | `string` | `'#000'` | 二维码颜色 |

## 完整示例

```json
{
  "component": "qrcode",
  "id": "qrcode-complex",
  "value": {
    "path": "/share/url"
  },
  "content": "https://fallback.example.com",
  "icon": "${$root.appConfig.logoUrl}",
  "errorLevel": "H",
  "color": "#52c41a",
  "bordered": true,
  "style": {
    "padding": "16px",
    "backgroundColor": "#f6ffed"
  }
}
```

## 常见问题

**Q: 配置了 `icon` 后手机扫不出来了？**
`icon` 会遮挡部分二维码数据。请将 `errorLevel` 提升为 `H`（最高容错 30%），或减小 `iconSize`。

**Q: 二维码颜色改成浅色后识别不了？**
二维码识别依赖前景与背景的对比度。建议尽量使用深色作为 `color`。

**Q: 页面刚加载时二维码显示的是 Ant Design 官网？**
当绑定数据为 `undefined` 且无静态 `content` 时，引擎会默认渲染兜底二维码。建议通过父容器 `visible` 属性隐藏加载中的二维码，或配置明确的 `content` 兜底。
