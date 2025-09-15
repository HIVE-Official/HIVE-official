import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth/providers/auth-server';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus } from '@/lib/api/response-types/api-response-types';
import { featureFlagService, FeatureFlag as _FeatureFlag } from '@/lib/feature-flags';

/**
 * Admin Feature Flags Management API
 * Allows admins to create, read, update, and delete feature flags
 */

// GET - List all feature flags (admin only)
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error('Unauthorized', 'UNAUTHORIZED'), 
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    // TODO: Add proper admin check
    // For now, allowing all authenticated users for development
    // if (!await isAdmin(user.uid)) {
    //   return NextResponse.json(
    //     ApiResponseHelper.error('Admin access required', 'FORBIDDEN'), 
    //     { status: HttpStatus.FORBIDDEN }
    //   );
    // }

    const flags = await featureFlagService.getAllFeatureFlags();
    
    logger.info('Admin feature flags retrieved', { 
      adminUserId: user.uid, 
      flagCount: flags.length 
    });

    return NextResponse.json({
      success: true,
      flags,
      count: flags.length,
      retrievedAt: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error getting admin feature flags', { error, endpoint: '/api/admin/feature-flags' });
    return NextResponse.json(
      ApiResponseHelper.error('Failed to get feature flags', 'INTERNAL_ERROR'), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// POST - Create a new feature flag (admin only)
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error('Unauthorized', 'UNAUTHORIZED'), 
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    // TODO: Add proper admin check
    // if (!await isAdmin(user.uid)) {
    //   return NextResponse.json(
    //     ApiResponseHelper.error('Admin access required', 'FORBIDDEN'), 
    //     { status: HttpStatus.FORBIDDEN }
    //   );
    // }

    const body = await request.json();
    const { 
      id, 
      name, 
      description, 
      category, 
      enabled = false, 
      rollout,
      config,
      conditions,
      analytics
    } = body;

    // Validate required fields
    if (!id || !name || !description || !category || !rollout) {
      return NextResponse.json(
        ApiResponseHelper.error('Missing required fields', 'INVALID_INPUT'), 
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // Validate category
    const validCategories = ['core', 'experimental', 'infrastructure', 'ui_ux', 'tools', 'spaces', 'admin'];
    if (!validCategories.includes(category)) {
      return NextResponse.json(
        ApiResponseHelper.error('Invalid category', 'INVALID_INPUT'), 
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // Validate rollout type
    const validRolloutTypes = ['all', 'percentage', 'users', 'schools', 'ab_test'];
    if (!validRolloutTypes.includes(rollout.type)) {
      return NextResponse.json(
        ApiResponseHelper.error('Invalid rollout type', 'INVALID_INPUT'), 
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    const flagData = {
      id,
      name,
      description,
      category,
      enabled,
      rollout,
      config,
      conditions,
      analytics
    };

    await featureFlagService.setFeatureFlag(flagData, user.uid);
    
    logger.info('Feature flag created', { 
      flagId: id, 
      adminUserId: user.uid, 
      category, 
      enabled 
    });

    return NextResponse.json({
      success: true,
      message: 'Feature flag created successfully',
      flagId: id,
      createdAt: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error creating feature flag', { error, endpoint: '/api/admin/feature-flags' });
    return NextResponse.json(
      ApiResponseHelper.error('Failed to create feature flag', 'INTERNAL_ERROR'), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}