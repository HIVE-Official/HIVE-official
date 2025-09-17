"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Card, Grid } from "@hive/ui";
import { ArrowLeft, TrendingUp, Users, /* Eye as _Eye, */ Download, /* Calendar as _Calendar, BarChart3 as _BarChart3, PieChart as _PieChart, */ Activity, Star, Share, MessageSquare } from "lucide-react";
import { useFeatureFlags } from "@hive/hooks";
import { useQuery } from "@tanstack/react-query";

interface AnalyticsData {
  overview: {
    totalUsage: number;
    activeUsers: number;
    avgRating: number;
    downloads: number;
  };
  usage: {
    daily: Array<{ date: string; usage: number; users: number }>;
    spaces: Array<{ name: string; usage: number; members: number }>;
    features: Array<{ feature: string; usage: number; percentage: number }>;
  };
  feedback: {
    ratings: Array<{ rating: number; count: number }>;
    comments: Array<{ user: string; comment: string; rating: number; date: string }>;
  };
}

// Fetch analytics data from Firebase via API
const fetchToolAnalytics = async (toolId: string, timeRange: string): Promise<AnalyticsData> => {
  const response = await fetch(`/api/tools/${toolId}/analytics?timeRange=${timeRange}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error('Failed to fetch analytics');
  }

  const data = await response.json();
  
  // Transform API response to match AnalyticsData interface
  return {
    overview: {
      totalUsage: data.overview?.totalUsage || 0,
      activeUsers: data.overview?.activeUsers || 0,
      avgRating: data.overview?.avgRating || 0,
      downloads: data.overview?.downloads || 0
    },
    usage: {
      daily: data.usage?.daily || [],
      spaces: data.usage?.spaces || [],
      features: data.usage?.features || []
    },
    feedback: {
      ratings: data.feedback?.ratings || [],
      comments: data.feedback?.comments || []
    }
  };
};

const MetricCard = ({ title, value, change, icon: Icon, format = 'number' }: {
  title: string;
  value: number;
  change?: number;
  icon: any;
  format?: 'number' | 'rating' | 'percentage';
}) => {
  const formatValue = (val: number) => {
    switch (format) {
      case 'rating':
        return val.toFixed(1);
      case 'percentage':
        return `${val}%`;
      default:
        return val.toLocaleString();
    }
  };

  return (
    <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] hover:bg-[rgba(255,255,255,0.04)] transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl flex items-center justify-center">
          <Icon className="h-6 w-6 text-[var(--hive-brand-secondary)]" />
        </div>
        {change !== undefined && (
          <div className={`text-sm font-medium ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </div>
        )}
      </div>
      
      <div className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-1">
        {formatValue(value)}
      </div>
      <div className="text-sm text-[var(--hive-text-muted)]">
        {title}
      </div>
    </Card>
  );
};

