# slider 组件

`slider` 是滑动输入条组件，通过拖动滑块来选择数值，适用于价格范围、评分、音量等需要连续值选择的场景。

## 适用场景

- 价格区间筛选
- 音量/亮度调节
- 评分（配合数字显示）
- 数值范围选择
- 任何需要滑动选择的连续值场景

## 核心属性

### min / max（最小值/最大值）

设置滑动范围：

```json
{
  "id": "price-slider",
  "component": "slider",
  "min": 0,
  "max": 1000
}
```

### step（步长）

每次拖动的最小单位：

```json
{
  "id": "price-slider",
  "component": "slider",
  "min": 0,
  "max": 1000,
  "step": 10
}
```

设置为 `1` 则每次变化 1；设置为 `10` 则每次变化 10。

### range（是否双滑块模式）

设置为 `true` 可以同时选择范围（两个值）：

```json
{
  "id": "price-slider",
  "component": "slider",
  "min": 0,
  "max": 1000,
  "step": 10,
  "range": true
}
```

- `false`（默认）：单滑块，返回一个数值
- `true`：双滑块，返回 `[min, max]` 数组

### value.path（数据绑定）

**单滑块模式**（`range: false`）：

```json
{
  "id": "volume-slider",
  "component": "slider",
  "value": { "path": "/volume" }
}
```

**双滑块模式**（`range: true`）：

```json
{
  "id": "price-slider",
  "component": "slider",
  "range": true,
  "value": { "path": "/priceRange" }
}
```

双滑块模式下，`dataModel.priceRange` 应为数组，如 `[100, 500]`。

### on_change（值变化事件）

**必须配置**：

```json
{
  "id": "price-slider",
  "component": "slider",
  "range": true,
  "value": { "path": "/priceRange" },
  "on_change": { "action": "update_data", "path": "/priceRange", "value": "${value}" }
}
```

### rules（校验规则）

```json
{
  "id": "price-slider",
  "component": "slider",
  "rules": [{ "required": true, "message": "请选择价格范围" }]
}
```

## 完整示例

### 基础单滑块

```json
{
  "id": "volume-slider",
  "component": "slider",
  "min": 0,
  "max": 100,
  "step": 1,
  "value": { "path": "/volume" },
  "on_change": { "action": "update_data", "path": "/volume", "value": "${value}" }
}
```

### 带当前值显示的滑块

```json
[
  {
    "id": "volume-section",
    "component": "box",
    "layout": "horizontal",
    "spacing": 12,
    "align": "center",
    "children": ["volume-slider", "volume-value"]
  },
  {
    "id": "volume-slider",
    "component": "slider",
    "min": 0,
    "max": 100,
    "step": 1,
    "value": { "path": "/volume" },
    "on_change": { "action": "update_data", "path": "/volume", "value": "${value}" }
  },
  {
    "id": "volume-value",
    "component": "text",
    "content": "${$root.volume ?? 0}"
  }
]
```

### 价格范围（双滑块）

```json
{
  "id": "price-range-slider",
  "component": "slider",
  "min": 0,
  "max": 10000,
  "step": 100,
  "range": true,
  "value": { "path": "/priceRange" },
  "rules": [{ "required": true, "message": "请选择价格范围" }],
  "on_change": { "action": "update_data", "path": "/priceRange", "value": "${value}" }
}
```

### 带刻度标记的滑块

```json
{
  "id": "level-slider",
  "component": "slider",
  "min": 0,
  "max": 100,
  "step": 25,
  "marks": {
    "0": "0",
    "25": "25",
    "50": "50",
    "75": "75",
    "100": "100"
  },
  "value": { "path": "/level" },
  "on_change": { "action": "update_data", "path": "/level", "value": "${value}" }
}
```

### 在表单中使用

```json
[
  {
    "id": "filter-form",
    "component": "form",
    "submitButtonId": "submit-btn",
    "children": ["name-input", "price-range-slider", "submit-btn"]
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
    "id": "price-range-slider",
    "component": "slider",
    "min": 0,
    "max": 10000,
    "step": 100,
    "range": true,
    "value": { "path": "/priceRange" },
    "rules": [{ "required": true, "message": "请选择价格范围" }],
    "on_change": { "action": "update_data", "path": "/priceRange", "value": "${value}" }
  },
  {
    "id": "submit-btn",
    "component": "button",
    "label": "搜索",
    "on_tap": [
      { "action": "http_proxy", "payload": { "http_config": { "method": "POST", "path": "/api/search" } } }
    ]
  }
]
```

## slider vs 其他输入方式的对比

| 组件 | 适用场景 | 特点 |
|------|---------|------|
| `slider` | 连续数值/范围 | 拖动选择、直观 |
| `inputnumber` | 精确数值 | 精确输入、支持步进按钮 |
| `radio` | 少量离散选项 | 选项明确、可显示描述 |
| `select` | 枚举选择 | 节省空间、可多选 |

## 新手常见问题

**Q: 单滑块和双滑块的值格式有什么区别？**
- 单滑块：值为 number，如 `50`
- 双滑块（`range: true`）：值为数组，如 `[20, 80]`

**Q: 如何设置双滑块的初始值？**
- 在 `dataModel` 中设置数组：
```json
{
  "dataModel": {
    "priceRange": [100, 500]
  }
}
```

**Q: 滑块拖动时 `on_change` 每次都会触发吗？**
- 是的，拖动过程中会持续触发 `on_change`。
- 如果需要只在拖动结束时更新，可以考虑其他实现方式。

**Q: `step` 设置过小会导致性能问题吗？**
- 如果范围很大（如 0-10000）且 step 很小（如 1），可能会有性能影响。
- 建议根据实际需求设置合理的 step 值。

**Q: 如何让滑块显示刻度标记？**
- 使用 `marks` 属性，如：
```json
{
  "marks": {
    "0": "0%",
    "50": "50%",
    "100": "100%"
  }
}
```
- marks 的 key 必须在 min-max 范围内。

**Q: 滑块可以垂直显示吗？**
- 目前 `slider` 组件默认水平显示。
- 如需垂直样式，可能需要通过 `style` 调整或使用其他组件。

**Q: 如何禁用滑块（只读展示）？**
- 目前 `slider` 组件暂不支持 `disabled` 属性。
- 如果需要只读展示，可以考虑使用 `text` 组件配合数据显示。

**Q: `rules` 校验对双滑块如何工作？**
- 校验规则如 `min`、`max` 对双滑块的值数组同样生效。
- 例如 `{ "min": 0 }` 会校验数组中的每个值都不小于 0。
