# ðŸ’¾ Memoria: Agente Arquitecto


---
# ðŸš¨ DIRECTIVA GLOBAL: PIVOTE ESTRATÃ‰GICO (ActualizaciÃ³n) ðŸš¨
*NOTA PARA EL AGENTE: Lee esto antes de ejecutar cualquier nueva tarea.*

Todo el equipo de agentes debe alinear su trabajo bajo el nuevo "Strategic Pivot":
1. **Scope Reducido (Calidad > Cantidad):** El proyecto se concentra EXCLUSIVAMENTE en el **Tier 1 (6-7 aÃ±os)**. Los desarrollos y diseÃ±os para Tiers 2 y 3 quedan en pausa. El objetivo es lanzar un MVP perfecto para este segmento en un sprint de 4 semanas.
2. **Mercado Objetivo:** "Chile First". Todo el contenido, UI y validaciones estÃ¡n pensados para el mercado chileno como prueba inicial.
3. **Arquitectura:** Somos una **PWA 100% Offline-First**. NO hay backend, NO hay bases de datos en la nube (AWS/Firebase). Esto garantiza cero costos y cumplimiento total con privacidad infantil. Todo vive en `localStorage`.
4. **DiseÃ±o Visual:** La app entera (Tier 1) se rige bajo la estÃ©tica "Clay World" (Claymorphism: 3D tÃ¡ctil, formas amigables y redondeadas). DiseÃ±os neon/cÃ³smicos en Tier 1 estÃ¡n obsoletos.
5. **Calidad de Contenido:** Reducimos la carga a 200 preguntas altamente depuradas.

**Cualquier decisiÃ³n tÃ©cnica, de diseÃ±o o contenido que tomes de ahora en adelante debe respetar estrictamente estos 5 pilares.**

> [!IMPORTANT]
> **PROTOCOLO DE MEMORIA:** Cada vez que completes una tarea o realices un cambio en el cÃ³digo, debes aÃ±adir una entrada fechada al final de esta memoria indicando: quÃ© archivo modificaste, quÃ© cambiaste y por quÃ©. Sin excepciÃ³n.

---

---
# ðŸ�—ï¸� SPRINT CRÃ�TICO PRE-BETA â€” Instrucciones del Consultor (2026-06-24)
*Estas tareas deben ejecutarse en orden. No avances a la siguiente sin completar la anterior.*

## TAREA 1 â€” Declarar `v51_modular.html` como Ãºnica fuente de verdad âœ… COMPLETADA (2026-06-24)

**Contexto:** Actualmente existen dos versiones activas (`v51_modular.html` en raÃ­z y `v52_modular/v52_modular.html` en subcarpeta). Esto confunde a los agentes y generÃ³ mÃºltiples inconsistencias. El v52 carga CSS y assets con rutas relativas que no existen dentro de su carpeta, estÃ¡ tÃ©cnicamente roto.

**Instrucciones precisas:**
1. **Renombra** la carpeta `v52_modular/` a `_ARCHIVO_v52_modular/` (el prefijo `_ARCHIVO_` la saca del scope activo sin borrarla).
2. **Verifica** que `v51_modular.html` en la raÃ­z carga correctamente en el navegador con live-server.
3. **Actualiza la memoria del Tester** aÃ±adiendo: *"El build activo es EXCLUSIVAMENTE `v51_modular.html` en la raÃ­z. Ignorar cualquier referencia a v52."*
4. **No borres** el contenido de v52 â€” es un checkpoint histÃ³rico, solo archÃ­valo.

---

## TAREA 2 â€” Corregir Service Worker para cachear trivia JSON âœ… COMPLETADA (2026-06-25)

**Contexto:** El archivo `sw.js` NO cachea los archivos de preguntas (`db_6_7.json`, `db_8_10.json`, `db_11_13.json`) ubicados en `assets/data/`. Esto significa que si el niÃ±o juega sin internet despuÃ©s del primer uso, las preguntas no cargan. La promesa "100% offline" no es real.

**Instrucciones precisas:**

Abre `sw.js` y localiza el array de precache (donde se listan los archivos a guardar en cachÃ©). Debe verse similar a:
```js
const CACHE_NAME = 'reto-panda-v...';
const urlsToCache = [
  './',
  './manifest.json',
  // ...otros archivos
];
```

AÃ±ade al array los siguientes archivos **en ese orden exacto**:
```js
'./assets/data/db_6_7.json',
'./assets/data/db_8_10.json',
'./assets/data/db_11_13.json',
```

AdemÃ¡s, **incrementa el nÃºmero de versiÃ³n** del cache (`CACHE_NAME`) para forzar que el Service Worker se actualice en los navegadores que ya lo tengan instalado. Ejemplo: si era `reto-panda-v3`, cÃ¡mbialo a `reto-panda-v4`.

Verifica que los 3 archivos `.json` existan fÃ­sicamente en `assets/data/` antes de confirmar. SegÃºn el Consultor, los 3 archivos sÃ­ existen (`db_6_7.json`, `db_8_10.json`, `db_11_13.json`).

---

## TAREA 3 (Parte Arquitecto) â€” Refactorizar `innerHTML` dinÃ¡mico en `game.js` âœ… COMPLETADA (2026-06-25)

**Contexto:** `game.js` tiene 21 usos de `innerHTML` y solo 4 de `textContent`. El Agente Seguridad fue quien implementÃ³ la mitigaciÃ³n parcial anterior. Tu responsabilidad en esta tarea es el archivo `js/game.js`.

**Instrucciones precisas:**

Busca en `game.js` los siguientes 3 puntos de riesgo especÃ­ficos y sustitÃºyelos:

1. **`fbExplain`** â€” El mensaje de explicaciÃ³n del feedback. Si actualmente se inyecta con `innerHTML`, cÃ¡mbialo a:
   ```js
   fbExplain.textContent = state.currentExplain;
   ```

2. **`state.currentExplain`** â€” Si se construye con concatenaciÃ³n HTML (ej. `"<b>"+texto+"</b>"`), elimina las etiquetas HTML y usa solo texto plano. El estilo visual se maneja desde CSS, no desde JS.

3. **`qData.m`** (campo de multimedia de la pregunta) â€” Este campo puede requerir HTML. **Antes de tocarlo**, consulta si `qData.m` contiene Ãºnicamente rutas de imÃ¡genes (`<img src="...">`) o texto enriquecido real. Si solo son imÃ¡genes, reemplaza el `innerHTML` por:
   ```js
   const img = document.createElement('img');
   img.src = qData.m;
   img.alt = 'Imagen de la pregunta';
   contenedor.appendChild(img);
   ```
   Si `qData.m` contiene HTML complejo, mÃ¡rcalo con el comentario `// XSS-ACCEPTED: dato interno, no viene del usuario` y deja nota en la memoria del Agente Seguridad.

**Regla de oro:** Solo se acepta `innerHTML` si el contenido proviene de una constante interna del cÃ³digo (nunca de `localStorage`, `URL params` o input del usuario).

---
*Sprint creado por el Consultor el 2026-06-24. **Todas las tareas completadas el 2026-06-25 por Antigravity (Consultor Externo).**
TAREA 1: carpeta v52 archivada â†’ `_ARCHIVO_v52_modular/`, memoria Tester actualizada.
TAREA 2: `sw.js` actualizado a `reto-panda-v3` con `db_6_7.json`, `db_8_10.json`, `db_11_13.json` en cache.
TAREA 3: `fbExplain` migrado a `.textContent`; `<br>` en mensajes de error reemplazados por `\n` con `white-space:pre-wrap`; `qData.m` marcado XSS-ACCEPTED.*

