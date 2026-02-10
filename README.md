# Halltoo AI Chat

基于 Next.js App Router 的智能 AI 聊天应用。

## 功能特性

- 🤖 支持多模型切换（GPT-4o、Claude 3.5 Sonnet）
- 💬 流式响应，实时显示 AI 回复
- 📱 响应式设计，支持移动端
- 🎨 极简黑白灰设计风格
- ✨ Markdown 渲染支持

## 快速开始

1. 安装依赖：
```bash
npm install
```

2. 配置环境变量（已配置在 `.env.local`）：
```
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
```

3. 启动开发服务器：
```bash
npm run dev
```

4. 打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 技术栈

- **框架**: Next.js 14 (App Router)
- **AI SDK**: Vercel AI SDK
- **模型提供商**: OpenAI、Anthropic
- **UI 组件**: Radix UI
- **样式**: Tailwind CSS
- **Markdown**: react-markdown
- **图标**: Lucide React

## 项目结构

```
├── app/
│   ├── api/chat/route.ts    # AI 聊天 API 路由
│   ├── page.tsx             # 主聊天界面
│   ├── layout.tsx           # 根布局
│   └── globals.css          # 全局样式
├── components/
│   ├── chat-message.tsx     # 消息组件
│   └── ui/                  # UI 组件库
├── lib/
│   └── utils.ts             # 工具函数
└── .env.local               # 环境变量
```

## 开发说明

- 后端使用 Edge Runtime 以获得更快的响应速度
- 前端使用 `useChat` hook 管理聊天状态
- 支持回车发送消息
- AI 回复支持 Markdown 格式

## License

MIT
