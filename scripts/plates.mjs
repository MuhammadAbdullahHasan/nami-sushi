// Draws the top-down dish illustrations used by the menu (no photos needed).
// Run: node scripts/plates.mjs  ->  public/plates/*.svg and public/dishes/*.svg
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

let seed = 7;
const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
const f = (n) => n.toFixed(1);

const svg = (body, defs = "") =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400"><defs>${defs}${COMMON}</defs>${body}</svg>`;

const COMMON = `
<radialGradient id="plate" cx="42%" cy="38%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#f1eee8"/><stop offset="1" stop-color="#d9d4cb"/></radialGradient>
<radialGradient id="well" cx="45%" cy="40%" r="65%"><stop offset="0" stop-color="#fbfaf7"/><stop offset="1" stop-color="#e7e2d9"/></radialGradient>
<radialGradient id="slate" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="#3a3b3d"/><stop offset="1" stop-color="#17181a"/></radialGradient>
<radialGradient id="rice" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#fffdf7"/><stop offset="1" stop-color="#e9e3d4"/></radialGradient>
<linearGradient id="salmon" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffa173"/><stop offset="1" stop-color="#ee6a3d"/></linearGradient>
<linearGradient id="tuna" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e2475a"/><stop offset="1" stop-color="#a81d34"/></linearGradient>
<linearGradient id="ebi" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff3ea"/><stop offset=".5" stop-color="#ffb08a"/><stop offset="1" stop-color="#ff7d55"/></linearGradient>
<linearGradient id="egg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe07a"/><stop offset="1" stop-color="#f0b938"/></linearGradient>
<radialGradient id="nori" cx="35%" cy="30%" r="80%"><stop offset="0" stop-color="#34433a"/><stop offset="1" stop-color="#121a15"/></radialGradient>
<radialGradient id="bead" cx="35%" cy="30%" r="70%"><stop offset="0" stop-color="#ffd27a"/><stop offset=".5" stop-color="#ff7a1f"/><stop offset="1" stop-color="#c2410c"/></radialGradient>
<radialGradient id="broth" cx="45%" cy="40%" r="70%"><stop offset="0" stop-color="#f3c987"/><stop offset="1" stop-color="#c47f33"/></radialGradient>
<radialGradient id="bowlDark" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="#4a3a30"/><stop offset="1" stop-color="#1f1612"/></radialGradient>
<filter id="soft" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6"/></filter>`;

const plate = (fill = "url(#plate)") =>
  `<circle cx="200" cy="204" r="190" fill="#000" opacity=".12" filter="url(#soft)"/>` +
  `<circle cx="200" cy="200" r="194" fill="${fill}"/>` +
  `<circle cx="200" cy="200" r="150" fill="${fill === "url(#plate)" ? "url(#well)" : fill}" stroke="#000" stroke-opacity=".06" stroke-width="2"/>` +
  `<path d="M70 120 A150 150 0 0 1 150 60" stroke="#fff" stroke-opacity=".7" stroke-width="6" fill="none" stroke-linecap="round"/>`;

const grains = (cx, cy, rx, ry, n = 40) => {
  let s = "";
  for (let i = 0; i < n; i++) {
    const a = rnd() * Math.PI * 2, d = Math.sqrt(rnd());
    s += `<ellipse cx="${f(cx + Math.cos(a) * rx * d)}" cy="${f(cy + Math.sin(a) * ry * d)}" rx="4.5" ry="2.4" transform="rotate(${f(rnd() * 180)} ${f(cx + Math.cos(a) * rx * d)} ${f(cy + Math.sin(a) * ry * d)})" fill="#fff" stroke="#d8d0bd" stroke-width=".6"/>`;
  }
  return s;
};

const shadow = (cx, cy, rx, ry, rot = 0) =>
  `<ellipse cx="${cx + 4}" cy="${cy + 8}" rx="${rx}" ry="${ry}" fill="#000" opacity=".18" filter="url(#soft)" transform="rotate(${rot} ${cx} ${cy})"/>`;