const SimpleChart = ({ data, title, type: _type = 'bar' }: { // TODO: type parameter for future chart variations
  data: Array<{ label: string; value: number }>;
  title: string;
  type?: 'bar' | 'line';
}) => {
  const maxValue = Math.max(...data.map(d => d.value));
  
  return (
    <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
      <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">{title}</h3>
      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-[var(--hive-text-muted)]">{item.label}</span>
              <span className="text-[var(--hive-text-inverse)] font-medium">{item.value}</span>
            </div>
            <div className="w-full bg-[rgba(255,255,255,0.05)] rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-[var(--hive-brand-secondary)] to-[#FFE255] h-2 rounded-full transition-all duration-1000"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const FeedbackCard = ({ _comment }: { _comment: { user: string; comment: string; rating: number; date: string } }) => (
  <Card className="p-4 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-[var(--hive-brand-secondary)] to-[#FFE255] rounded-lg flex items-center justify-center text-[var(--hive-background-primary)] font-semibold text-xs">
          {_comment.user.charAt(0)}
        </div>
        <span className="text-[var(--hive-text-inverse)] font-medium text-sm">{_comment.user}</span>
      </div>
      <div className="flex items-center gap-1">
        <Star className="h-3 w-3 fill-[var(--hive-brand-secondary)] text-[var(--hive-brand-secondary)]" />
        <span className="text-xs text-[var(--hive-text-muted)]">{_comment.rating}</span>
      </div>
    </div>
    <p className="text-sm text-[var(--hive-text-muted)] mb-2">"{_comment.comment}"</p>
    <div className="text-xs text-[#666] opacity-60">{_comment.date}</div>
  </Card>
);

export default function ToolAnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('7d');
  const flags = useFeatureFlags();
  const toolId = params.toolId as string;

  // Fetch real analytics data from Firebase
  const { data: analytics, isLoading, error } = useQuery<AnalyticsData>({
    queryKey: ['tool-analytics', toolId, timeRange],
    queryFn: () => fetchToolAnalytics(toolId, timeRange),
    enabled: !!toolId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 60 * 1000 // Refresh every minute
  });

  useEffect(() => {
    flags.trackEvent('tools', 'view', { page: 'tool-analytics', toolId: params.toolId });
  }, [flags, params.toolId]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--hive-background-primary)] via-[#0F0F0F] to-[#1A1A1A] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--hive-brand-secondary)] mx-auto mb-4"></div>
          <p className="text-[var(--hive-text-muted)]">Loading analytics...</p>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error || !analytics) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[var(--hive-background-primary)] via-[#0F0F0F] to-[#1A1A1A] flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 mb-4">⚠️</div>
          <h2 className="text-xl font-semibold text-[var(--hive-text-inverse)] mb-2">Failed to load analytics</h2>
          <p className="text-[var(--hive-text-muted)] mb-4">Unable to fetch analytics data. Please try again later.</p>
          <Button onClick={() => router.back()} variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const dailyUsageData = analytics.usage.daily.map(d => ({
    label: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: d.usage
  }));

  const spaceUsageData = analytics.usage.spaces.map(s => ({
    label: s.name,
    value: s.usage
  }));

  const featureUsageData = analytics.usage.features.map(f => ({
    label: f.feature,
    value: f.usage
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[var(--hive-background-primary)] via-[#0F0F0F] to-[#1A1A1A]">
      {/* Header */}
      <div className="border-b border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.8)] backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => router.back()}
                className="text-[var(--hive-text-muted)] hover:text-[var(--hive-text-inverse)]"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-[var(--hive-text-inverse)]">
                  Poll Maker Analytics
                </h1>
                <p className="text-sm text-[var(--hive-text-muted)]">
                  Usage insights and performance metrics
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e: any) => setTimeRange(e.target.value)}
                className="p-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded text-[var(--hive-text-inverse)] text-sm focus:border-[var(--hive-brand-secondary)]/50 focus:outline-none"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 3 months</option>
              </select>
              <Button
                size="sm"
                variant="outline"
                className="border-[rgba(255,255,255,0.2)] text-[var(--hive-text-muted)] hover:text-[var(--hive-text-inverse)]"
              >
                <Share className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Overview Metrics */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-6">Overview</h2>
          <Grid cols={4} gap="lg">
            <MetricCard
              title="Total Usage"
              value={analytics.overview.totalUsage}
              change={12}
              icon={Activity}
            />
            <MetricCard
              title="Active Users"
              value={analytics.overview.activeUsers}
              change={8}
              icon={Users}
            />
            <MetricCard
              title="Average Rating"
              value={analytics.overview.avgRating}
              change={5}
              icon={Star}
              format="rating"
            />
            <MetricCard
              title="Total Downloads"
              value={analytics.overview.downloads}
              change={-2}
              icon={Download}
            />
          </Grid>
        </div>

        {/* Usage Charts */}
        <div>
          <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-6">Usage Analytics</h2>
          <Grid cols={2} gap="lg">
            <SimpleChart
              data={dailyUsageData}
              title="Daily Usage"
              type="line"
            />
            <SimpleChart
              data={spaceUsageData}
              title="Usage by Space"
            />
          </Grid>
        </div>

        {/* Feature Usage & User Feedback */}
        <Grid cols={2} gap="xl">
          {/* Feature Usage */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-6">Feature Usage</h2>
            <SimpleChart
              data={featureUsageData}
              title="Most Used Features"
            />
          </div>

          {/* User Feedback */}
          <div>
            <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-6">User Feedback</h2>
            
            {/* Rating Distribution */}
            <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)] mb-6">
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">Rating Distribution</h3>
              <div className="space-y-3">
                {analytics.feedback.ratings.map((rating, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm text-[var(--hive-text-muted)]">{rating.rating}</span>
                      <Star className="h-3 w-3 fill-[var(--hive-brand-secondary)] text-[var(--hive-brand-secondary)]" />
                    </div>
                    <div className="flex-1 bg-[rgba(255,255,255,0.05)] rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-[var(--hive-brand-secondary)] to-[#FFE255] h-2 rounded-full"
                        style={{ width: `${(rating.count / 234) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm text-[var(--hive-text-muted)] w-8">{rating.count}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Comments */}
            <div>
              <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">Recent Comments</h3>
              <div className="space-y-4">
                {analytics.feedback.comments.map((comment, index) => (
                  <FeedbackCard key={index} comment={comment} />
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full mt-4 border-[rgba(255,255,255,0.2)] text-[var(--hive-text-muted)] hover:text-[var(--hive-text-inverse)]"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                View All Feedback
              </Button>
            </div>
          </div>
        </Grid>

        {/* Performance Insights */}
        <Card className="p-8 bg-gradient-to-r from-[rgba(255,215,0,0.05)] to-[rgba(255,215,0,0.02)] border-[rgba(255,215,0,0.1)]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[var(--hive-brand-secondary)]/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-[var(--hive-brand-secondary)]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[var(--hive-text-inverse)] mb-2">Performance Insights</h3>
              <div className="text-[var(--hive-text-muted)] mb-4">
                Your tool is performing well with strong user engagement and positive feedback.
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-[rgba(255,255,255,0.05)] p-4 rounded-lg">
                  <div className="text-green-400 font-medium">📈 Growing</div>
                  <div className="text-[var(--hive-text-muted)]">+12% usage increase this week</div>
                </div>
                <div className="bg-[rgba(255,255,255,0.05)] p-4 rounded-lg">
                  <div className="text-[var(--hive-brand-secondary)] font-medium">⭐ High Rated</div>
                  <div className="text-[var(--hive-text-muted)]">4.8/5 average rating</div>
                </div>
                <div className="bg-[rgba(255,255,255,0.05)] p-4 rounded-lg">
                  <div className="text-blue-400 font-medium">🔥 Popular</div>
                  <div className="text-[var(--hive-text-muted)]">Top 10% in communication category</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}