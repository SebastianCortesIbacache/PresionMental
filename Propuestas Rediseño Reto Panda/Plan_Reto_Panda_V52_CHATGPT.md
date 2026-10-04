# PLAN DE TRABAJO — RETO PANDA V52
## Rediseño de la pantalla de inicio y evolución visual del universo Mochi

> **Objetivo:** transformar la aplicación actual desde una app educativa con gamificación hacia un videojuego educativo infantil moderno, manteniendo la lógica y los sistemas que ya funcionan y rediseñando progresivamente la experiencia visual.

---

# 1. OBJETIVO GENERAL

La pantalla de inicio debe comunicar en menos de 3 segundos:

1. **Quién soy**
2. **Quién es Mochi**
3. **Qué puedo hacer ahora**
4. **Cuánto he progresado**
5. **Qué misión tengo pendiente**

La Home debe ser limpia, amigable y visualmente atractiva, sin sentirse saturada.

La idea central será:

> **Mochi + dos acciones principales + una misión del día + progreso visible.**

La aplicación debe sentirse como un **mundo de aventura**, no como una colección de ejercicios.

---

# 2. PRINCIPIO FUNDAMENTAL

## De "aplicación educativa" a "videojuego educativo"

La lógica existente se conserva:

- Mundos
- Juego libre
- Tienda
- Destrezas
- Logros
- Misiones
- Estrellas
- XP
- Niveles
- Rachas
- Recompensas

Lo que cambia es la forma en que el niño interactúa con ellos.

### Nueva jerarquía

```text
UNIVERSO
    ↓
AVENTURA
    ↓
MOCHI
    ↓
DESAFÍOS
    ↓
PROGRESO
    ↓
RECOMPENSAS
```

---

# 3. ESTRUCTURA FINAL DE LA HOME

La pantalla de inicio tendrá cinco zonas principales:

```text
┌──────────────────────────────┐
│ PERFIL          ⭐     ⚙️    │
│ Mochi                         │
├──────────────────────────────┤
│                              │
│       ¿Qué jugamos hoy?      │
│                              │
│             🐼               │
│          MOCHI               │
│                              │
├──────────────────────────────┤
│                              │
│     🌎 MUNDOS  🎮 JUEGO      │
│                              │
│              LIBRE            │
├──────────────────────────────┤
│                              │
│       🎯 MISIÓN DE HOY       │
│                              │
│  Matemáticas     ███░░ 2/5   │
│  Estrellas       ████░ 8/20  │
│                              │
└──────────────────────────────┘
```

## Regla principal

En la Home solamente habrá:

- Perfil
- Estrellas
- Ajustes
- Mochi
- Mundos
- Juego Libre
- Misión de hoy

Las funciones secundarias no desaparecen: se agrupan dentro de otras secciones.

---

# 4. ARQUITECTURA DE NAVEGACIÓN

## Home

### 🌎 Mundos

Dentro:

- Isla Matemática
- Laboratorio de Lógica
- Océano de Palabras
- Bosque de Destrezas
- Planeta Desafío

### 🎮 Juego Libre

Dentro:

- Matemáticas
- Lógica
- Lenguaje
- Mixto / Sorpresa

### 🛍️ Tienda

Accesible desde el perfil o la sección de colección.

### 🏆 Logros

Accesible desde el perfil.

### 🧠 Destrezas

Accesible desde el perfil.

### 🗺️ Misiones

La misión activa aparece directamente en Home.

Al tocarla se abre la sección de Aventuras/Misiones.

### ⚙️ Ajustes

Icono superior.

---

# 5. FASE 0 — RESPALDO DE V51

Antes de modificar cualquier cosa:

```text
PresionMental/
│
├── v51_modular.html
├── v52_home.html
└── backup/
    └── v51_original/
```

## Regla

La V51 debe quedar intacta.

La V52 será el laboratorio de desarrollo.

Si algo se rompe, se debe poder volver inmediatamente a V51.

---

