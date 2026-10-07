// ═══════════════════════════════════════════════════════════════════════════
// RETO PANDA V1 — MOTOR DE AUDIO DUAL (AGENTE SONIDO)
// Síntesis procedural Juicy Clay (Web Audio API) + BGM + Howler.js + TTS
// ═══════════════════════════════════════════════════════════════════════════

const USE_HOWLER = true;
let audioEnabled = true;

// ─────────────────────────────────────────────────────────────────────────
// 1. WEB AUDIO API — SINTETIZADOR PROCEDURAL "JUICY CLAY"
// ─────────────────────────────────────────────────────────────────────────
let audioCtx = null;

function getAudioCtx() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

function playTone(freq, duration, type = 'sine', vol = 0.25, delay = 0) {
  if (!audioEnabled) return;
  try {
    const ctx = getAudioCtx();
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.type = type;
    const startTime = ctx.currentTime + delay;
    osc.frequency.setValueAtTime(freq, startTime);
    gain.gain.setValueAtTime(vol, startTime);
    gain.gain.exponentialRampToValueAtTime(0.0008, startTime + duration);

    osc.start(startTime);
    osc.stop(startTime + duration + 0.05);
  } catch (e) {
    console.warn('[AudioEngine] playTone warning:', e);
  }
}

// ─────────────────────────────────────────────────────────────────────────
// EFECTOS SINTETIZADOS NATIVOS (TEXTURAS DE PLASTILINA TÁCTIL)
// ─────────────────────────────────────────────────────────────────────────
const _native = {
  // Pop gomoso de botón UI
  tap: () => {
    if (!audioEnabled) return;
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'sine';
      const t = ctx.currentTime;
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(640, t + 0.06);
      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.start(t);
      osc.stop(t + 0.08);
    } catch (e) {}
  },

  // Squish suave al interactuar con Mochi
  squish: () => {
    if (!audioEnabled) return;
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = 'triangle';
      const t = ctx.currentTime;
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(280, t + 0.12);
      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
      osc.start(t);
      osc.stop(t + 0.14);
    } catch (e) {}
  },

  // Respuesta correcta: arpegio de marimba de madera (Do - Mi - Sol)
  correct: () => {
    playTone(523.25, 0.12, 'sine', 0.28, 0);
    playTone(659.25, 0.12, 'sine', 0.28, 0.08);
    playTone(783.99, 0.22, 'sine', 0.32, 0.16);
  },

  // Respuesta incorrecta: acorde suave amable (NO buzzer punitivo, invita al reintento)
  wrong: () => {
    playTone(349.23, 0.14, 'triangle', 0.2, 0);
    playTone(293.66, 0.22, 'triangle', 0.18, 0.08);
  },

  // Subida de nivel o victoria de etapa
  levelUp: () => {
    [523.25, 659.25, 783.99, 1046.50].forEach((f, i) => {
      playTone(f, 0.16, 'sine', 0.26, i * 0.09);
    });
  },

  // Tintineo de estrella o moneda en la tienda
  coin: () => {
    playTone(987.77, 0.06, 'sine', 0.2, 0);
    playTone(1318.51, 0.12, 'sine', 0.22, 0.06);
  },

  // Apertura del cofre diario dorado (cascada mágica)
  chest: () => {
    [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51].forEach((f, i) => {
      playTone(f, 0.18, 'sine', 0.24, i * 0.07);
    });
  },

  // Tick de reloj de madera
  tick: () => {
    playTone(740, 0.035, 'triangle', 0.12, 0);
  },

  // Aviso de tiempo urgente sin alarma estridente
  urgent: () => {
    playTone(587.33, 0.06, 'triangle', 0.16, 0);
    playTone(440.00, 0.06, 'triangle', 0.16, 0.08);
  },

  // Cuenta regresiva previa al inicio (3, 2, 1)
  countdown: () => {
    playTone(440, 0.09, 'sine', 0.2, 0);
  },

  // Mitad de tiempo
  halfTime: () => {
    playTone(659.25, 0.1, 'sine', 0.18, 0);
  },

  happyTick: () => {
    if (!audioEnabled) return;
    try {
      const a = getAudioCtx();
      if (!a) return;
      const o = a.createOscillator();
      const g = a.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(523.25, a.currentTime);
      o.frequency.exponentialRampToValueAtTime(659.25, a.currentTime + 0.1);
      g.gain.setValueAtTime(0.28, a.currentTime);
      g.gain.exponentialRampToValueAtTime(0.01, a.currentTime + 0.2);
      o.connect(g);
      g.connect(a.destination);
      o.start();
      o.stop(a.currentTime + 0.2);
    } catch (e) {}
  },

  happyGo: () => {
    if (!audioEnabled) return;
    try {
      const a = getAudioCtx();
      if (!a) return;
      const o = a.createOscillator();
      const g = a.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(523.25, a.currentTime);
      o.frequency.exponentialRampToValueAtTime(1046.50, a.currentTime + 0.3);
      g.gain.setValueAtTime(0.35, a.currentTime);
      g.gain.exponentialRampToValueAtTime(0.01, a.currentTime + 0.5);
      o.connect(g);
      g.connect(a.destination);
      o.start();
      o.stop(a.currentTime + 0.5);
    } catch (e) {}
  }
};

