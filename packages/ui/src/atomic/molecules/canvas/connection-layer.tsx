/**
 * Connection Layer Component
 *
 * SVG layer rendering all connections (wires) for a page.
 * Handles connection selection, hover states, and draft connections.
 */

'use client';

import React from 'react';
import { ConnectionWire } from '../../atoms/elements/connection-wire';
import type { Connection, Element, Port, Position } from '../../../types/hivelab.types';
import { generateConnectionPath, generateBezierPath, getPortById } from '../../../lib/hivelab-utils';
import { DATA_TYPE_COLORS } from '../../../types/hivelab.types';

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

export function ConnectionLayer({
  elements,
  connections,
  selectedConnectionId,
  hoveredConnectionId,
  draftConnection,
  onConnectionClick,
  onConnectionHover,
  animated = false,
  className,
}: ConnectionLayerProps) {
  // Helper to get port position
  const getPortPosition = (elementId: string, portId: string): Position | null => {
    const element = elements.find(el => el.id === elementId);
    if (!element) return null;

    const port = getPortById(element, portId);
    if (!port) return null;

    const ports = port.side === 'input' ? element.inputs : element.outputs;
    const portIndex = ports.findIndex(p => p.id === portId);
    if (portIndex === -1) return null;

    const portSpacing = element.height / (ports.length + 1);
    const yOffset = portSpacing * (portIndex + 1);

    return {
      x: port.side === 'input' ? element.x : element.x + element.width,
      y: element.y + yOffset,
    };
  };

  // Render draft connection (while dragging)
  const renderDraftConnection = () => {
    if (!draftConnection) return null;

    const sourcePos = getPortPosition(
      draftConnection.sourceElementId,
      draftConnection.sourcePortId
    );

    if (!sourcePos) return null;

    const path = generateBezierPath(sourcePos, draftConnection.mousePosition);

    // Get color from source port type
    const sourceElement = elements.find(el => el.id === draftConnection.sourceElementId);
    const sourcePort = sourceElement ? getPortById(sourceElement, draftConnection.sourcePortId) : null;
    const primaryType = sourcePort
      ? (Array.isArray(sourcePort.type) ? sourcePort.type[0] : sourcePort.type)
      : 'any';
    const color = DATA_TYPE_COLORS[primaryType];

    return (
      <ConnectionWire
        key="draft"
        path={path}
        color={color}
        strokeWidth={2}
        className="pointer-events-none opacity-60"
      />
    );
  };

  return (
    <svg
      className={`absolute inset-0 w-full h-full pointer-events-none ${className || ''}`}
      style={{ zIndex: 0 }}
    >
      {/* Render all connections */}
      <g className="connections pointer-events-auto">
        {connections.map(connection => {
          const sourcePos = getPortPosition(connection.sourceElementId, connection.sourcePortId);
          const targetPos = getPortPosition(connection.targetElementId, connection.targetPortId);

          if (!sourcePos || !targetPos) return null;

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

          return (
            <ConnectionWire
              key={connection.id}
              path={path}
              color={color}
              isSelected={selectedConnectionId === connection.id}
              isHovered={hoveredConnectionId === connection.id}
              animated={animated}
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation();
                onConnectionClick?.(connection.id, e);
              }}
              onMouseEnter={() => onConnectionHover?.(connection.id)}
              onMouseLeave={() => onConnectionHover?.(null)}
            />
          );
        })}
      </g>

      {/* Render draft connection (on top) */}
      <g className="draft-connection">
        {renderDraftConnection()}
      </g>
    </svg>
  );
}

ConnectionLayer.displayName = 'ConnectionLayer';
