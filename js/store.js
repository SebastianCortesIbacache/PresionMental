export const THEMES = {
  mix: { e:["⭐","🔥","⚡","🎈","💎"], w:[{w:"JUEGO",s:2},{w:"TIEMPO",s:2}], label:"Mix Total", icon:"🎲" },
  naturaleza: { e:["🌲","🌺","☀️","🌧️","🍄","🍁","🌵","🌴"], w:[{w:"ARBOL",s:2},{w:"FLOR",s:1},{w:"LLUVIA",s:2}], label:"Selva", icon:"🌿" },
  oceano: { e:["🐟","🐬","🦈","🐙","🦀","🐚","🌊","🦑"], w:[{w:"AGUA",s:2},{w:"MAR",s:1},{w:"OLA",s:2}], label:"Océano", icon:"🌊" },
  laboratorio: { e:["🧪","🔬","🧬","💉","🦠","💻","⚙️","🔋"], w:[{w:"CIENCIA",s:3},{w:"VIRUS",s:2},{w:"ATOMO",s:3}], label:"Laboratorio", icon:"🧪" },
  magia: { e:["✨","🧙‍♂️","🔮","🦄","🐉","👑","🏰","🧚"], w:[{w:"MAGIA",s:2},{w:"HECHIZO",s:3},{w:"DRAGON",s:2}], label:"Magia", icon:"✨" },
  espacio: { e:["🚀","⭐","🌙","🪐","🛸","👽","☄️","🔭"], w:[{w:"LUNA",s:2},{w:"SOL",s:1},{w:"NAVE",s:2}], label:"Espacio", icon:"🚀" }
};

export const COLORS = { "ROJO": "#FF3D00", "AZUL": "#00E5FF", "VERDE": "#00E676", "AMARILLO": "#FFEA00" };
export function fmtColor(n) { return COLORS[n] ? `<span style="color:${COLORS[n]}; text-shadow: 1px 1px 2px rgba(0,0,0,0.8);">${n}</span>` : n; }

export const SHOP_ITEMS = {
  mascots: [
    {id:"m_panda", name:"Panda", icon:"", price:0},
    {id:"m_cat", name:"Gato", icon:"", price:80},
    {id:"m_dog", name:"Perro", icon:"", price:80},
    {id:"m_rabbit", name:"Conejo", icon:"", price:100},
    {id:"m_bear", name:"Oso", icon:"", price:120},
    {id:"m_capybara", name:"Capibara", icon:"", price:100},
    {id:"m_fox", name:"Zorro", icon:"", price:150},
    {id:"m_penguin", name:"Pingüino", icon:"", price:150},
    {id:"m_owl", name:"Búho", icon:"", price:200},
    {id:"m_dragon", name:"Dragón", icon:"", price:300}
  ],
  hats: [
    {id:"c_none", name:"Nada", icon:"", price:0},
    {id:"c_gafas", name:"Gafas", icon:"", price:60},
    {id:"c_sombrero", name:"Sombrero", icon:"", price:120},
    {id:"c_corona", name:"Corona", icon:"", price:200},
    {id:"p_super_heroe", name:"Súper Héroe", icon:"", price:150}
  ],
  powerups: [
    {id:"pw_freeze", name:"Congelar (5s)", icon:"❄️", price:200},
    {id:"pw_skip", name:"Saltar Preg.", icon:"⏭️", price:300},
    {id:"pw_shield", name:"Escudo Mágico", icon:"🛡️", price:500},
    {id:"pw_time", name:"Tiempo Extra", icon:"⏱️", price:350},
    {id:"pw_hint", name:"Pista Mental", icon:"💡", price:450},
    {id:"pw_valiente", name:"Bonus Valiente", icon:"🌟", price:400}
  ]
};

