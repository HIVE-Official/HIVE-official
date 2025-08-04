import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Users, Star, Shield, Activity, Calendar, MessageSquare, ThumbsUp, Share, AlertTriangle, TrendingUp, Settings, X, ArrowLeft } from 'lucide-react';

const meta = {
  title: 'Profile/02-Widgets/Community Coordination Widget',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Community Coordination Widget (1x2/2x1) - Space management with activity intelligence, leadership coordination, and community health tracking. Click to expand into Focus Mode.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Community Widget Data Interface
interface SpaceMember {
  id: string;
  name: string;
  handle: string;
  photoUrl?: string;
  role: 'member' | 'moderator' | 'leader' | 'founder';
  status: 'online' | 'offline' | 'busy' | 'studying';
  lastActive: string;
  contribution: number; // 0-100 activity score
}

interface SpaceActivity {
  id: string;
  type: 'post' | 'event' | 'tool' | 'coordination' | 'join' | 'achievement';
  title: string;
  description?: string;
  author: SpaceMember;
  timestamp: string;
  engagement: {
    likes: number;
    comments: number;
    shares: number;
  };
  urgent?: boolean;
}

interface CommunitySpace {
  id: string;
  name: string;
  description: string;
  type: 'academic' | 'residential' | 'interest' | 'professional';
  memberCount: number;
  activeToday: number;
  role: 'member' | 'moderator' | 'leader' | 'founder';
  iconUrl?: string;
  color: string;
  health: {
    activity: number; // 0-100
    engagement: number; // 0-100
    coordination: number; // 0-100
  };
  notifications: {
    unread: number;
    urgent: number;
  };
  recentActivity: SpaceActivity[];
}

interface CommunityWidgetData {
  spaces: CommunitySpace[];
  summary: {
    totalSpaces: number;
    activeSpaces: number;
    leadershipRoles: number;
    totalNotifications: number;
    coordinationScore: number; // 0-100
  };
  insights: {
    suggestion: string;
    communityHealth: string;
    growthOpportunity?: string;
  };
  recentActivity: SpaceActivity[];
}

// Focus Mode Hook
const useFocusMode = () => {
  const [focusedWidget, setFocusedWidget] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const enterFocus = (widgetId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFocusedWidget(widgetId);
      setIsTransitioning(false);
    }, 200);
  };

  const exitFocus = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setFocusedWidget(null);
      setIsTransitioning(false);
    }, 200);
  };

  return { focusedWidget, isTransitioning, enterFocus, exitFocus };
};

// Focus Overlay Component
const FocusOverlay = ({ 
  isOpen, 
  onClose, 
  title, 
  children,
  isTransitioning 
}: {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  isTransitioning: boolean;
}) => {
  if (!isOpen && !isTransitioning) return null;

  return (
    <div className={`
      fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4
      transition-all duration-200
      ${isOpen && !isTransitioning ? 'opacity-100' : 'opacity-0'}
    `}>
      <div className={`
        bg-white rounded-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden
        transform transition-all duration-200
        ${isOpen && !isTransitioning ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
      `}>
        {/* Focus Header */}
        <div className="flex items-center justify-between p-6 border-b border-hive-border-default">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-colors"
            >
              ←
            </button>
            <h2 className="text-xl font-bold text-hive-text-primary">{title}</h2>
          </div>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-colors">
              ⚙️
            </button>
            <button 
              onClick={onClose}
              className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Focus Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
          {children}
        </div>
      </div>
    </div>
  );
};

