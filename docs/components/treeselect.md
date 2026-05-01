# treeselect 组件

`treeselect` 是树形选择组件，用于从树形结构的数据中选择一个或多个节点，适用于组织架构选择、分类选择、权限树等场景。

## 适用场景

- 组织架构选择（公司 → 部门 → 小组）
- 商品分类选择（父分类 → 子分类）
- 权限树选择（模块 → 操作权限）
- 地区选择（省 → 市 → 区）
- 任何具有树形层级结构的选择场景

## 与 cascader 的区别

| 特性 | treeselect | cascader |
|------|------------|----------|
| 选择方式 | 下拉树形菜单 | 级联路径选择 |
| 多选支持 | `multiple: true` 支持多选 | 仅单选 |
| 显示效果 | 树形结构，可展开/收起 | 显示完整路径 |
| 适用场景 | 需要看清层级关系的 | 需要快速定位的 |

## 核心属性

### options（树形数据源）

通过 `children` 嵌套定义树形结构：

```json
{
  "id": "department-treeselect",
  "component": "treeselect",
  "options": [
    {
      "value": "headquarters",
      "label": "总部",
      "children": [
        {
          "value": "hr",
          "label": "人力资源部"
        },
        {
          "value": "finance",
          "label": "财务部"
        }
      ]
    },
    {
      "value": "rd",
      "label": "研发中心",
      "children": [
        {
          "value": "frontend",
          "label": "前端组"
        },
        {
          "value": "backend",
          "label": "后端组"
        }
      ]
    }
  ]
}
```

### multiple（是否支持多选）

```json
{
  "id": "department-treeselect",
  "component": "treeselect",
  "multiple": true
}
```

- `false`（默认）：单选，返回一个值
- `true`：多选，返回值是数组

### placeholder（占位提示）

```json
{
  "id": "department-treeselect",
  "component": "treeselect",
  "placeholder": "请选择所属部门"
}
```

### value.path（数据绑定）

**单选模式**（`multiple: false`）：

```json
{
  "id": "category-treeselect",
  "component": "treeselect",
  "value": { "path": "/category" }
}
```

**多选模式**（`multiple: true`）：

```json
{
  "id": "category-treeselect",
  "component": "treeselect",
  "multiple": true,
  "value": { "path": "/categories" }
}
```

多选模式下，`dataModel.categories` 应为数组，如 `["frontend", "backend"]`。

### on_change（值变化事件）

**必须配置**：

```json
{
  "id": "department-treeselect",
  "component": "treeselect",
  "multiple": true,
  "value": { "path": "/departments" },
  "on_change": { "action": "update_data", "path": "/departments", "value": "${value}" }
}
```

`${value}` 是选中节点的 `value` 数组（多选时）或单个值（单选时）。

### rules（校验规则）

```json
{
  "id": "department-treeselect",
  "component": "treeselect",
  "rules": [{ "required": true, "message": "请至少选择一个部门" }]
}
```

## 完整示例

### 部门单选

```json
{
  "id": "department-treeselect",
  "component": "treeselect",
  "placeholder": "请选择所属部门",
  "value": { "path": "/department" },
  "options": [
    {
      "value": "headquarters",
      "label": "总部",
      "children": [
        { "value": "hr", "label": "人力资源部" },
        { "value": "finance", "label": "财务部" },
        { "value": "it", "label": "信息技术部" }
      ]
    },
    {
      "value": "business",
      "label": "业务部门",
      "children": [
        { "value": "sales", "label": "销售部" },
        { "value": "marketing", "label": "市场部" }
      ]
    },
    {
      "value": "rd",
      "label": "研发中心",
      "children": [
        { "value": "frontend", "label": "前端组" },
        { "value": "backend", "label": "后端组" },
        { "value": "mobile", "label": "移动端组" },
        { "value": "qa", "label": "测试组" }
      ]
    }
  ],
  "rules": [{ "required": true, "message": "请选择部门" }],
  "on_change": { "action": "update_data", "path": "/department", "value": "${value}" }
}
```

### 部门多选

```json
{
  "id": "department-treeselect",
  "component": "treeselect",
  "placeholder": "请选择所属部门（可多选）",
  "multiple": true,
  "value": { "path": "/departments" },
  "options": [
    {
      "value": "headquarters",
      "label": "总部",
      "children": [
        { "value": "hr", "label": "人力资源部" },
        { "value": "finance", "label": "财务部" }
      ]
    },
    {
      "value": "rd",
      "label": "研发中心",
      "children": [
        { "value": "frontend", "label": "前端组" },
        { "value": "backend", "label": "后端组" }
      ]
    }
  ],
  "rules": [{ "required": true, "message": "请至少选择一个部门" }],
  "on_change": { "action": "update_data", "path": "/departments", "value": "${value}" }
}
```

### 商品分类选择

