// validate_db_mvp_6_7.js — Agente Contenido (2026-10-03)
// Uso: node .agents/scripts/validate_db_mvp_6_7.js
'use strict';
const fs = require('fs');
const path = require('path');
const ROOT = path.resolve(__dirname, '..', '..');
const db = JSON.parse(fs.readFileSync(path.join(ROOT, 'assets', 'data', 'db_mvp_6_7.json'), 'utf8'));
const CATS = ['ciencias', 'historia', 'ingles', 'lenguaje', 'logica', 'matematicas'];
const errs = []; let total = 0, withImg = 0; const seen = new Map(); const perCat = {}; const diffs = {};
const countRe = /(¿\s*cu[aá]nt[oa]s|\bcount\b|what number|cuenta las|how many)/i;
const countNoImg = [];
const keys = Object.keys(db);
if (keys.join() !== CATS.join()) errs.push('Claves de categoría inesperadas: ' + keys.join());
for (const c of CATS) {
  const arr = db[c] || []; perCat[c] = arr.length;
  arr.forEach((it, i) => {
    total++; const id = `${c}[${i}]`;
    const allowed = ['q', 'opts', 'correct', 'trap', 'diff', 'cat', 'age', 'time', 'oa', 'img'];
    Object.keys(it).forEach(k => { if (!allowed.includes(k)) errs.push(`${id}: clave extra ${k}`); });
    if (typeof it.q !== 'string' || !it.q.trim()) errs.push(`${id}: q vacío`);
    if (!Array.isArray(it.opts) || it.opts.length !== 4 || it.opts.some(o => typeof o !== 'string' || !o.trim())) errs.push(`${id}: opts inválidas`);
    if (new Set((it.opts || []).map(o => o.toLowerCase())).size !== 4) errs.push(`${id}: opts duplicadas`);
    if (!Number.isInteger(it.correct) || it.correct < 0 || it.correct > 3) errs.push(`${id}: correct fuera de rango`);
    if (typeof it.trap !== 'boolean') errs.push(`${id}: trap no bool`);
    if (!['easy', 'medium', 'hard'].includes(it.diff)) errs.push(`${id}: diff inválido`);
    diffs[it.diff] = (diffs[it.diff] || 0) + 1;
    if (it.cat !== c) errs.push(`${id}: cat ${it.cat}`);
    if (it.age !== '6-7') errs.push(`${id}: age`);
    if (typeof it.time !== 'number' || it.time <= 0) errs.push(`${id}: time`);
    if (typeof it.oa !== 'string' || !/^[A-Z]{3}-\d{2}$/.test(it.oa)) errs.push(`${id}: oa ${it.oa}`);
    if (/\((imagen|dibujo)/i.test(it.q)) errs.push(`${id}: q contiene nota de imagen`);
    if (/\\/.test(it.q) || it.opts.some(o => /\\/.test(o))) errs.push(`${id}: backslash residual`);
    if ('img' in it) {
      withImg++;
      if (!/^assets\/preguntas\/t1_mvp\/mvp_[a-z]+_\d{3}\.webp$/.test(it.img)) errs.push(`${id}: img formato ${it.img}`);
      if (!fs.existsSync(path.join(ROOT, it.img))) errs.push(`${id}: img no existe ${it.img}`);
    } else {
      if (countRe.test(it.q)) countNoImg.push(`${id}: ${it.q}`);
      if (/\b(imagen|image|picture|dibujo)\b/i.test(it.q)) errs.push(`${id}: menciona imagen pero no tiene img`);
    }
    const k = it.q.trim().toLowerCase();
    if (seen.has(k)) errs.push(`${id}: q duplicada con ${seen.get(k)}`); else seen.set(k, id);
  });
}
console.log(JSON.stringify({ total, perCat, withImg, withoutImg: total - withImg, diffs, uniqueQ: seen.size, errors: errs, countNoImg }, null, 2));
process.exit(errs.length ? 1 : 0);
