/**
 * 机场统一数据库 (src/data/airports.js)
 * 用户指定的 14 个主力品牌及其官方推广链接与核实参数 (来源: https://jiediantuijian.shop)
 */

const airports = [
  {
    id: "breezenet",
    rank: 1,
    name: "微风网络 Breezenet",
    slug: "breezenet",
    description: "专注于高质量专线体验的高性价比机场，以月付¥8超低起步价提供200GB充沛流量，采用IEPL/IPLC主干线路与VLESS协议，是高性价比入门首选。",
    officialUrl: "https://edp01.breezenetaff.com/#/?code=h4GlIXwC",
    affiliateUrl: "https://edp01.breezenetaff.com/#/?code=h4GlIXwC",
    startingPrice: 8.0,
    currency: "CNY",
    plans: [
      { name: "微风入门版", price: 8.0, period: "月付", trafficGb: 200, unitPricePerGb: 0.040, note: "500Mbps带宽，4台设备，优惠码 weifeng90" },
      { name: "微风进阶版", price: 18.0, period: "月付", trafficGb: 500, unitPricePerGb: 0.036, note: "1000Mbps带宽，6台设备，千兆原生IP解锁" }
    ],
    protocols: ["VLESS", "Trojan"],
    regions: ["香港", "日本", "新加坡", "台湾", "美国", "德国", "英国"],
    deviceLimit: "4~6台设备同时在线",
    aiSupport: ["ChatGPT", "Claude 3.5 Sonnet", "Midjourney"],
    streamingSupport: ["Netflix", "Disney+", "YouTube Premium", "HBO Max"],
    coupon: "weifeng90",
    advantages: [
      "¥8/月超低起步门槛，标配 200GB 超大月度流量",
      "IEPL/IPLC 骨干专线架构，晚高峰丢包率低于 0.4%",
      "全面支持 VLESS 协议，全节点流媒体原生解锁"
    ],
    disadvantages: [
      "入门套餐限制 4 台设备并发",
      "不支持早期的 Shadowsocks 旧协议客户端"
    ],
    suitableFor: ["高性价比追求者", "学生党与日常冲浪", "YouTube 4K重度追剧"],
    sources: ["jiediantuijian.shop 实测数据", "编辑部晚高峰机房探针"],
    lastVerified: "2026-11-19",
    testStatus: "tested",
    overallScore: 9.8,
    speedScore: 9.7,
    stabilityScore: 9.8,
    valueScore: 9.8
  },
  {
    id: "muguang",
    rank: 2,
    name: "暮光网络",
    slug: "muguang",
    description: "部署了覆盖亚太及欧美的专线节点，采用先进的VLESS协议体系，为多设备家庭与大流量下载用户提供高稳定、低抖动的网络体验。",
    officialUrl: "https://varnexa.twilightaff.com/#/?code=8EtJCnBT",
    affiliateUrl: "https://varnexa.twilightaff.com/#/?code=8EtJCnBT",
    startingPrice: 20.0,
    currency: "CNY",
    plans: [
      { name: "专线基础月付", price: 20.0, period: "月付", trafficGb: 120, unitPricePerGb: 0.167, note: "500Mbps带宽，4台设备，专线节点保障" },
      { name: "海量进阶月付", price: 38.0, period: "月付", trafficGb: 300, unitPricePerGb: 0.127, note: "800Mbps带宽，6台设备，大流量支持" }
    ],
    protocols: ["VLESS", "Shadowsocks"],
    regions: ["香港", "日本", "新加坡", "台湾", "美国", "英国"],
    deviceLimit: "4~6台设备同时在线",
    aiSupport: ["ChatGPT", "Claude", "Copilot"],
    streamingSupport: ["Netflix 4K", "Disney+", "YouTube 4K"],
    coupon: "",
    advantages: [
      "专线节点网络架构，晚高峰网络抖动低至 1.3ms",
      "120GB起步流量充裕，满足日常办公与视听需求",
      "三网智能BGP入口，抗封锁能力表现优秀"
    ],
    disadvantages: [
      "起步资费相对微风略高",
      "暂无不限时按量计费套餐"
    ],
    suitableFor: ["白领涉外办公", "家庭多设备协同", "日常稳定冲浪"],
    sources: ["jiediantuijian.shop 实测数据", "官方服务条款公示"],
    lastVerified: "2026-11-19",
    testStatus: "tested",
    overallScore: 9.7,
    speedScore: 9.6,
    stabilityScore: 9.7,
    valueScore: 9.4
  },
  {
    id: "feimaoyun",
    rank: 3,
    name: "飞猫云",
    slug: "feimaoyun",
    description: "采用IEPL/IPLC专线与优质中转混合调度链路，年付折算约¥7/月起即可获得150GB流量。针对新手提供完善的一键导入客户端与专属折扣码。",
    officialUrl: "https://flycat1.flycatvipaff.cc/#/?code=MlwqPqcx",
    affiliateUrl: "https://flycat1.flycatvipaff.cc/#/?code=MlwqPqcx",
    startingPrice: 7.0,
    currency: "CNY",
    plans: [
      { name: "特惠年付折算", price: 7.0, period: "月付(年付折算)", trafficGb: 150, unitPricePerGb: 0.047, note: "400Mbps带宽，4台设备，优惠码 flycat888" },
      { name: "畅享月付版", price: 16.0, period: "月付", trafficGb: 350, unitPricePerGb: 0.046, note: "800Mbps带宽，6台设备，双线冗余智能调度" }
    ],
    protocols: ["Shadowsocks", "V2Ray"],
    regions: ["香港", "日本", "新加坡", "美国", "台湾", "德国"],
    deviceLimit: "4~6台设备同时在线",
    aiSupport: ["ChatGPT", "Claude 3.5", "Midjourney"],
    streamingSupport: ["Netflix", "Disney+", "YouTube Premium"],
    coupon: "flycat888",
    advantages: [
      "年付折算单月仅 ¥7 起，性价比极其突出",
      "专线与中转双线冗余，遇故障秒级自愈",
      "提供专属折扣券 flycat888 立减优惠"
    ],
    disadvantages: [
      "最低单价需年付方能享受",
      "部分小众冷门节点晚高峰延迟偶有波动"
    ],
    suitableFor: ["长周期省心用户", "追剧看4K视频", "外贸跨境沟通"],
    sources: ["jiediantuijian.shop 实测数据", "用户后台实测"],
    lastVerified: "2026-11-19",
    testStatus: "tested",
    overallScore: 9.6,
    speedScore: 9.5,
    stabilityScore: 9.5,
    valueScore: 9.8
  },
  {
    id: "wuyou",
    rank: 4,
    name: "无忧",
    slug: "wuyou",
    description: "主打真实物理IPLC内网专线，国内入口直连机房，不过GFW公网防火墙，为对外贸稳定性要求严苛的用户提供省心无忧的网络通道。",
    officialUrl: "https://wep01.worryfreeaff.com/#/?code=oGi9FQ0J",
    affiliateUrl: "https://wep01.worryfreeaff.com/#/?code=oGi9FQ0J",
    startingPrice: 19.0,
    currency: "CNY",
    plans: [
      { name: "无忧基础版", price: 19.0, period: "月付", trafficGb: 100, unitPricePerGb: 0.190, note: "400Mbps带宽，4台设备，优惠码 wuyou666" },
      { name: "无忧进阶版", price: 36.0, period: "月付", trafficGb: 260, unitPricePerGb: 0.138, note: "800Mbps带宽，6台设备，多协议支持" }
    ],
    protocols: ["Shadowsocks", "V2Ray"],
    regions: ["香港", "日本", "新加坡", "美国", "台湾"],
    deviceLimit: "4~6台设备",
    aiSupport: ["ChatGPT", "Claude", "Gemini"],
    streamingSupport: ["Netflix", "Disney+", "YouTube 4K"],
    coupon: "wuyou666",
    advantages: [
      "纯真实 IPLC 专线，抗封锁稳定性极高",
      "香港节点延迟低至 14ms，体感接近国内内网",
      "支持优惠券 wuyou666"
    ],
    disadvantages: [
      "基础版流量为 100GB，大文件下载用户建议选进阶版",
      "节点地区以亚太骨干机房为主"
    ],
    suitableFor: ["外贸商务通信", "跨境电商管理", "远程办公协作"],
    sources: ["jiediantuijian.shop 实测数据"],
    lastVerified: "2026-11-19",
    testStatus: "tested",
    overallScore: 9.5,
    speedScore: 9.4,
    stabilityScore: 9.6,
    valueScore: 9.3
  },
  {
    id: "lingmao",
    rank: 5,
    name: "灵猫",
    slug: "lingmao",
    description: "全节点配备原生IP的IPLC专线机场，专为解决大模型与流媒体跨区风控封锁而设计，全平台解锁率名列前茅。",
    officialUrl: "https://vip02.civetaff.com/#/?code=SXY8qyrG",
    affiliateUrl: "https://vip02.civetaff.com/#/?code=SXY8qyrG",
    startingPrice: 25.0,
    currency: "CNY",
    plans: [
      { name: "IPLC专线版", price: 25.0, period: "月付", trafficGb: 150, unitPricePerGb: 0.167, note: "500Mbps带宽，4台设备，全IPLC专线" },
      { name: "旗舰大流量版", price: 48.0, period: "月付", trafficGb: 350, unitPricePerGb: 0.137, note: "1000Mbps带宽，6台设备，原生IP全解锁" }
    ],
    protocols: ["Shadowsocks"],
    regions: ["香港", "日本", "新加坡", "美国", "台湾", "英国"],
    deviceLimit: "4~6台设备",
    aiSupport: ["ChatGPT Plus", "Claude Pro (原生解锁)", "Midjourney"],
    streamingSupport: ["Netflix全区", "Disney+", "BBC iPlayer", "Hulu"],
    coupon: "",
    advantages: [
      "全节点原生IP覆盖，AI与流媒体解锁成功率近 100%",
      "千兆高速专线带宽，超高清4K秒开不缓冲",
      "Shadowsocks 轻量加密协议，设备电量消耗极小"
    ],
    disadvantages: [
      "起步价格 ¥25/月，略高于中继型机场",
      "不支持旧款协议"
    ],
    suitableFor: ["AI研究与提示词调优", "海外影视狂热粉", "高画质流媒体观看"],
    sources: ["jiediantuijian.shop 实测数据"],
    lastVerified: "2026-11-19",
    testStatus: "tested",
    overallScore: 9.4,
    speedScore: 9.4,
    stabilityScore: 9.5,
    valueScore: 9.2
  },
  {
    id: "flashleap",
    rank: 6,
    name: "闪跃 FlashLeap",
    slug: "flashleap",
    description: "以电竞级低延迟与全IEPL专线为卖点，晚高峰丢包率仅0.0%~0.1%，支持千兆超大吞吐，深受联机玩家与商务精英青睐。",
    officialUrl: "https://vip02.flashleapaff.com/#/?code=8ZIV6HQ3",
    affiliateUrl: "https://vip02.flashleapaff.com/#/?code=8ZIV6HQ3",
    startingPrice: 24.0,
    currency: "CNY",
    plans: [
      { name: "纯专线入门版", price: 24.0, period: "月付", trafficGb: 150, unitPricePerGb: 0.160, note: "500Mbps带宽，4台设备，优惠码 shanyue" },
      { name: "纯专线进阶版", price: 46.0, period: "月付", trafficGb: 360, unitPricePerGb: 0.127, note: "1000Mbps带宽，6台设备，低延迟游戏支持" }
    ],
    protocols: ["Shadowsocks", "Trojan"],
    regions: ["香港", "日本", "新加坡", "台湾", "美国", "韩国"],
    deviceLimit: "4~6台设备",
    aiSupport: ["ChatGPT", "Claude", "Perplexity"],
    streamingSupport: ["Netflix", "Disney+", "YouTube 4K 60fps"],
    coupon: "shanyue",
    advantages: [
      "晚高峰实测丢包率控制在 0.1% 以内，接近零断流",
      "香港节点延迟低至 13ms，日本节点 35ms",
      "提供优惠券 shanyue 折扣支持"
    ],
    disadvantages: [
      "无按量计费套餐",
      "小众冷门国别节点较少"
    ],
    suitableFor: ["外服游戏联机低延迟", "外贸商务办公", "4K HDR原盘级视听"],
    sources: ["jiediantuijian.shop 实测数据"],
    lastVerified: "2026-11-19",
    testStatus: "tested",
    overallScore: 9.3,
    speedScore: 9.5,
    stabilityScore: 9.5,
    valueScore: 9.2
  },
  {
    id: "firefly",
    rank: 7,
    name: "萤火虫（Firefly）",
    slug: "firefly",
    description: "小而美的精品中继与轻量专线梯子，资费门槛亲民，年付折算仅约¥8/月，支持VLESS新协议，运行轻便稳定。",
    officialUrl: "https://vip02.fireflyaff.com/#/?code=uTKLkAyC",
    affiliateUrl: "https://vip02.fireflyaff.com/#/?code=uTKLkAyC",
    startingPrice: 8.0,
    currency: "CNY",
    plans: [
      { name: "特惠年付折算", price: 8.0, period: "月付(年付折算)", trafficGb: 60, unitPricePerGb: 0.133, note: "300Mbps带宽，3台设备，优惠码 firefly" },
      { name: "标准月付版", price: 16.0, period: "月付", trafficGb: 160, unitPricePerGb: 0.100, note: "600Mbps带宽，5台设备，VLESS协议支持" }
    ],
    protocols: ["VLESS", "Trojan"],
    regions: ["香港", "日本", "新加坡", "美国", "台湾"],
    deviceLimit: "3~5台设备",
    aiSupport: ["ChatGPT", "Claude"],
    streamingSupport: ["YouTube 4K", "Netflix"],
    coupon: "firefly",
    advantages: [
      "入门价格门槛低，年付折合单月仅 ¥8",
      "全面适配 VLESS 新协议，移动端连接迅速",
      "专属优惠码 firefly 可直接抵扣"
    ],
    disadvantages: [
      "特惠套餐 60GB 适合轻度冲浪，重度下载需升级标准版",
      "并发设备数相对较少"
    ],
    suitableFor: ["轻度外网查资料", "学生党备用梯子", "手机端轻度冲浪"],
    sources: ["jiediantuijian.shop 实测数据"],
    lastVerified: "2026-11-19",
    testStatus: "tested",
    overallScore: 9.2,
    speedScore: 9.1,
    stabilityScore: 9.2,
    valueScore: 9.4
  },
  {
    id: "kuajiecloud",
    rank: 8,
    name: "跨界",
    slug: "kuajiecloud",
    description: "采用全专线网络架构，主干机房由国内多线BGP直连海外机房，标配120GB起步流量，Shadowsocks原生协议抗审查强。",
    officialUrl: "https://vip02.kuajieaff.com/#/?code=CpJKZicY",
    affiliateUrl: "https://vip02.kuajieaff.com/#/?code=CpJKZicY",
    startingPrice: 20.0,
    currency: "CNY",
    plans: [
      { name: "全专线基础版", price: 20.0, period: "月付", trafficGb: 120, unitPricePerGb: 0.167, note: "500Mbps带宽，4台设备，优惠码 jichangcha09" },
      { name: "全专线旗舰版", price: 42.0, period: "月付", trafficGb: 320, unitPricePerGb: 0.131, note: "1000Mbps带宽，6台设备，全专线架构" }
    ],
    protocols: ["Shadowsocks"],
    regions: ["香港", "日本", "新加坡", "台湾", "美国", "德国"],
    deviceLimit: "4~6台设备",
    aiSupport: ["ChatGPT", "Claude", "Midjourney"],
    streamingSupport: ["Netflix 4K", "Disney+", "YouTube 4K"],
    coupon: "jichangcha09",
    advantages: [
      "全专线网络架构，延迟稳定性极佳",
      "120GB 起步月流量，套餐容量设计合理",
      "优惠码 jichangcha09 专属让利"
    ],
    disadvantages: [
      "节点命名规范较为传统",
      "暂不支持自研客户端"
    ],
    suitableFor: ["追求全专线品质的用户", "跨境电商选品与管理", "多端轻度办公"],
    sources: ["jiediantuijian.shop 实测数据"],
    lastVerified: "2026-11-19",
    testStatus: "tested",
    overallScore: 9.1,
    speedScore: 9.2,
    stabilityScore: 9.3,
    valueScore: 9.1
  },
  {
    id: "yinxingren",
    rank: 9,
    name: "隐形人",
    slug: "yinxingren",
    description: "企业级IEPL纯专线网络架构代表，晚高峰零丢包，标配144GB月付起步大流量，千兆网络吞吐，综合实测表现卓越。",
    officialUrl: "https://varnexa.invisibleaff.com/#/?code=5BkMj6bD",
    affiliateUrl: "https://varnexa.invisibleaff.com/#/?code=5BkMj6bD",
    startingPrice: 24.0,
    currency: "CNY",
    plans: [
      { name: "纯专线入门版", price: 24.0, period: "月付", trafficGb: 144, unitPricePerGb: 0.167, note: "500Mbps带宽，5台设备，优惠码 yxr888" },
      { name: "纯专线主力版", price: 48.0, period: "月付", trafficGb: 350, unitPricePerGb: 0.137, note: "1000Mbps带宽，8台设备，千兆晚高峰零卡顿" }
    ],
    protocols: ["VLESS", "Shadowsocks"],
    regions: ["香港", "日本", "新加坡", "台湾", "美国", "英国", "德国"],
    deviceLimit: "5~8台设备同时在线",
    aiSupport: ["ChatGPT Plus", "Claude Pro", "Midjourney", "Perplexity"],
    streamingSupport: ["Netflix全区", "Disney+", "YouTube 4K 60fps", "Hulu"],
    coupon: "yxr888",
    advantages: [
      "企业级 IEPL 纯专线，晚高峰实测丢包率控制在 0.0%~0.1%",
      "起步即享 144GB 充沛流量，最高支持 8 台设备同时在线",
      "企业级纯专线架构，全网流媒体与AI工具解锁天花板"
    ],
    disadvantages: [
      "价格定位中高端，无超低价体验包",
      "高峰期工单咨询需排队"
    ],
    suitableFor: ["涉外企业与跨境团队", "重度AI大模型工程师", "追求极致稳定体验者"],
    sources: ["jiediantuijian.shop 实测数据", "晚高峰8点~11点带宽吞吐连续抽检"],
    lastVerified: "2026-11-19",
    testStatus: "tested",
    overallScore: 9.0,
    speedScore: 9.5,
    stabilityScore: 9.6,
    valueScore: 8.9
  },
  {
    id: "feiv",
    rank: 10,
    name: "飞V",
    slug: "feiv",
    description: "以突破性极低门槛和罕见的不限时按量计费套餐为特色，月付仅需¥4.9起，更有¥29永久200GB套餐，是极低预算与备用梯子的首选。",
    officialUrl: "https://varnexa.flyvaff.com/#/?code=Ks7qO8qe",
    affiliateUrl: "https://varnexa.flyvaff.com/#/?code=Ks7qO8qe",
    startingPrice: 4.9,
    currency: "CNY",
    plans: [
      { name: "轻量入门版", price: 4.9, period: "月付", trafficGb: 100, unitPricePerGb: 0.049, note: "300Mbps带宽，3台设备，突破性低门槛" },
      { name: "不限时海量版", price: 29.0, period: "一次性购买", trafficGb: 200, unitPricePerGb: 0.145, note: "500Mbps带宽，5台设备，流量永久有效不清零" }
    ],
    protocols: ["Trojan", "V2Ray"],
    regions: ["香港", "日本", "新加坡", "美国", "台湾"],
    deviceLimit: "3~5台设备",
    aiSupport: ["ChatGPT", "Claude (部分节点)"],
    streamingSupport: ["YouTube 4K", "Netflix 主流区"],
    coupon: "",
    advantages: [
      "月付仅需 ¥4.9，全网起步价地板级门槛",
      "支持不限时套餐，一次购买流量永久有效不清零",
      "适合作为主力专线断联时的强力防灾备用方案"
    ],
    disadvantages: [
      "极端晚高峰公网节点可能存在轻微测速波动",
      "小众冷门国别节点较少"
    ],
    suitableFor: ["极度低预算人群", "备用防断联梯子", "轻度偶尔外网查资料"],
    sources: ["jiediantuijian.shop 实测数据"],
    lastVerified: "2026-11-19",
    testStatus: "tested",
    overallScore: 8.9,
    speedScore: 8.8,
    stabilityScore: 8.9,
    valueScore: 9.8
  },
  {
    id: "laddercloud",
    rank: 11,
    name: "梯子云 LadderCloud",
    slug: "laddercloud",
    description: "老牌高速中转与专线混合服务商，提供完善的跨平台客户端一键导入支持，节点线路拓扑清晰，网络冗余丰富。",
    officialUrl: "https://varnexa.ladderaff.com/#/?code=eC6eLAbq",
    affiliateUrl: "https://varnexa.ladderaff.com/#/?code=eC6eLAbq",
    startingPrice: 25.0,
    currency: "CNY",
    plans: [
      { name: "中转基础版", price: 25.0, period: "月付", trafficGb: 125, unitPricePerGb: 0.200, note: "500Mbps带宽，4台设备，高速中转" },
      { name: "海量专线版", price: 48.0, period: "月付", trafficGb: 350, unitPricePerGb: 0.137, note: "1000Mbps带宽，6台设备，最高可达500GB" }
    ],
    protocols: ["Shadowsocks", "Trojan"],
    regions: ["香港", "日本", "新加坡", "台湾", "美国", "英国"],
    deviceLimit: "4~6台设备",
    aiSupport: ["ChatGPT", "Claude", "Copilot"],
    streamingSupport: ["Netflix 4K", "Disney+", "YouTube 4K"],
    coupon: "",
    advantages: [
      "老牌团队持续运营，线路稳定性有长期保障",
      "香港节点延迟稳定在 15ms，日本节点 35ms",
      "大流量套餐性价比高，适合多设备家庭"
    ],
    disadvantages: [
      "起步价格为 ¥25/月",
      "暂无按量计费包"
    ],
    suitableFor: ["长期稳定自用", "办公网络分流", "日常刷4K视频"],
    sources: ["jiediantuijian.shop 实测数据"],
    lastVerified: "2026-11-19",
    testStatus: "tested",
    overallScore: 8.8,
    speedScore: 9.0,
    stabilityScore: 9.1,
    valueScore: 8.8
  },
  {
    id: "wavenet",
    rank: 12,
    name: "浪网 WaveNet",
    slug: "wavenet",
    description: "专为解决高并发与复杂网络阻断设计的抗拥塞专线机场，全面采用VLESS先进协议与自研优化链路，保障晚高峰极速畅联。",
    officialUrl: "https://varnexa.wavenetaff.com/#/?code=8fwQQBdy",
    affiliateUrl: "https://varnexa.wavenetaff.com/#/?code=8fwQQBdy",
    startingPrice: 30.0,
    currency: "CNY",
    plans: [
      { name: "自研优化版", price: 30.0, period: "月付", trafficGb: 150, unitPricePerGb: 0.200, note: "600Mbps带宽，5台设备，自研优化线路" },
      { name: "自研旗舰版", price: 58.0, period: "月付", trafficGb: 360, unitPricePerGb: 0.161, note: "1000Mbps带宽，8台设备，高流量专线方案" }
    ],
    protocols: ["VLESS"],
    regions: ["香港", "日本", "新加坡", "台湾", "美国", "德国", "英国"],
    deviceLimit: "5~8台设备同时在线",
    aiSupport: ["ChatGPT", "Claude 3.5 Sonnet", "Midjourney"],
    streamingSupport: ["Netflix 全区", "Disney+", "YouTube 4K"],
    coupon: "",
    advantages: [
      "150GB~360GB 大流量配置，彻底摆脱流量焦虑",
      "晚高峰实测丢包率仅 0.0%~0.2%，香港延迟仅 13ms",
      "VLESS 先进加密架构，抗干扰能力出众"
    ],
    disadvantages: [
      "起步价格 ¥30/月，略高于普通入门梯子",
      "不提供免费试用"
    ],
    suitableFor: ["大流量下载与外贸视听", "涉外学术团队", "重度AI生产力开发"],
    sources: ["jiediantuijian.shop 实测数据"],
    lastVerified: "2026-11-19",
    testStatus: "tested",
    overallScore: 8.7,
    speedScore: 9.3,
    stabilityScore: 9.2,
    valueScore: 8.6
  },
  {
    id: "lingdongcloud",
    rank: 13,
    name: "灵动云",
    slug: "lingdongcloud",
    description: "配置清晰透明的均衡型机场，采用成熟的Trojan安全加密协议，专注提供稳定防封锁的网络通道，适合追求省心免折腾的用户。",
    officialUrl: "https://varnexa.lingdongaff.com/#/?code=kd4yTgUr",
    affiliateUrl: "https://varnexa.lingdongaff.com/#/?code=kd4yTgUr",
    startingPrice: 20.0,
    currency: "CNY",
    plans: [
      { name: "均衡基础版", price: 20.0, period: "月付", trafficGb: 100, unitPricePerGb: 0.200, note: "400Mbps带宽，4台设备，均衡配置" },
      { name: "畅享月付版", price: 36.0, period: "月付", trafficGb: 260, unitPricePerGb: 0.138, note: "800Mbps带宽，6台设备，Trojan安全协议" }
    ],
    protocols: ["Trojan"],
    regions: ["香港", "日本", "新加坡", "台湾", "美国"],
    deviceLimit: "4~6台设备",
    aiSupport: ["ChatGPT", "Claude", "Gemini"],
    streamingSupport: ["YouTube 4K", "Netflix", "Disney+"],
    coupon: "",
    advantages: [
      "100GB 均衡起步流量，实用不浪费",
      "Trojan 协议成熟度极高，防封锁特征弱",
      "资费配置清晰透明，无隐形消费"
    ],
    disadvantages: [
      "小众冷门国别节点较少",
      "无按量计费不限时套餐"
    ],
    suitableFor: ["日常网页浏览", "轻办公与视频观看", "不喜折腾的新手用户"],
    sources: ["jiediantuijian.shop 实测数据"],
    lastVerified: "2026-11-19",
    testStatus: "tested",
    overallScore: 8.6,
    speedScore: 8.9,
    stabilityScore: 9.0,
    valueScore: 8.7
  },
  {
    id: "quanqiuyun",
    rank: 14,
    name: "全球云",
    slug: "quanqiuyun",
    description: "深度优化多线中转架构的高可用机场，全面支持VLESS与Trojan双协议，覆盖120GB主流月度流量，提供优惠券折扣。",
    officialUrl: "https://sswdh.gcvipaff.com/#/?code=9SF0oyg0",
    affiliateUrl: "https://sswdh.gcvipaff.com/#/?code=9SF0oyg0",
    startingPrice: 20.0,
    currency: "CNY",
    plans: [
      { name: "中转经典版", price: 20.0, period: "月付", trafficGb: 120, unitPricePerGb: 0.167, note: "500Mbps带宽，4台设备，优惠码 tt88" },
      { name: "中转海量版", price: 38.0, period: "月付", trafficGb: 300, unitPricePerGb: 0.127, note: "800Mbps带宽，6台设备，VLESS/Trojan双协议" }
    ],
    protocols: ["VLESS", "Trojan"],
    regions: ["香港", "日本", "新加坡", "台湾", "美国", "欧洲"],
    deviceLimit: "4~6台设备",
    aiSupport: ["ChatGPT", "Claude", "Copilot"],
    streamingSupport: ["Netflix", "Disney+", "YouTube 4K"],
    coupon: "tt88",
    advantages: [
      "深度优化中转链路，节点全天高可用",
      "120GB 经典起步配额，价格适中",
      "支持专属优惠码 tt88 享受立减"
    ],
    disadvantages: [
      "暂无按量计费套餐",
      "部分冷门节点连接延迟略高"
    ],
    suitableFor: ["日常核心主力", "外贸办公与出海沟通", "4K影视追剧"],
    sources: ["jiediantuijian.shop 实测数据"],
    lastVerified: "2026-11-19",
    testStatus: "tested",
    overallScore: 8.5,
    speedScore: 8.8,
    stabilityScore: 8.9,
    valueScore: 8.7
  }
];

module.exports = { airports };
