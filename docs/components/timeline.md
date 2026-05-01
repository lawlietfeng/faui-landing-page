# timeline 时间轴组件
垂直展示带有时间顺序的信息或步骤，支持静态配置、动态数据绑定以及子组件嵌套。

## 适用场景
- 展示操作日志、审批流转历史等按时间排序的事件
- 展示任务的当前状态以及过往变更记录
- 在紧凑空间内展示一系列有先后顺序的动态信息

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| items | `TimelineItemType[]` | - | 节点数组，每项支持 `content`、`label`、`color`、`position` |
| data | `ValueBinding` | - | 动态绑定数据源，优先于 `items` |
| mode | `string` | `"left"` | 展示模式：`"left"` / `"right"` / `"alternate"` |
| pending | `boolean \| string` | `false` | 是否显示幽灵节点（表示进行中） |
| reverse | `boolean` | `false` | 是否倒序排列节点 |

## 完整示例
```json
[
  {
    "id": "root_box",
    "type": "element",
    "config": {
      "component": "box",
      "children": ["timeline_view"]
    }
  },
  {
    "id": "timeline_view",
    "type": "element",
    "config": {
      "component": "timeline",
      "mode": "alternate",
      "reverse": true,
      "pending": "等待最新更新...",
      "items": [
        {
          "content": "初始化项目",
          "label": "2023-01-01",
          "color": "green"
        },
        {
          "content": "发布 V1.0 版本",
          "label": "2023-06-01",
          "color": "blue"
        },
        {
          "content": "修复已知缺陷",
          "label": "2023-06-15",
          "color": "red"
        }
      ]
    }
  }
]
```

## 常见问题

**Q: 配置了 `items` 但没有显示任何节点？**
检查是否同时配置了 `data.path`，如果其指向的数据为空数组或未初始化，会覆盖静态 `items`。确保每个 item 至少包含 `content` 属性。

**Q: 如何在节点内部放置按钮或图片？**
静态 `items` 仅支持纯文本。如需渲染复杂组件，改用 `children` 数组，将组件 ID 放入其中。

**Q: `mode="alternate"` 时节点左右位置没有生效？**
交替模式下组件自动计算位置。如需手动干预，在具体节点中添加 `position: "left"` 或 `position: "right"`（仅 `alternate` 模式生效）。
