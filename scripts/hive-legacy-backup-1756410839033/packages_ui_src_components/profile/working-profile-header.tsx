/**
 * HIVE Profile Header - Campus Command Center
 * Brand-consistent Profile header with HIVE's gold/black design system
 * Built for University at Buffalo students
 */

import * as React from 'react';
import { cn } from '../lib/utils';

// HIVE Foundation Systems
import { typographyComposition } from '../../atomic/foundations/typography-composition';
import { colorComposition } from '../../atomic/foundations/color-composition';
import { layoutComposition } from '../../atomic/foundations/layout-composition';
import { motionComposition } from '../../atomic/foundations/motion-composition';

// Use existing working HIVE components
import { Button } from '../ui/button';
import { HiveBadge } from '../hive-badge';
import { EnhancedUserIdentity } from './enhanced-user-identity';

// Use systematic HIVE layout system
import { 
  HiveCard,
  HiveProfileLayout,
  HiveStack,
  HiveGrid
} from '../layout/hive-layout-system';

// Keep simple layout system for backward compatibility
import { 
  SimpleProfileLayout, 
  SimpleProfileContent, 
  SimpleProfileActions,
  SimpleProfileIdentity,
  SimpleProfileGrid
} from './simple-layout-system';

export interface ProfileStats {
  spacesCount: number;
  toolsCount: number;
  connectionsCount: number;
  reputation?: number;
}

export interface ViewerContext {
  isOwnProfile: boolean;
  isConnected?: boolean;
  canMessage?: boolean;
  canConnect?: boolean;
}

export interface WorkingProfileHeaderProps {
  // User data - same as EnhancedUserIdentity
  name: string;
  handle?: string;
  avatar?: string;
  bio?: string;
  major?: string;
  graduationYear?: number;
  dorm?: string;
  status?: 'online' | 'away' | 'offline' | 'studying';
  role?: 'student' | 'admin' | 'leader';
  verified?: boolean;
  isBuilder?: boolean;
  completionPercentage?: number;
  ghostMode?: boolean;
  
  // Profile stats
  stats?: ProfileStats;
  
  // Viewer context
  viewerContext?: ViewerContext;
  
  // Display options
  showCampusInfo?: boolean;
  showSocialActions?: boolean;
  showCompletionPrompt?: boolean;
  showStats?: boolean;
  
  // Actions
  onEditProfile?: () => void;
  onShareProfile?: () => void;
  onConnect?: () => void;
  onMessage?: () => void;
  onToggleGhostMode?: () => void;
  onStatsClick?: (statType: string) => void;
  
  className?: string;
}

