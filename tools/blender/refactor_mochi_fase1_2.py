"""
Script de Refactorización 3D de Mochi - Fases 1 y 2 (Iteración de Perfeccionamiento)
Ajustes críticos:
1. Conversión matemática sRGB -> Linear para coincidencia milimétrica de color con la ficha (#362E2D, #F2EFE9, etc.).
2. Boca sonriente esculpida en el frontal del hocico con labios negros y lengua coral visible.
3. Cejas alegres curvadas hacia arriba (expresión curiosa y amigable).
4. Ojos 3D con contraste profundo: esclerótica blanca, iris chocolate cálido y pupila negra pura con brillos vivos.
5. Manchas oculares en relieve con inclinación de 15° y forma ovalada-triangular redondeada.
"""

import bpy
import bmesh
import math
import os
from mathutils import Vector, Euler

def hex_to_linear(hex_str, alpha=1.0):
    """Convierte colores HEX sRGB a Linear Float para la API de Blender."""
    hex_str = hex_str.lstrip('#')
    r = int(hex_str[0:2], 16) / 255.0
    g = int(hex_str[2:4], 16) / 255.0
    b = int(hex_str[4:6], 16) / 255.0
    return (r ** 2.2, g ** 2.2, b ** 2.2, alpha)

def setup_backup_and_collections():
    scene = bpy.context.scene
    backup_col = bpy.data.collections.get("Backup_Mochi_V1")
    if not backup_col:
        backup_col = bpy.data.collections.new("Backup_Mochi_V1")
        scene.collection.children.link(backup_col)
    backup_col.hide_viewport = True
    backup_col.hide_render = True

    for name in ["Mochi_Character", "Head_and_Face", "Body_and_Limbs", "Clothes_and_Gear", "Armature_Rig"]:
        col = bpy.data.collections.get(name)
        if col:
            col.hide_viewport = True
            col.hide_render = True
            if col.name in scene.collection.children:
                scene.collection.children.unlink(col)
            if col.name not in backup_col.children:
                backup_col.children.link(col)

    v2_col = bpy.data.collections.get("Mochi_Clay_V2")
    if not v2_col:
        v2_col = bpy.data.collections.new("Mochi_Clay_V2")
        scene.collection.children.link(v2_col)
    v2_col.hide_viewport = False
    v2_col.hide_render = False

    col_anatomy = bpy.data.collections.get("Mochi_V2_Anatomy") or bpy.data.collections.new("Mochi_V2_Anatomy")
    col_face = bpy.data.collections.get("Mochi_V2_Face") or bpy.data.collections.new("Mochi_V2_Face")
    
    for sub in [col_anatomy, col_face]:
        for obj in list(sub.objects):
            bpy.data.objects.remove(obj, do_unlink=True)
        if sub.name not in v2_col.children:
            v2_col.children.link(sub)
        sub.hide_viewport = False
        sub.hide_render = False

    return v2_col, col_anatomy, col_face

def get_or_create_clay_material(name, hex_color, roughness=0.82, sss_weight=0.06, bump_str=0.025):
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
    bsdf.inputs['Specular IOR Level'].default_value = 0.22
    
    if 'Subsurface Weight' in bsdf.inputs:
        bsdf.inputs['Subsurface Weight'].default_value = sss_weight
    if 'Subsurface Radius' in bsdf.inputs:
        bsdf.inputs['Subsurface Radius'].default_value = (1.0, 0.7, 0.5)
        
    tex_noise = nodes.new('ShaderNodeTexNoise')
    tex_noise.inputs['Scale'].default_value = 60.0
    tex_noise.inputs['Detail'].default_value = 4.0
    tex_noise.inputs['Roughness'].default_value = 0.7
    
    bump = nodes.new('ShaderNodeBump')
    bump.inputs['Strength'].default_value = bump_str
    bump.inputs['Distance'].default_value = 0.008
    
    links.new(tex_noise.outputs['Fac'], bump.inputs['Height'])
    links.new(bump.outputs['Normal'], bsdf.inputs['Normal'])
    links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])
    return mat

