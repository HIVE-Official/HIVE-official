#!/usr/bin/env ts-node

/**
 * Seeds Firestore with the official University at Buffalo program catalog.
 *
 * Usage:
 *   pnpm --filter hive-scripts exec ts-node seed-academic-programs.ts --campus=default,ub-buffalo
 *
 * Optional flags:
 *   --only=interests                      # Seed only the interest taxonomy
 *   --only=majors,graduatePrograms        # Seed a subset of fields
 * Supported scopes: majors, graduatePrograms, interests, yearRange
 */

import { dbAdmin } from '../packages/core/src/firebase-admin';
import { UB_UNDERGRADUATE_MAJORS, UB_GRADUATE_PROGRAMS } from '../packages/core/src/constants/majors';
import { UB_INTEREST_CATEGORIES } from '../packages/core/src/constants/onboarding-interests';

const COLLECTION = 'campusCatalogs';

type SeedScope = 'majors' | 'graduatePrograms' | 'interests' | 'yearRange';

function ensureFirebaseCredentials() {
  const hasServiceAccount =
    Boolean(process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) ||
    Boolean(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  const hasApplicationDefault = Boolean(process.env.GOOGLE_APPLICATION_CREDENTIALS);

  if (!hasServiceAccount && !hasApplicationDefault) {
    throw new Error(
      'Firebase Admin credentials were not found. Source your .env.local (set -a; source .env.local; set +a) or export GOOGLE_APPLICATION_CREDENTIALS before running this script.'
    );
  }
}

function parseCampusList(): string[] {
  const arg = process.argv.find((value) => value.startsWith('--campus='));
  if (!arg) {
    return ['default'];
  }

  const raw = arg.split('=')[1];
  return raw
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);
}

function parseScope(): Set<SeedScope> {
  const arg = process.argv.find((value) => value.startsWith('--only='));
  if (!arg) {
    return new Set<SeedScope>(['majors', 'graduatePrograms', 'interests', 'yearRange']);
  }

  const raw = arg.split('=')[1];
  const requested = raw
    .split(',')
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

  const valid: SeedScope[] = ['majors', 'graduatePrograms', 'interests', 'yearRange'];
  const matched = requested.filter((scope): scope is SeedScope => valid.includes(scope as SeedScope));

  if (matched.length === 0) {
    throw new Error(`No valid scopes found in "--only=${raw}". Supported values: ${valid.join(', ')}`);
  }

  return new Set<SeedScope>(matched);
}

async function seedCampus(campusId: string, scope: Set<SeedScope>) {
  const nowYear = new Date().getFullYear();
  const docRef = dbAdmin.collection(COLLECTION).doc(campusId);

  const payload: Record<string, unknown> = {};

  if (scope.has('majors')) {
    payload.majors = UB_UNDERGRADUATE_MAJORS;
  }

  if (scope.has('graduatePrograms')) {
    payload.graduatePrograms = UB_GRADUATE_PROGRAMS;
  }

  if (scope.has('interests')) {
    payload.interests = UB_INTEREST_CATEGORIES;
  }

  if (scope.has('yearRange')) {
    payload.yearRange = { startYear: nowYear, endYear: nowYear + 6 };
  }

  await docRef.set(payload, { merge: true });

  const scopedFields = Array.from(scope).join(', ');
  console.log(`✅ Seeded [${scopedFields}] for campus "${campusId}"`);
}

async function main() {
  ensureFirebaseCredentials();
  const campuses = parseCampusList();
  const scope = parseScope();
  console.log(
    `📚 Seeding academic catalog fields [${Array.from(scope).join(', ')}] for campuses: ${campuses.join(', ')}`
  );

  for (const campusId of campuses) {
    await seedCampus(campusId, scope);
  }

  console.log('🎉 Completed program catalog seeding.');
  process.exit(0);
}

main().catch((error) => {
  console.error('❌ Failed to seed academic programs:', error);
  process.exit(1);
});
