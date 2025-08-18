'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from './framer-motion-proxy';
import { cn } from '../lib/utils';
import { HiveCard } from './hive-card';
import { HiveButton } from './hive-button';
import { GripVertical, Eye, EyeOff, Maximize2, Minimize2, Settings, Lock } from 'lucide-react';
const sizeClasses = {
    sm: 'col-span-1 row-span-1',
    md: 'col-span-1 md:col-span-2 row-span-1',
    lg: 'col-span-1 md:col-span-2 lg:col-span-2 row-span-1 md:row-span-2',
    xl: 'col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-3 row-span-1 md:row-span-2'
};
const mobileSizeClasses = {
    sm: 'col-span-1 row-span-1',
    md: 'col-span-1 row-span-1',
    lg: 'col-span-1 row-span-1', // Compressed on mobile
    xl: 'col-span-1 row-span-1' // Compressed on mobile
};
const BentoCardWrapper = ({ card, isEditMode, isMobile, dragConstraints }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const handleResize = useCallback((newSize) => {
        if (card.onResize) {
            card.onResize(newSize);
        }
    }, [card]);
    if (!card.isVisible)
        return null;
    const cardClasses = cn(isMobile ? mobileSizeClasses[card.size] : sizeClasses[card.size], 'relative group transition-all duration-300', isExpanded && 'z-50', card.isLocked && 'opacity-75');
    return (_jsx(motion.div, { className: cardClasses, onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: _jsxs(HiveCard, { variant: card.isBuilderOnly ? "gold-featured" : card.comingSoon ? "minimal" : "elevated", magneticHover: true, magneticIntensity: card.isBuilderOnly ? "strong" : "medium", interactive: !card.isLocked, className: cn('h-full w-full relative overflow-hidden', isEditMode && !card.isLocked && 'cursor-move'), children: [_jsx(AnimatePresence, { children: isEditMode && (isHovered || isMobile) && (_jsxs(motion.div, { initial: { opacity: 0, y: -10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 }, className: "absolute top-2 right-2 z-20 flex items-center gap-1", children: [!card.isLocked && (_jsxs(_Fragment, { children: [_jsx(HiveButton, { size: "sm", variant: "ghost", onClick: () => card.onToggleVisibility?.(), className: "h-6 w-6 p-0", children: card.isVisible ? _jsx(EyeOff, { className: "h-3 w-3" }) : _jsx(Eye, { className: "h-3 w-3" }) }), _jsx(HiveButton, { size: "sm", variant: "ghost", onClick: () => setIsExpanded(!isExpanded), className: "h-6 w-6 p-0", children: isExpanded ? _jsx(Minimize2, { className: "h-3 w-3" }) : _jsx(Maximize2, { className: "h-3 w-3" }) }), card.onSettings && (_jsx(HiveButton, { size: "sm", variant: "ghost", onClick: card.onSettings, className: "h-6 w-6 p-0", children: _jsx(Settings, { className: "h-3 w-3" }) }))] })), card.isLocked && (_jsx("div", { className: "h-6 w-6 flex items-center justify-center", children: _jsx(Lock, { className: "h-3 w-3 text-gray-400" }) }))] })) }), _jsx(AnimatePresence, { children: isEditMode && !card.isLocked && (isHovered || isMobile) && (_jsx(motion.div, { initial: { opacity: 0, x: -10 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -10 }, className: "absolute top-2 left-2 z-20", children: _jsx("div", { className: "p-1 rounded bg-gray-800/60 backdrop-blur-sm", children: _jsx(GripVertical, { className: "h-4 w-4 text-gray-400" }) }) })) }), card.comingSoon && (_jsx("div", { className: "absolute inset-0 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center z-10", children: _jsxs("div", { className: "text-center", children: [_jsx(Lock, { className: "h-8 w-8 text-[var(--hive-brand-secondary)] mx-auto mb-2" }), _jsx("p", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Coming in v1" }), _jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Social features unlock soon" })] }) })), card.isBuilderOnly && (_jsx("div", { className: "absolute top-2 left-2 z-10", children: _jsx("div", { className: "px-2 py-1 bg-[var(--hive-brand-secondary)]/20 border border-hive-gold/30 rounded-full", children: _jsx("span", { className: "text-xs font-medium text-[var(--hive-brand-secondary)]", children: "Builder" }) }) })), _jsx("div", { className: cn('h-full w-full', card.comingSoon && 'opacity-30'), children: card.children })] }) }));
};
export const BentoGrid = ({ cards, isCustomizable = true, isEditMode = false, onCardReorder, onToggleEditMode, className }) => {
    const [isMobile, setIsMobile] = useState(false);
    const containerRef = useRef(null);
    const visibleCards = cards.filter(card => card.isVisible);
    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    const handleReorder = useCallback((reorderedCards) => {
        if (onCardReorder) {
            const allCards = [...cards];
            const hiddenCards = cards.filter(card => !card.isVisible);
            onCardReorder([...reorderedCards, ...hiddenCards]);
        }
    }, [cards, onCardReorder]);
    return (_jsxs("div", { className: cn('relative', className), children: [isCustomizable && (_jsxs("div", { className: "mb-6 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)]", children: "Your Profile" }), _jsx("div", { className: "text-sm text-gray-400", children: "Customize your dashboard" })] }), _jsxs(HiveButton, { variant: isEditMode ? "primary" : "outline", onClick: onToggleEditMode, className: "gap-2", children: [_jsx(Settings, { className: "h-4 w-4" }), isEditMode ? 'Done Editing' : 'Customize'] })] })), _jsx(AnimatePresence, { children: isEditMode && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "mb-6 p-4 rounded-lg bg-[var(--hive-brand-secondary)]/10 border border-hive-gold/20", children: _jsxs("p", { className: "text-sm text-[var(--hive-brand-secondary)]", children: [_jsx("strong", { children: "Your Profile = Your Rules" }), " \u2022 Drag to reorder, click settings to customize, use eye icon to hide cards"] }) })) }), _jsx("div", { ref: containerRef, className: cn('grid gap-6 auto-rows-[50]', isMobile
                    ? 'grid-cols-1'
                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'), children: visibleCards.map((card) => (_jsx(motion.div, { className: "contents", children: _jsx(BentoCardWrapper, { card: card, isEditMode: isEditMode, isMobile: isMobile, dragConstraints: containerRef }) }, card.id))) }), _jsx(AnimatePresence, { children: isEditMode && cards.some(card => !card.isVisible) && (_jsxs(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: "mt-8 p-4 rounded-lg bg-gray-800/40 border border-[var(--hive-border-default)]", children: [_jsx("h3", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-3", children: "Hidden Cards" }), _jsx("div", { className: "flex flex-wrap gap-2", children: cards
                                .filter(card => !card.isVisible)
                                .map((card) => (_jsxs(HiveButton, { variant: "outline", size: "sm", onClick: card.onToggleVisibility, className: "gap-2", children: [_jsx(Eye, { className: "h-3 w-3" }), card.title, card.comingSoon && _jsx(Lock, { className: "h-3 w-3 text-gray-400" })] }, card.id))) })] })) })] }));
};
export default BentoGrid;
//# sourceMappingURL=bento-grid.js.map