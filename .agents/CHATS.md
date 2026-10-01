# CHATS — Reto Panda Multiagente

Este archivo documenta la configuración de los agentes de Antigravity para el proyecto **Reto Panda**.

> [!IMPORTANT]
> **Única Fuente de Verdad del Proyecto:** El archivo HTML activo sobre el cual se trabaja y se ejecuta la aplicación es **`v51_modular.html`**. 
> Cualquier otra variante o carpeta (como `v52_modular` o `v51_circular_backup`) son **únicamente respaldos y checkpoints anteriores y no deben modificarse ni ejecutarse**.

## Estructura del proyecto

```
Presion Mental APP/
├── .agents/
│   ├── memory/
│   │   ├── arquitecto.md     ← Memoria del Agente Arquitecto
│   │   ├── consultor.md      ← Memoria del Consultor Externo
│   │   ├── contenido.md      ← Memoria del Agente Contenido
│   │   ├── diseño.md         ← Memoria del Agente Diseño
│   │   ├── grafico.md        ← Memoria del Agente Gráfico
│   │   ├── seguridad.md      ← Memoria del Agente Seguridad (PANDA-SHIELD)
│   │   └── tester.md         ← Memoria del Agente Tester (QA) ← NUEVO
│   └── rules/
│       ├── agente-arquitecto.md
│       ├── agente-consultor.md
│       ├── agente-contenido.md
│       ├── agente-diseño.md
│       ├── agente-grafico.md
│       ├── agente-seguridad.md
│       └── agente-tester.md  ← NUEVO
├── js/
│   ├── main.js
│   ├── store.js
│   ├── db.js
│   ├── ui.js
│   └── game.js
├── css/
│   ├── base.css
│   ├── components.css
│   ├── game.css
│   ├── layout.css
│   ├── popups.css
│   ├── states.css
│   ├── variables.css
│   └── tiers/
│       ├── tier1.css
│       ├── tier2.css
│       └── tier3.css
├── assets/
│   ├── mascotas/tier1/
│   ├── fondos/
│   ├── interface/
│   └── audio/
├── sw.js
├── manifest.json
├── v51_modular.html
└── questions_db.json
```

## Agentes configurados

### 🕵️ Consultor Externo (Antigravity)
- **Rol:** Auditoría, estrategia y coordinación entre agentes. NO modifica código directamente.
- **Archivos de memoria:** `.agents/memory/consultor.md`
- **Reglas:** `.agents/rules/agente-consultor.md`
- **Conversación:** `0c306431-c583-4d9c-9211-90a56ae00388`

### 🏗️ Agente Arquitecto
- **Rol:** Coherencia técnica JS/HTML, bugs de lógica, estructura modular ESM
- **Archivos de memoria:** `.agents/memory/arquitecto.md`
- **Reglas:** `.agents/rules/agente-arquitecto.md`
- **Acceso a archivos:** `v51_modular.html`, `js/`

### 🎨 Agente Diseño
- **Rol:** UI/UX, CSS, animaciones, temas visuales por tier
- **Archivos de memoria:** `.agents/memory/diseño.md`
- **Reglas:** `.agents/rules/agente-diseño.md`
- **Acceso a archivos:** `v51_modular.html`, `css/`

### 🖼️ Agente Gráfico
- **Rol:** SVG, mascotas, badges, assets visuales WebP
- **Archivos de memoria:** `.agents/memory/grafico.md`
- **Reglas:** `.agents/rules/agente-grafico.md`
- **Acceso a archivos:** `assets/`

### 🧠 Agente Contenido
- **Rol:** Genera y amplía el banco de preguntas en formato JSON
- **Archivos de memoria:** `.agents/memory/contenido.md`
- **Reglas:** `.agents/rules/agente-contenido.md`
- **Acceso a archivos:** `Preguntas/`, `questions_db.json`

### 🛡️ Agente Seguridad (PANDA-SHIELD)
- **Rol:** Auditoría de seguridad, remediación XSS, integridad de datos
- **Archivos de memoria:** `.agents/memory/seguridad.md`
- **Reglas:** `.agents/rules/agente-seguridad.md`
- **Conversación:** `c3b29188-ead3-4a94-b5d8-e85d8d725a18`
- **Estado actual:** ✅ Sprint de seguridad completado (2026-06-20). En standby.

### 🧪 Agente Tester (QA) ← NUEVO
- **Rol:** Pruebas funcionales, detección de regresiones, smoke tests post-sprint
- **Archivos de memoria:** `.agents/memory/tester.md`
- **Reglas:** `.agents/rules/agente-tester.md`
- **Conversación:** `(Sin asignar — pendiente de primera sesión activa)`
- **Estado actual:** ⏳ Primera campaña de testing PENDIENTE (Post-Sprint Fase 1+3)

---

## Flujo de trabajo recomendado

1. **Nueva materia o rango etario** → Agente Contenido genera preguntas → Agente Arquitecto valida JSON
2. **Bug visual** → Agente Diseño diagnostica → Agente Gráfico provee assets si es necesario
3. **Bug de lógica** → Agente Arquitecto diagnostica y entrega fix de código
4. **Nueva mascota/accesorio** → Agente Gráfico diseña → Agente Diseño implementa en CSS
5. **Fin de sprint** → **Agente Tester valida** → Reporta bugs a los agentes responsables → Consultor cierra el sprint
6. **Auditoría de seguridad** → Agente Seguridad audita → Agente Tester verifica que los parches no generen regresiones

## Regla de oro

Ningún agente debe operar en el dominio de otro sin coordinación del Consultor.
El **Agente Tester** tiene la última palabra sobre si un sprint está "listo": si tiene bugs CRÍTICOS o ALTOS abiertos, el sprint NO se declara cerrado.
