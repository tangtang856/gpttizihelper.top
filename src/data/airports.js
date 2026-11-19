/**
 * 机场统一数据库 (src/data/airports.js)
 * 符合项目规范，作为所有推荐卡片、排行榜、评测与对比系统的唯一数据源
 */

const airports = [
  {
    id: "paofu",
    name: "泡芙云 (Paofu Cloud)",
    slug: "paofu",
    description: "老牌中继与专线融合机场，以平价资费与全天候高峰抗抖动能力著称，主打日常4K流媒体与多地区节点平衡。",
    officialUrl: "https://paofu.cloud",
    affiliateUrl: "https://gpttizihelper.top/go/paofu",
    startingPrice: 12.0,
    currency: "CNY",
    plans: [
      { name: "入门版 (小泡芙)", price: 12.0, period: "月付", trafficGb: 80, unitPricePerGb: 0.150, note: "限制2台设备，基础中转" },
      { name: "标准版 (中泡芙)", price: 25.0, period: "月付", trafficGb: 200, unitPricePerGb: 0.125, note: "3台设备，含晚高峰专线" },
      { name: "旗舰版 (大泡芙)", price: 45.0, period: "月付", trafficGb: 450, unitPricePerGb: 0.100, note: "5台设备，全IPLC专线保障" }
    ],
    protocols: ["Shadowsocks", "Vmess"],
    regions: ["香港", "日本", "新加坡", "美国", "台湾"],
    deviceLimit: "2~5台设备同时在线",
    aiSupport: ["ChatGPT", "Claude 3.5 Sonnet", "Midjourney"],
    streamingSupport: ["Netflix", "Disney+", "YouTube Premium", "HBO Max"],
    advantages: [
      "全天晚高峰网络丢包率控制在 1.5% 以内",
      "起步门槛低，月付仅需12元，适合日常冲浪",
      "节点均配备原生住宅IP，流媒体解锁成功率高"
    ],
    disadvantages: [
      "入门套餐仅允许2台设备同时在线",
      "不支持 Hysteria 2 等 UDP 暴力协议"
    ],
    suitableFor: ["日常网页浏览", "YouTube 4K 流媒体重度用户", "轻中度 AI 办公人群"],
    sources: ["泡芙云官方公示数据", "编辑部晚高峰实测 (2026-11)"],
    lastVerified: "2026-11-15",
    testStatus: "tested",
    overallScore: 9.2,
    speedScore: 9.1,
    stabilityScore: 9.4,
    valueScore: 9.3
  },
  {
    id: "mojie",
    name: "魔戒 (Mojie)",
    slug: "mojie",
    description: "业内著名的按量计费不限时机场，流量永久有效，不设设备数量限制，是备用梯子与多端轻度用户的经典之选。",
    officialUrl: "https://mojie.link",
    affiliateUrl: "https://gpttizihelper.top/go/mojie",
    startingPrice: 15.0,
    currency: "CNY",
    plans: [
      { name: "按量体验包", price: 15.0, period: "一次性购买", trafficGb: 130, unitPricePerGb: 0.115, note: "不限时长，用完为止，无设备限制" },
      { name: "按量进阶包", price: 30.0, period: "一次性购买", trafficGb: 300, unitPricePerGb: 0.100, note: "不限时长，永久有效" },
      { name: "按量畅享包", price: 80.0, period: "一次性购买", trafficGb: 1000, unitPricePerGb: 0.080, note: "超大容量，高性价比" }
    ],
    protocols: ["Shadowsocks", "Vless"],
    regions: ["香港", "日本", "台湾", "新加坡", "美国", "英国"],
    deviceLimit: "不限制在线设备数",
    aiSupport: ["ChatGPT", "Copilot", "Claude (部分节点)"],
    streamingSupport: ["YouTube 4K", "Netflix (主流区)"],
    advantages: [
      "按量计费不限时间，不用不扣钱，完全杜绝月费浪费",
      "全套餐不限制在线设备数量，家庭多设备共享首选",
      "基础每GB单价低至 0.08~0.11 元"
    ],
    disadvantages: [
      "未配备独立昂贵的 IPLC 内网专线，极端晚高峰可能偶有延迟抖动",
      "部分极其挑剔 IP 的小众 AI 平台偶有拦截提示"
    ],
    suitableFor: ["备用防断联梯子", "轻度出海外网查资料", "家庭/工作室多设备共享"],
    sources: ["魔戒用户后台公示资费", "编辑部按量扣费与延迟实测"],
    lastVerified: "2026-11-12",
    testStatus: "tested",
    overallScore: 9.0,
    speedScore: 8.8,
    stabilityScore: 8.9,
    valueScore: 9.7
  },
  {
    id: "tag",
    name: "TAG Internet",
    slug: "tag",
    description: "高端老牌全 IEPL 内网专线机场代表，覆盖全球90多个国家和地区超200个节点，原生商业IP与极致解锁能力天花板。",
    officialUrl: "https://tag-vpn.com",
    affiliateUrl: "https://gpttizihelper.top/go/tag",
    startingPrice: 160.0,
    currency: "CNY",
    plans: [
      { name: "个人轻度季付", price: 160.0, period: "季付 (约53元/月)", trafficGb: 750, unitPricePerGb: 0.213, note: "折合每月250GB，全专线" },
      { name: "标准年付版", price: 600.0, period: "年付 (约50元/月)", trafficGb: 3600, unitPricePerGb: 0.166, note: "每月300GB，全节点原生IP" },
      { name: "特权团队版", price: 1200.0, period: "年付", trafficGb: 9600, unitPricePerGb: 0.125, note: "10台设备，顶级BGP+IEPL专线" }
    ],
    protocols: ["Shadowsocks"],
    regions: ["香港", "日本", "台湾", "新加坡", "美国", "英国", "欧洲20国", "南美与非洲冷门地区"],
    deviceLimit: "4~10台设备",
    aiSupport: ["ChatGPT Plus", "Claude Pro (全节点原生通过)", "Midjourney", "Perplexity"],
    streamingSupport: ["Netflix 全区", "Disney+", "BBC iPlayer", "Hulu", "DAZN", "Spotify"],
    advantages: [
      "覆盖90+国家与地区200+节点，全网极少能比拟的冷门国家覆盖率",
      "全IEPL企业级内网专线，延迟极低，零断流与零晚高峰拥塞",
      "节点全系原生IP，AI与各流媒体跨区解锁成功率接近100%"
    ],
    disadvantages: [
      "门槛较高，需季付或年付起步",
      "纯按月单买成本较高，不适合超低预算人群"
    ],
    suitableFor: ["跨境电商跨国选品", "外企学术研究与企业办公", "高端流媒体与重度AI玩家"],
    sources: ["TAG 官方运营公告", "全球节点延迟与IP欺诈度实测数据库"],
    lastVerified: "2026-11-18",
    testStatus: "tested",
    overallScore: 9.6,
    speedScore: 9.8,
    stabilityScore: 9.7,
    valueScore: 8.5
  },
  {
    id: "flyingbird",
    name: "飞鸟云 (FlyingBird)",
    slug: "flyingbird",
    description: "运营多年口碑稳定的专线梯子品牌，采用深港/沪日企业级 IPLC 内网专线，晚高峰时延表现极佳，技术客服响应迅速。",
    officialUrl: "https://flyingbird.run",
    affiliateUrl: "https://gpttizihelper.top/go/flyingbird",
    startingPrice: 15.0,
    currency: "CNY",
    plans: [
      { name: "青铜月付套餐", price: 15.0, period: "月付", trafficGb: 100, unitPricePerGb: 0.150, note: "3台设备，基础专线" },
      { name: "黄金月付套餐", price: 32.0, period: "月付", trafficGb: 240, unitPricePerGb: 0.133, note: "5台设备，含高倍率纯净专线" },
      { name: "铂金年付套餐", price: 320.0, period: "年付", trafficGb: 3000, unitPricePerGb: 0.106, note: "年付优惠，极佳稳定性" }
    ],
    protocols: ["Shadowsocks", "Trojan"],
    regions: ["香港", "日本", "韩国", "新加坡", "美国", "德国"],
    deviceLimit: "3~5台设备",
    aiSupport: ["ChatGPT", "Claude", "Copilot", "Google Gemini"],
    streamingSupport: ["Netflix 4K", "Disney+", "YouTube 4K 60fps"],
    advantages: [
      "多年老牌持续运营，团队运维成熟，跑路风险极低",
      "纯内网 IPLC 专线，不经过 GFW 防火墙审查，封锁期零影响",
      "工单平均响应时间在 30 分钟以内"
    ],
    disadvantages: [
      "小众冷门国家节点较少，主要集中在亚太与美欧核心骨干区",
      "不提供免费试用，需购买入门套餐体验"
    ],
    suitableFor: ["追求长期省心免折腾的用户", "外贸办公与晚高峰重度视听", "家庭主力梯子"],
    sources: ["飞鸟云服务协议与资费清单", "晚高峰8点~11点带宽吞吐连续抽检"],
    lastVerified: "2026-11-10",
    testStatus: "tested",
    overallScore: 9.3,
    speedScore: 9.3,
    stabilityScore: 9.5,
    valueScore: 9.1
  },
  {
    id: "wgp",
    name: "微基闪电 (WGP Transit)",
    slug: "wgp",
    description: "专注于高性价比中继与新兴轻量协议的中型机场，率先支持 Hysteria 2 与 Vless 协议，对弱网与移动蜂窝网络有针对性优化。",
    officialUrl: "https://wgp.top",
    affiliateUrl: "https://gpttizihelper.top/go/wgp",
    startingPrice: 10.0,
    currency: "CNY",
    plans: [
      { name: "学生轻量版", price: 10.0, period: "月付", trafficGb: 60, unitPricePerGb: 0.166, note: "3台设备，适合学生党" },
      { name: "标准均衡版", price: 20.0, period: "月付", trafficGb: 150, unitPricePerGb: 0.133, note: "5台设备，多线中转" },
      { name: "极速旗舰版", price: 38.0, period: "月付", trafficGb: 380, unitPricePerGb: 0.100, note: "全协议解锁，专线中继" }
    ],
    protocols: ["Trojan", "Vless", "Hysteria2"],
    regions: ["香港", "日本", "台湾", "新加坡", "美国"],
    deviceLimit: "3~5台设备",
    aiSupport: ["ChatGPT", "Claude (需选择指定解锁节点)"],
    streamingSupport: ["YouTube 4K", "Netflix (主流剧集)", "Disney+"],
    advantages: [
      "原生支持 Hysteria 2 协议，在校园网与拥堵弱网下提速明显",
      "起步资费仅10元/月，价格敏感用户亲和力强",
      "支持节点一键订阅与智能自动负载均衡"
    ],
    disadvantages: [
      "小众国家较少",
      "Hysteria 2 UDP 协议在个别省份运营商可能遭遇 QOS 限速"
    ],
    suitableFor: ["学生与预算紧张人群", "移动网络与校园网弱网环境", "喜欢尝鲜新协议的技术玩家"],
    sources: ["微基闪电官方配置文档", "移动4G/5G弱网下丢包重传实测"],
    lastVerified: "2026-11-05",
    testStatus: "tested",
    overallScore: 8.9,
    speedScore: 9.0,
    stabilityScore: 8.7,
    valueScore: 9.4
  }
];

module.exports = { airports };
