# input 组件

`input` 是单行文本输入框组件，适用于姓名、邮箱、手机号、标题等单行文本输入场景。

## 适用场景

- 用户名、密码输入
- 邮箱、手机号、证件号码
- 搜索框
- 任何需要用户输入单行文本的地方

## 核心属性

### placeholder（占位提示）

输入框为空时显示的提示文字：

```json
{
  "id": "name-input",
  "component": "input",
  "placeholder": "请输入姓名"
}
```

### value.path（数据绑定）

将输入框的值绑定到 `dataModel` 的某个字段。**这是实现数据读写的关键**。

```json
{
  "id": "name-input",
  "component": "input",
  "value": { "path": "/name" }
}
```

当用户在输入框中输入内容时，数据会保存到 `dataModel.name`。

### on_change（值变化事件）

**必须配置 `on_change`**，否则用户输入无法保存到数据模型中。

```json
{
  "id": "name-input",
  "component": "input",
  "placeholder": "请输入姓名",
  "value": { "path": "/name" },
  "on_change": {
    "action": "update_data",
    "path": "/name",
    "value": "${value}"
  }
}
```

**`${value}` 是特殊变量**，代表用户当前输入的值。

> `value.path` 和 `on_change` **必须同时配置**，缺一不可：
> - `value.path` 负责初始化时从 `dataModel` 读取默认值
> - `on_change` 负责将用户输入回写到 `dataModel`

### rules（校验规则）

配置输入校验规则，支持以下字段：

| 字段 | 类型 | 说明 |
|------|------|------|
| `required` | `boolean` | 是否必填 |
| `message` | `string` | 校验失败时的提示文案 |
| `type` | `string` | 值类型：`string`/`number`/`boolean`/`array`/`object`/`email`/`url` |
| `min` | `number` | 最小长度（字符串为字符数，数字为最小值） |
| `max` | `number` | 最大长度（字符串为字符数，数字为最大值） |
| `pattern` | `string` | 正则表达式（字符串） |
| `enum` | `array` | 允许的值列表 |
| `whitespace` | `boolean` | 是否允许纯空白 |

```json
{
  "id": "name-input",
  "component": "input",
  "placeholder": "请输入姓名",
  "value": { "path": "/name" },
  "rules": [
    { "required": true, "message": "请输入姓名" },
    { "min": 2, "message": "姓名至少 2 个字符" },
    { "max": 20, "message": "姓名最多 20 个字符" }
  ],
  "on_change": { "action": "update_data", "path": "/name", "value": "${value}" }
}
```

### validateTrigger（触发校验的时机）

| 值 | 何时触发校验 |
|---|-------------|
| `onChange`（默认） | 用户输入内容变化时 |
| `onBlur` | 输入框失去焦点时 |
| `["onChange", "onBlur"]` | 同时支持两种方式 |

```json
{
  "id": "email-input",
  "component": "input",
  "value": { "path": "/email" },
  "validateTrigger": ["onChange", "onBlur"],
  "rules": [
    { "required": true, "message": "请输入邮箱" },
    { "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", "message": "邮箱格式不正确" }
  ],
  "on_change": { "action": "update_data", "path": "/email", "value": "${value}" }
}
```

### rules 的完整示例

**必填校验**：
```json
{ "required": true, "message": "此项必填" }
```

**邮箱格式**：
```json
{ "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", "message": "请输入正确的邮箱格式" }
```

**手机号（国内11位）**：
```json
{ "pattern": "^1[3-9]\\d{9}$", "message": "请输入正确的手机号" }
```

**最小/最大长度**：
```json
{ "min": 6, "max": 18, "message": "密码长度 6-18 位" }
```

**枚举值**：
```json
{ "enum": ["男", "女", "保密"], "message": "请选择性别" }
```

## 完整示例

### 基础文本输入

```json
{
  "id": "username-input",
  "component": "input",
  "placeholder": "请输入用户名",
  "value": { "path": "/username" },
  "rules": [
    { "required": true, "message": "用户名不能为空" },
    { "min": 3, "message": "用户名至少 3 个字符" }
  ],
  "on_change": { "action": "update_data", "path": "/username", "value": "${value}" }
}
```

### 邮箱输入框

```json
{
  "id": "email-input",
  "component": "input",
  "placeholder": "请输入邮箱",
  "value": { "path": "/email" },
  "validateTrigger": ["onChange", "onBlur"],
  "rules": [
    { "required": true, "message": "请输入邮箱" },
    { "pattern": "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", "message": "邮箱格式不正确" }
  ],
  "on_change": { "action": "update_data", "path": "/email", "value": "${value}" }
}
```

### 带初始值

在 `dataModel` 中设置初始值：

```json
{
  "dataModel": {
    "name": "张三"
  }
}
```

这样 `value: { "path": "/name" }` 的输入框初始化时就会显示"张三"。

## 新手常见问题

**Q: 输入内容后数据没有保存？**
- 检查是否配置了 `on_change`，且 `action` 为 `update_data`，`path` 与 `value.path` 一致。
- `on_change` 中的 `value` 必须写成 `"${value}"`（带 `${}` 语法），不能写成普通字符串。

**Q: 校验提示没有出现？**
- 检查字段是否放在了 `form` 组件内，并设置了 `submitButtonId`。
- 确认 `rules` 写在字段组件（`input`）上，而不是 `form` 上。

**Q: 如何设置输入框的宽度？**
- 使用 `style: { "width": "200px" }` 控制宽度。
- 默认宽度是 100%，会填满父容器。

**Q: 想限制只能输入数字？**
- 目前 `input` 组件本身没有 `type="number"` 属性。
- 可以通过 `pattern: "^\\d+$"` 限制只能输入数字，校验失败时会提示。

**Q: 初始值不显示？**
- 确认 `dataModel` 中对应的字段有值，且类型是字符串。
- 如果 `dataModel.name` 是 `""` 空字符串，输入框会显示为空，这是正常的。

**Q: 为什么有两个 `message`？**
- `rules` 是一个数组，可以配置多条规则，每条规则都可以有自己的 `message`。
- 校验时会按顺序检查，第一条失败的规则会显示对应的 `message`。
