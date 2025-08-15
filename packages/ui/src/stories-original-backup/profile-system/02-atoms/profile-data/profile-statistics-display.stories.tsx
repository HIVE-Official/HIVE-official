import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

const meta = {
  title: 'Profile System/02-Atoms/Profile Data/Profile Statistics Display',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Tech-minimal statistics display atoms for HIVE profiles - clean numerical data presentation with contextual formatting.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Statistics Number Component
const StatisticNumber = ({ 
  value = 0,
  label = '',
  size = 'md',
  variant = 'default',
  trend,
  className = ''
}: {
  value?: number;
  label?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'compact' | 'prominent';
  trend?: 'up' | 'down' | 'stable';
  className?: string;
}) => {
  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const sizeClasses = {
    sm: { number: 'text-lg', label: 'text-xs' },
    md: { number: 'text-xl', label: 'text-sm' },
    lg: { number: 'text-2xl', label: 'text-base' },
    xl: { number: 'text-3xl', label: 'text-lg' }
  };

  const trendIcons = {
    up: '↗',
    down: '↘',
    stable: '→'
  };

  const trendColors = {
    up: 'text-hive-status-success',
    down: 'text-hive-status-error',
    stable: 'text-hive-text-tertiary'
  };

  if (variant === 'compact') {
    return (
      <div className={`inline-flex items-center gap-2 ${className}`}>
        <span className={`${sizeClasses[size].number} font-bold text-hive-text-primary`}>
          {formatNumber(value)}
        </span>
        <span className={`${sizeClasses[size].label} text-hive-text-secondary`}>
          {label}
        </span>
        {trend && (
          <span className={`text-xs ${trendColors[trend]}`}>
            {trendIcons[trend]}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'prominent') {
    return (
      <div className={`text-center space-y-1 ${className}`}>
        <div className="flex items-center justify-center gap-2">
          <span className={`${sizeClasses[size].number} font-bold text-hive-brand-secondary`}>
            {formatNumber(value)}
          </span>
          {trend && (
            <span className={`text-sm ${trendColors[trend]}`}>
              {trendIcons[trend]}
            </span>
          )}
        </div>
        <div className={`${sizeClasses[size].label} text-hive-text-secondary font-medium`}>
          {label}
        </div>
      </div>
    );
  }

  return (
    <div className={`text-center space-y-1 ${className}`}>
      <div className="flex items-center justify-center gap-2">
        <span className={`${sizeClasses[size].number} font-bold text-hive-text-primary`}>
          {formatNumber(value)}
        </span>
        {trend && (
          <span className={`text-xs ${trendColors[trend]}`}>
            {trendIcons[trend]}
          </span>
        )}
      </div>
      <div className={`${sizeClasses[size].label} text-hive-text-secondary`}>
        {label}
      </div>
    </div>
  );
};

// Progress Statistic Component
const ProgressStatistic = ({ 
  value = 0,
  max = 100,
  label = '',
  showPercentage = true,
  size = 'md',
  className = ''
}: {
  value?: number;
  max?: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) => {
  const percentage = Math.round((value / max) * 100);
  
  const sizeClasses = {
    sm: { height: 'h-1', text: 'text-xs' },
    md: { height: 'h-2', text: 'text-sm' },
    lg: { height: 'h-3', text: 'text-base' }
  };

  const getColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-hive-status-success';
    if (percentage >= 70) return 'bg-hive-brand-secondary';
    if (percentage >= 50) return 'bg-hive-status-warning';
    return 'bg-hive-status-error';
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center justify-between">
        <span className={`${sizeClasses[size].text} font-medium text-hive-text-primary`}>
          {label}
        </span>
        {showPercentage && (
          <span className={`${sizeClasses[size].text} text-hive-text-secondary`}>
            {percentage}%
          </span>
        )}
      </div>
      <div className={`w-full ${sizeClasses[size].height} bg-hive-background-secondary rounded-full overflow-hidden`}>
        <div 
          className={`${sizeClasses[size].height} ${getColor(percentage)} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

// Metric Badge Component
const MetricBadge = ({ 
  value = 0,
  label = '',
  type = 'neutral',
  size = 'md',
  className = ''
}: {
  value?: number | string;
  label?: string;
  type?: 'neutral' | 'positive' | 'negative' | 'warning';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const typeClasses = {
    neutral: 'bg-hive-text-secondary/10 text-hive-text-secondary border-hive-text-secondary/20',
    positive: 'bg-hive-status-success/10 text-hive-status-success border-hive-status-success/20',
    negative: 'bg-hive-status-error/10 text-hive-status-error border-hive-status-error/20',
    warning: 'bg-hive-status-warning/10 text-hive-status-warning border-hive-status-warning/20'
  };

  return (
    <div className={`
      inline-flex items-center gap-1.5
      ${sizeClasses[size]}
      ${typeClasses[type]}
      border rounded-full font-medium
      ${className}
    `}>
      <span className="font-bold">{value}</span>
      <span>{label}</span>
    </div>
  );
};

export const StatisticsDisplay: Story = {
  name: '📊 Statistics Display',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Statistics Display</h1>
          <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
            Tech-minimal statistics display atoms for HIVE profiles - clean numerical data presentation with contextual formatting.
          </p>
        </div>

        {/* Basic Statistics */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Basic Statistics</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <StatisticNumber value={247} label="Connections" />
              <StatisticNumber value={12} label="Spaces" />
              <StatisticNumber value={8} label="Tools Built" />
              <StatisticNumber value={1847} label="Profile Views" />
            </div>
          </div>
        </div>

        {/* Statistic Variants */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Statistic Variants</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center space-y-4">
                <StatisticNumber value={142} label="Connections" variant="default" size="lg" />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Default</div>
                  <div className="text-sm text-hive-text-secondary">Standard display</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <StatisticNumber value={142} label="Connections" variant="compact" size="lg" />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Compact</div>
                  <div className="text-sm text-hive-text-secondary">Inline layout</div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <StatisticNumber value={142} label="Connections" variant="prominent" size="lg" />
                <div>
                  <div className="text-lg font-semibold text-hive-text-primary">Prominent</div>
                  <div className="text-sm text-hive-text-secondary">Highlighted display</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Number Formatting */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Number Formatting</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              <StatisticNumber value={7} label="Small" />
              <StatisticNumber value={142} label="Hundreds" />
              <StatisticNumber value={1847} label="Thousands" />
              <StatisticNumber value={12500} label="K Format" />
              <StatisticNumber value={847000} label="K Format" />
              <StatisticNumber value={2400000} label="M Format" />
            </div>
          </div>
        </div>

        {/* Trending Statistics */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Trending Statistics</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <StatisticNumber value={247} label="Connections" trend="up" variant="prominent" />
              <StatisticNumber value={12} label="Active Spaces" trend="stable" variant="prominent" />
              <StatisticNumber value={8} label="Tools Built" trend="down" variant="prominent" />
            </div>
          </div>
        </div>

        {/* Progress Statistics */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Progress Statistics</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="bg-white rounded-lg p-6 space-y-6">
              <ProgressStatistic value={85} label="Profile Completion" />
              <ProgressStatistic value={67} label="Course Progress" />
              <ProgressStatistic value={92} label="Connection Quality" />
              <ProgressStatistic value={43} label="Activity Level" />
            </div>
          </div>
        </div>

        {/* Metric Badges */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Metric Badges</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <MetricBadge value="4.8" label="Rating" type="positive" />
                <MetricBadge value="142" label="Connections" type="neutral" />
                <MetricBadge value="12" label="Active" type="positive" />
                <MetricBadge value="2" label="Pending" type="warning" />
              </div>
              
              <div className="flex flex-wrap gap-3">
                <MetricBadge value="CS" label="Major" type="neutral" size="sm" />
                <MetricBadge value="2025" label="Class" type="neutral" size="sm" />
                <MetricBadge value="Dean's List" label="" type="positive" size="sm" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const StatisticsUsageExamples: Story = {
  name: '🎯 Usage Examples',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Statistics Usage Examples</h1>
          <p className="text-xl text-hive-text-secondary max-w-4xl mx-auto">
            Real-world implementation showing how statistics display in different profile contexts
          </p>
        </div>

        {/* Profile Overview Stats */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Profile Overview Stats</h2>
          
          <div className="bg-white rounded-lg p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <StatisticNumber value={247} label="Connections" variant="prominent" trend="up" />
              <StatisticNumber value={12} label="Active Spaces" variant="prominent" trend="stable" />
              <StatisticNumber value={8} label="Tools Built" variant="prominent" trend="up" />
              <StatisticNumber value={1847} label="Profile Views" variant="prominent" />
            </div>
            
            <div className="border-t pt-6 space-y-4">
              <ProgressStatistic value={85} label="Profile Completion" size="lg" />
              <ProgressStatistic value={67} label="Semester Progress" size="lg" />
            </div>
          </div>
        </div>

        {/* Widget Context */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Widget Statistics Context</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Calendar Widget */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Calendar</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <StatisticNumber value={3} label="Today" size="sm" />
                  <StatisticNumber value={12} label="This Week" size="sm" />
                </div>
                <ProgressStatistic value={67} label="Week Progress" size="sm" />
              </div>
            </div>

            {/* Spaces Widget */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-hive-text-primary mb-4">My Spaces</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <StatisticNumber value={12} label="Joined" variant="compact" size="sm" />
                  <MetricBadge value="5" label="Active" type="positive" size="sm" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-hive-text-secondary">Engagement</span>
                    <span className="text-hive-text-primary font-medium">78%</span>
                  </div>
                  <div className="w-full h-2 bg-hive-background-secondary rounded-full">
                    <div className="h-2 bg-hive-brand-secondary rounded-full" style={{ width: '78%' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Tools Widget */}
            <div className="bg-white rounded-lg p-6">
              <h3 className="text-lg font-semibold text-hive-text-primary mb-4">HiveLAB</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <StatisticNumber value={8} label="Built" size="sm" />
                  <StatisticNumber value={24} label="Installs" size="sm" />
                </div>
                <div className="flex flex-wrap gap-2">
                  <MetricBadge value="4.8" label="Rating" type="positive" size="sm" />
                  <MetricBadge value="2" label="Published" type="neutral" size="sm" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Performance */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Academic Performance</h2>
          
          <div className="bg-white rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-hive-text-primary">Current Semester</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <StatisticNumber value={3.7} label="GPA" variant="compact" size="lg" />
                    <MetricBadge value="Dean's List" label="" type="positive" />
                  </div>
                  <ProgressStatistic value={78} label="Semester Progress" />
                  <ProgressStatistic value={92} label="Assignment Completion" />
                  <ProgressStatistic value={85} label="Attendance Rate" />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-hive-text-primary">Course Load</h3>
                <div className="grid grid-cols-2 gap-4">
                  <StatisticNumber value={5} label="Courses" variant="prominent" />
                  <StatisticNumber value={15} label="Credits" variant="prominent" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-hive-text-secondary">CS 101</span>
                    <MetricBadge value="A-" label="" type="positive" size="sm" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-hive-text-secondary">MATH 201</span>
                    <MetricBadge value="B+" label="" type="neutral" size="sm" />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-hive-text-secondary">PHYS 151</span>
                    <MetricBadge value="A" label="" type="positive" size="sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};