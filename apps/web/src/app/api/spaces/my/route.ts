import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { type Space } from '@hive/core';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";
import { withAuth, ApiResponse } from '@/lib/api/middleware/api-auth-middleware';
import { getUserSpaces, getSpace } from '@/lib/spaces/spaces-db';

/**
 * Get user's spaces with enhanced widget data
 * Returns spaces with membership info, activity, and widget-specific data
 */
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;

    logger.info('🔍 Fetching spaces for user', { userId, endpoint: '/api/spaces/my' });
    
    // For development mode, return mock spaces data
    if ((userId === 'test-user' || userId === 'dev_user_123') && process.env.NODE_ENV !== 'production') {
      const mockSpaces = [
        {
          id: 'cs_study_group',
          name: 'CS Study Group',
          description: 'Computer Science students helping each other with coursework',
          color: '#3B82F6',
          memberCount: 24,
          unreadCount: 3,
          lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
          membershipStatus: 'active',
          role: 'member',
          isPinned: true,
          isFavorite: true,
          joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'math_tutoring',
          name: 'Math Tutoring',
          description: 'Peer tutoring for calculus and statistics',
          color: '#10B981',
          memberCount: 18,
          unreadCount: 1,
          lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
          membershipStatus: 'active',
          role: 'member',
          isPinned: false,
          isFavorite: true,
          joinedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: 'debate_club',
          name: 'Debate Club',
          description: 'Weekly debates and discussion sessions',
          color: '#8B5CF6',
          memberCount: 32,
          unreadCount: 0,
          lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
          membershipStatus: 'active',
          role: 'admin',
          isPinned: true,
          isFavorite: false,
          joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      
      logger.info('✅ Development mode: Returning mock spaces data', { 
        spaceCount: mockSpaces.length, 
        endpoint: '/api/spaces/my' 
      });
      
      return NextResponse.json({
        success: true,
        spaces: mockSpaces,
        activeSpaces: mockSpaces.filter(s => s.membershipStatus === 'active'),
        pinnedSpaces: mockSpaces.filter(s => s.isPinned),
        recentActivity: [
          {
            spaceId: 'cs_study_group',
            spaceName: 'CS Study Group',
            action: 'visited',
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            duration: 45
          },
          {
            spaceId: 'math_tutoring',
            spaceName: 'Math Tutoring',
            action: 'commented',
            timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString()
          }
        ],
        stats: {
          totalSpaces: mockSpaces.length,
          adminSpaces: mockSpaces.filter(s => s.role === 'admin').length,
          totalNotifications: mockSpaces.reduce((sum, s) => sum + s.unreadCount, 0),
          weeklyActivity: 12
        },
        // SECURITY: Development mode removed for production safety
      });
    }

    // Get user's memberships using flat spaceMembers collection
    const memberships = await getUserSpaces(userId);
    
    if (memberships.length === 0) {
      logger.info('📊 No memberships found for user', { userId, endpoint: '/api/spaces/my' });
      return NextResponse.json({
        success: true,
        activeSpaces: [],
        pinnedSpaces: [],
        recentActivity: [],
        stats: {
          totalSpaces: 0,
          adminSpaces: 0,
          totalNotifications: 0,
          weeklyActivity: 0
        }
      });
    }

    logger.info('📊 Found memberships for user', { membershipCount: memberships.length, userId, endpoint: '/api/spaces/my' });

    // Fetch space details for each membership
    const spaces: any[] = [];
    
    for (const membership of memberships) {
      try {
        const space = await getSpace(membership.spaceId);
        
        if (space && space.status === 'active') {
          spaces.push({
            id: space.id,
            name: space.name,
            description: space.description,
            type: space.type,
            category: space.category,
            status: space.status,
            memberCount: space.memberCount || 0,
            visibility: space.visibility,
            createdAt: space.createdAt,
            updatedAt: space.updatedAt,
            
            // Membership-specific data
            membershipRole: membership.role || 'member',
            lastVisited: membership.lastActiveAt || new Date(),
            joinedAt: membership.joinedAt,
            
            // Real activity data (can be expanded based on actual analytics)
            activity: {
              newPosts: 0,
              newEvents: 0,
              newMembers: 0
            },
            
            // Widget data with real counts
            widgets: {
              posts: {
                recentCount: space.postCount || 0,
                lastActivity: null
              },
              events: {
                upcomingCount: space.eventCount || 0,
                nextEvent: null
              },
              members: {
                activeCount: space.memberCount || 0,
                recentJoins: 0
              },
              tools: {
                availableCount: 0
              }
            }
          });
        }
      } catch (error) {
        logger.error('❌ Error fetching space details', { spaceId: membership.spaceId, error, endpoint: '/api/spaces/my' });
        // Continue with other spaces even if one fails
      }
    }

    // Sort spaces by last visited (most recent first)
    spaces.sort((a, b) => new Date(b.lastVisited).getTime() - new Date(a.lastVisited).getTime());

    const pinnedSpaces = spaces.slice(0, 4); // For now, just show first 4 as "pinned"
    const recentSpaces = spaces.slice(0, 5);

    // Calculate stats
    const stats = {
      totalSpaces: spaces.length,
      adminSpaces: spaces.filter(s => ['admin', 'owner'].includes(s.membershipRole)).length,
      totalNotifications: spaces.reduce((sum, s) => sum + s.notifications, 0),
      weeklyActivity: spaces.reduce((sum, s) => sum + s.activity.newPosts + s.activity.newEvents, 0)
    };

    // Mock recent activity (would come from actual activity feeds)
    const recentActivity = spaces.slice(0, 3).map(space => ({
      spaceId: space.id,
      spaceName: space.name,
      type: 'post',
      content: 'Recent activity in this space',
      timestamp: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000)
    }));

    logger.info('✅ Returningspaces for user', { spaces, userId, endpoint: '/api/spaces/my' });

    return NextResponse.json({
      success: true,
      activeSpaces: spaces,
      pinnedSpaces,
      recentActivity,
      stats
    });

  } catch (error: any) {
    logger.error('❌ My spaces API error', { error: error, endpoint: '/api/spaces/my' });

    if (error.code === 'auth/id-token-expired') {
      return NextResponse.json(ApiResponseHelper.error("Token expired", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error',
        activeSpaces: [],
        pinnedSpaces: [],
        recentActivity: [],
        stats: {
          totalSpaces: 0,
          adminSpaces: 0,
          totalNotifications: 0,
          weeklyActivity: 0
        }
      },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, { 
  allowDevelopmentBypass: true, // User spaces are safe for development
  operation: 'get_user_spaces' 
});

/**
 * Update user space preferences (pin/unpin, notifications, etc.)
 */
export const PATCH = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;

    const body = await request.json();
    const { spaceId, action, value } = body;

    if (!spaceId || !action) {
      return NextResponse.json(ApiResponseHelper.error("spaceId and action are required", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    // Find the membership document using flat spaceMembers collection
    const memberId = `${spaceId}_${userId}`;
    const membershipRef = dbAdmin.collection('spaceMembers').doc(memberId);
    const membershipDoc = await membershipRef.get();

    if (!membershipDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Membership not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    // Update membership based on action
    const updates: any = { lastActiveAt: new Date() };
    
    switch (action) {
      case 'pin':
        updates.isPinned = true;
        break;
      case 'unpin':
        updates.isPinned = false;
        break;
      case 'mark_visited':
        updates.lastActiveAt = new Date();
        break;
      case 'update_notifications':
        updates.notificationsEnabled = body.enabled;
        break;
      default:
        return NextResponse.json(ApiResponseHelper.error("Invalid action", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    await membershipRef.update(updates);

    logger.info('✅ Updated membership for space, action', { spaceId, action, endpoint: '/api/spaces/my' });

    return NextResponse.json({
      success: true,
      message: `Space ${action} successful`
    });

  } catch (error: any) {
    logger.error('❌ My spaces PATCH error', { error: error, endpoint: '/api/spaces/my' });

    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error'
      },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, { 
  allowDevelopmentBypass: true, // Space preferences are safe for development
  operation: 'update_space_preferences' 
});