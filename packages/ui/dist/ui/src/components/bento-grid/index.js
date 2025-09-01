/**
 * HIVE Unified Bento Grid System
 * Production-ready, mobile-first, responsive grid for campus profiles
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils.js';
import { Card } from '../ui/card.js';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Grip, Eye, EyeOff, Settings, Lock, Plus, X } from 'lucide-react';
// ============================================================================
// GRID SIZE MAPPING
// ============================================================================
const GRID_SIZES = {
    small: {
        mobile: 'col-span-1 row-span-1',
        tablet: 'col-span-1 row-span-1',
        desktop: 'col-span-1 row-span-1',
        minHeight: 160
    },
    medium: {
        mobile: 'col-span-1 row-span-1',
        tablet: 'col-span-2 row-span-1',
        desktop: 'col-span-2 row-span-1',
        minHeight: 160
    },
    large: {
        mobile: 'col-span-1 row-span-2',
        tablet: 'col-span-2 row-span-2',
        desktop: 'col-span-2 row-span-2',
        minHeight: 340
    },
    wide: {
        mobile: 'col-span-1 row-span-1',
        tablet: 'col-span-3 row-span-1',
        desktop: 'col-span-3 row-span-1',
        minHeight: 160
    },
    tall: {
        mobile: 'col-span-1 row-span-2',
        tablet: 'col-span-1 row-span-3',
        desktop: 'col-span-1 row-span-3',
        minHeight: 520
    },
    hero: {
        mobile: 'col-span-1 row-span-2',
        tablet: 'col-span-3 row-span-2',
        desktop: 'col-span-4 row-span-2',
        minHeight: 340
    }
};
// ============================================================================
// ANIMATION VARIANTS
// ============================================================================
const cardVariants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
        y: 20
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 30
        }
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        y: -20,
        transition: {
            duration: 0.2
        }
    }
};
const controlsVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
        }
    }
};
// ============================================================================
// BENTO CARD COMPONENT
// ============================================================================
const BentoCard = ({ id, title, size, priority, children, isVisible = true, isLocked = false, isBuilderOnly = false, comingSoon = false, isEditMode, isMobile, onResize, onToggleVisibility, onRemove, onConfigure, onUpdate, className, icon, description, badge }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const sizeConfig = GRID_SIZES[size];
    const gridClasses = isMobile ? sizeConfig.mobile :
        (typeof window !== 'undefined' && window.innerWidth < 1024) ?
            sizeConfig.tablet : sizeConfig.desktop;
    const handleSizeChange = useCallback((newSize) => {
        onResize?.(newSize);
        onUpdate({ size: newSize });
    }, [onResize, onUpdate]);
    if (!isVisible && !isEditMode)
        return null;
    return (_jsx(motion.div, { layout: true, variants: cardVariants, initial: "hidden", animate: "visible", exit: "exit", className: cn(gridClasses, 'relative group', !isVisible && 'opacity-50', className), style: {
            minHeight: `${sizeConfig.minHeight}px`
        }, onHoverStart: () => setIsHovered(true), onHoverEnd: () => setIsHovered(false), children: _jsxs(Card, { className: cn('h-full w-full relative overflow-hidden transition-all duration-300', 'border-[var(--hive-border-default)] bg-[var(--hive-background-elevated)]', 'hover:border-[var(--hive-brand-secondary)]/30 hover:shadow-lg', isBuilderOnly && 'border-[var(--hive-brand-secondary)]/20 bg-gradient-to-br from-[var(--hive-brand-secondary)]/5 to-transparent', comingSoon && 'opacity-60', isEditMode && 'cursor-move'), children: [_jsx(AnimatePresence, { children: isEditMode && (isHovered || isMobile || showControls) && !isLocked && (_jsxs(motion.div, { variants: controlsVariants, initial: "hidden", animate: "visible", exit: "hidden", className: "absolute top-3 right-3 z-20 flex items-center gap-1 bg-[var(--hive-background-primary)]/90 backdrop-blur-sm rounded-lg border border-[var(--hive-border-subtle)] p-1", children: [_jsx(Button, { size: "sm", variant: "ghost", onClick: onToggleVisibility, className: "h-7 w-7 p-0", children: isVisible ? _jsx(EyeOff, { className: "h-3 w-3" }) : _jsx(Eye, { className: "h-3 w-3" }) }), onConfigure && (_jsx(Button, { size: "sm", variant: "ghost", onClick: onConfigure, className: "h-7 w-7 p-0", children: _jsx(Settings, { className: "h-3 w-3" }) })), onRemove && (_jsx(Button, { size: "sm", variant: "ghost", onClick: onRemove, className: "h-7 w-7 p-0 text-red-500 hover:text-red-600", children: _jsx(X, { className: "h-3 w-3" }) })), _jsx("div", { className: "h-7 w-7 flex items-center justify-center cursor-grab active:cursor-grabbing", children: _jsx(Grip, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" }) })] })) }), isLocked && (_jsx("div", { className: "absolute top-3 left-3 z-10", children: _jsx("div", { className: "h-6 w-6 bg-[var(--hive-background-primary)]/90 backdrop-blur-sm rounded border border-[var(--hive-border-subtle)] flex items-center justify-center", children: _jsx(Lock, { className: "h-3 w-3 text-[var(--hive-text-tertiary)]" }) }) })), isBuilderOnly && (_jsx("div", { className: "absolute top-3 left-3 z-10", children: _jsx("div", { className: "px-2 py-1 bg-[var(--hive-brand-secondary)]/15 border border-[var(--hive-brand-secondary)]/30 rounded-full", children: _jsx("span", { className: "text-xs font-medium text-[var(--hive-brand-secondary)]", children: "Builder" }) }) })), comingSoon && (_jsx("div", { className: "absolute inset-0 bg-[var(--hive-background-primary)]/80 backdrop-blur-sm flex items-center justify-center z-10", children: _jsxs("div", { className: "text-center", children: [_jsx(Lock, { className: "h-6 w-6 text-[var(--hive-brand-secondary)] mx-auto mb-2" }), _jsx("p", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Coming Soon" }), _jsx("p", { className: "text-xs text-[var(--hive-text-tertiary)] mt-1", children: "Available in v1" })] }) })), _jsxs("div", { className: cn('h-full w-full p-4', comingSoon && 'opacity-40 pointer-events-none'), children: [(title || icon || badge) && (_jsxs("div", { className: "mb-3", children: [_jsxs("div", { className: "flex items-start justify-between mb-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [icon, _jsx("h3", { className: "text-sm font-semibold text-[var(--hive-text-primary)] truncate", children: title })] }), badge && (_jsx("span", { className: "px-2 py-0.5 text-xs font-medium bg-[var(--hive-brand-secondary)]/10 text-[var(--hive-brand-secondary)] rounded-full shrink-0", children: badge.text }))] }), description && (_jsx("p", { className: "text-xs text-[var(--hive-text-secondary)] line-clamp-2", children: description }))] })), _jsx("div", { className: "flex-1 h-full", children: children })] })] }) }));
};
// ============================================================================
// MAIN BENTO GRID COMPONENT
// ============================================================================
export const BentoGrid = ({ cards, columns = { mobile: 1, tablet: 2, desktop: 4 }, gap = 4, minCardHeight = 160, isCustomizable = true, isEditMode = false, showHiddenCards = false, onCardReorder, onToggleEditMode, onCardUpdate, className }) => {
    const [isMobile, setIsMobile] = useState(false);
    // Check mobile on mount and resize
    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    // Sort and filter cards
    const sortedCards = useMemo(() => {
        const priorityOrder = { essential: 0, high: 1, medium: 2, low: 3, hidden: 4 };
        return cards
            .filter(card => showHiddenCards || card.priority !== 'hidden')
            .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }, [cards, showHiddenCards]);
    const visibleCards = sortedCards.filter(card => card.isVisible !== false || isEditMode);
    const hiddenCards = cards.filter(card => card.isVisible === false);
    const handleCardUpdate = useCallback((cardId, updates) => {
        onCardUpdate?.(cardId, updates);
    }, [onCardUpdate]);
    return (_jsxs("div", { className: cn('w-full space-y-6', className), children: [isCustomizable && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: "Your Campus Command Center" }), _jsxs("p", { className: "text-sm text-[var(--hive-text-secondary)] mt-1", children: ["Customize your profile dashboard \u2022 ", visibleCards.length, " active cards"] })] }), _jsxs(Button, { variant: isEditMode ? "default" : "outline", onClick: onToggleEditMode, className: "gap-2", children: [_jsx(Settings, { className: "h-4 w-4" }), isEditMode ? 'Done' : 'Customize'] })] })), _jsx(AnimatePresence, { children: isEditMode && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "p-4 rounded-lg bg-[var(--hive-brand-secondary)]/10 border border-[var(--hive-brand-secondary)]/20", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "h-5 w-5 bg-[var(--hive-brand-secondary)] rounded-full flex items-center justify-center shrink-0 mt-0.5", children: _jsx(Settings, { className: "h-3 w-3 text-[var(--hive-text-primary)]" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-[var(--hive-brand-secondary)] mb-1", children: "Profile Customization Active" }), _jsx("p", { className: "text-xs text-[var(--hive-text-secondary)]", children: "Drag cards to reorder \u2022 Use controls to hide/show cards \u2022 Your changes save automatically" })] })] }) })) }), _jsx(motion.div, { layout: true, className: cn('grid auto-rows-fr gap-4', 
                // Mobile: Single column
                'grid-cols-1', 
                // Tablet: 2-3 columns  
                `md:grid-cols-${columns.tablet}`, 
                // Desktop: Full columns
                `lg:grid-cols-${columns.desktop}`, 
                // Dynamic gap
                `gap-${gap}`), style: {
                    minHeight: `${minCardHeight}px`
                }, children: _jsx(AnimatePresence, { mode: "popLayout", children: visibleCards.map((card) => (_jsx(BentoCard, { ...card, isEditMode: isEditMode, isMobile: isMobile, onUpdate: (updates) => handleCardUpdate(card.id, updates) }, card.id))) }) }), _jsx(AnimatePresence, { children: isEditMode && hiddenCards.length > 0 && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "p-4 rounded-lg bg-[var(--hive-background-subtle)] border border-[var(--hive-border-default)]", children: [_jsxs("h3", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-3 flex items-center gap-2", children: [_jsx(EyeOff, { className: "h-4 w-4" }), "Hidden Cards"] }), _jsx("div", { className: "flex flex-wrap gap-2", children: hiddenCards.map((card) => (_jsxs(Button, { variant: "secondary", size: "sm", onClick: card.onToggleVisibility, className: "gap-2", children: [_jsx(Eye, { className: "h-3 w-3" }), card.title, card.comingSoon && _jsx(Lock, { className: "h-3 w-3 text-[var(--hive-text-tertiary)]" })] }, card.id))) })] })) }), visibleCards.length === 0 && !isEditMode && (_jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, className: "flex flex-col items-center justify-center py-12 text-center", children: [_jsx("div", { className: "h-16 w-16 bg-[var(--hive-background-subtle)] rounded-full flex items-center justify-center mb-4", children: _jsx(Plus, { className: "h-8 w-8 text-[var(--hive-text-tertiary)]" }) }), _jsx("h3", { className: "text-lg font-medium text-[var(--hive-text-primary)] mb-2", children: "No cards visible" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-4", children: "Enable customization to add and organize your profile cards" }), isCustomizable && (_jsxs(Button, { onClick: onToggleEditMode, variant: "secondary", children: [_jsx(Settings, { className: "h-4 w-4 mr-2" }), "Customize Profile"] }))] }))] }));
};
// ============================================================================
// UTILITIES & HELPERS
// ============================================================================
export const createBentoCard = (id, title, size = 'medium', priority = 'medium', overrides = {}) => ({
    id,
    title,
    size,
    priority,
    children: null,
    isVisible: true,
    isLocked: false,
    isBuilderOnly: false,
    comingSoon: false,
    ...overrides
});
export const CAMPUS_CARD_PRESETS = {
    avatar: createBentoCard('avatar', 'Profile Photo', 'small', 'essential'),
    calendar: createBentoCard('calendar', 'Campus Schedule', 'medium', 'high'),
    spaces: createBentoCard('spaces', 'My Spaces', 'large', 'essential'),
    tools: createBentoCard('tools', 'Built Tools', 'medium', 'high'),
    activity: createBentoCard('activity', 'Recent Activity', 'wide', 'medium'),
    analytics: createBentoCard('analytics', 'Impact Stats', 'small', 'low'),
    social: createBentoCard('social', 'Campus Connections', 'large', 'medium', { comingSoon: true }),
    hivelab: createBentoCard('hivelab', 'HiveLab Access', 'medium', 'low', { isBuilderOnly: true })
};
export default BentoGrid;
//# sourceMappingURL=index.js.map