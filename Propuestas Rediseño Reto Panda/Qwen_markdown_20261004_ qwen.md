# Plan de Trabajo: Migración de Reto Panda v51 al Nuevo Diseño (v52)

> **Proyecto:** PresionMental / Reto Panda
> **Origen:** `v51_modular.html` (GitHub Pages)
> **Destino:** Nuevo diseño con mascota 3D, islas flotantes y design system propio
> **Fecha:** [completar]
> **Versión del documento:** 1.0

---

## 📋 Resumen Ejecutivo

**Objetivo:** Reemplazar la interfaz de `v51_modular.html` con el nuevo diseño propuesto, manteniendo toda la funcionalidad existente y mejorando la experiencia visual y de uso.

**Alcance:** Home screen, mapa de mundos, HUD de juego, tienda, perfil, logros y reporte de padres.

**Plataforma:** GitHub Pages (HTML/CSS/JS vanilla)

**Decisión clave:** El nuevo diseño se adopta como *home screen* y como lenguaje visual oficial (design system) que se extiende al resto de pantallas. Ninguna función de v51 puede quedar sin acceso en v52.

---

## 🎯 Fase 0: Preparación y Análisis (3-5 días)

### Entregables
- Documento de gaps funcionales
- Inventario de componentes v51
- Mockups de alta fidelidad con estados
- Prototipo navegable en Figma

### Tareas Detalladas

#### 0.1 Auditoría Funcional v51
- [ ] **Mapeo de funcionalidades:**
  - Listar TODAS las pantallas existentes:
    - Home/Menú principal
    - Mundos (mapa de niveles)
    - Juego activo (HUD con corazones, estrellas, racha)
    - Tienda (mascotas, power-ups)
    - Destrezas (barras de progreso)
    - Logros/Insignias
    - Misiones diarias
    - Configuración/Perfil
    - Reporte de padres
  - Identificar dependencias entre pantallas
  - Documentar datos persistidos (localStorage): progreso, estrellas, perfil, logros

#### 0.2 Mapeo de funciones huérfanas (crítico)
El nuevo home solo muestra: Mundos, Juego libre, Misiones, Ajustes, monedas y perfil.
Definir dónde viven las funciones restantes:

| Función v51            | Nuevo punto de acceso sugerido              |
|------------------------|---------------------------------------------|
| Tienda (mascotas)      | Tap en píldora de estrellas ⭐ o en el cofre |
| Destrezas / reporte    | Tap en avatar → panel de perfil             |
| Logros / Insignias     | Tap en avatar → panel de perfil             |
| Reporte para padres    | Ajustes ⚙️ con parent-gate                  |
| Idioma ES/EN           | Ajustes ⚙️                                   |

- [ ] Validar que el botón "+" junto a estrellas NO implique compra de moneda (patrón confuso en apps infantiles). Reemplazar por acceso a tienda/historial.

#### 0.3 Análisis de Diseño
- [ ] **Extraer paleta exacta del mock:**

  ```
  Fondos:
  - Cielo: gradiente #E3F2FD → #BBDEFB
  - Crema: #FFF8E1 / #FBF3E4
  - Verde pasto: #4CAF50 / #66BB6A
  - Verde CTA "Mundos": #2FB877

  Acentos:
  - Naranja CTA "Juego libre": #F7A928 / #FF8F00
  - Amarillo estrellas: #FFD600
  - Rojo corazones: #E53935
  - Azul texto titular: #1D4E89

  Neutros:
  - Blanco: #FFFFFF
  - Grises: #9E9E9E, #616161, #212121
  ```

- [ ] **Tipografía:**
  - Fuente redondeada: Fredoka / Baloo 2 / Nunito (evaluar legibilidad infantil)
  - Escala tipográfica:
    - H1: 32px bold
    - H2: 24px semi-bold
    - Body: 16px regular
    - Small: 12px regular

- [ ] **Sistema de espaciado:**
  - Base: grid de 8px
  - Tokens: 4, 8, 16, 24, 32, 48, 64px

#### 0.4 Prototipado
- [ ] Crear en Figma:
  - Home screen con todos los estados (idle, pressed, disabled)
  - Transiciones entre pantallas
  - Animaciones del panda (idle, saludo, parpadeo)
  - Estados de cofre (bloqueado, disponible, completado)
  - Responsive: portrait (375px) y landscape (667px)

