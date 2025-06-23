'use client';

import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';
import { 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Star, 
  Zap, 
  MapPin,
  Calendar,
  Users,
  Eye,
  Heart,
  Crown,
  Shield,
  type LucideIcon 
} from 'lucide-react';

// HIVE Badge Variants with sophisticated styling
const badgeVariants = cva(
  [
    'inline-flex items-center justify-center gap-1 font-medium transition-all duration-200',
    'backdrop-blur-[2px] border rounded-full',
    'focus:outline-none focus:ring-2 focus:ring-gold/50 focus:ring-offset-2 focus:ring-offset-[#0A0A0A]',
    'select-none',
  ],
  {
    variants: {
      variant: {
        // Status Badges - HIVE Brand Colors
        verified: [
          'bg-gradient-to-r from-gold/30 to-gold/20 border-gold/40 text-gold',
          'shadow-[inset_0_1px_0_rgba(255,215,0,0.3)]',
          'hover:from-gold/40 hover:to-gold/30 hover:border-gold/50',
        ],
        live: [
          'bg-gradient-to-r from-rose-500/30 to-rose-500/20 border-rose-500/40 text-rose-100',
          'shadow-[inset_0_1px_0_rgba(244,63,94,0.3)]',
          'animate-pulse',
        ],
        trending: [
          'bg-gradient-to-r from-amber-500/30 to-amber-500/20 border-amber-500/40 text-amber-100',
          'shadow-[inset_0_1px_0_rgba(245,158,11,0.3)]',
        ],
        featured: [
          'bg-gradient-to-r from-violet-500/30 to-violet-500/20 border-violet-500/40 text-violet-100',
          'shadow-[inset_0_1px_0_rgba(139,92,246,0.3)]',
        ],
        
        // Priority Badges - HIVE Semantic Colors
        high: [
          'bg-gradient-to-r from-red-500/30 to-red-500/20 border-red-500/40 text-red-100',
          'shadow-[inset_0_1px_0_rgba(239,68,68,0.3)]',
        ],
        medium: [
          'bg-gradient-to-r from-sky-500/30 to-sky-500/20 border-sky-500/40 text-sky-100',
          'shadow-[inset_0_1px_0_rgba(14,165,233,0.3)]',
        ],
        low: [
          'bg-gradient-to-r from-teal-500/30 to-teal-500/20 border-teal-500/40 text-teal-100',
          'shadow-[inset_0_1px_0_rgba(20,184,166,0.3)]',
        ],
        
        // Context Badges - Glass Morphism
        space: [
          'bg-gradient-to-r from-white/10 to-white/5 border-white/30 text-white',
          'shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]',
          'hover:from-white/15 hover:to-white/10 hover:border-white/40',
        ],
        event: [
          'bg-gradient-to-r from-fuchsia-500/30 to-fuchsia-500/20 border-fuchsia-500/40 text-fuchsia-100',
          'shadow-[inset_0_1px_0_rgba(217,70,239,0.3)]',
        ],
        location: [
          'bg-gradient-to-r from-emerald-500/30 to-emerald-500/20 border-emerald-500/40 text-emerald-100',
          'shadow-[inset_0_1px_0_rgba(16,185,129,0.3)]',
        ],
        role: [
          'bg-gradient-to-r from-gold/30 to-amber-500/20 border-amber-500/40 text-amber-100',
          'shadow-[inset_0_1px_0_rgba(245,158,11,0.3)]',
        ],
        
        // Engagement Badges - Vibrant HIVE Colors
        popular: [
          'bg-gradient-to-r from-pink-500/30 to-pink-500/20 border-pink-500/40 text-pink-100',
          'shadow-[inset_0_1px_0_rgba(236,72,153,0.3)]',
        ],
        new: [
          'bg-gradient-to-r from-cyan-500/30 to-cyan-500/20 border-cyan-500/40 text-cyan-100',
          'shadow-[inset_0_1px_0_rgba(6,182,212,0.3)]',
        ],
        
        // Basic Semantic - HIVE System Colors
        success: [
          'bg-gradient-to-r from-emerald-500/30 to-emerald-500/20 border-emerald-500/40 text-emerald-50',
          'shadow-[inset_0_1px_0_rgba(16,185,129,0.3)]',
        ],
        warning: [
          'bg-gradient-to-r from-amber-500/30 to-amber-500/20 border-amber-500/40 text-amber-50',
          'shadow-[inset_0_1px_0_rgba(245,158,11,0.3)]',
        ],
        error: [
          'bg-gradient-to-r from-rose-500/30 to-rose-500/20 border-rose-500/40 text-rose-50',
          'shadow-[inset_0_1px_0_rgba(244,63,94,0.3)]',
        ],
        neutral: [
          'bg-gradient-to-r from-white/10 to-white/5 border-white/30 text-white/95',
          'shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]',
        ],
      },
      size: {
        xs: 'text-[11px] px-2 py-0.5',
        sm: 'text-xs px-2.5 py-0.5',
        md: 'text-sm px-3 py-1',
        lg: 'text-base px-3.5 py-1.5',
        xl: 'text-lg px-4 py-2',
      },
      shape: {
        rounded: 'rounded-full',
        square: 'rounded-md',
        pill: 'rounded-full px-3',
      },
    },
    defaultVariants: {
      variant: 'neutral',
      size: 'sm',
      shape: 'rounded',
    },
  }
);

