(() => {
  'use strict';
  const {entries, base, license, tailwindLicense} = window.AtlasGalaxyIndex;
  const categories = ['按钮','卡片','加载动画','切换开关','输入框','表单','复选框','背景纹理','单选按钮','提示气泡','通知'];
  const english = ['Buttons','Cards','Loaders','Toggle switches','Inputs','Forms','Checkboxes','Patterns','Radio buttons','Tooltips','Notifications'];
  const aliases = {
    '霓虹':'neon','渐变':'gradient','玻璃':'glass','像素':'pixel','悬停':'hover','阴影':'shadow','极简':'minimal',
    '动画':'anim','立体':'3d','旋转':'spin','发送':'send','登录':'login','搜索':'search','暗色':'dark',
    '圆角':'rounded','发光':'glow','收藏':'like','下载':'download','红色':'red','绿色':'green','蓝色':'blue'
  };
  const items = [{id:'galaxy-browser',title:'Galaxy 组件库',en:'Uiverse Galaxy',summary:'浏览 Uiverse 的 3,802 份 HTML/CSS 组件。按类别、作者或原始标签筛选，在不同底色上操作原作，并展开查看每一件的源代码。',keywords:['Uiverse','Galaxy','开源组件','CSS','Tailwind','按钮','加载','输入','切换','源码'],group:'components',source:'galaxy'}];
  const sources = [{bv:'galaxy',title:'Galaxy 开源组件库',author:'Uiverse.io 社区',summary:'11 类原创社区组件，按 MIT 许可收录。',url:'https://github.com/uiverse-io/galaxy'}];
  const byId=new Map(entries.map(row=>[row[0],row]));
  const byCategory=categories.map((_,i)=>entries.filter(row=>row[1]===i));
  const featured = new Map([
    ['switches~Galahhad_strong-squid-82','日月云层开关'],
    ['buttons~AlimurtuzaCodes_average-liger-0','星光渐变按钮'],
    ['cards~Codewithvinay_afraid-dodo-14','磨砂玻璃卡片'],
    ['loaders~VashonG_hard-sheep-18','轨道加载动画'],
    ['inputs~Cobp_lazy-frog-59','双色阴影搜索框'],
    ['patterns~AspenBranch_thin-bulldog-22','棋盘格纹理']
  ]);
  const mixed=[...featured.keys()].map(key=>byId.get(key)).filter(Boolean);
  for(let i=0;i<Math.max(...byCategory.map(a=>a.length));i++)for(const rows of byCategory)if(i<rows.length&&!featured.has(rows[i][0]))mixed.push(rows[i]);
  const textIndex = new Map(entries.map(row => [row[0],[...row.slice(2,6),row[0],featured.get(row[0])||'',categories[row[1]],english[row[1]]].join(' ').toLowerCase()]));
  function queryRows(term,category,limit=Infinity){
    const terms=String(term).trim().toLowerCase().split(/\s+/).filter(Boolean);
    const result=[];
    for (const row of category<0?mixed:byCategory[category]){
      const text=textIndex.get(row[0]);
      if(terms.every(t=>text.includes(t)||(aliases[t]&&text.includes(aliases[t])))){
        result.push(row);if(result.length===limit)break;
      }
    }
    return result;
  }
  function titleOf(row){
    if(featured.has(row[0]))return featured.get(row[0]);
    const words=row[5];return words?(words.length>39?words.slice(0,38)+'…':words):row[3].replace(/-/g,' ');
  }
  function search(term,limit=12){
    if(!term.trim() || limit<1)return [];
    return queryRows(term,-1,limit).map(row=>({id:row[0],title:titleOf(row),en:row[2]+' · '+categories[row[1]]}));
  }
  const stageColors={light:'#f1f1ed',gray:'#a6aaa9',dark:'#242730'};
  const packs=window.AtlasGalaxyPacks ||= Object.create(null);
  const pending = new Map();
  function load(row){
    const n=row[6];
    if(packs[n])return Promise.resolve(packs[n][row[0]]);
    if(!pending.has(n)){
      const script=document.createElement('script');
      script.src='./galaxy/packs/g'+String(n).padStart(2,'0')+'.js';
      const ready=new Promise((resolve,reject)=>{
        script.onload=()=>packs[n]?resolve():reject(new Error('数据分片不可用'));
        script.onerror=()=>reject(new Error('数据分片不可用'));
      });
      pending.set(n,ready);
      ready.then(()=>script.remove(),()=>{pending.delete(n);script.remove();});
      document.head.append(script);
    }
    return pending.get(n).then(()=>packs[n][row[0]]);
  }
  function defaultTone(row){
    const tags=row[4].toLowerCase();
    return tags.includes('dark')&&!tags.includes('light')?'dark':'light';
  }
  function specimen(frame,payload){
    const [raw,utility,safe=raw]=payload;
    const original=utility?'<style>'+base+'\n'+utility+'</style>':'';
    const motion='@media(prefers-reduced-motion:reduce){*,*::before,*::after{animation-duration:.001ms!important;animation-iteration-count:1!important;transition-duration:.001ms!important}}';
    const geometry='html{height:100%;background:transparent}body{box-sizing:border-box;margin:0;min-height:100%;height:100%;display:flex;align-items:safe center;justify-content:safe center;font:16px/1.35 system-ui,sans-serif}body>*{flex-shrink:0}body>style{display:none}button,input,textarea,select{font-family:inherit}';
    frame.srcdoc='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src \'none\'; style-src \'unsafe-inline\'; img-src data:; font-src data:; base-uri \'none\'; form-action \'none\'"><meta name="color-scheme" content="only light"><style>' +geometry+'</style>'+original+'</head><body>'+safe+'<style>'+motion+'</style></body></html>';
  }
  function makeFrame(title,mini=false){
    const f=document.createElement('iframe');
    f.title=title;f.setAttribute('sandbox','');f.referrerPolicy='no-referrer';
    if(mini){f.tabIndex=-1;f.setAttribute('aria-hidden','true');}
    return f;
  }
  function el(tag,className,text){
    const node=document.createElement(tag);if(className)node.className=className;
    if(text!==undefined)node.textContent=text;return node;
  }
  function render(id,host,variant){
    const root=el('section','gx-lab');
    root.innerHTML='<div class="gx-focus"><header><div><span class="gx-by"></span><h3></h3></div><a class="gx-permalink">此组件链接 ↗</a></header><div class="gx-screen"></div><div class="gx-bar"><div class="gx-tones" aria-label="预览底色"><span>底色</span></div><label>缩放 <select class="gx-zoom"><option value="40">40%</option><option value="50">50%</option><option value="75">75%</option><option value="100" selected>100%</option><option value="125">125%</option></select></label></div><p class="gx-desc"></p><div class="gx-tags"></div><details class="gx-source"><summary>查看组件原始 HTML / CSS</summary><pre tabindex="0"></pre></details></div><div class="gx-explore"><h3>浏览组件</h3><div class="gx-filters"><label>搜索<input type="search" placeholder="作者、标签或组件文字" autocomplete="off"></label><label>类别<select class="gx-cat"></select></label></div><div class="gx-nav"><span class="gx-count" aria-live="polite"></span><div><button type="button" data-act="prev" aria-label="上一页组件">上一页</button><label class="gx-page"><input type="number" min="1" step="1" aria-label="跳到组件结果第几页"><span></span></label><button type="button" data-act="next" aria-label="下一页组件">下一页</button></div></div><div class="gx-grid"></div></div><details class="gx-lic"><summary>来源和开源许可</summary><a href="https://github.com/uiverse-io/galaxy" target="_blank" rel="noopener noreferrer">Uiverse / Galaxy ↗</a><pre></pre></details>';
    host.replaceChildren(root);
    const q=s=>root.querySelector(s);
    const category=q('.gx-cat'), input=q('input'), grid=q('.gx-grid'), screen=q('.gx-screen');
    category.add(new Option('全部 · '+entries.length,'-1'));
    categories.forEach((name,i)=>category.add(new Option(name+' · '+byCategory[i].length,i)));
    q('.gx-lic pre').textContent=license+'\nTailwind CSS\n\n'+tailwindLicense;
    const size=6;
    let index=0, rows=mixed, selected=byId.get(variant)||rows[0], payload=null, tone=defaultTone(selected),alive=true;
    let gridEpoch=0, pickEpoch=0;
    const tones=Object.keys(stageColors).map((key,i)=>{
      const b=el('button','gx-tone',['浅','灰','深'][i]);b.type='button';
      b.style.setProperty('--swatch',stageColors[key]);b.onclick=()=>{tone=key;styleFocus();};
      q('.gx-tones').append(b);return b;
    });
    function styleFocus(){
      const scale=Number(q('.gx-zoom').value)/100;
      screen.style.setProperty('--gx-scale',String(scale));
      screen.style.setProperty('--gx-extent',(100/scale)+'%');
      screen.style.backgroundColor=stageColors[tone];
      tones.forEach((b,i)=>b.setAttribute('aria-pressed',String(Object.keys(stageColors)[i]===tone)));
    }
    function drawFocus(){
      if(!alive||!payload)return;
      const f=makeFrame('交互预览 · '+selected[2]+' / '+selected[3]);
      styleFocus();screen.replaceChildren(f);specimen(f,payload);
    }
    function sourceCode(){
      if(q('.gx-source').open && payload)q('.gx-source pre').textContent=payload[0];
    }
    function pick(row,link){
      selected=row;tone=defaultTone(row);payload=null;
      const epoch=++pickEpoch;
      const href='#sample/galaxy-browser/'+row[0];
      q('.gx-permalink').href=href;
      if(link && location.hash!==href){
        try{history.replaceState(history.state,'',href);}catch{location.hash=href;}
      }
      q('.gx-by').textContent=categories[row[1]]+' / '+row[2];q('.gx-focus h3').textContent=titleOf(row);
      q('.gx-desc').textContent=row[3]+(row[7]?' · 原作引用外部图片，此处用本地插画替代。':'');
      q('.gx-tags').replaceChildren(...row[4].split(',').map(t=>t.trim()).filter(Boolean).slice(0,8).map(t=>el('span','',t)));
      q('.gx-source pre').textContent='';screen.textContent='正在打开组件…';
      grid.querySelectorAll('.gx-card').forEach(c=>c.setAttribute('aria-pressed',String(c.dataset.slug===row[0])));
      load(row).then(value=>{
        if(!alive||epoch!==pickEpoch)return;payload=value;drawFocus();sourceCode();
      }).catch(()=>{if(alive&&epoch===pickEpoch)screen.textContent='这份组件的数据文件未能读取。请检查 galaxy/packs 文件夹是否完整。';});
    }
    function results(){
      rows=queryRows(input.value,Number(category.value));index=0;renderGrid();
    }
    function renderGrid(){
      const epoch=++gridEpoch;
      grid.replaceChildren();
      const pages=Math.ceil(rows.length/size);
      q('.gx-count').textContent=rows.length.toLocaleString('en-US')+' 个结果';
      const pageField=q('.gx-page input');pageField.max=Math.max(1,pages);pageField.disabled=!pages;pageField.value=pages?index+1:'';
      q('.gx-page span').textContent='/ '+pages;
      q('[data-act=prev]').disabled=index===0;q('[data-act=next]').disabled=index+1>=pages;
      if(!rows.length){grid.append(el('p','gx-empty','没有匹配的组件。可以试试「渐变」、hover 或作者名。'));return;}
      for(const row of rows.slice(index*size,index*size+size)){
        const card=el('div','gx-entry'),box=el('div','gx-mini'),open=el('button','gx-card');
        open.type='button';open.dataset.slug=row[0];open.setAttribute('aria-pressed',String(row===selected));
        const f=makeFrame(titleOf(row),true);box.style.backgroundColor=stageColors[defaultTone(row)];box.append(f);
        open.append(el('strong','',titleOf(row)),el('span','',categories[row[1]]+' · '+row[2]));
        card.append(box,open);grid.append(card);
        open.onclick=()=>{pick(row,true);q('.gx-focus').scrollIntoView({block:'start'});};
        load(row).then(v=>{if(alive&&epoch===gridEpoch)specimen(f,v);}).catch(()=>{if(alive&&epoch===gridEpoch)box.textContent='预览文件缺失';});
      }
    }
    q('.gx-source').ontoggle=sourceCode;q('.gx-zoom').onchange=styleFocus;
    q('[data-act=prev]').onclick=()=>{if(index>0){index--;renderGrid();}};
    q('[data-act=next]').onclick=()=>{if((index+1)*size<rows.length){index++;renderGrid();}};
    const jump=q('.gx-page input');
    const goToPage=()=>{if(!rows.length)return;index=Math.min(Math.max(Math.round(Number(jump.value)||1),1),Math.ceil(rows.length/size))-1;renderGrid();};
    jump.onchange=goToPage;jump.onkeydown=e=>{if(e.key==='Enter'){e.preventDefault();goToPage();}};
    category.onchange=results;input.oninput=results;
    if(byId.has(variant)){category.value=selected[1];rows=byCategory[selected[1]];index=Math.floor(rows.indexOf(selected)/size);}
    renderGrid();pick(selected,false);
    return ()=>{alive=false;};
  }
  function thumb(id,host){
    const preview=el('div','gx-thumb');
    preview.setAttribute('aria-hidden','true');
    preview.innerHTML='<div class="gx-object"><i></i><i></i><i></i><i></i><i></i></div>';
    host.replaceChildren(preview);
  }
  window.AtlasGalaxy={items,sources,search,render,thumb};
})();
