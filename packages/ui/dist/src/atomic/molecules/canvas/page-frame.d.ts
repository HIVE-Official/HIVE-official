/**
 * Page Frame Component
 *
 * Visual frame showing page boundaries on the infinite canvas.
 * Displays page name, type, and dimensions.
 */
import React from 'react';
import type { Page } from '@/types/hivelab.types';
export interface PageFrameProps {
    /** Page data */
    page: Page;
    /** Is this the current page */
    isCurrent?: boolean;
    /** Is this page being hovered */
    isHovered?: boolean;
    /** Zoom level (affects label visibility) */
    zoom?: number;
    /** Click handler */
    onClick?: (e: React.MouseEvent) => void;
    /** Double click handler (rename) */
    onDoubleClick?: (e: React.MouseEvent) => void;
    /** Additional class names */
    className?: string;
}
export declare function PageFrame({ page, isCurrent, isHovered, zoom, onClick, onDoubleClick, className, }: PageFrameProps): import("react/jsx-runtime").JSX.Element;
export declare namespace PageFrame {
    var displayName: string;
}
//# sourceMappingURL=page-frame.d.ts.map