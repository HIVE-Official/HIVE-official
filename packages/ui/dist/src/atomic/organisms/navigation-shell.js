"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { TopBarNav } from "../atoms/top-bar-nav";
import { HiveLogo } from "../atoms/hive-logo";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import { Search, Bell, MessageCircle, X, Plus } from "lucide-react";
const navigationShellVariants = cva([
    "fixed top-0 left-0 right-0 z-50",
    "bg-background/80 backdrop-blur-lg border-b border-border/50",
    "supports-[backdrop-filter]:bg-background/60",
    "transition-all duration-300"
], {
    variants: {
        variant: {
            default: "bg-background/80 rounded-b-lg",
            glass: "bg-background/40 backdrop-blur-xl rounded-b-lg",
            solid: "bg-background border-b rounded-b-lg",
            floating: [
                "top-4 left-4 right-4 rounded-2xl border",
                "bg-background/90 backdrop-blur-xl shadow-xl shadow-black/10"
            ]
        },
        blur: {
            none: "backdrop-blur-none",
            sm: "backdrop-blur-sm",
            md: "backdrop-blur-md",
            lg: "backdrop-blur-lg",
            xl: "backdrop-blur-xl"
        }
    },
    defaultVariants: {
        variant: "glass",
        blur: "xl"
    }
});
const navigationContentVariants = cva("flex items-center justify-between px-4 py-3 mx-auto min-h-[56px]", {
    variants: {
        maxWidth: {
            sm: "max-w-screen-sm",
            md: "max-w-screen-md",
            lg: "max-w-screen-lg",
            xl: "max-w-screen-xl",
            "2xl": "max-w-screen-2xl",
            full: "max-w-full"
        },
        spacing: {
            tight: "gap-2",
            normal: "gap-4",
            loose: "gap-6"
        }
    },
    defaultVariants: {
        maxWidth: "xl",
        spacing: "normal"
    }
});
// Mobile bottom navigation styles
const mobileBottomNavVariants = cva([
    "fixed bottom-0 left-0 right-0 z-50 md:hidden",
    "bg-background/95 backdrop-blur-xl border-t border-border/50",
    "supports-[backdrop-filter]:bg-background/80",
    "transition-all duration-300",
    "safe-area-pb"
]);
const NavigationShell = React.forwardRef(({ className, variant, blur, items, currentPath, onSearch, searchPlaceholder = "Search everything...", maxWidth, spacing, showSearch = true, showNotifications = true, showMessages = true, notificationCount, messageCount, onNotificationsClick, onMessagesClick, logoVariant = "default", logoSize = "default", showLogoText = true, showLogoIcon = true, ...props }, ref) => {
    const [isSearchExpanded, setIsSearchExpanded] = React.useState(false);
    const [searchQuery, setSearchQuery] = React.useState("");
    // Tier 1 items (primary navigation - always visible)
    const tier1Items = items.filter(item => item.tier === 1);
    // Tier 2 items (action zone)
    const tier2Items = items.filter(item => item.tier === 2);
    // Tier 3 items (menu/overflow)
    const tier3Items = items.filter(item => item.tier === 3);
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (onSearch && searchQuery.trim()) {
            onSearch(searchQuery.trim());
        }
    };
    const handleSearchToggle = () => {
        setIsSearchExpanded(!isSearchExpanded);
        if (isSearchExpanded) {
            setSearchQuery("");
        }
    };
    return (_jsxs(_Fragment, { children: [_jsxs("nav", { ref: ref, className: cn(navigationShellVariants({ variant, blur }), className), role: "navigation", "aria-label": "Main navigation", ...props, children: [_jsxs("div", { className: cn(navigationContentVariants({ maxWidth, spacing })), children: [_jsx("div", { className: "flex items-center gap-4", children: _jsx(HiveLogo, { variant: logoVariant, size: logoSize, showIcon: showLogoIcon, showText: showLogoText, href: "/", className: "h-8" }) }), showSearch && (_jsx("div", { className: "flex-1 max-w-md mx-4 hidden lg:block", children: _jsxs("form", { onSubmit: handleSearchSubmit, className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground", "aria-hidden": "true" }), _jsx(Input, { type: "search", placeholder: searchPlaceholder, value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: cn("pl-10 pr-4 bg-accent/50 border-accent", "focus:bg-background focus:border-primary/50", "transition-all duration-200", "min-h-[48px]" // Accessibility: minimum touch target
                                            ), "aria-label": searchPlaceholder })] }) })), _jsxs("div", { className: "flex items-center gap-2", children: [showSearch && (_jsx(Button, { variant: "ghost", size: "icon", onClick: handleSearchToggle, className: "lg:hidden min-w-[48px] min-h-[48px]", "aria-label": isSearchExpanded ? "Close search" : "Open search", "aria-expanded": isSearchExpanded, children: isSearchExpanded ? _jsx(X, { className: "h-5 w-5" }) : _jsx(Search, { className: "h-5 w-5" }) })), showNotifications && (_jsxs(Button, { variant: "ghost", size: "icon", onClick: onNotificationsClick, className: "relative min-w-[48px] min-h-[48px] hidden sm:inline-flex", "aria-label": `Notifications${notificationCount ? ` (${notificationCount} unread)` : ''}`, children: [_jsx(Bell, { className: "h-5 w-5" }), notificationCount && notificationCount > 0 && (_jsx("span", { className: "absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1", "aria-hidden": "true", children: notificationCount > 99 ? '99+' : notificationCount }))] })), showMessages && (_jsxs(Button, { variant: "ghost", size: "icon", onClick: onMessagesClick, className: "relative min-w-[48px] min-h-[48px] hidden sm:inline-flex", "aria-label": `Messages${messageCount ? ` (${messageCount} unread)` : ''}`, children: [_jsx(MessageCircle, { className: "h-5 w-5" }), messageCount && messageCount > 0 && (_jsx("span", { className: "absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1", "aria-hidden": "true", children: messageCount > 99 ? '99+' : messageCount }))] })), _jsx("div", { className: "hidden md:flex items-center gap-1 ml-2", children: tier1Items.map((item) => (_jsx(TopBarNav, { icon: item.icon, label: item.label, href: item.href, isActive: currentPath === item.href || item.isActive, badge: item.badge, className: "min-w-[48px] min-h-[48px]", labelVisibility: "always", "aria-current": currentPath === item.href ? "page" : undefined }, item.id))) })] })] }), isSearchExpanded && (_jsx("div", { className: "lg:hidden border-t border-border/50 p-4 bg-background/90 backdrop-blur-lg", children: _jsx("form", { onSubmit: handleSearchSubmit, children: _jsx(Input, { type: "search", placeholder: searchPlaceholder, value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full min-h-[48px]", autoFocus: true, "aria-label": searchPlaceholder }) }) }))] }), _jsx("nav", { className: cn(mobileBottomNavVariants()), role: "navigation", "aria-label": "Mobile navigation", children: _jsxs("div", { className: "flex justify-around items-center py-2 px-4 min-h-[72px]", children: [tier1Items.map((item, index) => (_jsx(TopBarNav, { icon: item.icon, label: item.label, href: item.href, isActive: currentPath === item.href || item.isActive, badge: item.badge, className: cn("flex-1 flex-col min-w-[48px] min-h-[48px] max-w-[80px]", "text-xs gap-1"), labelVisibility: "always", size: "sm", "aria-current": currentPath === item.href ? "page" : undefined }, item.id))), _jsx(Button, { variant: "default", size: "icon", className: "min-w-[48px] min-h-[48px] rounded-full bg-primary hover:bg-primary/90", "aria-label": "Create new post", children: _jsx(Plus, { className: "h-5 w-5" }) }), _jsxs("div", { className: "flex flex-col items-center gap-1 min-w-[48px]", children: [_jsxs("div", { className: "flex gap-1", children: [showNotifications && (_jsxs(Button, { variant: "ghost", size: "icon", onClick: onNotificationsClick, className: "relative min-w- min-h- p-1", "aria-label": `Notifications${notificationCount ? ` (${notificationCount} unread)` : ''}`, children: [_jsx(Bell, { className: "h-4 w-4" }), notificationCount && notificationCount > 0 && (_jsx("span", { className: "absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full min-w- h- flex items-center justify-center text-[10px]", "aria-hidden": "true", children: notificationCount > 9 ? '9+' : notificationCount }))] })), showMessages && (_jsxs(Button, { variant: "ghost", size: "icon", onClick: onMessagesClick, className: "relative min-w- min-h- p-1", "aria-label": `Messages${messageCount ? ` (${messageCount} unread)` : ''}`, children: [_jsx(MessageCircle, { className: "h-4 w-4" }), messageCount && messageCount > 0 && (_jsx("span", { className: "absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs font-bold rounded-full min-w- h- flex items-center justify-center text-[10px]", "aria-hidden": "true", children: messageCount > 9 ? '9+' : messageCount }))] }))] }), _jsx("span", { className: "text-[10px] text-muted-foreground", children: "More" })] })] }) }), _jsx("div", { className: "h-16" }), _jsx("div", { className: "h-[72px] md:hidden" })] }));
});
NavigationShell.displayName = "NavigationShell";
export { NavigationShell, navigationShellVariants, navigationContentVariants };
//# sourceMappingURL=navigation-shell.js.map