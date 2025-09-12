import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { darkLuxury, luxuryShadows, luxuryRadius, luxurySpacing } from '../theme/dark-luxury';
import { HiveMagneticHover, HiveCascade } from '../components/hive-motion-wrapper';
// Main Layout Container - Refined Density
export const HiveLayout = ({ children, className }) => {
    return (_jsx("div", { className: cn('min-h-screen', className), style: {
            backgroundColor: darkLuxury.obsidian,
            background: `linear-gradient(135deg, ${darkLuxury.obsidian} 0%, ${darkLuxury.charcoal} 100%)`,
        }, children: children }));
};
export const HiveBentoGrid = ({ children, className, cols = 3, gap = 'lg', cascade = false }) => {
    const gridCols = {
        1: 'grid-cols-1',
        2: 'grid-cols-1 md:grid-cols-2',
        3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
        4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
        5: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-5',
        6: 'grid-cols-1 md:grid-cols-3 lg:grid-cols-6',
    };
    const gapClass = `gap-${gap}`;
    const gridContent = (_jsx("div", { className: cn('grid', gridCols[cols], gapClass, className), style: { gap: luxurySpacing[gap] }, children: children }));
    return cascade ? (_jsx(HiveCascade, { children: gridContent })) : (gridContent);
};
export const HiveBentoCard = ({ children, className, span = 1, aspect = 'auto', elevated = false, interactive = false, glow = false, }) => {
    const spanClass = span > 1 ? `col-span-${span}` : '';
    const aspectClasses = {
        square: 'aspect-square',
        wide: 'aspect-[2/1]',
        tall: 'aspect-[1/2]',
        auto: '',
    };
    const cardStyles = {
        backgroundColor: elevated ? darkLuxury.graphite : darkLuxury.charcoal,
        borderRadius: luxuryRadius.large,
        border: `1px solid ${darkLuxury.steel}`,
        boxShadow: elevated ? luxuryShadows.level3 : luxuryShadows.level2,
        ...(glow && { boxShadow: luxuryShadows.goldGlow }),
    };
    const card = (_jsx("div", { className: cn('p-6 transition-all duration-300', spanClass, aspectClasses[aspect], className), style: cardStyles, children: children }));
    return interactive ? (_jsx(HiveMagneticHover, { children: card })) : (card);
};
export const HiveSidebarLayout = ({ children, sidebar, className, sidebarWidth = '240px', collapsible = false, }) => {
    const [collapsed, setCollapsed] = React.useState(false);
    return (_jsxs("div", { className: cn('flex h-screen', className), children: [_jsxs(motion.aside, { className: "flex-shrink-0 border-r", style: {
                    backgroundColor: darkLuxury.charcoal,
                    borderColor: darkLuxury.steel,
                    width: collapsed ? '60px' : sidebarWidth,
                }, animate: { width: collapsed ? '60px' : sidebarWidth }, transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }, children: [collapsible && (_jsx("button", { onClick: () => setCollapsed(!collapsed), className: "w-full p-4 text-left text-[var(--hive-text-primary)] hover:bg-[var(--hive-text-primary)]/5 transition-colors", children: collapsed ? '→' : '←' })), _jsx("div", { className: collapsed ? 'overflow-hidden' : '', children: sidebar })] }), _jsx("main", { className: "flex-1 overflow-auto", children: children })] }));
};
export const HiveSplitPanel = ({ leftPanel, rightPanel, className, leftWidth = '50%', resizable = false, }) => {
    return (_jsxs("div", { className: cn('flex h-full', className), children: [_jsx("div", { className: "border-r overflow-auto", style: {
                    backgroundColor: darkLuxury.charcoal,
                    borderColor: darkLuxury.steel,
                    width: leftWidth,
                }, children: leftPanel }), _jsx("div", { className: "flex-1 overflow-auto", children: rightPanel })] }));
};
export const HiveStack = ({ children, className, spacing = 'lg', align = 'stretch', cascade = false, }) => {
    const alignClasses = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        stretch: 'items-stretch',
    };
    const stackContent = (_jsx("div", { className: cn('flex flex-col', alignClasses[align], className), style: { gap: luxurySpacing[spacing] }, children: children }));
    return cascade ? (_jsx(HiveCascade, { children: stackContent })) : (stackContent);
};
export const HiveCluster = ({ children, className, spacing = 'md', align = 'center', wrap = false, }) => {
    const alignClasses = {
        start: 'items-start',
        center: 'items-center',
        end: 'items-end',
        baseline: 'items-baseline',
    };
    return (_jsx("div", { className: cn('flex', alignClasses[align], wrap && 'flex-wrap', className), style: { gap: luxurySpacing[spacing] }, children: children }));
};
export const HiveCover = ({ children, className, minHeight = '60vh', centered = true, overlay = false, }) => {
    return (_jsx("div", { className: cn('relative flex flex-col', centered && 'items-center justify-center text-center', className), style: {
            minHeight,
            backgroundColor: darkLuxury.obsidian,
            ...(overlay && {
                background: `linear-gradient(135deg, ${darkLuxury.obsidian}DD 0%, ${darkLuxury.charcoal}DD 100%)`,
            }),
        }, children: children }));
};
export const HiveFrame = ({ children, className, padding = '2xl', maxWidth = '1200px', centered = true, }) => {
    return (_jsx("div", { className: cn(centered && 'mx-auto', className), style: {
            padding: luxurySpacing[padding],
            maxWidth,
        }, children: children }));
};
export const HiveGlassPanel = ({ children, className, blur = true, intensity = 'medium', }) => {
    const intensityMap = {
        light: {
            backdropFilter: 'blur(2)',
            backgroundColor: 'color-mix(in_srgb,var(--hive-interactive-hover)_60%,transparent)',
            border: '1px solid color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)',
        },
        medium: {
            backdropFilter: 'blur(3) saturate(180%)',
            backgroundColor: 'var(--hive-interactive-hover)',
            border: '1px solid var(--hive-interactive-active)',
        },
        heavy: {
            backdropFilter: 'blur(4) saturate(200%)',
            backgroundColor: 'color-mix(in_srgb,var(--hive-interactive-active)_80%,transparent)',
            border: '1px solid color-mix(in_srgb,var(--hive-border-hover)_75%,transparent)',
        },
    };
    return (_jsx("div", { className: cn('rounded-lg', className), style: {
            borderRadius: luxuryRadius.large,
            ...(blur ? intensityMap[intensity] : { backgroundColor: darkLuxury.charcoal }),
        }, children: children }));
};
//# sourceMappingURL=hive-layout.js.map