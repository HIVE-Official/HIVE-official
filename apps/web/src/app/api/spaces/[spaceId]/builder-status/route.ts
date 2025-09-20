import { dbAdmin } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { logger } from "@/lib/logger";
import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from '@/lib/middleware';

/**
 * Space Builder Status and Activation API
 * GET /api/spaces/[spaceId]/builder-status - Check user's builder status for a space
 * POST /api/spaces/[spaceId]/builder-status - Activate space (builder only)
 */

/**
 * Check user's builder status for a space
 * GET /api/spaces/[spaceId]/builder-status
 */
export const GET = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ spaceId: string }> },
  respond
) => {
  const { spaceId } = await params;
  const userId = getUserId(request);

    // Find the space in nested structure
    const spaceTypes = ['campus_living', 'fraternity_and_sorority', 'hive_exclusive', 'student_organizations', 'university_organizations'];
    let spaceDoc: any = null;
    let spaceType: string | null = null;

    for (const type of spaceTypes) {
      const potentialSpaceRef = dbAdmin
        .collection('spaces')
        .doc(type)
        .collection('spaces')
        .doc(spaceId);
      const potentialDoc = await potentialSpaceRef.get();
      
      if (potentialDoc.exists) {
        spaceDoc = potentialDoc;
        spaceType = type;
        break;
      }
    }

    if (!spaceDoc || !spaceDoc.exists) {
      return respond.error("Space not found", "RESOURCE_NOT_FOUND", 404);
    }

    const spaceData = spaceDoc.data();

    // Check user's membership and role in this space
    const memberDoc = await dbAdmin
      .collection('spaces')
      .doc(spaceType!)
      .collection('spaces')
      .doc(spaceId)
      .collection('members')
      .doc(userId)
      .get();

    const memberData = memberDoc.exists ? memberDoc.data() : null;
    const userRole = memberData?.role || 'none';
    const isBuilder = userRole === 'builder' || userRole === 'admin';

    // Get user's builder requests for this space
    const builderRequestsSnapshot = await dbAdmin
      .collection('builderRequests')
      .where('spaceId', '==', spaceId)
      .where('userId', '==', userId)
      .limit(5)
      .get();

    const builderRequests = builderRequestsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        status: data.status || 'pending',
        submittedAt: data.submittedAt?.toDate?.()?.toISOString(),
        reviewedAt: data.reviewedAt?.toDate?.()?.toISOString()
      };
    });

    const pendingRequest = builderRequests.find(r => r.status === 'pending');
    const approvedRequest = builderRequests.find(r => r.status === 'approved');

    // Check if space can accept builder requests
    const canRequestBuilderRights = !spaceData.isPrivate && 
                                   userRole !== 'builder' && 
                                   userRole !== 'admin' && 
                                   !pendingRequest;

    // Get space activation status
    const hasBuilders = spaceData.hasBuilders || false;
    const builderCount = spaceData.builderCount || 0;
    const isSpaceActive = spaceData.status === 'activated' && hasBuilders;

    return respond.success({
      space: {
        id: spaceId,
        name: spaceData.name,
        type: spaceType,
        status: spaceData.status,
        memberCount: spaceData.memberCount || 0,
        hasBuilders,
        builderCount,
        isActive: isSpaceActive
      },
      user: {
        userId,
        role: userRole,
        isBuilder,
        isMember: memberDoc.exists,
        joinedAt: memberData?.joinedAt?.toDate?.()?.toISOString(),
        promotedToBuilderAt: memberData?.promotedToBuilderAt?.toDate?.()?.toISOString()
      },
      builderRequests: {
        total: builderRequests.length,
        pending: pendingRequest || null,
        approved: approvedRequest || null,
        canRequest: canRequestBuilderRights
      },
      permissions: {
        canRequestBuilderRights,
        canActivateSpace: isBuilder && !isSpaceActive,
        canManageSpace: isBuilder,
        canAccessHiveLAB: isBuilder,
        canModerateContent: isBuilder,
        canInviteMembers: isBuilder
      },
      nextSteps: isBuilder ? [
        isSpaceActive ? 'Space is active - manage community and tools' : 'Activate space to unlock full features',
        'Access HiveLAB to deploy tools',
        'Set up 6 universal surfaces',
        'Invite community members'
      ] : canRequestBuilderRights ? [
        'Submit "Request to Lead" application',
        'Wait for 24hr admin review',
        'Receive builder rights if approved'
      ] : pendingRequest ? [
        'Your builder request is under review',
        'Response expected within 24 hours',
        'Check back for updates'
      ] : [
        'Explore space content',
        'Join space community',
        'Participate in activities'
      ]
    });

});

