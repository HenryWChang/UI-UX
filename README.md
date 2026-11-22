# 形录 · Form Atlas

一个中文静态 UI 视觉图鉴，收录九支参考视频中的 34 个网页样本。打开首页的「效果索引」可以按类型浏览，用「视频来源」可以按原视频查找对应示例。

## 本地预览

解压后双击 `index.html`。样式、脚本和图像都在本地，支持离线使用。搜索框支持中英文名称和关键词，按 `/` 可以从键盘打开。

## 上传到 GitHub Pages

1. 将解压后的 **文件和 assets 文件夹** 上传到 GitHub 仓库，让 `index.html` 位于仓库根目录，保留目录结构。
2. 进入仓库 **Settings → Pages**，在 **Build and deployment** 下将 **Source** 设为 **Deploy from a branch**。
3. 选择存放文件的分支（例如 `main`）和 **/(root)**，保存。部署完成后，使用 Pages 页面提供的地址打开图鉴。

如果将文件放在已有仓库的 `docs/` 目录，把发布目录设为 **/docs**。单个样本和风格对照页都支持复制完整地址和刷新，例如 `#sample/liquid-switch` 与 `#compare/swiss/glass`。

[GitHub Pages 发布目录说明](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 图鉴内容

| 类别 | 可观察的效果 |
| --- | --- |
| 17 种视觉风格 | 瑞士风格、极简主义、玻璃态、新拟物、赛博朋克、粗野主义、Y2K、暗黑奢华、Material、Fluent、Apple HIG、Bento Grid、后台仪表盘、北欧自然风、孟菲斯、动感渐变和编辑部风格。选择「风格对照」可为两个样本分别选风格。 |
| 13 种交互动效 | 触点主题切换、拖拽排序、批量勾选、刻度吸附、文本展开、进度回弹、邻项反馈、曲线删除、滚动堆叠、标签让位、惯性滑动、昼夜玻璃开关和 Face ID 识别。 |
| 4 个设计原理演示 | 比较普通圆角与连续曲率、叠加图标构造网格、调整视觉层级、调节字体和阅读节奏。 |

网站根据视频描述重新绘制了图形和动效。风格标本采用相同的虚构「周末声音档案」内容，选择条目可以切换采集笔记。网页里的「参考视频」链接需要联网。

## 源码

- `index.html`、`base.css`、`atlas.js` 包含页面框架、索引、搜索、对照视图和基于地址片段的导航。
- `styles-library.*` 包含 17 种风格的页面排版与原创缩略图。
- `motion-library.*` 包含 10 个 App 微动效。
- `detail-library.*` 包含弹簧、玻璃开关、识别光环及 4 个设计原理演示。
- `assets/` 包含站点标志和首页的连续曲率造型图。
