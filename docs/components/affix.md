# affix 固钉组件
将页面元素钉在可视范围，当页面滚动到一定位置时，元素会固定在屏幕上。

## 适用场景
- 长页面滚动时保持侧边栏导航始终可见
- 长表单底部的"保存"、"提交"按钮悬浮在屏幕底部
- 需要始终展示在用户视野内的公告或提示

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `offsetTop` | `number` | - | 距窗口顶部达到指定偏移量后触发固定 |
| `offsetBottom` | `number` | - | 距窗口底部达到指定偏移量后触发固定 |
| `targetSelector` | `string` | - | 监听滚动事件的元素选择器，不填则监听 window |
| `on_change` | `Action` | - | 固钉状态改变时触发，注入 `${payload.affixed}` |

## 完整示例
在一个带有滚动条的容器内部固定一个按钮：

```json
[
  {
    "id": "scrollable-container",
    "component": "box",
    "className": "my-scroll-box",
    "style": {
      "height": "200px",
      "overflowY": "scroll",
      "border": "1px solid #ccc"
    },
    "children": ["affix-wrapper", "long-content"]
  },
  {
    "id": "affix-wrapper",
    "component": "affix",
    "targetSelector": ".my-scroll-box",
    "offsetTop": 0,
    "children": ["fixed-btn"]
  },
  {
    "id": "fixed-btn",
    "component": "button",
    "label": "我是固定按钮"
  },
  {
    "id": "long-content",
    "component": "box",
    "style": { "height": "800px", "background": "linear-gradient(#f5f5f5, #ddd)" },
    "children": []
  }
]
```

## 常见问题
**Q: 设置了 targetSelector 却没有生效？**
检查对应 DOM 节点是否确实产生了滚动条（需设置 `overflow: scroll/auto` 及明确高度），并确保选择器能正确匹配到目标容器。

**Q: 固钉元素被其他元素遮挡了怎么办？**
通过 `style` 属性为组件增加更高的 `z-index`，例如 `{ "zIndex": 999 }`。

**Q: 为什么内容宽度在固定后变了？**
脱离文档流后宽度会重新计算，在子组件的 `style` 中明确指定 `width` 即可。
