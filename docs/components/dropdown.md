# dropdown 下拉菜单组件
向下弹出的列表，用于收纳并折叠操作元素，保持界面整洁。

## 适用场景
- 表格操作列、卡片右上角收纳"编辑、分享、删除"等次要操作
- 顶部导航栏悬停或点击展示个人中心菜单
- 代替拥挤的平铺按钮组，提供更多选项

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `items` | `DropdownMenuItem[]` | `[]` | 菜单项配置（含 key、label、disabled、danger 等） |
| `trigger` | `Array<'click' \| 'hover'>` | `['hover']` | 触发下拉的行为方式 |
| `placement` | `string` | `'bottomLeft'` | 菜单弹出位置 |
| `on_menu_click` | `ActionConfig[]` | - | 点击菜单项回调，注入 `${key}` |
| `arrow` | `boolean` | `false` | 是否显示指向触发元素的箭头 |

## 完整示例
包含图标、危险操作、触发按钮及点击反馈的完整下拉菜单：

```json
[
  { "id": "icon-user", "component": "icon", "icon": "UserOutlined" },
  { "id": "icon-logout", "component": "icon", "icon": "LogoutOutlined" },
  { "id": "trigger-btn", "component": "button", "content": "个人中心" },
  {
    "id": "complex-dropdown",
    "component": "dropdown",
    "trigger": ["click"],
    "arrow": true,
    "placement": "bottom",
    "items": [
      { "key": "profile", "label": "个人资料", "icon": "icon-user" },
      { "type": "divider" },
      { "key": "logout", "label": "退出登录", "danger": true, "icon": "icon-logout" }
    ],
    "on_menu_click": [
      {
        "action": "message",
        "payload": { "type": "info", "content": "即将执行操作: ${key}" }
      }
    ],
    "children": ["trigger-btn"]
  }
]
```

## 常见问题
**Q: 下拉菜单没有显示出来？**
检查 `children` 是否为空。下拉菜单必须包裹一个触发元素（如 `button`），用户交互该元素时菜单才会弹出。

**Q: 点击菜单没反应，怎么知道点了哪一项？**
必须配置 `on_menu_click`，通过 `${key}` 获取被点击项的 key 值，再据此派发请求或更新状态。

**Q: 菜单里的 icon 可以直接写组件配置吗？**
不可以。`icon` 字段只接受字符串（即在别处定义的 `icon` 组件的 `id`），渲染时会从全局组件表中查找。
