# 🕵️ Memoria: Consultor Externo (Antigravity)

---
# 🚨 DIRECTIVA GLOBAL: PIVOTE ESTRATÉGICO (Actualización) 🚨
*NOTA PARA EL AGENTE: Lee esto antes de ejecutar cualquier nueva tarea.*

Todo el equipo de agentes debe alinear su trabajo bajo el nuevo "Strategic Pivot":
1. **Scope Reducido (Calidad > Cantidad):** El proyecto se concentra EXCLUSIVAMENTE en el **Tier 1 (6-7 años)**. Los desarrollos y diseños para Tiers 2 y 3 quedan en pausa. El objetivo es lanzar un MVP perfecto para este segmento.
2. **Mercado Objetivo:** "Chile First". Todo el contenido, UI y validaciones están pensados para el mercado chileno como prueba inicial.
3. **Arquitectura:** Somos una **PWA 100% Offline-First**. NO hay backend, NO hay bases de datos en la nube. Todo vive en `localStorage`.
4. **Diseño Visual:** La app entera (Tier 1) se rige bajo la estética "Clay World" (Claymorphism: 3D táctil, formas amigables y redondeadas). Diseños neon/cósmicos en Tier 1 están obsoletos.
5. **Calidad de Contenido:** Reducimos la carga a 200 preguntas altamente depuradas.

**Cualquier decisión que tomes de ahora en adelante debe respetar estrictamente estos 5 pilares.**

---

> [!IMPORTANT]
> **Única Fuente de Verdad del Proyecto:** El archivo HTML activo sobre el cual se trabaja y se ejecuta la aplicación es **`v51_modular.html`** en la raíz del proyecto.
> La carpeta `_ARCHIVO_v52_modular/` es un **archivo histórico** (renombrada el 2026-06-24). **Ignorar cualquier referencia a v52.** No ejecutar, no modificar, no analizar sobre esa carpeta.

> [!IMPORTANT]
> **PROTOCOLO DE MEMORIA:** Cada vez que el Consultor realice un análisis, emita instrucciones o cierre una tarea, debe añadir una entrada fechada en la sección "Avances Realizados" de esta memoria, indicando: qué se hizo, qué agente debe actuar, y el estado resultante. Sin excepción.

## 🆔 ID de Conversación Actual
`0c306431-c583-4d9c-9211-90a56ae00388`

## 🎯 Último Objetivo
Auditar la interfaz del Tier 1 (Clay World) a partir de la captura de pantalla provista por el USER, detectar errores de alineación, contraste y carga de assets, y estructurar las instrucciones correspondientes para los agentes especializados.

## 🛠️ Avances Realizados (2026-05-31)

1. **Análisis de Errores Detectados en Pantalla Principal (Tier 1):**
   - **Nubes con fondo opaco:** Las imágenes `cloud_clay1.webp`, `cloud_clay2.webp`, etc., muestran recuadros blancos/grisáceos en lugar de ser transparentes.
   - **Mascota central invisible:** El contenedor `.hub-mascot-container` está vacío (posible asset faltante o error en la ruta).
   - **Bajo contraste de edad:** El texto de la edad `(7 años)` es blanco/gris claro sobre fondo azul cielo claro, haciéndolo ilegible.
   - **Desalineación del contador de estrellas:** El número "10" se corta y se desborda por la parte inferior de la píldora naranja.
   - **Cotton Chain invisible:** El conector de algodón en fila no se visualizaba debido a que la variable `--radius` estaba definida localmente en `.circle-btn` en vez de en el padre `.circular-menu`.
   - **Superposición de etiquetas de botón:** Los textos de los botones ("AJUSTES", "DESTREZAS") tocan los bordes inferiores debido al centrado vertical por defecto.
   - **Fondo cuadrado en botones de audio:** Los botones flotantes inferiores izquierdos muestran esquinas cuadradas.