#### 0.5 Plan de Componentes
- [ ] Definir componentes reutilizables:
  - `Avatar` (perfil circular con borde)
  - `ProgressBar` (XP, misiones)
  - `CoinPill` (moneda + cantidad)
  - `MissionCard` (título + barra + recompensa)
  - `CTAButton` (primario, secundario, disabled)
  - `IslandCard` (mundo con isla flotante)
  - `HUDBar` (corazones, estrellas, racha)
  - `SpeechBubble` (globo de diálogo de la mascota)

---

## 🎨 Fase 1: Design System (5-7 días)

### Entregables
- `css/design-tokens.css`
- `css/components.css` con componentes base
- Documentación de uso (`DESIGN_SYSTEM.md`)

### Tareas Detalladas

#### 1.1 CSS Variables (Tokens)

```css
:root {
  /* Colores */
  --color-primary: #2FB877;
  --color-primary-light: #66BB6A;
  --color-primary-dark: #1F8A57;

  --color-accent: #F7A928;
  --color-accent-light: #FF8F00;
  --color-accent-dark: #D97E00;

  --color-star: #FFD600;
  --color-heart: #E53935;
  --color-info: #1D4E89;

  --color-bg-sky: #E3F2FD;
  --color-bg-cream: #FFF8E1;
  --color-bg-white: #FFFFFF;

  --color-text-primary: #212121;
  --color-text-secondary: #616161;
  --color-text-light: #9E9E9E;

  /* Espaciado */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;

  /* Radios */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --radius-xl: 32px;
  --radius-full: 9999px;

  /* Sombras */
  --shadow-sm: 0 2px 4px rgba(0,0,0,0.10);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.15);
  --shadow-lg: 0 8px 24px rgba(0,0,0,0.20);

  /* Transiciones */
  --transition-fast: 150ms ease;
  --transition-normal: 300ms ease;
  --transition-slow: 500ms ease;
}
```

#### 1.2 Tipografía y Base
- [ ] Cargar Google Fonts (Fredoka / Baloo 2) con `font-display: swap`
- [ ] Reset CSS (normalize.css o similar)
- [ ] Estilos base para body, headings, buttons

#### 1.3 Componentes Base
- [ ] **Avatar:** circular con borde blanco y sombra; estados normal/selected/disabled; tamaños 48/64/96px
- [ ] **ProgressBar:** fondo #E0E0E0 radio completo; fill con gradiente por contexto; texto "320 / 600 XP"; animación de llenado
- [ ] **CoinPill:** fondo blanco con sombra; icono ⭐; número bold; estado "earning" con animación +2⭐
- [ ] **MissionCard:** fondo blanco radio grande; icono/título; barra de progreso; recompensa; estados bloqueado/activo/completado
- [ ] **CTAButton:** altura mínima 56px (ideal 72-80px para niños); radio --radius-lg; variantes primary/secondary/ghost; estados default/hover/pressed/disabled/loading
- [ ] **SpeechBubble:** globo con cola apuntando a la mascota; animación de entrada; opcionalmente con audio (TTS)

#### 1.4 Animaciones
- [ ] Definir keyframes:

