import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';

// Mock Firestore
vi.mock('firebase/firestore', () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  setDoc: vi.fn(),
  updateDoc: vi.fn(),
  deleteDoc: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
  Timestamp: {
    now: vi.fn(() => ({ seconds: Date.now() / 1000, nanoseconds: 0 })),
    fromDate: vi.fn((date) => ({ seconds: date.getTime() / 1000, nanoseconds: 0 })),
  },
}));

describe('Firestore Operations', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Campus Isolation', () => {
    it('should always include campusId in queries', () => {
      const createSpaceQuery = () => {
        return query(
          collection({} as any, 'spaces'),
          where('campusId', '==', 'ub-buffalo'),
          where('isActive', '==', true),
          orderBy('memberCount', 'desc'),
          limit(20)
        );
      };

      createSpaceQuery();

      expect(query).toHaveBeenCalled();
      expect(where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
    });

    it('should add campusId to all new documents', async () => {
      const createDocument = async (collectionName: string, data: any) => {
        const docRef = doc(collection({} as any, collectionName));
        const documentData = {
          ...data,
          campusId: 'ub-buffalo',
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        };

        await setDoc(docRef, documentData);
        return { id: docRef.id, ...documentData };
      };

      (doc as any).mockReturnValue({ id: 'test-doc-id' });
      (collection as any).mockReturnValue({});
      (setDoc as any).mockResolvedValue(undefined);

      const result = await createDocument('spaces', {
        name: 'Test Space',
        type: 'social',
      });

      expect(result.campusId).toBe('ub-buffalo');
      expect(result.createdAt).toBeDefined();
      expect(result.updatedAt).toBeDefined();
    });

    it('should validate campusId on document updates', async () => {
      const updateDocument = async (
        collectionName: string,
        docId: string,
        updates: any,
        userCampusId: string
      ) => {
        // First fetch the document to verify campus access
        const docRef = doc({} as any, collectionName, docId);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) {
          throw new Error('Document not found');
        }

        const docData = docSnap.data();
        if (docData.campusId !== userCampusId) {
          throw new Error('Unauthorized: Campus mismatch');
        }

        // Perform update
        await updateDoc(docRef, {
          ...updates,
          updatedAt: Timestamp.now(),
        });

        return true;
      };

      (getDoc as any).mockResolvedValue({
        exists: () => true,
        data: () => ({ campusId: 'ub-buffalo' }),
      });
      (updateDoc as any).mockResolvedValue(undefined);

      // Should succeed with matching campus
      const result = await updateDocument(
        'spaces',
        'space-123',
        { name: 'Updated Space' },
        'ub-buffalo'
      );
      expect(result).toBe(true);

      // Should fail with mismatched campus
      (getDoc as any).mockResolvedValue({
        exists: () => true,
        data: () => ({ campusId: 'cornell' }),
      });

      await expect(
        updateDocument('spaces', 'space-456', { name: 'Hacked Space' }, 'ub-buffalo')
      ).rejects.toThrow('Unauthorized: Campus mismatch');
    });
  });

  describe('Space Operations', () => {
    it('should create a new space with proper structure', async () => {
      const createSpace = async (spaceData: any, userId: string) => {
        const spaceRef = doc(collection({} as any, 'spaces'));
        const space = {
          id: spaceRef.id,
          ...spaceData,
          campusId: 'ub-buffalo',
          createdBy: userId,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          memberCount: 1,
          isActive: true,
          settings: {
            joinApprovalRequired: false,
            postApprovalRequired: false,
            allowAnonymous: false,
            ...spaceData.settings,
          },
        };

        await setDoc(spaceRef, space);

        // Add creator as first member
        const memberRef = doc(collection({} as any, 'spaces', spaceRef.id, 'members'));
        await setDoc(memberRef, {
          userId,
          role: 'admin',
          joinedAt: Timestamp.now(),
          campusId: 'ub-buffalo',
        });

        return space;
      };

      (doc as any).mockReturnValue({ id: 'space-test-123' });
      (collection as any).mockReturnValue({});
      (setDoc as any).mockResolvedValue(undefined);

      const space = await createSpace(
        {
          name: 'CS Study Group',
          description: 'Computer Science study group',
          type: 'academic',
          visibility: 'public',
        },
        'user-123'
      );

      expect(space.id).toBe('space-test-123');
      expect(space.campusId).toBe('ub-buffalo');
      expect(space.createdBy).toBe('user-123');
      expect(space.memberCount).toBe(1);
      expect(space.settings.joinApprovalRequired).toBe(false);
    });

    it('should fetch spaces with proper filtering', async () => {
      const fetchSpaces = async (filters: any = {}) => {
        const constraints = [
          where('campusId', '==', 'ub-buffalo'),
          where('isActive', '==', true),
        ];

        if (filters.type) {
          constraints.push(where('type', '==', filters.type));
        }

        if (filters.visibility) {
          constraints.push(where('visibility', '==', filters.visibility));
        }

        constraints.push(orderBy('memberCount', 'desc'));
        constraints.push(limit(filters.limit || 20));

        const q = query(collection({} as any, 'spaces'), ...constraints);
        const snapshot = await getDocs(q);

        return snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
      };

      (query as any).mockReturnValue({});
      (collection as any).mockReturnValue({});
      (getDocs as any).mockResolvedValue({
        docs: [
          {
            id: 'space-1',
            data: () => ({ name: 'Space 1', memberCount: 100 }),
          },
          {
            id: 'space-2',
            data: () => ({ name: 'Space 2', memberCount: 50 }),
          },
        ],
      });

      const spaces = await fetchSpaces({ type: 'social', limit: 10 });

      expect(query).toHaveBeenCalled();
      expect(where).toHaveBeenCalledWith('campusId', '==', 'ub-buffalo');
      expect(where).toHaveBeenCalledWith('type', '==', 'social');
      expect(orderBy).toHaveBeenCalledWith('memberCount', 'desc');
      expect(limit).toHaveBeenCalledWith(10);
      expect(spaces).toHaveLength(2);
    });
  });

  describe('Post Operations', () => {
    it('should create posts with proper validation', async () => {
      const createPost = async (spaceId: string, postData: any, userId: string) => {
        // Validate user is a member of the space
        const memberRef = doc({} as any, 'spaces', spaceId, 'members', userId);
        const memberSnap = await getDoc(memberRef);

        if (!memberSnap.exists()) {
          throw new Error('You must be a member to post in this space');
        }

        const postRef = doc(collection({} as any, 'spaces', spaceId, 'posts'));
        const post = {
          id: postRef.id,
          ...postData,
          spaceId,
          authorId: userId,
          campusId: 'ub-buffalo',
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
          likes: 0,
          comments: 0,
          isDeleted: false,
        };

        await setDoc(postRef, post);
        return post;
      };

      // User is a member
      (getDoc as any).mockResolvedValue({
        exists: () => true,
        data: () => ({ role: 'member' }),
      });
      (doc as any).mockReturnValue({ id: 'post-123' });
      (setDoc as any).mockResolvedValue(undefined);

      const post = await createPost(
        'space-123',
        {
          content: 'Hello, this is a test post!',
          type: 'text',
        },
        'user-123'
      );

      expect(post.id).toBe('post-123');
      expect(post.spaceId).toBe('space-123');
      expect(post.authorId).toBe('user-123');
      expect(post.campusId).toBe('ub-buffalo');

      // Non-member should fail
      (getDoc as any).mockResolvedValue({
        exists: () => false,
      });

      await expect(
        createPost('space-456', { content: 'Unauthorized post' }, 'user-456')
      ).rejects.toThrow('You must be a member to post in this space');
    });

    it('should handle post interactions (likes, comments)', async () => {
      const toggleLike = async (spaceId: string, postId: string, userId: string) => {
        const likeRef = doc({} as any, 'spaces', spaceId, 'posts', postId, 'likes', userId);
        const likeSnap = await getDoc(likeRef);

        if (likeSnap.exists()) {
          // Unlike
          await deleteDoc(likeRef);
          await updateDoc(doc({} as any, 'spaces', spaceId, 'posts', postId), {
            likes: -1, // Decrement (actual implementation would use FieldValue.increment)
          });
          return false;
        } else {
          // Like
          await setDoc(likeRef, {
            userId,
            timestamp: Timestamp.now(),
            campusId: 'ub-buffalo',
          });
          await updateDoc(doc({} as any, 'spaces', spaceId, 'posts', postId), {
            likes: 1, // Increment
          });
          return true;
        }
      };

      // First like
      (getDoc as any).mockResolvedValue({ exists: () => false });
      (setDoc as any).mockResolvedValue(undefined);
      (updateDoc as any).mockResolvedValue(undefined);

      const liked = await toggleLike('space-123', 'post-123', 'user-123');
      expect(liked).toBe(true);
      expect(setDoc).toHaveBeenCalled();

      // Unlike
      (getDoc as any).mockResolvedValue({ exists: () => true });
      (deleteDoc as any).mockResolvedValue(undefined);

      const unliked = await toggleLike('space-123', 'post-123', 'user-123');
      expect(unliked).toBe(false);
      expect(deleteDoc).toHaveBeenCalled();
    });
  });

  describe('Profile Operations', () => {
    it('should create and update user profiles', async () => {
      const createOrUpdateProfile = async (userId: string, profileData: any) => {
        const profileRef = doc({} as any, 'users', userId);
        const profileSnap = await getDoc(profileRef);

        const profile = {
          ...profileData,
          id: userId,
          campusId: 'ub-buffalo',
          updatedAt: Timestamp.now(),
        };

        if (!profileSnap.exists()) {
          // Create new profile
          profile.createdAt = Timestamp.now();
          profile.isOnboarded = false;
          await setDoc(profileRef, profile);
        } else {
          // Update existing profile
          await updateDoc(profileRef, profile);
        }

        return profile;
      };

      // New profile
      (getDoc as any).mockResolvedValue({ exists: () => false });
      (setDoc as any).mockResolvedValue(undefined);

      const newProfile = await createOrUpdateProfile('user-123', {
        displayName: 'John Doe',
        email: 'john@buffalo.edu',
        major: 'Computer Science',
      });

      expect(newProfile.createdAt).toBeDefined();
      expect(newProfile.isOnboarded).toBe(false);

      // Update existing profile
      (getDoc as any).mockResolvedValue({ exists: () => true });
      (updateDoc as any).mockResolvedValue(undefined);

      const updatedProfile = await createOrUpdateProfile('user-123', {
        bio: 'Updated bio',
        interests: ['coding', 'gaming'],
      });

      expect(updatedProfile.bio).toBe('Updated bio');
      expect(updateDoc).toHaveBeenCalled();
    });

    it('should validate handle uniqueness', async () => {
      const claimHandle = async (userId: string, handle: string) => {
        // Check if handle is already taken
        const handleQuery = query(
          collection({} as any, 'handles'),
          where('handle', '==', handle.toLowerCase())
        );
        const handleSnap = await getDocs(handleQuery);

        if (!handleSnap.empty) {
          throw new Error('Handle already taken');
        }

        // Claim the handle
        await setDoc(doc({} as any, 'handles', handle.toLowerCase()), {
          userId,
          handle: handle.toLowerCase(),
          claimedAt: Timestamp.now(),
          campusId: 'ub-buffalo',
        });

        // Update user profile
        await updateDoc(doc({} as any, 'users', userId), {
          handle: handle.toLowerCase(),
          updatedAt: Timestamp.now(),
        });

        return handle.toLowerCase();
      };

      // Handle available
      (getDocs as any).mockResolvedValue({ empty: true });
      (setDoc as any).mockResolvedValue(undefined);
      (updateDoc as any).mockResolvedValue(undefined);

      const handle = await claimHandle('user-123', 'CoolStudent');
      expect(handle).toBe('coolstudent');

      // Handle taken
      (getDocs as any).mockResolvedValue({ empty: false });

      await expect(claimHandle('user-456', 'CoolStudent')).rejects.toThrow('Handle already taken');
    });
  });

  describe('Error Handling', () => {
    it('should handle permission denied errors', async () => {
      const secureDelete = async (collection: string, docId: string, userId: string) => {
        try {
          const docRef = doc({} as any, collection, docId);
          const docSnap = await getDoc(docRef);

          if (!docSnap.exists()) {
            throw new Error('Document not found');
          }

          const data = docSnap.data();
          if (data.createdBy !== userId) {
            throw new Error('Permission denied: You can only delete your own content');
          }

          await deleteDoc(docRef);
          return true;
        } catch (error: any) {
          if (error.code === 'permission-denied') {
            throw new Error('You do not have permission to perform this action');
          }
          throw error;
        }
      };

      (getDoc as any).mockResolvedValue({
        exists: () => true,
        data: () => ({ createdBy: 'other-user' }),
      });

      await expect(secureDelete('posts', 'post-123', 'user-123')).rejects.toThrow(
        'Permission denied: You can only delete your own content'
      );
    });

    it('should handle offline/network errors', async () => {
      const fetchWithRetry = async (collectionName: string, retries = 3) => {
        for (let i = 0; i < retries; i++) {
          try {
            const snapshot = await getDocs(collection({} as any, collectionName));
            return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          } catch (error: any) {
            if (error.code === 'unavailable' && i < retries - 1) {
              // Wait before retry
              await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
              continue;
            }
            throw new Error('Network unavailable. Please check your connection.');
          }
        }
      };

      (getDocs as any).mockRejectedValue({ code: 'unavailable' });

      await expect(fetchWithRetry('spaces', 1)).rejects.toThrow('Network unavailable');
    });
  });
});