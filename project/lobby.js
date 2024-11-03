const axios = require("axios");
const express = require('express');
const app = express();
const port = 5600;

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function lobby_en(retries = 30) {
    const url = "https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game";
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await axios.get(url);
            const dynamicbackgrounds = response.data.dynamicbackgrounds;

            if (typeof dynamicbackgrounds === 'object' && !Array.isArray(dynamicbackgrounds)) {
                dynamicbackgrounds._locale = 'zh-CN';
            }
            console.log('成功获取大厅背景信息');
            return dynamicbackgrounds;
        } catch (err) {
            if (err.code === 'ECONNRESET') {
                console.warn(`连接重置，开始第${attempt}次重试...`);
                await sleep(1000);
            } else {
                console.error('无法获取大厅背景信息：', err);
                return null;
            }
        }
    }
    console.error('无法获取大厅背景信息：超过最大重试次数');
    return null;
}

async function lobby_zh(retries = 30) {
    const url = "https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game";
    const headers = {
        'accept-language': 'zh-CN,zh;q=0.9'
    };

    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const response = await axios.get(url, { headers });
            const data = response.data;
            const dynamicbackgrounds = await lobby_en();

            if (dynamicbackgrounds) {
                data.dynamicbackgrounds = dynamicbackgrounds;
            }
            console.log('已添加API数据');
            return data;
        } catch (err) {
            if (err.code === 'ECONNRESET') {
                console.warn(`连接重置，开始第${attempt}次重试...`);
                await sleep(1000);
            } else {
                console.error('无法获取简中API数据：', err);
                return null;
            }
        }
    }
    console.error('无法获取简中API数据：超过最大重试次数');
    return null;
}

app.get('/content/api/pages/fortnite-game', async (req, res) => {
    try {
        const data = await lobby_zh();
        if (data) {
            res.json(data);
        } else {
            res.status(404).send('没有找到数据');
        }
    } catch (err) {
        console.error('重定向时获取数据失败：', err);
        res.status(500).send('服务器错误');
    }
});

app.listen(port, () => {
    console.log(`监听端口：${port}`);
});
