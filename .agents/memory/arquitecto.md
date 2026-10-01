# 💾 Memoria: Agente Arquitecto


---
# 🚨 DIRECTIVA GLOBAL: PIVOTE ESTRATÉGICO (Actualización) 🚨
*NOTA PARA EL AGENTE: Lee esto antes de ejecutar cualquier nueva tarea.*

Todo el equipo de agentes debe alinear su trabajo bajo el nuevo "Strategic Pivot":
1. **Scope Reducido (Calidad > Cantidad):** El proyecto se concentra EXCLUSIVAMENTE en el **Tier 1 (6-7 años)**. Los desarrollos y diseños para Tiers 2 y 3 quedan en pausa. El objetivo es lanzar un MVP perfecto para este segmento en un sprint de 4 semanas.
2. **Mercado Objetivo:** "Chile First". Todo el contenido, UI y validaciones están pensados para el mercado chileno como prueba inicial.
3. **Arquitectura:** Somos una **PWA 100% Offline-First**. NO hay backend, NO hay bases de datos en la nube (AWS/Firebase). Esto garantiza cero costos y cumplimiento total con privacidad infantil. Todo vive en `localStorage`.
4. **Diseño Visual:** La app entera (Tier 1) se rige bajo la estética "Clay World" (Claymorphism: 3D táctil, formas amigables y redondeadas). Diseños neon/cósmicos en Tier 1 están obsoletos.
5. **Calidad de Contenido:** Reducimos la carga a 200 preguntas altamente depuradas.

**Cualquier decisión técnica, de diseño o contenido que tomes de ahora en adelante debe respetar estrictamente estos 5 pilares.**

> [!IMPORTANT]
> **PROTOCOLO DE MEMORIA:** Cada vez que completes una tarea o realices un cambio en el código, debes añadir una entrada fechada al final de esta memoria indicando: qué archivo modificaste, qué cambiaste y por qué. Sin excepción.

---

---
# 🏗️ SPRINT CRÍTICO PRE-BETA — Instrucciones del Consultor (2026-06-24)
*Estas tareas deben ejecutarse en orden. No avances a la siguiente sin completar la anterior.*

## TAREA 1 — Declarar `v51_modular.html` como única fuente de verdad ✅ COMPLETADA (2026-06-24)

**Contexto:** Actualmente existen dos versiones activas (`v51_modular.html` en raíz y `v52_modular/v52_modular.html` en subcarpeta). Esto confunde a los agentes y generó múltiples inconsistencias. El v52 carga CSS y assets con rutas relativas que no existen dentro de su carpeta, está técnicamente roto.

**Instrucciones precisas:**
1. **Renombra** la carpeta `v52_modular/` a `_ARCHIVO_v52_modular/` (el prefijo `_ARCHIVO_` la saca del scope activo sin borrarla).
2. **Verifica** que `v51_modular.html` en la raíz carga correctamente en el navegador con live-server.
3. **Actualiza la memoria del Tester** añadiendo: *"El build activo es EXCLUSIVAMENTE `v51_modular.html` en la raíz. Ignorar cualquier referencia a v52."*
4. **No borres** el contenido de v52 — es un checkpoint histórico, solo archívalo.

---

## TAREA 2 — Corregir Service Worker para cachear trivia JSON ✅ COMPLETADA (2026-06-25)

**Contexto:** El archivo `sw.js` NO cachea los archivos de preguntas (`db_6_7.json`, `db_8_10.json`, `db_11_13.json`) ubicados en `assets/data/`. Esto significa que si el niño juega sin internet después del primer uso, las preguntas no cargan. La promesa "100% offline" no es real.

**Instrucciones precisas:**

Abre `sw.js` y localiza el array de precache (donde se listan los archivos a guardar en caché). Debe verse similar a:
```js
const CACHE_NAME = 'reto-panda-v...';
const urlsToCache = [
  './',
  './manifest.json',
  // ...otros archivos
];
```

Añade al array los siguientes archivos **en ese orden exacto**:
```js
'./assets/data/db_6_7.json',
'./assets/data/db_8_10.json',
'./assets/data/db_11_13.json',
```

Además, **incrementa el número de versión** del cache (`CACHE_NAME`) para forzar que el Service Worker se actualice en los navegadores que ya lo tengan instalado. Ejemplo: si era `reto-panda-v3`, cámbialo a `reto-panda-v4`.

Verifica que los 3 archivos `.json` existan físicamente en `assets/data/` antes de confirmar. Según el Consultor, los 3 archivos sí existen (`db_6_7.json`, `db_8_10.json`, `db_11_13.json`).

---

## TAREA 3 (Parte Arquitecto) — Refactorizar `innerHTML` dinámico en `game.js` ✅ COMPLETADA (2026-06-25)

**Contexto:** `game.js` tiene 21 usos de `innerHTML` y solo 4 de `textContent`. El Agente Seguridad fue quien implementó la mitigación parcial anterior. Tu responsabilidad en esta tarea es el archivo `js/game.js`.

**Instrucciones precisas:**

Busca en `game.js` los siguientes 3 puntos de riesgo específicos y sustitúyelos:

1. **`fbExplain`** — El mensaje de explicación del feedback. Si actualmente se inyecta con `innerHTML`, cámbialo a:
   ```js
   fbExplain.textContent = state.currentExplain;
   ```

2. **`state.currentExplain`** — Si se construye con concatenación HTML (ej. `"<b>"+texto+"</b>"`), elimina las etiquetas HTML y usa solo texto plano. El estilo visual se maneja desde CSS, no desde JS.

3. **`qData.m`** (campo de multimedia de la pregunta) — Este campo puede requerir HTML. **Antes de tocarlo**, consulta si `qData.m` contiene únicamente rutas de imágenes (`<img src="...">`) o texto enriquecido real. Si solo son imágenes, reemplaza el `innerHTML` por:
   ```js
   const img = document.createElement('img');
   img.src = qData.m;
   img.alt = 'Imagen de la pregunta';
   contenedor.appendChild(img);
   ```
   Si `qData.m` contiene HTML complejo, márcalo con el comentario `// XSS-ACCEPTED: dato interno, no viene del usuario` y deja nota en la memoria del Agente Seguridad.

**Regla de oro:** Solo se acepta `innerHTML` si el contenido proviene de una constante interna del código (nunca de `localStorage`, `URL params` o input del usuario).

---
*Sprint creado por el Consultor el 2026-06-24. **Todas las tareas completadas el 2026-06-25 por Antigravity (Consultor Externo).**
TAREA 1: carpeta v52 archivada → `_ARCHIVO_v52_modular/`, memoria Tester actualizada.
TAREA 2: `sw.js` actualizado a `reto-panda-v3` con `db_6_7.json`, `db_8_10.json`, `db_11_13.json` en cache.
TAREA 3: `fbExplain` migrado a `.textContent`; `<br>` en mensajes de error reemplazados por `\n` con `white-space:pre-wrap`; `qData.m` marcado XSS-ACCEPTED.*

