import { NextRequest, NextResponse } from 'next/server';
import { collection, doc, query, where, getDocs, getDoc, orderBy, limit } from 'firebase/firestore';
import { db } from '@hive/core/server';
import { getCurrentUser } from '@hive/auth-logic';

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
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const includeActivity = searchParams.get('includeActivity') !== 'false';
    const includeStats = searchParams.get('includeStats') !== 'false';
    const timeRange = searchParams.get('timeRange') || 'week'; // week, month, all

    // Fetch user's memberships
    const membershipsQuery = query(
      collection(db, 'members'),
      where('userId', '==', user.uid),
      orderBy('lastActivity', 'desc')
    );

    const membershipsSnapshot = await getDocs(membershipsQuery);
    const memberships = membershipsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Fetch space details for each membership
    const spaceMemberships: ProfileSpaceMembership[] = await Promise.all(
      memberships.map(async (membership) => {
        try {
          const spaceDoc = await getDoc(doc(db, 'spaces', membership.spaceId));
          if (!spaceDoc.exists()) {
            return null;
          }

          const spaceData = spaceDoc.data();
          
          // Calculate activity level and recent activity
          const recentActivity = includeActivity ? 
            await getSpaceActivityForUser(user.uid, membership.spaceId, timeRange) : 
            { posts: 0, interactions: 0, toolUsage: 0, timeSpent: 0 };

          const activityLevel = calculateActivityLevel(recentActivity);

          // Get notifications count
          const notifications = await getSpaceNotifications(user.uid, membership.spaceId);

          // Get quick stats
          const quickStats = includeStats ? 
            await getSpaceQuickStats(user.uid, membership.spaceId) : 
            { myPosts: 0, myTools: 0, myInteractions: 0 };

          return {
            spaceId: membership.spaceId,
            spaceName: spaceData.name,
            spaceDescription: spaceData.description,
            spaceType: spaceData.type || 'general',
            memberCount: spaceData.memberCount || 0,
            role: membership.role || 'member',
            status: membership.status || 'active',
            joinedAt: membership.joinedAt,
            lastActivity: membership.lastActivity,
            activityLevel,
            recentActivity,
            notifications,
            quickStats
          };
        } catch (error) {
          console.error(`Error fetching space data for ${membership.spaceId}:`, error);
          return null;
        }
      })
    );

    // Filter out null results
    const validSpaceMemberships = spaceMemberships.filter(Boolean) as ProfileSpaceMembership[];

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
    console.error('Error fetching space memberships:', error);
    return NextResponse.json({ error: 'Failed to fetch space memberships' }, { status: 500 });
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
    const activityQuery = query(
      collection(db, 'activityEvents'),
      where('userId', '==', userId),
      where('spaceId', '==', spaceId),
      where('date', '>=', startDateStr),
      where('date', '<=', endDateStr)
    );

    const activitySnapshot = await getDocs(activityQuery);
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
    console.error('Error getting space activity:', error);
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
    // This would be implemented when notification system is built
    // For now, return mock data
    return {
      unreadCount: Math.floor(Math.random() * 5),
      hasImportantUpdates: Math.random() > 0.7
    };
  } catch (error) {
    console.error('Error getting space notifications:', error);
    return { unreadCount: 0, hasImportantUpdates: false };
  }
}

// Helper function to get quick stats
async function getSpaceQuickStats(userId: string, spaceId: string) {
  try {
    // Get user's posts in this space
    const postsQuery = query(
      collection(db, 'posts'),
      where('authorId', '==', userId),
      where('spaceId', '==', spaceId)
    );
    const postsSnapshot = await getDocs(postsQuery);
    const myPosts = postsSnapshot.docs.length;

    // Get user's tools deployed in this space
    const toolsQuery = query(
      collection(db, 'deployedTools'),
      where('creatorId', '==', userId),
      where('spaceId', '==', spaceId)
    );
    const toolsSnapshot = await getDocs(toolsQuery);
    const myTools = toolsSnapshot.docs.length;

    // Get user's interactions in this space (simplified)
    const interactionsQuery = query(
      collection(db, 'activityEvents'),
      where('userId', '==', userId),
      where('spaceId', '==', spaceId),
      where('type', '==', 'social_interaction'),
      limit(100) // Limit for performance
    );
    const interactionsSnapshot = await getDocs(interactionsQuery);
    const myInteractions = interactionsSnapshot.docs.length;

    return {
      myPosts,
      myTools,
      myInteractions
    };
  } catch (error) {
    console.error('Error getting quick stats:', error);
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