/**
 * Cross-Slice Integration - Campus Command Center Hub
 * Provides integration components connecting Profile with Spaces, Tools, Feed, and Events
 * 
 * Built using HIVE foundation systems and molecules:
 * - All molecule components for consistent UI patterns
 * - Campus-specific integration features
 * - Real-time cross-slice data flow
 * - Mobile-first responsive design
 */

import React, { useState, useCallback } from 'react';
import { cn } from '../lib/utils';

// Molecule imports
import { UserIdentity } from '../../atomic/molecules/user-identity';
import { SocialInteraction, type SocialActionData } from '../../atomic/molecules/social-interaction';
import { ComprehensiveCard } from '../../atomic/molecules/comprehensive-card';
import { NavigationMenu, type NavigationItem } from '../../atomic/molecules/navigation-menu';
import { ComprehensiveFormField } from '../../atomic/molecules/form-field';

// Foundation system imports
import { typographyComposition } from '../../atomic/foundations/typography-composition';
import { colorComposition } from '../../atomic/foundations/color-composition';
import { layoutComposition } from '../../atomic/foundations/layout-composition';
import { 
  iconComposition,
  Users,
  Hammer,
  Calendar,
  Activity,
  TrendingUp,
  MapPin,
  Clock,
  Star,
  MessageSquare,
  Share2,
  Plus,
  ExternalLink,
  Bell,
  Zap,
  Target,
  Bookmark,
  Filter,
  Search,
  RefreshCw,
  ArrowRight,
  ChevronRight,
  Home,
  Settings
} from '../../atomic/foundations/icon-composition';
import { motionComposition } from '../../atomic/foundations/motion-composition';
import { shadowComposition } from '../../atomic/foundations/shadow-composition';
import { borderComposition } from '../../atomic/foundations/border-composition';

// === CROSS-SLICE DATA TYPES ===
export interface SpaceData {
  id: string;
  name: string;
  type: 'dorm' | 'major' | 'club' | 'class' | 'interest';
  memberCount: number;
  unreadCount: number;
  lastActivity: Date;
  isActive: boolean;
  role?: 'leader' | 'admin' | 'member';
  avatar?: string;
}

export interface ToolData {
  id: string;
  name: string;
  category: 'academic' | 'social' | 'utility' | 'event';
  usage: number;
  rating: number;
  isOwned: boolean;
  lastUsed?: Date;
  spaceId?: string;
  spaceName?: string;
}

export interface EventData {
  id: string;
  title: string;
  type: 'academic' | 'social' | 'ritual' | 'meeting';
  startTime: Date;
  location?: string;
  spaceId?: string;
  spaceName?: string;
  attendeeCount: number;
  isRSVP: boolean;
}

export interface ActivityData {
  id: string;
  type: 'space_join' | 'tool_create' | 'event_attend' | 'connection_made' | 'post_create';
  timestamp: Date;
  title: string;
  description: string;
  user: {
    id: string;
    name: string;
    avatar?: string;
  };
  metadata?: {
    spaceId?: string;
    spaceName?: string;
    toolId?: string;
    toolName?: string;
    eventId?: string;
    eventName?: string;
  };
}

// === QUICK ACTIONS DATA ===
export interface QuickActionData {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
  badge?: number;
  campus?: boolean;
  category: 'space' | 'tool' | 'event' | 'social';
}

// === CROSS-SLICE INTEGRATION PROPS ===
export interface CrossSliceIntegrationProps {
  // Data from different slices
  spaces?: SpaceData[];
  tools?: ToolData[];
  events?: EventData[];
  recentActivity?: ActivityData[];
  
  // Quick actions configuration
  quickActions?: QuickActionData[];
  showQuickActions?: boolean;
  
  // Integration features
  showSpaceActivity?: boolean;
  showToolUsage?: boolean;
  showUpcomingEvents?: boolean;
  showCampusActivity?: boolean;
  
  // Campus optimization
  campusOptimized?: boolean;
  
  // Callbacks for cross-slice navigation
  onSpaceClick?: (spaceId: string) => void;
  onToolClick?: (toolId: string) => void;
  onEventClick?: (eventId: string) => void;
  onActivityClick?: (activityId: string) => void;
  onQuickAction?: (actionId: string) => void;
  
  // Data refresh
  onRefresh?: () => void;
  isLoading?: boolean;
  
  className?: string;
}