> [!IMPORTANT]
> **Única Fuente de Verdad del Proyecto:** El archivo HTML activo sobre el cual se trabaja y se ejecuta la aplicación es **`v51_modular.html`**. 
> Cualquier otra variante o carpeta (como `v52_modular` o `v51_circular_backup`) son **únicamente respaldos y checkpoints anteriores y no deben modificarse ni ejecutarse**.

## 🆔 ID de Conversación Actual

`020eaa2f-9c4f-424a-8e21-350c7e03c660`

## ðŸŽ¯ Ãšltimo Objetivo

Finalizar la migraciÃ³n al sistema de diseÃ±o modular Vivid Tiers.

## ðŸ› ï¸� Avances Realizados

- EstabilizaciÃ³n del cÃ³digo base modular (JavaScript).

- OptimizaciÃ³n del bucle de juego, temporizador y gestiÃ³n de estado.
- IntegraciÃ³n verificada con las capas de Contenido y DiseÃ±o.

- CSS modular implementado (variables, base, layout, components, states).
- Sistema `applyAgeTier()` funcionando y vinculado a `refreshHome()` y `saveSettings()`.

## ðŸ“¨ InstrucciÃ³n Activa del Agente DiseÃ±o

> "Â¡Hola Arquitecto! Ya he implementado todo el CSS necesario para la migraciÃ³n a `.webp`.
> Las clases `.question-image-wrapper` con sus variantes de Tier y fallbacks visuales ya estÃ¡n en `css/components.css`.
> Ya puedes comenzar a implementar la lÃ³gica JS (`getQuestionImageSrc` y `getMascotSrc`) bajo la convenciÃ³n de nombres `{id}_{tier}.webp`."

## ðŸ“‹ Pendientes / PrÃ³ximos Pasos

- [x] Eliminar inyecciÃ³n de `theme-light` / `theme-dark` del JS.

- [x] Simplificar `setTheme()` para que solo gestione age-tiers.
- [x] Eliminar referencias a `themeMode` en `profile` (Completado: Ya no existen en v50).

- [x] Verificar que el menÃº de Ajustes no muestre opciones de tema obsoletas (Completado).
- [x] Actualizar `SKILLS_META` para soportar las nuevas categorÃ­as (`ciencias`, `historia`, `ingles`, `lenguaje`).

- [x] AÃ±adir `list-style: none` a `.answers-grid` para prevenir viÃ±etas basura.
- [x] Verificar la integraciÃ³n final de la DB limpia con 3600 preguntas.

---
<em>Actualizado el 2026-05-09</em>

## ðŸš€ InstrucciÃ³n Activa de RefactorizaciÃ³n Modular (Desde Tech Advisor)

Eres el **Agente Arquitecto**. Tenemos un HTML monolÃ­tico crÃ­tico (`presion_mental_v50.html`) de 1MB. Tu nueva misiÃ³n, dividida en etapas, es **Refactorizar el cÃ³digo hacia una arquitectura modular (ES Modules Vanilla JS) sin romper la funcionalidad**.

### Contexto del Proyecto

- Problema: CÃ³digo espagueti. HTML, CSS residual y lÃ³gica JS compleja mezclada.

- **Regla de Seguridad:** Antes de empezar, solicita al dev crear una copia de `presion_mental_v50.html` llamada `v51_modular.html`. Trabajaremos EXCLUSIVAMENTE sobre esta copia para mantener el original a salvo.
- Stack: HTML5, CSS, Vanilla JS. (No usar Node/Vite por ahora, solo `<script type="module">`).

- Resultado esperado: Archivos separados (`index.html`, `/js/store.js`, `/js/ui.js`, `/js/game.js`, `/js/main.js`).

### Flujo de ImplementaciÃ³n (Fases)

El dev humano te guiarÃ¡ o ejecutarÃ¡ estos pasos contigo. No intentes hacer todo en un solo mensaje. Responde iterativamente.

#### Fase 1: ExtracciÃ³n de ConfiguraciÃ³n y Estado Global

- Extrae constantes (THEMES, COLORS, SHOP_ITEMS, WORLDS, SKILLS_META, BADGES, defaultProfile).

- Extrae la variable `profile` y `state`.
- MÃ©telo en un archivo `js/store.js` y expÃ³rtalos (o hazlos globales mediante un objeto `window.APP_STORE` si es mÃ¡s rÃ¡pido para refactorizar).

#### Fase 2: ExtracciÃ³n de LÃ³gica de UI y NavegaciÃ³n

- Mueve funciones como `nav()`, `flash()`, `openBadges()`, `showStats()` a `js/ui.js`.

- Asegura que los eventos del HTML (onClick) sigan funcionando (quizÃ¡s mapeÃ¡ndolos al objeto `window` o aÃ±adiendo EventListeners directamente en el JS).

#### Fase 3: ExtracciÃ³n del Motor del Juego

- Mueve el core loop, misiones y sistema de estrellas a `js/game.js`.

#### Fase 4: Limpieza final

- Dejar el `v50.html` (o crear un nuevo `index.html`) limpio, solo con la estructura de las vistas y las importaciones de `<script type="module" src="js/main.js"></script>`.

### ðŸ“‹ AuditorÃ­a Funcional (v51_modular.html) - BUGS RESUELTOS (2026-05-15)

- [x] **Bug CrÃ­tico 1 (`splashBar`)**: Corregido en `js/ui.js` (lÃ­neas 666 y 672), cambiado `getElementById('splashProgress')` a `getElementById('splashBar')`.

- [x] **Bug CrÃ­tico 2 (Selector Dificultad)**: Corregido en `js/ui.js` (lÃ­nea 365), la funciÃ³n `setDif` usa `querySelectorAll('.t-dif-btn')` para que el CSS aplique el highlight al botÃ³n seleccionado.
- [x] **Bug CrÃ­tico 3 (Script Duplicado)**: Verificado. En `v51_modular.html` solo existe una importaciÃ³n de `js/main.js` al final del body. No hay duplicados.

- [x] **Deuda TÃ©cnica (Dependencias Circulares)**: Refactorizado. Se aÃ±adieron exportaciones explÃ­citas de `sfxCountdown`, `updatePowerupsUI` y `generateQuestion` en `game.js` y sus respectivas importaciones en `ui.js` para asegurar un flujo de dependencias claro y sin usar el global de `window.*`.

### ðŸ“‹ Requerimientos TÃ©cnicos para IntegraciÃ³n (DiseÃ±o/GrÃ¡fico)

- **Arquitectura de Archivos**: Toda nueva funcionalidad debe residir en `/js`, `/css` o `/assets`.

- **InyecciÃ³n de Assets**: El Arquitecto proveerÃ¡ las funciones `getMascotSrc(id)` y `getQuestionImageSrc(id)` que seleccionarÃ¡n automÃ¡ticamente el Tier basado en `playerAge`.

### ðŸš¨ DIRECTIVA CRÃ�TICA (NUEVO ENFOQUE - 2026-05-17)

