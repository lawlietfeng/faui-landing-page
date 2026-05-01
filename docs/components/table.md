# table 组件

`table` 是表格组件，用于渲染结构化的表格数据，支持列定义、分页、边框、状态标签等功能。

## 适用场景

- 数据报表、统计表格
- 员工列表、商品列表
- 需要分页展示的列表数据
- 结构化数据（多列对齐）的展示

## 核心属性

### data.path（数据源路径）

指向 `dataModel` 中的数组字段：

```json
{
  "id": "employee-table",
  "component": "table",
  "data": { "path": "/employees" }
}
```

### columns（列定义）

`columns` 是一个数组，定义表格的列结构。每个列配置包含：

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `title` | `string` | 是 | 列头显示的文字 |
| `dataIndex` | `string` | 是 | 对应数据对象的字段名 |
| `template` | `string` | 否 | 单元格内容模板，支持表达式 |
| `renderAs` | `string` | 否 | 渲染类型：`text`/`checkbox`/`tag` |
| `statusColors` | `object` | 否 | `renderAs: "tag"` 时的颜色映射 |
| `width` | `string\|number` | 否 | 列宽度 |
| `align` | `string` | 否 | 文本对齐：`left`/`center`/`right` |

```json
{
  "id": "employee-table",
  "component": "table",
  "data": { "path": "/employees" },
  "columns": [
    { "title": "姓名", "dataIndex": "name" },
    { "title": "部门", "dataIndex": "department" }
  ]
}
```

### rowKey（行唯一键）

指定每一行的唯一标识字段，用于 React 列表渲染的 `key` 优化：

```json
{
  "id": "employee-table",
  "component": "table",
  "data": { "path": "/employees" },
  "rowKey": "id"
}
```

**建议**：每条数据都有唯一 `id` 字段时，设置为 `rowKey: "id"`。如果不设置，默认使用 `id` 字段。

### pagination（分页配置）

| 值 | 效果 |
|---|------|
| `false` | 关闭分页，显示所有数据 |
| `true` | 开启分页，使用默认配置 |
| `{ pageSize: 10 }` | 开启分页，每页 10 条 |

```json
{
  "id": "employee-table",
  "component": "table",
  "data": { "path": "/employees" },
  "pagination": { "pageSize": 10 }
}
```

### bordered（边框）

是否显示表格边框：

```json
{
  "id": "employee-table",
  "component": "table",
  "bordered": true
}
```

### tableSize（表格尺寸）

| 值 | 效果 |
|---|------|
| `small` | 紧凑尺寸 |
| `middle`（默认） | 中等尺寸 |
| `large` | 大尺寸 |

### emptyText（空数据提示）

当 `data.path` 对应的数组为空时显示的提示文字：

```json
{
  "id": "employee-table",
  "component": "table",
  "data": { "path": "/employees" },
  "emptyText": "暂无员工数据"
}
```

## columns 高级用法

### template（单元格模板）

使用模板字符串可以在单元格中拼接动态内容，支持三个上下文变量：

| 变量 | 含义 |
|------|------|
| `$root` | 整个页面的 `dataModel` |
| `$current` | 当前行数据对象 |
| `$parent` | 整个表格数据数组 |

```json
{
  "title": "月薪",
  "dataIndex": "salary",
  "template": "¥${$current.salary} / 月"
}
```

假设 `$current.salary` 为 `28000`，单元格显示：`¥28000 / 月`

### renderAs（渲染类型）

**1. text（默认）**：普通文本渲染

```json
{
  "title": "姓名",
  "dataIndex": "name",
  "renderAs": "text"
}
```

**2. checkbox**：布尔值渲染为复选框

```json
{
  "title": "已入职",
  "dataIndex": "onboarded",
  "renderAs": "checkbox"
}
```

适用于布尔类型字段，显示为只读复选框（勾选/未勾选）。

**3. tag**：状态标签渲染

```json
{
  "title": "状态",
  "dataIndex": "status",
  "renderAs": "tag",
  "statusColors": {
    "在职": "green",
    "试用": "gold",
    "离职": "red"
  }
}
```

`statusColors` 是一个对象，键是状态值，值是 Ant Design Tag 的颜色。

### 完整 columns 示例

```json
"columns": [
  { "title": "ID", "dataIndex": "id", "width": 80 },
  { "title": "姓名", "dataIndex": "name", "width": 120 },
  { "title": "部门", "dataIndex": "department" },
  { "title": "已入职", "dataIndex": "onboarded", "renderAs": "checkbox" },
  {
    "title": "状态",
    "dataIndex": "status",
    "renderAs": "tag",
    "statusColors": {
      "在职": "green",
      "试用": "gold",
      "离职": "red"
    }
  },
  {
    "title": "月薪",
    "dataIndex": "salary",
    "template": "¥${$current.salary.toLocaleString()}",
    "align": "right"
  },
  {
    "title": "操作",
    "dataIndex": "action",
    "template": "<button>编辑</button>"
  }
]
```

