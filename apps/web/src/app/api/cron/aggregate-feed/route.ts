import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from '@/lib/structured-logger';
import * as admin from 'firebase-admin';

// This cron job runs every 5 minutes to aggregate feed data
export async function GET(request: NextRequest) {
  try {
    // Verify this is a Vercel cron job request
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    logger.info('Starting feed aggregation cron job');

    const startTime = Date.now();
    const fiveMinutesAgo = new Date(startTime - 5 * 60 * 1000);

    // Get active users (logged in within last 24 hours)
    const activeUsersSnapshot = await dbAdmin
      .collection('users')
      .where('lastActive', '>', new Date(startTime - 24 * 60 * 60 * 1000))
      .select('spaces', 'preferences')
      .get();

    logger.info('Found active users', { count: activeUsersSnapshot.size });

    let processedUsers = 0;
    let totalFeedItems = 0;
    const errors: any[] = [];

    // Process users in batches
    const batchSize = 10;
    const userBatches = [];
    let currentBatch: any[] = [];

    activeUsersSnapshot.forEach((doc: any) => {
      currentBatch.push({ id: doc.id, data: doc.data() });
      if (currentBatch.length >= batchSize) {
        userBatches.push(currentBatch);
        currentBatch = [];
      }
    });
    if (currentBatch.length > 0) {
      userBatches.push(currentBatch);
    }

    // Process each batch
    for (const batch of userBatches) {
      const batchPromises = batch.map(async (user: any) => {
        try {
          const feedItems = await aggregateFeedForUser(
            user.id,
            user.data.spaces || [],
            fiveMinutesAgo
          );
          
          if (feedItems.length > 0) {
            await saveFeedItems(user.id, feedItems);
            totalFeedItems += feedItems.length;
          }
          
          processedUsers++;
        } catch (error) {
          errors.push({ userId: user.id, error: String(error) });
          logger.error('Failed to aggregate feed for user', { 
            userId: user.id, 
            error 
          });
        }
      });

      await Promise.all(batchPromises);
    }

    const duration = Date.now() - startTime;

    logger.info('Feed aggregation completed', {
      processedUsers,
      totalFeedItems,
      duration,
      errors: errors.length
    });

    return NextResponse.json({
      success: true,
      stats: {
        processedUsers,
        totalFeedItems,
        duration,
        errorCount: errors.length
      }
    });

  } catch (error) {
    logger.error('Feed aggregation cron job failed', { error });
    return NextResponse.json(
      { error: 'Feed aggregation failed' },
      { status: 500 }
    );
  }
}

async function aggregateFeedForUser(
  userId: string,
  spaceIds: string[],
  since: Date
): Promise<any[]> {
  const feedItems: any[] = [];

  if (spaceIds.length === 0) {
    return feedItems;
  }

  // Limit to 10 spaces for Firestore 'in' query
  const limitedSpaceIds = spaceIds.slice(0, 10);

  try {
    // Get recent posts from user's spaces
    const postsSnapshot = await dbAdmin
      .collectionGroup('posts')
      .where('spaceId', 'in', limitedSpaceIds)
      .where('createdAt', '>', since)
      .orderBy('createdAt', 'desc')
      .limit(30)
      .get();

    postsSnapshot.forEach((doc: any) => {
      const postData = doc.data();
      feedItems.push({
        id: doc.id,
        type: 'post',
        spaceId: postData.spaceId,
        content: postData,
        priority: calculatePriority('post', postData),
        timestamp: postData.createdAt
      });
    });

    // Get upcoming events
    const eventsSnapshot = await dbAdmin
      .collectionGroup('events')
      .where('spaceId', 'in', limitedSpaceIds)
      .where('startDate', '>', new Date())
      .where('startDate', '<', new Date(Date.now() + 7 * 24 * 60 * 60 * 1000))
      .orderBy('startDate', 'asc')
      .limit(10)
      .get();

    eventsSnapshot.forEach((doc: any) => {
      const eventData = doc.data();
      feedItems.push({
        id: doc.id,
        type: 'event',
        spaceId: eventData.spaceId,
        content: eventData,
        priority: calculatePriority('event', eventData),
        timestamp: eventData.createdAt
      });
    });

    // Get active rituals
    const ritualsSnapshot = await dbAdmin
      .collection('rituals')
      .where('spaceIds', 'array-contains-any', limitedSpaceIds)
      .where('isActive', '==', true)
      .where('nextOccurrence', '>', new Date())
      .limit(5)
      .get();

    ritualsSnapshot.forEach((doc: any) => {
      const ritualData = doc.data();
      feedItems.push({
        id: doc.id,
        type: 'ritual',
        content: ritualData,
        priority: calculatePriority('ritual', ritualData),
        timestamp: ritualData.createdAt
      });
    });

  } catch (error) {
    logger.error('Error aggregating feed for user', { userId, error });
  }

  return feedItems;
}

function calculatePriority(type: string, data: any): number {
  let priority = 50;

  switch (type) {
    case 'post':
      // Coordination posts get higher priority
      if (data.tags?.includes('coordination')) priority += 20;
      // Recent posts
      const postAge = Date.now() - data.createdAt.toMillis();
      if (postAge < 60 * 60 * 1000) priority += 15;
      // Engagement
      priority += Math.min((data.reactions?.heart || 0) * 2, 10);
      break;

    case 'event':
      // Upcoming events get higher priority
      const timeUntilEvent = data.startDate.toMillis() - Date.now();
      if (timeUntilEvent < 24 * 60 * 60 * 1000) priority += 25;
      else if (timeUntilEvent < 3 * 24 * 60 * 60 * 1000) priority += 15;
      break;

    case 'ritual':
      // Active rituals with upcoming occurrences
      if (data.nextOccurrence) {
        const timeUntilRitual = data.nextOccurrence.toMillis() - Date.now();
        if (timeUntilRitual < 24 * 60 * 60 * 1000) priority += 10;
      }
      break;
  }

  return Math.min(100, priority);
}

async function saveFeedItems(userId: string, feedItems: any[]): Promise<void> {
  const batch = dbAdmin.batch();
  const userFeedRef = dbAdmin.collection('feed').doc(userId).collection('items');

  // Clear old items first (optional, to prevent unbounded growth)
  const oldItemsSnapshot = await userFeedRef
    .orderBy('aggregatedAt', 'desc')
    .offset(100)
    .get();

  oldItemsSnapshot.forEach((doc: any) => {
    batch.delete(doc.ref);
  });

  // Add new items
  feedItems.slice(0, 50).forEach((item: any) => {
    const newDocRef = userFeedRef.doc();
    batch.set(newDocRef, {
      ...item,
      aggregatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  });

  await batch.commit();
}