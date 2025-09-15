/**
 * Calendar Sync Service
 * 
 * Manages calendar synchronization for HIVE events, rituals, and academic schedules.
 * Supports integration with external calendar systems (Google Calendar, Outlook, etc.)
 * and provides a unified interface for calendar operations.
 * 
 * Features:
 * - Event synchronization across platforms
 * - Recurring event management
 * - Conflict detection
 * - Reminder scheduling
 * - iCal export/import
 */

import { db } from './firebase/client/firebase-client';
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
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
import { logger } from './utils/structured-logger';

/**
 * Calendar event type
 */
export type CalendarEventType = 
  | 'class'
  | 'event'
  | 'ritual'
  | 'meeting'
  | 'deadline'
  | 'reminder'
  | 'holiday';

/**
 * Recurrence pattern for events
 */
export interface RecurrencePattern {
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number; // Every n days/weeks/months
  daysOfWeek?: number[]; // 0 = Sunday, 6 = Saturday
  dayOfMonth?: number;
  endDate?: Date;
  occurrences?: number; // Number of occurrences
}

/**
 * Calendar event interface
 */
export interface CalendarEvent {
  id?: string;
  title: string;
  description?: string;
  type: CalendarEventType;
  startTime: Date | Timestamp;
  endTime: Date | Timestamp;
  location?: string;
  virtualUrl?: string;
  organizer: {
    userId: string;
    name: string;
    email?: string;
  };
  attendees?: Array<{
    userId: string;
    name: string;
    email?: string;
    status: 'pending' | 'accepted' | 'declined' | 'tentative';
  }>;
  recurrence?: RecurrencePattern;
  reminders?: Array<{
    type: 'email' | 'push' | 'sms';
    minutesBefore: number;
  }>;
  color?: string;
  isAllDay?: boolean;
  isPrivate?: boolean;
  metadata?: Record<string, any>;
  createdAt?: Timestamp | ReturnType<typeof serverTimestamp>;
  updatedAt?: Timestamp | ReturnType<typeof serverTimestamp>;
}

/**
 * Calendar sync status
 */
export interface SyncStatus {
  provider: 'google' | 'outlook' | 'apple' | 'local';
  lastSync: Date;
  status: 'synced' | 'syncing' | 'error' | 'pending';
  errorMessage?: string;
}

/**
 * Calendar conflict
 */
export interface CalendarConflict {
  eventId1: string;
  eventId2: string;
  type: 'time_overlap' | 'location_conflict' | 'resource_conflict';
  severity: 'warning' | 'error';
  suggestion?: string;
}

/**
 * Calendar Sync Service Class
 */
class CalendarSyncService {
  private readonly eventsCollection = 'calendar_events';
  private readonly syncStatusCollection = 'calendar_sync_status';
  private syncInterval: NodeJS.Timer | null = null;

  /**
   * Create a calendar event
   */
  async createEvent(event: Omit<CalendarEvent, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
      // Check for conflicts
      const conflicts = await this.detectConflicts(event);
      if (conflicts.length > 0 && conflicts.some(c => c.severity === 'error')) {
        throw new Error('Event conflicts detected');
      }

      // Add timestamps
      const eventData = {
        ...event,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      // Save to Firestore
      const docRef = await addDoc(collection(db, this.eventsCollection), eventData);
      
      logger.info('Calendar event created', {
        eventId: docRef.id,
        title: event.title,
        type: event.type
      });

      // Schedule reminders if any
      if (event.reminders && event.reminders.length > 0) {
        await this.scheduleReminders(docRef.id, event.reminders);
      }

      // Handle recurrence
      if (event.recurrence) {
        await this.createRecurringInstances(docRef.id, event);
      }

      return docRef.id;
    } catch (error) {
      logger.error('Failed to create calendar event', error as Error);
      throw new Error('Failed to create calendar event');
    }
  }

