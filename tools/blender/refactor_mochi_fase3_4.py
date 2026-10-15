"""
Script de Refactorización 3D de Mochi - Fases 3 y 4 (Vestimenta, Mochila y Shaders Finales)
Proyecto: Reto Panda
Blender 5.2.2 LTS (bpy)

Fase 3: Sudadera con capucha (hoodie) azul cerúleo (#2B83C6) con mangas cortas con puños, pretina inferior elástica,
        capucha acolchada, cremallera central completa con tirador metálico (#A6AEB5), cordones azules,
        bolsillos canguro divididos con aberturas diagonales y parche circular con picos nevados.
        Mochila amarilla de excursionista (#E3AC34) con correas acolchadas en hombros y pecho,
        cuerpo trapezoidal mullido, solapa superior con 2 correas y hebillas, bolsillo exterior inferior y asa superior en 'U' invertida.
Fase 4: Shaders Clay PBR completos en Cycles con micro-relieve táctil (Bump), SSS orgánico, Color Management y Render final mult vista.
"""

import bpy
import bmesh
import math
import os
from mathutils import Vector, Euler

def hex_to_linear(hex_str, alpha=1.0):
    hex_str = hex_str.lstrip('#')
    r = int(hex_str[0:2], 16) / 255.0
    g = int(hex_str[2:4], 16) / 255.0
    b = int(hex_str[4:6], 16) / 255.0
    return (r ** 2.2, g ** 2.2, b ** 2.2, alpha)

def get_or_create_clay_material(name, hex_color, roughness=0.82, sss_weight=0.04, bump_str=0.025, is_metallic=0.0):
    mat = bpy.data.materials.get(name)
    if not mat:
        mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()
    
    out = nodes.new('ShaderNodeOutputMaterial')
    bsdf = nodes.new('ShaderNodeBsdfPrincipled')
    
    bsdf.inputs['Base Color'].default_value = hex_to_linear(hex_color)
    bsdf.inputs['Roughness'].default_value = roughness
    bsdf.inputs['Metallic'].default_value = is_metallic
    bsdf.inputs['Specular IOR Level'].default_value = 0.25 if is_metallic == 0.0 else 0.50
    
    if 'Subsurface Weight' in bsdf.inputs and sss_weight > 0:
        bsdf.inputs['Subsurface Weight'].default_value = sss_weight
    if 'Subsurface Radius' in bsdf.inputs:
        bsdf.inputs['Subsurface Radius'].default_value = (1.0, 0.7, 0.5)
        
    tex_noise = nodes.new('ShaderNodeTexNoise')
    tex_noise.inputs['Scale'].default_value = 65.0
    tex_noise.inputs['Detail'].default_value = 4.0
    tex_noise.inputs['Roughness'].default_value = 0.7
    
    bump = nodes.new('ShaderNodeBump')
    bump.inputs['Strength'].default_value = bump_str
    bump.inputs['Distance'].default_value = 0.008
    
    links.new(tex_noise.outputs['Fac'], bump.inputs['Height'])
    links.new(bump.outputs['Normal'], bsdf.inputs['Normal'])
    links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])
    return mat

def create_mesh_object(name, collection, bmesh_data, mat=None, subsurf_level=2):
    mesh = bpy.data.meshes.new(name + "_Mesh")
    bmesh_data.to_mesh(mesh)
    bmesh_data.free()
    
    obj = bpy.data.objects.new(name, mesh)
    collection.objects.link(obj)
    
    for p in mesh.polygons:
        p.use_smooth = True
        
    if subsurf_level > 0:
        sub = obj.modifiers.new("Subsurf", 'SUBSURF')
        sub.levels = subsurf_level
        sub.render_levels = subsurf_level
        
    if mat:
        obj.data.materials.append(mat)
        
    return obj