2. **Propuestas de Corrección Técnica Formuladas:**
   - **Para Agente Diseño (CSS):**
     - Mover la variable `--radius: calc(var(--hub-sz) / 2 - var(--btn-sz) / 1.8)` al contenedor `.circular-menu` en `css/layout.css` para restaurar el conector `.circular-menu::before`.
     - Ajustar `.circle-btn` con `justify-content: flex-start` y `padding-top: calc(var(--btn-sz) * 0.13)` para centrar el contenido y evitar solapes.
     - Añadir un estilo específico para `html.age-tier-1 .home-header-age span` con color `#5c3eb0` y `opacity: 1` para resolver el contraste.
     - Redefinir `.star-showcase` con `height: 48px`, `background-size: 100% 100%`, y `justify-content: center` para centrar el contador de estrellas.
   - **Para Agente Gráfico (Assets):**
     - Regenerar los assets de nubes (`cloud_clay1.webp`, etc.) y UI con canal alfa (fondo 100% transparente).
   - **Para Agente Arquitecto (Lógica/Estructura):**
     - Verificar la existencia de `assets/mascotas/tier1/m_panda.webp` y asegurar que no hay errores de carga en consola.

## 🛠️ Avances Realizados (2026-06-01)
1. **Corrección del Menú Circular:**
   - Detectado y corregido un bug crítico de layout en `css/tiers/tier1.css` donde `.circle-btn` tenía `position: relative !important`, lo cual rompía la posición absoluta requerida por la fórmula de distribución radial en `css/layout.css`. Se restauró a `position: absolute !important`.
   - Modificados los paths SVG de los 6 botones circulares en `v51_modular.html` reduciendo el radio de 40 a 37 (`d="M 13,50 A 37,37 0 0,0 87,50"`) para desplazar el texto curvo ligeramente hacia arriba y evitar que toque el borde blanco.
   - Optimizado el espacio y tamaño de los textos curvos SVG (`font-size: 11.5px`, `letter-spacing: 0.13em`, `stroke-width: 2.8px`) en `css/tiers/tier1.css` para resolver solapamientos de letras (especialmente entre la 'T' y la 'S' en 'AJUSTES').
2. **Corrección de Carga de Fondo (Viewport Crop):**
   - Eliminada la propiedad `background-attachment: fixed !important` en `css/tiers/tier1.css` para el fondo del Tier 1. Esto solucionó un error de renderizado del navegador (Puppeteer/móviles) que cortaba el fondo de plastilina azul cielo a la mitad y revelaba un fondo gris.
3. **Corrección y Rediseño del Contador de Estrellas (Star Showcase):**
   - El texto `"ESTRELLAS CONSEGUIDAS"` se colocó de forma absoluta sobre la cápsula (`bottom: 43px; left: -20px; width: 150px; text-shadow: 0 1px 0 #fff; color: #8d4004`), mientras que el número se centró horizontal y verticalmente dentro de la zona naranja de la cápsula utilizando un tamaño de `20px` en color azul oscuro clay. Las dimensiones de la cápsula se optimizaron a `110px` x `40px` con `background-size: 100% 100%`.
4. **Rediseño del Nombre de Usuario y Edad (Clay Badge):**
   - Se implementó un diseño divertido de nametag estilo claymorfismo para la zona de perfil del usuario en la parte superior izquierda (`.home-top-bar > div:first-child`). Se agregaron bordes blancos de plastilina de `3.5px`, fondo blanco semitransparente (`rgba(255,255,255,0.85)`), sombra clay, y se encapsuló la edad en una pastilla rosa clay (`#f48fb1`).
5. **Validación Visual Exitosa:**
   - Realizado test de renderizado con subagente y verificado que los 6 botones (MUNDOS, LIBRE, TIENDA, DESTREZAS, LOGROS, AJUSTES) se muestran en un círculo simétrico perfecto alrededor del panda y con tipografía curva nítida y perfectamente delineada.

## 📋 Próximos Pasos Recomendados
- Proceder con la implementación de la transición animada tipo "agujero negro" (singularity collapse) entre la pantalla de carga (Splashscreen) y el Portal de Bienvenida (onboarding popup).
- Documentar el script de transición para el Agente Arquitecto.

## 📋 Avances Realizados (2026-06-20)

