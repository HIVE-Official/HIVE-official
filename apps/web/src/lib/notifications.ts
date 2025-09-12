import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';
import { app } from './firebase';
import { doc, setDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

let messaging: Messaging | null = null;

// Initialize Firebase Cloud Messaging
export function initializeMessaging() {
  if (typeof window !== 'undefined' && 'Notification' in window) {
    messaging = getMessaging(app);
    return messaging;
  }
  return null;
}

/**
 * Request notification permission and get FCM token
 */
export async function requestNotificationPermission(userId: string): Promise<string | null> {
  try {
    // Check if notifications are supported
    if (!('Notification' in window)) {
      console.log('This browser does not support notifications');
      return null;
    }

    // Request permission
    const permission = await Notification.requestPermission();
    
    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return null;
    }

    // Get FCM token
    if (!messaging) {
      messaging = initializeMessaging();
    }

    if (!messaging) {
      return null;
    }

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY
    });

    if (token) {
      // Save token to user profile
      await saveTokenToDatabase(userId, token);
      console.log('FCM token obtained:', token);
      return token;
    }

    return null;
  } catch (error) {
    console.error('Error getting notification permission:', error);
    return null;
  }
}

/**
 * Save FCM token to database
 */
async function saveTokenToDatabase(userId: string, token: string): Promise<void> {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, {
      fcmToken: token,
      notificationsEnabled: true,
      lastTokenUpdate: new Date()
    });
  } catch (error) {
    console.error('Error saving FCM token:', error);
  }
}

/**
 * Listen for foreground messages
 */
export function onForegroundMessage(callback: (payload: any) => void) {
  if (!messaging) {
    messaging = initializeMessaging();
  }

  if (messaging) {
    return onMessage(messaging, (payload) => {
      console.log('Foreground message received:', payload);
      callback(payload);
    });
  }

  return () => {};
}

/**
 * Show browser notification
 */
export function showNotification(title: string, options?: any) {
  if ('Notification' in window && Notification.permission === 'granted') {
    const notification = new Notification(title, {
      icon: '/icon-192.png',
      badge: '/badge-72.png',
      ...options
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };

    return notification;
  }
}

/**
 * Create in-app notification
 */
export async function createNotification(
  userId: string,
  notification: {
    title: string;
    body: string;
    type: 'post' | 'comment' | 'like' | 'follow' | 'mention' | 'space' | 'event';
    entityId?: string;
    entityType?: string;
    actionUrl?: string;
    imageUrl?: string;
    data?: Record<string, any>;
  }
): Promise<void> {
  try {
    await addDoc(collection(db, `users/${userId}/notifications`), {
      ...notification,
      read: false,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Error creating notification:', error);
  }
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(
  userId: string,
  notificationId: string
): Promise<void> {
  try {
    const notificationRef = doc(db, `users/${userId}/notifications`, notificationId);
    await updateDoc(notificationRef, {
      read: true,
      readAt: new Date()
    });
  } catch (error) {
    console.error('Error marking notification as read:', error);
  }
}

/**
 * Mark all notifications as read
 */
export async function markAllNotificationsAsRead(userId: string): Promise<void> {
  // This would need a batch update or Cloud Function
  // For now, individual updates would be needed
  console.log('Marking all notifications as read for user:', userId);
}

/**
 * Notification triggers for different events
 */
export const NotificationTriggers = {
  // When someone comments on your post
  async onComment(
    postAuthorId: string,
    commenterName: string,
    postContent: string,
    postId: string
  ) {
    await createNotification(postAuthorId, {
      title: `${commenterName} commented on your post`,
      body: postContent.substring(0, 100),
      type: 'comment',
      entityId: postId,
      entityType: 'post',
      actionUrl: `/posts/${postId}`
    });
  },

  // When someone likes your post
  async onLike(
    postAuthorId: string,
    likerName: string,
    postId: string
  ) {
    await createNotification(postAuthorId, {
      title: `${likerName} liked your post`,
      body: 'Tap to view',
      type: 'like',
      entityId: postId,
      entityType: 'post',
      actionUrl: `/posts/${postId}`
    });
  },

  // When someone mentions you
  async onMention(
    mentionedUserId: string,
    mentionerName: string,
    content: string,
    postId: string
  ) {
    await createNotification(mentionedUserId, {
      title: `${mentionerName} mentioned you`,
      body: content.substring(0, 100),
      type: 'mention',
      entityId: postId,
      entityType: 'post',
      actionUrl: `/posts/${postId}`
    });
  },

  // When added to a space
  async onSpaceInvite(
    userId: string,
    spaceName: string,
    inviterName: string,
    spaceId: string
  ) {
    await createNotification(userId, {
      title: `${inviterName} added you to ${spaceName}`,
      body: 'Join the conversation',
      type: 'space',
      entityId: spaceId,
      entityType: 'space',
      actionUrl: `/spaces/${spaceId}`
    });
  },

  // When a new event is created in your space
  async onNewEvent(
    userId: string,
    eventName: string,
    spaceName: string,
    eventId: string
  ) {
    await createNotification(userId, {
      title: `New event in ${spaceName}`,
      body: eventName,
      type: 'event',
      entityId: eventId,
      entityType: 'event',
      actionUrl: `/events/${eventId}`
    });
  }
};

/**
 * Setup notification listeners for a user
 */
export function setupNotificationListeners(userId: string) {
  // Request permission on setup
  requestNotificationPermission(userId);

  // Listen for foreground messages
  const unsubscribe = onForegroundMessage((payload) => {
    // Show browser notification for foreground messages
    if (payload.notification) {
      showNotification(
        payload.notification.title || 'New notification',
        {
          body: payload.notification.body,
          icon: payload.notification.icon,
          image: payload.notification.image,
          data: payload.data
        }
      );
    }
  });

  return unsubscribe;
}