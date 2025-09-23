import { dbAdmin } from '@/lib/firebase-admin';
import * as admin from 'firebase-admin';
import { z } from 'zod';
import { logger } from "@/lib/structured-logger";
import { withAuthAndErrors, withAuthValidationAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware/index";
import { HiveProfile, DEFAULT_PRIVACY_SETTINGS, DEFAULT_BUILDER_INFO } from '@hive/core';

// Validation schema for profile updates
const updateProfileSchema = z.object({
  fullName: z.string().min(1).max(100).optional(),
  major: z.string().min(1).max(100).optional(),
  academicYear: z.enum(['freshman', 'sophomore', 'junior', 'senior', 'graduate', 'alumni', 'faculty']).optional(),
  graduationYear: z.number().int().min(1900).max(2040).optional(),
  housing: z.string().max(200).optional(),
  pronouns: z.string().max(50).optional(),
  bio: z.string().max(500).optional(),
  statusMessage: z.string().max(200).optional(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  profilePhoto: z.string().url().optional().or(z.literal("")),
  isPublic: z.boolean().optional(),
  builderOptIn: z.boolean().optional(),
  userType: z.enum(['student', 'alumni', 'faculty']).optional(),
  interests: z.array(z.string()).optional(),
  showActivity: z.boolean().optional(),
  showSpaces: z.boolean().optional(),
  showConnections: z.boolean().optional(),
  allowDirectMessages: z.boolean().optional(),
  showOnlineStatus: z.boolean().optional(),
  ghostMode: z.object({
    enabled: z.boolean().optional(),
    level: z.enum(['minimal', 'moderate', 'maximum']).optional()
  }).optional()
});

// Helper to transform Firestore data to HiveProfile
function transformToHiveProfile(userId: string, userData: any, userEmail?: string): HiveProfile {
  const now = new Date().toISOString();

  return {
    identity: {
      id: userId,
      fullName: userData?.fullName || '',
      handle: userData?.handle || '',
      email: userData?.email || userEmail || '',
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
        level: (userData?.ghostMode?.level ?? 'minimal') as 'minimal' | 'moderate' | 'maximum'
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
 * Get user profile
 * GET /api/profile
 */
export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const userId = getUserId(request);

  // Development mode - clean mock data
  if (userId === 'dev-user-1' || userId === 'test-user' || userId === 'dev_user_123' || userId === 'debug-user') {
    const mockData = {
      fullName: 'Dev User',
      handle: 'devuser',
      email: 'dev@hive.com',
      major: 'Computer Science',
      academicYear: 'senior',
      graduationYear: 2025,
      housing: 'Smith Hall, Room 305',
      pronouns: 'they/them',
      bio: 'Building the future of campus collaboration with HIVE 🚀',
      statusMessage: 'Building epic study tools',
      avatarUrl: '',
      schoolId: 'dev_school',
      userType: 'student',
      emailVerified: true,
      builderOptIn: true,
      isBuilder: true,
      isPublic: true,
      onboardingCompleted: true,
      createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
      spacesJoined: 8,
      spacesActive: 5,
      spacesLed: 3,
      toolsUsed: 12,
      toolsCreated: 4,
      connectionsCount: 156,
      totalActivity: 342,
      currentStreak: 7,
      longestStreak: 21,
      reputation: 89,
      achievements: 12,
      interests: ['coding', 'design', 'collaboration', 'student-life'],
      specializations: ['web-development', 'ui-ux', 'productivity-tools']
    };

    const profile = transformToHiveProfile(userId, mockData, 'dev@hive.com');
    return respond.success({ profile });
  }

  // Production: Fetch from Firestore
  const userDoc = await dbAdmin.collection('users').doc(userId).get();

  if (!userDoc.exists) {
    return respond.error("User profile not found", "RESOURCE_NOT_FOUND", { status: 404 });
  }

  const userData = userDoc.data();
  const profile = transformToHiveProfile(userId, userData, userData?.email);

  return respond.success({ profile });
});

/**
 * Update user profile
 * PATCH /api/profile
 */
export const PATCH = withAuthValidationAndErrors(
  updateProfileSchema,
  async (request: AuthenticatedRequest, context, updateData: z.infer<typeof updateProfileSchema>, respond) => {
  const userId = getUserId(request);

  // Development mode - skip Firestore
  if (userId === 'dev-user-1' || userId === 'test-user' || userId === 'dev_user_123' || userId === 'debug-user') {
    logger.info('Development mode profile update', { data: updateData, endpoint: '/api/profile' });

    return respond.success({
      message: 'Profile updated successfully (development mode)',
      updated: Object.keys(updateData)
    });
  }

  // Update the user document in Firestore
  const userRef = dbAdmin.collection('users').doc(userId);
  const updatePayload = {
    ...updateData,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  };

  await userRef.update(updatePayload);

  return respond.success({
    message: 'Profile updated successfully',
    updated: Object.keys(updateData)
  });
  }
);