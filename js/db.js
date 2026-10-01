import { THEMES, COLORS, state, fmtColor, profile, SKILLS_META, playerAge } from './store.js';
import { getUniqueFalses, rand, shuffle, missionPeriodKeys, saveP } from './ui.js';

    // --- DB EXTENDIDA ---
    // (Constants THEMES, COLORS, SHOP_ITEMS, WORLDS, SKILLS_META, BADGES, defaultProfile, profile, state, playerAge extraídos a js/store.js)

    // ═══════════════════════════════════════════════════════════
    // BANCO DE PREGUNTAS POR EDAD
    // Estructura: QUESTIONS[categoria][rango_etario][array de preguntas]
    // Rangos: age_4_6 | age_7_9 | age_10_12
    // Formato: { m, q, c, f:[3 incorrectas], tags, explain }
    // ═══════════════════════════════════════════════════════════
    const QUESTIONS = {
      math: {
        age_4_6: [
          { m:"✋", q:"¿Cuántos dedos tiene una mano?", c:"5", f:["4","6","3"], tags:["math"], explain:"Una mano tiene 5 dedos." },
          { m:"🍎🍎🍎", q:"¿Cuántas manzanas hay?", c:"3", f:["2","4","5"], tags:["math"], explain:"Hay 3 manzanas." },
          { m:"🐾", q:"1 + 1 = ?", c:"2", f:["1","3","4"], tags:["math"], explain:"1+1 son 2." },
          { m:"🎈🎈", q:"2 + 2 = ?", c:"4", f:["3","5","6"], tags:["math"], explain:"2+2 son 4." },
          { m:"⭐", q:"¿Cuánto es 3 - 1?", c:"2", f:["1","3","4"], tags:["math"], explain:"3 menos 1 son 2." }
        ],
        age_7_9: [
          { m:"🧮", q:"¿Cuánto es 15 - 7?", c:"8", f:["7","9","6"], tags:["math"], explain:"15-7=8." },
          { m:"🧮", q:"¿Cuánto es 6 × 3?", c:"18", f:["16","20","15"], tags:["math"], explain:"6×3=18." },
          { m:"🧮", q:"¿Cuánto es 24 ÷ 4?", c:"6", f:["5","7","8"], tags:["math"], explain:"24÷4=6." },
          { m:"🧮", q:"¿Cuánto es 9 + 8?", c:"17", f:["16","18","15"], tags:["math"], explain:"9+8=17." },
          { m:"🧮", q:"¿Cuánto es 20 - 13?", c:"7", f:["6","8","9"], tags:["math"], explain:"20-13=7." }
        ],
        age_10_12: [
          { m:"🧮", q:"¿Cuánto es 7 × 8?", c:"56", f:["54","58","48"], tags:["math"], explain:"7×8=56." },
          { m:"🧮", q:"¿Cuánto es 144 ÷ 12?", c:"12", f:["11","13","10"], tags:["math"], explain:"144÷12=12." },
          { m:"🧮", q:"¿Cuánto es 25% de 80?", c:"20", f:["15","25","40"], tags:["math"], explain:"25% de 80 = 80÷4 = 20." },
          { m:"🧮", q:"¿Cuánto es 3²?", c:"9", f:["6","8","12"], tags:["math"], explain:"3²= 3×3 = 9." },
          { m:"🧮", q:"¿Cuánto es 13 × 7?", c:"91", f:["89","93","84"], tags:["math"], explain:"13×7=91." }
        ]
      },
      lang: {
        age_4_6: [
          { m:"🐶", q:"¿Cómo se llama la cría del perro?", c:"Cachorro", f:["Gatito","Pollito","Potro"], tags:["lang"], explain:"La cría del perro se llama cachorro." },
          { m:"🌈", q:"¿Cuántas letras tiene 'SOL'?", c:"3", f:["2","4","5"], tags:["lang"], explain:"S-O-L son 3 letras." },
          { m:"🔤", q:"¿Cuál es la primera letra del abecedario?", c:"A", f:["B","C","E"], tags:["lang"], explain:"El abecedario empieza con la A." },
          { m:"🍓", q:"¿Cuántas sílabas tiene 'FRESA'?", c:"2", f:["1","3","4"], tags:["lang"], explain:"FRE-SA = 2 sílabas." },
          { m:"🐱", q:"¿Cuál es el plural de 'gato'?", c:"Gatos", f:["Gatoz","Gato","Gatitos"], tags:["lang"], explain:"El plural de gato es gatos." }
        ],
        age_7_9: [
          { m:"📖", q:"¿Qué es un sinónimo de 'veloz'?", c:"Rápido", f:["Lento","Grande","Suave"], tags:["lang"], explain:"Veloz y rápido significan lo mismo." },
          { m:"📖", q:"¿Cuántas sílabas tiene 'MARIPOSA'?", c:"4", f:["3","5","2"], tags:["lang"], explain:"MA-RI-PO-SA = 4 sílabas." },
          { m:"📖", q:"¿Cuál es el antónimo de 'frío'?", c:"Caliente", f:["Tibio","Helado","Húmedo"], tags:["lang"], explain:"El antónimo (opuesto) de frío es caliente." },
          { m:"📝", q:"¿Cómo se escribe correctamente?", c:"Guitarra", f:["Gitarra","Guittarra","Guytarra"], tags:["lang"], explain:"Guitarra se escribe con 'gui'." },
          { m:"📖", q:"¿Qué tipo de palabra es 'correr'?", c:"Verbo", f:["Sustantivo","Adjetivo","Adverbio"], tags:["lang"], explain:"Correr es una acción → verbo." }
        ],
        age_10_12: [
          { m:"📚", q:"¿Cuál es el sujeto de 'María canta bonito'?", c:"María", f:["Canta","Bonito","María canta"], tags:["lang"], explain:"El sujeto es quien realiza la acción: María." },
          { m:"📝", q:"¿Qué tipo de palabra es 'rápidamente'?", c:"Adverbio", f:["Adjetivo","Sustantivo","Verbo"], tags:["lang"], explain:"Las palabras en -mente suelen ser adverbios." },
          { m:"📚", q:"¿Qué significa el prefijo 'bi-'?", c:"Dos", f:["Tres","Uno","Cuatro"], tags:["lang"], explain:"Bi- = dos: bicicleta, bilingüe." },
          { m:"📝", q:"¿Cuál de estas palabras lleva tilde?", c:"Café", f:["Examen","Mesa","Libro"], tags:["lang"], explain:"Café es aguda terminada en vocal, lleva tilde." },
          { m:"📚", q:"¿Qué figura retórica es 'el sol sonríe'?", c:"Personificación", f:["Metáfora","Hipérbole","Rima"], tags:["lang"], explain:"Atribuir acciones humanas a cosas es personificación." }
        ]
      },
      logic: {
        age_4_6: [
          { m:"🐘🐭", q:"¿Cuál animal es más grande?", c:"🐘 Elefante", f:["🐭 Ratón","Son iguales","Ninguno"], tags:["logic"], explain:"El elefante es mucho más grande que el ratón." },
          { m:"🌙☀️", q:"¿Cuándo se ve la Luna?", c:"De noche", f:["De día","Al mediodía","Siempre"], tags:["logic"], explain:"La Luna se ve principalmente de noche." },
          { m:"❄️🔥", q:"¿Qué derrite el hielo?", c:"El calor", f:["El frío","El viento","La Luna"], tags:["logic"], explain:"El calor derrite el hielo." },
          { m:"🦆🐠", q:"¿Cuál puede volar?", c:"🦆 El pato", f:["🐠 El pez","Los dos","Ninguno"], tags:["logic"], explain:"El pato tiene alas y puede volar." },
          { m:"🔵🔴🔵", q:"¿Qué sigue? 🔵🔴🔵🔴__", c:"🔵", f:["🔴","🟡","🟢"], tags:["logic"], explain:"El patrón alterna azul-rojo, sigue azul." }
        ],
        age_7_9: [
          { m:"🔢", q:"¿Qué número sigue? 2, 4, 6, 8, __", c:"10", f:["9","11","12"], tags:["logic"], explain:"La serie suma 2 cada vez: 8+2=10." },
          { m:"🔢", q:"¿Qué número falta? 3, 6, __, 12", c:"9", f:["8","10","7"], tags:["logic"], explain:"La serie multiplica por 2: 3→6→9→12." },
          { m:"🧩", q:"Ana > Carlos > Luis en altura. ¿Quién es el más bajo?", c:"Luis", f:["Ana","Carlos","Son iguales"], tags:["logic"], explain:"Luis es el más bajo en la cadena." },
          { m:"🔢", q:"¿Qué número sigue? 1, 1, 2, 3, 5, __", c:"8", f:["6","7","9"], tags:["logic"], explain:"Fibonacci: cada número = suma de los dos anteriores. 3+5=8." },
          { m:"⚖️", q:"3 lápices = 6 borradores. ¿Cuántos borradores vale 1 lápiz?", c:"2", f:["1","3","6"], tags:["logic"], explain:"3 lápices = 6 borradores → 1 lápiz = 2 borradores." }
        ],
        age_10_12: [
          { m:"🔢", q:"¿Qué número sigue? 2, 6, 18, 54, __", c:"162", f:["108","160","216"], tags:["logic"], explain:"Se multiplica por 3 cada vez: 54×3=162." },
          { m:"🧩", q:"Todos los gatos son animales. Misu es gato. Por tanto...", c:"Misu es un animal", f:["Todos los animales son gatos","Misu no es animal","Misu es un perro"], tags:["logic"], explain:"Silogismo: si todo A es B, y C es A, entonces C es B." },
          { m:"⚖️", q:"X + Y = 10 y X - Y = 2. ¿Cuánto es X?", c:"6", f:["4","5","8"], tags:["logic"], explain:"Sumando ambas: 2X=12, X=6." },
          { m:"🧩", q:"Tren sale 8:45, llega 1h 30min después. ¿Hora llegada?", c:"10:15", f:["9:45","10:45","10:00"], tags:["logic"], explain:"8:45 + 1h = 9:45, + 30min = 10:15." },
          { m:"🔢", q:"¿Cuántos cuadrados hay en un tablero 3×3?", c:"14", f:["9","12","16"], tags:["logic"], explain:"9 de 1×1 + 4 de 2×2 + 1 de 3×3 = 14." }
        ]
      },
      riddles: {
        age_4_6: [
          { m:"🧩", q:"Tengo hojas pero no soy árbol. ¿Qué soy?", c:"Libro", f:["Flor","Revista","Papel"], tags:["riddles","logic"], explain:"¡Un libro tiene hojas!" },
          { m:"🧩", q:"Soy redondo y con tu pie me pateas. ¿Qué soy?", c:"Pelota", f:["Rueda","Huevo","Naranja"], tags:["riddles","logic"], explain:"¡Una pelota!" },
          { m:"🧩", q:"Me usas para comer sopa. ¿Qué soy?", c:"Cuchara", f:["Tenedor","Cuchillo","Vaso"], tags:["riddles","logic"], explain:"La cuchara es para la sopa." },
          { m:"🧩", q:"Vuelo sin alas, corro sin pies. ¿Qué soy?", c:"El viento", f:["Una nube","Un pájaro","El agua"], tags:["riddles","logic"], explain:"El viento vuela y corre sin alas ni pies." },
          { m:"🧩", q:"Soy fría, vivo en el congelador. ¿Qué soy?", c:"Hielo", f:["Nieve","Agua","Helado"], tags:["riddles","logic"], explain:"El hielo es agua congelada." }
        ],
        age_7_9: [
          { m:"🧩", q:"Cuanto más grande, menos pesa. ¿Qué soy?", c:"Un agujero", f:["Una burbuja","Una sombra","El aire"], tags:["riddles","logic"], explain:"Un agujero más grande sigue sin pesar nada." },
          { m:"🧩", q:"Tengo ciudades sin casas, montañas sin árboles. ¿Qué soy?", c:"Un mapa", f:["Un dibujo","Una foto","Un libro"], tags:["riddles","logic"], explain:"Un mapa muestra todo eso sin que sea real." },
          { m:"🧩", q:"Vuelo sin alas y lloro sin ojos. ¿Qué soy?", c:"Nube", f:["Viento","Fantasma","Lluvia"], tags:["riddles","logic"], explain:"La nube flota y suelta lluvia, como si llorara." },
          { m:"🧩", q:"Tengo aguja pero no coso, tengo esfera pero no soy planeta. ¿Qué soy?", c:"Reloj", f:["Brújula","Balón","Termómetro"], tags:["riddles","logic"], explain:"El reloj tiene agujas y esfera." },
          { m:"🧩", q:"Soy tu reflejo pero no soy tú. ¿Qué soy?", c:"Un espejo", f:["Una foto","Tu sombra","El agua"], tags:["riddles","logic"], explain:"El espejo te muestra tu reflejo." }
        ],
        age_10_12: [
          { m:"🧩", q:"Soy el principio del fin y el fin del tiempo. ¿Qué letra soy?", c:"E", f:["N","T","F"], tags:["riddles","logic"], explain:"E está al inicio de 'el fin' y al final de 'tiempo'." },
          { m:"🧩", q:"Mientras más me seques, más te mojo. ¿Qué soy?", c:"Una toalla", f:["Un trapo","El sol","El viento"], tags:["riddles","logic"], explain:"La toalla absorbe agua al secarte." },
          { m:"🧩", q:"¿Qué tiene 13 corazones pero no está vivo?", c:"Una baraja de cartas", f:["Un árbol","Un mapa","Un libro"], tags:["riddles","logic"], explain:"Una baraja tiene 13 cartas de corazones." },
          { m:"🧩", q:"Liviana como pluma, pero el más fuerte no la aguanta mucho. ¿Qué es?", c:"El aliento", f:["Una idea","El aire","El calor"], tags:["riddles","logic"], explain:"Nadie puede aguantar la respiración indefinidamente." },
          { m:"🧩", q:"La hija de mi madre no es mi hermana. ¿Quién es?", c:"Yo mismo/a", f:["Mi prima","Mi tía","Mi sobrina"], tags:["riddles","logic"], explain:"La hija de mi madre soy yo." }
        ]
      },
      general: {
        age_4_6: [
          { m:"🌍", q:"¿En qué planeta vivimos?", c:"Tierra", f:["Marte","Luna","Sol"], tags:["general"], explain:"Vivimos en el planeta Tierra." },
          { m:"☀️", q:"¿Qué nos da luz y calor durante el día?", c:"El Sol", f:["La Luna","Las nubes","Las estrellas"], tags:["general"], explain:"El Sol es nuestra estrella y nos da calor y luz." },
          { m:"🌈", q:"¿Cuántos colores tiene el arcoíris?", c:"7", f:["5","6","8"], tags:["general"], explain:"Rojo, naranja, amarillo, verde, azul, índigo y violeta: 7 colores." },
          { m:"🐸", q:"¿En qué animal se convierte el renacuajo?", c:"Rana", f:["Sapo","Pez","Serpiente"], tags:["general"], explain:"El renacuajo se transforma en rana." },
          { m:"💧", q:"¿Qué toman las plantas por las raíces?", c:"Agua", f:["Sol","Tierra","Aire"], tags:["general"], explain:"Las plantas absorben agua y minerales por las raíces." }
        ],
        age_7_9: [
          { m:"🌎", q:"¿Cuántos continentes tiene la Tierra?", c:"7", f:["5","6","8"], tags:["general"], explain:"América, Europa, Asia, África, Oceanía, Antártida y el Ártico." },
          { m:"🫀", q:"¿Qué órgano bombea la sangre en el cuerpo?", c:"El corazón", f:["El pulmón","El cerebro","El hígado"], tags:["general"], explain:"El corazón bombea la sangre." },
          { m:"💧", q:"¿En qué estado está el agua cuando es vapor?", c:"Gaseoso", f:["Líquido","Sólido","Plasma"], tags:["general"], explain:"El vapor de agua es agua en estado gaseoso." },
          { m:"🌿", q:"¿Qué proceso usan las plantas para alimentarse con la luz?", c:"Fotosíntesis", f:["Respiración","Digestión","Germinación"], tags:["general"], explain:"La fotosíntesis convierte luz en alimento para la planta." },
          { m:"🗺️", q:"¿Cuál es el océano más grande del mundo?", c:"Pacífico", f:["Atlántico","Índico","Ártico"], tags:["general"], explain:"El Océano Pacífico es el más grande y profundo." }
        ],
        age_10_12: [
          { m:"⚡", q:"¿Quién demostró que el rayo era electricidad?", c:"Benjamin Franklin", f:["Nikola Tesla","Thomas Edison","Isaac Newton"], tags:["general"], explain:"Franklin lo demostró con su famoso experimento de la cometa." },
          { m:"🧬", q:"¿Cómo se llama la molécula que contiene nuestra información genética?", c:"ADN", f:["ARN","ATP","AMP"], tags:["general"], explain:"El ADN contiene nuestro código genético." },
          { m:"🌋", q:"¿Cómo se llama la capa exterior de la Tierra donde vivimos?", c:"Corteza", f:["Manto","Núcleo","Litosfera"], tags:["general"], explain:"La corteza es la capa exterior sólida." },
          { m:"🚀", q:"¿En qué año llegó el primer humano a la Luna?", c:"1969", f:["1961","1975","1967"], tags:["general"], explain:"El Apollo 11 llegó a la Luna el 20 de julio de 1969." },
          { m:"⚗️", q:"¿Cuál es el símbolo químico del oro?", c:"Au", f:["Go","Or","Ag"], tags:["general"], explain:"Au viene del latín 'Aurum'. Ag es la plata." }
        ]
      },
      english: {
        age_4_6: [
          { m:"🐶", q:"How do you say 'perro' in English?", c:"Dog", f:["Cat","Bird","Fish"], tags:["english"], explain:"'Perro' in English is 'dog'." },
          { m:"🎨", q:"What color is the sky?", c:"Blue", f:["Red","Green","Yellow"], tags:["english"], explain:"The sky is blue." },
          { m:"🍎", q:"How do you say 'manzana' in English?", c:"Apple", f:["Orange","Banana","Grape"], tags:["english"], explain:"'Manzana' in English is 'apple'." },
          { m:"🔢", q:"How many is 'three'?", c:"3", f:["2","4","5"], tags:["english"], explain:"Three = 3." },
          { m:"👋", q:"How do you say hello in English?", c:"Hello!", f:["Goodbye","Thank you","Please"], tags:["english"], explain:"'Hello' is how you greet in English." }
        ],
        age_7_9: [
          { m:"🇬🇧", q:"What is the opposite of 'big'?", c:"Small", f:["Tall","Fast","Hot"], tags:["english"], explain:"The opposite of big is small." },
          { m:"🇬🇧", q:"Which animal says 'moo'?", c:"Cow", f:["Dog","Cat","Duck"], tags:["english"], explain:"The cow says 'moo'." },
          { m:"🇬🇧", q:"What comes after Monday?", c:"Tuesday", f:["Sunday","Wednesday","Friday"], tags:["english"], explain:"Monday → Tuesday → Wednesday..." },
          { m:"🇬🇧", q:"How do you say 'escuela' in English?", c:"School", f:["Library","Hospital","Market"], tags:["english"], explain:"'Escuela' = 'school'." },
          { m:"🇬🇧", q:"'Manzana' in English:", c:"Apple", f:["Orange","Banana","Grape"], tags:["english"], explain:"'Manzana' = 'apple'." }
        ],
        age_10_12: [
          { m:"🇬🇧", q:"What is the past tense of 'go'?", c:"Went", f:["Goed","Gone","Going"], tags:["english"], explain:"'Go' is irregular. Past tense: went." },
          { m:"🇬🇧", q:"Which word is an adjective?", c:"Beautiful", f:["Quickly","Run","They"], tags:["english"], explain:"Adjectives describe nouns. 'Beautiful' describes things." },
          { m:"🇬🇧", q:"'She ___ to school every day.'", c:"Goes", f:["Go","Going","Gone"], tags:["english"], explain:"Third person singular (she) uses -goes." },
          { m:"🇬🇧", q:"What does 'enormous' mean?", c:"Very big", f:["Very small","Very fast","Very old"], tags:["english"], explain:"Enormous means extremely large." },
          { m:"🇬🇧", q:"Which is correct?", c:"She doesn't like cats", f:["She don't like cats","She not like cats","She isn't like cats"], tags:["english"], explain:"Third person negative: doesn't (not don't)." }
        ]
      }
    };

    // ─────────────────────────────────────────────────────────
    // DIFICULTAD ADAPTATIVA
    // ─────────────────────────────────────────────────────────


    function getAdaptiveDiff(tag) {
      const d = (profile.destrezas && profile.destrezas[tag] !== undefined) ? profile.destrezas[tag] : 100;
      if (d < 40) return 'easy';
      if (d < 70) return 'medium';
      return 'hard';
    }

    // Retorna una pregunta aleatoria del pool de la edad correcta, o null
    function pickFromPool(cat) {
      const group  = calculateAgeGroup();
      // Mapeo de grupos Vivid Tiers a QUESTIONS legacy
      const legacyMap = { "6-7": "age_4_6", "8-10": "age_7_9", "11-13": "age_10_12" };
      const legacyGroup = legacyMap[group] || "age_7_9";
      
      const catObj = QUESTIONS[cat];
      if (!catObj) return null;
      const pool = catObj[legacyGroup] || catObj['age_7_9'] || [];
      if (!pool.length) return null;
      return Object.assign({}, pool[Math.floor(Math.random() * pool.length)]);
    }

    // ─────────────────────────────────────────────────────────
    // HISTORIAL SEMANAL
    // ─────────────────────────────────────────────────────────
    function saveWeeklySnapshot() {
      const key = missionPeriodKeys().weekly;
      profile.weeklyHistory = profile.weeklyHistory || {};
      const acc = profile.stats.answers ? Math.round((profile.stats.correct / profile.stats.answers) * 100) : 0;
      profile.weeklyHistory[key] = {
        games:     profile.stats.games || 0,
        accuracy:  acc,
        maxStreak: profile.maxStreak || 0,
        destrezas: Object.assign({}, profile.destrezas)
      };
      // Mantener solo las últimas 8 semanas
      const wkeys = Object.keys(profile.weeklyHistory).sort();
      while (wkeys.length > 8) delete profile.weeklyHistory[wkeys.shift()];
      saveP();
    }


    
    /**
     * Limpia las notas de imagen entre paréntesis del texto de la pregunta.
     * Ej: "¿Cuántas hay? (Dibujo de un pato)" → "¿Cuántas hay?"
     */
    function cleanQuestionText(rawText) {
      if (!rawText) return rawText;
      return rawText.replace(/\s*\((?:Dibujo|Imagen)[^)]*\)/gi, '').trim();
    }

    let dbCache = {};

    async function getQuestionFromDB() {
      let ageGrp;
      if (playerAge <= 7) ageGrp = "6_7";
      else if (playerAge <= 10) ageGrp = "8_10";
      else ageGrp = "11_13";
      
      if (!dbCache[ageGrp]) {
        try {
          const response = await fetch('assets/data/db_' + ageGrp + '.json');
          if (!response.ok) throw new Error('Network response was not ok');
          dbCache[ageGrp] = await response.json();
        } catch (e) {
          console.error('Failed to load lazy DB', e);
        }
      }

      let dbAge = dbCache[ageGrp] || {};
      
      let cats = Object.keys(dbAge);
      if (!state.includeEnglish) {
          cats = cats.filter(c => c !== "ingles");
      }
      if (cats.length === 0) cats = Object.keys(dbAge);
      
      let cat = cats.length > 0 ? cats[Math.floor(Math.random() * cats.length)] : null;
      let qs = cat ? dbAge[cat] : null;
      
      // Fallback a QUESTIONS legacy si no hay datos en NEW_DB para esta categoría
      if (!qs || qs.length === 0) {
        let legacyQ = pickFromPool(cat || 'math');
        if (legacyQ) return legacyQ;
        return Generators['math']();
      }
      
      // Filter corrupted questions (must have exactly 4 opts, correct index in range)
      qs = qs.filter(q => q.opts && q.opts.length === 4 && q.correct >= 0 && q.correct < 4);
      if (qs.length === 0) {
        let legacyQ = pickFromPool(cat);
        if (legacyQ) return legacyQ;
        return Generators['math']();
      }
      
      // Session deduplication
      if (!state.usedQuestions) state.usedQuestions = new Set();
      let available = qs.filter((q, idx) => !state.usedQuestions.has(cat + '_' + idx));
      if (available.length === 0) { state.usedQuestions.clear(); available = qs; }
      
      let qIdx = Math.floor(Math.random() * available.length);
      let q = available[qIdx];
      state.usedQuestions.add(cat + '_' + qs.indexOf(q));
      
      let opts = [...q.opts];
      let correctText = opts[q.correct];
      opts.sort(() => Math.random() - 0.5);
      
      return {
        m: "🤔",
        q: cleanQuestionText(q.q),
        c: correctText,
        f: opts.filter(x => x !== correctText),
        tags: [cat],
        explain: "La respuesta correcta es: " + correctText,
        time: q.time || 30
      };
    }

    const Generators = {
      math: () => {
        let max = (playerAge >= 10) ? 20 : 10; let a = Math.floor(Math.random()*max)+1, b = Math.floor(Math.random()*max)+1;
        let ans = a+b; let q = `${a} + ${b} = ?`;
        if(Math.random()<0.2) return { m: `🧮 🤪`, q: `INCORRECTA de: ${q}`, c:`No ${ans}`, a: [{t:ans,correct:false},{t:ans+1,correct:true},{t:ans-1,correct:true},{t:ans+2,correct:true}], tags:['math', 'logic'], explain:`${a}+${b}=${ans}, por eso había que tocar una opción distinta a ${ans}.` };
        return { m: `🧮`, q: q, c: ans, f: getUniqueFalses(ans, null, ()=>ans+Math.floor(Math.random()*5-2)), tags:['math'], explain:`Era ${ans}, porque ${a}+${b}=${ans}.` }; 
      },
      lang: () => { return { m:"🔤", q:"Vocales de P_RR_", c:"E, O", f:["A, E", "O, O", "I, U"], tags:['lang'], explain:"P_ERRO se completa con E y O." }; },
      logic: () => { let c = rand(Object.keys(COLORS)); const isEn = profile.gameLang === "en"; 
        let ro = isEn ? "RED" : "ROJO";
        let qs = isEn ? "Paint COLOR?" : "¿COLOR de la pintura?";
        let fk = isEn ? { "ROJO":"RED", "AZUL":"BLUE", "VERDE":"GREEN", "AMARILLO":"YELLOW" } : { "ROJO":"ROJO", "AZUL":"AZUL", "VERDE":"VERDE", "AMARILLO":"AMARILLO" };
        let fc = fk[c];
        let pool = Object.keys(COLORS).map(k=>fk[k]);
        let fallback = ()=>pool[0];
        let renderCol = (n) => `<span style="color:${COLORS[Object.keys(fk).find(k=>fk[k]===n)]}; text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">${n}</span>`;
        return { m: `<span style="color:${COLORS[c]}">${ro}</span>`, q: qs, c: renderCol(fc), f: getUniqueFalses(fc, pool, fallback).map(renderCol), tags:['logic', 'react'], explain:`Había que mirar el color de la pintura, no solo leer la palabra.` }; },
      memory: () => {
        if(state.secretPending) { let a = state.secretCode; state.secretPending=false; return { m:"🧠", q:"Número secreto:", c:a, f:[a+1,a-2,a+5], tags:['memory'], explain:`El número que mostré para memorizar era ${a}.` }; }
        let tData = THEMES[state.theme]||THEMES['mix']; let emojis = shuffle([...tData.e]).slice(0,4); let p = Math.floor(Math.random()*4); 
        return { m:emojis.join(' '), q:`POSICIÓN ${p+1}`, c:emojis[p], f:getUniqueFalses(emojis[p], tData.e, ()=>rand(tData.e)), tags:['memory', 'logic'], explain:`En la posición ${p+1} estaba ${emojis[p]}.` }; 
      },
      general: () => { 
        // Marcador para las preguntas generales (¡Listo para recibir más del usuario!)
        return { m:"🌍", q:"¿Planeta en el que vivimos?", c:"TIERRA", f:["MARTE","LUNA","SOL"], tags:['general'], explain:"Vivimos en el planeta Tierra." }; 
      },
      riddles: () => { 
        return { m:"🧩", q:"Vuelo sin alas y lloro sin ojos.", c:"NUBE", f:["VIENTO","FANTASMA","LLUVIA"], tags:['riddles', 'logic'], explain:"La nube flota y puede soltar lluvia, como si llorara." }; 
      },
      english: () => {
        const qs=[
          {q:"What color is the sky?",        opts:["Blue","Green","Red","Yellow"],           a:0},
          {q:"How many legs does a dog have?", opts:["2","4","6","8"],                        a:1},
          {q:"What is 2+3?",                   opts:["Four","Five","Six","Seven"],            a:1},
          {q:"Which animal says 'moo'?",       opts:["Dog","Cat","Cow","Duck"],               a:2},
          {q:"Opposite of 'hot':",             opts:["Warm","Big","Cold","Fast"],             a:2},
          {q:"'Manzana' in English:",          opts:["Orange","Apple","Banana","Grape"],      a:1},
          {q:"After Monday comes:",            opts:["Sunday","Wednesday","Tuesday","Friday"],a:2},
          {q:"Shape with 3 sides:",            opts:["Circle","Square","Triangle","Oval"],    a:2},
          {q:"'Perro' in English:",            opts:["Cat","Dog","Bird","Fish"],              a:1},
          {q:"'Agua' in English:",             opts:["Fire","Water","Earth","Wind"],          a:1}
        ];
        const it=qs[Math.floor(Math.random()*qs.length)];
        return { m:"🇬🇧", q:it.q, c:it.opts[it.a], f:it.opts.filter((o,i)=>i!==it.a), tags:['english'], explain:`Correct answer: ${it.opts[it.a]}.` };
      },
    };

    window.QUESTIONS = QUESTIONS;
    window.getQuestionFromDB = getQuestionFromDB;
    export { QUESTIONS, getQuestionFromDB };
