# steps 步骤条组件
功能丰富的步骤条组件，用于引导用户按照流程完成任务（如多步表单、向导页面等）。

## 适用场景
- 多步表单向导，支持点击步骤条快速跳转
- 展示带有详细说明或副标题的业务流转过程
- 作为顶部页签式导航使用（`type: "navigation"`）
- 点状步骤条展示简洁进度

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| items | `StepItem[]` | - | 步骤数据项，每项支持 `title`、`description`、`subTitle`、`icon`、`disabled` |
| current | `ValueBinding` | - | 绑定当前步骤索引（从 0 开始），通过 `path` 双向绑定 |
| direction | `string` | `"horizontal"` | 排列方向，`"horizontal"` 或 `"vertical"` |
| type | `string` | `"default"` | 样式类型，`"default"` / `"navigation"` / `"inline"` |
| status | `string` | - | 当前步骤状态，`"wait"` / `"process"` / `"finish"` / `"error"` |

## 完整示例
```json
{
  "id": "full-steps-demo",
  "component": "steps",
  "progressDot": true,
  "size": "small",
  "current": { "path": "/flow/activeIndex" },
  "status": "${/flow/hasError ? 'error' : 'process'}",
  "items": [
    { "title": "登录", "description": "验证身份信息" },
    { "title": "支付", "description": "选择支付方式" },
    { "title": "发货", "description": "等待物流揽收" },
    { "title": "完成" }
  ]
}
```

## 常见问题

**Q: 为什么点击步骤条没有反应？**
必须配置 `current.path` 绑定一个全局状态变量，组件才能将点击的新索引回写。没有绑定路径时组件是只读的。

**Q: `steps` 和 `stepindicator` 有什么区别？**
`stepindicator` 是轻量级纯展示组件，不支持点击交互。`steps` 是全功能组件，支持双向绑定、丰富图文排版和多种视觉风格。

**Q: 如何让某个步骤显示为红色错误状态？**
通过插值表达式动态控制 `status`：`"status": "${/isStep3Error ? 'error' : 'process'}"`。
