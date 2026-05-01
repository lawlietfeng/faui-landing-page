# cascader 组件

`cascader` 是级联选择组件，用于选择多层级结构的数据，如省市区、公司部门、分类目录等。

## 适用场景

- 省市区/城乡选择（省 → 市 → 区 → 街道）
- 组织架构选择（公司 → 部门 → 小组）
- 商品分类选择（大类 → 中类 → 小类）
- 任何具有层级关系的数据选择

## 核心概念

级联选择的特点是**父子关联**：
- 选择父级时，只会保留父级的值
- 选择子级时，路径上所有父级都会被选中
- 用户可以清晰地看到完整的选择路径

## 核心属性

### options（选项数据源）

`options` 支持嵌套结构，通过 `children` 属性定义子选项：

```json
{
  "id": "region-cascader",
  "component": "cascader",
  "options": [
    {
      "value": "zhejiang",
      "label": "浙江省",
      "children": [
        {
          "value": "hangzhou",
          "label": "杭州市",
          "children": [
            { "value": "xihu", "label": "西湖区" },
            { "value": "jianggan", "label": "江干区" }
          ]
        },
        {
          "value": "ningbo",
          "label": "宁波市",
          "children": [
            { "value": "yinzhou", "label": "鄞州区" }
          ]
        }
      ]
    },
    {
      "value": "jiangsu",
      "label": "江苏省",
      "children": [
        {
          "value": "nanjing",
          "label": "南京市",
          "children": [
            { "value": "xuanwu", "label": "玄武区" }
          ]
        }
      ]
    }
  ]
}
```

### placeholder（占位提示）

```json
{
  "id": "region-cascader",
  "component": "cascader",
  "placeholder": "请选择所在地区"
}
```

### value.path（数据绑定）

级联选择的值是一个数组，表示从根到当前选择节点的路径：

```json
{
  "id": "region-cascader",
  "component": "cascader",
  "value": { "path": "/region" }
}
```

假设用户选择了"浙江省 → 杭州市 → 西湖区"，则 `dataModel.region` 的值为 `["zhejiang", "hangzhou", "xihu"]`。

### on_change（值变化事件）

**必须配置**：

```json
{
  "id": "region-cascader",
  "component": "cascader",
  "value": { "path": "/region" },
  "on_change": { "action": "update_data", "path": "/region", "value": "${value}" }
}
```

### rules（校验规则）

```json
{
  "id": "region-cascader",
  "component": "cascader",
  "rules": [{ "required": true, "message": "请选择所在地区" }]
}
```

## 完整示例

### 省市区三级联动

```json
{
  "id": "address-cascader",
  "component": "cascader",
  "placeholder": "请选择省市区",
  "value": { "path": "/address" },
  "options": [
    {
      "value": "beijing",
      "label": "北京市",
      "children": [
        {
          "value": "chaoyang",
          "label": "朝阳区",
          "children": [
            { "value": "guomao", "label": "国贸" },
            { "value": "sanlitun", "label": "三里屯" }
          ]
        },
        {
          "value": "haidian",
          "label": "海淀区"
        }
      ]
    },
    {
      "value": "shanghai",
      "label": "上海市",
      "children": [
        {
          "value": "pudong",
          "label": "浦东新区",
          "children": [
            { "value": "lujiazui", "label": "陆家嘴" },
            { "value": "zhangjiang", "label": "张江" }
          ]
        },
        {
          "value": "huangpu",
          "label": "黄浦区"
        }
      ]
    },
    {
      "value": "zhejiang",
      "label": "浙江省",
      "children": [
        {
          "value": "hangzhou",
          "label": "杭州市",
          "children": [
            { "value": "xihu", "label": "西湖区" },
            { "value": "binjiang", "label": "滨江区" }
          ]
        },
        {
          "value": "ningbo",
          "label": "宁波市"
        }
      ]
    }
  ],
  "rules": [{ "required": true, "message": "请选择省市区" }],
  "on_change": { "action": "update_data", "path": "/address", "value": "${value}" }
}
```

### 部门选择（两层级）

```json
{
  "id": "department-cascader",
  "component": "cascader",
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
      "value": "rd",
      "label": "研发中心",
      "children": [
        { "value": "frontend", "label": "前端组" },
        { "value": "backend", "label": "后端组" },
        { "value": "mobile", "label": "移动端组" },
        { "value": "qa", "label": "测试组" }
      ]
    },
    {
      "value": "marketing",
      "label": "市场部",
      "children": [
        { "value": "brand", "label": "品牌组" },
        { "value": "digital", "label": "数字营销组" }
      ]
    }
  ],
  "rules": [{ "required": true, "message": "请选择部门" }],
  "on_change": { "action": "update_data", "path": "/department", "value": "${value}" }
}
```

### 在表单中使用

```json
[
  {
    "id": "company-form",
    "component": "form",
    "submitButtonId": "submit-btn",
    "children": ["company-name-input", "region-cascader", "submit-btn"]
  },
  {
    "id": "company-name-input",
    "component": "input",
    "placeholder": "请输入公司名称",
    "value": { "path": "/companyName" },
    "rules": [{ "required": true, "message": "请输入公司名称" }],
    "on_change": { "action": "update_data", "path": "/companyName", "value": "${value}" }
  },
  {
    "id": "region-cascader",
    "component": "cascader",
    "placeholder": "请选择公司所在地",
    "value": { "path": "/region" },
    "options": [
      {
        "value": "zhejiang",
        "label": "浙江省",
        "children": [
          { "value": "hangzhou", "label": "杭州市" },
          { "value": "ningbo", "label": "宁波市" }
        ]
      }
    ],
    "rules": [{ "required": true, "message": "请选择所在地" }],
    "on_change": { "action": "update_data", "path": "/region", "value": "${value}" }
  },
  {
    "id": "submit-btn",
    "component": "button",
    "label": "提交",
    "on_tap": [
      { "action": "http_proxy", "payload": { "http_config": { "method": "POST", "path": "/api/company" } } }
    ]
  }
]
```

## 与 select 的区别

| 特性 | cascader | select |
|------|----------|--------|
| 数据结构 | 层级嵌套 | 扁平列表 |
| 选择方式 | 级联选择，显示路径 | 单层下拉 |
| 适用场景 | 省市区、部门树等 | 简单枚举 |
| 值的形式 | 数组（路径） | 单个值 |

## 新手常见问题

**Q: 选择后值是数组而不是单个值？**
- 这是正常行为。级联选择的值表示从根到叶子的完整路径。
- 如果只需要保存最终选择的叶子节点值，需要在提交时自行处理或使用其他组件。

**Q: 只想选到某一级别（如只选省，不选到区县）？**
- 可以在 `options` 中给不需要继续细分的层级不设置 `children`。
- 用户点击没有 `children` 的选项时会直接选中。

**Q: 选项不显示或显示错误？**
- 检查 `options` 的嵌套结构是否正确。
- 每个节点需要有 `value` 和 `label` 字段。

**Q: 如何限制只能选择某一层级？**
- 目前组件没有内置的层级限制属性。
- 可以在 `on_change` 中校验选中数组的长度，不符合则提示或重置。

**Q: 组件占位文本显示的是路径而不是 placeholder？**
- 如果已选择过值，占位文本会变成已选路径。
- `placeholder` 只在未选择时显示。

**Q: `on_change` 的 `${value}` 是什么格式？**
- 是一个数组，如 `["zhejiang", "hangzhou", "xihu"]`。
- 每个元素是对应层级选项的 `value` 字段值。
