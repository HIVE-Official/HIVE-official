/**
 * HiveLab Builder Context
 *
 * React Context + useReducer for managing complete builder state.
 * Handles elements, connections, viewport, selection, and history.
 */
import React, { type ReactNode } from 'react';
import type { HiveLabState, HiveLabAction, Tool, Page, Element, Connection, Viewport } from '@/types/hivelab.types';
interface HiveLabContextValue {
    state: HiveLabState;
    dispatch: React.Dispatch<HiveLabAction>;
}
interface HiveLabProviderProps {
    children: ReactNode;
    initialTool?: Tool;
}
export declare function HiveLabProvider({ children, initialTool }: HiveLabProviderProps): import("react/jsx-runtime").JSX.Element;
export declare function useHiveLab(): HiveLabContextValue;
export declare function useHiveLabActions(): {
    loadTool: (tool: Tool) => void;
    updateTool: (updates: Partial<Tool>) => void;
    addPage: (page: Page) => void;
    deletePage: (pageId: string) => void;
    updatePage: (pageId: string, updates: Partial<Page>) => void;
    setCurrentPage: (pageId: string) => void;
    addElement: (element: Element, pageId: string) => void;
    removeElement: (elementId: string, pageId: string) => void;
    updateElement: (elementId: string, pageId: string, updates: Partial<Element>) => void;
    moveElement: (elementId: string, pageId: string, x: number, y: number) => void;
    duplicateElement: (elementId: string, pageId: string) => void;
    createConnection: (connection: Connection, pageId: string) => void;
    deleteConnection: (connectionId: string, pageId: string) => void;
    selectElements: (elementIds: string[]) => void;
    selectConnection: (connectionId: string | null) => void;
    clearSelection: () => void;
    updateViewport: (viewport: Partial<Viewport>) => void;
    zoomToFit: () => void;
    zoomToPage: (pageId: string) => void;
    startConnection: (sourceElementId: string, sourcePortId: string, sourceType: any) => void;
    updateConnectionMouse: (position: {
        x: number;
        y: number;
    }) => void;
    endConnection: () => void;
    undo: () => void;
    redo: () => void;
    togglePanel: (panel: keyof HiveLabState["panels"]) => void;
    setDraggingElement: (isDragging: boolean) => void;
    setHoveredPort: (portId: string | null) => void;
    toggleGrid: () => void;
    toggleSnapToGrid: () => void;
};
export {};
//# sourceMappingURL=hivelab-context.d.ts.map