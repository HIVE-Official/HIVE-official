import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { sendMagicLinkEmail } from './email/magic-link';
import { sendVerificationEmail } from './email/verification';
import { sendNotificationEmail } from './email/notifications';
import { sendWelcomeEmail } from './email/welcome';
import { sendPasswordResetEmail } from './email/password-reset';
import { aggregateFeedData } from './triggers/feed-aggregation';
import { onUserCreate } from './triggers/user-onCreate';
import { onPostCreate } from './triggers/post-onCreate';
import { onSpaceUpdate } from './triggers/space-onUpdate';

// Initialize Firebase Admin
admin.initializeApp();

// Email Functions
export const sendMagicLink = functions.https.onCall(async (data) => {
  const { email, magicLink } = data;
  
  if (!email || !magicLink) {
    throw new functions.https.HttpsError('invalid-argument', 'Email and magic link are required');
  }

  try {
    await sendMagicLinkEmail(email, magicLink);
    return { success: true };
  } catch (error) {
    console.error('Error sending magic link:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send magic link email');
  }
});

export const sendVerification = functions.https.onCall(async (data) => {
  const { email, code, userName } = data;
  
  if (!email || !code) {
    throw new functions.https.HttpsError('invalid-argument', 'Email and verification code are required');
  }

  try {
    await sendVerificationEmail(email, code, userName);
    return { success: true };
  } catch (error) {
    console.error('Error sending verification email:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send verification email');
  }
});

export const sendPasswordReset = functions.https.onCall(async (data) => {
  const { email, resetLink, userName } = data;
  
  if (!email || !resetLink) {
    throw new functions.https.HttpsError('invalid-argument', 'Email and reset link are required');
  }

  try {
    await sendPasswordResetEmail(email, resetLink, userName);
    return { success: true };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw new functions.https.HttpsError('internal', 'Failed to send password reset email');
  }
});

// Trigger Functions
export const onUserCreated = functions.auth.user().onCreate(async (user) => {
  try {
    await onUserCreate(user);
    
    // Send welcome email
    if (user.email) {
      await sendWelcomeEmail(user.email, user.displayName || 'Student');
    }
  } catch (error) {
    console.error('Error in onUserCreated:', error);
  }
});

export const onPostCreated = functions.firestore
  .document('spaces/{spaceId}/posts/{postId}')
  .onCreate(async (snapshot, context) => {
    try {
      await onPostCreate(snapshot, context);
    } catch (error) {
      console.error('Error in onPostCreated:', error);
    }
  });

export const onSpaceUpdated = functions.firestore
  .document('spaces/{spaceId}')
  .onUpdate(async (change, context) => {
    try {
      await onSpaceUpdate(change, context);
    } catch (error) {
      console.error('Error in onSpaceUpdated:', error);
    }
  });

// Scheduled Functions
export const aggregateFeed = functions.pubsub
  .schedule('every 5 minutes')
  .onRun(async (context) => {
    try {
      await aggregateFeedData();
      console.log('Feed aggregation completed');
    } catch (error) {
      console.error('Error aggregating feed:', error);
    }
  });

export const cleanupOldData = functions.pubsub
  .schedule('every day 02:00')
  .timeZone('America/New_York')
  .onRun(async (context) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - 30); // 30 days old

    try {
      // Clean old notifications
      const notificationsQuery = admin.firestore()
        .collectionGroup('notifications')
        .where('timestamp', '<', cutoffDate)
        .where('read', '==', true)
        .limit(500);
      
      const notificationsSnapshot = await notificationsQuery.get();
      const batch = admin.firestore().batch();
      
      notificationsSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
      console.log(`Deleted ${notificationsSnapshot.size} old notifications`);
      
      // Clean old activities
      const activitiesQuery = admin.firestore()
        .collectionGroup('activities')
        .where('timestamp', '<', cutoffDate)
        .limit(500);
      
      const activitiesSnapshot = await activitiesQuery.get();
      const activitiesBatch = admin.firestore().batch();
      
      activitiesSnapshot.docs.forEach(doc => {
        activitiesBatch.delete(doc.ref);
      });
      
      await activitiesBatch.commit();
      console.log(`Deleted ${activitiesSnapshot.size} old activities`);
      
    } catch (error) {
      console.error('Error cleaning up old data:', error);
    }
  });

