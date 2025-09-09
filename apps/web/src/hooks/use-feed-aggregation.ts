'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit,
  getDocs,
  onSnapshot,
  Timestamp,
  DocumentData,
  QueryDocumentSnapshot,
  startAfter,
  collectionGroup
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useUnifiedAuth } from '@hive/ui';

export interface FeedPost {
  id: string;
  postId: string;
  spaceId: string;
  spaceName: string;
  spaceHandle?: string;
  type: 'discussion' | 'question' | 'poll' | 'announcement' | 'study_session' | 'food_run' | 'ride_share' | 'meetup';
  content: string;
  title?: string;
  images?: string[];
  author: {
    id: string;
    name: string;
    avatar?: string;
    role?: string;
  };
  timestamp: Date;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    views: number;
  };
  reactions?: Array<{
    emoji: string;
    count: number;
    userReacted: boolean;
  }>;
  isPinned?: boolean;
  coordinationData?: {
    title: string;
    location?: string;
    datetime?: Date;
    capacity?: number;
    responses?: Array<{
      userId: string;
      response: 'yes' | 'maybe' | 'no';
    }>;
    status?: 'open' | 'full' | 'closed' | 'completed';
  };
  pollData?: {
    question: string;
    options: Array<{
      id: string;
      text: string;
      votes: number;
    }>;
  };
}

interface UseFeedAggregationReturn {
  posts: FeedPost[];
  loading: boolean;
  error: Error | null;
  hasMore: boolean;
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  feedType: 'for-you' | 'following' | 'trending';
  setFeedType: (type: 'for-you' | 'following' | 'trending') => void;
}

