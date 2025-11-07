import { withAuthAndErrors, type AuthenticatedRequest, getUserId } from "@/lib/middleware";
import { dbAdmin } from "@/lib/firebase-admin";
import { logger } from "@/lib/logger";
import { requireSpaceAccess } from "@/lib/space-security";
import { CURRENT_CAMPUS_ID } from "@/lib/secure-firebase-queries";
import { HttpStatus } from "@/lib/api-response-types";

/**
 * GET /api/spaces/[spaceId]/builder-status
 * Returns caller's role and abilities within a space.
 * Uses flat spaceMembers collection, with fallback to nested membership for legacy roles.
 */
export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ spaceId: string }> },
  respond
) => {
  const { spaceId } = await params;
  const userId = getUserId(request);

  if (!spaceId) {
    return respond.error('Space ID is required', 'INVALID_INPUT', { status: HttpStatus.BAD_REQUEST });
  }

  try {
    // Validate secure space access (campus isolation + active)
    const access = await requireSpaceAccess(spaceId, userId);
    if (!access.ok) {
      const code = access.status === HttpStatus.NOT_FOUND ? 'RESOURCE_NOT_FOUND' : 'FORBIDDEN';
      return respond.error(access.error, code, { status: access.status });
    }

    // Check flat membership first
    const membershipQuery = await dbAdmin
      .collection('spaceMembers')
      .where('spaceId', '==', spaceId)
      .where('userId', '==', userId)
      .where('isActive', '==', true)
      .where('campusId', '==', CURRENT_CAMPUS_ID)
      .limit(1)
      .get();

    let role: string | null = null;
    if (!membershipQuery.empty) {
      role = membershipQuery.docs[0].data().role || 'member';
    }

    const isMember = !!role;
    const canFeatureTools = ['owner', 'admin', 'builder'].includes(role || '');
    const canPinPosts = ['owner', 'admin', 'builder'].includes(role || '');

    return respond.success({
      isMember,
      role: role || 'guest',
      permissions: {
        canFeatureTools,
        canPinPosts,
      }
    });
  } catch (error) {
    logger.error('Error fetching builder status', { spaceId, userId, error });
    return respond.error('Failed to fetch builder status', 'INTERNAL_ERROR', { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
});
