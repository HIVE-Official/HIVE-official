import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-server';
import { logger } from '@/lib/logger';
import { ApiResponseHelper, HttpStatus } from '@/lib/api-response-types';
import { featureFlagService } from '@/lib/feature-flags';

/**
 * Individual Feature Flag Management API
 * Allows admins to get, update, and delete specific feature flags
 */

type RouteParams = {
  params: Promise<{
    flagId: string;
  }>;
};

// GET - Get a specific feature flag (admin only)
export async function GET(request: NextRequest, { params }: RouteParams) {
  let flagId: string = 'unknown';
  
  try {
    const resolvedParams = await params;
    flagId = resolvedParams.flagId;
    
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error('Unauthorized', 'UNAUTHORIZED'), 
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    const flag = await featureFlagService.getFeatureFlag(flagId);

    if (!flag) {
      return NextResponse.json(
        ApiResponseHelper.error('Feature flag not found', 'NOT_FOUND'), 
        { status: HttpStatus.NOT_FOUND }
      );
    }

    return NextResponse.json({
      success: true,
      flag,
      retrievedAt: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error getting feature flag', { error: error instanceof Error ? error.message : String(error), flagId });
    return NextResponse.json(
      ApiResponseHelper.error('Failed to get feature flag', 'INTERNAL_ERROR'), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// PATCH - Update a specific feature flag (admin only)
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  let flagId: string = 'unknown';
  
  try {
    const resolvedParams = await params;
    flagId = resolvedParams.flagId;
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error('Unauthorized', 'UNAUTHORIZED'), 
        { status: HttpStatus.UNAUTHORIZED }
      );
    }
    const body = await request.json();

    // Get existing flag
    const existingFlag = await featureFlagService.getFeatureFlag(flagId);
    if (!existingFlag) {
      return NextResponse.json(
        ApiResponseHelper.error('Feature flag not found', 'NOT_FOUND'), 
        { status: HttpStatus.NOT_FOUND }
      );
    }

    // Merge updates with existing flag
    const updatedFlag = {
      ...existingFlag,
      ...body,
      id: flagId, // Ensure ID can't be changed
    };

    // Validate category if provided
    if (body.category) {
      const validCategories = ['core', 'experimental', 'infrastructure', 'ui_ux', 'tools', 'spaces', 'admin'];
      if (!validCategories.includes(body.category)) {
        return NextResponse.json(
          ApiResponseHelper.error('Invalid category', 'INVALID_INPUT'), 
          { status: HttpStatus.BAD_REQUEST }
        );
      }
    }

    // Validate rollout type if provided
    if (body.rollout?.type) {
      const validRolloutTypes = ['all', 'percentage', 'users', 'schools', 'ab_test'];
      if (!validRolloutTypes.includes(body.rollout.type)) {
        return NextResponse.json(
          ApiResponseHelper.error('Invalid rollout type', 'INVALID_INPUT'), 
          { status: HttpStatus.BAD_REQUEST }
        );
      }
    }

    await featureFlagService.setFeatureFlag(updatedFlag, user.id);
    
    logger.info('Feature flag updated', { 
      flagId, 
      adminUserId: user.id, 
      action: 'feature_flag_updated'
    });

    return NextResponse.json({
      success: true,
      message: 'Feature flag updated successfully',
      flagId,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error updating feature flag', { error: error instanceof Error ? error.message : String(error), flagId });
    return NextResponse.json(
      ApiResponseHelper.error('Failed to update feature flag', 'INTERNAL_ERROR'), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}

// DELETE - Delete a specific feature flag (admin only)
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  let flagId: string = 'unknown';
  
  try {
    const resolvedParams = await params;
    flagId = resolvedParams.flagId;
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(
        ApiResponseHelper.error('Unauthorized', 'UNAUTHORIZED'), 
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    // Check if flag exists
    const existingFlag = await featureFlagService.getFeatureFlag(flagId);
    if (!existingFlag) {
      return NextResponse.json(
        ApiResponseHelper.error('Feature flag not found', 'NOT_FOUND'), 
        { status: HttpStatus.NOT_FOUND }
      );
    }

    await featureFlagService.deleteFeatureFlag(flagId, user.id);
    
    logger.info('Feature flag deleted', { 
      flagId, 
      adminUserId: user.id,
      action: 'feature_flag_deleted'
    });

    return NextResponse.json({
      success: true,
      message: 'Feature flag deleted successfully',
      flagId,
      deletedAt: new Date().toISOString()
    });
  } catch (error) {
    logger.error('Error deleting feature flag', { error: error instanceof Error ? error.message : String(error), flagId });
    return NextResponse.json(
      ApiResponseHelper.error('Failed to delete feature flag', 'INTERNAL_ERROR'), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}