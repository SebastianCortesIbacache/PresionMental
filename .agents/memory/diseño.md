# 🎨 Memoria: Agente Diseño


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
> **PROTOCOLO DE MEMORIA:** Cada vez que apliques un cambio CSS, corrijas un componente o entregues un asset, añade una entrada fechada en esta memoria con: qué archivo/componente modificaste, el tier afectado y el resultado. Sin excepción.

---

> [!IMPORTANT]
> **Única Fuente de Verdad del Proyecto:** El archivo HTML activo sobre el cual se trabaja y se ejecuta la aplicación es **`v51_modular.html`**. 
> Cualquier otra variante o carpeta (como `v52_modular` o `v51_circular_backup`) son **únicamente respaldos y checkpoints anteriores y no deben modificarse ni ejecutarse**.

## Ã°Å¸â€ â€� ID de ConversaciÃƒÂ³n Actual

`92aea549-02a8-4539-8bf7-1496d6947a72`

## Ã°Å¸Å½Â¯ ÃƒÅ¡ltimo Objetivo

Finalizar la arquitectura visual modular y supervisar la producciÃƒÂ³n segmentada de activos para los "Vivid Tiers", garantizando que cada grupo de edad tenga su identidad estÃƒÂ©tica ÃƒÂºnica.

## Ã°Å¸â€ºÂ Ã¯Â¸ï¿½ Avances Realizados

- **AuditorÃƒÂ­a Visual Segmentada:** Se ha finalizado la auditorÃƒÂ­a de 629 activos de trivia, ahora divididos en 3 archivos de prompts especÃƒÂ­ficos por Tier.

- **Framework CSS Modular:** Implementado en `/css/` con soporte para `.age-tier-1`, `.age-tier-2` y `.age-tier-3`.
- **Componente de Imagen:** Definido el contenedor `.question-image-wrapper` con variantes de borde y efectos.

## Ã°Å¸â€œâ€¹ Requerimientos TÃƒÂ©cnicos - Modelo Modular

1. **SeparaciÃƒÂ³n Estricta:** NO inyectar estilos `<style>` ni atributos `style="..."` en el HTML. Se han creado utilidades en `base.css` para este propÃƒÂ³sito.

2. **Estructura de Archivos:**

   - `css/variables.css`: Tokens de diseÃƒÂ±o.
   - `css/base.css`: Estilos base y utilidades (.flex-1, .m-0, etc).

   - `css/layout.css`: Estructura de pantallas y headers.
   - `css/components.css`: Componentes del juego y variantes de tier.

   - `css/popups.css`: Ventanas emergentes y superposiciones.
   - `css/tiers/tier1.css`, `tier2.css`, `tier3.css`: Estilos especÃƒÂ­ficos por edad.

3. **Selectores de Tier:** Usa siempre `body.age-tier-X` como selector raÃƒÂ­z.
4. **Estado de RefactorizaciÃƒÂ³n:** Ã¢Å“â€¦ 100% COMPLETADO. El HTML es estructural.

## Ã°Å¸Å½Â¯ Referencias Visuales Objetivo (Vivid Tiers)

1. **Tier 1 (6-7 aÃƒÂ±os):** `Tier 1.jpg` - Claymorphism.

2. **Tier 2 (8-10 aÃƒÂ±os):** `Tier 2.jpg` - Retrowave.
3. **Tier 3 (11-13 aÃƒÂ±os):** `Tier 3.jpg` - Cyberpunk.

### Ã°Å¸â€œâ€¹ AuditorÃƒÂ­a Funcional (v51_modular.html) - NUEVOS BUGS (2026-05-15)
# Ã°Å¸Å½Â¨ Memoria: Agente DiseÃƒÂ±o

## Ã°Å¸â€ â€� ID de ConversaciÃƒÂ³n Actual

`92aea549-02a8-4539-8bf7-1496d6947a72`

## Ã°Å¸Å½Â¯ ÃƒÅ¡ltimo Objetivo

Finalizar la arquitectura visual modular y supervisar la producciÃƒÂ³n segmentada de activos para los "Vivid Tiers", garantizando que cada grupo de edad tenga su identidad estÃƒÂ©tica ÃƒÂºnica.

## Ã°Å¸â€ºÂ Ã¯Â¸ï¿½ Avances Realizados

- **AuditorÃƒÂ­a Visual Segmentada:** Se ha finalizado la auditorÃƒÂ­a de 629 activos de trivia, ahora divididos en 3 archivos de prompts especÃƒÂ­ficos por Tier.