export const WorkingProfileHeader = React.forwardRef<HTMLDivElement, WorkingProfileHeaderProps>(
  ({
    // User identity props
    name,
    handle,
    avatar,
    bio,
    major,
    graduationYear,
    dorm,
    status = 'online',
    role = 'student',
    verified = false,
    isBuilder = false,
    completionPercentage,
    ghostMode = false,
    
    // Additional props
    stats,
    viewerContext = { isOwnProfile: true },
    showCampusInfo = true,
    showSocialActions = true,
    showCompletionPrompt = true,
    showStats = true,
    
    // Actions
    onEditProfile,
    onShareProfile,
    onConnect,
    onMessage,
    onToggleGhostMode,
    onStatsClick,
    
    className
  }, ref) => {
    
    const defaultStats = {
      spacesCount: 0,
      toolsCount: 0,
      connectionsCount: 0,
      ...stats
    };
    
    return (
      <SimpleProfileLayout
        ref={ref}
        variant="card"
        className={cn('overflow-hidden', className)}
      >
        {/* Main Profile Section */}
        <SimpleProfileIdentity
            avatar={
              <div className="relative">
                {avatar ? (
                  <img
                    src={avatar}
                    alt={name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--hive-gold-primary)] to-[var(--hive-bg-tertiary)] flex items-center justify-center text-[var(--hive-text-primary)] font-bold text-xl shadow-lg border-2 border-[var(--hive-gold-border)]">
                    {name.charAt(0).toUpperCase()}
                  </div>
                )}
                {/* Status indicator */}
                <div className={cn(
                  'absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[var(--hive-bg-secondary)] shadow-lg',
                  ghostMode ? 'bg-[var(--hive-text-muted)]' : 
                  status === 'online' ? 'bg-[var(--hive-success-primary)]' :
                  status === 'away' ? 'bg-[var(--hive-warning-primary)]' :
                  status === 'studying' ? 'bg-[var(--hive-gold-primary)]' : 'bg-[var(--hive-text-muted)]'
                )} />
              </div>
            }
            info={
              <SimpleProfileContent>
                {/* Name and badges */}
                <div className="space-y-2 mb-4">
                  <h2 className="text-xl sm:text-2xl font-bold text-[var(--hive-text-primary)] font-[var(--hive-font-family-primary)] break-words">{name}</h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    {verified && (
                      <Badge variant="primary" className="text-xs bg-[var(--hive-gold-background)] text-[var(--hive-gold-primary)] border-[var(--hive-gold-border)]">
                        ✓ Verified
                      </Badge>
                    )}
                    {isBuilder && (
                      <Badge variant="secondary" className="text-xs bg-[var(--hive-success-background)] text-[var(--hive-success-primary)] border-[var(--hive-success-border)]">
                        ⚡ Builder
                      </Badge>
                    )}
                    {role === 'leader' && (
                      <Badge variant="destructive" className="text-xs bg-[var(--hive-warning-background)] text-[var(--hive-warning-primary)] border-[var(--hive-warning-border)]">
                        👑 Leader
                      </Badge>
                    )}
                  </div>
                </div>
                
                {/* Handle */}
                {handle && (
                  <p className="text-[var(--hive-gold-primary)] text-base sm:text-lg font-medium font-[var(--hive-font-family-primary)] break-words">@{handle}</p>
                )}
                
                {/* Campus info */}
                {showCampusInfo && (major || graduationYear || dorm) && (
                  <div className="text-[var(--hive-text-secondary)] text-sm font-[var(--hive-font-family-primary)]">
                    <div className="flex flex-wrap gap-3 items-center">
                      {major && <span className="flex items-center gap-1 break-words"><span className="text-[var(--hive-gold-primary)]">🎓</span>{major}</span>}
                      {graduationYear && <span className="flex items-center gap-1"><span className="text-[var(--hive-gold-primary)]">📅</span>Class of {graduationYear}</span>}
                    </div>
                    {dorm && <div className="mt-2 flex items-center gap-1 break-words"><span className="text-[var(--hive-gold-primary)]">🏠</span>{dorm}</div>}
                  </div>
                )}
                
                {/* Bio */}
                {bio && (
                  <p className="text-[var(--hive-text-primary)] text-sm sm:text-base leading-relaxed font-[var(--hive-font-family-primary)] break-words overflow-hidden">{bio}</p>
                )}
                
                {/* Profile completion prompt */}
                {showCompletionPrompt && viewerContext.isOwnProfile && completionPercentage && completionPercentage < 100 && (
                  <div className="p-4 bg-[var(--hive-warning-background)] rounded-lg border border-[var(--hive-warning-border)] mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-[var(--hive-gold-primary)]">⚡</span>
                        <span className="text-sm font-semibold text-[var(--hive-text-primary)] font-[var(--hive-font-family-primary)]">
                          Profile {completionPercentage}% complete
                        </span>
                      </div>
                      <button
                        onClick={onEditProfile}
                        className="text-sm text-[var(--hive-gold-primary)] hover:text-[var(--hive-gold-hover)] font-semibold font-[var(--hive-font-family-primary)] transition-colors"
                      >
                        Complete →
                      </button>
                    </div>
                    <div className="w-full bg-[var(--hive-bg-primary)] rounded-full h-2">
                      <div
                        className="bg-[var(--hive-gold-primary)] h-2 rounded-full transition-all duration-500"
                        style={{ width: `${completionPercentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-[var(--hive-text-muted)] mt-2 font-[var(--hive-font-family-primary)]">
                      Complete your profile to unlock campus recommendations
                    </p>
                  </div>
                )}
                
                {/* Ghost mode indicator */}
                {ghostMode && viewerContext.isOwnProfile && (
                  <div className="p-4 bg-[var(--hive-bg-tertiary)] rounded-lg border border-[var(--hive-border-subtle)] backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg">👻</span>
                        <div>
                          <p className="text-sm font-semibold text-[var(--hive-text-primary)] font-[var(--hive-font-family-primary)]">
                            Ghost Mode Active
                          </p>
                          <p className="text-xs text-[var(--hive-text-muted)] font-[var(--hive-font-family-primary)]">
                            You appear offline to other students
                          </p>
                        </div>
                      </div>
                      <ButtonEnhanced
                        size="sm"
                        variant="secondary"
                        onClick={onToggleGhostMode}
                        className="text-[var(--hive-text-primary)] border-[var(--hive-border-primary)] hover:bg-[var(--hive-bg-interactive)] font-[var(--hive-font-family-primary)]"
                      >
                        Disable
                      </ButtonEnhanced>
                    </div>
                  </div>
                )}
              </SimpleProfileContent>
            }
            actions={
              <SimpleProfileActions>
                {viewerContext.isOwnProfile ? (
                  // Own profile actions - Stack on mobile, side buttons on desktop
                  <div className="flex flex-col sm:flex-row sm:flex-col gap-2 w-full">
                    <ButtonEnhanced 
                      onClick={onEditProfile}
                      className="w-full sm:w-auto min-w-[120px]"
                      size="sm"
                    >
                      Edit Profile
                    </ButtonEnhanced>
                    <ButtonEnhanced 
                      variant="secondary" 
                      onClick={onShareProfile}
                      className="w-full sm:w-auto min-w-[120px]"
                      size="sm"
                    >
                      Share
                    </ButtonEnhanced>
                    {!ghostMode && (
                      <ButtonEnhanced 
                        variant="secondary" 
                        onClick={onToggleGhostMode}
                        className="w-full sm:w-auto min-w-[120px]"
                        size="sm"
                      >
                        Go Invisible
                      </ButtonEnhanced>
                    )}
                  </div>
                ) : (
                  // Other user profile actions
                  showSocialActions && (
                    <div className="flex flex-col sm:flex-row sm:flex-col gap-2 w-full">
                      {viewerContext.canConnect && (
                        <ButtonEnhanced 
                          onClick={onConnect}
                          className="w-full sm:w-auto min-w-[120px]"
                          size="sm"
                        >
                          {viewerContext.isConnected ? 'Connected' : 'Connect'}
                        </ButtonEnhanced>
                      )}
                      {viewerContext.canMessage && (
                        <ButtonEnhanced 
                          variant="secondary" 
                          onClick={onMessage}
                          className="w-full sm:w-auto min-w-[120px]"
                          size="sm"
                        >
                          Message
                        </ButtonEnhanced>
                      )}
                      <ButtonEnhanced 
                        variant="secondary" 
                        onClick={onShareProfile}
                        className="w-full sm:w-auto min-w-[120px]"
                        size="sm"
                      >
                        Share Profile
                      </ButtonEnhanced>
                    </div>
                  )
                )}
              </SimpleProfileActions>
            }
            layout="horizontal"
          />
        
        {/* Stats Section */}
        {showStats && (
          <div className="border-t border-[var(--hive-border-subtle)] bg-[var(--hive-bg-primary)] px-4 sm:px-6 py-4 sm:py-6">
            <SimpleProfileGrid columns={4}>
              <button
                onClick={() => onStatsClick?.('spaces')}
                className="group text-center hover:bg-[var(--hive-bg-secondary)] rounded-xl p-2 sm:p-4 transition-all duration-300 border border-transparent hover:border-[var(--hive-gold-border)]"
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mb-1">
                  <span className="text-[var(--hive-gold-primary)] group-hover:scale-110 transition-transform">🏠</span>
                  <div className="text-lg sm:text-2xl font-bold text-[var(--hive-text-primary)] font-[var(--hive-font-family-primary)]">
                    {defaultStats.spacesCount}
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-[var(--hive-text-secondary)] font-[var(--hive-font-family-primary)]">Spaces</div>
              </button>
              
              <button
                onClick={() => onStatsClick?.('tools')}
                className="group text-center hover:bg-[var(--hive-bg-secondary)] rounded-xl p-2 sm:p-4 transition-all duration-300 border border-transparent hover:border-[var(--hive-gold-border)]"
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mb-1">
                  <span className="text-[var(--hive-gold-primary)] group-hover:scale-110 transition-transform">⚡</span>
                  <div className="text-lg sm:text-2xl font-bold text-[var(--hive-text-primary)] font-[var(--hive-font-family-primary)]">
                    {defaultStats.toolsCount}
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-[var(--hive-text-secondary)] font-[var(--hive-font-family-primary)]">Tools Built</div>
              </button>
              
              <button
                onClick={() => onStatsClick?.('connections')}
                className="group text-center hover:bg-[var(--hive-bg-secondary)] rounded-xl p-2 sm:p-4 transition-all duration-300 border border-transparent hover:border-[var(--hive-gold-border)]"
              >
                <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mb-1">
                  <span className="text-[var(--hive-gold-primary)] group-hover:scale-110 transition-transform">🤝</span>
                  <div className="text-lg sm:text-2xl font-bold text-[var(--hive-text-primary)] font-[var(--hive-font-family-primary)]">
                    {defaultStats.connectionsCount}
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-[var(--hive-text-secondary)] font-[var(--hive-font-family-primary)]">Connections</div>
              </button>
              
              {defaultStats.reputation && (
                <button
                  onClick={() => onStatsClick?.('reputation')}
                  className="group text-center hover:bg-[var(--hive-bg-secondary)] rounded-xl p-2 sm:p-4 transition-all duration-300 border border-transparent hover:border-[var(--hive-gold-border)]"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 mb-1">
                    <span className="text-[var(--hive-gold-primary)] group-hover:scale-110 transition-transform">⭐</span>
                    <div className="text-lg sm:text-2xl font-bold text-[var(--hive-text-primary)] font-[var(--hive-font-family-primary)]">
                      {defaultStats.reputation.toFixed(1)}
                    </div>
                  </div>
                  <div className="text-xs sm:text-sm text-[var(--hive-text-secondary)] font-[var(--hive-font-family-primary)]">Campus Rep</div>
                </button>
              )}
            </SimpleProfileGrid>
          </div>
        )}
      </SimpleProfileLayout>
    );
  }
);

WorkingProfileHeader.displayName = 'WorkingProfileHeader';

// Export types
export type {
  ProfileStats,
  ViewerContext,
  WorkingProfileHeaderProps
};