# 6. FASE 1 — AUDITORÍA DEL CÓDIGO ACTUAL

Antes de construir la nueva interfaz, identificar exactamente cómo funciona V51.

## 6.1 Estado del jugador

Localizar:

- nombre
- edad
- nivel
- XP
- XP necesario para el siguiente nivel
- estrellas
- racha
- progreso
- destrezas
- logros
- inventario

## 6.2 Navegación

Identificar cómo se abren actualmente:

- Mundos
- Juego Libre
- Tienda
- Destrezas
- Logros
- Misiones
- Ajustes

## 6.3 Persistencia

Determinar dónde se guarda el progreso:

- `localStorage`
- variables globales
- objetos de estado
- otro sistema

No duplicar sistemas existentes.

## 6.4 Mochi

Localizar:

- imagen/personaje
- estados
- animaciones
- mensajes
- ubicación
- lógica asociada

## 6.5 Misiones

Localizar:

- misión diaria
- misión semanal
- misión mensual
- progreso
- recompensas

---

# 7. FASE 2 — DESIGN SYSTEM

Antes de rediseñar todas las pantallas, crear las reglas visuales.

## 7.1 Dirección artística

Combinar:

### De la referencia entregada

- fondo claro
- botones grandes
- formas redondeadas
- bordes oscuros
- sombras marcadas
- pocos elementos
- composición limpia
- estética infantil moderna

### De la propuesta anterior

- mundo fantástico
- profundidad
- elementos 3D/2.5D
- islas flotantes
- ambientación
- Mochi como protagonista
- sensación de aventura
- progreso y recompensas

### Resultado buscado

> **Diseño limpio + universo de aventura + personaje protagonista.**

---

# 8. PALETA BASE

Propuesta inicial:

```css
--cream: #FFF7E8;
--cream-dark: #F3E6CF;

--blue-sky: #8ED8F5;
--blue-dark: #183A67;

--green: #39A85D;
--green-dark: #24733F;

--orange: #FF8A2A;
--orange-dark: #C95D12;

--purple: #9163E8;

--yellow: #FFD447;

--white: #FFFFFF;

--text: #253044;
```

## Uso

- Verde → Mundos
- Naranja → Juego Libre
- Morado → Logros
- Azul → información/progreso
- Amarillo → estrellas/recompensas
- Crema → fondos
- Azul oscuro → texto y contornos

No utilizar todos los colores simultáneamente.

---

# 9. TIPOGRAFÍA

Utilizar máximo dos familias tipográficas.

## Tipografía de títulos

Debe ser:

- redondeada
- gruesa
- amigable
- con personalidad
- estilo videojuego infantil

## Tipografía de contenido

Debe ser:

- limpia
- legible
- clara
- adecuada para móvil

---

# 10. ICONOGRAFÍA

Los emojis pueden mantenerse durante el prototipado, pero la versión final debe utilizar iconos propios.

Crear:

- icono de mundos
- icono de juego
- icono de tienda
- icono de logros
- icono de destrezas
- icono de misiones
- icono de ajustes
- estrella
- racha
- XP
- cofre
- recompensas

La iconografía debe pertenecer al universo de Mochi.

---

# 11. SISTEMA DE BOTONES

La Home tendrá solamente dos CTA principales.

## MUNDOS

Color verde.

Características:

- borde oscuro
- sombra inferior
- esquinas redondeadas
- icono grande
- texto blanco
- animación al tocar

## JUEGO LIBRE

Color naranja.

Mismas características.

### Regla

No crear más botones principales en la Home.

---

# 12. FASE 3 — CABECERA

La cabecera debe ser compacta.

## Izquierda

Avatar circular de Mochi.

Texto:

```text
¡Hola, Sofía!

8 años · Exploradora
```

Debajo:

```text
Nivel 12
████████░░
320 / 600 XP
```

## Derecha

```text
⭐ 128
⚙️
```

La información secundaria queda fuera de la Home.

---