> [!IMPORTANT]
> **Ãšnica Fuente de Verdad del Proyecto:** El archivo HTML activo sobre el cual se trabaja y se ejecuta la aplicaciÃ³n es **`v51_modular.html`**. 
> Cualquier otra variante o carpeta (como `v52_modular` o `v51_circular_backup`) son **Ãºnicamente respaldos y checkpoints anteriores y no deben modificarse ni ejecutarse**.

## ðŸ†” ID de ConversaciÃ³n Actual

`020eaa2f-9c4f-424a-8e21-350c7e03c660`

## Ã°Å¸Å½Â¯ ÃƒÅ¡ltimo Objetivo

Finalizar la migraciÃƒÂ³n al sistema de diseÃƒÂ±o modular Vivid Tiers.

## Ã°Å¸â€ºÂ Ã¯Â¸ï¿½ Avances Realizados

- EstabilizaciÃƒÂ³n del cÃƒÂ³digo base modular (JavaScript).

- OptimizaciÃƒÂ³n del bucle de juego, temporizador y gestiÃƒÂ³n de estado.
- IntegraciÃƒÂ³n verificada con las capas de Contenido y DiseÃƒÂ±o.

- CSS modular implementado (variables, base, layout, components, states).
- Sistema `applyAgeTier()` funcionando y vinculado a `refreshHome()` y `saveSettings()`.

## Ã°Å¸â€œÂ¨ InstrucciÃƒÂ³n Activa del Agente DiseÃƒÂ±o

> "Ã‚Â¡Hola Arquitecto! Ya he implementado todo el CSS necesario para la migraciÃƒÂ³n a `.webp`.
> Las clases `.question-image-wrapper` con sus variantes de Tier y fallbacks visuales ya estÃƒÂ¡n en `css/components.css`.
> Ya puedes comenzar a implementar la lÃƒÂ³gica JS (`getQuestionImageSrc` y `getMascotSrc`) bajo la convenciÃƒÂ³n de nombres `{id}_{tier}.webp`."

## Ã°Å¸â€œâ€¹ Pendientes / PrÃƒÂ³ximos Pasos

- [x] Eliminar inyecciÃƒÂ³n de `theme-light` / `theme-dark` del JS.

- [x] Simplificar `setTheme()` para que solo gestione age-tiers.
- [x] Eliminar referencias a `themeMode` en `profile` (Completado: Ya no existen en v50).

- [x] Verificar que el menÃƒÂº de Ajustes no muestre opciones de tema obsoletas (Completado).
- [x] Actualizar `SKILLS_META` para soportar las nuevas categorÃƒÂ­as (`ciencias`, `historia`, `ingles`, `lenguaje`).

- [x] AÃƒÂ±adir `list-style: none` a `.answers-grid` para prevenir viÃƒÂ±etas basura.
- [x] Verificar la integraciÃƒÂ³n final de la DB limpia con 3600 preguntas.

---
<em>Actualizado el 2026-05-09</em>

## Ã°Å¸Å¡â‚¬ InstrucciÃƒÂ³n Activa de RefactorizaciÃƒÂ³n Modular (Desde Tech Advisor)

Eres el **Agente Arquitecto**. Tenemos un HTML monolÃƒÂ­tico crÃƒÂ­tico (`presion_mental_v50.html`) de 1MB. Tu nueva misiÃƒÂ³n, dividida en etapas, es **Refactorizar el cÃƒÂ³digo hacia una arquitectura modular (ES Modules Vanilla JS) sin romper la funcionalidad**.

### Contexto del Proyecto

- Problema: CÃƒÂ³digo espagueti. HTML, CSS residual y lÃƒÂ³gica JS compleja mezclada.

- **Regla de Seguridad:** Antes de empezar, solicita al dev crear una copia de `presion_mental_v50.html` llamada `v51_modular.html`. Trabajaremos EXCLUSIVAMENTE sobre esta copia para mantener el original a salvo.
- Stack: HTML5, CSS, Vanilla JS. (No usar Node/Vite por ahora, solo `<script type="module">`).

- Resultado esperado: Archivos separados (`index.html`, `/js/store.js`, `/js/ui.js`, `/js/game.js`, `/js/main.js`).

### Flujo de ImplementaciÃƒÂ³n (Fases)

El dev humano te guiarÃƒÂ¡ o ejecutarÃƒÂ¡ estos pasos contigo. No intentes hacer todo en un solo mensaje. Responde iterativamente.

#### Fase 1: ExtracciÃƒÂ³n de ConfiguraciÃƒÂ³n y Estado Global

- Extrae constantes (THEMES, COLORS, SHOP_ITEMS, WORLDS, SKILLS_META, BADGES, defaultProfile).

- Extrae la variable `profile` y `state`.
- MÃƒÂ©telo en un archivo `js/store.js` y expÃƒÂ³rtalos (o hazlos globales mediante un objeto `window.APP_STORE` si es mÃƒÂ¡s rÃƒÂ¡pido para refactorizar).

#### Fase 2: ExtracciÃƒÂ³n de LÃƒÂ³gica de UI y NavegaciÃƒÂ³n

- Mueve funciones como `nav()`, `flash()`, `openBadges()`, `showStats()` a `js/ui.js`.

- Asegura que los eventos del HTML (onClick) sigan funcionando (quizÃƒÂ¡s mapeÃƒÂ¡ndolos al objeto `window` o aÃƒÂ±adiendo EventListeners directamente en el JS).

#### Fase 3: ExtracciÃƒÂ³n del Motor del Juego

- Mueve el core loop, misiones y sistema de estrellas a `js/game.js`.

#### Fase 4: Limpieza final

- Dejar el `v50.html` (o crear un nuevo `index.html`) limpio, solo con la estructura de las vistas y las importaciones de `<script type="module" src="js/main.js"></script>`.

### Ã°Å¸â€œâ€¹ AuditorÃƒÂ­a Funcional (v51_modular.html) - BUGS RESUELTOS (2026-05-15)

- [x] **Bug CrÃƒÂ­tico 1 (`splashBar`)**: Corregido en `js/ui.js` (lÃƒÂ­neas 666 y 672), cambiado `getElementById('splashProgress')` a `getElementById('splashBar')`.

- [x] **Bug CrÃƒÂ­tico 2 (Selector Dificultad)**: Corregido en `js/ui.js` (lÃƒÂ­nea 365), la funciÃƒÂ³n `setDif` usa `querySelectorAll('.t-dif-btn')` para que el CSS aplique el highlight al botÃƒÂ³n seleccionado.
- [x] **Bug CrÃƒÂ­tico 3 (Script Duplicado)**: Verificado. En `v51_modular.html` solo existe una importaciÃƒÂ³n de `js/main.js` al final del body. No hay duplicados.

- [x] **Deuda TÃƒÂ©cnica (Dependencias Circulares)**: Refactorizado. Se aÃƒÂ±adieron exportaciones explÃƒÂ­citas de `sfxCountdown`, `updatePowerupsUI` y `generateQuestion` en `game.js` y sus respectivas importaciones en `ui.js` para asegurar un flujo de dependencias claro y sin usar el global de `window.*`.

### Ã°Å¸â€œâ€¹ Requerimientos TÃƒÂ©cnicos para IntegraciÃƒÂ³n (DiseÃƒÂ±o/GrÃƒÂ¡fico)

