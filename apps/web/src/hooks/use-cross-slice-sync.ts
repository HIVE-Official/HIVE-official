import { useEffect, useState, useCallback, useRef } from 'react';
import { logger } from '@/lib/logger';

import { crossSliceSync, CrossSliceEvent, CrossSliceEventData, SliceUpdateHandler } from '@/lib/cross-slice-sync';
import { useSession } from './use-session';

/**
 * Hook for subscribing to cross-slice synchronization events
 */
export function useCrossSliceSync(
  sliceName: 'profile' | 'spaces' | 'feed' | 'tools',
  eventTypes: CrossSliceEvent[],
  onEvent?: (event: CrossSliceEventData) => void
) {
  const { session } = useSession();
  const [isInitialized, setIsInitialized] = useState(false);
  const [lastEvent, setLastEvent] = useState<CrossSliceEventData | null>(null);
  const handlersRef = useRef<SliceUpdateHandler[]>([]);

  // Event handler that updates local state
  const handleCrossSliceEvent = useCallback(async (event: CrossSliceEventData) => {
    setLastEvent(event);
    onEvent?.(event);
  }, [onEvent]);

  // Initialize sync service when session is available
  useEffect(() => {
    if (session?.user && !isInitialized) {
      // Fetch user's spaces from Profile API
      const initializeSync = async () => {
        try {
          const response = await fetch('/api/profile/my-spaces');
          if (response.ok) {
            const data = await response.json();
            const userSpaces = data.spaces?.joined?.map((space: any) => space.spaceId) || [];
            crossSliceSync.initialize(session.user.uid, userSpaces);
          } else {
            // Fallback: initialize with empty array
            crossSliceSync.initialize(session.user.uid, []);
          }
        } catch (error) {
          logger.error('Failed to fetch user spaces for sync initialization:', { error: String(error) });
          crossSliceSync.initialize(session.user.uid, []);
        }
        setIsInitialized(true);
      };
      
      initializeSync();
    }

    return () => {
      if (isInitialized) {
        crossSliceSync.unregisterSliceHandlers(sliceName);
      }
    };
  }, [session, isInitialized, sliceName]);

  // Register handlers for specified event types
  useEffect(() => {
    if (!isInitialized) return;

    // Clear existing handlers for this slice
    crossSliceSync.unregisterSliceHandlers(sliceName);
    handlersRef.current = [];

    // Register new handlers
    eventTypes.forEach(eventType => {
      const handler: SliceUpdateHandler = {
        sliceName,
        updateFunction: handleCrossSliceEvent
      };

      crossSliceSync.registerHandler(eventType, handler);
      handlersRef.current.push(handler);
    });

    return () => {
      crossSliceSync.unregisterSliceHandlers(sliceName);
    };
  }, [isInitialized, sliceName, eventTypes, handleCrossSliceEvent]);

  // Broadcast event helper
  const broadcastEvent = useCallback(async (eventData: Omit<CrossSliceEventData, 'userId' | 'timestamp'>) => {
    if (!session?.user) return;

    await crossSliceSync.broadcastEvent({
      ...eventData,
      userId: session.user.uid,
      timestamp: Date.now()
    });
  }, [session]);

  return {
    isInitialized,
    lastEvent,
    broadcastEvent,
    syncStatus: isInitialized ? crossSliceSync.getSyncStatus() : null
  };
}

/**
 * Hook specifically for Profile slice synchronization
 */
