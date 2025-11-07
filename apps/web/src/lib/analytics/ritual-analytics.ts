import { logger } from '@/lib/logger';
import type { RitualArchetype, RitualPhase } from '@hive/core';

export type RitualAnalyticsEventType = 'created' | 'phase_changed' | 'deleted';

export interface RitualAnalyticsEvent {
  id: string;
  type: RitualAnalyticsEventType;
  ritualId: string;
  campusId: string;
  archetype: RitualArchetype;
  phase: RitualPhase;
  timestamp: number;
  metadata?: Record<string, unknown>;
}

class RitualAnalyticsTracker {
  private static instance: RitualAnalyticsTracker;
  private events: RitualAnalyticsEvent[] = [];
  private readonly maxEvents = 1000;

  static getInstance(): RitualAnalyticsTracker {
    if (!RitualAnalyticsTracker.instance) {
      RitualAnalyticsTracker.instance = new RitualAnalyticsTracker();
    }
    return RitualAnalyticsTracker.instance;
  }

  track(event: Omit<RitualAnalyticsEvent, 'id' | 'timestamp'>): void {
    const entry: RitualAnalyticsEvent = {
      ...event,
      id: `ritual-event-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: Date.now(),
    };

    this.events.push(entry);
    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }

    logger.info('[RITUAL_ANALYTICS] Event captured', {
      eventType: entry.type,
      ritualId: entry.ritualId,
      campusId: entry.campusId,
      archetype: entry.archetype,
      phase: entry.phase,
    });
  }

  getRecentEvents(limit = 50): RitualAnalyticsEvent[] {
    return this.events.slice(-limit);
  }

  getSummary() {
    const summary = {
      total: this.events.length,
      created: this.countByType('created'),
      deleted: this.countByType('deleted'),
      phaseChanges: this.countByType('phase_changed'),
    };
    return summary;
  }

  private countByType(type: RitualAnalyticsEventType): number {
    return this.events.filter((event) => event.type === type).length;
  }
}

export const ritualAnalytics = RitualAnalyticsTracker.getInstance();
