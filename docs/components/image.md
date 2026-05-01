# Image 图片组件

`image` 组件用于展示图片，默认不展示预览，可通过 JSON 配置开启。

## 适用场景

- 在页面中展示头像、封面等图片
- 需要按需开启点击查看大图预览的场景

## 核心属性

### src（图片地址）
字符串类型，指定图片的 URL 地址。

```json
{
  "id": "logo-image",
  "component": "image",
  "src": "https://example.com/logo.png"
}
```

### alt（图片描述）
字符串类型，当图片无法加载时显示的替代文本。

```json
{
  "id": "avatar-image",
  "component": "image",
  "src": "https://example.com/avatar.jpg",
  "alt": "用户头像"
}
```

### preview（是否启用预览）
布尔类型，控制是否支持点击图片后预览大图。默认值为 `false`。

```json
{
  "id": "cover-image",
  "component": "image",
  "src": "https://example.com/cover.jpg",
  "alt": "封面图",
  "preview": true
}
```

## 完整示例

```json
{
  "id": "product-image",
  "component": "image",
  "src": "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
  "alt": "商品主图",
  "preview": true,
  "style": {
    "width": "200px",
    "height": "200px",
    "borderRadius": "8px"
  }
}
```
## 新手常见问题

**Q: 图片加载失败怎么办？**
- 检查 `src` 地址是否正确且跨域策略允许访问。加载失败时会显示 `alt` 属性配置的替代文本。

**Q: 如何控制图片的大小？**
- 通过 `style` 属性设置 `width` 和 `height`，例如 `{"width": "100px", "height": "100px"}`。
