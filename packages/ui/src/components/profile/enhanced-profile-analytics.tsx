'use client';

import React, { useState } from 'react';
import { motion } from '../framer-motion-proxy';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Zap, 
  Clock, 
  Target,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  BookOpen,
  Award,
  ChevronRight,
  Sparkles,
  Timer,
  Brain
} from 'lucide-react';
import { cn } from '../lib/utils';

interface ProfileAnalytics {
  weeklyActivity: Array<{
    week: string;
    spacesActive: number;
    toolsUsed: number;
    timeSpent: number;
  }>;
  topSpaces: Array<{
    id: string;
    name: string;
    timeSpent: number;
    engagement: number;
  }>;
  topTools: Array<{
    id: string;
    name: string;
    usageCount: number;
    productivity: number;
  }>;
  socialMetrics: {
    connectionsGrowth: number;
    engagementRate: number;
    helpfulnessScore: number;
  };
}

interface EnhancedProfileAnalyticsProps {
  analytics?: ProfileAnalytics;
  isLoading?: boolean;
  timeRange?: 'week' | 'month' | 'semester';
  onTimeRangeChange?: (range: 'week' | 'month' | 'semester') => void;
  className?: string;
}

// Mini chart component for trends
const MiniChart: React.FC<{ 
  data: number[]; 
  color: string; 
  height?: number;
  trend: 'up' | 'down' | 'stable';
}> = ({ data, color, height = 40, trend }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = ((value - min) / range) * height;
    return `${x},${height - y}`;
  }).join(' ');

  const trendColor = trend === 'up' ? '#10B981' : trend === 'down' ? '#EF4444' : '#6B7280';

  return (
    <div className="relative w-full" style={{ height }}>
      <svg 
        width="100%" 
        height={height} 
        className="absolute inset-0"
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
      >
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          className="drop-shadow-sm"
        />
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.1" />
          </linearGradient>
        </defs>
        <polygon
          points={`0,${height} ${points} 100,${height}`}
          fill={`url(#gradient-${color})`}
        />
      </svg>
      <div className={cn(
        "absolute top-1 right-1 flex items-center gap-1 text-xs font-medium",
        trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-400'
      )}>
        {trend === 'up' ? <TrendingUp className="h-3 w-3" /> : 
         trend === 'down' ? <TrendingDown className="h-3 w-3" /> : 
         <Activity className="h-3 w-3" />}
      </div>
    </div>
  );
};

// Metric card component
const MetricCard: React.FC<{
  title: string;
  value: string | number;
  change?: number;
  icon: React.ElementType;
  color: string;
  trend?: 'up' | 'down' | 'stable';
  chartData?: number[];
  subtitle?: string;
}> = ({ title, value, change, icon: Icon, color, trend, chartData, subtitle }) => (
  <HiveCard className="p-6 h-full">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div 
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <div>
          <h3 className="font-semibold text-[var(--hive-text-primary)] text-sm">{title}</h3>
          {subtitle && (
            <p className="text-xs text-gray-400">{subtitle}</p>
          )}
        </div>
      </div>
      {change !== undefined && (
        <HiveBadge 
          variant={change >= 0 ? "active-tag" : "tool-tag"}
          className={cn(
            "text-xs",
            change >= 0 
              ? 'bg-green-500/20 text-green-400 border-green-500/30' 
              : 'bg-red-500/20 text-red-400 border-red-500/30'
          )}
        >
          {change >= 0 ? '+' : ''}{change}%
        </HiveBadge>
      )}
    </div>
    
    <div className="flex items-end justify-between">
      <div>
        <div className="text-2xl font-bold text-[var(--hive-text-primary)] mb-1">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
      </div>
      
      {chartData && trend && (
        <div className="w-16">
          <MiniChart data={chartData} color={color} trend={trend} />
        </div>
      )}
    </div>
  </HiveCard>
);

