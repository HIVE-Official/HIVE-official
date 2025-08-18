"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Mobile Tool Wrapper - Responsive Layout for Tools
 *
 * Ensures all HIVE tools work beautifully on mobile devices with:
 * - Touch-optimized interactions
 * - Responsive grid layouts
 * - Mobile-first component sizing
 * - Swipe gestures for navigation
 */
import React, { useState, useEffect } from 'react';
import { HiveCard, HiveButton } from '../index';
import { ChevronLeft, Menu, X, Maximize2, Minimize2 } from 'lucide-react';
import { cn } from '../lib/utils';
export function MobileToolWrapper({ children, toolName, onBack, showMobileMenu = false, className }) {
    const [isMobile, setIsMobile] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    // Detect mobile viewport
    useEffect(() => {
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);
    // Mobile-specific styles and behaviors
    const mobileClasses = isMobile ? {
        container: "min-h-screen bg-gray-50",
        header: "sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm",
        content: "p-4 pb-20", // Extra bottom padding for mobile navigation
        button: "h-12 text-base", // Larger touch targets
        card: "shadow-sm border-0 rounded-xl",
    } : {
        container: "",
        header: "",
        content: "p-6",
        button: "",
        card: "",
    };
    return (_jsxs("div", { className: cn("relative", mobileClasses.container, isFullscreen && "fixed inset-0 z-50 bg-white", className), children: [isMobile && (_jsxs("div", { className: mobileClasses.header, children: [_jsxs("div", { className: "flex items-center justify-between p-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [onBack && (_jsx(HiveButton, { variant: "ghost", size: "sm", onClick: onBack, className: "p-2", children: _jsx(ChevronLeft, { className: "w-5 h-5" }) })), _jsx("h1", { className: "font-semibold text-gray-900 truncate", children: toolName })] }), _jsxs("div", { className: "flex items-center gap-2", children: [showMobileMenu && (_jsx(HiveButton, { variant: "ghost", size: "sm", onClick: () => setShowMenu(!showMenu), className: "p-2", children: showMenu ? _jsx(X, { className: "w-5 h-5" }) : _jsx(Menu, { className: "w-5 h-5" }) })), _jsx(HiveButton, { variant: "ghost", size: "sm", onClick: () => setIsFullscreen(!isFullscreen), className: "p-2", children: isFullscreen ? _jsx(Minimize2, { className: "w-5 h-5" }) : _jsx(Maximize2, { className: "w-5 h-5" }) })] })] }), showMenu && (_jsx("div", { className: "absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg", children: _jsxs("div", { className: "p-4 space-y-2", children: [_jsx(HiveButton, { variant: "ghost", className: "w-full justify-start", children: "Save Progress" }), _jsx(HiveButton, { variant: "ghost", className: "w-full justify-start", children: "Share Tool" }), _jsx(HiveButton, { variant: "ghost", className: "w-full justify-start", children: "Help & Tips" })] }) }))] })), _jsx("div", { className: cn(mobileClasses.content, "space-y-4"), children: _jsx(MobileOptimizedContent, { isMobile: isMobile, children: children }) }), isMobile && (_jsx("div", { className: "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4", children: _jsxs("div", { className: "flex gap-3", children: [_jsx(HiveButton, { className: "flex-1 h-12", children: "Save" }), _jsx(HiveButton, { variant: "outline", className: "flex-1 h-12", children: "Submit" })] }) }))] }));
}
function MobileOptimizedContent({ children, isMobile }) {
    if (!isMobile) {
        return _jsx(_Fragment, { children: children });
    }
    // Apply mobile-specific transformations to child elements
    return (_jsx("div", { className: "space-y-6", children: React.Children.map(children, (child, index) => {
            if (React.isValidElement(child)) {
                // Add mobile-optimized props to HiveCard components
                if (child.type === HiveCard || (child.props && child.props.className?.includes('HiveCard'))) {
                    return React.cloneElement(child, {
                        className: cn(child.props.className, "shadow-sm border-0 rounded-xl touch-manipulation")
                    });
                }
                // Add mobile-optimized props to HiveButton components
                if (child.type === HiveButton || (child.props && child.props.className?.includes('HiveButton'))) {
                    return React.cloneElement(child, {
                        className: cn(child.props.className, "h-12 text-base touch-manipulation")
                    });
                }
                // Wrap form elements in mobile-friendly containers
                if (child.props && (child.props.type === 'input' || child.props.role === 'textbox')) {
                    return (_jsx("div", { className: "space-y-2", children: child }, index));
                }
            }
            return child;
        }) }));
}
export default MobileToolWrapper;
//# sourceMappingURL=mobile-tool-wrapper.js.map