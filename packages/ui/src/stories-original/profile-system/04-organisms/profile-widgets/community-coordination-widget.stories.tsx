import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

const meta = {
  title: 'Profile System/04-Organisms/Profile Widgets/Community Coordination Widget',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE Community Coordination Widget (1x2/2x1) - Smart space management with activity feeds, member coordination, and community engagement. Your social coordination hub.'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Community Activity Interface
interface CommunityActivity {
  id: string;
  type: 'event' | 'post' | 'tool' | 'member' | 'coordination';
  title: string;
  spaceName: string;
  spaceId: string;
  author: string;
  timestamp: string;
  priority: 'high' | 'medium' | 'low';
  participantCount?: number;
  rsvpStatus?: 'going' | 'maybe' | 'not_going';
  isUrgent?: boolean;
}

// Community Space Interface
interface CommunitySpace {
  id: string;
  name: string;
  type: 'academic' | 'residential' | 'social' | 'professional';
  memberCount: number;
  role: 'leader' | 'member' | 'invited';
  activityLevel: 'high' | 'medium' | 'low';
  unreadCount: number;
  recentActivity: string;
  color: string;
}

// Widget Data Interface
interface CommunityWidgetData {
  spaces: CommunitySpace[];
  recentActivities: CommunityActivity[];
  totalUnread: number;
  urgentCount: number;
  leadershipCount: number;
  settings: {
    showAllSpaces: boolean;
    prioritizeLeadership: boolean;
    groupByType: boolean;
    hideInactive: boolean;
  };
}

// Widget State Types
type WidgetState = 'loading' | 'error' | 'empty' | 'loaded';

// Community Coordination Widget Component
const CommunityCoordinationWidget = ({ 
  data,
  size = '1x2',
  isEditMode = false,
  state = 'loaded',
  onSpaceClick,
  onActivityClick,
  onSpaceManage,
  onSettingsChange,
  className = ''
}: {
  data?: CommunityWidgetData;
  size?: '1x2' | '2x1';
  isEditMode?: boolean;
  state?: WidgetState;
  onSpaceClick?: (spaceId: string) => void;
  onActivityClick?: (activityId: string) => void;
  onSpaceManage?: () => void;
  onSettingsChange?: () => void;
  className?: string;
}) => {
  const [activeTab, setActiveTab] = useState<'spaces' | 'activity'>('spaces');

  // Default data for demo
  const defaultData: CommunityWidgetData = {
    spaces: [
      {
        id: '1',
        name: 'CS Study Group',
        type: 'academic',
        memberCount: 24,
        role: 'leader',
        activityLevel: 'high',
        unreadCount: 5,
        recentActivity: '3 new posts about final prep',
        color: 'bg-blue-500'
      },
      {
        id: '2',
        name: 'Floor 3 Community',
        type: 'residential',
        memberCount: 32,
        role: 'member',
        activityLevel: 'medium',
        unreadCount: 2,
        recentActivity: 'Pizza party planning tonight',
        color: 'bg-green-500'
      },
      {
        id: '3',
        name: 'HiveLAB Builders',
        type: 'professional',
        memberCount: 18,
        role: 'leader',
        activityLevel: 'high',
        unreadCount: 8,
        recentActivity: 'New tool deployment ready',
        color: 'bg-purple-500'
      },
      {
        id: '4',
        name: 'Campus Photography',
        type: 'social',
        memberCount: 45,
        role: 'member',
        activityLevel: 'low',
        unreadCount: 0,
        recentActivity: 'Photo walk this weekend',
        color: 'bg-orange-500'
      }
    ],
    recentActivities: [
      {
        id: '1',
        type: 'event',
        title: 'Final Study Session',
        spaceName: 'CS Study Group',
        spaceId: '1',
        author: 'Marcus W.',
        timestamp: '2 hours ago',
        priority: 'high',
        participantCount: 12,
        rsvpStatus: 'going',
        isUrgent: true
      },
      {
        id: '2',
        type: 'coordination',
        title: 'Pizza Order Coordination',
        spaceName: 'Floor 3 Community',
        spaceId: '2',
        author: 'Emma R.',
        timestamp: '4 hours ago',
        priority: 'medium',
        participantCount: 8
      },
      {
        id: '3',
        type: 'tool',
        title: 'New Calendar Sync Tool',
        spaceName: 'HiveLAB Builders',
        spaceId: '3',
        author: 'You',
        timestamp: '6 hours ago',
        priority: 'medium',
        participantCount: 5
      },
      {
        id: '4',
        type: 'post',
        title: 'Weekend Photo Walk',
        spaceName: 'Campus Photography',
        spaceId: '4',
        author: 'Alex C.',
        timestamp: '1 day ago',
        priority: 'low',
        participantCount: 3
      }
    ],
    totalUnread: 15,
    urgentCount: 1,
    leadershipCount: 2,
    settings: {
      showAllSpaces: true,
      prioritizeLeadership: true,
      groupByType: false,
      hideInactive: false
    }
  };

  const widgetData = data || defaultData;

  // Get activity type styling
  const getActivityTypeStyle = (type: string) => {
    switch (type) {
      case 'event':
        return { icon: '📅', color: 'text-hive-brand-secondary' };
      case 'post':
        return { icon: '💬', color: 'text-hive-text-primary' };
      case 'tool':
        return { icon: '🛠️', color: 'text-hive-status-success' };
      case 'member':
        return { icon: '👤', color: 'text-hive-status-info' };
      case 'coordination':
        return { icon: '🎯', color: 'text-hive-status-warning' };
      default:
        return { icon: '📋', color: 'text-hive-text-secondary' };
    }
  };

  // Get space type styling
  const getSpaceTypeStyle = (type: string) => {
    switch (type) {
      case 'academic':
        return { icon: '📚', color: 'text-blue-600' };
      case 'residential':
        return { icon: '🏠', color: 'text-green-600' };
      case 'social':
        return { icon: '🎉', color: 'text-orange-600' };
      case 'professional':
        return { icon: '💼', color: 'text-purple-600' };
      default:
        return { icon: '🏢', color: 'text-hive-text-secondary' };
    }
  };

  // Get role badge
  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'leader':
        return { label: 'Leader', icon: '🌟', style: 'bg-hive-brand-secondary/10 text-hive-brand-secondary border-hive-brand-secondary/20' };
      case 'member':
        return { label: 'Member', icon: '👥', style: 'bg-hive-text-secondary/10 text-hive-text-secondary border-hive-text-secondary/20' };
      case 'invited':
        return { label: 'Invited', icon: '✉️', style: 'bg-hive-status-warning/10 text-hive-status-warning border-hive-status-warning/20' };
      default:
        return { label: '', icon: '', style: '' };
    }
  };

  // Render widget states
  const renderWidgetState = () => {
    switch (state) {
      case 'loading':
        return (
          <div className="space-y-4 animate-pulse">
            <div className="flex gap-2">
              <div className="h-6 bg-hive-background-secondary rounded w-16"></div>
              <div className="h-6 bg-hive-background-secondary rounded w-20"></div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-hive-background-secondary rounded-full"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-hive-background-secondary rounded w-3/4"></div>
                    <div className="h-2 bg-hive-background-secondary rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'error':
        return (
          <div className="text-center space-y-3">
            <div className="text-hive-status-error text-2xl">⚠️</div>
            <div className="text-sm text-hive-text-secondary">Failed to load communities</div>
            <button 
              onClick={() => window.location.reload()}
              className="px-3 py-1 text-xs bg-hive-brand-secondary text-white rounded hover:bg-hive-brand-secondary/90 transition-colors"
            >
              Retry
            </button>
          </div>
        );
      
      case 'empty':
        return (
          <div className="text-center space-y-3">
            <div className="text-hive-text-tertiary text-2xl">🏢</div>
            <div className="text-sm text-hive-text-secondary">No communities yet</div>
            <button 
              onClick={() => {}}
              className="px-3 py-1 text-xs bg-hive-background-secondary text-hive-text-primary rounded hover:bg-hive-background-secondary/80 transition-colors"
            >
              Discover spaces
            </button>
          </div>
        );
      
      default:
        return renderLoadedState();
    }
  };

  // Render loaded state with full functionality
  const renderLoadedState = () => {
    const displaySpaces = widgetData.spaces.slice(0, size === '1x2' ? 3 : 4);
    const displayActivities = widgetData.recentActivities.slice(0, size === '1x2' ? 4 : 3);

    return (
      <div className="space-y-4">
        {/* Stats Row */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-3">
            {widgetData.urgentCount > 0 && (
              <div className="flex items-center gap-1 text-hive-status-error">
                <div className="w-2 h-2 bg-hive-status-error rounded-full"></div>
                <span className="font-medium">{widgetData.urgentCount} urgent</span>
              </div>
            )}
            {widgetData.leadershipCount > 0 && (
              <div className="flex items-center gap-1 text-hive-brand-secondary">
                <span>🌟</span>
                <span className="font-medium">{widgetData.leadershipCount} leading</span>
              </div>
            )}
          </div>
          <div className="text-hive-text-tertiary">
            {widgetData.totalUnread} unread
          </div>
        </div>

        {/* Navigation Tabs - Only for 2x1 size */}
        {size === '2x1' && (
          <div className="flex border-b border-hive-border-default">
            <button
              onClick={() => setActiveTab('spaces')}
              className={`
                px-3 py-1 text-xs font-medium transition-colors
                ${activeTab === 'spaces' 
                  ? 'text-hive-brand-secondary border-b-2 border-hive-brand-secondary' 
                  : 'text-hive-text-secondary hover:text-hive-text-primary'
                }
              `}
            >
              Spaces ({widgetData.spaces.length})
            </button>
            <button
              onClick={() => setActiveTab('activity')}
              className={`
                px-3 py-1 text-xs font-medium transition-colors
                ${activeTab === 'activity' 
                  ? 'text-hive-brand-secondary border-b-2 border-hive-brand-secondary' 
                  : 'text-hive-text-secondary hover:text-hive-text-primary'
                }
              `}
            >
              Activity ({widgetData.recentActivities.length})
            </button>
          </div>
        )}

        {/* Content */}
        <div className="space-y-3">
          {(size === '1x2' || activeTab === 'spaces') && (
            <div className="space-y-2">
              {displaySpaces.map((space) => {
                const typeStyle = getSpaceTypeStyle(space.type);
                const roleBadge = getRoleBadge(space.role);
                
                return (
                  <div
                    key={space.id}
                    onClick={() => onSpaceClick?.(space.id)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-hive-background-primary/50 transition-colors cursor-pointer group"
                  >
                    {/* Space Icon */}
                    <div className={`w-8 h-8 ${space.color} rounded-lg flex items-center justify-center text-white text-sm`}>
                      <span>{typeStyle.icon}</span>
                    </div>

                    {/* Space Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-hive-text-primary truncate">
                          {space.name}
                        </span>
                        {space.role === 'leader' && (
                          <span className="text-xs">🌟</span>
                        )}
                        {space.unreadCount > 0 && (
                          <div className="px-1.5 py-0.5 bg-hive-brand-secondary text-white text-xs rounded-full font-medium min-w-[16px] text-center">
                            {space.unreadCount > 9 ? '9+' : space.unreadCount}
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-hive-text-tertiary">
                        <span>{space.memberCount} members</span>
                        {size === '2x1' && (
                          <span>•</span>
                        )}
                        {size === '2x1' && space.recentActivity && (
                          <span className="truncate">{space.recentActivity}</span>
                        )}
                      </div>
                    </div>

                    {/* Activity Level Indicator */}
                    <div className={`
                      w-2 h-2 rounded-full
                      ${space.activityLevel === 'high' ? 'bg-hive-status-success' : 
                        space.activityLevel === 'medium' ? 'bg-hive-status-warning' : 
                        'bg-hive-text-tertiary'}
                    `} />
                  </div>
                );
              })}
            </div>
          )}

          {/* Recent Activities - Show in 1x2 or when activity tab active */}
          {(size === '1x2' || activeTab === 'activity') && size === '2x1' && (
            <div className="space-y-2">
              {displayActivities.map((activity) => {
                const typeStyle = getActivityTypeStyle(activity.type);
                
                return (
                  <div
                    key={activity.id}
                    onClick={() => onActivityClick?.(activity.id)}
                    className="flex items-start gap-2 p-2 rounded-lg hover:bg-hive-background-primary/50 transition-colors cursor-pointer"
                  >
                    {/* Activity Icon */}
                    <div className={`${typeStyle.color} text-sm mt-0.5`}>
                      {typeStyle.icon}
                    </div>

                    {/* Activity Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-hive-text-primary truncate">
                          {activity.title}
                        </span>
                        {activity.isUrgent && (
                          <div className="w-2 h-2 bg-hive-status-error rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2 text-xs text-hive-text-secondary">
                        <span>{activity.spaceName}</span>
                        <span>•</span>
                        <span>{activity.author}</span>
                        <span>•</span>
                        <span>{activity.timestamp}</span>
                      </div>

                      {activity.participantCount && (
                        <div className="flex items-center gap-1 text-xs text-hive-text-tertiary mt-1">
                          <span>👥</span>
                          <span>{activity.participantCount} participants</span>
                          {activity.rsvpStatus && (
                            <>
                              <span>•</span>
                              <span className={`
                                font-medium
                                ${activity.rsvpStatus === 'going' ? 'text-hive-status-success' :
                                  activity.rsvpStatus === 'maybe' ? 'text-hive-status-warning' :
                                  'text-hive-status-error'}
                              `}>
                                {activity.rsvpStatus === 'going' ? 'Going' :
                                 activity.rsvpStatus === 'maybe' ? 'Maybe' : 'Not going'}
                              </span>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        {!isEditMode && (
          <div className="flex items-center justify-between pt-2 border-t border-hive-border-default">
            <button
              onClick={onSpaceManage}
              className="text-xs text-hive-text-secondary hover:text-hive-text-primary transition-colors"
            >
              Manage spaces
            </button>
            
            <button
              onClick={() => {}}
              className="text-xs text-hive-brand-secondary hover:text-hive-brand-secondary/80 transition-colors flex items-center gap-1"
            >
              <span>+</span>
              <span>Join space</span>
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`
      relative bg-white border border-hive-border-default rounded-xl p-4 h-full
      ${isEditMode ? 'border-hive-brand-secondary/50 shadow-lg' : ''}
      transition-all duration-200 group
      ${className}
    `}>
      {/* Widget Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-hive-brand-secondary rounded text-white text-xs flex items-center justify-center font-bold">
            C
          </div>
          <span className="text-xs font-medium text-hive-text-secondary">
            Communities {size === '2x1' && `(${size})`}
          </span>
        </div>
        
        {/* Widget Actions */}
        {!isEditMode && (
          <div className="flex items-center gap-1">
            <button
              onClick={onSettingsChange}
              className="w-5 h-5 text-hive-text-tertiary hover:text-hive-text-primary transition-colors"
              title="Community Settings" 
            >
              ⚙️
            </button>
          </div>
        )}
      </div>

      {/* Widget Content */}
      <div className={isEditMode ? 'pointer-events-none opacity-75' : ''}>
        {renderWidgetState()}
      </div>

      {/* Edit Mode Overlay */}
      {isEditMode && (
        <div className="absolute inset-0 bg-hive-brand-secondary/5 rounded-xl flex items-center justify-center">
          <div className="text-xs text-hive-text-secondary font-medium">
            Community Coordination Widget ({size})
          </div>
        </div>
      )}
    </div>
  );
};

// =========================
// COMMUNITY WIDGET STORIES
// =========================

export const CommunityCoordinationWidgetSystem: Story = {
  name: '🏢 Community Coordination Widget System',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-hive-text-primary">Community Coordination Widget System</h1>
          <p className="text-xl text-hive-text-secondary max-w-3xl mx-auto">
            Smart space management with activity feeds, member coordination, and community engagement - your social coordination hub.
          </p>
        </div>

        {/* Widget States */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Widget States</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Loading</h3>
              <div className="w-full h-80">
                <CommunityCoordinationWidget state="loading" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Error</h3>
              <div className="w-full h-80">
                <CommunityCoordinationWidget state="error" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Empty</h3>
              <div className="w-full h-80">
                <CommunityCoordinationWidget state="empty" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Loaded</h3>
              <div className="w-full h-80">
                <CommunityCoordinationWidget state="loaded" />
              </div>
            </div>
          </div>
        </div>

        {/* Widget Sizes */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Widget Sizes</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">1x2 (Vertical)</h3>
              <div className="w-full h-96">
                <CommunityCoordinationWidget size="1x2" />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">2x1 (Horizontal)</h3>
              <div className="w-full h-80">
                <CommunityCoordinationWidget size="2x1" />
              </div>
            </div>
          </div>
        </div>

        {/* Space Types */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Space Types</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white text-2xl mx-auto">
                  📚
                </div>
                <div>
                  <div className="text-sm font-bold text-hive-text-primary">Academic</div>
                  <div className="text-xs text-hive-text-secondary">Study groups, classes, projects</div>
                </div>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center text-white text-2xl mx-auto">
                  🏠
                </div>
                <div>
                  <div className="text-sm font-bold text-hive-text-primary">Residential</div>
                  <div className="text-xs text-hive-text-secondary">Dorms, floors, living communities</div>
                </div>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center text-white text-2xl mx-auto">
                  🎉
                </div>
                <div>
                  <div className="text-sm font-bold text-hive-text-primary">Social</div>
                  <div className="text-xs text-hive-text-secondary">Clubs, interests, activities</div>
                </div>
              </div>

              <div className="text-center space-y-3">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center text-white text-2xl mx-auto">
                  💼
                </div>
                <div>
                  <div className="text-sm font-bold text-hive-text-primary">Professional</div>
                  <div className="text-xs text-hive-text-secondary">Work, internships, networking</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Types */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Activity Types</h2>
          <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center space-y-2">
                <div className="text-2xl">📅</div>
                <div className="text-sm font-medium text-hive-text-primary">Events</div>
                <div className="text-xs text-hive-text-secondary">Meetings, activities</div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-2xl">💬</div>
                <div className="text-sm font-medium text-hive-text-primary">Posts</div>
                <div className="text-xs text-hive-text-secondary">Discussions, updates</div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-2xl">🛠️</div>
                <div className="text-sm font-medium text-hive-text-primary">Tools</div>
                <div className="text-xs text-hive-text-secondary">HiveLAB creations</div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-2xl">👤</div>
                <div className="text-sm font-medium text-hive-text-primary">Members</div>
                <div className="text-xs text-hive-text-secondary">Joins, leaves</div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-2xl">🎯</div>
                <div className="text-sm font-medium text-hive-text-primary">Coordination</div>
                <div className="text-xs text-hive-text-secondary">Planning, organization</div>
              </div>
            </div>
          </div>
        </div>

        {/* Edit Mode Demo */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-hive-text-primary">Edit Mode</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Normal Mode</h3>
              <div className="w-full h-80">
                <CommunityCoordinationWidget />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-hive-text-primary">Edit Mode Active</h3>
              <div className="w-full h-80">
                <CommunityCoordinationWidget isEditMode={true} />
              </div>
            </div>
          </div>
        </div>

        {/* Business Logic Documentation */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-8">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-6">Community Coordination Business Logic</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">Smart Space Management</h3>
              <div className="space-y-3 text-sm text-hive-text-secondary">
                <div>• <strong>Leadership Priority</strong>: Spaces you lead appear first with elevated importance</div>
                <div>• <strong>Activity Intelligence</strong>: Sorting by engagement level and recent coordination needs</div>
                <div>• <strong>Unread Aggregation</strong>: Smart counting of unread posts, events, and coordination requests</div>
                <div>• <strong>Context Awareness</strong>: Academic spaces prioritized during study periods</div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-hive-text-primary">Social Coordination Features</h3>
              <div className="space-y-3 text-sm text-hive-text-secondary">
                <div>• <strong>Real-time Activity</strong>: Live feed of coordination requests and community events</div>
                <div>• <strong>RSVP Integration</strong>: Quick event responses with participant tracking</div>
                <div>• <strong>Cross-Space Coordination</strong>: Connect activities between related communities</div>
                <div>• <strong>Urgency Detection</strong>: Time-sensitive coordination surfaces automatically</div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-hive-border-default">
            <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Widget Integration</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-hive-text-secondary">
              <div>
                <div className="font-medium text-hive-text-primary mb-2">Size: 1x2 / 2x1</div>
                <div>Adaptive layout - vertical 1x2 focuses on spaces, horizontal 2x1 includes activity tabs</div>
              </div>
              <div>
                <div className="font-medium text-hive-text-primary mb-2">Position: Right Side</div>
                <div>Typically positioned on the right side for quick community access and coordination overview</div>
              </div>
              <div>
                <div className="font-medium text-hive-text-primary mb-2">Interactions</div>
                <div>Space navigation, activity responses, member management, and community discovery</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export const CommunityWidgetInGrid: Story = {
  name: '🎯 Community in Bento Grid',
  render: () => (
    <div className="min-h-screen bg-hive-background-primary p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-hive-text-primary">Community Widget in Bento Grid</h1>
          <p className="text-lg text-hive-text-secondary">
            Demonstration of Community Coordination Widget in both 1x2 and 2x1 configurations within the profile layout
          </p>
        </div>

        {/* 1x2 Configuration */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-hive-text-primary">1x2 Configuration</h2>
          <div className="grid gap-4 auto-rows-[200px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {/* Avatar + Priority */}
            <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
              <div className="text-center text-hive-text-secondary">
                <div className="text-2xl mb-2">👤</div>
                <div className="text-sm font-medium">Avatar Widget</div>
                <div className="text-xs">1x1 size</div>
              </div>
            </div>

            <div className="col-span-2 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
              <div className="text-center text-hive-text-secondary">
                <div className="text-2xl mb-2">📋</div>
                <div className="text-sm font-medium">Priority Coordination</div>
                <div className="text-xs">2x1 size</div>
              </div>
            </div>

            {/* Community Widget 1x2 */}
            <div className="col-span-1 row-span-2">
              <CommunityCoordinationWidget size="1x2" />
            </div>

            {/* Calendar */}
            <div className="col-span-2 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
              <div className="text-center text-hive-text-secondary">
                <div className="text-2xl mb-2">📅</div>
                <div className="text-sm font-medium">Social Calendar Widget</div>
                <div className="text-xs">2x1 size</div>
              </div>
            </div>

            {/* Privacy */}
            <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
              <div className="text-center text-hive-text-secondary">
                <div className="text-2xl mb-2">🔒</div>
                <div className="text-sm font-medium">Privacy Control</div>
                <div className="text-xs">1x1 size</div>
              </div>
            </div>
          </div>
        </div>

        {/* 2x1 Configuration */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-hive-text-primary">2x1 Configuration</h2>
          <div className="grid gap-4 auto-rows-[200px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {/* Top Row */}
            <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
              <div className="text-center text-hive-text-secondary">
                <div className="text-2xl mb-2">👤</div>
                <div className="text-sm font-medium">Avatar Widget</div>
                <div className="text-xs">1x1 size</div>
              </div>
            </div>

            <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
              <div className="text-center text-hive-text-secondary">
                <div className="text-2xl mb-2">📋</div>
                <div className="text-sm font-medium">Priority Widget</div>
                <div className="text-xs">1x1 size</div>
              </div>
            </div>

            <div className="col-span-2 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
              <div className="text-center text-hive-text-secondary">
                <div className="text-2xl mb-2">📅</div>
                <div className="text-sm font-medium">Social Calendar Widget</div>
                <div className="text-xs">2x1 size</div>
              </div>
            </div>

            {/* Community Widget 2x1 */}
            <div className="col-span-2 row-span-1">
              <CommunityCoordinationWidget size="2x1" />
            </div>

            <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
              <div className="text-center text-hive-text-secondary">
                <div className="text-2xl mb-2">🔒</div>
                <div className="text-sm font-medium">Privacy Control</div>
                <div className="text-xs">1x1 size</div>
              </div>
            </div>

            <div className="col-span-1 row-span-1 bg-white border border-hive-border-default rounded-xl p-4 flex items-center justify-center">
              <div className="text-center text-hive-text-secondary">
                <div className="text-2xl mb-2">⚙️</div>
                <div className="text-sm font-medium">Other Widget</div>
                <div className="text-xs">1x1 size</div>
              </div>
            </div>
          </div>
        </div>

        {/* Widget Analysis */}
        <div className="bg-hive-background-secondary border border-hive-border-default rounded-xl p-6">
          <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Community Widget Role in Profile System</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-hive-text-secondary">
            <div>
              <div className="font-medium text-hive-text-primary mb-2">Social Coordination Hub</div>
              <div>Central management for all community spaces with prioritized view of coordination needs and member activities</div>
            </div>
            <div>
              <div className="font-medium text-hive-text-primary mb-2">Leadership Management</div>
              <div>Special handling for spaces where you're a leader, with enhanced coordination tools and member management features</div>
            </div>
            <div>
              <div className="font-medium text-hive-text-primary mb-2">Activity Intelligence</div>
              <div>Smart filtering and prioritization of community activities based on urgency, participation, and social context</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};