def get_or_create_eye_lens_material(name, hex_color, roughness=0.03):
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
    bsdf.inputs['Specular IOR Level'].default_value = 0.90
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
# ANATOMÍA Y CUERPO (FASE 1)
# ==========================================================
def build_organic_head(collection, mat_white):
    head_z = 1.46
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=36, v_segments=28, radius=0.55)
    
    for v in bm.verts:
        x, y, z = v.co.x, v.co.y, v.co.z
        if z < 0.15:
            factor = (0.15 - z) / 0.65
            v.co.x *= (1.0 + factor * 0.38)
            v.co.y *= (1.0 + factor * 0.15)
        if y > 0.1 and z < 0.1:
            v.co.y *= 0.88
        if y < -0.1 and z < 0.1 and abs(x) < 0.35:
            v.co.y -= 0.05 * (1.0 - abs(x)/0.35)
            
        v.co.x *= 1.05
        v.co.y *= 0.98
        v.co.z *= 0.95
        v.co.z += head_z
        
    return create_mesh_object("Mochi_Head_V2", collection, bm, mat_white, subsurf_level=2)

def build_ear(collection, side, mat_dark):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=28, v_segments=20, radius=0.19)
    
    for v in bm.verts:
        v.co.y *= 0.48
        if v.co.y < 0:
            dist = math.sqrt(v.co.x**2 + v.co.z**2)
            if dist < 0.15:
                v.co.y += (0.15 - dist) * 0.45
        v.co.x *= 1.10
        v.co.z *= 1.05

    sign = 1.0 if side == 'L' else -1.0
    head_z = 1.46
    rot = Euler((math.radians(14), math.radians(sign * 26), math.radians(sign * -15)), 'XYZ')
    mat_rot = rot.to_matrix().to_4x4()
    
    for v in bm.verts:
        v.co = mat_rot @ v.co
        v.co.x += sign * 0.40
        v.co.y -= 0.04
        v.co.z += head_z + 0.45
        
    return create_mesh_object(f"Mochi_Ear_{side}_V2", collection, bm, mat_dark, subsurf_level=2)

def build_torso_and_belly(collection, mat_white):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=36, v_segments=28, radius=0.50)
    for v in bm.verts:
        if v.co.z < 0.1:
            factor = (0.1 - v.co.z) / 0.6
            v.co.x *= (1.0 + factor * 0.20)
            v.co.y *= (1.0 + factor * 0.22)
        if v.co.y < 0 and v.co.z < 0.1:
            v.co.y -= 0.06 * (1.0 - abs(v.co.x)/0.5)
        v.co.x *= 1.02
        v.co.y *= 0.95
        v.co.z *= 1.08
        v.co.z += 0.82
    return create_mesh_object("Mochi_Torso_V2", collection, bm, mat_white, subsurf_level=2)

def build_leg_and_foot(collection, side, mat_dark):
    bm = bmesh.new()
    sign = 1.0 if side == 'L' else -1.0
    
    bmesh.ops.create_uvsphere(bm, u_segments=32, v_segments=24, radius=0.20)
    
    for v in bm.verts:
        v.co.z *= 1.35
        if v.co.z < -0.15:
            t = (-0.15 - v.co.z) / 0.12
            v.co.y -= t * 0.16
            v.co.x *= (1.0 + t * 0.15)
        if v.co.z <= -0.23:
            v.co.z = -0.24
            
        # 3 dedos esculpidos en punta frontal
        if v.co.y < -0.16 and v.co.z < -0.10:
            if abs(v.co.x - 0.05) < 0.02 or abs(v.co.x + 0.05) < 0.02:
                v.co.y += 0.025
            else:
                v.co.y -= 0.015

    center_x = sign * 0.25
    center_y = -0.04
    center_z = 0.24
    
    for v in bm.verts:
        v.co.x += center_x
        v.co.y += center_y
        v.co.z += center_z
        
    return create_mesh_object(f"Mochi_Leg_{side}_V2", collection, bm, mat_dark, subsurf_level=2)

