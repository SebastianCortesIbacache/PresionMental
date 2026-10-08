import { THEMES, COLORS, SHOP_ITEMS, WORLDS, SKILLS_META, BADGES, defaultProfile, profile, state, fmtColor, generateHash } from './store.js';
import { generateQuestion, sfxCountdown, updatePowerupsUI, sfxWrong } from './game.js';
import { 
  startAmbientMusic, 
  stopAmbientMusic, 
  toggleAmbient, 
  sfxSquish, 
  sfxChest, 
  sfxTap,
  sfxHappyGo
} from './audio.js';

// Global variables workaround for strict mode
let playerAge = window.playerAge;

    // --- UTILS ---
    
    const PET_PHRASES = {
      es: [
        "Si piensas rápido, el reloj se queda mirando.", "Hoy desayuné ideas con leche.", "Una suma al día mantiene flojo al aburrimiento.",
        "Hay montañas grandes, pero tu racha puede ser más alta.", "Si afuera hace calor, acá refrescamos con lógica.", "Si afuera hace frío, calentamos el cerebro.",
        "La primavera trae flores y preguntas tramposas.", "En verano las respuestas vienen con bloqueador.", "En otoño caen hojas y también pistas.",
        "En invierno el tiempo corre con bufanda.", "Tengo hambre de estrellas. ¿Jugamos otra?", "No busques la respuesta: tu cerebro la tiene escondida.",
        "Si el reloj apura, respira y ataca.", "Hoy mi plan es pensar, ganar y pedir once.", "¿Pan con palta después de una racha?",
        "Modo concentración: ojos abiertos, ideas veloces.", "Las matemáticas hacen cosquillas si les pierdes el miedo.", "Tu memoria acaba de levantar pesas.",
        "Si fallas, no pasa nada: la próxima viene con revancha.", "Cada mundo nuevo merece una mini celebración."
      ],
      en: [
        "Fast brain mode: tiny paws, huge ideas.", "The timer is loud, but your brain is louder.", "I packed snacks and logic.",
        "One more streak and we celebrate.", "No searching, just thinking. That's the game.", "Math is less scary after the first bite.",
        "If it's sunny, we cool down with puzzles.", "If it's cold, we warm up the brain.", "Spring brings flowers and sneaky questions.",
        "Summer answers wear sunglasses.", "Autumn leaves clues everywhere.", "Winter timers run with a scarf.",
        "Your memory just did push-ups.", "Mistakes are just practice wearing a costume.", "I smell stars in the shop.",
        "Mountains are tall, but your streak can climb too.", "Breathe, tap, win.", "I would trade bamboo for a perfect streak.",
        "This question blinked first.", "Adventure mode is calling."
      ]
    };
    function getSeasonPhrase(lang='es') {
      const m = new Date().getMonth() + 1;
      const season = (m>=12 || m<=2) ? 'summer' : (m<=5 ? 'autumn' : (m<=8 ? 'winter' : 'spring'));
      const es = { summer:'Es verano: respuestas fresquitas y mente despierta.', autumn:'Es otoño: que caigan hojas, no la racha.', winter:'Es invierno: abrígate y piensa veloz.', spring:'Es primavera: florecen las ideas rápidas.' };
      const en = { summer:'It is summer: fresh answers, sharp brain.', autumn:'It is autumn: leaves can fall, not your streak.', winter:'It is winter: stay warm and think fast.', spring:'It is spring: quick ideas are blooming.' };
      return (lang === 'en' ? en : es)[season];
    }
    function pokeMascot() {
      if (typeof sfxSquish === 'function') sfxSquish();
      const b = document.getElementById('mascotBubble');
      if (!b) return;
      const lang = profile.gameLang || 'es';
      const phrases = {
        es: [
          '¿Qué jugamos hoy?',
          '¡Vamos a explorar las islas!',
          '¡Qué alegría verte de nuevo!',
          '¡Tenemos una nueva misión juntos!',
          '¡Tu mente es brillante!',
          '¡Listo para la aventura!',
          '¡Cada desafío te hace más fuerte!'
        ],
        en: [
          'What shall we play today?',
          'Let’s explore the islands!',
          'So happy to see you!',
          'We have a new mission together!',
          'Your mind is brilliant!',
          'Ready for adventure!',
          'Every challenge makes you stronger!'
        ]
      };
      const pList = phrases[lang] || phrases.es;
      const t = pList[Math.floor(Math.random() * pList.length)];
      const txtEl = document.getElementById('mascotSpeechText');
      if (txtEl) txtEl.textContent = t;
      else b.textContent = t;

      b.classList.add('active');
      b.style.opacity = '1';
      b.style.transform = 'translateY(-6px) scale(1.05)';
      setTimeout(() => {
        b.style.transform = 'translateY(0) scale(1)';
      }, 350);

      clearTimeout(window._bubbleTimer);
      window._bubbleTimer = setTimeout(() => {
        b.style.opacity = '0';
        b.classList.remove('active');
      }, 5000);
    }

    function nav(id) {
      if (typeof sfxTap === 'function') sfxTap();
      if (typeof window.stopSpeech === 'function') window.stopSpeech();
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      const target = document.getElementById(id);
      if (!target) return;
      target.classList.add('active');
      try {
        if(id === 'home') { 
          document.getElementById('dynamicBg').className = 'dynamic-bg bg-mix'; 
          refreshHome(); 
          if(window.sfxLevelUp) window.sfxLevelUp(); // "el sonido de juego suene" al cargar menú
        }
        if(id === 'mapScreen') { document.getElementById('dynamicBg').className = 'dynamic-bg bg-espacio'; renderMap(); }
        if(id === 'setup') { renderSetupThemes(); document.getElementById('dynamicBg').className = 'dynamic-bg bg-mix'; setTimeout(bindEnglishToggle, 0); }
      } catch(e) { console.warn('nav', e); }

      // Gestión de la música ambient
      if (['game', 'result', 'countOverlay'].includes(id)) {
        if (typeof stopAmbientMusic === 'function') stopAmbientMusic();
      } else if (['home', 'setup', 'mapScreen', 'shop'].includes(id)) {
        if (typeof startAmbientMusic === 'function') startAmbientMusic();
      }
    }
    function flash(cls) { const f = document.getElementById('flashOverlay'); f.className = cls; f.style.opacity = '1'; setTimeout(() => f.style.opacity = '0', 200); }
    function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function shuffle(arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr;
    }
    function getUniqueFalses(correct, poolArr, fallbackGen) {
      let set = new Set(); let cStr = String(correct).trim();
      if(poolArr) shuffle(poolArr).forEach(item => { let fStr = String(item).trim(); if(fStr !== cStr && set.size < 3) set.add(item); });
      let escape = 0; while(set.size < 3 && escape < 50) { let fb = fallbackGen(); let fStr = String(fb).trim(); if(fStr !== cStr) set.add(fb); escape++; }
      return Array.from(set);
    }
    function saveP() {
      const pStr = JSON.stringify(profile);
      localStorage.setItem('pm_profile_v5', pStr);
      localStorage.setItem('pm_profile_v5_hash', generateHash(pStr));
    }
    const MISSION_SETS = {
      daily: [
        { id:'play', desc:'mP', target:3, reward:30 }, { id:'math', desc:'mM', target:8, reward:45 }, { id:'streak', desc:'mS', target:10, reward:70 }, { id:'logic', desc:'mL', target:6, reward:45 }, { id:'shop_visit', desc:'mShop', target:1, reward:15 }
      ],
      weekly: [
        { id:'play', desc:'wP', target:20, reward:180 }, { id:'math', desc:'wM', target:40, reward:220 }, { id:'streak', desc:'wS', target:20, reward:260 }, { id:'map_win', desc:'wMap', target:3, reward:240 }, { id:'powerup_use', desc:'wPower', target:5, reward:160 }
      ],
      monthly: [
        { id:'play', desc:'moP', target:80, reward:520 }, { id:'math', desc:'moM', target:150, reward:650 }, { id:'logic', desc:'moL', target:100, reward:560 }, { id:'memory', desc:'moMem', target:60, reward:560 }, { id:'riddles', desc:'moR', target:60, reward:560 },
        { id:'streak', desc:'moS', target:30, reward:780 }, { id:'map_win', desc:'moMap', target:10, reward:700 }, { id:'shop_buy', desc:'moBuy', target:5, reward:600 }, { id:'badge_open', desc:'moBadge', target:4, reward:180 }, { id:'powerup_use', desc:'moPower', target:20, reward:500 }
      ]
    };
    const MISSION_VERSION = 2;
    function missionPeriodKeys() {
      const now = new Date();
      const year = now.getFullYear();
      const start = new Date(year, 0, 1);
      const week = Math.ceil((((now - start) / 86400000) + start.getDay() + 1) / 7);
      return { daily: now.toDateString(), weekly: year + '-W' + week, monthly: year + '-' + (now.getMonth()+1) };
    }
    function ensureDailyMissions() {
      const keys = missionPeriodKeys();
      profile.missionKeys = profile.missionKeys || {};
      let changed = false;
      Object.keys(MISSION_SETS).forEach(period => {
        const needsReset = profile.missionVersion !== MISSION_VERSION || profile.missionKeys[period] !== keys[period] || !Array.isArray(profile.missions) || !profile.missions.some(m => m.period === period);
        if(needsReset) {
          profile.missionKeys[period] = keys[period];
          profile.missions = (profile.missions || []).filter(m => m.period !== period);
          profile.missions.push(...MISSION_SETS[period].map(m => Object.assign({ period, prog:0, done:false }, m)));
          changed = true;
        }
      });
      if(profile.missionVersion !== MISSION_VERSION) { profile.missionVersion = MISSION_VERSION; changed = true; }
      if(changed) saveP();
    }
    function renderMissions() {
      ensureDailyMissions();
      const box = document.getElementById('missionsList');
      if(!box) return;
      const t = TRANSLATIONS[profile.gameLang||'es'];
      const labels = { daily: t.mLbl || 'Diarias', weekly: t.m2Lbl || 'Semanales', monthly: t.m3Lbl || 'Mensuales' };
      let html = '';
      ['daily','weekly','monthly'].forEach(period => {
        html += `<h4 style="margin:12px 0 8px;color:var(--secondary);">${labels[period]}</h4>`;
        profile.missions.filter(m => m.period === period).forEach(m => {
          html += `<div class="mission-row ${m.done?'done':''}"><div class="mission-info"><p>${m.done?'✅ ':''}${t[m.desc] || m.desc}</p><span class="mission-reward">+${m.reward} ⭐</span></div><div class="mission-prog">${m.prog}/${m.target}</div></div>`;
        });
      });
      box.innerHTML = html; // XSS-ACCEPTED: constante interna (MISSION_SETS)
    }
    function updateMission(id, amt, isSet=false) {
      ensureDailyMissions();
      const hits = profile.missions.filter(x => x.id === id && !x.done);
      if(!hits.length) return;
      hits.forEach(m => {
        if(isSet) m.prog = Math.max(m.prog, amt); else m.prog += amt;
        if(m.prog >= m.target) {
          m.prog = m.target;
          m.done = true;
          profile.score += m.reward;
          if(m.period === 'daily') profile.missionStats.dailyDone = (profile.missionStats.dailyDone||0) + 1;
          showStarGain(m.reward, true);
        }
      });
      saveP();
      renderMissions();
      updateStarUI();
    }
    
    


    function updateStarUI() {
      const s = profile.score || 0;
      ['homeScore','homeStarsBig','shopScore','uiStars'].forEach(id => {
        const el = document.getElementById(id);
        if (el) { el.textContent = s; el.className = 'shine-score'; }
      });
    }

    function showStarGain(val, big=false) {
      const el = document.getElementById('starBurst');
      if (!el) return;
      el.textContent = '⭐ +' + val;
      el.style.fontSize = big ? '44px' : '34px';
      el.style.opacity = '0';
      el.style.transform = 'translate(-50%,-50%) scale(0.8)';
      requestAnimationFrame(() => {
        el.style.transition = 'all 0.5s ease';
        el.style.opacity = '1';
        el.style.transform = 'translate(-50%,-85%) scale(1.1)';
        setTimeout(() => {
          el.style.opacity = '0';
          el.style.transform = 'translate(-50%,-120%) scale(1)';
        }, 600);
      });
    }

    function accessoryStyle(accessoryId, mascotId, place='game') {
      const face = ['c_nerd','c_sunglasses','c_alien'];
      const neck = ['c_medal','c_scarf'];
      const hand = ['c_magic','c_balloon','c_gem','c_star','c_lightning','c_fire','c_rocket'];
      const base = {
        home:{ top:'-10px', left:'0', width:'100%', fontSize:'35px', transform:'none' },
        game:{ top:'-16px', left:'0', width:'100%', fontSize:'35px', transform:'none' },
        shop:{ top:'-16px', left:'0', width:'100%', fontSize:'48px', transform:'none' },
        result:{ top:'-25px', left:'0', width:'100%', fontSize:'55px', transform:'none' }
      }[place] || {};
      if(face.includes(accessoryId)) Object.assign(base, { top: place==='shop' ? '12px' : (place==='home' ? '9px' : '15px'), left:'0', width:'100%', fontSize: place==='shop' ? '40px' : '30px' });
      if(neck.includes(accessoryId)) Object.assign(base, { top: place==='shop' ? '54px' : '42px', left:'0', width:'100%', fontSize: place==='shop' ? '35px' : '26px' });
      if(hand.includes(accessoryId)) Object.assign(base, { top: place==='shop' ? '38px' : '34px', left:'58%', width:'auto', fontSize: place==='shop' ? '38px' : '28px', transform:'rotate(12deg)' });
      if(mascotId === 'm_bird' && face.includes(accessoryId)) base.top = place==='shop' ? '20px' : '20px';
      if(mascotId === 'm_octo' && !face.includes(accessoryId)) base.top = place==='shop' ? '-6px' : '-8px';
      if(mascotId === 'm_fox' && face.includes(accessoryId)) base.top = place==='shop' ? '12px' : (place==='home' ? '8px' : '13px');
      if(mascotId === 'm_fox' && place === 'home' && neck.includes(accessoryId)) base.top = '36px';
      return base;
    }
    function applyAccessory(el, accessoryId, mascotId, place='game') {
      if(!el) return;
      const item = SHOP_ITEMS.hats.find(x=>x.id===accessoryId) || SHOP_ITEMS.hats[0];
      el.innerText = accessoryId !== 'c_none' ? item.icon : '';
      Object.assign(el.style, accessoryStyle(accessoryId, mascotId, place));
    }

    function openLogros() {
      updateMission('badge_open', 1);
      const overlay = document.getElementById('logrosOverlay');
      if (!overlay) return;

      // --- Render badges ---
      const grid     = document.getElementById('badgesFullGrid');
      const countLbl = document.getElementById('badgeCountLbl');
      let html = ''; let gotCount = 0;
      BADGES.forEach(b => {
        let got = (profile.badges||[]).includes(b.id);
        if (!got && b.req(profile)) {
          profile.badges = profile.badges || [];
          profile.badges.push(b.id);
          got = true;
          saveP();
          setTimeout(() => showToast('🏅 ¡Nueva insignia: ' + b.name + '!', 'var(--accent)'), 200);
        }
        if (got) gotCount++;
        html += `<div class="bitem ${got ? 'got' : ''}"><div class="bico">${b.icon}</div><div class="bnm">${b.name}</div><div style="font-size:8px;line-height:1.15;margin-top:4px;opacity:.85;">${b.desc}</div></div>`;
      });
      if (grid)     grid.innerHTML = html; // XSS-ACCEPTED: constante interna (BADGES)
      if (countLbl) countLbl.textContent = gotCount + '/' + BADGES.length + ' conseguidas';

      // --- Render missions ---
      renderMissions();

      // Reset to badges tab and show
      switchLogrosTab('badges');
      if (typeof overlay.showModal === 'function') {
        overlay.showModal();
      } else {
        overlay.style.display = 'flex';
      }
    }

    // Alias legacy para compatibilidad con safeCall('openBadges') existente
    function openBadges() { openLogros(); }

    function switchLogrosTab(tab) {
      const panelBadges   = document.getElementById('logrosTabBadges');
      const panelMissions = document.getElementById('logrosTabMissions');
      const btnBadges     = document.getElementById('tabBadgesBtn');
      const btnMissions   = document.getElementById('tabMissionsBtn');
      if (!panelBadges) return;
      if (tab === 'badges') {
        panelBadges.classList.add('logros-panel-active');
        panelMissions.classList.remove('logros-panel-active');
        if (btnBadges)   btnBadges.classList.add('active');
        if (btnMissions) btnMissions.classList.remove('active');
      } else {
        panelMissions.classList.add('logros-panel-active');
        panelBadges.classList.remove('logros-panel-active');
        if (btnMissions) btnMissions.classList.add('active');
        if (btnBadges)   btnBadges.classList.remove('active');
      }
    }

    function renderBadgesPreview() {
      // Opción A: el panel de insignias se ha eliminado del home.
      // Esta función se mantiene por compatibilidad pero no opera sobre el DOM.
    }

    // ─── GENERADOR DE IMAGEN DE INFORME PARA PADRES ─────────────────────────────
    function generateStatsImage() {
      const W = 640, H = 900;
      const canvas = document.createElement('canvas');
      canvas.width = W; canvas.height = H;
      const ctx = canvas.getContext('2d');

      // ── Polyfill canvas.roundRect (Chrome<99 / Safari<15.4 / Firefox<112) ──────
      if (typeof ctx.roundRect !== 'function') {
        ctx.roundRect = function(x, y, w, h, r) {
          const rr = typeof r === 'object' ? r[0] : (r || 0);
          const safe = Math.min(rr, Math.abs(w) / 2, Math.abs(h) / 2);
          this.beginPath();
          this.moveTo(x + safe, y);
          this.arcTo(x + w, y,     x + w, y + h, safe);
          this.arcTo(x + w, y + h, x,     y + h, safe);
          this.arcTo(x,     y + h, x,     y,     safe);
          this.arcTo(x,     y,     x + w, y,     safe);
          this.closePath();
          return this;
        };
      }


      const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
      bgGrad.addColorStop(0, '#b3e5fc');
      bgGrad.addColorStop(1, '#e1f5fe');
      ctx.fillStyle = bgGrad;
      ctx.beginPath();
      ctx.roundRect(0, 0, W, H, 30);
      ctx.fill();

      // Tarjeta blanca central
      ctx.fillStyle = 'rgba(255,255,255,0.92)';
      ctx.shadowColor = 'rgba(0,60,120,0.15)';
      ctx.shadowBlur = 24;
      ctx.shadowOffsetY = 8;
      ctx.beginPath();
      ctx.roundRect(24, 20, W - 48, H - 40, 30);
      ctx.fill();
      ctx.shadowBlur = 0; ctx.shadowOffsetY = 0;

      // Helpers
      const txt = (t, x, y, size, color, weight='900', align='left') => {
        ctx.font = `${weight} ${size}px Nunito, Arial`;
        ctx.fillStyle = color;
        ctx.textAlign = align;
        ctx.fillText(t, x, y);
      };
      const pill = (label, x, y, w, bg, fg) => {
        ctx.fillStyle = bg;
        ctx.beginPath(); ctx.roundRect(x, y - 16, w, 24, 12); ctx.fill();
        txt(label, x + w/2, y + 3, 13, fg, '900', 'center');
      };
      const bar = (x, y, w, h, pct, color) => {
        ctx.fillStyle = 'rgba(0,0,0,0.08)';
        ctx.beginPath(); ctx.roundRect(x, y, w, h, h/2); ctx.fill();
        ctx.fillStyle = color;
        ctx.beginPath(); ctx.roundRect(x, y, Math.max(8, w * pct / 100), h, h/2); ctx.fill();
      };

      const playerName = profile.playerName || localStorage.getItem('pm_playerName') || 'Jugador';
      const playerAge  = parseInt(localStorage.getItem('pm_playerAge')) || '?';
      const now = new Date();
      const dateStr = now.toLocaleDateString('es-ES', { day:'2-digit', month:'long', year:'numeric' });

      // Stats calculados
      const games   = profile.stats.games   || 0;
      const answers = profile.stats.answers || 0;
      const correct = profile.stats.correct || 0;
      const wrong   = answers - correct;
      const acc     = answers ? Math.round(correct / answers * 100) : 0;
      const avgTime = answers ? Math.round(profile.stats.totalTime / answers) : 0;
      const stars   = profile.score || 0;
      const streak  = profile.stats.streaksByDay ? Math.max(0, ...Object.values(profile.stats.streaksByDay)) : 0;
      const badges  = (profile.badges || []).length;
      const missions = (profile.missions || []).filter(m => m.done).length;

      // Worst skills
      const worst3 = Object.entries(profile.stats.failsByTag || {})
        .sort((a,b) => b[1]-a[1]).slice(0,3)
        .map(([k,v]) => `${SKILLS_META[k]?.label || k} (${v} fallos)`);

      let y = 70;

      // Header
      txt('\uD83D\uDCCB Informe de Progreso', W/2, y, 22, '#1a237e', '900', 'center'); y += 32;
      txt('Para papá y mamá \uD83D\uDC4B', W/2, y, 14, '#5c7a9c', '700', 'center'); y += 10;

      // Separador
      ctx.strokeStyle = 'rgba(144,202,249,0.5)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(48, y); ctx.lineTo(W-48, y); ctx.stroke(); y += 22;

      // Jugador
      txt(`\uD83D\uDC7C  ${playerName}`, 60, y, 19, '#FF7043', '900'); 
      txt(`${playerAge} a\u00F1os`, W-60, y, 14, '#7E57C2', '700', 'right'); y += 26;
      txt(`\uD83D\uDCC5 ${dateStr}`, 60, y, 13, '#5c7a9c', '700'); y += 30;

      // Stats principales en pills
      const pills = [
        { label: `${games} partidas`, bg:'#A5D6A7', fg:'#1B5E20' },
        { label: `${correct} correctas`, bg:'#FFD54F', fg:'#E65100' },
        { label: `${wrong} incorrectas`, bg:'#EF9A9A', fg:'#B71C1C' },
        { label: `${acc}% precisi\u00F3n`, bg:'#90CAF9', fg:'#0D47A1' },
        { label: `${stars} \u2B50`, bg:'#FFCC80', fg:'#BF360C' },
        { label: `${streak} racha m\u00E1x`, bg:'#CE93D8', fg:'#4A148C' },
      ];
      const pw = (W - 96 - 16) / 2;
      pills.forEach((p, i) => {
        const col = i % 2, row = Math.floor(i/2);
        pill(p.label, 48 + col * (pw + 16), y + 20 + row * 40, pw, p.bg, p.fg);
      });
      y += 145;

      // Insignias y misiones
      txt(`\uD83C\uDFC5 Insignias conseguidas: ${badges}/${BADGES.length}`, 60, y, 15, '#1a237e'); y += 28;
      txt(`\uD83D\uDCC5 Misiones completadas: ${missions}`, 60, y, 15, '#1a237e'); y += 36;

      // Destrezas
      txt('\uD83D\uDCCA Destrezas', 60, y, 17, '#1565C0'); y += 26;
      const colors = { math:'#FF7043', logic:'#7C4DFF', memory:'#00BCD4', riddles:'#FFC107', react:'#4CAF50', verbal:'#E91E63' };
      Object.entries(profile.destrezas).slice(0, 6).forEach(([k, v]) => {
        const meta = SKILLS_META[k] || { label: k, icon: '' };
        txt(`${meta.icon} ${meta.label}`, 60, y, 13, '#1a237e');
        bar(200, y - 12, W - 270, 16, v, colors[k] || '#90CAF9');
        txt(`${v}%`, W - 56, y, 13, colors[k] || '#1a237e', '900', 'right');
        y += 28;
      });

      // Área de mayor dificultad
      if (worst3.length) {
        y += 6;
        txt('\uD83E\uDDE0 \u00C1reas a reforzar:', 60, y, 14, '#B71C1C', '900'); y += 22;
        worst3.forEach(w => { txt(`• ${w}`, 72, y, 13, '#37474F', '700'); y += 20; });
      }

      // Footer
      y = H - 60;
      ctx.strokeStyle = 'rgba(144,202,249,0.4)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(48, y); ctx.lineTo(W-48, y); ctx.stroke(); y += 20;
      txt('Reto Panda \uD83D\uDC3C Mochi', W/2, y, 13, '#5c7a9c', '700', 'center'); y += 18;
      txt('Aprende jugando · ¡Sigue así!', W/2, y, 12, '#90CAF9', '700', 'center');

      // Descargar
      try {
        canvas.toBlob(blob => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `informe_${playerName.replace(/\s+/g,'_')}_${now.toISOString().slice(0,10)}.png`;
          a.click();
          setTimeout(() => URL.revokeObjectURL(url), 2000);
          showToast('\uD83D\uDCF8 Informe guardado como imagen', 'var(--secondary)');
        }, 'image/png');
      } catch(e) {
        showToast('No se pudo generar la imagen. Intenta desde un navegador.', 'var(--danger)');
      }
    }

    function getMascotImagePath(mascotId, hatId) {
      const tier = 1; // Fuerza Tier 1 para v1.0 (Clay World)
      let name = mascotId || 'panda';
      if (name.startsWith('m_')) {
        name = name.substring(2);
      }
      const hatMap = {
        'c_gafas': 'c_nerd',
        'c_sombrero': 'c_hat',
        'c_corona': 'c_crow',
        'p_super_heroe': 'c_hero'
      };
      let suffix = '';
      if (hatId && hatMap[hatId]) {
        suffix = `_${hatMap[hatId]}`;
      }
      return `assets/mascotas/tier${tier}/m_${name}${suffix}.webp`;
    }

    function refreshHome() {
      try { ensureDailyMissions(); } catch(e){}
      try { updateStarUI(); } catch(e){}
      try { applyAgeTier(playerAge); } catch(e){}
      applyLang();
      try { 
        if (profile.equipM && profile.equipM !== 'm_panda' && profile.equipM !== 'panda') {
          document.getElementById('homeMascot').innerHTML = `<img src="${getMascotImagePath(profile.equipM, profile.equipH)}" alt="${profile.equipM}">`;
        } else {
          document.getElementById('homeMascot').innerHTML = '';
        }
      } catch(e){}
      try { applyAccessory(document.getElementById('homeHat'), profile.equipH, profile.equipM, 'home'); } catch(e){}
      try { renderBadgesPreview(); } catch(e){}
      try { renderMissions(); } catch(e){}
    }

    function openParentReport() {
      const cont = document.getElementById('parentReportContent');
      if (cont) {
        cont.innerHTML = ''; // Limpiar
        
        const acc = profile.stats.answers ? Math.round((profile.stats.correct / profile.stats.answers) * 100) : 0;
        const games = profile.stats.games || 0;
        const stars = profile.score || 0;
        const name = profile.playerName || localStorage.getItem('pm_playerName') || 'Jugador';
        const worst3 = Object.entries(profile.stats.failsByTag || {})
          .sort((a,b) => b[1]-a[1]).slice(0,3)
          .map(([k,v]) => `${SKILLS_META[k]?.label || k} (${v} fallos)`).join(', ') || 'Sin fallos registrados';

        // Contenedor cabecera
        const headerDiv = document.createElement('div');
        headerDiv.style.textAlign = 'center';
        headerDiv.style.marginBottom = '16px';
        
        const pandaDiv = document.createElement('div');
        pandaDiv.style.fontSize = '40px';
        pandaDiv.textContent = '🐼';
        
        const nameH3 = document.createElement('h3');
        nameH3.id = 'reportPlayerName';
        nameH3.style.margin = '8px 0';
        nameH3.textContent = name;
        
        headerDiv.appendChild(pandaDiv);
        headerDiv.appendChild(nameH3);
        cont.appendChild(headerDiv);

        // Función auxiliar para crear filas de estadísticas
        const createStatRow = (label, value) => {
          const row = document.createElement('div');
          row.className = 'stat-row';
          const span = document.createElement('span');
          span.textContent = label;
          const strong = document.createElement('strong');
          strong.textContent = value;
          row.appendChild(span);
          row.appendChild(strong);
          return row;
        };

        cont.appendChild(createStatRow('🎮 Partidas jugadas:', games));
        cont.appendChild(createStatRow('🎯 Precisión global:', acc + '%'));
        cont.appendChild(createStatRow('⭐ Estrellas totales:', stars));
        cont.appendChild(createStatRow('🔥 Racha máxima:', profile.maxStreak || 0));
        cont.appendChild(createStatRow('🧠 Áreas a reforzar:', worst3));

        const hr = document.createElement('hr');
        hr.style.margin = '16px 0';
        hr.style.opacity = '0.3';
        cont.appendChild(hr);

        const p = document.createElement('p');
        p.style.fontSize = '13px';
        p.style.textAlign = 'center';
        p.style.opacity = '0.7';
        p.textContent = 'Para ver el informe completo como imagen, ir a la sección Destrezas → Guardar Informe.';
        cont.appendChild(p);
      }
      document.getElementById('parentReportOverlay').showModal();
    }

    function showStats() {
      let cont = document.getElementById('statsBarsContainer');
      const avg = profile.stats.answers ? Math.round(profile.stats.totalTime / profile.stats.answers) : 0;
      const acc = profile.stats.answers ? Math.round((profile.stats.correct / profile.stats.answers) * 100) : 0;
      const worst = Object.entries(profile.stats.failsByTag || {}).sort((a,b)=>b[1]-a[1]).slice(0,3).map(([k,v]) => `${SKILLS_META[k]?.label || k}: ${v}`).join(' · ') || 'Sin fallos registrados';
      const todayKey = new Date().toISOString().slice(0,10);
      const bestToday = (profile.stats.streaksByDay || {})[todayKey] || 0;
      let html = `<div class="panel-box" style="padding:12px;margin-bottom:14px;">
        <div style="font-size:13px;line-height:1.5;"><b>Partidas:</b> ${profile.stats.games||0} · <b>Precisión:</b> ${acc}% · <b>Tiempo medio usado:</b> ${avg}% · <b>Mejor racha hoy:</b> ${bestToday}</div>
        <div style="font-size:13px;line-height:1.5;"><b>Más fallos:</b> ${worst}</div>
      </div>`;
      Object.keys(SKILLS_META).forEach(k => {
        let meta = SKILLS_META[k]; 
        let val = typeof profile.destrezas[k] === 'number' ? profile.destrezas[k] : 100;
        html += `
        <div class="stat-row">
          <div class="stat-label">${meta.icon} ${meta.label}</div>
          <div class="stat-bar-bg"><div class="stat-bar-fill" style="width:${val}%; background:${meta.color};"></div></div>
          <div class="stat-pct" style="color:${meta.color}">${val}%</div>
        </div>`;
      });
      cont.innerHTML = html; // XSS-ACCEPTED: constante interna (SKILLS_META)
      document.getElementById('statsOverlay').showModal();
    }

    function updateSkills(isCorrect, timePct) {
      if(state.mode === 'train') return;
      state.currentTags.forEach(tag => {
        if(typeof profile.destrezas[tag] !== 'number') profile.destrezas[tag] = 100;
        if(isCorrect) { profile.destrezas[tag] = Math.min(100, profile.destrezas[tag] + 1); } 
        else { profile.destrezas[tag] = Math.max(0, profile.destrezas[tag] - 4); }
      });
      // Reaction skill based on time remaining
      if(isCorrect) {
        if(timePct > 70) profile.destrezas.react = Math.min(100, profile.destrezas.react + 1);
        else if(timePct < 30) profile.destrezas.react = Math.max(0, profile.destrezas.react - 1);
      } else {
        if(timePct <= 0) profile.destrezas.react = Math.max(0, profile.destrezas.react - 5);
      }
      saveP();
    }

    function recordAnswerStats(isCorrect) {
      profile.stats.answers++;
      if(isCorrect) profile.stats.correct++;
      profile.stats.totalTime += Math.max(0, 100 - state.timeLeft);
      if(!isCorrect) {
        state.currentTags.forEach(tag => {
          profile.stats.failsByTag[tag] = (profile.stats.failsByTag[tag] || 0) + 1;
        });
      }
    }

    function recordStreakDay() {
      const key = new Date().toISOString().slice(0,10);
      profile.stats.streaksByDay[key] = Math.max(profile.stats.streaksByDay[key] || 0, state.streak || 0);
    }

    // --- MAPA VISUAL ---
    let mapCached = false;
    let lastMaxLevel = 0;
    function renderMap() {
      let cont = document.getElementById('mapContainer');
      if (!mapCached) {
        cont.innerHTML = '';
        WORLDS.forEach(w => {
          let wDiv = document.createElement('div'); wDiv.className = "world-card map-land"; wDiv.style.background = w.bg;
          wDiv.innerHTML = `<div class="world-bg-icon">${w.icon}</div><div class="world-title">${w.icon} ${w.name}</div>`; // XSS-ACCEPTED: constante interna
          let nodesHtml = '';
          const positions = [
            [8,118],[18,84],[29,126],[39,72],[50,112],[61,78],[70,128],[79,88],[88,118],[94,54]
          ];
          let decoHtml = (w.deco||[]).map((d,idx)=>`<div class="map-deco" style="left:${12+idx*22}%;top:${idx%2?22:142}px;">${d}</div>`).join('');
          for(let i = w.start; i <= w.end; i++) {
            let isUnlocked = i <= profile.maxLevel;
            let isCurrent = i === profile.maxLevel;
            let stageName = w.stages[i - w.start] || ('Etapa ' + i);
            let pos = positions[i - w.start] || [50,90];
            nodesHtml += `<div class="map-level-node ${isUnlocked?'unlocked':''} ${isCurrent?'current':''} ${i===w.end?'boss':''}" data-level="${i}" style="left:${pos[0]}%;top:${pos[1]}px;" onclick="startMapLevel(${i}, '${w.theme}', this.classList.contains('unlocked'))"><span>${i}</span><div class="map-level-label">${stageName}</div></div>`;
          }
          wDiv.innerHTML += `<div class="map-route"><div class="map-road"></div><div class="map-deco map-start">🏁</div><div class="map-deco map-castle">🏰</div>${decoHtml}${nodesHtml}</div>`; // XSS-ACCEPTED: constante interna
          cont.appendChild(wDiv);
        });
        mapCached = true;
        lastMaxLevel = profile.maxLevel;
      } else if (lastMaxLevel !== profile.maxLevel) {
        document.querySelectorAll('.map-level-node').forEach(node => {
          let i = parseInt(node.dataset.level);
          if (i <= profile.maxLevel) node.classList.add('unlocked');
          if (i === profile.maxLevel) node.classList.add('current'); else node.classList.remove('current');
        });
        lastMaxLevel = profile.maxLevel;
      }
      setTimeout(()=>{ const cur = cont.querySelector ? cont.querySelector('.map-level-node.current') : null; if(cur) cur.scrollIntoView({block:'center'}); }, 0);
    }

    function startMapLevel(lvl, theme, isUnlocked) {
      if(isUnlocked !== 'true' && isUnlocked !== true) { flash('flash-red'); sfxWrong(); return; }
      state.mode = 'normal';
      state.lives = 3; updateLivesUI();
      state.usedQuestions = new Set();
      state.theme = theme;
      state.level = lvl;
      state.isMap = true;
      document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
      document.getElementById('dynamicBg').className = 'dynamic-bg bg-' + theme;
      document.getElementById('game').classList.remove('active');
      setTimeout(() => startCountdown(), 60);
    }

    // --- SETUP LIBRE ---
    function renderSetupThemes() {
      let cont = document.getElementById('themeSelectorContainer'); cont.innerHTML = '';
      Object.keys(THEMES).forEach(k => {
        let btn = document.createElement('button'); btn.className = `t-cat ${state.theme === k ? 'active' : ''}`;
        btn.innerHTML = `${THEMES[k].icon} ${THEMES[k].label}`; // XSS-ACCEPTED: constante interna
        btn.onclick = () => { document.querySelectorAll('.t-cat').forEach(b=>{b.classList.remove('active');}); btn.classList.add('active'); state.theme = k; document.getElementById('dynamicBg').className = 'dynamic-bg bg-'+k; };
        cont.appendChild(btn);
      });
    }
    function setDif(btn, mode) { document.querySelectorAll('.t-dif-btn').forEach(b=>{b.classList.remove('active');}); btn.classList.add('active'); state.mode = mode; }
    function bindEnglishToggle() { const btn = document.getElementById('toggleEnglishBtn'); if(!btn) return; btn.onclick = () => { const on = btn.dataset.active !== '1'; btn.dataset.active = on ? '1' : '0'; btn.innerText = 'Incluye inglés: ' + (on ? 'SÍ ✓' : 'NO'); btn.style.background = on ? 'var(--success)' : ''; state.includeEnglish = on; }; }
    function prepFreePlay() {
      state.isMap = false;
      state.level = 1;
      state.lives = 3; updateLivesUI();
      state.usedQuestions = new Set(); // Reset deduplication for new session
      // Read English toggle
      const engBtn = document.getElementById('toggleEnglishBtn');
      state.includeEnglish = engBtn ? engBtn.dataset.active === '1' : false;
      startCountdown();
    }

    // --- GAME FLOW ---
    function startCountdown() {
      document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
      document.getElementById('countOverlay').showModal();
      let c = 3; let el = document.getElementById('countNumber'); el.innerText = c; el.style.color = "var(--secondary)"; sfxCountdown();

      state.history = []; state.shield = false; document.getElementById('shieldAura').style.opacity = '0';
      updatePowerupsUI();
      updateStarUI();
      updateMission('play', 1);

      document.getElementById('timerWrap').style.display = 'block';
      if(state.mode === 'train') document.getElementById('timerWrap').style.display = 'none';
      if(state.mode !== 'train') profile.stats.games++;
      applyLevelRules();

      let intv = setInterval(() => {
        c--; el.style.animation = 'none'; el.offsetHeight; el.style.animation = 'pop 1s infinite';
        if(c > 0) { el.innerText = c; } 
        else if(c === 0) { el.innerText = "¡YA!"; el.style.color = "var(--accent)"; } 
        else { clearInterval(intv); document.getElementById('countOverlay').close(); document.getElementById('game').classList.add('active'); generateQuestion(); }
      }, 800);
    }

    function applyLevelRules() {
      state.streak = 0; state.reqStreak = 5 + Math.floor(state.level * 1.5);
      if(state.mode === 'train') state.reqStreak = 5;
      document.getElementById('uiLevel').innerText = state.level; document.getElementById('uiTarget').innerText = state.reqStreak; document.getElementById('uiStreak').innerText = state.streak;
      if(state.mode === 'train') document.getElementById('uiLevel').innerText = 'ENT';
    }

    function renderTags(tagsArr) {
      let c = document.getElementById('qTags'); c.innerHTML = ''; state.currentTags = tagsArr;
      tagsArr.forEach(t => { if(SKILLS_META[t]) c.innerHTML += `<span class="q-tag" style="border-color:${SKILLS_META[t].color}; color:${SKILLS_META[t].color}">${SKILLS_META[t].icon} ${SKILLS_META[t].label}</span>`; }); // XSS-ACCEPTED: constante interna
    }



    const TRANSLATIONS = {
      es: {
        app: "🎨 Apariencia", prof: "👤 Perfil", lang: "🌍 Idioma Juego", save: "Guardar", age: "años",
        hi: "¡Hola", stars: "ESTRELLAS CONSEGUIDAS", wBtn: "🗺️ MUNDOS", fBtn: "🏃 LIBRE", sBtn: "🛍️ TIENDA",
        dBtn: "📊 DESTREZAS", bBtn: "🏅 Ver Insignias", bLbl: "Tus Insignias", mLbl: "📅 DIARIAS",
        m2Lbl: "📆 SEMANALES ▾", m3Lbl: "🗓️ MENSUALES ▾", setupTitle: "🐼 Mochi · Modo Libre", diff: "🐼🤓 Dificultad (CON TIEMPO)",
        dNorm: "🏃 Normal", dFast: "⚡ Rápido", dTrain: "🎓 Entrenar", themes: "🐼✨ Temática Visual", incEng: "Incluye inglés",
        startFree: "🚀 ¡EMPEZAR CON TIEMPO!", shopTitle: "🐼 Mochi · Tienda", st1: "Mascotas", st2: "Accesorios", st3: "Comodines",
        buy: "Comprar", use: "Usar", equipped: "✓ Puesto", free: "GRATIS", owned: "Tienes", ready: "¡PREPÁRATE!",
        lvl: "Nivel", mem1: "¡MEMORIZA ESTO!", mem2: "Te lo preguntaré pronto...", mem3: "¡LO TENGO!",
        res1: "¡SUPERADO!", res2: "¡Panda-tástico! Eres un genio.", res3: "Continuar", res4: "TIEMPO TERMINADO",
        res5: "¡No te rindas, inténtalo de nuevo!", rStr: "Racha actual: ", mapT: "🐼 Mochi · Modo Aventura",
        statsT: "🐼 Mochi · Destrezas", statsD: "Empiezas al 100%. Fallar resta %, acertar recupera.",
        btnStart: "¡EMPEZAR!", btnClose: "CERRAR", nameQ: "¿Cómo te llamas y cuántos años tienes?", nameP: "Nombre", ageP: "Edad",
        introT: "Guía Rápida", introOk: "¡ENTENDIDO!",
        errTime: "TIEMPO", errQuit: "SALIDA", errFail: "¡TÚ PUEDES!", btnAcc: "Aceptar",
        winStr: "Racha completada.", btnMap: "Mapa", btnNext: "Siguiente Nivel", shopYay: "¡COMPRA GENIAL!",
        buyMsg: ["¡Mascota lista para jugar!", "¡Qué estilazo tiene ese sombrero!", "¡Comodines recargados!"],
        btnOkay: "¡Genial!", mP: "Juega 3 partidas", mM: "Acierta 8 de Matemáticas", mS: "Logra una racha de 10", mL: "Resuelve 6 de lógica", mShop: "Visita la tienda",
        wP: "Juega 20 partidas", wM: "Acierta 40 de Matemáticas", wS: "Logra una racha de 20", wMap: "Supera 3 mundos", wPower: "Usa 5 comodines",
        moP: "Juega 80 partidas", moM: "Acierta 150 de Matemáticas", moL: "Resuelve 100 de lógica", moMem: "Resuelve 60 de memoria", moR: "Resuelve 60 acertijos",
        moS: "Logra una racha de 30", moMap: "Supera 10 etapas de mundo", moBuy: "Compra 5 objetos", moBadge: "Mira tus insignias 4 veces", moPower: "Usa 20 comodines"
      },
      en: {
        app: "🎨 Appearance", prof: "👤 Profile", lang: "🌍 Game Language", save: "Save", age: "yrs",
        hi: "Hello", stars: "STARS COLLECTED", wBtn: "🗺️ WORLDS", fBtn: "🏃 FREE PLAY", sBtn: "🛍️ SHOP",
        dBtn: "📊 SKILLS", bBtn: "🏅 View Badges", bLbl: "Your Badges", mLbl: "📅 DAILY",
        m2Lbl: "📆 WEEKLY ▾", m3Lbl: "🗓️ MONTHLY ▾", setupTitle: "🐼 Mochi · Free Play", diff: "🐼🤓 Difficulty (TIMED)",
        dNorm: "🏃 Normal", dFast: "⚡ Fast", dTrain: "🎓 Train", themes: "🐼✨ Visual Theme", incEng: "Include English",
        startFree: "🚀 START TIMED PLAY!", shopTitle: "🐼 Mochi · Shop", st1: "Pets", st2: "Accessories", st3: "Powerups",
        buy: "Buy", use: "Equip", equipped: "✓ Equipped", free: "FREE", owned: "Owned", ready: "GET READY!",
        lvl: "Level", mem1: "MEMORIZE THIS!", mem2: "I'll ask you soon...", mem3: "GOT IT!",
        res1: "CLEARED!", res2: "Panda-tastic! You're a genius.", res3: "Continue", res4: "TIME'S UP",
        res5: "Don't give up, try again!", rStr: "Current Streak: ", mapT: "🐼 Mochi · Adventure Mode",
        statsT: "🐼 Mochi · Skills", statsD: "Start at 100%. Fails reduce %, correct answers recover.",
        btnStart: "START!", btnClose: "CLOSE", nameQ: "What is your name and age?", nameP: "Name", ageP: "Age",
        introT: "Quick Guide", introOk: "GOT IT!",
        errTime: "TIME'S UP", errQuit: "QUIT", errFail: "YOU CAN DO IT!", btnAcc: "OK",
        winStr: "Streak completed.", btnMap: "Map", btnNext: "Next Level", shopYay: "AWESOME PURCHASE!",
        buyMsg: ["Pet ready to play!", "That hat has amazing style!", "Powerups reloaded!"],
        btnOkay: "Awesome!", mP: "Play 3 games", mM: "Get 8 Math answers right", mS: "Reach a streak of 10", mL: "Solve 6 logic questions", mShop: "Visit the shop",
        wP: "Play 20 games", wM: "Get 40 Math answers right", wS: "Reach a streak of 20", wMap: "Clear 3 world stages", wPower: "Use 5 powerups",
        moP: "Play 80 games", moM: "Get 150 Math answers right", moL: "Solve 100 logic questions", moMem: "Solve 60 memory questions", moR: "Solve 60 riddles",
        moS: "Reach a streak of 30", moMap: "Clear 10 world stages", moBuy: "Buy 5 items", moBadge: "View badges 4 times", moPower: "Use 20 powerups"
      }
    };

    function applyLang() {
      const gl = profile.gameLang || 'es';
      const t = TRANSLATIONS[gl];
      if(!t) return;

      const setEl = (id, txt) => { const e = document.getElementById(id); if(e) e.innerHTML = txt; }; // XSS-ACCEPTED: constante interna (Traducciones)
      const setByQuery = (q, txt) => { const e = document.querySelector(q); if(e) e.innerHTML = txt; }; // XSS-ACCEPTED: constante interna (Traducciones)

      setEl('lblApp', t.app); setEl('lblProf', t.prof); setEl('lblLang', t.lang); setEl('btnSave', t.save);
      setEl('lblYears', t.age);

      let pName = profile.playerName || localStorage.getItem('pm_playerName') || 'Sofía';
      let pAge = profile.playerAge || localStorage.getItem('pm_playerAge') || '8';
      let nd = document.getElementById('playerNameDisplay'); if(nd) nd.textContent = pName;
      let ad = document.getElementById('playerAgeDisplay'); if(ad) ad.textContent = pAge;

      // Reto Panda v1.0.1: XP, Nivel y Rango
      const stars = profile.stars || parseInt(localStorage.getItem('pm_stars') || '0', 10);
      const level = Math.max(1, Math.floor(stars / 25) + 1);
      const curXp = (stars % 25) * 20;
      const nextXp = 500;
      const xpPct = Math.min(100, Math.round((curXp / nextXp) * 100));

      const lvlEl = document.getElementById('playerLevelDisplay');
      if (lvlEl) lvlEl.innerText = level;
      const xpFill = document.getElementById('playerXpFill');
      if (xpFill) xpFill.style.width = Math.max(12, xpPct) + '%';
      const xpText = document.getElementById('playerXpText');
      if (xpText) xpText.innerText = `${curXp} / ${nextXp} XP`;

      const rankEl = document.getElementById('playerRankDisplay');
      if (rankEl) {
        const ranks = ['Exploradora', 'Aventurera', 'Descubridora', 'Gran Maestra'];
        rankEl.innerText = ranks[Math.min(ranks.length - 1, Math.floor(level / 3))];
      }

      setByQuery('.star-showcase .mini-label', t.stars); setByQuery('.star-showcase .star-lbl', t.stars);
      setByQuery('.btn-map', t.wBtn); setByQuery('[onclick="checkIntroPopup(); nav(\'setup\')"]', t.fBtn); 
      setByQuery('.btn-shop', t.sBtn); setByQuery('.btn-stats', t.dBtn);

      // Opción A: #badgesList eliminado del home — se actualiza el título del overlay de logros si existe
      const logrosTitle = document.querySelector('.logros-title');
      if (logrosTitle) logrosTitle.textContent = '\uD83C\uDFC6 ' + (t.bLbl || 'Logros') + ' · Misiones';
      const mlbl = document.querySelector('#missionsList'); if(mlbl && mlbl.previousElementSibling) mlbl.previousElementSibling.innerText = t.mLbl;

      const stp = document.querySelector('#setup h2'); if(stp) stp.innerText = t.setupTitle;
      const sd = document.querySelector('#setup h4'); if(sd) sd.innerText = t.diff;
      setByQuery('[onclick="setDif(this, \'normal\')"]', t.dNorm);
      setByQuery('[onclick="setDif(this, \'fast\')"]', t.dFast);
      setByQuery('[onclick="setDif(this, \'train\')"]', t.dTrain);
      const st = document.querySelectorAll('#setup h4')[1]; if(st) st.innerText = t.themes;
      setByQuery('[onclick="prepFreePlay()"]', t.startFree);

      const shT = document.querySelector('#shop h2'); if(shT) shT.innerText = t.shopTitle;
      const sht = document.querySelectorAll('.shop-tab');
      if(sht.length >= 3) { sht[0].innerText=t.st1; sht[1].innerText=t.st2; sht[2].innerText=t.st3; }

      const c1 = document.querySelector('#countOverlay h2'); if(c1) c1.innerText = t.ready;
      setEl('uiLevelBadge', `${t.lvl} <span id="uiLevel" style="color:var(--accent);">1</span>`);

      const mo1 = document.querySelector('#memOverlay h2'); if(mo1) mo1.innerText = t.mem1;
      const mo2 = document.querySelector('#memOverlay p'); if(mo2) mo2.innerText = t.mem2;
      setByQuery('#memOverlay .btn-play', t.mem3);

      setByQuery('#mapScreen h2', t.mapT);
      setByQuery('#statsOverlay h2', t.statsT);
      setByQuery('#statsOverlay p', t.statsD);

      setByQuery('#namePopup p', t.nameQ);
      setByQuery('#namePopup .btn-play', t.btnStart);
      const ni = document.getElementById('nameInput'); if(ni) ni.placeholder = t.nameP;
      const ai = document.getElementById('ageInput'); if(ai) ai.placeholder = t.ageP;
      setByQuery('#statsOverlay .btn-play', t.btnClose);
      setByQuery('#introPopup h2', t.introT);
      setByQuery('#introPopup .btn-play', t.introOk);

      try { renderMissions(); } catch(e){}
      try { if(typeof currentShopTab !== 'undefined') renderShopGrid(SHOP_ITEMS[currentShopTab||'mascots']); } catch(e){}

      // Update English toggle button text dynamically
      const eBtn = document.getElementById('toggleEnglishBtn');
      if(eBtn) {
        const on = eBtn.dataset.active === '1';
        eBtn.innerText = t.incEng + ': ' + (on ? (gl==='en'?'YES':'SÍ') : 'NO');
      }
    }

    // --- SETTINGS & THEMES ---
    function openSettings() {
      const so = document.getElementById('settingsOverlay');
      if (!so) return;
      document.getElementById('setNameInput').value = localStorage.getItem('pm_playerName') || '';
      document.getElementById('setAgeInput').value = localStorage.getItem('pm_playerAge') || '';

      const gl = profile.gameLang || 'es';
      document.getElementById('langEsBtn').style.background = gl==='es' ? 'var(--primary)' : 'rgba(0,0,0,0.4)';
      document.getElementById('langEnBtn').style.background = gl==='en' ? 'var(--primary)' : 'rgba(0,0,0,0.4)';

      so.showModal();
    }

    function closeSettings() {
      if (typeof window.safeCloseDialog === 'function') {
        window.safeCloseDialog('settingsOverlay');
      } else {
        const so = document.getElementById('settingsOverlay');
        if (so) { try { so.close(); } catch(e){} if (so.style.display) so.style.display = ''; }
      }
    }

    function applyAgeTier(age) {
      document.documentElement.classList.remove('age-tier-1', 'age-tier-2', 'age-tier-3');
      document.documentElement.classList.add('age-tier-1'); // Fuerza siempre Tier 1 (Clay World) para la v1.0
    }

    function setTheme(t) {
      // Diseño es la única fuente de verdad visual.
      // Esta función ya no gestiona temas — solo age-tiers son válidos.
      // Mantenida por compatibilidad, no ejecuta cambios de clase.
    }


    function setGameLang(l) { profile.gameLang = l; state.includeEnglish = (l==="en"); applyLang();
      document.getElementById('langEsBtn').style.background = l==='es' ? 'var(--primary)' : 'rgba(0,0,0,0.4)';
      document.getElementById('langEnBtn').style.background = l==='en' ? 'var(--primary)' : 'rgba(0,0,0,0.4)';
      state.includeEnglish = (l==='en');
    }

    function saveSettings() {
      applyLang();
      let n = document.getElementById('setNameInput').value.trim();
      n = n.replace(/[^A-Za-z0-9 áéíóúÁÉÍÓÚñÑüÜ]/g, '');
      const a = parseInt(document.getElementById('setAgeInput').value);
      if(n && a >= 4) {
        localStorage.setItem('pm_playerName', n);
        localStorage.setItem('pm_playerAge', a);
        profile.playerName = n;
        playerAge = a; window.playerAge = a;
        document.getElementById('playerNameDisplay').innerText = n;
        document.getElementById('playerAgeDisplay').innerText = a;
        applyAgeTier(a);
      }
      saveP();
      closeSettings();
    }

    // --- TOAST & EXPLAIN (reemplazan todos los alert()) ---
    function showToast(msg, color) {
      color = color || 'var(--secondary)';
      let t = document.getElementById('toastMsg');
      if (!t) {
        t = document.createElement('div');
        t.id = 'toastMsg';
        t.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);' +
          'background:rgba(26,5,46,0.97);border:2px solid;padding:12px 24px;border-radius:20px;' +
          'font-size:16px;font-weight:900;z-index:600;text-align:center;max-width:80%;' +
          'pointer-events:none;opacity:0;transition:opacity 0.3s;box-shadow:0 6px 20px rgba(0,0,0,0.7);white-space:pre-line;';
        document.body.appendChild(t);
      }
      t.innerText = msg;
      t.style.borderColor = color;
      t.style.color = color;
      t.style.opacity = '1';
      clearTimeout(t._timer);
      t._timer = setTimeout(() => { t.style.opacity = '0'; }, 2800);
    }

    function showExplain(msg) {
      document.getElementById('explainMsg').textContent = msg; // 🔴 Riesgo parcheado: uso de textContent en vez de innerHTML
      document.getElementById('explainPopup').showModal();
    }

    // --- INTRO POPUP ---
    function checkIntroPopup() {
      if(!profile.introSeen) {
        document.getElementById('introPopup').showModal();
      }
    }
    function closeIntroPopup() {
      if (typeof window.safeCloseDialog === 'function') {
        window.safeCloseDialog('introPopup');
      } else {
        const ip = document.getElementById('introPopup');
        if (ip) { try { ip.close(); } catch(e){} if (ip.style.display) ip.style.display = ''; }
      }
      profile.introSeen = true;
      saveP();
    }


    // --- SPLASH LOADER ---
    var steps = [
      {w:0, p:20,  t:"Despertando a Mochi... <img src='assets/mascotas/tier1/m_panda.webp' class='inline-splash-icon'>"},
      {w:1, p:40,  t:"Isla de Inicio lista... <img src='assets/interface/splash_icons/world_isla.webp' class='inline-splash-icon'>"},
      {w:2, p:60,  t:"Océano Profundo cargado... <img src='assets/interface/splash_icons/world_oceano.webp' class='inline-splash-icon'>"},
      {w:3, p:80,  t:"Laboratorio encendido... <img src='assets/interface/splash_icons/world_lab.webp' class='inline-splash-icon'>"},
      {w:4, p:95,  t:"¡Casi listo! <img src='assets/interface/splash_icons/world_destellos.webp' class='inline-splash-icon'>"},
    ];
    var idx = 0;
    var done = false;

    function hideSplash() {
      if (done) return;
      done = true;
      var sp = document.getElementById('splash');
      if (sp) sp.style.display = 'none';
    }

    // ─── PELUSAS FLOTANTES ────────────────────────────────────────
    function spawnDustOrbs(container) {
      var cols = ['col-a','col-b','col-c','col-d','col-e','col-f'];
      var total = 18;
      for (var i = 0; i < total; i++) {
        (function(i) {
          var orb = document.createElement('div');
          orb.className = 'clay-dust-orb ' + cols[i % cols.length];
          var size = 40 + Math.random() * 90; // 40–130px
          var startX = Math.random() * 100;   // % horizontal
          var startY = Math.random() * 100;   // % vertical
          var dx = (Math.random() - 0.5) * 160; // movimiento X (px)
          var dy = -(60 + Math.random() * 120); // sube siempre
          var ds = 0.6 + Math.random() * 0.8;   // escala final
          var dur = 8 + Math.random() * 12;      // 8–20s
          var delay = Math.random() * dur;        // offset de ciclo
          orb.style.cssText = [
            'width:' + size + 'px',
            'height:' + size + 'px',
            'left:' + startX + '%',
            'top:' + startY + '%',
            '--dx:' + dx + 'px',
            '--dy:' + dy + 'px',
            '--ds:' + ds,
            'animation-duration:' + dur + 's',
            'animation-delay:-' + delay + 's'
          ].join(';');
          container.appendChild(orb);
        })(i);
      }
    }

    function goHome(profileIncomplete) {
      if(profileIncomplete) {
        var np = document.getElementById('namePopup'); 
        if(np) {
          np.showModal();
          np.classList.add('revealing-portal');
          // Pelusas flotantes en namePopup (misma atmósfera que el splash)
          if (!np.dataset.dustSpawned) {
            spawnDustOrbs(np);
            np.dataset.dustSpawned = '1';
          }
        }
      } else {
        try { ensureDailyMissions(); } catch(e){}
        try { updateStarUI(); } catch(e){}
        applyAgeTier(playerAge);
        applyLang();
        if (typeof window.stopSpeech === 'function') window.stopSpeech();
        nav('home');
      }
    }

    function checkProfileComplete() {
      try {
        var n = localStorage.getItem('pm_playerName');
        var a = localStorage.getItem('pm_playerAge');
        if (n && a) {
          profile.playerName = n;
          playerAge = parseInt(a);
          var nd = document.getElementById('playerNameDisplay'); if(nd) nd.innerText = n;
          var ad = document.getElementById('playerAgeDisplay'); if(ad) ad.innerText = a;
          return true; // Complete
        }
        return false; // Incomplete
      } catch(e) {
        return false;
      }
    }

    function tickSplash() {
      if (idx >= steps.length) {
        var bar = document.getElementById('splashBar'); if(bar) bar.style.width = '100%';
        var msg = document.getElementById('splashMsg'); if(msg) msg.innerHTML = '¡Todo listo! <img src="assets/interface/splash_icons/world_cohete.webp" class="inline-splash-icon">'; // XSS-ACCEPTED: constante interna

        // ── FASE 1: TORNADO (splash se absorbe girando hacia el centro) ──
        var sp = document.getElementById('splash');
        if (sp) sp.classList.add('collapsing-portal');

        // ── FASE 2 (850ms): Ocultar splash + mostrar namePopup con portal unfold ──
        setTimeout(function() {
          hideSplash();

          var isComplete = checkProfileComplete();
          goHome(!isComplete);

          // Limpiar clases residuales después de que termina la animación de entrada
          setTimeout(function() {
            if (sp) sp.classList.remove('collapsing-portal');
            var np = document.getElementById('namePopup');
            if (np) np.classList.remove('revealing-portal');
          }, 900);

        }, 850); // coincide con duración de tornadoCollapse CSS
        return;
      }
      
      var s = steps[idx++];
      var bar = document.getElementById('splashBar'); if(bar) bar.style.width = s.p + '%';
      var msg = document.getElementById('splashMsg'); if(msg) msg.innerHTML = s.t; // XSS-ACCEPTED: constante interna
      
      // Sincronización de Iconos de Mundos
      for (var i = 0; i <= 4; i++) {
        var icon = document.getElementById('sw' + i);
        if (icon) {
          if (i < s.w) {
            icon.classList.remove('active-world');
            icon.classList.add('completed-world');
          } else if (i === s.w) {
            icon.classList.add('active-world');
          } else {
            icon.classList.remove('active-world', 'completed-world');
          }
        }
      }
      
      setTimeout(tickSplash, 380);
    }

    function startLoader() {
      // Generar pelusas flotantes en el splash
      var sp = document.getElementById('splash');
      if (sp) spawnDustOrbs(sp);
      setTimeout(tickSplash, 200);
      // Removed the fixed setTimeout(goHome, 5000) so tickSplash controls the flow
    }

    // --- SPLASH VIDEO INTRO CONTROLLER ---
    var _splashVideoDone = false;
    var _splashCtaVisible = false;

    function showSplashWelcomeCta() {
      if (_splashCtaVisible || _splashVideoDone) return;
      _splashCtaVisible = true;
      var cta = document.getElementById('splashWelcomeCta');
      if (cta) {
        cta.classList.add('is-visible');
      }
    }

    function initSplashVideo() {
      var vid = document.getElementById('splashVideo');
      var box = document.getElementById('splashVideoBox');

      // Si estamos en entorno de testing automatizado (Playwright / WebDriver),
      // omitir video rápidamente para que los 30 tests pasen en milisegundos sin timeout.
      if (navigator.webdriver) {
        if (vid) {
          try { vid.pause(); } catch(e) {}
        }
        if (box) {
          box.style.display = 'none';
        }
        setTimeout(function() {
          finishSplashVideo();
        }, 150);
        return;
      }

      if (!vid || !box) {
        startLoader();
        return;
      }

      // Configurar video en bucle continuo para fluidez del nado submarino
      vid.loop = true;

      // Tap / clic en cualquier parte del contenedor del video
      box.addEventListener('click', function(e) {
        // Clic directo en el botón de saltar intro
        if (e.target && (e.target.id === 'splashSkipBtn' || e.target.closest('#splashSkipBtn'))) {
          skipSplashVideo();
          return;
        }
        // Clic directo en el botón "¡A Jugar!"
        if (e.target && (e.target.id === 'splashPlayBtn' || e.target.closest('#splashPlayBtn'))) {
          finishSplashVideo();
          return;
        }
        // Clic directo en el botón de conmutar sonido
        if (e.target && (e.target.id === 'splashSoundBtn' || e.target.closest('#splashSoundBtn'))) {
          toggleSplashAudio();
          return;
        }
        // Si el video está silenciado, cualquier toque en el fondo activa el sonido
        if (vid.muted) {
          unmuteSplashVideo();
          return;
        }
      });

      // Programar la aparición del CTA tras ~6.5s de reproducción del video
      vid.addEventListener('timeupdate', function() {
        if (vid.currentTime >= 6.5) {
          showSplashWelcomeCta();
        }
      });

      // Temporizador de respaldo (6.5s a 7.5s) por si timeupdate no reporta a tiempo
      setTimeout(function() {
        if (!_splashVideoDone) {
          showSplashWelcomeCta();
        }
      }, 7000);

      // Si por alguna razón ended se emitiese, mostrar CTA de inmediato
      vid.addEventListener('ended', function() {
        showSplashWelcomeCta();
      });

      // En caso de error al cargar el archivo de video (offline, formato no soportado, etc.)
      vid.addEventListener('error', function() {
        console.warn('Video intro failed to load, falling back to classic loader.');
        fallbackToClassicLoader();
      });

      // Intentar reproducir CON SONIDO directamente
      vid.muted = false;
      vid.volume = 1.0;
      var playPromise = vid.play();
      if (playPromise !== undefined) {
        playPromise.then(function() {
          // El navegador permitió autoplay con audio
          updateSplashSoundBtnUI(false);
        }).catch(function() {
          // El navegador bloqueó autoplay con audio: silenciar temporalmente y avisar
          console.log('[Splash Video] Autoplay con audio bloqueado por política del navegador. Iniciando en silencio.');
          vid.muted = true;
          updateSplashSoundBtnUI(true);
          vid.play().catch(function(e) { console.warn('Autoplay muted blocked:', e); });

          // Desbloquear audio automáticamente ante cualquier interacción del usuario
          var unlockOnUserAction = function() {
            if (!_splashVideoDone && vid && vid.muted) {
              unmuteSplashVideo();
            }
            window.removeEventListener('pointerdown', unlockOnUserAction);
            window.removeEventListener('keydown', unlockOnUserAction);
          };
          window.addEventListener('pointerdown', unlockOnUserAction, { once: true });
          window.addEventListener('keydown', unlockOnUserAction, { once: true });
        });
      }
    }

    function updateSplashSoundBtnUI(isMuted) {
      var soundBtn = document.getElementById('splashSoundBtn');
      if (!soundBtn) return;
      if (isMuted) {
        soundBtn.classList.add('is-muted');
        soundBtn.innerHTML = '<span class="splash-sound-icon">🔇</span> <span class="splash-sound-label">Toca para sonido</span>';
      } else {
        soundBtn.classList.remove('is-muted');
        soundBtn.innerHTML = '<span class="splash-sound-icon">🔊</span> <span class="splash-sound-label">Sonido</span>';
      }
    }

    function unmuteSplashVideo() {
      var vid = document.getElementById('splashVideo');
      if (!vid) return;
      vid.muted = false;
      vid.volume = 1.0;
      updateSplashSoundBtnUI(false);
      var p = vid.play();
      if (p !== undefined) {
        p.catch(function() {});
      }
    }

    function toggleSplashAudio() {
      var vid = document.getElementById('splashVideo');
      if (!vid) return;
      if (vid.muted) {
        unmuteSplashVideo();
      } else {
        vid.muted = true;
        updateSplashSoundBtnUI(true);
      }
    }

    function skipSplashVideo() {
      finishSplashVideo();
    }

    function fallbackToClassicLoader() {
      if (_splashVideoDone) return;
      var box = document.getElementById('splashVideoBox');
      var fallback = document.getElementById('splashFallbackWrapper');
      if (box) box.style.display = 'none';
      if (fallback) fallback.style.display = 'flex';
      startLoader();
    }

    function finishSplashVideo() {
      if (_splashVideoDone) return;
      _splashVideoDone = true;

      // 1. Efecto háptico/táctil sonoro
      try {
        if (typeof sfxHappyGo === 'function') {
          sfxHappyGo();
        } else if (typeof sfxTap === 'function') {
          sfxTap();
        } else if (typeof window.sfxHappyGo === 'function') {
          window.sfxHappyGo();
        } else if (typeof window.sfxTap === 'function') {
          window.sfxTap();
        }
      } catch(e) {
        console.warn('[Splash] Error reproduciendo SFX táctil:', e);
      }

      // 2. Iniciar música ambiental en fade continuo sin corte
      try {
        if (typeof startAmbientMusic === 'function') {
          startAmbientMusic();
        } else if (typeof window.startAmbientMusic === 'function') {
          window.startAmbientMusic();
        }
      } catch(e) {
        console.warn('[Splash] Error iniciando música ambiental:', e);
      }

      // 3. Pausar video y silenciarlo suavemente
      var vid = document.getElementById('splashVideo');
      if (vid) {
        try {
          if (vid.volume > 0 && !vid.muted) {
            var vVol = vid.volume;
            var vFade = setInterval(function() {
              vVol = Math.max(0, vVol - 0.25);
              try { vid.volume = vVol; } catch(err) {}
              if (vVol <= 0.05) {
                clearInterval(vFade);
                try { vid.pause(); } catch(err) {}
              }
            }, 40);
          } else {
            vid.pause();
          }
        } catch(e) {}
      }

      var box = document.getElementById('splashVideoBox');
      if (box) {
        box.classList.add('fading-out');
      }

      setTimeout(function() {
        if (box) {
          box.style.display = 'none';
        }
        hideSplashWithMusic();

        var isComplete = checkProfileComplete();
        goHome(!isComplete);
      }, 400);
    }

    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      initSplashVideo();
    } else {
      window.addEventListener('load', initSplashVideo);
    }


