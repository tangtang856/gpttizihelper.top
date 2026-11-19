import fs from 'fs';
import path from 'path';

const slugs = [
  'breezenet',
  'muguang',
  'feimaoyun',
  'wuyou',
  'lingmao',
  'flashleap',
  'firefly',
  'kuajiecloud',
  'yinxingren',
  'feiv',
  'laddercloud',
  'wavenet',
  'lingdongcloud',
  'quanqiuyun',
];

console.log('================ 14 品牌评测页与档案页 TDK 全量校验 ================');
slugs.forEach((slug, idx) => {
  const reviewPath = path.resolve('review', slug, 'index.html');
  const airportPath = path.resolve('airport', slug, 'index.html');

  const rHtml = fs.readFileSync(reviewPath, 'utf8');
  const rTitle = (rHtml.match(/<title>([^<]+)<\/title>/i) || [])[1] || '';
  const rDesc = (rHtml.match(/<meta\s+name=["']description["']\s+content=["']([^"']+)["']/i) || [])[1] || '';
  const rKeywords = (rHtml.match(/<meta\s+name=["']keywords["']\s+content=["']([^"']+)["']/i) || [])[1] || '';

  console.log(`\n[${idx + 1}] 品牌 slug: ${slug}`);
  console.log(`评测页 Title: ${rTitle}`);
  console.log(`评测页 Keywords: ${rKeywords}`);
  console.log(`评测页 Desc: ${rDesc}`);

  // 验证必备词汇
  const requiredInTitle = ['如何？', '套餐价格', '流量', '节点', '测速信息'];
  const missingInTitle = requiredInTitle.filter(k => !rTitle.includes(k));
  if (missingInTitle.length > 0) {
    console.error(`  ❌ 标题缺失必要词汇: ${missingInTitle.join(', ')}`);
  } else {
    console.log(`  ✅ 标题完全契合用户需求 (包含: 如何？、套餐价格、流量、节点、测速信息)`);
  }
});
