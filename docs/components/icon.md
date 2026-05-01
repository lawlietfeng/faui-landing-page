# icon 图标组件
`icon` 组件用于渲染基于 SVG 的矢量图标，全量内置了 `@ant-design/icons` 图标库。

## 适用场景
- 放在按钮、菜单项、标题旁边增强视觉辨识度
- 通过不同图标和颜色表示当前状态（成功、警告、错误）
- 开启 `spin` 属性作为轻量级 Loading 指示器
- 配合 `button` 组件实现可点击的图标按钮

## 核心属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `icon` | `string` | - | 图标名称，如 `HomeOutlined`、`SettingFilled` |
| `value` | `ValueBinding` | - | 动态绑定图标名称，优先级高于 `icon` |
| `spin` | `boolean` | `false` | 是否开启旋转动画 |
| `rotate` | `number` | - | 静态旋转角度（单位：度） |

## 完整示例

```json
[
  {
    "id": "icon-container",
    "component": "flex",
    "gap": 16,
    "align": "center",
    "children": ["icon-basic", "icon-large-red", "icon-spinning", "icon-rotated"]
  },
  {
    "id": "icon-basic",
    "component": "icon",
    "icon": "HomeOutlined"
  },
  {
    "id": "icon-large-red",
    "component": "icon",
    "icon": "HeartFilled",
    "style": { "color": "#ff4d4f", "fontSize": "32px" }
  },
  {
    "id": "icon-spinning",
    "component": "icon",
    "icon": "LoadingOutlined",
    "style": { "color": "#1890ff" },
    "spin": true
  },
  {
    "id": "icon-rotated",
    "component": "icon",
    "icon": "ArrowUpOutlined",
    "rotate": 45
  }
]
```

## 常见问题

**Q: 填了图标名字但显示 `Icon xxx not found`？**
检查名称拼写是否正确（大驼峰），且必须带后缀：`Outlined`（线框）、`Filled`（实底）或 `TwoTone`（双色）。例如不存在 `Home`，正确的是 `HomeOutlined`。

**Q: 图标组件支持点击事件 `on_tap` 吗？**
`icon` 是纯展示组件，不支持 `on_tap`。需要可点击图标时，将 `icon` 放入 `button` 组件（设置 `type: "text"`），利用 `button` 的 `on_tap` 处理点击。

**Q: 怎么控制图标的颜色和大小？**
通过 `style` 属性设置 `color` 和 `fontSize`，例如 `"style": { "color": "#52c41a", "fontSize": "24px" }`。
