import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser } from '../../../../lib/auth-server';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { withAuth, ApiResponse } from '@/lib/api-auth-middleware';
import { doc, getDoc, collection, query, where, orderBy, getDocs, limit } from 'firebase-admin/firestore';

// Profile dashboard data interface
interface ProfileDashboardData {
  user: {
    id: string;
    name: string;
    handle: string;
    email: string;
    profilePhotoUrl?: string;
    major?: string;
    academicYear?: string;
    interests: string[];
    joinedAt: string;
    lastActive: string;
  };
  summary: {
    totalSpaces: number;
    activeSpaces: number;
    favoriteSpaces: number;
    totalTimeSpent: number;
    weeklyActivity: number;
    contentCreated: number;
    toolsUsed: number;
    socialInteractions: number;
  };
  recentActivity: {
    spaces: Array<{
      spaceId: string;
      spaceName: string;
      action: string;
      timestamp: string;
      duration?: number;
    }>;
    tools: Array<{
      toolId: string;
      toolName?: string;
      action: string;
      timestamp: string;
      spaceId?: string;
    }>;
    social: Array<{
      type: string;
      description: string;
      timestamp: string;
      spaceId?: string;
    }>;
  };
  upcomingEvents: Array<{
    id: string;
    title: string;
    startDate: string;
    endDate: string;
    type: 'personal' | 'space';
    spaceId?: string;
    spaceName?: string;
    isToday: boolean;
    isUpcoming: boolean;
  }>;
  quickActions: {
    favoriteSpaces: Array<{
      spaceId: string;
      spaceName: string;
      unreadCount: number;
      lastActivity: string;
    }>;
    pinnedSpaces: Array<{
      spaceId: string;
      spaceName: string;
      unreadCount: number;
      lastActivity: string;
    }>;
    recommendations: Array<{
      spaceId: string;
      spaceName: string;
      matchScore: number;
      matchReasons: string[];
    }>;
  };
  insights: {
    peakActivityTime: string;
    mostActiveSpace: {
      spaceId: string;
      spaceName: string;
      timeSpent: number;
    } | null;
    weeklyGoal: {
      target: number;
      current: number;
      percentage: number;
    };
    streaks: {
      currentStreak: number;
      longestStreak: number;
      type: 'daily_activity' | 'content_creation' | 'tool_usage';
    };
  };
  privacy: {
    ghostMode: {
      enabled: boolean;
      level: string;
    };
    visibility: {
      profileVisible: boolean;
      activityVisible: boolean;
      onlineStatus: boolean;
    };
  };
}