1. **Mitigación y Cierre de Vulnerabilidades Críticas (Fase 1):**
   - **XSS en Reporte de Padres:** Se reescribió `openParentReport` en `js/ui.js` eliminando el uso de `innerHTML` por métodos de creación DOM seguros con `textContent`.
   - **XSS Residual en Preguntas/Respuestas:** El Agente Seguridad (PANDA-SHIELD) actualizó `game.js` para renderizar `qData.q` y `a.t` con `textContent` en lugar de `innerHTML`.
   - **Service Worker Robustecido:** Se modificó la estrategia Network-First en `sw.js` agregando verificación de `!response.ok` para lanzar un error y forzar el fallback al caché offline ante respuestas 404/500 del servidor.
   - **Riesgos Aceptados:** Se clasificaron oficialmente como "Riesgos Aceptados" las lógicas locales de almacenamiento y validación (SEC-02/SEC-03).
   - **Validación de Input:** Se verificó que la sanitización RegExp (`replace(/[^A-Za-z0-9 ]/g, '')`) ya estaba operativa.

2. **Modernización de la UI e Hitos (Fase 3):**
   - **Migración a `<dialog>`:** Todos los modales tipo `popup-overlay` fueron migrados a la etiqueta HTML5 nativa `<dialog>`, actualizando los controladores JS para usar `.showModal()` y `.close()`. Se agregaron estilos compatibles con `::backdrop` en `css/popups.css`.
   - **Sistema de Partículas:** Se implementó la función `createParticles()` en `js/ui.js` y se conectó en `levelComplete()` (`js/game.js`) para celebrar la superación de niveles.

3. **Arquitectura Multiagente:**
   - **Creación del Agente Tester (QA):** Definido e implementado el rol de QA On-Demand. Se crearon sus reglas (`agente-tester.md`), su archivo de memoria de seguimiento (`tester.md`) y se actualizó `CHATS.md` para incluir el nuevo flujo de verificación antes del cierre de sprints.

## 📋 Próximos Pasos Recomendados (QA y Estabilidad)

1. **Ejecutar Campaña de Pruebas Inicial (Tester):**
   - Invocar al **Agente Tester** para ejecutar la Suite de Pruebas 1 a 5 detallada en su memoria y certificar que la migración a `<dialog>` y la inyección segura de textos no rompieron ninguna funcionalidad en el Tier 1.
2. **Cierre de Sprint de Seguridad y Estabilidad:**
   - Una vez que el Tester valide y limpie cualquier bug crítico/alto, proceder con el empaquetado estable de la versión de producción para el Tier 1.
3. **Planificación de Nuevas Características:**
   - Una vez estabilizado el Tier 1, planificar la futura incorporación progresiva y controlada de los Vivid Tiers (Tier 2: Retrowave y Tier 3: Cyberpunk).

## 📋 Avances Realizados (Validación Final v51 a v52)

1. **Auditoría Final de Sanitización y PANDA-SHIELD:**
   - **Trivia DB Sanitizada:** Se generó exitosamente el reporte `tier1_audit_spelling.txt` usando el script Python. Verifiqué que la rutina de `js/db.js` (`cleanQuestionText`) elimina cualquier rastro residual de directivas de imágenes para una entrega limpia a la UI.
   - **Service Worker Hardening:** Validado en `sw.js` que se aplican correctamente los lineamientos SEC-03. La validación `!response.ok` y los `catch` previenen la corrupción de la caché por peticiones fallidas.
   - **Mitigación XSS en UI:** Validada la inexistencia de usos vulnerables de `innerHTML` en la carga y renderizado de componentes críticos del juego (`qText`).
   
2. **Transición a v52 y Lógica Visual:**
   - **Portal Splashscreen (Agujero Negro):** Validado en `js/ui.js` la inclusión de las clases `collapsing-portal` y `revealing-portal`. La secuencia asíncrona decopla exitosamente la visualización de la tarjeta de registro (`namePopup`) hasta que el splash inicial colapsa tras 900ms, resolviendo el bug visual de "overlay prematuro".
   - **Arquitectura v52:** El código validado y estabilizado de `v51_modular.html` ha sido migrado oficialmente a `v52_modular/v52_modular.html`, marcando el inicio de la nueva estructura.