def create_curved_tube(name, collection, points, radius, mat=None):
    curve_data = bpy.data.curves.new(name=name, type='CURVE')
    curve_data.dimensions = '3D'
    curve_data.bevel_depth = radius
    curve_data.bevel_resolution = 4
    curve_data.use_fill_caps = True

    spline = curve_data.splines.new('BEZIER')
    spline.bezier_points.add(len(points) - 1)

    for i, pt in enumerate(points):
        bp = spline.bezier_points[i]
        bp.co = pt
        bp.handle_left_type = 'AUTO'
        bp.handle_right_type = 'AUTO'

    obj = bpy.data.objects.new(name, curve_data)
    collection.objects.link(obj)
    if mat:
        obj.data.materials.append(mat)
    return obj

# ==========================================================
# FASE 3: SUDADERA CON CAPUCHA (BLUE HOODIE)
# ==========================================================
def build_hoodie(collection, mat_hoodie, mat_metal, mat_teal, mat_mtn):
    """
    Sudadera Azul Cerúleo (#2B83C6):
    - Cuerpo con manga corta y puño doblado grueso.
    - Pretina inferior horizontal (deja la franja blanca de la barriga inferior expuesta).
    - Capucha abultada/acolchada alrededor del cuello y descansando en la espalda.
    - Cremallera central completa con tirador metálico (#A6AEB5).
    - Cordones azules verticales.
    - Bolsillos canguro divididos con aberturas diagonales en relieve.
    - Parche del pecho con montañas nevadas en el pectoral izquierdo.
    """
    # 1. Cuerpo principal de la sudadera (ajustado sobre el torso, terminando a media barriga)
    bm_body = bmesh.new()
    bmesh.ops.create_uvsphere(bm_body, u_segments=36, v_segments=28, radius=0.525)
    for v in bm_body.verts:
        # Corte inferior: la sudadera termina en Z = 0.68, dejando la pelvis blanca al descubierto
        if v.co.z < -0.15:
            v.co.z = -0.15
        v.co.x *= 1.05
        v.co.y *= 0.98
        v.co.z *= 1.12
        v.co.z += 0.92
    create_mesh_object("Mochi_Hoodie_Torso_V2", collection, bm_body, mat_hoodie, subsurf_level=2)
    
    # 2. Pretina inferior elástica (Ribbing que rodea la cintura baja)
    rib_pts = []
    num_pts = 24
    for i in range(num_pts + 1):
        angle = (i / num_pts) * 2 * math.pi
        rx = 0.54 * math.cos(angle)
        ry = 0.49 * math.sin(angle)
        rib_pts.append(Vector((rx, ry - 0.02, 0.74)))
    create_curved_tube("Mochi_Hoodie_Bottom_Rib_V2", collection, rib_pts, radius=0.038, mat=mat_hoodie)
    
    # 3. Capucha abultada (Collar grueso alrededor del cuello que cae hacia la espalda)
    bm_hood = bmesh.new()
    bmesh.ops.create_uvsphere(bm_hood, u_segments=32, v_segments=22, radius=0.38)
    for v in bm_hood.verts:
        v.co.x *= 1.30
        v.co.y *= 0.90
        v.co.z *= 0.55
        # volumen hacia atrás descansando sobre hombros
        v.co.y += 0.12
        v.co.z += 1.20
    create_mesh_object("Mochi_Hoodie_Collar_V2", collection, bm_hood, mat_hoodie, subsurf_level=2)

    # 4. Mangas Cortas con Puños Elásticos Gruesos (en ambos brazos simétricos)
    for side in ['L', 'R']:
        sign = 1.0 if side == 'L' else -1.0
        
        # Manga
        bm_sleeve = bmesh.new()
        bmesh.ops.create_uvsphere(bm_sleeve, u_segments=24, v_segments=18, radius=0.19)
        for v in bm_sleeve.verts:
            v.co.z *= 1.15
            v.co.x *= 1.15
            v.co.y *= 1.05
        rot_sleeve = Euler((math.radians(12), math.radians(sign * -26), math.radians(sign * 10)), 'XYZ')
        mat_rot_sleeve = rot_sleeve.to_matrix().to_4x4()
        for v in bm_sleeve.verts:
            v.co = mat_rot_sleeve @ v.co
            v.co.x += sign * 0.52
            v.co.y -= 0.05
            v.co.z += 0.96
        create_mesh_object(f"Mochi_Sleeve_{side}_V2", collection, bm_sleeve, mat_hoodie, subsurf_level=2)
        
        # Puño elástico grueso en el borde de la manga
        bm_cuff = bmesh.new()
        bmesh.ops.create_uvsphere(bm_cuff, u_segments=20, v_segments=14, radius=0.17)
        for v in bm_cuff.verts:
            v.co.z *= 0.35
            v.co.x *= 1.15
            v.co.y *= 1.05
        for v in bm_cuff.verts:
            v.co = mat_rot_sleeve @ v.co
            v.co.x += sign * 0.59
            v.co.y -= 0.06
            v.co.z += 0.84
        create_mesh_object(f"Mochi_Sleeve_Cuff_{side}_V2", collection, bm_cuff, mat_hoodie, subsurf_level=2)

    # 5. Cremallera Central (Zipper) completa con dientes y carro metálico
    zip_pts = [
        Vector((0.0, -0.52, 1.25)),
        Vector((0.0, -0.55, 1.05)),
        Vector((0.0, -0.54, 0.88)),
        Vector((0.0, -0.53, 0.74))
    ]
    create_curved_tube("Mochi_Zipper_Track_V2", collection, zip_pts, radius=0.015, mat=mat_metal)
    
    # Carro / Tirador metálico (#A6AEB5)
    bm_pull = bmesh.new()
    bmesh.ops.create_cube(bm_pull, size=0.045)
    for v in bm_pull.verts:
        v.co.x *= 0.7
        v.co.y *= 0.8
        v.co.z *= 1.6
        v.co.y -= 0.58
        v.co.z += 1.12
    create_mesh_object("Mochi_Zipper_Slider_V2", collection, bm_pull, mat_metal, subsurf_level=1)
    
    # 6. Cordones Azules del Hoodie
    cord_L = [
        Vector((0.08, -0.52, 1.22)),
        Vector((0.09, -0.54, 1.08)),
        Vector((0.07, -0.53, 0.94))
    ]
    cord_R = [
        Vector((-0.08, -0.52, 1.22)),
        Vector((-0.09, -0.54, 1.10)),
        Vector((-0.08, -0.53, 0.98))
    ]
    create_curved_tube("Mochi_Hoodie_Cord_L_V2", collection, cord_L, radius=0.010, mat=mat_hoodie)
    create_curved_tube("Mochi_Hoodie_Cord_R_V2", collection, cord_R, radius=0.010, mat=mat_hoodie)

    # 7. Bolsillos Canguro Divididos con abertura diagonal
    for side in ['L', 'R']:
        sign = 1.0 if side == 'L' else -1.0
        bm_pocket = bmesh.new()
        bmesh.ops.create_uvsphere(bm_pocket, u_segments=20, v_segments=16, radius=0.18)
        for v in bm_pocket.verts:
            v.co.x *= 1.1
            v.co.y *= 0.28
            v.co.z *= 0.75
            # abertura diagonal exterior
            if v.co.x * sign > 0.05:
                v.co.z *= 0.70
            v.co.x += sign * 0.16
            v.co.y -= 0.50
            v.co.z += 0.82
        create_mesh_object(f"Mochi_Pocket_{side}_V2", collection, bm_pocket, mat_hoodie, subsurf_level=2)

    # 8. Parche Circular de Montaña en Pecho Izquierdo (Pectoral Izquierdo)
    bm_patch = bmesh.new()
    bmesh.ops.create_uvsphere(bm_patch, u_segments=24, v_segments=16, radius=0.095)
    for v in bm_patch.verts:
        v.co.y *= 0.18
        v.co.x *= 1.0
        v.co.z *= 1.0
    rot_patch = Euler((math.radians(22), math.radians(35), math.radians(-18)), 'XYZ')
    mat_rot_patch = rot_patch.to_matrix().to_4x4()
    for v in bm_patch.verts:
        v.co = mat_rot_patch @ v.co
        v.co.x += 0.23
        v.co.y -= 0.45
        v.co.z += 1.04
    create_mesh_object("Mochi_Badge_Rim_V2", collection, bm_patch, mat_teal, subsurf_level=2)
    
    # Picos de montaña nevada en relieve blanco (#F2EFE9)
    bm_mtn = bmesh.new()
    bmesh.ops.create_cone(bm_mtn, cap_ends=True, segments=16, radius1=0.05, radius2=0.0, depth=0.07)
    for v in bm_mtn.verts:
        v.co = mat_rot_patch @ v.co
        v.co.x += 0.235
        v.co.y -= 0.468
        v.co.z += 1.04
    create_mesh_object("Mochi_Badge_Mountain_V2", collection, bm_mtn, mat_mtn, subsurf_level=1)

