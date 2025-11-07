import * as React from 'react';

import { Button, Card, Grid } from '../../atomic/atoms';
import { ArrowLeft, Download, Star, Users, Activity, Share, MessageSquare, TrendingUp } from 'lucide-react';

export interface ToolAnalyticsData {
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

export interface ToolAnalyticsPageProps {
  toolName: string;
  analytics: ToolAnalyticsData;
  timeRange?: '7d' | '30d' | '90d';
  onTimeRangeChange?: (range: '7d' | '30d' | '90d') => void;
  onBack?: () => void;
  onExport?: () => void;
}

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
          <Icon className="h-6 w-6 text-[var(--hive-brand-primary)]" />
        </div>
        {change !== undefined && (
          <div className={`text-sm font-medium ${change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {change >= 0 ? '+' : ''}{change}%
          </div>
        )}
      </div>

      <div className="text-2xl font-bold text-white mb-1">
        {formatValue(value)}
      </div>
      <div className="text-sm text-hive-text-tertiary">
        {title}
      </div>
    </Card>
  );
};

const SimpleChart = ({ data, title }: {
  data: Array<{ label: string; value: number }>;
  title: string;
}) => {
  const maxValue = Math.max(...data.map(d => d.value), 1);

  return (
    <Card className="p-6 bg-white/5 border-hive-border-default">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>

      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-hive-text-tertiary">{item.label}</span>
              <span className="text-white font-medium">{item.value}</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-[var(--hive-brand-primary)] to-hive-brand-hover h-2 rounded-full transition-all duration-700"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const FeedbackCard = ({ comment }: { comment: ToolAnalyticsData['feedback']['comments'][number] }) => (
  <Card className="p-4 bg-white/5 border-hive-border-default">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-br from-[var(--hive-brand-primary)] to-hive-brand-hover rounded-lg flex items-center justify-center text-hive-brand-on-gold font-semibold text-xs">
          {comment.user.charAt(0)}
        </div>
        <span className="text-white font-medium text-sm">{comment.user}</span>
      </div>
      <div className="flex items-center gap-1">
        <Star className="h-3 w-3 fill-[var(--hive-brand-primary)] text-[var(--hive-brand-primary)]" />
        <span className="text-xs text-hive-text-tertiary">{comment.rating}</span>
      </div>
    </div>
    <p className="text-sm text-hive-text-tertiary mb-2">"{comment.comment}"</p>
    <div className="text-xs text-hive-text-tertiary opacity-60">{comment.date}</div>
  </Card>
);

export function ToolAnalyticsPage({
  toolName,
  analytics,
  timeRange = '7d',
  onTimeRangeChange,
  onBack,
  onExport,
}: ToolAnalyticsPageProps) {
  const dailyUsageData = analytics.usage.daily.map(d => ({
    label: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    value: d.usage,
  }));

  const spaceUsageData = analytics.usage.spaces.map(s => ({ label: s.name, value: s.usage }));
  const featureUsageData = analytics.usage.features.map(f => ({ label: f.feature, value: f.usage }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-hive-background-primary via-hive-background-tertiary to-hive-background-secondary">
      {/* Header */}
      <div className="border-b border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.8)] backdrop-blur-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button size="sm" variant="ghost" onClick={onBack} className="text-hive-text-tertiary hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-white">{toolName} Analytics</h1>
                <p className="text-sm text-hive-text-tertiary">Usage insights and performance metrics</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <select
                value={timeRange}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onTimeRangeChange?.(e.target.value as any)}
                className="p-2 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded text-white text-sm focus:border-[var(--hive-brand-primary)]/50 focus:outline-none"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 3 months</option>
              </select>
              <Button size="sm" variant="secondary" onClick={onExport} className="border-[rgba(255,255,255,0.2)] text-hive-text-tertiary hover:text-white">
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
          <h2 className="text-2xl font-bold text-white mb-6">Overview</h2>
          <Grid columns={4} gap="lg">
            <MetricCard title="Total Usage" value={analytics.overview.totalUsage} change={12} icon={Activity} />
            <MetricCard title="Active Users" value={analytics.overview.activeUsers} change={8} icon={Users} />
            <MetricCard title="Average Rating" value={analytics.overview.avgRating} change={5} icon={Star} format="rating" />
            <MetricCard title="Total Downloads" value={analytics.overview.downloads} change={-2} icon={Download} />
          </Grid>
        </div>

        {/* Usage Charts */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">Usage Analytics</h2>
          <Grid columns={2} gap="lg">
            <SimpleChart data={dailyUsageData} title="Daily Usage" />
            <SimpleChart data={spaceUsageData} title="Usage by Space" />
          </Grid>
        </div>

        {/* Feature Usage & User Feedback */}
        <Grid columns={2} gap="xl">
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Feature Usage</h2>
            <SimpleChart data={featureUsageData} title="Most Used Features" />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-white mb-6">User Feedback</h2>
            {/* Rating Distribution */}
            <Card className="p-6 bg-white/5 border-hive-border-default mb-6">
              <h3 className="text-lg font-semibold text-white mb-4">Rating Distribution</h3>
              <div className="space-y-3">
                {analytics.feedback.ratings.map((rating, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm text-hive-text-tertiary">{rating.rating}</span>
                      <Star className="h-3 w-3 fill-[var(--hive-brand-primary)] text-[var(--hive-brand-primary)]" />
                    </div>
                    <div className="flex-1 bg-white/10 rounded-full h-2">
                      <div className="bg-gradient-to-r from-[var(--hive-brand-primary)] to-hive-brand-hover h-2 rounded-full" style={{ width: `${(rating.count / Math.max(analytics.feedback.ratings[0]?.count || 1, 1)) * 100}%` }} />
                    </div>
                    <span className="text-sm text-hive-text-tertiary w-8">{rating.count}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Comments */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">Recent Comments</h3>
              <div className="space-y-4">
                {analytics.feedback.comments.map((comment, index) => (
                  <FeedbackCard key={index} comment={comment} />
                ))}
              </div>
              <Button variant="secondary" className="w-full mt-4 border-[rgba(255,255,255,0.2)] text-hive-text-tertiary hover:text-white">
                <MessageSquare className="h-4 w-4 mr-2" />
                View All Feedback
              </Button>
            </div>
          </div>
        </Grid>

        {/* Performance Insights */}
        <Card className="p-8 bg-gradient-to-r from-[rgba(255,215,0,0.05)] to-[rgba(255,215,0,0.02)] border-[rgba(255,215,0,0.1)]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-[var(--hive-brand-primary)]/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <TrendingUp className="h-6 w-6 text-[var(--hive-brand-primary)]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-white mb-2">Performance Insights</h3>
              <div className="text-hive-text-tertiary mb-4">Your tool is performing well with strong user engagement and positive feedback.</div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-[rgba(255,255,255,0.05)] p-4 rounded-lg">
                  <div className="text-green-400 font-medium">📈 Growing</div>
                  <div className="text-hive-text-tertiary">Usage increased this period</div>
                </div>
                <div className="bg-[rgba(255,255,255,0.05)] p-4 rounded-lg">
                  <div className="text-[var(--hive-brand-primary)] font-medium">⭐ High Rated</div>
                  <div className="text-hive-text-tertiary">Consistently high user ratings</div>
                </div>
                <div className="bg-[rgba(255,255,255,0.05)] p-4 rounded-lg">
                  <div className="text-blue-400 font-medium">🔥 Popular</div>
                  <div className="text-hive-text-tertiary">Top performer in category</div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

ToolAnalyticsPage.displayName = 'ToolAnalyticsPage';
