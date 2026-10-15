"""
Generador 3D Procedural de Mochi (Avatar Canónico - Winking Version)
para Reto Panda utilizando Blender 5.2 (bpy).
Genera:
 - mochi_avatar_3d.blend (Escena completa editable con Armature y Modificadores)
 - mochi_avatar.glb (Modelo 3D optimizado para Web / Three.js)
 - mochi_render_winking.png y .webp (512x512 con canal alfa para UI de Reto Panda)
"""

import bpy
import bmesh
import math
import os
from mathutils import Vector, Euler

def reset_scene():
    """Limpia todos los objetos y datos previos para una escena pura."""
    bpy.ops.wm.read_factory_settings(use_empty=True)
    if not bpy.data.scenes:
        bpy.data.scenes.new("Scene")

def create_collection(name, parent_col=None):
    col = bpy.data.collections.new(name)
    if parent_col:
        parent_col.children.link(col)
    else:
        bpy.context.scene.collection.children.link(col)
    return col

def link_to_col(obj, col):
    for c in list(obj.users_collection):
        c.objects.unlink(obj)
    col.objects.link(obj)

def create_clay_material(name, base_color, roughness=0.48, sss_weight=0.25, sss_radius=(1.0, 0.7, 0.5), is_metallic=0.0):
    """Crea un material PBR estilo plastilina/claymorphism con Subsurface Scattering."""
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    output = nodes.new('ShaderNodeOutputMaterial')
    output.location = (400, 0)

    bsdf = nodes.new('ShaderNodeBsdfPrincipled')
    bsdf.location = (0, 0)

    if 'Base Color' in bsdf.inputs:
        bsdf.inputs['Base Color'].default_value = base_color
    if 'Roughness' in bsdf.inputs:
        bsdf.inputs['Roughness'].default_value = roughness
    if 'Metallic' in bsdf.inputs:
        bsdf.inputs['Metallic'].default_value = is_metallic
    if 'Subsurface Weight' in bsdf.inputs:
        bsdf.inputs['Subsurface Weight'].default_value = sss_weight
    if 'Subsurface Radius' in bsdf.inputs:
        bsdf.inputs['Subsurface Radius'].default_value = sss_radius
    if 'Specular IOR Level' in bsdf.inputs:
        bsdf.inputs['Specular IOR Level'].default_value = 0.5

    # Añadir sutil micro-rugosidad de plastilina
    noise = nodes.new('ShaderNodeTexNoise')
    noise.location = (-400, -200)
    noise.inputs['Scale'].default_value = 50.0
    noise.inputs['Detail'].default_value = 2.0
    noise.inputs['Roughness'].default_value = 0.5

    bump = nodes.new('ShaderNodeBump')
    bump.location = (-150, -200)
    bump.inputs['Strength'].default_value = 0.02
    bump.inputs['Distance'].default_value = 0.1

    links.new(noise.outputs['Fac'], bump.inputs['Height'])
    links.new(bump.outputs['Normal'], bsdf.inputs['Normal'])
    links.new(bsdf.outputs['BSDF'], output.inputs['Surface'])

    return mat

def create_eye_gloss_material(name, base_color):
    """Material ultra-brillante para los ojos o reflejos."""
    mat = bpy.data.materials.new(name=name)
    mat.use_nodes = True
    nodes = mat.node_tree.nodes
    links = mat.node_tree.links
    nodes.clear()

    output = nodes.new('ShaderNodeOutputMaterial')
    bsdf = nodes.new('ShaderNodeBsdfPrincipled')
    if 'Base Color' in bsdf.inputs:
        bsdf.inputs['Base Color'].default_value = base_color
    if 'Roughness' in bsdf.inputs:
        bsdf.inputs['Roughness'].default_value = 0.06
    if 'Specular IOR Level' in bsdf.inputs:
        bsdf.inputs['Specular IOR Level'].default_value = 0.95

    links.new(bsdf.outputs['BSDF'], output.inputs['Surface'])
    return mat

def create_smooth_sphere(name, radius, location, scale=(1, 1, 1), rotation=(0, 0, 0), mat=None):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=32, ring_count=24, radius=radius, location=location, rotation=rotation)
    obj = bpy.context.active_object
    obj.name = name
    obj.scale = scale
    bpy.ops.object.shade_smooth()

    subsurf = obj.modifiers.new("Subsurf", 'SUBSURF')
    subsurf.levels = 1
    subsurf.render_levels = 2

    if mat:
        obj.data.materials.append(mat)
    return obj

