#!/usr/bin/env tsx
// List current Firestore spaces for a campus with optional post counts
// Loads Admin creds from apps/web/.env.local (like seed-firestore.mjs)
// Usage:
//   pnpm ops:list-spaces                          # all campuses, 50 limit
//   pnpm ops:list-spaces --campus ub-buffalo      # filter campus
//   pnpm ops:list-spaces --limit 200 --with-posts # include posts count

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

const campusFilter = args.get('campus');
const limit = Math.max(1, Math.min(5000, Number(args.get('limit') || '50')));
const withPosts = (args.get('with-posts') || '').toLowerCase() !== '';
const createdBeforeArg = args.get('createdBefore');
const createdAfterArg = args.get('createdAfter');
const createdBefore = createdBeforeArg ? new Date(createdBeforeArg) : null;
const createdAfter = createdAfterArg ? new Date(createdAfterArg) : null;

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

function pad(s: string, n: number) { return (s || '').toString().padEnd(n, ' '); }

const toDate = (value: any): Date => {
  if (!value) return new Date(0);
  if (value instanceof Date) return value;
  const ts = value as { toDate?: () => Date };
  if (typeof ts?.toDate === 'function') return ts.toDate();
  const d = new Date(value as string);
  return Number.isNaN(d.getTime()) ? new Date(0) : d;
};

async function main() {
  let query = firestore.collection('spaces') as FirebaseFirestore.Query<FirebaseFirestore.DocumentData>;
  if (campusFilter) query = query.where('campusId', '==', campusFilter);
  const snap = await query.limit(limit).get();

  if (snap.empty) {
    console.log('No spaces found', campusFilter ? `for campus ${campusFilter}` : '');
    return;
  }

  console.log(pad('spaceId', 28), pad('campus', 14), pad('name', 34), pad('type', 20), pad('visibility', 10), pad('members', 7), pad('createdAt', 20));
  console.log('-'.repeat(150));
  const docs = snap.docs
    .map((doc) => ({ doc, createdAt: toDate((doc.data() as any).createdAt) }))
    .filter((entry) => {
      if (createdBefore && !(entry.createdAt < createdBefore)) return false;
      if (createdAfter && !(entry.createdAt > createdAfter)) return false;
      return true;
    })
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  for (const { doc, createdAt } of docs) {
    const d = doc.data() as any;
    const line = [
      pad(doc.id, 28),
      pad(d.campusId || '', 14),
      pad(d.name || '', 34),
      pad(d.type || '', 20),
      pad(d.visibility || '', 10),
      pad(String(d.memberCount ?? (d.members?.length ?? '0')), 7),
      pad(createdAt.toISOString().slice(0, 19), 20),
    ].join(' ');
    process.stdout.write(line);
    if (withPosts) {
      const posts = await firestore.collection('spaces').doc(doc.id).collection('posts').count().get();
      process.stdout.write(`  posts=${posts.data().count}`);
    }
    process.stdout.write('\n');
  }
}

main().catch((e) => {
  console.error('✗ Failed to list spaces:', e?.message || e);
  process.exit(1);
});
