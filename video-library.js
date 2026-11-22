(() => {
  'use strict';

  const planner = 'BV1xb421v7Hf', toggle = 'BV184BrB8E4N';
  const sources = [
    {bv:planner,title:'4K 微软毛玻璃 UI 三维动画设计 Microsoft',author:'zihecg紫鹤动画',summary:'Planner 影片把任务条、彩球、按成员分列的协作看板、进度轨道与折带放进粉紫色的三维空间。'},
    {bv:toggle,title:'无废话！14分钟用纯CSS实现超精致的拟物化主题切换动画！',author:'林想的Web工坊',summary:'用内阴影、光晕、双层云、月坑和星点画出昼夜，再用语义控件与本地存储管理开关状态。'}
  ];
  const items = [
    {id:'planner-glass',title:'悬浮任务条与磨砂玻璃',en:'Frosted task layers',group:'principles',source:planner,refQuery:'t=9',keywords:['微软','Planner','毛玻璃','磨砂','亚克力','悬浮','纵深','三维','粉紫'],summary:'影片约 9–19 秒展示悬浮任务条，21–35 秒切到按成员分列的看板。调节磨砂、间距与视角，再把同一张任务卡转交其他成员，观察各列的完成比例。'},
    {id:'planner-flow',title:'进度轨道与折带转场',en:'Tracks and ribbons',group:'motion',source:planner,refQuery:'t=36',keywords:['微软','Planner','轨道','色带','折带','任务','Copilot','状态','转场'],summary:'影片约 36–43 秒用小球沿平行轨道传达进度，45–57 秒用折带引出任务。两段独立演示都可拖动时间轴，追踪状态和卡片的来源。'},
    {id:'sky-theme-switch',title:'云层、月坑与昼夜开关',en:'Daylight switch',group:'motion',source:toggle,keywords:['拟物','昼夜','开关','主题','纯 CSS','云朵','月球','阴影','键盘','持久化'],summary:'把云层、太阳光晕和月坑拆开看，再比较 CSS 复选框与可记忆状态的语义开关。移动方式可以切换为 transform 或 left，观察同一条空间路径。'}
  ];
  let nextId=0;
  const uid=()=> 'v3vid'+(++nextId);
  const clamp=(n,min=0,max=1)=>Math.max(min,Math.min(max,n));
  const blend=(a,b,t)=>a+(b-a)*t;
  const smooth=t=>{t=clamp(t);return t*t*(3-2*t);};
  const range=(label,key,start,end,value,unit)=>'<label class="vd-range"><span>'+label+'</span><input type="range" data-r="'+key+'" min="'+start+'" max="'+end+'" value="'+value+'"><output>'+value+unit+'</output></label>';
  const action=(label,key)=>'<button type="button" class="vd-act" data-a="'+key+'">'+label+'</button>';
  function mount(host,kind,html) {
    const el=document.createElement('div');el.className='vd-lab vd-'+kind;el.innerHTML=html;host.replaceChildren(el);
    return el;
  }
  function bindRange(el,key,unit,fn) {
    const input=el.querySelector('[data-r="'+key+'"]');
    input.addEventListener('input',()=>{input.nextElementSibling.value=input.value+unit;fn(Number(input.value));});
    return input;
  }
  function glass(host){
    const labels=['整理访问记录','更新界面原型','准备可用性访谈'];
    const tabs='<div class="vd-tabs vd-actions">'+action('悬浮任务条','strips')+action('协作看板','board')+'</div>';
    const el=mount(host,'glass',tabs+'<div class="vd-gl-stage"><div class="vd-gl-back"></div><div class="vd-gl-box"><i class="vd-gl-orb vd-o1"></i><i class="vd-gl-orb vd-o2"></i><i class="vd-gl-orb vd-o3"></i><i class="vd-gl-orb vd-o4"></i><span class="vd-gl-floor"></span><div class="vd-gl-cards">'+labels.map((name,i)=>'<button class="vd-gl-card" type="button" aria-pressed="'+(i===0)+'" style="--i:'+i+'"><span class="vd-gl-check" aria-hidden="true"></span><b>'+name+'</b><small>'+['设计','产品','研究'][i]+'</small></button>').join('')+'</div><i class="vd-gl-orb vd-o5"></i></div></div>'+
      '<div class="vd-tools">'+range('磨砂强度','frost',0,20,9,'px')+range('任务条间距','space',0,100,53,'%')+range('镜头角度','angle',-16,16,-6,'°')+
      '<div class="vd-actions">'+action('移动后景彩球','move')+'<span>点任务条可切换完成状态。</span></div></div>');
    const stage=el.querySelector('.vd-gl-stage');
    function apply(k,v){stage.style.setProperty(k,v);}
    function spacing(n){apply('--spread',(0.08+n*.0028).toFixed(3));}
    spacing(53);
    bindRange(el,'space','%',spacing);bindRange(el,'frost','px',v=>apply('--frost',v+'px'));
    bindRange(el,'angle','°',v=>{apply('--yaw',v+'deg');apply('--roll',v/2+'deg');});
    const team=['林','周','陆','陶'];
    const tasks=[...labels,'发送周报','归档访谈'].map((title,i)=>({title,person:[0,2,1,3,0][i],done:i===0||i===3}));
    const board=document.createElement('div');board.className='vd-board';board.hidden=true;
    board.innerHTML='<div class="vd-board-scene"><div class="vd-board-plane"><header><b>团队任务</b>'+action('查看成员','members')+'</header><div class="vd-members" hidden></div><div class="vd-columns"></div></div></div><div class="vd-tools"><label class="vd-choice"><span>转交所选任务</span><select aria-label="选择负责人">'+team.map((name,i)=>'<option value="'+i+'">'+name+' · '+['设计','研究','产品','内容'][i]+'</option>').join('')+'</select></label><p class="vd-sky-note" aria-live="polite"></p></div>';
    stage.insertAdjacentElement('afterend',board);
    const glassTools=el.querySelector(':scope > .vd-tools');
    const select=board.querySelector('select'), roster=board.querySelector('.vd-members'), members=board.querySelector('[data-a=members]');
    const cols=board.querySelector('.vd-columns'), indicators=el.querySelectorAll('.vd-gl-card');
    let selected=0;
    roster.textContent=team.map((name,i)=>name+' · '+['设计','研究','产品','内容'][i]).join('　');
    members.setAttribute('aria-expanded','false');
    members.onclick=()=>{roster.hidden=!roster.hidden;members.setAttribute('aria-expanded',String(!roster.hidden));};
    function paintBoard(){
      cols.innerHTML=team.map((name,i)=>{
        const own=tasks.filter(t=>t.person===i),done=own.filter(t=>t.done).length;
        return '<section class="vd-bcol"><h4><span>'+name+'</span> '+['设计','研究','产品','内容'][i]+'</h4><i class="vd-complete-bar"><b style="width:'+(own.length?100*done/own.length:0)+'%"></b></i><small>已完成 '+done+' / '+own.length+'</small><div class="vd-btasks">'+tasks.map((t,j)=>t.person===i?'<button type="button" data-task="'+j+'" aria-pressed="'+(selected===j)+'"><i class="'+(t.done?'done':'')+'" aria-label="'+(t.done?'已完成':'待办')+'"></i>'+t.title+'</button>':'').join('')+'</div></section>';
      }).join('');
      select.value=String(tasks[selected].person);
      board.querySelector('.vd-sky-note').textContent='已选「'+tasks[selected].title+'」，当前负责人为'+team[tasks[selected].person]+'。';
    }
    cols.onclick=e=>{const btn=e.target.closest('[data-task]');if(!btn)return;selected=Number(btn.dataset.task);paintBoard();cols.querySelector('[data-task="'+selected+'"]').focus({preventScroll:true});};
    select.onchange=()=>{tasks[selected].person=Number(select.value);paintBoard();};
    function view(name){
      stage.hidden=glassTools.hidden=name!=='strips';board.hidden=name!=='board';
      ['strips','board'].forEach(id=>el.querySelector('[data-a="'+id+'"]').setAttribute('aria-pressed',String(name===id)));
      if(!board.hidden)paintBoard();
    }
    el.querySelector('[data-a=strips]').onclick=()=>view('strips');el.querySelector('[data-a=board]').onclick=()=>view('board');
    indicators.forEach((btn,i)=>{btn.onclick=()=>{tasks[i].done=!tasks[i].done;btn.setAttribute('aria-pressed',String(tasks[i].done));};});
    view('strips');
    const move=el.querySelector('[data-a="move"]');
    move.setAttribute('aria-pressed','false');
    move.onclick=()=>{const alt=stage.classList.toggle('vd-shift');move.setAttribute('aria-pressed',String(alt));};
  }

  function tracksSVG(key){
    const lanes=[
      {y:71,inside:55,colors:['#c46fd0','#812281'],label:'素材就绪'},
      {y:134,inside:120,colors:['#f9a5bd','#c13075'],label:'设计审核'},
      {y:197,inside:185,colors:['#54b9ea','#3447a9'],label:'交付检查'}
    ];
    return '<svg class="vd-flow-canvas" viewBox="0 0 640 265" role="img" aria-label="三个彩球沿弯曲轨道移动到各自的状态卡"><defs>'+
      lanes.map((l,i)=>'<radialGradient id="'+key+'b'+i+'" cx=".27" cy=".2" r=".86"><stop stop-color="white"/><stop offset=".36" stop-color="'+l.colors[0]+'"/><stop offset="1" stop-color="'+l.colors[1]+'"/></radialGradient><linearGradient id="'+key+'t'+i+'" x2="0.8" y2="1"><stop stop-color="#fff"/><stop offset=".55" stop-color="'+l.colors[0]+'"/><stop offset="1" stop-color="'+l.colors[1]+'"/></linearGradient>').join('')+'</defs>'+
      lanes.map((l,i)=>{
        const d='M 26 '+(l.y+39)+' C 86 '+(l.y+39)+' 96 '+(l.y+39)+' 137 '+(l.y+39)+' S 215 '+(l.y+39)+' 230 '+(l.y+14)+' S 254 '+(l.inside-10)+' 297 '+(l.inside-10)+' L 445 '+(l.inside-10);
        return '<g><path d="'+d+'" transform="translate(0,8)" fill="none" stroke="#68345b" stroke-opacity=".21" stroke-width="25"/><path class="vd-lane" d="'+d+'" fill="none" stroke="url(#'+key+'t'+i+')" stroke-width="27"/><path d="'+d+'" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="2"/><g class="vd-track-label" transform="translate(444,'+(l.inside-28)+')"><rect y="4" width="153" height="43" rx="8" fill="'+l.colors[1]+'" opacity=".46"/><rect width="153" height="43" rx="8" fill="url(#'+key+'t'+i+')"/><rect x="12" y="13" width="16" height="16" rx="8" fill="#fff"/><path class="vd-status-check" d="m15 21 3 3 6-7" fill="none" stroke="'+l.colors[1]+'" stroke-width="2.5"/><text x="38" y="28" fill="#261a37" font-size="20" font-weight="650">'+l.label+'</text></g><g class="vd-bead"><ellipse cy="13" rx="16" ry="5" fill="#341936" opacity=".22"/><circle r="15" fill="url(#'+key+'b'+i+')"/></g></g>';
      }).join('')+'</svg>';
  }
  const ribbonColors=[['#64dfed','#2372c9','#143696'],['#9890fb','#8150d9','#4b348e'],['#ff9bb9','#e26895','#a63a7a']];
  const ribbonTasks=['整理调研摘要','更新项目排期','发出会议邀请'];
  function ribbonSVG(key) {
    return '<svg class="vd-flow-canvas" viewBox="0 0 640 265" role="img" aria-label="三段有颜色的折带展开引出三张任务卡"><defs>'+ribbonColors.map((c,i)=>'<linearGradient id="'+key+'r'+i+'" x1="0" y1="0" x2="0.55" y2="1"><stop stop-color="'+c[0]+'"/><stop offset=".5" stop-color="'+c[1]+'"/><stop offset="1" stop-color="'+c[2]+'"/></linearGradient>').join('')+'</defs><path d="M80 228 C178 210 298 210 382 226 S513 238 558 221" fill="none" stroke="#d1b3d6" stroke-width="2"/>'+
      ribbonColors.map((c,i)=>'<g class="vd-ribbon"><path class="vd-fold-back" fill="'+c[2]+'"/><path class="vd-fold-front" fill="url(#'+key+'r'+i+')"/><path class="vd-fold-lit" stroke="'+c[0]+'" stroke-width="2.7" fill="none"/><g class="vd-task"><rect x="2" y="4" width="189" height="38" rx="6" fill="#5f3d70" opacity=".17"/><rect width="189" height="38" rx="6" fill="#fffcfe" fill-opacity=".94"/><circle cx="18" cy="19" r="7" stroke="'+c[2]+'" fill="none" stroke-width="2"/><text x="35" y="25" font-size="18" fill="#432c4d">'+ribbonTasks[i]+'</text></g></g>').join('')+'</svg>';
  }
  function flow(host) {
    const key=uid();
    const el=mount(host,'flow','<div class="vd-flow-surface"><div class="vd-flow-art"></div><span class="vd-flow-state"></span></div><div class="vd-tools"><div class="vd-actions">'+action('进度轨道','tracks')+action('折带任务','ribbon')+'</div>'+range('时间轴','time',0,100,25,'%')+'<div class="vd-actions">'+action('播放','play')+action('回到开头','reset')+'</div></div>');
    const art=el.querySelector('.vd-flow-art'), state=el.querySelector('.vd-flow-state');
    const a=k=>el.querySelector('[data-a="'+k+'"]');
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
    let mode='',t=.25,frame=0,last=null,paths=[],beads=[],checks=[],folds=[];
    const input=bindRange(el,'time','%',v=>{stop();t=v/100;paint();});
    function stop(){if(frame)cancelAnimationFrame(frame);frame=0;last=null;}
    function updatePlay(){a('play').textContent=reduced.matches?'下一阶段':frame?'暂停':t>=1?'重播':'播放';}
    function paint(){
      if(mode==='tracks'){
        paths.forEach(({path,length},i)=>{
          const u=smooth((t-i*.1)/.78),pos=path.getPointAtLength(u*length);
          beads[i].setAttribute('transform','translate('+pos.x+' '+(pos.y-8)+')');
          checks[i].style.opacity=u>.98?'1':'0';
        });
      }else folds.forEach((g,i)=>{
        const u=smooth((t-i*.12)/.72),x=132+i*13,y=40+i*65,w=111+u*103,bend=24*(1-u)+5;
        g.querySelector('.vd-fold-back').setAttribute('d','M'+x+' '+(y+14)+' Q'+(x-32)+' '+(y+21)+' '+(x-2)+' '+(y+44)+' L'+(x+w-8)+' '+(y+40)+' Q'+(x+w+24)+' '+(y+27)+' '+(x+w)+' '+(y+12)+' Z');
        g.querySelector('.vd-fold-front').setAttribute('d','M'+x+' '+y+' C'+(x+18)+' '+(y+bend)+' '+(x+w-14)+' '+(y-bend)+' '+(x+w)+' '+y+' Q'+(x+w+17)+' '+(y+10)+' '+(x+w+5)+' '+(y+25)+' C'+(x+w-24)+' '+(y+25-bend)+' '+(x+16)+' '+(y+25+bend)+' '+(x-4)+' '+(y+25)+' Q'+(x-17)+' '+(y+18)+' '+x+' '+y+' Z');
        g.querySelector('.vd-fold-lit').setAttribute('d','M'+x+' '+y+' C'+(x+18)+' '+(y+bend)+' '+(x+w-14)+' '+(y-bend)+' '+(x+w)+' '+y);
        const task=g.querySelector('.vd-task');
        task.setAttribute('transform','translate('+blend(x+27,355+11*i,u)+' '+(y-5)+')');
        task.style.opacity=clamp((u-.12)/.7);
      });
      state.textContent=mode==='tracks'?[ '任务进入轨道','沿轨道推进','状态就绪' ][t<.28?0:t<.975?1:2]:['彩带折叠','拉开折面','任务卡展开'][t<.26?0:t<.91?1:2];
      input.value=Math.round(t*100);input.nextElementSibling.value=input.value+'%';updatePlay();
    }
    function scene(next){
      stop();mode=next;t=.25;
      ['tracks','ribbon'].forEach(k=>a(k).setAttribute('aria-pressed',String(mode===k)));
      art.innerHTML=mode==='tracks'?tracksSVG(key):ribbonSVG(key);
      paths=[...art.querySelectorAll('.vd-lane')].map(path=>({path,length:path.getTotalLength()}));
      beads=[...art.querySelectorAll('.vd-bead')];checks=[...art.querySelectorAll('.vd-status-check')];folds=[...art.querySelectorAll('.vd-ribbon')];paint();
    }
    function tick(ts){if(last!==null)t=clamp(t+(ts-last)/3800);last=ts;if(t>=1)stop();else frame=requestAnimationFrame(tick);paint();}
    a('tracks').onclick=()=>scene('tracks');a('ribbon').onclick=()=>scene('ribbon');
    a('play').onclick=()=>{
      if(reduced.matches){stop();t=t<.45?.5:t<1?1:0;paint();return;}
      if(frame){stop();updatePlay();return;}if(t>=1)t=0;frame=requestAnimationFrame(tick);updatePlay();
    };
    a('reset').onclick=()=>{stop();t=0;paint();};
    const prefChange=()=>{stop();updatePlay();};reduced.addEventListener('change',prefChange);
    scene('tracks');
    return ()=>{stop();reduced.removeEventListener('change',prefChange);};
  }
  const switchArt=()=>'<span aria-hidden="true" class="vd-track"><span class="vd-halos"><i></i><i></i><i></i></span><span class="vd-stars"><i></i><i></i><i></i><i></i><i></i></span><span class="vd-clouds vd-cloud-back"></span><span class="vd-clouds vd-cloud-front"></span><span class="vd-carriage"><span class="vd-sun"><span class="vd-moon"><i></i><i></i><i></i></span></span></span></span>';
  function sky(host){
    const key='form-atlas-sky-theme-demo';
    let remembered=false,canStore=true;
    try{remembered=localStorage.getItem(key)==='night';}catch{canStore=false;}
    const el=mount(host,'sky','<div class="vd-sky-stage" data-mode="js"><div class="vd-sky-card"><div class="vd-sky-head"><span>Wordbook</span><span class="vd-dot-label"><i></i> 词卡预览</span></div><div class="vd-sky-center"><label class="vd-switch vd-native-wrap" hidden><input class="vd-native" type="checkbox" aria-label="夜间模式">'+switchArt()+'</label><button type="button" class="vd-switch vd-js" role="switch" aria-label="夜间模式">'+switchArt()+'</button></div><div class="vd-word"><b>twilight</b><span>晨昏微光</span></div></div></div>'+
      '<div class="vd-tools"><label class="vd-choice"><span>开关方式</span><select data-select="mode"><option value="js">语义开关 · 记住主题</option><option value="css">CSS 复选框 · :checked</option></select></label><label class="vd-choice"><span>滑块位移</span><select data-select="move"><option value="transform">transform</option><option value="left">left</option></select></label><details class="vd-layers"><summary>分解开关图层</summary><div class="vd-layer-list">'+[['halo','光晕'],['cloud','云层'],['star','星点'],['pit','月坑']].map(([k,l])=>'<label><input type="checkbox" checked data-layer="'+k+'">'+l+'</label>').join('')+'</div></details><p class="vd-sky-note" aria-live="polite"></p></div>');
    const stage=el.querySelector('.vd-sky-stage'),native=el.querySelector('.vd-native'),wrap=el.querySelector('.vd-native-wrap'),js=el.querySelector('.vd-js'),note=el.querySelector('.vd-sky-note');
    let state=remembered;
    const sync=()=>{
      stage.dataset.night=String(state);
      js.setAttribute('aria-checked',String(state));
      note.textContent=stage.dataset.mode==='js'?(canStore?'开关支持键盘操作。重新打开此样本会恢复最近一次选择。':'开关支持键盘操作。当前浏览器仅在此页保留选择。'):'复选框通过 :checked 改变界面，按空格也可切换。';
    };
    js.addEventListener('click',()=>{
      state=!state;try{localStorage.setItem(key,state?'night':'day');}catch{canStore=false;}sync();
    });
    el.querySelector('[data-select=mode]').onchange=e=>{
      const mode=e.target.value;stage.dataset.mode=mode;wrap.hidden=mode!=='css';js.hidden=mode==='css';
      if(mode==='css')native.checked=state;
      sync();
    };
    el.querySelector('[data-select=move]').onchange=e=>{stage.dataset.move=e.target.value;};
    el.querySelectorAll('[data-layer]').forEach(box=>{box.onchange=()=>stage.classList.toggle('vd-no-'+box.dataset.layer,!box.checked);});
    sync();
  }
  function render(id,host){
    if(id==='planner-glass')return glass(host);
    if(id==='planner-flow')return flow(host);
    if(id==='sky-theme-switch')return sky(host);
  }
  function thumb(id,host){
    const el=document.createElement('div');el.className='vd-thumb vd-thumb-'+id;
    if(id==='planner-glass')el.innerHTML='<span class="vd-th-orb"></span><span class="vd-th-row"></span><span class="vd-th-row"></span><span class="vd-th-row"></span>';
    if(id==='planner-flow')el.innerHTML='<svg viewBox="0 0 270 108" aria-hidden="true"><g fill="none" stroke-width="13"><path stroke="#c65dc7" d="M24 49h60q20 0 32-15t34-14h79"/><path stroke="#e889a6" d="M24 69h60q20 0 32-15t34-14h79"/><path stroke="#689eca" d="M24 89h60q20 0 32-15t34-14h79"/></g><g stroke="#ffefff" stroke-width="1.5"><circle cx="58" cy="48" r="10" fill="#a247d8"/><circle cx="129" cy="43" r="10" fill="#f16d98"/><circle cx="185" cy="57" r="10" fill="#358dc7"/></g></svg>';
    if(id==='sky-theme-switch')el.innerHTML='<span class="vd-th-pill"><i></i><b></b><em></em></span>';
    el.setAttribute('aria-hidden','true');host.replaceChildren(el);
  }
  window.AtlasVideos={items,sources,render,thumb};
})();