Por decisiÃ³n de Jefatura de Proyecto, **el lanzamiento inicial se centrarÃ¡ ÃšNICAMENTE en el TIER 1**. Los Tiers 2 y 3 quedan en *standby* para versiones futuras.

**Acciones Requeridas por el Arquitecto:**
- Modificar `v51_modular.html` (o `js/store.js` y `js/ui.js` segÃºn corresponda) para **fijar el sistema visual en Tier 1** independientemente de la edad ingresada (o fijar un fallback automÃ¡tico a Tier 1).
- **Inventario Reducido:** Debes actualizar la constante `SHOP_ITEMS` en `js/store.js` para que solo contenga los siguientes elementos exactos (las imÃ¡genes serÃ¡n provistas externamente, debes preparar la lÃ³gica para consumirlas con prefijos `m_` o similar):
  - **10 Mascotas:** `bear`, `cat`, `dog`, `dragon`, `fox`, `owl`, `panda`, `penguin`, `rabbit`, `capybara`.
  - **3 Accesorios (Sombreros):** `gafas`, `sombrero`, `corona`.
  - **1 Traje Especial (Powerup o Equipamiento):** `super_heroe`.
  - Total: 50 imÃ¡genes (se asume que es la combinaciÃ³n de mascota + accesorio que generarÃ¡ el usuario). Ajusta la lÃ³gica de renderizado en `js/ui.js` y `js/game.js` para soportar esta nueva estructura estÃ¡tica.

### ðŸ›¡ï¸� CORRECCIONES DE AUDITORÃ�A EXTERNA (VALIDADAS)
- **Viewport Seguro:** En `v51_modular.html`, actualiza la etiqueta meta de viewport a: `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">` para evitar zoom accidental en mÃ³viles.
- **Reset CSS Universal:** En `css/base.css` (lÃ­nea 5), actualiza el selector universal para incluir pseudo-elementos: `*, *::before, *::after { box-sizing: border-box; ... }`.
- **Rendimiento Blur:** En `css/base.css`, aÃ±ade el fallback recomendado para `backdrop-filter` para evitar lag en dispositivos Android de gama baja.

### ðŸŒ€ DIRECTIVA DE TRANSICIÃ“N "AGUJERO NEGRO" Y SINCRONIZACIÃ“N JS (NUEVO - 2026-05-20) â€” ðŸŸ¢ LUZ VERDE PARA EJECUCIÃ“N

El USER ha aprobado el plan de transiciÃ³n de Agujero Negro. Tu rol es programar la lÃ³gica del cargador en `js/ui.js` para sincronizar los eventos DOM y clases de animaciÃ³n.

**Instrucciones de Arquitectura:**
1. **SincronizaciÃ³n de Iconos de Mundos:**
   - En `tickSplash`, recupera el paso de carga actual (`s = steps[idx++]`).
   - Busca los elementos HTML de los iconos de mundos (`#sw0` a `#sw4`).
   - Agrega la clase `.active-world` al icono que corresponde al paso actual (`s.w`).
   - Para todos los iconos con Ã­ndice menor a `s.w`, remueve la clase `.active-world` y aÃ±ade `.completed-world`.
   
2. **CoordinaciÃ³n del Colapso y Cambio de Vistas:**
   - En `tickSplash`, cuando la carga llegue al 100% (se completen todos los pasos):
     1. Agrega la clase `.collapsing-portal` al elemento `#splash`.
     2. Agrega la clase `.starfield-warp` al fondo de estrellas para distorsionarlo.
     3. Configura un temporizador `setTimeout` de **900ms** (el punto mÃ¡s denso del colapso de singularidad).
     4. Al cumplirse el timeout:
        - Activa el destello blanco aÃ±adiendo la clase `.flash-active` a `#flashOverlay` (opacidad a 1).
        - Oculta el DOM de `#splash` (`display = 'none'`).
        - Si el perfil de usuario no estÃ¡ completo, muestra el DOM de `#namePopup` (`display = 'flex'`).
        - Agrega la clase `.revealing-portal` a la tarjeta de `#namePopup` para iniciar su expansiÃ³n y giro inverso.
        - Espera un breve intervalo de **50ms** para iniciar la transiciÃ³n de desvanecimiento de `#flashOverlay` de opacidad 1 a 0.
        - Espera **800ms** mÃ¡s y limpia las clases temporales (`.collapsing-portal`, `.revealing-portal`, `.starfield-warp`) para restablecer los estados de hover normales de la interfaz.

---
*Actualizado el 2026-05-20 por Consultor Externo (Antigravity)*

## âœ… COMPLETADO EN SESIÃ“N 2026-05-30

### Layout OpciÃ³n A â€” Home Screen
- [x] Eliminados paneles estÃ¡ticos `#badgesList` y `#missionsList` del Home.
- [x] `circular-menu-wrapper` ahora ocupa el 100% del `home-main-area` â†’ menÃº circular preponderante.
- [x] `--hub-sz` expandido de `450px` â†’ `520px` en `layout.css`.
- [x] BotÃ³n `cb-5` renombrado de "INSIGNIAS" a **"LOGROS"** (ðŸ�†).
- [x] Nuevo overlay combinado `#logrosOverlay` con tabs (Insignias / Misiones).
- [x] Funciones nuevas en `ui.js`: `openLogros()`, `switchLogrosTab()`, alias `openBadges()`.
- [x] ExposiciÃ³n correcta en `window.*` de todas las funciones nuevas.

### Generador de Informe para Padres (Destrezas)
- [x] BotÃ³n "ðŸ“¸ Guardar Informe para Padres" aÃ±adido en `#statsOverlay`.
- [x] FunciÃ³n `generateStatsImage()` implementada en `ui.js`.
  - Dibuja canvas 640Ã—900 con estÃ©tica Clay World (Tier 1).
  - Incluye: nombre, edad, fecha, partidas, precisiÃ³n, racha, estrellas, insignias, misiones, destrezas, Ã¡reas a reforzar.
  - Descarga el archivo como `.png` usando `canvas.toBlob()`.

### Correcciones de Contraste (Tier 1)
- [x] `tier1.css` actualizado: textos legibles en overlay de Logros, Stats y Misiones.
- [x] Referencias DOM a `#badgesList` limpiadas de `applyLang()`.

