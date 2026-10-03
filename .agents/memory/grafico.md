# ðŸ–¼ï¸� Memoria: Agente GrÃ¡fico


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
> **PROTOCOLO DE MEMORIA:** Cada vez que generes, guardes o corrijas un asset, actualiza la sección "Progreso de Ilustraciones" de esta memoria marcando el lote como completado con fecha y ruta de destino. Sin excepción.

---

> [!IMPORTANT]
> **Única Fuente de Verdad del Proyecto:** El archivo HTML activo sobre el cual se trabaja y se ejecuta la aplicación es **`v51_modular.html`**. 
> Cualquier otra variante o carpeta (como `v52_modular` o `v51_circular_backup`) son **únicamente respaldos y checkpoints anteriores y no deben modificarse ni ejecutarse**.


## ðŸ†” ID de ConversaciÃ³n Actual
`92aea549-02a8-4539-8bf7-1496d6947a72`

## ðŸŽ¯ Ãšltimo Objetivo
Segmentar y organizar la producciÃ³n masiva de 629 activos visuales para trivia, asegurando coherencia estÃ©tica por Tier y eliminando la contaminaciÃ³n de estilos.

## ðŸ“‹ Requerimientos TÃ©cnicos - Modelo Modular
1. **Pipeline WebP:** Todos los activos deben entregarse en formato `.webp` con compresiÃ³n optimizada para Android.
2. **Nomenclatura Obligatoria:** `assets/preguntas/t{n}/preg_[slug]_[id]_t{n}.webp`.
3. **Mascotas y Accesorios:** Deben tener fondo transparente (alpha channel).
4. **Carga DinÃ¡mica:** El sistema modular ahora carga los assets basÃ¡ndose en la variable `playerAge`. AsegÃºrate de que para cada ID de mascota o accesorio existan las 3 versiones (una por tier).

## ðŸŽ¨ Especificaciones de Estilo por Tier
- **Tier 1 (Clay):** Plastilina 3D, sombras suaves, formas orgÃ¡nicas.
- **Tier 2 (Retro):** Flat vector, contorno neÃ³n, colores vibrantes.
- **Tier 3 (Cyber):** Low-poly, detalles de circuitos, efectos glitch.

## âœ… ProducciÃ³n Activa
- **Fase 1:** MatemÃ¡ticas 6-7 aÃ±os (Prioridad Alta).
- **Mascotas Base:** 9 especies diseÃ±adas en estilo Tier 1.
- **Nota del Arquitecto:** La estructura CSS ya soporta fallbacks visuales si una imagen no carga. Es seguro proceder con la exportaciÃ³n WebP masiva siguiendo `assets/IMAGE_PROMPTS_TIER1_CLAY.md`.

## ðŸŽ© NUEVA DIRECTRIZ: ImÃ¡genes Combinadas (Mascota + Accesorio)
La arquitectura CSS del juego ha sido modificada para soportar imÃ¡genes combinadas en lugar de superponer un PNG de accesorio sobre el PNG de la mascota. El usuario generarÃ¡ estas imÃ¡genes manualmente (combinando al personaje con el accesorio en un solo render).

**Foco Actual:** SOLO TIER 1 (Claymorphism).
**Mascotas objetivo (10):** `bear`, `cat`, `dog`, `dragon`, `fox`, `owl`, `panda`, `penguin`, `rabbit`, `capybara`.
**Accesorios objetivo (4):** `gafas` (ID: `c_nerd`), `sombrero` (ID: `c_hat`), `corona` (ID: `c_crown`), `super heroe` (ID: `c_hero`).

### Nomenclatura Estricta (Â¡CRÃ�TICO!)
Para que el motor del juego cargue automÃ¡ticamente la imagen, los prompts y archivos deben seguir este formato de ID exacto:
1. Sin accesorio (Estado Base): `m_[nombre]` (ej. `m_panda.webp`)
2. Con Accesorio: `m_[nombre]_[id_accesorio]` (ej. `m_panda_c_nerd.webp`, `m_bear_c_hat.webp`, `m_fox_c_hero.webp`).

