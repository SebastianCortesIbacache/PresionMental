# 🎨 ENCARGO AGENTE GRÁFICO — Íconos del Splash Screen (Clay World)
*Registrado el 2026-06-21 por el Agente Diseño (Antigravity)*

## Contexto

El splash screen ha sido rediseñado con una paleta **"Noche Mágica Clay"**:
- Fondo: cosmos violeta-índigo pastel (`#1e1040 → #4a2d8a → #8e6cff → #c9b8ff`)
- Estrellas: lavanda/rosa suave (sin cian/magenta neón)
- Los íconos de mundos ahora aparecen dentro de **burbujas circulares clay** (borde blanco, fondo translúcido, sombra inferior morada)

Los emojis planos actuales (`🌴 🌊 🧪 ✨ 🚀`) deben ser reemplazados por ilustraciones WebP en estilo Claymorphism 3D.

---

## Especificaciones Técnicas

| Campo | Valor |
|-------|-------|
| Formato | `.webp` con fondo **100% transparente** (alpha channel) |
| Dimensiones | **128×128 px** de lienzo (se escalan a 44px en pantalla) |
| Estilo | Clay World — orgánico, redondeado, sombra inferior sólida clay |
| Iluminación | Cenital cálida, suave, sin bordes duros |
| Destino | `assets/interface/splash_icons/` |
| Margen seguridad | 15% de padding interno (≈20px) para no cortar bordes |

---

## Los 5 Íconos a Generar

### sw0 — Isla (`world_isla.webp`)
**Prompt para generación:**
> 3D clay style icon, 128x128px, transparent background. A cute clay palm tree on a small round island. Tree trunk is orange-ochre clay, 2-3 big rounded green-lime leaf blobs. Brown clay earth base. Soft warm top lighting, thick solid bottom shadow simulating clay depth. No text, no outline, playful and soft.

### sw1 — Océano (`world_oceano.webp`)
**Prompt para generación:**
> 3D clay style icon, 128x128px, transparent background. A cute ocean wave made of layered clay. 3 stacked wave layers in pastel blues: light blue (#90CAF9), sky blue (#4FC3F7), deep blue (#0288D1). White rounded foam crest on top. Solid dark blue bottom shadow for clay depth. Soft warm light from above. No text.

### sw2 — Laboratorio (`world_lab.webp`)
**Prompt para generación:**
> 3D clay style icon, 128x128px, transparent background. A cute clay test tube / science flask. Translucent glass body with yellow-green bubbly liquid inside. Rounded purple clay stopper on top. Small bubbles visible inside. Solid violet bottom shadow for clay volume. Warm top lighting. Playful and soft style.

### sw3 — Destellos (`world_destellos.webp`)
**Prompt para generación:**
> 3D clay style icon, 128x128px, transparent background. A cute 5-pointed clay star in golden yellow (#FFD54F). Soft pearlescent highlight on upper-left. Small silver sparkle trail coming from one tip. Rounded star points, thick solid orange bottom shadow for clay depth. Warm soft lighting from above.

### sw4 — Cohete (`world_cohete.webp`)
**Prompt para generación:**
> 3D clay style icon, 128x128px, transparent background. A small cute clay rocket pointing 45° upper-right. Body in pastel cyan (#90CAF9). Round white porthole window with glossy reflection. Orange-yellow clay flame at base. Fins in light purple clay. Solid blue bottom shadow for clay depth. Warm top lighting. Playful and round shapes.

---

## Acción Posterior

Una vez generados los 5 assets, notificar al Agente Diseño. El Diseño actualizará el HTML del splash (`v51_modular.html`) reemplazando los `<span class="splash-world-icon">` de emoji por `<img>` con las rutas de estos assets.
