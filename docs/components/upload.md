# upload 组件

`upload` 是文件上传组件，适用于上传附件、凭证、图片等文件列表场景。

## 适用场景

- 上传证件照、证明材料
- 上传合同、协议附件
- 上传报销发票
- 上传简历、作品集
- 任何需要用户提交文件的场景

## 核心属性

### multiple（是否支持多文件）

```json
{
  "id": "proof-upload",
  "component": "upload",
  "multiple": true
}
```

- `true`：可以同时选择多个文件
- `false` 或不设置：只能上传一个文件

### maxCount（最大文件数量）

配合 `multiple: true` 使用，限制最多上传的文件数量：

```json
{
  "id": "proof-upload",
  "component": "upload",
  "multiple": true,
  "maxCount": 5
}
```

### accept（接受的文件类型）

限制可上传的文件类型：

```json
{
  "id": "avatar-upload",
  "component": "upload",
  "accept": "image/*"
}
```

```json
{
  "id": "doc-upload",
  "component": "upload",
  "accept": ".pdf,.doc,.docx"
}
```

常见类型：
- `image/*` - 所有图片
- `video/*` - 所有视频
- `audio/*` - 所有音频
- `.pdf,.doc,.docx` - PDF 和 Word 文档
- `.xls,.xlsx` - Excel 文件

### listType（文件列表显示样式）

| 值 | 效果 |
|---|------|
| `text`（默认） | 仅显示文字文件名 |
| `picture` | 显示缩略图 + 文件名 |
| `picture-card` | 卡片式大缩略图 |

```json
{
  "id": "photo-upload",
  "component": "upload",
  "listType": "picture",
  "multiple": true
}
```

### showUploadList（是否显示上传列表）

```json
{
  "id": "proof-upload",
  "component": "upload",
  "showUploadList": true
}
```

设置为 `false` 可隐藏已上传文件列表。

### value.path / on_change（数据绑定）

```json
{
  "id": "proof-upload",
  "component": "upload",
  "value": { "path": "/proofFiles" },
  "on_change": { "action": "update_data", "path": "/proofFiles", "value": "${fileList}" }
}
```

**注意**：`on_change` 中的 `value` 固定使用 `${fileList}`，代表当前的上传文件列表。

### rules（校验规则）

配合 `form` 使用时，可以校验是否已上传：

```json
{
  "id": "proof-upload",
  "component": "upload",
  "rules": [{ "required": true, "message": "请上传附件" }]
}
```

### children（自定义上传按钮）

可以通过 `children` 自定义上传触发按钮：

```json
{
  "id": "custom-upload",
  "component": "upload",
  "children": ["upload-btn"]
}
```

然后在 `children` 中放置一个 `button` 组件作为上传按钮。

## 完整示例

### 基础单文件上传

```json
{
  "id": "avatar-upload",
  "component": "upload",
  "accept": "image/*",
  "value": { "path": "/avatar" },
  "on_change": { "action": "update_data", "path": "/avatar", "value": "${fileList}" }
}
```

### 多文件上传

```json
{
  "id": "proof-upload",
  "component": "upload",
  "multiple": true,
  "maxCount": 5,
  "accept": ".pdf,.jpg,.png",
  "showUploadList": true,
  "value": { "path": "/proofFiles" },
  "on_change": { "action": "update_data", "path": "/proofFiles", "value": "${fileList}" }
}
```

### 带必填校验

```json
{
  "id": "contract-upload",
  "component": "upload",
  "multiple": false,
  "accept": ".pdf",
  "rules": [{ "required": true, "message": "请上传合同" }],
  "value": { "path": "/contract" },
  "on_change": { "action": "update_data", "path": "/contract", "value": "${fileList}" }
}
```

### 自定义上传按钮

```json
[
  {
    "id": "custom-upload-box",
    "component": "box",
    "layout": "horizontal",
    "spacing": 12,
    "children": ["upload-btn", "file-list"]
  },
  {
    "id": "upload-btn",
    "component": "button",
    "label": "选择文件"
  },
  {
    "id": "file-list",
    "component": "upload",
    "multiple": true,
    "showUploadList": true,
    "children": ["upload-btn"]
  }
]
```

### 在表单中使用

```json
[
  {
    "id": "expense-form",
    "component": "form",
    "submitButtonId": "submit-btn",
    "children": ["amount-input", "invoice-upload", "submit-btn"]
  },
  {
    "id": "amount-input",
    "component": "input",
    "placeholder": "请输入报销金额",
    "value": { "path": "/amount" },
    "rules": [{ "required": true, "message": "请输入金额" }],
    "on_change": { "action": "update_data", "path": "/amount", "value": "${value}" }
  },
  {
    "id": "invoice-upload",
    "component": "upload",
    "multiple": true,
    "maxCount": 3,
    "accept": "image/*",
    "listType": "picture",
    "rules": [{ "required": true, "message": "请上传发票" }],
    "value": { "path": "/invoices" },
    "on_change": { "action": "update_data", "path": "/invoices", "value": "${fileList}" }
  },
  {
    "id": "submit-btn",
    "component": "button",
    "label": "提交报销",
    "on_tap": [
      { "action": "http_proxy", "payload": { "http_config": { "method": "POST", "path": "/api/expense" } } }
    ]
  }
]
```

## 新手常见问题

**Q: 上传后文件列表不显示？**
- 检查 `showUploadList` 是否设置为 `true`。
- 确认 `on_change` 配置了 `${fileList}`。

**Q: 如何限制上传文件的大小？**
- 目前 `upload` 组件暂不支持 `maxFileSize` 属性。
- 可以在 `httpRequest` 函数中对文件大小进行校验，不符合返回错误。

**Q: 上传的文件如何发送到后端？**
- 在 `http_proxy` 的 `http_body` 中，`${fileList}` 会作为文件列表数据传递。
- 具体上传方式（FormData / Base64）取决于后端接口约定。

**Q: 不想用默认的上传按钮样式？**
- 使用 `children` 自定义上传按钮。
- 注意：自定义按钮时，点击事件由 `upload` 组件内部处理，不需要给按钮配置 `on_tap`。

**Q: `value.path` 和 `on_change` 的 `${fileList}` 是什么格式？**
- `fileList` 是 Ant Design Upload 的 `FileList` 格式数组。
- 每个元素包含 `uid`、`name`、`status`、`url`/`response` 等字段。

**Q: 上传失败后如何处理？**
- 目前 `upload` 组件的错误处理需要通过 `onAction` 回调监听。
- 在 `Renderer` 上配置 `onAction` 可以获取上传等 action 的执行结果。
