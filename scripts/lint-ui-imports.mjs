#!/usr/bin/env node
/*
 shadcn import guard (soft)
 - Reports direct imports of primitives from components/ui when atoms exist
 - Allowed direct imports: sidebar, breadcrumb (primitives without atom wrappers), and within atoms/* files
 - Exits with code 0 (warn-only) to avoid blocking until we refactor
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const SRC = join(root, 'packages/ui/src');

const banned = new Set([
  'button','input','badge','separator','avatar','progress','tooltip','textarea','checkbox','radio','switch','label','card','skeleton','slider','toggle'
]);

const allowExact = new Set(['sidebar']);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
    const p = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

const files = walk(SRC).filter((p) => p.endsWith('.tsx'));

const importRe = /from\s+['"]@\/components\/ui\/(.+?)['"]/g;

let warnings = 0;
for (const file of files) {
  const rel = relative(SRC, file);
  if (rel.startsWith('atoms/')) continue; // atoms are allowed to re-export
  const text = readFileSync(file, 'utf8');
  let m;
  while ((m = importRe.exec(text)) !== null) {
    const mod = m[1].split('/')[0];
    if (allowExact.has(mod)) continue;
    if (banned.has(mod)) {
      warnings++;
      console.warn(`[ImportGuard] ${rel}: import from '@/components/ui/${mod}' — prefer '@/atoms/${mod}' or '@/index'`);
    }
  }
}

if (!warnings) {
  console.log('ImportGuard: No issues found.');
} else {
  console.log(`ImportGuard: ${warnings} warning(s).`);
}

