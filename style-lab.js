(() => {
  'use strict';

  // Each recipe specifies the interface surface and the geometry separately.
  // The five colors, in order, are ground, plane, text, primary ink and secondary ink.
  const recipes = [
    ['brutalist','新粗野主义','Neo-Brutalism','hard','blocks','f5f3ee ffffff 111111 222222 b8b5a7','框线像印刷裁切线，偏移的硬阴影标出纸块的厚度。'],
    ['swiss','瑞士风格','Swiss Style','grid','grid','fafaf9 ffffff 191919 191919 777d83','靠共同的列线和不对称面积，让信息自然分出主次。'],
    ['japanese','日系编辑美学','Japanese Editorial','editorial','contour','f1f0ea faf9f4 2c2b28 dfff00 777b62','留白与细栏线保持安静，一条荧光黄划线提起标题。'],
    ['terminal','终端 / CLI 美学','Terminal / CLI Aesthetic','terminal','signal','0d0f0e 191e1a d9e0d4 dfff00 4ec97a','字与线像终端字符，明亮的状态色集中在读数上。'],
    ['glass','玻璃拟态','Glassmorphism','glass','sheets','0a0e27 252b52 f2f4ff dfff00 2454ff','让彩色物件穿过模糊的透明面板，重叠处改变颜色。'],
    ['voxel','体素美学','Voxel Aesthetic','pixel','voxel','748749 d2bc89 182519 76502d 426b85','三向色面拼成立体方块，阶梯轮廓保留像素感。'],
    ['neo','新拟物化','Neumorphism','soft','dial','e0e5ec e0e5ec 324556 566d80 9baebd','底板和控件用同色，以一明一暗的软影刻出起伏。'],
    ['win95','复古 Win95','Retro Windows 95','win','window','008080 c0c0c0 121212 000080 008080','青绿桌面上叠银灰窗口，蓝色标题条和立体方边还原老系统。'],
    ['organic','有机自然','Biophilic Design','organic','leaf','f3f0e8 fdfbf5 443f31 607d50 b9ca9b','叶形、奶油纸底和草木色，把阅读内容放在柔和的空间里。'],
    ['hyper','3D 超写实','3D & Hyperrealism','studio','cube','0f0f1a 1a2040 e2e8f7 6382ff abb8d8','明面、背光面和落地投影共同描述实体的体积。'],
    ['vibrant','鲜艳块状','Vibrant & Block-based','hard','blocks','ffffff ffffff 161616 ff6b6b ffd93d','大色块承担信息分区，粗边缘和硬阴影让颜色保持独立。'],
    ['oled','OLED 暗黑','Dark Mode (OLED)','oled','signal','000000 0a0a0a ffffff ffffff 939393','以真黑作底，保留走线和读数的亮度，将注意力留给信号。'],
    ['accessible','无障碍伦理','Accessible & Ethical','access','target','ffffff f5f5f5 111111 0055cc 222222','用清晰文字、边框和显著焦点表达状态；可用键盘操作。'],
    ['clay','黏土风','Claymorphism','clay','pebbles','f0c9a0 ecc39a 412b1e aa704c f5d9b9','大圆角、厚边缘和柔和内阴影让元件像捏出的黏土。'],
    ['aurora','极光界面','Aurora UI','aurora','sheets','0a0f1e 172940 e4f3f5 24c3a5 ae96ff','青绿和紫色的光晕在暗场交融，面板留出稳定的阅读层。'],
    ['retro','复古未来','Retro-Futurism','synth','sun','1a0a2e 2c1647 f5e1ff ff6b9d a087ee','低地平线、条纹夕阳与紫红余辉形成复古科幻景深。'],
    ['flat','扁平设计','Flat Design','flat','blocks','f0f4f8 ffffff 202d39 287bc2 f5a731','用平涂、简单几何和紧凑间距区分形状。'],
    ['liquid','液态玻璃','Liquid Glass','liquid','lens','16162c 252849 eff2ff a5c8ff b9a6ff','透亮弧面上有连续高光，变化时可观察光斑与折射边缘错位。'],
    ['motion','动效驱动','Motion-Driven','motion','layers','111111 242426 f3f1ef ff6b6b f2d1a5','前、中、后三层以不同节拍到位，次序构成叙事。'],
    ['micro','微交互','Micro-interactions','micro','switches','fafafa ffffff 343943 5263a8 8ac8a8','切换动作马上改变开关位置和选中标记，为操作提供确认。'],
    ['inclusive','包容性设计','Inclusive Design','access','target','fefefe ffffff 1a3650 1655a7 64877a','同时用勾、位置和文字传递当前状态，颜色只承担部分提示。'],
    ['zero','零界面','Zero Interface','quiet','voice','ffffff fafafa 212121 323232 bfc6bd','只保留当前需要的提示与波形，操作后才显露下一层。'],
    ['soft','柔和 UI 进化','Soft UI Evolution','soft','switches','eff1f2 f5f7f7 344754 557389 9bbfb1','同色柔影保持轻盈，用更清晰的边界补足状态对比。'],
    ['neubrutal','新粗野 2.0','Neubrutalism','hard','stickers','fffaee fffbf2 151515 ff6b6b ffd93d','圆钝的色贴撞上粗黑边，选中时像把贴纸压到纸面。'],
    ['bento','便当盒网格','Bento Box Grid','bento','cells','f5f5f7 ffffff 1d1d1f 0071e3 c3dbfb','大小不同的模块拼在同一网格，主卡占据最大面积。'],
    ['y2k','Y2K 美学','Y2K Aesthetic','y2k','lens','eed8ee e9dcf3 3d3351 ff80bb 73d4db','粉紫、青绿与镜面高光叠在果冻状弧面上。'],
    ['cyber','赛博朋克','Cyberpunk UI','terminal','signal','090a0b 1a1321 f1e9f4 ff2cc8 00ff88','暗底上叠加霓虹警示色、细扫描线和错位的信号。'],
    ['ai','AI 原生界面','AI-Native UI','assistant','conversation','fafbff ffffff 303b52 6578d3 986dc0','以提问、上下文和答复三种气泡建立对话次序。'],
    ['memphis','孟菲斯设计','Memphis Design','memphis','memphis','fff5ee fffcf1 293332 ff6b6b 34a9a3','把波浪线、网点和倾斜图形插入明快的撞色构图。'],
    ['vapor','蒸汽波','Vaporwave','synth','sun','302249 4d3164 ffe5fb ff87d2 8dcfef','粉紫日落、远近网格和柔焦色带共同营造怀旧空间。'],
    ['layer','维度层叠','Dimensional Layering','layer','layers','f0f0f5 ffffff 373748 7e75c4 f4a970','前后卡片采用不同阴影与相对位移，观察遮挡顺序。'],
    ['exminimal','极度极简','Exaggerated Minimalism','oversize','numeral','ffffff ffffff 101010 141414 c9c9c4','把一个数字放到足够大，其他信息退到画面边缘。'],
    ['kinetic','动态排版','Kinetic Typography','kinetic','type','101010 131313 ffffff ffffff 989898','同一个词重复成节奏；错位与压缩让文字承担运动主体。'],
    ['parallax','视差叙事','Parallax Storytelling','layer','hills','f5f0e8 e8e0d0 342819 8b6f47 b5a181','远山位移较小，近处地形滑动更多，从平面产生纵深。'],
    ['swiss2','瑞士现代 2.0','Swiss Modernism 2.0','grid','grid','fcfcfc ffffff 141414 151515 9b9da1','规则列网与跨栏数字制造不对称重心，间距保持等比。'],
    ['hud','科幻 HUD','HUD / Sci-Fi FUI','hud','radar','001020 082237 d6f4ff 00aaff 63d9e8','环形刻度、准星和扫描标记把界面变成观测仪。'],
    ['bento2','便当网格 2.0','Bento Grids 2.0','bento','cells','f3f3ee ffffff 262922 ec5948 7f92ae','以不同比例的圆角窗容纳图像与读数，强调板块主次。'],
    ['spatial','空间计算','Spatial UI (VisionOS)','glass','layers','1a1a2e 2c3655 e8eef8 a0c0ff dee4f2','半透明窗在不同深度悬浮，位移会改变两层间隙。'],
    ['eink','电子墨水','E-Ink / Paper','print','contour','faf8f0 f0ede0 25251d 36362d 8c8b77','米白底、墨色线条与少量灰阶保留低刺激的纸感。'],
    ['chaos','Z 世代混沌','Gen Z Chaos / Maximalism','chaos','stickers','fff24a fff7cb 121212 ff4500 c842ff','巨大字块、斜贴标签与高饱和色冲撞成拼贴海报。'],
    ['bio','仿生有机 2.0','Biomimetic / Organic 2.0','organic','pebbles','e8ede4 dce3d8 263c2b 427846 aab98e','用不同尺度的细胞轮廓彼此包裹，位移如一组呼吸。'],
    ['raw','反精致粗糙','Anti-Polish / Raw Aesthetic','raw','raw','fdfdfd ffffff 191919 202020 a6a59b','虚线、微歪框与手画痕迹让结构保留草图的手感。'],
    ['tactile','触觉数字','Tactile Digital / Deformable UI','tactile','pebbles','f8f5f0 e6dfd3 302f25 79664e b8a58b','棉纸色表面与软块挤压，给按下的动作一个触觉比喻。'],
    ['nature','自然精粹','Nature Distilled','editorial','hills','f5f2eb fcfaf5 2a2418 5a6a4a a99779','把自然压缩为奶油米、森林绿与温暖留白。'],
    ['cursor','光标交互','Interactive Cursor Design','hud','cursor','1a1a2e 222240 f1eef8 bca6ff 859acb','指针位置牵动标靶和轮廓线；滑杆也能触发相同变化。'],
    ['voice','语音优先','Voice-First Multimodal','quiet','voice','0a0a1a 141428 e4e8fa aabbee 8890aa','将语音状态变为波形和文字提示，这里用滑杆模拟振幅。'],
    ['product','3D 产品展示','3D Product Preview','studio','cube','fafafa ffffff 171717 525761 b2b8c0','把模型置于单一光源下，从外形、阴影与角度辨认体积。'],
    ['mesh','渐变网格','Gradient Mesh / Aurora Evolved','aurora','mesh','0a0e1a 1d1831 e6eafc ff64c8 00c8ff','多处色光互相混合，移动控制点可见局部色域改变。'],
    ['rgb','色差 RGB 分裂','Chromatic Aberration / RGB Split','glitch','channels','080808 101018 f2f2f4 ff3030 0090ff','将轮廓拆成红绿蓝三个通道，拉开时可见色差边缘。'],
    ['film','复古胶片','Vintage Analog / Retro Film','film','frames','f5e8d0 faf0dd 392c21 8b6914 b88062','奶油纸、褪色影像和胶片边孔，赋予画面冲印质感。'],
    ['brutal','粗野主义','Brutalism','hard','raw','f1eb03 fffff3 161616 00df54 ff41aa','粗边界、裸露的色块与突兀的文字，直接亮出界面骨架。'],
    ['skeuo','经典拟物','Skeuomorphism','tactile','dial','51371f 785a36 fff0d4 d7aa55 c4aa82','叠合金属高光、皮面色与旋钮阴影，让控件像真实器件。'],
    ['pixel','像素艺术','Pixel Art','pixel','pixels','251c40 322849 f8e8fb ffbd42 ee617f','用整格像素描边和有限色阶，变化以离散步进呈现。'],
    ['editorial','编辑部网格 / 杂志','Editorial Grid / Magazine','editorial','type','f9f7f2 ffffff 181919 a93c36 a3a296','大号衬线字、分栏和栏线把一条记录组织成杂志跨页。']
  ];

  const profiles = new Map(recipes.map(([id,title,en,surface,motif,colors,note]) =>
    [id, {id,title,en,surface,motif,colors,note}]));
  const paletteOrder = recipes.slice(0,50).map(r => r[0]);
  const patternOrder = ('swiss neo glass brutal hyper vibrant oled accessible clay aurora retro flat skeuo liquid motion micro inclusive zero soft neubrutal bento y2k cyber organic ai memphis vapor layer exminimal kinetic parallax swiss2 hud pixel bento2 spatial eink chaos bio raw tactile nature cursor voice product mesh editorial rgb film').split(' ');

  // These color roles are our visual studies of the second film's sample compositions.
  const patternColors = {
    swiss:'f9f8f3 ffffff 141414 171717 b4b6ae', neo:'e6edf3 e6edf3 303d4d 7696ac b4c7d6', glass:'17152d 44395c f4efff 79c5ee f681c4',
    hyper:'121d23 263d3c f5f2db fdd452 61a954', vibrant:'160b29 29183e f9eef7 ee268c 02e1f2', oled:'000000 10120d ecf9e6 64ed16 00d1c1',
    accessible:'fffefa ffffff 142537 174e9c f2ba45', clay:'fff1ec f6c8c0 56333b 95c6ad eda0ac', aurora:'191734 342a4f f7edff f62995 40bcd9',
    retro:'19102b 2c193b fae5ff f99369 dd3196', flat:'f8fdfb ffffff 1c3038 256add f9a331', liquid:'0b2234 223a57 f0f9ff 82efdf e1a6f7',
    motion:'1c2532 243748 e2f2ed ee7cbd 9de0c3', micro:'fafcfb fff6e5 293c42 398ac5 e2a54f', inclusive:'f5fcf5 ffffff 182c32 157546 2468c2',
    zero:'fbfdfd f0faf4 25382f 617ca3 72b78a', soft:'edf3f8 f5f9fd 38485a 94baa9 829dbf', neubrutal:'fff2a9 f5ffe7 161616 11c979 ff845b',
    bento:'fdfbf4 ffffff 202b32 1578ee c3d6f1', y2k:'ebcfe9 eddff8 473455 fc84d2 76cddd', cyber:'130a15 231427 f8f1fa 02e8e8 ff1749',
    organic:'edf2e3 f7f7ec 35482b 58854b bba08c', ai:'edf5fc ffffff 293450 7452d6 40c384', memphis:'fff0c1 fffadc 282b39 ed276b 00c4e9',
    vapor:'3e3165 51366f ffe9ff ee92bf 9f91e9', layer:'f0f1fb fbfaff 2c2c46 6544c8 f7a13e', exminimal:'fdfcf8 ffffff 181818 f44812 757575',
    kinetic:'151711 233d42 f9fcf0 f3b648 73c7e3', parallax:'0c1724 1c2b3e e0eff3 7db8ba 749bab', swiss2:'fafbfd ffffff 161e31 155bdb 65789b',
    hud:'071923 142e39 e2fcfc 00d4d8 fdb738', bento2:'f3faf4 ffffff 17212e 222f43 80a895', spatial:'e9f2fb ffffff 21405a 58a8e3 abc8e7',
    eink:'faf8ed fdfcf5 282720 292822 929181', chaos:'fbf609 f4ff29 1a121d f418d2 24d620', bio:'0b2b32 17494a e4f6e9 44df94 ed969e',
    raw:'f9f8f3 fffffc 353230 5a493e bda88e', tactile:'ead9e8 eddbe9 554059 dd96ba 86b4bf', nature:'f1eadc faf4e9 3a3c32 718565 c68d75',
    cursor:'131629 252843 ece5ff 9159fa 36d3e4', voice:'fbfffc eff9f1 233e32 58ae77 8b85b2', product:'f5f6f8 ffffff 273746 5383ce 9aabc3',
    mesh:'152235 222645 f2edff 1feac4 f051e1', rgb:'0b0910 15141a f2f1fd fc2442 184bff', film:'eee3c9 f7ead3 4f4232 a18a5c aa7960'
  };
  const patternNames = {
    swiss:['极简与瑞士风格','Minimalism & Swiss Style'], organic:['自然亲和设计','Organic Biophilic'],
    bento2:['便当网格','Bento Grids'], spatial:['空间界面','Spatial UI (VisionOS)']
  };
  const crossLinks = {brutalist:'brutal',swiss:'swiss',japanese:'editorial',glass:'glass',neo:'neo',organic:'nordic',aurora:'aurora',neubrutal:'brutal',bento:'bento',y2k:'y2k',cyber:'cyber',memphis:'memphis',swiss2:'swiss',bento2:'bento',nature:'nordic',mesh:'aurora',editorial:'editorial',brutal:'brutal'};
  const ids = ['style-palette-50','style-pattern-49'];
  function variantsFor(pattern) {
    return (pattern ? patternOrder : paletteOrder).map(id => {
      const p = profiles.get(id);
      const [title,en] = (pattern && patternNames[id]) || [p.title,p.en];
      return {id,title,en};
    });
  }
  const items = [
    {id:ids[0],title:'50 种前端风格色卡',en:'Frontend Palette Atlas',group:'studies',source:13,
      summary:'按原片顺序浏览中文风格卡，比较色谱、字形、材质以及同一动作的反馈。',
      keywords:['配色','50种','色卡','前端','风格','色盘'],variants:variantsFor(false)},
    {id:ids[1],title:'49 种通用 UI 风格',en:'General UI Style Index',group:'studies',source:14,
      summary:'同一张信号采样卡换上 49 种界面语言。拖动滑杆，比较各自的层级和运动。',
      keywords:['49种','通用','风格','UI UX Pro Max','交互'],variants:variantsFor(true)}
  ];

  // Published swatches in the companion repository, keyed to video 13.
  const sourcePalettes = {
    brutalist: [["#f5f3ee", "底色"], ["#111111", "墨黑"], ["#ffffff", "白"], ["#d4d0c8", "点阵"], ["#888888", "标签灰"]],
    swiss: [["#fafaf9", "纸白"], ["#1a1a1a", "墨黑"], ["#6b7280", "中灰"], ["#e5e7eb", "线灰"]],
    japanese: [["#f1f0ea", "暖纸"], ["#faf9f4", "米白"], ["#dfff00", "荧光黄"], ["#d4d3cc", "暖灰"], ["#2c2b28", "墨棕"]],
    terminal: [["#0d0f0e", "墨黑"], ["#c5d0c0", "灰绿"], ["#dfff00", "酸黄"], ["#2454ff", "深蓝"], ["#4ec97a", "信号绿"]],
    glass: [["#0a0e27", "深蓝底"], ["#dfff00", "酸黄"], ["#2454ff", "深蓝"], ["#141a3a", "紫蓝"], ["#e8eaf0", "文字白"]],
    voxel: [["#7B8F3A", "草绿"], ["#8B6B3D", "泥土棕"], ["#6D6D6D", "石头灰"], ["#C4A87C", "橡木黄"], ["#87CEEB", "天空蓝"], ["#3F76B4", "水蓝"]],
    neo: [["#e0e5ec", "底色"], ["#c2c8d2", "暗影"], ["#fefeff", "亮影"], ["#3a4a5a", "深蓝灰"], ["#5a6575", "文字灰"]],
    win95: [["#008080", "桌面"], ["#c0c0c0", "银灰"], ["#000080", "深蓝"], ["#dfdfdf", "亮灰"], ["#000000", "黑色"]],
    organic: [["#f3f0e8", "奶油米底"], ["#fdfbf5", "手工纸"], ["#4a4538", "暖木棕"], ["#6b8a5e", "鼠尾草绿"], ["#8ba682", "苔绿色"], ["#d5e0cc", "嫩绿色"]],
    hyper: [["#0f0f1a", "深空黑底"], ["#1a2040", "深蓝面板"], ["#d0d8f0", "亮白文字"], ["#3355cc", "科技蓝"], ["#4466dd", "亮蓝hover"]],
    vibrant: [["#ffffff", "白色背景"], ["#ff6b6b", "鲜红"], ["#ffd93d", "鲜黄"], ["#111111", "近黑边框"], ["#fafafa", "极浅灰"]],
    oled: [["#000000", "OLED纯黑"], ["#0a0a0a", "极暗卡片"], ["#ffffff", "纯白文字"], ["#aaaaaa", "浅灰文字"], ["#222222", "暗灰边框"]],
    accessible: [["#ffffff", "白色背景"], ["#000000", "纯黑边框"], ["#0055cc", "链接蓝"], ["#1a1a1a", "深黑文字"], ["#f5f5f5", "浅灰底板"]],
    clay: [["#f0c9a0", "杏色底色"], ["#e0b080", "深杏色"], ["#7a5e3a", "可可棕"], ["#c89868", "暖驼色"], ["#5a3e2a", "深棕"]],
    aurora: [["#0a0f1e", "深蓝黑底"], ["#0d9488", "翡翠绿"], ["#c8daf0", "浅蓝文字"], ["#141e38", "深蓝卡片"], ["#0f766e", "深翡翠绿"]],
    retro: [["#1a0a2e", "太空深紫"], ["#ff6b9d", "霓虹粉"], ["#c0a8e0", "淡紫文字"], ["#0d1a3a", "深蓝紫"], ["#ff4b8d", "亮粉"]],
    flat: [["#f0f4f8", "浅蓝灰底"], ["#3490dc", "品牌蓝"], ["#ffffff", "白色卡片"], ["#2d3748", "深灰标题"], ["#1a202c", "极深黑"]],
    liquid: [["#0a0e1a", "深蓝黑底"], ["#12183a", "深紫黑"], ["#e0e8f8", "亮白文字"], ["#000000", "黑色"], ["#a0b8d8", "浅蓝灰"]],
    motion: [["#111111", "暗色舞台"], ["#ff6b6b", "动效红"], ["#ffffff", "白色"], ["#1a1a1a", "近黑"], ["#000000", "纯黑底"]],
    micro: [["#fafafa", "浅灰底"], ["#5b6abf", "蓝紫按钮"], ["#ffffff", "白色卡片"], ["#444444", "深灰"], ["#eeeeee", "极浅灰"]],
    inclusive: [["#fefefe", "近白底"], ["#000000", "纯黑边框"], ["#0055cc", "链接蓝"], ["#ffffff", "白色"], ["#1a3a5c", "深蓝文字"]],
    zero: [["#ffffff", "纯白画布"], ["#000000", "纯黑文字"], ["#333333", "深灰"], ["#cccccc", "浅灰边框"], ["#f0f0f0", "极浅灰"]],
    soft: [["#eef0f4", "浅蓝灰底"], ["#6382dc", "蓝紫按钮"], ["#ffffff", "白色卡片"], ["#2d3748", "深灰标题"], ["#f8faff", "极浅蓝白"]],
    neubrutal: [["#fffaee", "暖色奶油底"], ["#ff6b6b", "珊瑚红"], ["#ffd93d", "阳光黄"], ["#000000", "纯黑边框"], ["#ffffff", "白色"]],
    bento: [["#f5f5f7", "Apple灰底"], ["#0071e3", "Apple蓝"], ["#ffffff", "白色卡片"], ["#1d1d1f", "Apple黑"], ["#333333", "深灰文字"]],
    y2k: [["#d1f7ff", "冰蓝渐变"], ["#ffccde", "樱花粉"], ["#ff69b4", "粉红主色"], ["#2a2a5a", "深紫"], ["#ffffff", "白色"]],
    cyber: [["#0a0a0a", "纯黑底"], ["#ff00ff", "霓虹品红"], ["#00ff88", "霓虹亮绿"], ["#ff00ff33", "品红透明"], ["#000000", "黑色"]],
    ai: [["#fafbff", "亮白底色"], ["#667eea", "蓝紫渐变起"], ["#764ba2", "蓝紫渐变止"], ["#ffffff", "白色卡片"], ["#4a5568", "深灰文字"]],
    memphis: [["#fff5ee", "暖白底"], ["#ff6b6b", "珊瑚粉"], ["#4ecdc4", "青绿色"], ["#ffe66d", "阳光黄"], ["#ffffff", "白色"]],
    vapor: [["#0a0a2e", "深紫底"], ["#ff00ff", "霓虹粉"], ["#00ffff", "青色"], ["#1a0a3e", "深紫卡片"], ["#e8a0ff", "淡粉紫"]],
    layer: [["#f0f0f5", "浅灰舞台"], ["#ffffff", "白色卡片"], ["#4a4a6a", "深紫灰"], ["#3a3a4a", "极深灰"], ["#eeeeee", "浅灰边框"]],
    exminimal: [["#ffffff", "纯白背景"], ["#000000", "纯黑文字"], ["#333333", "深灰"], ["#1a1a1a", "近黑色"], ["#eeeeee", "浅灰线"]],
    kinetic: [["#000000", "纯黑背景"], ["#ffffff", "纯白文字"], ["#cccccc", "浅灰"], ["#0a0a0a", "近黑"], ["#222222", "暗灰"]],
    parallax: [["#f5f0e8", "暖米底"], ["#e8e0d0", "浅棕层"], ["#1a1008", "深棕标题"], ["#8b6f47", "古铜棕"], ["#3a3028", "棕色文字"]],
    swiss2: [["#fcfcfc", "纯白底"], ["#000000", "黑色边框"], ["#000000", "纯黑"], ["#ffffff", "白色"], ["#333333", "深灰"]],
    hud: [["#001020", "深空蓝底"], ["#00aaff", "发光青"], ["#00ccff", "亮青色"], ["#000000", "黑色"], ["#003050", "深蓝面板"]],
    bento2: [["#f2f2f7", "暖灰底色"], ["#ff3b30", "iPhone红"], ["#ffffff", "白色卡片"], ["#111111", "近黑色"], ["#333333", "深灰文字"]],
    spatial: [["#1a1a2e", "深空蓝底"], ["#16213e", "深蓝玻璃"], ["#e8eef8", "亮白文字"], ["#a0c0ff", "浅蓝"], ["#141428", "极深蓝"]],
    eink: [["#faf8f0", "暖白纸色"], ["#3a3a30", "深灰文字"], ["#1a1a10", "墨黑"], ["#ddd8c8", "暖灰分割"], ["#f0ede0", "米白卡片"]],
    chaos: [["#ffffff", "白色"], ["#000000", "黑色"], ["#ff4500", "橙红色"], ["#fffa00", "亮黄色"], ["#cc3700", "深橙"]],
    bio: [["#e8ede4", "淡绿灰底"], ["#2a4a2a", "深绿标题"], ["#4a7a4a", "亮绿按钮"], ["#3a4a3a", "深绿灰"], ["#dce3d8", "浅绿卡片"]],
    raw: [["#fdfdfd", "纯白底"], ["#000000", "黑色虚线"], ["#ffffff", "白色"], ["#111111", "近黑文字"], ["#eeeeee", "浅灰"]],
    tactile: [["#f8f5f0", "暖灰棉纸"], ["#4a4a3a", "深棕木"], ["#ffffff", "白色"], ["#2a2a20", "极深棕"], ["#e0ddd8", "暖灰边框"]],
    nature: [["#f5f2eb", "奶油米底"], ["#5a6a4a", "森林绿"], ["#2a2418", "深棕"], ["#6a7a5a", "苔绿"], ["#fcfaf5", "暖白"]],
    cursor: [["#1a1a2e", "深紫科技蓝"], ["#dddddd", "浅灰文字"], ["#222240", "发光面板"], ["#333344", "深蓝灰"], ["#a0a0c0", "柔和蓝灰"]],
    voice: [["#0a0a1a", "极深蓝黑"], ["#ccd0ee", "柔和蓝紫"], ["#aabbee", "浅蓝紫"], ["#141428", "深蓝底"], ["#8890aa", "蓝灰"]],
    product: [["#fafafa", "暖白背景"], ["#111111", "纯黑"], ["#ffffff", "白色卡片"], ["#ffffff", "白色"], ["#333333", "深灰"]],
    mesh: [["#0a0e1a", "深色底"], ["#ff64c8", "粉红光斑"], ["#00c8ff", "青色光斑"], ["#000000", "黑色"], ["#e0e8f8", "亮白文字"]],
    rgb: [["#000000", "纯黑底"], ["#ff0000", "红色偏移"], ["#00ff00", "绿色偏移"], ["#0000ff", "蓝色偏移"], ["#ffffff", "白色文字"]],
    film: [["#f5e8d0", "暖黄纸色"], ["#2a1a08", "极深棕"], ["#3a2a10", "深棕标题"], ["#8b6914", "古铜色"], ["#faf0dd", "胶片颗粒"]],
  };

  const behavior = {
    blocks:['色块间距','分开色块','重组色块'], grid:['版面分割','重排网格','恢复网格'],
    contour:['等高线密度','压紧线距','展开线距'], signal:['信号幅度','放大波形','收束波形'],
    sheets:['叠层间距','展开玻璃','合起玻璃'], voxel:['堆叠高度','升高方块','落下方块'],
    dial:['刻度角度','转动旋钮','复位旋钮'], window:['窗口位置','展开窗口','叠起窗口'],
    leaf:['叶片展开','展开叶片','收拢叶片'], cube:['观察角度','转动模型','复位模型'],
    target:['选择状态','选定样本','撤销选择'], pebbles:['形体压缩','按压形体','松开形体'],
    sun:['地平线位置','升起落日','沉入地平线'], lens:['镜面位移','移动透镜','复位透镜'],
    layers:['层间距离','展开分层','收起分层'], switches:['反馈进度','打开开关','复位开关'],
    voice:['波形振幅','模拟响应','回到静息'], stickers:['贴片错位','错开贴片','排齐贴片'],
    cells:['模块比例','重排模块','还原布局'], conversation:['对话阶段','显露回复','收起回复'],
    memphis:['几何位移','展开拼贴','聚拢拼贴'], numeral:['字号对比','放大数字','还原字号'],
    type:['字层错位','错开字层','对齐字层'], hills:['视差位移','向前推进','回到远景'],
    radar:['扫描角度','扫过扇区','返回起点'], cursor:['指针位置','移动标靶','复位标靶'],
    mesh:['光点距离','移动光源','归拢光源'], channels:['通道间距','分离通道','套准通道'],
    frames:['胶片进位','进一格','退一格'], pixels:['像素步进','移动像素','复位像素'],
    raw:['纸片错位','错开纸片','还原叠放']
  };
  const motifNames = {
    blocks:'色块构图',grid:'模块网格',contour:'曲线版画',signal:'波形信号',sheets:'透明叠片',voxel:'方块地形',dial:'浮雕刻盘',
    window:'层叠窗口',leaf:'植物剪影',cube:'立体剖面',target:'焦点标记',pebbles:'柔软形体',sun:'日落地平线',lens:'光学透镜',
    layers:'景深切片',switches:'开关阵列',voice:'声音脉冲',stickers:'错版贴纸',cells:'模块拼图',conversation:'上下文卡片',
    memphis:'几何拼贴',numeral:'大字印样',type:'字层构成',hills:'远近山形',radar:'环形扫描',cursor:'跟随标靶',
    mesh:'色光混合',channels:'通道套色',frames:'胶片样张',pixels:'像素矩阵',raw:'手作框线'
  };
  const cap = (n,a,b) => Math.max(a,Math.min(b,n));
  function mix(a,b,t) {
    const rgb = [1,3,5].map(i => Math.round(parseInt(a.slice(i,i+2),16)*(1-t)+parseInt(b.slice(i,i+2),16)*t));
    return 'rgb('+rgb.join(',')+')';
  }
  function contrastInk(hex) {
    const channels=[1,3,5].map(i => parseInt(hex.slice(i,i+2),16)/255).map(v=>v<=.04045 ? v/12.92 : ((v+.055)/1.055)**2.4);
    return channels[0]*.2126+channels[1]*.7152+channels[2]*.0722>.179 ? '#101010' : '#ffffff';
  }

  function paint(canvas,p,t) {
    const c=canvas.getContext('2d');
    if (!c) return;
    const [ground,plane,ink,a,b]=p.colors;
    const fg=ink,quiet=mix(plane,ink,.25);
    c.setTransform(canvas.width/400,0,0,canvas.height/220,0,0); c.clearRect(0,0,400,220);
    const rect=(x,y,w,h,color,r=0)=>{c.fillStyle=color;c.beginPath();if(r)c.roundRect(x,y,w,h,r);else c.rect(x,y,w,h);c.fill();};
    const path=(points,fill,stroke=null,width=1,close=true)=>{
      c.beginPath();points.forEach(([x,y],i)=>i?c.lineTo(x,y):c.moveTo(x,y));
      if(close)c.closePath();if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}
    };
    const circle=(x,y,r,fill,stroke=null,width=1)=>{
      c.beginPath();c.arc(x,y,r,0,Math.PI*2);if(fill){c.fillStyle=fill;c.fill();}if(stroke){c.strokeStyle=stroke;c.lineWidth=width;c.stroke();}
    };
    const text=(str,x,y,size,color,family='sans-serif',weight='700')=>{c.fillStyle=color;c.font=weight+' '+size+'px '+family;c.fillText(str,x,y);};
    const glow=(x,y,r,col)=>{const grad=c.createRadialGradient(x,y,1,x,y,r);grad.addColorStop(0,col+'d9');grad.addColorStop(1,col+'00');rect(x-r,y-r,2*r,2*r,grad);};
    const strip=(x,y,w,h,step,col)=>{for(let k=0;k<h;k+=step)rect(x,y+k,w,1,col);};
    const innerText=contrastInk(a);
    switch(p.motif) {
      case 'grid': {
        const split=130+t*68;
        for(let k=0;k<12;k++)rect(29+k*29,25,1,171,quiet);
        path([[32,44],[368,44],[368,190],[32,190]],null,fg);
        rect(32,44,split-32,146,a);rect(split+5,104,364-split,86,b);
        text('A',45,139,88,innerText);text('B',split+16,167,51,contrastInk(b));break;
      }
      case 'blocks': {
        const d=t*15;rect(54-d,43-d,131,81,a);circle(252+d,79-d,42,b);
        path([[59-d,178+d],[160-d,178+d],[109-d,118+d]],fg);
        rect(194+d,127+d,118,47,b,p.surface==='flat'?20:0);break;
      }
      case 'contour': {
        c.lineWidth=1.4;
        for(let i=0;i<23;i++){
          const pts=[];for(let j=0;j<=100;j++){const th=j/100*Math.PI*2,r=35+i*(2.7-.7*t)+Math.cos(3*th+.25*t)*6+Math.sin(2*th+t)*9;
            pts.push([202+Math.cos(th)*r*1.5,109+Math.sin(th)*r*.91]);}
          path(pts,null,i%4===0?fg:b,i%4===0?1.8:.7);
        }circle(205,109,5,a,fg,1);break;
      }
      case 'signal':case 'voice': {
        const voice=p.motif==='voice',bars=voice?42:58;
        if(!voice){for(let y=43;y<190;y+=27)path([[31,y],[366,y]],null,quiet,1,false);}
        for(let i=0;i<bars;i++){const u=i/(bars-1),env=.13+.87*Math.sin(u*Math.PI)**1.5;
          const h=7+(28+78*t)*env*(.28+.72*Math.abs(Math.sin(i*(voice?.37:.57)+t*4.8)*Math.cos(i*.13)));
          rect(33+u*326,109-h/2,voice?4.4:3.2,h,i<bars*.62?a:b,voice?2:0);}
        break;
      }
      case 'sheets':case 'layers': {
        for(let i=0;i<4;i++){
          const dx=i*(12+t*11),dy=i*(5+t*9);
          c.save();c.globalAlpha=.64+i*.075;c.shadowColor='#15152540';c.shadowBlur=p.motif==='sheets'?16:4;
          rect(80+dx,37+dy,173,97,mix(a,b,i/3),p.motif==='sheets'?15:4);c.restore();
          c.strokeStyle='#ffffffaa';c.lineWidth=1;c.beginPath();c.roundRect(80+dx,37+dy,173,97,p.motif==='sheets'?15:4);c.stroke();
          rect(96+dx,53+dy,40,2,contrastInk(i<2?a:b));}
        break;
      }
      case 'cube':case 'voxel': {
        function box(cx,cy,s,h,top,left,right){
          path([[cx,cy-s*.45],[cx+s,cy],[cx,cy+s*.45],[cx-s,cy]],top);
          path([[cx-s,cy],[cx,cy+s*.45],[cx,cy+s*.45+h],[cx-s,cy+h]],left);
          path([[cx,cy+s*.45],[cx+s,cy],[cx+s,cy+h],[cx,cy+s*.45+h]],right);}
        if(p.motif==='voxel'){
          for(let depth=0;depth<7;depth++)for(let x=0;x<4;x++){const y=depth-x;if(y<0||y>3)continue;
            const ht=11+Math.round((Math.sin(x*1.5+y+t*2)+1)*2)*7;box(200+(x-y)*24,90+(x+y)*11-ht,24,ht,mix(a,b,(x+y)/6),mix(a,fg,.22),b);}
        }else{
          const angle=.35+t*1.1;
          const corners=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([x,z])=>[199+(Math.cos(angle)*x+Math.sin(angle)*z)*66,72+(-Math.sin(angle)*x+Math.cos(angle)*z)*22]);
          const pairs=corners.map((pt,i)=>[pt,corners[(i+1)%4],i]).sort((u,v)=>u[0][1]+u[1][1]-v[0][1]-v[1][1]);
          for(const [u,v,i] of pairs)path([u,v,[v[0],v[1]+73],[u[0],u[1]+73]],i%2?mix(a,fg,.24):a);
          path(corners,mix(a,'#ffffff',.51));}
        break;
      }
      case 'dial': {
        const x=202,y=112;const grad=c.createLinearGradient(x-48,y-55,x+50,y+55);grad.addColorStop(0,'#ffffff');grad.addColorStop(.36,plane);grad.addColorStop(1,mix(plane,fg,.35));
        c.save();c.shadowColor='#17212c55';c.shadowBlur=11;c.shadowOffsetY=6;circle(x,y,59,grad);c.restore();
        circle(x,y,50,null,quiet,1);for(let i=0;i<21;i++){const ang=(.73+i/20*1.52)*Math.PI;path([[x+Math.cos(ang)*70,y+Math.sin(ang)*70],[x+Math.cos(ang)*76,y+Math.sin(ang)*76]],null,quiet,i%5?1:2,false);}
        const ang=(.74+t*1.51)*Math.PI;path([[x+Math.cos(ang)*30,y+Math.sin(ang)*30],[x+Math.cos(ang)*49,y+Math.sin(ang)*49]],null,fg,4,false);break;
      }
      case 'window': {
        for(let i=0;i<3;i++){
          const x=63+i*(24+15*t),y=27+i*(14+7*t);
          rect(x,y,192,98,'#c0c0c0');path([[x,y+98],[x,y],[x+192,y]],null,'#ffffff',3,false);
          path([[x+192,y],[x+192,y+98],[x,y+98]],null,'#444444',3,false);
          rect(x+4,y+4,184,15,'#000080');rect(x+169,y+6,12,10,'#d6d6d6');text('Archive',x+9,y+15,10,'#fff','monospace');rect(x+17,y+35,76,4,'#666666');rect(x+17,y+46,125,3,'#777777');}
        break;
      }
      case 'leaf': {
        for(let i=0;i<6;i++){c.save();c.translate(200,164);c.rotate((i-2.5)*(.21+.13*t));c.beginPath();c.moveTo(0,0);c.bezierCurveTo(-59,-60,-13,-90,0,-132);c.bezierCurveTo(37,-87,37,-43,0,0);c.fillStyle=mix(a,b,i/5);c.fill();path([[0,-4],[0,-112]],null,quiet,1,false);c.restore();}break;
      }
      case 'target':case 'switches': {
        for(let i=0;i<3;i++){
          const u=cap(t*3-i,0,1),y=32+i*54;
          if(p.motif==='switches'){
            rect(89,y,108,37,mix(plane,b,.48+u*.48),19);circle(108+u*68,y+18.5,14.5,a);
            path([[219,y+13],[282,y+13]],null,fg,3,false);path([[219,y+24],[263,y+24]],null,quiet,2,false);
          }else{rect(87,y,222,40,plane,3);c.strokeStyle=u>.4?a:quiet;c.lineWidth=u>.4?3:1;c.strokeRect(87,y,222,40);
            rect(100,y+10,19,19,u>.4?a:plane,3);c.strokeStyle=fg;c.strokeRect(100,y+10,19,19);
            if(u>.4)path([[103,y+19],[108,y+24],[116,y+13]],null,contrastInk(a),2,false);
            text(['A  /  BASE','B  /  LAYER','C  /  FOCUS'][i],134,y+26,14,fg,'monospace','600');}
        }break;
      }
      case 'pebbles': {
        for(let i=0;i<3;i++){const x=137+i*63,y=110+Math.sin(i*2.4)*14+12*t,r=43-i*4;
          const grad=c.createRadialGradient(x-11,y-18,3,x,y,r*1.18);grad.addColorStop(0,mix(i%2?a:b,'#ffffff',.55));grad.addColorStop(.7,i%2?a:b);grad.addColorStop(1,mix(i%2?a:b,fg,.25));
          c.save();c.translate(x,y);c.scale(1+.22*t,1-.27*t);c.translate(-x,-y);c.shadowColor='#16231c44';c.shadowBlur=10;c.shadowOffsetY=7;circle(x,y,r,grad);c.restore();}
        break;
      }
      case 'sun': {
        const cy=99-26*t;const grad=c.createLinearGradient(0,cy-63,0,cy+63);grad.addColorStop(0,a);grad.addColorStop(1,b);circle(202,cy,65,grad);
        c.save();c.beginPath();c.arc(202,cy,66,0,Math.PI*2);c.clip();for(let j=0;j<9;j++)rect(120,cy+j*7,172,1+j*.4,ground);c.restore();
        for(let i=-4;i<=4;i++)path([[200+i*11,145],[200+i*54,219]],null,b,1,false);for(let j=0;j<7;j++)rect(15,147+j*j*1.7,370,1,b);break;
      }
      case 'lens': {
        glow(122+37*t,100,80,a);glow(275-42*t,121,74,b);strip(58,50,275,115,12,quiet);
        c.save();c.translate(203+(t-.5)*52,111);c.rotate(-.32);const grad=c.createLinearGradient(-70,-45,70,45);
        for(const [stop,col] of [[0,'#fffffff0'],[.11,'#ffffff35'],[.36,a+'aa'],[.52,'#ffffffaa'],[.77,b+'bb'],[1,'#ffffffed']])grad.addColorStop(stop,col);
        c.beginPath();c.ellipse(0,0,83,52,0,0,Math.PI*2);c.fillStyle=grad;c.fill();c.strokeStyle='#ffffffdd';c.lineWidth=2;c.stroke();c.restore();break;
      }
      case 'stickers':case 'raw': {
        for(let i=0;i<3;i++){c.save();c.translate(98+i*34,63+i*36);c.rotate((i-1)*(.065+.19*t));const bg=[a,b,plane][i];rect(0,0,158,48,bg);
          c.strokeStyle=fg;c.lineWidth=p.motif==='raw'?1.6:3;if(p.motif==='raw')c.setLineDash([5,3]);c.strokeRect(0,0,158,48);
          text(['FORM','FIELD','NOTES'][i],10,33,25,contrastInk(bg),p.motif==='raw'?'monospace':'sans-serif','900');c.restore();}break;
      }
      case 'cells': {
        const s=121+48*t;rect(41,37,s,147,a,11);rect(49+s,37,311-s,62,b,11);rect(49+s,107,(303-s)*.55,77,mix(b,fg,.25),9);rect(57+s+(303-s)*.55,107,(303-s)*.45,77,mix(a,b,.45),9);
        circle(74,70,10,innerText);path([[65,155],[90,134],[107,145],[141,106]],null,innerText,3,false);break;
      }
      case 'conversation': {
        rect(68,42,166,36,mix(plane,b,.32),13);path([[80,60],[170,60]],null,fg,2,false);rect(152,90,170,39,a,14);
        path([[171,109],[265,109]],null,innerText,2,false);c.save();c.globalAlpha=.24+.76*t;
        rect(68,145-7*t,95+62*t,35,b,12);for(let i=0;i<3;i++)circle(91+i*13,162-7*t,2.6,contrastInk(b));c.restore();break;
      }
      case 'memphis': {
        path([[65,51],[151,65],[87,127]],a);circle(274,73,34,b);rect(178,132,72,45,a);
        for(let i=0;i<6;i++)for(let j=0;j<4;j++)circle(59+i*9,145+j*8,1.9,fg);
        const pts=[];for(let i=0;i<92;i++)pts.push([104+i*1.9,109+Math.sin(i*.35+t*4)*9]);path(pts,null,fg,4,false);break;
      }
      case 'numeral':case 'type': {
        if(p.motif==='numeral'){text('2',104,172,128+37*t,a,'sans-serif','900');rect(80,190,240,2,fg);}
        else{for(let i=0;i<3;i++)text('FORM',63+(2-i)*14*t,75+i*44,52,[a,b,fg][i],p.surface==='editorial'?'Georgia':'sans-serif',i===1?'500':'900');}break;
      }
      case 'hills': {
        for(let j=0;j<3;j++){const pts=[[0,220]];for(let x=0;x<=400;x+=3){const x1=x+(t-.5)*(j+1)*52;pts.push([x,78+j*34+Math.sin(x1/65+j)*20+Math.sin(x1/28+.8*j)*8]);}pts.push([400,220]);path(pts,[mix(plane,b,.67),b,a][j]);}
        circle(304+(t-.5)*11,47,15,fg);break;
      }
      case 'radar':case 'cursor': {
        const cx=200,cy=110;for(let r=20;r<=80;r+=20)circle(cx,cy,r,null,quiet);
        path([[63,cy],[337,cy]],null,quiet,1,false);path([[cx,19],[cx,201]],null,quiet,1,false);
        if(p.motif==='radar'){const ang=-2.5+t*4;c.beginPath();c.moveTo(cx,cy);c.arc(cx,cy,80,ang-.65,ang);c.closePath();c.fillStyle=a+'77';c.fill();
          path([[cx,cy],[cx+80*Math.cos(ang),cy+80*Math.sin(ang)]],null,a,2,false);circle(224,90,4,b);
        }else{const x=137+128*t,y=145-76*t;for(let i=0;i<8;i++)circle(x-i*6,y+i*4.2,4-i*.35,a);
          path([[x,y],[x+4,y+24],[x+10,y+15],[x+20,y+13]],fg,b,1.5);}
        break;
      }
      case 'mesh':{glow(108+t*73,65,143,a);glow(295-39*t,137,153,b);glow(91,175-29*t,111,'#ad64f0');break;}
      case 'channels':{
        const x=141,w=116,y=56,h=107;c.save();c.globalCompositeOperation='screen';
        rect(x-t*33,y+t*3,w,h,'#ec101d');rect(x,y,w,h,'#19de4d');rect(x+t*31,y-t*5,w,h,'#1c34ed');c.restore();break;
      }
      case 'frames': {
        rect(45,45,310,129,fg,3);for(let i=0;i<22;i++){rect(50+i*14,49,7,5,plane);rect(50+i*14,165,7,5,plane);}
        c.save();c.beginPath();c.rect(51,59,295,100);c.clip();
        for(let i=-1;i<4;i++){const x=59+i*101-t*95;rect(x,60,93,97,mix(a,b,Math.abs(i)%3/2));circle(x+56,86,11,plane);path([[x,149],[x+33,107],[x+50,124],[x+74,93],[x+93,127],[x+93,157],[x,157]],fg);}
        c.restore();break;
      }
      case 'pixels': {
        const rows=['0011100011100','0111110111110','1100111110011','1111111111111','0110111110110','0011000001100'];
        const offset=Math.round(t*3)*5;rows.forEach((line,y)=>[...line].forEach((n,x)=>{if(n==='1')rect(104+x*14+offset,63+y*14,13,13,(x+y)%4?a:b);}));break;
      }
    }
  }

  function preset(catalogId,variantSlug) {
    const item=items.find(entry => entry.id===catalogId);
    if(!item) return null;
    const variant=item.variants.find(entry => entry.id===variantSlug) || item.variants[0];
    const p=profiles.get(variant.id);
    const colors=(catalogId===ids[1] && patternColors[p.id]) || p.colors;
    return {...p,...variant,colors:colors.split(' ').map(v=>'#'+v)};
  }
  const colorRoles=['背景','面板','文字','主色','辅色'];
  const reduceMotion=()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function renderSpecimen(catalogId,host,variantSlug) {
    const p=preset(catalogId,variantSlug);
    if(!p || !host) return;
    const el=document.createElement('div');
    el.className='sxl-spec sxl-surface-'+p.surface+' sxl-motif-'+p.motif+' sxl-preset-'+p.id;
    el.dataset.preset=p.id;
    for(const [i,key] of ['ground','plane','ink','a','b'].entries())el.style.setProperty('--sx-'+key,p.colors[i]);
    el.style.setProperty('--sx-btn-ink',contrastInk(p.colors[3]));
    el.style.setProperty('--sx-ground-ink',contrastInk(p.colors[0]));
    const [property,engage,returnLabel]=behavior[p.motif];
    el.innerHTML='<div class="sxl-interface"><header class="sxl-in-head"><span>形态研究室</span><span lang="en">Form Studies</span></header>'+
      '<div class="sxl-body"><div class="sxl-work"><canvas width="800" height="440" role="img"></canvas></div>'+
      '<div class="sxl-readout"><strong class="sxl-art-title"></strong><span class="sxl-art-kind"></span>'+
      '<button class="sxl-act" type="button" aria-pressed="false"></button></div></div></div>'+
      '<label class="sxl-slider"><span></span><input type="range" min="0" max="100" value="18"><output>18%</output></label>';
    const canvas=el.querySelector('canvas'),slider=el.querySelector('input'),action=el.querySelector('.sxl-act'),output=el.querySelector('output');
    el.querySelector('.sxl-slider span').textContent=property;
    el.querySelector('.sxl-art-title').textContent=motifNames[p.motif];
    el.querySelector('.sxl-art-kind').textContent=p.en;
    canvas.setAttribute('aria-label',p.title+'的'+motifNames[p.motif]+'图形');
    slider.setAttribute('aria-label',p.title+' · '+property);
    host.replaceChildren(el);
    let frame=0,value=.18;
    function setValue(next) {
      value=cap(next,0,1);
      slider.value=String(Math.round(value*100));output.value=slider.value+'%';
      slider.setAttribute('aria-valuetext',output.value);
      action.setAttribute('aria-pressed',String(value>=.55));action.textContent=value>=.55?returnLabel:engage;
      el.style.setProperty('--sx-progress',value.toFixed(3));
      paint(canvas,p,value);
    }
    function stop() { if(frame)cancelAnimationFrame(frame);frame=0; }
    slider.addEventListener('input',()=>{stop();setValue(Number(slider.value)/100);});
    action.addEventListener('click',()=>{
      stop();const from=value,to=from>=.55?0:1;
      if(reduceMotion()){setValue(to);return;}
      const start=performance.now();
      function tick(now) {
        const u=cap((now-start)/450,0,1);setValue(from+(to-from)*(1-(1-u)**3));
        if(u<1)frame=requestAnimationFrame(tick);else frame=0;
      }
      frame=requestAnimationFrame(tick);
    });
    if(['cursor','radar','hills','cube','lens'].includes(p.motif)) {
      canvas.addEventListener('pointermove',event=>{
        if(event.pointerType!=='mouse' && !event.buttons)return;
        const bounds=canvas.getBoundingClientRect();if(!bounds.width)return;
        stop();setValue((event.clientX-bounds.left)/bounds.width);
      });
    }
    setValue(value);
    return stop;
  }

  function showSwatches(host,p,isPalette) {
    const colors=isPalette?sourcePalettes[p.id]:p.colors.map((hex,i)=>[hex,colorRoles[i]]);
    host.replaceChildren();
    for(const [hex,name] of colors){
      const cell=document.createElement('div');cell.className='sxl-swatch';cell.innerHTML='<i aria-hidden="true"></i><b></b><code></code>';
      cell.firstElementChild.style.backgroundColor=hex;
      cell.querySelector('b').textContent=name;cell.querySelector('code').textContent=hex.toUpperCase();
      host.append(cell);
    }
  }

  function render(catalogId,host,variantSlug) {
    const item=items.find(v=>v.id===catalogId);
    if(!item || !host)return;
    const isPalette=catalogId===ids[0];
    const el=document.createElement('section');el.className='sxl-lab';
    el.innerHTML='<header class="sxl-controls"><label class="sxl-find">查找风格<input type="search" placeholder="中文、英文或序号" autocomplete="off"></label>'+
      '<label class="sxl-picker">风格目录<select></select></label>'+
      '<div class="sxl-siblings"><button type="button" data-step="-1">上一个</button><button type="button" data-step="1">下一个</button></div></header>'+
      '<div class="sxl-empty" role="status" hidden>没有匹配的风格，换个关键词试试。</div>'+
      '<div class="sxl-current"><header class="sxl-topline"><div><span class="sxl-position"></span><h3></h3><p class="sxl-en" lang="en"></p></div><a class="sxl-compare">并排对照</a></header>'+
      '<div class="sxl-stage"></div><p class="sxl-observe"></p><section class="sxl-palette"><h4></h4><div class="sxl-chips"></div></section>'+
      '<footer class="sxl-foot"><a class="sxl-related" hidden></a><span></span></footer></div>';
    host.replaceChildren(el);
    const q=s=>el.querySelector(s);
    const search=q('input'),select=q('select'),empty=q('.sxl-empty'),current=q('.sxl-current');
    const buttons=Array.from(el.querySelectorAll('[data-step]'));
    const variants=item.variants;
    const index=new Map(variants.map((v,i)=>[v.id,i]));
    let active=preset(catalogId,variantSlug).id,matches=variants,dispose;
    q('.sxl-foot span').textContent=isPalette?'色票取自视频作者配套网页；界面为交互重绘。':'界面与色值依据视频的风格特征重绘。';
    q('.sxl-palette h4').textContent=isPalette?'作者色票':'界面配色';
    function syncLink(slug) {
      const next='#sample/'+catalogId+'/'+slug;
      if(location.hash===next)return;
      // replaceState avoids adding a browser-history entry for each catalog step.
      try{history.replaceState(history.state,'',next);}
      catch{ location.hash=next; }
    }
    function selectPreset(slug,link) {
      const p=preset(catalogId,slug);if(!p)return;
      if(dispose)dispose();
      active=p.id;select.value=active;current.hidden=false;empty.hidden=true;
      q('.sxl-position').textContent=String(index.get(active)+1).padStart(2,'0')+' / '+variants.length;
      q('.sxl-topline h3').textContent=p.title;q('.sxl-en').textContent=p.en;
      q('.sxl-observe').textContent=p.note;
      q('.sxl-compare').href='#compare/'+catalogId+'~'+p.id+'/swiss';
      const cross=q('.sxl-related');
      cross.hidden=!crossLinks[p.id];
      if(!cross.hidden){cross.href='#sample/'+crossLinks[p.id];cross.textContent='查看同类单项样本';}
      showSwatches(q('.sxl-chips'),p,isPalette);
      dispose=renderSpecimen(catalogId,q('.sxl-stage'),active);
      if(link)syncLink(active);
    }
    function fillOptions() {
      const term=search.value.trim().toLowerCase();
      matches=variants.filter(v=>{
        const number=index.get(v.id)+1;
        if(/^\d+$/.test(term))return number===Number(term);
        return [v.title,v.en,v.id,profiles.get(v.id).note].join(' ').toLowerCase().includes(term);
      });
      select.replaceChildren(...matches.map(v=>new Option(String(index.get(v.id)+1).padStart(2,'0')+'  '+v.title,v.id)));
      select.disabled=!matches.length;
      buttons.forEach(btn=>{btn.disabled=matches.length<2;});
      if(!matches.length){empty.hidden=false;current.hidden=true;return;}
      const next=matches.find(v=>v.id===active)||matches[0];
      if(current.hidden || select.dataset.initialized!=='yes' || active!==next.id)selectPreset(next.id,active!==next.id);
      select.value=next.id;select.dataset.initialized='yes';
    }
    select.addEventListener('change',()=>selectPreset(select.value,true));
    search.addEventListener('input',fillOptions);
    buttons.forEach(btn=>btn.addEventListener('click',()=>{
      const i=matches.findIndex(v=>v.id===active);
      if(i>=0)selectPreset(matches[(i+Number(btn.dataset.step)+matches.length)%matches.length].id,true);
    }));
    fillOptions();
    return ()=>{if(dispose)dispose();};
  }

  function thumb(id,host) {
    if(!host)return;
    const root=document.createElement('div');
    root.className='sxl-thumb '+(id===ids[0]?'sxl-thumb-palette':'sxl-thumb-pattern');
    root.setAttribute('aria-hidden','true');
    if(id===ids[0]) {
      root.innerHTML='<div class="sxl-fandeck">'+['#213549','#e1ac75','#ee6a51','#8db4a9','#eee3be'].map((col,i)=>
        '<i style="--chip:'+col+';--angle:'+(-35+i*16)+'deg"></i>').join('')+'</div>';
    } else {
      root.innerHTML='<div class="sxl-prints"><i></i><i></i><i></i></div>';
    }
    host.replaceChildren(root);
  }
  window.AtlasStyleLab={items,render,renderSpecimen,thumb};
})();
