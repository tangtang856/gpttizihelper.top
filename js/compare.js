/**
 * GPT梯子助手 (gpttizihelper.top) - 机场横向对比工具交互
 * 纯原生 JS，支持离线与本地 file:// 运行，动态对比 14 家真实机场
 */

document.addEventListener('DOMContentLoaded', function () {
  const airportDatabase = [
    {
      id: 'breezenet',
      name: '微风网络 Breezenet',
      slug: 'breezenet',
      startingPrice: 8.0,
      currency: 'CNY',
      startingPeriod: '月付',
      minTraffic: '200GB/月',
      unitCost: '0.040 元/GB',
      routeType: 'IEPL/IPLC 骨干专线',
      protocols: ['VLESS', 'Trojan'],
      regions: ['香港', '日本', '新加坡', '台湾', '美国', '德国', '英国'],
      deviceLimit: '4~6台设备同时在线',
      aiSupport: '支持 ChatGPT、Claude 3.5、Midjourney',
      streamingSupport: '支持 Netflix、Disney+、YouTube Premium 4K',
      advantages: ['¥8/月超低起步价，200GB大容量', 'IEPL/IPLC专线，晚高峰极低丢包', '优惠码 weifeng90'],
      disadvantages: ['入门套餐限制4台设备', '不支持早期的Shadowsocks旧协议'],
      suitableFor: ['高性价比追求者', '学生党与日常冲浪', 'YouTube 4K重度追剧'],
      testStatus: 'tested',
      lastVerified: '2026-11-19'
    },
    {
      id: 'muguang',
      name: '暮光网络',
      slug: 'muguang',
      startingPrice: 20.0,
      currency: 'CNY',
      startingPeriod: '月付',
      minTraffic: '120GB/月',
      unitCost: '0.167 元/GB',
      routeType: '专线节点网络架构',
      protocols: ['VLESS', 'Shadowsocks'],
      regions: ['香港', '日本', '新加坡', '台湾', '美国', '英国'],
      deviceLimit: '4~6台设备同时在线',
      aiSupport: '支持 ChatGPT、Claude、Copilot',
      streamingSupport: '支持 Netflix 4K、Disney+、YouTube 4K',
      advantages: ['专线节点网络架构，晚高峰网络抖动低至1.3ms', '120GB起步流量充裕', '三网智能BGP入口'],
      disadvantages: ['起步资费相对微风略高', '暂无不限时套餐'],
      suitableFor: ['白领涉外办公', '家庭多设备协同', '日常稳定冲浪'],
      testStatus: 'tested',
      lastVerified: '2026-11-19'
    },
    {
      id: 'feimaoyun',
      name: '飞猫云',
      slug: 'feimaoyun',
      startingPrice: 7.0,
      currency: 'CNY',
      startingPeriod: '月付(年付折算)',
      minTraffic: '150GB/月',
      unitCost: '0.047 元/GB',
      routeType: 'IEPL/IPLC 专线与优质中转双线冗余',
      protocols: ['Shadowsocks', 'V2Ray'],
      regions: ['香港', '日本', '新加坡', '美国', '台湾', '德国'],
      deviceLimit: '4~6台设备同时在线',
      aiSupport: '支持 ChatGPT、Claude 3.5、Midjourney',
      streamingSupport: '支持 Netflix、Disney+、YouTube 4K',
      advantages: ['年付折算单月仅 ¥7 起，性价比极其突出', '专线与中转双线冗余自愈', '优惠码 flycat888'],
      disadvantages: ['最低单价需年付享受', '部分小众节点晚高峰偶有波动'],
      suitableFor: ['长周期省心用户', '追剧看4K视频', '外贸跨境沟通'],
      testStatus: 'tested',
      lastVerified: '2026-11-19'
    },
    {
      id: 'wuyou',
      name: '无忧',
      slug: 'wuyou',
      startingPrice: 19.0,
      currency: 'CNY',
      startingPeriod: '月付',
      minTraffic: '100GB/月',
      unitCost: '0.190 元/GB',
      routeType: '真实物理 IPLC 内网专线',
      protocols: ['Shadowsocks', 'V2Ray'],
      regions: ['香港', '日本', '新加坡', '美国', '台湾'],
      deviceLimit: '4~6台设备',
      aiSupport: '支持 ChatGPT、Claude、Gemini',
      streamingSupport: '支持 Netflix、Disney+、YouTube 4K',
      advantages: ['纯真实 IPLC 专线，抗封锁稳定性极高', '香港节点延迟低至 14ms', '优惠码 wuyou666'],
      disadvantages: ['基础版流量 100GB', '节点集中在亚太核心机房'],
      suitableFor: ['外贸商务通信', '跨境电商管理', '远程办公协作'],
      testStatus: 'tested',
      lastVerified: '2026-11-19'
    },
    {
      id: 'lingmao',
      name: '灵猫',
      slug: 'lingmao',
      startingPrice: 25.0,
      currency: 'CNY',
      startingPeriod: '月付',
      minTraffic: '150GB/月',
      unitCost: '0.167 元/GB',
      routeType: 'IPLC 专线 / 全节点原生IP',
      protocols: ['Shadowsocks'],
      regions: ['香港', '日本', '新加坡', '美国', '台湾', '英国'],
      deviceLimit: '4~6台设备',
      aiSupport: 'ChatGPT Plus、Claude Pro 全节点原生解锁',
      streamingSupport: 'Netflix全区、Disney+、BBC iPlayer、Hulu',
      advantages: ['全节点原生IP覆盖，AI与流媒体解锁近100%', '千兆高速专线带宽', '设备电量消耗低'],
      disadvantages: ['起步价格 ¥25/月', '不支持旧款协议'],
      suitableFor: ['AI研究与提示词调优', '海外影视狂热粉', '高画质流媒体观看'],
      testStatus: 'tested',
      lastVerified: '2026-11-19'
    },
    {
      id: 'flashleap',
      name: '闪跃 FlashLeap',
      slug: 'flashleap',
      startingPrice: 24.0,
      currency: 'CNY',
      startingPeriod: '月付',
      minTraffic: '150GB/月',
      unitCost: '0.160 元/GB',
      routeType: 'IPLC 纯专线 / 电竞级低延迟',
      protocols: ['Shadowsocks', 'Trojan'],
      regions: ['香港', '日本', '新加坡', '台湾', '美国', '韩国'],
      deviceLimit: '4~6台设备',
      aiSupport: '支持 ChatGPT、Claude、Perplexity',
      streamingSupport: '支持 Netflix、Disney+、YouTube 4K 60fps',
      advantages: ['晚高峰实测丢包率低于 0.1%，近乎零断流', '香港延迟 13ms，日本 35ms', '优惠码 shanyue'],
      disadvantages: ['无按量计费套餐', '小众冷门国别较少'],
      suitableFor: ['外服游戏联机低延迟', '外贸商务办公', '4K HDR原盘级视听'],
      testStatus: 'tested',
      lastVerified: '2026-11-19'
    },
    {
      id: 'firefly',
      name: '萤火虫（Firefly）',
      slug: 'firefly',
      startingPrice: 8.0,
      currency: 'CNY',
      startingPeriod: '月付(年付折算)',
      minTraffic: '60GB/月',
      unitCost: '0.133 元/GB',
      routeType: '优质中转与专线',
      protocols: ['VLESS', 'Trojan'],
      regions: ['香港', '日本', '新加坡', '美国', '台湾'],
      deviceLimit: '3~5台设备',
      aiSupport: '支持 ChatGPT、Claude',
      streamingSupport: '支持 YouTube 4K、Netflix',
      advantages: ['入门价格门槛低，年付折合单月仅 ¥8', '全面适配 VLESS 新协议', '专属优惠码 firefly'],
      disadvantages: ['特惠套餐 60GB 适合轻度冲浪', '并发设备数相对较少'],
      suitableFor: ['轻度外网查资料', '学生党备用梯子', '手机端轻度冲浪'],
      testStatus: 'tested',
      lastVerified: '2026-11-19'
    },
    {
      id: 'kuajiecloud',
      name: '跨界',
      slug: 'kuajiecloud',
      startingPrice: 20.0,
      currency: 'CNY',
      startingPeriod: '月付',
      minTraffic: '120GB/月',
      unitCost: '0.167 元/GB',
      routeType: '全专线网络架构',
      protocols: ['Shadowsocks'],
      regions: ['香港', '日本', '新加坡', '台湾', '美国', '德国'],
      deviceLimit: '4~6台设备',
      aiSupport: '支持 ChatGPT、Claude、Midjourney',
      streamingSupport: '支持 Netflix 4K、Disney+、YouTube 4K',
      advantages: ['全专线网络架构，延迟稳定性极佳', '120GB 起步月流量设计合理', '优惠码 jichangcha09'],
      disadvantages: ['节点命名规范传统', '暂无自研客户端'],
      suitableFor: ['追求全专线品质的用户', '跨境电商选品与管理', '多端轻度办公'],
      testStatus: 'tested',
      lastVerified: '2026-11-19'
    },
    {
      id: 'yinxingren',
      name: '隐形人',
      slug: 'yinxingren',
      startingPrice: 24.0,
      currency: 'CNY',
      startingPeriod: '月付',
      minTraffic: '144GB/月',
      unitCost: '0.167 元/GB',
      routeType: '企业级 IEPL 纯专线',
      protocols: ['VLESS', 'Shadowsocks'],
      regions: ['香港', '日本', '新加坡', '台湾', '美国', '英国', '德国'],
      deviceLimit: '5~8台设备同时在线',
      aiSupport: 'ChatGPT Plus、Claude Pro 原生全解锁',
      streamingSupport: 'Netflix全区、Disney+、YouTube 4K 60fps',
      advantages: ['企业级 IEPL 纯专线，晚高峰丢包率仅 0.0%~0.1%', '起步享 144GB 充沛流量', '优惠码 yxr888'],
      disadvantages: ['中高端定位，无超低价体验包', '高峰期工单咨询需排队'],
      suitableFor: ['涉外企业与跨境团队', '重度AI大模型工程师', '追求极致稳定体验者'],
      testStatus: 'tested',
      lastVerified: '2026-11-19'
    },
    {
      id: 'feiv',
      name: '飞V',
      slug: 'feiv',
      startingPrice: 4.9,
      currency: 'CNY',
      startingPeriod: '月付',
      minTraffic: '100GB/月',
      unitCost: '0.049 元/GB',
      routeType: 'BGP 优化线路 / 不限时按量',
      protocols: ['Trojan', 'V2Ray'],
      regions: ['香港', '日本', '新加坡', '美国', '台湾'],
      deviceLimit: '3~5台设备',
      aiSupport: '支持 ChatGPT、Claude (部分节点)',
      streamingSupport: '支持 YouTube 4K、Netflix主流区',
      advantages: ['月付仅需 ¥4.9，全网地板价起步', '支持不限时套餐，¥29买断200GB永久不清零', '绝佳防灾备用方案'],
      disadvantages: ['极端晚高峰可能偶有测速波动', '小众冷门国别较少'],
      suitableFor: ['极度低预算人群', '备用防断联梯子', '轻度偶尔外网查资料'],
      testStatus: 'tested',
      lastVerified: '2026-11-19'
    },
    {
      id: 'laddercloud',
      name: '梯子云 LadderCloud',
      slug: 'laddercloud',
      startingPrice: 25.0,
      currency: 'CNY',
      startingPeriod: '月付',
      minTraffic: '125GB/月',
      unitCost: '0.200 元/GB',
      routeType: '高速中转与专线',
      protocols: ['Shadowsocks', 'Trojan'],
      regions: ['香港', '日本', '新加坡', '台湾', '美国', '英国'],
      deviceLimit: '4~6台设备',
      aiSupport: '支持 ChatGPT、Claude、Copilot',
      streamingSupport: '支持 Netflix 4K、Disney+、YouTube 4K',
      advantages: ['老牌团队持续运营，线路稳定性长期有保障', '香港延迟稳定在 15ms', '大流量方案选择丰富'],
      disadvantages: ['起步价 ¥25/月', '暂无按量计费包'],
      suitableFor: ['长期稳定自用', '办公网络分流', '日常刷4K视频'],
      testStatus: 'tested',
      lastVerified: '2026-11-19'
    },
    {
      id: 'wavenet',
      name: '浪网 WaveNet',
      slug: 'wavenet',
      startingPrice: 30.0,
      currency: 'CNY',
      startingPeriod: '月付',
      minTraffic: '150GB/月',
      unitCost: '0.200 元/GB',
      routeType: '自研客户端优化线路 / VLESS',
      protocols: ['VLESS'],
      regions: ['香港', '日本', '新加坡', '台湾', '美国', '德国', '英国'],
      deviceLimit: '5~8台设备同时在线',
      aiSupport: '支持 ChatGPT、Claude 3.5 Sonnet、Midjourney',
      streamingSupport: '支持 Netflix 全区、Disney+、YouTube 4K',
      advantages: ['150GB~360GB 大流量配置，彻底摆脱流量焦虑', '晚高峰丢包率仅 0.0%~0.2%', '自研链路抗干扰强'],
      disadvantages: ['起步价格 ¥30/月', '不提供免费试用'],
      suitableFor: ['大流量下载与外贸视听', '涉外学术团队', '重度AI生产力开发'],
      testStatus: 'tested',
      lastVerified: '2026-11-19'
    },
    {
      id: 'lingdongcloud',
      name: '灵动云',
      slug: 'lingdongcloud',
      startingPrice: 20.0,
      currency: 'CNY',
      startingPeriod: '月付',
      minTraffic: '100GB/月',
      unitCost: '0.200 元/GB',
      routeType: 'Trojan 安全加密架构',
      protocols: ['Trojan'],
      regions: ['香港', '日本', '新加坡', '台湾', '美国'],
      deviceLimit: '4~6台设备',
      aiSupport: '支持 ChatGPT、Claude、Gemini',
      streamingSupport: '支持 YouTube 4K、Netflix、Disney+',
      advantages: ['100GB 均衡起步流量，实用不浪费', 'Trojan 协议成熟度极高，防封锁特征弱', '资费清晰无套路'],
      disadvantages: ['小众冷门国别节点较少', '无按量计费不限时套餐'],
      suitableFor: ['日常网页浏览', '轻办公与视频观看', '不喜折腾的新手用户'],
      testStatus: 'tested',
      lastVerified: '2026-11-19'
    },
    {
      id: 'quanqiuyun',
      name: '全球云',
      slug: 'quanqiuyun',
      startingPrice: 20.0,
      currency: 'CNY',
      startingPeriod: '月付',
      minTraffic: '120GB/月',
      unitCost: '0.167 元/GB',
      routeType: '经典中转优化 / 双协议',
      protocols: ['VLESS', 'Trojan'],
      regions: ['香港', '日本', '新加坡', '台湾', '美国', '欧洲'],
      deviceLimit: '4~6台设备',
      aiSupport: '支持 ChatGPT、Claude、Copilot',
      streamingSupport: '支持 Netflix、Disney+、YouTube 4K',
      advantages: ['深度优化中转链路，节点全天高可用', '120GB 经典起步配额', '优惠码 tt88 支持'],
      disadvantages: ['暂无按量计费套餐', '部分冷门节点连接延迟略高'],
      suitableFor: ['日常核心主力', '外贸办公与出海沟通', '4K影视追剧'],
      testStatus: 'tested',
      lastVerified: '2026-11-19'
    }
  ];

  const compareContainer = document.getElementById('compare-matrix-view');
  const checkboxes = document.querySelectorAll('.compare-airport-checkbox');

  function getPrefix() {
    return '../';
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
        * 数据由 GPT梯子助手 编辑部严格核验（来源: https://jiediantuijian.shop），最近核验时间为 2026-11。实际套餐及速率以各平台最新官方公布为准。
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

  renderMatrix();
});
