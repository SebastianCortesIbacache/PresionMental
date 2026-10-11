# 📐 ESPECIFICACIÓN TÉCNICA Y DE DISEÑO: SISTEMA DE LAYOUT Y ONBOARDING INMERSIVO
**Reto Panda v1.0 — Tier 1 (Clay World / 6-7 años)**  
**Aprobado por:** Dirección del Proyecto & Consejo Asesor Estratégico  
**Fecha:** 11 de octubre de 2026  

---

## 1. 📱 ARQUITECTURA DE DISPOSITIVO: SHELL ADAPTATIVO ÚNICO

### 1.1 Veredicto Técnico
**Se rechaza la creación de dos aplicaciones separadas.** Toda la experiencia corre sobre una única base de código PWA 100% offline-first, gobernada por un **Shell Adaptativo Único (Adaptive Master Shell)**.

### 1.2 Comportamiento por Orientación

#### A. Modo Paisaje / Tablets y Desktop (Landscape $\ge$ 1.2 aspect ratio) — *MODO MAESTRO*
* **Distribución:** Dos columnas gemelas equilibradas al 50% / 50%:
  * **Columna Izquierda (Inmersión Visual):** Mochi 3D en su diorama flotante interactivo, con reacciones táctiles al tocarlo (`pokeMascot`).
  * **Columna Derecha (Acciones y Contenido):** Botones 3D de Mundos y Juego Libre, Bento Card de misiones y acceso a Tienda/Ajustes.
* **Ergonomía:** Todo el contenido visible en un solo golpe de vista a 1024×768 px y 1280×800 px. **Cero barras de scroll.**

#### B. Modo Móvil Vertical (Portrait < 1.2 aspect ratio)
* **Distribución:** Columna fluida apilada verticalmente:
  * **Zona Superior (38% alto de pantalla):** Diorama compacto con Mochi saludando o reaccionando.
  * **Zona Inferior (62% alto de pantalla):** Botones táctiles grandes (altura mínima de 56px para dedos infantiles) ubicados en la zona de fácil alcance de pulgares.
* **Ergonomía:** `overflow: hidden` global con contenedor flex/grid elástico que previene cualquier desborde vertical.

---

## 2. 🎨 ONBOARDING INMERSIVO DE PANTALLA COMPLETA

### 2.1 Sustitución del Diálogo Flotante Antiguo
* Se elimina el `<dialog id="namePopup">` con tarjeta blanca flotante desacoplada.
* El Onboarding pasa a ser una **pantalla completa fluida** (`.screen.onboarding-screen`) que toma el relevo inmediatamente tras finalizar el video cinematográfico (`intro_reto_panda.mp4`).

### 2.2 Estructura del "Pasaporte de Aventuras" (Dirección Seleccionada)
* **Fondo Base 3D:** Ilustración de alta resolución en plastilina representando el pasaporte abierto sobre la arena de la isla flotante.
* **Página Izquierda:** Mochi de cuerpo entero saludando con su mochila y gafas de aviador + sello oficial de Reto Panda.
* **Página Derecha (Capa Interactiva DOM Accesible):**
  1. **Título diegético:** *"TU PASAPORTE DE AVENTURAS"* / *"¡Hola! ¿Cómo te llamas?"*.
  2. **Campo de Nombre:** Placa de arcilla suave con input HTML nativo `#nameInput` (mayúsculas automáticas, teclado grande, sanitización estricta sin caracteres especiales).
  3. **Selector Táctil de Edad:** Tres sellos redondos de plastilina con relieve 3D:
     * **[ 6 ]** (6 años)
     * **[ 7 ]** (7 años - preseleccionado por defecto)
     * **[ Otra ]** (para jugadores de otras edades)
     * Animación táctil `clayPress` (`transform: translateY(4px) scale(0.98)`).
  4. **Botón de Despegue:** Gran botón de goma verde *"¡VAMOS A EXPLORAR! ➜"*, con sonido táctil cálido al presionar.

---

## 3. 🐼 LORE Y CONSISTENCIA CANÓNICA DE PERSONAJE

### 3.1 Mochi: El Protagonista Único y Permanente
1. **Identidad Inmutable:** Mochi el Panda Explorador es el único protagonista del juego. Acompaña al niño en todas las pantallas (intro, onboarding, menú, tablero de juego y victoria).
2. **Abolición del Reemplazo de Mascota:**
   * Se elimina la lógica histórica donde el jugador podía "comprar un gato, perro o dragón" para reemplazar a Mochi.
   * La tienda de cosméticos se transforma exclusivamente en **"El Armario del Explorador"**, donde el niño desbloquea accesorios para vestir a Mochi (gafas de aviador, visores de buceo, bufandas de nieve, brújulas, mochilas).
3. **Rol de los Otros Animales:**
   * Los demás personajes (búho, pingüino, zorro) pasan a ser **Guías Locales y Habitantes de los Mundos (NPCs)** a los que Mochi visita en sus viajes de expedición.
4. **Fidelidad Gráfica:**
   * Todos los assets de Mochi deben apegarse rigurosamente a la textura de plastilina, iluminación y proporciones de la [Ficha Canónica](file:///e:/Presion%20Mental%20APP/docs/lore/FICHA_PERSONAJE_MOCHI.md).
