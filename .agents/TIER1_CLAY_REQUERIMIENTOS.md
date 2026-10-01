# Requerimientos Visuales - TIER1_CLAY
**Estética:** Clay World (Plastilina 3D, suave, redondo)

Este documento contiene las preguntas que requieren apoyo visual para este Tier específico. El Agente Gráfico debe generar los assets siguiendo estrictamente el estilo visual definido para este rango de edad.

## 🛠️ Especificaciones Técnicas (Agente Diseño)
Para garantizar que las imágenes se adapten perfectamente a las tarjetas de misión y popups del Tier 1 (`.mission-card`, `<dialog>`), el **Agente Gráfico** debe respetar las siguientes especificaciones:

1. **Dimensiones y Proporción:**
   - **Formato:** WEBP (para optimización de PWA).
   - **Resolución base:** 500x500 px (Relación de aspecto 1:1, cuadrada) o 600x400 px (4:3) dependiendo del encuadre. Se prefiere **1:1** para estandarización en tarjetas circulares o modales.
2. **Fondo y Transparencia:**
   - **Requisito crítico:** Fondo **100% transparente** (Canal Alpha limpio). *No usar recuadros blancos ni grises.*
   - Si la ilustración requiere un entorno, debe difuminarse suavemente hacia los bordes en lugar de un corte duro, o tener una forma orgánica de plastilina (blob/nube) como base.
3. **Márgenes de Seguridad (Padding):**
   - Dejar un margen de seguridad interno del **10% al 15%** (50-70px en bordes) para asegurar que CSS `border-radius: 20px` o clips circulares no corten partes importantes del dibujo.
4. **Iluminación y Contraste:**
   - Evitar sombras muy duras; usar sombreado suave de plastilina (claymorphism).
   - La iluminación debe simular una luz cenital cálida que destaque los colores pastel del Tier 1 (`#FFD54F`, `#F48FB1`, `#A5D6A7`, `#90CAF9`).

**Total de ilustraciones para este Tier:** 368


## Categoría: Ciencias

| Pregunta | Descripción | Ruta Sugerida |
| :--- | :--- | :--- |
| ¿Cómo nace un pollito? | Un huevo de gallina con una pequeña grieta de la que asoma un pico amarillo. | assets/preguntas/t1/preg_c_mo_nace_un_pollit_001_t1.webp |
| ¿Cuál de estos animales vive en la tierra y se desplaza caminando o corriendo? | Un puma chileno caminando sobre rocas en un paisaje de montaña. | assets/preguntas/t1/preg_cu_l_de_estos_anima_002_t1.webp |
| ¿En qué parte de la planta se encuentran las semillas para que nazcan nuevas plantas? | Una manzana cortada a la mitad mostrando las pequeñas semillas cafés en el centro. | assets/preguntas/t1/preg_en_qu__parte_de_la_003_t1.webp |
## Categoría: Historia

| Pregunta | Descripción | Ruta Sugerida |
| :--- | :--- | :--- |
| ¿Qué herramienta indica los puntos cardinales en un dibujo o mapa? | Dibujo de una rosa de los vientos con las letras N, S, E, O. | assets/preguntas/t1/preg_qu__herramienta_ind_001_t1.webp |
| Si extiendo mi brazo derecho hacia el Este, ¿qué punto cardinal tendré adelante? | Niño de espalda con los brazos extendidos en la playa. | assets/preguntas/t1/preg_si_extiendo_mi_brazo_002_t1.webp |
| ¿Qué herramienta representa la Tierra de forma esférica, similar a su forma real? | Un globo terráqueo sobre una base negra. | assets/preguntas/t1/preg_qu__herramienta_rep_003_t1.webp |
| ¿Qué nombre reciben las imágenes de la Tierra tomadas desde el espacio por tecnología avanzada? | Imagen de la Tierra vista desde el espacio con nubes y océanos. | assets/preguntas/t1/preg_qu__nombre_reciben_004_t1.webp |
| Si un mapa no tiene nombres de lugares ni colores, se le conoce como: | Mapa de América del Sur solo con las líneas de frontera. | assets/preguntas/t1/preg_si_un_mapa_no_tiene_005_t1.webp |
| ¿En qué continente se ubica la mayor parte del territorio de Chile? | Planisferio con Chile destacado en color rojo. | assets/preguntas/t1/preg_en_qu__continente_s_006_t1.webp |
| ¿En qué parte específica del continente americano se ubica Chile? | Mapa de América dividido por colores. | assets/preguntas/t1/preg_en_qu__parte_espec_007_t1.webp |
| Mirando el mapa de América del Sur, ¿qué país se encuentra al Este de Argentina? | Mapa de América del Sur con nombres de países y capitales. | assets/preguntas/t1/preg_mirando_el_mapa_de_a_008_t1.webp |
| Un lugar donde viven miles de personas con muchos edificios y caminos se llama: | Vista de la ciudad de Antofagasta con muchos edificios frente al mar. | assets/preguntas/t1/preg_un_lugar_donde_viven_009_t1.webp |
| ¿Cómo clasificamos un paisaje donde el ser humano casi no ha intervenido? | Imagen de Torres del Paine con montañas, nieve y elementos naturales puros. | assets/preguntas/t1/preg_c_mo_clasificamos_u_010_t1.webp |
| El fenómeno donde aparecen flores en el desierto tras lluvias inusuales se llama: | Paisaje con flores pequeñas de colores morado y amarillo en un terreno árido de la Región de Atacama. | assets/preguntas/t1/preg_el_fen_meno_donde_ap_011_t1.webp |
| ¿Qué roedor de pelaje grueso y orejas largas habita en las zonas cordilleranas? | Roedor de pelaje grueso, orejas largas y bigotes sentado sobre rocas. | assets/preguntas/t1/preg_qu__roedor_de_pelaj_012_t1.webp |
| Para los pueblos originarios, el respeto a la naturaleza es parte fundamental de su: | Mujer de un pueblo originario frente a una representación de la naturaleza. | assets/preguntas/t1/preg_para_los_pueblos_ori_013_t1.webp |
| ¿Cuál es el nombre de la ciudad principal donde vive la mayoría de la gente en Rapa Nui? | Vista de un pequeño puerto costero con botes de colores y casas bajas. | assets/preguntas/t1/preg_cu_l_es_el_nombre_d_014_t1.webp |
| ¿Cuál es la playa más famosa y turística de la isla de Rapa Nui? | Playa de arena blanca con palmeras y mar turquesa. | assets/preguntas/t1/preg_cu_l_es_la_playa_m_015_t1.webp |
| Al recibir compañeros de otros países, el valor que nos permite vivir bien es: | Niños en una sala de clases con banderas de Chile, Haití y otros países. | assets/preguntas/t1/preg_al_recibir_compa_ero_016_t1.webp |
| Vivir en comunidad significa que debemos: | Personas compartiendo en una plaza pública con juegos y áreas verdes. | assets/preguntas/t1/preg_vivir_en_comunidad_s_017_t1.webp |
| ¿Cómo se llama el tambor ceremonial típico del pueblo Mapuche? | Mujer mapuche tocando un tambor de madera y cuero. | assets/preguntas/t1/preg_c_mo_se_llama_el_ta_018_t1.webp |
| La fiesta tradicional de Rapa Nui donde celebran su cultura se llama: | Personas con trajes tradicionales bailando en la isla. | assets/preguntas/t1/preg_la_fiesta_tradiciona_019_t1.webp |
| Ayudar a un adulto mayor a cruzar la calle es un ejemplo de: | Niño ayudando a un abuelo en un espacio público. | assets/preguntas/t1/preg_ayudar_a_un_adulto_m_020_t1.webp |
## Categoría: Ingles

