/**
 * Connection Creation Hook
 *
 * Handles wire dragging logic for creating connections between element ports.
 */

'use client';

import { useCallback, useEffect } from 'react';
import { useHiveLab, useHiveLabActions } from '@/contexts/hivelab-context';
import {
  isCompatibleTypes,
  generateConnectionId,
  generateDraftConnectionPath,
  generateConnectionPath,
  getPortById,
  type Position,
  type DataType,
  type Connection,
  type Element,
  type Port,
} from '@/lib/hivelab-utils';

interface UseConnectionCreationOptions {
  containerRef: React.RefObject<HTMLElement>;
  onConnectionCreated?: (connection: Connection) => void;
  onConnectionFailed?: (reason: string) => void;
}

export function useConnectionCreation({
  containerRef,
  onConnectionCreated,
  onConnectionFailed,
}: UseConnectionCreationOptions) {
  const { state } = useHiveLab();
  const {
    startConnection,
    updateConnectionMouse,
    endConnection,
    createConnection,
  } = useHiveLabActions();

  // ============================================================================
  // Current Page Data
  // ============================================================================

  const currentPage = state.tool.pages.find(p => p.id === state.currentPage);
  const elements = currentPage?.elements || [];
  const connections = currentPage?.connections || [];

  // ============================================================================
  // Connection Validation
  // ============================================================================

  const canConnect = useCallback(
    (sourceElement: Element, sourcePort: Port, targetElement: Element, targetPort: Port): boolean => {
      // Can't connect to self
      if (sourceElement.id === targetElement.id) {
        return false;
      }

      // Source must be output, target must be input
      if (sourcePort.side !== 'output' || targetPort.side !== 'input') {
        return false;
      }

      // Check type compatibility
      if (!isCompatibleTypes(sourcePort.type, targetPort.type)) {
        return false;
      }

      // Check if connection already exists
      const connectionExists = connections.some(
        conn =>
          conn.sourceElementId === sourceElement.id &&
          conn.sourcePortId === sourcePort.id &&
          conn.targetElementId === targetElement.id &&
          conn.targetPortId === targetPort.id
      );

      if (connectionExists) {
        return false;
      }

      // Check if target port already has a connection (inputs can only have one)
      const targetHasConnection = connections.some(
        conn =>
          conn.targetElementId === targetElement.id &&
          conn.targetPortId === targetPort.id
      );

      if (targetHasConnection) {
        return false;
      }

      return true;
    },
    [connections]
  );

  // ============================================================================
  // Find Port at Position
  // ============================================================================

  const findPortAtPosition = useCallback(
    (pos: Position): { element: Element; port: Port } | null => {
      for (const element of elements) {
        // Check all ports (inputs and outputs)
        for (const port of [...element.inputs, ...element.outputs]) {
          const portPos = getPortPosition(element, port);

          // Port hit detection radius
          const hitRadius = 12;

          const distance = Math.sqrt(
            Math.pow(pos.x - portPos.x, 2) + Math.pow(pos.y - portPos.y, 2)
          );

          if (distance <= hitRadius) {
            return { element, port };
          }
        }
      }

      return null;
    },
    [elements]
  );

  // ============================================================================
  // Start Connection
  // ============================================================================

  const handlePortMouseDown = useCallback(
    (element: Element, port: Port, e: React.MouseEvent) => {
      e.stopPropagation();

      // Only start connections from output ports
      if (port.side !== 'output') {
        return;
      }

      startConnection(element.id, port.id, port.type);
    },
    [startConnection]
  );

  // ============================================================================
  // Update Draft Connection
  // ============================================================================

  useEffect(() => {
    if (!state.connectionDraft.isConnecting || !containerRef.current) return;

    const container = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Convert to canvas coordinates
      const canvasPos = screenToCanvas({ x, y }, state.viewport);

      updateConnectionMouse(canvasPos);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [
    state.connectionDraft.isConnecting,
    state.viewport,
    containerRef,
    updateConnectionMouse,
  ]);

  // ============================================================================
  // Complete Connection
  // ============================================================================

  const completeConnection = useCallback(
    (targetElement: Element, targetPort: Port) => {
      if (!state.connectionDraft.isConnecting) return;
      if (!state.connectionDraft.sourceElementId || !state.connectionDraft.sourcePortId) return;

      const sourceElement = elements.find(el => el.id === state.connectionDraft.sourceElementId);
      if (!sourceElement) {
        endConnection();
        return;
      }

      const sourcePort = getPortById(sourceElement, state.connectionDraft.sourcePortId);
      if (!sourcePort) {
        endConnection();
        return;
      }

      // Validate connection
      if (!canConnect(sourceElement, sourcePort, targetElement, targetPort)) {
        onConnectionFailed?.('Invalid connection');
        endConnection();
        return;
      }

      // Create connection
      const path = generateConnectionPath(sourceElement, sourcePort, targetElement, targetPort);
      const primaryType = getPrimaryType(sourcePort.type);
      const color = DATA_TYPE_COLORS[primaryType];

      const newConnection: Connection = {
        id: generateConnectionId(),
        sourceElementId: sourceElement.id,
        sourcePortId: sourcePort.id,
        targetElementId: targetElement.id,
        targetPortId: targetPort.id,
        path,
        color,
        pageId: state.currentPage,
      };

      createConnection(newConnection, state.currentPage);
      onConnectionCreated?.(newConnection);
      endConnection();
    },
    [
      state.connectionDraft,
      state.currentPage,
      elements,
      canConnect,
      createConnection,
      endConnection,
      onConnectionCreated,
      onConnectionFailed,
    ]
  );

  // ============================================================================
  // Handle Port Click (End Connection)
  // ============================================================================

  const handlePortClick = useCallback(
    (element: Element, port: Port) => {
      if (state.connectionDraft.isConnecting && port.side === 'input') {
        completeConnection(element, port);
      }
    },
    [state.connectionDraft.isConnecting, completeConnection]
  );

  // ============================================================================
  // Cancel Connection
  // ============================================================================

  useEffect(() => {
    if (!state.connectionDraft.isConnecting) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        endConnection();
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Cancel if clicking on empty canvas
      if (e.target === containerRef.current) {
        endConnection();
      }
    };

    window.addEventListener('keydown', handleEscape);
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('keydown', handleEscape);
      window.removeEventListener('click', handleClick);
    };
  }, [state.connectionDraft.isConnecting, containerRef, endConnection]);

  // ============================================================================
  // Get Draft Connection Path
  // ============================================================================

  const getDraftConnectionPath = useCallback((): string | null => {
    if (!state.connectionDraft.isConnecting) return null;
    if (!state.connectionDraft.sourceElementId || !state.connectionDraft.sourcePortId) return null;
    if (!state.connectionDraft.mousePosition) return null;

    const sourceElement = elements.find(el => el.id === state.connectionDraft.sourceElementId);
    if (!sourceElement) return null;

    const sourcePort = getPortById(sourceElement, state.connectionDraft.sourcePortId);
    if (!sourcePort) return null;

    return generateDraftConnectionPath(
      sourceElement,
      sourcePort,
      state.connectionDraft.mousePosition
    );
  }, [state.connectionDraft, elements]);

  // ============================================================================
  // Get Connection Color
  // ============================================================================

  const getConnectionColor = useCallback((connection: Connection): string => {
    return connection.color || 'hsl(var(--muted))';
  }, []);

  // ============================================================================
  // Return API
  // ============================================================================

  return {
    isConnecting: state.connectionDraft.isConnecting,
    draftConnectionPath: getDraftConnectionPath(),
    draftConnectionColor: state.connectionDraft.sourceType
      ? DATA_TYPE_COLORS[getPrimaryType(state.connectionDraft.sourceType)]
      : undefined,
    handlePortMouseDown,
    handlePortClick,
    findPortAtPosition,
    canConnect,
    getConnectionColor,
  };
}

// Helper function (would be imported from utils in real implementation)
function getPortPosition(element: Element, port: Port): Position {
  const ports = port.side === 'input' ? element.inputs : element.outputs;
  const portIndex = ports.findIndex(p => p.id === port.id);

  if (portIndex === -1) {
    return { x: element.x, y: element.y + element.height / 2 };
  }

  const portSpacing = element.height / (ports.length + 1);
  const yOffset = portSpacing * (portIndex + 1);

  return {
    x: port.side === 'input' ? element.x : element.x + element.width,
    y: element.y + yOffset,
  };
}

function screenToCanvas(screenPos: Position, viewport: any): Position {
  return {
    x: (screenPos.x - viewport.x) / viewport.zoom,
    y: (screenPos.y - viewport.y) / viewport.zoom,
  };
}

function getPrimaryType(type: DataType | DataType[]): DataType {
  return Array.isArray(type) ? type[0] : type;
}
