import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { withAuth, ApiResponse } from '@/lib/api-auth-middleware';

// In-memory store for development mode profile data
const devProfileStore: Record<string, any> = {};

// Validation schema for profile updates
const updateProfileSchema = z.object({
  fullName: z.string().min(1).max(100).optional(),
  major: z.string().min(1).max(100).optional(),
  academicYear: z.enum(['freshman', 'sophomore', 'junior', 'senior', 'graduate', 'other']).optional(),
  graduationYear: z.number().int().min(1900).max(2040).optional(),
  housing: z.string().max(200).optional(),
  pronouns: z.string().max(50).optional(),
  bio: z.string().max(500).optional(),
  statusMessage: z.string().max(200).optional(),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  profilePhoto: z.string().url().optional().or(z.literal("")),
  isPublic: z.boolean().optional(),
  builderOptIn: z.boolean().optional(),
  userType: z.enum(['student', 'alumni', 'faculty']).optional() });

/**
 * Get user profile
 * GET /api/profile
 */
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;

    // For development mode, provide mock data structured like HiveProfile
    if (userId === 'test-user' || userId === 'dev_user_123') {
      const storedProfile = devProfileStore[userId] || {};
      
      return NextResponse.json({
        success: true,
        user: {
          id: userId,
          email: `dev@hive.com`,
          fullName: storedProfile.fullName || 'Dev User',
          handle: storedProfile.handle || 'devuser',
          major: storedProfile.major || 'Computer Science',
          academicYear: storedProfile.academicYear || 'Senior',
          graduationYear: storedProfile.graduationYear || 2025,
          housing: storedProfile.housing || 'Smith Hall, Room 305',
          pronouns: storedProfile.pronouns || 'they/them',
          bio: storedProfile.bio || 'Building the future of campus collaboration with HIVE 🚀',
          statusMessage: storedProfile.statusMessage || 'Building epic study tools',
          profilePhoto: storedProfile.profilePhoto || storedProfile.avatarUrl || '',
          avatarUrl: storedProfile.avatarUrl || '',
          schoolId: 'dev_school',
          userType: storedProfile.userType || 'student',
          emailVerified: true,
          builderOptIn: storedProfile.builderOptIn || true,
          isBuilder: storedProfile.isBuilder || true,
          isPublic: storedProfile.isPublic !== false,
          onboardingCompleted: true,
          joinedAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
          lastActive: new Date().toISOString(),
          lastActiveAt: new Date().toISOString(),
          createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date().toISOString(),
          consentGiven: true,
          consentGivenAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
          developmentMode: true,
          // Additional fields for complete profile
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
          showActivity: storedProfile.showActivity !== false,
          showSpaces: storedProfile.showSpaces !== false,
          showConnections: storedProfile.showConnections !== false,
          allowDirectMessages: storedProfile.allowDirectMessages !== false,
          showOnlineStatus: storedProfile.showOnlineStatus !== false,
          ghostMode: {
            enabled: storedProfile.ghostMode?.enabled || false,
            level: storedProfile.ghostMode?.level || 'minimal'
          },
          builderLevel: 'intermediate',
          specializations: ['web-development', 'ui-ux', 'productivity-tools'],
          interests: ['coding', 'design', 'collaboration', 'student-life']
        }
      });
    }

    // Get user document from Firestore
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    
    if (!userDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("User profile not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const userData = userDoc.data();
    
    // Return sanitized user profile
    const userProfile = {
      id: userId,
      email: userData?.email,
      fullName: userData?.fullName || '',
      handle: userData?.handle || '',
      major: userData?.major || '',
      academicYear: userData?.academicYear || '',
      graduationYear: userData?.graduationYear,
      housing: userData?.housing || '',
      pronouns: userData?.pronouns || '',
      bio: userData?.bio || '',
      statusMessage: userData?.statusMessage || '',
      avatarUrl: userData?.avatarUrl || '',
      profilePhoto: userData?.profilePhoto || userData?.avatarUrl || '',
      schoolId: userData?.schoolId || '',
      userType: userData?.userType || 'student',
      emailVerified: userData?.emailVerified || false,
      builderOptIn: userData?.builderOptIn || false,
      isBuilder: userData?.isBuilder || false,
      isPublic: userData?.isPublic || false,
      onboardingCompleted: !!userData?.onboardingCompletedAt,
      joinedAt: userData?.createdAt || new Date().toISOString(),
      lastActive: userData?.lastActiveAt || userData?.updatedAt || new Date().toISOString(),
      createdAt: userData?.createdAt,
      updatedAt: userData?.updatedAt,
      consentGiven: userData?.consentGiven || false,
      consentGivenAt: userData?.consentGivenAt,
    };

    return NextResponse.json({
      success: true,
      user: userProfile
    });

  } catch (error) {
    logger.error('Profile fetch error', { error: error, endpoint: '/api/profile' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch profile", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: true, // Allow for profile viewing but with secure auth
  operation: 'fetch_user_profile' 
});

/**
 * Update user profile
 * PATCH /api/profile
 */
export const PATCH = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;

    // Parse and validate the update data
    const body = await request.json();
    const updateData = updateProfileSchema.parse(body);

    // For development mode, store in memory
    if (userId === 'test-user' || userId === 'dev_user_123') {
      devProfileStore[userId] = {
        ...devProfileStore[userId],
        ...updateData,
      };
      
      logger.info('Development mode profile update', { data: updateData, endpoint: '/api/profile' });
      
      return NextResponse.json({
        success: true,
        message: 'Profile updated successfully (development mode)',
        updated: updateData
      });
    }

    // Update the user document in Firestore
    const userRef = dbAdmin.collection('users').doc(userId);
    const updatePayload = {
      ...updateData,
      updatedAt: FieldValue.serverTimestamp(),
    };

    await userRef.update(updatePayload);

    return NextResponse.json({
      success: true,
      message: 'Profile updated successfully',
      updated: Object.keys(updateData)
    });

  } catch (error) {
    logger.error('Profile update error', { error: error, endpoint: '/api/profile' });
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    return NextResponse.json(ApiResponseHelper.error("Failed to update profile", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: true, // Allow for profile updates but with secure auth
  operation: 'update_user_profile' 
});