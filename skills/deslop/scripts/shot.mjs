#!/usr/bin/env node
// Screenshots a page at desktop and phone width with an installed Chrome, Edge or Chromium. No dependencies.
// Usage: node shot.mjs <file.html | http://localhost:3000> [--out <dir>] [--widths 1280,390]
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { basename, dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const opt = (name, fallback) => (args.includes(name) ? args[args.indexOf(name) + 1] : fallback);
const target = args.find((a, i) => !a.startsWith('--') && !['--out', '--widths'].includes(args[i - 1]));
if (!target) {
  console.error('usage: node shot.mjs <file.html | url> [--out <dir>] [--widths 1280,390]');
  process.exit(2);
}

const candidates = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/snap/bin/chromium',
].filter(Boolean);
const browser = candidates.find((p) => existsSync(p));
if (!browser) {
  console.error('No Chrome, Edge or Chromium found. Set CHROME_PATH to a browser binary.');
  process.exit(1);
}

const isUrl = /^https?:\/\//.test(target);
const url = isUrl ? target : pathToFileURL(resolve(target)).href;
const outDir = resolve(opt('--out', isUrl ? '.' : dirname(resolve(target))));
mkdirSync(outDir, { recursive: true });
const name = isUrl ? 'page' : basename(target).replace(/\.[^.]+$/, '');
const widths = opt('--widths', '1280,390').split(',').map(Number);
const profile = mkdtempSync(join(tmpdir(), 'deslop-shot-'));

let failed = false;
for (const w of widths) {
  const out = join(outDir, `${name}-${w}.png`);
  const height = w < 600 ? 2200 : 2400;
  const r = spawnSync(browser, [
    '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run',
    `--user-data-dir=${profile}`, `--window-size=${w},${height}`,
    '--virtual-time-budget=4000', `--screenshot=${out}`, url,
  ], { encoding: 'utf8', timeout: 60000 });
  if (existsSync(out)) console.log(out);
  else {
    failed = true;
    console.error(`failed at ${w}px: ${(r.stderr || r.error?.message || '').trim().split('\n').pop()}`);
  }
}
try { rmSync(profile, { recursive: true, force: true }); } catch {}
process.exit(failed ? 1 : 0);
