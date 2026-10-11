# 🗺️ HOJA DE RUTA ESTRATÉGICA: RETO PANDA v1.0
**Enfoque de Producto:** Tier 1 Exclusivo (6-7 años / Clay World / Chile First / 100% Offline-First)  
**Última actualización:** 10 de octubre de 2026  
**Aprobada por:** Dirección del Proyecto & Consejo Asesor Estratégico

---

## 🎯 Visión de Lanzamiento (MVP v1.0)
Entregar una experiencia lúdica y pedagógica de excelencia para niños de 1° y 2° Básico en Chile, donde acompañan a **Mochi el Panda Explorador** por el Archipiélago de las Islas Flotantes. El juego debe ser **cero frustrante, 100% privado (sin recolección de datos en nube), accesible para prelectores y completamente operativo sin conexión a internet**.

---

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             FASES DE DESARROLLO                                  │
├─────────────────┬─────────────────┬─────────────────┬─────────────────┬──────────┤
│  FASE 1         │  FASE 2         │  FASE 3         │  FASE 4         │  FASE 5  │
│  Flujo Inicial  │  Gameplay Core  │  Mapa de Mundos │  Parental Gate  │  Beta &  │
│  & Onboarding   │  & Pedagogía    │  & Misiones     │  & Privacidad   │  Release │
│  [EN CURSO]     │  [SIGUIENTE]    │  [PLANIFICADO]  │  [PLANIFICADO]  │  [FINAL] │
└─────────────────┴─────────────────┴─────────────────┴─────────────────┴──────────┘
```

---

## 🚀 FASE 1: Pulido y Cierre del Flujo Inicial (EN CURSO)
**Alcance:** Desde la primera pantalla de carga / video cinemático hasta la pantalla principal (Hub de Mochi).

* [x] **Hito 1.1 — Producción e Integración de Assets Clave:**
  * ✅ 7 Assets 3D integrados: Logo (`caratula.webp`), Botones (`btn_mundos_clay.webp`, `btn_libre_clay.webp`), Iconos (`ico_gear_3d`, `ico_target_3d`, `ico_mission_math_3d`) y Diorama (`hero_mochi_diorama.webp`).
  * ⏳ Procesar los 2 cofres depositados en `assets/Nuevos/`: `chest_golden_closed.webp` y `chest_golden_open.webp`.
* [ ] **Hito 1.2 — Onboarding Cinemático "Pasaporte de Aventuras":**
  * `Agente Gráfico`: Trasladar video `onboarding_passport.mp4` y generar fondo WebP `onboarding_passport_bg.webp`.
  * `Agente Arquitecto`: Encadenar reproducción: Video Intro ➔ Video Pasaporte (si usuario nuevo) ➔ Revelar interfaz estática con crossfade.
  * `Agente Diseño`: Montar capas interactivas sobre el pasaporte: input `#nameInput` en surco blanco, sellos de edad [ 6 ], [ 7 ] y [ Otra ] con halo de selección, y botón "¡VAMOS A EXPLORAR!".
  * `Agente Arquitecto`: Sincronizar con `saveProfile()`, blindar tecla Escape y liberar VRAM de videos al terminar.
* [ ] **Hito 1.3 — Ergonomía Acústica y Transición Suave:**
  * `Agente Sonido` calibra los videos a volumen seguro de `0.60` con micro fade-in de desmutado.
  * `Agente Sonido` remueve `sfxLevelUp` al cargar `#home` para eliminar la cacofonía de entrada.
  * `Agente Sonido` rediseña `sfxSquish` a plastilina blanda (*Juicy Clay*) con variación tonal (*micro-detune*).
  * `Agente Sonido` conecta bienvenida de Mochi en el pasaporte y en el Home con voz chilena TTS (`speakQuestion`) y *Audio Ducking*.
* [ ] **Hito 1.4 — Resiliencia Técnica y Certificación QA:**
  * Atributo nativo `muted` en videos para iOS WebKit.
  * `Agente Tester` actualiza Suite 1 y valida Suite 9 en Playwright certificando 30/30 tests en verde.


---

## 🧸 FASE 2: Experiencia de Juego y Pedagogía Positiva (SIGUIENTE SPRINT)
**Alcance:** Tablero de juego, dinámica de preguntas, feedback de error y economía de comodines.

