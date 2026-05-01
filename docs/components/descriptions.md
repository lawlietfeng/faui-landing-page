# Descriptions 描述列表组件

`descriptions` 组件用于成组展示多个只读字段。

## 适用场景

- 展示用户详细资料
- 展示订单信息详情
- 展示系统的静态配置参数

## 核心属性

### title（描述列表标题）
设置描述列表的标题文字。

```json
{
  "id": "order-desc",
  "component": "descriptions",
  "title": "订单详情"
}
```

### bordered（是否展示边框）
布尔值，设置描述列表是否有边框。默认为 `false`。

### column（每行包含的描述项数量）
数字类型，指定一行展示多少个数据项。默认为 Ant Design 的内部默认值（通常为 3）。

### options（数据项列表）
数组类型，用于定义描述列表中的具体数据项。数组中的每一项包含 `label`（描述项标题）和 `value`（描述项内容）。
*(注：`value` 同时作为每一项的唯一 key 和展示的内容。)*

```json
{
  "id": "user-desc",
  "component": "descriptions",
  "options": [
    { "label": "姓名", "value": "张三" },
    { "label": "手机号", "value": "13800138000" },
    { "label": "居住地", "value": "北京市朝阳区" }
  ]
}
```

## 完整示例

```json
{
  "id": "product-desc",
  "component": "descriptions",
  "title": "商品信息",
  "bordered": true,
  "column": 2,
  "options": [
    { "label": "商品名称", "value": "苹果 MacBook Pro" },
    { "label": "价格", "value": "¥14999.00" },
    { "label": "库存状态", "value": "有货" },
    { "label": "发货地", "value": "上海" }
  ],
  "style": {
    "backgroundColor": "#fff",
    "padding": "24px"
  }
}
```
## 新手常见问题

**Q: 为什么内容被挤压得很难看？**
- 检查 `column` 属性设置是否过大，或者父容器宽度不足。可以尝试减小 `column` 值或设置 `column: 1` 独占一行。

**Q: 支持自定义每个数据项的样式吗？**
- 目前仅支持通过顶层 `style` 属性控制整个 Descriptions 的样式。
