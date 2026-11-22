(() => {
  'use strict';
  const author = 'Max商业动画制作';
  const families = {
    prompt: ['输入框与结果反馈','Prompt to result','在输入、提交和结果之间追踪同一块文字。','提交提示','输入进程','#47375f','#d7b2ff'],
    data: ['数据读数与游标','Live data readout','移动游标，比较曲线、读数与高亮采样点怎样对应。','扫描数据','采样位置','#123e46','#aef48d'],
    flow: ['节点与信号传递','Signal routing','沿分支传递一枚信号，观察当前节点与已完成路径。','传递信号','信号位置','#1d314b','#6ee4cb'],
    tiles: ['卡片队列与焦点','Card choreography','切换内容卡，观察相邻卡片怎样以缩放、重叠和透明度退后。','浏览卡组','当前焦点','#322e4e','#ffa780'],
    caption: ['标题分段揭示','Kinetic headlines','拖动遮罩，让两行标题分阶段进入画面，观察强调色怎样接力。','播放标题','排字进度','#28214c','#e3c9ff'],
    glass: ['玻璃窗口的前后景','Layered surfaces','调整前景窗的距离与虚化，观察背景图案怎样穿过表面。','拉开层次','分层程度','#20433e','#b4eccd'],
    voice: ['语音波形与播放位置','Audio activity','播放一段合成的无声波形，比较播放头前后声条的着色。','播放波形','播放位置','#3c2448','#ffb1c7'],
    progress: ['等待态与完成反馈','Completion states','让一次任务从等待、处理中走向完成，观察圆环何时交给勾号。','运行任务','完成进度','#404125','#e0ed85'],
    icons: ['图标栏的焦点移动','Dock focus','沿工具栏移动焦点，观察相邻图标让位、选中底色和标签。','巡视工具栏','焦点位置','#273457','#bbc9ff']
  };
  const records = [
    ["BV1J8Vm6NEHP","【UI交互动画】UI动效卷成这样？这种交互逻辑我能看一天视觉",11,"prompt","深色指令菜单和发光的多行答复组成前后两层。","frames",["#354f55","#0f191d","#23343a","#456a6f"]],
    ["BV1XNVB68EvJ","【UI交互动画】是设计也是艺术！UI交互动画的极致美学赏析",10,"tiles","蓝紫手机表单与奶油黄立体球并置，借物体引向操作区。","frames",["#bccee9","#a0bcd9","#9d99a2","#d5bea0"]],
    ["BV1k6E36JEtP","【UI交互动画】别再做PPT式演示了！试试动态UI交互展示✨",37,"caption","黑紫光带收拢到大字，再把焦点交给一句短文案。","frames",["#11022b","#34195c"]],
    ["BV1DUE56rEkZ","【UI交互动画】多邻国这类UI动画，很适合拿去做产品宣传片",15,"progress","橙色火焰、打勾日历和连续天数共同表达打卡。","frames",["#e49a6e","#e7c89d","#f2eadb","#ead9bb"]],
    ["BV11UEQ6KEKi","【UI交互动画】从UI到动画：让你的产品界面动得有灵魂✨",12,"glass","云景背景透过并排的浅色工作窗，留住空间层次。","cover",["#a4bad3","#b2baa3","#dcdce3","#cdd9a1"]],
    ["BV1gsEe6fEMF","【UI交互动画】拒绝平庸！让你的APP宣传片自带高级感",11,"flow","白色内容卡之后出现分支流程，连线把选项组织成路径。","frames",["#7c64d6","#1f1328","#624fa1","#473574"]],
    ["BV1B4EY6BEsK","【UI交互动画】还在愁APP宣传片没亮点？这组动画给你答案",43,"data","医疗空间过渡到蓝绿发光折线，数据成为画面主体。","frames",["#c7e5f4","#0e6d9b","#11b0a9","#3968a5"]],
    ["BV1DGEz6GEBJ","【UI交互动画】软件宣传片都在这样做！有效传达产品功能！",14,"glass","彩色品牌标记过渡到浮在青蓝背景上的工作窗口。","frames",["#fee7f9","#b1e6e6","#f8c2de","#568baf"]],
    ["BV1oeJu6zEdz","【UI交互动画】让产品身价翻倍的UI动效，这也太丝滑了！✨",18,"caption","高亮粉红光晕衬托居中的白色短句。","frames",["#c0113f","#1c040b","#73062e","#cc90a6"]],
    ["BV1GijT6SEMo","【UI交互动画】30秒讲清楚你的软件！UI动画还是太全面",22,"data","紫色轨迹引入性能面板，指标、图表依次进入视野。","frames",["#0d012b","#453260","#2c1b43","#88749f"]],
    ["BV1SRjL6BEZ9","【UI交互动画】高级简约SaaS产品宣传片｜功能介绍一目了然",20,"caption","深蓝背景上的白色大标题接替多块任务窗口。","frames",["#001c3c","#050a16","#072a6d","#2d3860"]],
    ["BV1LzLD6CESF","【UI交互动画】科技感UI的精髓：不仅是发光，更是交互逻辑",21,"icons","深底上一排胶囊按钮，中间的主要动作拥有最亮外圈。","cover",["#171717","#39352c","#938670"]],
    ["BV1WnjF62EKu","【UI交互动画】从UI到动画：让你的产品界面动得有灵魂✨",29,"prompt","一句日程指令在淡蓝背景的圆角输入条中出现。","frames",["#b0b4b8","#e3e9fb","#948981"]],
    ["BV1gUje6xEtG","【UI交互动画】提升产品溢价的秘密：这套UI交互动画绝了",57,"data","深色仪表板同时展示柱图与环形占比，用亮蓝强调数值。","frames",["#060b11","#1a2136","#5e6d88"]],
    ["BV17MjJ64EFG","【UI交互动画】别拿录屏糊弄人，试试高阶UI交互动画",30,"prompt","极简搜索条拆成多个输入词块，再进入完整工作区。","frames",["#103523","#ccc6c4","#747e6e","#9dabbb"]],
    ["BV1427w6hExJ","【UI交互动画】这组UI交互动画，承包了所有高级感",14,"prompt","欢迎语下的提问框与回复界面使用一致的深色背景。","frames",["#1e251d","#4c534f"]],
    ["BV1jij16PEos","【UI交互动画】动态微交互UI展示，清晰呈现功能细节✨",33,"prompt","橙红描边输入框与实心按钮相继占据手机中央。","frames",["#141414","#883823","#512017"]],
    ["BV1nCj96hEy6","【UI交互动画】高水准UI交互设计，让前端动效更丝滑✨",14,"tiles","小型人物信息卡浮在白底上，绿色操作区成为焦点。","frames",["#fdf7c3","#fffce9","#d2d4b5"]],
    ["BV1z27q67ENG","【UI交互动画】SaaS产品宣传片｜高级质感演绎产品功能",16,"glass","粉色桌面与薄荷绿交叠窗口过渡到紫色立体几何物。","frames",["#dac3d5","#c69fdd","#a5cbac","#b23673"]],
    ["BV15D7G6BEEx","【UI交互动画】高级感UI交互，让产品视觉更有质感✨",19,"prompt","模型选择浮层从输入区弹出，当前行加深并保留说明文字。","cover",["#353538","#161718","#9ba48d","#c0cda2"]],
    ["BV1VETT6fE4b","【UI交互动画】科技感B端产品动画，用视觉给产品提价",27,"caption","橙红整屏与留白大字交替，最后收束成品牌标记。","frames",["#ed2607","#c4786d","#f6ecee"]],
    ["BV1V2KS62ESq","【UI交互动画】谁都躲不开！未来三年被液态玻璃风格承包了",24,"prompt","青色标记的提问框之后出现短回答，对话上下排列。","frames",["#efefef","#323232","#abd4da","#868686"]],
    ["BV1gpKd64EXk","【UI交互动画】用动态语音将SaaS功能可视化！清晰又吸睛！",31,"caption","超大字切片、重复文案与逐词上色制造阅读节奏。","frames",["#b4c4c7","#ededee","#989ba6","#636a7e"]],
    ["BV1dBTh6AET4","【UI交互动画】用UI动效！把SaaS功能介绍做到吸睛又清晰！",10,"tiles","实物桌面过渡到斜向排列的手机信息卡。","frames",["#a67b9e","#e2cfd3","#6c218b","#cda3ba"]],
    ["BV18STk6sEnG","【UI交互动画】用丝滑高级的视觉动效！做软件宣传片太吸睛",20,"data","彩色统计面板集合条形、折线、环形等多种图表。","frames",["#dbcddb","#6bf0db","#c7aac8","#c376c3"]],
    ["BV1YpTn6YEj3","【UI交互动画】高阶审美APP宣传片，用质感打动用户📱",40,"flow","暖色光点从中心延伸至多个节点，再进入系统视图。","frames",["#1b0f0e","#4a2219","#654333"]],
    ["BV1SdTW6qEvH","【UI交互动画】复杂系统变清晰，动态演示为产品加分📈",23,"tiles","深色产品标记之后出现浅色工作卡和分组列表。","frames",["#191021","#e092b9","#f1dee9","#7a122a"]],
    ["BV1MHTx6zEKP","【UI交互动画】高水准UI交互设计，让前端动效更丝滑✨",16,"data","绿色底上的单张概览板把指标、柱图与环图并排。","frames",["#125d3e","#afcbb8"]],
    ["BV1aMMT68E8q","【UI交互动画】用丝滑高级的视觉动效！做软件宣传片太吸睛",13,"glass","通知片悬浮在绿色背景和半透明办公界面之间。","frames",["#d4d8d2","#65af6d","#93a47c","#a7be9e"]],
    ["BV1X1Mt69EQ5","软件演示的最高境界：沉浸式视觉体验🎬",15,"flow","多种工具用细曲线汇入中央标记，再连接输出列表。","cover",["#191919","#424443"]],
    ["BV1MHMa6oEwd","【UI交互动画】沉浸式UI交互体验：视觉与功能的完美融合",25,"icons","斜拍桌面中的图标、操作条与立体小物相互呼应。","frames",["#0303b3","#5e5d89","#f2e2dc","#4d3a69"]],
    ["BV1v3Me6GEpf","【UI交互动画】玻璃拟态风简直太绝了！软件宣传片就这样做",14,"icons","几何图标在浅紫背景上层叠展示，轮廓和体积表达身份。","frames",["#c9abd3","#dadfe5","#7588b6","#444492"]],
    ["BV1qoM76iE1c","【UI交互动画】2026年超流行的宣传片风格！玻璃拟态风！",9,"tiles","大量浅色条目在纵深中排列，再聚焦单张人物卡。","frames",["#9ec0fa","#e4e3e4","#b6b8c0","#d3cac4"]],
    ["BV1oSNL6QEkn","【UI交互动画】别再做枯燥的录屏了！UI交互动画让产品更出彩",32,"tiles","大标题引入手机行程，再切换到单张地图卡。","frames",["#feebd3","#c7a29f","#8d6e70","#d6c3b6"]],
    ["BV1P3NA6cE6d","【UI交互动画】拿着这样的APP宣传片，路演更稳了📈",45,"prompt","亮色渐变场景里保留白色输入框与黑色提交键。","frames",["#7ea2f4","#f160d2","#ef0791","#f12caf"]],
    ["BV1jiNT68ELP","【UI交互动画】复杂系统变清晰，动态演示为产品加分📈",21,"tiles","橙色价值卡以光环和立体物件突出，数字集中在一侧。","frames",["#f48609","#7c3733","#96c5b0","#c18742"]],
    ["BV1KpN36RE3N","【UI交互动画】复杂系统变清晰，动态演示为产品加分📈",30,"progress","圆环从等待态接到文摘结果，让状态有明确落点。","frames",["#030329","#0e227b","#dbdee2","#413d9e"]],
    ["BV1c5Ny6gEak","【UI交互动画】用吸睛的动效！改变软件枯燥说教功能介绍！",17,"glass","透明面板与彩虹反射叠在一起，透视分出前后。","frames",["#a48b88","#ced1d1","#98a4a4","#897279"]],
    ["BV1QKNX62E6K","【UI交互动画】30秒介绍明白办公软件｜不愧是UI交互动画",26,"flow","蓝色人物节点居中，四个分支围绕它形成放射关系。","frames",["#eae9f2","#c9cedf","#adb1cb","#8d9ece"]],
    ["BV1TfNa6DEsL","【UI交互动画】高级简约SaaS产品宣传片｜功能介绍一目了然",15,"icons","过滤条件与翻译开关采用同一种珊瑚红选中态。","frames",["#c5bfc6","#d36461","#f0e2e6","#a59fa4"]],
    ["BV16sK367EeT","【UI交互动画】拒绝平庸演示！这才是高端APP该有的视觉呈现🚀",19,"voice","黑底上从播放条延伸出一条明亮的声音波形。","cover",["#100e1d","#292442","#bfc1d5","#3c4164"]],
    ["BV1VGKJ6tEEd","【UI交互动画】软件演示的最高境界：沉浸式视觉体验🎬",14,"prompt","暗色问答框从输入态切到下方回复内容。","frames",["#1e251d","#4c534f"]],
    ["BV1YJK26qESN","【UI交互动画】强迫症极度舒适！这套UI交互把细节控死死了🌀",18,"caption","紫色放射形状穿过短句，再把视线集中到单个大词。","frames",["#0f0420","#25054a","#5e3f7f","#3b1966"]],
    ["BV1LHgr6iExD","【UI交互动画】概念级APP宣传片，带UI交互的视觉风暴",38,"progress","生成态小圆环与胶囊标签一起指示等待。","cover",["#f2f3f7","#16171b","#636e2e","#cbd4a4"]],
    ["BV12cgC6oEk3","【UI交互动画】别再只发截图了！你的软件演示需要动效加持",49,"data","浅色会话报表用头像、百分比和红绿状态组织行列。","frames",["#0c0b2a","#0f4037","#321a3c","#aeb7b8"]],
    ["BV149gS61EpS","【UI交互动画】商业动画的进阶：让你的UI交互“会说话”",29,"prompt","玻璃质感的加号输入条浮在大面积留白上。","frames",["#0d0c14","#2f8eb5","#b9dbe7","#77c6da"]],
    ["BV18mgS6SEs4","【UI交互动画】这种UI交互动画，甲方看了根本没法拒绝！",27,"prompt","输入框覆盖素材，文字描述与图片结果一起呈现。","frames",["#13120d","#40362e","#5d4e42","#dcdeb5"]],
    ["BV1y93M6tEux","【UI交互动画】好动效自己会说话！高质感商业动画演示",29,"tiles","深色竖屏之后形成并列的彩色影像卡。","frames",["#050910","#162437","#b4917c","#755049"]],
    ["BV1mtgZ6vEN1","【UI交互动画】复杂功能讲不清？用UI交互动效搞定💡",46,"caption","深浅绿色场景穿插，短句与圆弧装饰共同推动视线。","frames",["#188752","#0c6743","#d1f5b2","#fbfeec"]],
    ["BV1ZQ3e6REM8","【UI交互动画】丢掉死板说明！用灵动的交互动效为设计加分💯",12,"prompt","暖色问候语位于深底输入框上方，发送键沿用橙色。","cover",["#281e1d","#59372a","#7a5547"]],
    ["BV1hG3z6oExm","【UI交互动画】高水准UI交互设计，让前端动效更丝滑✨",21,"glass","蓝白旋纹转入暗色舞台，蓝色光边区分悬浮面板的深度。","frames",["#070222","#9287d7","#2919ce","#e5e5f3"]],
    ["BV1xu3k64EHk","【UI交互动画】把功能点做成视觉焦点，高品质UI动效演示🎯",47,"prompt","粉蓝大面积渐变把画面中心留给窄输入条。","frames",["#eedad6","#d2c9e8","#b1aced","#706ea2"]],
    ["BV1sj3y68EaV","这套SaaS演示，把产品的核心价值说透了！🎯",45,"data","冰蓝色报表将筹款金额、折线和柱图悬置在不同层面。","cover",["#8cb0d2","#6a8db7","#bdd8ee","#dbebf6"]],
    ["BV14FGc6LEoj","【UI交互动画】细节美学拉满！让界面演示提升不止一个档次📈",39,"caption","夕照中的人像和暖灯形成暗部轮廓，适合作为片头视觉基底。","cover",["#030810","#5f8daf","#061e2d","#744734"]],
    ["BV1FUGM6dEZD","【UI交互动画】出海产品没优势？国际化UI交互来加分🚀",47,"tiles","紫色背景托起多行联系人条目，随后转到完整目录窗口。","frames",["#e9e5f1","#cbc8eb","#a681e1"]],
    ["BV1133969EaV","【UI交互动画】数字化后台SaaS，动效让数据活起来📊",25,"prompt","白色页中央以简洁输入条配合一行快速操作标签。","cover",["#c6d2e0","#effcfe"]],
    ["BV1WA3f6vECd","【UI交互动画】别让客户猜功能，用动效直接展示结果🎯",20,"flow","邮件与通知应用分列在缩进步骤里，层级说明先后关系。","cover",["#fdf9ed","#dcd8cc","#bbb0a2"]],
    ["BV1QYM96ZEmY","【UI交互动画】数字化产品路演，用UI交互动画撑场面🎬",37,"tiles","手机剪辑面板展示素材替换和导入，用同一外壳衔接镜头。","frames",["#070515","#1b123d","#7b7179"]],
    ["BV1xFuc6vEK5","【UI交互动画】炫酷UI交互，让你的APP更有吸引力🔥",15,"glass","暗绿背景上多层网页沿斜线错开，前层亮黄按钮最突出。","cover",["#3c4530","#2f370b","#586530","#99a859"]],
    ["BV1XMMr64EkF","【UI交互动画】提升数字化产品质感，用高精UI微动效搞定✨",25,"caption","黑白小窗叠在黄色背景与纯黑场景之间，文案居中接力。","frames",["#faef8f","#fdf6cb","#d5ce8b","#fefdee"]],
    ["BV1jbuE6BEVP","【UI交互动画】别再用静态图了，动态交互才是行业趋势",27,"glass","紫色中央面板缩在大片黑色留白里，凸显工作区焦点。","frames",["#191424","#7642bb","#422678","#aa57f7"]],
    ["BV1W9uT6QESU","【UI交互动画】让APP动起来！这才是软件演示该有的样子",15,"progress","紫色星形点缀后出现状态胶囊，手机和状态提示分层。","frames",["#190132","#3d1859","#0a0013","#d7b0e1"]],
    ["BV1NKuq6TE8W","【UI交互动画】让你的软件功能，像科幻大片一样登场🛸",22,"icons","山景之上并列圆角应用图标，鼠标指向其中一项。","cover",["#81a581","#dddfd6","#3d5d15","#aca725"]],
    ["BV1kpuC6UENv","【UI交互动画】别让你的SaaS产品，输在演示视频的质感上",48,"data","运动照片作为背景，锻炼读数与计时叠在前景。","cover",["#eaf7f2","#59543f","#f5e1d0","#2f3128"]],
    ["BV16NgN66E7A","【UI交互动画】这种呼吸感UI动效，越看越上头",22,"icons","花景和应用栏之后出现收件箱入口，突出当前工具。","frames",["#faefe5","#f2957c","#9a7f53","#f8cbc8"]],
    ["BV1ivbY6bEPY","【UI交互动画】这种呼吸感UI动效，越看越上头",20,"flow","绿色循环图把日常活动排列在同一条弧线上。","frames",["#011005","#0f4018","#206f31","#46bf60"]],
    ["BV1By8V6yEYv","【UI交互动画】这种UI质感，才是商业动画该有的样子",19,"caption","紫色暗场上出现一枚星芒和一个短词，形成片尾签名。","frames",["#0d001c","#23014f"]],
    ["BV1Mn8w6hEyD","【UI交互动画】直接用动效说话：把软件功能讲透的演示方案",20,"voice","白色面板提供文字转语音输入与生成按钮。","cover",["#f2f2f2","#3a3a3a","#d8d8d9"]],
    ["BV18D8T6jE5o","【UI交互动画】把复杂操作变视觉享受，高质感界面交互⚡️",51,"tiles","黑底上的素材缩略图铺成矩阵，用亮色按钮指示下一步。","frames",["#0d0c14","#262826","#989a90","#605d54"]],
    ["BV1cd8y6BEAK","【UI交互动画】商业动画进阶：UI交互的科技美学💎",21,"tiles","两块手机界面并排倾斜，重复外轮廓串起不同状态。","cover",["#72c6ea","#19505a","#45765f","#dee3e3"]],
    ["BV1Jk8s62E9b","【UI交互动画】从UI到动画：让你的产品界面动得有灵魂✨",12,"icons","大面积深色背景中一行白色工具胶囊最醒目。","frames",["#120208","#3f1522","#e6d9dd","#91475f"]],
    ["BV1GghK6UEaL","【UI交互动画】让用户一眼爱上界面，高品质UI视觉交互展现🌟",22,"tiles","深色车辆卡通过绿色外圈强调中央选项，随后切入地图。","frames",["#dadbe0","#090f10","#212627","#fefff1"]],
    ["BV1eih36KED1","【UI交互动画】高阶审美APP宣传片，用质感打动用户📱",32,"glass","浅色云雾与会议摘要窗口叠放，为白色界面保留边界。","frames",["#d1d4df","#f1f0fa"]],
    ["BV1U3hV6cELJ","【UI交互动画】把功能点做成视觉焦点，高品质UI动效演示🎯",35,"prompt","研究助手输入区通过青色边光与深色背景分开。","frames",["#14272d","#5a786b"]],
    ["BV1AHhw6REsF","【UI交互动画】这种UI界面展示，把科技感细节直接拉满⚙️",38,"voice","音频播放图标、声条与极简计数共用一条水平基线。","cover",["#13084a","#07051a","#3a2a59"]],
    ["BV1CZtw6JEvi","【UI交互动画】产品更新换代，用一套UI动画把升级亮点讲明✨",24,"tiles","三张设计卡并列对齐，可直接比对内部排版与色彩。","frames",["#c8e6fc","#72c0fc","#e9e4eb","#a0ddeb"]],
    ["BV1Zg4k6SEVU","【UI交互动画】极致细节！每一处交互都长在审美点上的动画",38,"voice","橙色竖条沿语音标签展开，强调音频活动。","cover",["#d2d3d7","#ebebee","#d7a486"]],
    ["BV1bqtn61E2Z","【UI交互动画】✨用AE把App界面做成大片，质感直接拉满",41,"tiles","几个竖屏样机错开陈列，各自用亮边从暗场中浮出。","cover",["#060f1a","#28313a","#575a61","#9cadb9"]],
    ["BV1Astb6oEMG","【UI交互动画】当UI设计有了呼吸感，画面高级感瞬间拉满✨",24,"tiles","日历、代办与标语卡在同一浅色画板上组成松散网格。","frames",["#e9e9e9","#798a9a","#825f68","#cceecb"]],
    ["BV1Qit36sEXU","【UI交互动画】✨看信息节点生长成树，这才是品牌动效",32,"glass","森林背景透过暗色代码窗口，文字与背景分出前后。","cover",["#0f1d18","#ddeded","#495f49","#c0d6d7"]],
    ["BV1KptJ6TEaK","【UI交互动画】给产品加上会动的AI形象，界面表达瞬间高级了✨",44,"prompt","写信浮层从背景中提亮，蓝色发送键落在右下角。","cover",["#273418","#0b1008","#4c6953","#ced2d5"]],
    ["BV16RtX6WEkt","【UI交互动画】当AI交互遇上动态设计，界面瞬间活了 🤖",26,"flow","彩色块由弧线串成顺序图，底部动作按钮收尾。","frames",["#2e2339","#171717","#44374e","#8b7b8f"]],
    ["BV19Xty6XER7","【UI交互动画】打破单调产品界面！这才是未来感UI演示💜",39,"tiles","紫色工具区与下拉列表切换，主面板始终占据中央。","frames",["#0d0342","#140a1b","#342549","#766aa2"]],
    ["BV1oAbj6jEmU","【UI交互动画】用丝滑交互动效，把App界面玩出科技质感",48,"data","暗色手机用荧光绿区分余额、涨幅和主要动作。","cover",["#091707","#3e5b13","#577520","#1f3c0d"]],
    ["BV1BJb46LEGR","【UI交互动画】把灵感搜寻做成视觉大片，这套交互节奏太绝了",30,"icons","色环式多色点与取色面板衔接，最后进入灵感板。","frames",["#2a1013","#6ba0b7","#b0bcc2","#636b71"]],
    ["BV1N6Y46iEWt","【UI交互动画】SKUVE智能搜索界面，动效让交互更懂用户💡",49,"tiles","不同产品素材分散成独立小卡，深底隔开各卡轮廓。","cover",["#291d2b","#e1c4b1","#f4ece0","#96887d"]],
    ["BV1ksYN6TEoj","💡把复杂自动化逻辑做成动效，视觉体验拉满",45,"flow","多个工具通过发光弯折线连接到中央模块。","cover",["#121113","#3e3d45","#282829","#87868b"]],
    ["BV1qKY36CEaP","【UI交互动画】🤖GPT 6 Astra界面动效，产品演示的新可能",11,"prompt","品牌标记下方的深色输入条以蓝色发送键收束。","cover",["#050912","#374f78","#151e3b","#273554"]],
    ["BV1GNYj6SECJ","【UI交互动画】写代码也能玩出科技大片感，UI动效质感拉满✨",17,"prompt","紫灰色生成提示区之后出现绿色半透明的结果卡。","frames",["#322833","#19191a","#5b8162","#304f33"]],
    ["BV1ajYR6dE3B","【UI交互动画】当UI界面遇上流畅动效 动态视觉直接拉满⚡️",36,"voice","深蓝资产库通过多组波形缩略图呈现不同音频。","frames",["#161825","#466a7d"]],
    ["BV1bkYY6bE64","【UI交互动画】当Airbnb的界面动起来，用户体验直接拉满💻",25,"tiles","房源卡片与地图并排，图片、位置与详情形成对应关系。","frames",["#e3e0e7","#bdafb2"]],
    ["BV1FDYB6bEDa","【UI交互动画】UI图形加点动效，产品演示也能这么吸睛🎨",30,"flow","头像沿同心轨迹绕中心排列，突出协作关系。","frames",["#efefef","#141414","#2c292a","#575658"]],
    ["BV1zoY66wEsr","【UI交互动画】📱把UI做活！产品界面的高级感质感呈现✨",53,"glass","聊天气泡悬在紫色手机旁边，与顶部通知形成两个层次。","cover",["#050214","#3f3d4c","#2e0758","#4a1169"]],
    ["BV1KNej6CEqR","【UI交互动画】当UI界面被赋予流畅动效，行程规划也变得有质感✨",38,"tiles","两侧浅紫界面退后，中央完整表单与蓝色按钮最清晰。","cover",["#e2ddf7","#5c55e3"]],
    ["BV1Rcep66ENc","【UI交互动画】当UI动效注入光影，产品界面高级感秒出✨",21,"caption","暗橙光晕中的小型命令组件过渡到一行标题。","frames",["#761f05","#4b1005","#a8380b","#1b0503"]],
    ["BV14deF6eEQR","【UI交互动画】微软的动态UI设计，把线上会议玩明白了✨",50,"glass","紫蓝光场中穿插视频窗口、字幕胶囊与半透明装饰片。","cover",["#9b7bf7","#7886fa","#5646b6","#a1a1d5"]],
    ["BV1MBeA6CEaX","【UI交互动画】🎨流体光影加持，aissista产品视觉质感拉满",8,"glass","浏览器以多重细线轮廓叠放，同色背景也能辨识前后。","cover",["#2a2021","#918a88","#5d5454"]],
    ["BV1Wpe36dEuu","【UI交互动画】把复杂的收益逻辑，做成有呼吸感的UI动效✨",32,"flow","金额卡通过连线连接到下一级分成比例，再切到清单。","frames",["#101111","#264137"]],
    ["BV179ey6yED6","【UI交互动画】当Stitch遇上动效设计，产品演示直接质感拉满💫",47,"caption","衬线大标题跨越紫色和青绿色网页样机，保持阅读重心。","frames",["#111111","#273238","#375c53","#728a93"]],
    ["BV1hjeS65E62","【UI交互动画】动态排版+卡点视觉，让品牌表达更有张力⚡️",47,"caption","句子分散在白底上，中心短语与末尾深红标签呼应。","cover",["#b5afb0","#f0eeed","#dcd8dc","#8b596b"]],
    ["BV1vbet6dETw","【UI交互动画】把Apple Music灵动岛做活了，这交互细节真绝📱",12,"glass","粉色同心形背景托起一张半透明的头像消息条。","cover",["#fe738a","#fda5b2"]],
    ["BV1Kge86mETB","【UI交互动画】✨产品界面动起来，SaaS动画的高级感拿捏了",24,"icons","蓝黑色底上出现白色眼睛符号，以简单轮廓识别图标。","cover",["#050b6d","#020327","#0302eb","#edf0ee"]],
    ["BV138ev6uE76","【UI交互动画】🎬把SaaS界面做成大片，视觉层级这样排",37,"icons","创作工具环绕屏幕陈列，黑底标题逐步过渡到设备示意。","frames",["#f6dcde","#da8b93","#493a3b","#100b0e"]],
    ["BV1PheB6KEAQ","【UI交互动画】✨动效让产品界面开口说话，科技感线条太赞",43,"tiles","人物信息排成多卡阵列，用明暗差突出选中的几张。","cover",["#0f1012","#868687","#d9d8da","#f0f1f1"]],
    ["BV1fbhe6uEaq","【UI交互动画】UI微动效加持 这样的AI产品演示也太洗脑了",49,"glass","深色磨砂推荐卡叠在暖色渐变上，角落动作浮在卡外。","cover",["#4f524e","#a9b6b2","#b54d3d","#818382"]],
    ["BV1Ksh66TEiL","【UI交互动画】用流畅的UI动效，给AI产品加上视觉灵魂",31,"tiles","三列素材选择区与大幅主体预览并置，主次清楚。","cover",["#e45f22","#5c3860","#b1a273","#dad5b8"]],
    ["BV1HVhE6NE8Y","【UI交互动画】💡当SaaS界面动起来，科技感瞬间拉满",26,"glass","紫色渐变包围三层任务面板，中央内容比两侧明亮。","cover",["#271e2a","#401452","#a602ea","#7b06ac"]],
    ["BV1hfhJ6pE8f","【UI交互动画】让软件界面自己“跑”起来，UI动效也能玩得这么高级⚡️",53,"prompt","亮绿色强调优化动作，表单输入、描述与结果依序出现。","frames",["#1e3f1a","#a3c576","#487436","#cbe68d"]],
    ["BV1rXht6bEVQ","【UI交互动画】光影配合UI动效，这套视觉表达太丝滑了⚡",28,"tiles","白底任务看板分成几列，每列沿用绿色列头。","cover",["#f1f8f4","#4ebf92","#cbd9d2","#2c7d5d"]],
    ["BV1v2hb6pECG","【UI交互动画】APP原型动效展示，这才是真正的产品灵魂✨",20,"caption","单句白字从网格暗场过渡到白底品牌符号。","frames",["#6f7678"]],
    ["BV1Mkaw6NEK5","【UI交互动画】UI动效玩明白了，多端界面衔接居然能这么流畅✨",43,"tiles","回复气泡下方的并列照片卡把文字查询与结果对应。","cover",["#222334","#3c425f","#7e87a0","#0d0b14"]],
    ["BV1WzaT6rEP2","【UI交互动画】别让你的SaaS产品，输在演示视频的质感上",12,"data","三枚发光小读数并排，用相同单位对照不同指标。","cover",["#312b3e","#13101c","#625c71"]],
    ["BV1QCh16bEZQ","【UI交互动画】当ChatGPT Astra遇到动态微交互，质感拉满 💻",26,"caption","云层上的居中文案接到桌面设备，标语在切景时仍是焦点。","frames",["#958f8f","#cfc5ce","#746a63","#8b9eb6"]],
    ["BV1Msh96yE7t","【UI交互动画】当AI生成遇上动态UI，这套视觉流畅度绝了🔥",36,"caption","超大黑字接替短句，之后以紫色点阵承托白字。","frames",["#f6f7f1","#474357"]],
    ["BV1bKab6CE14","【UI交互动画】让产品演示不仅好看 视觉呈现更富节奏感✨",29,"flow","暗色路网与区域高亮提供位置关系，随后切到版式标题。","frames",["#101010","#f5f5f0","#2b2b2b","#c5c6c3"]],
    ["BV1MYaa6XEfU","【UI交互动画】把复杂的AI财务流程，做成丝滑的UI视觉体验",14,"progress","白色等待界面将圆形进度与思考状态并置。","cover",["#d5d2db","#9893b0"]],
    ["BV1Hvaq6dEvR","【UI交互动画】LearnWise界面动效：科技感与平滑交互的碰撞🚀",54,"prompt","查找指令过渡到助手的结构化结果，关键词用色彩呼应。","frames",["#05091c","#ede2e7","#253953","#a8a7a5"]],
    ["BV1y9aL6PEKD","【UI交互动画】用镜头语言讲清产品逻辑，这才叫高效视觉📱",15,"icons","风景桌面上的应用栏位于底部，关联的工作窗在其上方展开。","cover",["#dfd8cc","#605e24","#979683","#7a7441"]],
    ["BV1uaan69EG8","【UI交互动画】💡 舒缓节奏搭配视觉微动，提升用户信息获取效率",27,"tiles","商品卡在斜向队列中错位重叠，清晰保留图像与价格。","cover",["#f1d2f9","#9866d6","#cabbed","#c49ed9"]],
    ["BV1qraW65ERY","【UI交互动画】这套UI动效，把产品的科技感拉满了！✨",37,"flow","多个头像沿上下两条弧线向中心品牌聚拢。","cover",["#feefe9","#f7d4c3","#ab948e"]],
    ["BV1drad6eE2G","【UI交互动画】这种层级分明的UI动态演示，视觉逻辑给满分！",30,"caption","亮绿手机主题与满版重复蓝字交替，标语保持简短。","frames",["#060e63","#0522c8","#0b1a83","#070814"]],
    ["BV15Raz6DEZE","【UI交互动画】概念软件演示：用界面动效传递科技美学💎",11,"prompt","酒红底色中，胶囊指令入口过渡到引用来源侧栏。","frames",["#20070a","#560008","#9e071b","#7c3f47"]],
    ["BV1nWHh6CEss","【UI交互动画】不是产品不好，是展示方式还不够打动人",12,"tiles","黑底上的多个发光网页组成样机墙，中间界面尺度最大。","frames",["#352050","#8d69cd","#0b0311","#1a0432"]],
    ["BV1gSHY6eEjz","【UI交互动画】看完心动了！高水准UI交互演示，提升转化率",53,"caption","光标旁单词逐字增长，随后用亮色标签叠加在人像上。","frames",["#382d28","#bbc8be","#a4a395","#7a6d5b"]],
    ["BV1LUHz6bEqm","【UI交互动画】商业动画的进阶：让你的UI交互“会说话”",38,"icons","手机上的单个主按钮置于暗蓝色放射光中央。","cover",["#000145","#010122","#485a92"]],
    ["BV1mEHx6rED6","【UI交互动画】💡 科技蓝粒子交织，信息呈现更有层次",37,"data","蓝色数字与进度条放大铺满画面，指标成为视觉主体。","frames",["#5875b1","#091248","#132961","#2562db"]],
    ["BV15vpA6xE4L","【UI交互动画】科技产品宣传片，用视觉冲击抓住注意力⚡",45,"tiles","白底中的多张小信息卡合围，再转向一张操作表单。","frames",["#f2f2f2","#dcdbdb"]],
    ["BV12oHy6tE2n","【UI交互动画】直接用动效说话：把软件功能讲透的演示方案",13,"tiles","激活标签加了下划线，中央统计卡盖在相邻两张卡上。","cover",["#fefff1","#d6dab0","#8c8c7a"]],
    ["BV1C3HS6eEBT","【UI交互动画】高颜值的UI动效，是B端软件的加分项",23,"prompt","暗色输入卡用多色轮廓反馈，随后出现清晰线稿结果。","frames",["#1b161e","#b6c2ba","#e2eae4","#d8d2bd"]],
    ["BV1TbHX6SEyG","【UI交互动画】这套UI演示，把丝滑写到了极致🫧",20,"prompt","暖色光影托起灰色提问框，提交键和模型选择归在同一区域。","frames",["#393840","#765658","#aa7e77","#6f2832"]],
    ["BV1UKpx6CEED","【UI交互动画】好的UI交互动画，能让界面“会说话”",48,"prompt","窄输入胶囊与紫青发光曲线共用一个颜色过渡。","cover",["#2a3749","#81c2d6","#713f7c","#1d0f23"]],
    ["BV1Akpb62EyV","【UI交互动画】直接用动效说话：把软件功能讲透的演示方案",15,"icons","紫色手机主按钮占据底部宽度，动作与正文分开。","cover",["#12022f","#370965","#9c6cc1","#f1dff9"]],
    ["BV1SFpG63Ev4","【UI交互动画】这种层级分明的UI动态演示，视觉逻辑给满分！",46,"tiles","薰衣草底上的搜索条分层堆起，展开后显示联系人详情。","frames",["#eae5f1","#cbc8eb","#a681e2"]],
    ["BV1Xrpj6ZEnT","【UI交互动画】除了好看，UI交互动画更重要的功能是“解释”",20,"glass","蓝色列表卡以透视层叠，再切回正面的深色工作板。","frames",["#254f77","#356492","#5495c6","#08071d"]],
    ["BV1W1pJ6XEKi","【UI交互动画】SaaS复杂后台系统，做成动效居然这么美",19,"prompt","对话由窄蓝色窗口承载，头像和提问摘要纵向排列。","frames",["#0a093d","#15157b","#182aa4","#5de7fa"]],
    ["BV1uVpX69EHo","【UI交互动画】高水准UI交互设计，让前端动效更丝滑✨",22,"data","浅色仪表板用薄荷色线形呈现单个突出峰值。","frames",["#d4d4d4","#eef8f6","#a2a5a6","#bce8e3"]],
    ["BV18ZpR6aENY","【UI交互动画】高水准UI交互设计，让前端动效更丝滑✨",26,"caption","深紫数字背景上叠白色大词，轮廓文字仍保留层级。","frames",["#030112","#252139"]],
    ["BV1h8WA6XEjn","【UI交互动画】这种UI质感，才是商业动画该有的样子",17,"data","深色列表、荧光黄面板和超大信任人数共同强调数字。","frames",["#373b29","#101011","#9d9d20","#666627"]],
    ["BV1U3pz6mEnU","【UI交互动画】这种丝滑交互，才是B端产品的正确打开方式⚙️",45,"voice","音视频编辑时间轴将声波、片段和预览层纵向对齐。","cover",["#e6f1fa","#cddbe8","#4875cc","#aebad2"]],
    ["BV1CDpy6xEki","【UI交互动画】让数据“活”起来！SaaS后台动态展示模版📈",48,"flow","前一块工具面板以水平连线接到后一块，形成明确阅读方向。","frames",["#f3eaf4","#eccfd7","#181c17","#380509"]],
    ["BV168JC6gEGB","【UI交互动画】降维打击！用UI动效直接拉开竞争对手差距📈",47,"caption","高饱和立体物与超大无衬线字相互穿插，字形也成为画面元素。","frames",["#3ca6f4","#6cb6f0","#7f4678","#ebe3ec"]],
    ["BV19EJQ6SEFh","【UI交互动画】让数据“活”起来！SaaS后台动态展示模版📈",15,"data","浅蓝手机信息页在一排小卡上并列显示三组百分比。","cover",["#95c3f6","#b7d7f5","#7b9cc1"]],
    ["BV1jkJe63Ejn","【UI交互动画】科技风动画天花板？这质感谁看谁不迷糊🚀",25,"caption","人物影像采用浅色叠字，行距和位置保证句子连贯。","cover",["#222b31","#3683b0","#131313","#557f90"]],
    ["BV1HZn36REkc","【UI交互动画】这种呼吸感UI动效，越看越上头",25,"data","大额数字与一条渐绿的上升曲线并排，图卡保留大量留白。","cover",["#f0f4f7","#c3cbca"]],
    ["BV1wznG6oEBX","【UI交互动画】提升海外客户信任度，从国际化UI动效开始🚀",44,"data","浅色桌面概览用几组大读数与稀疏小图表示优先级。","cover",["#f2f3f9","#d4d8e7"]],
    ["BV1z5nE6MEC2","【UI交互动画】功能多到眼花缭乱，用视觉引导降低理解成本",35,"tiles","人才库在深色网格中放大头像卡，亮边框标出当前区域。","frames",["#261b2a","#0e0914","#77646c"]],
    ["BV1B9J96eE84","【UI交互动画】软件宣传没亮点，沉浸式交互提升逼格🎬",22,"progress","内容卡收起后出现绿色勾号，用简短动作收束结果。","frames",["#0b140b","#585e55"]],
    ["BV1qMnv6jEmb","【UI交互动画】你的APP宣传片，可能缺少这一层“动效逻辑”",12,"flow","不同国家的图标分布在绿色同心轨迹上，强调跨地域连接。","cover",["#0d2b03","#42592a","#637a57","#c0d3ba"]],
    ["BV1xDn16tEXY","【UI交互动画】好的产品演示，应该让人一眼想继续看",35,"caption","大面积绿色场里用一个荧光小词引出浅色问句。","frames",["#f8fff1","#166008","#2f8b09","#07240e"]],
    ["BV1oPnH6rE91","【UI交互动画】复杂的系统逻辑，这样呈现一眼就能看懂🎬",35,"data","暗面板用水平滑杆控制数值，亮色指示当前倍率。","frames",["#0c0c14","#484f65"]],
    ["BV1Jhn46bEAJ","【UI交互动画】概念级APP宣传片，带UI交互的视觉风暴",24,"prompt","提示指令过渡到整理好的亮色表格，表格尾部保留状态提示。","frames",["#13152a","#16245e","#efecfe","#a8aecb"]],
    ["BV1bjHA6yEqV","【UI交互动画】把产品亮点视觉化，动态UI呈现满分科技感✨",21,"glass","蓝紫透明组件与图像结果片并列悬浮，亮边界保留层次。","frames",["#180360","#040819","#16425c","#7280b8"]],
    ["BV1uVHG6BEPm","【UI交互动画】商业动画的进阶：让你的UI交互“会说话”",22,"prompt","深色输入条横跨图片素材，提交按钮以紫色强调。","cover",["#ffaf71","#191b1b","#73707a","#653842"]],
    ["BV1NBnU6PEdf","【UI交互动画】别让你的SaaS产品，输在演示视频的质感上",30,"icons","工具集合以统一蓝色胶囊排列，不同符号区分动作。","frames",["#d1d7dc","#66bbef","#42aaf2","#f1f3f5"]],
    ["BV14PnR6DEoP","【UI交互动画】UI动画做对了，产品气质真的会变",28,"flow","光点按主题聚合成三组，随后连接到处理结果。","frames",["#0d0d31","#323b5a"]],
    ["BV1V2xN6qEJr","【UI交互动画】复杂系统难讲清，微交互让核心功能秒懂💻",32,"flow","工作空间位于中央，周边散布多个功能名作为入口。","cover",["#5f4020","#dad0b7","#e9ce78","#e7e1d4"]],
    ["BV1u9xj6aEoY","【UI交互动画】让产品亮点一目了然，演示效果提升明显✨",32,"progress","多色同心圆逐层包围同步提示，中间留出清晰读字区。","cover",["#eef0f4","#7295ed","#f39b4d","#e63dc8"]],
    ["BV1CysX6JEMt","【UI交互动画】这动效绝了！UI设计与动画结合的极致体验",35,"tiles","深绿卡列中一块图文面板点亮，其他轮廓留在暗部。","cover",["#02170b","#11432c","#346a4e"]],
    ["BV1Mwsf6VEDa","【UI交互动画】炫酷UI交互，让你的APP更有吸引力🔥",43,"glass","淡绿色雾状底纹中浮出半透明短标签，依靠明暗区分轮廓。","cover",["#9dbbab","#d7e5de","#c5c9c6"]],
    ["BV1bKxc6EEzB","【UI交互动画】沉浸式UI交互体验：视觉与功能的完美融合",14,"tiles","分散标签收束成一张日历板，空间关系由松散转为网格。","frames",["#090817","#d9dfec","#595c6c"]],
    ["BV1nHxY6tE5s","【UI交互动画】这种呼吸感UI动效，越看越上头",24,"tiles","小型素材按区块组合成画板，随后出现在设备屏幕里。","frames",["#ecdfd6","#2c3235","#100f1c","#969f99"]],
    ["BV1Nxxr6oEQi","【UI交互动画】UI设计+AE动效，你的产品需要一套视觉加分项",50,"glass","明亮风景后方透出暖光，前景窗口用浅色表面分开文字。","cover",["#0d140d","#615f34","#7b6450","#353e21"]],
    ["BV16mxs6qEbd","【UI交互动画】适合B端企业的展示，让软件动效更有质感✨",20,"tiles","单张手机页面将旅行照片分组，可按位置辨认主次。","frames",["#b1afa1","#d4dbe1","#666561","#f6f4f2"]],
    ["BV1MZxt6tEcX","【UI交互动画】这类UI动画，很适合拿去做产品宣传片",25,"progress","步数以横条和七日勾选标记一起表达累计目标。","cover",["#49212b","#141414","#744a56","#d0cccd"]],
    ["BV1JV4c6qEim","【UI交互动画】AI新产品发布，靠这套交互动画拉满科技感🚀",14,"glass","粉紫光场退到背后，前景的功能卡沿一条基线显现。","frames",["#97546c","#ad6a49","#60354d","#835e8c"]],
    ["BV177xS6NEHc","【UI交互动画】功能多到眼花缭乱，用视觉引导降低理解成本",36,"icons","手机外侧悬浮设备工具栏，返回与分享图标归于同一组。","frames",["#2c2c2f","#a49ae9","#efedf8","#d2ccee"]],
    ["BV14T4t6xEgT","【UI交互动画】UI交互动画做得好，客户理解更快",20,"data","紫蓝仪表板把面积走势、开关和统计数字组合成多层读数。","frames",["#030015","#3b1c73","#130239"]],
    ["BV16R4v6iEPq","【UI交互动画】让客户秒懂功能！高质感界面演示方案",45,"prompt","手机底部输入动作与右侧问答文本连接，随后显示反馈工具。","frames",["#c3e9fa","#eeebef","#8a8b96"]],
    ["BV1F24J6oErz","【UI交互动画】科技品牌出海必备：国际范儿的界面展示动效",31,"icons","连续图标嵌入文字行内，紫蓝底色统一连续选项。","cover",["#9ca7f2","#c6c9f4","#8487ec","#7965be"]],
    ["BV1mDWn6wEPo","【UI交互动画】复杂系统难讲清，微交互让核心功能秒懂💻",21,"voice","麦克风标记和亮绿色按钮沿同一条深色输入栏排列。","cover",["#132815","#03af5e","#0f542b"]],
    ["BV1EBW46vEj6","【UI交互动画】超丝滑UI交互动效，大厂级顶级审美✨",36,"voice","低保真音乐提示采用窄长胶囊，环状渐变围绕播放信息。","cover",["#4b3977","#62315f","#964f6f","#251434"]],
    ["BV1HiWb6yEA1","【UI交互动画】这就是专业！30秒沉浸式感受科技交互美学🔮",44,"caption","超大重复文字出现不同字重，随后转入多层素材网格。","frames",["#061e76","#050831","#e1ddd2","#7c858f"]],
    ["BV1A9WT6XE7x","【UI交互动画】这就是商业动画的力量，让界面演示会说话",25,"flow","深色地图用橙色里程标记把路线串联起来。","frames",["#ee4a03","#2b0705","#e65f22","#702a12"]],
    ["BV1KwWj6JEZm","【UI交互动画】做APP宣传片吗？试试这种“高级感”交互动画",22,"data","锁屏上的金额通知与绿色进度条重叠，读数优先于背景。","cover",["#081b0a","#1c351b","#53381c","#547e5a"]],
    ["BV16cW96yEzS","【UI交互动画】科技品牌出海必备：国际范儿的界面展示动效",15,"icons","小日历图标位于连接器标题之间，用单个符号说明关联工具。","frames",["#1a101b","#3c333e","#57565c"]],
    ["BV18bWv6CEC4","【UI交互动画】提升数字化产品质感，用高精UI微动效搞定✨",49,"caption","风景影像上叠一行白色短句，将产品承诺置于地平线附近。","cover",["#779b33","#97b6c3","#24501b","#55782b"]],
    ["BV1AjWC6XEAw","【UI交互动画】超丝滑UI交互动效，大厂级顶级审美✨",21,"caption","深绿背景上的动作词与指针图形轮换，保持简洁节奏。","frames",["#0e1917","#2a5e61","#2e4240","#0f3132"]],
    ["BV1nZsw6BEhw","【UI交互动画】好的UI交互动画，能让界面“会说话”",32,"caption","等宽索引的序号、标题与时间共线，再转到字母表展示。","frames",["#f9f1ee","#9c9492","#e2dad6","#beb6b3"]],
    ["BV1hgsg6CETM","【UI交互动画】这段动效，让软件界面瞬间拥有了生命力",45,"data","同一张卡中用彩色长条拉开三个指标的量级。","frames",["#fcf2fd","#87997f","#e2ddd8"]],
    ["BV1H3s16fE5x","【UI交互动画】软件演示的最高境界：沉浸式视觉体验🎬",23,"prompt","语句在代码面板逐行显示，绿色按钮承担执行动作。","frames",["#141414","#263e32","#3b684f"]],
    ["BV1pqsU6zEi3","【UI交互动画】B端系统难演示，用高精动效凸显产品实力✨",26,"prompt","森林画面上的提示词输入与最后的蓝色发布按钮前后呼应。","frames",["#091226","#183a5a","#3d1168","#1b2041"]],
    ["BV14Rsb6xEhQ","【UI交互动画】复杂系统变清晰，动态演示为产品加分📈",20,"tiles","一排墨绿文字卡等距排列，小型预览提示当前卡片组。","cover",["#dceaf2","#7fbdf8","#156358","#88a8da"]],
    ["BV1QZsq6sEi7","【UI交互动画】这才是大厂级别的UI展示，质感直接拉满了！",31,"data","明橙拼贴里并置百分比、柱图和仪表，分区管理密度。","frames",["#0a0911","#fcf5f2","#b67c69","#954e3a"]],
    ["BV192yVzWEju","【UI交互动画】打破静态界面沉闷，流畅微交互自带高级感✨",47,"flow","多块彩色面板之后，以连线把两个产品界面接到一起。","frames",["#f3eaf4","#eccfd7","#181c17","#380509"]],
  ];
  const sources=records.map(([bv,title,duration,kind,summary,basis,colors],i)=>({bv,title,duration,kind,summary,basis,colors,author,position:i+1,demo:'season-'+kind}));
  const byBV=new Map(sources.map(entry=>[entry.bv,entry]));
  const items=[{id:'season-gallery',title:'UI 交互动画片目',en:'Interaction film index',group:'studies',keywords:['合集','交互动画','作品','目录','色票'],summary:'按视觉特征查阅全合集。从每项的画面观察与采样色进入对应的原创动效练习。',source:'season'}];
  for(const [kind,[title,en,summary]] of Object.entries(families)){
    const refs=sources.filter(s=>s.kind===kind).map(s=>s.bv);
    items.push({id:'season-'+kind,title,en,summary,group:'motion',source:refs[0],sources:refs,keywords:['UI交互动画','合集',title,kind]});
  }
  const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
  const ease=t=>t*t*(3-2*t);
  function card(c,x,y,w,h,r,color){c.fillStyle=color;c.beginPath();c.roundRect(x,y,w,h,r);c.fill();}
  function dot(c,x,y,r,fill){c.fillStyle=fill;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill();}
  function type(c,str,x,y,size,color,weight=520,face='sans-serif'){
    c.font=weight+' '+size+'px '+face;c.fillStyle=color;c.fillText(str,x,y);
  }
  function stroke(c,pts,color,width=2){c.beginPath();pts.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));c.strokeStyle=color;c.lineWidth=width;c.stroke();}
  function gradient(c,x,y,end,stops){const g=c.createLinearGradient(x,y,x+end,y+end*.35);stops.forEach(([n,col])=>g.addColorStop(n,col));return g;}
  const textColor='#f6f7ee',quiet='#ced5d1',dark='#1c2330';
  function glyph(c,k,x,y,sz,color){
    c.save();c.translate(x,y);c.scale(sz,sz);c.strokeStyle=color;c.lineWidth=.1;c.lineJoin='round';c.lineCap='round';c.beginPath();
    if(k===0){c.moveTo(-.6,-.47);c.lineTo(.62,-.47);c.lineTo(.62,.48);c.lineTo(-.56,.48);c.closePath();c.moveTo(-.55,-.14);c.lineTo(.62,-.14);}
    if(k===1){for(let i=0;i<3;i++){c.moveTo(-.4+i*.4,.5);c.lineTo(-.4+i*.4,[0,-.52,-.22][i]);}}
    if(k===2){c.arc(-.1,-.09,.43,0,2*Math.PI);c.moveTo(.22,.23);c.lineTo(.61,.62);}
    if(k===3){c.moveTo(-.65,.03);c.lineTo(-.28,.43);c.lineTo(.63,-.45);}
    if(k===4){c.moveTo(-.61,.44);c.lineTo(.61,-.48);c.lineTo(.44,.6);c.lineTo(.11,.23);c.closePath();}
    c.stroke();c.restore();
  }
  function promptFrame(c,t,a,value){
    const text=value||'把这组资料整理成词卡'; const reveal=clamp(t/.48);
    card(c,65,72,510,81,18,'#111520');card(c,86,98,4,23,2,a);
    type(c,text.slice(0,Math.ceil(text.length*reveal)),102,119,21,textColor);
    card(c,517,92,36,36,18,a);glyph(c,4,535,110,15,dark);
    c.save();c.globalAlpha=clamp((t-.40)*4);const dy=(1-c.globalAlpha)*20;
    card(c,119,171+dy,401,72,15,'#ffffffea');type(c,'整理结果',142,198+dy,17,dark,700);
    type(c,t>.76?'已生成 3 张可复习词卡':'正在整理关键词…',142,223+dy,15,'#576472');c.restore();
  }
  function dataFrame(c,t,a){
    card(c,60,38,520,218,18,'#121d28');type(c,'本周复习量',84,73,17,quiet);
    const values=[26,42,39,66,54,71,62,89,75,95,85,103],x0=88,y0=231,w=460;
    const pts=values.map((v,i)=>[x0+w*i/(values.length-1),y0-v*.96]);
    for(let i=0;i<4;i++)stroke(c,[[x0,y0-i*32],[548,y0-i*32]],'#ffffff20',1);
    c.beginPath();c.moveTo(x0,y0);pts.forEach(([x,y])=>c.lineTo(x,y));c.lineTo(548,y0);c.closePath();c.fillStyle=gradient(c,0,100,180,[[0,a+'52'],[1,a+'05']]);c.fill();
    stroke(c,pts,a,3.4);
    const sample=t*(values.length-1),i=Math.min(values.length-2,Math.floor(sample)),v=values[i]+(values[i+1]-values[i])*(sample-i),x=x0+w*t,y=y0-v*.96;
    stroke(c,[[x,113],[x,y0]],quiet,1);dot(c,x,y,7,a);dot(c,x,y,3,dark);
    type(c,String(Math.round(v)),84,113,39,textColor,700);type(c,'次',158,110,14,quiet);
  }
  function flowFrame(c,t,a){
    const nodes=[[95,150,'词条'],[267,150,'分类'],[450,85,'复习'],[450,217,'收藏']];
    stroke(c,[[95,150],[267,150],[354,150],[354,85],[450,85],[550,85]],'#ffffff60');
    stroke(c,[[354,150],[354,217],[450,217]],'#ffffff60');
    const path=[[95,150],[267,150],[354,150],[354,85],[450,85],[550,85]];let length=0;
    const dist=path.slice(1).map(([x,y],i)=>{const v=Math.hypot(x-path[i][0],y-path[i][1]);length+=v;return v;});
    let rem=t*length;const lit=[path[0]];let pos=path[0];
    dist.some((len,i)=>{const k=Math.min(1,rem/len);pos=path[i].map((v,j)=>v+(path[i+1][j]-v)*k);lit.push(pos);rem-=len;return rem<=0;});
    stroke(c,lit,a,4);
    nodes.forEach(([x,y,label],i)=>{card(c,x-34,y-21,68,42,10,i===0||t>.36&&i===1||t>.78&&i===2?a:'#394756');type(c,label,x-17,y+6,16,i===0||t>.36&&i===1||t>.78&&i===2?dark:textColor,700);});
    dot(c,pos[0],pos[1],7,'#fff');dot(c,pos[0],pos[1],3,a);
  }
  function tilesFrame(c,t,a){
    const labels=['采集','整理','练习','回顾','归档'],focus=t*4;
    labels.map((label,i)=>({label,i,d:i-focus})).sort((p,q)=>Math.abs(q.d)-Math.abs(p.d)).forEach(({label,i,d})=>{
      if(Math.abs(d)>2.4)return;
      const scale=1-Math.min(Math.abs(d)*.15,.32),x=320+Math.tanh(d*.73)*213,y=137+Math.min(2,Math.abs(d))*12;
      c.save();c.translate(x,y);c.scale(scale,scale);c.rotate(.055*d);
      card(c,-84,-87,168,176,15,['#cbeccc','#e1c5f2','#f7dfac','#bdddee','#e5c1ba'][i]);card(c,-68,-70,136,76,8,dark);
      dot(c,-15,-32,21,a);stroke(c,[[-40,-12],[6,-55],[43,-22]],'#fff',2.8);
      type(c,label,-64,43,22,dark,700);type(c,'FIELD NOTES  /  0'+(i+1),-64,67,11,'#465158',600,'monospace');c.restore();
    });
  }
  function captionFrame(c,t,a){
    const words=['让文字','带动视线'];const p=[clamp(t*2.6),clamp((t-.3)*2)];
    words.forEach((s,i)=>{const y=58+i*88;c.save();c.beginPath();c.rect(62,y,518,80);c.clip();type(c,s,70,y+64+83*(1-ease(p[i])),60,i?a:textColor,850);c.restore();});
    card(c,72,245,494,2,1,'#ffffff46');card(c,72,243,Math.max(2,494*t),5,2,a);
  }
  function glassFrame(c,t,a){
    const field=glassFrame.field || (glassFrame.field=document.createElement('canvas')); if(field.width!==640){field.width=640;field.height=290;}
    const g=field.getContext('2d');g.fillStyle=gradient(g,0,0,610,[[0,'#827fb9'],[.46,a],[1,'#2e7089']]);g.fillRect(0,0,640,290);
    for(let j=0;j<7;j++){g.beginPath();g.ellipse(80+j*75,175,104,198,-.48,0,7);g.strokeStyle=j%2?'#efe9b5':'#f9f8f0';g.lineWidth=5;g.stroke();}
    c.drawImage(field,0,0); const x=129+48*t,y=48-14*t,w=325,h=172;
    card(c,x+27*t,y+40*t,w,h,17,'#142f4568');
    c.save();c.beginPath();c.roundRect(x,y,w,h,16);c.clip();c.filter='blur('+(1+8*t)+'px)';c.drawImage(field,0,0);c.filter='none';c.fillStyle='#eff8fc96';c.fillRect(x,y,w,h);c.restore();
    c.strokeStyle='#ffffffcc';c.lineWidth=2;c.beginPath();c.roundRect(x,y,w,h,16);c.stroke();
    type(c,'阅读清单',x+23,y+46,26,dark,750);[161,213,125].forEach((len,i)=>card(c,x+24,y+69+i*23,len,6,3,'#2034459c'));
  }
  function voiceFrame(c,t,a){
    card(c,63,67,514,149,28,'#171622');type(c,'语音笔记',87,104,19,textColor,700);type(c,'00:'+String(Math.floor(t*24)).padStart(2,'0')+' / 00:24',421,102,13,quiet,500,'monospace');
    for(let i=0;i<63;i++){const x=87+i*7.6,h=(.26+.74*Math.abs(Math.sin(i*1.19)+Math.cos(i*.59))*.5)*(8+42*Math.sin(Math.PI*i/64));card(c,x,155-h,4.6,2*h,2.2,i<=t*62?a:'#ffffff4b');}stroke(c,[[87+t*471,116],[87+t*471,199]],textColor,1.4);
  }
  function progressFrame(c,t,a){
    const x=245,y=135;c.strokeStyle='#ffffff30';c.lineWidth=12;c.beginPath();c.arc(x,y,58,0,Math.PI*2);c.stroke();c.strokeStyle=a;c.lineCap='round';c.beginPath();c.arc(x,y,58,-Math.PI/2,-Math.PI/2+Math.PI*2*t);c.stroke();c.lineCap='butt';
    if(t>=.996)glyph(c,3,x,y,42,a);else{c.textAlign='center';type(c,Math.round(t*100)+'%',x,y+9,28,textColor,800);c.textAlign='start';}
    type(c,t<=0?'等待开始':t<.996?'同步中':'已完成',330,130,30,textColor,760);type(c,'今日学习记录',333,159,16,quiet);
    for(let i=0;i<7;i++){card(c,161+i*46,231,37,10,5,(i+1)/7<=t?a:'#ffffff3a');}
  }
  function iconsFrame(c,t,a){
    const names=['资料','统计','查找','复习','发送'],focus=t*4,centers=[];
    const sizes=names.map((_,i)=>50+25*Math.exp(-((i-focus)**2)*2));const total=sizes.reduce((x,y)=>x+y,0)+4*13;let x=(640-total)/2;
    card(c,x-20,100,total+40,94,24,'#171e2be6');
    names.forEach((name,i)=>{const w=sizes[i],active=Math.abs(i-focus)<=.5,y=152-w/2-8*Math.exp(-((i-focus)**2)*2);
      card(c,x,y,w,w,13,active?a:'#414d64');glyph(c,i,x+w/2,y+w/2,w*.4,active?dark:textColor);centers.push(x+w/2);x+=w+13;});
    const idx=Math.round(focus);c.textAlign='center';type(c,names[idx],centers[idx],224,18,textColor);c.textAlign='left';
  }
  const painters={prompt:promptFrame,data:dataFrame,flow:flowFrame,tiles:tilesFrame,caption:captionFrame,glass:glassFrame,voice:voiceFrame,progress:progressFrame,icons:iconsFrame};
  function draw(canvas,kind,t,value){
    const c=canvas.getContext('2d'),[, , , , ,bg,a]=families[kind];
    c.setTransform(canvas.width/640,0,0,canvas.height/290,0,0);
    c.save();c.fillStyle=gradient(c,0,0,650,[[0,bg],[1,'#111720']]);c.fillRect(0,0,640,290);
    c.strokeStyle='#ffffff0a';c.lineWidth=1;
    for(let x=0;x<640;x+=32)stroke(c,[[x,0],[x,290]],'#ffffff08',.8);
    for(let y=0;y<290;y+=32)stroke(c,[[0,y],[640,y]],'#ffffff08',.8);
    painters[kind](c,t,a,value);c.restore();
  }
  function stage(host,kind){
    const spec=families[kind],root=document.createElement('div');root.className='se-stage';
    root.innerHTML='<canvas role="img"></canvas><div class="se-player"><div class="se-prompt" hidden><label>提示文字 <input maxlength="22" value="把这组资料整理成词卡"></label></div><div class="se-track"><label><span></span><input type="range" min="0" max="100" step="1"></label><output></output></div><div class="se-actions"><button type="button" data-play></button><button type="button" data-reset>回到起点</button></div></div>';
    host.replaceChildren(root);const canvas=root.querySelector('canvas');canvas.width=960;canvas.height=435;canvas.setAttribute('aria-label',spec[0]);
    let frame=0,resumable=false,t=kind==='progress'?.42:kind==='caption'?.8:kind==='prompt'?.65:.45,last=0;
    const range=root.querySelector('[type=range]'),output=root.querySelector('output'),play=root.querySelector('[data-play]'),input=root.querySelector('.se-prompt input');
    root.querySelector('.se-track span').textContent=spec[4];if(kind==='prompt')root.querySelector('.se-prompt').hidden=false;
    function paint(){draw(canvas,kind,t,input.value);range.value=Math.round(t*100);output.value=range.value+'%';play.textContent=frame?'暂停':resumable?'继续':spec[3];}
    function stop(){if(frame)cancelAnimationFrame(frame);frame=0;last=0;}
    function tick(now){if(last)t=clamp(t+(now-last)/3100);last=now;frame=t===1?0:requestAnimationFrame(tick);paint();}
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)');
    play.onclick=()=>{if(frame){stop();resumable=true;}else if(motion.matches){t=t>.99?0:clamp(t+.25);}else{if(!resumable)t=0;resumable=false;last=0;frame=requestAnimationFrame(tick);}paint();};
    root.querySelector('[data-reset]').onclick=()=>{stop();resumable=false;t=0;paint();};range.oninput=()=>{stop();t=Number(range.value)/100;resumable=t>0&&t<1;paint();};
    input.oninput=()=>{stop();resumable=false;t=.58;paint();};paint();return stop;
  }
  function thumb(id,host){
    const kind=id==='season-gallery'?'tiles':id.slice(7);if(!families[kind])return;
    const canvas=document.createElement('canvas');canvas.width=420;canvas.height=190;canvas.className='se-thumb';canvas.setAttribute('aria-hidden','true');draw(canvas,kind,kind==='caption'?.86:.58);host.replaceChildren(canvas);
  }
  const clean=title=>title.replace(/^【UI交互动画】\s*/,'');
  function gallery(host,variant){
    const root=document.createElement('div');root.className='se-gallery';
    root.innerHTML='<div class="se-film"><div class="se-kicker"></div><h2 class="se-name"></h2><p class="se-note"></p><div class="se-comp"></div><div class="se-swatches"></div><p class="se-basis"></p><div class="se-film-links"><a class="se-ref" target="_blank" rel="noopener noreferrer">看原片 ↗</a><a class="se-demo"></a></div><details class="se-mini"><summary>在这里试一试</summary><div class="se-mini-host"></div></details></div><section class="se-library"><h3>查找片目</h3><div class="se-search"><label>搜索片名、观察或 BV<input type="search" placeholder="例如：波形、渐变、窗口"></label><label>视觉特征<select></select></label></div><p class="se-count" role="status"></p><ol class="se-list"></ol><nav class="se-pages" aria-label="片目翻页"><button type="button" data-page="-1">上一页</button><span></span><button type="button" data-page="1">下一页</button></nav></section>';
    host.replaceChildren(root);
    const q=s=>root.querySelector(s),input=q('input'),filter=q('select'),count=q('.se-count'),list=q('ol'),pageLabel=q('.se-pages span'),mini=q('.se-mini');
    filter.add(new Option('全部特征',''));Object.entries(families).forEach(([key,fam])=>filter.add(new Option(fam[0],key)));
    let current=byBV.get(variant)||sources[0],page=Math.floor((current.position-1)/8),dispose=null;
    function selected(updateURL){
      if(dispose){dispose();dispose=null;} q('.se-mini-host').replaceChildren();
      q('.se-kicker').textContent='UI 交互动画  /  '+String(current.position).padStart(3,'0')+'  /  '+sources.length+'　·　'+current.duration+' 秒';
      q('.se-name').textContent=clean(current.title);q('.se-note').textContent=current.summary;
      const sw=q('.se-swatches');sw.replaceChildren();current.colors.forEach(hex=>{const el=document.createElement('span'),chip=document.createElement('i');chip.style.background=hex;el.append(chip,document.createTextNode(hex.toUpperCase()));sw.append(el);});
      q('.se-basis').textContent=(current.basis==='frames'?'观察依据为原片时间轴预览帧':'观察依据为作者上传的原片封面')+'。色票取自对应图像。';
      const composition=q('.se-comp');composition.replaceChildren();window.AtlasComposition?.mount(composition,current.bv);
      q('.se-ref').href='https://www.bilibili.com/video/'+current.bv+'/';q('.se-demo').href='#sample/'+current.demo;q('.se-demo').textContent='打开「'+families[current.kind][0]+'」';
      if(mini.open)dispose=stage(q('.se-mini-host'),current.kind);
      if(updateURL)try{history.replaceState(history.state,'','#sample/season-gallery/'+current.bv);}catch{location.hash='sample/season-gallery/'+current.bv;}
    }
    mini.ontoggle=()=>{if(dispose){dispose();dispose=null;}if(mini.open)dispose=stage(q('.se-mini-host'),current.kind);};
    function results(){
      const term=input.value.trim().toLowerCase();const found=sources.filter(s=>(!filter.value||filter.value===s.kind)&&(!term||[s.bv,s.title,s.summary,String(s.position),families[s.kind][0]].join(' ').toLowerCase().includes(term)));
      const pages=Math.max(1,Math.ceil(found.length/8));page=Math.min(Math.max(page,0),pages-1);
      list.replaceChildren();for(const s of found.slice(page*8,page*8+8)){
        const li=document.createElement('li'),a=document.createElement('a');a.href='#sample/season-gallery/'+s.bv;
        a.innerHTML='<small></small><span></span><i></i>';a.querySelector('small').textContent=String(s.position).padStart(3,'0');a.querySelector('span').textContent=clean(s.title);a.querySelector('i').textContent=families[s.kind][0];
        if(s===current)a.setAttribute('aria-current','true');
        a.onclick=e=>{if(e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;e.preventDefault();current=s;selected(true);results();q('.se-film').scrollIntoView({block:'start'});q('.se-name').tabIndex=-1;q('.se-name').focus({preventScroll:true});};li.append(a);list.append(li);
      }
      count.textContent=found.length?'找到 '+found.length+' 条，当前显示 '+(page*8+1)+'–'+Math.min(found.length,(page+1)*8)+' 条。':'没有匹配项，请更换关键词或筛选。';pageLabel.textContent=(page+1)+' / '+pages;
      q('[data-page="-1"]').disabled=page===0;q('[data-page="1"]').disabled=page===pages-1;
    }
    input.oninput=filter.onchange=()=>{page=0;results();};
    root.querySelectorAll('[data-page]').forEach(b=>b.onclick=()=>{page+=Number(b.dataset.page);results();});
    selected(false);results();return ()=>{mini.ontoggle=null;if(dispose)dispose();};
  }
  function render(id,host,variant){
    if(id==='season-gallery')return gallery(host,variant);
    const kind=id.slice(7);if(!families[kind])return;
    const root=document.createElement('div');root.className='se-sample';
    const player=document.createElement('div');root.append(player);host.replaceChildren(root);const dispose=stage(player,kind);
    const refs=sources.filter(s=>s.kind===kind);const details=document.createElement('details');details.className='se-refs';
    const summary=document.createElement('summary');summary.textContent='在合集中查看同类片目（'+refs.length+'）';details.append(summary);
    const list=document.createElement('ul');refs.forEach(s=>{const li=document.createElement('li'),a=document.createElement('a');a.textContent=String(s.position).padStart(3,'0')+' · '+clean(s.title);a.href='#sample/season-gallery/'+s.bv;li.append(a);list.append(li);});details.append(list);root.append(details);return dispose;
  }
  window.AtlasSeason={items,sources,render,thumb};
})();
