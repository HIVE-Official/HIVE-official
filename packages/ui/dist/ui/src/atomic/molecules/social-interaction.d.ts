/**
 * HIVE Social Interaction Molecule
 * Campus-optimized social action group - like/comment/share button combination
 *
 * Built using all foundation systems:
 * - Motion: Spring physics social feedback and liquid interaction animations
 * - Typography: Consistent action labels and count formatting
 * - Color: Campus semantic colors and interaction state feedback
 * - Layout: Systematic spacing between social actions
 * - Icon: Social action icons with proper sizing across variants
 * - Interaction: Hover states, active feedback, and social confirmation
 * - Shadow: Subtle elevation for interactive social buttons
 * - Border: Consistent radius and action button styling
 */
import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const socialInteractionVariants: (props?: ({
    size?: "small" | "base" | "large" | null | undefined;
    layout?: "horizontal" | "vertical" | "compact" | null | undefined;
    variant?: "default" | "ghost" | "contrast" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export type SocialActionType = 'like' | 'comment' | 'share';
export interface SocialActionData {
    type: SocialActionType;
    count: number;
    isActive: boolean;
    label?: string;
}
export interface SocialInteractionProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof socialInteractionVariants> {
    actions: SocialActionData[];
    showLabels?: boolean;
    showCounts?: boolean;
    disabled?: boolean;
    onAction?: (actionType: SocialActionType) => void;
    onLike?: () => void;
    onComment?: () => void;
    onShare?: () => void;
}
declare const actionConfig: {
    readonly like: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly defaultLabel: "Like";
        readonly activeColor: "text-[var(--hive-error-primary)]";
        readonly activeBg: "bg-[var(--hive-error-background)]";
        readonly activeBorder: "border-[var(--hive-error-border)]";
        readonly hoverColor: "hover:text-[var(--hive-error-primary)]";
        readonly hoverBg: "hover:bg-[var(--hive-error-background)]/50";
        readonly animation: {
            readonly sequence: readonly [{
                readonly transform: "scale(0.8)";
                readonly spring: {
                    readonly tension: 500;
                    readonly friction: 20;
                    readonly description: "Snappy spring - immediate response";
                    readonly use: readonly ["Quick actions", "Toggle states", "Immediate feedback"];
                    readonly cssApproximation: "cubic-bezier(0.25, 0.46, 0.45, 0.94)";
                };
            }, {
                readonly transform: "scale(1.3) rotate(5deg)";
                readonly spring: {
                    readonly tension: 200;
                    readonly friction: 12;
                    readonly description: "Bouncy spring - social feedback";
                    readonly use: readonly ["Like animations", "Social actions", "Success states"];
                    readonly cssApproximation: "cubic-bezier(0.68, -0.55, 0.265, 1.55)";
                };
            }, {
                readonly transform: "scale(1) rotate(0deg)";
                readonly spring: {
                    readonly tension: 300;
                    readonly friction: 25;
                    readonly description: "Fluid spring - smooth content motion";
                    readonly use: readonly ["Modal appearances", "Page transitions", "Content reveals"];
                    readonly cssApproximation: "cubic-bezier(0.23, 1, 0.32, 1)";
                };
            }];
            readonly rippleEffect: {
                readonly clipPath: "circle(0% at 50% 50%)";
                readonly clipPathEnd: "circle(150% at 50% 50%)";
                readonly spring: {
                    readonly tension: 400;
                    readonly friction: 30;
                    readonly description: "Liquid spring - organic feeling motion";
                    readonly use: readonly ["Drag interactions", "Complex animations", "Organic responses"];
                    readonly cssApproximation: "cubic-bezier(0.175, 0.885, 0.32, 1)";
                };
            };
            readonly stagger: "100ms";
        };
    };
    readonly comment: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly defaultLabel: "Comment";
        readonly activeColor: "text-[var(--hive-info-primary)]";
        readonly activeBg: "bg-[var(--hive-info-background)]";
        readonly activeBorder: "border-[var(--hive-info-border)]";
        readonly hoverColor: "hover:text-[var(--hive-info-primary)]";
        readonly hoverBg: "hover:bg-[var(--hive-info-background)]/50";
        readonly animation: {
            readonly appear: {
                readonly clipPath: readonly ["inset(0% 100% 0% 0%)", "inset(0% 0% 0% 0%)"];
                readonly spring: {
                    readonly tension: 300;
                    readonly friction: 25;
                    readonly description: "Fluid spring - smooth content motion";
                    readonly use: readonly ["Modal appearances", "Page transitions", "Content reveals"];
                    readonly cssApproximation: "cubic-bezier(0.23, 1, 0.32, 1)";
                };
                readonly stagger: "150ms";
            };
            readonly typing: {
                readonly transform: "scaleY(0.95) scaleX(1.02)";
                readonly spring: {
                    readonly tension: 120;
                    readonly friction: 14;
                    readonly description: "Subtle spring - gentle interactions";
                    readonly use: readonly ["Button hovers", "Card lifts", "Micro-interactions"];
                    readonly cssApproximation: "cubic-bezier(0.175, 0.885, 0.32, 1.275)";
                };
                readonly repeat: "infinite";
                readonly repeatDelay: "800ms";
            };
        };
    };
    readonly share: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly defaultLabel: "Share";
        readonly activeColor: "text-[var(--hive-success-primary)]";
        readonly activeBg: "bg-[var(--hive-success-background)]";
        readonly activeBorder: "border-[var(--hive-success-border)]";
        readonly hoverColor: "hover:text-[var(--hive-success-primary)]";
        readonly hoverBg: "hover:bg-[var(--hive-success-background)]/50";
        readonly animation: {
            readonly morph: {
                readonly borderRadius: readonly ["var(--hive-radius-base)", "calc(var(--hive-radius-base) * 3)", "var(--hive-radius-base)"];
                readonly transform: readonly ["scale(1)", "scale(1.1) scaleX(0.9)", "scale(1)"];
                readonly spring: {
                    readonly tension: 300;
                    readonly friction: 25;
                    readonly description: "Fluid spring - smooth content motion";
                    readonly use: readonly ["Modal appearances", "Page transitions", "Content reveals"];
                    readonly cssApproximation: "cubic-bezier(0.23, 1, 0.32, 1)";
                };
            };
            readonly pulse: {
                readonly description: "Liquid ripple effect from interaction point";
                readonly animation: "Expanding circle with spring physics";
                readonly use: readonly ["Button presses", "Touch feedback", "Social actions"];
            };
        };
    };
};
declare const formatCount: (count: number) => string;
export declare const SocialInteraction: React.ForwardRefExoticComponent<SocialInteractionProps & React.RefAttributes<HTMLDivElement>>;
export { socialInteractionVariants, actionConfig, formatCount };
//# sourceMappingURL=social-interaction.d.ts.map