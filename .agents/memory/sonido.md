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
- **Estado Actual:** 🟢 Agente inicializado y documentado. Sistema de audio dual operativo y 100% verde en pruebas automatizadas.

---

## 📊 Inventario Actual de Recursos de Audio

### 1. Pistas de Música (BGM)
| Archivo | Formato / Peso | Ubicación | Estado |
|---|---|---|---|
| `menu_music.mp3` | MP3 / 1.7 MB | `assets/audio/menu_music.mp3` | ✅ Activo. Se reproduce en bucle en Home, Tienda, Setup y Mundos con control en `#ambientBtn`. |
| `intro_reto_panda.mp4` | MP4 / 6.4 MB | `assets/video/intro_reto_panda.mp4` | ✅ Activo. Audio cinematográfico integrado (ambiente acuático + arpegio + acorde final "Reto Panda"). |

### 2. Efectos de Sonido (SFX)
- **Implementación Actual:**
  - Sintetizador nativo procedural mediante **Web Audio API** (`AudioContext`, osciladores senoidales y triangulares con rampas exponenciales de ganancia).
  - Wrapper enrutador hacia **Howler.js** con fallback automático al sintetizador nativo si los archivos no existen o la red falla.
- **Funciones Implementadas en `js/game.js`:**
  - `sfxCorrect()`: Tono ascendente de recompensa.
  - `sfxWrong()`: Tono descendente amortiguado.
  - `sfxLevelUp()` / `sfxHappyGo()`: Arpegio de subida de nivel.
  - `sfxCoin()`: Tono de adquisición de estrella/moneda.
  - `sfxTick()` / `sfxHappyTick()`: Reloj suave.
  - `sfxUrgent()`: Alerta de últimos segundos sin estridencia.
  - `sfxCountdown()`: Tono de cuenta regresiva (3, 2, 1, ¡YA!).
  - `sfxHalfTime()`: Tono de mitad del tiempo.

### 3. Locución y Accesibilidad (TTS)
- `speakQuestion(text)` en `js/game.js`: Utiliza `SpeechSynthesisUtterance` con idioma `es-CL` para leer las preguntas en voz alta a niños que están en proceso de alfabetización inicial.

---

## 🧪 Pruebas de Calidad Asociadas (Playwright)
- `tests/08-monkey-stress.spec.js`:
  - `T-MONKEY-02: Ráfaga de clics en audio sin desbordamiento de AudioContext`: ✅ PASS. Valida que el motor no sature el thread de audio ante clics masivos continuos.
- `tests/07-accessibility.spec.js`:
  - `T-A11Y-03`: Los botones de audio flotantes (`#ambientBtn` y `#audioBtnGlobal`) cumplen el tamaño táctil de accesibilidad ($\ge 44\times 44\text{ px}$).

---

## 🚀 Hoja de Ruta (Roadmap) del Agente Sonido
1. **Modularización:** Coordinar con el Agente Arquitecto para extraer la lógica de audio de `js/game.js` y `js/ui.js` hacia un módulo limpio e independiente: `js/audio.js`.
2. **Biblioteca de Assets "Juicy Clay SFX":** Producir o integrar archivos `.mp3` reales para los efectos de sonido táctiles (pop de burbuja, squish de plastilina, cascada de gemas).
3. **Ajuste de Mezcla y Volumen:** Implementar perfiles de ganancia independientes para Música de fondo (0.35), Efectos de sonido (0.6) y Voz narradora (1.0), con atenuación automática (ducking) de la música cuando la voz habla.
4. **Transiciones Fade In / Fade Out:** Suavizar la entrada y salida de música entre pantallas para evitar cortes bruscos al iniciar una partida.
