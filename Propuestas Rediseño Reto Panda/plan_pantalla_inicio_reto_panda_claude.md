# Plan de trabajo: nueva pantalla de inicio de Reto Panda

> **Nota:** este plan se hizo viendo solo el texto del juego, no su código. Por eso la Fase 0 es una auditoría: lo que se encuentre ahí puede cambiar los tiempos y algunos detalles de las fases siguientes.

**Objetivo:** reemplazar la pantalla de inicio actual por el diseño nuevo (Mochi, paisaje, botones *Mundos* y *Juego libre*, *Misión de hoy*), sin romper el resto del juego y con buen rendimiento en celulares modestos.

**Estimación:** 2 a 3 semanas a ratos libres. La Fase 2 (recursos gráficos) suele ser la más lenta.

---

## Fase 0: Preparación y auditoría (1 a 2 días)

1. **Respaldo.** Crear una rama `home-v2` en el repositorio y dejar `v51_modular.html` intacto como punto de retorno.
2. **Mapa del código actual.** Anotar cómo se resuelve cada una de estas cosas:
   - Cómo se cambia de pantalla (¿clases `.active`, `display:none`, funciones tipo `showScreen()`?).
   - Dónde se guardan nombre, edad, estrellas, vidas y misiones (¿`localStorage`? ¿qué claves?).
   - Cómo se calculan las misiones semanales y mensuales.
   - Dónde está el sistema de sonido y su botón de silencio.
   - Qué hace hoy el botón de la tienda y el de logros.
3. **Medición base.** Anotar el peso de la página, el tiempo de carga en el celular y la lista de recursos que ya existen en `assets/interface/`.
4. **Inventario de lo que falta en los datos.** El diseño nuevo usa cosas que quizá no existen todavía: **nivel**, **XP**, **rango** ("Exploradora") y **misión diaria con cofre**. Anotar cuáles hay que crear.

**Entregable:** un documento corto con el mapa de pantallas, las claves de datos y la lista de lo que falta.

---

## Fase 1: Decisiones de diseño (1 día)

Estas decisiones hay que cerrarlas antes de generar imágenes, porque cambiarlas después cuesta caro.

| Decisión | Propuesta |
|---|---|
| **Dónde van Tienda y Logros** | Tienda: se abre tocando el chip de estrellas, que cambia el "+" por un icono de bolsa. Logros: se abre tocando el cofre y también el avatar. Si las pruebas con niños muestran que no los encuentran, añadir una fila de dos botones pequeños y redondos (48 px) bajo la misión. |
| **Nombres** | Unificar: Mundos, Juego libre, Tienda, Logros. "Destrezas" pasa a ser una sección dentro de Logros o del perfil. |
| **Rangos por nivel** | Definir la tabla, por ejemplo: 1–4 Aprendiz, 5–9 Aventurera, 10–19 Exploradora, 20+ Maestra. Deben existir versión masculina y femenina, o una forma neutra ("Explorador/a"). |
| **XP por nivel** | Curva simple, por ejemplo `XP necesaria = 100 + nivel × 40`. Definir cuánta XP da cada acción. |
| **Misión diaria** | 2 misiones por día, tomadas de un conjunto fijo y adaptadas a la edad. Recompensa: estrellas y apertura del cofre al completar ambas. |
| **Fuente y tamaños** | Fuente redondeada y legible (por ejemplo Nunito o Baloo 2). Mínimos: títulos 22 px, texto de misión 16 px, texto del encabezado 14 px. |
| **Paleta** | Verde (Mundos), naranja (Juego libre), crema y azul del encabezado. Guardarlos como variables CSS. |

**Entregable:** una hoja con estas decisiones cerradas.

---

## Fase 2: Recursos gráficos (4 a 6 días)

Principio clave: **todo en capas separadas**, con fondo transparente cuando corresponda, para que se adapten a cualquier pantalla. Los textos de los botones van en HTML, no dentro de la imagen, para poder traducirlos y mantenerlos nítidos.

