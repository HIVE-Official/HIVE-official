import { NextRequest, NextResponse } from 'next/server';
import * as admin from 'firebase-admin';
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/server-auth';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { CURRENT_CAMPUS_ID, addSecureCampusMetadata } from "@/lib/secure-firebase-queries";

// Space quick actions for profile
interface SpaceQuickAction {
  type: 'favorite' | 'mute' | 'pin' | 'archive' | 'leave' | 'request_builder';
  spaceId: string;
  value?: any;
  metadata?: Record<string, any>;
}

// POST - Perform quick action on space
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const { type, spaceId, value, metadata } = body;

    if (!type || !spaceId) {
      return NextResponse.json(ApiResponseHelper.error("Missing required fields", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Validate action type
    const validActions = ['favorite', 'mute', 'pin', 'archive', 'leave', 'request_builder'];
    if (!validActions.includes(type)) {
      return NextResponse.json(ApiResponseHelper.error("Invalid action type", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Verify user is a member of the space
    const membershipSnapshot = await dbAdmin
      .collection('spaceMembers')
      .where('userId', '==', user.uid)
      .where('spaceId', '==', spaceId)
      .where('campusId', '==', CURRENT_CAMPUS_ID)
      .limit(1)
      .get();
    if (membershipSnapshot.empty) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const membershipDoc = membershipSnapshot.docs[0];
    const membershipData = membershipDoc.data();

    // Enforce campus isolation for space actions
    const spaceDoc = await dbAdmin.collection('spaces').doc(spaceId).get();
    if (!spaceDoc.exists || (spaceDoc.data()?.campusId !== CURRENT_CAMPUS_ID)) {
      return NextResponse.json(ApiResponseHelper.error("Access denied for this campus", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Perform the action
    const result = await performSpaceAction(
      user.uid,
      spaceId,
      type as SpaceQuickAction['type'],
      value,
      metadata,
      membershipDoc.ref,
      membershipData
    );

    return NextResponse.json({
      success: true,
      action: type,
      spaceId,
      result
    });
  } catch (error) {
    logger.error(
      `Error performing space action at /api/profile/spaces/actions`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to perform space action", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to perform space actions
async function performSpaceAction(
  userId: string,
  spaceId: string,
  type: SpaceQuickAction['type'],
  value: any,
  metadata: any,
  membershipRef: any,
  membershipData: any
) {
  const firestoreNow = admin.firestore.FieldValue.serverTimestamp();
  const isoNow = new Date().toISOString();

  switch (type) {
    case 'favorite': {
      // Toggle favorite status
      const isFavorite = value !== undefined ? value : !membershipData.isFavorite;
      await membershipRef.update({
        isFavorite,
        updatedAt: firestoreNow
      });
      
      // Update user's profile preferences
      await updateUserSpacePreferences(userId, spaceId, 'favorite', isFavorite);
      
      return { isFavorite };
    }

    case 'mute': {
      // Toggle mute status
      const isMuted = value !== undefined ? value : !membershipData.isMuted;
      await membershipRef.update({
        isMuted,
        muteUntil: isMuted && metadata?.duration
          ? new Date(Date.now() + metadata.duration * 60000).toISOString()
          : null,
        updatedAt: firestoreNow
      });
      
      return {
        isMuted,
        muteUntil: isMuted && metadata?.duration
          ? new Date(Date.now() + metadata.duration * 60000).toISOString()
          : null,
      };
    }

    case 'pin': {
      // Toggle pin status
      const isPinned = value !== undefined ? value : !membershipData.isPinned;
      await membershipRef.update({
        isPinned,
        pinnedAt: isPinned ? isoNow : null,
        updatedAt: firestoreNow
      });
      
      return { isPinned };
    }

    case 'archive': {
      // Archive/unarchive space membership
      const isArchived = value !== undefined ? value : !membershipData.isArchived;
      await membershipRef.update({
        isArchived,
        archivedAt: isArchived ? isoNow : null,
        status: isArchived ? 'archived' : 'active',
        updatedAt: firestoreNow
      });
      
      return { isArchived };
    }

    case 'leave': {
      // Leave space
      await membershipRef.update({
        isActive: false,
        status: 'inactive',
        leftAt: firestoreNow,
        updatedAt: firestoreNow
      });
      
      // Update space member count
      await updateSpaceMemberCount(spaceId, -1);
      
      return { hasLeft: true };
    }

    case 'request_builder': {
      // Request builder status
      const requestData = {
        userId,
        spaceId,
        campusId: CURRENT_CAMPUS_ID,
        requestType: 'builder',
        reason: metadata?.reason || '',
        experience: metadata?.experience || '',
        status: 'pending',
        requestedAt: isoNow
      };
      
      const requestRef = await dbAdmin
        .collection('builderRequests')
        .add(addSecureCampusMetadata(requestData));
      
      // Update membership with pending request
      await membershipRef.update({
        hasBuilderRequest: true,
        builderRequestId: requestRef.id,
        updatedAt: firestoreNow
      });
      
      return { 
        requestId: requestRef.id,
        requestStatus: 'pending' 
      };
    }

    default:
      throw new Error(`Unknown action type: ${type}`);
  }
}

// Helper function to update user space preferences
async function updateUserSpacePreferences(userId: string, spaceId: string, preferenceType: string, value: any) {
  try {
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    if (!userDoc.exists) return;

    const userData = userDoc.data();
    if (!userData) {
      throw new Error('User data not found');
    }
    const spacePreferences = userData.spacePreferences || {};
    
    if (!spacePreferences[spaceId]) {
      spacePreferences[spaceId] = {};
    }
    
    spacePreferences[spaceId][preferenceType] = value;
    spacePreferences[spaceId].updatedAt = new Date().toISOString();

    await dbAdmin.collection('users').doc(userId).update({
      spacePreferences,
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    });
  } catch (error) {
    logger.error(
      `Error updating user space preferences at /api/profile/spaces/actions`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

// Helper function to update space member count
async function updateSpaceMemberCount(spaceId: string, change: number) {
  try {
    await dbAdmin.collection('spaces').doc(spaceId).update({
      'metrics.memberCount': admin.firestore.FieldValue.increment(change),
      'metrics.activeMembers': admin.firestore.FieldValue.increment(change),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    logger.error(
      `Error updating space member count at /api/profile/spaces/actions`,
      error instanceof Error ? error : new Error(String(error))
    );
  }
}

// GET - Get space action status
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const spaceId = searchParams.get('spaceId');

    if (!spaceId) {
      return NextResponse.json(ApiResponseHelper.error("Space ID is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Get membership data
    const membershipSnapshot = await dbAdmin
      .collection('spaceMembers')
      .where('userId', '==', user.uid)
      .where('spaceId', '==', spaceId)
      .where('campusId', '==', CURRENT_CAMPUS_ID)
      .limit(1)
      .get();
    if (membershipSnapshot.empty) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const membershipData = membershipSnapshot.docs[0].data();
    if (!membershipData) {
      return NextResponse.json(ApiResponseHelper.error("Membership data not found", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
    }

    // Enforce campus isolation for space
    const spaceDoc = await dbAdmin.collection('spaces').doc(spaceId).get();
    if (!spaceDoc.exists || (spaceDoc.data()?.campusId !== CURRENT_CAMPUS_ID)) {
      return NextResponse.json(ApiResponseHelper.error("Access denied for this campus", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    // Get builder request status if exists
    let builderRequestStatus = null;
    if (membershipData.hasBuilderRequest) {
      const requestDoc = await dbAdmin.collection('builderRequests').doc(membershipData.builderRequestId).get();
      if (requestDoc.exists) {
        const requestData = requestDoc.data();
        builderRequestStatus = requestData?.status || null;
      }
    }

    return NextResponse.json({
      spaceId,
      actions: {
        isFavorite: membershipData.isFavorite || false,
        isMuted: membershipData.isMuted || false,
        isPinned: membershipData.isPinned || false,
        isArchived: membershipData.isArchived || false,
        hasBuilderRequest: membershipData.hasBuilderRequest || false,
        builderRequestStatus,
        muteUntil: membershipData.muteUntil || null,
      },
      membership: {
        role: membershipData.role,
        status: membershipData.isActive === false ? 'inactive' : 'active',
        joinedAt:
          membershipData.joinedAt?.toDate?.()?.toISOString() ||
          membershipData.joinedAt ||
          null,
        lastActivity:
          membershipData.lastActive?.toDate?.()?.toISOString() ||
          membershipData.lastActive ||
          null,
      },
    });
  } catch (error) {
    logger.error(
      `Error getting space action status at /api/profile/spaces/actions`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(ApiResponseHelper.error("Failed to get space action status", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}
