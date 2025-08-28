import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveCardVariants: (props?: {
    variant?: "student" | "default" | "space" | "minimal" | "selected" | "builder" | "tool" | "online" | "post" | "announcement" | "elevated" | "gold-accent" | "gold-featured" | "gold-premium" | "building" | "studying" | "clickable" | "selectable" | "featured-post";
    size?: "default" | "sm" | "lg" | "xl" | "compact";
    rounded?: "default" | "sm" | "lg" | "full";
    shadow?: "default" | "sm" | "lg" | "xl" | "none";
} & import("class-variance-authority/types").ClassProp) => string;
export interface HiveCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof hiveCardVariants> {
    asChild?: boolean;
    interactive?: boolean;
    selected?: boolean;
    goldAccent?: boolean;
    magneticHover?: boolean;
    magneticIntensity?: 'subtle' | 'medium' | 'strong';
    animateEntrance?: boolean;
    cascadeIndex?: number;
    'aria-label'?: string;
    'aria-describedby'?: string;
    'data-testid'?: string;
    loading?: boolean;
}
declare const HiveCard: React.ForwardRefExoticComponent<HiveCardProps & React.RefAttributes<HTMLDivElement>>;
declare const HiveCardHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const HiveCardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const HiveCardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const HiveCardContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const HiveCardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export { HiveCard, hiveCardVariants, HiveCardHeader, HiveCardTitle, HiveCardDescription, HiveCardContent, HiveCardFooter };
//# sourceMappingURL=hive-card.d.ts.map