| Recurso | Archivo sugerido | Tamaño base | Transparencia | Peso máximo |
|---|---|---|---|---|
| Fondo de cielo con islas lejanas | `home_bg.webp` | 1080×1920 | No | 180 KB |
| Islas medias (parallax opcional) | `home_islands.webp` | 1080×700 | Sí | 90 KB |
| Plataforma frontal con hierba, cartel y brújula | `home_platform.webp` | 1080×600 | Sí | 120 KB |
| Hojas de primer plano (esquinas) | `home_leaves_l.webp`, `home_leaves_r.webp` | 400×600 | Sí | 40 KB c/u |
| Mochi saludando | `mochi_wave.webp` | 700×800 | Sí | 90 KB |
| Mochi feliz / celebrando / pensando | `mochi_happy.webp`, `mochi_cheer.webp`, `mochi_think.webp` | 700×800 | Sí | 90 KB c/u |
| Icono botón Mundos (montaña e isla) | `btn_icon_worlds.webp` | 300×300 | Sí | 30 KB |
| Icono botón Juego libre (mando) | `btn_icon_play.webp` | 300×300 | Sí | 30 KB |
| Cofre cerrado y abierto | `chest_closed.webp`, `chest_open.webp` | 300×300 | Sí | 30 KB c/u |
| Iconos de misión (números, estrella, etc.) | `mission_*.webp` | 128×128 | Sí | 10 KB c/u |
| Avatar de Mochi (círculo de perfil) | `avatar_mochi.webp` | 256×256 | Sí | 20 KB |
| Estrella y flecha de nivel | `ui_star.webp`, `ui_level.webp` | 128×128 | Sí | 10 KB c/u |

**Presupuesto total de la pantalla: menos de 1 MB.** Mantener versiones `@2x` solo si se va a cubrir tablets.

### Cómo producirlos

1. Generar cada pieza por separado con la herramienta de imágenes, pidiendo **mismo personaje, mismo estilo de luz y fondo plano** para poder recortar.
2. Eliminar el fondo (rembg, Photoshop, Photopea o similar) y revisar los bordes sobre fondo claro y oscuro.
3. Exportar a WebP con calidad 80–85.
4. Nombrarlos y guardarlos en `assets/interface/home/`.

**Atención a la coherencia:** lo más difícil es que Mochi se vea idéntico en las cuatro poses (mismo tamaño de cabeza, color de chaqueta y mochila). Generar la primera pose y usar esa imagen como referencia para las demás.

**Entregable:** carpeta con todos los recursos optimizados y una tabla con su peso real.

---

## Fase 3: Estructura HTML y CSS (3 a 4 días)

### 3.1 Capas de la pantalla (de atrás hacia adelante)

```
#home
 ├─ .bg            (cielo)
 ├─ .islands       (islas lejanas)
 ├─ .platform      (plataforma con hierba)
 ├─ .mochi         (Mochi + globo de diálogo)
 ├─ .actions       (botones Mundos / Juego libre)
 ├─ .leaves        (hojas de primer plano)
 ├─ .topbar        (perfil, nivel, estrellas, ajustes)
 └─ .mission-card  (misión de hoy + cofre)
```

### 3.2 Variables CSS (empezar por aquí)

```css
:root{
  --green:#2fb36d; --orange:#ff9a2e; --cream:#fff6e6; --ink:#1d2540;
  --radius-btn:28px; --tap-min:48px;
  --font:'Nunito',system-ui,sans-serif;
}
```

### 3.3 Reglas de layout

- Contenedor con `height:100dvh` y `max-width:480px`, centrado en pantallas grandes.
- Posicionar las capas con `position:absolute` y porcentajes, no con píxeles fijos.
- Usar `clamp()` para fuentes y tamaños de botón.
- Respetar las zonas seguras: `padding-bottom: env(safe-area-inset-bottom)`.
- Mochi con altura relativa (`height:34dvh`) para que no pise los botones en celulares bajos.
- Botones: ancho `min(42vw, 190px)`, borde y sombra sólida como en la propuesta, con el icono arriba y el texto abajo.