```json
{
  "id": "category-treeselect",
  "component": "treeselect",
  "placeholder": "请选择商品分类",
  "multiple": true,
  "value": { "path": "/productCategories" },
  "options": [
    {
      "value": "electronics",
      "label": "电子产品",
      "children": [
        { "value": "phone", "label": "手机" },
        { "value": "computer", "label": "电脑" },
        { "value": "tablet", "label": "平板" }
      ]
    },
    {
      "value": "appliances",
      "label": "家电",
      "children": [
        { "value": "tv", "label": "电视" },
        { "value": "fridge", "label": "冰箱" },
        { "value": "washer", "label": "洗衣机" }
      ]
    },
    {
      "value": "clothing",
      "label": "服装",
      "children": [
        { "value": "mens", "label": "男装" },
        { "value": "womens", "label": "女装" },
        { "value": "kids", "label": "童装" }
      ]
    }
  ],
  "rules": [{ "required": true, "message": "请选择至少一个分类" }],
  "on_change": { "action": "update_data", "path": "/productCategories", "value": "${value}" }
}
```

### 权限树选择

```json
{
  "id": "permission-treeselect",
  "component": "treeselect",
  "placeholder": "请选择权限范围",
  "multiple": true,
  "value": { "path": "/permissions" },
  "options": [
    {
      "value": "user",
      "label": "用户管理",
      "children": [
        { "value": "user.view", "label": "查看用户" },
        { "value": "user.create", "label": "创建用户" },
        { "value": "user.edit", "label": "编辑用户" },
        { "value": "user.delete", "label": "删除用户" }
      ]
    },
    {
      "value": "content",
      "label": "内容管理",
      "children": [
        { "value": "content.view", "label": "查看内容" },
        { "value": "content.create", "label": "创建内容" },
        { "value": "content.edit", "label": "编辑内容" },
        { "value": "content.delete", "label": "删除内容" }
      ]
    },
    {
      "value": "system",
      "label": "系统设置",
      "children": [
        { "value": "system.config", "label": "系统配置" },
        { "value": "system.log", "label": "系统日志" }
      ]
    }
  ],
  "rules": [{ "required": true, "message": "请选择权限" }],
  "on_change": { "action": "update_data", "path": "/permissions", "value": "${value}" }
}
```

### 在表单中使用

```json
[
  {
    "id": "employee-form",
    "component": "form",
    "submitButtonId": "submit-btn",
    "children": ["name-input", "dept-treeselect", "submit-btn"]
  },
  {
    "id": "name-input",
    "component": "input",
    "placeholder": "请输入员工姓名",
    "value": { "path": "/name" },
    "rules": [{ "required": true, "message": "请输入姓名" }],
    "on_change": { "action": "update_data", "path": "/name", "value": "${value}" }
  },
  {
    "id": "dept-treeselect",
    "component": "treeselect",
    "placeholder": "请选择所属部门",
    "multiple": true,
    "value": { "path": "/departments" },
    "options": [
      {
        "value": "hq",
        "label": "总部",
        "children": [
          { "value": "hr", "label": "人力资源部" },
          { "value": "finance", "label": "财务部" }
        ]
      },
      {
        "value": "rd",
        "label": "研发中心",
        "children": [
          { "value": "frontend", "label": "前端组" },
          { "value": "backend", "label": "后端组" }
        ]
      }
    ],
    "rules": [{ "required": true, "message": "请选择部门" }],
    "on_change": { "action": "update_data", "path": "/departments", "value": "${value}" }
  },
  {
    "id": "submit-btn",
    "component": "button",
    "label": "提交",
    "on_tap": [
      { "action": "http_proxy", "payload": { "http_config": { "method": "POST", "path": "/api/employee" } } }
    ]
  }
]
```

## 新手常见问题

**Q: 单选和多选的值格式有什么区别？**
- 单选：值为字符串，如 `"frontend"`
- 多选（`multiple: true`）：值为数组，如 `["frontend", "backend"]`

**Q: 如何设置多选的初始值？**
- 在 `dataModel` 中设置数组：
```json
{
  "dataModel": {
    "departments": ["frontend", "backend"]
  }
}
```

**Q: 树的节点可以只有两层吗？**
- 可以，`options` 可以任意嵌套。
- 只要不给某节点设置 `children`，它就是叶子节点。

**Q: `multiple: true` 时选中父节点会自动选中子节点吗？**
- 这取决于 Ant Design TreeSelect 的默认行为。
- 通常父子节点是独立的，选择父节点不会自动选中所有子节点。

**Q: 如何让树默认展开？**
- 目前 `treeselect` 组件暂不支持 `defaultExpandAll` 属性。
- 如需默认展开，可能需要自定义实现。

**Q: 可以禁用某些节点吗？**
- 目前 `options` 中的每个节点没有直接的 `disabled` 属性。
- 如需禁用特定节点，需要在 `options` 中排除或自定义处理。

**Q: `on_change` 的 `${value}` 每次都是完整的数组吗？**
- 是的，每次变化时 `${value}` 是选中值的完整数组（多选时）。
- 不是增量变化，而是全量替换。

**Q: 可以显示选中的路径吗？**
- `treeselect` 默认显示选中的叶子节点标签。
- 如需显示完整路径，可能需要自定义实现或使用 `cascader` 组件。

**Q: 树形数据太深时性能不好怎么办？**
- 避免构建过深的树结构（建议不超过 3-4 层）。
- 可以考虑分步加载或使用 `cascader` 组件。