## 完整示例

### 员工信息表

```json
{
  "id": "employee-table",
  "component": "table",
  "data": { "path": "/employees" },
  "rowKey": "id",
  "pagination": { "pageSize": 10 },
  "bordered": true,
  "tableSize": "middle",
  "emptyText": "暂无员工数据",
  "columns": [
    { "title": "姓名", "dataIndex": "name", "width": 120 },
    { "title": "部门", "dataIndex": "department" },
    { "title": "岗位", "dataIndex": "position" },
    {
      "title": "状态",
      "dataIndex": "status",
      "renderAs": "tag",
      "statusColors": {
        "在职": "green",
        "试用": "gold",
        "实习": "blue",
        "离职": "red"
      }
    },
    {
      "title": "入职日期",
      "dataIndex": "onboardDate",
      "template": "${$current.onboardDate || '-'}"
    }
  ]
}
```

对应 `dataModel`：

```json
{
  "employees": [
    { "id": "e1", "name": "王欣", "department": "研发部", "position": "前端工程师", "status": "在职", "onboardDate": "2022-01-15" },
    { "id": "e2", "name": "李楠", "department": "产品部", "position": "产品经理", "status": "试用", "onboardDate": "2024-03-01" },
    { "id": "e3", "name": "张伟", "department": "设计部", "position": "UI设计师", "status": "在职", "onboardDate": "2021-06-20" }
  ]
}
```

### 订单列表

```json
{
  "id": "order-table",
  "component": "table",
  "data": { "path": "/orders" },
  "rowKey": "orderId",
  "pagination": { "pageSize": 20 },
  "columns": [
    { "title": "订单号", "dataIndex": "orderId", "width": 160 },
    { "title": "商品", "dataIndex": "productName" },
    { "title": "数量", "dataIndex": "quantity", "align": "center" },
    {
      "title": "金额",
      "dataIndex": "amount",
      "template": "¥${$current.amount.toFixed(2)}",
      "align": "right"
    },
    {
      "title": "状态",
      "dataIndex": "status",
      "renderAs": "tag",
      "statusColors": {
        "待支付": "orange",
        "已支付": "green",
        "已取消": "red",
        "已完成": "blue"
      }
    },
    { "title": "下单时间", "dataIndex": "createTime" }
  ]
}
```

### 带模板拼接的表格

```json
{
  "id": "salary-table",
  "component": "table",
  "data": { "path": "/salaries" },
  "columns": [
    { "title": "员工", "dataIndex": "name" },
    {
      "title": "收入明细",
      "dataIndex": "income",
      "template": "基本¥${$current.baseSalary} + 绩效¥${$current.bonus}"
    },
    {
      "title": "备注",
      "dataIndex": "remark",
      "template": "${$current.remark || '无'}"
    }
  ]
}
```

## 与 list 的选择

| 场景 | 推荐组件 |
|------|---------|
| 表格形式（列对齐） | `table` |
| 需要分页 | `table` |
| 需要 `renderAs: "tag"` / `"checkbox"` | `table` |
| 简单卡片列表 | `list` |
| 列表项结构复杂 | `list` |

## 新手常见问题

**Q: 表格不显示数据？**
- 检查 `data.path` 指向的字段是否存在于 `dataModel` 中。
- 确认该字段的值是数组类型。
- 用一个 `text` 组件展示 `${$root.employees}` 确认数据是否正确传入。

**Q: 想自定义列的显示内容？**
- 使用 `template` 属性编写表达式模板。
- 例如：`"template": "${$current.name}（${$current.department}）"`。

**Q: 分页不生效？**
- 确认 `pagination` 设置了（不能是 `false`）。
- 确认数据数组长度超过了一页的数量。

**Q: 状态标签颜色不对？**
- 检查 `statusColors` 的键是否与实际数据值完全匹配（区分大小写）。
- 如果状态值不在 `statusColors` 映射中，Tag 会使用 `default` 颜色。

**Q: 想让某一列靠右对齐？**
- 设置 `align: "right"`。
- 例如金额列通常靠右对齐。

**Q: `renderAs: "checkbox"` 显示的是 `true`/`false` 而不是复选框？**
- 确认对应字段的值是布尔类型（`true`/`false`），不是字符串 `"true"`/`"false"`。
