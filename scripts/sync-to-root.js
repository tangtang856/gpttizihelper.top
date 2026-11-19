import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');
const rootDir = path.resolve('.');

if (!fs.existsSync(distDir)) {
  console.error('❌ dist 目录不存在，请先执行 npm run build！');
  process.exit(1);
}

// 1. 递归复制目录
function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

// 复制 _astro 静态资源目录到根目录
if (fs.existsSync(path.join(distDir, '_astro'))) {
  copyDirSync(path.join(distDir, '_astro'), path.join(rootDir, '_astro'));
  console.log('✓ 已复制 _astro 静态资源目录至根目录');
}

// 复制 sitemap, robots, etc.
const staticFiles = [
  'sitemap-index.xml',
  'sitemap-0.xml',
  'robots.txt',
  'BingSiteAuth.xml',
  '8f4b5e67a91249b5812e9b01c1827439.txt',
];
for (const file of staticFiles) {
  if (fs.existsSync(path.join(distDir, file))) {
    fs.copyFileSync(path.join(distDir, file), path.join(rootDir, file));
  }
}

// 计算两个路径之间的相对链接（支持 file:// 离线协议）
function toRelativeUrl(fromHtmlPath, targetAbsUrl) {
  const fromDir = path.dirname(fromHtmlPath);
  let targetFile = targetAbsUrl.replace(/^\//, '');
  if (!targetFile || targetFile === '/') {
    targetFile = 'index.html';
  } else if (targetFile.endsWith('/')) {
    targetFile += 'index.html';
  } else if (!targetFile.endsWith('.html') && !targetFile.includes('.')) {
    targetFile += '/index.html';
  }
  let rel = path.relative(fromDir, targetFile).split(path.sep).join('/');
  if (!rel.startsWith('.') && !rel.startsWith('/')) {
    rel = './' + rel;
  }
  return rel;
}

// 获取所有 HTML 文件
function getAllHtmlFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '.astro' && entry.name !== '.git') {
        files = files.concat(getAllHtmlFiles(full));
      }
    } else if (entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

const distHtmlFiles = getAllHtmlFiles(distDir);
console.log(`📦 正在同步并精准转换 ${distHtmlFiles.length} 个页面的相对链接 (100% 适配 file:// 本地双击与点击跳转)...`);

for (const filePath of distHtmlFiles) {
  const relFromDist = path.relative(distDir, filePath).split(path.sep).join('/');
  const targetPath = path.join(rootDir, relFromDist);

  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // 计算当前文件目录到根目录的 _astro 相对路径
  const fromDir = path.dirname(relFromDist);
  let astroRel = path.relative(fromDir, '_astro').split(path.sep).join('/');
  if (!astroRel.startsWith('.') && !astroRel.startsWith('/')) {
    astroRel = './' + astroRel;
  }

  // 1. 替换 _astro 资源路径
  html = html.replace(/(href|src)=["']\/_astro\//g, `$1="${astroRel}/`);

  // 2. 替换首页链接 href="/"
  const indexRel = toRelativeUrl(relFromDist, '/');
  html = html.replace(/href=["']\/["']/g, `href="${indexRel}"`);

  // 3. 替换内部页面路由 href="/path/to/slug/"
  html = html.replace(/href=["'](\/[a-zA-Z0-9_\-\/]+?\/?)["']/g, (match, p1) => {
    // 忽略外部链接或非站内路由
    if (p1.startsWith('//') || p1.includes(':')) return match;
    const relLink = toRelativeUrl(relFromDist, p1);
    return `href="${relLink}"`;
  });

  // 4. 替换单文件页面 href="/x.html"
  html = html.replace(/href=["'](\/[a-zA-Z0-9_\-]+\.html)["']/g, (match, p1) => {
    const relLink = toRelativeUrl(relFromDist, p1);
    return `href="${relLink}"`;
  });

  // 写入根目录对应文件
  fs.writeFileSync(targetPath, html, 'utf8');

  // 同时如果是一级栏目（如 blog/index.html -> blog.html），生成一份同名 flat 文件
  const segments = relFromDist.split('/');
  if (segments.length === 2 && segments[1] === 'index.html') {
    const flatFile = path.join(rootDir, `${segments[0]}.html`);
    let flatHtml = fs.readFileSync(filePath, 'utf8');
    flatHtml = flatHtml.replace(/(href|src)=["']\/_astro\//g, `$1="./_astro/`);
    flatHtml = flatHtml.replace(/href=["']\/["']/g, `href="./index.html"`);
    flatHtml = flatHtml.replace(/href=["'](\/[a-zA-Z0-9_\-\/]+?\/?)["']/g, (match, p1) => {
      if (p1.startsWith('//') || p1.includes(':')) return match;
      const relLink = toRelativeUrl(`${segments[0]}.html`, p1);
      return `href="${relLink}"`;
    });
    flatHtml = flatHtml.replace(/href=["'](\/[a-zA-Z0-9_\-]+\.html)["']/g, (match, p1) => {
      const relLink = toRelativeUrl(`${segments[0]}.html`, p1);
      return `href="${relLink}"`;
    });
    fs.writeFileSync(flatFile, flatHtml, 'utf8');
  }
}

console.log('✅ 同步完成！所有卡片、标题及链接均已支持直接点击跳转。');
