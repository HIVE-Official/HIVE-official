/**
 * Profile API Route - Firebase Direct Implementation
 * Provides user profile data and updates
 */

import { z } from 'zod';
import { logger } from "@/lib/logger";
import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { withSecureAuth } from '@/lib/api-auth-secure';
import { CURRENT_CAMPUS_ID } from '@/lib/secure-firebase-queries';

// Profile update schema
const ProfileUpdateSchema = z.object({
  handle: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/).optional(),
  firstName: z.string().min(1).max(50).optional(),
  lastName: z.string().min(1).max(50).optional(),
  fullName: z.string().min(1).max(100).optional(),
  bio: z.string().max(500).optional(),
  major: z.string().min(1).max(100).optional(),
  graduationYear: z.number().int().min(2020).max(2030).optional(),
  dorm: z.string().max(100).optional(),
  housing: z.string().max(200).optional(),
  pronouns: z.string().max(50).optional(),
  academicYear: z.string().max(50).optional(),
  interests: z.array(z.string()).max(10).optional(),
  profileImageUrl: z.string().url().optional(),
  photos: z.array(z.string().url()).max(5).optional(),
  statusMessage: z.string().max(200).optional(),
  currentVibe: z.string().max(100).optional(),
  availabilityStatus: z.enum(['online', 'studying', 'busy', 'away', 'invisible']).optional(),
  lookingFor: z.array(z.string()).optional(),
  builderOptIn: z.boolean().optional(),
  builderAnalyticsEnabled: z.boolean().optional(),
  isPublic: z.boolean().optional(),
  showActivity: z.boolean().optional(),
  showSpaces: z.boolean().optional(),
  showConnections: z.boolean().optional(),
  allowDirectMessages: z.boolean().optional(),
  showOnlineStatus: z.boolean().optional()
});

/**
 * GET /api/profile
 * Get current user's profile
 */
export const GET = withSecureAuth(
  async (request: NextRequest, token) => {
    try {
      const campusId = CURRENT_CAMPUS_ID;
      const userSnapshot = await dbAdmin.collection('users').doc(token.uid).get();

      if (!userSnapshot.exists()) {
        logger.warn('Profile not found', {
          userId: token.uid,
          endpoint: '/api/profile'
        });

        return NextResponse.json({
          success: false,
          error: 'Profile not found',
          needsOnboarding: true
        }, { status: 404 });
      }

      const userData = userSnapshot.data();

      // Transform to API response format
      const response = {
        success: true,
        data: {
          id: token.uid,
          email: userData.email,
          handle: userData.handle,
          firstName: userData.firstName,
          lastName: userData.lastName,
          fullName: userData.fullName || `${userData.firstName || ''} ${userData.lastName || ''}`.trim(),
          bio: userData.bio,
          major: userData.major,
          graduationYear: userData.graduationYear,
          dorm: userData.dorm,
          interests: userData.interests || [],
          profileImageUrl: userData.profileImageUrl,
          photos: userData.photos || [],
          statusMessage: userData.statusMessage,
          currentVibe: userData.currentVibe,
          availabilityStatus: userData.availabilityStatus || 'online',
          lookingFor: userData.lookingFor || [],
          onboardingStatus: {
            isComplete: userData.onboardingComplete || false,
            currentStep: userData.onboardingStep || 1
          },
          privacy: {
            isPublic: userData.privacySettings?.isPublic ?? true,
            showActivity: userData.privacySettings?.showActivity ?? true,
            showSpaces: userData.privacySettings?.showSpaces ?? true,
            showConnections: userData.privacySettings?.showConnections ?? true,
            allowDirectMessages: userData.privacySettings?.allowDirectMessages ?? true,
            showOnlineStatus: userData.privacySettings?.showOnlineStatus ?? true
          },
          stats: {
            connectionCount: userData.connections?.length || 0,
            spacesJoined: userData.spaceIds?.length || 0
          },
          metadata: {
            campusId: userData.campusId || campusId,
            createdAt: userData.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
            updatedAt: userData.updatedAt?.toDate?.()?.toISOString() || new Date().toISOString()
          }
        }
      };

      logger.info('Profile fetched successfully', {
        userId: token.uid,
        handle: userData.handle,
        endpoint: '/api/profile'
      });

      return NextResponse.json(response);

    } catch (error) {
      logger.error(
        'Error fetching profile',
        error instanceof Error ? error : new Error(String(error)),
        {
          userId: token.uid,
          endpoint: '/api/profile'
        }
      );
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      );
    }
  },
  {
    allowAnonymous: false,
    rateLimit: { type: 'api' }
  }
);

