/**
 * Activity Tracking System for HIVE
 * Handles real-time activity tracking, summaries, and analytics
 */

import { dbAdmin, FieldValue } from '@/lib/firebase-admin';
import { db } from '@/lib/firebase-client';
import { doc, setDoc, updateDoc, increment, serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { logger } from '@/lib/logger';

// ===== COLLECTION INTERFACES =====

export interface ActivityEvent {
  userId: string;
  type: 'space_visit' | 'tool_interaction' | 'social_interaction' | 'content_creation' | 'profile_view';
  timestamp: Date | string;
  spaceId?: string;
  spaceName?: string;
  toolId?: string;
  toolName?: string;
  duration?: number; // in minutes
  metadata?: {
    action?: string;
    page?: string;
    buttonId?: string;
    query?: string;
    targetUserId?: string;
    contentType?: string;
    contentId?: string;
  };
}

export interface ActivitySummary {
  userId: string;
  date: string; // YYYY-MM-DD format
  totalTimeSpent: number; // minutes
  contentCreated: number;
  toolsUsed: string[];
  socialInteractions: number;
  spacesVisited: string[];
  peakActivityHour: number; // 0-23
  lastUpdated: Date | string;
}

export interface SpaceMembership {
  id?: string;
  userId: string;
  spaceId: string;
  spaceName: string;
  status: 'active' | 'inactive' | 'banned';
  role: 'member' | 'moderator' | 'admin' | 'owner';
  joinedAt: Date | string;
  lastActivity: Date | string;
  isFavorite: boolean;
  isPinned: boolean;
  notificationSettings: {
    posts: boolean;
    events: boolean;
    mentions: boolean;
  };
}

export interface PersonalEvent {
  userId: string;
  title: string;
  description?: string;
  startDate: Date | string;
  endDate: Date | string;
  location?: string;
  reminder?: boolean;
  category?: 'study' | 'social' | 'work' | 'personal';
  createdAt: Date | string;
}

// ===== CLIENT-SIDE TRACKING =====

/**
 * Track a user activity event
 */
export async function trackActivity(event: Omit<ActivityEvent, 'timestamp'>): Promise<void> {
  try {
    const activityEvent: ActivityEvent = {
      ...event,
      timestamp: new Date().toISOString()
    };

    // Add to activityEvents collection
    await addDoc(collection(db, 'activityEvents'), activityEvent);

    // Update daily summary
    await updateActivitySummary(event.userId, activityEvent);
    
    // Update space membership last activity if applicable
    if (event.spaceId && event.type === 'space_visit') {
      await updateSpaceMembershipActivity(event.userId, event.spaceId);
    }

    logger.info('Activity tracked', { event: activityEvent });
  } catch (error) {
    logger.error('Failed to track activity', { error, event });
  }
}

/**
 * Update user's daily activity summary
 */
async function updateActivitySummary(userId: string, event: ActivityEvent): Promise<void> {
  const today = new Date().toISOString().split('T')[0];
  const hour = new Date().getHours();
  const summaryRef = doc(db, 'activitySummaries', `${userId}_${today}`);

  try {
    const updates: any = {
      userId,
      date: today,
      lastUpdated: serverTimestamp(),
      [`hourlyActivity.${hour}`]: increment(1)
    };

    // Update based on event type
    switch (event.type) {
      case 'space_visit':
        if (event.duration) {
          updates.totalTimeSpent = increment(event.duration);
        }
        if (event.spaceId) {
          updates.spacesVisited = FieldValue.arrayUnion(event.spaceId);
        }
        break;
      
      case 'tool_interaction':
        if (event.toolId) {
          updates.toolsUsed = FieldValue.arrayUnion(event.toolId);
        }
        break;
      
      case 'social_interaction':
        updates.socialInteractions = increment(1);
        break;
      
      case 'content_creation':
        updates.contentCreated = increment(1);
        break;
    }

    await setDoc(summaryRef, updates, { merge: true });
  } catch (error) {
    logger.error('Failed to update activity summary', { error, userId, event });
  }
}

/**
 * Update space membership last activity
 */
async function updateSpaceMembershipActivity(userId: string, spaceId: string): Promise<void> {
  try {
    const memberRef = doc(db, 'members', `${userId}_${spaceId}`);
    await updateDoc(memberRef, {
      lastActivity: serverTimestamp()
    });
  } catch (error) {
    logger.error('Failed to update membership activity', { error, userId, spaceId });
  }
}

// ===== SERVER-SIDE INITIALIZATION =====

/**
 * Initialize user's activity tracking (called during onboarding)
 */
export async function initializeUserActivityTracking(userId: string): Promise<void> {
  try {
    // Create initial activity summary for today
    const today = new Date().toISOString().split('T')[0];
    await dbAdmin.collection('activitySummaries').doc(`${userId}_${today}`).set({
      userId,
      date: today,
      totalTimeSpent: 0,
      contentCreated: 0,
      toolsUsed: [],
      socialInteractions: 0,
      spacesVisited: [],
      peakActivityHour: 0,
      lastUpdated: FieldValue.serverTimestamp()
    });

    // Initialize privacy settings if not exists
    const privacyRef = dbAdmin.collection('privacySettings').doc(userId);
    const privacyDoc = await privacyRef.get();
    
    if (!privacyDoc.exists) {
      await privacyRef.set({
        userId,
        ghostMode: {
          enabled: false,
          level: 'normal'
        },
        profileVisibility: {
          showToSpaceMembers: true,
          showToSearchResults: true,
          showActivityStatus: true
        },
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });
    }

    logger.info('Initialized user activity tracking', { userId });
  } catch (error) {
    logger.error('Failed to initialize activity tracking', { error, userId });
  }
}

/**
 * Create or update a space membership
 */
export async function upsertSpaceMembership(
  userId: string,
  spaceId: string,
  spaceName: string,
  role: SpaceMembership['role'] = 'member'
): Promise<void> {
  try {
    const memberRef = dbAdmin.collection('members').doc(`${userId}_${spaceId}`);
    
    await memberRef.set({
      userId,
      spaceId,
      spaceName,
      status: 'active',
      role,
      joinedAt: FieldValue.serverTimestamp(),
      lastActivity: FieldValue.serverTimestamp(),
      isFavorite: false,
      isPinned: false,
      notificationSettings: {
        posts: true,
        events: true,
        mentions: true
      }
    }, { merge: true });

    logger.info('Space membership updated', { userId, spaceId, role });
  } catch (error) {
    logger.error('Failed to update space membership', { error, userId, spaceId });
    throw error;
  }
}

/**
 * Track page view activity
 */
export async function trackPageView(
  userId: string,
  page: string,
  spaceId?: string
): Promise<void> {
  await trackActivity({
    userId,
    type: 'space_visit',
    spaceId,
    metadata: {
      action: 'page_view',
      page
    }
  });
}

/**
 * Track button click activity
 */
export async function trackButtonClick(
  userId: string,
  buttonId: string,
  spaceId?: string
): Promise<void> {
  await trackActivity({
    userId,
    type: 'social_interaction',
    spaceId,
    metadata: {
      action: 'button_click',
      buttonId
    }
  });
}

/**
 * Track search activity
 */
export async function trackSearch(
  userId: string,
  query: string,
  spaceId?: string
): Promise<void> {
  await trackActivity({
    userId,
    type: 'social_interaction',
    spaceId,
    metadata: {
      action: 'search',
      query
    }
  });
}

/**
 * Track content creation
 */
export async function trackContentCreation(
  userId: string,
  contentType: string,
  contentId: string,
  spaceId?: string
): Promise<void> {
  await trackActivity({
    userId,
    type: 'content_creation',
    spaceId,
    metadata: {
      contentType,
      contentId
    }
  });
}

/**
 * Track tool usage
 */
export async function trackToolUsage(
  userId: string,
  toolId: string,
  toolName: string,
  spaceId?: string
): Promise<void> {
  await trackActivity({
    userId,
    type: 'tool_interaction',
    toolId,
    toolName,
    spaceId,
    metadata: {
      action: 'used'
    }
  });
}

/**
 * Get user's recent activity
 */
export async function getUserRecentActivity(
  userId: string,
  limit: number = 10
): Promise<ActivityEvent[]> {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7);

    const snapshot = await dbAdmin.collection('activityEvents')
      .where('userId', '==', userId)
      .where('timestamp', '>=', startDate)
      .where('timestamp', '<=', endDate)
      .orderBy('timestamp', 'desc')
      .limit(limit)
      .get();

    return snapshot.docs.map(doc => doc.data() as ActivityEvent);
  } catch (error) {
    logger.error('Failed to get recent activity', { error, userId });
    return [];
  }
}

/**
 * Get user's activity summary for a date range
 */
export async function getUserActivitySummary(
  userId: string,
  startDate: Date,
  endDate: Date
): Promise<ActivitySummary[]> {
  try {
    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    const snapshot = await dbAdmin.collection('activitySummaries')
      .where('userId', '==', userId)
      .where('date', '>=', startDateStr)
      .where('date', '<=', endDateStr)
      .orderBy('date', 'desc')
      .get();

    return snapshot.docs.map(doc => doc.data() as ActivitySummary);
  } catch (error) {
    logger.error('Failed to get activity summary', { error, userId });
    return [];
  }
}