import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const pageContainerVariants: (props?: {
    variant?: "default" | "brand" | "secondary" | "tertiary";
    padding?: "default" | "none" | "sm" | "lg" | "xl";
    maxWidth?: "none" | "sm" | "lg" | "xl" | "2xl" | "md" | "full";
} & import("class-variance-authority/types").ClassProp) => string;
declare const pageHeaderVariants: (props?: {
    alignment?: "center" | "left" | "right";
} & import("class-variance-authority/types").ClassProp) => string;
declare const pageContentVariants: (props?: {
    spacing?: "default" | "none" | "sm" | "lg" | "xl";
} & import("class-variance-authority/types").ClassProp) => string;
export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof pageContainerVariants> {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    breadcrumbs?: Array<{
        label: string;
        icon?: React.ComponentType<any>;
    }>;
    actions?: React.ReactNode;
}
declare const PageContainer: React.ForwardRefExoticComponent<PageContainerProps & React.RefAttributes<HTMLDivElement>>;
export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof pageHeaderVariants> {
}
declare const PageHeader: React.ForwardRefExoticComponent<PageHeaderProps & React.RefAttributes<HTMLDivElement>>;
export interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
}
declare const PageTitle: React.ForwardRefExoticComponent<PageTitleProps & React.RefAttributes<HTMLHeadingElement>>;
export type PageDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;
declare const PageDescription: React.ForwardRefExoticComponent<PageDescriptionProps & React.RefAttributes<HTMLParagraphElement>>;
export interface PageContentProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof pageContentVariants> {
}
declare const PageContent: React.ForwardRefExoticComponent<PageContentProps & React.RefAttributes<HTMLDivElement>>;
export type PageFooterProps = React.HTMLAttributes<HTMLDivElement>;
declare const PageFooter: React.ForwardRefExoticComponent<PageFooterProps & React.RefAttributes<HTMLDivElement>>;
export { PageContainer, PageHeader, PageTitle, PageDescription, PageContent, PageFooter, pageContainerVariants, pageHeaderVariants, pageContentVariants, };
//# sourceMappingURL=page-container.d.ts.map