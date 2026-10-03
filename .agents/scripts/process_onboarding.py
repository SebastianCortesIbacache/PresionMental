"""
Procesar Onboarding.png: remover fondo negro y exportar a WebP con canal alfa.
Genera onboarding_hero.webp en assets/interface/
"""
from PIL import Image
import os

base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
INPUT  = os.path.join(base_dir, "assets", "interface", "Onboarding.png")
OUTPUT = os.path.join(base_dir, "assets", "interface", "onboarding_hero.webp")

img = Image.open(INPUT).convert("RGBA")
pixels = img.load()
w, h = img.size

# El fondo es negro puro o casi-negro. Removemos pixeles
# con luminosidad muy baja y que no sean parte del sujeto.
# Usamos un threshold adaptativo: si R+G+B < threshold → transparente
THRESHOLD = 30  # bastante estricto para no comer bordes del panda

for y in range(h):
    for x in range(w):
        r, g, b, a = pixels[x, y]
        luminance = r + g + b
        if luminance < THRESHOLD:
            pixels[x, y] = (0, 0, 0, 0)
        elif luminance < THRESHOLD * 2:
            # Zona de transición: semi-transparente para bordes suaves
            factor = (luminance - THRESHOLD) / THRESHOLD
            new_alpha = int(a * factor)
            pixels[x, y] = (r, g, b, new_alpha)

# Guardar como WebP con transparencia, calidad alta
img.save(OUTPUT, "WEBP", quality=92, method=6)
print(f"✅ Procesado: {OUTPUT}")
print(f"   Tamaño: {os.path.getsize(OUTPUT) / 1024:.0f} KB")
print(f"   Dimensiones: {w}x{h}")
