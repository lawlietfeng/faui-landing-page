# Spin 加载中组件

`spin` 组件用于页面和区块的加载中状态提示。

## 适用场景

- 数据请求时的全局或局部等待动画
- 复杂组件（如表格、列表）的数据加载遮罩

## 核心属性

### spinning（是否为加载中状态）
布尔值，控制是否展示加载动画。默认为 `true`。

```json
{
  "id": "loading-spin",
  "component": "spin",
  "spinning": true
}
```

### tip（自定义描述文案）
当 `spin` 作为包裹组件时，可以自定义加载时的提示文字。

```json
{
  "id": "tip-spin",
  "component": "spin",
  "tip": "数据加载中，请稍后..."
}
```

### size（组件大小）
设置加载组件的大小，可选值为 `small`、`default` 和 `large`。默认为 `default`。

### children（包裹的子组件）
数组类型，如果配置了子组件，`spin` 会作为遮罩层覆盖在子组件上方。

```json
{
  "id": "container-spin",
  "component": "spin",
  "spinning": true,
  "tip": "Loading...",
  "children": ["user-card"]
}
```

## 完整示例

```json
[
  {
    "id": "global-spin",
    "component": "spin",
    "size": "large",
    "tip": "初始化中...",
    "style": {
      "display": "flex",
      "justifyContent": "center",
      "padding": "50px"
    }
  },
  {
    "id": "content-spin",
    "component": "spin",
    "spinning": true,
    "children": ["data-table"]
  },
  {
    "id": "data-table",
    "component": "table",
    "columns": []
  }
]
```
## 新手常见问题

**Q: 页面一直处于加载中无法操作？**
- 检查 `spinning` 属性是否一直为 `true`。通常需要通过动作（action）在数据加载完成后将其更新为 `false`。

**Q: 遮罩层没有覆盖整个区域？**
- 确保 `spin` 的 `children` 正确包含了需要遮罩的组件，或者将其放置在合适的具有相对定位 (`position: relative`) 的父容器中。
