import { NextRequest, NextResponse } from 'next/server';
import { doc, getDoc, updateDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@hive/core/server';
import { getCurrentUser } from '@hive/auth-logic';

// Ghost Mode quick toggle and status
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const checkUserId = searchParams.get('userId');

    let targetUserId = user.uid;
    
    // If checking another user's ghost mode status (for visibility checks)
    if (checkUserId && checkUserId !== user.uid) {
      targetUserId = checkUserId;
    }

    const privacyDoc = await getDoc(doc(db, 'privacySettings', targetUserId));
    
    if (!privacyDoc.exists()) {
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
    console.error('Error fetching ghost mode status:', error);
    return NextResponse.json({ error: 'Failed to fetch ghost mode status' }, { status: 500 });
  }
}

// POST - Quick toggle ghost mode
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { enabled, level, duration } = body;

    // Validate level
    if (level && !['invisible', 'minimal', 'selective', 'normal'].includes(level)) {
      return NextResponse.json({ error: 'Invalid ghost mode level' }, { status: 400 });
    }

    const privacyDoc = await getDoc(doc(db, 'privacySettings', user.uid));
    
    if (!privacyDoc.exists()) {
      return NextResponse.json({ error: 'Privacy settings not found' }, { status: 404 });
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

    await updateDoc(doc(db, 'privacySettings', user.uid), updatedSettings);

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
    console.error('Error updating ghost mode:', error);
    return NextResponse.json({ error: 'Failed to update ghost mode' }, { status: 500 });
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
    collection(db, 'members'),
    where('userId', '==', targetUserId),
    where('status', '==', 'active')
  );

  const viewerMembershipsQuery = query(
    collection(db, 'members'),
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
      collection(db, 'members'),
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
    const userDocRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userDocRef);
    
    if (userDoc.exists()) {
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
    console.error('Error applying ghost mode changes:', error);
  }
}

// Helper function to schedule ghost mode disable (simplified version)
function scheduleGhostModeDisable(userId: string, durationMinutes: number) {
  // In a real implementation, this would use a job queue or scheduled function
  // For now, we'll just log that this should be implemented
  console.log(`Ghost mode for user ${userId} should be disabled after ${durationMinutes} minutes`);
  
  // This could be implemented with:
  // - Firebase Cloud Functions with pub/sub scheduling
  // - A cron job that checks for expired ghost modes
  // - Client-side timeout (less reliable)
}