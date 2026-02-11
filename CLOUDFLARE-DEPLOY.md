# Cloudflare Pages 部署指南

## 步骤 1: 访问 Cloudflare Pages

1. 打开浏览器访问：https://dash.cloudflare.com/
2. 注册/登录账号（完全免费，无需信用卡）
3. 点击左侧菜单 "Workers & Pages"
4. 点击 "Create application"
5. 选择 "Pages" 标签
6. 点击 "Connect to Git"

## 步骤 2: 连接 GitHub

1. 点击 "Connect GitHub"
2. 授权 Cloudflare 访问你的 GitHub
3. 选择仓库：`HALLTOO/halltoo`
4. 点击 "Begin setup"

## 步骤 3: 配置构建设置

在配置页面填写：

- **Project name**: `halltoo-chat` (或任意名称)
- **Production branch**: `main`
- **Framework preset**: 选择 `Next.js`
- **Build command**: `npm run build`
- **Build output directory**: `.next`

## 步骤 4: 配置环境变量

点击 "Environment variables" 展开，添加以下变量：

```
ANTHROPIC_API_KEY = 你的Anthropic API密钥
OPENAI_API_KEY = 你的OpenAI API密钥
DEEPSEEK_API_KEY = 你的DeepSeek API密钥
NEXT_PUBLIC_EMAILJS_SERVICE_ID = service_7zoqayo
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = y0l6fwSRffm6D74NL
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 你的EmailJS模板ID
```

## 步骤 5: 部署

1. 点击 "Save and Deploy"
2. 等待构建完成（约 2-5 分钟）
3. 构建成功后会显示你的网站地址：`https://halltoo-chat.pages.dev`

## 步骤 6: 自定义域名（可选）

1. 在项目页面点击 "Custom domains"
2. 点击 "Set up a custom domain"
3. 输入你的域名（如果有的话）
4. 按照提示配置 DNS

---

## ⚠️ 重要提示

Cloudflare Pages 对 Next.js 的支持有限制：

- ✅ 支持：静态页面、API Routes、SSR
- ❌ 不支持：某些 Next.js 高级特性

如果部署失败，建议使用以下替代方案：

### 替代方案 1: Vercel（推荐）
```bash
npm install -g vercel
vercel login
vercel
```

### 替代方案 2: Render
1. 访问：https://render.com/
2. 用 GitHub 登录
3. New → Web Service
4. 连接仓库
5. 设置：
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

### 替代方案 3: Railway
1. 访问：https://railway.app/
2. 用 GitHub 登录
3. New Project → Deploy from GitHub repo

---

## 常见问题

**Q: 构建失败怎么办？**
A: 查看构建日志，通常是环境变量未配置或依赖问题。

**Q: 网站可以访问但功能不正常？**
A: 检查环境变量是否都已正确配置。

**Q: 如何更新网站？**
A: 只需推送代码到 GitHub，Cloudflare Pages 会自动重新部署。

```bash
git add .
git commit -m "更新内容"
git push
```

**Q: 完全免费吗？**
A: 是的，Cloudflare Pages 完全免费，无限带宽，无需信用卡。
