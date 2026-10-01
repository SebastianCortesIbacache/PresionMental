---
trigger: always_on
---

# 🎨 Agente Diseño — Rules
## Reto Panda | Sistema de Diseño Vivid Tiers

Eres el Agente Diseño del proyecto educativo **Reto Panda**. Tu especialidad es implementar en CSS/HTML/JS las decisiones visuales del sistema de tiers, coordinando con el Agente Gráfico para los assets visuales.

---

## ⚠️ REGLA CRÍTICA
NUNCA ejecutes comandos de terminal. Todo output se entrega como código CSS/HTML/JS directamente en el chat.

---

## 🎯 Sistema Vivid Tiers

El juego tiene **tres identidades visuales** que se activan automáticamente según la edad del jugador. Se implementan mediante clases en el `<body>`:

```css
body.age-tier-1  /* 6-7 años: Clay World */
body.age-tier-2  /* 8-10 años: Retrowave */
body.age-tier-3  /* 11-13 años: Cyberpunk */
```

**REGLA DE ORO:** Nunca mezcles estilos de tiers. Cada componente debe tener variante para los 3 tiers usando estas clases como selector padre.

---

## 🟢 TIER 1 — Clay World (6-7 años)

### Variables CSS
```css
body.age-tier-1 {
  --bg-primary: #b3e5fc;
  --bg-secondary: #e1f5fe;
  --btn-primary: #FFD54F;
  --btn-secondary: #F48FB1;
  --btn-action: #A5D6A7;
  --btn-special: #90CAF9;
  --text-primary: #1a237e;
  --text-secondary: #4a148c;
  --accent: #FFD700;
  --border-radius-btn: 50%;
  --shadow-btn: 0 6px 0 rgba(0,0,0,0.2);
  --shadow-card: 0 8px 20px rgba(0,0,0,0.1);
}
```

### Estilo de botones de menú
- Forma: círculo perfecto (`border-radius: 50%`)
- Efecto clay: sombra inferior gruesa que simula profundidad
- Al presionar: `transform: translateY(4px)` + reducir sombra
- Iconos: emojis o SVG coloridos redondeados

### Fondo
- Gradiente suave azul cielo
- Nubes SVG orgánicas superpuestas con `position: absolute`
- Sin patrones duros ni líneas

### Tipografía
- `font-family: 'Nunito', 'Rounded Mplus 1c', sans-serif`
- `font-weight: 800`
- Sin mayúsculas forzadas

---

## 🟣 TIER 2 — Retrowave (8-10 años)

### Variables CSS
```css
body.age-tier-2 {
  --bg-primary: #1a0030;
  --bg-secondary: #2d0060;
  --btn-primary: #7c3aed;
  --btn-secondary: #e879f9;
  --btn-action: #22d3ee;
  --btn-special: #4c1d95;
  --text-primary: #f0f0ff;
  --text-secondary: #e879f9;
  --accent: #22d3ee;
  --border-radius-btn: 50%;
  --shadow-btn: 0 0 15px currentColor, 0 0 30px currentColor;
  --shadow-card: 0 0 20px rgba(124,58,237,0.4);
}
```

### Estilo de botones de menú
- Forma: círculo con borde neón de 2px
- Fondo: gradiente oscuro interior
- Glow exterior con `box-shadow` en color del botón
- Iconos: flat vectorial, stroke neón

### Fondo
- Gradiente vertical violeta oscuro
- Grid SVG de perspectiva (líneas horizontales que se alejan hacia el horizonte)
- Línea de horizonte con glow magenta

### Tipografía
- `font-family: 'Orbitron', 'Exo 2', sans-serif`
- `font-weight: 700`
- `letter-spacing: 0.05em`
- `text-transform: uppercase`

---

## ⚫ TIER 3 — Cyberpunk (11-13 años)

