---
name: blender-3d
description: >-
  Skill para modelado, texturizado, rigging, animación y renderizado 3D con
  Blender 5.2 LTS vía la API Python (bpy). Usa esta skill cuando el usuario
  pida crear, modificar o renderizar personajes, mascotas, accesorios, escenas
  o cualquier asset 3D para Reto Panda. Cubre modelado procedural con
  primitivas y modificadores, materiales PBR estilo Claymorphism (plastilina),
  configuración de Armature (esqueleto), exportación a .blend/.glb/.webp y
  renderizado headless en Blender desde la terminal.
---

# Blender 3D — Skill para Reto Panda

## Entorno Verificado
- **Blender:** 5.2.2 LTS instalado en `C:\Program Files\Blender Foundation\Blender 5.2\blender.exe`
- **Ejecución headless:** `blender.exe -b -P script.py` (modo background sin GUI)
- **Scripts del proyecto:** `E:\Reto Panda\tools\blender\`
- **Assets de salida:** `E:\Reto Panda\assets\mascotas\`, `E:\Reto Panda\assets\accesorios\`

## Notas de API para Blender 5.2

### Materiales
- `Material.use_nodes = True` está deprecado (se elimina en 6.0) pero sigue funcional.
- Los sockets del Principled BSDF se llaman:
  `Base Color`, `Metallic`, `Roughness`, `IOR`, `Alpha`, `Normal`,
  `Subsurface Weight`, `Subsurface Radius`, `Subsurface Scale`,
  `Specular IOR Level`, `Specular Tint`, `Coat Weight`, `Coat Roughness`,
  `Sheen Weight`, `Emission Color`, `Emission Strength`.
- **NO** existen: `Subsurface Color`, `Specular`, `Clearcoat`, `Sheen`.

### Colecciones
- Para mover un objeto a una colección: `collection.objects.link(obj)` / `collection.objects.unlink(obj)`.
- Iterar colecciones del objeto: `list(obj.users_collection)` (copiar lista antes de mutar).

### Exportación glTF/GLB
- El parámetro `export_armatures` **no existe** en Blender 5.2. Usar `export_skins=True` en su lugar.
- Draco y MeshOptimizer están disponibles de forma nativa.

### Renderizado
- Motor por defecto: `BLENDER_EEVEE`.
- Para fondo transparente: `scene.render.film_transparent = True`.
- Formatos soportados: `PNG` (RGBA), `WEBP` (con quality).

## Estilo Visual Canónico (Claymorphism / Clay World)

Los materiales deben seguir estas especificaciones PBR de plastilina:

| Parámetro | Valor |
|---|---|
| Roughness | 0.42 – 0.55 |
| Subsurface Weight | 0.15 – 0.30 |
| Subsurface Radius | (1.0, 0.7, 0.5) |
| Bump Noise Scale | 40 – 55 |
| Bump Strength | 0.015 – 0.030 |

Referencia completa del personaje Mochi:
- [FICHA_PERSONAJE_MOCHI.md](../../FICHA_PERSONAJE_MOCHI.md)
- [TIER1_CLAY_REQUERIMIENTOS.md](../../TIER1_CLAY_REQUERIMIENTOS.md)

## Paleta de Colores Canónicos de Mochi

| Parte | Color RGBA |
|---|---|
| Pelaje Blanco | (0.95, 0.95, 0.94, 1.0) |
| Pelaje Negro | (0.05, 0.05, 0.055, 1.0) |
| Hoodie Azul | (0.06, 0.44, 0.88, 1.0) |
| Mochila Amarilla | (0.96, 0.72, 0.05, 1.0) |
| Almohadillas Rosa | (0.96, 0.58, 0.65, 1.0) |
| Mejillas Blush | (0.96, 0.50, 0.56, 1.0) |
| Insignia Teal | (0.22, 0.78, 0.82, 1.0) |
| Cremallera Metal | (0.75, 0.77, 0.80, 1.0) |

## Flujo de Trabajo Estándar

1. **Escribir el script Python** en `E:\Reto Panda\tools\blender\`.
2. **Ejecutar en modo headless:**
   ```powershell
   & "C:\Program Files\Blender Foundation\Blender 5.2\blender.exe" -b -P "E:\Reto Panda\tools\blender\mi_script.py"
   ```
3. **Verificar los archivos generados** (.blend, .glb, .png, .webp).
4. **Inspeccionar el render** y ajustar parámetros si es necesario.

## Script Base Existente

El script generador principal ya probado está en:
[generar_avatar_panda.py](../../tools/blender/generar_avatar_panda.py)

Contiene funciones reutilizables:
- `create_clay_material()` — Material PBR estilo plastilina con SSS y bump noise.
- `create_eye_gloss_material()` — Material ultra-brillante para ojos.
- `create_smooth_sphere()` — Esfera suavizada con Subsurf y shade smooth.
- `create_curved_tube()` — Curva bezier con bisel para rasgos faciales y detalles.
- `build_mochi_character()` — Construcción completa del personaje con Armature.
- `export_and_render()` — Pipeline de exportación .blend, .glb, .png y .webp.

## Especificaciones de Entrega

| Parámetro | Valor |
|---|---|
| Resolución de render | 512×512 px |
| Fondo | Transparente (canal alfa) |
| Formato principal | WebP (quality 95) |
| Formato secundario | PNG (RGBA) |
| Formato 3D editable | .blend |
| Formato 3D web/motor | .glb (glTF 2.0 binario) |