| Pregunta | Descripción | Ruta Sugerida |
| :--- | :--- | :--- |
| (Imagen de Charlie saludando) Hello! My name's... | Niño llamado Charlie saludando. | assets/preguntas/t1/preg_imagen_de_charlie_s_001_t1.webp |
| (Imagen de una niña con el nombre Lee) What's your name? | Niña llamada Lee. | assets/preguntas/t1/preg_imagen_de_una_ni_a_002_t1.webp |
| (Imagen de una niña con el nombre Ruby) My name's... | Niña llamada Ruby. | assets/preguntas/t1/preg_imagen_de_una_ni_a_003_t1.webp |
| (Imagen de la niña Pía) Hello! What's your name? | Niña llamada Pía. | assets/preguntas/t1/preg_imagen_de_la_ni_a_p_004_t1.webp |
| How old are you? (Imagen de un niño mostrando 7 dedos) | Niño mostrando 7 dedos. | assets/preguntas/t1/preg_how_old_are_you___im_005_t1.webp |
| How old are you? (Imagen de una niña con un pastel y 6 velas) | Niña con pastel de 6 velas. | assets/preguntas/t1/preg_how_old_are_you___im_006_t1.webp |
| (Imagen del número 4) What number is this? | El número 4. | assets/preguntas/t1/preg_imagen_del_n_mero_4_007_t1.webp |
| (Imagen del número 1) What number is this? | El número 1. | assets/preguntas/t1/preg_imagen_del_n_mero_1_008_t1.webp |
| (Imagen de siete lápices) Count the pencils. | Siete lápices agrupados. | assets/preguntas/t1/preg_imagen_de_siete_l_p_009_t1.webp |
| (Imagen del número 10) What number is this? | El número 10. | assets/preguntas/t1/preg_imagen_del_n_mero_1_010_t1.webp |
| (Imagen de tres libros) Count the books. | Tres libros. | assets/preguntas/t1/preg_imagen_de_tres_libr_011_t1.webp |
| (Imagen del número 2) What number is this? | El número 2. | assets/preguntas/t1/preg_imagen_del_n_mero_2_012_t1.webp |
| (Imagen del número 5) What number is this? | El número 5. | assets/preguntas/t1/preg_imagen_del_n_mero_5_013_t1.webp |
| (Imagen del número 8) What number is this? | El número 8. | assets/preguntas/t1/preg_imagen_del_n_mero_8_014_t1.webp |
| (Imagen del número 3) What number is this? | El número 3. | assets/preguntas/t1/preg_imagen_del_n_mero_3_015_t1.webp |
| (Imagen del número 6) What number is this? | El número 6. | assets/preguntas/t1/preg_imagen_del_n_mero_6_016_t1.webp |
| (Imagen del número 9) What number is this? | El número 9. | assets/preguntas/t1/preg_imagen_del_n_mero_9_017_t1.webp |
| How old are you? (Imagen de Nelly con el número 7) | Niña llamada Nelly con un cartel del número 7. | assets/preguntas/t1/preg_how_old_are_you___im_018_t1.webp |
| How old are you? (Imagen de Sam con el número 9) | Niño llamado Sam con un cartel del número 9. | assets/preguntas/t1/preg_how_old_are_you___im_019_t1.webp |
| (Imagen de 11 estrellas) Count the stars. | 11 estrellas pequeñas. | assets/preguntas/t1/preg_imagen_de_11_estrel_020_t1.webp |
| (Imagen del número 15) What number is this? | El número 15. | assets/preguntas/t1/preg_imagen_del_n_mero_1_021_t1.webp |
| (Imagen del número 20) What number is this? | El número 20. | assets/preguntas/t1/preg_imagen_del_n_mero_2_022_t1.webp |
| (Imagen de 13 manzanas) Count the apples. | 13 manzanas. | assets/preguntas/t1/preg_imagen_de_13_manzan_023_t1.webp |
| (Imagen del número 12) What number is this? | El número 12. | assets/preguntas/t1/preg_imagen_del_n_mero_1_024_t1.webp |
| (Imagen del número 14) What number is this? | El número 14. | assets/preguntas/t1/preg_imagen_del_n_mero_1_025_t1.webp |
| (Imagen del número 18) What number is this? | El número 18. | assets/preguntas/t1/preg_imagen_del_n_mero_1_026_t1.webp |
| (Imagen del número 16) What number is this? | El número 16. | assets/preguntas/t1/preg_imagen_del_n_mero_1_027_t1.webp |
| (Imagen del número 17) What number is this? | El número 17. | assets/preguntas/t1/preg_imagen_del_n_mero_1_028_t1.webp |
| (Imagen del número 19) What number is this? | El número 19. | assets/preguntas/t1/preg_imagen_del_n_mero_1_029_t1.webp |
| (Imagen de un lápiz grafito amarillo) What's this? | Un lápiz grafito amarillo. | assets/preguntas/t1/preg_imagen_de_un_l_piz_030_t1.webp |
| (Imagen de una goma de borrar roja y azul) What's this? | Una goma de borrar roja y azul. | assets/preguntas/t1/preg_imagen_de_una_goma_031_t1.webp |
| (Imagen de un bolígrafo azul y negro) What's this? It's a... | Un bolígrafo tipo pen. | assets/preguntas/t1/preg_imagen_de_un_bol_gr_032_t1.webp |
| (Imagen de un sacapuntas con forma de mariquita/ladybug) What's this? It's a... | Un sacapuntas con diseño de ladybug. | assets/preguntas/t1/preg_imagen_de_un_sacapu_033_t1.webp |
| (Imagen de una regla con forma de serpiente colorida) What's this? It's a... | Una regla con diseño de serpiente. | assets/preguntas/t1/preg_imagen_de_una_regla_034_t1.webp |
| (Imagen de un libro abierto amarillo) What's this? | Un libro abierto. | assets/preguntas/t1/preg_imagen_de_un_libro_035_t1.webp |
| (Imagen de una mochila con diseño de balón de fútbol azul y amarillo) What's this? | Una mochila con diseño de fútbol. | assets/preguntas/t1/preg_imagen_de_una_mochi_036_t1.webp |
| (Imagen de un estuche con forma de cocodrilo verde) What's this? | Un estuche con diseño de cocodrilo. | assets/preguntas/t1/preg_imagen_de_un_estuch_037_t1.webp |
| (Imagen de un pegamento en barra amarillo y verde) What's this? It's a... | Un pegamento en barra. | assets/preguntas/t1/preg_imagen_de_un_pegame_038_t1.webp |
| (Imagen de un niño entregando un lápiz a otro) Let's share our... | Niños compartiendo un lápiz. | assets/preguntas/t1/preg_imagen_de_un_ni_o_e_039_t1.webp |
| (Imagen de un bolígrafo con estrellas y fuego en la punta) What's this? | Un bolígrafo con diseño espacial. | assets/preguntas/t1/preg_imagen_de_un_bol_gr_040_t1.webp |
| (Imagen de varios libros apilados) What are these? They are... | Pila de libros. | assets/preguntas/t1/preg_imagen_de_varios_li_041_t1.webp |
| (Imagen de un estuche abierto con una regla adentro) In my pencil case, I have a... | Estuche con una regla. | assets/preguntas/t1/preg_imagen_de_un_estuch_042_t1.webp |
| (Imagen de una mochila con un libro asomándose) In my school bag, I have a... | Mochila con un libro. | assets/preguntas/t1/preg_imagen_de_una_mochi_043_t1.webp |
| (Imagen de un sacapuntas azul pequeño) What's this? It's a blue... | Sacapuntas azul. | assets/preguntas/t1/preg_imagen_de_un_sacapu_044_t1.webp |
| (Imagen de una goma de borrar blanca) What's this? It's a... | Una goma de borrar blanca. | assets/preguntas/t1/preg_imagen_de_una_goma_045_t1.webp |
| (Imagen de un lápiz de madera negro) What's this? It's a black... | Lápiz de madera negro. | assets/preguntas/t1/preg_imagen_de_un_l_piz_046_t1.webp |
| (Imagen de una regla roja) What's this? It's a red... | Regla de color rojo. | assets/preguntas/t1/preg_imagen_de_una_regla_047_t1.webp |
| (Imagen de un estuche azul oscuro) What's this? It's a blue... | Estuche azul. | assets/preguntas/t1/preg_imagen_de_un_estuch_048_t1.webp |
| (Imagen de un lápiz verde) What's this? It's a green... | Lápiz verde. | assets/preguntas/t1/preg_imagen_de_un_l_piz_049_t1.webp |
| (Imagen de un pegamento) What's this? It's a... | Pegamento de barra. | assets/preguntas/t1/preg_imagen_de_un_pegame_050_t1.webp |
| (Imagen de un libro de tapa azul) What's this? It's a blue... | Libro azul. | assets/preguntas/t1/preg_imagen_de_un_libro_051_t1.webp |
| (Imagen de una mochila verde y roja) What's this? It's a... | Mochila escolar. | assets/preguntas/t1/preg_imagen_de_una_mochi_052_t1.webp |
| (Imagen de una goma pequeña) What's this? It's a... | Goma de borrar. | assets/preguntas/t1/preg_imagen_de_una_goma_053_t1.webp |
| (Imagen de un sacapuntas amarillo) What's this? It's a yellow... | Sacapuntas amarillo. | assets/preguntas/t1/preg_imagen_de_un_sacapu_054_t1.webp |
| (Imagen de un bolígrafo rojo) What's this? It's a red... | Bolígrafo rojo. | assets/preguntas/t1/preg_imagen_de_un_bol_gr_055_t1.webp |
| (Imagen de un lápiz pasta azul) What's this? | Lápiz pasta azul. | assets/preguntas/t1/preg_imagen_de_un_l_piz_056_t1.webp |
| (Imagen de un estuche rosa) What's this? | Estuche rosa. | assets/preguntas/t1/preg_imagen_de_un_estuch_057_t1.webp |
| (Imagen de una mochila azul y amarilla) What's this? | Mochila escolar. | assets/preguntas/t1/preg_imagen_de_una_mochi_058_t1.webp |
| (Imagen de una mancha roja) What colour is this? | Color rojo. | assets/preguntas/t1/preg_imagen_de_una_manch_059_t1.webp |
| (Imagen de una regla azul) This ruler is... | Regla azul. | assets/preguntas/t1/preg_imagen_de_una_regla_060_t1.webp |
| (Imagen de un lápiz verde) This pencil is... | Lápiz verde. | assets/preguntas/t1/preg_imagen_de_un_l_piz_061_t1.webp |
| (Imagen de un libro amarillo) This book is... | Libro amarillo. | assets/preguntas/t1/preg_imagen_de_un_libro_062_t1.webp |
| (Imagen de un sacapuntas naranja) What colour is it? | Sacapuntas naranja. | assets/preguntas/t1/preg_imagen_de_un_sacapu_063_t1.webp |
| (Imagen de una mochila rosa) This school bag is... | Mochila rosa. | assets/preguntas/t1/preg_imagen_de_una_mochi_064_t1.webp |
| (Imagen de una goma morada) This rubber is... | Goma morada. | assets/preguntas/t1/preg_imagen_de_una_goma_065_t1.webp |
| (Imagen de un bolígrafo negro) This pen is... | Bolígrafo negro. | assets/preguntas/t1/preg_imagen_de_un_bol_gr_066_t1.webp |
| (Imagen de una manzana roja) A red... | Manzana roja. | assets/preguntas/t1/preg_imagen_de_una_manza_067_t1.webp |
| (Imagen de un plátano amarillo) A yellow... | Plátano amarillo. | assets/preguntas/t1/preg_imagen_de_un_pl_tan_068_t1.webp |
| (Imagen de una fruta naranja) An orange... | Una naranja. | assets/preguntas/t1/preg_imagen_de_una_fruta_069_t1.webp |
| (Imagen de un estuche azul) A blue... | Estuche azul. | assets/preguntas/t1/preg_imagen_de_un_estuch_070_t1.webp |
| (Imagen de un lápiz de cera rosa) A pink... | Lápiz de cera rosa. | assets/preguntas/t1/preg_imagen_de_un_l_piz_071_t1.webp |
| (Imagen de una mochila negra) A black... | Mochila negra. | assets/preguntas/t1/preg_imagen_de_una_mochi_072_t1.webp |
| (Imagen de un libro verde) A green... | Libro verde. | assets/preguntas/t1/preg_imagen_de_un_libro_073_t1.webp |
| (Imagen de un sacapuntas rojo) A red... | Sacapuntas rojo. | assets/preguntas/t1/preg_imagen_de_un_sacapu_074_t1.webp |
| (Imagen de una goma azul) A blue... | Goma azul. | assets/preguntas/t1/preg_imagen_de_una_goma_075_t1.webp |
| (Imagen de un bolígrafo verde) A green... | Bolígrafo verde. | assets/preguntas/t1/preg_imagen_de_un_bol_gr_076_t1.webp |
| (Imagen de una regla amarilla) A yellow... | Regla amarilla. | assets/preguntas/t1/preg_imagen_de_una_regla_077_t1.webp |
| (Imagen de un estuche morado) A purple... | Estuche morado. | assets/preguntas/t1/preg_imagen_de_un_estuch_078_t1.webp |
| (Imagen de una mano) What's this? | Una mano. | assets/preguntas/t1/preg_imagen_de_una_mano_079_t1.webp |
| (Imagen de una pierna) What's this? | Una pierna. | assets/preguntas/t1/preg_imagen_de_una_piern_080_t1.webp |
| (Imagen de los dedos de los pies) What are these? | Dedos de los pies. | assets/preguntas/t1/preg_imagen_de_los_dedos_081_t1.webp |
| (Imagen de cabello) What's this? | Cabello. | assets/preguntas/t1/preg_imagen_de_cabello_082_t1.webp |
| (Imagen de una rodilla) What's this? | Una rodilla. | assets/preguntas/t1/preg_imagen_de_una_rodil_083_t1.webp |
| (Imagen de un brazo) What's this? | Un brazo. | assets/preguntas/t1/preg_imagen_de_un_brazo_084_t1.webp |
| (Imagen de los pies) What are these? | Los pies. | assets/preguntas/t1/preg_imagen_de_los_pies_085_t1.webp |
| (Imagen de la cabeza) What's this? | La cabeza. | assets/preguntas/t1/preg_imagen_de_la_cabeza_086_t1.webp |
| (Imagen de la boca) What's this? | La boca. | assets/preguntas/t1/preg_imagen_de_la_boca_087_t1.webp |
| (Imagen de una oreja) What's this? | Una oreja. | assets/preguntas/t1/preg_imagen_de_una_oreja_088_t1.webp |
| (Imagen de un ojo) What's this? | Un ojo. | assets/preguntas/t1/preg_imagen_de_un_ojo__w_089_t1.webp |
| (Imagen de una nariz) What's this? | Una nariz. | assets/preguntas/t1/preg_imagen_de_una_nariz_090_t1.webp |
| (Imagen de un niño aplaudiendo) ______ your hands. | Niño aplaudiendo. | assets/preguntas/t1/preg_imagen_de_un_ni_o_a_091_t1.webp |
| (Imagen de un niño golpeando el suelo con los pies) ______ your feet. | Niño zapateando. | assets/preguntas/t1/preg_imagen_de_un_ni_o_g_092_t1.webp |
| (Imagen de una niña dando vueltas) ______ around. | Niña girando. | assets/preguntas/t1/preg_imagen_de_una_ni_a_093_t1.webp |
| (Imagen de un niño tocándose los pies) ______ your toes. | Niño tocando sus pies. | assets/preguntas/t1/preg_imagen_de_un_ni_o_t_094_t1.webp |
| (Imagen de una niña asintiendo) ______ your head. | Niña asintiendo con la cabeza. | assets/preguntas/t1/preg_imagen_de_una_ni_a_095_t1.webp |
| (Imagen de un niño moviendo las manos) ______ your hands. | Niño agitando las manos. | assets/preguntas/t1/preg_imagen_de_un_ni_o_m_096_t1.webp |
| (Imagen de una niña moviendo los brazos) ______ your arms. | Niña saludando con los brazos. | assets/preguntas/t1/preg_imagen_de_una_ni_a_097_t1.webp |
| (Imagen de un niño tocando su nariz) Touch your... | Niño tocando su nariz. | assets/preguntas/t1/preg_imagen_de_un_ni_o_t_098_t1.webp |
| (Imagen de una niña tocando sus orejas) Touch your... | Niña tocando sus orejas. | assets/preguntas/t1/preg_imagen_de_una_ni_a_099_t1.webp |
| (Imagen de un niño con cabello negro) My hair is... | Niño con pelo negro. | assets/preguntas/t1/preg_imagen_de_un_ni_o_c_100_t1.webp |
| (Imagen de una niña con ojos azules) My eyes are... | Niña con ojos azules. | assets/preguntas/t1/preg_imagen_de_una_ni_a_101_t1.webp |
| (Imagen de un niño con ojos negros) My eyes are... | Niño con ojos negros. | assets/preguntas/t1/preg_imagen_de_un_ni_o_c_102_t1.webp |
| (Imagen de una niña con cabello rojo) My hair is... | Niña con pelo rojo. | assets/preguntas/t1/preg_imagen_de_una_ni_a_103_t1.webp |
| (Imagen de un brazo) This is my... | Un brazo. | assets/preguntas/t1/preg_imagen_de_un_brazo_104_t1.webp |
| (Imagen de una pierna) This is my... | Una pierna. | assets/preguntas/t1/preg_imagen_de_una_piern_105_t1.webp |
| (Imagen de una mano) This is my... | Una mano. | assets/preguntas/t1/preg_imagen_de_una_mano_106_t1.webp |
| (Imagen de un pie) This is my... | Un pie. | assets/preguntas/t1/preg_imagen_de_un_pie__t_107_t1.webp |
| (Imagen de una cabeza) This is my... | Una cabeza. | assets/preguntas/t1/preg_imagen_de_una_cabez_108_t1.webp |
| (Imagen de un padre) This is my... | Un hombre (papá). | assets/preguntas/t1/preg_imagen_de_un_padre_109_t1.webp |
| (Imagen de una madre) This is my... | Una mujer (mamá). | assets/preguntas/t1/preg_imagen_de_una_madre_110_t1.webp |
| (Imagen de una abuela) This is my... | Una mujer anciana (granny). | assets/preguntas/t1/preg_imagen_de_una_abuel_111_t1.webp |
| (Imagen de un abuelo) This is my... | Un hombre anciano (grandad). | assets/preguntas/t1/preg_imagen_de_un_abuelo_112_t1.webp |
| (Imagen de un hermano) This is my... | Un niño (brother). | assets/preguntas/t1/preg_imagen_de_un_herman_113_t1.webp |
| (Imagen de una hermana) This is my... | Una niña (sister). | assets/preguntas/t1/preg_imagen_de_una_herma_114_t1.webp |
| (Imagen de familia) This is my... | Grupo familiar. | assets/preguntas/t1/preg_imagen_de_familia_115_t1.webp |
| (Imagen de un niño señalando a su abuela) This is my... | Niño con su abuela. | assets/preguntas/t1/preg_imagen_de_un_ni_o_s_116_t1.webp |
| (Imagen de una niña señalando a su abuelo) This is my... | Niña con su abuelo. | assets/preguntas/t1/preg_imagen_de_una_ni_a_117_t1.webp |
| (Imagen de un hombre joven) This is my... | Un hombre (papá). | assets/preguntas/t1/preg_imagen_de_un_hombre_118_t1.webp |
| (Imagen de una mujer joven) This is my... | Una mujer (mamá). | assets/preguntas/t1/preg_imagen_de_una_mujer_119_t1.webp |
| (Imagen de un niño pequeño) This is my... | Niño pequeño (hermano). | assets/preguntas/t1/preg_imagen_de_un_ni_o_p_120_t1.webp |
| (Imagen de una niña pequeña) This is my... | Niña pequeña (hermana). | assets/preguntas/t1/preg_imagen_de_una_ni_a_121_t1.webp |
| (Imagen de abuela y abuelo) They are my... | Los abuelos. | assets/preguntas/t1/preg_imagen_de_abuela_y_122_t1.webp |
| (Imagen de papá y mamá) They are my... | Los padres. | assets/preguntas/t1/preg_imagen_de_pap__y_ma_123_t1.webp |
| (Imagen de hermano y hermana) They are my... | Los hermanos. | assets/preguntas/t1/preg_imagen_de_hermano_y_124_t1.webp |
| Is this your mum? (Imagen de una mamá) | Una mamá. | assets/preguntas/t1/preg_is_this_your_mum___i_125_t1.webp |
| Is this your brother? (Imagen de un abuelo) | Un abuelo. | assets/preguntas/t1/preg_is_this_your_brother_126_t1.webp |
| Is this your granny? (Imagen de una abuela) | Una abuela. | assets/preguntas/t1/preg_is_this_your_granny_127_t1.webp |
| Is this your dad? (Imagen de un papá) | Un papá. | assets/preguntas/t1/preg_is_this_your_dad___i_128_t1.webp |
| (Imagen de un gato) What's this? | Un gato. | assets/preguntas/t1/preg_imagen_de_un_gato_129_t1.webp |
| (Imagen de un perro) What's this? | Un perro. | assets/preguntas/t1/preg_imagen_de_un_perro_130_t1.webp |
| (Imagen de un conejo) What's this? | Un conejo. | assets/preguntas/t1/preg_imagen_de_un_conejo_131_t1.webp |
| (Imagen de un ratón) What's this? | Una rata/ratón. | assets/preguntas/t1/preg_imagen_de_un_rat_n_132_t1.webp |
| (Imagen de un pez dorado) What's this? | Un pez dorado. | assets/preguntas/t1/preg_imagen_de_un_pez_do_133_t1.webp |
| (Imagen de un loro colorido) What's this? | Un loro. | assets/preguntas/t1/preg_imagen_de_un_loro_c_134_t1.webp |
| (Imagen de una jirafa) What's this wild animal? | Una jirafa. | assets/preguntas/t1/preg_imagen_de_una_jiraf_135_t1.webp |
| (Imagen de un oso de peluche marrón) What's this? | Un oso de peluche. | assets/preguntas/t1/preg_imagen_de_un_oso_de_136_t1.webp |
| Is it a cat? (Imagen de un gato) | Un gato. | assets/preguntas/t1/preg_is_it_a_cat___imagen_137_t1.webp |
| Is it a dog? (Imagen de un conejo) | Un conejo. | assets/preguntas/t1/preg_is_it_a_dog___imagen_138_t1.webp |
| (Imagen de un cachorro de perro) It's a... | Un puppy. | assets/preguntas/t1/preg_imagen_de_un_cachor_139_t1.webp |
| (Imagen de un loro azul) Is it blue? | Loro azul. | assets/preguntas/t1/preg_imagen_de_un_loro_a_140_t1.webp |
| (Imagen de un gato rosa) Is it pink? | Gato rosa. | assets/preguntas/t1/preg_imagen_de_un_gato_r_141_t1.webp |
| (Imagen de un conejo morado) Is it purple? | Conejo morado. | assets/preguntas/t1/preg_imagen_de_un_conejo_142_t1.webp |
| (Imagen de una rata negra) Is it black? | Rata negra. | assets/preguntas/t1/preg_imagen_de_una_rata_143_t1.webp |
| (Imagen de un pez naranja) Is it orange? | Pez naranja. | assets/preguntas/t1/preg_imagen_de_un_pez_na_144_t1.webp |
| (Imagen de un niño corriendo) ______! | Niño corriendo. | assets/preguntas/t1/preg_imagen_de_un_ni_o_c_145_t1.webp |
| (Imagen de una niña sentándose) ______! | Niña sentándose. | assets/preguntas/t1/preg_imagen_de_una_ni_a_146_t1.webp |
| (Imagen de un niño de pie) ______! | Niño de pie. | assets/preguntas/t1/preg_imagen_de_un_ni_o_d_147_t1.webp |
| (Imagen de una niña durmiendo) ______! | Niña durmiendo. | assets/preguntas/t1/preg_imagen_de_una_ni_a_148_t1.webp |
| (Imagen de una pizza) What's this? | Una pizza. | assets/preguntas/t1/preg_imagen_de_una_pizza_149_t1.webp |
| (Imagen de queso amarillo) What's this? | Queso. | assets/preguntas/t1/preg_imagen_de_queso_ama_150_t1.webp |
| (Imagen de un pastel rosa) What's this? | Un pastel. | assets/preguntas/t1/preg_imagen_de_un_pastel_151_t1.webp |
| (Imagen de un yogur morado) What's this? | Un yogur. | assets/preguntas/t1/preg_imagen_de_un_yogur_152_t1.webp |
| (Imagen de plátanos amarillos) What are these? | Plátanos. | assets/preguntas/t1/preg_imagen_de_pl_tanos_153_t1.webp |
| (Imagen de manzanas verdes) What are these? | Manzanas. | assets/preguntas/t1/preg_imagen_de_manzanas_154_t1.webp |
| (Imagen de naranjas) What are these? | Naranjas. | assets/preguntas/t1/preg_imagen_de_naranjas_155_t1.webp |
| (Imagen de chocolate) What's this? | Chocolate. | assets/preguntas/t1/preg_imagen_de_chocolate_156_t1.webp |
| (Imagen de un pollo asado) What's this? | Pollo. | assets/preguntas/t1/preg_imagen_de_un_pollo_157_t1.webp |
| Do you like pizza? (Imagen de un niño sonriendo con pizza) | Niño feliz con pizza. | assets/preguntas/t1/preg_do_you_like_pizza_158_t1.webp |
| Do you like yoghurt? (Imagen de una niña haciendo gesto de "no") | Niña rechazando yogur. | assets/preguntas/t1/preg_do_you_like_yoghurt_159_t1.webp |
| (Imagen de plátanos) I like... | Plátanos. | assets/preguntas/t1/preg_imagen_de_pl_tanos_160_t1.webp |
| (Imagen de manzanas) I like... | Manzanas. | assets/preguntas/t1/preg_imagen_de_manzanas_161_t1.webp |
| (Imagen de chocolate con una X) I ______ like chocolate. | Chocolate tachado. | assets/preguntas/t1/preg_imagen_de_chocolate_162_t1.webp |
| (Imagen de un pollo con una X) I ______ like chicken. | Pollo tachado. | assets/preguntas/t1/preg_imagen_de_un_pollo_163_t1.webp |
| (Imagen de una pizza y carita feliz) I ______ pizza. | Pizza con carita feliz. | assets/preguntas/t1/preg_imagen_de_una_pizza_164_t1.webp |
| (Imagen de naranjas y carita triste) I ______ oranges. | Naranjas con carita triste. | assets/preguntas/t1/preg_imagen_de_naranjas_165_t1.webp |
| (Imagen de Charlie y el pájaro Chippy con chocolate) Charlie and Chippy like... | Charlie y Chippy con chocolate. | assets/preguntas/t1/preg_imagen_de_charlie_y_166_t1.webp |
| (Imagen de Charlie y el pájaro Chippy con pollo) Charlie and Chippy like... | Charlie y Chippy con pollo. | assets/preguntas/t1/preg_imagen_de_charlie_y_167_t1.webp |
| Do you like cake? (Imagen de una niña feliz con pastel) | Niña feliz con pastel. | assets/preguntas/t1/preg_do_you_like_cake___i_168_t1.webp |
| (Imagen de un tren de juguete) What's this? | Tren de juguete. | assets/preguntas/t1/preg_imagen_de_un_tren_d_169_t1.webp |
| (Imagen de una pelota de colores) What's this? | Una pelota. | assets/preguntas/t1/preg_imagen_de_una_pelot_170_t1.webp |
| (Imagen de un perrito de juguete) What's this toy? | Un puppy de juguete. | assets/preguntas/t1/preg_imagen_de_un_perrit_171_t1.webp |
| (Imagen de un dormitorio con cama) What room is this? | Un dormitorio. | assets/preguntas/t1/preg_imagen_de_un_dormit_172_t1.webp |
| (Imagen de una cocina con estufa) What room is this? | Una cocina. | assets/preguntas/t1/preg_imagen_de_una_cocin_173_t1.webp |
| (Imagen de un sol brillante) How is the weather? | Clima soleado. | assets/preguntas/t1/preg_imagen_de_un_sol_br_174_t1.webp |
| (Imagen de lluvia) How is the weather? | Clima lluvioso. | assets/preguntas/t1/preg_imagen_de_lluvia__h_175_t1.webp |
| (Imagen de una camiseta/T-shirt) What's this? | Una camiseta. | assets/preguntas/t1/preg_imagen_de_una_camis_176_t1.webp |
| (Imagen de unos zapatos) What are these? | Zapatos. | assets/preguntas/t1/preg_imagen_de_unos_zapa_177_t1.webp |
| (Imagen de un niño jugando con un tren) I'm playing with my... | Niño con tren. | assets/preguntas/t1/preg_imagen_de_un_ni_o_j_178_t1.webp |
| (Imagen de una niña jugando con una pelota) I'm playing with my... | Niña con pelota. | assets/preguntas/t1/preg_imagen_de_una_ni_a_179_t1.webp |
| (Imagen de un niño con un peluche) I'm playing with my... | Niño con oso de peluche. | assets/preguntas/t1/preg_imagen_de_un_ni_o_c_180_t1.webp |
| Is it a toy? (Imagen de un tren) | Tren de madera. | assets/preguntas/t1/preg_is_it_a_toy___imagen_181_t1.webp |
| Is it a house? (Imagen de una casa) | Una casa. | assets/preguntas/t1/preg_is_it_a_house___imag_182_t1.webp |
| Come and ______! (Niños jugando) | Niños jugando. | assets/preguntas/t1/preg_come_and__________ni_183_t1.webp |
| (Imagen de un pez en una cama) Is the fish in the bedroom? | Un pez acostado en una cama. | assets/preguntas/t1/preg_imagen_de_un_pez_en_184_t1.webp |
| (Imagen de una mochila en el horno) Is the school bag in the oven? | Mochila dentro de un horno. | assets/preguntas/t1/preg_imagen_de_una_mochi_185_t1.webp |
| (Imagen de una jirafa con mochila) Is the giraffe going to school? | Jirafa con mochila escolar. | assets/preguntas/t1/preg_imagen_de_una_jiraf_186_t1.webp |
| (Imagen de una manzana azul) Is this apple blue? | Una manzana de color azul. | assets/preguntas/t1/preg_imagen_de_una_manza_187_t1.webp |
| (Imagen de un gato en un estuche) Is the cat in the pencil case? | Gato dentro de un estuche. | assets/preguntas/t1/preg_imagen_de_un_gato_e_188_t1.webp |
| (Imagen de un elefante en una lonchera) Is the elephant in the lunchbox? | Elefante pequeño en una lonchera. | assets/preguntas/t1/preg_imagen_de_un_elefan_189_t1.webp |
| (Imagen de una pizza con lápices) Do you like pencil pizza? | Pizza con trozos de lápiz. | assets/preguntas/t1/preg_imagen_de_una_pizza_190_t1.webp |
| (Imagen de un libro en el refrigerador) Is the book in the fridge? | Libro en el refrigerador. | assets/preguntas/t1/preg_imagen_de_un_libro_191_t1.webp |
| (Imagen de una regla con cara y brazos) Is the ruler my sister? | Regla con cara humana. | assets/preguntas/t1/preg_imagen_de_una_regla_192_t1.webp |
| (Imagen de un niño con la mochila como sombrero) Is the school bag a hat? | Niño usando mochila en la cabeza. | assets/preguntas/t1/preg_imagen_de_un_ni_o_c_193_t1.webp |
## Categoría: Lenguaje

