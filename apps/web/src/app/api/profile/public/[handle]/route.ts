import { dbAdmin } from '@/lib/firebase-admin';
import { logger } from "@/lib/structured-logger";
import { withAuthAndErrors, type AuthenticatedRequest } from "@/lib/middleware/index";
import { HiveProfile, DEFAULT_PRIVACY_SETTINGS, DEFAULT_BUILDER_INFO } from '@hive/core';

/**
 * Get public profile by handle
 * GET /api/profile/public/[handle]
 *
 * Returns sanitized profile data respecting privacy settings
 */
export async function GET(
  request: Request,
  context: { params: Promise<{ handle: string }> }
) {
  const params = await context.params;
  const handle = params.handle;

  try {

    if (!handle || handle.length < 3) {
      return Response.json(
        { success: false, error: 'Invalid handle' },
        { status: 400 }
      );
    }

    // Development mode - return mock data
    if (handle === 'devuser' || handle === 'test-user') {
      const mockProfile: HiveProfile = {
        identity: {
          id: 'dev-user-public',
          fullName: 'Jacob Rhinehart',
          handle: handle,
          email: '', // Hidden for public
          avatarUrl: ''
        },
        academic: {
          major: 'Business Administration',
          academicYear: 'senior',
          graduationYear: 2025,
          schoolId: 'ub-buffalo',
          housing: undefined, // Hidden for public
          pronouns: 'he/him'
        },
        personal: {
          bio: 'Building the future of campus collaboration with HIVE 🚀',
          statusMessage: 'Shipping epic features',
          location: 'Buffalo, NY',
          interests: ['entrepreneurship', 'product-design', 'campus-life']
        },
        privacy: {
          ...DEFAULT_PRIVACY_SETTINGS,
          isPublic: true,
          ghostMode: { enabled: false, level: 'minimal' }
        },
        builder: {
          ...DEFAULT_BUILDER_INFO,
          isBuilder: true,
          builderOptIn: true,
          builderLevel: 'advanced',
          specializations: ['product-management', 'platform-design'],
          toolsCreated: 3
        },
        stats: {
          spacesJoined: 8,
          spacesActive: 5,
          spacesLed: 3,
          toolsUsed: 12,
          connectionsCount: 156,
          totalActivity: 342,
          currentStreak: 7,
          longestStreak: 21,
          reputation: 89,
          achievements: 12
        },
        timestamps: {
          createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
          lastActiveAt: new Date().toISOString(),
          lastSeenAt: new Date().toISOString()
        },
        verification: {
          emailVerified: true,
          profileVerified: true,
          accountStatus: 'active',
          userType: 'student',
          onboardingCompleted: true
        }
      };

      return Response.json({
        success: true,
        user: sanitizeProfileForPublic(mockProfile)
      });
    }

    // Production: Query by handle
    const userQuery = await dbAdmin
      .collection('users')
      .where('handle', '==', handle)
      .where('campusId', '==', 'ub-buffalo') // Campus isolation
      .limit(1)
      .get();

    if (userQuery.empty) {
      return Response.json(
        { success: false, error: 'Profile not found' },
        { status: 404 }
      );
    }

    const userDoc = userQuery.docs[0];
    const userData = userDoc.data();

    // Check if profile is public
    if (!userData?.isPublic || userData?.ghostMode?.enabled) {
      return Response.json(
        { success: false, error: 'Profile is private' },
        { status: 403 }
      );
    }

    // Transform to HiveProfile format
    const profile = transformToHiveProfile(userDoc.id, userData);

    // Sanitize for public consumption
    const publicProfile = sanitizeProfileForPublic(profile);

    logger.info('Public profile accessed', {
      handle,
      userId: userDoc.id,
      isPublic: userData?.isPublic,
      ghostMode: userData?.ghostMode?.enabled
    });

    return Response.json({
      success: true,
      user: publicProfile
    });

  } catch (error) {
    logger.error('Failed to fetch public profile', {
      error: error instanceof Error ? error.message : 'Unknown error',
      handle: handle
    });

    return Response.json(
      { success: false, error: 'Failed to load profile' },
      { status: 500 }
    );
  }
}

/**
 * Transform Firestore data to HiveProfile format
 */
