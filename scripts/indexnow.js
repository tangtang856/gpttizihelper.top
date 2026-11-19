/**
 * IndexNow 自动化提交工具 (scripts/indexnow.js)
 * 支持向 Bing / IndexNow 搜索引擎快速推送新增或更新的网页 URL
 * 执行命令: npm run indexnow
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const DOMAIN = 'gpttizihelper.top';
const KEY = '8f4b5e67a91249b5812e9b01c1827439';
const KEY_LOCATION = `https://${DOMAIN}/${KEY}.txt`;

// 读取 indexnow.json 中的全站 URL 清单
const configPath = path.join(__dirname, '../indexnow.json');
if (!fs.existsSync(configPath)) {
  console.error('❌ 未找到 indexnow.json 配置文件！');
  process.exit(1);
}

const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
const urlList = config.urlList || [];

console.log(`====================================================`);
console.log(`🚀 IndexNow 提交工具 - Bing SEO 专项推送`);
console.log(`🌐 站点域名: ${DOMAIN}`);
console.log(`🔑 API Key: ${KEY}`);
console.log(`📍 Key 位置: ${KEY_LOCATION}`);
console.log(`📋 准备推送的 URL 数量: ${urlList.length} 条`);
console.log(`====================================================`);

// 本地 Key 文件自检
const localKeyFile = path.join(__dirname, `../${KEY}.txt`);
if (!fs.existsSync(localKeyFile)) {
  console.warn(`⚠️ 警告: 本地未找到 ${KEY}.txt 验证文件，上传至服务器后请确保可通过 ${KEY_LOCATION} 访问！`);
} else {
  console.log(`✓ 本地验证文件 ${KEY}.txt 检查通过。`);
}

// 构造提交 Payload
const payload = JSON.stringify({
  host: DOMAIN,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urlList
});

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
    'User-Agent': 'GPTTiziHelper-IndexNow-Bot/1.0'
  }
};

console.log('📡 正在向 api.indexnow.org 发送 POST 请求...');

const req = https.request(options, (res) => {
  let resData = '';
  res.on('data', (chunk) => {
    resData += chunk;
  });

  res.on('end', () => {
    console.log(`📥 响应状态码: ${res.statusCode} ${res.statusMessage}`);
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log('✅ IndexNow 提交成功！Bing 搜索引擎已接收推送队列。');
      console.log('💡 注意: IndexNow 提交成功代表 Bing 已知悉该批 URL，具体收录与建立索引取决于 Bing 爬虫调度周期。');
    } else {
      console.log(`ℹ️ 服务器响应内容: ${resData || '(无返回主体)'}`);
      if (res.statusCode === 403) {
        console.warn('⚠️ 403 错误通常表示域名尚未上线部署，或 Key 验证文件无法通过公网 HTTP 访问。上线部署后再执行即可。');
      }
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ 请求出现网络错误: ${e.message}`);
});

req.write(payload);
req.end();
