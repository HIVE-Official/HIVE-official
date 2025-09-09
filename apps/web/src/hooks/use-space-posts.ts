import { useState, useEffect } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  arrayUnion,
  arrayRemove,
  Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/use-auth';

export interface PostAuthor {
  id: string;
  name: string;
  avatar?: string;
  role?: 'owner' | 'admin' | 'moderator' | 'member';
}

export interface PostReaction {
  emoji: string;
  count: number;
  userReacted: boolean;
}

export interface CoordinationResponse {
  userId: string;
  userName?: string;
  response: 'yes' | 'no' | 'maybe';
  details?: string;
  timestamp: Date;
}

export interface SpacePost {
  id: string;
  spaceId: string;
  type: 'discussion' | 'question' | 'poll' | 'announcement' | 'study_session' | 'food_run' | 'ride_share' | 'meetup';
  content: string;
  author: PostAuthor;
  timestamp: Date;
  reactions?: PostReaction[];
  commentCount?: number;
  isPinned?: boolean;
  images?: string[];
  
  coordinationType?: 'study_session' | 'food_run' | 'ride_share' | 'meetup';
  coordinationData?: {
    title: string;
    description?: string;
    location?: string;
    datetime?: Date;
    capacity?: number;
    deadline?: Date;
    responses?: CoordinationResponse[];
    status?: 'open' | 'full' | 'closed' | 'completed';
    organizer: string;
  };
  
  pollData?: {
    question: string;
    options: Array<{
      id: string;
      text: string;
      votes: number;
      userVoted: boolean;
    }>;
    allowMultiple?: boolean;
    endsAt?: Date;
  };
}

interface UseSpacePostsReturn {
  posts: SpacePost[];
  loading: boolean;
  error: Error | null;
  createPost: (postData: Partial<SpacePost>) => Promise<string>;
  updatePost: (postId: string, updates: Partial<SpacePost>) => Promise<void>;
  deletePost: (postId: string) => Promise<void>;
  toggleReaction: (postId: string, emoji: string) => Promise<void>;
  respondToCoordination: (postId: string, response: CoordinationResponse) => Promise<void>;
}

