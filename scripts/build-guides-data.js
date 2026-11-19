/**
 * 生成 30 篇完整技术教程数据 (scripts/build-guides-data.js)
 */

const fs = require('fs');
const path = require('path');

const guides = [
  {
    slug: "windows",
    platform: "Windows",
    platformBadge: "💻 Windows",
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
      <p>登录你所购买的<strong>机场推荐</strong>后台（如微风网络、暮光网络、飞猫云等），进入“仪表盘”或“用户中心”：</p>
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

      <h2>常见排错：网页打不开怎么办？</h2>
      <p>如果开启代理后依然无法打开外网，请检查：</p>
      <ul>
        <li>本地电脑系统时间是否准确（时间偏差超过60秒会导致TLS握手失败）；</li>
        <li>浏览器是否安装了冲突的代理插件（如SwitchyOmega，需设为“使用系统代理”）；</li>
        <li>尝试开启 Clash Verge Rev 的 <strong>TUN 模式</strong> 彻底接管系统底层网络。</li>
      </ul>
    `
  },
  {
    slug: "android",
    platform: "Android",
    platformBadge: "📱 Android",
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

      <h2>三、启动代理与分流设置</h2>
      <p>返回主界面，点击中间大按钮启动代理。点击“代理”选项卡，可按“延迟测试”挑选响应最快的节点。建议代理模式保持为 <strong>规则 (Rule)</strong> 模式，国内应用直连，海外应用走节点。</p>
    `
  },
  {
    slug: "ios",
    platform: "iOS",
    platformBadge: "🍏 iOS",
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
        <li>在 App Store 登录美区 Apple ID（切勿在设置-iCloud中登录）；</li>
        <li>在 App Store 搜索 <strong>Shadowrocket</strong> 并购买下载（正版售价为 $2.99）；</li>
        <li>下载完成后可退回常用国区账号，软件依然正常使用。</li>
      </ol>

      <h2>第二步：一键添加机场订阅</h2>
      <ol>
        <li>用 Safari 浏览器登录机场官网，点击“一键导入 Shadowrocket”；</li>
        <li>系统弹出提示“是否打开 Shadowrocket”，点击“打开”；</li>
        <li>小火箭会自动更新全部节点并分组保存。</li>
      </ol>

      <h2>第三步：开启连接与分流</h2>
      <p>选中一个延迟较低的节点，开启顶部“未连接”开关。首次连接会弹出添加 VPN 配置确认框，使用 Face ID 或锁屏密码允许即可。</p>
    `
  },
  {
    slug: "macos",
    platform: "macOS",
    platformBadge: "🍎 macOS",
    title: "macOS苹果电脑Clash Verge Rev与Surge配置教程 - Mac翻墙指南",
    h1: "macOS系统Clash Verge Rev与Surge极简配置指南",
    keywords: "Mac翻墙教程, macOS Clash, Clash Verge Rev Mac, Surge配置, 苹果电脑梯子",
    desc: "专为 Mac 用户撰写的配置指南：原生适配 M1/M2/M3/M4 芯片与 Intel 架构的 Clash Verge Rev 安装、终端代理环境变量配置及增强模式开启。",
    content: `
      <div class="callout">
        <div class="callout-title">🍎 Mac 用户的优雅选择</div>
        <p>在 macOS 上，<strong>Clash Verge Rev</strong> 提供了绝佳的视觉体验与对 Apple Silicon (M1/M2/M3/M4) 芯片的原生低功耗支持。</p>
      </div>

      <h2>一、下载与权限安装</h2>
      <p>Apple Silicon (M系列) 用户下载 <code>aarch64.dmg</code> 安装包；Intel 机型下载 <code>x64.dmg</code>。拖动至 Applications 文件夹即可。</p>

      <h2>二、导入配置与开启增强模式</h2>
      <ol>
        <li>在“配置”中粘贴订阅链接并下载激活；</li>
        <li>在“设置”中勾选“系统代理”；</li>
        <li>建议开启 <strong>TUN 模式</strong>，Mac 即可接管所有终端及 Docker 流量。</li>
      </ol>

      <h2>三、终端 Terminal 命令行代理配置</h2>
      <p>在 <code>~/.zshrc</code> 中加入以下命令，即可随时让终端加速：</p>
      <pre><code>alias proxy="export http_proxy=http://127.0.0.1:7897 https_proxy=http://127.0.0.1:7897"
alias unproxy="unset http_proxy https_proxy"</code></pre>
    `
  },
  {
    slug: "windows-clash-verge-rev",
    platform: "Windows",
    platformBadge: "💻 Windows",
    title: "Windows Clash Verge Rev 深度配置教程 - TUN模式与汉化设置指南",
    h1: "Windows Clash Verge Rev 深度配置教程（TUN模式与增强设置）",
    keywords: "Clash Verge Rev教程, Windows TUN模式, Clash汉化, 规则分流, 节点订阅",
    desc: "详解 Clash Verge Rev 在 Windows 10/11 下的高级配置：内核切换（Mihomo/Alpha）、TUN 虚拟网卡安装、开机自启、服务模式与 DNS 防泄漏终极方案。",
    content: `
      <h2>一、为什么 Clash Verge Rev 是目前 Windows 最佳选择？</h2>
      <p>原版 Clash for Windows 停更后，社区开源的 <strong>Clash Verge Rev</strong> 凭借现代 Tauri 框架、低内存占用以及对 <strong>Mihomo (Clash.Meta) 内核</strong> 的深度支持，成为 Windows 用户绝对的主力推荐客户端。</p>

      <h2>二、核心高级功能配置指南</h2>
      <h3>1. 开启 Service Mode（服务模式）与 TUN 模式</h3>
      <p>默认的“系统代理”仅对常规浏览器生效，很多外服客户端、UWP应用与游戏无法走代理。开启 TUN 模式可实现全局虚拟网卡接管：</p>
      <ol>
        <li>进入 <strong>Settings（设置）</strong> &rarr; 找到 <strong>Service Mode（服务模式）</strong> 点击右侧 Install 安装；</li>
        <li>安装成功后，勾选 <strong>TUN Mode（TUN 模式）</strong>；</li>
        <li>此时 Windows 会新增一个虚拟网卡适配器，所有未配置代理的应用程序都会被强制接管分流。</li>
      </ol>

      <h3>2. 订阅自动更新设置</h3>
      <p>在“配置 (Profiles)”界面，右键点击导入的订阅文件，选择 <strong>Edit Info（编辑信息）</strong>，将 <strong>Auto Update Interval（自动更新周期）</strong> 设置为 <code>1440</code> 分钟（即24小时），保证节点列表每天自动同步机场最新变更。</p>

      <h3>3. 语言切换为中文</h3>
      <p>点击左侧 Settings &rarr; 找到 Language 下拉菜单选择 <strong>简体中文</strong>，界面即可全汉化显示。</p>
    `
  },
  {
    slug: "windows-v2rayn-setup",
    platform: "Windows",
    platformBadge: "💻 Windows",
    title: "v2rayN 电脑端全协议上手教程 - VLESS与Trojan节点订阅配置",
    h1: "v2rayN 电脑端全协议上手配置教程（VLESS/Trojan/SS订阅）",
    keywords: "v2rayN教程, v2rayN配置, VLESS节点, Trojan订阅, Windows翻墙客户端",
    desc: "经典老牌 Windows 代理利器 v2rayN 完整图文教程：Xray 核心升级、订阅添加与更新、路由分流规则设定、PAC模式与开机自启实用技巧。",
    content: `
      <h2>一、v2rayN 的核心优势</h2>
      <p>v2rayN 是 Windows 平台上资历最老、兼容性最全的开源代理工具。它不仅原生支持 Xray 核心的全部最新特性（包括 VLESS-XTLS、Reality、Trojan），还能精准控制每个协议的参数，适合喜欢极高可控性的用户。</p>

      <h2>二、安装与核心组件检查</h2>
      <ol>
        <li>下载 <code>v2rayN-with-Core.zip</code> 官方整合包；</li>
        <li>解压至非系统盘（避免 Windows 权限拦截，推荐 <code>D:\\Software\\v2rayN</code>）；</li>
        <li>运行 <code>v2rayN.exe</code>，如果提示缺少 .NET 运行时，根据弹窗提示前往微软官网下载安装 .NET 6 或 .NET 8 Desktop Runtime。</li>
      </ol>

      <h2>三、导入机场订阅</h2>
      <ol>
        <li>点击顶部菜单栏的 <strong>订阅分组 &rarr; 订阅分组设置</strong>；</li>
        <li>在左下角点击 <strong>添加</strong>；</li>
        <li>备注输入机场名称（如微风网络），在“可选地址 (url)”栏粘贴从机场复制的 V2Ray/Xray 订阅链接；</li>
        <li>点击确定保存，回到主界面点击 <strong>订阅分组 &rarr; 通过代理更新订阅（或不通过代理更新）</strong>。</li>
      </ol>

      <h2>四、开启系统代理与分流模式</h2>
      <p>在窗口底部找到 <strong>系统代理</strong> 下拉框，选择 <strong>自动配置系统代理</strong>；右侧 <strong>路由</strong> 下拉框务必选择 <strong>绕过大陆 (Whitelist)</strong>。任务栏图标变为红色或蓝色即代表代理已正常生效。</p>
    `
  },
  {
    slug: "windows-mihomo-party",
    platform: "Windows",
    platformBadge: "💻 Windows",
    title: "Mihomo Party 现代化客户端完整配置指南 - 优雅UI与智能测速",
    h1: "Mihomo Party 现代化客户端完整上手配置指南",
    keywords: "Mihomo Party, Mihomo教程, Clash替代, Windows梯子客户端, 节点测速",
    desc: "新一代颜值与性能兼备的 Clash 衍生客户端 Mihomo Party 教程：暗黑美学UI、一键订阅导入、节点拓扑可视化、快捷键切换与智能分流实战。",
    content: `
      <h2>一、Mihomo Party 为什么迅速走红？</h2>
      <p>Mihomo Party 专为追求极致视觉交互与操作体验的极客设计。相比传统客户端，它的动效丝滑、支持暗黑模式、提供清晰的节点测速折线图，并深度集成最新版本的 Mihomo 内核。</p>

      <h2>二、极速三步上手</h2>
      <ol>
        <li><strong>下载与安装</strong>：前往 GitHub Release 下载 <code>mihomo-party-windows-x64-setup.exe</code> 完成安装；</li>
        <li><strong>添加订阅</strong>：点击左侧“订阅”菜单，点击右上角加号，填入机场订阅链接并命名；</li>
        <li><strong>开启接管</strong>：在主控制面板点击右上角“系统代理”开关，并在节点列表选择心仪的低延迟专线节点。</li>
      </ol>

      <h2>三、特色功能推荐</h2>
      <ul>
        <li><strong>节点分组过滤</strong>：自动将香港、日本、美国、新加坡节点分门别类展示，支持一键批量测速；</li>
        <li><strong>规则集热更新</strong>：内置优质分流规则，国内流量完全不消耗机场流量。</li>
      </ul>
    `
  },
  {
    slug: "windows-sing-box",
    platform: "Windows",
    platformBadge: "💻 Windows",
    title: "Sing-box Windows 官方客户端配置教程 - 规则集导入与轻量运行",
    h1: "Sing-box Windows 官方客户端极速上手配置教程",
    keywords: "Sing-box教程, Sing-box Windows, 规则集, 轻量客户端, 梯子配置",
    desc: "全网最轻量的通用代理平台 Sing-box Windows 客户端上手指南：图形界面安装、独立配置源导入、内存占用低至20MB的极致运行体验。",
    content: `
      <h2>一、新一代代理平台标准：Sing-box</h2>
      <p>Sing-box 作为新一代全能代理框架，以其极致的代码精简、低内存占用和高并发吞吐著称。对于硬件资源有限或追求极简的用户，Sing-box 是理想选择。</p>

      <h2>二、配置与使用方法</h2>
      <ol>
        <li>从官方仓库下载 Sing-box 桌面版客户端；</li>
        <li>在“Profiles”页面点击“New Profile”，选择“Remote”；</li>
        <li>粘贴机场提供的 Sing-box 专用订阅链接（各大主流机场后台均已支持一键复制 Sing-box 订阅）；</li>
        <li>保存后点击启用的开关，在弹出的系统服务请求中授权。</li>
      </ol>
      <p>实测在 Windows 11 后台运行时，Sing-box 仅占用不到 25MB 内存，对电脑日常办公与游戏完全零负担。</p>
    `
  },
  {
    slug: "windows-nekoray",
    platform: "Windows",
    platformBadge: "💻 Windows",
    title: "NekoRay Windows 客户端安装与多核心路由分流实战指南",
    h1: "NekoRay Windows 客户端安装与多协议路由实战教程",
    keywords: "NekoRay教程, NekoBox PC, Xray客户端, Sing-box内核, 梯子测速",
    desc: "基于 Qt 深度开发的跨平台通用代理工具 NekoRay 教程：双内核自由切换（Xray / Sing-box）、全协议覆盖、订阅分组管理与 TUN 增强模式配置。",
    content: `
      <h2>一、NekoRay 的硬核特色</h2>
      <p>NekoRay 是由 MatsuriDayo 团队开发的开源 GUI 客户端。它的最大特色是支持双内核无缝切换：你可以按需选择 Xray 核心或是 Sing-box 核心，全面通吃 Shadowsocks、VMess、VLESS、Trojan、Hysteria 2、TUIC 等全部协议。</p>

      <h2>二、操作步骤</h2>
      <ol>
        <li>解压运行 <code>nekoray.exe</code>，在弹出选择内核时推荐选择 <strong>sing-box</strong> 或 <strong>Xray</strong>；</li>
        <li>点击顶部菜单“分组 &rarr; 新建分组”，在“分组类型”中选择“订阅”并粘贴链接；</li>
        <li>点击菜单“程序 &rarr; 系统代理”或勾选顶部“TUN 模式”；</li>
        <li>选中想使用的节点，右键点击“设为活动服务器”即可启动科学上网。</li>
      </ol>
    `
  },
  {
    slug: "windows-clash-nyanpasu",
    platform: "Windows",
    platformBadge: "💻 Windows",
    title: "Clash Nyanpasu 萌系现代客户端使用指南与节点管理",
    h1: "Clash Nyanpasu 现代客户端配置指南与节点管理",
    keywords: "Clash Nyanpasu, 萌系客户端, Clash Verge替代, Windows翻墙, 节点订阅",
    desc: "由社区活跃维护的 Clash Nyanpasu 图文教程：颜值爆表的界面风格、多语言支持、基于 Rust+Tauri 的极致响应速度及一键分流配置。",
    content: `
      <h2>一、Clash Nyanpasu 介绍</h2>
      <p>Clash Nyanpasu 是目前活跃度极高的 Clash GUI 之一，采用清新淡雅的设计语言，针对中文用户体验进行了全面重构，并且完全开源可信。</p>

      <h2>二、导入与使用教程</h2>
      <ol>
        <li>安装并启动后，点击左侧 Profile 图标；</li>
        <li>在 URL 输入框中粘贴机场订阅链接，点击“Add”；</li>
        <li>返回“Proxies”界面，挑选目标国家节点；</li>
        <li>点击左上角状态开关，打开“System Proxy”，网络即刻连接通畅。</li>
      </ol>
    `
  },
  {
    slug: "windows-tun-mode-gaming",
    platform: "Windows",
    platformBadge: "💻 Windows",
    title: "Windows 开启 TUN 虚拟网卡实战 - 外服游戏加速与防掉线设置",
    h1: "Windows 开启 TUN 虚拟网卡实战（外服游戏加速与防掉线）",
    keywords: "TUN模式, 游戏加速, Steam联机, 虚拟网卡, 梯子延迟优化",
    desc: "告别游戏加速器！通过 Clash Verge Rev 开启 TUN 模式接管 Steam/Epic/暴雪战网与外服游戏全部 UDP 流量，实现超低延迟联机与防掉线终极指南。",
    content: `
      <h2>一、为什么常规代理无法加速游戏？</h2>
      <p>常规系统代理（HTTP/Socks5）仅对基于 TCP 的应用生效。绝大多数现代网络联机游戏（如 CS2、Apex Legends、Valorant、战地）的核心通信均依赖 <strong>UDP 协议</strong>。如果不开启虚拟网卡接管，游戏数据包根本不会走代理，导致依然顶着公网高延迟或直接断联。</p>

      <h2>二、TUN 虚拟网卡实战配置三步法</h2>
      <h3>第一步：配置客户端服务环境</h3>
      <p>以 Clash Verge Rev 为例，必须右键以管理员身份运行客户端，并在 Settings 中安装 Service Mode，确保客户端拥有创建并修改 Windows 网络适配器的最高权限。</p>

      <h3>第二步：选择游戏专线节点</h3>
      <p>外服游戏对<strong>物理延迟与抖动</strong>极度敏感。务必挑选纯 IPLC/IEPL 专线节点（如闪跃 FlashLeap、隐形人、微风网络）。深港或沪日专线物理时延稳定在 13~35ms 之间，丢包率趋近于 0.0%。</p>

      <h3>第三步：验证 UDP 连通性</h3>
      <p>在游戏中观察左上角网络指标（Ping 与 Loss），丢包率保持为 0% 且 NAT 类型显示为 Open 或 Moderate 即代表游戏加速成功。</p>
    `
  },
  {
    slug: "windows-troubleshooting",
    platform: "Windows",
    platformBadge: "💻 Windows",
    title: "Windows 科学上网常见报错大全与一键修复指南 - 连不上与端口冲突",
    h1: "Windows 科学上网常见报错大全与排错自救手册",
    keywords: "翻墙连不上, 502错误, 端口冲突, 系统代理失效, Windows网络修复",
    desc: "遇到节点红叹号、网页打不开、系统代理被篡改怎么办？系统梳理 Windows 电脑科学上网 8 大高频报错原因与对应的秒级一键自救修复方案。",
    content: `
      <h2>一、高频报错 1：节点全部显示超时（Timeout）或红叹号</h2>
      <p><strong>根因排查</strong>：90% 的原因并非节点挂了，而是本地时间不准或订阅链接已过期。</p>
      <p><strong>解决方案</strong>：进入 Windows 设置 &rarr; 时间和语言 &rarr; 点击“立即同步”；若依然超时，返回机场后台刷新并重新导入订阅链接。</p>

      <h2>二、高频报错 2：关闭客户端后电脑无法上网（无网络访问）</h2>
      <p><strong>根因排查</strong>：非正常退出软件（如直接关机或任务管理器强杀）导致系统注册表中的代理开关未自动复位。</p>
      <p><strong>解决方案</strong>：按 <code>Win + i</code> 打开设置 &rarr; 网络和 Internet &rarr; 代理 &rarr; 将“使用代理服务器”开关手动<strong>关闭</strong>即可立即恢复上网。</p>

      <h2>三、高频报错 3：提示“Port 7890 already in use（端口被占用）”</h2>
      <p><strong>解决方案</strong>：有其他旧版 Clash 或后台残留进程占用了 7890 端口。在客户端设置中将 Mixed Port（混合端口）修改为 <code>7897</code> 或 <code>17890</code> 即可顺利启动。</p>
    `
  },
  {
    slug: "android-clash-meta",
    platform: "Android",
    platformBadge: "📱 Android",
    title: "Android Clash Meta (CMFA) 订阅与规则分流高级配置指南",
    h1: "Android Clash Meta for Android (CMFA) 深度配置与分流实战",
    keywords: "Clash Meta Android, CMFA教程, 安卓规则分流, VLESS安卓, 梯子配置",
    desc: "安卓平台最强客户端 Clash Meta for Android 深度教程：分应用代理白名单设置、私有 DNS 设定、自动测速优选及后台常驻省电优化。",
    content: `
      <h2>一、为什么选择 Clash Meta for Android？</h2>
      <p>CMFA 继承了 Meta 内核的全部强大特性，不仅完美支持 VLESS Reality 与 Trojan 协议，还允许用户自由定义分流规则，是目前安卓系统功能最完备的科学上网利器。</p>

      <h2>二、核心高级功能实操</h2>
      <h3>1. 分应用代理设置（解决微信异地登录烦恼）</h3>
      <p>进入“设置” &rarr; “网络” &rarr; 勾选 <strong>分应用代理 (Access Control)</strong>。在模式中选择“仅允许勾选应用通过”或“仅绕过勾选应用”，把国内银行、微信、钉钉勾选排除，国内流量直接走本机网络，彻底杜绝封号风控风险。</p>

      <h3>2. 开启自动后台保活</h3>
      <p>在手机系统“设置”中找到应用管理 &rarr; Clash Meta，将电池策略调整为“无限制”，并在系统最近任务列表中将客户端“上锁”，避免系统在息屏时误杀后台导致梯子断联。</p>
    `
  },
  {
    slug: "android-v2rayng",
    platform: "Android",
    platformBadge: "📱 Android",
    title: "v2rayNG 安卓手机客户端极速上手 - 节点订阅与分流应用设置",
    h1: "v2rayNG 安卓手机客户端极速上手使用指南",
    keywords: "v2rayNG教程, v2rayNG安卓, 节点导入, Xray安卓, 手机梯子",
    desc: "简单好用的经典安卓客户端 v2rayNG 使用手册：订阅链接添加、真连接延迟测试、分流规则设置、批量测速与开机自动运行全攻略。",
    content: `
      <h2>一、v2rayNG 的轻快体验</h2>
      <p>对于不习惯复杂规则策略的用户，v2rayNG 提供了最直观的单节点列表交互，体积轻巧（仅约 20MB），兼容性极高。</p>

      <h2>二、两分钟极速配置</h2>
      <ol>
        <li>从 GitHub 下载安装 <code>v2rayNG_xxx.apk</code>；</li>
        <li>点击左上角三横杠图标 &rarr; <strong>订阅分组设置</strong> &rarr; 点击右上角加号；</li>
        <li>输入备注并粘贴机场订阅地址，保存后返回主页；</li>
        <li>点击右上角三点图标 &rarr; <strong>更新订阅</strong>；</li>
        <li>选中想用的节点，点击右下角浮动 V 图标即可连接。</li>
      </ol>
      <p>点击主界面右上角菜单可执行“测试全部配置真实连接 (TCP Ping)”，快速找出当前可用节点。</p>
    `
  },
  {
    slug: "android-singbox",
    platform: "Android",
    platformBadge: "📱 Android",
    title: "Sing-box Android 版极速上手教程 - 轻量低功耗科学上网指南",
    h1: "Sing-box Android 版极速上手教程（低内存与超强省电）",
    keywords: "Sing-box安卓, Sing-box Android教程, 省电梯子, 低内存客户端, 节点订阅",
    desc: "体验安卓平台资源消耗最低的代理利器 Sing-box：安装包导入、远端规则集同步、后台纯净无感运行及耗电控制技巧详解。",
    content: `
      <h2>一、Sing-box 的极致能效</h2>
      <p>传统客户端在安卓手机后台常驻时，常常会消耗 100~200MB 运行内存并带来额外电量消耗。Sing-box 基于现代化 Go 语言优化，后台内存占用常年维持在 30MB 左右，发热几乎不可感知。</p>

      <h2>二、配置步骤</h2>
      <ol>
        <li>安装官方 APK；</li>
        <li>切换到“Profiles”标签页，点击右上角加号添加远端配置 URL；</li>
        <li>填入机场提供的 Sing-box 订阅链接；</li>
        <li>切换回“Dashboard”点击开启开关，首次使用允许 VPN 权限。</li>
      </ol>
    `
  },
  {
    slug: "android-nekobox",
    platform: "Android",
    platformBadge: "📱 Android",
    title: "NekoBox for Android 安装与配置指南 - 支持Hysteria2与VLESS",
    h1: "NekoBox for Android 安装配置指南（Hysteria2与VLESS支持）",
    keywords: "NekoBox安卓, Hysteria 2安卓, VLESS客户端, 协议兼容, 梯子教程",
    desc: "全协议制霸的安卓工具 NekoBox 图文教程：支持新一代 Hysteria 2 与 TUIC 协议、一键测速排序、应用分流与自定义链式代理实操。",
    content: `
      <h2>一、NekoBox 的独特地位</h2>
      <p>如果你所购买的机场提供了基于 UDP 的高速 Hysteria 2 或 TUIC 协议节点，NekoBox 是安卓端首屈一指的原生支持客户端。</p>

      <h2>二、导入与使用步骤</h2>
      <ol>
        <li>从 GitHub 下载 <code>NekoBox-xxx-arm64-v8a.apk</code> 安装；</li>
        <li>点击右上角菜单 &rarr; <strong>分组设置</strong> &rarr; 新建分组并填入订阅链接；</li>
        <li>点击底部测速按钮，一键测试所有节点真连接延迟；</li>
        <li>点击选中延迟最优的节点，点击右下角启动按钮建立 VPN 连接。</li>
      </ol>
    `
  },
  {
    slug: "android-surfboard",
    platform: "Android",
    platformBadge: "📱 Android",
    title: "Surfboard 冲浪板安卓配置教程 - 完美兼容Surge规则与网络监控",
    h1: "Surfboard 冲浪板安卓配置教程（兼容Surge规则与面板监控）",
    keywords: "Surfboard教程, 冲浪板安卓, Surge兼容, 安卓翻墙, 节点分流",
    desc: "被称为“安卓版 Surge”的 Surfboard 配置指南：精美 Material You 设计语言、Surge 配置文件一键导入、流量图表监控与分流规则管理。",
    content: `
      <h2>一、Surfboard 的美学与功能</h2>
      <p>Surfboard 在安卓生态中独树一帜，完全遵循 Google 现代设计规范，并且完美解析 iOS/Mac 上著名的 Surge 配置文件格式。</p>

      <h2>二、极简上手流程</h2>
      <ol>
        <li>在 Google Play 商店或官网下载 Surfboard；</li>
        <li>切换到“配置文件 (Profile)”标签页，点击加号选择“从链接下载”；</li>
        <li>粘贴机场订阅并下载，自动转换为专业分流策略组；</li>
        <li>进入“Switch”页面点亮启动开关，随时查看实时带宽曲线。</li>
      </ol>
    `
  },
  {
    slug: "android-battery-saving",
    platform: "Android",
    platformBadge: "📱 Android",
    title: "安卓科学上网客户端省电优化与后台保活白名单设置指南",
    h1: "安卓科学上网客户端省电优化与后台保活终极指南",
    keywords: "安卓省电, 梯子保活, 杀后台, 电池优化, 息屏断网修复",
    desc: "解决安卓手机息屏断连、客户端被系统误杀与耗电过快痛点：小米MIUI/澎湃OS、华为HarmonyOS、OPPO ColorOS、vivo OriginOS 专属保活白名单配置方案。",
    content: `
      <h2>一、为什么安卓手机容易息屏断连？</h2>
      <p>各家国产安卓厂商对电池管理策略极其严格，默认会在息屏 5~15 分钟后杀掉一切高网络吞吐的后台进程，导致梯子突然断流，Telegram 与邮件无法收到即时推送。</p>

      <h2>二、各大品牌保活与降功耗设置指南</h2>
      <h3>1. 小米澎湃 OS / MIUI 设置</h3>
      <p>进入“设置 &rarr; 应用设置 &rarr; 应用管理”找到你的客户端（如 Clash Meta），将“省电策略”修改为 <strong>无限制</strong>，同时在“权限管理”中开启“自启动”。</p>

      <h3>2. 华为 HarmonyOS / EMUI 设置</h3>
      <p>进入“设置 &rarr; 电池 &rarr; 应用启动管理”，将客户端由“自动管理”改为 <strong>手动管理</strong>，并确保“允许自启动”、“允许关联启动”、“允许后台活动”全部勾选。</p>

      <h3>3. 协议层面的省电技巧</h3>
      <p>优先选择 <strong>Shadowsocks 或 VLESS</strong> 等轻量级加密协议，减少手机 CPU 持续解密带来的能耗开销；非特殊弱网环境下尽量关闭客户端高频心跳测速。</p>
    `
  },
  {
    slug: "ios-shadowrocket-setup",
    platform: "iOS",
    platformBadge: "🍏 iOS",
    title: "iOS Shadowrocket 小火箭深度设置教程 - 策略组配置与证书安装",
    h1: "iOS Shadowrocket 小火箭深度设置教程（策略组与证书实战）",
    keywords: "Shadowrocket深度设置, 小火箭证书, 策略组配置, iOS分流规则, 苹果科学上网",
    desc: "不仅是一键连接！深度挖掘小火箭高级功能：HTTPS 解密证书安装、场景路由自动切换（蜂窝与Wi-Fi不同策略）、节点自动优选与去广告规则实战。",
    content: `
      <h2>一、小火箭的高级潜能</h2>
      <p>作为 iOS 上保有量最高的神器，Shadowrocket 远不止简单的翻墙工具。合理配置其策略组与规则，可以让海外访问、国内加速与广告拦截协同工作。</p>

      <h2>二、核心进阶设置</h2>
      <h3>1. 配置“按场景分流”</h3>
      <p>在小火箭“配置”界面中，点击右上角设置，可开启场景模式：当连接到办公室 Wi-Fi 时自动走轻量专线，当切换到 5G 蜂窝网络时自动切换为省流量节点。</p>

      <h3>2. 节点自动测试与故障转移</h3>
      <p>在“服务器”分组中可新建一个“自动优选 (Auto-Select)”策略组，小火箭会在后台每隔10分钟测速一次，并在主力节点异常时毫秒级无感切换至备用节点。</p>
    `
  },
  {
    slug: "ios-quantumult-x",
    platform: "iOS",
    platformBadge: "🍏 iOS",
    title: "Quantumult X (圈X) 进阶配置指南 - 分流规则集与重写脚本",
    h1: "Quantumult X (圈X) 进阶配置指南（规则分流与重写实战）",
    keywords: "Quantumult X教程, 圈X配置, 策略组, 重写脚本, iOS高级翻墙",
    desc: "iOS 极客首选网络调试利器 Quantumult X 完整教程：远程资源解析器、分流规则集引用、Task 定时任务脚本与流媒体专属分流配置指南。",
    content: `
      <h2>一、Quantumult X 的独特魅力</h2>
      <p>圈X以其极致的代码执行效率、优雅的交互设计与强大的 JavaScript 脚本生态著称。如果你不仅需要科学上网，还希望定制个性化去广告与自动化签到，圈X是最佳平台。</p>

      <h2>二、导入与基础分流构建</h2>
      <ol>
        <li>在 App Store 登录美区账号购买下载 Quantumult X；</li>
        <li>点击右下角风车图标进入设置，在“节点”区域选择“引用 (订阅)”，填入机场订阅地址；</li>
        <li>在“分流”区域添加主流分流规则集（如海外媒体走 Proxy，国内流量走 DIRECT，AI 服务走专门的 US 节点）；</li>
        <li>返回主界面长按大圆环开启连接。</li>
      </ol>
    `
  },
  {
    slug: "ios-loon-setup",
    platform: "iOS",
    platformBadge: "🍏 iOS",
    title: "Loon 苹果手机客户端配置实战 - 插件中心与节点优选指南",
    h1: "Loon 苹果手机客户端配置实战（插件化与节点优选）",
    keywords: "Loon教程, Loon配置, iOS客户端, 插件中心, 苹果梯子",
    desc: "新一代轻量优雅的 iOS 代理利器 Loon 教程：独创插件中心（Plugin）一键安装、全协议完美支持、节点延迟自动化监控与极简配置流程。",
    content: `
      <h2>一、Loon 为什么受年轻用户喜爱？</h2>
      <p>Loon 把复杂的分流规则与脚本抽象成了类似浏览器插件的 <strong>Plugin 商店</strong>。用户无需手动编辑复杂的配置文件，点击开关即可完成流媒体分流、去广告与规则拓展。</p>

      <h2>二、快速配置教程</h2>
      <ol>
        <li>在美区 App Store 搜索购买 Loon；</li>
        <li>打开应用进入“配置 &rarr; 订阅”，点击右上角加号填入机场链接；</li>
        <li>进入“插件”页面，根据需要开启“流媒体分流”或“ChatGPT 专属优化”插件；</li>
        <li>点击主页开关启动代理，界面清新无任何臃肿元素。</li>
      </ol>
    `
  },
  {
    slug: "ios-surge-ios",
    platform: "iOS",
    platformBadge: "🍏 iOS",
    title: "Surge iOS 旗舰网络工具新手入门 - 配置文件与网关抓包分析",
    h1: "Surge iOS 旗舰网络工具新手入门与配置实战",
    keywords: "Surge iOS, Surge教程, 苹果旗舰客户端, 抓包调试, 高级分流",
    desc: "苹果生态顶流网络开发与代理工具 Surge iOS 完整指南：配置文件模块化管理、策略组级联嵌套、Ponit-to-Point 虚拟网络与企业级抓包排错。",
    content: `
      <h2>一、Surge 的王者定位</h2>
      <p>Surge 是 iOS 与 Mac 平台上公认的天花板级网络工具。除了提供极致稳定的代理体验外，它拥有行业顶级的网络诊断、实时抓包与 DNS 控制面板。</p>

      <h2>二、新手导入指引</h2>
      <ol>
        <li>在海外 App Store 获取 Surge（支持免费试用）；</li>
        <li>进入“配置”选择“从 URL 下载配置”，输入机场提供的专属 Surge 配置地址；</li>
        <li>进入“控制面板”，选择“按规则分流 (Rule)”；</li>
        <li>点击“启动”按钮，在顶部网络监控面板中可实时查看每一笔 HTTP/HTTPS 请求的命中策略。</li>
      </ol>
    `
  },
  {
    slug: "ios-sing-box",
    platform: "iOS",
    platformBadge: "🍏 iOS",
    title: "Sing-box iOS 客户端安装与规则订阅导入指南",
    h1: "Sing-box iOS 官方客户端安装与订阅配置指南",
    keywords: "Sing-box iOS, 苹果Sing-box, TestFlight, 免费iOS翻墙, 规则导入",
    desc: "完全开源免费的 Sing-box iOS 版配置手册：官方 TestFlight 与 App Store 下载通道、远端 JSON 订阅载入、轻量内存表现与日常连接维护。",
    content: `
      <h2>一、iOS 上的免费开源新选择</h2>
      <p>在 iOS 生态中，优质客户端普遍为付费买断制（$2.99~$49.99 不等）。Sing-box iOS 版的推出，为预算有限的用户提供了一款完全开源且无广告的官方解决方案。</p>

      <h2>二、使用教程</h2>
      <ol>
        <li>在美区 App Store 搜索并免费下载 <strong>sing-box</strong>；</li>
        <li>点击底部“Profiles”，点击“New Profile”；</li>
        <li>Type 选择“Remote”，在 URL 中粘贴机场提供的 Sing-box 订阅链接；</li>
        <li>保存后返回“Dashboard”点击开启连接。</li>
      </ol>
    `
  },
  {
    slug: "ios-us-apple-id",
    platform: "iOS",
    platformBadge: "🍏 iOS",
    title: "2026零成本注册美区 Apple ID 购买小火箭新手全流程图文教程",
    h1: "2026零成本注册美区 Apple ID 购买小火箭新手图文教程",
    keywords: "美区Apple ID注册, 购买小火箭, App Store换区, 苹果美区账号, 免信用卡教程",
    desc: "不花冤枉钱！2026最新无需海外信用卡、无需海外手机号的纯新手美区 Apple ID 自建教程，并详解如何通过苹果官方礼品卡为小火箭充值购买。",
    content: `
      <h2>一、为什么必须自己注册美区 Apple ID？</h2>
      <p>网上售卖的共享账号存在极高的封禁风险，一旦在 iCloud 中误登共享账号，可能会导致 iPhone 被远程锁死敲诈。<strong>花10分钟自己注册一个纯净的个人专属美区账号，是一劳永逸的最安全解法。</strong></p>

      <h2>二、免信用卡注册六步法</h2>
      <ol>
        <li>使用电脑浏览器打开苹果官网 Apple ID 注册页面（<code>appleid.apple.com</code>）；</li>
        <li>国家或地区选择<strong>美国 (United States)</strong>，出生日期务必填大于18岁；</li>
        <li>输入一个未注册过 Apple 的全新邮箱（推荐 Gmail 或 Outlook），手机号可填国内真实 +86 手机号用于接收短信验证；</li>
        <li>注册完成后，在 iPhone 的 <strong>App Store</strong> 中退出当前账号，登录刚才注册的美区账号；</li>
        <li>初次登录会提示“检查 (Review)”，付款方式切记选择 <strong>None（无）</strong>，账单地址可通过免税州生成器填入俄勒冈州 (Oregon) 真实地址与邮编；</li>
        <li>通过审核后，账号即成功激活！</li>
      </ol>

      <h2>三、购买小火箭：如何安全充值？</h2>
      <p>前往苹果官网或亚马逊官方旗舰店购买面额 $3 或 $5 的 <strong>Apple Gift Card（电子礼品卡）</strong>，卡密会直接发送至邮箱。在美区 App Store 点击个人头像 &rarr; “Redeem Gift Card”输入充值码，即可余额直购 Shadowrocket，终身属于自己！</p>
    `
  },
  {
    slug: "macos-clash-verge-rev",
    platform: "macOS",
    platformBadge: "🍎 macOS",
    title: "macOS 苹果电脑 Clash Verge Rev 配置指南 - M系列芯片原生适配",
    h1: "macOS 苹果电脑 Clash Verge Rev 配置指南（M系列芯片原生支持）",
    keywords: "Mac Clash Verge Rev, M1 M2 M3 M4芯片, macOS翻墙, 苹果电脑梯子, TUN模式Mac",
    desc: "苹果电脑必备！原生适配 Apple Silicon M1/M2/M3/M4 系列芯片的 Clash Verge Rev 完整指南：权限配置、增强模式、系统代理与极速分流体验。",
    content: `
      <h2>一、Mac 用户的绝配客户端</h2>
      <p>原版 ClashX 停更后，Clash Verge Rev Mac 版以其现代化的暗黑设计风格、对 macOS 权限机制的规范适配，以及针对 Apple Silicon 架构的极致优化，成为 Mac 电脑首选工具。</p>

      <h2>二、Mac 专用配置细节</h2>
      <h3>1. 解决“无法打开，因为无法验证开发者”提示</h3>
      <p>如果是初次打开 DMG 安装包，macOS Gatekeeper 可能会拦截。进入 Mac“系统设置 &rarr; 隐私与安全性”，滑到底部点击“仍要打开”并输入锁屏密码即可授权运行。</p>

      <h3>2. 开启菜单栏沉浸式监控</h3>
      <p>在设置中勾选“启动后最小化到菜单栏”，状态栏会常驻显示当前实时上行/下行网速与活动节点，优雅不占桌面空间。</p>
    `
  },
  {
    slug: "macos-surge-mac",
    platform: "macOS",
    platformBadge: "🍎 macOS",
    title: "Surge for Mac 高级科学上网与接管全局流量实战指南",
    h1: "Surge for Mac 高级科学上网与全局网关流量实战",
    keywords: "Surge for Mac, Mac高级科学上网, 网关代理, 网络调试, 策略组级联",
    desc: "面向高阶 Mac 用户的终极生产力神器 Surge for Mac 教程：增强模式 (Enhanced Mode) 原理、接管局域网设备旁路由代理、Dashboard 数据流深度剖析。",
    content: `
      <h2>一、Surge Mac 为什么是生产力工具之王？</h2>
      <p>在开发、音视频剪辑与跨境协同场景下，Surge for Mac 能够提供毫无死角的全流量接管能力，甚至可以让你的 Mac 化身为整个办公室的透明网关代理服务器。</p>

      <h2>二、核心配置要点</h2>
      <ul>
        <li><strong>开启 Enhanced Mode（增强模式）</strong>：Surge 会接管 Mac 系统全部未配置代理协议的虚拟网卡请求，包括所有后台守护进程与 Terminal 命令；</li>
        <li><strong>DNS 优化解析</strong>：内置高并发并发解析引擎，彻底解决海外网站解析缓慢与 CDN 调度失准的问题。</li>
      </ul>
    `
  },
  {
    slug: "macos-mihomo-party",
    platform: "macOS",
    platformBadge: "🍎 macOS",
    title: "Mihomo Party Mac 版上手指南 - 暗黑模式与菜单栏快捷控制",
    h1: "Mihomo Party Mac 版上手指南（颜值巅峰与内核调度）",
    keywords: "Mihomo Party Mac, Mac颜值翻墙软件, 现代化客户端, 节点管理, 苹果电脑",
    desc: "在 macOS 上体验最养眼的代理工具 Mihomo Party：安装配置、菜单栏微小化常驻、快捷节点切换、深色模式与内核参数微调实操教程。",
    content: `
      <h2>一、视觉党与强迫症的最佳选择</h2>
      <p>Mihomo Party 在 Mac 端充分融入了 macOS 原生磨砂玻璃（Vibrancy）质感，不管是深色外观还是浅色外观，都能完美与系统桌面融为一体。</p>

      <h2>二、安装与体验建议</h2>
      <ol>
        <li>从官方 GitHub 页面下载对应芯片的 DMG 文件（M 系列芯片下载 <code>aarch64</code>，Intel 机型下载 <code>x64</code>）；</li>
        <li>在订阅页添加并激活机场订阅；</li>
        <li>在主界面开启“系统代理”；</li>
        <li>随时通过 <code>Cmd + Option + P</code> 快捷键唤醒小窗口切换节点。</li>
      </ol>
    `
  },
  {
    slug: "macos-system-proxy-terminal",
    platform: "macOS",
    platformBadge: "🍎 macOS",
    title: "Mac 终端 Terminal 与 Git 命令行科学上网代理配置技巧",
    h1: "Mac 终端 Terminal 与 Git 命令行科学上网极速配置指南",
    keywords: "Mac终端代理, Git代理加速, Terminal翻墙, npm加速, Homebrew加速",
    desc: "解决终端下 curl/git clone/npm install 奇慢无比痛点：教你一分钟在 Mac zsh 配置文件中写入智能代理开关，让命令行与代码仓库拉取秒达百兆。",
    content: `
      <h2>一、为什么开了梯子，终端执行命令依然龟速？</h2>
      <p>客户端开启的“系统代理”仅对图形界面应用程序（如 Chrome、Safari）生效，而 Mac 系统的 <strong>Terminal、iTerm2、Git、Homebrew、Docker</strong> 默认完全忽略系统代理，依然直连海外服务器，导致 <code>git clone</code> 频繁断连或速度只有几 KB/s。</p>

      <h2>二、优雅的一键开关配置方案</h2>
      <p>打开终端，执行命令编辑 zsh 配置文件：</p>
      <pre><code>nano ~/.zshrc</code></pre>
      <p>在文件最末尾粘贴以下快捷别名（假设客户端本地混合端口为 <code>7897</code>）：</p>
      <pre><code># 快捷终端代理命令
alias setproxy="export all_proxy=socks5://127.0.0.1:7897; export http_proxy=http://127.0.0.1:7897; export https_proxy=http://127.0.0.1:7897; echo '🚀 终端代理已开启'"
alias unsetproxy="unset all_proxy http_proxy https_proxy; echo '🛑 终端代理已关闭'"
alias checkproxy="curl cip.cc"</code></pre>
      <p>保存退出后执行 <code>source ~/.zshrc</code>。以后在任何终端窗口只要输入 <code>setproxy</code>，命令行立刻秒速翻墙；输入 <code>unsetproxy</code> 即可随时复原！</p>
    `
  },
  {
    slug: "router-openwrt-passwall",
    platform: "软路由与网关",
    platformBadge: "🌐 软路由与网关",
    title: "OpenWrt 软路由 PassWall 插件配置教程 - 全屋设备科学上网与双线分流",
    h1: "OpenWrt 软路由 PassWall 插件配置教程（全屋无感翻墙实战）",
    keywords: "PassWall教程, OpenWrt翻墙, 软路由科学上网, 全屋翻墙, 旁路由设置",
    desc: "打造全屋智能透明网关！OpenWrt 软路由 PassWall 插件深度配置手册：节点订阅导入、主备节点自动切换、TCP/UDP分流、国内外DNS分流防污染实操。",
    content: `
      <h2>一、软路由全屋科学上网的核心优势</h2>
      <p>不再需要在每台手机、电脑、iPad 上安装繁琐的客户端！在家庭局域网的主路由或旁路由部署 OpenWrt PassWall 后，连入家庭 Wi-Fi 的所有设备（包括电视、PS5、Switch 主机）无需任何设置即可直接无感科学上网。</p>

      <h2>二、核心配置关键四步</h2>
      <h3>1. 添加订阅与自动定时更新</h3>
      <p>进入 PassWall &rarr; “节点订阅”，粘贴机场订阅链接，并勾选“自动更新”，设定在每天凌晨 4:00 自动拉取节点最新配置。</p>

      <h3>2. 核心分流策略设置</h3>
      <ul>
        <li><strong>TCP 节点</strong>：挑选一条高速专线（如微风网络或隐形人专线）；</li>
        <li><strong>UDP 节点</strong>：勾选“与 TCP 节点相同”，确保海外联机游戏与语音通话顺畅；</li>
        <li><strong>路由过滤模式</strong>：务必选择 <strong>中国列表以外 (China-List-Out)</strong>，国内流量直连机房，海外流量走代理，兼顾速度与隐私。</li>
      </ul>

      <h3>3. DNS 防污染配置</h3>
      <p>中国国内 DNS 使用 <code>119.29.29.29</code> 或 <code>223.5.5.5</code>，海外 DNS 使用 <code>1.1.1.1</code> 或 <code>8.8.8.8</code>，彻底告别 DNS 劫持。</p>
    `
  },
  {
    slug: "tv-apple-tv-proxy",
    platform: "电视与特殊终端",
    platformBadge: "📺 电视与特殊终端",
    title: "Apple TV 科学上网最全方案 - tvOS 小火箭与局域网旁路分流 4K HDR 追剧",
    h1: "Apple TV 科学上网最全方案（tvOS小火箭与4K HDR追剧）",
    keywords: "Apple TV翻墙, tvOS小火箭, Apple TV Netflix, 电视看YouTube 4K, 电视梯子",
    desc: "客厅大屏追剧天花板！Apple TV 安装 tvOS 版 Shadowrocket 与 Surge 教程，以及无软路由环境下利用电脑局域网共享代理实现 4K HDR 杜比视界秒开指南。",
    content: `
      <h2>一、客厅 4K HDR 观影终极体验</h2>
      <p>Apple TV 拥有目前电视盒子里最强劲的芯片性能与色彩管理。自 tvOS 17 起，苹果官方原生开放了 VPN 框架支持，使得电视直接安装翻墙工具成为现实。</p>

      <h2>二、实现方案一：直接安装 tvOS 版 Shadowrocket</h2>
      <ol>
        <li>在 Apple TV 的 App Store 登录已购小火箭的美区 Apple ID；</li>
        <li>在“已购项目 (Purchased)”中找到 <strong>Shadowrocket</strong> 并直接下载安装；</li>
        <li>打开 tvOS 小火箭，电视屏幕会展示一个二维码；</li>
        <li>用同一 Wi-Fi 下的 iPhone 扫码，即可一键把手机里的全部机场节点配置同步进电视；</li>
        <li>在电视上点击“连接”，打开 Netflix 或 YouTube 即可享受 4K HDR 秒开体验！</li>
      </ol>

      <h2>三、实现方案二：电脑局域网共享代理给电视</h2>
      <p>如果没有软路由，在电脑端 Clash Verge Rev 设置中开启 <strong>Allow LAN（允许局域网连接）</strong>。在 Apple TV 网络设置中，将“配置代理”设为手动，服务器填写电脑的局域网 IP（如 <code>192.168.1.100</code>），端口填写 <code>7897</code> 即可轻松连接。</p>
    `
  }
];

// 写入 src/data/allGuides.js
const outputPath = path.join(__dirname, '..', 'src', 'data', 'allGuides.js');
const fileContent = `/**
 * 全量 30 篇技术教程数据库 (src/data/allGuides.js)
 * 覆盖 Windows/Android/iOS/macOS/软路由/电视盒子
 */

const allGuides = ${JSON.stringify(guides, null, 2)};

module.exports = { allGuides };
`;

fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`✅ 成功生成 30 篇技术教程数据至: src/data/allGuides.js (共 ${guides.length} 篇)`);
