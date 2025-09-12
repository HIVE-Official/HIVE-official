import { NextRequest, NextResponse } from 'next/server';
import { logger } from "@/lib/structured-logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { withAuth } from '@/lib/api-auth-middleware';
import { getSpaceMember } from '@/lib/spaces-db';

/**
 * Get current user's membership in a specific space
 * GET /api/spaces/[spaceId]/membership/me
 */
export const GET = withAuth(async (
  request: NextRequest,
  authContext,
  { params }: { params: Promise<{ spaceId: string }> }
) => {
  try {
    const { spaceId } = await params;
    const userId = authContext.userId;

    logger.info('Fetching user membership', { 
      userId, 
      spaceId,
      endpoint: '/api/spaces/[spaceId]/membership/me' 
    });

    // Get user's membership in this space
    const membership = await getSpaceMember(spaceId, userId);
    
    if (!membership) {
      // User is not a member - return 404
      return NextResponse.json(
        ApiResponseHelper.error("Not a member of this space", ErrorCodes.NOT_FOUND),
        { status: HttpStatus.NOT_FOUND }
      );
    }

    // Return membership details in the format expected by client
    const membershipData = {
      role: membership.role,
      joinedAt: membership.joinedAt?.toDate?.() || new Date(),
      notifications: membership.notificationSettings?.posts !== false, // Default to true if not set
      status: membership.status || 'active'
    };

    return NextResponse.json(
      ApiResponseHelper.success(membershipData)
    );

  } catch (error) {
    logger.error('Error fetching user membership', { 
      error, 
      endpoint: '/api/spaces/[spaceId]/membership/me' 
    });
    return NextResponse.json(
      ApiResponseHelper.error("Failed to fetch membership", ErrorCodes.INTERNAL_ERROR),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, {
  requireAuth: true,
  operation: 'get_user_membership'
});