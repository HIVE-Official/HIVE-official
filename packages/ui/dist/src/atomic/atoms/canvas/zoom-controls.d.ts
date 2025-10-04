/**
 * Zoom Controls Component
 *
 * Floating zoom controls for HiveLab canvas with zoom in, out, reset, and fit buttons.
 */
export interface ZoomControlsProps {
    /** Current zoom level (0.1 - 4.0) */
    zoom: number;
    /** Minimum zoom level */
    minZoom?: number;
    /** Maximum zoom level */
    maxZoom?: number;
    /** Zoom in callback */
    onZoomIn: () => void;
    /** Zoom out callback */
    onZoomOut: () => void;
    /** Reset zoom to 1x */
    onZoomReset: () => void;
    /** Zoom to fit all content */
    onZoomToFit?: () => void;
    /** Position on screen */
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    /** Additional class names */
    className?: string;
    /** Show zoom percentage */
    showPercentage?: boolean;
}
export declare function ZoomControls({ zoom, minZoom, maxZoom, onZoomIn, onZoomOut, onZoomReset, onZoomToFit, position, className, showPercentage, }: ZoomControlsProps): import("react/jsx-runtime").JSX.Element;
export declare namespace ZoomControls {
    var displayName: string;
}
//# sourceMappingURL=zoom-controls.d.ts.map