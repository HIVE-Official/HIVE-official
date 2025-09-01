/**
 * Profile Dashboard Cards - Campus Command Center
 * Uses ComprehensiveCard molecule for profile dashboard widgets
 * 
 * Built using HIVE foundation systems and molecules:
 * - ComprehensiveCard molecule for consistent card structure
 * - SocialInteraction molecule for card engagement
 * - UserIdentity molecule for user displays in cards
 * - Campus-specific dashboard widgets and cross-slice integration
 */

import React, { useState } from 'react';
import { cn } from '../lib/utils';

// Molecule imports
import { ComprehensiveCard, campusCardPresets } from '../../atomic/molecules/comprehensive-card';
import { SocialInteraction, type SocialActionData } from '../../atomic/molecules/social-interaction';
import { UserIdentity } from '../../atomic/molecules/user-identity';

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
  Star,
  Zap,
  Clock,
  MapPin,
  Bell,
  BookOpen,
  Coffee,
  Target,
  Award,
  BarChart3,
  MessageSquare,
  Share2,
  ExternalLink,
  Plus,
  ChevronRight,
  Eye,
  Heart,
  User,
  Settings
} from '../../atomic/foundations/icon-composition';
import { motionComposition } from '../../atomic/foundations/motion-composition';

// === DASHBOARD WIDGET TYPES ===
export interface SpaceActivity {
  id: string;
  name: string;
  icon?: string;
  unreadCount: number;
  lastActivity: string;
  memberCount: number;
  type: 'academic' | 'social' | 'project' | 'interest';
}

export interface ToolSummary {
  id: string;
  name: string;
  category: string;
  usageCount: number;
  rating: number;
  lastUsed: Date;
  isBuiltByUser: boolean;
}

export interface UpcomingEvent {
  id: string;
  title: string;
  type: 'class' | 'meeting' | 'social' | 'deadline';
  startTime: Date;
  location?: string;
  spaceId?: string;
  spaceName?: string;
}

export interface CampusConnection {
  id: string;
  name: string;
  handle?: string;
  avatar?: string;
  mutualConnections: number;
  lastSeen: string;
  status: 'online' | 'away' | 'offline' | 'studying';
  context?: string; // "In your CS220 class", "Lives in Ellicott", etc.
}

export interface ProfileStats {
  spacesCount: number;
  toolsBuilt: number;
  toolsUsed: number;
  connectionsCount: number;
  reputation: number;
  weeklyActive: boolean;
  campusRank?: number;
}

// === DASHBOARD CARD PROPS ===
export interface MySpacesCardProps {
  spaces: SpaceActivity[];
  onSpaceClick?: (spaceId: string) => void;
  onViewAll?: () => void;
  className?: string;
}

export interface MyToolsCardProps {
  tools: ToolSummary[];
  builderStats?: {
    totalBuilt: number;
    totalUsage: number;
    averageRating: number;
  };
  onToolClick?: (toolId: string) => void;
  onBuildNew?: () => void;
  onViewAll?: () => void;
  className?: string;
}

export interface UpcomingEventsCardProps {
  events: UpcomingEvent[];
  onEventClick?: (eventId: string) => void;
  onCreateEvent?: () => void;
  onViewCalendar?: () => void;
  className?: string;
}

export interface CampusConnectionsCardProps {
  connections: CampusConnection[];
  suggestedConnections?: CampusConnection[];
  onConnectionClick?: (userId: string) => void;
  onViewAll?: () => void;
  onDiscoverMore?: () => void;
  className?: string;
}

export interface ProfileStatsCardProps {
  stats: ProfileStats;
  onStatClick?: (statType: string) => void;
  className?: string;
}

export interface QuickActionsCardProps {
  actions?: Array<{
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    description: string;
    onClick: () => void;
  }>;
  className?: string;
}

