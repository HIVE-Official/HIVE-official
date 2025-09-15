import { NextRequest, NextResponse } from 'next/server';
import { dbAdmin as adminDb } from '@/lib/firebase/admin/firebase-admin';
import { getCurrentUser } from '@/lib/auth/providers/auth-server';
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api/response-types/api-response-types";

interface AnalyticsQuery {
  toolId: string;
  startDate?: string;
  endDate?: string;
  granularity?: 'hour' | 'day' | 'week' | 'month';
  metrics?: string[];
  groupBy?: string[];
}

interface ToolAnalytics {
  overview: {
    totalUsage: number;
    uniqueUsers: number;
    averageSessionDuration: number;
    totalInstallations: number;
    activeInstallations: number;
    averageRating: number;
    totalReviews: number;
    conversionRate: number;
  };
  usage: {
    timeSeriesData: Array<{
      date: string;
      usage: number;
      uniqueUsers: number;
      sessionDuration: number;
    }>;
    topActions: Array<{
      action: string;
      count: number;
      percentage: number;
    }>;
    topSpaces: Array<{
      spaceId: string;
      spaceName: string;
      usage: number;
      users: number;
    }>;
  };
  performance: {
    averageLoadTime: number;
    errorRate: number;
    crashRate: number;
    popularFeatures: Array<{
      feature: string;
      usage: number;
      retention: number;
    }>;
  };
  audience: {
    userRetention: {
      day1: number;
      day7: number;
      day30: number;
    };
    demographics: {
      byUserType: Array<{ type: string; count: number; percentage: number; }>;
      byInstitution: Array<{ institution: string; count: number; percentage: number; }>;
      byGeoLocation: Array<{ location: string; count: number; percentage: number; }>;
    };
    engagementMetrics: {
      averageSessionsPerUser: number;
      averageTimePerSession: number;
      bounceRate: number;
    };
  };
  revenue: {
    totalRevenue: number;
    monthlyRecurringRevenue: number;
    averageRevenuePerUser: number;
    lifetimeValue: number;
    churnRate: number;
  };
}

