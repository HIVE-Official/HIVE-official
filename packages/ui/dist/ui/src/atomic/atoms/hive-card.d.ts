import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const hiveCardVariants: (props?: {
    variant?: "default" | "brand" | "elevated" | "interactive" | "glass";
    size?: "default" | "sm" | "lg";
} & import("class-variance-authority/types").ClassProp) => string;
export interface HiveCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof hiveCardVariants> {
    asChild?: boolean;
}
declare const HiveCard: React.ForwardRefExoticComponent<HiveCardProps & React.RefAttributes<HTMLDivElement>>;
declare const HiveCardHeader: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const HiveCardTitle: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLHeadingElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const HiveCardDescription: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLParagraphElement> & React.RefAttributes<HTMLParagraphElement>>;
declare const HiveCardContent: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
declare const HiveCardFooter: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLDivElement> & React.RefAttributes<HTMLDivElement>>;
export { HiveCard, HiveCardHeader, HiveCardFooter, HiveCardTitle, HiveCardDescription, HiveCardContent, hiveCardVariants, };
//# sourceMappingURL=hive-card.d.ts.map