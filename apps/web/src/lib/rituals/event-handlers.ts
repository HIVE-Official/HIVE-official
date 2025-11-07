import { cacheService } from '@/lib/cache/cache-service';
import { logger } from '@/lib/logger';
import { ritualAnalytics } from '@/lib/analytics/ritual-analytics';
import { enqueueRitualNotification } from './ritual-notifier';
import { dbAdmin } from '@/lib/firebase-admin';
import {
  EventBus,
  RitualCreatedEvent,
  RitualPhaseChangedEvent,
  RitualDeletedEvent,
} from '@hive/core';

export function registerRitualEventHandlers(eventBus: EventBus): void {
  eventBus.subscribe<RitualCreatedEvent>('RitualCreated', {
    async handle(event) {
      const payload = event.payload;
      await cacheService.invalidateActiveRituals(payload.campusId);
      await cacheService.invalidateRitual(payload.id, payload.campusId);

      // Persist event record for audit/analytics
      try {
        await dbAdmin.collection('ritual_events').add({
          type: 'created',
          ritualId: payload.id,
          campusId: payload.campusId,
          archetype: payload.archetype,
          phase: payload.phase,
          data: payload,
          createdAt: new Date(),
        });
      } catch (err) {
        logger.warn('[RITUAL_LISTENER] Failed to persist created event', { error: String(err) });
      }

      ritualAnalytics.track({
        type: 'created',
        ritualId: payload.id,
        campusId: payload.campusId,
        archetype: payload.archetype,
        phase: payload.phase,
      });

      await enqueueRitualNotification('created', {
        ritualId: payload.id,
        campusId: payload.campusId,
        archetype: payload.archetype,
        phase: payload.phase,
        title: `New ritual created: ${payload.title}`,
        message: payload.subtitle || payload.description || 'A new ritual is available.',
      });

      logger.info('[RITUAL_LISTENER] RitualCreated processed', {
        ritualId: payload.id,
        campusId: payload.campusId,
      });
    },
  });

  eventBus.subscribe<RitualPhaseChangedEvent>('RitualPhaseChanged', {
    async handle(event) {
      const data = event.data;
      await cacheService.invalidateRitual(data.ritualId, data.campusId);
      await cacheService.invalidateActiveRituals(data.campusId);

      // Persist event record for audit/analytics
      try {
        await dbAdmin.collection('ritual_events').add({
          type: 'phase_changed',
          ritualId: data.ritualId,
          campusId: data.campusId,
          archetype: data.archetype,
          fromPhase: data.fromPhase,
          toPhase: data.toPhase,
          reason: data.reason,
          createdAt: new Date(),
        });
      } catch (err) {
        logger.warn('[RITUAL_LISTENER] Failed to persist phase_changed event', { error: String(err) });
      }

      ritualAnalytics.track({
        type: 'phase_changed',
        ritualId: data.ritualId,
        campusId: data.campusId,
        archetype: data.archetype as any,
        phase: data.toPhase,
        metadata: { fromPhase: data.fromPhase, reason: data.reason },
      });

      await enqueueRitualNotification('phase_changed', {
        ritualId: data.ritualId,
        campusId: data.campusId,
        archetype: data.archetype,
        phase: data.toPhase,
        reason: data.reason,
        title: `Ritual phase updated: ${data.toPhase}`,
        message: `Ritual transitioned from ${data.fromPhase} to ${data.toPhase}.`,
      });

      logger.info('[RITUAL_LISTENER] RitualPhaseChanged processed', {
        ritualId: data.ritualId,
        campusId: data.campusId,
        from: data.fromPhase,
        to: data.toPhase,
        reason: data.reason,
      });
    },
  });

  eventBus.subscribe<RitualDeletedEvent>('RitualDeleted', {
    async handle(event) {
      const data = event.data;
      await cacheService.invalidateRitual(data.ritualId, data.campusId);
      await cacheService.invalidateActiveRituals(data.campusId);

      // Persist event record for audit/analytics
      try {
        await dbAdmin.collection('ritual_events').add({
          type: 'deleted',
          ritualId: data.ritualId,
          campusId: data.campusId,
          archetype: data.archetype,
          createdAt: new Date(),
        });
      } catch (err) {
        logger.warn('[RITUAL_LISTENER] Failed to persist deleted event', { error: String(err) });
      }

      ritualAnalytics.track({
        type: 'deleted',
        ritualId: data.ritualId,
        campusId: data.campusId,
        archetype: (data.archetype as any) || ('UNKNOWN' as any),
        phase: 'ended',
      });

      await enqueueRitualNotification('deleted', {
        ritualId: data.ritualId,
        campusId: data.campusId,
        archetype: data.archetype || 'UNKNOWN',
        phase: 'ended',
        title: 'Ritual removed',
        message: 'A ritual has been removed from the campus schedule.',
      });

      logger.info('[RITUAL_LISTENER] RitualDeleted processed', {
        ritualId: data.ritualId,
        campusId: data.campusId,
      });
    },
  });
}
