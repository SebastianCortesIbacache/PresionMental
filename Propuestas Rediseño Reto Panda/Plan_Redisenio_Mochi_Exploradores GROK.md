# Plan de Trabajo Completo  
## Rediseño de Mochi → “Aventura de Mochi en las Islas Flotantes”

**Objetivo:** Transformar la app actual en una experiencia luminosa, simple, colorida y motivadora para niños/as de 6 a 8 años, manteniendo la temática de Exploradores y un panda niño como compañero.

**Referencia visual principal:** El mockup de Home con islas flotantes, panda niño con hoodie azul y mochila amarilla, dos botones grandes (Mundos + Juego libre) y “Misión de hoy”.

---

## 1. Visión del Producto

### Principios de diseño (no negociables)
- **Simple:** Máximo 2-3 acciones principales por pantalla.
- **Luminoso:** Fondos claros, cielo azul, colores vivos pero no saturados en exceso.
- **Panda niño:** Expresión alegre, ropa de explorador ligera (hoodie + mochila pequeña), nunca aspecto adulto.
- **Progreso visible pero no abrumador:** Estrellas, XP y misiones diarias claras.
- **Sensación de “estoy creciendo”:** Lenguaje de explorador, rangos, islas por descubrir… sin sonar a jardín infantil.

### Público objetivo
Niños/as de 6 a 8 años que ya no quieren sentirse “guaguas”, pero todavía necesitan interfaces muy claras, botones grandes y feedback inmediato.

---

## 2. Sistema de Diseño

### 2.1 Paleta de colores

| Nombre              | Hex       | Uso principal                          |
|---------------------|-----------|----------------------------------------|
| Cielo               | `#E8F4FF` | Fondos principales                     |
| Teal principal      | `#2EC4B6` | Botones secundarios, acentos           |
| Naranja energético  | `#FF9F1C` | Botón primario, estrellas, recompensas |
| Verde mundo         | `#2ECC71` | Botón Mundos, progreso positivo        |
| Amarillo estrella   | `#FFD166` | Estrellas, XP, highlights              |
| Azul hoodie         | `#3A86FF` | Ropa del panda, elementos de marca     |
| Texto principal     | `#1E3A5F` | Títulos y textos importantes           |
| Texto secundario    | `#5C6B7A` | Subtítulos, descripciones              |
| Blanco tarjeta      | `#FFFFFF` | Cards y botones                        |
| Sombra suave        | `rgba(30,58,95,0.12)` | Sombras de profundidad          |

### 2.2 Tipografía
- **Títulos:** Rounded Bold (o Nunito Black / Poppins Black)
- **Cuerpo:** Rounded Medium (Nunito / Poppins)
- Tamaños mínimos recomendados:
  - Título grande: 28-32 px
  - Botones: 20-22 px
  - Texto de misión: 16-18 px
  - Labels pequeños: 14 px

### 2.3 Componentes base
1. **Botón primario grande** (naranja, esquinas 24px, sombra suave)
2. **Botón secundario** (verde o teal)
3. **Card de misión** (fondo blanco, borde suave, icono + barra de progreso + recompensa)
4. **Avatar circular** del panda + badge de nivel
5. **Barra de XP** horizontal con estrella
6. **Speech bubble** del panda
7. **Iconos 3D / soft-3D** consistentes (montañas, control, brújula, cofre…)

### 2.4 Personaje – Mochi Niño
- Edad visual: 7-8 años
- Expresión: sonrisa abierta, ojos grandes y alegres
- Atuendo fijo: hoodie azul con logo de montaña, mochila amarilla
- Variaciones: saludando, pensando, celebrando, un poco cansado
- Nunca usar versión adulta o con equipo táctico pesado

---

## 3. Arquitectura de Pantallas (prioridad)

### Fase 1 – Núcleo (imprescindible)
1. **Pantalla de bienvenida / Login**
2. **Home (la que está en el mockup)**
3. **Mapa de Mundos / Islas Flotantes**
4. **Pantalla de desafío / pregunta**
5. **Pantalla de resultado** (éxito / fallo suave)

### Fase 2 – Secundarias
6. Juego libre
7. Misión de hoy (detalle)
8. Logros / Colección
9. Ajustes
10. Tienda (si se mantiene)

---

## 4. Desglose detallado de las pantallas prioritarias

### 4.1 Home (pantalla de referencia)
**Elementos obligatorios:**
- Header: Avatar + saludo personalizado + edad + rango “Exploradora/Explorador” + barra XP + estrellas + engranaje
- Personaje central: Mochi niño saludando + speech bubble “¿Qué jugamos hoy?”
- Fondo: Islas flotantes luminosas (cielo azul, cascadas, casas)
- Dos botones grandes lado a lado:
  - **Mundos** (verde)
  - **Juego libre** (naranja)
- Card inferior “Misión de hoy” con:
  - 2 misiones máximo
  - Barras de progreso
  - Cofre de recompensa

**Reglas de simplificación:**
- No más de 2 botones principales
- No mostrar lista larga de misiones semanales/mensuales
- Todo debe caber sin scroll en tablet y la mayoría de móviles

### 4.2 Mapa de Mundos
- Vista de islas flotantes conectadas
- Cada isla = un mundo (Naturaleza, Océano, Laboratorio, etc.)
- Nodos de nivel grandes y claros
- Nivel actual con brillo o anillo animado
- Progreso por isla visible (ej: 4/7)