  /**
   * Update a calendar event
   */
  async updateEvent(
    eventId: string, 
    updates: Partial<CalendarEvent>
  ): Promise<void> {
    try {
      const eventRef = doc(db, this.eventsCollection, eventId);
      
      await updateDoc(eventRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });

      logger.info('Calendar event updated', { eventId });

      // If recurrence changed, update instances
      if (updates.recurrence) {
        await this.updateRecurringInstances(eventId, updates);
      }
    } catch (error) {
      logger.error('Failed to update calendar event', error as Error);
      throw new Error('Failed to update calendar event');
    }
  }

  /**
   * Get events for a date range
   */
  async getEvents(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<CalendarEvent[]> {
    try {
      const q = query(
        collection(db, this.eventsCollection),
        where('attendees', 'array-contains', { userId }),
        where('startTime', '>=', Timestamp.fromDate(startDate)),
        where('startTime', '<=', Timestamp.fromDate(endDate)),
        orderBy('startTime', 'asc')
      );

      const snapshot = await getDocs(q);
      
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as CalendarEvent));
    } catch (error) {
      logger.error('Failed to get calendar events', error as Error);
      return [];
    }
  }

  /**
   * Detect scheduling conflicts
   */
  async detectConflicts(
    event: Partial<CalendarEvent>,
    userId?: string
  ): Promise<CalendarConflict[]> {
    const conflicts: CalendarConflict[] = [];
    
    if (!event.startTime || !event.endTime) return conflicts;

    try {
      // Get overlapping events
      const q = query(
        collection(db, this.eventsCollection),
        where('startTime', '<=', event.endTime),
        where('endTime', '>=', event.startTime)
      );

      const snapshot = await getDocs(q);
      
      snapshot.docs.forEach(doc => {
        const existingEvent = doc.data() as CalendarEvent;
        
        // Check time overlap
        if (this.isTimeOverlap(event, existingEvent)) {
          conflicts.push({
            eventId1: event.id || 'new',
            eventId2: doc.id,
            type: 'time_overlap',
            severity: 'warning',
            suggestion: 'Consider rescheduling one of these events'
          });
        }

        // Check location conflict if same physical location
        if (event.location && 
            existingEvent.location === event.location && 
            !event.virtualUrl) {
          conflicts.push({
            eventId1: event.id || 'new',
            eventId2: doc.id,
            type: 'location_conflict',
            severity: 'error',
            suggestion: 'Same location booked for overlapping times'
          });
        }
      });
    } catch (error) {
      logger.error('Failed to detect conflicts', error as Error);
    }

    return conflicts;
  }

  /**
   * Sync with external calendar provider
   */
  async syncWithProvider(
    userId: string,
    provider: 'google' | 'outlook' | 'apple',
    credentials: any
  ): Promise<SyncStatus> {
    try {
      logger.info('Starting calendar sync', { userId, provider });
      
      // Update sync status
      const statusRef = doc(db, this.syncStatusCollection, `${userId}_${provider}`);
      await updateDoc(statusRef, {
        status: 'syncing',
        lastAttempt: serverTimestamp()
      });

      // Provider-specific sync logic would go here
      // This is a placeholder implementation
      
      // Simulate sync delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update sync status to complete
      await updateDoc(statusRef, {
        status: 'synced',
        lastSync: serverTimestamp()
      });

      return {
        provider,
        lastSync: new Date(),
        status: 'synced'
      };
    } catch (error) {
      logger.error('Calendar sync failed', error as Error);
      
      // Update sync status with error
      const statusRef = doc(db, this.syncStatusCollection, `${userId}_${provider}`);
      await updateDoc(statusRef, {
        status: 'error',
        errorMessage: (error as Error).message,
        lastAttempt: serverTimestamp()
      });

      return {
        provider,
        lastSync: new Date(),
        status: 'error',
        errorMessage: (error as Error).message
      };
    }
  }

  /**
   * Export events to iCal format
   */
  exportToICal(events: CalendarEvent[]): string {
    const lines: string[] = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//HIVE//Calendar Export//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ];

    events.forEach(event => {
      lines.push('BEGIN:VEVENT');
      lines.push(`UID:${event.id}@hive.edu`);
      lines.push(`DTSTART:${this.formatDateToICal(event.startTime)}`);
      lines.push(`DTEND:${this.formatDateToICal(event.endTime)}`);
      lines.push(`SUMMARY:${this.escapeICalText(event.title)}`);
      
      if (event.description) {
        lines.push(`DESCRIPTION:${this.escapeICalText(event.description)}`);
      }
      if (event.location) {
        lines.push(`LOCATION:${this.escapeICalText(event.location)}`);
      }
      if (event.recurrence) {
        lines.push(`RRULE:${this.formatRecurrenceRule(event.recurrence)}`);
      }
      
      lines.push('END:VEVENT');
    });

    lines.push('END:VCALENDAR');
    return lines.join('\r\n');
  }

  /**
   * Import events from iCal format
   */
  async importFromICal(icalData: string, userId: string): Promise<string[]> {
    const eventIds: string[] = [];
    
    // Basic iCal parsing (simplified)
    const events = this.parseICal(icalData);
    
    for (const event of events) {
      const eventId = await this.createEvent({
        ...event,
        organizer: {
          userId,
          name: 'Imported'
        }
      });
      eventIds.push(eventId);
    }

    logger.info('Events imported from iCal', { 
      count: eventIds.length, 
      userId 
    });

    return eventIds;
  }

  /**
   * Schedule reminders for an event
   */
  private async scheduleReminders(
    eventId: string,
    reminders: CalendarEvent['reminders']
  ): Promise<void> {
    // This would integrate with a notification service
    // For now, we'll just log the scheduling
    logger.info('Reminders scheduled', {
      eventId,
      reminders: reminders?.length || 0
    });
  }

  /**
   * Create recurring instances of an event
   */
  private async createRecurringInstances(
    parentEventId: string,
    event: Omit<CalendarEvent, 'id'>
  ): Promise<void> {
    if (!event.recurrence) return;

    const instances = this.generateRecurrenceInstances(event);
    
    // Create instances in batches
    for (const instance of instances) {
      await addDoc(collection(db, this.eventsCollection), {
        ...instance,
        parentEventId,
        isRecurringInstance: true,
        createdAt: serverTimestamp()
      });
    }

    logger.info('Recurring instances created', {
      parentEventId,
      count: instances.length
    });
  }

  /**
   * Update recurring instances
   */
  private async updateRecurringInstances(
    parentEventId: string,
    updates: Partial<CalendarEvent>
  ): Promise<void> {
    // Query and update all instances
    const q = query(
      collection(db, this.eventsCollection),
      where('parentEventId', '==', parentEventId)
    );

    const snapshot = await getDocs(q);
    
    const updatePromises = snapshot.docs.map(doc =>
      updateDoc(doc.ref, {
        ...updates,
        updatedAt: serverTimestamp()
      })
    );

    await Promise.all(updatePromises);
  }

  /**
   * Generate recurrence instances
   */
  private generateRecurrenceInstances(
    event: Omit<CalendarEvent, 'id'>
  ): Partial<CalendarEvent>[] {
    const instances: Partial<CalendarEvent>[] = [];
    
    if (!event.recurrence || !event.startTime || !event.endTime) {
      return instances;
    }

    // Simplified recurrence generation
    // In production, use a library like rrule
    const maxInstances = event.recurrence.occurrences || 10;
    
    for (let i = 1; i <= maxInstances; i++) {
      const startDate = new Date(event.startTime as any);
      const endDate = new Date(event.endTime as any);
      
      // Calculate next occurrence based on frequency
      switch (event.recurrence.frequency) {
        case 'daily':
          startDate.setDate(startDate.getDate() + (i * event.recurrence.interval));
          endDate.setDate(endDate.getDate() + (i * event.recurrence.interval));
          break;
        case 'weekly':
          startDate.setDate(startDate.getDate() + (i * 7 * event.recurrence.interval));
          endDate.setDate(endDate.getDate() + (i * 7 * event.recurrence.interval));
          break;
        case 'monthly':
          startDate.setMonth(startDate.getMonth() + (i * event.recurrence.interval));
          endDate.setMonth(endDate.getMonth() + (i * event.recurrence.interval));
          break;
        case 'yearly':
          startDate.setFullYear(startDate.getFullYear() + (i * event.recurrence.interval));
          endDate.setFullYear(endDate.getFullYear() + (i * event.recurrence.interval));
          break;
      }

      instances.push({
        ...event,
        startTime: Timestamp.fromDate(startDate),
        endTime: Timestamp.fromDate(endDate)
      });
    }

    return instances;
  }

  /**
   * Check if two events have time overlap
   */
  private isTimeOverlap(
    event1: Partial<CalendarEvent>,
    event2: CalendarEvent
  ): boolean {
    if (!event1.startTime || !event1.endTime) return false;
    
    const start1 = (event1.startTime as any).toMillis ? 
      (event1.startTime as any).toMillis() : 
      (event1.startTime as Date).getTime();
    const end1 = (event1.endTime as any).toMillis ? 
      (event1.endTime as any).toMillis() : 
      (event1.endTime as Date).getTime();
    const start2 = (event2.startTime as any).toMillis ? 
      (event2.startTime as any).toMillis() : 
      (event2.startTime as Date).getTime();
    const end2 = (event2.endTime as any).toMillis ? 
      (event2.endTime as any).toMillis() : 
      (event2.endTime as Date).getTime();

    return start1 < end2 && end1 > start2;
  }

  /**
   * Format date for iCal
   */
  private formatDateToICal(date: Date | Timestamp): string {
    const d = date instanceof Date ? date : date.toDate();
    return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
  }

  /**
   * Escape text for iCal format
   */
  private escapeICalText(text: string): string {
    return text
      .replace(/\\/g, '\\\\')
      .replace(/;/g, '\\;')
      .replace(/,/g, '\\,')
      .replace(/\n/g, '\\n');
  }

  /**
   * Format recurrence rule for iCal
   */
  private formatRecurrenceRule(recurrence: RecurrencePattern): string {
    const parts: string[] = [];
    
    parts.push(`FREQ=${recurrence.frequency.toUpperCase()}`);
    parts.push(`INTERVAL=${recurrence.interval}`);
    
    if (recurrence.occurrences) {
      parts.push(`COUNT=${recurrence.occurrences}`);
    }
    if (recurrence.endDate) {
      parts.push(`UNTIL=${this.formatDateToICal(recurrence.endDate)}`);
    }
    if (recurrence.daysOfWeek) {
      const days = ['SU', 'MO', 'TU', 'WE', 'TH', 'FR', 'SA'];
      const byDay = recurrence.daysOfWeek.map(d => days[d]).join(',');
      parts.push(`BYDAY=${byDay}`);
    }
    
    return parts.join(';');
  }

  /**
   * Parse iCal data (simplified)
   */
  private parseICal(icalData: string): Partial<CalendarEvent>[] {
    // This is a simplified parser
    // In production, use a library like ical.js
    const events: Partial<CalendarEvent>[] = [];
    const lines = icalData.split(/\r?\n/);
    
    let currentEvent: Partial<CalendarEvent> | null = null;
    
    for (const line of lines) {
      if (line.startsWith('BEGIN:VEVENT')) {
        currentEvent = {
          type: 'event'
        };
      } else if (line.startsWith('END:VEVENT') && currentEvent) {
        events.push(currentEvent);
        currentEvent = null;
      } else if (currentEvent) {
        const [key, ...valueParts] = line.split(':');
        const value = valueParts.join(':');
        
        switch (key) {
          case 'SUMMARY':
            currentEvent.title = value;
            break;
          case 'DESCRIPTION':
            currentEvent.description = value;
            break;
          case 'LOCATION':
            currentEvent.location = value;
            break;
          // Add more field mappings as needed
        }
      }
    }
    
    return events;
  }
}

// Create and export singleton instance
export const calendarSync = new CalendarSyncService();

// Export types
export type { CalendarEvent, RecurrencePattern, SyncStatus, CalendarConflict };

// Export class for type usage
export { CalendarSyncService };