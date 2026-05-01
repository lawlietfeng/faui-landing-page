# menu 导航菜单组件
`menu` 是导航菜单组件，支持水平、垂直、内联三种模式，支持多级子菜单和分组。

## 适用场景
- 后台管理系统的左侧主菜单（侧边导航）
- 官网、企业门户的顶部栏目切换（顶部导航）
- 分类筛选或设置页面的标签切换（内联菜单）
- 配合 `layout` 中的 `sider` 或 `header` 使用

## 核心属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `MenuItemConfig[]` | `[]` | 菜单项配置列表 |
| `mode` | `'vertical' \| 'horizontal' \| 'inline'` | `'inline'` | 布局模式 |
| `theme` | `'light' \| 'dark'` | `'light'` | 主题颜色 |
| `selectedKeys.path` | `string` | - | 绑定选中状态，值为 `string[]` |
| `openKeys.path` | `string` | - | 绑定展开状态，值为 `string[]` |

### items 子项结构

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `key` | `string` | **必填**，唯一标志 |
| `label` | `string` | 标题文字，支持表达式 |
| `icon` | `string` | 图标名，如 `"UserOutlined"` |
| `children` | `MenuItemConfig[]` | 子菜单项 |

## 完整示例

```json
[
  {
    "type": "ACTIVITY_SNAPSHOT",
    "content": {
      "dataModel": {
        "activeMenus": ["user-list"],
        "openedMenus": ["user-manage"]
      },
      "components": [
        {
          "id": "sidebar-menu",
          "component": "menu",
          "mode": "inline",
          "theme": "dark",
          "selectedKeys": { "path": "/activeMenus" },
          "openKeys": { "path": "/openedMenus" },
          "items": [
            { "key": "dashboard", "label": "仪表盘", "icon": "DashboardOutlined" },
            {
              "key": "user-manage",
              "label": "用户管理",
              "icon": "UserOutlined",
              "children": [
                { "key": "user-list", "label": "用户列表" },
                { "key": "role-list", "label": "角色列表" }
              ]
            }
          ]
        }
      ]
    }
  }
]
```

## 常见问题

**Q: 菜单点击后没有高亮？**
`menu` 是受控组件，必须配置 `selectedKeys.path` 绑定一个数组（如 `["dashboard"]`）。不绑定则无法维持高亮状态。

**Q: `selectedKeys` 为什么必须是数组？**
Ant Design 底层设计决定了必须为数组格式。即使单选也要初始化为 `["home"]` 而非 `"home"`。

**Q: 图标不显示？**
检查 `icon` 字段的大驼峰拼写是否正确，如 `"SettingOutlined"` 而非 `"setting"`。
