# tree 树形控件
展现具有层级关系的数据结构（如文件夹、组织架构、分类目录），支持单选、多选（复选框）、展开折叠等交互。

## 适用场景
- 展示文件系统、文档目录或复杂的侧边栏导航
- 选择公司部门、团队或员工
- 以树形结构分配菜单权限或操作权限
- 文件浏览器的目录展开与选中

## 核心属性
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| treeData | `TreeDataNode[]` | `[]` | **必填**，嵌套数据源，每项含 `title`、`key`、`children` |
| checkable | `boolean` | `false` | 节点前是否显示复选框 |
| checkedKeys | `ValueBinding` | - | 绑定勾选的节点 key 数组 |
| selectedKeys | `ValueBinding` | - | 绑定点击选中的节点 key 数组 |
| defaultExpandAll | `boolean` | `false` | 是否默认展开所有节点 |

## 完整示例
```json
[
  {
    "id": "dept_tree",
    "type": "element",
    "config": {
      "component": "tree",
      "checkable": true,
      "defaultExpandAll": true,
      "treeData": "${/departmentData}",
      "checkedKeys": {
        "path": "/selectedDeptIds"
      },
      "on_check": {
        "action": "update_data",
        "payload": {
          "path": "/selectedDeptIds",
          "value": "${value}"
        }
      }
    }
  }
]
```

## 常见问题

**Q: 开启 `checkStrictly` 后绑定的数据格式变了？**
默认时 `${value}` 是 `["key1", "key2"]`。开启 `checkStrictly: true` 后变为 `{ checked: ["key1"], halfChecked: ["key2"] }`，提交时需提取 `checked` 数组。

**Q: 只想要单选怎么配置？**
默认的节点点击（`selectedKeys`）就是单选的。如果是指复选框单选，原生 Tree 不支持，建议改用 `treeselect` 或 `cascader` 组件。

**Q: 如何在节点后面添加操作按钮？**
目前 `tree` 暂未开放自定义渲染插槽。建议在选中节点后，在树旁边的详情面板中展示对应操作按钮。