/**
 * PUT /api/profile
 * Update current user's profile
 */
export const PUT = withSecureAuth(
  async (request: NextRequest, token) => {
    try {
      const campusId = CURRENT_CAMPUS_ID;
      const body = await request.json();

      // Validate update data
      const updateData = ProfileUpdateSchema.parse(body);

      logger.info('Profile update request', {
        userId: token.uid,
        fields: Object.keys(updateData),
        endpoint: '/api/profile'
      });

      // Check if handle is being updated and if it's unique
      if (updateData.handle) {
      const existingHandleSnapshot = await dbAdmin.collection('users')
          .where('handle', '==', updateData.handle)
          .where('campusId', '==', campusId)
          .limit(1)
          .get();

        if (!existingHandleSnapshot.empty && existingHandleSnapshot.docs[0].id !== token.uid) {
          return NextResponse.json(
            { success: false, error: 'Handle already taken' },
            { status: 400 }
          );
        }
      }

      // Update user document
      const updateFields: any = {
        ...updateData,
        updatedAt: new Date(),
        campusId
      };

      // Merge privacy settings properly
      if (updateData.isPublic !== undefined ||
          updateData.showActivity !== undefined ||
          updateData.showSpaces !== undefined ||
          updateData.showConnections !== undefined ||
          updateData.allowDirectMessages !== undefined ||
          updateData.showOnlineStatus !== undefined) {

        const currentDoc = await dbAdmin.collection('users').doc(token.uid).get();
        const currentPrivacy = currentDoc.data()?.privacySettings || {};

        updateFields.privacySettings = {
          ...currentPrivacy,
          ...(updateData.isPublic !== undefined && { isPublic: updateData.isPublic }),
          ...(updateData.showActivity !== undefined && { showActivity: updateData.showActivity }),
          ...(updateData.showSpaces !== undefined && { showSpaces: updateData.showSpaces }),
          ...(updateData.showConnections !== undefined && { showConnections: updateData.showConnections }),
          ...(updateData.allowDirectMessages !== undefined && { allowDirectMessages: updateData.allowDirectMessages }),
          ...(updateData.showOnlineStatus !== undefined && { showOnlineStatus: updateData.showOnlineStatus })
        };

        // Remove the individual privacy fields from top level
        delete updateFields.isPublic;
        delete updateFields.showActivity;
        delete updateFields.showSpaces;
        delete updateFields.showConnections;
        delete updateFields.allowDirectMessages;
        delete updateFields.showOnlineStatus;
      }

      await dbAdmin.collection('users').doc(token.uid).update(updateFields);

      logger.info('Profile updated successfully', {
        userId: token.uid,
        handle: updateData.handle,
        fieldsUpdated: Object.keys(updateData),
        endpoint: '/api/profile'
      });

      return NextResponse.json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          id: token.uid,
          handle: updateData.handle,
          updatedFields: Object.keys(updateData)
        }
      });

    } catch (error) {
      logger.error(
        'Error updating profile',
        error instanceof Error ? error : new Error(String(error)),
        {
          userId: token.uid,
          endpoint: '/api/profile'
        }
      );
      return NextResponse.json(
        { success: false, error: 'Internal server error' },
        { status: 500 }
      );
    }
  },
  {
    allowAnonymous: false,
    rateLimit: { type: 'api' }
  }
);

/**
 * PATCH /api/profile
 * Alias for updating current user's profile (matches client usage)
 */
export const PATCH = PUT;

/**
 * POST /api/profile
 * Alias for updating current user's profile to match API reference
 */
export const POST = PUT;
