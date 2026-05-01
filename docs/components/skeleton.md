# skeleton 骨架屏组件
`skeleton` 用于在页面内容加载过程中提供视觉连贯的占位骨架，缓解用户等待焦虑。

## 适用场景
- 接口请求等待时展示占位骨架图
- 渲染为按钮、头像、输入框等特定形状的骨架
- 长列表、详情数据或图片加载前的过渡展示
- 配合 `visible` 绑定 loading 状态自动切换内容

## 核心属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `visible` | `boolean \| ValueBinding` | `true` | `true` 显示骨架屏，`false` 显示真实 `children` |
| `active` | `boolean` | `false` | 是否展示闪烁/流动动画 |
| `skeletonType` | `'button' \| 'avatar' \| 'input' \| 'image'` | - | 渲染为特定形状的独立骨架 |
| `avatar` | `boolean \| object` | `false` | 综合骨架中是否包含头像占位 |
| `paragraph` | `boolean \| object` | `true` | 综合骨架中是否包含段落占位（可指定 `rows`） |

## 完整示例

```json
{
  "component": "skeleton",
  "id": "skeleton-complex",
  "visible": {
    "path": "/page/isFetching"
  },
  "active": true,
  "avatar": {
    "shape": "square",
    "size": "large"
  },
  "paragraph": {
    "rows": 4,
    "width": ["100%", "100%", "80%", "60%"]
  },
  "round": true,
  "children": ["real-content-box"]
}
```

## 常见问题

**Q: 骨架屏和真实组件同时显示了？**
检查 `visible.path` 是否正确反映了 loading 状态。`visible` 为 `true` 时应显示骨架屏并隐藏 `children`，为 `false` 时相反。确认绑定的布尔值没有搞反。

**Q: 骨架屏的行数怎么调整？**
将 `paragraph` 配置为对象并指定 `rows`，如 `"paragraph": { "rows": 6 }`。

**Q: 怎么修改骨架屏颜色？**
基础组件无法直接配置颜色。需通过 `style` 或外部类名覆盖 Ant Design 的 CSS 变量（如 `@skeleton-color`）。