export const WORLDS = [
  {name: "Isla de Inicio", theme: "naturaleza", bg: "linear-gradient(to bottom, #8BE3FF 0%, #B7F27A 52%, #4CAF50 100%)", icon: "🌴", start:1, end:10, deco:["🌳","🌼","🍄","🌲"], stages:["Prado Suma","Puente Lógico","Colina Eco","Cueva Par","Río Rápido","Bosque Vocal","Seta Secreta","Tronco Mental","Lago Memoria","Castillo Hoja"]},
  {name: "Océano Profundo", theme: "oceano", bg: "linear-gradient(to bottom, #4FC3F7 0%, #0288D1 48%, #003B73 100%)", icon: "🌊", start:11, end:20, deco:["🐚","🪸","🐟","🫧"], stages:["Orilla Azul","Burbuja Uno","Arrecife Par","Cueva Coral","Pulpo Giro","Marea Rápida","Perla Lógica","Túnel Marino","Tesoro Salado","Trono Océano"]},
  {name: "Laboratorio Loco", theme: "laboratorio", bg: "linear-gradient(to bottom, #DCE775 0%, #827717 50%, #263000 100%)", icon: "🧪", start:21, end:30, deco:["⚗️","🔬","⚙️","🧬"], stages:["Botón Verde","Cable Rojo","Probeta Salta","Robot Mini","Código Chispa","Lupa Rápida","Virus Cero","Tubo Mental","Mega Fórmula","Jefe Experimento"]},
  {name: "Bosque Mágico", theme: "magia", bg: "linear-gradient(to bottom, #CE93D8 0%, #7B1FA2 48%, #1A052E 100%)", icon: "✨", start:31, end:40, deco:["🔮","🪄","🌙","🏰"], stages:["Polvo Lunar","Varita Uno","Puerta Brillo","Hongo Brujo","Dragón Bebé","Runa Rápida","Nube Lila","Llave Mágica","Portal Lógico","Castillo Encanto"]},
  {name: "Espacio Infinito", theme: "espacio", bg: "linear-gradient(to bottom, #283593 0%, #0D1645 48%, #000 100%)", icon: "🚀", start:41, end:50, deco:["⭐","🪐","☄️","👽"], stages:["Base Luna","Anillo Par","Cometa Veloz","Satélite Eco","Alien Guiño","Órbita Azul","Meteorito","Nave Memoria","Galaxia Giro","Portal Final"]}
];

export const SKILLS_META = {
  math: { icon: "🧮", label: "Matemática", color: "#FF3D00" },
  lang: { icon: "🔤", label: "Lenguaje", color: "#FFEA00" },
  logic: { icon: "🧠", label: "Lógica", color: "#00E5FF" },
  memory: { icon: "💾", label: "Memoria", color: "#00E676" },
  general: { icon: "🔬", label: "General", color: "#E040FB" },
  react: { icon: "🎯", label: "Reacción", color: "#FF9100" },
  riddles: { icon: "🧩", label: "Acertijos", color: "#1DE9B6" },
  ciencias: { icon: "🔬", label: "Ciencias", color: "#E040FB" },
  historia: { icon: "🏛️", label: "Historia", color: "#FF9100" },
  ingles: { icon: "🇬🇧", label: "Inglés", color: "#00E5FF" },
  lenguaje: { icon: "🔤", label: "Lenguaje", color: "#FFEA00" }
};

