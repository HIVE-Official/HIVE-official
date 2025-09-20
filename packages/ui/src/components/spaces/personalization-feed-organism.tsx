"use client";

import { HiveCard } from "../hive-card";
import { HiveButton } from "../hive-button";
import { Grid } from "../Grid";
import { Heart, Activity, Target, Zap, Plus, ArrowRight, Crown, Star, Users, TrendingUp } from "lucide-react";
import { cn } from "../../lib/utils";

export interface UserSpace {
  id: string;
  name: string;
  description?: string;
  memberCount?: number;
  type?: string;
  role?: "member" | "admin" | "owner";
  isActive?: boolean;
  lastActivity?: Date
}

export interface RecommendedSpace {
  id: string;
  name: string;
  description?: string;
  memberCount?: number;
  type?: string;
  reason?: string;
  confidence?: number
}

export interface ActivityStats {
  spacesJoined: number;
  weeklyGrowth: number;
  activeNow: number;
  totalInteractions?: number;
  favoriteSpaces?: number
}

export interface PersonalizationFeedOrganismProps {
  /** User's active spaces */
  mySpaces?: UserSpace[];
  /** AI-powered recommendations */
  recommendedSpaces?: RecommendedSpace[];
  /** User activity statistics */
  activityStats?: ActivityStats;
  /** Custom title override */
  title?: string;
  /** Custom subtitle override */
  subtitle?: string;
  /** Navigation handlers */
  onSpaceClick?: (spaceId: string) => void;
  onRecommendationClick?: (spaceId: string) => void;
  onBrowseSpaces?: () => void;
  onJoinSpace?: (spaceId: string) => void;
  /** Layout configuration */
  layout?: "default" | "compact" | "expanded";
  /** Show sections configuration */
  showSections?: {
    mySpaces?: boolean;
    recommendations?: boolean;
    activity?: boolean
  };
  /** Loading states */
  isLoading?: {
    mySpaces?: boolean;
    recommendations?: boolean;
    activity?: boolean
  };
  /** Custom className */
  className?: string
}

