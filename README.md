# Fortnite 简体中文大厅背景修复（Windows）

## 实现原理
获取 Fortnite 英文api中的大厅背景数据，并将其拼接到简体中文的api中

**使用前置**
- 确保已安装Python([Python官网]https://www.python.org/downloads/)
- 确保已安装Nodejs([Nodejs官网]https://nodejs.org/en/)

## 使用方法

1. 运行lobby.bat文件
2. 前往 Windows设置 -> 网络和 Internet -> 代理 -> 开启“手动设置代理” -> 地址"127.0.0.1" 端口"8080" -> 保存
3. 下载安装mitmproxy证书([证书下载地址]http://mitm.it/)
  - 确保第2步开始运行后才可下载证书
4. 运行 Fortnite

**注意事项**

1. 使用期间不要关闭开启的两个窗口
2. 使用完毕后一定要关闭 Windows设置 中的代理！
3. 尽量不要在游戏开启时运行 Discord