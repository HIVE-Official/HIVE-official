import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Admin/01-Power Admin/PlatformAnalytics',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Platform-wide analytics dashboard for power admins with growth metrics, usage statistics, and health monitoring'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Types
interface PlatformMetrics {
  totalUsers: number;
  activeUsers: number;
  totalSpaces: number;
  activeSpaces: number;
  totalPosts: number;
  dailyActiveUsers: number;
  weeklyActiveUsers: number;
  monthlyActiveUsers: number;
  userGrowthRate: number;
  spaceGrowthRate: number;
  engagementRate: number;
  retentionRate: number;
}

interface ChartData {
  date: string;
  users: number;
  spaces: number;
  posts: number;
  engagement: number;
}

interface SchoolMetrics {
  id: string;
  name: string;
  users: number;
  spaces: number;
  activity: 'high' | 'medium' | 'low';
  growth: number;
}

// Demo data
const PLATFORM_METRICS: PlatformMetrics = {
  totalUsers: 12847,
  activeUsers: 8956,
  totalSpaces: 847,
  activeSpaces: 623,
  totalPosts: 45623,
  dailyActiveUsers: 3247,
  weeklyActiveUsers: 7856,
  monthlyActiveUsers: 11234,
  userGrowthRate: 23.5,
  spaceGrowthRate: 18.2,
  engagementRate: 67.8,
  retentionRate: 84.2
};

const CHART_DATA: ChartData[] = [
  { date: '2024-01-01', users: 8500, spaces: 650, posts: 32000, engagement: 65 },
  { date: '2024-01-08', users: 9200, spaces: 680, posts: 35000, engagement: 66 },
  { date: '2024-01-15', users: 9800, spaces: 720, posts: 38000, engagement: 68 },
  { date: '2024-01-22', users: 10500, spaces: 750, posts: 41000, engagement: 67 },
  { date: '2024-01-29', users: 11200, spaces: 780, posts: 43000, engagement: 69 },
  { date: '2024-02-05', users: 11800, spaces: 810, posts: 44500, engagement: 68 },
  { date: '2024-02-12', users: 12400, spaces: 830, posts: 45200, engagement: 67 },
  { date: '2024-02-19', users: 12847, spaces: 847, posts: 45623, engagement: 68 }
];

const SCHOOL_METRICS: SchoolMetrics[] = [
  { id: '1', name: 'University at Buffalo', users: 8432, spaces: 456, activity: 'high', growth: 25.3 },
  { id: '2', name: 'Buffalo State College', users: 2134, spaces: 178, activity: 'medium', growth: 18.7 },
  { id: '3', name: 'Canisius University', users: 1456, spaces: 123, activity: 'medium', growth: 22.1 },
  { id: '4', name: 'D\'Youville University', users: 825, spaces: 90, activity: 'low', growth: 15.8 }
];

// Key Metric Card Component 
const MetricCard: React.FC<{
  title: string;
  value: number | string;
  change?: number;
  icon: string;
  color: string;
  format?: 'number' | 'percentage' | 'currency';
}> = ({ title, value, change, icon, color, format = 'number' }) => {
  const formatValue = (val: number | string) => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'percentage':
        return `${val}%`;
      case 'currency':
        return `$${val.toLocaleString()}`;
      default:
        return val.toLocaleString();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-hive-border-default p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white text-xl`}>
          {icon}
        </div>
        {change !== undefined && (
          <div className={`flex items-center gap-1 text-sm font-medium ${
            change >= 0 ? 'text-hive-status-success' : 'text-hive-status-error'
          }`}>
            <svg className={`w-4 h-4 ${change < 0 ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      
      <div className="text-3xl font-bold text-hive-text-primary mb-2">
        {formatValue(value)}
      </div>
      
      <div className="text-sm text-hive-text-secondary">{title}</div>
    </div>
  );
};

