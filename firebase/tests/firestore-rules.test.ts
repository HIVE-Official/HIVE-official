/**
 * Firestore Security Rules Test Suite
 * 
 * This test suite validates that our Firestore security rules correctly
 * enforce the intended access patterns for the HIVE Spaces system.
 * 
 * Key scenarios tested:
 * - Space discovery (authenticated read access)
 * - Member-only access to posts and events
 * - Builder permissions for space management
 * - Builder request workflow
 * - Auto-join restrictions (backend-only)
 */

import { 
  assertFails, 
  assertSucceeds, 
  initializeTestEnvironment,
  RulesTestEnvironment 
} from '@firebase/rules-unit-testing';
import { doc, collection, setDoc, getDoc, updateDoc, deleteDoc, getDocs } from 'firebase/firestore';

// Test environment setup
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

const createTestPost = async (spaceId: string, postId: string, authorId: string) => {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), 'spaces', spaceId, 'posts', postId), {
      authorId: authorId,
      content: 'Test post content',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
};

describe('Spaces Security Rules', () => {
  describe('Space Discovery', () => {
    test('authenticated users can read space data', async () => {
      await createTestSpace('space1');
      
      const alice = authenticatedContext('alice');
      await assertSucceeds(getDoc(doc(alice.firestore(), 'spaces', 'space1')));
      await assertSucceeds(getDocs(collection(alice.firestore(), 'spaces')));
    });

    test('unauthenticated users cannot read space data', async () => {
      await createTestSpace('space1');
      
      const unauth = unauthenticatedContext();
      await assertFails(getDoc(doc(unauth.firestore(), 'spaces', 'space1')));
      await assertFails(getDocs(collection(unauth.firestore(), 'spaces')));
    });
  });

  describe('Space Creation and Deletion', () => {
    test('authenticated users cannot create spaces directly', async () => {
      const alice = authenticatedContext('alice');
      await assertFails(setDoc(doc(alice.firestore(), 'spaces', 'new-space'), {
        name: 'New Space',
        description: 'A new space',
        memberCount: 0,
        type: 'interest',
        tags: [],
        status: 'dormant',
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    });

    test('authenticated users cannot delete spaces', async () => {
      await createTestSpace('space1');
      
      const alice = authenticatedContext('alice');
      await assertFails(deleteDoc(doc(alice.firestore(), 'spaces', 'space1')));
    });
  });

  describe('Space Updates', () => {
    test('builders can update description and bannerUrl', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'builder');
      
      const alice = authenticatedContext('alice');
      await assertSucceeds(updateDoc(doc(alice.firestore(), 'spaces', 'space1'), {
        description: 'Updated description',
        bannerUrl: 'https://example.com/banner.jpg',
        updatedAt: new Date(),
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

    test('regular members cannot update spaces', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'bob', 'member');
      
      const bob = authenticatedContext('bob');
      await assertFails(updateDoc(doc(bob.firestore(), 'spaces', 'space1'), {
        description: 'Updated description',
      }));
    });

    test('non-members cannot update spaces', async () => {
      await createTestSpace('space1');
      
      const charlie = authenticatedContext('charlie');
      await assertFails(updateDoc(doc(charlie.firestore(), 'spaces', 'space1'), {
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
      await assertSucceeds(getDocs(collection(bob.firestore(), 'spaces', 'space1', 'members')));
    });

    test('users cannot join spaces directly', async () => {
      await createTestSpace('space1');
      
      const alice = authenticatedContext('alice');
      await assertFails(setDoc(doc(alice.firestore(), 'spaces', 'space1', 'members', 'alice'), {
        uid: 'alice',
        role: 'member',
        joinedAt: new Date(),
      }));
    });

    test('users can leave spaces by deleting their membership', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'member');
      
      const alice = authenticatedContext('alice');
      await assertSucceeds(deleteDoc(doc(alice.firestore(), 'spaces', 'space1', 'members', 'alice')));
    });

    test('users cannot delete other members', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'member');
      await createTestMember('space1', 'bob', 'member');
      
      const bob = authenticatedContext('bob');
      await assertFails(deleteDoc(doc(bob.firestore(), 'spaces', 'space1', 'members', 'alice')));
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

    test('users cannot update other members roles', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'member');
      await createTestMember('space1', 'bob', 'member');
      
      const bob = authenticatedContext('bob');
      await assertFails(updateDoc(doc(bob.firestore(), 'spaces', 'space1', 'members', 'alice'), {
        role: 'requested_builder',
      }));
    });
  });

  describe('Posts Management', () => {
    test('space members can read posts', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'member');
      await createTestPost('space1', 'post1', 'alice');
      
      const alice = authenticatedContext('alice');
      await assertSucceeds(getDoc(doc(alice.firestore(), 'spaces', 'space1', 'posts', 'post1')));
      await assertSucceeds(getDocs(collection(alice.firestore(), 'spaces', 'space1', 'posts')));
    });

    test('non-members cannot read posts', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'member');
      await createTestPost('space1', 'post1', 'alice');
      
      const bob = authenticatedContext('bob');
      await assertFails(getDoc(doc(bob.firestore(), 'spaces', 'space1', 'posts', 'post1')));
      await assertFails(getDocs(collection(bob.firestore(), 'spaces', 'space1', 'posts')));
    });

    test('space members can create posts', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'member');
      
      const alice = authenticatedContext('alice');
      await assertSucceeds(setDoc(doc(alice.firestore(), 'spaces', 'space1', 'posts', 'new-post'), {
        authorId: 'alice',
        content: 'New post content',
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    });

    test('users cannot create posts with wrong authorId', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'member');
      
      const alice = authenticatedContext('alice');
      await assertFails(setDoc(doc(alice.firestore(), 'spaces', 'space1', 'posts', 'new-post'), {
        authorId: 'bob', // Wrong author ID
        content: 'New post content',
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    });

    test('non-members cannot create posts', async () => {
      await createTestSpace('space1');
      
      const bob = authenticatedContext('bob');
      await assertFails(setDoc(doc(bob.firestore(), 'spaces', 'space1', 'posts', 'new-post'), {
        authorId: 'bob',
        content: 'New post content',
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    });

    test('post authors can update their own posts', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'member');
      await createTestPost('space1', 'post1', 'alice');
      
      const alice = authenticatedContext('alice');
      await assertSucceeds(updateDoc(doc(alice.firestore(), 'spaces', 'space1', 'posts', 'post1'), {
        content: 'Updated content',
        updatedAt: new Date(),
      }));
    });

    test('other users cannot update posts', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'member');
      await createTestMember('space1', 'bob', 'member');
      await createTestPost('space1', 'post1', 'alice');
      
      const bob = authenticatedContext('bob');
      await assertFails(updateDoc(doc(bob.firestore(), 'spaces', 'space1', 'posts', 'post1'), {
        content: 'Hacked content',
      }));
    });

    test('post authors can delete their own posts', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'member');
      await createTestPost('space1', 'post1', 'alice');
      
      const alice = authenticatedContext('alice');
      await assertSucceeds(deleteDoc(doc(alice.firestore(), 'spaces', 'space1', 'posts', 'post1')));
    });

    test('builders can delete any posts in their space', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'member');
      await createTestMember('space1', 'bob', 'builder');
      await createTestPost('space1', 'post1', 'alice');
      
      const bob = authenticatedContext('bob');
      await assertSucceeds(deleteDoc(doc(bob.firestore(), 'spaces', 'space1', 'posts', 'post1')));
    });

    test('regular members cannot delete others posts', async () => {
      await createTestSpace('space1');
      await createTestMember('space1', 'alice', 'member');
      await createTestMember('space1', 'bob', 'member');
      await createTestPost('space1', 'post1', 'alice');
      
      const bob = authenticatedContext('bob');
      await assertFails(deleteDoc(doc(bob.firestore(), 'spaces', 'space1', 'posts', 'post1')));
    });
  });

  describe('Collection Group Queries', () => {
    test('authenticated users can perform collection group queries on spaces', async () => {
      await createTestSpace('space1');
      await createTestSpace('space2');
      
      const alice = authenticatedContext('alice');
      // This tests the collection group rule: match /{path=**}/spaces/{spaceId}
      await assertSucceeds(getDocs(collection(alice.firestore(), 'spaces')));
    });

    test('unauthenticated users cannot perform collection group queries', async () => {
      await createTestSpace('space1');
      
      const unauth = unauthenticatedContext();
      await assertFails(getDocs(collection(unauth.firestore(), 'spaces')));
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
    await assertSucceeds(getDocs(collection(unauth.firestore(), 'schools')));

    const alice = authenticatedContext('alice');
    await assertSucceeds(getDoc(doc(alice.firestore(), 'schools', 'school1')));
  });

  test('non-admin users cannot write to schools', async () => {
    const alice = authenticatedContext('alice');
    await assertFails(setDoc(doc(alice.firestore(), 'schools', 'new-school'), {
      name: 'Test School',
      domain: 'test.edu',
      status: 'waitlist',
      waitlistCount: 0,
    }));
  });

  test('waitlist entries are completely protected', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'schools', 'school1'), {
        name: 'Test School',
        status: 'waitlist',
        waitlistCount: 1,
      });
      await setDoc(doc(context.firestore(), 'schools', 'school1', 'waitlist_entries', 'entry1'), {
        email: 'test@buffalo.edu',
        joinedAt: new Date(),
      });
    });

    const alice = authenticatedContext('alice');
    await assertFails(getDoc(doc(alice.firestore(), 'schools', 'school1', 'waitlist_entries', 'entry1')));
    await assertFails(getDocs(collection(alice.firestore(), 'schools', 'school1', 'waitlist_entries')));
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
    
    await assertSucceeds(updateDoc(doc(alice.firestore(), 'users', 'alice'), {
      displayName: 'Alice Smith',
    }));
  });

  test('users cannot read other users private data', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'users', 'alice'), {
        schoolId: 'school1',
        email: 'alice@buffalo.edu',
        isPublic: false,
      });
    });

    const bob = authenticatedContext('bob');
    await assertFails(getDoc(doc(bob.firestore(), 'users', 'alice')));
  });

  test('users can read public profiles', async () => {
    await testEnv.withSecurityRulesDisabled(async (context) => {
      await setDoc(doc(context.firestore(), 'users', 'alice'), {
        schoolId: 'school1',
        email: 'alice@buffalo.edu',
        displayName: 'Alice Smith',
        isPublic: true,
      });
    });

    const bob = authenticatedContext('bob');
    await assertSucceeds(getDoc(doc(bob.firestore(), 'users', 'alice')));
  });

  test('users must provide schoolId when creating account', async () => {
    const alice = authenticatedContext('alice');
    
    await assertFails(setDoc(doc(alice.firestore(), 'users', 'alice'), {
      email: 'alice@buffalo.edu',
      // Missing schoolId
    }));

    await assertSucceeds(setDoc(doc(alice.firestore(), 'users', 'alice'), {
      schoolId: 'school1',
      email: 'alice@buffalo.edu',
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

    await assertSucceeds(updateDoc(doc(alice.firestore(), 'users', 'alice'), {
      displayName: 'Alice Smith', // Can update other fields
    }));
  });
}); 