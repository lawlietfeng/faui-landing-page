# Progress 进度条组件

`progress` 组件用于展示操作或任务的当前进度。

## 适用场景

- 文件上传、下载时的进度展示
- 表单完成度、资料完善度提示
- 数据处理任务的进度反馈

## 核心属性

### percent（百分比）
数字类型，设置进度条的当前百分比，取值范围为 `0` 到 `100`。默认为 `0`。

```json
{
  "id": "upload-progress",
  "component": "progress",
  "percent": 45
}
```

### status（状态）
设置进度条的状态，可选值为 `success`（成功）、`exception` 或 `error`（失败）、`normal`（正常）、`active`（进行中动画）。

```json
{
  "id": "error-progress",
  "component": "progress",
  "percent": 80,
  "status": "error"
}
```

### size（尺寸）
设置进度条的尺寸，可选值为 `default` 和 `small`。默认为 `default`。

## 完整示例

```json
[
  {
    "id": "normal-progress",
    "component": "progress",
    "percent": 30,
    "size": "default",
    "style": {
      "marginBottom": "16px"
    }
  },
  {
    "id": "active-progress",
    "component": "progress",
    "percent": 50,
    "status": "active",
    "style": {
      "marginBottom": "16px"
    }
  },
  {
    "id": "success-progress",
    "component": "progress",
    "percent": 100,
    "status": "success",
    "size": "small"
  }
]
```
## 新手常见问题

**Q: 进度条没有动画效果？**
- 只有当 `status` 设置为 `active` 时，进度条才会有流动动画效果。

**Q: 进度条支持自定义颜色吗？**
- 目前基础封装使用了 Ant Design 的默认状态色，如果需要特殊颜色可以尝试通过 `style` 覆盖或使用特定的 `status`。
