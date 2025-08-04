import { NextRequest, NextResponse } from 'next/server';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";
import { withAuth } from '@/lib/api-auth-middleware';
import { dbAdmin } from '@/lib/firebase-admin';

// Space Analytics interfaces
interface SpaceAnalytics {
  spaceId: string;
  spaceName: string;
  spaceType: string;
  
  membershipData: {
    totalMembers: number;
    activeMembers: number;
    newMembers: number;
    churnMembers: number;
    memberGrowthRate: number;
    averageEngagement: number;
  };
  
  contentData: {
    totalPosts: number;
    postsThisWeek: number;
    averageEngagement: number;
    topContentTypes: Array<{ type: string; count: number; engagement: number }>;
    contentGrowthRate: number;
    moderationQueue: number;
  };
  
  eventData: {
    totalEvents: number;
    upcomingEvents: number;
    averageAttendance: number;
    eventCompletionRate: number;
    topEventTypes: Array<{ type: string; count: number; avgAttendance: number }>;
  };
  
  toolData: {
    totalTools: number;
    activeTools: number;
    toolUsage: number;
    topTools: Array<{ name: string; usage: number; satisfaction: number }>;
  };
  
  healthMetrics: {
    overallHealth: number;
    engagementTrend: 'up' | 'down' | 'stable';
    alerts: Array<{ type: 'warning' | 'critical' | 'info'; message: string }>;
    recommendations: Array<{ priority: 'high' | 'medium' | 'low'; action: string }>;
  };
  
  timeSeriesData: {
    memberGrowth: Array<{ date: string; members: number; active: number }>;
    contentActivity: Array<{ date: string; posts: number; engagement: number }>;
    eventAttendance: Array<{ date: string; events: number; attendance: number }>;
  };
  
  lastUpdated: string;
}

