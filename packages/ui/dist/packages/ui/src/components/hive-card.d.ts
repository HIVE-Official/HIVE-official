import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const hiveCardVariants: (props?: {
    variant?: "space" | "default" | "minimal" | "elevated" | "gold-accent" | "gold-featured" | "gold-premium" | "builder" | "student" | "tool" | "online" | "building" | "studying" | "clickable" | "selectable" | "selected" | "post" | "announcement" | "featured-post";
    size?: "default" | "sm" | "lg" | "xl" | "compact";
    rounded?: "default" | "sm" | "lg" | "full";
    shadow?: "none" | "default" | "sm" | "lg" | "xl";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface HiveCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof hiveCardVariants> {
    asChild?: boolean;
    interactive?: boolean;
    selected?: boolean;
    goldAccent?: boolean;
    magneticHover?: boolean;
    magneticIntensity?: 'subtle' | 'medium' | 'strong';
    animateEntrance?: boolean;
    cascadeIndex?: number;
}
declare const HiveCard: React.ForwardRefExoticComponent<HiveCardProps & React.RefAttributes<HTMLDivElement>>;
declare const HiveCardHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const HiveCardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const HiveCardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const HiveCardContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const HiveCardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export { HiveCard, hiveCardVariants, HiveCardHeader, HiveCardTitle, HiveCardDescription, HiveCardContent, HiveCardFooter };
export { HiveCard as Card, hiveCardVariants as cardVariants, HiveCardHeader as CardHeader, HiveCardTitle as CardTitle, HiveCardDescription as CardDescription, HiveCardContent as CardContent, HiveCardFooter as CardFooter };
//# sourceMappingURL=hive-card.d.ts.map