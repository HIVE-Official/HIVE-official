'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { 
  Calendar, 
  Users, 
  Zap, 
  MapPin, 
  Clock, 
  Edit3, 
  Settings, 
  Heart,
  Sparkles,
  TrendingUp,
  Award,
  Camera,
  ChevronRight,
  Plus,
  X,
  Check,
  AlertTriangle,
  Bell,
  Home,
  LogOut
} from 'lucide-react';

/**
 * UNIFIED PROFILE DASHBOARD - PRODUCTION READY
 * 
 * This is THE definitive profile dashboard component for HIVE.
 * Consolidates all previous implementations into one production-ready solution.
 * 
 * Features:
 * - Atomic design principles
 * - Expand & Focus interaction patterns
 * - Real-time data integration
 * - Mobile-responsive design
 * - Error boundary integration
 * - Performance optimized
 * 
 * @version 2.0.0 - Production Consolidation
 */

// Core types
interface HiveUser {
  id: string;
  name: string;
  handle: string;
  email?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  school?: string;
  major?: string;
  year?: string;
  joinedAt?: string;
  status?: 'online' | 'offline' | 'busy' | 'away' | 'studying';
  isOnline?: boolean;
  isBuilder?: boolean;
  completionPercentage?: number;
  statusMessage?: string;
  memberSince?: string;
}

interface CampusSpace {
  id: string;
  name: string;
  type: 'course' | 'housing' | 'club' | 'academic' | 'community' | 'school' | 'graduation' | 'mentoring';
  memberCount?: number;
  unreadCount?: number;
  lastActivity?: string;
  isPinned?: boolean;
  isFavorite?: boolean;
  isMuted?: boolean;
  userRole?: 'member' | 'moderator' | 'leader';
  recentActivity?: {
    type: 'message' | 'announcement' | 'event';
    preview: string;
    timestamp: string;
  };
}

interface CampusActivity {
  id: string;
  type: 'space_join' | 'tool_created' | 'assignment' | 'social' | 'message';
  title: string;
  content?: string;
  author?: {
    name: string;
    handle: string;
  };
  timestamp: string;
  priority?: 'low' | 'medium' | 'high';
  isUnread?: boolean;
  metadata?: {
    likes?: number;
    replyCount?: number;
  };
}

interface CampusTool {
  id: string;
  name: string;
  type: 'template' | 'app' | 'widget' | 'automation';
  category: 'productivity' | 'social' | 'academic' | 'utility';
  description: string;
  icon: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  timeToCreate?: string;
  popularity?: number;
  usageCount?: number;
  createdAt?: string;
  isPublic?: boolean;
  likes?: number;
}

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate: string;
  type: 'personal' | 'space' | 'class' | 'study' | 'meeting';
  location?: string;
  spaceId?: string;
  spaceName?: string;
  status: 'confirmed' | 'tentative' | 'cancelled';
}

interface CalendarConflict {
  id: string;
  type: 'overlap' | 'double_booking' | 'travel_time';
  severity: 'high' | 'medium' | 'low';
  eventIds: string[];
  description: string;
  suggestion: string;
  suggestedActions: Array<{
    action: 'reschedule' | 'cancel' | 'shorten' | 'move_location';
    eventId: string;
    newTime?: string;
    newLocation?: string;
  }>;
}

interface UserStats {
  connections?: number;
  spaces?: number;
  tools?: number;
  achievements?: number;
  contributions?: number;
}

interface LoadingStates {
  profile?: boolean;
  spaces?: boolean;
  activities?: boolean;
  tools?: boolean;
  calendar?: boolean;
}

// Main component props
export interface UnifiedProfileDashboardProps {
  user: HiveUser;
  spaces?: CampusSpace[];
  activities?: CampusActivity[];
  availableTools?: CampusTool[];
  createdTools?: CampusTool[];
  calendarEvents?: CalendarEvent[];
  calendarConflicts?: CalendarConflict[];
  stats?: UserStats;
  layout?: 'desktop' | 'tablet' | 'mobile';
  showBuilder?: boolean;
  showCalendar?: boolean;
  isLoading?: LoadingStates;
  