export const BADGES = [
  { id:'first_steps', name:'Primeros Pasos', desc:'Ya gateas, ahora vamos a caminar.', icon:'&#127775;', req:p => (p.maxLevel||1) >= 2 || (p.score||0) > 0 },
  { id:'daily_player', name:'Constante', desc:'Volviste a entrenar el cerebro. Eso suma.', icon:'&#128197;', req:p => (p.missionStats?.dailyDone||0) >= 1 },
  { id:'star_collector', name:'Coleccionista', desc:'Tus estrellas ya piden una vitrina.', icon:'&#11088;', req:p => (p.score||0) >= 1000 },
  { id:'star_bank', name:'Banco Estelar', desc:'Ahorraste como genio con alcancía espacial.', icon:'&#127776;', req:p => (p.score||0) >= 3000 },
  { id:'streak_10', name:'Racha 10', desc:'Diez respuestas seguidas. La mente hizo turbo.', icon:'&#128293;', req:p => (p.maxStreak||0) >= 10 },
  { id:'streak_20', name:'Racha 20', desc:'Esto ya parece entrenamiento de superhéroe.', icon:'&#127942;', req:p => (p.maxStreak||0) >= 20 },
  { id:'math_hero', name:'Calculín', desc:'Los números vieron venir tu respuesta y corrieron.', icon:'&#129518;', req:p => (p.missionStats?.math||0) >= 25 },
  { id:'logic_hero', name:'Detective', desc:'Las pistas no se esconden de ti.', icon:'&#129504;', req:p => (p.missionStats?.logic||0) >= 20 },
  { id:'memory_hero', name:'Memoria Ninja', desc:'Guardaste datos como mochila secreta.', icon:'&#128190;', req:p => (p.missionStats?.memory||0) >= 15 },
  { id:'fast_brain', name:'Cerebro Rápido', desc:'Pensaste antes de que el reloj pestañeara.', icon:'&#9889;', req:p => (p.missionStats?.fast||0) >= 10 },
  { id:'world_1', name:'Aventurero', desc:'Primer mundo abierto. Ya huele a viaje épico.', icon:'&#128506;&#65039;', req:p => (p.maxLevel||1) >= 11 },
  { id:'world_2', name:'Buceador Mental', desc:'Entraste al océano sin mojar las ideas.', icon:'&#127754;', req:p => (p.maxLevel||1) >= 21 },
  { id:'world_3', name:'Científico', desc:'El laboratorio te dio bata imaginaria.', icon:'&#129514;', req:p => (p.maxLevel||1) >= 31 },
  { id:'world_4', name:'Mago Lógico', desc:'Magia no, práctica con chispas.', icon:'&#10024;', req:p => (p.maxLevel||1) >= 41 },
  { id:'world_5', name:'Galáctico', desc:'Tu cerebro ya tiene pasaporte espacial.', icon:'&#128640;', req:p => (p.maxLevel||1) >= 50 },
  { id:'shopper', name:'Comprador', desc:'La tienda te conoce por tu nombre.', icon:'&#128722;', req:p => Array.isArray(p.inventory) && p.inventory.length >= 3 },
  { id:'stylist', name:'Estilista', desc:'Pensar con accesorios también cuenta.', icon:'&#128374;&#65039;', req:p => Array.isArray(p.inventory) && p.inventory.filter(x=>x.startsWith('c_')).length >= 5 },
  { id:'pet_friend', name:'Amigo de Mascotas', desc:'Tu equipo ya parece fiesta de recreo.', icon:'&#128062;', req:p => Array.isArray(p.inventory) && p.inventory.filter(x=>x.startsWith('m_')).length >= 5 },
  { id:'power_ready', name:'Comodín Listo', desc:'Preparado por si el reloj se pone intenso.', icon:'&#128161;', req:p => p.powerups && Object.values(p.powerups).reduce((a,b)=>a+(b||0),0) >= 8 },
  { id:'skill_master', name:'Mente Fuerte', desc:'Tu tablero de destrezas está brillante.', icon:'&#129504;', req:p => p.destrezas && Object.keys(SKILLS_META).every(k => typeof p.destrezas[k] === 'number' && p.destrezas[k] >= 90) }
];

export let defaultProfile = { 
  score: 0, lastDate: "", maxLevel: 1, maxStreak: 0,
  destrezas: { math: 100, lang: 100, logic: 100, memory: 100, general: 100, react: 100, riddles: 100, ciencias: 100, historia: 100, ingles: 100, lenguaje: 100 },
  inventory: ["m_panda", "c_none"], equipM: "m_panda", equipH: "c_none", 
  powerups: { pw_freeze: 2, pw_skip: 1, pw_shield: 1, pw_time: 1, pw_hint: 1, pw_valiente: 1 },
  equipPowerups: ['pw_freeze','pw_valiente'],
  badges: [], missions: [], missionStats: { dailyDone:0, math:0, logic:0, memory:0, fast:0 },
  stats: { games:0, answers:0, correct:0, totalTime:0, failsByTag:{}, streaksByDay:{} }
};

export function generateHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash.toString(36);
}

