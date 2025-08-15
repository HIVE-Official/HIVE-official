import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';
import { z } from 'zod';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { withAuth, ApiResponse } from '@/lib/api-auth-middleware';

// Privacy settings schema
const privacySettingsSchema = z.object({
  // Profile visibility
  isPublic: z.boolean().optional(),
  showEmail: z.boolean().optional(),
  showSchool: z.boolean().optional(),
  showMajor: z.boolean().optional(),
  showGraduationYear: z.boolean().optional(),
  
  // Activity visibility
  showActivity: z.boolean().optional(),
  showSpaces: z.boolean().optional(),
  showOnlineStatus: z.boolean().optional(),
  
  // Contact preferences
  allowDirectMessages: z.boolean().optional(),
  allowSpaceInvites: z.boolean().optional(),
  allowEventInvites: z.boolean().optional(),
  
  // Analytics and data
  allowAnalytics: z.boolean().optional(),
  allowPersonalization: z.boolean().optional(),
  
  // Ghost mode settings
  ghostMode: z.object({
    enabled: z.boolean(),
    level: z.enum(['minimal', 'moderate', 'maximum']).optional(),
    hideActivity: z.boolean().optional(),
    hideOnlineStatus: z.boolean().optional(),
    hideMemberships: z.boolean().optional(),
  }).optional() });

interface PrivacySettings {
  // Profile visibility
  isPublic: boolean;
  showEmail: boolean;
  showSchool: boolean;
  showMajor: boolean;
  showGraduationYear: boolean;
  
  // Activity visibility
  showActivity: boolean;
  showSpaces: boolean;
  showOnlineStatus: boolean;
  
  // Contact preferences
  allowDirectMessages: boolean;
  allowSpaceInvites: boolean;
  allowEventInvites: boolean;
  
  // Analytics and data
  allowAnalytics: boolean;
  allowPersonalization: boolean;
  
  // Ghost mode
  ghostMode: {
    enabled: boolean;
    level: 'minimal' | 'moderate' | 'maximum';
    hideActivity: boolean;
    hideOnlineStatus: boolean;
    hideMemberships: boolean;
  };
  
  // Metadata
  updatedAt?: any;
  createdAt?: any;
}

// Default privacy settings for new users
const DEFAULT_PRIVACY_SETTINGS: PrivacySettings = {
  // Profile visibility - conservative defaults
  isPublic: false,
  showEmail: false,
  showSchool: true,
  showMajor: true,
  showGraduationYear: true,
  
  // Activity visibility
  showActivity: true,
  showSpaces: true,
  showOnlineStatus: true,
  
  // Contact preferences - allow interaction by default
  allowDirectMessages: true,
  allowSpaceInvites: true,
  allowEventInvites: true,
  
  // Analytics - opt-in by default for better experience
  allowAnalytics: true,
  allowPersonalization: true,
  
  // Ghost mode disabled by default
  ghostMode: {
    enabled: false,
    level: 'minimal',
    hideActivity: false,
    hideOnlineStatus: false,
    hideMemberships: false,
  },
};

/**
 * Get user privacy settings
 * GET /api/profile/privacy
 */
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    
    // For development mode, return defaults
    if (userId === 'test-user') {
      return NextResponse.json({
        success: true,
        privacy: {
          ...DEFAULT_PRIVACY_SETTINGS,
          // SECURITY: Development mode removed for production safety,
        }
      });
    }

    // Get privacy settings document
    const privacyDoc = await dbAdmin.collection('privacySettings').doc(userId).get();
    
    let privacySettings: PrivacySettings;
    
    if (!privacyDoc.exists) {
      // Create default privacy settings if they don't exist
      privacySettings = {
        ...DEFAULT_PRIVACY_SETTINGS,
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      };
      
      await dbAdmin.collection('privacySettings').doc(userId).set(privacySettings);
    } else {
      privacySettings = {
        ...DEFAULT_PRIVACY_SETTINGS,
        ...privacyDoc.data(),
      } as PrivacySettings;
    }

    return NextResponse.json({
      success: true,
      privacy: privacySettings });

  } catch (error) {
    logger.error('Privacy settings fetch error', { error: error, endpoint: '/api/profile/privacy' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch privacy settings", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: true, // Privacy settings viewing is safe for development
  operation: 'get_privacy_settings' 
});

/**
 * Update user privacy settings
 * PATCH /api/profile/privacy
 */
export const PATCH = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;

    // Parse and validate the update data
    const body = await request.json();
    const updateData = privacySettingsSchema.parse(body);

    // Special handling for ghost mode
    if (updateData.ghostMode?.enabled) {
      // Apply ghost mode restrictions
      const ghostLevel = updateData.ghostMode.level || 'minimal';
      updateData.ghostMode = applyGhostModeSettings(ghostLevel, updateData.ghostMode);
      
      // Update main profile visibility when ghost mode is enabled
      if (ghostLevel === 'maximum') {
        updateData.isPublic = false;
        updateData.showActivity = false;
        updateData.showOnlineStatus = false;
      }
    }

    // Update the privacy settings document
    const privacyRef = dbAdmin.collection('privacySettings').doc(userId);
    const updatePayload = {
      ...updateData,
      updatedAt: FieldValue.serverTimestamp(),
    };

    await privacyRef.set(updatePayload, { merge: true });

    // Also update relevant fields in the main user document
    if (updateData.isPublic !== undefined) {
      await dbAdmin.collection('users').doc(userId).update({
        isPublic: updateData.isPublic,
        updatedAt: FieldValue.serverTimestamp() });
    }

    return NextResponse.json({
      success: true,
      message: 'Privacy settings updated successfully',
      updated: Object.keys(updateData) });

  } catch (error) {
    logger.error('Privacy settings update error', { error: error, endpoint: '/api/profile/privacy' });
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }
    
    return NextResponse.json(ApiResponseHelper.error("Failed to update privacy settings", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: true, // Privacy settings updates are user-controlled
  operation: 'update_privacy_settings' 
});

/**
 * Apply ghost mode settings based on level
 */
function applyGhostModeSettings(level: 'minimal' | 'moderate' | 'maximum', currentSettings: any) {
  const baseSettings = {
    enabled: true,
    level,
  };

  switch (level) {
    case 'minimal':
      return {
        ...baseSettings,
        hideActivity: false,
        hideOnlineStatus: true,
        hideMemberships: false,
      };
    
    case 'moderate':
      return {
        ...baseSettings,
        hideActivity: true,
        hideOnlineStatus: true,
        hideMemberships: false,
      };
    
    case 'maximum':
      return {
        ...baseSettings,
        hideActivity: true,
        hideOnlineStatus: true,
        hideMemberships: true,
      };
    
    default:
      return {
        ...baseSettings,
        ...currentSettings,
      };
  }
}