# 🎵 PLAN MAESTRO DE AUDIO Y VOZ CANÓNICA: RETO PANDA v1.0
**Enfoque:** Tier 1 (6-7 años) / PWA 100% Offline-First / Ergonomía Acústica Infantil  
**Aprobado por:** Dirección del Proyecto & Consejo Asesor Estratégico  
**Fecha:** 11 de octubre de 2026  

---

## 1. 🎯 PRINCIPIOS GENERALES DEL SISTEMA DE AUDIO

1. **Cero Frustración y Cero Fatiga Acústica:**
   - Tonos cálidos, redondeados y amigables. Se prohíben frecuencias agudas estridentes (>5 kHz) o buzzers punitivos de error.
   - Normalización de volumen estricta a estándar de streaming infantil: **-14 a -16 LUFS**.
2. **Arquitectura Híbrida Inteligente:**
   - **SFX Táctiles Rápidos (0 KB):** Síntesis matemática en tiempo real vía Web Audio API (`sfxTap`, `sfxSquish`, ticks). Latencia 0 ms, descarga 0 KB.
   - **Música de Fondo (BGM):** Streaming liviano HTML5 Audio en OGG/Opus (~500 KB) con buffer circular de bajo consumo de RAM.
   - **Locución y Voz de Mochi (Voice Pack):** Clips de audio pre-renderizados en Opus Mono 48 kbps (~15-20 KB por frase). Totalmente cacheados en `sw.js` para funcionamiento 100% offline.
3. **Micro-Variación Tonal Anti-Repetición (*Detune*):**
   - Todo efecto interactivo repetitivo (toques a Mochi o clics de interfaz) aplica una variación tonal aleatoria de **±3% a ±5%** en runtime para evitar el efecto ametralladora.
4. **Audio Ducking Automático:**
   - Cuando Mochi habla, la música de fondo se atenúa suavemente al **35% - 40%** y recupera su volumen cuando termina.

---

## 🗺️ MATRIZ DE AUDIO FASE POR FASE (DESPLIEGUE Y REVISIÓN)

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                          MAPA DE AUDIO POR FASES                                 │
├─────────────────┬─────────────────┬─────────────────┬─────────────────┬──────────┤
│  FASE 1         │  FASE 2         │  FASE 3         │  FASE 4         │  FASE 5  │
│  Flujo Inicial  │  Gameplay Core  │  Mapa & Bento   │  Parental Gate  │  Master  │
│  & Pasaporte    │  & Banco 200    │  & Mundos       │  & Tienda       │  & QA    │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┴──────────┘
```

---

### 🚀 FASE 1: Flujo Inicial, Intro y Onboarding del Pasaporte (ACTUAL)
* **Objetivo:** Bienvenida inmersiva, transición pacífica y primera conexión con Mochi.
* **Inventario de Sonidos:**
  1. **Videos Cinemáticos (`intro_reto_panda` y `onboarding_passport`):**
     - Techo de ganancia seguro a `0.60` (-4.5 dBFS).
     - Micro fade-in de desmutado de 200 ms al primer toque.
  2. **Interacciones del Pasaporte de Aventuras:**
     - Sonido de pasar página / apertura de libreta de cuero suave.
     - Sellos de cera táctiles para botones [ 6 ], [ 7 ] y [ Otra ] (*thud* cálido de plastilina).
     - Botón "¡VAMOS A EXPLORAR!": Campana suave de aventura y despegue.
  3. **Llegada al Home / Hub:**
     - Eliminación de `sfxLevelUp` al cargar el menú principal.
     - Música ambiental `menu_music` entra en fade-in suave de 1 segundo.
     - Toque a Mochi (`pokeMascot`): `sfxSquish` rediseñado con onda senoidal blanda + filtro low-pass (1100 Hz) + micro-detune aleatorio.

---

### 🧸 FASE 2: Experiencia de Juego y Pedagogía Positiva (SIGUIENTE)
* **Objetivo:** Autonomía para niños prelectores y feedback constructivo.
* **Inventario de Sonidos:**
  1. **Voz de Mochi en Banco MVP de 200 Preguntas:**
     - Botón de altavoz (🔊) bajo demanda junto al texto de cada pregunta.
     - 200 micro-clips en Opus 48 kbps Mono (~3.6 MB en total).
  2. **Feedback de Acierto:**
     - Arpegio cálido de marimba de madera (Do - Mi - Sol) + tintineo suave de estrella.
     - Frases aleatorias de Mochi: *"¡Excelente!", "¡Eres un genio!", "¡Qué gran racha!"*.
  3. **Feedback de Error Amable (Cero Culpa):**
     - Acorde dulce de reintento (sin buzzer estridente).
     - Frases de aliento de Mochi: *"¡Casi! ¡La próxima sale!", "¡Inténtalo otra vez!"*.
  4. **Comodines Clay:**
     - "Bonus Valiente": Fanfarria lúdica de aliento.
     - "Escudo Mágico": Campaneo de burbuja protectora pastel.

---

### 🗺️ FASE 3: Mapa de Mundos y Gamificación
* **Objetivo:** Sensación de viaje y celebración de micro-metas diarias.
* **Inventario de Sonidos:**
  1. **Apertura de Cofre Diario (`sfxChest`):** Cascada mágica de marimba pentatónica y lluvia de estrellas.
  2. **Ambientes por Bioma:**
     - Océano Coralino: Burbujas suaves y olas lejanas.
     - Bosque Matemático: Viento entre hojas y canto suave de pajarillos.
     - Volcán de Gemas: Resonancia de cristales de arcilla.

---

### 🛡️ FASE 4: Puerta Parental y Tienda de Mochi
* **Objetivo:** Distinción clara entre el mundo del niño y la zona de adultos.
* **Inventario de Sonidos:**
  1. **Tienda de Mochi:** Campanilla acogedora de tienda de explorador al equipar un accesorio.
  2. **Parental Gate:** Tono neutro sobrio de desafío para adultos.

---

## 🛠️ PROTOCOLO DE PRODUCCIÓN Y REVISIÓN
En cada fase:
1. El Consejo Asesor lista los audios y frases requeridos en la memoria del Agente Sonido.
2. Se generan o sintetizan los clips bajo los estándares de peso y frecuencia.
3. Se integran al juego y se auditan en conjunto con el USER antes de dar por cerrada la fase.