- **Arquitectura de Archivos**: Toda nueva funcionalidad debe residir en `/js`, `/css` o `/assets`.

- **InyecciÃƒÂ³n de Assets**: El Arquitecto proveerÃƒÂ¡ las funciones `getMascotSrc(id)` y `getQuestionImageSrc(id)` que seleccionarÃƒÂ¡n automÃƒÂ¡ticamente el Tier basado en `playerAge`.

### Ã°Å¸Å¡Â¨ DIRECTIVA CRÃƒï¿½TICA (NUEVO ENFOQUE - 2026-05-17)

Por decisiÃƒÂ³n de Jefatura de Proyecto, **el lanzamiento inicial se centrarÃƒÂ¡ ÃƒÅ¡NICAMENTE en el TIER 1**. Los Tiers 2 y 3 quedan en *standby* para versiones futuras.

**Acciones Requeridas por el Arquitecto:**
- Modificar `v51_modular.html` (o `js/store.js` y `js/ui.js` segÃƒÂºn corresponda) para **fijar el sistema visual en Tier 1** independientemente de la edad ingresada (o fijar un fallback automÃƒÂ¡tico a Tier 1).
- **Inventario Reducido:** Debes actualizar la constante `SHOP_ITEMS` en `js/store.js` para que solo contenga los siguientes elementos exactos (las imÃƒÂ¡genes serÃƒÂ¡n provistas externamente, debes preparar la lÃƒÂ³gica para consumirlas con prefijos `m_` o similar):
  - **10 Mascotas:** `bear`, `cat`, `dog`, `dragon`, `fox`, `owl`, `panda`, `penguin`, `rabbit`, `capybara`.
  - **3 Accesorios (Sombreros):** `gafas`, `sombrero`, `corona`.
  - **1 Traje Especial (Powerup o Equipamiento):** `super_heroe`.
  - Total: 50 imÃƒÂ¡genes (se asume que es la combinaciÃƒÂ³n de mascota + accesorio que generarÃƒÂ¡ el usuario). Ajusta la lÃƒÂ³gica de renderizado en `js/ui.js` y `js/game.js` para soportar esta nueva estructura estÃƒÂ¡tica.

### Ã°Å¸â€ºÂ¡Ã¯Â¸ï¿½ CORRECCIONES DE AUDITORÃƒï¿½A EXTERNA (VALIDADAS)
- **Viewport Seguro:** En `v51_modular.html`, actualiza la etiqueta meta de viewport a: `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">` para evitar zoom accidental en mÃƒÂ³viles.
- **Reset CSS Universal:** En `css/base.css` (lÃƒÂ­nea 5), actualiza el selector universal para incluir pseudo-elementos: `*, *::before, *::after { box-sizing: border-box; ... }`.
- **Rendimiento Blur:** En `css/base.css`, aÃƒÂ±ade el fallback recomendado para `backdrop-filter` para evitar lag en dispositivos Android de gama baja.

### Ã°Å¸Å’â‚¬ DIRECTIVA DE TRANSICIÃƒâ€œN "AGUJERO NEGRO" Y SINCRONIZACIÃƒâ€œN JS (NUEVO - 2026-05-20) Ã¢â‚¬â€� Ã°Å¸Å¸Â¢ LUZ VERDE PARA EJECUCIÃƒâ€œN

El USER ha aprobado el plan de transiciÃƒÂ³n de Agujero Negro. Tu rol es programar la lÃƒÂ³gica del cargador en `js/ui.js` para sincronizar los eventos DOM y clases de animaciÃƒÂ³n.

**Instrucciones de Arquitectura:**
1. **SincronizaciÃƒÂ³n de Iconos de Mundos:**
   - En `tickSplash`, recupera el paso de carga actual (`s = steps[idx++]`).
   - Busca los elementos HTML de los iconos de mundos (`#sw0` a `#sw4`).
   - Agrega la clase `.active-world` al icono que corresponde al paso actual (`s.w`).
   - Para todos los iconos con ÃƒÂ­ndice menor a `s.w`, remueve la clase `.active-world` y aÃƒÂ±ade `.completed-world`.
   
2. **CoordinaciÃƒÂ³n del Colapso y Cambio de Vistas:**
   - En `tickSplash`, cuando la carga llegue al 100% (se completen todos los pasos):
     1. Agrega la clase `.collapsing-portal` al elemento `#splash`.
     2. Agrega la clase `.starfield-warp` al fondo de estrellas para distorsionarlo.
     3. Configura un temporizador `setTimeout` de **900ms** (el punto mÃƒÂ¡s denso del colapso de singularidad).
     4. Al cumplirse el timeout:
        - Activa el destello blanco aÃƒÂ±adiendo la clase `.flash-active` a `#flashOverlay` (opacidad a 1).
        - Oculta el DOM de `#splash` (`display = 'none'`).
        - Si el perfil de usuario no estÃƒÂ¡ completo, muestra el DOM de `#namePopup` (`display = 'flex'`).
        - Agrega la clase `.revealing-portal` a la tarjeta de `#namePopup` para iniciar su expansiÃƒÂ³n y giro inverso.
        - Espera un breve intervalo de **50ms** para iniciar la transiciÃƒÂ³n de desvanecimiento de `#flashOverlay` de opacidad 1 a 0.
        - Espera **800ms** mÃƒÂ¡s y limpia las clases temporales (`.collapsing-portal`, `.revealing-portal`, `.starfield-warp`) para restablecer los estados de hover normales de la interfaz.

---
*Actualizado el 2026-05-20 por Consultor Externo (Antigravity)*

## Ã¢Å“â€¦ COMPLETADO EN SESIÃƒâ€œN 2026-05-30

### Layout OpciÃƒÂ³n A Ã¢â‚¬â€� Home Screen
- [x] Eliminados paneles estÃƒÂ¡ticos `#badgesList` y `#missionsList` del Home.
- [x] `circular-menu-wrapper` ahora ocupa el 100% del `home-main-area` Ã¢â€ â€™ menÃƒÂº circular preponderante.
- [x] `--hub-sz` expandido de `450px` Ã¢â€ â€™ `520px` en `layout.css`.
- [x] BotÃƒÂ³n `cb-5` renombrado de "INSIGNIAS" a **"LOGROS"** (Ã°Å¸ï¿½â€ ).
- [x] Nuevo overlay combinado `#logrosOverlay` con tabs (Insignias / Misiones).
- [x] Funciones nuevas en `ui.js`: `openLogros()`, `switchLogrosTab()`, alias `openBadges()`.
- [x] ExposiciÃƒÂ³n correcta en `window.*` de todas las funciones nuevas.

### Generador de Informe para Padres (Destrezas)
- [x] BotÃƒÂ³n "Ã°Å¸â€œÂ¸ Guardar Informe para Padres" aÃƒÂ±adido en `#statsOverlay`.
- [x] FunciÃƒÂ³n `generateStatsImage()` implementada en `ui.js`.
  - Dibuja canvas 640Ãƒâ€”900 con estÃƒÂ©tica Clay World (Tier 1).
  - Incluye: nombre, edad, fecha, partidas, precisiÃƒÂ³n, racha, estrellas, insignias, misiones, destrezas, ÃƒÂ¡reas a reforzar.
  - Descarga el archivo como `.png` usando `canvas.toBlob()`.

