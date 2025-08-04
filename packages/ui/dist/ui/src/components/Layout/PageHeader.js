'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useRef } from 'react';
import { cn } from '../../lib/utils.js';
import { Text } from '../../atomic/atoms/text.js';
import { Button } from '../../atomic/atoms/button.js';
import { useAdvancedViewport } from './ResponsiveLayout.js';
// Smart action placement based on device and context
function calculateActionPlacement(placement, viewport, actionsCount) {
    if (placement === 'auto') {
        // Intelligent placement based on device and action count
        if (viewport.isMobile) {
            // On mobile, prioritize thumb reach
            return actionsCount <= 2 ? 'justify-between' : 'justify-end';
        }
        return 'justify-between';
    }
    const placementMap = {
        'thumb-left': 'justify-start',
        'thumb-right': 'justify-end',
        'center': 'justify-center',
        'split': 'justify-between'
    };
    return placementMap[placement] || 'justify-between';
}
// Generate contextual header content based on page type
function generateContextualContent(pageType, campusContext) {
    switch (pageType) {
        case 'profile':
            return {
                titlePrefix: 'Your',
                contextualHint: 'Your campus command center'
            };
        case 'spaces':
            return {
                titlePrefix: campusContext?.spaceName ? '' : 'Campus',
                contextualHint: 'Where communities solve problems together'
            };
        case 'tools':
            return {
                titlePrefix: campusContext?.isBuilder ? 'Building' : 'Using',
                contextualHint: campusContext?.isBuilder ? 'Create solutions for your community' : 'Tools built by your community'
            };
        case 'feed':
            return {
                contextualHint: 'What\'s happening in your communities'
            };
        default:
            return {};
    }
}
// Priority-based action sorting for mobile
function sortActionsByPriority(actions, isMobile) {
    if (!isMobile)
        return actions;
    return [...actions]
        .filter(action => !action.mobileHidden)
        .sort((a, b) => {
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return (priorityOrder[b.priority || 'medium'] - priorityOrder[a.priority || 'medium']);
    })
        .slice(0, 3); // Max 3 actions on mobile
}
export const PageHeader = ({ title, subtitle, description, breadcrumbs, backAction, primaryAction, secondaryActions = [], actionPlacement = 'auto', pageType = 'generic', userRole = 'student', campusContext, behavior = 'static', glassMorphism = false, hideOnScroll = false, showProgress = false, progressValue = 0, mobileTitle, collapsible = false, headingLevel = 'h1', landmarkRole = true, className, children }) => {
    const viewport = useAdvancedViewport();
    const headerRef = useRef(null);
    // Generate contextual content
    const contextualContent = useMemo(() => generateContextualContent(pageType, campusContext), [pageType, campusContext]);
    // Process actions for mobile optimization
    const processedActions = useMemo(() => {
        const actions = primaryAction ? [primaryAction, ...secondaryActions] : secondaryActions;
        return sortActionsByPriority(actions, viewport.isMobile);
    }, [primaryAction, secondaryActions, viewport.isMobile]);
    // Calculate dynamic classes
    const headerClasses = cn(
    // Base layout
    'w-full border-b border-hive-border-default/20 backdrop-blur-sm', 
    // Behavior-based styling
    {
        'sticky top-0 z-40': behavior === 'sticky',
        'fixed top-0 left-0 right-0 z-50': behavior === 'floating',
        'static': behavior === 'static',
        'transform -translate-y-full': behavior === 'hidden'
    }, 
    // Glass morphism effect
    glassMorphism && [
        'bg-hive-background-primary/80',
        'backdrop-blur-xl',
        'border-hive-border-default/10'
    ], 
    // Default background
    !glassMorphism && 'bg-hive-background-primary', 
    // Auto-hide behavior
    hideOnScroll && 'transition-transform duration-300 ease-in-out', 
    // Accessibility
    'focus-within:ring-2 focus-within:ring-hive-gold/20', className);
    const containerClasses = cn(
    // Layout
    'mx-auto w-full px-4 sm:px-6 lg:px-8', 
    // Responsive padding
    viewport.isMobile ? 'py-4' : 'py-6', 
    // Safe area support
    viewport.hasNotch && 'pt-[env(safe-area-inset-top)]');
    const titleClasses = cn(
    // Base typography
    'font-semibold text-hive-text-primary', 
    // Responsive sizing
    viewport.isMobile ? 'text-xl' : 'text-2xl lg:text-3xl', 
    // Context-aware styling
    pageType === 'profile' && 'text-hive-gold', pageType === 'tools' && campusContext?.isBuilder && 'text-hive-emerald');
    const actionLayoutClasses = calculateActionPlacement(actionPlacement, viewport, processedActions.length);
    return (_jsxs("header", { ref: headerRef, className: headerClasses, role: landmarkRole ? 'banner' : undefined, "aria-label": `${title || 'Page'} header`, children: [showProgress && (_jsx("div", { className: "absolute bottom-0 left-0 right-0 h-0.5 bg-hive-border-default/20", children: _jsx("div", { className: "h-full bg-hive-gold transition-all duration-300 ease-out", style: { width: `${Math.min(100, Math.max(0, progressValue))}%` } }) })), _jsxs("div", { className: containerClasses, children: [breadcrumbs && breadcrumbs.length > 0 && (_jsx("nav", { className: "mb-3", "aria-label": "Breadcrumb", children: _jsx("ol", { className: "flex items-center space-x-2 text-sm", children: breadcrumbs.map((crumb, index) => (_jsxs("li", { className: "flex items-center", children: [index > 0 && (_jsx("span", { className: "mx-2 text-hive-text-tertiary", children: "/" })), crumb.href ? (_jsxs("a", { href: crumb.href, className: "text-hive-text-secondary hover:text-hive-text-primary transition-colors", "aria-current": crumb.isActive ? 'page' : undefined, children: [crumb.icon && _jsx(crumb.icon, { className: "w-4 h-4 mr-1 inline" }), crumb.label] })) : (_jsxs("span", { className: cn(crumb.isActive ? 'text-hive-text-primary font-medium' : 'text-hive-text-secondary'), children: [crumb.icon && _jsx(crumb.icon, { className: "w-4 h-4 mr-1 inline" }), crumb.label] }))] }, index))) }) })), _jsxs("div", { className: cn('flex items-start', actionLayoutClasses, viewport.isMobile && 'flex-col space-y-4'), children: [_jsxs("div", { className: "flex-1 min-w-0", children: [backAction && (_jsx("div", { className: "mb-2", children: _jsxs(Button, { variant: "ghost", size: "sm", className: "-ml-2 text-hive-text-secondary hover:text-hive-text-primary", onClick: backAction.onClick || (() => window.history.back()), children: [_jsx("span", { className: "mr-1", children: "\u2190" }), backAction.label || 'Back'] }) })), _jsxs("div", { className: "space-y-1", children: [_jsxs(Text, { as: headingLevel, className: titleClasses, children: [contextualContent.titlePrefix && (_jsx("span", { className: "text-hive-text-secondary font-normal mr-2", children: contextualContent.titlePrefix })), viewport.isMobile && mobileTitle ? mobileTitle : title] }), subtitle && (_jsx(Text, { variant: "body-lg", color: "secondary", className: "mt-1", children: subtitle })), contextualContent.contextualHint && !subtitle && (_jsx(Text, { variant: "body-sm", color: "muted", className: "italic", children: contextualContent.contextualHint })), description && (_jsx(Text, { variant: "body-md", color: "secondary", className: "mt-2 max-w-2xl", children: description }))] })] }), processedActions.length > 0 && (_jsx("div", { className: cn('flex items-center gap-3', viewport.isMobile && 'w-full justify-end'), children: processedActions.map((action) => {
                                    const isPrimary = action === primaryAction;
                                    return (_jsxs(Button, { variant: action.variant || (isPrimary ? 'primary' : 'secondary'), size: viewport.isMobile ? 'sm' : 'md', onClick: action.onClick, disabled: action.disabled || action.loading, className: cn(
                                        // Thumb-friendly sizing on mobile
                                        viewport.isMobile && 'min-h-[44px] px-4', 
                                        // Priority-based styling
                                        action.priority === 'high' && 'ring-1 ring-hive-gold/20'), children: [action.icon && _jsx(action.icon, { className: "w-4 h-4 mr-2" }), action.loading ? 'Loading...' : action.label] }, action.id));
                                }) }))] }), children && (_jsx("div", { className: "mt-4", children: children }))] })] }));
};
// Export utilities
export { calculateActionPlacement, generateContextualContent, sortActionsByPriority };
//# sourceMappingURL=PageHeader.js.map