/**
 * Activate space (builder only)
 * POST /api/spaces/[spaceId]/builder-status
 */
export const POST = withAuthAndErrors(async (
  request: AuthenticatedRequest,
  { params }: { params: Promise<{ spaceId: string }> },
  respond
) => {
  const { spaceId } = await params;
  const userId = getUserId(request);

    // Find the space in nested structure
    const spaceTypes = ['campus_living', 'fraternity_and_sorority', 'hive_exclusive', 'student_organizations', 'university_organizations'];
    let spaceDoc: any = null;
    let spaceType: string | null = null;
    let spaceRef: any = null;

    for (const type of spaceTypes) {
      const potentialSpaceRef = dbAdmin
        .collection('spaces')
        .doc(type)
        .collection('spaces')
        .doc(spaceId);
      const potentialDoc = await potentialSpaceRef.get();
      
      if (potentialDoc.exists) {
        spaceDoc = potentialDoc;
        spaceType = type;
        spaceRef = potentialSpaceRef;
        break;
      }
    }

    if (!spaceDoc || !spaceDoc.exists) {
      return respond.error("Space not found", "RESOURCE_NOT_FOUND", 404);
    }

    // Check if user is a builder
    const memberDoc = await dbAdmin
      .collection('spaces')
      .doc(spaceType!)
      .collection('spaces')
      .doc(spaceId)
      .collection('members')
      .doc(userId)
      .get();

    if (!memberDoc.exists) {
      return respond.error("You are not a member of this space", "FORBIDDEN", 403);
    }

    const memberData = memberDoc.data();
    const userRole = memberData?.role;

    if (userRole !== 'builder' && userRole !== 'admin') {
      return respond.error("Builder rights required to activate space", "FORBIDDEN", 403);
    }

    const spaceData = spaceDoc.data();

    // Check if space is already active
    if (spaceData.status === 'activated' && spaceData.hasBuilders) {
      return respond.error("Space is already activated", "ALREADY_ACTIVATED", 409);
    }

    // Activate the space
    const activationData = {
      status: 'activated',
      hasBuilders: true,
      isActive: true,
      activatedAt: admin.firestore.FieldValue.serverTimestamp(),
      activatedBy: userId,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      // Initialize 6 universal surfaces
      surfaces: {
        pinned: { enabled: true, lastUpdated: admin.firestore.FieldValue.serverTimestamp() },
        posts: { enabled: true, lastUpdated: admin.firestore.FieldValue.serverTimestamp() },
        events: { enabled: true, lastUpdated: admin.firestore.FieldValue.serverTimestamp() },
        tools: { enabled: true, lastUpdated: admin.firestore.FieldValue.serverTimestamp() },
        chat: { enabled: true, lastUpdated: admin.firestore.FieldValue.serverTimestamp() },
        members: { enabled: true, lastUpdated: admin.firestore.FieldValue.serverTimestamp() }
      }
    };

    await spaceRef.update(activationData);

    logger.info('🎉 Spaceactivated by builder', { spaceId, userId, endpoint: '/api/spaces/[spaceId]/builder-status' });

    return respond.success({
      message: 'Space activated successfully!',
      space: {
        id: spaceId,
        name: spaceData.name,
        type: spaceType,
        status: 'activated',
        isActive: true,
        activatedBy: userId,
        activatedAt: new Date().toISOString()
      },
      features: [
        '6 Universal Surfaces enabled',
        'HiveLAB tool deployment available',
        'Real-time chat activated',
        'Member management tools',
        'Event creation and management',
        'Content moderation controls'
      ],
      nextSteps: [
        'Set up space welcome message',
        'Deploy first tools from HiveLAB',
        'Create inaugural space event',
        'Invite core community members',
        'Establish space guidelines'
      ]
    }, 201);

});