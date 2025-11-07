import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import { withAuth } from '@/lib/api-auth-middleware';

const mySpacesQuerySchema = z.object({
  includeInactive: z.coerce.boolean().default(false),
  limit: z.coerce.number().min(1).max(100).default(50)
});

/**
 * Get current user's spaces - joined, owned, favorited
 * Updated to use flat collection structure
 */
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const url = new URL(request.url);
    const queryParams = Object.fromEntries(url.searchParams.entries());
    const { includeInactive, limit } = mySpacesQuerySchema.parse(queryParams);
    
    const userId = authContext.userId;

    // Get user's space memberships using flat collection
    let membershipQuery: any = dbAdmin
      .collection('spaceMembers')
      .where('userId', '==', userId);
    
    // Enforce campus isolation
    membershipQuery = membershipQuery.where('campusId', '==', CURRENT_CAMPUS_ID);

    if (!includeInactive) {
      membershipQuery = membershipQuery.where('isActive', '==', true);
    }

    const membershipsSnapshot = await membershipQuery.limit(limit).get();

    if (membershipsSnapshot.empty) {
      return NextResponse.json({
        success: true,
        spaces: [],
        categorized: {
          joined: [],
          owned: [],
          favorited: [],
          recent: []
        },
        totalCount: 0
      });
    }

    // Extract space IDs and roles from flat collection
    const spaceIds: string[] = [];
    const membershipData: Record<string, { role: string; joinedAt: any; permissions: string[]; isFavorite?: boolean; isPinned?: boolean }> = {};

    membershipsSnapshot.docs.forEach((doc: any) => {
      const data = doc.data();
      if (data.campusId && data.campusId !== CURRENT_CAMPUS_ID) return;
      const spaceId = data.spaceId;
      if (spaceId) {
        spaceIds.push(spaceId);
        membershipData[spaceId] = {
          role: data.role,
          joinedAt: data.joinedAt,
          permissions: data.permissions || [],
          isFavorite: data.isFavorite || false,
          isPinned: data.isPinned || false,
        };
      }
    });

    // Batch get space details from flat spaces collection
    const spacePromises = spaceIds.map(spaceId => 
      dbAdmin.collection('spaces').doc(spaceId).get()
    );
    
    const spaceSnapshots = await Promise.all(spacePromises);
    
    const spaces = spaceSnapshots
      .filter(snap => snap.exists)
      .map(snap => {
        const spaceData = snap.data()!;
        const membership = membershipData[snap.id];
        
        return {
          id: snap.id,
          name: spaceData.name,
          description: spaceData.description,
          type: spaceData.type,
          status: spaceData.status,
          isPrivate: spaceData.isPrivate || false,
          bannerUrl: spaceData.bannerUrl,
          metrics: spaceData.metrics || { memberCount: 0, postCount: 0, eventCount: 0 },
          createdAt: spaceData.createdAt,
          updatedAt: spaceData.updatedAt,
          tags: spaceData.tags || [],
          // Include membership info
          membership: {
            role: membership.role,
            joinedAt: membership.joinedAt,
            permissions: membership.permissions,
            isOwner: membership.role === 'owner',
            isAdmin: membership.role === 'owner' || membership.role === 'admin',
            canModerate: membership.permissions.includes('moderate'),
            canPost: membership.permissions.includes('post'),
            canInvite: membership.permissions.includes('invite')
          }
        };
      });

    // Categorize spaces
    const owned = spaces.filter(space => space.membership.role === 'owner');
    const adminned = spaces.filter(space => space.membership.role === 'admin');
    const joined = spaces.filter(space => !['owner', 'admin'].includes(space.membership.role));
    
    // Sort by activity (most recent interaction first)
    const sortByActivity = (a: any, b: any) => {
      const aTime = a.membership.joinedAt?.toMillis?.() || 0;
      const bTime = b.membership.joinedAt?.toMillis?.() || 0;
      return bTime - aTime;
    };

    const recent = [...spaces]
      .sort(sortByActivity)
      .slice(0, 5);

    // Favorited and pinned spaces based on membership flags
    const favorited = spaces.filter(s => membershipData[s.id]?.isFavorite);

    const categorizedSpaces = {
      joined: joined.sort(sortByActivity),
      owned: owned.sort(sortByActivity),
      adminned: adminned.sort(sortByActivity),
      favorited,
      recent
    };

    logger.info('📊 Retrieved user spaces', {
      userId,
      totalSpaces: spaces.length,
      metadata: {
        owned: owned.length,
        joined: joined.length
      },
      endpoint: '/api/profile/my-spaces'
    });

    return NextResponse.json({
      success: true,
      spaces,
      categorized: categorizedSpaces,
      totalCount: spaces.length,
      counts: {
        total: spaces.length,
        owned: owned.length,
        adminned: adminned.length,
        joined: joined.length,
        favorited: favorited.length,
        active: spaces.filter(s => s.status === 'active').length
      }
    });

  } catch (error: any) {
    logger.error('Error fetching user spaces', { 
      error: error.message,
      stack: error.stack,
      endpoint: '/api/profile/my-spaces' 
    });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(
      ApiResponseHelper.error("Failed to fetch user spaces", "INTERNAL_ERROR"),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, { 
  allowDevelopmentBypass: true, 
  operation: 'get_my_spaces' 
});
