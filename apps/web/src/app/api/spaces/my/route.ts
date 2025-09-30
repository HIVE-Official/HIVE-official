import { z } from "zod";
import { dbAdmin } from '@/lib/firebase-admin';
import { type Space } from '@hive/core';
import { logger } from "@/lib/logger";
import { withAuthAndErrors, withAuthValidationAndErrors, getUserId, type AuthenticatedRequest } from "@/lib/middleware";

const updateSpacePreferencesSchema = z.object({
  spaceId: z.string().min(1, "Space ID is required"),
  action: z.enum(['pin', 'unpin', 'mark_visited', 'update_notifications']),
  value: z.any().optional()
});

/**
 * Get user's spaces with enhanced widget data
 * Returns spaces with membership info, activity, and widget-specific data
 */
export const GET = withAuthAndErrors(async (request: AuthenticatedRequest, context, respond) => {
  const userId = getUserId(request);

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
      
      return respond.success({
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
        }
      });
    }

    // Get user's memberships using collectionGroup
    const membershipsQuery = dbAdmin.collectionGroup('members')
      .where('userId', '==', userId)
      .limit(50); // Limit for performance
      
    const membershipsSnapshot = await membershipsQuery.get();
    
    if (membershipsSnapshot.empty) {
      logger.info('📊 No memberships found for user', { userId, endpoint: '/api/spaces/my' });
      return respond.success({
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

    logger.info('📊 Foundmemberships for user', { membershipsSnapshot, userId, endpoint: '/api/spaces/my' });

    // Extract space IDs and membership data
    const membershipData = new Map<string, any>();
    const spaceIds: string[] = [];

    membershipsSnapshot.docs.forEach(doc => {
      const membership = doc.data();
      const spaceId = doc.ref.parent.parent?.id;
      
      if (spaceId) {
        spaceIds.push(spaceId);
        membershipData.set(spaceId, {
          role: membership.role || 'member',
          joinedAt: membership.joinedAt,
          lastVisited: membership.lastVisited || new Date(),
          notifications: membership.notifications || 0,
          pinned: membership.pinned || false
        });
      }
    });

    // Fetch space details for each membership
    const spaces: any[] = [];
    const spaceTypes = ['student_organizations', 'university_organizations', 'greek_life', 'campus_living', 'hive_exclusive', 'cohort'];

    for (const spaceType of spaceTypes) {
      try {
        const spacesSnapshot = await dbAdmin.collection('spaces')
          .doc(spaceType)
          .collection('spaces')
          .get();
          
        spacesSnapshot.docs.forEach(doc => {
          const spaceId = doc.id;
          if (spaceIds.includes(spaceId)) {
            const spaceData = doc.data();
            const membership = membershipData.get(spaceId);
            
            spaces.push({
              id: spaceId,
              name: spaceData.name,
              description: spaceData.description,
              type: spaceType,
              status: spaceData.status || 'activated', // All active in V1
              memberCount: spaceData.metrics?.memberCount || 0,
              tags: spaceData.tags || [],
              bannerUrl: spaceData.bannerUrl,
              isPrivate: spaceData.isPrivate || false,
              createdAt: spaceData.createdAt,
              updatedAt: spaceData.updatedAt,
              
              // Membership-specific data
              membershipRole: membership?.role || 'member',
              lastVisited: membership?.lastVisited || new Date(),
              notifications: membership?.notifications || 0,
              pinned: membership?.pinned || false,
              
              // Production-safe activity data (empty until real integration)
              activity: {
                newPosts: 0,
                newEvents: 0,
                newMembers: 0
              },
              
              // Production-safe widget data (empty until real integration)
              widgets: {
                posts: {
                  recentCount: 0,
                  lastActivity: null
                },
                events: {
                  upcomingCount: 0,
                  nextEvent: null
                },
                members: {
                  activeCount: spaceData.metrics?.memberCount || 0,
                  recentJoins: 0
                },
                tools: {
                  availableCount: 0
                }
              }
            });
          }
        });
      } catch (error) {
        logger.error('❌ Error fetching spaces for type', { spaceType, error: error instanceof Error ? error : new Error(String(error)), endpoint: '/api/spaces/my' });
        // Continue with other types even if one fails
      }
    }

    // Sort spaces by last visited (most recent first)
    spaces.sort((a, b) => new Date(b.lastVisited).getTime() - new Date(a.lastVisited).getTime());

    // Separate pinned spaces
    const pinnedSpaces = spaces.filter(s => s.pinned).slice(0, 4);
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

    logger.info('✅ Returning spaces for user', { spaceCount: spaces.length, userId, endpoint: '/api/spaces/my' });

    return respond.success({
      activeSpaces: spaces,
      pinnedSpaces,
      recentActivity,
      stats
    });
});

/**
 * Update user space preferences (pin/unpin, notifications, etc.)
 */
type UpdatePreferencesData = z.infer<typeof updateSpacePreferencesSchema>;

export const PATCH = withAuthValidationAndErrors(
  updateSpacePreferencesSchema,
  async (request: AuthenticatedRequest, context, body: UpdatePreferencesData, respond) => {
    const { spaceId, action, value } = body;
    const userId = getUserId(request);

    // Find the space's membership document
    const membershipsQuery = dbAdmin.collectionGroup('members')
      .where('userId', '==', userId)
      .limit(50);
      
    const membershipsSnapshot = await membershipsQuery.get();
    
    let membershipRef = null;
    for (const doc of membershipsSnapshot.docs) {
      const spaceIdFromRef = doc.ref.parent.parent?.id;
      if (spaceIdFromRef === spaceId) {
        membershipRef = doc.ref;
        break;
      }
    }

    if (!membershipRef) {
      return respond.error("Membership not found", "RESOURCE_NOT_FOUND", { status: 404 });
    }

    // Update membership based on action
    const updates: any = { updatedAt: new Date() };
    
    switch (action) {
      case 'pin':
        updates.pinned = true;
        break;
      case 'unpin':
        updates.pinned = false;
        break;
      case 'mark_visited':
        updates.lastVisited = new Date();
        break;
      case 'update_notifications':
        updates.notifications = value || 0;
        break;
      default:
        return respond.error("Invalid action", "INVALID_INPUT", { status: 400 });
    }

    await membershipRef.update(updates);

    logger.info('✅ Updated membership for space, action', { spaceId, action, endpoint: '/api/spaces/my' });

    return respond.success({}, {
      message: `Space ${action} successful`
    });
  }
);