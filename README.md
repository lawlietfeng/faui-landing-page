# faui-landing-page

[faui](https://github.com/lawlietfeng/faui) 表单版（Form Edition）的演示站点，包含 Agent 驱动的表单生成和组件文档。

**在线预览**: https://lawlietfeng.github.io/faui-landing-page/

## 页面结构

| 页面 | 路径 | 说明 |
|------|------|------|
| 首页 | `/` | 产品介绍 |
| 组件文档 | `/docs` | 表单相关组件的配置文档 |
| Agent 演示 | `/agent-demo` | 通过 [faui-agent](https://github.com/lawlietfeng/faui-agent) 对话式生成表单，实时预览 |

## 技术栈

- [faui](https://github.com/lawlietfeng/faui) — 表单版入口（~47 组件）
- [faui-agent](https://github.com/lawlietfeng/faui-agent) — AI Agent 表单生成
- React 19 + TypeScript
- Vite 8 + Ant Design + Tailwind CSS v4
- React Router v7

## 本地运行

```bash
# 前置：先构建 faui 和 faui-agent
cd ../faui && npm install && npm run build
cd ../faui-agent && npm install && npm run build

# 安装依赖并启动
cd ../faui-landing-page
npm install
npm run dev
```

## 项目结构

```
src/
├── assets/
│   └── prompt.md              # AI 表单生成提示词
├── components/                # 公共组件（导航、主题切换）
├── pages/
│   ├── Home/                  # 首页
│   ├── AgentDemo/             # Agent 演示（对话式表单生成）
│   └── Docs/                  # 组件文档
├── App.tsx
└── main.tsx
```

## 相关项目

| 项目 | 说明 |
|------|------|
| [faui](https://github.com/lawlietfeng/faui) | JSON Schema UI 渲染器（本站使用的 Form Edition） |
| [faui-agent](https://github.com/lawlietfeng/faui-agent) | AI Agent 框架，Agent 演示页面的核心依赖 |
| [full-landing-page](https://github.com/lawlietfeng/full-landing-page) | faui 完整版的组件示例站点 |

## License

[Apache-2.0](./LICENSE)
