#!/usr/bin/env tsx
// Analyze normalized Engage sample JSON for host and category frequencies
// Usage: pnpm ops:analyze-engage [path-to-json]

import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

const input = process.argv[2] || 'docs/dev/samples/engage_ub_events.json';

type Item = {
  hosts: string[];
  categories: string[];
  title: string;
};

type Payload = { items: Item[] };

function toCSV(rows: string[][]) {
  return rows.map((r) => r.map((c) => (c.includes(',') ? `"${c.replace(/"/g, '""')}"` : c)).join(',')).join('\n');
}

function main() {
  const raw = readFileSync(input, 'utf8');
  const data = JSON.parse(raw) as Payload;
  const hostCounts = new Map<string, number>();
  const catCounts = new Map<string, number>();

  for (const it of data.items) {
    for (const h of it.hosts || []) hostCounts.set(h, (hostCounts.get(h) || 0) + 1);
    for (const c of it.categories || []) catCounts.set(c, (catCounts.get(c) || 0) + 1);
  }

  const outDir = resolve(process.cwd(), dirname(input), 'analysis');
  mkdirSync(outDir, { recursive: true });

  const hostsSorted = Array.from(hostCounts.entries()).sort((a, b) => b[1] - a[1]);
  const catsSorted = Array.from(catCounts.entries()).sort((a, b) => b[1] - a[1]);

  writeFileSync(resolve(outDir, 'hosts.csv'), toCSV([['host', 'count'], ...hostsSorted.map(([k, v]) => [k, String(v)])]));
  writeFileSync(resolve(outDir, 'categories.csv'), toCSV([['category', 'count'], ...catsSorted.map(([k, v]) => [k, String(v)])]));

  console.log('✓ Wrote', resolve(outDir, 'hosts.csv'));
  console.log('✓ Wrote', resolve(outDir, 'categories.csv'));
}

main();