function nigiri(cx, cy, rot, fish) {
  const stripes = fish === "salmon" || fish === "ebi";
  let s = shadow(cx, cy, 64, 30, rot);
  s += `<g transform="rotate(${rot} ${cx} ${cy})">`;
  s += `<ellipse cx="${cx}" cy="${cy}" rx="58" ry="30" fill="url(#rice)"/>` + grains(cx, cy, 54, 26, 26);
  if (fish === "tamago") {
    s += `<rect x="${cx - 62}" y="${cy - 26}" width="124" height="52" rx="10" fill="url(#egg)"/>`;
    for (let i = 1; i < 4; i++) s += `<line x1="${cx - 58}" y1="${cy - 26 + i * 13}" x2="${cx + 58}" y2="${cy - 26 + i * 13}" stroke="#d9982a" stroke-opacity=".45" stroke-width="2"/>`;
    s += `<rect x="${cx - 10}" y="${cy - 30}" width="22" height="60" rx="3" fill="url(#nori)"/>`;
  } else {
    s += `<rect x="${cx - 66}" y="${cy - 28}" width="132" height="56" rx="26" fill="url(#${fish})"/>`;
    if (stripes) for (let i = -3; i <= 3; i++) s += `<path d="M${cx + i * 18 - 12} ${cy - 24} Q${cx + i * 18} ${cy} ${cx + i * 18 + 10} ${cy + 24}" stroke="#fff" stroke-opacity="${fish === "ebi" ? ".7" : ".55"}" stroke-width="${fish === "ebi" ? 5 : 4}" fill="none" stroke-linecap="round"/>`;
    if (fish === "ebi") s += `<path d="M${cx + 64} ${cy - 10} l22 -14 l-6 14 l6 14 z" fill="#ff5a36"/>`;
    s += `<ellipse cx="${cx - 24}" cy="${cy - 14}" rx="26" ry="6" fill="#fff" opacity=".35"/>`;
  }
  return s + `</g>`;
}

function maki(cx, cy, r, fill) {
  let s = shadow(cx, cy, r, r * 0.9);
  s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#nori)"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.82}" fill="url(#rice)"/>` + grains(cx, cy, r * 0.75, r * 0.75, Math.round(r / 2));
  s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.36}" fill="${fill}"/>`;
  s += `<circle cx="${cx - r * 0.1}" cy="${cy - r * 0.12}" r="${r * 0.14}" fill="#fff" opacity=".35"/>`;
  return s;
}

function uramaki(cx, cy, r) {
  let s = shadow(cx, cy, r, r * 0.9);
  s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#rice)"/>` + grains(cx, cy, r * 0.9, r * 0.9, Math.round(r / 1.6));
  for (let i = 0; i < 14; i++) { const a = rnd() * 6.28, d = r * (0.55 + rnd() * 0.4); s += `<ellipse cx="${f(cx + Math.cos(a) * d)}" cy="${f(cy + Math.sin(a) * d)}" rx="2.6" ry="1.6" fill="#f6e7c3" stroke="#b99a5e" stroke-width=".5"/>`; }
  s += `<circle cx="${cx}" cy="${cy}" r="${r * 0.5}" fill="none" stroke="#1b241e" stroke-width="3"/>`;
  s += `<path d="M${cx - r * 0.3} ${cy} a${r * 0.3} ${r * 0.3} 0 0 1 ${r * 0.6} 0z" fill="#8fbf5a"/>`;
  s += `<path d="M${cx - r * 0.3} ${cy} a${r * 0.3} ${r * 0.3} 0 0 0 ${r * 0.6} 0z" fill="#f05c4f"/>`;
  s += `<rect x="${cx - r * 0.06}" y="${cy - r * 0.3}" width="${r * 0.12}" height="${r * 0.6}" fill="#fff6e8"/>`;
  return s;
}

function gunkan(cx, cy, r) {
  let s = shadow(cx, cy, r, r * 0.9);
  s += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#nori)"/><circle cx="${cx}" cy="${cy}" r="${r * 0.86}" fill="#0f1511"/>`;
  for (let i = 0; i < 26; i++) { const a = rnd() * 6.28, d = Math.sqrt(rnd()) * r * 0.7; const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d; s += `<circle cx="${f(x)}" cy="${f(y)}" r="${r * 0.15}" fill="url(#bead)"/><circle cx="${f(x - r * 0.05)}" cy="${f(y - r * 0.05)}" r="${r * 0.04}" fill="#fff" opacity=".85"/>`; }
  return s;
}

function inari(cx, cy, rot) {
  let s = shadow(cx, cy, 56, 36, rot);
  s += `<g transform="rotate(${rot} ${cx} ${cy})"><path d="M${cx - 58} ${cy} C${cx - 58} ${cy - 40} ${cx + 40} ${cy - 46} ${cx + 58} ${cy - 10} C${cx + 66} ${cy + 22} ${cx + 30} ${cy + 40} ${cx - 10} ${cy + 38} C${cx - 44} ${cy + 36} ${cx - 58} ${cy + 22} ${cx - 58} ${cy}Z" fill="#c98a3f"/>`;
  for (let i = 0; i < 30; i++) s += `<circle cx="${f(cx - 46 + rnd() * 96)}" cy="${f(cy - 28 + rnd() * 56)}" r="${f(1 + rnd() * 2.2)}" fill="#8c5a24" opacity=".45"/>`;
  s += `<ellipse cx="${cx - 18}" cy="${cy - 18}" rx="24" ry="7" fill="#fff" opacity=".25"/></g>`;
  return s;
}

