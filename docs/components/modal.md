# modal 模态对话框组件
`modal` 用于在当前页面打开一个浮层，承载需要用户集中注意力处理的操作。

## 适用场景
- 新建/编辑数据，提交复杂的表单
- 删除警告、二次确认、重要操作提示
- 展示详情文本、图表、日志等内容
- 需要用户集中注意力而不离开当前页面的场景

## 核心属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `open.path` | `string` | - | **必填**，绑定弹窗显隐状态（`boolean`） |
| `title` | `string` | - | 弹窗标题，支持表达式 |
| `width` | `string \| number` | `520` | 弹窗宽度 |
| `footer` | `boolean \| null` | - | 设为 `false` 可隐藏底部按钮 |
| `on_ok` | `ActionConfig` | - | 点击"确定"的回调动作 |

## 完整示例

```json
[
  {
    "type": "ACTIVITY_SNAPSHOT",
    "content": {
      "dataModel": {
        "modalVisible": false
      },
      "components": [
        {
          "id": "open-btn",
          "component": "button",
          "label": "新建任务",
          "on_tap": [{ "action": "update_data", "path": "/modalVisible", "value": true }]
        },
        {
          "id": "task-modal",
          "component": "modal",
          "title": "新建任务",
          "width": 600,
          "maskClosable": false,
          "destroyOnHidden": true,
          "open": { "path": "/modalVisible" },
          "children": ["task-form"],
          "on_ok": [
            { "action": "message", "payload": { "type": "success", "content": "任务创建成功" } },
            { "action": "update_data", "path": "/modalVisible", "value": false }
          ]
        },
        {
          "id": "task-form",
          "component": "form",
          "children": ["title-input"]
        },
        {
          "id": "title-input",
          "component": "input",
          "placeholder": "请输入任务标题",
          "value": { "path": "/form/title" }
        }
      ]
    }
  }
]
```

## 常见问题

**Q: 点击"确定"按钮，弹窗没有关闭？**
配置了 `on_ok` 后，自动关闭的 fallback 不再执行。必须在 `on_ok` 动作列表末尾手动添加 `update_data` 将 `open.path` 设为 `false`。

**Q: 怎么隐藏底部的"取消/确定"按钮？**
配置 `"footer": false` 即可隐藏底部区域，然后在 `children` 中放入自定义按钮。

**Q: 第二次打开弹窗时上次的表单数据还在？**
配置 `"destroyOnHidden": true"` 可在关闭时销毁内部节点。如需彻底清空状态，还需在关闭时清空表单绑定的数据源。