// ─────────────────────────────────────────────────────────────────────────
// 2. BACKEND B: HOWLER.JS (FALLBACK A NATIVO SI FALLA)
// ─────────────────────────────────────────────────────────────────────────
let _howls = null;
let _howlStatus = {};

function _initHowler() {
  if (_howls || typeof Howl === 'undefined' || window._HOWLER_FAILED) return;

  const config = {
    correct:   { file: 'correct.mp3', vol: 0.7 },
    wrong:     { file: 'wrong.mp3',   vol: 0.65 },
    coin:      { file: 'coin.mp3',    vol: 0.6 },
    levelUp:   { file: 'win.mp3',     vol: 0.75 },
    tick:      { file: 'tick.mp3',    vol: 0.4 },
    urgent:    { file: 'urgent.mp3',  vol: 0.5 },
    countdown: { file: 'pop.mp3',     vol: 0.4 },
    halfTime:  { file: 'urgent.mp3',  vol: 0.3 }
  };

  _howls = {};
  Object.keys(config).forEach(name => {
    const item = config[name];
    _howlStatus[name] = 'loading';
    _howls[name] = new Howl({
      src: ['assets/sounds/' + item.file],
      volume: item.vol,
      html5: true,
      preload: true,
      onload: () => {
        _howlStatus[name] = 'loaded';
      },
      onloaderror: (id, err) => {
        _howlStatus[name] = 'error';
      },
      onplayerror: (id, err) => {
        if (_native[name]) _native[name]();
      }
    });
  });
}

function _playHowl(name, nativeFn) {
  if (!audioEnabled) return;
  if (!_howls) _initHowler();
  if (_howls && _howls[name] && _howlStatus[name] !== 'error') {
    try {
      _howls[name].stop();
      _howls[name].play();
    } catch (e) {
      nativeFn && nativeFn();
    }
  } else {
    nativeFn && nativeFn();
  }
}

const _useH = () => USE_HOWLER && typeof Howl !== 'undefined' && !window._HOWLER_FAILED;

// ─────────────────────────────────────────────────────────────────────────
// ROUTER PÚBLICO DE EFECTOS DE SONIDO (SFX)
// ─────────────────────────────────────────────────────────────────────────
function sfxTap()       { _native.tap(); }
function sfxSquish()    { _native.squish(); }
function sfxChest()      { _native.chest(); }
function sfxCorrect()   { _useH() ? _playHowl('correct',   _native.correct)   : _native.correct(); }
function sfxWrong()     { _useH() ? _playHowl('wrong',     _native.wrong)     : _native.wrong(); }
function sfxLevelUp()   { _useH() ? _playHowl('levelUp',   _native.levelUp)   : _native.levelUp(); }
function sfxWin()       { sfxLevelUp(); }
function sfxCoin()      { _useH() ? _playHowl('coin',      _native.coin)      : _native.coin(); }
function sfxTick()      { _useH() ? _playHowl('tick',      _native.tick)      : _native.tick(); }
function sfxUrgent()    { _useH() ? _playHowl('urgent',    _native.urgent)    : _native.urgent(); }
function sfxCountdown() { _useH() ? _playHowl('countdown', _native.countdown) : _native.countdown(); }
function sfxHalfTime()  { _useH() ? _playHowl('halfTime',  _native.halfTime)  : _native.halfTime(); }
function sfxHappyTick() { _native.happyTick(); }
function sfxHappyGo()   { _native.happyGo(); }

// ─────────────────────────────────────────────────────────────────────────
// 3. MÚSICA AMBIENTAL (BGM) CON CONTROL SUAVE (FADE IN / FADE OUT)
// ─────────────────────────────────────────────────────────────────────────
let _ambientAudio = null;
let _ambientEnabled = true;
let _ambientMuted = false;
let _fadeInterval = null;

function _getAmbientAudio() {
  if (!_ambientAudio) {
    _ambientAudio = new Audio('assets/audio/menu_music.mp3');
    _ambientAudio.loop = true;
    _ambientAudio.volume = 0.38;
    _ambientAudio.preload = 'auto';
  }
  return _ambientAudio;
}

