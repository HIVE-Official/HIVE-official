/**
 * Connection Layer Component
 *
 * SVG layer rendering all connections (wires) for a page.
 * Handles connection selection, hover states, and draft connections.
 */
import React from 'react';
import type { Connection, Element, Position } from '../../../types/hivelab.types';
export interface ConnectionLayerProps {
    /** All elements on this page */
    elements: Element[];
    /** All connections on this page */
    connections: Connection[];
    /** Selected connection ID */
    selectedConnectionId?: string | null;
    /** Hovered connection ID */
    hoveredConnectionId?: string | null;
    /** Draft connection (being created) */
    draftConnection?: {
        sourceElementId: string;
        sourcePortId: string;
        mousePosition: Position;
        sourceType?: any;
    } | null;
    /** Connection click handler */
    onConnectionClick?: (connectionId: string, e: React.MouseEvent) => void;
    /** Connection hover handlers */
    onConnectionHover?: (connectionId: string | null) => void;
    /** Show animated data flow on all connections */
    animated?: boolean;
    /** Additional class names */
    className?: string;
}
export declare function ConnectionLayer({ elements, connections, selectedConnectionId, hoveredConnectionId, draftConnection, onConnectionClick, onConnectionHover, animated, className, }: ConnectionLayerProps): import("react/jsx-runtime").JSX.Element;
export declare namespace ConnectionLayer {
    var displayName: string;
}
//# sourceMappingURL=connection-layer.d.ts.map