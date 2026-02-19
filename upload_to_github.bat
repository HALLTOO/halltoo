@echo off
echo ========================================================
echo               Halltoo GitHub Upload Script
echo ========================================================

REM Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in your PATH.
    echo Please install Git first: https://git-scm.com/downloads
    echo After installing, please restart this terminal and run this script again.
    pause
    exit /b
)

echo [INFO] Git found. Proceeding...

REM Initialize Git repository
if not exist .git (
    echo [INFO] Initializing new Git repository...
    git init
) else (
    echo [INFO] Git repository already initialized.
)

REM Add all files
echo [INFO] Adding files...
git add .

REM Commit changes
echo [INFO] Committing changes...
git commit -m "Initial commit: halltoo full stack application"

REM Ask for GitHub repository URL
set /p REPO_URL="Enter your GitHub Repository URL (e.g., https://github.com/username/halltoo.git): "

if "%REPO_URL%"=="" (
    echo [ERROR] Repository URL cannot be empty.
    pause
    exit /b
)

REM Add remote origin
echo [INFO] Adding remote origin...
git remote add origin %REPO_URL% 2>nul
if %errorlevel% neq 0 (
    echo [WARN] Remote origin already exists. Updating it...
    git remote set-url origin %REPO_URL%
)

REM Push to GitHub
echo [INFO] Pushing to GitHub...
git branch -M main
git push -u origin main

echo ========================================================
echo               Upload Complete!
echo ========================================================
pause
