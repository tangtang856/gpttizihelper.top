# GPT梯子助手 (gpttizihelper.top)

> 2026中文机场评测与科学上网推荐门户 · Bing SEO 专项高权重技术建站系统

[![SEO Audit](https://img.shields.io/badge/SEO%20Audit-100%25%20PASS-brightgreen.svg)](#)
[![Bing Technical SEO](https://img.shields.io/badge/Bing%20SEO-Optimized-blue.svg)](#)
[![Architecture](https://img.shields.io/badge/Stack-Pure%20HTML%20%2B%20Native%20CSS-orange.svg)](#)
[![Deployment](https://img.shields.io/badge/Deploy-Cloudflare%20Pages-yellow.svg)](#)

---

## 🎯 项目主攻与参数

- **Bing 主攻关键词**: 机场推荐、机场节点、性价比机场、梯子推荐、vpn、vpn机场、vpn节点、vpn推荐
- **正式域名**: [https://gpttizihelper.top](https://gpttizihelper.top)
- **部署方式**: Cloudflare Pages（零编译，静态直出秒开）
- **离线兼容**: 100% 遵循标准相对路径规范，支持本地直接双击（`file://` 协议）离线浏览

---

## 📂 页面体系架构

- `/index.html` - 首页（包含 Header、Hero、快速答案、精选推荐、综合天梯榜、六大专题入口、横向对比、最新评测、教程中心、术语百科、深度文章、FAQ、Footer 共 13 大区域）
- `/recommend/` - 六大核心场景推荐专题（低预算平价、高端IPLC专线、新手小白、稳定防断联、AI专属原生IP、4K流媒体解锁）
- `/ranking/` - 四大权威榜单（综合天梯榜、高性价比榜、低预算榜、晚高峰稳定性榜）
- `/airport/` - 机场品牌档案资料页（泡芙云、魔戒、TAG Internet、飞鸟云、微基闪电）
- `/review/` - 独立实测报告（晚高峰丢包率、资费每GB折算、解锁实测）
- `/compare/` - 机场参数横向对比工具（纯原生 JS 动态比对 2~4 家机场）
- `/guides/` - 跨平台客户端新手配置教程（Windows, Android, iOS, macOS）
- `/blog/` - 深度选购指南与技术科普（防跑路、线路对比、协议选型、大模型报错排错）
- `/glossary/` - 网络专业术语百科（IPLC、BGP中转、Clash分流规则、Hysteria2、节点倍率）
- 信任合规页 - `/about.html`, `/contact.html`, `/editorial-policy.html`, `/privacy-policy.html`, `/disclaimer.html`, `/404.html`

---

## 🛠️ 自动化运维指令

```bash
# 1. 重新生成全站页面
npm run build

# 2. 执行自动化质检（SEO/死链/内容审计）
npm run test

# 3. 向 Bing / IndexNow 批量推送全站 URL
npm run indexnow
```
