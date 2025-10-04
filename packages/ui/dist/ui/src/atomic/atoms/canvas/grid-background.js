/**
 * Grid Background Component
 *
 * Infinite grid background for HiveLab canvas with dot or line pattern.
 * Scales with zoom and pans with viewport.
 */
'use client';
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import { cn } from '@/lib/utils';
export function GridBackground({ viewport, gridSize = 20, pattern = 'dots', color = 'hsl(var(--muted-foreground) / 0.15)', backgroundColor = 'hsl(var(--background))', majorGridEvery = 5, majorColor = 'hsl(var(--muted-foreground) / 0.25)', className, }) {
    // ============================================================================
    // Calculate Grid Pattern
    // ============================================================================
    const patternId = useMemo(() => `grid-pattern-${Math.random().toString(36).substr(2, 9)}`, []);
    const majorPatternId = useMemo(() => `major-grid-pattern-${Math.random().toString(36).substr(2, 9)}`, []);
    // Adjust grid size based on zoom
    const scaledGridSize = gridSize * viewport.zoom;
    const scaledMajorGridSize = scaledGridSize * majorGridEvery;
    // Calculate pattern offset based on viewport pan
    const offsetX = viewport.x % scaledGridSize;
    const offsetY = viewport.y % scaledGridSize;
    const majorOffsetX = viewport.x % scaledMajorGridSize;
    const majorOffsetY = viewport.y % scaledMajorGridSize;
    // ============================================================================
    // Render Grid Pattern
    // ============================================================================
    const renderDotPattern = () => (_jsxs(_Fragment, { children: [_jsx("pattern", { id: patternId, x: offsetX, y: offsetY, width: scaledGridSize, height: scaledGridSize, patternUnits: "userSpaceOnUse", children: _jsx("circle", { cx: scaledGridSize / 2, cy: scaledGridSize / 2, r: Math.max(1, viewport.zoom * 1.5), fill: color }) }), _jsx("pattern", { id: majorPatternId, x: majorOffsetX, y: majorOffsetY, width: scaledMajorGridSize, height: scaledMajorGridSize, patternUnits: "userSpaceOnUse", children: _jsx("circle", { cx: scaledMajorGridSize / 2, cy: scaledMajorGridSize / 2, r: Math.max(2, viewport.zoom * 2.5), fill: majorColor }) })] }));
    const renderLinePattern = () => (_jsxs(_Fragment, { children: [_jsx("pattern", { id: patternId, x: offsetX, y: offsetY, width: scaledGridSize, height: scaledGridSize, patternUnits: "userSpaceOnUse", children: _jsx("path", { d: `M ${scaledGridSize} 0 L 0 0 0 ${scaledGridSize}`, fill: "none", stroke: color, strokeWidth: Math.max(0.5, viewport.zoom * 0.5) }) }), _jsx("pattern", { id: majorPatternId, x: majorOffsetX, y: majorOffsetY, width: scaledMajorGridSize, height: scaledMajorGridSize, patternUnits: "userSpaceOnUse", children: _jsx("path", { d: `M ${scaledMajorGridSize} 0 L 0 0 0 ${scaledMajorGridSize}`, fill: "none", stroke: majorColor, strokeWidth: Math.max(1, viewport.zoom) }) })] }));
    // ============================================================================
    // Render
    // ============================================================================
    return (_jsxs("svg", { className: cn('absolute inset-0 w-full h-full pointer-events-none', className), style: { backgroundColor }, children: [_jsx("defs", { children: pattern === 'dots' ? renderDotPattern() : renderLinePattern() }), _jsx("rect", { width: "100%", height: "100%", fill: `url(#${majorPatternId})` }), _jsx("rect", { width: "100%", height: "100%", fill: `url(#${patternId})` })] }));
}
GridBackground.displayName = 'GridBackground';
//# sourceMappingURL=grid-background.js.map