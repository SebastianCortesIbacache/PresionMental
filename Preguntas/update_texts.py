import os

def update_file(path, replacements):
    if not os.path.exists(path):
        return
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    for old, new in replacements:
        content = content.replace(old, new)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

# Update Logica Acertijos
acertijos_path = r"e:\Presion Mental APP\Preguntas\6 a 7\Logica Acertijos 6 a 7 años.md"
update_file(acertijos_path, [
    ("116- Cuerpo de palo, cabeza de color, me encienden con cuidado y doy mucho calor. [A. La cerilla B. La vela C. El carbón D. La lámpara] | Respuesta: A | Imagen: No",
     "116- Cuerpo de palo, cabeza de color, me encienden con cuidado y doy mucho calor. [A. El fósforo B. La vela C. El carbón D. La lámpara] | Respuesta: A | Imagen: Sí \\- Dibujo de un fósforo encendido con su cabeza roja brillando")
])

# Update Seleccion_Lanzamiento_200.md
seleccion_path = r"e:\Presion Mental APP\Preguntas\Seleccion_Lanzamiento_200.md"
replacements = [
    # Ciencias
    ("1- ¿Cuál de estos sentidos te permite ver el color de un \"siete colores\" que vuela en el cielo? [A. La visión B. El gusto C. La audición D. El olfato] | Respuesta: A | Imagen: No",
     "1- ¿Cuál de estos sentidos te permite ver el color de un \"siete colores\" que vuela en el cielo? [A. La visión B. El gusto C. La audición D. El olfato] | Respuesta: A | Imagen: Sí \\- Un picaflor (siete colores) volando cerca de una flor"),
    ("21- ¿Cuál de estos animales es un mamífero que vive en el mar de Chile? [A. El pingüino B. La ballena jorobada C. El tiburón D. La gaviota] | Respuesta: B | Imagen: No",
     "21- ¿Cuál de estos animales es un mamífero que vive en el mar de Chile? [A. El pingüino B. La ballena jorobada C. El tiburón D. La gaviota] | Respuesta: B | Imagen: Sí \\- Una ballena jorobada saltando en el mar"),
    ("34- ¿Qué estructura usan los peces para respirar bajo el agua? [A. Pulmones B. Branquias C. Nariz D. Piel] | Respuesta: B | Imagen: No",
     "34- ¿Qué estructura usan los peces para respirar bajo el agua? [A. Pulmones B. Branquias C. Nariz D. Piel] | Respuesta: B | Imagen: Sí \\- Un pez con sus branquias visibles destacadas en color"),
    ("41- ¿Qué parte de la planta está debajo de la tierra y absorbe agua? [A. La hoja B. La flor C. La raíz D. El fruto] | Respuesta: C | Imagen: No",
     "41- ¿Qué parte de la planta está debajo de la tierra y absorbe agua? [A. La hoja B. La flor C. La raíz D. El fruto] | Respuesta: C | Imagen: Sí \\- Dibujo de una planta con raíces visibles bajo la tierra"),
    ("54- ¿Qué parte de la planta es el cactus que tiene espinas? [A. Es la flor B. Es el tallo C. Es el fruto D. Es la raíz] | Respuesta: B | Imagen: No",
     "54- ¿Qué parte de la planta es el cactus que tiene espinas? [A. Es la flor B. Es el tallo C. Es el fruto D. Es la raíz] | Respuesta: B | Imagen: Sí \\- Un cactus con espinas en su tallo"),
    ("81- ¿Cuál es la estación del año en la que hace más calor y vamos a la playa? [A. Invierno B. Verano C. Otoño D. Primavera] | Respuesta: B | Imagen: No",
     "81- ¿Cuál es la estación del año en la que hace más calor y vamos a la playa? [A. Invierno B. Verano C. Otoño D. Primavera] | Respuesta: B | Imagen: Sí \\- Niños jugando en la playa bajo el sol"),
    ("87- ¿Qué sucede con la luz del sol durante la noche? [A. Se apaga como una ampolleta B. La Tierra tapa la luz del sol al girar C. El Sol se va a dormir a otro planeta D. Se pone de color negro] | Respuesta: B | Imagen: No",
     "87- ¿Qué sucede con la luz del sol durante la noche? [A. Se apaga como una ampolleta B. La Tierra tapa la luz del sol al girar C. El Sol se va a dormir a otro planeta D. Se pone de color negro] | Respuesta: B | Imagen: Sí \\- La Tierra girando con un lado iluminado y otro oscuro"),
    ("94- ¿Cuál es la estación del año que tiene los días más cortos y las noches más largas? [A. Verano B. Invierno C. Otoño D. Primavera] | Respuesta: B | Imagen: No",
     "94- ¿Cuál es la estación del año que tiene los días más cortos y las noches más largas? [A. Verano B. Invierno C. Otoño D. Primavera] | Respuesta: B | Imagen: Sí \\- Paisaje invernal con nieve y cielo oscuro a las 5pm"),
    ("101- ¿Cuál de estos materiales es suave al tacto? [A. Una lija B. El algodón C. Una piedra D. El tronco de un árbol] | Respuesta: B | Imagen: No",
     "101- ¿Cuál de estos materiales es suave al tacto? [A. Una lija B. El algodón C. Una piedra D. El tronco de un árbol] | Respuesta: B | Imagen: Sí \\- Un trozo de algodón blanco y suave junto a una lija"),
    ("107- ¿Qué material se puede doblar fácilmente sin romperse? [A. Una regla de metal B. Una hoja de papel C. Un plato de cerámica D. Un vidrio] | Respuesta: B | Imagen: No",
     "107- ¿Qué material se puede doblar fácilmente sin romperse? [A. Una regla de metal B. Una hoja de papel C. Un plato de cerámica D. Un vidrio] | Respuesta: B | Imagen: Sí \\- Una hoja de papel doblada versus un plato de cerámica"),
    ("114- ¿Qué material usamos para fabricar nuestra ropa y es flexible? [A. El vidrio B. La tela C. La piedra D. El cemento] | Respuesta: B | Imagen: No",
     "114- ¿Qué material usamos para fabricar nuestra ropa y es flexible? [A. El vidrio B. La tela C. La piedra D. El cemento] | Respuesta: B | Imagen: Sí \\- Un rollo de tela junto a una ropa terminada"),
    ("127- ¿Qué ocurre con nuestros pulmones cuando tomamos aire (inhalamos)? [A. Se hacen pequeñitos B. Se inflan o se llenan de aire C. Se ponen de color azul D. Se detienen] | Respuesta: B | Imagen: No",
     "127- ¿Qué ocurre con nuestros pulmones cuando tomamos aire (inhalamos)? [A. Se hacen pequeñitos B. Se inflan o se llenan de aire C. Se ponen de color azul D. Se detienen] | Respuesta: B | Imagen: Sí \\- Pulmones inflados con flechas de aire entrando"),
    ("141- ¿Qué ocurre con el agua si la ponemos en el congelador por mucho tiempo? [A. Se vuelve gas B. Se convierte en hielo (sólido) C. Se pone caliente D. Cambia de sabor a frutilla] | Respuesta: B | Imagen: No",
     "141- ¿Qué ocurre con el agua si la ponemos en el congelador por mucho tiempo? [A. Se vuelve gas B. Se convierte en hielo (sólido) C. Se pone caliente D. Cambia de sabor a frutilla] | Respuesta: B | Imagen: Sí \\- Un vaso de agua entrando al congelador y saliendo como cubo de hielo"),
    ("147- ¿Dónde podemos encontrar agua en estado sólido en la naturaleza chilena? [A. En el desierto B. En los glaciares y en la nieve de la cordillera C. En las termas calientes D. En las piscinas] | Respuesta: B | Imagen: No",
     "147- ¿Dónde podemos encontrar agua en estado sólido en la naturaleza chilena? [A. En el desierto B. En los glaciares y en la nieve de la cordillera C. En las termas calientes D. En las piscinas] | Respuesta: B | Imagen: Sí \\- Paisaje de cordillera chilena con glaciar nevado"),
    ("154- ¿Qué animal tiene el cuello muy largo para comer hojas de árboles altos? [A. El elefante B. La jirafa C. El hipopótamo D. El rinoceronte] | Respuesta: B | Imagen: No",
     "154- ¿Qué animal tiene el cuello muy largo para comer hojas de árboles altos? [A. El elefante B. La jirafa C. El hipopótamo D. El rinoceronte] | Respuesta: B | Imagen: Sí \\- Una jirafa comiendo hojas de un árbol alto"),
    ("161- ¿Cuál de estos es un hábito saludable? [A. Comer muchos dulces todos los días B. Comer frutas y verduras C. No bañarse nunca D. Dormir solo 2 horas] | Respuesta: B | Imagen: No",
     "161- ¿Cuál de estos es un hábito saludable? [A. Comer muchos dulces todos los días B. Comer frutas y verduras C. No bañarse nunca D. Dormir solo 2 horas] | Respuesta: B | Imagen: Sí \\- Un niño comiendo una manzana versus otro con dulces"),
    ("181- ¿Qué gas usamos los seres humanos para respirar? [A. Humo B. Oxígeno C. Gas de globo D. Vapor] | Respuesta: B | Imagen: No",
     "181- ¿Qué gas usamos los seres humanos para respirar? [A. Humo B. Oxígeno C. Gas de globo D. Vapor] | Respuesta: B | Imagen: Sí \\- Un niño respirando profundo con flechas de aire"),
    ("194- ¿Qué órgano bombea la sangre por todo nuestro cuerpo? [A. El cerebro B. El corazón C. El estómago D. Los pulmones] | Respuesta: B | Imagen: No",
     "194- ¿Qué órgano bombea la sangre por todo nuestro cuerpo? [A. El cerebro B. El corazón C. El estómago D. Los pulmones] | Respuesta: B | Imagen: Sí \\- Silueta de cuerpo humano con el corazón destacado y latiendo"),
    
    # Historia
    ("1- ¿Por qué punto cardinal vemos aparecer el Sol cada mañana al amanecer? [A. Norte B. Sur C. Este D. Oeste] | Respuesta: C | Imagen: No",
     "1- ¿Por qué punto cardinal vemos aparecer el Sol cada mañana al amanecer? [A. Norte B. Sur C. Este D. Oeste] | Respuesta: C | Imagen: Sí \\- Rosa de los vientos con el sol saliendo por el lado Este"),
    ("21- Si quieres ver la forma real de los continentes sin que se vean planos, ¿qué usarías? [A. Un planisferio B. Un globo terráqueo C. Un croquis D. Una maqueta] | Respuesta: B | Imagen: No",
     "21- Si quieres ver la forma real de los continentes sin que se vean planos, ¿qué usarías? [A. Un planisferio B. Un globo terráqueo C. Un croquis D. Una maqueta] | Respuesta: B | Imagen: Sí \\- Un globo terráqueo junto a un planisferio (mapa plano)"),
    ("41- ¿En cuántos continentes tiene territorio Chile según el concepto de tricontinentalidad? [A. En uno B. En dos C. En tres D. En cuatro] | Respuesta: C | Imagen: No",
     "41- ¿En cuántos continentes tiene territorio Chile según el concepto de tricontinentalidad? [A. En uno B. En dos C. En tres D. En cuatro] | Respuesta: C | Imagen: Sí \\- Mapa del mundo con las tres zonas de Chile marcadas"),
    ("91- ¿Qué elevación natural del terreno puede expulsar lava y cenizas? [A. Cerro B. Valle C. Volcán D. Archipiélago] | Respuesta: C | Imagen: No",
     "91- ¿Qué elevación natural del terreno puede expulsar lava y cenizas? [A. Cerro B. Valle C. Volcán D. Archipiélago] | Respuesta: C | Imagen: Sí \\- Un volcán en erupción expulsando lava y cenizas"),
    ("111- Una porción de tierra rodeada totalmente por el océano es una: [A. Valle B. Fiordo C. Isla D. Altiplano] | Respuesta: C | Imagen: No",
     "111- Una porción de tierra rodeada totalmente por el océano es una: [A. Valle B. Fiordo C. Isla D. Altiplano] | Respuesta: C | Imagen: Sí \\- Una pequeña isla rodeada completamente por el mar"),
    ("121- ¿En cuántas grandes zonas geográficas se suele dividir Chile por sus paisajes? [A. En cinco B. En tres (Norte, Centro y Sur) C. En diez D. No tiene divisiones] | Respuesta: B | Imagen: No",
     "121- ¿En cuántas grandes zonas geográficas se suele dividir Chile por sus paisajes? [A. En cinco B. En tres (Norte, Centro y Sur) C. En diez D. No tiene divisiones] | Respuesta: B | Imagen: Sí \\- Mapa de Chile dividido en tres zonas: Norte, Centro y Sur"),
    ("131- ¿Cuál es el estado de conservación actual de la Vizcacha en Chile? [A. Es una plaga B. Está en peligro de extinción C. No está protegida D. Vive en las casas] | Respuesta: B | Imagen: No",
     "131- ¿Cuál es el estado de conservación actual de la Vizcacha en Chile? [A. Es una plaga B. Está en peligro de extinción C. No está protegida D. Vive en las casas] | Respuesta: B | Imagen: Sí \\- Una vizcacha en su hábitat natural en la cordillera"),
    ("141- ¿Qué zona natural es famosa por sus numerosos volcanes y grandes lagos? [A. Zona Norte B. Zona Centro C. Zona Sur D. El Altiplano] | Respuesta: C | Imagen: No",
     "141- ¿Qué zona natural es famosa por sus numerosos volcanes y grandes lagos? [A. Zona Norte B. Zona Centro C. Zona Sur D. El Altiplano] | Respuesta: C | Imagen: Sí \\- Lago del sur de Chile con volcán nevado al fondo"),

    # Lenguaje
    ("21- ¿Qué animal tiene un caparazón y camina muy lento? [A. Chancho B. Caracol C. Zorro D. Gallo] | Respuesta: B | Imagen: No",
     "21- ¿Qué animal tiene un caparazón y camina muy lento? [A. Chancho B. Caracol C. Zorro D. Gallo] | Respuesta: B | Imagen: Sí \\- Un caracol con su caparazón caminando lento"),
    ("45- ¿Cuál de estas frutas es roja y tiene semillas por fuera? [A. Plátano B. Frutilla C. Uva D. Melón] | Respuesta: B | Imagen: No",
     "45- ¿Cuál de estas frutas es roja y tiene semillas por fuera? [A. Plátano B. Frutilla C. Uva D. Melón] | Respuesta: B | Imagen: Sí \\- Una frutilla entera mostrando sus semillas amarillas en la superficie"),
    ("49- ¿Qué fruta se come \"debajo de la mesa\"? [A. Naranja B. Cereza C. Plátano D. Kiwi] | Respuesta: B | Imagen: No",
     "49- ¿Qué fruta se come \"debajo de la mesa\"? [A. Naranja B. Cereza C. Plátano D. Kiwi] | Respuesta: B | Imagen: Sí \\- Una cereza roja pequeña"),
    ("61- ¿Qué fruta es ácida, amarilla y sirve para aliñar ensaladas? [A. Naranja B. Limón C. Melón D. Cereza] | Respuesta: B | Imagen: No",
     "61- ¿Qué fruta es ácida, amarilla y sirve para aliñar ensaladas? [A. Naranja B. Limón C. Melón D. Cereza] | Respuesta: B | Imagen: Sí \\- Un limón amarillo partido mostrando su interior"),
    ("69- ¿Qué fruta es muy grande y se come \"a montones\" con el melón? [A. Uva B. Sandía C. Cereza D. Naranja] | Respuesta: B | Imagen: No",
     "69- ¿Qué fruta es muy grande y se come \"a montones\" con el melón? [A. Uva B. Sandía C. Cereza D. Naranja] | Respuesta: B | Imagen: Sí \\- Una sandía grande entera junto a trozos cortados"),
    ("113- ¿Qué palabra tiene el sonido \"ch\" y es una prenda de vestir chilena? [A. Zapato B. Poncho C. Gorro D. Camisa] | Respuesta: B | Imagen: No",
     "113- ¿Qué palabra tiene el sonido \"ch\" y es una prenda de vestir chilena? [A. Zapato B. Poncho C. Gorro D. Camisa] | Respuesta: B | Imagen: Sí \\- Un poncho de lana tradicional chileno extendido"),
    ("157- ¿Qué debemos hacer antes de cruzar la calle? [A. Correr B. Mirar a ambos lados C. Cerrar los ojos D. Gritar] | Respuesta: B | Imagen: No",
     "157- ¿Qué debemos hacer antes de cruzar la calle? [A. Correr B. Mirar a ambos lados C. Cerrar los ojos D. Gritar] | Respuesta: B | Imagen: Sí \\- Un niño mirando a ambos lados antes de cruzar por el paso de cebra"),
    ("169- ¿Dónde debemos botar siempre la basura? [A. Al suelo B. Al basurero C. Bajo la cama D. Por la ventana] | Respuesta: B | Imagen: No",
     "169- ¿Dónde debemos botar siempre la basura? [A. Al suelo B. Al basurero C. Bajo la cama D. Por la ventana] | Respuesta: B | Imagen: Sí \\- Un niño botando basura correctamente en el basurero"),
    ("173- ¿Qué forma y color tiene la señal de \"Pare\"? [A. Círculo azul B. Octágono rojo C. Triángulo verde D. Cuadrado café] | Respuesta: B | Imagen: No",
     "173- ¿Qué forma y color tiene la señal de \"Pare\"? [A. Círculo azul B. Octágono rojo C. Triángulo verde D. Cuadrado café] | Respuesta: B | Imagen: Sí \\- Una señal de Pare octagonal roja con letras blancas"),

    # Lógica
    ("11- Este es un animal tan original que al ponerse cara arriba, ya no se llama igual. [A. El caracol B. El escarabajo C. La oruga D. La mariposa] | Respuesta: B | Imagen: No",
     "11- Este es un animal tan original que al ponerse cara arriba, ya no se llama igual. [A. El caracol B. El escarabajo C. La oruga D. La mariposa] | Respuesta: B | Imagen: Sí \\- Un escarabajo patas arriba (cara arriba)"),
    ("26- Dicen que la tía Cuca se arrastra con mala racha. ¿Quién será esa muchacha? [A. La lombriz B. La serpiente C. La cucaracha D. La oruga] | Respuesta: C | Imagen: No",
     "26- Dicen que la tía Cuca se arrastra con mala racha. ¿Quién será esa muchacha? [A. La lombriz B. La serpiente C. La cucaracha D. La oruga] | Respuesta: C | Imagen: Sí \\- Una cucaracha vista de frente"),
    ("36- Es que el pobre ve tan poco que tampoco mira ya, topa que topa que topa, con la topa lo hallarás. [A. El ratón B. El conejo C. El gato D. El topo] | Respuesta: D | Imagen: No",
     "36- Es que el pobre ve tan poco que tampoco mira ya, topa que topa que topa, con la topa lo hallarás. [A. El ratón B. El conejo C. El gato D. El topo] | Respuesta: D | Imagen: Sí \\- Un topo saliendo de la tierra con ojitos pequeños"),
    ("51- Si te pregunto cómo se llama este gran bicho, ya te lo he dicho. [A. La vaca B. El perro C. La llama D. El pato] | Respuesta: C | Imagen: No",
     "51- Si te pregunto cómo se llama este gran bicho, ya te lo he dicho. [A. La vaca B. El perro C. La llama D. El pato] | Respuesta: C | Imagen: Sí \\- Una llama andina con expresión amigable"),
    ("66- Aunque no es un hombre, lleva sombrero y al cesar la lluvia sale el primero. [A. El caracol B. El hongo C. El árbol D. El niño] | Respuesta: B | Imagen: No",
     "66- Aunque no es un hombre, lleva sombrero y al cesar la lluvia sale el primero. [A. El caracol B. El hongo C. El árbol D. El niño] | Respuesta: B | Imagen: Sí \\- Un hongo con su sombrero saliendo tras la lluvia"),
    ("81- Son de color chocolate, se ablandan con el calor, y si se meten al horno, explotan con gran furor. [A. Las almendras B. Las nueces C. Las avellanas D. Las castañas] | Respuesta: D | Imagen: No",
     "81- Son de color chocolate, se ablandan con el calor, y si se meten al horno, explotan con gran furor. [A. Las almendras B. Las nueces C. Las avellanas D. Las castañas] | Respuesta: D | Imagen: Sí \\- Castañas de color marrón oscuro sobre una superficie"),
    ("86- Somos blancos, larguiruchos, nos fríen en las verbenas, dorados y calentitos. [A. Los fideos B. Los espárragos C. Los churros D. Las papas fritas] | Respuesta: C | Imagen: No",
     "86- Somos blancos, larguiruchos, nos fríen en las verbenas, dorados y calentitos. [A. Los fideos B. Los espárragos C. Los churros D. Las papas fritas] | Respuesta: C | Imagen: Sí \\- Churros dorados y largos fritos"),
    ("96- Después de haberme molido, agua hirviendo echan en mí. La gente me bebe mucho cuando no quiere dormir. [A. El té B. La leche C. El café D. El chocolate] | Respuesta: C | Imagen: No",
     "96- Después de haberme molido, agua hirviendo echan en mí. La gente me bebe mucho cuando no quiere dormir. [A. El té B. La leche C. El café D. El chocolate] | Respuesta: C | Imagen: Sí \\- Una taza de café humeante"),
    ("101- En la tierra te sembraron, las aves te desearon, cuando estuviste dorado los hombres te segaron. [A. El maíz B. El arroz C. El trigo D. El pasto] | Respuesta: C | Imagen: No",
     "101- En la tierra te sembraron, las aves te desearon, cuando estuviste dorado los hombres te segaron. [A. El maíz B. El arroz C. El trigo D. El pasto] | Respuesta: C | Imagen: Sí \\- Un campo de trigo dorado listo para cosechar"),
    ("116- Cuerpo de palo, cabeza de color, me encienden con cuidado y doy mucho calor. [A. La cerilla B. La vela C. El carbón D. La lámpara] | Respuesta: A | Imagen: No",
     "116- Cuerpo de palo, cabeza de color, me encienden con cuidado y doy mucho calor. [A. El fósforo B. La vela C. El carbón D. La lámpara] | Respuesta: A | Imagen: Sí \\- Dibujo de un fósforo encendido con su cabeza roja brillando"),
    ("131- Con tan sólo cuatro cuerdas, que un arco pone en acción, esta caja melodiosa te alegrará el corazón. [A. La guitarra B. El violín C. El violonchelo D. El arpa] | Respuesta: B | Imagen: No",
     "131- Con tan sólo cuatro cuerdas, que un arco pone en acción, esta caja melodiosa te alegrará el corazón. [A. La guitarra B. El violín C. El violonchelo D. El arpa] | Respuesta: B | Imagen: Sí \\- Un violín con su arco apoyado"),
    ("136- Sobre una piel bien tensada, dos bailarines saltaban. [A. El baile B. Los pies C. El tambor D. La cuerda] | Respuesta: C | Imagen: No",
     "136- Sobre una piel bien tensada, dos bailarines saltaban. [A. El baile B. Los pies C. El tambor D. La cuerda] | Respuesta: C | Imagen: Sí \\- Un tambor con sus dos palillos (baquetas)"),
    ("146- Me pones y me quitas, me tomas y me dejas, conmigo no tiritas, y estoy hecho de madejas. [A. La manta B. La bufanda C. El chaleco D. La polera] | Respuesta: C | Imagen: No",
     "146- Me pones y me quitas, me tomas y me dejas, conmigo no tiritas, y estoy hecho de madejas. [A. La manta B. La bufanda C. El chaleco D. La polera] | Respuesta: C | Imagen: Sí \\- Un chaleco de lana tejido"),
    ("166- Si quieres caminar salto, y si quiero parar me agacho. [A. La rana B. El saltamontes C. El conejo D. El canguro] | Respuesta: D | Imagen: No",
     "166- Si quieres caminar salto, y si quiero parar me agacho. [A. La rana B. El saltamontes C. El conejo D. El canguro] | Respuesta: D | Imagen: Sí \\- Un canguro saltando con su cría en la bolsa"),
    ("191- Tres hermanos en su casa, ven al lobo pasar, y por mucho que éste sople, no la consigue tirar. [A. Los tres mosqueteros B. Los tres cerditos C. Los siete enanitos D. Los tres ositos] | Respuesta: B | Imagen: No",
     "191- Tres hermanos en su casa, ven al lobo pasar, y por mucho que éste sople, no la consigue tirar. [A. Los tres mosqueteros B. Los tres cerditos C. Los siete enanitos D. Los tres ositos] | Respuesta: B | Imagen: Sí \\- Los tres cerditos frente a sus tres casas (paja, madera, ladrillo)"),

    # Matematicas
    ("6- Si tienes 5 dedos en una mano, ¿cuántos dedos tienes en las dos manos juntas? [A. 5 B. 10 C. 8 D. 12] | Respuesta: B | Imagen: No",
     "6- Si tienes 5 dedos en una mano, ¿cuántos dedos tienes en las dos manos juntas? [A. 5 B. 10 C. 8 D. 12] | Respuesta: B | Imagen: Sí \\- Dos manos abiertas con todos los dedos extendidos"),
    ("56- ¿Cuántos dedos tienes en un pie? [A. 4 B. 5 C. 6 D. 10] | Respuesta: B | Imagen: No",
     "56- ¿Cuántos dedos tienes en un pie? [A. 4 B. 5 C. 6 D. 10] | Respuesta: B | Imagen: Sí \\- Un pie con los cinco dedos visibles"),
    ("81- ¿Cuál es la forma de una pelota? [A. Cuadrada B. Redonda C. Triangular D. Rectangular] | Respuesta: B | Imagen: No",
     "81- ¿Cuál es la forma de una pelota? [A. Cuadrada B. Redonda C. Triangular D. Rectangular] | Respuesta: B | Imagen: Sí \\- Una pelota de fútbol redonda"),
    ("91- ¿Qué forma tienen los trozos de pizza cortados? [A. Cuadrados B. Redondos C. Triangulares D. Rectangulares] | Respuesta: C | Imagen: No",
     "91- ¿Qué forma tienen los trozos de pizza cortados? [A. Cuadrados B. Redondos C. Triangulares D. Rectangulares] | Respuesta: C | Imagen: Sí \\- Una pizza cortada en triángulos"),
    ("116- ¿Cuántos huevos hay en una docena? [A. 10 B. 11 C. 12 D. 20] | Respuesta: C | Imagen: No",
     "116- ¿Cuántos huevos hay en una docena? [A. 10 B. 11 C. 12 D. 20] | Respuesta: C | Imagen: Sí \\- Una huevera con 12 huevos blancos"),
    ("126- ¿Cuál objeto es más grande? [A. Un avión B. Una hormiga C. Una pelota D. Un lápiz] | Respuesta: A | Imagen: No",
     "126- ¿Cuál objeto es más grande? [A. Un avión B. Una hormiga C. Una pelota D. Un lápiz] | Respuesta: A | Imagen: Sí \\- Un avión grande junto a una hormiga pequeña (comparación de tamaño)"),
    ("176- Si tienes 2 ojos y 2 orejas, ¿cuántas cosas tienes en total? [A. 2 B. 3 C. 4 D. 5] | Respuesta: C | Imagen: No",
     "176- Si tienes 2 ojos y 2 orejas, ¿cuántas cosas tienes en total? [A. 2 B. 3 C. 4 D. 5] | Respuesta: C | Imagen: Sí \\- Cara de niño con ojos y orejas destacados con flechas")
]

update_file(seleccion_path, replacements)
print("Modificaciones realizadas con exito.")
