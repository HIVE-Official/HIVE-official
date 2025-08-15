"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { Plus, X, Zap, Users, Calendar, MessageSquare } from 'lucide-react';
const defaultActions = [
    {
        id: 'create-tool',
        title: 'Create Tool',
        icon: _jsx(Zap, { size: 20 }),
        action: () => window.location.href = '/build',
        color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
        id: 'join-space',
        title: 'Join Space',
        icon: _jsx(Users, { size: 20 }),
        action: () => window.location.href = '/spaces/browse',
        color: 'bg-green-500 hover:bg-green-600'
    },
    {
        id: 'create-event',
        title: 'Create Event',
        icon: _jsx(Calendar, { size: 20 }),
        action: () => window.location.href = '/calendar?create=true',
        color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
        id: 'create-post',
        title: 'Create Post',
        icon: _jsx(MessageSquare, { size: 20 }),
        action: () => window.location.href = '/?compose=true',
        color: 'bg-orange-500 hover:bg-orange-600'
    }
];
const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6'
};
const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
};
export function FloatingActionButton({ className, actions = defaultActions, mainIcon = _jsx(Plus, { size: 24 }), position = 'bottom-right', size = 'md', disabled = false }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const handleMainClick = () => {
        if (disabled)
            return;
        setIsExpanded(!isExpanded);
    };
    const handleActionClick = (action) => {
        action.action();
        setIsExpanded(false);
    };
    const isBottomPosition = position.includes('bottom');
    const isRightPosition = position.includes('right');
    const containerVariants = {
        closed: {
            transition: {
                staggerChildren: 0.05,
                staggerDirection: isBottomPosition ? -1 : 1
            }
        },
        open: {
            transition: {
                staggerChildren: 0.07,
                delayChildren: 0.1,
                staggerDirection: isBottomPosition ? -1 : 1
            }
        }
    };
    const itemVariants = {
        closed: {
            opacity: 0,
            scale: 0,
            y: isBottomPosition ? 20 : -20,
            x: isRightPosition ? 20 : -20,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        },
        open: {
            opacity: 1,
            scale: 1,
            y: 0,
            x: 0,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        }
    };
    const backgroundVariants = {
        closed: { scale: 0 },
        open: { scale: 1 }
    };
    return (_jsxs(_Fragment, { children: [_jsx(AnimatePresence, { children: isExpanded && (_jsx(motion.div, { className: "fixed inset-0 z-40 bg-[var(--hive-background-primary)]/20 backdrop-blur-sm", variants: backgroundVariants, initial: "closed", animate: "open", exit: "closed", onClick: () => setIsExpanded(false) })) }), _jsxs("div", { className: cn("fixed z-50 flex flex-col items-center", positionClasses[position], isBottomPosition ? "flex-col-reverse" : "flex-col", className), children: [_jsx(motion.div, { className: cn("flex items-center gap-3", isBottomPosition ? "flex-col-reverse" : "flex-col", isBottomPosition ? "mb-4" : "mt-4"), variants: containerVariants, initial: "closed", animate: isExpanded ? "open" : "closed", children: actions.map((action, index) => (_jsxs(motion.div, { variants: itemVariants, className: "flex items-center gap-3", children: [_jsx("div", { className: cn("whitespace-nowrap", isRightPosition ? "order-first" : "order-last"), children: _jsx("div", { className: "px-3 py-1.5 bg-[var(--hive-text-primary)] text-gray-900 text-sm font-medium rounded-lg shadow-lg", children: action.title }) }), _jsx(motion.button, { className: cn("w-12 h-12 rounded-full text-[var(--hive-text-primary)] shadow-lg transition-all duration-200", action.color || "bg-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]", "hover:scale-110 active:scale-95"), onClick: () => handleActionClick(action), whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, children: action.icon })] }, action.id))) }), _jsx(motion.button, { className: cn(sizeClasses[size], "bg-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] rounded-full shadow-lg transition-all duration-200", "flex items-center justify-center", "hover:scale-105 active:scale-95", disabled && "opacity-50 cursor-not-allowed"), onClick: handleMainClick, disabled: disabled, whileHover: { scale: disabled ? 1 : 1.05 }, whileTap: { scale: disabled ? 1 : 0.95 }, animate: { rotate: isExpanded ? 45 : 0 }, children: isExpanded ? _jsx(X, { size: 24 }) : mainIcon })] })] }));
}
// Context Menu FAB - appears on right-click or long press
export function ContextFloatingActionButton({ isVisible, position, onClose, actions = defaultActions.slice(0, 3) }) {
    if (!isVisible)
        return null;
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "fixed inset-0 z-40", onClick: onClose }), _jsx(motion.div, { className: "fixed z-50 flex flex-col items-center gap-2", style: {
                    left: Math.min(position.x - 30, window.innerWidth - 80),
                    top: Math.max(position.y - 120, 20)
                }, initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.8 }, transition: { type: "spring", stiffness: 300, damping: 25 }, children: actions.map((action, index) => (_jsxs(motion.div, { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.05 }, className: "flex items-center gap-3", children: [_jsx("div", { className: "px-3 py-1.5 bg-[var(--hive-text-primary)] text-gray-900 text-sm font-medium rounded-lg shadow-lg whitespace-nowrap", children: action.title }), _jsx(motion.button, { className: cn("w-10 h-10 rounded-full text-[var(--hive-text-primary)] shadow-lg transition-all duration-200", action.color || "bg-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)]"), onClick: () => {
                                action.action();
                                onClose();
                            }, whileHover: { scale: 1.1 }, whileTap: { scale: 0.95 }, children: action.icon })] }, action.id))) })] }));
}
//# sourceMappingURL=floating-action-button.js.map