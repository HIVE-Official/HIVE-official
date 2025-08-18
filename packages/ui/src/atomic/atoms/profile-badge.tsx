"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { 
  Crown, 
  Shield, 
  Star, 
  Award, 
  Zap, 
  Users, 
  BookOpen,
  Eye,
  EyeOff,
  Verified,
  LucideIcon 
} from 'lucide-react';

const profileBadgeVariants = cva(
  "inline-flex items-center gap-1.5 font-medium rounded-full transition-all duration-200",
  {
    variants: {
      size: {
        xs: "px-2 py-1 text-xs",
        sm: "px-3 py-1.5 text-xs", 
        md: "px-4 py-2 text-sm",
        lg: "px-5 py-2.5 text-base"
      },
      variant: {
        builder: "bg-[var(--hive-brand-gold)]/20 text-[var(--hive-brand-gold)] border border-[var(--hive-brand-gold)]/30 shadow-lg shadow-[var(--hive-brand-gold)]/10",
        verified: "bg-[var(--hive-status-info)]/20 text-[var(--hive-status-info)] border border-[var(--hive-status-info)]/30 shadow-lg shadow-[var(--hive-status-info)]/10",
        leader: "bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] border border-[var(--hive-brand-secondary)]/30 shadow-lg shadow-[var(--hive-brand-secondary)]/10",
        ghost: "bg-[var(--hive-text-muted)]/20 text-[var(--hive-text-muted)] border border-[var(--hive-text-muted)]/30",
        achievement: "bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/30",
        streak: "bg-[var(--hive-status-warning)]/20 text-[var(--hive-status-warning)] border border-[var(--hive-status-warning)]/30",
        academic: "bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/30",
        social: "bg-[var(--hive-brand-accent)]/20 text-[var(--hive-brand-accent)] border border-[var(--hive-brand-accent)]/30",
        default: "bg-[var(--hive-background-secondary)] text-[var(--hive-text-secondary)] border border-[var(--hive-border-primary)]"
      },
      interactive: {
        true: "cursor-pointer hover:scale-105 hover:brightness-110",
        false: ""
      },
      pulsing: {
        true: "animate-pulse",
        false: ""
      }
    },
    defaultVariants: {
      size: "sm",
      variant: "default",
      interactive: false,
      pulsing: false
    }
  }
);

const iconVariants = cva(
  "flex-shrink-0",
  {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-3.5 w-3.5",
        md: "h-4 w-4", 
        lg: "h-5 w-5"
      }
    },
    defaultVariants: {
      size: "sm"
    }
  }
);

// Predefined badge types with their icons and styling
export const BADGE_TYPES = {
  builder: {
    icon: Crown,
    label: "Builder",
    variant: "builder" as const,
    description: "Active tool creator and community builder"
  },
  verified: {
    icon: Shield,
    label: "Verified",
    variant: "verified" as const,
    description: "Verified student account"
  },
  leader: {
    icon: Star,
    label: "Leader", 
    variant: "leader" as const,
    description: "Community leader and space moderator"
  },
  ghost: {
    icon: EyeOff,
    label: "Ghost Mode",
    variant: "ghost" as const,
    description: "Privacy mode enabled"
  },
  achievement: {
    icon: Award,
    label: "Achiever",
    variant: "achievement" as const,
    description: "Unlocked special achievements"
  },
  streak: {
    icon: Zap,
    label: "Streak",
    variant: "streak" as const,
    description: "Active daily streak"
  },
  academic: {
    icon: BookOpen,
    label: "Scholar",
    variant: "academic" as const,
    description: "Academic excellence recognition"
  },
  social: {
    icon: Users,
    label: "Connector",
    variant: "social" as const,
    description: "Active community member"
  }
} as const;

export type BadgeType = keyof typeof BADGE_TYPES;

export interface ProfileBadgeProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof profileBadgeVariants> {
  type?: BadgeType;
  label?: string;
  icon?: LucideIcon;
  value?: string | number;
  showIcon?: boolean;
  showValue?: boolean;
  onClick?: () => void;
  tooltip?: string;
}

export function ProfileBadge({
  type,
  label,
  icon: CustomIcon,
  value,
  showIcon = true,
  showValue = false,
  onClick,
  tooltip,
  size = "sm",
  variant = "default",
  interactive = false,
  pulsing = false,
  className,
  ...props
}: ProfileBadgeProps) {
  
  // Get predefined badge config if type is provided
  const badgeConfig = type ? BADGE_TYPES[type] : null;
  
  // Determine final values
  const finalIcon = CustomIcon || badgeConfig?.icon;
  const finalLabel = label || badgeConfig?.label || "Badge";
  const finalVariant = variant !== "default" ? variant : (badgeConfig?.variant || "default");
  const finalInteractive = interactive || !!onClick;
  const finalTooltip = tooltip || badgeConfig?.description;

  return (
    <div
      className={cn(
        profileBadgeVariants({ 
          size, 
          variant: finalVariant, 
          interactive: finalInteractive,
          pulsing 
        }),
        className
      )}
      onClick={onClick}
      role={finalInteractive ? "button" : undefined}
      tabIndex={finalInteractive ? 0 : undefined}
      title={finalTooltip}
      {...props}
    >
      {/* Icon */}
      {showIcon && finalIcon && (
        React.createElement(finalIcon, { className: cn(iconVariants({ size })) })
      )}

      {/* Label */}
      <span>{finalLabel}</span>

      {/* Value */}
      {showValue && value !== undefined && (
        <span className="font-bold">
          {typeof value === 'number' && value >= 1000 
            ? `${(value / 1000).toFixed(1)}k`
            : value
          }
        </span>
      )}
    </div>
  );
}

// Preset badge components for common use cases
export function BuilderBadge({ size = "sm", ...props }: Omit<ProfileBadgeProps, 'type'>) {
  return <ProfileBadge type="builder" size={size} {...props} />;
}

export function VerifiedBadge({ size = "sm", ...props }: Omit<ProfileBadgeProps, 'type'>) {
  return <ProfileBadge type="verified" size={size} {...props} />;
}

export function LeaderBadge({ size = "sm", ...props }: Omit<ProfileBadgeProps, 'type'>) {
  return <ProfileBadge type="leader" size={size} {...props} />;
}

export function GhostBadge({ size = "sm", ...props }: Omit<ProfileBadgeProps, 'type'>) {
  return <ProfileBadge type="ghost" size={size} {...props} />;
}

export function StreakBadge({ 
  value, 
  size = "sm", 
  ...props 
}: Omit<ProfileBadgeProps, 'type'> & { value?: number }) {
  return (
    <ProfileBadge 
      type="streak" 
      size={size} 
      value={value}
      showValue={value !== undefined}
      label={value !== undefined ? `${value} day streak` : "Streak"}
      {...props} 
    />
  );
}

export function AchievementBadge({ 
  value, 
  size = "sm", 
  ...props 
}: Omit<ProfileBadgeProps, 'type'> & { value?: number }) {
  return (
    <ProfileBadge 
      type="achievement" 
      size={size} 
      value={value}
      showValue={value !== undefined}
      label={value !== undefined ? `${value} achievements` : "Achiever"}
      {...props} 
    />
  );
}

// Export variants for external use
export { profileBadgeVariants };