// Community Coordination Widget Component
const CommunityWidget = ({ 
  data,
  size = 'default',
  isEditMode = false,
  state = 'loaded',
  onJoinSpace,
  onCreateSpace,
  onViewSpace,
  onFocus,
  className = ''
}: {
  data?: CommunityWidgetData;
  size?: 'compact' | 'default' | 'tall';
  isEditMode?: boolean;
  state?: 'loading' | 'error' | 'empty' | 'loaded';
  onJoinSpace?: (spaceId: string) => void;
  onCreateSpace?: () => void;
  onViewSpace?: (spaceId: string) => void;
  onFocus?: () => void;
  className?: string;
}) => {
  // Demo data
  const defaultData: CommunityWidgetData = {
    spaces: [
      {
        id: 'cs-study',
        name: 'CS Study Group',
        description: 'Computer Science students coordinating study sessions and exam prep',
        type: 'academic',
        memberCount: 47,
        activeToday: 12,
        role: 'leader',
        color: 'blue-500',
        health: {
          activity: 92,
          engagement: 88,
          coordination: 95
        },
        notifications: {
          unread: 3,
          urgent: 1
        },
        recentActivity: [
          {
            id: '1',
            type: 'coordination',
            title: 'Final exam study session scheduled',
            author: { id: '1', name: 'Sarah Chen', handle: 'sarahc', role: 'leader', status: 'online', lastActive: '2 min ago', contribution: 95 },
            timestamp: '2 hours ago',
            engagement: { likes: 8, comments: 3, shares: 2 },
            urgent: true
          }
        ]
      },
      {
        id: 'floor-3',
        name: 'Floor 3 Community',
        description: 'Residential floor coordination and social activities',
        type: 'residential',
        memberCount: 32,
        activeToday: 8,
        role: 'member',
        color: 'green-500',
        health: {
          activity: 76,
          engagement: 82,
          coordination: 71
        },
        notifications: {
          unread: 1,
          urgent: 0
        },
        recentActivity: [
          {
            id: '2',
            type: 'event',
            title: 'Pizza Night - Friday 7PM',
            author: { id: '2', name: 'Alex Rivera', handle: 'alexr', role: 'member', status: 'online', lastActive: '5 min ago', contribution: 67 },
            timestamp: '4 hours ago',
            engagement: { likes: 12, comments: 8, shares: 1 }
          }
        ]
      },
      {
        id: 'hackathon',
        name: 'Campus Hackathon',
        description: 'Annual hackathon planning and team coordination',
        type: 'interest',
        memberCount: 156,
        activeToday: 24,
        role: 'moderator',
        color: 'purple-500',
        health: {
          activity: 85,
          engagement: 91,
          coordination: 87
        },
        notifications: {
          unread: 7,
          urgent: 2
        },
        recentActivity: [
          {
            id: '3',
            type: 'tool',
            title: 'Team Formation Tool launched',
            author: { id: '3', name: 'Jordan Park', handle: 'jordanp', role: 'founder', status: 'busy', lastActive: '10 min ago', contribution: 89 },
            timestamp: '6 hours ago',
            engagement: { likes: 23, comments: 15, shares: 8 }
          }
        ]
      }
    ],
    summary: {
      totalSpaces: 12,
      activeSpaces: 8,
      leadershipRoles: 3,
      totalNotifications: 11,
      coordinationScore: 87
    },
    insights: {
      suggestion: 'Your leadership in CS Study Group is driving exceptional coordination',
      communityHealth: 'Strong engagement across all spaces - consider mentoring newer members',
      growthOpportunity: 'Floor 3 Community could benefit from more structured coordination tools'
    },
    recentActivity: [
      {
        id: '1',
        type: 'coordination',
        title: 'Study session coordination successful',
        author: { id: '1', name: 'Sarah Chen', handle: 'sarahc', role: 'leader', status: 'online', lastActive: '2 min ago', contribution: 95 },
        timestamp: '2 hours ago',
        engagement: { likes: 8, comments: 3, shares: 2 }
      },
      {
        id: '2',
        type: 'achievement',
        title: 'Reached 50 members in CS Study Group',
        author: { id: '1', name: 'Sarah Chen', handle: 'sarahc', role: 'leader', status: 'online', lastActive: '2 min ago', contribution: 95 },
        timestamp: '1 day ago',
        engagement: { likes: 24, comments: 8, shares: 3 }
      }
    ]
  };

  const widgetData = data || defaultData;

  const getSpaceIcon = (type: string) => {
    switch (type) {
      case 'academic': return '📚';
      case 'residential': return '🏠';
      case 'interest': return '🎯';
      case 'professional': return '💼';
      default: return '🏢';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'founder': return '👑';
      case 'leader': return '🌟';
      case 'moderator': return '🛡️';
      case 'member': return '👤';
      default: return '👤';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'hive-status-success';
    if (score >= 70) return 'hive-status-warning';
    return 'hive-status-error';
  };

  const renderCompactView = () => (
    <div className="space-y-3">
      {/* Active Spaces Count */}
      <div className="text-center">
        <div className="text-2xl font-bold text-hive-text-primary">{widgetData.summary.activeSpaces}</div>
        <div className="text-xs text-hive-text-secondary">Active Spaces</div>
      </div>

      {/* Top Spaces */}
      <div className="space-y-2">
        {widgetData.spaces.slice(0, 3).map((space) => (
          <div key={space.id} className="flex items-center gap-2">
            <div className={`w-6 h-6 bg-${space.color} rounded text-white text-xs flex items-center justify-center`}>
              {getSpaceIcon(space.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-hive-text-primary truncate">{space.name}</div>
              <div className="text-xs text-hive-text-secondary">{space.memberCount} members</div>
            </div>
            {space.notifications.unread > 0 && (
              <div className="w-4 h-4 bg-hive-brand-secondary rounded-full text-white text-xs flex items-center justify-center">
                {space.notifications.unread}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Leadership Roles */}
      {widgetData.summary.leadershipRoles > 0 && (
        <div className="flex items-center justify-between text-xs text-hive-text-tertiary pt-2 border-t border-hive-border-default">
          <span>🌟 {widgetData.summary.leadershipRoles} leadership roles</span>
          <span>{widgetData.summary.coordinationScore}% coordination</span>
        </div>
      )}
    </div>
  );

  const renderDefaultView = () => (
    <div className="space-y-4">
      {/* Community Health Summary */}
      <div className="grid grid-cols-3 gap-3 text-center">
        <div>
          <div className="text-lg font-bold text-hive-text-primary">{widgetData.summary.activeSpaces}</div>
          <div className="text-xs text-hive-text-secondary">Active</div>
        </div>
        <div>
          <div className="text-lg font-bold text-hive-brand-secondary">{widgetData.summary.leadershipRoles}</div>
          <div className="text-xs text-hive-text-secondary">Leading</div>
        </div>
        <div>
          <div className="text-lg font-bold text-hive-text-primary">{widgetData.summary.coordinationScore}%</div>
          <div className="text-xs text-hive-text-secondary">Coordination</div>
        </div>
      </div>

      {/* Active Spaces */}
      <div className="space-y-2">
        {widgetData.spaces.slice(0, 4).map((space) => (
          <div key={space.id} className="flex items-center gap-3 p-2 hover:bg-hive-background-primary rounded-lg transition-colors">
            <div className={`w-8 h-8 bg-${space.color} rounded text-white text-sm flex items-center justify-center flex-shrink-0`}>
              {getSpaceIcon(space.type)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-hive-text-primary truncate">{space.name}</span>
                <span className="text-xs">{getRoleIcon(space.role)}</span>
              </div>
              <div className="text-xs text-hive-text-secondary">
                {space.activeToday} active today • {space.memberCount} total
              </div>
            </div>
            <div className="flex items-center gap-2">
              {space.notifications.urgent > 0 && (
                <div className="w-2 h-2 bg-hive-status-error rounded-full animate-pulse"></div>
              )}
              {space.notifications.unread > 0 && (
                <div className="w-5 h-5 bg-hive-brand-secondary rounded-full text-white text-xs flex items-center justify-center">
                  {space.notifications.unread}
                </div>
              )}
              <div className={`w-2 h-2 bg-${getHealthColor(space.health.activity)} rounded-full`}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Community Insight */}
      {widgetData.insights.suggestion && (
        <div className="p-3 bg-hive-brand-secondary/10 border border-hive-brand-secondary/20 rounded-lg">
          <div className="text-xs text-hive-brand-secondary">
            💡 {widgetData.insights.suggestion}
          </div>
        </div>
      )}
    </div>
  );

  const renderTallView = () => (
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="grid grid-cols-2 gap-4 text-center">
        <div className="p-3 bg-hive-background-primary rounded-lg">
          <div className="text-2xl font-bold text-hive-text-primary">{widgetData.summary.activeSpaces}</div>
          <div className="text-xs text-hive-text-secondary">Active Spaces</div>
        </div>
        <div className="p-3 bg-hive-background-primary rounded-lg">
          <div className="text-2xl font-bold text-hive-brand-secondary">{widgetData.summary.leadershipRoles}</div>
          <div className="text-xs text-hive-text-secondary">Leadership Roles</div>
        </div>
      </div>

      {/* All Spaces */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-hive-text-primary">Your Spaces</h4>
        {widgetData.spaces.map((space) => (
          <div key={space.id} className="space-y-2">
            <div className="flex items-center gap-3 p-3 bg-hive-background-primary rounded-lg">
              <div className={`w-10 h-10 bg-${space.color} rounded-lg text-white text-sm flex items-center justify-center flex-shrink-0`}>
                {getSpaceIcon(space.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-hive-text-primary truncate">{space.name}</span>
                  <span className="text-sm">{getRoleIcon(space.role)}</span>
                </div>
                <div className="text-xs text-hive-text-secondary">{space.description}</div>
                <div className="text-xs text-hive-text-tertiary mt-1">
                  {space.activeToday}/{space.memberCount} members active
                </div>
              </div>
              {space.notifications.unread > 0 && (
                <div className="w-6 h-6 bg-hive-brand-secondary rounded-full text-white text-xs flex items-center justify-center">
                  {space.notifications.unread}
                </div>
              )}
            </div>
            
            {/* Health Indicators */}
            <div className="grid grid-cols-3 gap-2 px-3">
              <div className="text-center">
                <div className={`text-xs font-bold text-${getHealthColor(space.health.activity)}`}>
                  {space.health.activity}%
                </div>
                <div className="text-xs text-hive-text-tertiary">Activity</div>
              </div>
              <div className="text-center">
                <div className={`text-xs font-bold text-${getHealthColor(space.health.engagement)}`}>
                  {space.health.engagement}%
                </div>
                <div className="text-xs text-hive-text-tertiary">Engagement</div>
              </div>
              <div className="text-center">
                <div className={`text-xs font-bold text-${getHealthColor(space.health.coordination)}`}>
                  {space.health.coordination}%
                </div>
                <div className="text-xs text-hive-text-tertiary">Coordination</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-hive-text-primary">Recent Activity</h4>
        {widgetData.recentActivity.slice(0, 3).map((activity) => (
          <div key={activity.id} className="flex items-start gap-2 p-2 hover:bg-hive-background-primary rounded-lg transition-colors">
            <div className="w-2 h-2 bg-hive-brand-secondary rounded-full mt-2 flex-shrink-0"></div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-hive-text-primary">{activity.title}</div>
              <div className="text-xs text-hive-text-tertiary">{activity.timestamp}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (size) {
      case 'compact': return renderCompactView();
      case 'tall': return renderTallView();
      default: return renderDefaultView();
    }
  };

  return (
    <div 
      onClick={onFocus}
      className={`
        relative bg-white border border-hive-border-default rounded-xl p-4 h-full group
        ${isEditMode ? 'border-hive-brand-secondary/50 shadow-lg' : 'cursor-pointer hover:border-hive-brand-secondary/50 hover:shadow-lg'}
        transition-all duration-200
        ${className}
      `}
    >
      {/* Widget Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-hive-brand-secondary rounded text-white text-xs flex items-center justify-center font-bold">
            🏢
          </div>
          <span className="text-xs font-medium text-hive-text-secondary">Community Coordination</span>
        </div>
        
        {/* Widget Actions */}
        {!isEditMode && (
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onCreateSpace?.();
              }}
              className="w-5 h-5 text-hive-text-tertiary hover:text-hive-text-primary transition-colors"
              title="Create Space"
            >
              ➕
            </button>
          </div>
        )}
      </div>

      {/* Widget Content */}
      <div className={`${isEditMode ? 'pointer-events-none opacity-75' : ''} group-hover:scale-[1.02] transition-transform duration-200`}>
        {renderContent()}
      </div>

      {/* Focus Hint */}
      <div className="pt-2 border-t border-hive-border-default opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <div className="text-xs text-hive-brand-secondary text-center">
          Click to expand & focus →
        </div>
      </div>

      {/* Edit Mode Overlay */}
      {isEditMode && (
        <div className="absolute inset-0 bg-hive-brand-secondary/5 rounded-xl flex items-center justify-center">
          <div className="text-xs text-hive-text-secondary font-medium">
            Community Widget ({size === 'compact' ? '1x1' : size === 'tall' ? '1x2' : '2x1'})
          </div>
        </div>
      )}
    </div>
  );
};

// Community Focus Content
const CommunityFocusContent = ({ data }: { data: CommunityWidgetData }) => {
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'spaces' | 'activity'>('overview');

  const getSpaceIcon = (type: string) => {
    switch (type) {
      case 'academic': return '📚';
      case 'residential': return '🏠';
      case 'interest': return '🎯';
      case 'professional': return '💼';
      default: return '🏢';
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'founder': return '👑';
      case 'leader': return '🌟';
      case 'moderator': return '🛡️';
      case 'member': return '👤';
      default: return '👤';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'hive-status-success';
    if (score >= 70) return 'hive-status-warning';
    return 'hive-status-error';
  };

  return (
    <div className="space-y-8">
      {/* Header with Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold text-hive-text-primary">Community Coordination</h3>
          <p className="text-hive-text-secondary">Manage your spaces, track community health, and coordinate activities</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-hive-background-secondary text-hive-text-primary border border-hive-border-default rounded-lg hover:bg-hive-background-secondary/80 transition-colors">
            🔍 Browse Spaces
          </button>
          <button className="px-4 py-2 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-colors">
            + Create Space
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-4">
        {[
          { key: 'overview', label: 'Overview', icon: '📊' },
          { key: 'spaces', label: 'Your Spaces', icon: '🏢' },
          { key: 'activity', label: 'Recent Activity', icon: '📈' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setViewMode(tab.key as any)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
              ${viewMode === tab.key 
                ? 'bg-hive-brand-secondary text-white' 
                : 'bg-hive-background-secondary text-hive-text-secondary hover:bg-hive-text-tertiary/20'
              }
            `}
          >
            <span>{tab.icon}</span>
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {viewMode === 'overview' && (
        <div className="space-y-8">
          {/* Community Health Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-hive-background-primary rounded-xl">
              <div className="text-3xl font-bold text-hive-text-primary">{data.summary.totalSpaces}</div>
              <div className="text-sm text-hive-text-secondary">Total Spaces</div>
              <div className="text-xs text-hive-text-tertiary mt-1">{data.summary.activeSpaces} active today</div>
            </div>
            
            <div className="text-center p-6 bg-hive-background-primary rounded-xl">
              <div className="text-3xl font-bold text-hive-brand-secondary">{data.summary.leadershipRoles}</div>
              <div className="text-sm text-hive-text-secondary">Leadership Roles</div>
              <div className="text-xs text-hive-text-tertiary mt-1">Across communities</div>
            </div>
            
            <div className="text-center p-6 bg-hive-background-primary rounded-xl">
              <div className="text-3xl font-bold text-hive-text-primary">{data.summary.coordinationScore}%</div>
              <div className="text-sm text-hive-text-secondary">Coordination Score</div>
              <div className="text-xs text-hive-text-tertiary mt-1">Above campus average</div>
            </div>
            
            <div className="text-center p-6 bg-hive-background-primary rounded-xl">
              <div className="text-3xl font-bold text-hive-text-primary">{data.summary.totalNotifications}</div>
              <div className="text-sm text-hive-text-secondary">Notifications</div>
              <div className="text-xs text-hive-text-tertiary mt-1">Across all spaces</div>
            </div>
          </div>

          {/* Community Insights */}
          {data.insights.suggestion && (
            <div className="bg-gradient-to-r from-hive-brand-primary/10 to-hive-brand-secondary/10 border border-hive-brand-secondary/30 rounded-xl p-6">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-hive-brand-secondary rounded-full flex items-center justify-center text-white font-bold">
                  💡
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-hive-text-primary mb-2">Community Insights</h4>
                  <p className="text-hive-text-secondary mb-3">{data.insights.suggestion}</p>
                  {data.insights.communityHealth && (
                    <div className="text-sm text-hive-brand-secondary">
                      🌟 {data.insights.communityHealth}
                    </div>
                  )}
                  {data.insights.growthOpportunity && (
                    <div className="text-sm text-hive-status-warning mt-2">
                      🚀 {data.insights.growthOpportunity}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Spaces Tab */}
      {viewMode === 'spaces' && (
        <div className="space-y-6">
          <div className="grid gap-6">
            {data.spaces.map((space) => (
              <div 
                key={space.id} 
                className="p-6 bg-hive-background-primary border border-hive-border-default rounded-xl hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  {/* Space Icon */}
                  <div className={`w-16 h-16 bg-${space.color} rounded-xl text-white text-2xl flex items-center justify-center flex-shrink-0`}>
                    {getSpaceIcon(space.type)}
                  </div>

                  {/* Space Details */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3">
                          <h4 className="text-lg font-bold text-hive-text-primary">{space.name}</h4>
                          <span className="text-lg">{getRoleIcon(space.role)}</span>
                          <span className="px-2 py-1 bg-hive-brand-secondary/10 text-hive-brand-secondary text-xs rounded-full">
                            {space.role}
                          </span>
                        </div>
                        <p className="text-hive-text-secondary mt-1">{space.description}</p>
                        
                        {/* Member Stats */}
                        <div className="flex items-center gap-4 mt-3 text-sm text-hive-text-tertiary">
                          <span>👥 {space.memberCount} members</span>
                          <span>🟢 {space.activeToday} active today</span>
                          <span className="capitalize">📊 {space.type}</span>
                        </div>
                      </div>

                      {/* Notifications */}
                      {space.notifications.unread > 0 && (
                        <div className="flex items-center gap-2">
                          {space.notifications.urgent > 0 && (
                            <div className="w-3 h-3 bg-hive-status-error rounded-full animate-pulse"></div>
                          )}
                          <div className="w-8 h-8 bg-hive-brand-secondary rounded-full text-white text-sm flex items-center justify-center">
                            {space.notifications.unread}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Health Metrics */}
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className={`text-lg font-bold text-${getHealthColor(space.health.activity)}`}>
                          {space.health.activity}%
                        </div>
                        <div className="text-xs text-hive-text-secondary">Activity</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className={`text-lg font-bold text-${getHealthColor(space.health.engagement)}`}>
                          {space.health.engagement}%
                        </div>
                        <div className="text-xs text-hive-text-secondary">Engagement</div>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg">
                        <div className={`text-lg font-bold text-${getHealthColor(space.health.coordination)}`}>
                          {space.health.coordination}%
                        </div>
                        <div className="text-xs text-hive-text-secondary">Coordination</div>
                      </div>
                    </div>

                    {/* Recent Activity */}
                    {space.recentActivity.length > 0 && (
                      <div className="mt-4 p-3 bg-white rounded-lg">
                        <div className="text-sm font-medium text-hive-text-primary mb-2">Latest Activity</div>
                        {space.recentActivity.slice(0, 2).map((activity) => (
                          <div key={activity.id} className="flex items-start gap-2 text-sm">
                            <div className="w-2 h-2 bg-hive-brand-secondary rounded-full mt-2 flex-shrink-0"></div>
                            <div>
                              <div className="text-hive-text-primary">{activity.title}</div>
                              <div className="text-hive-text-tertiary text-xs">{activity.timestamp}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-4">
                      <button className="px-4 py-2 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-colors text-sm">
                        View Space
                      </button>
                      <button className="px-4 py-2 bg-hive-background-secondary text-hive-text-primary border border-hive-border-default rounded-lg hover:bg-hive-background-secondary/80 transition-colors text-sm">
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Activity Tab */}
      {viewMode === 'activity' && (
        <div className="space-y-6">
          <div className="space-y-4">
            {data.recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 p-4 bg-hive-background-primary rounded-xl">
                <div className="w-10 h-10 bg-hive-text-tertiary rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                  {activity.author.name.split(' ').map(n => n[0]).join('')}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-hive-text-primary">{activity.title}</h4>
                      <div className="text-sm text-hive-text-secondary mt-1">
                        by {activity.author.name} • {activity.timestamp}
                      </div>
                      {activity.description && (
                        <p className="text-sm text-hive-text-tertiary mt-2">{activity.description}</p>
                      )}
                    </div>
                    
                    {activity.urgent && (
                      <div className="w-3 h-3 bg-hive-status-error rounded-full animate-pulse"></div>
                    )}
                  </div>
                  
                  {/* Engagement */}
                  <div className="flex items-center gap-4 mt-3 text-xs text-hive-text-tertiary">
                    <span>👍 {activity.engagement.likes}</span>
                    <span>💬 {activity.engagement.comments}</span>
                    <span>↗️ {activity.engagement.shares}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const CommunityCoordinationSystem: Story = {
  name: '🏢 Community Coordination Widget with Focus',
  render: () => {
    const { focusedWidget, isTransitioning, enterFocus, exitFocus } = useFocusMode();

    const demoData: CommunityWidgetData = {
      spaces: [
        {
          id: 'cs-study',
          name: 'CS Study Group',
          description: 'Computer Science students coordinating study sessions and exam prep',
          type: 'academic',
          memberCount: 47,
          activeToday: 12,
          role: 'leader',
          color: 'blue-500',
          health: {
            activity: 92,
            engagement: 88,
            coordination: 95
          },
          notifications: {
            unread: 3,
            urgent: 1
          },
          recentActivity: [
            {
              id: '1',
              type: 'coordination',
              title: 'Final exam study session scheduled',
              author: { id: '1', name: 'Sarah Chen', handle: 'sarahc', role: 'leader', status: 'online', lastActive: '2 min ago', contribution: 95 },
              timestamp: '2 hours ago',
              engagement: { likes: 8, comments: 3, shares: 2 },
              urgent: true
            }
          ]
        },
        {
          id: 'floor-3',
          name: 'Floor 3 Community',
          description: 'Residential floor coordination and social activities',
          type: 'residential',
          memberCount: 32,
          activeToday: 8,
          role: 'member',
          color: 'green-500',
          health: {
            activity: 76,
            engagement: 82,
            coordination: 71
          },
          notifications: {
            unread: 1,
            urgent: 0
          },
          recentActivity: [
            {
              id: '2',
              type: 'event',
              title: 'Pizza Night - Friday 7PM',
              author: { id: '2', name: 'Alex Rivera', handle: 'alexr', role: 'member', status: 'online', lastActive: '5 min ago', contribution: 67 },
              timestamp: '4 hours ago',
              engagement: { likes: 12, comments: 8, shares: 1 }
            }
          ]
        },
        {
          id: 'hackathon',
          name: 'Campus Hackathon',
          description: 'Annual hackathon planning and team coordination',
          type: 'interest',
          memberCount: 156,
          activeToday: 24,
          role: 'moderator',
          color: 'purple-500',
          health: {
            activity: 85,
            engagement: 91,
            coordination: 87
          },
          notifications: {
            unread: 7,
            urgent: 2
          },
          recentActivity: [
            {
              id: '3',
              type: 'tool',
              title: 'Team Formation Tool launched',
              author: { id: '3', name: 'Jordan Park', handle: 'jordanp', role: 'founder', status: 'busy', lastActive: '10 min ago', contribution: 89 },
              timestamp: '6 hours ago',
              engagement: { likes: 23, comments: 15, shares: 8 }
            }
          ]
        }
      ],
      summary: {
        totalSpaces: 12,
        activeSpaces: 8,
        leadershipRoles: 3,
        totalNotifications: 11,
        coordinationScore: 87
      },
      insights: {
        suggestion: 'Your leadership in CS Study Group is driving exceptional coordination',
        communityHealth: 'Strong engagement across all spaces - consider mentoring newer members',
        growthOpportunity: 'Floor 3 Community could benefit from more structured coordination tools'
      },
      recentActivity: [
        {
          id: '1',
          type: 'coordination',
          title: 'Study session coordination successful',
          author: { id: '1', name: 'Sarah Chen', handle: 'sarahc', role: 'leader', status: 'online', lastActive: '2 min ago', contribution: 95 },
          timestamp: '2 hours ago',
          engagement: { likes: 8, comments: 3, shares: 2 }
        },
        {
          id: '2',
          type: 'achievement',
          title: 'Reached 50 members in CS Study Group',
          author: { id: '1', name: 'Sarah Chen', handle: 'sarahc', role: 'leader', status: 'online', lastActive: '2 min ago', contribution: 95 },
          timestamp: '1 day ago',
          engagement: { likes: 24, comments: 8, shares: 3 }
        },
        {
          id: '3',
          type: 'tool',
          title: 'Launched study session coordination tool',
          author: { id: '1', name: 'Sarah Chen', handle: 'sarahc', role: 'leader', status: 'online', lastActive: '2 min ago', contribution: 95 },
          timestamp: '2 days ago',
          engagement: { likes: 15, comments: 6, shares: 4 }
        }
      ]
    };

    return (
      <div className="min-h-screen bg-hive-background-primary p-8">
        <div className="max-w-6xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-hive-text-primary">Community Coordination Widget System</h1>
            <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
              Space management with activity intelligence, leadership coordination, and community health tracking
            </p>
          </div>

          {/* Size Variants */}
          <div className="space-y-8">
            <h2 className="text-2xl font-bold text-hive-text-primary">Widget Size Variants</h2>
            
            <div className="grid gap-6">
              {/* Compact (1x1) */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Compact View (1x1)</h3>
                <div className="w-80 h-80">
                  <CommunityWidget 
                    data={demoData}
                    size="compact"
                    onFocus={() => enterFocus('community-compact')}
                  />
                </div>
              </div>

              {/* Default (2x1) */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Default View (2x1)</h3>
                <div className="w-full max-w-2xl h-80">
                  <CommunityWidget 
                    data={demoData}
                    size="default"
                    onFocus={() => enterFocus('community-default')}
                  />
                </div>
              </div>

              {/* Tall (1x2) */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Tall View (1x2)</h3>
                <div className="w-80 h-[640px]">
                  <CommunityWidget 
                    data={demoData}
                    size="tall"
                    onFocus={() => enterFocus('community-tall')}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Feature Overview */}
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Widget Features</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Community Health</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Activity Tracking</strong>: Monitor space engagement levels</div>
                  <div>• <strong>Health Metrics</strong>: Activity, engagement, coordination scores</div>
                  <div>• <strong>Leadership Insights</strong>: Track your community impact</div>
                  <div>• <strong>Growth Opportunities</strong>: AI-suggested improvements</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Coordination Intelligence</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Multi-Space Management</strong>: Coordinate across communities</div>
                  <div>• <strong>Role Recognition</strong>: Track leadership responsibilities</div>
                  <div>• <strong>Notification Prioritization</strong>: Urgent vs. regular updates</div>
                  <div>• <strong>Activity Aggregation</strong>: Cross-space activity feed</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-hive-text-primary">Focus Mode Experience</h3>
                <div className="space-y-3 text-sm text-hive-text-secondary">
                  <div>• <strong>Space Dashboard</strong>: Complete community overview</div>
                  <div>• <strong>Health Analytics</strong>: Detailed community metrics</div>
                  <div>• <strong>Activity Timeline</strong>: Comprehensive activity feed</div>
                  <div>• <strong>Space Management</strong>: Direct access to all tools</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Focus Mode Overlays */}
        <FocusOverlay
          isOpen={focusedWidget === 'community-compact' || focusedWidget === 'community-default' || focusedWidget === 'community-tall'}
          onClose={exitFocus}
          title="Community Coordination - Sarah Chen"
          isTransitioning={isTransitioning}
        >
          <CommunityFocusContent data={demoData} />
        </FocusOverlay>
      </div>
    );
  }
};