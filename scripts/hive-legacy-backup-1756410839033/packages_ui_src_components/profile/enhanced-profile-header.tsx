/**
 * Enhanced Profile Header - Campus Command Center Header
 * Integrates user identity with campus-specific profile actions
 * 
 * Built using existing HIVE components for guaranteed compatibility
 */

import React from 'react';
import { cn } from '../lib/utils';

// Use existing HIVE components
import { Button } from '../ui/button';
import { HiveBadge } from '../hive-badge';
import { EnhancedUserIdentity } from './enhanced-user-identity';

// Foundation system imports
import { typographyComposition } from '../../atomic/foundations/typography-composition';
import { colorComposition } from '../../atomic/foundations/color-composition';
import { layoutComposition } from '../../atomic/foundations/layout-composition';
import { 
  iconComposition,
  Settings,
  Share2,
  UserPlus,
  MessageCircle,
  MapPin,
  Calendar,
  GraduationCap,
  Users,
  Hammer,
  Activity,
  Eye,
  EyeOff,
  Crown,
  Zap,
  Star
} from '../../atomic/foundations/icon-composition';
import { motionComposition } from '../../atomic/foundations/motion-composition';

// === PROFILE HEADER TYPES ===
export interface EnhancedProfileHeaderProps {
  // Core user data
  user: {
    id: string;
    fullName: string;
    handle?: string;
    avatar?: string;
    bio?: string;
    
    // Campus context
    major?: string;
    graduationYear?: number;
    dorm?: string;
    status?: 'online' | 'away' | 'offline' | 'studying';
    role?: 'student' | 'faculty' | 'admin' | 'leader';
    verified?: boolean;
    
    // Profile completion
    completionPercentage?: number;
    isBuilder?: boolean;
    
    // Privacy settings
    ghostMode?: boolean;
  };
  
  // Profile stats for social interaction
  stats?: {
    spacesCount: number;
    toolsCount: number;
    connectionsCount: number;
    reputation: number;
  };
  
  // Interaction state
  viewerContext?: {
    isOwnProfile: boolean;
    isConnected?: boolean;
    canMessage?: boolean;
    canConnect?: boolean;
  };
  
  // Campus features
  showCampusInfo?: boolean;
  showSocialActions?: boolean;
  showCompletionPrompt?: boolean;
  
  // Callbacks
  onEditProfile?: () => void;
  onShareProfile?: () => void;
  onConnect?: () => void;
  onMessage?: () => void;
  onToggleGhostMode?: (enabled: boolean) => void;
  onStatsClick?: (statType: string) => void;
  
  className?: string;
}

// === COMPLETION PROMPT COMPONENT ===
interface CompletionPromptProps {
  percentage: number;
  onComplete: () => void;
  className?: string;
}

const CompletionPrompt = React.forwardRef<HTMLDivElement, CompletionPromptProps>(
  ({ percentage, onComplete, className }, ref) => {
    if (percentage >= 90) return null; // Hide if mostly complete
    
    const remainingSteps = Math.ceil((100 - percentage) / 20); // Assume ~20% per major step
    
    return (
      <div
        ref={ref}
        className={cn(
          'p-4 rounded-lg',
          'bg-[var(--hive-warning-background)]',
          'border border-[var(--hive-warning-border)]',
          'border-l-4 border-l-[var(--hive-warning-primary)]',
          className
        )}
      >
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Star className={cn(
                iconComposition.sizes.small.className,
                'text-[var(--hive-warning-primary)]'
              )} />
              <h4 className={cn(
                'font-[var(--hive-font-family-primary)]',
                'font-semibold',
                `text-[${typographyComposition.scale.base.size}]`,
                'text-[var(--hive-text-primary)]'
              )}>
                Complete Your Profile
              </h4>
            </div>
            
            <p className={cn(
              'font-[var(--hive-font-family-primary)]',
              `text-[${typographyComposition.scale.small.size}]`,
              'text-[var(--hive-text-secondary)]',
              'mb-3'
            )}>
              Add {remainingSteps} more details to unlock campus recommendations and better space discovery.
            </p>
            
            {/* Progress bar */}
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-[var(--hive-bg-subtle)] rounded-full h-2">
                <div 
                  className="bg-[var(--hive-warning-primary)] h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className={cn(
                'font-[var(--hive-font-family-primary)]',
                'font-medium',
                'text-[var(--hive-warning-primary)]',
                'text-sm'
              )}>
                {percentage}%
              </span>
            </div>
          </div>
          
          <button
            onClick={onComplete}
            className={cn(
              'ml-4 px-3 py-1.5 rounded-md',
              'bg-[var(--hive-warning-primary)]',
              'text-[var(--hive-bg-primary)]',
              'font-[var(--hive-font-family-primary)]',
              'font-medium',
              'text-sm',
              'hover:opacity-90',
              `transition-opacity duration-[${motionComposition.durations.fast.ms}]`
            )}
          >
            Complete
          </button>
        </div>
      </div>
    );
  }
);

