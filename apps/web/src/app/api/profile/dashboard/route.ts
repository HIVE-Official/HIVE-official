import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware";
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/structured-logger";

/**
 * Get profile dashboard data
 * GET /api/profile/dashboard
 *
 * Query params:
 * - timeRange: 'day' | 'week' | 'month' | 'all'
 * - includeRecommendations: boolean
 */
export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const userId = getUserId(request);
  const { searchParams } = new URL(request.url);
  const timeRange = searchParams.get('timeRange') || 'week';
  const includeRecommendations = searchParams.get('includeRecommendations') === 'true';

  try {
    // Development mode mock data
    if (userId === 'dev-user-1' || userId === 'test-user' || userId === 'dev_user_123' || userId === 'debug-user') {
      return respond.success({
        dashboard: {
          quickActions: {
            favoriteSpaces: [
              {
                id: 'cs-370',
                name: 'CS 370 Study Group',
                color: '#4F46E5',
                memberCount: 45,
                lastActivity: new Date().toISOString(),
              },
              {
                id: 'ub-builders',
                name: 'UB Builders',
                color: '#EC4899',
                memberCount: 128,
                lastActivity: new Date(Date.now() - 3600000).toISOString(),
              },
            ],
            recentTools: [
              {
                id: 'study-timer',
                name: 'Pomodoro Timer',
                icon: 'clock',
                lastUsed: new Date(Date.now() - 7200000).toISOString(),
              },
            ],
          },
          recentActivity: {
            spaces: [
              {
                spaceId: 'cs-370',
                spaceName: 'CS 370 Study Group',
                action: 'joined',
                timestamp: new Date(Date.now() - 86400000).toISOString(),
              },
              {
                spaceId: 'math-club',
                spaceName: 'Math Club',
                action: 'posted',
                timestamp: new Date(Date.now() - 172800000).toISOString(),
              },
            ],
            connections: [
              {
                userId: 'user-2',
                userName: 'Sarah Chen',
                action: 'connected',
                timestamp: new Date(Date.now() - 259200000).toISOString(),
              },
            ],
          },
          upcomingEvents: [
            {
              id: 'event-1',
              title: 'CS 370 Midterm Review',
              description: 'Group study session covering data structures and algorithms',
              startDate: new Date(Date.now() + 86400000).toISOString(),
              endDate: new Date(Date.now() + 90000000).toISOString(),
              type: 'study',
              spaceId: 'cs-370',
              spaceName: 'CS 370 Study Group',
            },
            {
              id: 'event-2',
              title: 'Hackathon Kickoff',
              description: 'Join us for the opening ceremony and team formation',
              startDate: new Date(Date.now() + 172800000).toISOString(),
              endDate: new Date(Date.now() + 176400000).toISOString(),
              type: 'event',
              spaceId: 'ub-builders',
              spaceName: 'UB Builders',
            },
          ],
          stats: {
            weeklyActivity: {
              posts: 5,
              comments: 12,
              reactions: 23,
              toolsUsed: 8,
            },
            streakInfo: {
              current: 7,
              longest: 21,
              nextMilestone: 14,
            },
          },
          recommendations: includeRecommendations ? {
            spaces: [
              {
                id: 'data-science',
                name: 'Data Science Club',
                reason: 'Based on your interests in CS and Math',
                memberCount: 89,
                matchScore: 0.85,
              },
            ],
            events: [
              {
                id: 'career-fair',
                title: 'Tech Career Fair',
                date: new Date(Date.now() + 604800000).toISOString(),
                reason: 'Popular with CS students',
              },
            ],
            connections: [
              {
                userId: 'user-3',
                userName: 'Mike Rodriguez',
                reason: 'Shares 3 spaces with you',
                sharedSpaces: ['cs-370', 'ub-builders', 'math-club'],
              },
            ],
          } : undefined,
        },
      });
    }

    // Production implementation with Firestore
    const now = new Date();
    const timeRangeMs = {
      day: 86400000,
      week: 604800000,
      month: 2592000000,
      all: Date.now(),
    }[timeRange] || 604800000;
    const startDate = new Date(now.getTime() - timeRangeMs);

    // Get user's spaces with optimized limits
    const spaceMemberships = await dbAdmin
      .collection('spaces')
      .where('members', 'array-contains', userId)
      .orderBy('lastActivityAt', 'desc')
      .limit(5) // Reduced from 10 to minimize data transfer
      .get();

    const favoriteSpaces = spaceMemberships.docs.slice(0, 3).map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        color: data.color || '#4F46E5',
        memberCount: data.memberCount || 0,
        lastActivity: data.lastActivityAt || data.updatedAt || new Date().toISOString(),
      };
    });

    // Get recent activity (simplified for now)
    const recentActivity = {
      spaces: spaceMemberships.docs.slice(0, 5).map(doc => ({
        spaceId: doc.id,
        spaceName: doc.data().name,
        action: 'active',
        timestamp: doc.data().lastActivityAt || new Date().toISOString(),
      })),
      connections: [], // Would need to query connections collection
    };

    // Get upcoming events from spaces - OPTIMIZED: Use Promise.all to batch queries
    const upcomingEvents = [];
    const topSpaces = spaceMemberships.docs.slice(0, 3);

    if (topSpaces.length > 0) {
      // Run all event queries in parallel instead of sequentially
      const eventQueries = topSpaces.map(async (spaceDoc) => {
        const eventsSnapshot = await dbAdmin
          .collection('spaces')
          .doc(spaceDoc.id)
          .collection('events')
          .where('startDate', '>', now.toISOString())
          .orderBy('startDate')
          .limit(2)
          .get();

        return eventsSnapshot.docs.map(eventDoc => {
          const eventData = eventDoc.data();
          return {
            id: eventDoc.id,
            title: eventData.title,
            description: eventData.description || '',
            startDate: eventData.startDate,
            endDate: eventData.endDate,
            type: eventData.type || 'event',
            spaceId: spaceDoc.id,
            spaceName: spaceDoc.data().name,
          };
        });
      });

      // Wait for all queries to complete
      const eventResults = await Promise.all(eventQueries);
      upcomingEvents.push(...eventResults.flat());
    }

    // Get user stats
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    const userData = userDoc.data();

    const dashboard = {
      quickActions: {
        favoriteSpaces,
        recentTools: [], // Would need to query tools collection
      },
      recentActivity,
      upcomingEvents: upcomingEvents.slice(0, 5),
      stats: {
        weeklyActivity: {
          posts: userData?.weeklyPosts || 0,
          comments: userData?.weeklyComments || 0,
          reactions: userData?.weeklyReactions || 0,
          toolsUsed: userData?.weeklyToolsUsed || 0,
        },
        streakInfo: {
          current: userData?.currentStreak || 0,
          longest: userData?.longestStreak || 0,
          nextMilestone: 14,
        },
      },
    };

    // Add recommendations if requested
    if (includeRecommendations) {
      // Get spaces the user is not a member of for recommendations
      const allSpacesSnapshot = await dbAdmin
        .collection('spaces')
        .where('campusId', '==', 'ub-buffalo')
        .where('isActive', '==', true)
        .orderBy('memberCount', 'desc') // Order by popularity
        .limit(10) // Reduced from 20 to improve performance
        .get();

      const userSpaceIds = new Set(spaceMemberships.docs.map(doc => doc.id));
      const recommendedSpaces = allSpacesSnapshot.docs
        .filter(doc => !userSpaceIds.has(doc.id))
        .slice(0, 3)
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            reason: 'Popular in your network',
            memberCount: data.memberCount || 0,
            matchScore: Math.random() * 0.3 + 0.7, // Mock match score
          };
        });

      (dashboard as any)['recommendations'] = {
        spaces: recommendedSpaces,
        events: [], // Would need more complex logic
        connections: [], // Would need user matching logic
      };
    }

    return respond.success({ dashboard });
  } catch (error) {
    logger.error('Failed to fetch dashboard data', {
      error: error instanceof Error ? error : new Error('Unknown error'),
      userId,
    });
    return respond.error(
      'Failed to fetch dashboard data',
      'INTERNAL_ERROR',
      { status: 500 }
    );
  }
});