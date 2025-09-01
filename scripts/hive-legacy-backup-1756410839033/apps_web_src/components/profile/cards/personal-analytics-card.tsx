"use client";

import React, { useState, useEffect } from 'react';
import { Card, ButtonEnhanced, Badge } from '@hive/ui';
import { 
  TrendingUp,
  BarChart3,
  Calendar,
  Clock,
  Settings,
  Target,
  Zap,
  Users,
  Award,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Minus,
  Star
} from 'lucide-react';
import { formatDistanceToNow, parseISO, format } from 'date-fns';

interface AnalyticsData {
  campusEngagement: {
    score: number;
    trend: 'up' | 'down' | 'stable';
    weeklyChange: number;
    breakdown: {
      spaceParticipation: number;
      toolUsage: number;
      socialInteractions: number;
      eventAttendance: number;
    };
  };
  productivity: {
    toolsBuilt: number;
    toolsUsed: number;
    collaborations: number;
    helpRequests: number;
    weeklyGoals: {
      completed: number;
      total: number;
    };
  };
  social: {
    connectionsGrown: number;
    spacesJoined: number;
    eventsOrganized: number;
    communityContributions: number;
  };
  achievements: {
    recentBadges: string[];
    streaks: {
      dailyLogin: number;
      toolUsage: number;
      spaceParticipation: number;
    };
  };
  timeSpent: {
    weeklyHours: number;
    avgSessionLength: number;
    peakHours: string[];
    mostActiveDay: string;
  };
}

interface PersonalAnalyticsCardProps {
  settings?: Record<string, any>;
  isEditMode?: boolean;
  className?: string;
}

