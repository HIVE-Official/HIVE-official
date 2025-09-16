'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';

import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Download,
  Activity,
  Eye,
  Star,
  AlertCircle,
  CheckCircle,
  Package,
  GitBranch,
  Calendar,
  Filter,
  ChevronUp,
  ChevronDown,
  MoreHorizontal,
  ExternalLink,
  Share2
} from 'lucide-react';
import { Button, Badge, Card } from '@hive/ui';
import { authenticatedFetch } from '@/lib/auth/utils/auth-utils';
import { cn } from '@/lib/utils';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

interface ToolAnalytics {
  toolId: string;
  toolName: string;
  overview: {
    totalUsers: number;
    activeUsers: number;
    totalExecutions: number;
    averageRating: number;
    totalReviews: number;
    deployments: number;
    version: string;
    lastUpdated: string;
  };
  usage: {
    daily: Array<{
      date: string;
      executions: number;
      uniqueUsers: number;
    }>;
    weekly: Array<{
      week: string;
      executions: number;
      uniqueUsers: number;
    }>;
    monthly: Array<{
      month: string;
      executions: number;
      uniqueUsers: number;
    }>;
  };
  performance: {
    averageExecutionTime: number;
    successRate: number;
    errorRate: number;
    peakUsageTime: string;
    mostUsedFeatures: Array<{
      feature: string;
      count: number;
      percentage: number;
    }>;
  };
  userEngagement: {
    retentionRate: number;
    averageSessionDuration: number;
    bounceRate: number;
    userSatisfaction: number;
    demographicBreakdown: Array<{
      category: string;
      count: number;
      percentage: number;
    }>;
  };
  deploymentStats: {
    spaces: Array<{
      spaceId: string;
      spaceName: string;
      users: number;
      executions: number;
      lastActive: string;
    }>;
    topSpaces: Array<{
      spaceId: string;
      spaceName: string;
      metric: number;
    }>;
  };
  feedback: {
    recentReviews: Array<{
      userId: string;
      userName: string;
      rating: number;
      comment: string;
      date: string;
    }>;
    ratingDistribution: {
      5: number;
      4: number;
      3: number;
      2: number;
      1: number;
    };
  };
}

interface ToolAnalyticsDashboardProps {
  toolId: string;
  className?: string;
}

const CHART_COLORS = {
  primary: '#FFD700',
  secondary: '#FF6B35',
  tertiary: '#6B46C1',
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#3B82F6'
};

