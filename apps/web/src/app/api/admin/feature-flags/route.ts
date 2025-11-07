import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus } from '@/lib/api-response-types';
import { featureFlagService, FeatureFlag as _FeatureFlag } from '@/lib/feature-flags';
import { withSecureAuth } from '@/lib/api-auth-secure';

/**
 * Admin Feature Flags Management API
 * Allows admins to create, read, update, and delete feature flags
 */

// GET - List all feature flags (admin only)
export const GET = withSecureAuth(async (request: NextRequest, token) => {
  try {
    const flags = await featureFlagService.getAllFeatureFlags();

    logger.info('Admin feature flags retrieved', {
      adminUserId: token?.uid || 'unknown',
      flagCount: flags.length
    });

    return NextResponse.json({
      success: true,
      flags,
      count: flags.length,
      retrievedAt: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error getting admin feature flags', { error: error instanceof Error ? error : new Error(String(error))});
    return NextResponse.json(
      ApiResponseHelper.error('Failed to get feature flags', 'INTERNAL_ERROR'),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, { requireAdmin: true });

// POST - Create a new feature flag (admin only)
export const POST = withSecureAuth(async (request: NextRequest, token) => {
  try {
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

    await featureFlagService.setFeatureFlag(flagData, token?.uid || 'unknown');
    
    logger.info('Feature flag created', { 
      flagId: id, 
      adminUserId: token?.uid || 'unknown', 
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
    logger.error('Error creating feature flag', { error: error instanceof Error ? error : new Error(String(error))});
    return NextResponse.json(
      ApiResponseHelper.error('Failed to create feature flag', 'INTERNAL_ERROR'), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, { requireAdmin: true });
