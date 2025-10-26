#!/usr/bin/env tsx
// Audit current space.type against taxonomy/heuristic classification
// Usage:
//   pnpm ops:audit-classification --campus ub-buffalo [--out docs/dev/samples/analysis/miscategorized.csv]

import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Load env
const envPath = resolve(process.cwd(), 'apps/web/.env.local');
if (existsSync(envPath)) {
  try {
    const raw = readFileSync(envPath, 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const t = line.trim();
      if (!t || t.startsWith('#')) continue;
      const i = t.indexOf('=');
      if (i <= 0) continue;
      const k = t.slice(0, i).trim();
      let v = t.slice(i + 1).trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) v = v.slice(1, -1);
      process.env[k] = v;
    }
  } catch {}
}

const args = new Map<string, string>();
for (let i = 2; i < process.argv.length; i += 2) {
  const k = process.argv[i];
  const v = process.argv[i + 1];
  if (k && k.startsWith('--')) args.set(k.slice(2), v ?? '');
}

const campusId = args.get('campus') || 'ub-buffalo';
const outPath = args.get('out') || 'docs/dev/samples/analysis/miscategorized.csv';

type Taxonomy = {
  greek_life: { fraternities_sororities: string[]; governing: string[] };
  residential: { councils: string[]; organizations: string[] };
  student_organizations: Record<string, string[]>;
  university_organizations: Record<string, string[]>;
};

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '').slice(0, 48);
}

function nameVariants(name: string): string[] {
  const base = name.trim();
  const variants = new Set<string>();
  const push = (s: string) => variants.add(slugify(s));
  push(base);
  let v = base
    .replace(/\bUB\b/gi, '')
    .replace(/\s*-?\s*UB\s*Chapter$/i, '')
    .replace(/\s*\(UB\s*Chapter\)$/i, '')
    .replace(/\s*-?\s*UB$/i, '')
    .replace(/\s*@\s*UB$/i, '')
    .replace(/\s*-?\s*Collegiate\s*Chapter$/i, '')
    .replace(/\s*-?\s*Student\s*Chapter$/i, '')
    .replace(/\s*-?\s*UB\s*Student\s*Chapter$/i, '')
    .replace(/\s*\(Men’s?\s*&\s*Women’s?\)/i, '')
    .replace(/\s*\(Academic Greek Honor Society\)/i, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
  push(v);
  push(v.replace(/\s*Club$/i, '').trim());
  push(v.replace(/\s*Chapter$/i, '').trim());
  return Array.from(variants).filter(Boolean);
}

type Entry = { key: string; slug: string; type: string };

function buildMap(tax: Taxonomy) {
  const map = new Map<string, string>();
  const entries: Entry[] = [];
  const put = (name: string, type: string) => {
    if (!name) return;
    const key = name.toLowerCase().trim();
    map.set(key, type);
    entries.push({ key, slug: slugify(name), type });
  };
  for (const n of tax.greek_life.fraternities_sororities) put(n, 'greek_life');
  for (const n of tax.greek_life.governing) put(n, 'greek_life');
  for (const n of tax.residential.councils) put(n, 'residential');
  for (const n of tax.residential.organizations) put(n, 'residential');
  for (const [, arr] of Object.entries(tax.student_organizations)) for (const n of arr) put(n, 'student_organization');
  for (const [, arr] of Object.entries(tax.university_organizations)) for (const n of arr) put(n, 'university_organization');
  return { map, entries };
}

function deriveCategoriesFromTags(tags: string[] = []): string[] {
  const cats: string[] = [];
  if (tags.some((t) => t.startsWith('group:greek'))) cats.push('greek life');
  if (tags.some((t) => t.startsWith('group:residential'))) cats.push('residential');
  // university detection will rely mainly on host name markers
  return cats;
}

function toCSV(rows: string[][]) {
  return rows.map((r) => r.map((c) => (c.includes(',') ? `"${c.replace(/"/g, '""')}"` : c)).join(',')).join('\n');
}

async function main() {
  const taxPath = resolve(process.cwd(), 'docs/dev/taxonomy/UB_TAXONOMY.json');
  const tax = existsSync(taxPath) ? (JSON.parse(readFileSync(taxPath, 'utf8')) as Taxonomy) : null;
  const taxMap = tax ? buildMap(tax) : { map: new Map<string, string>(), entries: [] as Entry[] };

  const apps = getApps();
  const app = apps.length ? apps[0]! : initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    }),
  });
  const firestore = getFirestore(app);

  const { classifySpaceTypeFromHost } = await import('../../apps/web/src/server/integrations/engage/host-classifier');

  let query = firestore.collection('spaces') as FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;
  if (campusId) query = query.where('campusId', '==', campusId);
  const snap = await query.get();
  if (snap.empty) {
    console.log('No spaces found');
    return;
  }

  const rows: string[][] = [[
    'spaceId','name','currentType','predictedType','source','tagsPreview'
  ]];

  let mismatches = 0;
  for (const doc of snap.docs) {
    const d = doc.data() as any;
    const name: string = (d.name || '').toString().trim();
    const current = (d.type || '').toString();
    const tags: string[] = Array.isArray(d.tags) ? d.tags : [];

    // Taxonomy exact/variant match first
    const key = name.toLowerCase();
    let predicted = taxMap.map.get(key) || '';
    if (!predicted) {
      const slugs = nameVariants(name);
      const candidate = taxMap.entries.find((e) => slugs.includes(e.slug)) ||
        taxMap.entries.find((e) => slugs.some((s) => s.includes(e.slug) && e.slug.length >= 6)) ||
        taxMap.entries.find((e) => slugs.some((s) => e.slug.includes(s) && s.length >= 6));
      if (candidate) predicted = candidate.type;
    }

    let source = predicted ? 'taxonomy' : 'heuristic';
    if (!predicted) {
      const cats = deriveCategoriesFromTags(tags);
      predicted = classifySpaceTypeFromHost(name, cats);
    }

    if (!predicted) predicted = 'student_organization';

    if (predicted !== current) {
      mismatches++;
      rows.push([
        doc.id,
        name,
        current,
        predicted,
        source,
        tags.slice(0, 5).join('|')
      ]);
    }
  }

  const outAbs = resolve(process.cwd(), outPath);
  mkdirSync(dirname(outAbs), { recursive: true });
  writeFileSync(outAbs, toCSV(rows), 'utf8');
  console.log({ campusId, spaces: snap.size, mismatches, report: outPath });
}

main().catch((e) => {
  console.error('✗ Audit failed:', e?.message || e);
  process.exit(1);
});

