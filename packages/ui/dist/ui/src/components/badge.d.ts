import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const badgeVariants: (props?: {
    variant?: "outline" | "floating" | "accent" | "interactive" | "online" | "away" | "busy" | "pill" | "removable" | "selectable" | "chip" | "ritual" | "mention" | "hashtag";
    size?: "default" | "xs" | "sm" | "lg" | "xl";
} & import("class-variance-authority/types").ClassProp) => string;
export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'>, VariantProps<typeof badgeVariants> {
    removable?: boolean;
    selectable?: boolean;
    selected?: boolean;
    onRemove?: () => void;
    onSelect?: (selected: boolean) => void;
    icon?: React.ReactNode;
    rightIcon?: React.ReactNode;
}
declare const Badge: React.ForwardRefExoticComponent<BadgeProps & React.RefAttributes<HTMLDivElement>>;
declare const NotificationBadge: React.ForwardRefExoticComponent<Omit<BadgeProps, "children"> & {
    count: number;
    max?: number;
} & React.RefAttributes<HTMLDivElement>>;
declare const StatusBadge: React.ForwardRefExoticComponent<Omit<BadgeProps, "variant" | "children"> & {
    status: "online" | "away" | "offline" | "busy";
} & React.RefAttributes<HTMLDivElement>>;
declare const MentionBadge: React.ForwardRefExoticComponent<Omit<BadgeProps, "variant" | "children"> & {
    username: string;
    interactive?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const HashtagBadge: React.ForwardRefExoticComponent<Omit<BadgeProps, "variant" | "children"> & {
    tag: string;
    interactive?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const ChipGroup: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & {
    orientation?: "horizontal" | "vertical";
    wrap?: boolean;
    spacing?: "sm" | "default" | "lg";
} & React.RefAttributes<HTMLDivElement>>;
declare const InteractiveChip: React.ForwardRefExoticComponent<Omit<BadgeProps, "variant" | "onToggle" | "onSelect"> & {
    value: string;
    selected?: boolean;
    onToggle?: (value: string, selected: boolean) => void;
    addable?: boolean;
} & React.RefAttributes<HTMLDivElement>>;
declare const FilterChip: React.ForwardRefExoticComponent<Omit<BadgeProps, "variant"> & {
    active?: boolean;
    count?: number;
    onToggle?: () => void;
} & React.RefAttributes<HTMLDivElement>>;
export { Badge, NotificationBadge, StatusBadge, MentionBadge, HashtagBadge, ChipGroup, InteractiveChip, FilterChip, badgeVariants };
//# sourceMappingURL=badge.d.ts.map