# ==========================================================
# FASE 3 (PARTE 2): MOCHILA AMARILLA DE EXCURSIONISTA
# ==========================================================
def build_backpack(collection, mat_yellow):
    """
    Mochila Amarilla Ocre (#E3AC34):
    - Correas acolchadas gruesas que pasan sobre hombros y bajan por el pecho.
    - Cuerpo trapezoidal mullido en el centro de la espalda.
    - Solapa superior con 2 correas y hebillas esculpidas.
    - Bolsillo exterior inferior rectangular abultado.
    - Asa superior curva en 'U' invertida.
    """
    # 1. Cuerpo Principal Trapezoidal Mullido
    bm_pack = bmesh.new()
    bmesh.ops.create_uvsphere(bm_pack, u_segments=32, v_segments=24, radius=0.34)
    for v in bm_pack.verts:
        # Base más ancha que la parte superior (trapezoidal)
        if v.co.z < 0:
            v.co.x *= (1.0 - v.co.z * 0.40)
        v.co.x *= 1.15
        v.co.y *= 0.78
        v.co.z *= 1.25
        v.co.y += 0.45
        v.co.z += 0.94
    create_mesh_object("Mochi_Backpack_Body_V2", collection, bm_pack, mat_yellow, subsurf_level=2)

    # 2. Solapa Superior (Flap que cubre la mitad alta de la mochila)
    bm_flap = bmesh.new()
    bmesh.ops.create_uvsphere(bm_flap, u_segments=28, v_segments=20, radius=0.31)
    for v in bm_flap.verts:
        v.co.x *= 1.18
        v.co.y *= 0.55
        v.co.z *= 0.70
        v.co.y += 0.48
        v.co.z += 1.10
    create_mesh_object("Mochi_Backpack_Flap_V2", collection, bm_flap, mat_yellow, subsurf_level=2)

    # 3. Dos Correas de Cierre Verticales con Hebillas
    for side in ['L', 'R']:
        sign = 1.0 if side == 'L' else -1.0
        # Correa vertical
        bm_strap_v = bmesh.new()
        bmesh.ops.create_cube(bm_strap_v, size=0.04)
        for v in bm_strap_v.verts:
            v.co.x *= 0.65
            v.co.y *= 0.30
            v.co.z *= 3.8
            v.co.x += sign * 0.14
            v.co.y += 0.62
            v.co.z += 1.02
        create_mesh_object(f"Mochi_Pack_Strap_V_{side}_V2", collection, bm_strap_v, mat_yellow, subsurf_level=1)
        
        # Hebilla / Tope horizontal
        bm_buckle = bmesh.new()
        bmesh.ops.create_cube(bm_buckle, size=0.035)
        for v in bm_buckle.verts:
            v.co.x *= 1.4
            v.co.y *= 0.5
            v.co.z *= 0.6
            v.co.x += sign * 0.14
            v.co.y += 0.63
            v.co.z += 1.05
        create_mesh_object(f"Mochi_Pack_Buckle_{side}_V2", collection, bm_buckle, mat_yellow, subsurf_level=1)

    # 4. Bolsillo Exterior Inferior (Rectangular abultado con esquinas redondeadas)
    bm_pocket = bmesh.new()
    bmesh.ops.create_uvsphere(bm_pocket, u_segments=24, v_segments=18, radius=0.22)
    for v in bm_pocket.verts:
        v.co.x *= 1.35
        v.co.y *= 0.45
        v.co.z *= 0.65
        v.co.y += 0.58
        v.co.z += 0.84
    create_mesh_object("Mochi_Backpack_Pocket_V2", collection, bm_pocket, mat_yellow, subsurf_level=2)

    # 5. Asa Superior Curva en Arco ("U" invertida)
    handle_pts = [
        Vector((-0.08, 0.40, 1.25)),
        Vector((-0.06, 0.43, 1.35)),
        Vector((0.0, 0.44, 1.38)),
        Vector((0.06, 0.43, 1.35)),
        Vector((0.08, 0.40, 1.25))
    ]
    create_curved_tube("Mochi_Backpack_Handle_V2", collection, handle_pts, radius=0.024, mat=mat_yellow)

    # 6. Correas de los Hombros y Conexión Pecho
    for side in ['L', 'R']:
        sign = 1.0 if side == 'L' else -1.0
        pts_shoulder = [
            Vector((sign * 0.20, 0.35, 1.08)),
            Vector((sign * 0.30, 0.10, 1.22)),
            Vector((sign * 0.34, -0.15, 1.15)),
            Vector((sign * 0.30, -0.32, 0.95)),
            Vector((sign * 0.28, -0.35, 0.78))
        ]
        create_curved_tube(f"Mochi_Shoulder_Strap_{side}_V2", collection, pts_shoulder, radius=0.040, mat=mat_yellow)
        
        # Correa lateral inferior que pasa bajo la axila a la base de la mochila
        pts_side = [
            Vector((sign * 0.28, -0.35, 0.78)),
            Vector((sign * 0.40, -0.05, 0.78)),
            Vector((sign * 0.24, 0.35, 0.82))
        ]
        create_curved_tube(f"Mochi_Side_Strap_{side}_V2", collection, pts_side, radius=0.025, mat=mat_yellow)

