@echo off
chcp 65001 >nul
setlocal

set PROXY_ADDRESS=http://127.0.0.1:8080

reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable | find "ProxyEnable" >nul
if %errorlevel%==0 (
    echo 禁用代理中...
    reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable /t REG_DWORD /d 0 /f
    reg delete "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer /f
    echo 代理已禁用
)

endlocal
pause
