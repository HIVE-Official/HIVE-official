/**
 * Real-time Presence System
 * Tracks online/offline status using Firebase
 */

import { useEffect, useState, useRef } from 'react';
import {
  doc,
  setDoc,
  onDisconnect,
  serverTimestamp,
  onSnapshot,
  collection,
  query,
  where,
  getDocs
} from 'firebase/firestore';
import { db } from '@hive/firebase';
import { useAuth } from '@hive/auth-logic';
import { logger } from '@/lib/logger';

interface PresenceData {
  userId: string;
  status: 'online' | 'away' | 'offline';
  lastSeen: Date;
  campusId: string;
  deviceInfo?: {
    browser?: string;
    platform?: string;
  };
}

interface OnlineUser {
  userId: string;
  handle: string;
  name: string;
  avatar?: string;
  status: 'online' | 'away';
  lastSeen: Date;
}

/**
 * Hook to track user's presence status
 */
export function usePresence() {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState(true);
  const presenceRef = useRef<any>(null);

  useEffect(() => {
    if (!user?.uid) return;

    const campusId = 'ub-buffalo';
    const userPresenceRef = doc(db, 'presence', user.uid);

    // Function to update presence
    const updatePresence = async (status: 'online' | 'away' | 'offline') => {
      try {
        await setDoc(userPresenceRef, {
          userId: user.uid,
          status,
          lastSeen: serverTimestamp(),
          campusId,
          deviceInfo: {
            browser: navigator.userAgent,
            platform: navigator.platform
          }
        }, { merge: true });
      } catch (error) {
        logger.error('Failed to update presence', { error: error instanceof Error ? error : new Error(String(error)) });
      }
    };

    // Set user as online
    updatePresence('online');
    setIsOnline(true);

    // Handle page visibility change (tab switching)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        updatePresence('away');
      } else {
        updatePresence('online');
      }
    };

    // Handle online/offline events
    const handleOnline = () => {
      setIsOnline(true);
      updatePresence('online');
    };

    const handleOffline = () => {
      setIsOnline(false);
      updatePresence('offline');
    };

    // Set up Firebase onDisconnect hook
    const setupDisconnectHandler = async () => {
      try {
        // This will automatically set status to offline when connection is lost
        await onDisconnect(userPresenceRef).set({
          userId: user.uid,
          status: 'offline',
          lastSeen: serverTimestamp(),
          campusId
        });
      } catch (error) {
        logger.error('Failed to setup disconnect handler', { error: error instanceof Error ? error : new Error(String(error)) });
      }
    };

    setupDisconnectHandler();

    // Add event listeners
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Send heartbeat every 30 seconds to keep alive
    const heartbeatInterval = setInterval(() => {
      if (!document.hidden && navigator.onLine) {
        updatePresence('online');
      }
    }, 30000);

    // Cleanup
    return () => {
      updatePresence('offline');
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(heartbeatInterval);
    };
  }, [user?.uid]);

  return { isOnline };
}

/**
 * Hook to get online users in a space or campus
 */
export function useOnlineUsers(spaceId?: string) {
  const [onlineUsers, setOnlineUsers] = useState<OnlineUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const campusId = 'ub-buffalo';
    const constraints = [
      where('campusId', '==', campusId),
      where('status', 'in', ['online', 'away'])
    ];

    if (spaceId) {
      // For space-specific presence, we'd need to track that separately
      // For now, just get campus-wide presence
    }

    const presenceRef = collection(db, 'presence');
    const q = query(presenceRef, ...constraints);

    // Subscribe to online users
    const unsubscribe = onSnapshot(
      q,
      async (snapshot) => {
        const users: OnlineUser[] = [];

        // Get user details for each online presence
        const userPromises = snapshot.docs.map(async (doc) => {
          const presence = doc.data() as PresenceData;

          // Fetch user profile (would be better to cache this)
          try {
            const userDoc = await getDocs(
              query(
                collection(db, 'users'),
                where('__name__', '==', presence.userId)
              )
            );

            if (!userDoc.empty) {
              const userData = userDoc.docs[0].data();
              users.push({
                userId: presence.userId,
                handle: userData.handle || 'unknown',
                name: userData.name || 'Anonymous',
                avatar: userData.avatar,
                status: presence.status as 'online' | 'away',
                lastSeen: presence.lastSeen instanceof Date
                  ? presence.lastSeen
                  : new Date()
              });
            }
          } catch (error) {
            logger.error('Failed to fetch user data', { error: error instanceof Error ? error : new Error(String(error)), userId: presence.userId });
          }
        });

        await Promise.all(userPromises);

        setOnlineUsers(users);
        setLoading(false);
      },
      (error) => {
        logger.error('Failed to subscribe to online users', { error: error instanceof Error ? error : new Error(String(error)) });
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [spaceId]);

  return { onlineUsers, loading };
}

/**
 * Hook to track typing indicators in a space/chat
 */
export function useTypingIndicator(contextId: string) {
  const { user } = useAuth();
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (!contextId) return;

    const typingRef = collection(db, 'typing', contextId, 'users');

    // Subscribe to typing indicators
    const unsubscribe = onSnapshot(typingRef, (snapshot) => {
      const typing: string[] = [];
      const now = Date.now();

      snapshot.forEach((doc) => {
        const data = doc.data();
        // Only show if typed within last 3 seconds
        if (data.timestamp && (now - data.timestamp.toMillis()) < 3000) {
          if (doc.id !== user?.uid) {
            typing.push(doc.id);
          }
        }
      });

      setTypingUsers(typing);
    });

    return () => unsubscribe();
  }, [contextId, user?.uid]);

  // Function to indicate current user is typing
  const setTyping = async (isTyping: boolean) => {
    if (!user?.uid || !contextId) return;

    const typingRef = doc(db, 'typing', contextId, 'users', user.uid);

    if (isTyping) {
      // Clear existing timeout
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      // Set typing indicator
      await setDoc(typingRef, {
        timestamp: serverTimestamp(),
        userId: user.uid
      });

      // Auto-clear after 3 seconds
      typingTimeoutRef.current = setTimeout(() => {
        setTyping(false);
      }, 3000);
    } else {
      // Clear typing indicator
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }

      await setDoc(typingRef, {
        timestamp: null,
        userId: user.uid
      });
    }
  };

  return { typingUsers, setTyping };
}

/**
 * Get user's current online status
 */
export function useUserStatus(userId: string) {
  const [status, setStatus] = useState<'online' | 'away' | 'offline'>('offline');
  const [lastSeen, setLastSeen] = useState<Date | null>(null);

  useEffect(() => {
    if (!userId) return;

    const presenceRef = doc(db, 'presence', userId);

    const unsubscribe = onSnapshot(
      presenceRef,
      (doc) => {
        if (doc.exists()) {
          const data = doc.data() as PresenceData;
          setStatus(data.status);
          setLastSeen(data.lastSeen instanceof Date ? data.lastSeen : new Date());
        } else {
          setStatus('offline');
          setLastSeen(null);
        }
      },
      (error) => {
        logger.error('Failed to get user status', { error: error instanceof Error ? error : new Error(String(error)), userId });
        setStatus('offline');
      }
    );

    return () => unsubscribe();
  }, [userId]);

  return { status, lastSeen };
}