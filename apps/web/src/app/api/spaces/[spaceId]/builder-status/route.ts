import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getAuth } from 'firebase-admin/auth';
import { dbAdmin } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

/**
 * Space Builder Status and Activation API
 * GET /api/spaces/[spaceId]/builder-status - Check user's builder status for a space
 * POST /api/spaces/[spaceId]/builder-status - Activate space (builder only)
 */

/**
 * Check user's builder status for a space
 * GET /api/spaces/[spaceId]/builder-status
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const { spaceId } = await params;

    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let userId: string;
    
    // Handle test tokens in development
    if (token === 'test-token') {
      userId = 'test-user';
    } else {
      try {
        const auth = getAuth();
        const decodedToken = await auth.verifyIdToken(token);
        userId = decodedToken.uid;
      } catch (authError) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
      }
    }

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
      return NextResponse.json({ error: 'Space not found' }, { status: 404 });
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

    const builderRequests = builderRequestsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      submittedAt: doc.data().submittedAt?.toDate?.()?.toISOString(),
      reviewedAt: doc.data().reviewedAt?.toDate?.()?.toISOString()
    }));

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

    return NextResponse.json({
      success: true,
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

  } catch (error) {
    console.error('Get builder status error:', error);
    return NextResponse.json(
      { error: 'Failed to get builder status' },
      { status: 500 }
    );
  }
}

/**
 * Activate space (builder only)
 * POST /api/spaces/[spaceId]/builder-status
 */
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ spaceId: string }> }
) {
  try {
    const { spaceId } = await params;

    // Verify authentication
    const authHeader = request.headers.get('Authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    let userId: string;
    
    // Handle test tokens in development
    if (token === 'test-token') {
      userId = 'test-user';
    } else {
      try {
        const auth = getAuth();
        const decodedToken = await auth.verifyIdToken(token);
        userId = decodedToken.uid;
      } catch (authError) {
        return NextResponse.json(
          { error: 'Invalid or expired token' },
          { status: 401 }
        );
      }
    }

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
      return NextResponse.json({ error: 'Space not found' }, { status: 404 });
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
      return NextResponse.json(
        { error: 'You are not a member of this space' },
        { status: 403 }
      );
    }

    const memberData = memberDoc.data();
    const userRole = memberData?.role;

    if (userRole !== 'builder' && userRole !== 'admin') {
      return NextResponse.json(
        { error: 'Builder rights required to activate space' },
        { status: 403 }
      );
    }

    const spaceData = spaceDoc.data();

    // Check if space is already active
    if (spaceData.status === 'activated' && spaceData.hasBuilders) {
      return NextResponse.json(
        { error: 'Space is already activated' },
        { status: 409 }
      );
    }

    // Activate the space
    const activationData = {
      status: 'activated',
      hasBuilders: true,
      isActive: true,
      activatedAt: FieldValue.serverTimestamp(),
      activatedBy: userId,
      updatedAt: FieldValue.serverTimestamp(),
      // Initialize 6 universal surfaces
      surfaces: {
        pinned: { enabled: true, lastUpdated: FieldValue.serverTimestamp() },
        posts: { enabled: true, lastUpdated: FieldValue.serverTimestamp() },
        events: { enabled: true, lastUpdated: FieldValue.serverTimestamp() },
        tools: { enabled: true, lastUpdated: FieldValue.serverTimestamp() },
        chat: { enabled: true, lastUpdated: FieldValue.serverTimestamp() },
        members: { enabled: true, lastUpdated: FieldValue.serverTimestamp() }
      }
    };

    await spaceRef.update(activationData);

    console.log(`🎉 Space ${spaceId} activated by builder ${userId}`);

    return NextResponse.json({
      success: true,
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
    });

  } catch (error) {
    console.error('Activate space error:', error);
    return NextResponse.json(
      { error: 'Failed to activate space' },
      { status: 500 }
    );
  }
}