def build_arm_and_hand(collection, side, mat_dark, mat_pink_pads):
    sign = 1.0 if side == 'L' else -1.0
    
    bm_arm = bmesh.new()
    bmesh.ops.create_uvsphere(bm_arm, u_segments=24, v_segments=18, radius=0.15)
    for v in bm_arm.verts:
        v.co.z *= 1.55
        v.co.x *= 0.95
        v.co.y *= 0.95
        
    rot_arm = Euler((math.radians(12), math.radians(sign * -26), math.radians(sign * 10)), 'XYZ')
    mat_rot_arm = rot_arm.to_matrix().to_4x4()
    
    for v in bm_arm.verts:
        v.co = mat_rot_arm @ v.co
        v.co.x += sign * 0.60
        v.co.y -= 0.06
        v.co.z += 0.82
        
    create_mesh_object(f"Mochi_Arm_{side}_V2", collection, bm_arm, mat_dark, subsurf_level=2)
    
    bm_hand = bmesh.new()
    bmesh.ops.create_uvsphere(bm_hand, u_segments=24, v_segments=18, radius=0.15)
    for v in bm_hand.verts:
        v.co.x *= 1.05
        v.co.y *= 0.80
        v.co.z *= 1.25
        if v.co.z < -0.05:
            v.co.x -= sign * 0.03
            
    pos_hand = Vector((sign * 0.72, -0.08, 0.60))
    rot_hand = Euler((math.radians(15), math.radians(sign * -20), math.radians(sign * 25)), 'XYZ')
    mat_rot_hand = rot_hand.to_matrix().to_4x4()
    
    for v in bm_hand.verts:
        v.co = mat_rot_hand @ v.co + pos_hand
        
    create_mesh_object(f"Mochi_Hand_{side}_V2", collection, bm_hand, mat_dark, subsurf_level=2)
    
    bm_pad = bmesh.new()
    bmesh.ops.create_uvsphere(bm_pad, u_segments=16, v_segments=12, radius=0.055)
    for v in bm_pad.verts:
        v.co.x *= 1.15
        v.co.y *= 0.30
        v.co.z *= 0.95
        v.co = mat_rot_hand @ v.co + pos_hand + Vector((sign * -0.02, 0.08, -0.01))
    create_mesh_object(f"Mochi_Pad_Main_{side}_V2", collection, bm_pad, mat_pink_pads, subsurf_level=1)
    
    for idx, offset_x in enumerate([-0.035, 0.0, 0.035]):
        bm_toe = bmesh.new()
        bmesh.ops.create_uvsphere(bm_toe, u_segments=12, v_segments=10, radius=0.022)
        for v in bm_toe.verts:
            v.co.y *= 0.35
            v.co = mat_rot_hand @ v.co + pos_hand + Vector((sign * (-0.02 + offset_x), 0.085, -0.075))
        create_mesh_object(f"Mochi_Pad_Toe_{side}_{idx}_V2", collection, bm_toe, mat_pink_pads, subsurf_level=1)

def build_tail(collection, mat_dark):
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=18, v_segments=14, radius=0.11)
    for v in bm.verts:
        v.co.x *= 1.05
        v.co.y *= 0.90
        v.co.z *= 0.95
        v.co.y += 0.44
        v.co.z += 0.48
    return create_mesh_object("Mochi_Tail_V2", collection, bm, mat_dark, subsurf_level=2)

