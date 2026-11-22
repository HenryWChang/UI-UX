(() => {
  'use strict';

  const items = [
    ['theme-reveal', '从触点切换主题', 'Radial reveal', '以按下的位置为圆心展开新主题，文字和版式保持原位。', '主题切换 圆形遮罩 暗色模式 触点'],
    ['reorder', '拖拽排序', 'Drag to reorder', '拖起一项，经过的相邻项目移开并预留落点。', '列表 排列 拖动 让位'],
    ['checklist', '错峰批量勾选', 'Staggered check', '一次全选，让勾选反馈逐行出现，清单数量随之更新。', '复选框 全选 列表 错峰'],
    ['snap-slider', '滑杆刻度吸附', 'Magnetic slider', '拖动时连续跟手，松开后吸附到最近的配速刻度。', '滑杆 滑块 吸附 配速'],
    ['expand', '文本展开', 'Expanding text', '内容和容器一起展开，下面的项目随高度变化平稳移开。', '折叠 展开 高度 文本'],
    ['stepper', '进度条回弹', 'Spring progress', '完成一步，进度线略过目标节点，再回到准确的位置。', '步骤 进度 弹簧 回弹'],
    ['ripple', '开关联动', 'Neighbor feedback', '拨动开关时，轻微的位移依次传给邻项，距离越远反馈越弱。', '开关 涟漪 设置 邻项'],
    ['delete-arc', '沿弧线删除', 'Arc to bin', '路线卡片缩小、旋转，沿曲线进入回收站，明确交代删除去向。', '卡片 删除 回收站 曲线'],
    ['card-stack', '滚动卡片堆叠', 'Sticky stack', '向上滚动，前一张记录先停住，后一张逐渐覆盖它。', '卡片 堆叠 滚动 吸顶'],
    ['tag-shift', '标签选择让位', 'Expanding tabs', '选中项扩展，邻近标签随之让位，下方路线清单同步切换。', '标签 筛选 让位 列表']
  ].map(([id, title, en, summary, words]) => ({ id, title, en, summary, keywords: words.split(' '), source: 1 }));

  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (value, low, high) => Math.min(high, Math.max(low, value));
  const pad = value => String(value).padStart(2, '0');

  function animate(element, frames, options) {
    if (reduceMotion() || !element.animate) return null;
    return element.animate(frames, options);
  }

  function layout(stage, title, label, body, hint) {
    stage.innerHTML = `<div class="ml-panel">
      <header class="ml-header"><div class="ml-series"><i></i>${label}</div><h3>${title}</h3></header>
      <div class="ml-body">${body}</div>
      <footer class="ml-hint"><span aria-hidden="true">↳</span>${hint}</footer>
    </div>`;
    return stage.querySelector('.ml-panel');
  }

  function theme(stage) {
    const panel = layout(stage, '周训练报告', 'TRAINING LOG', `
      <div class="ml-theme-body">
        <div class="ml-metric"><strong>18.4</strong><small>KM</small></div>
        <div class="ml-chart" aria-label="本周跑量图">${[29, 60, 39, 83, 56, 100, 30].map((n, i) =>
          `<div><i style="height:${n}%"></i><small>${['M','T','W','T','F','S','S'][i]}</small></div>`).join('')}</div>
      </div>`, '点击右上角，观察新配色从按钮所在位置向外展开。');
    panel.classList.add('ml-theme');
    const toggle = document.createElement('button');
    toggle.className = 'ml-theme-toggle';
    toggle.type = 'button';
    toggle.setAttribute('aria-label', '切换夜间主题');
    toggle.setAttribute('aria-pressed', 'false');
    toggle.textContent = '☾';
    panel.querySelector('.ml-header').append(toggle);
    let dark = false;
    let overlay = null;
    toggle.addEventListener('click', event => {
      overlay?.remove();
      dark = !dark;
      const rect = panel.getBoundingClientRect();
      const b = toggle.getBoundingClientRect();
      const x = (event.detail ? event.clientX : b.left + b.width / 2) - rect.left;
      const y = (event.detail ? event.clientY : b.top + b.height / 2) - rect.top;
      overlay = panel.cloneNode(true);
      overlay.classList.add('ml-theme-cover');
      overlay.setAttribute('aria-hidden', 'true');
      overlay.inert = true;
      const old = overlay;
      stage.append(old);
      panel.classList.toggle('ml-night', dark);
      toggle.textContent = dark ? '☼' : '☾';
      toggle.setAttribute('aria-pressed', String(dark));
      const mask = `circle(0px at ${x}px ${y}px)`;
      const radius = Math.hypot(Math.max(x, rect.width - x), Math.max(y, rect.height - y));
      const effect = animate(panel, [
        { clipPath: mask },
        { clipPath: `circle(${Math.ceil(radius) + 1}px at ${x}px ${y}px)` }
      ], { duration: 650, easing: 'cubic-bezier(.2,.8,.28,1)' });
      panel.getAnimations?.().filter(a => a !== effect).forEach(a => a.cancel());
      if (!effect) old.remove();
      else effect.finished.then(() => old.remove(), () => old.remove());
    });
  }

  function reorder(stage) {
    const plan = [
      ['晨间热身','06 min'], ['公园节奏跑','05 km'], ['核心力量','15 min'], ['跑后拉伸','08 min']
    ];
    layout(stage, '今日训练顺序', 'SESSION QUEUE', '<div class="ml-order"></div><span class="ml-sr" aria-live="polite"></span>', '拖住点阵手柄调整顺序，也可使用上下箭头按钮。');
    const list = stage.querySelector('.ml-order');
    const live = stage.querySelector('.ml-sr');
    for (const [title, distance] of plan) {
      const row = document.createElement('div');
      row.className = 'ml-order-row';
      row.innerHTML = `<span class="ml-ord"></span><span class="ml-order-title">${title}<small>${distance}</small></span>
        <span class="ml-nudge"><button type="button" aria-label="上移${title}">↑</button><button type="button" aria-label="下移${title}">↓</button></span>
        <span class="ml-grip" aria-hidden="true"><i></i></span>`;
      list.append(row);
      const buttons = row.querySelectorAll('button');
      function move(amount) {
        const rows = [...list.children];
        const index = rows.indexOf(row);
        const dest = clamp(index + amount, 0, rows.length - 1);
        if (dest === index) return;
        const tops = new Map(rows.map(r => [r, r.offsetTop]));
        list.insertBefore(row, dest > index ? rows[dest].nextSibling : rows[dest]);
        refresh();
        rows.forEach(r => animate(r, [{ transform: `translateY(${tops.get(r) - r.offsetTop}px)` }, { transform: 'none' }], { duration: 230, easing: 'ease-out' }));
        if (document.activeElement === document.body || buttons[amount > 0 ? 1 : 0].disabled) {
          row.querySelector('button:not(:disabled)')?.focus({ preventScroll: true });
        }
      }
      buttons[0].onclick = () => move(-1);
      buttons[1].onclick = () => move(1);
      const grip = row.querySelector('.ml-grip');
      grip.addEventListener('pointerdown', event => {
        if (event.button !== 0 || !event.isPrimary) return;
        event.preventDefault();
        const start = event.clientY;
        const rows = [...list.children];
        const index = rows.indexOf(row);
        const stride = rows[1].offsetTop - rows[0].offsetTop;
        let dest = index;
        row.classList.add('ml-held');
        grip.setPointerCapture(event.pointerId);
        const drag = e => {
          const dy = clamp(e.clientY - start, -index * stride, (rows.length - 1 - index) * stride);
          dest = clamp(index + Math.round(dy / stride), 0, rows.length - 1);
          row.style.transform = `translateY(${dy}px) scale(1.015)`;
          rows.forEach((r, i) => {
            if (r === row) return;
            const space = i > index && i <= dest ? -1 : i < index && i >= dest ? 1 : 0;
            r.style.transform = `translateY(${space * stride}px)`;
          });
        };
        function end(e) {
          grip.removeEventListener('pointermove', drag);
          grip.removeEventListener('lostpointercapture', end);
          grip.removeEventListener('pointerup', end);
          grip.removeEventListener('pointercancel', end);
          if (e.type === 'pointerup') {
            drag(e);
            if (index !== dest) list.insertBefore(row, dest > index ? rows[dest].nextSibling : rows[dest]);
          }
          rows.forEach(r => { r.style.transform = ''; });
          row.classList.remove('ml-held');
          refresh();
        }
        grip.addEventListener('pointermove', drag);
        grip.addEventListener('pointerup', end);
        grip.addEventListener('pointercancel', end);
        grip.addEventListener('lostpointercapture', end);
      });
    }
    function refresh() {
      [...list.children].forEach((r, i, arr) => {
        r.querySelector('.ml-ord').textContent = pad(i + 1);
        const buttons = r.querySelectorAll('button');
        buttons[0].disabled = i === 0;
        buttons[1].disabled = i === arr.length - 1;
      });
      live.textContent = [...list.querySelectorAll('.ml-order-title')].map(el => el.firstChild.textContent).join('，');
    }
    refresh();
  }

  function checklist(stage) {
    const labels = ['跑步鞋', '运动水壶', '心率带', '运动耳机'];
    layout(stage, '出发前的装备', 'PACK LIST', `<div class="ml-toolbar"><span class="ml-count" aria-live="polite"></span><button type="button" class="ml-textbutton">全选</button></div>
      <div class="ml-checks">${labels.map((label, i) => `<label><input type="checkbox" ${i === 0 ? 'checked' : ''}><span class="ml-checkmark" aria-hidden="true">✓</span><span>${label}</span><small>${pad(i + 1)}</small></label>`).join('')}</div>`, '单独勾选装备，或点全选观察逐项确认的节奏。');
    const boxes = [...stage.querySelectorAll('input')];
    const all = stage.querySelector('.ml-textbutton');
    function update() {
      const n = boxes.filter(b => b.checked).length;
      stage.querySelector('.ml-count').textContent = `已备齐 ${n} / ${boxes.length}`;
      all.textContent = n === boxes.length ? '全部取消' : '全选';
    }
    boxes.forEach(box => box.onchange = () => {
      box.parentElement.style.setProperty('--ml-delay', '0ms');
      update();
    });
    all.onclick = () => {
      const state = !boxes.every(b => b.checked);
      boxes.forEach((box, i) => {
        box.parentElement.style.setProperty('--ml-delay', `${i * 85}ms`);
        box.checked = state;
      });
      update();
    };
    update();
  }

  function slider(stage) {
    layout(stage, '找到舒服的配速', 'PACE CONTROL', `<div class="ml-pace"><output></output><span>/ KM</span></div>
      <div class="ml-rail"><i></i><div class="ml-ticks">${'<b></b>'.repeat(5)}</div>
        <input type="range" min="0" max="100" step="0.1" value="50" aria-label="目标配速"></div>
      <div class="ml-scale"><span>5′00″</span><span>6′00″</span><span>7′00″</span></div>
      <div class="ml-split"><span>预计 5 公里用时</span><strong></strong></div>`, '拖动圆点后松手，或使用方向键逐档调整。');
    const input = stage.querySelector('input');
    const rail = stage.querySelector('.ml-rail');
    const output = stage.querySelector('output');
    function show(value) {
      const seconds = Math.round(300 + value * 1.2);
      const time = `${Math.floor(seconds / 60)}′${pad(seconds % 60)}″`;
      input.value = value;
      input.setAttribute('aria-valuetext', `每公里 ${Math.floor(seconds / 60)} 分 ${seconds % 60} 秒`);
      output.textContent = time;
      rail.style.setProperty('--ml-pct', value + '%');
      stage.querySelector('.ml-split strong').textContent = `${Math.floor(seconds * 5 / 60)}:${pad(seconds * 5 % 60)}`;
    }
    function snap() {
      rail.classList.add('ml-snap');
      show(Math.round(Number(input.value) / 25) * 25);
    }
    input.onpointerdown = () => rail.classList.remove('ml-snap');
    input.oninput = () => show(Number(input.value));
    input.onchange = snap;
    input.onpointerup = snap;
    input.onpointercancel = snap;
    input.onkeydown = event => {
      const delta = { ArrowRight: 1, ArrowUp: 1, ArrowDown: -1, ArrowLeft: -1, PageUp: 1, PageDown: -1 }[event.key];
      if (!delta && !['Home','End'].includes(event.key)) return;
      event.preventDefault();
      rail.classList.add('ml-snap');
      show(event.key === 'Home' ? 0 : event.key === 'End' ? 100 : clamp(Math.round(Number(input.value) / 25) + delta, 0, 4) * 25);
    };
    show(50);
  }

  function expand(stage) {
    layout(stage, '河岸慢跑计划', 'FIELD NOTE', `<div class="ml-route-map"><i></i><b>R / 05</b></div>
      <div class="ml-fold"><button type="button" aria-expanded="false"><span>训练说明</span><i>＋</i></button>
      <div class="ml-fold-grid" aria-hidden="true"><div><p>先用 6 分钟轻松热身，沿河岸跑过三座桥。中段保持可以交谈的配速，返程逐渐放慢，最后步行冷身。</p></div></div></div>
      <div class="ml-split"><span>训练距离</span><strong>5.0 KM</strong></div>`, '点击训练说明，留意下方距离栏随内容一起移动。');
    const button = stage.querySelector('.ml-fold button');
    button.onclick = () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      stage.querySelector('.ml-fold-grid').setAttribute('aria-hidden', String(expanded));
    };
  }

  function stepper(stage) {
    const names = ['路线', '配速', '设备', '装备', '出发'];
    let progress = 0;
    layout(stage, '训练准备', 'READY CHECK', `<div class="ml-progress-reading"><strong></strong><span>/ 05</span></div>
      <div class="ml-step-track"><i></i><div>${names.map(() => '<b></b>').join('')}</div></div>
      <div class="ml-step-labels">${names.map(s => `<span>${s}</span>`).join('')}</div>
      <div class="ml-actions"><button class="ml-soft" type="button">上一步</button><button class="ml-primary" type="button"></button></div>`, '逐步完成准备事项，观察进度线超过节点后轻轻回弹。');
    const back = stage.querySelector('.ml-soft');
    const next = stage.querySelector('.ml-primary');
    const bar = stage.querySelector('.ml-step-track i');
    function update(from = progress) {
      const fraction = n => n / 5;
      const curr = fraction(progress);
      const last = fraction(from);
      bar.style.transform = `scaleX(${curr})`;
      bar.getAnimations?.().forEach(anim => anim.cancel());
      if (from !== progress) animate(bar, [
        { transform: `scaleX(${last})` },
        { transform: `scaleX(${clamp(curr + Math.sign(curr-last) * 0.04, 0, 1.03)})`, offset: .67 },
        { transform: `scaleX(${curr})` }
      ], { duration: 550, easing: 'ease-out' });
      stage.querySelector('.ml-progress-reading strong').textContent = pad(progress);
      [...stage.querySelectorAll('.ml-step-track b')].forEach((dot,i) => dot.classList.toggle('ml-filled', i < progress));
      back.disabled = progress === 0;
      next.textContent = progress === 5 ? '重新演示 ↺' : `确认${names[progress]} →`;
    }
    back.onclick = () => { const from = progress; progress = Math.max(0, progress - 1); update(from); };
    next.onclick = () => { const from = progress; progress = progress === 5 ? 0 : progress + 1; update(from); };
    update();
  }

  function ripple(stage) {
    const prefs = ['开跑提醒', '每公里语音播报', '心率区间提醒', '补水提示'];
    layout(stage, '训练通知', 'SIGNAL SETTINGS', `<div class="ml-switches">${prefs.map((p, i) =>
      `<button role="switch" aria-checked="${i === 0 || i === 2}" type="button"><span>${p}</span><i aria-hidden="true"><b></b></i></button>`).join('')}</div>`, '拨动任一开关，留意相邻设置的反馈和各自的开关状态。');
    const buttons = [...stage.querySelectorAll('.ml-switches button')];
    buttons.forEach((b, index) => b.onclick = () => {
      const enabled = b.getAttribute('aria-checked') !== 'true';
      b.setAttribute('aria-checked', String(enabled));
      buttons.forEach((other, i) => {
        const distance = Math.abs(index - i);
        const direction = enabled ? 1 : -1;
        other.getAnimations?.().forEach(a => a.cancel());
        animate(other, [
          { transform:'translateX(0)' },
          { transform:`translateX(${10 * direction / (1 + distance * .95)}px)`, offset:.4 },
          { transform:'translateX(0)' }
        ], { duration: 320, delay: distance * 48, easing:'ease-in-out' });
      });
    });
  }

  function deletion(stage) {
    const routes = [['河岸环线','R–01','5.0 KM'],['植物园慢跑','R–02','3.2 KM'],['海滨栈道','R–03','6.4 KM']];
    const history = [];
    layout(stage, '收藏的路线', 'ROUTE ARCHIVE', `<div class="ml-saved"></div><div class="ml-binbar"><button type="button" class="ml-soft" disabled>撤销删除</button><div class="ml-bin" aria-live="polite"><i aria-hidden="true"></i><span>回收站 · 0</span></div></div>`, '点击路线旁的移除按钮，观察卡片飞向回收站。');
    const list = stage.querySelector('.ml-saved');
    const bin = stage.querySelector('.ml-bin');
    const undo = stage.querySelector('.ml-soft');
    const deleted = new Set();
    function update() {
      list.replaceChildren();
      routes.forEach(([label, code, length], i) => {
        if (deleted.has(i)) return;
        const row = document.createElement('div');
        row.className = 'ml-saved-row';
        row.innerHTML = `<i class="ml-route-stamp" aria-hidden="true">${code}</i><span>${label}<small>${length}</small></span>
          <button type="button" aria-label="移除${label}">×</button>`;
        row.querySelector('button').onclick = () => remove(i,row);
        list.append(row);
      });
      if (deleted.size === routes.length) list.innerHTML = '<p class="ml-empty">收藏夹已清空</p>';
      bin.querySelector('span').textContent = '回收站 · ' + deleted.size;
      undo.disabled = history.length === 0;
    }
    function remove(index, row) {
      const card = row.getBoundingClientRect();
      const target = bin.getBoundingClientRect();
      const field = stage.getBoundingClientRect();
      const clone = row.cloneNode(true);
      clone.classList.add('ml-flying');
      clone.inert = true;
      clone.setAttribute('aria-hidden','true');
      clone.style.cssText = `left:${card.left-field.left}px;top:${card.top-field.top}px;width:${card.width}px;height:${card.height}px`;
      stage.append(clone);
      const x = target.left + target.width/2 - card.left - card.width/2;
      const y = target.top + target.height/2 - card.top - card.height/2;
      const frames = Array.from({length:13}, (_, i) => {
        const t = i/12;
        const cx = x*t;
        const cy = y*t - 4*60*t*(1-t);
        return { offset:t, transform:`translate(${cx}px,${cy}px) scale(${1-.94*t}) rotate(${20*t}deg)`, opacity:1 - Math.pow(t,5) };
      });
      const effect = animate(clone,frames,{duration:620,easing:'cubic-bezier(.42,.08,.78,.84)'});
      if (effect) effect.finished.then(() => clone.remove(), () => clone.remove());
      else clone.remove();
      deleted.add(index);
      history.push(index);
      update();
      (list.querySelector('button') || undo).focus({ preventScroll:true });
    }
    undo.onclick = () => {
      deleted.delete(history.pop());
      update();
      list.querySelector('button')?.focus({ preventScroll:true });
    };
    update();
  }

  function stack(stage) {
    const runs = [['公园节奏跑','5.0','06:30'],['河岸慢跑','4.6','06:15'],['晨间轻松跑','3.0','06:40'],['海滨长跑','8.2','06:10']];
    layout(stage, '近期跑步记录', 'RUN INDEX', `<div class="ml-stack-scroll" tabindex="0" aria-label="可滚动的跑步记录">${runs.map(([t,d,p], i) =>
      `<article class="ml-run" style="--ml-i:${i}"><header><span>SESSION / ${pad(i+1)}</span><b>${pad(i+2)} SEP</b></header><div><strong>${d}</strong><small> KM</small></div><footer><span>${t}</span><span>${p} / KM</span></footer></article>`).join('')}<div class="ml-tail"></div></div>
      <div class="ml-stack-nav"><span aria-live="polite"></span><div><button type="button" aria-label="上一张记录">↑</button><button type="button" aria-label="下一张记录">↓</button></div></div>`, '在卡片区域向上滚动，或用箭头逐张回顾。');
    const scroller = stage.querySelector('.ml-stack-scroll');
    const cards = [...scroller.querySelectorAll('.ml-run')];
    const nav = stage.querySelectorAll('.ml-stack-nav button');
    let index = 0;
    const target = i => i * (cards[0].offsetHeight + 10 - 5);
    function sync() {
      index = clamp(Math.round(scroller.scrollTop / Math.max(1,target(1))),0,cards.length-1);
      stage.querySelector('.ml-stack-nav > span').textContent = `${pad(index+1)} / ${pad(cards.length)}`;
      nav[0].disabled = index === 0;
      nav[1].disabled = index === cards.length - 1;
    }
    function seek(delta) {
      const n = clamp(index + delta,0,cards.length-1);
      scroller.scrollTo({ top:target(n),behavior:reduceMotion() ? 'auto' : 'smooth' });
    }
    nav[0].onclick = () => seek(-1);
    nav[1].onclick = () => seek(1);
    scroller.addEventListener('scroll',sync,{passive:true});
    sync();
  }

  function tags(stage) {
    const groups = [
      ['跑步','RUN',[['河岸环线','5.0 KM'],['城市公园','3.2 KM']]],
      ['力量','LIFT',[['核心稳定','15 MIN'],['下肢力量','20 MIN']]],
      ['恢复','REST',[['全身拉伸','08 MIN'],['轻松散步','15 MIN']]]
    ];
    layout(stage,'探索训练','ACTIVITY FILTER',`<div class="ml-tags">${groups.map(([n,en]) => `<button type="button"><span>${n}</span><i><b>${en}</b></i></button>`).join('')}</div><div class="ml-results" aria-live="polite"></div>`, '点选训练类型，观察邻近标签怎样为新的选中项让出空间。');
    const buttons = [...stage.querySelectorAll('.ml-tags button')];
    const results = stage.querySelector('.ml-results');
    function select(index) {
      buttons.forEach((b,i) => b.setAttribute('aria-pressed',String(index === i)));
      results.innerHTML = groups[index][2].map(([title,time],i) => `<div><i class="ml-result-icon ml-result-${index}" aria-hidden="true"></i><span>${title}</span><small>${time}</small></div>`).join('');
      animate(results,[{opacity:.2,transform:'translateY(5px)'},{opacity:1,transform:'none'}],{duration:230,easing:'ease-out'});
    }
    buttons.forEach((b,i) => b.onclick = () => select(i));
    select(0);
  }

  const demos = { 'theme-reveal':theme, reorder, checklist, 'snap-slider':slider, expand, stepper, ripple, 'delete-arc':deletion, 'card-stack':stack, 'tag-shift':tags };
  function render(id,host) {
    if (!demos[id]) return;
    const stage = document.createElement('div');
    stage.className = 'ml-stage ml-scene-' + id;
    host.replaceChildren(stage);
    demos[id](stage);
    return () => stage.remove();
  }

  const motifs = {
    'theme-reveal':'<div class="ml-t-window"><i></i><b></b><em></em></div><span class="ml-t-orbit"></span>',
    reorder:'<div class="ml-t-queue"><b></b><b></b><b></b></div><i class="ml-t-pointer"></i>',
    checklist:'<div class="ml-t-list"><b>✓</b><b>✓</b><b></b></div>',
    'snap-slider':'<div class="ml-t-slider"><b></b><i></i><em></em></div>',
    expand:'<div class="ml-t-expand"><b></b><i></i><em></em></div>',
    stepper:'<div class="ml-t-steps"><b></b><i></i><i></i><i></i><i></i><i></i></div>',
    ripple:'<div class="ml-t-toggles"><b></b><b></b><b></b></div>',
    'delete-arc':'<div class="ml-t-arc"></div><b class="ml-t-ticket"></b><i class="ml-t-bin"></i>',
    'card-stack':'<div class="ml-t-stack"><i></i><i></i><i></i></div>',
    'tag-shift':'<div class="ml-t-tags"><b></b><b></b><b></b></div>'
  };
  function thumb(id,host) {
    if (!motifs[id]) return;
    const box = document.createElement('div');
    box.className = 'ml-thumb ml-thumb-' + id;
    box.setAttribute('aria-hidden','true');
    box.innerHTML = motifs[id];
    host.replaceChildren(box);
  }
  window.AtlasMotion = {items,render,thumb};
})();