# 13. PERFIL

Al tocar el perfil:

```text
MI PERFIL

🐼 Mochi

Nivel 12
320 / 600 XP

⭐ 128 estrellas
🔥 7 días

🧠 Mis poderes
🏆 Mis trofeos
🛍️ Mi colección
📊 Mi progreso
```

Esto permite sacar de la Home:

- Logros
- Destrezas
- Tienda
- Estadísticas avanzadas

---

# 14. ESTRELLAS

En la cabecera:

```text
⭐ 128
```

Debe ser pequeño y claro.

Al tocar:

```text
Tus estrellas
128 ⭐

Próxima recompensa:
200 ⭐
```

Las estrellas deben tener animación cuando se ganan.

---

# 15. AJUSTES

Icono superior:

```text
⚙️
```

Dentro:

- sonido
- música
- accesibilidad
- idioma
- información
- reiniciar progreso

No mostrar estas opciones directamente en Home.

---

# 16. FASE 4 — ESCENA CENTRAL

La escena central será la principal diferencia visual.

Debe sentirse como una pequeña escena de videojuego.

Ejemplo conceptual:

```text
       ☁️               ☁️

  🏔️             🏡

          💬
    ¿Qué jugamos
        hoy?

           🐼

        🌿🌿🌿
```

El fondo debe tener profundidad, pero no competir con Mochi.

---

# 17. MOCHI COMO PROTAGONISTA

Mochi debe ocupar aproximadamente el 25–30% de la altura útil de la pantalla.

Debe ser claramente el personaje principal.

No debe parecer un simple elemento decorativo.

---

# 18. ANIMACIÓN DE MOCHI

Estado normal:

```text
respirar
↓
pequeño movimiento
↓
parpadear
↓
mirar alrededor
↓
volver a idle
```

Acciones ocasionales:

- saludar
- mover la mano
- mirar hacia Mundos
- mirar hacia Juego Libre
- reaccionar a recompensas

No utilizar animaciones excesivamente constantes.

---

# 19. BURBUJA DE MOCHI

La frase principal:

> **¿Qué jugamos hoy?**

Debe poder cambiar según el contexto.

## Entrada

> ¡Hola! 👋

## Normal

> ¿Qué jugamos hoy?

## Hay misión

> ¡Tenemos una misión!

## Regreso

> ¡Te estaba esperando!

## Nivel nuevo

> ¡Subiste de nivel!

La burbuja debe reforzar la sensación de que Mochi es un compañero.

---

# 20. FASE 5 — BOTONES PRINCIPALES

Ubicación debajo de Mochi:

```text
┌────────────┐ ┌────────────┐
│     🌎     │ │     🎮     │
│            │ │            │
│   MUNDOS   │ │ JUEGO      │
│            │ │ LIBRE      │
└────────────┘ └────────────┘
```

Estos serán los únicos CTA principales de la Home.

---

# 21. MUNDOS

Al pulsar:

> **MAPA DE MOCHI**

La Home no necesita mostrar todos los mundos.

El botón comunica simplemente:

> Explorar.

---

# 22. JUEGO LIBRE

Al pulsar:

> **¿QUÉ QUIERES JUGAR?**

Opciones:

- 🧮 Matemáticas
- 🧩 Lógica
- 📚 Lenguaje
- 🎲 Sorpresa

La Home no muestra estas opciones directamente.

---

# 23. FASE 6 — MISIÓN DE HOY

La Home mostrará solamente una tarjeta secundaria.

Título:

> 🎯 **MISIÓN DE HOY**

No mostrar directamente:

- todas las misiones
- misión semanal completa
- misión mensual completa

Solo el progreso relevante.

---

# 24. CONTENIDO DE LA MISIÓN

Mostrar como máximo dos objetivos:

```text
🎯 MISIÓN DE HOY

Completa 5 desafíos
████░░ 2/5

Consigue 20 estrellas
████░░ 8/20

🎁
```

Al completar todo:

