import { dbAdmin } from '@/lib/firebase-admin';
import { getLatestAggregatedContent, type AggregatedFeedItem } from '@/lib/feed-aggregation';

/**
 * Real-time Feed Update System
 * 
 * Strategy:
 * 1. 15-minute refresh cycle for feed cache
 * 2. Incremental updates for new content
 * 3. WebSocket-ready for real-time notifications
 * 4. Background job processing for cache warming
 */

// User's last activity tracking
export interface UserFeedState {
  userId: string;
  lastUpdateTime: Date;
  lastViewTime: Date;
  feedVersion: string;
  unseenCount: number;
  preferences: {
    autoRefresh: boolean;
    notificationsEnabled: boolean;
    refreshInterval: number; // minutes
  };
}

// Real-time update payload
export interface FeedUpdate {
  updateId: string;
  userId: string;
  type: 'new_content' | 'content_update' | 'cache_refresh' | 'space_join' | 'space_leave';
  items: AggregatedFeedItem[];
  timestamp: Date;
  metadata: {
    totalItems: number;
    highPriorityItems: number;
    contentTypes: Record<string, number>;
  };
}

/**
 * Real-time feed manager for a specific user
 */
export class RealTimeFeedManager {
  private refreshInterval = 15 * 60 * 1000; // 15 minutes in milliseconds
  private refreshTimer?: NodeJS.Timeout;
  
  constructor(private _userId: string) {}

  /**
   * Initialize real-time feed for user
   */
  async initialize(): Promise<UserFeedState> {
    const existingState = await this.getUserFeedState();
    
    if (existingState) {
      // Resume existing state
      this.scheduleNextRefresh(existingState);
      return existingState;
    }
    
    // Create new state
    const newState: UserFeedState = {
      userId: this._userId,
      lastUpdateTime: new Date(),
      lastViewTime: new Date(),
      feedVersion: this.generateFeedVersion(),
      unseenCount: 0,
      preferences: {
        autoRefresh: true,
        notificationsEnabled: true,
        refreshInterval: 15
      }
    };
    
    await this.saveUserFeedState(newState);
    this.scheduleNextRefresh(newState);
    
    return newState;
  }

  /**
   * Check for new content since last update
   */
  async checkForUpdates(): Promise<FeedUpdate | null> {
    const state = await this.getUserFeedState();
    if (!state) return null;

    // Get user's space memberships
    const userSpaceIds = await this.getUserSpaceIds();
    
    // Get new content since last update
    const newItems = await getLatestAggregatedContent(
      this._userId,
      userSpaceIds,
      state.lastUpdateTime,
      50 // Reasonable limit for updates
    );

    if (newItems.length === 0) {
      return null; // No new content
    }

    // Create update payload
    const update: FeedUpdate = {
      updateId: this.generateUpdateId(),
      userId: this._userId,
      type: 'new_content',
      items: newItems,
      timestamp: new Date(),
      metadata: {
        totalItems: newItems.length,
        highPriorityItems: newItems.filter(item => item.priority >= 80).length,
        contentTypes: this.getContentTypeDistribution(newItems)
      }
    };

    // Update user state
    state.lastUpdateTime = new Date();
    state.unseenCount += newItems.length;
    state.feedVersion = this.generateFeedVersion();
    
    await this.saveUserFeedState(state);

    return update;
  }

  /**
   * Mark content as viewed by user
   */
  async markAsViewed(itemIds: string[]): Promise<void> {
    const state = await this.getUserFeedState();
    if (!state) return;

    // Reduce unseen count
    state.unseenCount = Math.max(0, state.unseenCount - itemIds.length);
    state.lastViewTime = new Date();
    
    await this.saveUserFeedState(state);

    // Track view analytics
    await this.trackViewAnalytics(itemIds);
  }

