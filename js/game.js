import { THEMES, COLORS, SHOP_ITEMS, WORLDS, SKILLS_META, BADGES, defaultProfile, profile, state, fmtColor } from './store.js';
import { 
  shuffle, updateMission, recordAnswerStats, showStarGain, updateStarUI, 
  recordStreakDay, nav, applyAccessory, showToast, ensureDailyMissions, 
  applyLang, renderTags, updateSkills, flash, showExplain, TRANSLATIONS, saveP, getMascotImagePath
} from './ui.js';
import { getQuestionFromDB } from './db.js';

import {
  audioEnabled,
  getAudioCtx,
  playTone,
  sfxCorrect,
  sfxWrong,
  sfxLevelUp,
  sfxWin,
  sfxCoin,
  sfxTick,
  sfxUrgent,
  sfxCountdown,
  sfxHalfTime,
  sfxHappyTick,
  sfxHappyGo,
  toggleAudio,
  speakQuestion,
  stopSpeech
} from './audio.js';



    // Pinta el área multimedia de la pregunta (#qMedia).
    // Con qData.img (ya validada por whitelist en db.js) crea la ilustración vía DOM;
    // sin img conserva el innerHTML de qData.m (los Generators usan spans de color).
    function renderQuestionMedia(qData) {
      const media = document.getElementById('qMedia');
      if (!media) return;
      media.classList.remove('has-img');
      media.textContent = '';

      if (qData.img) {
        const img = document.createElement('img');
        img.className = 'q-illustration';
        img.alt = 'Ilustración de la pregunta';
        img.decoding = 'async';
        img.onerror = () => {
          // Ignorar si ya se pasó a otra pregunta (la imagen ya no está en #qMedia)
          if (img.parentNode !== media) return;
          img.remove();
          media.classList.remove('has-img');
          media.textContent = qData.m || '';
        };
        media.classList.add('has-img');
        media.appendChild(img);
        img.src = qData.img;
        return;
      }

      // XSS-ACCEPTED: dato interno, no viene del usuario
      media.innerHTML = qData.m || '';
    }

    async function generateQuestion() {
      const currentMascot = SHOP_ITEMS.mascots.find(x=>x.id===profile.equipM) || SHOP_ITEMS.mascots[0];
      const currentHat = SHOP_ITEMS.hats.find(x=>x.id===profile.equipH) || SHOP_ITEMS.hats[0];
      document.getElementById('mascot').innerHTML = `<img src="${getMascotImagePath(profile.equipM, profile.equipH)}" alt="${profile.equipM}">`;
      applyAccessory(document.getElementById('mascotHat'), profile.equipH, profile.equipM, 'game');
      document.getElementById('mascot').className = 'mascot';
      updateStarUI();

      if(!state.secretPending && Math.random() < 0.15 && state.streak < state.reqStreak - 2) {
        state.secretCode = Math.floor(Math.random()*90) + 10; state.secretPending = true;
        document.getElementById('memSecret').innerText = state.secretCode; document.getElementById('memOverlay').showModal(); return; 
      }

      let qData = await getQuestionFromDB();
      state.currentAnswer = qData.c;
      state.currentExplain = qData.explain || `La respuesta correcta es ${qData.c}.`;

      renderTags(qData.tags || ['general']);
      renderQuestionMedia(qData);
      document.getElementById('qText').textContent = qData.q;
      
      // Accesibilidad TTS
      speakQuestion(qData.q);

      let answers = qData.a ? [...qData.a] : [{t:qData.c, correct:true}, ...qData.f.map(f=>({t:f,correct:false}))];
      answers = shuffle(answers);

      let grid = document.getElementById('ansGrid'); grid.innerHTML = '';
      answers.forEach(a => { let btn = document.createElement('button'); btn.className = 'btn-ans'; btn.dataset.correct = a.correct ? '1' : '0'; btn.textContent = a.t; btn.onclick = () => checkAns(a.correct, btn); grid.appendChild(btn); });

      
      state.timeLeft = 100; 
      let speedMult = (state.mode === 'fast') ? 0.7 : 1.0; 
      let qTime = qData.time || 30;
      let durationMs = qTime * 1000 * speedMult;
     
      cancelAnimationFrame(state.timer);
      clearInterval(state.timer); // Por si venía de un setInterval antiguo
      state.frozen = false; 
      document.getElementById('timerBar').classList.remove('frozen');
      if(state.mode === 'train') { document.getElementById('timerBar').style.width = '100%'; return; }
      
      let lastTime = performance.now();
      let lastInt = 100;
      
      function tick(now) {
        if(state.frozen) {
          lastTime = now;
          state.timer = requestAnimationFrame(tick);
          return;
        }
        let dt = now - lastTime;
        lastTime = now;
        
        state.timeLeft -= (dt / durationMs) * 100;
        if (state.timeLeft < 0) state.timeLeft = 0;
        
        let currentInt = Math.round(state.timeLeft);
        let bar = document.getElementById('timerBar'); 
        bar.style.width = state.timeLeft + '%';
        
        if (currentInt === 50 && lastInt > 50) sfxHalfTime();
    
        const mascotEl = document.getElementById('mascot');
        const dynBg    = document.getElementById('dynamicBg');
        const imgTag = `<img src="${getMascotImagePath(profile.equipM, profile.equipH)}" alt="${profile.equipM}">`;
        
        if (state.timeLeft < 15) {
          bar.className = 'timer-bar danger';
          mascotEl.classList.add('urgent');
          mascotEl.innerHTML = imgTag + '😱';
          dynBg.classList.add('urgent-bg');
          if (currentInt % 2 === 0 && currentInt !== lastInt) sfxUrgent();
        } else if (state.timeLeft < 30) {
          bar.className = 'timer-bar danger';
          mascotEl.classList.add('urgent');
          mascotEl.innerHTML = imgTag + '😰';
          dynBg.classList.add('urgent-bg');
          if (currentInt % 5 === 0 && currentInt !== lastInt) sfxTick();
        } else if (state.timeLeft < 60) {
          bar.className = 'timer-bar warning';
          mascotEl.classList.remove('urgent');
          mascotEl.innerHTML = imgTag + '😟';
          dynBg.classList.remove('urgent-bg');
          if (currentInt % 10 === 0 && currentInt !== lastInt) sfxTick();
        } else {
          bar.className = 'timer-bar';
          mascotEl.classList.remove('urgent');
          mascotEl.innerHTML = imgTag;
          dynBg.classList.remove('urgent-bg');
        }
        
        lastInt = currentInt;
        
        if(state.timeLeft <= 0) { 
          cancelAnimationFrame(state.timer); 
          checkAns(false, null, false, true); 
        } else {
          state.timer = requestAnimationFrame(tick);
        }
      }
      state.timer = requestAnimationFrame(tick);
    }

    function closeMemoryOverlay() {
      if (typeof window.safeCloseDialog === 'function') {
        window.safeCloseDialog('memOverlay');
      } else {
        const mo = document.getElementById('memOverlay');
        if (mo) { try { mo.close(); } catch(e){} if (mo.style.display) mo.style.display = ''; }
      }
      generateQuestion();
    }

    function updatePowerupsUI() {
      const bar = document.getElementById('powerupsBar');
      if(!bar) return;
      bar.innerHTML = '';
      profile.equipPowerups.slice(0,2).forEach(id => {
        const item = SHOP_ITEMS.powerups.find(p => p.id === id);
        if(!item) return;
        const qty = profile.powerups[id] || 0;
        bar.innerHTML += `<div class="pw-btn ${qty > 0 ? 'has-qty' : ''}" onclick="usePowerup('${id.replace('pw_','')}')" title="${item.name}">${item.icon}<span class="pw-qty">${qty}</span></div>`;
      });
    }

    function usePowerup(type) {
      let id = 'pw_'+type; if(profile.powerups[id] <= 0) return;
      profile.powerups[id]--; updateMission('powerup_use', 1); updatePowerupsUI(); saveP();
      if(type === 'freeze') { state.frozen = true; document.getElementById('timerBar').className='timer-bar frozen'; flash('flash-blue'); setTimeout(()=>{state.frozen=false;document.getElementById('timerBar').className='timer-bar';}, 5000); }
      if(type === 'skip') { flash('flash-green'); checkAns(true, null, true); }
      if(type === 'shield') { state.shield = true; document.getElementById('shieldAura').style.opacity = '1'; flash('flash-blue'); }
      if(type === 'time') { state.timeLeft = Math.min(100, state.timeLeft + 25); document.getElementById('timerBar').style.width = state.timeLeft + '%'; flash('flash-blue'); }
      if(type === 'hint') {
        const wrong = Array.from(document.querySelectorAll('#ansGrid .btn-ans')).filter(b => b.dataset.correct !== '1').slice(0,2);
        wrong.forEach(b => { b.style.opacity = '0.25'; b.style.pointerEvents = 'none'; });
        flash('flash-blue');
      }
      if(type === 'valiente') { state.valiente = true; flash('flash-green'); }
    }

    function updateLivesUI() {
      let l = document.getElementById('uiLives');
      if(l) l.innerText = '❤️'.repeat(Math.max(0, state.lives)) + '🖤'.repeat(Math.max(0, 3 - state.lives));
    }
    
    function showFeedback(isCorrect, explain, stars) {
      const fb = document.getElementById('feedbackOverlay');
      document.getElementById('fbIcon').innerText = isCorrect ? '✅' : '❌';
      const title = document.getElementById('fbTitle');
      const msgOk = profile.gameLang==='en' ? ['EXCELLENT!','GREAT!'] : ['¡EXCELENTE!','¡GENIAL!'];
      const msgErr = profile.gameLang==='en' ? ['ALMOST!','TRY AGAIN!'] : ['¡CASI!','¡INTÉNTALO DE NUEVO!'];
      title.innerText = isCorrect ? msgOk[Math.floor(Math.random()*msgOk.length)] : msgErr[Math.floor(Math.random()*msgErr.length)];
      title.style.color = isCorrect ? 'var(--success)' : 'var(--danger)';
      const fbExplain = document.getElementById('fbExplain');
      fbExplain.style.whiteSpace = 'pre-wrap';
      fbExplain.textContent = explain || '';
      const starEl = document.getElementById('fbStars');
      if(stars > 0) { starEl.innerText = '+' + stars + ' ⭐'; starEl.style.display = 'block'; }
      else { starEl.style.display = 'none'; }
      fb.showModal();
      setTimeout(() => { fb.close(); }, 1500);
    }

    function checkAns(isCorrect, btn, isSkip=false, isTimeout=false) {
      if(state.timer) { cancelAnimationFrame(state.timer); clearInterval(state.timer); }
      if(btn) btn.classList.add(isCorrect ? 'correct' : 'wrong');

      if(!isCorrect && state.shield) {
        state.shield = false; document.getElementById('shieldAura').style.opacity = '0'; flash('flash-blue');
        document.getElementById('mascot').innerHTML = '🛡️ <img src="' + getMascotImagePath(profile.equipM, profile.equipH) + '" alt="' + profile.equipM + '">';
        showFeedback(false, `¡Estás protegido! No pasa nada si te equivocas.\n\n${state.currentExplain}`, 0);
        setTimeout(generateQuestion, 1500); 
        return;
      }

      let valienteActive = state.valiente;
      state.valiente = false;

      updateSkills(isCorrect, state.timeLeft);
      recordAnswerStats(isCorrect);

      if(isCorrect) {
        let earned = 0;
        if(!isSkip) {
          flash('flash-green'); sfxCorrect();
          document.getElementById('mascot').innerHTML = `<img src="${getMascotImagePath(profile.equipM, profile.equipH)}" alt="${profile.equipM}">`;
          earned = state.mode === 'train' ? 0 : Math.max(1, Math.ceil(state.timeLeft / 25));
          if(valienteActive) earned *= 2;
          profile.score += earned;
          if(earned > 0) showStarGain(earned);
          updateStarUI();
          if(state.currentTags.includes('math')) { updateMission('math', 1); profile.missionStats.math = (profile.missionStats.math||0) + 1; }
          if(state.currentTags.includes('logic')) { updateMission('logic', 1); profile.missionStats.logic = (profile.missionStats.logic||0) + 1; }
          if(state.currentTags.includes('memory')) { updateMission('memory', 1); profile.missionStats.memory = (profile.missionStats.memory||0) + 1; }
          if(state.currentTags.includes('riddles')) updateMission('riddles', 1);
          if(state.timeLeft > 70) profile.missionStats.fast = (profile.missionStats.fast||0) + 1;
        }
        state.streak++; document.getElementById('uiStreak').innerText = state.streak;
        if(state.streak > profile.maxStreak) profile.maxStreak = state.streak;
        updateMission('streak', state.streak, true);

        if(state.mode !== 'train') showFeedback(true, state.currentExplain, earned);
        if(state.streak >= state.reqStreak) setTimeout(() => levelComplete(), state.mode==='train'?600:1500); else setTimeout(generateQuestion, state.mode==='train'?600:1500);
      } else {
        recordStreakDay();
        if(state.mode === 'train') {
          flash('flash-red');
          document.getElementById('mascot').innerHTML = `<img src="${getMascotImagePath(profile.equipM, profile.equipH)}" alt="${profile.equipM}"> 😱`;
          setTimeout(() => {
            showExplain(state.currentExplain || 'Mira con calma y vuelve a intentarlo.');
          }, 250);
          saveP();
          return;
        }
        
        state.lives--;
        updateLivesUI();
        document.getElementById('mascot').innerHTML = '😵'; flash('flash-red');
        
        let earnedFail = 0;
        let failMsg = `¡Cuidado, perdiste 1 vida!\n\n${state.currentExplain}`;
        if(valienteActive) {
          earnedFail = 1;
          profile.score += 1;
          updateStarUI();
          failMsg = `¡Buen intento! Ganas 1 ⭐ por valiente.\n\n${state.currentExplain}`;
        }
        
        if(state.lives <= 0) {
          showFeedback(false, `Te quedaste sin vidas.\n\n${state.currentExplain}`, earnedFail);
          setTimeout(() => handleFail(isTimeout), 1500);
        } else {
          showFeedback(false, failMsg, earnedFail);
          setTimeout(generateQuestion, 1500);
        }
      }
      saveP();
    }

    function handleFail(timeout=false, manualQuit=false) {
      if(state.timer) { cancelAnimationFrame(state.timer); clearInterval(state.timer); }
      state.frozen = false;
      if (typeof window.safeCloseDialog === 'function') {
        window.safeCloseDialog('quitConfirmPopup');
      } else {
        const qp = document.getElementById('quitConfirmPopup');
        if (qp) {
          try { if (typeof qp.close === 'function') qp.close(); } catch(e){}
          if (qp.style.display) qp.style.display = '';
        }
      }
      recordStreakDay();
      document.getElementById('resIcon').innerHTML = manualQuit ? '🚪' : `<img src="${getMascotImagePath(profile.equipM, profile.equipH)}" alt="${profile.equipM}">`;
      applyAccessory(document.getElementById('resHat'), profile.equipH, profile.equipM, 'result');
      const tl = TRANSLATIONS[profile.gameLang||'es']; document.getElementById('resTitle').innerText = timeout ? tl.errTime : (manualQuit ? tl.errQuit : tl.errFail);
      document.getElementById('resTitle').style.color = 'var(--danger)';
      document.getElementById('resMsg').innerHTML = `<span style="display:block;font-size:20px;margin-bottom:10px;">${tl.res5}</span><span style="display:block;font-size:16px;">${tl.rStr}${state.streak} 🔥</span><span style="display:block;font-size:15px;margin-top:10px;color:var(--secondary);">${state.currentExplain || ''}</span>`;
      let btn = document.getElementById('resBtn'); btn.innerText = TRANSLATIONS[profile.gameLang||'es'].btnAcc; btn.className = "btn-3d btn-action";
      btn.onclick = () => { nav('home'); }; nav('result');
    }

    function levelComplete() {
      if(state.isMap && state.level === profile.maxLevel && profile.maxLevel < 50) { profile.maxLevel++; profile.score += 80; showStarGain(80, true); }
      if(state.isMap) updateMission('map_win', 1);
      updateStarUI();
      saveP();
      sfxLevelUp(); 
      if (typeof createParticles === 'function') createParticles();
      document.getElementById('resIcon').innerHTML = `<img src="${getMascotImagePath(profile.equipM, profile.equipH)}" alt="${profile.equipM}">`; const tl = TRANSLATIONS[profile.gameLang||'es']; 
      applyAccessory(document.getElementById('resHat'), profile.equipH, profile.equipM, 'result'); document.getElementById('resTitle').innerText = tl.res1; 
      document.getElementById('resTitle').style.color = 'var(--accent)'; 
      document.getElementById('resMsg').innerHTML = `<span style="display:block;font-size:24px;font-weight:bold;margin-bottom:10px;">${tl.res2}</span><span style="display:block;font-size:16px;">${tl.rStr}${state.reqStreak} 🔥</span>`;
      let btn = document.getElementById('resBtn'); btn.innerText = state.isMap ? tl.btnMap : tl.btnNext; btn.className = "btn-3d btn-play"; 
      btn.onclick = state.isMap ? () => nav('mapScreen') : () => { state.level++; applyLevelRules(); document.getElementById('game').classList.add('active'); document.getElementById('result').classList.remove('active'); startCountdown(); };
      recordStreakDay();
      nav('result');
    }

    // --- SHOP ---
    let currentShopTab = 'mascots';
    function loadShopTab(tab) { currentShopTab = tab; const order = ['mascots','hats','powerups']; document.querySelectorAll('.shop-tab').forEach((t,i)=>t.classList.toggle('active', order[i] === tab)); navShop(true); }
    function renderShopGrid() { const shop = document.getElementById('shop'); if(shop && shop.classList.contains('active')) navShop(true); }
    function navShop(keepTab=false) {
      if(!keepTab) { currentShopTab = 'mascots'; updateMission('shop_visit', 1); }
      updateStarUI();
      document.getElementById('previewMascot').innerHTML = `<img src="${getMascotImagePath(profile.equipM, profile.equipH)}" alt="${profile.equipM}">`;
      applyAccessory(document.getElementById('previewHat'), profile.equipH, profile.equipM, 'shop');
      let grid = document.getElementById('shopGrid'); grid.innerHTML = '';
      SHOP_ITEMS[currentShopTab].forEach(item => {
        let isOwned = currentShopTab==='powerups' ? false : profile.inventory.includes(item.id);
        let isEquip = (profile.equipM === item.id) || (profile.equipH === item.id);
        let btnClass = isEquip ? 'shop-btn equipped' : (isOwned ? 'shop-btn owned' : 'shop-btn');
        let btnText = isEquip ? 'PUESTO' : (isOwned ? 'USAR' : `<span class="star-price">⭐ ${item.price}</span>`);
        if(currentShopTab==='powerups') btnText = `<span class="star-price">⭐ ${item.price}</span> <span style="font-size:12px; opacity:.9;">(Tú: ${profile.powerups[item.id]})</span>`;
        const isMascot = currentShopTab==='mascots';
        const cardCls = isMascot ? 'shop-item animal' : 'shop-item';
        const t = TRANSLATIONS[profile.gameLang||'es']; const priceStr = item.price===0 ? t.free : '⭐ '+item.price; const puStr = currentShopTab==='powerups' ? ' · '+t.owned+': '+(profile.powerups[item.id]||0) : ''; const btnCls = isEquip?'sbb equipped':(isOwned?'sbb owned':'sbb buy'); const btnLbl = isEquip?t.equipped:(isOwned?t.use:t.buy);
        const pwEquip = currentShopTab==='powerups' && profile.equipPowerups.includes(item.id);
        const pwCanEquip = currentShopTab==='powerups' && (profile.powerups[item.id]||0) > 0 && !document.getElementById('game').classList.contains('active');
        const pwEquipBtn = currentShopTab==='powerups' ? `<button class="sbb ${pwEquip?'equipped':'owned'}" style="margin-top:6px;" onclick="equipPowerup('${item.id}')">${pwEquip?'EQUIPADO':'EQUIPAR'}</button>` : '';
        
        let imgHtml = item.icon;
        if (!imgHtml) {
          if (currentShopTab === 'mascots') imgHtml = `<img src="${getMascotImagePath(item.id, 'c_none')}" alt="${item.name}">`;
          else if (currentShopTab === 'hats') imgHtml = `<img src="${getMascotImagePath(profile.equipM, item.id)}" alt="${item.name}">`;
          else imgHtml = `<img src="assets/mascotas/tier1/${item.id}.webp" alt="${item.name}">`;
        }
        
        grid.innerHTML += `<div class="${cardCls}">
          <div class="pet-emoji">${imgHtml}</div>
          <div class="pet-name">${item.name}</div>
          <div class="pet-price">${priceStr}${puStr}</div>
          <button class="${btnCls}" onclick="buyOrEquip('${item.id}',${item.price},'${currentShopTab}')">${btnLbl}</button>
          ${pwCanEquip || pwEquip ? pwEquipBtn : ''}
        </div>`;
      });
      nav('shop');
    }
    function equipPowerup(id) {
      if(document.getElementById('game').classList.contains('active')) { showToast('Solo puedes cambiar comodines\nal salir de la partida.', 'var(--danger)'); return; }
      if((profile.powerups[id]||0) <= 0) { showToast('Primero compra este comodín.', 'var(--danger)'); return; }
      if(profile.equipPowerups.includes(id)) return;
      profile.equipPowerups.shift();
      profile.equipPowerups.push(id);
      saveP();
      navShop(true);
    }
    function buyOrEquip(id, price, cat) {
      const t = TRANSLATIONS[profile.gameLang||'es'];
      if(cat === 'powerups') { 
        if(profile.score >= price) { profile.score -= price; sfxCoin(); profile.powerups[id]++; updateMission('shop_buy', 1); saveP(); showShopPopup(t.buyMsg[2]); } else { showToast((profile.gameLang==='en'?'Not enough stars ⭐':'Faltan estrellas ⭐'), 'var(--danger)'); } 
      } else {
        let isOwned = profile.inventory.includes(id);
        if(isOwned) { if(cat==='mascots') profile.equipM = id; else profile.equipH = id; } 
        else { 
          if(profile.score >= price) { profile.score -= price; sfxCoin(); profile.inventory.push(id); if(cat==='mascots') profile.equipM=id; else profile.equipH=id; updateMission('shop_buy', 1); showShopPopup(cat==='mascots'?t.buyMsg[0]:t.buyMsg[1]); } 
          else { showToast((profile.gameLang==='en'?'Not enough stars ⭐':'Faltan estrellas ⭐'), 'var(--danger)'); return; } 
        }
      }
      saveP(); updateStarUI(); renderShopGrid(SHOP_ITEMS[cat]);
    }

    function showShopPopup(msg) {
      const t = TRANSLATIONS[profile.gameLang||'es'];
      document.getElementById('shopPopupTitle').innerText = t.shopYay;
      document.getElementById('shopPopupMsg').innerText = msg;
      document.querySelector('#shopPopup .btn-play').innerText = t.btnOkay;
      document.getElementById('shopPopup').showModal();
    }

    function saveProfile() {
      let n = document.getElementById('nameInput').value.trim().replace(/[^A-Za-z0-9 áéíóúÁÉÍÓÚñÑüÜ]/g, ''); let a = parseInt(document.getElementById('ageInput').value);
      if(n && a >= 4) { localStorage.setItem('pm_playerName', n); localStorage.setItem('pm_playerAge', a); profile.playerName = n; playerAge = a; saveP(); var _sp=document.getElementById('splash'); if(_sp) _sp.style.display='none'; document.getElementById('playerNameDisplay').innerText = n; document.getElementById('playerAgeDisplay').innerText = a; document.getElementById('namePopup').close(); ensureDailyMissions(); updateStarUI(); nav('home'); } 
    }


    // Motor de audio modularizado en js/audio.js (Agente Sonido)

    


    



