import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveBadgeVariants: (props?: {
    variant?: "default" | "secondary" | "success" | "warning" | "outline" | "destructive" | "freshman" | "sophomore" | "junior" | "senior" | "grad" | "phd" | "tool-newbie" | "tool-builder" | "tool-expert" | "tool-legend" | "night-owl" | "early-bird" | "grind-mode" | "study-streak" | "solo-grinder" | "study-buddy" | "group-leader" | "mentor" | "in-lab" | "office-hours" | "cramming" | "building-tools" | "debugging" | "finals-week" | "deans-list" | "honors" | "perfect-gpa" | "thesis-defense" | "internship" | "published" | "midterm-szn" | "exam-prep" | "project-due" | "all-nighter" | "office-hours-hero" | "ta-approved" | "prof-favorite" | "study-group-mvp" | "tools-guru" | "campus-legend" | "course-tag" | "major-tag" | "skill-tag" | "tool-tag" | "active-tag";
    size?: "default" | "xs" | "sm" | "lg" | "xl";
    shape?: "rounded" | "square" | "pill" | "sharp";
} & import("class-variance-authority/types").ClassProp) => string;
export interface HiveBadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof hiveBadgeVariants> {
    count?: number;
    dot?: boolean;
    'aria-label'?: string;
    'data-testid'?: string;
    interactive?: boolean;
    selected?: boolean;
}
declare const HiveBadge: React.ForwardRefExoticComponent<HiveBadgeProps & React.RefAttributes<HTMLDivElement>>;
declare const FreshmanBadge: ({ ...props }: Omit<HiveBadgeProps, "variant">) => import("react/jsx-runtime").JSX.Element;
declare const ToolLegendBadge: ({ count, ...props }: Omit<HiveBadgeProps, "variant"> & {
    count?: number;
}) => import("react/jsx-runtime").JSX.Element;
declare const GrindModeBadge: ({ ...props }: Omit<HiveBadgeProps, "variant">) => import("react/jsx-runtime").JSX.Element;
declare const DeansListBadge: ({ ...props }: Omit<HiveBadgeProps, "variant">) => import("react/jsx-runtime").JSX.Element;
declare const AllNighterBadge: ({ ...props }: Omit<HiveBadgeProps, "variant">) => import("react/jsx-runtime").JSX.Element;
declare const TAApprovedBadge: ({ ...props }: Omit<HiveBadgeProps, "variant">) => import("react/jsx-runtime").JSX.Element;
declare const CampusLegendBadge: ({ ...props }: Omit<HiveBadgeProps, "variant">) => import("react/jsx-runtime").JSX.Element;
declare const FinalsWeekBadge: ({ ...props }: Omit<HiveBadgeProps, "variant">) => import("react/jsx-runtime").JSX.Element;
export { HiveBadge, hiveBadgeVariants, FreshmanBadge, ToolLegendBadge, GrindModeBadge, DeansListBadge, AllNighterBadge, TAApprovedBadge, CampusLegendBadge, FinalsWeekBadge };
//# sourceMappingURL=hive-badge.d.ts.map