# stepindicator 组件

`stepindicator` 是步骤指示器组件，用于展示流程进度，如入职流程、审批进度、购物流程等。

## 适用场景

- 多步骤表单的进度展示（步骤 1 → 步骤 2 → 步骤 3）
- 审批流程状态展示
- 订单处理流程展示
- 任何需要分步骤展示进度的场景

## 核心属性

### direction（排列方向）

| 值 | 效果 | 适用场景 |
|---|------|---------|
| `horizontal`（默认） | 水平排列 | 大部分场景，步骤不多于 5 个 |
| `vertical` | 垂直排列 | 步骤较多，或需要详细说明的场景 |

```json
{
  "id": "flow-steps",
  "component": "stepindicator",
  "direction": "horizontal"
}
```

### current（当前步骤）

表示当前进行到哪一步，索引从 0 开始：

- `0`：第一步
- `1`：第二步
- 以此类推...

```json
{
  "id": "flow-steps",
  "component": "stepindicator",
  "current": 1
}
```

**注意**：`current` 是静态配置。如果需要动态变化，可以将值绑定到 `dataModel`：

```json
{
  "id": "flow-steps",
  "component": "stepindicator",
  "current": { "path": "/currentStep" }
}
```

### steps（步骤数组）

定义每一步的标题和状态：

```json
{
  "id": "flow-steps",
  "component": "stepindicator",
  "steps": [
    { "id": "step1", "title": "提交申请", "status": "success" },
    { "id": "step2", "title": "部门审批", "status": "running" },
    { "id": "step3", "title": "完成", "status": "pending" }
  ]
}
```

**steps 数组中每个元素的属性**：

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | `string` | 是 | 步骤唯一标识 |
| `title` | `string` | 是 | 步骤显示标题 |
| `status` | `string` | 是 | 当前步骤状态 |

### status（步骤状态）

| 值 | 含义 | 显示效果 |
|---|------|---------|
| `success` | 已完成 | 绿色勾选 |
| `running` | 进行中 | 蓝色高亮/转圈 |
| `pending` | 待处理 | 灰色 |
| `error` | 失败/错误 | 红色 |

## 完整示例

### 基础步骤指示器（横向）

```json
{
  "id": "apply-steps",
  "component": "stepindicator",
  "direction": "horizontal",
  "current": 0,
  "steps": [
    { "id": "s1", "title": "填写信息", "status": "success" },
    { "id": "s2", "title": "上传材料", "status": "running" },
    { "id": "s3", "title": "等待审批", "status": "pending" },
    { "id": "s4", "title": "完成", "status": "pending" }
  ]
}
```

### 垂直步骤指示器

```json
{
  "id": "order-steps",
  "component": "stepindicator",
  "direction": "vertical",
  "current": 2,
  "steps": [
    { "id": "o1", "title": "下单成功", "status": "success" },
    { "id": "o2", "title": "支付完成", "status": "success" },
    { "id": "o3", "title": "商品发货", "status": "running" },
    { "id": "o4", "title": "确认收货", "status": "pending" }
  ]
}
```

### 动态 current（绑定数据）

```json
{
  "id": "dynamic-steps",
  "component": "stepindicator",
  "current": { "path": "/stepIndex" },
  "steps": [
    { "id": "s1", "title": "提交", "status": "success" },
    { "id": "s2", "title": "审批中", "status": "running" },
    { "id": "s3", "title": "完成", "status": "pending" }
  ]
}
```

假设 `dataModel.stepIndex = 1`，则"审批中"步骤会显示为当前进行中状态。

### 审批流程示例

```json
{
  "id": "approval-flow",
  "component": "box",
  "layout": "vertical",
  "spacing": 24,
  "children": ["flow-steps", "detail-box"]
},
{
  "id": "flow-steps",
  "component": "stepindicator",
  "direction": "horizontal",
  "current": 1,
  "steps": [
    { "id": "f1", "title": "提交申请", "status": "success" },
    { "id": "f2", "title": "主管审批", "status": "running" },
    { "id": "f3", "title": "HR复核", "status": "pending" },
    { "id": "f4", "title": "完成", "status": "pending" }
  ]
}
```

### 配合表单使用

```json
[
  {
    "id": "multi-step-form",
    "component": "box",
    "layout": "vertical",
    "spacing": 20,
    "children": ["steps", "current-step-content"]
  },
  {
    "id": "steps",
    "component": "stepindicator",
    "direction": "horizontal",
    "current": { "path": "/currentStep" },
    "steps": [
      { "id": "s1", "title": "基本信息", "status": "${currentStep >= 0 ? 'success' : 'pending'}" },
      { "id": "s2", "title": "上传材料", "status": "${currentStep >= 1 ? 'success' : 'pending'}" },
      { "id": "s3", "title": "确认提交", "status": "${currentStep >= 2 ? 'success' : 'pending'}" }
    ]
  },
  {
    "id": "current-step-content",
    "component": "box",
    "layout": "vertical",
    "children": ["step-form"]
  }
]
```

## 新手常见问题

**Q: 步骤标题太长显示不全？**
- 水平排列时建议每步标题不超过 4 个字。
- 可以用垂直排列（`direction: "vertical"`）展示更长的标题。

**Q: current 是数字 1，但显示的是第二步？**
- 这是正常的。索引从 0 开始，`current: 1` 表示"第二步"。

**Q: 想让 steps 的 status 也动态变化？**
- 目前 `steps` 数组的 `status` 支持表达式语法。
- 可以用三元表达式根据 `currentStep` 判断每个步骤的状态。

**Q: 步骤之间需要显示连接线？**
- 目前组件默认显示连接线。
- 如果想去掉连接线，可以检查是否有 `show_connector` 属性可配置。

**Q: 步骤需要显示序号（1、2、3）而不是图标？**
- 可以尝试 `show_number: true` 配置。
- 如果不支持，可以在 `title` 中手动加上序号，如 `"1. 基本信息"`。

**Q: 步骤指示器是只读的吗？**
- 是的，`stepindicator` 是纯展示组件，用于显示进度。
- 点击切换步骤等交互需要自己在外部通过 `on_tap` 更新 `current` 值来实现。
