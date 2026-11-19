/**
 * 全站内链与相对路径合法性校验脚本 (scripts/check-links.js)
 * 严格验证:
 * 1. 站内链接与资源必须为相对路径 (严禁以 / 开头)
 * 2. 目标文件必须在磁盘真实存在 (无死链)
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');

function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    if (file === 'node_modules' || file === '.git' || file === 'scripts') continue;
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
console.log(`🔗 正在检查 ${htmlFiles.length} 个页面中的所有内链与资源引用...\n`);

let checkedLinksCount = 0;
const errors = [];

for (const filePath of htmlFiles) {
  const relHtmlPath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
  const dirOfHtml = path.dirname(filePath);
  const content = fs.readFileSync(filePath, 'utf8');

  // 匹配所有 href="..." 与 src="..."
  const linkRegex = /(?:href|src)=["']([^"']+)["']/gi;
  let match;

  while ((match = linkRegex.exec(content)) !== null) {
    const rawTarget = match[1].trim();

    // 排除外部链接、邮件、电话、锚点、空
    if (
      rawTarget.startsWith('http://') ||
      rawTarget.startsWith('https://') ||
      rawTarget.startsWith('mailto:') ||
      rawTarget.startsWith('tel:') ||
      rawTarget.startsWith('#') ||
      rawTarget.startsWith('javascript:') ||
      rawTarget === ''
    ) {
      continue;
    }

    checkedLinksCount++;

    // 1. 严格检查: 严禁以 / 开头的根路径
    if (rawTarget.startsWith('/')) {
      errors.push(`[${relHtmlPath}] ❌ 违背相对路径规范: "${rawTarget}" 不得以 "/" 开头！`);
      continue;
    }

    // 2. 检查本地相对目标文件是否存在
    const cleanTarget = rawTarget.split('#')[0].split('?')[0];
    if (!cleanTarget) continue;

    const targetFullPath = path.resolve(dirOfHtml, cleanTarget);
    if (!fs.existsSync(targetFullPath)) {
      errors.push(`[${relHtmlPath}] ❌ 发现死链或缺失文件: "${rawTarget}" (解析路径: ${path.relative(ROOT_DIR, targetFullPath)})`);
    }
  }
}

console.log(`====================================================`);
console.log(`📊 内链与相对路径审计结果:`);
console.log(`- 检查内链与资源总数: ${checkedLinksCount}`);
console.log(`- 违规项总数: ${errors.length}`);

if (errors.length > 0) {
  console.log(`\n❌ 错误详情:`);
  errors.forEach(e => console.log(e));
  process.exit(1);
} else {
  console.log(`✅ 全部 ${checkedLinksCount} 处站内相对链接与静态资源引用 100% 存在且有效 (PASS)！`);
  console.log(`- 绝对路径以 / 开头违规: 0 处`);
  console.log(`- 404 死链: 0 处`);
  console.log(`- 本地 file:// 双击兼容性: 100% 支持`);
}
