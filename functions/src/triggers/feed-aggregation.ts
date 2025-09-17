import * as admin from 'firebase-admin';

export async function aggregateFeedData(): Promise<void> {
  const db = admin.firestore();
  const now = new Date();
  const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000);

  try {
    // Get all active users (logged in within last 24 hours)
    const activeUsersSnapshot = await db
      .collection('users')
      .where('lastActive', '>', new Date(now.getTime() - 24 * 60 * 60 * 1000))
      .get();

    const aggregationPromises = activeUsersSnapshot.docs.map(async (userDoc) => {
      const userId = userDoc.id;
      const userData = userDoc.data();
      const userSpaces = userData.spaces || [];

      if (userSpaces.length === 0) return;

      // Get recent posts from user's spaces
      const postsSnapshot = await db
        .collectionGroup('posts')
        .where('spaceId', 'in', userSpaces.slice(0, 10)) // Firestore 'in' limit
        .where('createdAt', '>', fiveMinutesAgo)
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get();

      // Get upcoming events from user's spaces
      const eventsSnapshot = await db
        .collectionGroup('events')
        .where('spaceId', 'in', userSpaces.slice(0, 10))
        .where('startDate', '>', now)
        .where('startDate', '<', new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000)) // Next 7 days
        .orderBy('startDate', 'asc')
        .limit(20)
        .get();

      // Get active rituals
      const ritualsSnapshot = await db
        .collection('rituals')
        .where('spaceIds', 'array-contains-any', userSpaces.slice(0, 10))
        .where('isActive', '==', true)
        .limit(10)
        .get();

      // Aggregate feed items
      const feedItems: any[] = [];

      // Add posts to feed
      postsSnapshot.docs.forEach(doc => {
        const postData = doc.data();
        feedItems.push({
          id: doc.id,
          type: 'post',
          spaceId: postData.spaceId,
          content: postData.content,
          authorId: postData.authorId,
          timestamp: postData.createdAt,
          engagement: {
            likes: postData.likes || 0,
            comments: postData.commentCount || 0,
            shares: postData.shares || 0
          },
          priority: calculatePriority('post', postData)
        });
      });

      // Add events to feed
      eventsSnapshot.docs.forEach(doc => {
        const eventData = doc.data();
        feedItems.push({
          id: doc.id,
          type: 'event',
          spaceId: eventData.spaceId,
          title: eventData.title,
          description: eventData.description,
          startDate: eventData.startDate,
          organizerId: eventData.organizerId,
          timestamp: eventData.createdAt,
          attendees: eventData.attendees || [],
          priority: calculatePriority('event', eventData)
        });
      });

      // Add rituals to feed
      ritualsSnapshot.docs.forEach(doc => {
        const ritualData = doc.data();
        feedItems.push({
          id: doc.id,
          type: 'ritual',
          title: ritualData.title,
          description: ritualData.description,
          frequency: ritualData.frequency,
          nextOccurrence: ritualData.nextOccurrence,
          participants: ritualData.participants || [],
          timestamp: ritualData.createdAt,
          priority: calculatePriority('ritual', ritualData)
        });
      });

      // Sort by priority and timestamp
      feedItems.sort((a, b) => {
        if (a.priority !== b.priority) {
          return b.priority - a.priority;
        }
        return b.timestamp.toMillis() - a.timestamp.toMillis();
      });

      // Write aggregated feed to user's feed collection
      const batch = db.batch();
      const userFeedRef = db.collection('feed').doc(userId).collection('items');

      // Clear old feed items
      const oldItemsSnapshot = await userFeedRef.limit(100).get();
      oldItemsSnapshot.docs.forEach(doc => {
        batch.delete(doc.ref);
      });

      // Add new feed items
      feedItems.slice(0, 50).forEach(item => {
        const newDocRef = userFeedRef.doc();
        batch.set(newDocRef, {
          ...item,
          aggregatedAt: admin.firestore.FieldValue.serverTimestamp()
        });
      });

      await batch.commit();
    });

    await Promise.all(aggregationPromises);
    console.log(`Feed aggregation completed for ${activeUsersSnapshot.size} users`);
  } catch (error) {
    console.error('Error in feed aggregation:', error);
    throw error;
  }
}

function calculatePriority(type: string, data: any): number {
  let priority = 0;

  switch (type) {
    case 'post':
      // Coordination posts get higher priority
      if (data.tags?.includes('coordination') || 
          data.content?.toLowerCase().includes('study') ||
          data.content?.toLowerCase().includes('ride') ||
          data.content?.toLowerCase().includes('food')) {
        priority += 10;
      }
      // Recent posts get higher priority
      const postAge = Date.now() - data.createdAt.toMillis();
      if (postAge < 60 * 60 * 1000) priority += 5; // Less than 1 hour
      // Engagement boosts priority
      priority += Math.min(data.likes || 0, 5);
      priority += Math.min(data.commentCount || 0, 5);
      break;

    case 'event':
      // Upcoming events get higher priority
      const timeUntilEvent = data.startDate.toMillis() - Date.now();
      if (timeUntilEvent < 24 * 60 * 60 * 1000) priority += 15; // Less than 24 hours
      else if (timeUntilEvent < 3 * 24 * 60 * 60 * 1000) priority += 10; // Less than 3 days
      // Popular events get priority
      priority += Math.min((data.attendees?.length || 0) * 2, 10);
      break;

    case 'ritual':
      // Active rituals with upcoming occurrences
      if (data.nextOccurrence) {
        const timeUntilRitual = data.nextOccurrence.toMillis() - Date.now();
        if (timeUntilRitual < 24 * 60 * 60 * 1000) priority += 8;
      }
      // Participation affects priority
      priority += Math.min((data.participants?.length || 0), 5);
      break;
  }

  return priority;
}