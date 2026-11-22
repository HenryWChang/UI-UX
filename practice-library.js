(() => {
  'use strict';

  const items = [
    ['button-states','按钮的六种状态','Button states','同一颗结算按钮用底色、压感、外圈与加载反馈，交代能否操作、键盘焦点和提交进度。', ['组件','按钮','聚焦','加载','禁用','悬停','按下'],10,'motion'],
    ['input-follow','选词与消息跟随','Composition & follow','中文选词时按回车只确认候选；向上阅读时，新消息保留在底部，直到你主动返回。', ['输入法','中文','IME','聊天','滚动','跳至最新'],11,'motion'],
    ['nested-surfaces','单层边框与同心圆角','Nested surfaces','调节卡片内距，比较内外轮廓是否共用圆心；切换重复描边，观察底色怎样划分操作区。', ['同心圆角','内距','容器','边框','底色'],11,'principles'],
    ['split-workspace','可恢复的分屏','Recoverable split','拖动分隔线调整面板。Esc 取消拖动，双击恢复均分，越过 80% 后收起窄侧。长文件名始终留出扩展名。', ['分屏','拖动','取消','键盘','省略号','文件名'],11,'motion'],
    ['search-context','搜索结果的上下文','Search context','在相似词条之间，用路径和摘要辨别含义；即使拼写有误，也能直接采用建议。', ['搜索','纠错','摘要','面包屑','词典'],12,'principles'],
    ['information-priority','信息卡的阅读次序','Information priority','保留同一组数据，比较统一字号和分层排版。票面、账单和数据图各有不同的第一阅读点；工作区用分组和选中底托说明工具之间的关系。', ['对比','语义色','层级','票面','账单','图表','选项卡'],12,'principles'],
    ['empty-progress','空状态与加载进程','Empty & loading states','第一次打开词库时给出下一步。演示导入时，逐项显示核验、读取和写入进度。', ['空状态','进度','加载','下一步','反馈'],12,'motion']
  ].map(([id,title,en,summary,keywords,source,group])=>({id,title,en,summary,keywords,source,group}));

  const q = (root,selector) => root.querySelector(selector);
  const qa = (root,selector) => [...root.querySelectorAll(selector)];
  function action(text,key,selected) {
    const state = selected === undefined ? '' : ' aria-pressed="'+selected+'"';
    return '<button type="button" class="pr-btn" data-pr="'+key+'"'+state+'>'+text+'</button>';
  }
  const note = text => '<p class="pr-note">'+text+'</p>';
  const row = content => '<div class="pr-row">'+content+'</div>';
  const ui = (root, stage, controls='', hint='') => {
    root.innerHTML = '<div class="pr-stage">'+stage+'</div><div class="pr-controls">'+controls+(hint?note(hint):'')+'</div>';
  };
  function group(root,keys,active) {
    keys.forEach(k=>q(root,'[data-pr="'+k+'"]').setAttribute('aria-pressed',String(k===active)));
  }
  function txt(tag,cl,value) { const el=document.createElement(tag); el.className=cl; el.textContent=value; return el; }

  function buttonStates(root) {
    const names=['默认','悬停','按下','禁用','加载','聚焦'];
    const main='<section class="pr-receipt"><div class="pr-eyebrow">词书订单 · 预览</div><h3>英语构词手册</h3><div class="pr-total"><span>合计</span><strong>¥ 12.00</strong></div><label class="pr-check"><input type="checkbox" checked>已核对订单</label><button type="button" class="pr-pay"><span>模拟付款</span></button><p class="pr-live" role="status">可以提交模拟订单</p></section>';
    ui(root, main, '<div class="pr-states">'+names.map((s,i)=>'<span data-n="'+i+'">'+s+'</span>').join('')+'</div>', '取消勾选可查看禁用态；用 Tab 移到按钮查看焦点外圈。');
    const button=q(root,'.pr-pay'),check=q(root,'input'),label=q(button,'span'),live=q(root,'.pr-live');
    let timer=0,busy=false,done=false,held=false,hover=false;
    function paint() {
      const n=busy?4:!check.checked?3:held?2:button.matches(':focus-visible')?5:hover?1:0;
      qa(root,'.pr-states span').forEach((s,i)=>s.classList.toggle('pr-on',i===n));
      button.classList.toggle('pr-busy',busy);
      button.disabled=!check.checked;
      button.setAttribute('aria-disabled',String(busy||!check.checked));
      button.setAttribute('aria-busy',String(busy));
      label.textContent=busy?'正在处理…':done?'再试一次':'模拟付款';
    }
    check.onchange=()=>{done=false;live.textContent=check.checked?'可以提交模拟订单':'请先核对订单';paint();};
    button.onpointerenter=()=>{hover=true;paint();};
    button.onpointerleave=()=>{hover=false;held=false;paint();};
    button.onpointerdown=()=>{held=true;paint();};
    button.onpointerup=button.onpointercancel=()=>{held=false;paint();};
    button.onkeydown=e=>{if(e.key===' '||e.key==='Enter'){held=true;paint();}};
    button.onkeyup=()=>{held=false;paint();};
    button.onfocus=paint;button.onblur=()=>{held=false;paint();};
    button.onclick=()=>{
      if(busy||!check.checked)return;
      busy=true;done=false;held=false;check.disabled=true;
      live.textContent='正在处理这笔模拟订单';paint();
      timer=window.setTimeout(()=>{busy=false;done=true;check.disabled=false;live.textContent='已完成本次模拟付款';paint();},1450);
    };
    paint();return ()=>clearTimeout(timer);
  }

  function inputFollow(root) {
    const initial=['能举一个含 act 的单词吗？','reaction，意为「反应」。','它由哪些成分组成？','re- + act + -ion。','act 在这里表示什么？','这里的词根 act 表示行动。'];
    const replies=['可以对照 action 一起记忆。','re- 可以表达返回或再次。','-ion 常用来构成名词。'];
    const stage='<section class="pr-chat"><h3>词根讨论</h3><div class="pr-messages" role="region" aria-label="可滚动的聊天记录" tabindex="0"></div><button type="button" class="pr-jump" hidden>跳至最新</button><div class="pr-compose"><input aria-label="消息内容" placeholder="输入消息，回车发送"><button class="pr-send" type="button">发送</button></div><div class="pr-candidates" hidden><span>ni hao</span>'+action('1 你好','candidate')+'</div></section>';
    ui(root,stage,row(action('模拟中文选词','ime')+action('添加一条新回复','append')),'向上翻阅后添加新回复，观察阅读位置。模拟选词可用两次回车体验确认与发送。');
    const messages=q(root,'.pr-messages'),input=q(root,'.pr-compose input'),jump=q(root,'.pr-jump'),candidates=q(root,'.pr-candidates');
    let following=true,im=false,sim=false,ended=-Infinity,serial=0;
    function readBottom(){return messages.scrollHeight-messages.clientHeight-messages.scrollTop<6;}
    function follow(){following=true;messages.scrollTop=messages.scrollHeight;jump.hidden=true;}
    function append(value,mine) {
      messages.append(txt('p','pr-message'+(mine?' pr-mine':''),value));
      if(following||mine)follow();else jump.hidden=false;
    }
    initial.forEach((s,i)=>append(s,i%2===0));
    messages.onscroll=()=>{following=readBottom();jump.hidden=following;};
    jump.onclick=follow;
    q(root,'[data-pr=append]').onclick=()=>{following=readBottom();append(replies[serial++%replies.length],false);};
    function choose(){sim=false;candidates.hidden=true;input.value='你好';input.focus();}
    q(root,'[data-pr=ime]').onclick=()=>{input.value='ni hao';sim=true;candidates.hidden=false;input.focus();};
    q(root,'[data-pr=candidate]').onclick=choose;
    function send(){
      if(sim){choose();return;}
      if(im||!input.value.trim())return;
      append(input.value.trim(),true);input.value='';input.focus();
    }
    input.addEventListener('compositionstart',()=>{im=true;sim=false;candidates.hidden=true;});
    input.addEventListener('compositionend',()=>{im=false;ended=performance.now();});
    input.onkeydown=e=>{
      if(e.key!=='Enter')return;
      if(e.isComposing||im||e.keyCode===229)return;
      if(performance.now()-ended<50){e.preventDefault();return;}
      e.preventDefault();send();
    };
    q(root,'.pr-send').onclick=send;
    follow();
  }

  function surfaces(root) {
    ui(root,'<div class="pr-surface"><div class="pr-sheet"><div class="pr-eyebrow">复习清单</div><h3>今天学什么？</h3><div class="pr-lesson"><span>构词基础</span><b>re- · act · -ion</b></div><span class="pr-faux">查看词组</span></div></div>',
      row(action('同心圆角','concentric',true)+action('相同半径','same',false)+action('重复描边','lines',false))+
      '<label class="pr-range">内外间距<input type="range" min="4" max="20" value="12"><output></output></label><div class="pr-formula" aria-live="polite"></div>');
    const outer=q(root,'.pr-surface'),slider=q(root,'input'),output=q(root,'output');
    let aligned=true,lines=false;
    function update(){
      const gap=Number(slider.value),inner=16,outerR=aligned?inner+gap:inner;
      outer.style.setProperty('--pr-gap',gap+'px');outer.style.borderRadius=outerR+'px';
      outer.classList.toggle('pr-multiple',lines);
      output.value=gap+' px';q(root,'.pr-formula').textContent='外圆角 '+outerR+' px　·　内圆角 '+inner+' px　·　间距 '+gap+' px';
      group(root,['concentric','same'],aligned?'concentric':'same');
      q(root,'[data-pr=lines]').setAttribute('aria-pressed',String(lines));
    }
    q(root,'[data-pr=concentric]').onclick=()=>{aligned=true;update();};
    q(root,'[data-pr=same]').onclick=()=>{aligned=false;update();};
    q(root,'[data-pr=lines]').onclick=()=>{lines=!lines;update();};slider.oninput=update;update();
  }

  function splitWorkspace(root) {
    const filename='英语词汇构词教学·第二单元练习题与课后详解.pdf';
    ui(root,'<section class="pr-work"><header>词书工作台</header><div class="pr-panes"><div class="pr-leftpane"><small>资料</small><div class="pr-filename" title="'+filename+'"><span>'+filename.slice(0,-4)+'</span><b>.pdf</b></div></div><button class="pr-divider" type="button" role="separator" aria-orientation="vertical" aria-label="调整资料与预览分屏" aria-valuemin="0" aria-valuemax="100"><i></i></button><div class="pr-rightpane"><small>预览</small><b>reaction</b><i></i><i></i><i></i></div></div></section>',
      row(action('恢复均分','reset')+'<span class="pr-ratio" aria-live="polite"></span>'),
      '拖动时 Esc 撤销，双击分隔线恢复均分；松手时宽侧超过 80% 会收起窄侧。键盘方向键也可调节。');
    const panes=q(root,'.pr-panes'),grip=q(root,'.pr-divider'),left=q(root,'.pr-leftpane'),right=q(root,'.pr-rightpane');
    let ratio=50,snapshot=null,pointer=null;
    function set(n,announce=true){
      ratio=Math.max(0,Math.min(100,n));
      panes.style.setProperty('--pr-left',ratio+'fr');panes.style.setProperty('--pr-right',(100-ratio)+'fr');
      left.style.visibility=ratio===0?'hidden':'';right.style.visibility=ratio===100?'hidden':'';
      grip.setAttribute('aria-valuenow',String(ratio));
      grip.setAttribute('aria-valuetext','资料 '+ratio+'%，预览 '+(100-ratio)+'%');
      if(announce)q(root,'.pr-ratio').textContent=ratio===0?'资料栏已收起':ratio===100?'预览栏已收起':ratio+'% / '+(100-ratio)+'%';
    }
    function end(cancel){
      if(snapshot===null)return;
      const original=snapshot;snapshot=null;const id=pointer;pointer=null;
      if(grip.hasPointerCapture(id))grip.releasePointerCapture(id);
      set(cancel?original:ratio>80?100:ratio<20?0:ratio);
    }
    grip.onpointerdown=e=>{if(e.button!==0||pointer!==null)return;e.preventDefault();grip.focus();snapshot=ratio;pointer=e.pointerId;grip.setPointerCapture(pointer);};
    grip.onpointermove=e=>{if(pointer!==e.pointerId)return;const r=panes.getBoundingClientRect();set(Math.round(100*(e.clientX-r.left)/r.width),false);};
    grip.onpointerup=e=>{if(pointer===e.pointerId)end(false);};
    grip.onpointercancel=grip.onlostpointercapture=e=>{if(pointer===e.pointerId)end(true);};
    grip.ondblclick=()=>set(50);
    grip.onkeydown=e=>{
      if(e.key==='Escape'){if(snapshot!==null){e.preventDefault();end(true);}return;}
      if(['ArrowLeft','ArrowRight','Home','End','Enter'].includes(e.key)){
        e.preventDefault();set(e.key==='Enter'?50:e.key==='Home'?0:e.key==='End'?100:ratio+(e.key==='ArrowLeft'?-5:5));
      }
    };
    q(root,'[data-pr=reset]').onclick=()=>set(50);set(50);
  }

  const entries=[
    {word:'reaction',path:'构词基础 / act',snippet:'re- + act + -ion，表示对事件、刺激的反应。'},
    {word:'reaction',path:'化学英语 / 变化',snippet:'chemical reaction，指两种或多种物质发生化学反应。'},
    {word:'action',path:'构词基础 / act',snippet:'act + -ion，行动；所采取的措施。'},
    {word:'actor',path:'职业与身份 / 表演',snippet:'act + -or，演员，或参与某项行动的人。'}
  ];
  function distance(a,b){
    let row=Array.from({length:b.length+1},(_,i)=>i);
    for(let i=1;i<=a.length;i++){
      const next=[i];
      for(let j=1;j<=b.length;j++)next[j]=Math.min(next[j-1]+1,row[j]+1,row[j-1]+Number(a[i-1]!==b[j-1]));
      row=next;
    }
    return row[b.length];
  }
  function searchContext(root){
    ui(root,'<section class="pr-search"><label>词库检索<input type="search" aria-label="检索词条" value="reaction" maxlength="60"></label><div class="pr-results"></div><div class="pr-definition" aria-live="polite" hidden></div></section>',
      row(action('带上下文','details',true)+action('仅标题','bare',false)+action('试试拼写错误','typo')),'试着区分两个 reaction，或点击结果查看完整词条。');
    const input=q(root,'input'),results=q(root,'.pr-results'),def=q(root,'.pr-definition');let detailed=true;
    function draw(){
      const term=input.value.trim().toLowerCase();
      def.hidden=true;results.replaceChildren();group(root,['details','bare'],detailed?'details':'bare');
      const found=entries.filter(e=>!term||e.word.includes(term));
      if(!found.length){
        results.append(txt('p','pr-none','没有找到匹配的词条。'));
        if(detailed){
          const close=entries.map(e=>({e,d:distance(term,e.word)})).sort((a,b)=>a.d-b.d)[0];
          if(close.d<=Math.max(2,Math.floor(term.length/3))){
            const suggestion=txt('button','pr-btn','你想找的是 '+close.e.word+' 吗？');
            suggestion.type='button';suggestion.onclick=()=>{input.value=close.e.word;draw();};results.append(suggestion);
          }else results.append(txt('p','pr-none','试试 act，或缩短关键词。'));
        }
      }
      found.forEach(e=>{
        const btn=document.createElement('button');btn.type='button';btn.className='pr-match';
        if(detailed)btn.append(txt('small','',e.path));
        btn.append(txt('strong','',e.word));
        if(detailed)btn.append(txt('span','',e.snippet));
        btn.onclick=()=>{def.replaceChildren(txt('b','',e.word+' · '+e.path),txt('p','',e.snippet));def.hidden=false;};
        results.append(btn);
      });
    }
    q(root,'[data-pr=typo]').onclick=()=>{input.value='reacion';draw();};
    q(root,'[data-pr=details]').onclick=()=>{detailed=true;draw();};
    q(root,'[data-pr=bare]').onclick=()=>{detailed=false;draw();};input.oninput=draw;draw();
  }
  let workspaceSerial=0;
  function information(root) {
    const modes=['pass','bill','chart','workspace'];
    const panelId='pr-toolpanel-'+(++workspaceSerial);
    ui(root,'<section class="pr-info"><div class="pr-tabs" aria-label="信息示例">'+['登机牌','账单','图表','工作区'].map((s,i)=>action(s,modes[i],!i)).join('')+'</div><div class="pr-document"></div></section>',
      row(action('分层展示','after',true)+action('统一样式','before',false)),
      '对照保留相同数据。观察航线、应付金额和峰值月份，分别怎样成为第一眼能找到的信息。');
    const doc=q(root,'.pr-document');let mode='pass',styled=true,tool=0;
    const rows=records=>'<dl class="pr-kvs">'+records.map(([k,v])=>'<div><dt>'+k+'</dt><dd>'+v+'</dd></div>').join('')+'</dl>';
    const pass=[['航班','FX 6796'],['乘客','Morgan Arthur'],['出发','SIN'],['到达','MXP'],['座位','22A'],['登机','18:45'],['状态','准点']];
    const bill=[['账单','4471'],['客户','Marlowe & Sons'],['应付金额','$2,140.00'],['到期','3 天后']];
    const chart=[['一月',40.3],['二月',37.9],['三月',45.2],['四月',33.9],['五月',36.7]];
    function drawWorkspace(){
      const names=['Code','Terminal','Preview'],icons=['‹›','›_','◉'];
      const panelContents=[
        '<code>&lt;article&gt;<br>　&lt;h1&gt;reaction&lt;/h1&gt;<br>　&lt;p&gt;反应&lt;/p&gt;<br>&lt;/article&gt;</code>',
        '<code>构建词条页面…<br>✓ 已读取词条 reaction<br>✓ 预览已就绪</code>',
        '<small>词条预览</small><strong class="pr-word-preview">reaction</strong><span>反应</span>'
      ];
      const tab=i=>'<button type="button" role="tab" id="'+panelId+'-tab-'+i+'" aria-controls="'+panelId+'"><i aria-hidden="true">'+icons[i]+'</i>'+names[i]+'</button>';
      doc.innerHTML='<div class="pr-toolstrip" role="tablist" aria-label="词条工作区"><div class="pr-toolpair" role="presentation">'+tab(0)+tab(1)+'</div>'+tab(2)+'</div><div id="'+panelId+'" class="pr-toolbody" role="tabpanel" tabindex="0"></div>';
      const pair=q(doc,'.pr-toolpair'),tabs=qa(doc,'[role=tab]'),body=q(doc,'.pr-toolbody');
      function select(i,focus){
        tool=i;pair.style.setProperty('--pr-tool',Math.min(i,1));
        pair.classList.toggle('pr-tray-off',i===2);
        tabs.forEach((b,j)=>{b.tabIndex=j===i?0:-1;b.setAttribute('aria-selected',String(j===i));});
        body.setAttribute('aria-labelledby',tabs[i].id);body.innerHTML=panelContents[i];
        if(focus)tabs[i].focus();
      }
      tabs.forEach((tab,i)=>{
        tab.onclick=()=>select(i,false);
        tab.onkeydown=e=>{
          const index={ArrowRight:(i+1)%3,ArrowLeft:(i+2)%3,Home:0,End:2}[e.key];
          if(index===undefined)return;
          e.preventDefault();select(index,true);
        };
      });
      select(tool,false);
    }
    function draw(){
      group(root,modes,mode);group(root,['after','before'],styled?'after':'before');
      q(root,'.pr-tabs').style.setProperty('--pr-tab',modes.indexOf(mode));
      q(root,'.pr-note').textContent=mode==='workspace'?'用左右方向键切换工作区。比较纯文字与分组后的外观，注意 Code 和 Terminal 共享的选中底托。':'对照保留相同数据。观察航线、应付金额和峰值月份，分别怎样成为第一眼能找到的信息。';
      doc.classList.toggle('pr-styled',styled);
      if(mode==='workspace'){
        drawWorkspace();
      }else if(!styled){
        doc.innerHTML=rows(mode==='pass'?pass:mode==='bill'?bill:chart.map(([m,v])=>[m,v+' 千元']));
      }else if(mode==='pass'){
        doc.innerHTML='<div class="pr-tickethead"><span>FX 6796</span><span>Morgan Arthur</span></div><div class="pr-route" aria-label="从 SIN 到 MXP">SIN <i>✈</i> MXP</div><div class="pr-ticketdata"><span><b>22A</b>座位</span><span><b>18:45</b>登机</span><span><b class="pr-ok">准点</b>状态</span></div>';
      }else if(mode==='bill'){
        doc.innerHTML='<div class="pr-tickethead"><span>账单 #4471</span><span>Marlowe &amp; Sons</span></div><small>应付金额</small><strong class="pr-billamt">$2,140.00</strong><span class="pr-due">3 天后到期</span>';
      }else{
        doc.innerHTML='<small>月度收入 · 千元</small><div class="pr-chart">'+chart.map(([m,v])=>'<div class="pr-bar"><b>'+v+'</b><i style="height:'+Math.round(v*1.6)+'px" class="'+(v===45.2?'pr-tall':'')+'"></i><small>'+m+'</small></div>').join('')+'</div>';
      }
    }
    modes.forEach(key=>{q(root,'[data-pr='+key+']').onclick=()=>{mode=key;draw();};});
    q(root,'[data-pr=after]').onclick=()=>{styled=true;draw();};
    q(root,'[data-pr=before]').onclick=()=>{styled=false;draw();};draw();
  }

  function emptyProgress(root) {
    ui(root,'<section class="pr-import"><div class="pr-bookmark" aria-hidden="true">W</div><h3></h3><p class="pr-import-message" aria-live="polite"></p><div class="pr-progress" hidden><progress aria-label="模拟导入进度" value="0" max="100"></progress></div><button type="button" class="pr-import-btn"></button></section>',
      row(action('提供下一步','guided',true)+action('简略提示','minimal',false)+action('重置','reset')),
      '在两种提示之间切换，比较首次进入与等待导入时能获得的信息。');
    let detailed=true,phase='empty',step=0,timer=0;
    const title=q(root,'h3'),message=q(root,'.pr-import-message'),btn=q(root,'.pr-import-btn'),prog=q(root,'.pr-progress');
    const messages=['正在核验词书格式','正在读取词根和词缀','正在写入 12 个词条','正在整理词条索引'];
    function paint(){
      const ready=phase==='ready',loading=phase==='loading';
      title.textContent=ready?'英语构词手册':loading?'导入词书':detailed?'你的词库还是空的':'暂无数据';
      message.textContent=ready?'12 个示例词条已加入词库。':loading?(detailed?messages[step]:'加载中…'):detailed?'导入示例词书，就可以开始第一组练习。':'';
      btn.textContent=ready?'再看一次':'导入示例词书';
      btn.hidden=loading||(!detailed&&!ready);
      prog.hidden=!loading||!detailed;q(prog,'progress').value=[12,36,68,91][step];
      group(root,['guided','minimal'],detailed?'guided':'minimal');
    }
    function reset(){clearInterval(timer);phase='empty';step=0;paint();}
    function start(){
      if(phase==='ready'){reset();return;}
      if(phase==='loading')return;
      phase='loading';step=0;paint();
      timer=window.setInterval(()=>{if(step===3){clearInterval(timer);phase='ready';}else step++;paint();},660);
    }
    btn.onclick=start;
    q(root,'[data-pr=reset]').onclick=reset;
    q(root,'[data-pr=guided]').onclick=()=>{detailed=true;paint();};
    q(root,'[data-pr=minimal]').onclick=()=>{detailed=false;paint();};
    paint();return ()=>clearInterval(timer);
  }

  const demos={'button-states':buttonStates,'input-follow':inputFollow,'nested-surfaces':surfaces,'split-workspace':splitWorkspace,'search-context':searchContext,'information-priority':information,'empty-progress':emptyProgress};
  const mini={
    'button-states':'<rect x="26" y="43" rx="15" width="75" height="37" fill="#9daff0"/><rect x="52" y="34" rx="15" width="91" height="40" fill="#566fd8"/><rect x="83" y="23" rx="15" width="99" height="46" fill="#263c77" stroke="#e5c766" stroke-width="4"/><path d="m126 45 5 5 10-11" stroke="#f8f6e3" stroke-width="4" fill="none" stroke-linecap="round"/>',
    'input-follow':'<rect x="34" y="19" width="109" height="28" rx="12" fill="#247967"/><path d="M48 43v10l16-10" fill="#247967"/><path d="M48 33h55" stroke="#c6e4d6" stroke-width="3"/><rect x="72" y="57" width="70" height="25" rx="10" fill="#9fcfbc"/><circle cx="159" cy="63" r="19" fill="#eee6ae"/><path d="M159 53v19m-7-7 7 7 7-7" stroke="#2f6758" stroke-width="2.5" fill="none"/>',
    'nested-surfaces':'<rect x="41" y="12" width="135" height="76" rx="25" fill="#f4e9d8" stroke="#a15135" stroke-width="2"/><rect x="49" y="20" width="119" height="60" rx="17" fill="#dc9271"/><rect x="57" y="28" width="103" height="44" rx="9" fill="#914f3b"/><path d="M41 37h41M66 12v41" stroke="#e8b9a5" stroke-dasharray="2 3"/>',
    'split-workspace':'<rect x="28" y="16" width="160" height="68" rx="9" fill="#f8f0df" stroke="#656a44"/><path d="M103 16v68" stroke="#88854f" stroke-width="2"/><rect x="98" y="34" width="10" height="32" rx="4" fill="#a4a569"/><path d="M42 31h44M42 40h33M42 50h37" stroke="#747954" stroke-width="3"/><path d="M117 59l10-14 14 8 11-20 22 26Z" fill="#aeb687"/>',
    'search-context':'<rect x="45" y="14" width="125" height="74" rx="10" fill="#fff7e7"/><path d="M57 31h68M57 49h55M58 61h88M58 71h72" stroke="#b69d83" stroke-width="3"/><circle cx="151" cy="43" r="17" fill="#f8b078" stroke="#704930" stroke-width="4"/><path d="m162 57 15 16" stroke="#704930" stroke-width="7" stroke-linecap="round"/>',
    'information-priority':'<path d="M27 22h161v20a8 8 0 0 0 0 16v21H27V58a8 8 0 0 0 0-16Z" fill="#233e50"/><path d="M143 24v52" stroke="#aac6c8" stroke-dasharray="3 3"/><path d="M43 38h45M43 60h68" stroke="#c4dbd2" stroke-width="4"/><path d="M43 48h78" stroke="#f0d882" stroke-width="6"/><path d="M153 35v28m5-28v28m6-28v28m4-28v28m6-28v28" stroke="#c4dbd2" stroke-width="2"/>',
    'empty-progress':'<path d="M40 26h45l9 9h79v43H40Z" fill="#37665b"/><path d="M45 42h133l-13 40H34Z" fill="#8db9a3"/><path d="M60 62h88" stroke="#c9d7b5" stroke-width="5" stroke-linecap="round"/><path d="M60 62h53" stroke="#305e4d" stroke-width="5" stroke-linecap="round"/>'
  };
  window.AtlasPractice={
    items,
    render(id,host){
      if(!Object.hasOwn(demos,id))return;
      const stage=document.createElement('div');stage.className='pr-demo pr-'+id;host.replaceChildren(stage);
      return demos[id](stage);
    },
    thumb(id,host){
      if(!Object.hasOwn(mini,id))return;
      const el=document.createElement('div');el.className='pr-thumb pr-thumb-'+id;
      el.innerHTML='<svg aria-hidden="true" viewBox="0 0 216 100" focusable="false">'+mini[id]+'</svg>';
      host.replaceChildren(el);
    }
  };
})();
