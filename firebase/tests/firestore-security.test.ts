/**
 * Firestore Security Rules Test Suite for HIVE Spaces System
 * 
 * This test suite validates that our Firestore security rules correctly
 * enforce the intended access patterns for the HIVE platform.
 */

import { 
  assertFails, 
  assertSucceeds, 
  initializeTestEnvironment,
  RulesTestEnvironment 
} from '@firebase/rules-unit-testing';
import { doc, collection, setDoc, getDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';

let testEnv: RulesTestEnvironment;
const PROJECT_ID = 'hive-test-project';

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: PROJECT_ID,
    firestore: {
      rules: require('fs').readFileSync('firestore.rules', 'utf8'),
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

beforeEach(async () => {
  await testEnv.clearFirestore();
});

// Helper functions
const authenticatedContext = (uid: string) => testEnv.authenticatedContext(uid);
const unauthenticatedContext = () => testEnv.unauthenticatedContext();

const createTestSpace = async (spaceId: string) => {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), 'spaces', spaceId), {
      name: 'Test Space',
      name_lowercase: 'test space',
      description: 'A test space for unit testing',
      memberCount: 2,
      type: 'interest',
      tags: [{ type: 'interest', sub_type: 'testing' }],
      status: 'activated',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
};

const createTestMember = async (spaceId: string, userId: string, role: 'member' | 'builder' | 'requested_builder') => {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), 'spaces', spaceId, 'members', userId), {
      uid: userId,
      role: role,
      joinedAt: new Date(),
    });
  });
};

describe('Spaces Security Rules', () => {
  describe('Space Discovery', () => {
    test('authenticated users can read space data', async () => {
      await createTestSpace('space1');
      const alice = authenticatedContext('alice');
      await assertSucceeds(getDoc(doc(alice.firestore(), 'spaces', 'space1')));
    });

    test('unauthenticated users cannot read space data', async () => {
      await createTestSpace('space1');
      const unauth = unauthenticatedContext();
      await assertFails(getDoc(doc(unauth.firestore(), 'spaces', 'space1')));
    });
  });

  describe('Space Updates', () => {
    test('builders can update allowed fields', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'builder');
      
      const alice = authenticatedContext('alice');
      await assertSucceeds(updateDoc(doc(alice.firestore(), 'spaces', 'space1'), {
        description: 'Updated description',
        bannerUrl: 'https://example.com/banner.jpg',
      }));
    });

    test('builders cannot update restricted fields', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'builder');
      
      const alice = authenticatedContext('alice');
      await assertFails(updateDoc(doc(alice.firestore(), 'spaces', 'space1'), {
        name: 'Hacked Name',
        memberCount: 9999,
      }));
    });

    test('non-builders cannot update spaces', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'bob', 'member');
      
      const bob = authenticatedContext('bob');
      await assertFails(updateDoc(doc(bob.firestore(), 'spaces', 'space1'), {
        description: 'Updated description',
      }));
    });
  });

  describe('Member Management', () => {
    test('authenticated users can read member lists', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'member');
      
      const bob = authenticatedContext('bob');
      await assertSucceeds(getDoc(doc(bob.firestore(), 'spaces', 'space1', 'members', 'alice')));
    });

    test('users can leave spaces by deleting their membership', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'member');
      
      const alice = authenticatedContext('alice');
      await assertSucceeds(deleteDoc(doc(alice.firestore(), 'spaces', 'space1', 'members', 'alice')));
    });

    test('members can request builder role', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'member');
      
      const alice = authenticatedContext('alice');
      await assertSucceeds(updateDoc(doc(alice.firestore(), 'spaces', 'space1', 'members', 'alice'), {
        role: 'requested_builder',
      }));
    });

    test('members cannot directly become builders', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'member');
      
      const alice = authenticatedContext('alice');
      await assertFails(updateDoc(doc(alice.firestore(), 'spaces', 'space1', 'members', 'alice'), {
        role: 'builder',
      }));
    });
  });

  describe('Posts Management', () => {
    test('space members can read posts', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'member');
      
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'spaces', 'space1', 'posts', 'post1'), {
          authorId: 'alice',
          content: 'Test post content',
          createdAt: new Date(),
        });
      });
      
      const alice = authenticatedContext('alice');
      await assertSucceeds(getDoc(doc(alice.firestore(), 'spaces', 'space1', 'posts', 'post1')));
    });

    test('non-members cannot read posts', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'member');
      
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'spaces', 'space1', 'posts', 'post1'), {
          authorId: 'alice',
          content: 'Test post content',
          createdAt: new Date(),
        });
      });
      
      const bob = authenticatedContext('bob');
      await assertFails(getDoc(doc(bob.firestore(), 'spaces', 'space1', 'posts', 'post1')));
    });

    test('space members can create posts', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'member');
      
      const alice = authenticatedContext('alice');
      await assertSucceeds(setDoc(doc(alice.firestore(), 'spaces', 'space1', 'posts', 'new-post'), {
        authorId: 'alice',
        content: 'New post content',
        createdAt: new Date(),
      }));
    });

    test('builders can delete any posts in their space', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'member');
      await createTestMember('space1', 'bob', 'builder');
      
      await testEnv.withSecurityRulesDisabled(async (context) => {
        await setDoc(doc(context.firestore(), 'spaces', 'space1', 'posts', 'post1'), {
          authorId: 'alice',
          content: 'Test post content',
          createdAt: new Date(),
        });
      });
      
      const bob = authenticatedContext('bob');
      await assertSucceeds(deleteDoc(doc(bob.firestore(), 'spaces', 'space1', 'posts', 'post1')));
    });
  });
});

