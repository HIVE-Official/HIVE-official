import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  startAfter,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove,
  DocumentData,
  QueryDocumentSnapshot,
  Timestamp,
  Unsubscribe
} from 'firebase/firestore';
import { db } from '@/lib/firebase/client/firebase-client';

// Feed post interface matching Firestore structure
export interface FeedPost {
  id: string;
  type: 'post' | 'tool_share' | 'event' | 'space_update' | 'achievement' | 'announcement';
  authorId: string;
  authorName: string;
  authorHandle: string;
  authorAvatar?: string;
  spaceId?: string;
  spaceName?: string;
  content: {
    text?: string;
    title?: string;
    description?: string;
    mediaUrls?: string[];
    toolId?: string;
    toolName?: string;
    eventId?: string;
    eventDetails?: {
      name: string;
      date: string;
      location: string;
      attendeeCount?: number;
    };
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
    likedBy: string[];
    bookmarkedBy: string[];
  };
  tags: string[];
  mentions: string[];
  visibility: 'public' | 'space' | 'followers';
  isPinned: boolean;
  isPromoted: boolean;
  createdAt: Timestamp | Date;
  updatedAt?: Timestamp | Date;
  metadata?: {
    surface?: string;
    generatedBy?: string;
    algorithmScore?: number;
  };
}

// Feed query options
export interface FeedQueryOptions {
  feedType?: 'personal' | 'space' | 'trending' | 'following';
  spaceId?: string;
  userId?: string;
  postTypes?: string[];
  sortBy?: 'recent' | 'popular' | 'relevant';
  pageSize?: number;
  startAfterDoc?: QueryDocumentSnapshot<DocumentData>;
}

// Feed service class
export class FeedService {
  private listeners: Map<string, Unsubscribe> = new Map();

