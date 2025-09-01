import { useState, useEffect, useCallback, useRef } from 'react';
import { realtimeService, PresenceData } from '@/lib/firebase-realtime';
import { logger } from '@/lib/logger';

interface UseRealtimePresenceOptions {
  spaceId?: string;
  userId: string;
  enabled?: boolean;
  onError?: (error: Error) => void;
  onPresenceChange?: (presence: Record<string, PresenceData>) => void;
}

interface UseRealtimePresenceReturn {
  presence: Record<string, PresenceData>;
  onlineUsers: PresenceData[];
  isLoading: boolean;
  isConnected: boolean;
  error: Error | null;
  updateMyPresence: (status: 'online' | 'offline' | 'away', activity?: string) => Promise<void>;
  reconnect: () => void;
}

export function useRealtimePresence(options: UseRealtimePresenceOptions): UseRealtimePresenceReturn {
  const { spaceId, userId, enabled = true, onError, onPresenceChange } = options;
  
  const [presence, setPresence] = useState<Record<string, PresenceData>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const cleanupRef = useRef<(() => void) | null>(null);
  const heartbeatRef = useRef<NodeJS.Timeout | null>(null);

  // Set up presence listener for a specific space
  useEffect(() => {
    if (!enabled || !spaceId || !realtimeService?.isAvailable()) {
      setIsLoading(false);
      setIsConnected(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Listen to presence updates for the space
      const unsubscribe = realtimeService.listenToPresence(spaceId, (newPresence) => {
        setPresence(newPresence);
        setIsLoading(false);
        setIsConnected(true);
        
        if (onPresenceChange) {
          onPresenceChange(newPresence);
        }
      });

      cleanupRef.current = unsubscribe;
      logger.info('Realtime presence listener established', { spaceId });

    } catch (err) {
      const error = err as Error;
      setError(error);
      setIsLoading(false);
      setIsConnected(false);
      onError?.(error);
      logger.error('Failed to establish presence listener', { error, spaceId });
    }

    // Cleanup on unmount or dependency change
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [spaceId, enabled, onError, onPresenceChange]);

  // Set up heartbeat to maintain presence
  useEffect(() => {
    if (!enabled || !userId || !realtimeService?.isAvailable()) {
      return;
    }

    // Update presence every 30 seconds to maintain online status
    const updateHeartbeat = async () => {
      try {
        await realtimeService.updatePresence(userId, {
          status: 'online',
          currentSpace: spaceId,
          activity: 'active',
          metadata: {
            platform: 'web',
            version: '1.0.0'
          }
        });
      } catch (err) {
        logger.error('Failed to update presence heartbeat', { error: err, userId });
      }
    };

    // Initial presence update
    updateHeartbeat();

    // Set up heartbeat interval
    heartbeatRef.current = setInterval(updateHeartbeat, 30000); // 30 seconds

    // Cleanup heartbeat on unmount
    return () => {
      if (heartbeatRef.current) {
        clearInterval(heartbeatRef.current);
        heartbeatRef.current = null;
      }
    };
  }, [userId, spaceId, enabled]);

  // Handle page visibility changes to update presence status
  useEffect(() => {
    if (!enabled || !userId || !realtimeService?.isAvailable()) {
      return;
    }

    const handleVisibilityChange = async () => {
      const status = document.hidden ? 'away' : 'online';
      
      try {
        await realtimeService.updatePresence(userId, {
          status,
          currentSpace: spaceId,
          activity: document.hidden ? 'idle' : 'active'
        });
      } catch (err) {
        logger.error('Failed to update presence on visibility change', { error: err, userId });
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [userId, spaceId, enabled]);

  // Handle window beforeunload to set offline status
  useEffect(() => {
    if (!enabled || !userId || !realtimeService?.isAvailable()) {
      return;
    }

    const handleBeforeUnload = async () => {
      try {
        await realtimeService.updatePresence(userId, {
          status: 'offline',
          currentSpace: undefined,
          activity: 'offline'
        });
      } catch (err) {
        // Ignore errors on page unload
        logger.warn('Failed to update presence on page unload', { error: err, userId });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [userId, enabled]);

  // Update my presence function
  const updateMyPresence = useCallback(async (
    status: 'online' | 'offline' | 'away', 
    activity?: string
  ): Promise<void> => {
    if (!realtimeService?.isAvailable() || !userId) {
      return;
    }

    try {
      await realtimeService.updatePresence(userId, {
        status,
        currentSpace: status === 'offline' ? undefined : spaceId,
        activity: activity || (status === 'offline' ? 'offline' : 'active'),
        metadata: {
          platform: 'web',
          version: '1.0.0'
        }
      });

      logger.info('Presence updated successfully', { userId, status, spaceId });
    } catch (err) {
      const error = err as Error;
      setError(error);
      onError?.(error);
      logger.error('Failed to update presence', { error, userId, status });
    }
  }, [userId, spaceId, onError]);

  // Reconnect function
  const reconnect = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
    }
    
    setError(null);
    setIsConnected(false);
    setIsLoading(true);
  }, []);

  // Compute online users
  const onlineUsers = Object.values(presence).filter(user => 
    user.status === 'online' || user.status === 'away'
  );

  return {
    presence,
    onlineUsers,
    isLoading,
    isConnected,
    error,
    updateMyPresence,
    reconnect,
  };
}