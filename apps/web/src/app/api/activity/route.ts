import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/server-auth';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

// Activity tracking types
interface ActivityEvent {
  id?: string;
  userId: string;
  type: 'space_visit' | 'tool_interaction' | 'content_creation' | 'social_interaction' | 'session_start' | 'session_end';
  spaceId?: string;
  toolId?: string;
  contentId?: string;
  duration?: number; // in seconds
  metadata?: Record<string, any>;
  timestamp: string;
  date: string; // YYYY-MM-DD for daily aggregation
}

interface ActivitySummary {
  userId: string;
  date: string;
  totalTimeSpent: number; // in minutes
  spacesVisited: string[];
  toolsUsed: string[];
  contentCreated: number;
  socialInteractions: number;
  peakActivityHour: number;
  sessionCount: number;
  createdAt: string;
  updatedAt: string;
}

// POST - Log activity event
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const body = await request.json();
    const { type, spaceId, toolId, contentId, duration, metadata } = body;

    // Validate required fields
    if (!type || !['space_visit', 'tool_interaction', 'content_creation', 'social_interaction', 'session_start', 'session_end'].includes(type)) {
      return NextResponse.json(ApiResponseHelper.error("Invalid activity type", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    const now = new Date();
    const activityEvent: ActivityEvent = {
      userId: user.uid,
      type,
      spaceId: spaceId || undefined,
      toolId: toolId || undefined,
      contentId: contentId || undefined,
      duration: duration || undefined,
      metadata: metadata || {},
      timestamp: now.toISOString(),
      date: now.toISOString().split('T')[0]
    };

    // Log the activity event
    const docRef = await dbAdmin.collection('activityEvents').add(activityEvent);

    // Update daily summary asynchronously
    updateDailySummary(user.uid, activityEvent);

    return NextResponse.json({ 
      success: true, 
      eventId: docRef.id,
      timestamp: activityEvent.timestamp 
    });
  } catch (error) {
    logger.error('Error logging activity', { error: error, endpoint: '/api/activity' });
    return NextResponse.json(ApiResponseHelper.error("Failed to log activity", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// GET - Fetch activity analytics
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || 'week'; // week, month, all
    const includeDetails = searchParams.get('includeDetails') === 'true';

    // Calculate date range
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

    // Fetch daily summaries
    const summariesQuery = dbAdmin.collection('activitySummaries')
      .where('userId', '==', user.uid)
      .where('date', '>=', startDateStr)
      .where('date', '<=', endDateStr)
      .orderBy('date', 'desc');

    const summariesSnapshot = await summariesQuery.get();
    const summaries = summariesSnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data()
    })) as ActivitySummary[];

    // Generate analytics
    const analytics = generateAnalytics(summaries, timeRange);

    let detailEvents: any[] = [];
    if (includeDetails) {
      // Fetch recent activity events for details
      const eventsQuery = dbAdmin.collection('activityEvents')
        .where('userId', '==', user.uid)
        .where('date', '>=', startDateStr)
        .where('date', '<=', endDateStr)
        .orderBy('timestamp', 'desc')
        .limit(100);

      const eventsSnapshot = await eventsQuery.get();
      detailEvents = eventsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    }

    return NextResponse.json({
      analytics,
      summaries,
      detailEvents,
      timeRange,
      dateRange: {
        start: startDateStr,
        end: endDateStr
      }
    });
  } catch (error) {
    logger.error('Error fetching activity analytics', { error: error, endpoint: '/api/activity' });
    return NextResponse.json(ApiResponseHelper.error("Failed to fetch activity analytics", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to update daily summary
async function updateDailySummary(userId: string, event: ActivityEvent) {
  try {
    const summaryId = `${userId}_${event.date}`;
    const summaryRef = dbAdmin.collection('activitySummaries').doc(summaryId);
    
    // Get existing summary or create new one
    const summaryDoc = await summaryRef.get();
    
    if (summaryDoc.exists) {
      const existingData = summaryDoc.data() as ActivitySummary;
      
      // Update existing summary
      const updatedData: Partial<ActivitySummary> = {
        totalTimeSpent: existingData.totalTimeSpent + (event.duration ? Math.round(event.duration / 60) : 0),
        spacesVisited: event.spaceId && !existingData.spacesVisited.includes(event.spaceId) 
          ? [...existingData.spacesVisited, event.spaceId]
          : existingData.spacesVisited,
        toolsUsed: event.toolId && !existingData.toolsUsed.includes(event.toolId)
          ? [...existingData.toolsUsed, event.toolId]
          : existingData.toolsUsed,
        contentCreated: event.type === 'content_creation' 
          ? existingData.contentCreated + 1 
          : existingData.contentCreated,
        socialInteractions: event.type === 'social_interaction'
          ? existingData.socialInteractions + 1
          : existingData.socialInteractions,
        sessionCount: event.type === 'session_start'
          ? existingData.sessionCount + 1
          : existingData.sessionCount,
        updatedAt: new Date().toISOString()
      };

      await summaryRef.update(updatedData);
    } else {
      // Create new summary
      const newSummary: ActivitySummary = {
        userId,
        date: event.date,
        totalTimeSpent: event.duration ? Math.round(event.duration / 60) : 0,
        spacesVisited: event.spaceId ? [event.spaceId] : [],
        toolsUsed: event.toolId ? [event.toolId] : [],
        contentCreated: event.type === 'content_creation' ? 1 : 0,
        socialInteractions: event.type === 'social_interaction' ? 1 : 0,
        peakActivityHour: new Date(event.timestamp).getHours(),
        sessionCount: event.type === 'session_start' ? 1 : 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      await summaryRef.set(newSummary);
    }
  } catch (error) {
    logger.error('Error updating daily summary', { error: error, endpoint: '/api/activity' });
  }
}

// Helper function to generate analytics insights
function generateAnalytics(summaries: ActivitySummary[], timeRange: string) {
  if (summaries.length === 0) {
    return {
      totalTimeSpent: 0,
      averageSessionTime: 0,
      mostActiveDay: null,
      peakActivityHour: null,
      totalSpaces: 0,
      totalTools: 0,
      contentCreated: 0,
      socialInteractions: 0,
      insights: ['No activity data available for this period']
    };
  }

  const totalTimeSpent = summaries.reduce((sum, s) => sum + s.totalTimeSpent, 0);
  const totalSessions = summaries.reduce((sum, s) => sum + s.sessionCount, 0);
  const averageSessionTime = totalSessions > 0 ? Math.round(totalTimeSpent / totalSessions) : 0;

  // Find most active day
  const mostActiveDay = summaries.reduce((max, current) => 
    current.totalTimeSpent > max.totalTimeSpent ? current : max
  );

  // Find peak activity hour
  const hourCounts: Record<number, number> = {};
  summaries.forEach(s => {
    hourCounts[s.peakActivityHour] = (hourCounts[s.peakActivityHour] || 0) + 1;
  });
  const peakActivityHour = Object.entries(hourCounts).reduce((max, [hour, count]) => 
    count > max.count ? { hour: parseInt(hour), count } : max, 
    { hour: 0, count: 0 }
  ).hour;

  // Unique spaces and tools
  const allSpaces = new Set(summaries.flatMap(s => s.spacesVisited));
  const allTools = new Set(summaries.flatMap(s => s.toolsUsed));

  const totalContentCreated = summaries.reduce((sum, s) => sum + s.contentCreated, 0);
  const totalSocialInteractions = summaries.reduce((sum, s) => sum + s.socialInteractions, 0);

  // Generate insights
  const insights = generateInsights({
    totalTimeSpent,
    averageSessionTime,
    mostActiveDay,
    peakActivityHour,
    totalSpaces: allSpaces.size,
    totalTools: allTools.size,
    contentCreated: totalContentCreated,
    socialInteractions: totalSocialInteractions,
    timeRange
  });

  return {
    totalTimeSpent,
    averageSessionTime,
    mostActiveDay: mostActiveDay.date,
    peakActivityHour,
    totalSpaces: allSpaces.size,
    totalTools: allTools.size,
    contentCreated: totalContentCreated,
    socialInteractions: totalSocialInteractions,
    insights
  };
}

// Helper function to generate insights
function generateInsights(data: any): string[] {
  const insights: string[] = [];
  
  const hours = Math.floor(data.totalTimeSpent / 60);
  const minutes = data.totalTimeSpent % 60;
  
  if (hours > 0) {
    insights.push(`You've spent ${hours}h ${minutes}m on HIVE this ${data.timeRange}`);
  } else {
    insights.push(`You've spent ${minutes} minutes on HIVE this ${data.timeRange}`);
  }

  if (data.averageSessionTime > 0) {
    insights.push(`Your average session is ${data.averageSessionTime} minutes`);
  }

  if (data.peakActivityHour !== null) {
    const timeFormat = data.peakActivityHour === 0 ? '12 AM' : 
                      data.peakActivityHour < 12 ? `${data.peakActivityHour} AM` :
                      data.peakActivityHour === 12 ? '12 PM' : 
                      `${data.peakActivityHour - 12} PM`;
    insights.push(`You're most active around ${timeFormat}`);
  }

  if (data.totalSpaces > 0) {
    insights.push(`You've engaged with ${data.totalSpaces} space${data.totalSpaces > 1 ? 's' : ''}`);
  }

  if (data.totalTools > 0) {
    insights.push(`You've used ${data.totalTools} different tool${data.totalTools > 1 ? 's' : ''}`);
  }

  if (data.contentCreated > 0) {
    insights.push(`You've created ${data.contentCreated} piece${data.contentCreated > 1 ? 's' : ''} of content`);
  }

  if (data.socialInteractions > 0) {
    insights.push(`You've had ${data.socialInteractions} social interaction${data.socialInteractions > 1 ? 's' : ''}`);
  }

  return insights;
}