function transformToHiveProfile(userId: string, userData: any): HiveProfile {
  const now = new Date().toISOString();

  return {
    identity: {
      id: userId,
      fullName: userData?.fullName || '',
      handle: userData?.handle || '',
      email: userData?.email || '',
      avatarUrl: userData?.avatarUrl || userData?.profilePhoto
    },
    academic: {
      major: userData?.major,
      academicYear: userData?.academicYear as any,
      graduationYear: userData?.graduationYear,
      schoolId: userData?.schoolId,
      housing: userData?.housing,
      pronouns: userData?.pronouns
    },
    personal: {
      bio: userData?.bio,
      statusMessage: userData?.statusMessage,
      location: userData?.housing,
      interests: userData?.interests || []
    },
    privacy: {
      ...DEFAULT_PRIVACY_SETTINGS,
      isPublic: userData?.isPublic ?? true,
      showActivity: userData?.showActivity ?? true,
      showSpaces: userData?.showSpaces ?? true,
      showConnections: userData?.showConnections ?? true,
      allowDirectMessages: userData?.allowDirectMessages ?? true,
      showOnlineStatus: userData?.showOnlineStatus ?? true,
      ghostMode: {
        enabled: userData?.ghostMode?.enabled ?? false,
        level: (userData?.ghostMode?.level ?? 'minimal') as any
      }
    },
    builder: {
      ...DEFAULT_BUILDER_INFO,
      isBuilder: userData?.isBuilder ?? false,
      builderOptIn: userData?.builderOptIn ?? false,
      builderLevel: (userData?.builderLevel ?? 'beginner') as any,
      specializations: userData?.specializations || [],
      toolsCreated: userData?.toolsCreated ?? 0
    },
    stats: {
      spacesJoined: userData?.spacesJoined ?? 0,
      spacesActive: userData?.spacesActive ?? 0,
      spacesLed: userData?.spacesLed ?? 0,
      toolsUsed: userData?.toolsUsed ?? 0,
      connectionsCount: userData?.connectionsCount ?? 0,
      totalActivity: userData?.totalActivity ?? 0,
      currentStreak: userData?.currentStreak ?? 0,
      longestStreak: userData?.longestStreak ?? 0,
      reputation: userData?.reputation ?? 0,
      achievements: userData?.achievements ?? 0
    },
    timestamps: {
      createdAt: userData?.createdAt || userData?.joinedAt || now,
      updatedAt: userData?.updatedAt || now,
      lastActiveAt: userData?.lastActive || userData?.lastActiveAt || now,
      lastSeenAt: userData?.lastSeenAt || now
    },
    verification: {
      emailVerified: userData?.emailVerified ?? false,
      profileVerified: userData?.profileVerified ?? false,
      accountStatus: (userData?.accountStatus ?? 'active') as any,
      userType: (userData?.userType ?? 'student') as any,
      onboardingCompleted: userData?.onboardingCompleted ?? false
    }
  };
}

/**
 * Sanitize profile data for public consumption
 * Removes sensitive information based on privacy settings
 */
function sanitizeProfileForPublic(profile: HiveProfile) {
  return {
    ...profile,
    identity: {
      ...profile.identity,
      email: '', // Never expose email publicly
    },
    academic: {
      ...profile.academic,
      housing: profile.privacy.showActivity ? profile.academic.housing : undefined,
    },
    personal: {
      ...profile.personal,
      location: profile.privacy.showActivity ? profile.personal.location : undefined,
    },
    stats: profile.privacy.showActivity ? profile.stats : {
      ...profile.stats,
      spacesJoined: 0,
      spacesActive: 0,
      spacesLed: 0,
      connectionsCount: 0,
      totalActivity: 0,
      currentStreak: 0,
      longestStreak: 0
    },
    // Keep privacy settings but don't expose the actual settings
    privacy: {
      isPublic: profile.privacy.isPublic,
      ghostMode: profile.privacy.ghostMode,
      showActivity: profile.privacy.showActivity,
      showSpaces: profile.privacy.showSpaces,
      showConnections: profile.privacy.showConnections,
      allowDirectMessages: profile.privacy.allowDirectMessages,
      showOnlineStatus: false // Never show real-time status on public profiles
    }
  };
}