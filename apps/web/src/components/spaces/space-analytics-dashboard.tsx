"use client";

import { useState, useEffect, useMemo } from "react";
import { Card, Button, Badge, Modal } from "@hive/ui";
import { Alert } from "@/components/temp-stubs";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  MessageSquare, 
  Calendar, 
  Heart, 
  Eye, 
  Share2, 
  Activity, 
  Clock, 
  Star, 
  AlertTriangle, 
  CheckCircle, 
  Zap, 
  Target, 
  Lightbulb, 
  ArrowUp, 
  ArrowDown, 
  Download, 
  Filter, 
  RefreshCw,
  PieChart,
  LineChart,
  Gauge
} from "lucide-react";

interface SpaceAnalyticsProps {
  spaceId: string;
  spaceName: string;
  userRole: 'admin' | 'moderator' | 'member';
  timeRange?: '7d' | '30d' | '90d' | '1y';
}

interface AnalyticsMetrics {
  overview: {
    totalMembers: number;
    activeMembers: number;
    memberGrowth: number;
    engagementRate: number;
    healthScore: number;
  };
  engagement: {
    postsCreated: number;
    commentsCount: number;
    likesReceived: number;
    sharesCount: number;
    toolUsage: number;
    eventAttendance: number;
  };
  content: {
    postsByCategory: { category: string; count: number; }[];
    topContributors: { name: string; handle: string; contributions: number; avatar?: string; }[];
    contentQuality: number;
    moderationActions: number;
  };
  events: {
    totalEvents: number;
    upcomingEvents: number;
    avgAttendance: number;
    eventSatisfaction: number;
  };
  health: {
    activityTrend: 'increasing' | 'stable' | 'decreasing';
    memberRetention: number;
    newMemberOnboarding: number;
    diversityIndex: number;
    collaborationScore: number;
  };
  insights: {
    peakActivityHours: string[];
    topTags: string[];
    growthOpportunities: string[];
    recommendations: string[];
  };
}

interface TimeSeriesData {
  date: string;
  members: number;
  posts: number;
  engagement: number;
}