# ==========================================================
# FASE 4: CONFIGURACIÓN CYCLES Y RENDERS FINALES
# ==========================================================
def setup_cycles_and_color_management():
    scene = bpy.context.scene
    scene.render.engine = 'CYCLES'
    
    # Configurar dispositivo GPU si está disponible, o CPU
    cycles = scene.cycles
    cycles.samples = 128
    cycles.preview_samples = 32
    cycles.use_denoising = True
    
    # Color Management (AgX / Filmic)
    scene.view_settings.view_transform = 'AgX'
    scene.view_settings.look = 'AgX - Medium High Contrast'
    scene.view_settings.exposure = 0.15

def render_final_turnaround(output_dir, cams):
    os.makedirs(output_dir, exist_ok=True)
    scene = bpy.context.scene
    scene.render.resolution_x = 1024
    scene.render.resolution_y = 1024
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGBA'
    
    results = {}
    for view_name, cam_obj in cams.items():
        scene.camera = cam_obj
        filepath = os.path.join(output_dir, f"mochi_clay_v2_{view_name}.png")
        scene.render.filepath = filepath
        print(f"Renderizando Cycles [{view_name.upper()}] a: {filepath}")
        bpy.ops.render.render(write_still=True)
        results[view_name] = filepath
        
    # Renderizar también en WebP 512x512 para la PWA de Reto Panda
    scene.render.resolution_x = 512
    scene.render.resolution_y = 512
    scene.render.image_settings.file_format = 'WEBP'
    scene.render.image_settings.quality = 95
    scene.camera = cams['front']
    webp_path = os.path.join(r"E:\Reto Panda\assets\mascotas\mochi", "mochi_avatar_v2.webp")
    scene.render.filepath = webp_path
    print(f"Renderizando WebP PWA a: {webp_path}")
    bpy.ops.render.render(write_still=True)
    results['pwa_webp'] = webp_path
    
    return results

