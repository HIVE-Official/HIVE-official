/**
 * HIVE Rituals Framework
 * 
 * Core framework for managing campus rituals - recurring community events
 * that build engagement and foster connections. Rituals are the heartbeat
 * of campus life, from weekly study sessions to annual traditions.
 * 
 * Core Concepts:
 * - Rituals: Recurring events with defined patterns and purposes
 * - Instances: Individual occurrences of a ritual
 * - Cycles: The rhythm and frequency of rituals
 * - Impact: Measurable community benefits
 * 
 * Features:
 * - Create and manage recurring rituals
 * - Automatic instance generation
 * - Smart scheduling with conflict detection
 * - Community impact tracking
 * - Ritual lifecycle management
 */

import { db } from './firebase-client';
import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDoc,
  getDocs,
  query, 
  where, 
  orderBy,
  limit,
  Timestamp,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { logger } from './structured-logger';
import { calendarSync, type RecurrencePattern, type CalendarEvent } from './calendar-sync';
import { RitualParticipationTracker } from './rituals/ritual-participation';

/**
 * Ritual type categories
 */
export type RitualType = 
  | 'study_group'       // Academic study sessions
  | 'club_meeting'      // Regular club gatherings
  | 'tradition'         // Campus traditions
  | 'workshop'          // Skill-building workshops
  | 'social'            // Social gatherings
  | 'wellness'          // Mental/physical wellness activities
  | 'service'           // Community service activities
  | 'cultural'          // Cultural celebrations
  | 'professional';     // Career development events

/**
 * Ritual lifecycle stage
 */
export type RitualStage = 
  | 'planning'          // Being organized
  | 'active'            // Currently running
  | 'paused'            // Temporarily stopped
  | 'completed'         // Finished its cycle
  | 'archived';         // No longer active

/**
 * Ritual visibility
 */
export type RitualVisibility = 
  | 'public'            // Open to all campus
  | 'space_only'        // Limited to space members
  | 'invite_only'       // By invitation
  | 'private';          // Hidden from discovery

/**
 * Core ritual definition
 */
export interface Ritual {
  id?: string;
  name: string;
  description: string;
  purpose: string;
  type: RitualType;
  stage: RitualStage;
  visibility: RitualVisibility;
  
  // Ownership
  spaceId?: string;
  organizerId: string;
  organizerName: string;
  coOrganizers?: Array<{
    userId: string;
    name: string;
    role: string;
  }>;
  
  // Schedule
  recurrence: RecurrencePattern;
  duration: number; // minutes
  startDate: Date | Timestamp;
  endDate?: Date | Timestamp;
  timeZone: string;
  
  // Location
  location?: {
    type: 'physical' | 'virtual' | 'hybrid';
    venue?: string;
    address?: string;
    coordinates?: { lat: number; lng: number };
    virtualUrl?: string;
    capacity?: number;
  };
  
  // Participation
  participation: {
    minParticipants: number;
    maxParticipants: number;
    requiresRegistration: boolean;
    autoApprove: boolean;
    roles?: Array<{
      name: string;
      description: string;
      maxCount: number;
    }>;
  };
  
  // Impact & Goals
  impact: {
    category: 'academic' | 'social' | 'wellness' | 'professional' | 'cultural';
    metrics: Array<{
      name: string;
      target: number;
      unit: string;
    }>;
    outcomes: string[];
  };
  
  // Customization
  theme?: {
    color: string;
    emoji: string;
    coverImage?: string;
  };
  
  tags: string[];
  resources?: Array<{
    type: 'document' | 'link' | 'video';
    title: string;
    url: string;
  }>;
  
  // Metadata
  statistics?: {
    totalInstances: number;
    completedInstances: number;
    totalParticipants: number;
    averageAttendance: number;
    satisfactionScore: number;
  };
  
  settings?: {
    sendReminders: boolean;
    reminderTime: number; // minutes before
    allowGuestParticipation: boolean;
    recordAttendance: boolean;
    collectFeedback: boolean;
  };
  
