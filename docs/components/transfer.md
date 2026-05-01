# transfer 组件

`transfer` 是穿梭框组件，用于在两个列表之间移动数据，常用于权限分配、角色分配、数据筛选等需要双向移动操作的场景。

## 适用场景

- 用户角色权限分配（将用户从"可分配"移到"已分配"）
- 多选数据筛选（将数据从"全部"移到"已选择"）
- 标签管理（如给文章分配标签）
- 任何需要从一组选项中选择多个的场景

## 核心概念

穿梭框的工作方式：
- **左侧列表**（Source）：可选择的数据源
- **右侧列表**（Target）：已选择的数据
- 用户通过"添加/移除"按钮在两个列表之间移动数据

## 核心属性

### options（数据源选项）

定义左侧可选的数据列表：

```json
{
  "id": "role-transfer",
  "component": "transfer",
  "options": [
    { "value": "1", "label": "管理员" },
    { "value": "2", "label": "运营人员" },
    { "value": "3", "label": "编辑" },
    { "value": "4", "label": "访客" }
  ]
}
```

- `value`：选中后实际保存的值
- `label`：显示给用户的文本

### value.path（数据绑定）

绑定到 `dataModel`，值是右侧列表（已选择）的 `targetKeys`：

```json
{
  "id": "role-transfer",
  "component": "transfer",
  "value": { "path": "/assignedRoles" }
}
```

假设用户选择了"管理员"和"编辑"，则 `dataModel.assignedRoles` 的值为 `["1", "3"]`。

### on_change（值变化事件）

**必须配置**：

```json
{
  "id": "role-transfer",
  "component": "transfer",
  "value": { "path": "/assignedRoles" },
  "on_change": { "action": "update_data", "path": "/assignedRoles", "value": "${value}" }
}
```

`${value}` 是右侧列表中被选中的 `value` 数组。

### rules（校验规则）

```json
{
  "id": "role-transfer",
  "component": "transfer",
  "rules": [
    { "required": true, "message": "请至少分配一个角色" },
    { "type": "array", "min": 1, "message": "必须为用户分配至少 1 个角色" }
  ]
}
```

## 完整示例

### 角色权限分配

```json
{
  "id": "role-transfer",
  "component": "transfer",
  "options": [
    { "value": "admin", "label": "管理员" },
    { "value": "editor", "label": "内容编辑" },
    { "value": "viewer", "label": "仅查看" },
    { "value": "billing", "label": "财务权限" },
    { "value": "hr", "label": "人事权限" },
    { "value": "it", "label": "IT 权限" }
  ],
  "value": { "path": "/userRoles" },
  "rules": [
    { "required": true, "message": "请为用户分配角色" },
    { "type": "array", "min": 1, "message": "至少需要分配一个角色" }
  ],
  "on_change": { "action": "update_data", "path": "/userRoles", "value": "${value}" }
}
```

### 标签分配

```json
{
  "id": "tag-transfer",
  "component": "transfer",
  "options": [
    { "value": "important", "label": "重要" },
    { "value": "urgent", "label": "紧急" },
    { "value": "frontend", "label": "前端" },
    { "value": "backend", "label": "后端" },
    { "value": "design", "label": "设计" },
    { "value": "bug", "label": "Bug" },
    { "value": "feature", "label": "新功能" },
    { "value": "docs", "label": "文档" }
  ],
  "value": { "path": "/taskTags" },
  "rules": [{ "required": true, "message": "请至少选择一个标签" }],
  "on_change": { "action": "update_data", "path": "/taskTags", "value": "${value}" }
}
```

### 员工选择

```json
{
  "id": "employee-transfer",
  "component": "transfer",
  "options": [
    { "value": "e001", "label": "张三（研发部）" },
    { "value": "e002", "label": "李四（产品部）" },
    { "value": "e003", "label": "王五（设计部）" },
    { "value": "e004", "label": "赵六（市场部）" },
    { "value": "e005", "label": "孙七（运营部）" },
    { "value": "e006", "label": "周八（人事部）" }
  ],
  "value": { "path": "/assignedEmployees" },
  "rules": [{ "required": true, "message": "请至少选择一名员工" }],
  "on_change": { "action": "update_data", "path": "/assignedEmployees", "value": "${value}" }
}
```

### 在表单中使用

```json
[
  {
    "id": "permission-form",
    "component": "form",
    "submitButtonId": "submit-btn",
    "children": ["user-select", "role-transfer", "submit-btn"]
  },
  {
    "id": "user-select",
    "component": "select",
    "placeholder": "请选择用户",
    "value": { "path": "/userId" },
    "options": [
      { "label": "用户 A", "value": "user_a" },
      { "label": "用户 B", "value": "user_b" },
      { "label": "用户 C", "value": "user_c" }
    ],
    "rules": [{ "required": true, "message": "请选择用户" }],
    "on_change": { "action": "update_data", "path": "/userId", "value": "${value}" }
  },
  {
    "id": "role-transfer",
    "component": "transfer",
    "options": [
      { "value": "admin", "label": "管理员" },
      { "value": "editor", "label": "编辑" },
      { "value": "viewer", "label": "查看者" },
      { "value": "billing", "label": "财务" }
    ],
    "value": { "path": "/roles" },
    "rules": [
      { "required": true, "message": "请分配角色" },
      { "type": "array", "min": 1, "message": "至少需要分配一个角色" }
    ],
    "on_change": { "action": "update_data", "path": "/roles", "value": "${value}" }
  },
  {
    "id": "submit-btn",
    "component": "button",
    "label": "保存权限",
    "on_tap": [
      { "action": "http_proxy", "payload": { "http_config": { "method": "POST", "path": "/api/permission" } } }
    ]
  }
]
```

## 新手常见问题

**Q: 右侧列表的值是什么格式？**
- 是一个数组，包含被选中项的 `value` 字段值。
- 例如 `["admin", "editor"]` 表示选中了"管理员"和"编辑"。

**Q: 初始值如何设置？**
- 在 `dataModel` 中设置数组：
```json
{
  "dataModel": {
    "userRoles": ["admin", "editor"]
  }
}
```
这样页面的穿梭框右侧会显示"管理员"和"编辑"。

**Q: 可以设置数据源的总数据量吗？**
- `options` 会完整显示在左侧列表。
- 如需分页，可以配合其他 UI 元素实现。

**Q: 穿梭框支持搜索过滤吗？**
- 默认会有简单的搜索框。
- 如果需要更复杂的搜索功能，可能需要自定义实现。

**Q: `oneWay` 模式是什么意思？**
- `oneWay: true` 时，只能从左移到右，不能从右移除回左边。
- 适用于"分配"场景，移除需要通过其他方式（如清空操作）。

**Q: 穿梭框支持禁用某些选项吗？**
- 目前 `options` 中的每个选项没有直接的 `disabled` 属性。
- 如需禁用特定选项，需要在 `options` 中排除或自定义处理。

**Q: 如何自定义左右列表的表头标题？**
- 目前穿梭框的表头标题是默认的。
- 如需自定义，可能需要通过样式覆盖或自定义组件实现。

**Q: `on_change` 的 `${value}` 每次都是完整的数组吗？**
- 是的，每次变化时 `${value}` 是右侧列表的完整 `value` 数组。
- 不是增量变化，而是全量替换。