// GET - Get tool analytics
export async function GET(request: NextRequest, { params }: { params: Promise<{ toolId: string }> }) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { toolId } = await params;
    const { searchParams } = new URL(request.url);
    
    // Get tool details and check ownership
    const toolDoc = await adminDb.collection('tools').doc(toolId).get();
    if (!toolDoc.exists) {
      return NextResponse.json(ApiResponseHelper.error("Tool not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
    }

    const toolData = toolDoc.data();
    
    // Check permissions (owner, or admin)
    const userDoc = await adminDb.collection('users').doc(user.uid).get();
    const userData = userDoc.data();
    const isAdmin = userData?.roles?.includes('admin');
    
    if (toolData?.ownerId !== user.uid && !isAdmin) {
      return NextResponse.json(ApiResponseHelper.error("Insufficient permissions to view analytics", "FORBIDDEN"), { status: HttpStatus.FORBIDDEN });
    }

    const startDate = searchParams.get('startDate') || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    const endDate = searchParams.get('endDate') || new Date().toISOString();
    const granularity = (searchParams.get('granularity') as any) || 'day';

    // Generate analytics data
    const analytics = await generateToolAnalytics({
      toolId,
      startDate,
      endDate,
      granularity
    });

    return NextResponse.json({
      toolId,
      toolName: toolData?.name,
      period: { startDate, endDate, granularity },
      analytics,
      generatedAt: new Date().toISOString()
    });

  } catch (error) {
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch analytics", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to generate analytics data
async function generateToolAnalytics(query: AnalyticsQuery): Promise<ToolAnalytics> {
  const { toolId, startDate, endDate } = query;

  // Get usage events
  const usageEventsSnapshot = await adminDb
    .collection('analytics_events')
    .where('toolId', '==', toolId)
    .where('timestamp', '>=', startDate)
    .where('timestamp', '<=', endDate)
    .orderBy('timestamp', 'desc')
    .get();

  const usageEvents = usageEventsSnapshot.docs.map(doc => doc.data());

  // Get installations
  const installationsSnapshot = await adminDb
    .collection('toolInstallations')
    .where('toolId', '==', toolId)
    .get();

  const installations = installationsSnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as { id: string; status?: string; [key: string]: any }));

  // Get reviews
  const reviewsSnapshot = await adminDb
    .collection('toolReviews')
    .where('toolId', '==', toolId)
    .where('status', '==', 'published')
    .get();

  const reviews = reviewsSnapshot.docs.map(doc => doc.data());

  // Calculate overview metrics
  const totalUsage = usageEvents.filter(e => e.eventType === 'tool_interaction').length;
  const uniqueUsers = new Set(usageEvents.map(e => e.userId)).size;
  const sessionEvents = usageEvents.filter(e => e.duration);
  const averageSessionDuration = sessionEvents.length > 0 
    ? sessionEvents.reduce((sum, e) => sum + (e.duration || 0), 0) / sessionEvents.length 
    : 0;
  const totalInstallations = installations.length;
  const activeInstallations = installations.filter(i => i.status === 'active').length;
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
    : 0;

  // Calculate time series data
  const timeSeriesData = generateTimeSeries(usageEvents, query.granularity || 'day');

  // Calculate top actions
  const actionCounts = usageEvents
    .filter(e => e.metadata?.action)
    .reduce((acc, e) => {
      const action = e.metadata.action;
      acc[action] = (acc[action] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

  const topActions = Object.entries(actionCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([action, count]) => ({
      action,
      count,
      percentage: (count / totalUsage) * 100
    }));

  // Calculate top spaces
  const spaceCounts = usageEvents
    .filter(e => e.spaceId)
    .reduce((acc, e) => {
      const spaceId = e.spaceId;
      if (!acc[spaceId]) {
        acc[spaceId] = { usage: 0, users: new Set() };
      }
      acc[spaceId].usage++;
      acc[spaceId].users.add(e.userId);
      return acc;
    }, {} as Record<string, { usage: number; users: Set<string> }>);

  const topSpaces = await Promise.all(
    Object.entries(spaceCounts)
      .sort(([, a], [, b]) => b.usage - a.usage)
      .slice(0, 10)
      .map(async ([spaceId, data]) => {
        const spaceDoc = await adminDb.collection('spaces').doc(spaceId).get();
        const spaceName = spaceDoc.exists ? spaceDoc.data()?.name : 'Unknown Space';
        
        return {
          spaceId,
          spaceName,
          usage: data.usage,
          users: data.users.size
        };
      })
  );

  // Calculate performance metrics
  const performanceEvents = usageEvents.filter(e => e.metadata?.loadTime || e.metadata?.error);
  const loadTimes = performanceEvents
    .filter(e => e.metadata?.loadTime)
    .map(e => e.metadata.loadTime);
  const averageLoadTime = loadTimes.length > 0
    ? loadTimes.reduce((sum, time) => sum + time, 0) / loadTimes.length
    : 0;
  
  const errorEvents = usageEvents.filter(e => e.metadata?.error);
  const errorRate = totalUsage > 0 ? (errorEvents.length / totalUsage) * 100 : 0;

  // Calculate user retention
  const userRetention = calculateUserRetention(usageEvents);

  // Calculate demographics
  const demographics = await calculateDemographics(usageEvents);

  // Calculate engagement metrics
  const userSessions = usageEvents.reduce((acc, e) => {
    if (!acc[e.userId]) {
      acc[e.userId] = [];
    }
    acc[e.userId].push(e);
    return acc;
  }, {} as Record<string, any[]>);

  const averageSessionsPerUser = Object.keys(userSessions).length > 0
    ? Object.values(userSessions).reduce((sum, sessions) => sum + sessions.length, 0) / Object.keys(userSessions).length
    : 0;

  const sessionsWithDuration = Object.values(userSessions)
    .flat()
    .filter(e => e.duration);
  const averageTimePerSession = sessionsWithDuration.length > 0
    ? sessionsWithDuration.reduce((sum, e) => sum + (e.duration || 0), 0) / sessionsWithDuration.length
    : 0;

  return {
    overview: {
      totalUsage,
      uniqueUsers,
      averageSessionDuration,
      totalInstallations,
      activeInstallations,
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews,
      conversionRate: totalInstallations > 0 ? (activeInstallations / totalInstallations) * 100 : 0
    },
    usage: {
      timeSeriesData,
      topActions,
      topSpaces
    },
    performance: {
      averageLoadTime: Math.round(averageLoadTime),
      errorRate: Math.round(errorRate * 100) / 100,
      crashRate: 0, // TODO: Implement crash tracking
      popularFeatures: [] // TODO: Implement feature tracking
    },
    audience: {
      userRetention,
      demographics,
      engagementMetrics: {
        averageSessionsPerUser: Math.round(averageSessionsPerUser * 10) / 10,
        averageTimePerSession: Math.round(averageTimePerSession),
        bounceRate: 0 // TODO: Calculate bounce rate
      }
    },
    revenue: {
      totalRevenue: 0, // TODO: Implement revenue tracking
      monthlyRecurringRevenue: 0,
      averageRevenuePerUser: 0,
      lifetimeValue: 0,
      churnRate: 0
    }
  };
}

// Helper function to generate time series data
function generateTimeSeries(events: any[], granularity: string) {
  const groupedData = events.reduce((acc, event) => {
    const date = new Date(event.timestamp);
    let key: string;
    
    switch (granularity) {
      case 'hour':
        key = date.toISOString().substring(0, 13) + ':00:00.000Z';
        break;
      case 'week': {
        const weekStart = new Date(date);
        weekStart.setDate(date.getDate() - date.getDay());
        key = weekStart.toISOString().split('T')[0];
        break;
      }
      case 'month':
        key = date.toISOString().substring(0, 7) + '-01';
        break;
      default: // day
        key = date.toISOString().split('T')[0];
    }

    if (!acc[key]) {
      acc[key] = {
        date: key,
        usage: 0,
        uniqueUsers: new Set(),
        sessionDurations: []
      };
    }

    acc[key].usage++;
    acc[key].uniqueUsers.add(event.userId);
    if (event.duration) {
      acc[key].sessionDurations.push(event.duration);
    }

    return acc;
  }, {} as Record<string, any>);

  return Object.values(groupedData)
    .map((data: any) => ({
      date: data.date,
      usage: data.usage,
      uniqueUsers: data.uniqueUsers.size,
      sessionDuration: data.sessionDurations.length > 0
        ? data.sessionDurations.reduce((sum: number, d: number) => sum + d, 0) / data.sessionDurations.length
        : 0
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

// Helper function to calculate user retention
function calculateUserRetention(events: any[]) {
  const userFirstUsage = events.reduce((acc, event) => {
    if (!acc[event.userId] || new Date(event.timestamp) < new Date(acc[event.userId])) {
      acc[event.userId] = event.timestamp;
    }
    return acc;
  }, {} as Record<string, string>);

  const userLastUsage = events.reduce((acc, event) => {
    if (!acc[event.userId] || new Date(event.timestamp) > new Date(acc[event.userId])) {
      acc[event.userId] = event.timestamp;
    }
    return acc;
  }, {} as Record<string, string>);

  const now = new Date();
  const totalUsers = Object.keys(userFirstUsage).length;

  if (totalUsers === 0) {
    return { day1: 0, day7: 0, day30: 0 };
  }

  const day1Retention = Object.entries(userFirstUsage)
    .filter(([userId, firstUsage]) => {
      const firstDate = new Date(firstUsage as string);
      const lastDate = new Date(userLastUsage[userId]);
      const daysDiff = (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff >= 1;
    }).length;

  const day7Retention = Object.entries(userFirstUsage)
    .filter(([userId, firstUsage]) => {
      const firstDate = new Date(firstUsage as string);
      const lastDate = new Date(userLastUsage[userId]);
      const daysDiff = (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff >= 7;
    }).length;

  const day30Retention = Object.entries(userFirstUsage)
    .filter(([userId, firstUsage]) => {
      const firstDate = new Date(firstUsage as string);
      const lastDate = new Date(userLastUsage[userId]);
      const daysDiff = (lastDate.getTime() - firstDate.getTime()) / (1000 * 60 * 60 * 24);
      return daysDiff >= 30;
    }).length;

  return {
    day1: Math.round((day1Retention / totalUsers) * 100),
    day7: Math.round((day7Retention / totalUsers) * 100),
    day30: Math.round((day30Retention / totalUsers) * 100)
  };
}

// Helper function to calculate demographics
async function calculateDemographics(events: any[]) {
  const uniqueUsers = [...new Set(events.map(e => e.userId))];
  
  // Get user details
  const userPromises = uniqueUsers.map(async (userId: any) => {
    const userDoc = await adminDb.collection('users').doc(userId).get();
    return userDoc.exists ? { id: userId, ...userDoc.data() } : null;
  });

  const users = (await Promise.all(userPromises)).filter(Boolean) as Array<{ id: string; userType?: string; institution?: string; [key: string]: any }>;

  // Calculate by user type
  const userTypeCounts = users.reduce((acc, user) => {
    const type = user?.userType || 'unknown';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const byUserType = Object.entries(userTypeCounts).map(([type, count]) => ({
    type,
    count,
    percentage: Math.round((count / users.length) * 100)
  }));

  // Calculate by institution
  const institutionCounts = users.reduce((acc, user) => {
    const institution = user?.institution || 'unknown';
    acc[institution] = (acc[institution] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const byInstitution = Object.entries(institutionCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([institution, count]) => ({
      institution,
      count,
      percentage: Math.round((count / users.length) * 100)
    }));

  return {
    byUserType,
    byInstitution,
    byGeoLocation: [] // TODO: Implement geo tracking
  };
}