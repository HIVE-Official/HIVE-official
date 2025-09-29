/**
 * Firebase Event Dispatcher
 * Publishes domain events to Firestore for real-time updates
 */

import { collection, addDoc, Timestamp } from 'firebase/firestore';
// import { db } from '@hive/firebase'; // Temporarily disabled - package needs to be fixed
import { IEventDispatcher } from '../repositories/interfaces';
// import { logger } from '../../lib/logger'; // File doesn't exist

// Temporary db and logger
const db = null as any;
const logger = { info: console.log, error: console.error, warn: console.warn };

export class FirebaseEventDispatcher implements IEventDispatcher {
  private handlers: Map<string, Set<(event: any) => Promise<void>>> = new Map();
  private readonly eventsCollection = 'domain_events';

  async dispatch(events: any[]): Promise<void> {
    if (!events || events.length === 0) return;

    try {
      // Batch write events to Firestore
      const batch = events.map(async (event) => {
        // Add metadata
        const eventWithMetadata = {
          ...event,
          id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          occurredAt: event.timestamp || Timestamp.now(),
          version: 1,
          processed: false
        };

        // Persist to Firestore for audit trail and real-time listeners
        await addDoc(collection(db, this.eventsCollection), eventWithMetadata);

        // Notify local handlers
        await this.notifyHandlers(event.eventType, eventWithMetadata);

        return eventWithMetadata;
      });

      await Promise.all(batch);
    } catch (error) {
      logger.error('Failed to dispatch events', { error });
      throw error;
    }
  }

  subscribe(eventType: string, handler: (event: any) => Promise<void>): void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    this.handlers.get(eventType)!.add(handler);
  }

  unsubscribe(eventType: string, handler: (event: any) => Promise<void>): void {
    const handlers = this.handlers.get(eventType);
    if (handlers) {
      handlers.delete(handler);
      if (handlers.size === 0) {
        this.handlers.delete(eventType);
      }
    }
  }

  private async notifyHandlers(eventType: string, event: any): Promise<void> {
    const handlers = this.handlers.get(eventType);
    if (!handlers || handlers.size === 0) return;

    // Execute handlers in parallel
    const handlerPromises = Array.from(handlers).map(async (handler) => {
      try {
        await handler(event);
      } catch (error) {
        logger.error('Event handler failed', {
          eventType,
          eventId: event.id,
          error
        });
        // Don't throw - continue with other handlers
      }
    });

    await Promise.all(handlerPromises);
  }
}

// Singleton instance
export const eventDispatcher = new FirebaseEventDispatcher();