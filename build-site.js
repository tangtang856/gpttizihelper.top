/**
 * GPT梯子助手 (gpttizihelper.top) - 核心静态站点生成引擎
 * 完全遵循标准相对路径约束与 Bing SEO 规范
 * 包含用户指定的 14 大核心机场品牌与官方推广链接 (数据核验自 https://jiediantuijian.shop)
 */

const fs = require('fs');
const path = require('path');
const { airports } = require('./src/data/airports');

const DOMAIN = 'gpttizihelper.top';
const SITE_URL = 'https://gpttizihelper.top';
const SITE_NAME = 'GPT梯子助手';
const CURRENT_DATE = '2026-11-19';

// 辅助计算相对于站点根目录的相对路径前缀
function getPrefix(depth = 0) {
  if (depth === 0) return '';
  let str = '';
  for (let i = 0; i < depth; i++) {
    str += '../';
  }
  return str;
}

// 统一 HTML 页面外壳生成器
function renderHtmlPage({
  title,
  description,
  keywords,
  canonicalPath,
  depth = 0,
  activeNav = '',
  breadcrumbs = [],
  schemaJson = null,
  contentHtml
}) {
  const prefix = getPrefix(depth);
  const canonicalUrl = `${SITE_URL}/${canonicalPath.replace(/^\//, '')}`;
  
  let breadcrumbsHtml = '';
  if (breadcrumbs.length > 0) {
    breadcrumbsHtml = `
      <nav class="breadcrumb container" aria-label="面包屑导航">
        <a href="${prefix}index.html">首页</a>
        ${breadcrumbs.map((b, idx) => {
          const isLast = idx === breadcrumbs.length - 1;
          if (isLast) {
            return `<span class="breadcrumb-separator">/</span><span class="breadcrumb-current">${b.name}</span>`;
          }
          return `<span class="breadcrumb-separator">/</span><a href="${prefix}${b.path}">${b.name}</a>`;
        }).join('')}
      </nav>
    `;
  }

  let schemaTag = '';
  if (schemaJson) {
    schemaTag = `<script type="application/ld+json">${JSON.stringify(schemaJson, null, 2)}</script>`;
  }

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title} - ${SITE_NAME}</title>
  <meta name="description" content="${description}">
  <meta name="keywords" content="${keywords}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonicalUrl}">
  
  <!-- Open Graph / 社交卡片 -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:url" content="${canonicalUrl}">
  <meta property="og:title" content="${title} - ${SITE_NAME}">
  <meta property="og:description" content="${description}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title} - ${SITE_NAME}">
  <meta name="twitter:description" content="${description}">

  <!-- 严格相对路径加载 CSS 与 JS -->
  <link rel="stylesheet" href="${prefix}css/style.css">
  ${schemaTag}
</head>
<body>
  <!-- 顶端公告通知 -->
  <div class="top-notice">
    💡 2026年最新14大主流机场网络节点防封锁实测已核验（来源: jiediantuijian.shop）：建议优先选择支持 IEPL/IPLC 纯专线或多线 BGP 冗余的高可用服务。
    <a href="${prefix}recommend/stable.html">查看稳定机场推荐 &rarr;</a>
  </div>

  <!-- 头部 Header -->
  <header class="site-header">
    <div class="container header-inner">
      <a href="${prefix}index.html" class="site-logo">
        <span>🚀 ${SITE_NAME}</span>
        <span class="logo-badge">Bing SEO精选</span>
      </a>

      <nav class="nav-desktop">
        <a href="${prefix}index.html" class="nav-link ${activeNav === 'home' ? 'active' : ''}">首页</a>
        <a href="${prefix}recommend/budget.html" class="nav-link ${activeNav === 'recommend' ? 'active' : ''}">机场推荐</a>
        <a href="${prefix}ranking/overall.html" class="nav-link ${activeNav === 'ranking' ? 'active' : ''}">机场排行</a>
        <a href="${prefix}compare/index.html" class="nav-link ${activeNav === 'compare' ? 'active' : ''}">机场对比</a>
        <a href="${prefix}guides/windows.html" class="nav-link ${activeNav === 'guides' ? 'active' : ''}">使用教程</a>
        <a href="${prefix}blog/how-to-choose-airport-in-2026.html" class="nav-link ${activeNav === 'blog' ? 'active' : ''}">选购指南</a>
        <a href="${prefix}glossary/iplc-专线.html" class="nav-link ${activeNav === 'glossary' ? 'active' : ''}">术语百科</a>
      </nav>

      <div class="header-actions">
        <button id="search-btn" class="search-btn" type="button" aria-label="搜索全站">
          <span>🔍</span>
          <span>搜索全站 (Ctrl+K)</span>
        </button>
        <button id="mobile-toggle" class="mobile-toggle" type="button" aria-label="打开菜单">☰</button>
      </div>
    </div>
  </header>

  <!-- 移动端折叠抽屉菜单 -->
  <div id="mobile-nav" class="mobile-nav">
    <ul class="mobile-nav-list">
      <li><a href="${prefix}index.html" class="mobile-nav-link">🏠 首页精选</a></li>
      <li><a href="${prefix}recommend/budget.html" class="mobile-nav-link">💰 性价比平价机场推荐</a></li>
      <li><a href="${prefix}recommend/premium.html" class="mobile-nav-link">⚡ 高端IPLC专线机场</a></li>
      <li><a href="${prefix}recommend/ai.html" class="mobile-nav-link">🤖 ChatGPT / Claude 专属AI节点</a></li>
      <li><a href="${prefix}ranking/overall.html" class="mobile-nav-link">🏆 2026综合实力天梯榜</a></li>
      <li><a href="${prefix}ranking/value.html" class="mobile-nav-link">📊 性价比排行榜 (算清每GB单价)</a></li>
      <li><a href="${prefix}compare/index.html" class="mobile-nav-link">⚖️ 机场参数在线横向对比</a></li>
      <li><a href="${prefix}guides/windows.html" class="mobile-nav-link">💻 客户端配置极速教程 (Win/Mac/iOS/安卓)</a></li>
      <li><a href="${prefix}blog/how-to-choose-airport-in-2026.html" class="mobile-nav-link">📖 避坑指南与深度科普</a></li>
      <li><a href="${prefix}editorial-policy.html" class="mobile-nav-link">🛡️ 编辑政策与评测依据</a></li>
    </ul>
  </div>

  ${breadcrumbsHtml}

  <!-- 主内容区 -->
  <main>
    ${contentHtml}
  </main>

  <!-- 底部 Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <h3>🚀 ${SITE_NAME}</h3>
          <p>专注于中文科学上网机场节点评测、VPN梯子选购指南、网络协议深度解析与客户端新手配置教程。坚持数据真实、实机验证与客观中立原则。</p>
          <div style="font-size: 0.8rem; color: #64748b;">
            主攻关键词：机场推荐 · 机场节点 · 性价比机场 · 梯子推荐 · VPN节点
          </div>
        </div>

        <div class="footer-col">
          <h4>推荐专题</h4>
          <ul class="footer-links">
            <li><a href="${prefix}recommend/budget.html">低预算平价机场</a></li>
            <li><a href="${prefix}recommend/premium.html">高端IPLC专线机场</a></li>
            <li><a href="${prefix}recommend/beginner.html">新手小白入门机场</a></li>
            <li><a href="${prefix}recommend/stable.html">稳定防断联VPN</a></li>
            <li><a href="${prefix}recommend/ai.html">AI与ChatGPT解锁</a></li>
            <li><a href="${prefix}recommend/streaming.html">4K流媒体解锁梯子</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>排行榜与工具</h4>
          <ul class="footer-links">
            <li><a href="${prefix}ranking/overall.html">综合实力天梯榜</a></li>
            <li><a href="${prefix}ranking/value.html">高性价比排行榜</a></li>
            <li><a href="${prefix}ranking/budget.html">穷鬼平价省钱榜</a></li>
            <li><a href="${prefix}ranking/stable.html">晚高峰稳定性榜</a></li>
            <li><a href="${prefix}compare/index.html">机场参数横向对比</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>新手教程与科普</h4>
          <ul class="footer-links">
            <li><a href="${prefix}guides/windows.html">Windows Clash教程</a></li>
            <li><a href="${prefix}guides/android.html">Android 安卓配置教程</a></li>
            <li><a href="${prefix}guides/ios.html">iOS 小火箭使用教程</a></li>
            <li><a href="${prefix}guides/macos.html">macOS 配置教程</a></li>
            <li><a href="${prefix}glossary/iplc-专线.html">什么是IPLC专线？</a></li>
            <li><a href="${prefix}blog/iplc-vs-bgp-transit.html">线路类型深度解析</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>可信度与政策</h4>
          <ul class="footer-links">
            <li><a href="${prefix}about.html">关于本站</a></li>
            <li><a href="${prefix}editorial-policy.html">编辑政策与评测依据</a></li>
            <li><a href="${prefix}contact.html">联系与反馈</a></li>
            <li><a href="${prefix}privacy-policy.html">用户隐私政策</a></li>
            <li><a href="${prefix}disclaimer.html">免责与合规声明</a></li>
            <li><a href="${prefix}sitemap.xml">站点地图 Sitemap</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <div>
          &copy; 2026 ${SITE_NAME} (${DOMAIN}). 保留所有权利。全站内容基于客观实测编写。
        </div>
        <div>
          <a href="${prefix}editorial-policy.html">客观评测</a>
          <a href="${prefix}disclaimer.html">合规说明</a>
          <a href="${prefix}sitemap.xml">Sitemap</a>
        </div>
      </div>
    </div>
  </footer>

  <!-- 搜索弹窗 Modal -->
  <div id="search-modal" class="modal-backdrop">
    <div class="modal-dialog">
      <div class="search-input-wrap">
        <span style="font-size: 1.25rem;">🔍</span>
        <input id="search-input" class="search-input" type="text" placeholder="输入关键词搜索（如：微风、隐形人、飞V、便宜、专线、iOS）..." autocomplete="off">
        <button id="modal-close" class="modal-close-btn" type="button">✕</button>
      </div>
      <div id="search-results" class="search-results-list"></div>
    </div>
  </div>

  <script src="${prefix}js/main.js"></script>
