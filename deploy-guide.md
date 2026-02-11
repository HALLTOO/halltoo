# 本地服务器部署指南

## 最简单方案：Ngrok（推荐新手）

### 1. 下载安装
- 访问：https://ngrok.com/download
- 下载 Windows 版本并解压

### 2. 注册账号
- 访问：https://dashboard.ngrok.com/signup
- 免费账号即可

### 3. 获取 Token
- 登录后访问：https://dashboard.ngrok.com/get-started/your-authtoken
- 复制你的 authtoken

### 4. 配置
```bash
ngrok config add-authtoken <你的token>
```

### 5. 启动项目
```bash
npm run build
npm start
```

### 6. 启动 Ngrok
在新的终端窗口运行：
```bash
ngrok http 3000
```

你会看到类似这样的输出：
```
Forwarding  https://abc123.ngrok.io -> http://localhost:3000
```

把这个 `https://abc123.ngrok.io` 地址分享给别人即可！

---

## 稳定方案：Cloudflare Tunnel（推荐长期使用）

### 优点
- 完全免费
- 可以绑定自己的域名
- 稳定性好
- 不限流量

### 步骤

1. **下载 cloudflared**
   - https://github.com/cloudflare/cloudflared/releases
   - 下载 `cloudflared-windows-amd64.exe`
   - 重命名为 `cloudflared.exe`

2. **登录**
   ```bash
   cloudflared tunnel login
   ```

3. **创建隧道**
   ```bash
   cloudflared tunnel create halltoo
   ```

4. **启动项目**
   ```bash
   npm run build
   npm start
   ```

5. **启动隧道（临时测试）**
   ```bash
   cloudflared tunnel --url http://localhost:3000
   ```
   
   会给你一个 `https://xxx.trycloudflare.com` 地址

6. **永久运行（可选）**
   如果要绑定域名并永久运行：
   ```bash
   cloudflared tunnel route dns halltoo chat.你的域名.com
   cloudflared tunnel run halltoo
   ```

---

## 使用 PM2 保持后台运行

### 安装 PM2
```bash
npm install -g pm2
```

### 启动服务
```bash
npm run build
pm2 start npm --name "halltoo" -- start
```

### 常用命令
```bash
pm2 list          # 查看运行状态
pm2 logs halltoo  # 查看日志
pm2 restart halltoo  # 重启
pm2 stop halltoo  # 停止
pm2 delete halltoo  # 删除
```

### 开机自启动
```bash
pm2 startup
pm2 save
```

---

## 快速启动脚本

我已经创建了 `start-server.bat`，双击运行即可启动服务器。

然后在另一个终端运行：
```bash
ngrok http 3000
```

就可以获得公网访问地址了！

---

## 注意事项

1. **环境变量**：确保 `.env.local` 文件中的 API keys 都已配置
2. **防火墙**：Windows 防火墙可能会弹窗，选择"允许访问"
3. **电脑不能关机**：作为服务器的电脑需要保持开机状态
4. **网络稳定**：确保网络连接稳定
5. **免费限制**：
   - Ngrok 免费版：1个隧道，每分钟40个连接
   - Cloudflare Tunnel：无限制

---

## 推荐配置

**日常使用**：Ngrok（简单快速）
**长期运行**：Cloudflare Tunnel + PM2（稳定可靠）
