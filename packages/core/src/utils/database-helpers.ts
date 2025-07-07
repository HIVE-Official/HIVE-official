/**
 * Database Helper Functions for HIVE
 * 
 * Collection of utility functions for working with the enhanced
 * Firestore collections and data models.
 */

import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy, 
  limit,
  Timestamp,
  type Firestore 
} from 'firebase/firestore';

import {
  type Ritual,
  type RitualParticipation,
  type Notification,
  type NotificationPreferences,
  type Tool as FirestoreTool,
  type ToolUsage,
  type ContentReport,
  type UserSafetyRecord
} from '../index';

import {
  type AnalyticsEvent as FirestoreAnalyticsEvent
} from '@hive/validation';

// ======== RITUAL HELPERS ========

export class RitualHelpers {
  constructor(private db: Firestore) {}

  async getRitual(ritualId: string): Promise<Ritual | null> {
    const docRef = doc(this.db, 'rituals', ritualId);
    const docSnap = await getDoc(docRef);
    
    if (!docSnap.exists()) return null;
    
    const data = docSnap.data();
    return {
      ...data,
      id: docSnap.id,
      scheduledStart: data.scheduledStart.toDate(),
      scheduledEnd: data.scheduledEnd.toDate(),
      actualStart: data.actualStart?.toDate(),
      actualEnd: data.actualEnd?.toDate(),
      createdAt: data.createdAt.toDate(),
      updatedAt: data.updatedAt.toDate()
    } as Ritual;
  }

  async getActiveRituals(): Promise<Ritual[]> {
    const now = new Date();
    const ritualsRef = collection(this.db, 'rituals');
    const q = query(
      ritualsRef,
      where('status', '==', 'active'),
      where('scheduledStart', '<=', Timestamp.fromDate(now)),
      where('scheduledEnd', '>=', Timestamp.fromDate(now)),
      orderBy('scheduledStart', 'asc')
    );
    
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      scheduledStart: doc.data().scheduledStart.toDate(),
      scheduledEnd: doc.data().scheduledEnd.toDate(),
      actualStart: doc.data().actualStart?.toDate(),
      actualEnd: doc.data().actualEnd?.toDate(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate()
    })) as Ritual[];
  }

  async participateInRitual(
    ritualId: string, 
    userId: string, 
    response: string,
    attachments?: string[]
  ): Promise<void> {
    const participation: Omit<RitualParticipation, 'ritualId' | 'userId'> = {
      completedAt: new Date(),
      response,
      attachments,
      validated: false,
      featured: false,
      createdAt: new Date()
    };

    const participationRef = doc(this.db, 'rituals', ritualId, 'participants', userId);
    await setDoc(participationRef, {
      ritualId,
      userId,
      ...participation
    });

    // Update ritual participant count
    const ritualRef = doc(this.db, 'rituals', ritualId);
    const ritual = await getDoc(ritualRef);
    if (ritual.exists()) {
      await updateDoc(ritualRef, {
        totalParticipants: (ritual.data().totalParticipants || 0) + 1,
        completedParticipants: (ritual.data().completedParticipants || 0) + 1,
        updatedAt: new Date()
      });
    }
  }

  async hasUserParticipated(ritualId: string, userId: string): Promise<boolean> {
    const participationRef = doc(this.db, 'rituals', ritualId, 'participants', userId);
    const participationSnap = await getDoc(participationRef);
    return participationSnap.exists();
  }
}

// ======== NOTIFICATION HELPERS ========

export class NotificationHelpers {
  constructor(private db: Firestore) {}

  async createNotification(
    userId: string,
    notification: Omit<Notification, 'id' | 'userId' | 'createdAt'>
  ): Promise<string> {
    const notificationRef = doc(collection(this.db, 'users', userId, 'notifications'));
    const notificationData = {
      ...notification,
      userId,
      createdAt: new Date()
    };

    await setDoc(notificationRef, notificationData);
    return notificationRef.id;
  }

  async getUserNotifications(
    userId: string, 
    unreadOnly: boolean = false,
    limitCount: number = 50
  ): Promise<Notification[]> {
    const notificationsRef = collection(this.db, 'users', userId, 'notifications');
    let q = query(
      notificationsRef,
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    if (unreadOnly) {
      q = query(
        notificationsRef,
        where('read', '==', false),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt.toDate(),
      readAt: doc.data().readAt?.toDate(),
      clickedAt: doc.data().clickedAt?.toDate(),
      scheduledFor: doc.data().scheduledFor?.toDate(),
      expiresAt: doc.data().expiresAt?.toDate()
    })) as Notification[];
  }

