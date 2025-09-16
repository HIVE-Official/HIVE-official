import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { logger } from '@/lib/logger';

interface HiveNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'system';
  category: 'space' | 'tool' | 'social' | 'system' | 'update';
  isRead: boolean;
  timestamp: string;
  actionUrl?: string;
  actionText?: string;
  metadata?: {
    spaceId?: string;
    toolId?: string;
    userId?: string;
    [key: string]: any;
  };
}

// Utility function to create notifications (used by other parts of the system)
export async function createNotification(notificationData: {
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'system';
  category: 'space' | 'tool' | 'social' | 'system' | 'update';
  actionUrl?: string;
  actionText?: string;
  metadata?: Record<string, any>;
}): Promise<string | null> {
  try {
    const notification: HiveNotification = {
      id: '', // Will be set by Firestore
      ...notificationData,
      isRead: false,
      timestamp: new Date().toISOString()
    };

    const docRef = await dbAdmin.collection('notifications').add(notification);
    logger.info('Created notification', { notificationId: docRef.id, userId: notificationData.userId });
    return docRef.id;
  } catch (error) {
    logger.error('Error creating notification', { error, notificationData });
    return null;
  }
}

export type { HiveNotification };