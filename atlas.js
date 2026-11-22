(() => {
  'use strict';
  const main = document.querySelector('#content');
  const dialog = document.querySelector('#search-dialog');
  const searchInput = document.querySelector('#search-field');
  const results = document.querySelector('#search-results');
  const svgPaths = {
    search: '<circle cx="10.4" cy="10.4" r="6.3"/><path d="m15 15 5 5"/>',
    grid: '<rect x="3.5" y="3.5" width="6" height="6" rx=".8"/><rect x="14.5" y="3.5" width="6" height="6" rx=".8"/><rect x="3.5" y="14.5" width="6" height="6" rx=".8"/><rect x="14.5" y="14.5" width="6" height="6" rx=".8"/>',
    list: '<path d="M8 6h12M8 12h12M8 18h12M4 6h.1M4 12h.1M4 18h.1"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    compare: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M12 4v16"/>',
    link: '<path d="M13 4h7v7m0-7-9 9M10 6H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5"/>',
    book: '<path d="M3 5c3-1 6-.5 9 1.5 3-2 6-2.5 9-1.5v13c-3-1-6-.5-9 1.5-3-2-6-2.5-9-1.5zM12 6.5v13"/>'
  };
  function icon(name) {
    return '<svg class="icon-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' + svgPaths[name] + '</svg>';
  }
  document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = icon(el.dataset.icon); });

  const groups = {all:'全部', styles:'视觉风格', motion:'交互动效', principles:'设计原理', studies:'风格目录', color:'色彩实验'};
  const sourceList = [
    ['用大白话向 AI 描述 10 种 App / 小程序高级动画','SpicyTater-','触点扩散、拖动让位、惯性吸附和状态反馈。','BV1gAtm69ER4'],
    ['为什么瑞士风格 70 年都不过时？','路北路陈','模块网格、非对称构图、无衬线字与单一强调色。','BV1hWar6SEVP'],
    ['设计规则：优秀 UI 设计的原则与实践','Joe Natoli · 中文语音版','视觉层级、邻近与对齐、排版和信息组织。','BV18WNK6UEvE'],
    ['苹果滑动的“肉感”，是怎么写出来的？','KD一对A','松手速度、弹簧运动与边界反馈。','BV1Cw4H6vES3'],
    ['16 种常见 UI 设计风格','Yoyo本慢','以相同内容比较配色、版式、阴影与材质。','BV1Ev3j6CEkc'],
    ['液态玻璃质感开关交互动效设计教程','六边形Evan','玻璃滑块、昼夜切换与分层视差。','BV15dVd6JEns'],
    ['苹果的圆角，为什么看着更顺？','KD一对A','比较圆弧与连续曲率轮廓的过渡。','BV1cc4b6JEPH'],
    ['为什么 iOS 图标看着很舒服','daodaoup','从浮雕到扁平符号，观察轮廓与图标构造网格。','BV1pt421L7qU'],
    ['iPhone Face ID 动效分解教程','daodaoup','四角框、发光线环与圆框笑脸之间的形变。','BV1B4421S7yH'],
    ['按钮的状态你能叫出几个？','KD一对A','一个按钮的六种状态，含真实加载锁和键盘焦点。','BV1LDsA6AEvD'],
    ['大厂 AI 界面的 5 个隐藏细节','KD一对A','确认候选词、暂停跟随、嵌套边框与圆角、分屏手势及文件后缀。','BV1jUnd66Em2'],
    ['少即是多：UI 设计中最大的谎言','Sajid · 一摩尔炸鸡翅转载','通过信息层级、搜索上下文和有效反馈降低判断成本。','BV112ge6NEYf'],
    ['50 种前端风格主义','MRDave先生','逐项切换中文风格卡，从配色、字形、排版和材质观察差异。','BV1pVKa6LEJF'],
    ['49 种前端 UI 通用风格','每周一个idea','在实际组件上比较通用风格及其交互特征。两份目录有重复条目。','BV1shVd6iEzs'],
    ['开源自己的动效 Skill','泡椒肥汤圆','日历、降噪与活动海报的连续镜头。','BV14ShR6jEiM'],
    ['色彩逻辑 · 色彩搭配教程合集','设计一点通','从屏幕与印刷混色入门，再调色环、采集场景色、调整面积，把色板用在词卡与海报上。','BV1nxW16xE8s'],
    ['顶级配色网站推荐','模型观察员','用本地样例体验浏览色卡、锁色生成及渐变预览。','BV11U4y1V74C'],
    ['现代终端配色：Catppuccin、Dracula 与 Starship','智子实验室清洁管理员','把主题色用于相同界面，并切换终端提示符的信息段。','BV1HhD3BbEUW']
  ];
  const specialMotion = new Set(['spring-flick','liquid-switch','face-id']);
  const providers = [window.AtlasStyles, window.AtlasMotion, window.AtlasDetails, window.AtlasPractice, window.AtlasStyleLab, window.AtlasFilm, window.AtlasColor];
  const registry = providers.flatMap(provider => provider.items.map(item => ({
    ...item, provider, group: item.group || (provider === window.AtlasStyles ? 'styles' : provider === window.AtlasMotion || specialMotion.has(item.id) ? 'motion' : 'principles')
  })));
  const order = ('button-states style-palette-50 color-balance one-take style-pattern-49 input-follow terminal-themes information-priority ' +
    'hsl-studio hue-wheel scene-palette palette-moods palette-picker gradient-studio nested-surfaces split-workspace search-context empty-progress ' +
    'swiss glass neo cyber brutal y2k minimal luxury material fluent apple bento dashboard nordic memphis aurora editorial ' +
    'theme-reveal reorder checklist snap-slider expand stepper ripple delete-arc card-stack tag-shift spring-flick liquid-switch face-id ' +
    'continuous-corner icon-grid visual-hierarchy type-rhythm').split(' ');
  const idx = new Map(order.map((id, i) => [id, i]));
  registry.sort((a,b) => (idx.get(a.id) ?? 99) - (idx.get(b.id) ?? 99));
  const byId = new Map(registry.map(v => [v.id,v]));
  const counts = Object.fromEntries(Object.keys(groups).map(k => [k, registry.filter(v => k === 'all' || k === v.group).length]));
  const features = [
    {id:'color-balance',en:'Color Balance',title:'配色面积与平衡',art:'<img class="fan-art" src="./assets/chromatic-fan.svg" alt="">'},
    {id:'continuous-corner',en:'Continuous Curvature',title:'连续曲率圆角',art:'<img class="sculpt" src="./assets/continuous.webp" alt="">'},
    {id:'glass',en:'Glassmorphism',title:'磨砂玻璃态',art:'<i class="glass-orb"></i><i class="hero-glass"></i>'},
    {id:'face-id',en:'Face ID Motion',title:'识别光环',art:'<i class="face-orbit"></i><i class="face-orbit o2"></i><i class="face-orbit o3"></i>'}
  ];
  let display = 'grid';
  try { if (localStorage.getItem('form-atlas-view') === 'list') display = 'list'; } catch (_) {}
  let activeGroup = 'all';
  let returnTo = '#index';
  let page = '';
  let featureNumber = 0;
  let cleanup = null;
  let searchOpener = null;
  const html = value => String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const sampleURL = (id,variant) => '#sample/' + id + (variant ? '/' + variant : '');
  const sourceLabel = n => (n > 9 ? '第二批' : '第一批') + ' · ' + String((n-1)%9+1).padStart(2,'0');
  const matchGroup = (item,key) => key === 'all' || (key === 'second' ? item.source > 9 : item.group === key);
  const refQueries = {'button-states':'t=103','nested-surfaces':'t=79','split-workspace':'t=127','search-context':'t=257','information-priority':'t=197','empty-progress':'t=347','one-take':'t=5','hsl-studio':'p=6','hue-wheel':'p=9','color-balance':'p=15','palette-moods':'p=17','gradient-studio':'t=39','terminal-themes':'t=32'};
  const related = {
    10:['stepper'],11:['continuous-corner'],12:['visual-hierarchy','type-rhythm'],
    13:['swiss','glass','neo','cyber','memphis','aurora'],
    14:['minimal','neo','glass','bento','y2k','editorial','aurora'],
    15:['theme-reveal'],16:['visual-hierarchy'],17:[],18:[]
  };
  const secondCount = registry.filter(it => it.source > 9).length;

  const indexURL = group => group === 'all' ? '#index' : '#index/' + group;
  const videoURL = number => 'https://www.bilibili.com/video/' + sourceList[number-1][3] + '/';
  const two = n => String(n).padStart(2,'0');
  function buildHero() {
    return '<section class="hero wrap" aria-labelledby="hero-heading"><div class="hero-copy"><div class="hero-kicker">UI 设计参考库</div><h1 id="hero-heading">界面视觉<em>效果图鉴</em></h1><p>把两批 18 支设计视频里的风格、配色与交互，变成 ' + registry.length + ' 个可以打开、比较和动手操作的界面样本。</p><div class="hero-actions"><a class="btn primary" href="#sources/2">' + icon('book') + '打开第二批演示</a><a class="btn" href="#compare/swiss/glass">' + icon('compare') + '风格对照</a></div></div><div class="feature" id="feature"></div></section>';
  }
  function paintFeature() {
    const container = document.querySelector('#feature');
    if (!container) return;
    const f = features[featureNumber];
    container.className = 'feature ' + f.id;
    container.innerHTML = '<div class="feature-stage"><div class="feature-grid"></div><i class="feature-mark m1"></i><i class="feature-mark m2"></i><div class="feature-art" aria-hidden="true">' + f.art + '</div></div>' +
      '<a class="feature-link" href="' + sampleURL(f.id) + '" aria-label="打开精选样本：' + f.title + '"><span class="feature-tag">精选样本 ' + two(featureNumber+1) + ' / ' + two(features.length) + '</span><span class="feature-open">' + icon('plus') + '</span><span class="feature-name"><strong>' + f.title + '</strong><small lang="en">' + f.en + '</small></span></a>' +
      '<div class="feature-pager" aria-label="切换精选样本">' + features.map((it,i) => '<button type="button" aria-label="展示' + it.title + '" aria-pressed="' + (featureNumber === i) + '" data-feature="' + i + '"></button>').join('') + '</div>';
  }
  function buildCatalog() {
    return '<section class="catalog wrap" id="catalog-section" aria-labelledby="catalog-title"><div class="section-title"><h2 id="catalog-title">效果索引</h2><span class="section-caption" id="counter"></span><div class="view-tools" aria-label="索引视图"><button type="button" data-view="grid" aria-label="网格视图">' + icon('grid') + '</button><button type="button" data-view="list" aria-label="列表视图">' + icon('list') + '</button></div></div><div class="toolbar"><div class="filter-row" aria-label="按类型筛选"></div></div><div id="cards" class="cards"></div></section>';
  }
  function paintCatalog() {
    const filtered = registry.filter(item => matchGroup(item, activeGroup));
    const row = document.querySelector('.filter-row');
    row.innerHTML = Object.entries({all:'全部',second:'第二批',...groups}).map(([key, label]) => '<a class="filter ' + (key === activeGroup ? 'active' : '') + '" href="' + indexURL(key) + '" ' + (key === activeGroup ? 'aria-current="true"' : '') + '>' + label + '<small>' + (key === 'second' ? secondCount : counts[key]) + '</small></a>').join('');
    if (row.scrollWidth > row.clientWidth) {
      const visible = row.getBoundingClientRect(), selected = row.querySelector('.active').getBoundingClientRect();
      if (selected.right > visible.right) row.scrollLeft += selected.right - visible.right;
      else if (selected.left < visible.left) row.scrollLeft += selected.left - visible.left;
    }
    document.querySelector('#counter').textContent = filtered.length + ' 个样本';
    document.querySelectorAll('[data-view]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.view === display)));
    const cards = document.querySelector('#cards');
    cards.className = 'cards' + (display === 'list' ? ' list' : '');
    cards.replaceChildren();
    const frag = document.createDocumentFragment();
    filtered.forEach(item => {
      const a = document.createElement('a');
      a.className = 'sample-card'; a.href = sampleURL(item.id);
      a.innerHTML = '<div class="art-slot" aria-hidden="true"></div><div class="card-foot"><strong>' + html(item.title) + '</strong><small lang="en">' + html(item.en) + '</small><span class="card-open">' + icon('plus') + '</span></div>';
      item.provider.thumb(item.id, a.firstElementChild);
      frag.append(a);
    });
    cards.append(frag);
  }
  function home(group, scrollIndex) {
    const isNew = page !== 'catalog';
    activeGroup = group; returnTo = indexURL(group);
    if (isNew) {
      main.innerHTML = buildHero() + buildCatalog();
      paintFeature();
    }
    page = 'catalog';
    paintCatalog();
    document.title = '形录 Form Atlas · 界面视觉效果图鉴';
    if (scrollIndex) requestAnimationFrame(() => document.querySelector('#catalog-section')?.scrollIntoView({block:'start'}));
    else window.scrollTo(0,0);
  }
  function detail(item,variantId) {
    page = 'sample';
    const same = registry.filter(it => it.group === item.group);
    const i = same.indexOf(item);
    const prev = same[(i+same.length-1)%same.length], next = same[(i+1)%same.length];
    const source = sourceList[item.source-1];
    const refQuery = item.refQuery || refQueries[item.id] || '';
    const original = videoURL(item.source) + (refQuery ? '?' + refQuery.replace(/^\?/, '') : '');
    const backLabel = returnTo.startsWith('#sources') ? '返回视频目录' : '返回效果索引';
    main.innerHTML = '<article class="wrap page"><a class="back" href="' + returnTo + '">' + icon('grid') + backLabel + '</a><div class="page-heading"><h1>' + html(item.title) + '</h1><p class="en" lang="en">' + html(item.en) + '</p></div>' +
      '<div class="detail-layout"><div><div id="demo" class="demo-host"></div><nav class="demo-neighbors" aria-label="同类样本"><a href="' + sampleURL(prev.id) + '"><small>上一个' + groups[item.group] + '</small>' + html(prev.title) + '</a><a href="' + sampleURL(next.id) + '"><small>下一个' + groups[item.group] + '</small>' + html(next.title) + '</a></nav></div>' +
      '<aside class="info-pane"><h2>观察要点</h2><p>' + html(item.summary) + '</p><div class="meta-tags">' + item.keywords.map(tag => '<span>' + html(tag) + '</span>').join('') + '</div><div class="info-block"><h3>参考视频 ' + sourceLabel(item.source) + '</h3><a class="video-link" href="' + original + '" target="_blank" rel="noopener noreferrer">' + html(source[0]) + icon('link') + '</a></div><div class="info-block"><a class="back" href="' + indexURL(item.group) + '">' + icon('grid') + '浏览全部' + groups[item.group] + '</a></div></aside></div></article>';
    if (item.group === 'styles') {
      const block = main.querySelector('.info-pane .info-block:last-child');
      const a = document.createElement('a');
      a.className='back compare-link'; a.href='#compare/' + item.id + '/' + next.id;
      a.innerHTML = icon('compare') + '与其他风格对照'; block.append(a);
    }
    if (item.source > 9) {
      const block = document.createElement('div'); block.className='info-block';
      block.innerHTML='<a class="back" href="#sources/2">' + icon('book') + '第二批视频目录</a>';
      main.querySelector('.info-pane').append(block);
    }
    const companionLinks = {
      'style-palette-50': [['作者的风格与色票目录', 'https://github.com/rxw2023/Front-end-Design-Styles']],
      'hsl-studio': [['第 2 讲 · RGB 模式', videoURL(16) + '?p=2'], ['第 3 讲 · CMYK 模式', videoURL(16) + '?p=3']]
    };
    for (const [label, url] of companionLinks[item.id] || []) {
      const link = document.createElement('a');
      link.className = 'video-link'; link.href = url;
      link.target = '_blank'; link.rel = 'noopener noreferrer';
      link.innerHTML = html(label) + icon('link'); main.querySelector('.info-block').append(link);
    }
    cleanup = item.provider.render(item.id, document.querySelector('#demo'), variantId);
    document.title = item.title + ' · 形录 Form Atlas';
    window.scrollTo(0,0);
  }
  function compare(leftId, rightId) {
    const catalogs = registry.filter(it => it.variants && it.provider.renderSpecimen);
    const lists = [{
      label:'第一批 · 独立风格样本',
      choices:registry.filter(it => it.group === 'styles').map(item => ({key:item.id, title:item.title,en:item.en,item}))
    }, ...catalogs.map(item => ({
      label:item.title,
      choices:item.variants.map(v => ({key:item.id+'~'+v.id,title:v.title,en:v.en,item,variant:v.id}))
    }))];
    const entries=new Map(lists.flatMap(list => list.choices.map(it=>[it.key,it])));
    const left = entries.get(leftId) || entries.get('swiss'), right = entries.get(rightId) || entries.get('glass');
    const current = [left,right], previous = page;
    page = 'compare';
    function panel(choice, i) {
      const side = i === 0 ? 'A' : 'B';
      const opts = lists.map(list=>'<optgroup label="'+html(list.label)+'">'+list.choices.map(it => '<option value="' + html(it.key) + '"' + (it.key === choice.key ? ' selected' : '') + '>' + html(it.title) + (it.en && it.title!==it.en ? ' / '+html(it.en):'') + '</option>').join('')+'</optgroup>').join('');
      return '<section class="comparison-panel"><div class="compare-select"><label for="style-' + side + '">样本 ' + side + '</label><select id="style-' + side + '">' + opts + '</select></div><div class="demo-host compared"></div><p>' + html(choice.variant?choice.item.title:choice.item.summary) + '</p><a class="back" href="' + sampleURL(choice.item.id,choice.variant) + '">' + icon('book') + '查看' + html(choice.title) + '样本</a></section>';
    }
    const focusedId = document.activeElement?.id;
    main.innerHTML = '<article class="wrap page"><a class="back" href="' + returnTo + '">' + icon('grid') + (returnTo.startsWith('#sources') ? '返回视频目录' : '返回效果索引') + '</a><div class="page-heading"><h1>风格对照</h1><p class="compare-intro">分别选择两个样本，比较字体、材质、配色与控件的反馈。在同一份目录里选择两项，可以对照相同的示例内容。</p></div><div class="comparison">' + current.map(panel).join('') + '</div></article>';
    const disposers=[];
    main.querySelectorAll('.comparison-panel').forEach((col,i) => {
      const {item,variant}=current[i];
      const specimen=col.querySelector('.compared');
      const dispose=variant ? item.provider.renderSpecimen(item.id,specimen,variant) : item.provider.render(item.id,specimen);
      if(typeof dispose==='function')disposers.push(dispose);
      col.querySelector('select').addEventListener('change', e => {
        const keys=current.map(it => it.key); keys[i] = e.target.value;
        location.hash='compare/' + keys.join('/');
      });
    });
    cleanup=()=>disposers.forEach(dispose=>dispose());
    document.title = left.title + ' × ' + right.title + ' · 形录 Form Atlas';
    if (previous !== 'compare') window.scrollTo(0,0);
    if (focusedId === 'style-A' || focusedId === 'style-B') document.getElementById(focusedId).focus({preventScroll:true});
  }
  function sourceCard(entry, number) {
    const demos = registry.filter(item => item.source === number);
    const recommended = (related[number] || []).map(id => byId.get(id)).filter(Boolean);
    const pills = items => items.map(item => '<a href="' + sampleURL(item.id) + '">' + html(item.title) + '</a>').join('');
    const article = document.createElement('article');
    article.className='source-card';
    const sample=demos[0];
    article.innerHTML = '<a class="source-cover" aria-label="体验' + html(sample.title) + '" href="' + sampleURL(sample.id) + '"></a><div class="source-body"><div class="source-by">' + sourceLabel(number) + ' · ' + html(entry[1]) + '</div><h2>' + html(entry[0]) + '</h2><p>' + html(entry[2]) + '</p><div class="source-pills">' + pills(demos) + '</div>' +
      (recommended.length ? '<details class="source-more"><summary>相关的已有样本 · ' + recommended.length + '</summary><div class="source-pills">' + pills(recommended) + '</div></details>' : '') +
      '<a class="video-link" href="' + videoURL(number) + '" target="_blank" rel="noopener noreferrer">观看原视频' + icon('link') + '</a></div>';
    sample.provider.thumb(sample.id,article.querySelector('.source-cover'));
    return article;
  }
  function sources(part) {
    page = 'sources';
    const batch = part === '1' || part === '2' ? part : 'all';
    returnTo = batch === 'all' ? '#sources' : '#sources/' + batch;
    main.innerHTML = '<article class="wrap page"><a class="back" href="#index">' + icon('grid') + '返回效果索引</a><div class="page-heading"><h1>' + (batch === '2' ? '第二批视频演示' : batch === '1' ? '第一批视频演示' : '视频来源') + '</h1></div><p class="sources-deck">选择视频下的样本即可在本页体验，原视频可另外打开。</p><nav class="source-tabs" aria-label="选择视频批次">' +
      [['all','全部 18 支'],['2','第二批 · 9 支'],['1','第一批 · 9 支']].map(([key,val]) => '<a class="filter ' + (key===batch?'active':'') + '" ' + (key===batch?'aria-current="page"':'') + ' href="#sources' + (key==='all'?'':'/'+key) + '">' + val + '</a>').join('') +
      '</nav><div id="source-groups"></div></article>';
    const container=document.querySelector('#source-groups');
    (batch==='all'?[2,1]:[Number(batch)]).forEach(n=>{
      const section=document.createElement('section');
      if(batch==='all')section.innerHTML='<h2 class="source-heading">'+(n===1?'第一批':'第二批')+'</h2>';
      const grid=document.createElement('div');grid.className='source-grid';
      sourceList.slice((n-1)*9,n*9).forEach((entry,i)=>grid.append(sourceCard(entry,(n-1)*9+i+1)));
      section.append(grid);container.append(section);
    });
    document.title = (batch==='2'?'第二批演示':'视频来源') + ' · 形录 Form Atlas';
    window.scrollTo(0,0);
  }
  function route(initial = false) {
    if (dialog.open) dialog.close();
    const [type,param,second] = location.hash.slice(1).split('/');
    if (typeof cleanup === 'function') cleanup();
    cleanup = null;
    const oldPage = page;
    if (type === 'sample' && byId.has(param)) detail(byId.get(param),second);
    else if (type === 'sources') sources(param);
    else if (type === 'compare') compare(param,second);
    else home(Object.hasOwn(groups,param) || param === 'second' ? param : 'all', type === 'index');
    document.querySelectorAll('[data-nav]').forEach(link => {
      const current = link.dataset.nav === (page === 'sources' ? 'sources' : 'index');
      link.classList.toggle('active', current);
      if (current) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
    });
    if (!initial && oldPage !== page) main.focus({preventScroll:true});
  }
  function paintSearch() {
    const q = searchInput.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    const matches = [];
    const matchesAll = text => q.every(word => text.toLowerCase().includes(word));
    for (const item of registry) {
      if (matchesAll([item.title,item.en,item.id,groups[item.group],...item.keywords,item.summary].join(' '))) {
        matches.push({title:item.title,en:item.en,url:sampleURL(item.id),label:groups[item.group]});
      }
      if(q.length && item.variants) {
        for(const variant of item.variants) {
          if(matchesAll([variant.title,variant.en,variant.id,...(variant.keywords || [])].join(' '))) {
            matches.push({title:variant.title,en:variant.en,url:sampleURL(item.id,variant.id),label:item.title});
          }
        }
      }
    }
    results.innerHTML = matches.length ? matches.map(match => '<a class="search-result" href="' + match.url + '"><strong>' + html(match.title) + '</strong><small lang="en">' + html(match.en) + '</small><i>' + html(match.label) + '</i></a>').join('') : '<p class="empty">没有匹配的样本。可以试试「圆角」「玻璃」或「回弹」。</p>';
    document.querySelector('#search-status').textContent = '找到 ' + matches.length + ' 个样本';
  }
  function openSearch() {
    if (dialog.open) return;
    searchOpener = document.activeElement;
    searchInput.value = ''; paintSearch(); dialog.showModal(); searchInput.focus();
  }
  searchInput.addEventListener('input', paintSearch);
  dialog.addEventListener('close', () => { if (searchOpener?.isConnected) searchOpener.focus({preventScroll:true}); });
  dialog.addEventListener('click', e => {
    if (e.target === dialog) { const r=dialog.getBoundingClientRect(); if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom) dialog.close(); }
    const link = e.target.closest('.search-result');
    if (link && link.hash === location.hash) dialog.close();
  });
  dialog.addEventListener('keydown', e => {
    if (e.key === 'Enter' && e.target === searchInput) { const first = results.querySelector('a'); if (first) {e.preventDefault();first.click();} }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      const all = [...results.querySelectorAll('a')]; if (!all.length) return;
      const i = all.indexOf(document.activeElement);
      e.preventDefault();
      if (i === 0 && e.key === 'ArrowUp') searchInput.focus();
      else all[e.key === 'ArrowDown' ? Math.min(i+1,all.length-1) : Math.max(0,i-1)].focus();
    }
  });
  document.addEventListener('keydown', e => {
    const typing = e.target.closest('input, textarea, select, [contenteditable]');
    if ((e.key === '/' && !typing && !e.ctrlKey && !e.metaKey) || ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k')) {e.preventDefault();openSearch();}
  });
  document.addEventListener('click', e => {
    const button = e.target.closest('button,a');
    if (!button) return;
    if (button.classList.contains('skip-link')) { e.preventDefault(); main.focus(); return; }
    if (button.hasAttribute('data-search')) openSearch();
    if (button.hasAttribute('data-close-search')) dialog.close();
    if (button.hasAttribute('data-top')) {window.scrollTo(0,0);document.querySelector('.brand').focus({preventScroll:true});}
    if (button.hasAttribute('data-feature')) {
      featureNumber = Number(button.dataset.feature); paintFeature();
      if (e.detail === 0) document.querySelector('[data-feature="' + featureNumber + '"]').focus();
    }
    if (button.hasAttribute('data-view')) {
      display = button.dataset.view; try {localStorage.setItem('form-atlas-view',display);} catch (_) {}
      paintCatalog();
    }
    if (button.matches('a') && button.hash && button.getAttribute('href') === location.hash) {
      if (location.hash.startsWith('#index')) document.querySelector('#catalog-section')?.scrollIntoView();
      if (location.hash === '#home' || location.hash === '#sources') window.scrollTo(0,0);
    }
  });
  window.addEventListener('hashchange', () => route());
  route(true);
})();
