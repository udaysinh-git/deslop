#!/usr/bin/env node
// Greps a file for AI-slop tells. No dependencies.
// Usage: node check.mjs <file> [--prose | --ui] [--json]
// Exit code 1 when any FAIL is found.
import { readFileSync } from 'node:fs';
import { extname } from 'node:path';

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
if (!file) {
  console.error('usage: node check.mjs <file> [--prose | --ui] [--json]');
  process.exit(2);
}
const src = readFileSync(file, 'utf8');
const uiExt = ['.html', '.htm', '.jsx', '.tsx', '.vue', '.svelte', '.css', '.astro'];
const mode = args.includes('--prose') ? 'prose' : args.includes('--ui') ? 'ui' : uiExt.includes(extname(file).toLowerCase()) ? 'ui' : 'prose';

const findings = [];
const add = (level, id, msg, hits = []) => {
  const list = [...hits].map((h) => String(h).replace(/\s+/g, ' ').trim().slice(0, 70));
  findings.push({ level, id, msg, count: list.length || 1, examples: [...new Set(list)].slice(0, 3) });
};
const all = (text, re) => [...text.matchAll(re)].map((m) => m[0]);

const STOCK = ['seamless', 'seamlessly', 'robust', 'leverage', 'leveraging', 'comprehensive', 'elevate', 'delve', 'crucial', 'vibrant', 'stunning', 'showcase', 'showcasing', 'tapestry', 'nestled', 'supercharge', 'unlock', 'empower', 'empowers', 'cutting-edge', 'game-changer', 'game-changing', 'revolutionize', 'effortless', 'effortlessly', 'world-class', 'next-level', 'pivotal', 'testament', 'underscore', 'underscores', 'meticulous', 'meticulously', 'intricate', 'bolster', 'garner', 'all-in-one'];
const PHRASES = ["let's dive", 'dive in', "here's the thing", 'great question', 'i hope this helps', 'hope this helps', 'at its core', 'the real question', 'let that sink in', "that's the real", 'read that again', "it's worth noting", "it's important to note", 'in conclusion', "in today's", 'without further ado', "here's what you need to know", 'stands as a', 'serves as a', 'plays a key role', 'plays a crucial role', 'the future looks bright', 'a testament to', 'rich tapestry', 'ever-evolving', 'fast-paced world', 'look no further', 'take it to the next level', 'ready to get started'];