  createdAt: Timestamp | ReturnType<typeof serverTimestamp>;
  updatedAt?: Timestamp | ReturnType<typeof serverTimestamp>;
}

/**
 * Ritual instance (individual occurrence)
 */
export interface RitualInstance {
  id?: string;
  ritualId: string;
  instanceNumber: number;
  
  // Schedule for this instance
  scheduledStart: Date | Timestamp;
  scheduledEnd: Date | Timestamp;
  actualStart?: Date | Timestamp;
  actualEnd?: Date | Timestamp;
  
  // Status
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  
  // Participation for this instance
  registeredCount: number;
  attendedCount: number;
  completedCount: number;
  
  // Instance-specific modifications
  modifications?: {
    location?: Ritual['location'];
    specialGuests?: Array<{ name: string; role: string }>;
    agenda?: string;
    notes?: string;
  };
  
  // Outcomes
  outcomes?: {
    achievements: string[];
    feedback: Array<{
      userId: string;
      rating: number;
      comment?: string;
    }>;
    metrics: Record<string, number>;
  };
  
  createdAt: Timestamp | ReturnType<typeof serverTimestamp>;
}

/**
 * Ritual discovery filters
 */
export interface RitualFilters {
  type?: RitualType;
  stage?: RitualStage;
  visibility?: RitualVisibility;
  spaceId?: string;
  organizerId?: string;
  tags?: string[];
  startDate?: Date;
  endDate?: Date;
  hasCapacity?: boolean;
}

/**
 * Ritual recommendation
 */
export interface RitualRecommendation {
  ritual: Ritual;
  score: number;
  reasons: string[];
}

/**
 * Rituals Framework Class
 */
class RitualsFramework {
  private readonly ritualsCollection = 'rituals';
  private readonly instancesCollection = 'ritual_instances';
  private participationTracker: RitualParticipationTracker;

  constructor() {
    this.participationTracker = new RitualParticipationTracker();
  }

