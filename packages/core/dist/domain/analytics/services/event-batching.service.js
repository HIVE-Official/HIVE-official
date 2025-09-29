"use strict";
/**
 * Event Batching Service
 * Domain service for batching and processing analytics events
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBatchingService = void 0;
class EventBatchingService {
    constructor(batchSize = 100, flushInterval = 30000, onFlush) {
        this.batchSize = batchSize;
        this.flushInterval = flushInterval;
        this.onFlush = onFlush;
        this.events = [];
    }
    /**
     * Add event to batch
     */
    addEvent(event) {
        this.events.push(event);
        // Flush if batch is full
        if (this.events.length >= this.batchSize) {
            this.flush();
        }
        // Set flush timeout if not already set
        if (!this.batchTimeout) {
            this.batchTimeout = setTimeout(() => {
                this.flush();
            }, this.flushInterval);
        }
    }
    /**
     * Flush all pending events
     */
    async flush() {
        if (this.events.length === 0)
            return;
        const eventsToFlush = [...this.events];
        this.events = [];
        // Clear timeout
        if (this.batchTimeout) {
            clearTimeout(this.batchTimeout);
            this.batchTimeout = undefined;
        }
        try {
            await this.onFlush(eventsToFlush);
        }
        catch (error) {
            console.error('Failed to flush analytics events:', error);
            // Re-add events to queue for retry
            this.events.unshift(...eventsToFlush);
            throw error;
        }
    }
    /**
     * Get current batch size
     */
    getBatchSize() {
        return this.events.length;
    }
    /**
     * Clear all pending events
     */
    clear() {
        this.events = [];
        if (this.batchTimeout) {
            clearTimeout(this.batchTimeout);
            this.batchTimeout = undefined;
        }
    }
    /**
     * Destroy the service and flush remaining events
     */
    async destroy() {
        await this.flush();
        this.clear();
    }
}
exports.EventBatchingService = EventBatchingService;
//# sourceMappingURL=event-batching.service.js.map