// Email Digest Function
export const sendDailyDigest = functions.pubsub
  .schedule('every day 09:00')
  .timeZone('America/New_York')
  .onRun(async (context) => {
    try {
      // Get all users with daily digest enabled
      const usersSnapshot = await admin.firestore()
        .collection('users')
        .where('preferences.emailDigest', '==', 'daily')
        .get();
      
      const promises = usersSnapshot.docs.map(async (userDoc) => {
        const userData = userDoc.data();
        const userId = userDoc.id;
        
        // Get user's recent activity
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        const postsSnapshot = await admin.firestore()
          .collectionGroup('posts')
          .where('createdAt', '>', yesterday)
          .orderBy('createdAt', 'desc')
          .limit(10)
          .get();
        
        const eventsSnapshot = await admin.firestore()
          .collectionGroup('events')
          .where('startDate', '>', new Date())
          .orderBy('startDate', 'asc')
          .limit(5)
          .get();
        
        if (postsSnapshot.size > 0 || eventsSnapshot.size > 0) {
          await sendNotificationEmail(
            userData.email,
            'daily-digest',
            {
              userName: userData.displayName,
              posts: postsSnapshot.docs.map(doc => doc.data()),
              events: eventsSnapshot.docs.map(doc => doc.data()),
              date: new Date().toLocaleDateString()
            }
          );
        }
      });
      
      await Promise.all(promises);
      console.log(`Sent daily digest to ${usersSnapshot.size} users`);
      
    } catch (error) {
      console.error('Error sending daily digest:', error);
    }
  });

// Notification System
export const createNotification = functions.https.onCall(async (data) => {
  const { userId, type, title, message, metadata } = data;
  
  if (!userId || !type || !title) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
  }

  try {
    const notification = {
      type,
      title,
      message,
      metadata: metadata || {},
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      read: false
    };
    
    await admin.firestore()
      .collection('users')
      .doc(userId)
      .collection('notifications')
      .add(notification);
    
    // Check if user wants email notifications
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    const userData = userDoc.data();
    
    if (userData?.preferences?.emailNotifications) {
      await sendNotificationEmail(userData.email, type, {
        userName: userData.displayName,
        title,
        message
      });
    }
    
    return { success: true };
  } catch (error) {
    console.error('Error creating notification:', error);
    throw new functions.https.HttpsError('internal', 'Failed to create notification');
  }
});

// Space Member Management
export const addSpaceMember = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
  }

  const { spaceId, userId, role = 'member' } = data;
  
  if (!spaceId || !userId) {
    throw new functions.https.HttpsError('invalid-argument', 'Missing required fields');
  }

  try {
    // Add member to space
    await admin.firestore()
      .collection('spaces')
      .doc(spaceId)
      .collection('members')
      .doc(userId)
      .set({
        userId,
        role,
        joinedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    
    // Update space member count
    await admin.firestore()
      .collection('spaces')
      .doc(spaceId)
      .update({
        memberCount: admin.firestore.FieldValue.increment(1)
      });
    
    // Add space to user's spaces
    await admin.firestore()
      .collection('users')
      .doc(userId)
      .update({
        spaces: admin.firestore.FieldValue.arrayUnion(spaceId)
      });
    
    return { success: true };
  } catch (error) {
    console.error('Error adding space member:', error);
    throw new functions.https.HttpsError('internal', 'Failed to add space member');
  }
});

// Feed Generation
export const generateUserFeed = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'Must be authenticated');
  }

  const userId = context.auth.uid;
  const { limit = 20, startAfter } = data;

  try {
    // Get user's spaces
    const userDoc = await admin.firestore().collection('users').doc(userId).get();
    const userData = userDoc.data();
    const userSpaces = userData?.spaces || [];
    
    if (userSpaces.length === 0) {
      return { posts: [] };
    }
    
    // Get posts from user's spaces
    let query = admin.firestore()
      .collectionGroup('posts')
      .where('spaceId', 'in', userSpaces)
      .orderBy('createdAt', 'desc')
      .limit(limit);
    
    if (startAfter) {
      query = query.startAfter(startAfter);
    }
    
    const postsSnapshot = await query.get();
    const posts = postsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate()
    }));
    
    return { posts };
  } catch (error) {
    console.error('Error generating feed:', error);
    throw new functions.https.HttpsError('internal', 'Failed to generate feed');
  }
});