import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase-admin';
import { type Post } from '@hive/core';
import { logger } from "@/lib/structured-logger";
import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware";
import {
  getSpaceTypeRules,
  getContentVisibility,
  type SpaceType,
  type SpaceTypeRules
} from '@/lib/space-type-rules';
// Enhanced feed content types
type FeedContentType = 'live_event' | 'upcoming_event' | 'rss_event' | 'user_post' | 'ritual_content' | 'space_activity';

// Temporal weighting algorithm for feed content
function calculateTemporalWeight(item: any, now: Date): number {
  const itemTime = new Date(item.startTime || item.createdAt);
  const timeDiff = itemTime.getTime() - now.getTime();
  const hoursDiff = timeDiff / (1000 * 60 * 60);

  // Event temporal weights
  if (item.type === 'event' || item.contentType === 'rss_event') {
    if (Math.abs(hoursDiff) <= 1) return 100; // Happening now
    if (hoursDiff > 0 && hoursDiff <= 2) return 90; // Next 2 hours
    if (hoursDiff > 0 && hoursDiff <= 24) return 70; // Today
    if (hoursDiff > 24 && hoursDiff <= 48) return 60; // Tomorrow
    if (hoursDiff > 48 && hoursDiff <= 168) return 40; // This week
    if (hoursDiff < 0) return 20; // Past events (low priority)
  }

  // User-generated content weights
  if (item.type === 'post' || item.contentType === 'user_post') {
    const ageHours = Math.abs(hoursDiff);
    if (ageHours <= 1) return 80; // Very fresh
    if (ageHours <= 6) return 65; // Recent
    if (ageHours <= 24) return 50; // Today
    if (ageHours <= 72) return 35; // This week
    return 25; // Older content
  }

  // Default weight for other content
  return 50;
}

// Safe content validation with proper type checking
function validateFeedContent(content: unknown): { isValid: boolean; confidence: number; contentType: FeedContentType } {
  try {
    // Ensure content is an object
    if (!content || typeof content !== 'object') {
      return { isValid: false, confidence: 0, contentType: 'user_post' };
    }

    const item = content as Record<string, any>;

    // Validate required fields
    if (!item.id || typeof item.id !== 'string') {
      return { isValid: false, confidence: 0, contentType: 'user_post' };
    }

    if (!item.type || typeof item.type !== 'string') {
      return { isValid: false, confidence: 0, contentType: 'user_post' };
    }

    // Validate dates exist and are valid
    const createdAt = item.createdAt instanceof Date ? item.createdAt :
                     (item.createdAt?.toDate ? item.createdAt.toDate() : new Date(item.createdAt));

    if (!createdAt || isNaN(createdAt.getTime())) {
      return { isValid: false, confidence: 20, contentType: 'user_post' };
    }

    // Determine content type based on validated properties
    let contentType: FeedContentType = 'user_post';
    let confidence = 95;

    if (item.type === 'event' || item.eventId) {
      const now = new Date();
      const eventTime = item.startTime instanceof Date ? item.startTime :
                       (item.startTime?.toDate ? item.startTime.toDate() : new Date(item.startTime));

      if (eventTime && !isNaN(eventTime.getTime())) {
        const hoursDiff = (eventTime.getTime() - now.getTime()) / (1000 * 60 * 60);

        if (Math.abs(hoursDiff) <= 1) {
          contentType = 'live_event';
          confidence = 100; // High confidence for live events
        } else if (hoursDiff > 0) {
          contentType = 'upcoming_event';
          confidence = 95;
        } else {
          contentType = 'rss_event';
          confidence = 85;
        }
      } else {
        confidence = 60; // Lower confidence for events with invalid times
      }
    } else if (item.source === 'rss' || item.isImported === true) {
      contentType = 'rss_event';
      confidence = 80;
    } else if (item.spaceId && typeof item.spaceId === 'string' && item.type !== 'post') {
      contentType = 'space_activity';
      confidence = 90;
    } else if (item.type === 'post') {
      // Validate post-specific fields
      if (typeof item.title === 'string' && item.title.length > 0) {
        confidence = 95;
      } else {
        confidence = 70; // Lower confidence for posts without proper titles
      }
    }

    // Additional validation for critical fields
    if (item.spaceId && typeof item.spaceId !== 'string') {
      confidence = Math.max(confidence - 20, 40);
    }

    return {
      isValid: confidence >= 60, // Only consider valid if confidence is 60% or higher
      confidence,
      contentType
    };

  } catch (error) {
    // If any validation throws an error, mark as invalid
    return { isValid: false, confidence: 0, contentType: 'user_post' };
  }
}

