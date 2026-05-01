# tour 漫游导览组件
分步骤引导用户了解产品各项功能，适用于新功能上线或新手引导场景。

## 适用场景
- 新用户首次进入复杂系统时逐步引导核心功能
- 新功能发布时突出展示并介绍新特性
- 复杂表单中为用户提供渐进式的填表指导

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| steps | `TourStepConfig[]` | `[]` | **必填**，每步包含 `title`、`description`、`target`（CSS 选择器）、`placement` |
| open | `boolean \| ValueBinding` | `false` | 控制导览是否弹出，支持双向绑定 |
| current | `ValueBinding` | - | 绑定当前步数（从 0 开始），通过 `path` 绑定 |
| type | `string` | `"default"` | 卡片样式，`"default"` 或 `"primary"` |
| mask | `boolean \| object` | `true` | 是否启用遮罩 |

## 完整示例
```json
[
  {
    "id": "start_btn",
    "type": "element",
    "config": {
      "component": "button",
      "label": "开始新手引导",
      "on_tap": [
        { "action": "update_data", "payload": { "path": "/tour/open", "value": true } },
        { "action": "update_data", "payload": { "path": "/tour/current", "value": 0 } }
      ]
    }
  },
  {
    "id": "system_tour",
    "type": "element",
    "config": {
      "component": "tour",
      "open": { "path": "/tour/open" },
      "current": { "path": "/tour/current" },
      "steps": [
        {
          "title": "功能一",
          "description": "这是系统的核心功能区域。",
          "target": ".tour-target-1"
        },
        {
          "title": "功能二",
          "description": "在这里可以查看您的所有数据报表。",
          "target": ".tour-target-2"
        }
      ]
    }
  }
]
```

## 常见问题

**Q: 导览卡片弹出来了，但没有指向任何元素，显示在页面正中间？**
检查 `steps` 中的 `target` 选择器是否正确，且目标元素在 DOM 中真实存在并可见。隐藏或未渲染的元素会导致卡片退化到屏幕中央。

**Q: 点击"下一步"或"关闭"没有反应？**
检查是否正确配置了 `open.path` 和 `current.path`。组件是受控的，引擎需要知道把状态写回到哪里。

**Q: 导览能跨页面引导吗？**
不能直接跨页面。`target` 基于当前页面 DOM 查询。跨页面时需要拆分为独立的 `tour` 配置，在路由跳转后重新触发。