```css
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

@keyframes slideInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

- [ ] Soporte de `prefers-reduced-motion` para accesibilidad

---

## 🏗️ Fase 2: Implementación del Home Screen (7-10 días)

### Entregables
- `v52_home.html`
- `css/v52_home.css`
- `js/v52_home.js`

### Tareas Detalladas

#### 2.1 Estructura HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reto Panda - Inicio</title>
  <link rel="stylesheet" href="css/design-tokens.css">
  <link rel="stylesheet" href="css/components.css">
  <link rel="stylesheet" href="css/v52_home.css">
</head>
<body>
  <!-- Header: Perfil y Nivel -->
  <header class="home-header">
    <div class="profile-section">
      <button class="avatar-btn" id="profileBtn" aria-label="Abrir perfil">
        <img src="assets/avatar-sofia.png" alt="Avatar de Sofía">
      </button>
      <div class="profile-info">
        <h1>¡Hola, Sofía!</h1>
        <p>8 años · Exploradora</p>
      </div>
    </div>

    <div class="progress-section">
      <div class="level-badge" aria-label="Nivel 12">
        <span class="level-number">12</span>
      </div>
      <div class="xp-bar" role="progressbar" aria-valuemin="0" aria-valuemax="600" aria-valuenow="320">
        <div class="xp-bar-fill" style="width: 53%"></div>
        <span class="xp-text">320 / 600 XP</span>
      </div>
    </div>

    <div class="header-actions">
      <button class="coin-pill" id="coinPill" aria-label="128 estrellas. Abrir tienda">
        <span class="coin-icon">⭐</span>
        <span class="coin-amount">128</span>
      </button>
      <button class="settings-btn" id="settingsBtn" aria-label="Ajustes">
        <span class="settings-icon">⚙️</span>
      </button>
    </div>
  </header>

  <!-- Main Content -->
  <main class="home-main">
    <!-- Mascota con globo -->
    <section class="mascot-section">
      <img src="assets/panda-3d.webp" alt="Mochi el panda saludando" class="panda-hero">
      <div class="speech-bubble" id="speechBubble">
        <p>¿Qué jugamos hoy?</p>
      </div>
    </section>

    <!-- CTAs principales -->
    <section class="cta-section">
      <button class="cta-button cta-primary" id="worldsBtn">
        <span class="cta-icon">🗺️</span>
        <span class="cta-text">Mundos</span>
      </button>

      <button class="cta-button cta-secondary" id="freeplayBtn">
        <span class="cta-icon">🎮</span>
        <span class="cta-text">Juego libre</span>
      </button>
    </section>

    <!-- Misiones diarias -->
    <section class="missions-section" aria-labelledby="missionsTitle">
      <h2 id="missionsTitle">Misión de hoy</h2>
      <div class="missions-grid">
        <div class="mission-card">
          <div class="mission-header">
            <span class="mission-icon">🔢</span>
            <h3>Completa 5 desafíos de Matemáticas</h3>
          </div>
          <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="5" aria-valuenow="2">
            <div class="progress-bar-fill" style="width: 40%"></div>
            <span class="progress-text">2 / 5</span>
          </div>
        </div>

        <div class="mission-card">
          <div class="mission-header">
            <span class="mission-icon">⭐</span>
            <h3>Consigue 20 estrellas</h3>
          </div>
          <div class="progress-bar" role="progressbar" aria-valuemin="0" aria-valuemax="20" aria-valuenow="8">
            <div class="progress-bar-fill" style="width: 40%"></div>
            <span class="progress-text">8 / 20</span>
          </div>
        </div>
      </div>
      <button class="chest-btn" id="chestBtn" aria-label="Recompensa de misiones: bloqueada">
        <img src="assets/chest-locked.webp" alt="">
      </button>
    </section>
  </main>

  <!-- Modales -->
  <div class="modal" id="profileModal" role="dialog" aria-modal="true" aria-label="Perfil y destrezas" hidden>
    <div class="modal-content"><!-- Perfil, Destrezas, Logros --></div>
  </div>

  <script src="js/v52_home.js" defer></script>
</body>
</html>
```

#### 2.2 Estilos CSS
- [ ] **Layout principal:** Flexbox para header; Grid para misiones (2 columnas portrait, 3 landscape); altura 100dvh con scroll
- [ ] **Header:** fixed top; fondo gradiente cielo con blur; z-index 100; padding --spacing-lg
- [ ] **Mascota:** 200x200px portrait / 300x300px landscape; animación float 3s infinite; globo con slideInUp
- [ ] **CTAs:** grid 2 columnas; altura 80px; icono 32px; texto 20px bold; hover translateY(-2px) + shadow-lg; active translateY(0) + shadow-sm
- [ ] **Misiones:** card fondo blanco radio 20px padding 24px; barra 8px; hover scale(1.02)
- [ ] **Landscape:** hero a un lado, CTAs y misiones al otro (kids usan tablet horizontal)

#### 2.3 JavaScript

```javascript
class UserManager {
  constructor() {
    this.data = this.loadFromStorage() || this.getDefaultData();
  }

  getDefaultData() {
    return {
      profile: { name: 'Sofía', age: 8, title: 'Exploradora' },
      level: 12,
      xp: 320,
      xpToNext: 600,
      coins: 128,
      missions: [],
      lang: 'es'
    };
  }

  loadFromStorage() {
    const saved = localStorage.getItem('retopanda_user');
    return saved ? JSON.parse(saved) : null;
  }

  saveToStorage() {
    localStorage.setItem('retopanda_user', JSON.stringify(this.data));
  }
}

// Navegación
document.getElementById('worldsBtn').addEventListener('click', () => {
  window.location.href = 'v52_worlds.html';
});

document.getElementById('freeplayBtn').addEventListener('click', () => {
  window.location.href = 'v52_freeplay.html';
});
```

