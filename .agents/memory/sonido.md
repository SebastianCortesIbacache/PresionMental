# 🎵 Memoria: Agente Sonido
## Reto Panda | Audio Director & Sound Engineer

---

# 🚨 DIRECTIVA GLOBAL: PIVOTE ESTRATÉGICO 🚨
1. **Scope:** Concentración exclusiva en **Tier 1 (6-7 años, Clay World)**. Los sonidos deben sentirse táctiles, cálidos, juguetones y libres de agresividad.
2. **Pedagogía Sonora:** Cero sonidos punitivos. Los errores son oportunidades de aprendizaje; el sonido de fallo debe invitar a reintentar amablemente.
3. **PWA Offline-First:** Los audios deben estar completamente cacheados y optimizados en peso (<15 MB total app).
4. **Respeto a Políticas de Navegadores:** Manejo seguro de `AudioContext` y reproducción condicionada al primer gesto del usuario.

---

## 🆔 ID de Conversación y Estado
- **Última Actualización:** 2026-10-07
- **Estado Actual:** 🟢 Motor de audio 100% modularizado en `js/audio.js`. Splash video con audio revivido y control interactivo inteligente. SFX táctiles integrados en Mochi (`sfxSquish`), cofre diario (`sfxChest`) y navegación (`sfxTap`). Suite Playwright: 29/29 pruebas superadas (100% verde).

---

## 📊 Inventario Actual de Recursos de Audio

### 1. Pistas de Música (BGM)
| Archivo | Formato / Peso | Ubicación | Estado |
|---|---|---|---|
| `menu_music.mp3` | MP3 / 1.7 MB | `assets/audio/menu_music.mp3` | ✅ Activo. Se reproduce con Fade-in/Fade-out suave mediante `startAmbientMusic()` / `stopAmbientMusic()` con control en `#ambientBtn`. |
| `intro_reto_panda.mp4` | MP4 / 6.4 MB | `assets/video/intro_reto_panda.mp4` | ✅ Activo. Audio estéreo AAC revivido. Autoplay inteligente con detección de permisos del navegador, badge visual interactivo (`🔊 Sonido` / `🔇 Toca para sonido`) y desmuteo instantáneo al tocar la pantalla. |

### 2. Arquitectura Modular (`js/audio.js`)
- **Web Audio API Procedural ("Juicy Clay"):**
  - `sfxTap()`: Pop gomoso de botón UI (frecuencia ascendente rápida 320Hz -> 640Hz).
  - `sfxSquish()`: Deformación suave de plastilina al interactuar con Mochi (440Hz -> 280Hz).
  - `sfxChest()`: Cascada mágica de marimba pentatónica al abrir el cofre diario de estrellas.
  - `sfxCorrect()`: Arpegio cálido de marimba de madera (Do - Mi - Sol).
  - `sfxWrong()`: Acorde amable y constructivo de reintento (sin frecuencias estridentes de buzzer).
  - `sfxLevelUp()` / `sfxWin()`: Fanfarria de victoria y avance de etapa.
  - `sfxCoin()`: Tintineo brillante de estrella adquirida.
  - `sfxTick()`: Golpe de reloj de madera suave.
  - `sfxUrgent()`: Alerta de tiempo crítico amable sin estridencias.
  - `sfxCountdown()`: Pitido cálido de cuenta regresiva previa.
- **Enrutador Dual con Howler.js:**
  - Fallback instantáneo al sintetizador procedural si Howler.js no está disponible o falla la red.
- **Transiciones y Fade:**
  - `startAmbientMusic(targetVol)`: Fade-in suave con desbloqueo resiliente en primer gesto de usuario.
  - `stopAmbientMusic(immediate)`: Fade-out suave de 250ms para evitar cortes abruptos de audio.

### 3. Locución y Accesibilidad (TTS)
- `speakQuestion(text)` en `js/audio.js`: Utiliza `SpeechSynthesisUtterance` con acento `es-CL`, cadencia pausada (rate 0.95) y tono cálido (pitch 1.1) para niños de 6-7 años.

---

## 🧪 Pruebas de Calidad Asociadas (Playwright)
- `tests/08-monkey-stress.spec.js`:
  - `T-MONKEY-02: Ráfaga de clics en audio sin desbordamiento de AudioContext`: ✅ PASS. Cero fugas ni bloqueos del hilo de audio tras ráfagas intensivas de toques.
  - `T-MONKEY-01: 2.000 acciones aleatorias ultrarrápidas sin colapso del DOM`: ✅ PASS.
- `tests/07-accessibility.spec.js`:
  - `T-A11Y-03`: Botones `#ambientBtn` y `#audioBtnGlobal` cumplen ergonomía táctil ($\ge 44\times 44\text{ px}$).
- `tests/11-lighthouse-audit.spec.js`:
  - `T-QUAL-04`: 0 errores en consola de audio.
- **Total:** 29/29 tests pasando en verde.

---

## 🚀 Logros Completados y Próximos Pasos
1. ✅ **Completado:** Separación modular limpia de audio a `js/audio.js`, cacheado en Service Worker (`sw.js`).
2. ✅ **Completado:** Revitalización del audio en la pantalla de carga con video intro de Mochi.
3. ✅ **Completado:** Sonorización táctil de Mochi (Squish), cofre (Chest) y navegación (Tap).
4. ⏳ **Siguiente Iteración:** Ducking dinámico (atenuación automática del BGM cuando el narrador TTS está hablando).