export function useProfileSync() {
  const [profileStats, setProfileStats] = useState({
    activeSpaces: 0,
    toolsBuilt: 0,
    recentActivity: 0,
    campusReputation: 0
  });

  const [recentActivity, setRecentActivity] = useState<CrossSliceEventData[]>([]);

  const handleProfileEvent = useCallback((event: CrossSliceEventData) => {
    // Update profile stats based on event type
    switch (event.type) {
      case 'space_joined':
        setProfileStats(prev => ({ ...prev, activeSpaces: prev.activeSpaces + 1 }));
        break;
      case 'space_left':
        setProfileStats(prev => ({ ...prev, activeSpaces: Math.max(0, prev.activeSpaces - 1) }));
        break;
      case 'tool_created':
        setProfileStats(prev => ({ ...prev, toolsBuilt: prev.toolsBuilt + 1 }));
        break;
      case 'post_created':
      case 'post_liked':
      case 'tool_used':
        setProfileStats(prev => ({ ...prev, recentActivity: prev.recentActivity + 1 }));
        break;
    }

    // Add to recent activity (keep last 10)
    setRecentActivity(prev => [event, ...prev].slice(0, 10));
  }, []);

  const { isInitialized, broadcastEvent } = useCrossSliceSync(
    'profile',
    [
      'space_joined', 'space_left', 'space_activated',
      'tool_created', 'tool_deployed', 'tool_used',
      'post_created', 'post_liked', 'post_commented',
      'profile_updated', 'campus_reputation_updated'
    ],
    handleProfileEvent
  );

  // Helper functions for common profile actions
  const updateSpaceMembership = useCallback(async (spaceId: string, spaceName: string, action: 'joined' | 'left') => {
    await broadcastEvent({
      type: action === 'joined' ? 'space_joined' : 'space_left',
      spaceId,
      spaceName
    });
  }, [broadcastEvent]);

  const announceToolCreation = useCallback(async (toolData: {
    toolId: string;
    toolName: string;
    toolCategory: string;
    spaceId?: string;
    spaceName?: string;
  }) => {
    await broadcastEvent({
      type: 'tool_created',
      toolId: toolData.toolId,
      toolName: toolData.toolName,
      toolCategory: toolData.toolCategory,
      spaceId: toolData.spaceId,
      spaceName: toolData.spaceName
    });
  }, [broadcastEvent]);

  const updatePresence = useCallback(async (currentSpace?: string, activity?: string) => {
    await crossSliceSync.handlePresenceChange(
      crossSliceSync.getSyncStatus()?.userId || '',
      {
        status: 'online',
        currentSpace,
        activity
      }
    );
  }, []);

  return {
    isInitialized,
    profileStats,
    recentActivity,
    updateSpaceMembership,
    announceToolCreation,
    updatePresence,
    broadcastEvent
  };
}

/**
 * Hook specifically for Spaces slice synchronization
 */
export function useSpacesSync() {
  const [spaceUpdates, setSpaceUpdates] = useState<Map<string, CrossSliceEventData[]>>(new Map());
  const [membershipChanges, setMembershipChanges] = useState<CrossSliceEventData[]>([]);

  const handleSpaceEvent = useCallback((event: CrossSliceEventData) => {
    if (!event.spaceId) return;

    // Track space-specific updates
    setSpaceUpdates(prev => {
      const spaceEvents = prev.get(event.spaceId!) || [];
      const updated = new Map(prev);
      updated.set(event.spaceId!, [event, ...spaceEvents].slice(0, 5)); // Keep last 5 events per space
      return updated;
    });

    // Track membership changes
    if (['space_joined', 'space_left', 'space_member_joined'].includes(event.type)) {
      setMembershipChanges(prev => [event, ...prev].slice(0, 20));
    }
  }, []);

  const { isInitialized, broadcastEvent } = useCrossSliceSync(
    'spaces',
    [
      'space_joined', 'space_left', 'space_activated', 'space_member_joined',
      'space_post_created', 'tool_deployed', 'tool_used',
      'event_created', 'event_rsvp'
    ],
    handleSpaceEvent
  );

  // Helper functions for space actions
  const announceSpaceActivation = useCallback(async (spaceId: string, spaceName: string, spaceCategory: string) => {
    await broadcastEvent({
      type: 'space_activated',
      spaceId,
      spaceName,
      spaceCategory
    });
  }, [broadcastEvent]);

  const announceMemberJoined = useCallback(async (spaceId: string, spaceName: string, newMemberCount: number) => {
    await broadcastEvent({
      type: 'space_member_joined',
      spaceId,
      spaceName,
      stats: { members: newMemberCount }
    });
  }, [broadcastEvent]);

  const announceToolDeployment = useCallback(async (toolData: {
    toolId: string;
    toolName: string;
    spaceId: string;
    spaceName: string;
  }) => {
    await broadcastEvent({
      type: 'tool_deployed',
      toolId: toolData.toolId,
      toolName: toolData.toolName,
      spaceId: toolData.spaceId,
      spaceName: toolData.spaceName
    });
  }, [broadcastEvent]);

  return {
    isInitialized,
    spaceUpdates,
    membershipChanges,
    announceSpaceActivation,
    announceMemberJoined,
    announceToolDeployment,
    broadcastEvent
  };
}

/**
 * Hook specifically for Tools slice synchronization
 */