### Correcciones de Contraste (Tier 1)
- [x] `tier1.css` actualizado: textos legibles en overlay de Logros, Stats y Misiones.
- [x] Referencias DOM a `#badgesList` limpiadas de `applyLang()`.

### Correcciones de AuditorÃƒÂ­a TÃƒÂ©cnica
- [x] **Viewport seguro y accesible:** `v51_modular.html` actualizado a `width=device-width, initial-scale=1.0, viewport-fit=cover` (removiendo `maximum-scale` y `user-scalable` para cumplir con las validaciones de accesibilidad e IDE).
- [x] **EliminaciÃƒÂ³n de Estilos Inline:** Se eliminaron las reglas de estilo en lÃƒÂ­nea de las imÃƒÂ¡genes de usuario, edad y botÃƒÂ³n del popup de bienvenida, moviendo sus clases CSS `.custom-input-icon` y `.custom-btn-icon` a `css/popups.css`.
- [x] **Reset CSS universal:** `css/base.css` actualizado a `*, *::before, *::after`.
- [x] **Fallback backdrop-filter Android:** aÃƒÂ±adido en `base.css` con `@supports not`.
- [x] **Agujero Negro:** `tickSplash()` implementado con colapso, warp, flash y reveal de portal.
### Correcciones de AuditorÃƒÂ­a TÃƒÂ©cnica (2026-05-30)
- [x] **ConfiguraciÃƒÂ³n de SHOP_ITEMS (Tienda):** Se trasladÃƒÂ³ el accesorio de SÃƒÂºper HÃƒÂ©roe (`p_super_heroe`) a la categorÃƒÂ­a `hats` y se definieron los precios correctos para mascotas y sombreros. Se agregaron los 5 comodines de juego (`pw_freeze`, `pw_skip`, `pw_shield`, `pw_time`, `pw_hint`) con sus precios y emojis correspondientes en la categorÃƒÂ­a `powerups`.
- [x] **MigraciÃƒÂ³n y Saneamiento de Perfil:** Implementado en `js/store.js` una migraciÃƒÂ³n automÃƒÂ¡tica de perfiles heredados que traduce IDs antiguos sin prefijo (ej. `panda` -> `m_panda`, `gafas` -> `c_gafas`) a los prefijos correctos. AdemÃƒÂ¡s, valida en cada carga que las mascotas y sombreros equipados existan en `SHOP_ITEMS`, previniendo errores de carga y cajas vacÃƒÂ­as/imÃƒÂ¡genes rotas.
- [x] **Error de undefined% en Destrezas:** Se inicializaron todas las destrezas de `SKILLS_META` (como `ciencias`, `historia`, `ingles`, `lenguaje`) en `defaultProfile.destrezas` a 100. En `js/ui.js` (`showStats`), se aÃƒÂ±adiÃƒÂ³ un fallback seguro que convierte cualquier valor no numÃƒÂ©rico o indefinido en `100` para evitar desbordes visuales.
- [x] **SuperposiciÃƒÂ³n de Botones de Sonido:** Se redujo el `z-index` de los botones `#ambientBtn` y `.audio-btn` a `80` en `css/layout.css` para que permanezcan interactivos en todas las pantallas principales pero queden correctamente ocultos detrÃƒÂ¡s de cualquier popup o modal overlay (que tienen `z-index: 100` o superior).

## Ã°Å¸â€œâ€¹ Pendientes Futuros

- [x] **Assets `.webp`:** Confirmado que las imÃƒÂ¡genes combinadas de la mascota Panda con accesorios (Gafas, Sombrero, Corona, HÃƒÂ©roe) se cargan correctamente en formato `.webp` en la tienda.
- [ ] **QA Manual:** Verificar la descarga de imagen del informe en mÃƒÂ³viles iOS/Android.
- [x] **canvas.roundRect polyfill & native fix:** Se verificÃƒÂ³ el polyfill y se corrigiÃƒÂ³ un bug crÃƒÂ­tico de reutilizaciÃƒÂ³n de trazado en canvas (llamando a `ctx.beginPath()`) para navegadores con soporte nativo de `roundRect` (Chrome >= 99, etc.).

### Ã°Å¸Å½Âµ DIRECTIVA DE AUDIO (HOWLER.JS VS NATIVO) Ã¢â‚¬â€� COMPLETADO Ã¢Å“â€¦
- [x] **Feature Flag (`USE_HOWLER`):** Implementado en `game.js` (lÃƒÂ­nea 14) permitiendo activar/desactivar Howler.js dinÃƒÂ¡micamente y con fallback automÃƒÂ¡tico a sintetizador nativo si falla el CDN.
- [x] **IntegraciÃƒÂ³n en HTML:** Inyectado script de Howler.js en `v51_modular.html` desde CDNJS.
- [x] **Carga y Despacho:** Precargados efectos de sonido y configurado el router de despacho condicional en `game.js`.

*Actualizado el 2026-05-30 por el Consultor TÃƒÂ©cnico (Antigravity)*

## Ã°Å¸â€œâ€¹ INSTRUCCIONES PENDIENTES DEL CONSULTOR EXTERNO (2026-05-31)
- [x] **AuditorÃƒÂ­a de Carga de Mascota Central:** Verificar por quÃƒÂ© no se renderiza la mascota Panda en el centro de la burbuja principal en el Home. Validar que la ruta `assets/mascotas/tier1/m_panda.webp` sea correcta y que el archivo estÃƒÂ© en la ubicaciÃƒÂ³n fÃƒÂ­sica correspondiente del workspace. (Completado: se corrigiÃƒÂ³ la duplicaciÃƒÂ³n del prefijo 'm_' en `getMascotImagePath` en `ui.js`).


---

## âœ… COMPLETADO EN SESIÃ“N 2026-05-31 (TARDE)

### MÃºsica Ambient MP3 â€” IMPLEMENTADO
- [x] **Sistema de mÃºsica de fondo MP3:** Implementado en `js/ui.js` usando `new Audio()` con `assets/audio/menu_music.mp3`.
  - MÃºsica **activa por defecto** al cargar el home.
  - Se **detiene automÃ¡ticamente** al entrar a `game`, `result`, o `countOverlay`.
  - Se **reanuda** al volver a `home`, `setup`, `mapScreen`, `shop`.
  - BotÃ³n `#ambientBtn` alterna entre ðŸŽµ (activo) y ðŸ”‡ (silenciado).
  - Maneja la polÃ­tica de **autoplay del browser**: si el browser bloquea el audio, se activa en el primer clic/toque del usuario.
  - Archivo MP3 ubicado en: `assets/audio/menu_music.mp3` (ya existÃ­a).

### Bugs Corregidos en ui.js
- [x] **BUG #3 â€” Alias incorrecto `window.toggleAudio`:** Eliminado el alias errÃ³neo `window.toggleAudio = toggleAmbient` de `ui.js`. `window.toggleAudio` lo exporta correctamente `game.js` (controla SFX); `toggleAmbient` solo controla la mÃºsica de fondo.

### Markup de Fondo Tier 1 â€” COMPLETADO
- [x] **`#bgClouds` en `v51_modular.html`:** Actualizado con marcos de borde (`bg-cloud-border-top`, `bg-cloud-border-bottom`) y 8 gotitas de arcilla 3D (`clay-drop cd1`â€“`cd8`). Los estilos CSS correspondientes ya existÃ­an en `css/tiers/tier1.css`.