### 3.4 Accesibilidad básica desde el inicio

`<button>` reales, `aria-label` en iconos sin texto, contraste mínimo 4.5:1 en textos, área táctil de 48 px o más.

**Entregable:** pantalla estática que se ve igual a la propuesta en 390×844.

---

## Fase 4: Lógica y datos (3 a 4 días)

1. **Perfil y progresión**
   - Guardar `level`, `xp`, `stars` y `rank` en el mismo objeto de estado que ya se usa.
   - Función `addXP(n)` que sube de nivel, recalcula la barra y dispara una celebración.
   - Migración: si el jugador viene de la versión anterior, asignar nivel inicial según sus estrellas acumuladas, para no empezar en cero.
2. **Misión de hoy**
   - Guardar `dailyMissions = {date, items:[{id, goal, progress, reward}], chestOpened}`.
   - Al abrir el juego, comparar `date` con la fecha de hoy y regenerar si cambió.
   - Conectar los eventos del juego (partida jugada, acierto, estrella ganada) para sumar progreso.
   - Al completar ambas, habilitar el cofre. Al tocarlo, se abre y entrega estrellas una sola vez.
3. **Navegación**
   - Botón Mundos → pantalla Mundos existente.
   - Botón Juego libre → modo libre existente.
   - Chip de estrellas → Tienda. Cofre y avatar → Logros. Engranaje → Ajustes.
4. **Texto dinámico:** saludo con nombre y edad, rango según nivel y globo de Mochi con mensajes según el contexto (primera vez del día, misión casi lista, racha activa, regreso tras días de ausencia).
5. **Idioma:** pasar todos los textos nuevos por el sistema español/inglés actual.

**Entregable:** pantalla funcional con datos reales, que sobrevive a recargar la página.

---

## Fase 5: Animación y sonido (2 a 3 días)

Todo suave y corto. Regla: ninguna animación dura más de 1,5 s y ninguna bloquea el toque.

| Elemento | Animación | Técnica |
|---|---|---|
| Mochi (reposo) | Respiración sutil, 4 s en bucle | CSS `transform: scale/translateY` |
| Mochi (saludo) | Cambio entre `mochi_wave` y `mochi_happy` cada cierto tiempo | Cambio de imagen con fundido |
| Globo | Aparece con rebote, cambia de texto cada 8–10 s | CSS + JS |
| Botones | Al presionar: baja 4 px y la sombra se achica | CSS `:active` |
| Barra de XP y de misión | Se llena con transición de 600 ms | CSS `transition: width` |
| Contador de estrellas | Cuenta hacia arriba al ganar | JS corto |
| Cofre | Tiembla suavemente cuando está listo, se abre al tocarlo, con lluvia de estrellas | CSS + intercambio de imagen |
| Nube y hojas | Movimiento lento y mínimo | CSS, opcional |

**Sonidos** (reutilizar el sistema actual y su botón de silencio): clic de botón, subida de nivel, apertura del cofre y estrella ganada. Cada uno de 1 s o menos.

**Imprescindible:** respetar `@media (prefers-reduced-motion: reduce)` apagando las animaciones decorativas.

**Entregable:** pantalla con vida, sin tirones en un celular modesto.

---

## Fase 6: Integración con el resto del juego (2 días)

1. Reemplazar el contenido de la pantalla de inicio actual sin tocar las demás.
2. Revisar el botón atrás de cada pantalla: todas deben volver al nuevo inicio.
3. Verificar el flujo completo: splash → onboarding → inicio nuevo → mundo → juego → resultado → inicio.
4. Revisar que al volver de una partida las estrellas, el XP y la misión se actualicen con animación.
5. Asegurar que el informe para padres siga mostrando los datos correctamente.
6. Actualizar el título y la versión (`v52`) y añadir un parámetro de versión en los recursos (`?v=52`) para evitar caché vieja en GitHub Pages.

