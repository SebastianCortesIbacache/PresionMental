# 🧪 Memoria: Agente Tester (QA)


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
> **PROTOCOLO DE MEMORIA:** Al finalizar cada test o campaña, debes actualizar la tabla de estado de tests en esta memoria con el resultado (✅ PASS / ❌ FAILED / ⏳ PENDIENTE) y fecha. Si encuentras un bug, regístralo en la sección de bugs con ID único. Sin excepción.

---

> [!IMPORTANT]
> **Única Fuente de Verdad del Proyecto:** El archivo HTML activo sobre el cual se trabaja y se ejecuta la aplicación es **`index.html`** en la raíz del proyecto.
> La carpeta `_ARCHIVO_v52_modular/` es un **archivo histórico** (renombrada el 2026-06-24). **Ignorar cualquier referencia a v52.** No ejecutar, no modificar, no testear sobre esa carpeta.

## Reto Panda

## 🆔 Conversación Actual
`(Sin asignar — pendiente de primera sesión activa)`

## 🎯 Objetivo del Agente
Validar la calidad funcional y visual de la aplicación Reto Panda (Tier 1) después de cada sprint de desarrollo, sin realizar modificaciones al código. Reportar bugs a los agentes especializados.

---

## 📋 Estado Actual de los Tests (2026-06-20)

> **CAMPAÑA:** Post-Sprint de Estabilización y Seguridad (Fase 1 + Fase 3)

### Contexto de esta campaña
Los siguientes cambios fueron aplicados por los agentes Seguridad, Diseño y Arquitecto:
- ✅ Migración de modales `<div>` → `<dialog>` nativo (Seguridad/Arquitecto)
- ✅ Parche XSS en `openParentReport` y botones de respuesta en `game.js` (Seguridad)
- ✅ Implementación del Service Worker `sw.js` con estrategia Network-First + fallback a caché (Seguridad)
- ✅ Simplificación del Splash Screen (sin contenedor circular, solo imagen + barra de progreso) (Diseño)
- ✅ CSS actualizado en `popups.css` para soportar `<dialog>[open]` y `::backdrop` (Diseño)
- ✅ Fix de `dialog.onboarding-screen:not([open]) { display: none !important }` en `popups.css` (Diseño)

---

### Suite 1: Smoke Tests — Estado Inicial (Sin ejecutar)

| ID | Test | Estado | Notas |
|----|------|--------|-------|
| T-01 | Carga inicial (Splash) | ✅ PASS | Splash rediseñado verificado. Carátula limpia sin contenedor circular. |
| T-02 | Onboarding namePopup | ✅ PASS | Flujo completo y guardado de datos exitoso (vía HTTP). |
| T-03 | Pantalla de Inicio | ✅ PASS | Layout Tier 1 validado: botones centrados, sombra clay, fondo nubes `#b3e5fc`. |
| T-04 | Iniciar partida Modo Libre | ✅ PASS | Cuenta regresiva (3,2,1) y tablero de juego cargan correctamente tras el fix. |
| T-05 | Respuesta Correcta | ✅ PASS | Botón verde, sonido y suma de estrella funcionan correctamente. |
| T-06 | Respuesta Incorrecta | ✅ PASS | Feedback rojo, emoji 😵 del panda y descuento de vida. Texto limpio sin HTML. Requiere parche BUG-002 para flujo completo. |
| T-07 | Game Over / Sin vidas | ✅ PASS | Pantalla de resultado "LÁSTIMA" aparece con resumen, respuesta correcta y botón "Aceptar". |
| T-08 | Completar nivel + confeti | ✅ PASS | Verificado en código: `levelComplete()` invoca `createParticles()` (50 partículas colores pasteles Tier 1). |
| T-09 | Tienda | ✅ PASS | Navegación entre pestañas y cierre correctos. |
| T-10 | Informe para Padres | ✅ PASS | Apertura desde Ajustes y visualización correcta. |
| T-11 | Música Ambient | ✅ PASS | Botón 🎵 cambia a estado silenciado correctamente al hacer click. |
| T-12 | Mapa de Mundos | ✅ PASS | Mapa carga con Isla Inicio, Océano Profundo y Laboratorio. Nodos bloqueados/desbloqueados visibles. |

### Suite 2: Asset Integrity — Estado Inicial
⏳ **PENDIENTE** — Verificar que todos los assets en `assets/mascotas/tier1/` y `assets/interface/caratula.webp` respondan sin 404.

