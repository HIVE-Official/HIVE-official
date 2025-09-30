/**
 * Firestore Security Rules Test Suite
 *
 * Tests the security rules for all collections to ensure:
 * - Campus isolation is enforced
 * - Users can only access their own data
 * - Role-based permissions work correctly
 * - Field validation prevents invalid data
 *
 * Run with: npm test -- firestore.rules.test.ts
 */

import {
  assertFails,
  assertSucceeds,
  initializeTestEnvironment,
  RulesTestEnvironment,
} from '@firebase/rules-unit-testing';
import { setDoc, getDoc, updateDoc, deleteDoc, doc, collection, addDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { resolve } from 'path';

let testEnv: RulesTestEnvironment;

// Test user data
const ALICE_UID = 'alice';
const BOB_UID = 'bob';
const ADMIN_UID = 'admin';
const ADMIN_EMAIL = 'jwrhineh@buffalo.edu';
const CAMPUS_ID = 'ub-buffalo';

beforeAll(async () => {
  // Load rules from file
  const rulesPath = resolve(__dirname, '../firestore.rules');
  const rules = readFileSync(rulesPath, 'utf8');

  testEnv = await initializeTestEnvironment({
    projectId: 'hive-test',
    firestore: {
      rules,
      host: 'localhost',
      port: 8080,
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

afterEach(async () => {
  await testEnv.clearFirestore();
});

describe('Helper Functions', () => {
  it('isAuthenticated() works correctly', async () => {
    const unauthedDb = testEnv.unauthenticatedContext().firestore();
    const authedDb = testEnv.authenticatedContext(ALICE_UID).firestore();

    // Unauthenticated access should fail
    await assertFails(getDoc(doc(unauthedDb, 'users', ALICE_UID)));

    // Authenticated access should succeed (for readable collection)
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'users', ALICE_UID), {
        email: 'alice@buffalo.edu',
        campusId: CAMPUS_ID,
        createdAt: new Date(),
      });
    });

    await assertSucceeds(getDoc(doc(authedDb, 'users', ALICE_UID)));
  });

  it('isAdmin() checks admin status', async () => {
    const adminDb = testEnv.authenticatedContext(ADMIN_UID, {
      email: ADMIN_EMAIL,
      admin: true,
    }).firestore();

    const regularDb = testEnv.authenticatedContext(ALICE_UID, {
      email: 'alice@buffalo.edu',
    }).firestore();

    // Create test space
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'spaces', 'test-space'), {
        name: 'Test Space',
        campusId: CAMPUS_ID,
        createdBy: BOB_UID,
        visibility: 'public',
        category: 'student_org',
      });
    });

    // Admin can delete
    await assertSucceeds(deleteDoc(doc(adminDb, 'spaces', 'test-space')));

    // Regular user cannot delete
    await assertFails(deleteDoc(doc(regularDb, 'spaces', 'test-space')));
  });
});

describe('Campus Isolation', () => {
  it('users can only access data from their campus', async () => {
    const aliceDb = testEnv.authenticatedContext(ALICE_UID).firestore();

    // Create data with different campusId
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'posts', 'other-campus-post'), {
        authorId: BOB_UID,
        campusId: 'other-campus',
        content: 'Secret post',
        createdAt: new Date(),
      });
    });

    // Should fail to read - different campus
    await assertFails(getDoc(doc(aliceDb, 'posts', 'other-campus-post')));
  });

  it('prevents creating data for other campuses', async () => {
    const aliceDb = testEnv.authenticatedContext(ALICE_UID).firestore();

    // Try to create post with different campusId
    await assertFails(
      setDoc(doc(aliceDb, 'posts', 'new-post'), {
        authorId: ALICE_UID,
        campusId: 'other-campus', // Wrong campus!
        content: 'Test post',
        createdAt: new Date(),
      })
    );
  });
});

describe('Users Collection', () => {
  it('users can read any profile', async () => {
    const aliceDb = testEnv.authenticatedContext(ALICE_UID).firestore();

    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'users', BOB_UID), {
        email: 'bob@buffalo.edu',
        campusId: CAMPUS_ID,
        createdAt: new Date(),
      });
    });

    await assertSucceeds(getDoc(doc(aliceDb, 'users', BOB_UID)));
  });

  it('users can only update their own profile', async () => {
    const aliceDb = testEnv.authenticatedContext(ALICE_UID).firestore();
    const bobDb = testEnv.authenticatedContext(BOB_UID).firestore();

    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'users', ALICE_UID), {
        email: 'alice@buffalo.edu',
        campusId: CAMPUS_ID,
        bio: 'Original bio',
        createdAt: new Date(),
      });
    });

    // Alice can update her own profile
    await assertSucceeds(
      updateDoc(doc(aliceDb, 'users', ALICE_UID), { bio: 'New bio' })
    );

    // Bob cannot update Alice's profile
    await assertFails(
      updateDoc(doc(bobDb, 'users', ALICE_UID), { bio: 'Hacked bio' })
    );
  });

  it('enforces required fields on user creation', async () => {
    const aliceDb = testEnv.authenticatedContext(ALICE_UID).firestore();

    // Missing required fields
    await assertFails(
      setDoc(doc(aliceDb, 'users', ALICE_UID), {
        email: 'alice@buffalo.edu',
        // Missing campusId and createdAt
      })
    );

    // With all required fields
    await assertSucceeds(
      setDoc(doc(aliceDb, 'users', ALICE_UID), {
        email: 'alice@buffalo.edu',
        campusId: CAMPUS_ID,
        createdAt: new Date(),
      })
    );
  });
});