# ==========================================================
# ROSTRO 3D REAL (FASE 2)
# ==========================================================
def build_eye_patch(collection, side, mat_dark):
    sign = 1.0 if side == 'L' else -1.0
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=28, v_segments=20, radius=0.21)
    
    for v in bm.verts:
        v.co.y *= 0.22
        # Base más ancha abajo, punta redondeada arriba
        if v.co.z < 0:
            v.co.x *= (1.0 - v.co.z * 0.45)
        if v.co.z > 0:
            v.co.x *= (1.0 - v.co.z * 0.18)
            
    head_z = 1.46
    # Inclinación canónica de 15° hacia adentro
    rot = Euler((math.radians(16), math.radians(sign * 18), math.radians(sign * -15)), 'XYZ')
    mat_rot = rot.to_matrix().to_4x4()
    
    for v in bm.verts:
        v.co = mat_rot @ v.co
        v.co.x += sign * 0.225
        v.co.y -= 0.445
        v.co.z += head_z + 0.04
        
    return create_mesh_object(f"Mochi_EyePatch_{side}_V2", collection, bm, mat_dark, subsurf_level=2)

def build_3d_eye(collection, side, mat_sclera, mat_iris, mat_pupil, mat_shine):
    sign = 1.0 if side == 'L' else -1.0
    head_z = 1.46
    center_pos = Vector((sign * 0.215, -0.505, head_z + 0.04))
    
    # 1. Esclerótica blanca (fondo del ojo)
    bm_sclera = bmesh.new()
    bmesh.ops.create_uvsphere(bm_sclera, u_segments=24, v_segments=18, radius=0.095)
    for v in bm_sclera.verts:
        v.co.y *= 0.38
        v.co += center_pos
    create_mesh_object(f"Mochi_Eye_Sclera_{side}_V2", collection, bm_sclera, mat_sclera, subsurf_level=1)
    
    # 2. Iris Marrón Chocolate Cálido (#3B261E)
    bm_iris = bmesh.new()
    bmesh.ops.create_uvsphere(bm_iris, u_segments=24, v_segments=18, radius=0.082)
    for v in bm_iris.verts:
        v.co.y *= 0.32
        v.co += center_pos + Vector((sign * -0.005, -0.016, 0.0))
    create_mesh_object(f"Mochi_Eye_Iris_{side}_V2", collection, bm_iris, mat_iris, subsurf_level=1)
    
    # 3. Pupila Negra Pura (#0D0D0D)
    bm_pupil = bmesh.new()
    bmesh.ops.create_uvsphere(bm_pupil, u_segments=20, v_segments=16, radius=0.052)
    for v in bm_pupil.verts:
        v.co.y *= 0.32
        v.co += center_pos + Vector((sign * -0.005, -0.026, 0.0))
    create_mesh_object(f"Mochi_Eye_Pupil_{side}_V2", collection, bm_pupil, mat_pupil, subsurf_level=1)
    
    # 4. Brillo Principal (Arriba-izquierda)
    bm_sh1 = bmesh.new()
    bmesh.ops.create_uvsphere(bm_sh1, u_segments=14, v_segments=10, radius=0.028)
    for v in bm_sh1.verts:
        v.co.y *= 0.28
        v.co += center_pos + Vector((-0.024, -0.035, 0.032))
    create_mesh_object(f"Mochi_Catchlight_1_{side}_V2", collection, bm_sh1, mat_shine, subsurf_level=1)
    
    # 5. Brillo Secundario (Abajo-derecha)
    bm_sh2 = bmesh.new()
    bmesh.ops.create_uvsphere(bm_sh2, u_segments=12, v_segments=8, radius=0.015)
    for v in bm_sh2.verts:
        v.co.y *= 0.28
        v.co += center_pos + Vector((0.020, -0.035, -0.022))
    create_mesh_object(f"Mochi_Catchlight_2_{side}_V2", collection, bm_sh2, mat_shine, subsurf_level=1)

def build_eyebrows(collection, side, mat_dark):
    """Cejas en arco alegre amigable curvadas hacia arriba ('⌒')."""
    sign = 1.0 if side == 'L' else -1.0
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=18, v_segments=12, radius=0.044)
    for v in bm.verts:
        v.co.x *= 2.0
        v.co.y *= 0.38
        v.co.z *= 0.65
        # Arco alegre: el centro es más alto que los extremos
        dist_x = abs(v.co.x)
        v.co.z -= (dist_x ** 2) * 1.5
            
    head_z = 1.46
    # Inclinación positiva amigable hacia las sienes
    rot = Euler((math.radians(20), math.radians(sign * -8), math.radians(sign * 14)), 'XYZ')
    mat_rot = rot.to_matrix().to_4x4()
    
    for v in bm.verts:
        v.co = mat_rot @ v.co
        v.co.x += sign * 0.225
        v.co.y -= 0.465
        v.co.z += head_z + 0.28
        
    return create_mesh_object(f"Mochi_Eyebrow_{side}_V2", collection, bm, mat_dark, subsurf_level=2)