**Entregable:** juego completo funcionando con la pantalla nueva.

---

## Fase 7: Pruebas (3 a 4 días)

### Pruebas técnicas

| Prueba | Criterio de aprobado |
|---|---|
| Tamaños de pantalla | Se ve bien en 360×640, 390×844, 412×915 y tablet. Nada se corta ni se superpone. |
| Peso | Pantalla de inicio menos de 1 MB, carga en menos de 2 s en 4G. |
| Rendimiento | Lighthouse móvil sobre 85. Animaciones a 60 fps en un celular de gama media. |
| Navegadores | Chrome Android y Safari iPhone como mínimo. |
| Sin conexión o conexión lenta | Si falta una imagen, el texto y los botones siguen siendo usables (`alt` y color de fondo de respaldo). |
| Datos | Un perfil antiguo migra bien. Un cambio de día regenera las misiones. |

### Pruebas con niños reales (3 a 5, de 6 a 9 años, sin explicarles nada)

Pedirles solo "juega un rato" y observar:

- ¿Llegan solos a Mundos y a Juego libre?
- ¿Encuentran la tienda y los logros? ¿Cuánto tardan?
- ¿Entienden el cofre y las misiones?
- ¿Leen los textos o se guían por los iconos?
- ¿Algún botón se les escapa o lo tocan por error?

Anotar dónde dudan. Esos puntos son la lista de ajustes.

**Entregable:** lista de problemas priorizada (críticos, medios, menores).

---

## Fase 8: Ajustes y publicación (2 días)

1. Corregir lo crítico y lo medio de la lista de pruebas.
2. Publicar primero en una URL aparte (por ejemplo `v52_home.html`) y compartirla con unos pocos usuarios.
3. Si no hay problemas durante unos días, reemplazar el enlace principal.
4. Conservar `v51_modular.html` disponible como respaldo.

---

## Cronograma resumen

| Semana | Fases |
|---|---|
| 1 | 0, 1 y comienzo de 2 (recursos) |
| 2 | Fin de 2, fases 3 y 4 |
| 3 | Fases 5, 6, 7 y 8 |

---

## Riesgos principales

| Riesgo | Cómo reducirlo |
|---|---|
| Mochi se ve distinto entre poses | Generar siempre con la primera imagen como referencia y revisar las cuatro juntas antes de seguir. |
| Los recursos pesan demasiado | Definir el tope por archivo desde el inicio y comprimir al exportar. |
| El niño no encuentra Tienda ni Logros | Probar con niños en la Fase 7 y, si hace falta, añadir los dos botones redondos pequeños. |
| Perfiles antiguos se rompen | Escribir la migración de datos en la Fase 4 y probarla con un perfil viejo. |
| Se desborda el alcance | Dejar fuera, por ahora, el rediseño del mapa de Mundos. Es una fase futura. |

---

## Después de esto (fase futura)

Rediseñar la pantalla **Mundos** como mapa vertical de islas con scroll, usando el estilo de la primera propuesta (islas flotantes por mundo). Conviene hacerlo solo cuando el inicio esté estable.

---

## Lista de verificación rápida

- [ ] Rama `home-v2` creada y `v51_modular.html` respaldado
- [ ] Auditoría del código hecha (pantallas, datos, misiones, sonido)
- [ ] Decisiones de diseño cerradas (nombres, rangos, XP, misión diaria)
- [ ] Recursos gráficos generados, recortados y optimizados (< 1 MB en total)
- [ ] Pantalla estática igual a la propuesta en 390×844
- [ ] Nivel, XP, rango y misión diaria funcionando con migración de perfiles antiguos
- [ ] Animaciones y sonidos con soporte de `prefers-reduced-motion`
- [ ] Navegación completa verificada, incluido el informe para padres
- [ ] Pruebas técnicas y pruebas con niños realizadas
- [ ] Publicación en URL aparte y luego reemplazo del enlace principal