### Correcciones de AuditorÃ­a TÃ©cnica
- [x] **Viewport seguro y accesible:** `v51_modular.html` actualizado a `width=device-width, initial-scale=1.0, viewport-fit=cover` (removiendo `maximum-scale` y `user-scalable` para cumplir con las validaciones de accesibilidad e IDE).
- [x] **EliminaciÃ³n de Estilos Inline:** Se eliminaron las reglas de estilo en lÃ­nea de las imÃ¡genes de usuario, edad y botÃ³n del popup de bienvenida, moviendo sus clases CSS `.custom-input-icon` y `.custom-btn-icon` a `css/popups.css`.
- [x] **Reset CSS universal:** `css/base.css` actualizado a `*, *::before, *::after`.
- [x] **Fallback backdrop-filter Android:** aÃ±adido en `base.css` con `@supports not`.
- [x] **Agujero Negro:** `tickSplash()` implementado con colapso, warp, flash y reveal de portal.
### Correcciones de AuditorÃ­a TÃ©cnica (2026-05-30)
- [x] **ConfiguraciÃ³n de SHOP_ITEMS (Tienda):** Se trasladÃ³ el accesorio de SÃºper HÃ©roe (`p_super_heroe`) a la categorÃ­a `hats` y se definieron los precios correctos para mascotas y sombreros. Se agregaron los 5 comodines de juego (`pw_freeze`, `pw_skip`, `pw_shield`, `pw_time`, `pw_hint`) con sus precios y emojis correspondientes en la categorÃ­a `powerups`.
- [x] **MigraciÃ³n y Saneamiento de Perfil:** Implementado en `js/store.js` una migraciÃ³n automÃ¡tica de perfiles heredados que traduce IDs antiguos sin prefijo (ej. `panda` -> `m_panda`, `gafas` -> `c_gafas`) a los prefijos correctos. AdemÃ¡s, valida en cada carga que las mascotas y sombreros equipados existan en `SHOP_ITEMS`, previniendo errores de carga y cajas vacÃ­as/imÃ¡genes rotas.
- [x] **Error de undefined% en Destrezas:** Se inicializaron todas las destrezas de `SKILLS_META` (como `ciencias`, `historia`, `ingles`, `lenguaje`) en `defaultProfile.destrezas` a 100. En `js/ui.js` (`showStats`), se aÃ±adiÃ³ un fallback seguro que convierte cualquier valor no numÃ©rico o indefinido en `100` para evitar desbordes visuales.
- [x] **SuperposiciÃ³n de Botones de Sonido:** Se redujo el `z-index` de los botones `#ambientBtn` y `.audio-btn` a `80` en `css/layout.css` para que permanezcan interactivos en todas las pantallas principales pero queden correctamente ocultos detrÃ¡s de cualquier popup o modal overlay (que tienen `z-index: 100` o superior).

## ðŸ“‹ Pendientes Futuros

- [x] **Assets `.webp`:** Confirmado que las imÃ¡genes combinadas de la mascota Panda con accesorios (Gafas, Sombrero, Corona, HÃ©roe) se cargan correctamente en formato `.webp` en la tienda.
- [ ] **QA Manual:** Verificar la descarga de imagen del informe en mÃ³viles iOS/Android.
- [x] **canvas.roundRect polyfill & native fix:** Se verificÃ³ el polyfill y se corrigiÃ³ un bug crÃ­tico de reutilizaciÃ³n de trazado en canvas (llamando a `ctx.beginPath()`) para navegadores con soporte nativo de `roundRect` (Chrome >= 99, etc.).

### ðŸŽµ DIRECTIVA DE AUDIO (HOWLER.JS VS NATIVO) â€” COMPLETADO âœ…
- [x] **Feature Flag (`USE_HOWLER`):** Implementado en `game.js` (lÃ­nea 14) permitiendo activar/desactivar Howler.js dinÃ¡micamente y con fallback automÃ¡tico a sintetizador nativo si falla el CDN.
- [x] **IntegraciÃ³n en HTML:** Inyectado script de Howler.js en `v51_modular.html` desde CDNJS.
- [x] **Carga y Despacho:** Precargados efectos de sonido y configurado el router de despacho condicional en `game.js`.

*Actualizado el 2026-05-30 por el Consultor TÃ©cnico (Antigravity)*

## ðŸ“‹ INSTRUCCIONES PENDIENTES DEL CONSULTOR EXTERNO (2026-05-31)
- [x] **AuditorÃ­a de Carga de Mascota Central:** Verificar por quÃ© no se renderiza la mascota Panda en el centro de la burbuja principal en el Home. Validar que la ruta `assets/mascotas/tier1/m_panda.webp` sea correcta y que el archivo estÃ© en la ubicaciÃ³n fÃ­sica correspondiente del workspace. (Completado: se corrigiÃ³ la duplicaciÃ³n del prefijo 'm_' en `getMascotImagePath` en `ui.js`).


---

## ✅ COMPLETADO EN SESIÓN 2026-05-31 (TARDE)

### Música Ambient MP3 — IMPLEMENTADO
- [x] **Sistema de música de fondo MP3:** Implementado en `js/ui.js` usando `new Audio()` con `assets/audio/menu_music.mp3`.
  - Música **activa por defecto** al cargar el home.
  - Se **detiene automáticamente** al entrar a `game`, `result`, o `countOverlay`.
  - Se **reanuda** al volver a `home`, `setup`, `mapScreen`, `shop`.
  - Botón `#ambientBtn` alterna entre 🎵 (activo) y 🔇 (silenciado).
  - Maneja la política de **autoplay del browser**: si el browser bloquea el audio, se activa en el primer clic/toque del usuario.
  - Archivo MP3 ubicado en: `assets/audio/menu_music.mp3` (ya existía).

### Bugs Corregidos en ui.js
- [x] **BUG #3 — Alias incorrecto `window.toggleAudio`:** Eliminado el alias erróneo `window.toggleAudio = toggleAmbient` de `ui.js`. `window.toggleAudio` lo exporta correctamente `game.js` (controla SFX); `toggleAmbient` solo controla la música de fondo.

### Markup de Fondo Tier 1 — COMPLETADO
- [x] **`#bgClouds` en `v51_modular.html`:** Actualizado con marcos de borde (`bg-cloud-border-top`, `bg-cloud-border-bottom`) y 8 gotitas de arcilla 3D (`clay-drop cd1`–`cd8`). Los estilos CSS correspondientes ya existían en `css/tiers/tier1.css`.

### Estado de BUGs #1 y #2 — VERIFICADOS COMO YA RESUELTOS
- [x] **BUG #1 — `confirmQuit()`:** Ya implementada en `js/db.js` (línea 202). Congela el timer vía `state.frozen = true` (que el loop de `requestAnimationFrame` en `game.js` respeta correctamente) y muestra `#quitConfirmPopup`. Exportada en `window.confirmQuit`. NO requería acción adicional.
- [x] **BUG #2 — `openParentReport()`:** Ya implementada en `js/db.js` (línea 211). Genera HTML completo del reporte con precisión, destrezas, historial semanal, fortalezas y áreas débiles. Exportada en `window.openParentReport`. NO requería acción adicional.

## 📋 Pendientes Futuros

- [ ] **QA Manual:** Verificar la descarga de imagen del informe en móviles iOS/Android.
- [ ] **Assets Interface:** Los siguientes assets del Agente Gráfico están pendientes. El HTML ya tiene fallbacks SVG:
  - `assets/interface/icon_user.webp`
  - `assets/interface/icon_age.webp`
  - `assets/interface/btn_vamos_icon.webp`
  - `assets/interface/onboarding_panda.webp`