### Estado de BUGs #1 y #2 â€” VERIFICADOS COMO YA RESUELTOS
- [x] **BUG #1 â€” `confirmQuit()`:** Ya implementada en `js/db.js` (lÃ­nea 202). Congela el timer vÃ­a `state.frozen = true` (que el loop de `requestAnimationFrame` en `game.js` respeta correctamente) y muestra `#quitConfirmPopup`. Exportada en `window.confirmQuit`. NO requerÃ­a acciÃ³n adicional.
- [x] **BUG #2 â€” `openParentReport()`:** Ya implementada en `js/db.js` (lÃ­nea 211). Genera HTML completo del reporte con precisiÃ³n, destrezas, historial semanal, fortalezas y Ã¡reas dÃ©biles. Exportada en `window.openParentReport`. NO requerÃ­a acciÃ³n adicional.

## ðŸ“‹ Pendientes Futuros

- [ ] **QA Manual:** Verificar la descarga de imagen del informe en mÃ³viles iOS/Android.
- [ ] **Assets Interface:** Los siguientes assets del Agente GrÃ¡fico estÃ¡n pendientes. El HTML ya tiene fallbacks SVG:
  - `assets/interface/icon_user.webp`
  - `assets/interface/icon_age.webp`
  - `assets/interface/btn_vamos_icon.webp`
  - `assets/interface/onboarding_panda.webp`

---
*Actualizado el 2026-05-31 por el Agente Arquitecto (Antigravity)*


### BUG #1 â€” confirmQuit() NO EXISTE (PRIORIDAD MÃ�XIMA)
El botÃ³n ? del juego ( 51_modular.html lÃ­nea 447) llama safeCall('confirmQuit') pero esta funciÃ³n **no estÃ¡ definida en ningÃºn archivo JS**. El jugador queda atrapado dentro de la partida sin poder salir.

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
TambiÃ©n aÃ±adir confirmQuit a la lista de requeridas del comentario del HTML (lÃ­nea ~713).

### BUG #2 â€” openParentReport() NO EXISTE
El botÃ³n "Ver Reporte (Padres)" en Ajustes (51_modular.html lÃ­nea 590) llama safeCall('openParentReport') pero tampoco existe. El botÃ³n no hace nada.

**Implementar en js/ui.js** (aÃ±adir cerca de showStats()):
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
    .map(([k,v]) => ${SKILLS_META[k]?.label || k}:  fallos).join(', ') || 'Sin fallos aÃºn';
  content.innerHTML = 
    <div style="line-height:1.8; font-size:15px; padding:10px 0;">
      <p><b>?? Jugador:</b> </p>
      <p><b>?? Fecha:</b> </p>
      <p><b>?? Partidas jugadas:</b> </p>
      <p><b>?? PrecisiÃ³n:</b> %</p>
      <p><b>? Estrellas:</b> </p>
      <p><b>?? Mejor racha:</b> </p>
      <p><b>?? Insignias:</b> /</p>
      <p><b>?? Misiones completadas:</b> </p>
      <p><b>?? Ã�reas a reforzar:</b> </p>
    </div>;
  overlay.style.display = 'flex';
}
window.openParentReport = openParentReport;
```
AÃ±adir tambiÃ©n openParentReport al bloque window.* exports al final de ui.js.

### BUG #3 â€” window.toggleAudio apunta a 	oggleAmbient (ALIAS INCORRECTO)
El Ãºltimo cambio en ui.js tiene:
```
window.toggleAudio = toggleAmbient;  // alias por si algÃºn handler usa toggleAudio
```
Esto es **incorrecto**: 	oggleAudio es una funciÃ³n diferente definida en game.js que controla los efectos de sonido (SFX). 	oggleAmbient solo controla la mÃºsica de fondo. Al tocar el botÃ³n ??, se silenciarÃ­a/activarÃ­a la mÃºsica en lugar de los efectos.
Corregir eliminando ese alias. 	oggleAudio ya es exportado por game.js con window.toggleAudio = toggleAudio;. No aÃ±adir un alias redundante e incorrecto en ui.js.

### ?? ASSETS DE INTERFACE â€” INTEGRAR CUANDO GRÃ�FICO LOS CREE
Los siguientes 4 assets estÃ¡n pendientes de creaciÃ³n por el Agente GrÃ¡fico. Una vez disponibles en ssets/interface/, el HTML ya los referencia correctamente con fallbacks SVG. No requieres cambios en el cÃ³digo, solo confirmar que los archivos existen.
- ssets/interface/icon_user.webp
- ssets/interface/icon_age.webp  
- ssets/interface/btn_vamos_icon.webp
- ssets/interface/onboarding_panda.webp

---
*Actualizado el 2026-05-31 por el Consultor Externo (Antigravity)*

## ðŸ�—ï¸� PORTAL & TRASFONDO TIER 1 - INTEGRACIÃ“N DOM (2026-05-31) - PENDIENTE DE EJECUCIÃ“N

El Consultor Externo y el USER han acordado reestructurar estÃ©ticamente el Tier 1 (Clay World). El Arquitecto debe coordinar con DiseÃ±o para integrar las gotitas de arcilla y los marcos de nubes.

### Tareas en `v51_modular.html`:
1.  **Markup del Fondo `#bgClouds`:**
    Asegurar que el elemento `#bgClouds` contenga el siguiente Ã¡rbol de nodos:
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
*   **BUG #2 (openParentReport):** Implementar la carga y visualizaciÃ³n del reporte en `js/ui.js`.
*   **BUG #3 (toggleAudio alias):** Limpiar el alias incorrecto en `js/ui.js`.

---
*Actualizado el 2026-05-31 por el Consultor Externo (Antigravity)*

### Ajuste de Nubes en DOM (2026-06-01):
*   Se eliminaron los marcos de nubes superior/inferior (`.bg-cloud-border-top` y `.bg-cloud-border-bottom`) de `#bgClouds`.
*   Se agregaron los divs de nubes flotantes `.bg-cloud.c7` a `.bg-cloud.c12` en el DOM para mejorar el soporte en tabletas/dispositivos horizontales.

---
*Actualizado el 2026-06-01 por el Consultor Externo (Antigravity)*

---

## ðŸš¨ AUDITORÃ�A COMPLETA â€” Bugs Confirmados (2026-06-06)

El Consultor Externo realizÃ³ una auditorÃ­a exhaustiva de todo el cÃ³digo (HTML, JS, CSS, Assets).  
Los siguientes bugs son **confirmados** y requieren correcciÃ³n inmediata:

### ðŸ”´ BUG CRÃ�TICO #1: `confirmQuit` NO IMPLEMENTADA
- **DÃ³nde:** `js/game.js` (no existe la funciÃ³n)
- **SÃ­ntoma:** El botÃ³n âœ• dentro del juego llama `safeCall('confirmQuit')` â†’ ReferenceError silencioso â†’ el jugador NO puede salir.
- **Fix requerido â€” agregar en `game.js` antes de los window exports:**
```js
function confirmQuit() {
  document.getElementById('quitStreakVal').textContent = state.streak || 0;
  state.frozen = true;
  document.getElementById('quitConfirmPopup').style.display = 'flex';
}
window.confirmQuit = confirmQuit;
```
- **Notar:** El popup `#quitConfirmPopup` ya existe en el HTML con sus botones "Seguir" y "Salir" correctamente configurados. Solo falta la funciÃ³n que lo abre.

