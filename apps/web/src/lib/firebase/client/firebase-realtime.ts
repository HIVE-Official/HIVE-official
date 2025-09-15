/**
 * Firebase Realtime Database Integration
 * 
 * Provides real-time data synchronization capabilities using Firebase Realtime Database.
 * This module handles live updates, presence detection, and collaborative features.
 */

import { getDatabase, ref, onValue, set, push, onDisconnect, serverTimestamp as rtServerTimestamp } from 'firebase/database';
import { app, auth } from './firebase-client';
import { logger } from '../../utils/structured-logger';

// Initialize Realtime Database
const database = getDatabase(app);

/**
 * Realtime subscription handle
 */
export interface RealtimeSubscription {
  unsubscribe: () => void;
  path: string;
}

/**
 * Presence data structure
 */
export interface PresenceData {
  userId: string;
  status: 'online' | 'away' | 'offline';
  lastSeen: number;
  metadata?: Record<string, any>;
}

/**
 * Firebase Realtime Service
 */
class FirebaseRealtimeService {
  private subscriptions: Map<string, RealtimeSubscription> = new Map();
  private presenceRef: any = null;

  /**
   * Subscribe to realtime updates at a path
   */
  subscribe(
    path: string,
    callback: (data: any) => void,
    onError?: (error: Error) => void
  ): RealtimeSubscription {
    const dbRef = ref(database, path);
    
    const unsubscribe = onValue(
      dbRef,
      (snapshot) => {
        const data = snapshot.val();
        callback(data);
      },
      (error) => {
        logger.error('Realtime subscription error', error, { path });
        onError?.(error);
      }
    );

    const subscription: RealtimeSubscription = {
      unsubscribe,
      path
    };

    // Store subscription
    const subscriptionId = `${path}_${Date.now()}`;
    this.subscriptions.set(subscriptionId, subscription);

    return subscription;
  }

  /**
   * Write data to a path
   */
  async write(path: string, data: any): Promise<void> {
    try {
      const dbRef = ref(database, path);
      await set(dbRef, data);
      logger.debug('Realtime data written', { path });
    } catch (error) {
      logger.error('Failed to write realtime data', error as Error, { path });
      throw error;
    }
  }

  /**
   * Push data to a list
   */
  async push(path: string, data: any): Promise<string> {
    try {
      const dbRef = ref(database, path);
      const newRef = push(dbRef);
      await set(newRef, data);
      logger.debug('Realtime data pushed', { path, key: newRef.key });
      return newRef.key!;
    } catch (error) {
      logger.error('Failed to push realtime data', error as Error, { path });
      throw error;
    }
  }

  /**
   * Set up presence tracking for current user
   */
  async setupPresence(): Promise<void> {
    const user = auth.currentUser;
    if (!user) return;

    const userStatusPath = `presence/${user.uid}`;
    this.presenceRef = ref(database, userStatusPath);

    // Data to set when online
    const isOnlineData: PresenceData = {
      userId: user.uid,
      status: 'online',
      lastSeen: Date.now(),
      metadata: {
        email: user.email,
        displayName: user.displayName
      }
    };

    // Data to set when offline
    const isOfflineData: PresenceData = {
      userId: user.uid,
      status: 'offline',
      lastSeen: Date.now(),
      metadata: {}
    };

    // Set up on disconnect behavior
    await onDisconnect(this.presenceRef).set(isOfflineData);
    
    // Set current status to online
    await set(this.presenceRef, isOnlineData);

    // Listen for connection state
    const connectedRef = ref(database, '.info/connected');
    onValue(connectedRef, (snapshot) => {
      if (snapshot.val() === true) {
        set(this.presenceRef, isOnlineData);
        onDisconnect(this.presenceRef).set(isOfflineData);
      }
    });

    logger.info('Presence tracking initialized', { userId: user.uid });
  }

  /**
   * Update user presence status
   */
  async updatePresenceStatus(status: 'online' | 'away' | 'offline'): Promise<void> {
    const user = auth.currentUser;
    if (!user || !this.presenceRef) return;

    const statusData: PresenceData = {
      userId: user.uid,
      status,
      lastSeen: Date.now(),
      metadata: {
        email: user.email,
        displayName: user.displayName
      }
    };

    await set(this.presenceRef, statusData);
  }

  /**
   * Subscribe to presence updates for multiple users
   */
  subscribeToPresence(
    userIds: string[],
    callback: (presence: Record<string, PresenceData>) => void
  ): RealtimeSubscription {
    const presenceData: Record<string, PresenceData> = {};
    
    const unsubscribes = userIds.map(userId => {
      const userRef = ref(database, `presence/${userId}`);
      return onValue(userRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          presenceData[userId] = data;
        } else {
          presenceData[userId] = {
            userId,
            status: 'offline',
            lastSeen: 0
          };
        }
        callback({ ...presenceData });
      });
    });

    return {
      unsubscribe: () => unsubscribes.forEach(unsub => unsub()),
      path: 'presence/*'
    };
  }

  /**
   * Clean up all subscriptions
   */
  cleanup(): void {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
    this.subscriptions.clear();
    
    if (this.presenceRef) {
      set(this.presenceRef, {
        status: 'offline',
        lastSeen: Date.now()
      });
    }
  }

  /**
   * Get server timestamp
   */
  getServerTimestamp() {
    return rtServerTimestamp();
  }
}

// Create and export singleton instance
export const firebaseRealtime = new FirebaseRealtimeService();

// Export alias for backward compatibility
export const realtimeService = firebaseRealtime;

// Export database reference for direct access if needed
export { database };