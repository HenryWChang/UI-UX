(() => {
  'use strict';

  const items = [
    ['hsl-studio', '颜色三要素', 'Color coordinates', '在同一块色样上单独调整色相、饱和度与明度，观察同色相的两条色阶，再展开比较 RGB 加光和 CMYK 油墨。', ['色相','饱和度','明度','HSB','HSL','色阶','RGB','CMYK','油墨','加光','屏幕与印刷'],16,'p=6'],
    ['hue-wheel', '色相关系', 'Hue relationships', '沿色环转动基色，查看邻近、对比和互补色之间的角距。', ['色轮','色相环','邻近色','互补色','对比色'],16,'p=9'],
    ['color-balance', '面积与分隔色', 'Color balance', '固定三种颜色，改变它们占据的面积，再加入分隔线，观察相邻色的视觉重量。', ['面积','平衡','主色','分隔色','配色比例'],16,'p=15'],
    ['palette-moods', '从莫兰迪到孟菲斯', 'Palette studies', '给同一张海报分别配上低饱和色、明快撞色和红黄蓝。保留版式可单看色彩，切换构图能观察几何与色彩的配合。', ['莫兰迪','高级灰','孟菲斯','蒙德里安','黑白灰','配色情感'],16,'p=17'],
    ['scene-palette', '从场景提取情绪色板', 'Scene to palette', '从三幅原创插画的实际像素采集底色、主体、强调与辅助色，再观察同一套颜色应用在海报和词卡上的效果。', ['视觉联想','情绪','场景取色','从图取色','自然配色','色板'],16,'p=14'],
    ['palette-picker', '色板采样台', 'Palette sampler', '从四色色卡挑出起点，锁定想保留的颜色，换一组、复制色值，或收藏自己的组合。', ['色卡','取色','锁定','色号','Color Hunt','Coolors'],17,'t=10'],
    ['gradient-studio', '渐变调色台', 'Gradient workbench', '挑选起止色，调整渐变方向和中间色的位置，再放大检查整幅色彩过渡。', ['渐变','色标','渐变角度','uiGradients','色带'],17,'t=40'],
    ['terminal-themes', '终端的语义配色', 'Semantic terminal colors', '把同一条终端提示和同一张词卡分别套入 Catppuccin 与 Dracula。按需显示路径、分支和系统标签。', ['终端','语义色','Catppuccin','Dracula','Starship','浅色与深色'],18,'t=30']
  ].map(([id,title,en,summary,keywords,source,refQuery]) => ({id,title,en,summary,keywords,source,refQuery,group:'color'}));

  const root = (host,body) => {
    const el=document.createElement('div');
    el.className='clab';
    el.innerHTML=body;
    host.replaceChildren(el);
    return el;
  };
  const svg = (view,body) => '<svg viewBox="'+view+'" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">'+body+'</svg>';
  const range = (label,key,min,max,value,suffix) => '<label class="clab-range"><span>'+label+'</span><input type="range" data-range="'+key+'" min="'+min+'" max="'+max+'" value="'+value+'"><output>'+value+suffix+'</output></label>';
  const actions = buttons => '<div class="clab-actions">'+buttons+'</div>';
  const btn = (label,key,pressed) => '<button type="button" class="clab-btn" data-action="'+key+'"'+(pressed===undefined?'':' aria-pressed="'+pressed+'"')+'>'+label+'</button>';
  const surface = (kind,html) => '<div class="clab-stage clab-'+kind+'">'+html+'</div>';
  const controls = html => '<div class="clab-controls">'+html+'</div>';
  const button = (el,key,fn) => {el.querySelector('[data-action="'+key+'"]').addEventListener('click',fn);};
  const setActive = (el,key,active) => el.querySelector('[data-action="'+key+'"]').setAttribute('aria-pressed',String(active));
  const setButtons = (el,keys,selected) => keys.forEach(key=>setActive(el,key,key===selected));
  function slider(el,key,suffix,onInput){
    const input=el.querySelector('[data-range="'+key+'"]');
    input.addEventListener('input',()=>{input.nextElementSibling.value=input.value+suffix;onInput(Number(input.value));});
    return input;
  }
  const colorCode = c => '#'+c.map(n=>Math.max(0,Math.min(255,Math.round(n*255))).toString(16).padStart(2,'0')).join('').toUpperCase();
  function hsv(h,s,v){
    const f=n=>{const k=(n+h/60)%6;return v*(1-s*Math.max(0,Math.min(k,4-k,1)));};
    return [f(5),f(3),f(1)];
  }
  function hsl(h,s,l){
    const f=n=>{const k=(n+h/30)%12;return l-s*Math.min(l,1-l)*Math.max(-1,Math.min(k-3,9-k,1));};
    return [f(0),f(8),f(4)];
  }
  const hueColor = (h,s=75,l=54) => colorCode(hsl(h,s/100,l/100));
  function readable(hex){
    const c=hex.match(/\w\w/g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);
    return c[0]*.2126+c[1]*.7152+c[2]*.0722>.179?'#000000':'#ffffff';
  }

  function mountMix(el){
    const channels={rgb:[['R 红光','r'],['G 绿光','g'],['B 蓝光','b']],cmyk:[['C 青墨','c'],['M 品红','m'],['Y 黄墨','y'],['K 黑墨','k']]};
    const section=document.createElement('details');
    section.className='clab-mix';
    function card(mode,title){
      const isRGB=mode==='rgb';
      return '<section class="clab-mix-card"><h4>'+title+'</h4><div class="clab-mix-face"><div aria-hidden="true" class="clab-mix-diagram '+mode+'"><i></i><i></i><i></i></div><output class="clab-mixture" data-mix="'+mode+'" aria-label="'+title+'合成色值"></output></div>'+
        channels[mode].map(([label,key])=>range(label,'mix-'+key,0,isRGB?255:100,0,isRGB?'':'%')).join('')+'</section>';
    }
    section.innerHTML='<summary>屏幕与印刷混色</summary><div class="clab-mix-body"><p>三个光点叠加变亮，三层彩墨叠加变暗。黑墨会压暗整张纸。</p><div class="clab-mix-grid">'+
      card('rgb','RGB 加光')+card('cmyk','CMYK 油墨')+'</div>'+actions(btn('取上方主色样','match-mix')+btn('所有通道归零','zero-mix'))+
      '<small>CMYK 为屏幕上的简化预览，未使用 ICC 配置文件。实际印刷颜色还取决于纸张、油墨和设备。</small></div>';
    el.append(section);
    const inputs={};let source=[0,0,0];
    function paint(mode){
      const values=channels[mode].map(([,key])=>Number(inputs[key].value));
      let rgb,blobs;
      const layer=section.querySelector('.clab-mix-diagram.'+mode);
      if(mode==='rgb'){
        rgb=values.map(v=>v/255);
        blobs=values.map((v,i)=>'rgb('+[0,1,2].map(j=>i===j?v:0).join(',')+')');
      }else{
        const [c,m,y,k]=values.map(v=>v/100);
        rgb=[c,m,y].map(ink=>(1-ink)*(1-k));
        layer.style.background=colorCode([1-k,1-k,1-k]);
        blobs=[[1-c,1,1],[1,1-m,1],[1,1,1-y]].map(colorCode);
      }
      [...layer.children].forEach((node,i)=>node.style.background=blobs[i]);
      const hex=colorCode(rgb),result=section.querySelector('[data-mix="'+mode+'"]');
      result.value=hex;result.style.background=hex;result.style.color=readable(hex);
    }
    for(const mode of Object.keys(channels)){
      channels[mode].forEach(([,key])=>{inputs[key]=slider(section,'mix-'+key,mode==='rgb'?'':'%',()=>paint(mode));});
    }
    function set(mode,values){
      channels[mode].forEach(([,key],i)=>{
        inputs[key].value=Math.round(values[i]);inputs[key].nextElementSibling.value=inputs[key].value+(mode==='rgb'?'':'%');
      });paint(mode);
    }
    function match(rgb){
      source=rgb.slice();const k=1-Math.max(...rgb);
      const cmy=rgb.map(value=>k===1?0:(1-value-k)/(1-k));
      set('rgb',rgb.map(v=>v*255));set('cmyk',[...cmy,k].map(v=>v*100));
    }
    button(section,'match-mix',()=>match(source));
    button(section,'zero-mix',()=>{set('rgb',[0,0,0]);set('cmyk',[0,0,0,0]);});
    return match;
  }

  function coordinates(host){
    const el=root(host,surface('coordinates','<div class="clab-big-chip"><div class="clab-chip-inset"></div><b></b></div><div class="clab-scales"><div><span>饱和度</span><div data-strip="s"></div></div><div><span data-scale-label>明度</span><div data-strip="v"></div></div></div>')+
      controls(actions(btn('HSB','hsb',true)+btn('HSL','hsl',false))+range('色相 H','h',0,359,201,'°')+range('饱和度 S','s',0,100,73,'%')+range('明度 B','v',0,100,82,'%')));
    const syncMix=mountMix(el);
    let mode='hsb',h=201,s=73,v=82;
    const sat=slider(el,'s','%',n=>{s=n;paint();});
    const value=slider(el,'v','%',n=>{v=n;paint();});
    slider(el,'h','°',n=>{h=n;paint();});
    function paint(){
      const cv=mode==='hsb'?hsv:hsl;
      const rgb=cv(h,s/100,v/100);syncMix(rgb);
      const hex=colorCode(rgb),chip=el.querySelector('.clab-big-chip');
      chip.style.background=hex;chip.style.color=readable(hex);chip.querySelector('b').textContent=hex;
      el.querySelector('.clab-chip-inset').style.background='linear-gradient(140deg,'+colorCode(cv(h,(s/100)*.46,v/100))+','+hex+')';
      for(const key of ['s','v']){
        el.querySelector('[data-strip="'+key+'"]').innerHTML=Array.from({length:8},(_,i)=>'<i style="background:'+colorCode(cv(h,key==='s'?i/7:s/100,key==='v'?i/7:v/100))+'"></i>').join('');
      }
    }
    for(const target of ['hsb','hsl'])button(el,target,()=>{
      if(mode===target)return;
      const S=s/100,V=v/100;
      if(target==='hsl'){
        const l=V*(1-S/2);
        s=Math.round(100*(l===0||l===1?0:(V-l)/Math.min(l,1-l)));v=Math.round(l*100);
      }else{
        const b=V+S*Math.min(V,1-V);
        s=Math.round(100*(b===0?0:2*(1-V/b)));v=Math.round(b*100);
      }
      mode=target;sat.value=s;value.value=v;sat.nextElementSibling.value=s+'%';value.nextElementSibling.value=v+'%';
      value.previousElementSibling.textContent=mode==='hsb'?'明度 B':'亮度 L';
      el.querySelector('[data-scale-label]').textContent=mode==='hsb'?'明度':'亮度';
      setButtons(el,['hsb','hsl'],target);paint();
    });
    paint();
  }

  const angles=[['同类',0],['类似',30],['邻近',60],['中度',90],['对比',120],['互补',180]];
  function wheelArt(){
    return '<div class="clab-wheel"><div class="clab-wheel-core"></div>'+svg('0 0 200 200','<path class="clab-wheel-link" fill="none" stroke="#272b2c" stroke-width="2"/><g stroke="#282c2e" stroke-width="1.7"><circle class="clab-pin clab-pina" r="7"/><circle class="clab-pin clab-pinb" r="5"/></g>')+'</div>';
  }
  function wheel(host){
    const el=root(host,surface('wheel-stage',wheelArt()+'<div class="clab-wheel-legend"><div data-chip="a"><b>基色</b><code></code></div><div data-chip="b"><b>配色</b><code></code></div><span class="clab-angle"></span></div>')+
      controls(range('基色色相','base',0,359,26,'°')+actions(angles.map(([name,angle])=>btn(name,'w'+angle,angle===180)).join(''))));
    let base=26,offset=180;
    function paint(){
      const pos=h=>[100+Math.sin(h*Math.PI/180)*82,100-Math.cos(h*Math.PI/180)*82];
      const end=(base+offset)%360,a=pos(base),b=pos(end);
      el.querySelector('.clab-wheel-link').setAttribute('d','M'+a.join(' ')+'L100 100L'+b.join(' '));
      [[a,base,'a'],[b,end,'b']].forEach(([p,h,key])=>{
        const pin=el.querySelector('.clab-pin'+key);
        pin.setAttribute('cx',p[0]);pin.setAttribute('cy',p[1]);pin.setAttribute('fill',hueColor(h));
        const tile=el.querySelector('[data-chip="'+key+'"]'),hex=hueColor(h);
        tile.style.background=hex;tile.style.color=readable(hex);tile.querySelector('code').textContent=hex;
      });
      el.querySelector('.clab-angle').textContent='色相间隔 '+offset+'°';
    }
    slider(el,'base','°',n=>{base=n;paint();});
    for(const [,angle] of angles)button(el,'w'+angle,()=>{offset=angle;setButtons(el,angles.map(v=>'w'+v[1]),'w'+angle);paint();});
    paint();
  }

  const balanceColors=['#256982','#B7D3B9','#EF924E'];
  function balance(host){
    const el=root(host,surface('balance','<div class="clab-bands">'+balanceColors.map((c,i)=>'<div data-band="'+i+'" style="background:'+c+'"></div>').join('')+'</div><div class="clab-balance-legend">'+['主色','辅色','强调色'].map((v,i)=>'<span><i style="background:'+balanceColors[i]+'"></i>'+v+' <b></b></span>').join('')+'</div>')+
      controls(range('主色占比','area',15,80,60,'%')+range('余量中强调色占比','accent',10,90,25,'%')+actions(btn('无分隔','none',true)+btn('浅色分隔','light',false)+btn('深色分隔','dark',false))));
    let main=60,accent=25;
    function paint(){
      const remainder=100-main,small=Math.round(remainder*accent/100);
      const values=[main,remainder-small,small];
      values.forEach((v,i)=>{el.querySelector('[data-band="'+i+'"]').style.flex=v+' 1 0';el.querySelectorAll('.clab-balance-legend b')[i].textContent=v+'%';});
    }
    slider(el,'area','%',n=>{main=n;paint();});slider(el,'accent','%',n=>{accent=n;paint();});
    const sep={none:'transparent',light:'#fff9e8',dark:'#252d30'};
    Object.entries(sep).forEach(([key,tone])=>button(el,key,()=>{
      const bands=el.querySelector('.clab-bands');
      bands.style.gap=key==='none'?'0':'6px';bands.style.background=tone;setButtons(el,Object.keys(sep),key);
    }));paint();
  }

  const moods={
    mono:{name:'黑白灰',colors:['#ECECE6','#232426','#81827D','#BCBCB4'],motif:'rings'},
    muted:{name:'高级灰',colors:['#D9D9D2','#434840','#8D9691','#B7AAA4'],motif:'steps'},
    morandi:{name:'莫兰迪',colors:['#E3DED2','#67746C','#AD8886','#9EA7B3'],motif:'vases'},
    memphis:{name:'孟菲斯',colors:['#FADE3E','#452B77','#F95A79','#3DC6BF'],motif:'confetti'},
    mondrian:{name:'蒙德里安',colors:['#F4F0DF','#18191A','#CB352D','#174EA3','#EDC534'],motif:'grid'}
  };
  function moodArt(motif,cols){
    const [paper,ink,a,b,c=paper]=cols;
    const blocks={
      rings:'<circle cx="106" cy="79" r="69" fill="'+ink+'"/><circle cx="106" cy="79" r="54" fill="'+a+'"/><circle cx="106" cy="79" r="40" fill="'+paper+'"/><circle cx="106" cy="79" r="24" fill="'+b+'"/>',
      steps:'<path d="M8 139 74 28h61L69 139Z" fill="'+b+'"/><path d="m66 139 63-111h44l-65 111Z" fill="'+a+'"/><path d="m118 139 60-103h24l-60 103Z" fill="'+ink+'"/>',
      vases:'<path d="M24 139V88q0-22 17-31V25h27v32q17 11 17 32v50" fill="'+a+'"/><path d="M121 139q-14-20-10-45 4-16 22-24V45h27v27q19 15 20 33 1 21-8 34" fill="'+b+'"/><path d="M64 139q-7-29 18-45V72h20v22q24 15 17 45" fill="'+ink+'"/>',
      confetti:'<path d="m14 129 73-109 27 112Z" fill="'+a+'" stroke="'+ink+'" stroke-width="4"/><circle cx="150" cy="46" r="28" fill="'+b+'" stroke="'+ink+'" stroke-width="4"/><path d="m90 95 19-14 13 21 19-12 11 19 28-16" stroke="'+ink+'" stroke-width="6" fill="none"/>'+Array.from({length:12},(_,i)=>'<circle cx="'+(22+i%4*10)+'" cy="'+(25+Math.floor(i/4)*9)+'" r="2.3" fill="'+ink+'"/>').join(''),
      grid:'<g stroke="'+ink+'" stroke-width="4"><rect x="4" y="4" width="192" height="138" fill="'+paper+'"/><rect x="4" y="4" width="102" height="89" fill="'+a+'"/><rect x="106" y="4" width="34" height="43" fill="'+c+'"/><rect x="141" y="93" width="55" height="49" fill="'+b+'"/><path d="M4 93h192M106 4v138M140 4v138M105 47h91" fill="none"/></g>'
    };
    return svg('0 0 200 146',blocks[motif]);
  }
  function mood(host){
    const keys=Object.keys(moods);
    const el=root(host,surface('mood','<article class="clab-poster"><div class="clab-poster-copy"><span>展览海报</span><b>字形<br>开放日</b></div><div class="clab-poster-art"></div><div class="clab-poster-strip"></div></article>')+
      controls(actions(keys.map(k=>btn(moods[k].name,k,k==='morandi')).join(''))+'<label class="clab-check"><input type="checkbox" data-layout checked>让构图随风格切换</label>'));
    let selected='morandi';const toggle=el.querySelector('[data-layout]');
    function paint(){const m=moods[selected],poster=el.querySelector('.clab-poster');
      poster.style.background=m.colors[0];poster.style.color=readable(m.colors[0]);poster.querySelector('.clab-poster-art').innerHTML=moodArt(toggle.checked?m.motif:'rings',m.colors);
      poster.querySelector('.clab-poster-strip').innerHTML=m.colors.map(c=>'<i style="background:'+c+'"></i>').join('');
    }
    keys.forEach(k=>button(el,k,()=>{selected=k;setButtons(el,keys,k);paint();}));toggle.onchange=paint;paint();
  }

  const sampleCards=[
    ['海盐',['#133D51','#39898B','#9CCCB6','#F4EACF']],
    ['陶土',['#49343C','#AA5950','#E6A36F','#EEDFC3']],
    ['暮紫',['#372046','#6C3879','#B16E96','#E7C4CD']],
    ['初芽',['#273C38','#718361','#B7C690','#F2EAC9']],
    ['群青',['#1F2648','#3E64A4','#64ABCF','#E4DCCA']],
    ['柑橘',['#44281D','#B64B30','#E89F36','#F4DC8A']]
  ];
  let recentPalette=null;
  function loadPalette(){
    try{
      const stored=JSON.parse(localStorage.getItem('form-atlas-color-v1'));
      if(Array.isArray(stored)&&stored.length===4&&stored.every(c=>/^#[\da-f]{6}$/i.test(c)))return stored;
    }catch{}
    return recentPalette;
  }
  async function copyHex(value,el,notify){
    try{
      if(location.protocol==='file:'||!navigator.clipboard?.writeText)throw Error('clipboard');
      await navigator.clipboard.writeText(value);notify('已复制 '+value);return;
    }catch{}
    const prev=document.activeElement,input=document.createElement('input');
    input.value=value;input.setAttribute('aria-label','可复制的色值');input.className='clab-copyfield';el.append(input);
    input.select();let ok=false;
    try{ok=document.execCommand('copy');}catch{}
    if(ok){input.remove();prev?.focus({preventScroll:true});notify('已复制 '+value);}
    else{notify('色值已选中，请复制。');input.addEventListener('blur',()=>input.remove(),{once:true});}
  }
  function picker(host){
    const el=root(host,surface('picker','<div class="clab-swatch-row">'+Array.from({length:4},(_,i)=>'<div class="clab-swatch"><button type="button" class="clab-lock" aria-label="锁定第 '+(i+1)+' 色" aria-pressed="false">未锁</button><button type="button" class="clab-code" aria-label="复制色值"></button></div>').join('')+'</div>')+
      controls('<div class="clab-card-choices">'+sampleCards.map(([n,cs],i)=>'<button class="clab-preset" type="button" aria-label="采用'+n+'色卡" data-card="'+i+'"><span>'+cs.map(c=>'<i style="background:'+c+'"></i>').join('')+'</span>'+n+'</button>').join('')+'</div>'+actions(btn('换一组','change')+btn('收藏当前色板','save')+btn('读取收藏','restore'))+'<div class="clab-notice" role="status">点击色号即可复制。</div>'));
    let colors=sampleCards[0][1].slice(),preset=0;
    const locks=[false,false,false,false];
    const tiles=[...el.querySelectorAll('.clab-swatch')],notice=el.querySelector('.clab-notice');
    function notify(t){notice.textContent=t;}
    function paint(){
      tiles.forEach((tile,i)=>{
        tile.style.background=colors[i];tile.style.color=readable(colors[i]);
        const b=tile.querySelector('.clab-lock'),code=tile.querySelector('.clab-code');
        b.textContent=locks[i]?'已锁':'未锁';b.setAttribute('aria-pressed',String(locks[i]));
        code.textContent=colors[i];code.setAttribute('aria-label','复制 '+colors[i]);
      });
      el.querySelector('[data-action="restore"]').disabled=!loadPalette();
    }
    tiles.forEach((tile,i)=>{
      tile.querySelector('.clab-lock').onclick=()=>{locks[i]=!locks[i];paint();notify('第 '+(i+1)+' 色'+(locks[i]?'已锁定':'已解锁'));};
      tile.querySelector('.clab-code').onclick=()=>copyHex(colors[i],el,notify);
    });
    function apply(values,force=false){colors=colors.map((c,i)=>locks[i]&&!force?c:values[i]);paint();}
    el.querySelectorAll('[data-card]').forEach(b=>b.onclick=()=>{
      preset=+b.dataset.card;apply(sampleCards[preset][1]);notify(locks.every(Boolean)?'四种颜色都已锁定。':'已采用「'+sampleCards[preset][0]+'」的未锁色位。');
    });
    button(el,'change',()=>{
      if(locks.every(Boolean)){notify('四种颜色都已锁定。解锁一色即可替换。');return;}
      preset=(preset+1+Math.floor(Math.random()*(sampleCards.length-1)))%sampleCards.length;
      apply(sampleCards[preset][1]);notify('已更新未锁色位。');
    });
    button(el,'save',()=>{recentPalette=colors.slice();try{localStorage.setItem('form-atlas-color-v1',JSON.stringify(colors));notify('这组颜色已收藏。');}catch{notify('这组颜色已收藏，可在当前页面读取。');}paint();});
    button(el,'restore',()=>{const c=loadPalette();if(c){locks.fill(false);apply(c,true);notify('已读取收藏色板。');}});
    paint();
  }

  const gradients={
    tide:['潮汐','#7970C4','#8CDECE','#61A2C4'],sunset:['落日','#DF3675','#FF9E41','#F66B50'],iris:['鸢尾','#523594','#E643AE','#983BB3']
  };
  function gradient(host){
    const el=root(host,surface('gradient','<div class="clab-wash"><button class="clab-enlarge" type="button" data-action="open">放大预览</button></div>')+
      controls(actions(Object.entries(gradients).map(([k,g])=>btn(g[0],k)).join(''))+
        '<div class="clab-color-inputs">'+[['a','起点'],['c','中间'],['b','终点']].map(([k,v])=>'<label><span>'+v+'</span><input type="color" data-stop="'+k+'"><code></code></label>').join('')+'</div>'+
        '<label class="clab-check"><input type="checkbox" data-middle>加入中间色</label>'+range('方向','degree',0,360,105,'°')+range('中间色位置','midpoint',5,95,50,'%'))+
      '<dialog class="clab-dialog"><button type="button" data-action="close">关闭预览</button></dialog>');
    let deg=105,mid=50;const inputs={};
    const checks=el.querySelector('[data-middle]'),dialog=el.querySelector('dialog');
    for(const k of ['a','b','c']){inputs[k]=el.querySelector('[data-stop="'+k+'"]');inputs[k].addEventListener('input',paint);}
    const midRange=slider(el,'midpoint','%',v=>{mid=v;paint();});
    slider(el,'degree','°',v=>{deg=v;paint();});
    function paint(){
      const {a,b,c}=inputs;const css='linear-gradient('+deg+'deg,'+a.value+' 0%,'+(checks.checked?c.value+' '+mid+'%,':'')+b.value+' 100%)';
      el.querySelector('.clab-wash').style.background=css;dialog.style.background=css;
      Object.values(inputs).forEach(it=>it.nextElementSibling.textContent=it.value.toUpperCase());
      c.disabled=!checks.checked;c.closest('label').hidden=!checks.checked;
      midRange.disabled=!checks.checked;midRange.closest('label').hidden=!checks.checked;
    }
    function preset(key){const [,a,b,c]=gradients[key];inputs.a.value=a;inputs.b.value=b;inputs.c.value=c;paint();}
    Object.keys(gradients).forEach(k=>button(el,k,()=>preset(k)));
    checks.onchange=paint;
    button(el,'open',()=>dialog.showModal());button(el,'close',()=>dialog.close());
    dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
    preset('tide');return ()=>{if(dialog.open)dialog.close();};
  }

  const themes={
    mocha:{name:'Catppuccin Mocha',bg:'#1E1E2E',surface:'#313244',text:'#CDD6F4',pink:'#F5C2E7',blue:'#89B4FA',green:'#A6E3A1'},
    latte:{name:'Catppuccin Latte',bg:'#EFF1F5',surface:'#CCD0DA',text:'#4C4F69',pink:'#EA76CB',blue:'#1E66F5',green:'#40A02B'},
    dracula:{name:'Dracula',bg:'#282A36',surface:'#44475A',text:'#F8F8F2',pink:'#FF79C6',blue:'#8BE9FD',green:'#50FA7B'}
  };
  function terminal(host){
    const el=root(host,surface('terminal','<div class="clab-term-wrap"><div class="clab-terminal-title">终端提示符</div><div class="clab-prompt"></div><div class="clab-command"><b>❯</b> wordbook open</div><div class="clab-word"><small>词条预览</small><strong>reaction</strong><p>反应 · 反作用</p><div class="clab-root-parts"><b>re-</b><b>act</b><b>-ion</b></div></div></div>')+
      controls(actions(Object.entries(themes).map(([k,t])=>btn(t.name,k,k==='mocha')).join(''))+
        '<div class="clab-context"><span>提示符信息</span>'+[['os','系统'],['path','目录'],['branch','分支']].map(([k,n])=>'<label class="clab-check"><input type="checkbox" data-segment="'+k+'" checked>'+n+'</label>').join('')+'</div>'));
    let key='mocha';const keys=Object.keys(themes);
    function paint(){const t=themes[key],stage=el.querySelector('.clab-terminal');
      for(const token of ['bg','surface','text','pink','blue','green'])stage.style.setProperty('--clab-'+token,t[token]);
      const desc={os:['macOS','pink'],path:['~/wordbook','blue'],branch:['main','green']};
      el.querySelector('.clab-prompt').innerHTML=[...el.querySelectorAll('[data-segment]:checked')].map(input=>{
        const [name,tok]=desc[input.dataset.segment];return '<b style="background:'+t[tok]+';color:'+readable(t[tok])+'">'+name+'</b>';
      }).join('')||'<span>仅显示命令</span>';
      const roles=['pink','blue','green'];el.querySelectorAll('.clab-root-parts b').forEach((label,i)=>{const hex=t[roles[i]];label.style.background=hex;label.style.color=readable(hex);});
      el.querySelector('.clab-command b').style.color=(key==='latte'?t.text:t.green);
    }
    el.querySelectorAll('[data-segment]').forEach(input=>input.onchange=paint);
    keys.forEach(k=>button(el,k,()=>{key=k;setButtons(el,keys,k);paint();}));paint();
  }
  const scenes={
    lake:{name:'清晨湖岸',mood:'宁静',points:[['晨空',.13,.17],['远山',.31,.53],['湖水',.86,.87],['旭日',.72,.27]]},
    dusk:{name:'暮色街巷',mood:'沉静',points:[['晚霞',.48,.24],['暮光',.48,.50],['暗巷',.18,.75],['窗灯',.1172,.59]]},
    fair:{name:'节庆市集',mood:'轻快',points:[['晴空',.33,.09],['棚顶',.159,.513],['旗帜',.147,.213],['石路',.62,.92]]}
  };
  const sceneW=640,sceneH=300;
  function landscape(ctx,kind){
    const W=sceneW,H=sceneH;
    const fill=(color,x,y,w,h)=>{ctx.fillStyle=color;ctx.fillRect(x,y,w,h);};
    const gradient=(a,b,y1=0,y2=H)=>{const g=ctx.createLinearGradient(0,y1,0,y2);g.addColorStop(0,a);g.addColorStop(1,b);return g;};
    const polygon=(color,points)=>{
      ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.closePath();
      ctx.fillStyle=color;ctx.fill();
    };
    const oval=(x,y,rx,ry,color)=>{ctx.beginPath();ctx.ellipse(x,y,rx,ry,0,0,Math.PI*2);ctx.fillStyle=color;ctx.fill();};
    const line=(points,color,width=1)=>{ctx.beginPath();points.forEach(([x,y],i)=>i?ctx.lineTo(x,y):ctx.moveTo(x,y));ctx.strokeStyle=color;ctx.lineWidth=width;ctx.stroke();};
    const land=(color,fn,end)=>{
      const pts=[[0,end]];
      for(let x=0;x<=W;x+=4)pts.push([x,fn(x)]);
      pts.push([W,end]);polygon(color,pts);
    };
    ctx.clearRect(0,0,W,H);
    if(kind==='lake'){
      fill(gradient('#9AC8C0','#F4DEB4',0,183),0,0,W,H);
      oval(461,81,24,24,'#F7D179');
      land('#91AEB0',x=>143-16*Math.sin(.018*x)-14*Math.sin(.032*x+.2),194);
      land('#678F8B',x=>165-15*Math.sin(.011*x-1.9)-7*Math.cos(.042*x),198);
      land('#426E67',x=>186-6*Math.cos(.026*x)-10*Math.sin(.011*x),204);
      fill(gradient('#93BDB0','#4D827E',190,300),0,190,W,110);
      for(let i=0;i<21;i++){
        const y=193+i*4.6,w=3+(20-i)*1.15;
        fill('#D7CBA499',460-w/2+Math.sin(i*1.8)*9,y,w,1.3);
        const px=(i*83+21)%613;fill('#C5D7BF70',px,y+2,8+(i%4)*8,.8);
      }
      land('#31584D',x=>245+7*Math.sin(x*.025)+Math.min(74,x*.37),310);
      function pine(x,y,h){
        fill('#29453D',x-1,y-h*.4,2,h*.4);
        for(let k=0;k<3;k++){const w=h*(.10+.052*k),top=y-h+h*k*.20;polygon(k===1?'#30564D':'#28483F',[[x,top],[x+w,top+h*.55],[x-w,top+h*.55]]);}
      }
      [[5,247,62],[21,248,109],[45,249,72],[68,260,58],[96,278,38],[123,282,23]].forEach(a=>pine(...a));
      line([[100,253],[179,242],[211,245]],'#564E3F',4);line([[157,245],[157,257]],'#514F42',2);line([[200,245],[200,252]],'#514F42',2);
      for(const x of [322,339])line([[x,85],[x+3,84],[x+6,85],[x+9,83]],'#728C83',1.1);
    }else if(kind==='dusk'){
      fill(gradient('#77739B','#F5B399',0,190),0,0,W,H);
      oval(425,85,15,15,'#F7C598');
      land('#A791A2',x=>175-7*Math.sin(.025*x)-5*Math.cos(.05*x),211);
      for(let i=0;i<29;i++){
        const x=i*23,y=136+(i*17%27);fill(i%2?'#897B91':'#958899',x,y,19,75);
        polygon('#796C85',[[x-2,y+1],[x+8,y-8],[x+21,y+1]]);
      }
      fill(gradient('#A48C97','#695E77',196,300),0,196,W,104);
      polygon('#B89AA0',[[313,192],[354,192],[397,300],[225,300]]);
      const facades=[
        [0,78,43,187,'#4A4A65'],[57,96,88,152,'#55516C'],[128,76,119,108,'#6A627A'],
        [188,52,144,69,'#847487'],[226,42,158,47,'#907E8F'],
        [539,108,70,183,'#514A64'],[464,89,104,127,'#60546C'],[407,63,132,84,'#786A7D'],[369,44,155,52,'#8E7784']
      ];
      facades.forEach(([x,w,y,h,color],i)=>{
        fill(color,x,y,w,h);
        polygon(i%2?'#4E4762':'#625572',[[x-3,y],[x+w*.2,y-12],[x+w*.74,y-19],[x+w+3,y]]);
        for(let row=0;row<3;row++)for(let col=0;col<3;col++){
          const wx=x+w*(.13+col*.29),wy=y+10+row*(h*.24);
          fill((row+col+i)%3===0?'#F2C283':'#514D66',wx,wy,Math.max(3,w*.10),Math.max(4,h*.095));
        }
      });
      for(const [x,y] of [[79,201],[142,194],[496,190]]){
        line([[x,y+52],[x,y-10],[x+6,y-13],[x+13,y-10]],'#45445C',2);
        oval(x+12,y-7,4.2,5,'#F3CA91');
      }
      line([[0,55],[139,78],[262,88],[396,90],[538,78],[640,60]],'#675872',1.2);
    }else{
      fill(gradient('#83C7C7','#F6DFB0',0,186),0,0,W,H);
      oval(510,58,24,24,'#FAE9A5');
      for(let i=0;i<8;i++){const x=34+i*86,y=138+10*Math.sin(i);oval(x,y,51,40,'#8FB398');oval(x+14,y+9,37,31,'#74A086');}
      fill(gradient('#E9CEA1','#DFB785',181,300),0,181,W,119);
      for(let i=0;i<28;i++){const x=(i*69)%634,y=224+(i*13)%66;line([[x,y],[x+7+i%6,y]],'#C5A67D',1);}
      function stall(x,y,w,h,base,accent){
        fill(base,x+w*.08,y+9,w*.84,h);fill('#674F43',x+w*.14,y+26,w*.72,h*.46);
        polygon(base,[[x-w*.02,y+14],[x+w*.12,y-19],[x+w*.88,y-19],[x+w*1.02,y+14]]);
        for(let i=0;i<6;i++){const l=x+w*(-.02+i*.176);if(i%2===0)polygon(accent,[[l,y+14],[x+w*(.12+i*.127),y-19],[x+w*(.12+(i+1)*.127),y-19],[l+w*.176,y+14]]);}
        for(let i=0;i<6;i++){const px=x+w*(.11+i*.135);oval(px,y+h*.49,4.6,4.2,i%2?'#ECA963':'#AD5947');}
        fill(accent,x+w*.04,y+h*.56,w*.92,5);fill('#6C5648',x+w*.08,y+h+6,4,14);fill('#6C5648',x+w*.89-4,y+h+6,4,14);
      }
      stall(10,159,155,84,'#B45546','#F4CF93');stall(184,169,113,62,'#397B79','#E0CA8F');stall(351,162,121,69,'#C48B52','#F4D997');stall(493,155,137,88,'#577F7A','#ECD9AD');
      const yAt=x=>43+30*Math.sin(x/640*Math.PI);
      const cable=Array.from({length:65},(_,i)=>[i*10,yAt(i*10)]);line(cable,'#455F59',1.6);
      for(let i=0;i<16;i++){const x=7+i*40,y=yAt(x);polygon(['#D76958','#EBC06B','#478B87'][i%3],[[x,y],[x+17,yAt(x+17)],[x+9,y+19]]);}
    }
  }
  function scenePalette(host){
    const el=root(host,surface('scene','<div class="clab-scene-source"><div class="clab-scene-caption"><b>原创场景插画</b><span data-mood></span></div><div class="clab-scene-canvas"><canvas width="640" height="300" tabindex="0" role="group" aria-label="场景取色。方向键移动，回车写入当前色位。"></canvas><i class="clab-reticle"></i></div><div class="clab-sample-points" aria-label="指定位置取色"></div></div><div class="clab-scene-output"><div class="clab-scene-slots" aria-label="选择写入色位"></div><div class="clab-application"></div></div>')+
      controls(actions(Object.entries(scenes).map(([key,item])=>btn(item.name,key,key==='lake')).join(''))+
        actions(btn('应用到海报','poster',true)+btn('应用到词卡','word',false))+'<p class="clab-scene-hint">先选色位，再点画面或位置按钮取色。也可用方向键移动取色点，按回车确认。</p><span class="clab-scene-status" role="status"></span>'));
    const ids=Object.keys(scenes),canvas=el.querySelector('canvas'),ctx=canvas.getContext('2d',{willReadFrequently:true});
    const slots=el.querySelector('.clab-scene-slots'),rc=el.querySelector('.clab-reticle'),notice=el.querySelector('[role=status]');
    const roles=['底色','主体','强调','辅助'];
    let kind='lake',colors=[],active=0,view='poster',cx=0,cy=0;
    const pixel=(x,y)=>colorCode([...ctx.getImageData(x,y,1,1).data].slice(0,3).map(c=>c/255));
    const coords=(x,y)=>[Math.min(sceneW-1,Math.max(0,Math.round(x))),Math.min(sceneH-1,Math.max(0,Math.round(y)))];
    function aim(x,y){[cx,cy]=coords(x,y);rc.style.left=(cx/sceneW*100)+'%';rc.style.top=(cy/sceneH*100)+'%';}
    function paintApp(){
      const app=el.querySelector('.clab-application'),[bg,body,accent,aux]=colors;
      app.style.background=bg;app.style.color=readable(bg);
      if(view==='word'){
        app.innerHTML='<div class="clab-scene-word"><small>Vocafect Wordbook</small><strong>reaction</strong><div>反应 · 反作用</div><div class="clab-morph">'+['re-','act','-ion'].map((t,i)=>'<b style="background:'+colors[i+1]+';color:'+readable(colors[i+1])+'">'+t+'</b>').join('')+'</div></div>';
      }else{
        const art=svg('0 0 180 100','<path fill="'+body+'" d="M7 90 45 16h45L52 90Z"/><circle fill="'+accent+'" cx="113" cy="40" r="27"/><path fill="'+aux+'" d="m84 88 26-34 32 11 31-26v49Z"/>');
        app.innerHTML='<div class="clab-scene-poster"><div><small>展览海报</small><strong>色彩<br>采集</strong></div>'+art+'</div>';
      }
    }
    function refresh(){[...slots.children].forEach((b,i)=>{
      b.setAttribute('aria-pressed',String(i===active));b.style.background=colors[i];b.style.color=readable(colors[i]);b.querySelector('code').textContent=colors[i];
    });paintApp();}
    function sample(){colors[active]=pixel(cx,cy);refresh();notice.textContent=roles[active]+'已更新为 '+colors[active]+'。';}
    slots.innerHTML=roles.map((r,i)=>'<button type="button" data-slot="'+i+'"><span>'+r+'</span><code></code></button>').join('');
    [...slots.children].forEach((b,i)=>b.onclick=()=>{active=i;refresh();notice.textContent='已选'+roles[i]+'，可取色。';});
    canvas.onclick=e=>{const rect=canvas.getBoundingClientRect();aim((e.clientX-rect.left)/rect.width*sceneW,(e.clientY-rect.top)/rect.height*sceneH);sample();};
    canvas.onkeydown=e=>{
      if(e.key==='Enter'||e.key===' '){e.preventDefault();sample();return;}
      const moves={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};
      if(!moves[e.key])return;e.preventDefault();const step=e.shiftKey?1:6;aim(cx+moves[e.key][0]*step,cy+moves[e.key][1]*step);
    };
    function changeScene(k){
      kind=k;const s=scenes[k];landscape(ctx,k);el.querySelector('[data-mood]').textContent=s.name+' · '+s.mood;
      const points=el.querySelector('.clab-sample-points');points.replaceChildren();
      colors=s.points.map(([name,x,y])=>{
        const [px,py]=coords(x*sceneW,y*sceneH),hex=pixel(px,py),b=document.createElement('button');
        b.type='button';b.className='clab-btn';b.innerHTML='<i style="background:'+hex+'"></i>'+name;
        b.onclick=()=>{aim(px,py);sample();};points.append(b);return hex;
      });
      aim(s.points[active][1]*sceneW,s.points[active][2]*sceneH);setButtons(el,ids,kind);refresh();notice.textContent='已加载'+s.name+'的四处样本色。';
    }
    ids.forEach(k=>button(el,k,()=>changeScene(k)));
    for(const k of ['poster','word'])button(el,k,()=>{view=k;setButtons(el,['poster','word'],view);paintApp();});
    changeScene('lake');
  }
  function sceneThumb(){
    const canvas=document.createElement('canvas');canvas.width=sceneW;canvas.height=sceneH;
    landscape(canvas.getContext('2d'),'lake');
    return canvas;
  }

  const miniArt={
    'hsl-studio':()=>'<div class="clab-mini-coord"><div><b></b><i></i><i></i><i></i><i></i><i></i></div></div>',
    'hue-wheel':()=>'<div class="clab-mini-wheel"><i></i><b></b></div>',
    'color-balance':()=>'<div class="clab-mini-balance">'+balanceColors.map(c=>'<i style="background:'+c+'"></i>').join('')+'</div>',
    'palette-moods':()=>'<div class="clab-mini-moods">'+moodArt('vases',moods.morandi.colors)+'</div>',
    'palette-picker':()=>'<div class="clab-mini-cards">'+sampleCards.slice(0,3).map(([,cs])=>'<div>'+cs.map(c=>'<i style="background:'+c+'"></i>').join('')+'</div>').join('')+'</div>',
    'gradient-studio':()=>'<div class="clab-mini-grad"><i></i></div>',
    'terminal-themes':()=>'<div class="clab-mini-term">'+svg('0 0 220 115','<rect x="12" y="14" width="196" height="87" rx="6" fill="#282836"/><g fill="#F5C2E7"><circle cx="25" cy="25" r="2"/><path d="M24 40h41l6 8-6 8H24z"/></g><path fill="#89B4FA" d="M72 40h46l6 8-6 8H72l6-8z"/><path fill="#A6E3A1" d="M126 40h30l6 8-6 8h-30l6-8z"/><path d="m25 69 4 3-4 3m12-3h45m10 0h16" fill="none" stroke="#CDD6F4" stroke-width="2"/>')+'</div>'
  };
  const demos={'scene-palette':scenePalette,'hsl-studio':coordinates,'hue-wheel':wheel,'color-balance':balance,'palette-moods':mood,'palette-picker':picker,'gradient-studio':gradient,'terminal-themes':terminal};
  window.AtlasColor={
    items,
    render(id,host){if(Object.hasOwn(demos,id))return demos[id](host);},
    thumb(id,host){if(id==='scene-palette'){const el=document.createElement('div');el.className='clab-thumb clab-scene-thumb';el.setAttribute('aria-hidden','true');el.append(sceneThumb());host.replaceChildren(el);return;}if(!Object.hasOwn(miniArt,id))return;const el=document.createElement('div');el.className='clab-thumb';el.setAttribute('aria-hidden','true');el.innerHTML=miniArt[id]();host.replaceChildren(el);}
  };
})();
