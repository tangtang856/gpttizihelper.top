/**
 * 全站 SEO 规范自动化审计脚本 (scripts/audit-seo.js)
 * 检查项: Title/Meta Description/H1/Canonical/Robots/Schema/Sitemap
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const DOMAIN = 'gpttizihelper.top';

// 递归获取所有 HTML 文件
function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git') continue;
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getHtmlFiles(ROOT_DIR);
console.log(`🔍 正在审计 ${htmlFiles.length} 个 HTML 页面 SEO 元数据...\n`);

let passCount = 0;
let failCount = 0;
const errors = [];
const titlesSeen = new Map();

for (const filePath of htmlFiles) {
  const relPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
  const content = fs.readFileSync(filePath, 'utf8');

  // 1. Title 检查
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    errors.push(`[${relPath}] ❌ 缺失 <title> 标签`);
    failCount++;
  } else {
    const titleText = titleMatch[1].trim();
    if (titlesSeen.has(titleText)) {
      errors.push(`[${relPath}] ❌ 与 [${titlesSeen.get(titleText)}] 重复 Title: "${titleText}"`);
      failCount++;
    } else {
      titlesSeen.set(titleText, relPath);
    }
  }

  // 2. Meta Description 检查
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  if (!descMatch || !descMatch[1].trim()) {
    errors.push(`[${relPath}] ❌ 缺失或存在空的 meta description`);
    failCount++;
  }

  // 3. H1 标签唯一性检查
  const h1Matches = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  if (!h1Matches || h1Matches.length === 0) {
    errors.push(`[${relPath}] ❌ 缺失 <h1> 标签`);
    failCount++;
  } else if (h1Matches.length > 1) {
    errors.push(`[${relPath}] ❌ 存在多个 <h1> 标签 (${h1Matches.length} 个)`);
    failCount++;
  }

  // 4. Canonical 检查
  const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  if (!canonicalMatch || !canonicalMatch[1].trim()) {
    errors.push(`[${relPath}] ❌ 缺失 canonical 声明`);
    failCount++;
  } else if (!canonicalMatch[1].startsWith(`https://${DOMAIN}/`)) {
    errors.push(`[${relPath}] ❌ Canonical 域名错误: ${canonicalMatch[1]}`);
    failCount++;
  }

  // 5. Robots Meta 检查
  const robotsMatch = content.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i);
  if (!robotsMatch || !robotsMatch[1].includes('index')) {
    errors.push(`[${relPath}] ❌ Robots 声明异常或缺失: ${robotsMatch ? robotsMatch[1] : 'none'}`);
    failCount++;
  }

  // 6. Schema.org 检查 (若存在)
  const schemaMatches = content.match(/<script type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi);
  if (schemaMatches) {
    for (const sm of schemaMatches) {
      const jsonStr = sm.replace(/<script[^>]*>/i, '').replace(/<\/script>/i, '');
      try {
        JSON.parse(jsonStr);
      } catch (e) {
        errors.push(`[${relPath}] ❌ Schema JSON-LD 语法解析错误: ${e.message}`);
        failCount++;
      }
    }
  }
}

// 7. Sitemap 与 Robots.txt 检查
const sitemapPath = path.join(ROOT_DIR, 'sitemap.xml');
if (!fs.existsSync(sitemapPath)) {
  errors.push(`[全站] ❌ sitemap.xml 文件缺失`);
  failCount++;
} else {
  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  if (!sitemapContent.includes(`https://${DOMAIN}/`)) {
    errors.push(`[sitemap.xml] ❌ 未正确声明正式域名`);
    failCount++;
  }
}

const robotsPath = path.join(ROOT_DIR, 'robots.txt');
if (!fs.existsSync(robotsPath)) {
  errors.push(`[全站] ❌ robots.txt 文件缺失`);
  failCount++;
}

console.log(`====================================================`);
console.log(`📊 SEO 审计结果:`);
console.log(`- 审计页面总数: ${htmlFiles.length}`);
console.log(`- 发现违规项: ${errors.length}`);
if (errors.length > 0) {
  console.log(`\n❌ 错误清单:`);
  errors.forEach(e => console.log(e));
  process.exit(1);
} else {
  console.log(`✅ 全部 ${htmlFiles.length} 个页面 SEO 元数据审计 100% 通过 (PASS)！`);
  console.log(`- 独立 Title: 100% 合格`);
  console.log(`- 独立 Description: 100% 合格`);
  console.log(`- 唯一 H1: 100% 合格`);
  console.log(`- Canonical 标签: 100% 合格`);
  console.log(`- Robots 声明: 100% 合格`);
  console.log(`- Sitemap/Robots: 100% 合格`);
}
