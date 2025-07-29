import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { getTestProps } from '../lib/accessibility-foundation';
import { responsiveText, responsiveAnimations } from '../lib/responsive-foundation';
import { componentBase } from '../lib/component-foundation';

// HIVE Badge variants - Luxury chips with standardized foundation patterns
const hiveBadgeVariants = cva(
  cn(
    "inline-flex items-center gap-1.5 font-medium select-none",
    responsiveAnimations.motion,
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-primary)]/30 focus-visible:ring-offset-1"
  ),
  {
    variants: {
      variant: {
        // Academic year - luxury hierarchy with heavy radius
        "freshman": "bg-[var(--hive-text-primary)]/5 text-[var(--hive-text-tertiary)] px-2 py-1 rounded-xl text-xs",
        "sophomore": "bg-[var(--hive-text-primary)]/8 text-[var(--hive-text-secondary)] px-2 py-1 rounded-xl text-xs",
        "junior": "bg-[var(--hive-text-primary)]/12 text-[var(--hive-text-primary)] px-2 py-1 rounded-xl text-xs",
        "senior": "bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] px-2 py-1 rounded-xl text-xs",
        "grad": "bg-[var(--hive-brand-secondary)]/15 text-[var(--hive-brand-secondary)] px-2 py-1 rounded-xl text-xs font-medium",
        "phd": "bg-[var(--hive-brand-secondary)]/30 text-[var(--hive-brand-secondary)] px-2.5 py-1 rounded-xl text-xs font-medium",
        
        // Tool mastery - luxury progression with heavy radius
        "tool-newbie": "bg-[var(--hive-text-primary)]/5 text-[var(--hive-text-tertiary)] px-2 py-1 rounded-xl text-xs",
        "tool-builder": "bg-[var(--hive-text-primary)]/8 text-[var(--hive-text-secondary)] px-2 py-1 rounded-xl text-xs",
        "tool-expert": "bg-[var(--hive-text-primary)]/12 text-[var(--hive-text-primary)] px-2 py-1 rounded-xl text-xs",
        "tool-legend": "bg-[var(--hive-brand-secondary)]/15 text-[var(--hive-brand-secondary)] px-2.5 py-1 rounded-xl text-xs font-medium",
        
        // Study patterns - luxury status with heavy radius
        "night-owl": "bg-[var(--hive-text-primary)]/8 text-[var(--hive-text-secondary)] px-2 py-1 rounded-xl text-xs",
        "early-bird": "bg-[var(--hive-text-primary)]/8 text-[var(--hive-text-secondary)] px-2 py-1 rounded-xl text-xs",
        "grind-mode": "bg-[var(--hive-text-primary)]/12 text-[var(--hive-text-primary)] px-2 py-1 rounded-xl text-xs font-medium",
        "study-streak": "bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] px-2 py-1 rounded-xl text-xs",
        
        // Collaboration - luxury states with heavy radius
        "solo-grinder": "bg-[var(--hive-text-primary)]/5 text-[var(--hive-text-tertiary)] px-2 py-1 rounded-xl text-xs",
        "study-buddy": "bg-[var(--hive-text-primary)]/8 text-[var(--hive-text-secondary)] px-2 py-1 rounded-xl text-xs",
        "group-leader": "bg-[var(--hive-text-primary)]/12 text-[var(--hive-text-primary)] px-2 py-1 rounded-xl text-xs font-medium",
        "mentor": "bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] px-2 py-1 rounded-xl text-xs",
        
        // Activity states - luxury indicators with heavy radius
        "in-lab": "bg-[var(--hive-text-primary)]/8 text-[var(--hive-text-secondary)] px-2 py-1 rounded-xl text-xs",
        "office-hours": "bg-[var(--hive-text-primary)]/8 text-[var(--hive-text-secondary)] px-2 py-1 rounded-xl text-xs",
        "cramming": "bg-[var(--hive-text-primary)]/12 text-[var(--hive-text-primary)] px-2 py-1 rounded-xl text-xs font-medium",
        "building-tools": "bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] px-2 py-1 rounded-xl text-xs",
        "debugging": "bg-[var(--hive-text-primary)]/8 text-[var(--hive-text-secondary)] px-2 py-1 rounded-xl text-xs",
        "finals-week": "bg-[var(--hive-text-primary)]/12 text-[var(--hive-text-primary)] px-2 py-1 rounded-xl text-xs font-medium",
        
        // Achievements - luxury recognition with heavy radius
        "deans-list": "bg-[var(--hive-brand-secondary)]/15 text-[var(--hive-brand-secondary)] px-2.5 py-1 rounded-xl text-xs font-medium",
        "honors": "bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] px-2 py-1 rounded-xl text-xs",
        "perfect-gpa": "bg-[var(--hive-brand-secondary)]/30 text-[var(--hive-brand-secondary)] px-2.5 py-1 rounded-xl text-xs font-medium",
        "thesis-defense": "bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] px-2 py-1 rounded-xl text-xs",
        "internship": "bg-[var(--hive-text-primary)]/12 text-[var(--hive-text-primary)] px-2 py-1 rounded-xl text-xs",
        "published": "bg-[var(--hive-text-primary)]/12 text-[var(--hive-text-primary)] px-2 py-1 rounded-xl text-xs font-medium",
        
        // Urgent states - luxury alerts with heavy radius
        "midterm-szn": "bg-[var(--hive-text-primary)]/12 text-[var(--hive-text-primary)] px-2 py-1 rounded-xl text-xs font-medium",
        "exam-prep": "bg-[var(--hive-text-primary)]/8 text-[var(--hive-text-secondary)] px-2 py-1 rounded-xl text-xs",
        "project-due": "bg-[var(--hive-border-default)] text-[var(--hive-text-primary)] px-2 py-1 rounded-xl text-xs font-medium",
        "all-nighter": "bg-[var(--hive-text-primary)]/8 text-[var(--hive-text-secondary)] px-2 py-1 rounded-xl text-xs",
        "office-hours-hero": "bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] px-2 py-1 rounded-xl text-xs",
        
        // Elite status - luxury excellence with heavy radius
        "ta-approved": "bg-[var(--hive-brand-secondary)]/15 text-[var(--hive-brand-secondary)] px-2 py-1 rounded-xl text-xs font-medium",
        "prof-favorite": "bg-[var(--hive-brand-secondary)]/30 text-[var(--hive-brand-secondary)] px-2.5 py-1 rounded-xl text-xs font-medium",
        "study-group-mvp": "bg-[var(--hive-text-primary)]/12 text-[var(--hive-text-primary)] px-2 py-1 rounded-xl text-xs font-medium",
        "tools-guru": "bg-[var(--hive-brand-secondary)]/15 text-[var(--hive-brand-secondary)] px-2 py-1 rounded-xl text-xs font-medium",
        "campus-legend": "bg-[var(--hive-brand-secondary)]/40 text-[var(--hive-brand-secondary)] px-2.5 py-1 rounded-xl text-xs font-semibold",
        
        // Tags - luxury categorization with heavy radius
        "course-tag": "bg-[var(--hive-text-disabled)] text-[var(--hive-text-tertiary)] px-2 py-0.5 rounded-xl text-xs",
        "major-tag": "bg-[var(--hive-text-primary)]/5 text-[var(--hive-text-secondary)] px-2 py-0.5 rounded-xl text-xs",
        "skill-tag": "bg-[var(--hive-text-primary)]/5 text-[var(--hive-text-secondary)] px-2 py-0.5 rounded-xl text-xs",
        "tool-tag": "bg-[var(--hive-text-primary)]/5 text-[var(--hive-text-secondary)] px-2 py-0.5 rounded-xl text-xs",
        "active-tag": "bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] px-2 py-0.5 rounded-xl text-xs",
      },
      
      size: {
        "xs": "text-xs px-1.5 py-0.5 min-h-[20px]",
        "sm": "text-xs px-2 py-1 min-h-[24px]", 
        "default": "text-sm px-2.5 py-1 min-h-[28px]",
        "lg": "text-sm px-3 py-1.5 min-h-[32px]",
        "xl": "text-base px-4 py-2 min-h-[36px]",
      },
      
      shape: {
        "pill": "rounded-full",
        "rounded": "rounded-xl",      // Heavy radius default
        "square": "rounded-lg",       // Heavy radius even on square
        "sharp": "rounded-md",       // Minimal heavy radius
      },
    },
    defaultVariants: {
      variant: "course-tag",
      size: "default", 
      shape: "rounded",
    },
  }
);

