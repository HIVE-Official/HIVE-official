import { NextRequest, NextResponse } from 'next/server';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@hive/core/server';
import { getCurrentUser } from '@hive/auth-logic';

// Profile statistics interface
interface ProfileStats {
  overview: {
    totalDaysActive: number;
    totalTimeSpent: number; // in minutes
    averageSessionLength: number;
    totalSpaces: number;
    totalTools: number;
    totalContent: number;
    totalInteractions: number;
    memberSince: string;
    consistencyScore: number; // 0-100
  };
  trends: {
    dailyActivity: Array<{
      date: string;
      timeSpent: number;
      sessions: number;
      spaces: number;
      tools: number;
    }>;
    weeklyActivity: Array<{
      week: string;
      timeSpent: number;
      sessions: number;
      spaces: number;
      engagement: number;
    }>;
    monthlyActivity: Array<{
      month: string;
      timeSpent: number;
      sessions: number;
      spaces: number;
      growth: number;
    }>;
  };
  patterns: {
    peakHours: Array<{
      hour: number;
      timeLabel: string;
      activity: number;
      percentage: number;
    }>;
    peakDays: Array<{
      day: string;
      activity: number;
      percentage: number;
    }>;
    sessionLengths: {
      short: number; // < 15 minutes
      medium: number; // 15-60 minutes
      long: number; // > 60 minutes
    };
    activityTypes: {
      spaceVisits: number;
      toolUsage: number;
      contentCreation: number;
      socialInteractions: number;
    };
  };
  achievements: {
    badges: Array<{
      id: string;
      name: string;
      description: string;
      unlockedAt: string;
      category: 'engagement' | 'creativity' | 'social' | 'consistency';
    }>;
    milestones: Array<{
      id: string;
      name: string;
      description: string;
      progress: number;
      target: number;
      category: string;
    }>;
    streaks: {
      current: {
        type: string;
        count: number;
        since: string;
      };
      longest: {
        type: string;
        count: number;
        period: string;
      };
    };
  };
  comparisons: {
    campusRanking: {
      percentile: number;
      rank: number;
      totalUsers: number;
      category: string;
    };
    spaceRankings: Array<{
      spaceId: string;
      spaceName: string;
      rank: number;
      totalMembers: number;
      category: string;
    }>;
    improvements: Array<{
      metric: string;
      change: number;
      period: string;
      trend: 'up' | 'down' | 'stable';
    }>;
  };
}

