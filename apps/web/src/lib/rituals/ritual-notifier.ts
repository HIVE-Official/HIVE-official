import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { sseRealtimeService } from '@/lib/sse-realtime-service';

interface RitualNotificationPayload {
  ritualId: string;
  campusId: string;
  archetype: string;
  phase: string;
  title: string;
  message: string;
  reason?: string;
}

export async function enqueueRitualNotification(
  type: 'created' | 'phase_changed' | 'deleted',
  payload: RitualNotificationPayload,
): Promise<void> {
  try {
    await dbAdmin.collection('adminRitualNotifications').add({
      type,
      payload,
      createdAt: new Date().toISOString(),
      acknowledged: false,
    });

    await sseRealtimeService.sendNotification('campus-admins', {
      title: payload.title,
      message: payload.message,
      type: 'info',
      actionUrl: `/admin/rituals?focus=${payload.ritualId}`,
    });
  } catch (error) {
    logger.error('Failed to enqueue ritual notification', {
      error: error instanceof Error ? error.message : error,
      type,
      payload,
    });
  }
}