// === SPACES INTEGRATION WIDGET ===
export interface SpacesIntegrationProps {
  spaces: SpaceData[];
  onSpaceClick?: (spaceId: string) => void;
  onViewAll?: () => void;
  className?: string;
}

export const SpacesIntegration = React.forwardRef<HTMLDivElement, SpacesIntegrationProps>(
  ({ spaces, onSpaceClick, onViewAll, className }, ref) => {
    const prioritySpaces = spaces
      .filter(space => space.isActive)
      .sort((a, b) => b.unreadCount - a.unreadCount || b.memberCount - a.memberCount)
      .slice(0, 4);
    
    const totalUnread = spaces.reduce((sum, space) => sum + space.unreadCount, 0);
    
    return (
      <ComprehensiveCard
        ref={ref}
        title="Active Spaces"
        subtitle={`${spaces.length} spaces, ${totalUnread} updates`}
        badge={totalUnread > 0 ? totalUnread.toString() : undefined}
        icon={Users}
        variant="interactive"
        campus="space"
        size="comfortable"
        menuActions={[
          { id: 'view-all', label: 'View All Spaces', icon: ExternalLink },
          { id: 'create', label: 'Create Space', icon: Plus }
        ]}
        onActionClick={(actionId) => {
          if (actionId === 'view-all') onViewAll?.();
        }}
        className={className}
      >
        <div className="space-y-3">
          {prioritySpaces.map((space) => (
            <button
              key={space.id}
              onClick={() => onSpaceClick?.(space.id)}
              className={cn(
                'w-full p-3 rounded-lg',
                'bg-[var(--hive-bg-subtle)] hover:bg-[var(--hive-bg-tertiary)]',
                'border border-[var(--hive-border-subtle)]',
                'focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20',
                `transition-colors duration-[${motionComposition.durations.fast.ms}]`
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <UserIdentity
                    name={space.name}
                    avatar={space.avatar}
                    status={space.isActive ? 'online' : 'offline'}
                    role={space.role}
                    size="small"
                    layout="horizontal"
                    showHandle={false}
                  />
                  <div className="flex flex-col items-end">
                    <span className={cn(
                      'font-[var(--hive-font-family-primary)]',
                      'text-xs text-[var(--hive-text-muted)]'
                    )}>
                      {space.memberCount} members
                    </span>
                    {space.unreadCount > 0 && (
                      <span className={cn(
                        'mt-1 px-2 py-0.5 rounded-full',
                        'bg-[var(--hive-info-primary)] text-[var(--hive-bg-primary)]',
                        'font-[var(--hive-font-family-primary)]',
                        'text-xs font-medium'
                      )}>
                        {space.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
                <ChevronRight className={cn(
                  iconComposition.sizes.small.className,
                  'text-[var(--hive-text-muted)]'
                )} />
              </div>
            </button>
          ))}
          
          {spaces.length > 4 && (
            <button
              onClick={onViewAll}
              className={cn(
                'w-full p-2 text-center rounded-lg',
                'text-[var(--hive-info-primary)] hover:bg-[var(--hive-info-background)]',
                'font-[var(--hive-font-family-primary)] text-sm font-medium',
                `transition-colors duration-[${motionComposition.durations.fast.ms}]`
              )}
            >
              View All {spaces.length} Spaces
            </button>
          )}
        </div>
      </ComprehensiveCard>
    );
  }
);

SpacesIntegration.displayName = 'SpacesIntegration';

// === TOOLS INTEGRATION WIDGET ===
export interface ToolsIntegrationProps {
  tools: ToolData[];
  onToolClick?: (toolId: string) => void;
  onViewAll?: () => void;
  className?: string;
}

export const ToolsIntegration = React.forwardRef<HTMLDivElement, ToolsIntegrationProps>(
  ({ tools, onToolClick, onViewAll, className }, ref) => {
    const myTools = tools.filter(tool => tool.isOwned).slice(0, 3);
    const recentTools = tools
      .filter(tool => tool.lastUsed && !tool.isOwned)
      .sort((a, b) => (b.lastUsed?.getTime() || 0) - (a.lastUsed?.getTime() || 0))
      .slice(0, 2);
    
    return (
      <ComprehensiveCard
        ref={ref}
        title="My Tools"
        subtitle={`${myTools.length} created, ${recentTools.length} recent`}
        icon={Hammer}
        variant="interactive"
        campus="tool"
        size="comfortable"
        menuActions={[
          { id: 'create', label: 'Create Tool', icon: Plus },
          { id: 'workshop', label: 'Tool Workshop', icon: Zap },
          { id: 'view-all', label: 'View All Tools', icon: ExternalLink }
        ]}
        onActionClick={(actionId) => {
          if (actionId === 'view-all') onViewAll?.();
        }}
        className={className}
      >
        <div className="space-y-4">
          {/* My Tools */}
          {myTools.length > 0 && (
            <div>
              <h4 className={cn(
                'font-[var(--hive-font-family-primary)]',
                'font-medium text-sm',
                'text-[var(--hive-text-secondary)]',
                'mb-2'
              )}>
                Tools I Built
              </h4>
              <div className="space-y-2">
                {myTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => onToolClick?.(tool.id)}
                    className={cn(
                      'w-full p-3 rounded-lg',
                      'bg-[var(--hive-bg-subtle)] hover:bg-[var(--hive-bg-tertiary)]',
                      'border border-[var(--hive-border-subtle)]',
                      'text-left',
                      `transition-colors duration-[${motionComposition.durations.fast.ms}]`
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className={cn(
                          'font-[var(--hive-font-family-primary)]',
                          'font-medium',
                          'text-[var(--hive-text-primary)]'
                        )}>
                          {tool.name}
                        </h5>
                        {tool.spaceName && (
                          <p className={cn(
                            'font-[var(--hive-font-family-primary)]',
                            'text-xs text-[var(--hive-text-muted)]'
                          )}>
                            Used in {tool.spaceName}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Star className={cn(
                          iconComposition.sizes.small.className,
                          'text-[var(--hive-gold-primary)]'
                        )} />
                        <span className={cn(
                          'font-[var(--hive-font-family-primary)]',
                          'text-sm font-medium',
                          'text-[var(--hive-text-secondary)]'
                        )}>
                          {tool.rating.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Recent Tools */}
          {recentTools.length > 0 && (
            <div>
              <h4 className={cn(
                'font-[var(--hive-font-family-primary)]',
                'font-medium text-sm',
                'text-[var(--hive-text-secondary)]',
                'mb-2'
              )}>
                Recently Used
              </h4>
              <div className="space-y-2">
                {recentTools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => onToolClick?.(tool.id)}
                    className={cn(
                      'w-full p-3 rounded-lg',
                      'bg-[var(--hive-bg-subtle)] hover:bg-[var(--hive-bg-tertiary)]',
                      'border border-[var(--hive-border-subtle)]',
                      'text-left',
                      `transition-colors duration-[${motionComposition.durations.fast.ms}]`
                    )}
                  >
                    <h5 className={cn(
                      'font-[var(--hive-font-family-primary)]',
                      'font-medium',
                      'text-[var(--hive-text-primary)]'
                    )}>
                      {tool.name}
                    </h5>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </ComprehensiveCard>
    );
  }
);

ToolsIntegration.displayName = 'ToolsIntegration';

// === EVENTS INTEGRATION WIDGET ===
export interface EventsIntegrationProps {
  events: EventData[];
  onEventClick?: (eventId: string) => void;
  onViewAll?: () => void;
  className?: string;
}

export const EventsIntegration = React.forwardRef<HTMLDivElement, EventsIntegrationProps>(
  ({ events, onEventClick, onViewAll, className }, ref) => {
    const upcomingEvents = events
      .filter(event => event.startTime > new Date())
      .sort((a, b) => a.startTime.getTime() - b.startTime.getTime())
      .slice(0, 3);
    
    const formatEventTime = (date: Date) => {
      const now = new Date();
      const diffHours = (date.getTime() - now.getTime()) / (1000 * 60 * 60);
      
      if (diffHours < 24) {
        return `${Math.round(diffHours)}h`;
      } else {
        const diffDays = Math.round(diffHours / 24);
        return `${diffDays}d`;
      }
    };
    
    return (
      <ComprehensiveCard
        ref={ref}
        title="Upcoming Events"
        subtitle={`${upcomingEvents.length} this week`}
        icon={Calendar}
        variant="interactive"
        campus="event"
        size="comfortable"
        menuActions={[
          { id: 'create', label: 'Create Event', icon: Plus },
          { id: 'calendar', label: 'View Calendar', icon: Calendar },
          { id: 'view-all', label: 'View All Events', icon: ExternalLink }
        ]}
        onActionClick={(actionId) => {
          if (actionId === 'view-all') onViewAll?.();
        }}
        className={className}
      >
        <div className="space-y-3">
          {upcomingEvents.length > 0 ? upcomingEvents.map((event) => (
            <button
              key={event.id}
              onClick={() => onEventClick?.(event.id)}
              className={cn(
                'w-full p-3 rounded-lg',
                'bg-[var(--hive-bg-subtle)] hover:bg-[var(--hive-bg-tertiary)]',
                'border border-[var(--hive-border-subtle)]',
                'text-left',
                `transition-colors duration-[${motionComposition.durations.fast.ms}]`
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h5 className={cn(
                    'font-[var(--hive-font-family-primary)]',
                    'font-medium',
                    'text-[var(--hive-text-primary)]',
                    'truncate'
                  )}>
                    {event.title}
                  </h5>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1">
                      <Clock className={cn(
                        iconComposition.sizes.small.className,
                        'text-[var(--hive-text-muted)]'
                      )} />
                      <span className={cn(
                        'font-[var(--hive-font-family-primary)]',
                        'text-xs text-[var(--hive-text-muted)]'
                      )}>
                        in {formatEventTime(event.startTime)}
                      </span>
                    </div>
                    {event.location && (
                      <div className="flex items-center gap-1">
                        <MapPin className={cn(
                          iconComposition.sizes.small.className,
                          'text-[var(--hive-text-muted)]'
                        )} />
                        <span className={cn(
                          'font-[var(--hive-font-family-primary)]',
                          'text-xs text-[var(--hive-text-muted)]',
                          'truncate'
                        )}>
                          {event.location}
                        </span>
                      </div>
                    )}
                  </div>
                  {event.spaceName && (
                    <p className={cn(
                      'font-[var(--hive-font-family-primary)]',
                      'text-xs text-[var(--hive-info-primary)]',
                      'mt-1'
                    )}>
                      {event.spaceName}
                    </p>
                  )}
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={cn(
                    'px-2 py-1 rounded-full',
                    'font-[var(--hive-font-family-primary)]',
                    'text-xs font-medium',
                    event.isRSVP 
                      ? 'bg-[var(--hive-success-background)] text-[var(--hive-success-primary)]'
                      : 'bg-[var(--hive-bg-subtle)] text-[var(--hive-text-muted)]'
                  )}>
                    {event.isRSVP ? 'RSVP\'d' : 'RSVP'}
                  </span>
                  <span className={cn(
                    'font-[var(--hive-font-family-primary)]',
                    'text-xs text-[var(--hive-text-muted)]'
                  )}>
                    {event.attendeeCount} going
                  </span>
                </div>
              </div>
            </button>
          )) : (
            <div className="text-center py-6">
              <Calendar className={cn(
                iconComposition.sizes.large.className,
                'text-[var(--hive-text-muted)]',
                'mx-auto mb-2'
              )} />
              <p className={cn(
                'font-[var(--hive-font-family-primary)]',
                'text-sm text-[var(--hive-text-muted)]'
              )}>
                No upcoming events
              </p>
            </div>
          )}
        </div>
      </ComprehensiveCard>
    );
  }
);

EventsIntegration.displayName = 'EventsIntegration';

// === ACTIVITY INTEGRATION WIDGET ===
export interface ActivityIntegrationProps {
  activities: ActivityData[];
  onActivityClick?: (activityId: string) => void;
  onViewAll?: () => void;
  className?: string;
}

export const ActivityIntegration = React.forwardRef<HTMLDivElement, ActivityIntegrationProps>(
  ({ activities, onActivityClick, onViewAll, className }, ref) => {
    const recentActivities = activities.slice(0, 4);
    
    const getActivityIcon = (type: ActivityData['type']) => {
      switch (type) {
        case 'space_join': return Users;
        case 'tool_create': return Hammer;
        case 'event_attend': return Calendar;
        case 'connection_made': return Activity;
        case 'post_create': return MessageSquare;
        default: return Activity;
      }
    };
    
    const formatActivityTime = (date: Date) => {
      const now = new Date();
      const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      
      if (diffMinutes < 60) {
        return `${diffMinutes}m ago`;
      } else if (diffMinutes < 1440) {
        return `${Math.floor(diffMinutes / 60)}h ago`;
      } else {
        return `${Math.floor(diffMinutes / 1440)}d ago`;
      }
    };
    
    return (
      <ComprehensiveCard
        ref={ref}
        title="Campus Activity"
        subtitle="Your recent interactions"
        icon={Activity}
        variant="interactive"
        campus="activity"
        size="comfortable"
        menuActions={[
          { id: 'view-all', label: 'View All Activity', icon: ExternalLink },
          { id: 'filter', label: 'Filter Activity', icon: Filter }
        ]}
        onActionClick={(actionId) => {
          if (actionId === 'view-all') onViewAll?.();
        }}
        className={className}
      >
        <div className="space-y-3">
          {recentActivities.map((activity) => {
            const IconComponent = getActivityIcon(activity.type);
            return (
              <button
                key={activity.id}
                onClick={() => onActivityClick?.(activity.id)}
                className={cn(
                  'w-full p-3 rounded-lg',
                  'bg-[var(--hive-bg-subtle)] hover:bg-[var(--hive-bg-tertiary)]',
                  'border border-[var(--hive-border-subtle)]',
                  'text-left',
                  `transition-colors duration-[${motionComposition.durations.fast.ms}]`
                )}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    'p-2 rounded-lg',
                    'bg-[var(--hive-gold-background)]',
                    'border border-[var(--hive-gold-border)]',
                    'flex-shrink-0'
                  )}>
                    <IconComponent className={cn(
                      iconComposition.sizes.small.className,
                      'text-[var(--hive-gold-primary)]'
                    )} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h5 className={cn(
                      'font-[var(--hive-font-family-primary)]',
                      'font-medium',
                      'text-[var(--hive-text-primary)]',
                      'truncate'
                    )}>
                      {activity.title}
                    </h5>
                    <p className={cn(
                      'font-[var(--hive-font-family-primary)]',
                      'text-sm text-[var(--hive-text-secondary)]',
                      'truncate mt-1'
                    )}>
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <UserIdentity
                        name={activity.user.name}
                        avatar={activity.user.avatar}
                        size="small"
                        layout="horizontal"
                        showHandle={false}
                        showStatus={false}
                      />
                      <span className={cn(
                        'font-[var(--hive-font-family-primary)]',
                        'text-xs text-[var(--hive-text-muted)]'
                      )}>
                        {formatActivityTime(activity.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </ComprehensiveCard>
    );
  }
);

ActivityIntegration.displayName = 'ActivityIntegration';

// === QUICK ACTIONS WIDGET ===
export interface QuickActionsProps {
  actions: QuickActionData[];
  onAction?: (actionId: string) => void;
  className?: string;
}

export const QuickActions = React.forwardRef<HTMLDivElement, QuickActionsProps>(
  ({ actions, onAction, className }, ref) => {
    const campusActions = actions.filter(action => action.campus);
    const otherActions = actions.filter(action => !action.campus);
    
    return (
      <ComprehensiveCard
        ref={ref}
        title="Quick Actions"
        subtitle="Get things done faster"
        icon={Zap}
        variant="interactive"
        campus="action"
        size="comfortable"
        className={className}
      >
        <div className="space-y-4">
          {/* Campus Actions */}
          {campusActions.length > 0 && (
            <div>
              <h4 className={cn(
                'font-[var(--hive-font-family-primary)]',
                'font-medium text-sm',
                'text-[var(--hive-text-secondary)]',
                'mb-2'
              )}>
                Campus
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {campusActions.map((action) => {
                  const IconComponent = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => onAction?.(action.id)}
                      className={cn(
                        'p-3 rounded-lg',
                        'bg-[var(--hive-bg-subtle)] hover:bg-[var(--hive-bg-tertiary)]',
                        'border border-[var(--hive-border-subtle)]',
                        'text-left',
                        `transition-colors duration-[${motionComposition.durations.fast.ms}]`
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <IconComponent className={cn(
                          iconComposition.sizes.base.className,
                          'text-[var(--hive-gold-primary)]'
                        )} />
                        {action.badge && action.badge > 0 && (
                          <span className={cn(
                            'px-2 py-0.5 rounded-full',
                            'bg-[var(--hive-info-primary)] text-[var(--hive-bg-primary)]',
                            'font-[var(--hive-font-family-primary)]',
                            'text-xs font-medium'
                          )}>
                            {action.badge}
                          </span>
                        )}
                      </div>
                      <h5 className={cn(
                        'font-[var(--hive-font-family-primary)]',
                        'font-medium text-sm',
                        'text-[var(--hive-text-primary)]',
                        'mb-1'
                      )}>
                        {action.label}
                      </h5>
                      <p className={cn(
                        'font-[var(--hive-font-family-primary)]',
                        'text-xs text-[var(--hive-text-muted)]',
                        'line-clamp-2'
                      )}>
                        {action.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          
          {/* Other Actions */}
          {otherActions.length > 0 && (
            <div>
              <h4 className={cn(
                'font-[var(--hive-font-family-primary)]',
                'font-medium text-sm',
                'text-[var(--hive-text-secondary)]',
                'mb-2'
              )}>
                General
              </h4>
              <div className="space-y-2">
                {otherActions.map((action) => {
                  const IconComponent = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => onAction?.(action.id)}
                      className={cn(
                        'w-full p-3 rounded-lg',
                        'bg-[var(--hive-bg-subtle)] hover:bg-[var(--hive-bg-tertiary)]',
                        'border border-[var(--hive-border-subtle)]',
                        'text-left',
                        'flex items-center gap-3',
                        `transition-colors duration-[${motionComposition.durations.fast.ms}]`
                      )}
                    >
                      <IconComponent className={cn(
                        iconComposition.sizes.base.className,
                        'text-[var(--hive-text-secondary)]'
                      )} />
                      <div className="flex-1">
                        <h5 className={cn(
                          'font-[var(--hive-font-family-primary)]',
                          'font-medium',
                          'text-[var(--hive-text-primary)]'
                        )}>
                          {action.label}
                        </h5>
                        <p className={cn(
                          'font-[var(--hive-font-family-primary)]',
                          'text-sm text-[var(--hive-text-muted)]'
                        )}>
                          {action.description}
                        </p>
                      </div>
                      {action.badge && action.badge > 0 && (
                        <span className={cn(
                          'px-2 py-1 rounded-full',
                          'bg-[var(--hive-info-primary)] text-[var(--hive-bg-primary)]',
                          'font-[var(--hive-font-family-primary)]',
                          'text-xs font-medium'
                        )}>
                          {action.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </ComprehensiveCard>
    );
  }
);

QuickActions.displayName = 'QuickActions';

// === MAIN CROSS-SLICE INTEGRATION COMPONENT ===
export const CrossSliceIntegration = React.forwardRef<HTMLDivElement, CrossSliceIntegrationProps>(
  ({
    spaces = [],
    tools = [],
    events = [],
    recentActivity = [],
    quickActions = [],
    showQuickActions = true,
    showSpaceActivity = true,
    showToolUsage = true,
    showUpcomingEvents = true,
    showCampusActivity = true,
    campusOptimized = true,
    onSpaceClick,
    onToolClick,
    onEventClick,
    onActivityClick,
    onQuickAction,
    onRefresh,
    isLoading = false,
    className
  }, ref) => {
    
    const [refreshing, setRefreshing] = useState(false);
    
    const handleRefresh = useCallback(async () => {
      if (isLoading || refreshing) return;
      
      setRefreshing(true);
      try {
        await onRefresh?.();
      } finally {
        setRefreshing(false);
      }
    }, [onRefresh, isLoading, refreshing]);
    
    // Generate default quick actions if none provided
    const defaultQuickActions: QuickActionData[] = [
      {
        id: 'create-space',
        label: 'Create Space',
        description: 'Start a new community for your dorm, class, or interest',
        icon: Users,
        campus: true,
        category: 'space'
      },
      {
        id: 'build-tool',
        label: 'Build Tool',
        description: 'Create a custom solution for your community',
        icon: Hammer,
        campus: true,
        category: 'tool'
      },
      {
        id: 'plan-event',
        label: 'Plan Event',
        description: 'Organize study sessions, social events, or meetings',
        icon: Calendar,
        campus: true,
        category: 'event'
      },
      {
        id: 'find-connections',
        label: 'Find Connections',
        description: 'Discover classmates and expand your campus network',
        icon: Activity,
        campus: true,
        category: 'social'
      }
    ];
    
    const actionsToShow = quickActions.length > 0 ? quickActions : defaultQuickActions;
    
    return (
      <div
        ref={ref}
        className={cn(
          'space-y-6',
          campusOptimized && 'campus-optimized',
          className
        )}
      >
        {/* Header with Refresh */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className={cn(
              'font-[var(--hive-font-family-primary)]',
              'font-semibold text-xl',
              'text-[var(--hive-text-primary)]'
            )}>
              Campus Command Center
            </h2>
            <p className={cn(
              'font-[var(--hive-font-family-primary)]',
              'text-sm text-[var(--hive-text-secondary)]'
            )}>
              Your integrated view of spaces, tools, events, and activity
            </p>
          </div>
          
          {onRefresh && (
            <button
              onClick={handleRefresh}
              disabled={isLoading || refreshing}
              className={cn(
                'p-2 rounded-lg',
                'bg-[var(--hive-bg-subtle)] hover:bg-[var(--hive-bg-tertiary)]',
                'border border-[var(--hive-border-subtle)]',
                'focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20',
                'disabled:opacity-50',
                `transition-colors duration-[${motionComposition.durations.fast.ms}]`
              )}
            >
              <RefreshCw className={cn(
                iconComposition.sizes.base.className,
                'text-[var(--hive-text-secondary)]',
                (isLoading || refreshing) && 'animate-spin'
              )} />
            </button>
          )}
        </div>
        
        {/* Integration Widgets Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Spaces Integration */}
          {showSpaceActivity && spaces.length > 0 && (
            <SpacesIntegration
              spaces={spaces}
              onSpaceClick={onSpaceClick}
              onViewAll={() => onQuickAction?.('view-all-spaces')}
            />
          )}
          
          {/* Tools Integration */}
          {showToolUsage && tools.length > 0 && (
            <ToolsIntegration
              tools={tools}
              onToolClick={onToolClick}
              onViewAll={() => onQuickAction?.('view-all-tools')}
            />
          )}
          
          {/* Events Integration */}
          {showUpcomingEvents && (
            <EventsIntegration
              events={events}
              onEventClick={onEventClick}
              onViewAll={() => onQuickAction?.('view-all-events')}
            />
          )}
          
          {/* Activity Integration */}
          {showCampusActivity && recentActivity.length > 0 && (
            <ActivityIntegration
              activities={recentActivity}
              onActivityClick={onActivityClick}
              onViewAll={() => onQuickAction?.('view-all-activity')}
            />
          )}
          
          {/* Quick Actions */}
          {showQuickActions && (
            <QuickActions
              actions={actionsToShow}
              onAction={onQuickAction}
            />
          )}
        </div>
        
        {/* Empty State */}
        {spaces.length === 0 && tools.length === 0 && events.length === 0 && recentActivity.length === 0 && (
          <div className="text-center py-12">
            <Home className={cn(
              iconComposition.sizes.huge.className,
              'text-[var(--hive-text-muted)]',
              'mx-auto mb-4'
            )} />
            <h3 className={cn(
              'font-[var(--hive-font-family-primary)]',
              'font-semibold text-lg',
              'text-[var(--hive-text-primary)]',
              'mb-2'
            )}>
              Welcome to Your Campus Command Center
            </h3>
            <p className={cn(
              'font-[var(--hive-font-family-primary)]',
              'text-[var(--hive-text-secondary)]',
              'mb-6 max-w-md mx-auto'
            )}>
              Start by joining spaces, building tools, or attending events to see your personalized campus activity here.
            </p>
            {showQuickActions && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                {defaultQuickActions.map((action) => {
                  const IconComponent = action.icon;
                  return (
                    <button
                      key={action.id}
                      onClick={() => onQuickAction?.(action.id)}
                      className={cn(
                        'p-4 rounded-lg',
                        'bg-[var(--hive-bg-subtle)] hover:bg-[var(--hive-bg-tertiary)]',
                        'border border-[var(--hive-border-subtle)]',
                        'text-center',
                        `transition-colors duration-[${motionComposition.durations.fast.ms}]`
                      )}
                    >
                      <IconComponent className={cn(
                        iconComposition.sizes.large.className,
                        'text-[var(--hive-gold-primary)]',
                        'mx-auto mb-2'
                      )} />
                      <h4 className={cn(
                        'font-[var(--hive-font-family-primary)]',
                        'font-medium text-sm',
                        'text-[var(--hive-text-primary)]'
                      )}>
                        {action.label}
                      </h4>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

CrossSliceIntegration.displayName = 'CrossSliceIntegration';

// Export all components and types
export type {
  CrossSliceIntegrationProps,
  SpaceData,
  ToolData,
  EventData,
  ActivityData,
  QuickActionData,
  SpacesIntegrationProps,
  ToolsIntegrationProps,
  EventsIntegrationProps,
  ActivityIntegrationProps,
  QuickActionsProps
};