function MySpacesSection({ 
  spaces = [], 
  onSpaceClick, 
  onBrowseSpaces, 
  isLoading = false,
  layout = "default"
}: {
  spaces: UserSpace[];
  onSpaceClick?: (spaceId: string) => void;
  onBrowseSpaces?: () => void;
  isLoading?: boolean;
  layout?: "default" | "compact" | "expanded"
}) {
  const getRoleBadge = (role?: string) => {
    if (role === "owner") {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">
          <Crown className="h-3 w-3" />
          Owner
        </div>
      )
    }
    
    if (role === "admin") {
      return (
        <div className="flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
          <Star className="h-3 w-3" />
          Admin
        </div>
      )
    }
    
    return null
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word.charAt(0)).join('').substring(0, 2).toUpperCase()
  };

  if (isLoading) {
    return (
      <HiveCard className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[var(--hive-interactive-active)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-5 h-5 bg-[var(--hive-text-primary)]/10 rounded animate-pulse" />
          <div className="h-6 bg-[var(--hive-text-primary)]/10 rounded w-32 animate-pulse" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-12 bg-[var(--hive-text-primary)]/5 rounded-lg animate-pulse" />
          ))}
        </div>
      </HiveCard>
    )
  }

  return (
    <HiveCard className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[var(--hive-interactive-active)] hover:bg-[color-mix(in_srgb,var(--hive-interactive-hover)_80%,transparent)] transition-all">
      <div className="flex items-center gap-3 mb-4">
        <Heart className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">My Spaces</h3>
        <span className="text-sm text-[var(--hive-text-tertiary)]">({spaces.length})</span>
      </div>
      
      {spaces.length > 0 ? (
        <div className="space-y-2">
          {spaces.slice(0, layout === "expanded" ? 5 : 3).map((space) => (
            <div 
              key={space.id} 
              className="flex items-center gap-3 p-3 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg hover:bg-[color-mix(in_srgb,var(--hive-interactive-hover)_80%,transparent)] transition-all cursor-pointer group"
              onClick={() => onSpaceClick?.(space.id)}
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[var(--hive-brand-secondary)] to-[var(--hive-brand-secondary)] rounded-lg flex items-center justify-center text-[var(--hive-background-primary)] font-semibold text-xs">
                {getInitials(space.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <div className="text-[var(--hive-text-primary)] font-medium text-sm truncate">{space.name}</div>
                  {getRoleBadge(space.role)}
                </div>
                <div className="flex items-center gap-2 text-xs text-[var(--hive-text-tertiary)]">
                  <Users className="h-3 w-3" />
                  {space.memberCount || 0} members
                  {space.isActive && (
                    <>
                      <span>•</span>
                      <div className="flex items-center gap-1 text-green-400">
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                        Active
                      </div>
                    </>
                  )}
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-[var(--hive-brand-secondary)] group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </div>
          ))}
          
          {spaces.length > (layout === "expanded" ? 5 : 3) && (
            <div className="text-center pt-2">
              <HiveButton 
                size="sm" 
                variant="ghost" 
                onClick={onBrowseSpaces}
                className="text-[var(--hive-text-tertiary)] hover:text-[var(--hive-brand-secondary)]"
              >
                View all {spaces.length} spaces
              </HiveButton>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-[var(--hive-text-tertiary)] text-sm mb-3">No spaces joined yet</p>
          <HiveButton 
            size="sm" 
            onClick={onBrowseSpaces}
            className="bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/30"
          >
            Browse Spaces
          </HiveButton>
        </div>
      )}
    </HiveCard>
  )
}

function RecommendationsSection({ 
  recommendations = [], 
  onRecommendationClick, 
  onJoinSpace, 
  isLoading = false,
  layout = "default"
}: {
  recommendations: RecommendedSpace[];
  onRecommendationClick?: (spaceId: string) => void;
  onJoinSpace?: (spaceId: string) => void;
  isLoading?: boolean;
  layout?: "default" | "compact" | "expanded"
}) {
  const getInitials = (name: string) => {
    return name.split(' ').map(word => word.charAt(0)).join('').substring(0, 2).toUpperCase()
  };

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return "text-[var(--hive-text-tertiary)]";
    if (confidence >= 0.8) return "text-green-400";
    if (confidence >= 0.6) return "text-yellow-400";
    return "text-blue-400"
  };

  if (isLoading) {
    return (
      <HiveCard className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[var(--hive-interactive-active)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-5 h-5 bg-[var(--hive-text-primary)]/10 rounded animate-pulse" />
          <div className="h-6 bg-[var(--hive-text-primary)]/10 rounded w-32 animate-pulse" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-16 bg-[var(--hive-text-primary)]/5 rounded-lg animate-pulse" />
          ))}
        </div>
      </HiveCard>
    )
  }

  return (
    <HiveCard className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[var(--hive-interactive-active)] hover:bg-[color-mix(in_srgb,var(--hive-interactive-hover)_80%,transparent)] transition-all">
      <div className="flex items-center gap-3 mb-4">
        <Zap className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Recommended</h3>
      </div>
      
      {recommendations.length > 0 ? (
        <div className="space-y-3">
          {recommendations.slice(0, layout === "expanded" ? 5 : 3).map((space) => (
            <div 
              key={space.id} 
              className="flex items-center gap-3 p-3 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] rounded-lg hover:bg-[color-mix(in_srgb,var(--hive-interactive-hover)_80%,transparent)] transition-all cursor-pointer group"
              onClick={() => onRecommendationClick?.(space.id)}
            >
              <div className="w-8 h-8 bg-[var(--hive-interactive-active)] rounded-lg flex items-center justify-center text-[var(--hive-text-primary)] font-semibold text-xs">
                {getInitials(space.name)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[var(--hive-text-primary)] font-medium text-sm truncate mb-1">{space.name}</div>
                <div className="text-xs text-[var(--hive-text-tertiary)] truncate">
                  {space.reason || "Suggested for you"}
                  {space.confidence && (
                    <span className={cn("ml-2", getConfidenceColor(space.confidence))}>
                      {Math.round(space.confidence * 100)}% match
                    </span>
                  )}
                </div>
              </div>
              <HiveButton
                size="sm"
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onJoinSpace?.(space.id)
          }}
                className="p-2 hover:bg-[var(--hive-brand-secondary)]/20 group-hover:bg-[var(--hive-brand-secondary)]/20"
              >
                <Plus className="h-4 w-4 text-[var(--hive-brand-secondary)] group-hover:scale-110 transition-transform" />
              </HiveButton>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4">
          <p className="text-[var(--hive-text-tertiary)] text-sm">No recommendations available</p>
        </div>
      )}
    </HiveCard>
  )
}

function ActivityStatsSection({ 
  stats, 
  isLoading = false 
}: {
  stats?: ActivityStats;
  isLoading?: boolean
}) {
  if (isLoading) {
    return (
      <HiveCard className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[var(--hive-interactive-active)]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-5 h-5 bg-[var(--hive-text-primary)]/10 rounded animate-pulse" />
          <div className="h-6 bg-[var(--hive-text-primary)]/10 rounded w-32 animate-pulse" />
        </div>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex justify-between">
              <div className="h-4 bg-[var(--hive-text-primary)]/5 rounded w-20 animate-pulse" />
              <div className="h-6 bg-[var(--hive-text-primary)]/10 rounded w-8 animate-pulse" />
            </div>
          ))}
        </div>
      </HiveCard>
    )
  }

  const defaultStats: ActivityStats = {
    spacesJoined: 0,
    weeklyGrowth: 0,
    activeNow: 0,
    ...stats
  };

  return (
    <HiveCard className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[var(--hive-interactive-active)]">
      <div className="flex items-center gap-3 mb-4">
        <Activity className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">Your Activity</h3>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-[var(--hive-text-tertiary)]">Spaces Joined</span>
          <span className="text-lg font-bold text-[var(--hive-text-primary)]">{defaultStats.spacesJoined}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-[var(--hive-text-tertiary)]">This Week</span>
          <span className={cn(
            "text-lg font-bold",
            defaultStats.weeklyGrowth > 0 ? "text-[var(--hive-brand-secondary)]" : "text-[var(--hive-text-primary)]"
          )}>
            {defaultStats.weeklyGrowth > 0 ? '+' : ''}{defaultStats.weeklyGrowth}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-[var(--hive-text-tertiary)]">Active Now</span>
          <span className="text-lg font-bold text-green-400">{defaultStats.activeNow}</span>
        </div>
        {defaultStats.totalInteractions !== undefined && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-[var(--hive-text-tertiary)]">Total Interactions</span>
            <span className="text-lg font-bold text-blue-400">{defaultStats.totalInteractions}</span>
          </div>
        )}
      </div>
    </HiveCard>
  )
}

