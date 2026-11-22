(() => {
  'use strict';
  const items = [
    {id:'spring-flick',title:'惯性与回弹',en:'Flick & spring',summary:'拖动滑块后松手。出手速度决定惯性，阻尼决定它怎样收住。',keywords:['惯性','弹簧','物理','拖动','速度','阻尼'],source:4},
    {id:'liquid-switch',title:'昼夜玻璃开关',en:'Daylight switch',summary:'推过透明滑块，观察云、天体和星光怎样分层移动。',keywords:['液态玻璃','开关','视差','昼夜','折射'],source:6},
    {id:'face-id',title:'Face ID 识别动效',en:'Recognition loop',summary:'从扫描框到笑脸，用原速与半速观察光环翻转、交叠和收拢。',keywords:['Face ID','识别','动画','反馈','光环'],source:9},
    {id:'continuous-corner',title:'连续曲率圆角',en:'Continuous corners',summary:'让两条轮廓拥有相同的边长和转角范围，比较直线接入曲线的方式。',keywords:['圆角','连续曲率','平滑','轮廓','苹果'],source:7},
    {id:'icon-grid',title:'图标构造网格',en:'Icon construction',summary:'把图标放回同一张网格，查看尺寸、重心和图案怎样组成一套。',keywords:['图标','iOS','网格','扁平','拟物','构造'],source:8},
    {id:'visual-hierarchy',title:'视觉层级',en:'Visual hierarchy',summary:'保持活动信息相同，逐项切换对齐、字号、分组和强调色。',keywords:['对齐','对比','亲密性','邻近','层级','海报'],source:3},
    {id:'type-rhythm',title:'文字与阅读节奏',en:'Typographic rhythm',summary:'在文章与数据两种场景里，调节行距和字重对比。',keywords:['排版','行距','字重','字体','阅读','数据'],source:3}
  ];
  const reduce = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (x,min,max) => Math.min(max,Math.max(min,x));
  const svg = (view,body,cls='') => '<svg class="'+cls+'" viewBox="'+view+'" aria-hidden="true" focusable="false" xmlns="http://www.w3.org/2000/svg">'+body+'</svg>';
  const button = (label,key,pressed) => '<button type="button" class="dl-btn" data-act="'+key+'"'+(pressed===undefined?'':' aria-pressed="'+pressed+'"')+'>'+label+'</button>';
  const range = (name,key,min,max,value,unit='') => '<label class="dl-range"><span>'+name+'</span><input aria-label="'+name+'" data-range="'+key+'" type="range" min="'+min+'" max="'+max+'" value="'+value+'"><output>'+value+unit+'</output></label>';
  const row = (...parts) => '<div class="dl-controls">'+parts.join('')+'</div>';
  const bindRange = (el,key,change,format) => {
    const input=el.querySelector('[data-range="'+key+'"]');
    input.oninput=()=>{input.nextElementSibling.value=format?format(+input.value):input.value;change(+input.value);};
    return input;
  };
  const setGroup = (el,keys,chosen) => keys.forEach(k=>el.querySelector('[data-act="'+k+'"]').setAttribute('aria-pressed',String(k===chosen)));
  const on = (el,key,func) => {el.querySelector('[data-act="'+key+'"]').onclick=func;};
  let ids=0;
  const fresh=()=> 'dl-art-'+(++ids);

  // Integrate a turning angle with zero curvature at both tangent points.
  // Mirroring the resulting quadrant keeps all four joins identical.
  function outline(x,y,width,height,r,smooth) {
    const points=[];
    const pieces=40;
    let dx=0,dy=0;
    for(let i=0;i<=pieces;i++){
      if(i){const t=(i-.5)/pieces,angle=Math.PI/2*(smooth?t*t*(3-2*t):t);dx+=Math.cos(angle);dy+=Math.sin(angle);}
      points.push([dx,dy]);
    }
    const ends=[[x+width-r,y],[x+width,y+height-r],[x+r,y+height],[x,y+r]];
    return ends.map(([cx,cy],i)=>points.map(([a,b],j)=>{
      const u=a/dx*r,v=b/dy*r;
      const p=[[cx+u,cy+v],[cx-v,cy+u],[cx-u,cy-v],[cx+v,cy-u]][i];
      return ((!i&&!j)?'M':'L')+p.map(z=>z.toFixed(2)).join(' ');
    }).join('')).join('')+'Z';
  }

  const springTrack=(x,thumb=false)=>'<div class="dl-spring-track'+(thumb?' dl-still':'')+'"><div class="dl-rail"></div><span class="dl-target"></span><span class="dl-puck" style="--x:'+x+'%"><i></i><i></i><i></i></span></div>';
  function spring(el){
    const startPoint=.36;
    const stiffness=64, mass=1;
    const graph=svg('0 0 400 88','<path class="dl-gridpath" d="M0 8H400 M0 44H400 M0 80H400"/><path class="dl-plot"/><g class="dl-touch-marks"></g>','dl-chart');
    el.innerHTML='<div class="dl-stage dl-spring"><div class="dl-spring-inner"><div class="dl-track-zone" role="slider" tabindex="0" aria-label="拖动或用方向键移动滑块" aria-valuemin="0" aria-valuemax="100">'+springTrack(startPoint*100)+'</div><div class="dl-chart-head"><span>位移轨迹</span><span data-value>0.0 s</span></div>'+graph+'</div></div>'+row(button('轻放','gentle'),button('快甩','flick'),range('阻尼比','damp',10,120,80,'%'));
    const zone=el.querySelector('.dl-track-zone'),track=el.querySelector('.dl-spring-track'),puck=el.querySelector('.dl-puck'),target=el.querySelector('.dl-target'),plot=el.querySelector('.dl-plot'),marks=el.querySelector('.dl-touch-marks'),read=el.querySelector('[data-value]');
    let x=startPoint,v=0,goal=x,ratio=.8,frame=0,last=null,elapsed=0,releaseTime=0,drag=null;
    let path=[],contacts=[];
    function paint(){
      puck.style.setProperty('--x',100*x+'%');
      target.style.left=100*goal+'%';
      zone.setAttribute('aria-valuenow',String(Math.round(x*100)));
    }
    function record(){
      path.push([elapsed,x]);
      if(path.length>900)path.shift();
      const start=path[0][0],span=Math.max(1.4,elapsed-start);
      const timeX=t=>2+396*(t-start)/span;
      const posY=p=>80-72*p;
      plot.setAttribute('d',path.map(([t,p],i)=>(i?'L':'M')+timeX(t).toFixed(1)+' '+posY(p).toFixed(1)).join(''));
      marks.innerHTML=contacts.filter(([t])=>t>=start).map(([t,p])=>'<circle cx="'+timeX(t).toFixed(1)+'" cy="'+posY(p)+'" r="3.2"/>').join('');
      read.textContent=(contacts.length?'触边 '+contacts.length+' 次 · ':'')+elapsed.toFixed(1)+' s';
    }
    function stop(){cancelAnimationFrame(frame);frame=0;}
    function resetTrace(){path=[];contacts=[];elapsed=0;releaseTime=0;record();}
    function advance(dt){
      // Semi-implicit Euler with steps no longer than 1/240 s.
      const steps=Math.max(1,Math.ceil(dt*240)),step=dt/steps;
      const damping=2*ratio*Math.sqrt(stiffness*mass);
      for(let i=0;i<steps;i++){
        v+=(stiffness*(goal-x)-damping*v)/mass*step;
        x+=v*step;
        elapsed+=step;
        if(x<0||x>1){
          x=clamp(x,0,1);
          contacts.push([elapsed,x]);
          path.push([elapsed,x]);
          v*=-.64;
        }
      }
      releaseTime+=dt;
    }
    const resting=()=>(Math.abs(v)<.008&&Math.abs(goal-x)<.002)||releaseTime>=12;
    function loop(now){
      const dt=last===null?0:clamp((now-last)/1000,0,.05);
      last=now;advance(dt);paint();record();
      if(resting()){
        x=goal;v=0;paint();record();frame=0;
      }else frame=requestAnimationFrame(loop);
    }
    function settle(to,speed){
      stop();goal=clamp(to,0,1);v=speed;last=null;releaseTime=0;paint();
      if(reduce()){
        while(!resting()){advance(1/60);path.push([elapsed,x]);}
        x=goal;v=0;paint();record();return;
      }
      frame=requestAnimationFrame(loop);
    }
    function releaseAt(speed){settle(clamp(x+.15*speed,.14,.86),speed);}
    function demo(speed){stop();drag=null;x=goal=startPoint;v=0;resetTrace();paint();releaseAt(speed);}
    const at=e=>{const r=track.getBoundingClientRect();return clamp((e.clientX-r.left)/r.width,0,1);};
    zone.onpointerdown=e=>{
      if(e.button!==0)return;
      stop();zone.setPointerCapture(e.pointerId);zone.focus({preventScroll:true});
      x=goal=at(e);drag={t:performance.now(),prev:x};v=0;resetTrace();paint();
    };
    zone.onpointermove=e=>{
      if(!drag)return;
      const now=performance.now(),dt=Math.max(.002,(now-drag.t)/1000),pos=at(e);
      elapsed+=dt;
      v=clamp(.3*v+.7*(pos-drag.prev)/dt,-16,16);
      x=goal=pos;drag={t:now,prev:pos};paint();record();
    };
    zone.onpointerup=()=>{
      if(!drag)return;
      const speed=v*Math.exp(-(performance.now()-drag.t)/100);
      drag=null;releaseAt(speed);
    };
    zone.onpointercancel=()=>{if(drag){drag=null;settle(x,0);}};
    zone.onkeydown=e=>{
      if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;
      e.preventDefault();resetTrace();const sign=e.key==='ArrowLeft'?-1:1;
      if(e.key==='Home'||e.key==='End')settle(e.key==='Home'?0:1,0);
      else releaseAt(sign);
    };
    bindRange(el,'damp',n=>ratio=n/100,n=>n+'%');
    on(el,'gentle',()=>demo(.55));on(el,'flick',()=>demo(12));
    paint();resetTrace();return stop;
  }

  const clouds='<path d="M-20 118Q-8 92 13 99Q27 73 49 88Q65 59 91 79Q113 75 123 99Q149 91 163 115V140H-20Z"/><path d="M163 114Q181 80 203 90Q222 52 253 79Q285 62 306 100L327 100V140H163Z"/>';
  const stars=[[25,34],[46,63],[78,30],[121,47],[148,24],[168,72],[194,45],[246,32],[273,62],[104,71]];
  function switchArt(){
    const id=fresh();
    return '<div class="dl-switch-sky">'+svg('0 0 300 136','<defs><linearGradient id="'+id+'d" x2="0" y2="1" gradientUnits="objectBoundingBox"><stop stop-color="#52a1d7"/><stop offset="1" stop-color="#c6edec"/></linearGradient><linearGradient id="'+id+'n" x2="0" y2="1"><stop stop-color="#193255"/><stop offset="1" stop-color="#507399"/></linearGradient></defs><rect width="300" height="136" fill="url(#'+id+'d)"/><rect class="dl-night-layer" width="300" height="136" fill="url(#'+id+'n)"/><g class="dl-stars" fill="#fff4ce">'+stars.map(([x,y],i)=>i%3?'<circle cx="'+x+'" cy="'+y+'" r="1.8"/>':'<path transform="translate('+x+' '+y+')" d="M0-5L1-1L5 0L1 1L0 5L-1 1L-5 0L-1-1Z"/>').join('')+'</g><g class="dl-orbit-sun"><circle cx="75" cy="50" r="29" fill="#ffe6a0"/><circle cx="75" cy="50" r="32" fill="none" stroke="#fff2ab" opacity=".5"/></g><path class="dl-orbit-moon" d="M220 24a28 28 0 1 0 31 35a27 27 0 0 1-31-35Z" fill="#fff1bd"/><g class="dl-cloud-back" fill="#eef8e9" opacity=".47">'+clouds+'</g><g class="dl-cloud-front" fill="#f5f9f0">'+clouds+'</g>','dl-landscape')+'<div class="dl-glass"></div></div>';
  }
  function liquid(el){
    el.innerHTML='<div class="dl-stage dl-liquid"><button type="button" role="switch" aria-checked="false" aria-label="昼夜模式，点击或左右拖动" class="dl-switch">'+switchArt()+'</button><div class="dl-day-phase" aria-live="polite">日间</div></div>'+row(button('日间','day',true),button('夜间','night',false));
    const ctrl=el.querySelector('.dl-switch'),stage=el.querySelector('.dl-stage');let day=true,p=0,drag=null;
    function paint(n){p=clamp(n,0,1);stage.style.setProperty('--p',p.toFixed(3));}
    function choose(n){day=!n;stage.classList.remove('dl-dragging');paint(n);ctrl.setAttribute('aria-checked',String(!day));el.querySelector('.dl-day-phase').textContent=day?'日间':'夜间';setGroup(el,['day','night'],day?'day':'night');}
    on(el,'day',()=>choose(0));on(el,'night',()=>choose(1));
    ctrl.onpointerdown=e=>{if(e.button!==0)return;ctrl.setPointerCapture(e.pointerId);drag={x:e.clientX,p,moved:false};stage.classList.add('dl-dragging');};
    ctrl.onpointermove=e=>{if(!drag)return;let dx=e.clientX-drag.x;if(Math.abs(dx)>3)drag.moved=true;if(drag.moved)paint(drag.p+dx/(ctrl.offsetWidth*.58));};
    ctrl.onpointerup=()=>{if(!drag)return;choose(drag.moved?(p>=.5?1:0):day?1:0);drag=null;};
    ctrl.onpointercancel=()=>{drag=null;choose(day?0:1);};
    ctrl.onclick=e=>{if(e.detail===0)choose(day?1:0);};choose(0);
  }

  function faceArt(){
    return svg('0 0 160 160','<g fill="none" stroke="currentColor" stroke-width="5.3" stroke-linecap="round" stroke-linejoin="round"><path class="dl-scan-brackets" d="M38 62V52Q38 37 53 37H65 M94 37H107Q122 37 122 52V62 M122 95V108Q122 123 107 123H94 M65 123H53Q38 123 38 108V95"/><circle class="dl-done-circle" cx="80" cy="80" r="44" opacity="0"/><g class="dl-face-features"><path d="M63 69V77M98 69V77M82 69V83Q82 88 76 88M64 98Q80 112 98 96"/></g><g class="dl-rings" opacity="0">'+[0,1,2].map(()=>'<ellipse cx="80" cy="80" rx="44" ry="41" stroke-width="3.5"/>').join('')+'</g></g>','dl-face-art');
  }
  function face(el){
    el.innerHTML='<div class="dl-stage dl-face"><div class="dl-face-wrap">'+faceArt()+'</div><span class="dl-face-state" aria-live="polite">等待识别</span></div>'+row(button('重播','play'),button('原速','one',true),button('半速','half',false));
    const brackets=el.querySelector('.dl-scan-brackets'),done=el.querySelector('.dl-done-circle'),features=el.querySelector('.dl-face-features'),rings=el.querySelector('.dl-rings'),layers=[...rings.children],status=el.querySelector('.dl-face-state');
    let frame=0,speed=1;
    function paint(t){
      const phase=t<.26?'等待识别':t<.76?'识别中':'已识别';
      if(status.textContent!==phase)status.textContent=phase;
      const curve=(a,b)=>{const q=clamp((t-a)/(b-a),0,1);return q*q*(3-2*q);};
      brackets.setAttribute('opacity',1-curve(.20,.36));features.setAttribute('opacity',1-curve(.23,.36)+curve(.69,.80));done.setAttribute('opacity',curve(.66,.79));rings.setAttribute('opacity',curve(.24,.34)*(1-curve(.65,.79)));
      const u=curve(.21,.78);layers.forEach((ring,i)=>{const spin=u*Math.PI*(2.2+i*.42);ring.setAttribute('transform','rotate('+((i*57+u*170)%360)+' 80 80)');ring.setAttribute('ry',Math.max(2,44*Math.abs(Math.cos(spin+i*.12))));});
    }
    function play(){cancelAnimationFrame(frame);if(reduce()){paint(1);return;}let start=null;const tick=now=>{if(start===null)start=now;const t=(now-start)/(1280/speed);paint(Math.min(t,1));if(t<1)frame=requestAnimationFrame(tick);};frame=requestAnimationFrame(tick);}
    on(el,'play',play);for(const [key,s] of [['one',1],['half',.5]])on(el,key,()=>{speed=s;setGroup(el,['one','half'],key);play();});paint(0);return ()=>cancelAnimationFrame(frame);
  }

  function cornerPlot(mode,r,zoom){
    const circles=mode!=='smooth',curves=mode!=='round',box=zoom?'111 -5 78 78':'0 0 200 160';
    const guide='<g stroke="#b6b3a4" fill="none" stroke-width=".65" stroke-dasharray="2 3"><path d="M16 18H192M180 5V151"/><path d="M'+(180-r)+' 7V145 M16 '+(18+r)+'H192"/></g>';
    const arc=outline(20,18,160,124,r,false),smooth=outline(20,18,160,124,r,true);
    return svg(box,guide+(curves?'<path fill="#bfccc2" fill-opacity=".54" stroke="#226566" stroke-width="1.8" d="'+smooth+'"/>':'')+(circles?'<path fill="'+(curves?'none':'#e8ccb6')+'" stroke="#a95130" stroke-width="1.45" '+(curves?'stroke-dasharray="3 2"':'')+' d="'+arc+'"/>':'')+'<circle cx="'+(180-r)+'" cy="18" r="2.3" fill="#474c45"/><circle cx="180" cy="'+(18+r)+'" r="2.3" fill="#474c45"/>','dl-corner-figure');
  }
  function corners(el){
    el.innerHTML='<div class="dl-stage dl-corners"><div class="dl-corner-pane"></div><div class="dl-legend"><span><i></i>标准圆弧</span><span><i></i>连续曲率</span></div></div>'+row(button('叠加','both',true),button('标准','round',false),button('连续','smooth',false),button('局部放大','zoom',false))+row(range('转角范围','radius',22,59,47,''));
    const plot=el.querySelector('.dl-corner-pane');let r=47,mode='both',zoom=false;
    function draw(){plot.innerHTML=cornerPlot(mode,r,zoom);}
    for(const m of ['both','round','smooth'])on(el,m,()=>{mode=m;setGroup(el,['both','round','smooth'],m);draw();});
    on(el,'zoom',()=>{zoom=!zoom;el.querySelector('[data-act=zoom]').setAttribute('aria-pressed',String(zoom));draw();});bindRange(el,'radius',n=>{r=n;draw();});draw();
  }

  function iconArt(type,grid=false,material=false){
    const id=fresh(),pal={weather:['#70c7ec','#277dbc'],map:['#fae3a7','#9fc38c'],voice:['#333d48','#14161b']}[type];
    const mask=outline(3,3,90,90,22,true);
    const defs='<defs><clipPath id="'+id+'c"><path d="'+mask+'"/></clipPath><linearGradient id="'+id+'f" x1="0" y1="0" x2="0.28" y2="1"><stop stop-color="'+pal[0]+'"/><stop offset="1" stop-color="'+pal[1]+'"/></linearGradient><linearGradient id="'+id+'g" x1=".15" y1="0" x2=".8" y2="1"><stop stop-color="white" stop-opacity=".75"/><stop offset=".42" stop-color="white" stop-opacity="0"/><stop offset="1" stop-color="black" stop-opacity=".28"/></linearGradient></defs>';
    const weather='<circle cx="57" cy="36" r="15" fill="#ffe084"/><path d="M28 66a12 12 0 0 1-1-24a18 18 0 0 1 34-1a13 13 0 1 1 5 25Z" fill="#fffdf1"/>';
    const map='<path d="M10 10H85L58 56L6 40Z" fill="#a2c492"/><path d="M73 -7Q40 22 56 46T40 105" fill="none" stroke="#80b9ce" stroke-width="14"/><path d="M-4 42L105 54M30 -3L22 104M-1 81L100 16" fill="none" stroke="#fdf8df" stroke-width="7"/><path d="M-1 81L100 16" fill="none" stroke="#e6a751" stroke-width="3"/><circle cx="49" cy="49" r="8" fill="white"/><circle cx="49" cy="49" r="5.7" fill="#257ad5"/>';
    const voice=[8,14,24,16,36,55,32,20,44,28,12,20,8].map((h,i)=>'<path d="M'+(15+i*5.5)+' '+(48-h/2)+'v'+h+'" stroke="'+(i>3&&i<9?'#ff725e':'#e8ebe6')+'" stroke-width="3.2" stroke-linecap="round"/>').join('');
    const guides='<g stroke="#fff" opacity=".85" stroke-width=".65" fill="none"><path d="M3 25H93M3 48H93M3 71H93M25 3V93M48 3V93M71 3V93M5 5L91 91M5 91L91 5"/><circle cx="48" cy="48" r="23"/><circle cx="48" cy="48" r="32"/></g>';
    return svg('0 0 96 96',defs+'<g clip-path="url(#'+id+'c)"><rect width="96" height="96" fill="'+(material?'url(#'+id+'f)':pal[1])+'"/>' + {weather,map,voice}[type]+(material?'<rect width="96" height="96" fill="url(#'+id+'g)"/><path d="M6 37Q46 65 92 22V0H6Z" fill="white" opacity=".09"/>':'')+(grid?guides:'')+'</g>','dl-icon');
  }
  function icons(el){
    el.innerHTML='<div class="dl-stage dl-icons"><div class="dl-icon-row"></div></div>'+row(button('构造网格','grid',true),button('扁平','flat',true),button('材质','material',false));
    let grid=true,material=false;const strip=el.querySelector('.dl-icon-row');
    function draw(){strip.innerHTML=['weather','map','voice'].map((type,i)=>'<figure>'+iconArt(type,grid,material)+'<figcaption>'+['天气','地图','录音'][i]+'</figcaption></figure>').join('');}
    on(el,'grid',()=>{grid=!grid;el.querySelector('[data-act=grid]').setAttribute('aria-pressed',String(grid));draw();});
    for(const m of ['flat','material'])on(el,m,()=>{material=m==='material';setGroup(el,['flat','material'],m);draw();});draw();
  }

  const rules=['align','scale','group','accent'],ruleNames=['对齐','字号','分组','强调色'];
  function poster(){return '<article class="dl-poster"><div class="dl-poster-top"><b>FIELD NOTES</b><span>设计公开课</span></div><h3>看见<br>城市的形状<span>.</span></h3><div class="dl-poster-foot"><strong>11.28 <em>周六</em></strong><span>14:00 — 16:00<br>海岸艺术中心 · 二楼展厅</span></div></article>';}
  function hierarchy(el){
    el.innerHTML='<div class="dl-stage dl-hierarchy">'+poster()+'</div>'+row(...rules.map((r,i)=>button(ruleNames[i],r,true)),button('查看原稿','base'));
    const art=el.querySelector('.dl-poster'),state=new Set(rules);
    function paint(){for(const r of rules){art.classList.toggle('dl-'+r,state.has(r));el.querySelector('[data-act="'+r+'"]').setAttribute('aria-pressed',String(state.has(r)));}el.querySelector('[data-act=base]').textContent=state.size?'查看原稿':'应用全部';}
    rules.forEach(r=>on(el,r,()=>{state.has(r)?state.delete(r):state.add(r);paint();}));on(el,'base',()=>{if(state.size)state.clear();else rules.forEach(r=>state.add(r));paint();});paint();
  }

  function typeSample(mode){
    if(mode==='article')return '<article class="dl-editorial"><div class="dl-folio"><span>FIELD NOTES</span><span>设计手记</span></div><h3>让眼睛找到落点</h3><p>清晨的光沿着窗沿移动。有人先看到墙上的影子，有人先看到桌边的一本书。</p><p>阅读也是这样。标题标出入口，正文承接目光，段落之间的空白给下一句话留出位置。</p></article>';
    return '<article class="dl-editorial dl-ledger"><div class="dl-folio"><span>FIELD NOTES</span><span>观测记录</span></div><h3>晨间采光记录</h3><table><thead><tr><th>观测时刻</th><th>位置</th><th>照度 lx</th></tr></thead><tbody><tr><td>07:30</td><td>窗沿</td><td>320</td></tr><tr><td>08:00</td><td>桌边</td><td>460</td></tr><tr><td>08:30</td><td>书架</td><td>510</td></tr></tbody></table></article>';
  }
  function rhythm(el){
    el.innerHTML='<div class="dl-stage dl-type"></div>'+row(button('文章','article',true),button('数据','data',false),button('字重对比','weight',true))+row(range('行距','leading',11,23,17,''));
    let mode='article',weight=true;const canvas=el.querySelector('.dl-type'),input=bindRange(el,'leading',n=>canvas.style.setProperty('--dl-leading',n/10),n=>(n/10).toFixed(1)+'×');
    function draw(){canvas.innerHTML=typeSample(mode);canvas.classList.toggle('dl-type-contrast',weight);canvas.style.setProperty('--dl-leading',+input.value/10);input.nextElementSibling.value=(+input.value/10).toFixed(1)+'×';}
    for(const m of ['article','data'])on(el,m,()=>{mode=m;setGroup(el,['article','data'],m);draw();});
    on(el,'weight',()=>{weight=!weight;el.querySelector('[data-act=weight]').setAttribute('aria-pressed',String(weight));draw();});draw();
  }

  const demos={'spring-flick':spring,'liquid-switch':liquid,'face-id':face,'continuous-corner':corners,'icon-grid':icons,'visual-hierarchy':hierarchy,'type-rhythm':rhythm};
  const previews={
    'spring-flick':()=>'<div class="dl-mini-spring">'+svg('0 0 220 100','<path d="M18 72H206M18 44H206" stroke="#becfc1" fill="none" stroke-dasharray="2 4"/><path d="M15 73C42 75 49 12 72 17C90 19 102 55 121 50C137 46 145 31 159 34S180 42 195 39" stroke="#286357" stroke-width="3.5" fill="none"/><circle cx="73" cy="17" r="8" fill="#e8af70" stroke="#286357" stroke-width="2"/>')+'</div>',
    'liquid-switch':()=>'<div class="dl-mini-switch">'+switchArt()+'</div>',
    'face-id':()=>'<div class="dl-mini-face">'+faceArt()+'</div>',
    'continuous-corner':()=>'<div class="dl-mini-corner">'+cornerPlot('both',53,false)+'</div>',
    'icon-grid':()=>'<div class="dl-mini-icons">'+['weather','map','voice'].map(t=>iconArt(t,true)).join('')+'</div>',
    'visual-hierarchy':()=>'<div class="dl-mini-poster">'+svg('0 0 230 110','<rect x="44" y="4" width="142" height="102" fill="#f4ead7"/><path d="M54 18H176M54 81H176" stroke="#383a32"/><path d="M55 32H116M55 43H160M55 54H146" stroke="#353931" stroke-width="7"/><path d="M56 70H117" stroke="#b65037" stroke-width="5"/><path d="M56 89H102M56 94H115M147 92H177" stroke="#63615a" stroke-width="2"/>')+'</div>',
    'type-rhythm':()=>'<div class="dl-mini-type">'+svg('0 0 230 110','<text x="25" y="73" font-family="Georgia,serif" font-size="76" fill="#413e36">Aa</text><path d="M137 32H202M137 41H190M137 50H199M137 67H202M137 76H191M137 85H181" stroke="#8e897a" stroke-width="2"/><path d="M22 87H112" stroke="#ae7853" stroke-width="1"/>')+'</div>'
  };
  window.AtlasDetails={
    items,
    render(id,host){if(!demos[id])return;const el=document.createElement('div');el.className='dl-demo';host.replaceChildren(el);return demos[id](el);},
    thumb(id,host){if(!previews[id])return;const el=document.createElement('div');el.className='dl-thumb dl-thumb-'+id;el.setAttribute('aria-hidden','true');el.innerHTML=previews[id]();host.replaceChildren(el);}
  };
})();