## 🚀 Próximos Pasos Recomendados para el USER
- **Sprint Pre-Beta completado (2026-06-25):** v52 archivado, SW actualizado, game.js parcheado, ui.js auditado.
- Invocar al **Agente Tester (QA)** para ejecutar Suites 6, 7 y 8 definidas en su memoria y certificar experiencia offline completa.
- Una vez certificado, proceder con el empaquetado estable `v51-beta-<fecha>` a cargo del Agente Release.
- Agentes Growth y Psicopedagogo pueden iniciar sus tareas en paralelo al testing.

## 🚨 REPORTE DE QA TESTER (2026-06-20)
**Estado de Campaña Tier 1 (v51/v52):**
- **T-01 a T-03, T-09, T-10:** ✅ PASS (Splash, Onboarding nativo, Main Menu, Tienda, Reporte Padres correctos).
- **BUG CRÍTICO-001:** ❌ FAILED T-04 (crash `TypeError: countOverlay.showModal is not a function`). Bloquea T-05 a T-08.
- **Causa:** `countOverlay` no fue migrado a `<dialog>`, sigue siendo un `<div>` en el HTML, pero `ui.js` intenta usar la API nativa Dialog.
- **Acción Tomada:** Instrucción enviada a la memoria del Agente Arquitecto para fix inmediato (cambio de tag HTML y método de cierre). QA pausado.

## 🧠 REPORTE PEDAGÓGICO Y DELEGACIÓN DE TAREAS (2026-06-26)
**Origen:** Auditoría del Agente Psicopedagogo.
**Motivo:** Textos de UI con alta carga cognitiva y sesgo punitivo/estresante para niños de 6-7 años.

### 🛠️ Tareas para el Agente ARQUITECTO
1. **Modificar `v51_modular.html` (Popups):**
   - **`introPopup` (Guía Rápida):** Eliminar el bloque de texto largo y complejo. Reemplazarlo por frases ultra cortas (ej. "¡Toca la respuesta correcta!", "¡Gana estrellas!"). Eliminar las menciones a "asustar al panda" y "gatos locos/ladrones" en esta etapa inicial.
   - **`quitConfirmPopup`:** Cambiar el texto `"Perderás tu racha actual de X 🔥"` por `"¿Quieres descansar? Tu progreso está guardado."` para eliminar la culpa.
   - **`statsOverlay` (Destrezas):** Cambiar `"Empiezas al 100%. Fallar resta %, acertar recupera."` por `"¡Mira todo lo que has aprendido! Juega más para llenar tus barras."` (Enfoque positivo).
2. **Funcionalidad de Audio (Accesibilidad):**
   - Planificar e integrar un sistema de "Texto a Voz" (TTS) básico o alertas de audio cálidas que guíen al niño, ya que su nivel de lectura está en desarrollo.

### 🎨 Tareas para el Agente DISEÑO
1. **Apoyo Visual en Popups:** 
   - Rediseñar la estructura del `introPopup` en CSS/HTML para soportar un tutorial visual (iconos grandes, layout secuencial).
2. **Mitigación de Estrés Visual:**
   - Confirmar en el CSS y animaciones que el feedback de error (ej. animaciones de pantalla o del panda) sea suave y no genere ansiedad (evitar rojos puros intermitentes o shakes violentos).

### 📝 Tareas para el Agente CONTENIDO
1. **Revisión de Feedback:**
   - Ajustar los JSONs o diccionarios de texto para garantizar que todo el feedback sea alentador. (Acierto: "¡Excelente!", "¡Eres muy inteligente!". Error: "¡Casi!", "¡Inténtalo otra vez!").

---

## 🛠️ Avances Realizados (2026-06-26) - EJECUCIÓN DIRECTA
1. **Modificación de Popups (Cumplimiento Pedagógico):**
   - El Consultor Externo (yo) ejecutó directamente la modificación de `v51_modular.html` para cumplir con las directrices del Psicopedagogo.
   - **`introPopup`:** Textos largos eliminados. Reemplazados por frases ultra cortas ("¡Toca la respuesta correcta!", "¡Gana estrellas!"). Eliminadas menciones punitivas a "gatos locos/ladrones".
   - **`quitConfirmPopup`:** Reemplazado "Perderás tu racha actual de X 🔥" por "¿Quieres descansar? Tu progreso está guardado. 🌟", manteniendo el span oculto para evitar errores JS.
   - **`statsOverlay`:** Cambiado el texto a "¡Mira todo lo que has aprendido! Juega más para llenar tus barras."
   - **Estado:** ✅ Completado y delegado al Arquitecto/Diseño para validación visual.

