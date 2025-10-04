/**
 * Mini-Map Component
 *
 * Overview map showing entire canvas with viewport indicator.
 * Allows quick navigation by clicking or dragging viewport rectangle.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useRef, useState, useCallback } from 'react';
import { cn } from '../../../lib/utils';
export function MiniMap({ viewport, pages, currentPageId, containerWidth, containerHeight, width = 200, height = 150, position = 'bottom-left', onViewportChange, className, showElementCount = true, }) {
    const miniMapRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    // ============================================================================
    // Calculate Canvas Bounds
    // ============================================================================
    const canvasBounds = React.useMemo(() => {
        if (pages.length === 0) {
            return { minX: 0, minY: 0, maxX: 1000, maxY: 1000 };
        }
        let minX = Infinity;
        let minY = Infinity;
        let maxX = -Infinity;
        let maxY = -Infinity;
        pages.forEach(page => {
            minX = Math.min(minX, page.x);
            minY = Math.min(minY, page.y);
            maxX = Math.max(maxX, page.x + page.width);
            maxY = Math.max(maxY, page.y + page.height);
        });
        // Add padding
        const padding = 100;
        return {
            minX: minX - padding,
            minY: minY - padding,
            maxX: maxX + padding,
            maxY: maxY + padding,
        };
    }, [pages]);
    const canvasWidth = canvasBounds.maxX - canvasBounds.minX;
    const canvasHeight = canvasBounds.maxY - canvasBounds.minY;
    // ============================================================================
    // Scale Factors
    // ============================================================================
    const scaleX = width / canvasWidth;
    const scaleY = height / canvasHeight;
    const scale = Math.min(scaleX, scaleY);
    // ============================================================================
    // Viewport Rectangle
    // ============================================================================
    const viewportRect = React.useMemo(() => {
        // Calculate visible area in canvas coordinates
        const visibleX = -viewport.x / viewport.zoom;
        const visibleY = -viewport.y / viewport.zoom;
        const visibleWidth = containerWidth / viewport.zoom;
        const visibleHeight = containerHeight / viewport.zoom;
        // Convert to mini-map coordinates
        return {
            x: (visibleX - canvasBounds.minX) * scale,
            y: (visibleY - canvasBounds.minY) * scale,
            width: visibleWidth * scale,
            height: visibleHeight * scale,
        };
    }, [viewport, containerWidth, containerHeight, canvasBounds, scale]);
    // ============================================================================
    // Position Classes
    // ============================================================================
    const positionClasses = {
        'top-left': 'top-4 left-4',
        'top-right': 'top-4 right-4',
        'bottom-left': 'bottom-20 left-4',
        'bottom-right': 'bottom-20 right-4',
    };
    // ============================================================================
    // Interaction Handlers
    // ============================================================================
    const handleMouseDown = useCallback((e) => {
        if (!onViewportChange)
            return;
        setIsDragging(true);
        const handleMove = (moveEvent) => {
            const rect = miniMapRef.current?.getBoundingClientRect();
            if (!rect)
                return;
            const x = moveEvent.clientX - rect.left;
            const y = moveEvent.clientY - rect.top;
            // Convert mini-map coordinates to canvas coordinates
            const canvasX = x / scale + canvasBounds.minX;
            const canvasY = y / scale + canvasBounds.minY;
            // Center viewport on clicked position
            onViewportChange({
                x: -(canvasX * viewport.zoom) + containerWidth / 2,
                y: -(canvasY * viewport.zoom) + containerHeight / 2,
            });
        };
        const handleUp = () => {
            setIsDragging(false);
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleUp);
        };
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleUp);
        // Immediate navigation to click position
        const rect = miniMapRef.current?.getBoundingClientRect();
        if (!rect)
            return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const canvasX = x / scale + canvasBounds.minX;
        const canvasY = y / scale + canvasBounds.minY;
        onViewportChange({
            x: -(canvasX * viewport.zoom) + containerWidth / 2,
            y: -(canvasY * viewport.zoom) + containerHeight / 2,
        });
    }, [onViewportChange, scale, canvasBounds, viewport.zoom, containerWidth, containerHeight]);
    // ============================================================================
    // Render
    // ============================================================================
    return (_jsxs("div", { className: cn('fixed z-50', 'bg-background/95 backdrop-blur-sm', 'border rounded-lg shadow-lg', 'p-2', positionClasses[position], className), children: [_jsxs("svg", { ref: miniMapRef, width: width, height: height, className: cn('border border-border/50 rounded', onViewportChange && 'cursor-pointer'), onMouseDown: handleMouseDown, children: [_jsx("rect", { width: width, height: height, fill: "hsl(var(--muted) / 0.3)" }), pages.map(page => {
                        const pageX = (page.x - canvasBounds.minX) * scale;
                        const pageY = (page.y - canvasBounds.minY) * scale;
                        const pageWidth = page.width * scale;
                        const pageHeight = page.height * scale;
                        const isCurrentPage = page.id === currentPageId;
                        return (_jsxs("g", { children: [_jsx("rect", { x: pageX, y: pageY, width: pageWidth, height: pageHeight, fill: isCurrentPage ? 'hsl(var(--primary) / 0.3)' : 'hsl(var(--muted-foreground) / 0.2)', stroke: isCurrentPage ? 'hsl(var(--primary))' : 'hsl(var(--border))', strokeWidth: isCurrentPage ? 2 : 1, rx: 2 }), page.elements.map(element => {
                                    const elementX = (element.x - canvasBounds.minX) * scale;
                                    const elementY = (element.y - canvasBounds.minY) * scale;
                                    return (_jsx("circle", { cx: elementX + element.width * scale / 2, cy: elementY + element.height * scale / 2, r: Math.max(1, 2 * scale), fill: "hsl(var(--foreground) / 0.4)" }, element.id));
                                })] }, page.id));
                    }), _jsx("rect", { x: viewportRect.x, y: viewportRect.y, width: viewportRect.width, height: viewportRect.height, fill: "none", stroke: "hsl(var(--primary))", strokeWidth: 2, strokeDasharray: "4 2", rx: 2, className: cn('pointer-events-none', isDragging && 'opacity-50') })] }), showElementCount && (_jsxs("div", { className: "mt-1.5 text-xs text-muted-foreground text-center", children: [pages.reduce((sum, page) => sum + page.elements.length, 0), " elements"] }))] }));
}
MiniMap.displayName = 'MiniMap';
//# sourceMappingURL=mini-map.js.map