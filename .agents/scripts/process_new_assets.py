"""
Script de procesamiento y optimización de assets para Reto Panda (Tier 1 Clay).
Convierte los renders 2K a WebP optimizados para PWA con recorte inteligente,
aislamiento de fondos alfa (rembg) y redimensionamiento de alto rendimiento.
"""

import os
from PIL import Image
from rembg import remove

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
NUEVOS_DIR = os.path.join(BASE_DIR, 'assets', 'Nuevos')
INTERFACE_DIR = os.path.join(BASE_DIR, 'assets', 'interface')
ICONOS_DIR = os.path.join(BASE_DIR, 'assets', 'iconos')

def process_isolated_icon(src_name, dst_path, target_max_dim=128, padding=10):
    src_path = os.path.join(NUEVOS_DIR, src_name)
    print(f"-> Procesando icono: {src_name} -> {os.path.basename(dst_path)}")
    im = Image.open(src_path)
    
    # Reducir primero para que rembg sea ultra-rápido y suave
    scale = 1024 / max(im.size)
    im_scaled = im.resize((int(im.width * scale), int(im.height * scale)), Image.Resampling.LANCZOS)
    
    # Remover fondo
    nobg = remove(im_scaled)
    bbox = nobg.getbbox()
    if bbox:
        # Añadir padding
        w, h = nobg.size
        pad_bbox = (
            max(0, bbox[0] - padding),
            max(0, bbox[1] - padding),
            min(w, bbox[2] + padding),
            min(h, bbox[3] + padding)
        )
        nobg = nobg.crop(pad_bbox)
    
    # Redimensionar al tamaño final manteniendo aspect ratio
    ratio = min(target_max_dim / nobg.width, target_max_dim / nobg.height)
    new_size = (int(nobg.width * ratio), int(nobg.height * ratio))
    final_im = nobg.resize(new_size, Image.Resampling.LANCZOS)
    
    # Guardar WebP
    final_im.save(dst_path, format='WEBP', quality=90, method=6)
    kb = os.path.getsize(dst_path) / 1024
    print(f"   [OK] Guardado: {dst_path} ({final_im.size[0]}x{final_im.size[1]} px, {kb:.1f} KB)")

def process_isolated_slab_button(src_name, dst_path, target_width=440, padding=12):
    src_path = os.path.join(NUEVOS_DIR, src_name)
    print(f"-> Procesando placa botón 3D: {src_name} -> {os.path.basename(dst_path)}")
    im = Image.open(src_path)
    
    scale = 1024 / max(im.size)
    im_scaled = im.resize((int(im.width * scale), int(im.height * scale)), Image.Resampling.LANCZOS)
    
    nobg = remove(im_scaled)
    bbox = nobg.getbbox()
    if bbox:
        w, h = nobg.size
        pad_bbox = (
            max(0, bbox[0] - padding),
            max(0, bbox[1] - padding),
            min(w, bbox[2] + padding),
            min(h, bbox[3] + padding)
        )
        nobg = nobg.crop(pad_bbox)
    
    ratio = target_width / nobg.width
    new_size = (target_width, int(nobg.height * ratio))
    final_im = nobg.resize(new_size, Image.Resampling.LANCZOS)
    
    final_im.save(dst_path, format='WEBP', quality=90, method=6)
    kb = os.path.getsize(dst_path) / 1024
    print(f"   [OK] Guardado: {dst_path} ({final_im.size[0]}x{final_im.size[1]} px, {kb:.1f} KB)")

