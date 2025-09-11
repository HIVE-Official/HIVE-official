'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/app-store';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, db } from '@/lib/firebase-client';
import { 
  collection, 
  doc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  limit,
  getDocs,
  QuerySnapshot,
  DocumentData,
  Timestamp
} from 'firebase/firestore';

// Type definitions
interface UserData {
  uid?: string;
  displayName?: string;
  photoURL?: string;
  handle?: string;
  role?: 'student' | 'faculty' | 'admin';
  spaces?: string[];
  createdAt?: Timestamp;
}

interface SpaceData {
  name: string;
  description: string;
  type: 'academic' | 'social' | 'dorm' | 'organization' | 'interest';
  memberCount: number;
  isPublic: boolean;
  createdBy: string;
  members?: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

interface PostData {
  content: string;
  authorId: string;
  authorName?: string;
  spaceName?: string;
  type?: 'discussion' | 'coordination' | 'event' | 'announcement' | 'tool_share';
  images?: string[];
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  reactions?: Record<string, number>;
  commentCount?: number;
  isPinned?: boolean;
  metadata?: Record<string, any>;
}

interface NotificationData {
  userId: string;
  type: 'post' | 'comment' | 'reaction' | 'follow' | 'mention' | 'event';
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt?: Timestamp;
}

// Hook to sync auth state
export function useAuthSync() {
  const { setUser, setAuthenticated } = useAppStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        // Get additional user data from Firestore
        const userDoc = await getDocs(
          query(collection(db, 'users'), where('uid', '==', firebaseUser.uid), limit(1))
        );
        
        const userData = userDoc.docs[0]?.data() as UserData | undefined;
        
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
          displayName: firebaseUser.displayName || userData?.displayName || 'Anonymous',
          photoURL: firebaseUser.photoURL || userData?.photoURL,
          handle: userData?.handle,
          role: userData?.role || 'student',
          spaces: userData?.spaces || [],
          createdAt: userData?.createdAt?.toDate() || new Date(),
          lastActiveAt: new Date(),
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [setUser]);
}

// Hook to sync user's spaces
export function useSpacesSync() {
  const { user, setSpaces, setUserSpaces } = useAppStore();

  useEffect(() => {
    if (!user) return;

    // Listen to user's spaces
    const spacesQuery = query(
      collection(db, 'spaces'),
      where('members', 'array-contains', user.id),
      orderBy('updatedAt', 'desc')
    );

    const unsubscribe = onSnapshot(spacesQuery, (snapshot: QuerySnapshot<DocumentData>) => {
      const spaces = snapshot.docs.map(doc => {
        const data = doc.data() as SpaceData;
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        };
      });
      
      setSpaces(spaces);
      setUserSpaces(spaces.map(s => s.id));
    });

    return () => unsubscribe();
  }, [user, setSpaces, setUserSpaces]);
}

// Hook to sync feed posts
export function useFeedSync() {
  const { userSpaces, setFeedPosts } = useAppStore();

  useEffect(() => {
    if (userSpaces.length === 0) return;

    // For now, fetch recent posts from user's spaces
    // In production, this would be optimized with a feed collection
    const fetchFeedPosts = async () => {
      const allPosts: Array<PostData & { id: string; spaceId: string; createdAt: Date; updatedAt: Date }> = [];
      
      // Fetch posts from each space (limited for performance)
      for (const spaceId of userSpaces.slice(0, 5)) {
        const postsQuery = query(
          collection(db, 'spaces', spaceId, 'posts'),
          orderBy('createdAt', 'desc'),
          limit(10)
        );
        
        const snapshot = await getDocs(postsQuery);
        const posts = snapshot.docs.map(doc => {
          const data = doc.data() as PostData;
          return {
            id: doc.id,
            ...data,
            spaceId,
            createdAt: data.createdAt?.toDate() || new Date(),
            updatedAt: data.updatedAt?.toDate() || new Date(),
          };
        });
        
        allPosts.push(...posts);
      }
      
      // Sort by date and set
      allPosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
      setFeedPosts(allPosts);
    };

    fetchFeedPosts();
  }, [userSpaces, setFeedPosts]);
}

// Hook to sync notifications
export function useNotificationsSync() {
  const { user, setNotifications } = useAppStore();

  useEffect(() => {
    if (!user) return;

    const notificationsQuery = query(
      collection(db, 'notifications'),
      where('userId', '==', user.id),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(notificationsQuery, (snapshot: QuerySnapshot<DocumentData>) => {
      const notifications = snapshot.docs.map(doc => {
        const data = doc.data() as NotificationData;
        return {
          id: doc.id,
          ...data,
          createdAt: data.createdAt?.toDate() || new Date(),
        };
      });
      
      setNotifications(notifications);
    });

    return () => unsubscribe();
  }, [user, setNotifications]);
}

// Hook to sync space posts
export function useSpacePostsSync(spaceId: string | null) {
  const { setSpacePosts } = useAppStore();

  useEffect(() => {
    if (!spaceId) return;

    const postsQuery = query(
      collection(db, 'spaces', spaceId, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(postsQuery, (snapshot: QuerySnapshot<DocumentData>) => {
      const posts = snapshot.docs.map(doc => {
        const data = doc.data() as PostData;
        return {
          id: doc.id,
          ...data,
          spaceId,
          createdAt: data.createdAt?.toDate() || new Date(),
          updatedAt: data.updatedAt?.toDate() || new Date(),
        };
      });
      
      setSpacePosts(spaceId, posts);
    });

    return () => unsubscribe();
  }, [spaceId, setSpacePosts]);
}

// Master hook to initialize all syncs
export function useAppStateSync() {
  useAuthSync();
  useSpacesSync();
  useFeedSync();
  useNotificationsSync();
}

// Hook to get current user
export function useCurrentUser() {
  return useAppStore(state => state.user);
}

// Hook to get feed posts
export function useFeedPosts() {
  return useAppStore(state => state.feedPosts);
}

// Hook to get notifications
export function useNotifications() {
  return useAppStore(state => ({
    notifications: state.notifications,
    unreadCount: state.unreadCount,
    markAsRead: state.markAsRead,
    markAllAsRead: state.markAllAsRead,
  }));
}

// Hook to get user's spaces
export function useUserSpaces() {
  return useAppStore(state => state.spaces.filter(s => state.userSpaces.includes(s.id)));
}

// Hook to manage UI state
export function useUIState() {
  return useAppStore(state => ({
    sidebarOpen: state.sidebarOpen,
    setSidebarOpen: state.setSidebarOpen,
    mobileMenuOpen: state.mobileMenuOpen,
    setMobileMenuOpen: state.setMobileMenuOpen,
    theme: state.theme,
    setTheme: state.setTheme,
  }));
}

// Hook for real-time presence
export function usePresence(spaceId?: string) {
  const { activeUsers, typingUsers, setActiveUser, removeActiveUser } = useAppStore();
  const user = useCurrentUser();

  useEffect(() => {
    if (!user) return;

    // Set user as active
    setActiveUser(user.id);

    // Set up heartbeat
    const interval = setInterval(() => {
      setActiveUser(user.id);
    }, 30000); // Every 30 seconds

    // Clean up on unmount
    return () => {
      clearInterval(interval);
      removeActiveUser(user.id);
    };
  }, [user, setActiveUser, removeActiveUser]);

  const activeCount = Object.keys(activeUsers).length;
  const typingInSpace = spaceId ? (typingUsers[spaceId] || []) : [];

  return {
    activeCount,
    activeUsers: Object.values(activeUsers),
    typingUsers: typingInSpace,
  };
}