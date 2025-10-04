/**
 * Canvas Viewport Hook
 *
 * Handles pan, zoom, and viewport transformations for the HiveLab canvas.
 */

'use client';

import { useCallback, useEffect, useRef } from 'react';
import { useHiveLab, useHiveLabActions } from '../contexts/hivelab-context';
import {
  clampZoom,
  calculateZoomDelta,
  screenToCanvas,
  canvasToScreen,
  type Position,
} from '../lib/hivelab-utils';

interface UseCanvasViewportOptions {
  containerRef: React.RefObject<HTMLElement>;
  minZoom?: number;
  maxZoom?: number;
  zoomSpeed?: number;
}

export function useCanvasViewport({
  containerRef,
  minZoom = 0.1,
  maxZoom = 4,
  zoomSpeed = 0.001,
}: UseCanvasViewportOptions) {
  const { state } = useHiveLab();
  const { updateViewport } = useHiveLabActions();

  const isPanning = useRef(false);
  const lastMousePos = useRef<Position>({ x: 0, y: 0 });

  // ============================================================================
  // Pan Handlers
  // ============================================================================

  const startPan = useCallback((clientX: number, clientY: number) => {
    isPanning.current = true;
    lastMousePos.current = { x: clientX, y: clientY };
  }, []);

  const updatePan = useCallback((clientX: number, clientY: number) => {
    if (!isPanning.current) return;

    const dx = clientX - lastMousePos.current.x;
    const dy = clientY - lastMousePos.current.y;

    updateViewport({
      x: state.viewport.x + dx,
      y: state.viewport.y + dy,
    });

    lastMousePos.current = { x: clientX, y: clientY };
  }, [state.viewport, updateViewport]);

  const endPan = useCallback(() => {
    isPanning.current = false;
  }, []);

  // ============================================================================
  // Zoom Handlers
  // ============================================================================

  const zoomAt = useCallback(
    (clientX: number, clientY: number, deltaZoom: number) => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();

      // Get mouse position relative to container
      const mouseX = clientX - rect.left;
      const mouseY = clientY - rect.top;

      // Calculate new zoom
      const currentZoom = state.viewport.zoom;
      const newZoom = clampZoom(currentZoom + deltaZoom);

      if (newZoom === currentZoom) return;

      // Calculate zoom center point in canvas coordinates
      const canvasPointBefore = screenToCanvas(
        { x: mouseX, y: mouseY },
        state.viewport
      );

      // Apply new zoom
      const newViewport = { ...state.viewport, zoom: newZoom };

      // Calculate where the point is now with new zoom
      const canvasPointAfter = screenToCanvas(
        { x: mouseX, y: mouseY },
        newViewport
      );

      // Adjust viewport position to keep point under mouse
      const dx = (canvasPointAfter.x - canvasPointBefore.x) * newZoom;
      const dy = (canvasPointAfter.y - canvasPointBefore.y) * newZoom;

      updateViewport({
        x: newViewport.x + dx,
        y: newViewport.y + dy,
        zoom: newZoom,
      });
    },
    [containerRef, state.viewport, updateViewport]
  );

  const zoomIn = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    zoomAt(rect.left + centerX, rect.top + centerY, 0.1);
  }, [containerRef, zoomAt]);

  const zoomOut = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    zoomAt(rect.left + centerX, rect.top + centerY, -0.1);
  }, [containerRef, zoomAt]);

  const resetZoom = useCallback(() => {
    updateViewport({ zoom: 1 });
  }, [updateViewport]);

  // ============================================================================
  // Event Listeners
  // ============================================================================

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Mouse wheel zoom
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      const delta = calculateZoomDelta(e.deltaY);
      zoomAt(e.clientX, e.clientY, -delta * zoomSpeed * 100);
    };

    // Middle mouse button or space + drag for panning
    const handleMouseDown = (e: MouseEvent) => {
      // Middle mouse button
      if (e.button === 1) {
        e.preventDefault();
        startPan(e.clientX, e.clientY);
      }
      // Space + left mouse (handled by canvas mode in parent)
      else if (e.button === 0 && state.canvasMode === 'pan') {
        e.preventDefault();
        startPan(e.clientX, e.clientY);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isPanning.current) {
        updatePan(e.clientX, e.clientY);
      }
    };

    const handleMouseUp = () => {
      endPan();
    };

    // Touch events for mobile
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 2) {
        e.preventDefault();
        // Start pinch zoom (would need additional implementation)
      } else if (e.touches.length === 1) {
        const touch = e.touches[0];
        startPan(touch.clientX, touch.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        updatePan(touch.clientX, touch.clientY);
      }
    };

    const handleTouchEnd = () => {
      endPan();
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [
    containerRef,
    state.canvasMode,
    zoomAt,
    zoomSpeed,
    startPan,
    updatePan,
    endPan,
  ]);

  // ============================================================================
  // Keyboard Shortcuts
  // ============================================================================

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Zoom shortcuts
      if ((e.metaKey || e.ctrlKey) && e.key === '0') {
        e.preventDefault();
        resetZoom();
      } else if ((e.metaKey || e.ctrlKey) && e.key === '=') {
        e.preventDefault();
        zoomIn();
      } else if ((e.metaKey || e.ctrlKey) && e.key === '-') {
        e.preventDefault();
        zoomOut();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomIn, zoomOut, resetZoom]);

  // ============================================================================
  // Return API
  // ============================================================================

  return {
    viewport: state.viewport,
    zoomIn,
    zoomOut,
    resetZoom,
    zoomAt,
    screenToCanvas: useCallback(
      (pos: Position) => screenToCanvas(pos, state.viewport),
      [state.viewport]
    ),
    canvasToScreen: useCallback(
      (pos: Position) => canvasToScreen(pos, state.viewport),
      [state.viewport]
    ),
  };
}
