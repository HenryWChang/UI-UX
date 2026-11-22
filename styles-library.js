(() => {
  'use strict';

  const items = [
    ['swiss', '瑞士风格', 'Swiss Style', '让文字和图形共用一套网格。利用不对称布局、齐左排版和单一强调色，建立清楚的阅读次序。', ['模块网格', '齐左排版', '黑白红']],
    ['minimal', '极简主义', 'Minimalism', '把背景、边框和颜色减到最少，将足够的空间留给一行标题、一件作品。', ['大量留白', '克制配色', '内容优先']],
    ['glass', '玻璃态', 'Glassmorphism', '让彩色背景透过半透明面板，结合模糊、细亮边和重叠关系呈现玻璃的厚度。', ['半透明', '背景模糊', '高光描边']],
    ['neo', '新拟物', 'Neumorphism', '把控件与底板做成同一色系，用相反方向的明暗投影塑造凸起与凹陷。', ['双向阴影', '同色表面', '软浮雕']],
    ['cyber', '赛博朋克', 'Cyberpunk', '深色底上用高亮青色、荧光品红、锋利切角和等宽数字营造电子仪器感。', ['霓虹色', '切角', '扫描线']],
    ['brutal', '粗野主义', 'Brutalism', '用醒目的粗边框、硬阴影和强对比暴露版面结构，让每个区块像独立的印刷色块。', ['粗边框', '硬阴影', '强对比', '布鲁塔主义']],
    ['y2k', 'Y2K 千禧年', 'Y2K', '铬色金属、液态高光和亮粉色把早期数字时代对未来的想象带回屏幕。', ['铬金属', '虹彩', '千禧年']],
    ['luxury', '暗黑奢华', 'Dark Luxury', '以黑色、深墨绿和少量金色建立沉静气氛。使用细线、宽字距和衬线字处理展品与题签。', ['暗底', '金色细线', '衬线字']],
    ['material', '材料设计', 'Material Design', '用有层次的色面与圆角容器划分内容，以清晰的形状、状态色提示哪些条目可以选择。', ['色调表面', '层级', '圆角']],
    ['fluent', '流畅设计', 'Fluent Design', '用柔和的环境色、半透材质与细微层次划出工作区，让当前内容与周围环境保持联系。', ['亚克力', '环境光', '深度']],
    ['apple', 'Apple HIG', 'Apple HIG', '用清晰的标题、充足的触控空间、分组列表和熟悉的选中标记组织内容。', ['分组列表', '系统层级', '清晰反馈']],
    ['bento', '便当格', 'Bento Grid', '把一条主线拆进大小不同的卡片。卡片在共同的列线与间距上拼接，面积表达信息分量。', ['模块卡片', '不等分', '统一间距']],
    ['dashboard', '后台仪表盘', 'Dashboard', '同时展示多个条目与读数，用紧凑的行列、对齐的数字和一致的状态标记提高扫读效率。', ['数据密度', '等宽数字', '表格']],
    ['nordic', '北欧自然风', 'Nordic', '采用亚麻白、鼠尾草绿和温和的有机轮廓，让内容在舒适的留白中展开。', ['自然色', '有机形状', '温暖留白']],
    ['memphis', '孟菲斯', 'Memphis', '把圆、三角形、波浪线和网点穿插在一起，通过明快撞色与不规则节奏呈现玩心。', ['撞色', '几何拼贴', '波浪线']],
    ['aurora', '动感渐变', 'Aurora Gradient', '让几组彩色光带在暗背景中交融。光带的缓慢移动与稳定的文字层形成前后关系。', ['极光色带', '叠色', '柔和光晕']],
    ['editorial', '编辑部风格', 'Editorial', '把大标题、题记、栏线和正文组织成杂志跨页，用衬线和无衬线的对照控制阅读节奏。', ['杂志网格', '字号反差', '混合字体']]
  ].map(([id, title, en, summary, keywords]) => ({id, title, en, summary, keywords, source: id === 'swiss' ? 2 : 5}));

  const tracks = [
    {name:'码头回声', en:'Harbour echoes', time:'03:42', place:'东岸码头', hour:'06:18', note:'渡船离岸，缆绳擦过金属栏杆。远处的引擎声慢慢浮到水面上。'},
    {name:'雨过长廊', en:'After the rain', time:'02:56', place:'旧城长廊', hour:'14:36', note:'阵雨刚停，屋檐的水滴落在石阶上。脚步声从长廊另一头靠近，又渐渐远去。'},
    {name:'夜行末班车', en:'Last tram home', time:'04:11', place:'南站月台', hour:'22:47', note:'站台的提示铃响了两次，车门合拢。铁轨的余响留在安静下来的街口。'}
  ];

  const W = 720, H = 450;
  const tau = Math.PI * 2;
  const artCache = new Map();

  function ellipse(c, x, y, rx, ry, fill, stroke, width = 1) {
    c.beginPath();
    c.ellipse(x, y, rx, ry, 0, 0, tau);
    if (fill) { c.fillStyle = fill; c.fill(); }
    if (stroke) { c.strokeStyle = stroke; c.lineWidth = width; c.stroke(); }
  }

  function polygon(c, points, fill, stroke, width = 1) {
    c.beginPath();
    points.forEach(([x,y], i) => i ? c.lineTo(x,y) : c.moveTo(x,y));
    c.closePath();
    if (fill) { c.fillStyle = fill; c.fill(); }
    if (stroke) { c.strokeStyle = stroke; c.lineWidth = width; c.stroke(); }
  }

  function rect(c, x, y, w, h, fill, radius = 0) {
    c.fillStyle = fill;
    if (!radius) { c.fillRect(x, y, w, h); return; }
    c.beginPath(); c.roundRect(x,y,w,h,radius); c.fill();
  }

  function line(c, points, color, width) {
    c.beginPath();
    points.forEach(([x,y], i) => i ? c.lineTo(x,y) : c.moveTo(x,y));
    c.strokeStyle = color; c.lineWidth = width; c.stroke();
  }

  function linear(c, x1,y1,x2,y2, stops) {
    const gradient = c.createLinearGradient(x1,y1,x2,y2);
    stops.forEach(([at,color]) => gradient.addColorStop(at,color));
    return gradient;
  }

  function glow(c,x,y,r,inside,outside) {
    const gradient = c.createRadialGradient(x,y,0,x,y,r);
    gradient.addColorStop(0,inside); gradient.addColorStop(1,outside);
    rect(c,x-r,y-r,r*2,r*2,gradient);
  }

  function turn(c, x, y, angle, paint) {
    c.save(); c.translate(x,y); c.rotate(angle); paint(); c.restore();
  }

  function sparkle(c,x,y,r,fill,stretch = 1) {
    c.save(); c.translate(x,y); c.scale(stretch,1); c.beginPath();
    c.moveTo(0,-r); c.quadraticCurveTo(r*.10,-r*.1,r,0);
    c.quadraticCurveTo(r*.1,r*.1,0,r); c.quadraticCurveTo(-r*.1,r*.1,-r,0);
    c.quadraticCurveTo(-r*.1,-r*.1,0,-r); c.fillStyle=fill; c.fill(); c.restore();
  }

  function waveform(c,x,y,width,height,color,seed = 0) {
    const values = Array.from({length:49},(_,i) => 0.12 + .88 * Math.abs(Math.sin(i * .55 + seed) * Math.cos(i * .32 + seed) * Math.sin(i * .08 + .4)));
    values.forEach((value,i) => rect(c,x+i*width/values.length,y-height*value/2,Math.max(2,width/values.length*.48),Math.max(2,height*value),color,1));
  }

  const artwork = {
    swiss(c) {
      rect(c,0,0,W,H,'#f34225');
      c.save(); c.translate(380,214); c.rotate(-.45);
      for(let i=0;i<9;i++) {
        const radius=38+i*19;
        c.beginPath(); c.arc(-80,0,radius,Math.PI/2,Math.PI*1.5);
        c.arc(80,0,radius,Math.PI*1.5,Math.PI/2);
        c.closePath(); c.strokeStyle='#171716'; c.lineWidth=11; c.stroke();
      }
      c.restore();
      rect(c,43,39,50,7,'#171716'); rect(c,43,51,32,4,'#171716');
      for(let i=0;i<10;i++) rect(c,607+i*6,394,2,i%3 === 0 ? 15 : 8,'#171716');
    },
    minimal(c) {
      rect(c,0,0,W,H,'#f6f5f1');
      c.save(); c.translate(352,224); c.rotate(.33);
      for(let i=0;i<36;i++){
        c.beginPath(); c.ellipse(0,(i-17)*2.4,164-i*.9,62+i*.48,i*.011,0,tau);
        c.lineWidth=i%5 === 0 ? 1.3 : .8; c.strokeStyle='#55534e'; c.stroke();
      } c.restore();
      ellipse(c,532,135,5,5,'#292925');
    },
    glass(c) {
      rect(c,0,0,W,H,linear(c,0,0,W,H,[[0,'#c8a4f5'],[.44,'#9380de'],[1,'#7995df']]));
      glow(c,172,183,162,'#ffb4cb','#ffb4cb00');
      glow(c,590,350,224,'#95e5f6','#95e5f600');
      ellipse(c,257,160,102,102,linear(c,188,72,342,250,[[0,'#ffeef3'],[.25,'#f7b5dc'],[.63,'#c381c8'],[1,'#856bca']]));
      ellipse(c,501,288,69,69,linear(c,472,231,553,345,[[0,'#f7fdff'],[.5,'#a8eaed'],[1,'#668bd8']]));
      turn(c,362,232,-.14,()=>{
        c.shadowColor='rgba(80,62,138,.22)';c.shadowBlur=22;c.shadowOffsetY=14;
        rect(c,-147,-76,294,152,linear(c,-130,-70,120,70,[[0,'#ffffff99'],[.5,'#eee9ff63'],[1,'#ffffff30']]),22);
        c.shadowColor='transparent';c.strokeStyle='#ffffffb0';c.lineWidth=2;c.stroke();
        waveform(c,-100,0,205,82,'#ffffffe8',1);
      });
      sparkle(c,569,105,11,'#ffffffe6');
    },
    neo(c) {
      rect(c,0,0,W,H,'#dde1e4');
      const surface=linear(c,270,125,458,330,[[0,'#f7f9fa'],[.55,'#e2e6e8'],[1,'#cfd4d9']]);
      c.save();c.shadowColor='#aab0b7';c.shadowBlur=23;c.shadowOffsetX=15;c.shadowOffsetY=17;
      ellipse(c,360,221,130,130,surface);c.restore();
      c.save();c.shadowColor='#ffffff';c.shadowBlur=22;c.shadowOffsetX=-12;c.shadowOffsetY=-12;
      ellipse(c,360,221,129,129,surface);c.restore();
      ellipse(c,360,221,105,105,linear(c,263,120,432,312,[[0,'#b9c1c7'],[.48,'#dce0e4'],[1,'#ffffff']]));
      ellipse(c,360,221,100,100,surface);
      for(let i=0;i<42;i++){
        const a=i*tau/42+.7; const r=i%7 === 0 ? 140 : 145;
        line(c,[[360+Math.cos(a)*r,221+Math.sin(a)*r],[360+Math.cos(a)*150,221+Math.sin(a)*150]],'#a5afb5',i%7===0?2.5:1);
      }
      turn(c,360,221,-.73,()=>rect(c,48,-5,35,10,'#63798c',5));
    },
    cyber(c) {
      rect(c,0,0,W,H,'#0b1122');
      for(let x=0;x<W;x+=28)line(c,[[x,0],[x,H]],'#17243c',1);
      for(let y=0;y<H;y+=28)line(c,[[0,y],[W,y]],'#17243c',1);
      const rows=30, cols=55;
      for(let j=0;j<rows;j++){
        const points=[];
        for(let i=0;i<cols;i++){
          const x=63+i*9+j*3.2, f=(i-26)/12, v=(j-16)/7;
          const z=99*Math.exp(-(f*f+v*v)*.9)+39*Math.exp(-((i-15)**2/38+(j-8)**2/42));
          points.push([x,163+j*4.55-z+11*Math.sin(i*.17+j*.26)]);
        }
        line(c,points,j%6===0?'#ff5eae':j<15?'#8c6aeb':'#58ebdf',1.9);
      }
      [[87,90],[633,90],[87,351],[633,351]].forEach(([x,y])=>{line(c,[[x-7,y],[x+7,y]],'#65fff0',2);line(c,[[x,y-7],[x,y+7]],'#65fff0',2);});
      for(let i=0;i<14;i++)rect(c,102+i*5,315,2,9,'#fa54a9');
    },
    brutal(c) {
      rect(c,0,0,W,H,'#f2e875');
      const ink='#191b17';
      turn(c,244,258,-.14,()=>{
        rect(c,-120,-82,250,160,ink);rect(c,-133,-96,250,160,'#b49af4');
        c.strokeStyle=ink;c.lineWidth=5;c.strokeRect(-133,-96,250,160);
        for(let x=-106;x<82;x+=18)rect(c,x,-62,8,95,ink);
      });
      const star=[];
      for(let i=0;i<32;i++){const a=i*tau/32,r=i%2?75:111;star.push([450+r*Math.cos(a),194+r*Math.sin(a)]);}
      polygon(c,star,'#ff784f',ink,6);
      ellipse(c,450,194,28,28,ink);
      line(c,[[514,290],[564,291],[564,241]],ink,12);
      line(c,[[552,250],[563,235],[576,247]],ink,10);
    },
    y2k(c) {
      rect(c,0,0,W,H,linear(c,0,0,W,H,[[0,'#dfc2ed'],[.45,'#cabaf8'],[1,'#aac5ec']]));
      glow(c,480,155,220,'#e9f9ff','#e9f9ff00');
      const chrome=linear(c,0,-110,0,110,[[0,'#eee6ff'],[.22,'#e3fafe'],[.38,'#8597d0'],[.5,'#4b4781'],[.54,'#ffedfa'],[.62,'#b5d6f7'],[.81,'#7769b1'],[1,'#fff0f8']]);
      c.save();c.translate(355,224);c.rotate(-.29);
      ellipse(c,0,0,110,110,chrome,'#f0edff',2);
      for(let i=0;i<3;i++){
        c.beginPath();c.ellipse(0,2,193+i*5,48+i*4,-.1,0,tau);
        c.strokeStyle=i===1?'#5f6098':i===0?'#fff8ff':'#ebfbff';c.lineWidth=i===1?4:3;c.stroke();
      }c.restore();
      sparkle(c,542,122,32,'#fff');sparkle(c,159,282,18,'#fff');sparkle(c,209,110,8,'#7a699c');
    },
    luxury(c) {
      rect(c,0,0,W,H,linear(c,0,0,W,H,[[0,'#111d1a'],[1,'#202c21']]));
      const gold=linear(c,160,90,540,350,[[0,'#7b6741'],[.32,'#e3d39f'],[.66,'#ad874c'],[1,'#e6d3a4']]);
      c.save();c.translate(360,223);
      for(let i=0;i<27;i++){
        c.rotate(Math.PI/27);
        c.beginPath();c.ellipse(0,0,147,58,0,0,tau);c.strokeStyle=gold;c.lineWidth=i%3===0?1.5:.8;c.stroke();
      }c.restore();
      ellipse(c,360,223,28,28,'#19251d',gold,1.3);sparkle(c,360,223,15,'#d7bc86',.58);
      line(c,[[38,36],[70,36]],gold,1);line(c,[[650,412],[682,412]],gold,1);
    },
    material(c) {
      rect(c,0,0,W,H,'#e5dfef');
      const petal=[];
      for(let i=0;i<=240;i++){
        const a=i*tau/240, r=113+13*Math.cos(9*a);
        petal.push([292+r*Math.cos(a),211+r*Math.sin(a)]);
      }
      polygon(c,petal,'#74549b');
      ellipse(c,292,211,60,60,'#e8daf9');
      c.save();c.translate(442,281);c.rotate(-.31);rect(c,-79,-55,158,90,'#bdc997',45);
      waveform(c,-47,-11,94,40,'#374728',.6);c.restore();
      ellipse(c,479,130,37,37,'#edbc9f');ellipse(c,476,127,9,9,'#9b543c');
    },
    fluent(c) {
      rect(c,0,0,W,H,linear(c,0,0,W,H,[[0,'#c4e1ed'],[.5,'#b4d0ef'],[1,'#abbbe3']]));
      for(let i=0;i<7;i++) {
        c.beginPath();c.moveTo(85+i*30,374);c.bezierCurveTo(215+i*32,316,95+i*30,129,291+i*31,100);
        c.bezierCurveTo(452+i*21,69,410+i*22,225,554+i*20,158);
        c.bezierCurveTo(435+i*20,277,438+i*20,120,319+i*28,157);
        c.bezierCurveTo(169+i*30,210,289+i*27,337,85+i*30,374);
        c.fillStyle=linear(c,150,130,535,350,[[0,i%2?'#b5eff5':'#e0f9ff'],[.42,'#6499d4'],[.7,'#d7e4ff'],[1,'#728cc5']]);c.fill();
      }
    },
    apple(c) {
      rect(c,0,0,W,H,linear(c,0,0,W,H,[[0,'#eeeef2'],[1,'#dddfe6']]));
      c.save();c.shadowColor='#a5a5b144';c.shadowBlur=20;c.shadowOffsetY=12;
      rect(c,226,91,268,268,'#fff',57);c.restore();
      rect(c,230,95,260,260,linear(c,230,95,490,355,[[0,'#fbfbfe'],[1,'#f3f3f7']]),53);
      const shades=['#fa447a','#fa4a90','#e83ba5','#b840ca','#9245d5','#754ed8','#6264df','#4d82e3','#4197dc'];
      const bars=[34,61,92,126,144,112,78,49,29];
      bars.forEach((v,i)=>rect(c,271+i*20,225-v/2,11,v,shades[i],5.5));
    },
    bento(c) {
      rect(c,0,0,W,H,'#eeeae4');
      rect(c,140,74,228,299,'#292c32',24);
      for(let i=0;i<12;i++){c.beginPath();c.arc(254,220,22+i*8,.3,Math.PI*1.58);c.strokeStyle=i%3===0?'#ede7d8':'#a5a498';c.lineWidth=2.6;c.stroke();}
      rect(c,380,74,198,139,'#d9b7f3',24); sparkle(c,478,143,49,'#573675',.81);
      rect(c,380,225,90,148,'#f2a979',24);
      for(let i=0;i<4;i++)rect(c,399+i*10,271+i*5,5,48-i*8,'#a44a2f',2);
      rect(c,482,225,96,148,'#c2d8a1',24);ellipse(c,530,299,28,28,null,'#526a38',3);
      ellipse(c,530,299,18,18,null,'#526a38',2);
    },
    dashboard(c) {
      rect(c,0,0,W,H,'#172b3b');
      const xs=[90,180,270,360,450,540,630],ys=[104,151,198,245,292,339];
      xs.forEach(x=>line(c,[[x,89],[x,343]],'#2a4050',1));ys.forEach(y=>line(c,[[83,y],[636,y]],'#324858',1));
      for(let i=0;i<51;i++){
        const v=26 + Math.abs(Math.sin(i*.38)*Math.cos(i*.11)*64)+Math.sin(i*.24)*12;
        rect(c,87+i*10.5,338-v,6,v,'#35556b',1);
      }
      const points=Array.from({length:31},(_,i)=>[90+i*17.6,240-i*3.6+Math.sin(i*.54)*28+Math.sin(i*1.39)*11]);
      line(c,points,'#78dcbd',4);
      [0,8,18,30].forEach(i=>ellipse(c,points[i][0],points[i][1],5,5,'#182e3f','#94f4d6',2.5));
    },
    nordic(c) {
      rect(c,0,0,W,H,'#e9e6d7');ellipse(c,452,144,60,60,'#cf936e');
      polygon(c,[[0,310],[82,300],[198,253],[287,237],[388,253],[498,223],[634,208],[720,235],[720,450],[0,450]],'#bac2a8');
      c.beginPath();c.moveTo(0,333);c.bezierCurveTo(130,265,204,358,352,286);c.bezierCurveTo(497,214,592,267,720,245);c.lineTo(720,450);c.lineTo(0,450);c.closePath();c.fillStyle='#778b72';c.fill();
      c.beginPath();c.moveTo(0,369);c.bezierCurveTo(140,322,277,400,437,308);c.bezierCurveTo(512,267,622,271,720,290);c.lineTo(720,450);c.lineTo(0,450);c.fillStyle='#405d55';c.fill();
      for(let i=0;i<11;i++){c.beginPath();c.moveTo(0,382+i*7);c.bezierCurveTo(123,338+i*7,275,405+i*7,440,327+i*7);c.bezierCurveTo(529,280+i*7,602,284+i*7,720,310+i*7);c.strokeStyle='#819184';c.lineWidth=.9;c.stroke();}
    },
    memphis(c) {
      rect(c,0,0,W,H,'#f4c3cf');
      ellipse(c,275,224,91,91,'#f5c548','#252429',5);
      turn(c,427,221,.28,()=>polygon(c,[[-76,63],[76,63],[0,-91]],'#7974d9','#24242b',5));
      turn(c,275,325,-.17,()=>{
        const nodes=Array.from({length:84},(_,i)=>[i*2.6-87,Math.sin(i/6)*11]);
        line(c,nodes,'#24242b',8);
      });
      for(let y=92;y<=142;y+=12)for(let x=419;x<=521;x+=13)ellipse(c,x+(y%24?4:0),y,2.5,2.5,'#3d3541');
      turn(c,168,126,-.47,()=>rect(c,-7,-29,15,58,'#428ba9',7));ellipse(c,504,308,24,24,null,'#f95f50',10);
    },
    aurora(c) {
      rect(c,0,0,W,H,'#201f49');
      glow(c,190,134,275,'#53649a','#53649a00');glow(c,593,301,284,'#454583','#45458300');
      for(let i=0;i<106;i++){
        const t=i/105, ridge=Math.sin(t*Math.PI);
        c.beginPath();c.moveTo(-30,316+i*.5);
        c.bezierCurveTo(101,282+i*.95,151,272-i*1.8,301,235-i*.8);
        c.bezierCurveTo(434,224-i*.3,474,240-i*.8,536,150-i*.38);
        c.bezierCurveTo(611,60+i*.25,690,117-i*.5,758,71+i*.12);
        c.strokeStyle=linear(c,40,300,670,110,[
          [0,`hsl(${290+27*ridge} 48% ${62+10*ridge}%)`],
          [.53,`hsl(${215+52*ridge} 51% ${64+5*t}%)`],
          [1,`hsl(${173+27*ridge} 59% ${64+8*t}%)`]
        ]);
        c.globalAlpha=.055+.65*Math.pow(ridge,.62);
        c.lineWidth=3.1;c.stroke();
      }c.globalAlpha=1;
      for(let i=0;i<26;i++){const x=(i*223+59)%W,y=(i*i*13+37)%H;ellipse(c,x,y,i%4?1:1.6,i%4?1:1.6,'#fff9');}
    },
    editorial(c) {
      rect(c,0,0,W,H,'#e7e1d5');
      rect(c,56,52,608,346,'#f3ede2');
      c.save();c.beginPath();c.rect(312,89,286,268);c.clip();
      rect(c,312,89,286,268,'#202522');
      for(let i=0;i<66;i++){
        c.beginPath();c.moveTo(305,159+i*5);c.bezierCurveTo(370,151+i*3.1,408,80+i*2.9,472,115+i*4);
        c.bezierCurveTo(514,145+i*4.4,526,170+i*3.5,606,149+i*3.3);
        c.strokeStyle='#d6d6c8';c.lineWidth=1.65;c.stroke();
      }c.restore();
      c.fillStyle='#202522';c.font='italic 200px Georgia,serif';c.fillText('f',118,283);
      line(c,[[92,319],[268,319]],'#202522',2);
      [107,153,89].forEach((v,i)=>rect(c,92,329+i*6,v,2,'#79796d'));
      line(c,[[92,75],[629,75]],'#47493f',1);line(c,[[92,374],[629,374]],'#47493f',1);
    }
  };

  function art(id) {
    if (!artCache.has(id)) {
      const canvas=document.createElement('canvas');
      canvas.width=W; canvas.height=H;
      const context=canvas.getContext('2d');
      if (context) artwork[id](context);
      artCache.set(id,canvas);
    }
    const copy=document.createElement('canvas');
    copy.className='sl-art';
    copy.width=W; copy.height=H; copy.setAttribute('aria-hidden','true');
    copy.getContext('2d')?.drawImage(artCache.get(id),0,0);
    return copy;
  }

  function thumb(id,host) {
    if (!Object.hasOwn(artwork,id) || !host) return;
    host.replaceChildren(art(id));
  }

  function render(id, host) {
    if (!Object.hasOwn(artwork,id) || !host) return;
    const section=document.createElement('section');
    section.className='sl-demo sl-'+id;
    section.setAttribute('aria-label','周末声音档案，'+items.find(item=>item.id===id).title+'样例');
    section.innerHTML=`
      <div class="sl-inner">
        <div class="sl-mast"><span class="sl-wordmark"><i aria-hidden="true"></i>声场档案馆</span><span>周末特辑 / VOL. 01</span></div>
        <div class="sl-stage">
          <div class="sl-copy"><span class="sl-kicker" lang="en">Field Recordings</span><h3 class="sl-heading">周末声音档案</h3><p class="sl-deck">从清晨的码头到深夜的站台，沿着三段录音走过城市的一天。</p></div>
          <figure class="sl-cover"></figure>
        </div>
        <div class="sl-index">
          <div class="sl-tracklist"><h4 class="sl-index-title">录音目录</h4><div class="sl-choices">${tracks.map((t,i)=>`<button class="sl-track" type="button" aria-pressed="${i===0}" data-track="${i}"><span class="sl-track-no">0${i+1}</span><span class="sl-track-name">${t.name}</span><span class="sl-track-time">${t.time}</span></button>`).join('')}</div></div>
          <div class="sl-note" aria-live="polite" aria-atomic="true"><div class="sl-note-meta"><span class="sl-location"></span><span class="sl-time"></span></div><h4 class="sl-note-name" lang="en"></h4><p class="sl-note-copy"></p></div>
        </div>
      </div>`;
    section.querySelector('.sl-cover').append(art(id));
    const showTrack = i => {
      const track=tracks[i];
      section.querySelectorAll('.sl-track').forEach((btn,j)=>btn.setAttribute('aria-pressed',String(i===j)));
      section.querySelector('.sl-location').textContent=track.place+' · 采集笔记';
      section.querySelector('.sl-time').textContent=track.hour;
      section.querySelector('.sl-note-name').textContent=track.en;
      section.querySelector('.sl-note-copy').textContent=track.note;
    };
    section.addEventListener('click',event=>{
      const btn=event.target.closest('.sl-track');
      if(btn) showTrack(Number(btn.dataset.track));
    });
    showTrack(0);
    host.replaceChildren(section);
  }

  window.AtlasStyles={items,render,thumb};
})();
