import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/server-auth';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { getFirestore, collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase-admin/firestore';

// Ghost Mode quick toggle and status
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const checkUserId = searchParams.get('userId');

    let targetUserId = user.uid;
    
    // If checking another user's ghost mode status (for visibility checks)
    if (checkUserId && checkUserId !== user.uid) {
      targetUserId = checkUserId;
    }

    const privacyDoc = await getDoc(doc(dbAdmin, 'privacySettings', targetUserId));
    
    if (!privacyDoc.exists) {
      return NextResponse.json({ 
        ghostMode: {
          enabled: false,
          level: 'normal',
          hideFromDirectory: false,
          hideActivity: false,
          hideSpaceMemberships: false,
          hideLastSeen: false,
          hideOnlineStatus: false,
        },
        isVisible: true
      });
    }

    const settings = privacyDoc.data();
    const ghostMode = settings.ghostMode;
    
    // Determine visibility based on ghost mode settings
    const isVisible = await checkUserVisibility(targetUserId, user.uid, ghostMode);

    return NextResponse.json({ 
      ghostMode,
      isVisible,
      canView: targetUserId === user.uid ? true : isVisible
    });
  } catch (error) {
    logger.error('Error fetching ghost mode status', { error: error, endpoint: '/api/privacy/ghost-mode' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch ghost mode status", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// POST - Quick toggle ghost mode
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const { enabled, level, duration } = body;

    // Validate level
    if (level && !['invisible', 'minimal', 'selective', 'normal'].includes(level)) {
      return NextResponse.json(ApiResponseHelper.error("Invalid ghost mode level", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    const privacyDoc = await getDoc(doc(dbAdmin, 'privacySettings', user.uid));
    
    if (!privacyDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Privacy settings not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const settings = privacyDoc.data();
    const currentGhostMode = settings.ghostMode;

    // Apply ghost mode level presets
    const levelPresets = {
      invisible: {
        hideFromDirectory: true,
        hideActivity: true,
        hideSpaceMemberships: true,
        hideLastSeen: true,
        hideOnlineStatus: true,
      },
      minimal: {
        hideFromDirectory: false,
        hideActivity: true,
        hideSpaceMemberships: false,
        hideLastSeen: true,
        hideOnlineStatus: true,
      },
      selective: {
        hideFromDirectory: false,
        hideActivity: false,
        hideSpaceMemberships: false,
        hideLastSeen: true,
        hideOnlineStatus: false,
      },
      normal: {
        hideFromDirectory: false,
        hideActivity: false,
        hideSpaceMemberships: false,
        hideLastSeen: false,
        hideOnlineStatus: false,
      }
    };

    const updatedGhostMode = {
      ...currentGhostMode,
      enabled: enabled !== undefined ? enabled : currentGhostMode.enabled,
      level: level || currentGhostMode.level,
      ...(level ? levelPresets[level] : {})
    };

    // Handle temporary ghost mode
    let ghostModeExpiry = null;
    if (duration && enabled) {
      const expiryDate = new Date();
      expiryDate.setMinutes(expiryDate.getMinutes() + duration);
      ghostModeExpiry = expiryDate.toISOString();
    }

    const updatedSettings = {
      ...settings,
      ghostMode: updatedGhostMode,
      ghostModeExpiry,
      updatedAt: new Date().toISOString()
    };

    await updateDoc(doc(dbAdmin, 'privacySettings', user.uid), updatedSettings);

    // Apply changes immediately
    await applyGhostModeChanges(user.uid, updatedGhostMode);

    // Schedule automatic disable if temporary
    if (ghostModeExpiry) {
      scheduleGhostModeDisable(user.uid, duration);
    }

    return NextResponse.json({ 
      ghostMode: updatedGhostMode,
      message: 'Ghost mode updated successfully',
      expiresAt: ghostModeExpiry
    });
  } catch (error) {
    logger.error('Error updating ghost mode', { error: error, endpoint: '/api/privacy/ghost-mode' });
    return NextResponse.json(ApiResponseHelper.error("Failed to update ghost mode", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to check user visibility
async function checkUserVisibility(targetUserId: string, viewerUserId: string, ghostMode: any): Promise<boolean> {
  if (!ghostMode.enabled) {
    return true;
  }

  if (targetUserId === viewerUserId) {
    return true; // Always visible to self
  }

  // Check if users are in the same spaces
  const targetMembershipsQuery = query(
    collection(dbAdmin, 'members'),
    where('userId', '==', targetUserId),
    where('status', '==', 'active')
  );

  const viewerMembershipsQuery = query(
    collection(dbAdmin, 'members'),
    where('userId', '==', viewerUserId),
    where('status', '==', 'active')
  );

  const [targetMemberships, viewerMemberships] = await Promise.all([
    getDocs(targetMembershipsQuery),
    getDocs(viewerMembershipsQuery)
  ]);

  const targetSpaces = new Set(targetMemberships.docs.map(doc => doc.data().spaceId));
  const viewerSpaces = new Set(viewerMemberships.docs.map(doc => doc.data().spaceId));

  const sharedSpaces = [...targetSpaces].filter(spaceId => viewerSpaces.has(spaceId));

  // Visibility rules based on ghost mode level
  switch (ghostMode.level) {
    case 'invisible':
      return false; // Invisible to everyone
    
    case 'minimal':
      return sharedSpaces.length > 0; // Only visible to space members
    
    case 'selective':
      // Check if they have significant interaction history
      return sharedSpaces.length > 2; // Visible to close community members
    
    case 'normal':
      return true; // Normal visibility
    
    default:
      return true;
  }
}

// Helper function to apply ghost mode changes
async function applyGhostModeChanges(userId: string, ghostMode: any) {
  try {
    // Update user's visibility in spaces
    const membershipsQuery = query(
      collection(dbAdmin, 'members'),
      where('userId', '==', userId),
      where('status', '==', 'active')
    );

    const membershipsSnapshot = await getDocs(membershipsQuery);
    
    const updates = membershipsSnapshot.docs.map(async (memberDoc) => {
      const memberData = memberDoc.data();
      
      const updatedMemberData = {
        ...memberData,
        visibility: {
          showInDirectory: !ghostMode.hideFromDirectory,
          showActivity: !ghostMode.hideActivity,
          showOnlineStatus: !ghostMode.hideOnlineStatus,
          showLastSeen: !ghostMode.hideLastSeen,
        },
        ghostMode: {
          enabled: ghostMode.enabled,
          level: ghostMode.level
        },
        updatedAt: new Date().toISOString()
      };

      return updateDoc(memberDoc.ref, updatedMemberData);
    });

    await Promise.all(updates);

    // Update user's online status
    const userDocRef = doc(dbAdmin, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists) {
      await updateDoc(userDocRef, {
        visibility: {
          showOnlineStatus: !ghostMode.hideOnlineStatus,
          showLastSeen: !ghostMode.hideLastSeen,
          showInDirectory: !ghostMode.hideFromDirectory,
        },
        updatedAt: new Date().toISOString()
      });
    }
  } catch (error) {
    logger.error('Error applying ghost mode changes', { error: error, endpoint: '/api/privacy/ghost-mode' });
  }
}

// Helper function to schedule ghost mode disable (simplified version)
function scheduleGhostModeDisable(userId: string, durationMinutes: number) {
  // In a real implementation, this would use a job queue or scheduled function
  // For now, we'll just log that this should be implemented
  logger.info('Ghost mode for usershould be disabled after minutes', { userId, durationMinutes, endpoint: '/api/privacy/ghost-mode' });
  
  // This could be implemented with:
  // - Firebase Cloud Functions with pub/sub scheduling
  // - A cron job that checks for expired ghost modes
  // - Client-side timeout (less reliable)
}