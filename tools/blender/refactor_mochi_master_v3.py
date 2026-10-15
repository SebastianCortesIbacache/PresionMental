"""
Refactorización Maestra 3D de Mochi V3 - Perfección Visual Absoluta
Fidelidad Milimétrica al Concept Art Turnaround (imagen_20261014203843.jpg)
Blender 5.2.2 LTS (bpy)
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

def get_or_create_clay_material(name, hex_color, roughness=0.86, sss_weight=0.04, bump_str=0.035, is_metallic=0.0):
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
    bsdf.inputs['Specular IOR Level'].default_value = 0.20 if is_metallic == 0.0 else 0.55
    
    if 'Subsurface Weight' in bsdf.inputs and sss_weight > 0:
        bsdf.inputs['Subsurface Weight'].default_value = sss_weight
    if 'Subsurface Radius' in bsdf.inputs:
        bsdf.inputs['Subsurface Radius'].default_value = (1.0, 0.75, 0.55)
        
    # Microtextura táctil de arcilla/plastilina stop-motion
    tex_macro = nodes.new('ShaderNodeTexNoise')
    tex_macro.inputs['Scale'].default_value = 7.0
    tex_macro.inputs['Detail'].default_value = 2.0
    tex_macro.inputs['Roughness'].default_value = 0.4
    
    tex_micro = nodes.new('ShaderNodeTexNoise')
    tex_micro.inputs['Scale'].default_value = 85.0
    tex_micro.inputs['Detail'].default_value = 4.0
    tex_micro.inputs['Roughness'].default_value = 0.6
    
    math_add = nodes.new('ShaderNodeMath')
    math_add.operation = 'ADD'
    links.new(tex_macro.outputs['Fac'], math_add.inputs[0])
    links.new(tex_micro.outputs['Fac'], math_add.inputs[1])
    
    bump = nodes.new('ShaderNodeBump')
    bump.inputs['Strength'].default_value = bump_str
    bump.inputs['Distance'].default_value = 0.005
    
    links.new(math_add.outputs['Value'], bump.inputs['Height'])
    links.new(bump.outputs['Normal'], bsdf.inputs['Normal'])
    links.new(bsdf.outputs['BSDF'], out.inputs['Surface'])
    return mat

def get_or_create_glossy_material(name, hex_color, roughness=0.03):
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
    bsdf.inputs['Specular IOR Level'].default_value = 0.95
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
    curve_data.bevel_resolution = 6
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

def clear_collection_objects(col):
    for obj in list(col.objects):
        bpy.data.objects.remove(obj, do_unlink=True)

# ==============================================================================
# FASE 1: ANATOMÍA, CABEZA APERADA/CHUBBY, OREJAS Y EXTREMIDADES EN A-POSE
# ==============================================================================
def build_head(collection, mat_white):
    """Cabeza ancha y adorable con mofletes prominentes y achatamiento sutil en la nuca."""
    head_z = 1.38
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=36, v_segments=28, radius=0.56)
    
    for v in bm.verts:
        x, y, z = v.co.x, v.co.y, v.co.z
        if z < 0.12:
            factor = (0.12 - z) / 0.65
            v.co.x *= (1.0 + factor * 0.44)
            v.co.y *= (1.0 + factor * 0.18)
        if y > 0.12 and z < 0.10:
            v.co.y *= 0.88
        if y < -0.10 and -0.20 < z < 0.15 and abs(x) < 0.35:
            v.co.y -= 0.06 * (1.0 - abs(x)/0.35)
            
        v.co.x *= 1.08
        v.co.y *= 0.98
        v.co.z *= 0.92
        v.co.z += head_z
        
    return create_mesh_object("Mochi_Head_V2", collection, bm, mat_white, subsurf_level=2)

def build_ear(collection, side, mat_dark):
    """Orejas en forma de riñón/C con concavidad frontal y bordes gruesos redondeados."""
    sign = 1.0 if side == 'L' else -1.0
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=28, v_segments=20, radius=0.185)
    
    for v in bm.verts:
        v.co.y *= 0.46
        if v.co.y < 0:
            dist = math.sqrt(v.co.x**2 + v.co.z**2)
            if dist < 0.16:
                v.co.y += (0.16 - dist) * 0.48
        v.co.x *= 1.12
        v.co.z *= 1.05

    head_z = 1.38
    rot = Euler((math.radians(12), math.radians(sign * 28), math.radians(sign * -14)), 'XYZ')
    mat_rot = rot.to_matrix().to_4x4()
    
    for v in bm.verts:
        v.co = mat_rot @ v.co
        v.co.x += sign * 0.39
        v.co.y -= 0.02
        v.co.z += head_z + 0.42
        
    return create_mesh_object(f"Mochi_Ear_{side}_V2", collection, bm, mat_dark, subsurf_level=2)

def build_torso(collection, mat_white):
    """Torso redondeado. La parte inferior queda expuesta como franja de barriga blanca."""
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=36, v_segments=28, radius=0.48)
    for v in bm.verts:
        if v.co.z < 0.1:
            factor = (0.1 - v.co.z) / 0.6
            v.co.x *= (1.0 + factor * 0.18)
            v.co.y *= (1.0 + factor * 0.20)
        v.co.x *= 1.02
        v.co.y *= 0.94
        v.co.z *= 1.05
        v.co.z += 0.78
    return create_mesh_object("Mochi_Torso_V2", collection, bm, mat_white, subsurf_level=2)

def build_leg(collection, side, mat_dark):
    """Piernas cilíndricas robustas continuas con pie plano en Z=0 y 3 dedos redondeados."""
    sign = 1.0 if side == 'L' else -1.0
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=32, v_segments=24, radius=0.19)
    
    for v in bm.verts:
        v.co.z *= 1.35
        if v.co.z < -0.12:
            t = (-0.12 - v.co.z) / 0.14
            v.co.y -= t * 0.15
            v.co.x *= (1.0 + t * 0.14)
        if v.co.z <= -0.225:
            v.co.z = -0.235
            
        if v.co.y < -0.15 and v.co.z < -0.10:
            if abs(v.co.x - 0.045) < 0.018 or abs(v.co.x + 0.045) < 0.018:
                v.co.y += 0.022
            else:
                v.co.y -= 0.012

    center_x = sign * 0.24
    center_y = -0.04
    center_z = 0.235
    
    for v in bm.verts:
        v.co.x += center_x
        v.co.y += center_y
        v.co.z += center_z
        
    return create_mesh_object(f"Mochi_Leg_{side}_V2", collection, bm, mat_dark, subsurf_level=2)

def build_arm_and_hand(collection, side, mat_dark, mat_pink_pads):
    """Brazo oscuro saliendo de la manga corta en A-pose simétrica con manopla y almohadillas rosas."""
    sign = 1.0 if side == 'L' else -1.0
    
    bm_arm = bmesh.new()
    bmesh.ops.create_uvsphere(bm_arm, u_segments=24, v_segments=18, radius=0.15)
    for v in bm_arm.verts:
        v.co.z *= 1.50
        v.co.x *= 0.95
        v.co.y *= 0.95
        
    rot_arm = Euler((math.radians(10), math.radians(sign * -24), math.radians(sign * 10)), 'XYZ')
    mat_rot_arm = rot_arm.to_matrix().to_4x4()
    
    for v in bm_arm.verts:
        v.co = mat_rot_arm @ v.co
        v.co.x += sign * 0.58
        v.co.y -= 0.05
        v.co.z += 0.76
        
    create_mesh_object(f"Mochi_Arm_{side}_V2", collection, bm_arm, mat_dark, subsurf_level=2)
    
    # Mano tipo manopla
    bm_hand = bmesh.new()
    bmesh.ops.create_uvsphere(bm_hand, u_segments=24, v_segments=18, radius=0.155)
    for v in bm_hand.verts:
        v.co.x *= 1.05
        v.co.y *= 0.85
        v.co.z *= 1.20
        if v.co.z < -0.02 and v.co.x * sign < -0.04:
            v.co.x -= sign * 0.035
            
    pos_hand = Vector((sign * 0.69, -0.06, 0.55))
    rot_hand = Euler((math.radians(12), math.radians(sign * -18), math.radians(sign * 22)), 'XYZ')
    mat_rot_hand = rot_hand.to_matrix().to_4x4()
    
    for v in bm_hand.verts:
        v.co = mat_rot_hand @ v.co + pos_hand
        
    create_mesh_object(f"Mochi_Hand_{side}_V2", collection, bm_hand, mat_dark, subsurf_level=2)
    
    # Almohadillas en la parte trasera/palma de la mano (visibles claramente en la vista posterior)
    bm_pad = bmesh.new()
    bmesh.ops.create_uvsphere(bm_pad, u_segments=16, v_segments=12, radius=0.062)
    for v in bm_pad.verts:
        v.co.x *= 1.15
        v.co.y *= 0.28
        v.co.z *= 0.95
        v.co = mat_rot_hand @ v.co + pos_hand + Vector((sign * -0.015, 0.092, -0.01))
    create_mesh_object(f"Mochi_Pad_Main_{side}_V2", collection, bm_pad, mat_pink_pads, subsurf_level=1)
    
    for idx, offset_x in enumerate([-0.038, 0.0, 0.038]):
        bm_toe = bmesh.new()
        bmesh.ops.create_uvsphere(bm_toe, u_segments=12, v_segments=10, radius=0.025)
        for v in bm_toe.verts:
            v.co.y *= 0.30
            v.co = mat_rot_hand @ v.co + pos_hand + Vector((sign * (-0.015 + offset_x), 0.096, -0.080))
        create_mesh_object(f"Mochi_Pad_Toe_{side}_{idx}_V2", collection, bm_toe, mat_pink_pads, subsurf_level=1)

def build_tail(collection, mat_dark):
    """Cola redondeada sobre la pelvis blanca, justo bajo la mochila."""
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=20, v_segments=14, radius=0.105)
    for v in bm.verts:
        v.co.x *= 1.08
        v.co.y *= 0.92
        v.co.z *= 0.95
        v.co.y += 0.43
        v.co.z += 0.48
    return create_mesh_object("Mochi_Tail_V2", collection, bm, mat_dark, subsurf_level=2)

# ==============================================================================
# FASE 2: ROSTRO 3D REAL (SONRISA RADIANTE, OJOS VIVOS, CEJAS Y MEJILLAS)
# ==============================================================================
def build_eye_patch(collection, side, mat_dark):
    sign = 1.0 if side == 'L' else -1.0
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=28, v_segments=20, radius=0.21)
    
    for v in bm.verts:
        v.co.y *= 0.20
        if v.co.z < 0:
            v.co.x *= (1.0 - v.co.z * 0.45)
        if v.co.z > 0:
            v.co.x *= (1.0 - v.co.z * 0.16)
            
    head_z = 1.38
    rot = Euler((math.radians(16), math.radians(sign * 18), math.radians(sign * -15)), 'XYZ')
    mat_rot = rot.to_matrix().to_4x4()
    
    for v in bm.verts:
        v.co = mat_rot @ v.co
        v.co.x += sign * 0.225
        v.co.y -= 0.455
        v.co.z += head_z + 0.05
        
    return create_mesh_object(f"Mochi_EyePatch_{side}_V2", collection, bm, mat_dark, subsurf_level=2)

def build_3d_eye(collection, side, mat_sclera, mat_iris, mat_pupil, mat_shine):
    sign = 1.0 if side == 'L' else -1.0
    head_z = 1.38
    center_pos = Vector((sign * 0.215, -0.512, head_z + 0.05))
    
    # 1. Esclerótica blanca
    bm_sclera = bmesh.new()
    bmesh.ops.create_uvsphere(bm_sclera, u_segments=24, v_segments=18, radius=0.098)
    for v in bm_sclera.verts:
        v.co.y *= 0.36
        v.co += center_pos
    create_mesh_object(f"Mochi_Eye_Sclera_{side}_V2", collection, bm_sclera, mat_sclera, subsurf_level=1)
    
    # 2. Iris Marrón Chocolate Cálido (#4A2E22)
    bm_iris = bmesh.new()
    bmesh.ops.create_uvsphere(bm_iris, u_segments=24, v_segments=18, radius=0.084)
    for v in bm_iris.verts:
        v.co.y *= 0.30
        v.co += center_pos + Vector((sign * -0.005, -0.016, 0.0))
    create_mesh_object(f"Mochi_Eye_Iris_{side}_V2", collection, bm_iris, mat_iris, subsurf_level=1)
    
    # 3. Pupila Negra Pura (#0D0D0D)
    bm_pupil = bmesh.new()
    bmesh.ops.create_uvsphere(bm_pupil, u_segments=20, v_segments=16, radius=0.054)
    for v in bm_pupil.verts:
        v.co.y *= 0.30
        v.co += center_pos + Vector((sign * -0.005, -0.026, 0.0))
    create_mesh_object(f"Mochi_Eye_Pupil_{side}_V2", collection, bm_pupil, mat_pupil, subsurf_level=1)
    
    # 4. Brillo Principal (Arriba-izquierda)
    bm_sh1 = bmesh.new()
    bmesh.ops.create_uvsphere(bm_sh1, u_segments=14, v_segments=10, radius=0.029)
    for v in bm_sh1.verts:
        v.co.y *= 0.25
        v.co += center_pos + Vector((-0.024, -0.036, 0.033))
    create_mesh_object(f"Mochi_Catchlight_1_{side}_V2", collection, bm_sh1, mat_shine, subsurf_level=1)
    
    # 5. Brillo Secundario (Abajo-derecha)
    bm_sh2 = bmesh.new()
    bmesh.ops.create_uvsphere(bm_sh2, u_segments=12, v_segments=8, radius=0.015)
    for v in bm_sh2.verts:
        v.co.y *= 0.25
        v.co += center_pos + Vector((0.020, -0.036, -0.023))
    create_mesh_object(f"Mochi_Catchlight_2_{side}_V2", collection, bm_sh2, mat_shine, subsurf_level=1)

def build_eyebrows(collection, side, mat_dark):
    sign = 1.0 if side == 'L' else -1.0
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=18, v_segments=12, radius=0.045)
    for v in bm.verts:
        v.co.x *= 2.1
        v.co.y *= 0.35
        v.co.z *= 0.65
        dist_x = abs(v.co.x)
        v.co.z -= (dist_x ** 2) * 1.6
            
    head_z = 1.38
    rot = Euler((math.radians(20), math.radians(sign * -8), math.radians(sign * 14)), 'XYZ')
    mat_rot = rot.to_matrix().to_4x4()
    
    for v in bm.verts:
        v.co = mat_rot @ v.co
        v.co.x += sign * 0.225
        v.co.y -= 0.475
        v.co.z += head_z + 0.29
        
    return create_mesh_object(f"Mochi_Eyebrow_{side}_V2", collection, bm, mat_dark, subsurf_level=2)

def build_snout_and_smile(collection, mat_white, mat_dark, mat_mouth_cavity, mat_tongue):
    """
    Hocico suave, nariz triangular de plastilina negra y boca sonriente abierta con lengua coral.
    La sonrisa es amplia, alegre y nítida.
    """
    head_z = 1.38
    
    # 1. Hocico frontal suave
    bm_snout = bmesh.new()
    bmesh.ops.create_uvsphere(bm_snout, u_segments=28, v_segments=20, radius=0.19)
    for v in bm_snout.verts:
        v.co.x *= 1.30
        v.co.y *= 0.56
        v.co.z *= 0.68
        v.co.y -= 0.47
        v.co.z += head_z - 0.075
    create_mesh_object("Mochi_Snout_V2", collection, bm_snout, mat_white, subsurf_level=2)
    
    # 2. Nariz triangular redondeada negra
    bm_nose = bmesh.new()
    bmesh.ops.create_uvsphere(bm_nose, u_segments=20, v_segments=14, radius=0.075)
    for v in bm_nose.verts:
        if v.co.z < 0:
            v.co.x *= (1.0 + v.co.z * 1.25)
        v.co.x *= 1.32
        v.co.y *= 0.50
        v.co.z *= 0.76
        v.co.y -= 0.598
        v.co.z += head_z - 0.038
    create_mesh_object("Mochi_Nose_V2", collection, bm_nose, mat_dark, subsurf_level=2)
    
    # 3. Cavidad bucal abierta en amplia media luna sonriente
    bm_mouth = bmesh.new()
    bmesh.ops.create_uvsphere(bm_mouth, u_segments=26, v_segments=18, radius=0.095)
    for v in bm_mouth.verts:
        v.co.x *= 1.55
        v.co.y *= 0.26
        v.co.z *= 0.72
        # Curvatura sonriente viva
        if abs(v.co.x) > 0.02:
            v.co.z += (abs(v.co.x) - 0.02) * 0.45
        v.co.y -= 0.575
        v.co.z += head_z - 0.165
    create_mesh_object("Mochi_Mouth_Cavity_V2", collection, bm_mouth, mat_mouth_cavity, subsurf_level=2)
    
    # 4. Lengua coral visible en la base de la sonrisa
    bm_tongue = bmesh.new()
    bmesh.ops.create_uvsphere(bm_tongue, u_segments=20, v_segments=14, radius=0.065)
    for v in bm_tongue.verts:
        v.co.x *= 1.25
        v.co.y *= 0.32
        v.co.z *= 0.50
        v.co.y -= 0.585
        v.co.z += head_z - 0.188
    create_mesh_object("Mochi_Tongue_V2", collection, bm_tongue, mat_tongue, subsurf_level=2)
    
    # 5. Labio superior definido que delinea la sonrisa
    lip_pts = [
        Vector((-0.130, -0.570, head_z - 0.122)),
        Vector((-0.065, -0.588, head_z - 0.144)),
        Vector((0.0, -0.592, head_z - 0.138)),
        Vector((0.065, -0.588, head_z - 0.144)),
        Vector((0.130, -0.570, head_z - 0.122))
    ]
    create_curved_tube("Mochi_Lip_Upper_V2", collection, lip_pts, radius=0.012, mat=mat_dark)
    
    # 6. Filtrum (surco vertical nariz-labio)
    philtrum_pts = [
        Vector((0.0, -0.596, head_z - 0.088)),
        Vector((0.0, -0.592, head_z - 0.138))
    ]
    create_curved_tube("Mochi_Philtrum_V2", collection, philtrum_pts, radius=0.008, mat=mat_dark)

def build_blush_cheeks(collection, mat_blush):
    head_z = 1.38
    for side in ['L', 'R']:
        sign = 1.0 if side == 'L' else -1.0
        bm = bmesh.new()
        bmesh.ops.create_uvsphere(bm, u_segments=22, v_segments=16, radius=0.13)
        for v in bm.verts:
            v.co.x *= 1.25
            v.co.y *= 0.14
            v.co.z *= 0.65
            
        rot = Euler((math.radians(12), math.radians(sign * 25), math.radians(sign * -15)), 'XYZ')
        mat_rot = rot.to_matrix().to_4x4()
        for v in bm.verts:
            v.co = mat_rot @ v.co
            v.co.x += sign * 0.38
            v.co.y -= 0.42
            v.co.z += head_z - 0.085
            
        create_mesh_object(f"Mochi_Blush_{side}_V2", collection, bm, mat_blush, subsurf_level=2)

# ==============================================================================
# FASE 3 (A): SUDADERA AZUL CON CAPUCHA (HOODIE AJUSTADO ORGÁNICO)
# ==============================================================================
def build_hoodie(collection, mat_hoodie, mat_metal, mat_teal, mat_mtn):
    """
    Sudadera Azul Cerúleo (#2B83C6):
    - Se ajusta orgánicamente al cuerpo sin aros despegados.
    - Termina a media barriga (Z = 0.58), dejando visible la franja de pelaje blanco abajo.
    - Cuello/capucha abultada envolvente en cuello y nuca.
    - Mangas cortas con puños doblados.
    - Cremallera con tirador metálico (#A6AEB5).
    - Bolsillo canguro dividido que abraza el abdomen.
    - Parche circular turquesa con montaña nevada en el pecho izquierdo.
    """
    # 1. Cuerpo de la sudadera: Ajustado y orgánico
    bm_body = bmesh.new()
    bmesh.ops.create_uvsphere(bm_body, u_segments=36, v_segments=28, radius=0.505)
    for v in bm_body.verts:
        # Corte inferior neto en Z = 0.58 (sin falda/hula-hoop)
        if v.co.z < -0.22:
            v.co.z = -0.22
            # Engrosamiento sutil para simular el borde doblado de la tela
            v.co.x *= 1.02
            v.co.y *= 1.02
        v.co.x *= 1.04
        v.co.y *= 0.97
        v.co.z *= 1.18
        v.co.z += 0.84
    create_mesh_object("Mochi_Hoodie_Torso_V2", collection, bm_body, mat_hoodie, subsurf_level=2)
    
    # 2. Capucha abultada (Collar acolchado alrededor del cuello y descansando en hombros)
    bm_hood = bmesh.new()
    bmesh.ops.create_uvsphere(bm_hood, u_segments=32, v_segments=24, radius=0.38)
    for v in bm_hood.verts:
        v.co.x *= 1.32
        v.co.y *= 0.90
        v.co.z *= 0.50
        v.co.y += 0.10
        v.co.z += 1.15
    create_mesh_object("Mochi_Hoodie_Collar_V2", collection, bm_hood, mat_hoodie, subsurf_level=2)

    # 3. Mangas cortas con puño elástico doblado
    for side in ['L', 'R']:
        sign = 1.0 if side == 'L' else -1.0
        
        bm_sleeve = bmesh.new()
        bmesh.ops.create_uvsphere(bm_sleeve, u_segments=24, v_segments=18, radius=0.19)
        for v in bm_sleeve.verts:
            v.co.z *= 1.15
            v.co.x *= 1.15
            v.co.y *= 1.05
        rot_sleeve = Euler((math.radians(10), math.radians(sign * -24), math.radians(sign * 10)), 'XYZ')
        mat_rot_sleeve = rot_sleeve.to_matrix().to_4x4()
        for v in bm_sleeve.verts:
            v.co = mat_rot_sleeve @ v.co
            v.co.x += sign * 0.50
            v.co.y -= 0.05
            v.co.z += 0.91
        create_mesh_object(f"Mochi_Sleeve_{side}_V2", collection, bm_sleeve, mat_hoodie, subsurf_level=2)
        
        bm_cuff = bmesh.new()
        bmesh.ops.create_uvsphere(bm_cuff, u_segments=20, v_segments=14, radius=0.175)
        for v in bm_cuff.verts:
            v.co.z *= 0.35
            v.co.x *= 1.16
            v.co.y *= 1.06
        for v in bm_cuff.verts:
            v.co = mat_rot_sleeve @ v.co
            v.co.x += sign * 0.56
            v.co.y -= 0.055
            v.co.z += 0.79
        create_mesh_object(f"Mochi_Sleeve_Cuff_{side}_V2", collection, bm_cuff, mat_hoodie, subsurf_level=2)

    # 4. Cremallera central (Track)
    zip_pts = [
        Vector((0.0, -0.525, 1.16)),
        Vector((0.0, -0.548, 1.02)),
        Vector((0.0, -0.542, 0.82)),
        Vector((0.0, -0.530, 0.68)),
        Vector((0.0, -0.518, 0.58))
    ]
    create_curved_tube("Mochi_Zipper_Track_V2", collection, zip_pts, radius=0.013, mat=mat_metal)
    
    # Carro / Tirador metálico (#A6AEB5) con forma estilizada
    bm_pull = bmesh.new()
    bmesh.ops.create_cube(bm_pull, size=0.042)
    for v in bm_pull.verts:
        v.co.x *= 0.65
        v.co.y *= 0.65
        v.co.z *= 1.45
        v.co.y -= 0.575
        v.co.z += 1.05
    create_mesh_object("Mochi_Zipper_Slider_V2", collection, bm_pull, mat_metal, subsurf_level=1)
    
    # 5. Cordones azules del hoodie
    cord_L = [
        Vector((0.075, -0.520, 1.14)),
        Vector((0.085, -0.545, 1.02)),
        Vector((0.075, -0.540, 0.90))
    ]
    cord_R = [
        Vector((-0.075, -0.520, 1.14)),
        Vector((-0.085, -0.545, 1.03)),
        Vector((-0.075, -0.540, 0.93))
    ]
    create_curved_tube("Mochi_Hoodie_Cord_L_V2", collection, cord_L, radius=0.009, mat=mat_hoodie)
    create_curved_tube("Mochi_Hoodie_Cord_R_V2", collection, cord_R, radius=0.009, mat=mat_hoodie)

    # 6. Bolsillos Canguro Divididos bien integrados sobre el vientre
    for side in ['L', 'R']:
        sign = 1.0 if side == 'L' else -1.0
        bm_pocket = bmesh.new()
        bmesh.ops.create_uvsphere(bm_pocket, u_segments=22, v_segments=16, radius=0.17)
        for v in bm_pocket.verts:
            v.co.x *= 1.08
            v.co.y *= 0.16
            v.co.z *= 0.65
            if v.co.x * sign > 0.04:
                v.co.z *= 0.65
            v.co.x += sign * 0.155
            v.co.y -= 0.505
            v.co.z += 0.68
        create_mesh_object(f"Mochi_Pocket_{side}_V2", collection, bm_pocket, mat_hoodie, subsurf_level=2)

    # 7. Parche Circular de Montaña en Pecho Izquierdo
    bm_patch = bmesh.new()
    bmesh.ops.create_uvsphere(bm_patch, u_segments=24, v_segments=16, radius=0.088)
    for v in bm_patch.verts:
        v.co.y *= 0.15
        v.co.x *= 1.0
        v.co.z *= 1.0
    rot_patch = Euler((math.radians(22), math.radians(32), math.radians(-16)), 'XYZ')
    mat_rot_patch = rot_patch.to_matrix().to_4x4()
    for v in bm_patch.verts:
        v.co = mat_rot_patch @ v.co
        v.co.x += 0.23
        v.co.y -= 0.455
        v.co.z += 0.98
    create_mesh_object("Mochi_Badge_Rim_V2", collection, bm_patch, mat_teal, subsurf_level=2)
    
    # Montaña blanca nevada (#F2EFE9)
    bm_mtn = bmesh.new()
    bmesh.ops.create_cone(bm_mtn, cap_ends=True, segments=16, radius1=0.045, radius2=0.0, depth=0.065)
    for v in bm_mtn.verts:
        v.co = mat_rot_patch @ v.co
        v.co.x += 0.235
        v.co.y -= 0.470
        v.co.z += 0.98
    create_mesh_object("Mochi_Badge_Mountain_V2", collection, bm_mtn, mat_mtn, subsurf_level=1)

# ==============================================================================
# FASE 3 (B): MOCHILA AMARILLA DE EXCURSIONISTA (ARQUITECTURA DE ALTA FIDELIDAD)
# ==============================================================================
def build_backpack(collection, mat_yellow, mat_dark, mat_metal):
    """
    Mochila Amarilla Ocre (#E3AC34):
    - Proporciones imponentes y definidas en la espalda (Z=0.70 a 1.15, ancho X ~ 0.48).
    - Solapa superior visible que cubre el tercio superior.
    - Dos correas verticales sobre la solapa con hebillas metálicas.
    - Bolsillo exterior inferior rectangular horizontal.
    - Asa superior curva en '∩'.
    - Bolsillos laterales cilíndricos.
    - Correas de hombros acolchadas que caen de forma elegante por el pecho frontal.
    """
    # 1. Cuerpo Principal de la Mochila (Caja mullida con esquinas redondeadas)
    bm_pack = bmesh.new()
    bmesh.ops.create_cube(bm_pack, size=0.48)
    for v in bm_pack.verts:
        v.co.x *= 1.05
        v.co.y *= 0.55
        v.co.z *= 0.92
        v.co.y += 0.45
        v.co.z += 0.92
    create_mesh_object("Mochi_Backpack_Body_V2", collection, bm_pack, mat_yellow, subsurf_level=3)

    # 2. Solapa Superior (Flap exterior con curvatura envolvente)
    bm_flap = bmesh.new()
    bmesh.ops.create_cube(bm_flap, size=0.46)
    for v in bm_flap.verts:
        v.co.x *= 1.08
        v.co.y *= 0.58
        v.co.z *= 0.48
        v.co.y += 0.48
        v.co.z += 1.06
    create_mesh_object("Mochi_Backpack_Flap_V2", collection, bm_flap, mat_yellow, subsurf_level=3)

    # 3. Dos correas de solapa verticales con hebillas metálicas
    for side in ['L', 'R']:
        sign = 1.0 if side == 'L' else -1.0
        # Correa vertical
        bm_strap_v = bmesh.new()
        bmesh.ops.create_cube(bm_strap_v, size=0.035)
        for v in bm_strap_v.verts:
            v.co.x *= 0.65
            v.co.y *= 0.30
            v.co.z *= 3.4
            v.co.x += sign * 0.14
            v.co.y += 0.64
            v.co.z += 1.02
        create_mesh_object(f"Mochi_Pack_Strap_V_{side}_V2", collection, bm_strap_v, mat_yellow, subsurf_level=1)
        
        # Hebilla metálica/oscura
        bm_buckle = bmesh.new()
        bmesh.ops.create_cube(bm_buckle, size=0.032)
        for v in bm_buckle.verts:
            v.co.x *= 1.3
            v.co.y *= 0.5
            v.co.z *= 0.5
            v.co.x += sign * 0.14
            v.co.y += 0.65
            v.co.z += 0.98
        create_mesh_object(f"Mochi_Pack_Buckle_{side}_V2", collection, bm_buckle, mat_metal, subsurf_level=1)

    # 4. Bolsillo Exterior Inferior (Horizontal con cremallera)
    bm_pocket = bmesh.new()
    bmesh.ops.create_cube(bm_pocket, size=0.38)
    for v in bm_pocket.verts:
        v.co.x *= 1.15
        v.co.y *= 0.42
        v.co.z *= 0.48
        v.co.y += 0.58
        v.co.z += 0.79
    create_mesh_object("Mochi_Backpack_Pocket_V2", collection, bm_pocket, mat_yellow, subsurf_level=3)

    # 5. Asa Superior Curva en "∩"
    handle_pts = [
        Vector((-0.07, 0.42, 1.14)),
        Vector((-0.05, 0.44, 1.25)),
        Vector((0.0, 0.45, 1.28)),
        Vector((0.05, 0.44, 1.25)),
        Vector((0.07, 0.42, 1.14))
    ]
    create_curved_tube("Mochi_Backpack_Handle_V2", collection, handle_pts, radius=0.022, mat=mat_yellow)

    # 6. Bolsillos Laterales (Visibles de perfil)
    for side in ['L', 'R']:
        sign = 1.0 if side == 'L' else -1.0
        bm_side_p = bmesh.new()
        bmesh.ops.create_cube(bm_side_p, size=0.18)
        for v in bm_side_p.verts:
            v.co.x *= 0.55
            v.co.y *= 0.85
            v.co.z *= 1.05
            v.co.x += sign * 0.27
            v.co.y += 0.44
            v.co.z += 0.82
        create_mesh_object(f"Mochi_Pack_Side_Pocket_{side}_V2", collection, bm_side_p, mat_yellow, subsurf_level=2)

    # 7. Correas de los Hombros: Flanquean el pecho frontalmente con elegancia y ajuste natural
    for side in ['L', 'R']:
        sign = 1.0 if side == 'L' else -1.0
        pts_shoulder = [
            Vector((sign * 0.20, 0.38, 1.05)),
            Vector((sign * 0.28, 0.12, 1.18)),
            Vector((sign * 0.32, -0.18, 1.12)),
            Vector((sign * 0.31, -0.42, 0.92)),
            Vector((sign * 0.29, -0.47, 0.76)),
            Vector((sign * 0.27, -0.44, 0.62))
        ]
        create_curved_tube(f"Mochi_Shoulder_Strap_{side}_V2", collection, pts_shoulder, radius=0.034, mat=mat_yellow)
        
        # Conexión inferior lateral hacia la base de la mochila bajo el brazo
        pts_side = [
            Vector((sign * 0.27, -0.44, 0.62)),
            Vector((sign * 0.40, -0.10, 0.64)),
            Vector((sign * 0.26, 0.35, 0.74))
        ]
        create_curved_tube(f"Mochi_Side_Strap_{side}_V2", collection, pts_side, radius=0.022, mat=mat_yellow)

# ==============================================================================
# FASE 4: CONFIGURACIÓN CYCLES, CÁMARAS Y RENDERS
# ==============================================================================
def setup_cycles():
    scene = bpy.context.scene
    scene.render.engine = 'CYCLES'
    cycles = scene.cycles
    cycles.samples = 64
    cycles.preview_samples = 24
    cycles.use_denoising = True
    cycles.denoiser = 'OPENIMAGEDENOISE'
    
    scene.view_settings.view_transform = 'AgX'
    scene.view_settings.look = 'AgX - Medium High Contrast'
    scene.view_settings.exposure = 0.10

def render_turnaround(output_dir, cams):
    os.makedirs(output_dir, exist_ok=True)
    scene = bpy.context.scene
    scene.render.resolution_x = 1024
    scene.render.resolution_y = 1024
    scene.render.film_transparent = True
    scene.render.image_settings.file_format = 'PNG'
    scene.render.image_settings.color_mode = 'RGBA'
    
    for view_name, cam_obj in cams.items():
        scene.camera = cam_obj
        filepath = os.path.join(output_dir, f"mochi_clay_v2_{view_name}.png")
        scene.render.filepath = filepath
        print(f"Renderizando Cycles [{view_name.upper()}] a: {filepath}")
        bpy.ops.render.render(write_still=True)
        
    scene.render.resolution_x = 512
    scene.render.resolution_y = 512
    scene.render.image_settings.file_format = 'WEBP'
    scene.render.image_settings.quality = 95
    scene.camera = cams['front']
    webp_path = os.path.join(r"E:\Reto Panda\assets\mascotas\mochi", "mochi_avatar_v2.webp")
    scene.render.filepath = webp_path
    print(f"Renderizando WebP PWA a: {webp_path}")
    bpy.ops.render.render(write_still=True)

def main():
    print("=== REFACTORIZACIÓN MAESTRA CLAYMATION V3 DE MOCHI ===")
    
    v2_col = bpy.data.collections.get("Mochi_Clay_V2")
    if not v2_col:
        print("Error: Colección Mochi_Clay_V2 no encontrada.")
        return
        
    col_anatomy = bpy.data.collections.get("Mochi_V2_Anatomy")
    col_face = bpy.data.collections.get("Mochi_V2_Face")
    col_clothes = bpy.data.collections.get("Mochi_V2_Clothes")
    
    for c in [col_anatomy, col_face, col_clothes]:
        if c:
            clear_collection_objects(c)
            
    # Materiales Stop-Motion Clay PBR
    mat_white = get_or_create_clay_material("MAT_Pelaje_Blanco", "#F2EFE9", roughness=0.86, sss_weight=0.06, bump_str=0.038)
    mat_dark = get_or_create_clay_material("MAT_Pelaje_Oscuro", "#362E2D", roughness=0.84, sss_weight=0.03, bump_str=0.035)
    mat_pink_pads = get_or_create_clay_material("MAT_Almohadillas_Rosa", "#E8A598", roughness=0.78, sss_weight=0.15, bump_str=0.025)
    mat_blush = get_or_create_clay_material("MAT_Mejillas_Rubor", "#F2A69A", roughness=0.82, sss_weight=0.25, bump_str=0.015)
    mat_mouth_inside = get_or_create_clay_material("MAT_Boca_Fondo", "#281210", roughness=0.65, bump_str=0.015)
    mat_tongue = get_or_create_clay_material("MAT_Boca_Lengua", "#E06D65", roughness=0.70, sss_weight=0.20, bump_str=0.025)
    
    mat_sclera = get_or_create_clay_material("MAT_Ojo_Esclerotica", "#FFFFFF", roughness=0.22, bump_str=0.008)
    mat_iris = get_or_create_glossy_material("MAT_Ojo_Iris", "#4A2E22", roughness=0.04)
    mat_pupil = get_or_create_glossy_material("MAT_Ojo_Pupila", "#0D0D0D", roughness=0.02)
    mat_shine = get_or_create_glossy_material("MAT_Ojo_Brillo", "#FFFFFF", roughness=0.0)
    
    mat_hoodie = get_or_create_clay_material("MAT_Hoodie_Azul", "#2B83C6", roughness=0.84, sss_weight=0.04, bump_str=0.038)
    mat_metal = get_or_create_clay_material("MAT_Metal_Cierre", "#A6AEB5", roughness=0.45, bump_str=0.015, is_metallic=0.65)
    mat_yellow = get_or_create_clay_material("MAT_Mochila_Amarilla", "#E3AC34", roughness=0.84, sss_weight=0.04, bump_str=0.038)
    mat_teal = get_or_create_clay_material("MAT_Parche_Turquesa", "#48B2B8", roughness=0.80, bump_str=0.025)
    mat_mtn = get_or_create_clay_material("MAT_Parche_Montaña", "#F2EFE9", roughness=0.75, bump_str=0.020)

    print("1. Anatomía y Extremidades...")
    build_head(col_anatomy, mat_white)
    build_ear(col_anatomy, 'L', mat_dark)
    build_ear(col_anatomy, 'R', mat_dark)
    build_torso(col_anatomy, mat_white)
    build_leg(col_anatomy, 'L', mat_dark)
    build_leg(col_anatomy, 'R', mat_dark)
    build_arm_and_hand(col_anatomy, 'L', mat_dark, mat_pink_pads)
    build_arm_and_hand(col_anatomy, 'R', mat_dark, mat_pink_pads)
    build_tail(col_anatomy, mat_dark)

    print("2. Rostro 3D...")
    build_eye_patch(col_face, 'L', mat_dark)
    build_eye_patch(col_face, 'R', mat_dark)
    build_3d_eye(col_face, 'L', mat_sclera, mat_iris, mat_pupil, mat_shine)
    build_3d_eye(col_face, 'R', mat_sclera, mat_iris, mat_pupil, mat_shine)
    build_eyebrows(col_face, 'L', mat_dark)
    build_eyebrows(col_face, 'R', mat_dark)
    build_snout_and_smile(col_face, mat_white, mat_dark, mat_mouth_inside, mat_tongue)
    build_blush_cheeks(col_face, mat_blush)

    print("3. Sudadera Azul...")
    build_hoodie(col_clothes, mat_hoodie, mat_metal, mat_teal, mat_mtn)

    print("4. Mochila Amarilla...")
    build_backpack(col_clothes, mat_yellow, mat_dark, mat_metal)

    print("5. Cycles & Guardado...")
    setup_cycles()
    
    col_studio = bpy.data.collections.get("Studio_Setup")
    cams = {
        'front': bpy.data.objects.get("Cam_Front_V2"),
        'three_quarter': bpy.data.objects.get("Cam_ThreeQuarter_V2"),
        'profile': bpy.data.objects.get("Cam_Profile_V2"),
        'back': bpy.data.objects.get("Cam_Back_V2")
    }
    
    for cam in cams.values():
        if cam:
            cam.location.z = 0.88

    blend_path = r"E:\Reto Panda\assets\mascotas\mochi\mochi_avatar_3d.blend"
    bpy.ops.wm.save_as_mainfile(filepath=blend_path)

    glb_path = r"E:\Reto Panda\assets\mascotas\mochi\mochi_avatar_v2.glb"
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

    out_dir = r"E:\Reto Panda\assets\mascotas\mochi\turnaround_final_v2"
    render_turnaround(out_dir, cams)
    print("=== REFACTORIZACIÓN MAESTRA V3 COMPLETADA ===")

if __name__ == "__main__":
    main()