- **Framework CSS Modular:** Implementado en `/css/` con soporte para `.age-tier-1`, `.age-tier-2` y `.age-tier-3`.
- **Componente de Imagen:** Definido el contenedor `.question-image-wrapper` con variantes de borde y efectos.

## Ã°Å¸â€œâ€¹ Requerimientos TÃƒÂ©cnicos - Modelo Modular

1. **SeparaciÃƒÂ³n Estricta:** NO inyectar estilos `<style>` ni atributos `style="..."` en el HTML. Se han creado utilidades en `base.css` para este propÃƒÂ³sito.

2. **Estructura de Archivos:**

   - `css/variables.css`: Tokens de diseÃƒÂ±o.
   - `css/base.css`: Estilos base y utilidades (.flex-1, .m-0, etc).

   - `css/layout.css`: Estructura de pantallas y headers.
   - `css/components.css`: Componentes del juego y variantes de tier.

   - `css/popups.css`: Ventanas emergentes y superposiciones.
   - `css/tiers/tier1.css`, `tier2.css`, `tier3.css`: Estilos especÃƒÂ­ficos por edad.

3. **Selectores de Tier:** Usa siempre `body.age-tier-X` como selector raÃƒÂ­z.
4. **Estado de RefactorizaciÃƒÂ³n:** Ã¢Å“â€¦ 100% COMPLETADO. El HTML es estructural.

## Ã°Å¸Å½Â¯ Referencias Visuales Objetivo (Vivid Tiers)

1. **Tier 1 (6-7 aÃƒÂ±os):** `Tier 1.jpg` - Claymorphism.

2. **Tier 2 (8-10 aÃƒÂ±os):** `Tier 2.jpg` - Retrowave.
3. **Tier 3 (11-13 aÃƒÂ±os):** `Tier 3.jpg` - Cyberpunk.

### Ã°Å¸â€œâ€¹ AuditorÃƒÂ­a Funcional (v51_modular.html) - NUEVOS BUGS (2026-05-15)

- [x] **Bug CrÃƒÂ­tico 4 (Tiers VacÃƒÂ­os)**: Implementados `css/tiers/tier1.css` y `css/tiers/tier2.css` (Claymorphism y Retrowave) y actualizados selectores (`.age-tier-X body`) para apuntar al `documentElement` modificado por el loader en head.

- [x] **PrevenciÃƒÂ³n de FOUC**: Cambiado `document.body` por `document.documentElement` en `applyAgeTier` (js/ui.js) para que coincida con la inyecciÃƒÂ³n temprana en el `<head>`. Ajustados selectores de tier en los CSS para `html.age-tier-X`.
- [x] **Botones Dificultad inline**: Creadas las clases `.t-cat` y `.t-dif-btn` en `css/components.css`. Reemplazado el CSS inline directamente en `js/ui.js` para agilizar.

### Ã°Å¸Å¡Â¨ DIRECTIVA CRÃƒï¿½TICA (NUEVO ENFOQUE - 2026-05-17) Ã¢â‚¬â€� Ã¢Å“â€¦ EJECUTADA 2026-05-18

Por decisiÃƒÂ³n de Jefatura de Proyecto, **el lanzamiento inicial se centrarÃƒÂ¡ ÃƒÅ¡NICAMENTE en el TIER 1**. Los Tiers 2 y 3 quedan en *standby* para versiones futuras.

**Estado de Acciones:**
- [x] **`css/tiers/tier1.css`** Ã¢â‚¬â€� Reescritura completa. Claymorphism 100% pulido:
  - Fondo: gradiente cielo `#b3e5fc Ã¢â€ â€™ #e1f5fe` con nubes animadas CSS
  - Botones circulares clay (colores pasteles, sombra `0 8px 0`, press `translateY(5px)`)
  - Respuestas: blancas redondeadas (`border-radius: 28px`)
  - Popups/paneles: blancos con sombra suave
  - Splash, resultado, misiones, tienda Ã¢â‚¬â€� todo adaptado a Clay World
  - TipografÃƒÂ­a: `Nunito 800/900`, sin mayÃƒÂºsculas, sin letter-spacing
  - Selector: `html.age-tier-1` (alineado con el loader del `<head>`)
