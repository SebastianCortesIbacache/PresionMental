# Reporte de Auditoría y Correcciones Visuales — Menú Circular Tier 1

Se ha completado la revisión y corrección del menú principal de **Presión Mental** en la versión modular (`v51_modular.html`) para el **Tier 1 (Clay World)**.

A continuación se detallan los hallazgos técnicos y las soluciones aplicadas:

---

## 🛠️ Hallazgos y Correcciones Aplicadas

### 1. Desalineación y Recorte del Menú Circular
* **Problema:** Los botones `cb-4` (DESTREZAS), `cb-5` (LOGROS) y `cb-6` (AJUSTES) se mostraban apilados verticalmente en la parte inferior y parcialmente fuera del viewport visible de la pantalla.
* **Causa:** En `css/tiers/tier1.css`, se había sobreescrito la clase `.circle-btn` con `position: relative !important`. Esto rompía el posicionamiento absoluto (`position: absolute`) heredado de `css/layout.css`, impidiendo que la transformación de distribución radial (`rotate` + `translate`) funcionara de manera correcta.
* **Solución:** Se corrigió a `position: absolute !important` en `css/tiers/tier1.css`. Los botones ahora se distribuyen en una circunferencia perfecta alrededor de la mascota panda central.

### 2. Recorte del Fondo de Pantalla (Viewport Crop)
* **Problema:** En entornos móviles y capturas de Puppeteer, el fondo de cielo azul con nubes se cortaba a un 80% de la altura, mostrando una franja gris opaca al fondo.
* **Causa:** La propiedad `background-attachment: fixed !important` aplicada a `html.age-tier-1` generaba conflictos de escala al redimensionar el viewport en navegadores sin scroll activo.
* **Solución:** Se eliminó la propiedad `background-attachment: fixed` en `css/tiers/tier1.css`. El fondo ahora escala y cubre el 100% de la altura del viewport de forma continua.

### 3. Ajuste de Letras Curvas en SVG
* **Problema:** Los títulos curvos de los botones de menú estaban demasiado cerca o tocaban el borde blanco exterior de plastilina.
* **Causa:** El radio del arco del path SVG de texto estaba establecido en `40` dentro de un viewBox de `100x100` (`d="M 10,50 A 40,40 0 0,0 90,50"`).
* **Solución:** Se redujo el radio a `37` (`d="M 13,50 A 37,37 0 0,0 87,50"`) en los 6 botones de `v51_modular.html`. Esto desplazó el texto curvo ligeramente hacia arriba (aproximadamente un 3%), centrándolo sobre el fondo de color del botón.

---

## 📂 Archivos Modificados

1. [v51_modular.html](file:///e:/Presion%20Mental%20APP/v51_modular.html) (Líneas 323–376)
   * Se actualizaron los paths de arco SVG a un radio de 37 para centrar el texto curvo de los 6 botones.
2. [css/tiers/tier1.css](file:///e:/Presion%20Mental%20APP/css/tiers/tier1.css)
   * Línea 36: Se eliminó `background-attachment: fixed !important`.
   * Línea 287: Se cambió `position: relative !important` por `position: absolute !important`.
    * Línea 210: Se implementó una tarjeta contenedora estilo "clay badge" para el nombre y la edad del jugador (`.home-top-bar > div:first-child`) con bordes blancos gruesos de plastilina, fondo semi-transparente blanco y sombra clay. El título del juego se coloreó en naranja, el saludo en azul marino, y la edad se encapsuló en una pastilla rosa clay.
    * Línea 321: Se optimizó el texto curvo ajustando la tipografía: `font-size` a `11.5px` (antes `13.5px`), `letter-spacing` a `0.13em` (antes `0.09em`) y `stroke-width` a `2.8px` (antes `3.5px`) para dar mayor separación y eliminar solapamientos entre las letras (por ejemplo, entre la 'T' y la 'S' en 'AJUSTES').
    * Línea 782: Se rediseñó el contador de estrellas (`.star-showcase`). El texto `"ESTRELLAS CONSEGUIDAS"` se colocó de forma absoluta sobre la cápsula (`bottom: 43px; left: -20px; width: 150px; text-shadow: 0 1px 0 #fff; color: #8d4004`), mientras que el número se centró horizontal y verticalmente dentro de la zona naranja de la cápsula utilizando un tamaño de `20px` en color azul oscuro clay. Las dimensiones físicas de la cápsula se fijaron en `110px` x `40px` con `background-size: 100% 100%` para mantener la escala ideal de plastilina.

---

## 📸 Captura de Verificación

Se adjunta la ruta de la captura de pantalla generada tras los cambios aplicados en resolución 1920x945:
`C:\Users\Wusch\.gemini\antigravity\brain\e3c9fa4a-c9cf-444d-bc1f-0980469e710e\main_menu_clay_verified_1780279003253.png`
