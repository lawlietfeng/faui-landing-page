# carousel 走马灯组件
在一组内容之间进行轮播展示，常用于首页焦点图、产品轮播等场景。

## 适用场景
- 首页 Banner 展示核心宣传图片或活动入口
- 有限空间内展示多张图片或内容卡片
- 多步骤新手引导的轮播展示

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `Array` | - | 每帧内容配置（含 key、style、children） |
| `current.path` | `string` | - | 绑定当前激活帧索引，支持双向绑定受控跳转 |
| `autoplay` | `boolean` | `false` | 是否自动切换 |
| `autoplaySpeed` | `number` | - | 自动切换时间间隔（毫秒） |
| `effect` | `'scrollx' \| 'fade'` | `'scrollx'` | 动画效果（水平滚动或渐显） |
| `dotPosition` | `string` | `'bottom'` | 指示点位置：`top` / `bottom` / `left` / `right` |

## 完整示例
自动播放、指示点在左侧、带状态绑定和切换回调的走马灯：

```json
{
  "id": "main-carousel",
  "component": "carousel",
  "autoplay": true,
  "dotPosition": "left",
  "effect": "fade",
  "current": {
    "path": "/activeIndex"
  },
  "on_change": {
    "action": "message",
    "payload": {
      "type": "info",
      "content": "切换到了第 ${value} 张"
    }
  },
  "items": [
    {
      "key": "1",
      "style": { "height": "300px", "background": "#f5f5f5" },
      "children": ["banner_title_1"]
    },
    {
      "key": "2",
      "style": { "height": "300px", "background": "#e6f7ff" },
      "children": ["banner_title_2"]
    }
  ]
}
```

## 常见问题
**Q: 配置了 items 但画面一片空白？**
检查 `items` 中是否配置了 `children` 且引用的组件 ID 真实存在。走马灯默认可能没有高度，请给每个 item 设置 `style.height` 或在子组件中撑开高度。

**Q: 走马灯能绑定 on_change 吗？**
可以。面板切换完毕后触发 `on_change`，当前索引通过 `${value}` 注入到后续 Action 中。
