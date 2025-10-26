#!/usr/bin/env node
/*
 Token compliance linter
 - Flags arbitrary hex colors used in TSX className (Tailwind arbitrary) or inline style props
 - Intended for UI package source files
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const SRC = join(root, 'packages/ui/src');

/** Recursively list files under dir */
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

const reClassHex = /class(Name)?\s*=\s*(\{|")([^\n]*\[#([0-9a-fA-F]{3,8})\][^\n]*)/g;
const reStyleHex = /style\s*=\s*\{[^}]*#[0-9a-fA-F]{3,8}[^}]*\}/g;

let errors = 0;
for (const file of files) {
  const text = readFileSync(file, 'utf8');
  const issues = [];
  if (reClassHex.test(text)) {
    issues.push('Found Tailwind arbitrary hex color in className');
  }
  if (reStyleHex.test(text)) {
    issues.push('Found inline style with hex color');
  }
  if (issues.length) {
    errors++;
    console.error(`\n[TokenLint] ${file}`);
    for (const msg of issues) console.error(` - ${msg}`);
  }
}

if (errors) {
  console.error(`\nTokenLint failed with ${errors} file(s). Use token classes (e.g., bg-card, text-foreground) instead of raw hex.`);
  process.exit(1);
} else {
  console.log('TokenLint: No issues found.');
}

