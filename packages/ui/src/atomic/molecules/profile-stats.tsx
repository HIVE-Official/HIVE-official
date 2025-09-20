"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { ProfileStatistic } from '../atoms/profile-statistic';
import { Users, Zap, BookOpen, Star, TrendingUp, Award, Calendar } from 'lucide-react';

const profileStatsVariants = cva(
  "flex transition-all duration-200",
  {
    variants: {
      layout: {
        horizontal: "flex-row flex-wrap gap-4",
        vertical: "flex-col gap-3",
        grid: "grid gap-4",
        compact: "flex-row flex-wrap gap-2"
      },
      columns: {
        auto: "",
        "2": "grid-cols-2",
        "3": "grid-cols-3", 
        "4": "grid-cols-4",
        "5": "grid-cols-5"
      },
      variant: {
        default: "bg-hive-surface-elevated border border-hive-border-subtle rounded-xl p-4",
        ghost: "bg-transparent p-0",
        minimal: "bg-transparent p-2",
        card: "bg-hive-surface-elevated border border-hive-border-subtle rounded-xl p-6 shadow-lg"
      },
      spacing: {
        tight: "gap-2",
        normal: "gap-4",
        loose: "gap-6"
      }
    },
    defaultVariants: {
      layout: "horizontal",
      columns: "auto",
      variant: "default",
      spacing: "normal"
    }
  }
);

// Updated to align with HiveProfile data model
export interface HiveProfileStats {
  spacesJoined: number;
  spacesActive?: number;
  spacesLed?: number;
  toolsUsed?: number;
  connectionsCount: number;
  totalActivity?: number;
  currentStreak?: number;
  longestStreak?: number;
  reputation?: number;
  achievements?: number
}

export interface ProfileStatsProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof profileStatsVariants> {
  stats: HiveProfileStats;
  priority?: ('spacesJoined' | 'spacesActive' | 'spacesLed' | 'toolsUsed' | 'connectionsCount' | 'totalActivity' | 'currentStreak' | 'longestStreak' | 'reputation' | 'achievements')[];
  maxStats?: number;
  showIcons?: boolean;
  showTrends?: boolean;
  interactive?: boolean;
  onStatClick?: (statKey: string, value: number) => void;
  changes?: Partial<Record<keyof HiveProfileStats, number>>;
  loading?: boolean
}

// HIVE stat configurations aligned with unified data model
const HIVE_STAT_CONFIGS = {
  spacesJoined: {
    label: 'Spaces Joined',
    icon: Users,
    iconColor: 'secondary' as const,
    emphasis: 'normal' as const
  },
  spacesActive: {
    label: 'Active Spaces',
    icon: Zap,
    iconColor: 'gold' as const,
    emphasis: 'secondary' as const
  },
  spacesLed: {
    label: 'Leading',
    icon: Star,
    iconColor: 'gold' as const,
    emphasis: 'gold' as const
  },
  toolsUsed: {
    label: 'Tools Used',
    icon: BookOpen,
    iconColor: 'default' as const,
    emphasis: 'normal' as const
  },
  connectionsCount: {
    label: 'Connections',
    icon: Users,
    iconColor: 'default' as const,
    emphasis: 'normal' as const
  },
  totalActivity: {
    label: 'Total Activity',
    icon: TrendingUp,
    iconColor: 'success' as const,
    emphasis: 'normal' as const
  },
  currentStreak: {
    label: 'Current Streak',
    icon: Calendar,
    iconColor: 'warning' as const,
    emphasis: 'normal' as const
  },
  longestStreak: {
    label: 'Best Streak',
    icon: Award,
    iconColor: 'gold' as const,
    emphasis: 'gold' as const
  },
  reputation: {
    label: 'Reputation',
    icon: Award,
    iconColor: 'gold' as const,
    emphasis: 'gold' as const
  },
  achievements: {
    label: 'Achievements',
    icon: Award,
    iconColor: 'success' as const,
    emphasis: 'normal' as const
  }
} as const;