let savedProfileStr = localStorage.getItem('pm_profile_v5');
let savedHash = localStorage.getItem('pm_profile_v5_hash');
export let profile = defaultProfile;

if (savedProfileStr) {
  try {
    let parsed = JSON.parse(savedProfileStr);
    let expectedHash = generateHash(savedProfileStr);
    if (savedHash && savedHash !== expectedHash) {
      console.warn("Manipulación de LocalStorage detectada. Penalizando estrellas.");
      parsed.score = 0; // Reiniciar estrellas a un valor seguro
    }
    profile = parsed;
  } catch(e) {
    console.error("Error parsing profile", e);
  }
}
profile = Object.assign({}, defaultProfile, profile);
profile.destrezas = Object.assign({}, defaultProfile.destrezas, profile.destrezas || {});
profile.powerups = Object.assign({}, defaultProfile.powerups, profile.powerups || {});
profile.missionStats = Object.assign({}, defaultProfile.missionStats, profile.missionStats || {});
profile.stats = Object.assign({}, defaultProfile.stats, profile.stats || {});
profile.stats.failsByTag = Object.assign({}, defaultProfile.stats.failsByTag, profile.stats.failsByTag || {});
profile.stats.streaksByDay = Object.assign({}, defaultProfile.stats.streaksByDay, profile.stats.streaksByDay || {});
if(!Array.isArray(profile.equipPowerups)) profile.equipPowerups = [...defaultProfile.equipPowerups];
profile.equipPowerups = profile.equipPowerups.filter(id => SHOP_ITEMS.powerups.some(p => p.id === id)).slice(0, 2);
while(profile.equipPowerups.length < 2) profile.equipPowerups.push(defaultProfile.equipPowerups[profile.equipPowerups.length]);
if(profile.themeMode === 'high-contrast') profile.themeMode = 'dark';
if(!Array.isArray(profile.inventory)) profile.inventory = [...defaultProfile.inventory];
const legacyMap = {
  "panda": "m_panda", "cat": "m_cat", "dog": "m_dog", "rabbit": "m_rabbit", "bear": "m_bear",
  "capybara": "m_capybara", "fox": "m_fox", "penguin": "m_penguin", "owl": "m_owl", "dragon": "m_dragon",
  "none": "c_none", "gafas": "c_gafas", "sombrero": "c_sombrero", "corona": "c_corona", "super_heroe": "p_super_heroe"
};
if (legacyMap[profile.equipM]) profile.equipM = legacyMap[profile.equipM];
if (legacyMap[profile.equipH]) profile.equipH = legacyMap[profile.equipH];
profile.inventory = profile.inventory.map(item => legacyMap[item] || item);
if (!profile.inventory.includes("m_panda")) profile.inventory.push("m_panda");
if (!profile.inventory.includes("c_none")) profile.inventory.push("c_none");
if (!SHOP_ITEMS.mascots.some(m => m.id === profile.equipM)) profile.equipM = "m_panda";
if (!SHOP_ITEMS.hats.some(h => h.id === profile.equipH)) profile.equipH = "c_none";
if(!Array.isArray(profile.badges)) profile.badges = [];
if(!Array.isArray(profile.missions)) profile.missions = [];

export let state = { mode: 'normal', theme: 'mix', includeEnglish: false, level: 1, streak: 0, reqStreak: 5, secretCode: null, secretPending: false, timeLeft: 100, timer: null, frozen: false, shield: false, valiente: false, isMap: false, currentTags: [], currentAnswer: '', currentExplain: '', lives: 3 };
export let playerAge = parseInt(localStorage.getItem('pm_playerAge')) || 7;

// Hacer globales para compatibilidad temporal con HTML
window.THEMES = THEMES;
window.COLORS = COLORS;
window.fmtColor = fmtColor;
window.SHOP_ITEMS = SHOP_ITEMS;
window.WORLDS = WORLDS;
window.SKILLS_META = SKILLS_META;
window.BADGES = BADGES;
window.defaultProfile = defaultProfile;
window.profile = profile;
window.state = state;
window.playerAge = playerAge;
