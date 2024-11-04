@echo off
chcp 65001 >nul
setlocal

rem 检查 Python
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Python已安装.
) else (
    echo Python未安装.
)

rem 检查 Node.js
node --version >nul 2>&1
if %errorlevel% equ 0 (
    echo Node.js已安装.
) else (
    echo Node.js未安装.
)

endlocal
pause