function startAmbientMusic(targetVol = 0.38) {
  if (_ambientMuted || !audioEnabled) return;
  const a = _getAmbientAudio();
  clearInterval(_fadeInterval);

  if (a.paused) {
    a.volume = 0.05;
    const playPromise = a.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        // Fade in suave hacia el volumen objetivo
        let cur = a.volume;
        _fadeInterval = setInterval(() => {
          cur = Math.min(targetVol, cur + 0.05);
          a.volume = cur;
          if (cur >= targetVol) clearInterval(_fadeInterval);
        }, 50);
      }).catch(() => {
        // Bloqueo de autoplay: desbloquear al primer toque
        const unlock = () => {
          if (_ambientEnabled && !_ambientMuted && audioEnabled) {
            a.volume = targetVol;
            a.play().catch(() => {});
          }
          document.removeEventListener('pointerdown', unlock);
          document.removeEventListener('keydown', unlock);
        };
        document.addEventListener('pointerdown', unlock, { once: true });
        document.addEventListener('keydown', unlock, { once: true });
      });
    }
  }
}

function stopAmbientMusic(immediate = false) {
  if (!_ambientAudio || _ambientAudio.paused) return;
  clearInterval(_fadeInterval);
  if (immediate) {
    _ambientAudio.pause();
    return;
  }
  // Fade out suave de 250ms
  let cur = _ambientAudio.volume;
  _fadeInterval = setInterval(() => {
    cur = Math.max(0, cur - 0.08);
    _ambientAudio.volume = cur;
    if (cur <= 0.02) {
      clearInterval(_fadeInterval);
      _ambientAudio.pause();
      _ambientAudio.volume = 0.38;
    }
  }, 40);
}

function toggleAmbient() {
  _ambientMuted = !_ambientMuted;
  const btn = document.getElementById('ambientBtn');
  if (_ambientMuted) {
    stopAmbientMusic(true);
    if (btn) {
      btn.classList.add('muted');
      btn.textContent = '🔇';
      btn.title = 'Activar música';
    }
  } else {
    startAmbientMusic();
    if (btn) {
      btn.classList.remove('muted');
      btn.textContent = '🎵';
      btn.title = 'Silenciar música';
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────
// 4. LOCUCIÓN PEDAGÓGICA (SPEECH SYNTHESIS / TTS)
// ─────────────────────────────────────────────────────────────────────────
function speakQuestion(text) {
  if (!audioEnabled || !('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-CL';
  utterance.rate = 0.95;
  utterance.pitch = 1.1;
  window.speechSynthesis.speak(utterance);
}

function stopSpeech() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}

// ─────────────────────────────────────────────────────────────────────────
// 5. CONTROL GLOBAL DE EFECTOS Y MUTE
// ─────────────────────────────────────────────────────────────────────────
function toggleAudio() {
  audioEnabled = !audioEnabled;
  if (_useH()) {
    Howler.mute(!audioEnabled);
  }
  const btn = document.getElementById('audioBtnGlobal');
  if (btn) {
    btn.textContent = audioEnabled ? '🔊' : '🔇';
    btn.classList.toggle('muted', !audioEnabled);
  }
  if (audioEnabled) {
    sfxCoin();
  }
}

// ─────────────────────────────────────────────────────────────────────────
// REGISTRO GLOBAL EN WINDOW (PARA HANDLERS INLINE Y SAFECALL)
// ─────────────────────────────────────────────────────────────────────────
window.getAudioCtx = getAudioCtx;
window.playTone = playTone;
window.sfxTap = sfxTap;
window.sfxSquish = sfxSquish;
window.sfxChest = sfxChest;
window.sfxCorrect = sfxCorrect;
window.sfxWrong = sfxWrong;
window.sfxLevelUp = sfxLevelUp;
window.sfxWin = sfxWin;
window.sfxCoin = sfxCoin;
window.sfxTick = sfxTick;
window.sfxUrgent = sfxUrgent;
window.sfxCountdown = sfxCountdown;
window.sfxHalfTime = sfxHalfTime;
window.sfxHappyTick = sfxHappyTick;
window.sfxHappyGo = sfxHappyGo;
window.toggleAudio = toggleAudio;
window.speakQuestion = speakQuestion;
window.stopSpeech = stopSpeech;
window.startAmbientMusic = startAmbientMusic;
window.stopAmbientMusic = stopAmbientMusic;
window.toggleAmbient = toggleAmbient;

export {
  audioEnabled,
  getAudioCtx,
  playTone,
  sfxTap,
  sfxSquish,
  sfxChest,
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
  stopSpeech,
  startAmbientMusic,
  stopAmbientMusic,
  toggleAmbient
};
