# inputnumber 组件

`inputnumber` 是数字输入框组件，用于输入数字值，支持步进调节（加减按钮），适用于年龄、数量、金额等数值输入场景。

## 适用场景

- 年龄输入
- 商品数量
- 价格/金额
- 百分比/比例设置
- 任何需要限制为数值的输入

## 核心属性

### min / max（最小值/最大值）

限制输入的数值范围：

```json
{
  "id": "age-input",
  "component": "inputnumber",
  "min": 0,
  "max": 150
}
```

### step（步进值）

点击加减按钮时每次变化的数值：

```json
{
  "id": "price-input",
  "component": "inputnumber",
  "min": 0,
  "max": 10000,
  "step": 100
}
```

设置为 `1` 则每次变化 1；设置为 `0.1` 则每次变化 0.1（支持小数）。

### placeholder（占位提示）

```json
{
  "id": "quantity-input",
  "component": "inputnumber",
  "placeholder": "请输入数量"
}
```

### value.path（数据绑定）

```json
{
  "id": "quantity-input",
  "component": "inputnumber",
  "value": { "path": "/quantity" }
}
```

### on_change（值变化事件）

**必须配置**：

```json
{
  "id": "quantity-input",
  "component": "inputnumber",
  "value": { "path": "/quantity" },
  "on_change": { "action": "update_data", "path": "/quantity", "value": "${value}" }
}
```

`${value}` 是当前输入的数值（number 类型）。

### rules（校验规则）

```json
{
  "id": "age-input",
  "component": "inputnumber",
  "rules": [
    { "required": true, "message": "请输入年龄" },
    { "type": "number", "message": "年龄必须是数字" },
    { "min": 18, "message": "必须年满 18 岁" }
  ]
}
```

### validateTrigger（触发校验时机）

```json
{
  "id": "age-input",
  "component": "inputnumber",
  "validateTrigger": "onBlur"
}
```

## 完整示例

### 年龄输入

```json
{
  "id": "age-input",
  "component": "inputnumber",
  "placeholder": "请输入年龄",
  "min": 0,
  "max": 150,
  "step": 1,
  "value": { "path": "/age" },
  "rules": [
    { "required": true, "message": "请输入年龄" },
    { "type": "number", "message": "年龄必须是数字" },
    { "min": 18, "message": "必须年满 18 岁" }
  ],
  "on_change": { "action": "update_data", "path": "/age", "value": "${value}" }
}
```

### 商品数量

```json
{
  "id": "quantity-input",
  "component": "inputnumber",
  "placeholder": "数量",
  "min": 1,
  "max": 99,
  "step": 1,
  "value": { "path": "/quantity" },
  "rules": [
    { "required": true, "message": "请输入数量" },
    { "min": 1, "message": "数量最少为 1" }
  ],
  "on_change": { "action": "update_data", "path": "/quantity", "value": "${value}" }
}
```

### 价格输入（支持小数）

```json
{
  "id": "price-input",
  "component": "inputnumber",
  "placeholder": "请输入价格",
  "min": 0,
  "max": 999999.99,
  "step": 0.01,
  "precision": 2,
  "value": { "path": "/price" },
  "rules": [
    { "required": true, "message": "请输入价格" },
    { "min": 0.01, "message": "价格最小为 0.01" }
  ],
  "on_change": { "action": "update_data", "path": "/price", "value": "${value}" }
}
```

### 百分比输入

```json
{
  "id": "discount-input",
  "component": "inputnumber",
  "placeholder": "折扣比例",
  "min": 0,
  "max": 100,
  "step": 5,
  "addonAfter": "%",
  "value": { "path": "/discount" },
  "rules": [
    { "required": true, "message": "请输入折扣比例" },
    { "min": 0, "max": 100, "message": "折扣比例必须在 0-100 之间" }
  ],
  "on_change": { "action": "update_data", "path": "/discount", "value": "${value}" }
}
```

### 在表单中使用

```json
[
  {
    "id": "product-form",
    "component": "form",
    "submitButtonId": "submit-btn",
    "children": ["name-input", "price-input", "quantity-input", "submit-btn"]
  },
  {
    "id": "name-input",
    "component": "input",
    "placeholder": "请输入商品名称",
    "value": { "path": "/name" },
    "rules": [{ "required": true, "message": "请输入商品名称" }],
    "on_change": { "action": "update_data", "path": "/name", "value": "${value}" }
  },
  {
    "id": "price-input",
    "component": "inputnumber",
    "placeholder": "请输入单价",
    "min": 0,
    "step": 0.01,
    "precision": 2,
    "value": { "path": "/price" },
    "rules": [
      { "required": true, "message": "请输入单价" },
      { "min": 0.01, "message": "单价最小为 0.01" }
    ],
    "on_change": { "action": "update_data", "path": "/price", "value": "${value}" }
  },
  {
    "id": "quantity-input",
    "component": "inputnumber",
    "placeholder": "请输入库存",
    "min": 0,
    "step": 1,
    "value": { "path": "/stock" },
    "rules": [
      { "required": true, "message": "请输入库存" },
      { "min": 0, "message": "库存不能为负数" }
    ],
    "on_change": { "action": "update_data", "path": "/stock", "value": "${value}" }
  },
  {
    "id": "submit-btn",
    "component": "button",
    "label": "提交",
    "on_tap": [
      { "action": "http_proxy", "payload": { "http_config": { "method": "POST", "path": "/api/product" } } }
    ]
  }
]
```

## 与 input 的区别

| 特性 | input | inputnumber |
|------|-------|-------------|
| 输入类型 | 文本（字符串） | 数值（数字） |
| 步进按钮 | 无 | 有（加减按钮） |
| min/max 限制 | 无 | 有 |
| 支持小数 | 是（但无法限制步进） | 是（可设置 step） |
| 适用场景 | 任意文本 | 数值、金额、数量 |

## 新手常见问题

**Q: 输入非数字会被拒绝吗？**
- 是的，`inputnumber` 只接受数字输入，非数字字符无法输入。

**Q: 初始值显示不正确？**
- 确认 `dataModel` 中对应字段的值是数字类型（number），而不是字符串。
- 例如：`"age": "25"`（字符串）可能导致问题，应使用 `"age": 25`（数字）。

**Q: 如何设置小数精度？**
- 使用 `precision` 属性可以限制小数位数，如 `precision: 2` 限制最多 2 位小数。

**Q: step 设置为小数后，min 也要设置小数吗？**
- 不一定，但如果业务需要精确控制，建议 min 也使用相同精度的小数。

**Q: 值保存到 dataModel 后是字符串还是数字？**
- `inputnumber` 的值是 number 类型（JavaScript 数字）。
- 如果后端期望字符串，需要在 `httpRequest` 中进行转换。

**Q: 如何在输入框后添加单位（如"元"、"%"、"件"）？**
- 使用 `addonAfter` 属性可以添加后缀文本。
- 例如：`"addonAfter": "元"` 会在输入框右侧显示"元"。

**Q: 超过 min/max 范围时会发生什么？**
- 到达最小值后，减号按钮会自动禁用。
- 到达最大值后，加号按钮会自动禁用。
- 手动输入超出范围的值仍然可以，但会触发校验失败。
