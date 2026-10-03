from rembg import remove
from PIL import Image
import os

base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
files = [
    os.path.join(base_dir, "assets", "interface", "icon_cloud.webp"),
    os.path.join(base_dir, "assets", "interface", "icon_star_clay.webp")
]

for file in files:
    if os.path.exists(file):
        try:
            with open(file, 'rb') as i:
                input_data = i.read()
                
            output_data = remove(input_data)
            
            with open(file, 'wb') as o:
                o.write(output_data)
                
            print(f"✅ Procesado con rembg: {file}")
        except Exception as e:
            print(f"Error procesando {file}: {e}")
    else:
        print(f"Archivo no encontrado: {file}")
