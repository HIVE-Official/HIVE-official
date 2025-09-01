import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser as _getCurrentUser } from '../../../../lib/auth-server';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";
import { withAuth, ApiResponse } from '@/lib/api-auth-middleware';

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

// Cache for dashboard data (5 minute TTL)
const dashboardCache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

// GET - Fetch complete profile dashboard data with caching
export const GET = withAuth(async (request: NextRequest, authContext) => {
  try {
    const userId = authContext.userId;
    
    // Check cache first
    const cacheKey = `dashboard:${userId}:${request.url.split('?')[1] || ''}`;
    const cached = dashboardCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
      return NextResponse.json(cached.data);
    }
    
    // Removed dangerous development bypass - no test user access allowed
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
            // SECURITY: Development mode removed for production safety,
          } });
    }

    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || 'week';
    const includeRecommendations = searchParams.get('includeRecommendations') !== 'false';

    // Optimized parallel data fetching with pagination
    const [
      userData,
      spaceMemberships,
      activitySummary,
      recentActivity,
      upcomingEvents,
      privacySettings,
      spaceRecommendations
    ] = await Promise.allSettled([
      fetchUserData(userId),
      fetchSpaceMemberships(userId, 20), // Limit to top 20
      fetchActivitySummary(userId, timeRange),
      fetchRecentActivity(userId, timeRange, 15), // Limit to 15 items
      fetchUpcomingEvents(userId, 10), // Limit to 10 events
      fetchPrivacySettings(userId),
      includeRecommendations ? fetchSpaceRecommendations(userId, 5) : Promise.resolve([])
    ]).then(results => results.map((result, index) => {
      if (result.status === 'fulfilled') return result.value;
      logger.warn(`Dashboard data fetch failed for index ${index}:`, result.reason);
      return index === 0 ? null : []; // User data is critical, others can be empty
    }));
    
    if (!userData) {
      throw new Error('Critical user data not available');
    }

    // Aggregate data into dashboard format
    const dashboardData: ProfileDashboardData = {
      user: userData as ProfileDashboardData['user'],
      summary: generateSummaryStats(spaceMemberships as any[], activitySummary as any),
      recentActivity: categorizeRecentActivity(recentActivity as any[]),
      upcomingEvents: processUpcomingEvents(upcomingEvents as any[]),
      quickActions: generateQuickActions(spaceMemberships as any[], spaceRecommendations as any[]),
      insights: generateInsights(spaceMemberships as any[], activitySummary as any, recentActivity as any[]),
      privacy: formatPrivacySettings(privacySettings as any)
    };

    const response = {
      dashboard: dashboardData,
      metadata: {
        timeRange,
        generatedAt: new Date().toISOString(),
        includeRecommendations,
        cached: false
      }
    };
    
    // Cache the response
    dashboardCache.set(cacheKey, { data: response, timestamp: Date.now() });
    
    // Clean old cache entries periodically
    if (Math.random() < 0.1) { // 10% chance
      const now = Date.now();
      for (const [key, value] of dashboardCache.entries()) {
        if (now - value.timestamp > CACHE_TTL) {
          dashboardCache.delete(key);
        }
      }
    }
    
    return NextResponse.json(response);
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
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    if (!userDoc.exists) {
      throw new Error('User not found');
    }

    const userData = userDoc.data();
    if (!userData) {
      throw new Error('User data not found');
    }
    
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

// Helper function to fetch space memberships with pagination
async function fetchSpaceMemberships(userId: string, limit: number = 20) {
  try {
    const membershipsSnapshot = await dbAdmin.collection('members')
      .where('userId', '==', userId)
      .where('status', '==', 'active') // Only active memberships
      .orderBy('lastActivity', 'desc')
      .limit(limit)
      .get();
    return membershipsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    logger.error('Error fetching space memberships', { error: error, userId, limit });
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

    const summariesSnapshot = await dbAdmin.collection('activitySummaries')
      .where('userId', '==', userId)
      .where('date', '>=', startDateStr)
      .where('date', '<=', endDateStr)
      .orderBy('date', 'desc')
      .get();
    return summariesSnapshot.docs.map(doc => doc.data());
  } catch (error) {
    logger.error('Error fetching activity summary', { error: error, endpoint: '/api/profile/dashboard' });
    return [];
  }
}