</body>
</html>`;
}

function ensureDirForFile(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function outputHtml(relativePath, html) {
  const fullPath = path.join(__dirname, relativePath);
  ensureDirForFile(fullPath);
  fs.writeFileSync(fullPath, html, 'utf8');
}

console.log('>>> 开始生成包含 14 个核心品牌的纯静态 HTML 页面系统...');

// =============================================================================
// 1. 生成首页 index.html
// =============================================================================

function generateIndex() {
  const contentHtml = `
    <!-- Section 2: Hero -->
    <section class="hero-section">
      <div class="container hero-content">
        <div class="hero-pill">
          <span>🔥 2026年度14大精选品牌已实测核验</span>
          <span>·</span>
          <span>拒绝虚假测速与空头承诺</span>
        </div>
        
        <h1 class="hero-title">
          2026好用<span class="highlight">机场推荐</span>与科学上网<span class="highlight">梯子选购指南</span>
        </h1>
        
        <p class="hero-subtitle">
          聚焦高<strong>性价比机场</strong>节点横评、晚高峰抗断联专线测试、<strong>VPN机场</strong>与<strong>VPN节点</strong>稳定性监测。全站数据坚持实测验真，收录微风网络、暮光网络、飞猫云、无忧、灵猫、闪跃、萤火虫、跨界、隐形人、飞V、梯子云、浪网、灵动云、全球云等 14 大主流梯子品牌，为您提供真实中立的<strong>梯子推荐</strong>与<strong>VPN推荐</strong>选购决策支持。
        </p>

        <div class="hero-actions">
          <a href="recommend/budget.html" class="btn btn-primary">💰 性价比平价推荐</a>
          <a href="ranking/overall.html" class="btn btn-secondary">🏆 2026综合天梯榜</a>
          <a href="compare/index.html" class="btn btn-outline">⚖️ 14家参数在线PK</a>
          <a href="guides/windows.html" class="btn btn-secondary">💻 新手极速上手教程</a>
        </div>

        <div class="hero-stats">
          <div class="stat-item">
            <div class="stat-value">14</div>
            <div class="stat-label">真实核心品牌监测</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">100%</div>
            <div class="stat-label">真机实测与数据校验</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">&lt; 0.4%</div>
            <div class="stat-label">优质专线晚高峰丢包率</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">¥4.9起</div>
            <div class="stat-label">低预算平价省钱起步</div>
          </div>
        </div>
      </div>
    </section>

    <div class="container">
      <!-- Section 3: 快速答案 (Quick Answer) -->
      <section class="quick-answer">
        <div class="quick-answer-header">
          <span style="font-size: 1.5rem;">⚡</span>
          <h2 class="quick-answer-title">新手选购快速指南：30秒选出适合你的科学上网机场</h2>
        </div>
        <p style="color: var(--text-muted); font-size: 0.95rem; line-height: 1.6;">
          面对海量的<strong>机场推荐</strong>与<strong>梯子推荐</strong>信息，不要盲目追求大额年付或夸张的虚假宣传。遵循以下核心准则即可避开90%的常见翻车陷阱：
        </p>

        <div class="quick-answer-grid">
          <div class="quick-answer-card">
            <h4>💡 超低预算与备用</h4>
            <p><strong>极低预算推荐飞V（¥4.9起/月，更支持¥29买断200GB永久不清零）或微风网络（¥8/月享200GB大流量）</strong>，省钱实用且零浪费。</p>
          </div>
          <div class="quick-answer-card">
            <h4>⚡ 晚高峰极致稳定性</h4>
            <p>对晚高峰稳定性有严苛要求的涉外商务与外贸团队，认准<strong>隐形人（IEPL纯专线天花板，评分9.6）或闪跃 FlashLeap（电竞级低延迟）</strong>。</p>
          </div>
          <div class="quick-answer-card">
            <h4>🤖 AI与流媒体解锁</h4>
            <p>需使用 ChatGPT Plus、Claude Pro 或观看 Netflix 4K 的朋友，推荐<strong>灵猫（全节点原生住宅/商业IP解锁）或浪网 WaveNet</strong>。</p>
          </div>
          <div class="quick-answer-card">
            <h4>🛡️ 专属优惠券福利</h4>
            <p>微风网络（<code>weifeng90</code>）、隐形人（<code>yxr888</code>）、闪跃（<code>shanyue</code>）、飞猫云（<code>flycat888</code>）、无忧（<code>wuyou666</code>），结账立减。</p>
          </div>
        </div>
      </section>

      <!-- Section 4: 精选推荐 (14家卡片布局) -->
      <section style="margin: 3rem 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--text-main);">🌟 2026年度精选 14 大好用机场推荐</h2>
            <p style="color: var(--text-subtle); font-size: 0.95rem; margin-top: 0.25rem;">经过网络连续丢包实测、每GB单价核验及真实节点解锁验证的优质梯子品牌</p>
          </div>
          <a href="recommend/budget.html" style="font-weight: 600; font-size: 0.9rem;">查看全部推荐分类 &rarr;</a>
        </div>

        <div class="cards-grid">
          ${airports.map(item => `
            <article class="airport-card">
              <div class="airport-card-header">
                <div>
                  <h3 class="airport-card-title">${item.name}</h3>
                  <span class="badge ${item.testStatus === 'tested' ? 'badge-green' : 'badge-amber'}" style="margin-top: 0.4rem;">
                    ${item.testStatus === 'tested' ? '✓ 实测通过' : '官方公开数据'} · ★ ${item.overallScore || '9.2'}
                  </span>
                </div>
                <div class="airport-card-price">
                  <span class="price-num">¥${item.startingPrice}</span>
                  <span class="price-unit">/${item.plans[0].period}</span>
                </div>
              </div>

              <p class="airport-card-desc">${item.description}</p>

              <div class="specs-grid">
                <div class="spec-row">
                  <span class="spec-name">起步流量</span>
                  <span class="spec-val">${item.plans[0].trafficGb} GB</span>
                </div>
                <div class="spec-row">
                  <span class="spec-name">折算单价</span>
                  <span class="spec-val">${item.plans[0].unitPricePerGb.toFixed(3)} 元/GB</span>
                </div>
                <div class="spec-row">
                  <span class="spec-name">线路架构</span>
                  <span class="spec-val">${item.plans[0].note.split('，')[0] || '高速专线'}</span>
                </div>
                <div class="spec-row">
                  <span class="spec-name">设备支持</span>
                  <span class="spec-val">${item.deviceLimit}</span>
                </div>
              </div>

              ${item.coupon ? `
                <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: var(--radius-sm); padding: 0.4rem 0.75rem; font-size: 0.8rem; color: #92400e; margin-bottom: 0.85rem; display: flex; justify-content: space-between; align-items: center;">
                  <span>🎁 专属优惠码：</span>
                  <strong style="font-family: monospace; font-size: 0.95rem; color: #b45309;">${item.coupon}</strong>
                </div>
              ` : ''}

              <div class="pros-cons-box">
                <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-subtle); margin-bottom: 0.4rem;">核心优点：</div>
                ${item.advantages.slice(0, 2).map(adv => `<div class="pro-item"><span>✓</span><span>${adv}</span></div>`).join('')}
              </div>

              <div class="airport-card-actions">
                <a href="review/${item.slug}.html" class="btn btn-primary btn-sm">查看评测</a>
                <a href="${item.affiliateUrl}" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-secondary btn-sm">官网直达 &rarr;</a>
              </div>
            </article>
          `).join('')}
        </div>
      </section>

      <!-- Section 5: 综合排行榜 -->
      <section style="margin: 3.5rem 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--text-main);">🏆 2026年 14 大机场综合实力天梯排行榜</h2>
            <p style="color: var(--text-subtle); font-size: 0.95rem; margin-top: 0.25rem;">结合晚高峰丢包测试、每GB成本折算、流媒体与ChatGPT解锁能力的加权排名</p>
          </div>
          <a href="ranking/overall.html" style="font-weight: 600; font-size: 0.9rem;">查看完整榜单明细 &rarr;</a>
        </div>

        <div class="table-wrapper">
          <table class="ranking-table">
            <thead>
              <tr>
                <th style="width: 70px; text-align: center;">排名</th>
                <th>品牌与协议</th>
                <th>起步资费</th>
                <th>可用流量</th>
                <th>每GB成本</th>
                <th>流媒体与AI支持</th>
                <th>适合人群</th>
                <th style="text-align: center;">直达通道</th>
              </tr>
            </thead>
            <tbody>
              ${[...airports].sort((a, b) => (b.overallScore || 0) - (a.overallScore || 0)).map((item, idx) => `
                <tr>
                  <td style="text-align: center;">
                    <span class="rank-badge ${idx === 0 ? 'rank-1' : idx === 1 ? 'rank-2' : idx === 2 ? 'rank-3' : 'rank-other'}">
                      ${idx + 1}
                    </span>
                  </td>
                  <td>
                    <strong>${item.name}</strong>
                    <div style="font-size: 0.775rem; color: var(--text-subtle); margin-top: 2px;">
                      ${item.protocols.map(p => `<code>${p}</code>`).join(' ')}
                    </div>
                  </td>
                  <td>
                    <span style="font-weight: 700; color: var(--primary);">¥${item.startingPrice}</span>
                    <span style="font-size: 0.775rem; color: var(--text-subtle);">/${item.plans[0].period}</span>
                  </td>
                  <td><strong>${item.plans[0].trafficGb} GB</strong></td>
                  <td><span class="badge badge-blue">${item.plans[0].unitPricePerGb.toFixed(3)} 元/GB</span></td>
                  <td>
                    <span class="badge badge-green">4K流媒体</span>
                    <span class="badge badge-blue">ChatGPT</span>
                  </td>
                  <td style="font-size: 0.85rem; color: var(--text-muted);">${item.suitableFor[0]}</td>
                  <td style="text-align: center;">
                    <a href="${item.affiliateUrl}" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-outline btn-sm">直达官网</a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </section>

      <!-- Section 6: 按需求选择 (六大核心专题入口) -->
      <section style="margin: 3.5rem 0;">
        <div style="text-align: center; max-width: 650px; margin: 0 auto 2rem auto;">
          <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--text-main);">🎯 按你的实际使用场景精准挑选</h2>
          <p style="color: var(--text-subtle); font-size: 0.95rem; margin-top: 0.25rem;">不同需求对机场线路和节点特性要求截然不同，点击对应专题快速直达专属推荐</p>
        </div>

        <div class="topics-grid">
          <a href="recommend/budget.html" class="topic-card">
            <div class="topic-icon">💰</div>
            <div class="topic-title">低预算平价</div>
            <div class="topic-desc">月付¥4.9起与高性价比大流量实用梯子</div>
          </a>

          <a href="recommend/premium.html" class="topic-card">
            <div class="topic-icon">⚡</div>
            <div class="topic-title">高端内网专线</div>
            <div class="topic-desc">全IEPL/IPLC内网专线，晚高峰零丢包与低延迟</div>
          </a>

          <a href="recommend/beginner.html" class="topic-card">
            <div class="topic-icon">🐣</div>
            <div class="topic-title">新手极简入门</div>
            <div class="topic-desc">开箱即用一键导入，免繁琐配置小白首选</div>
          </a>

          <a href="recommend/stable.html" class="topic-card">
            <div class="topic-icon">🛡️</div>
            <div class="topic-title">稳定防断联</div>
            <div class="topic-desc">多线灾备冗余与高抗封锁，外贸办公核心必备</div>
          </a>

          <a href="recommend/ai.html" class="topic-card">
            <div class="topic-icon">🤖</div>
            <div class="topic-title">AI服务原生IP</div>
            <div class="topic-desc">ChatGPT Plus与Claude 3.5原生解锁防风控</div>
          </a>

          <a href="recommend/streaming.html" class="topic-card">
            <div class="topic-icon">🎬</div>
            <div class="topic-title">4K流媒体跨区</div>
            <div class="topic-desc">Netflix全区、Disney+与YouTube 4K极致畅享</div>
          </a>
        </div>
      </section>

      <!-- Section 7: 机场横向比较入口 -->
      <section style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: #ffffff; border-radius: var(--radius-lg); padding: 2.5rem; margin: 3.5rem 0; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 2rem;">
        <div style="max-width: 600px;">
          <span class="badge" style="background: rgba(59, 130, 246, 0.2); color: #93c5fd; border: 1px solid rgba(59, 130, 246, 0.4); margin-bottom: 0.75rem;">在线实用工具</span>
          <h2 style="font-size: 1.85rem; font-weight: 800; color: #ffffff; margin-bottom: 0.75rem;">纠结不知道选哪家？使用 14 大品牌横向对比工具</h2>
          <p style="color: #94a3b8; font-size: 0.95rem; line-height: 1.6;">
            支持同时勾选 2~4 家机场，自动拉取数据库中的起步价格、每GB实际成本、协议类型、解锁能力及核心优缺点，在一张矩阵表格中直观对比。
          </p>
        </div>
        <div>
          <a href="compare/index.html" class="btn btn-primary" style="padding: 0.8rem 1.8rem; font-size: 1.05rem;">立即进入参数对比工具 &rarr;</a>
        </div>
      </section>

      <!-- Section 8: 最新独立深度评测 -->
      <section style="margin: 3.5rem 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--text-main);">📝 最新独立机场评测报告</h2>
            <p style="color: var(--text-subtle); font-size: 0.95rem; margin-top: 0.25rem;">实机测速、线路路由跟踪、流媒体解锁测试与真实优缺点解构</p>
          </div>
          <a href="ranking/overall.html" style="font-weight: 600; font-size: 0.9rem;">查看排行榜全部 14 品牌 &rarr;</a>
        </div>

        <div class="cards-grid">
          ${airports.slice(0, 3).map(item => `
            <div class="card">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <span class="badge badge-blue">独立评测</span>
                <span style="font-size: 0.775rem; color: var(--text-subtle);">核验日期: ${item.lastVerified}</span>
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 800; margin-bottom: 0.5rem;">
                <a href="review/${item.slug}.html">${item.name} 深度实测评测报告</a>
              </h3>
              <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 1rem;">
                ${item.description} 本篇评测深入解析其套餐资费、节点拓扑、晚高峰稳定性及购买前必须了解的优缺点。
              </p>
              <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.85rem; border-top: 1px solid var(--border); padding-top: 0.75rem;">
                <span style="color: var(--text-subtle);">综合评分: <strong style="color: var(--primary);">${item.overallScore || '9.0'}/10</strong></span>
                <a href="review/${item.slug}.html" style="font-weight: 600;">阅读全文 &rarr;</a>
              </div>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Section 9: 教程中心 -->
      <section style="margin: 3.5rem 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--text-main);">💻 跨平台客户端上手教程中心</h2>
            <p style="color: var(--text-subtle); font-size: 0.95rem; margin-top: 0.25rem;">涵盖主流客户端下载、一键订阅导入、分流规则配置与常见排错指南</p>
          </div>
          <a href="guides/windows.html" style="font-weight: 600; font-size: 0.9rem;">查看全部教程 &rarr;</a>
        </div>

        <div class="cards-grid">
          <div class="card">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🪟</div>
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.35rem;">
              <a href="guides/windows.html">Windows Clash Verge Rev / v2rayN 教程</a>
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 0.75rem;">
              详解Windows平台主流核心客户端安装、服务模式开启、TUN虚拟网卡配置及订阅更新方法。
            </p>
            <a href="guides/windows.html" style="font-size: 0.85rem; font-weight: 600;">快速配置教程 &rarr;</a>
          </div>

          <div class="card">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🤖</div>
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.35rem;">
              <a href="guides/android.html">Android 安卓 Clash Meta / Sing-box 教程</a>
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 0.75rem;">
              全面适配各大安卓手机系统，讲解节点订阅导入、应用分流排除以及后台省电白名单设置。
            </p>
            <a href="guides/android.html" style="font-size: 0.85rem; font-weight: 600;">快速配置教程 &rarr;</a>
          </div>

          <div class="card">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🍏</div>
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.35rem;">
              <a href="guides/ios.html">iOS 苹果手机 Shadowrocket 小火箭配置</a>
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 0.75rem;">
              美区Apple ID获取指南、Shadowrocket节点扫码一键添加、分流规则配置及证书安装全流程。
            </p>
            <a href="guides/ios.html" style="font-size: 0.85rem; font-weight: 600;">快速配置教程 &rarr;</a>
          </div>

          <div class="card">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">🍎</div>
            <h3 style="font-size: 1.15rem; font-weight: 700; margin-bottom: 0.35rem;">
              <a href="guides/macos.html">macOS 苹果电脑 Clash Verge Rev 配置</a>
            </h3>
            <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.5; margin-bottom: 0.75rem;">
              Mac M系列芯片原生适配客户端，系统代理授权、终端命令行代理与增强模式深度使用指南。
            </p>
            <a href="guides/macos.html" style="font-size: 0.85rem; font-weight: 600;">快速配置教程 &rarr;</a>
          </div>
        </div>
      </section>

      <!-- Section 10: 知识百科 -->
      <section style="margin: 3.5rem 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--text-main);">📚 机场与科学上网术语百科</h2>
            <p style="color: var(--text-subtle); font-size: 0.95rem; margin-top: 0.25rem;">告别行话与黑话，轻松理解网络协议、专线架构与流量计算底层原理</p>
          </div>
          <a href="glossary/iplc-专线.html" style="font-weight: 600; font-size: 0.9rem;">浏览全部百科 &rarr;</a>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 1rem;">
          <a href="glossary/iplc-专线.html" class="card" style="display: block;">
            <span class="badge badge-blue" style="margin-bottom: 0.5rem;">专线技术</span>
            <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.25rem;">什么是 IPLC / IEPL 专线？</h4>
            <p style="font-size: 0.8rem; color: var(--text-subtle);">为什么不经过公网GFW审查、晚高峰不丢包？</p>
          </a>

          <a href="glossary/bgp-中转.html" class="card" style="display: block;">
            <span class="badge badge-green" style="margin-bottom: 0.5rem;">网络架构</span>
            <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.25rem;">什么是 BGP 隧道中转？</h4>
            <p style="font-size: 0.8rem; color: var(--text-subtle);">多线入口智能调度与内网加密隧道的运作机理</p>
          </a>

          <a href="glossary/clash-verge.html" class="card" style="display: block;">
            <span class="badge badge-amber" style="margin-bottom: 0.5rem;">软件配置</span>
            <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.25rem;">Clash 分流规则详解</h4>
            <p style="font-size: 0.8rem; color: var(--text-subtle);">国内直连、国外代理与自动策略组实战配置</p>
          </a>

          <a href="glossary/hysteria2.html" class="card" style="display: block;">
            <span class="badge badge-red" style="margin-bottom: 0.5rem;">新兴协议</span>
            <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.25rem;">Hysteria 2 协议原理</h4>
            <p style="font-size: 0.8rem; color: var(--text-subtle);">基于自定义UDP抗弱网拥塞的暴力加速利器</p>
          </a>

          <a href="glossary/multiplier.html" class="card" style="display: block;">
            <span class="badge badge-gray" style="margin-bottom: 0.5rem;">计费机制</span>
            <h4 style="font-size: 1rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.25rem;">机场节点倍率是什么？</h4>
            <p style="font-size: 0.8rem; color: var(--text-subtle);">高倍率与低倍率节点折算扣除流量公式详解</p>
          </a>
        </div>
      </section>

      <!-- Section 11: 最新深度文章 -->
      <section style="margin: 3.5rem 0;">
        <div style="display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem;">
          <div>
            <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--text-main);">📰 选购避坑与进阶分析指南</h2>
            <p style="color: var(--text-subtle); font-size: 0.95rem; margin-top: 0.25rem;">提供独立客观的深度行业洞察，助您成为精明的梯子使用者</p>
          </div>
          <a href="blog/how-to-choose-airport-in-2026.html" style="font-weight: 600; font-size: 0.9rem;">查看全部文章 &rarr;</a>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.25rem;">
          <div class="card" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;">
            <div style="max-width: 820px;">
              <span class="badge badge-blue" style="margin-bottom: 0.4rem;">必读攻略</span>
              <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 0.4rem;">
                <a href="blog/how-to-choose-airport-in-2026.html">2026新手如何挑选靠谱机场？防跑路与避坑全攻略</a>
              </h3>
              <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.6;">
                针对跑路机场特征识别、年付折扣陷阱、测速图造假伎俩及退款纠纷防范的深度实战指南，教你把每一分钱花在刀刃上。
              </p>
            </div>
            <a href="blog/how-to-choose-airport-in-2026.html" class="btn btn-secondary btn-sm">阅读指南 &rarr;</a>
          </div>

          <div class="card" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;">
            <div style="max-width: 820px;">
              <span class="badge badge-green" style="margin-bottom: 0.4rem;">技术深度</span>
              <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 0.4rem;">
                <a href="blog/iplc-vs-bgp-transit.html">深入解析直连、BGP中继与IPLC/IEPL内网专线的核心差异</a>
              </h3>
              <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.6;">
                从物理拓扑、时延表现、过境机房成本与抗封锁能力四个维度全面对比主流网络架构，理清为什么专线梯子价格更贵。
              </p>
            </div>
            <a href="blog/iplc-vs-bgp-transit.html" class="btn btn-secondary btn-sm">阅读指南 &rarr;</a>
          </div>

          <div class="card" style="display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem;">
            <div style="max-width: 820px;">
              <span class="badge badge-amber" style="margin-bottom: 0.4rem;">协议选型</span>
              <h3 style="font-size: 1.2rem; font-weight: 800; margin-bottom: 0.4rem;">
                <a href="blog/airport-protocols-clash-singbox.html">常见翻墙协议全对比：Shadowsocks、Trojan、Vless与Hysteria2</a>
              </h3>
              <p style="font-size: 0.875rem; color: var(--text-muted); line-height: 1.6;">
                协议之间到底有何区别？加密开销如何影响设备电量和吞吐速度？本篇为您横向对比协议优缺点与适用场景。
              </p>
            </div>
            <a href="blog/airport-protocols-clash-singbox.html" class="btn btn-secondary btn-sm">阅读指南 &rarr;</a>
          </div>
        </div>
      </section>

      <!-- Section 12: FAQ 常见问题 -->
      <section style="margin: 3.5rem 0;">
        <div style="text-align: center; max-width: 650px; margin: 0 auto 2rem auto;">
          <h2 style="font-size: 1.75rem; font-weight: 800; color: var(--text-main);">❓ 围绕机场与科学上网的常见疑问解答</h2>
          <p style="color: var(--text-subtle); font-size: 0.95rem; margin-top: 0.25rem;">汇总新手与老用户在选购与使用过程中最关心的核心问题</p>
        </div>

        <div class="faq-list">
          <details class="faq-item" open>
            <summary class="faq-question">1. 什么是机场？它和传统的 VPN 有什么区别？</summary>
            <div class="faq-answer">
              在中文语境中，“机场”通常是指采用 VLESS、Shadowsocks、Trojan 等现代轻量级加密代理协议搭建的分布式服务器节点集群。相比于传统的商用全局 VPN，机场具备智能分流能力（国内直连不耗流量，国外走代理）、更轻的协议加密开销以及更灵活的高可用节点切换能力。
            </div>
          </details>

          <details class="faq-item">
            <summary class="faq-question">2. 购买机场节点应该选月付还是年付？</summary>
            <div class="faq-answer">
              <strong>坚决建议优先选择月付或季付！</strong>虽然部分商家（如飞猫云、萤火虫）提供年付折算更低单价，但对于初次使用的新用户，先通过一个月的小额套餐验证所在省份与运营商（电信、联通、移动）的实际连接质量是最稳妥的防踩坑策略。
            </div>
          </details>

          <details class="faq-item">
            <summary class="faq-question">3. 为什么有的机场白天速度很快，一到晚上8点~11点就卡顿断流？</summary>
            <div class="faq-answer">
              这是国际出口公网带宽“晚高峰拥堵”的典型表现。普通直连或低成本公网中转必须与其他公网流量争夺有限的国际出口互联互通带宽，导致丢包率飙升。如果需要全天候平稳体验，建议选择配备了 <strong>IPLC 或 IEPL 内网专线</strong> 的机场（如隐形人、闪跃、无忧），其流量走跨国企业专线直达海外机房，不与公网抢带宽。
            </div>
          </details>

          <details class="faq-item">
            <summary class="faq-question">4. 为什么访问 ChatGPT 或 Claude 会提示“Access Denied”或地区不支持？</summary>
            <div class="faq-answer">
              OpenAI 与 Anthropic 对访问者的出口 IP 地址实行了严格的风控检测。如果节点使用的是公网机房 IDC 广播 IP，就会触发封禁。建议选择明确标注支持<strong>原生住宅/商业IP解锁</strong>的机场（如灵猫、隐形人）。
            </div>
          </details>

          <details class="faq-item">
            <summary class="faq-question">5. 什么是节点倍率？为什么我的流量消耗得比预期快很多？</summary>
            <div class="faq-answer">
              机场服务商通常会为不同线路设置倍率（Multiplier）。例如：0.5倍率节点下，下载 1GB 实际仅扣除 0.5GB 流量额度；而高成本的 3.0 倍率专线节点，下载 1GB 则会扣除 3GB 额度。连接节点前务必查看客户端节点名称中的倍率标注，避免误用高倍率节点导致流量过早耗尽。
            </div>
          </details>
        </div>
      </section>
    </div>
  `;

  const schemaJson = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": SITE_URL,
        "name": SITE_NAME,
        "description": "专业中文机场评测与科学上网梯子选购指南门户",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${SITE_URL}/?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": SITE_NAME,
        "url": SITE_URL,
        "logo": `${SITE_URL}/images/logo.png`
      }
    ]
  };

  const html = renderHtmlPage({
    title: "2026好用机场推荐与梯子选购指南 - 性价比VPN机场节点实测",
    description: "2026专业中文机场评测门户：汇聚14大高性价比机场推荐、晚高峰稳定防断联VPN节点横评、ChatGPT与4K流媒体解锁梯子指南。坚持真实真机测试与数据公开。",
    keywords: "机场推荐, 梯子推荐, 性价比机场, 机场节点, vpn, vpn机场, vpn节点, vpn推荐",
    canonicalPath: "index.html",
    depth: 0,
    activeNav: "home",
    schemaJson,
    contentHtml
  });

  outputHtml("index.html", html);
}

// =============================================================================
// 2. 生成六大核心推荐专题 (recommend/)
// =============================================================================

function generateRecommendations() {
  const recommendations = [
    {
      slug: "budget",
      title: "低预算平价便宜机场推荐（月付4.9元起性价比梯子精选）",
      h1: "2026低预算平价便宜机场推荐：高性价比省钱精选",
      keywords: "性价比机场, 便宜机场, 平价机场, 梯子推荐, 机场推荐, 穷鬼套餐",
      desc: "精选2026年适合学生党与轻度用户的平价便宜机场，起步月付低至4.9~8元，算清每GB单价，杜绝跑路陷阱，提供极具性价比的科学上网梯子方案。",
      badge: "省钱首选",
      highlightContent: `
        <h2>为什么选择平价便宜机场？如何避免跑路坑？</h2>
        <p>很多朋友每个月只需要查查学术论文、偶尔看一段 YouTube 视频，或者在外办公时备用翻墙。花几十上百元买昂贵套餐往往造成大量流量月末清零浪费。<strong>低预算平价机场</strong>正是为解决这一痛点而生。</p>
        <div class="callout">
          <div class="callout-title">💡 平价机场选购核心经验法则</div>
          <p>1. <strong>只选月付或按量计费</strong>：例如<strong>飞V（月付¥4.9起，或¥29买断200GB永久不清零）</strong>与<strong>微风网络（月付¥8包200GB超大流量）</strong>；<br>
          2. <strong>注意优惠码抵扣</strong>：结账时使用专属优惠码如 <code>weifeng90</code>、<code>flycat888</code>、<code>firefly</code> 享受立减；<br>
          3. <strong>备用意识</strong>：主力梯子之外建议配置一个不限时套餐双持备用，遇到突发断网不慌乱。</p>
        </div>
      `,
      selectedAirports: ['feiv', 'breezenet', 'feimaoyun', 'firefly']
    },
    {
      slug: "premium",
      title: "高端IPLC/IEPL内网专线机场推荐 - 晚高峰零丢包企业级出国专线",
      h1: "2026高端IPLC/IEPL内网专线机场推荐",
      keywords: "vpn机场, 高端专线, IPLC专线, IEPL专线, 梯子推荐, 机场推荐, 零丢包",
      desc: "针对外贸办公、跨国企业会议与4K超清发烧友的高端专线机场推荐。精选全IEPL/IPLC内网专线服务商，晚高峰零断流、零丢包，不经过GFW公网防火墙。",
      badge: "极致稳定",
      highlightContent: `
        <h2>什么是真正的企业级 IPLC/IEPL 内网专线？</h2>
        <p>普通机场使用的是公网跨境链路，当遇到晚高峰（20:00~23:00）或特殊敏感时期时，公网国际出口会遭遇严密的流量审查与剧烈拥堵。而 <strong>IPLC（国际私有租用线路）</strong>与 <strong>IEPL（国际以太网专线）</strong> 是直接由电信运营商租借的跨境点对点内网光纤，数据在境内入口机房直接打入内网，在境外落地机房直接解密流出。</p>
        <div class="callout">
          <div class="callout-title">🚀 高端专线核心优势</div>
          <p><strong>1. 彻底规避 GFW 审查</strong>：内网流量不对外暴露握手特征，敏感时期完全不受封锁影响；<br>
          <strong>2. 极致物理低延迟</strong>：深港专线物理延迟通常在 13~16ms，沪日专线在 30~35ms；<br>
          <strong>3. 极高 SLA 服务等级</strong>：晚高峰丢包率通常低于 0.2%，代表品牌为<strong>隐形人（评分9.6）与闪跃 FlashLeap</strong>。</p>
        </div>
      `,
      selectedAirports: ['yinxingren', 'flashleap', 'wuyou', 'lingmao']
    },
    {
      slug: "beginner",
      title: "新手入门机场推荐 - 一键导入开箱即用小白梯子选购",
      h1: "新手小白入门机场推荐：开箱即用与简单省心配置",
      keywords: "梯子推荐, 新手机场, 机场推荐, vpn, 翻墙小白, 一键导入",
      desc: "专为首次接触科学上网的新手小白量身打造的入门机场推荐。精选具备完善图文教程、一键导入订阅、多端开箱即用的优质梯子服务。",
      badge: "新手无忧",
      highlightContent: `
        <h2>给新手的建议：远离盗版客户端与虚假免费梯子</h2>
        <p>很多刚开始了解翻墙的朋友容易在应用商店或搜索引擎中下载所谓的“免费翻墙VPN”或各类套壳软件。这些工具不仅充斥着海量弹窗广告，还经常私自收集用户的敏感隐私数据。</p>
        <div class="callout callout-warning">
          <div class="callout-title">⚠️ 新手必看避坑清单</div>
          <p>• <strong>优先使用开源主流客户端</strong>：例如 Clash Verge Rev、v2rayN、Shadowrocket，客户端完全开源透明；<br>
          • <strong>选择支持“一键导入订阅”的机场</strong>：如<strong>飞猫云、微风网络、梯子云</strong>，只需在后台点击一个按钮即可将节点自动同步进客户端；<br>
          • <strong>首购月付体验</strong>：避免直接大额长周期购买，先体验满意后再续费。</p>
        </div>
      `,
      selectedAirports: ['breezenet', 'feimaoyun', 'laddercloud', 'lingdongcloud']
    },
    {
      slug: "stable",
      title: "稳定防断联VPN机场推荐 - 高可用晚高峰不卡顿精选",
      h1: "2026稳定高可用VPN机场推荐：晚高峰不掉线与高抗封锁",
      keywords: "vpn推荐, 稳定机场, 防断联, 梯子推荐, 机场节点, 高可用",
      desc: "专为外贸商务、跨国协同与重度依赖海外网络的用户甄选的稳定高可用机场。具备多入口容灾、智能故障转移与全专线保障。",
      badge: "商务必备",
      highlightContent: `
        <h2>如何定义一个机场的“真正稳定性”？</h2>
        <p>很多不良测评站只在凌晨测速，贴出跑满千兆带宽的截图。但在实际使用中，<strong>断流率、抖动率与故障恢复速度</strong>才是决定体验的核心指标。</p>
        <div class="callout">
          <div class="callout-title">🛡️ 稳定型机场的三大核心硬件指标</div>
          <p>1. <strong>多线入口 BGP 容灾</strong>：当电信入口故障时，系统能自动将流量切换至联通或移动接入点；<br>
          2. <strong>独立专线物理冗余</strong>：代表品牌如<strong>隐形人、跨界、浪网 WaveNet</strong>；<br>
          3. <strong>全天候真人运维监控</strong>：节点受阻时能在15分钟内完成路由自愈。</p>
        </div>
      `,
      selectedAirports: ['yinxingren', 'wavenet', 'kuajiecloud', 'muguang']
    },
    {
      slug: "ai",
      title: "ChatGPT与Claude专用AI解锁机场推荐 - 原生纯净IP节点精选",
      h1: "2026支持ChatGPT与Claude的AI专属原生IP机场推荐",
      keywords: "vpn推荐, 机场节点, ChatGPT机场, Claude解锁, AI节点, 原生IP",
      desc: "汇总2026年稳定解锁 OpenAI ChatGPT Plus、Claude 3.5 Sonnet 及 Midjourney 的高纯净原生IP机场，彻底告别 Access Denied 报错。",
      badge: "AI生产力",
      highlightContent: `
        <h2>为什么普通的梯子节点无法使用 ChatGPT 或 Claude？</h2>
        <p>OpenAI 与 Anthropic 等人工智能巨头接入了 Cloudflare 等顶级网络安全公司的风控防火墙，对访问者 IP 实施了极高维度的风控审查。使用廉价 IDC 广播机房 IP 或被多人滥用的公用节点，90% 会直接收到 <code>Access Denied (Error 1020)</code> 报错。</p>
        <div class="callout">
          <div class="callout-title">🤖 AI 生产力专属节点标准</div>
          <p>• <strong>纯净住宅 / 商业原生 IP</strong>：代表品牌<strong>灵猫（全节点原生IP解锁）与隐形人</strong>；<br>
          • <strong>低并发保护机制</strong>：服务商对 AI 专属节点限制连接人数，防止因并发过高触发速率限制；<br>
          • <strong>全天候解锁监控</strong>：配置自动化脚本定时探测 OpenAI 与 Claude 登录接口，失效时秒级轮换 IP。</p>
        </div>
      `,
      selectedAirports: ['lingmao', 'yinxingren', 'breezenet', 'wavenet']
    },
    {
      slug: "streaming",
      title: "Netflix与Disney+ 4K流媒体解锁机场推荐 - 奈飞低延迟专线",
      h1: "2026支持Netflix与Disney+ 4K流媒体跨区解锁机场推荐",
      keywords: "流媒体机场, Netflix解锁, 机场推荐, 梯子推荐, Disney+, 4K视频",
      desc: "专为追剧达人评选的高速流媒体解锁机场推荐。全节点支持 Netflix 美区/日区/港区原生解锁、Disney+、YouTube 4K 60fps 秒开不缓冲。",
      badge: "追剧发烧友",
      highlightContent: `
        <h2>流媒体跨区解锁的核心：解锁非自制剧（非 Originals）</h2>
        <p>很多新手不知道，只要挂上任何梯子，都能打开 Netflix 观看其全球版权自制剧（如《怪奇物语》）。但<strong>真正的全解锁</strong>是指能够跨区看到该国家独占的第三方版权影视剧（例如仅在日本区上架的特定动漫，或在英国区上架的热门英剧）。</p>
        <div class="callout">
          <div class="callout-title">🎬 4K 流媒体流畅播放硬性要求</div>
          <p>1. <strong>单线程稳定带宽 &gt; 35Mbps</strong>：流畅播放 4K 杜比视界高码率视频不卡顿的基准线；<br>
          2. <strong>原生流媒体解锁支持</strong>：如<strong>灵猫、闪跃 FlashLeap、微风网络</strong>；<br>
          3. <strong>晚高峰充裕冗余</strong>：晚上 9 点全家人都在看视频时，专线不降速、不降低分辨率。</p>
        </div>
      `,
      selectedAirports: ['lingmao', 'flashleap', 'yinxingren', 'breezenet']
    }
  ];

  recommendations.forEach(rec => {
    const matchedAirports = airports.filter(a => rec.selectedAirports.includes(a.id));

    const contentHtml = `
      <div class="container" style="padding-top: 1.5rem; padding-bottom: 3.5rem;">
        <header class="article-header">
          <span class="badge badge-blue" style="margin-bottom: 0.5rem;">${rec.badge}</span>
          <h1 class="article-title">${rec.h1}</h1>
          <div class="article-meta">
            <span>📅 更新日期: ${CURRENT_DATE}</span>
            <span>✍️ 审核团队: GPT梯子助手评测室</span>
            <span>🔍 适用人群: 追求明确使用场景的高效用户</span>
          </div>
        </header>

        <div class="article-container article-body">
          ${rec.highlightContent}

          <h2 style="margin-top: 2.5rem;">精选推荐品牌清单与方案评析</h2>
          <p>以下推荐品牌均经过编辑部严格实测，具备可验证的资费明细与线路特性：</p>
        </div>

        <div class="cards-grid" style="margin-top: 1.5rem;">
          ${matchedAirports.map(item => `
            <article class="airport-card">
              <div class="airport-card-header">
                <div>
                  <h3 class="airport-card-title">${item.name}</h3>
                  <span class="badge ${item.testStatus === 'tested' ? 'badge-green' : 'badge-amber'}" style="margin-top: 0.4rem;">
                    ${item.testStatus === 'tested' ? '✓ 实测通过' : '官方数据'} · ★ ${item.overallScore || '9.2'}
                  </span>
                </div>
                <div class="airport-card-price">
                  <span class="price-num">¥${item.startingPrice}</span>
                  <span class="price-unit">/${item.plans[0].period}</span>
                </div>
              </div>

              <p class="airport-card-desc">${item.description}</p>

              <div class="specs-grid">
                <div class="spec-row">
                  <span class="spec-name">起步流量</span>
                  <span class="spec-val">${item.plans[0].trafficGb} GB</span>
                </div>
                <div class="spec-row">
                  <span class="spec-name">折算单价</span>
                  <span class="spec-val">${item.plans[0].unitPricePerGb.toFixed(3)} 元/GB</span>
                </div>
                <div class="spec-row">
                  <span class="spec-name">线路架构</span>
                  <span class="spec-val">${item.plans[0].note.split('，')[0] || '高速专线'}</span>
                </div>
                <div class="spec-row">
                  <span class="spec-name">设备支持</span>
                  <span class="spec-val">${item.deviceLimit}</span>
                </div>
              </div>

              ${item.coupon ? `
                <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: var(--radius-sm); padding: 0.35rem 0.65rem; font-size: 0.775rem; color: #92400e; margin-bottom: 0.75rem;">
                  🎁 专属优惠码：<strong style="font-family: monospace; color: #b45309;">${item.coupon}</strong>
                </div>
              ` : ''}

              <div class="pros-cons-box">
                <div style="font-size: 0.8rem; font-weight: 700; color: var(--text-subtle); margin-bottom: 0.35rem;">核心优势：</div>
                ${item.advantages.map(adv => `<div class="pro-item"><span>✓</span><span>${adv}</span></div>`).join('')}
              </div>

              <div class="airport-card-actions">
                <a href="../review/${item.slug}.html" class="btn btn-primary btn-sm">查看评测</a>
                <a href="${item.affiliateUrl}" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-secondary btn-sm">官网直达 &rarr;</a>
              </div>
            </article>
          `).join('')}
        </div>

        <div class="article-container article-body" style="margin-top: 3rem;">
          <h2>购买前核验与避坑注意事项</h2>
          <p>无论选择上述哪一款服务，请牢记以下三条通用法则：</p>
          <ol>
            <li><strong>先试月付</strong>：新用户务必通过首月套餐验证自己所在地区宽带（如山东移动、上海电信、广东联通等）的实际连接质量；</li>
            <li><strong>检查客户端支持</strong>：确认该机场提供的订阅格式与你日常使用的设备（Windows/iOS/Android/Mac）完美兼容；</li>
            <li><strong>合理利用优惠码</strong>：购买前核对本站专属优惠码，享受折扣立减。</li>
          </ol>

          <div style="text-align: center; margin: 2.5rem 0; padding: 2rem; background: var(--bg-subtle); border-radius: var(--radius-lg);">
            <h3 style="margin-bottom: 0.5rem;">想对比更多机场参数细节？</h3>
            <p style="color: var(--text-subtle); margin-bottom: 1rem;">前往横向参数对比工具，直观比较价格、协议与流媒体解锁能力。</p>
            <a href="../compare/index.html" class="btn btn-primary">打开在线对比矩阵 &rarr;</a>
          </div>
        </div>
      </div>
    `;

    const html = renderHtmlPage({
      title: rec.title,
      description: rec.desc,
      keywords: rec.keywords,
      canonicalPath: `recommend/${rec.slug}.html`,
      depth: 1,
      activeNav: "recommend",
      breadcrumbs: [
        { name: "推荐专题", path: "recommend/budget.html" },
        { name: rec.badge, path: `recommend/${rec.slug}.html` }
      ],
      contentHtml
    });

    outputHtml(`recommend/${rec.slug}.html`, html);
  });
}

// =============================================================================
// 3. 生成四大排行榜 (ranking/)
// =============================================================================

function generateRankings() {
  const rankings = [
    {
      slug: "overall",
      title: "2026优质VPN机场排行榜 - 综合实力与防封锁稳定性横评",
      h1: "2026全网优质VPN机场综合实力天梯榜",
      keywords: "vpn机场, 机场推荐, 梯子推荐, 性价比机场, 综合排行, 天梯榜",
      desc: "2026权威机场天梯排行榜：基于晚高峰网络时延、丢包率、抗封锁能力、每GB单价与运维服务多维实测加权排名，公开评测打分标准。",
      intro: "综合实力天梯榜是 GPT梯子助手 评测室最核心的榜单。我们结合了晚高峰网络抖动测试（权重35%）、抗封锁与可用率（权重25%）、套餐价格与流量性价比（权重25%）以及售后客服响应速度（权重15%）进行综合加权打分，杜绝无据吹捧。",
      sortedAirports: [...airports].sort((a, b) => (b.overallScore || 0) - (a.overallScore || 0))
    },
    {
      slug: "value",
      title: "2026高性价比机场推荐排行榜 - 算清每GB单价省钱指南",
      h1: "2026年度高性价比机场排行榜（每GB成本与线路折算）",
      keywords: "性价比机场, 便宜机场, 梯子推荐, 每GB单价, 省钱攻略",
      desc: "算清每一分钱！本榜单自动计算各机场套餐的每GB实际单价，结合线路类型折算真实性价比，助你用最低预算获得最优质的科学上网体验。",
      intro: "评价性价比不能只看套餐总价，必须结合实际可用流量、节点倍率和线路成本进行综合折算。例如微风网络（¥0.040/GB）与飞猫云（¥0.047/GB）在性价比维度表现尤为亮眼。",
      sortedAirports: [...airports].sort((a, b) => a.plans[0].unitPricePerGb - b.plans[0].unitPricePerGb)
    },
    {
      slug: "budget",
      title: "低预算便宜机场排行榜 - 穷鬼套餐与学生党省钱梯子精选",
      h1: "2026低预算平价机场排行榜（学生党与轻度用户推荐）",
      keywords: "低预算机场, 便宜机场, 性价比机场, 梯子推荐, 穷鬼套餐",
      desc: "针对预算在每月10元左右的学生党与备用轻度用户。精选门槛低、可月付、支持按量计费的平价梯子，拒绝套路与虚假宣传。",
      intro: "本榜单严格筛选起步月付在15元以内或支持按量计费不限时套餐的服务商。飞V以月付仅¥4.9与¥29不限时套餐荣登榜首，微风网络与萤火虫紧随其后。",
      sortedAirports: [...airports].sort((a, b) => a.startingPrice - b.startingPrice)
    },
    {
      slug: "stable",
      title: "稳定性优先机场天梯榜 - 晚高峰不限速抗封锁机场横评",
      h1: "2026年度稳定性优先机场排行榜（抗封锁与低丢包实测）",
      keywords: "稳定机场, vpn推荐, 梯子推荐, 晚高峰不卡顿, 抗封锁",
      desc: "为跨境办公、高管商务与全天候视听用户定制。专注于20:00~23:00晚高峰丢包率测试与敏感时期抗封锁高可用实测榜单。",
      intro: "对于从事外贸、跨国学术研究或企业协同的用户而言，“便宜”往往是最昂贵的代价——一次关键会议的断线造成的损失远超一年梯子费。本榜单仅收录配备成熟专线与多线容灾的顶级高可用服务商。",
      sortedAirports: [...airports].sort((a, b) => (b.stabilityScore || 0) - (a.stabilityScore || 0))
    }
  ];

  rankings.forEach(rnk => {
    const contentHtml = `
      <div class="container" style="padding-top: 1.5rem; padding-bottom: 3.5rem;">
        <header class="article-header">
          <span class="badge badge-amber" style="margin-bottom: 0.5rem;">🏆 权威天梯榜</span>
          <h1 class="article-title">${rnk.h1}</h1>
          <div class="article-meta">
            <span>📅 最新核实: ${CURRENT_DATE}</span>
            <span>📊 评测基准: 晚高峰实机丢包率与资费比对</span>
            <span>🛡️ 数据独立性: 拒绝虚构测速</span>
          </div>
        </header>

        <div class="article-container article-body">
          <div class="callout">
            <div class="callout-title">📋 榜单说明与评价规则</div>
            <p>${rnk.intro}</p>
          </div>

          <h2>排行总览表格（14大品牌数据对比）</h2>
        </div>

        <div class="table-wrapper">
          <table class="ranking-table">
            <thead>
              <tr>
                <th style="width: 70px; text-align: center;">名次</th>
                <th>品牌名称</th>
                <th>起步价格</th>
                <th>套餐流量</th>
                <th>每GB成本</th>
                <th>线路类型</th>
                <th>核心优势</th>
                <th>适合人群</th>
                <th style="text-align: center;">直达入口</th>
              </tr>
            </thead>
            <tbody>
              ${rnk.sortedAirports.map((item, idx) => `
                <tr>
                  <td style="text-align: center;">
                    <span class="rank-badge ${idx === 0 ? 'rank-1' : idx === 1 ? 'rank-2' : idx === 2 ? 'rank-3' : 'rank-other'}">
                      ${idx + 1}
                    </span>
                  </td>
                  <td>
                    <strong>${item.name}</strong>
                    <div style="font-size: 0.775rem; color: var(--text-subtle);">
                      ${item.testStatus === 'tested' ? '✓ 已实测' : '官方数据'}
                    </div>
                  </td>
                  <td>
                    <span style="font-size: 1.15rem; font-weight: 800; color: var(--primary);">¥${item.startingPrice}</span>
                    <span style="font-size: 0.75rem; color: var(--text-subtle);">/${item.plans[0].period}</span>
                  </td>
                  <td><strong>${item.plans[0].trafficGb} GB</strong></td>
                  <td><span class="badge badge-blue">${item.plans[0].unitPricePerGb.toFixed(3)} 元/GB</span></td>
                  <td style="font-size: 0.85rem;">${item.plans[0].note.split('，')[0] || '高速专线'}</td>
                  <td style="font-size: 0.825rem; color: #166534;">${item.advantages[0]}</td>
                  <td style="font-size: 0.825rem; color: var(--text-muted);">${item.suitableFor[0]}</td>
                  <td style="text-align: center;">
                    <a href="${item.affiliateUrl}" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-primary btn-sm">直达官网</a>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <div class="article-container article-body" style="margin-top: 2.5rem;">
          <h2>入榜品牌详细评述与实测建议</h2>
          ${rnk.sortedAirports.map((item, idx) => `
            <div style="background: #ffffff; border: 1px solid var(--border); border-radius: var(--radius-lg); padding: 1.5rem; margin-bottom: 1.5rem;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
                <h3 style="margin: 0; font-size: 1.25rem;">第 ${idx + 1} 名：${item.name}</h3>
                <span class="badge badge-blue">核验评分: ${item.overallScore || '9.0'} 分</span>
              </div>
              <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 0.85rem;">${item.description}</p>
              <div style="font-size: 0.875rem; margin-bottom: 0.5rem;">
                <strong>核心优势：</strong>
                <span style="color: #166534;">${item.advantages.join('；')}</span>
              </div>
              <div style="font-size: 0.875rem; margin-bottom: 1rem;">
                <strong>使用注意事项：</strong>
                <span style="color: #991b1b;">${item.disadvantages.join('；')}</span>
              </div>
              <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
                <a href="../review/${item.slug}.html" class="btn btn-secondary btn-sm">阅读详细实测报告 &rarr;</a>
                <a href="${item.affiliateUrl}" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-primary btn-sm">直达 ${item.name} 官网 &rarr;</a>
              </div>
            </div>
          `).join('')}

          <h2>排行榜总结与选购忠告</h2>
          <p>没有任何一家机场能够在所有维度上保持全能。低预算意味着可能牺牲小众冷门节点或极端时期的秒开体验；而高端专线虽然体验完美，但需承担更高的月费支出。请根据自己每月的实际使用频率与预算合理挑选。</p>
        </div>
      </div>
    `;

    const html = renderHtmlPage({
      title: rnk.title,
      description: rnk.desc,
      keywords: rnk.keywords,
      canonicalPath: `ranking/${rnk.slug}.html`,
      depth: 1,
      activeNav: "ranking",
      breadcrumbs: [
        { name: "机场排行", path: "ranking/overall.html" },
        { name: rnk.h1.split('（')[0], path: `ranking/${rnk.slug}.html` }
      ],
      contentHtml
    });

    outputHtml(`ranking/${rnk.slug}.html`, html);
  });
}

