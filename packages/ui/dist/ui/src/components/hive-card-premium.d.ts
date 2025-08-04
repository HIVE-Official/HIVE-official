import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hivePremiumCardVariants: (props?: {
    variant?: "default" | "selected" | "elevated" | "glass" | "announcement" | "post" | "gold-accent" | "gold-featured" | "gold-premium" | "clickable" | "selectable" | "featured-post";
    size?: "default" | "sm" | "lg" | "xl" | "compact";
    radius?: "lg" | "xl" | "2xl" | "full";
} & import("class-variance-authority/types").ClassProp) => string;
export interface HivePremiumCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrag' | 'onDragEnd' | 'onDragStart'>, VariantProps<typeof hivePremiumCardVariants> {
    magneticHover?: boolean;
    rippleEffect?: boolean;
    autoShadow?: boolean;
    glassMorphism?: boolean;
    interactive?: boolean;
    selected?: boolean;
    goldAccent?: boolean;
}
declare const HivePremiumCard: React.ForwardRefExoticComponent<HivePremiumCardProps & React.RefAttributes<HTMLDivElement>>;
declare const HivePostCard: ({ ...props }: Omit<HivePremiumCardProps, "variant">) => import("react/jsx-runtime").JSX.Element;
declare const HiveAnnouncementCard: ({ ...props }: Omit<HivePremiumCardProps, "variant">) => import("react/jsx-runtime").JSX.Element;
declare const HiveFeaturedCard: ({ ...props }: Omit<HivePremiumCardProps, "variant">) => import("react/jsx-runtime").JSX.Element;
declare const HiveGlassCard: ({ ...props }: Omit<HivePremiumCardProps, "variant">) => import("react/jsx-runtime").JSX.Element;
export { HivePremiumCard, hivePremiumCardVariants, HivePostCard, HiveAnnouncementCard, HiveFeaturedCard, HiveGlassCard };
//# sourceMappingURL=hive-card-premium.d.ts.map