// === MY SPACES CARD ===
export const MySpacesCard = React.forwardRef<HTMLDivElement, MySpacesCardProps>(
  ({ spaces, onSpaceClick, onViewAll, className }, ref) => {
    const totalUnread = spaces.reduce((sum, space) => sum + space.unreadCount, 0);
    
    return (
      <ComprehensiveCard
        ref={ref}
        title="My Spaces"
        subtitle={`${spaces.length} active spaces`}
        badge={totalUnread > 0 ? totalUnread.toString() : undefined}
        icon={Users}
        variant="interactive"
        campus="space"
        size="comfortable"
        actions={[
          { id: 'view-all', label: 'View All', onClick: onViewAll },
          { id: 'discover', label: 'Discover', icon: Plus }
        ]}
        className={className}
      >
        <div className="space-y-3">
          {spaces.slice(0, 4).map(space => (
            <button
              key={space.id}
              onClick={() => onSpaceClick?.(space.id)}
              className={cn(
                'w-full flex items-center justify-between p-3 rounded-lg',
                'hover:bg-[var(--hive-bg-subtle)]',
                'transition-colors',
                'text-left'
              )}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="text-xl">{space.icon || '🏠'}</div>
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-[var(--hive-text-primary)] truncate">
                    {space.name}
                  </div>
                  <div className="text-sm text-[var(--hive-text-secondary)] truncate">
                    {space.memberCount} members • {space.lastActivity}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 shrink-0">
                {space.unreadCount > 0 && (
                  <span className="px-2 py-1 text-xs font-medium bg-[var(--hive-info-background)] text-[var(--hive-info-primary)] rounded-full">
                    {space.unreadCount}
                  </span>
                )}
                <ChevronRight className={iconComposition.sizes.small.className + ' text-[var(--hive-text-muted)]'} />
              </div>
            </button>
          ))}
          
          {spaces.length === 0 && (
            <div className="text-center py-6 text-[var(--hive-text-secondary)]">
              <Users className={iconComposition.sizes.large.className + ' mx-auto mb-2 opacity-50'} />
              <p className="text-sm">Join your first space to get started</p>
            </div>
          )}
        </div>
      </ComprehensiveCard>
    );
  }
);

MySpacesCard.displayName = 'MySpacesCard';

// === MY TOOLS CARD ===
export const MyToolsCard = React.forwardRef<HTMLDivElement, MyToolsCardProps>(
  ({ tools, builderStats, onToolClick, onBuildNew, onViewAll, className }, ref) => {
    const builtTools = tools.filter(tool => tool.isBuiltByUser);
    const savedTools = tools.filter(tool => !tool.isBuiltByUser);
    
    return (
      <ComprehensiveCard
        ref={ref}
        title="My Tools"
        subtitle={`${builtTools.length} built • ${savedTools.length} saved`}
        icon={Hammer}
        variant="interactive"
        campus="tool"
        size="comfortable"
        badge={builderStats ? `${builderStats.averageRating}/5★` : undefined}
        actions={[
          { id: 'build-new', label: 'Build New', variant: 'primary', icon: Plus, onClick: onBuildNew },
          { id: 'view-all', label: 'View All', onClick: onViewAll }
        ]}
        className={className}
      >
        <div className="space-y-4">
          {/* Builder Stats */}
          {builderStats && builtTools.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 rounded-lg bg-[var(--hive-success-background)]">
                <div className="font-semibold text-[var(--hive-success-primary)]">
                  {builderStats.totalBuilt}
                </div>
                <div className="text-xs text-[var(--hive-text-secondary)]">Built</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-[var(--hive-info-background)]">
                <div className="font-semibold text-[var(--hive-info-primary)]">
                  {builderStats.totalUsage.toLocaleString()}
                </div>
                <div className="text-xs text-[var(--hive-text-secondary)]">Uses</div>
              </div>
              <div className="text-center p-3 rounded-lg bg-[var(--hive-gold-background)]">
                <div className="font-semibold text-[var(--hive-gold-primary)]">
                  {builderStats.averageRating.toFixed(1)}
                </div>
                <div className="text-xs text-[var(--hive-text-secondary)]">Rating</div>
              </div>
            </div>
          )}
          
          {/* Recent Tools */}
          <div className="space-y-2">
            {tools.slice(0, 3).map(tool => (
              <button
                key={tool.id}
                onClick={() => onToolClick?.(tool.id)}
                className={cn(
                  'w-full flex items-center justify-between p-2 rounded-md',
                  'hover:bg-[var(--hive-bg-subtle)]',
                  'transition-colors',
                  'text-left'
                )}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className={cn(
                    'p-2 rounded-md',
                    tool.isBuiltByUser 
                      ? 'bg-[var(--hive-success-background)] text-[var(--hive-success-primary)]'
                      : 'bg-[var(--hive-bg-subtle)] text-[var(--hive-text-secondary)]'
                  )}>
                    {tool.isBuiltByUser ? <Zap className="w-4 h-4" /> : <Hammer className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-[var(--hive-text-primary)] truncate">
                      {tool.name}
                    </div>
                    <div className="text-sm text-[var(--hive-text-secondary)]">
                      {tool.category} • {tool.usageCount} uses
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0 text-[var(--hive-text-muted)]">
                  <Star className="w-3 h-3 fill-current" />
                  <span className="text-xs">{tool.rating}</span>
                </div>
              </button>
            ))}
          </div>
          
          {tools.length === 0 && (
            <div className="text-center py-6 text-[var(--hive-text-secondary)]">
              <Hammer className={iconComposition.sizes.large.className + ' mx-auto mb-2 opacity-50'} />
              <p className="text-sm">Build your first tool to get started</p>
            </div>
          )}
        </div>
      </ComprehensiveCard>
    );
  }
);