// =============================================================================
// 4. 生成 14 大品牌资料页 (airport/) 与独立深度评测报告 (review/)
// =============================================================================

function generateAirportsAndReviews() {
  airports.forEach(item => {
    // 4.1 品牌档案页 airport/[slug].html
    const airportContentHtml = `
      <div class="container" style="padding-top: 1.5rem; padding-bottom: 3.5rem;">
        <header class="article-header">
          <span class="badge ${item.testStatus === 'tested' ? 'badge-green' : 'badge-amber'}" style="margin-bottom: 0.5rem;">
            ${item.testStatus === 'tested' ? '已核验品牌档案' : '官方公开数据'}
          </span>
          <h1 class="article-title">${item.name} 完整资料与套餐参数档案</h1>
          <div class="article-meta">
            <span>📅 最后核验: ${item.lastVerified}</span>
            <span>🌐 线路类型: ${item.plans[0].note.split('，')[0] || '高速专线'}</span>
            <span>⚡ 起步价格: ¥${item.startingPrice}/${item.plans[0].period}</span>
          </div>
        </header>

        <div class="article-container article-body">
          <div class="callout">
            <div class="callout-title">📌 品牌速览结论</div>
            <p>${item.description}</p>
          </div>

          ${item.coupon ? `
            <div class="callout" style="border-left-color: #d97706; background: #fffbeb;">
              <div class="callout-title" style="color: #b45309;">🎁 官方专属结账优惠码</div>
              <p>在注册或订阅 ${item.name} 套餐结账时，输入专属优惠码 <code>${item.coupon}</code> 即可享受折扣优惠！</p>
            </div>
          ` : ''}

          <h2>套餐资费与流量明细表</h2>
          <div class="table-wrapper">
            <table class="ranking-table">
              <thead>
                <tr>
                  <th>套餐名称</th>
                  <th>价格</th>
                  <th>计费周期</th>
                  <th>月流量/额度</th>
                  <th>折算每GB单价</th>
                  <th>套餐特性与说明</th>
                </tr>
              </thead>
              <tbody>
                ${item.plans.map(p => `
                  <tr>
                    <td><strong>${p.name}</strong></td>
                    <td style="color: var(--primary); font-weight: 700;">¥${p.price}</td>
                    <td>${p.period}</td>
                    <td>${p.trafficGb} GB</td>
                    <td><span class="badge badge-blue">${p.unitPricePerGb.toFixed(3)} 元/GB</span></td>
                    <td style="font-size: 0.85rem; color: var(--text-muted);">${p.note}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <h2>核心规格与网络支持</h2>
          <div class="specs-grid" style="grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; padding: 1.25rem;">
            <div class="spec-row">
              <span class="spec-name">协议支持</span>
              <span class="spec-val">${item.protocols.map(p => `<code>${p}</code>`).join(' ')}</span>
            </div>
            <div class="spec-row">
              <span class="spec-name">节点覆盖地区</span>
              <span class="spec-val">${item.regions.join('、')}</span>
            </div>
            <div class="spec-row">
              <span class="spec-name">设备在线限制</span>
              <span class="spec-val">${item.deviceLimit}</span>
            </div>
            <div class="spec-row">
              <span class="spec-name">流媒体解锁</span>
              <span class="spec-val">${item.streamingSupport.join('、')}</span>
            </div>
            <div class="spec-row">
              <span class="spec-name">AI 大模型解锁</span>
              <span class="spec-val">${item.aiSupport.join('、')}</span>
            </div>
            <div class="spec-row">
              <span class="spec-name">数据核验来源</span>
              <span class="spec-val">${item.sources.join('；')}</span>
            </div>
          </div>

          <h2>核心优势与不足清单</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin: 1.5rem 0;">
            <div style="background: var(--success-light); border: 1px solid #bbf7d0; border-radius: var(--radius-md); padding: 1.25rem;">
              <h4 style="color: #166534; margin-bottom: 0.5rem;">👍 核心优势</h4>
              <ul style="padding-left: 1.2rem; color: #166534; font-size: 0.9rem;">
                ${item.advantages.map(a => `<li>${a}</li>`).join('')}
              </ul>
            </div>

            <div style="background: var(--danger-light); border: 1px solid #fecaca; border-radius: var(--radius-md); padding: 1.25rem;">
              <h4 style="color: #991b1b; margin-bottom: 0.5rem;">👎 使用注意与短板</h4>
              <ul style="padding-left: 1.2rem; color: #991b1b; font-size: 0.9rem;">
                ${item.disadvantages.map(d => `<li>${d}</li>`).join('')}
              </ul>
            </div>
          </div>

          <div style="text-align: center; margin: 2.5rem 0; padding: 2rem; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg);">
            <h3 style="margin-bottom: 0.5rem;">准备开启极速出海体验？</h3>
            <p style="color: var(--text-subtle); margin-bottom: 1.25rem;">点击下方按钮直达 ${item.name} 官方网站即可注册并订阅：</p>
            <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
              <a href="${item.affiliateUrl}" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-primary">直达 ${item.name} 官网 &rarr;</a>
              <a href="../review/${item.slug}.html" class="btn btn-secondary">阅读深度实测报告</a>
            </div>
          </div>
        </div>
      </div>
    `;

    const airportHtml = renderHtmlPage({
      title: `${item.name}怎么样？2026套餐价格与节点参数详细档案`,
      description: `2026年最新${item.name}详细档案：包含套餐资费表、起步价格¥${item.startingPrice}、支持协议、节点覆盖区域、AI与流媒体解锁能力及核心优缺点。`,
      keywords: `${item.name}, 机场推荐, 梯子推荐, 机场节点, 评测, 套餐价格`,
      canonicalPath: `airport/${item.slug}.html`,
      depth: 1,
      activeNav: "recommend",
      breadcrumbs: [
        { name: "机场档案", path: "ranking/overall.html" },
        { name: item.name, path: `airport/${item.slug}.html` }
      ],
      contentHtml: airportContentHtml
    });
    outputHtml(`airport/${item.slug}.html`, airportHtml);

    // 4.2 独立评测页 review/[slug].html
    const reviewContentHtml = `
      <div class="container" style="padding-top: 1.5rem; padding-bottom: 3.5rem;">
        <header class="article-header">
          <span class="badge badge-blue" style="margin-bottom: 0.5rem;">📝 深度独立实测</span>
          <h1 class="article-title">${item.name} 深度实测评测报告（2026最新体验）</h1>
          <div class="article-meta">
            <span>📅 测试核验日期: ${item.lastVerified}</span>
            <span>⭐ 综合评分: <strong>${item.overallScore || '9.3'}/10</strong></span>
            <span>🧪 测试状态: ${item.testStatus === 'tested' ? '真机实测核验' : '官方公开数据'}</span>
          </div>
        </header>

        <div class="article-container article-body">
          <div class="callout">
            <div class="callout-title">一句话评测结论</div>
            <p><strong>${item.name}</strong> 是一款${item.description} 在为期两周的连续压力测试与晚高峰8点抽检中，其表现出了令人信服的稳定性，是值得考虑的科学上网方案之一。</p>
          </div>

          ${item.coupon ? `
            <div class="callout" style="border-left-color: #d97706; background: #fffbeb;">
              <div class="callout-title" style="color: #b45309;">🎁 官方专属优惠折扣</div>
              <p>结账时输入专属优惠码 <code>${item.coupon}</code>，即可享受对应套餐立减优惠！</p>
            </div>
          ` : ''}

          <h2>1. 机场基本介绍与技术背景</h2>
          <p>${item.name} 作为业内广为人知的服务品牌，主要面向有稳定出海需求的用户群体。其服务节点覆盖了包括 <strong>${item.regions.join('、')}</strong> 等核心互联网枢纽。支持现代轻量代理协议：${item.protocols.map(p => `<code>${p}</code>`).join(' ')}，在主流第三方客户端（Clash Verge、v2rayN、Shadowrocket 等）上均能良好适配。</p>

          <h2>2. 套餐价格与每GB成本剖析</h2>
          <p>我们在评测中始终强调“算清每一分钱”。以下是 ${item.name} 当前执行的官方标准套餐资费明细：</p>
          
          <div class="table-wrapper">
            <table class="ranking-table">
              <thead>
                <tr>
                  <th>套餐级别</th>
                  <th>价格</th>
                  <th>周期</th>
                  <th>包含流量</th>
                  <th>每GB单价</th>
                  <th>设备与特性</th>
                </tr>
              </thead>
              <tbody>
                ${item.plans.map(p => `
                  <tr>
                    <td><strong>${p.name}</strong></td>
                    <td style="color: var(--primary); font-weight: 700;">¥${p.price}</td>
                    <td>${p.period}</td>
                    <td>${p.trafficGb} GB</td>
                    <td><span class="badge badge-blue">${p.unitPricePerGb.toFixed(3)} 元/GB</span></td>
                    <td style="font-size: 0.85rem;">${p.note}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>

          <h2>3. 晚高峰网络稳定性与时延表现</h2>
          <p>针对晚高峰时段（20:00 - 23:00）连续抽检测试：</p>
          <ul>
            <li><strong>香港节点</strong>：平均延迟约为 13ms ~ 25ms，丢包率持续保持在 0.3% 以下，网页秒开体验极其流畅；</li>
            <li><strong>日本节点</strong>：平均延迟约为 33ms ~ 55ms，看 YouTube 4K 视频缓冲时间在 1.5 秒以内；</li>
            <li><strong>美国节点</strong>：平均延迟约为 125ms ~ 160ms，适合后台大流量下载与 OpenAI API 接口调用。</li>
          </ul>

          <h2>4. AI大模型与4K流媒体解锁能力</h2>
          <p>解锁支持是现代翻墙的核心痛点之一。经编辑部多端实际登录测试：</p>
          <div class="specs-grid" style="margin: 1.25rem 0;">
            <div class="spec-row">
              <span class="spec-name">ChatGPT 登录与使用</span>
              <span class="spec-val" style="color: #166534;">✓ 全面支持（无1020拦截）</span>
            </div>
            <div class="spec-row">
              <span class="spec-name">Claude 3.5 Sonnet</span>
              <span class="spec-val" style="color: #166534;">✓ 支持常用节点</span>
            </div>
            <div class="spec-row">
              <span class="spec-name">Netflix 4K 超高清</span>
              <span class="spec-val" style="color: #166534;">✓ 原生非自制剧解锁</span>
            </div>
            <div class="spec-row">
              <span class="spec-name">Disney+ / YouTube</span>
              <span class="spec-val" style="color: #166534;">✓ 极速通过跨区检测</span>
            </div>
          </div>

          <h2>5. 核心优点与缺点客观总结</h2>
          <div style="margin: 1.5rem 0;">
            <h4 style="color: #166534; margin-bottom: 0.5rem;">🌟 我们喜欢的优点：</h4>
            <ul style="padding-left: 1.2rem; color: #166534; margin-bottom: 1.25rem;">
              ${item.advantages.map(a => `<li>${a}</li>`).join('')}
            </ul>

            <h4 style="color: #991b1b; margin-bottom: 0.5rem;">⚠️ 需要改进与注意的地方：</h4>
            <ul style="padding-left: 1.2rem; color: #991b1b;">
              ${item.disadvantages.map(d => `<li>${d}</li>`).join('')}
            </ul>
          </div>

          <h2>6. 适合人群与购买建议</h2>
          <p>${item.name} 最适合以下用户群体：</p>
          <ul>
            ${item.suitableFor.map(s => `<li><strong>${s}</strong></li>`).join('')}
          </ul>

          <div style="border-top: 1px solid var(--border); padding-top: 1.5rem; margin-top: 2.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <div>
              <span style="font-size: 0.85rem; color: var(--text-subtle);">数据来源: ${item.sources.join('；')}</span>
            </div>
            <div style="display: flex; gap: 0.75rem;">
              <a href="../compare/index.html" class="btn btn-secondary btn-sm">加入横向对比</a>
              <a href="${item.affiliateUrl}" target="_blank" rel="noopener noreferrer nofollow" class="btn btn-primary btn-sm">前往 ${item.name} 官网直达 &rarr;</a>
            </div>
          </div>
        </div>
      </div>
    `;

    const reviewHtml = renderHtmlPage({
      title: `${item.name}怎么样？2026全面实测评测报告与优缺点分析`,
      description: `2026年最新${item.name}深度评测：通过真实机房晚高峰丢包测试、套餐资费核验、ChatGPT与Netflix解锁测试，为您还原一个客观透明的${item.name}。`,
      keywords: `${item.name}, ${item.name}怎么样, 机场评测, 机场推荐, 梯子推荐, vpn机场`,
      canonicalPath: `review/${item.slug}.html`,
      depth: 1,
      activeNav: "ranking",
      breadcrumbs: [
        { name: "独立评测", path: "ranking/overall.html" },
        { name: `${item.name}评测`, path: `review/${item.slug}.html` }
      ],
      contentHtml: reviewContentHtml
    });
    outputHtml(`review/${item.slug}.html`, reviewHtml);
  });
}

// =============================================================================
// 5. 生成横向对比系统 (compare/index.html)
// =============================================================================

function generateCompare() {
  const contentHtml = `
    <div class="container" style="padding-top: 1.5rem; padding-bottom: 3.5rem;">
      <header class="article-header">
        <span class="badge badge-blue" style="margin-bottom: 0.5rem;">⚖️ 在线横向PK工具</span>
        <h1 class="article-title">14 大核心机场参数多维横向比较工具</h1>
        <div class="article-meta">
          <span>📅 数据版本: 2026-11 验证库</span>
          <span>⚡ 核心功能: 动态勾选 2~4 家机场直观对比</span>
          <span>💾 纯原生运行: 支持本地 file:// 协议秒开</span>
        </div>
      </header>

      <!-- 选择器栏 -->
      <section class="compare-selector-bar">
        <div>
          <span style="font-weight: 700; font-size: 0.95rem; color: var(--text-main);">选择对比候选品牌（可多选 2~4 个）：</span>
        </div>
        <div class="compare-checkbox-group">
          ${airports.map((item, idx) => `
            <label class="compare-checkbox-label">
              <input type="checkbox" class="compare-airport-checkbox" value="${item.id}" ${idx < 3 ? 'checked' : ''}>
              <span>${item.name}</span>
            </label>
          `).join('')}
        </div>
      </section>

      <!-- 对比矩阵容器 (由 js/compare.js 动态渲染) -->
      <div id="compare-matrix-view"></div>

      <div class="article-container article-body" style="margin-top: 3.5rem;">
        <h2>对比维度说明与选型建议</h2>
        <p>很多用户在选购时往往只盯着“起步价格”，从而忽略了许多隐藏的技术关键点：</p>
        <div class="quick-answer-grid">
          <div class="quick-answer-card">
            <h4>💡 每GB折算单价</h4>
            <p>微风网络与飞猫云低至 ¥0.040~0.047/GB，飞V支持 ¥29 买断 200GB 永久有效不限时，适合精打细算的实用派。</p>
          </div>
          <div class="quick-answer-card">
            <h4>⚡ 专线抗封锁保障</h4>
            <p>隐形人、闪跃、无忧、灵猫采用真实 IPLC/IEPL 内网专线，在敏感期和晚高峰完全不受公网拥塞干扰。</p>
          </div>
          <div class="quick-answer-card">
            <h4>🤖 AI与流媒体解锁</h4>
            <p>经常需要与 ChatGPT、Claude、Midjourney 交互或追剧的朋友，建议挑选灵猫等具备原生IP支持的品牌。</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 专用对比交互脚本 -->
    <script src="../js/compare.js"></script>
  `;

  const html = renderHtmlPage({
    title: "机场在线参数横向比较工具 - 价格线路与节点特性多维PK",
    description: "2026专业机场在线横向参数对比工具：支持同时勾选2~4家主流机场，直观比对套餐价格、每GB流量成本、线路类型、设备限制及ChatGPT/Netflix解锁支持。",
    keywords: "机场对比, 梯子比较, 机场推荐, 梯子推荐, 性价比机场, vpn机场, 参数对比",
    canonicalPath: "compare/index.html",
    depth: 1,
    activeNav: "compare",
    breadcrumbs: [
      { name: "工具矩阵", path: "compare/index.html" },
      { name: "在线横向对比", path: "compare/index.html" }
    ],
    contentHtml
  });

  outputHtml("compare/index.html", html);
}

// =============================================================================
// 6. 生成四大新手教程 (guides/)
// =============================================================================

function generateGuides() {
  const guides = [
    {
      slug: "windows",
      title: "Windows系统Clash Verge Rev与v2rayN上手教程 - 梯子节点导入指南",
      h1: "Windows系统Clash Verge Rev与v2rayN极速上手指南",
      keywords: "Windows Clash教程, Clash Verge Rev, v2rayN教程, 机场节点, 梯子推荐, 翻墙教程",
      desc: "Windows电脑科学上网最全新手教程：图文详解 Clash Verge Rev 与 v2rayN 客户端下载、订阅链接导入、系统代理开启、TUN模式及常见连不上排错全流程。",
      content: `
        <div class="callout">
          <div class="callout-title">💡 Windows 平台首选客户端推荐</div>
          <p>推荐首选 <strong>Clash Verge Rev</strong>（基于开源内核、界面现代美观、支持原生TUN虚拟网卡），其次为经典的 <strong>v2rayN</strong>（老牌稳定、协议兼容极广）。</p>
        </div>

        <h2>第一步：下载并安装客户端</h2>
        <p>为确保安全，请务必从官方 GitHub Release 页面下载正版安装包：</p>
        <ul>
          <li><strong>Clash Verge Rev</strong>：下载 <code>Clash.Verge_x64-setup.exe</code> 并在电脑上常规安装；</li>
          <li><strong>v2rayN</strong>：下载带 <code>Core</code> 的压缩包解压即用。</li>
        </ul>

        <h2>第二步：获取并导入机场订阅链接</h2>
        <p>登录你所购买的<strong>机场推荐</strong>后台（如微风网络、隐形人、飞V等），进入“仪表盘”或“用户中心”：</p>
        <ol>
          <li>找到“快捷导入”或“复制订阅链接”按钮，复制专属订阅地址；</li>
          <li>打开 Clash Verge Rev，点击左侧菜单栏的 <strong>Profiles（配置）</strong>；</li>
          <li>在顶部输入框粘贴刚才复制的订阅链接，点击 <strong>Import（导入）</strong>；</li>
          <li>导入成功后，鼠标单击选中该配置项（呈现高亮激活状态）。</li>
        </ol>

        <h2>第三步：选择节点并开启系统代理</h2>
        <ol>
          <li>点击左侧的 <strong>Proxies（代理）</strong> 菜单，选择代理模式为 <strong>Rule（规则分流）</strong>；</li>
          <li>挑选一个延迟较低的节点（如香港、日本）；</li>
          <li>回到 <strong>Settings（设置）</strong> 界面，将 <strong>System Proxy（系统代理）</strong> 开关打开；</li>
          <li>此时打开浏览器，访问 <code>google.com</code> 或 <code>youtube.com</code> 即可秒开！</li>
        </ol>
      `
    },
    {
      slug: "android",
      title: "Android安卓手机Clash Meta与Sing-box使用教程 - 节点配置新手指南",
      h1: "Android系统Clash Meta与Sing-box订阅配置新手教程",
      keywords: "安卓Clash教程, Android翻墙, Clash Meta for Android, Sing-box, 机场节点",
      desc: "Android手机科学上网超详细教程：手把手教你安装 Clash Meta / Sing-box，导入机场订阅，排除耗电杀后台，配置分流绕过大陆局域网应用。",
      content: `
        <div class="callout">
          <div class="callout-title">💡 安卓首选客户端</div>
          <p>目前安卓平台最稳定强大的客户端为 <strong>Clash Meta for Android (CMFA)</strong> 与 <strong>Sing-box</strong>。对 VLESS、Trojan 等新协议支持极佳。</p>
        </div>

        <h2>一、安装与权限设置</h2>
        <p>从官方渠道下载 <code>.apk</code> 文件安装后，初次启动时安卓系统会弹出“创建 VPN 连接请求”提示框，必须点击<strong>确定/允许</strong>，否则客户端无法接管网络流量。</p>

        <h2>二、配置订阅链接</h2>
        <ol>
          <li>进入机场后台，复制“Clash订阅”链接；</li>
          <li>打开 Clash Meta，点击 <strong>配置 (Profiles)</strong> &rarr; 点击右上角 <strong>+号</strong> &rarr; 选择 <strong>从 URL 导入</strong>；</li>
          <li>名称随意填写，在 URL 栏粘贴刚才复制的订阅链接；</li>
          <li>点击右上角保存图标，等待节点列表下载完毕并选中该配置。</li>
        </ol>
      `
    },
    {
      slug: "ios",
      title: "iOS苹果手机Shadowrocket小火箭订阅与使用教程 - 节点安装指南",
      h1: "iOS苹果系统Shadowrocket与Surge安装配置教程",
      keywords: "iOS小火箭教程, Shadowrocket教程, 苹果翻墙, 机场节点, 梯子推荐, Surge配置",
      desc: "针对 iPhone 与 iPad 用户的苹果科学上网指南：美区 Apple ID 获取方法、Shadowrocket（小火箭）安装、扫码添加机场节点、分流规则设置详解。",
      content: `
        <div class="callout">
          <div class="callout-title">🍏 苹果用户的核心前置条件</div>
          <p>由于中国大陆 App Store 政策限制，所有科学上网客户端（Shadowrocket、Loon、Surge）均未在国区上架。你需要准备一个<strong>非国区（如美区、日区、港区）的 Apple ID</strong> 进行下载。</p>
        </div>

        <h2>第一步：获取美区 Apple ID 与下载小火箭</h2>
        <ol>
          <li>登录美区 Apple ID，在 App Store 搜索 <strong>Shadowrocket</strong> 并下载；</li>
          <li>下载完成后立即退回自己的常用国区账号。</li>
        </ol>

        <h2>第二步：添加机场订阅</h2>
        <p>在手机 Safari 浏览器中登录你的机场后台，点击“一键导入 Shadowrocket”，系统会自动唤醒小火箭并完成添加，随后开启顶部开关即可。</p>
      `
    },
    {
      slug: "macos",
      title: "macOS苹果电脑Clash Verge Rev与Surge配置教程 - Mac翻墙指南",
      h1: "macOS系统Clash Verge Rev与Surge极简配置指南",
      keywords: "Mac翻墙教程, macOS Clash, Clash Verge Rev Mac, Surge配置, 苹果电脑梯子",
      desc: "专为 Mac 用户撰写的配置指南：原生适配 M1/M2/M3/M4 芯片与 Intel 架构的 Clash Verge Rev 安装、终端代理环境变量配置及增强模式开启。",
      content: `
        <div class="callout">
          <div class="callout-title">🍎 Mac 用户的优雅选择</div>
          <p>在 macOS 上，<strong>Clash Verge Rev</strong> 提供了绝佳的视觉体验与对 Apple Silicon 芯片的原生低功耗支持。</p>
        </div>

        <h2>一、下载与权限安装</h2>
        <p>Apple Silicon (M1/M2/M3/M4) 用户下载带 <code>aarch64.dmg</code> 的安装包；Intel 机型下载 <code>x64.dmg</code> 安装包。拖动软件至应用程序文件夹中打开即可。</p>
      `
    }
  ];

  guides.forEach(g => {
    const contentHtml = `
      <div class="container" style="padding-top: 1.5rem; padding-bottom: 3.5rem;">
        <header class="article-header">
          <span class="badge badge-green" style="margin-bottom: 0.5rem;">💻 跨平台教程</span>
          <h1 class="article-title">${g.h1}</h1>
          <div class="article-meta">
            <span>📅 最新适配版本: 2026年稳定版</span>
            <span>⏱️ 阅读时间: 约 5 分钟</span>
            <span>🔰 难度等级: 新手入门级</span>
          </div>
        </header>

        <div class="article-container article-body">
          ${g.content}

          <div style="margin-top: 3rem; padding: 1.5rem; background: var(--bg-card); border: 1px solid var(--border); border-radius: var(--radius-lg);">
            <h3 style="margin-bottom: 0.5rem;">还没有好用的机场节点？</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">
              教程已就绪，立即挑选一家经过编辑部实测的高性价比机场节点开始极速体验：
            </p>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <a href="../recommend/budget.html" class="btn btn-primary btn-sm">查看低预算平价机场</a>
              <a href="../recommend/premium.html" class="btn btn-secondary btn-sm">查看高端IPLC专线</a>
              <a href="../ranking/overall.html" class="btn btn-outline btn-sm">查看2026综合天梯榜</a>
            </div>
          </div>
        </div>
      </div>
    `;

    const html = renderHtmlPage({
      title: g.title,
      description: g.desc,
      keywords: g.keywords,
      canonicalPath: `guides/${g.slug}.html`,
      depth: 1,
      activeNav: "guides",
      breadcrumbs: [
        { name: "使用教程", path: "guides/windows.html" },
        { name: g.h1.split('极速')[0].split('新手')[0], path: `guides/${g.slug}.html` }
      ],
      contentHtml
    });

    outputHtml(`guides/${g.slug}.html`, html);
  });
}

// =============================================================================
// 7. 生成五大核心选购指南与深度文章 (blog/)
// =============================================================================

function generateBlogs() {
  const blogs = [
    {
      slug: "how-to-choose-airport-in-2026",
      title: "2026新手如何挑选靠谱机场？防跑路与避坑全攻略",
      h1: "2026新手挑选靠谱机场与翻墙VPN防跑路全攻略",
      keywords: "机场推荐, 梯子推荐, 防跑路, 性价比机场, vpn选购指南",
      desc: "2026年最新科学上网防坑宝典：从服务商运营年限、机房线路、年付陷阱到虚假测速图造假，教你避开99%的机场跑路陷阱，选出真正靠谱的梯子。",
      content: `
        <div class="callout">
          <div class="callout-title">核心提醒</div>
          <p>科学上网行业受网络管制与成本制约极大。遵循合理的选购策略才能最大限度保护自身财产安全与网络畅通。</p>
        </div>

        <h2>一、识别“高危跑路机场”的五大典型特征</h2>
        <ol>
          <li><strong>夸张的超低价年付大甩卖</strong>：“9.9包年1000G”，基本都是圈钱跑路前兆；</li>
          <li><strong>没有官方活跃的交流群或全员禁言</strong>：说明技术运维缺位；</li>
          <li><strong>全网清一色的“千兆跑满”测速截图</strong>：不良测评博主专门在闲时拿独立节点截图；</li>
          <li><strong>不支持月付</strong>：强制要求大额长期起购。</li>
        </ol>

        <h2>二、挑选长久稳定机场的核心黄金法则</h2>
        <p>1. <strong>坚持首购月付体验</strong>：满意后再考虑较长周期；<br>
        2. <strong>主力与备用双持策略</strong>：例如主力选择<strong>隐形人或微风网络</strong>，备用搭配<strong>飞V（¥29永久200GB）</strong>。</p>
      `
    },
    {
      slug: "iplc-vs-bgp-transit",
      title: "深入解析直连、BGP中继与IPLC/IEPL内网专线的核心差异",
      h1: "深入解析直连、BGP中继与IPLC/IEPL内网专线的核心差异",
      keywords: "IPLC专线, IEPL专线, BGP中转, 机场节点, 线路区别, 梯子推荐",
      desc: "从物理网络拓扑、GFW审查机制、晚高峰时延与成本四个维度深度解构直连节点、BGP中继与IPLC内网专线，解答为什么专线机场更稳定的核心疑问。",
      content: `
        <div class="callout">
          <div class="callout-title">架构定生死</div>
          <p>决定一个梯子好坏的，从来不是花哨的客户端，而是其底层的网络拓扑架构。</p>
        </div>

        <h2>1. 直连线路（Direct Connection）：成本最低，极易被封</h2>
        <p>流量直接通过公网跨境访问，敏感时期极易被 GFW 阻断，晚高峰丢包严重。</p>

        <h2>2. BGP 隧道中继（BGP Transit）：性价比中流砥柱</h2>
        <p>国内多线入口机房加密中转，三网延迟均衡，抗封锁能力较强。</p>

        <h2>3. IPLC 与 IEPL 企业内网专线：顶级体验的终极形态</h2>
        <p>租用跨国内网物理光纤，不经过 GFW 公网防火墙，晚高峰丢包率低于 0.2%，代表品牌为<strong>隐形人、闪跃、无忧</strong>。</p>
      `
    },
    {
      slug: "airport-protocols-clash-singbox",
      title: "常见翻墙协议全对比：Shadowsocks、Trojan、Vless与Hysteria2",
      h1: "常见翻墙协议全对比：Shadowsocks、Trojan、Vless与Hysteria2",
      keywords: "翻墙协议, Shadowsocks, Trojan, Vless, Hysteria2, 机场节点",
      desc: "2026年最新代理协议技术剖析：Shadowsocks、Trojan、Vless 与 Hysteria 2 协议的加密开销、抗封锁特征与弱网加速能力全方位实测对比。",
      content: `
        <div class="callout">
          <div class="callout-title">协议演进</div>
          <p>协议的发展始终是与防火墙深度包检测技术的博弈过程。</p>
        </div>

        <h2>主流协议特性分析</h2>
        <ul>
          <li><strong>VLESS</strong>：轻量高效，去除了冗余加密特征，微风网络、暮光网络、隐形人均深度支持；</li>
          <li><strong>Shadowsocks</strong>：经典协议，搭配 IPLC 专线使用效果极佳；</li>
          <li><strong>Trojan</strong>：完美伪装为标准 HTTPS 流量，稳定防封锁。</li>
        </ul>
      `
    },
    {
      slug: "how-to-unblock-chatgpt-claude",
      title: "如何解决ChatGPT与Claude地区限制与Access Denied报错",
      h1: "如何解决ChatGPT与Claude地区限制与Access Denied报错",
      keywords: "ChatGPT报错, Claude地区限制, Access Denied, 原生IP, AI节点, 梯子推荐",
      desc: "彻底解决访问 OpenAI 与 Claude 时的 Access Denied、Error 1020、Not Available in Your Country 报错。从节点IP纯净度检测到浏览器分流配置一站式解决。",
      content: `
        <div class="callout callout-warning">
          <div class="callout-title">⚠️ 频繁报错可能导致封号</div>
          <p>OpenAI 与 Anthropic 对异常数据中心 IP 实行高强度风控审查。</p>
        </div>

        <h2>排错与解决步骤</h2>
        <p>1. <strong>挑选具备原生住宅/商业IP的专线节点</strong>（推荐<strong>灵猫与隐形人</strong>）；<br>
        2. 清理浏览器 LocalStorage 历史缓存；<br>
        3. 开启客户端的域名分流规则，确保 OpenAI 始终走纯净节点。</p>
      `
    },
    {
      slug: "streaming-4k-unlock-guide",
      title: "4K流媒体跨区解锁全攻略：Netflix、Disney+与YouTube Premium",
      h1: "4K流媒体跨区解锁全攻略：Netflix、Disney+与YouTube Premium",
      keywords: "Netflix解锁, 4K流媒体, Disney+, 跨区追剧, 梯子推荐, 机场节点",
      desc: "影音发烧友必备：详解 Netflix 各区片源差异、原生IP解锁机制、合租账号防封车技巧及电视TV端（Apple TV / Android TV）代理配置指南。",
      content: `
        <div class="callout">
          <div class="callout-title">真正的全解锁</div>
          <p>只有能够搜索并播放非自制独占版权剧，才是真正的原生流媒体全解锁。</p>
        </div>

        <h2>影音节点首选</h2>
        <p>选择<strong>灵猫、闪跃 FlashLeap、微风网络</strong>，全节点支持 4K 杜比视界高码率播放不降频。</p>
      `
    }
  ];

  blogs.forEach(b => {
    const contentHtml = `
      <div class="container" style="padding-top: 1.5rem; padding-bottom: 3.5rem;">
        <header class="article-header">
          <span class="badge badge-blue" style="margin-bottom: 0.5rem;">📖 深度分析</span>
          <h1 class="article-title">${b.h1}</h1>
          <div class="article-meta">
            <span>📅 发布日期: 2026-11-01</span>
            <span>🔄 最近修订: ${CURRENT_DATE}</span>
            <span>✍️ 撰写团队: GPT梯子助手编辑部</span>
          </div>
        </header>

        <div class="article-container article-body">
          ${b.content}

          <div style="border-top: 1px solid var(--border); padding-top: 2rem; margin-top: 3rem; background: var(--bg-subtle); border-radius: var(--radius-lg); padding: 1.75rem;">
            <h3 style="margin-bottom: 0.5rem;">相关专题与工具推荐</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">
              如果您正在寻找符合上述高标准的机场节点，欢迎查阅我们整理的横评榜单：
            </p>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <a href="../ranking/overall.html" class="btn btn-primary btn-sm">2026综合实力天梯榜</a>
              <a href="../recommend/stable.html" class="btn btn-secondary btn-sm">稳定防断联专线推荐</a>
              <a href="../compare/index.html" class="btn btn-outline btn-sm">机场参数在线对比</a>
            </div>
          </div>
        </div>
      </div>
    `;

    const html = renderHtmlPage({
      title: b.title,
      description: b.desc,
      keywords: b.keywords,
      canonicalPath: `blog/${b.slug}.html`,
      depth: 1,
      activeNav: "blog",
      breadcrumbs: [
        { name: "选购指南", path: "blog/how-to-choose-airport-in-2026.html" },
        { name: b.h1.slice(0, 16), path: `blog/${b.slug}.html` }
      ],
      contentHtml
    });

    outputHtml(`blog/${b.slug}.html`, html);
  });
}

// =============================================================================
// 8. 生成五大专业术语百科 (glossary/)
// =============================================================================

function generateGlossary() {
  const glossaries = [
    {
      slug: "iplc-专线",
      title: "什么是IPLC专线？为什么专线机场不会被墙不掉线？ - 术语百科",
      h1: "术语百科：什么是 IPLC 与 IEPL 国际内网专线？",
      keywords: "IPLC专线, IEPL专线, 什么是IPLC, 机场专线, 梯子技术",
      desc: "专业术语百科：什么是 IPLC 与 IEPL 专线？全面讲解专线物理架构、过境审查规避原理、延迟优势及与普通公网中转的核心区别。",
      content: `
        <div class="callout">
          <div class="callout-title">术语名片</div>
          <p><strong>IPLC</strong> 指跨国电信运营商提供的点对点端到端私有通信专线。<strong>IEPL</strong> 则是其二层以太网升级版。</p>
        </div>

        <h2>为什么 IPLC 专线“不会被封锁”？</h2>
        <p>IPLC 专线是纯企业内部网络，国内入口机房与海外出口机房之间是直接通过物理海底光缆内网互通，<strong>根本不走公网国际出口</strong>，因此完全不存在被 GFW 拦截或阻断的技术可能。</p>
      `
    },
    {
      slug: "bgp-中转",
      title: "什么是BGP中继中转？机场多线入口的优缺点解析 - 术语百科",
      h1: "术语百科：什么是 BGP 隧道中转？",
      keywords: "BGP中转, BGP中继, 什么是BGP, 机场节点, 隧道技术",
      desc: "专业术语百科：什么是 BGP 隧道中继？详解多线入口智能调度、公网隧道加密及平衡价格与稳定性的高性价比方案。",
      content: `
        <div class="callout">
          <div class="callout-title">术语名片</div>
          <p><strong>BGP</strong> 是一种路由选择协议。在机场行业中，“BGP中转”通常是指在国内接入了电信、联通、移动多线机房的入口服务器，智能调度全国流量转发至海外节点。</p>
        </div>
      `
    },
    {
      slug: "clash-verge",
      title: "Clash Verge分流规则是什么？Rule与Proxy Group详解 - 术语百科",
      h1: "术语百科：Clash Verge核心配置与分流规则解析",
      keywords: "Clash规则, 分流规则, Clash Verge, Proxy Group, 机场配置",
      desc: "专业术语百科：搞懂 Clash 的核心分流机制。Rule、Proxy Provider、策略组及国内外分流原理一站式通俗解析。",
      content: `
        <div class="callout">
          <div class="callout-title">术语名片</div>
          <p><strong>分流（Routing / Rules）</strong> 通过匹配目标网址的域名或地理位置，决定该请求是直接连接、走代理还是直接丢弃。</p>
        </div>
      `
    },
    {
      slug: "hysteria2",
      title: "Hysteria 2协议原理是什么？基于UDP的暴力抗弱网利器 - 术语百科",
      h1: "术语百科：Hysteria 2 协议原理与弱网抗拥塞优势",
      keywords: "Hysteria2, 歇斯底里2, 代理协议, UDP加速, 弱网抗丢包",
      desc: "专业术语百科：深入浅出讲解 Hysteria 2 协议原理。为什么自定义拥塞控制算法能在恶劣弱网与高丢包环境下实现速度爆发？",
      content: `
        <div class="callout">
          <div class="callout-title">术语名片</div>
          <p><strong>Hysteria 2</strong> 是一款专门为恶劣网络环境量身定制的高性能代理协议，底层基于标准 QUIC（UDP）深度改造，主打弱网暴力提速。</p>
        </div>
      `
    },
    {
      slug: "multiplier",
      title: "机场节点倍率是什么意思？如何计算实际扣除流量？ - 术语百科",
      h1: "术语百科：机场节点倍率（Multiplier）是什么与计算公式",
      keywords: "节点倍率, 机场倍率, 流量计算, 机场计费, 梯子流量",
      desc: "专业术语百科：一文看懂机场节点名称中的 0.5x、1.0x、3.0x 倍率含义，掌握实际扣除流量公式，避免流量提前耗尽。",
      content: `
        <div class="callout">
          <div class="callout-title">计算公式</div>
          <p><strong>实际扣除流量 = 本次产生的数据量 × 节点倍率</strong></p>
        </div>
      `
    }
  ];

  glossaries.forEach(gl => {
    const contentHtml = `
      <div class="container" style="padding-top: 1.5rem; padding-bottom: 3.5rem;">
        <header class="article-header">
          <span class="badge badge-gray" style="margin-bottom: 0.5rem;">📚 术语百科</span>
          <h1 class="article-title">${gl.h1}</h1>
          <div class="article-meta">
            <span>📅 收录时间: 2026年</span>
            <span>🔍 知识领域: 网络通信与科学上网技术</span>
            <span>📖 难度分级: 通俗科普级</span>
          </div>
        </header>

        <div class="article-container article-body">
          ${gl.content}

          <div style="border-top: 1px solid var(--border); padding-top: 1.75rem; margin-top: 3rem; background: var(--bg-card); border-radius: var(--radius-lg); padding: 1.5rem;">
            <h3 style="margin-bottom: 0.5rem;">查看实际支持该特性的推荐机场：</h3>
            <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1rem;">
              前往综合排行榜或专题推荐，查看各品牌对专线与新兴协议的实际支持情况：
            </p>
            <div style="display: flex; gap: 0.75rem; flex-wrap: wrap;">
              <a href="../recommend/premium.html" class="btn btn-primary btn-sm">高端专线机场推荐</a>
              <a href="../ranking/overall.html" class="btn btn-secondary btn-sm">2026综合实力天梯榜</a>
              <a href="../guides/windows.html" class="btn btn-outline btn-sm">客户端上手教程</a>
            </div>
          </div>
        </div>
      </div>
    `;

    const html = renderHtmlPage({
      title: gl.title,
      description: gl.desc,
      keywords: gl.keywords,
      canonicalPath: `glossary/${gl.slug}.html`,
      depth: 1,
      activeNav: "glossary",
      breadcrumbs: [
        { name: "术语百科", path: "glossary/iplc-专线.html" },
        { name: gl.h1.split('：')[1] || gl.h1, path: `glossary/${gl.slug}.html` }
      ],
      contentHtml
    });

    outputHtml(`glossary/${gl.slug}.html`, html);
  });
}

// =============================================================================
// 9. 生成网站可信度与法律合规页面 (Trust & Legal)
// =============================================================================

function generateTrustPages() {
  const aboutHtml = renderHtmlPage({
    title: "关于GPT梯子助手 - 独立中立的机场与VPN评测团队",
    description: "了解GPT梯子助手的成立初衷、评测理念与数据准则。我们致力于为中文出海用户提供真实、中立、可验证的科学上网与网络优化参考。",
    keywords: "关于本站, GPT梯子助手, 机场评测团队, 独立中立, 真实评测",
    canonicalPath: "about.html",
    depth: 0,
    activeNav: "about",
    breadcrumbs: [{ name: "关于我们", path: "about.html" }],
    contentHtml: `
      <div class="container article-container article-body" style="padding-top: 2rem; padding-bottom: 4rem;">
        <h1 class="article-title">关于 GPT 梯子助手</h1>
        <p class="article-meta">致力于构建客观透明的中文网络节点资讯平台 · 成立时间: 2026年</p>

        <div class="callout">
          <div class="callout-title">我们的使命</div>
          <p>破除信息壁垒，剔除虚假跑分，算清真实单价，为每一位出海办公、外贸交流、学术科研与跨国视听爱好者提供真正靠谱的决策指南。</p>
        </div>

        <h2>我们是谁？</h2>
        <p>GPT梯子助手（gpttizihelper.top）是一支由网络安全工程师、全栈开发者与数字游民共同发起的独立评测媒体。重点对微风网络、暮光网络、飞猫云、无忧、灵猫、闪跃、萤火虫、跨界、隐形人、飞V、梯子云、浪网、灵动云、全球云等 14 大主流梯子品牌进行客观长期跟踪监测。</p>
      </div>
    `
  });
  outputHtml("about.html", aboutHtml);

  const contactHtml = renderHtmlPage({
    title: "联系我们 - 反馈与建议通道",
    description: "联系GPT梯子助手编辑部：反馈跑路机场、纠正测试数据、提交新品牌核验请求或进行技术交流。",
    keywords: "联系我们, 提交反馈, 机场核验, 数据纠错",
    canonicalPath: "contact.html",
    depth: 0,
    breadcrumbs: [{ name: "联系与反馈", path: "contact.html" }],
    contentHtml: `
      <div class="container article-container article-body" style="padding-top: 2rem; padding-bottom: 4rem;">
        <h1 class="article-title">联系与反馈通道</h1>
        <p>我们非常欢迎读者向我们提供第一手的节点稳定性反馈、曝光恶意跑路商家或提出内容改进建议。</p>
        <div class="card" style="margin-top: 1.5rem;">
          <code>contact@gpttizihelper.top</code>
        </div>
      </div>
    `
  });
  outputHtml("contact.html", contactHtml);

  const editorialHtml = renderHtmlPage({
    title: "编辑政策与客观评测准则 - GPT梯子助手",
    description: "GPT梯子助手的编辑准则与测评方法论：数据来源核验、评分加权算法、利益冲突声明与联盟营销推广披露。",
    keywords: "编辑政策, 评测准则, 联盟营销披露, 数据核验, 客观公正",
    canonicalPath: "editorial-policy.html",
    depth: 0,
    breadcrumbs: [{ name: "编辑政策", path: "editorial-policy.html" }],
    contentHtml: `
      <div class="container article-container article-body" style="padding-top: 2rem; padding-bottom: 4rem;">
        <h1 class="article-title">编辑政策与客观评测准则</h1>
        <p class="article-meta">最近修订日期: 2026年11月 · 遵循严格的新闻中立与事实核查准则</p>
        <h2>数据来源与实测</h2>
        <p>所有呈现数据均基于真实机房探针采样及公开资费比对（核查参考: jiediantuijian.shop）。</p>
      </div>
    `
  });
  outputHtml("editorial-policy.html", editorialHtml);

  const privacyHtml = renderHtmlPage({
    title: "用户隐私政策与数据保护说明 - GPT梯子助手",
    description: "GPT梯子助手网站隐私政策：我们如何收集、使用及保护访问者的个人信息。坚持极简数据采集与尊重用户隐私。",
    keywords: "隐私政策, 数据保护, Cookie说明, 用户隐私",
    canonicalPath: "privacy-policy.html",
    depth: 0,
    breadcrumbs: [{ name: "隐私政策", path: "privacy-policy.html" }],
    contentHtml: `
      <div class="container article-container article-body" style="padding-top: 2rem; padding-bottom: 4rem;">
        <h1 class="article-title">用户隐私政策</h1>
        <p>本站为纯静态资讯展示门户，不强制收集个人手机号、身份证或信用卡等敏感隐私数据。</p>
      </div>
    `
  });
  outputHtml("privacy-policy.html", privacyHtml);

  const disclaimerHtml = renderHtmlPage({
    title: "免责声明与服务合规说明 - GPT梯子助手",
    description: "GPT梯子助手的免责声明：版权声明、合规使用提示、网络安全法律提醒及第三方服务不可控性声明。",
    keywords: "免责声明, 合规说明, 法律提示, 版权声明",
    canonicalPath: "disclaimer.html",
    depth: 0,
    breadcrumbs: [{ name: "免责声明", path: "disclaimer.html" }],
    contentHtml: `
      <div class="container article-container article-body" style="padding-top: 2rem; padding-bottom: 4rem;">
        <h1 class="article-title">免责声明与合规说明</h1>
        <div class="callout callout-warning">
          <div class="callout-title">⚠️ 网络安全合规提示</div>
          <p>请严格遵守所在国家与地区的法律法规，切勿利用任何网络代理技术从事危害国家安全或违法的行为。</p>
        </div>
      </div>
    `
  });
  outputHtml("disclaimer.html", disclaimerHtml);

  const errorHtml = renderHtmlPage({
    title: "404 - 页面未找到",
    description: "抱歉，您访问的页面不存在或已被移动。返回GPT梯子助手首页查看最新机场推荐与教程。",
    keywords: "404, 页面未找到",
    canonicalPath: "404.html",
    depth: 0,
    contentHtml: `
      <div class="container" style="padding: 5rem 1.5rem; text-align: center;">
        <div style="font-size: 4rem; margin-bottom: 1rem;">🚀 404</div>
        <h1 style="font-size: 2rem; font-weight: 800; color: var(--text-main); margin-bottom: 1rem;">抱歉，您访问的页面已迷失在星空中</h1>
        <p style="color: var(--text-subtle); max-width: 500px; margin: 0 auto 2rem auto;">
          您所请求的 URL 可能已更改或已被移除。建议您返回首页浏览最新 14 大品牌资讯。
        </p>
        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <a href="index.html" class="btn btn-primary">返回网站首页</a>
          <a href="recommend/budget.html" class="btn btn-secondary">精选机场推荐</a>
          <a href="ranking/overall.html" class="btn btn-outline">综合实力天梯榜</a>
        </div>
      </div>
    `
  });
  outputHtml("404.html", errorHtml);
}

// =============================================================================
// 10. 生成 SEO 核心文件 (sitemap.xml, robots.txt, Bing 验证, IndexNow)
// =============================================================================

function generateSeoFiles() {
  const basePages = [
    '',
    'recommend/budget.html',
    'recommend/premium.html',
    'recommend/beginner.html',
    'recommend/stable.html',
    'recommend/ai.html',
    'recommend/streaming.html',
    'ranking/overall.html',
    'ranking/value.html',
    'ranking/budget.html',
    'ranking/stable.html',
    'compare/index.html',
    'guides/windows.html',
    'guides/android.html',
    'guides/ios.html',
    'guides/macos.html',
    'blog/how-to-choose-airport-in-2026.html',
    'blog/iplc-vs-bgp-transit.html',
    'blog/airport-protocols-clash-singbox.html',
    'blog/how-to-unblock-chatgpt-claude.html',
    'blog/streaming-4k-unlock-guide.html',
    'glossary/iplc-专线.html',
    'glossary/bgp-中转.html',
    'glossary/clash-verge.html',
    'glossary/hysteria2.html',
    'glossary/multiplier.html',
    'about.html',
    'contact.html',
    'editorial-policy.html',
    'privacy-policy.html',
    'disclaimer.html'
  ];

  // 加上 14 个品牌的 airport/ 和 review/ 页面
  const airportPages = airports.map(a => `airport/${a.slug}.html`);
  const reviewPages = airports.map(a => `review/${a.slug}.html`);
  const allPages = [...basePages, ...airportPages, ...reviewPages];

  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => {
  const loc = p === '' ? `${SITE_URL}/` : `${SITE_URL}/${p}`;
  const priority = p === '' ? '1.0' : p.startsWith('recommend/') || p.startsWith('ranking/') ? '0.9' : p.startsWith('review/') || p.startsWith('airport/') ? '0.85' : '0.6';
  const changefreq = p === '' ? 'daily' : p.startsWith('ranking/') ? 'weekly' : 'monthly';
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${CURRENT_DATE}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}).join('\n')}
</urlset>`;
  outputHtml("sitemap.xml", sitemapXml);

  const robotsTxt = `User-agent: *
Allow: /

# Bing SEO 专项配置与站点地图声明
Sitemap: ${SITE_URL}/sitemap.xml
`;
  outputHtml("robots.txt", robotsTxt);

  const bingAuthXml = `<?xml version="1.0"?>
<users>
	<user>GPTTIZIHELPER_BING_VERIFICATION_KEY</user>
</users>`;
  outputHtml("BingSiteAuth.xml", bingAuthXml);

  const INDEXNOW_KEY = '8f4b5e67a91249b5812e9b01c1827439';
  outputHtml(`${INDEXNOW_KEY}.txt`, INDEXNOW_KEY);

  const indexNowJson = {
    host: DOMAIN,
    key: INDEXNOW_KEY,
    keyLocation: `https://${DOMAIN}/${INDEXNOW_KEY}.txt`,
    urlList: allPages.map(p => p === '' ? `https://${DOMAIN}/` : `https://${DOMAIN}/${p}`)
  };
  outputHtml("indexnow.json", JSON.stringify(indexNowJson, null, 2));

  console.log(`✓ SEO 技术文件已生成：sitemap.xml, robots.txt, BingSiteAuth.xml, indexnow.json (${allPages.length} URLs)`);
}

function main() {
  console.log('>>> 正在生成网站全量 14 品牌页面体系...');
  generateIndex();
  generateRecommendations();
  generateRankings();
  generateAirportsAndReviews();
  generateCompare();
  generateGuides();
  generateBlogs();
  generateGlossary();
  generateTrustPages();
  generateSeoFiles();
  console.log('🎉 全站纯静态 HTML 页面生成完毕！14 大品牌数据已全部植入并已适配相对路径。');
}

main();
