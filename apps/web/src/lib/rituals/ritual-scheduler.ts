import { dbAdmin } from '@/lib/firebase-admin';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { logger } from '@/lib/logger';
import { addDays, addWeeks, addMonths, setHours, setMinutes, startOfDay, endOfDay, isWithinInterval } from 'date-fns';

export interface RitualSchedule {
  id: string;
  ritualId: string;
  frequency: 'once' | 'daily' | 'weekly' | 'monthly' | 'semester';
  dayOfWeek?: number; // 0-6, Sunday to Saturday
  dayOfMonth?: number; // 1-31
  timeOfDay?: string; // HH:mm format
  startDate: Date;
  endDate?: Date;
  nextOccurrence: Date;
  lastOccurrence?: Date;
  timezone: string;
  isActive: boolean;
}

export interface RitualReminder {
  id: string;
  ritualId: string;
  scheduleId: string;
  userId: string;
  reminderTime: Date;
  type: 'email' | 'push' | 'in-app';
  sent: boolean;
  sentAt?: Date;
  message: string;
}

export class RitualScheduler {
  /**
   * Schedule a recurring ritual
   */
  static async scheduleRitual(
    ritualId: string,
    schedule: Omit<RitualSchedule, 'id' | 'nextOccurrence' | 'lastOccurrence'>
  ): Promise<string> {
    try {
      const nextOccurrence = this.calculateNextOccurrence(schedule);
      
      const scheduleDoc = await dbAdmin.collection('ritualSchedules').add({
        ...schedule,
        ritualId,
        nextOccurrence: Timestamp.fromDate(nextOccurrence),
        isActive: true,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });

      logger.info('Ritual scheduled', { 
        scheduleId: scheduleDoc.id, 
        ritualId, 
        nextOccurrence 
      });

      // Set up initial reminders
      await this.createRemindersForNextOccurrence(ritualId, scheduleDoc.id, nextOccurrence);

      return scheduleDoc.id;
    } catch (error) {
      logger.error('Failed to schedule ritual', { error, ritualId });
      throw error;
    }
  }

  /**
   * Calculate the next occurrence based on schedule
   */
  static calculateNextOccurrence(schedule: Partial<RitualSchedule>): Date {
    const now = new Date();
    let nextDate = schedule.startDate || now;

    // Make sure we're calculating a future date
    while (nextDate <= now) {
      switch (schedule.frequency) {
        case 'daily':
          nextDate = addDays(nextDate, 1);
          break;
        case 'weekly':
          nextDate = addWeeks(nextDate, 1);
          break;
        case 'monthly':
          nextDate = addMonths(nextDate, 1);
          break;
        case 'semester':
          // Assume semester is roughly 4 months
          nextDate = addMonths(nextDate, 4);
          break;
        default:
          // For 'once', just return the start date
          return nextDate;
      }
    }

    // Apply time of day if specified
    if (schedule.timeOfDay) {
      const [hours, minutes] = schedule.timeOfDay.split(':').map(Number);
      nextDate = setHours(setMinutes(nextDate, minutes), hours);
    }

    return nextDate;
  }

  /**
   * Create reminders for upcoming ritual
   */
  static async createRemindersForNextOccurrence(
    ritualId: string,
    scheduleId: string,
    occurrenceTime: Date
  ): Promise<void> {
    try {
      // Get participants for this ritual
      const participantsSnapshot = await dbAdmin
        .collection('rituals')
        .doc(ritualId)
        .collection('participants')
        .where('isActive', '==', true)
        .get();

      if (participantsSnapshot.empty) {
        logger.info('No active participants for ritual reminders', { ritualId });
        return;
      }

      // Create reminders for each participant
      const reminderBatch = dbAdmin.batch();
      const reminders: RitualReminder[] = [];

      // Create reminders at different intervals
      const reminderIntervals = [
        { minutes: 1440, message: '1 day until' }, // 1 day before
        { minutes: 60, message: '1 hour until' },   // 1 hour before
        { minutes: 15, message: '15 minutes until' } // 15 minutes before
      ];

      for (const participant of participantsSnapshot.docs) {
        const userId = participant.data().userId;

        for (const interval of reminderIntervals) {
          const reminderTime = new Date(occurrenceTime.getTime() - interval.minutes * 60000);
          
          // Only create future reminders
          if (reminderTime > new Date()) {
            const reminderRef = dbAdmin.collection('ritualReminders').doc();
            
            reminders.push({
              id: reminderRef.id,
              ritualId,
              scheduleId,
              userId,
              reminderTime,
              type: 'in-app',
              sent: false,
              message: `${interval.message} the ritual starts!`
            });

            reminderBatch.set(reminderRef, {
              ritualId,
              scheduleId,
              userId,
              reminderTime: Timestamp.fromDate(reminderTime),
              type: 'in-app',
              sent: false,
              message: `${interval.message} the ritual starts!`,
              createdAt: FieldValue.serverTimestamp()
            });
          }
        }
      }

      await reminderBatch.commit();
      logger.info('Created ritual reminders', { 
        count: reminders.length, 
        ritualId, 
        scheduleId 
      });

    } catch (error) {
      logger.error('Failed to create reminders', { error, ritualId, scheduleId });
    }
  }

