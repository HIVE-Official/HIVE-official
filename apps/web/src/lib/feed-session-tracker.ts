/**
 * Feed Session Tracker
 * Production-quality session tracking for behavioral metrics
 * Replaces Math.random() with real user session data
 */

import { logger } from './logger';

interface SessionMetrics {
  sessionId: string;
  userId: string;
  startTime: number;
  currentTime: number;
  scrollDepth: number;
  engagementCount: number;
  lastEngagementTime: number;
  completionStage: number; // 0-1 based on actual user progress
  hasReachedMilestone: boolean;
  feedItemsViewed: Set<string>;
  feedItemsEngaged: Set<string>;
}

class FeedSessionTracker {
  private sessions: Map<string, SessionMetrics> = new Map();
  private readonly MILESTONE_THRESHOLD = 0.7; // 70% completion target

  /**
   * Start or get existing session for user
   */
  getSession(userId: string, sessionId?: string): SessionMetrics {
    const id = sessionId || `${userId}_${Date.now()}`;

    if (!this.sessions.has(id)) {
      this.sessions.set(id, {
        sessionId: id,
        userId,
        startTime: Date.now(),
        currentTime: Date.now(),
        scrollDepth: 0,
        engagementCount: 0,
        lastEngagementTime: Date.now(),
        completionStage: 0,
        hasReachedMilestone: false,
        feedItemsViewed: new Set(),
        feedItemsEngaged: new Set()
      });

      logger.info('New feed session started', { userId, sessionId: id });
    }

    return this.sessions.get(id)!;
  }

  /**
   * Update session metrics
   */
  updateSession(sessionId: string, updates: Partial<SessionMetrics>): SessionMetrics {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new Error(`Session ${sessionId} not found`);
    }

    // Update session data
    Object.assign(session, updates);
    session.currentTime = Date.now();

    // Calculate completion stage based on real metrics
    session.completionStage = this.calculateCompletionStage(session);

    // Check milestone achievement
    if (!session.hasReachedMilestone && session.completionStage >= this.MILESTONE_THRESHOLD) {
      session.hasReachedMilestone = true;
      logger.info('User reached 70% completion milestone', {
        userId: session.userId,
        sessionId,
        duration: (session.currentTime - session.startTime) / 1000,
        engagementCount: session.engagementCount
      });
    }

    return session;
  }

  /**
   * Track feed item view
   */
  trackView(sessionId: string, feedItemId: string): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.feedItemsViewed.add(feedItemId);
      this.updateSession(sessionId, {});
    }
  }

  /**
   * Track feed item engagement
   */
  trackEngagement(sessionId: string, feedItemId: string, type: 'like' | 'comment' | 'share'): void {
    const session = this.sessions.get(sessionId);
    if (session) {
      session.feedItemsEngaged.add(feedItemId);
      session.engagementCount++;
      session.lastEngagementTime = Date.now();
      this.updateSession(sessionId, { engagementCount: session.engagementCount });
    }
  }

  /**
   * Calculate actual completion stage based on user behavior
   * Not random - based on real engagement metrics
   */
  private calculateCompletionStage(session: SessionMetrics): number {
    const sessionDuration = (session.currentTime - session.startTime) / 1000; // seconds
    const viewEngagementRatio = session.feedItemsEngaged.size / Math.max(1, session.feedItemsViewed.size);

    // Weight different factors
    const timeWeight = Math.min(1, sessionDuration / 300); // 5 minutes = full weight
    const scrollWeight = session.scrollDepth / 100;
    const engagementWeight = Math.min(1, session.engagementCount / 10); // 10 engagements = full weight
    const ratioWeight = viewEngagementRatio;

    // Calculate weighted completion stage
    const completionStage = (
      timeWeight * 0.2 +
      scrollWeight * 0.3 +
      engagementWeight * 0.3 +
      ratioWeight * 0.2
    );

    return Math.min(1, completionStage);
  }

  /**
   * Get variability factor based on user's session pattern
   * Not random - based on engagement velocity
   */
  getVariabilityFactor(session: SessionMetrics): number {
    const recentEngagement = Date.now() - session.lastEngagementTime < 30000; // Active in last 30s
    const engagementVelocity = session.engagementCount / Math.max(1, (session.currentTime - session.startTime) / 60000);

    // Higher variability for highly engaged users
    if (recentEngagement && engagementVelocity > 2) {
      return 0.15 + (engagementVelocity / 20); // 0.15-0.2 range
    } else if (engagementVelocity > 1) {
      return 0.1 + (engagementVelocity / 30); // 0.1-0.15 range
    }

    return 0.05; // Low variability for passive viewers
  }

  /**
   * Determine reward probability based on actual session progress
   * Not random - deterministic based on user behavior
   */
  getRewardProbability(session: SessionMetrics): number {
    const stage = session.completionStage;

    // Before 70%: High probability to maintain engagement
    if (stage < 0.7) {
      return 0.8 - (stage * 0.2); // 0.8 to 0.66 as they progress
    }

    // At 70%: Guaranteed reward
    if (stage >= 0.69 && stage <= 0.71) {
      return 1.0;
    }

    // After 70%: Lower probability
    return 0.4 - ((stage - 0.7) * 0.3); // Decreases from 0.4
  }

  /**
   * Clean up old sessions (call periodically)
   */
  cleanupSessions(maxAgeMs: number = 3600000): void {
    const now = Date.now();
    const toDelete: string[] = [];

    this.sessions.forEach((session, id) => {
      if (now - session.currentTime > maxAgeMs) {
        toDelete.push(id);
      }
    });

    toDelete.forEach(id => {
      const session = this.sessions.get(id);
      if (session) {
        logger.info('Cleaning up old session', {
          sessionId: id,
          userId: session.userId,
          duration: (session.currentTime - session.startTime) / 1000,
          completionStage: session.completionStage,
          engagementCount: session.engagementCount
        });
      }
      this.sessions.delete(id);
    });
  }

  /**
   * Export session metrics for analytics
   */
  exportMetrics(sessionId: string): SessionMetrics | null {
    return this.sessions.get(sessionId) || null;
  }
}

// Singleton instance
export const feedSessionTracker = new FeedSessionTracker();

// Clean up old sessions every 15 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    feedSessionTracker.cleanupSessions();
  }, 15 * 60 * 1000);
}

export type { SessionMetrics };