---

## 🛠️ Avances Realizados (2026-06-27) - POSTERGACIÓN DE RELEASE Y QA FINAL
1. **Delegación de Pruebas Críticas al Agente Tester:**
   - Se instruyó al Agente Tester (en su memoria `tester.md`) la ejecución de la **Suite 9 (Pruebas Especiales Pre-Beta)**, la cual abarca:
     - T-22: Estrés Offline (DevTools).
     - T-23: Fallback Tipográfico (sin conexión).
     - T-24: Persistencia Local (LocalStorage Kill).
   - **Estado:** ⏳ Pendiente de ejecución por parte del Tester.

2. **Estado de Fase de Lanzamiento (Release):**
   - El USER determinó que **aún no estamos listos para iniciar las operaciones del Agente Release**.
   - **Motivo:** Faltan afinar diversos detalles de Diseño. La fase de empaquetado (Capacitor/PWA) queda en pausa hasta que el Agente Diseño y el Agente Gráfico den por concluida la estética de la versión 1.0 (Tier 1).

3. **Distribución de Tareas del Informe Comparativo Estratégico:**
   - Se integraron formalmente en las memorias de los agentes las directivas derivadas del análisis comparativo global:
     - `arquitecto.md`: Algoritmo HLR/Spaced Repetition en `localStorage`, comodines de riesgo e importación offline "KitCollab".
     - `contenido.md`: Etiquetado por Objetivos de Aprendizaje (OA Mineduc) y refinamiento de feedback positivo.
     - `psicopedagogo.md`: Evaluación pedagógica de la economía de riesgo.
     - `growth.md`: Estrategia comercial "Ataque a la Brecha Kahoot!" y cumplimiento COPPA/GDPR-K.
   - **Estado:** ✅ Registrado y notificado a los agentes.

## 🚀 NUEVA DELEGACIÓN: Reestructuración de Comodines (2026-06-27)
**Origen:** Evaluación del Agente Psicopedagogo sobre la "Economía de Riesgo".
**Motivo:** Evitar frustración y penalización severa en niños de 6-7 años, transformando los comodines en herramientas de apoyo positivo.

### 🛠️ Tareas para el Agente ARQUITECTO
1. **Comodín "Doble o Nada" → "Bonus Valiente":**
   - **Lógica JS:** Modificar la mecánica de este power-up en `js/game.js` (y `js/store.js` / `js/ui.js` si aplica). Si el niño acierta la pregunta, gana el doble de estrellas. Si falla, **obtiene 1 estrella por intentarlo** (se elimina completamente la pérdida de estrellas o el "nada").
   - **Textos UI:** Actualizar los nombres y descripciones en la Tienda y en el juego a "Bonus Valiente" o "Pregunta Estrella".
2. **Comodín "Escudo de Racha" → "Escudo Mágico":**
   - **Textos UI:** Renombrar el comodín a "Escudo Mágico". El texto de feedback debe enfatizar la seguridad ("¡Estás protegido! No pasa nada si te equivocas.").
3. **Progresión (Opcional):**
   - Si la arquitectura lo soporta, bloquear la compra/uso de comodines hasta desbloquear el Mundo 2 para no sobrecargar de reglas el Mundo 1.

### 🎨 Tareas para el Agente DISEÑO
1. **Feedback Visual del "Escudo Mágico":**
   - Crear o ajustar la clase CSS (ej. `.shield-aura` en `v51_modular.html` / `css/game.css`) para que el escudo alrededor de la mascota sea un campo de fuerza de colores pastel suave y amigable, alejándose de estéticas bélicas o agresivas.
2. **Iconografía de la Tienda:**
   - Asegurarse de que el botón de compra del "Bonus Valiente" en la Tienda refleje positividad (estrella brillante, trofeo) y no un concepto de apuesta. Coordinar con el Agente Gráfico si se requiere un nuevo WebP.
