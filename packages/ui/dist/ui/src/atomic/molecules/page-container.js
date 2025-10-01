import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
const pageContainerVariants = cva("min-h-screen bg-[var(--hive-background-primary)]", {
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
});
const pageHeaderVariants = cva("flex flex-col space-y-1.5 mb-6", {
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
});
const pageContentVariants = cva("flex-1", {
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
});
const PageContainer = React.forwardRef(({ className, variant, padding, maxWidth, title, subtitle, breadcrumbs, actions, children, ...props }, ref) => {
    return (_jsxs("div", { ref: ref, className: cn(pageContainerVariants({ variant, padding, maxWidth }), className), ...props, children: [(title || subtitle || breadcrumbs || actions) && (_jsxs("div", { className: "flex flex-col space-y-4 mb-6", children: [breadcrumbs && (_jsx("nav", { className: "flex items-center space-x-2 text-sm text-[var(--hive-text-secondary)]", children: breadcrumbs.map((crumb, index) => (_jsxs("div", { className: "flex items-center space-x-2", children: [crumb.icon && _jsx(crumb.icon, { className: "h-4 w-4" }), _jsx("span", { children: crumb.label })] }, index))) })), _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [title && (_jsx("h1", { className: "text-3xl font-bold text-[var(--hive-text-primary)]", children: title })), subtitle && (_jsx("p", { className: "text-[var(--hive-text-secondary)] mt-1", children: subtitle }))] }), actions && (_jsx("div", { className: "ml-4", children: actions }))] })] })), children] }));
});
PageContainer.displayName = "PageContainer";
const PageHeader = React.forwardRef(({ className, alignment, children, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(pageHeaderVariants({ alignment }), className), ...props, children: children }));
});
PageHeader.displayName = "PageHeader";
const PageTitle = React.forwardRef(({ className, level = 1, children, ...props }, ref) => {
    const Component = `h${level}`;
    return (_jsx(Component, { ref: ref, className: cn("text-3xl font-bold tracking-tight text-[var(--hive-text-primary)]", level === 1 && "text-3xl", level === 2 && "text-2xl", level === 3 && "text-xl", level === 4 && "text-lg", level === 5 && "text-base", level === 6 && "text-sm", className), ...props, children: children }));
});
PageTitle.displayName = "PageTitle";
const PageDescription = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx("p", { ref: ref, className: cn("text-lg text-[var(--hive-text-secondary)]", className), ...props }));
});
PageDescription.displayName = "PageDescription";
const PageContent = React.forwardRef(({ className, spacing, children, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(pageContentVariants({ spacing }), className), ...props, children: children }));
});
PageContent.displayName = "PageContent";
const PageFooter = React.forwardRef(({ className, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn("mt-8 pt-6 border-t border-[var(--hive-border-default)]", className), ...props }));
});
PageFooter.displayName = "PageFooter";
export { PageContainer, PageHeader, PageTitle, PageDescription, PageContent, PageFooter, pageContainerVariants, pageHeaderVariants, pageContentVariants, };
//# sourceMappingURL=page-container.js.map