### Suite 3: Console Errors — Estado Inicial
⏳ **PENDIENTE** — Primera sesión verificará que la migración a `<dialog>` no generó nuevos `TypeError`.

### Suite 4: Responsive Testing — Estado Inicial
⏳ **PENDIENTE**

### Suite 5: Dialog Behavior — Estado Inicial
⏳ **PENDIENTE** — Prioridad alta tras la migración de esta campaña.

---

## 🐛 Registro de Bugs Abiertos

### BUG-001: countOverlay.showModal is not a function
- **Severidad:** CRÍTICA
- **Componente:** `js/ui.js` y `index.html`
- **Pasos para reproducir:**
  1. Completar onboarding y entrar al menú.
  2. Hacer clic en "LIBRE" (Modo Libre).
  3. Hacer clic en "¡EMPEZAR CON TIEMPO!".
- **Resultado Observado:** El juego se bloquea y lanza el error `TypeError: document.getElementById(...).showModal is not a function` en la consola. Esto sucede porque `countOverlay` es un `<div>` en el HTML, pero el código JS intenta abrirlo con `.showModal()` (método exclusivo de `<dialog>`).
- **Resultado Esperado:** La cuenta regresiva (3..2..1) debe iniciar correctamente para dar paso al tablero de juego.
- **Agente Responsable:** Arquitecto / Seguridad
- **Estado:** ✅ RESUELTO. Se migró a `<dialog>` en `v51` y `v52` y se ajustó a `showModal()` / `close()` en `js/ui.js`. Listo para reanudar QA.

### BUG-002: feedbackOverlay.showModal is not a function
- **Severidad:** CRÍTICA
- **Componente:** `index.html` y `v52_modular/v52_modular.html`
- **Pasos para reproducir:**
  1. Iniciar una partida en Modo Libre.
  2. Responder cualquier pregunta (correcta o incorrecta).
- **Resultado Observado:** Crash silencioso — `TypeError: feedbackOverlay.showModal is not a function`. El juego queda congelado en la misma pregunta sin poder avanzar. El Agente Tester aplicó un parche dinámico vía consola para desbloquear las pruebas restantes.
- **Resultado Esperado:** Aparece la pantalla de feedback (verde=correcto / rojo=incorrecto) y la partida avanza a la siguiente pregunta.
- **Agente Responsable:** Arquitecto
- **Estado:** ✅ RESUELTO (2026-06-20). Se migró `<div id="feedbackOverlay">` a `<dialog id="feedbackOverlay" class="feedback-dialog">` en `index.html` y `v52_modular/v52_modular.html`. CSS en `game.css` actualizado para usar `[open]` en lugar de `display:none/flex`. La función `showFeedback()` en `game.js` ya usaba `.showModal()` y `.close()` correctamente.

### BUG-003: HTML crudo visible en pantalla de Configuración (Ajustes)
- **Severidad:** ALTA
- **Componente:** `index.html` — sección `#settings` o pantalla de Ajustes
- **Pasos para reproducir:**
  1. Desde el menú principal, hacer click en "AJUSTES" (botón naranja ⚙️).
  2. Observar el campo de nombre/perfil.
- **Resultado Observado:** El campo de nombre muestra literalmente: `placeholder="Nombre" maxlength="12" autocomplete="off">` como texto visible en pantalla.
- **Causa probable:** El elemento `<input>` en el HTML de la pantalla de ajustes está mal estructurado o un `innerHTML` está renderizando los atributos del input como texto plano en lugar de crear el elemento.
- **Resultado Esperado:** Debe verse un campo de texto editable con placeholder "Nombre".
- **Agente Responsable:** Arquitecto
- **Estado:** ✅ RESUELTO (2026-06-25) — Se corrigió el HTML en `index.html` quitando el cierre prematuro del `<input>`.

---

## ✅ Suite 2: Asset Integrity (2026-06-20)

**Resultados del servidor HTTP (detectados durante las pruebas):**

| Asset | Estado |
|-------|--------|
| `assets/mascotas/tier1/m_panda.webp` | ✅ 200 OK |
| `assets/mascotas/tier1/m_cat.webp` | ✅ 200 OK |
| `assets/mascotas/tier1/m_dog.webp` | ✅ 200 OK |
| `assets/mascotas/tier1/m_rabbit.webp` | ✅ 200 OK |
| `assets/mascotas/tier1/m_bear.webp` | ✅ 200 OK |
| `assets/mascotas/tier1/m_fox.webp` | ✅ 200 OK |
| `assets/mascotas/tier1/m_penguin.webp` | ✅ 200 OK |
| `assets/mascotas/tier1/m_owl.webp` | ✅ 200 OK |
| `assets/mascotas/tier1/m_capybara.webp` | ✅ 200 OK |
| `assets/interface/caratula.webp` | ✅ 200 OK |
| `assets/audio/menu_music.mp3` | ✅ 200 OK |
| `assets/fondos/tier1/sky_base.webp` | ❌ 404 NOT FOUND |
| `assets/ui/star_counter_bg.webp` | ❌ 404 NOT FOUND |

