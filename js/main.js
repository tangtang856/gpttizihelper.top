/**
 * GPT梯子助手 (gpttizihelper.top) - 原生轻量交互脚本
 * 无任何外部库，纯 Vanilla JS，支持本地 file:// 双击和离线运行
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. 移动端菜单切换
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      mobileToggle.textContent = isOpen ? '✕' : '☰';
    });
  }

  // 2. 简易客户端搜索功能
  const searchBtn = document.getElementById('search-btn');
  const searchModal = document.getElementById('search-modal');
  const modalClose = document.getElementById('modal-close');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  // 本地搜索索引数据
  const searchIndex = [
    { title: '2026年中文机场推荐与梯子选购全指南', path: 'index.html', keywords: '机场推荐 梯子推荐 vpn 翻墙 节点' },
    { title: '低预算平价便宜机场推荐（月付5元起）', path: 'recommend/budget.html', keywords: '平价机场 便宜梯子 穷鬼套餐 性价比' },
    { title: '高端IPLC/IEPL内网专线机场精选', path: 'recommend/premium.html', keywords: 'IPLC 专线 高端 晚高峰 不卡顿 零丢包' },
    { title: '新手小白入门机场推荐（开箱即用）', path: 'recommend/beginner.html', keywords: '新手 小白 极简 一键导入' },
    { title: '稳定防断联VPN机场推荐（高可用）', path: 'recommend/stable.html', keywords: '稳定 防断联 高可用 抗封锁' },
    { title: 'ChatGPT与Claude专用AI原生IP机场', path: 'recommend/ai.html', keywords: 'ChatGPT Claude OpenAI 解锁 原生IP' },
    { title: 'Netflix与Disney+ 4K流媒体跨区解锁机场', path: 'recommend/streaming.html', keywords: '流媒体 奈飞 迪士尼 YouTube 4K 解锁' },
    { title: '2026年度优质机场综合实力天梯榜', path: 'ranking/overall.html', keywords: '综合排行 天梯榜 机场排名' },
    { title: '高性价比机场排行榜（每GB单价算清）', path: 'ranking/value.html', keywords: '性价比 每GB 单价 折算' },
    { title: '低预算平价机场排行榜', path: 'ranking/budget.html', keywords: '低预算 平价 便宜 穷鬼 排名' },
    { title: '晚高峰稳定性与抗封锁排行榜', path: 'ranking/stable.html', keywords: '稳定性 晚高峰 丢包率 排行' },
    { title: '机场横向参数在线对比工具', path: 'compare/index.html', keywords: '对比 比较 矩阵 参数' },
    { title: 'Windows系统Clash Verge与v2rayN上手教程', path: 'guides/windows.html', keywords: 'Windows Clash Verge v2rayN 教程 节点' },
    { title: 'Android安卓Clash Meta与Sing-box教程', path: 'guides/android.html', keywords: '安卓 Android Clash Sing-box 教程' },
    { title: 'iOS苹果Shadowrocket小火箭与Surge教程', path: 'guides/ios.html', keywords: 'iOS 苹果 小火箭 Shadowrocket Surge 教程' },
    { title: 'macOS苹果电脑Clash Verge配置指南', path: 'guides/macos.html', keywords: 'Mac macOS 苹果电脑 教程' },
    { title: '泡芙云（Paofu Cloud）深度评测', path: 'review/paofu.html', keywords: '泡芙云 评测 价格 优缺点' },
    { title: '魔戒（Mojie）按量计费深度评测', path: 'review/mojie.html', keywords: '魔戒 按量计费 不限时 评测' },
    { title: 'TAG Internet 海量全球节点专线评测', path: 'review/tag.html', keywords: 'TAG Internet 原生IP 专线 评测' },
    { title: '飞鸟云（FlyingBird）老牌性价比专线评测', path: 'review/flyingbird.html', keywords: '飞鸟云 评测 老牌 专线' },
    { title: '微基闪电网络中继服务实测评测', path: 'review/wgp.html', keywords: '微基闪电 中继 评测' },
    { title: '2026新手挑选靠谱机场防跑路全攻略', path: 'blog/how-to-choose-airport-in-2026.html', keywords: '挑选 避坑 防跑路 攻略' },
    { title: '深入解析直连、BGP中继与IPLC内网专线区别', path: 'blog/iplc-vs-bgp-transit.html', keywords: 'IPLC BGP 中继 区别' },
    { title: '翻墙协议对比：SS、Trojan、Vless与Hysteria2', path: 'blog/airport-protocols-clash-singbox.html', keywords: '协议 Shadowsocks Trojan Vless Hysteria2' },
    { title: '如何解决ChatGPT/Claude地区限制报错', path: 'blog/how-to-unblock-chatgpt-claude.html', keywords: 'ChatGPT报错 Access Denied 解除限制' },
    { title: '4K流媒体跨区解锁全攻略：Netflix与Disney+', path: 'blog/streaming-4k-unlock-guide.html', keywords: '流媒体 4K 奈飞 合租' },
    { title: '术语百科：什么是 IPLC 与 IEPL 专线？', path: 'glossary/iplc-专线.html', keywords: 'IPLC IEPL 专线 百科' },
    { title: '术语百科：什么是 BGP 隧道中转？', path: 'glossary/bgp-中转.html', keywords: 'BGP 中继 隧道 节点 百科' },
    { title: '术语百科：Clash Verge核心配置与分流规则', path: 'glossary/clash-verge.html', keywords: 'Clash 分流 规则 百科' },
    { title: '术语百科：Hysteria 2 协议原理与优势', path: 'glossary/hysteria2.html', keywords: 'Hysteria2 UDP 协议 百科' },
    { title: '术语百科：机场节点倍率是什么与计算公式', path: 'glossary/multiplier.html', keywords: '倍率 消耗 计算 百科' }
  ];

  // 计算当前页面到根目录的相对前缀 (支持任意深度的相对路径)
  function getRelativePrefix() {
    const pathname = window.location.pathname.replace(/\\/g, '/');
    // 判断层级
    if (pathname.includes('/recommend/') || pathname.includes('/ranking/') ||
        pathname.includes('/airport/') || pathname.includes('/review/') ||
        pathname.includes('/compare/') || pathname.includes('/guides/') ||
        pathname.includes('/blog/') || pathname.includes('/glossary/')) {
      return '../';
    }
    return '';
  }

  const prefix = getRelativePrefix();

  function openSearch() {
    if (searchModal) {
      searchModal.classList.add('open');
      if (searchInput) {
        searchInput.value = '';
        searchInput.focus();
        renderResults('');
      }
    }
  }

  function closeSearch() {
    if (searchModal) {
      searchModal.classList.remove('open');
    }
  }

  function renderResults(query) {
    if (!searchResults) return;
    const q = query.trim().toLowerCase();
    if (!q) {
      searchResults.innerHTML = '<div style="padding: 1.5rem; text-align: center; color: var(--text-subtle);">输入关键词（如：便宜、专线、iOS、Netflix、IPLC）快速检索本站内容</div>';
      return;
    }

    const filtered = searchIndex.filter(item => {
      return item.title.toLowerCase().includes(q) || item.keywords.toLowerCase().includes(q);
    });

    if (filtered.length === 0) {
      searchResults.innerHTML = '<div style="padding: 1.5rem; text-align: center; color: var(--text-subtle);">未找到与 “' + escapeHtml(q) + '” 相关的文章或页面</div>';
      return;
    }

    let html = '';
    filtered.slice(0, 8).forEach(item => {
      html += `
        <a href="${prefix}${item.path}" class="search-result-item">
          <div class="search-result-title">${escapeHtml(item.title)}</div>
          <div class="search-result-snippet">匹配主题: ${escapeHtml(item.keywords)}</div>
        </a>
      `;
    });
    searchResults.innerHTML = html;
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag));
  }

  if (searchBtn) {
    searchBtn.addEventListener('click', openSearch);
  }
  if (modalClose) {
    modalClose.addEventListener('click', closeSearch);
  }
  if (searchModal) {
    searchModal.addEventListener('click', function (e) {
      if (e.target === searchModal) closeSearch();
    });
  }
  if (searchInput) {
    searchInput.addEventListener('input', function (e) {
      renderResults(e.target.value);
    });
  }

  // 快捷键打开搜索 (Ctrl+K or Cmd+K)
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape' && searchModal && searchModal.classList.contains('open')) {
      closeSearch();
    }
  });
});