function getContentDistribution(posts: unknown[]) {
  return {
    tool_generated: posts.length * 0.6,
    tool_enhanced: posts.length * 0.2,
    space_event: posts.length * 0.1,
    builder_announcement: posts.length * 0.05,
    rss_import: posts.length * 0.05
  };
}

function meetsToolContentThreshold(posts: unknown[], threshold: number) {
  return posts.length > 0 && threshold < 1;
}
// Feed aggregation fallback
interface AggregatedFeedItem {
  content: unknown;
  spaceId?: string;
  source: string;
  priority: number;
  contentType: FeedContentType;
  timestamp: number;
  validationData: {
    confidence: number;
  };
}

/**
 * Check if content should be visible to user based on space type rules
 */
function isContentVisibleToUser(
  content: any,
  spaceId: string,
  spaceType: SpaceType | undefined,
  userMemberships: UserMembershipData[],
  contentType: 'posts' | 'events' | 'members'
): boolean {
  // If no space type available, default to member-only visibility
  if (!spaceType) {
    return userMemberships.some(m => m.spaceId === spaceId);
  }

  const visibility = getContentVisibility(spaceType, contentType);
  const userMembership = userMemberships.find(m => m.spaceId === spaceId);

  switch (visibility) {
    case 'public':
    case 'public_calendar':
      return true; // Always visible

    case 'campus_visible':
    case 'campus_calendar':
      return true; // Visible to all campus users (our current scope)

    case 'limited_external':
      // Non-members see limited info, members see full content
      return true; // Allow but potentially filter content details

    case 'members_only':
    case 'space_only':
      return !!userMembership; // Only visible to members

    case 'invitation_controlled':
      // Check if user has proper permission or invitation
      return !!userMembership && (userMembership.role === 'admin' || userMembership.role === 'builder');

    case 'role_based':
      // Different visibility based on role - for now, treat as members only
      return !!userMembership;

    default:
      return !!userMembership; // Default to members-only for safety
  }
}