export function PersonalizationFeedOrganism({
  mySpaces = [],
  recommendedSpaces = [],
  activityStats,
  title = "Your Campus Hub",
  subtitle = "Personalized recommendations and quick access to your active communities",
  onSpaceClick,
  onRecommendationClick,
  onBrowseSpaces,
  onJoinSpace,
  layout = "default",
  showSections = {
    mySpaces: true,
    recommendations: true,
    activity: true
  },
  isLoading = {},
  className
}: PersonalizationFeedOrganismProps) {
  const getGridConfig = () => {
    switch (layout) {
      case "compact":
        return 2;
      case "expanded":
        return 4;
      default:
        return 3
    }
  };

  const getPadding = () => {
    switch (layout) {
      case "compact":
        return "p-6";
      case "expanded":
        return "p-10";
      default:
        return "p-8"
    }
  };

  return (
    <HiveCard className={cn(
      getPadding(),
      "bg-gradient-to-br from-[var(--hive-brand-secondary)]/5 to-[var(--hive-brand-secondary)]/10 border-[var(--hive-brand-secondary)]/20 relative overflow-hidden",
      className
    )}>
      {/* Liquid Fill Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--hive-brand-secondary)]/10 via-transparent to-[var(--hive-brand-secondary)]/5 -translate-x-full animate-pulse" />
      
      <div className="relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Target className="h-6 w-6 text-[var(--hive-brand-secondary)]" />
            <h2 className="text-2xl font-bold text-[var(--hive-text-primary)]">{title}</h2>
          </div>
          <p className="text-[var(--hive-text-tertiary)] max-w-2xl mx-auto">{subtitle}</p>
        </div>
        
        <Grid cols={getGridConfig()} gap={6}>
          {showSections.mySpaces && (
            <MySpacesSection
              spaces={mySpaces}
              onSpaceClick={onSpaceClick}
              onBrowseSpaces={onBrowseSpaces}
              isLoading={isLoading.mySpaces}
              layout={layout}
            />
          )}
          
          {showSections.recommendations && (
            <RecommendationsSection
              recommendations={recommendedSpaces}
              onRecommendationClick={onRecommendationClick}
              onJoinSpace={onJoinSpace}
              isLoading={isLoading.recommendations}
              layout={layout}
            />
          )}
          
          {showSections.activity && (
            <ActivityStatsSection
              stats={activityStats}
              isLoading={isLoading.activity}
            />
          )}
        </Grid>
      </div>
    </HiveCard>
  )
}