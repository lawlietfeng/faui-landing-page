# colorpicker 组件

`colorpicker` 是颜色选择器组件，用于选择颜色的场景，如主题色、品牌色、标签颜色等。

## 适用场景

- 主题定制（选择 APP 主题色）
- 品牌色彩配置
- 图表/标签的颜色设置
- 任何需要用户选择颜色的场景

## 核心属性

### value.path（数据绑定）

绑定到 `dataModel` 中的颜色值字段，通常是十六进制颜色格式：

```json
{
  "id": "theme-color",
  "component": "colorpicker",
  "value": { "path": "/themeColor" }
}
```

假设 `dataModel.themeColor = "#1677ff"`，颜色选择器会显示该颜色。

### on_change（值变化事件）

**必须配置**：

```json
{
  "id": "theme-color",
  "component": "colorpicker",
  "value": { "path": "/themeColor" },
  "on_change": { "action": "update_data", "path": "/themeColor", "value": "${value}" }
}
```

`${value}` 是选中颜色的十六进制值，如 `"#1677ff"`。

### rules（校验规则）

```json
{
  "id": "theme-color",
  "component": "colorpicker",
  "rules": [
    { "required": true, "message": "请选择主题色" },
    { "pattern": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$", "message": "颜色必须是有效的十六进制值" }
  ]
}
```

### validateTrigger（触发校验时机）

```json
{
  "id": "theme-color",
  "component": "colorpicker",
  "validateTrigger": "onChange"
}
```

## 完整示例

### 基础颜色选择器

```json
{
  "id": "theme-color",
  "component": "colorpicker",
  "value": { "path": "/themeColor" },
  "rules": [{ "required": true, "message": "请选择主题色" }],
  "on_change": { "action": "update_data", "path": "/themeColor", "value": "${value}" }
}
```

### 带预设颜色的选择器

如果需要预设颜色，可以通过 `options` 配置预设色板：

```json
{
  "id": "brand-color",
  "component": "colorpicker",
  "value": { "path": "/brandColor" },
  "on_change": { "action": "update_data", "path": "/brandColor", "value": "${value}" }
}
```

### 配合文本显示当前颜色

```json
[
  {
    "id": "color-section",
    "component": "box",
    "layout": "horizontal",
    "spacing": 12,
    "align": "center",
    "children": ["color-picker", "color-preview"]
  },
  {
    "id": "color-picker",
    "component": "colorpicker",
    "value": { "path": "/accentColor" },
    "on_change": { "action": "update_data", "path": "/accentColor", "value": "${value}" }
  },
  {
    "id": "color-preview",
    "component": "text",
    "content": "${$root.accentColor || '#ffffff'}",
    "style": {
      "fontFamily": "monospace",
      "background": "${$root.accentColor || '#ffffff'}",
      "padding": "4px 8px",
      "borderRadius": "4px"
    }
  }
]
```

### 在表单中使用

```json
[
  {
    "id": "theme-form",
    "component": "form",
    "submitButtonId": "submit-btn",
    "children": ["title-input", "color-picker", "submit-btn"]
  },
  {
    "id": "title-input",
    "component": "input",
    "placeholder": "请输入页面标题",
    "value": { "path": "/title" },
    "rules": [{ "required": true, "message": "请输入标题" }],
    "on_change": { "action": "update_data", "path": "/title", "value": "${value}" }
  },
  {
    "id": "color-picker",
    "component": "colorpicker",
    "value": { "path": "/pageColor" },
    "rules": [{ "required": true, "message": "请选择页面主色调" }],
    "on_change": { "action": "update_data", "path": "/pageColor", "value": "${value}" }
  },
  {
    "id": "submit-btn",
    "component": "button",
    "label": "保存设置",
    "on_tap": [
      { "action": "http_proxy", "payload": { "http_config": { "method": "POST", "path": "/api/theme" } } }
    ]
  }
]
```

## 新手常见问题

**Q: 选择的颜色值是什么格式？**
- 默认是十六进制格式，如 `"#1677ff"`、`"#fff"`。

**Q: 如何设置默认颜色？**
- 在 `dataModel` 中设置初始值：
```json
{
  "dataModel": {
    "themeColor": "#1890ff"
  }
}
```

**Q: 选择颜色后如何应用到其他组件？**
- 可以用 `style` 中的颜色属性绑定到同一个 `dataModel` 字段：
```json
{
  "id": "title",
  "component": "text",
  "content": "标题文字",
  "style": { "color": "${$root.themeColor}" }
}
```

**Q: 想支持 RGBA 格式（带透明度）？**
- 目前 `colorpicker` 默认支持十六进制颜色。
- 如需透明度支持，可能需要扩展配置或使用自定义组件。

**Q: 校验时提示"颜色必须是有效的十六进制值"？**
- 这说明 `rules` 中配置了 `pattern` 正则校验。
- 如果颜色值格式正常但仍然失败，检查 `dataModel` 中的初始值是否为空或格式不正确。

**Q: 为什么使用 `field` 属性而不是 `value.path`？**
- 两者可以二选一使用：
  - `value: { "path": "/xxx" }`：推荐写法，明确指定数据路径
  - `field: "xxx"`：简写形式，会自动转换为 `value: { "path": "/xxx" }`