- [ ] Cargar y pintar misiones desde localStorage
- [ ] Manejar reclamo de recompensas (cofre: bloqueado → listo → abierto)
- [ ] Modales: abrir/cerrar con fade, click fuera y tecla ESC
- [ ] i18n ES/EN: diccionario de strings y validación de largos ("Juego libre" vs "Free play")

#### 2.4 Assets
- [ ] Panda 3D: WebP con transparencia (2x, 3x retina) + fallback PNG
- [ ] Avatar: PNG circular transparente
- [ ] Cofres e iconos: SVG escalables
- [ ] Fondo cielo: gradiente CSS (no imagen)
- [ ] Compresión con TinyPNG / squoosh; lazy-load del hero no crítico

---

## 🗺️ Fase 3: Mapa de Mundos (5-7 días)

### Entregables
- `v52_worlds.html`, `css/v52_worlds.css`, `js/v52_worlds.js`

### Tareas Detalladas

#### 3.1 Layout
- [ ] Header con botón "Volver" y título "Mundos"
- [ ] Scroll horizontal/vertical de islas flotantes (misma metáfora del fondo del home)
- [ ] Estados por isla: completado, actual, bloqueado
- [ ] Footer con progreso general

#### 3.2 Componentes
- [ ] **IslandCard:** isla ilustrada; número de mundo; completado = check verde; actual = brillo dorado + CTA "Jugar"; bloqueado = candado + opacidad 0.6
- [ ] **Progress Indicator:** línea conectora entre islas con puntos de progreso

#### 3.3 Navegación
- [ ] Isla actual → lista de niveles
- [ ] Isla completada → replay con mejor puntuación
- [ ] Isla bloqueada → mensaje "Completa el mundo anterior"

---

## 🎮 Fase 4: HUD de Juego (5-7 días)

### Entregables
- `game.html` actualizado con nuevo HUD
- `css/hud.css`

### Tareas Detalladas

#### 4.1 HUD Bar
- [ ] Corazones: 3 rojos (al perder → gris + shake)
- [ ] Estrellas: contador con animación "+2⭐" al acertar
- [ ] Racha: 🔥 + número con bounce al incrementar
- [ ] Botón pausa esquina superior derecha

#### 4.2 Animaciones
- [ ] Correcto: estrella bounce scale(1.2)→scale(1); "+2⭐" slide up con fade out
- [ ] Incorrecto: corazón shake + fade a gris; shake leve de pantalla
- [ ] Racha: fuego scale up; número bounce

#### 4.3 Integración
- [ ] Conectar con lógica de juego v51 sin cambiar reglas
- [ ] Mantener timer, opciones múltiples y validación
- [ ] Restilizar pantallas intermedias (¡PREPÁRATE!, ¡CORRECTO!, SUPERADO) con el nuevo lenguaje

---

## 🛒 Fase 5: Tienda y Perfil (5-7 días)

### Entregables
- `v52_shop.html`, `v52_profile.html` y sus CSS/JS

### Tareas Detalladas

#### 5.1 Tienda
- [ ] Categorías: Mascotas, Power-ups, Personalización
- [ ] **ItemCard:** imagen, nombre, precio en estrellas, botón Comprar/Equipado/Bloqueado
- [ ] Lógica: deducir monedas, guardar en localStorage, animación de compra

#### 5.2 Perfil
- [ ] Avatar grande con nombre, edad y título
- [ ] Estadísticas: niveles completados, estrellas totales, mejor racha
- [ ] Logros/Insignias: grid de medallas (brillantes = obtenidas)
- [ ] Destrezas: barras de progreso por habilidad
- [ ] Acceso a reporte de padres (con parent-gate)

---

## 📊 Fase 6: Reporte de Padres (3-5 días)

### Entregables
- `v52_parent_report.html` con gráficos de progreso

### Tareas Detalladas

#### 6.1 Parent Gate
- [ ] Pregunta matemática simple o operación para validar adulto
- [ ] Bloquear acceso infantil al reporte y a ajustes sensibles

