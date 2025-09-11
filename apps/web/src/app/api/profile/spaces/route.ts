import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/auth-server';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

// Internal membership data structure
interface MembershipData {
  id: string;
  role: string;
  status: string;
  joinedAt: string;
  lastActivity: string;
  [key: string]: any;
}

// Space membership interface for profile
interface ProfileSpaceMembership {
  spaceId: string;
  spaceName: string;
  spaceDescription?: string;
  spaceType: string;
  memberCount: number;
  role: 'member' | 'moderator' | 'admin' | 'builder';
  status: 'active' | 'inactive' | 'pending';
  joinedAt: string;
  lastActivity: string;
  activityLevel: 'high' | 'medium' | 'low';
  recentActivity: {
    posts: number;
    interactions: number;
    toolUsage: number;
    timeSpent: number; // in minutes
  };
  notifications: {
    unreadCount: number;
    hasImportantUpdates: boolean;
  };
  quickStats: {
    myPosts: number;
    myTools: number;
    myInteractions: number;
  };
}

// Space activity summary
interface SpaceActivitySummary {
  totalSpaces: number;
  activeSpaces: number;
  totalTimeSpent: number;
  favoriteSpace: {
    spaceId: string;
    spaceName: string;
    timeSpent: number;
  } | null;
  activityDistribution: {
    spaceId: string;
    spaceName: string;
    percentage: number;
    timeSpent: number;
  }[];
  weeklyTrend: {
    week: string;
    activeSpaces: number;
    totalTime: number;
  }[];
}