describe('Spaces Collection', () => {
  it('users can read public spaces', async () => {
    const aliceDb = testEnv.authenticatedContext(ALICE_UID).firestore();

    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'spaces', 'public-space'), {
        name: 'Public Space',
        campusId: CAMPUS_ID,
        visibility: 'public',
        createdBy: BOB_UID,
        category: 'student_org',
      });
    });

    await assertSucceeds(getDoc(doc(aliceDb, 'spaces', 'public-space')));
  });

  it('non-members cannot read member-only spaces', async () => {
    const aliceDb = testEnv.authenticatedContext(ALICE_UID).firestore();

    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'spaces', 'private-space'), {
        name: 'Private Space',
        campusId: CAMPUS_ID,
        visibility: 'members_only',
        createdBy: BOB_UID,
        category: 'student_org',
      });
    });

    await assertFails(getDoc(doc(aliceDb, 'spaces', 'private-space')));
  });

  it('users can create spaces with valid data', async () => {
    const aliceDb = testEnv.authenticatedContext(ALICE_UID).firestore();

    await assertSucceeds(
      setDoc(doc(aliceDb, 'spaces', 'new-space'), {
        name: 'New Space',
        description: 'A test space',
        category: 'student_org',
        campusId: CAMPUS_ID,
        createdBy: ALICE_UID,
        createdAt: new Date(),
        visibility: 'public',
        leaders: [ALICE_UID],
        moderators: [],
      })
    );
  });

  it('validates space name length', async () => {
    const aliceDb = testEnv.authenticatedContext(ALICE_UID).firestore();

    // Name too long (>100 chars)
    await assertFails(
      setDoc(doc(aliceDb, 'spaces', 'long-name-space'), {
        name: 'A'.repeat(101),
        description: 'Test',
        category: 'student_org',
        campusId: CAMPUS_ID,
        createdBy: ALICE_UID,
        createdAt: new Date(),
      })
    );
  });

  it('only leaders can update spaces', async () => {
    const leaderDb = testEnv.authenticatedContext(ALICE_UID).firestore();
    const memberDb = testEnv.authenticatedContext(BOB_UID).firestore();

    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'spaces', 'test-space'), {
        name: 'Test Space',
        campusId: CAMPUS_ID,
        createdBy: ALICE_UID,
        leaders: [ALICE_UID],
        visibility: 'public',
        category: 'student_org',
      });
    });

    // Leader can update
    await assertSucceeds(
      updateDoc(doc(leaderDb, 'spaces', 'test-space'), {
        description: 'Updated description',
      })
    );

    // Non-leader cannot update
    await assertFails(
      updateDoc(doc(memberDb, 'spaces', 'test-space'), {
        description: 'Hacked description',
      })
    );
  });
});

describe('Posts Collection', () => {
  it('users can create posts with their own authorId', async () => {
    const aliceDb = testEnv.authenticatedContext(ALICE_UID).firestore();

    await assertSucceeds(
      setDoc(doc(aliceDb, 'posts', 'new-post'), {
        authorId: ALICE_UID,
        content: 'Test post',
        campusId: CAMPUS_ID,
        createdAt: new Date(),
      })
    );
  });

  it('users cannot create posts with others authorId', async () => {
    const aliceDb = testEnv.authenticatedContext(ALICE_UID).firestore();

    await assertFails(
      setDoc(doc(aliceDb, 'posts', 'fake-post'), {
        authorId: BOB_UID, // Trying to impersonate Bob!
        content: 'Fake post',
        campusId: CAMPUS_ID,
        createdAt: new Date(),
      })
    );
  });

  it('users can update their own posts', async () => {
    const aliceDb = testEnv.authenticatedContext(ALICE_UID).firestore();

    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'posts', 'alice-post'), {
        authorId: ALICE_UID,
        content: 'Original content',
        campusId: CAMPUS_ID,
        createdAt: new Date(),
      });
    });

    await assertSucceeds(
      updateDoc(doc(aliceDb, 'posts', 'alice-post'), {
        content: 'Updated content',
      })
    );
  });

  it('users cannot update others posts', async () => {
    const bobDb = testEnv.authenticatedContext(BOB_UID).firestore();

    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'posts', 'alice-post'), {
        authorId: ALICE_UID,
        content: 'Original content',
        campusId: CAMPUS_ID,
        createdAt: new Date(),
      });
    });

    await assertFails(
      updateDoc(doc(bobDb, 'posts', 'alice-post'), {
        content: 'Hacked content',
      })
    );
  });
});

