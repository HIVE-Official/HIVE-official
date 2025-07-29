import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Card } from '../../atomic/atoms/card';
import { Button } from '../../atomic/atoms/button';
import { Text } from '../../atomic/atoms/text';
import { Badge } from '../../atomic/atoms/badge';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Users, 
  MessageSquare, 
  Heart, 
  Share2, 
  Eye, 
  Calendar, 
  Clock, 
  Target, 
  Zap, 
  Award, 
  Star, 
  ArrowUp, 
  ArrowDown, 
  Filter, 
  Download, 
  RefreshCw,
  ChevronUp,
  ChevronDown,
  MoreVertical,
  ExternalLink,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Minus,
  Plus,
  MapPin,
  Globe,
  Smartphone,
  Monitor,
  Tablet,
  UserPlus,
  UserMinus,
  MessageCircle,
  ThumbsUp,
  Bookmark,
  Flag,
  Crown,
  Shield
} from 'lucide-react';

const meta: Meta = {
  title: '07-Spaces/Analytics',
  parameters: {
    docs: {
      description: {
        component: 'Comprehensive analytics components for HIVE Spaces - Engagement metrics, growth tracking, activity timelines, and performance insights with kitchen sink variants',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Mock analytics data for comprehensive testing
const mockAnalyticsData = {
  overview: {
    totalMembers: 1247,
    activeMembersToday: 89,
    postsToday: 23,
    engagementRate: 0.74,
    growthRate: 0.12,
    averageSessionTime: '8m 32s',
    retentionRate: 0.89
  },
  timeRanges: {
    '7d': {
      members: [120, 125, 130, 128, 135, 142, 147],
      posts: [12, 15, 8, 22, 18, 25, 23],
      engagement: [65, 72, 58, 81, 76, 88, 89],
      views: [450, 520, 380, 680, 590, 750, 680]
    },
    '30d': {
      members: Array.from({length: 30}, (_, i) => 1200 + Math.floor(Math.random() * 50)),
      posts: Array.from({length: 30}, (_, i) => 10 + Math.floor(Math.random() * 20)),
      engagement: Array.from({length: 30}, (_, i) => 50 + Math.floor(Math.random() * 40)),
      views: Array.from({length: 30}, (_, i) => 300 + Math.floor(Math.random() * 500))
    },
    '90d': {
      members: Array.from({length: 90}, (_, i) => 1100 + Math.floor(Math.random() * 150)),
      posts: Array.from({length: 90}, (_, i) => 5 + Math.floor(Math.random() * 25)),
      engagement: Array.from({length: 90}, (_, i) => 40 + Math.floor(Math.random() * 50)),
      views: Array.from({length: 90}, (_, i) => 200 + Math.floor(Math.random() * 600))
    }
  },
  demographics: {
    membersByRole: {
      members: 1180,
      moderators: 5,
      admins: 2,
      owner: 1
    },
    membersByStatus: {
      active: 1089,
      inactive: 158
    },
    deviceTypes: {
      mobile: 687,
      desktop: 423,
      tablet: 137
    },
    timeZones: {
      'EST': 456,
      'PST': 324,
      'CST': 289,
      'MST': 123,
      'Other': 55
    }
  },
  content: {
    postTypes: {
      text: 456,
      image: 289,
      link: 234,
      video: 89,
      event: 45
    },
    engagementByType: {
      text: { posts: 456, avgLikes: 8.2, avgComments: 3.4 },
      image: { posts: 289, avgLikes: 12.7, avgComments: 5.1 },
      link: { posts: 234, avgLikes: 6.8, avgComments: 2.9 },
      video: { posts: 89, avgLikes: 18.4, avgComments: 7.2 },
      event: { posts: 45, avgLikes: 15.6, avgComments: 8.9 }
    },
    topPerformers: [
      {
        id: 'post1',
        title: 'Machine Learning Workshop Recap',
        author: 'Sarah Chen',
        type: 'text',
        metrics: { likes: 47, comments: 23, shares: 8, views: 234 },
        createdAt: '2023-10-18'
      },
      {
        id: 'post2',
        title: 'Interactive Data Structures Visualization',
        author: 'Marcus Rodriguez',
        type: 'link',
        metrics: { likes: 41, comments: 19, shares: 12, views: 189 },
        createdAt: '2023-10-19'
      },
      {
        id: 'post3',
        title: 'Study Group Schedule Update',
        author: 'Elena Vasquez',
        type: 'event',
        metrics: { likes: 38, comments: 15, shares: 6, views: 156 },
        createdAt: '2023-10-20'
      }
    ]
  },
  activity: {
    dailyActivity: Array.from({length: 24}, (_, hour) => ({
      hour,
      posts: Math.floor(Math.random() * 10),
      comments: Math.floor(Math.random() * 25),
      likes: Math.floor(Math.random() * 50),
      members: Math.floor(Math.random() * 30)
    })),
    weeklyPattern: [
      { day: 'Monday', activity: 78 },
      { day: 'Tuesday', activity: 85 },
      { day: 'Wednesday', activity: 92 },
      { day: 'Thursday', activity: 88 },
      { day: 'Friday', activity: 76 },
      { day: 'Saturday', activity: 45 },
      { day: 'Sunday', activity: 52 }
    ],
    recentActivity: [
      {
        id: 'act1',
        type: 'member_joined',
        user: 'Alex Thompson',
        timestamp: '2023-10-20T15:30:00Z',
        details: 'New member joined the space'
      },
      {
        id: 'act2',
        type: 'post_created',
        user: 'Jessica Wong',
        timestamp: '2023-10-20T15:15:00Z',
        details: 'Created post: "Algorithm Study Tips"'
      },
      {
        id: 'act3',
        type: 'comment_added',
        user: 'David Park',
        timestamp: '2023-10-20T14:45:00Z',
        details: 'Commented on "Machine Learning Workshop Recap"'
      },
      {
        id: 'act4',
        type: 'content_liked',
        user: 'Maria Santos',
        timestamp: '2023-10-20T14:30:00Z',
        details: 'Liked "Interactive Data Structures Visualization"'
      }
    ]
  }
};

// ============================================================================
// ANALYTICS OVERVIEW DASHBOARD
// ============================================================================

interface AnalyticsOverviewProps {
  data: typeof mockAnalyticsData;
  timeRange?: '7d' | '30d' | '90d';
  onTimeRangeChange?: (range: '7d' | '30d' | '90d') => void;
  variant?: 'full' | 'compact' | 'widget';
}

const AnalyticsOverview: React.FC<AnalyticsOverviewProps> = ({
  data,
  timeRange = '7d',
  onTimeRangeChange,
  variant = 'full'
}) => {
  const [selectedMetric, setSelectedMetric] = useState('members');

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };

  const formatPercentage = (value: number) => {
    return `${(value * 100).toFixed(1)}%`;
  };

  const getGrowthIndicator = (value: number) => {
    if (value > 0) {
      return { icon: TrendingUp, color: 'text-green-400', symbol: '+' };
    } else if (value < 0) {
      return { icon: TrendingDown, color: 'text-red-400', symbol: '' };
    }
    return { icon: Minus, color: 'text-gray-400', symbol: '' };
  };

  const metrics = [
    {
      key: 'members',
      label: 'Total Members',
      value: data.overview.totalMembers,
      change: 0.12,
      icon: Users,
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      key: 'activeMembers',
      label: 'Active Today',
      value: data.overview.activeMembersToday,
      change: 0.08,
      icon: Activity,
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      key: 'posts',
      label: 'Posts Today',
      value: data.overview.postsToday,
      change: -0.05,
      icon: MessageSquare,
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    },
    {
      key: 'engagement',
      label: 'Engagement Rate',
      value: data.overview.engagementRate,
      change: 0.15,
      icon: Heart,
      color: 'text-red-400',
      bgColor: 'bg-red-500/10',
      isPercentage: true
    }
  ];

  if (variant === 'compact') {
    return (
      <Card className="p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
        <div className="flex items-center justify-between mb-4">
          <Text variant="heading-sm" className="text-[var(--hive-text-primary)]">
            Analytics Overview
          </Text>
          <select
            value={timeRange}
            onChange={(e) => onTimeRangeChange?.(e.target.value as any)}
            className="px-2 py-1 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded text-[var(--hive-text-primary)] text-xs"
          >
            <option value="7d">7 days</option>
            <option value="30d">30 days</option>
            <option value="90d">90 days</option>
          </select>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {metrics.slice(0, 4).map((metric) => {
            const Icon = metric.icon;
            const growth = getGrowthIndicator(metric.change);
            const GrowthIcon = growth.icon;
            
            return (
              <div key={metric.key} className="p-3 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <Icon className={`h-4 w-4 ${metric.color}`} />
                  <div className="flex items-center gap-1">
                    <GrowthIcon className={`h-3 w-3 ${growth.color}`} />
                    <Text variant="body-xs" className={growth.color}>
                      {growth.symbol}{formatPercentage(Math.abs(metric.change))}
                    </Text>
                  </div>
                </div>
                <Text variant="body-lg" className="text-[var(--hive-text-primary)] font-bold">
                  {metric.isPercentage ? formatPercentage(metric.value) : formatNumber(metric.value)}
                </Text>
                <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                  {metric.label}
                </Text>
              </div>
            );
          })}
        </div>
      </Card>
    );
  }

  if (variant === 'widget') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const growth = getGrowthIndicator(metric.change);
          const GrowthIcon = growth.icon;
          
          return (
            <Card key={metric.key} className={`p-4 ${metric.bgColor} border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]`}>
              <div className="flex items-center justify-between mb-3">
                <Icon className={`h-6 w-6 ${metric.color}`} />
                <div className="flex items-center gap-1">
                  <GrowthIcon className={`h-4 w-4 ${growth.color}`} />
                  <Text variant="body-sm" className={growth.color}>
                    {growth.symbol}{formatPercentage(Math.abs(metric.change))}
                  </Text>
                </div>
              </div>
              
              <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-1">
                {metric.isPercentage ? formatPercentage(metric.value) : formatNumber(metric.value)}
              </Text>
              
              <Text variant="body-sm" className="text-[var(--hive-text-tertiary)]">
                {metric.label}
              </Text>
            </Card>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Text variant="heading-xl" className="text-[var(--hive-text-primary)] mb-2">
            Space Analytics
          </Text>
          <Text variant="body-sm" className="text-[var(--hive-text-tertiary)]">
            Track engagement, growth, and community health
          </Text>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => onTimeRangeChange?.(e.target.value as any)}
            className="px-3 py-2 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded-lg text-[var(--hive-text-primary)] text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          
          <Button size="sm" variant="outline" className="border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          
          <Button size="sm" className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const growth = getGrowthIndicator(metric.change);
          const GrowthIcon = growth.icon;
          
          return (
            <Card key={metric.key} className={`p-6 ${metric.bgColor} border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]`}>
              <div className="flex items-center justify-between mb-4">
                <Icon className={`h-8 w-8 ${metric.color}`} />
                <div className="flex items-center gap-2">
                  <GrowthIcon className={`h-4 w-4 ${growth.color}`} />
                  <Text variant="body-sm" className={growth.color}>
                    {growth.symbol}{formatPercentage(Math.abs(metric.change))}
                  </Text>
                </div>
              </div>
              
              <Text variant="heading-xl" className="text-[var(--hive-text-primary)] mb-2">
                {metric.isPercentage ? formatPercentage(metric.value) : formatNumber(metric.value)}
              </Text>
              
              <Text variant="body-sm" className="text-[var(--hive-text-tertiary)]">
                {metric.label}
              </Text>
              
              <Text variant="body-xs" className="text-[var(--hive-text-tertiary)] mt-1">
                vs previous {timeRange}
              </Text>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Member Growth Chart */}
        <Card className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
          <div className="flex items-center justify-between mb-6">
            <Text variant="heading-md" className="text-[var(--hive-text-primary)]">
              Member Growth
            </Text>
            <select
              value={selectedMetric}
              onChange={(e) => setSelectedMetric(e.target.value)}
              className="px-2 py-1 bg-[var(--hive-interactive-hover)] border border-[var(--hive-interactive-active)] rounded text-[var(--hive-text-primary)] text-sm"
            >
              <option value="members">Members</option>
              <option value="posts">Posts</option>
              <option value="engagement">Engagement</option>
              <option value="views">Views</option>
            </select>
          </div>
          
          {/* Simple chart representation */}
          <div className="h-64 flex items-end justify-between gap-1">
            {data.timeRanges[timeRange][selectedMetric as keyof typeof data.timeRanges[typeof timeRange]].map((value: number, index: number) => {
              const maxValue = Math.max(...(data.timeRanges[timeRange][selectedMetric as keyof typeof data.timeRanges[typeof timeRange]] as number[]));
              const height = (value / maxValue) * 100;
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-[var(--hive-brand-secondary)] rounded-t"
                    style={{ height: `${height}%` }}
                  ></div>
                  {timeRange === '7d' && (
                    <Text variant="body-xs" className="text-[var(--hive-text-tertiary)] mt-2 transform -rotate-45">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index]}
                    </Text>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Engagement Breakdown */}
        <Card className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
          <Text variant="heading-md" className="text-[var(--hive-text-primary)] mb-6">
            Engagement Breakdown
          </Text>
          
          <div className="space-y-4">
            {[
              { label: 'Likes', value: 432, total: 1000, color: 'bg-red-400' },
              { label: 'Comments', value: 289, total: 1000, color: 'bg-blue-400' },
              { label: 'Shares', value: 156, total: 1000, color: 'bg-green-400' },
              { label: 'Bookmarks', value: 123, total: 1000, color: 'bg-purple-400' }
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Text variant="body-sm" className="text-[var(--hive-text-primary)]">
                    {item.label}
                  </Text>
                  <Text variant="body-sm" className="text-[var(--hive-text-tertiary)]">
                    {item.value}
                  </Text>
                </div>
                <div className="w-full bg-[var(--hive-interactive-active)] rounded-full h-2">
                  <div 
                    className={`h-2 ${item.color} rounded-full`}
                    style={{ width: `${(item.value / item.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// MEMBER ANALYTICS COMPONENT
// ============================================================================

interface MemberAnalyticsProps {
  data: typeof mockAnalyticsData.demographics;
  timeRange?: '7d' | '30d' | '90d';
}

const MemberAnalytics: React.FC<MemberAnalyticsProps> = ({
  data,
  timeRange = '7d'
}) => {
  return (
    <div className="space-y-6">
      <Text variant="heading-lg" className="text-[var(--hive-text-primary)]">
        Member Analytics
      </Text>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Member Roles Distribution */}
        <Card className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
          <Text variant="heading-md" className="text-[var(--hive-text-primary)] mb-6">
            Members by Role
          </Text>
          
          <div className="space-y-4">
            {Object.entries(data.membersByRole).map(([role, count]) => {
              const total = Object.values(data.membersByRole).reduce((sum, val) => sum + val, 0);
              const percentage = (count / total) * 100;
              
              const roleConfig: Record<string, {icon: any, color: string}> = {
                owner: { icon: Crown, color: 'text-yellow-400' },
                admins: { icon: Shield, color: 'text-blue-400' },
                moderators: { icon: Star, color: 'text-purple-400' },
                members: { icon: Users, color: 'text-gray-400' }
              };
              
              const config = roleConfig[role] || roleConfig.members;
              const Icon = config.icon;
              
              return (
                <div key={role} className="flex items-center justify-between p-3 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${config.color}`} />
                    <Text variant="body-sm" className="text-[var(--hive-text-primary)] capitalize">
                      {role}
                    </Text>
                  </div>
                  
                  <div className="text-right">
                    <Text variant="body-sm" className="text-[var(--hive-text-primary)] font-medium">
                      {count.toLocaleString()}
                    </Text>
                    <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                      {percentage.toFixed(1)}%
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Device Types */}
        <Card className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
          <Text variant="heading-md" className="text-[var(--hive-text-primary)] mb-6">
            Device Usage
          </Text>
          
          <div className="space-y-4">
            {Object.entries(data.deviceTypes).map(([device, count]) => {
              const total = Object.values(data.deviceTypes).reduce((sum, val) => sum + val, 0);
              const percentage = (count / total) * 100;
              
              const deviceConfig: Record<string, {icon: any, color: string}> = {
                mobile: { icon: Smartphone, color: 'text-green-400' },
                desktop: { icon: Monitor, color: 'text-blue-400' },
                tablet: { icon: Tablet, color: 'text-purple-400' }
              };
              
              const config = deviceConfig[device];
              const Icon = config.icon;
              
              return (
                <div key={device} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${config.color}`} />
                      <Text variant="body-sm" className="text-[var(--hive-text-primary)] capitalize">
                        {device}
                      </Text>
                    </div>
                    <div className="text-right">
                      <Text variant="body-sm" className="text-[var(--hive-text-primary)] font-medium">
                        {count.toLocaleString()}
                      </Text>
                      <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                        {percentage.toFixed(1)}%
                      </Text>
                    </div>
                  </div>
                  <div className="w-full bg-[var(--hive-interactive-active)] rounded-full h-2">
                    <div 
                      className={`h-2 ${config.color.replace('text', 'bg')} rounded-full`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Member Status */}
        <Card className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
          <Text variant="heading-md" className="text-[var(--hive-text-primary)] mb-6">
            Member Activity Status
          </Text>
          
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(data.membersByStatus).map(([status, count]) => {
              const total = Object.values(data.membersByStatus).reduce((sum, val) => sum + val, 0);
              const percentage = (count / total) * 100;
              
              const statusConfig: Record<string, {color: string, bgColor: string}> = {
                active: { color: 'text-green-400', bgColor: 'bg-green-500/10' },
                inactive: { color: 'text-gray-400', bgColor: 'bg-gray-500/10' }
              };
              
              const config = statusConfig[status];
              
              return (
                <div key={status} className={`p-4 ${config.bgColor} rounded-lg text-center`}>
                  <Text variant="heading-lg" className={config.color}>
                    {count.toLocaleString()}
                  </Text>
                  <Text variant="body-sm" className="text-[var(--hive-text-primary)] capitalize">
                    {status}
                  </Text>
                  <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                    {percentage.toFixed(1)}%
                  </Text>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Geographic Distribution */}
        <Card className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
          <Text variant="heading-md" className="text-[var(--hive-text-primary)] mb-6">
            Geographic Distribution
          </Text>
          
          <div className="space-y-3">
            {Object.entries(data.timeZones).map(([timezone, count]) => {
              const total = Object.values(data.timeZones).reduce((sum, val) => sum + val, 0);
              const percentage = (count / total) * 100;
              
              return (
                <div key={timezone} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-4 w-4 text-[var(--hive-text-tertiary)]" />
                    <Text variant="body-sm" className="text-[var(--hive-text-primary)]">
                      {timezone}
                    </Text>
                  </div>
                  
                  <div className="text-right">
                    <Text variant="body-sm" className="text-[var(--hive-text-primary)] font-medium">
                      {count}
                    </Text>
                    <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                      {percentage.toFixed(1)}%
                    </Text>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ============================================================================
// CONTENT ANALYTICS COMPONENT
// ============================================================================

interface ContentAnalyticsProps {
  data: typeof mockAnalyticsData.content;
}

const ContentAnalytics: React.FC<ContentAnalyticsProps> = ({ data }) => {
  return (
    <div className="space-y-6">
      <Text variant="heading-lg" className="text-[var(--hive-text-primary)]">
        Content Analytics
      </Text>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Post Types Distribution */}
        <Card className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
          <Text variant="heading-md" className="text-[var(--hive-text-primary)] mb-6">
            Content Types
          </Text>
          
          <div className="space-y-4">
            {Object.entries(data.postTypes).map(([type, count]) => {
              const total = Object.values(data.postTypes).reduce((sum, val) => sum + val, 0);
              const percentage = (count / total) * 100;
              
              const typeConfig: Record<string, {icon: any, color: string}> = {
                text: { icon: MessageSquare, color: 'text-blue-400' },
                image: { icon: Eye, color: 'text-green-400' },
                link: { icon: ExternalLink, color: 'text-purple-400' },
                video: { icon: Activity, color: 'text-red-400' },
                event: { icon: Calendar, color: 'text-yellow-400' }
              };
              
              const config = typeConfig[type];
              const Icon = config.icon;
              
              return (
                <div key={type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-5 w-5 ${config.color}`} />
                      <Text variant="body-sm" className="text-[var(--hive-text-primary)] capitalize">
                        {type}
                      </Text>
                    </div>
                    <div className="text-right">
                      <Text variant="body-sm" className="text-[var(--hive-text-primary)] font-medium">
                        {count}
                      </Text>
                      <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                        {percentage.toFixed(1)}%
                      </Text>
                    </div>
                  </div>
                  <div className="w-full bg-[var(--hive-interactive-active)] rounded-full h-2">
                    <div 
                      className={`h-2 ${config.color.replace('text', 'bg')} rounded-full`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Engagement by Content Type */}
        <Card className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
          <Text variant="heading-md" className="text-[var(--hive-text-primary)] mb-6">
            Engagement by Type
          </Text>
          
          <div className="space-y-4">
            {Object.entries(data.engagementByType).map(([type, metrics]) => {
              const typeConfig: Record<string, {icon: any, color: string}> = {
                text: { icon: MessageSquare, color: 'text-blue-400' },
                image: { icon: Eye, color: 'text-green-400' },
                link: { icon: ExternalLink, color: 'text-purple-400' },
                video: { icon: Activity, color: 'text-red-400' },
                event: { icon: Calendar, color: 'text-yellow-400' }
              };
              
              const config = typeConfig[type];
              const Icon = config.icon;
              
              return (
                <div key={type} className="p-3 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className={`h-4 w-4 ${config.color}`} />
                    <Text variant="body-sm" className="text-[var(--hive-text-primary)] capitalize">
                      {type}
                    </Text>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">Avg Likes</Text>
                      <Text variant="body-sm" className="text-[var(--hive-text-primary)] font-medium">
                        {metrics.avgLikes.toFixed(1)}
                      </Text>
                    </div>
                    <div>
                      <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">Avg Comments</Text>
                      <Text variant="body-sm" className="text-[var(--hive-text-primary)] font-medium">
                        {metrics.avgComments.toFixed(1)}
                      </Text>
                    </div>
                    <div>
                      <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">Posts</Text>
                      <Text variant="body-sm" className="text-[var(--hive-text-primary)] font-medium">
                        {metrics.posts}
                      </Text>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Top Performing Content */}
      <Card className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
        <div className="flex items-center justify-between mb-6">
          <Text variant="heading-md" className="text-[var(--hive-text-primary)]">
            Top Performing Content
          </Text>
          <Button size="sm" variant="outline" className="border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]">
            <Eye className="h-4 w-4 mr-2" />
            View All
          </Button>
        </div>
        
        <div className="space-y-4">
          {data.topPerformers.map((post, index) => {
            const typeConfig: Record<string, {icon: any, color: string}> = {
              text: { icon: MessageSquare, color: 'text-blue-400' },
              image: { icon: Eye, color: 'text-green-400' },
              link: { icon: ExternalLink, color: 'text-purple-400' },
              video: { icon: Activity, color: 'text-red-400' },
              event: { icon: Calendar, color: 'text-yellow-400' }
            };
            
            const config = typeConfig[post.type];
            const Icon = config.icon;
            
            return (
              <div key={post.id} className="flex items-center justify-between p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-orange-500'} flex items-center justify-center text-[var(--hive-text-primary)] font-bold text-sm`}>
                    {index + 1}
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 ${config.color}`} />
                    <div>
                      <Text variant="body-md" className="text-[var(--hive-text-primary)]">
                        {post.title}
                      </Text>
                      <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                        by {post.author} • {new Date(post.createdAt).toLocaleDateString()}
                      </Text>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">Likes</Text>
                    <Text variant="body-sm" className="text-red-400 font-medium">
                      {post.metrics.likes}
                    </Text>
                  </div>
                  <div className="text-center">
                    <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">Comments</Text>
                    <Text variant="body-sm" className="text-blue-400 font-medium">
                      {post.metrics.comments}
                    </Text>
                  </div>
                  <div className="text-center">
                    <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">Views</Text>
                    <Text variant="body-sm" className="text-[var(--hive-text-primary)] font-medium">
                      {post.metrics.views}
                    </Text>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};

// ============================================================================
// ACTIVITY TIMELINE COMPONENT
// ============================================================================

interface ActivityTimelineProps {
  data: typeof mockAnalyticsData.activity;
  variant?: 'full' | 'compact';
}

const ActivityTimeline: React.FC<ActivityTimelineProps> = ({
  data,
  variant = 'full'
}) => {
  const [viewMode, setViewMode] = useState<'hourly' | 'daily' | 'recent'>('recent');

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'member_joined': return { icon: UserPlus, color: 'text-green-400' };
      case 'post_created': return { icon: MessageSquare, color: 'text-blue-400' };
      case 'comment_added': return { icon: MessageCircle, color: 'text-purple-400' };
      case 'content_liked': return { icon: ThumbsUp, color: 'text-red-400' };
      default: return { icon: Activity, color: 'text-gray-400' };
    }
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const date = new Date(timestamp);
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  if (variant === 'compact') {
    return (
      <Card className="p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
        <Text variant="heading-sm" className="text-[var(--hive-text-primary)] mb-4">
          Recent Activity
        </Text>
        
        <div className="space-y-3">
          {data.recentActivity.slice(0, 5).map((activity) => {
            const { icon: Icon, color } = getActivityIcon(activity.type);
            
            return (
              <div key={activity.id} className="flex items-center gap-3">
                <Icon className={`h-4 w-4 ${color}`} />
                <div className="flex-1 min-w-0">
                  <Text variant="body-xs" className="text-[var(--hive-text-primary)] truncate">
                    <span className="font-medium">{activity.user}</span> {activity.details}
                  </Text>
                  <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                    {formatTimeAgo(activity.timestamp)}
                  </Text>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)]">
          Activity Timeline
        </Text>
        
        <div className="flex items-center gap-2">
          {(['hourly', 'daily', 'recent'] as const).map((mode) => (
            <Button
              key={mode}
              size="sm"
              variant={viewMode === mode ? 'default' : 'ghost'}
              onClick={() => setViewMode(mode)}
              className={viewMode === mode ? 'bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]' : 'text-[var(--hive-text-tertiary)] hover:text-[var(--hive-text-primary)]'}
            >
              {mode.charAt(0).toUpperCase() + mode.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      {viewMode === 'hourly' && (
        <Card className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
          <Text variant="heading-md" className="text-[var(--hive-text-primary)] mb-6">
            24-Hour Activity Pattern
          </Text>
          
          <div className="h-64 flex items-end justify-between gap-1">
            {data.dailyActivity.map((hourData) => {
              const maxActivity = Math.max(...data.dailyActivity.map(h => h.posts + h.comments + h.likes));
              const totalActivity = hourData.posts + hourData.comments + hourData.likes;
              const height = maxActivity > 0 ? (totalActivity / maxActivity) * 100 : 0;
              
              return (
                <div key={hourData.hour} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-[var(--hive-brand-secondary)] rounded-t hover:bg-[var(--hive-brand-secondary)] transition-colors cursor-pointer"
                    style={{ height: `${height}%` }}
                    title={`${hourData.hour}:00 - ${totalActivity} activities`}
                  ></div>
                  <Text variant="body-xs" className="text-[var(--hive-text-tertiary)] mt-2">
                    {hourData.hour.toString().padStart(2, '0')}
                  </Text>
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {viewMode === 'daily' && (
        <Card className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
          <Text variant="heading-md" className="text-[var(--hive-text-primary)] mb-6">
            Weekly Activity Pattern
          </Text>
          
          <div className="space-y-4">
            {data.weeklyPattern.map((day) => (
              <div key={day.day} className="space-y-2">
                <div className="flex items-center justify-between">
                  <Text variant="body-sm" className="text-[var(--hive-text-primary)]">
                    {day.day}
                  </Text>
                  <Text variant="body-sm" className="text-[var(--hive-text-tertiary)]">
                    {day.activity}% active
                  </Text>
                </div>
                <div className="w-full bg-[var(--hive-interactive-active)] rounded-full h-2">
                  <div 
                    className="h-2 bg-[var(--hive-brand-secondary)] rounded-full"
                    style={{ width: `${day.activity}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {viewMode === 'recent' && (
        <Card className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
          <Text variant="heading-md" className="text-[var(--hive-text-primary)] mb-6">
            Recent Activity Feed
          </Text>
          
          <div className="space-y-4">
            {data.recentActivity.map((activity, index) => {
              const { icon: Icon, color } = getActivityIcon(activity.type);
              
              return (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className={`w-8 h-8 rounded-full bg-[var(--hive-interactive-hover)] flex items-center justify-center border border-[var(--hive-interactive-active)]`}>
                    <Icon className={`h-4 w-4 ${color}`} />
                  </div>
                  
                  <div className="flex-1">
                    <Text variant="body-sm" className="text-[var(--hive-text-primary)]">
                      <span className="font-medium">{activity.user}</span> {activity.details}
                    </Text>
                    <Text variant="body-xs" className="text-[var(--hive-text-tertiary)]">
                      {formatTimeAgo(activity.timestamp)}
                    </Text>
                  </div>
                  
                  {index < data.recentActivity.length - 1 && (
                    <div className="absolute left-4 top-8 w-px h-6 bg-[var(--hive-interactive-active)]"></div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 text-center">
            <Button size="sm" variant="outline" className="border-[var(--hive-border-hover)] text-[var(--hive-text-primary)]">
              Load More Activity
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};

// ============================================================================
// STORYBOOK STORIES
// ============================================================================

export const AnalyticsOverviewDefault: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <AnalyticsOverview 
        data={mockAnalyticsData}
        timeRange="7d"
        onTimeRangeChange={(range) => console.log('Time range changed:', range)}
      />
    </div>
  ),
};

export const AnalyticsOverviewCompact: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <AnalyticsOverview 
        data={mockAnalyticsData}
        variant="compact"
        timeRange="30d"
      />
    </div>
  ),
};

export const AnalyticsOverviewWidgets: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <AnalyticsOverview 
        data={mockAnalyticsData}
        variant="widget"
        timeRange="90d"
      />
    </div>
  ),
};

export const MemberAnalyticsDefault: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <MemberAnalytics 
        data={mockAnalyticsData.demographics}
        timeRange="30d"
      />
    </div>
  ),
};

export const ContentAnalyticsDefault: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <ContentAnalytics data={mockAnalyticsData.content} />
    </div>
  ),
};

export const ActivityTimelineDefault: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <ActivityTimeline data={mockAnalyticsData.activity} />
    </div>
  ),
};

export const ActivityTimelineCompact: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen">
      <ActivityTimeline 
        data={mockAnalyticsData.activity}
        variant="compact"
      />
    </div>
  ),
};

export const KitchenSinkAnalytics: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-8">
      <Text variant="display-md" className="text-[var(--hive-text-primary)] text-center">
        Space Analytics - Kitchen Sink
      </Text>
      
      {/* Overview Widgets */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Key Metrics</Text>
        <AnalyticsOverview 
          data={mockAnalyticsData}
          variant="widget"
        />
      </div>
      
      {/* Member Analytics */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Member Insights</Text>
        <MemberAnalytics data={mockAnalyticsData.demographics} />
      </div>
      
      {/* Content Performance */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Content Performance</Text>
        <ContentAnalytics data={mockAnalyticsData.content} />
      </div>
      
      {/* Activity Feed */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Recent Activity</Text>
        <ActivityTimeline 
          data={mockAnalyticsData.activity}
          variant="compact"
        />
      </div>
    </div>
  ),
};

export const AnalyticsDashboard: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-8">
      <Text variant="display-md" className="text-[var(--hive-text-primary)] text-center">
        Complete Analytics Dashboard
      </Text>
      
      {/* Full Overview */}
      <AnalyticsOverview 
        data={mockAnalyticsData}
        timeRange="30d"
      />
      
      {/* Secondary Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <MemberAnalytics data={mockAnalyticsData.demographics} />
        </div>
        <div>
          <ActivityTimeline data={mockAnalyticsData.activity} />
        </div>
      </div>
      
      {/* Content Analytics */}
      <ContentAnalytics data={mockAnalyticsData.content} />
    </div>
  ),
};

export const EdgeCasesAnalytics: Story = {
  render: () => (
    <div className="p-6 bg-[var(--hive-background-primary)] min-h-screen space-y-8">
      <Text variant="display-md" className="text-[var(--hive-text-primary)] text-center">
        Analytics - Edge Cases
      </Text>
      
      {/* Zero Data States */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Empty Analytics</Text>
        <AnalyticsOverview 
          data={{
            ...mockAnalyticsData,
            overview: {
              ...mockAnalyticsData.overview,
              totalMembers: 0,
              activeMembersToday: 0,
              postsToday: 0,
              engagementRate: 0
            }
          }}
        />
      </div>
      
      {/* Single Member Space */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">Single Member Space</Text>
        <MemberAnalytics 
          data={{
            ...mockAnalyticsData.demographics,
            membersByRole: {
              members: 1,
              moderators: 0,
              admins: 0,
              owner: 1
            }
          }}
        />
      </div>
      
      {/* No Recent Activity */}
      <div>
        <Text variant="heading-lg" className="text-[var(--hive-text-primary)] mb-4">No Recent Activity</Text>
        <ActivityTimeline 
          data={{
            ...mockAnalyticsData.activity,
            recentActivity: []
          }}
        />
      </div>
    </div>
  ),
};