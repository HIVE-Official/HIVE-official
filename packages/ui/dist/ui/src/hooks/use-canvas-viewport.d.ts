/**
 * Canvas Viewport Hook
 *
 * Handles pan, zoom, and viewport transformations for the HiveLab canvas.
 */
import { type Position } from '@/lib/hivelab-utils';
interface UseCanvasViewportOptions {
    containerRef: React.RefObject<HTMLElement>;
    minZoom?: number;
    maxZoom?: number;
    zoomSpeed?: number;
}
export declare function useCanvasViewport({ containerRef, minZoom, maxZoom, zoomSpeed, }: UseCanvasViewportOptions): {
    viewport: import("../types/hivelab.types").Viewport;
    zoomIn: () => void;
    zoomOut: () => void;
    resetZoom: () => void;
    zoomAt: (clientX: number, clientY: number, deltaZoom: number) => void;
    screenToCanvas: (pos: Position) => Position;
    canvasToScreen: (pos: Position) => Position;
};
export {};
//# sourceMappingURL=use-canvas-viewport.d.ts.map