'use client';

import { useEffect } from 'react';
import { useAppStore } from '@/store/app-store';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase-client';
import { 
  collection, 
  doc, 
  onSnapshot, 
  query, 
  where, 
  orderBy, 
  limit,
  getDocs 
} from 'firebase/firestore';

// Hook to sync auth state
export function useAuthSync() {
  const { setUser, setAuthenticated } = useAppStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Get additional user data from Firestore
        const userDoc = await getDocs(
          query(collection(db, 'users'), where('uid', '==', firebaseUser.uid), limit(1))
        );
        
        const userData = userDoc.docs[0]?.data();
        
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

    const unsubscribe = onSnapshot(spacesQuery, (snapshot) => {
      const spaces = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as any[];
      
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
      const allPosts: any[] = [];
      
      // Fetch posts from each space (limited for performance)
      for (const spaceId of userSpaces.slice(0, 5)) {
        const postsQuery = query(
          collection(db, 'spaces', spaceId, 'posts'),
          orderBy('createdAt', 'desc'),
          limit(10)
        );
        
        const snapshot = await getDocs(postsQuery);
        const posts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          spaceId,
          createdAt: doc.data().createdAt?.toDate() || new Date(),
          updatedAt: doc.data().updatedAt?.toDate() || new Date(),
        }));
        
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

    const unsubscribe = onSnapshot(notificationsQuery, (snapshot) => {
      const notifications = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as any[];
      
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

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      const posts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        spaceId,
        createdAt: doc.data().createdAt?.toDate() || new Date(),
        updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      })) as any[];
      
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