CompletionPrompt.displayName = 'CompletionPrompt';

// === CAMPUS INFO COMPONENT ===
interface CampusInfoProps {
  major?: string;
  graduationYear?: number;
  dorm?: string;
  className?: string;
}

const CampusInfo = React.forwardRef<HTMLDivElement, CampusInfoProps>(
  ({ major, graduationYear, dorm, className }, ref) => {
    const campusDetails = [
      major && { icon: GraduationCap, label: `${major} ${graduationYear ? `'${graduationYear.toString().slice(-2)}` : ''}` },
      dorm && { icon: MapPin, label: dorm }
    ].filter(Boolean);
    
    if (campusDetails.length === 0) return null;
    
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-wrap items-center gap-4',
          className
        )}
      >
        {campusDetails.map((detail, index) => {
          const IconComponent = detail.icon;
          return (
            <div key={index} className="flex items-center gap-2">
              <IconComponent className={cn(
                iconComposition.sizes.small.className,
                'text-[var(--hive-text-muted)]'
              )} />
              <span className={cn(
                'font-[var(--hive-font-family-primary)]',
                `text-[${typographyComposition.scale.small.size}]`,
                'text-[var(--hive-text-secondary)]'
              )}>
                {detail.label}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
);

CampusInfo.displayName = 'CampusInfo';

// === PROFILE STATS COMPONENT ===
interface ProfileStatsProps {
  stats: {
    spacesCount: number;
    toolsCount: number;
    connectionsCount: number;
    reputation: number;
  };
  onStatsClick?: (statType: string) => void;
  className?: string;
}

const ProfileStats = React.forwardRef<HTMLDivElement, ProfileStatsProps>(
  ({ stats, onStatsClick, className }, ref) => {
    const statItems = [
      { key: 'spaces', label: 'Spaces', value: stats.spacesCount, icon: Users },
      { key: 'tools', label: 'Tools', value: stats.toolsCount, icon: Hammer },
      { key: 'connections', label: 'Connections', value: stats.connectionsCount, icon: Activity },
      { key: 'reputation', label: 'Reputation', value: `${stats.reputation}/5`, icon: Star }
    ];
    
    return (
      <div
        ref={ref}
        className={cn(
          'grid grid-cols-4 gap-1',
          className
        )}
      >
        {statItems.map(item => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => onStatsClick?.(item.key)}
              className={cn(
                'flex flex-col items-center p-3 rounded-lg',
                'hover:bg-[var(--hive-bg-subtle)]',
                'focus:outline-none focus:ring-2 focus:ring-[var(--hive-gold-primary)]/20',
                `transition-colors duration-[${motionComposition.durations.fast.ms}]`
              )}
            >
              <IconComponent className={cn(
                iconComposition.sizes.base.className,
                'text-[var(--hive-text-secondary)]',
                'mb-1'
              )} />
              <span className={cn(
                'font-[var(--hive-font-family-primary)]',
                'font-semibold',
                `text-[${typographyComposition.scale.base.size}]`,
                'text-[var(--hive-text-primary)]'
              )}>
                {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
              </span>
              <span className={cn(
                'font-[var(--hive-font-family-primary)]',
                `text-[${typographyComposition.scale.caption.size}]`,
                'text-[var(--hive-text-muted)]'
              )}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    );
  }
);

ProfileStats.displayName = 'ProfileStats';

// === MAIN COMPONENT ===
export const EnhancedProfileHeader = React.forwardRef<HTMLDivElement, EnhancedProfileHeaderProps>(
  ({
    user,
    stats,
    viewerContext = { isOwnProfile: true },
    showCampusInfo = true,
    showSocialActions = true,
    showCompletionPrompt = true,
    onEditProfile,
    onShareProfile,
    onConnect,
    onMessage,
    onToggleGhostMode,
    onStatsClick,
    className
  }, ref) => {
    
    const [ghostMode, setGhostMode] = useState(user.ghostMode || false);
    
    // Social actions based on viewer context
    const socialActions: SocialActionData[] = [];
    
    if (viewerContext.isOwnProfile) {
      socialActions.push(
        { type: 'like', count: stats?.reputation || 0, isActive: false, label: 'Rating' },
        { type: 'share', count: 0, isActive: false, label: 'Share' }
      );
    } else {
      if (viewerContext.canConnect && !viewerContext.isConnected) {
        socialActions.push(
          { type: 'like', count: 0, isActive: false, label: 'Connect' }
        );
      }
      socialActions.push(
        { type: 'comment', count: 0, isActive: false, label: 'Message' },
        { type: 'share', count: 0, isActive: false, label: 'Share' }
      );
    }
    
    // Profile actions for card menu
    const menuActions = viewerContext.isOwnProfile ? [
      { id: 'edit', label: 'Edit Profile', icon: Settings },
      { id: 'ghost-mode', label: ghostMode ? 'Disable Ghost Mode' : 'Enable Ghost Mode', icon: ghostMode ? Eye : EyeOff },
      { id: 'share', label: 'Share Profile', icon: Share2 }
    ] : [
      { id: 'connect', label: 'Connect', icon: UserPlus },
      { id: 'message', label: 'Message', icon: MessageCircle },
      { id: 'share', label: 'Share Profile', icon: Share2 }
    ];
    
    const handleSocialAction = (actionType: 'like' | 'comment' | 'share') => {
      switch (actionType) {
        case 'like':
          if (viewerContext.isOwnProfile) {
            onStatsClick?.('reputation');
          } else {
            onConnect?.();
          }
          break;
        case 'comment':
          onMessage?.();
          break;
        case 'share':
          onShareProfile?.();
          break;
      }
    };
    
    const handleMenuAction = (actionId: string) => {
      switch (actionId) {
        case 'edit':
          onEditProfile?.();
          break;
        case 'ghost-mode':
          const newGhostMode = !ghostMode;
          setGhostMode(newGhostMode);
          onToggleGhostMode?.(newGhostMode);
          break;
        case 'share':
          onShareProfile?.();
          break;
        case 'connect':
          onConnect?.();
          break;
        case 'message':
          onMessage?.();
          break;
      }
    };
    
    return (
      <div ref={ref} className={cn('space-y-6', className)}>
        {/* Completion Prompt */}
        {showCompletionPrompt && viewerContext.isOwnProfile && user.completionPercentage && (
          <CompletionPrompt
            percentage={user.completionPercentage}
            onComplete={() => onEditProfile?.()}
          />
        )}
        
        {/* Main Profile Card */}
        <ComprehensiveCard
          variant="glass"
          campus="profile"
          size="comfortable"
          menuActions={menuActions}
          onActionClick={handleMenuAction}
          campusOptimized
        >
          <div className="space-y-6">
            {/* User Identity Section */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <UserIdentity
                name={user.fullName}
                handle={user.handle}
                avatar={user.avatar}
                status={ghostMode ? 'offline' : user.status}
                role={user.role}
                verified={user.verified}
                size="large"
                layout="horizontal"
                interactive="social"
                showHandle={!!user.handle}
                showStatus={!ghostMode}
                showRole={user.role !== 'student'}
              />
              
              {/* Builder Badge */}
              {user.isBuilder && (
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--hive-gold-background)] border border-[var(--hive-gold-border)]">
                  <Zap className={cn(
                    iconComposition.sizes.small.className,
                    'text-[var(--hive-gold-primary)]'
                  )} />
                  <span className={cn(
                    'font-[var(--hive-font-family-primary)]',
                    'font-medium',
                    'text-[var(--hive-gold-primary)]',
                    'text-sm'
                  )}>
                    Builder
                  </span>
                </div>
              )}
            </div>
            
            {/* Bio */}
            {user.bio && (
              <p className={cn(
                'font-[var(--hive-font-family-primary)]',
                `text-[${typographyComposition.scale.base.size}]`,
                'text-[var(--hive-text-secondary)]',
                'leading-relaxed'
              )}>
                {user.bio}
              </p>
            )}
            
            {/* Campus Info */}
            {showCampusInfo && (
              <CampusInfo
                major={user.major}
                graduationYear={user.graduationYear}
                dorm={user.dorm}
              />
            )}
            
            {/* Profile Stats */}
            {stats && (
              <ProfileStats
                stats={stats}
                onStatsClick={onStatsClick}
              />
            )}
            
            {/* Social Actions */}
            {showSocialActions && socialActions.length > 0 && (
              <div className="pt-4 border-t border-[var(--hive-border-subtle)]">
                <SocialInteraction
                  actions={socialActions}
                  size="base"
                  layout="horizontal"
                  variant="ghost"
                  onAction={handleSocialAction}
                />
              </div>
            )}
          </div>
        </ComprehensiveCard>
      </div>
    );
  }
);

EnhancedProfileHeader.displayName = 'EnhancedProfileHeader';

export type { EnhancedProfileHeaderProps };