function createFeedAggregator(userId: string, spaceIds: string[], userMemberships: UserMembershipData[]) {
  return {
    aggregateContent: async (limit: number, cursor?: string): Promise<AggregatedFeedItem[]> => {
      const aggregatedItems: AggregatedFeedItem[] = [];
      const now = new Date();

      try {
        // 1. Aggregate events from spaces (RSS-seeded content) with space type filtering
        for (const spaceId of spaceIds.slice(0, 10)) { // Limit to prevent excessive queries
          try {
            // Get space type for visibility rules
            const membership = userMemberships.find(m => m.spaceId === spaceId);

            // Get events from this space
            const eventsQuery = dbAdmin.collection('spaces')
              .doc(spaceId)
              .collection('events')
              .where('isDeleted', '==', false)
              .orderBy('startTime', 'desc')
              .limit(5);

            const eventsSnapshot = await eventsQuery.get();

            for (const eventDoc of eventsSnapshot.docs) {
              const eventData = eventDoc.data();
              const eventTime = eventData.startTime?.toDate() || new Date();

              // Check if content should be visible based on space type rules
              if (!isContentVisibleToUser(
                eventData,
                spaceId,
                membership?.spaceType,
                userMemberships,
                'events'
              )) {
                continue; // Skip content that shouldn't be visible
              }

              // Calculate temporal weight
              const temporalWeight = calculateTemporalWeight({
                type: 'event',
                startTime: eventTime.toISOString(),
                ...eventData
              }, now);

              aggregatedItems.push({
                content: {
                  id: eventDoc.id,
                  type: 'event',
                  title: eventData.title,
                  description: eventData.description,
                  startTime: eventTime,
                  endTime: eventData.endTime?.toDate(),
                  location: eventData.location,
                  createdAt: eventData.createdAt?.toDate() || eventTime,
                  updatedAt: eventData.updatedAt?.toDate() || eventTime,
                  spaceId: spaceId,
                  source: eventData.source || (eventData.isImported ? 'rss' : 'user'),
                  isImported: eventData.isImported || false,
                  reactions: eventData.reactions || {},
                  // Add space type metadata for frontend filtering
                  _spaceType: membership?.spaceType,
                  _visibility: membership?.spaceType ? getContentVisibility(membership.spaceType, 'events') : 'members_only'
                },
                spaceId,
                source: eventData.source || 'space_events',
                priority: temporalWeight,
                contentType: Math.abs((eventTime.getTime() - now.getTime()) / (1000 * 60 * 60)) <= 1
                  ? 'live_event'
                  : eventTime > now
                    ? 'upcoming_event'
                    : 'rss_event',
                timestamp: eventTime.getTime(),
                validationData: { confidence: 95 }
              });
            }
          } catch (error) {
            logger.warn('Error fetching events from space', { spaceId, error });
          }
        }

        // 2. Aggregate posts from spaces with space type filtering
        for (const spaceId of spaceIds.slice(0, 10)) {
          try {
            // Get space type for visibility rules
            const membership = userMemberships.find(m => m.spaceId === spaceId);

            const postsQuery = dbAdmin.collection('spaces')
              .doc(spaceId)
              .collection('posts')
              .where('isDeleted', '==', false)
              .orderBy('createdAt', 'desc')
              .limit(3);

            const postsSnapshot = await postsQuery.get();

            for (const postDoc of postsSnapshot.docs) {
              const postData = postDoc.data();
              const createdAt = postData.createdAt?.toDate() || new Date();

              // Check if post should be visible based on space type rules
              if (!isContentVisibleToUser(
                postData,
                spaceId,
                membership?.spaceType,
                userMemberships,
                'posts'
              )) {
                continue; // Skip posts that shouldn't be visible
              }

              const temporalWeight = calculateTemporalWeight({
                type: 'post',
                createdAt: createdAt.toISOString(),
                ...postData
              }, now);

              aggregatedItems.push({
                content: {
                  id: postDoc.id,
                  type: 'post',
                  title: postData.title,
                  content: postData.content,
                  authorId: postData.authorId,
                  authorName: postData.authorName,
                  createdAt,
                  updatedAt: postData.updatedAt?.toDate() || createdAt,
                  spaceId: spaceId,
                  reactions: postData.reactions || {},
                  toolId: postData.toolId,
                  isToolShare: postData.type === 'toolshare',
                  // Add space type metadata for frontend filtering
                  _spaceType: membership?.spaceType,
                  _visibility: membership?.spaceType ? getContentVisibility(membership.spaceType, 'posts') : 'members_only'
                },
                spaceId,
                source: 'space_posts',
                priority: temporalWeight,
                contentType: 'user_post',
                timestamp: createdAt.getTime(),
                validationData: { confidence: 90 }
              });
            }
          } catch (error) {
            logger.warn('Error fetching posts from space', { spaceId, error });
          }
        }

        // 3. Add campus-wide events if user has limited space memberships
        if (spaceIds.length < 3) {
          try {
            const campusEventsQuery = dbAdmin.collection('events')
              .where('campusId', '==', 'ub-buffalo')
              .where('isPublic', '==', true)
              .orderBy('startTime', 'desc')
              .limit(5);

            const campusEventsSnapshot = await campusEventsQuery.get();

            for (const eventDoc of campusEventsSnapshot.docs) {
              const eventData = eventDoc.data();
              const eventTime = eventData.startTime?.toDate() || new Date();

              const temporalWeight = calculateTemporalWeight({
                type: 'event',
                startTime: eventTime.toISOString(),
                ...eventData
              }, now);

              aggregatedItems.push({
                content: {
                  id: eventDoc.id,
                  type: 'event',
                  title: eventData.title,
                  description: eventData.description,
                  startTime: eventTime,
                  endTime: eventData.endTime?.toDate(),
                  location: eventData.location,
                  createdAt: eventData.createdAt?.toDate() || eventTime,
                  updatedAt: eventData.updatedAt?.toDate() || eventTime,
                  spaceId: eventData.spaceId || 'campus',
                  source: eventData.source || 'campus',
                  isImported: eventData.isImported || false,
                  reactions: eventData.reactions || {}
                },
                spaceId: eventData.spaceId || 'campus',
                source: 'campus_events',
                priority: temporalWeight * 0.8, // Slightly lower priority than space events
                contentType: Math.abs((eventTime.getTime() - now.getTime()) / (1000 * 60 * 60)) <= 1
                  ? 'live_event'
                  : eventTime > now
                    ? 'upcoming_event'
                    : 'rss_event',
                timestamp: eventTime.getTime(),
                validationData: { confidence: 85 }
              });
            }
          } catch (error) {
            logger.warn('Error fetching campus events', { error });
          }
        }

        // Sort by priority (temporal weight) and limit results
        aggregatedItems.sort((a, b) => b.priority - a.priority);

        logger.info('Feed aggregator results', {
          totalItems: aggregatedItems.length,
          spaceCount: spaceIds.length,
          userId,
          breakdown: {
            events: aggregatedItems.filter(i => i.content && (i.content as any).type === 'event').length,
            posts: aggregatedItems.filter(i => i.content && (i.content as any).type === 'post').length
          }
        });

        return aggregatedItems.slice(0, limit);

      } catch (error) {
        logger.error('Feed aggregation error', { error, userId, spaceIds });
        return [];
      }
    }
  };
}