export function ProfileStats({
  stats,
  priority = ['spacesJoined', 'spacesActive', 'connectionsCount', 'currentStreak'],
  maxStats = 4,
  showIcons = true,
  showTrends = false,
  interactive = false,
  onStatClick,
  changes,
  loading = false,
  layout = "horizontal",
  columns = "auto",
  variant = "default",
  spacing = "normal",
  className,
  ...props
}: ProfileStatsProps) {

  // Determine grid columns based on layout and number of stats
  const determinedColumns = React.useMemo(() => {
    if (layout !== "grid") return "auto";
    if (columns !== "auto") return columns;
    
    const statsCount = Math.min(priority.length, maxStats);
    if (statsCount <= 2) return "2";
    if (statsCount <= 3) return "3";
    if (statsCount <= 4) return "4";
    return "5"
  }, [layout, columns, priority.length, maxStats]);

  // Filter and prioritize stats
  const displayStats = React.useMemo(() => {
    return priority
      .slice(0, maxStats)
      .map(key => {
        const config = HIVE_STAT_CONFIGS[key];
        const value = stats[key];
        const change = changes?.[key];
        
        if (value === undefined) return null;
        
        return {
          key,
          value,
          change,
          config,
          onClick: interactive && onStatClick ? () => onStatClick(key, value) : undefined
        }
      })
      .filter(Boolean)
  }, [stats, priority, maxStats, interactive, onStatClick, changes]);

  // Determine stat size based on layout
  const statSize = React.useMemo(() => {
    if (layout === "compact") return "xs";
    if (layout === "vertical") return "md";
    return "sm"
  }, [layout]);

  // Determine stat variant based on container variant
  const statVariant = React.useMemo(() => {
    if (variant === "ghost" || variant === "minimal") return "ghost";
    if (layout === "compact") return "compact";
    return "default"
  }, [variant, layout]);

  if (loading) {
    return (
      <div className={cn(profileStatsVariants({ layout, columns: determinedColumns, variant, spacing }), className)}>
        {Array.from({ length: Math.min(priority.length, maxStats) }).map((_, i) => (
          <ProfileStatistic
            key={i}
            value=""
            label=""
            loading={true}
            size={statSize}
            variant={statVariant}
          />
        ))}
      </div>
    )
  }

  return (
    <div 
      className={cn(profileStatsVariants({ layout, columns: determinedColumns, variant, spacing }), className)}
      {...props}
    >
      {displayStats.map((stat) => (
        <ProfileStatistic
          key={stat.key}
          value={stat.value}
          label={stat.config.label}
          icon={showIcons ? stat.config.icon : undefined}
          iconColor={stat.config.iconColor}
          emphasis={stat.config.emphasis}
          change={stat.change}
          showTrend={showTrends && stat.change !== undefined}
          size={statSize}
          variant={statVariant}
          interactive={!!stat.onClick}
          onClick={stat.onClick}
        />
      ))}
    </div>
  )
}

// Preset variants for common use cases
export function CompactProfileStats(props: Omit<ProfileStatsProps, 'layout' | 'maxStats'>) {
  return (
    <ProfileStats 
      layout="compact" 
      maxStats={3}
      showIcons={false}
      variant="ghost"
      {...props} 
    />
  )
}

export function CardProfileStats(props: Omit<ProfileStatsProps, 'variant'>) {
  return <ProfileStats variant="card" {...props} />
}

export function GridProfileStats(props: Omit<ProfileStatsProps, 'layout'>) {
  return <ProfileStats layout="grid" {...props} />
}

export function StudentProfileStats(props: Omit<ProfileStatsProps, 'priority'>) {
  return (
    <ProfileStats 
      priority={['spacesJoined', 'connectionsCount', 'currentStreak', 'reputation']}
      {...props} 
    />
  )
}

export function BuilderProfileStats(props: Omit<ProfileStatsProps, 'priority'>) {
  return (
    <ProfileStats 
      priority={['toolsUsed', 'spacesLed', 'reputation', 'totalActivity']}
      {...props} 
    />
  )
}

export function ActiveUserProfileStats(props: Omit<ProfileStatsProps, 'priority'>) {
  return (
    <ProfileStats 
      priority={['spacesActive', 'currentStreak', 'totalActivity', 'achievements']}
      {...props} 
    />
  )
}

// Export variants for external use
export { profileStatsVariants };