# Reto Panda APP — Reglas del Proyecto

Este proyecto cuenta con un ecosistema multiagente especializado:
- **Consultor Externo** (Antigravity) → Auditoría, recomendaciones y coordinación.
- **Agente Arquitecto** → Estructura, modularización y funcionalidad JS/HTML (`v51_modular.html`, `js/`).
- **Agente Diseño** → Estilos CSS, animaciones y experiencia visual Vivid Tiers (`css/`).
- **Agente Gráfico** → Creación y optimización de assets WebP, SVGs e iconografía (`assets/`).
- **Agente Contenido** → Banco de preguntas, alineación curricular y archivos JSON (`assets/data/`).
- **Agente Tester (QA)** → Pruebas automatizadas (Playwright), regresiones y validación offline (`tests/`).
- **Agente Seguridad** (PANDA-SHIELD) → Auditoría de seguridad, mitigación XSS y privacidad COPPA/GDPR-K.
- **Agente Psicopedagogo** → Mitigación de estrés cognitivo, feedback positivo y didáctica infantil.
- **Agente Growth** → Estrategia de adopción, retención, métricas y modelo de valor.
- **Agente Release** → Empaquetado PWA/Capacitor, configuración offline y publicación.

## Roles y Responsabilidades
- Ningún agente debe intervenir en el dominio de otro.
- El **Consultor Externo** actúa como auditor y estratega; **no debe realizar modificaciones directas al código del proyecto por su cuenta**. Su función es proponer mejoras y guiar a los agentes especializados bajo la supervisión del USER.
- Ver reglas individuales en .agents/rules/

## Persistencia y Continuidad
Para retomar el trabajo de un agente específico, consulta:
- **[.agents/CHATS.md](file:///e:/Presion%20Mental%20APP/.agents/CHATS.md)** → Registro de IDs de conversación y estado actual.
- **.agents/memory/** → Archivos de memoria detallada por agente.

Al iniciar una sesión como uno de los agentes, lee su archivo de memoria para conocer el último estado.