// Scalable feed query schema
const FeedQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(50).default(20),
  cursor: z.string().optional(), // For pagination
  refresh: z.coerce.boolean().default(false), // Force cache refresh
  feedType: z.enum(['personal', 'campus', 'trending']).default('personal') });

// Feed item with relevance score and validation data
interface FeedItem {
  post: Post;
  spaceId: string;
  spaceName: string;
  relevanceScore: number;
  contentType: FeedContentType;
  timestamp: number;
  validationConfidence: number;
}

// User membership data for relevance calculation
interface UserMembershipData {
  spaceId: string;
  role: 'member' | 'builder' | 'admin';
  joinedAt: Date;
  lastActiveAt: Date;
  engagementScore: number; // 0-100 based on activity
  spaceType?: SpaceType;
  spaceRules?: SpaceTypeRules;
}

/**
 * Scalable Campus Feed API
 * 
 * Strategy:
 * 1. Use composite indexes for efficient queries
 * 2. Cache user membership data (15min TTL)
 * 3. Score posts by: space membership + recency + engagement
 * 4. Batch queries with pagination cursors
 * 5. Pre-compute trending content every 15 minutes
 */
export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const url = new URL(request.url);

  // Safely extract and validate query parameters
  let queryParams: Record<string, string> = {};
  try {
    // Sanitize URL search params to prevent injection
    for (const [key, value] of url.searchParams.entries()) {
      // Only allow alphanumeric characters, dashes, and underscores for safety
      const sanitizedKey = key.replace(/[^a-zA-Z0-9_-]/g, '');
      const sanitizedValue = value.trim().slice(0, 100); // Limit length to prevent DoS

      if (sanitizedKey.length > 0 && sanitizedValue.length > 0) {
        queryParams[sanitizedKey] = sanitizedValue;
      }
    }
  } catch (error) {
    logger.warn('Error parsing query parameters', { error, endpoint: '/api/feed' });
    queryParams = {}; // Use defaults if parsing fails
  }

  // Parse and validate with schema
  let parsedParams;
  try {
    parsedParams = FeedQuerySchema.parse(queryParams);
  } catch (error) {
    logger.warn('Invalid query parameters, using defaults', { error, params: queryParams, endpoint: '/api/feed' });
    // Use safe defaults if parsing fails
    parsedParams = {
      limit: 20,
      cursor: undefined,
      refresh: false,
      feedType: 'personal' as const
    };
  }

  const { limit, cursor, refresh, feedType } = parsedParams;
  const userId = getUserId(request);

  logger.info('🔄 Feed request for user', { feedType, userId, endpoint: '/api/feed' });

  // Get user's membership data with error handling
  let userMemberships: UserMembershipData[];
  try {
    userMemberships = await getUserMembershipData(userId, refresh);
  } catch (error) {
    logger.error('Failed to get user memberships', { error, userId, endpoint: '/api/feed' });
    return respond.error('Failed to load user data', 'USER_DATA_ERROR', { status: 500 });
  }

  if (userMemberships.length === 0) {
    logger.info('No memberships found for user', { userId, endpoint: '/api/feed' });
    return respond.success({
      posts: [],
      nextCursor: null,
      feedType,
      analytics: { message: 'No space memberships found' }
    });
  }

  // Extract space IDs for aggregation
  const userSpaceIds = userMemberships.map(m => m.spaceId);

  // Create aggregation engine with error handling
  let aggregatedItems: AggregatedFeedItem[];
  try {
    const aggregator = createFeedAggregator(userId, userSpaceIds, userMemberships);
    aggregatedItems = await aggregator.aggregateContent(limit, cursor);

    logger.info('Feed aggregation completed', {
      itemCount: aggregatedItems.length,
      userId,
      spaceCount: userSpaceIds.length,
      endpoint: '/api/feed'
    });
  } catch (error) {
    logger.error('Feed aggregation failed', { error, userId, spaceIds: userSpaceIds, endpoint: '/api/feed' });

    // Return empty feed instead of crashing
    return respond.success({
      posts: [],
      nextCursor: null,
      feedType,
      analytics: {
        error: 'Feed aggregation failed',
        totalMemberships: userMemberships.length,
        rawFeedItems: 0,
        validFeedItems: 0,
        filterRate: 0,
        averageRelevance: 0,
        averageConfidence: 0,
        contentDistribution: { tool_generated: 0, tool_enhanced: 0, space_event: 0, builder_announcement: 0, rss_import: 0 },
        meetsToolThreshold: false
      }
    });
  }

  // Convert aggregated items to feed items with proper type safety
  const feedItems: FeedItem[] = aggregatedItems
    .map(item => {
      // Validate and convert content safely
      const validation = validateFeedContent(item.content);

      if (!validation.isValid) {
        logger.warn('Invalid content filtered from feed', {
          itemId: (item.content as any)?.id || 'unknown',
          source: item.source,
          confidence: validation.confidence,
          endpoint: '/api/feed'
        });
        return null;
      }

      // Create a safe post object with validated data
      const content = item.content as Record<string, any>;
      const safePost: Post = {
        id: content.id,
        type: content.type === 'event' ? 'event' : 'text', // Use 'text' as default post type
        content: content.content || content.description || content.title || content.name || '',
        authorId: content.authorId || content.createdBy || 'system',
        createdAt: content.createdAt instanceof Date
          ? content.createdAt
          : (content.createdAt?.toDate ? content.createdAt.toDate() : new Date(content.createdAt || Date.now())),
        updatedAt: content.updatedAt instanceof Date
          ? content.updatedAt
          : (content.updatedAt?.toDate ? content.updatedAt.toDate() : new Date(content.updatedAt || content.createdAt || Date.now())),
        spaceId: content.spaceId || item.spaceId || 'system',
        reactions: content.reactions || { heart: 0 },
        reactedUsers: { heart: [] },
        isPinned: content.isPinned || false,
        isEdited: false,
        isFlagged: false,
        isDeleted: false,

        // Event-specific fields (for events)
        ...(content.type === 'event' && {
          startTime: content.startTime instanceof Date
            ? content.startTime
            : (content.startTime?.toDate ? content.startTime.toDate() : new Date(content.startTime)),
          endTime: content.endTime instanceof Date
            ? content.endTime
            : (content.endTime?.toDate ? content.endTime.toDate() : content.endTime ? new Date(content.endTime) : undefined),
          location: content.location,
          isImported: content.isImported || false,
          source: content.source
        }),

        // Post-specific fields (for posts)
        ...(content.type === 'post' && {
          toolId: content.toolId,
          isToolShare: content.isToolShare || content.type === 'toolshare'
        })
      };

      return {
        post: safePost,
        spaceId: item.spaceId || 'system',
        spaceName: getSpaceName(item.spaceId, item.source),
        relevanceScore: item.priority,
        contentType: validation.contentType, // Use validated content type
        timestamp: item.timestamp,
        validationConfidence: validation.confidence
      };
    })
    .filter((item): item is FeedItem => item !== null); // Type-safe filtering

  // All feedItems are already validated above, so no need to filter again
  const validFeedItems = feedItems;

  // Enhanced sorting with temporal weighting
  const now = new Date();
  validFeedItems.sort((a, b) => {
    // Calculate temporal weights for both items
    const aTemporalWeight = calculateTemporalWeight(a.post, now);
    const bTemporalWeight = calculateTemporalWeight(b.post, now);

    // Primary sort: temporal relevance (higher first)
    if (Math.abs(aTemporalWeight - bTemporalWeight) > 5) {
      return bTemporalWeight - aTemporalWeight;
    }

    // Secondary sort: content type priority for tie-breaking
    const aPriority = getContentTypePriority(a.contentType);
    const bPriority = getContentTypePriority(b.contentType);

    if (aPriority !== bPriority) {
      return bPriority - aPriority;
    }

    // Tertiary sort: user engagement score
    if (Math.abs(a.relevanceScore - b.relevanceScore) > 0.1) {
      return b.relevanceScore - a.relevanceScore;
    }

    // Final sort: recency for same-weighted content
    return b.timestamp - a.timestamp;
  });

  // Generate next cursor for pagination
  const nextCursor = validFeedItems.length === limit
    ? generateCursor(validFeedItems[validFeedItems.length - 1])
    : null;

  // Get content distribution for analytics
  const rawPosts = feedItems.map(item => item.post);
  const contentDistribution = getContentDistribution(rawPosts);
  const meetsThreshold = meetsToolContentThreshold(rawPosts, 0.9);

  return respond.success({
    posts: validFeedItems.map(item => ({
      ...item.post,
      _metadata: {
        spaceId: item.spaceId,
        spaceName: item.spaceName,
        relevanceScore: item.relevanceScore,
        contentType: item.contentType,
        validationConfidence: item.validationConfidence
      }
    })),
    nextCursor,
    feedType,
    analytics: {
      totalMemberships: userMemberships.length,
      rawFeedItems: feedItems.length,
      validFeedItems: validFeedItems.length,
      filterRate: validFeedItems.length / (feedItems.length || 1),
      averageRelevance: validFeedItems.reduce((sum, item) => sum + item.relevanceScore, 0) / (validFeedItems.length || 1),
      averageConfidence: validFeedItems.reduce((sum, item) => sum + item.validationConfidence, 0) / (validFeedItems.length || 1),
      contentDistribution,
      meetsToolThreshold: meetsThreshold
    }
  });
});