- [x] **`css/variables.css`** Ã¢â‚¬â€� Variables Tier 1 actualizadas a paleta Clay World exacta (de spec agente-diseÃƒÂ±o.md)
- [x] **`css/components.css`** Ã¢â‚¬â€� Soporte extendido para mascotas como `<img>` estÃƒÂ¡tica: `.pet-emoji img`, `.hub-mascot img`, `.mascot img`, `.shop-preview-mascot img`, `.result-icon img`, `.avatar-stack`
- [x] **`css/tiers/tier2.css`** y **`tier3.css`** Ã¢â‚¬â€� Comentarios de aislamiento aÃƒÂ±adidos. Confirmado que sus selectores (`.age-tier-2`, `.age-tier-3`) no interfieren con Tier 1 forzado.

**Pendiente (depende del Arquitecto):**
- El Arquitecto debe forzar `html.age-tier-1` en el `<html>` para testing de Tier 1 en la versiÃƒÂ³n de lanzamiento.
- Los 50 assets de imagen (10 mascotas x 5) deben guardarse en `assets/mascotas/tier1/` y los accesorios en `assets/accesorios/`.

### Ã°Å¸Å’â‚¬ DIRECTIVA DE COHERENCIA VISUAL Y TRANSICIÃƒâ€œN "AGUJERO NEGRO" (NUEVO - 2026-05-20) Ã¢â‚¬â€� Ã¢Å“â€¦ EJECUTADA 2026-05-22

El USER aprobÃƒÂ³ el plan de unificaciÃƒÂ³n visual de la Splash Screen (`#splash`) con el Portal de Bienvenida (`#namePopup`) y el efecto de colapso gravitatorio.