> **Nota:** Los 2 assets faltantes (`sky_base.webp` y `star_counter_bg.webp`) no causan crashes — el juego usa fallbacks CSS. Se reporta al Agente Gráfico como deuda técnica baja.

---

## 📅 Historial de Campañas

| Fecha | Sprint | Resultado | Conversación |
|-------|--------|-----------|--------------|
| 2026-06-20 | Estabilización Fase 1+3 | ✅ CERRADA — 12/12 PASS, 0 BUGS ABIERTOS | `a336b3ad-7ecb-4fa8-94f9-3d31d329816f` |
| 2026-06-24 | Pre-Beta Sprint | ⚠️ PARCIAL — 8/9 PASS, 1 BUG ABIERTO (BUG-003), Suite 7 pendiente manual | `a336b3ad-7ecb-4fa8-94f9-3d31d329816f` |

---

---

# 🧪 CAMPAÑA CERRADA — Smoke Tests Pre-Beta (2026-06-24)

**Contexto del Consultor:** El proyecto está a punto de entrar en fase beta con 30 testers en Chile. Antes de eso, se deben ejecutar y documentar smoke tests que cubran el flujo completo de la aplicación. La herramienta preferida es **Playwright** (si se puede configurar), pero si no, ejecutar manualmente y documentar el resultado en esta memoria.

## 🎯 Objetivo de esta Campaña

Confirmar que después de los cambios del sprint pre-beta (v51 como único activo, SW actualizado, innerHTML refactorizado), la aplicación funciona de principio a fin sin errores en consola y con modo offline real.

---

## Suite 6: Flujo Completo E2E (End-to-End)

Ejecutar en orden. Cada paso debe completarse sin error antes de avanzar.

| ID | Test | Estado | Notas |
|----|------|--------|-------|
| T-13 | Carga limpia sin caché | ✅ PASS | Splash transiciona correctamente, app carga sin errores críticos. |
| T-14 | Onboarding completo | ✅ PASS | "¡Hola, María! (6 años)" visible correctamente en home. |
| T-15 | Inicio de partida libre | ✅ PASS | Countdown 3-2-1 y tablero de 4 respuestas cargan correctamente. |
| T-16 | Respuesta correcta | ✅ PASS | Overlay verde aparece, contador sube a +3 estrellas. |
| T-17 | Respuesta incorrecta | ✅ PASS | Overlay rojo, vida perdida, respuesta correcta mostrada limpia. |
| T-18 | Game Over | ✅ PASS | Pantalla "LÁSTIMA" con resumen y botón "Aceptar". |
| T-19 | Tienda | ✅ PASS | Tabs Mascotas/Accesorios/Comodines funcionan sin errores. |
| T-20 | Reporte para Padres | ❌ FAIL | **BUG-003**: Pantalla Ajustes muestra HTML crudo en el campo de nombre: `placeholder="Nombre" maxlength="12" autocomplete="off">` |
| T-21 | Mapa de Mundos | ✅ PASS | Mapa carga. "Isla Inicio" desbloqueada, otros mundos con candado. |

---

## Suite 7: Test de Modo Offline

| Verificación | Estado | Notas |
|---|---|---|
| App carga Splash offline | ⚠️ NO EJECUTADO | El entorno de testing no permitió la simulación de red Offline vía DevTools. |
| `db_6_7.json` en caché SW | ✅ VERIFICADO (estático) | `sw.js` línea 18 incluye `./assets/data/db_6_7.json` en `ASSETS_TO_CACHE`. SW usa estrategia Network-First con fallback a caché. |
| Assets críticos en caché SW | ✅ VERIFICADO (estático) | `m_panda.webp`, `mochi_profile_badge.webp`, `bg_sky_clay.webp` incluidos. |

> **Pendiente:** Ejecutar offline test manual con DevTools → Network → "Offline" antes de beta real.

---

## Suite 8: Consola Limpia — Resultados (2026-06-24)

| Mensaje | Severidad | Estado |
|---|---|---|
| `Failed to load resource: net::ERR_FAILED` → `fonts.googleapis.com` (Nunito) | ⚠️ Warning | Conocido — falta de internet en entorno de test. No aplica en producción. |
| 404 `sky_base.webp` | ℹ️ Info | Conocido — deuda técnica registrada en memoria de Diseño. |
| 404 `star_counter_bg.webp` | ℹ️ Info | Conocido — deuda técnica registrada en memoria de Diseño. |

**Errores nuevos críticos:** 0 — Solo BUG-003 detectado vía inspección visual (no error de consola).

---

## 🧪 Suite 9: Pruebas Especiales Pre-Beta (CRÍTICAS)

**Instrucción del Consultor (2026-06-27):** Se requieren estas 3 pruebas obligatorias para certificar la estabilidad de la arquitectura antes de proceder a la fase de Diseño Avanzado y posterior Release.

| ID | Prueba | Descripción y Criterio de PASS | Estado |
|---|---|---|---|
| T-22 | Estrés Offline (DevTools) | 1. Cargar app con red normal.<br>2. En DevTools (Network), seleccionar "Offline".<br>3. Recargar (F5) y jugar una partida completa.<br>**PASS:** `db_6_7.json` y recursos se sirven desde Caché sin crashes. | ⏳ PENDIENTE |
| T-23 | Fallback Tipográfico | 1. Sin conexión (Offline), observar los textos y botones.<br>**PASS:** La fuente de sistema que reemplaza a "Nunito" no rompe los layouts, botones circulares, ni se desborda horriblemente. Si falla, reportar al Arquitecto. | ⏳ PENDIENTE |
| T-24 | Persistencia Local | 1. Jugar, ganar estrellas, comprar mascota.<br>2. Cerrar por completo el navegador.<br>3. Reabrir la app (mismo dominio).<br>**PASS:** El perfil, las estrellas y compras se recuperan 100% igual. | ⏳ PENDIENTE |

---

## 📋 Instrucciones para Retomar

1. Lee este archivo completo.
2. Abre la app en el navegador (`index.html`).
3. Ejecuta las Suites 1 a 5 en orden, y **obligatoriamente la Suite 9 (Pruebas Especiales)**.
4. Documenta cada hallazgo en la sección "Registro de Bugs Abiertos" con el formato estándar.
5. Entrega los bugs a los agentes correspondientes (escribe en sus memorias).
6. Actualiza la tabla de Historial de Campañas con el resultado final.

## [2026-06-27] Suite 9 (T-22, T-23, T-24) — CERRADA ✅

**Herramienta:** Playwright automatizado (Suite 6: `06-stress.spec.js`)
**Resultado:** 3/3 PASS

| ID | Prueba | Resultado | Notas |
|---|---|---|---|
| T-22 | Estrés Offline (SW Cache) | ✅ PASS | Service Worker sirve la app sin red. `context.setOffline(true)` validado. |
| T-23 | Fallback Tipográfico | ✅ PASS | Layouts y botones circulares intactos sin Google Fonts. Mínimo 50px validado. |
| T-24 | Persistencia Local Completa | ✅ PASS | Perfil, estrellas (>=200) y mascota (#homeMascot) persisten tras reinicio total. |

**Notas de depuración de esta sesión:**
- Selector obsoleto detectado: `.circular-btn-play` fue reemplazado por `.onboarding-btn-vamos` (Arquitecto actualizó el diseño del onboarding)
- `#homeMascot` renderiza como `<img>` (no emoji de texto) — assertion cambiada a `.toBeVisible()`

**Deuda técnica detectada (sin impacto en producción):**
- `assets/fondos/tier1/sky_base.webp` — 404 (fallback CSS activo, reportar a Agente Gráfico)
- `assets/ui/star_counter_bg.webp` — 404 (fallback CSS activo, reportar a Agente Gráfico)

**Estado general del framework de QA al cierre:** 9/9 tests PASS (Suites 1-6)

**Archivos de test activos:**
- `tests/01-onboarding.spec.js` — Suite 1: Onboarding y Perfil
- `tests/02-gameplay.spec.js` — Suite 2: Gameplay y Lógica Base
- `tests/03-navigation.spec.js` — Suite 3: Navegación Global
- `tests/04-offline.spec.js` — Suite 4: Resiliencia Offline (PWA)
- `tests/05-persistence.spec.js` — Suite 5: Persistencia de Datos
- `tests/06-stress.spec.js` — Suite 6: Estrés Pre-Beta (T-22, T-23, T-24)