| Pregunta | Descripción | Ruta Sugerida |
| :--- | :--- | :--- |
| Según el texto "Aprendo la Z", ¿dónde se escondió el zorro ingenioso? | Un zorro asomando la cabeza entre pastos verdes y altos | assets/preguntas/t1/preg_seg_n_el_texto__apre_001_t1.webp |
| ¿Qué animal puso un huevo en la cocina en el poema? | Una gallina blanca junto a una fila de huevos sobre paja | assets/preguntas/t1/preg_qu__animal_puso_un_002_t1.webp |
| ¿Qué animal vive en los "campos de agua y sal" según el poema Cosecha? | Peces azules de cara negra nadando entre corales naranjos | assets/preguntas/t1/preg_qu__animal_vive_en_003_t1.webp |
| ¿Qué animal vuela y tiene alas de colores? | Una mariposa azul volando cerca de un niño en un árbol | assets/preguntas/t1/preg_qu__animal_vuela_y_004_t1.webp |
| ¿Qué fruta parece una sonrisa cuando se corta en rodajas? | Una mesa con cuatro platos y rodajas de melón en forma de sonrisa | assets/preguntas/t1/preg_qu__fruta_parece_un_005_t1.webp |
| ¿Qué vitamina tienen las naranjas que nos ayuda en invierno? | Varias naranjas cortadas por la mitad mostrando su jugo | assets/preguntas/t1/preg_qu__vitamina_tienen_006_t1.webp |
| ¿Qué fruta crece en racimos y puede ser verde o morada? | Un frutero con racimos de uvas verdes y moradas | assets/preguntas/t1/preg_qu__fruta_crece_en_007_t1.webp |
| ¿Qué fruta tiene un cuesco grande y rima con abuela? | Una ciruela partida mostrando su cuesco café | assets/preguntas/t1/preg_qu__fruta_tiene_un_008_t1.webp |
| ¿Qué elemento del cielo ayuda a las plantas a crecer y hace que los personajes canten? | Un árbol de naranjas bajo un gran sol amarillo | assets/preguntas/t1/preg_qu__elemento_del_ci_009_t1.webp |
| ¿Dónde guardamos los cuadernos para ir a la escuela? | Una mochila escolar abierta con libros adentro | assets/preguntas/t1/preg_d_nde_guardamos_los_010_t1.webp |
| ¿Qué objeto usamos para dormir que tiene una almohada de manzana en el dibujo? | Una cama de madera con una almohada que tiene una manzana roja dibujada | assets/preguntas/t1/preg_qu__objeto_usamos_p_011_t1.webp |
| ¿Qué objeto vuela y está hecho de papel en el dibujo del parque? | Un niño con polera azul lanzando un avión de papel blanco | assets/preguntas/t1/preg_qu__objeto_vuela_y_012_t1.webp |
| ¿Qué objeto usa la niña para ver cosas pequeñas en el dibujo? | Una niña con anteojos mirando flores a través de una lupa | assets/preguntas/t1/preg_qu__objeto_usa_la_n_013_t1.webp |
| Si el sol está brillante y resplandeciente, ¿cómo se llama ese día? | Un campo verde bajo un sol radiante con rayos amarillos | assets/preguntas/t1/preg_si_el_sol_est__brill_014_t1.webp |
| Si hay nubes grises, lluvia y frío, ¿qué estación del año es? | Un paisaje con lluvia fuerte y nubes oscuras | assets/preguntas/t1/preg_si_hay_nubes_grises_015_t1.webp |
| ¿Cómo se siente el niño que tiene una lágrima en su mejilla? | Un niño pequeño con una polera roja y una lágrima cayendo de su ojo | assets/preguntas/t1/preg_c_mo_se_siente_el_n_016_t1.webp |
| Si vemos a una niña saltando con los brazos arriba en el muro rojo, ¿cómo está? | Una niña saltando con mucha energía frente a un muro de color rojo y blanco | assets/preguntas/t1/preg_si_vemos_a_una_ni_a_017_t1.webp |
## Categoría: Logica Acertijos

