"use client";

import { useEffect, useState } from 'react';
import { 
  doc, 
  setDoc, 
  onSnapshot, 
  collection, 
  query, 
  where, 
  serverTimestamp, 
  deleteDoc,
  QuerySnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useUnifiedAuth } from '@hive/ui';

interface ActiveUser {
  userId: string;
  lastSeen: Date;
  currentPage?: string;
  spaceId?: string;
}

/**
 * Hook to track and retrieve active users
 * Updates user's presence in Firebase and returns count of active users
 */
export function useActiveUsers(spaceId?: string) {
  const { user } = useUnifiedAuth();
  const [activeCount, setActiveCount] = useState(0);
  const [activeUsers, setActiveUsers] = useState<ActiveUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Update current user's presence
  useEffect(() => {
    if (!user?.id) return;

    const presenceRef = doc(db, 'presence', user.id);
    const updatePresence = async () => {
      try {
        await setDoc(presenceRef, {
          userId: user.id,
          lastSeen: serverTimestamp(),
          currentPage: window.location.pathname,
          spaceId: spaceId || null,
          isOnline: true
        }, { merge: true });
      } catch (error) {
        console.error('Failed to update presence:', error);
      }
    };

    // Initial presence update
    updatePresence();

    // Update presence every 30 seconds
    const interval = setInterval(updatePresence, 30000);

    // Set offline on page unload
    const handleUnload = () => {
      navigator.sendBeacon('/api/presence/offline', JSON.stringify({ userId: user.id }));
    };

    window.addEventListener('beforeunload', handleUnload);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        setDoc(presenceRef, { isOnline: false, lastSeen: serverTimestamp() }, { merge: true });
      } else {
        updatePresence();
      }
    });

    return () => {
      clearInterval(interval);
      window.removeEventListener('beforeunload', handleUnload);
      // Mark as offline when component unmounts
      setDoc(presenceRef, { isOnline: false, lastSeen: serverTimestamp() }, { merge: true });
    };
  }, [user?.id, spaceId]);

  // Listen for active users
  useEffect(() => {
    setIsLoading(true);
    
    // Consider users active if seen in last 2 minutes
    const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
    
    let q;
    if (spaceId) {
      // Get active users in specific space
      q = query(
        collection(db, 'presence'),
        where('spaceId', '==', spaceId),
        where('isOnline', '==', true)
      );
    } else {
      // Get all active users on platform
      q = query(
        collection(db, 'presence'),
        where('isOnline', '==', true)
      );
    }

    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      const users: ActiveUser[] = [];
      const now = new Date();
      
      snapshot.forEach((doc) => {
        const data = doc.data();
        const lastSeen = data.lastSeen?.toDate() || new Date();
        
        // Only count if seen in last 2 minutes
        if (now.getTime() - lastSeen.getTime() < 2 * 60 * 1000) {
          users.push({
            userId: data.userId,
            lastSeen,
            currentPage: data.currentPage,
            spaceId: data.spaceId
          });
        }
      });

      setActiveUsers(users);
      setActiveCount(users.length);
      setIsLoading(false);
    }, (error: any) => {
      console.error('Failed to fetch active users:', error);
      setIsLoading(false);
      // Fallback to at least counting current user
      setActiveCount(user ? 1 : 0);
    });

    return () => unsubscribe();
  }, [spaceId, user]);

  return {
    activeCount,
    activeUsers,
    isLoading,
    // Helper to check if specific user is active
    isUserActive: (userId: string) => activeUsers.some(u => u.userId === userId)
  };
}

/**
 * Hook to get active users count for multiple spaces
 */
export function useSpacesActiveUsers(spaceIds: string[]) {
  const [spaceCounts, setSpaceCounts] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!spaceIds.length) {
      setSpaceCounts({});
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const counts: Record<string, number> = {};
    
    // Query presence for all spaces
    const q = query(
      collection(db, 'presence'),
      where('spaceId', 'in', spaceIds),
      where('isOnline', '==', true)
    );

    const unsubscribe = onSnapshot(q, (snapshot: QuerySnapshot<DocumentData>) => {
      // Reset counts
      spaceIds.forEach(id => counts[id] = 0);
      
      const now = new Date();
      snapshot.forEach((doc) => {
        const data = doc.data();
        const lastSeen = data.lastSeen?.toDate() || new Date();
        
        // Only count if seen in last 2 minutes
        if (now.getTime() - lastSeen.getTime() < 2 * 60 * 1000 && data.spaceId) {
          counts[data.spaceId] = (counts[data.spaceId] || 0) + 1;
        }
      });

      setSpaceCounts(counts);
      setIsLoading(false);
    }, (error: any) => {
      console.error('Failed to fetch space active users:', error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [JSON.stringify(spaceIds)]);

  return { spaceCounts, isLoading };
}