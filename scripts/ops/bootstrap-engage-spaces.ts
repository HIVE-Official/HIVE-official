#!/usr/bin/env tsx
// Create/Update Spaces from Engage sample (hosts only), no posts.
// Aggregates categories per host, classifies into 4 types, applies join policy.
// DRY-RUN by default; use --apply to write.
// Usage:
//   pnpm ops:bootstrap-engage-spaces --campus ub-buffalo --source docs/dev/samples/engage_ub_events.json
//   pnpm ops:bootstrap-engage-spaces --campus ub-buffalo --fetch --apply

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

const campusId = args.get('campus') || 'ub-buffalo';
const source = args.get('source') || 'docs/dev/samples/engage_ub_events.json';
const fetchMode = args.has('fetch');
const apply = args.has('apply');

const DEFAULT_URL = process.env.ENGAGE_RSS_URL || 'https://buffalo.campuslabs.com/engage/events.rss';

type Item = { hosts: string[]; categories: string[]; };
type Payload = { items: Item[] };

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '').slice(0, 48);
}

async function loadItems(): Promise<Item[]> {
  if (!fetchMode) {
    const raw = readFileSync(source, 'utf8');
    return (JSON.parse(raw) as Payload).items;
  }
  const resp = await fetch(DEFAULT_URL);
  if (!resp.ok) throw new Error(`Fetch failed: ${resp.status}`);
  const xml = await resp.text();
  const { parseEngageRssXml } = await import('../../apps/web/src/server/integrations/engage/rss');
  return parseEngageRssXml(xml) as any as Item[];
}

async function main() {
  const items = await loadItems();
  const { classifySpaceTypeFromHost, defaultJoinPolicyForType } = await import('../../apps/web/src/server/integrations/engage/host-classifier');
  const { getHostOverride } = await import('../../apps/web/src/server/integrations/engage/host-overrides');
  const { mapEngageCategories } = await import('../../apps/web/src/server/integrations/engage/category-mapping');

  const byHost = new Map<string, { categories: Set<string> }>();
  for (const it of items) {
    const hosts = (it.hosts || []).filter(Boolean);
    const cats = (it.categories || []);
    for (const h of hosts) {
      const e = byHost.get(h) || { categories: new Set<string>() };
      for (const c of cats) e.categories.add(c);
      byHost.set(h, e);
    }
  }

  const apps = getApps();
  const app = apps.length ? apps[0]! : initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    }),
  });
  const firestore = getFirestore(app);

  const leaderId = process.env.DEFAULT_SPACE_LEADER_ID || 'system';
  const toCreate: { id: string; name: string; type: string; joinPolicy: string; tags: string[] }[] = [];

  for (const [host, agg] of byHost.entries()) {
    const override = getHostOverride(host);
    if (override?.skip) continue;
    const name = (override?.normalizeTo || host).trim();
    const type = (override?.type || classifySpaceTypeFromHost(name, Array.from(agg.categories))) as string;
    const joinPolicy = defaultJoinPolicyForType(type as any);
    const tags = Array.from(new Set([ 'engage', 'auto-import', ...mapEngageCategories(Array.from(agg.categories)).canonical, ...(override?.tags || []) ]));
    const id = override?.spaceId || `org-${slugify(name) || slugify(host)}`;
    toCreate.push({ id, name, type, joinPolicy, tags });
  }

  console.log(`Planned spaces for campus ${campusId}: ${toCreate.length}`);
  console.log('Sample:', toCreate.slice(0, 10));
  if (!apply) {
    console.log('Dry-run. Pass --apply to write to Firestore.');
    return;
  }

  for (const s of toCreate) {
    const ref = firestore.collection('spaces').doc(s.id);
    const now = new Date();
    // Upsert space document
    await ref.set({
      campusId,
      name: s.name,
      description: `Auto-created from UBLinked host: ${s.name}.`,
      type: s.type,
      visibility: 'campus',
      tags: s.tags,
      isActive: true,
      createdAt: now,
      updatedAt: now,
      leaderId,
      settings: {
        isInviteOnly: s.joinPolicy === 'invite_only',
        postingPolicy: 'members',
        joinPolicy: s.joinPolicy,
        mediaApprovalPolicy: 'leaders_only',
      },
      memberRoles: { [leaderId]: 'leader' },
      memberCount: 1,
    }, { merge: true });

    // Ensure leader membership exists in subcollection
    await ref.collection('members').doc(leaderId).set({ profileId: leaderId, role: 'leader', joinedAt: now }, { merge: true });
  }

  console.log(`✓ Wrote ${toCreate.length} spaces.`);
}

main().catch((e) => {
  console.error('✗ Bootstrap failed:', e?.message || e);
  process.exit(1);
});

