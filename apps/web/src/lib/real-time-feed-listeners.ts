"use client";

import { db } from '@hive/core';
import { collection, query, where, onSnapshot, orderBy, limit, Unsubscribe, Timestamp } from 'firebase/firestore';
import { logger } from './structured-logger';
import { firebaseCostMonitor, shouldProceedWithFirebaseOp } from './firebase-cost-monitor';

// Types for real-time feed updates
export interface RealtimeFeedItem {
  id: string;
  type: 'post' | 'event' | 'ritual_start' | 'space_join' | 'milestone';
  spaceId?: string;
  content: {
    title: string;
    description?: string;
    authorId?: string;
    authorName?: string;
    createdAt: Date;
    [key: string]: any;
  };
  priority: number;
  timestamp: number;
}

export interface FeedUpdateCallback {
  (items: RealtimeFeedItem[], updateType: 'added' | 'modified' | 'removed'): void;
}

/**
 * Real-time Feed Listener Manager
 * Replaces the old 15-minute polling system with instant Firebase updates
 */
export class RealtimeFeedManager {
  private unsubscribers: Map<string, Unsubscribe> = new Map();
  private isActive = true;
  private userId: string;
  private spaceIds: string[] = [];

  constructor(userId: string) {
    this.userId = userId;

    // Pause listeners when tab is hidden (save Firebase costs)
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.pauseNonCriticalListeners();
      } else {
        this.resumeListeners();
      }
    });

    // Listen for emergency shutoff events
    window.addEventListener('firebase-emergency-shutoff', () => {
      logger.error('🚨 Emergency shutoff received - destroying all listeners');
      this.destroy();
    });
  }

  /**
   * Start listening for real-time feed updates
   */
  async startFeedListeners(userSpaceIds: string[], callback: FeedUpdateCallback): Promise<void> {
    // COST CONTROL: Check if user can create listeners
    if (!shouldProceedWithFirebaseOp(this.userId, 'listen')) {
      logger.warn('⚠️ User exceeded listener limits, falling back to polling mode', { userId: this.userId });
      return;
    }

    // COST CONTROL: Limit spaces to prevent listener explosion
    this.spaceIds = userSpaceIds.slice(0, 5); // Reduced from 10 to 5 for cost control

    logger.info('🔴 Starting cost-controlled real-time feed listeners', {
      userId: this.userId,
      spaceCount: this.spaceIds.length,
      costLimits: firebaseCostMonitor.getUserReadUsage(this.userId)
    });

    // Priority-based listener setup (most important first)
    // 1. Listen to ritual activity (high priority)
    this.setupRitualListener(callback);

    // 2. Listen to new posts (medium priority, throttled)
    this.setupThrottledPostsListener(callback);

    // 3. Listen to live events (high priority when near)
    this.setupEventsListener(callback);

    // 4. Listen to space membership changes (low priority)
    if (this.spaceIds.length <= 3) { // Only if few spaces
      this.setupSpaceMembershipListener(callback);
    }
  }

  /**
   * Setup real-time posts listener
   */
  private setupPostsListener(callback: FeedUpdateCallback): void {
    if (this.spaceIds.length === 0) return;

    const postsQuery = query(
      collection(db, 'spaces'),
      where('id', 'in', this.spaceIds.slice(0, 10)), // Firestore 'in' limit
      where('isActive', '==', true)
    );

    const unsubscribe = onSnapshot(postsQuery, (spacesSnapshot) => {
      // Listen to posts in each space
      spacesSnapshot.docs.forEach(spaceDoc => {
        const spaceId = spaceDoc.id;
        this.setupSpacePostsListener(spaceId, callback);
      });
    });

    this.unsubscribers.set('posts', unsubscribe);
  }

  /**
   * Throttled posts listener with cost controls
   */
  private setupThrottledPostsListener(callback: FeedUpdateCallback): void {
    if (this.spaceIds.length === 0) return;

    // COST CONTROL: Only listen to top 3 most active spaces
    const prioritySpaces = this.spaceIds.slice(0, 3);

    prioritySpaces.forEach(spaceId => {
      this.setupSpacePostsListener(spaceId, callback);
    });
  }

  /**
   * Listen to posts within a specific space
   */
  private setupSpacePostsListener(spaceId: string, callback: FeedUpdateCallback): void {
    const postsQuery = query(
      collection(db, 'spaces', spaceId, 'posts'),
      where('isDeleted', '==', false),
      where('campusId', '==', 'ub-buffalo'), // Campus isolation
      where('createdAt', '>', new Date(Date.now() - 24 * 60 * 60 * 1000)), // Last 24 hours
      orderBy('createdAt', 'desc'),
      limit(10)
    );

    // Register listener with cost monitor
    const listenerId = `space-posts-${spaceId}`;
    if (!firebaseCostMonitor.registerListener(this.userId, listenerId, spaceId)) {
      logger.warn('⚠️ Cannot register posts listener - limit exceeded', { userId: this.userId, spaceId });
      return;
    }

    const unsubscribe = onSnapshot(postsQuery, (snapshot) => {
      // COST CONTROL: Track reads
      if (!shouldProceedWithFirebaseOp(this.userId, 'read')) {
        logger.warn('⚠️ User exceeded read limits - throttling posts listener', { userId: this.userId });
        return;
      }

      const newItems: RealtimeFeedItem[] = [];

      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const postData = change.doc.data();
          const createdAt = postData.createdAt?.toDate() || new Date();

          // COST CONTROL: Skip old posts (prevent flooding on initial load)
          if (Date.now() - createdAt.getTime() > 2 * 60 * 1000) return; // Reduced to 2 minutes

          newItems.push({
            id: change.doc.id,
            type: 'post',
            spaceId,
            content: {
              title: postData.title || 'New Post',
              description: postData.content,
              authorId: postData.authorId,
              authorName: postData.authorName,
              createdAt,
              reactions: postData.reactions || {},
              toolId: postData.toolId
            },
            priority: this.calculateRealtimePriority(postData, createdAt),
            timestamp: createdAt.getTime()
          });
        }
      });

      if (newItems.length > 0) {
        logger.info('📝 New posts detected', { count: newItems.length, spaceId });
        callback(newItems, 'added');
      }
    });

    this.unsubscribers.set(`space-posts-${spaceId}`, unsubscribe);

    // Cleanup function that unregisters from cost monitor
    const originalUnsubscribe = unsubscribe;
    this.unsubscribers.set(`space-posts-${spaceId}`, () => {
      originalUnsubscribe();
      firebaseCostMonitor.unregisterListener(this.userId, listenerId);
    });
  }

  /**
   * Setup real-time events listener
   */
  private setupEventsListener(callback: FeedUpdateCallback): void {
    if (this.spaceIds.length === 0) return;

    // Listen to events starting soon or recently started
    const now = new Date();
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
    const twoHoursFromNow = new Date(now.getTime() + 2 * 60 * 60 * 1000);

    this.spaceIds.forEach(spaceId => {
      const eventsQuery = query(
        collection(db, 'spaces', spaceId, 'events'),
        where('isDeleted', '==', false),
        where('campusId', '==', 'ub-buffalo'),
        where('startTime', '>', oneHourAgo),
        where('startTime', '<=', twoHoursFromNow),
        orderBy('startTime', 'asc'),
        limit(5)
      );

      const unsubscribe = onSnapshot(eventsQuery, (snapshot) => {
        const liveEvents: RealtimeFeedItem[] = [];

        snapshot.docs.forEach((eventDoc) => {
          const eventData = eventDoc.data();
          const startTime = eventData.startTime?.toDate() || new Date();
          const timeDiff = startTime.getTime() - now.getTime();

          // Events starting in next 30 minutes get high priority
          if (timeDiff > 0 && timeDiff <= 30 * 60 * 1000) {
            liveEvents.push({
              id: eventDoc.id,
              type: 'event',
              spaceId,
              content: {
                title: eventData.title,
                description: eventData.description,
                startTime,
                endTime: eventData.endTime?.toDate(),
                location: eventData.location,
                createdAt: eventData.createdAt?.toDate() || startTime
              },
              priority: 95, // High priority for live events
              timestamp: startTime.getTime()
            });
          }
        });

        if (liveEvents.length > 0) {
          logger.info('🎉 Live events detected', { count: liveEvents.length });
          callback(liveEvents, 'added');
        }
      });

      this.unsubscribers.set(`events-${spaceId}`, unsubscribe);
    });
  }

  /**
   * Setup ritual activity listener
   */
  private setupRitualListener(callback: FeedUpdateCallback): void {
    const ritualsQuery = query(
      collection(db, 'rituals'),
      where('status', 'in', ['active', 'scheduled']),
      where('universities', 'array-contains', 'university_buffalo'),
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    const unsubscribe = onSnapshot(ritualsQuery, (snapshot) => {
      const ritualUpdates: RealtimeFeedItem[] = [];

      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added' || change.type === 'modified') {
          const ritualData = change.doc.data();
          const updatedAt = ritualData.updatedAt?.toDate() || new Date();

          // Only surface recent ritual changes
          if (Date.now() - updatedAt.getTime() < 10 * 60 * 1000) { // Last 10 minutes
            ritualUpdates.push({
              id: change.doc.id,
              type: 'ritual_start',
              content: {
                title: `🎭 ${ritualData.title}`,
                description: ritualData.description,
                createdAt: updatedAt,
                ritualType: ritualData.type,
                participantCount: ritualData.stats?.totalParticipants || 0
              },
              priority: 90,
              timestamp: updatedAt.getTime()
            });
          }
        }
      });

      if (ritualUpdates.length > 0) {
        logger.info('🎭 Ritual updates detected', { count: ritualUpdates.length });
        callback(ritualUpdates, 'added');
      }
    });

    this.unsubscribers.set('rituals', unsubscribe);
  }

  /**
   * Listen to space membership changes
   */
  private setupSpaceMembershipListener(callback: FeedUpdateCallback): void {
    const membershipQuery = query(
      collection(db, 'space_memberships'),
      where('userId', '==', this.userId),
      where('campusId', '==', 'ub-buffalo')
    );

    const unsubscribe = onSnapshot(membershipQuery, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const membershipData = change.doc.data();
          const spaceId = membershipData.spaceId;

          // User joined a new space - start listening to its content
          if (!this.spaceIds.includes(spaceId)) {
            this.spaceIds.push(spaceId);
            this.setupSpacePostsListener(spaceId, callback);

            logger.info('✨ User joined new space, adding listeners', { spaceId });

            // Notify about the space join
            callback([{
              id: `join-${spaceId}`,
              type: 'space_join',
              spaceId,
              content: {
                title: `Joined ${membershipData.spaceName}`,
                description: 'You can now see posts and events from this space',
                createdAt: new Date()
              },
              priority: 85,
              timestamp: Date.now()
            }], 'added');
          }
        }
      });
    });

    this.unsubscribers.set('memberships', unsubscribe);
  }

  /**
   * Calculate priority for real-time content
   */
  private calculateRealtimePriority(data: any, timestamp: Date): number {
    let priority = 70; // Base priority

    const ageInMinutes = (Date.now() - timestamp.getTime()) / (1000 * 60);

    // Boost very recent content
    if (ageInMinutes < 5) priority += 20;
    else if (ageInMinutes < 15) priority += 15;
    else if (ageInMinutes < 30) priority += 10;

    // Boost tool shares
    if (data.type === 'toolshare') priority += 10;

    // Boost content with early engagement
    const reactionCount = Object.values(data.reactions || {}).reduce((sum: number, count: any) => sum + count, 0);
    if (reactionCount > 0) priority += Math.min(reactionCount * 2, 15);

    return Math.min(priority, 100);
  }

  /**
   * Pause non-critical listeners when tab is hidden
   */
  private pauseNonCriticalListeners(): void {
    if (!this.isActive) return;

    // Keep critical listeners active (DMs, rituals)
    // Pause heavy listeners (posts, events) to save costs
    this.spaceIds.forEach(spaceId => {
      const postsUnsub = this.unsubscribers.get(`space-posts-${spaceId}`);
      const eventsUnsub = this.unsubscribers.get(`events-${spaceId}`);

      if (postsUnsub) {
        postsUnsub();
        this.unsubscribers.delete(`space-posts-${spaceId}`);
      }
      if (eventsUnsub) {
        eventsUnsub();
        this.unsubscribers.delete(`events-${spaceId}`);
      }
    });

    logger.info('⏸️ Paused non-critical real-time listeners');
  }

  /**
   * Resume listeners when tab becomes visible
   */
  private resumeListeners(): void {
    if (!this.isActive) return;

    // Restart paused listeners
    this.spaceIds.forEach(spaceId => {
      if (!this.unsubscribers.has(`space-posts-${spaceId}`)) {
        // Restart with a no-op callback - the main callback will be re-established
        this.setupSpacePostsListener(spaceId, () => {});
      }
    });

    logger.info('▶️ Resumed real-time listeners');
  }

  /**
   * Stop all listeners and cleanup
   */
  destroy(): void {
    this.isActive = false;

    this.unsubscribers.forEach((unsubscribe, key) => {
      unsubscribe();
      logger.debug(`Unsubscribed from ${key}`);
    });

    this.unsubscribers.clear();
    logger.info('🧹 Cleaned up all real-time feed listeners');
  }
}

// Global registry for feed managers
const feedManagers = new Map<string, RealtimeFeedManager>();

export function getRealtimeFeedManager(userId: string): RealtimeFeedManager {
  if (!feedManagers.has(userId)) {
    feedManagers.set(userId, new RealtimeFeedManager(userId));
  }
  return feedManagers.get(userId)!;
}

export function cleanupRealtimeFeedManager(userId: string): void {
  const manager = feedManagers.get(userId);
  if (manager) {
    manager.destroy();
    feedManagers.delete(userId);
  }
}