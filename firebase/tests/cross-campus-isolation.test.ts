/**
 * Cross-Campus Isolation Tests (Firestore Rules)
 *
 * Validates that documents with a non-UB campusId are not readable/writable
 * and that writes must include campusId = 'ub-buffalo'.
 */

import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { resolve } from 'path';

let testEnv: RulesTestEnvironment;

const UB = 'ub-buffalo';
const OTHER = 'other-campus';
const ALICE = 'alice';

beforeAll(async () => {
  const rules = readFileSync(resolve(__dirname, '../firestore.rules'), 'utf8');
  testEnv = await initializeTestEnvironment({
    projectId: 'hive-cross-campus-tests',
    firestore: { rules },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

afterEach(async () => {
  await testEnv.clearFirestore();
});

describe('Campus isolation (global collections)', () => {
  it('denies reading posts from other campus', async () => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), 'posts', 'p1'), {
        authorId: 'someone',
        campusId: OTHER,
        content: 'secret',
        createdAt: new Date(),
      });
    });

    const db = testEnv.authenticatedContext(ALICE).firestore();
    await assertFails(getDoc(doc(db, 'posts', 'p1')));
  });

  it('allows creating posts only for UB campus', async () => {
    const db = testEnv.authenticatedContext(ALICE).firestore();

    // Wrong campus
    await assertFails(
      setDoc(doc(db, 'posts', 'p2'), {
        authorId: ALICE,
        campusId: OTHER,
        content: 'hi',
        createdAt: new Date(),
      })
    );

    // Missing campusId
    await assertFails(
      setDoc(doc(db, 'posts', 'p3'), {
        authorId: ALICE,
        content: 'missing campus',
        createdAt: new Date(),
      })
    );

    // Correct campus
    await assertSucceeds(
      setDoc(doc(db, 'posts', 'p4'), {
        authorId: ALICE,
        campusId: UB,
        content: 'ok',
        createdAt: new Date(),
      })
    );
  });
});

describe('Campus isolation (spaces and memberships)', () => {
  it('denies reading a space from other campus', async () => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), 'spaces', 's1'), {
        name: 'Other Campus Space',
        description: 'private',
        category: 'student_org',
        campusId: OTHER,
        createdBy: 'owner1',
        createdAt: new Date(),
        visibility: 'public',
        leaders: [ALICE],
        moderators: [],
      });
    });

    const db = testEnv.authenticatedContext(ALICE).firestore();
    await assertFails(getDoc(doc(db, 'spaces', 's1')));
  });

  it('allows creating a UB space but blocks other campuses', async () => {
    const db = testEnv.authenticatedContext(ALICE).firestore();

    // Other campus blocked
    await assertFails(
      setDoc(doc(db, 'spaces', 's2'), {
        name: 'Nope',
        description: 'blocked',
        category: 'student_org',
        campusId: OTHER,
        createdBy: ALICE,
        createdAt: new Date(),
        visibility: 'public',
        leaders: [ALICE],
        moderators: [],
      })
    );

    // UB campus ok
    await assertSucceeds(
      setDoc(doc(db, 'spaces', 's3'), {
        name: 'UB Space',
        description: 'allowed',
        category: 'student_org',
        campusId: UB,
        createdBy: ALICE,
        createdAt: new Date(),
        visibility: 'public',
        leaders: [ALICE],
        moderators: [],
      })
    );
  });

  it('enforces campus on flat membership collection', async () => {
    const db = testEnv.authenticatedContext(ALICE).firestore();

    await assertFails(
      setDoc(doc(db, 'spaceMembers', 's3_alice'), {
        spaceId: 's3',
        userId: ALICE,
        campusId: OTHER,
        joinedAt: new Date(),
        role: 'member',
      })
    );

    await assertSucceeds(
      setDoc(doc(db, 'spaceMembers', 's3_alice_ok'), {
        spaceId: 's3',
        userId: ALICE,
        campusId: UB,
        joinedAt: new Date(),
        role: 'member',
      })
    );
  });
});

describe('Campus isolation (rituals and tools)', () => {
  it('denies reading rituals from other campus', async () => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), 'rituals', 'r1'), {
        name: 'Other Campus Ritual',
        campusId: OTHER,
        createdAt: new Date(),
      });
    });

    const db = testEnv.authenticatedContext(ALICE).firestore();
    await assertFails(getDoc(doc(db, 'rituals', 'r1')));
  });

  it('denies reading tools from other campus', async () => {
    await testEnv.withSecurityRulesDisabled(async (ctx) => {
      await setDoc(doc(ctx.firestore(), 'tools', 't1'), {
        name: 'Other Campus Tool',
        createdBy: 'u1',
        campusId: OTHER,
        isPublished: true,
        createdAt: new Date(),
      });
    });

    const db = testEnv.authenticatedContext(ALICE).firestore();
    await assertFails(getDoc(doc(db, 'tools', 't1')));
  });

  it('allows creating ritual vote only for UB campus', async () => {
    const db = testEnv.authenticatedContext(ALICE).firestore();
    // Wrong campus
    await assertFails(
      setDoc(doc(db, 'ritual_votes', 'v1'), {
        ritualId: 'r-1',
        userId: ALICE,
        campusId: OTHER,
        createdAt: new Date(),
      })
    );
    // Correct campus
    await assertSucceeds(
      setDoc(doc(db, 'ritual_votes', 'v2'), {
        ritualId: 'r-1',
        userId: ALICE,
        campusId: UB,
        createdAt: new Date(),
      })
    );
  });
});