// Icon mapping for badge variants
const badgeIcons: Record<string, LucideIcon> = {
  verified: CheckCircle,
  live: Eye,
  trending: TrendingUp,
  featured: Star,
  high: Zap,
  medium: Clock,
  low: Clock,
  popular: Heart,
  new: Star,
  space: Users,
  event: Calendar,
  location: MapPin,
  role: Crown,
  success: CheckCircle,
  warning: Zap,
  error: Shield,
  neutral: Star,
};

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  /** Optional icon to display */
  icon?: LucideIcon | string;
  /** Show default icon for variant */
  showIcon?: boolean;
  /** Animate the badge */
  animated?: boolean;
  /** Count or number to display */
  count?: number | string;
  /** Dot indicator instead of content */
  dot?: boolean;
  /** Pulse animation for live states */
  pulse?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ 
    className, 
    variant = 'neutral', 
    size = 'sm', 
    shape = 'rounded',
    icon: IconProp, 
    showIcon = false,
    animated = false,
    count,
    dot = false,
    pulse = false,
    children, 
    ...props 
  }, ref) => {
    const Icon = typeof IconProp === 'string' ? badgeIcons[IconProp] : IconProp;
    const DefaultIcon = showIcon && variant ? badgeIcons[variant] : null;
    const IconComponent = Icon || DefaultIcon;

    // Auto-enable pulse for live variant
    const shouldPulse = pulse || variant === 'live';

    const badgeContent = dot ? null : (
      <>
        {IconComponent && (
          <IconComponent className={cn(
            'shrink-0',
            size === 'xs' && 'h-2.5 w-2.5',
            size === 'sm' && 'h-3 w-3',
            size === 'md' && 'h-3.5 w-3.5',
            size === 'lg' && 'h-4 w-4',
            size === 'xl' && 'h-4 w-4',
          )} />
        )}
        {count !== undefined ? count : children}
      </>
    );

    const badgeElement = (
      <div
        ref={ref}
        className={cn(
          badgeVariants({ variant, size, shape }),
          dot && 'p-0 h-2 w-2 min-w-2',
          shouldPulse && 'animate-pulse',
          className
        )}
        {...props}
      >
        {badgeContent}
      </div>
    );

    if (animated) {
      return (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          {badgeElement}
        </motion.div>
      );
    }

    return badgeElement;
  }
);

Badge.displayName = 'Badge';

// Specialized Badge Components
export interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  status: 'verified' | 'live' | 'trending' | 'featured' | 'new';
}

export const StatusBadge = React.forwardRef<HTMLDivElement, StatusBadgeProps>(
  ({ status, showIcon = true, ...props }, ref) => (
    <Badge
      ref={ref}
      variant={status}
      showIcon={showIcon}
      {...props}
    />
  )
);

StatusBadge.displayName = 'StatusBadge';

export interface PriorityBadgeProps extends Omit<BadgeProps, 'variant'> {
  priority: 'high' | 'medium' | 'low';
}

export const PriorityBadge = React.forwardRef<HTMLDivElement, PriorityBadgeProps>(
  ({ priority, showIcon = true, ...props }, ref) => (
    <Badge
      ref={ref}
      variant={priority}
      showIcon={showIcon}
      {...props}
    />
  )
);

PriorityBadge.displayName = 'PriorityBadge';

export interface CountBadgeProps extends Omit<BadgeProps, 'children'> {
  count: number;
  max?: number;
  showZero?: boolean;
}

export const CountBadge = React.forwardRef<HTMLDivElement, CountBadgeProps>(
  ({ count, max = 99, showZero = false, ...props }, ref) => {
    if (!showZero && count === 0) return null;
    
    const displayCount = count > max ? `${max}+` : count.toString();
    
    return (
      <Badge
        ref={ref}
        count={displayCount}
        {...props}
      />
    );
  }
);

CountBadge.displayName = 'CountBadge';

export interface DotBadgeProps extends Omit<BadgeProps, 'children' | 'dot'> {
  show?: boolean;
}

export const DotBadge = React.forwardRef<HTMLDivElement, DotBadgeProps>(
  ({ show = true, ...props }, ref) => {
    if (!show) return null;
    
    return (
      <Badge
        ref={ref}
        dot
        {...props}
      />
    );
  }
);

DotBadge.displayName = 'DotBadge';

// Badge Group for multiple badges
export interface BadgeGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  spacing?: 'tight' | 'normal' | 'loose';
  wrap?: boolean;
}

export const BadgeGroup = React.forwardRef<HTMLDivElement, BadgeGroupProps>(
  ({ className, spacing = 'normal', wrap = true, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'flex items-center',
        spacing === 'tight' && 'gap-1',
        spacing === 'normal' && 'gap-1.5',
        spacing === 'loose' && 'gap-2',
        wrap && 'flex-wrap',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

BadgeGroup.displayName = 'BadgeGroup';

export { Badge, badgeVariants }; 