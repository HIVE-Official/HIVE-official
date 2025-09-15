import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { logger } from '@/lib/utils/structured-logger';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ handle: string }> }
) {
  const requestId = crypto.randomUUID();
  const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
  let handle: string = '';
  
  try {
    ({ handle } = await params);
    logger.info('Public profile lookup started', {
      requestId,
      handle: handle,
      userAgent: request.headers.get('user-agent') ?? undefined,
      ip: clientIp
    });
    const normalizedHandle = handle?.toLowerCase()?.trim() ?? '';
    if (!normalizedHandle || normalizedHandle.length < 2 || normalizedHandle.length > 50) {
      return NextResponse.json(
        { success: false, error: 'Invalid normalizedHandle format' },
        { status: 400 }
      );
    }

    // Sanitize normalizedHandle - only alphanumeric, underscore, hyphen
    if (!/^[a-z0-9_-]+$/.test(normalizedHandle)) {
      return NextResponse.json(
        { success: false, error: 'Invalid normalizedHandle characters' },
        { status: 400 }
      );
    }

    // Check if user exists by normalizedHandle
    const usersQuery = await dbAdmin
      .collection('users')
      .where('normalizedHandle', '==', normalizedHandle)
      .limit(1)
      .get();

    if (usersQuery.empty) {
      logger.info('Public profile not found', {
        requestId,
        normalizedHandle
      });

      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    const userDoc = usersQuery.docs[0];
    const userData = userDoc.data();

    // Check if profile is public
    if (!userData.isPublic) {
      logger.info('Private profile access attempted', {
        requestId,
        normalizedHandle,
        userId: userDoc.id
      });

      return NextResponse.json(
        { success: false, error: 'Profile is private' },
        { status: 403 }
      );
    }

    // Build public profile response (only include public fields)
    const publicProfile = {
      id: userDoc.id,
      fullName: userData.fullName || '',
      normalizedHandle: userData.normalizedHandle || normalizedHandle,
      email: userData.showEmail ? userData.email : '', // Respect privacy setting
      major: userData.showMajor ? userData.major : '',
      academicYear: userData.showGraduationYear ? userData.academicYear : '',
      housing: userData.showSchool ? userData.housing : '', // Only if connected or public
      pronouns: userData.pronouns || '',
      bio: userData.bio || '',
      statusMessage: userData.statusMessage || '',
      avatarUrl: userData.profilePhotoUrl || userData.avatarUrl || '',
      isBuilder: userData.isBuilder || false,
      builderOptIn: userData.builderOptIn || false,
      isPublic: userData.isPublic || false,
      onboardingCompleted: userData.onboardingCompleted || false,
      joinedAt: userData.createdAt || userData.joinedAt || new Date().toISOString(),
      lastActive: userData.lastActive || userData.updatedAt || new Date().toISOString(),
      // Privacy-controlled fields
      showActivity: userData.showActivity !== false, // Default to true if not set
      showSpaces: userData.showSpaces !== false,
      showOnlineStatus: userData.showOnlineStatus !== false,
      // Ghost mode check
      ghostMode: userData.ghostMode?.enabled || false
    };

    // If user is in ghost mode, limit visible information
    if (publicProfile.ghostMode) {
      const ghostLevel = userData.ghostMode?.level || 'minimal';
      
      if (ghostLevel === 'moderate' || ghostLevel === 'maximum') {
        publicProfile.showActivity = false;
        publicProfile.showOnlineStatus = false;
        publicProfile.lastActive = '';
      }
      
      if (ghostLevel === 'maximum') {
        publicProfile.showSpaces = false;
        publicProfile.bio = '';
        publicProfile.statusMessage = '';
        publicProfile.housing = '';
      }
    }

    logger.info('Public profile lookup successful', {
      requestId,
      normalizedHandle,
      userId: userDoc.id,
      ghostMode: publicProfile.ghostMode
    });

    return NextResponse.json({
      success: true,
      user: publicProfile,
      requestId
    });

  } catch (error) {
    logger.error('Public profile lookup failed', {
      requestId,
      handle: handle,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to load profile',
        requestId 
      },
      { status: 500 }
    );
  }
}