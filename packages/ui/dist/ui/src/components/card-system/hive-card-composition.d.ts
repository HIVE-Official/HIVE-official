/**
 * HIVE Card Composition System
 *
 * Provides consistent structured components for all card types,
 * ensuring uniform layout and styling across the design system.
 */
import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import type { HiveCardBaseProps } from './hive-card-system';
declare const cardHeaderVariants: (props?: {
    size?: "default" | "sm" | "lg" | "xl";
    alignment?: "center" | "end" | "start";
    spacing?: "default" | "sm" | "lg" | "none";
} & import("class-variance-authority/types").ClassProp) => string;
declare const cardTitleVariants: (props?: {
    size?: "default" | "sm" | "lg" | "xl";
    truncate?: boolean;
} & import("class-variance-authority/types").ClassProp) => string;
declare const cardDescriptionVariants: (props?: {
    size?: "default" | "sm" | "lg" | "xl";
    lines?: "none" | 1 | 2 | 3;
} & import("class-variance-authority/types").ClassProp) => string;
declare const cardContentVariants: (props?: {
    size?: "default" | "sm" | "lg" | "xl";
    padding?: "default" | "sm" | "lg" | "none";
    scroll?: boolean;
} & import("class-variance-authority/types").ClassProp) => string;
declare const cardFooterVariants: (props?: {
    size?: "default" | "sm" | "lg" | "xl";
    justify?: "center" | "end" | "start" | "between" | "around";
    border?: boolean;
} & import("class-variance-authority/types").ClassProp) => string;
declare const cardActionsVariants: (props?: {
    layout?: "horizontal" | "vertical" | "grid";
    size?: "default" | "sm" | "lg";
} & import("class-variance-authority/types").ClassProp) => string;
interface HiveCardHeaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardHeaderVariants> {
    actions?: React.ReactNode;
}
interface HiveCardTitleProps extends React.HTMLAttributes<HTMLHeadingElement>, VariantProps<typeof cardTitleVariants> {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
}
interface HiveCardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement>, VariantProps<typeof cardDescriptionVariants> {
}
interface HiveCardContentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardContentVariants> {
}
interface HiveCardFooterProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardFooterVariants> {
}
interface HiveCardActionsProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardActionsVariants> {
}
/**
 * Card Header - Contains title, description, and actions
 */
declare const HiveCardHeader: React.ForwardRefExoticComponent<HiveCardHeaderProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Card Title - Semantic heading with proper hierarchy
 */
declare const HiveCardTitle: React.ForwardRefExoticComponent<HiveCardTitleProps & React.RefAttributes<HTMLHeadingElement>>;
/**
 * Card Description - Supporting text with line clamping
 */
declare const HiveCardDescription: React.ForwardRefExoticComponent<HiveCardDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
/**
 * Card Content - Main content area with flexible sizing
 */
declare const HiveCardContent: React.ForwardRefExoticComponent<HiveCardContentProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Card Footer - Actions and metadata area
 */
declare const HiveCardFooter: React.ForwardRefExoticComponent<HiveCardFooterProps & React.RefAttributes<HTMLDivElement>>;
/**
 * Card Actions - Consistent action button layout
 */
declare const HiveCardActions: React.ForwardRefExoticComponent<HiveCardActionsProps & React.RefAttributes<HTMLDivElement>>;
interface HiveCompositionCardProps extends Omit<HiveCardBaseProps, 'title' | 'content'> {
    headerActions?: React.ReactNode;
    headerAlignment?: 'start' | 'center' | 'end';
    headerSpacing?: 'none' | 'sm' | 'default' | 'lg';
    title?: React.ReactNode;
    titleLevel?: 1 | 2 | 3 | 4 | 5 | 6;
    titleTruncate?: boolean;
    description?: React.ReactNode;
    descriptionLines?: 1 | 2 | 3;
    content?: React.ReactNode;
    contentPadding?: 'none' | 'sm' | 'default' | 'lg';
    contentScroll?: boolean;
    footer?: React.ReactNode;
    footerJustify?: 'start' | 'center' | 'end' | 'between' | 'around';
    footerBorder?: boolean;
    actions?: React.ReactNode;
    actionsLayout?: 'horizontal' | 'vertical' | 'grid';
}
/**
 * Unified Structured Card - Complete card with all composition components
 */
declare const HiveStructuredCard: React.ForwardRefExoticComponent<HiveCompositionCardProps & React.RefAttributes<HTMLDivElement>>;
export { HiveCardHeader as HiveSystemCardHeader, HiveCardTitle as HiveSystemCardTitle, HiveCardDescription as HiveSystemCardDescription, HiveCardContent as HiveSystemCardContent, HiveCardFooter as HiveSystemCardFooter, HiveCardActions, HiveStructuredCard, cardHeaderVariants, cardTitleVariants, cardDescriptionVariants, cardContentVariants, cardFooterVariants, cardActionsVariants, };
//# sourceMappingURL=hive-card-composition.d.ts.map