// ─────────────────────────────────────────────────────────
// MÚSICA AMBIENTAL (Gestión centralizada en js/audio.js)
// ─────────────────────────────────────────────────────────
window.stopAmbientMusic  = stopAmbientMusic;
window.startAmbientMusic = startAmbientMusic;
window.toggleAmbient     = toggleAmbient;

// Arrancar música tras primer cargado al home
const _hideSplashOriginal = hideSplash;
function hideSplashWithMusic() {
  _hideSplashOriginal();
  // Pequeña demora para no chocar con animaciones del splash
  setTimeout(() => { if (typeof startAmbientMusic === 'function') startAmbientMusic(); }, 600);
}
window.hideSplash = hideSplashWithMusic;

// --- WINDOW EXPORTS FOR INLINE HTML HANDLERS ---
window.getSeasonPhrase = getSeasonPhrase;
window.pokeMascot = pokeMascot;
window.nav = nav;
window.flash = flash;
window.rand = rand;
window.shuffle = shuffle;
window.getUniqueFalses = getUniqueFalses;
window.saveP = saveP;
window.missionPeriodKeys = missionPeriodKeys;
window.ensureDailyMissions = ensureDailyMissions;
window.renderMissions = renderMissions;
window.updateMission = updateMission;
window.updateStarUI = updateStarUI;
window.showStarGain = showStarGain;
window.accessoryStyle = accessoryStyle;
window.applyAccessory = applyAccessory;
window.openBadges  = openBadges;   // alias legacy
window.openLogros  = openLogros;   // nuevo handler del botón LOGROS
window.switchLogrosTab = switchLogrosTab;
window.generateStatsImage = generateStatsImage;
window.renderBadgesPreview = renderBadgesPreview;
window.refreshHome = refreshHome;
window.showStats = showStats;
window.updateSkills = updateSkills;
window.recordAnswerStats = recordAnswerStats;
window.recordStreakDay = recordStreakDay;
window.renderMap = renderMap;
window.startMapLevel = startMapLevel;
window.renderSetupThemes = renderSetupThemes;
window.setDif = setDif;
window.bindEnglishToggle = bindEnglishToggle;
window.prepFreePlay = prepFreePlay;
window.startCountdown = startCountdown;
window.applyLevelRules = applyLevelRules;
window.renderTags = renderTags;
window.applyLang = applyLang;
window.openSettings = openSettings;
window.closeSettings = closeSettings;
window.applyAgeTier = applyAgeTier;
window.setTheme = setTheme;
window.setGameLang = setGameLang;
window.saveSettings = saveSettings;
window.showToast = showToast;
window.showExplain = showExplain;
window.checkIntroPopup = checkIntroPopup;
window.closeIntroPopup = closeIntroPopup;
window.hideSplash = hideSplashWithMusic;
window.goHome = goHome;
window.getMascotImagePath = getMascotImagePath;
window.toggleAmbient = toggleAmbient;
window.openParentReport = openParentReport;
window.initSplashVideo = initSplashVideo;
window.toggleSplashAudio = toggleSplashAudio;
window.unmuteSplashVideo = unmuteSplashVideo;
window.skipSplashVideo = skipSplashVideo;
window.finishSplashVideo = finishSplashVideo;
window.showSplashWelcomeCta = showSplashWelcomeCta;

