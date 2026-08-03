(() => {
  'use strict';

  /* ---------- 拒绝按钮的台词（点一次换一句） ---------- */
  const NO_PHRASES = [
    '不要呀～ 😳',
    '真的吗？😢',
    '别别别～ 😭',
    '再想想嘛～ 🥺',
    '求求你了～ 🙏',
    '呜呜呜…我好难过',
    '你忍心拒绝我吗？😿',
    '真的不考虑一下吗？',
    '我的心碎了一地 💔',
    '最后一次机会了哦！',
    '好啦好啦，不点确定我哭给你看 😭',
    '哎…投降啦，你赢了 🏳️'
  ];

  /* ---------- 点拒绝时的小提示 ---------- */
  const NO_HINTS = [
    '这个按钮只是个装饰啦～ 😏',
    '拒绝是走不掉的哦 🥰',
    '别挣扎了，认命吧～',
    '听说拒绝的话，火锅会变成青菜 🥬',
    '乖乖点确定，我带你去买奶茶 🧋',
    '你永远可以相信我～ 💕'
  ];

  /* ---------- 状态 ---------- */
  let noCount = 0;
  let dodging = false;
  const selectedActivities = [];
  const selectedFoods = [];

  /* ---------- DOM ---------- */
  const stages = {
    invite: document.getElementById('stage-invite'),
    activities: document.getElementById('stage-activities'),
    foods: document.getElementById('stage-foods'),
    summary: document.getElementById('stage-summary'),
    success: document.getElementById('stage-success')
  };
  const yesBtn = document.getElementById('btn-yes');
  const noBtn = document.getElementById('btn-no');
  const noHint = document.getElementById('no-hint');
  const activityGrid = document.getElementById('activity-grid');
  const foodGrid = document.getElementById('food-grid');
  const nextActivityBtn = document.getElementById('btn-next-activity');
  const nextFoodBtn = document.getElementById('btn-next-food');
  const sendBtn = document.getElementById('btn-send');
  const againBtn = document.getElementById('btn-again');

  /* ---------- 阶段切换 ---------- */
  function showStage(name) {
    Object.entries(stages).forEach(([key, el]) => {
      el.classList.toggle('active', key === name);
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ---------- 拒绝按钮：越点越逃不掉 ---------- */
  noBtn.addEventListener('click', () => {
    noCount++;

    const idx = Math.min(noCount - 1, NO_PHRASES.length - 1);
    noBtn.textContent = NO_PHRASES[idx];
    noBtn.classList.remove('shake');
    void noBtn.offsetWidth; // 重新触发动画
    noBtn.classList.add('shake');

    // 确定按钮越变越大，拒绝按钮越变越小
    yesBtn.style.fontSize = Math.min(20 + noCount * 2.4, 44) + 'px';
    yesBtn.style.padding =
      Math.min(16 + noCount, 30) + 'px ' + Math.min(38 + noCount * 1.6, 60) + 'px';
    noBtn.style.fontSize = Math.max(13, 18 - noCount * 1.4) + 'px';

    // 随机提示
    noHint.textContent = NO_HINTS[Math.floor(Math.random() * NO_HINTS.length)];
    noHint.style.opacity = 1;

    // 从第 5 次开始逃跑（鼠标悬停和点击都会躲）
    if (noCount >= 5) enableDodge();

    // 第 9 次以后几乎抓不住，按钮都开始「心虚」
    if (noCount >= 9) noBtn.style.opacity = '0.6';
  });

  function enableDodge() {
    if (dodging) return;
    dodging = true;
    dodgeNoBtn();
    noBtn.addEventListener('mouseover', dodgeNoBtn);
    noBtn.addEventListener('touchstart', dodgeNoBtn);
  }

  /* ---------- 好呀好呀：进入选择 ---------- */
  yesBtn.addEventListener('click', () => {
    showStage('activities');
  });

  function dodgeNoBtn() {
    const pad = 16;
    const maxX = window.innerWidth - noBtn.offsetWidth - pad;
    const maxY = window.innerHeight - noBtn.offsetHeight - pad;
    if (maxX <= 0 || maxY <= 0) return;
    noBtn.style.position = 'fixed';
    noBtn.style.left = (pad + Math.random() * maxX) + 'px';
    noBtn.style.top = (pad + Math.random() * maxY) + 'px';
    noBtn.style.zIndex = '200';
    noBtn.style.boxShadow = '0 8px 20px rgba(255,107,157,.3)';
  }

  /* ---------- 选项网格 ---------- */
  function buildGrid(container, options, selectedArr, onUpdate) {
    container.innerHTML = '';
    options.forEach((opt) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'choice-card';
      card.innerHTML =
        '<span class="choice-emoji">' + opt.emoji + '</span>' +
        '<span class="choice-label">' + opt.label + '</span>';
      card.addEventListener('click', () => {
        card.classList.toggle('selected');
        const i = selectedArr.indexOf(opt.label);
        if (i >= 0) selectedArr.splice(i, 1);
        else selectedArr.push(opt.label);
        if (onUpdate) onUpdate();
      });
      container.appendChild(card);
    });
  }

  function updateActivityBtn() {
    nextActivityBtn.disabled = selectedActivities.length === 0;
  }
  function updateFoodBtn() {
    nextFoodBtn.disabled = selectedFoods.length === 0;
  }

  nextActivityBtn.addEventListener('click', () => {
    if (selectedActivities.length) showStage('foods');
  });

  nextFoodBtn.addEventListener('click', () => {
    if (!selectedFoods.length) return;
    document.getElementById('summary-activities').textContent = selectedActivities.join('、');
    document.getElementById('summary-foods').textContent = selectedFoods.join('、');
    showStage('summary');
  });

  /* ---------- 发送邮件 ---------- */
  function buildEmailBody() {
    return [
      '亲爱的宝贝：',
      '',
      '谢谢答应和我约会！这是我们说好的安排：',
      '',
      '🏃 约会项目：' + selectedActivities.join('、'),
      '🍽️ 吃什么：' + selectedFoods.join('、'),
      '',
      '期待和你共度美好的时光！',
      '爱你的 ' + EMAIL_CONFIG.fromName + ' 💕'
    ].join('\n');
  }

  sendBtn.addEventListener('click', sendEmail);

  /* 通过 FormSubmit 静默发送（免注册，第一次需激活） */
  async function sendEmail() {
    if (!selectedActivities.length || !selectedFoods.length) return;
    sendBtn.disabled = true;
    sendBtn.textContent = '正在发送… ⏳';
    try {
      const res = await fetch(
        'https://formsubmit.co/ajax/' + encodeURIComponent(EMAIL_CONFIG.toEmail),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            _subject: '💌 约会安排，请查收～',
            message: buildEmailBody(),
            _captcha: 'false'
          })
        }
      );
      const data = await res.json();
      if (data && data.success === 'true') {
        showStage('success');
      } else {
        throw new Error(data && data.message ? data.message : '未知错误');
      }
    } catch (err) {
      console.error(err);
      alert(
        '发送失败了 😢 ' + (err && err.message ? err.message : '') +
        '\n\n如果是第一次发送，请去 ' + EMAIL_CONFIG.toEmail + ' 的收件箱里找一封' +
        '「FormSubmit」发的确认邮件，点一下里面的激活链接后再试一次～'
      );
    } finally {
      sendBtn.disabled = false;
      sendBtn.textContent = '发送约会安排 💌';
    }
  }

  /* ---------- 再看一遍：重置 ---------- */
  againBtn.addEventListener('click', () => {
    noCount = 0;
    dodging = false;
    selectedActivities.length = 0;
    selectedFoods.length = 0;

    yesBtn.style = '';
    noBtn.style = '';
    noBtn.textContent = '才不要 😝';
    noHint.textContent = '';
    noHint.style.opacity = 0;

    buildGrid(activityGrid, ACTIVITY_OPTIONS, selectedActivities, updateActivityBtn);
    buildGrid(foodGrid, FOOD_OPTIONS, selectedFoods, updateFoodBtn);
    updateActivityBtn();
    updateFoodBtn();
    showStage('invite');
  });

  /* ---------- 背景漂浮爱心 ---------- */
  const canvas = document.getElementById('hearts-canvas');
  const ctx = canvas.getContext('2d');
  let hearts = [];
  const HEART_CHARS = ['❤', '💕', '💖', '💗', '💘', '💞', '💝'];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  function spawnHeart() {
    return {
      x: Math.random() * canvas.width,
      y: canvas.height + 30,
      size: 14 + Math.random() * 24,
      speed: 0.35 + Math.random() * 1.1,
      drift: 0.3 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      opacity: 0.3 + Math.random() * 0.35,
      ch: HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)]
    };
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (hearts.length < 18 && Math.random() < 0.06) hearts.push(spawnHeart());
    hearts.forEach((h) => {
      h.y -= h.speed;
      h.phase += 0.02;
      h.x += Math.sin(h.phase) * h.drift;
      ctx.globalAlpha = h.opacity;
      ctx.font = h.size + 'px serif';
      ctx.textAlign = 'center';
      ctx.fillText(h.ch, h.x, h.y);
    });
    hearts = hearts.filter((h) => h.y > -40);
    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }
  frame();

  /* ---------- 初始化选项 ---------- */
  buildGrid(activityGrid, ACTIVITY_OPTIONS, selectedActivities, updateActivityBtn);
  buildGrid(foodGrid, FOOD_OPTIONS, selectedFoods, updateFoodBtn);
  updateActivityBtn();
  updateFoodBtn();
})();