| Pregunta | Descripción | Ruta Sugerida |
| :--- | :--- | :--- |
| Para ser más elegante no usa guante ni chaqué, solo cambia en un instante por una "f" la "g". (Dibujo de un elefante usando un sombrero de copa) | Dibujo de un elefante usando un sombrero de copa. | assets/preguntas/t1/preg_para_ser_m_s_elegant_001_t1.webp |
| ¿Cuál es el animal que come con las patas? (Dibujo de un pato nadando en un estanque) | Dibujo de un pato nadando en un estanque. | assets/preguntas/t1/preg_cu_l_es_el_animal_q_002_t1.webp |
| Cuando nada en los ríos parece un tronco flotante, pero si muestra sus dientes todos huyen al instante. (Dibujo de un cocodrilo con la boca abierta mostrando los dientes) | Dibujo de un cocodrilo con la boca abierta mostrando los dientes. | assets/preguntas/t1/preg_cuando_nada_en_los_r_003_t1.webp |
| Viste de chaleco blanco y también de negro frac, es un ave que no vuela, pero nada. (Dibujo de un pingüino sobre un bloque de hielo) | Dibujo de un pingüino sobre un bloque de hielo. | assets/preguntas/t1/preg_viste_de_chaleco_bla_004_t1.webp |
| Si hay una carrera en el mar, ¿quién es el último en llegar? (Dibujo de un delfín feliz saltando una ola) | Dibujo de un delfín feliz saltando una ola. | assets/preguntas/t1/preg_si_hay_una_carrera_e_005_t1.webp |
| Zumba que te zumba, van y vienen sin descanso, de flor en flor trajinando y nuestra vida endulzando. (Dibujo de una abeja volando cerca de una flor roja) | Dibujo de una abeja volando cerca de una flor roja. | assets/preguntas/t1/preg_zumba_que_te_zumba_006_t1.webp |
| Adivina quién soy yo: al ir parece que vengo y al venir es que me voy. (Dibujo de un cangrejo caminando de lado por la playa) | Dibujo de un cangrejo caminando de lado por la playa. | assets/preguntas/t1/preg_adivina_qui_n_soy_yo_007_t1.webp |
| No lo parezco y soy pez, y mi forma la refleja una pieza de ajedrez. (Dibujo de un caballito de mar bajo el agua) | Dibujo de un caballito de mar bajo el agua. | assets/preguntas/t1/preg_no_lo_parezco_y_soy_008_t1.webp |
| En alto vive, en alto mora, en alto teje, la tejedora. (Dibujo de una araña colgando de su tela) | Dibujo de una araña colgando de su tela. | assets/preguntas/t1/preg_en_alto_vive__en_alt_009_t1.webp |
| Soy un señor muy elegante y excelente nadador, y puedo hacer con mi cuello signos de interrogación. (Dibujo de un cisne blanco nadando en un lago tranquilo) | Dibujo de un cisne blanco nadando en un lago tranquilo. | assets/preguntas/t1/preg_soy_un_se_or_muy_ele_010_t1.webp |
| La jaula es su casa, su ropaje amarillo, y con su canto alegra a todos los vecinos. (Dibujo de un canario amarillo cantando dentro de su jaula) | Dibujo de un canario amarillo cantando dentro de su jaula. | assets/preguntas/t1/preg_la_jaula_es_su_casa_011_t1.webp |
| Donde nadie sube, trepo, donde nadie anda, trisco, muy poco estoy en el valle, pues lo mío son los riscos. (Dibujo de una cabra saltando entre rocas de una montaña) | Dibujo de una cabra saltando entre rocas de una montaña. | assets/preguntas/t1/preg_donde_nadie_sube__tr_012_t1.webp |
| Salta y salta por los montes, usa las patas de atrás, su nombre ya te lo he dicho, fíjate y lo verás. (Dibujo de un saltamontes verde sobre una hoja) | Dibujo de un saltamontes verde sobre una hoja. | assets/preguntas/t1/preg_salta_y_salta_por_lo_013_t1.webp |
| ¿Cuál es el animal que es dos veces animal? (Dibujo de un gato estirándose con sus garras afuera) | Dibujo de un gato estirándose con sus garras afuera. | assets/preguntas/t1/preg_cu_l_es_el_animal_q_014_t1.webp |
| Te doy leche y mi lana, y para hablar digo: «beeeee», si no adivinas mi nombre yo nunca te lo diré. (Dibujo de una oveja blanca en un prado verde) | Dibujo de una oveja blanca en un prado verde. | assets/preguntas/t1/preg_te_doy_leche_y_mi_la_015_t1.webp |
| Un solo portero, un solo inquilino, tu casa redonda la llevas contigo. (Dibujo de un caracol arrastrándose por el suelo) | Dibujo de un caracol arrastrándose por el suelo. | assets/preguntas/t1/preg_un_solo_portero__un_016_t1.webp |
| Chiquitín y danzarín, pasa las noches rondando con lanza y con cornetín. (Dibujo de un pequeño mosquito volando) | Dibujo de un pequeño mosquito volando. | assets/preguntas/t1/preg_chiquit_n_y_danzar_n_017_t1.webp |
| Tiene lamparitas de luz verde y cuando es de noche, las enciende. (Dibujo de una luciérnaga brillando en el bosque de noche) | Dibujo de una luciérnaga brillando en el bosque de noche. | assets/preguntas/t1/preg_tiene_lamparitas_de_018_t1.webp |
| Mi nombre lo leo, mi apellido es pardo, quién no lo adivine, es un poco tardo. (Dibujo de un leopardo descansando sobre la rama de un árbol) | Dibujo de un leopardo descansando sobre la rama de un árbol. | assets/preguntas/t1/preg_mi_nombre_lo_leo__mi_019_t1.webp |
| De China vengo, en Murcia vivo, como morera, seda fabrico. (Dibujo de un gusano de seda comiendo una hoja de morera) | Dibujo de un gusano de seda comiendo una hoja de morera. | assets/preguntas/t1/preg_de_china_vengo__en_m_020_t1.webp |
| Blanca por dentro, verde por fuera. Si quieres que te lo diga, espera. (Dibujo de una pera verde y madura) | Dibujo de una pera verde y madura. | assets/preguntas/t1/preg_blanca_por_dentro__v_021_t1.webp |
| La A, anda. La B, besa. La C, reza. ¿Qué fruta es esa? (Dibujo de dos cerezas rojas unidas por sus tallos) | Dibujo de dos cerezas rojas unidas por sus tallos. | assets/preguntas/t1/preg_la_a__anda__la_b__be_022_t1.webp |
| Verde fue mi nacimiento y de luto me vestí; los palos me atormentaron y oro fino me volví. (Dibujo de aceitunas verdes y negras en una rama) | Dibujo de aceitunas verdes y negras en una rama. | assets/preguntas/t1/preg_verde_fue_mi_nacimie_023_t1.webp |
| En blanco pañal nací, en verde me transformé, y durante el crecimiento, amarillo me quedé. (Dibujo de un limón amarillo brillante) | Dibujo de un limón amarillo brillante. | assets/preguntas/t1/preg_en_blanco_pa_al_nac_024_t1.webp |
| Soy un viejo arrugadito, que si me echan al agua, salgo mucho más gordito. (Dibujo de varios garbanzos secos) | Dibujo de varios garbanzos secos. | assets/preguntas/t1/preg_soy_un_viejo_arrugad_025_t1.webp |
| Somos cien hermanitos, todos muy igualitos y estamos encerrados en un globo bonito. (Dibujo de piñones saliendo de una piña de pino) | Dibujo de piñones saliendo de una piña de pino. | assets/preguntas/t1/preg_somos_cien_hermanito_026_t1.webp |
| Amarillo por fuera, amarillo por dentro, y con un corazón en el centro. (Dibujo de un durazno abierto mostrando su cuesco) | Dibujo de un durazno abierto mostrando su cuesco. | assets/preguntas/t1/preg_amarillo_por_fuera_027_t1.webp |
| Agua pasa por mi casa, cate por mi corazón. El que no lo adivinara, será un poco cabezón. (Dibujo de una palta cortada a la mitad) | Dibujo de una palta cortada a la mitad. | assets/preguntas/t1/preg_agua_pasa_por_mi_cas_028_t1.webp |
| Col es parte de mi nombre, mi apellido es floral, más si lo quieres saber a la huerta has de marchar. (Dibujo de una coliflor fresca de la huerta) | Dibujo de una coliflor fresca de la huerta. | assets/preguntas/t1/preg_col_es_parte_de_mi_n_029_t1.webp |
| Blanca soy y como dice mi vecina, útil siempre soy en la cocina. (Dibujo de un saco de harina abierto) | Dibujo de un saco de harina abierto. | assets/preguntas/t1/preg_blanca_soy_y_como_di_030_t1.webp |
| Cuanto más caliente, más fresco y crujiente. (Dibujo de un trozo de pan crujiente y humeante) | Dibujo de un trozo de pan crujiente y humeante. | assets/preguntas/t1/preg_cuanto_m_s_caliente_031_t1.webp |
| Un palito muy derechito y en su cabeza un sombrerito. (Dibujo de un hongo rojo con puntitos blancos) | Dibujo de un hongo rojo con puntitos blancos. | assets/preguntas/t1/preg_un_palito_muy_derech_032_t1.webp |
| ¿Qué se corta sin tijeras y aunque a veces sube y sube nunca usa la escalera? (Dibujo de un cartón de leche volcándose en un vaso) | Dibujo de un cartón de leche volcándose en un vaso. | assets/preguntas/t1/preg_qu__se_corta_sin_ti_033_t1.webp |
| Siempre mirando al sol y no soy un caracol. Giro y giro sin fin y no soy un bailarín. (Dibujo de un girasol siguiendo la luz del sol) | Dibujo de un girasol siguiendo la luz del sol. | assets/preguntas/t1/preg_siempre_mirando_al_s_034_t1.webp |
| De mi tronco herido sacan la resina. En las piñas guardo todas mis semillas. (Dibujo de un pino verde en el bosque) | Dibujo de un pino verde en el bosque. | assets/preguntas/t1/preg_de_mi_tronco_herido_035_t1.webp |
| Su cabeza es amarilla, siguiendo al sol, gira y gira, muchos comen sus pepitas y dicen que son muy ricas. (Dibujo de una flor de girasol con sus semillas negras visibles) | Dibujo de una flor de girasol con sus semillas negras visibles. | assets/preguntas/t1/preg_su_cabeza_es_amarill_036_t1.webp |
| En primavera te deleito, en verano te refresco, en otoño te alimento, y en invierno te caliento. (Dibujo de un gran roble con muchas hojas verdes) | Dibujo de un gran roble con muchas hojas verdes. | assets/preguntas/t1/preg_en_primavera_te_dele_037_t1.webp |
| Aunque tengo cuatro patas, yo nunca puedo correr, tengo la comida encima, y no la puedo comer. (Dibujo de una mesa puesta con platos y cubiertos) | Dibujo de una mesa puesta con platos y cubiertos. | assets/preguntas/t1/preg_aunque_tengo_cuatro_038_t1.webp |
| Me compran para dormir y me encanta sacudir. ¿Qué soy? (Dibujo de una almohada blanca y mullida) | Dibujo de una almohada blanca y mullida. | assets/preguntas/t1/preg_me_compran_para_dorm_039_t1.webp |
| Tiene agua y no es botijo, está siempre en el jardín. Cada vez que se enrosca tiene pinta de reptil. (Dibujo de una manguera de jardín enroscada) | Dibujo de una manguera de jardín enroscada. | assets/preguntas/t1/preg_tiene_agua_y_no_es_b_040_t1.webp |
| Sube llena, baja vacía, y si no se da prisa, la sopa se enfría. (Dibujo de una cuchara sopera humeante) | Dibujo de una cuchara sopera humeante. | assets/preguntas/t1/preg_sube_llena__baja_vac_041_t1.webp |
| En los baños suelo estar, aunque provengo del mar. (Dibujo de una esponja de mar amarilla) | Dibujo de una esponja de mar amarilla. | assets/preguntas/t1/preg_en_los_ba_os_suelo_e_042_t1.webp |
| Locomotora no soy, mucho con vapor doy, dejo muy alisado, si me usan con cuidado. (Dibujo de una plancha soltando vapor sobre una camisa) | Dibujo de una plancha soltando vapor sobre una camisa. | assets/preguntas/t1/preg_locomotora_no_soy__m_043_t1.webp |
| Una vieja con un diente que llama a toda la gente. (Dibujo de una campana de bronce sonando) | Dibujo de una campana de bronce sonando. | assets/preguntas/t1/preg_una_vieja_con_un_die_044_t1.webp |
| Marfil y madera fina, a tocarnos con talento, el que no sabe, no atina. (Dibujo de un teclado de piano de cerca) | Dibujo de un teclado de piano de cerca. | assets/preguntas/t1/preg_marfil_y_madera_fina_045_t1.webp |
| Tiene una plancha arrugada y es un gran soplador, sentirás que mucho gime si le tocas un botón. (Dibujo de un acordeón abierto) | Dibujo de un acordeón abierto. | assets/preguntas/t1/preg_tiene_una_plancha_ar_046_t1.webp |
| Soy pequeño y de madera, tengo un arco y no flecha. Me pones entre hombro y barbilla. (Dibujo de un violín y su arco) | Dibujo de un violín y su arco. | assets/preguntas/t1/preg_soy_peque_o_y_de_mad_047_t1.webp |
| En el bosque nací, en el bosque crecí y, cuando instrumento fui, al soplar música oí. (Dibujo de una flauta dulce de madera) | Dibujo de una flauta dulce de madera. | assets/preguntas/t1/preg_en_el_bosque_nac___e_048_t1.webp |
| Se toca con dos palillos, sale siempre en la procesión y es un instrumento de percusión. (Dibujo de un tambor de banda escolar con sus baquetas) | Dibujo de un tambor de banda escolar con sus baquetas. | assets/preguntas/t1/preg_se_toca_con_dos_pali_049_t1.webp |
| Con varillas me sostengo y con la lluvia voy y vengo. (Dibujo de un paraguas abierto de colores) | Dibujo de un paraguas abierto de colores. | assets/preguntas/t1/preg_con_varillas_me_sost_050_t1.webp |
| Con dos patas encorvadas, y dos amplios ventanales, quitan sol o dan visión, según sean sus cristales. (Dibujo de un par de lentes de sol) | Dibujo de un par de lentes de sol. | assets/preguntas/t1/preg_con_dos_patas_encorv_051_t1.webp |
| Un tren descarrila justo en la frontera entre España y Francia. ¿Dónde entierran a los supervivientes? (Dibujo de un tren de pasajeros avanzando por el campo) | Dibujo de un tren de pasajeros avanzando por el campo. | assets/preguntas/t1/preg_un_tren_descarrila_j_052_t1.webp |
| ¿Qué mes tiene 28 días? (Dibujo de una hoja de calendario marcando el día 28\) | Dibujo de una hoja de calendario marcando el día 28. | assets/preguntas/t1/preg_qu__mes_tiene_28_d_053_t1.webp |
| ¿Qué tiene 88 llaves, pero no puede abrir una sola puerta? (Dibujo de un gran piano de cola negro) | Un gran piano de cola negro. | assets/preguntas/t1/preg_qu__tiene_88_llaves_054_t1.webp |
| Un hombre está atrapado en una sala con dos puertas. Detrás de una hay un sol que quema todo. Detrás de la otra hay un dragón que escupe fuego. ¿Cómo escapa? (Dibujo de una silueta frente a dos puertas misteriosas) | Dibujo de una silueta frente a dos puertas misteriosas. | assets/preguntas/t1/preg_un_hombre_est__atrap_055_t1.webp |
| ¿De qué se llena un bote si cuanto más lo llenas menos pesa? (Dibujo de un balde de metal con varios agujeros laterales) | Dibujo de un balde de metal con varios agujeros laterales. | assets/preguntas/t1/preg_de_qu__se_llena_un_056_t1.webp |
| ¿Qué viene una vez en un minuto, dos veces en un momento y nunca en mil años? (Dibujo de la letra "M" mayúscula decorada) | La letra "M" mayúscula decorada. | assets/preguntas/t1/preg_qu__viene_una_vez_e_057_t1.webp |
| Son hijos de tus abuelos, de tus padres hermanos son. (Dibujo de un hombre y una mujer saludando) | Dibujo de un hombre y una mujer saludando. | assets/preguntas/t1/preg_son_hijos_de_tus_abu_058_t1.webp |
| ¿Quién es la hermana de mi hermana que no es mi hermana? (Dibujo de una niña pequeña frente a un espejo) | Dibujo de una niña pequeña frente a un espejo. | assets/preguntas/t1/preg_qui_n_es_la_hermana_059_t1.webp |
| Empieza por «a» y no es ave, sin ser ave, vuela. (Dibujo de una abuela cariñosa tejiendo) | Dibujo de una abuela cariñosa tejiendo. | assets/preguntas/t1/preg_empieza_por__a__y_no_060_t1.webp |
| Dos hermanas, mentira no es, la una es mi tía, la otra no lo es. (Dibujo de dos hermanas adultas conversando) | Dibujo de dos hermanas adultas conversando. | assets/preguntas/t1/preg_dos_hermanas__mentir_061_t1.webp |
| Si mi madre tiene un hermano, ¿qué parentesco tengo con su hijo? (Dibujo de dos niños de la misma edad jugando con una pelota) | Dibujo de dos niños de la misma edad jugando con una pelota. | assets/preguntas/t1/preg_si_mi_madre_tiene_un_062_t1.webp |
| ¿Qué palabra empieza con A y termina con Z? (Dibujo de un cuenco de arroz blanco) | Dibujo de un cuenco de arroz blanco. | assets/preguntas/t1/preg_qu__palabra_empieza_063_t1.webp |
| Una madrastra la odia, una manzana la mata, un príncipe muy hermoso de la muerte la rescata. (Dibujo de Blancanieves sosteniendo una manzana roja) | Blancanieves sosteniendo una manzana roja. | assets/preguntas/t1/preg_una_madrastra_la_odi_064_t1.webp |
| La voz me quitaron para caminar y el príncipe amado me fue a rescatar. (Dibujo de una sirena con larga cabellera nadando entre peces) | Una sirena con larga cabellera nadando entre peces. | assets/preguntas/t1/preg_la_voz_me_quitaron_p_065_t1.webp |
| Con un rayo en la frente al peor mago hace frente. Con una escoba y una varita en los colegios le imitan. (Dibujo de un niño mago con una lechuza blanca) | Un niño mago con una lechuza blanca. | assets/preguntas/t1/preg_con_un_rayo_en_la_fr_066_t1.webp |
| Soy un ratón pequeñito, que de noche te visito, me llevo tu dientecito, y te dejo un regalito. (Dibujo de un ratoncito con una pequeña bolsa y una moneda de oro) | Un ratoncito con una pequeña bolsa y una moneda de oro. | assets/preguntas/t1/preg_soy_un_rat_n_peque_i_067_t1.webp |
## Categoría: Matematicas

