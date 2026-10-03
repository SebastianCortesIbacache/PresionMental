// build_db_mvp_6_7.js — Agente Contenido (2026-10-03)
// Convierte Preguntas/Seleccion_Lanzamiento_200.md -> assets/data/db_mvp_6_7.json
// Fuente de verdad del TEXTO: el .md. Metadatos (diff, time, oa, trap): db_6_7.json.
// Uso: node .agents/scripts/build_db_mvp_6_7.js
'use strict';
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const MD = path.join(ROOT, 'Preguntas', 'Seleccion_Lanzamiento_200.md');
const DB = path.join(ROOT, 'assets', 'data', 'db_6_7.json');
const OUT = path.join(ROOT, 'assets', 'data', 'db_mvp_6_7.json');
const IMG_DIR = 'assets/preguntas/t1_mvp/';

const CAT_MAP = {
  'ciencias': 'ciencias', 'historia': 'historia', 'ingles': 'ingles',
  'lenguaje': 'lenguaje', 'logica acertijos': 'logica', 'matematicas': 'matematicas'
};
const OA_PREFIX = { ciencias: 'CIE', historia: 'HIS', ingles: 'ENG', lenguaje: 'LEN', logica: 'LOG', matematicas: 'MAT' };

const db = JSON.parse(fs.readFileSync(DB, 'utf8'));
const md = fs.readFileSync(MD, 'utf8').replace(/\r/g, '');

// Valores por defecto por categoría = moda (valor más frecuente) en db_6_7.json.
const mode = arr => { const c = {}; arr.forEach(v => c[v] = (c[v] || 0) + 1); return Object.keys(c).sort((a, b) => c[b] - c[a])[0]; };
const CAT_DEFAULTS = {};
for (const k of Object.keys(OA_PREFIX)) {
  const b = db[k] || [];
  CAT_DEFAULTS[k] = {
    diff: mode(b.map(x => x.diff)) || 'easy',
    time: Number(mode(b.map(x => x.time))) || 35,
    oa: mode(b.map(x => x.oa)) || OA_PREFIX[k] + '-01'
  };
}

const norm = s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  .replace(/[^a-z0-9ñ ]/g, ' ').replace(/\s+/g, ' ').trim();
function dice(a, b) {
  const A = new Set(norm(a).split(' ')), B = new Set(norm(b).split(' '));
  let inter = 0; for (const w of A) if (B.has(w)) inter++;
  return (2 * inter) / (A.size + B.size || 1);
}
function clean(s) {
  return s
    .replace(/\\([\-\)\(\[\]_*])/g, '$1')            // escapes markdown
    .replace(/[\u201C\u201D\u00AB\u00BB]/g, '"')
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}
function stripImageNotes(q) {
  return q.replace(/\(\s*(Imagen|Dibujo)[^)]*\)/gi, '').replace(/\s+/g, ' ').trim();
}

// Auditoría visual 2026-10-03: ilustraciones cuyo contenido CONTRADICE la respuesta del .md.
// Se omite `img` (para no confundir al niño) hasta que el Agente Gráfico las regenere.
// Para restaurarlas basta con quitar la entrada de este set y re-ejecutar el script.
const DROP_IMG = new Set([
  'ingles#11',        // mvp_ingles_011.webp muestra "19", la respuesta es Ten (10)
  'matematicas#111',  // mvp_matematicas_111.webp muestra 15 estrellas, la respuesta es 11
  'historia#41'       // mvp_historia_041.webp marca Norteamérica/Europa/Asia, no América-Oceanía-Antártica
]);

// Overrides manuales: preguntas de conteo/observación sin imagen que requieren emojis.
// clave: `${cat}#${num}` -> texto q final.
const Q_OVERRIDES = {
  'ingles#11': '👉 10 👈 What number is this?',
  'matematicas#111': '⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ¿Cuántas estrellas ves?',
  // Inglés: enunciados idénticos en el .md ("What's this?" x6, "This is my..." x2) que solo
  // se diferencian por la ilustración. El contrato exige q única, así que se antepone un
  // campo semántico que NO revela la respuesta (las 4 opciones pertenecen al mismo campo).
  'ingles#31': "School things! What's this?",
  'ingles#81': "My body! What's this?",
  'ingles#91': "My face! What's this?",
  'ingles#131': "Pets! What's this?",
  'ingles#151': "Food! What's this?",
  'ingles#171': "Toys! What's this?",
  'ingles#111': 'My family! This is my...',
  'ingles#121': 'Meet my family! This is my...'
};