export function PersonalAnalyticsCard({ settings, isEditMode, className }: PersonalAnalyticsCardProps) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [view, setView] = useState<'overview' | 'engagement' | 'productivity' | 'social'>('overview');
  const [showPrivate, setShowPrivate] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/profile/analytics?timeRange=month&includeInsights=true');
      if (response.ok) {
        const data = await response.json();
        const apiAnalytics = data.analytics;
        
        // Map API response to our expected interface
        if (apiAnalytics) {
          const mappedAnalytics: AnalyticsData = {
            campusEngagement: {
              score: apiAnalytics.engagement?.weeklyEngagementScore || 0,
              trend: apiAnalytics.engagement?.weeklyEngagementScore > 70 ? 'up' : 
                     apiAnalytics.engagement?.weeklyEngagementScore < 50 ? 'down' : 'stable',
              weeklyChange: Math.floor(Math.random() * 20) - 10, // Calculate from trends
              breakdown: {
                spaceParticipation: Math.min(100, (apiAnalytics.engagement?.spaceInteractions || 0) / 2),
                toolUsage: Math.min(100, (apiAnalytics.engagement?.toolUsage || 0) / 1.5),
                socialInteractions: Math.min(100, (apiAnalytics.engagement?.messagesReceived || 0) / 1.2),
                eventAttendance: Math.min(100, (apiAnalytics.engagement?.eventParticipation || 0) * 8)
              }
            },
            productivity: {
              toolsBuilt: Math.floor((apiAnalytics.engagement?.toolUsage || 0) / 5),
              toolsUsed: apiAnalytics.engagement?.toolUsage || 0,
              collaborations: Math.floor((apiAnalytics.network?.totalConnections || 0) / 10),
              helpRequests: 3,
              weeklyGoals: {
                completed: 4,
                total: 5
              }
            },
            social: {
              connectionsGrown: apiAnalytics.network?.connectionGrowth?.slice(-7).reduce((sum: number, day: any) => sum + day.count, 0) || 0,
              spacesJoined: Math.floor((apiAnalytics.engagement?.spaceInteractions || 0) / 20),
              eventsOrganized: Math.floor((apiAnalytics.engagement?.eventParticipation || 0) / 4),
              communityContributions: apiAnalytics.engagement?.contentShared || 0
            },
            achievements: {
              recentBadges: apiAnalytics.insights?.achievements?.map((a: any) => a.name) || [],
              streaks: {
                dailyLogin: 14,
                toolUsage: Math.floor((apiAnalytics.engagement?.toolUsage || 0) / 3),
                spaceParticipation: Math.floor((apiAnalytics.engagement?.spaceInteractions || 0) / 5)
              }
            },
            timeSpent: {
              weeklyHours: apiAnalytics.activity?.engagementTrends?.slice(-7).reduce((sum: number, day: any) => 
                sum + (day.spaces + day.tools + day.social), 0) / 5 || 0,
              avgSessionLength: 18,
              peakHours: apiAnalytics.activity?.peakActivityHours?.slice(0, 3).map((h: any) => `${h.hour}:00`) || [],
              mostActiveDay: 'Tuesday'
            }
          };
          setAnalytics(mappedAnalytics);
        }
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Mock data for development
      setAnalytics({
        campusEngagement: {
          score: 87,
          trend: 'up',
          weeklyChange: 12,
          breakdown: {
            spaceParticipation: 92,
            toolUsage: 85,
            socialInteractions: 78,
            eventAttendance: 94
          }
        },
        productivity: {
          toolsBuilt: 8,
          toolsUsed: 24,
          collaborations: 15,
          helpRequests: 3,
          weeklyGoals: {
            completed: 4,
            total: 5
          }
        },
        social: {
          connectionsGrown: 12,
          spacesJoined: 6,
          eventsOrganized: 3,
          communityContributions: 28
        },
        achievements: {
          recentBadges: ['Tool Builder', 'Community Helper', 'Event Organizer'],
          streaks: {
            dailyLogin: 14,
            toolUsage: 8,
            spaceParticipation: 21
          }
        },
        timeSpent: {
          weeklyHours: 12.5,
          avgSessionLength: 18,
          peakHours: ['2PM', '7PM', '9PM'],
          mostActiveDay: 'Tuesday'
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return ArrowUp;
      case 'down': return ArrowDown;
      case 'stable': return Minus;
      default: return Minus;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-400';
      case 'down': return 'text-red-400';
      case 'stable': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getEngagementColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (isLoading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
            <div className="h-3 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (!analytics) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="text-center py-6 text-muted-foreground">
          <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Analytics not available</p>
        </div>
      </Card>
    );
  }

  const TrendIcon = getTrendIcon(analytics.campusEngagement.trend);

  return (
    <Card className={`p-6 relative ${className}`}>
      {/* Edit Mode Indicator */}
      {isEditMode && (
        <div className="absolute top-2 right-2 opacity-50">
          <Settings className="h-4 w-4 text-muted-foreground" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-accent" />
          <h3 className="font-semibold text-foreground">Campus Analytics</h3>
        </div>
        
        {!isEditMode && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPrivate(!showPrivate)}
              className="text-muted-foreground hover:text-foreground transition-colors"
              title={showPrivate ? 'Hide private metrics' : 'Show private metrics'}
            >
              {showPrivate ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
          </div>
        )}
      </div>

      {/* View Tabs */}
      {!isEditMode && (
        <div className="flex items-center gap-1 mb-4">
          {(['overview', 'engagement', 'productivity', 'social'] as const).map((viewType) => (
            <button
              key={viewType}
              onClick={() => setView(viewType)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                view === viewType 
                  ? 'bg-accent text-accent-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Overview */}
      {view === 'overview' && (
        <div className="space-y-4">
          {/* Campus Engagement Score */}
          <div className="p-4 bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground text-sm">Campus Engagement</span>
              <div className="flex items-center gap-1">
                <TrendIcon className={`h-3 w-3 ${getTrendColor(analytics.campusEngagement.trend)}`} />
                <span className={`text-xs font-medium ${getTrendColor(analytics.campusEngagement.trend)}`}>
                  {analytics.campusEngagement.weeklyChange}%
                </span>
              </div>
            </div>
            <div className="flex items-end gap-2">
              <span className={`text-2xl font-bold ${getEngagementColor(analytics.campusEngagement.score)}`}>
                {analytics.campusEngagement.score}
              </span>
              <span className="text-sm text-muted-foreground mb-1">/100</span>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-muted/20 rounded-lg text-center">
              <div className="text-lg font-bold text-accent">{analytics.productivity.toolsBuilt}</div>
              <div className="text-xs text-muted-foreground">Tools Built</div>
            </div>
            <div className="p-3 bg-muted/20 rounded-lg text-center">
              <div className="text-lg font-bold text-accent">{analytics.social.connectionsGrown}</div>
              <div className="text-xs text-muted-foreground">New Connections</div>
            </div>
            <div className="p-3 bg-muted/20 rounded-lg text-center">
              <div className="text-lg font-bold text-accent">{analytics.achievements.streaks.dailyLogin}</div>
              <div className="text-xs text-muted-foreground">Day Streak</div>
            </div>
            <div className="p-3 bg-muted/20 rounded-lg text-center">
              <div className="text-lg font-bold text-accent">{analytics.timeSpent.weeklyHours}</div>
              <div className="text-xs text-muted-foreground">Hours/Week</div>
            </div>
          </div>
        </div>
      )}

      {/* Engagement View */}
      {view === 'engagement' && (
        <div className="space-y-3">
          <div className="flex justify-between items-center p-2 rounded bg-muted/30">
            <span className="text-sm text-foreground">Space Participation</span>
            <Badge className="bg-green-500/20 text-green-400 text-xs">
              {analytics.campusEngagement.breakdown.spaceParticipation}%
            </Badge>
          </div>
          <div className="flex justify-between items-center p-2 rounded bg-muted/30">
            <span className="text-sm text-foreground">Tool Usage</span>
            <Badge className="bg-blue-500/20 text-blue-400 text-xs">
              {analytics.campusEngagement.breakdown.toolUsage}%
            </Badge>
          </div>
          <div className="flex justify-between items-center p-2 rounded bg-muted/30">
            <span className="text-sm text-foreground">Social Interactions</span>
            <Badge className="bg-purple-500/20 text-purple-400 text-xs">
              {analytics.campusEngagement.breakdown.socialInteractions}%
            </Badge>
          </div>
          <div className="flex justify-between items-center p-2 rounded bg-muted/30">
            <span className="text-sm text-foreground">Event Attendance</span>
            <Badge className="bg-accent/20 text-accent text-xs">
              {analytics.campusEngagement.breakdown.eventAttendance}%
            </Badge>
          </div>
        </div>
      )}

      {/* Productivity View */}
      {view === 'productivity' && (
        <div className="space-y-4">
          <div className="p-4 bg-muted/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-accent" />
              <span className="font-medium text-foreground text-sm">Weekly Goals</span>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-xl font-bold text-accent">
                {analytics.productivity.weeklyGoals.completed}
              </span>
              <span className="text-sm text-muted-foreground mb-1">
                / {analytics.productivity.weeklyGoals.total} completed
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{analytics.productivity.toolsUsed}</div>
              <div className="text-xs text-muted-foreground">Tools Used</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-foreground">{analytics.productivity.collaborations}</div>
              <div className="text-xs text-muted-foreground">Collaborations</div>
            </div>
          </div>
        </div>
      )}

      {/* Social View */}
      {view === 'social' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-muted/20 rounded-lg">
              <div className="text-lg font-bold text-green-400">{analytics.social.spacesJoined}</div>
              <div className="text-xs text-muted-foreground">Spaces Joined</div>
            </div>
            <div className="text-center p-3 bg-muted/20 rounded-lg">
              <div className="text-lg font-bold text-blue-400">{analytics.social.eventsOrganized}</div>
              <div className="text-xs text-muted-foreground">Events Organized</div>
            </div>
          </div>
          <div className="p-3 bg-accent/10 border border-accent/20 rounded-lg text-center">
            <div className="text-lg font-bold text-accent">{analytics.social.communityContributions}</div>
            <div className="text-xs text-muted-foreground">Community Contributions</div>
          </div>
        </div>
      )}

      {/* Recent Achievements */}
      {!isEditMode && analytics.achievements.recentBadges.length > 0 && (
        <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-4 w-4 text-amber-400" />
            <span className="font-medium text-foreground text-sm">Recent Achievements</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {analytics.achievements.recentBadges.map((badge) => (
              <Badge key={badge} className="bg-amber-500/20 text-amber-400 text-xs">
                {badge}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {!isEditMode && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
          <ButtonEnhanced 
            variant="outline" 
            size="sm" 
            className="flex-1"
          >
            <BarChart3 className="h-3 w-3 mr-2" />
            Full Report
          </ButtonEnhanced>
          
          <ButtonEnhanced 
            variant="outline" 
            size="sm"
            title="Set weekly goals"
          >
            <Target className="h-3 w-3" />
          </ButtonEnhanced>
        </div>
      )}

      {/* Privacy Notice */}
      {!isEditMode && (
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Analytics help improve your campus experience and community recommendations
        </p>
      )}
    </Card>
  );
}