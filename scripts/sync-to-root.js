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

// 复制 _astro 资源目录到根目录
if (fs.existsSync(path.join(distDir, '_astro'))) {
  copyDirSync(path.join(distDir, '_astro'), path.join(rootDir, '_astro'));
  console.log('✓ 已复制 _astro 静态资源目录至根目录');
}

// 复制 sitemap, robots, etc.
const staticFiles = ['sitemap-index.xml', 'sitemap-0.xml', 'robots.txt', 'BingSiteAuth.xml', '8f4b5e67a91249b5812e9b01c1827439.txt'];
for (const file of staticFiles) {
  if (fs.existsSync(path.join(distDir, file))) {
    fs.copyFileSync(path.join(distDir, file), path.join(rootDir, file));
  }
}

// 2. 处理所有 HTML 文件并转换为 file:// 相对路径兼容格式
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
console.log(`📦 正在同步并适配 ${distHtmlFiles.length} 个 HTML 页面至根目录 (支持 file:// 本地直接双击打开)...`);

for (const filePath of distHtmlFiles) {
  const relFromDist = path.relative(distDir, filePath); // 例如 'index.html', 'about/index.html', 'recommend/budget/index.html'
  const targetPath = path.join(rootDir, relFromDist);

  // 确保目标目录存在
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  let html = fs.readFileSync(filePath, 'utf8');

  // 计算相对根目录的深度
  // 'index.html' -> depth = 0 -> prefix = './'
  // 'about/index.html' -> depth = 1 -> prefix = '../'
  // 'recommend/budget/index.html' -> depth = 2 -> prefix = '../../'
  const segments = relFromDist.split(path.sep);
  const depth = segments.length - 1;
  const prefix = depth === 0 ? './' : '../'.repeat(depth);

  // 替换静态资源与内链为相对路径
  // 1. _astro 资源
  html = html.replace(/(href|src)=["']\/_astro\//g, `$1="${prefix}_astro/`);

  // 2. 根目录首页链接
  html = html.replace(/href=["']\/["']/g, `href="${prefix}index.html"`);

  // 3. 各模块路由转换为相对 index.html 路径
  // 例如 href="/recommend/budget/" -> href="${prefix}recommend/budget/index.html"
  html = html.replace(/href=["']\/([a-zA-Z0-9_\-\/]+)\/["']/g, (match, p1) => {
    return `href="${prefix}${p1}/index.html"`;
  });

  // 4. 处理单页面（如 /404.html 等）
  html = html.replace(/href=["']\/([a-zA-Z0-9_\-]+)\.html["']/g, (match, p1) => {
    return `href="${prefix}${p1}.html"`;
  });

  // 写入到根目录对应位置
  fs.writeFileSync(targetPath, html, 'utf8');

  // 同时如果目标是 x/index.html，且 depth === 1，生成一份 x.html，方便用户直接点击 x.html
  if (depth === 1 && path.basename(targetPath) === 'index.html') {
    const parentDirName = path.basename(path.dirname(targetPath));
    const flatFile = path.join(rootDir, `${parentDirName}.html`);
    // flatFile 的 depth 是 0
    let flatHtml = fs.readFileSync(filePath, 'utf8');
    flatHtml = flatHtml.replace(/(href|src)=["']\/_astro\//g, `$1="./_astro/`);
    flatHtml = flatHtml.replace(/href=["']\/["']/g, `href="./index.html"`);
    flatHtml = flatHtml.replace(/href=["']\/([a-zA-Z0-9_\-\/]+)\/["']/g, (match, p1) => {
      return `href="./${p1}/index.html"`;
    });
    flatHtml = flatHtml.replace(/href=["']\/([a-zA-Z0-9_\-]+)\.html["']/g, (match, p1) => {
      return `href="./${p1}.html"`;
    });
    fs.writeFileSync(flatFile, flatHtml, 'utf8');
  }
}

console.log('✅ 根目录 index.html 及全站各级页面同步与相对路径离线适配完成！');
