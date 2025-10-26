#!/usr/bin/env tsx
// Apply curated taxonomy to Firestore spaces: sets type into 4 branches and adds branch/council tags.
// Usage:
//   pnpm ops:apply-taxonomy --campus ub-buffalo --source docs/dev/taxonomy/UB_TAXONOMY.json [--apply]

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Load env
const envPath = resolve(process.cwd(), 'apps/web/.env.local');
if (existsSync(envPath)) {
  try {
    const raw = readFileSync(envPath, 'utf8');
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx <= 0) continue;
      const key = trimmed.slice(0, idx).trim();
      let value = trimmed.slice(idx + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
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
const source = args.get('source') || 'docs/dev/taxonomy/UB_TAXONOMY.json';
const apply = args.has('apply');

type Taxonomy = {
  greek_life: { fraternities_sororities: string[]; governing: string[] };
  residential: { councils: string[]; organizations: string[] };
  student_organizations: Record<string, string[]>; // councils
  university_organizations: Record<string, string[]>; // groupings
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
  // Also try without trailing 'Club'
  push(v.replace(/\s*Club$/i, '').trim());
  // Try without 'Chapter'
  push(v.replace(/\s*Chapter$/i, '').trim());
  return Array.from(variants).filter(Boolean);
}

type Entry = { key: string; slug: string; type: string; branch: string; council?: string };

function buildMap(tax: Taxonomy) {
  const map = new Map<string, { type: string; branch: string; council?: string }>();
  const entries: Entry[] = [];
  const put = (name: string, type: string, branch: string, council?: string) => {
    if (!name) return;
    const key = name.toLowerCase().trim();
    map.set(key, { type, branch, council });
    entries.push({ key, slug: slugify(name), type, branch, council });
  };
  for (const n of tax.greek_life.fraternities_sororities) put(n, 'greek_life', 'greek_life');
  for (const n of tax.greek_life.governing) put(n, 'greek_life', 'greek_life', 'Governing');
  for (const n of tax.residential.councils) put(n, 'residential', 'residential', 'Residence Councils');
  for (const n of tax.residential.organizations) put(n, 'residential', 'residential', 'Residence Life');
  for (const [council, arr] of Object.entries(tax.student_organizations)) {
    for (const n of arr) put(n, 'student_organization', 'student_organizations', council);
  }
  for (const [group, arr] of Object.entries(tax.university_organizations)) {
    for (const n of arr) put(n, 'university_organization', 'university_organizations', group);
  }
  return { map, entries };
}

async function main() {
  const raw = readFileSync(source, 'utf8');
  const tax = JSON.parse(raw) as Taxonomy;
  const built = buildMap(tax);
  const map = built.map;
  const entries = built.entries;

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

  // Load spaces for campus
  let snap = await firestore.collection('spaces').where('campusId', '==', campusId).get();
  if (snap.empty) {
    console.log('No spaces for campus', campusId);
    return;
  }

  let matched = 0, updated = 0, missing = 0;
  for (const doc of snap.docs) {
    const d = doc.data() as any;
    const name = (d.name || '').toString().trim();
    const key = name.toLowerCase();
    let lookup = map.get(key);
    if (!lookup) {
      // Slug-based fuzzy match with variants
      const slugs = nameVariants(name);
      const candidate = entries.find((e) => slugs.includes(e.slug)) ||
        entries.find((e) => slugs.some((s) => s.includes(e.slug) && e.slug.length >= 6)) ||
        entries.find((e) => slugs.some((s) => e.slug.includes(s) && s.length >= 6));
      if (candidate) {
        lookup = { type: candidate.type, branch: candidate.branch, council: candidate.council };
      }
    }
    if (!lookup) {
      // Fallback to refined heuristic classification
      const tags: string[] = Array.isArray(d.tags) ? d.tags : [];
      const cats: string[] = [];
      if (tags.some((t) => t.startsWith('group:greek'))) cats.push('greek life');
      if (tags.some((t) => t.startsWith('group:residential'))) cats.push('residential');
      const suggested = classifySpaceTypeFromHost(name, cats);
      const branch = suggested === 'university_organization'
        ? 'university_organizations'
        : suggested === 'greek_life'
          ? 'greek_life'
          : suggested === 'residential'
            ? 'residential'
            : 'student_organizations';
      lookup = { type: suggested, branch };
    }

    matched++;
    const tags: string[] = Array.isArray(d.tags) ? [...d.tags] : [];
    const ensure = (t: string) => { if (!tags.includes(t)) tags.push(t); };
    ensure(`branch:${lookup.branch}`);
    if (lookup.council) ensure(`council:${slugify(lookup.council)}`);

    const patch: any = { type: lookup.type, tags, updatedAt: new Date() };
    if (apply) {
      await doc.ref.set(patch, { merge: true });
      updated++;
    }
  }

  console.log({ campusId, spaces: snap.size, matched, updated, missing, apply });

  // Report missing names for curation
  if (missing > 0) {
    const miss = snap.docs
      .map((doc) => (doc.data() as any).name as string)
      .filter((n) => !map.has((n || '').toLowerCase()))
      .slice(0, 50);
    console.log('Sample missing (first 50):', miss);
  }
}

main().catch((e) => {
  console.error('✗ Apply taxonomy failed:', e?.message || e);
  process.exit(1);
});
