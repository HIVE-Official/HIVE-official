/**
 * Port Component
 *
 * Connection point on an element (input or output).
 * Handles hover states, connection creation, and type compatibility indication.
 */
import React from 'react';
import type { Port as PortType } from '../../../types/hivelab.types';
export interface PortProps {
    /** Port data */
    port: PortType;
    /** Is this port currently being hovered */
    isHovered?: boolean;
    /** Is this port compatible with current connection draft */
    isCompatible?: boolean;
    /** Is this port part of an active connection */
    isConnected?: boolean;
    /** Is a connection currently being created */
    isConnecting?: boolean;
    /** Mouse down handler (start connection) */
    onMouseDown?: (e: React.MouseEvent) => void;
    /** Click handler (complete connection) */
    onClick?: (e: React.MouseEvent) => void;
    /** Mouse enter handler */
    onMouseEnter?: () => void;
    /** Mouse leave handler */
    onMouseLeave?: () => void;
    /** Additional class names */
    className?: string;
    /** Show label next to port */
    showLabel?: boolean;
}
export declare function Port({ port, isHovered, isCompatible, isConnected, isConnecting, onMouseDown, onClick, onMouseEnter, onMouseLeave, className, showLabel, }: PortProps): import("react/jsx-runtime").JSX.Element;
export declare namespace Port {
    var displayName: string;
}
//# sourceMappingURL=port.d.ts.map