---
*Actualizado el 2026-05-31 por el Agente Arquitecto (Antigravity)*


### BUG #1 — confirmQuit() NO EXISTE (PRIORIDAD MÁXIMA)
El botón ? del juego ( 51_modular.html línea 447) llama safeCall('confirmQuit') pero esta función **no está definida en ningún archivo JS**. El jugador queda atrapado dentro de la partida sin poder salir.

**Implementar en js/game.js** (antes del bloque window.* exports):
```
function confirmQuit() {
  if (state.timer) { cancelAnimationFrame(state.timer); clearInterval(state.timer); }
  state.frozen = true;
  document.getElementById('quitStreakVal').innerText = state.streak || 0;
  document.getElementById('quitConfirmPopup').style.display = 'flex';
}
window.confirmQuit = confirmQuit;
```
También añadir confirmQuit a la lista de requeridas del comentario del HTML (línea ~713).

### BUG #2 — openParentReport() NO EXISTE
El botón "Ver Reporte (Padres)" en Ajustes (51_modular.html línea 590) llama safeCall('openParentReport') pero tampoco existe. El botón no hace nada.

**Implementar en js/ui.js** (añadir cerca de showStats()):
```
function openParentReport() {
  const overlay = document.getElementById('parentReportOverlay');
  const content = document.getElementById('parentReportContent');
  if (!overlay || !content) return;
  const acc = profile.stats.answers ? Math.round((profile.stats.correct / profile.stats.answers) * 100) : 0;
  const games = profile.stats.games || 0;
  const stars = profile.score || 0;
  const streak = profile.maxStreak || 0;
  const badges = (profile.badges || []).length;
  const missions = (profile.missions || []).filter(m => m.done).length;
  const worst3 = Object.entries(profile.stats.failsByTag || {})
    .sort((a,b) => b[1]-a[1]).slice(0,3)
    .map(([k,v]) => ${SKILLS_META[k]?.label || k}:  fallos).join(', ') || 'Sin fallos aún';
  content.innerHTML = 
    <div style="line-height:1.8; font-size:15px; padding:10px 0;">
      <p><b>?? Jugador:</b> </p>
      <p><b>?? Fecha:</b> </p>
      <p><b>?? Partidas jugadas:</b> </p>
      <p><b>?? Precisión:</b> %</p>
      <p><b>? Estrellas:</b> </p>
      <p><b>?? Mejor racha:</b> </p>
      <p><b>?? Insignias:</b> /</p>
      <p><b>?? Misiones completadas:</b> </p>
      <p><b>?? Áreas a reforzar:</b> </p>
    </div>;
  overlay.style.display = 'flex';
}
window.openParentReport = openParentReport;
```
Añadir también openParentReport al bloque window.* exports al final de ui.js.

### BUG #3 — window.toggleAudio apunta a 	oggleAmbient (ALIAS INCORRECTO)
El último cambio en ui.js tiene:
```
window.toggleAudio = toggleAmbient;  // alias por si algún handler usa toggleAudio
```
Esto es **incorrecto**: 	oggleAudio es una función diferente definida en game.js que controla los efectos de sonido (SFX). 	oggleAmbient solo controla la música de fondo. Al tocar el botón ??, se silenciaría/activaría la música en lugar de los efectos.
Corregir eliminando ese alias. 	oggleAudio ya es exportado por game.js con window.toggleAudio = toggleAudio;. No añadir un alias redundante e incorrecto en ui.js.

### ?? ASSETS DE INTERFACE — INTEGRAR CUANDO GRÁFICO LOS CREE
Los siguientes 4 assets están pendientes de creación por el Agente Gráfico. Una vez disponibles en ssets/interface/, el HTML ya los referencia correctamente con fallbacks SVG. No requieres cambios en el código, solo confirmar que los archivos existen.
- ssets/interface/icon_user.webp
- ssets/interface/icon_age.webp  
- ssets/interface/btn_vamos_icon.webp
- ssets/interface/onboarding_panda.webp

---
*Actualizado el 2026-05-31 por el Consultor Externo (Antigravity)*

## 🏗️ PORTAL & TRASFONDO TIER 1 - INTEGRACIÓN DOM (2026-05-31) - PENDIENTE DE EJECUCIÓN

El Consultor Externo y el USER han acordado reestructurar estéticamente el Tier 1 (Clay World). El Arquitecto debe coordinar con Diseño para integrar las gotitas de arcilla y los marcos de nubes.

### Tareas en `v51_modular.html`:
1.  **Markup del Fondo `#bgClouds`:**
    Asegurar que el elemento `#bgClouds` contenga el siguiente árbol de nodos:
    ```html
    <div id="bgClouds" class="bg-clouds-layer">
      <!-- Marcos de nubes superior/inferior -->
      <div class="bg-cloud-border-top"></div>
      <div class="bg-cloud-border-bottom"></div>
      
      <!-- Nubes flotantes animadas -->
      <div class="bg-cloud c1"></div>
      <div class="bg-cloud c2"></div>
      <div class="bg-cloud c3"></div>
      <div class="bg-cloud c4"></div>
      <div class="bg-cloud c5"></div>
      <div class="bg-cloud c6"></div>
      
      <!-- Gotitas de arcilla 3D decorativas -->
      <div class="clay-drop cd1"></div>
      <div class="clay-drop cd2"></div>
      <div class="clay-drop cd3"></div>
      <div class="clay-drop cd4"></div>
      <div class="clay-drop cd5"></div>
      <div class="clay-drop cd6"></div>
      <div class="clay-drop cd7"></div>
      <div class="clay-drop cd8"></div>
    </div>
    ```

### Recordatorio de Bugs Pendientes:
*   **BUG #1 (confirmQuit):** Implementar e integrar la salida segura de la partida en `js/game.js`.
*   **BUG #2 (openParentReport):** Implementar la carga y visualización del reporte en `js/ui.js`.
*   **BUG #3 (toggleAudio alias):** Limpiar el alias incorrecto en `js/ui.js`.

---
*Actualizado el 2026-05-31 por el Consultor Externo (Antigravity)*

### Ajuste de Nubes en DOM (2026-06-01):
*   Se eliminaron los marcos de nubes superior/inferior (`.bg-cloud-border-top` y `.bg-cloud-border-bottom`) de `#bgClouds`.
*   Se agregaron los divs de nubes flotantes `.bg-cloud.c7` a `.bg-cloud.c12` en el DOM para mejorar el soporte en tabletas/dispositivos horizontales.

---
*Actualizado el 2026-06-01 por el Consultor Externo (Antigravity)*

---

## 🚨 AUDITORÍA COMPLETA — Bugs Confirmados (2026-06-06)

El Consultor Externo realizó una auditoría exhaustiva de todo el código (HTML, JS, CSS, Assets).  
Los siguientes bugs son **confirmados** y requieren corrección inmediata:

### 🔴 BUG CRÍTICO #1: `confirmQuit` NO IMPLEMENTADA
- **Dónde:** `js/game.js` (no existe la función)
- **Síntoma:** El botón ✕ dentro del juego llama `safeCall('confirmQuit')` → ReferenceError silencioso → el jugador NO puede salir.
- **Fix requerido — agregar en `game.js` antes de los window exports:**
```js
function confirmQuit() {
  document.getElementById('quitStreakVal').textContent = state.streak || 0;
  state.frozen = true;
  document.getElementById('quitConfirmPopup').style.display = 'flex';
}
window.confirmQuit = confirmQuit;
```
- **Notar:** El popup `#quitConfirmPopup` ya existe en el HTML con sus botones "Seguir" y "Salir" correctamente configurados. Solo falta la función que lo abre.

### 🔴 BUG CRÍTICO #2: `openParentReport` NO IMPLEMENTADA
- **Dónde:** `js/ui.js` (no existe la función)
- **Síntoma:** El botón "Ver Reporte (Padres)" en Ajustes llama `safeCall('openParentReport')` → función inexistente → popup `#parentReportOverlay` nunca aparece.
- **Fix requerido — agregar en `ui.js` antes de los window exports:**
```js
function openParentReport() {
  const cont = document.getElementById('parentReportContent');
  if (cont) {
    const acc = profile.stats.answers ? Math.round((profile.stats.correct / profile.stats.answers) * 100) : 0;
    const games = profile.stats.games || 0;
    const stars = profile.score || 0;
    const name = profile.playerName || localStorage.getItem('pm_playerName') || 'Jugador';
    const worst3 = Object.entries(profile.stats.failsByTag || {})
      .sort((a,b) => b[1]-a[1]).slice(0,3)
      .map(([k,v]) => `${SKILLS_META[k]?.label || k} (${v} fallos)`).join(', ') || 'Sin fallos registrados';
    cont.innerHTML = `
      <div style="text-align:center;margin-bottom:16px;">
        <div style="font-size:40px;">🐼</div>
        <h3 style="margin:8px 0;">${name}</h3>
      </div>
      <div class="stat-row"><span>🎮 Partidas jugadas:</span><strong>${games}</strong></div>
      <div class="stat-row"><span>🎯 Precisión global:</span><strong>${acc}%</strong></div>
      <div class="stat-row"><span>⭐ Estrellas totales:</span><strong>${stars}</strong></div>
      <div class="stat-row"><span>🔥 Racha máxima:</span><strong>${profile.maxStreak || 0}</strong></div>
      <div class="stat-row"><span>🧠 Áreas a reforzar:</span><strong>${worst3}</strong></div>
      <hr style="margin:16px 0;opacity:0.3;">
      <p style="font-size:13px;text-align:center;opacity:0.7;">Para ver el informe completo como imagen, ir a la sección Destrezas → Guardar Informe.</p>
    `;
  }
  document.getElementById('parentReportOverlay').style.display = 'flex';
}
window.openParentReport = openParentReport;
```

### 🟠 BUG MEDIO #3: `sfxWrong` usada en `ui.js` sin importar
- **Dónde:** `js/ui.js`, función `startMapLevel()`, línea que contiene `sfxWrong()`
- **Síntoma:** Cuando el usuario intenta entrar a un nivel bloqueado → `ReferenceError: sfxWrong is not defined`
- **Fix requerido — cambiar la línea de import en ui.js:**
```js
// ANTES:
import { generateQuestion, sfxCountdown, updatePowerupsUI } from './game.js';
// DESPUÉS:
import { generateQuestion, sfxCountdown, updatePowerupsUI, sfxWrong } from './game.js';
```
- **Además:** En `game.js`, agregar `sfxWrong` a los exports del módulo:
```js
// Al final de game.js, en el export:
export { generateQuestion, sfxCountdown, updatePowerupsUI, sfxWrong };
```

### 🟠 BUG MEDIO #4: `applyAccessory` comentada — los sombreros no se ven
- **Dónde:** 5 lugares en `game.js` y `ui.js`
- **Síntoma:** Todos los jugadores con sombrero equipado no lo ven renderizado en ninguna pantalla.
- **Fix requerido — descomentar estas líneas (buscar y quitar el `//`):**
  - `ui.js` ~línea 454: `// try { applyAccessory(document.getElementById('homeHat'), ...)`
  - `game.js` ~línea 22: `// applyAccessory(document.getElementById('mascotHat'), ...)`
  - `game.js` ~línea 229: `// applyAccessory(document.getElementById('resHat'), ...)`
  - `game.js` ~línea 243: (segunda aparición de resHat en levelComplete)
  - `game.js` ~línea 260: `// applyAccessory(document.getElementById('previewHat'), ...)`

### 🟡 MEJORA #5: Inputs de Settings sin label de accesibilidad
- **Dónde:** `v51_modular.html`, dentro de `#settingsOverlay`, ~líneas 612-616
- **Fix requerido — agregar labels:** 
```html
<!-- ANTES -->
<input type="text" id="setNameInput" ...>
<input type="number" id="setAgeInput" ...>

<!-- DESPUÉS -->
<label for="setNameInput" class="sr-only">Nombre del jugador</label>
<input type="text" id="setNameInput" ...>
<label for="setAgeInput" class="sr-only">Edad del jugador</label>
<input type="number" id="setAgeInput" ...>
```
(y agregar `.sr-only { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0,0,0,0); }` en base.css)

### 🟡 MEJORA #6: Crear `manifest.json` y `<link favicon>`
- La app no es instalable como PWA (falta manifest.json y service worker).
- Mínimo: crear `manifest.json` y agregar `<meta description>` + `<link rel="icon">` al HTML.

---
*Auditoría registrada el 2026-06-06 por el Consultor Externo (Antigravity)*

---

## 🛡️ DIAGNÓSTICO DE SEGURIDAD (PANDA-SHIELD) — 2026-06-06

El equipo de seguridad ha detectado los siguientes puntos que el Agente Arquitecto debe resolver o tener en cuenta de inmediato:

### 🚨 VULNERABILIDAD CRÍTICA (XSS) — Acción Inmediata Requerida
- **Problema:** En `js/ui.js` y posiblemente en otros módulos, se está inyectando el valor de `profile.playerName` usando la propiedad `.innerHTML`. Dado que este valor proviene del input del usuario (o `localStorage`), esto abre la puerta a ataques de Cross-Site Scripting (XSS).
- **Directiva:** Busca TODAS las instancias donde se renderice el nombre del jugador (por ejemplo: en el popup de Bienvenida, en el menú de Logros, en el Reporte para Padres) y reemplaza la asignación a `.innerHTML` por **`.textContent`** o **`.innerText`** de manera obligatoria y urgente.
- **Ejemplo del fix a implementar:**
  ```javascript
  // ❌ PELIGROSO:
  document.getElementById('playerNameDisplay').innerHTML = profile.playerName;
  
  // ✅ SEGURO:
  document.getElementById('playerNameDisplay').textContent = profile.playerName;
  ```

