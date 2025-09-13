import { db, dbAdmin } from '@/lib/firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query, 
  where, 
  getDocs,
  Timestamp,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { logger } from '@/lib/logger';
import { Ritual, RitualInstance, RecurrencePattern } from '@/lib/rituals-framework';
import { CalendarSyncService } from '@/lib/calendar-sync';

export interface ScheduledRitual {
  ritualId: string;
  nextOccurrence: Date;
  instances: RitualInstance[];
  isActive: boolean;
  lastProcessed?: Date;
}

export interface ScheduleConflict {
  ritualId: string;
  conflictingRitualId: string;
  date: Date;
  type: 'time' | 'venue' | 'participants';
  severity: 'high' | 'medium' | 'low';
}

export class RitualScheduler {
  private calendarSync: CalendarSyncService;
  private scheduledRituals: Map<string, ScheduledRitual> = new Map();
  private processingInterval: NodeJS.Timeout | null = null;

  constructor() {
    this.calendarSync = new CalendarSyncService();
  }

  /**
   * Schedule a ritual and generate its instances
   */
  async scheduleRitual(ritual: Ritual): Promise<void> {
    try {
      const instances = await this.generateInstances(ritual);
      
      // Store scheduled ritual
      const scheduled: ScheduledRitual = {
        ritualId: ritual.id!,
        nextOccurrence: instances[0]?.scheduledDate || new Date(),
        instances,
        isActive: true,
        lastProcessed: new Date()
      };

      await setDoc(doc(db, 'scheduledRituals', ritual.id!), {
        ...scheduled,
        nextOccurrence: Timestamp.fromDate(scheduled.nextOccurrence),
        lastProcessed: serverTimestamp()
      });

      this.scheduledRituals.set(ritual.id!, scheduled);

      // Sync to calendar
      if (ritual.settings?.syncToCalendar) {
        await this.syncToCalendar(ritual, instances);
      }

      logger.info('Ritual scheduled', { 
        ritualId: ritual.id,
        instanceCount: instances.length 
      });
    } catch (error) {
      logger.error('Failed to schedule ritual', { error, ritualId: ritual.id });
      throw error;
    }
  }

  /**
   * Generate instances based on recurrence pattern
   */
  private async generateInstances(
    ritual: Ritual,
    startDate: Date = new Date(),
    endDate?: Date
  ): Promise<RitualInstance[]> {
    const instances: RitualInstance[] = [];
    const pattern = ritual.recurrence;
    const maxInstances = 52; // Max one year of weekly events
    
    let currentDate = new Date(startDate);
    const finalDate = endDate || new Date(startDate.getTime() + 365 * 24 * 60 * 60 * 1000);
    let instanceCount = 0;

    while (currentDate <= finalDate && instanceCount < maxInstances) {
      if (this.matchesRecurrencePattern(currentDate, pattern)) {
        const instance: RitualInstance = {
          id: `${ritual.id}_${currentDate.getTime()}`,
          ritualId: ritual.id!,
          scheduledDate: new Date(currentDate),
          status: 'scheduled',
          participantCount: 0,
          completionRate: 0,
          createdAt: new Date()
        };

        // Check for conflicts
        const conflicts = await this.checkConflicts(instance, ritual);
        if (conflicts.length === 0 || ritual.settings?.allowConflicts) {
          instances.push(instance);
          instanceCount++;
        }
      }

      // Advance to next potential date
      currentDate = this.getNextDate(currentDate, pattern);
    }

    return instances;
  }

  /**
   * Check if date matches recurrence pattern
   */
  private matchesRecurrencePattern(date: Date, pattern: RecurrencePattern): boolean {
    switch (pattern.frequency) {
      case 'daily':
        return true;
      
      case 'weekly':
        if (pattern.daysOfWeek) {
          const dayIndex = date.getDay();
          return pattern.daysOfWeek.includes(dayIndex);
        }
        return true;
      
      case 'monthly':
        if (pattern.dayOfMonth) {
          return date.getDate() === pattern.dayOfMonth;
        }
        if (pattern.weekOfMonth && pattern.daysOfWeek) {
          const weekNumber = Math.floor((date.getDate() - 1) / 7) + 1;
          return weekNumber === pattern.weekOfMonth && 
                 pattern.daysOfWeek.includes(date.getDay());
        }
        return true;
      
      case 'custom':
        // Custom patterns handled by specific dates
        if (pattern.specificDates) {
          return pattern.specificDates.some(d => 
            d.getTime() === date.getTime()
          );
        }
        return false;
      
      default:
        return false;
    }
  }

