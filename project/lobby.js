const axios = require("axios");
const express = require('express');
// const path = require('path');
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
            const data = response.data;
            const dynamicbackgrounds = data.dynamicbackgrounds;
            // const mediaStreamingRadio = data.mediaStreamingRadio;
            const radioStations = data.radioStations

            if (typeof dynamicbackgrounds === 'object' && !Array.isArray(dynamicbackgrounds)) {
                dynamicbackgrounds._locale = 'zh-CN';
            }
            if (typeof mediaStreamingRadio === 'object' && !Array.isArray(mediaStreamingRadio)) {
                mediaStreamingRadio._locale = 'zh-CN';
            }
            if (typeof radioStations === 'object' && !Array.isArray(radioStations)) {
                radioStations._locale = 'zh-CN';
                if (Array.isArray(radioStations.radioStationList.stations)) {
                    radioStations.radioStationList.stations.forEach(station => {
                        const titleMapping = {
                            "Rock & Royale": "铁马广播",
                            "Party Royale": "空降派对",
                            "Beat Box": "流行音乐",
                            "Power Play": "流行广播",
                            "Radio Yonder": "远方广播",
                            "Icon Radio": "偶像广播"
                        };

                        if (titleMapping[station.title]) {
                            station.title = titleMapping[station.title];
                        }
                    })
                }
            }
            console.log('成功获取大厅背景信息');
            return { dynamicbackgrounds, radioStations };
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
            const { dynamicbackgrounds, radioStations } = await lobby_en();

            if (dynamicbackgrounds) {
                data.dynamicbackgrounds = dynamicbackgrounds;
            }
            if (radioStations) {
                data.radioStations = radioStations;
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

app.get('/content/api/pages/fortnite-game/*', async (req, res) => {
    const subPath = req.params[0];
    const url = `https://fortnitecontent-website-prod07.ol.epicgames.com/content/api/pages/fortnite-game/${subPath}`;
    const maxRetries = 30;
    let attempt = 0;
    const headers = {
        'accept-language': 'zh-CN,zh;q=0.9'
    }

    const fetchData = async () => {
        try {
            const response = await axios.get(url, { headers });
            res.json(response.data);
        } catch (err) {
            if (attempt < maxRetries && (err.code === 'ECONNRESET' || err.code === 'ETIMEDOUT')) {
                attempt++;
                console.warn(`获取其他api数据失败，第${attempt}次重试...`)
                setTimeout(fetchData, 1000);
            } else {
                console.error('获取其他api数据失败：', err);
                res.status(err.response?.status || 500).send(err.response?.data || '服务器错误');
            }
        }
    }
    fetchData();
});


// app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.listen(port, '0.0.0.0', () => {
    console.log(`监听端口：${port}`);
});
