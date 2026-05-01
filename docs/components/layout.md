# layout 布局组件
`layout` 及配套的 `header`、`sider`、`content`、`footer` 组件，用于构建页面级的整体骨架布局。

## 适用场景
- 管理后台页面：左侧菜单栏 + 顶部导航栏 + 中间内容区
- 快速搭建全屏的圣杯布局、双飞翼布局
- 需要侧边栏展开/收起功能的页面结构
- 经典的"上中下"或"左右侧边栏"网页结构

## 核心属性

### layout（主容器）

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `children` | `string[]` | `[]` | 子组件 ID，放置 `header`/`sider`/`content`/`footer` |
| `hasSider` | `boolean` | - | 标明是否包含 `sider`，出现闪烁时手动设为 `true` |

### sider（侧边栏）

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `width` | `number \| string` | `200` | 展开时的宽度 |
| `collapsible` | `boolean` | `false` | 是否开启折叠功能 |
| `theme` | `string` | `"dark"` | 主题颜色：`"light"` 或 `"dark"` |
| `value.path` | `string` | - | 双向绑定折叠状态（`boolean`） |

## 完整示例

```json
[
  {
    "id": "root-layout",
    "component": "layout",
    "style": { "height": "100vh" },
    "children": ["app-sider", "main-layout"]
  },
  {
    "id": "app-sider",
    "component": "sider",
    "collapsible": true,
    "theme": "dark",
    "value": { "path": "/isCollapsed" },
    "children": ["logo-image"]
  },
  {
    "id": "main-layout",
    "component": "layout",
    "children": ["app-header", "app-content", "app-footer"]
  },
  {
    "id": "app-header",
    "component": "header",
    "style": { "background": "#fff" },
    "children": ["user-info-text"]
  },
  {
    "id": "app-content",
    "component": "content",
    "style": { "margin": "24px", "background": "#fff", "padding": "24px" },
    "children": ["page-body-box"]
  },
  {
    "id": "app-footer",
    "component": "footer",
    "style": { "textAlign": "center" },
    "children": ["copyright-text"]
  }
]
```

## 常见问题

**Q: 布局撑不满全屏，底部留有大片空白？**
最外层 `layout` 高度由内容撑开。需全屏时请配置 `style: { "height": "100vh" }`。

**Q: 点击 sider 折叠按钮没有反应？**
`collapsible: true` 只开启折叠功能，必须配合 `value.path` 绑定一个布尔状态才能正常响应。

**Q: header/content/footer 的 style 表达式不生效？**
`layout` 及附属容器已开启表达式解析。如果子组件插值不生效，请查阅对应子组件的文档。
