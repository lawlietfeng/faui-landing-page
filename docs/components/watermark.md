# watermark 水印组件
为页面或特定区块提供文字或图片水印，用于保护版权、标识数据来源或提示保密信息。

## 适用场景
- 内部系统防泄密，全局铺满员工工号或姓名
- 敏感数据保护，在财务报表等区块加上"机密"字样
- 版权声明，在图片展示区或文章阅读区加上公司 Logo
- 多行动态水印（结合用户信息插值）

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| content | `string \| string[]` | - | 水印文字，数组表示多行，支持插值表达式 |
| image | `string` | - | 图片水印 URL（同时有 `content` 时文字优先） |
| font | `object` | - | 字体样式，含 `color`、`fontSize`、`fontWeight` 等 |
| gap | `[number, number]` | `[100, 100]` | 水印之间的水平和垂直间距 |
| rotate | `number` | `-22` | 水印旋转角度 |

## 完整示例
```json
[
  {
    "id": "secure_area",
    "type": "element",
    "config": {
      "component": "watermark",
      "content": [
        "内部机密，严禁外传",
        "${/user/name} - ${/user/department}"
      ],
      "gap": [120, 80],
      "font": {
        "color": "rgba(0, 0, 0, 0.08)",
        "fontSize": 14
      },
      "children": ["secure_card"]
    }
  },
  {
    "id": "secure_card",
    "type": "element",
    "config": {
      "component": "card",
      "title": "2023 Q3 财务报表",
      "children": ["table_data"]
    }
  }
]
```

## 常见问题

**Q: 配置了图片水印但显示的是文字？**
当 `content` 和 `image` 同时存在时，文字优先级更高。想显示图片水印，请确保不配置 `content` 或将其置空。

**Q: 水印怎么才能覆盖整个页面？**
`watermark` 只会铺满自身大小。要覆盖整个页面，将其作为最外层根节点，并加上 `style: { "minHeight": "100vh" }`。

**Q: 用户能通过开发者工具删掉水印吗？**
底层使用 `MutationObserver` 监听 DOM 变化，删除或修改水印节点后会自动重新生成，提供基础防篡改保护。
