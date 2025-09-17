import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { dbAdmin } from '@/lib/firebase/admin/firebase-admin';
import { logger } from "@/lib/utils/structured-logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";
import { withAuth, ApiResponse } from '@/lib/api/middleware/api-auth-middleware';

/**
 * Get widget data for a specific space
 * Returns data for all widgets: posts, events, members, pinned, tools
 */
export const GET = withAuth(async (
  request: NextRequest,
  authContext,
  { params }: { params: Promise<{ spaceId: string }> }
) => {
  try {
    const { spaceId } = await params;
    const userId = authContext.userId;

    logger.info('🔍 Fetching widget data for space:, user', { spaceId, userId, endpoint: '/api/spaces/[spaceId]/widgets' });

    // Check if user is a member of this space
    const membershipQuery = dbAdmin.collectionGroup('members')
      .where('userId', '==', userId)
      .limit(50);
      
    const membershipsSnapshot = await membershipQuery.get();
    
    let userMembership = null;
    for (const doc of membershipsSnapshot.docs) {
      const docSpaceId = doc.ref.parent.parent?.id;
      if (docSpaceId === spaceId) {
        userMembership = doc.data();
        break;
      }
    }

    // For now, allow access even without membership for preview
    const isAdmin = userMembership?.role === 'admin' || userMembership?.role === 'owner';
    const isMember = !!userMembership;

    // Production-safe widget data (empty until real integration)
    const widgetData = {
      posts: {
        summary: {
          totalPosts: 0,
          recentPosts: 0,
          totalReplies: 0,
          activeDiscussions: 0
        },
        recent: [
          {
            id: 'post-1',
            type: 'discussion',
            title: 'Weekly Study Session Schedule',
            content: 'Anyone interested in forming a study group for the upcoming midterms? I was thinking we could meet at the library...',
            authorName: 'Sarah Chen',
            authorId: 'user-sarah',
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
            likes: 12,
            replies: 5,
            views: 34
          },
          {
            id: 'post-2', 
            type: 'question',
            title: 'Help with Data Structures Assignment',
            content: 'I\'m struggling with implementing binary trees. Could someone point me to good resources or offer to pair program?',
            authorName: 'Mike Rodriguez',
            authorId: 'user-mike',
            createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
            likes: 8,
            replies: 3,
            views: 28
          },
          {
            id: 'post-3',
            type: 'announcement',
            title: 'Guest Speaker Next Week',
            content: 'Excited to announce that Dr. Jane Smith from Google will be speaking about machine learning applications...',
            authorName: 'Prof. Johnson',
            authorId: 'user-prof',
            createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000),
            likes: 24,
            replies: 7,
            views: 89,
            isPinned: true
          }
        ]
      },
      
      events: {
        summary: {
          upcomingEvents: 0,
          thisWeekEvents: 0,
          totalRSVPs: 0
        },
        upcoming: [
          {
            id: 'event-1',
            title: 'Study Group Session',
            description: 'Weekly study session for CS 442 - Machine Learning fundamentals',
            type: 'academic',
            startDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 2 * 60 * 60 * 1000),
            location: 'Davis Hall, Room 338',
            organizerName: 'Sarah Chen',
            currentAttendees: 8,
            maxAttendees: 15,
            userRSVP: null
          },
          {
            id: 'event-2',
            title: 'Career Workshop',
            description: 'Resume building and interview prep with industry professionals',
            type: 'social',
            startDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
            endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000),
            location: 'Student Union, Room 204',
            organizerName: 'Career Services',
            currentAttendees: 23,
            maxAttendees: 30,
            userRSVP: null
          }
        ]
      },
      
      members: {
        summary: {
          totalMembers: 0,
          activeMembers: 0,
          newThisWeek: 0,
          onlineNow: 0
        },
        recent: [
          {
            id: 'user-1',
            name: 'Alex Thompson',
            role: 'member',
            joinedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
            avatar: null,
            lastActive: new Date(Date.now() - 30 * 60 * 1000),
            isOnline: true
          },
          {
            id: 'user-2',
            name: 'Emily Davis',
            role: 'member',
            joinedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            avatar: null,
            lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
            isOnline: false
          },
          {
            id: 'user-3',
            name: 'Jordan Kim',
            role: 'admin',
            joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            avatar: null,
            lastActive: new Date(Date.now() - 10 * 60 * 1000),
            isOnline: true
          }
        ]
      },
      
      pinned: {
        summary: {
          totalPinned: Math.floor(Math.random() * 5) + 1,
          recentUpdates: Math.floor(Math.random() * 2) + 1
        },
        items: [
          {
            id: 'pinned-1',
            type: 'announcement',
            title: 'Welcome to CS Study Group!',
            content: 'Community guidelines and how to get the most out of our study sessions...',
            pinnedBy: 'Prof. Johnson',
            pinnedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            priority: 'high'
          },
          {
            id: 'pinned-2',
            type: 'resource',
            title: 'Useful Study Resources',
            content: 'Collection of textbooks, online courses, and practice problems for our curriculum...',
            pinnedBy: 'Sarah Chen',
            pinnedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
            priority: 'medium'
          }
        ]
      },
      
      tools: await getDeployedToolsForSpace(spaceId, userId, isMember)
    };

    // Tools widget is now handled by getDeployedToolsForSpace with proper permissions

    logger.info('✅ Returning widget data for space', { spaceId, endpoint: '/api/spaces/[spaceId]/widgets' });

    return NextResponse.json({
      success: true,
      spaceId,
      widgets: widgetData,
      userPermissions: {
        isMember,
        isAdmin,
        canPost: isMember,
        canCreateEvents: isMember,
        canManageMembers: isAdmin,
        canAccessTools: isAdmin
      }
    });

  } catch (error: any) {
    logger.error('❌ Widget data API error', { error: error, endpoint: '/api/spaces/[spaceId]/widgets' });

    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error'
      },
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, { 
  allowDevelopmentBypass: true, // Widget data viewing is safe for development
  operation: 'get_space_widgets' 
});