  /**
   * Get next date based on recurrence pattern
   */
  private getNextDate(currentDate: Date, pattern: RecurrencePattern): Date {
    const next = new Date(currentDate);
    
    switch (pattern.frequency) {
      case 'daily':
        next.setDate(next.getDate() + (pattern.interval || 1));
        break;
      
      case 'weekly':
        next.setDate(next.getDate() + 7 * (pattern.interval || 1));
        break;
      
      case 'monthly':
        next.setMonth(next.getMonth() + (pattern.interval || 1));
        break;
      
      case 'custom':
        // Move to next specific date
        if (pattern.specificDates) {
          const futureDate = pattern.specificDates.find(d => d > currentDate);
          if (futureDate) {
            return new Date(futureDate);
          }
        }
        // No more dates, return far future
        next.setFullYear(next.getFullYear() + 1);
        break;
    }
    
    return next;
  }

  /**
   * Check for scheduling conflicts
   */
  private async checkConflicts(
    instance: RitualInstance,
    ritual: Ritual
  ): Promise<ScheduleConflict[]> {
    const conflicts: ScheduleConflict[] = [];
    
    try {
      // Check for time conflicts with other rituals
      const timeWindow = 2 * 60 * 60 * 1000; // 2 hours
      const startTime = new Date(instance.scheduledDate.getTime() - timeWindow);
      const endTime = new Date(instance.scheduledDate.getTime() + timeWindow);

      const conflictingInstances = await getDocs(
        query(
          collection(db, 'ritualInstances'),
          where('scheduledDate', '>=', Timestamp.fromDate(startTime)),
          where('scheduledDate', '<=', Timestamp.fromDate(endTime)),
          where('status', '==', 'scheduled')
        )
      );

      conflictingInstances.forEach(doc => {
        const data = doc.data();
        if (data.ritualId !== ritual.id) {
          conflicts.push({
            ritualId: ritual.id!,
            conflictingRitualId: data.ritualId,
            date: instance.scheduledDate,
            type: 'time',
            severity: this.calculateConflictSeverity(ritual, data)
          });
        }
      });

      // Check venue conflicts if applicable
      if (ritual.location?.venue) {
        const venueConflicts = await getDocs(
          query(
            collection(db, 'ritualInstances'),
            where('venue', '==', ritual.location.venue),
            where('scheduledDate', '>=', Timestamp.fromDate(startTime)),
            where('scheduledDate', '<=', Timestamp.fromDate(endTime))
          )
        );

        venueConflicts.forEach(doc => {
          const data = doc.data();
          if (data.ritualId !== ritual.id && !conflicts.some(c => c.conflictingRitualId === data.ritualId)) {
            conflicts.push({
              ritualId: ritual.id!,
              conflictingRitualId: data.ritualId,
              date: instance.scheduledDate,
              type: 'venue',
              severity: 'high'
            });
          }
        });
      }
    } catch (error) {
      logger.error('Failed to check conflicts', { error, instanceId: instance.id });
    }

    return conflicts;
  }

  /**
   * Calculate conflict severity
   */
  private calculateConflictSeverity(ritual: Ritual, conflictingData: any): 'high' | 'medium' | 'low' {
    // High severity if both are mandatory or have same target audience
    if (ritual.participation.isMandatory || conflictingData.isMandatory) {
      return 'high';
    }
    
    // Medium severity if overlapping participant requirements
    if (ritual.participation.maxParticipants && conflictingData.maxParticipants) {
      return 'medium';
    }
    
    // Low severity for optional events
    return 'low';
  }

  /**
   * Sync ritual instances to calendar
   */
  private async syncToCalendar(ritual: Ritual, instances: RitualInstance[]): Promise<void> {
    try {
      const calendarEvents = instances.map(instance => ({
        id: instance.id,
        title: ritual.name,
        description: ritual.description,
        type: 'ritual' as const,
        startTime: instance.scheduledDate,
        endTime: new Date(instance.scheduledDate.getTime() + (ritual.duration || 60) * 60 * 1000),
        location: ritual.location?.displayName,
        ritualId: ritual.id,
        recurrence: ritual.recurrence,
        sourceType: 'ritual' as const,
        sourceId: ritual.id!
      }));

      for (const event of calendarEvents) {
        await this.calendarSync.syncEvent(event, ritual.spaceId!);
      }
    } catch (error) {
      logger.error('Failed to sync ritual to calendar', { error, ritualId: ritual.id });
    }
  }

