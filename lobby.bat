@echo off
chcp 65001 >nul

set FLAG_FILE=first_run.flag
set PROXY_ADDRESS=http://127.0.0.1:8080

echo 正在启动代理...
reg query "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable | find "0x1" >nul
if %errorlevel%==0 (
    echo 代理已经处于开启状态，跳过代理设置。
) else (
    echo 正在启动代理...
    reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyEnable /t REG_DWORD /d 1 /f
    reg add "HKCU\Software\Microsoft\Windows\CurrentVersion\Internet Settings" /v ProxyServer /t REG_SZ /d %PROXY_ADDRESS% /f
    rundll32.exe InetCpl.cpl,ClearMyTracksByProcess 8
    
    rem 打开网络和 Internet 设置中的代理页面 (Win10已测试)
    start ms-settings:network-proxy
    echo 请在打开的窗口中点击保存设置，保存后在该界面按任意键继续下一步。
    
    echo 完成操作后请重新启动
    choice /n /d y /t 10
)

if not exist %FLAG_FILE% (
    echo 正在设置 pip 镜像源和安装依赖...
    pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
    pip install mitmproxy
    npm config set registry https://registry.yarnpkg.com
    npm install axios
    npm install express

    echo 已完成初次设置 > %FLAG_FILE%
) else (
    echo 已完成初次设置，跳过依赖安装。
)

start node .\project\lobby.js

set "GAME_URL=com.epicgames.launcher://apps/fn%%3A4fe75bbc5a674f4f9b356b5c90567da5%%3AFortnite?action=launch&silent=true"
start "" "%GAME_URL%"

mitmproxy -p 8080 -s .\project\redirect.py