export function useSpacePosts(spaceId: string | undefined): UseSpacePostsReturn {
  const { user } = useAuth();
  const [posts, setPosts] = useState<SpacePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Subscribe to posts in real-time
  useEffect(() => {
    if (!spaceId) {
      setPosts([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const postsRef = collection(db, 'spaces', spaceId, 'posts');
    const q = query(
      postsRef,
      orderBy('isPinned', 'desc'),
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const postsData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            spaceId,
            type: data.type || 'discussion',
            content: data.content || '',
            author: data.author || { id: '', name: 'Unknown' },
            timestamp: data.timestamp?.toDate?.() || new Date(),
            reactions: data.reactions || [],
            commentCount: data.commentCount || 0,
            isPinned: data.isPinned || false,
            images: data.images || [],
            coordinationType: data.coordinationType,
            coordinationData: data.coordinationData ? {
              ...data.coordinationData,
              datetime: data.coordinationData.datetime?.toDate?.(),
              deadline: data.coordinationData.deadline?.toDate?.(),
              responses: data.coordinationData.responses?.map((r: any) => ({
                ...r,
                timestamp: r.timestamp?.toDate?.() || new Date()
              })) || []
            } : undefined,
            pollData: data.pollData ? {
              ...data.pollData,
              endsAt: data.pollData.endsAt?.toDate?.()
            } : undefined
          } as SpacePost;
        });

        // Process reactions to determine if current user reacted
        if (user) {
          postsData.forEach(post => {
            if (post.reactions) {
              post.reactions = post.reactions.map(reaction => ({
                ...reaction,
                userReacted: false // This would need a separate collection to track per-user reactions
              }));
            }
          });
        }

        setPosts(postsData);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching posts:', err);
        setError(err as Error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [spaceId, user]);

  // Create a new post
  const createPost = async (postData: Partial<SpacePost>): Promise<string> => {
    if (!spaceId || !user) {
      throw new Error('Must be logged in to create posts');
    }

    try {
      const postsRef = collection(db, 'spaces', spaceId, 'posts');
      const newPost = {
        ...postData,
        spaceId,
        author: {
          id: user.uid,
          name: user.displayName || user.email?.split('@')[0] || 'Anonymous',
          avatar: user.photoURL || undefined,
          role: 'member' // This should be fetched from space membership
        },
        timestamp: serverTimestamp(),
        reactions: [],
        commentCount: 0,
        isPinned: false
      };

      // Handle coordination data dates
      if (newPost.coordinationData) {
        newPost.coordinationData = {
          ...newPost.coordinationData,
          responses: [],
          status: 'open'
        };
      }

      const docRef = await addDoc(postsRef, newPost);
      
      // Update space activity
      const spaceRef = doc(db, 'spaces', spaceId);
      await updateDoc(spaceRef, {
        lastActivity: serverTimestamp(),
        postCount: arrayUnion(1)
      });

      return docRef.id;
    } catch (err) {
      console.error('Error creating post:', err);
      throw err;
    }
  };

  // Update a post
  const updatePost = async (postId: string, updates: Partial<SpacePost>): Promise<void> => {
    if (!spaceId || !user) {
      throw new Error('Must be logged in to update posts');
    }

    try {
      const postRef = doc(db, 'spaces', spaceId, 'posts', postId);
      await updateDoc(postRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error('Error updating post:', err);
      throw err;
    }
  };

  // Delete a post
  const deletePost = async (postId: string): Promise<void> => {
    if (!spaceId || !user) {
      throw new Error('Must be logged in to delete posts');
    }

    try {
      const postRef = doc(db, 'spaces', spaceId, 'posts', postId);
      await deleteDoc(postRef);
      
      // Update space post count
      const spaceRef = doc(db, 'spaces', spaceId);
      await updateDoc(spaceRef, {
        postCount: arrayRemove(1)
      });
    } catch (err) {
      console.error('Error deleting post:', err);
      throw err;
    }
  };

  // Toggle reaction on a post
  const toggleReaction = async (postId: string, emoji: string): Promise<void> => {
    if (!spaceId || !user) {
      throw new Error('Must be logged in to react to posts');
    }

    try {
      const postRef = doc(db, 'spaces', spaceId, 'posts', postId);
      const post = posts.find(p => p.id === postId);
      
      if (!post) return;

      const existingReaction = post.reactions?.find(r => r.emoji === emoji);
      let updatedReactions;

      if (existingReaction) {
        // For simplicity, just toggle the count
        // In production, track user reactions in a subcollection
        updatedReactions = post.reactions?.map(r => 
          r.emoji === emoji 
            ? { ...r, count: r.userReacted ? r.count - 1 : r.count + 1, userReacted: !r.userReacted }
            : r
        );
      } else {
        updatedReactions = [...(post.reactions || []), { emoji, count: 1, userReacted: true }];
      }

      await updateDoc(postRef, {
        reactions: updatedReactions
      });
    } catch (err) {
      console.error('Error toggling reaction:', err);
      throw err;
    }
  };

  // Respond to coordination post
  const respondToCoordination = async (postId: string, response: CoordinationResponse): Promise<void> => {
    if (!spaceId || !user) {
      throw new Error('Must be logged in to respond to coordination');
    }

    try {
      const postRef = doc(db, 'spaces', spaceId, 'posts', postId);
      const post = posts.find(p => p.id === postId);
      
      if (!post || !post.coordinationData) return;

      const updatedResponses = [
        ...(post.coordinationData.responses?.filter(r => r.userId !== user.uid) || []),
        {
          ...response,
          userId: user.uid,
          userName: user.displayName || user.email?.split('@')[0] || 'Anonymous',
          timestamp: new Date()
        }
      ];

      // Check if we've reached capacity
      const status = post.coordinationData.capacity && 
                    updatedResponses.filter(r => r.response === 'yes').length >= post.coordinationData.capacity
                    ? 'full' 
                    : post.coordinationData.status;

      await updateDoc(postRef, {
        'coordinationData.responses': updatedResponses,
        'coordinationData.status': status
      });
    } catch (err) {
      console.error('Error responding to coordination:', err);
      throw err;
    }
  };

  return {
    posts,
    loading,
    error,
    createPost,
    updatePost,
    deletePost,
    toggleReaction,
    respondToCoordination
  };
}