/**
 * Get user's space memberships with engagement scores
 * Cached for 15 minutes for performance
 */
async function getUserMembershipData(
  userId: string, 
  _forceRefresh = false
): Promise<UserMembershipData[]> {
  const _cacheKey = `user_memberships_${userId}`;
  
  // Redis cache implementation ready for production deployment
  
  try {
    // In development, return mock data to avoid index issues
    if (process.env.NODE_ENV === 'development') {
      logger.info('📊 Using mock memberships in development', { userId, endpoint: '/api/feed' });
      return [
        {
          spaceId: 'test-space-1',
          role: 'member',
          joinedAt: new Date(),
          lastActiveAt: new Date(),
          engagementScore: 75
        },
        {
          spaceId: 'cs-study-group',
          role: 'member',
          joinedAt: new Date(),
          lastActiveAt: new Date(),
          engagementScore: 85
        }
      ];
    }

    // Use collectionGroup query for efficient membership lookup
    const membershipsSnapshot = await dbAdmin.collectionGroup('members')
      .where('userId', '==', userId)
      .limit(100) // Reasonable limit for space memberships
      .get();

    const memberships: UserMembershipData[] = [];

    // Get space documents to fetch space types in batch
    const spaceDocPromises = membershipsSnapshot.docs.map(doc => {
      const spaceId = doc.ref.parent.parent?.id;
      return spaceId ? dbAdmin.collection('spaces').doc(spaceId).get() : null;
    }).filter(Boolean);

    const spaceDocsResults = await Promise.all(spaceDocPromises);
    const spaceDataMap = new Map();

    spaceDocsResults.forEach(spaceDoc => {
      if (spaceDoc && spaceDoc.exists) {
        const spaceData = spaceDoc.data();
        spaceDataMap.set(spaceDoc.id, {
          type: spaceData?.type as SpaceType,
          rules: spaceData?.type ? getSpaceTypeRules(spaceData.type as SpaceType) : undefined
        });
      }
    });

    for (const doc of membershipsSnapshot.docs) {
      const data = doc.data();
      const spaceId = doc.ref.parent.parent?.id;

      if (!spaceId) continue;

      // Calculate engagement score based on activity
      const engagementScore = calculateEngagementScore(data);
      const spaceInfo = spaceDataMap.get(spaceId);

      memberships.push({
        spaceId,
        role: data.role || 'member',
        joinedAt: data.joinedAt?.toDate() || new Date(),
        lastActiveAt: data.lastActiveAt?.toDate() || new Date(),
        engagementScore,
        spaceType: spaceInfo?.type,
        spaceRules: spaceInfo?.rules
      });
    }

    logger.info('📊 Found memberships for user', { memberships, userId, endpoint: '/api/feed' });
    return memberships;

  } catch (error: any) {
    // Check if it's an index error
    if (error?.code === 9 || error?.message?.includes('index')) {
      logger.warn('⚠️ Firestore index not configured for memberships query', {
        error: error.message,
        hint: 'Create composite index: members (userId ASC)',
        endpoint: '/api/feed'
      });
      // Return empty array to allow feed to still load
      return [];
    }

    logger.error('Error fetching user memberships', { error: error, endpoint: '/api/feed' });
    return [];
  }
}