export function useToolsSync() {
  const [toolUpdates, setToolUpdates] = useState<Map<string, CrossSliceEventData[]>>(new Map());
  const [usageStats, setUsageStats] = useState<Map<string, { views: number; submissions: number }>>(new Map());

  const handleToolEvent = useCallback((event: CrossSliceEventData) => {
    if (!event.toolId) return;

    // Track tool-specific updates
    setToolUpdates(prev => {
      const toolEvents = prev.get(event.toolId!) || [];
      const updated = new Map(prev);
      updated.set(event.toolId!, [event, ...toolEvents].slice(0, 10));
      return updated;
    });

    // Update usage stats
    if (event.type === 'tool_used' && event.stats) {
      setUsageStats(prev => {
        const updated = new Map(prev);
        updated.set(event.toolId!, {
          views: event.stats?.views || 0,
          submissions: event.stats?.submissions || 0
        });
        return updated;
      });
    }
  }, []);

  const { isInitialized, broadcastEvent } = useCrossSliceSync(
    'tools',
    [
      'tool_created', 'tool_deployed', 'tool_used', 'tool_shared',
      'tool_submission_received'
    ],
    handleToolEvent
  );

  // Helper functions for tool actions
  const announceToolUsage = useCallback(async (toolData: {
    toolId: string;
    toolName: string;
    spaceId?: string;
    stats: { views: number; submissions: number };
  }) => {
    await broadcastEvent({
      type: 'tool_used',
      toolId: toolData.toolId,
      toolName: toolData.toolName,
      spaceId: toolData.spaceId,
      stats: toolData.stats
    });
  }, [broadcastEvent]);

  const announceToolSharing = useCallback(async (toolId: string, toolName: string, targetUsers: string[]) => {
    await broadcastEvent({
      type: 'tool_shared',
      toolId,
      toolName,
      targetUsers
    });
  }, [broadcastEvent]);

  const announceSubmissionReceived = useCallback(async (toolData: {
    toolId: string;
    toolName: string;
    spaceId?: string;
    submissionCount: number;
  }) => {
    await broadcastEvent({
      type: 'tool_submission_received',
      toolId: toolData.toolId,
      toolName: toolData.toolName,
      spaceId: toolData.spaceId,
      stats: { submissions: toolData.submissionCount }
    });
  }, [broadcastEvent]);

  return {
    isInitialized,
    toolUpdates,
    usageStats,
    announceToolUsage,
    announceToolSharing,
    announceSubmissionReceived,
    broadcastEvent
  };
}

/**
 * Hook specifically for Feed slice synchronization
 */
export function useFeedSync() {
  const [feedUpdates, setFeedUpdates] = useState<CrossSliceEventData[]>([]);
  const [socialActivity, setSocialActivity] = useState<CrossSliceEventData[]>([]);

  const handleFeedEvent = useCallback((event: CrossSliceEventData) => {
    // Add all events to feed updates
    setFeedUpdates(prev => [event, ...prev].slice(0, 50)); // Keep last 50 updates

    // Track social-specific activity
    if (['post_created', 'post_liked', 'post_commented', 'space_joined', 'tool_shared'].includes(event.type)) {
      setSocialActivity(prev => [event, ...prev].slice(0, 20));
    }
  }, []);

  const { isInitialized, broadcastEvent } = useCrossSliceSync(
    'feed',
    [
      'space_joined', 'space_activated', 'tool_created', 'tool_shared',
      'post_created', 'post_liked', 'post_commented',
      'event_created', 'event_rsvp', 'collaboration_started'
    ],
    handleFeedEvent
  );

  // Helper functions for feed actions
  const announceSocialActivity = useCallback(async (activityData: {
    type: 'post' | 'like' | 'comment';
    contentId: string;
    contentPreview?: string;
    spaceId?: string;
    targetUserId?: string;
  }) => {
    await crossSliceSync.handleSocialActivity(activityData);
  }, []);

  return {
    isInitialized,
    feedUpdates,
    socialActivity,
    announceSocialActivity,
    broadcastEvent
  };
}

/**
 * Hook for managing real-time notifications
 */
export function useRealtimeNotifications() {
  const [notifications, setNotifications] = useState<CrossSliceEventData[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const handleNotificationEvent = useCallback((event: CrossSliceEventData) => {
    setNotifications(prev => [event, ...prev].slice(0, 100)); // Keep last 100 notifications
    setUnreadCount(prev => prev + 1);
  }, []);

  const { isInitialized } = useCrossSliceSync(
    'profile', // Notifications are part of profile slice
    ['notification_sent', 'space_member_joined', 'tool_submission_received', 'post_commented'],
    handleNotificationEvent
  );

  const markAsRead = useCallback((eventIds?: string[]) => {
    if (eventIds) {
      setNotifications(prev => 
        prev.map(notif => 
          eventIds.includes(notif.contentId || '') 
            ? { ...notif, metadata: { ...notif.metadata, read: true } }
            : notif
        )
      );
      setUnreadCount(prev => Math.max(0, prev - eventIds.length));
    } else {
      // Mark all as read
      setNotifications(prev => 
        prev.map(notif => ({ ...notif, metadata: { ...notif.metadata, read: true } }))
      );
      setUnreadCount(0);
    }
  }, []);

  return {
    isInitialized,
    notifications,
    unreadCount,
    markAsRead
  };
}