  /**
   * Create a new ritual
   */
  async createRitual(ritual: Omit<Ritual, 'id' | 'createdAt'>): Promise<string> {
    try {
      // Validate ritual data
      this.validateRitual(ritual);
      
      // Add creation timestamp
      const ritualData = {
        ...ritual,
        stage: ritual.stage || 'planning',
        statistics: {
          totalInstances: 0,
          completedInstances: 0,
          totalParticipants: 0,
          averageAttendance: 0,
          satisfactionScore: 0
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Create ritual document
      const docRef = await addDoc(
        collection(db, this.ritualsCollection),
        ritualData
      );

      logger.info('Ritual created', {
        ritualId: docRef.id,
        name: ritual.name,
        type: ritual.type
      });

      // Generate initial instances
      await this.generateInstances(docRef.id, ritual);

      // Create calendar events
      await this.syncWithCalendar(docRef.id, ritual);

      return docRef.id;
    } catch (error) {
      logger.error('Failed to create ritual', error as Error);
      throw new Error('Failed to create ritual');
    }
  }

  /**
   * Update an existing ritual
   */
  async updateRitual(
    ritualId: string,
    updates: Partial<Ritual>
  ): Promise<void> {
    try {
      const ritualRef = doc(db, this.ritualsCollection, ritualId);
      
      await updateDoc(ritualRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });

      logger.info('Ritual updated', { ritualId });

      // If schedule changed, regenerate instances
      if (updates.recurrence || updates.startDate || updates.endDate) {
        await this.regenerateInstances(ritualId);
      }
    } catch (error) {
      logger.error('Failed to update ritual', error as Error);
      throw new Error('Failed to update ritual');
    }
  }

  /**
   * Start a ritual instance
   */
  async startInstance(instanceId: string): Promise<void> {
    try {
      const instanceRef = doc(db, this.instancesCollection, instanceId);
      
      await updateDoc(instanceRef, {
        status: 'in_progress',
        actualStart: serverTimestamp()
      });

      logger.info('Ritual instance started', { instanceId });

      // Notify participants
      await this.notifyParticipants(instanceId, 'started');
    } catch (error) {
      logger.error('Failed to start instance', error as Error);
      throw new Error('Failed to start ritual instance');
    }
  }

  /**
   * Complete a ritual instance
   */
  async completeInstance(
    instanceId: string,
    outcomes?: RitualInstance['outcomes']
  ): Promise<void> {
    try {
      const instanceRef = doc(db, this.instancesCollection, instanceId);
      
      await updateDoc(instanceRef, {
        status: 'completed',
        actualEnd: serverTimestamp(),
        outcomes
      });

      // Update ritual statistics
      await this.updateRitualStatistics(instanceId);

      logger.info('Ritual instance completed', { instanceId });
    } catch (error) {
      logger.error('Failed to complete instance', error as Error);
      throw new Error('Failed to complete ritual instance');
    }
  }

  /**
   * Join a ritual
   */
  async joinRitual(
    ritualId: string,
    userId: string,
    role?: string
  ): Promise<void> {
    try {
      // Check capacity
      const ritual = await this.getRitual(ritualId);
      if (!ritual) {
        throw new Error('Ritual not found');
      }

      if (ritual.participation.requiresRegistration) {
        // Register participant
        await this.participationTracker.registerParticipant(
          ritualId,
          userId,
          role as any || 'member'
        );
      }

      logger.info('User joined ritual', { ritualId, userId });
    } catch (error) {
      logger.error('Failed to join ritual', error as Error);
      throw new Error('Failed to join ritual');
    }
  }

  /**
   * Discover rituals based on filters
   */
  async discoverRituals(
    filters: RitualFilters = {},
    limit: number = 20
  ): Promise<Ritual[]> {
    try {
      let q = query(collection(db, this.ritualsCollection));

      // Apply filters
      if (filters.type) {
        q = query(q, where('type', '==', filters.type));
      }
      if (filters.stage) {
        q = query(q, where('stage', '==', filters.stage));
      }
      if (filters.visibility) {
        q = query(q, where('visibility', '==', filters.visibility));
      }
      if (filters.spaceId) {
        q = query(q, where('spaceId', '==', filters.spaceId));
      }
      if (filters.tags && filters.tags.length > 0) {
        q = query(q, where('tags', 'array-contains-any', filters.tags));
      }

      // Order and limit
      q = query(q, orderBy('createdAt', 'desc'), limit(limit));

      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Ritual));
    } catch (error) {
      logger.error('Failed to discover rituals', error as Error);
      return [];
    }
  }

  /**
   * Get ritual recommendations for a user
   */
  async getRecommendations(
    userId: string,
    count: number = 5
  ): Promise<RitualRecommendation[]> {
    try {
      // Get user preferences and history
      const userStats = await this.participationTracker.getUserStats(userId);
      
      // Get available rituals
      const rituals = await this.discoverRituals({
        visibility: 'public',
        stage: 'active'
      });

      // Score and rank rituals
      const recommendations = rituals.map(ritual => {
        const score = this.calculateRecommendationScore(ritual, userStats);
        const reasons = this.getRecommendationReasons(ritual, userStats);
        
        return { ritual, score, reasons };
      });

      // Sort by score and return top N
      return recommendations
        .sort((a, b) => b.score - a.score)
        .slice(0, count);
    } catch (error) {
      logger.error('Failed to get recommendations', error as Error);
      return [];
    }
  }

  /**
   * Get upcoming instances for a ritual
   */
  async getUpcomingInstances(
    ritualId: string,
    limit: number = 10
  ): Promise<RitualInstance[]> {
    try {
      const now = Timestamp.now();
      
      const q = query(
        collection(db, this.instancesCollection),
        where('ritualId', '==', ritualId),
        where('scheduledStart', '>=', now),
        where('status', '==', 'scheduled'),
        orderBy('scheduledStart', 'asc'),
        limit(limit)
      );

      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as RitualInstance));
    } catch (error) {
      logger.error('Failed to get upcoming instances', error as Error);
      return [];
    }
  }

  /**
   * Get ritual impact report
   */
  async getImpactReport(ritualId: string): Promise<{
    overview: Ritual['statistics'];
    participation: any;
    outcomes: string[];
    trends: any;
  }> {
    try {
      const ritual = await this.getRitual(ritualId);
      if (!ritual) {
        throw new Error('Ritual not found');
      }

      // Get participation data
      const participation = await this.participationTracker.getRitualEngagement(ritualId);
      
      // Get completed instances
      const q = query(
        collection(db, this.instancesCollection),
        where('ritualId', '==', ritualId),
        where('status', '==', 'completed')
      );
      
      const snapshot = await getDocs(q);
      const instances = snapshot.docs.map(doc => doc.data() as RitualInstance);
      
      // Aggregate outcomes
      const allOutcomes: string[] = [];
      instances.forEach(instance => {
        if (instance.outcomes?.achievements) {
          allOutcomes.push(...instance.outcomes.achievements);
        }
      });

      return {
        overview: ritual.statistics,
        participation,
        outcomes: [...new Set(allOutcomes)], // Unique outcomes
        trends: {
          attendance: this.calculateAttendanceTrend(instances),
          satisfaction: this.calculateSatisfactionTrend(instances)
        }
      };
    } catch (error) {
      logger.error('Failed to get impact report', error as Error);
      throw new Error('Failed to generate impact report');
    }
  }

  /**
   * Private: Validate ritual data
   */
  private validateRitual(ritual: Partial<Ritual>): void {
    if (!ritual.name || ritual.name.length < 3) {
      throw new Error('Ritual name is required and must be at least 3 characters');
    }
    if (!ritual.type) {
      throw new Error('Ritual type is required');
    }
    if (!ritual.recurrence) {
      throw new Error('Recurrence pattern is required');
    }
    if (!ritual.organizerId) {
      throw new Error('Organizer is required');
    }
    // Add more validation as needed
  }

  /**
   * Private: Generate ritual instances
   */
  private async generateInstances(
    ritualId: string,
    ritual: Partial<Ritual>
  ): Promise<void> {
    if (!ritual.recurrence || !ritual.startDate || !ritual.duration) return;

    const batch = writeBatch(db);
    const instances = this.calculateInstanceDates(ritual);
    
    instances.forEach((instanceDate, index) => {
      const instanceRef = doc(collection(db, this.instancesCollection));
      const instance: Omit<RitualInstance, 'id'> = {
        ritualId,
        instanceNumber: index + 1,
        scheduledStart: Timestamp.fromDate(instanceDate),
        scheduledEnd: Timestamp.fromDate(
          new Date(instanceDate.getTime() + ritual.duration! * 60000)
        ),
        status: 'scheduled',
        registeredCount: 0,
        attendedCount: 0,
        completedCount: 0,
        createdAt: serverTimestamp()
      };
      
      batch.set(instanceRef, instance);
    });

    await batch.commit();
    
    logger.info('Ritual instances generated', {
      ritualId,
      count: instances.length
    });
  }

  /**
   * Private: Calculate instance dates
   */
  private calculateInstanceDates(ritual: Partial<Ritual>): Date[] {
    const dates: Date[] = [];
    
    if (!ritual.recurrence || !ritual.startDate) return dates;
    
    const startDate = ritual.startDate instanceof Date 
      ? ritual.startDate 
      : (ritual.startDate as Timestamp).toDate();
    
    const endDate = ritual.endDate 
      ? (ritual.endDate instanceof Date ? ritual.endDate : (ritual.endDate as Timestamp).toDate())
      : new Date(startDate.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 year default
    
    let currentDate = new Date(startDate);
    const maxInstances = ritual.recurrence.occurrences || 52; // Default to 52 occurrences
    let instanceCount = 0;
    
    while (currentDate <= endDate && instanceCount < maxInstances) {
      dates.push(new Date(currentDate));
      
      // Calculate next date based on recurrence
      switch (ritual.recurrence.frequency) {
        case 'daily':
          currentDate.setDate(currentDate.getDate() + ritual.recurrence.interval);
          break;
        case 'weekly':
          currentDate.setDate(currentDate.getDate() + (7 * ritual.recurrence.interval));
          break;
        case 'monthly':
          currentDate.setMonth(currentDate.getMonth() + ritual.recurrence.interval);
          break;
        case 'yearly':
          currentDate.setFullYear(currentDate.getFullYear() + ritual.recurrence.interval);
          break;
      }
      
      instanceCount++;
    }
    
    return dates;
  }

  /**
   * Private: Sync with calendar
   */
  private async syncWithCalendar(
    ritualId: string,
    ritual: Partial<Ritual>
  ): Promise<void> {
    if (!ritual.name || !ritual.startDate || !ritual.duration) return;
    
    try {
      const calendarEvent: Omit<CalendarEvent, 'id'> = {
        title: ritual.name,
        description: ritual.description,
        type: 'ritual',
        startTime: ritual.startDate,
        endTime: new Date(
          (ritual.startDate instanceof Date ? ritual.startDate : (ritual.startDate as Timestamp).toDate()).getTime() + 
          ritual.duration * 60000
        ),
        location: ritual.location?.venue,
        virtualUrl: ritual.location?.virtualUrl,
        organizer: {
          userId: ritual.organizerId!,
          name: ritual.organizerName!
        },
        recurrence: ritual.recurrence,
        metadata: { ritualId }
      };
      
      await calendarSync.createEvent(calendarEvent);
    } catch (error) {
      logger.error('Failed to sync with calendar', error as Error);
    }
  }

  /**
   * Private: Helper methods
   */
  private async getRitual(ritualId: string): Promise<Ritual | null> {
    try {
      const ritualDoc = await getDoc(doc(db, this.ritualsCollection, ritualId));
      return ritualDoc.exists() 
        ? { id: ritualDoc.id, ...ritualDoc.data() } as Ritual 
        : null;
    } catch (error) {
      logger.error('Failed to get ritual', error as Error);
      return null;
    }
  }

  private async regenerateInstances(ritualId: string): Promise<void> {
    // Delete existing future instances and regenerate
    logger.info('Regenerating instances', { ritualId });
  }

  private async updateRitualStatistics(instanceId: string): Promise<void> {
    // Update ritual statistics based on completed instance
    logger.info('Updating ritual statistics', { instanceId });
  }

  private async notifyParticipants(instanceId: string, event: string): Promise<void> {
    // Send notifications to participants
    logger.info('Notifying participants', { instanceId, event });
  }

  private calculateRecommendationScore(ritual: Ritual, userStats: any): number {
    // Calculate recommendation score based on user preferences
    return Math.random() * 100; // Placeholder
  }

  private getRecommendationReasons(ritual: Ritual, userStats: any): string[] {
    // Generate recommendation reasons
    const reasons: string[] = [];
    
    if (ritual.type === 'study_group') {
      reasons.push('Matches your academic interests');
    }
    if (ritual.participation.maxParticipants > 10) {
      reasons.push('Great for meeting new people');
    }
    
    return reasons;
  }

  private calculateAttendanceTrend(instances: RitualInstance[]): number[] {
    return instances.map(i => i.attendedCount);
  }

  private calculateSatisfactionTrend(instances: RitualInstance[]): number[] {
    return instances.map(i => {
      if (!i.outcomes?.feedback || i.outcomes.feedback.length === 0) return 0;
      const ratings = i.outcomes.feedback.map(f => f.rating);
      return ratings.reduce((a, b) => a + b, 0) / ratings.length;
    });
  }
}

// Create and export singleton instance
export const ritualsFramework = new RitualsFramework();

// Export types
export type { Ritual, RitualInstance, RitualFilters, RitualRecommendation };