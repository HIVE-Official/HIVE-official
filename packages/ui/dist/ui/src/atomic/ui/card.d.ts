import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const cardVariants: (props?: ({
    variant?: "default" | "elevated" | "minimal" | "ghost" | null | undefined;
    size?: "default" | "sm" | "lg" | "xl" | null | undefined;
    radius?: "default" | "sm" | "lg" | "none" | "full" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const cardHeaderVariants: (props?: ({
    spacing?: "default" | "sm" | "lg" | "none" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const cardTitleVariants: (props?: ({
    size?: "default" | "sm" | "lg" | "xl" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const cardDescriptionVariants: (props?: ({
    size?: "default" | "sm" | "lg" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const cardContentVariants: (props?: ({
    spacing?: "default" | "sm" | "lg" | "none" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
declare const cardFooterVariants: (props?: ({
    spacing?: "default" | "sm" | "lg" | "none" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
interface CardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
}
export declare const Card: React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>>;
interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardHeaderVariants> {
}
export declare const CardHeader: React.ForwardRefExoticComponent<CardHeaderProps & React.RefAttributes<HTMLDivElement>>;
interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof cardTitleVariants> {
}
export declare const CardTitle: React.ForwardRefExoticComponent<CardTitleProps & React.RefAttributes<HTMLParagraphElement>>;
interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof cardDescriptionVariants> {
}
export declare const CardDescription: React.ForwardRefExoticComponent<CardDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
interface CardContentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardContentVariants> {
}
export declare const CardContent: React.ForwardRefExoticComponent<CardContentProps & React.RefAttributes<HTMLDivElement>>;
interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardFooterVariants> {
}
export declare const CardFooter: React.ForwardRefExoticComponent<CardFooterProps & React.RefAttributes<HTMLDivElement>>;
export { cardVariants, cardHeaderVariants, cardTitleVariants, cardDescriptionVariants, cardContentVariants, cardFooterVariants };
export type { CardProps, CardHeaderProps, CardTitleProps, CardDescriptionProps, CardContentProps, CardFooterProps };
//# sourceMappingURL=card.d.ts.map