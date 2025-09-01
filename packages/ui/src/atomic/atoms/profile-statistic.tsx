"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const profileStatisticVariants = cva(
  "flex flex-col items-center justify-center text-center transition-all duration-200",
  {
    variants: {
      size: {
        xs: "p-2 gap-1",
        sm: "p-3 gap-2", 
        md: "p-4 gap-2",
        lg: "p-6 gap-3"
      },
      variant: {
        default: "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-xl",
        ghost: "bg-transparent",
        highlight: "bg-gradient-to-br from-[var(--hive-brand-gold)]/10 to-[var(--hive-brand-secondary)]/10 border border-[var(--hive-brand-gold)]/20 rounded-xl",
        compact: "bg-[var(--hive-background-secondary)]/50 rounded-lg border border-[var(--hive-border-primary)]/50"
      },
      interactive: {
        true: "cursor-pointer hover:bg-[var(--hive-background-interactive)] hover:scale-105 hover:border-[var(--hive-brand-gold)]/30",
        false: ""
      },
      trend: {
        none: "",
        up: "hover:shadow-[var(--hive-status-success)]/10",
        down: "hover:shadow-[var(--hive-status-error)]/10", 
        neutral: "hover:shadow-[var(--hive-text-muted)]/10"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "default",
      interactive: false,
      trend: "none"
    }
  }
);

const valueVariants = cva(
  "font-bold transition-colors",
  {
    variants: {
      size: {
        xs: "text-lg",
        sm: "text-xl",
        md: "text-2xl", 
        lg: "text-3xl"
      },
      trend: {
        none: "text-[var(--hive-text-primary)]",
        up: "text-[var(--hive-status-success)]",
        down: "text-[var(--hive-status-error)]",
        neutral: "text-[var(--hive-text-primary)]"
      },
      emphasis: {
        normal: "",
        gold: "text-[var(--hive-brand-gold)]",
        secondary: "text-[var(--hive-brand-secondary)]"
      }
    },
    defaultVariants: {
      size: "md",
      trend: "none",
      emphasis: "normal"
    }
  }
);

const labelVariants = cva(
  "font-medium transition-colors",
  {
    variants: {
      size: {
        xs: "text-xs",
        sm: "text-sm",
        md: "text-sm",
        lg: "text-base"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

const iconVariants = cva(
  "flex-shrink-0 transition-colors",
  {
    variants: {
      size: {
        xs: "h-4 w-4",
        sm: "h-5 w-5",
        md: "h-6 w-6",
        lg: "h-8 w-8"
      },
      color: {
        default: "text-[var(--hive-text-secondary)]",
        gold: "text-[var(--hive-brand-gold)]",
        secondary: "text-[var(--hive-brand-secondary)]",
        success: "text-[var(--hive-status-success)]",
        warning: "text-[var(--hive-status-warning)]",
        error: "text-[var(--hive-status-error)]"
      }
    },
    defaultVariants: {
      size: "md",
      color: "default"
    }
  }
);

export interface ProfileStatisticProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof profileStatisticVariants> {
  value: string | number;
  label: string;
  icon?: LucideIcon;
  iconColor?: 'default' | 'gold' | 'secondary' | 'success' | 'warning' | 'error';
  change?: number;
  changeLabel?: string;
  showTrend?: boolean;
  emphasis?: 'normal' | 'gold' | 'secondary';
  loading?: boolean;
  onClick?: () => void;
}

export function ProfileStatistic({
  value,
  label,
  icon: Icon,
  iconColor = "default",
  change,
  changeLabel,
  showTrend = false,
  emphasis = "normal",
  loading = false,
  onClick,
  size = "md",
  variant = "default",
  interactive = false,
  trend = "none",
  className,
  ...props
}: ProfileStatisticProps) {

  // Auto-determine trend from change value
  const determinedTrend = React.useMemo(() => {
    if (trend !== "none") return trend;
    if (!showTrend || change === undefined) return "none";
    if (change > 0) return "up";
    if (change < 0) return "down";
    return "neutral";
  }, [trend, showTrend, change]);

  // Auto-determine interactive from onClick
  const determinedInteractive = interactive || !!onClick;

  // Format large numbers
  const formatValue = (val: string | number) => {
    const num = typeof val === 'string' ? parseFloat(val) : val;
    if (isNaN(num)) return val;
    
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}k`;
    return num.toString();
  };

  // Get trend icon
  const TrendIcon = React.useMemo(() => {
    switch (determinedTrend) {
      case "up": return TrendingUp;
      case "down": return TrendingDown;
      case "neutral": return Minus;
      default: return null;
    }
  }, [determinedTrend]);

  if (loading) {
    return (
      <div className={cn(profileStatisticVariants({ size, variant, interactive: false }), className)}>
        <div className="space-y-2 w-full">
          <div className={cn("bg-[var(--hive-background-secondary)] animate-pulse rounded", {
            "h-6": size === "xs",
            "h-7": size === "sm", 
            "h-8": size === "md",
            "h-10": size === "lg"
          })} />
          <div className={cn("bg-[var(--hive-background-secondary)] animate-pulse rounded", {
            "h-3": size === "xs",
            "h-4": size === "sm",
            "h-5": size === "md", 
            "h-6": size === "lg"
          })} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        profileStatisticVariants({ 
          size, 
          variant, 
          interactive: determinedInteractive, 
          trend: determinedTrend 
        }),
        className
      )}
      onClick={onClick}
      role={determinedInteractive ? "button" : undefined}
      tabIndex={determinedInteractive ? 0 : undefined}
      {...props}
    >
      {/* Icon */}
      {Icon && (
        <Icon className={cn(iconVariants({ size, color: iconColor }))} />
      )}

      {/* Value with Trend */}
      <div className="flex items-center gap-1">
        <span className={cn(valueVariants({ size, trend: determinedTrend, emphasis }))}>
          {formatValue(value)}
        </span>
        
        {showTrend && TrendIcon && change !== undefined && (
          <div className="flex items-center gap-1">
            <TrendIcon className={cn("h-4 w-4", {
              "text-[var(--hive-status-success)]": determinedTrend === "up",
              "text-[var(--hive-status-error)]": determinedTrend === "down",
              "text-[var(--hive-text-muted)]": determinedTrend === "neutral"
            })} />
            {changeLabel && (
              <span className={cn("text-xs font-medium", {
                "text-[var(--hive-status-success)]": determinedTrend === "up",
                "text-[var(--hive-status-error)]": determinedTrend === "down", 
                "text-[var(--hive-text-muted)]": determinedTrend === "neutral"
              })}>
                {changeLabel}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Label */}
      <span className={cn(labelVariants({ size }), "text-[var(--hive-text-secondary)]")}>
        {label}
      </span>

      {/* Change Value (if no changeLabel) */}
      {showTrend && change !== undefined && !changeLabel && (
        <span className={cn("text-xs font-medium", {
          "text-[var(--hive-status-success)]": determinedTrend === "up",
          "text-[var(--hive-status-error)]": determinedTrend === "down",
          "text-[var(--hive-text-muted)]": determinedTrend === "neutral"
        })}>
          {change > 0 ? `+${change}` : change}
        </span>
      )}
    </div>
  );
}

// Export variants for external use
export { profileStatisticVariants };