// GET - Fetch user's space memberships for profile
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const includeActivity = searchParams.get('includeActivity') !== 'false';
    const includeStats = searchParams.get('includeStats') !== 'false';
    const timeRange = searchParams.get('timeRange') || 'week'; // week, month, all

    // Fetch user's memberships
    const membershipsSnapshot = await dbAdmin.collection('members')
      .where('userId', '==', user.uid)
      .orderBy('lastActivity', 'desc')
      .get();
    const memberships: MembershipData[] = membershipsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: data.spaceId || doc.id, // Use spaceId from data or fallback to doc id
        role: data.role || 'member',
        status: data.status || 'active',
        joinedAt: data.joinedAt || new Date().toISOString(),
        lastActivity: data.lastActivity || new Date().toISOString(),
        ...data
      };
    });

    // Fetch space details for each membership
    const spaceMemberships: (ProfileSpaceMembership | null)[] = await Promise.all(
      memberships.map(async (membership: any) => {
        try {
          const spaceDoc = await dbAdmin.collection('spaces').doc(membership.id).get();
          if (!spaceDoc.exists) {
            return null;
          }

          const spaceData = spaceDoc.data();
          if (!spaceData) {
            return null;
          }
          
          // Calculate activity level and recent activity
          const recentActivity = includeActivity ? 
            await getSpaceActivityForUser(user.uid, membership.id, timeRange) : 
            { posts: 0, interactions: 0, toolUsage: 0, timeSpent: 0 };

          const activityLevel = calculateActivityLevel(recentActivity);

          // Get notifications count
          const notifications = await getSpaceNotifications(user.uid, membership.id);

          // Get quick stats
          const quickStats = includeStats ? 
            await getSpaceQuickStats(user.uid, membership.id) : 
            { myPosts: 0, myTools: 0, myInteractions: 0 };

          return {
            spaceId: membership.id,
            spaceName: spaceData.name || 'Unknown Space',
            spaceDescription: spaceData.description || '',
            spaceType: spaceData.type || 'general',
            memberCount: spaceData.memberCount || 0,
            role: (membership.role || 'member') as 'member' | 'moderator' | 'admin' | 'builder',
            status: (membership.status || 'active') as 'active' | 'inactive' | 'pending',
            joinedAt: membership.joinedAt || new Date().toISOString(),
            lastActivity: membership.lastActivity || new Date().toISOString(),
            activityLevel,
            recentActivity,
            notifications,
            quickStats
          };
        } catch (error) {
          logger.error('Error fetching space data for', { spaceId: membership.id, error: error, endpoint: '/api/profile/spaces' });
          return null;
        }
      })
    );

    // Filter out null results - ensure type safety
    const validSpaceMemberships = spaceMemberships.filter((membership): membership is ProfileSpaceMembership => membership !== null);

    // Generate activity summary
    const activitySummary = includeActivity ? 
      generateSpaceActivitySummary(validSpaceMemberships, timeRange) : 
      null;

    return NextResponse.json({
      memberships: validSpaceMemberships,
      activitySummary,
      totalCount: validSpaceMemberships.length,
      activeCount: validSpaceMemberships.filter(m => m.status === 'active').length,
      timeRange
    });
  } catch (error) {
    logger.error('Error fetching space memberships', { error: error, endpoint: '/api/profile/spaces' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch space memberships", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to get space activity for user
async function getSpaceActivityForUser(userId: string, spaceId: string, timeRange: string) {
  try {
    const endDate = new Date();
    const startDate = new Date();
    
    switch (timeRange) {
      case 'week':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(endDate.getMonth() - 1);
        break;
      case 'all':
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
    }

    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    // Get activity events for this space
    const activitySnapshot = await dbAdmin.collection('activityEvents')
      .where('userId', '==', userId)
      .where('spaceId', '==', spaceId)
      .where('date', '>=', startDateStr)
      .where('date', '<=', endDateStr)
      .get();
    const activities = activitySnapshot.docs.map(doc => doc.data());

    // Aggregate activity data
    const recentActivity = {
      posts: activities.filter(a => a.type === 'content_creation').length,
      interactions: activities.filter(a => a.type === 'social_interaction').length,
      toolUsage: activities.filter(a => a.type === 'tool_interaction').length,
      timeSpent: activities.reduce((sum, a) => sum + (a.duration ? Math.round(a.duration / 60) : 0), 0)
    };

    return recentActivity;
  } catch (error) {
    logger.error('Error getting space activity', { error: error, endpoint: '/api/profile/spaces' });
    return { posts: 0, interactions: 0, toolUsage: 0, timeSpent: 0 };
  }
}

// Helper function to calculate activity level
function calculateActivityLevel(activity: any): 'high' | 'medium' | 'low' {
  const totalActivity = activity.posts + activity.interactions + activity.toolUsage;
  const timeSpent = activity.timeSpent;

  if (totalActivity >= 10 || timeSpent >= 60) {
    return 'high';
  } else if (totalActivity >= 3 || timeSpent >= 20) {
    return 'medium';
  } else {
    return 'low';
  }
}

// Helper function to get space notifications
async function getSpaceNotifications(userId: string, spaceId: string) {
  try {
    // Get real unread notifications for this user in this space
    const notificationsSnapshot = await dbAdmin
      .collection('users')
      .doc(userId)
      .collection('notifications')
      .where('spaceId', '==', spaceId)
      .where('read', '==', false)
      .get();
    
    const importantSnapshot = await dbAdmin
      .collection('users')
      .doc(userId)
      .collection('notifications')
      .where('spaceId', '==', spaceId)
      .where('priority', '==', 'high')
      .where('read', '==', false)
      .get();
    
    return {
      unreadCount: notificationsSnapshot.size,
      hasImportantUpdates: importantSnapshot.size > 0
    };
  } catch (error) {
    logger.error('Error getting space notifications', { error: error, endpoint: '/api/profile/spaces' });
    // Return zeros if collection doesn't exist yet
    return { unreadCount: 0, hasImportantUpdates: false };
  }
}

// Helper function to get quick stats
async function getSpaceQuickStats(userId: string, spaceId: string) {
  try {
    // Get user's posts in this space
    const postsSnapshot = await dbAdmin.collection('posts')
      .where('authorId', '==', userId)
      .where('spaceId', '==', spaceId)
      .get();
    const myPosts = postsSnapshot.docs.length;

    // Get user's tools deployed in this space
    const toolsSnapshot = await dbAdmin.collection('deployedTools')
      .where('creatorId', '==', userId)
      .where('spaceId', '==', spaceId)
      .get();
    const myTools = toolsSnapshot.docs.length;

    // Get user's interactions in this space (simplified)
    const interactionsSnapshot = await dbAdmin.collection('activityEvents')
      .where('userId', '==', userId)
      .where('spaceId', '==', spaceId)
      .where('type', '==', 'social_interaction')
      .limit(100) // Limit for performance
      .get();
    const myInteractions = interactionsSnapshot.docs.length;

    return {
      myPosts,
      myTools,
      myInteractions
    };
  } catch (error) {
    logger.error('Error getting quick stats', { error: error, endpoint: '/api/profile/spaces' });
    return { myPosts: 0, myTools: 0, myInteractions: 0 };
  }
}

// Helper function to generate space activity summary
function generateSpaceActivitySummary(memberships: ProfileSpaceMembership[], timeRange: string): SpaceActivitySummary {
  const totalSpaces = memberships.length;
  const activeSpaces = memberships.filter(m => m.activityLevel !== 'low').length;
  const totalTimeSpent = memberships.reduce((sum, m) => sum + m.recentActivity.timeSpent, 0);

  // Find favorite space (most time spent)
  const favoriteSpace = memberships.length > 0 ? 
    memberships.reduce((max, current) => 
      current.recentActivity.timeSpent > max.recentActivity.timeSpent ? current : max
    ) : null;

  // Calculate activity distribution
  const activityDistribution = memberships
    .filter(m => m.recentActivity.timeSpent > 0)
    .map(m => ({
      spaceId: m.spaceId,
      spaceName: m.spaceName,
      percentage: totalTimeSpent > 0 ? Math.round((m.recentActivity.timeSpent / totalTimeSpent) * 100) : 0,
      timeSpent: m.recentActivity.timeSpent
    }))
    .sort((a, b) => b.timeSpent - a.timeSpent);

  // Generate weekly trend (simplified - would need more complex logic for real data)
  const weeklyTrend = generateWeeklyTrend(memberships, timeRange);

  return {
    totalSpaces,
    activeSpaces,
    totalTimeSpent,
    favoriteSpace: favoriteSpace ? {
      spaceId: favoriteSpace.spaceId,
      spaceName: favoriteSpace.spaceName,
      timeSpent: favoriteSpace.recentActivity.timeSpent
    } : null,
    activityDistribution,
    weeklyTrend
  };
}

// Helper function to generate weekly trend
function generateWeeklyTrend(memberships: ProfileSpaceMembership[], timeRange: string) {
  // This is a simplified version - in reality, you'd query historical data
  const weeks = [];
  const weeksToShow = timeRange === 'month' ? 4 : timeRange === 'week' ? 1 : 12;
  
  for (let i = weeksToShow - 1; i >= 0; i--) {
    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - (i * 7));
    
    weeks.push({
      week: weekStart.toISOString().split('T')[0],
      activeSpaces: Math.max(1, memberships.filter(m => m.activityLevel !== 'low').length - i),
      totalTime: Math.max(0, memberships.reduce((sum, m) => sum + m.recentActivity.timeSpent, 0) - (i * 10))
    });
  }
  
  return weeks;
}

// Development mock data functions
function getMockSpaceMemberships(): ProfileSpaceMembership[] {
  return [
    {
      spaceId: 'space-1',
      spaceName: 'CS Majors',
      spaceDescription: 'Computer Science students community',
      spaceType: 'academic',
      memberCount: 234,
      role: 'member',
      status: 'active',
      joinedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      activityLevel: 'high',
      recentActivity: {
        posts: 5,
        interactions: 12,
        toolUsage: 3,
        timeSpent: 45
      },
      notifications: {
        unreadCount: 2,
        hasImportantUpdates: true
      },
      quickStats: {
        myPosts: 8,
        myTools: 1,
        myInteractions: 23
      }
    },
    {
      spaceId: 'space-2',
      spaceName: 'Study Groups',
      spaceDescription: 'Collaborative study sessions',
      spaceType: 'academic',
      memberCount: 89,
      role: 'moderator',
      status: 'active',
      joinedAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      lastActivity: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      activityLevel: 'medium',
      recentActivity: {
        posts: 3,
        interactions: 8,
        toolUsage: 2,
        timeSpent: 30
      },
      notifications: {
        unreadCount: 1,
        hasImportantUpdates: false
      },
      quickStats: {
        myPosts: 12,
        myTools: 2,
        myInteractions: 18
      }
    },
    {
      spaceId: 'space-3',
      spaceName: 'Campus Events',
      spaceDescription: 'University activities and events',
      spaceType: 'community',
      memberCount: 456,
      role: 'member',
      status: 'active',
      joinedAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
      lastActivity: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      activityLevel: 'high',
      recentActivity: {
        posts: 1,
        interactions: 15,
        toolUsage: 1,
        timeSpent: 25
      },
      notifications: {
        unreadCount: 3,
        hasImportantUpdates: true
      },
      quickStats: {
        myPosts: 4,
        myTools: 0,
        myInteractions: 31
      }
    },
    {
      spaceId: 'space-4',
      spaceName: 'Dorm Floor 3',
      spaceDescription: 'Third floor residents',
      spaceType: 'housing',
      memberCount: 32,
      role: 'member',
      status: 'active',
      joinedAt: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000).toISOString(),
      lastActivity: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      activityLevel: 'medium',
      recentActivity: {
        posts: 2,
        interactions: 6,
        toolUsage: 0,
        timeSpent: 15
      },
      notifications: {
        unreadCount: 0,
        hasImportantUpdates: false
      },
      quickStats: {
        myPosts: 6,
        myTools: 0,
        myInteractions: 12
      }
    }
  ];
}

function getMockActivitySummary(): SpaceActivitySummary {
  return {
    totalSpaces: 4,
    activeSpaces: 3,
    totalTimeSpent: 115,
    favoriteSpace: {
      spaceId: 'space-1',
      spaceName: 'CS Majors',
      timeSpent: 45
    },
    activityDistribution: [
      {
        spaceId: 'space-1',
        spaceName: 'CS Majors',
        percentage: 39,
        timeSpent: 45
      },
      {
        spaceId: 'space-2',
        spaceName: 'Study Groups',
        percentage: 26,
        timeSpent: 30
      },
      {
        spaceId: 'space-3',
        spaceName: 'Campus Events',
        percentage: 22,
        timeSpent: 25
      },
      {
        spaceId: 'space-4',
        spaceName: 'Dorm Floor 3',
        percentage: 13,
        timeSpent: 15
      }
    ],
    weeklyTrend: [
      {
        week: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        activeSpaces: 2,
        totalTime: 80
      },
      {
        week: new Date().toISOString().split('T')[0],
        activeSpaces: 3,
        totalTime: 115
      }
    ]
  };
}