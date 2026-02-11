# 完全免费部署方案（无需绑卡）

## 方案 1: Zeabur（推荐 - 国内友好）

### 优点
- ✅ 每月 $5 免费额度（约 500 小时）
- ✅ 不需要绑卡
- ✅ 中文界面
- ✅ 国内访问速度快
- ✅ 不会休眠

### 部署步骤

1. **访问 Zeabur**
   - 打开：https://zeabur.com/
   - 点击右上角 "登录"
   - 选择 "使用 GitHub 登录"

2. **创建项目**
   - 点击 "创建项目"
   - 输入项目名称：`halltoo-chat`
   - 点击 "创建"

3. **部署服务**
   - 在项目页面点击 "部署新服务"
   - 选择 "GitHub"
   - 选择仓库：`HALLTOO/halltoo`
   - 点击 "部署"

4. **配置环境变量**
   - 点击服务卡片
   - 点击 "变量" 标签
   - 添加以下环境变量：
     ```
     ANTHROPIC_API_KEY = 你的密钥
     OPENAI_API_KEY = 你的密钥
     DEEPSEEK_API_KEY = 你的密钥
     NEXT_PUBLIC_EMAILJS_SERVICE_ID = service_7zoqayo
     NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = y0l6fwSRffm6D74NL
     NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 你的模板ID
     ```

5. **生成域名**
   - 点击 "网络" 标签
   - 点击 "生成域名"
   - 会得到一个 `.zeabur.app` 域名

6. **等待部署完成**
   - 查看 "部署" 标签的日志
   - 等待构建完成（约 3-5 分钟）

---

## 方案 2: Railway（新用户免费）

### 优点
- ✅ 新用户 $5 免费额度
- ✅ 不需要绑卡（新用户）
- ✅ 不会休眠
- ✅ 配置简单

### 部署步骤

1. **访问 Railway**
   - 打开：https://railway.app/
   - 点击 "Login"
   - 选择 "Login with GitHub"

2. **创建项目**
   - 点击 "New Project"
   - 选择 "Deploy from GitHub repo"
   - 选择 `HALLTOO/halltoo`

3. **配置环境变量**
   - 点击项目卡片
   - 点击 "Variables" 标签
   - 点击 "New Variable"
   - 添加所有环境变量：
     ```
     ANTHROPIC_API_KEY = 你的密钥
     OPENAI_API_KEY = 你的密钥
     DEEPSEEK_API_KEY = 你的密钥
     NEXT_PUBLIC_EMAILJS_SERVICE_ID = service_7zoqayo
     NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = y0l6fwSRffm6D74NL
     NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = 你的模板ID
     ```

4. **生成域名**
   - 点击 "Settings" 标签
   - 找到 "Networking" 部分
   - 点击 "Generate Domain"
   - 会得到一个 `.railway.app` 域名

5. **等待部署**
   - Railway 会自动检测 Next.js 并部署
   - 查看 "Deployments" 标签查看进度

---

## 方案 3: Koyeb（完全免费）

### 优点
- ✅ 完全免费
- ✅ 不需要绑卡
- ✅ 不会休眠
- ✅ 全球 CDN

### 部署步骤

1. **访问 Koyeb**
   - 打开：https://www.koyeb.com/
   - 点击 "Sign Up"
   - 选择 "Sign up with GitHub"

2. **创建应用**
   - 点击 "Create App"
   - 选择 "GitHub"
   - 选择仓库：`HALLTOO/halltoo`

3. **配置构建**
   - Builder: `Buildpack`
   - Build command: `npm install && npm run build`
   - Run command: `npm start`

4. **添加环境变量**
   - 展开 "Environment variables"
   - 添加所有环境变量

5. **部署**
   - 点击 "Deploy"
   - 等待部署完成

---

## 方案 4: Fly.io（免费版）

### 优点
- ✅ 3 个免费应用
- ✅ 不需要绑卡
- ✅ 全球部署
- ✅ 不会休眠

### 部署步骤

1. **安装 Fly CLI**
   ```bash
   powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
   ```

2. **重启终端后登录**
   ```bash
   fly auth login
   ```

3. **初始化项目**
   ```bash
   fly launch
   ```
   
   按提示操作：
   - App name: `halltoo-chat`
   - Region: 选择离你最近的
   - 不需要 PostgreSQL
   - 不需要 Redis

4. **配置环境变量**
   ```bash
   fly secrets set ANTHROPIC_API_KEY="你的密钥"
   fly secrets set OPENAI_API_KEY="你的密钥"
   fly secrets set DEEPSEEK_API_KEY="你的密钥"
   fly secrets set NEXT_PUBLIC_EMAILJS_SERVICE_ID="service_7zoqayo"
   fly secrets set NEXT_PUBLIC_EMAILJS_PUBLIC_KEY="y0l6fwSRffm6D74NL"
   fly secrets set NEXT_PUBLIC_EMAILJS_TEMPLATE_ID="你的模板ID"
   ```

5. **部署**
   ```bash
   fly deploy
   ```

---

## 🎯 推荐选择

1. **Zeabur** - 中文界面，国内访问快，最简单
2. **Railway** - 界面漂亮，配置简单
3. **Koyeb** - 完全免费，全球 CDN
4. **Fly.io** - 命令行部署，适合开发者

---

## 💡 提示

- 所有方案都支持自动部署：推送代码到 GitHub 会自动重新部署
- 免费额度用完后可以换另一个平台
- 建议先试 Zeabur（最简单）

---

## 🔄 更新网站

所有方案都支持自动部署，只需：
```bash
git add .
git commit -m "更新"
git push
```
