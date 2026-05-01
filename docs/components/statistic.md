# statistic 统计数值组件
用于突出展示重要数据或提供倒计时功能。

## 适用场景
- 数据看板展示核心业务指标（总用户数、今日营收等）
- 电商秒杀、验证码重发等倒计时场景
- 带有正负趋势样式的指标展示
- 结合 `card` 和 `grid` 组件构建数据大屏

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| title | `string` | - | 数值的标题 |
| content | `number \| string` | - | 静态展示的数值（也可用 `value.path` 动态绑定） |
| precision | `number` | - | 数值精度，保留几位小数 |
| prefix / suffix | `string` | - | 数值的前缀（如 `¥`）或后缀（如 `%`） |
| isCountdown | `boolean` | `false` | 是否作为倒计时使用，值需为未来时间戳（毫秒） |

## 完整示例
```json
[
  {
    "id": "dashboard-grid",
    "component": "grid",
    "columns": 2,
    "gutter": 16,
    "children": ["card-1", "card-2"]
  },
  {
    "id": "card-1",
    "component": "card",
    "children": ["stat-sales"]
  },
  {
    "id": "stat-sales",
    "component": "statistic",
    "title": "今日销售额",
    "value": { "path": "/dashboard/todaySales" },
    "precision": 2,
    "prefix": "¥",
    "valueStyle": { "color": "#cf1322" }
  },
  {
    "id": "card-2",
    "component": "card",
    "children": ["stat-users"]
  },
  {
    "id": "stat-users",
    "component": "statistic",
    "title": "新增用户",
    "value": { "path": "/dashboard/newUsers" },
    "suffix": "人",
    "valueStyle": { "color": "#3f8600" }
  }
]
```

## 常见问题

**Q: 为什么倒计时一直是 00:00:00？**
倒计时模式要求传入未来的绝对时间戳（毫秒级），而不是剩余毫秒数。如果时间戳早于当前时间，就会显示为 0。

**Q: 统计数值会自动添加千分位逗号吗？**
传入 `number` 类型时会自动处理千分位格式（如 `112,893`）。传入 `string` 则原样展示。

**Q: 倒计时支持天数显示吗？**
支持，修改 `format` 属性即可，例如 `"D 天 H 时 m 分 s 秒"`。