> 🎉 ¡Misión completada!

---

# 25. AVENTURAS / MISIONES COMPLETAS

Al tocar la tarjeta:

```text
AVENTURAS

HOY
ESTA SEMANA
ESTE MES
```

El sistema actual de misiones se conserva.

Solo cambia su presentación.

---

# 26. FASE 7 — MICROINTERACCIONES

## Botones

Al tocar:

```css
transform: scale(0.96);
```

Después vuelve suavemente a su posición.

## Estrellas

Secuencia:

```text
estrella
↓
rebote
↓
vuelo
↓
contador
```

## XP

La barra se llena progresivamente.

## Misión

Al completar:

```text
✓
```

y aparece:

```text
🎁
```

---

# 27. FASE 8 — TRANSICIONES

Evitar cambios bruscos entre pantallas.

## Home → Mundos

Mochi corre o se desplaza hacia la nueva escena.

## Home → Juego

Mochi salta.

## Home → Tienda

Pequeño efecto de monedas.

## Home → Perfil

La tarjeta de perfil se expande.

Las transiciones deben ser cortas y ligeras.

---

# 28. FASE 9 — RESPONSIVE DESIGN

Diseñar primero para:

### 390 × 844

Después adaptar:

- 375 × 812
- 414 × 896
- tablets
- desktop

## Móvil

Orden:

```text
HEADER
↓
MOCHI
↓
BOTONES
↓
MISIÓN
```

La Home debería caber prácticamente en una pantalla.

## Desktop

No simplemente ampliar los elementos.

Crear una composición centrada con suficiente espacio alrededor.

---

# 29. FASE 10 — ARQUITECTURA TÉCNICA

Si la V51 está suficientemente acoplada, comenzar progresivamente a separar:

```text
PresionMental/
│
├── index.html
│
├── css/
│   ├── variables.css
│   ├── base.css
│   ├── components.css
│   ├── home.css
│   ├── worlds.css
│   ├── game.css
│   ├── profile.css
│   └── animations.css
│
├── js/
│   ├── app.js
│   ├── state.js
│   ├── storage.js
│   ├── mochi.js
│   ├── home.js
│   ├── worlds.js
│   ├── game.js
│   ├── missions.js
│   ├── shop.js
│   └── achievements.js
│
└── assets/
    ├── mochi/
    ├── backgrounds/
    ├── icons/
    ├── worlds/
    ├── sounds/
    └── ui/
```

No es obligatorio migrar todo de una sola vez.

---

# 30. CONTROLADOR DE MOCHI

Crear un sistema centralizado:

```javascript
MochiController
```

Estados:

```text
idle
happy
thinking
correct
wrong
celebrate
levelUp
shopping
missionComplete
```

Ejemplo conceptual:

```javascript
Mochi.setState("correct");
```

Todas las pantallas deben utilizar el mismo sistema.

---

# 31. MODELO DE DATOS

No duplicar el sistema de V51.

La estructura conceptual puede ser:

```javascript
player = {
    name: "Sofía",
    age: 8,
    level: 12,
    xp: 320,
    xpNext: 600,
    stars: 128,
    streak: 7,

    skills: {
        math: 80,
        logic: 60,
        language: 50
    },

    missions: {
        today: {},
        weekly: {},
        monthly: {}
    },

    inventory: {
        accessories: [],
        pets: [],
        powerups: []
    },

    achievements: []
}
```

La implementación final debe respetar el modelo que ya utiliza V51.

---

# 32. FASE 11 — MAPA DE MUNDOS

Una vez terminada la Home:

Crear el mapa visual.

Mundos iniciales:

### 🌴 Isla Matemática

### 🧩 Laboratorio de Lógica

### 🌊 Océano de Palabras

### 🌲 Bosque de Destrezas

### 🚀 Planeta Desafío

Cada mundo tendrá:

- colores
- decoración
- niveles
- caminos
- desbloqueos
- recompensas

El mapa debe reutilizar el Design System de Home.

