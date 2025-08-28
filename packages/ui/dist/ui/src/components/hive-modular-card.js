import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
// Modular Card System - Building block approach
const moduleVariants = cva("relative transition-all duration-200 ease-out", {
    variants: {
        variant: {
            // Base modules
            "base": "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)]",
            "elevated": "bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-secondary)] shadow-lg",
            "minimal": "bg-[var(--hive-background-primary)] border border-[var(--hive-border-subtle)]",
            // Accent modules
            "gold": "bg-gradient-to-br from-[var(--hive-brand-primary)]/8 to-[var(--hive-brand-primary)]/3 border border-[var(--hive-border-focus)]",
            "gold-strong": "bg-[var(--hive-brand-primary)]/10 border border-[var(--hive-brand-primary)]/40",
            // Interactive modules
            "clickable": "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] hover:border-[var(--hive-interactive-hover)] hover:shadow-md cursor-pointer active:scale-98",
            "selectable": "bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] hover:border-[var(--hive-brand-primary)]/30 cursor-pointer",
            "selected": "bg-[var(--hive-brand-primary)]/8 border border-[var(--hive-brand-primary)]/40 shadow-md shadow-[var(--hive-brand-primary)]/20",
        },
        size: {
            "xs": "p-3",
            "sm": "p-4",
            "md": "p-6",
            "lg": "p-8",
        },
        rounded: {
            "none": "",
            "sm": "rounded-lg",
            "md": "rounded-xl",
            "lg": "rounded-2xl",
        },
        connector: {
            "none": "",
            "top": "border-t-2 border-t-[var(--hive-brand-primary)]/40",
            "bottom": "border-b-2 border-b-[var(--hive-brand-primary)]/40",
            "left": "border-l-2 border-l-[var(--hive-brand-primary)]/40",
            "right": "border-r-2 border-r-[var(--hive-brand-primary)]/40",
            "vertical": "border-t-2 border-b-2 border-t-[var(--hive-brand-primary)]/40 border-b-[var(--hive-brand-primary)]/40",
            "horizontal": "border-l-2 border-r-2 border-l-[var(--hive-brand-primary)]/40 border-r-[var(--hive-brand-primary)]/40",
        },
    },
    defaultVariants: {
        variant: "base",
        size: "md",
        rounded: "md",
        connector: "none",
    },
});
const ModularCard = React.forwardRef(({ className, variant, size, rounded, connector, stackable = false, connectable = false, children, ...props }, ref) => {
    return (_jsx("div", { className: cn(moduleVariants({ variant, size, rounded, connector, className }), stackable && "hover:translate-y-[-0.5] hover:shadow-lg", connectable && "relative before:absolute before:inset-0 before:border before:border-dashed before:border-[var(--hive-brand-primary)]/20 before:rounded-xl before:opacity-0 hover:before:opacity-100 before:transition-opacity"), ref: ref, ...props, children: children }));
});
ModularCard.displayName = "ModularCard";
// Pre-built modular components
const HeaderModule = ({ children, ...props }) => (_jsx(ModularCard, { variant: "elevated", size: "sm", connector: "bottom", ...props, children: children }));
const ContentModule = ({ children, ...props }) => (_jsx(ModularCard, { variant: "base", size: "md", connector: "vertical", ...props, children: children }));
const FooterModule = ({ children, ...props }) => (_jsx(ModularCard, { variant: "minimal", size: "sm", connector: "top", ...props, children: children }));
const AccentModule = ({ children, ...props }) => (_jsx(ModularCard, { variant: "gold", size: "sm", stackable: true, ...props, children: children }));
const ActionModule = ({ children, ...props }) => (_jsx(ModularCard, { variant: "clickable", size: "md", stackable: true, connectable: true, ...props, children: children }));
// Container for stacked modules
const ModularStack = ({ children, gap = "gap-2", direction = "vertical" }) => (_jsx("div", { className: cn("flex", direction === "vertical" ? "flex-col" : "flex-row", gap), children: children }));
// Container for connected modules
const ModularGrid = ({ children, columns = 2, gap = "gap-4" }) => (_jsx("div", { className: cn("grid", `grid-cols-${columns}`, gap), children: children }));
export const HiveModularCard = ({ modules = {}, layout = 'vertical', loading = false, error, skeleton, draggable = false, compact = false, premium = false, interactive = false, onModuleClick, onActionClick, onCardHover, variant = 'base', ...props }) => {
    const handleMouseEnter = () => {
        if (onCardHover)
            onCardHover(true);
    };
    const handleMouseLeave = () => {
        if (onCardHover)
            onCardHover(false);
    };
    if (loading) {
        return (_jsx(ModularCard, { variant: premium ? 'gold' : variant, className: "animate-pulse", ...props, children: _jsxs("div", { className: "space-y-4", children: [skeleton?.header && (_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-4 bg-[var(--hive-text-primary)]/10 rounded w-3/4" }), _jsx("div", { className: "h-3 bg-[var(--hive-text-primary)]/10 rounded w-1/2" })] })), skeleton?.content && (_jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "h-3 bg-[var(--hive-text-primary)]/10 rounded" }), _jsx("div", { className: "h-3 bg-[var(--hive-text-primary)]/10 rounded w-5/6" })] })), skeleton?.stats && (_jsxs("div", { className: "flex space-x-4", children: [_jsx("div", { className: "h-8 bg-[var(--hive-text-primary)]/10 rounded w-16" }), _jsx("div", { className: "h-8 bg-[var(--hive-text-primary)]/10 rounded w-16" })] }))] }) }));
    }
    if (error) {
        return (_jsx(ModularCard, { variant: "base", className: "text-center", ...props, children: _jsxs("div", { className: "py-8 space-y-4", children: [_jsx("div", { className: "text-4xl opacity-50", children: "\u26A0\uFE0F" }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)]/80", children: error.title }), _jsx("p", { className: "text-sm text-[var(--hive-text-primary)]/60", children: error.description })] }), error.action && (_jsx("button", { className: "px-4 py-2 bg-[var(--hive-text-primary)]/10 text-[var(--hive-text-primary)]/80 rounded-lg hover:bg-[var(--hive-text-primary)]/20 transition-colors", onClick: error.action.onClick, children: error.action.label }))] }) }));
    }
    return (_jsx(ModularCard, { variant: premium ? 'gold-strong' : interactive ? 'clickable' : variant, className: cn(layout === 'horizontal' && 'flex flex-row items-start space-x-4', compact && 'p-4', draggable && 'cursor-move'), onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, ...props, children: _jsxs("div", { className: cn("space-y-4", layout === 'grid' && 'grid grid-cols-2 gap-4 space-y-0'), children: [modules.header && (_jsx("div", { className: "space-y-2", onClick: () => onModuleClick?.('header'), children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "space-y-1", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: modules.header.title }), modules.header.subtitle && (_jsx("p", { className: "text-sm text-[var(--hive-text-primary)]/60", children: modules.header.subtitle }))] }), modules.header.badge && (_jsx("span", { className: "px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-full", children: modules.header.badge }))] }) })), modules.content && (_jsxs("div", { className: "space-y-3", onClick: () => onModuleClick?.('content'), children: [modules.content.description && (_jsx("p", { className: "text-[var(--hive-text-primary)]/80 text-sm leading-relaxed", children: modules.content.description })), modules.content.tags && (_jsx("div", { className: "flex flex-wrap gap-2", children: modules.content.tags.map((tag, index) => (_jsx("span", { className: "px-2 py-1 bg-[var(--hive-text-primary)]/10 text-[var(--hive-text-primary)]/70 text-xs rounded", children: tag }, index))) }))] })), modules.stats && (_jsx("div", { className: "flex justify-between items-center py-3 border-t border-white/10", onClick: () => onModuleClick?.('stats'), children: modules.stats.items?.map((stat, index) => (_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: stat.value }), _jsx("div", { className: "text-xs text-[var(--hive-text-primary)]/60", children: stat.label })] }, index))) })), modules.actions && (_jsxs("div", { className: "flex items-center justify-between pt-4 border-t border-white/10", children: [modules.actions.primary && (_jsx("button", { className: "px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg hover:bg-yellow-500/30 transition-colors", onClick: () => onActionClick?.(modules.actions.primary.label), children: modules.actions.primary.label })), modules.actions.secondary && (_jsx("div", { className: "flex items-center space-x-2", children: modules.actions.secondary.map((action, index) => (_jsxs("button", { className: "p-2 text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 hover:bg-[var(--hive-text-primary)]/10 rounded transition-colors", onClick: () => onActionClick?.(action.label), children: [action.icon, " ", action.label] }, index))) }))] }))] }) }));
};
export { ModularCard, moduleVariants, HeaderModule, ContentModule, FooterModule, AccentModule, ActionModule, ModularStack, ModularGrid };
//# sourceMappingURL=hive-modular-card.js.map