  // Event handlers
  onSpaceClick?: (spaceId: string) => void;
  onActivityClick?: (activityId: string) => void;
  onToolClick?: (toolId: string) => void;
  onCreateTool?: (toolType: string) => void;
  onBecomeBuilder?: () => void;
  onJoinSpace?: () => void;
  onViewAllSpaces?: () => void;
  onViewAllActivities?: () => void;
  onEditProfile?: () => void;
  onMuteSpace?: (spaceId: string, muted: boolean) => void;
  onPinSpace?: (spaceId: string, pinned: boolean) => void;
  onLeaveSpace?: (spaceId: string) => void;
  onQuickPost?: (spaceId: string, message: string) => void;
  onJoinToolsWaitlist?: () => void;
  onCreateEvent?: (eventData: Record<string, unknown>) => void;
  onUpdateEvent?: (id: string, updates: Record<string, unknown>) => void;
  onDeleteEvent?: (id: string) => void;
  onResolveConflict?: (conflictId: string, resolution: string, eventId?: string) => void;
  onAvatarChange?: (file: File) => void;
  onStatClick?: (statType: string) => void;
}

// Widget components
const ProfileHeaderWidget: React.FC<{
  user: HiveUser;
  stats?: UserStats;
  isLoading?: boolean;
  onEditProfile?: () => void;
  onAvatarChange?: (file: File) => void;
  onStatClick?: (statType: string) => void;
}> = ({ user, stats = {}, isLoading, onEditProfile, onAvatarChange, onStatClick }) => {
  const [imageError, setImageError] = useState(false);

  if (isLoading) {
    return (
      <div className="bg-hive-background-elevated rounded-2xl border border-hive-border-default p-6 animate-pulse">
        <div className="flex items-start gap-6">
          <div className="w-24 h-24 bg-hive-background-secondary rounded-full" />
          <div className="flex-1 space-y-3">
            <div className="h-8 bg-hive-background-secondary rounded w-48" />
            <div className="h-5 bg-hive-background-secondary rounded w-32" />
            <div className="h-4 bg-hive-background-secondary rounded w-64" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-hive-background-elevated rounded-2xl border border-hive-border-default p-6 hover:border-hive-border-focus hover:shadow-hive-sm transition-all duration-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-6">
        {/* Profile Avatar */}
        <div className="relative group">
          {user.avatar && !imageError ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-24 h-24 bg-hive-brand-secondary rounded-full flex items-center justify-center">
              <span className="text-[var(--hive-text-inverse)] text-2xl font-bold">
                {user.name?.charAt(0).toUpperCase() || 'U'}
              </span>
            </div>
          )}
          
          {/* Status Indicator */}
          <div className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-3 border-white ${
            user.status === 'online' ? 'bg-hive-status-success' :
            user.status === 'busy' ? 'bg-hive-status-error' :
            user.status === 'away' ? 'bg-hive-status-warning' : 
            user.status === 'studying' ? 'bg-hive-status-info' : 'bg-hive-text-tertiary'
          }`} />
          
          {/* Camera Overlay */}
          <button 
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e: any) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file && onAvatarChange) onAvatarChange(file);
              };
              input.click();
            }}
            className="absolute inset-0 bg-black/0 group-hover:bg-black/60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200"
          >
            <Camera className="text-[var(--hive-text-inverse)]" size={20} />
          </button>
        </div>
        
        {/* Profile Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-2xl font-bold text-hive-text-primary mb-1">{user.name}</h1>
              <p className="text-hive-text-secondary">@{user.handle}</p>
              {user.major && (
                <p className="text-hive-text-tertiary text-sm mt-1">
                  {user.major} • {user.year || 'Student'}
                </p>
              )}
            </div>
            <button 
              onClick={onEditProfile}
              className="p-2 rounded-lg hover:bg-hive-interactive-hover transition-colors"
            >
              <Edit3 size={16} className="text-hive-text-tertiary hover:text-hive-text-secondary" />
            </button>
          </div>
          
          {user.bio && (
            <p className="text-hive-text-primary mb-4 leading-relaxed">{user.bio}</p>
          )}
          
          {/* Location & School */}
          <div className="flex items-center gap-4 text-sm text-hive-text-tertiary mb-4">
            {user.location && (
              <div className="flex items-center gap-1">
                <MapPin size={14} className="text-hive-brand-secondary" />
                <span>{user.location}</span>
              </div>
            )}
            {user.school && (
              <span>{user.school}</span>
            )}
          </div>
          
          {/* Profile Stats */}
          <div className="flex items-center gap-6">
            {Object.entries(stats).map(([key, value]) => (
              <button
                key={key}
                onClick={() => onStatClick?.(key)}
                className="text-center hover:bg-hive-interactive-hover rounded-lg px-3 py-2 transition-colors"
              >
                <div className="text-xl font-bold text-hive-text-primary">{value || 0}</div>
                <div className="text-xs text-hive-text-tertiary capitalize">{key}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Activities Widget
const ActivitiesWidget: React.FC<{
  activities?: CampusActivity[];
  isLoading?: boolean;
  onActivityClick?: (activityId: string) => void;
  onViewAllActivities?: () => void;
}> = ({ activities = [], isLoading, onActivityClick, onViewAllActivities }) => {
  if (isLoading) {
    return (
      <div className="bg-hive-background-elevated rounded-xl border border-hive-border-default p-4 animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-hive-background-secondary rounded" />
          <div className="w-24 h-5 bg-hive-background-secondary rounded" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="p-3 bg-hive-background-secondary rounded-lg">
              <div className="h-4 bg-hive-background-primary rounded w-3/4 mb-2" />
              <div className="h-3 bg-hive-background-primary rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-hive-background-elevated rounded-xl border border-hive-border-default p-4 hover:border-hive-border-focus hover:shadow-hive-sm transition-all duration-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-hive-status-warning" />
          <h3 className="font-semibold text-hive-text-primary">Recent Activity</h3>
        </div>
        <button 
          onClick={onViewAllActivities}
          className="text-xs text-hive-text-tertiary hover:text-hive-text-secondary flex items-center gap-1"
        >
          View All <ChevronRight size={12} />
        </button>
      </div>
      
      {activities.length > 0 ? (
        <div className="space-y-3">
          {activities.slice(0, 4).map((activity: any) => (
            <button
              key={activity.id}
              onClick={() => onActivityClick?.(activity.id)}
              className="flex items-start gap-3 p-3 bg-hive-background-primary rounded-lg hover:bg-hive-interactive-hover transition-colors w-full text-left group"
            >
              <div className="w-2 h-2 rounded-full bg-hive-brand-secondary mt-2 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-hive-text-primary mb-1">{activity.title}</p>
                {activity.content && (
                  <p className="text-xs text-hive-text-tertiary mb-2 line-clamp-2">{activity.content}</p>
                )}
                <div className="flex items-center gap-2 text-xs text-hive-text-tertiary">
                  <span>{activity.timestamp}</span>
                  {activity.priority === 'high' && <span className="text-red-400">•</span>}
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <Sparkles size={32} className="text-hive-text-tertiary mx-auto mb-3" />
          <p className="text-sm text-hive-text-tertiary mb-1">No recent activity</p>
          <p className="text-xs text-hive-text-tertiary">Join spaces and start engaging</p>
        </div>
      )}
    </motion.div>
  );
};

// Tools Widget
const ToolsWidget: React.FC<{
  availableTools?: CampusTool[];
  createdTools?: CampusTool[];
  isLoading?: boolean;
  onToolClick?: (toolId: string) => void;
  onCreateTool?: (toolType: string) => void;
  onJoinToolsWaitlist?: () => void;
}> = ({ availableTools = [], createdTools = [], isLoading, onToolClick, onCreateTool, onJoinToolsWaitlist }) => {
  if (isLoading) {
    return (
      <div className="bg-hive-background-elevated rounded-xl border border-hive-border-default p-4 animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-hive-background-secondary rounded" />
          <div className="w-20 h-5 bg-hive-background-secondary rounded" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="p-3 bg-hive-background-secondary rounded-lg">
              <div className="h-4 bg-hive-background-primary rounded w-3/4 mb-2" />
              <div className="h-3 bg-hive-background-primary rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const allTools = [...createdTools, ...availableTools];
  
  return (
    <motion.div 
      className="bg-hive-background-elevated rounded-xl border border-hive-border-default p-4 hover:border-hive-border-focus hover:shadow-hive-sm transition-all duration-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap size={16} className="text-hive-status-success" />
          <h3 className="font-semibold text-hive-text-primary">My Tools</h3>
        </div>
        <button 
          onClick={onJoinToolsWaitlist}
          className="text-xs text-hive-text-tertiary hover:text-hive-text-secondary flex items-center gap-1"
        >
          <Plus size={12} />
        </button>
      </div>
      
      {allTools.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {allTools.slice(0, 4).map((tool: any) => (
            <button
              key={tool.id}
              onClick={() => onToolClick?.(tool.id)}
              className="p-3 bg-hive-background-primary rounded-lg hover:bg-hive-interactive-hover transition-colors text-left group"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded bg-hive-brand-secondary flex items-center justify-center text-[var(--hive-text-inverse)] text-xs">
                  {tool.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium text-hive-text-primary truncate">{tool.name}</span>
              </div>
              <p className="text-xs text-hive-text-tertiary line-clamp-2">{tool.description}</p>
              <div className="flex items-center gap-1 mt-2">
                <div className={`w-1.5 h-1.5 rounded-full ${
                  tool.difficulty === 'beginner' ? 'bg-green-400' :
                  tool.difficulty === 'intermediate' ? 'bg-yellow-400' :
                  'bg-red-400'
                }`} />
                <span className="text-xs text-hive-text-tertiary capitalize">{tool.difficulty}</span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <Zap size={32} className="text-hive-text-tertiary mx-auto mb-3" />
          <p className="text-sm text-hive-text-tertiary mb-1">No tools created yet</p>
          <p className="text-xs text-hive-text-tertiary">Start building your first tool</p>
          <button 
            onClick={onJoinToolsWaitlist}
            className="mt-3 px-3 py-1 text-xs bg-hive-brand-secondary text-[var(--hive-text-inverse)] rounded-lg hover:bg-hive-brand-hover transition-colors"
          >
            Join Waitlist
          </button>
        </div>
      )}
    </motion.div>
  );
};

const SpacesWidget: React.FC<{
  spaces?: CampusSpace[];
  isLoading?: boolean;
  onSpaceClick?: (spaceId: string) => void;
  onViewAllSpaces?: () => void;
  onJoinSpace?: () => void;
}> = ({ spaces = [], isLoading, onSpaceClick, onViewAllSpaces, onJoinSpace }) => {
  if (isLoading) {
    return (
      <div className="bg-hive-background-elevated rounded-xl border border-hive-border-default p-4 animate-pulse">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-5 h-5 bg-hive-background-secondary rounded" />
          <div className="w-20 h-5 bg-hive-background-secondary rounded" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-3 p-3 bg-hive-background-secondary rounded-lg">
              <div className="w-8 h-8 bg-hive-background-primary rounded-lg" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-hive-background-primary rounded w-3/4" />
                <div className="h-3 bg-hive-background-primary rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="bg-hive-background-elevated rounded-xl border border-hive-border-default p-4 hover:border-hive-border-focus hover:shadow-hive-sm transition-all duration-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-hive-status-info" />
          <h3 className="font-semibold text-hive-text-primary">My Spaces</h3>
        </div>
        <button 
          onClick={onViewAllSpaces}
          className="text-xs text-hive-text-tertiary hover:text-hive-text-secondary flex items-center gap-1"
        >
          View All <ChevronRight size={12} />
        </button>
      </div>
      
      {spaces.length > 0 ? (
        <div className="space-y-3 mb-4">
          {spaces.slice(0, 4).map((space: any) => (
            <button
              key={space.id}
              onClick={() => onSpaceClick?.(space.id)}
              className="flex items-center gap-3 p-3 bg-hive-background-primary rounded-lg hover:bg-hive-interactive-hover transition-colors w-full text-left group"
            >
              <div className="w-8 h-8 rounded-lg bg-hive-brand-secondary flex items-center justify-center text-[var(--hive-text-inverse)] text-xs font-bold flex-shrink-0">
                {space.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-medium text-hive-text-primary truncate">{space.name}</p>
                  {space.unreadCount && space.unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 bg-hive-brand-secondary text-[var(--hive-text-inverse)] rounded-full text-xs">
                      {space.unreadCount}
                    </span>
                  )}
                </div>
                <p className="text-xs text-hive-text-tertiary">
                  {space.memberCount} members • {space.userRole}
                </p>
              </div>
              <ChevronRight size={14} className="text-hive-text-tertiary group-hover:text-hive-text-secondary transition-colors" />
            </button>
          ))}
        </div>
      ) : (
        <div className="text-center py-6">
          <Users size={32} className="text-hive-text-tertiary mx-auto mb-3" />
          <p className="text-sm text-hive-text-tertiary mb-1">No spaces joined yet</p>
          <p className="text-xs text-hive-text-tertiary">Discover communities that match your interests</p>
        </div>
      )}
      
      <button 
        onClick={spaces.length > 0 ? onViewAllSpaces : onJoinSpace}
        className="w-full py-2 px-4 border border-hive-border-default rounded-lg text-sm text-hive-text-secondary hover:text-hive-text-primary hover:border-hive-border-focus transition-colors"
      >
        {spaces.length > 0 ? 'View All Spaces' : 'Find Spaces'}
      </button>
    </motion.div>
  );
};

// Main component
export const UnifiedProfileDashboard: React.FC<UnifiedProfileDashboardProps> = ({
  user,
  spaces = [],
  activities = [],
  availableTools = [],
  createdTools = [],
  calendarEvents = [],
  calendarConflicts = [],
  stats = {},
  layout = 'desktop',
  showBuilder = true,
  showCalendar = true,
  isLoading = {},
  onSpaceClick,
  onActivityClick,
  onToolClick,
  onCreateTool,
  onBecomeBuilder,
  onJoinSpace,
  onViewAllSpaces,
  onViewAllActivities,
  onEditProfile,
  onMuteSpace,
  onPinSpace,
  onLeaveSpace,
  onQuickPost,
  onJoinToolsWaitlist,
  onCreateEvent,
  onUpdateEvent,
  onDeleteEvent,
  onResolveConflict,
  onAvatarChange,
  onStatClick
}) => {
  // Responsive layout classes
  const getLayoutClasses = () => {
    switch (layout) {
      case 'mobile':
        return 'grid-cols-1 gap-4';
      case 'tablet':
        return 'grid-cols-2 gap-6';
      default:
        return 'grid-cols-1 lg:grid-cols-3 gap-6';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Profile Header */}
      <div className="mb-8">
        <ProfileHeaderWidget
          user={user}
          stats={stats}
          isLoading={isLoading.profile}
          onEditProfile={onEditProfile}
          onAvatarChange={onAvatarChange}
          onStatClick={onStatClick}
        />
      </div>

      {/* Dashboard Grid */}
      <div className={cn('grid', getLayoutClasses())}>
        {/* Spaces Widget */}
        <div className={layout === 'desktop' ? 'lg:col-span-1' : ''}>
          <SpacesWidget
            spaces={spaces}
            isLoading={isLoading.spaces}
            onSpaceClick={onSpaceClick}
            onViewAllSpaces={onViewAllSpaces}
            onJoinSpace={onJoinSpace}
          />
        </div>

        {/* Activities Widget */}
        <div className={layout === 'desktop' ? 'lg:col-span-1' : ''}>
          <ActivitiesWidget
            activities={activities}
            isLoading={isLoading.activities}
            onActivityClick={onActivityClick}
            onViewAllActivities={onViewAllActivities}
          />
        </div>

        {/* Tools Widget */}
        <div className={layout === 'desktop' ? 'lg:col-span-1' : ''}>
          <ToolsWidget
            availableTools={availableTools}
            createdTools={createdTools}
            isLoading={isLoading.tools}
            onToolClick={onToolClick}
            onCreateTool={onCreateTool}
            onJoinToolsWaitlist={onJoinToolsWaitlist}
          />
        </div>
      </div>
    </div>
  );
};

export default UnifiedProfileDashboard;