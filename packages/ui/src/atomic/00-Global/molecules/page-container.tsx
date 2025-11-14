'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const pageContainerVariants = cva(
  "min-h-screen bg-[var(--hive-background-primary)]",
  {
    variants: {
      variant: {
        default: "bg-[var(--hive-background-primary)]",
        secondary: "bg-[var(--hive-background-secondary)]",
        tertiary: "bg-[var(--hive-background-tertiary)]",
        brand: "bg-gradient-to-br from-[var(--hive-brand-primary)]/5 to-[var(--hive-brand-secondary)]/5",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        default: "p-6",
        lg: "p-8",
        xl: "p-12",
      },
      maxWidth: {
        none: "max-w-none",
        sm: "max-w-screen-sm mx-auto",
        md: "max-w-screen-md mx-auto",
        lg: "max-w-screen-lg mx-auto",
        xl: "max-w-screen-xl mx-auto",
        "2xl": "max-w-screen-2xl mx-auto",
        full: "max-w-full",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "default",
      maxWidth: "xl",
    },
  }
);

const pageHeaderVariants = cva(
  "flex flex-col space-y-1.5 mb-6",
  {
    variants: {
      alignment: {
        left: "text-left",
        center: "text-center items-center",
        right: "text-right items-end",
      },
    },
    defaultVariants: {
      alignment: "left",
    },
  }
);

const pageContentVariants = cva(
  "flex-1",
  {
    variants: {
      spacing: {
        none: "space-y-0",
        sm: "space-y-4",
        default: "space-y-6",
        lg: "space-y-8",
        xl: "space-y-12",
      },
    },
    defaultVariants: {
      spacing: "default",
    },
  }
);

export interface PageContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageContainerVariants> {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  breadcrumbs?: Array<{
    label: string;
    icon?: React.ComponentType<{ className?: string }>;
  }>;
  actions?: React.ReactNode;
}

const PageContainer = React.forwardRef<HTMLDivElement, PageContainerProps>(
  (
    {
      className,
      variant,
      padding,
      maxWidth,
      title,
      subtitle,
      breadcrumbs,
      actions,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(pageContainerVariants({ variant, padding, maxWidth }), className)}
        {...props}
      >
        {(title || subtitle || breadcrumbs || actions) && (
          <div className="flex flex-col space-y-4 mb-6">
            {breadcrumbs && (
              <nav className="flex items-center space-x-2 text-sm text-[var(--hive-text-secondary)]">
                {breadcrumbs.map((crumb, index) => (
                  <div
                    key={`${crumb.label}-${index}`}
                    className="flex items-center space-x-2"
                  >
                    {crumb.icon && <crumb.icon className="h-4 w-4" />}
                    <span>{crumb.label}</span>
                  </div>
                ))}
              </nav>
            )}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {title && (
                  <h1 className="text-3xl font-bold text-[var(--hive-text-primary)]">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="text-[var(--hive-text-secondary)] mt-1">
                    {subtitle}
                  </p>
                )}
              </div>
              {actions && <div className="ml-4">{actions}</div>}
            </div>
          </div>
        )}
        {children}
      </div>
    );
  }
);
PageContainer.displayName = "PageContainer";

export interface PageHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageHeaderVariants> {}

const PageHeader = React.forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ className, alignment, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(pageHeaderVariants({ alignment }), className)}
      {...props}
    >
      {children}
    </div>
  )
);
PageHeader.displayName = "PageHeader";

export interface PageTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const PageTitle = React.forwardRef<HTMLHeadingElement, PageTitleProps>(
  ({ className, level = 1, children, ...props }, ref) => {
    const Component = `h${level}` as const;
    return (
      <Component
        ref={ref}
        className={cn(
          "text-3xl font-bold tracking-tight text-[var(--hive-text-primary)]",
          level === 2 && "text-2xl",
          level === 3 && "text-xl",
          level === 4 && "text-lg",
          level === 5 && "text-base",
          level === 6 && "text-sm",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
PageTitle.displayName = "PageTitle";

export type PageDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

const PageDescription = React.forwardRef<HTMLParagraphElement, PageDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-lg text-[var(--hive-text-secondary)]", className)}
      {...props}
    />
  )
);
PageDescription.displayName = "PageDescription";

export interface PageContentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof pageContentVariants> {}

const PageContent = React.forwardRef<HTMLDivElement, PageContentProps>(
  ({ className, spacing, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(pageContentVariants({ spacing }), className)}
      {...props}
    >
      {children}
    </div>
  )
);
PageContent.displayName = "PageContent";

export type PageFooterProps = React.HTMLAttributes<HTMLDivElement>;

const PageFooter = React.forwardRef<HTMLDivElement, PageFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "mt-8 pt-6 border-t border-[var(--hive-border-default)]",
        className
      )}
      {...props}
    />
  )
);
PageFooter.displayName = "PageFooter";

export {
  PageContainer,
  PageHeader,
  PageTitle,
  PageDescription,
  PageContent,
  PageFooter,
  pageContainerVariants,
  pageHeaderVariants,
  pageContentVariants,
};