---

# 33. FASE 12 — JUEGO LIBRE

Rediseñar:

```text
JUEGO LIBRE

🧮 Matemáticas

🧩 Lógica

📚 Lenguaje

🎲 Sorpresa
```

Primero elegir.

Después jugar.

No saturar la selección con estadísticas.

---

# 34. FASE 13 — PANTALLA DE DESAFÍO

Estructura:

```text
←
⭐ 128
🔥 7

        🐼

    ¿Cuánto es?

       7 + 5

┌─────────┐ ┌─────────┐
│   11    │ │   12    │
└─────────┘ └─────────┘
```

Debe existir mucho espacio visual.

---

# 35. RESPUESTA CORRECTA

Secuencia:

1. respuesta se ilumina
2. Mochi reacciona
3. partículas
4. estrella vuela al contador
5. aparece `+2 ⭐`
6. sonido
7. siguiente desafío

Mensaje:

> **¡EXCELENTE!**

---

# 36. RESPUESTA INCORRECTA

Evitar castigo visual fuerte.

Mochi puede decir:

> ¡Casi!

o:

> ¡Vamos otra vez!

Puede aparecer una pequeña pista.

La idea:

> **Equivocarse forma parte del aprendizaje.**

---

# 37. FASE 14 — TIENDA

Transformar la tienda en:

> **TIENDA DE MOCHI**

Mantener categorías:

- Mascotas
- Accesorios
- Comodines

Pero convertirlas en objetos visuales.

## Mascotas

Animales que acompañan a Mochi.

## Accesorios

- gorros
- lentes
- mochilas
- ropa
- disfraces

## Comodines

Objetos especiales que ayudan durante los desafíos.

---

# 38. PERSONALIZACIÓN

Los objetos comprados deben aparecer físicamente en Mochi.

Ejemplo:

Compra:

> 🎩 Sombrero pirata

Resultado:

> Mochi aparece con el sombrero.

La recompensa debe ser visual e inmediata.

---

# 39. FASE 15 — MIS PODERES

Cambiar "Destrezas" por una presentación más cercana a un RPG.

```text
🧠 MIS PODERES

       🧠

   🧮      🧩
Matemática Lógica

   📚      🚀
Lenguaje  Desafío
```

Las habilidades pueden subir de nivel.

---

# 40. ESTADÍSTICAS

Mostrar:

```text
🧮 Matemáticas
████████░░ 80%

🧩 Lógica
██████░░░░ 60%

📚 Lenguaje
█████░░░░░ 50%
```

La estética debe parecer de personaje, no de informe escolar.

---

# 41. FASE 16 — TROFEOS

Convertir "Logros" en:

> 🏆 **MIS TROFEOS**

Ejemplo:

```text
⭐ Primer desafío
🔒 Maestro de Matemáticas
🔒 Explorador
⭐ Racha de 7 días
🔒 100 desafíos
```

Los trofeos deben ser coleccionables visualmente.

---

# 42. FASE 17 — AVENTURAS

Las misiones semanales y mensuales actuales se convierten en aventuras.

Ejemplo:

> 🗺️ **EL VIAJE DE MOCHI**

Objetivos:

- completar desafíos
- conseguir estrellas
- mantener una racha
- superar mundos

Recompensa:

> 🎁 Cofre dorado

---

# 43. SISTEMA DE COFRES

Puede conectar toda la gamificación.

Tipos:

- 🥉 Cofre común
- 🥈 Cofre especial
- 🥇 Cofre dorado
- 🌈 Cofre legendario

Contenido:

- estrellas
- accesorios
- mascotas
- comodines
- trofeos
- elementos decorativos

---

# 44. FASE 18 — SONIDO

Primera versión:

1. click
2. correcto
3. incorrecto
4. recompensa
5. nivel nuevo

Después:

- música de Home
- música de mundos
- música de desafío

Mantener control:

```text
🔊 Sonido ON/OFF
🎵 Música ON/OFF
```

