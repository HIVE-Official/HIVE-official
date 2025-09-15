import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { type Space } from '@hive/core';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";
import { withAuth, ApiResponse } from '@/lib/api/middleware/api-auth-middleware';

const browseSpacesSchema = z.object({
  schoolId: z.string().optional(),
  type: z.enum(['student_organizations', 'university_organizations', 'greek_life', 'campus_living', 'hive_exclusive', 'cohort']).optional(),
  subType: z.string().optional(),
  limit: z.coerce.number().min(1).max(50).default(20),
  offset: z.coerce.number().min(0).default(0),
  search: z.string().optional()
});

/**
 * Browse available spaces at a user's school
 * Returns paginated list of spaces with membership status
 */
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    // Parse query parameters
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const { schoolId, type, subType, limit, offset, search } = browseSpacesSchema.parse(queryParams);

    const userId = authContext.userId;

    // Note: Removed schoolId logic since spaces don't have this field

    // Use flat collection structure for better performance
    let spacesQuery = dbAdmin.collection('spaces');

    // Apply type filter
    if (type) {
      spacesQuery = spacesQuery.where('type', '==', type);
    }

    // Apply search filter
    if (search) {
      const searchLower = search.toLowerCase();
      spacesQuery = spacesQuery
        .where('name_lowercase', '>=', searchLower)
        .where('name_lowercase', '<=', searchLower + '\uf8ff')
        .orderBy('name_lowercase');
    } else {
      // Default ordering by member count (popular first), then name
      spacesQuery = spacesQuery
        .orderBy('metrics.memberCount', 'desc')
        .orderBy('name_lowercase');
    }

    // Apply pagination
    if (offset > 0) {
      spacesQuery = spacesQuery.offset(offset);
    }
    
    spacesQuery = spacesQuery.limit(limit);

    logger.info('📊 Querying spaces with filters', { type, search, limit, offset, endpoint: '/api/spaces/browse' });

    const spacesSnapshot = await spacesQuery.get();

    const spaces = spacesSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        description: data.description,
        type: data.type,
        status: data.status || 'active',
        memberCount: data.metrics?.memberCount || data.memberCount || 0,
        potentialMembers: data.potentialMembers || 0,
        awaitingLeader: data.awaitingLeader || false,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        tags: data.tags || [],
        bannerUrl: data.bannerUrl,
        isPrivate: data.isPrivate || false,
        metrics: data.metrics || { memberCount: 0, postCount: 0, eventCount: 0 },
        featuredInPreview: data.featuredInPreview || false,
        activationRequests: data.activationRequests || []
      };
    });

    // Get total count for pagination
    let totalCount = 0;
    try {
      let countQuery = dbAdmin.collection('spaces');
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

    const paginatedSpaces = spaces;

    // Get user's current memberships to mark joined spaces
    // Skip membership check for test users (onboarding flow)
    const userSpaceIds = new Set<string>();
    
    if (userId !== 'test-user' && userId !== 'dev_user_123') {
      try {
        // Use flat spaceMembers collection instead of nested structure
        const membershipQuery = dbAdmin.collection('spaceMembers')
          .where('userId', '==', userId)
          .where('isActive', '==', true)
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
        logger.error('❌ Error getting memberships', { error: error, endpoint: '/api/spaces/browse' });
        // Continue without membership data rather than failing
      }
    } else {
      logger.info('📊 Skipping membership check for test token (onboarding flow)', { endpoint: '/api/spaces/browse' });
    }

    // Add membership status to each space
    const spacesWithMembership = paginatedSpaces.map(space => ({
      id: space.id,
      name: space.name,
      description: space.description,
      type: space.type,
      tags: space.tags,
      status: space.status,
      memberCount: space.memberCount,
      potentialMembers: space.potentialMembers,
      awaitingLeader: space.awaitingLeader,
      createdAt: space.createdAt,
      updatedAt: space.updatedAt,
      bannerUrl: space.bannerUrl,
      isPrivate: space.isPrivate,
      isMember: userSpaceIds.has(space.id),
      featuredInPreview: space.featuredInPreview,
      hasRequestedActivation: space.activationRequests?.includes(userId) || false
    }));

    // Group spaces by type for better organization
    const spacesByType = spacesWithMembership.reduce((acc, space) => {
      const spaceType = space.type;
      if (!acc[spaceType]) {
        acc[spaceType] = [];
      }
      acc[spaceType].push(space);
      return acc;
    }, {} as Record<string, typeof spacesWithMembership>);

    return NextResponse.json({
      success: true,
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
    });

  } catch (error: any) {
    logger.error('Browse spaces error', { error: error, endpoint: '/api/spaces/browse' });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(ApiResponseHelper.error("Internal server error", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: true, // Space browsing is safe for development
  operation: 'browse_spaces' 
}); 