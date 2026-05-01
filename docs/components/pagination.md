# pagination 分页组件
`pagination` 用于分页形式分隔长列表数据，每次只加载一个页面，通常与 `table` 或 `list` 组件配合使用。

## 适用场景
- 将大量数据切分为多页进行展示
- 配合后端接口按页码和每页条数请求局部数据
- 作为 `table` 或 `list` 组件的底部翻页控件

## 核心属性

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `current` | `ValueBinding` | - | **必填**，当前页数，通过 `path` 绑定 |
| `pageSize` | `ValueBinding` | - | **必填**，每页条数，通过 `path` 绑定 |
| `total` | `number \| string` | `0` | 数据总条数，支持表达式 |
| `align` | `'start' \| 'center' \| 'end'` | `'start'` | 水平对齐方式 |
| `showSizeChanger` | `boolean` | `false` | 是否展示每页条数切换器 |

## 完整示例

```json
{
  "component": "pagination",
  "id": "pagination-complex",
  "current": { "path": "/page/current" },
  "pageSize": { "path": "/page/pageSize" },
  "total": "${$root.totalCount}",
  "align": "end",
  "showSizeChanger": true,
  "showQuickJumper": true,
  "showTotal": "总计 ${total} 条记录",
  "on_change": {
    "action": "http_proxy",
    "payload": {
      "http_config": {
        "url": "/api/fetchData",
        "method": "POST"
      }
    }
  }
}
```

## 常见问题

**Q: 点击下一页，页码没有变化？**
`pagination` 依赖 `current` 和 `pageSize` 绑定的全局状态。请确保配置了正确的 `current.path` 和 `pageSize.path`，否则状态无法更新。

**Q: `showTotal` 报错 `total is not defined`？**
`showTotal` 是特殊的懒求值模板字符串，由组件内部注入 `total` 和 `range` 变量。直接写 `"共 ${total} 条"` 即可，不要在其他地方解析此字符串。

**Q: `on_change` 里拿到的还是旧页码？**
引擎会优先自动回写最新的 `current` 和 `pageSize`，并注入到 `on_change` 的 `payload` 中。可通过 `${$root.page.current}` 读取最新值。