// GET - Fetch detailed profile statistics
export async function GET(request: NextRequest) {
  try {
    // Check for development mode
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split('Bearer ')[1];
      
      if (token.startsWith('dev_token_')) {
        const userId = token.replace('dev_token_', '');
        
        // Return mock stats data
        const mockStats = {
          overview: {
            totalDaysActive: 30,
            totalTimeSpent: 1800, // 30 hours in minutes
            averageSessionLength: 45,
            totalSpaces: 8,
            totalTools: 15,
            totalContent: 25,
            totalInteractions: 120,
            memberSince: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
            consistencyScore: 85,
          },
          trends: {
            dailyActivity: Array.from({ length: 30 }, (_, i) => ({
              date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              timeSpent: Math.floor(Math.random() * 120) + 30,
              sessions: Math.floor(Math.random() * 5) + 1,
              spaces: Math.floor(Math.random() * 3) + 1,
              tools: Math.floor(Math.random() * 5) + 2,
            })).reverse(),
            weeklyActivity: Array.from({ length: 12 }, (_, i) => ({
              week: new Date(Date.now() - i * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              timeSpent: Math.floor(Math.random() * 600) + 200,
              sessions: Math.floor(Math.random() * 20) + 5,
              spaces: Math.floor(Math.random() * 5) + 2,
              engagement: Math.floor(Math.random() * 50) + 20,
            })).reverse(),
            monthlyActivity: Array.from({ length: 6 }, (_, i) => ({
              month: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString().substring(0, 7),
              timeSpent: Math.floor(Math.random() * 2000) + 500,
              sessions: Math.floor(Math.random() * 80) + 20,
              spaces: Math.floor(Math.random() * 8) + 3,
              growth: Math.floor(Math.random() * 40) - 20,
            })).reverse(),
          },
          patterns: {
            peakHours: Array.from({ length: 24 }, (_, hour) => ({
              hour,
              timeLabel: hour === 0 ? '12 AM' : hour < 12 ? `${hour} AM` : hour === 12 ? '12 PM' : `${hour - 12} PM`,
              activity: Math.floor(Math.random() * 100),
              percentage: Math.floor(Math.random() * 15) + 1,
            })).sort((a, b) => b.activity - a.activity),
            peakDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => ({
              day,
              activity: Math.floor(Math.random() * 300) + 50,
              percentage: Math.floor(Math.random() * 25) + 5,
            })).sort((a, b) => b.activity - a.activity),
            sessionLengths: {
              short: 15,
              medium: 25,
              long: 8,
            },
            activityTypes: {
              spaceVisits: 45,
              toolUsage: 35,
              contentCreation: 20,
              socialInteractions: 30,
            },
          },
          achievements: {
            badges: [
              {
                id: 'early_adopter',
                name: 'Early Adopter',
                description: 'Joined HIVE in its early days',
                unlockedAt: new Date().toISOString(),
                category: 'engagement' as const,
              },
              {
                id: 'content_creator',
                name: 'Content Creator',
                description: 'Created 25+ pieces of content',
                unlockedAt: new Date().toISOString(),
                category: 'creativity' as const,
              },
            ],
            milestones: [
              {
                id: 'time_milestone',
                name: 'Time Spent',
                description: 'Total time spent on HIVE',
                progress: 1800,
                target: 3000,
                category: 'engagement',
              },
              {
                id: 'content_milestone',
                name: 'Content Created',
                description: 'Total content pieces created',
                progress: 25,
                target: 50,
                category: 'creativity',
              },
            ],
            streaks: {
              current: {
                type: 'daily_activity',
                count: 7,
                since: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              },
              longest: {
                type: 'daily_activity',
                count: 21,
                period: 'all_time',
              },
            },
          },
          comparisons: {
            campusRanking: {
              percentile: 78,
              rank: 22,
              totalUsers: 100,
              category: 'overall_activity',
            },
            spaceRankings: [
              {
                spaceId: 'dev_space_1',
                spaceName: 'Development Space',
                rank: 3,
                totalMembers: 50,
                category: 'activity',
              },
            ],
            improvements: [
              {
                metric: 'weekly_activity',
                change: 25,
                period: 'last_week',
                trend: 'up' as const,
              },
            ],
          },
        };

        return NextResponse.json({
          stats: mockStats,
          metadata: {
            timeRange: 'month',
            startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            endDate: new Date().toISOString().split('T')[0],
            dataPoints: 30,
            generatedAt: new Date().toISOString(),
            developmentMode: true,
          },
        });
      }
    }

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || 'month'; // week, month, semester, year, all
    const includeComparisons = searchParams.get('includeComparisons') === 'true';

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
      case 'all':
        startDate.setFullYear(endDate.getFullYear() - 2);
        break;
    }

    const startDateStr = startDate.toISOString().split('T')[0];
    const endDateStr = endDate.toISOString().split('T')[0];

    // Fetch activity summaries
    const summariesQuery = query(
      collection(db, 'activitySummaries'),
      where('userId', '==', user.uid),
      where('date', '>=', startDateStr),
      where('date', '<=', endDateStr),
      orderBy('date', 'desc')
    );

    const summariesSnapshot = await getDocs(summariesQuery);
    const summaries = summariesSnapshot.docs.map(doc => doc.data());

    // Fetch detailed activity events
    const eventsQuery = query(
      collection(db, 'activityEvents'),
      where('userId', '==', user.uid),
      where('date', '>=', startDateStr),
      where('date', '<=', endDateStr),
      orderBy('timestamp', 'desc')
    );

    const eventsSnapshot = await getDocs(eventsQuery);
    const events = eventsSnapshot.docs.map(doc => doc.data());

    // Fetch user memberships for context
    const membershipsQuery = query(
      collection(db, 'members'),
      where('userId', '==', user.uid)
    );

    const membershipsSnapshot = await getDocs(membershipsQuery);
    const memberships = membershipsSnapshot.docs.map(doc => doc.data());

    // Generate comprehensive statistics
    const stats: ProfileStats = {
      overview: generateOverviewStats(summaries, memberships),
      trends: generateTrendAnalysis(summaries, timeRange),
      patterns: generatePatternAnalysis(summaries, events),
      achievements: generateAchievements(summaries, events, memberships),
      comparisons: includeComparisons ? 
        await generateComparisons(user.uid, summaries, memberships) : 
        generateEmptyComparisons()
    };

    return NextResponse.json({
      stats,
      metadata: {
        timeRange,
        startDate: startDateStr,
        endDate: endDateStr,
        dataPoints: summaries.length,
        generatedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('Error fetching profile statistics:', error);
    return NextResponse.json({ error: 'Failed to fetch profile statistics' }, { status: 500 });
  }
}

// Helper function to generate overview statistics
function generateOverviewStats(summaries: any[], memberships: any[]) {
  const totalTimeSpent = summaries.reduce((sum, s) => sum + (s.totalTimeSpent || 0), 0);
  const totalSessions = summaries.reduce((sum, s) => sum + (s.sessionCount || 0), 0);
  const totalDaysActive = summaries.filter(s => s.totalTimeSpent > 0).length;
  const averageSessionLength = totalSessions > 0 ? Math.round(totalTimeSpent / totalSessions) : 0;
  
  const totalSpaces = new Set(summaries.flatMap(s => s.spacesVisited || [])).size;
  const totalTools = new Set(summaries.flatMap(s => s.toolsUsed || [])).size;
  const totalContent = summaries.reduce((sum, s) => sum + (s.contentCreated || 0), 0);
  const totalInteractions = summaries.reduce((sum, s) => sum + (s.socialInteractions || 0), 0);
  
  const memberSince = memberships.length > 0 ? 
    memberships.reduce((earliest, m) => 
      m.joinedAt < earliest ? m.joinedAt : earliest, 
      memberships[0].joinedAt
    ) : new Date().toISOString();

  // Calculate consistency score (percentage of days active)
  const consistencyScore = summaries.length > 0 ? 
    Math.round((totalDaysActive / summaries.length) * 100) : 0;

  return {
    totalDaysActive,
    totalTimeSpent,
    averageSessionLength,
    totalSpaces,
    totalTools,
    totalContent,
    totalInteractions,
    memberSince,
    consistencyScore
  };
}

// Helper function to generate trend analysis
function generateTrendAnalysis(summaries: any[], timeRange: string) {
  // Daily activity
  const dailyActivity = summaries.map(s => ({
    date: s.date,
    timeSpent: s.totalTimeSpent || 0,
    sessions: s.sessionCount || 0,
    spaces: s.spacesVisited?.length || 0,
    tools: s.toolsUsed?.length || 0
  }));

  // Weekly activity
  const weeklyActivity = generateWeeklyTrends(summaries);

  // Monthly activity
  const monthlyActivity = generateMonthlyTrends(summaries);

  return {
    dailyActivity,
    weeklyActivity,
    monthlyActivity
  };
}

// Helper function to generate pattern analysis
function generatePatternAnalysis(summaries: any[], events: any[]) {
  // Peak hours analysis
  const hourCounts: Record<number, number> = {};
  summaries.forEach(s => {
    const hour = s.peakActivityHour || 12;
    hourCounts[hour] = (hourCounts[hour] || 0) + (s.totalTimeSpent || 0);
  });

  const totalHourActivity = Object.values(hourCounts).reduce((sum, count) => sum + count, 0);
  const peakHours = Object.entries(hourCounts)
    .map(([hour, activity]) => ({
      hour: parseInt(hour),
      timeLabel: formatHour(parseInt(hour)),
      activity,
      percentage: totalHourActivity > 0 ? Math.round((activity / totalHourActivity) * 100) : 0
    }))
    .sort((a, b) => b.activity - a.activity);

  // Peak days analysis
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayCounts: Record<string, number> = {};
  summaries.forEach(s => {
    const dayOfWeek = new Date(s.date).getDay();
    const dayName = dayNames[dayOfWeek];
    dayCounts[dayName] = (dayCounts[dayName] || 0) + (s.totalTimeSpent || 0);
  });

  const totalDayActivity = Object.values(dayCounts).reduce((sum, count) => sum + count, 0);
  const peakDays = Object.entries(dayCounts)
    .map(([day, activity]) => ({
      day,
      activity,
      percentage: totalDayActivity > 0 ? Math.round((activity / totalDayActivity) * 100) : 0
    }))
    .sort((a, b) => b.activity - a.activity);

  // Session length analysis
  const sessionLengths = {
    short: summaries.filter(s => (s.totalTimeSpent || 0) < 15).length,
    medium: summaries.filter(s => (s.totalTimeSpent || 0) >= 15 && (s.totalTimeSpent || 0) <= 60).length,
    long: summaries.filter(s => (s.totalTimeSpent || 0) > 60).length
  };

  // Activity type analysis
  const activityTypes = {
    spaceVisits: events.filter(e => e.type === 'space_visit').length,
    toolUsage: events.filter(e => e.type === 'tool_interaction').length,
    contentCreation: events.filter(e => e.type === 'content_creation').length,
    socialInteractions: events.filter(e => e.type === 'social_interaction').length
  };

  return {
    peakHours,
    peakDays,
    sessionLengths,
    activityTypes
  };
}

// Helper function to generate achievements
function generateAchievements(summaries: any[], events: any[], memberships: any[]) {
  const badges = generateBadges(summaries, events, memberships);
  const milestones = generateMilestones(summaries, events);
  const streaks = generateStreaks(summaries);

  return {
    badges,
    milestones,
    streaks
  };
}

// Helper function to generate badges
function generateBadges(summaries: any[], events: any[], memberships: any[]) {
  const badges = [];
  const totalTimeSpent = summaries.reduce((sum, s) => sum + (s.totalTimeSpent || 0), 0);
  const totalContent = summaries.reduce((sum, s) => sum + (s.contentCreated || 0), 0);
  const totalSpaces = memberships.filter(m => m.status === 'active').length;

  // Engagement badges
  if (totalTimeSpent >= 600) { // 10 hours
    badges.push({
      id: 'dedicated_user',
      name: 'Dedicated User',
      description: 'Spent over 10 hours on HIVE',
      unlockedAt: new Date().toISOString(),
      category: 'engagement' as const
    });
  }

  // Creativity badges
  if (totalContent >= 10) {
    badges.push({
      id: 'content_creator',
      name: 'Content Creator',
      description: 'Created 10+ pieces of content',
      unlockedAt: new Date().toISOString(),
      category: 'creativity' as const
    });
  }

  // Social badges
  if (totalSpaces >= 5) {
    badges.push({
      id: 'community_explorer',
      name: 'Community Explorer',
      description: 'Joined 5+ spaces',
      unlockedAt: new Date().toISOString(),
      category: 'social' as const
    });
  }

  // Consistency badges
  const activeDays = summaries.filter(s => s.totalTimeSpent > 0).length;
  if (activeDays >= 7) {
    badges.push({
      id: 'consistent_learner',
      name: 'Consistent Learner',
      description: 'Active for 7+ days',
      unlockedAt: new Date().toISOString(),
      category: 'consistency' as const
    });
  }

  return badges;
}

// Helper function to generate milestones
function generateMilestones(summaries: any[], events: any[]) {
  const totalTimeSpent = summaries.reduce((sum, s) => sum + (s.totalTimeSpent || 0), 0);
  const totalContent = summaries.reduce((sum, s) => sum + (s.contentCreated || 0), 0);
  const totalTools = new Set(summaries.flatMap(s => s.toolsUsed || [])).size;

  return [
    {
      id: 'time_milestone',
      name: 'Time Spent',
      description: 'Total time spent on HIVE',
      progress: totalTimeSpent,
      target: 1000,
      category: 'engagement'
    },
    {
      id: 'content_milestone',
      name: 'Content Created',
      description: 'Total content pieces created',
      progress: totalContent,
      target: 50,
      category: 'creativity'
    },
    {
      id: 'tools_milestone',
      name: 'Tools Mastered',
      description: 'Different tools used',
      progress: totalTools,
      target: 20,
      category: 'skills'
    }
  ];
}

// Helper function to generate streaks
function generateStreaks(summaries: any[]) {
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Calculate current streak (from most recent)
  for (const summary of summaries) {
    if (summary.totalTimeSpent > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Calculate longest streak
  for (const summary of summaries) {
    if (summary.totalTimeSpent > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  return {
    current: {
      type: 'daily_activity',
      count: currentStreak,
      since: summaries[0]?.date || new Date().toISOString().split('T')[0]
    },
    longest: {
      type: 'daily_activity',
      count: longestStreak,
      period: 'all_time'
    }
  };
}

// Helper function to generate comparisons
async function generateComparisons(userId: string, summaries: any[], memberships: any[]) {
  // This would implement actual comparisons with other users
  // For now, return mock data
  return {
    campusRanking: {
      percentile: 75,
      rank: 25,
      totalUsers: 100,
      category: 'overall_activity'
    },
    spaceRankings: memberships.slice(0, 3).map((m, i) => ({
      spaceId: m.spaceId,
      spaceName: m.spaceName || 'Unknown Space',
      rank: i + 1,
      totalMembers: 50,
      category: 'activity'
    })),
    improvements: [
      {
        metric: 'weekly_activity',
        change: 15,
        period: 'last_week',
        trend: 'up' as const
      },
      {
        metric: 'tool_usage',
        change: -5,
        period: 'last_month',
        trend: 'down' as const
      }
    ]
  };
}

// Helper function to generate empty comparisons
function generateEmptyComparisons() {
  return {
    campusRanking: {
      percentile: 0,
      rank: 0,
      totalUsers: 0,
      category: 'overall_activity'
    },
    spaceRankings: [],
    improvements: []
  };
}

// Helper function to format hour
function formatHour(hour: number): string {
  if (hour === 0) return '12 AM';
  if (hour < 12) return `${hour} AM`;
  if (hour === 12) return '12 PM';
  return `${hour - 12} PM`;
}

// Helper function to generate weekly trends
function generateWeeklyTrends(summaries: any[]) {
  const weeklyData: Record<string, any> = {};
  
  summaries.forEach(summary => {
    const date = new Date(summary.date);
    const weekStart = new Date(date);
    weekStart.setDate(date.getDate() - date.getDay());
    const weekKey = weekStart.toISOString().split('T')[0];
    
    if (!weeklyData[weekKey]) {
      weeklyData[weekKey] = {
        week: weekKey,
        timeSpent: 0,
        sessions: 0,
        spaces: new Set(),
        engagement: 0
      };
    }
    
    weeklyData[weekKey].timeSpent += summary.totalTimeSpent || 0;
    weeklyData[weekKey].sessions += summary.sessionCount || 0;
    (summary.spacesVisited || []).forEach((spaceId: string) => {
      weeklyData[weekKey].spaces.add(spaceId);
    });
    weeklyData[weekKey].engagement += (summary.socialInteractions || 0) + (summary.contentCreated || 0);
  });
  
  return Object.values(weeklyData).map((week: any) => ({
    ...week,
    spaces: week.spaces.size
  }));
}

// Helper function to generate monthly trends
function generateMonthlyTrends(summaries: any[]) {
  const monthlyData: Record<string, any> = {};
  
  summaries.forEach(summary => {
    const date = new Date(summary.date);
    const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = {
        month: monthKey,
        timeSpent: 0,
        sessions: 0,
        spaces: new Set(),
        growth: 0
      };
    }
    
    monthlyData[monthKey].timeSpent += summary.totalTimeSpent || 0;
    monthlyData[monthKey].sessions += summary.sessionCount || 0;
    (summary.spacesVisited || []).forEach((spaceId: string) => {
      monthlyData[monthKey].spaces.add(spaceId);
    });
  });
  
  const months = Object.values(monthlyData).map((month: any) => ({
    ...month,
    spaces: month.spaces.size
  }));
  
  // Calculate growth rates
  for (let i = 1; i < months.length; i++) {
    const current = months[i];
    const previous = months[i - 1];
    current.growth = previous.timeSpent > 0 ? 
      Math.round(((current.timeSpent - previous.timeSpent) / previous.timeSpent) * 100) : 0;
  }
  
  return months;
}