### AcciÃ³n Completada âœ…
- [x] DiseÃ±ados y documentados los **50 prompts exactos** (10 mascotas x 5 estados: Base + 4 accesorios) respetando la estÃ©tica **Tier 1 (Claymorphism)**.
- [x] Generado y guardado el archivo completo en [TIER1_COMBINED_MASCOTS_PROMPTS.md](file:///e:/Presion%20Mental%20APP/assets/TIER1_COMBINED_MASCOTS_PROMPTS.md) con la nomenclatura exacta (`m_[nombre]_[id_accesorio].webp`) y formato 512x512 de fÃ¡cil extracciÃ³n.

---
*Actualizado el 2026-05-30 por el Consultor Externo (Antigravity)*

## ðŸ“¦ NUEVO ENCARGO DE INTERFAZ: Assets del MenÃº y UI en WebP (Tier 1 - Clay World) â€” âœ… EJECUTADO 2026-05-30

El Agente DiseÃ±o solicitÃ³ la creaciÃ³n de 6 nuevos grupos de assets grÃ¡ficos en formato WebP con canal alfa (transparente) y sus prompts IA optimizados para lograr el acabado exacto de la imagen de referencia.

- [x] **Registro de Prompts de UI:** Creado y guardado en [TIER1_INTERFACE_PROMPTS.md](file:///e:/Presion%20Mental%20APP/assets/TIER1_INTERFACE_PROMPTS.md).
- [x] **GeneraciÃ³n y ConversiÃ³n de Assets (WebP con Alfa):**
  * `assets/fondos/tier1/cloud_clay1.webp`, `cloud_clay2.webp`, `cloud_clay3.webp` (Nubes de Plastilina)
  * `assets/iconos/bg_btn_[green,yellow,pink,purple,blue,orange].webp` (Fondos de BotÃ³n - MenÃº)
  * `assets/iconos/cotton_chain.webp` (Anillo Conector de Esferas de AlgodÃ³n)
  * `assets/iconos/mascot_bubble.webp` (Burbuja de Mascota)
  * `assets/iconos/btn_music_clay.webp`, `btn_music_muted.webp`, `btn_sfx_clay.webp`, `btn_sfx_muted.webp` (Botones de Audio)
  * `assets/badges/star_counter_bg.webp` (Badge de Estrellas)
  * *Nota:* Todos los assets han sido renderizados con IA, se les ha removido el fondo para transparencia (canal alfa) y han sido convertidos a formato WebP en el workspace local.

*Ãšltimo encargo registrado y completamente ejecutado el 2026-05-30 por el Consultor Externo (Agente GrÃ¡fico)*
*Último encargo registrado y completamente ejecutado el 2026-05-30 por el Consultor Externo (Agente Gráfico)*

## 📋 INSTRUCCIONES PENDIENTES DEL CONSULTOR EXTERNO (2026-05-31)
- [x] **Saneamiento de Canales Alfa (Transparencia):** Regenerar las nubes (`cloud_clay1.webp`, `cloud_clay2.webp`, `cloud_clay3.webp`), fondos de botones (`bg_btn_*.webp`) y botones de audio, asegurando que tengan un canal alfa transparente real y no un fondo de píxeles sólidos blancos o grises.
- [x] **Ubicación de Mascotas:** Verificar que el archivo `assets/mascotas/tier1/m_panda.webp` esté exportado y guardado en esa ruta exacta para que el sistema lo renderice correctamente.


## ??? NUEVO ENCARGO: Assets de Interfaz de Onboarding (2026-05-31) — COMPLETADO ✅

El Agente Diseño ha definido los specs exactos. Crear los siguientes 4 assets en estilo Clay World Tier 1 y guardarlos en  ssets/interface/ (crear la carpeta si no existe).

**Estilo base de todos:** Plastilina 3D, colores pastel Tier 1, sombra inferior sólida tipo clay, fondo 100% transparente (canal alfa WebP).

| Asset | Ruta destino | Dimensiones | Descripción |
|-------|-------------|-------------|-------------|
| Ícono Edad | ssets/interface/icon_age.webp | 52×52 px | Estrella 5 puntas clay dorada (#FFD54F) con sombra naranja |
| Ícono Usuario |  ssets/interface/icon_user.webp | 52×52 px | Silueta avatar clay azul (#90CAF9), redondeada, sin cara |
| Ícono Edad |  ssets/interface/icon_age.webp | 52×52 px | Estrella 5 puntas clay dorada (#FFD54F) con sombra naranja |
| Ícono Vamos |  ssets/interface/btn_vamos_icon.webp | 56×56 px | Cohete clay verde/cyan apuntando diagonal, llama en base |
| Panda Onboarding |  ssets/interface/onboarding_panda.webp | 200×200 px | Panda clay sentado de frente, alegre, brazos abiertos, fondo transparente |

**Referencia de estilo:** Igual que  ssets/mascotas/tier1/m_panda.webp y demás mascotas existentes.

---
*Instrucción registrada el 2026-05-31 por el Consultor Externo*

## 🎨 NUEVO ENCARGO: Assets de Fondo y Bordes (Tier 1 - Clay World) - COMPLETADO ✅

Para alcanzar una fidelidad del 100% con `Tier 1.png`, generar los siguientes assets de fondo y guardarlos en las rutas correspondientes:

| Asset | Ruta destino | Dimensiones | Descripción |
|-------|-------------|-------------|-------------|
| Cielo de Arcilla | `assets/fondos/tier1/bg_sky_clay.webp` | 1920x1080 px | Textura azul suave de plastilina con relieve táctil y degradado |
| Nubes Borde Top | `assets/fondos/tier1/cloud_border_top.webp` | 1920x360 px | Borde superior de nubes blancas 3D clay, fondo transparente |
| Nubes Borde Bottom | `assets/fondos/tier1/cloud_border_bottom.webp` | 1920x360 px | Borde inferior de nubes blancas 3D clay, fondo transparente |
| Gotita de Arcilla | `assets/interface/clay_droplet.webp` | 64x64 px | Esfera o gotita blanca de plastilina con brillo y sombra suave |

**Referencia de estilo:** Claymorphism 3D, colores pastel, sombras de oclusión suaves, fondo transparente en los bordes y gotitas.

---
*Instrucción registrada y completada el 2026-05-31 por el Consultor Externo (Antigravity)*

## 🛠️ Tareas Completadas (Solicitud Agente Diseño) - 2026-06-27 ✅
- [x] **Fondo Tier 1:** Verificado `sky_base.webp` (Cielo azul pastel con nubes clay) a 1920x1080 en `assets/fondos/tier1/`.
- [x] **Onboarding Premium (Tier 1):**
  - **ASSET PRINCIPAL:** `assets/interface/onboarding_hero.webp` — Imagen hero del Onboarding (Panda Clay + texto "CUÉNTAME SOBRE TI"). Procesada desde `Onboarding.png` con remoción de fondo negro → canal alfa transparente (WebP 225KB). **ESTE ES EL ARCHIVO DEFINITIVO.**
  - `assets/interface/icon_cloud.webp`: Ícono 3D Clay de nube (campo nombre).
  - `assets/interface/icon_star_clay.webp`: Ícono 3D Clay de estrella (campo edad).
  - ⚠️ **OBSOLETOS/YA NO SE USAN:** `onboarding_panda.webp`, `onboarding_title.webp`, `caratula.webp` (ya no se referencian en el HTML del onboarding).

## 🎨 NUEVO ENCARGO: Asset Combinado de Perfil (Mochi Badge) (2026-05-31) - COMPLETADO ✅

El Agente Diseño solicita la creación de un nuevo asset gráfico unificado para la sección de perfil del usuario (arriba a la izquierda), fusionando la cara del panda Mochi con un contenedor de información en el estilo Clay World (Tier 1).

| Asset | Ruta destino | Dimensiones | Descripción |
|-------|-------------|-------------|-------------|
| Badge de Perfil | `assets/interface/mochi_profile_badge.webp` | 400x160 px | Un nametag o "badge" 3D de plastilina blanca (bordes gruesos suaves) que incluya en su lado izquierdo la cara del panda Mochi (estilo clay 3D, igual a la mascota actual) sobresaliendo ligeramente del borde. El lado derecho de la tarjeta debe estar liso o tener hendiduras para que el Agente Diseño coloque allí el texto (nombre y edad) vía HTML/CSS. El diseño debe asemejarse a los botones del menú circular pero en formato rectangular redondeado. Fondo 100% transparente (canal alfa WebP). |

**Referencia de Estilo:** Tier 1 Claymorphism (suave, plastilina 3D, colores cálidos, borde grueso redondeado). 

---
*Instrucción registrada el 2026-05-31 por el Consultor Externo*

---

## 🎨 NUEVO ENCARGO: Ilustraciones de Preguntas (Tier 1 - Clay World) - 2026-06-20
El **Agente Contenido** ha extraído el listado exacto de todas las preguntas del Tier 1 (6-7 años) que necesitan apoyo visual (imágenes).
**Archivo de Referencia Maestro:** `e:\Reto Panda\.agents\TIER1_CLAY_REQUERIMIENTOS.md`

**Instrucciones de Acción para Agente Gráfico:**
1. Revisa el archivo `.agents/TIER1_CLAY_REQUERIMIENTOS.md` para conocer las descripciones y el contexto de cada imagen requerida para las preguntas.
2. Espera las especificaciones técnicas definitivas (dimensiones, requerimientos de fondo, formato de nombre de archivo) que te entregará el **Agente Diseño**.
3. Una vez recibidas las especificaciones, comienza la producción de estas ilustraciones manteniendo estrictamente la estética **Clay World / Claymorphism 3D**.

### Progreso de Ilustraciones (Tier 1) - 2026-06-21
*   **Ciencias:** 3/3 generadas (pollito, puma, manzana). Guardadas en `assets/preguntas/t1/`.
*   **Historia (Lote 1):** 10/10 generadas (001 al 010 - Rosa de vientos, Niño en playa, Globo, Tierra, etc.). Guardadas.
*   **Historia (Lote 2):** 10/10 generadas (011 al 020 - Desierto florido, vizcacha, Hanga Roa, etc.). Guardadas.
*   **Inglés (Lote 3):** 10/10 generadas (001 al 010 - Charlie, Lee, Ruby, Pía, dedos, pastel, números y lápices). Guardadas.
*   **Inglés (Lote 4):** 10/10 generadas (011 al 020 - 3 libros, números 2, 5, 8, 3, 6, 9, Nelly con 7, Sam con 9, 11 estrellas). Guardadas.
*   **Inglés (Lote 5):** 7/7 generadas (021 al 027 - números 15, 20, 13 manzanas, números 12, 14, 18, 16). Correcciones de diorama en 023 y 026 aplicadas exitosamente. Guardadas.
*   **Inglés (Lote 6):** 10/10 generadas (028 al 037 - números 17, 19, útiles escolares: lápiz, goma, bolígrafo, sacapuntas, regla, libro, mochila, estuche). Guardadas.
*   **Inglés (Lote 7):** 10/10 generadas (038 al 047 - sacapuntas azul, goma blanca, lápiz madera, regla roja, etc.). Completado.
*   **Inglés (Lote 8):** 10/10 generadas (048 al 057 - útiles escolares y colores). Procesadas y guardadas.
*   **Inglés (Lote 9):** 10/10 generadas (058 al 067 - colores y útiles). Completado.
*   **Inglés (Lote 10):** 10/10 generadas (068 al 077 - frutas y útiles de colores específicos). Completado y guardado.
*   **Inglés (Lote 11):** 10/10 generadas (078 al 087 - estuche morado y partes del cuerpo humano). Procesadas y guardadas.
*   **Inglés (Lote 12):** 10/10 generadas (088 al 097 - acciones y movimientos). Completado y guardado.
*   **Inglés (Lote 13):** 10/10 generadas (098 al 107 - cabello, ojos, partes del cuerpo). Completado y guardado.
*   **Inglés (Lote 14):** 10/10 generadas (108 al 117 - familia). Procesadas y guardadas.
*   *Restantes por generar:* 228 imágenes en total.

---
## 🎨 NUEVO ENCARGO: Revisión de Imágenes para MVP (200 Preguntas) - 2026-06-24
El **Agente Contenido / Psicopedagogo** ha validado un nuevo archivo con la selección definitiva de 200 preguntas para el lanzamiento (MVP).

**Archivo de Selección MVP:** `e:\Reto Panda\Preguntas\Seleccion_Lanzamiento_200.md`

**Instrucciones de Acción para Agente Gráfico:**
1. Revisa este nuevo archivo `Seleccion_Lanzamiento_200.md`.
2. Identifica cuáles de estas 200 preguntas tienen la etiqueta `Imagen: Sí`.
3. Cruza esa información con las imágenes que ya has generado.
4. Prioriza generar las ilustraciones faltantes que correspondan exclusivamente a esta selección de 200 preguntas, manteniendo el estilo Clay World Tier 1.

**Estado Actualizado (MVP):**
- Total de imágenes requeridas y mapeadas en BD: 106 imágenes.
- **Avance:** ¡100% COMPLETADO! (Lotes 1 al 10 procesados a WebP en `assets/preguntas/t1_mvp/`).
- Faltantes finales para lanzar el MVP: **0 imágenes** 🎉