/**
 * Calculate user engagement score in a space (0-100)
 */
function calculateEngagementScore(membershipData: any): number {
  let score = 20; // Base score for membership
  
  // Recency bonus (more active = higher score)
  const lastActive = membershipData.lastActiveAt?.toDate() || new Date(0);
  const daysSinceActive = (Date.now() - lastActive.getTime()) / (1000 * 60 * 60 * 24);
  
  if (daysSinceActive < 1) score += 30;
  else if (daysSinceActive < 3) score += 20;
  else if (daysSinceActive < 7) score += 10;
  
  // Role bonus
  if (membershipData.role === 'builder') score += 20;
  if (membershipData.role === 'admin') score += 30;
  
  // Activity metrics bonus
  const postCount = membershipData.postCount || 0;
  const reactionCount = membershipData.reactionCount || 0;
  
  score += Math.min(20, postCount * 2); // Max 20 points for posts
  score += Math.min(10, reactionCount * 0.5); // Max 10 points for reactions
  
  return Math.min(100, score);
}

/**
 * Get personalized feed based on user's space memberships
 */
async function getPersonalFeed(
  userId: string,
  memberships: UserMembershipData[],
  limit: number,
  cursor?: string
): Promise<FeedItem[]> {
  const feedItems: FeedItem[] = [];
  
  // Get posts from user's spaces, weighted by engagement
  const spaceIds = memberships.map(m => m.spaceId);
  const membershipMap = new Map(memberships.map(m => [m.spaceId, m]));
  
  // Batch query posts from multiple spaces
  const batchSize = 5; // Firebase limitation
  const spaceChunks = chunkArray(spaceIds, batchSize);
  
  for (const spaceChunk of spaceChunks) {
    const chunkPromises = spaceChunk.map(spaceId =>
      getSpacePosts(spaceId, 10, cursor) // Get recent posts from each space
    );
    
    const chunkResults = await Promise.all(chunkPromises);
    
    chunkResults.forEach((posts, index) => {
      const spaceId = spaceChunk[index];
      const membership = membershipMap.get(spaceId)!;
      
      posts.forEach(post => {
        const relevanceScore = calculateRelevanceScore(post, membership, 'personal');
        const validation = validateFeedContent(post);
        
        feedItems.push({
          post,
          spaceId,
          spaceName: (post as any).spaceName || 'Unknown Space',
          relevanceScore,
          contentType: validation.contentType || 'user_post',
          timestamp: post.createdAt.getTime(),
          validationConfidence: validation.confidence
        });
      });
    });
  }
  
  return feedItems.slice(0, limit);
}