* [ ] **Hito 2.1 — Reestructuración de Comodines (Economía No Punitiva):**
  * "Doble o Nada" ➔ **"Bonus Valiente"**: duplica estrellas si acierta; si falla, otorga 1 estrella por el intento (nunca resta saldo).
  * "Escudo de Racha" ➔ **"Escudo Mágico"**: aura pastel que protege al niño de perder su racha sin generar culpa.
  * Gráfica y CSS renovados con simbología de aliento y superación.
* [ ] **Hito 2.2 — Curaduría del Banco MVP de 200 Preguntas:**
  * Validación curricular estricta con los Objetivos de Aprendizaje (OA) del Mineduc para 1° y 2° Básico.
  * Revisión de textos breves (máximo 12–15 palabras) con ilustraciones de apoyo en el 100% de conceptos clave.
* [ ] **Hito 2.3 — Accesibilidad Sensorial (TTS en Preguntas):**
  * Habilitar botón de altavoz para que Mochi lea la pregunta y alternativas en voz alta para niños prelectores.
* [ ] **Hito 2.4 — Feedback de Error Amable:**
  * Eliminación total de estímulos visuales agresivos (rojo punitivo sustituido por tonos salmón amigables; mensajes: *"¡Casi!", "¡Inténtalo otra vez!"*).

---

## 🗺️ FASE 3: Mapa de Mundos y Gamificación Equilibrada
**Alcance:** Navegación entre islas, progresión y micro-metas diarias.

* [ ] **Hito 3.1 — Mapa de Expediciones:**
  * Adaptación del mapa de 5 mundos a la narrativa del Archipiélago Flotante (Isla Inicio, Océano Coralino, Bosque Matemático, Laboratorio de Chispas, Volcán de Gemas).
  * Fichas de mundo con objetivos claros y botón destacado de entrada.
* [ ] **Hito 3.2 — Sincronización Real del Bento Card ("Misión de Hoy"):**
  * Conectar las barras de progreso del Bento Card con partidas reales del día.
  * Condicionar la apertura del cofre diario al cumplimiento de las tareas para fomentar la autoeficacia real.
* [ ] **Hito 3.3 — Adaptación Intencional para Tablets (1024×768):**
  * Composición en dos zonas en landscape (Diorama de Mochi a la izquierda, Misiones y Acciones a la derecha) sin barras de scroll.

---

## 🛡️ FASE 4: Blindaje de Seguridad, Privacidad y Tienda
**Alcance:** Cumplimiento legal de tiendas infantiles, control parental y tienda de cosméticos.

* [ ] **Hito 4.1 — Puerta Parental (*Parental Gate*):**
  * Reto aritmético para adultos (*"Pregunta para papás: 7 × 8 = ?"*) antes de ingresar a Ajustes y al Reporte de Padres.
* [ ] **Hito 4.2 — Privacidad Infantil COPPA / GDPR-K / Chile:**
  * Enlace accesible a la Política de Privacidad desde Ajustes.
  * Botón de supresión de datos locales (*"Borrar mis datos y reiniciar"*) para dar cumplimiento a derechos ARCO / Ley 19.628.
* [ ] **Hito 4.3 — Tienda de Mochi:**
  * Auditoría de accesorios y disfraces para que refuercen la identidad de explorador.

---

## 📦 FASE 5: Empaquetado, Beta Cerrada y Publicación
**Alcance:** Pruebas con usuarios reales y despliegue final.

* [ ] **Hito 5.1 — Empaquetado PWA y Capacitor:**
  * Generación de paquetes instalables para Android (APK/AAB) e iOS con almacenamiento 100% offline.
* [ ] **Hito 5.2 — Programa de Beta Cerrada (Chile First):**
  * Despliegue con 30 familias y colegios en Chile (1° y 2° Básico).
  * Medición de KPIs éticos: Retención D1 / D7, tasa de finalización ≥ 70%, satisfacción de padres/educadores.
* [ ] **Hito 5.3 — Lanzamiento v1.0 en Tiendas:**
  * Publicación oficial en Google Play Families y Apple App Store Kids.
