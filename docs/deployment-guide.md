# GPT梯子助手 (gpttizihelper.top) 部署与运维指南

本文档指导站长如何将本项目部署至 **GitHub** 与 **Cloudflare Pages**，以及如何完成 **Bing Webmaster Tools** 验证与 **IndexNow** 搜索引擎主动推送。

---

## 一、技术架构特点

- **纯静态 HTML + 原生 CSS**：零重型框架，页面毫秒级秒开；
- **全站 100% 相对路径**：所有 CSS、JS、图片及站内超链接均采用标准相对路径（例如 `css/style.css`、`../recommend/budget.html`），不仅在线访问完美无瑕，而且在本地直接双击（`file://` 协议）即可离线预览并畅快浏览全部页面；
- **SEO 深度强化**：专为 Bing 搜索引擎优化，已配置好 Canonical、OpenGraph、Twitter Card、Schema.org 结构化数据、Sitemap、Robots 与 IndexNow API。

---

## 二、Cloudflare Pages 零配置部署流程

由于本项目为纯原生静态架构，Cloudflare Pages 无需执行任何昂贵且缓慢的打包构建过程：

1. **登录 Cloudflare 控制台**：进入 [Cloudflare Dashboard](https://dash.cloudflare.com/)；
2. **进入 Pages 管理**：点击左侧导航栏的 **Workers 和 Pages** &rarr; 点击 **创建应用程序** &rarr; 选择 **Pages** &rarr; **连接到 Git**；
3. **选择 GitHub 仓库**：授权并选择 `tangtang856/gpttizihelper.top`；
4. **配置构建设置**：
   - **项目名称**: `gpttizihelper`
   - **生产分支**: `main`
   - **框架预设 (Framework preset)**: `None`
   - **构建命令 (Build command)**: 留空 (无需构建命令)
   - **构建输出目录 (Build output directory)**: `.` (即根目录)
5. **点击“保存并部署”**：Cloudflare 将在 10 秒内完成全站全球边缘节点部署；
6. **绑定自定义域名**：
   - 部署完成后，在 Pages 项目后台点击 **自定义域 (Custom Domains)**；
   - 输入正式域名：`gpttizihelper.top`；
   - 根据提示完成 DNS 托管或 CNAME 解析解析配置，Cloudflare 将自动配置免费的 Universal SSL 安全证书。

---

## 三、Bing Webmaster Tools 与 IndexNow 自动化配置

为让 Bing 搜索引擎快速收录并获得良好自然排名：

### 1. 验证网站所有权
- 访问 [Bing Webmaster Tools (必应站长平台)](https://www.bing.com/webmasters)；
- 添加站点：`https://gpttizihelper.top`；
- 本站根目录下已内置 `BingSiteAuth.xml` 验证文件，上传至正式服务器后选择 XML 文件验证即可一键通过。

### 2. 提交站点地图 Sitemap
- 在必应站长平台左侧菜单点击 **Sitemaps (站点地图)**；
- 提交地址：`https://gpttizihelper.top/sitemap.xml`；
- 提交后 Bing 将按计划抓取全站 42 个页面。

### 3. 执行 IndexNow 即时推送
本站内置了完整的 IndexNow API 推送脚本与专属 Key 文件（`8f4b5e67a91249b5812e9b01c1827439.txt`）：
```bash
# 在终端中执行推送命令
npm run indexnow
```
脚本将自动读取 `indexnow.json` 中的 42 个正式页面，批量通知 Bing、Yandex 等搜索引擎蜘蛛抓取更新。

---

## 四、本地日常开发与数据维护

### 1. 更新机场数据
在 `src/data/airports.js` 中更新或添加机场的最新价格、线路信息或实测状态。

### 2. 重新编译生成全量 HTML 页面
```bash
npm run build
```

### 3. 运行全站自动化质检与测试
```bash
npm run test
```
该命令会自动执行 SEO 标签检查、死链与相对路径扫描以及内容完整性审计，并自动更新 `docs/final-audit.md` 质检报告。
