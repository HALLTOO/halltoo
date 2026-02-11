# 免费云服务器部署指南

## ⚠️ Cloudflare Pages 不支持标准 Next.js

Cloudflare Pages 需要使用特殊适配器，配置复杂。推荐使用以下完全免费的替代方案：

---

## 方案 1: Render（最推荐 - 完全免费）

### 优点
- ✅ 完全免费，无需信用卡
- ✅ 自动 HTTPS
- ✅ 支持完整 Next.js 功能
- ✅ 自动从 GitHub 部署
- ⚠️ 15分钟无访问会休眠（首次访问需等待30秒启动）

### 部署步骤

1. **访问 Render**
   - 打开：https://render.com/
   - 点击 "Get Started for Free"
   - 用 GitHub 账号登录

2. **创建 Web Service**
   - 点击 "New +" → "Web Service"
   - 点击 "Connect account" 连接 GitHub
   - 选择仓库：`HALLTOO/halltoo`
   - 点击 "Connect"

3. **配置设置**
   - **Name**: `halltoo-chat`
   - **Region**: 选择离你最近的（Singapore 或 Frankfurt）
   - **Branch**: `main`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: 选择 `Free`

4. **添加环境变量**
   点击 "Advanced" → "Add Environment Variable"，添加：
   ```
   ANTHROPIC_API_KEY = 你的密钥
   OPENAI_API_KEY = 你的密钥
   DEEPSEEK_API_KEY = 你的密钥
   NEXT_PUBLIC_EMAILJS_SERVICE_ID = service_7zoqayo
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = y0l6fwSRffm6D74NL
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 你的模板ID
   ```

5. **部署**
   - 点击 "Create Web Service"
   - 等待 5-10 分钟构建完成
   - 完成后会得到地址：`https://halltoo-chat.onrender.com`

---

## 方案 2: Vercel（最简单 - 需要手机号）

### 优点
- ✅ Next.js 官方平台，完美支持
- ✅ 不会休眠，速度最快
- ✅ 免费额度充足
- ⚠️ 需要绑定手机号验证

### 部署步骤

1. **安装 Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **登录并部署**
   ```bash
   vercel login
   vercel
   ```

3. **按提示操作**
   - 选择 "Link to existing project?" → No
   - 输入项目名称
   - 等待部署完成

4. **配置环境变量**
   ```bash
   vercel env add ANTHROPIC_API_KEY
   vercel env add OPENAI_API_KEY
   vercel env add DEEPSEEK_API_KEY
   vercel env add NEXT_PUBLIC_EMAILJS_SERVICE_ID
   vercel env add NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
   vercel env add NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
   ```

5. **重新部署**
   ```bash
   vercel --prod
   ```

---

## 方案 3: Railway（新用户免费）

### 优点
- ✅ $5 免费额度（约 500 小时运行时间）
- ✅ 不会休眠
- ✅ 配置简单
- ⚠️ 额度用完需充值

### 部署步骤

1. **访问 Railway**
   - 打开：https://railway.app/
   - 用 GitHub 登录

2. **创建项目**
   - 点击 "New Project"
   - 选择 "Deploy from GitHub repo"
   - 选择 `HALLTOO/halltoo`

3. **配置环境变量**
   - 点击项目 → "Variables"
   - 添加所有环境变量

4. **等待部署**
   - Railway 会自动检测 Next.js 并部署
   - 完成后点击 "Generate Domain" 获取访问地址

---

## 方案 4: Zeabur（国内友好）

### 优点
- ✅ 每月 $5 免费额度
- ✅ 国内访问速度快
- ✅ 中文界面
- ⚠️ 额度用完需充值

### 部署步骤

1. **访问 Zeabur**
   - 打开：https://zeabur.com/
   - 用 GitHub 登录

2. **创建项目**
   - 点击 "Create Project"
   - 点击 "Deploy New Service"
   - 选择 "GitHub" → 选择仓库

3. **配置环境变量**
   - 点击服务 → "Environment Variables"
   - 添加所有环境变量

4. **生成域名**
   - 点击 "Networking" → "Generate Domain"
   - 获取访问地址

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


---

## 🎯 推荐选择

**如果不想网站休眠**: Vercel（需要手机号）或 Railway（有免费额度）
**如果完全免费**: Render（会休眠但完全免费）
**如果国内访问**: Zeabur（中文界面，国内友好）

---

## 常见问题

**Q: 哪个最简单？**
A: Render 最简单，网页操作，5分钟搞定。

**Q: 哪个最快？**
A: Vercel 最快，但需要手机号验证。

**Q: 哪个完全免费？**
A: Render 完全免费，但会休眠。Railway 和 Zeabur 有免费额度。

**Q: 如何更新网站？**
A: 只需推送代码到 GitHub，会自动重新部署：
```bash
git add .
git commit -m "更新"
git push
```