  /**
   * Force refresh user's feed cache
   */
  async forceRefresh(): Promise<FeedUpdate> {
    const userSpaceIds = await this.getUserSpaceIds();
    
    // Get fresh content from all sources
    const { createFeedAggregator } = await import('@/lib/feed-aggregation');
    const aggregator = createFeedAggregator(this._userId, userSpaceIds);
    const allItems = await aggregator.aggregateContent(100);

    const update: FeedUpdate = {
      updateId: this.generateUpdateId(),
      userId: this._userId,
      type: 'cache_refresh',
      items: allItems,
      timestamp: new Date(),
      metadata: {
        totalItems: allItems.length,
        highPriorityItems: allItems.filter(item => item.priority >= 80).length,
        contentTypes: this.getContentTypeDistribution(allItems)
      }
    };

    // Update user state
    const state = await this.getUserFeedState();
    if (state) {
      state.lastUpdateTime = new Date();
      state.feedVersion = this.generateFeedVersion();
      await this.saveUserFeedState(state);
    }

    return update;
  }

  /**
   * Handle user joining a new space
   */
  async handleSpaceJoin(spaceId: string): Promise<FeedUpdate | null> {
    // Get recent content from the new space
    const spaceContent = await this.getSpaceContent(spaceId, 20);
    
    if (spaceContent.length === 0) return null;

    const update: FeedUpdate = {
      updateId: this.generateUpdateId(),
      userId: this._userId,
      type: 'space_join',
      items: spaceContent,
      timestamp: new Date(),
      metadata: {
        totalItems: spaceContent.length,
        highPriorityItems: spaceContent.filter(item => item.priority >= 80).length,
        contentTypes: this.getContentTypeDistribution(spaceContent)
      }
    };

    return update;
  }

  /**
   * Handle user leaving a space
   */
  async handleSpaceLeave(_spaceId: string): Promise<void> {
    // Force refresh to remove content from that space
    await this.forceRefresh();
  }

  /**
   * Schedule next automatic refresh
   */
  private scheduleNextRefresh(state: UserFeedState): void {
    if (!state.preferences.autoRefresh) return;

    const interval = state.preferences.refreshInterval * 60 * 1000;
    
    this.refreshTimer = setTimeout(async () => {
      try {
        await this.checkForUpdates();
        this.scheduleNextRefresh(state); // Schedule next refresh
      } catch (error) {
        console.error(`Failed to refresh feed for user ${this._userId}:`, error);
        // Retry with exponential backoff
        setTimeout(() => this.scheduleNextRefresh(state), Math.min(interval * 2, 300000));
      }
    }, interval);
  }

  /**
   * Get user's current feed state from database
   */
  private async getUserFeedState(): Promise<UserFeedState | null> {
    try {
      const doc = await dbAdmin.collection('user_feed_states').doc(this._userId).get();
      
      if (!doc.exists) return null;
      
      const data = doc.data()!;
      return {
        userId: data._userId,
        lastUpdateTime: data.lastUpdateTime?.toDate() || new Date(),
        lastViewTime: data.lastViewTime?.toDate() || new Date(),
        feedVersion: data.feedVersion,
        unseenCount: data.unseenCount || 0,
        preferences: data.preferences || {
          autoRefresh: true,
          notificationsEnabled: true,
          refreshInterval: 15
        }
      };
    } catch (error) {
      console.error('Error getting user feed state:', error);
      return null;
    }
  }