#### 6.2 Contenido
- [ ] Tiempo jugado por semana, niveles completados, precisión promedio
- [ ] Áreas de mejora (gráfico de barras/radar simple en CSS o SVG)
- [ ] Misiones completadas y logros
- [ ] Exportación: "Descargar PDF" (jsPDF) y "Compartir" (WhatsApp/Email)

---

## ⚡ Fase 7: Optimización y Performance (3-5 días)

### Entregables
- Build optimizado, Lighthouse >90, documentación de performance

### Tareas Detalladas

#### 7.1 Imágenes
- [ ] Compresión (TinyPNG/Squoosh); WebP con fallback PNG
- [ ] `loading="lazy"` en imágenes no críticas
- [ ] Sprite sheet para iconos pequeños

#### 7.2 CSS
- [ ] Minificación (CSSNano); combinar archivos
- [ ] Critical CSS inline en `<head>`; resto async

#### 7.3 JavaScript
- [ ] Minificación (Terser); `defer` en scripts no críticos
- [ ] Carga diferida de JS de tienda/reporte solo al abrirlos

#### 7.4 Fonts
- [ ] `font-display: swap`
- [ ] `<link rel="preconnect" href="https://fonts.googleapis.com">`
- [ ] Preload de woff2 principales

#### 7.5 Métricas objetivo
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s
- [ ] Bundle < 500KB gzipped
- [ ] Lighthouse: Performance >90, Accessibility >95, Best Practices >90, SEO >90

---

## ♿ Fase 8: Accesibilidad (3-5 días)

### Entregables
- Cumplimiento WCAG 2.1 AA, testing con lectores de pantalla, documentación

### Tareas Detalladas

#### 8.1 Contraste
- [ ] Texto blanco sobre verde/naranja: ratio ≥ 4.5:1 (WebAIM Checker)
- [ ] Texto oscuro sobre crema: ratio ≥ 7:1 ideal
- [ ] Ajustar tokens de color si no cumplen

#### 8.2 Semántica y ARIA
- [ ] `<button>` para acciones (nunca `<div>` clicables)
- [ ] `<nav>`, `<main>`, `<header>`, `<footer>` semánticos
- [ ] `aria-label` en botones de solo icono
- [ ] `aria-live` en contadores (estrellas, XP)
- [ ] `role="dialog"` + `aria-modal` en modales

#### 8.3 Navegación
- [ ] Todo elemento interactivo focable con focus visible
- [ ] Tab order lógico; ESC cierra modales
- [ ] Targets táctiles mínimos 48dp (ideal 56-80px para niños)
- [ ] Testing con NVDA, VoiceOver y TalkBack

#### 8.4 Reducción de movimiento

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🧪 Fase 9: Testing y QA (5-7 días)

### Entregables
- Reporte de bugs, fixes implementados, testing cross-browser

### Tareas Detalladas

#### 9.1 Functional Testing (checklist v51 → v52)
- [ ] Crear/editar perfil funciona
- [ ] Mundos se cargan desde localStorage
- [ ] Juego responde y valida correctamente
- [ ] Estrellas se suman y descuentan bien
- [ ] Tienda equipa mascotas/power-ups
- [ ] Misiones progresan y se reclaman
- [ ] Logros se desbloquean
- [ ] Reporte de padres genera datos reales
- [ ] Cambio de idioma ES/EN persiste

#### 9.2 Browser Testing
- [ ] Chrome, Firefox, Safari, Edge (latest)
- [ ] Chrome Android y Safari iOS
- [ ] Devices: iPhone SE (375px), iPhone 14 (390px), iPad Mini (768px), iPad Pro (1024px), landscape tablet

#### 9.3 Edge Cases
- [ ] Sin conexión: mensaje amigable
- [ ] localStorage lleno o corrupto: recuperación graceful
- [ ] Pantallas < 320px: sin rotura de layout
- [ ] Textos largos: truncamiento con ellipsis
- [ ] Clicks rápidos múltiples: debounce en botones de compra/reclamo

#### 9.4 Testing con usuarios
- [ ] Sesiones con 5 niños de 6-10 años
- [ ] Observar: comprensión de CTAs, lectura de misiones, uso del cofre
- [ ] Registrar fricciones y priorizar fixes

---

## 🚀 Fase 10: Deployment y Rollback (2-3 días)