def build_snout_and_mouth(collection, mat_white, mat_dark, mat_mouth_cavity, mat_tongue):
    """
    Hocico, nariz triangular 3D y boca sonriente abierta con lengua coral.
    Todo ubicado en el frontal visible del rostro.
    """
    head_z = 1.46
    
    # 1. Hocico suave
    bm_snout = bmesh.new()
    bmesh.ops.create_uvsphere(bm_snout, u_segments=28, v_segments=20, radius=0.18)
    for v in bm_snout.verts:
        v.co.x *= 1.25
        v.co.y *= 0.58
        v.co.z *= 0.65
        v.co.y -= 0.46
        v.co.z += head_z - 0.08
    create_mesh_object("Mochi_Snout_V2", collection, bm_snout, mat_white, subsurf_level=2)
    
    # 2. Nariz triangular negra con relieve 3D (#362E2D)
    bm_nose = bmesh.new()
    bmesh.ops.create_uvsphere(bm_nose, u_segments=20, v_segments=14, radius=0.072)
    for v in bm_nose.verts:
        if v.co.z < 0:
            v.co.x *= (1.0 + v.co.z * 1.2)
        v.co.x *= 1.30
        v.co.y *= 0.50
        v.co.z *= 0.75
        v.co.y -= 0.585
        v.co.z += head_z - 0.045
    create_mesh_object("Mochi_Nose_V2", collection, bm_nose, mat_dark, subsurf_level=2)
    
    # 3. Cavidad bucal abierta y sonriente en el frente exterior del hocico (y = -0.565)
    bm_mouth = bmesh.new()
    bmesh.ops.create_uvsphere(bm_mouth, u_segments=24, v_segments=16, radius=0.082)
    for v in bm_mouth.verts:
        v.co.x *= 1.45
        v.co.y *= 0.32
        v.co.z *= 0.65
        # Curvatura sonriente en media luna
        if abs(v.co.x) > 0.02:
            v.co.z += (abs(v.co.x) - 0.02) * 0.35
        v.co.y -= 0.565
        v.co.z += head_z - 0.165
    create_mesh_object("Mochi_Mouth_Cavity_V2", collection, bm_mouth, mat_mouth_cavity, subsurf_level=2)
    
    # 4. Lengua coral (#E06D65) descansando en la parte baja de la boca
    bm_tongue = bmesh.new()
    bmesh.ops.create_uvsphere(bm_tongue, u_segments=18, v_segments=12, radius=0.055)
    for v in bm_tongue.verts:
        v.co.x *= 1.15
        v.co.y *= 0.35
        v.co.z *= 0.50
        v.co.y -= 0.575
        v.co.z += head_z - 0.19
    create_mesh_object("Mochi_Tongue_V2", collection, bm_tongue, mat_tongue, subsurf_level=2)
    
    # 5. Labio superior sonriente que divide la sonrisa
    lip_pts = [
        Vector((-0.11, -0.565, head_z - 0.13)),
        Vector((-0.05, -0.580, head_z - 0.145)),
        Vector((0.0, -0.585, head_z - 0.14)),
        Vector((0.05, -0.580, head_z - 0.145)),
        Vector((0.11, -0.565, head_z - 0.13))
    ]
    create_curved_tube("Mochi_Lip_Upper_V2", collection, lip_pts, radius=0.012, mat=mat_dark)