// Simple Chart Component
const SimpleChart: React.FC<{
  data: ChartData[];
  metric: 'users' | 'spaces' | 'posts' | 'engagement';
  title: string;
  color: string;
}> = ({ data, metric, title, color }) => {
  const maxValue = Math.max(...data.map(d => d[metric]));
  const minValue = Math.min(...data.map(d => d[metric]));

  return (
    <div className="bg-white rounded-2xl border border-hive-border-default p-6">
      <h3 className="text-lg font-bold text-hive-text-primary mb-6">{title}</h3>
      
      <div className="relative h-48">
        <svg className="w-full h-full" viewBox="0 0 400 200">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line
              key={i}
              x1="40"
              y1={40 + i * 32}
              x2="380"
              y2={40 + i * 32}
              stroke="#f3f4f6"
              strokeWidth="1"
            />
          ))}
          
          {/* Chart line */}
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={data.map((d, i) => {
              const x = 40 + (i * (340 / (data.length - 1)));
              const y = 168 - ((d[metric] - minValue) / (maxValue - minValue)) * 128;
              return `${x},${y}`;
            }).join(' ')}
          />
          
          {/* Data points */}
          {data.map((d, i) => {
            const x = 40 + (i * (340 / (data.length - 1)));
            const y = 168 - ((d[metric] - minValue) / (maxValue - minValue)) * 128;
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill={color}
                className="hover:r-6 transition-all"
              />
            );
          })}
          
          {/* Y-axis labels */}
          {[0, 1, 2, 3, 4].map(i => {
            const value = minValue + (i * (maxValue - minValue) / 4);
            return (
              <text
                key={i}
                x="35"
                y={172 - i * 32}
                textAnchor="end"
                className="text-xs fill-hive-text-secondary"
              >
                {metric === 'engagement' ? `${value.toFixed(0)}%` : value.toFixed(0)}
              </text>
            );
          })}
        </svg>
      </div>
      
      <div className="flex items-center justify-between mt-4 text-sm text-hive-text-secondary">
        <span>{data[0].date}</span>
        <span>{data[data.length - 1].date}</span>
      </div>
    </div>
  );
};

// School Performance Table Component
const SchoolPerformanceTable: React.FC<{
  schools: SchoolMetrics[];
  onViewSchool: (schoolId: string) => void;
}> = ({ schools, onViewSchool }) => {
  return (
    <div className="bg-white rounded-2xl border border-hive-border-default overflow-hidden">
      <div className="p-6 border-b border-hive-border-default">
        <h3 className="text-lg font-bold text-hive-text-primary">School Performance</h3>
        <p className="text-sm text-hive-text-secondary">Usage and growth metrics by institution</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-hive-background-primary">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-hive-text-secondary">School</th>
              <th className="text-right p-4 text-sm font-medium text-hive-text-secondary">Users</th>
              <th className="text-right p-4 text-sm font-medium text-hive-text-secondary">Spaces</th>
              <th className="text-center p-4 text-sm font-medium text-hive-text-secondary">Activity</th>
              <th className="text-right p-4 text-sm font-medium text-hive-text-secondary">Growth</th>
              <th className="text-center p-4 text-sm font-medium text-hive-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((school, index) => (
              <tr key={school.id} className={index % 2 === 0 ? 'bg-white' : 'bg-hive-background-primary/50'}>
                <td className="p-4">
                  <div className="font-medium text-hive-text-primary">{school.name}</div>
                </td>
                <td className="p-4 text-right text-hive-text-primary">
                  {school.users.toLocaleString()}
                </td>
                <td className="p-4 text-right text-hive-text-primary">
                  {school.spaces.toLocaleString()}
                </td>
                <td className="p-4 text-center">
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    school.activity === 'high' ? 'bg-hive-status-success/20 text-hive-status-success' :
                    school.activity === 'medium' ? 'bg-hive-status-warning/20 text-hive-status-warning' :
                    'bg-hive-status-error/20 text-hive-status-error'
                  }`}>
                    <div className={`w-2 h-2 rounded-full ${
                      school.activity === 'high' ? 'bg-hive-status-success' :
                      school.activity === 'medium' ? 'bg-hive-status-warning' :
                      'bg-hive-status-error'
                    }`} />
                    <span className="capitalize">{school.activity}</span>
                  </div>
                </td>
                <td className="p-4 text-right">
                  <div className="flex items-center justify-end gap-1 text-hive-status-success">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">+{school.growth}%</span>
                  </div>
                </td>
                <td className="p-4 text-center">
                  <button
                    onClick={() => onViewSchool(school.id)}
                    className="px-3 py-1 bg-hive-brand-primary text-white text-sm rounded-lg hover:bg-hive-brand-primary/80 transition-colors"
                  >
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Time Range Selector Component
const TimeRangeSelector: React.FC<{
  selectedRange: string;
  onRangeChange: (range: string) => void;
}> = ({ selectedRange, onRangeChange }) => {
  const ranges = [
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
    { id: '90d', label: 'Last 90 days' },
    { id: '1y', label: 'Last year' }
  ];

  return (
    <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-hive-border-default">
      {ranges.map((range) => (
        <button
          key={range.id}
          onClick={() => onRangeChange(range.id)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            selectedRange === range.id
              ? 'bg-hive-brand-primary text-white'
              : 'text-hive-text-secondary hover:text-hive-text-primary hover:bg-hive-background-primary'
          }`}
        >
          {range.label}
        </button>
      ))}
    </div>
  );
};