function confirmQuit() {
  const popup = document.getElementById('quitConfirmPopup');
  if (popup) {
    if (popup.style.display) popup.style.display = '';
    const streakVal = document.getElementById('quitStreakVal');
    if (streakVal) streakVal.textContent = state.streak || 0;
    state.frozen = true;
    try {
      popup.showModal();
    } catch (e) {
      console.warn('[PM] Error abriendo quitConfirmPopup:', e);
    }
  }
}

// --- WINDOW EXPORTS FOR INLINE HTML HANDLERS ---
window.generateQuestion = generateQuestion;
window.stopSpeech = stopSpeech;
window.closeMemoryOverlay = closeMemoryOverlay;
window.updatePowerupsUI = updatePowerupsUI;
window.usePowerup = usePowerup;
window.updateLivesUI = updateLivesUI;
window.showFeedback = showFeedback;
window.checkAns = checkAns;
window.handleFail = handleFail;
window.levelComplete = levelComplete;
window.loadShopTab = loadShopTab;
window.renderShopGrid = renderShopGrid;
window.navShop = navShop;
window.equipPowerup = equipPowerup;
window.buyOrEquip = buyOrEquip;
window.showShopPopup = showShopPopup;
window.saveProfile = saveProfile;
window.getAudioCtx = getAudioCtx;
window.playTone = playTone;
window.sfxCorrect = sfxCorrect;
window.sfxWrong = sfxWrong;
window.sfxLevelUp = sfxLevelUp;
window.sfxCoin = sfxCoin;
window.sfxHappyTick = sfxHappyTick;
window.sfxHappyGo = sfxHappyGo;
window.sfxTick = sfxTick;
window.sfxUrgent = sfxUrgent;
window.sfxCountdown = sfxCountdown;
window.toggleAudio = toggleAudio;
window.confirmQuit = confirmQuit;

export {
  generateQuestion,
  sfxCountdown,
  updatePowerupsUI,
  sfxWrong,
  getAudioCtx,
  playTone,
  sfxCorrect,
  sfxLevelUp,
  sfxCoin,
  sfxTick,
  sfxUrgent,
  sfxHalfTime,
  sfxHappyTick,
  sfxHappyGo,
  toggleAudio,
  speakQuestion,
  stopSpeech
};
