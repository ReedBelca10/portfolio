@echo off
REM ==========================================
REM Portfolio Project - Setup Script (Windows)
REM ==========================================

echo.
echo Portfolio Project Setup
echo ==========================
echo.

REM Check Node.js
node --version >nul 2>&1
if errorlevel 1 (
    echo Node.js not found. Please install Node.js ^>= 18.17.0
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo Node.js %NODE_VERSION% found
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo npm %NPM_VERSION% found
echo.

REM Install dependencies
echo Installing dependencies...
call npm install
if errorlevel 1 (
    echo Failed to install dependencies
    exit /b 1
)
echo Dependencies installed
echo.

REM Create .env.local if not exists
if not exist ".env.local" (
    echo Creating .env.local...
    copy .env.example .env.local
    echo .env.local created - please edit with your credentials
) else (
    echo .env.local already exists
)
echo.

REM Display next steps
echo Setup completed!
echo.
echo Next steps:
echo 1. Edit .env.local with your configuration
echo 2. Start Docker: docker-compose up -d
echo 3. Start Strapi: cd apps\cms ^&^& npm run develop
echo 4. Start Frontend: npm run dev:frontend
echo 5. Open http://localhost:3000
echo.
echo Documentation:
echo - Getting Started: docs/GETTING_STARTED.md
echo - Architecture: docs/ARCHITECTURE.md
echo - Deployment: docs/DEPLOYMENT.md
echo.

pause