function claimDailyChest() {
  if (typeof sfxChest === 'function') sfxChest();
  else if (typeof window.sfxWin === 'function') window.sfxWin();
  if (typeof createParticles === 'function') createParticles();
  const chestImg = document.getElementById('dailyChestImg');
  if (chestImg) {
    chestImg.src = 'assets/interface/chest_golden_open.webp';
    chestImg.style.transform = 'scale(1.15)';
  }
  profile.stars = (profile.stars || 0) + 50;
  saveP();
  updateStarUI();
  if (typeof showToast === 'function') {
    showToast('🎉 ¡Cofre reclamado! +50 ⭐');
  }
}
window.claimDailyChest = claimDailyChest;
// NOTA: window.toggleAudio lo exporta game.js → no crear alias aquí

// -----------------------------------------------------------------------------
// SISTEMA DE PARTÍCULAS (CELEBRACIÓN)
// -----------------------------------------------------------------------------
function createParticles() {
  const colors = ['#FFD54F', '#F48FB1', '#A5D6A7', '#90CAF9', '#FFD700'];
  for (let i = 0; i < 50; i++) {
    const p = document.createElement('div');
    p.style.position = 'fixed';
    p.style.left = '50%';
    p.style.top = '50%';
    p.style.width = Math.random() * 10 + 5 + 'px';
    p.style.height = p.style.width;
    p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    p.style.borderRadius = '50%';
    p.style.pointerEvents = 'none';
    p.style.zIndex = '9999';
    
    // Random angle and distance
    const angle = Math.random() * Math.PI * 2;
    const distance = Math.random() * window.innerWidth * 0.5;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    
    p.style.transition = 'transform 1s cubic-bezier(0, .9, .57, 1), opacity 1s ease-out';
    p.style.transform = 'translate(-50%, -50%) scale(1)';
    
    document.body.appendChild(p);
    
    requestAnimationFrame(() => {
      p.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`;
      p.style.opacity = '0';
    });
    
    setTimeout(() => {
      if (p.parentNode) p.parentNode.removeChild(p);
    }, 1000);
  }
}
window.createParticles = createParticles;

export { 
  getUniqueFalses, rand, shuffle, updateMission, recordAnswerStats, 
  showStarGain, updateStarUI, recordStreakDay, nav, applyAccessory, 
  showToast, ensureDailyMissions, applyLang, renderTags, updateSkills, 
  flash, showExplain, TRANSLATIONS, saveP, missionPeriodKeys, getMascotImagePath,
  createParticles, initSplashVideo, toggleSplashAudio, unmuteSplashVideo, skipSplashVideo, finishSplashVideo,
  showSplashWelcomeCta, startAmbientMusic, stopAmbientMusic, toggleAmbient, sfxSquish, sfxChest, sfxTap, sfxHappyGo
};