export interface HiveBadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof hiveBadgeVariants> {
  count?: number;
  dot?: boolean;
  // Accessibility props
  'aria-label'?: string;
  'data-testid'?: string;
  // Interactive properties
  interactive?: boolean;
  selected?: boolean;
}

const HiveBadge = React.forwardRef<HTMLDivElement, HiveBadgeProps>(
  ({ 
    className, 
    variant, 
    size, 
    shape,
    count,
    dot = false,
    interactive = false,
    selected = false,
    'aria-label': ariaLabel,
    'data-testid': testId,
    children,
    onClick,
    onKeyDown,
    ...props 
  }, ref) => {
    
    // Enhanced accessibility and interaction handling
    const testingProps = getTestProps(testId, 'HiveBadge');
    
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (interactive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.(e as any);
      }
      onKeyDown?.(e);
    };
    
    return (
      <div
        className={cn(
          hiveBadgeVariants({ variant, size, shape }),
          dot && "relative",
          interactive && "cursor-pointer hover:scale-105 active:scale-95",
          selected && "ring-2 ring-[var(--hive-brand-primary)]/50",
          className
        )}
        ref={ref}
        role={interactive ? 'button' : 'status'}
        tabIndex={interactive ? 0 : undefined}
        aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
        aria-pressed={interactive && selected ? selected : undefined}
        onClick={interactive ? onClick : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        {...testingProps}
        {...props}
      >
        {children}
        {count !== undefined && count > 0 && (
          <span className="ml-1 text-xs font-bold" aria-hidden="true">
            {count > 99 ? '99+' : count}
          </span>
        )}
        {dot && (
          <span 
            className="absolute -top-1 -right-1 w-2 h-2 bg-[var(--hive-brand-secondary)] rounded-full"
            aria-hidden="true"
          />
        )}
      </div>
    );
  }
);

