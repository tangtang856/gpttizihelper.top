import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');

if (!fs.existsSync(distDir)) {
  console.error('❌ dist 目录不存在，请先运行 npm run build！');
  process.exit(1);
}

function getAllHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  });
  return results;
}

const htmlFiles = getAllHtmlFiles(distDir);
console.log(`\n🔍 开始审计 Astro 生成的 ${htmlFiles.length} 个 HTML 页面...`);

let issues = 0;
let totalChars = 0;

htmlFiles.forEach((file) => {
  const relPath = path.relative(distDir, file);
  const content = fs.readFileSync(file, 'utf8');
  totalChars += content.length;

  // 1. Title check
  const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
  if (!titleMatch || !titleMatch[1].trim()) {
    console.error(`❌ [${relPath}] 缺少 Title 标签！`);
    issues++;
  }

  // 2. Meta description check
  const descMatch = content.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i);
  if (!descMatch || !descMatch[1].trim()) {
    console.error(`❌ [${relPath}] 缺少 Meta Description 标签！`);
    issues++;
  }

  // 3. H1 check
  const h1Match = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  if (!h1Match || !h1Match[1].trim()) {
    console.error(`❌ [${relPath}] 缺少 H1 标签！`);
    issues++;
  }

  // 4. Canonical check
  const canonicalMatch = content.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i);
  if (!canonicalMatch) {
    console.error(`❌ [${relPath}] 缺少 Canonical 标签！`);
    issues++;
  }
});

console.log('====================================================');
console.log(`📊 Astro 架构全量构建与 SEO 审计结果:`);
console.log(`- 审计静态页面总数: ${htmlFiles.length}`);
console.log(`- 发现违规项: ${issues}`);
console.log(`- 全站代码及文本总字符数: 约 ${totalChars} 字符`);

if (issues === 0 && htmlFiles.length >= 180) {
  console.log('✅ 全部页面 100% 通过 Astro + Tailwind CSS 现代架构验收！');
  process.exit(0);
} else {
  console.error(`❌ 发现 ${issues} 处违规或页面数量不足！`);
  process.exit(1);
}