export function SpaceAnalyticsDashboard({ spaceId, spaceName, userRole, timeRange = '30d' }: SpaceAnalyticsProps) {
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [timeSeriesData, setTimeSeriesData] = useState<TimeSeriesData[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<'members' | 'posts' | 'engagement'>('members');
  const [showExportModal, setShowExportModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    fetchAnalytics();
  }, [spaceId, timeRange]);

  const fetchAnalytics = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`/api/spaces/${spaceId}/analytics?timeRange=${timeRange}`);
      // const data = await response.json();
      
      // Simulate API call with mock data for development
      await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockMetrics: AnalyticsMetrics = {
      overview: {
        totalMembers: 127,
        activeMembers: 89,
        memberGrowth: 12.5,
        engagementRate: 76.3,
        healthScore: 8.2
      },
      engagement: {
        postsCreated: 245,
        commentsCount: 892,
        likesReceived: 1456,
        sharesCount: 234,
        toolUsage: 67,
        eventAttendance: 89
      },
      content: {
        postsByCategory: [
          { category: 'Study Help', count: 89 },
          { category: 'Events', count: 67 },
          { category: 'Resources', count: 45 },
          { category: 'Discussion', count: 44 }
        ],
        topContributors: [
          { name: 'Sarah Chen', handle: 'sarahc', contributions: 34, avatar: undefined },
          { name: 'Marcus Johnson', handle: 'marcusj', contributions: 28 },
          { name: 'Emma Davis', handle: 'emmad', contributions: 22 }
        ],
        contentQuality: 87.5,
        moderationActions: 3
      },
      events: {
        totalEvents: 23,
        upcomingEvents: 8,
        avgAttendance: 78.2,
        eventSatisfaction: 4.6
      },
      health: {
        activityTrend: 'increasing',
        memberRetention: 92.4,
        newMemberOnboarding: 85.7,
        diversityIndex: 76.8,
        collaborationScore: 82.3
      },
      insights: {
        peakActivityHours: ['10:00-11:00', '14:00-15:00', '19:00-20:00'],
        topTags: ['algorithms', 'study-group', 'career-prep', 'projects'],
        growthOpportunities: [
          'Increase weekend activity with social events',
          'Create more beginner-friendly content',
          'Add mentorship programs'
        ],
        recommendations: [
          'Host weekly algorithm study sessions',
          'Create project collaboration channel',
          'Implement peer tutoring system'
        ]
      }
    };

    // Generate time series data with realistic trends
    const mockTimeSeries: TimeSeriesData[] = Array.from({ length: 30 }, (_, i) => {
      // Create realistic growth trends instead of random numbers
      const baseMembers = 100;
      const basePosts = 5;
      const baseEngagement = 60;
      
      // Simulate weekend patterns (lower on weekends)
      const dayOfWeek = new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).getDay();
      const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.7 : 1.0;
      
      // Gradual growth over time
      const growthFactor = 1 + (i * 0.01); // 1% growth per day
      
      return {
        date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        members: Math.floor(baseMembers * growthFactor),
        posts: Math.floor(basePosts * weekendFactor * growthFactor + (i % 3)), // Variation based on day
        engagement: Math.floor(baseEngagement * weekendFactor + (i % 7) * 2) // Weekly cycle
      };
    });

      setMetrics(mockMetrics);
      setTimeSeriesData(mockTimeSeries);
      setLastUpdated(new Date());
    } catch (error) {
      // TODO: Implement proper error tracking
      setMetrics(null);
    } finally {
      setIsLoading(false);
    }
  };

  const healthScoreColor = useMemo(() => {
    if (!metrics) return 'text-zinc-400';
    const score = metrics.overview.healthScore;
    if (score >= 8) return 'text-green-400';
    if (score >= 6) return 'text-hive-gold';
    return 'text-red-400';
  }, [metrics]);

  const healthScoreStatus = useMemo(() => {
    if (!metrics) return 'Unknown';
    const score = metrics.overview.healthScore;
    if (score >= 8) return 'Excellent';
    if (score >= 6) return 'Good';
    if (score >= 4) return 'Fair';
    return 'Needs Attention';
  }, [metrics]);

  if (userRole === 'member') {
    return (
      <div className="text-center py-12">
        <BarChart3 className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[var(--hive-text-inverse)] mb-2">Analytics Access Restricted</h3>
        <p className="text-zinc-400">Space analytics are only available to administrators and moderators.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="p-6 bg-zinc-800/50 border-zinc-700">
            <div className="animate-pulse">
              <div className="h-4 bg-zinc-700 rounded w-1/4 mb-4"></div>
              <div className="space-y-2">
                <div className="h-8 bg-zinc-700 rounded"></div>
                <div className="h-4 bg-zinc-700 rounded w-3/4"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[var(--hive-text-inverse)] mb-2">Failed to Load Analytics</h3>
        <p className="text-zinc-400 mb-6">We couldn't load the analytics data. Please try again.</p>
        <Button onClick={fetchAnalytics} className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-2">Space Analytics</h2>
          <p className="text-zinc-400">
            {spaceName} • Last updated {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm" onClick={() => setShowExportModal(true)}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm" onClick={fetchAnalytics}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Health Score Overview */}
      <Card className="p-6 bg-gradient-to-br from-zinc-800/50 to-zinc-900/50 border-zinc-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)]">Space Health Score</h3>
          <Badge variant="building-tools" className={healthScoreColor}>
            {healthScoreStatus}
          </Badge>
        </div>
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 rounded-full border-4 border-zinc-700"></div>
              <div 
                className={`absolute inset-0 rounded-full border-4 border-transparent ${
                  metrics.overview.healthScore >= 8 ? 'border-green-400' :
                  metrics.overview.healthScore >= 6 ? 'border-hive-gold' : 'border-red-400'
                }`}
                style={{ 
                  background: `conic-gradient(currentColor ${metrics.overview.healthScore * 10}%, transparent 0%)`,
                  mask: 'conic-gradient(#000 0deg, #000 0deg)',
                  WebkitMask: 'conic-gradient(#000 0deg, #000 0deg)'
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className={`text-2xl font-bold ${healthScoreColor}`}>
                  {metrics.overview.healthScore.toFixed(1)}
                </span>
              </div>
            </div>
            <div>
              <div className={`text-3xl font-bold ${healthScoreColor}`}>
                {metrics.overview.healthScore.toFixed(1)}/10
              </div>
              <div className="text-sm text-zinc-400">Overall Health</div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-6 flex-1">
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Users className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-zinc-400">Member Retention</span>
              </div>
              <div className="text-xl font-semibold text-[var(--hive-text-inverse)]">{metrics.health.memberRetention.toFixed(1)}%</div>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Activity className="h-4 w-4 text-green-400" />
                <span className="text-sm text-zinc-400">Engagement Rate</span>
              </div>
              <div className="text-xl font-semibold text-[var(--hive-text-inverse)]">{metrics.overview.engagementRate.toFixed(1)}%</div>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Target className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-zinc-400">Collaboration Score</span>
              </div>
              <div className="text-xl font-semibold text-[var(--hive-text-inverse)]">{metrics.health.collaborationScore.toFixed(1)}%</div>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-1">
                <Star className="h-4 w-4 text-hive-gold" />
                <span className="text-sm text-zinc-400">Content Quality</span>
              </div>
              <div className="text-xl font-semibold text-[var(--hive-text-inverse)]">{metrics.content.contentQuality.toFixed(1)}%</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 bg-zinc-800/50 border-zinc-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">{metrics.overview.totalMembers}</div>
              <div className="text-sm text-zinc-400">Total Members</div>
            </div>
            <Users className="h-8 w-8 text-blue-400" />
          </div>
          <div className="mt-2 flex items-center text-sm">
            {metrics.overview.memberGrowth > 0 ? (
              <ArrowUp className="h-4 w-4 text-green-400 mr-1" />
            ) : (
              <ArrowDown className="h-4 w-4 text-red-400 mr-1" />
            )}
            <span className={metrics.overview.memberGrowth > 0 ? 'text-green-400' : 'text-red-400'}>
              {Math.abs(metrics.overview.memberGrowth).toFixed(1)}% this month
            </span>
          </div>
        </Card>

        <Card className="p-4 bg-zinc-800/50 border-zinc-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">{metrics.engagement.postsCreated}</div>
              <div className="text-sm text-zinc-400">Posts Created</div>
            </div>
            <MessageSquare className="h-8 w-8 text-green-400" />
          </div>
          <div className="mt-2 text-sm text-zinc-400">
            {metrics.engagement.commentsCount} comments
          </div>
        </Card>

        <Card className="p-4 bg-zinc-800/50 border-zinc-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">{metrics.events.totalEvents}</div>
              <div className="text-sm text-zinc-400">Events Hosted</div>
            </div>
            <Calendar className="h-8 w-8 text-purple-400" />
          </div>
          <div className="mt-2 text-sm text-zinc-400">
            {metrics.events.avgAttendance.toFixed(1)}% avg attendance
          </div>
        </Card>

        <Card className="p-4 bg-zinc-800/50 border-zinc-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">{metrics.engagement.toolUsage}</div>
              <div className="text-sm text-zinc-400">Tool Interactions</div>
            </div>
            <Zap className="h-8 w-8 text-hive-gold" />
          </div>
          <div className="mt-2 text-sm text-zinc-400">
            Across {metrics.content.postsByCategory.length} categories
          </div>
        </Card>
      </div>

      {/* Activity Trends */}
      <Card className="p-6 bg-zinc-800/50 border-zinc-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)]">Activity Trends</h3>
          <div className="flex items-center space-x-2">
            {['members', 'posts', 'engagement'].map((metric) => (
              <Button
                key={metric}
                variant={selectedMetric === metric ? "primary" : "outline"}
                size="sm"
                onClick={() => setSelectedMetric(metric as any)}
                className={selectedMetric === metric ? 
                  "bg-hive-gold text-hive-obsidian" : 
                  "border-zinc-600 text-zinc-400 hover:text-[var(--hive-text-inverse)]"
                }
              >
                {metric.charAt(0).toUpperCase() + metric.slice(1)}
              </Button>
            ))}
          </div>
        </div>
        <div className="h-64 flex items-end space-x-1">
          {timeSeriesData.slice(-14).map((data, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-hive-gold/20 hover:bg-hive-gold/30 transition-colors rounded-t"
                style={{ 
                  height: `${(data[selectedMetric] / Math.max(...timeSeriesData.map(d => d[selectedMetric]))) * 200}px` 
                }}
              />
              <div className="text-xs text-zinc-400 mt-2 rotate-45 origin-left">
                {data.date.split('-')[2]}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Content Analysis & Top Contributors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-zinc-800/50 border-zinc-700">
          <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">Content Breakdown</h3>
          <div className="space-y-3">
            {metrics.content.postsByCategory.map((category, index) => (
              <div key={category.category} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: `hsl(${index * 60}, 60%, 60%)` }}
                  />
                  <span className="text-[var(--hive-text-inverse)]">{category.category}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-zinc-400">{category.count}</span>
                  <div 
                    className="h-2 rounded-full bg-zinc-700"
                    style={{ 
                      width: '60px',
                      background: `linear-gradient(to right, hsl(${index * 60}, 60%, 60%) ${(category.count / Math.max(...metrics.content.postsByCategory.map(c => c.count))) * 100}%, #3f3f46 0%)`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-zinc-800/50 border-zinc-700">
          <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">Top Contributors</h3>
          <div className="space-y-3">
            {metrics.content.topContributors.map((contributor, index) => (
              <div key={contributor.handle} className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-10 h-10 bg-zinc-600 rounded-full flex items-center justify-center">
                      <span className="text-[var(--hive-text-inverse)] font-semibold text-sm">
                        {contributor.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    {index === 0 && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 bg-hive-gold rounded-full flex items-center justify-center">
                        <Star className="h-3 w-3 text-hive-obsidian" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium text-[var(--hive-text-inverse)]">{contributor.name}</div>
                    <div className="text-sm text-zinc-400">@{contributor.handle}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-[var(--hive-text-inverse)]">{contributor.contributions}</div>
                  <div className="text-xs text-zinc-400">contributions</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Insights & Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6 bg-zinc-800/50 border-zinc-700">
          <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4 flex items-center">
            <Lightbulb className="h-5 w-5 text-hive-gold mr-2" />
            Growth Opportunities
          </h3>
          <div className="space-y-3">
            {metrics.insights.growthOpportunities.map((opportunity, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-hive-gold/5 border border-hive-gold/20 rounded-lg">
                <TrendingUp className="h-4 w-4 text-hive-gold mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[var(--hive-text-inverse)]">{opportunity}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-zinc-800/50 border-zinc-700">
          <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4 flex items-center">
            <Target className="h-5 w-5 text-blue-400 mr-2" />
            Recommendations
          </h3>
          <div className="space-y-3">
            {metrics.insights.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-blue-400/5 border border-blue-400/20 rounded-lg">
                <CheckCircle className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[var(--hive-text-inverse)]">{recommendation}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Export Modal */}
      <Modal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        title="Export Analytics"
        size="md"
      >
        <div className="space-y-4">
          <p className="text-zinc-400">Export detailed analytics data for {spaceName}.</p>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-zinc-700 rounded-lg">
              <div>
                <div className="font-medium text-[var(--hive-text-inverse)]">CSV Report</div>
                <div className="text-sm text-zinc-400">Comprehensive data export</div>
              </div>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 border border-zinc-700 rounded-lg">
              <div>
                <div className="font-medium text-[var(--hive-text-inverse)]">PDF Summary</div>
                <div className="text-sm text-zinc-400">Executive summary report</div>
              </div>
              <Button variant="outline" size="sm">
                Download
              </Button>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setShowExportModal(false)}>
              Cancel
            </Button>
            <Button className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne">
              Export All
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}