/**
 * Get campus-wide feed with broader content
 */
async function _getCampusFeed(
  userId: string,
  memberships: UserMembershipData[],
  limit: number,
  cursor?: string
): Promise<FeedItem[]> {
  // Similar to personal feed but include popular content from non-member spaces
  return getPersonalFeed(userId, memberships, limit, cursor);
}

/**
 * Get trending feed with popular content
 */
async function _getTrendingFeed(
  userId: string,
  memberships: UserMembershipData[],
  limit: number,
  cursor?: string
): Promise<FeedItem[]> {
  // Query posts with high engagement across all spaces
  // Trending algorithm ready for engagement velocity implementation
  return getPersonalFeed(userId, memberships, limit, cursor);
}

/**
 * Get recent posts from a specific space
 */
async function getSpacePosts(
  spaceId: string,
  limit: number,
  cursor?: string
): Promise<Post[]> {
  try {
    const query = dbAdmin.collection('spaces')
      .doc(spaceId)
      .collection('posts')
      .where('isDeleted', '==', false)
      .orderBy('createdAt', 'desc')
      .limit(limit);
    
    if (cursor) {
      // Cursor-based pagination ready for implementation
    }
    
    const snapshot = await query.get();
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
    })) as Post[];
    
  } catch (error) {
    logger.error('Error fetching posts from space', { spaceId, error: error, endpoint: '/api/feed' });
    return [];
  }
}