  /**
   * Update ritual schedule
   */
  async updateSchedule(ritualId: string, updates: Partial<ScheduledRitual>): Promise<void> {
    try {
      await updateDoc(doc(db, 'scheduledRituals', ritualId), {
        ...updates,
        lastProcessed: serverTimestamp()
      });

      const current = this.scheduledRituals.get(ritualId);
      if (current) {
        this.scheduledRituals.set(ritualId, { ...current, ...updates });
      }
    } catch (error) {
      logger.error('Failed to update schedule', { error, ritualId });
      throw error;
    }
  }

  /**
   * Cancel scheduled ritual
   */
  async cancelSchedule(ritualId: string): Promise<void> {
    try {
      // Cancel all future instances
      const instances = await getDocs(
        query(
          collection(db, 'ritualInstances'),
          where('ritualId', '==', ritualId),
          where('status', '==', 'scheduled'),
          where('scheduledDate', '>=', Timestamp.fromDate(new Date()))
        )
      );

      const batch = writeBatch(db);
      instances.forEach(doc => {
        batch.update(doc.ref, { status: 'cancelled' });
      });
      await batch.commit();

      // Update scheduled ritual
      await this.updateSchedule(ritualId, { isActive: false });

      // Remove from calendar
      await this.calendarSync.removeRitualEvents(ritualId);

      logger.info('Ritual schedule cancelled', { ritualId });
    } catch (error) {
      logger.error('Failed to cancel schedule', { error, ritualId });
      throw error;
    }
  }

  /**
   * Process scheduled rituals (run periodically)
   */
  async processScheduledRituals(): Promise<void> {
    try {
      const now = new Date();
      const upcomingWindow = 24 * 60 * 60 * 1000; // 24 hours

      const scheduledDocs = await getDocs(
        query(
          collection(db, 'scheduledRituals'),
          where('isActive', '==', true),
          where('nextOccurrence', '<=', Timestamp.fromDate(new Date(now.getTime() + upcomingWindow)))
        )
      );

      for (const doc of scheduledDocs.docs) {
        const scheduled = doc.data() as ScheduledRitual;
        
        // Process instances that need to be activated
        for (const instance of scheduled.instances) {
          if (instance.status === 'scheduled' && 
              instance.scheduledDate <= new Date(now.getTime() + upcomingWindow)) {
            await this.activateInstance(instance);
          }
        }

        // Generate more instances if needed
        if (scheduled.instances.length < 10) {
          const ritual = await this.getRitual(scheduled.ritualId);
          if (ritual) {
            const lastInstance = scheduled.instances[scheduled.instances.length - 1];
            const newInstances = await this.generateInstances(
              ritual,
              lastInstance?.scheduledDate || now
            );
            scheduled.instances.push(...newInstances);
            await this.updateSchedule(scheduled.ritualId, { instances: scheduled.instances });
          }
        }
      }
    } catch (error) {
      logger.error('Failed to process scheduled rituals', { error });
    }
  }

  /**
   * Activate a ritual instance
   */
  private async activateInstance(instance: RitualInstance): Promise<void> {
    try {
      // Update instance status
      await updateDoc(doc(db, 'ritualInstances', instance.id), {
        status: 'active',
        activatedAt: serverTimestamp()
      });

      // Send notifications to participants
      await this.sendInstanceNotifications(instance);

      logger.info('Ritual instance activated', { instanceId: instance.id });
    } catch (error) {
      logger.error('Failed to activate instance', { error, instanceId: instance.id });
    }
  }

  /**
   * Send notifications for instance
   */
  private async sendInstanceNotifications(instance: RitualInstance): Promise<void> {
    // Implementation would send push notifications, emails, etc.
    // This is a placeholder for the notification logic
    logger.info('Sending notifications for instance', { instanceId: instance.id });
  }

  /**
   * Get ritual by ID
   */
  private async getRitual(ritualId: string): Promise<Ritual | null> {
    try {
      const ritualDoc = await getDocs(
        query(collection(db, 'rituals'), where('id', '==', ritualId))
      );
      
      if (!ritualDoc.empty) {
        return ritualDoc.docs[0].data() as Ritual;
      }
      return null;
    } catch (error) {
      logger.error('Failed to get ritual', { error, ritualId });
      return null;
    }
  }

  /**
   * Start automatic processing
   */
  startAutoProcessing(intervalMs: number = 60 * 60 * 1000): void {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
    }
    
    this.processingInterval = setInterval(() => {
      this.processScheduledRituals();
    }, intervalMs);

    // Process immediately
    this.processScheduledRituals();
  }

  /**
   * Stop automatic processing
   */
  stopAutoProcessing(): void {
    if (this.processingInterval) {
      clearInterval(this.processingInterval);
      this.processingInterval = null;
    }
  }
}

// Export singleton instance
export const ritualScheduler = new RitualScheduler();