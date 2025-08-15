import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { getTestProps } from '../lib/accessibility-foundation';
import { responsiveAnimations } from '../lib/responsive-foundation';
// HIVE Badge variants - Luxury chips with standardized foundation patterns
const hiveBadgeVariants = cva(cn("inline-flex items-center gap-1.5 font-medium select-none", responsiveAnimations.motion, "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-brand-primary)]/30 focus-visible:ring-offset-1"), {
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
            // Common utility variants
            "default": "bg-[var(--hive-text-primary)]/8 text-[var(--hive-text-secondary)] px-2 py-1 rounded-xl text-xs",
            "secondary": "bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] px-2 py-1 rounded-xl text-xs",
            "outline": "border border-[var(--hive-text-primary)]/20 text-[var(--hive-text-secondary)] px-2 py-1 rounded-xl text-xs bg-transparent",
            "destructive": "bg-red-100 text-red-800 px-2 py-1 rounded-xl text-xs",
            "success": "bg-green-100 text-green-800 px-2 py-1 rounded-xl text-xs",
            "warning": "bg-yellow-100 text-yellow-800 px-2 py-1 rounded-xl text-xs",
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
            "rounded": "rounded-xl", // Heavy radius default
            "square": "rounded-lg", // Heavy radius even on square
            "sharp": "rounded-md", // Minimal heavy radius
        },
    },
    defaultVariants: {
        variant: "course-tag",
        size: "default",
        shape: "rounded",
    },
});
const HiveBadge = React.forwardRef(({ className, variant, size, shape, count, dot = false, interactive = false, selected = false, 'aria-label': ariaLabel, 'data-testid': testId, children, onClick, onKeyDown, ...props }, ref) => {
    // Enhanced accessibility and interaction handling
    const testingProps = getTestProps(testId, 'HiveBadge');
    const handleKeyDown = (e) => {
        if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            onClick?.(e);
        }
        onKeyDown?.(e);
    };
    return (_jsxs("div", { className: cn(hiveBadgeVariants({ variant, size, shape }), dot && "relative", interactive && "cursor-pointer hover:scale-105 active:scale-95", selected && "ring-2 ring-[var(--hive-brand-primary)]/50", className), ref: ref, role: interactive ? 'button' : 'status', tabIndex: interactive ? 0 : undefined, "aria-label": ariaLabel || (typeof children === 'string' ? children : undefined), "aria-pressed": interactive && selected ? selected : undefined, onClick: interactive ? onClick : undefined, onKeyDown: interactive ? handleKeyDown : undefined, ...testingProps, ...props, children: [children, count !== undefined && count > 0 && (_jsx("span", { className: "ml-1 text-xs font-bold", "aria-hidden": "true", children: count > 99 ? '99+' : count })), dot && (_jsx("span", { className: "absolute -top-1 -right-1 w-2 h-2 bg-[var(--hive-brand-secondary)] rounded-full", "aria-hidden": "true" }))] }));
});
HiveBadge.displayName = "HiveBadge";
// Pre-built badge components for HIVE platform with enhanced accessibility
const FreshmanBadge = ({ ...props }) => (_jsx(HiveBadge, { variant: "freshman", "aria-label": "Academic status: Freshman", ...props, children: "Freshman" }));
const ToolLegendBadge = ({ count, ...props }) => (_jsxs(HiveBadge, { variant: "tool-legend", "aria-label": `Tool mastery status: Legend${count ? ` with ${count} tools` : ''}`, ...props, children: ["Tool Legend ", count && `• ${count}`] }));
const GrindModeBadge = ({ ...props }) => (_jsx(HiveBadge, { variant: "grind-mode", "aria-label": "Study status: Grind Mode active", ...props, children: "Grind Mode" }));
const DeansListBadge = ({ ...props }) => (_jsx(HiveBadge, { variant: "deans-list", "aria-label": "Academic achievement: Dean's List", ...props, children: "Dean's List" }));
const AllNighterBadge = ({ ...props }) => (_jsx(HiveBadge, { variant: "all-nighter", "aria-label": "Study status: All-nighter session", ...props, children: "All-Nighter" }));
const TAApprovedBadge = ({ ...props }) => (_jsx(HiveBadge, { variant: "ta-approved", "aria-label": "Recognition: Teaching Assistant approved", ...props, children: "TA Approved" }));
const CampusLegendBadge = ({ ...props }) => (_jsx(HiveBadge, { variant: "campus-legend", "aria-label": "Elite status: Campus Legend", ...props, children: "Campus Legend" }));
const FinalsWeekBadge = ({ ...props }) => (_jsx(HiveBadge, { variant: "finals-week", "aria-label": "Study period: Finals Week", ...props, children: "Finals Week" }));
export { HiveBadge, hiveBadgeVariants, FreshmanBadge, ToolLegendBadge, GrindModeBadge, DeansListBadge, AllNighterBadge, TAApprovedBadge, CampusLegendBadge, FinalsWeekBadge };
//# sourceMappingURL=hive-badge.js.map