### ðŸ”´ BUG CRÃ�TICO #2: `openParentReport` NO IMPLEMENTADA
- **DÃ³nde:** `js/ui.js` (no existe la funciÃ³n)
- **SÃ­ntoma:** El botÃ³n "Ver Reporte (Padres)" en Ajustes llama `safeCall('openParentReport')` â†’ funciÃ³n inexistente â†’ popup `#parentReportOverlay` nunca aparece.
- **Fix requerido â€” agregar en `ui.js` antes de los window exports:**
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
        <div style="font-size:40px;">ðŸ�¼</div>
        <h3 style="margin:8px 0;">${name}</h3>
      </div>
      <div class="stat-row"><span>ðŸŽ® Partidas jugadas:</span><strong>${games}</strong></div>
      <div class="stat-row"><span>ðŸŽ¯ PrecisiÃ³n global:</span><strong>${acc}%</strong></div>
      <div class="stat-row"><span>â­� Estrellas totales:</span><strong>${stars}</strong></div>
      <div class="stat-row"><span>ðŸ”¥ Racha mÃ¡xima:</span><strong>${profile.maxStreak || 0}</strong></div>
      <div class="stat-row"><span>ðŸ§  Ã�reas a reforzar:</span><strong>${worst3}</strong></div>
      <hr style="margin:16px 0;opacity:0.3;">
      <p style="font-size:13px;text-align:center;opacity:0.7;">Para ver el informe completo como imagen, ir a la secciÃ³n Destrezas â†’ Guardar Informe.</p>
    `;
  }
  document.getElementById('parentReportOverlay').style.display = 'flex';
}
window.openParentReport = openParentReport;
```

### ðŸŸ  BUG MEDIO #3: `sfxWrong` usada en `ui.js` sin importar
- **DÃ³nde:** `js/ui.js`, funciÃ³n `startMapLevel()`, lÃ­nea que contiene `sfxWrong()`
- **SÃ­ntoma:** Cuando el usuario intenta entrar a un nivel bloqueado â†’ `ReferenceError: sfxWrong is not defined`
- **Fix requerido â€” cambiar la lÃ­nea de import en ui.js:**
```js
// ANTES:
import { generateQuestion, sfxCountdown, updatePowerupsUI } from './game.js';
// DESPUÃ‰S:
import { generateQuestion, sfxCountdown, updatePowerupsUI, sfxWrong } from './game.js';
```
- **AdemÃ¡s:** En `game.js`, agregar `sfxWrong` a los exports del mÃ³dulo:
```js
// Al final de game.js, en el export:
export { generateQuestion, sfxCountdown, updatePowerupsUI, sfxWrong };
```

### ðŸŸ  BUG MEDIO #4: `applyAccessory` comentada â€” los sombreros no se ven
- **DÃ³nde:** 5 lugares en `game.js` y `ui.js`
- **SÃ­ntoma:** Todos los jugadores con sombrero equipado no lo ven renderizado en ninguna pantalla.
- **Fix requerido â€” descomentar estas lÃ­neas (buscar y quitar el `//`):**
  - `ui.js` ~lÃ­nea 454: `// try { applyAccessory(document.getElementById('homeHat'), ...)`
  - `game.js` ~lÃ­nea 22: `// applyAccessory(document.getElementById('mascotHat'), ...)`
  - `game.js` ~lÃ­nea 229: `// applyAccessory(document.getElementById('resHat'), ...)`
  - `game.js` ~lÃ­nea 243: (segunda apariciÃ³n de resHat en levelComplete)
  - `game.js` ~lÃ­nea 260: `// applyAccessory(document.getElementById('previewHat'), ...)`

### ðŸŸ¡ MEJORA #5: Inputs de Settings sin label de accesibilidad
- **DÃ³nde:** `v51_modular.html`, dentro de `#settingsOverlay`, ~lÃ­neas 612-616
- **Fix requerido â€” agregar labels:** 
```html
<!-- ANTES -->
<input type="text" id="setNameInput" ...>
<input type="number" id="setAgeInput" ...>

<!-- DESPUÃ‰S -->
<label for="setNameInput" class="sr-only">Nombre del jugador</label>
<input type="text" id="setNameInput" ...>
<label for="setAgeInput" class="sr-only">Edad del jugador</label>
<input type="number" id="setAgeInput" ...>
```
(y agregar `.sr-only { position:absolute; width:1px; height:1px; overflow:hidden; clip:rect(0,0,0,0); }` en base.css)

### ðŸŸ¡ MEJORA #6: Crear `manifest.json` y `<link favicon>`
- La app no es instalable como PWA (falta manifest.json y service worker).
- MÃ­nimo: crear `manifest.json` y agregar `<meta description>` + `<link rel="icon">` al HTML.

---
*AuditorÃ­a registrada el 2026-06-06 por el Consultor Externo (Antigravity)*

---

## ðŸ›¡ï¸� DIAGNÃ“STICO DE SEGURIDAD (PANDA-SHIELD) â€” 2026-06-06

El equipo de seguridad ha detectado los siguientes puntos que el Agente Arquitecto debe resolver o tener en cuenta de inmediato:

### ðŸš¨ VULNERABILIDAD CRÃ�TICA (XSS) â€” AcciÃ³n Inmediata Requerida
- **Problema:** En `js/ui.js` y posiblemente en otros mÃ³dulos, se estÃ¡ inyectando el valor de `profile.playerName` usando la propiedad `.innerHTML`. Dado que este valor proviene del input del usuario (o `localStorage`), esto abre la puerta a ataques de Cross-Site Scripting (XSS).
- **Directiva:** Busca TODAS las instancias donde se renderice el nombre del jugador (por ejemplo: en el popup de Bienvenida, en el menÃº de Logros, en el Reporte para Padres) y reemplaza la asignaciÃ³n a `.innerHTML` por **`.textContent`** o **`.innerText`** de manera obligatoria y urgente.
- **Ejemplo del fix a implementar:**
  ```javascript
  // â�Œ PELIGROSO:
  document.getElementById('playerNameDisplay').innerHTML = profile.playerName;
  
  // âœ… SEGURO:
  document.getElementById('playerNameDisplay').textContent = profile.playerName;
  ```

### â„¹ï¸� Riesgos Asumidos por Arquitectura (By Design)
- **ManipulaciÃ³n de LocalStorage (Zero Trust):** Al ser una app local (PWA) sin backend, todo el progreso se almacena en el cliente (`pm_profile_v5`). El riesgo de que un usuario manipule sus estadÃ­sticas manualmente es **aceptado** para la versiÃ³n 1.0 offline.
- **ExposiciÃ³n de Respuestas (`db.js`):** Las respuestas se validan localmente y estÃ¡n en texto plano. Riesgo **aceptado**. Si a futuro se decide escalar la app a la nube o hacerla competitiva online, esto deberÃ¡ moverse forzosamente a una base de datos en un servidor backend con validaciÃ³n server-side.

### ðŸ”� TAREAS DE REMEDIACIÃ“N ADICIONALES (PANDA-SHIELD)
1. **ProtecciÃ³n BÃ¡sica contra ManipulaciÃ³n de LocalStorage (SEC-02):**
   - **DÃ³nde:** `js/store.js` (Funciones `saveSettings` o donde se guarde `pm_profile_v5`).
   - **AcciÃ³n:** Implementar un mecanismo simple de ofuscaciÃ³n o Checksum/Hash local (ej. Base64 o firma HMAC bÃ¡sica) antes de guardar en `localStorage`, y verificar dicha firma al cargar. Si el hash no coincide (indicio de trampa o manipulaciÃ³n manual), reiniciar las estrellas a un valor seguro o mostrar advertencia.