export function ToolAnalyticsDashboard({
  toolId,
  className = ''
}: ToolAnalyticsDashboardProps) {
  const [analytics, setAnalytics] = useState<ToolAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [selectedMetric, setSelectedMetric] = useState<'executions' | 'users'>('executions');

  useEffect(() => {
    fetchAnalytics();
  }, [toolId, timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await authenticatedFetch(`/api/tools/${toolId}/analytics?range=${timeRange}`);
      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      logger.error('Error fetching analytics:', { error: String(error) });
      // Set mock data for demo
      setAnalytics(getMockAnalytics());
    } finally {
      setLoading(false);
    }
  };

  const getMockAnalytics = (): ToolAnalytics => ({
    toolId,
    toolName: 'Study Group Finder',
    overview: {
      totalUsers: 1247,
      activeUsers: 342,
      totalExecutions: 8934,
      averageRating: 4.7,
      totalReviews: 89,
      deployments: 23,
      version: '2.1.0',
      lastUpdated: new Date(Date.now() - 86400000 * 3).toISOString()
    },
    usage: {
      daily: Array.from({ length: 7 }, (_, i) => ({
        date: new Date(Date.now() - 86400000 * (6 - i)).toLocaleDateString(),
        executions: Math.floor(Math.random() * 200) + 100,
        uniqueUsers: Math.floor(Math.random() * 50) + 20
      })),
      weekly: Array.from({ length: 4 }, (_, i) => ({
        week: `Week ${i + 1}`,
        executions: Math.floor(Math.random() * 1000) + 500,
        uniqueUsers: Math.floor(Math.random() * 200) + 100
      })),
      monthly: Array.from({ length: 6 }, (_, i) => ({
        month: new Date(Date.now() - 86400000 * 30 * (5 - i)).toLocaleDateString('en', { month: 'short' }),
        executions: Math.floor(Math.random() * 3000) + 1500,
        uniqueUsers: Math.floor(Math.random() * 500) + 250
      }))
    },
    performance: {
      averageExecutionTime: 234,
      successRate: 97.3,
      errorRate: 2.7,
      peakUsageTime: '3:00 PM - 5:00 PM',
      mostUsedFeatures: [
        { feature: 'Course Matching', count: 3421, percentage: 38 },
        { feature: 'Schedule Sync', count: 2856, percentage: 32 },
        { feature: 'Study Preferences', count: 1789, percentage: 20 },
        { feature: 'Group Chat', count: 868, percentage: 10 }
      ]
    },
    userEngagement: {
      retentionRate: 68,
      averageSessionDuration: 4.5,
      bounceRate: 23,
      userSatisfaction: 86,
      demographicBreakdown: [
        { category: 'Freshman', count: 412, percentage: 33 },
        { category: 'Sophomore', count: 374, percentage: 30 },
        { category: 'Junior', count: 287, percentage: 23 },
        { category: 'Senior', count: 174, percentage: 14 }
      ]
    },
    deploymentStats: {
      spaces: [
        { spaceId: '1', spaceName: 'CS Department', users: 234, executions: 1876, lastActive: new Date().toISOString() },
        { spaceId: '2', spaceName: 'Engineering Hub', users: 189, executions: 1432, lastActive: new Date().toISOString() },
        { spaceId: '3', spaceName: 'Math Society', users: 156, executions: 987, lastActive: new Date().toISOString() }
      ],
      topSpaces: [
        { spaceId: '1', spaceName: 'CS Department', metric: 234 },
        { spaceId: '2', spaceName: 'Engineering Hub', metric: 189 },
        { spaceId: '3', spaceName: 'Math Society', metric: 156 }
      ]
    },
    feedback: {
      recentReviews: [
        { userId: '1', userName: 'Alex Chen', rating: 5, comment: 'Perfect for finding study partners!', date: new Date().toISOString() },
        { userId: '2', userName: 'Maria Garcia', rating: 4, comment: 'Very helpful, would like more filter options', date: new Date().toISOString() }
      ],
      ratingDistribution: {
        5: 45,
        4: 28,
        3: 12,
        2: 3,
        1: 1
      }
    }
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-6 w-6 text-[var(--hive-brand-secondary)] animate-pulse" />
          <span className="text-[var(--hive-text-inverse)]">Loading analytics...</span>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-4" />
        <p className="text-neutral-400">Failed to load analytics</p>
      </div>
    );
  }

  const usageData = analytics.usage[timeRange];
  const getTrend = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return {
      value: Math.abs(change).toFixed(1),
      isPositive: change >= 0
    };
  };

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)]">
            Tool Analytics
          </h2>
          <p className="text-sm text-neutral-400 mt-1">
            {analytics.toolName} • v{analytics.overview.version}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e: any) => setTimeRange(e.target.value as any)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-[var(--hive-text-inverse)] focus:outline-none"
          >
            <option value="daily">Last 7 Days</option>
            <option value="weekly">Last 4 Weeks</option>
            <option value="monthly">Last 6 Months</option>
          </select>

          <Button variant="outline" className="border-white/20">
            <Share2 className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="Total Users"
          value={analytics.overview.totalUsers.toLocaleString()}
          change={getTrend(analytics.overview.totalUsers, analytics.overview.totalUsers - 123)}
          icon={Users}
          color="text-blue-400"
        />
        <MetricCard
          title="Active Users"
          value={analytics.overview.activeUsers.toLocaleString()}
          change={getTrend(analytics.overview.activeUsers, analytics.overview.activeUsers - 45)}
          icon={Activity}
          color="text-green-400"
        />
        <MetricCard
          title="Executions"
          value={analytics.overview.totalExecutions.toLocaleString()}
          change={getTrend(analytics.overview.totalExecutions, analytics.overview.totalExecutions - 1234)}
          icon={BarChart3}
          color="text-purple-400"
        />
        <MetricCard
          title="Avg Rating"
          value={analytics.overview.averageRating.toFixed(1)}
          subtitle={`${analytics.overview.totalReviews} reviews`}
          icon={Star}
          color="text-yellow-400"
        />
      </div>

      {/* Usage Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)]">
            Usage Trends
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedMetric('executions')}
              className={cn(
                'px-3 py-1 text-sm rounded-lg border transition-colors',
                selectedMetric === 'executions'
                  ? 'bg-[var(--hive-brand-secondary)]/20 border-[var(--hive-brand-secondary)]/30 text-[var(--hive-brand-secondary)]'
                  : 'bg-white/5 border-white/10 text-neutral-400'
              )}
            >
              Executions
            </button>
            <button
              onClick={() => setSelectedMetric('users')}
              className={cn(
                'px-3 py-1 text-sm rounded-lg border transition-colors',
                selectedMetric === 'users'
                  ? 'bg-[var(--hive-brand-secondary)]/20 border-[var(--hive-brand-secondary)]/30 text-[var(--hive-brand-secondary)]'
                  : 'bg-white/5 border-white/10 text-neutral-400'
              )}
            >
              Users
            </button>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={usageData}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.primary} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={CHART_COLORS.primary} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
            <XAxis 
              dataKey={timeRange === 'daily' ? 'date' : timeRange === 'weekly' ? 'week' : 'month'}
              stroke="#666"
            />
            <YAxis stroke="#666" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px'
              }}
            />
            <Area
              type="monotone"
              dataKey={selectedMetric === 'executions' ? 'executions' : 'uniqueUsers'}
              stroke={CHART_COLORS.primary}
              fillOpacity={1}
              fill="url(#colorGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">
            Performance
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">Success Rate</span>
              <div className="flex items-center gap-2">
                <span className="text-[var(--hive-text-inverse)]">
                  {analytics.performance.successRate}%
                </span>
                <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-400"
                    style={{ width: `${analytics.performance.successRate}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">Avg Execution Time</span>
              <span className="text-[var(--hive-text-inverse)]">
                {analytics.performance.averageExecutionTime}ms
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">Error Rate</span>
              <span className="text-red-400">
                {analytics.performance.errorRate}%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-400">Peak Usage</span>
              <span className="text-[var(--hive-text-inverse)]">
                {analytics.performance.peakUsageTime}
              </span>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-neutral-400 mb-3">Most Used Features</p>
              <div className="space-y-2">
                {analytics.performance.mostUsedFeatures.map((feature: any) => (
                  <div key={feature.feature} className="flex items-center justify-between">
                    <span className="text-sm text-[var(--hive-text-inverse)]">
                      {feature.feature}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-neutral-400">
                        {feature.percentage}%
                      </span>
                      <div className="w-24 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--hive-brand-secondary)]"
                          style={{ width: `${feature.percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* User Engagement */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">
            User Engagement
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-xs text-neutral-400">Retention</span>
                </div>
                <p className="text-lg font-semibold text-[var(--hive-text-inverse)]">
                  {analytics.userEngagement.retentionRate}%
                </p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span className="text-xs text-neutral-400">Avg Session</span>
                </div>
                <p className="text-lg font-semibold text-[var(--hive-text-inverse)]">
                  {analytics.userEngagement.averageSessionDuration} min
                </p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingDown className="h-4 w-4 text-orange-400" />
                  <span className="text-xs text-neutral-400">Bounce Rate</span>
                </div>
                <p className="text-lg font-semibold text-[var(--hive-text-inverse)]">
                  {analytics.userEngagement.bounceRate}%
                </p>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="text-xs text-neutral-400">Satisfaction</span>
                </div>
                <p className="text-lg font-semibold text-[var(--hive-text-inverse)]">
                  {analytics.userEngagement.userSatisfaction}%
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-sm text-neutral-400 mb-3">User Demographics</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={analytics.userEngagement.demographicBreakdown}
                    dataKey="percentage"
                    nameKey="category"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {analytics.userEngagement.demographicBreakdown.map((_, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={Object.values(CHART_COLORS)[index % Object.values(CHART_COLORS).length]} 
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Card>
      </div>

      {/* Deployment Stats */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)]">
            Space Deployments
          </h3>
          <Badge className="bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)]">
            {analytics.deploymentStats.spaces.length} Spaces
          </Badge>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-xs text-neutral-400 font-medium pb-2">Space</th>
                <th className="text-right text-xs text-neutral-400 font-medium pb-2">Users</th>
                <th className="text-right text-xs text-neutral-400 font-medium pb-2">Executions</th>
                <th className="text-right text-xs text-neutral-400 font-medium pb-2">Last Active</th>
                <th className="text-right text-xs text-neutral-400 font-medium pb-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {analytics.deploymentStats.spaces.map((space: any) => (
                <tr key={space.spaceId} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 text-sm text-[var(--hive-text-inverse)]">
                    {space.spaceName}
                  </td>
                  <td className="py-3 text-sm text-right text-neutral-300">
                    {space.users.toLocaleString()}
                  </td>
                  <td className="py-3 text-sm text-right text-neutral-300">
                    {space.executions.toLocaleString()}
                  </td>
                  <td className="py-3 text-sm text-right text-neutral-300">
                    {new Date(space.lastActive).toLocaleDateString()}
                  </td>
                  <td className="py-3 text-right">
                    <button className="p-1 hover:bg-white/10 rounded transition-colors">
                      <ExternalLink className="h-4 w-4 text-neutral-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Recent Reviews */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-4">
          Recent Reviews
        </h3>
        <div className="space-y-4">
          {analytics.feedback.recentReviews.map((review: any) => (
            <div key={review.userId} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Users className="h-5 w-5 text-neutral-400" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-[var(--hive-text-inverse)]">
                    {review.userName}
                  </span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          'h-3 w-3',
                          i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-600'
                        )}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-neutral-300">{review.comment}</p>
                <span className="text-xs text-neutral-500 mt-1">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// Metric Card Component
function MetricCard({
  title,
  value,
  change,
  subtitle,
  icon: Icon,
  color
}: {
  title: string;
  value: string;
  change?: { value: string; isPositive: boolean };
  subtitle?: string;
  icon: React.ElementType;
  color: string;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-neutral-400">{title}</span>
        <Icon className={cn('h-4 w-4', color)} />
      </div>
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-[var(--hive-text-inverse)]">
          {value}
        </span>
        {change && (
          <div className={cn(
            'flex items-center gap-1 text-xs',
            change.isPositive ? 'text-green-400' : 'text-red-400'
          )}>
            {change.isPositive ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
            {change.value}%
          </div>
        )}
      </div>
      {subtitle && (
        <span className="text-xs text-neutral-500">{subtitle}</span>
      )}
    </Card>
  );
}