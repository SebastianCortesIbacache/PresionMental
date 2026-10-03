import os
import random

base_dir = os.path.dirname(os.path.abspath(__file__))
folder = os.path.join(base_dir, "6 a 7")
files = [
    "Ciencias 6 a 7 años.md",
    "Historia 6 a 7 años.md",
    "Ingles 6 a 7 años.md",
    "Lenguaje 6 a 7 años.md",
    "Logica Acertijos 6 a 7 años.md",
    "Matematicas 6 a 7 años.md"
]

selection = []
questions_per_file = [30, 20, 20, 50, 40, 40] # total 200

with open(os.path.join(base_dir, "Seleccion_Lanzamiento_200.md"), "w", encoding="utf-8") as out:
    out.write("# Selección de 200 Preguntas MVP (Tier 1 - 6 a 7 años)\n\n")
    
    for i, file in enumerate(files):
        path = os.path.join(folder, file)
        if not os.path.exists(path):
            continue
        
        with open(path, "r", encoding="utf-8") as f:
            lines = f.readlines()
            
        questions = [l.strip() for l in lines if l.strip() and l[0].isdigit()]
        
        # We can pick a random sample or first N
        # Let's pick evenly spaced to get a variety
        step = len(questions) / questions_per_file[i]
        selected = [questions[int(j * step)] for j in range(questions_per_file[i])]
        
        out.write(f"## {file.replace(' 6 a 7 años.md', '')}\n")
        for q in selected:
            out.write(f"{q}\n")
        out.write("\n")

print("Seleccion de 200 preguntas generada con exito.")
