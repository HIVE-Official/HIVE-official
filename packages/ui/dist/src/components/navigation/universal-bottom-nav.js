"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, Compass, Plus, User, MessageSquare } from 'lucide-react';
import { Button } from '../../index.js';
import { Badge } from '../ui/badge.js';
import { cn } from '../../lib/utils.js';
const primaryNavItems = [
    { id: 'feed', label: 'Feed', icon: Home, href: '/' },
    { id: 'spaces', label: 'Spaces', icon: Compass, href: '/spaces' },
    { id: 'create', label: 'Create', icon: Plus, href: '/build', isSpecial: true },
    { id: 'messages', label: 'Chat', icon: MessageSquare, href: '/messages' },
    { id: 'profile', label: 'Profile', icon: User, href: '/profile' },
];
export function UniversalBottomNav({ user, unreadNotifications = 0, unreadMessages = 0, className, onCreateAction }) {
    const router = useRouter();
    const pathname = usePathname();
    const isActive = (href) => {
        if (href === '/')
            return pathname === '/';
        return pathname.startsWith(href);
    };
    const handleNavigation = (href, isSpecial) => {
        if (isSpecial && onCreateAction) {
            onCreateAction();
        }
        else {
            router.push(href);
        }
    };
    const getBadgeCount = (itemId) => {
        switch (itemId) {
            case 'messages':
                return unreadMessages;
            default:
                return 0;
        }
    };
    return (_jsxs("div", { className: cn("fixed bottom-0 left-0 right-0 z-50 lg:hidden", "bg-hive-background-primary/95 backdrop-blur-lg", "border-t border-hive-border-subtle", "safe-area-pb", className), children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-hive-background-primary via-hive-background-primary/95 to-transparent pointer-events-none" }), _jsx("nav", { className: "relative flex items-center justify-around px-2 py-2", children: primaryNavItems.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    const badgeCount = getBadgeCount(item.id);
                    return (_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => handleNavigation(item.href, item.isSpecial), className: cn("relative flex flex-col items-center gap-1 px-3 py-2 h-auto min-w-0 flex-1", "transition-all duration-200", item.isSpecial
                            ? "bg-gradient-to-r from-hive-gold to-hive-brand-secondary text-[var(--hive-background-primary)] hover:from-hive-brand-secondary hover:to-hive-gold rounded-full mx-1"
                            : active
                                ? "text-[var(--hive-brand-secondary)]"
                                : "text-hive-text-secondary hover:text-hive-text-primary"), children: [active && !item.isSpecial && (_jsx(motion.div, { layoutId: "activeTab", className: "absolute -top-1 w-6 h-0.5 bg-[var(--hive-brand-secondary)] rounded-full", initial: false, transition: { type: "spring", stiffness: 500, damping: 30 } })), _jsxs("div", { className: "relative", children: [_jsx(Icon, { className: cn("h-5 w-5", item.isSpecial && "h-6 w-6") }), badgeCount > 0 && (_jsx(Badge, { className: "absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-xs bg-red-500 text-[var(--hive-text-primary)] border-2 border-hive-background-primary", children: badgeCount > 99 ? '99+' : badgeCount }))] }), _jsx("span", { className: cn("text-xs font-medium truncate max-w-full", item.isSpecial && "font-semibold"), children: item.label })] }, item.id));
                }) }), _jsx("div", { className: "h-safe-area-inset-bottom" })] }));
}
// Hook for managing bottom nav state
export function useUniversalBottomNav() {
    const pathname = usePathname();
    const shouldShowBottomNav = () => {
        // Hide on auth pages, onboarding, and specific full-screen pages
        const hiddenRoutes = ['/auth', '/onboarding', '/build', '/tools/create'];
        return !hiddenRoutes.some(route => pathname.startsWith(route));
    };
    return {
        shouldShow: shouldShowBottomNav(),
        currentPath: pathname
    };
}
//# sourceMappingURL=universal-bottom-nav.js.map