# Reto Panda APP — Reglas del Proyecto

Este proyecto tiene 3 agentes especializados:
- **Agente Arquitecto** → estructura y funcionalidad JS/HTML
- **Agente Contenido**  → lectura y entrega de preguntas .md
- **Agente Diseño**     → estilos CSS y experiencia visual
- **Consultor Externo** (Antigravity) → Auditoría, recomendaciones y coordinación.

## Roles y Responsabilidades
- Ningún agente debe intervenir en el dominio de otro.
- El **Consultor Externo** actúa como auditor y estratega; **no debe realizar modificaciones directas al código del proyecto por su cuenta**. Su función es proponer mejoras y guiar a los agentes especializados bajo la supervisión del USER.
- Ver reglas individuales en .agents/rules/

## Persistencia y Continuidad
Para retomar el trabajo de un agente específico, consulta:
- **[.agents/CHATS.md](file:///e:/Presion%20Mental%20APP/.agents/CHATS.md)** → Registro de IDs de conversación y estado actual.
- **.agents/memory/** → Archivos de memoria detallada por agente.

Al iniciar una sesión como uno de los agentes, lee su archivo de memoria para conocer el último estado.