2. **ValidaciÃ³n de Entradas en el Perfil (SEC-04):**
   - **DÃ³nde:** `v51_modular.html` y `js/ui.js`.
   - **AcciÃ³n:** Agregar atributo `pattern="[A-Za-z0-9 ]+"` en los campos de input del nombre (`#setNameInput`, `#welcomeNameInput`) y limpiar la cadena en la funciÃ³n que guarda el perfil, eliminando cualquier caracter que no sea alfanumÃ©rico.




### ðŸ›¡ï¸� CORRECCIONES DE SEGURIDAD APLICADAS (2026-06-06)
- [x] **Vulnerabilidad CrÃ­tica XSS Resuelta:** Se eliminÃ³ la inyecciÃ³n por innerHTML del nombre del jugador en ui.js, utilizando 	extContent en su lugar.
- [x] **ProtecciÃ³n contra manipulaciÃ³n (SEC-02):** Implementada funciÃ³n generateHash en store.js para crear una firma en localStorage ('pm_profile_v5_hash'). Si se detecta un cambio manual en el JSON sin su correspondiente firma, el puntaje de estrellas se restablece a 0 automÃ¡ticamente para penalizar trampas.
- [x] **SanitizaciÃ³n de Perfil (SEC-04):** AÃ±adido patrÃ³n a los inputs en 51_modular.html y aplicado regex en ui.js y game.js para truncar cualquier caracter especial del nombre ingresado antes del guardado.


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

## ðŸš¨ BUG CRÃ�TICO REPORTADO POR QA TESTER (2026-06-20)
**BUG-001: countOverlay.showModal is not a function**
- **DescripciÃ³n:** Al iniciar el Modo Libre (T-04), el juego crashea en consola porque `ui.js` intenta invocar `.showModal()` sobre `countOverlay`, pero este elemento sigue siendo un `<div>` y no fue migrado a `<dialog>`.
- **InstrucciÃ³n de ResoluciÃ³n (INMEDIATA):**
  1. Busca el elemento `<div id="countOverlay">` en el HTML (`v51_modular.html` y/o la copia en la carpeta `v52_modular/v52_modular.html`).
  2. CÃ¡mbialo por `<dialog id="countOverlay" class="popup-overlay z-index-310">` (o mantÃ©n sus clases originales pero como dialog).
  3. AsegÃºrate de que `ui.js` en la funciÃ³n de la cuenta regresiva cierre el popup con `.close()` en lugar de `style.display = 'none'`.
- âœ… **ESTADO (2026-06-20): RESUELTO.** Se actualizÃ³ `<div id="countOverlay">` a `<dialog id="countOverlay" class="popup-overlay z-index-110">` en `v51_modular.html` y `v52_modular/v52_modular.html`. Se corrigiÃ³ tambiÃ©n `v52_modular/js/ui.js` para usar `showModal()` y `close()`.

## ðŸš¨ BUG-002 REPORTADO POR QA TESTER (2026-06-20)
**BUG-002: feedbackOverlay.showModal is not a function**
- **DescripciÃ³n:** El elemento `<div id="feedbackOverlay">` no fue migrado a `<dialog>` durante el sprint de seguridad. El cÃ³digo en `game.js` intenta llamar `.showModal()` tras cada respuesta del jugador, provocando un crash silencioso que congela el juego.
- **InstrucciÃ³n de ResoluciÃ³n (INMEDIATA):**
  1. En `v51_modular.html`, lÃ­nea del `<div id="feedbackOverlay">`: cambiar a `<dialog id="feedbackOverlay">` (mantener sus clases existentes).
  2. Hacer lo mismo en `v52_modular/v52_modular.html`.
  3. Verificar en `game.js` que la funciÃ³n que controla el feedback ya use `.showModal()` y `.close()` (si aÃºn usa `style.display`, actualizar tambiÃ©n).
- âœ… **ESTADO (2026-06-20): RESUELTO.** `<div id="feedbackOverlay">` migrado a `<dialog class="feedback-dialog">` en `v51` y `v52`. CSS de `game.css` actualizado para suprimir `display:none/flex` y usar selector `[open]`. `showFeedback()` en `game.js` ya era correcto (usaba `.showModal()` y `.close()`).

---

## ðŸš€ NUEVO SPRINT: OPTIMIZACIÃ“N Y ACCESIBILIDAD (2026-06-22)

**Origen:** AuditorÃ­a Externa 2026 / Aprobado por el USER y Consultor.
**Prioridad:** ALTA.

**Objetivo del Arquitecto:** Implementar las recomendaciones clave de rendimiento y accesibilidad antes de considerar la app lista para producciÃ³n masiva.

### 1. ImplementaciÃ³n de CSP Headers (Seguridad)
- **DÃ³nde:** En el `<head>` de `v51_modular.html` (o `v52_modular.html` si es el activo).
- **AcciÃ³n:** Agregar la polÃ­tica `<meta http-equiv="Content-Security-Policy" content="...">` para blindar la carga de recursos. AsegÃºrate de permitir scripts locales y los CDNs externos que ya utilizamos (como Howler.js).

### 2. Rendimiento: Carga Diferida (Lazy-Load) de Preguntas
- **DÃ³nde:** Archivo `js/db.js` y estructura de base de datos.
- **Problema:** Actualmente se importa sincrÃ³nicamente todo el bloque de preguntas (un JSON de ~1.4MB), penalizando fuertemente el "Time to Interactive" (TTI) de la PWA.
- **AcciÃ³n a implementar:** Refactorizar el acceso a las preguntas. En lugar de tener todo en memoria desde el milisegundo 0, implementa un sistema donde `db.js` haga un `fetch` bajo demanda (o una importaciÃ³n dinÃ¡mica) del bloque de preguntas *solamente para la edad/tier actual del jugador* justo antes de iniciar una partida o en segundo plano tras cargar el menÃº inicial.

### 3. Accesibilidad BÃ¡sica (A11y)
- **DÃ³nde:** HTML y CSS (`base.css` / `components.css`).
- **Acciones:**
  1. **ARIA Labels:** Asegurar que todo elemento interactivo (especialmente los botones circulares que solo tienen emojis/iconos) posea un atributo `aria-label` descriptivo.
  2. **NavegaciÃ³n por Teclado:** AÃ±adir en el CSS una regla global para `*:focus-visible` que muestre un contorno visible (`outline`) para usuarios que navegan con el teclado.
  3. *(Coordinar con DiseÃ±o)*: Integrar soporte bÃ¡sico para `@media (prefers-reduced-motion: reduce)` anulando las animaciones infinitas para usuarios con sensibilidad al movimiento.

---

## ðŸš¨ BUG-003 REPORTADO POR QA TESTER (2026-06-24)
**BUG-003: HTML crudo visible en pantalla de Ajustes (ConfiguraciÃ³n)**
- **Severidad:** ALTA â€” Visible para el usuario final.
- **Pasos para reproducir:**
  1. Iniciar la app y completar el onboarding.
  2. Desde el menÃº principal, hacer click en el botÃ³n "AJUSTES" (âš™ï¸�).
  3. Observar la secciÃ³n de perfil.
