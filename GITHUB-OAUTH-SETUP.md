# GitHub OAuth 设置指南

## 📋 环境变量配置

在 `.env.local` 文件中添加以下变量：

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id-here
GITHUB_CLIENT_SECRET=your-github-client-secret-here
```

---

## 🔑 获取 GitHub OAuth 凭证

### 步骤 1: 访问 GitHub Settings

1. 登录 GitHub
2. 点击右上角头像 → Settings
3. 左侧菜单滚动到底部，点击 "Developer settings"
4. 点击 "OAuth Apps"
5. 点击 "New OAuth App"

### 步骤 2: 创建 OAuth App

填写应用信息：

- **Application name**: `Halltoo Chat`
- **Homepage URL**: `http://localhost:3000` (开发环境)
- **Application description**: `AI Chat Assistant`
- **Authorization callback URL**: 
  ```
  http://localhost:3000/api/auth/callback/github
  ```

点击 "Register application"

### 步骤 3: 获取凭证

创建成功后：

1. 复制 **Client ID** 到 `GITHUB_CLIENT_ID`
2. 点击 "Generate a new client secret"
3. 复制 **Client Secret** 到 `GITHUB_CLIENT_SECRET`

⚠️ **重要**: Client Secret 只显示一次，请立即保存！

---

## 🔐 生成 NEXTAUTH_SECRET

在终端运行：

```bash
openssl rand -base64 32
```

或使用 Node.js：

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## 🚀 部署到生产环境

### 步骤 1: 添加生产环境回调 URL

回到 GitHub OAuth App 设置：

1. 在 "Authorization callback URL" 添加生产环境 URL：
   ```
   https://your-domain.com/api/auth/callback/github
   ```

### 步骤 2: 配置环境变量

在部署平台（Zeabur/Railway/Render）添加：

```
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-generated-secret
GITHUB_CLIENT_ID=your-client-id
GITHUB_CLIENT_SECRET=your-client-secret
```

---

## ✅ 测试

1. 启动开发服务器：
   ```bash
   npm run dev
   ```

2. 访问：http://localhost:3000/login

3. 点击 "Continue with GitHub"

4. 授权后应该自动跳转到聊天页面

---

## 🐛 常见问题

### 错误：redirect_uri_mismatch

**原因**：回调 URL 不匹配

**解决**：
1. 检查 GitHub OAuth App 中的回调 URL
2. 确保格式完全一致：`http://localhost:3000/api/auth/callback/github`
3. 注意 http vs https

### 错误：Application suspended

**原因**：GitHub 检测到可疑活动

**解决**：
1. 访问 GitHub OAuth App 设置
2. 按照提示验证应用

### 错误：NEXTAUTH_SECRET is not set

**原因**：环境变量未设置

**解决**：
1. 确保 `.env.local` 文件存在
2. 重启开发服务器
3. 检查变量名拼写

---

## 📚 相关文档

- NextAuth.js: https://next-auth.js.org/
- GitHub OAuth: https://docs.github.com/en/developers/apps/building-oauth-apps
- GitHub Developer Settings: https://github.com/settings/developers

---

## 🎉 完成！

现在你的应用已经支持 GitHub 登录了！

## 📋 环境变量配置

在 `.env.local` 文件中添加以下变量：

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id-here
GOOGLE_CLIENT_SECRET=your-google-client-secret-here
```

---

## 🔑 获取 Google OAuth 凭证

### 步骤 1: 访问 Google Cloud Console

1. 打开：https://console.cloud.google.com/
2. 登录你的 Google 账号

### 步骤 2: 创建项目

1. 点击顶部的项目下拉菜单
2. 点击 "新建项目"
3. 输入项目名称：`Halltoo Chat`
4. 点击 "创建"

### 步骤 3: 启用 Google+ API

1. 在左侧菜单选择 "API 和服务" → "库"
2. 搜索 "Google+ API"
3. 点击并启用

### 步骤 4: 配置 OAuth 同意屏幕

1. 在左侧菜单选择 "API 和服务" → "OAuth 同意屏幕"
2. 选择 "外部"（External）
3. 点击 "创建"
4. 填写必填信息：
   - 应用名称：`Halltoo`
   - 用户支持电子邮件：你的邮箱
   - 开发者联系信息：你的邮箱
5. 点击 "保存并继续"
6. 作用域页面：点击 "保存并继续"（使用默认）
7. 测试用户：添加你的 Google 邮箱（开发阶段）
8. 点击 "保存并继续"

### 步骤 5: 创建 OAuth 客户端 ID

1. 在左侧菜单选择 "API 和服务" → "凭据"
2. 点击 "创建凭据" → "OAuth 客户端 ID"
3. 应用类型：选择 "Web 应用"
4. 名称：`Halltoo Web Client`
5. 已获授权的 JavaScript 来源：
   ```
   http://localhost:3000
   https://your-production-domain.com
   ```
6. 已获授权的重定向 URI：
   ```
   http://localhost:3000/api/auth/callback/google
   https://your-production-domain.com/api/auth/callback/google
   ```
7. 点击 "创建"

### 步骤 6: 复制凭证

创建成功后会显示：
- **客户端 ID**：复制到 `GOOGLE_CLIENT_ID`
- **客户端密钥**：复制到 `GOOGLE_CLIENT_SECRET`

---

## 🔐 生成 NEXTAUTH_SECRET

在终端运行以下命令生成随机密钥：

```bash
openssl rand -base64 32
```

或者使用 Node.js：

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

将生成的字符串复制到 `NEXTAUTH_SECRET`。

---

## 🚀 部署到生产环境

### Zeabur / Railway / Render

在平台的环境变量设置中添加：

```
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-generated-secret
GOOGLE_CLIENT_ID=your-client-id
GOOGLE_CLIENT_SECRET=your-client-secret
```

### 重要提示

1. **回调 URL**：确保在 Google Cloud Console 中添加生产环境的回调 URL
2. **NEXTAUTH_URL**：必须是完整的域名（包括 https://）
3. **安全性**：永远不要将 `.env.local` 提交到 Git

---

## ✅ 测试

1. 启动开发服务器：
   ```bash
   npm run dev
   ```

2. 访问：http://localhost:3000/login

3. 点击 "Continue with Google" 按钮

4. 选择 Google 账号登录

5. 授权后应该自动跳转到聊天页面

---

## 🐛 常见问题

### 错误：redirect_uri_mismatch

**原因**：回调 URL 不匹配

**解决**：
1. 检查 Google Cloud Console 中的重定向 URI
2. 确保格式完全一致：`http://localhost:3000/api/auth/callback/google`
3. 注意 http vs https

### 错误：Access blocked: This app's request is invalid

**原因**：OAuth 同意屏幕未配置或应用未发布

**解决**：
1. 完成 OAuth 同意屏幕配置
2. 在测试阶段，添加测试用户
3. 或者发布应用（需要验证）

### 错误：NEXTAUTH_SECRET is not set

**原因**：环境变量未设置

**解决**：
1. 确保 `.env.local` 文件存在
2. 重启开发服务器
3. 检查变量名拼写

---

## 📚 相关文档

- NextAuth.js: https://next-auth.js.org/
- Google OAuth: https://developers.google.com/identity/protocols/oauth2
- Google Cloud Console: https://console.cloud.google.com/

---

## 🎉 完成！

现在你的应用已经支持 Google 登录了！
