// Simple check for 'use client' on hook-using TSX modules in packages/ui/src
// Exits with non-zero code if violations are found.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = process.cwd();
const TARGET_DIR = join(ROOT, 'packages', 'ui', 'src');
const HOOK_REGEX = /\buse(State|Effect|Ref|Context|Reducer|LayoutEffect)\b/;

/** @param {string} dir */
function* walk(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(p);
    else if (entry.isFile() && p.endsWith('.tsx')) yield p;
  }
}

const violations = [];
for (const file of walk(TARGET_DIR)) {
  if (file.includes('/stories/')) continue; // ignore stories
  if (!(file.includes('/molecules/') || file.includes('/components/ui/') || file.includes('/providers/'))) continue; // scope
  const src = readFileSync(file, 'utf8');
  if (!HOOK_REGEX.test(src)) continue;
  const lines = src.split(/\n/);
  // Find first non-empty, non-comment line
  let firstMeaningful = '';
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('//')) continue;
    if (trimmed.startsWith('/*')) continue;
    firstMeaningful = trimmed;
    break;
  }
  if (!(firstMeaningful === '"use client";' || firstMeaningful === '"use client"' || firstMeaningful === "'use client'" || firstMeaningful === "'use client';")) {
    violations.push(file.replace(ROOT + '/', ''));
  }
}

if (violations.length) {
  console.error('\x1b[31mMissing "use client" in hook-using modules:\x1b[0m');
  for (const v of violations) console.error(' -', v);
  process.exit(1);
} else {
  console.log('\x1b[32mClient directive check passed for packages/ui/src.\x1b[0m');
}