---

# 45. FASE 19 — ACCESIBILIDAD

Incluir:

- botones grandes
- textos legibles
- contraste suficiente
- opción de desactivar animaciones
- control de sonido
- feedback visual + sonoro
- navegación sencilla
- no depender exclusivamente del color

---

# 46. FASE 20 — RENDIMIENTO

Optimizar:

## Imágenes

Preferir WebP/AVIF cuando sea conveniente.

## Animaciones

Priorizar:

```css
transform
opacity
```

sobre animar constantemente:

```css
top
left
width
height
```

## Assets

No utilizar imágenes innecesariamente grandes.

## PWA

Comprobar:

- tiempo de carga
- memoria
- fluidez
- comportamiento offline si corresponde

---

# 47. ORDEN REAL DE IMPLEMENTACIÓN

## BLOQUE 1 — PREPARACIÓN

- [ ] Backup V51
- [ ] Crear V52
- [ ] Auditar código
- [ ] Identificar estado actual
- [ ] Identificar navegación
- [ ] Identificar persistencia
- [ ] Identificar sistema de Mochi

## BLOQUE 2 — SISTEMA VISUAL

- [ ] Variables CSS
- [ ] Tipografía
- [ ] Colores
- [ ] Sombras
- [ ] Bordes
- [ ] Botones
- [ ] Tarjetas
- [ ] Iconos

## BLOQUE 3 — HOME

- [ ] Header
- [ ] Perfil
- [ ] Estrellas
- [ ] Mochi
- [ ] Burbuja
- [ ] Fondo
- [ ] Mundos
- [ ] Juego Libre
- [ ] Misión

## BLOQUE 4 — ANIMACIÓN

- [ ] Mochi idle
- [ ] Interacción
- [ ] Botones
- [ ] Estrellas
- [ ] XP
- [ ] Misión
- [ ] Transiciones

## BLOQUE 5 — INTEGRACIÓN

- [ ] Mundos
- [ ] Juego Libre
- [ ] Perfil
- [ ] Misiones
- [ ] Estrellas
- [ ] XP
- [ ] Ajustes

## BLOQUE 6 — RESTO DE LA APP

- [ ] Mapa
- [ ] Juego Libre
- [ ] Juego
- [ ] Perfil
- [ ] Tienda
- [ ] Poderes
- [ ] Trofeos
- [ ] Aventuras

## BLOQUE 7 — PULIDO

- [ ] Sonido
- [ ] Accesibilidad
- [ ] Responsive
- [ ] Optimización
- [ ] Pruebas
- [ ] Corrección de bugs
- [ ] Publicación V52

---

# 48. CRITERIOS PARA DAR POR TERMINADA LA HOME

## Visual

- [ ] Mochi es protagonista.
- [ ] La pantalla no se siente saturada.
- [ ] Solo existen dos CTA principales.
- [ ] La misión es secundaria.
- [ ] El perfil está claramente separado.
- [ ] Los colores tienen significado.
- [ ] La tipografía es consistente.
- [ ] No dependemos de emojis para la identidad final.
- [ ] Existe profundidad visual.
- [ ] Existe jerarquía clara.

## UX

- [ ] El niño entiende qué hacer inmediatamente.
- [ ] Mundos es fácil de encontrar.
- [ ] Juego Libre es fácil de encontrar.
- [ ] El progreso es visible.
- [ ] La misión es comprensible.
- [ ] El perfil no invade la Home.
- [ ] Los menús secundarios no abruman.

## Técnico

- [ ] Mantiene el progreso de V51.
- [ ] No rompe `localStorage`.
- [ ] Funciona en móvil.
- [ ] Funciona en desktop.
- [ ] Las imágenes cargan rápidamente.
- [ ] Las animaciones son fluidas.
- [ ] Se puede utilizar sin sonido.
- [ ] No hay errores de consola.

---

# 49. REGLA DE ORO DEL REDISEÑO