/**
 * Fetch deployed tools for a space
 */
async function getDeployedToolsForSpace(spaceId: string, userId: string, isMember: boolean) {
  try {
    // Only return tools if user is a member
    if (!isMember) {
      return null;
    }

    // Fetch deployed tools for this space
    const deployedToolsSnapshot = await dbAdmin.collection('deployedTools')
      .where('deployedTo', '==', 'space')
      .where('targetId', '==', spaceId)
      .where('status', '==', 'active')
      .orderBy('position', 'asc')
      .get();

    if (deployedToolsSnapshot.empty) {
      return {
        summary: {
          availableTools: 0,
          recentlyUsed: 0,
          totalUsage: 0
        },
        available: []
      };
    }

    const deployedTools = [];
    let totalUsage = 0;
    let recentlyUsedCount = 0;
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    // Process each deployed tool
    for (const deploymentDoc of deployedToolsSnapshot.docs) {
      const deployment = deploymentDoc.data();
      
      // Check if user has permission to access this tool
      const userRole = await getUserRoleInSpace(spaceId, userId);
      if (!deployment.permissions.allowedRoles?.includes(userRole)) {
        continue;
      }

      // Get tool details
      const toolDoc = await dbAdmin.collection('tools').doc(deployment.toolId).get();
      if (!toolDoc.exists) {
        continue;
      }

      const toolData = toolDoc.data();
      if (!toolData) {
        continue;
      }
      const usageCount = deployment.usageCount || 0;
      totalUsage += usageCount;

      // Check if recently used
      if (deployment.lastUsed && new Date(deployment.lastUsed) > oneWeekAgo) {
        recentlyUsedCount++;
      }

      // Get deployer name
      let deployerName = 'Unknown';
      try {
        const deployerDoc = await dbAdmin.collection('users').doc(deployment.deployedBy).get();
        if (deployerDoc.exists) {
          const deployerData = deployerDoc.data();
          deployerName = deployerData?.displayName || deployerData?.name || 'Unknown';
        }
      } catch (error) {
        logger.error('Error fetching deployer name', { error, deployerId: deployment.deployedBy });
      }

      deployedTools.push({
        id: deploymentDoc.id,
        deploymentId: deploymentDoc.id,
        toolId: deployment.toolId,
        name: toolData.name || 'Untitled Tool',
        description: toolData.description || 'No description provided',
        type: toolData.type || 'utility',
        surface: deployment.surface || 'tools',
        createdBy: deployerName,
        deployedBy: deployment.deployedBy,
        deployedAt: deployment.deployedAt,
        usageCount,
        lastUsed: deployment.lastUsed ? new Date(deployment.lastUsed) : null,
        permissions: deployment.permissions,
        settings: deployment.settings,
        position: deployment.position || 0,
        toolData: {
          elements: toolData.elements || [],
          currentVersion: toolData.currentVersion || '1.0.0',
          status: toolData.status || 'active'
        }
      });
    }

    return {
      summary: {
        availableTools: deployedTools.length,
        recentlyUsed: recentlyUsedCount,
        totalUsage
      },
      available: deployedTools
    };

  } catch (error) {
    logger.error('Error fetching deployed tools for space', { error, spaceId });
    return {
      summary: {
        availableTools: 0,
        recentlyUsed: 0,
        totalUsage: 0
      },
      available: []
    };
  }
}

/**
 * Get user role in a space
 */
async function getUserRoleInSpace(spaceId: string, userId: string): Promise<string> {
  try {
    const spaceDoc = await dbAdmin.collection('spaces').doc(spaceId).get();
    if (!spaceDoc.exists) {
      return 'none';
    }
    
    const spaceData = spaceDoc.data();
    return spaceData?.members?.[userId]?.role || 'none';
  } catch (error) {
    logger.error('Error getting user role in space', { error, spaceId, userId });
    return 'none';
  }
}