def process_logo_caratula(src_name, dst_path, target_width=800, padding=12):
    src_path = os.path.join(NUEVOS_DIR, src_name)
    print(f"-> Procesando Logo Carátula 3D: {src_name} -> {os.path.basename(dst_path)}")
    im = Image.open(src_path)
    
    scale = 1200 / max(im.size)
    im_scaled = im.resize((int(im.width * scale), int(im.height * scale)), Image.Resampling.LANCZOS)
    
    nobg = remove(im_scaled)
    bbox = nobg.getbbox()
    if bbox:
        w, h = nobg.size
        pad_bbox = (
            max(0, bbox[0] - padding),
            max(0, bbox[1] - padding),
            min(w, bbox[2] + padding),
            min(h, bbox[3] + padding)
        )
        nobg = nobg.crop(pad_bbox)
    
    ratio = target_width / nobg.width
    new_size = (target_width, int(nobg.height * ratio))
    final_im = nobg.resize(new_size, Image.Resampling.LANCZOS)
    
    final_im.save(dst_path, format='WEBP', quality=90, method=6)
    kb = os.path.getsize(dst_path) / 1024
    print(f"   [OK] Guardado: {dst_path} ({final_im.size[0]}x{final_im.size[1]} px, {kb:.1f} KB)")

def process_hero_diorama(src_name, dst_path, target_size=(1024, 800)):
    src_path = os.path.join(NUEVOS_DIR, src_name)
    print(f"-> Procesando Diorama Mochi Isla: {src_name} -> {os.path.basename(dst_path)}")
    im = Image.open(src_path)
    
    # En 2048x2048 Mochi y la isla ocupan y=[300..1900].
    # Hacemos un crop suave para dar un encuadre panorámico perfecto a 1024x800
    w, h = im.size
    crop_top = int(h * 0.05)
    crop_bottom = int(h * 0.95)
    crop_left = int(w * 0.02)
    crop_right = int(w * 0.98)
    
    im_cropped = im.crop((crop_left, crop_top, crop_right, crop_bottom))
    final_im = im_cropped.resize(target_size, Image.Resampling.LANCZOS)
    
    final_im.save(dst_path, format='WEBP', quality=88, method=6)
    kb = os.path.getsize(dst_path) / 1024
    print(f"   [OK] Guardado: {dst_path} ({final_im.size[0]}x{final_im.size[1]} px, {kb:.1f} KB)")

def main():
    print("=== INICIANDO PROCESAMIENTO DE ASSETS RETO PANDA ===")
    
    # 1. Logo Carátula
    process_logo_caratula(
        'RETO_PANDA_THE_GAME_logo_2K_20261010191114.jpg',
        os.path.join(INTERFACE_DIR, 'caratula.webp'),
        target_width=760
    )
    
    # 2. Botón Modo Mundos (Placa 3D)
    process_isolated_slab_button(
        'Clay_snowy_mountain_menu_button_2K_20261010191108.jpg',
        os.path.join(INTERFACE_DIR, 'btn_mundos_clay.webp'),
        target_width=400
    )
    
    # 3. Botón Modo Libre (Placa 3D)
    process_isolated_slab_button(
        'Clay_gaming_menu_button_slab_2K_20261010191105.jpg',
        os.path.join(INTERFACE_DIR, 'btn_libre_clay.webp'),
        target_width=400
    )
    
    # 4. Icono Diana / Target 3D
    process_isolated_icon(
        'Archery_target_with_arrow_2K_20261010191038.jpg',
        os.path.join(ICONOS_DIR, 'ico_target_3d.webp'),
        target_max_dim=120
    )
    
    # 5. Icono Pizarra de Números / Matemáticas
    process_isolated_icon(
        'Clay_numbers_on_blackboard_2K_20261010191041.jpg',
        os.path.join(ICONOS_DIR, 'ico_mission_math_3d.webp'),
        target_max_dim=120
    )
    
    # 6. Icono Engranaje Ajustes (Opción A: Sky Blue)
    process_isolated_icon(
        'Sky_blue_mechanical_gear_2K_20261010191027.jpg',
        os.path.join(ICONOS_DIR, 'ico_gear_3d.webp'),
        target_max_dim=120
    )
    
    # 7. Hero Diorama Mochi en la Isla (Opción A: Cielo Azul Brillante)
    process_hero_diorama(
        'Panda_explorer_sitting_on_island_2K_20261010191020.jpg',
        os.path.join(INTERFACE_DIR, 'hero_mochi_diorama.webp'),
        target_size=(1024, 768)
    )
    
    print("=== TODOS LOS ASSETS HAN SIDO PROCESADOS EXITOSAMENTE ===")

if __name__ == '__main__':
    main()