  async markNotificationAsRead(userId: string, notificationId: string): Promise<void> {
    const notificationRef = doc(this.db, 'users', userId, 'notifications', notificationId);
    await updateDoc(notificationRef, {
      read: true,
      readAt: new Date()
    });
  }

  async getUnreadCount(userId: string): Promise<number> {
    const notificationsRef = collection(this.db, 'users', userId, 'notifications');
    const q = query(
      notificationsRef,
      where('read', '==', false),
      where('dismissed', '==', false)
    );

    const snapshot = await getDocs(q);
    return snapshot.size;
  }
}

// ======== TOOL HELPERS ========

export class ToolHelpers {
  constructor(private db: Firestore) {}

  async createTool(tool: Omit<FirestoreTool, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    const toolRef = doc(collection(this.db, 'tools'));
    const toolData = {
      ...tool,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await setDoc(toolRef, toolData);
    return toolRef.id;
  }

  async recordToolUsage(
    toolId: string,
    usage: Omit<ToolUsage, 'toolId' | 'createdAt'>
  ): Promise<void> {
    const usageRef = doc(collection(this.db, 'tools', toolId, 'usage'));
    const usageData = {
      ...usage,
      toolId,
      createdAt: new Date()
    };

    await setDoc(usageRef, usageData);

    // Update tool metadata
    const toolRef = doc(this.db, 'tools', toolId);
    const toolSnap = await getDoc(toolRef);
    
    if (toolSnap.exists()) {
      const toolData = toolSnap.data();
      const metadata = toolData.metadata || {};
      
      await updateDoc(toolRef, {
        'metadata.totalViews': (metadata.totalViews || 0) + 1,
        'metadata.lastUpdated': new Date(),
        updatedAt: new Date()
      });
    }
  }

  async getToolsByCategory(category: string, limitCount: number = 20): Promise<FirestoreTool[]> {
    const toolsRef = collection(this.db, 'tools');
    const q = query(
      toolsRef,
      where('category', '==', category),
      where('status', '==', 'published'),
      orderBy('metadata.totalViews', 'desc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
      publishedAt: doc.data().publishedAt?.toDate(),
      metadata: {
        ...doc.data().metadata,
        lastUpdated: doc.data().metadata?.lastUpdated?.toDate()
      }
    })) as FirestoreTool[];
  }
}

// ======== MODERATION HELPERS ========

export class ModerationHelpers {
  constructor(private db: Firestore) {}

  async createContentReport(
    report: Omit<ContentReport, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<string> {
    const reportRef = doc(collection(this.db, 'content_reports'));
    const reportData = {
      ...report,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await setDoc(reportRef, reportData);
    return reportRef.id;
  }

  async getPendingReports(limitCount: number = 50): Promise<ContentReport[]> {
    const reportsRef = collection(this.db, 'content_reports');
    const q = query(
      reportsRef,
      where('status', '==', 'pending'),
      orderBy('priority', 'desc'),
      orderBy('createdAt', 'asc'),
      limit(limitCount)
    );

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate(),
      assignedAt: doc.data().assignedAt?.toDate(),
      resolvedAt: doc.data().resolvedAt?.toDate(),
      appealedAt: doc.data().appealedAt?.toDate()
    })) as ContentReport[];
  }

  async updateUserSafetyRecord(
    userId: string,
    updates: Partial<UserSafetyRecord>
  ): Promise<void> {
    const safetyRef = doc(this.db, 'user_safety_records', userId);
    const safetySnap = await getDoc(safetyRef);

    if (safetySnap.exists()) {
      await updateDoc(safetyRef, {
        ...updates,
        updatedAt: new Date()
      });
    } else {
      // Create new safety record
      const newRecord: UserSafetyRecord = {
        userId,
        totalReports: 0,
        confirmedViolations: 0,
        falseReports: 0,
        currentStatus: 'good_standing',
        riskLevel: 'low',
        warnings: 0,
        timeouts: 0,
        suspensions: 0,
        activeRestrictions: [],
        behaviorScore: 100,
        rehabilitationProgress: 0,
        appeals: [],
        moderatorNotes: [],
        createdAt: new Date(),
        updatedAt: new Date(),
        ...updates
      };

      await setDoc(safetyRef, newRecord);
    }
  }
}

// ======== ANALYTICS HELPERS ========

export class AnalyticsHelpers {
  constructor(private db: Firestore) {}