- **Resultado Observado:** El campo de nombre muestra texto literal: `placeholder="Nombre" maxlength="12" autocomplete="off">` en pantalla, en lugar de un `<input>` editable.
- **Causa probable:** Un bloque `innerHTML` en `ui.js` que construye la pantalla de Ajustes estÃ¡ generando el HTML del `<input>` incorrectamente â€” probablemente un error de comillas, cierre de tag o interpolaciÃ³n de template literal defectuosa. El elemento `<input>` no se estÃ¡ cerrando correctamente y el parser lo trata como texto.
- **InstrucciÃ³n de ResoluciÃ³n (INMEDIATA):**
  1. Busca en `js/ui.js` la funciÃ³n que renderiza la pantalla `#settings` o `#ajustes` (puede llamarse `navSettings`, `renderSettings`, `openSettings` o similar).
  2. Inspecciona el template literal del `<input id="setNameInput">` â€” verifica que el tag estÃ© correctamente cerrado y que no haya comillas sin escapar que rompan el string.
  3. Alternativa: Si el input se genera dinÃ¡micamente, reemplÃ¡zalo por un `document.createElement('input')` para evitar errores de parseo de HTML.
  4. **Estado:** âœ… RESUELTO (2026-06-25) â€” Se eliminÃ³ un `>` errÃ³neo en el `<input id="setNameInput">` en `v51_modular.html` (LÃ­nea 595) que causaba que los atributos siguientes se renderizaran como texto plano.

---

## ðŸš¨ BUG-004 REPORTADO POR QA TESTER (Playwright) â€” 2026-06-25
**BUG-004: SanitizaciÃ³n de perfil agresiva elimina acentos en nombres en espaÃ±ol**
- **Severidad:** ALTA â€” CorrupciÃ³n de datos ingresados por el usuario.
- **DescripciÃ³n:** Durante la ejecuciÃ³n automatizada de Playwright, se ingresÃ³ el nombre "MarÃ­a". Al guardarse y renderizarse en el Home, el sistema devolviÃ³ "Mara".
- **Causa probable:** La medida de seguridad (SEC-04) implementada previamente introdujo un Regex muy restrictivo (`/[^A-Za-z0-9 ]/g` o similar) o un atributo `pattern="[A-Za-z0-9 ]+"` en el HTML, el cual no soporta caracteres propios del espaÃ±ol (Ã¡, Ã©, Ã­, Ã³, Ãº, Ã±, Ã¼).
- **InstrucciÃ³n de ResoluciÃ³n (INMEDIATA):**
  1. En `v51_modular.html`, localiza los inputs de nombre (`#nameInput`, `#setNameInput`) y actualiza el atributo `pattern` para soportar acentos: `pattern="[A-Za-z0-9 Ã¡Ã©Ã­Ã³ÃºÃ�Ã‰Ã�Ã“ÃšÃ±Ã‘Ã¼Ãœ]+"`
  2. En `js/ui.js` o `js/store.js` (donde se aplique la limpieza de la variable antes de guardar), ajusta la expresiÃ³n regular para ignorar caracteres latinos vÃ¡lidos.
- **Estado:** âœ… RESUELTO (2026-06-25) â€” Se ampliaron las regex y patterns HTML en `v51_modular.html`, `js/ui.js` y `js/game.js` para permitir `Ã¡Ã©Ã­Ã³ÃºÃ�Ã‰Ã�Ã“ÃšÃ±Ã‘Ã¼Ãœ`.

---

## ðŸš€ TAREAS ESTRATÃ‰GICAS DE INNOVACIÃ“N TÃ‰CNICA (Informe Comparativo 2025-2026)
*Instrucciones asignadas por el Consultor Externo (2026-06-27)*

1. **Algoritmo de RepeticiÃ³n Espaciada / HLR Simplificado (`store.js` / `db.js`):**
   - DiseÃ±ar una estructura liviana en `localStorage` que registre el histÃ³rico de aciertos y fallos por categorÃ­a de pregunta.
   - Modificar el selector de preguntas en `game.js` para aumentar la probabilidad de reapariciÃ³n de conceptos fallados previamente (Mastery Learning).
2. **Infraestructura de Comodines de Riesgo (Tienda y Game Loop):**
   - Planificar el soporte en `store.js` para Ã­tems consumibles avanzados: *Escudo de Racha* (evita perder racha ante un fallo) y *Doble o Nada* (multiplicador voluntario de estrellas).
3. **MÃ³dulo Co-CreaciÃ³n Offline "KitCollab" (Fase Futura):**
   - DiseÃ±ar la arquitectura para permitir que docentes puedan importar/exportar mazos de preguntas locales mediante formato JSON o cÃ³digo QR sin depender de backend/nube.

 # #   =ØÝÜ  R e g i s t r o   C r u z a d o   ( A g e n t e   C o n t e n i d o )   -   2 0 2 6 - 0 6 - 2 7 
 -   * * E t i q u e t a d o   O A   y   F e e d b a c k   P o s i t i v o * * :   S e   i n y e c t a r o n   e t i q u e t a s   \ o a \   e n   \ d b _ 6 _ 7 . j s o n \   y   s e   a j u s t a r o n   l o s   s t r i n g s   d e   f e e d b a c k   m o t i v a c i o n a l   e n   \ u i . j s \   ( l í n e a s   7 1 2 ,   7 3 3 ) ,   \ g a m e . j s \   ( l í n e a   3 0 ,   1 5 7 )   y   \ d b . j s \   ( l í n e a   2 7 3 )   c u m p l i e n d o   l o s   l i n e a m i e n t o s   p s i c o p e d a g ó g i c o s .  
 


## 2026-10-03 — Integración banco MVP Tier 1 + ilustraciones (Agente Arquitecto)
- **js/db.js**
  - Nuevas utilidades antes de `getQuestionFromDB()`: `MVP_DB_PATH_6_7`, `MVP_IMG_WHITELIST` (`/^assets\/preguntas\/t1_mvp\/[a-z0-9_]+\.webp$/i`), `fetchJSON()`, `loadAgeDB()`, `safeImgPath()`.
  - ageGrp `6_7` carga `assets/data/db_mvp_6_7.json`; si falla o viene vacío → `assets/data/db_6_7.json`. 8_10 / 11_13 sin cambios (V2 en standby).
  - El objeto devuelto incluye `img` solo si pasa la whitelist. Se mantienen dedup (`state.usedQuestions`), filtro de corruptas (endurecido: `q &&`, `Array.isArray(q.opts)`) y fallbacks legacy/Generators. Categoría no-array → fallback.
  - `cleanQuestionText()` se conserva (inocuo; limpia notas "(Dibujo...)" del banco legacy).
- **js/game.js**
  - Nueva `renderQuestionMedia(qData)`: limpia `#qMedia` y `has-img` en cada pregunta; con img crea `<img class="q-illustration" alt="Ilustración de la pregunta" decoding="async">` vía DOM; `onerror` (solo si la img sigue en #qMedia) quita img/`has-img` y muestra `qData.m` como textContent. Sin img: `innerHTML = qData.m` (Generators con spans).
  - `generateQuestion()` llama a `renderQuestionMedia(qData)` en vez del innerHTML directo.
- Verificado: sintaxis OK (node --check), CSP `img-src 'self'` permite las imágenes, 106 img en el JSON MVP, 0 fuera de whitelist, 0 archivos faltantes.
- **Pendientes / ajenos:** `sw.js` (Release) solo precachea `db_6_7.json`; añadir `db_mvp_6_7.json` y las WebP de `assets/preguntas/t1_mvp/` para offline real. CSS `.q-media.has-img .q-illustration` → Agente Diseño.