"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils.js';
import { liquidMetal, motionDurations } from '../motion/hive-motion-system.js';
import { ChevronRight, Home, ArrowRight } from 'lucide-react';
// HIVE Breadcrumbs - Magnetic Navigation Trail with Liquid Metal Motion
// Sophisticated breadcrumb navigation with magnetic hover effects and smooth transitions
const hiveBreadcrumbsVariants = cva(
// Base breadcrumb styles
"flex items-center space-x-1 text-sm", {
    variants: {
        variant: {
            default: "",
            minimal: "text-xs",
            prominent: "text-base",
        },
        separator: {
            chevron: "",
            arrow: "",
            slash: "",
            dot: "",
        }
    },
    defaultVariants: {
        variant: "default",
        separator: "chevron",
    },
});
// Breadcrumb item animation variants
const breadcrumbItemVariants = {
    rest: {
        x: 0,
        scale: 1,
        color: 'color-mix(in_srgb,var(--hive-text-primary)_60%,transparent)',
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    },
    hover: {
        x: 2,
        scale: 1.02,
        color: 'color-mix(in_srgb,var(--hive-text-primary)_90%,transparent)',
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    },
    active: {
        x: 0,
        scale: 1,
        color: 'var(--hive-brand-secondary)',
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    }
};
const separatorVariants = {
    rest: {
        opacity: 0.4,
        scale: 1,
        transition: {
            duration: motionDurations.quick,
        }
    },
    hover: {
        opacity: 0.6,
        scale: 1.1,
        transition: {
            duration: motionDurations.quick,
        }
    }
};
const HiveBreadcrumbs = React.forwardRef(({ className, variant, separator: separatorProp, items, showHome = true, homeIcon = _jsx(Home, { size: 16 }), onHomeClick, maxItems = 5, showOverflow = true, ...props }, ref) => {
    // Prepare items with overflow handling
    const displayItems = React.useMemo(() => {
        if (!showOverflow || items.length <= maxItems) {
            return items;
        }
        const firstItem = items[0];
        const lastItems = items.slice(-(maxItems - 2));
        return [
            firstItem,
            { id: 'overflow', label: '...', isClickable: false },
            ...lastItems
        ];
    }, [items, maxItems, showOverflow]);
    const getSeparatorIcon = () => {
        switch (separatorProp) {
            case 'arrow':
                return _jsx(ArrowRight, { size: 14 });
            case 'slash':
                return _jsx("span", { className: "text-[var(--hive-text-primary)]/40", children: "/" });
            case 'dot':
                return _jsx("span", { className: "text-[var(--hive-text-primary)]/40", children: "\u2022" });
            case 'chevron':
            default:
                return _jsx(ChevronRight, { size: 14 });
        }
    };
    const handleItemClick = (item) => {
        if (item.isClickable !== false && (item.onClick || item.href)) {
            item.onClick?.();
        }
    };
    return (_jsxs("nav", { ref: ref, className: cn(hiveBreadcrumbsVariants({ variant, separator: separatorProp, className })), "aria-label": "Breadcrumb", ...props, children: [showHome && (_jsxs(_Fragment, { children: [_jsxs(motion.button, { className: "flex items-center space-x-1 text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/90 transition-colors", variants: breadcrumbItemVariants, initial: "rest", whileHover: "hover", onClick: onHomeClick, children: [homeIcon, _jsx("span", { className: "sr-only", children: "Home" })] }), displayItems.length > 0 && (_jsx(motion.div, { className: "text-[var(--hive-text-primary)]/40", variants: separatorVariants, initial: "rest", whileHover: "hover", children: getSeparatorIcon() }))] })), displayItems.map((item, index) => {
                const isLast = index === displayItems.length - 1;
                const isClickable = item.isClickable !== false && (item.onClick || item.href);
                const isOverflow = item.id === 'overflow';
                return (_jsxs(React.Fragment, { children: [_jsxs(motion.div, { className: cn("flex items-center space-x-2", isClickable && "cursor-pointer", isOverflow && "cursor-default"), variants: breadcrumbItemVariants, initial: "rest", animate: isLast ? "active" : "rest", whileHover: isClickable ? "hover" : "rest", onClick: () => handleItemClick(item), children: [item.icon && (_jsx("span", { className: "shrink-0", children: item.icon })), _jsx("span", { className: cn("truncate font-medium", isLast && "text-yellow-400", !isLast && !isOverflow && "text-[var(--hive-text-primary)]/60", isOverflow && "text-[var(--hive-text-primary)]/40"), children: item.label })] }), !isLast && (_jsx(motion.div, { className: "text-[var(--hive-text-primary)]/40 shrink-0", variants: separatorVariants, initial: "rest", whileHover: "hover", children: getSeparatorIcon() }))] }, item.id));
            })] }));
});
HiveBreadcrumbs.displayName = "HiveBreadcrumbs";
// Breadcrumb Hook for easy state management
export function useHiveBreadcrumbs(initialItems = []) {
    const [items, setItems] = React.useState(initialItems);
    const pushItem = (item) => {
        setItems(prev => [...prev, item]);
    };
    const popItem = () => {
        setItems(prev => prev.slice(0, -1));
    };
    const replaceItems = (newItems) => {
        setItems(newItems);
    };
    const navigateToIndex = (index) => {
        setItems(prev => prev.slice(0, index + 1));
    };
    return {
        items,
        pushItem,
        popItem,
        replaceItems,
        navigateToIndex,
        setItems,
    };
}
export { HiveBreadcrumbs, hiveBreadcrumbsVariants };
//# sourceMappingURL=hive-breadcrumbs.js.map