### 4.3 Pantalla de desafío
- Header simple: vidas + estrellas + nivel
- Mochi niño al lado de la pregunta
- Pregunta en card grande y limpia
- 4 respuestas máximo, botones grandes y coloridos
- 1-2 comodines visibles (no más)

---

## 5. Assets necesarios

### Personaje
- [ ] Mochi niño – pose base (saludando)
- [ ] Mochi niño – pensando
- [ ] Mochi niño – celebrando
- [ ] Mochi niño – un poco triste / animando
- [ ] Avatar circular (versión pequeña)

### Fondos e ilustraciones
- [ ] Fondo Home – Islas Flotantes (día)
- [ ] Fondo Mapa de Mundos
- [ ] Fondos por mundo (Jungla, Océano, Laboratorio…)
- [ ] Elementos decorativos: cofre, brújula, cartel de madera, estrellas

### Iconos e UI
- [ ] Icono Mundos
- [ ] Icono Juego libre
- [ ] Icono Misión
- [ ] Iconos de comodines
- [ ] Estrella, XP, corazón/vidas

**Recomendación técnica de assets:**
- Formato WebP o PNG optimizado
- Versión @2x y @3x
- Mantener estilo soft-3D consistente con el mockup

---

## 6. Plan de implementación técnica

### Fase 0 – Preparación (1-2 días)
1. Crear rama `redesign-islas-flotantes`
2. Extraer y documentar el sistema de diseño (colores, tipografías, espaciados)
3. Crear archivo de tokens CSS / variables
4. Definir estructura de componentes reutilizables

### Fase 1 – Design System & Componentes (3-4 días)
1. Implementar variables CSS (colores, sombras, radios)
2. Crear componentes base:
   - ButtonPrimary / ButtonSecondary
   - CardMision
   - AvatarMochi
   - ProgressBar
   - SpeechBubble
3. Tipografía global

### Fase 2 – Home (3-5 días)
1. Maquetar header
2. Integrar personaje + speech bubble
3. Dos botones principales
4. Card “Misión de hoy”
5. Fondo de islas flotantes
6. Animaciones sutiles (flotación de islas, brillo de botones)

### Fase 3 – Navegación y Mapa de Mundos (4-6 días)
1. Nueva estructura de navegación (Home → Mundos → Nivel)
2. Pantalla de islas flotantes
3. Nodos de nivel interactivos
4. Transiciones suaves

### Fase 4 – Pantalla de desafío + Resultado (4-5 días)
1. Rediseñar layout de pregunta
2. Botones de respuesta grandes
3. Integración de Mochi niño
4. Feedback visual de acierto/error (confeti, animación de Mochi)
5. Pantalla de victoria simple y motivadora

### Fase 5 – Pulido y consistencia (3-4 días)
1. Revisar todas las pantallas restantes (Ajustes, Logros, etc.)
2. Unificar espaciados y sombras
3. Optimizar rendimiento de animaciones
4. Pruebas de accesibilidad (contraste, tamaño táctil)

### Fase 6 – Pruebas con niños (2-3 días)
1. Sesiones con 4-6 niños de 6 a 8 años
2. Observar:
   - ¿Entienden qué hacer en la Home sin ayuda?
   - ¿Los botones se ven claros?
   - ¿El panda se siente “de su edad”?
3. Ajustes finales según feedback

---

## 7. Criterios de éxito (Definition of Done)

- [ ] La Home se ve y se siente como el mockup de referencia
- [ ] El panda es claramente un niño (no adulto)
- [ ] Solo 2 acciones principales visibles en Home
- [ ] Fondos luminosos y coloridos
- [ ] Botones grandes (≥ 64px de alto en móvil)
- [ ] Tiempo de carga de assets optimizado
- [ ] Funciona bien en tablets y móviles
- [ ] Al menos 3 niños de prueba logran navegar sin ayuda adulta

---

## 8. Orden de prioridad recomendado

| Prioridad | Entregable                      | Esfuerzo estimado |
|-----------|---------------------------------|-------------------|
| P0        | Design System + Tokens          | 2 días            |
| P0        | Home completa                   | 4 días            |
| P0        | Pantalla de desafío             | 4 días            |
| P1        | Mapa de Mundos                  | 5 días            |
| P1        | Pantalla de resultado           | 2 días            |
| P2        | Juego libre + Logros            | 4 días            |
| P2        | Ajustes y tienda                | 3 días            |
| P3        | Animaciones avanzadas + sonido  | 3 días            |

**Total estimado núcleo (P0 + P1):** 15-18 días de trabajo enfocado.

---

## 9. Notas finales

- Mantener la lógica y el contenido pedagógico actual. Solo cambiamos la capa visual y la simplificación de UI.
- Evitar añadir más misiones, botones o paneles de los que muestra el mockup.
- El lenguaje debe seguir siendo motivador y de “explorador”, nunca infantilizado (“guagua”, “pequeñito”, etc.).
- Cada pantalla debe responder a la pregunta del niño: **“¿Qué tengo que hacer ahora?”** en menos de 2 segundos.

---

**Documento vivo.** Actualizar este plan a medida que se avancen las fases y se reciba feedback de pruebas con niños.