export function useFeedAggregation(): UseFeedAggregationReturn {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [feedType, setFeedType] = useState<'for-you' | 'following' | 'trending'>('for-you');
  const { user } = useUnifiedAuth();

  const PAGE_SIZE = 20;

  // Fetch user's joined spaces
  const getUserSpaces = async (): Promise<string[]> => {
    if (!user?.uid) return [];
    
    try {
      // Query all spaces where user is a member
      const spacesRef = collection(db, 'spaces');
      const spacesSnapshot = await getDocs(spacesRef);
      const userSpaces: string[] = [];
      
      // Check membership in each space
      for (const spaceDoc of spacesSnapshot.docs) {
        const memberRef = collection(db, 'spaces', spaceDoc.id, 'members');
        const memberQuery = query(memberRef, where('userId', '==', user.uid));
        const memberSnapshot = await getDocs(memberQuery);
        
        if (!memberSnapshot.empty) {
          userSpaces.push(spaceDoc.id);
        }
      }
      
      return userSpaces;
    } catch (err) {
      console.error('Error fetching user spaces:', err);
      return [];
    }
  };

  // Fetch posts from all user's spaces
  const fetchPosts = async (reset = false) => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      if (reset) {
        setLastDoc(null);
        setPosts([]);
      }

      let allPosts: FeedPost[] = [];

      if (feedType === 'for-you') {
        // Get posts from user's spaces
        const userSpaces = await getUserSpaces();
        
        if (userSpaces.length === 0) {
          // If user has no spaces, get trending posts from all public spaces
          const postsQuery = query(
            collectionGroup(db, 'posts'),
            orderBy('createdAt', 'desc'),
            limit(PAGE_SIZE)
          );
          
          const snapshot = await getDocs(postsQuery);
          
          for (const doc of snapshot.docs) {
            const data = doc.data();
            const spaceId = doc.ref.parent.parent?.id || '';
            
            // Get space info
            const spaceDoc = await getDocs(query(collection(db, 'spaces'), where('__name__', '==', spaceId)));
            const spaceData = spaceDoc.docs[0]?.data();
            
            allPosts.push({
              id: doc.id,
              postId: doc.id,
              spaceId,
              spaceName: spaceData?.name || 'Unknown Space',
              spaceHandle: spaceData?.handle,
              type: data.type || 'discussion',
              content: data.content || '',
              title: data.title,
              images: data.images || [],
              author: {
                id: data.authorId || '',
                name: data.authorName || 'Anonymous',
                avatar: data.authorAvatar,
                role: data.authorRole
              },
              timestamp: data.createdAt?.toDate?.() || new Date(),
              engagement: {
                likes: data.reactions?.heart || 0,
                comments: data.commentCount || 0,
                shares: data.shareCount || 0,
                views: data.viewCount || 0
              },
              reactions: data.reactions ? Object.entries(data.reactions).map(([emoji, count]) => ({
                emoji,
                count: count as number,
                userReacted: data.reactedUsers?.[emoji]?.includes(user.uid) || false
              })) : [],
              isPinned: data.isPinned || false,
              coordinationData: data.coordinationData,
              pollData: data.pollData
            });
          }
          
          setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
        } else {
          // Fetch posts from each space the user is in
          for (const spaceId of userSpaces.slice(0, 5)) { // Limit to 5 spaces for performance
            const postsRef = collection(db, 'spaces', spaceId, 'posts');
            const postsQuery = query(
              postsRef,
              orderBy('createdAt', 'desc'),
              limit(Math.ceil(PAGE_SIZE / Math.min(userSpaces.length, 5)))
            );
            
            const snapshot = await getDocs(postsQuery);
            
            // Get space info
            const spaceDoc = await getDocs(query(collection(db, 'spaces'), where('__name__', '==', spaceId)));
            const spaceData = spaceDoc.docs[0]?.data();
            
            snapshot.forEach(doc => {
              const data = doc.data();
              allPosts.push({
                id: `${spaceId}_${doc.id}`,
                postId: doc.id,
                spaceId,
                spaceName: spaceData?.name || 'Unknown Space',
                spaceHandle: spaceData?.handle,
                type: data.type || 'discussion',
                content: data.content || '',
                title: data.title,
                images: data.images || [],
                author: {
                  id: data.authorId || '',
                  name: data.authorName || 'Anonymous',
                  avatar: data.authorAvatar,
                  role: data.authorRole
                },
                timestamp: data.createdAt?.toDate?.() || new Date(),
                engagement: {
                  likes: data.reactions?.heart || 0,
                  comments: data.commentCount || 0,
                  shares: data.shareCount || 0,
                  views: data.viewCount || 0
                },
                reactions: data.reactions ? Object.entries(data.reactions).map(([emoji, count]) => ({
                  emoji,
                  count: count as number,
                  userReacted: data.reactedUsers?.[emoji]?.includes(user.uid) || false
                })) : [],
                isPinned: data.isPinned || false,
                coordinationData: data.coordinationData,
                pollData: data.pollData
              });
            });
          }
        }
      } else if (feedType === 'trending') {
        // Get trending posts based on engagement
        const oneDayAgo = new Date();
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        
        const postsQuery = query(
          collectionGroup(db, 'posts'),
          where('createdAt', '>=', Timestamp.fromDate(oneDayAgo)),
          orderBy('createdAt', 'desc'),
          limit(PAGE_SIZE)
        );
        
        const snapshot = await getDocs(postsQuery);
        
        for (const doc of snapshot.docs) {
          const data = doc.data();
          const spaceId = doc.ref.parent.parent?.id || '';
          
          // Get space info
          const spaceDoc = await getDocs(query(collection(db, 'spaces'), where('__name__', '==', spaceId)));
          const spaceData = spaceDoc.docs[0]?.data();
          
          const engagementScore = (data.reactions?.heart || 0) * 2 + 
                                 (data.commentCount || 0) * 3 + 
                                 (data.shareCount || 0) * 4;
          
          allPosts.push({
            id: doc.id,
            postId: doc.id,
            spaceId,
            spaceName: spaceData?.name || 'Unknown Space',
            spaceHandle: spaceData?.handle,
            type: data.type || 'discussion',
            content: data.content || '',
            title: data.title,
            images: data.images || [],
            author: {
              id: data.authorId || '',
              name: data.authorName || 'Anonymous',
              avatar: data.authorAvatar,
              role: data.authorRole
            },
            timestamp: data.createdAt?.toDate?.() || new Date(),
            engagement: {
              likes: data.reactions?.heart || 0,
              comments: data.commentCount || 0,
              shares: data.shareCount || 0,
              views: data.viewCount || 0
            },
            reactions: data.reactions ? Object.entries(data.reactions).map(([emoji, count]) => ({
              emoji,
              count: count as number,
              userReacted: data.reactedUsers?.[emoji]?.includes(user.uid) || false
            })) : [],
            isPinned: data.isPinned || false,
            coordinationData: data.coordinationData,
            pollData: data.pollData
          });
        }
        
        // Sort by engagement score
        allPosts.sort((a, b) => {
          const scoreA = a.engagement.likes * 2 + a.engagement.comments * 3 + a.engagement.shares * 4;
          const scoreB = b.engagement.likes * 2 + b.engagement.comments * 3 + b.engagement.shares * 4;
          return scoreB - scoreA;
        });
      } else if (feedType === 'following') {
        // Get posts from users the current user follows
        // For now, just show recent posts from all spaces
        const postsQuery = query(
          collectionGroup(db, 'posts'),
          orderBy('createdAt', 'desc'),
          limit(PAGE_SIZE)
        );
        
        const snapshot = await getDocs(postsQuery);
        
        for (const doc of snapshot.docs) {
          const data = doc.data();
          const spaceId = doc.ref.parent.parent?.id || '';
          
          // Get space info
          const spaceDoc = await getDocs(query(collection(db, 'spaces'), where('__name__', '==', spaceId)));
          const spaceData = spaceDoc.docs[0]?.data();
          
          allPosts.push({
            id: doc.id,
            postId: doc.id,
            spaceId,
            spaceName: spaceData?.name || 'Unknown Space',
            spaceHandle: spaceData?.handle,
            type: data.type || 'discussion',
            content: data.content || '',
            title: data.title,
            images: data.images || [],
            author: {
              id: data.authorId || '',
              name: data.authorName || 'Anonymous',
              avatar: data.authorAvatar,
              role: data.authorRole
            },
            timestamp: data.createdAt?.toDate?.() || new Date(),
            engagement: {
              likes: data.reactions?.heart || 0,
              comments: data.commentCount || 0,
              shares: data.shareCount || 0,
              views: data.viewCount || 0
            },
            reactions: data.reactions ? Object.entries(data.reactions).map(([emoji, count]) => ({
              emoji,
              count: count as number,
              userReacted: data.reactedUsers?.[emoji]?.includes(user.uid) || false
            })) : [],
            isPinned: data.isPinned || false,
            coordinationData: data.coordinationData,
            pollData: data.pollData
          });
        }
      }

      // Sort posts by timestamp (most recent first)
      allPosts.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
      
      // Apply personalization algorithm for "For You" feed
      if (feedType === 'for-you' && allPosts.length > 0) {
        // Boost posts that are:
        // 1. From spaces user is active in
        // 2. Coordination posts (study sessions, food runs)
        // 3. Recent (within last 24 hours)
        // 4. High engagement
        
        const now = Date.now();
        const dayInMs = 24 * 60 * 60 * 1000;
        
        allPosts = allPosts.map(post => {
          let score = 0;
          
          // Recency boost (exponential decay)
          const age = now - post.timestamp.getTime();
          score += Math.max(0, 100 * Math.exp(-age / dayInMs));
          
          // Coordination boost
          if (['study_session', 'food_run', 'ride_share', 'meetup'].includes(post.type)) {
            score += 50;
          }
          
          // Engagement boost
          score += post.engagement.likes * 2;
          score += post.engagement.comments * 3;
          score += post.engagement.shares * 5;
          
          // Pinned boost
          if (post.isPinned) {
            score += 100;
          }
          
          return { ...post, score };
        }).sort((a: any, b: any) => b.score - a.score);
      }
      
      setPosts(reset ? allPosts : [...posts, ...allPosts]);
      setHasMore(allPosts.length === PAGE_SIZE);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching feed:', err);
      setError(err as Error);
      setLoading(false);
    }
  };

  // Load more posts
  const loadMore = useCallback(async () => {
    if (!hasMore || loading) return;
    await fetchPosts(false);
  }, [hasMore, loading, lastDoc]);

  // Refresh feed
  const refresh = useCallback(async () => {
    await fetchPosts(true);
  }, [user?.uid, feedType]);

  // Initial load and when feed type changes
  useEffect(() => {
    fetchPosts(true);
  }, [user?.uid, feedType]);

  // Set up real-time listener for new posts
  useEffect(() => {
    if (!user?.uid) return;

    const getUserSpacesAsync = async () => {
      const spaces = await getUserSpaces();
      if (spaces.length === 0) return;

      // Listen to the most active space for real-time updates
      const mostActiveSpace = spaces[0];
      const postsRef = collection(db, 'spaces', mostActiveSpace, 'posts');
      const q = query(postsRef, orderBy('createdAt', 'desc'), limit(1));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added' && change.doc.data().createdAt) {
            // Refresh feed when new post is added
            fetchPosts(true);
          }
        });
      });

      return () => unsubscribe();
    };

    getUserSpacesAsync();
  }, [user?.uid]);

  return {
    posts,
    loading,
    error,
    hasMore,
    loadMore,
    refresh,
    feedType,
    setFeedType
  };
}