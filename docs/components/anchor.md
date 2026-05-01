# anchor 锚点组件
展示页面目录，提供点击跳转到页面指定位置的功能，并根据滚动状态自动高亮当前区域。

## 适用场景
- 长篇文档侧边栏展示目录结构，方便快速定位
- 将长表单或详情页划分为多个区块，通过锚点快速切换
- 用户阅读到某个区块时，锚点菜单自动跟随高亮
- 页面顶部水平导航条

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `AnchorItemConfig[]` | - | 锚点数据项（含 key、href、title、children） |
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | 导航锚点的排列方向 |
| `affix` | `boolean` | `true` | 是否固定模式，滚动时始终固定在视口中 |
| `targetSelector` | `string` | - | 监听滚动事件的元素选择器，不填则监听 window |
| `on_change` | `Action` | - | 锚点链接改变时触发，注入 `${payload.currentLink}` |

## 完整示例
水平方向锚点，点击后跳转到下方的 box 容器：

```json
[
  {
    "id": "anchor-nav",
    "component": "anchor",
    "direction": "horizontal",
    "affix": true,
    "items": [
      { "key": "base", "href": "#base-info", "title": "基本信息" },
      { "key": "detail", "href": "#detail-info", "title": "详细信息" }
    ]
  },
  {
    "id": "base-section",
    "component": "box",
    "domId": "base-info",
    "style": { "height": "500px", "padding": "20px", "background": "#f0f2f5" },
    "children": []
  },
  {
    "id": "detail-section",
    "component": "box",
    "domId": "detail-info",
    "style": { "height": "800px", "padding": "20px", "background": "#e6f7ff" },
    "children": []
  }
]
```

## 常见问题
**Q: 点击锚点不跳转，或者滚动时锚点不高亮？**
检查目标组件是否配置了 `domId`，`items` 中 `href` 必须以 `#` 开头且与 `domId` 严格一致。如果目标在带滚动条的容器内，必须配置 `targetSelector`。

**Q: 设置了 domId 还是跳转不准？**
不支持将 `domId` 设在 `typography`、`text` 等行内组件上，必须设置在外层块级容器（如 `box`、`flex`）上。

**Q: 水平模式下子菜单没有渲染出来？**
`direction: "horizontal"` 时不支持多级嵌套，引擎会自动过滤掉所有 `children`，请保持单层级。
