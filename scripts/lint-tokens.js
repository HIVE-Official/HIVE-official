#!/usr/bin/env node
/*
  Simple token enforcement: flag raw hex colors in apps/* sources.
  Excludes token packages, node_modules, dist, .next, storybook-static.
*/
const { glob } = require('glob');
const fs = require('fs');

const patterns = [
  'apps/**/src/**/*.{tsx,css,mdx}' // exclude plain .ts to avoid server-only constants (emails, loggers)
];

const ignore = [
  '**/node_modules/**',
  '**/dist/**',
  '**/.next/**',
  '**/storybook-static/**',
  'packages/**',
  'apps/web/src/components/landing/3d/**',
  'apps/**/src/**/email*',
  'apps/**/src/styles/**',
];

const HEX_RE = /#[0-9a-fA-F]{3,8}\b/g;

(async () => {
  const files = await glob(patterns, { ignore });
  const violations = [];

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split(/\r?\n/);
    lines.forEach((line, idx) => {
      const matches = line.match(HEX_RE);
      if (matches) {
        violations.push({ file, line: idx + 1, snippet: line.trim() });
      }
    });
  }

  if (violations.length) {
    console.error(`\nToken Lint: Found ${violations.length} raw hex color occurrence(s). Use tokens instead.`);
    violations.slice(0, 50).forEach(v => {
      console.error(`- ${v.file}:${v.line}  ${v.snippet}`);
    });
    if (violations.length > 50) console.error(`... and ${violations.length - 50} more.`);
    process.exit(2);
  } else {
    console.log('Token Lint: No raw hex colors found.');
  }
})();