### ℹ️ Riesgos Asumidos por Arquitectura (By Design)
- **Manipulación de LocalStorage (Zero Trust):** Al ser una app local (PWA) sin backend, todo el progreso se almacena en el cliente (`pm_profile_v5`). El riesgo de que un usuario manipule sus estadísticas manualmente es **aceptado** para la versión 1.0 offline.
- **Exposición de Respuestas (`db.js`):** Las respuestas se validan localmente y están en texto plano. Riesgo **aceptado**. Si a futuro se decide escalar la app a la nube o hacerla competitiva online, esto deberá moverse forzosamente a una base de datos en un servidor backend con validación server-side.

### 🔐 TAREAS DE REMEDIACIÓN ADICIONALES (PANDA-SHIELD)
1. **Protección Básica contra Manipulación de LocalStorage (SEC-02):**
   - **Dónde:** `js/store.js` (Funciones `saveSettings` o donde se guarde `pm_profile_v5`).
   - **Acción:** Implementar un mecanismo simple de ofuscación o Checksum/Hash local (ej. Base64 o firma HMAC básica) antes de guardar en `localStorage`, y verificar dicha firma al cargar. Si el hash no coincide (indicio de trampa o manipulación manual), reiniciar las estrellas a un valor seguro o mostrar advertencia.

2. **Validación de Entradas en el Perfil (SEC-04):**
   - **Dónde:** `v51_modular.html` y `js/ui.js`.
   - **Acción:** Agregar atributo `pattern="[A-Za-z0-9 ]+"` en los campos de input del nombre (`#setNameInput`, `#welcomeNameInput`) y limpiar la cadena en la función que guarda el perfil, eliminando cualquier caracter que no sea alfanumérico.




### 🛡️ CORRECCIONES DE SEGURIDAD APLICADAS (2026-06-06)
- [x] **Vulnerabilidad Crítica XSS Resuelta:** Se eliminó la inyección por innerHTML del nombre del jugador en ui.js, utilizando 	extContent en su lugar.
- [x] **Protección contra manipulación (SEC-02):** Implementada función generateHash en store.js para crear una firma en localStorage ('pm_profile_v5_hash'). Si se detecta un cambio manual en el JSON sin su correspondiente firma, el puntaje de estrellas se restablece a 0 automáticamente para penalizar trampas.
- [x] **Sanitización de Perfil (SEC-04):** Añadido patrón a los inputs en 51_modular.html y aplicado regex en ui.js y game.js para truncar cualquier caracter especial del nombre ingresado antes del guardado.


---

## Directiva de Limpieza de Texto - Auditoria Contenido (2026-06-20)

**Origen:** Auditoria ortografica del Tier 1 realizada por el Consultor Externo.

### Problema detectado
Muchas preguntas del banco de datos tienen anotaciones descriptivas de imagen pegadas al final del texto de la pregunta, entre parentesis. Ejemplo:

    Cual es el animal que come con las patas? (Dibujo de un pato nadando en un estanque)

Si el texto se renderiza tal cual en pantalla, el nino leera (Dibujo de un pato...) como parte de la pregunta. Esto es incorrecto.

### Fix requerido - Sanitizacion en js/db.js

En la funcion que genera o retorna el texto de la pregunta, antes de asignarlo al DOM, aplica el siguiente regex para eliminar las anotaciones parenteticas:

`javascript
// Limpia las notas de imagen entre parentesis del texto de la pregunta
function cleanQuestionText(rawText) {
  return rawText.replace(/\s*\((?:Dibujo|Imagen)[^)]*\)/gi, \'\').trim();
}
`

Donde aplicarlo: Justo antes de asignar el texto al elemento DOM de la pregunta:

`javascript
// Incorrecto:
questionEl.textContent = q.text;

// Correcto:
questionEl.textContent = cleanQuestionText(q.text);
`

> Nota: Esta funcion solo afecta la visualizacion; el texto original en db.js / .md no se modifica.

---
*Directiva registrada el 2026-06-20 por el Consultor Externo (Antigravity) - Auditoria de Contenido Tier 1*

## 🚨 BUG CRÍTICO REPORTADO POR QA TESTER (2026-06-20)
**BUG-001: countOverlay.showModal is not a function**
- **Descripción:** Al iniciar el Modo Libre (T-04), el juego crashea en consola porque `ui.js` intenta invocar `.showModal()` sobre `countOverlay`, pero este elemento sigue siendo un `<div>` y no fue migrado a `<dialog>`.
- **Instrucción de Resolución (INMEDIATA):**
  1. Busca el elemento `<div id="countOverlay">` en el HTML (`v51_modular.html` y/o la copia en la carpeta `v52_modular/v52_modular.html`).
  2. Cámbialo por `<dialog id="countOverlay" class="popup-overlay z-index-310">` (o mantén sus clases originales pero como dialog).
  3. Asegúrate de que `ui.js` en la función de la cuenta regresiva cierre el popup con `.close()` en lugar de `style.display = 'none'`.
- ✅ **ESTADO (2026-06-20): RESUELTO.** Se actualizó `<div id="countOverlay">` a `<dialog id="countOverlay" class="popup-overlay z-index-110">` en `v51_modular.html` y `v52_modular/v52_modular.html`. Se corrigió también `v52_modular/js/ui.js` para usar `showModal()` y `close()`.

## 🚨 BUG-002 REPORTADO POR QA TESTER (2026-06-20)
**BUG-002: feedbackOverlay.showModal is not a function**
- **Descripción:** El elemento `<div id="feedbackOverlay">` no fue migrado a `<dialog>` durante el sprint de seguridad. El código en `game.js` intenta llamar `.showModal()` tras cada respuesta del jugador, provocando un crash silencioso que congela el juego.
- **Instrucción de Resolución (INMEDIATA):**
  1. En `v51_modular.html`, línea del `<div id="feedbackOverlay">`: cambiar a `<dialog id="feedbackOverlay">` (mantener sus clases existentes).
  2. Hacer lo mismo en `v52_modular/v52_modular.html`.
  3. Verificar en `game.js` que la función que controla el feedback ya use `.showModal()` y `.close()` (si aún usa `style.display`, actualizar también).
- ✅ **ESTADO (2026-06-20): RESUELTO.** `<div id="feedbackOverlay">` migrado a `<dialog class="feedback-dialog">` en `v51` y `v52`. CSS de `game.css` actualizado para suprimir `display:none/flex` y usar selector `[open]`. `showFeedback()` en `game.js` ya era correcto (usaba `.showModal()` y `.close()`).

---

## 🚀 NUEVO SPRINT: OPTIMIZACIÓN Y ACCESIBILIDAD (2026-06-22)

**Origen:** Auditoría Externa 2026 / Aprobado por el USER y Consultor.
**Prioridad:** ALTA.

**Objetivo del Arquitecto:** Implementar las recomendaciones clave de rendimiento y accesibilidad antes de considerar la app lista para producción masiva.

