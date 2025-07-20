import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

// HIVE Badge variants - Luxury chips with dark luxury palette and heavy radius
const hiveBadgeVariants = cva(
  "inline-flex items-center gap-1.5 font-medium transition-all duration-300 ease-out",
  {
    variants: {
      variant: {
        // Academic year - luxury hierarchy with heavy radius
        "freshman": "bg-white/5 text-[#9B9B9F] px-2 py-1 rounded-xl text-xs",
        "sophomore": "bg-white/8 text-[#C1C1C4] px-2 py-1 rounded-xl text-xs",
        "junior": "bg-white/12 text-[#E5E5E7] px-2 py-1 rounded-xl text-xs",
        "senior": "bg-[#FFD700]/10 text-[#FFD700] px-2 py-1 rounded-xl text-xs",
        "grad": "bg-[#FFD700]/15 text-[#FFD700] px-2 py-1 rounded-xl text-xs font-medium",
        "phd": "bg-[#FFD700]/30 text-[#FFD700] px-2.5 py-1 rounded-xl text-xs font-medium",
        
        // Tool mastery - luxury progression with heavy radius
        "tool-newbie": "bg-white/5 text-[#9B9B9F] px-2 py-1 rounded-xl text-xs",
        "tool-builder": "bg-white/8 text-[#C1C1C4] px-2 py-1 rounded-xl text-xs",
        "tool-expert": "bg-white/12 text-[#E5E5E7] px-2 py-1 rounded-xl text-xs",
        "tool-legend": "bg-[#FFD700]/15 text-[#FFD700] px-2.5 py-1 rounded-xl text-xs font-medium",
        
        // Study patterns - luxury status with heavy radius
        "night-owl": "bg-white/8 text-[#C1C1C4] px-2 py-1 rounded-xl text-xs",
        "early-bird": "bg-white/8 text-[#C1C1C4] px-2 py-1 rounded-xl text-xs",
        "grind-mode": "bg-white/12 text-[#E5E5E7] px-2 py-1 rounded-xl text-xs font-medium",
        "study-streak": "bg-[#FFD700]/10 text-[#FFD700] px-2 py-1 rounded-xl text-xs",
        
        // Collaboration - luxury states with heavy radius
        "solo-grinder": "bg-white/5 text-[#9B9B9F] px-2 py-1 rounded-xl text-xs",
        "study-buddy": "bg-white/8 text-[#C1C1C4] px-2 py-1 rounded-xl text-xs",
        "group-leader": "bg-white/12 text-[#E5E5E7] px-2 py-1 rounded-xl text-xs font-medium",
        "mentor": "bg-[#FFD700]/10 text-[#FFD700] px-2 py-1 rounded-xl text-xs",
        
        // Activity states - luxury indicators with heavy radius
        "in-lab": "bg-white/8 text-[#C1C1C4] px-2 py-1 rounded-xl text-xs",
        "office-hours": "bg-white/8 text-[#C1C1C4] px-2 py-1 rounded-xl text-xs",
        "cramming": "bg-white/12 text-[#E5E5E7] px-2 py-1 rounded-xl text-xs font-medium",
        "building-tools": "bg-[#FFD700]/10 text-[#FFD700] px-2 py-1 rounded-xl text-xs",
        "debugging": "bg-white/8 text-[#C1C1C4] px-2 py-1 rounded-xl text-xs",
        "finals-week": "bg-white/12 text-[#E5E5E7] px-2 py-1 rounded-xl text-xs font-medium",
        
        // Achievements - luxury recognition with heavy radius
        "deans-list": "bg-[#FFD700]/15 text-[#FFD700] px-2.5 py-1 rounded-xl text-xs font-medium",
        "honors": "bg-[#FFD700]/10 text-[#FFD700] px-2 py-1 rounded-xl text-xs",
        "perfect-gpa": "bg-[#FFD700]/30 text-[#FFD700] px-2.5 py-1 rounded-xl text-xs font-medium",
        "thesis-defense": "bg-[#FFD700]/10 text-[#FFD700] px-2 py-1 rounded-xl text-xs",
        "internship": "bg-white/12 text-[#E5E5E7] px-2 py-1 rounded-xl text-xs",
        "published": "bg-white/12 text-[#E5E5E7] px-2 py-1 rounded-xl text-xs font-medium",
        
        // Urgent states - luxury alerts with heavy radius
        "midterm-szn": "bg-white/12 text-[#E5E5E7] px-2 py-1 rounded-xl text-xs font-medium",
        "exam-prep": "bg-white/8 text-[#C1C1C4] px-2 py-1 rounded-xl text-xs",
        "project-due": "bg-[#2A2A2D] text-[#E5E5E7] px-2 py-1 rounded-xl text-xs font-medium",
        "all-nighter": "bg-white/8 text-[#C1C1C4] px-2 py-1 rounded-xl text-xs",
        "office-hours-hero": "bg-[#FFD700]/10 text-[#FFD700] px-2 py-1 rounded-xl text-xs",
        
        // Elite status - luxury excellence with heavy radius
        "ta-approved": "bg-[#FFD700]/15 text-[#FFD700] px-2 py-1 rounded-xl text-xs font-medium",
        "prof-favorite": "bg-[#FFD700]/30 text-[#FFD700] px-2.5 py-1 rounded-xl text-xs font-medium",
        "study-group-mvp": "bg-white/12 text-[#E5E5E7] px-2 py-1 rounded-xl text-xs font-medium",
        "tools-guru": "bg-[#FFD700]/15 text-[#FFD700] px-2 py-1 rounded-xl text-xs font-medium",
        "campus-legend": "bg-[#FFD700]/40 text-[#FFD700] px-2.5 py-1 rounded-xl text-xs font-semibold",
        
        // Tags - luxury categorization with heavy radius
        "course-tag": "bg-[#4A4A4F] text-[#9B9B9F] px-2 py-0.5 rounded-xl text-xs",
        "major-tag": "bg-white/5 text-[#C1C1C4] px-2 py-0.5 rounded-xl text-xs",
        "skill-tag": "bg-white/5 text-[#C1C1C4] px-2 py-0.5 rounded-xl text-xs",
        "tool-tag": "bg-white/5 text-[#C1C1C4] px-2 py-0.5 rounded-xl text-xs",
        "active-tag": "bg-[#FFD700]/10 text-[#FFD700] px-2 py-0.5 rounded-xl text-xs",
      },
      
      size: {
        "xs": "text-xs px-1.5 py-0.5",
        "sm": "text-xs px-2 py-1", 
        "default": "text-sm px-2.5 py-1",
        "lg": "text-sm px-3 py-1.5",
        "xl": "text-base px-4 py-2",
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
}

const HiveBadge = React.forwardRef<HTMLDivElement, HiveBadgeProps>(
  ({ 
    className, 
    variant, 
    size, 
    shape,
    count,
    dot = false,
    children,
    ...props 
  }, ref) => {
    
    return (
      <div
        className={cn(
          hiveBadgeVariants({ variant, size, shape }),
          dot && "relative",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
        {count !== undefined && count > 0 && (
          <span className="ml-1 text-xs font-bold">
            {count > 99 ? '99+' : count}
          </span>
        )}
        {dot && (
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#FFD700] rounded-full"></span>
        )}
      </div>
    );
  }
);

HiveBadge.displayName = "HiveBadge";

// Pre-built badge components for HIVE platform
const FreshmanBadge = ({ ...props }: Omit<HiveBadgeProps, 'variant'>) => (
  <HiveBadge variant="freshman" {...props}>
    Freshman
  </HiveBadge>
);

const ToolLegendBadge = ({ count, ...props }: Omit<HiveBadgeProps, 'variant'> & { count?: number }) => (
  <HiveBadge variant="tool-legend" {...props}>
    Tool Legend {count && `• ${count}`}
  </HiveBadge>
);

const GrindModeBadge = ({ ...props }: Omit<HiveBadgeProps, 'variant'>) => (
  <HiveBadge variant="grind-mode" {...props}>
    Grind Mode
  </HiveBadge>
);

const DeansListBadge = ({ ...props }: Omit<HiveBadgeProps, 'variant'>) => (
  <HiveBadge variant="deans-list" {...props}>
    Dean's List
  </HiveBadge>
);

const AllNighterBadge = ({ ...props }: Omit<HiveBadgeProps, 'variant'>) => (
  <HiveBadge variant="all-nighter" {...props}>
    All-Nighter
  </HiveBadge>
);

const TAApprovedBadge = ({ ...props }: Omit<HiveBadgeProps, 'variant'>) => (
  <HiveBadge variant="ta-approved" {...props}>
    TA Approved
  </HiveBadge>
);

const CampusLegendBadge = ({ ...props }: Omit<HiveBadgeProps, 'variant'>) => (
  <HiveBadge variant="campus-legend" {...props}>
    Campus Legend
  </HiveBadge>
);

const FinalsWeekBadge = ({ ...props }: Omit<HiveBadgeProps, 'variant'>) => (
  <HiveBadge variant="finals-week" {...props}>
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