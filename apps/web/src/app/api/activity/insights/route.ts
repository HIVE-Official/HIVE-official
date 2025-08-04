import { NextRequest, NextResponse } from 'next/server';
// Use admin SDK methods since we're in an API route
import { dbAdmin } from '@/lib/firebase-admin';
import { getCurrentUser } from '@/lib/server-auth';
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

// Advanced insights interface
interface ActivityInsight {
  type: 'pattern' | 'achievement' | 'recommendation' | 'trend';
  title: string;
  description: string;
  value?: number;
  trend?: 'up' | 'down' | 'stable';
  confidence: number; // 0-100
  timeframe: string;
}

interface SpaceEngagement {
  spaceId: string;
  spaceName?: string;
  totalTime: number;
  visits: number;
  engagement: 'high' | 'medium' | 'low';
  preferredTime: string;
}

interface ToolUsagePattern {
  toolId: string;
  toolName?: string;
  usageCount: number;
  totalTime: number;
  efficiency: number;
  lastUsed: string;
}

// GET - Generate advanced activity insights
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json(ApiResponseHelper.error("Unauthorized", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || 'month';
    const analysisType = searchParams.get('analysisType') || 'comprehensive';

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
      case 'semester':
        startDate.setMonth(endDate.getMonth() - 4);
        break;
      case 'year':
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
    }

    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    // Fetch activity summaries
    const summariesQuery = dbAdmin.collection('activitySummaries')
      .where('userId', '==', user.uid)
      .where('date', '>=', startDateStr)
      .where('date', '<=', endDateStr)
      .orderBy('date', 'desc');

    const summariesSnapshot = await summariesQuery.get();
    const summaries = summariesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Fetch detailed events for pattern analysis
    const eventsQuery = dbAdmin.collection('activityEvents')
      .where('userId', '==', user.uid)
      .where('date', '>=', startDateStr)
      .where('date', '<=', endDateStr)
      .orderBy('timestamp', 'desc');

    const eventsSnapshot = await eventsQuery.get();
    const events = eventsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Generate comprehensive insights
    const insights = await generateAdvancedInsights(summaries, events, timeRange, analysisType);
    const spaceEngagement = analyzeSpaceEngagement(summaries, events);
    const toolUsage = analyzeToolUsage(summaries, events);
    const patterns = detectBehaviorPatterns(summaries, events);

    return NextResponse.json({
      insights,
      spaceEngagement,
      toolUsage,
      patterns,
      metadata: {
        timeRange,
        analysisType,
        dataPoints: summaries.length,
        totalEvents: events.length,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('Error generating activity insights', { error: error, endpoint: '/api/activity/insights' });
    return NextResponse.json(ApiResponseHelper.error("Failed to generate activity insights", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}

// Helper function to generate advanced insights
async function generateAdvancedInsights(summaries: any[], events: any[], timeRange: string, analysisType: string): Promise<ActivityInsight[]> {
  const insights: ActivityInsight[] = [];

  if (summaries.length === 0) {
    return [{
      type: 'recommendation',
      title: 'Start Your HIVE Journey',
      description: 'Begin engaging with spaces and tools to get personalized insights',
      confidence: 100,
      timeframe: timeRange
    }];
  }

  // Time management insights
  const totalTime = summaries.reduce((sum, s) => sum + s.totalTimeSpent, 0);
  const avgDailyTime = totalTime / summaries.length;
  
  if (avgDailyTime > 60) {
    insights.push({
      type: 'pattern',
      title: 'High Engagement',
      description: `You spend an average of ${Math.round(avgDailyTime)} minutes daily on HIVE`,
      value: avgDailyTime,
      confidence: 85,
      timeframe: timeRange
    });
  }

  // Consistency patterns
  const activeDays = summaries.filter(s => s.totalTimeSpent > 0).length;
  const consistencyRate = (activeDays / summaries.length) * 100;
  
  if (consistencyRate > 70) {
    insights.push({
      type: 'achievement',
      title: 'Consistent Engagement',
      description: `You've been active on ${Math.round(consistencyRate)}% of days`,
      value: consistencyRate,
      confidence: 90,
      timeframe: timeRange
    });
  }

  // Content creation insights
  const totalContentCreated = summaries.reduce((sum, s) => sum + s.contentCreated, 0);
  if (totalContentCreated > 0) {
    insights.push({
      type: 'achievement',
      title: 'Content Creator',
      description: `You've created ${totalContentCreated} pieces of content`,
      value: totalContentCreated,
      confidence: 95,
      timeframe: timeRange
    });
  }

  // Social interaction patterns
  const totalSocialInteractions = summaries.reduce((sum, s) => sum + s.socialInteractions, 0);
  const socialRate = totalSocialInteractions / Math.max(activeDays, 1);
  
  if (socialRate > 2) {
    insights.push({
      type: 'pattern',
      title: 'Social Butterfly',
      description: `You average ${Math.round(socialRate)} social interactions per active day`,
      value: socialRate,
      confidence: 80,
      timeframe: timeRange
    });
  }

  // Peak activity recommendations
  const hourCounts: Record<number, number> = {};
  summaries.forEach(s => {
    hourCounts[s.peakActivityHour] = (hourCounts[s.peakActivityHour] || 0) + 1;
  });
  
  const peakHour = Object.entries(hourCounts).reduce((max, [hour, count]) => 
    count > max.count ? { hour: parseInt(hour), count } : max, 
    { hour: 0, count: 0 }
  ).hour;

  const timeFormat = peakHour === 0 ? '12 AM' : 
                    peakHour < 12 ? `${peakHour} AM` :
                    peakHour === 12 ? '12 PM' : 
                    `${peakHour - 12} PM`;

  insights.push({
    type: 'recommendation',
    title: 'Optimal Activity Time',
    description: `You're most productive around ${timeFormat}`,
    confidence: 75,
    timeframe: timeRange
  });

  // Trend analysis
  if (summaries.length >= 7) {
    const recentWeek = summaries.slice(0, 7).reduce((sum, s) => sum + s.totalTimeSpent, 0);
    const previousWeek = summaries.slice(7, 14).reduce((sum, s) => sum + s.totalTimeSpent, 0);
    
    if (recentWeek > previousWeek * 1.1) {
      insights.push({
        type: 'trend',
        title: 'Increasing Engagement',
        description: 'Your activity has increased compared to the previous week',
        trend: 'up',
        confidence: 70,
        timeframe: timeRange
      });
    } else if (recentWeek < previousWeek * 0.9) {
      insights.push({
        type: 'trend',
        title: 'Decreasing Engagement',
        description: 'Your activity has decreased compared to the previous week',
        trend: 'down',
        confidence: 70,
        timeframe: timeRange
      });
    }
  }

  return insights;
}

// Helper function to analyze space engagement
function analyzeSpaceEngagement(summaries: any[], events: any[]): SpaceEngagement[] {
  const spaceData: Record<string, any> = {};

  // Aggregate space activity
  summaries.forEach(summary => {
    summary.spacesVisited.forEach((spaceId: string) => {
      if (!spaceData[spaceId]) {
        spaceData[spaceId] = {
          spaceId,
          totalTime: 0,
          visits: 0,
          hourCounts: {}
        };
      }
      spaceData[spaceId].visits += 1;
      spaceData[spaceId].totalTime += summary.totalTimeSpent / summary.spacesVisited.length;
    });
  });

  // Analyze space visit patterns
  events.forEach(event => {
    if (event.spaceId && spaceData[event.spaceId]) {
      const hour = new Date(event.timestamp).getHours();
      spaceData[event.spaceId].hourCounts[hour] = (spaceData[event.spaceId].hourCounts[hour] || 0) + 1;
    }
  });

  // Convert to SpaceEngagement array
  return Object.values(spaceData).map((data: any) => {
    const avgTime = data.totalTime / Math.max(data.visits, 1);
    const engagement = avgTime > 30 ? 'high' : avgTime > 10 ? 'medium' : 'low';
    
    const peakHour = Object.entries(data.hourCounts).reduce((max, [hour, count]) => 
      (count as number) > max.count ? { hour: parseInt(hour), count: count as number } : max, 
      { hour: 0, count: 0 }
    ).hour;

    const timeFormat = peakHour === 0 ? '12 AM' : 
                      peakHour < 12 ? `${peakHour} AM` :
                      peakHour === 12 ? '12 PM' : 
                      `${peakHour - 12} PM`;

    return {
      spaceId: data.spaceId,
      totalTime: Math.round(data.totalTime),
      visits: data.visits,
      engagement,
      preferredTime: timeFormat
    };
  }).sort((a, b) => b.totalTime - a.totalTime) as any;
}

// Helper function to analyze tool usage
function analyzeToolUsage(summaries: any[], events: any[]): ToolUsagePattern[] {
  const toolData: Record<string, any> = {};

  // Aggregate tool usage
  summaries.forEach(summary => {
    summary.toolsUsed.forEach((toolId: string) => {
      if (!toolData[toolId]) {
        toolData[toolId] = {
          toolId,
          usageCount: 0,
          totalTime: 0,
          lastUsed: null
        };
      }
      toolData[toolId].usageCount += 1;
      toolData[toolId].totalTime += summary.totalTimeSpent / summary.toolsUsed.length;
    });
  });

  // Find last usage times
  events.forEach(event => {
    if (event.toolId && toolData[event.toolId]) {
      if (!toolData[event.toolId].lastUsed || event.timestamp > toolData[event.toolId].lastUsed) {
        toolData[event.toolId].lastUsed = event.timestamp;
      }
    }
  });

  // Convert to ToolUsagePattern array
  return Object.values(toolData).map((data: any) => {
    const avgTime = data.totalTime / Math.max(data.usageCount, 1);
    const efficiency = avgTime > 0 ? Math.min(100, Math.round((data.usageCount / avgTime) * 10)) : 0;

    return {
      toolId: data.toolId,
      usageCount: data.usageCount,
      totalTime: Math.round(data.totalTime),
      efficiency,
      lastUsed: data.lastUsed || new Date().toISOString()
    };
  }).sort((a, b) => b.usageCount - a.usageCount);
}

// Helper function to detect behavior patterns
function detectBehaviorPatterns(summaries: any[], events: any[]): Record<string, any> {
  const patterns: Record<string, any> = {};

  // Weekly patterns
  const dayOfWeekActivity: Record<string, number> = {};
  summaries.forEach(summary => {
    const dayOfWeek = new Date(summary.date).getDay();
    const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayOfWeek];
    dayOfWeekActivity[dayName] = (dayOfWeekActivity[dayName] || 0) + summary.totalTimeSpent;
  });

  patterns.weeklyPattern = Object.entries(dayOfWeekActivity)
    .map(([day, time]) => ({ day, time }))
    .sort((a, b) => b.time - a.time);

  // Session patterns
  const sessionLengths = summaries.map(s => s.totalTimeSpent).filter(t => t > 0);
  if (sessionLengths.length > 0) {
    patterns.averageSessionLength = Math.round(sessionLengths.reduce((sum, length) => sum + length, 0) / sessionLengths.length);
    patterns.sessionConsistency = sessionLengths.length / summaries.length;
  }

  // Activity type distribution
  const activityTypes = {
    social: events.filter(e => e.type === 'social_interaction').length,
    creative: events.filter(e => e.type === 'content_creation').length,
    exploration: events.filter(e => e.type === 'space_visit').length,
    productivity: events.filter(e => e.type === 'tool_interaction').length
  };

  patterns.activityDistribution = activityTypes;

  return patterns;
}