// Progress ring component
const ProgressRing: React.FC<{
  progress: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  children?: React.ReactNode;
}> = ({ progress, size = 60, strokeWidth = 6, color = '#10B981', children }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="var(--hive-border-default)"
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className="transition-all duration-300 ease-in-out"
        />
      </svg>
      {children && (
        <div className="absolute inset-0 flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
};

export const EnhancedProfileAnalytics: React.FC<EnhancedProfileAnalyticsProps> = ({
  analytics,
  isLoading = false,
  timeRange = 'week',
  onTimeRangeChange,
  className
}) => {
  const [selectedView, setSelectedView] = useState<'overview' | 'spaces' | 'tools' | 'social'>('overview');

  if (isLoading || !analytics) {
    return (
      <HiveCard className={cn('p-6', className)}>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-700 rounded-lg animate-pulse" />
              <div className="h-5 w-32 bg-gray-700 rounded animate-pulse" />
            </div>
            <div className="w-20 h-8 bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-24 bg-gray-800/50 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </HiveCard>
    );
  }

  // Calculate derived metrics
  const totalTimeSpent = analytics.weeklyActivity.reduce((sum, week) => sum + week.timeSpent, 0);
  const avgSpacesActive = Math.round(
    analytics.weeklyActivity.reduce((sum, week) => sum + week.spacesActive, 0) / analytics.weeklyActivity.length
  );
  const totalToolsUsed = analytics.weeklyActivity.reduce((sum, week) => sum + week.toolsUsed, 0);
  
  // Calculate trends
  const activityTrend = analytics.weeklyActivity.length >= 2 
    ? analytics.weeklyActivity[analytics.weeklyActivity.length - 1].timeSpent > 
      analytics.weeklyActivity[analytics.weeklyActivity.length - 2].timeSpent ? 'up' : 'down'
    : 'stable';

  const spacesTrend = analytics.weeklyActivity.length >= 2 
    ? analytics.weeklyActivity[analytics.weeklyActivity.length - 1].spacesActive > 
      analytics.weeklyActivity[analytics.weeklyActivity.length - 2].spacesActive ? 'up' : 'down'
    : 'stable';

  const toolsTrend = analytics.weeklyActivity.length >= 2 
    ? analytics.weeklyActivity[analytics.weeklyActivity.length - 1].toolsUsed > 
      analytics.weeklyActivity[analytics.weeklyActivity.length - 2].toolsUsed ? 'up' : 'down'
    : 'stable';

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-[var(--hive-brand-secondary)]/20">
            <BarChart3 className="h-6 w-6 text-[var(--hive-brand-secondary)]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--hive-text-primary)]">Profile Analytics</h2>
            <p className="text-sm text-gray-400">Your HIVE activity insights</p>
          </div>
        </div>

        {/* Time Range Selector */}
        <div className="flex items-center gap-2">
          {(['week', 'month', 'semester'] as const).map((range) => (
            <HiveButton
              key={range}
              variant={timeRange === range ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => onTimeRangeChange?.(range)}
              className="text-xs"
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </HiveButton>
          ))}
        </div>
      </div>

      {/* Overview Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Time"
          value={`${totalTimeSpent}h`}
          change={12}
          icon={Clock}
          color="#10B981"
          trend={activityTrend}
          chartData={analytics.weeklyActivity.map(w => w.timeSpent)}
          subtitle="This week"
        />
        
        <MetricCard
          title="Active Spaces"
          value={avgSpacesActive}
          change={5}
          icon={Users}
          color="#3B82F6"
          trend={spacesTrend}
          chartData={analytics.weeklyActivity.map(w => w.spacesActive)}
          subtitle="Average per week"
        />
        
        <MetricCard
          title="Tools Used"
          value={totalToolsUsed}
          change={-3}
          icon={Zap}
          color="#F59E0B"
          trend={toolsTrend}
          chartData={analytics.weeklyActivity.map(w => w.toolsUsed)}
          subtitle="Total this period"
        />
        
        <MetricCard
          title="Engagement"
          value={`${analytics.socialMetrics.engagementRate}%`}
          change={8}
          icon={Target}
          color="#8B5CF6"
          trend="up"
          subtitle="Community score"
        />
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Spaces */}
        <HiveCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <BookOpen className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Top Spaces</h3>
            </div>
            <HiveButton variant="ghost" size="sm">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </HiveButton>
          </div>
          
          <div className="space-y-4">
            {analytics.topSpaces.slice(0, 3).map((space, index) => (
              <motion.div
                key={space.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-gray-700/50"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold",
                    index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                    index === 1 ? 'bg-gray-500/20 text-gray-400' :
                    'bg-orange-500/20 text-orange-400'
                  )}>
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-[var(--hive-text-primary)]">{space.name}</p>
                    <p className="text-xs text-gray-400">{space.timeSpent}h spent</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <ProgressRing progress={space.engagement} size={40} strokeWidth={4} color="#3B82F6">
                    <span className="text-xs font-medium text-blue-400">{space.engagement}%</span>
                  </ProgressRing>
                </div>
              </motion.div>
            ))}
          </div>
        </HiveCard>

        {/* Top Tools */}
        <HiveCard className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Zap className="h-5 w-5 text-yellow-400" />
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Top Tools</h3>
            </div>
            <HiveButton variant="ghost" size="sm">
              View All <ChevronRight className="h-4 w-4 ml-1" />
            </HiveButton>
          </div>
          
          <div className="space-y-4">
            {analytics.topTools.slice(0, 3).map((tool, index) => (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30 border border-gray-700/50"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold",
                    index === 0 ? 'bg-yellow-500/20 text-yellow-400' :
                    index === 1 ? 'bg-gray-500/20 text-gray-400' :
                    'bg-orange-500/20 text-orange-400'
                  )}>
                    #{index + 1}
                  </div>
                  <div>
                    <p className="font-medium text-[var(--hive-text-primary)]">{tool.name}</p>
                    <p className="text-xs text-gray-400">{tool.usageCount} uses</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <ProgressRing progress={tool.productivity} size={40} strokeWidth={4} color="#10B981">
                    <span className="text-xs font-medium text-green-400">{tool.productivity}%</span>
                  </ProgressRing>
                </div>
              </motion.div>
            ))}
          </div>
        </HiveCard>
      </div>

      {/* Social Metrics Summary */}
      <HiveCard className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Sparkles className="h-5 w-5 text-purple-400" />
          <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Social Impact</h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <ProgressRing progress={analytics.socialMetrics.connectionsGrowth} size={80} strokeWidth={6} color="#3B82F6">
                <div className="text-center">
                  <div className="text-xl font-bold text-blue-400">{analytics.socialMetrics.connectionsGrowth}</div>
                  <div className="text-xs text-gray-400">Growth</div>
                </div>
              </ProgressRing>
            </div>
            <p className="text-sm font-medium text-[var(--hive-text-primary)]">Connections</p>
            <p className="text-xs text-gray-400">New connections this month</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <ProgressRing progress={analytics.socialMetrics.engagementRate} size={80} strokeWidth={6} color="#10B981">
                <div className="text-center">
                  <div className="text-xl font-bold text-green-400">{analytics.socialMetrics.engagementRate}%</div>
                  <div className="text-xs text-gray-400">Rate</div>
                </div>
              </ProgressRing>
            </div>
            <p className="text-sm font-medium text-[var(--hive-text-primary)]">Engagement</p>
            <p className="text-xs text-gray-400">Community participation</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center mb-3">
              <ProgressRing progress={analytics.socialMetrics.helpfulnessScore} size={80} strokeWidth={6} color="#F59E0B">
                <div className="text-center">
                  <div className="text-xl font-bold text-yellow-400">{analytics.socialMetrics.helpfulnessScore}</div>
                  <div className="text-xs text-gray-400">Score</div>
                </div>
              </ProgressRing>
            </div>
            <p className="text-sm font-medium text-[var(--hive-text-primary)]">Helpfulness</p>
            <p className="text-xs text-gray-400">How helpful you are to others</p>
          </div>
        </div>
      </HiveCard>

      {/* Achievement Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 rounded-xl bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10 border border-purple-500/20"
      >
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/20 to-blue-500/20">
            <Award className="h-6 w-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-1">
              Keep up the great work!
            </h3>
            <p className="text-sm text-gray-300">
              You're in the top 20% of active HIVE users this week. Your engagement and tool usage are helping build a stronger community.
            </p>
          </div>
          <HiveButton variant="secondary" size="sm">
            View Achievements
          </HiveButton>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedProfileAnalytics;