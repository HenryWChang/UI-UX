# 形录 · Form Atlas

中文静态 UI 设计参考网站，保留前两批的 52 个样本和两份可并排对照的风格目录。第三批加入单支视频重绘、含 184 支原片的动画合集和 Galaxy 的 3,802 个社区组件。

## 先看效果

解压后双击 `index.html`，在首页点「打开第三批演示」。每张视频卡都列出了对应的练习。在样本页可以直接操作控件，并从「参考视频」回到原片。图鉴、配色工具和动画均可离线使用，原视频及作者网页需要联网。

效果索引可以按批次和类别筛选。按 `/` 搜索中文或英文名称；选择某个风格后，可复制浏览器地址保存这一项。两个风格目录保留各自的编排，部分风格在两份目录中都会出现。

## 第三批的入口

- `#sources/3` 是第三批总目录。两张资料库卡片分别打开 Galaxy 和《UI交互动画》。下方的单支视频卡提供各自的本地演示与原片链接。
- `#sample/galaxy-browser` 打开 Uiverse Galaxy。支持分类、作者、原始标签和组件文字搜索。选择组件可操作预览、切换底色、调节缩放并查看原始 HTML/CSS。站内保留了 3,802 份组件和两份开源许可。32 项原来引用外部图片，离线版使用已标注的替代图，原始代码仍可查看。
- `#sample/season-gallery` 打开 Max商业动画制作的《UI交互动画》。可在 184 个条目间检索，把对应的视觉观察、可点选的色块构图与可操作的主题研究放在一起看，也可打开每支原片。118 项依据时间轴预览帧，可切换三个采样画面；66 项依据原片封面。每项标有观察依据。地址末尾加上原片 BV 号，可直接定位到那一条。
- 微软 Planner 的两项演示分别展示磨砂任务条与悬浮深度、可转交任务的四列成员看板，以及进度轨道和带状转场。昼夜开关可以拆看云层、月坑和星点，比较 CSS 与保存状态的两种实现。部分样本还链接到可直接试用的 Galaxy 同类组件。
- 再次发送的「10 种 App / 小程序高级动画」复用第一批的十项样本，第三批视频卡提供全部入口。

[微软 Planner 原片](https://www.bilibili.com/video/BV1xb421v7Hf/) · [拟物化昼夜开关原片](https://www.bilibili.com/video/BV184BrB8E4N/) · [UI 交互动画合集](https://space.bilibili.com/3546892183013759/lists/8268661?type=season) · [10 种 App 动效原片](https://www.bilibili.com/video/BV1gAtm69ER4/) · [Galaxy 项目](https://github.com/uiverse-io/galaxy)

## 第二批的视频和演示

| 视频 | 可以动手看的内容 |
| --- | --- |
| 01 · 按钮的状态 | 在同一个结算按钮体验默认、悬停、按下、聚焦、禁用和加载。用 Tab 查看焦点，重复点击观察加载锁。 |
| 02 · AI 界面的隐藏细节 | 用中文输入法确认候选词，向上滚动暂停消息跟随；调整嵌套圆角和描边，拖动分屏，观察窄栏文件名的扩展名。 |
| 03 · 少即是多 | 对比搜索结果有无上下文、票面和账单的阅读顺序、图表层级、工作区标签分组，以及空词库和导入时的进度反馈。 |
| 04 · 50 种前端风格主义 | 查看 50 种作者色票与对应的界面重绘，搜索、切换或挑一项进行并排对照。 |
| 05 · 49 种通用 UI 风格 | 用同一组内容切换 49 项风格，比较排版、表面材质和控件反馈。 |
| 06 · 一镜到底的动效 | 播放、半速或拖动时间轴，分别跟踪桌面日历变手机、耳机降噪和横幅重排为竖海报。 |
| 07 · 色彩逻辑 | 参考第 2、3、6、9、14、15、17 讲。比较 RGB 加光与 CMYK 油墨示意，调节色相与明度、比较色环关系、从场景采色、调整面积与分隔色、替换海报风格。 |
| 08 · 配色网站 | 本地体验 Color Hunt 的色卡浏览、Coolors 的锁色换色和 uiGradients 的渐变预览，支持复制色值。 |
| 09 · 现代终端配色 | 比较 Catppuccin 与 Dracula，在同一张 Wordbook 词卡上查看语义色，再切换 Starship 提示符的信息段。 |

## 托管

这是纯静态 HTML、CSS 和 JavaScript，解压即可使用。将 ZIP 中的文件及 `assets/`、`galaxy/` 文件夹一起放入已有站点的静态发布目录，保留相对路径，使 `index.html` 位于该目录的第一层。

- 已有 GitHub 仓库关联 Cloudflare 时，将这些文件更新到当前部署所用的分支和发布目录，沿用站点已有的部署方式。
- 用 GitHub Pages 从分支发布时，可将文件放在仓库根目录，选择相应分支和 `/(root)`。若使用 `docs/` 发布，将文件放入该目录。
- 样本地址通过 `#` 路由定位。例如 `#sources/2` 打开第二批目录，`#sample/scene-palette` 打开场景取色；`#compare/style-palette-50~japanese/swiss` 对比日系编辑与瑞士风格。在仓库子路径下也可打开和刷新。

[GitHub Pages 发布目录文档](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 源码结构

- `galaxy-library.*` 是组件浏览器，`galaxy/index.js` 提供检索元数据，`galaxy/packs/` 按需提供本地组件和样式。发布时保留整个 `galaxy/` 文件夹。
- `season-library.*` 提供合集目录和主题演示，`composition.js` 保存按预览分镜或封面归纳的色块与位置，`video-library.*` 提供 Planner 与昼夜开关的互动重绘。

- `index.html`、`base.css`、`atlas.js` 提供首页、索引、搜索、视频映射和风格对照。
- `styles-library.*`、`motion-library.*`、`detail-library.*` 包含第一批风格、动效和设计原理。
- `practice-library.*`、`style-lab.*`、`film-library.*`、`color-library.*` 分别包含第二批的界面细节、风格目录、连续转场和配色实验。
- `assets/` 保存图鉴标志与首页插画。示例界面与动画为网页重绘；50 种风格目录的「作者色票」可对照作者的配套项目。

[50 种风格的作者配套项目](https://github.com/rxw2023/Front-end-Design-Styles)
