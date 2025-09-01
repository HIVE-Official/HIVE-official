'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '../../lib/utils.js';
import { ButtonEnhanced as Button } from '../atoms/button-enhanced.js';
import { Avatar } from '../atoms/avatar.js';
import { Text } from '../atoms/text.js';
import { Link } from '../atoms/link.js';
import { Badge } from '../atoms/badge.js';
const headerVariants = {
    default: [
        'bg-hive-background-primary',
        'border-b border-hive-border-default'
    ].join(' '),
    minimal: [
        'bg-transparent'
    ].join(' '),
    glass: [
        'bg-hive-background-overlay/80',
        'backdrop-blur-md',
        'border-b border-hive-border-default/50'
    ].join(' ')
};
export const Header = ({ logo, title, navigation = [], user, actions, notifications, variant = 'default', sticky = true, className, onUserClick, onNotificationsClick }) => {
    const baseClasses = [
        'w-full z-50',
        sticky && 'sticky top-0',
        headerVariants[variant]
    ].filter(Boolean).join(' ');
    return (_jsxs("header", { className: cn(baseClasses, className), children: [_jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsxs("div", { className: "flex items-center justify-between h-16", children: [_jsxs("div", { className: "flex items-center gap-4", children: [logo && (_jsx("div", { className: "flex-shrink-0", children: logo })), title && (_jsx(Text, { variant: "heading-lg", color: "primary", children: title }))] }), navigation.length > 0 && (_jsx("nav", { className: "hidden md:flex items-center space-x-8", children: navigation.map((item) => (_jsxs("div", { className: "relative flex items-center", children: [_jsx(Link, { href: item.href, variant: item.active ? 'default' : 'ghost', className: cn('px-3 py-2 rounded-lg', item.active && 'bg-hive-background-interactive'), children: item.label }), item.badge && item.badge > 0 && (_jsx(Badge, { count: item.badge, size: "sm", variant: "error", className: "absolute -top-1 -right-1" }))] }, item.href))) })), _jsxs("div", { className: "flex items-center gap-3", children: [actions, notifications !== undefined && (_jsxs("div", { className: "relative", children: [_jsx(Button, { variant: "ghost", size: "icon", onClick: onNotificationsClick, "aria-label": `${notifications} notifications`, children: _jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" }) }) }), notifications > 0 && (_jsx(Badge, { count: notifications, maxCount: 99, size: "sm", variant: "error", className: "absolute -top-1 -right-1" }))] })), user && (_jsx(Avatar, { src: user.avatar, alt: user.name, size: "sm", status: user.status, interactive: !!onUserClick, onClick: onUserClick, className: "cursor-pointer" })), _jsx(Button, { variant: "ghost", size: "icon", className: "md:hidden", "aria-label": "Open mobile menu", children: _jsx("svg", { className: "h-5 w-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4 6h16M4 12h16M4 18h16" }) }) })] })] }) }), navigation.length > 0 && (_jsx("nav", { className: "md:hidden border-t border-hive-border-default", children: _jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: _jsx("div", { className: "py-2 space-y-1", children: navigation.map((item) => (_jsx(Link, { href: item.href, variant: item.active ? 'default' : 'ghost', className: cn('block px-3 py-2 rounded-lg', item.active && 'bg-hive-background-interactive'), children: _jsxs("div", { className: "flex items-center justify-between", children: [item.label, item.badge && item.badge > 0 && (_jsx(Badge, { count: item.badge, size: "sm", variant: "error" }))] }) }, item.href))) }) }) }))] }));
};
//# sourceMappingURL=header.js.map