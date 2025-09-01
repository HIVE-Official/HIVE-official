import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hivePremiumCardVariants: (props?: ({
    variant?: "default" | "selected" | "post" | "elevated" | "glass" | "announcement" | "gold-accent" | "gold-featured" | "gold-premium" | "clickable" | "selectable" | "featured-post" | null | undefined;
    size?: "sm" | "default" | "lg" | "xl" | "compact" | null | undefined;
    radius?: "lg" | "xl" | "full" | "2xl" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
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