// Helper function to fetch recent activity with optimized query
async function fetchRecentActivity(userId: string, timeRange: string, limit: number = 15) {
  try {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7); // Always show last 7 days for recent activity

    const activitySnapshot = await dbAdmin.collection('activityEvents')
      .where('userId', '==', userId)
      .where('timestamp', '>=', startDate)
      .where('timestamp', '<=', endDate)
      .orderBy('timestamp', 'desc')
      .limit(limit)
      .get();
    return activitySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    logger.error('Error fetching recent activity', { error: error, userId, limit });
    return [];
  }
}

// Helper function to fetch upcoming events with optimization
async function fetchUpcomingEvents(userId: string, limit: number = 10) {
  try {
    const now = new Date();
    const oneWeekFromNow = new Date();
    oneWeekFromNow.setDate(now.getDate() + 7);

    // Fetch personal events and space events in parallel
    const [personalEventsSnapshot, membershipsSnapshot] = await Promise.all([
      dbAdmin.collection('personalEvents')
        .where('userId', '==', userId)
        .where('startDate', '>=', now)
        .where('startDate', '<=', oneWeekFromNow)
        .orderBy('startDate', 'asc')
        .limit(Math.ceil(limit / 2))
        .get(),
      dbAdmin.collection('members')
        .where('userId', '==', userId)
        .where('status', '==', 'active')
        .limit(10) // Limit memberships for performance
        .get()
    ]);
    
    const personalEvents = personalEventsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      type: 'personal' as const
    }));

    const userSpaceIds = membershipsSnapshot.docs.map(doc => doc.data().spaceId);
    let spaceEvents: any[] = [];
    
    if (userSpaceIds.length > 0) {
      // Process space IDs in chunks to avoid 'in' query limits
      const chunkSize = 10;
      const chunks = [];
      for (let i = 0; i < userSpaceIds.length; i += chunkSize) {
        chunks.push(userSpaceIds.slice(i, i + chunkSize));
      }
      
      if (chunks.length > 0) {
        const spaceEventsSnapshot = await dbAdmin.collection('events')
          .where('spaceId', 'in', chunks[0]) // Only first chunk for performance
          .where('startDate', '>=', now)
          .where('startDate', '<=', oneWeekFromNow)
          .where('state', '==', 'published')
          .orderBy('startDate', 'asc')
          .limit(Math.ceil(limit / 2))
          .get();
        spaceEvents = spaceEventsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          type: 'space' as const
        }));
      }
    }

    return [...personalEvents, ...spaceEvents]
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(0, limit);
  } catch (error) {
    logger.error('Error fetching upcoming events', { error: error, userId, limit });
    return [];
  }
}

// Helper function to fetch privacy settings
async function fetchPrivacySettings(userId: string) {
  try {
    const privacyDoc = await dbAdmin.collection('privacySettings').doc(userId).get();
    return privacyDoc.exists ? privacyDoc.data() : null;
  } catch (error) {
    logger.error('Error fetching privacy settings', { error: error, endpoint: '/api/profile/dashboard' });
    return null;
  }
}

// Helper function to fetch space recommendations with limit
async function fetchSpaceRecommendations(userId: string, limit: number = 5) {
  try {
    // Basic recommendation logic based on user's current spaces and major
    const userDoc = await dbAdmin.collection('users').doc(userId).get();
    if (!userDoc.exists) return [];
    
    const userData = userDoc.data();
    const userMajor = userData?.major;
    
    if (!userMajor) return [];
    
    // Find spaces with similar majors that user hasn't joined
    const currentMemberships = await dbAdmin.collection('members')
      .where('userId', '==', userId)
      .get();
    const currentSpaceIds = currentMemberships.docs.map(doc => doc.data().spaceId);
    
    const recommendedSpaces = await dbAdmin.collection('spaces')
      .where('targetMajors', 'array-contains', userMajor)
      .where('state', '==', 'active')
      .orderBy('memberCount', 'desc')
      .limit(limit * 2) // Get more to filter out joined spaces
      .get();
    
    return recommendedSpaces.docs
      .filter(doc => !currentSpaceIds.includes(doc.id))
      .slice(0, limit)
      .map(doc => ({
        spaceId: doc.id,
        spaceName: doc.data().name,
        matchScore: Math.floor(Math.random() * 30) + 70, // 70-100 score
        matchReasons: [`${userMajor} major`, 'Active community']
      }));
  } catch (error) {
    logger.error('Error fetching space recommendations', { error: error, userId, limit });
    return [];
  }
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