// GET - Fetch complete profile dashboard data
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    
    // For development mode only, return mock dashboard data
    if ((userId === 'test-user' || userId === 'dev_user_123') && process.env.NODE_ENV !== 'production') {
      const mockDashboard = {
          user: {
            id: userId,
            name: 'Dev User',
            handle: 'devuser',
            email: 'dev@hive.com',
            profilePhotoUrl: '',
            major: 'Computer Science',
            academicYear: 'Senior',
            interests: ['coding', 'design', 'collaboration', 'student-life'],
            joinedAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
            lastActive: new Date().toISOString(),
          },
          summary: {
            totalSpaces: 8,
            activeSpaces: 5,
            favoriteSpaces: 3,
            totalTimeSpent: 180,
            weeklyActivity: 65,
            contentCreated: 12,
            toolsUsed: 15,
            socialInteractions: 42,
          },
          recentActivity: {
            spaces: [
              {
                spaceId: 'cs_study_group',
                spaceName: 'CS Study Group',
                action: 'visited',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                duration: 45,
              },
              {
                spaceId: 'math_tutoring', 
                spaceName: 'Math Tutoring',
                action: 'visited',
                timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
                duration: 30,
              },
              {
                spaceId: 'debate_club',
                spaceName: 'Debate Club',
                action: 'visited', 
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                duration: 60,
              }
            ],
            tools: [
              {
                toolId: 'gpa_calculator',
                toolName: 'GPA Calculator',
                action: 'used',
                timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
                spaceId: 'cs_study_group',
              },
              {
                toolId: 'study_planner',
                toolName: 'Study Planner',
                action: 'used',
                timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
                spaceId: 'math_tutoring',
              }
            ],
            social: [
              {
                type: 'comment',
                description: 'Commented on study tips post',
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                spaceId: 'cs_study_group',
              },
              {
                type: 'reaction',
                description: 'Liked a practice problem solution',
                timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
                spaceId: 'math_tutoring',
              }
            ],
          },
          upcomingEvents: [
            {
              id: 'study_session_1',
              title: 'Data Structures Study Session',
              startDate: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
              endDate: new Date(Date.now() + 5 * 60 * 60 * 1000).toISOString(),
              type: 'space' as const,
              spaceId: 'cs_study_group',
              spaceName: 'CS Study Group',
              isToday: true,
              isUpcoming: true,
            },
            {
              id: 'debate_practice',
              title: 'Debate Practice Session',
              startDate: new Date(Date.now() + 86400000).toISOString(),
              endDate: new Date(Date.now() + 90000000).toISOString(),
              type: 'space' as const,
              spaceId: 'debate_club',
              spaceName: 'Debate Club',
              isToday: false,
              isUpcoming: true,
            }
          ],
          quickActions: {
            favoriteSpaces: [
              {
                spaceId: 'cs_study_group',
                spaceName: 'CS Study Group',
                unreadCount: 5,
                lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
              },
              {
                spaceId: 'math_tutoring',
                spaceName: 'Math Tutoring',
                unreadCount: 2,
                lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
              }
            ],
            pinnedSpaces: [
              {
                spaceId: 'debate_club',
                spaceName: 'Debate Club',
                unreadCount: 1,
                lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
              }
            ],
            recommendations: [
              {
                spaceId: 'ai_research_club',
                spaceName: 'AI Research Club',
                matchScore: 92,
                matchReasons: ['Computer Science major', 'Machine learning interest'],
              },
              {
                spaceId: 'startup_incubator',
                spaceName: 'Startup Incubator',
                matchScore: 78,
                matchReasons: ['Builder profile', 'Innovation focus'],
              }
            ],
          },
          insights: {
            peakActivityTime: '2 PM',
            mostActiveSpace: {
              spaceId: 'cs_study_group',
              spaceName: 'CS Study Group',
              timeSpent: 120,
            },
            weeklyGoal: {
              target: 180,
              current: 140,
              percentage: 78,
            },
            streaks: {
              currentStreak: 7,
              longestStreak: 21,
              type: 'daily_activity' as const,
            },
          },
          privacy: {
            ghostMode: {
              enabled: false,
              level: 'normal',
            },
            visibility: {
              profileVisible: true,
              activityVisible: true,
              onlineStatus: true,
            },
          },
        };

        return NextResponse.json({
          dashboard: mockDashboard,
          metadata: {
            timeRange: 'week',
            generatedAt: new Date().toISOString(),
            includeRecommendations: true,
            developmentMode: true,
          } });
    }

    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || 'week';
    const includeRecommendations = searchParams.get('includeRecommendations') !== 'false';

    // Fetch all data in parallel for better performance
    const [
      userData,
      spaceMemberships,
      activitySummary,
      recentActivity,
      upcomingEvents,
      privacySettings,
      spaceRecommendations
    ] = await Promise.all([
      fetchUserData(userId),
      fetchSpaceMemberships(userId),
      fetchActivitySummary(userId, timeRange),
      fetchRecentActivity(userId, timeRange),
      fetchUpcomingEvents(userId),
      fetchPrivacySettings(userId),
      includeRecommendations ? fetchSpaceRecommendations(userId) : Promise.resolve([])
    ]);

    // Aggregate data into dashboard format
    const dashboardData: ProfileDashboardData = {
      user: userData,
      summary: generateSummaryStats(spaceMemberships, activitySummary),
      recentActivity: categorizeRecentActivity(recentActivity),
      upcomingEvents: processUpcomingEvents(upcomingEvents),
      quickActions: generateQuickActions(spaceMemberships, spaceRecommendations),
      insights: generateInsights(spaceMemberships, activitySummary, recentActivity),
      privacy: formatPrivacySettings(privacySettings)
    };

    return NextResponse.json({
      dashboard: dashboardData,
      metadata: {
        timeRange,
        generatedAt: new Date().toISOString(),
        includeRecommendations
      }
    });
  } catch (error) {
    logger.error('Error fetching profile dashboard', { error: error, endpoint: '/api/profile/dashboard' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch profile dashboard", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}, { 
  allowDevelopmentBypass: true, // Profile dashboard viewing is safe for development  
  operation: 'get_profile_dashboard' 
});

// Helper function to fetch user data
async function fetchUserData(userId: string) {
  try {
    const userDoc = await getDoc(doc(dbAdmin, 'users', userId));
    if (!userDoc.exists) {
      throw new Error('User not found');
    }

    const userData = userDoc.data();
    return {
      id: userId,
      name: userData.name || '',
      handle: userData.handle || '',
      email: userData.email || '',
      profilePhotoUrl: userData.profilePhotoUrl,
      major: userData.major,
      academicYear: userData.academicYear,
      interests: userData.interests || [],
      joinedAt: userData.createdAt || new Date().toISOString(),
      lastActive: userData.lastActive || new Date().toISOString()
    };
  } catch (error) {
    logger.error('Error fetching user data', { error: error, endpoint: '/api/profile/dashboard' });
    throw error;
  }
}

// Helper function to fetch space memberships
async function fetchSpaceMemberships(userId: string) {
  try {
    const membershipsQuery = dbAdmin.collection(
      dbAdmin.collection('members'),
      where('userId', '==', userId),
      orderBy('lastActivity', 'desc')
    );

    const membershipsSnapshot = await getDocs(membershipsQuery);
    return membershipsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    logger.error('Error fetching space memberships', { error: error, endpoint: '/api/profile/dashboard' });
    return [];
  }
}

// Helper function to fetch activity summary
async function fetchActivitySummary(userId: string, timeRange: string) {
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

    const summariesQuery = dbAdmin.collection(
      dbAdmin.collection('activitySummaries'),
      where('userId', '==', userId),
      where('date', '>=', startDateStr),
      where('date', '<=', endDateStr),
      orderBy('date', 'desc')
    );

    const summariesSnapshot = await getDocs(summariesQuery);
    return summariesSnapshot.docs.map(doc => doc.data());
  } catch (error) {
    logger.error('Error fetching activity summary', { error: error, endpoint: '/api/profile/dashboard' });
    return [];
  }
}

