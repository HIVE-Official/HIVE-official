/**
 * Spaces Browse API Route V2
 * Uses CQRS pattern for space discovery
 */

import { NextResponse } from 'next/server';
import { FirebaseUnitOfWork } from '@hive/core';
import { withAuthAndErrors, getUserId, type AuthenticatedRequest } from '@/lib/middleware';
import { logger } from '@/lib/logger';

export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context) => {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || 'all';
    const sort = searchParams.get('sort') || 'trending';
    const limit = parseInt(searchParams.get('limit') || '20', 10);

    const userId = getUserId(request);
    const campusId = 'ub-buffalo'; // Campus isolation

    logger.info('Browse spaces request', {
      category,
      sort,
      limit,
      userId,
      campusId,
      endpoint: '/api/spaces/browse-v2'
    });

    // Get spaces using repository
    const unitOfWork = new FirebaseUnitOfWork();

    let spacesResult;
    if (sort === 'trending') {
      spacesResult = await unitOfWork.spaces.findTrending(campusId, limit);
    } else if (sort === 'recommended') {
      // Get user profile for interests
      const profileResult = await unitOfWork.profiles.findById(userId);
      const interests = profileResult.isSuccess ? profileResult.getValue().interests : [];
      const major = profileResult.isSuccess ? profileResult.getValue().major : undefined;

      spacesResult = await unitOfWork.spaces.findRecommended(campusId, interests, major);
    } else if (category !== 'all') {
      spacesResult = await unitOfWork.spaces.findByCategory(category, campusId);
    } else {
      spacesResult = await unitOfWork.spaces.findByCampus(campusId, limit);
    }

    if (spacesResult.isFailure) {
      logger.error(
      `Failed to browse spaces at /api/spaces/browse-v2`,
      spacesResult.error
    );

      return NextResponse.json(
        { error: 'Failed to load spaces' },
        { status: 500 }
      );
    }

    const spaces = spacesResult.getValue();

    // Get user's joined spaces to mark them
    const userSpacesResult = await unitOfWork.spaces.findUserSpaces(userId);
    const userSpaceIds = userSpacesResult.isSuccess
      ? userSpacesResult.getValue().map((s: any) => s.id.id)
      : [];

    // Transform spaces for API response
    const transformedSpaces = spaces.map((space: any) => ({
      id: space.id.id,
      name: space.name.name,
      description: space.description.value,
      category: space.category.value,
      memberCount: space.memberCount,
      postCount: space.postCount,
      isVerified: space.isVerified,
      isJoined: userSpaceIds.includes(space.id.id),
      visibility: space.visibility,
      trendingScore: space.trendingScore,
      createdAt: space.createdAt,
      lastActivityAt: space.lastActivityAt,
      tabs: space.tabs.map((tab: any) => ({
        id: tab.id.id,
        title: tab.title,
        messageCount: tab.messageCount,
        isActive: !tab.isArchived
      })),
      widgets: space.widgets.filter((w: any) => w.isEnabled).map((widget: any) => ({
        type: widget.type,
        config: widget.config
      }))
    }));

    return NextResponse.json({
      success: true,
      data: {
        spaces: transformedSpaces,
        totalCount: transformedSpaces.length,
        hasMore: transformedSpaces.length === limit
      }
    });
  } catch (error) {
    logger.error('Browse spaces error', {
      error,
      endpoint: '/api/spaces/browse-v2'
    });

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
});
