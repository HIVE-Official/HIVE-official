import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/server-auth';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

// Visibility check interface
interface VisibilityCheck {
  canSeeProfile: boolean;
  canSeeActivity: boolean;
  canSeeSpaceMemberships: boolean;
  canSeeOnlineStatus: boolean;
  canSeeLastSeen: boolean;
  visibilityLevel: 'full' | 'partial' | 'minimal' | 'none';
  sharedSpaces: string[];
  relationshipType: 'self' | 'space_member' | 'follower' | 'stranger';
}

// POST - Check visibility between users
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const { targetUserId, context } = body;

    if (!targetUserId) {
      return NextResponse.json(ApiResponseHelper.error("Target user ID is required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Check if viewing own profile
    if (targetUserId === user.uid) {
      return NextResponse.json({
        visibility: {
          canSeeProfile: true,
          canSeeActivity: true,
          canSeeSpaceMemberships: true,
          canSeeOnlineStatus: true,
          canSeeLastSeen: true,
          visibilityLevel: 'full',
          sharedSpaces: [],
          relationshipType: 'self'
        }
      });
    }

    // Get target user's privacy settings
    const targetPrivacyDoc = await dbAdmin.collection('privacySettings').doc(targetUserId).get();
    const targetPrivacy = targetPrivacyDoc.exists ? targetPrivacyDoc.data() : null;

    // Get viewer's privacy settings (for mutual visibility checks)
    const viewerPrivacyDoc = await dbAdmin.collection('privacySettings').doc(user.uid).get();
    const viewerPrivacy = viewerPrivacyDoc.exists ? viewerPrivacyDoc.data() : null;

    // Determine relationship and shared spaces
    const relationship = await determineRelationship(user.uid, targetUserId);
    const sharedSpaces = await getSharedSpaces(user.uid, targetUserId);

    // Calculate visibility permissions
    const visibility = calculateVisibility(
      targetPrivacy,
      viewerPrivacy,
      relationship,
      sharedSpaces,
      context
    );

    return NextResponse.json({ 
      visibility: {
        ...visibility,
        sharedSpaces,
        relationshipType: relationship
      }
    });
  } catch (error) {
    logger.error('Error checking visibility', { error: error, endpoint: '/api/privacy/visibility' });
    return NextResponse.json(ApiResponseHelper.error("Failed to check visibility", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// GET - Batch visibility check for multiple users
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const userIds = searchParams.get('userIds')?.split(',') || [];
    const context = searchParams.get('context') || 'general';

    if (userIds.length === 0) {
      return NextResponse.json(ApiResponseHelper.error("User IDs are required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    if (userIds.length > 50) {
      return NextResponse.json(ApiResponseHelper.error("Maximum 50 users per request", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Get viewer's privacy settings
    const viewerPrivacyDoc = await dbAdmin.collection('privacySettings').doc(user.uid).get();
    const viewerPrivacy = viewerPrivacyDoc.exists ? viewerPrivacyDoc.data() : null;

    // Process each user
    const visibilityChecks = await Promise.all(
      userIds.map(async (targetUserId) => {
        try {
          // Skip self
          if (targetUserId === user.uid) {
            return {
              userId: targetUserId,
              visibility: {
                canSeeProfile: true,
                canSeeActivity: true,
                canSeeSpaceMemberships: true,
                canSeeOnlineStatus: true,
                canSeeLastSeen: true,
                visibilityLevel: 'full',
                sharedSpaces: [],
                relationshipType: 'self'
              }
            };
          }

          // Get target user's privacy settings
          const targetPrivacyDoc = await dbAdmin.collection('privacySettings').doc(targetUserId).get();
          const targetPrivacy = targetPrivacyDoc.exists ? targetPrivacyDoc.data() : null;

          // Determine relationship and shared spaces
          const relationship = await determineRelationship(user.uid, targetUserId);
          const sharedSpaces = await getSharedSpaces(user.uid, targetUserId);

          // Calculate visibility
          const visibility = calculateVisibility(
            targetPrivacy,
            viewerPrivacy,
            relationship,
            sharedSpaces,
            context
          );

          return {
            userId: targetUserId,
            visibility: {
              ...visibility,
              sharedSpaces,
              relationshipType: relationship
            }
          };
        } catch (error) {
          logger.error('Error checking visibility for user', { targetUserId, error: error, endpoint: '/api/privacy/visibility' });
          return {
            userId: targetUserId,
            visibility: {
              canSeeProfile: false,
              canSeeActivity: false,
              canSeeSpaceMemberships: false,
              canSeeOnlineStatus: false,
              canSeeLastSeen: false,
              visibilityLevel: 'none',
              sharedSpaces: [],
              relationshipType: 'stranger'
            }
          };
        }
      })
    );

    return NextResponse.json({ visibilityChecks });
  } catch (error) {
    logger.error('Error performing batch visibility check', { error: error, endpoint: '/api/privacy/visibility' });
    return NextResponse.json(ApiResponseHelper.error("Failed to perform batch visibility check", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to determine relationship between users
async function determineRelationship(viewerId: string, targetId: string): Promise<'self' | 'space_member' | 'follower' | 'stranger'> {
  if (viewerId === targetId) {
    return 'self';
  }

  // Check if they're in the same spaces
  const sharedSpaces = await getSharedSpaces(viewerId, targetId);
  if (sharedSpaces.length > 0) {
    return 'space_member';
  }

  // Check if they follow each other (if following system exists)
  // This would be implemented when following/friend system is added
  // For now, return stranger if no shared spaces
  return 'stranger';
}

// Helper function to get shared spaces between users
async function getSharedSpaces(viewerId: string, targetId: string): Promise<string[]> {
  try {
    const [viewerMemberships, targetMemberships] = await Promise.all([
      dbAdmin.collection('members')
        .where('userId', '==', viewerId)
        .where('status', '==', 'active')
        .get(),
      dbAdmin.collection('members')
        .where('userId', '==', targetId)
        .where('status', '==', 'active')
        .get()
    ]);

    const viewerSpaces = new Set(viewerMemberships.docs.map(doc => doc.data().spaceId));
    const targetSpaces = new Set(targetMemberships.docs.map(doc => doc.data().spaceId));

    return [...viewerSpaces].filter(spaceId => targetSpaces.has(spaceId));
  } catch (error) {
    logger.error('Error getting shared spaces', { error: error, endpoint: '/api/privacy/visibility' });
    return [];
  }
}

// Helper function to calculate visibility permissions
function calculateVisibility(
  targetPrivacy: any,
  viewerPrivacy: any,
  relationship: string,
  sharedSpaces: string[],
  context: string
): Omit<VisibilityCheck, 'sharedSpaces' | 'relationshipType'> {
  // Default visibility (if no privacy settings)
  if (!targetPrivacy || !targetPrivacy.ghostMode) {
    return {
      canSeeProfile: true,
      canSeeActivity: true,
      canSeeSpaceMemberships: true,
      canSeeOnlineStatus: true,
      canSeeLastSeen: true,
      visibilityLevel: 'full'
    };
  }

  const ghostMode = targetPrivacy.ghostMode;
  const profileVisibility = targetPrivacy.profileVisibility || {};

  // If ghost mode is disabled, use profile visibility settings
  if (!ghostMode.enabled) {
    const canSeeProfile = 
      (relationship === 'space_member' && profileVisibility.showToSpaceMembers) ||
      (relationship === 'follower' && profileVisibility.showToFollowers) ||
      profileVisibility.showToPublic;

    return {
      canSeeProfile,
      canSeeActivity: canSeeProfile && !profileVisibility.hideActivity,
      canSeeSpaceMemberships: canSeeProfile && !ghostMode.hideSpaceMemberships,
      canSeeOnlineStatus: canSeeProfile && !profileVisibility.hideOnlineStatus,
      canSeeLastSeen: canSeeProfile && !profileVisibility.hideLastSeen,
      visibilityLevel: canSeeProfile ? 'full' : 'none'
    };
  }

  // Ghost mode is enabled - apply restrictions based on level
  const baseVisibility = {
    canSeeProfile: false,
    canSeeActivity: false,
    canSeeSpaceMemberships: false,
    canSeeOnlineStatus: false,
    canSeeLastSeen: false,
    visibilityLevel: 'none' as const
  };

  switch (ghostMode.level) {
    case 'invisible':
      return baseVisibility; // Completely invisible

    case 'minimal':
      if (relationship === 'space_member' && sharedSpaces.length > 0) {
        return {
          canSeeProfile: !profileVisibility.hideProfilePhoto,
          canSeeActivity: false,
          canSeeSpaceMemberships: false,
          canSeeOnlineStatus: false,
          canSeeLastSeen: false,
          visibilityLevel: 'minimal'
        };
      }
      return baseVisibility;

    case 'selective':
      if (relationship === 'space_member' && sharedSpaces.length > 1) {
        return {
          canSeeProfile: true,
          canSeeActivity: !ghostMode.hideActivity,
          canSeeSpaceMemberships: !ghostMode.hideSpaceMemberships,
          canSeeOnlineStatus: false,
          canSeeLastSeen: false,
          visibilityLevel: 'partial'
        };
      }
      return baseVisibility;

    case 'normal':
      return {
        canSeeProfile: true,
        canSeeActivity: !ghostMode.hideActivity,
        canSeeSpaceMemberships: !ghostMode.hideSpaceMemberships,
        canSeeOnlineStatus: !ghostMode.hideOnlineStatus,
        canSeeLastSeen: !ghostMode.hideLastSeen,
        visibilityLevel: 'full'
      };

    default:
      return baseVisibility;
  }
}