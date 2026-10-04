# 🛡️ Memoria: Agente Seguridad (PANDA-SHIELD)


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
> **PROTOCOLO DE MEMORIA:** Cada vez que completes una auditoría, parchees una vulnerabilidad o emitas un diagnóstico, debes añadir una entrada fechada en esta memoria con: hallazgo, acción tomada y estado resultante. Sin excepción.

---

> [!IMPORTANT]
> **Única Fuente de Verdad del Proyecto:** El archivo HTML activo sobre el cual se trabaja y se ejecuta la aplicación es **`index.html`**. 
> Cualquier otra variante o carpeta (como `v52_modular` o `v51_circular_backup`) son **únicamente respaldos y checkpoints anteriores y no deben modificarse ni ejecutarse**.


## 🆔 ID de Conversación Actual
`37336d21-7972-4f2f-bc16-3f9de59d7d5d`

## 🎯 Último Objetivo
Realizar diagnóstico completo de seguridad del proyecto "Presión Mental / Reto Panda" (v52), evaluar el estado de la arquitectura, manejo de datos y prevención de abusos, sin realizar cambios en código.

## 🛠️ Avances Realizados (2026-06-06)

**1. Auditoría de Arquitectura General:**
- **Tipo de Aplicación:** PWA / App móvil puramente cliente (Client-Side). Toda la lógica, puntajes y validaciones residen en el navegador/dispositivo. No se detectó comunicación con un backend activo para validación.
- **Base de Datos de Preguntas:** `questions_db.json` contiene más de 54,000 líneas. Todas las respuestas correctas se exponen directamente al cliente.

**2. Diagnóstico de Seguridad (Hallazgos Principales):**

| ID | Riesgo | Título | Descripción y Remediación Recomendada |
|---|---|---|---|
| SEC-01 | CRÍTICO | Cross-Site Scripting (DOM XSS) en UI | En `js/ui.js`, el `playerName` se inyecta directamente usando `innerHTML` en el DOM (ej. en `#home h3` y en el reporte para padres). Un payload malicioso (ej. `<img src=x onerror=alert(1)>`) en el nombre compromete la vista. **Remediación:** Usar `textContent` o `innerText` en lugar de `innerHTML` para inyectar datos del usuario. |
| SEC-02 | MEDIO | Abuso de Almacenamiento Local (MASVS-STORAGE) | El progreso (`pm_profile_v5`) se almacena en texto plano en `localStorage`. Cualquier usuario puede manipular sus estrellas (`score`), insignias o destrezas. **Remediación:** Para una app offline, aplicar ofuscación o una firma/checksum (HMAC) local para detectar alteraciones y evitar que se arruine la integridad del reporte para padres. |
| SEC-03 | MEDIO | Falta de Zero Trust en Lógica de Juego | Al estar toda la base de preguntas y la validación en el cliente (`js/game.js`), es trivial hacer trampa automatizando respuestas a través de la consola o inspeccionando la memoria. **Remediación:** Aceptar el riesgo por ser una PWA offline, o bien, si pasa a modelo online, mover la validación al servidor. |
| SEC-04 | BAJO | Falta de Validación de Input en Perfil | La función `saveSettings` y `saveProfile` permiten nombres en blanco o con caracteres extraños (aunque hay un maxlength de 12). **Remediación:** Agregar RegExp estricta (letras, espacios y números) antes de guardar. |

## 📋 Directivas Operativas del Consultor (2026-06-20)
**Estado:** ✅ COMPLETADO (2026-06-20)

**1. Robustecer Service Worker (sw.js) - Riesgo PWA:**
- **Acción Realizada:** Se modificó el evento `fetch` en `sw.js` añadiendo `if (!response.ok) throw new Error(...)` para garantizar que la estrategia *Network-First* caiga al caché (`.catch()`) frente a errores HTTP 404 o 500, asegurando la resiliencia offline.

**2. Parchear XSS Residual (game.js y ui.js) - Riesgo DOM XSS:**
- **Acción Realizada:** Se actualizó `game.js` para inyectar `qData.q` (texto de pregunta) y `a.t` (texto de respuestas) utilizando `textContent` en lugar de `innerHTML`, mitigando la posible inyección de código malicioso en caso de manipulación de la BD. `qData.m` (multimedia) conservó `innerHTML` al requerir parseo HTML por diseño.

**3. Validación de Input (ui.js/game.js) - Riesgo de Integridad de Datos:**
- **Acción Realizada:** Revisada. La función ya contenía la mitigación `replace(/[^A-Za-z0-9 ]/g, '')`, garantizando que el nombre del jugador se encuentra correctamente sanitizado (alfanumérico y espacios) antes de guardarlo en `localStorage`.

**4. Resolución de Riesgos de Manipulación Local (SEC-02 y SEC-03):**
- **Acción Realizada:** Riesgos registrados como "Riesgos Aceptados". El sistema de validación local (Client-Side) y el hash ligero (DJB2) se mantienen intactos por definición de la arquitectura offline de la app educativa.

*Nota: PANDA-SHIELD queda en standby a la espera de nuevos desarrollos por parte del Agente Diseño y Arquitecto para realizar una próxima revisión.*

---
# 🛡️ MISIÓN ACTIVA — Sprint Pre-Beta: Refactorizar innerHTML en `ui.js` (2026-06-24)

**Contexto del Consultor:** Una auditoría reciente detectó que `js/ui.js` contiene **20 instancias de `innerHTML`** y solo 12 de `textContent`. Tu misión es auditar cada instancia y eliminar las que inyectan contenido dinámico (datos del usuario o de la DB).

## Procedimiento de Auditoría

1. **Abre `js/ui.js`** y usa búsqueda global de `.innerHTML =` y `.innerHTML +=`.
2. Para cada instancia, clasifícala en una de estas categorías:

| Categoría | Criterio | Acción |
|-----------|----------|--------|
| 🔴 **RIESGO** | El valor viene de `localStorage`, input del usuario o la DB de preguntas | Reemplazar por `textContent` o construcción DOM segura |
| 🟡 **REVISAR** | El valor viene de una variable que puede ser manipulada indirectamente | Evaluar caso por caso y documentar |
| 🟢 **ACEPTADO** | El valor es una constante hardcodeada en el propio JS | Añadir comentario `// XSS-ACCEPTED: constante interna` |

## Puntos de Atención Específicos (del Consultor)

Prioriza revisar estas funciones en `ui.js`:
- **Reporte para padres / `openParentReport()`**: Según el diagnóstico SEC-01 anterior, `playerName` se inyecta con `innerHTML` en el reporte. Aunque ya fue parcialmente parchado, verifica que el nombre del jugador use `textContent` en TODOS los lugares del reporte, no solo en el heading principal.
- **`refreshHome()`** o equivalente: El nombre del jugador suele mostrarse en el saludo de la pantalla de inicio (ej. "¡Hola, Juanito!"). Verificar que use `textContent`.
- **Cualquier función que construya HTML de tienda o insignias** usando datos del perfil: Verificar que los datos del perfil (nombre, score) pasen por `textContent` y no `innerHTML`.

## Formato de Reporte

Al terminar, añade una sección en esta memoria con el siguiente formato:

```
## ✅ Auditoría innerHTML ui.js (FECHA)
Total instancias revisadas: XX
🔴 Riesgo eliminado: XX
🟡 Casos revisados y documentados: XX  
🟢 Aceptados como constantes internas: XX
Notas adicionales: ...
```

## Regla de Coordinación

- Si encuentras un `innerHTML` que requiere HTML complejo (ej. tarjetas de tienda con imagen + texto), **coordina con el Agente Arquitecto** para crear un helper de DOM seguro (`createElement` + `appendChild`) en lugar de template strings HTML.
- Si el Arquitecto ya marcó algún caso como `// XSS-ACCEPTED`, **no lo toques**, solo regístralo en tu reporte.

---
*Instrucción emitida por el Consultor el 2026-06-24.* ✅ **COMPLETADA (2026-06-24)**

## ✅ Auditoría innerHTML ui.js (2026-06-24)
Total instancias revisadas: 17
🔴 Riesgo eliminado: 1 (Línea 890: `explainMsg` usaba innerHTML con contenido dinámico que puede venir de DB. Modificado a `textContent`).
🟡 Casos revisados y documentados: 1 (`homeMascot` inyecta ID de mascota como `src` de imagen. Aceptado por bajo riesgo al no ser texto directo y estar ligado a IDs específicos).
🟢 Aceptados como constantes internas: 15 (Traducciones `t.xxx`, `MISSION_SETS`, `BADGES`, `SKILLS_META`, elementos de la UI hardcodeados como `splashMsg` y etiquetas generadas a nivel código. Se documentaron en `ui.js` con el comentario `// XSS-ACCEPTED: constante interna`).
Notas adicionales: El reporte para padres (`openParentReport`) y el Header (`refreshHome`) ya estaban sanitizados con `textContent` y `createElement` desde revisiones previas o modificaciones del Arquitecto. No hay riesgo de XSS al cambiar el `playerName`.
