/**
 * Connection Layer Component
 *
 * SVG layer rendering all connections (wires) for a page.
 * Handles connection selection, hover states, and draft connections.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ConnectionWire } from '../../atoms/elements/connection-wire.js';
import { generateBezierPath, getPortById } from '../../../lib/hivelab-utils.js';
import { DATA_TYPE_COLORS } from '../../../types/hivelab.types.js';
export function ConnectionLayer({ elements, connections, selectedConnectionId, hoveredConnectionId, draftConnection, onConnectionClick, onConnectionHover, animated = false, className, }) {
    // Helper to get port position
    const getPortPosition = (elementId, portId) => {
        const element = elements.find(el => el.id === elementId);
        if (!element)
            return null;
        const port = getPortById(element, portId);
        if (!port)
            return null;
        const ports = port.side === 'input' ? element.inputs : element.outputs;
        const portIndex = ports.findIndex(p => p.id === portId);
        if (portIndex === -1)
            return null;
        const portSpacing = element.height / (ports.length + 1);
        const yOffset = portSpacing * (portIndex + 1);
        return {
            x: port.side === 'input' ? element.x : element.x + element.width,
            y: element.y + yOffset,
        };
    };
    // Render draft connection (while dragging)
    const renderDraftConnection = () => {
        if (!draftConnection)
            return null;
        const sourcePos = getPortPosition(draftConnection.sourceElementId, draftConnection.sourcePortId);
        if (!sourcePos)
            return null;
        const path = generateBezierPath(sourcePos, draftConnection.mousePosition);
        // Get color from source port type
        const sourceElement = elements.find(el => el.id === draftConnection.sourceElementId);
        const sourcePort = sourceElement ? getPortById(sourceElement, draftConnection.sourcePortId) : null;
        const primaryType = sourcePort
            ? (Array.isArray(sourcePort.type) ? sourcePort.type[0] : sourcePort.type)
            : 'any';
        const color = DATA_TYPE_COLORS[primaryType];
        return (_jsx(ConnectionWire, { path: path, color: color, strokeWidth: 2, className: "pointer-events-none opacity-60" }, "draft"));
    };
    return (_jsxs("svg", { className: `absolute inset-0 w-full h-full pointer-events-none ${className || ''}`, style: { zIndex: 0 }, children: [_jsx("g", { className: "connections pointer-events-auto", children: connections.map(connection => {
                    const sourcePos = getPortPosition(connection.sourceElementId, connection.sourcePortId);
                    const targetPos = getPortPosition(connection.targetElementId, connection.targetPortId);
                    if (!sourcePos || !targetPos)
                        return null;
                    // Generate path
                    const path = generateBezierPath(sourcePos, targetPos);
                    // Get color from source port
                    const sourceElement = elements.find(el => el.id === connection.sourceElementId);
                    const sourcePort = sourceElement
                        ? getPortById(sourceElement, connection.sourcePortId)
                        : null;
                    const primaryType = sourcePort
                        ? (Array.isArray(sourcePort.type) ? sourcePort.type[0] : sourcePort.type)
                        : 'any';
                    const color = connection.color || DATA_TYPE_COLORS[primaryType];
                    return (_jsx(ConnectionWire, { path: path, color: color, isSelected: selectedConnectionId === connection.id, isHovered: hoveredConnectionId === connection.id, animated: animated, onClick: (e) => {
                            e.stopPropagation();
                            onConnectionClick?.(connection.id, e);
                        }, onMouseEnter: () => onConnectionHover?.(connection.id), onMouseLeave: () => onConnectionHover?.(null) }, connection.id));
                }) }), _jsx("g", { className: "draft-connection", children: renderDraftConnection() })] }));
}
ConnectionLayer.displayName = 'ConnectionLayer';
//# sourceMappingURL=connection-layer.js.map