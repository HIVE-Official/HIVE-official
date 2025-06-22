"use client";

import * as React from "react";
import type { TileLayout } from "./types";
import { generateDefaultLayout } from "./tile-registry";

interface GridState {
  layout: TileLayout[];
  history: TileLayout[][];
  historyIndex: number;
}

interface GridActions {
  updateTileLayout: (tileId: string, updates: Partial<TileLayout>) => void;
  toggleTileVisibility: (tileId: string) => void;
  resetToDefault: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  saveLayout: () => void;
}

export function useGridState(
  user: { isBuilder: boolean },
  onLayoutChange?: (layout: TileLayout[]) => void
): [TileLayout[], GridActions] {
  const [state, setState] = React.useState<GridState>(() => {
    // Try to load from localStorage
    const saved = localStorage.getItem("hive-profile-layout");
    const defaultLayout = generateDefaultLayout(user);

    if (saved) {
      try {
        const parsedLayout = JSON.parse(saved) as TileLayout[];
        return {
          layout: parsedLayout,
          history: [parsedLayout],
          historyIndex: 0,
        };
      } catch {
        // Fall back to default if parsing fails
      }
    }

    return {
      layout: defaultLayout,
      history: [defaultLayout],
      historyIndex: 0,
    };
  });

  const saveToHistory = React.useCallback((newLayout: TileLayout[]) => {
    setState((prev) => {
      const newHistory = prev.history.slice(0, prev.historyIndex + 1);
      newHistory.push(newLayout);

      // Keep only last 10 states
      if (newHistory.length > 10) {
        newHistory.shift();
      }

      return {
        layout: newLayout,
        history: newHistory,
        historyIndex: newHistory.length - 1,
      };
    });
  }, []);

  const updateTileLayout = React.useCallback(
    (tileId: string, updates: Partial<TileLayout>) => {
      const newLayout = state.layout.map((tile) =>
        tile.id === tileId ? { ...tile, ...updates } : tile
      );
      saveToHistory(newLayout);
      onLayoutChange?.(newLayout);
    },
    [state.layout, saveToHistory, onLayoutChange]
  );

  const toggleTileVisibility = React.useCallback(
    (tileId: string) => {
      const newLayout = state.layout.map((tile) =>
        tile.id === tileId ? { ...tile, isVisible: !tile.isVisible } : tile
      );
      saveToHistory(newLayout);
      onLayoutChange?.(newLayout);
    },
    [state.layout, saveToHistory, onLayoutChange]
  );

  const resetToDefault = React.useCallback(() => {
    const defaultLayout = generateDefaultLayout(user);
    saveToHistory(defaultLayout);
    onLayoutChange?.(defaultLayout);
  }, [user, saveToHistory, onLayoutChange]);

  const undo = React.useCallback(() => {
    if (state.historyIndex > 0) {
      setState((prev) => ({
        ...prev,
        layout: prev.history[prev.historyIndex - 1],
        historyIndex: prev.historyIndex - 1,
      }));
      onLayoutChange?.(state.history[state.historyIndex - 1]);
    }
  }, [state.history, state.historyIndex, onLayoutChange]);

  const redo = React.useCallback(() => {
    if (state.historyIndex < state.history.length - 1) {
      setState((prev) => ({
        ...prev,
        layout: prev.history[prev.historyIndex + 1],
        historyIndex: prev.historyIndex + 1,
      }));
      onLayoutChange?.(state.history[state.historyIndex + 1]);
    }
  }, [state.history, state.historyIndex, onLayoutChange]);

  const saveLayout = React.useCallback(() => {
    try {
      localStorage.setItem("hive-profile-layout", JSON.stringify(state.layout));
    } catch {
      // Silently fail if localStorage is not available
    }
  }, [state.layout]);

  // Auto-save to localStorage on layout changes
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      saveLayout();
    }, 1000); // Debounced save

    return () => clearTimeout(timeoutId);
  }, [state.layout, saveLayout]);

  const actions: GridActions = React.useMemo(
    () => ({
      updateTileLayout,
      toggleTileVisibility,
      resetToDefault,
      undo,
      redo,
      canUndo: state.historyIndex > 0,
      canRedo: state.historyIndex < state.history.length - 1,
      saveLayout,
    }),
    [
      updateTileLayout,
      toggleTileVisibility,
      resetToDefault,
      undo,
      redo,
      state.historyIndex,
      state.history.length,
      saveLayout,
    ]
  );

  return [state.layout, actions];
}