function copyChecks(text, ui) {
  const dashes = all(text, /[^\s]{0,12}\s?[—–]\s?[^\s]{0,12}|\S+ -- \S+/g);
  if (dashes.length) add('FAIL', 'dash', 'em or en dash used as a connector: use a comma, colon, period or parentheses', dashes);

  const stock = all(text, new RegExp(`\\b(${STOCK.join('|')})\\b`, 'gi'));
  if (stock.length) add('FAIL', 'stock-word', 'sales or stock AI word: say what the thing does', stock);

  const phrases = all(text, new RegExp(PHRASES.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'), 'gi'));
  if (phrases.length) add('FAIL', 'stock-phrase', 'run-up, closer or inflated phrase: cut it or state the fact', phrases);

  const contrast = [
    ...all(text, /\bnot (just|only|merely|simply)\b[^.?!\n]{0,90}\b(but|it'?s|it is)\b[^.?!\n]{0,40}/gi),
    ...all(text, /\b(it'?s|this is|that'?s|is|are)(n't| not) (just |only |merely |about )?[^.?!,;\n]{2,60}[,;.]\s*(it'?s|it is|they'?re|this is)\b[^.?!\n]{0,40}/gi),
  ];
  if (contrast.length) add('FAIL', 'fake-contrast', '"not X, but Y" contrast: state Y directly', contrast);

  const bang = all(text, /[^.!?\n]{0,40}!+(?=\s|$|<)/g);
  if (bang.length) add(ui ? 'FAIL' : 'WARN', 'exclamation', 'exclamation mark: make it a plain statement', bang);

  const triads = all(text, /\b[\w-]+, [\w-]+(?: [\w-]+)?,? and [\w-]+\b/g);
  if (triads.length >= 3) add('WARN', 'triads', 'several lists of three: keep only the items that carry a distinct idea', triads);
}

function uiChecks() {
  const noComments = src.replace(/<!--[\s\S]*?-->/g, '');
  const css = noComments;
  const visible = noComments
    .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;|&#\d+;/gi, ' ')
    .replace(/\s+/g, ' ');

  if (/<html[\s>]/i.test(src)) {
    const hasDirection = [...src.matchAll(/<!--([\s\S]*?)-->/g)].some((m) => /Product\s*(\(assumed\))?\s*:/i.test(m[1]) && /Moment\s*:/i.test(m[1]));
    if (!hasDirection) add('FAIL', 'direction', 'no direction comment (Product, Character, World, Moment, Signature, Concept) at the top of the file');
  }

  let m;
  m = all(css, /(-webkit-)?background-clip\s*:\s*text|\bbg-clip-text\b/g);
  if (m.length) add('FAIL', 'gradient-text', 'gradient text: use a solid text color', m);

  m = [...css.matchAll(/box-shadow\s*:([^;{}]+)/g)].filter((x) => /(^|[\s,])0(px)?\s+0(px)?\s+(1[2-9]|[2-9]\d|\d{3,})px/.test(x[1]) && !/rgba?\(\s*0[\s,]+0[\s,]+0|#000\b|\bblack\b/.test(x[1])).map((x) => x[0]);
  if (m.length) add('FAIL', 'glow', 'colored glow (zero-offset blurred shadow): use a surface step or hairline', m);

  m = [...css.matchAll(/(?<!backdrop-)filter\s*:\s*blur\((\d+)px\)/g)].filter((x) => +x[1] >= 40).map((x) => x[0]);
  if (m.length) add('FAIL', 'blur-blob', 'large blurred blob behind content: remove it', m);

  m = all(css, /backdrop-filter\s*:\s*blur|\bbackdrop-blur\b/g);
  if (m.length) add('WARN', 'glass', 'frosted glass: keep only if something meaningful sits behind it', m);

  m = all(css, /transition\s*:\s*all\b|\btransition-all\b/g);
  if (m.length) add('FAIL', 'transition-all', 'transition: all. List the properties (transform, opacity, color)', m);

  m = [...all(css, /:hover[^{}]*\{[^}]*scale\(\s*1\.\d+/g), ...all(css, /\bhover:scale-1\d\d\b/g)];
  if (m.length) add('FAIL', 'hover-scale', 'scale-up on hover: change color or surface instead', m);

  m = all(css, /animation[^;{}]*\binfinite\b|\banimate-(pulse|ping|bounce)\b/g);
  if (m.length) add('WARN', 'loop', 'looping animation: keep only on something that is live', m);

  m = all(css, /font-weight\s*:\s*(800|900)\b|\bfont-(extrabold|black)\b/g);
  if (m.length) add('FAIL', 'heavy-weight', 'weight 800 to 900: use 400 to 600 and size or color for hierarchy', m);

  m = [...css.matchAll(/\{([^{}]*)\}/g)].filter((x) => /text-transform\s*:\s*uppercase/.test(x[1]) && /letter-spacing\s*:\s*(?!0(px|em)?\s*[;}]|-)/.test(x[1])).map((x) => 'uppercase + letter-spacing');
  m.push(...all(css, /class(Name)?="[^"]*\buppercase\b[^"]*\btracking-wid[^"]*"|class(Name)?="[^"]*\btracking-wid[^"]*\buppercase\b[^"]*"/g));
  if (m.length) add('FAIL', 'tracked-caps', 'uppercase label with wide tracking: use sentence case', m);

  m = all(css, /border[\w-]*\s*:[^;{}]*\b(dashed|dotted)\b|\bborder-(dashed|dotted)\b|stroke-dasharray/g);
  if (m.length) add('FAIL', 'dashed', 'dotted or dashed line: use a faint solid hairline or nothing', m);

  m = [...css.matchAll(/(^|[\s,}])(html|body|:root)\b[^{}]*\{([^{}]*)\}/g)].filter((x) => /background(-color)?\s*:\s*(#fff(fff)?\b|white\b|rgb\(\s*255[\s,]+255[\s,]+255)/i.test(x[3])).map((x) => 'page background: white');
  if (m.length) add('FAIL', 'pure-white', 'pure white page fill: tint it and keep it under about 96% lightness', m);

  m = all(css, /border-radius\s*:\s*(999\d*px|50rem|100vmax)|\brounded-full\b/g);
  if (m.length >= 4) add('WARN', 'pills', 'many full pills: set radius by element size', m);

  const hexes = [...new Set(all(css, /#[0-9a-f]{6}\b/gi).map((h) => h.toLowerCase()))];
  const purple = hexes.filter((h) => {
    const [r, g, b] = [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
    const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
    if (d < 0.25) return false;
    let hue = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    hue = (hue * 60 + 360) % 360;
    return hue >= 245 && hue <= 300;
  });
  if (purple.length >= 2) add('WARN', 'purple', 'violet or purple family: keep only if it is the real brand color', purple);

  m = all(visible, /\p{Extended_Pictographic}/gu).filter((c) => !'©®™'.includes(c));
  if (m.length) add('FAIL', 'emoji', 'emoji in the interface: use one line icon set or nothing', m);

  m = all(visible, /\b(trusted|loved|used) by\b[^.]{0,40}|\b[\d,.]+[k+]+\+? (users|teams|customers|developers|freelancers|companies)\b/gi);
  if (m.length) add('WARN', 'proof', 'proof claim: keep it only with a real, checkable source', m);

  m = all(visible, /\b(Acme|John Doe|Jane Doe|Lorem ipsum)\b/gi);
  if (m.length) add('FAIL', 'mock-name', 'placeholder name: use a specific, plausible one', m);
  m = all(visible, /\b(Maya|Sarah|Alex) [A-Z][a-z]+\b/g);
  if (m.length) add('WARN', 'mock-name-soft', 'the usual generated first names: pick a less default one', m);

  m = all(visible, /welcome back\b[^.]{0,30}/gi);
  if (m.length) add('WARN', 'greeting', 'greeting headline: use the page or period as the title', m);

  const moves = /transform|translate|scale\(/.test(css) && /transition|animation|@keyframes/.test(css);
  if (moves && !/prefers-reduced-motion/.test(css)) add('WARN', 'reduced-motion', 'motion without a prefers-reduced-motion rule');
  if (/<(button|a|input)\b/i.test(src) && !/:focus/.test(css) && /<style/i.test(src)) add('WARN', 'focus', 'no :focus or :focus-visible style');

  copyChecks(visible, true);
}

function proseChecks() {
  const text = src
    .replace(/^---\n[\s\S]*?\n---\n/, '')
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`\n]*`/g, ' ')
    .replace(/\]\([^)]*\)/g, ']')
    .replace(/https?:\/\/\S+/g, ' ');
  const lines = text.split('\n');

  let m = lines.filter((l) => /^\s*([-*+]|\d+\.)\s+\*\*[^*]+\*\*\s*[:.]|^\s*([-*+]|\d+\.)\s+\*\*[^*]+[:.]\*\*/.test(l));
  if (m.length >= 2) add('FAIL', 'bold-labels', 'bold label at the start of bullets: write prose, or drop the bold', m);

  m = lines.filter((l) => /^#{1,6}\s/.test(l) && /\p{Extended_Pictographic}/u.test(l));
  if (m.length) add('FAIL', 'emoji-heading', 'emoji in a heading', m);

  m = lines.filter((l) => {
    if (!/^#{1,6}\s/.test(l)) return false;
    const words = l.replace(/^#+\s+/, '').split(/\s+/).filter((w) => w.length > 3 && /^[A-Za-z]/.test(w));
    return words.length >= 3 && words.every((w) => /^[A-Z]/.test(w));
  });
  if (m.length) add('WARN', 'title-case', 'Title Case heading: use sentence case', m);

  const paras = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  m = paras.filter((p) => !/^[#>|*-]/.test(p) && p.split(/\s+/).length <= 9 && /^(That|This|And that|Simple|It)('s| is| was)?\b/i.test(p) && /[.!]$/.test(p));
  if (m.length) add('WARN', 'closer', 'one-line paragraph that may only restate the point: cut it unless it adds a fact', m);

  m = all(text, /(?:^|\n)\s*(?:[A-Z][^.!?\n]{0,18}[.!]\s+){2,}[A-Z][^.!?\n]{0,18}[.!]/g).filter((x) => /\bNo\b/.test(x));
  if (m.length) add('WARN', 'fragments', 'row of short fragments: merge into one sentence with a claim', m);

  copyChecks(text, false);
}

mode === 'ui' ? uiChecks() : proseChecks();

const fails = findings.filter((f) => f.level === 'FAIL');
if (args.includes('--json')) {
  console.log(JSON.stringify({ file, mode, fail: fails.length, warn: findings.length - fails.length, findings }, null, 2));
} else {
  for (const f of findings) {
    const ex = f.examples.length ? `  e.g. ${f.examples.map((e) => JSON.stringify(e)).join(', ')}` : '';
    console.log(`${f.level}  ${f.id}${f.count > 1 ? ` x${f.count}` : ''}: ${f.msg}${ex}`);
  }
  console.log(`${file} (${mode}): ${fails.length} FAIL, ${findings.length - fails.length} WARN`);
  if (!fails.length) console.log('This only checks what a grep can see. Still read the text or look at the render.');
}
process.exit(fails.length ? 1 : 0);