### 1. Implementación de CSP Headers (Seguridad)
- **Dónde:** En el `<head>` de `v51_modular.html` (o `v52_modular.html` si es el activo).
- **Acción:** Agregar la política `<meta http-equiv="Content-Security-Policy" content="...">` para blindar la carga de recursos. Asegúrate de permitir scripts locales y los CDNs externos que ya utilizamos (como Howler.js).

### 2. Rendimiento: Carga Diferida (Lazy-Load) de Preguntas
- **Dónde:** Archivo `js/db.js` y estructura de base de datos.
- **Problema:** Actualmente se importa sincrónicamente todo el bloque de preguntas (un JSON de ~1.4MB), penalizando fuertemente el "Time to Interactive" (TTI) de la PWA.
- **Acción a implementar:** Refactorizar el acceso a las preguntas. En lugar de tener todo en memoria desde el milisegundo 0, implementa un sistema donde `db.js` haga un `fetch` bajo demanda (o una importación dinámica) del bloque de preguntas *solamente para la edad/tier actual del jugador* justo antes de iniciar una partida o en segundo plano tras cargar el menú inicial.

### 3. Accesibilidad Básica (A11y)
- **Dónde:** HTML y CSS (`base.css` / `components.css`).
- **Acciones:**
  1. **ARIA Labels:** Asegurar que todo elemento interactivo (especialmente los botones circulares que solo tienen emojis/iconos) posea un atributo `aria-label` descriptivo.
  2. **Navegación por Teclado:** Añadir en el CSS una regla global para `*:focus-visible` que muestre un contorno visible (`outline`) para usuarios que navegan con el teclado.
  3. *(Coordinar con Diseño)*: Integrar soporte básico para `@media (prefers-reduced-motion: reduce)` anulando las animaciones infinitas para usuarios con sensibilidad al movimiento.

---

## 🚨 BUG-003 REPORTADO POR QA TESTER (2026-06-24)
**BUG-003: HTML crudo visible en pantalla de Ajustes (Configuración)**
- **Severidad:** ALTA — Visible para el usuario final.
- **Pasos para reproducir:**
  1. Iniciar la app y completar el onboarding.
  2. Desde el menú principal, hacer click en el botón "AJUSTES" (⚙️).
  3. Observar la sección de perfil.
- **Resultado Observado:** El campo de nombre muestra texto literal: `placeholder="Nombre" maxlength="12" autocomplete="off">` en pantalla, en lugar de un `<input>` editable.
- **Causa probable:** Un bloque `innerHTML` en `ui.js` que construye la pantalla de Ajustes está generando el HTML del `<input>` incorrectamente — probablemente un error de comillas, cierre de tag o interpolación de template literal defectuosa. El elemento `<input>` no se está cerrando correctamente y el parser lo trata como texto.
- **Instrucción de Resolución (INMEDIATA):**
  1. Busca en `js/ui.js` la función que renderiza la pantalla `#settings` o `#ajustes` (puede llamarse `navSettings`, `renderSettings`, `openSettings` o similar).
  2. Inspecciona el template literal del `<input id="setNameInput">` — verifica que el tag esté correctamente cerrado y que no haya comillas sin escapar que rompan el string.
  3. Alternativa: Si el input se genera dinámicamente, reemplázalo por un `document.createElement('input')` para evitar errores de parseo de HTML.
  4. **Estado:** ✅ RESUELTO (2026-06-25) — Se eliminó un `>` erróneo en el `<input id="setNameInput">` en `v51_modular.html` (Línea 595) que causaba que los atributos siguientes se renderizaran como texto plano.

---

## 🚨 BUG-004 REPORTADO POR QA TESTER (Playwright) — 2026-06-25
**BUG-004: Sanitización de perfil agresiva elimina acentos en nombres en español**
- **Severidad:** ALTA — Corrupción de datos ingresados por el usuario.
- **Descripción:** Durante la ejecución automatizada de Playwright, se ingresó el nombre "María". Al guardarse y renderizarse en el Home, el sistema devolvió "Mara".
- **Causa probable:** La medida de seguridad (SEC-04) implementada previamente introdujo un Regex muy restrictivo (`/[^A-Za-z0-9 ]/g` o similar) o un atributo `pattern="[A-Za-z0-9 ]+"` en el HTML, el cual no soporta caracteres propios del español (á, é, í, ó, ú, ñ, ü).
- **Instrucción de Resolución (INMEDIATA):**
  1. En `v51_modular.html`, localiza los inputs de nombre (`#nameInput`, `#setNameInput`) y actualiza el atributo `pattern` para soportar acentos: `pattern="[A-Za-z0-9 áéíóúÁÉÍÓÚñÑüÜ]+"`
  2. En `js/ui.js` o `js/store.js` (donde se aplique la limpieza de la variable antes de guardar), ajusta la expresión regular para ignorar caracteres latinos válidos.
- **Estado:** ✅ RESUELTO (2026-06-25) — Se ampliaron las regex y patterns HTML en `v51_modular.html`, `js/ui.js` y `js/game.js` para permitir `áéíóúÁÉÍÓÚñÑüÜ`.

---

## 🚀 TAREAS ESTRATÉGICAS DE INNOVACIÓN TÉCNICA (Informe Comparativo 2025-2026)
*Instrucciones asignadas por el Consultor Externo (2026-06-27)*

1. **Algoritmo de Repetición Espaciada / HLR Simplificado (`store.js` / `db.js`):**
   - Diseñar una estructura liviana en `localStorage` que registre el histórico de aciertos y fallos por categoría de pregunta.
   - Modificar el selector de preguntas en `game.js` para aumentar la probabilidad de reaparición de conceptos fallados previamente (Mastery Learning).
2. **Infraestructura de Comodines de Riesgo (Tienda y Game Loop):**
   - Planificar el soporte en `store.js` para ítems consumibles avanzados: *Escudo de Racha* (evita perder racha ante un fallo) y *Doble o Nada* (multiplicador voluntario de estrellas).
3. **Módulo Co-Creación Offline "KitCollab" (Fase Futura):**
   - Diseñar la arquitectura para permitir que docentes puedan importar/exportar mazos de preguntas locales mediante formato JSON o código QR sin depender de backend/nube.

 # #   =���  R e g i s t r o   C r u z a d o   ( A g e n t e   C o n t e n i d o )   -   2 0 2 6 - 0 6 - 2 7 
 -   * * E t i q u e t a d o   O A   y   F e e d b a c k   P o s i t i v o * * :   S e   i n y e c t a r o n   e t i q u e t a s   \ o a \   e n   \ d b _ 6 _ 7 . j s o n \   y   s e   a j u s t a r o n   l o s   s t r i n g s   d e   f e e d b a c k   m o t i v a c i o n a l   e n   \ u i . j s \   ( l � n e a s   7 1 2 ,   7 3 3 ) ,   \ g a m e . j s \   ( l � n e a   3 0 ,   1 5 7 )   y   \ d b . j s \   ( l � n e a   2 7 3 )   c u m p l i e n d o   l o s   l i n e a m i e n t o s   p s i c o p e d a g � g i c o s .  
 