# Fortnite 简体中文大厅背景修复（Windows）

## 实现原理
获取 Fortnite 英文api中的大厅背景数据，并将其拼接到简体中文的api中

**使用前置**
- 确保已安装Python([Python官网](https://www.python.org/downloads/))
  - 安装Python时请选择 Add to PATH 选项 (打开安装包时的页面的底部)
- 确保已安装Nodejs([Nodejs官网](https://nodejs.org/en/))
  - 以上两项是否安装成功，可通过运行文件 checkInstalled.bat 进行检查

**主要功能**
1. 修复简体中文无大厅背景的问题。
2. 添加了中文api缺失的数据“mediaStreamingRadio”。
3. 修复了简体中文无法听到车载广播的问题，更新了4个电台，添加了2个电台（含偶像电台）。

## 使用方法

1. 运行lobby.bat文件
2. 下载安装mitmproxy证书([证书下载地址](http://mitm.it/))
  - 确保第2步开始运行后才可下载证书
  - 仅第一次使用需安装证书
3. 运行 Fortnite

**注意事项**

1. 使用期间不要关闭开启的两个窗口
2. 使用完毕后一定要关闭 Windows设置 中的代理！
 - 代理可通过 disableProxy.bat 自动关闭
3. 尽量不要在游戏开启时运行 Discord
4. 代理开启时可能会影响部分网站的浏览/下载

## 其他说明

- 作者2606027联系方式([Bilibili](https://space.bilibili.com/17759143))(QQ:3032528047)
- 其他下载链接([百度网盘](https://pan.baidu.com/s/13GWu7nIu4lxekEfXqgKvaQ?pwd=c260))