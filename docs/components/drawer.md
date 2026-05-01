# drawer 抽屉组件
从屏幕边缘滑出的浮层面板，用于在不离开当前页面的情况下展示额外信息、表单或操作面板。

## 适用场景
- 展示比弹窗更长或更复杂的详情信息
- 承载步骤较长或项数较多的表单录入任务
- 作为页面侧边配置面板，提供全局或局部设置项

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `open` | `boolean \| ValueBinding` | `false` | 是否可见，推荐使用 `{"path": "..."}` 绑定 |
| `title` | `string` | - | 抽屉标题，支持表达式 |
| `placement` | `string` | `'right'` | 滑出位置：`top` / `right` / `bottom` / `left` |
| `width` | `number \| string` | `378` | 宽度（`right`/`left` 时生效） |
| `height` | `number \| string` | `378` | 高度（`top`/`bottom` 时生效） |
| `on_close` | `ActionConfig[]` | - | 关闭时的回调动作 |

## 完整示例
按钮触发打开抽屉，抽屉展示内容并在关闭时提示：

```json
[
  {
    "id": "open-drawer-btn",
    "component": "button",
    "content": "打开抽屉",
    "type": "primary",
    "on_tap": [
      { "action": "update_data", "path": "/ui/drawer_visible", "value": true }
    ]
  },
  {
    "id": "demo-drawer",
    "component": "drawer",
    "title": "系统设置",
    "placement": "right",
    "width": 400,
    "maskClosable": false,
    "destroyOnHidden": true,
    "open": { "path": "/ui/drawer_visible" },
    "children": ["drawer-content-text"],
    "on_close": [
      {
        "action": "message",
        "payload": { "type": "info", "content": "抽屉已关闭" }
      }
    ]
  },
  {
    "id": "drawer-content-text",
    "component": "typography",
    "content": "这里是抽屉内部的配置项内容。"
  }
]
```

## 常见问题
**Q: 抽屉关不掉，点击遮罩或叉都没反应？**
检查 `open` 是否写死了布尔值 `true`。正确做法是使用 `{"path": "/xxx"}` 绑定全局数据状态，组件会自动回写 `false`。

**Q: extra 和 footer 可以放按钮组件吗？**
目前 `extra` 和 `footer` 仅支持字符串文本。复杂按钮组请作为 `children` 放在抽屉主体内容中。

**Q: 设置了 height 但从右边出来的抽屉高度没变？**
尺寸控制与滑出方向相关：`right`/`left` 时只能用 `width`，`top`/`bottom` 时只能用 `height`。
