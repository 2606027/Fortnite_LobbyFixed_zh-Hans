@echo off
chcp 65001 >nul

set FLAG_FILE=first_run.flag

if not exist %FLAG_FILE% (
    echo 正在设置 pip 镜像源和安装依赖...
    pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
    pip install flask
    npm config set registry https://registry.yarnpkg.com
    npm install axios
    npm install express

    echo 已完成初次设置 > %FLAG_FILE%
) else (
    echo 已完成初次设置，跳过依赖安装。
)

start node .\project\lobby.js

mitmproxy -s .\project\redirect.py