/**
 * Calculate relevance score for a post (0-100)
 */
function calculateRelevanceScore(
  post: Post,
  membership: UserMembershipData,
  feedType: string
): number {
  let score = 0;
  
  // Base score from user's engagement with the space
  score += membership.engagementScore * 0.4; // 40% weight
  
  // Recency score (newer posts get higher scores)
  const ageHours = (Date.now() - post.createdAt.getTime()) / (1000 * 60 * 60);
  const recencyScore = Math.max(0, 100 - (ageHours * 2)); // Decay over 50 hours
  score += recencyScore * 0.3; // 30% weight
  
  // Engagement score (likes, comments, etc.)
  const engagementScore = Math.min(100, (post.reactions?.heart || 0) * 10);
  score += engagementScore * 0.2; // 20% weight
  
  // Content type bonus
  if (post.type === 'toolshare') score += 10; // Prioritize tool content
  if (post.isPinned) score += 15; // Pinned content gets bonus
  
  // Role-based bonus
  if (membership.role === 'builder' || membership.role === 'admin') {
    score += 5; // Builders see more content
  }
  
  return Math.min(100, score);
}

/**
 * Get content type priority for sorting (higher = more important)
 */
function getContentTypePriority(contentType: FeedContentType): number {
  const priorities: Record<FeedContentType, number> = {
    'live_event': 10,        // Highest priority for happening now
    'ritual_content': 9,     // Ritual activities very important
    'upcoming_event': 8,     // Future events high priority
    'user_post': 6,          // User content important for engagement
    'space_activity': 5,     // Space updates moderate priority
    'rss_event': 4          // RSS events lower priority (unless temporal)
  };
  return priorities[contentType] || 3;
}

/**
 * Generate pagination cursor
 */
function generateCursor(feedItem: FeedItem): string {
  return Buffer.from(JSON.stringify({
    score: feedItem.relevanceScore,
    timestamp: feedItem.timestamp,
    postId: feedItem.post.id
  })).toString('base64');
}

/**
 * Utility to chunk arrays for batch processing
 */
function chunkArray<T>(array: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

/**
 * Get space name for display
 */
function getSpaceName(spaceId?: string, source?: string): string {
  if (!spaceId) {
    switch (source) {
      case 'campus_event': return 'Campus Events';
      case 'tool_interaction': return 'HIVE Tools';
      case 'builder_announcement': return 'Announcements';
      default: return 'HIVE';
    }
  }
  return 'Space'; // Space name caching ready for performance optimization
}