  // Create a new post
  async createPost(
    userId: string,
    postData: Partial<FeedPost>
  ): Promise<string> {
    try {
      const postsRef = collection(db, 'posts');
      const newPost = {
        ...postData,
        authorId: userId,
        engagement: {
          likes: 0,
          comments: 0,
          shares: 0,
          views: 0,
          likedBy: [],
          bookmarkedBy: []
        },
        tags: postData.tags || [],
        mentions: postData.mentions || [],
        isPinned: false,
        isPromoted: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(postsRef, newPost);

      // If this is a space post, update space activity
      if (postData.spaceId) {
        await this.updateSpaceActivity(postData.spaceId, 'post_created');
      }

      // Track in user's activity
      await this.trackUserActivity(userId, 'post_created', docRef.id);

      return docRef.id;
    } catch (error) {
      console.error('Error creating post:', error);
      throw error;
    }
  }

  // Get feed posts with pagination
  async getFeedPosts(
    userId: string,
    options: FeedQueryOptions = {}
  ): Promise<{ posts: FeedPost[], lastDoc: QueryDocumentSnapshot<DocumentData> | null }> {
    try {
      const {
        feedType = 'personal',
        spaceId,
        postTypes = [],
        sortBy = 'recent',
        pageSize = 20,
        startAfterDoc
      } = options;

      let q = query(collection(db, 'posts'));

      // Build query based on feed type
      if (feedType === 'personal') {
        // Get user's spaces for personal feed
        const userSpaces = await this.getUserSpaces(userId);
        if (userSpaces.length > 0) {
          q = query(q, where('spaceId', 'in', userSpaces));
        }
      } else if (feedType === 'space' && spaceId) {
        q = query(q, where('spaceId', '==', spaceId));
      } else if (feedType === 'following') {
        const following = await this.getUserFollowing(userId);
        if (following.length > 0) {
          q = query(q, where('authorId', 'in', following));
        }
      }

      // Filter by post types if specified
      if (postTypes.length > 0) {
        q = query(q, where('type', 'in', postTypes));
      }

      // Apply sorting
      if (sortBy === 'recent') {
        q = query(q, orderBy('createdAt', 'desc'));
      } else if (sortBy === 'popular') {
        q = query(q, orderBy('engagement.likes', 'desc'));
      }

      // Apply pagination
      q = query(q, limit(pageSize));
      if (startAfterDoc) {
        q = query(q, startAfter(startAfterDoc));
      }

      const snapshot = await getDocs(q);
      const posts: FeedPost[] = [];
      let lastDoc: QueryDocumentSnapshot<DocumentData> | null = null;

      snapshot.forEach((doc: any) => {
        posts.push({
          id: doc.id,
          ...doc.data()
        } as FeedPost);
        lastDoc = doc;
      });

      // Increment view counts
      await this.incrementViewCounts(posts.map(p => p.id));

      return { posts, lastDoc };
    } catch (error) {
      console.error('Error fetching feed posts:', error);
      throw error;
    }
  }

  // Subscribe to real-time feed updates
  subscribeFeedUpdates(
    userId: string,
    options: FeedQueryOptions,
    onUpdate: (posts: FeedPost[]) => void
  ): () => void {
    const listenerId = `feed_${userId}_${Date.now()}`;

    try {
      let q = query(collection(db, 'posts'));

      // Build real-time query
      if (options.spaceId) {
        q = query(q, where('spaceId', '==', options.spaceId));
      }

      q = query(q, orderBy('createdAt', 'desc'), limit(50));

      const unsubscribe = onSnapshot(q, (snapshot: any) => {
        const posts: FeedPost[] = [];
        snapshot.forEach((doc: any) => {
          posts.push({
            id: doc.id,
            ...doc.data()
          } as FeedPost);
        });
        onUpdate(posts);
      }, (error: any) => {
        console.error('Feed subscription error:', error);
      });

      this.listeners.set(listenerId, unsubscribe);

      // Return cleanup function
      return () => {
        const unsub = this.listeners.get(listenerId);
        if (unsub) {
          unsub();
          this.listeners.delete(listenerId);
        }
      };
    } catch (error) {
      console.error('Error setting up feed subscription:', error);
      return () => {};
    }
  }

  // Like/unlike a post
  async toggleLike(postId: string, userId: string): Promise<void> {
    try {
      const postRef = doc(db, 'posts', postId);
      const postDoc = await getDoc(postRef);

      if (!postDoc.exists()) {
        throw new Error('Post not found');
      }

      const post = postDoc.data() as FeedPost;
      const likedBy = post.engagement?.likedBy || [];
      const isLiked = likedBy.includes(userId);

      await updateDoc(postRef, {
        'engagement.likes': increment(isLiked ? -1 : 1),
        'engagement.likedBy': isLiked 
          ? arrayRemove(userId)
          : arrayUnion(userId),
        updatedAt: serverTimestamp()
      });

      // Track activity
      await this.trackUserActivity(
        userId,
        isLiked ? 'post_unliked' : 'post_liked',
        postId
      );
    } catch (error) {
      console.error('Error toggling like:', error);
      throw error;
    }
  }

  // Bookmark/unbookmark a post
  async toggleBookmark(postId: string, userId: string): Promise<void> {
    try {
      const postRef = doc(db, 'posts', postId);
      const postDoc = await getDoc(postRef);

      if (!postDoc.exists()) {
        throw new Error('Post not found');
      }

      const post = postDoc.data() as FeedPost;
      const bookmarkedBy = post.engagement?.bookmarkedBy || [];
      const isBookmarked = bookmarkedBy.includes(userId);

      await updateDoc(postRef, {
        'engagement.bookmarkedBy': isBookmarked 
          ? arrayRemove(userId)
          : arrayUnion(userId)
      });

      // Also update user's bookmarks collection
      const bookmarkRef = doc(db, 'users', userId, 'bookmarks', postId);
      if (isBookmarked) {
        await deleteDoc(bookmarkRef);
      } else {
        await addDoc(collection(db, 'users', userId, 'bookmarks'), {
          postId,
          createdAt: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      throw error;
    }
  }

  // Add a comment to a post
  async addComment(
    postId: string,
    userId: string,
    content: string
  ): Promise<void> {
    try {
      // Add comment to comments subcollection
      await addDoc(collection(db, 'posts', postId, 'comments'), {
        userId,
        content,
        createdAt: serverTimestamp()
      });

      // Update comment count
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        'engagement.comments': increment(1),
        updatedAt: serverTimestamp()
      });

      // Track activity
      await this.trackUserActivity(userId, 'comment_added', postId);
    } catch (error) {
      console.error('Error adding comment:', error);
      throw error;
    }
  }

  // Share a post
  async sharePost(postId: string, userId: string): Promise<void> {
    try {
      const postRef = doc(db, 'posts', postId);
      await updateDoc(postRef, {
        'engagement.shares': increment(1),
        updatedAt: serverTimestamp()
      });

      // Track share activity
      await this.trackUserActivity(userId, 'post_shared', postId);
    } catch (error) {
      console.error('Error sharing post:', error);
      throw error;
    }
  }

  // Helper: Get user's spaces
  private async getUserSpaces(userId: string): Promise<string[]> {
    try {
      const membershipsQuery = query(
        collection(db, 'members'),
        where('userId', '==', userId),
        where('status', '==', 'active')
      );
      const snapshot = await getDocs(membershipsQuery);
      return snapshot.docs.map(doc => doc.data().spaceId);
    } catch (error) {
      console.error('Error fetching user spaces:', error);
      return [];
    }
  }

  // Helper: Get user's following list
  private async getUserFollowing(userId: string): Promise<string[]> {
    try {
      const followingQuery = query(
        collection(db, 'users', userId, 'following')
      );
      const snapshot = await getDocs(followingQuery);
      return snapshot.docs.map(doc => doc.id);
    } catch (error) {
      console.error('Error fetching following list:', error);
      return [];
    }
  }

  // Helper: Update space activity
  private async updateSpaceActivity(
    spaceId: string,
    activityType: string
  ): Promise<void> {
    try {
      const spaceRef = doc(db, 'spaces', spaceId);
      await updateDoc(spaceRef, {
        lastActivity: serverTimestamp(),
        [`stats.${activityType}`]: increment(1)
      });
    } catch (error) {
      console.error('Error updating space activity:', error);
    }
  }

  // Helper: Track user activity
  private async trackUserActivity(
    userId: string,
    action: string,
    targetId: string
  ): Promise<void> {
    try {
      await addDoc(collection(db, 'activityEvents'), {
        userId,
        action,
        targetId,
        timestamp: serverTimestamp(),
        date: new Date().toISOString().split('T')[0]
      });
    } catch (error) {
      console.error('Error tracking activity:', error);
    }
  }

  // Helper: Increment view counts
  private async incrementViewCounts(postIds: string[]): Promise<void> {
    try {
      const batch = postIds.map(postId => 
        updateDoc(doc(db, 'posts', postId), {
          'engagement.views': increment(1)
        })
      );
      await Promise.all(batch);
    } catch (error) {
      console.error('Error incrementing view counts:', error);
    }
  }

  // Cleanup all listeners
  cleanup(): void {
    this.listeners.forEach(unsubscribe => unsubscribe());
    this.listeners.clear();
  }
}

// Export singleton instance
export const feedService = new FeedService();