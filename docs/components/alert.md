# Alert 警告提示组件

`alert` 组件用于向用户显示警告或重要的提示信息。

## 适用场景

- 页面顶部的重要通知
- 表单提交后的成功/失败提示
- 操作过程中的警告信息

## 核心属性

### message / title / content（提示内容）
Alert 的主要提示内容。这三个属性都映射为主要信息，推荐使用 `message`。

```json
{
  "id": "info-alert",
  "component": "alert",
  "message": "这是一条普通的提示信息",
  "status": "info"
}
```

### description（辅助性文字）
警告提示的辅助性文字介绍，用于详细说明。

```json
{
  "id": "detail-alert",
  "component": "alert",
  "message": "操作失败",
  "description": "由于网络原因，数据提交失败，请稍后重试。",
  "status": "error"
}
```

### status（状态类型）
指定警告提示的样式类型，支持四种状态：`success`、`info`、`warning`、`error`。默认值为 `info`。

### showIcon（是否显示图标）
布尔值，是否显示状态对应的图标。默认为 `true`。

## 完整示例

```json
[
  {
    "id": "success-alert",
    "component": "alert",
    "message": "保存成功",
    "description": "您的修改已成功保存至服务器。",
    "status": "success",
    "showIcon": true,
    "style": {
      "marginBottom": "16px"
    }
  },
  {
    "id": "warning-alert",
    "component": "alert",
    "message": "系统维护通知",
    "status": "warning",
    "showIcon": true
  }
]
```
## 新手常见问题

**Q: 提示图标没有显示？**
- 检查 `showIcon` 属性是否被设置为 `false`。默认为 `true`。

**Q: 如何让 Alert 占满整行？**
- `alert` 默认是块级元素，会自动占满父容器的宽度。如果需要调整，可以通过 `style` 属性设置 `width`。