// Helper function to fetch recent activity
async function fetchRecentActivity(userId: string, timeRange: string) {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7); // Always show last 7 days for recent activity

    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    const activityQuery = dbAdmin.collection(
      dbAdmin.collection('activityEvents'),
      where('userId', '==', userId),
      where('date', '>=', startDateStr),
      where('date', '<=', endDateStr),
      orderBy('timestamp', 'desc'),
      limit(50)
    );

    const activitySnapshot = await getDocs(activityQuery);
    return activitySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    logger.error('Error fetching recent activity', { error: error, endpoint: '/api/profile/dashboard' });
    return [];
  }
}

// Helper function to fetch upcoming events
async function fetchUpcomingEvents(userId: string) {
  try {
    const now = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(now.getDate() + 7);

    const nowStr = now.toISOString();
    const oneWeekStr = oneWeekFromNow.toISOString();

    // Fetch personal events
    const personalEventsQuery = dbAdmin.collection(
      dbAdmin.collection('personalEvents'),
      where('userId', '==', userId),
      where('startDate', '>=', nowStr),
      where('startDate', '<=', oneWeekStr),
      orderBy('startDate', 'asc'),
      limit(10)
    );

    const personalEventsSnapshot = await getDocs(personalEventsQuery);
    const personalEvents = personalEventsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      type: 'personal' as const
    }));

    // Fetch space events from user's memberships
    const membershipsQuery = dbAdmin.collection(
      dbAdmin.collection('members'),
      where('userId', '==', userId),
      where('status', '==', 'active')
    );

    const membershipsSnapshot = await getDocs(membershipsQuery);
    const userSpaceIds = membershipsSnapshot.docs.map(doc => doc.data().spaceId);

    let spaceEvents = [];
    if (userSpaceIds.length > 0) {
      const spaceEventsQuery = dbAdmin.collection(
        dbAdmin.collection('events'),
        where('spaceId', 'in', userSpaceIds.slice(0, 10)), // Limit for performance
        where('startDate', '>=', nowStr),
        where('startDate', '<=', oneWeekStr),
        where('state', '==', 'published'),
        orderBy('startDate', 'asc'),
        limit(10)
      );

      const spaceEventsSnapshot = await getDocs(spaceEventsQuery);
      spaceEvents = spaceEventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        type: 'space' as const
      }));
    }

    return [...personalEvents, ...spaceEvents]
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(0, 15);
  } catch (error) {
    logger.error('Error fetching upcoming events', { error: error, endpoint: '/api/profile/dashboard' });
    return [];
  }
}

