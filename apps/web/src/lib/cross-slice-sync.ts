import { realtimeService, RealtimeMessage } from './firebase-realtime';
import { logger } from './logger';

/**
 * Cross-Slice Synchronization Service for HIVE Platform
 * Coordinates real-time updates between Profile, Spaces, Tools, and Feed vertical slices
 */

// Cross-slice event types
export type CrossSliceEvent = 
  // Space-related events
  | 'space_joined'
  | 'space_left'
  | 'space_activated'
  | 'space_member_joined'
  | 'space_role_changed'
  | 'space_post_created'
  
  // Tool-related events  
  | 'tool_created'
  | 'tool_deployed'
  | 'tool_used'
  | 'tool_shared'
  | 'tool_submission_received'
  
  // Feed-related events
  | 'post_created'
  | 'post_liked'
  | 'post_commented'
  | 'activity_shared'
  
  // Profile-related events
  | 'profile_updated'
  | 'user_presence_changed'
  | 'campus_reputation_updated'
  
  // Social coordination events
  | 'event_created'
  | 'event_rsvp'
  | 'collaboration_started'
  | 'notification_sent';

export interface CrossSliceEventData {
  type: CrossSliceEvent;
  userId: string;
  timestamp: number;
  
  // Space context
  spaceId?: string;
  spaceName?: string;
  spaceCategory?: string;
  
  // Tool context  
  toolId?: string;
  toolName?: string;
  toolCategory?: string;
  
  // Content context
  contentId?: string;
  contentType?: string;
  contentPreview?: string;
  
  // Social context
  targetUsers?: string[];
  mentions?: string[];
  collaborators?: string[];
  
  // Metrics context
  stats?: {
    views?: number;
    likes?: number;
    shares?: number;
    submissions?: number;
    members?: number;
  };
  
  // Additional metadata
  metadata?: Record<string, any>;
}

export interface SliceUpdateHandler {
  sliceName: 'profile' | 'spaces' | 'feed' | 'tools';
  updateFunction: (event: CrossSliceEventData) => Promise<void>;
}

export class CrossSliceSyncService {
  private handlers: Map<string, SliceUpdateHandler[]> = new Map();
  private activeListeners: Map<string, () => void> = new Map();
  private userId: string | null = null;
  private userSpaces: string[] = [];

  /**
   * Initialize cross-slice sync for a user
   */
  initialize(userId: string, userSpaces: string[] = []) {
    this.userId = userId;
    this.userSpaces = userSpaces;
    
    // Set up listeners for user's activity channels
    this.setupUserChannels();
    this.setupSpaceChannels(userSpaces);
    
    logger.info('Cross-slice sync initialized', { userId, spacesCount: userSpaces.length });
  }

