@echo off
echo 正在启动 Halltoo 聊天服务器...
echo.

REM 使用 PM2 启动 Next.js
pm2 start ecosystem.config.js

echo.
echo 服务器已启动在 http://localhost:3000
echo.
echo 现在请在另一个终端运行以下命令之一来暴露到公网：
echo.
echo 方案1 - Ngrok:
echo   ngrok http 3000
echo.
echo 方案2 - Cloudflare Tunnel:
echo   cloudflared tunnel run halltoo
echo.
echo 方案3 - Localtunnel:
echo   npx localtunnel --port 3000
echo.
pause
