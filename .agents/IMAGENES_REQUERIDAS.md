# 🎨 Solicitud de Assets Gráficos: Tier 1 (Clay World)

Este documento detalla los requerimientos e indicaciones de diseño para que el **Agente Gráfico** elabore los assets visuales en formato `.webp` transparentes y proporcione los prompts exactos de generación IA (Midjourney/DALL-E) para lograr un estilo Claymorphism 100% fiel a las referencias visuales de plastilina 3D de **Reto Panda Tier 1**.

---

## ☁️ 1. Nubes de Plastilina (Background Clouds)
*   **Tier**: 1 (Clay World)
*   **Componente**: Fondos Flotantes
*   **Formatos y Rutas**: 
    *   `assets/fondos/tier1/cloud_clay1.webp`
    *   `assets/fondos/tier1/cloud_clay2.webp`
    *   `assets/fondos/tier1/cloud_clay3.webp`
*   **Dimensiones**: 512x320 px (Canal Alfa/Transparente)
*   **Inserción**: Elementos `.bg-cloud.c1` a `.c6` animados en el fondo.
*   **Especificación Estética**: Nubes blancas esponjosas hechas de arcilla o plastilina 3D, con contornos redondeados y suaves, una sutil sombra inferior propia de color azul pastel (`#90caf9`), acabado mate sin brillo excesivo, textura táctil de plastilina moldeada a mano.
*   **Prompt IA sugerido**:
    > `/imagine prompt: A 3D claymorphic fluffy white cloud, soft organic shape, made of white modeling clay, cute studio lighting, soft pastel blue drop shadows, solid clean light blue background for easy isolation, high resolution render, claymation style, octane render, matte texture --v 6.0`

---

## 🟢 2. Fondos de Botones del Menú Circular
*   **Tier**: 1 (Clay World)
*   **Componente**: Botones del Hub Circular
*   **Formatos y Rutas**:
    *   `assets/iconos/bg_btn_green.webp` (Mundos)
    *   `assets/iconos/bg_btn_yellow.webp` (Libre)
    *   `assets/iconos/bg_btn_pink.webp` (Tienda)
    *   `assets/iconos/bg_btn_purple.webp` (Destrezas)
    *   `assets/iconos/bg_btn_blue.webp` (Logros)
    *   `assets/iconos/bg_btn_orange.webp` (Ajustes)
*   **Dimensiones**: 256x256 px (Canal Alfa/Transparente)
*   **Inserción**: Fondos de los elementos `.circle-btn` en el menú principal.
*   **Especificación Estética**: Un botón circular de plastilina con un anillo o borde doble blanco grueso muy marcado. La parte interior debe ser del color sólido vibrante correspondiente (verde, amarillo, rosa, morado, azul, naranja) con una hendidura tridimensional (inner shadow) y un sutil brillo de relieve en la parte superior. El centro debe quedar libre para superponer el icono WebP actual.
*   **Prompt IA sugerido**:
    > `/imagine prompt: A circular button made of colored clay, thick white double clay border ring, glossy 3D claymorphism effect, soft studio lighting, isolated on a solid dark background, claymation, plasticine texture, cute UI game asset --v 6.0`

---

## ⛓️ 3. Anillo Conector de Esferas (Bolitas de Algodón)
*   **Tier**: 1 (Clay World)
*   **Componente**: Guía del Menú Circular
*   **Formatos y Rutas**: `assets/iconos/cotton_chain.webp`
*   **Dimensiones**: 512x512 px (Canal Alfa/Transparente)
*   **Inserción**: Fondo del contenedor `.circular-menu::before` que une a los botones.
*   **Especificación Estética**: Anillo formado por pequeñas bolitas tridimensionales de algodón o plastilina blanca colocadas en filita, simulando un collar o hilera de cuentas suaves con sombras de contacto e iluminación uniforme que den sensación de volumen esférico.
*   **Prompt IA sugerido**:
    > `/imagine prompt: A perfect circular ring made of small white 3D clay spheres linked together like a pearl necklace, cotton ball texture, soft claymorphism, cute pastel lighting, isolated on black background, game UI element --v 6.0`

---

## 🫧 4. Burbuja Pomposa de Mascota (Mascot Bubble Dome)
*   **Tier**: 1 (Clay World)
*   **Componente**: Contenedor Central de Mascota
*   **Formatos y Rutas**: `assets/iconos/mascot_bubble.webp`
*   **Dimensiones**: 384x384 px (Canal Alfa/Transparente)
*   **Inserción**: Detrás o alrededor de la mascota en `.hub-mascot-container`.
*   **Especificación Estética**: Una burbuja de agua/jabón pomposa y redondeada con reflejos de luz brillantes de caricatura, un contorno blanco translúcido suave y una sutil sombra exterior de resplandor azul claro. Debe verse semi-transparente para albergar al panda en su interior.
*   **Prompt IA sugerido**:
    > `/imagine prompt: A glossy 3D soap bubble dome, transparent glass sphere with white and light blue glossy reflections, cute cartoon style, soft blue outer glow, isolated on black background, game UI asset, claymation integration --v 6.0`

---

## 🔊 5. Botones de Sonido de Arcilla (Audio Buttons)
*   **Tier**: 1 (Clay World)
*   **Componente**: Botones de Control Flotantes
*   **Formatos y Rutas**:
    *   `assets/iconos/btn_music_clay.webp` (Música Activa - Violeta)
    *   `assets/iconos/btn_music_muted.webp` (Música Silenciada - Roja)
    *   `assets/iconos/btn_sfx_clay.webp` (Sonido Activo - Cyan)
    *   `assets/iconos/btn_sfx_muted.webp` (Sonido Silenciado - Roja)
*   **Dimensiones**: 128x128 px (Canal Alfa/Transparente)
*   **Inserción**: Reemplazo visual de `#ambientBtn` y `#audioBtnGlobal`.
*   **Especificación Estética**: Botones squirculares (cuadrados con esquinas muy redondeadas) de plastilina. Borde blanco de 4px, color base del botón vibrante (violeta, cyan o rojo para mute) con una sombra inferior marcada del mismo tono oscuro y una nota musical / icono de bocina integrado en relieve 3D sobre la superficie.
*   **Prompt IA sugerido**:
    > `/imagine prompt: A 3D squircular game button made of purple clay, embossed music note icon in the center, thick white clay border, claymorphism, soft shadows, isolated on black background, cute UI game asset --v 6.0`

---

## ⭐ 6. Badge de Estrellas Clay (Star Showcase Badge)
*   **Tier**: 1 (Clay World)
*   **Componente**: Contador de Estrellas
*   **Formatos y Rutas**: `assets/badges/star_counter_bg.webp`
*   **Dimensiones**: 384x128 px (Canal Alfa/Transparente)
*   **Inserción**: Fondo de la caja `.star-showcase`.
*   **Especificación Estética**: Una barra horizontal o "píldora" ancha de plastilina amarilla/naranja, con bordes redondeados y una estrella de plastilina 3D dorada brillante semi-incrustada en el lado izquierdo. El cuerpo de la píldora tiene textura de plastilina y profundidad 3D marcada.
*   **Prompt IA sugerido**:
    > `/imagine prompt: A horizontal pill-shaped banner made of orange and yellow clay, a shiny 3D golden star embedded on the left, thick white clay outline, cute claymorphic UI header badge, isolated on black background --v 6.0`