def add_three_quarter_camera(cams, col_studio):
    """Añade cámara 3/4 para completar el turnaround idéntico a la hoja de diseño."""
    cam_34 = bpy.data.objects.get("Cam_ThreeQuarter_V2")
    if not cam_34:
        c_data = bpy.data.cameras.new("Cam_ThreeQuarter_V2")
        c_data.lens = 72
        cam_34 = bpy.data.objects.new("Cam_ThreeQuarter_V2", c_data)
        col_studio.objects.link(cam_34)
        
    dist = 5.2
    angle = math.radians(40)  # 40° hacia la derecha
    cam_34.location = (dist * math.sin(angle), -dist * math.cos(angle), 0.95)
    cam_34.rotation_euler = (math.radians(88.5), 0, angle)
    cams['three_quarter'] = cam_34

def main():
    print("=== INICIANDO FASES 3 Y 4: VESTIMENTA, MOCHILA Y SHADERS CYCLES ===")
    v2_col = bpy.data.collections.get("Mochi_Clay_V2")
    if not v2_col:
        print("Error: No se encontró colección Mochi_Clay_V2")
        return
        
    col_clothes = bpy.data.collections.get("Mochi_V2_Clothes") or bpy.data.collections.new("Mochi_V2_Clothes")
    for obj in list(col_clothes.objects):
        bpy.data.objects.remove(obj, do_unlink=True)
    if col_clothes.name not in v2_col.children:
        v2_col.children.link(col_clothes)
    col_clothes.hide_viewport = False
    col_clothes.hide_render = False

    # Materiales Fase 3 y 4
    mat_hoodie = get_or_create_clay_material("MAT_Hoodie_Azul", "#2B83C6", roughness=0.80, sss_weight=0.04)
    mat_metal = get_or_create_clay_material("MAT_Metal_Cierre", "#A6AEB5", roughness=0.45, is_metallic=0.65)
    mat_yellow = get_or_create_clay_material("MAT_Mochila_Amarilla", "#E3AC34", roughness=0.82, sss_weight=0.04)
    mat_teal = get_or_create_clay_material("MAT_Parche_Turquesa", "#48B2B8", roughness=0.78)
    mat_mtn = get_or_create_clay_material("MAT_Parche_Montaña", "#F2EFE9", roughness=0.70)

    print("Construyendo Sudadera Azul con capucha, cremallera completa, bolsillos y parche...")
    build_hoodie(col_clothes, mat_hoodie, mat_metal, mat_teal, mat_mtn)

    print("Construyendo Mochila Amarilla completa (correas, solapa, hebillas, bolsillo exterior, asa)...")
    build_backpack(col_clothes, mat_yellow)

    print("Configurando motor Cycles y Color Management...")
    setup_cycles_and_color_management()

    col_studio = bpy.data.collections.get("Studio_Setup")
    cams = {
        'front': bpy.data.objects.get("Cam_Front_V2"),
        'profile': bpy.data.objects.get("Cam_Profile_V2"),
        'back': bpy.data.objects.get("Cam_Back_V2")
    }
    add_three_quarter_camera(cams, col_studio)

    blend_path = r"E:\Reto Panda\assets\mascotas\mochi\mochi_avatar_3d.blend"
    print(f"Guardando proyecto final .blend en: {blend_path}")
    bpy.ops.wm.save_as_mainfile(filepath=blend_path)

    # Exportar modelo 3D GLB completo
    glb_path = r"E:\Reto Panda\assets\mascotas\mochi\mochi_avatar_v2.glb"
    print(f"Exportando GLB final a: {glb_path}")
    try:
        bpy.ops.export_scene.gltf(
            filepath=glb_path,
            export_format='GLB',
            use_selection=False,
            export_apply=True,
            export_materials='EXPORT',
            export_skins=True
        )
    except Exception as e:
        print(f"Aviso GLB: {e}")

    # Renders de verificación final en disco (Turnaround de 4 vistas)
    out_dir = r"E:\Reto Panda\assets\mascotas\mochi\turnaround_final_v2"
    render_final_turnaround(out_dir, cams)
    print("=== FASES 3 Y 4 COMPLETADAS CON ÉXITO ===")

if __name__ == "__main__":
    main()
