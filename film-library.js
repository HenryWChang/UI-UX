(() => {
  'use strict';
  const item = {
    id:'one-take', group:'motion', title:'一镜到底的连续转场', en:'One-take motion',
    summary:'跟踪同一块日程、同一个耳机盒或同一张海报。拖动时间轴，可逐帧观察画面如何继承位置、颜色和形状。',
    keywords:['一镜到底','onetake','日历','海报','耳机','转场','声音','节奏'], source:15
  };
  const scenes = [
    {title:'日历转场', marks:['桌面周历','跟随日程色块','手机详情'], duration:4.8},
    {title:'降噪留白', marks:['噪声累积','收拢并静音','耳机盒留在原地'], duration:4.2},
    {title:'海报重排', marks:['横幅网格','模块重新排布','竖版海报'], duration:5}
  ];
  const mix=(a,b,t)=>a+(b-a)*t;
  function ease(t,a,b) { const p=Math.max(0,Math.min(1,(t-a)/(b-a))); return p*p*(3-2*p); }
  function rect(c,x,y,w,h,color,r=0) {
    c.fillStyle=color; c.beginPath(); c.roundRect(x,y,w,h,Math.min(Math.max(0,r),w/2,h/2)); c.fill();
  }
  function txt(c,v,x,y,size,color,font='sans-serif',weight='500') {
    c.font=weight+' '+size+'px '+font;c.fillStyle=color;c.fillText(v,x,y);
  }
  function stroke(c,x1,y1,x2,y2,col,width=1) {
    c.strokeStyle=col;c.lineWidth=width;c.beginPath();c.moveTo(x1,y1);c.lineTo(x2,y2);c.stroke();
  }
  function fade(c,alpha,fn){c.save();c.globalAlpha*=Math.max(0,Math.min(1,alpha));fn();c.restore();}
  function track(c,cx,cy,t) {
    c.strokeStyle='#fbe0b3'; c.lineWidth=1.7; c.beginPath();
    const pts=[[0,50],[23,30],[48,39],[68,20],[94,27],[124,0]];
    pts.forEach(([x,y],i)=>i?c.lineTo(cx+x,cy+y):c.moveTo(cx+x,cy+y));c.stroke();
    pts.forEach(([x,y])=>{c.beginPath();c.arc(cx+x,cy+y,2.4+t,0,Math.PI*2);c.fillStyle='#fff0d4';c.fill();});
  }
  function calendar(c,t) {
    const camera=ease(t,.14,.74), outline=ease(t,.34,.89);
    rect(c,0,0,720,386,'#ece7d6');
    // The orange event is drawn once. Its bounds travel from a grid cell to the detail card.
    fade(c,1-ease(t,.28,.66),()=>{
      c.save();c.translate(342,190);c.scale(1+camera*.12,1+camera*.12);c.translate(-342,-190);
      rect(c,67,41,586,299,'#faf8ee',12);
      txt(c,'周计划',91,85,24,'#292e29','serif','700');txt(c,'09 / 22 — 28',497,83,14,'#687464','monospace');
      const days=['周一','周二','周三','周四','周五','周六'];
      days.forEach((d,i)=>{const x=91+i*90;txt(c,d,x,123,13,'#677364');stroke(c,x-6,136,x-6,313,'#e1dfd2');});
      [153,201,248,295].forEach(y=>stroke(c,85,y,627,y,'#e8e6db'));
      [[93,163,69,'#62867f'],[179,226,68,'#9ba443'],[270,157,66,'#d8a84e'],[365,249,69,'#6c8f84'],[452,174,67,'#a4a64f'],[537,219,66,'#efb888']].forEach(([x,y,w,col])=>rect(c,x,y,w,31,col,4));
      c.restore();
    });
    fade(c,outline,()=>{
      rect(c,251,16,217,353,'#272d29',27);rect(c,255,20,209,345,'#f7f3df',23);
      txt(c,'09:41',271,41,10,'#4d5146','monospace');rect(c,331,26,57,10,'#282f29',6);
      txt(c,'星期四',274,75,22,'#262e28','serif','700');rect(c,330,350,59,3,'#29352a',2);
    });
    const x=mix(355,266,camera),y=mix(153,89,camera),w=mix(77,187,camera),h=mix(39,229,camera);
    rect(c,x,y,w,h,'#c94f36',mix(4,15,camera));
    txt(c,'发布日',x+mix(7,13,camera),y+mix(23,38,camera),mix(13,24,camera),'#fff3d7','serif','700');
    fade(c,ease(t,.48,.86),()=>{
      txt(c,'10:00 – 13:00',x+13,y+63,13,'#fff0d7','monospace');track(c,x+22,y+103,camera);
      rect(c,x+13,y+h-42,w-26,26,'#f9eacc',14);txt(c,'查看日程',x+57,y+h-24,12,'#53291f');
    });
  }
  const noiseWords=['HONK','tap','clack','咔哒','SSSH','滴滴','whirr','RING','轰','ding','BOOM','chatter'];
  const noiseColors=['#f5c35a','#f28267','#94bbbc','#c4a0cd','#e9d4ab'];
  function hush(c,t) {
    rect(c,0,0,720,386,'#33233f');
    const build=ease(t,0,.49),quiet=ease(t,.49,.73);
    const count=12+Math.floor(build*63);
    for(let i=0;i<count;i++){
      const col=noiseColors[i%noiseColors.length],word=noiseWords[(i*7)%noiseWords.length];
      const x=((i*137+31)%753)-22,base=352-Math.floor(i/11)*32+(i%4)*5;
      const y=base+Math.sin(t*24+i*1.7)*(2+5*build);
      fade(c,(1-quiet)*.93,()=>{txt(c,word,mix(x,360,quiet),mix(y,235,quiet),15+(i%5)*5,col,i%3?'serif':'sans-serif',i%2?'700':'400');});
    }
    const u=ease(t,.10,.74),cy=mix(104,202,u),size=mix(.60,1,u);
    c.save();c.translate(360,cy);c.scale(size,size);
    rect(c,-63,-26,126,75,'#e7d7b6',25);rect(c,-61,-25,122,31,'#f8ebce',21);
    stroke(c,-57,8,57,8,'#c6b790',1.4);rect(c,-2,20,4,4,'#787451',2);c.restore();
    fade(c,ease(t,.68,.92),()=>{
      c.textAlign='center';txt(c,'Hush.',360,105,46,'#f5e5d0','serif');txt(c,'安静模式',360,288,14,'#d2c1cd');c.textAlign='start';
    });
  }
  const tiles=[
    {from:[70,55,274,140],to:[269,38,182,84],bg:'#f1be77',fg:'#162b40',text:'FRAME'},
    {from:[350,55,150,140],to:[269,127,89,67],bg:'#ea7958',fg:'#222b39',text:'14/15'},
    {from:[506,55,144,140],to:[363,127,88,67],bg:'#8dbdb1',fg:'#1b3344',text:'NOV'},
    {from:[70,201,211,125],to:[269,199,182,62],bg:'#91b8d2',fg:'#162e42',text:'BERLIN'},
    {from:[287,201,209,125],to:[269,266,89,69],bg:'#e7b5b0',fg:'#30293a',text:'TYPE'},
    {from:[502,201,148,125],to:[363,266,88,69],bg:'#eed55b',fg:'#1d2d42',text:'MOTION'}
  ];
  function poster(c,t){
    rect(c,0,0,720,386,'#172b40');
    for(let x=0;x<=720;x+=30)stroke(c,x,0,x,386,'#294055');
    for(let y=0;y<=386;y+=30)stroke(c,0,y,720,y,'#294055');
    tiles.forEach((tile,i)=>{
      const u=ease(t,.12+i*.047,.64+i*.048);
      const [x,y,w,h]=tile.from.map((v,j)=>mix(v,tile.to[j],u));
      rect(c,x,y,w,h,tile.bg,1);
      c.font='900 100px sans-serif';
      const naturalWidth=c.measureText(tile.text).width;
      const font=Math.min(100*(w-16)/naturalWidth,h*.62,65);
      txt(c,tile.text,x+7,y+h*.65,font,tile.fg,'sans-serif','900');
      rect(c,x+8,y+8,Math.min(w*.30,55),3,tile.fg);
    });
  }
  const painters=[calendar,hush,poster];
  function draw(canvas,scene,time) {
    const c=canvas.getContext('2d');
    if(!c)return;
    c.setTransform(canvas.width/720,0,0,canvas.height/386,0,0);
    c.clearRect(0,0,720,386);
    c.save();painters[scene](c,time);c.restore();
  }
  function canvasFor(thumb=false) {
    const canvas=document.createElement('canvas');
    canvas.width=thumb?480:1080;canvas.height=thumb?257:579;
    canvas.setAttribute('aria-hidden','true');
    return canvas;
  }
  function render(id,host) {
    const root=document.createElement('div');root.className='film-lab';
    root.innerHTML='<div class="film-modes" aria-label="案例"></div><div class="film-canvas"></div><div class="film-caption" aria-live="polite"></div><div class="film-controls"><button type="button" data-film="play"></button><button type="button" data-film="reset">回到开头</button><button type="button" data-film="speed" aria-pressed="false">半速</button><button type="button" data-film="sound" aria-pressed="false">声音关</button></div><label class="film-time">时间轴<input type="range" min="0" max="1000" step="1" value="0"><output></output></label>';
    host.replaceChildren(root);
    const canvas=canvasFor();root.querySelector('.film-canvas').append(canvas);
    const scr=root.querySelector('input'), out=root.querySelector('output'), caption=root.querySelector('.film-caption');
    const ctrl=key=>root.querySelector('[data-film="'+key+'"]');
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
    let selected=0,pos=0,last=null,frame=0,speed=1,sound=false,audio=null,phase=-1;
    const modeButtons=scenes.map((s,i)=>{
      const b=document.createElement('button');b.type='button';b.textContent=s.title;
      b.onclick=()=>{pause();selected=i;pos=0;phase=-1;paint();};root.querySelector('.film-modes').append(b);return b;
    });
    function tone(idx){
      if(!sound||!audio||audio.state!=='running')return;
      const osc=audio.createOscillator(),gain=audio.createGain(),now=audio.currentTime;
      osc.frequency.value=[242,323,485][idx];osc.connect(gain);gain.connect(audio.destination);
      gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.047,now+.012);gain.gain.exponentialRampToValueAtTime(.0001,now+.15);osc.start(now);osc.stop(now+.16);
    }
    function paint(){
      draw(canvas,selected,pos);const s=scenes[selected];const next=pos<.25?0:pos<.74?1:2;
      if(next!==phase){phase=next;caption.textContent=s.marks[next];if(frame)tone(next);}
      scr.value=Math.round(pos*1000);
      out.value=(pos*s.duration).toFixed(1)+' / '+s.duration.toFixed(1)+' s';
      ctrl('play').textContent=reduce.matches?'切到下一画面':frame?'暂停':pos>=1?'重播':'播放';
      modeButtons.forEach((b,i)=>b.setAttribute('aria-pressed',String(i===selected)));
    }
    function pause(){if(frame)cancelAnimationFrame(frame);frame=0;last=null;}
    function run(now){
      if(last!==null)pos=Math.min(1,pos+(now-last)*speed/(1000*scenes[selected].duration));
      last=now;if(pos>=1)pause();else frame=requestAnimationFrame(run);paint();
    }
    ctrl('play').onclick=()=>{
      if(reduce.matches){pause();pos=pos<.5?.52:pos<1?1:0;paint();return;}
      if(frame){pause();paint();return;}
      if(pos>=1){pos=0;phase=-1;}last=null;frame=requestAnimationFrame(run);paint();
    };
    ctrl('reset').onclick=()=>{pause();pos=0;paint();};
    ctrl('speed').onclick=()=>{speed=speed===1?.5:1;ctrl('speed').setAttribute('aria-pressed',String(speed===.5));};
    ctrl('sound').onclick=async()=>{
      try {
        if(!sound){const Context=window.AudioContext||window.webkitAudioContext;if(!Context)return;audio ||= new Context();await audio.resume();}
        sound=!sound;ctrl('sound').textContent=sound?'声音开':'声音关';ctrl('sound').setAttribute('aria-pressed',String(sound));if(sound)tone(0);
      }catch{ctrl('sound').textContent='声音不可用';ctrl('sound').disabled=true;}
    };
    if(!window.AudioContext&&!window.webkitAudioContext)ctrl('sound').hidden=true;
    scr.oninput=()=>{pause();pos=Number(scr.value)/1000;paint();};
    function onPreference(){pause();paint();}
    reduce.addEventListener('change',onPreference);paint();
    return ()=>{pause();reduce.removeEventListener('change',onPreference);if(audio)audio.close().catch(()=>{});};
  }
  function thumb(id,host){const c=canvasFor(true);c.className='film-thumb';draw(c,2,.36);host.replaceChildren(c);}
  window.AtlasFilm={items:[item],render,thumb};
})();