### Entregables
- v52 en producción, plan de rollback documentado, monitorización básica

### Tareas Detalladas

#### 10.1 Preparación
- [ ] Branch `release/v52`; merge a `main` al aprobarse; tag `v52.0.0`
- [ ] Backup: `v51_modular_backup.html`
- [ ] `CHANGELOG.md` con cambios y decisiones

#### 10.2 Deployment (GitHub Pages)

```bash
git add .
git commit -m "Release v52: nuevo diseño con design system y home renovado"
git push origin release/v52
git checkout main
git merge release/v52
git push origin main
git tag v52.0.0
git push origin v52.0.0
```

#### 10.3 Monitorización
- [ ] Analytics (Plausible o GA4): eventos `home_view`, `worlds_opened`, `game_started`, `mission_claimed`, `purchase_made`
- [ ] Captura de errores JS (Sentry opcional o logger a localStorage)

#### 10.4 Rollback Plan (< 10 minutos)

```bash
git checkout main
git revert v52.0.0
git push origin main
```

- [ ] Alternativa manual: renombrar `v52_home.html` → `v52_broken.html` y restaurar `v51_modular.html` como entrada

---

## 📅 Timeline Total

| Fase | Duración | Dependencias |
|------|----------|--------------|
| Fase 0: Preparación | 3-5 días | Ninguna |
| Fase 1: Design System | 5-7 días | Fase 0 |
| Fase 2: Home Screen | 7-10 días | Fase 1 |
| Fase 3: Mapa de Mundos | 5-7 días | Fase 2 |
| Fase 4: HUD de Juego | 5-7 días | Fase 2 |
| Fase 5: Tienda y Perfil | 5-7 días | Fase 2 |
| Fase 6: Reporte Padres | 3-5 días | Fase 5 |
| Fase 7: Optimización | 3-5 días | Fases 2-6 |
| Fase 8: Accesibilidad | 3-5 días | Fases 2-6 |
| Fase 9: Testing | 5-7 días | Fases 2-8 |
| Fase 10: Deployment | 2-3 días | Fase 9 |

**Total estimado:** 46-68 días (2-3 meses a tiempo completo)

**Paralelización:** Fases 3, 4 y 5 pueden ejecutarse en paralelo tras completar Fase 2 → reducción a ~6-8 semanas.

---

## ✅ Criterios de Éxito

1. **Funcional:** 100% de funciones de v51 accesibles en v52
2. **Visual:** Fidelidad al mock en proporciones, color y jerarquía
3. **Performance:** Lighthouse >90 en todas las categorías
4. **Accesibilidad:** WCAG 2.1 AA cumplido
5. **UX:** 5 niños (6-10 años) completan flujo home→juego→misión sin ayuda
6. **Técnica:** Cero errores de consola en producción
7. **Rollback:** Reversión a v51 posible en <10 minutos

---

## 🛠️ Recursos Necesarios

### Herramientas
- Editor: VS Code
- Diseño: Figma (gratuito)
- Testing: DevTools / BrowserStack
- Performance: Lighthouse, PageSpeed Insights
- Versionado: Git + GitHub

### Assets
- Panda 3D e islas: ilustrador 3D o renders Blender optimizados (WebP)
- Iconos: SVG propios o librerías gratuitas (Flaticon, Heroicons)
- Fuentes: Google Fonts (Fredoka / Baloo 2)

### Equipo (si aplica)
- 1 desarrollador full-stack
- 1 diseñador UI/UX (parcial)
- 1 QA tester (parcial)

---

## 📌 Riesgos y Mitigaciones

| Riesgo | Impacto | Mitigación |
|--------|---------|------------|
| Assets 3D pesados en devices gama baja | Alto | WebP, lazy-load, sprite atlas, fallback 2D |
| Funciones v51 quedan sin acceso | Alto | Mapeo Fase 0.2 validado antes de implementar |
| Botón "+" sugiere compra (patrón IAP) | Medio | Reemplazar por acceso a tienda/historial |
| Layout portrait-only | Medio | Diseñar landscape desde Fase 0.4 |
| Inconsistencia home ↔ HUD | Medio | Restilizar HUD en Fase 4 con mismos tokens |
| Regresiones de progreso guardado | Alto | Migración de localStorage con versión de schema |

---

*Fin del documento. Mantener actualizado con checkboxes conforme avanza el proyecto.*