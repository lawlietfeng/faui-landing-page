# segmented 分段控制器组件
`segmented` 用于展示多个选项并允许用户选择其中单项，常用于视图切换或轻量级分类筛选。

## 适用场景
- 切换列表视图与卡片视图、深色与浅色模式
- "按日"、"按周"、"按月"的时间维度数据筛选
- 代替选项卡（`tabs`）用于局部类别过滤
- 表单中需要现代化滑块动画的单选控件

## 核心属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `value` | `ValueBinding` | - | 双向绑定当前选中值 |
| `options` | `Array \| string` | - | 选项数据，支持字符串数组或对象数组 |
| `block` | `boolean` | `false` | 是否撑满父元素宽度 |
| `size` | `'large' \| 'middle' \| 'small'` | `'middle'` | 控件大小 |
| `on_change` | `ActionConfig` | - | 选中项变化时的回调动作 |

## 完整示例

```json
{
  "component": "segmented",
  "id": "segment-complex",
  "disabled": "${$root.app.isLocked}",
  "options": [
    { "label": "List", "value": "list" },
    { "label": "Kanban", "value": "kanban" }
  ],
  "value": {
    "path": "/view/mode"
  },
  "rules": [
    {
      "required": true,
      "message": "请选择一种视图模式"
    }
  ],
  "on_change": [
    {
      "action": "update_data",
      "path": "/view/mode",
      "value": "${value}"
    },
    {
      "action": "console_log",
      "payload": {
        "content": "用户切换了视图模式为：${value}"
      }
    }
  ]
}
```

## 常见问题

**Q: `segmented` 和 `radio` 有什么区别？**
`segmented` 有滑块平移动画，更适合视图/模式切换；`radio` 是传统圆形单选按钮，更适合表单中的具体数据录入项（如性别、支付方式）。

**Q: `options` 对象里配置了 `icon` 但不显示？**
图标支持取决于引擎版本是否集成了图标解析能力。如无法渲染，建议仅使用 `label`。

**Q: 宽度不跟随内容变化？**
尝试开启 `block: true` 让组件等分撑满父容器，或检查父容器的 `width` 设置。
