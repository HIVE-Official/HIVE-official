import { 
  assertFails, 
  assertSucceeds, 
  initializeTestEnvironment,
  RulesTestEnvironment 
} from '@firebase/rules-unit-testing';
import { doc, setDoc, getDoc, updateDoc, deleteDoc, collection, addDoc } from 'firebase/firestore';
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('Posts Security Rules', () => {
  let testEnv: RulesTestEnvironment;
  
  const SPACE_ID = 'test-space-123';
  const USER_ID = 'user123';
  const OTHER_USER_ID = 'user456';
  const BUILDER_USER_ID = 'builder789';
  
  beforeAll(async () => {
    testEnv = await initializeTestEnvironment({
      projectId: 'hive-test-project',
      firestore: {
        rules: readFileSync(resolve(__dirname, '../../firestore.rules'), 'utf8'),
      },
    });
  });

  afterAll(async () => {
    await testEnv.cleanup();
  });

  beforeEach(async () => {
    await testEnv.clearFirestore();
    
    // Set up test data
    const adminContext = testEnv.authenticatedContext(USER_ID, { admin: true });
    
    // Create test space
    await setDoc(doc(adminContext.firestore(), 'spaces', SPACE_ID), {
      name: 'Test Space',
      description: 'A test space',
      type: 'major',
      memberCount: 2,
      status: 'activated',
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    // Create memberships
    await setDoc(doc(adminContext.firestore(), 'spaces', SPACE_ID, 'members', USER_ID), {
      role: 'member',
      joinedAt: new Date(),
    });
    
    await setDoc(doc(adminContext.firestore(), 'spaces', SPACE_ID, 'members', BUILDER_USER_ID), {
      role: 'builder',
      joinedAt: new Date(),
    });
  });

  describe('Post Creation', () => {
    const validPostData = {
      authorId: USER_ID,
      author: {
        name: 'Test User',
        handle: 'testuser',
        role: 'member',
      },
      spaceId: SPACE_ID,
      type: 'text',
      content: 'This is a test post',
      visibility: 'members_only',
      status: 'active',
      metrics: {
        replyCount: 0,
        likeCount: 0,
        shareCount: 0,
        viewCount: 0,
      },
      threadDepth: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should allow members to create valid posts', async () => {
      const userContext = testEnv.authenticatedContext(USER_ID);
      const postsRef = collection(userContext.firestore(), 'spaces', SPACE_ID, 'posts');
      
      await assertSucceeds(addDoc(postsRef, validPostData));
    });

    it('should reject posts from non-members', async () => {
      const nonMemberContext = testEnv.authenticatedContext(OTHER_USER_ID);
      const postsRef = collection(nonMemberContext.firestore(), 'spaces', SPACE_ID, 'posts');
      
      await assertFails(addDoc(postsRef, validPostData));
    });

    it('should reject posts with invalid authorId', async () => {
      const userContext = testEnv.authenticatedContext(USER_ID);
      const postsRef = collection(userContext.firestore(), 'spaces', SPACE_ID, 'posts');
      
      const invalidPost = { ...validPostData, authorId: OTHER_USER_ID };
      await assertFails(addDoc(postsRef, invalidPost));
    });

    it('should reject posts with content too long', async () => {
      const userContext = testEnv.authenticatedContext(USER_ID);
      const postsRef = collection(userContext.firestore(), 'spaces', SPACE_ID, 'posts');
      
      const invalidPost = { 
        ...validPostData, 
        content: 'x'.repeat(2001) // Exceeds 2000 character limit
      };
      await assertFails(addDoc(postsRef, invalidPost));
    });

    it('should reject posts with invalid type', async () => {
      const userContext = testEnv.authenticatedContext(USER_ID);
      const postsRef = collection(userContext.firestore(), 'spaces', SPACE_ID, 'posts');
      
      const invalidPost = { ...validPostData, type: 'invalid_type' };
      await assertFails(addDoc(postsRef, invalidPost));
    });

    it('should reject posts with invalid visibility', async () => {
      const userContext = testEnv.authenticatedContext(USER_ID);
      const postsRef = collection(userContext.firestore(), 'spaces', SPACE_ID, 'posts');
      
      const invalidPost = { ...validPostData, visibility: 'invalid_visibility' };
      await assertFails(addDoc(postsRef, invalidPost));
    });
  });

  describe('Post Reading', () => {
    let postId: string;

    beforeEach(async () => {
      const adminContext = testEnv.authenticatedContext(USER_ID, { admin: true });
      const postRef = doc(adminContext.firestore(), 'spaces', SPACE_ID, 'posts', 'test-post');
      
      await setDoc(postRef, {
        authorId: USER_ID,
        author: {
          name: 'Test User',
          handle: 'testuser',
          role: 'member',
        },
        spaceId: SPACE_ID,
        type: 'text',
        content: 'This is a test post',
        visibility: 'members_only',
        status: 'active',
        metrics: {
          replyCount: 0,
          likeCount: 0,
          shareCount: 0,
          viewCount: 0,
        },
        threadDepth: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      postId = 'test-post';
    });

    it('should allow members to read posts', async () => {
      const userContext = testEnv.authenticatedContext(USER_ID);
      const postRef = doc(userContext.firestore(), 'spaces', SPACE_ID, 'posts', postId);
      
      await assertSucceeds(getDoc(postRef));
    });

    it('should reject non-members from reading posts', async () => {
      const nonMemberContext = testEnv.authenticatedContext(OTHER_USER_ID);
      const postRef = doc(nonMemberContext.firestore(), 'spaces', SPACE_ID, 'posts', postId);
      
      await assertFails(getDoc(postRef));
    });

    it('should reject unauthenticated users from reading posts', async () => {
      const unauthContext = testEnv.unauthenticatedContext();
      const postRef = doc(unauthContext.firestore(), 'spaces', SPACE_ID, 'posts', postId);
      
      await assertFails(getDoc(postRef));
    });
  });

  describe('Post Updates', () => {
    let postId: string;

    beforeEach(async () => {
      const adminContext = testEnv.authenticatedContext(USER_ID, { admin: true });
      const postRef = doc(adminContext.firestore(), 'spaces', SPACE_ID, 'posts', 'test-post');
      
      await setDoc(postRef, {
        authorId: USER_ID,
        author: {
          name: 'Test User',
          handle: 'testuser',
          role: 'member',
        },
        spaceId: SPACE_ID,
        type: 'text',
        content: 'This is a test post',
        visibility: 'members_only',
        status: 'active',
        metrics: {
          replyCount: 0,
          likeCount: 0,
          shareCount: 0,
          viewCount: 0,
        },
        threadDepth: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      postId = 'test-post';
    });

    it('should allow authors to update their own posts', async () => {
      const userContext = testEnv.authenticatedContext(USER_ID);
      const postRef = doc(userContext.firestore(), 'spaces', SPACE_ID, 'posts', postId);
      
      await assertSucceeds(updateDoc(postRef, {
        content: 'Updated content',
        updatedAt: new Date(),
      }));
    });

    it('should reject non-authors from updating posts', async () => {
      const otherUserContext = testEnv.authenticatedContext(OTHER_USER_ID);
      const postRef = doc(otherUserContext.firestore(), 'spaces', SPACE_ID, 'posts', postId);
      
      await assertFails(updateDoc(postRef, {
        content: 'Malicious update',
        updatedAt: new Date(),
      }));
    });

    it('should allow builders to moderate posts', async () => {
      const builderContext = testEnv.authenticatedContext(BUILDER_USER_ID);
      const postRef = doc(builderContext.firestore(), 'spaces', SPACE_ID, 'posts', postId);
      
      await assertSucceeds(updateDoc(postRef, {
        status: 'hidden',
        moderatedBy: BUILDER_USER_ID,
        moderatedAt: new Date(),
        moderationReason: 'Inappropriate content',
        updatedAt: new Date(),
      }));
    });
  });

  describe('Post Deletion', () => {
    let postId: string;

    beforeEach(async () => {
      const adminContext = testEnv.authenticatedContext(USER_ID, { admin: true });
      const postRef = doc(adminContext.firestore(), 'spaces', SPACE_ID, 'posts', 'test-post');
      
      await setDoc(postRef, {
        authorId: USER_ID,
        author: {
          name: 'Test User',
          handle: 'testuser',
          role: 'member',
        },
        spaceId: SPACE_ID,
        type: 'text',
        content: 'This is a test post',
        visibility: 'members_only',
        status: 'active',
        metrics: {
          replyCount: 0,
          likeCount: 0,
          shareCount: 0,
          viewCount: 0,
        },
        threadDepth: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      
      postId = 'test-post';
    });

    it('should allow authors to delete their own posts', async () => {
      const userContext = testEnv.authenticatedContext(USER_ID);
      const postRef = doc(userContext.firestore(), 'spaces', SPACE_ID, 'posts', postId);
      
      await assertSucceeds(deleteDoc(postRef));
    });

    it('should allow builders to delete posts', async () => {
      const builderContext = testEnv.authenticatedContext(BUILDER_USER_ID);
      const postRef = doc(builderContext.firestore(), 'spaces', SPACE_ID, 'posts', postId);
      
      await assertSucceeds(deleteDoc(postRef));
    });

    it('should reject non-authors/non-builders from deleting posts', async () => {
      const otherUserContext = testEnv.authenticatedContext(OTHER_USER_ID);
      const postRef = doc(otherUserContext.firestore(), 'spaces', SPACE_ID, 'posts', postId);
      
      await assertFails(deleteDoc(postRef));
    });
  });
}); 