def build_blush_cheeks(collection, mat_blush):
    head_z = 1.46
    for side in ['L', 'R']:
        sign = 1.0 if side == 'L' else -1.0
        bm = bmesh.new()
        bmesh.ops.create_uvsphere(bm, u_segments=20, v_segments=14, radius=0.11)
        for v in bm.verts:
            v.co.x *= 1.25
            v.co.y *= 0.18
            v.co.z *= 0.65
            
        rot = Euler((math.radians(12), math.radians(sign * 25), math.radians(sign * -15)), 'XYZ')
        mat_rot = rot.to_matrix().to_4x4()
        for v in bm.verts:
            v.co = mat_rot @ v.co
            v.co.x += sign * 0.36
            v.co.y -= 0.41
            v.co.z += head_z - 0.09
            
        create_mesh_object(f"Mochi_Blush_{side}_V2", collection, bm, mat_blush, subsurf_level=2)

# ==========================================================
# CÁMARAS Y RENDER DE VERIFICACIÓN
# ==========================================================
def setup_verification_cameras():
    col_studio = bpy.data.collections.get("Studio_Setup") or bpy.data.collections.new("Studio_Setup")
    if col_studio.name not in bpy.context.scene.collection.children:
        bpy.context.scene.collection.children.link(col_studio)
        
    cams = {}
    dist = 5.2
    z_target = 0.95
    
    cam_f = bpy.data.objects.get("Cam_Front_V2")
    if not cam_f:
        c_data = bpy.data.cameras.new("Cam_Front_V2")
        c_data.lens = 72
        cam_f = bpy.data.objects.new("Cam_Front_V2", c_data)
        col_studio.objects.link(cam_f)
    cam_f.location = (0, -dist, z_target)
    cam_f.rotation_euler = (math.radians(88.5), 0, 0)
    cams['front'] = cam_f
    
    cam_p = bpy.data.objects.get("Cam_Profile_V2")
    if not cam_p:
        c_data = bpy.data.cameras.new("Cam_Profile_V2")
        c_data.lens = 72
        cam_p = bpy.data.objects.new("Cam_Profile_V2", c_data)
        col_studio.objects.link(cam_p)
    cam_p.location = (dist, 0, z_target)
    cam_p.rotation_euler = (math.radians(88.5), 0, math.radians(90))
    cams['profile'] = cam_p

    cam_b = bpy.data.objects.get("Cam_Back_V2")
    if not cam_b:
        c_data = bpy.data.cameras.new("Cam_Back_V2")
        c_data.lens = 72
        cam_b = bpy.data.objects.new("Cam_Back_V2", c_data)
        col_studio.objects.link(cam_b)
    cam_b.location = (0, dist, z_target)
    cam_b.rotation_euler = (math.radians(88.5), 0, math.radians(180))
    cams['back'] = cam_b
    
    return cams

def setup_studio_lighting():
    col_studio = bpy.data.collections.get("Studio_Setup")
    floor = bpy.data.objects.get("Studio_Floor_Catcher")
    if not floor:
        bpy.ops.mesh.primitive_plane_add(size=14, location=(0, 0, 0))
        floor = bpy.context.active_object
        floor.name = "Studio_Floor_Catcher"
        floor.is_shadow_catcher = True
        col_studio.objects.link(floor)
        if floor.name in bpy.context.scene.collection.objects:
            bpy.context.scene.collection.objects.unlink(floor)

    key = bpy.data.objects.get("Key_Light")
    if key:
        key.data.energy = 340
        key.data.size = 3.5
        key.location = (2.2, -3.5, 2.8)
        
    fill = bpy.data.objects.get("Fill_Light")
    if fill:
        fill.data.energy = 180
        fill.data.size = 3.8
        fill.location = (-3.0, -2.8, 2.2)
        
    rim = bpy.data.objects.get("Rim_Light")
    if rim:
        rim.data.energy = 340
        rim.data.size = 2.5
        rim.location = (0, 3.5, 3.0)

