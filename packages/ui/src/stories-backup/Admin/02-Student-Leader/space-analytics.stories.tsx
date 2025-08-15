import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Admin/02-Student Leader/SpaceAnalytics',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Space-specific analytics dashboard for student leaders with member engagement, activity trends, and community health metrics'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Types
interface SpaceMetrics {
  totalMembers: number;
  activeMembers: number;
  newMembersThisWeek: number;
  memberGrowthRate: number;
  totalPosts: number;
  postsThisWeek: number;
  totalEvents: number;
  upcomingEvents: number;
  engagementRate: number;
  responseRate: number;
  communityHealth: number;
  averageSessionTime: number;
}

interface MemberEngagement {
  userId: string;
  name: string;
  avatar: string;
  joinDate: string;
  lastActive: string;
  postsCount: number;
  eventsAttended: number;
  engagementScore: number;
  role: 'member' | 'moderator' | 'leader';
}

interface ActivityData {
  date: string;
  posts: number;
  events: number;
  members: number;
  engagement: number;
}

interface PopularContent {
  id: string;
  type: 'post' | 'event' | 'announcement';
  title: string;
  author: string;
  date: string;
  reactions: number;
  comments: number;
  views: number;
}

// Demo data
const SPACE_METRICS: SpaceMetrics = {
  totalMembers: 47,
  activeMembers: 32,
  newMembersThisWeek: 5,
  memberGrowthRate: 12.3,
  totalPosts: 156,
  postsThisWeek: 23,
  totalEvents: 8,
  upcomingEvents: 3,
  engagementRate: 68.1,
  responseRate: 84.7,
  communityHealth: 87.5,
  averageSessionTime: 12.4
};

const MEMBER_ENGAGEMENT: MemberEngagement[] = [
  {
    userId: '1',
    name: 'Sarah Johnson',
    avatar: '👩‍💻',
    joinDate: '2024-01-15',
    lastActive: '2 hours ago',
    postsCount: 23,
    eventsAttended: 6,
    engagementScore: 95,
    role: 'leader'
  },
  {
    userId: '2',
    name: 'Alex Chen',
    avatar: '👨‍💻',
    joinDate: '2024-01-18',
    lastActive: '5 minutes ago',
    postsCount: 18,
    eventsAttended: 5,
    engagementScore: 89,
    role: 'moderator'
  },
  {
    userId: '3',
    name: 'Maya Patel',
    avatar: '👩‍🎓',
    joinDate: '2024-01-22',
    lastActive: '1 hour ago',
    postsCount: 15,
    eventsAttended: 4,
    engagementScore: 82,
    role: 'member'
  },
  {
    userId: '4',
    name: 'Jordan Kim',
    avatar: '👨‍🎓',
    joinDate: '2024-02-01',
    lastActive: '30 minutes ago',
    postsCount: 12,
    eventsAttended: 3,
    engagementScore: 78,
    role: 'member'
  },
  {
    userId: '5',
    name: 'Emma Wilson',
    avatar: '👩‍🔬',
    joinDate: '2024-02-05',
    lastActive: '3 hours ago',
    postsCount: 8,
    eventsAttended: 2,
    engagementScore: 65,
    role: 'member'
  }
];

const ACTIVITY_DATA: ActivityData[] = [
  { date: '2024-02-05', posts: 8, events: 1, members: 42, engagement: 65 },
  { date: '2024-02-06', posts: 12, events: 0, members: 43, engagement: 68 },
  { date: '2024-02-07', posts: 15, events: 2, members: 44, engagement: 72 },
  { date: '2024-02-08', posts: 10, events: 1, members: 45, engagement: 69 },
  { date: '2024-02-09', posts: 18, events: 0, members: 45, engagement: 75 },
  { date: '2024-02-10', posts: 14, events: 1, members: 46, engagement: 71 },
  { date: '2024-02-11', posts: 20, events: 2, members: 47, engagement: 78 }
];

const POPULAR_CONTENT: PopularContent[] = [
  {
    id: '1',
    type: 'post',
    title: 'Study session for midterm - who\'s in?',
    author: 'Sarah Johnson',
    date: '2024-02-10',
    reactions: 24,
    comments: 18,
    views: 89
  },
  {
    id: '2',
    type: 'event',
    title: 'Algorithm Problem Solving Workshop',
    author: 'Alex Chen',
    date: '2024-02-09',
    reactions: 19,
    comments: 12,
    views: 67
  },
  {
    id: '3',
    type: 'announcement',
    title: 'New study resources available in shared drive',
    author: 'Maya Patel',
    date: '2024-02-08',
    reactions: 15,
    comments: 8,
    views: 52
  }
];