  /**
   * Process due reminders (should be called periodically)
   */
  static async processDueReminders(): Promise<void> {
    try {
      const now = new Date();
      
      // Get all unsent reminders that are due
      const dueReminders = await dbAdmin
        .collection('ritualReminders')
        .where('sent', '==', false)
        .where('reminderTime', '<=', Timestamp.fromDate(now))
        .limit(100)
        .get();

      if (dueReminders.empty) {
        return;
      }

      logger.info('Processing due reminders', { count: dueReminders.size });

      // Process each reminder
      const batch = dbAdmin.batch();
      const notifications: any[] = [];

      for (const doc of dueReminders.docs) {
        const reminder = doc.data() as RitualReminder;
        
        // Create notification
        notifications.push({
          userId: reminder.userId,
          type: 'ritual_reminder',
          title: 'Ritual Reminder',
          message: reminder.message,
          data: {
            ritualId: reminder.ritualId,
            scheduleId: reminder.scheduleId
          }
        });

        // Mark reminder as sent
        batch.update(doc.ref, {
          sent: true,
          sentAt: FieldValue.serverTimestamp()
        });
      }

      // Send notifications (would integrate with FCM or other service)
      await this.sendNotifications(notifications);

      // Commit the batch update
      await batch.commit();

      logger.info('Processed reminders successfully', { count: notifications.length });

    } catch (error) {
      logger.error('Failed to process reminders', { error });
    }
  }

  /**
   * Send notifications to users
   */
  private static async sendNotifications(notifications: any[]): Promise<void> {
    // In production, this would integrate with FCM or another push notification service
    // For now, we'll store them as in-app notifications
    
    const batch = dbAdmin.batch();
    
    for (const notification of notifications) {
      const notifRef = dbAdmin
        .collection('users')
        .doc(notification.userId)
        .collection('notifications')
        .doc();
      
      batch.set(notifRef, {
        ...notification,
        read: false,
        createdAt: FieldValue.serverTimestamp()
      });
    }

    await batch.commit();
  }

  /**
   * Update schedule after ritual completes
   */
  static async updateScheduleAfterCompletion(scheduleId: string): Promise<void> {
    try {
      const scheduleRef = dbAdmin.collection('ritualSchedules').doc(scheduleId);
      const scheduleDoc = await scheduleRef.get();

      if (!scheduleDoc.exists) {
        throw new Error('Schedule not found');
      }

      const schedule = scheduleDoc.data() as RitualSchedule;

      // Calculate next occurrence
      const nextOccurrence = this.calculateNextOccurrence(schedule);

      // Check if ritual should continue
      const shouldContinue = !schedule.endDate || nextOccurrence <= schedule.endDate;

      if (shouldContinue) {
        // Update with next occurrence
        await scheduleRef.update({
          lastOccurrence: FieldValue.serverTimestamp(),
          nextOccurrence: Timestamp.fromDate(nextOccurrence),
          updatedAt: FieldValue.serverTimestamp()
        });

        // Create reminders for next occurrence
        await this.createRemindersForNextOccurrence(
          schedule.ritualId,
          scheduleId,
          nextOccurrence
        );
      } else {
        // Mark schedule as inactive
        await scheduleRef.update({
          isActive: false,
          lastOccurrence: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp()
        });
      }

    } catch (error) {
      logger.error('Failed to update schedule', { error, scheduleId });
    }
  }

  /**
   * Get upcoming rituals for a user
   */
  static async getUpcomingRituals(userId: string, limit = 10): Promise<any[]> {
    try {
      // Get user's ritual participations
      const participations = await dbAdmin
        .collectionGroup('participants')
        .where('userId', '==', userId)
        .where('isActive', '==', true)
        .get();

      if (participations.empty) {
        return [];
      }

      const ritualIds = participations.docs.map(doc => doc.ref.parent.parent?.id).filter(Boolean);

      // Get active schedules for these rituals
      const now = new Date();
      const schedules = await dbAdmin
        .collection('ritualSchedules')
        .where('ritualId', 'in', ritualIds)
        .where('isActive', '==', true)
        .where('nextOccurrence', '>=', Timestamp.fromDate(now))
        .orderBy('nextOccurrence', 'asc')
        .limit(limit)
        .get();

      // Fetch ritual details
      const upcomingRituals = [];
      for (const scheduleDoc of schedules.docs) {
        const schedule = scheduleDoc.data();
        const ritualDoc = await dbAdmin.collection('rituals').doc(schedule.ritualId).get();
        
        if (ritualDoc.exists) {
          upcomingRituals.push({
            ...ritualDoc.data(),
            id: ritualDoc.id,
            scheduleId: scheduleDoc.id,
            nextOccurrence: schedule.nextOccurrence?.toDate ? nextOccurrence.toDate() : new Date(nextOccurrence),
            frequency: schedule.frequency
          });
        }
      }

      return upcomingRituals;

    } catch (error) {
      logger.error('Failed to get upcoming rituals', { error, userId });
      return [];
    }
  }
}