  async trackEvent(event: Omit<FirestoreAnalyticsEvent, 'createdAt'>): Promise<void> {
    const eventRef = doc(collection(this.db, 'analytics_events'));
    const eventData = {
      ...event,
      createdAt: new Date()
    };

    await setDoc(eventRef, eventData);

    // Also store in user's personal analytics
    const userEventRef = doc(collection(this.db, 'users', event.userId, 'events'));
    await setDoc(userEventRef, eventData);
  }

  async getUserEvents(
    userId: string,
    eventType?: string,
    limitCount: number = 100
  ): Promise<FirestoreAnalyticsEvent[]> {
    const eventsRef = collection(this.db, 'users', userId, 'events');
    let q = query(
      eventsRef,
      orderBy('createdAt', 'desc'),
      limit(limitCount)
    );

    if (eventType) {
      q = query(
        eventsRef,
        where('eventType', '==', eventType),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      ...doc.data(),
      metadata: {
        ...doc.data().metadata,
        timestamp: doc.data().metadata.timestamp.toDate()
      },
      createdAt: doc.data().createdAt.toDate()
    })) as FirestoreAnalyticsEvent[];
  }

  async updateDailyAnalytics(userId: string, date: string): Promise<void> {
    const analyticsRef = doc(this.db, 'users', userId, 'analytics', date);
    
    // Get user events for the day
    const events = await this.getUserEvents(userId);
    const dayEvents = events.filter(event => 
      event.createdAt.toDateString() === new Date(date).toDateString()
    );

    // Calculate metrics from events
    const analytics = {
      userId,
      date,
      dailyActiveMinutes: this.calculateActiveMinutes(dayEvents),
      sessionsCount: new Set(dayEvents.map(e => e.sessionId)).size,
      postsCreated: dayEvents.filter(e => e.eventType === 'post_create').length,
      postsLiked: dayEvents.filter(e => e.eventType === 'post_like').length,
      spacesVisited: Array.from(new Set(
        dayEvents
          .filter(e => e.eventData?.spaceId)
          .map(e => e.eventData?.spaceId)
      )),
      toolsUsed: Array.from(new Set(
        dayEvents
          .filter(e => e.eventType === 'tool_use')
          .map(e => e.eventData?.toolId)
      )),
      ritualsParticipated: Array.from(new Set(
        dayEvents
          .filter(e => e.eventType === 'ritual_participate')
          .map(e => e.eventData?.ritualId)
      )),
      engagementScore: 0, // Calculate based on activities
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Calculate engagement score
    analytics.engagementScore = this.calculateEngagementScore(analytics);

    await setDoc(analyticsRef, analytics, { merge: true });
  }

  private calculateActiveMinutes(events: FirestoreAnalyticsEvent[]): number {
    // Group by session and calculate active time
    const sessionGroups = events.reduce((acc, event) => {
      if (!acc[event.sessionId]) acc[event.sessionId] = [];
      acc[event.sessionId].push(event);
      return acc;
    }, {} as Record<string, FirestoreAnalyticsEvent[]>);

    let totalMinutes = 0;
    
    Object.values(sessionGroups).forEach(sessionEvents => {
      if (sessionEvents.length < 2) return;
      
      const sorted = sessionEvents.sort((a, b) => 
        a.metadata.timestamp.getTime() - b.metadata.timestamp.getTime()
      );
      
      const start = sorted[0].metadata.timestamp;
      const end = sorted[sorted.length - 1].metadata.timestamp;
      const duration = (end.getTime() - start.getTime()) / (1000 * 60);
      
      // Cap at 4 hours per session to avoid inflated metrics
      totalMinutes += Math.min(duration, 240);
    });

    return Math.round(totalMinutes);
  }

  private calculateEngagementScore(analytics: any): number {
    const baseScore = Math.min(analytics.dailyActiveMinutes / 60, 10) * 10;
    const interactionBonus = (analytics.postsCreated * 5) + (analytics.postsLiked * 1);
    const socialBonus = analytics.spacesVisited.length * 2;
    const toolBonus = analytics.toolsUsed.length * 3;
    
    return Math.min(100, baseScore + interactionBonus + socialBonus + toolBonus);
  }
}

// ======== COMBINED HELPERS CLASS ========

export class DatabaseHelpers {
  public rituals: RitualHelpers;
  public notifications: NotificationHelpers;
  public tools: ToolHelpers;
  public moderation: ModerationHelpers;
  public analytics: AnalyticsHelpers;

  constructor(db: Firestore) {
    this.rituals = new RitualHelpers(db);
    this.notifications = new NotificationHelpers(db);
    this.tools = new ToolHelpers(db);
    this.moderation = new ModerationHelpers(db);
    this.analytics = new AnalyticsHelpers(db);
  }
}