def render_verification_views(output_dir, cams):
    os.makedirs(output_dir, exist_ok=True)
    scene = bpy.context.scene
    scene.render.resolution_x = 768
    scene.render.resolution_y = 768
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGBA'
    
    for view_name, cam_obj in cams.items():
        scene.camera = cam_obj
        filepath = os.path.join(output_dir, f"verificacion_fase1_2_{view_name}.png")
        scene.render.filepath = filepath
        print(f"Renderizando vista {view_name.upper()} a: {filepath}")
        bpy.ops.render.render(write_still=True)

def main():
    print("=== INICIANDO ITERACIÓN CALIBRADA DE PRECISIÓN: FASE 1 Y FASE 2 ===")
    v2_col, col_anatomy, col_face = setup_backup_and_collections()
    
    # Materiales Exactos con Conversión HEX sRGB -> Linear
    mat_white = get_or_create_clay_material("MAT_Pelaje_Blanco", "#F2EFE9", roughness=0.85, sss_weight=0.05)
    mat_dark = get_or_create_clay_material("MAT_Pelaje_Oscuro", "#362E2D", roughness=0.82, sss_weight=0.03)
    mat_pink_pads = get_or_create_clay_material("MAT_Almohadillas_Rosa", "#E8A598", roughness=0.75, sss_weight=0.15)
    mat_blush = get_or_create_clay_material("MAT_Mejillas_Rubor", "#F2A69A", roughness=0.80, sss_weight=0.25)
    mat_mouth_inside = get_or_create_clay_material("MAT_Boca_Fondo", "#2A1210", roughness=0.60)
    mat_tongue = get_or_create_clay_material("MAT_Boca_Lengua", "#E06D65", roughness=0.65, sss_weight=0.20)
    
    mat_sclera = get_or_create_clay_material("MAT_Ojo_Esclerotica", "#FFFFFF", roughness=0.20)
    mat_iris = get_or_create_eye_lens_material("MAT_Ojo_Iris", "#4A2E22", roughness=0.04)
    mat_pupil = get_or_create_eye_lens_material("MAT_Ojo_Pupila", "#0D0D0D", roughness=0.03)
    mat_shine = get_or_create_eye_lens_material("MAT_Ojo_Brillo", "#FFFFFF", roughness=0.0)

    # Fase 1: Cuerpo
    build_organic_head(col_anatomy, mat_white)
    build_ear(col_anatomy, 'L', mat_dark)
    build_ear(col_anatomy, 'R', mat_dark)
    build_torso_and_belly(col_anatomy, mat_white)
    build_leg_and_foot(col_anatomy, 'L', mat_dark)
    build_leg_and_foot(col_anatomy, 'R', mat_dark)
    build_arm_and_hand(col_anatomy, 'L', mat_dark, mat_pink_pads)
    build_arm_and_hand(col_anatomy, 'R', mat_dark, mat_pink_pads)
    build_tail(col_anatomy, mat_dark)
    
    # Fase 2: Rostro
    build_eye_patch(col_face, 'L', mat_dark)
    build_eye_patch(col_face, 'R', mat_dark)
    build_3d_eye(col_face, 'L', mat_sclera, mat_iris, mat_pupil, mat_shine)
    build_3d_eye(col_face, 'R', mat_sclera, mat_iris, mat_pupil, mat_shine)
    build_eyebrows(col_face, 'L', mat_dark)
    build_eyebrows(col_face, 'R', mat_dark)
    build_snout_and_mouth(col_face, mat_white, mat_dark, mat_mouth_inside, mat_tongue)
    build_blush_cheeks(col_face, mat_blush)
    
    setup_studio_lighting()
    cams = setup_verification_cameras()
    
    blend_path = r"E:\Reto Panda\assets\mascotas\mochi\mochi_avatar_3d.blend"
    bpy.ops.wm.save_as_mainfile(filepath=blend_path)
    
    out_dir = r"E:\Reto Panda\assets\mascotas\mochi\verificacion_fase1_2"
    render_verification_views(out_dir, cams)
    print("=== PERFECCIONAMIENTO FASE 1 Y 2 COMPLETADO ===")

if __name__ == "__main__":
    main()
