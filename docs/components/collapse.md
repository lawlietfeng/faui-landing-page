# Collapse 折叠面板组件

`collapse` 组件用于将复杂区域进行折叠和展开，节省页面空间。

## 适用场景

- 对复杂表单进行分组折叠
- 常见问题（FAQ）列表
- 大段内容的分类展示

## 核心属性

### options（折叠面板数据）
定义每个折叠面板项的数据，数组中的每一项包含 `value`（唯一标识）、`label`（面板标题）和 `children`（面板内部包含组件的 id 数组）。

```json
{
  "id": "faq-collapse",
  "component": "collapse",
  "options": [
    {
      "value": "panel-1",
      "label": "如何重置密码？",
      "children": ["reset-pwd-text"]
    },
    {
      "value": "panel-2",
      "label": "如何联系客服？",
      "children": ["contact-text"]
    }
  ]
}
```

### bordered（带边框风格）
布尔值，设置折叠面板是否有边框。默认为 `true`。

## 完整示例

```json
[
  {
    "id": "settings-collapse",
    "component": "collapse",
    "bordered": true,
    "options": [
      {
        "value": "basic",
        "label": "基础设置",
        "children": ["username-input", "email-input"]
      },
      {
        "value": "advanced",
        "label": "高级设置",
        "children": ["theme-select"]
      }
    ]
  },
  {
    "id": "username-input",
    "component": "input",
    "label": "用户名"
  },
  {
    "id": "email-input",
    "component": "input",
    "label": "邮箱"
  },
  {
    "id": "theme-select",
    "component": "select",
    "label": "系统主题",
    "options": [
      { "label": "明亮", "value": "light" },
      { "label": "暗黑", "value": "dark" }
    ]
  }
]
```
## 新手常见问题

**Q: 如何设置默认展开的面板？**
- 目前基础封装中暂未暴露默认展开属性，如需支持可以在外层传入或联系开发者扩展 `defaultActiveKey`。

**Q: 面板内部可以嵌套表单吗？**
- 可以的，在 `children` 中引用 `form` 或 `input` 组件的 id 即可实现复杂的表单分组展示。