// GET - Fetch space analytics (leaders and moderators only)
export const GET = withAuth(async (request: NextRequest, authContext, { params }) => {
  try {
    const spaceId = params.spaceId;
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '30d';
    
    // Verify user has analytics access to this space
    const hasAccess = await verifyAnalyticsAccess(authContext.userId, spaceId);
    if (!hasAccess) {
      return NextResponse.json(
        ApiResponseHelper.error("Insufficient permissions to view space analytics", "FORBIDDEN"), 
        { status: HttpStatus.FORBIDDEN }
      );
    }

    // For development mode, return comprehensive mock analytics
    if (process.env.NODE_ENV !== 'production') {
      const mockAnalytics: SpaceAnalytics = generateMockAnalytics(spaceId, timeRange);
      
      logger.info('✅ Development mode: Returning mock space analytics', { 
        spaceId,
        timeRange,
        endpoint: '/api/spaces/[spaceId]/analytics' 
      });
      
      return NextResponse.json({
        success: true,
        analytics: mockAnalytics,
        metadata: {
          timeRange,
          generatedAt: new Date().toISOString(),
          developmentMode: true
        }
      });
    }
    
    // Production implementation would fetch real analytics from Firebase
    // For now, return empty state for production
    return NextResponse.json({
      success: true,
      analytics: null,
      message: 'Space analytics not yet implemented for production'
    });
    
  } catch (error) {
    logger.error('Error fetching space analytics', { 
      error: error, 
      spaceId: params.spaceId,
      endpoint: '/api/spaces/[spaceId]/analytics' 
    });
    return NextResponse.json(
      ApiResponseHelper.error("Failed to fetch space analytics", "INTERNAL_ERROR"), 
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }
}, { 
  allowDevelopmentBypass: true,
  operation: 'get_space_analytics' 
});

// Helper function to verify analytics access
async function verifyAnalyticsAccess(userId: string, spaceId: string): Promise<boolean> {
  try {
    // Check if user is a member of the space and has analytics permissions
    const memberDoc = await dbAdmin
      .collection('spaces')
      .doc(spaceId)
      .collection('members')
      .doc(userId)
      .get();
    
    if (!memberDoc.exists) {
      return false; // Not a member
    }
    
    const memberData = memberDoc.data();
    const role = memberData?.role;
    
    // Allow access for moderators, admins, and owners
    return ['moderator', 'admin', 'owner'].includes(role);
  } catch (error) {
    logger.error('Error verifying analytics access:', error);
    return false;
  }
}

// Helper function to generate realistic mock analytics
function generateMockAnalytics(spaceId: string, timeRange: string): SpaceAnalytics {
  const spaceName = getSpaceName(spaceId);
  const spaceType = getSpaceType(spaceId);
  
  // Generate realistic numbers based on space type
  const baseMembers = spaceType === 'course' ? 120 : spaceType === 'housing' ? 45 : 30;
  const activityMultiplier = spaceType === 'course' ? 1.2 : spaceType === 'housing' ? 0.8 : 1.0;
  
  // Calculate time-based metrics
  const daysInRange = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : 90;
  const newMembers = Math.round(baseMembers * 0.15 * (daysInRange / 30));
  const churnMembers = Math.round(newMembers * 0.3);
  const activeMembers = Math.round(baseMembers * 0.6 * activityMultiplier);
  
  // Generate alerts and recommendations
  const alerts: SpaceAnalytics['healthMetrics']['alerts'] = [];
  const recommendations: SpaceAnalytics['healthMetrics']['recommendations'] = [];
  
  // Generate contextual alerts
  if (activeMembers / baseMembers < 0.4) {
    alerts.push({ 
      type: 'warning', 
      message: 'Member engagement is below average. Consider hosting an event.' 
    });
    recommendations.push({
      priority: 'high',
      action: 'Plan an interactive event to boost member engagement'
    });
  }
  
  if (spaceType === 'course' && Math.random() > 0.7) {
    alerts.push({ 
      type: 'info', 
      message: 'Midterm period detected. Study groups are highly active.' 
    });
  }
  
  const totalPosts = Math.round(baseMembers * 2.5 * activityMultiplier);
  const postsThisWeek = Math.round(totalPosts * 0.2);
  
  // Generate time series data
  const memberGrowth = generateTimeSeriesData(daysInRange, baseMembers, activeMembers);
  const contentActivity = generateContentTimeSeriesData(daysInRange, postsThisWeek * 4);
  const eventAttendance = generateEventTimeSeriesData(daysInRange);
  
  return {
    spaceId,
    spaceName,
    spaceType,
    
    membershipData: {
      totalMembers: baseMembers,
      activeMembers,
      newMembers,
      churnMembers,
      memberGrowthRate: Math.round(((newMembers - churnMembers) / baseMembers) * 100),
      averageEngagement: Math.round(60 + (Math.random() * 30))
    },
    
    contentData: {
      totalPosts,
      postsThisWeek,
      averageEngagement: Math.round(45 + (Math.random() * 30)),
      topContentTypes: generateTopContentTypes(spaceType),
      contentGrowthRate: Math.round((Math.random() - 0.5) * 40),
      moderationQueue: Math.round(Math.random() * 5)
    },
    
    eventData: {
      totalEvents: Math.round(baseMembers * 0.3),
      upcomingEvents: Math.round(Math.random() * 8),
      averageAttendance: Math.round(60 + (Math.random() * 25)),
      eventCompletionRate: Math.round(85 + (Math.random() * 10)),
      topEventTypes: generateTopEventTypes(spaceType)
    },
    
    toolData: {
      totalTools: Math.round(5 + (Math.random() * 15)),
      activeTools: Math.round(3 + (Math.random() * 8)),
      toolUsage: Math.round(baseMembers * 50 * activityMultiplier),
      topTools: generateTopTools(spaceType)
    },
    
    healthMetrics: {
      overallHealth: Math.round(65 + (Math.random() * 30)),
      engagementTrend: ['up', 'down', 'stable'][Math.floor(Math.random() * 3)] as any,
      alerts,
      recommendations
    },
    
    timeSeriesData: {
      memberGrowth,
      contentActivity,
      eventAttendance
    },
    
    lastUpdated: new Date().toISOString()
  };
}

// Helper functions for mock data generation
function getSpaceName(spaceId: string): string {
  const names = {
    'space-cs350': 'CS 350 - Data Structures',
    'space-gov3': 'Governors Hall Floor 3',
    'space-debate': 'Debate Club',
    'space-premed': 'Pre-Med Society'
  };
  return names[spaceId as keyof typeof names] || 'Unknown Space';
}

function getSpaceType(spaceId: string): string {
  if (spaceId.includes('cs') || spaceId.includes('premed')) return 'course';
  if (spaceId.includes('gov') || spaceId.includes('hall')) return 'housing';
  return 'interest';
}

function generateTopContentTypes(spaceType: string) {
  const courseTypes = [
    { type: 'study_help', count: 45, engagement: 78 },
    { type: 'assignment_discussion', count: 32, engagement: 65 },
    { type: 'lecture_notes', count: 28, engagement: 82 },
    { type: 'tool_generated', count: 15, engagement: 88 }
  ];
  
  const housingTypes = [
    { type: 'social_coordination', count: 35, engagement: 72 },
    { type: 'maintenance_requests', count: 18, engagement: 45 },
    { type: 'event_planning', count: 22, engagement: 85 },
    { type: 'tool_generated', count: 8, engagement: 90 }
  ];
  
  const interestTypes = [
    { type: 'discussion', count: 40, engagement: 68 },
    { type: 'event_announcement', count: 25, engagement: 75 },
    { type: 'resource_sharing', count: 20, engagement: 82 },
    { type: 'tool_generated', count: 12, engagement: 85 }
  ];
  
  switch (spaceType) {
    case 'course': return courseTypes;
    case 'housing': return housingTypes;
    default: return interestTypes;
  }
}

function generateTopEventTypes(spaceType: string) {
  const courseTypes = [
    { type: 'study_session', count: 12, avgAttendance: 75 },
    { type: 'review_session', count: 8, avgAttendance: 82 },
    { type: 'project_meetup', count: 5, avgAttendance: 68 }
  ];
  
  const housingTypes = [
    { type: 'floor_meeting', count: 6, avgAttendance: 65 },
    { type: 'social_event', count: 10, avgAttendance: 78 },
    { type: 'maintenance_update', count: 4, avgAttendance: 45 }
  ];
  
  const interestTypes = [
    { type: 'regular_meeting', count: 8, avgAttendance: 70 },
    { type: 'workshop', count: 6, avgAttendance: 85 },
    { type: 'social_gathering', count: 10, avgAttendance: 72 }
  ];
  
  switch (spaceType) {
    case 'course': return courseTypes;
    case 'housing': return housingTypes;
    default: return interestTypes;
  }
}

function generateTopTools(spaceType: string) {
  const courseTools = [
    { name: 'Study Schedule Optimizer', usage: 450, satisfaction: 88 },
    { name: 'Assignment Tracker', usage: 320, satisfaction: 82 },
    { name: 'Grade Calculator', usage: 280, satisfaction: 85 }
  ];
  
  const housingTools = [
    { name: 'Laundry Tracker', usage: 280, satisfaction: 92 },
    { name: 'Meal Coordination', usage: 195, satisfaction: 78 },
    { name: 'Event Planner', usage: 150, satisfaction: 85 }
  ];
  
  const interestTools = [
    { name: 'Meeting Scheduler', usage: 180, satisfaction: 80 },
    { name: 'Resource Library', usage: 120, satisfaction: 88 },
    { name: 'Discussion Summarizer', usage: 95, satisfaction: 75 }
  ];
  
  switch (spaceType) {
    case 'course': return courseTools;
    case 'housing': return housingTools;
    default: return interestTools;
  }
}

function generateTimeSeriesData(days: number, totalMembers: number, activeMembers: number) {
  const data = [];
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Add some realistic variance
    const memberVariance = Math.round((Math.random() - 0.5) * 10);
    const activeVariance = Math.round((Math.random() - 0.5) * 15);
    
    data.push({
      date: date.toISOString().split('T')[0],
      members: Math.max(0, totalMembers + memberVariance),
      active: Math.max(0, activeMembers + activeVariance)
    });
  }
  return data;
}

function generateContentTimeSeriesData(days: number, totalPosts: number) {
  const data = [];
  const postsPerDay = totalPosts / days;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Weekend effect - less activity on weekends
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const weekendMultiplier = isWeekend ? 0.3 : 1.0;
    
    const posts = Math.round(postsPerDay * weekendMultiplier * (0.5 + Math.random()));
    const engagement = Math.round(40 + (Math.random() * 40));
    
    data.push({
      date: date.toISOString().split('T')[0],
      posts,
      engagement
    });
  }
  return data;
}

function generateEventTimeSeriesData(days: number) {
  const data = [];
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Random events - more likely on certain days
    const events = Math.random() > 0.7 ? Math.round(Math.random() * 3) : 0;
    const attendance = events > 0 ? Math.round(50 + (Math.random() * 40)) : 0;
    
    data.push({
      date: date.toISOString().split('T')[0],
      events,
      attendance
    });
  }
  return data;
}