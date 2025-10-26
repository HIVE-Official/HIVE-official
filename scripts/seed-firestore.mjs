#!/usr/bin/env node
// Seed minimal Firestore data needed for local dev: catalog + a few Spaces.
// Uses Admin SDK via @hive/firebase and loads env from apps/web/.env.local.
// Usage: pnpm seed:firestore [projectId]

import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Load env from app-scoped .env.local to ensure Admin creds are present
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
      // Remove optional surrounding quotes
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      process.env[key] = value;
    }
  } catch {}
}

import { getApps, initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const app = (() => {
  const apps = getApps();
  if (apps.length > 0) return apps[0];
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = (process.env.FIREBASE_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error('Missing Firebase Admin env (FIREBASE_PROJECT_ID/CLIENT_EMAIL/PRIVATE_KEY)');
  }
  return initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
})();

const firestore = getFirestore(app);

const upsert = async (ref, data) => {
  const snap = await ref.get();
  if (snap.exists) {
    await ref.set({ ...snap.data(), ...data }, { merge: true });
  } else {
    await ref.set(data, { merge: true });
  }
};

const seedCatalog = async () => {
  const ref = firestore.collection('catalog').doc('onboarding');
  const base = {
    majors: [
      { id: 'cs', name: 'Computer Science', college: 'Engineering' },
      { id: 'ie', name: 'Industrial Engineering', college: 'Engineering' },
      { id: 'bio', name: 'Biology', college: 'Arts & Sciences' }
    ],
    interests: [
      { id: 'design', label: 'Design Sprints', category: 'Tech' },
      { id: 'open-mic', label: 'Open Mic', category: 'Arts' },
      { id: 'rides', label: 'Campus Rides', category: 'Community' }
    ],
    residentialSpaces: [
      { spaceId: 'space-dorm-richmond', name: 'Richmond Hall' }
    ]
  };
  await upsert(ref, base);
  return 'catalog/onboarding';
};

const spaceDoc = (id, payload) => firestore.collection('spaces').doc(id);

const now = new Date();
const member = (profileId, role = 'leader') => ({ profileId, role, joinedAt: now });

const seedSpaces = async () => {
  const campusId = 'ub-buffalo';
  const leaderId = 'profile-leader-1';
  const common = {
    campusId,
    isActive: true,
    tags: [],
    createdAt: now,
    updatedAt: now,
    leaderId,
    settings: {
      maxMembers: 1000,
      isInviteOnly: false,
      joinPolicy: 'open',
      postingPolicy: 'members',
      mediaApprovalPolicy: 'leaders_only'
    }
  };

  const seeds = [
    {
      id: 'space-robotics',
      name: 'Robotics Club',
      description: 'Hands-on builds and campus demos.',
      type: 'student_organization',
      visibility: 'public',
    },
    {
      id: 'space-panic-relief',
      name: 'Panic Relief',
      description: 'Study breaks, breathing, late-night chill.',
      type: 'student_organization',
      visibility: 'campus',
    },
    {
      id: 'space-dorm-richmond',
      name: 'Richmond Hall',
      description: 'Residential community events and notices.',
      type: 'residential',
      visibility: 'campus',
    },
    {
      id: 'space-phi-theta',
      name: 'Phi Theta',
      description: 'Service & socials calendar.',
      type: 'greek',
      visibility: 'campus',
    }
  ];

  for (const s of seeds) {
    const doc = spaceDoc(s.id);
    const data = {
      ...common,
      name: s.name,
      description: s.description,
      type: s.type,
      visibility: s.visibility,
      members: [member(leaderId, 'leader')],
      memberRoles: { [leaderId]: 'leader' },
      activity: { recentPostCount1h: 2, lastPostAt: now }
    };
    await upsert(doc, data);
  }

  return seeds.map((s) => `spaces/${s.id}`);
};

async function main() {
  const wrote = [];
  wrote.push(await seedCatalog());
  wrote.push(...(await seedSpaces()));
  console.log('✅ Seeded documents:', wrote.join(', '));
}

main().catch((e) => {
  console.error('Seed failed:', e?.message || e);
  process.exit(1);
});
