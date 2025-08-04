import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase-admin';
import { type Space } from '@hive/core';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { withAuth, ApiResponse } from '@/lib/api-auth-middleware';

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

    // Define space types for nested structure and their Firebase collection names
    const spaceTypeMapping = {
      'student_organizations': 'student_organizations',
      'university_organizations': 'university_organizations',
      'greek_life': 'greek_life',
      'campus_living': 'campus_living',
      'hive_exclusive': 'hive_exclusive',
      'cohort': 'cohort'
    };

    const spaceTypes = Object.keys(spaceTypeMapping);
    const typesToQuery = type ? [type] : spaceTypes;

    // Query nested structure: spaces/[spacetype]/spaces/spaceID
    let spaces: any[] = [];
    
    for (const spaceType of typesToQuery) {
      try {
        logger.info('📊 Querying space type', { spaceType, endpoint: '/api/spaces/browse' });
        
        const spacesSnapshot = await dbAdmin.collection('spaces')
          .doc(spaceType)
          .collection('spaces')
          .get();
          
        logger.info('Foundspaces in', { spacesSnapshot, spaceType, endpoint: '/api/spaces/browse' });
        
        // Add spaces from this type collection
        const spacesFromType = spacesSnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            description: data.description,
            type: spaceType, // Use our API space type
            status: data.status || 'dormant', // Use actual status from data
            memberCount: data.metrics?.memberCount || 0,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            tags: data.tags || [],
            bannerUrl: data.bannerUrl,
            isPrivate: data.isPrivate || false,
            // Include original data for debugging
            _originalData: data
          };
        });
        
        spaces.push(...spacesFromType);
      } catch (error) {
        logger.error('❌ Error querying spaces for type', { spaceType, error: error, endpoint: '/api/spaces/browse' });
        // Continue with other types even if one fails
      }
    }

    // Apply text search filter (case-insensitive)
    if (search) {
      const searchLower = search.toLowerCase();
      spaces = spaces.filter(space => 
        space.name.toLowerCase().includes(searchLower) ||
        (space.description && space.description.toLowerCase().includes(searchLower))
      );
    }

    // Sort by member count (popular first) then by name
    spaces.sort((a, b) => {
      const memberCountA = a.memberCount || 0;
      const memberCountB = b.memberCount || 0;
      
      if (memberCountA !== memberCountB) {
        return memberCountB - memberCountA; // Higher member count first
      }
      
      return a.name.localeCompare(b.name); // Alphabetical for ties
    });

    // Apply pagination
    const totalCount = spaces.length;
    const paginatedSpaces = spaces.slice(offset, offset + limit);

    // Get user's current memberships to mark joined spaces
    // Skip membership check for test users (onboarding flow)
    const userSpaceIds = new Set<string>();
    
    if (userId !== 'test-user' && userId !== 'dev_user_123') {
      try {
        // Use collectionGroup to find all member documents for this user
        const membershipQuery = dbAdmin.collectionGroup('members')
          .where('userId', '==', userId)
          .limit(50); // Limit for performance
          
        const membershipsSnapshot = await membershipQuery.get();
        
        membershipsSnapshot.docs.forEach(doc => {
          const spaceId = doc.ref.parent.parent?.id;
          if (spaceId) {
            userSpaceIds.add(spaceId);
          }
        });
        
        logger.info('📊 Foundmemberships for user', { userSpaceIds, userId, endpoint: '/api/spaces/browse' });
        
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
      createdAt: space.createdAt,
      updatedAt: space.updatedAt,
      bannerUrl: space.bannerUrl,
      isPrivate: space.isPrivate,
      isMember: userSpaceIds.has(space.id)
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