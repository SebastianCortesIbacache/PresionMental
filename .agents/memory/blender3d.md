# 🧊 Memoria: Agente Blender 3D
## Reto Panda | Modelado 3D, Rigging y Renderizado Claymorphism

---

# 🚨 DIRECTIVA GLOBAL: PIVOTE ESTRATÉGICO 🚨
1. **Scope:** Concentración en **Tier 1 (6-7 años, Clay World)**. Todos los personajes y objetos deben transmitir suavidad táctil, ternura y cero aristas agresivas.
2. **Estilo Visual:** Plastilina y arcilla horneada stop-motion (*Juicy Claymorphism*). Materiales con Subsurface Scattering (SSS cálido), micro-ondulación táctil (Bump Noise) y brillo suave.
3. **PWA Offline-First y Rendimiento Web:** Renders 2D en `.webp` 512×512 con canal alfa ultra optimizados (<40 KB) y modelos 3D en `.glb` (glTF 2.0 binario) con mallas optimizadas.
4. **Automatización Headless:** Todo asset se genera o actualiza mediante scripts Python (`bpy`) ejecutados en background con Blender 5.2 LTS.

---

## 🆔 ID de Conversación y Estado
- **ID Conversación:** `d2a48e89-ee5c-43c7-b6b4-853da199fd85`
- **Última Actualización:** 2026-10-14
- **Entorno Verificado:** Blender 5.2.2 LTS en `C:\Program Files\Blender Foundation\Blender 5.2\blender.exe`
- **Estado Actual:** 🟢 Modelo 3D de Mochi refactorizado con éxito a **V2 Claymation Stop-Motion** (A-Pose simétrica, ojos 3D abiertos, boca sonriente con lengua, sudadera azul con capucha, mochila amarilla de excursionista y shaders procedurales PBR Cycles). Turnaround completo de 4 vistas renderizado y validado.

---

## 📦 Inventario de Assets 3D Generados

### 1. Mochi (Avatar Canónico V2 - Stop-Motion Claymation)
| Archivo | Formato | Tamaño | Ubicación | Descripción y Estado |
|---|---|---|---|---|
| `mochi_avatar_3d.blend` | `.blend` | ~650 KB | `assets/mascotas/mochi/mochi_avatar_3d.blend` | ✅ Proyecto maestro editable. Contiene `Mochi_Clay_V2` (alta fidelidad) y respaldo no destructivo `Backup_Mochi_V1`. |
| `mochi_avatar_v2.glb` | `.glb` | ~4.2 MB | `assets/mascotas/mochi/mochi_avatar_v2.glb` | ✅ Modelo 3D glTF 2.0 binario completo optimizado para WebGL/Three.js/Babylon con jerarquía limpia. |
| `mochi_avatar_v2.webp` | `.webp` | ~25 KB | `assets/mascotas/mochi/mochi_avatar_v2.webp` | ✅ Render 512×512 con canal alfa ultra-optimizado para la PWA de Reto Panda. |
| `mochi_clay_v2_front.png` | `.png` | ~580 KB | `assets/mascotas/mochi/turnaround_final_v2/` | ✅ Vista Frontal (1024×1024 Cycles AgX, SSS, Bump táctil). |
| `mochi_clay_v2_three_quarter.png` | `.png` | ~550 KB | `assets/mascotas/mochi/turnaround_final_v2/` | ✅ Vista Tres Cuartos (1024×1024 Cycles AgX). |
| `mochi_clay_v2_profile.png` | `.png` | ~500 KB | `assets/mascotas/mochi/turnaround_final_v2/` | ✅ Vista Perfil Derecho (1024×1024 Cycles AgX). |
| `mochi_clay_v2_back.png` | `.png` | ~520 KB | `assets/mascotas/mochi/turnaround_final_v2/` | ✅ Vista Posterior (1024×1024 Cycles AgX). |

### 2. Mochi (Versión Histórica V1 - Respaldo)
| Archivo | Formato | Ubicación | Estado |
|---|---|---|---|
| `mochi_avatar.glb` | `.glb` | `assets/mascotas/mochi/mochi_avatar.glb` | Respaldo V1 (pose de saludo asimétrica) |
| `mochi_render_winking.png` | `.png` | `assets/mascotas/mochi/mochi_render_winking.png` | Respaldo render V1 |

### 2. Herramientas y Scripts (`tools/blender/`)
| Script | Ubicación | Función |
|---|---|---|
| `generar_avatar_panda.py` | `tools/blender/generar_avatar_panda.py` | Script generador procedural completo: anatomía, ropa, materiales PBR, Armature, iluminación de 3 puntos y exportador multiformato. |

### 3. Especificaciones del Armature (Rig)
- `root`: Base a nivel de suelo.
- `spine`: Control del torso y rotación corporal.
- `head`: Control de cabeza e inclinación.
- `ear_L` / `ear_R`: Huesos para articulación y expresividad de orejas.
- `upper_arm_L` / `forearm_L`: Brazo izquierdo levantado saludando con huellitas rosadas.
- `upper_arm_R` / `forearm_R`: Brazo derecho relajado al costado.
- `thigh_L` / `thigh_R`: Extremidades inferiores y soporte.

---

## 📋 Próximas Tareas en Pipeline

### 🚨 PRIORIDAD INMEDIATA Nº 1 (ORDEN DEL USER - 2026-10-14)
- **Estado de Integración Web:** 🟡 **STAND-BY** (pausada cualquier integración en código HTML/JS/Three.js hasta tener el modelo 3D perfecto).
- **Misión de Taller 3D:** **Afinar el modelo 3D de Mochi en Blender 5.2 LTS** hasta lograr fidelidad 1:1 absoluta con el diseño canónico 2D:
  1. Comparar geometría contra `FICHA_PERSONAJE_MOCHI.md` y referencias visuales aprobadas (`mochi_canonico_referencia.jpg`).
  2. Ajustar proporciones anatómicas (efecto *Kindchenschema*: cabeza grande, cuerpo rechoncho, patas acolchadas sin aristas).
  3. Pulir rasgos faciales: manchas oculares inclinadas, brillo especular doble en ojos, mejillas sonrojadas aerografiadas y hocico tierno.
  4. Perfeccionar modelado de vestuario: sudadera/hoodie azul cobalto con cremallera y mochila mostaza con correas frontales.
  5. Calibrar materiales PBR Claymorphism (Subsurface Scattering cálido, micro-ondulación de plastilina con Bump Noise sutil).
  6. Generar turnarounds de inspección visual (frontal, 3/4, perfil, espalda) para aprobación del USER.

### Tareas Secundarias (Posteriores a la aprobación del modelo base):
1. Generación de las poses canónicas de Mochi para UI (`R-SPLASH`, `R-GAME-IDLE`, `R-GAME-WIN`, `R-GAME-TRY`).
2. Modelado y optimización de accesorios 3D (`c_nerd`, `c_hat`, `c_crown`, `c_hero`).
3. Modelado 3D procedural de las mascotas de la tienda (`m_cat`, `m_dog`, etc.).
