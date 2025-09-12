'use client';

import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  Badge,
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@hive/ui';
import { 
  LineChart,
  Download,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  MessageSquare,
  Heart,
  Share2
} from 'lucide-react';

interface AnalyticsData {
  overview: {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
    totalPosts: number;
    totalEngagements: number;
    averageSessionTime: number;
    bounceRate: number;
    retentionRate: number;
  };
  trends: {
    userGrowth: Array<{ date: string; count: number }>;
    postActivity: Array<{ date: string; count: number }>;
    engagementRate: Array<{ date: string; rate: number }>;
    activeHours: Array<{ hour: number; activity: number }>;
  };
  engagement: {
    totalLikes: number;
    totalComments: number;
    totalShares: number;
    averagePostEngagement: number;
    topPosts: Array<{
      id: string;
      title: string;
      engagements: number;
      type: string;
    }>;
  };
  spaces: {
    totalSpaces: number;
    activeSpaces: number;
    averageMembersPerSpace: number;
    topSpaces: Array<{
      id: string;
      name: string;
      members: number;
      activity: number;
    }>;
  };
  tools: {
    totalTools: number;
    activeTools: number;
    totalExecutions: number;
    popularTools: Array<{
      id: string;
      name: string;
      uses: number;
      rating: number;
    }>;
  };
  realtime: {
    currentActiveUsers: number;
    currentActiveSessions: number;
    realtimeEvents: Array<{
      type: string;
      userId: string;
      timestamp: string;
      details: string;
    }>;
  };
}

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadAnalytics();
    const interval = setInterval(loadRealtimeData, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, [timeRange]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/analytics?range=${timeRange}`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadRealtimeData = async () => {
    try {
      const response = await fetch('/api/admin/analytics/realtime');
      if (response.ok) {
        const data = await response.json();
        setAnalytics(prev => prev ? { ...prev, realtime: data } : null);
      }
    } catch (error) {
      console.error('Error loading realtime data:', error);
    }
  };

  const exportData = async (type: string) => {
    try {
      const response = await fetch(`/api/admin/analytics/export?type=${type}&range=${timeRange}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `hive-analytics-${type}-${timeRange}.csv`;
        a.click();
      }
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getChangeIndicator = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    const isPositive = change > 0;
    return (
      <div className={`flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        {isPositive ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
        {Math.abs(change).toFixed(1)}%
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!analytics) return null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Platform metrics and insights</p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex bg-muted rounded-md p-1">
            {(['24h', '7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  timeRange === range 
                    ? 'bg-background text-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {range}
              </button>
            ))}
          </div>
          <Button onClick={loadAnalytics} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analytics.overview.activeUsers)}</div>
            {getChangeIndicator(analytics.overview.activeUsers, analytics.overview.totalUsers * 0.8)}
            <p className="text-xs text-muted-foreground mt-1">
              {((analytics.overview.activeUsers / analytics.overview.totalUsers) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Total Engagements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(analytics.overview.totalEngagements)}</div>
            {getChangeIndicator(analytics.overview.totalEngagements, analytics.overview.totalEngagements * 0.9)}
            <p className="text-xs text-muted-foreground mt-1">
              Likes, comments, shares
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Avg Session Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.averageSessionTime}m</div>
            {getChangeIndicator(analytics.overview.averageSessionTime, 15)}
            <p className="text-xs text-muted-foreground mt-1">
              Per user session
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Retention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.overview.retentionRate}%</div>
            {getChangeIndicator(analytics.overview.retentionRate, 65)}
            <p className="text-xs text-muted-foreground mt-1">
              7-day retention
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="spaces">Spaces</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>New users over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded">
                  <LineChart className="h-8 w-8 text-muted-foreground" />
                  <span className="ml-2 text-muted-foreground">Chart visualization</span>
                </div>
                <div className="mt-4 space-y-2">
                  {analytics.trends.userGrowth.slice(0, 5).map((point, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{point.date}</span>
                      <span className="font-medium">{point.count} users</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Activity Heatmap</CardTitle>
                <CardDescription>Peak usage hours</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-12 gap-1">
                  {analytics.trends.activeHours.map((hour) => (
                    <div
                      key={hour.hour}
                      className="h-20 rounded bg-blue-600"
                      style={{ opacity: hour.activity / 100 }}
                      title={`${hour.hour}:00 - ${hour.activity}% activity`}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>12am</span>
                  <span>6am</span>
                  <span>12pm</span>
                  <span>6pm</span>
                  <span>11pm</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Engagement Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Heart className="h-4 w-4 mr-2 text-red-500" />
                      <span>Likes</span>
                    </div>
                    <span className="font-bold">{formatNumber(analytics.engagement.totalLikes)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-2 text-blue-500" />
                      <span>Comments</span>
                    </div>
                    <span className="font-bold">{formatNumber(analytics.engagement.totalComments)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Share2 className="h-4 w-4 mr-2 text-green-500" />
                      <span>Shares</span>
                    </div>
                    <span className="font-bold">{formatNumber(analytics.engagement.totalShares)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Top Performing Posts</CardTitle>
                <CardDescription>Most engaged content</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {analytics.engagement.topPosts.map((post, idx) => (
                    <div key={post.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Badge variant="outline">{idx + 1}</Badge>
                        <div>
                          <p className="font-medium text-sm">{post.title}</p>
                          <p className="text-xs text-muted-foreground">{post.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">{formatNumber(post.engagements)}</p>
                        <p className="text-xs text-muted-foreground">engagements</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="spaces" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Space Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Total Spaces</span>
                    <span className="font-bold">{analytics.spaces.totalSpaces}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Active Spaces</span>
                    <span className="font-bold text-green-600">{analytics.spaces.activeSpaces}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Avg Members</span>
                    <span className="font-bold">{analytics.spaces.averageMembersPerSpace}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Spaces</CardTitle>
                <CardDescription>Most active communities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {analytics.spaces.topSpaces.map((space) => (
                    <div key={space.id} className="flex justify-between items-center">
                      <span className="text-sm font-medium">{space.name}</span>
                      <div className="flex items-center space-x-2">
                        <Badge variant="secondary">{space.members} members</Badge>
                        <Badge variant="outline">{space.activity} posts</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tool Analytics</CardTitle>
              <CardDescription>HiveLab tool usage and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{analytics.tools.totalTools}</p>
                  <p className="text-sm text-muted-foreground">Total Tools</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{analytics.tools.activeTools}</p>
                  <p className="text-sm text-muted-foreground">Active Tools</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{formatNumber(analytics.tools.totalExecutions)}</p>
                  <p className="text-sm text-muted-foreground">Executions</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm">Popular Tools</h4>
                {analytics.tools.popularTools.map((tool) => (
                  <div key={tool.id} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-sm">{tool.name}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                        <span>{tool.uses} uses</span>
                        <span>•</span>
                        <span>★ {tool.rating.toFixed(1)}</span>
                      </div>
                    </div>
                    <Badge variant="default">{formatNumber(tool.uses)}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realtime" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Live Activity</CardTitle>
                <CardDescription>Real-time platform activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Active Users Now</span>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2" />
                      <span className="font-bold">{analytics.realtime.currentActiveUsers}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Active Sessions</span>
                    <span className="font-bold">{analytics.realtime.currentActiveSessions}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Events</CardTitle>
                <CardDescription>Live event stream</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {analytics.realtime.realtimeEvents.map((event, idx) => (
                    <div key={idx} className="text-sm border-l-2 border-blue-500 pl-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{event.type}</span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(event.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">{event.details}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Export Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Export Data</CardTitle>
          <CardDescription>Download analytics data for external analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Button onClick={() => exportData('overview')} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Overview
            </Button>
            <Button onClick={() => exportData('engagement')} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Engagement
            </Button>
            <Button onClick={() => exportData('full')} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Full Report
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}