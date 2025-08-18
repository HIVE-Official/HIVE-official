/**
 * HIVE Card Composition System
 *
 * Provides consistent structured components for all card types,
 * ensuring uniform layout and styling across the design system.
 */
"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { HiveCardBase } from './hive-card-system';
// ============================================================================
// CARD COMPOSITION VARIANTS
// ============================================================================
const cardHeaderVariants = cva("flex items-start justify-between", {
    variants: {
        size: {
            sm: "mb-3",
            default: "mb-4",
            lg: "mb-6",
            xl: "mb-8",
        },
        alignment: {
            start: "items-start",
            center: "items-center",
            end: "items-end",
        },
        spacing: {
            none: "gap-0",
            sm: "gap-2",
            default: "gap-4",
            lg: "gap-6",
        },
    },
    defaultVariants: {
        size: "default",
        alignment: "start",
        spacing: "default",
    },
});
const cardTitleVariants = cva("font-semibold text-[var(--hive-text-primary)] leading-tight", {
    variants: {
        size: {
            sm: "text-sm",
            default: "text-lg",
            lg: "text-xl",
            xl: "text-2xl",
        },
        truncate: {
            true: "truncate",
            false: "",
        },
    },
    defaultVariants: {
        size: "default",
        truncate: false,
    },
});
const cardDescriptionVariants = cva("text-[var(--hive-text-secondary)] leading-relaxed", {
    variants: {
        size: {
            sm: "text-xs mt-1",
            default: "text-sm mt-2",
            lg: "text-base mt-3",
            xl: "text-lg mt-4",
        },
        lines: {
            1: "line-clamp-1",
            2: "line-clamp-2",
            3: "line-clamp-3",
            none: "",
        },
    },
    defaultVariants: {
        size: "default",
        lines: "none",
    },
});
const cardContentVariants = cva("flex-1", {
    variants: {
        size: {
            sm: "my-3",
            default: "my-4",
            lg: "my-6",
            xl: "my-8",
        },
        padding: {
            none: "",
            sm: "p-2",
            default: "p-4",
            lg: "p-6",
        },
        scroll: {
            true: "overflow-auto",
            false: "overflow-hidden",
        },
    },
    defaultVariants: {
        size: "default",
        padding: "none",
        scroll: false,
    },
});
const cardFooterVariants = cva("flex items-center", {
    variants: {
        size: {
            sm: "mt-3 gap-2",
            default: "mt-4 gap-3",
            lg: "mt-6 gap-4",
            xl: "mt-8 gap-6",
        },
        justify: {
            start: "justify-start",
            center: "justify-center",
            end: "justify-end",
            between: "justify-between",
            around: "justify-around",
        },
        border: {
            true: "border-t border-[var(--hive-border-subtle)] pt-4",
            false: "",
        },
    },
    defaultVariants: {
        size: "default",
        justify: "start",
        border: false,
    },
});
const cardActionsVariants = cva("flex items-center gap-2", {
    variants: {
        layout: {
            horizontal: "flex-row",
            vertical: "flex-col",
            grid: "grid grid-cols-2 gap-2",
        },
        size: {
            sm: "gap-1",
            default: "gap-2",
            lg: "gap-3",
        },
    },
    defaultVariants: {
        layout: "horizontal",
        size: "default",
    },
});
// ============================================================================
// CARD COMPOSITION COMPONENTS
// ============================================================================
/**
 * Card Header - Contains title, description, and actions
 */
const HiveCardHeader = React.forwardRef(({ className, size, alignment, spacing, actions, children, ...props }, ref) => {
    return (_jsxs("div", { ref: ref, className: cn(cardHeaderVariants({ size, alignment, spacing }), className), ...props, children: [_jsx("div", { className: "flex-1 min-w-0", children: children }), actions && (_jsx("div", { className: "flex-shrink-0", children: actions }))] }));
});
HiveCardHeader.displayName = "HiveCardHeader";
/**
 * Card Title - Semantic heading with proper hierarchy
 */
const HiveCardTitle = React.forwardRef(({ className, size, truncate, level = 3, children, ...props }, ref) => {
    const Component = `h${level}`;
    return React.createElement(Component, {
        ref,
        className: cn(cardTitleVariants({ size, truncate }), className),
        ...props
    }, children);
});
HiveCardTitle.displayName = "HiveCardTitle";
/**
 * Card Description - Supporting text with line clamping
 */
const HiveCardDescription = React.forwardRef(({ className, size, lines, children, ...props }, ref) => {
    return (_jsx("p", { ref: ref, className: cn(cardDescriptionVariants({ size, lines }), className), ...props, children: children }));
});
HiveCardDescription.displayName = "HiveCardDescription";
/**
 * Card Content - Main content area with flexible sizing
 */
const HiveCardContent = React.forwardRef(({ className, size, padding, scroll, children, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(cardContentVariants({ size, padding, scroll }), className), ...props, children: children }));
});
HiveCardContent.displayName = "HiveCardContent";
/**
 * Card Footer - Actions and metadata area
 */
const HiveCardFooter = React.forwardRef(({ className, size, justify, border, children, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(cardFooterVariants({ size, justify, border }), className), ...props, children: children }));
});
HiveCardFooter.displayName = "HiveCardFooter";
/**
 * Card Actions - Consistent action button layout
 */
const HiveCardActions = React.forwardRef(({ className, layout, size, children, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(cardActionsVariants({ layout, size }), className), ...props, children: children }));
});
HiveCardActions.displayName = "HiveCardActions";
/**
 * Unified Structured Card - Complete card with all composition components
 */
const HiveStructuredCard = React.forwardRef(({ 
// Card props
className, size, children, 
// Header props
headerActions, headerAlignment, headerSpacing, 
// Title props
title, titleLevel, titleTruncate, 
// Description props
description, descriptionLines, 
// Content props
content, contentPadding, contentScroll, 
// Footer props
footer, footerJustify, footerBorder, 
// Actions props
actions, actionsLayout, ...cardProps }, ref) => {
    const hasHeader = title || description || headerActions;
    const hasContent = content || children;
    const hasFooter = footer || actions;
    return (_jsxs(HiveCardBase, { ref: ref, className: className, size: size, ...cardProps, children: [hasHeader && (_jsxs(HiveCardHeader, { size: size, alignment: headerAlignment, spacing: headerSpacing, actions: headerActions, children: [title && (_jsx(HiveCardTitle, { size: size, level: titleLevel, truncate: titleTruncate, children: title })), description && (_jsx(HiveCardDescription, { size: size, lines: descriptionLines, children: description }))] })), hasContent && (_jsx(HiveCardContent, { size: size, padding: contentPadding, scroll: contentScroll, children: content || children })), hasFooter && (_jsxs(HiveCardFooter, { size: size, justify: footerJustify, border: footerBorder, children: [footer, actions && (_jsx(HiveCardActions, { layout: actionsLayout, size: size === 'xl' ? 'lg' : size, children: actions }))] }))] }));
});
HiveStructuredCard.displayName = "HiveStructuredCard";
export { HiveCardHeader as HiveSystemCardHeader, HiveCardTitle as HiveSystemCardTitle, HiveCardDescription as HiveSystemCardDescription, HiveCardContent as HiveSystemCardContent, HiveCardFooter as HiveSystemCardFooter, HiveCardActions, HiveStructuredCard, 
// Variants
cardHeaderVariants, cardTitleVariants, cardDescriptionVariants, cardContentVariants, cardFooterVariants, cardActionsVariants, };
//# sourceMappingURL=hive-card-composition.js.map