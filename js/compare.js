/**
 * GPT梯子助手 (gpttizihelper.top) - 机场横向对比工具交互
 * 纯原生 JS，支持离线与本地 file:// 运行，动态对比 2-4 家机场
 */

document.addEventListener('DOMContentLoaded', function () {
  const airportDatabase = [
    {
      id: 'paofu',
      name: '泡芙云 (Paofu Cloud)',
      slug: 'paofu',
      startingPrice: 12.0,
      currency: 'CNY',
      startingPeriod: '月付',
      minTraffic: '80GB/月',
      unitCost: '0.150 元/GB',
      routeType: 'BGP隧道中转 / 部分IPLC',
      protocols: ['Shadowsocks', 'Vmess'],
      regions: ['香港', '日本', '新加坡', '美国', '台湾'],
      deviceLimit: '2~5台设备同时在线',
      aiSupport: '支持 ChatGPT、Claude、Midjourney (原生IP解锁)',
      streamingSupport: '支持 Netflix、Disney+、YouTube Premium 4K',
      advantages: ['全天高峰期抗抖动性优异', '价格亲民门槛低', '提供一键导入订阅教程'],
      disadvantages: ['低配套餐限制2台设备', '高峰期偶尔测速波动'],
      suitableFor: ['日常冲浪', '刷4K视频', '轻中度AI工作者'],
      testStatus: 'tested',
      lastVerified: '2026-11-15'
    },
    {
      id: 'mojie',
      name: '魔戒 (Mojie)',
      slug: 'mojie',
      startingPrice: 15.0,
      currency: 'CNY',
      startingPeriod: '一次性购买',
      minTraffic: '130GB (不限时长)',
      unitCost: '0.115 元/GB (按量计费)',
      routeType: 'BGP多线优化入口',
      protocols: ['Shadowsocks', 'Vless'],
      regions: ['香港', '日本', '台湾', '新加坡', '美国', '英国'],
      deviceLimit: '无设备数量限制',
      aiSupport: '支持常用AI工具，部分冷门节点不可用',
      streamingSupport: '支持 YouTube 4K、大部分流媒体',
      advantages: ['按量计费不过期，用多少扣多少', '无设备限制，家庭多设备友好', '性价比较高'],
      disadvantages: ['无独立IPLC内网专线', '极特殊晚高峰节点偶有延迟增加'],
      suitableFor: ['备用梯子', '轻度外网查资料', '多设备协同用户'],
      testStatus: 'tested',
      lastVerified: '2026-11-12'
    },
    {
      id: 'tag',
      name: 'TAG Internet',
      slug: 'tag',
      startingPrice: 160.0,
      currency: 'CNY',
      startingPeriod: '季付 (均53元/月)',
      minTraffic: '250GB/月',
      unitCost: '0.213 元/GB',
      routeType: '全IEPL内网专线',
      protocols: ['Shadowsocks'],
      regions: ['覆盖全球90+国家地区，200+节点（含大量冷门国别）', '香港', '日本', '美国', '欧洲', '东南亚', '南美'],
      deviceLimit: '4~10台设备',
      aiSupport: '原生住宅/商业IP，100%全解锁 ChatGPT、Claude',
      streamingSupport: '全节点解锁 Netflix 原生区、Disney+、BBC iPlayer',
      advantages: ['全球覆盖极广，海量原生冷门节点', '全IEPL顶级专线，延迟极低零丢包', '流媒体与AI解锁能力天花板'],
      disadvantages: ['起步价格较高，需季付起步', '不适合极低预算用户'],
      suitableFor: ['跨境电商出海', '学术与外企重度依赖', '流媒体发烧友'],
      testStatus: 'tested',
      lastVerified: '2026-11-18'
    },
    {
      id: 'flyingbird',
      name: '飞鸟云 (FlyingBird)',
      slug: 'flyingbird',
      startingPrice: 15.0,
      currency: 'CNY',
      startingPeriod: '月付',
      minTraffic: '100GB/月',
      unitCost: '0.150 元/GB',
      routeType: '深港/沪日 IPLC 国际专线',
      protocols: ['Shadowsocks', 'Trojan'],
      regions: ['香港', '日本', '韩国', '美国', '新加坡', '德国'],
      deviceLimit: '3~5台设备',
      aiSupport: '支持 OpenAI、Claude、Copilot',
      streamingSupport: '支持 Netflix、Disney+ 4K',
      advantages: ['老牌运营团队抗风险能力强', 'IPLC专线保障晚高峰顺畅', '工单技术支持响应较快'],
      disadvantages: ['节点国家不如TAG丰富', '暂不支持按量计费套餐'],
      suitableFor: ['长期稳定自用', '晚高峰看4K视频', '上班族与外贸工作者'],
      testStatus: 'tested',
      lastVerified: '2026-11-10'
    },
    {
      id: 'wgp',
      name: '微基闪电 (WGP Transit)',
      slug: 'wgp',
      startingPrice: 10.0,
      currency: 'CNY',
      startingPeriod: '月付',
      minTraffic: '60GB/月',
      unitCost: '0.166 元/GB',
      routeType: 'BGP中继 + 智能动态路由',
      protocols: ['Trojan', 'Vless', 'Hysteria2'],
      regions: ['香港', '日本', '台湾', '美国', '新加坡'],
      deviceLimit: '3台设备',
      aiSupport: '常用大模型支持',
      streamingSupport: '支持主流4K流媒体',
      advantages: ['率先支持 Hysteria 2 弱网加速', '入门价格低', '直连延迟控制良好'],
      disadvantages: ['运营年限相对年轻', '小众节点数量较少'],
      suitableFor: ['学生党', '弱网恶劣环境用户', '预算敏感型用户'],
      testStatus: 'tested',
      lastVerified: '2026-11-05'
    }
  ];

  const compareContainer = document.getElementById('compare-matrix-view');
  const checkboxes = document.querySelectorAll('.compare-airport-checkbox');

  // 计算相对链接前缀
  function getPrefix() {
    return '../'; // compare/index.html 在一层子目录中
  }

  function getSelectedAirports() {
    const selectedIds = [];
    checkboxes.forEach(cb => {
      if (cb.checked) {
        selectedIds.push(cb.value);
      }
    });
    return airportDatabase.filter(item => selectedIds.includes(item.id));
  }

  function renderMatrix() {
    if (!compareContainer) return;
    const selected = getSelectedAirports();

    if (selected.length < 2) {
      compareContainer.innerHTML = `
        <div style="background: #ffffff; border: 2px dashed var(--border); border-radius: var(--radius-lg); padding: 3rem 1.5rem; text-align: center;">
          <div style="font-size: 2.5rem; margin-bottom: 0.75rem;">⚖️</div>
          <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main); margin-bottom: 0.5rem;">请至少勾选 2 家机场进行对比</h3>
          <p style="color: var(--text-subtle); max-width: 480px; margin: 0 auto 1.5rem auto;">
            在上方的选择器中勾选您感兴趣的 2~4 个机场品牌，系统将实时为您生成价格、流量单价、线路类型、设备限制及解锁支持的多维对比矩阵。
          </p>
        </div>
      `;
      return;
    }

    const prefix = getPrefix();
    let tableHtml = `
      <div class="table-wrapper">
        <table class="compare-matrix-table">
          <thead>
            <tr>
              <th style="width: 140px; background: #f1f5f9;">对比维度</th>
              ${selected.map(item => `
                <th style="min-width: 180px;">
                  <div style="font-weight: 800; font-size: 1.05rem; margin-bottom: 0.25rem;">${item.name}</div>
                  <span class="badge ${item.testStatus === 'tested' ? 'badge-green' : 'badge-amber'}">${item.testStatus === 'tested' ? '已核实测' : '官方数据'}</span>
                </th>
              `).join('')}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">起步套餐价格</td>
              ${selected.map(item => `
                <td>
                  <span style="font-size: 1.25rem; font-weight: 800; color: var(--primary);">¥${item.startingPrice}</span>
                  <span style="font-size: 0.8rem; color: var(--text-subtle);"> / ${item.startingPeriod}</span>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">基础流量</td>
              ${selected.map(item => `<td><strong>${item.minTraffic}</strong></td>`).join('')}
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">折算每GB成本</td>
              ${selected.map(item => `<td><span class="badge badge-blue">${item.unitCost}</span></td>`).join('')}
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">核心线路类型</td>
              ${selected.map(item => `<td>${item.routeType}</td>`).join('')}
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">支持协议</td>
              ${selected.map(item => `<td>${item.protocols.map(p => `<code>${p}</code>`).join(' ')}</td>`).join('')}
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">节点覆盖区域</td>
              ${selected.map(item => `<td>${item.regions.join('、')}</td>`).join('')}
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">在线设备限制</td>
              ${selected.map(item => `<td>${item.deviceLimit}</td>`).join('')}
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">AI大模型解锁</td>
              ${selected.map(item => `<td>${item.aiSupport}</td>`).join('')}
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">4K流媒体解锁</td>
              ${selected.map(item => `<td>${item.streamingSupport}</td>`).join('')}
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">核心优势</td>
              ${selected.map(item => `
                <td>
                  <ul style="padding-left: 1.1rem; font-size: 0.825rem; color: #166534;">
                    ${item.advantages.map(a => `<li>${a}</li>`).join('')}
                  </ul>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">主要不足与注意</td>
              ${selected.map(item => `
                <td>
                  <ul style="padding-left: 1.1rem; font-size: 0.825rem; color: #991b1b;">
                    ${item.disadvantages.map(d => `<li>${d}</li>`).join('')}
                  </ul>
                </td>
              `).join('')}
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">最适合人群</td>
              ${selected.map(item => `
                <td>${item.suitableFor.map(s => `<span class="badge badge-gray" style="margin: 2px;">${s}</span>`).join('')}</td>
              `).join('')}
            </tr>
            <tr>
              <td style="font-weight: 700; background: #f8fafc;">独立详细评测</td>
              ${selected.map(item => `
                <td>
                  <a href="${prefix}review/${item.slug}.html" class="btn btn-primary btn-sm" style="width: 100%;">查看完整评测</a>
                </td>
              `).join('')}
            </tr>
          </tbody>
        </table>
      </div>
      <div style="font-size: 0.8rem; color: var(--text-subtle); margin-top: 0.75rem; text-align: right;">
        * 数据由 GPT梯子助手 编辑部严格核验，最近核验时间为 2026-11。实际套餐及速率以各平台最新官方公布为准。
      </div>
    `;

    compareContainer.innerHTML = tableHtml;
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', function () {
      const selected = getSelectedAirports();
      if (selected.length > 4) {
        alert('为保证对比表格的可读性，系统最多支持同时对比 4 家机场');
        this.checked = false;
        return;
      }
      renderMatrix();
    });
  });

  // 初始渲染
  renderMatrix();
});