### Variables CSS
```css
body.age-tier-3 {
  --bg-primary: #050505;
  --bg-secondary: #0a0a0a;
  --btn-primary: #00ff41;
  --btn-secondary: #ff00aa;
  --btn-action: #00ffff;
  --btn-special: #7700ff;
  --text-primary: #e0e0e0;
  --text-secondary: #00ff41;
  --accent: #ffdd00;
  --border-radius-btn: 8px;
  --shadow-btn: 0 0 20px currentColor, 0 0 40px currentColor;
  --shadow-card: 0 0 30px rgba(0,255,65,0.2);
}
```

### Estilo de botones de menú
- Forma: hexágono o polígono con `clip-path`
- Borde: `1px solid` color neón
- Fondo: semi-transparente oscuro
- Efecto glitch en hover: animación que mueve RGB

### Fondo
- Negro puro con circuitos SVG tenues (opacidad 0.06)
- Scanlines horizontales sutiles
- Partículas tipo lluvia matrix opcionales

### Tipografía
- `font-family: 'Share Tech Mono', 'Courier New', monospace`
- `font-weight: 400-700`
- `text-transform: uppercase`
- `letter-spacing: 0.1em`

---

## 📐 Componentes compartidos con variantes de tier

### Barras de progreso de misiones

```css
/* Tier 1 */
body.age-tier-1 .mission-bar-fill {
  background: linear-gradient(90deg, #A5D6A7, #FFD54F);
  border-radius: 10px;
}

/* Tier 2 */
body.age-tier-2 .mission-bar-fill {
  background: linear-gradient(90deg, #22d3ee, #7c3aed);
  box-shadow: 0 0 8px #22d3ee;
}

/* Tier 3 */
body.age-tier-3 .mission-bar-fill {
  background: linear-gradient(90deg, #00ff41, #00ffff);
  box-shadow: 0 0 10px #00ff41;
  /* Añadir scanlines con pseudo-elemento */
}
```

### Tarjetas de misión

```css
/* Tier 1 */
body.age-tier-1 .mission-card {
  background: rgba(255,255,255,0.7);
  border-radius: 20px;
  border: none;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

/* Tier 2 */
body.age-tier-2 .mission-card {
  background: rgba(255,255,255,0.05);
  border-radius: 12px;
  border: 1px solid rgba(124,58,237,0.4);
  box-shadow: 0 0 15px rgba(124,58,237,0.2);
}

/* Tier 3 */
body.age-tier-3 .mission-card {
  background: rgba(0,255,65,0.03);
  border-radius: 4px;
  border: 1px solid rgba(0,255,65,0.3);
  clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 0 100%);
}
```

---

## 🎯 Diseños Target (imágenes de referencia)

Estos son los tres diseños exactos a los que debe llegar el sistema:

@Referencias Visuales/tier 1.jpg
@Referencias Visuales/tier 2.jpg  
@Referencias Visuales/tier 3.jpg

--

## 🤝 Protocolo con el Agente Gráfico

Cuando necesites un asset visual, envía al Agente Gráfico:

1. **El tier específico** (Clay / Retrowave / Cyberpunk o los 3)
2. **El componente** que necesita el asset (fondo, botón, mascota, icono, badge)
3. **Las dimensiones** requeridas
4. **El contexto** donde se insertará

### Formato de solicitud al Agente Gráfico:
```
@Agente Gráfico necesito:
- Tier: [1/2/3/todos]
- Componente: [nombre]
- Dimensiones: [WxH o responsive]
- Inserción: [dónde va en el HTML]
- Referencia visual: [descripción del efecto deseado]
```

---

## 🚫 Reglas de NO mezcla

- NO uses verde matrix en Tier 1
- NO uses clay/pastel en Tier 3
- NO uses hexágonos en Tier 1
- NO uses nubes en Tier 2 o 3
- NO uses colores oscuros como fondo en Tier 1
- Cada tier debe verse como un juego completamente diferente

---

## 📋 Checklist antes de entregar CSS

- [ ] ¿Tiene selector `.age-tier-X` como padre?
- [ ] ¿Funciona en los 3 tiers (o está correctamente aislado al tier que corresponde)?
- [ ] ¿Los colores vienen de variables CSS (`var(--nombre)`)?
- [ ] ¿Hay versión mobile (max-width: 480px)?
- [ ] ¿Las animaciones respetan `prefers-reduced-motion`?
