# avatar 头像组件
用来代表用户或事物，支持显示图片、系统图标或文本字符。

## 适用场景
- 导航栏右上角或个人中心显示用户头像
- 联系人列表、评论区卡片中作为视觉焦点标识身份
- 用户没有上传头像时，使用名字首字母或默认图标占位

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `src` | `string` | - | 图片资源的 URL 地址 |
| `content` | `string` | - | 文字头像内容（如名字首字母），支持表达式 |
| `icon` | `string` | - | 备用系统图标名称，目前仅支持 `"user"` |
| `shape` | `'circle' \| 'square'` | `'circle'` | 头像形状 |
| `size` | `string \| number` | `'default'` | 尺寸，可选 `"large"` / `"small"` / `"default"` 或数字 |

## 完整示例
并排显示四种不同形式的头像：图片、图标、静态文字和动态绑定：

```json
[
  {
    "id": "avatar-container",
    "component": "space",
    "children": ["avatar-pic", "avatar-icon", "avatar-text", "avatar-dynamic"]
  },
  {
    "id": "avatar-pic",
    "component": "avatar",
    "size": "large",
    "src": "https://api.dicebear.com/7.x/miniavs/svg?seed=1"
  },
  {
    "id": "avatar-icon",
    "component": "avatar",
    "shape": "square",
    "icon": "user",
    "style": { "backgroundColor": "#87d068" }
  },
  {
    "id": "avatar-text",
    "component": "avatar",
    "content": "U",
    "style": { "backgroundColor": "#f56a00" }
  },
  {
    "id": "avatar-dynamic",
    "component": "avatar",
    "data": { "path": "/dynamicUserName" },
    "style": { "backgroundColor": "#1677ff" }
  }
]
```

## 常见问题
**Q: 传了 src 又传了 content，只显示图片？**
组件有渲染优先级：动态数据（http 开头）> 静态 `src` > 动态数据（非 http）> 静态 `content`。图片资源有效时优先展示图片。

**Q: 文字头像的背景颜色怎么修改？**
通过 `style` 属性传入 `backgroundColor`，例如 `{"style": {"backgroundColor": "#f56a00"}}`。

**Q: 可以使用自定义的 icon 吗？**
目前 `icon` 仅支持 `"user"`。更复杂的图标需求建议使用 `src` 传入自定义图标的 URL。
