#!/usr/bin/env tsx
// Seed Engage events into Firestore posts under each host's Space.
// One-time import, idempotent via deterministic postId per (spaceId,eventId).
// Usage:
//   pnpm ops:seed-engage-events --campus ub-buffalo --source docs/dev/samples/engage_ub_events.json --apply
//   pnpm ops:seed-engage-events --campus ub-buffalo --fetch --limit 500 --apply

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { randomUUID, createHash } from 'node:crypto';
import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, FieldValue } from 'firebase-admin/firestore';

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
const limit = Math.max(1, Math.min(100000, Number(args.get('limit') || '100000')));
const apply = args.has('apply');

const DEFAULT_URL = process.env.ENGAGE_RSS_URL || 'https://buffalo.campuslabs.com/engage/events.rss';

type Item = {
  id: string;
  title: string;
  link: string;
  htmlDescription: string | null;
  textDescription: string | null;
  categories: string[];
  startAt: string | Date | null;
  endAt: string | Date | null;
  location: string | null;
  status: string | null;
  hosts: string[];
  imageUrl: string | null;
};

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '').slice(0, 48);
}

function toISO(d: Date | string | null): string | null {
  if (!d) return null;
  const date = d instanceof Date ? d : new Date(d);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

async function loadItems(): Promise<Item[]> {
  if (!fetchMode) {
    const raw = readFileSync(source, 'utf8');
    const data = JSON.parse(raw) as { items: Item[] };
    return data.items.slice(0, limit);
  }
  const resp = await fetch(DEFAULT_URL);
  if (!resp.ok) throw new Error(`Fetch failed: ${resp.status}`);
  const xml = await resp.text();
  const { parseEngageRssXml } = await import('../../apps/web/src/server/integrations/engage/rss');
  return (parseEngageRssXml(xml) as any as Item[]).slice(0, limit);
}

function postIdFor(spaceId: string, sourceId: string): string {
  const hash = createHash('sha256').update(`${spaceId}:${sourceId}`).digest('hex');
  return `engage-${hash.slice(0, 24)}`;
}

async function main() {
  const items = await loadItems();
  const { getHostOverride } = await import('../../apps/web/src/server/integrations/engage/host-overrides');
  const { mapEngageCategories } = await import('../../apps/web/src/server/integrations/engage/category-mapping');

  const apps = getApps();
  const app = apps.length ? apps[0]! : initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n')
    })
  });
  const db = getFirestore(app);

  let attempted = 0, created = 0, skipped = 0;

  for (const ev of items) {
    const hosts = (ev.hosts || []).filter(Boolean);
    if (hosts.length === 0) continue;
    const spaceIds: string[] = [];
    for (const host of hosts) {
      const override = getHostOverride(host);
      if (override?.skip) continue;
      const display = (override?.normalizeTo || host).trim();
      const id = override?.spaceId || `org-${slugify(display) || slugify(host)}`;
      spaceIds.push(id);
    }
    const uniqueSpaceIds = Array.from(new Set(spaceIds));

    for (const spaceId of uniqueSpaceIds) {
      const postId = postIdFor(spaceId, ev.id);
      attempted++;
      const postRef = db.collection('spaces').doc(spaceId).collection('posts').doc(postId);
      const existed = (await postRef.get()).exists;
      if (existed) { skipped++; continue; }

      const tagsSet = new Set<string>(['engage', 'rss', 'ub']);
      const cats = mapEngageCategories(ev.categories);
      for (const t of cats.canonical) tagsSet.add(t);
      if ((ev.status || '').toLowerCase() === 'tentative') tagsSet.add('tentative');

      const now = new Date();
      const eventStart = toISO(ev.startAt);
      const eventEnd = toISO(ev.endAt);

      if (!apply) { created++; continue; }

      await postRef.set({
        id: postId,
        spaceId,
        campusId,
        authorId: 'rss-bot',
        authorHandle: 'rss@import',
        content: ev.textDescription || `Imported from UBLinked: ${ev.title}`,
        createdAt: now,
        updatedAt: now,
        reactions: 0,
        commentCount: 0,
        tags: Array.from(tagsSet),
        kind: 'event',
        audience: 'campus',
        origin: 'tool_automation',
        shareToCampus: true,
        qualityScore: null,
        moderationStatus: 'active',
        moderationUpdatedAt: now,
        moderationUpdatedBy: 'rss-bot',
        moderationReason: null,
        moderationEscalatedAt: null,
        moderationEscalatedBy: null,
        moderationEscalatedReason: null,
        pinnedAt: null,
        pinExpiresAt: null,
        attachments: [
          ...(ev.imageUrl ? [{ type: 'image', url: ev.imageUrl, title: ev.title, description: null }] : []),
          ...(ev.link ? [{ type: 'link', url: ev.link, title: ev.title, description: ev.textDescription || undefined }] : [])
        ],
        toolContext: null,
        engagementSummary: null,
        event: {
          title: ev.title,
          description: ev.textDescription,
          location: ev.location || 'TBD',
          startAt: eventStart ? new Date(eventStart) : now,
          endAt: eventEnd ? new Date(eventEnd) : new Date(now.getTime() + 60 * 60 * 1000),
          maxAttendees: null,
          enableWaitlist: false,
          goingCount: 0,
          maybeCount: 0,
          waitlistCount: 0,
          checkInEnabled: false,
          checkedInCount: 0,
          checkInWindowBefore: null,
          checkInWindowAfter: null,
          qrCodeEnabled: false,
          coHostIds: [],
          coHostNames: hosts,
          isRssImported: true,
          userRsvp: null,
          userCheckedIn: false,
          coverImageUrl: ev.imageUrl,
          coverImageAlt: ev.title
        }
      });
      created++;
    }
  }

  console.log({ campusId, attempted, created, skipped, apply });
}

main().catch((e) => {
  console.error('✗ Seed events failed:', e?.message || e);
  process.exit(1);
});