describe('Schools Security Rules', () => {
  test('anyone can read schools collection', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'schools', 'school1'), {
        name: 'University at Buffalo',
        domain: 'buffalo.edu',
        status: 'active',
        waitlistCount: 0,
      });
    });

    const unauth = unauthenticatedContext();
    await assertSucceeds(getDoc(doc(unauth.firestore(), 'schools', 'school1')));

    const alice = authenticatedContext('alice');
    await assertSucceeds(getDoc(doc(alice.firestore(), 'schools', 'school1')));
  });

  test('waitlist entries are completely protected', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'schools', 'school1', 'waitlist_entries', 'entry1'), {
        email: 'test@buffalo.edu',
        joinedAt: new Date(),
      });
    });

    const alice = authenticatedContext('alice');
    await assertFails(getDoc(doc(alice.firestore(), 'schools', 'school1', 'waitlist_entries', 'entry1')));
    await assertFails(setDoc(doc(alice.firestore(), 'schools', 'school1', 'waitlist_entries', 'entry2'), {
      email: 'alice@buffalo.edu',
      joinedAt: new Date(),
    }));
  });
});

describe('User Management Rules', () => {
  test('users can read and write their own data', async () => {
    const alice = authenticatedContext('alice');
    
    await assertSucceeds(setDoc(doc(alice.firestore(), 'users', 'alice'), {
      schoolId: 'school1',
      email: 'alice@buffalo.edu',
      createdAt: new Date(),
    }));

    await assertSucceeds(getDoc(doc(alice.firestore(), 'users', 'alice')));
  });

  test('users must provide schoolId when creating account', async () => {
    const alice = authenticatedContext('alice');
    
    await assertFails(setDoc(doc(alice.firestore(), 'users', 'alice'), {
      email: 'alice@buffalo.edu',
      // Missing schoolId
    }));
  });

  test('users cannot change their schoolId after creation', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'users', 'alice'), {
        schoolId: 'school1',
        email: 'alice@buffalo.edu',
      });
    });

    const alice = authenticatedContext('alice');
    await assertFails(updateDoc(doc(alice.firestore(), 'users', 'alice'), {
      schoolId: 'school2', // Cannot change school
    }));
  });
}); 