describe('Space Members', () => {
  it('users can create membership for themselves', async () => {
    const aliceDb = testEnv.authenticatedContext(ALICE_UID).firestore();

    await assertSucceeds(
      setDoc(doc(aliceDb, 'spaceMembers', 'space1_alice'), {
        spaceId: 'space1',
        userId: ALICE_UID,
        campusId: CAMPUS_ID,
        joinedAt: new Date(),
        role: 'member',
      })
    );
  });

  it('users cannot create membership for others', async () => {
    const aliceDb = testEnv.authenticatedContext(ALICE_UID).firestore();

    await assertFails(
      setDoc(doc(aliceDb, 'spaceMembers', 'space1_bob'), {
        spaceId: 'space1',
        userId: BOB_UID, // Trying to add Bob!
        campusId: CAMPUS_ID,
        joinedAt: new Date(),
        role: 'member',
      })
    );
  });
});

describe('Rituals', () => {
  it('only admins can create rituals', async () => {
    const adminDb = testEnv.authenticatedContext(ADMIN_UID, {
      email: ADMIN_EMAIL,
      admin: true,
    }).firestore();
    const regularDb = testEnv.authenticatedContext(ALICE_UID).firestore();

    // Admin can create
    await assertSucceeds(
      setDoc(doc(adminDb, 'rituals', 'new-ritual'), {
        name: 'Campus Challenge',
        campusId: CAMPUS_ID,
        createdAt: new Date(),
      })
    );

    // Regular user cannot
    await assertFails(
      setDoc(doc(regularDb, 'rituals', 'fake-ritual'), {
        name: 'Fake Challenge',
        campusId: CAMPUS_ID,
        createdAt: new Date(),
      })
    );
  });

  it('users can join rituals', async () => {
    const aliceDb = testEnv.authenticatedContext(ALICE_UID).firestore();

    await assertSucceeds(
      setDoc(doc(aliceDb, 'ritual_participation', 'participation1'), {
        ritualId: 'ritual1',
        userId: ALICE_UID,
        campusId: CAMPUS_ID,
        joinedAt: new Date(),
      })
    );
  });
});

describe('Tools Collection', () => {
  it('users can create tools', async () => {
    const aliceDb = testEnv.authenticatedContext(ALICE_UID).firestore();

    await assertSucceeds(
      setDoc(doc(aliceDb, 'tools', 'new-tool'), {
        name: 'Study Timer',
        createdBy: ALICE_UID,
        campusId: CAMPUS_ID,
        isPublished: false,
        createdAt: new Date(),
      })
    );
  });

  it('users can only read published tools or their own', async () => {
    const aliceDb = testEnv.authenticatedContext(ALICE_UID).firestore();

    await testEnv.withSecurityRulesDisabled(async (context) => {
      // Bob's unpublished tool
      await setDoc(doc(context.firestore(), 'tools', 'bob-tool'), {
        createdBy: BOB_UID,
        campusId: CAMPUS_ID,
        isPublished: false,
        createdAt: new Date(),
      });

      // Bob's published tool
      await setDoc(doc(context.firestore(), 'tools', 'bob-tool-public'), {
        createdBy: BOB_UID,
        campusId: CAMPUS_ID,
        isPublished: true,
        createdAt: new Date(),
      });
    });

    // Alice cannot read Bob's unpublished tool
    await assertFails(getDoc(doc(aliceDb, 'tools', 'bob-tool')));

    // Alice can read Bob's published tool
    await assertSucceeds(getDoc(doc(aliceDb, 'tools', 'bob-tool-public')));
  });
});

describe('Admin Collections', () => {
  it('only admins can read audit logs', async () => {
    const adminDb = testEnv.authenticatedContext(ADMIN_UID, {
      email: ADMIN_EMAIL,
      admin: true,
    }).firestore();
    const regularDb = testEnv.authenticatedContext(ALICE_UID).firestore();

    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'audit_logs', 'log1'), {
        action: 'space_created',
        userId: ALICE_UID,
        timestamp: new Date(),
      });
    });

    // Admin can read
    await assertSucceeds(getDoc(doc(adminDb, 'audit_logs', 'log1')));

    // Regular user cannot
    await assertFails(getDoc(doc(regularDb, 'audit_logs', 'log1')));
  });

  it('audit logs are immutable', async () => {
    const adminDb = testEnv.authenticatedContext(ADMIN_UID, {
      email: ADMIN_EMAIL,
      admin: true,
    }).firestore();

    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'audit_logs', 'log1'), {
        action: 'space_created',
        userId: ALICE_UID,
        timestamp: new Date(),
      });
    });

    // Even admin cannot update audit logs
    await assertFails(
      updateDoc(doc(adminDb, 'audit_logs', 'log1'), {
        action: 'modified',
      })
    );

    // Cannot delete
    await assertFails(deleteDoc(doc(adminDb, 'audit_logs', 'log1')));
  });
});