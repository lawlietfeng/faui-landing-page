# empty 空状态组件
当目前没有数据时作为状态展示，通常出现在列表、表格或容器内容为空的场景中。

## 适用场景
- 查询结果为空或尚未添加数据时展示
- 在空状态下提供"立即创建"等操作按钮引导用户
- 模块尚未开放或暂无权限时作为占位符

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `description` | `string` | - | 自定义描述文字，支持表达式。未配置时回退读取 `content` |
| `image` | `string` | `'default'` | 图片样式：`default`（复杂插画）、`simple`（线框）或图片 URL |
| `imageStyle` | `object` | - | 图片自定义样式（如 `{"height": 60}`） |

## 完整示例
带操作按钮引导的空状态：

```json
[
  {
    "id": "empty-with-action",
    "component": "empty",
    "image": "default",
    "description": "你还没有创建任何项目",
    "children": ["btn-create-project"]
  },
  {
    "id": "btn-create-project",
    "component": "button",
    "content": "立即创建",
    "type": "primary",
    "on_tap": [
      {
        "action": "message",
        "payload": { "type": "success", "content": "打开创建弹窗" }
      }
    ]
  }
]
```

## 常见问题
**Q: 配置了 content 但没有显示描述文字？**
组件优先读取 `description`，没有才回退读取 `content`。检查是否同时配置了两者且 `description` 被设为空字符串。

**Q: image 属性可以填本地相对路径吗？**
建议使用 `https://` 网络图片 URL。相对路径可能因路径解析或打包机制导致 404。

**Q: children 里除了按钮还能放别的吗？**
可以放任意合法 FAUI 组件，但为视觉美观建议只放 1-2 个引导性操作按钮。
