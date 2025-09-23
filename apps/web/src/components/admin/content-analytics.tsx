'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Badge,
  HiveButton,
  Progress,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@hive/ui';
import {
  TrendingUp,
  TrendingDown,
  Users,
  MessageCircle,
  Heart,
  Share2,
  Clock,
  Calendar,
  BarChart3,
  Activity,
  Zap,
  Award,
  Target,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import { formatDistanceToNow, format, startOfWeek, endOfWeek, eachDayOfInterval } from 'date-fns';

interface ContentMetrics {
  posts: {
    total: number;
    today: number;
    weeklyGrowth: number;
    averageLength: number;
    topTypes: { type: string; count: number }[];
  };
  engagement: {
    likes: number;
    comments: number;
    shares: number;
    averagePerPost: number;
    engagementRate: number;
  };
  users: {
    activePosters: number;
    lurkers: number;
    superUsers: { id: string; name: string; posts: number; engagement: number }[];
    newContributors: number;
  };
  trending: {
    posts: {
      id: string;
      content: string;
      author: string;
      engagement: number;
      velocity: number;
    }[];
    topics: { tag: string; mentions: number; growth: number }[];
    spaces: { id: string; name: string; activity: number; growth: number }[];
  };
  quality: {
    averageScore: number;
    reportRate: number;
    deletionRate: number;
    highQualityPosts: number;
    lowQualityPosts: number;
  };
  patterns: {
    peakHours: { hour: number; activity: number }[];
    peakDays: { day: string; activity: number }[];
    contentLifecycle: { age: string; engagement: number }[];
  };
}

interface SpaceAnalytics {
  id: string;
  name: string;
  type: string;
  metrics: {
    members: number;
    posts: number;
    engagement: number;
    growth: number;
    health: 'healthy' | 'growing' | 'stable' | 'declining' | 'inactive';
  };
  topContributors: { id: string; name: string; posts: number }[];
  recentActivity: { date: string; posts: number; engagement: number }[];
}

export function ContentAnalytics() {
  const [metrics, setMetrics] = useState<ContentMetrics | null>(null);
  const [spaceAnalytics, setSpaceAnalytics] = useState<SpaceAnalytics[]>([]);
  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('7d');
  const [contentType, setContentType] = useState<'all' | 'posts' | 'comments' | 'tools'>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, [timeRange, contentType]);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const [metricsRes, spacesRes] = await Promise.all([
        fetch(`/api/admin/analytics/content?range=${timeRange}&type=${contentType}`),
        fetch(`/api/admin/analytics/spaces?range=${timeRange}`)
      ]);

      if (metricsRes.ok) {
        const metricsData = await metricsRes.json();
        setMetrics(metricsData);
      }

      if (spacesRes.ok) {
        const spacesData = await spacesRes.json();
        setSpaceAnalytics(spacesData.spaces || []);
      }
    } catch (error) {
      console.error('Failed to load analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'healthy': return 'text-green-500';
      case 'growing': return 'text-blue-500';
      case 'stable': return 'text-yellow-500';
      case 'declining': return 'text-orange-500';
      case 'inactive': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getTrendIcon = (value: number) => {
    if (value > 0) return <ArrowUp className="w-4 h-4 text-green-500" />;
    if (value < 0) return <ArrowDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-gray-500" />;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-hive-gold"></div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="text-center py-8 text-gray-400">
        No analytics data available
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Content Analytics</h2>
          <p className="text-gray-400">Deep insights into platform content and engagement</p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={timeRange} onValueChange={(v) => setTimeRange(v as any)}>
            <TabsList className="bg-gray-800 border border-gray-700">
              <TabsTrigger value="24h">24h</TabsTrigger>
              <TabsTrigger value="7d">7 days</TabsTrigger>
              <TabsTrigger value="30d">30 days</TabsTrigger>
              <TabsTrigger value="90d">90 days</TabsTrigger>
            </TabsList>
          </Tabs>
          <HiveButton variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Export Report
          </HiveButton>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 border-blue-500/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
              <MessageCircle className="h-4 w-4 text-blue-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.posts.total}</div>
            <div className="flex items-center gap-2 mt-1">
              {getTrendIcon(metrics.posts.weeklyGrowth)}
              <span className="text-xs text-gray-400">
                {Math.abs(metrics.posts.weeklyGrowth)}% vs last week
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-600/20 to-green-800/20 border-green-500/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <Heart className="h-4 w-4 text-green-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.engagement.engagementRate}%</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-400">
                {metrics.engagement.averagePerPost} avg/post
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-600/20 to-purple-800/20 border-purple-500/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Active Contributors</CardTitle>
              <Users className="h-4 w-4 text-purple-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.users.activePosters}</div>
            <div className="flex items-center gap-2 mt-1">
              <Zap className="w-3 h-3 text-yellow-500" />
              <span className="text-xs text-gray-400">
                +{metrics.users.newContributors} new this week
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-600/20 to-yellow-800/20 border-yellow-500/30">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Content Quality</CardTitle>
              <Award className="h-4 w-4 text-yellow-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{metrics.quality.averageScore}/10</div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs text-gray-400">
                {metrics.quality.reportRate}% report rate
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trending Content */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Trending Posts</CardTitle>
              <TrendingUp className="h-4 w-4 text-hive-gold" />
            </div>
            <CardDescription>Most engaging content right now</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.trending.posts.slice(0, 5).map((post, index) => (
                <div key={post.id} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-hive-gold/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-hive-gold">#{index + 1}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-300 line-clamp-2">{post.content}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-500">by {post.author}</span>
                      <div className="flex items-center gap-1">
                        <Activity className="w-3 h-3 text-green-500" />
                        <span className="text-xs text-green-400">{post.engagement} engagements</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="w-3 h-3 text-yellow-500" />
                        <span className="text-xs text-yellow-400">+{post.velocity}/hr</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Trending Topics</CardTitle>
              <Target className="h-4 w-4 text-hive-gold" />
            </div>
            <CardDescription>What people are talking about</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {metrics.trending.topics.map((topic, index) => (
                <div key={topic.tag} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-hive-gold/20 text-hive-gold">#{topic.tag}</Badge>
                    <span className="text-sm text-gray-400">{topic.mentions} mentions</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(topic.growth)}
                    <span className="text-xs text-gray-400">{Math.abs(topic.growth)}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Patterns */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle>Activity Patterns</CardTitle>
          <CardDescription>When your community is most active</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Peak Hours */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-4">Peak Hours (EST)</h4>
              <div className="space-y-2">
                {metrics.patterns.peakHours.slice(0, 5).map(({ hour, activity }) => (
                  <div key={hour} className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 w-20">
                      {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                    </span>
                    <div className="flex-1 bg-gray-800 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-hive-gold to-yellow-400"
                        style={{ width: `${(activity / Math.max(...metrics.patterns.peakHours.map(h => h.activity))) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-12 text-right">{activity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Peak Days */}
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-4">Peak Days</h4>
              <div className="space-y-2">
                {metrics.patterns.peakDays.map(({ day, activity }) => (
                  <div key={day} className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 w-20">{day}</span>
                    <div className="flex-1 bg-gray-800 rounded-full h-4 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        style={{ width: `${(activity / Math.max(...metrics.patterns.peakDays.map(d => d.activity))) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-12 text-right">{activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Space Health Dashboard */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Space Health Monitor</CardTitle>
              <CardDescription>Track community space vitality and growth</CardDescription>
            </div>
            <HiveButton variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Detailed Report
            </HiveButton>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {spaceAnalytics.slice(0, 10).map((space) => (
              <div key={space.id} className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-white">{space.name}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <Badge variant="outline" className="text-xs">{space.type}</Badge>
                      <span className="text-xs text-gray-400">
                        {space.metrics.members} members
                      </span>
                      <span className={`text-xs font-medium ${getHealthColor(space.metrics.health)}`}>
                        {space.metrics.health}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">{space.metrics.posts}</p>
                      <p className="text-xs text-gray-400">posts</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">{space.metrics.engagement}</p>
                      <p className="text-xs text-gray-400">engagement</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {getTrendIcon(space.metrics.growth)}
                      <span className="text-xs">{Math.abs(space.metrics.growth)}%</span>
                    </div>
                  </div>
                </div>

                {/* Mini activity chart */}
                <div className="flex items-end gap-1 h-8 mt-3">
                  {space.recentActivity.map((day, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-hive-gold/30 rounded-t"
                      style={{
                        height: `${(day.engagement / Math.max(...space.recentActivity.map(d => d.engagement))) * 100}%`,
                        minHeight: '2px'
                      }}
                      title={`${day.date}: ${day.posts} posts, ${day.engagement} engagement`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}