const wasabi = (cx, cy) => `<path d="M${cx - 16} ${cy + 6} q4 -20 18 -16 q16 -2 14 14 q-4 12 -18 10 q-12 2 -14 -8z" fill="#9cc356"/><circle cx="${cx - 2}" cy="${cy - 4}" r="4" fill="#d8eda8" opacity=".7"/>`;
const ginger = (cx, cy) => [0, 40, 80].map((a) => `<ellipse cx="${cx}" cy="${cy}" rx="18" ry="8" transform="rotate(${a} ${cx} ${cy}) translate(8 0)" fill="#f7b9b4" opacity=".9"/>`).join("");

/* ---------------- conveyor plates (square, centred, transparent) --------------- */
const PLATES = {
  "salmon-nigiri": plate() + nigiri(200, 160, -12, "salmon") + nigiri(200, 245, -12, "salmon"),
  "maguro-nigiri": plate() + nigiri(200, 160, 10, "tuna") + nigiri(200, 245, 10, "tuna"),
  "ebi-nigiri": plate() + nigiri(190, 160, -6, "ebi") + nigiri(190, 245, -6, "ebi"),
  tamago: plate() + nigiri(200, 160, 4, "tamago") + nigiri(200, 245, 4, "tamago"),
  "tekka-maki": plate() + [[150, 150], [250, 150], [150, 250], [250, 250]].map(([x, y]) => maki(x, y, 44, "#c8283c")).join(""),
  "kappa-maki": plate() + [[150, 150], [250, 150], [150, 250], [250, 250]].map(([x, y]) => maki(x, y, 44, "#7cb342")).join(""),
  "california-roll": plate() + [[145, 155], [255, 155], [200, 255]].map(([x, y]) => uramaki(x, y, 52)).join(""),
  "ikura-gunkan": plate() + gunkan(150, 200, 52) + gunkan(252, 200, 52),
  inari: plate() + inari(200, 158, -8) + inari(200, 250, 6),
};