| Pregunta | Descripción | Ruta Sugerida |
| :--- | :--- | :--- |
| ¿Cuántos lápices ves en la imagen? (Imagen de 3 lápices de colores) | Dibujo de tres lápices de colores (rojo, azul y verde) agrupados. | assets/preguntas/t1/preg_cu_ntos_l_pices_ves_001_t1.webp |
| ¿Cuántas manzanas hay en total? (Imagen de 2 manzanas rojas y 2 verdes) | Dibujo de dos manzanas rojas a la izquierda y dos manzanas verdes a la derecha. | assets/preguntas/t1/preg_cu_ntas_manzanas_ha_002_t1.webp |
| (Imagen del número 6) ¿Qué número es este? | El número 6 escrito en grande de color azul. | assets/preguntas/t1/preg_imagen_del_n_mero_6_003_t1.webp |
| ¿Cuántas flores hay en el dibujo? (Imagen de 5 flores amarillas) | Dibujo de cinco flores amarillas en un jardín. | assets/preguntas/t1/preg_cu_ntas_flores_hay_004_t1.webp |
| (Imagen de 2 gatos) Cuenta los gatos. | Dibujo de dos gatos pequeños jugando. | assets/preguntas/t1/preg_imagen_de_2_gatos_005_t1.webp |
| (Imagen de una mano abierta) ¿Cuántos dedos muestra la mano? | Dibujo de una mano humana con todos los dedos extendidos. | assets/preguntas/t1/preg_imagen_de_una_mano_006_t1.webp |
| ¿Cuántos soles hay en la imagen? (Imagen de 1 sol radiante) | Dibujo de un sol amarillo brillante con rayos. | assets/preguntas/t1/preg_cu_ntos_soles_hay_e_007_t1.webp |
| (Imagen de 3 estrellas) ¿Cuántas estrellas ves? | Dibujo de tres estrellas amarillas en el cielo. | assets/preguntas/t1/preg_imagen_de_3_estrell_008_t1.webp |
| (Imagen del número 8) ¿Qué número es este? | El número 8 de color verde. | assets/preguntas/t1/preg_imagen_del_n_mero_8_009_t1.webp |
| ¿Cuántos pajaritos hay en el árbol? (Imagen de 4 pajaritos) | Dibujo de un árbol con cuatro pájaros pequeños en las ramas. | assets/preguntas/t1/preg_cu_ntos_pajaritos_h_010_t1.webp |
| (Imagen de 10 círculos) Cuenta los círculos. | Dibujo de diez círculos de colores repartidos en la pantalla. | assets/preguntas/t1/preg_imagen_de_10_c_rcul_011_t1.webp |
| (Imagen de 1 libro) ¿Cuántos libros hay? | Dibujo de un libro cerrado de color rojo. | assets/preguntas/t1/preg_imagen_de_1_libro_012_t1.webp |
| (Imagen de 7 corazones) ¿Cuántos corazones ves? | Dibujo de siete corazones rojos pequeños. | assets/preguntas/t1/preg_imagen_de_7_corazon_013_t1.webp |
| (Imagen de 3 caramelos) ¿Cuántos dulces hay? | Dibujo de tres caramelos de distintos colores envueltos. | assets/preguntas/t1/preg_imagen_de_3_caramel_014_t1.webp |
| (Imagen del número 1) ¿Qué número es? | El número 1 de color naranja. | assets/preguntas/t1/preg_imagen_del_n_mero_1_015_t1.webp |
| (Imagen de 5 cubos) Cuenta los cubos. | Dibujo de cinco cubos de madera apilados. | assets/preguntas/t1/preg_imagen_de_5_cubos_016_t1.webp |
| (Imagen de 2 pelotas) ¿Cuántas pelotas hay? | Dibujo de dos pelotas de fútbol. | assets/preguntas/t1/preg_imagen_de_2_pelotas_017_t1.webp |
| (Imagen del número 3) ¿Qué número es este? | El número 3 de color morado. | assets/preguntas/t1/preg_imagen_del_n_mero_3_018_t1.webp |
| (Imagen de 4 mariposas) ¿Cuántas mariposas ves? | Dibujo de cuatro mariposas de colores volando. | assets/preguntas/t1/preg_imagen_de_4_maripos_019_t1.webp |
| (Imagen de 8 lápices) Cuenta los lápices. | Dibujo de ocho lápices de colores ordenados en fila. | assets/preguntas/t1/preg_imagen_de_8_l_pices_020_t1.webp |
| (Imagen de 6 manzanas) ¿Cuántas frutas hay? | Dibujo de seis manzanas rojas en una canasta. | assets/preguntas/t1/preg_imagen_de_6_manzana_021_t1.webp |
| (Imagen del número 5) ¿Qué número es? | El número 5 de color amarillo. | assets/preguntas/t1/preg_imagen_del_n_mero_5_022_t1.webp |
| (Imagen de 9 estrellas) Cuenta las estrellas. | Dibujo de nueve estrellas blancas pequeñas. | assets/preguntas/t1/preg_imagen_de_9_estrell_023_t1.webp |
| (Imagen de 3 perritos) ¿Cuántos animales ves? | Dibujo de tres cachorros de perro saltando. | assets/preguntas/t1/preg_imagen_de_3_perrito_024_t1.webp |
| (Imagen del número 10) ¿Qué número es este? | El número 10 de color rojo brillante. | assets/preguntas/t1/preg_imagen_del_n_mero_1_025_t1.webp |
| (Imagen de un cuadrado) ¿Qué forma es esta? | Dibujo de un cuadrado perfecto de color rojo. | assets/preguntas/t1/preg_imagen_de_un_cuadra_026_t1.webp |
| (Imagen de un círculo) ¿Qué forma es esta? | Dibujo de un círculo de color amarillo. | assets/preguntas/t1/preg_imagen_de_un_c_rcul_027_t1.webp |
| (Imagen de un triángulo) ¿Qué forma es esta? | Dibujo de un triángulo de color verde. | assets/preguntas/t1/preg_imagen_de_un_tri_ng_028_t1.webp |
| (Imagen de una pizza redonda) ¿Qué forma tiene la pizza entera? | Dibujo de una pizza completa sobre un plato. | assets/preguntas/t1/preg_imagen_de_una_pizza_029_t1.webp |
| (Imagen de un rectángulo) ¿Qué forma es esta? | Dibujo de un rectángulo alargado de color azul. | assets/preguntas/t1/preg_imagen_de_un_rect_n_030_t1.webp |
| (Imagen de una ventana cuadrada) ¿Qué forma tiene la ventana? | Dibujo de una ventana de casa con cuatro vidrios. | assets/preguntas/t1/preg_imagen_de_una_venta_031_t1.webp |
| (Imagen de una carpa de circo con techo de punta) ¿Qué forma tiene el techo de la carpa? | Dibujo de una carpa de circo colorida. | assets/preguntas/t1/preg_imagen_de_una_carpa_032_t1.webp |
| (Imagen de un dado) ¿Qué forma tienen las caras de un dado? | Dibujo de un dado blanco con puntos negros. | assets/preguntas/t1/preg_imagen_de_un_dado_033_t1.webp |
| ¿Cuál es más largo? (Imagen de un lápiz largo y uno corto) | Dibujo de dos lápices amarillos, uno mucho más largo que el otro. | assets/preguntas/t1/preg_cu_l_es_m_s_largo_034_t1.webp |
| (Imagen de 12 flores) ¿Cuántas flores hay? | Dibujo de doce flores pequeñas en un prado. | assets/preguntas/t1/preg_imagen_de_12_flores_035_t1.webp |
| (Imagen del número 20) ¿Qué número es este? | El número 20 de color verde brillante. | assets/preguntas/t1/preg_imagen_del_n_mero_2_036_t1.webp |
| (Imagen de 15 manzanas) Cuenta las manzanas. | Dibujo de quince manzanas rojas apiladas. | assets/preguntas/t1/preg_imagen_de_15_manzan_037_t1.webp |
| (Imagen de 11 estrellas) ¿Cuántas estrellas ves? | Dibujo de once estrellas brillantes en el cielo nocturno. | assets/preguntas/t1/preg_imagen_de_11_estrel_038_t1.webp |
| (Imagen del número 16) ¿Qué número es? | El número 16 de color naranja. | assets/preguntas/t1/preg_imagen_del_n_mero_1_039_t1.webp |
| (Imagen de 14 pelotas) ¿Cuántas pelotas hay? | Dibujo de catorce pelotas de tenis verdes. | assets/preguntas/t1/preg_imagen_de_14_pelota_040_t1.webp |
| (Imagen de 18 lápices) Cuenta los lápices. | Dibujo de dieciocho lápices de grafito juntos. | assets/preguntas/t1/preg_imagen_de_18_l_pice_041_t1.webp |
| ¿Qué es más pesado? (Imagen de una hormiga y un elefante) | Dibujo de una hormiga pequeña a la izquierda y un elefante grande a la derecha. | assets/preguntas/t1/preg_qu__es_m_s_pesado_042_t1.webp |
| (Imagen de un balde con agua y un vaso con agua) ¿Cuál tiene más agua? | Dibujo de un balde lleno de agua y un vaso pequeño también lleno. | assets/preguntas/t1/preg_imagen_de_un_balde_043_t1.webp |
| (Imagen de una bufanda larga y una corta) ¿Cuál es la más corta? | Dibujo de dos bufandas de lana estiradas en el suelo. | assets/preguntas/t1/preg_imagen_de_una_bufan_044_t1.webp |
| (Imagen de una caja llena y una vacía) ¿Cuál caja está vacía? | Dibujo de dos cajas de cartón abiertas, una llena de ositos y otra sin nada. | assets/preguntas/t1/preg_imagen_de_una_caja_045_t1.webp |
| (Imagen de un lápiz grueso y uno delgado) ¿Cuál es el más delgado? | Dibujo de dos lápices de colores, uno muy ancho y el otro muy fino. | assets/preguntas/t1/preg_imagen_de_un_l_piz_046_t1.webp |
| (Imagen de 2 grupos de dulces: uno con 3 y otro con 5) ¿Qué grupo tiene más? | Dibujo de dos platos con dulces de colores. | assets/preguntas/t1/preg_imagen_de_2_grupos_047_t1.webp |
| (Imagen de una serie de números: 1, 2, 3, 1, 2, 3, 1, 2, __) ¿Qué número sigue? | Una línea con números escritos en orden repetitivo. | assets/preguntas/t1/preg_imagen_de_una_serie_048_t1.webp |
| (Imagen de 6 estrellas y 4 lunas) ¿Cuántas figuras hay en total? | Dibujo de estrellas y lunas repartidas por el cielo. | assets/preguntas/t1/preg_imagen_de_6_estrell_049_t1.webp |
| (Imagen de un reloj marcando las 3:00) ¿Qué hora es? | Dibujo de un reloj de pared con los números claros. | assets/preguntas/t1/preg_imagen_de_un_reloj_050_t1.webp |
| (Imagen de 1 barra de diez cubos y 3 cubos sueltos) ¿Qué número es? | Dibujo de bloques multibase (una barra y tres cubitos). | assets/preguntas/t1/preg_imagen_de_1_barra_d_051_t1.webp |
| (Imagen de una fila de niños. Juan es el primero y María la segunda) ¿En qué lugar está María? | Dibujo de cinco niños haciendo fila para entrar a clases. | assets/preguntas/t1/preg_imagen_de_una_fila_052_t1.webp |
| (Imagen de 2 platos: uno con 10 uvas y otro con 8) ¿Cuál tiene menos? | Dibujo de dos recipientes con frutas. | assets/preguntas/t1/preg_imagen_de_2_platos_053_t1.webp |
| (Imagen de 3 grupos de flores: 2 rojas, 3 azules y 1 amarilla) ¿Cuántas hay en total? | Dibujo de flores de distintos colores en un ramo. | assets/preguntas/t1/preg_imagen_de_3_grupos_054_t1.webp |
| (Imagen de una torta con 7 velas) ¿Cuántos años cumple el niño? | Dibujo de una torta de cumpleaños con velas encendidas. | assets/preguntas/t1/preg_imagen_de_una_torta_055_t1.webp |
| (Imagen del número 18) ¿Qué número es este? | El número 18 de color celeste. | assets/preguntas/t1/preg_imagen_del_n_mero_1_056_t1.webp |
| (Imagen de 5 lápices azules y 5 rojos) ¿Cuántos hay en total? | Dibujo de diez lápices de colores divididos en dos grupos. | assets/preguntas/t1/preg_imagen_de_5_l_pices_057_t1.webp |
| (Imagen de una mano mostrando 3 dedos) ¿Cuántos faltan para llegar a 5? | Dibujo de una mano con los dedos índice, medio y anular levantados. | assets/preguntas/t1/preg_imagen_de_una_mano_058_t1.webp |
| (Imagen de 4 patitos en el agua y 2 fuera) ¿Cuántos patos hay? | Dibujo de una laguna con patitos nadando y otros en la orilla. | assets/preguntas/t1/preg_imagen_de_4_patitos_059_t1.webp |
| (Imagen de 7 nubes blancas) Cuenta las nubes. | Dibujo de un cielo azul con nubes blancas. | assets/preguntas/t1/preg_imagen_de_7_nubes_b_060_t1.webp |
| (Imagen de 5 hormigas en fila) ¿Qué hormiga es la que va al final? | Dibujo de cinco hormigas pequeñas caminando una tras otra. | assets/preguntas/t1/preg_imagen_de_5_hormiga_061_t1.webp |
| (Imagen del número 12) ¿Qué número es? | El número 12 de color rosa. | assets/preguntas/t1/preg_imagen_del_n_mero_1_062_t1.webp |
| (Imagen de 5 globos de colores) ¿Cuántos globos hay? | Dibujo de cinco globos flotando atados a cuerdas. | assets/preguntas/t1/preg_imagen_de_5_globos_063_t1.webp |
| (Imagen de 2 cestas: una con 5 huevos y otra con 5 huevos) ¿Cuántos hay en total? | Dibujo de dos canastas de mimbre con huevos blancos adentro. | assets/preguntas/t1/preg_imagen_de_2_cestas_064_t1.webp |
| (Imagen del número 14) ¿Qué número es este? | El número 14 de color lila. | assets/preguntas/t1/preg_imagen_del_n_mero_1_065_t1.webp |
| (Imagen de 3 manzanas y te quitan 3) ¿Cuántas quedan? | Dibujo de un plato que antes tenía manzanas y ahora está vacío. | assets/preguntas/t1/preg_imagen_de_3_manzana_066_t1.webp |
| (Imagen de una mano mostrando los 5 dedos) ¿Cuántos dedos hay? | Dibujo de una mano abierta. | assets/preguntas/t1/preg_imagen_de_una_mano_067_t1.webp |
| (Imagen del número 17) ¿Qué número es? | El número 17 de color café claro. | assets/preguntas/t1/preg_imagen_del_n_mero_1_068_t1.webp |

## Assets Adicionales Tier 1 (Estilo Clay)

| Componente | Tipo | Descripción | Ruta Sugerida |
| :--- | :--- | :--- | :--- |
| Mascota | Panda | Panda 3D redondeado suave | ssets/mascotas/tier1/panda_t1.webp |
| Mascota | Gato | Gatito clay tierno | ssets/mascotas/tier1/cat_t1.webp |
| Mascota | Perro | Cachorro clay orejón | ssets/mascotas/tier1/dog_t1.webp |
| Insignia | Bronce | Estrella de plastilina bronce | ssets/badges/tier1/badge_bronce_t1.webp |
| Insignia | Plata | Estrella de plastilina plata | ssets/badges/tier1/badge_plata_t1.webp |
| Insignia | Oro | Estrella de plastilina oro | ssets/badges/tier1/badge_oro_t1.webp |
| Accesorio | Gorra | Gorra deportiva clay | ssets/accesorios/tier1/cap_t1.webp |
| Accesorio | Mago | Sombrero de mago clay | ssets/accesorios/tier1/wizard_t1.webp |