Cada elemento de Home debe responder:

> **¿Esto ayuda al niño a decidir qué hacer ahora?**

Si la respuesta es "no", probablemente debe salir de Home.

## Sí

- ⭐ Estrellas
- ⚙️ Ajustes
- 🐼 Mochi
- 🌎 Mundos
- 🎮 Juego Libre
- 🎯 Misión

## No

- Lista completa de logros
- Lista completa de destrezas
- Lista completa de tienda
- Estadísticas avanzadas
- Todas las misiones
- Menús secundarios

---

# 50. HOME OBJETIVO

La composición conceptual final:

```text
                  ☁️       ☁️

  🐼 ¡Hola!                       ⭐128
     Sofía                         ⚙️
     8 años · Exploradora
     Nivel 12
     ███████░░░

                    ☁️

             💬
       ¿Qué jugamos hoy?

                  🐼
                /│\
               / │ \
              🌿🌿🌿

       ┌───────────┐ ┌───────────┐
       │    🌎     │ │    🎮     │
       │   MUNDOS  │ │ JUEGO     │
       │           │ │ LIBRE     │
       └───────────┘ └───────────┘


       🎯 MISIÓN DE HOY

       Completa 5 desafíos
       █████░░░░ 2/5

       Consigue 20 estrellas
       ████░░░░░ 8/20

                     🎁
```

---

# 51. PRIORIDADES

## Prioridad máxima

1. Mochi
2. Home
3. Sistema visual
4. Mapa
5. Pantalla de desafío

## Prioridad alta

6. Tienda
7. Mis Poderes
8. Aventuras
9. Trofeos
10. Cofres

## Prioridad media

11. Sonidos
12. Animaciones adicionales
13. Personalización avanzada
14. Adaptación por edades
15. Estadísticas avanzadas

---

# 52. QUÉ NO HACER TODAVÍA

No agregar todavía:

- chat
- multiplayer
- rankings públicos
- redes sociales
- demasiadas monedas
- cientos de objetos
- demasiadas notificaciones
- sistemas complejos que no mejoren el núcleo

Primero:

> **hacer excelente la experiencia principal.**

---

# 53. RESULTADO ESPERADO

La evolución será:

```text
V51
APP EDUCATIVA
+
GAMIFICACIÓN

        ↓

V52
APP EDUCATIVA
+
GAMIFICACIÓN
+
IDENTIDAD VISUAL
+
UNIVERSO MOCHI

        ↓

FUTURA V70
VIDEOJUEGO EDUCATIVO
+
UNIVERSO MOCHI
+
PROGRESIÓN
+
PERSONALIZACIÓN
+
AVENTURA
```

---

# 54. SIGUIENTE PASO CONCRETO

El siguiente paso no es seguir agregando funcionalidades.

Es tomar la V51 y hacer una **auditoría técnica exacta** para localizar:

- `player`
- `localStorage`
- navegación
- estrellas
- XP
- misiones
- rachas
- Mochi
- sistema de pantallas
- componentes reutilizables

Después construir:

> **Home V52**

sin romper ningún sistema existente.

## Orden inmediato

```text
1. Backup V51
        ↓
2. Auditoría técnica
        ↓
3. Design System
        ↓
4. Home V52
        ↓
5. Conectar datos reales
        ↓
6. Animaciones
        ↓
7. Pruebas móvil/desktop
        ↓
8. Mapa
        ↓
9. Juego
        ↓
10. Resto de módulos
```

---

# 55. META FINAL

No queremos simplemente que V51 se vea "más bonita".

Queremos que exista una identidad reconocible:

> **"Eso es Mochi."**

La pantalla de inicio debe sentirse como una **escena viva** desde la cual comienza toda la aventura.

### Fórmula visual final

**Diseño limpio de la referencia**

+

**riqueza visual del universo de aventura**

+

**Mochi como personaje**

+

**progresión de videojuego**

=

# RETO PANDA V52
## El mundo de Mochi