// Helper function to fetch privacy settings
async function fetchPrivacySettings(userId: string) {
  try {
    const privacyDoc = await getDoc(doc(dbAdmin, 'privacySettings', userId));
    return privacyDoc.exists ? privacyDoc.data() : null;
  } catch (error) {
    logger.error('Error fetching privacy settings', { error: error, endpoint: '/api/profile/dashboard' });
    return null;
  }
}

// Helper function to fetch space recommendations
async function fetchSpaceRecommendations(userId: string) {
  // This would call the recommendations API internally
  // For now, return empty array - would be implemented when recommendations API is integrated
  // TODO: Implement actual recommendations logic
  return [];
}

// Helper function to generate summary stats
function generateSummaryStats(memberships: any[], activitySummary: any[]) {
  const activeSpaces = memberships.filter(m => m.status === 'active').length;
  const favoriteSpaces = memberships.filter(m => m.isFavorite).length;
  
  const totalTimeSpent = activitySummary.reduce((sum, s) => sum + (s.totalTimeSpent || 0), 0);
  const weeklyActivity = activitySummary.slice(0, 7).reduce((sum, s) => sum + (s.totalTimeSpent || 0), 0);
  const contentCreated = activitySummary.reduce((sum, s) => sum + (s.contentCreated || 0), 0);
  const toolsUsed = new Set(activitySummary.flatMap(s => s.toolsUsed || [])).size;
  const socialInteractions = activitySummary.reduce((sum, s) => sum + (s.socialInteractions || 0), 0);

  return {
    totalSpaces: memberships.length,
    activeSpaces,
    favoriteSpaces,
    totalTimeSpent,
    weeklyActivity,
    contentCreated,
    toolsUsed,
    socialInteractions
  };
}

// Helper function to categorize recent activity
function categorizeRecentActivity(activities: any[]) {
  const spaces = activities
    .filter(a => a.type === 'space_visit')
    .slice(0, 5)
    .map(a => ({
      spaceId: a.spaceId,
      spaceName: a.spaceName || 'Unknown Space',
      action: 'visited',
      timestamp: a.timestamp,
      duration: a.duration
    }));

  const tools = activities
    .filter(a => a.type === 'tool_interaction')
    .slice(0, 5)
    .map(a => ({
      toolId: a.toolId,
      toolName: a.toolName || 'Unknown Tool',
      action: 'used',
      timestamp: a.timestamp,
      spaceId: a.spaceId
    }));

  const social = activities
    .filter(a => a.type === 'social_interaction')
    .slice(0, 5)
    .map(a => ({
      type: a.metadata?.action || 'interaction',
      description: generateSocialDescription(a),
      timestamp: a.timestamp,
      spaceId: a.spaceId
    }));

  return { spaces, tools, social };
}

// Helper function to generate social description
function generateSocialDescription(activity: any): string {
  const action = activity.metadata?.action || 'interaction';
  const spaceId = activity.spaceId;
  
  switch (action) {
    case 'page_view':
      return `Viewed ${activity.metadata?.page || 'page'}`;
    case 'button_click':
      return `Clicked ${activity.metadata?.buttonId || 'button'}`;
    case 'search':
      return `Searched for "${activity.metadata?.query || 'content'}"`;
    default:
      return `Had ${action} ${spaceId ? 'in space' : 'on platform'}`;
  }
}

// Helper function to process upcoming events
function processUpcomingEvents(events: any[]) {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  
  return events.map(event => ({
    id: event.id,
    title: event.title,
    startDate: event.startDate,
    endDate: event.endDate,
    type: event.type,
    spaceId: event.spaceId,
    spaceName: event.spaceName,
    isToday: event.startDate.split('T')[0] === today,
    isUpcoming: new Date(event.startDate) > now
  }));
}