// Metric Card Component
const MetricCard: React.FC<{
  title: string;
  value: number | string;
  change?: number;
  icon: string;
  color: string;
  format?: 'number' | 'percentage' | 'time';
  suffix?: string;
}> = ({ title, value, change, icon, color, format = 'number', suffix }) => {
  const formatValue = (val: number | string) => {
    if (typeof val === 'string') return val;
    
    switch (format) {
      case 'percentage':
        return `${val}%`;
      case 'time':
        return `${val}m`;
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
        {formatValue(value)}{suffix}
      </div>
      
      <div className="text-sm text-hive-text-secondary">{title}</div>
    </div>
  );
};

// Activity Chart Component
const ActivityChart: React.FC<{
  data: ActivityData[];
  metric: 'posts' | 'events' | 'members' | 'engagement';
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
          
          {/* Chart bars */}
          {data.map((d, i) => {
            const x = 40 + (i * (340 / data.length));
            const barHeight = ((d[metric] - minValue) / (maxValue - minValue)) * 128;
            const y = 168 - barHeight;
            
            return (
              <rect
                key={i}
                x={x - 15}
                y={y}
                width="30"
                height={barHeight}
                fill={color}
                className="hover:opacity-80 transition-opacity"
                rx="4"
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
        <span>Last 7 days</span>
        <span className={`text-${color.split('-')[1]}-500 font-medium`}>
          Latest: {data[data.length - 1][metric]}{metric === 'engagement' ? '%' : ''}
        </span>
      </div>
    </div>
  );
};

// Member Engagement Table Component
const MemberEngagementTable: React.FC<{
  members: MemberEngagement[];
  onViewMember: (memberId: string) => void;
  onPromoteMember: (memberId: string) => void;
}> = ({ members, onViewMember, onPromoteMember }) => {
  const getRoleBadge = (role: MemberEngagement['role']) => {
    const roleConfig = {
      leader: { color: 'bg-purple-100 text-purple-800', icon: '👑' },
      moderator: { color: 'bg-blue-100 text-blue-800', icon: '🛡️' },
      member: { color: 'bg-green-100 text-green-800', icon: '👤' }
    };

    const config = roleConfig[role];

    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
        <span>{config.icon}</span>
        <span className="capitalize">{role}</span>
      </span>
    );
  };

  const getEngagementScore = (score: number) => {
    if (score >= 90) return { color: 'text-hive-status-success', label: 'Excellent' };
    if (score >= 80) return { color: 'text-blue-600', label: 'Great' };
    if (score >= 70) return { color: 'text-hive-status-warning', label: 'Good' };
    return { color: 'text-hive-status-error', label: 'Needs Attention' };
  };

  return (
    <div className="bg-white rounded-2xl border border-hive-border-default overflow-hidden">
      <div className="p-6 border-b border-hive-border-default">
        <h3 className="text-lg font-bold text-hive-text-primary">Member Engagement</h3>
        <p className="text-sm text-hive-text-secondary">Top engaged members and their activity levels</p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-hive-background-primary">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-hive-text-secondary">Member</th>
              <th className="text-right p-4 text-sm font-medium text-hive-text-secondary">Posts</th>
              <th className="text-right p-4 text-sm font-medium text-hive-text-secondary">Events</th>
              <th className="text-center p-4 text-sm font-medium text-hive-text-secondary">Engagement</th>
              <th className="text-center p-4 text-sm font-medium text-hive-text-secondary">Role</th>
              <th className="text-center p-4 text-sm font-medium text-hive-text-secondary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => {
              const engagementInfo = getEngagementScore(member.engagementScore);
              
              return (
                <tr key={member.userId} className={index % 2 === 0 ? 'bg-white' : 'bg-hive-background-primary/50'}>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-hive-brand-primary rounded-full flex items-center justify-center text-white text-lg">
                        {member.avatar}
                      </div>
                      <div>
                        <div className="font-medium text-hive-text-primary">{member.name}</div>
                        <div className="text-sm text-hive-text-secondary">Active {member.lastActive}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-right text-hive-text-primary font-medium">
                    {member.postsCount}
                  </td>
                  <td className="p-4 text-right text-hive-text-primary font-medium">
                    {member.eventsAttended}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex flex-col items-center">
                      <div className={`font-bold ${engagementInfo.color}`}>
                        {member.engagementScore}
                      </div>
                      <div className="text-xs text-hive-text-secondary">
                        {engagementInfo.label}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    {getRoleBadge(member.role)}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onViewMember(member.userId)}
                        className="px-3 py-1 bg-hive-brand-primary text-white text-sm rounded-lg hover:bg-hive-brand-primary/80 transition-colors"
                      >
                        View
                      </button>
                      {member.role === 'member' && (
                        <button
                          onClick={() => onPromoteMember(member.userId)}
                          className="px-3 py-1 bg-white border border-hive-border-default text-hive-text-secondary text-sm rounded-lg hover:border-hive-brand-primary hover:text-hive-text-primary transition-colors"
                        >
                          Promote
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Popular Content Component
const PopularContentList: React.FC<{
  content: PopularContent[];
  onViewContent: (contentId: string) => void;
}> = ({ content, onViewContent }) => {
  const getContentIcon = (type: PopularContent['type']) => {
    switch (type) {
      case 'post': return '📝';
      case 'event': return '📅';
      case 'announcement': return '📢';
      default: return '📄';
    }
  };

  const getContentColor = (type: PopularContent['type']) => {
    switch (type) {
      case 'post': return 'bg-blue-100 text-blue-800';
      case 'event': return 'bg-green-100 text-green-800';
      case 'announcement': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-hive-border-default p-6">
      <h3 className="text-lg font-bold text-hive-text-primary mb-6">Popular Content</h3>
      
      <div className="space-y-4">
        {content.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-4 p-4 rounded-xl border border-hive-border-default hover:border-hive-brand-primary transition-colors cursor-pointer"
            onClick={() => onViewContent(item.id)}
          >
            <div className="text-2xl">{getContentIcon(item.type)}</div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <h4 className="font-medium text-hive-text-primary truncate">{item.title}</h4>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getContentColor(item.type)}`}>
                  {item.type}
                </span>
              </div>
              <div className="text-sm text-hive-text-secondary">
                By {item.author} • {item.date}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-hive-text-secondary">
              <div className="flex items-center gap-1">
                <span>❤️</span>
                <span>{item.reactions}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>💬</span>
                <span>{item.comments}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>👁️</span>
                <span>{item.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Space Analytics Component
const SpaceAnalytics: React.FC = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  const handleViewMember = (memberId: string) => {
    console.log('Viewing member:', memberId);
  };

  const handlePromoteMember = (memberId: string) => {
    console.log('Promoting member:', memberId);
  };

  const handleViewContent = (contentId: string) => {
    console.log('Viewing content:', contentId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-hive-text-primary">CS 220 Study Group Analytics</h1>
          <p className="text-hive-text-secondary">Track member engagement, activity trends, and community health</p>
        </div>
        
        <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-hive-border-default">
          {['7d', '30d', '90d'].map((range) => (
            <button
              key={range}
              onClick={() => setSelectedTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedTimeRange === range
                  ? 'bg-hive-brand-primary text-white'
                  : 'text-hive-text-secondary hover:text-hive-text-primary'
              }`}
            >
              Last {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Members"
          value={SPACE_METRICS.totalMembers}
          change={SPACE_METRICS.memberGrowthRate}
          icon="👥"
          color="bg-gradient-to-br from-blue-500 to-indigo-600"
        />
        
        <MetricCard
          title="Active Members"
          value={SPACE_METRICS.activeMembers}
          change={8.2}
          icon="✨"
          color="bg-gradient-to-br from-green-500 to-emerald-600"
        />
        
        <MetricCard
          title="Posts This Week"
          value={SPACE_METRICS.postsThisWeek}
          change={15.6}
          icon="📝"
          color="bg-gradient-to-br from-purple-500 to-pink-600"
        />
        
        <MetricCard
          title="Engagement Rate"
          value={SPACE_METRICS.engagementRate}
          change={5.3}
          icon="📊"
          color="bg-gradient-to-br from-orange-500 to-red-600"
          format="percentage"
        />
      </div>

      {/* Community Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Community Health Score"
          value={SPACE_METRICS.communityHealth}
          change={3.2}
          icon="❤️"
          color="bg-gradient-to-br from-red-500 to-pink-600"
          format="percentage"
        />
        
        <MetricCard
          title="Response Rate"
          value={SPACE_METRICS.responseRate}
          change={2.1}
          icon="💬"
          color="bg-gradient-to-br from-cyan-500 to-blue-600"
          format="percentage"
        />
        
        <MetricCard
          title="Avg Session Time"
          value={SPACE_METRICS.averageSessionTime}
          change={7.8}
          icon="⏱️"
          color="bg-gradient-to-br from-indigo-500 to-purple-600"
          format="time"
        />
      </div>

      {/* Activity Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ActivityChart
          data={ACTIVITY_DATA}
          metric="posts"
          title="Daily Posts Activity"
          color="#8b5cf6"
        />
        
        <ActivityChart
          data={ACTIVITY_DATA}
          metric="engagement"
          title="Daily Engagement Rate"
          color="#f59e0b"
        />
      </div>

      {/* Member Engagement Table */}
      <MemberEngagementTable
        members={MEMBER_ENGAGEMENT}
        onViewMember={handleViewMember}
        onPromoteMember={handlePromoteMember}
      />

      {/* Popular Content */}
      <PopularContentList
        content={POPULAR_CONTENT}
        onViewContent={handleViewContent}
      />
    </div>
  );
};

export const BasicSpaceAnalytics: Story = {
  name: '👑 Basic Space Analytics',
  render: () => {
    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-7xl mx-auto">
          <SpaceAnalytics />
        </div>
      </div>
    );
  }
};