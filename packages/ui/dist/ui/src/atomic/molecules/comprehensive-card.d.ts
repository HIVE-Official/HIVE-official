/**
 * HIVE Comprehensive Card Molecule
 * Campus-optimized card system combining header, content, and actions with complete foundation integration
 *
 * Built using all foundation systems:
 * - Typography: Consistent card text hierarchy with campus font stack
 * - Color: Campus semantic colors and contextual background variants
 * - Layout: Systematic spacing between header, content, and action sections
 * - Icon: Contextual icons for card actions and status indicators
 * - Interaction: Hover states, click feedback, and keyboard navigation
 * - Shadow: Dynamic elevation system for card states and interactions
 * - Border: Consistent radius system and semantic border colors
 * - Motion: Liquid card animations with spring physics and morphing effects
 */
import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const comprehensiveCardVariants: (props?: ({
    variant?: "default" | "elevated" | "interactive" | "glass" | "announcement" | "notification" | null | undefined;
    size?: "compact" | "comfortable" | "spacious" | null | undefined;
    campus?: "default" | "space" | "profile" | "event" | "tool" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ComprehensiveCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>, VariantProps<typeof comprehensiveCardVariants> {
    header?: React.ReactNode;
    content?: React.ReactNode;
    footer?: React.ReactNode;
    title?: string;
    subtitle?: string;
    avatar?: string;
    icon?: React.ComponentType<{
        className?: string;
    }>;
    badge?: string | number;
    timestamp?: string;
    actions?: CardAction[];
    menuActions?: CardMenuAction[];
    campusOptimized?: boolean;
    onClick?: () => void;
    onActionClick?: (actionId: string) => void;
}
export interface CardAction {
    id: string;
    label: string;
    icon?: React.ComponentType<{
        className?: string;
    }>;
    variant?: 'primary' | 'secondary' | 'ghost';
    disabled?: boolean;
    onClick?: () => void;
}
export interface CardMenuAction {
    id: string;
    label: string;
    icon?: React.ComponentType<{
        className?: string;
    }>;
    disabled?: boolean;
    destructive?: boolean;
    onClick?: () => void;
}
export declare const ComprehensiveCard: React.ForwardRefExoticComponent<ComprehensiveCardProps & React.RefAttributes<HTMLDivElement>>;
export declare const campusCardPresets: {
    readonly spaceCard: {
        readonly variant: "interactive";
        readonly campus: "space";
        readonly actions: readonly [{
            readonly id: "join";
            readonly label: "Join Space";
            readonly variant: "primary";
            readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        }, {
            readonly id: "bookmark";
            readonly label: "Bookmark";
            readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        }];
    };
    readonly toolCard: {
        readonly variant: "interactive";
        readonly campus: "tool";
        readonly actions: readonly [{
            readonly id: "use";
            readonly label: "Use Tool";
            readonly variant: "primary";
            readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        }, {
            readonly id: "like";
            readonly label: "Like";
            readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        }, {
            readonly id: "share";
            readonly label: "Share";
            readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        }];
    };
    readonly eventCard: {
        readonly variant: "elevated";
        readonly campus: "event";
        readonly actions: readonly [{
            readonly id: "rsvp";
            readonly label: "RSVP";
            readonly variant: "primary";
        }, {
            readonly id: "share";
            readonly label: "Share Event";
            readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        }];
    };
    readonly profileCard: {
        readonly variant: "glass";
        readonly campus: "profile";
        readonly actions: readonly [{
            readonly id: "connect";
            readonly label: "Connect";
            readonly variant: "primary";
        }, {
            readonly id: "message";
            readonly label: "Message";
            readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        }];
    };
};
export { comprehensiveCardVariants };
//# sourceMappingURL=comprehensive-card.d.ts.map