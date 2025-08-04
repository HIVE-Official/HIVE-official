import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/server-auth';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

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
    const user = await getCurrentUser();
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
    const membershipQuery = dbAdmin.collection(
      dbAdmin.collection('members'),
      where('userId', '==', user.uid),
      where('spaceId', '==', spaceId)
    );

    const membershipSnapshot = await getDocs(membershipQuery);
    if (membershipSnapshot.empty) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const membershipDoc = membershipSnapshot.docs[0];
    const membershipData = membershipDoc.data();

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
    logger.error('Error performing space action', { error: error, endpoint: '/api/profile/spaces/actions' });
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
  const now = new Date().toISOString();

  switch (type) {
    case 'favorite': {
      // Toggle favorite status
      const isFavorite = value !== undefined ? value : !membershipData.isFavorite;
      await updateDoc(membershipRef, {
        isFavorite,
        updatedAt: now
      });
      
      // Update user's profile preferences
      await updateUserSpacePreferences(userId, spaceId, 'favorite', isFavorite);
      
      return { isFavorite };
    }

    case 'mute': {
      // Toggle mute status
      const isMuted = value !== undefined ? value : !membershipData.isMuted;
      await updateDoc(membershipRef, {
        isMuted,
        muteUntil: isMuted && metadata?.duration ? 
          new Date(Date.now() + metadata.duration * 60000).toISOString() : null,
        updatedAt: now
      });
      
      return { isMuted, muteUntil: isMuted && metadata?.duration ? 
        new Date(Date.now() + metadata.duration * 60000).toISOString() : null };
    }

    case 'pin': {
      // Toggle pin status
      const isPinned = value !== undefined ? value : !membershipData.isPinned;
      await updateDoc(membershipRef, {
        isPinned,
        pinnedAt: isPinned ? now : null,
        updatedAt: now
      });
      
      return { isPinned };
    }

    case 'archive': {
      // Archive/unarchive space membership
      const isArchived = value !== undefined ? value : !membershipData.isArchived;
      await updateDoc(membershipRef, {
        isArchived,
        archivedAt: isArchived ? now : null,
        status: isArchived ? 'archived' : 'active',
        updatedAt: now
      });
      
      return { isArchived };
    }

    case 'leave': {
      // Leave space
      await updateDoc(membershipRef, {
        status: 'inactive',
        leftAt: now,
        updatedAt: now
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
        requestType: 'builder',
        reason: metadata?.reason || '',
        experience: metadata?.experience || '',
        status: 'pending',
        requestedAt: now
      };
      
      const requestRef = await addDoc(dbAdmin.collection('builderRequests'), requestData);
      
      // Update membership with pending request
      await updateDoc(membershipRef, {
        hasBuilderRequest: true,
        builderRequestId: requestRef.id,
        updatedAt: now
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
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (!userDoc.exists) return;

    const userData = userDoc.data();
    const spacePreferences = userData.spacePreferences || {};
    
    if (!spacePreferences[spaceId]) {
      spacePreferences[spaceId] = {};
    }
    
    spacePreferences[spaceId][preferenceType] = value;
    spacePreferences[spaceId].updatedAt = new Date().toISOString();

    await updateDoc(doc(db, 'users', userId), {
      spacePreferences,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error updating user space preferences', { error: error, endpoint: '/api/profile/spaces/actions' });
  }
}

// Helper function to update space member count
async function updateSpaceMemberCount(spaceId: string, change: number) {
  try {
    const spaceDoc = await getDoc(doc(db, 'spaces', spaceId));
    if (!spaceDoc.exists) return;

    const spaceData = spaceDoc.data();
    const newMemberCount = Math.max(0, (spaceData.memberCount || 0) + change);

    await updateDoc(doc(db, 'spaces', spaceId), {
      memberCount: newMemberCount,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error updating space member count', { error: error, endpoint: '/api/profile/spaces/actions' });
  }
}

// GET - Get space action status
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const spaceId = searchParams.get('spaceId');

    if (!spaceId) {
      return NextResponse.json(ApiResponseHelper.error("Space ID is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Get membership data
    const membershipQuery = dbAdmin.collection(
      dbAdmin.collection('members'),
      where('userId', '==', user.uid),
      where('spaceId', '==', spaceId)
    );

    const membershipSnapshot = await getDocs(membershipQuery);
    if (membershipSnapshot.empty) {
      return NextResponse.json(ApiResponseHelper.error("Not a member of this space", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const membershipData = membershipSnapshot.docs[0].data();

    // Get builder request status if exists
    let builderRequestStatus = null;
    if (membershipData.hasBuilderRequest) {
      const requestDoc = await getDoc(doc(db, 'builderRequests', membershipData.builderRequestId));
      if (requestDoc.exists) {
        builderRequestStatus = requestDoc.data().status;
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
        muteUntil: membershipData.muteUntil || null
      },
      membership: {
        role: membershipData.role,
        status: membershipData.status,
        joinedAt: membershipData.joinedAt,
        lastActivity: membershipData.lastActivity
      }
    });
  } catch (error) {
    logger.error('Error getting space action status', { error: error, endpoint: '/api/profile/spaces/actions' });
    return NextResponse.json(ApiResponseHelper.error("Failed to get space action status", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}