def create_curved_tube(name, points, radius, mat=None):
    """Crea una curva bezier 3D con bisel para representar rasgos o cordones."""
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
    bpy.context.scene.collection.objects.link(obj)

    if mat:
        obj.data.materials.append(mat)
    return obj

def build_mochi_character():
    print("Iniciando construcción refinada de Mochi Avatar 3D...")
    reset_scene()

    # Colecciones organizadas
    col_root = create_collection("Mochi_Character")
    col_head = create_collection("Head_and_Face", col_root)
    col_body = create_collection("Body_and_Limbs", col_root)
    col_clothes = create_collection("Clothes_and_Gear", col_root)
    col_rig = create_collection("Armature_Rig", col_root)
    col_studio = create_collection("Studio_Setup")

    # 1. Materiales PBR
    mat_white = create_clay_material("Clay_White", (0.95, 0.95, 0.94, 1.0), roughness=0.45, sss_weight=0.28)
    mat_black = create_clay_material("Clay_Black", (0.05, 0.05, 0.055, 1.0), roughness=0.50, sss_weight=0.15)
    mat_pink_blush = create_clay_material("Clay_Blush", (0.96, 0.50, 0.56, 1.0), roughness=0.6, sss_weight=0.4)
    mat_pink_pads = create_clay_material("Clay_PawPads", (0.96, 0.58, 0.65, 1.0), roughness=0.42, sss_weight=0.3)
    mat_mouth_inside = create_clay_material("Clay_MouthInside", (0.68, 0.08, 0.14, 1.0), roughness=0.3)
    mat_tongue = create_clay_material("Clay_Tongue", (0.96, 0.42, 0.52, 1.0), roughness=0.35, sss_weight=0.3)
    mat_eye_iris = create_eye_gloss_material("Clay_EyeGloss", (0.04, 0.03, 0.03, 1.0))
    mat_eye_shine = create_eye_gloss_material("Clay_EyeHighlight", (1.0, 1.0, 1.0, 1.0))
    mat_blue_hoodie = create_clay_material("Clay_BlueHoodie", (0.06, 0.44, 0.88, 1.0), roughness=0.52, sss_weight=0.2)
    mat_yellow_pack = create_clay_material("Clay_YellowPack", (0.96, 0.72, 0.05, 1.0), roughness=0.48, sss_weight=0.25)
    mat_teal_badge = create_clay_material("Clay_TealBadge", (0.22, 0.78, 0.82, 1.0), roughness=0.40)
    mat_badge_mtn = create_clay_material("Clay_BadgeMountain", (0.92, 0.98, 1.0, 1.0), roughness=0.35)
    mat_zipper = create_clay_material("Clay_ZipperMetal", (0.75, 0.77, 0.80, 1.0), roughness=0.25, is_metallic=0.85)

    mesh_objects = []

    # ==========================================
    # CABEZA Y RASGOS FACIALES
    # ==========================================
    head_z = 1.48
    head = create_smooth_sphere("Mochi_Head", radius=0.58, location=(0, 0, head_z), scale=(1.06, 0.94, 0.94), mat=mat_white)
    link_to_col(head, col_head)
    mesh_objects.append(head)

    # Orejas (Negras, semiesferas en la parte superior-lateral)
    ear_L = create_smooth_sphere("Mochi_Ear_L", radius=0.19, location=(0.40, -0.05, head_z + 0.44), 
                                 scale=(1.0, 0.55, 1.0), rotation=(0.1, 0.4, -0.2), mat=mat_black)
    ear_R = create_smooth_sphere("Mochi_Ear_R", radius=0.19, location=(-0.40, -0.05, head_z + 0.44), 
                                 scale=(1.0, 0.55, 1.0), rotation=(0.1, -0.4, 0.2), mat=mat_black)
    link_to_col(ear_L, col_head)
    link_to_col(ear_R, col_head)
    mesh_objects.extend([ear_L, ear_R])

    # Parches negros en los ojos (redondeados, ligeramente inclinados hacia afuera)
    patch_L = create_smooth_sphere("Mochi_EyePatch_L", radius=0.19, location=(0.22, -0.45, head_z + 0.04),
                                  scale=(0.95, 0.32, 1.15), rotation=(0.18, 0.22, -0.25), mat=mat_black)
    patch_R = create_smooth_sphere("Mochi_EyePatch_R", radius=0.19, location=(-0.22, -0.45, head_z + 0.04),
                                  scale=(0.95, 0.32, 1.15), rotation=(0.18, -0.22, 0.25), mat=mat_black)
    link_to_col(patch_L, col_head)
    link_to_col(patch_R, col_head)
    mesh_objects.extend([patch_L, patch_R])

    # Ojo Derecho (Abierto, brillante, alegre)
    eye_R = create_smooth_sphere("Mochi_Eye_Open_R", radius=0.088, location=(-0.21, -0.52, head_z + 0.04),
                                 scale=(1.0, 0.35, 1.08), rotation=(0.12, -0.15, 0.1), mat=mat_eye_iris)
    # Reflejos en el ojo derecho (doble brillo blanco)
    shine_R1 = create_smooth_sphere("Mochi_EyeShine_1", radius=0.030, location=(-0.23, -0.55, head_z + 0.075),
                                   scale=(1, 0.4, 1), mat=mat_eye_shine)
    shine_R2 = create_smooth_sphere("Mochi_EyeShine_2", radius=0.015, location=(-0.18, -0.55, head_z + 0.015),
                                   scale=(1, 0.4, 1), mat=mat_eye_shine)
    link_to_col(eye_R, col_head)
    link_to_col(shine_R1, col_head)
    link_to_col(shine_R2, col_head)
    mesh_objects.extend([eye_R, shine_R1, shine_R2])

    # Ojo Izquierdo (GUIÑANDO - Arco curvado de plastilina negra suave ;) )
    wink_pts = [
        Vector((0.14, -0.51, head_z + 0.02)),
        Vector((0.21, -0.54, head_z + 0.075)),
        Vector((0.29, -0.51, head_z + 0.025))
    ]
    wink_eye_L = create_curved_tube("Mochi_Eye_Wink_L", wink_pts, radius=0.020, mat=mat_black)
    link_to_col(wink_eye_L, col_head)

    # Cejas suaves
    brow_L = create_curved_tube("Mochi_Eyebrow_L", [
        Vector((0.16, -0.47, head_z + 0.24)),
        Vector((0.22, -0.48, head_z + 0.27)),
        Vector((0.29, -0.45, head_z + 0.25))
    ], radius=0.015, mat=mat_black)
    brow_R = create_curved_tube("Mochi_Eyebrow_R", [
        Vector((-0.16, -0.47, head_z + 0.24)),
        Vector((-0.22, -0.48, head_z + 0.27)),
        Vector((-0.29, -0.45, head_z + 0.25))
    ], radius=0.015, mat=mat_black)
    link_to_col(brow_L, col_head)
    link_to_col(brow_R, col_head)

    # Hocico / Muzzle (suave bulto blanco)
    snout = create_smooth_sphere("Mochi_Snout", radius=0.18, location=(0, -0.48, head_z - 0.10),
                                scale=(1.12, 0.65, 0.62), mat=mat_white)
    # Nariz negra redondeada
    nose = create_smooth_sphere("Mochi_Nose", radius=0.065, location=(0, -0.60, head_z - 0.06),
                                scale=(1.2, 0.5, 0.75), mat=mat_black)
    link_to_col(snout, col_head)
    link_to_col(nose, col_head)
    mesh_objects.extend([snout, nose])

    # Boca sonriente y abierta con labios negros suaves
    mouth_lip = create_curved_tube("Mochi_Smile_Lip", [
        Vector((-0.09, -0.54, head_z - 0.14)),
        Vector((0.0, -0.57, head_z - 0.17)),
        Vector((0.09, -0.54, head_z - 0.14))
    ], radius=0.012, mat=mat_black)
    mouth_bg = create_smooth_sphere("Mochi_Mouth_Inside", radius=0.075, location=(0, -0.53, head_z - 0.17),
                                   scale=(1.1, 0.35, 0.70), mat=mat_mouth_inside)
    tongue = create_smooth_sphere("Mochi_Tongue", radius=0.05, location=(0, -0.54, head_z - 0.19),
                                 scale=(1.0, 0.35, 0.55), mat=mat_tongue)
    link_to_col(mouth_lip, col_head)
    link_to_col(mouth_bg, col_head)
    link_to_col(tongue, col_head)
    mesh_objects.extend([mouth_bg, tongue])

    # Mejillas sonrosadas (Blush)
    cheek_L = create_smooth_sphere("Mochi_Cheek_L", radius=0.10, location=(0.34, -0.40, head_z - 0.09),
                                  scale=(1.0, 0.25, 0.65), rotation=(0.1, 0.25, -0.2), mat=mat_pink_blush)
    cheek_R = create_smooth_sphere("Mochi_Cheek_R", radius=0.10, location=(-0.34, -0.40, head_z - 0.09),
                                  scale=(1.0, 0.25, 0.65), rotation=(0.1, -0.25, 0.2), mat=mat_pink_blush)
    link_to_col(cheek_L, col_head)
    link_to_col(cheek_R, col_head)
    mesh_objects.extend([cheek_L, cheek_R])

    # ==========================================
    # CUERPO Y ROPA (BLUE HOODIE & BACKPACK)
    # ==========================================
    torso = create_smooth_sphere("Mochi_Torso", radius=0.50, location=(0, -0.02, 0.82),
                                scale=(1.04, 0.94, 1.12), mat=mat_white)
    link_to_col(torso, col_body)
    mesh_objects.append(torso)

    # Polerón Azul
    hoodie = create_smooth_sphere("Mochi_Hoodie_Main", radius=0.53, location=(0, -0.02, 0.85),
                                 scale=(1.06, 0.96, 1.10), mat=mat_blue_hoodie)
    # Bolsillo Canguro Frontal
    pocket = create_smooth_sphere("Mochi_Hoodie_Pocket", radius=0.25, location=(0, -0.48, 0.68),
                                 scale=(1.35, 0.30, 0.75), rotation=(-0.1, 0, 0), mat=mat_blue_hoodie)
    # Cuello / capucha recogida
    hood_collar = create_smooth_sphere("Mochi_Hood_Collar", radius=0.38, location=(0, 0.08, head_z - 0.32),
                                      scale=(1.25, 0.85, 0.45), rotation=(0.25, 0, 0), mat=mat_blue_hoodie)
    link_to_col(hoodie, col_clothes)
    link_to_col(pocket, col_clothes)
    link_to_col(hood_collar, col_clothes)
    mesh_objects.extend([hoodie, pocket, hood_collar])

    # Cremallera (Corta, va desde el cuello hasta el bolsillo)
    zipper = create_curved_tube("Mochi_Zipper", [
        Vector((0, -0.52, 1.16)),
        Vector((0, -0.54, 0.98)),
        Vector((0, -0.53, 0.82))
    ], radius=0.012, mat=mat_zipper)
    zip_pull = create_smooth_sphere("Mochi_Zipper_Pull", radius=0.028, location=(0, -0.56, 1.05),
                                   scale=(0.5, 0.7, 1.3), mat=mat_zipper)
    link_to_col(zipper, col_clothes)
    link_to_col(zip_pull, col_clothes)
    mesh_objects.append(zip_pull)

    # Cordones del polerón
    string_L = create_curved_tube("Mochi_String_L", [
        Vector((0.10, -0.50, 1.12)),
        Vector((0.11, -0.52, 1.00)),
        Vector((0.09, -0.50, 0.88))
    ], radius=0.010, mat=mat_white)
    string_R = create_curved_tube("Mochi_String_R", [
        Vector((-0.10, -0.50, 1.12)),
        Vector((-0.11, -0.52, 1.00)),
        Vector((-0.09, -0.50, 0.88))
    ], radius=0.010, mat=mat_white)
    link_to_col(string_L, col_clothes)
    link_to_col(string_R, col_clothes)

    # Insignia Circular con Montaña en el Pecho Izquierdo
    badge = create_smooth_sphere("Mochi_Badge_Base", radius=0.095, location=(0.24, -0.44, 0.96),
                                scale=(1.0, 0.22, 1.0), rotation=(0.25, 0.40, -0.2), mat=mat_teal_badge)
    badge_mtn = create_smooth_sphere("Mochi_Badge_Logo", radius=0.055, location=(0.25, -0.46, 0.96),
                                    scale=(1.0, 0.18, 0.8), rotation=(0.25, 0.40, -0.2), mat=mat_badge_mtn)
    link_to_col(badge, col_clothes)
    link_to_col(badge_mtn, col_clothes)
    mesh_objects.extend([badge, badge_mtn])

    # Mochila Amarilla en la espalda
    pack_body = create_smooth_sphere("Mochi_Backpack", radius=0.34, location=(0, 0.40, 0.88),
                                     scale=(1.1, 0.75, 1.2), mat=mat_yellow_pack)
    strap_L = create_curved_tube("Mochi_Strap_L", [
        Vector((0.32, -0.25, 0.68)),
        Vector((0.38, -0.16, 1.05)),
        Vector((0.34, 0.12, 1.15)),
        Vector((0.22, 0.36, 0.92))
    ], radius=0.038, mat=mat_yellow_pack)
    strap_R = create_curved_tube("Mochi_Strap_R", [
        Vector((-0.32, -0.25, 0.68)),
        Vector((-0.38, -0.16, 1.05)),
        Vector((-0.34, 0.12, 1.15)),
        Vector((-0.22, 0.36, 0.92))
    ], radius=0.038, mat=mat_yellow_pack)
    link_to_col(pack_body, col_clothes)
    link_to_col(strap_L, col_clothes)
    link_to_col(strap_R, col_clothes)
    mesh_objects.append(pack_body)

    # ==========================================
    # EXTREMIDADES (BRAZOS, SALUDO Y PIERNAS)
    # ==========================================
    # Manga izquierda del polerón
    sleeve_L = create_smooth_sphere("Mochi_Sleeve_L", radius=0.20, location=(0.52, -0.05, 0.98),
                                   scale=(1.2, 0.9, 0.9), rotation=(0, 0.55, 0.25), mat=mat_blue_hoodie)
    # Brazo Izquierdo levantado saludando hacia el espectador
    arm_wave_L = create_smooth_sphere("Mochi_Arm_Wave_L", radius=0.20, location=(0.72, -0.16, 1.16),
                                     scale=(0.95, 0.95, 1.25), rotation=(-0.15, 0.40, -0.65), mat=mat_black)
    # Almohadillas rosas en la palma izquierda (Paws)
    pad_palm = create_smooth_sphere("Mochi_Pad_Palm", radius=0.068, location=(0.76, -0.25, 1.22),
                                   scale=(1.1, 0.28, 1.0), rotation=(0.1, 0.35, -0.55), mat=mat_pink_pads)
    pad_t1 = create_smooth_sphere("Mochi_Pad_Toe1", radius=0.028, location=(0.70, -0.26, 1.32),
                                 scale=(1, 0.35, 1), rotation=(0.1, 0.35, -0.55), mat=mat_pink_pads)
    pad_t2 = create_smooth_sphere("Mochi_Pad_Toe2", radius=0.030, location=(0.78, -0.27, 1.34),
                                 scale=(1, 0.35, 1), rotation=(0.1, 0.35, -0.55), mat=mat_pink_pads)
    pad_t3 = create_smooth_sphere("Mochi_Pad_Toe3", radius=0.028, location=(0.85, -0.27, 1.30),
                                 scale=(1, 0.35, 1), rotation=(0.1, 0.35, -0.55), mat=mat_pink_pads)
    pad_t4 = create_smooth_sphere("Mochi_Pad_Toe4", radius=0.024, location=(0.88, -0.26, 1.22),
                                 scale=(1, 0.35, 1), rotation=(0.1, 0.35, -0.55), mat=mat_pink_pads)
    link_to_col(sleeve_L, col_clothes)
    link_to_col(arm_wave_L, col_body)
    link_to_col(pad_palm, col_body)
    link_to_col(pad_t1, col_body)
    link_to_col(pad_t2, col_body)
    link_to_col(pad_t3, col_body)
    link_to_col(pad_t4, col_body)
    mesh_objects.extend([sleeve_L, arm_wave_L, pad_palm, pad_t1, pad_t2, pad_t3, pad_t4])

    # Brazo Derecho relajado hacia abajo
    sleeve_R = create_smooth_sphere("Mochi_Sleeve_R", radius=0.20, location=(-0.52, -0.05, 0.95),
                                   scale=(1.1, 0.9, 0.9), rotation=(0, -0.35, -0.2), mat=mat_blue_hoodie)
    arm_down_R = create_smooth_sphere("Mochi_Arm_Down_R", radius=0.18, location=(-0.62, -0.08, 0.68),
                                     scale=(0.95, 0.95, 1.35), rotation=(0.18, -0.22, 0.18), mat=mat_black)
    link_to_col(sleeve_R, col_clothes)
    link_to_col(arm_down_R, col_body)
    mesh_objects.extend([sleeve_R, arm_down_R])

    # Piernas y Pies regordetes
    leg_L = create_smooth_sphere("Mochi_Leg_L", radius=0.22, location=(0.26, -0.05, 0.34),
                                scale=(1.05, 1.1, 1.3), mat=mat_black)
    foot_L = create_smooth_sphere("Mochi_Foot_L", radius=0.21, location=(0.27, -0.15, 0.14),
                                 scale=(1.05, 1.45, 0.72), mat=mat_black)
    leg_R = create_smooth_sphere("Mochi_Leg_R", radius=0.22, location=(-0.26, -0.05, 0.34),
                                scale=(1.05, 1.1, 1.3), mat=mat_black)
    foot_R = create_smooth_sphere("Mochi_Foot_R", radius=0.21, location=(-0.27, -0.15, 0.14),
                                 scale=(1.05, 1.45, 0.72), mat=mat_black)
    tail = create_smooth_sphere("Mochi_Tail", radius=0.11, location=(0, 0.46, 0.44),
                               scale=(1, 0.9, 1), mat=mat_black)
    link_to_col(leg_L, col_body)
    link_to_col(foot_L, col_body)
    link_to_col(leg_R, col_body)
    link_to_col(foot_R, col_body)
    link_to_col(tail, col_body)
    mesh_objects.extend([leg_L, foot_L, leg_R, foot_R, tail])

    # ==========================================
    # CONFIGURACIÓN DEL ARMATURE (ESQUELETO)
    # ==========================================
    print("Configurando Armature (Rig)...")
    arm_data = bpy.data.armatures.new("Mochi_Armature_Data")
    arm_obj = bpy.data.objects.new("Mochi_Armature", arm_data)
    bpy.context.scene.collection.objects.link(arm_obj)
    link_to_col(arm_obj, col_rig)

    bpy.context.view_layer.objects.active = arm_obj
    bpy.ops.object.mode_set(mode='EDIT')
    edit_bones = arm_data.edit_bones

    bone_root = edit_bones.new("root")
    bone_root.head = (0, 0, 0)
    bone_root.tail = (0, 0, 0.35)

    bone_spine = edit_bones.new("spine")
    bone_spine.head = (0, 0, 0.35)
    bone_spine.tail = (0, 0, 1.15)
    bone_spine.parent = bone_root

    bone_head = edit_bones.new("head")
    bone_head.head = (0, 0, 1.15)
    bone_head.tail = (0, 0, 2.0)
    bone_head.parent = bone_spine

    bone_ear_l = edit_bones.new("ear_L")
    bone_ear_l.head = (0.35, 0, 1.7)
    bone_ear_l.tail = (0.50, 0, 1.95)
    bone_ear_l.parent = bone_head

    bone_ear_r = edit_bones.new("ear_R")
    bone_ear_r.head = (-0.35, 0, 1.7)
    bone_ear_r.tail = (-0.50, 0, 1.95)
    bone_ear_r.parent = bone_head

    bone_arm_l = edit_bones.new("upper_arm_L")
    bone_arm_l.head = (0.38, 0, 1.05)
    bone_arm_l.tail = (0.62, -0.05, 1.12)
    bone_arm_l.parent = bone_spine

    bone_forearm_l = edit_bones.new("forearm_L")
    bone_forearm_l.head = (0.62, -0.05, 1.12)
    bone_forearm_l.tail = (0.80, -0.22, 1.30)
    bone_forearm_l.parent = bone_arm_l

    bone_arm_r = edit_bones.new("upper_arm_R")
    bone_arm_r.head = (-0.38, 0, 1.05)
    bone_arm_r.tail = (-0.56, 0, 0.88)
    bone_arm_r.parent = bone_spine

    bone_forearm_r = edit_bones.new("forearm_R")
    bone_forearm_r.head = (-0.56, 0, 0.88)
    bone_forearm_r.tail = (-0.66, -0.08, 0.60)
    bone_forearm_r.parent = bone_arm_r

    bone_leg_l = edit_bones.new("thigh_L")
    bone_leg_l.head = (0.26, 0, 0.50)
    bone_leg_l.tail = (0.27, -0.14, 0.12)
    bone_leg_l.parent = bone_root

    bone_leg_r = edit_bones.new("thigh_R")
    bone_leg_r.head = (-0.26, 0, 0.50)
    bone_leg_r.tail = (-0.27, -0.14, 0.12)
    bone_leg_r.parent = bone_root

    bpy.ops.object.mode_set(mode='OBJECT')

    for obj in mesh_objects:
        mod = obj.modifiers.new("Armature", 'ARMATURE')
        mod.object = arm_obj

    print("Armature configurado con huesos articulados.")

    # ==========================================
    # ILUMINACIÓN DE ESTUDIO CLAYMORPHISM
    # ==========================================
    print("Configurando iluminación de estudio...")
    light_key_data = bpy.data.lights.new(name="Key_Light", type='AREA')
    light_key_data.energy = 240
    light_key_data.size = 2.4
    light_key_data.color = (1.0, 0.96, 0.92)
    light_key = bpy.data.objects.new("Key_Light", light_key_data)
    light_key.location = (1.6, -2.6, 2.2)
    light_key.rotation_euler = (math.radians(52), math.radians(12), math.radians(30))
    link_to_col(light_key, col_studio)

    light_fill_data = bpy.data.lights.new(name="Fill_Light", type='AREA')
    light_fill_data.energy = 130
    light_fill_data.size = 2.6
    light_fill_data.color = (0.88, 0.94, 1.0)
    light_fill = bpy.data.objects.new("Fill_Light", light_fill_data)
    light_fill.location = (-2.0, -2.0, 1.6)
    light_fill.rotation_euler = (math.radians(50), math.radians(-15), math.radians(-40))
    link_to_col(light_fill, col_studio)

    light_rim_data = bpy.data.lights.new(name="Rim_Light", type='AREA')
    light_rim_data.energy = 300
    light_rim_data.size = 1.8
    light_rim_data.color = (1.0, 1.0, 1.0)
    light_rim = bpy.data.objects.new("Rim_Light", light_rim_data)
    light_rim.location = (0, 2.4, 2.4)
    light_rim.rotation_euler = (math.radians(-45), 0, 0)
    link_to_col(light_rim, col_studio)

    # ==========================================
    # CÁMARA (ENCUADRE COMPLETO CON ESPACIO)
    # ==========================================
    cam_data = bpy.data.cameras.new(name="Mochi_Camera")
    cam_data.lens = 70
    cam_obj = bpy.data.objects.new("Mochi_Camera", cam_data)
    # Ubicar la cámara centrada para ver todo el cuerpo, orejas y mano saludando
    cam_obj.location = (0.06, -5.25, 1.05)
    cam_obj.rotation_euler = (math.radians(88.5), 0, 0)
    link_to_col(cam_obj, col_studio)
    bpy.context.scene.camera = cam_obj

    # Configuración de Renderizado
    scene = bpy.context.scene
    scene.render.resolution_x = 512
    scene.render.resolution_y = 512
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGBA'

    return {
        "armature": arm_obj,
        "mesh_objects": mesh_objects
    }

