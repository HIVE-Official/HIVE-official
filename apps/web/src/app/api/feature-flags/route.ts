import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-server';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus } from '@/lib/api-response-types';
import { featureFlagService, UserFeatureContext, HIVE_FEATURE_FLAGS } from '@/lib/feature-flags';
import { dbAdmin } from '@/lib/firebase-admin';

/**
 * User Feature Flags API
 * Allows users to check which features are enabled for them
 */

// GET - Get feature flags for the current user
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error('Unauthorized', 'UNAUTHORIZED'), 
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const { searchParams } = new URL(request.url);
    const flagIds = searchParams.get('flags')?.split(',') || [];
    const category = searchParams.get('category');
    const includeConfig = searchParams.get('includeConfig') === 'true';

    // Build user context
    const userContext = await buildUserContext(user.id);

    let results: Record<string, any> = {};

    if (flagIds.length > 0) {
      // Get specific flags
      results = await featureFlagService.getUserFeatureFlags(flagIds, userContext);
    } else if (category) {
      // Get flags by category
      results = await featureFlagService.getCategoryFeatureFlags(
        category as any, 
        userContext
      );
    } else {
      // Get all predefined HIVE flags
      const allHiveFlagIds = Object.values(HIVE_FEATURE_FLAGS);
      results = await featureFlagService.getUserFeatureFlags(allHiveFlagIds, userContext);
    }

    // Remove config if not requested (for security)
    if (!includeConfig) {
      Object.keys(results).forEach(flagId => {
        if (results[flagId].config) {
          delete results[flagId].config;
        }
      });
    }

    return NextResponse.json({
      success: true,
      flags: results,
      userContext: {
        userId: userContext.userId,
        userRole: userContext.userRole,
        schoolId: userContext.schoolId,
        spaceCount: userContext.spaceIds?.length || 0
      },
      evaluatedAt: new Date().toISOString()
    });
  } catch (error) {
    logger.error(
      `Error getting user feature flags at /api/feature-flags`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(
      ApiResponseHelper.error('Failed to get feature flags', 'INTERNAL_ERROR'), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// POST - Check multiple feature flags with custom context
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error('Unauthorized', 'UNAUTHORIZED'), 
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const body = await request.json();
    const { flagIds, customContext = {} } = body;

    if (!flagIds || !Array.isArray(flagIds)) {
      return NextResponse.json(
        ApiResponseHelper.error('Flag IDs array is required', 'INVALID_INPUT'), 
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // Build user context with custom overrides
    const baseUserContext = await buildUserContext(user.id);
    const userContext: UserFeatureContext = {
      ...baseUserContext,
      ...customContext,
      userId: user.id // Always keep the real user ID
    };

    const results = await featureFlagService.getUserFeatureFlags(flagIds, userContext);

    return NextResponse.json({
      success: true,
      flags: results,
      userContext: {
        userId: userContext.userId,
        userRole: userContext.userRole,
        schoolId: userContext.schoolId,
        spaceCount: userContext.spaceIds?.length || 0
      },
      evaluatedAt: new Date().toISOString()
    });
  } catch (error) {
    logger.error(
      `Error checking feature flags at /api/feature-flags`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(
      ApiResponseHelper.error('Failed to check feature flags', 'INTERNAL_ERROR'), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// Helper function to build user context from database
async function buildUserContext(userId: string): Promise<UserFeatureContext> {
  try {
    // Get user profile
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    const userData = userDoc.exists ? userDoc.data() : {};

    // Get user's spaces
    const membershipsQuery = dbAdmin.collection('members')
      .where('userId', '==', userId)
      .where('status', '==', 'active');
    
    const membershipsSnapshot = await membershipsQuery.get();
    const spaceIds = membershipsSnapshot.docs.map(doc => doc.data().spaceId);

    // Determine user role (highest role across all spaces)
    const roles = membershipsSnapshot.docs.map(doc => doc.data().role || 'member');
    const roleHierarchy = ['member', 'builder', 'moderator', 'admin'];
    const highestRole = roles.reduce((highest, current) => {
      const currentIndex = roleHierarchy.indexOf(current);
      const highestIndex = roleHierarchy.indexOf(highest);
      return currentIndex > highestIndex ? current : highest;
    }, 'member');

    return {
      userId,
      userRole: highestRole,
      schoolId: userData?.school || userData?.schoolId,
      spaceIds,
      metadata: {
        classYear: userData?.classYear,
        major: userData?.major,
        createdAt: userData?.createdAt,
        lastActiveAt: userData?.lastActiveAt,
        builderStatus: userData?.builderRequestStatus
      }
    };
  } catch (error) {
    logger.error('Error building user context', { error: error instanceof Error ? error.message : String(error), userId });
    
    // Return minimal context on error
    return {
      userId,
      userRole: 'member',
      spaceIds: []
    };
  }
}

// Utility route to get available feature flag categories and descriptions
export async function OPTIONS(request: NextRequest) {
  try {
    const categories = [
      {
        id: 'core',
        name: 'Core Features',
        description: 'Essential platform functionality'
      },
      {
        id: 'experimental',
        name: 'Experimental Features',
        description: 'New features in testing'
      },
      {
        id: 'infrastructure',
        name: 'Infrastructure',
        description: 'Backend and performance features'
      },
      {
        id: 'ui_ux',
        name: 'UI/UX',
        description: 'User interface and experience enhancements'
      },
      {
        id: 'tools',
        name: 'Tools',
        description: 'Tool-related functionality'
      },
      {
        id: 'spaces',
        name: 'Spaces',
        description: 'Space and community features'
      },
      {
        id: 'admin',
        name: 'Admin',
        description: 'Administrative features'
      }
    ];

    const predefinedFlags = Object.entries(HIVE_FEATURE_FLAGS).map(([name, id]) => ({
      id,
      name: name.toLowerCase().replace(/_/g, ' '),
      constantName: name
    }));

    return NextResponse.json({
      success: true,
      categories,
      predefinedFlags,
      rolloutTypes: [
        {
          type: 'all',
          description: 'Enable for all users'
        },
        {
          type: 'percentage',
          description: 'Enable for a percentage of users'
        },
        {
          type: 'users',
          description: 'Enable for specific users'
        },
        {
          type: 'schools',
          description: 'Enable for specific schools'
        },
        {
          type: 'ab_test',
          description: 'A/B test with multiple groups'
        }
      ]
    });
  } catch (error) {
    logger.error(
      `Error getting feature flag metadata at /api/feature-flags`,
      error instanceof Error ? error : new Error(String(error))
    );
    return NextResponse.json(
      ApiResponseHelper.error('Failed to get metadata', 'INTERNAL_ERROR'), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}