"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils.js';
import { liquidMetal, motionDurations, cascadeTiming } from '../motion/hive-motion-system.js';
import { ChevronDown, ChevronRight, Check } from 'lucide-react';
// HIVE Menu System - Magnetic Dropdown Navigation with Liquid Metal Motion
// Sophisticated menu components with magnetic interactions and multi-level support
const hiveMenuVariants = cva(
// Base menu styles - matte obsidian glass
"relative inline-block", {
    variants: {
        variant: {
            default: "",
            ghost: "",
            outline: "",
        }
    },
    defaultVariants: {
        variant: "default",
    },
});
const menuContentVariants = cva(
// Menu dropdown styles
"absolute z-50 min-w-48 bg-[var(--hive-background-primary)]/60 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden", {
    variants: {
        position: {
            bottom: "top-full mt-2",
            top: "bottom-full mb-2",
            left: "right-0",
            right: "left-0",
        },
        size: {
            sm: "min-w-32",
            default: "min-w-48",
            lg: "min-w-64",
            xl: "min-w-80",
        }
    },
    defaultVariants: {
        position: "bottom",
        size: "default",
    },
});
// Menu item animation variants
const menuItemVariants = {
    rest: {
        x: 0,
        backgroundColor: 'var(--hive-interactive-hover)',
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    },
    hover: {
        x: 4,
        backgroundColor: 'var(--hive-interactive-active)',
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    },
    active: {
        x: 6,
        backgroundColor: 'color-mix(in_srgb,var(--hive-brand-secondary)_15%,transparent)',
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    }
};
// Menu dropdown animation
const dropdownVariants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        y: -10,
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: motionDurations.smooth,
            ease: liquidMetal.easing,
            staggerChildren: cascadeTiming.stagger,
        }
    }
};
const menuItemStaggerVariants = {
    hidden: {
        opacity: 0,
        x: -10,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: motionDurations.smooth,
            ease: liquidMetal.easing,
        }
    }
};
const HiveMenu = React.forwardRef(({ className, variant, items, trigger, position = 'bottom', size = 'default', closeOnSelect = true, disabled = false, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [expandedSubmenus, setExpandedSubmenus] = useState(new Set());
    const menuRef = useRef(null);
    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
                setExpandedSubmenus(new Set());
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    // Close on escape
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
                setExpandedSubmenus(new Set());
            }
        };
        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            return () => document.removeEventListener('keydown', handleEscape);
        }
    }, [isOpen]);
    const toggleMenu = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
            if (!isOpen) {
                setExpandedSubmenus(new Set());
            }
        }
    };
    const toggleSubmenu = (itemId) => {
        const newExpanded = new Set(expandedSubmenus);
        if (newExpanded.has(itemId)) {
            newExpanded.delete(itemId);
        }
        else {
            newExpanded.add(itemId);
        }
        setExpandedSubmenus(newExpanded);
    };
    const handleItemClick = (item) => {
        if (item.disabled)
            return;
        if (item.children && item.children.length > 0) {
            toggleSubmenu(item.id);
        }
        else {
            if (closeOnSelect) {
                setIsOpen(false);
                setExpandedSubmenus(new Set());
            }
            item.onClick?.();
        }
    };
    const renderMenuItem = (item, level = 0) => {
        if (item.separator) {
            return (_jsx("div", { className: "border-t border-white/10 my-1" }, `separator-${item.id}`));
        }
        const hasChildren = item.children && item.children.length > 0;
        const isExpanded = expandedSubmenus.has(item.id);
        return (_jsxs("div", { children: [_jsxs(motion.button, { className: cn("w-full flex items-center justify-between px-4 py-3 text-left text-sm transition-colors", level > 0 && "pl-8", item.disabled && "opacity-50 cursor-not-allowed", item.selected && "text-yellow-400", !item.disabled && !item.selected && "text-[var(--hive-text-primary)]/80"), variants: menuItemVariants, initial: "rest", animate: item.selected ? "active" : "rest", whileHover: !item.disabled ? "hover" : "rest", onClick: () => handleItemClick(item), disabled: item.disabled, children: [_jsxs("div", { className: "flex items-center space-x-3 flex-1 min-w-0", children: [item.icon && (_jsx("div", { className: cn("shrink-0", item.selected ? "text-yellow-400" : "text-[var(--hive-text-primary)]/60"), children: item.icon })), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "font-medium truncate", children: item.label }), item.description && (_jsx("div", { className: "text-xs text-[var(--hive-text-primary)]/50 truncate", children: item.description }))] })] }), _jsxs("div", { className: "flex items-center space-x-2 shrink-0", children: [item.selected && (_jsx(Check, { size: 14, className: "text-yellow-400" })), item.shortcut && (_jsx("span", { className: "text-xs font-mono text-[var(--hive-text-primary)]/40 bg-[var(--hive-text-primary)]/5 px-2 py-0.5 rounded border border-white/10", children: item.shortcut })), hasChildren && (_jsx(motion.div, { animate: { rotate: isExpanded ? 90 : 0 }, transition: { duration: motionDurations.quick }, children: _jsx(ChevronRight, { size: 14, className: "text-[var(--hive-text-primary)]/40" }) }))] })] }), _jsx(AnimatePresence, { children: hasChildren && isExpanded && (_jsx(motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: 'auto', opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: {
                            duration: motionDurations.smooth,
                            ease: liquidMetal.easing,
                        }, className: "overflow-hidden border-l border-white/10 ml-6", children: item.children?.map(child => renderMenuItem(child, level + 1)) })) })] }, item.id));
    };
    return (_jsxs("div", { ref: menuRef, className: cn(hiveMenuVariants({ variant, className })), ...props, children: [_jsx(motion.div, { className: cn("cursor-pointer", disabled && "opacity-50 cursor-not-allowed"), onClick: toggleMenu, whileHover: !disabled ? { scale: 1.02 } : {}, whileTap: !disabled ? { scale: 0.98 } : {}, children: trigger }), _jsx(AnimatePresence, { children: isOpen && (_jsx(motion.div, { className: cn(menuContentVariants({ position, size })), variants: dropdownVariants, initial: "hidden", animate: "visible", exit: "hidden", children: _jsx("div", { className: "py-2", children: items.map(item => (_jsx(motion.div, { variants: menuItemStaggerVariants, children: renderMenuItem(item) }, item.id))) }) })) })] }));
});
HiveMenu.displayName = "HiveMenu";
const HiveMenuButton = React.forwardRef(({ label, icon, showChevron = true, buttonVariant = 'default', ...props }, ref) => {
    const buttonClass = {
        default: "bg-[var(--hive-text-primary)]/10 hover:bg-[var(--hive-text-primary)]/20 text-[var(--hive-text-primary)] border border-white/20",
        ghost: "hover:bg-[var(--hive-text-primary)]/10 text-[var(--hive-text-primary)]/80",
        outline: "border border-white/30 hover:bg-[var(--hive-text-primary)]/5 text-[var(--hive-text-primary)]/80"
    }[buttonVariant];
    const trigger = (_jsxs("div", { className: cn("flex items-center space-x-2 px-4 py-2 rounded-xl transition-all", buttonClass), children: [icon && _jsx("span", { children: icon }), _jsx("span", { className: "font-medium", children: label }), showChevron && (_jsx(ChevronDown, { size: 16, className: "text-[var(--hive-text-primary)]/60" }))] }));
    return (_jsx(HiveMenu, { ref: ref, trigger: trigger, ...props }));
});
HiveMenuButton.displayName = "HiveMenuButton";
// Context Menu Hook
export function useHiveContextMenu(items) {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const openContextMenu = (event) => {
        event.preventDefault();
        setPosition({ x: event.clientX, y: event.clientY });
        setIsOpen(true);
    };
    const closeContextMenu = () => {
        setIsOpen(false);
    };
    return {
        isOpen,
        position,
        items,
        openContextMenu,
        closeContextMenu,
        contextMenuProps: {
            onContextMenu: openContextMenu,
        },
    };
}
export { HiveMenu, HiveMenuButton, hiveMenuVariants };
//# sourceMappingURL=hive-menu.js.map