/* ---------------- signature dishes for the orbit hero ---------------- */
function ramen() {
  let s = `<circle cx="200" cy="206" r="192" fill="#000" opacity=".2" filter="url(#soft)"/><circle cx="200" cy="200" r="196" fill="url(#bowlDark)"/><circle cx="200" cy="200" r="168" fill="url(#broth)"/>`;
  for (let i = 0; i < 18; i++) { const y = 150 + i * 9; s += `<path d="M120 ${y} q20 -10 40 0 t40 0 t40 0 t40 0" stroke="#fbe6a6" stroke-width="5" fill="none" stroke-linecap="round" opacity=".9"/>`; }
  s += `<circle cx="140" cy="135" r="42" fill="#d99a85"/><circle cx="140" cy="135" r="30" fill="#c4705a"/><circle cx="140" cy="135" r="42" fill="none" stroke="#f3d6c4" stroke-width="5"/>`;
  s += `<circle cx="196" cy="118" r="38" fill="#d99a85"/><circle cx="196" cy="118" r="26" fill="#c4705a"/><circle cx="196" cy="118" r="38" fill="none" stroke="#f3d6c4" stroke-width="5"/>`;
  s += `<ellipse cx="270" cy="160" rx="36" ry="30" fill="#fffaf0"/><circle cx="270" cy="160" r="17" fill="#f59e0b"/><circle cx="266" cy="156" r="5" fill="#fde68a" opacity=".8"/>`;
  s += `<ellipse cx="262" cy="232" rx="36" ry="30" fill="#fffaf0"/><circle cx="262" cy="232" r="17" fill="#f59e0b"/>`;
  s += `<rect x="250" y="40" width="60" height="110" rx="6" transform="rotate(24 280 95)" fill="url(#nori)"/>`;
  for (let i = 0; i < 16; i++) { const x = 130 + rnd() * 110, y = 210 + rnd() * 90; s += `<circle cx="${f(x)}" cy="${f(y)}" r="7" fill="none" stroke="#5aa832" stroke-width="3.5"/>`; }
  for (let i = 0; i < 30; i++) s += `<ellipse cx="${f(110 + rnd() * 180)}" cy="${f(110 + rnd() * 180)}" rx="2.2" ry="1.4" fill="#f8efd8"/>`;
  return s;
}
function platter() {
  let s = `<circle cx="200" cy="206" r="190" fill="#000" opacity=".25" filter="url(#soft)"/><circle cx="200" cy="200" r="194" fill="url(#slate)"/>`;
  s += nigiri(150, 110, -20, "salmon") + nigiri(272, 128, 18, "tuna") + nigiri(120, 205, -4, "ebi");
  s += uramaki(230, 220, 40) + uramaki(300, 225, 34) + maki(170, 290, 34, "#c8283c") + maki(245, 300, 34, "#7cb342");
  s += wasabi(318, 300) + ginger(100, 285);
  return s;
}
function poke() {
  let s = `<circle cx="200" cy="206" r="192" fill="#000" opacity=".18" filter="url(#soft)"/><circle cx="200" cy="200" r="196" fill="#f6f1e8"/><circle cx="200" cy="200" r="174" fill="url(#rice)"/>` + grains(200, 200, 160, 160, 70);
  const cube = (x, y, c) => `<rect x="${x}" y="${y}" width="30" height="30" rx="6" fill="${c}" transform="rotate(${f(rnd() * 40 - 20)} ${x + 15} ${y + 15})"/>`;
  for (let i = 0; i < 9; i++) s += cube(100 + (i % 3) * 30 + rnd() * 6, 80 + Math.floor(i / 3) * 30, i % 2 ? "#ff8a5c" : "#f26b3a");
  for (let i = 0; i < 5; i++) s += `<path d="M${230 + i * 14} 90 q30 40 0 90" stroke="#7fae3e" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M${230 + i * 14} 90 q30 40 0 90" stroke="#d8e98f" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  for (let i = 0; i < 12; i++) s += `<ellipse cx="${f(110 + rnd() * 70)}" cy="${f(230 + rnd() * 70)}" rx="11" ry="8" fill="#8cc152"/>`;
  for (let i = 0; i < 7; i++) s += cube(220 + (i % 3) * 30, 230 + Math.floor(i / 3) * 28, "#fbbf24");
  for (let i = 0; i < 40; i++) s += `<ellipse cx="${f(80 + rnd() * 240)}" cy="${f(80 + rnd() * 240)}" rx="2.4" ry="1.4" fill="${rnd() > .5 ? "#222" : "#f4e4bd"}"/>`;
  return s;
}
function gyoza() {
  let s = plate();
  for (let i = 0; i < 5; i++) {
    const y = 110 + i * 42, x = 170 + (i % 2) * 8;
    s += shadow(x, y, 70, 22) + `<path d="M${x - 72} ${y} q72 -58 144 0 q-72 30 -144 0z" fill="#f6e3c0"/><path d="M${x - 66} ${y + 2} q66 22 132 0 q-66 16 -132 0z" fill="#b8742d"/>`;
    for (let k = -3; k <= 3; k++) s += `<path d="M${x + k * 16} ${y - 22 + Math.abs(k) * 3} l4 10" stroke="#d9bf92" stroke-width="3" stroke-linecap="round"/>`;
  }
  s += `<circle cx="300" cy="280" r="44" fill="#fff" stroke="#e5ded1" stroke-width="3"/><circle cx="300" cy="280" r="34" fill="#4a2410"/><circle cx="292" cy="272" r="6" fill="#c2410c" opacity=".7"/>`;
  return s;
}
function matcha() {
  let s = plate();
  s += shadow(190, 200, 110, 70) + `<path d="M90 230 L290 150 A120 120 0 0 1 300 250 Z" fill="#6f9a3a"/><path d="M90 230 L290 150 L296 168 L104 238Z" fill="#e9dfc4"/>`;
  for (let i = 0; i < 40; i++) s += `<circle cx="${f(190 + rnd() * 100)}" cy="${f(170 + rnd() * 70)}" r="1.5" fill="#4e7524" opacity=".6"/>`;
  s += `<circle cx="140" cy="140" r="34" fill="#fffaf2"/><path d="M128 130 q12 -16 24 0 q-12 10 -24 0z" fill="#fff" opacity=".9"/>`;
  s += `<circle cx="190" cy="290" r="16" fill="#c81e3a"/><circle cx="214" cy="300" r="14" fill="#b4122c"/><circle cx="186" cy="286" r="4" fill="#fff" opacity=".5"/>`;
  s += `<path d="M150 98 q10 -20 26 -8" stroke="#3f6212" stroke-width="5" fill="none"/><ellipse cx="180" cy="94" rx="12" ry="6" fill="#65a30d"/>`;
  return s;
}
const DISHES = { ramen: ramen(), platter: platter(), poke: poke(), gyoza: gyoza(), matcha: matcha() };

const out = fileURLToPath(new URL("../public/", import.meta.url));
mkdirSync(out + "plates", { recursive: true });
mkdirSync(out + "dishes", { recursive: true });
for (const [k, v] of Object.entries(PLATES)) writeFileSync(`${out}plates/${k}.svg`, svg(v));
for (const [k, v] of Object.entries(DISHES)) writeFileSync(`${out}dishes/${k}.svg`, svg(v));
console.log("plates:", Object.keys(PLATES).length, "dishes:", Object.keys(DISHES).length);
