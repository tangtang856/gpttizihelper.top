/**
 * IndexNow 自动化提交工具 (scripts/indexnow.js)
 * 支持向 Bing / IndexNow 搜索引擎快速推送新增或更新的网页 URL
 * 执行命令: npm run indexnow
 */

import https from 'https';
import fs from 'fs';
import path from 'path';

const DOMAIN = 'gpttizihelper.top';
const KEY = '8f4b5e67a91249b5812e9b01c1827439';
const KEY_LOCATION = `https://${DOMAIN}/${KEY}.txt`;

const distDir = path.resolve('dist');

if (!fs.existsSync(distDir)) {
  console.error('❌ dist 目录不存在，请先运行 npm run build！');
  process.exit(1);
}

function getAllUrls(dir, base = '') {
  let urls = [];
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      urls = urls.concat(getAllUrls(full, `${base}/${item}`));
    } else if (item === 'index.html') {
      const urlPath = base ? `${base}/` : '/';
      urls.push(`https://${DOMAIN}${urlPath}`);
    } else if (item.endsWith('.html') && item !== '404.html') {
      urls.push(`https://${DOMAIN}${base}/${item}`);
    }
  }
  return urls;
}

const urlList = getAllUrls(distDir);

console.log(`====================================================`);
console.log(`🚀 IndexNow 提交工具 - Bing SEO 专项推送`);
console.log(`🌐 站点域名: ${DOMAIN}`);
console.log(`🔑 API Key: ${KEY}`);
console.log(`📍 Key 位置: ${KEY_LOCATION}`);
console.log(`📋 准备推送的 URL 数量: ${urlList.length} 条`);
console.log(`====================================================`);

// 保存 public/indexnow.json
const payload = JSON.stringify({
  host: DOMAIN,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList: urlList,
}, null, 2);

fs.writeFileSync(path.resolve('public/indexnow.json'), payload, 'utf8');
if (fs.existsSync(distDir)) {
  fs.writeFileSync(path.join(distDir, 'indexnow.json'), payload, 'utf8');
}
console.log(`✓ 已生成 indexnow.json (共 ${urlList.length} 条 URL)`);

const options = {
  hostname: 'api.indexnow.org',
  port: 443,
  path: '/indexnow',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(payload),
    'User-Agent': 'GPTTiziHelper-IndexNow-Bot/1.0',
  },
};

const req = https.request(options, (res) => {
  console.log(`📡 IndexNow 响应状态码: ${res.statusCode} ${res.statusMessage}`);
  let resData = '';
  res.on('data', (chunk) => {
    resData += chunk;
  });
  res.on('end', () => {
    if (res.statusCode === 200 || res.statusCode === 202) {
      console.log('✅ IndexNow 推送成功！Bing 搜索引擎已接收全量 URL 索引请求。');
    } else {
      console.log(`ℹ️ 响应内容: ${resData || '(无消息体)'}`);
    }
  });
});

req.on('error', (e) => {
  console.error(`⚠️ IndexNow 请求网络异常: ${e.message}`);
});

req.write(payload);
req.end();
