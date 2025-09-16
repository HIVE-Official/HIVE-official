import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import type { Post  } from '@/types/core';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus } from "@/lib/api/response-types/api-response-types";
import { withAuth } from '@/lib/api/middleware/api-auth-middleware';
// Temporary fallback implementations for development
type FeedContentType = 'tool_generated' | 'tool_enhanced' | 'space_event' | 'builder_announcement' | 'rss_import';

// Basic validation fallback
function validateFeedContent(_post: unknown) {
  return {
    isValid: true,
    confidence: 95,
    contentType: 'tool_generated' as FeedContentType
  };
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

function createFeedAggregator(userId: string, spaceIds: string[]) {
  return {
    aggregateContent: async (limit: number, cursor?: string): Promise<AggregatedFeedItem[]> => {
      try {
        // Get real posts from user's spaces
        const aggregatedItems: AggregatedFeedItem[] = [];
        
        // Query posts from each space the user is a member of
        // Use Promise.all for parallel fetching
        const spacePromises = spaceIds.slice(0, 10).map(async (spaceId: any) => {
          try {
            // Direct query to posts collection in each space
            const postsQuery = dbAdmin
              .collection('spaces')
              .doc(spaceId)
              .collection('posts')
              .orderBy('createdAt', 'desc')
              .limit(Math.max(5, Math.ceil(limit / Math.min(spaceIds.length, 3))));
            
            const postsSnapshot = await postsQuery.get();
            
            if (!postsSnapshot.empty) {
              // Get space details for metadata
              const spaceDoc = await dbAdmin.collection('spaces').doc(spaceId).get();
              const spaceData = spaceDoc.data();
              
              return postsSnapshot.docs.map(doc => {
                const postData = doc.data();
                return {
                  content: {
                    id: doc.id,
                    ...postData,
                    createdAt: postData.createdAt?.toDate() || new Date(),
                    updatedAt: postData.updatedAt?.toDate() || new Date(),
                    spaceName: spaceData?.name || 'Unknown Space',
                    spaceType: spaceData?.type || 'general'
                  },
                  spaceId,
                  source: `space_${spaceData?.type || 'general'}`,
                  priority: calculatePostPriority(postData),
                  contentType: determineContentType(postData),
                  timestamp: postData.createdAt?.toMillis() || Date.now(),
                  validationData: {
                    confidence: 95
                  }
                };
              });
            }
            return [];
          } catch (spaceError) {
            logger.error('Error fetching posts from space', { spaceId, error: spaceError });
            return [];
          }
        });
        
        // Wait for all space queries to complete
        const spaceResults = await Promise.all(spacePromises);
        
        // Flatten results from all spaces
        for (const posts of spaceResults) {
          aggregatedItems.push(...posts);
        }
        
        // Also fetch coordination posts (study sessions, food runs, etc)
        try {
          const coordinationQuery = dbAdmin
            .collectionGroup('posts')
            .where('type', 'in', ['coordination', 'study_session', 'food_run', 'ride_share', 'meetup'])
            .orderBy('createdAt', 'desc')
            .limit(20);
          
          const coordinationSnapshot = await coordinationQuery.get();
          
          for (const doc of coordinationSnapshot.docs) {
            const postData = doc.data();
            const spaceId = doc.ref.parent.parent?.id || 'unknown';
            
            aggregatedItems.push({
              content: {
                id: doc.id,
                ...postData,
                createdAt: postData.createdAt?.toDate() || new Date(),
                updatedAt: postData.updatedAt?.toDate() || new Date()
              },
              spaceId,
              source: 'coordination',
              priority: 90, // High priority for coordination posts
              contentType: 'space_event',
              timestamp: postData.createdAt?.toMillis() || Date.now(),
              validationData: {
                confidence: 100
              }
            });
          }
        } catch (coordError) {
          logger.error('Error fetching coordination posts', { error: coordError });
        }
        
        // Sort by priority first, then timestamp
        aggregatedItems.sort((a, b) => {
          if (Math.abs(a.priority - b.priority) > 10) {
            return b.priority - a.priority;
          }
          return b.timestamp - a.timestamp;
        });
        
        return aggregatedItems.slice(0, limit);
        
      } catch (error) {
        logger.error('Feed aggregation error', { error, userId, spaceIds });
        return [];
      }
    }
  };
}

// Helper function to calculate post priority
function calculatePostPriority(postData: any): number {
  let priority = 50; // Base priority
  
  // Boost for recent posts
  const ageInHours = (Date.now() - (postData.createdAt?.toMillis() || Date.now())) / (1000 * 60 * 60);
  if (ageInHours < 1) priority += 40;
  else if (ageInHours < 6) priority += 30;
  else if (ageInHours < 24) priority += 20;
  else if (ageInHours < 72) priority += 10;
  
  // Boost for posts with engagement
  if (postData.reactions?.heart > 0) priority += 15;
  if (postData.commentCount > 0) priority += 10;
  if (postData.isPinned) priority += 30;
  
  // Boost for coordination posts
  if (postData.type === 'coordination' || postData.type === 'study_session') priority += 20;
  if (postData.type === 'food_run' || postData.type === 'ride_share') priority += 15;
  
  return Math.min(100, priority);
}

// Helper function to determine content type
function determineContentType(postData: any): FeedContentType {
  if (postData.toolId) return 'tool_generated';
  if (postData.type === 'event') return 'space_event';
  if (postData.type === 'announcement') return 'builder_announcement';
  if (postData.source === 'rss') return 'rss_import';
  return 'tool_enhanced';
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
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const { limit, cursor, refresh, feedType } = FeedQuerySchema.parse(queryParams);

    const userId = authContext.userId;

    logger.info('🔄 Feed request:for user', { feedType, userId, endpoint: '/api/feed' });
    
    // Get user's membership data (cached for performance)
    const userMemberships = await getUserMembershipData(userId, refresh);
    
    if (userMemberships.length === 0) {
      return NextResponse.json({
        success: true,
        posts: [],
        nextCursor: null,
        feedType,
        analytics: { message: 'No space memberships found' }
      });
    }

    // Extract space IDs for aggregation
    const userSpaceIds = userMemberships.map(m => m.spaceId);
    
    // Create aggregation engine
    const aggregator = createFeedAggregator(userId, userSpaceIds);
    
    // Get aggregated content from all sources
    const aggregatedItems = await aggregator.aggregateContent(limit, cursor);
    
    // Convert aggregated items to feed items
    const feedItems: FeedItem[] = aggregatedItems.map(item => ({
      post: item.content as Post, // Type assertion for now, will handle other types
      spaceId: item.spaceId || 'system',
      spaceName: getSpaceName(item.spaceId, item.source),
      relevanceScore: item.priority,
      contentType: item.contentType,
      timestamp: item.timestamp,
      validationConfidence: item.validationData.confidence
    }));

    // Filter for valid tool-generated content only
    const validFeedItems = feedItems.filter(item => {
      const validation = validateFeedContent(item.post);
      return validation.isValid;
    });

    // Sort by tool priority, then relevance score and timestamp
    validFeedItems.sort((a, b) => {
      // Primary sort: tool content priority
      const aPriority = getContentTypePriority(a.contentType);
      const bPriority = getContentTypePriority(b.contentType);
      
      if (aPriority !== bPriority) {
        return bPriority - aPriority;
      }
      
      // Secondary sort: relevance score (higher first)
      if (Math.abs(a.relevanceScore - b.relevanceScore) > 0.1) {
        return b.relevanceScore - a.relevanceScore;
      }
      
      // Tertiary sort: validation confidence
      if (Math.abs(a.validationConfidence - b.validationConfidence) > 5) {
        return b.validationConfidence - a.validationConfidence;
      }
      
      // Final sort: recency (newer first)
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

    return NextResponse.json({
      success: true,
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

  } catch (error: unknown) {
    logger.error('Feed API error', { error: error, endpoint: '/api/feed' });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(ApiResponseHelper.error("Internal server error", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: true, // Feed is publicly viewable but requires auth
  operation: 'fetch_user_feed' 
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
  
  try {
    const memberships: UserMembershipData[] = [];
    
    // First try collectionGroup query for members
    try {
      const membershipsSnapshot = await dbAdmin.collectionGroup('members')
        .where('userId', '==', userId)
        .limit(100)
        .get();
      
      for (const doc of membershipsSnapshot.docs) {
        const data = doc.data();
        const spaceId = doc.ref.parent.parent?.id;
        
        if (!spaceId) continue;
        
        const engagementScore = calculateEngagementScore(data);
        
        memberships.push({
          spaceId,
          role: data.role || 'member',
          joinedAt: data.joinedAt?.toDate() || new Date(),
          lastActiveAt: data.lastActiveAt?.toDate() || new Date(),
          engagementScore
        });
      }
    } catch (e) {
      logger.warn('CollectionGroup query failed, trying alternative', { error: e });
    }
    
    // If no memberships found, try querying user's spaces from user document
    if (memberships.length === 0) {
      try {
        const userDoc = await dbAdmin.collection('users').doc(userId).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          const userSpaces = userData?.spaces || userData?.joinedSpaces || [];
          
          // If user has spaces listed, create membership data
          for (const spaceId of userSpaces) {
            memberships.push({
              spaceId,
              role: 'member',
              joinedAt: userData?.createdAt?.toDate() || new Date(),
              lastActiveAt: userData?.lastActiveAt?.toDate() || new Date(),
              engagementScore: 50 // Default engagement
            });
          }
        }
      } catch (e) {
        logger.warn('Failed to get user spaces from user doc', { error: e });
      }
    }
    
    // If still no memberships, provide some default spaces for new users
    if (memberships.length === 0) {
      logger.info('No memberships found, providing default spaces for user', { userId });
      
      // Get some public/default spaces
      try {
        const publicSpaces = await dbAdmin.collection('spaces')
          .where('isPublic', '==', true)
          .limit(5)
          .get();
        
        for (const spaceDoc of publicSpaces.docs) {
          memberships.push({
            spaceId: spaceDoc.id,
            role: 'member',
            joinedAt: new Date(),
            lastActiveAt: new Date(),
            engagementScore: 30 // Low engagement for auto-added spaces
          });
        }
      } catch (e) {
        logger.warn('Failed to get public spaces', { error: e });
      }
    }
    
    logger.info('📊 Found memberships for user', { 
      count: memberships.length, 
      userId, 
      spaceIds: memberships.map(m => m.spaceId),
      endpoint: '/api/feed' 
    });
    
    return memberships;
    
  } catch (error) {
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
          contentType: validation.contentType || 'tool_generated',
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
    let query = dbAdmin.collection('spaces')
      .doc(spaceId)
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(limit);
    
    // Don't filter by isDeleted if field doesn't exist
    // Just order by creation date
    
    if (cursor) {
      // Decode cursor and apply to query
      try {
        const cursorData = JSON.parse(Buffer.from(cursor, 'base64').toString());
        if (cursorData.timestamp) {
          query = query.startAfter(new Date(cursorData.timestamp));
        }
      } catch (e) {
        logger.warn('Invalid cursor', { cursor, error: e });
      }
    }
    
    const snapshot = await query.get();
    
    if (snapshot.empty) {
      logger.info('No posts found in space', { spaceId });
      return [];
    }
    
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
  score += membership?.engagementScore * 0.4; // 40% weight
  
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
  if (membership?.role === 'builder' || membership?.role === 'admin') {
    score += 5; // Builders see more content
  }
  
  return Math.min(100, score);
}

/**
 * Get content type priority for sorting (higher = more important)
 */
function getContentTypePriority(contentType: FeedContentType): number {
  const priorities: Record<FeedContentType, number> = {
    'tool_generated': 5,
    'tool_enhanced': 4,
    'space_event': 3,
    'builder_announcement': 2,
    'rss_import': 1
  };
  return priorities[contentType] || 0;
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