// Main Platform Analytics Component
const PlatformAnalytics: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState<'users' | 'spaces' | 'posts' | 'engagement'>('users');

  const handleViewSchool = (schoolId: string) => {
    console.log('Viewing school details:', schoolId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-hive-text-primary">Platform Analytics</h1>
          <p className="text-hive-text-secondary">Real-time metrics and growth insights across the HIVE platform</p>
        </div>
        
        <TimeRangeSelector
          selectedRange={selectedTimeRange}
          onRangeChange={setSelectedTimeRange}
        />
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Users"
          value={PLATFORM_METRICS.totalUsers}
          change={PLATFORM_METRICS.userGrowthRate}
          icon="👥"
          color="bg-gradient-to-br from-blue-500 to-indigo-600"
        />
        
        <MetricCard
          title="Active Spaces"
          value={PLATFORM_METRICS.activeSpaces}
          change={PLATFORM_METRICS.spaceGrowthRate}
          icon="🏠"
          color="bg-gradient-to-br from-green-500 to-emerald-600"
        />
        
        <MetricCard
          title="Engagement Rate"
          value={PLATFORM_METRICS.engagementRate}
          change={5.2}
          icon="📊"
          color="bg-gradient-to-br from-purple-500 to-pink-600"
          format="percentage"
        />
        
        <MetricCard
          title="User Retention"
          value={PLATFORM_METRICS.retentionRate}
          change={2.8}
          icon="🎯"
          color="bg-gradient-to-br from-orange-500 to-red-600"
          format="percentage"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SimpleChart
          data={CHART_DATA}
          metric="users"
          title="User Growth Trend"
          color="#3b82f6"
        />
        
        <SimpleChart
          data={CHART_DATA}
          metric="spaces"
          title="Space Creation Trend"
          color="#10b981"
        />
      </div>

      {/* Activity Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Daily Active Users"
          value={PLATFORM_METRICS.dailyActiveUsers}
          change={8.3}
          icon="📅"
          color="bg-gradient-to-br from-cyan-500 to-blue-600"
        />
        
        <MetricCard
          title="Weekly Active Users"
          value={PLATFORM_METRICS.weeklyActiveUsers}
          change={12.1}
          icon="📊"
          color="bg-gradient-to-br from-indigo-500 to-purple-600"
        />
        
        <MetricCard
          title="Monthly Active Users"
          value={PLATFORM_METRICS.monthlyActiveUsers}
          change={15.7}
          icon="📈"
          color="bg-gradient-to-br from-pink-500 to-rose-600"
        />
      </div>

      {/* School Performance Table */}
      <SchoolPerformanceTable
        schools={SCHOOL_METRICS}
        onViewSchool={handleViewSchool}
      />

      {/* Additional Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SimpleChart
          data={CHART_DATA}
          metric="posts"
          title="Content Creation Trend"
          color="#8b5cf6"
        />
        
        <SimpleChart
          data={CHART_DATA}
          metric="engagement"
          title="Platform Engagement Rate"
          color="#f59e0b"
        />
      </div>
    </div>
  );
};

export const BasicPlatformAnalytics: Story = {
  name: '⚡ Basic Platform Analytics',
  render: () => {
    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-7xl mx-auto">
          <PlatformAnalytics />
        </div>
      </div>
    );
  }
};