**Avances Implementados:**
1. **UnificaciÃƒÂ³n EstÃƒÂ©tica de Carga (#splash):** Estructura en `v51_modular.html` y estilos en `css/layout.css` unificados con los anillos concÃƒÂ©ntricos cian-magenta-dorado y la imagen WebP de Mochi animada. Barra chunky con gradiente arcoÃƒÂ­ris.
2. **Indicadores de Mundos:** Clases `.active-world` y `.completed-world` con glow individual.
3. **Colapso e EyecciÃ³n:** `@keyframes singularityCollapse`, `@keyframes spaceWarp` y `@keyframes portalExpansion` vinculados correspondientemente para el efecto de agujero negro + destello blanco transicional (`#flashOverlay.flash-active`).
4. **Accesibilidad (Reduced Motion):** AÃ±adido media query `@media (prefers-reduced-motion: reduce)` en `css/popups.css` que simplifica todas las animaciones y la transiciÃ³n fÃ­sica a desvanecimientos (`fade-in`/`fade-out`) sin giros ni escalas bruscas.

---
*Actualizado el 2026-05-22 por Consultor Externo (Antigravity)*



### âš ï¸� CORRECCIONES DE AUDITORÃ�A EXTERNA (NUEVO - 2026-05-30) â€” âœ… EJECUTADAS 2026-05-30
- [x] **Duplicidad de Clases:** Se eliminaron las clases `.streak-almost` y `.streak-fail` de `css/game.css`, centralizando sus animaciones y propiedades en `css/states.css` para evitar conflictos de sobreescritura.
- [x] **Accesibilidad y Movimiento:** AÃ±adida la directiva global `@media (prefers-reduced-motion: reduce)` en `css/states.css` para desactivar o suavizar animaciones crÃ­ticas al detectarse la preferencia del sistema.
- [x] **Compatibilidad y Limpieza en base.css:** AÃ±adido el prefijo `-webkit-user-select` para soporte nativo de Safari/iOS, y eliminado el bloque vacÃ­o y obsoleto `body.theme-light, body.theme-dark` para resolver warnings de validaciÃ³n de CSS.
- [x] **Orden de Reglas en popups.css:** Reordenados los pares de reglas de `backdrop-filter` para listar el prefijo propietario `-webkit-backdrop-filter` antes de la propiedad estÃ¡ndar `backdrop-filter`, resolviendo las advertencias del validador CSS.

### ðŸŽ¨ REDISEÃ‘O FIEL AL TIER 1 (NUEVO - 2026-05-30) â€” âœ… EJECUTADO 2026-05-30
- [x] **Nubes 3D VolumÃ©tricas Animadas:** Implementado un sistema dinÃ¡mico multi-capa `#bgClouds` con 6 nubes orgÃ¡nicas SVG que flotan horizontalmente de forma asÃ­ncrona mediante keyframes CSS con filtros specularLighting, sombras de arcilla azul y deriva de viento continua.
- [x] **Botones Flotantes de Sonido:** Relocalizados los controles `#ambientBtn` (MÃºsica) y `#audioBtnGlobal` (Efectos) en la esquina inferior izquierda, diseÃ±ados con estÃ©tica squircular con bordes blancos gruesos, fondos sÃ³lidos violeta/cyan, contornos 3D y especularidad claymÃ³rfica.
- [x] **MenÃº Circular Claymorphic:**
  - Anillo de uniÃ³n: RediseÃ±ado el dotted connector `.circular-menu::before` con un patrÃ³n de esferas 3D de algodÃ³n en fila, sombreadas y texturizadas vÃ­a SVG filter.
  - Botones circulares: Se les dotÃ³ de bordes blancos de 6px, contorno sÃ³lido exterior del color del tema y un doble brillo interno (sombra superior blanca semi-transparente e inferior oscura), recreando la profundidad de la plastilina.
  - Burbuja central de Panda: El `.hub-mascot-container` fue estilizado como una burbuja pomposa tridimensional usando gradiente radial, brillo superior de 8px e iluminaciones exteriores cian suave.
  - Iconos 3D WebP: Vinculados los 6 iconos 3D desde `assets/iconos/` (icon_mapa, icon_libre, etc.) mediante propiedades CSS puras.
- [x] **Contador de Estrellas Clay:** RediseÃ±ado el `.star-showcase` superior derecho como una pÃ­ldora chunky amarilla-naranja con bordes blancos de 5px, sombra 3D inferior y un sol/estrella dinÃ¡mico con animaciÃ³n `pulseSun`.
- [x] **Z-index de Botones de Sonido:** Ajustado el `z-index` de los botones `#ambientBtn` y `.audio-btn` a `80` para evitar solapes con modales y paneles en dispositivos mÃ³viles.

### ðŸŽ¨ INTEGRACIÃ“N DE ACTIVOS REALES WEBP TIER 1 (NUEVO - 2026-05-30) â€” âœ… EJECUTADO 2026-05-30
- [x] **AlineaciÃ³n EstÃ©tica al 100%:** Reemplazados los filtros SVG e inline shapes por los activos `.webp` transparentes generados por el Agente GrÃ¡fico.
- [x] **Nubes WebP:** Cargadas en `.bg-cloud.c1` a `.c6` desde `assets/fondos/tier1/cloud_clay{1,2,3}.webp` eliminando la carga de cÃ³digo vectorial y mejorando la performance.
- [x] **Fondos de Botones del MenÃº Circular:** Cargadas las imÃ¡genes de plastilina con doble borde blanco `bg_btn_[color].webp` en `.cb-1` a `.cb-6` con sombras e iluminaciÃ³n 3D pre-renderizada.
- [x] **Bolitas de AlgodÃ³n:** Implementada la imagen `cotton_chain.webp` como fondo del conector circular.
- [x] **Efecto de Burbuja de Mascota:** AÃ±adido un pseudoelemento overlay `::after` a `.hub-mascot-container` para colocar la burbuja pomposa transparente de agua `mascot_bubble.webp` sobre el panda.
- [x] **Controles de Audio de Arcilla:** Implementadas las imÃ¡genes de botones de mÃºsica/sonidos y sus estados muteados (`btn_music_clay.webp`, `btn_music_muted.webp`, etc.).
- [x] **Contador de Estrellas:** Aplicado el badge horizontal `star_counter_bg.webp` con una hendidura a la izquierda para el nÃºmero de estrellas.

*Actualizado el 2026-05-31 por el Agente DiseÃ±o*

## ðŸ“‹ TAREAS COMPLETADAS (2026-05-31)
- [x] **AlineaciÃ³n de Etiquetas en Botones Circulares:** Cambiado `.circle-btn` a `justify-content: flex-start` y aÃ±adido `padding-top: calc(var(--btn-sz) * 0.13)` con `box-sizing: border-box` en `css/tiers/tier1.css`.
- [x] **Contraste del Texto de Edad:** AÃ±adido `html.age-tier-1 .home-header-age span` con color `#5c3eb0 !important` y `opacity: 1 !important` en `css/tiers/tier1.css`.
- [x] **Contador de Estrellas:** Reajustado `.star-showcase` en `css/tiers/tier1.css` a `background-size: 100% 100%`, `135px` Ã— `48px`, y `display: flex; flex-direction: column; justify-content: center; align-items: flex-start; padding: 0 12px 0 50px;`.
- [x] **Fondo de Botones de Sonido:** AÃ±adido `-webkit-backdrop-filter: none !important; backdrop-filter: none !important;` a `#ambientBtn` y `#audioBtnGlobal` en `css/tiers/tier1.css` para eliminar el desenfoque cuadrado del fondo.



---

## ?? DIRECTIVA DE ASSETS DE INTERFAZ — BRIEFING PARA GRÁFICO (2026-05-31)

El Agente Gráfico necesita crear **4 assets en estilo Clay World (Tier 1)** que faltan en ssets/interface/. Tu rol es definir con exactitud el estilo visual esperado para cada uno, de modo que Gráfico pueda generarlos de forma coherente con el resto de la app.

### Especificaciones de Estilo Base (Aplica a los 4 assets)
- **Paleta:** Basada en las variables de Tier 1 (#b3e5fc, #FFD54F, #F48FB1, #A5D6A7, #90CAF9, blanco #FFFFFF)
- **Estética:** Claymorphism 3D. Colores suaves, bordes completamente redondeados, sombra inferior sólida que simula volumen de plastilina.
- **Fondo:** 100% transparente (canal alfa). NO fondo blanco ni gris.
- **Formato:** .webp con transparencia.
- **Uso:** Se insertan como <img> dentro de íconos esféricos (.icon-sphere) del popup de bienvenida.

---

### Asset 1: ssets/interface/icon_user.webp
**Uso en app:** Ícono dentro de la esfera azul del campo de nombre en el popup de onboarding.
**Dimensiones:** 52×52 px (se renderiza a 26×26 con object-fit: contain)
**Descripción visual:**
- Silueta de persona/avatar estilo "muñeco de nieve" en 3D clay.
- Cuerpo: círculo grande abajo (#90CAF9 azul claro) + círculo más pequeño arriba para la cabeza (mismo color o blanco).
- Sombra inferior sólida azul oscuro (#5b8fc9) de 4-5px simulando volumen.
- Sin detalles de cara. Forma muy simplificada y redondeada.
- Estilo idéntico al ícono de usuario de una app de niños de 6-7 años.

### Asset 2: ssets/interface/icon_age.webp
**Uso en app:** Ícono dentro de la esfera rosa del campo de edad en el popup de onboarding.
**Dimensiones:** 52×52 px
**Descripción visual:**
- Estrella de 5 puntas en 3D clay, color dorado-amarillo (#FFD54F).
- Sombra inferior sólida naranja (#e6a800) de 4-5px.
- Alternativa válida: un pequeño pastel de cumpleaños clay con velitas, colores pastel.
- Sin texto. Forma reconocible a simple vista como representación de "edad/año".

### Asset 3: ssets/interface/btn_vamos_icon.webp
**Uso en app:** Ícono dentro del botón "¡VAMOS!" del popup de onboarding.
**Dimensiones:** 56×56 px (se renderiza a 28×28)
**Descripción visual:**
- Un cohete pequeño en 3D clay apuntando hacia arriba-derecha (45°).
- Cuerpo del cohete: color cyan (#A5D6A7 o #90CAF9), nariz redondeada.
- Fuego de salida: pequeña llama naranja-amarilla (#FFD54F) en la base.
- Sombra inferior sólida correspondiente al color del cohete.
- Alternativa: un triángulo "play" ? pero muy redondeado y con efecto clay.

### Asset 4: ssets/interface/onboarding_panda.webp
**Uso en app:** Imagen central grande del splash screen de carga. Tiene fallback a ssets/mascotas/tier1/m_panda.webp.
**Dimensiones:** 200×200 px (se renderiza a 90-120px en pantalla)
**Descripción visual:**
- Panda Clay World de frente, estilo plastilina 3D.
- Colores: blanco/crema para cuerpo, manchas oculares negras suaves, mejillas rosadas (#F48FB1).
- Expresión: alegre, ojazos grandes brillantes, sonrisa simple.
- Postura: sentado, brazos levemente abiertos, como dando la bienvenida.
- Debe coincidir en estilo con m_panda.webp existente (mismo universo visual).
- Fondo 100% transparente.

---

### Instrucción para el Agente Gráfico
Una vez definidos los specs anteriores, dile al Gráfico:

> "Necesito que crees los siguientes 4 assets de interfaz en estilo **Clay World Tier 1** (plastilina 3D, colores pastel, sombra inferior sólida, fondo transparente):
>
> 1. ssets/interface/icon_user.webp (52×52) — Silueta de avatar clay azul
> 2. ssets/interface/icon_age.webp (52×52) — Estrella dorada clay o pastel de cumpleaños
> 3. ssets/interface/btn_vamos_icon.webp (56×56) — Cohete clay verde/cyan
> 4. ssets/interface/onboarding_panda.webp (200×200) — Panda clay sentado de frente
>
> Usa como referencia el estilo de las mascotas en ssets/mascotas/tier1/. El fondo debe ser 100% transparente. Guárdalos en la carpeta ssets/interface/."

---
*Actualizado el 2026-05-31 por el Consultor Externo (Antigravity)*

## 🎨 REDISEÑO TIER 1 - FIDELIDAD A REFERENCIA (2026-05-31) - COMPLETADO

El Consultor Externo y el USER han acordado reestructurar estéticamente el Tier 1 (Clay World) para alinearlo al 100% con `Tier 1.png`.

### Tareas de Diseño en `css/tiers/tier1.css` y `css/layout.css`:
1.  **Fondo de Nubes y Gotitas (Clay Drops):**
    *   Cambiar `background-image` en `html.age-tier-1` para que use `assets/fondos/tier1/bg_sky_clay.webp` en lugar de un gradiente CSS plano.
    *   Agregar estilos para las gotitas de arcilla `.clay-drop` (sombras interiores de oclusión y externas suaves) para darles volumen 3D.
    *   Agregar estilos para `.bg-cloud-border-top` y `.bg-cloud-border-bottom` para posicionar los bordes de nubes arriba y abajo en la pantalla (detrás del perfil del usuario y del contador de estrellas).
2.  **Rediseño del Menú Circular:**
    *   **Ocultar el conector de esferas:** Desactivar `.circular-menu::before { display: none !important; }`.
    *   **Panda Central Limpio:** Remover el fondo blanco, el borde doble y la burbuja de cristal overlay (`mascot_bubble.webp` via `::after`) en `.hub-mascot-container`.
    *   Dejar al Panda Mochi (`m_panda.webp`) flotando libremente en el centro con una sombra natural (`filter: drop-shadow(0 12px 20px rgba(0,40,90,0.18))`).
    *   **Etiquetas de Botones:** Ajustar `padding-top: calc(var(--btn-sz) * 0.11)` en `.circle-btn` para que el texto ("MUNDOS", "LIBRE", etc.) no se superponga con el borde de plastilina.
3.  **Botones de Sonido en Esquina:**
    *   Asegurar que `#ambientBtn` y `#audioBtnGlobal` se estilicen como squircles de arcilla (`btn_music_clay.webp` y `btn_sfx_clay.webp`) colocados en la esquina inferior izquierda.

---
*Actualizado el 2026-05-31 por el Consultor Externo (Antigravity)*

### Ajuste de Nubes y Bordes (2026-06-01):
*   Se eliminaron los marcos de nubes superior/inferior (`.bg-cloud-border-top` y `.bg-cloud-border-bottom`) por petición del USER, ya que generaban un patrón repetitivo confuso en los bordes.
*   Se incrementó el número de nubes flotantes a 12 (`c1` a `c12`) distribuidas por todo el viewport para cubrir mejor los espacios vacíos en pantallas anchas (tablets).

### Corrección del Menú Circular y Renderizado (2026-06-01):
*   **Posición Absoluta de Botones:** Se cambió la posición de los botones en `.circle-btn` de `position: relative !important` a `position: absolute !important` en `css/tiers/tier1.css`. Esto corrigió el error de distribución radial que los apilaba al fondo de forma desalineada y recortada.
*   **Fondo de Pantalla Completo:** Se eliminó `background-attachment: fixed !important` en `html.age-tier-1` para resolver el error de recorte del lienzo en Puppeteer y navegadores móviles.
*   **Ajuste del Radio de Texto Curvo SVG:** Se modificaron los paths curvos a un radio de 37 (`d="M 13,50 A 37,37 0 0,0 87,50"`) en `v51_modular.html` para centrar perfectamente el texto sobre el área de color del botón y evitar que roce con el borde exterior blanco.
*   **Separación de Letras (Letter Spacing) y Tipografía:** Se reajustó la tipografía del texto curvo (`font-size: 11.5px`, `letter-spacing: 0.13em`, `stroke-width: 2.8px`) en `css/tiers/tier1.css` para optimizar el espacio entre los caracteres y eliminar cualquier solapamiento, como el que ocurría en las letras "T" y "S" del botón "AJUSTES".
*   **Corrección del Contador de Estrellas (Star Showcase):** Se rediseñó el componente en el Tier 1 colocando el texto `"ESTRELLAS CONSEGUIDAS"` flotando arriba de la cápsula (`position: absolute; bottom: 43px; left: -20px; width: 150px`) y centrando el número de estrellas en color azul oscuro clay e incrementando su tamaño (`20px`) en la zona naranja de la cápsula. Las dimensiones físicas se optimizaron a `110px` x `40px` con `background-size: 100% 100%`.
*   **Tarjeta Contenedora de Nombre y Edad (Clay Badge):** Se implementó un diseño divertido de nametag estilo claymorfismo para la zona de perfil del usuario en la parte superior izquierda (`.home-top-bar > div:first-child`). Se agregaron bordes blancos de plastilina de `3.5px`, fondo blanco semitransparente, sombra clay, y se encapsuló la edad en una pastilla rosa clay.

---
*Actualizado el 2026-06-01 por el Agente Diseño*

---

## 🚨 AUDITORÍA COMPLETA — Directrices CSS/Responsive (2026-06-06)

El Consultor Externo realizó una auditoría exhaustiva y detectó los siguientes issues de responsividad y CSS que debe corregir el Agente Diseño:

### 🟠 ISSUE-01: Falta responsive para Tablet Portrait (600px–1023px)
- **Diagnóstico:** `components.css` no tiene **ninguna** media query. Solo `layout.css` tiene `@media (orientation: landscape)` y `tier1.css` tiene `@media (max-width: 480px)`.
- **En tablet portrait** (ej. iPad en vertical, 768px), el menú circular usa `--hub-sz: 280px` fijo, lo que desperdicia el espacio disponible. Los botones son demasiado pequeños para dedos adultos.
- **Fix requerido:** Agregar en `components.css` o `tier1.css`:
```css
@media (min-width: 600px) and (max-width: 1023px) {
  :root {
    --hub-sz: 360px;
    --btn-sz: 85px;
    --mascot-sz: 100px;
  }
  .circular-menu-wrapper {
    min-height: 420px;
  }
  .circle-btn {
    font-size: calc(var(--btn-sz) * 0.14);
  }
  .cb-icon {
    font-size: calc(var(--btn-sz) * 0.42) !important;
  }
}
```

### 🟠 ISSUE-02: Sin wrapper máximo para Desktop (>1024px)
- **Diagnóstico:** En pantallas de escritorio, la app ocupa todo el ancho. La experiencia es extraña.
- **Fix requerido:** Agregar en `layout.css`:
```css
@media (min-width: 1024px) {
  body {
    align-items: center;
    background: #0a0a0a;  /* Fondo exterior oscuro elegante */
  }
  body > * {
    max-width: 480px;
    margin: 0 auto;
    width: 100%;
  }
  #bgClouds {
    max-width: 480px;
    left: 50%;
    transform: translateX(-50%);
  }
}
```

### 🟡 ISSUE-03: `components.css` sin variantes responsive
- **Diagnóstico:** Los botones `.btn-3d` tienen `font-size: 24px` y `padding: 20px` fijos. En mobile pequeño (320px) pueden sobrepasar el viewport.
- **Fix recomendado:** Usar `clamp()` para los tamaños de fuente y padding:
```css
.btn-3d {
  font-size: clamp(16px, 4vw, 24px);
  padding: clamp(12px, 3vw, 20px);
}
```

### ✅ QUÉ ESTÁ BIEN (No tocar)
- `layout.css` → el `@media (orientation: landscape)` para el game-layout en 2 columnas funciona bien.
- `tier1.css` → `@media (max-height: 520px) and (orientation: landscape)` para móvil landscape está correcto.
- `states.css` → `@media (prefers-reduced-motion: reduce)` correctamente implementado.
- Variables CSS con `clamp()` en `tier1.css` para tamaños de mascota.

---
*Auditoría registrada el 2026-06-06 por el Consultor Externo (Antigravity)*


### Integración Final Mochi Badge y Arreglo Root del Star Counter (2026-06-06):
*   **Recorte (Auto-Crop) de Assets WebP:** Se descubrió que la causa raíz del aplastamiento extremo del contador de estrellas (a pesar de las reglas CSS) era que el asset original star_counter_bg.webp (y el nuevo mochi_profile_badge.webp) estaban exportados con un lienzo gigante de 1024x1024 con 90% de espacio transparente. Se ejecutó un script en Python para auto-recortar ambos archivos a sus proporciones de píxeles reales (899x388 y 400x227).
*   **Mochi Profile Badge:** Se implementó mochi_profile_badge.webp en .home-top-bar > div:first-child reemplazando los estilos CSS por la imagen como background y padding de 75px a la izquierda para eludir la cara de Mochi e incrustar el nombre y edad perfectamente en la zona lisa de plastilina.
*   **Star Counter:** Al recortar la imagen a 899x388 (proporción ~2.31), se aplicó al contenedor las dimensiones de 140px x 60px y ackground-size: 100% 100%, eliminando matemáticamente toda deformación de la cápsula.
*   **Fixes de Responsividad:** Se implementaron con éxito las 3 recomendaciones del Consultor Externo (tablet portrait hub size en 	ier1.css, Desktop max-wrapper 480px en layout.css, y clamp() de botones 3D en components.css).

---

## 🎨 NUEVO ENCARGO: Ilustraciones de Preguntas (Tier 1 - Clay World) - 2026-06-20
El **Agente Contenido** ha finalizado y consolidado la lista completa de las preguntas de Tier 1 (6-7 años) que requieren ilustraciones.
**Archivo de Referencia Maestro:** `e:\Presion Mental APP\.agents\TIER1_CLAY_REQUERIMIENTOS.md`

**Instrucciones de Acción para Agente Diseño:**
1. Toma como base el archivo `.agents/TIER1_CLAY_REQUERIMIENTOS.md`.
2. Prepara todo el entorno técnico y define las especificaciones exactas (dimensiones, tipo de fondo, formato WebP, nomenclatura de guardado) para las ilustraciones de las preguntas de este tier.
3. Transmite formalmente estas especificaciones al **Agente Gráfico** para que inicie la producción masiva de las imágenes en estilo Claymorphism.

---

## 🔶 DEUDA TÉCNICA DE ASSETS — Reporte del Agente Tester (2026-06-20)

Durante la campaña de QA de la Suite 2 (Asset Integrity), se detectaron **2 assets referenciados en CSS que devuelven 404** en el servidor. No causan crash (el juego usa fallbacks CSS), pero deben crearse para completar la fidelidad visual del Tier 1.

| Asset Faltante | Ruta Exacta | Prioridad | Nota |
|---|---|---|---|
| `sky_base.webp` | `assets/fondos/tier1/sky_base.webp` | 🟡 BAJA | Fondo alternativo de cielo. El CSS usa gradiente como fallback. |
| `star_counter_bg.webp` | `assets/ui/star_counter_bg.webp` | 🟡 BAJA | Badge del contador de estrellas. Existe una copia en `assets/interface/` pero falta en la ruta `assets/ui/`. Verificar si es un duplicado o una ruta incorrecta en el CSS. |

**Acción requerida:**
- Para `sky_base.webp`: Solicitar al Agente Gráfico que genere el asset en estilo Clay World (cielo azul pastel `#b3e5fc`, nubes suaves, sin gradiente duro).
- Para `star_counter_bg.webp`: Verificar primero si la ruta en el CSS es incorrecta (debería apuntar a `assets/interface/star_counter_bg.webp` o `assets/mascotas/tier1/`). Si la ruta es correcta, solicitar al Gráfico que copie o regenere el asset en `assets/ui/`.

*Deuda técnica registrada el 2026-06-20 por el Agente Tester (Antigravity)*

---

### 🔶 RESOLUCIÓN DE DEUDA TÉCNICA Y ENCARGO DE ILUSTRACIONES (2026-06-24)
- [x] **star_counter_bg.webp:** Se verificó que el CSS `tier1.css` ya apunta correctamente a la ruta existente `assets/badges/star_counter_bg.webp` (Línea 1294). No requiere acción del Gráfico.
- [x] **sky_base.webp:** Se enviaron las instrucciones al Agente Gráfico para la generación del asset.
- [x] **Ilustraciones de Preguntas:** Se elaboró y transmitió formalmente el requerimiento técnico (dimensiones, padding, fondo transparente, claymorphism) al Agente Gráfico basado en `TIER1_CLAY_REQUERIMIENTOS.md`.
- [x] **Apoyo Visual en Popups (`introPopup`):** Se inyectaron reglas CSS específicas para Tier 1 que transforman los `popup-info-box` en tarjetas Claymorphism (fondos pasteles, iconos redondeados, sombras suaves) para apoyar el tutorial secuencial (Cumplimiento Pedagógico).
- [x] **Mitigación de Estrés Visual:** Se reescribieron las variables `--danger` (`#FF8A65`) y `--danger-dark` (`#D84315`) exclusivamente para Tier 1. El feedback de error (botones rojos, barra de tiempo) ahora usa tonos salmón amigables que previenen la ansiedad visual, reduciendo el "shake" a un simple estímulo amigable.
- [x] **Accesibilidad Básica (A11y):** Añadidos `aria-label` descriptivos a los 6 botones del menú circular en `v51_modular.html` (`cb-1` a `cb-6`), y verificado el soporte global de `:focus-visible` y `prefers-reduced-motion` en la UI base.