const out = {}; const report = { matched: [], fallback: [], defaults: [], errors: [] };
let cat = null;
const lineRe = /^(\d+)-\s*(.+?)\s*\[A\.\s*(.+?)\s+B\.\s*(.+?)\s+C\.\s*(.+?)\s+D\.\s*(.+?)\]\s*\|\s*Respuesta:\s*([ABCD])\s*\|\s*Imagen:\s*(S[ií]|No)(.*)$/;

for (const raw of md.split('\n')) {
  const line = raw.trim();
  if (!line) continue;
  const h = line.match(/^##\s+(.+)$/);
  if (h) {
    const key = norm(h[1]);
    cat = CAT_MAP[key];
    if (!cat) report.errors.push('Categoría desconocida: ' + h[1]);
    else out[cat] = out[cat] || [];
    continue;
  }
  if (!/^\d+-/.test(line)) continue;
  const m = line.match(lineRe);
  if (!m || !cat) { report.errors.push('Línea no parseable: ' + line.slice(0, 80)); continue; }
  const num = parseInt(m[1], 10);
  let q = stripImageNotes(clean(m[2]));
  const opts = [m[3], m[4], m[5], m[6]].map(clean);
  const correct = 'ABCD'.indexOf(m[7]);
  const hasImg = /^S/i.test(m[8]);
  let img = null;
  if (hasImg) {
    const f = m[9].match(/\[ARCHIVO:\s*([^\]\s]+)\s*\]/);
    if (!f) report.errors.push(`Sin ARCHIVO pese a Imagen: Sí -> ${cat}#${num}`);
    else img = IMG_DIR + f[1];
  }
  const key = `${cat}#${num}`;
  if (img && DROP_IMG.has(key)) { report.dropped = (report.dropped || []).concat(key + ' <- ' + img); img = null; }
  const ov = Q_OVERRIDES[key];
  if (ov) q = ov;

  // Metadatos desde db_6_7.json: se acepta un candidato si comparte >=3 opciones,
  // o >=2 opciones y similitud de enunciado >=0.5. Primero por posición (N-1), luego en todo el banco.
  const bank = db[cat] || [];
  const optSet = new Set(opts.map(norm));
  const overlap = it => (it.opts || []).filter(o => optSet.has(norm(o))).length;
  const ansN = norm(opts[correct]);
  const sameAns = it => it.opts && norm(it.opts[it.correct] || '') === ansN;
  const ok = it => {
    const s = dice(it.q, q), ov2 = overlap(it);
    return s >= 0.8 || (sameAns(it) && (ov2 >= 3 || (ov2 >= 2 && s >= 0.5)));
  };
  let src = bank[num - 1], how = 'index';
  const score = src ? dice(src.q, q) : 0;
  if (!src || !ok(src)) {
    let best = null, bs = -1;
    bank.forEach((it, i) => { if (!ok(it)) return; const s = overlap(it) + dice(it.q, q); if (s > bs) { bs = s; best = { it, i }; } });
    if (best) { src = best.it; how = `fallback@${best.i + 1}`; }
    else { src = null; how = 'default'; }
  }
  const d = CAT_DEFAULTS[cat];
  const item = {
    q, opts, correct,
    trap: src ? !!src.trap : false,
    diff: src && ['easy', 'medium', 'hard'].includes(src.diff) ? src.diff : d.diff,
    cat, age: '6-7',
    time: src && typeof src.time === 'number' ? src.time : d.time,
    oa: src && src.oa ? src.oa : d.oa
  };
  if (img) item.img = img;
  out[cat].push(item);
  const rec = { id: `${cat}#${num}`, how, score: +score.toFixed(2) };
  if (src && src.correct !== undefined && src.opts) {
    const srcAns = norm(src.opts[src.correct] || '');
    if (srcAns !== norm(opts[correct])) rec.answerDiff = `${src.opts[src.correct]} vs ${opts[correct]}`;
  }
  (how === 'index' ? report.matched : how === 'default' ? report.defaults : report.fallback).push(rec);
}

const ordered = {};
for (const k of ['ciencias', 'historia', 'ingles', 'lenguaje', 'logica', 'matematicas']) ordered[k] = out[k] || [];
fs.writeFileSync(OUT, JSON.stringify(ordered, null, 2) + '\n', 'utf8');

console.log('Matched by index:', report.matched.length);
console.log('Fallback:', report.fallback.length, JSON.stringify(report.fallback));
console.log('Defaults:', report.defaults.length, JSON.stringify(report.defaults));
console.log('Answer text differs from db:', JSON.stringify([...report.matched, ...report.fallback].filter(r => r.answerDiff)));
console.log('Errors:', JSON.stringify(report.errors));
console.log('Img omitidas (DROP_IMG):', JSON.stringify(report.dropped || []));