def export_and_render(output_dir):
    os.makedirs(output_dir, exist_ok=True)
    
    blend_path = os.path.join(output_dir, "mochi_avatar_3d.blend")
    glb_path = os.path.join(output_dir, "mochi_avatar.glb")
    png_path = os.path.join(output_dir, "mochi_render_winking.png")
    webp_path = os.path.join(output_dir, "mochi_render_winking.webp")

    # Guardar .blend maestro
    print(f"Guardando proyecto maestro: {blend_path}")
    bpy.ops.wm.save_as_mainfile(filepath=blend_path)

    # Exportar GLB (glTF 2.0)
    print(f"Exportando modelo 3D GLB: {glb_path}")
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
        print(f"Aviso al exportar GLB: {e}")

    # Renderizar imagen PNG (512x512 transparente)
    print(f"Renderizando imagen PNG: {png_path}")
    bpy.context.scene.render.filepath = png_path
    bpy.ops.render.render(write_still=True)

    # Renderizar también directamente en WebP
    try:
        bpy.context.scene.render.image_settings.file_format = 'WEBP'
        bpy.context.scene.render.image_settings.quality = 95
        bpy.context.scene.render.filepath = webp_path
        bpy.ops.render.render(write_still=True)
        print(f"Renderizado WebP completado: {webp_path}")
    except Exception as e:
        print(f"Aviso WebP: {e}")

    print("¡Proceso completado exitosamente!")

if __name__ == "__main__":
    out_dir = r"E:\Reto Panda\assets\mascotas\mochi"
    build_mochi_character()
    export_and_render(out_dir)
