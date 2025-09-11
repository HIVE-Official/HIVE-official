import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
declare const profileBadgeVariants: (props?: ({
    size?: "sm" | "lg" | "xs" | "md" | null | undefined;
    variant?: "default" | "ghost" | "academic" | "social" | "builder" | "leader" | "verified" | "achievement" | "streak" | null | undefined;
    interactive?: boolean | null | undefined;
    pulsing?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export declare const BADGE_TYPES: {
    readonly builder: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Builder";
        readonly variant: "builder";
        readonly description: "Active tool creator and community builder";
    };
    readonly verified: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Verified";
        readonly variant: "verified";
        readonly description: "Verified student account";
    };
    readonly leader: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Leader";
        readonly variant: "leader";
        readonly description: "Community leader and space moderator";
    };
    readonly ghost: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Ghost Mode";
        readonly variant: "ghost";
        readonly description: "Privacy mode enabled";
    };
    readonly achievement: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Achiever";
        readonly variant: "achievement";
        readonly description: "Unlocked special achievements";
    };
    readonly streak: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Streak";
        readonly variant: "streak";
        readonly description: "Active daily streak";
    };
    readonly academic: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Scholar";
        readonly variant: "academic";
        readonly description: "Academic excellence recognition";
    };
    readonly social: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Connector";
        readonly variant: "social";
        readonly description: "Active community member";
    };
};
export type BadgeType = keyof typeof BADGE_TYPES;
export interface ProfileBadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof profileBadgeVariants> {
    type?: BadgeType;
    label?: string;
    icon?: LucideIcon;
    value?: string | number;
    showIcon?: boolean;
    showValue?: boolean;
    onClick?: () => void;
    tooltip?: string;
}
export declare function ProfileBadge({ type, label, icon: CustomIcon, value, showIcon, showValue, onClick, tooltip, size, variant, interactive, pulsing, className, ...props }: ProfileBadgeProps): import("react/jsx-runtime").JSX.Element;
export declare function BuilderBadge({ size, ...props }: Omit<ProfileBadgeProps, 'type'>): import("react/jsx-runtime").JSX.Element;
export declare function VerifiedBadge({ size, ...props }: Omit<ProfileBadgeProps, 'type'>): import("react/jsx-runtime").JSX.Element;
export declare function LeaderBadge({ size, ...props }: Omit<ProfileBadgeProps, 'type'>): import("react/jsx-runtime").JSX.Element;
export declare function GhostBadge({ size, ...props }: Omit<ProfileBadgeProps, 'type'>): import("react/jsx-runtime").JSX.Element;
export declare function StreakBadge({ value, size, ...props }: Omit<ProfileBadgeProps, 'type'> & {
    value?: number;
}): import("react/jsx-runtime").JSX.Element;
export declare function AchievementBadge({ value, size, ...props }: Omit<ProfileBadgeProps, 'type'> & {
    value?: number;
}): import("react/jsx-runtime").JSX.Element;
export { profileBadgeVariants };
//# sourceMappingURL=profile-badge.d.ts.map