HiveBadge.displayName = "HiveBadge";

// Pre-built badge components for HIVE platform with enhanced accessibility
const FreshmanBadge = ({ ...props }: Omit<HiveBadgeProps, 'variant'>) => (
  <HiveBadge variant="freshman" aria-label="Academic status: Freshman" {...props}>
    Freshman
  </HiveBadge>
);

const ToolLegendBadge = ({ count, ...props }: Omit<HiveBadgeProps, 'variant'> & { count?: number }) => (
  <HiveBadge 
    variant="tool-legend" 
    aria-label={`Tool mastery status: Legend${count ? ` with ${count} tools` : ''}`}
    {...props}
  >
    Tool Legend {count && `• ${count}`}
  </HiveBadge>
);

const GrindModeBadge = ({ ...props }: Omit<HiveBadgeProps, 'variant'>) => (
  <HiveBadge variant="grind-mode" aria-label="Study status: Grind Mode active" {...props}>
    Grind Mode
  </HiveBadge>
);

const DeansListBadge = ({ ...props }: Omit<HiveBadgeProps, 'variant'>) => (
  <HiveBadge variant="deans-list" aria-label="Academic achievement: Dean's List" {...props}>
    Dean's List
  </HiveBadge>
);

const AllNighterBadge = ({ ...props }: Omit<HiveBadgeProps, 'variant'>) => (
  <HiveBadge variant="all-nighter" aria-label="Study status: All-nighter session" {...props}>
    All-Nighter
  </HiveBadge>
);

const TAApprovedBadge = ({ ...props }: Omit<HiveBadgeProps, 'variant'>) => (
  <HiveBadge variant="ta-approved" aria-label="Recognition: Teaching Assistant approved" {...props}>
    TA Approved
  </HiveBadge>
);

const CampusLegendBadge = ({ ...props }: Omit<HiveBadgeProps, 'variant'>) => (
  <HiveBadge variant="campus-legend" aria-label="Elite status: Campus Legend" {...props}>
    Campus Legend
  </HiveBadge>
);

const FinalsWeekBadge = ({ ...props }: Omit<HiveBadgeProps, 'variant'>) => (
  <HiveBadge variant="finals-week" aria-label="Study period: Finals Week" {...props}>
    Finals Week
  </HiveBadge>
);

export { 
  HiveBadge, 
  hiveBadgeVariants,
  FreshmanBadge,
  ToolLegendBadge,
  GrindModeBadge,
  DeansListBadge,
  AllNighterBadge,
  TAApprovedBadge,
  CampusLegendBadge,
  FinalsWeekBadge
};