  /**
   * Register a slice update handler
   */
  registerHandler(eventType: CrossSliceEvent, handler: SliceUpdateHandler) {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, []);
    }
    this.handlers.get(eventType)!.push(handler);
    
    logger.debug('Handler registered', { eventType, slice: handler.sliceName });
  }

  /**
   * Unregister handlers for a specific slice
   */
  unregisterSliceHandlers(sliceName: string) {
    this.handlers.forEach((handlers, eventType) => {
      const filtered = handlers.filter(h => h.sliceName !== sliceName);
      if (filtered.length !== handlers.length) {
        this.handlers.set(eventType, filtered);
        logger.debug('Handlers unregistered', { slice: sliceName, eventType });
      }
    });
  }

  /**
   * Broadcast a cross-slice event
   */
  async broadcastEvent(eventData: CrossSliceEventData) {
    try {
      // Add timestamp if not provided
      if (!eventData.timestamp) {
        eventData.timestamp = Date.now();
      }

      // Determine channels to broadcast to
      const channels = this.getChannelsForEvent(eventData);
      
      // Broadcast to each relevant channel (if realtime service is available)
      if (realtimeService && realtimeService.isAvailable()) {
        for (const channel of channels) {
          await realtimeService.sendMessage({
          type: 'system',
          channel,
          senderId: eventData.userId,
          content: {
            crossSliceEvent: true,
            ...eventData
          },
          metadata: {
            timestamp: eventData.timestamp,
            priority: this.getEventPriority(eventData.type),
            requiresAck: this.shouldRequireAck(eventData.type),
            retryCount: 0
          }
        });
        }
      } else {
        logger.warn('Realtime service not available - cross-slice events will only trigger local handlers');
      }

      // Trigger local handlers immediately for better UX
      await this.triggerHandlers(eventData);
      
      logger.info('Cross-slice event broadcasted', { 
        type: eventData.type, 
        userId: eventData.userId,
        channels: channels.length
      });

    } catch (error) {
      logger.error('Error broadcasting cross-slice event', { error, eventData });
      throw error;
    }
  }

  /**
   * Handle space membership changes
   */
  async handleSpaceMembershipChange(userId: string, spaceId: string, action: 'joined' | 'left') {
    if (userId === this.userId) {
      // Update user's space list
      if (action === 'joined' && !this.userSpaces.includes(spaceId)) {
        this.userSpaces.push(spaceId);
        this.setupSpaceChannels([spaceId]);
      } else if (action === 'left') {
        this.userSpaces = this.userSpaces.filter(id => id !== spaceId);
        this.cleanupSpaceChannels([spaceId]);
      }
    }

    // Broadcast the event
    await this.broadcastEvent({
      type: action === 'joined' ? 'space_joined' : 'space_left',
      userId,
      timestamp: Date.now(),
      spaceId
    });
  }

  /**
   * Handle tool creation and deployment
   */
  async handleToolEvent(toolData: {
    id: string;
    name: string;
    category: string;
    creatorId: string;
    spaceId?: string;
    spaceName?: string;
    stats?: any;
  }, eventType: 'created' | 'deployed' | 'used' | 'shared') {
    
    const crossSliceEventType: CrossSliceEvent = eventType === 'created' ? 'tool_created' :
                                                 eventType === 'deployed' ? 'tool_deployed' :
                                                 eventType === 'used' ? 'tool_used' : 'tool_shared';

    await this.broadcastEvent({
      type: crossSliceEventType,
      userId: toolData.creatorId,
      timestamp: Date.now(),
      toolId: toolData.id,
      toolName: toolData.name,
      toolCategory: toolData.category,
      spaceId: toolData.spaceId,
      spaceName: toolData.spaceName,
      stats: toolData.stats
    });
  }

  /**
   * Handle social activity (posts, likes, comments)
   */
  async handleSocialActivity(activityData: {
    type: 'post' | 'like' | 'comment';
    userId: string;
    contentId: string;
    spaceId?: string;
    targetUserId?: string;
    contentPreview?: string;
  }) {
    
    const eventType: CrossSliceEvent = activityData.type === 'post' ? 'post_created' :
                                       activityData.type === 'like' ? 'post_liked' : 'post_commented';

    await this.broadcastEvent({
      type: eventType,
      userId: activityData.userId,
      timestamp: Date.now(),
      contentId: activityData.contentId,
      contentType: activityData.type,
      contentPreview: activityData.contentPreview,
      spaceId: activityData.spaceId,
      targetUsers: activityData.targetUserId ? [activityData.targetUserId] : undefined
    });
  }

  /**
   * Handle user presence changes
   */
  async handlePresenceChange(userId: string, presence: {
    status: 'online' | 'offline' | 'away';
    currentSpace?: string;
    activity?: string;
  }) {
    await this.broadcastEvent({
      type: 'user_presence_changed',
      userId,
      timestamp: Date.now(),
      spaceId: presence.currentSpace,
      metadata: {
        status: presence.status,
        activity: presence.activity
      }
    });

    // Update Firebase realtime presence (if available)
    if (realtimeService && realtimeService.isAvailable()) {
      await realtimeService.updatePresence(userId, {
        status: presence.status,
        currentSpace: presence.currentSpace,
        activity: presence.activity
      });
    }
  }

  /**
   * Setup user-specific channels
   */
  private setupUserChannels() {
    if (!this.userId || !realtimeService || !realtimeService.isAvailable()) return;

    // User notifications channel
    const userChannel = `user:${this.userId}:crossslice`;
    const cleanup = realtimeService.listenToChannel(userChannel, (messages) => {
      messages.forEach(message => {
        if (message.content.crossSliceEvent) {
          this.processIncomingEvent(message.content as CrossSliceEventData);
        }
      });
    });
    
    this.activeListeners.set(userChannel, cleanup);

    // User activity feed channel
    const feedChannel = `user:${this.userId}:activity`;
    const feedCleanup = realtimeService.listenToChannel(feedChannel, (messages) => {
      messages.forEach(message => {
        if (message.content.crossSliceEvent) {
          this.processIncomingEvent(message.content as CrossSliceEventData);
        }
      });
    });
    
    this.activeListeners.set(feedChannel, feedCleanup);
  }

  /**
   * Setup space-specific channels
   */
  private setupSpaceChannels(spaceIds: string[]) {
    if (!realtimeService || !realtimeService.isAvailable()) return;
    
    spaceIds.forEach(spaceId => {
      // Space activity channel
      const spaceChannel = `space:${spaceId}:crossslice`;
      const cleanup = realtimeService.listenToChannel(spaceChannel, (messages) => {
        messages.forEach(message => {
          if (message.content.crossSliceEvent) {
            this.processIncomingEvent(message.content as CrossSliceEventData);
          }
        });
      });
      
      this.activeListeners.set(spaceChannel, cleanup);

      // Space tools channel
      const toolsChannel = `space:${spaceId}:tools`;
      const toolsCleanup = realtimeService.listenToChannel(toolsChannel, (messages) => {
        messages.forEach(message => {
          if (message.content.crossSliceEvent) {
            this.processIncomingEvent(message.content as CrossSliceEventData);
          }
        });
      });
      
      this.activeListeners.set(toolsChannel, toolsCleanup);
    });
  }

  /**
   * Cleanup space channels when leaving
   */
  private cleanupSpaceChannels(spaceIds: string[]) {
    spaceIds.forEach(spaceId => {
      const spaceChannel = `space:${spaceId}:crossslice`;
      const toolsChannel = `space:${spaceId}:tools`;
      
      [spaceChannel, toolsChannel].forEach(channel => {
        const cleanup = this.activeListeners.get(channel);
        if (cleanup) {
          cleanup();
          this.activeListeners.delete(channel);
        }
      });
    });
  }

  /**
   * Determine channels for an event
   */
  private getChannelsForEvent(eventData: CrossSliceEventData): string[] {
    const channels: string[] = [];

    // User's personal activity channel
    channels.push(`user:${eventData.userId}:crossslice`);

    // Space-specific channels
    if (eventData.spaceId) {
      channels.push(`space:${eventData.spaceId}:crossslice`);
      
      // Tool events also go to space tools channel
      if (eventData.type.startsWith('tool_')) {
        channels.push(`space:${eventData.spaceId}:tools`);
      }
    }

    // Global campus activity channel for public events
    if (['tool_shared', 'space_activated', 'post_created'].includes(eventData.type)) {
      channels.push('campus:activity');
    }

    // Direct user notifications
    if (eventData.targetUsers) {
      eventData.targetUsers.forEach(userId => {
        channels.push(`user:${userId}:crossslice`);
      });
    }

    return channels;
  }

  /**
   * Process incoming cross-slice events
   */
  private async processIncomingEvent(eventData: CrossSliceEventData) {
    try {
      // Skip processing events from the current user to avoid loops
      if (eventData.userId === this.userId) {
        return;
      }

      await this.triggerHandlers(eventData);
      
      logger.debug('Processed incoming cross-slice event', { 
        type: eventData.type, 
        userId: eventData.userId 
      });

    } catch (error) {
      logger.error('Error processing incoming cross-slice event', { error, eventData });
    }
  }

  /**
   * Trigger registered handlers for an event
   */
  private async triggerHandlers(eventData: CrossSliceEventData) {
    const handlers = this.handlers.get(eventData.type) || [];
    
    // Execute all handlers concurrently
    await Promise.allSettled(
      handlers.map(handler => 
        handler.updateFunction(eventData).catch(error => 
          logger.error('Handler execution failed', { 
            error, 
            eventType: eventData.type, 
            slice: handler.sliceName 
          })
        )
      )
    );
  }

  /**
   * Get event priority for message delivery
   */
  private getEventPriority(eventType: CrossSliceEvent): 'low' | 'normal' | 'high' | 'urgent' {
    const highPriorityEvents = ['space_activated', 'tool_created', 'collaboration_started'];
    const urgentEvents = ['notification_sent'];
    
    if (urgentEvents.includes(eventType)) return 'urgent';
    if (highPriorityEvents.includes(eventType)) return 'high';
    if (eventType.includes('presence')) return 'low';
    
    return 'normal';
  }

  /**
   * Check if event requires acknowledgment
   */
  private shouldRequireAck(eventType: CrossSliceEvent): boolean {
    const ackRequiredEvents = ['space_activated', 'tool_deployed', 'notification_sent'];
    return ackRequiredEvents.includes(eventType);
  }

  /**
   * Update user's space list (called when spaces change)
   */
  updateUserSpaces(newSpaceIds: string[]) {
    const oldSpaces = [...this.userSpaces];
    const addedSpaces = newSpaceIds.filter(id => !oldSpaces.includes(id));
    const removedSpaces = oldSpaces.filter(id => !newSpaceIds.includes(id));

    this.userSpaces = newSpaceIds;

    if (addedSpaces.length > 0) {
      this.setupSpaceChannels(addedSpaces);
    }

    if (removedSpaces.length > 0) {
      this.cleanupSpaceChannels(removedSpaces);
    }

    logger.info('User spaces updated', { 
      added: addedSpaces.length, 
      removed: removedSpaces.length, 
      total: newSpaceIds.length 
    });
  }

  /**
   * Get current sync status
   */
  getSyncStatus() {
    return {
      userId: this.userId,
      spacesCount: this.userSpaces.length,
      activeListeners: this.activeListeners.size,
      registeredHandlers: Array.from(this.handlers.entries()).reduce((acc, [type, handlers]) => {
        acc[type] = handlers.length;
        return acc;
      }, {} as Record<string, number>)
    };
  }

  /**
   * Cleanup all listeners and handlers
   */
  cleanup() {
    // Clean up real-time listeners
    this.activeListeners.forEach(cleanup => cleanup());
    this.activeListeners.clear();

    // Clear handlers
    this.handlers.clear();

    // Reset state
    this.userId = null;
    this.userSpaces = [];

    logger.info('Cross-slice sync cleaned up');
  }
}

// Export singleton instance
export const crossSliceSync = new CrossSliceSyncService();