  /**
   * Save user's feed state to database
   */
  private async saveUserFeedState(state: UserFeedState): Promise<void> {
    try {
      await dbAdmin.collection('user_feed_states').doc(this._userId).set({
        userId: state.userId,
        lastUpdateTime: state.lastUpdateTime,
        lastViewTime: state.lastViewTime,
        feedVersion: state.feedVersion,
        unseenCount: state.unseenCount,
        preferences: state.preferences,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error saving user feed state:', error);
    }
  }

  /**
   * Get user's space IDs
   */
  private async getUserSpaceIds(): Promise<string[]> {
    try {
      const snapshot = await dbAdmin.collectionGroup('members')
        .where('userId', '==', this._userId)
        .limit(100)
        .get();
      
      const spaceIds: string[] = [];
      snapshot.docs.forEach(doc => {
        const spaceId = doc.ref.parent.parent?.id;
        if (spaceId) spaceIds.push(spaceId);
      });
      
      return spaceIds;
    } catch (error) {
      console.error('Error getting user space IDs:', error);
      return [];
    }
  }

  /**
   * Get content from a specific space
   */
  private async getSpaceContent(spaceId: string, limit: number): Promise<AggregatedFeedItem[]> {
    try {
      const { createFeedAggregator } = await import('@/lib/feed-aggregation');
      const aggregator = createFeedAggregator(this._userId, [spaceId]);
      return await aggregator.aggregateContent(limit);
    } catch (error) {
      console.error(`Error getting space content for ${spaceId}:`, error);
      return [];
    }
  }

  /**
   * Track view analytics
   */
  private async trackViewAnalytics(itemIds: string[]): Promise<void> {
    try {
      const batch = dbAdmin.batch();
      
      itemIds.forEach(itemId => {
        const ref = dbAdmin.collection('feed_analytics').doc();
        batch.set(ref, {
          userId: this._userId,
          itemId,
          action: 'view',
          timestamp: new Date()
        });
      });
      
      await batch.commit();
    } catch (error) {
      console.error('Error tracking view analytics:', error);
    }
  }

  /**
   * Generate unique feed version ID
   */
  private generateFeedVersion(): string {
    return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Generate unique update ID
   */
  private generateUpdateId(): string {
    return `update_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get content type distribution for analytics
   */
  private getContentTypeDistribution(items: AggregatedFeedItem[]): Record<string, number> {
    const distribution: Record<string, number> = {};
    
    items.forEach(item => {
      const type = item.contentType;
      distribution[type] = (distribution[type] || 0) + 1;
    });
    
    return distribution;
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = undefined;
    }
  }
}

/**
 * Global feed manager registry
 */
class FeedManagerRegistry {
  private managers = new Map<string, RealTimeFeedManager>();

  async getManager(userId: string): Promise<RealTimeFeedManager> {
    if (!this.managers.has(userId)) {
      const manager = new RealTimeFeedManager(userId);
      await manager.initialize();
      this.managers.set(userId, manager);
    }
    
    return this.managers.get(userId)!;
  }

  removeManager(userId: string): void {
    const manager = this.managers.get(userId);
    if (manager) {
      manager.destroy();
      this.managers.delete(userId);
    }
  }

  /**
   * Background job to warm feed caches
   */
  async warmAllCaches(): Promise<void> {
    console.log('🔄 Starting feed cache warming...');
    
    try {
      // Get active users from last 24 hours
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      
      const activeUsersSnapshot = await dbAdmin.collection('user_feed_states')
        .where('lastViewTime', '>', oneDayAgo)
        .limit(1000) // Process in batches
        .get();
      
      console.log(`📊 Warming caches for ${activeUsersSnapshot.size} active users`);
      
      // Process users in batches to avoid overwhelming the system
      const batchSize = 10;
      const userDocs = activeUsersSnapshot.docs;
      
      for (let i = 0; i < userDocs.length; i += batchSize) {
        const batch = userDocs.slice(i, i + batchSize);
        
        const promises = batch.map(async (doc) => {
          try {
            const manager = await this.getManager(doc.id);
            await manager.checkForUpdates();
          } catch (error) {
            console.error(`Failed to warm cache for user ${doc.id}:`, error);
          }
        });
        
        await Promise.all(promises);
        
        // Small delay between batches
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      
      console.log('✅ Feed cache warming completed');
    } catch (error) {
      console.error('❌ Feed cache warming failed:', error);
    }
  }
}

// Global registry instance
export const feedManagerRegistry = new FeedManagerRegistry();

/**
 * API endpoints for real-time feed updates
 */
export async function getFeedUpdates(userId: string): Promise<FeedUpdate | null> {
  const manager = await feedManagerRegistry.getManager(userId);
  return await manager.checkForUpdates();
}

export async function markFeedAsViewed(userId: string, itemIds: string[]): Promise<void> {
  const manager = await feedManagerRegistry.getManager(userId);
  await manager.markAsViewed(itemIds);
}

export async function refreshFeedCache(userId: string): Promise<FeedUpdate> {
  const manager = await feedManagerRegistry.getManager(userId);
  return await manager.forceRefresh();
}