MyToolsCard.displayName = 'MyToolsCard';

// === UPCOMING EVENTS CARD ===
export const UpcomingEventsCard = React.forwardRef<HTMLDivElement, UpcomingEventsCardProps>(
  ({ events, onEventClick, onCreateEvent, onViewCalendar, className }, ref) => {
    const sortedEvents = [...events].sort((a, b) => a.startTime.getTime() - b.startTime.getTime());
    const todayEvents = sortedEvents.filter(event => {
      const today = new Date();
      return event.startTime.toDateString() === today.toDateString();
    });
    
    return (
      <ComprehensiveCard
        ref={ref}
        title="Upcoming Events"
        subtitle={`${todayEvents.length} today • ${events.length} total`}
        icon={Calendar}
        variant="interactive"
        campus="event"
        size="comfortable"
        badge={todayEvents.length > 0 ? 'Today' : undefined}
        actions={[
          { id: 'create', label: 'Create Event', variant: 'primary', icon: Plus, onClick: onCreateEvent },
          { id: 'calendar', label: 'View Calendar', onClick: onViewCalendar }
        ]}
        className={className}
      >
        <div className="space-y-3">
          {sortedEvents.slice(0, 4).map(event => {
            const isToday = event.startTime.toDateString() === new Date().toDateString();
            const timeString = event.startTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
            
            return (
              <button
                key={event.id}
                onClick={() => onEventClick?.(event.id)}
                className={cn(
                  'w-full flex items-center gap-3 p-3 rounded-lg',
                  'hover:bg-[var(--hive-bg-subtle)]',
                  'transition-colors',
                  'text-left',
                  isToday && 'bg-[var(--hive-warning-background)] border border-[var(--hive-warning-border)]'
                )}
              >
                <div className={cn(
                  'p-2 rounded-md shrink-0',
                  {
                    'bg-[var(--hive-info-background)] text-[var(--hive-info-primary)]': event.type === 'class',
                    'bg-[var(--hive-success-background)] text-[var(--hive-success-primary)]': event.type === 'meeting',
                    'bg-[var(--hive-gold-background)] text-[var(--hive-gold-primary)]': event.type === 'social',
                    'bg-[var(--hive-error-background)] text-[var(--hive-error-primary)]': event.type === 'deadline'
                  }
                )}>
                  <Calendar className="w-4 h-4" />
                </div>
                
                <div className="min-w-0 flex-1">
                  <div className="font-medium text-[var(--hive-text-primary)] truncate">
                    {event.title}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[var(--hive-text-secondary)]">
                    <Clock className="w-3 h-3" />
                    <span>{isToday ? `Today ${timeString}` : event.startTime.toLocaleDateString()}</span>
                    {event.location && (
                      <>
                        <span>•</span>
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{event.location}</span>
                      </>
                    )}
                  </div>
                  {event.spaceName && (
                    <div className="text-xs text-[var(--hive-gold-primary)] truncate">
                      {event.spaceName}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
          
          {events.length === 0 && (
            <div className="text-center py-6 text-[var(--hive-text-secondary)]">
              <Calendar className={iconComposition.sizes.large.className + ' mx-auto mb-2 opacity-50'} />
              <p className="text-sm">No upcoming events</p>
            </div>
          )}
        </div>
      </ComprehensiveCard>
    );
  }
);

UpcomingEventsCard.displayName = 'UpcomingEventsCard';

// === CAMPUS CONNECTIONS CARD ===
export const CampusConnectionsCard = React.forwardRef<HTMLDivElement, CampusConnectionsCardProps>(
  ({ connections, suggestedConnections = [], onConnectionClick, onViewAll, onDiscoverMore, className }, ref) => {
    const onlineConnections = connections.filter(c => c.status === 'online' || c.status === 'studying');
    
    return (
      <ComprehensiveCard
        ref={ref}
        title="Campus Connections"
        subtitle={`${connections.length} connections • ${onlineConnections.length} active`}
        icon={Activity}
        variant="interactive" 
        campus="profile"
        size="comfortable"
        badge={onlineConnections.length > 0 ? 'Online' : undefined}
        actions={[
          { id: 'view-all', label: 'View All', onClick: onViewAll },
          { id: 'discover', label: 'Discover More', onClick: onDiscoverMore }
        ]}
        className={className}
      >
        <div className="space-y-4">
          {/* Active Connections */}
          {onlineConnections.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                Active Now
              </h4>
              <div className="space-y-2">
                {onlineConnections.slice(0, 3).map(connection => (
                  <button
                    key={connection.id}
                    onClick={() => onConnectionClick?.(connection.id)}
                    className={cn(
                      'w-full flex items-center gap-3 p-2 rounded-lg',
                      'hover:bg-[var(--hive-bg-subtle)]',
                      'transition-colors',
                      'text-left'
                    )}
                  >
                    <UserIdentity
                      name={connection.name}
                      handle={connection.handle}
                      avatar={connection.avatar}
                      status={connection.status}
                      size="small"
                      layout="horizontal"
                      interactive="none"
                      showStatus={true}
                    />
                    <div className="ml-auto text-xs text-[var(--hive-text-muted)]">
                      {connection.context}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Suggested Connections */}
          {suggestedConnections.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-[var(--hive-text-primary)] mb-2">
                You Might Know
              </h4>
              <div className="space-y-2">
                {suggestedConnections.slice(0, 2).map(connection => (
                  <div
                    key={connection.id}
                    className="flex items-center justify-between p-2 rounded-lg bg-[var(--hive-bg-subtle)]"
                  >
                    <UserIdentity
                      name={connection.name}
                      handle={connection.handle}
                      avatar={connection.avatar}
                      size="small"
                      layout="horizontal"
                      interactive="none"
                    />
                    <button
                      onClick={() => onConnectionClick?.(connection.id)}
                      className="px-3 py-1 text-xs font-medium bg-[var(--hive-gold-primary)] text-[var(--hive-bg-primary)] rounded-full hover:opacity-90"
                    >
                      Connect
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {connections.length === 0 && (
            <div className="text-center py-6 text-[var(--hive-text-secondary)]">
              <Activity className={iconComposition.sizes.large.className + ' mx-auto mb-2 opacity-50'} />
              <p className="text-sm">Connect with classmates to get started</p>
            </div>
          )}
        </div>
      </ComprehensiveCard>
    );
  }
);

CampusConnectionsCard.displayName = 'CampusConnectionsCard';

// === PROFILE STATS CARD ===
export const ProfileStatsCard = React.forwardRef<HTMLDivElement, ProfileStatsCardProps>(
  ({ stats, onStatClick, className }, ref) => {
    const statItems = [
      { key: 'spaces', label: 'Spaces', value: stats.spacesCount, icon: Users, color: 'info' },
      { key: 'tools-built', label: 'Tools Built', value: stats.toolsBuilt, icon: Hammer, color: 'success' },
      { key: 'connections', label: 'Connections', value: stats.connectionsCount, icon: Activity, color: 'warning' },
      { key: 'reputation', label: 'Reputation', value: `${stats.reputation}/5`, icon: Star, color: 'gold' }
    ];
    
    const colorMap = {
      info: 'text-[var(--hive-info-primary)] bg-[var(--hive-info-background)]',
      success: 'text-[var(--hive-success-primary)] bg-[var(--hive-success-background)]',
      warning: 'text-[var(--hive-warning-primary)] bg-[var(--hive-warning-background)]',
      gold: 'text-[var(--hive-gold-primary)] bg-[var(--hive-gold-background)]'
    };
    
    return (
      <ComprehensiveCard
        ref={ref}
        title="Your Campus Impact"
        subtitle="Activity and engagement metrics"
        icon={BarChart3}
        variant="glass"
        campus="profile"
        size="comfortable"
        badge={stats.weeklyActive ? 'Active This Week' : undefined}
        className={className}
      >
        <div className="grid grid-cols-2 gap-4">
          {statItems.map(item => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.key}
                onClick={() => onStatClick?.(item.key)}
                className={cn(
                  'flex flex-col items-center p-4 rounded-lg',
                  'hover:bg-[var(--hive-bg-subtle)]',
                  'transition-colors',
                  'text-center'
                )}
              >
                <div className={cn(
                  'p-3 rounded-full mb-2',
                  colorMap[item.color as keyof typeof colorMap]
                )}>
                  <IconComponent className={iconComposition.sizes.base.className} />
                </div>
                <div className="font-semibold text-lg text-[var(--hive-text-primary)]">
                  {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                </div>
                <div className="text-sm text-[var(--hive-text-secondary)]">
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>
        
        {stats.campusRank && (
          <div className="mt-4 p-3 rounded-lg bg-[var(--hive-gold-background)] border border-[var(--hive-gold-border)] text-center">
            <div className="text-sm text-[var(--hive-gold-primary)]">
              🏆 Ranked #{stats.campusRank} on campus
            </div>
          </div>
        )}
      </ComprehensiveCard>
    );
  }
);

ProfileStatsCard.displayName = 'ProfileStatsCard';

// === QUICK ACTIONS CARD ===
export const QuickActionsCard = React.forwardRef<HTMLDivElement, QuickActionsCardProps>(
  ({ actions = [], className }, ref) => {
    const defaultActions = [
      {
        id: 'create-space',
        label: 'Create Space',
        icon: Users,
        description: 'Start a new campus community',
        onClick: () => console.log('Create space')
      },
      {
        id: 'build-tool',
        label: 'Build Tool',
        icon: Hammer,
        description: 'Create a campus utility',
        onClick: () => console.log('Build tool')
      },
      {
        id: 'schedule-event',
        label: 'Schedule Event',
        icon: Calendar,
        description: 'Plan a campus gathering',
        onClick: () => console.log('Schedule event')
      },
      {
        id: 'find-connections',
        label: 'Find Connections',
        icon: Activity,
        description: 'Discover classmates',
        onClick: () => console.log('Find connections')
      }
    ];
    
    const actionsToShow = actions.length > 0 ? actions : defaultActions;
    
    return (
      <ComprehensiveCard
        ref={ref}
        title="Quick Actions"
        subtitle="Campus coordination at your fingertips"
        icon={Zap}
        variant="interactive"
        size="comfortable"
        className={className}
      >
        <div className="grid grid-cols-2 gap-3">
          {actionsToShow.map(action => {
            const IconComponent = action.icon;
            return (
              <button
                key={action.id}
                onClick={action.onClick}
                className={cn(
                  'flex flex-col items-center p-4 rounded-lg',
                  'border border-[var(--hive-border-subtle)]',
                  'hover:bg-[var(--hive-bg-subtle)]',
                  'hover:border-[var(--hive-border-glass-strong)]',
                  'transition-all',
                  'text-center',
                  'group'
                )}
              >
                <IconComponent className={cn(
                  iconComposition.sizes.large.className,
                  'text-[var(--hive-text-secondary)]',
                  'mb-2',
                  'group-hover:text-[var(--hive-gold-primary)]',
                  'transition-colors'
                )} />
                <div className="font-medium text-[var(--hive-text-primary)] text-sm mb-1">
                  {action.label}
                </div>
                <div className="text-xs text-[var(--hive-text-muted)]">
                  {action.description}
                </div>
              </button>
            );
          })}
        </div>
      </ComprehensiveCard>
    );
  }
);

QuickActionsCard.displayName = 'QuickActionsCard';

// === EXPORTS ===
export type {
  MySpacesCardProps,
  MyToolsCardProps, 
  UpcomingEventsCardProps,
  CampusConnectionsCardProps,
  ProfileStatsCardProps,
  QuickActionsCardProps,
  SpaceActivity,
  ToolSummary,
  UpcomingEvent,
  CampusConnection,
  ProfileStats
};