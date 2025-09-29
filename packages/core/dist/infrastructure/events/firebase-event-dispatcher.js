"use strict";
/**
 * Firebase Event Dispatcher
 * Publishes domain events to Firestore for real-time updates
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventDispatcher = exports.FirebaseEventDispatcher = void 0;
const firestore_1 = require("firebase/firestore");
// import { logger } from '../../lib/logger'; // File doesn't exist
// Temporary db and logger
const db = null;
const logger = { info: console.log, error: console.error, warn: console.warn };
class FirebaseEventDispatcher {
    constructor() {
        this.handlers = new Map();
        this.eventsCollection = 'domain_events';
    }
    async dispatch(events) {
        if (!events || events.length === 0)
            return;
        try {
            // Batch write events to Firestore
            const batch = events.map(async (event) => {
                // Add metadata
                const eventWithMetadata = {
                    ...event,
                    id: `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    occurredAt: event.timestamp || firestore_1.Timestamp.now(),
                    version: 1,
                    processed: false
                };
                // Persist to Firestore for audit trail and real-time listeners
                await (0, firestore_1.addDoc)((0, firestore_1.collection)(db, this.eventsCollection), eventWithMetadata);
                // Notify local handlers
                await this.notifyHandlers(event.eventType, eventWithMetadata);
                return eventWithMetadata;
            });
            await Promise.all(batch);
        }
        catch (error) {
            logger.error('Failed to dispatch events', { error });
            throw error;
        }
    }
    subscribe(eventType, handler) {
        if (!this.handlers.has(eventType)) {
            this.handlers.set(eventType, new Set());
        }
        this.handlers.get(eventType).add(handler);
    }
    unsubscribe(eventType, handler) {
        const handlers = this.handlers.get(eventType);
        if (handlers) {
            handlers.delete(handler);
            if (handlers.size === 0) {
                this.handlers.delete(eventType);
            }
        }
    }
    async notifyHandlers(eventType, event) {
        const handlers = this.handlers.get(eventType);
        if (!handlers || handlers.size === 0)
            return;
        // Execute handlers in parallel
        const handlerPromises = Array.from(handlers).map(async (handler) => {
            try {
                await handler(event);
            }
            catch (error) {
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
exports.FirebaseEventDispatcher = FirebaseEventDispatcher;
// Singleton instance
exports.eventDispatcher = new FirebaseEventDispatcher();
//# sourceMappingURL=firebase-event-dispatcher.js.map