import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase-admin';
import { type Space } from '@hive/core';
import { logger } from "@/lib/logger";
import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware";

const browseSpacesSchema = z.object({
  schoolId: z.string().optional(),
  type: z.enum(['student_organizations', 'university_organizations', 'greek_life_spaces', 'residential_spaces']).optional(),
  category: z.enum(['student_organizations', 'university_organizations', 'greek_life_spaces', 'residential_spaces']).optional(),
  subType: z.string().optional(),
  limit: z.coerce.number().min(1).max(50).default(20),
  offset: z.coerce.number().min(0).default(0),
  search: z.string().optional(),
  includeActivity: z.coerce.boolean().default(false),
  sortBy: z.enum(['trending', 'active', 'new', 'alphabetical']).optional()
});

/**
 * Browse available spaces at a user's school
 * Returns paginated list of spaces with membership status
 */
export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  // Parse query parameters
  const url = new URL(request.url);
  const queryParams = Object.fromEntries(url.searchParams.entries());
  const { schoolId, type, category, subType, limit, offset, search, includeActivity, sortBy } = browseSpacesSchema.parse(queryParams);

  const userId = getUserId(request);

    // Note: Removed schoolId logic since spaces don't have this field

    // Use flat collection structure for better performance
    let spacesQuery: any = dbAdmin.collection('spaces');

    // Apply type/category filter (support both for backwards compatibility)
    const spaceCategory = category || type;
    if (spaceCategory) {
      spacesQuery = spacesQuery.where('type', '==', spaceCategory);
    }

    // Always filter for UB campus in vBETA
    spacesQuery = spacesQuery.where('campusId', '==', 'ub-buffalo');

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      spacesQuery = spacesQuery
        .where('name_lowercase', '>=', searchLower)
        .where('name_lowercase', '<=', searchLower + '\uf8ff')
        .orderBy('name_lowercase');
    } else {
      // Simplified ordering to avoid composite index requirement
      // Just order by name_lowercase for now
      spacesQuery = spacesQuery.orderBy('name_lowercase');
    }

    // Apply pagination
    if (offset > 0) {
      spacesQuery = spacesQuery.offset(offset);
    }
    
    spacesQuery = spacesQuery.limit(limit);

    logger.info('📊 Querying spaces with filters', { metadata: { type, search, limit, offset }, endpoint: '/api/spaces/browse' });

    const spacesSnapshot = await spacesQuery.get();

    const spaces = await Promise.all(spacesSnapshot.docs.map(async (doc: any) => {
      const data = doc.data();
      const spaceId = doc.id;

      // Base space data
      const spaceData: any = {
        id: spaceId,
        name: data.name,
        description: data.description,
        type: data.type,
        avatar: data.avatar,
        status: data.status || 'active',
        memberCount: data.metrics?.memberCount || data.memberCount || 0,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        tags: data.tags || [],
        bannerUrl: data.bannerUrl,
        isPrivate: data.isPrivate || false,
        isVerified: data.isVerified || false,
        metrics: data.metrics || { memberCount: 0, postCount: 0, eventCount: 0 }
      };

      // Include activity metrics if requested
      if (includeActivity) {
        try {
          // Get active users count (users who posted/interacted in last 24 hours)
          const oneDayAgo = new Date();
          oneDayAgo.setDate(oneDayAgo.getDate() - 1);

          // Get recent posts count
          const recentPostsQuery = await dbAdmin
            .collection('spaces')
            .doc(spaceId)
            .collection('posts')
            .where('createdAt', '>', oneDayAgo)
            .count()
            .get();

          // Get upcoming events count
          const upcomingEventsQuery = await dbAdmin
            .collection('spaces')
            .doc(spaceId)
            .collection('events')
            .where('startDate', '>', new Date())
            .limit(5)
            .count()
            .get();

          // Get member growth (simplified - would need historical data for real calculation)
          const memberGrowth = Math.floor(Math.random() * 20); // Placeholder

          // Get active now (simplified - would need presence system)
          const activeNow = Math.floor(Math.random() * Math.min(30, spaceData.memberCount));

          spaceData.activeNow = activeNow;
          spaceData.recentPosts = recentPostsQuery.data().count;
          spaceData.upcomingEvents = upcomingEventsQuery.data().count;
          spaceData.memberGrowth = memberGrowth;
          spaceData.lastActivityAt = data.lastActivityAt || data.updatedAt;

        } catch (error) {
          logger.warn('Could not get activity metrics for space', { spaceId, error });
          // Add default activity metrics
          spaceData.activeNow = 0;
          spaceData.recentPosts = 0;
          spaceData.upcomingEvents = 0;
          spaceData.memberGrowth = 0;
        }
      }

      return spaceData;
    }));

    // Get total count for pagination
    let totalCount = 0;
    try {
      let countQuery: any = dbAdmin.collection('spaces');
      if (type) {
        countQuery = countQuery.where('type', '==', type);
      }
      if (search) {
        const searchLower = search.toLowerCase();
        countQuery = countQuery
          .where('name_lowercase', '>=', searchLower)
          .where('name_lowercase', '<=', searchLower + '\uf8ff');
      }
      const countSnapshot = await countQuery.count().get();
      totalCount = countSnapshot.data().count;
    } catch (error) {
      logger.warn('Could not get total count, using spaces length', { error });
      totalCount = spaces.length;
    }

    // Apply sorting based on sortBy parameter
    let sortedSpaces = [...spaces];
    if (sortBy && includeActivity) {
      switch (sortBy) {
        case 'trending':
          sortedSpaces.sort((a, b) => (b.memberGrowth || 0) - (a.memberGrowth || 0));
          break;
        case 'active':
          sortedSpaces.sort((a, b) => (b.activeNow || 0) - (a.activeNow || 0));
          break;
        case 'new':
          sortedSpaces.sort((a, b) => {
            const aTime = a.createdAt?.toMillis?.() || a.createdAt?.getTime?.() || 0;
            const bTime = b.createdAt?.toMillis?.() || b.createdAt?.getTime?.() || 0;
            return bTime - aTime;
          });
          break;
        case 'alphabetical':
          sortedSpaces.sort((a, b) => a.name.localeCompare(b.name));
          break;
      }
    }

    const paginatedSpaces = sortedSpaces;

    // Get user's current memberships to mark joined spaces
    // Skip membership check for test users (onboarding flow)
    const userSpaceIds = new Set<string>();
    
    if (userId !== 'test-user' && userId !== 'dev_user_123') {
      try {
        // Use flat spaceMembers collection instead of nested structure
        const membershipQuery = dbAdmin.collection('spaceMembers')
          .where('userId', '==', userId)
          .where('isActive', '==', true)
          .where('campusId', '==', 'ub-buffalo')
          .limit(100); // Increased limit for performance
          
        const membershipsSnapshot = await membershipQuery.get();
        
        membershipsSnapshot.docs.forEach(doc => {
          const data = doc.data();
          if (data.spaceId) {
            userSpaceIds.add(data.spaceId);
          }
        });
        
        logger.info('📊 Found memberships for user', { 
          membershipCount: userSpaceIds.size, 
          userId, 
          endpoint: '/api/spaces/browse' 
        });
        
      } catch (error) {
        logger.error(
      `❌ Error getting memberships at /api/spaces/browse`,
      error instanceof Error ? error : new Error(String(error))
    );
        // Continue without membership data rather than failing
      }
    } else {
      logger.info('📊 Skipping membership check for test token (onboarding flow)', { endpoint: '/api/spaces/browse' });
    }

    // Add membership status to each space
    const spacesWithMembership = paginatedSpaces.map((space: any) => ({
      id: space.id,
      name: space.name,
      description: space.description,
      type: space.type,
      tags: space.tags,
      status: space.status,
      memberCount: space.memberCount,
      createdAt: space.createdAt,
      updatedAt: space.updatedAt,
      bannerUrl: space.bannerUrl,
      isPrivate: space.isPrivate,
      isMember: userSpaceIds.has(space.id)
    }));

    // Group spaces by type for better organization
    const spacesByType = spacesWithMembership.reduce((acc: any, space: any) => {
      const spaceType = space.type;
      if (!acc[spaceType]) {
        acc[spaceType] = [];
      }
      acc[spaceType].push(space);
      return acc;
    }, {} as Record<string, typeof spacesWithMembership>);

  return respond.success({
    spaces: spacesWithMembership,
    spacesByType: spacesByType,
    pagination: {
      limit,
      offset,
      totalCount,
      hasMore: offset + limit < totalCount,
      nextOffset: offset + limit < totalCount ? offset + limit : null
    },
    filters: {
      type: type || null,
      subType: subType || null,
      search: search || null
    },
    typeCounts: Object.keys(spacesByType).reduce((acc, type) => {
      acc[type] = spacesByType[type].length;
      return acc;
    }, {} as Record<string, number>)
  }, {
    message: `Found ${spacesWithMembership.length} spaces`
  });
}); 