// Helper function to generate quick actions
function generateQuickActions(memberships: any[], recommendations: any[]) {
  const favoriteSpaces = memberships
    .filter(m => m.isFavorite && m.status === 'active')
    .slice(0, 5)
    .map(m => ({
      spaceId: m.spaceId,
      spaceName: m.spaceName || 'Unknown Space',
      unreadCount: Math.floor(Math.random() * 5), // Mock data
      lastActivity: m.lastActivity
    }));

  const pinnedSpaces = memberships
    .filter(m => m.isPinned && m.status === 'active')
    .slice(0, 5)
    .map(m => ({
      spaceId: m.spaceId,
      spaceName: m.spaceName || 'Unknown Space',
      unreadCount: Math.floor(Math.random() * 3), // Mock data
      lastActivity: m.lastActivity
    }));

  return {
    favoriteSpaces,
    pinnedSpaces,
    recommendations: recommendations.slice(0, 3)
  };
}

// Helper function to generate insights
function generateInsights(memberships: any[], activitySummary: any[], recentActivity: any[]) {
  // Calculate peak activity time
  const hourCounts: Record<number, number> = {};
  activitySummary.forEach(s => {
    const hour = s.peakActivityHour || 12;
    hourCounts[hour] = (hourCounts[hour] || 0) + 1;
  });
  
  const peakHour = Object.entries(hourCounts).reduce((max, [hour, count]) => 
    count > max.count ? { hour: parseInt(hour), count } : max, 
    { hour: 12, count: 0 }
  ).hour;

  const peakActivityTime = peakHour === 0 ? '12 AM' : 
                          peakHour < 12 ? `${peakHour} AM` :
                          peakHour === 12 ? '12 PM' : 
                          `${peakHour - 12} PM`;

  // Find most active space
  const spaceActivity: Record<string, number> = {};
  activitySummary.forEach(s => {
    s.spacesVisited?.forEach((spaceId: string) => {
      spaceActivity[spaceId] = (spaceActivity[spaceId] || 0) + (s.totalTimeSpent || 0);
    });
  });

  const mostActiveSpaceId = Object.entries(spaceActivity).reduce((max, [spaceId, time]) => 
    time > max.time ? { spaceId, time } : max, 
    { spaceId: '', time: 0 }
  ).spaceId;

  const mostActiveSpace = mostActiveSpaceId ? {
    spaceId: mostActiveSpaceId,
    spaceName: memberships.find(m => m.spaceId === mostActiveSpaceId)?.spaceName || 'Unknown Space',
    timeSpent: spaceActivity[mostActiveSpaceId]
  } : null;

  // Calculate weekly goal progress
  const weeklyTarget = 120; // 2 hours per week
  const currentWeekTime = activitySummary.slice(0, 7).reduce((sum, s) => sum + (s.totalTimeSpent || 0), 0);
  
  return {
    peakActivityTime,
    mostActiveSpace,
    weeklyGoal: {
      target: weeklyTarget,
      current: currentWeekTime,
      percentage: Math.round((currentWeekTime / weeklyTarget) * 100)
    },
    streaks: {
      currentStreak: calculateCurrentStreak(activitySummary),
      longestStreak: calculateLongestStreak(activitySummary),
      type: 'daily_activity' as const
    }
  };
}

// Helper function to format privacy settings
function formatPrivacySettings(privacySettings: any) {
  if (!privacySettings) {
    return {
      ghostMode: { enabled: false, level: 'normal' },
      visibility: { profileVisible: true, activityVisible: true, onlineStatus: true }
    };
  }

  return {
    ghostMode: {
      enabled: privacySettings.ghostMode?.enabled || false,
      level: privacySettings.ghostMode?.level || 'normal'
    },
    visibility: {
      profileVisible: privacySettings.profileVisibility?.showToSpaceMembers !== false,
      activityVisible: !privacySettings.ghostMode?.hideActivity,
      onlineStatus: !privacySettings.ghostMode?.hideOnlineStatus
    }
  };
}

// Helper function to calculate current streak
function calculateCurrentStreak(activitySummary: any[]): number {
  let streak = 0;
  for (const summary of activitySummary) {
    if (summary.totalTimeSpent > 0) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

// Helper function to calculate longest streak
function calculateLongestStreak(activitySummary: any[]): number {
  let longestStreak = 0;
  let currentStreak = 0;
  
  for (const summary of activitySummary) {
    if (summary.totalTimeSpent > 0) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
  }
  
  return longestStreak;
}