#!/usr/bin/env tsx
// Delete spaces by campus + id patterns (wildcards) or explicit ids.
// DRY-RUN by default. Use --apply to actually delete.
// Usage examples:
//   pnpm ops:cleanup-spaces --campus ub-buffalo --pattern space-*             # dry-run
//   pnpm ops:cleanup-spaces --campus ub-buffalo --pattern space-* --apply     # delete
//   pnpm ops:cleanup-spaces --ids space-robotics,space-panic-relief --apply

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// Load env from app-scoped .env.local
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

const campus = args.get('campus') || '';
const patternsArg = args.get('pattern') || '';
const idsArg = args.get('ids') || '';
const apply = args.has('apply');
const createdBeforeArg = args.get('createdBefore');
const createdAfterArg = args.get('createdAfter');
const createdBefore = createdBeforeArg ? new Date(createdBeforeArg) : null;
const createdAfter = createdAfterArg ? new Date(createdAfterArg) : null;

const patterns = patternsArg
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean)
  .map((p) => new RegExp('^' + p.replace(/[.+^${}()|\[\]\\]/g, '\\$&').replace(/\*/g, '.*') + '$'));

const explicitIds = idsArg
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const app = (() => {
  const apps = getApps();
  if (apps.length > 0) return apps[0]!;
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase Admin env (FIREBASE_PROJECT_ID/CLIENT_EMAIL/PRIVATE_KEY)');
  }
  return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
})();

const firestore = getFirestore(app);

function matches(id: string): boolean {
  if (explicitIds.length && explicitIds.includes(id)) return true;
  if (patterns.length === 0) return false;
  return patterns.some((re) => re.test(id));
}

async function deleteSubcollection(spaceId: string, sub: string) {
  const col = firestore.collection('spaces').doc(spaceId).collection(sub);
  const snap = await col.get();
  const batchSize = 200;
  let idx = 0;
  while (idx < snap.size) {
    const batch = firestore.batch();
    for (let i = 0; i < batchSize && idx < snap.size; i++, idx++) {
      const doc = snap.docs[idx]!;
      batch.delete(doc.ref);
    }
    await batch.commit();
  }
}

async function main() {
  let query = firestore.collection('spaces') as FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;
  if (campus) query = query.where('campusId', '==', campus);
  const snap = await query.get();
  const toDate = (value: any): Date => {
    if (!value) return new Date(0);
    if (value instanceof Date) return value;
    const ts = value as { toDate?: () => Date };
    if (typeof ts?.toDate === 'function') return ts.toDate();
    const d = new Date(value as string);
    return Number.isNaN(d.getTime()) ? new Date(0) : d;
  };
  const candidates = snap.docs.filter((d) => {
    if (!matches(d.id)) return false;
    const createdAt = toDate((d.data() as any).createdAt);
    if (createdBefore && !(createdAt < createdBefore)) return false;
    if (createdAfter && !(createdAt > createdAfter)) return false;
    return true;
  });
  if (!candidates.length) {
    console.log('No matching spaces found');
    return;
  }

  console.log('Candidates:', candidates.map((d) => d.id).join(', '));
  if (!apply) {
    console.log('Dry-run: pass --apply to delete.');
    return;
  }

  for (const doc of candidates) {
    const id = doc.id;
    console.log(`Deleting space ${id} ...`);
    await deleteSubcollection(id, 'posts').catch(() => {});
    await deleteSubcollection(id, 'members').catch(() => {});
    await firestore.collection('spaces').doc(id).delete();
    console.log(`✓ Deleted ${id}`);
  }
}

main().catch((e) => {
  console.error('✗ Cleanup failed:', e?.message || e);
  process.exit(1);
});
