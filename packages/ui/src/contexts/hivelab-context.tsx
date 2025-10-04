/**
 * HiveLab Builder Context
 *
 * React Context + useReducer for managing complete builder state.
 * Handles elements, connections, viewport, selection, and history.
 */

'use client';

import React, { createContext, useContext, useReducer, useCallback, type ReactNode } from 'react';
import type {
  HiveLabState,
  HiveLabAction,
  Tool,
  Page,
  Element,
  Connection,
  Viewport,
  CanvasMode,
  PanelState,
} from '@/types/hivelab.types';
import { generatePageId, generateElementId, generateConnectionId } from '@/lib/hivelab-utils';

// ============================================================================
// Initial State Factory
// ============================================================================

function createDefaultTool(): Tool {
  const defaultPageId = generatePageId();

  return {
    id: generateElementId('tool'),
    name: 'Untitled Tool',
    description: '',
    icon: '🛠️',
    version: '1.0.0',
    createdBy: '',
    spaceId: undefined,
    pages: [
      {
        id: defaultPageId,
        name: 'Page 1',
        description: 'Main page',
        x: 0,
        y: 0,
        width: 1200,
        height: 800,
        type: 'default',
        elements: [],
        connections: [],
      },
    ],
    startPage: defaultPageId,
    globalVariables: {},
    globalStyles: {},
    status: 'draft',
    visibility: 'private',
    deployedTo: [],
    uses: 0,
    forks: 0,
    rating: 0,
    permissions: {
      canFork: true,
      canEdit: [],
      requiresApproval: false,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

function createInitialState(): HiveLabState {
  const tool = createDefaultTool();

  return {
    tool,
    currentPage: tool.startPage,
    selectedElements: [],
    selectedConnection: null,
    viewport: {
      x: 0,
      y: 0,
      zoom: 1,
    },
    canvasMode: 'select',
    connectionDraft: {
      isConnecting: false,
    },
    selectionBox: {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      active: false,
    },
    panels: {
      library: {
        isOpen: true,
        width: 320,
        isDocked: true,
      },
      properties: {
        isOpen: true,
        width: 320,
        isDocked: true,
      },
      layers: {
        isOpen: false,
        width: 280,
        isDocked: true,
      },
      versions: {
        isOpen: false,
        width: 320,
        isDocked: true,
      },
    },
    history: {
      past: [],
      future: [],
    },
    isDraggingElement: false,
    hoveredPort: null,
    showGrid: true,
    snapToGrid: true,
  };
}

// ============================================================================
// Reducer
// ============================================================================

function hiveLabReducer(state: HiveLabState, action: HiveLabAction): HiveLabState {
  switch (action.type) {
    // Tool actions
    case 'LOAD_TOOL':
      return {
        ...state,
        tool: action.tool,
        currentPage: action.tool.startPage,
        selectedElements: [],
        selectedConnection: null,
        history: { past: [], future: [] },
      };

    case 'UPDATE_TOOL':
      return {
        ...state,
        tool: {
          ...state.tool,
          ...action.updates,
          updatedAt: new Date(),
        },
      };

    // Page actions
    case 'ADD_PAGE':
      return {
        ...state,
        tool: {
          ...state.tool,
          pages: [...state.tool.pages, action.page],
          updatedAt: new Date(),
        },
      };

    case 'DELETE_PAGE': {
      const pages = state.tool.pages.filter(p => p.id !== action.pageId);
      const newCurrentPage = action.pageId === state.currentPage
        ? pages[0]?.id || ''
        : state.currentPage;

      return {
        ...state,
        tool: {
          ...state.tool,
          pages,
          startPage: state.tool.startPage === action.pageId ? pages[0]?.id : state.tool.startPage,
          updatedAt: new Date(),
        },
        currentPage: newCurrentPage,
      };
    }

    case 'UPDATE_PAGE':
      return {
        ...state,
        tool: {
          ...state.tool,
          pages: state.tool.pages.map(page =>
            page.id === action.pageId ? { ...page, ...action.updates } : page
          ),
          updatedAt: new Date(),
        },
      };

    case 'SET_CURRENT_PAGE':
      return {
        ...state,
        currentPage: action.pageId,
        selectedElements: [],
        selectedConnection: null,
      };

    case 'MOVE_PAGE':
      return {
        ...state,
        tool: {
          ...state.tool,
          pages: state.tool.pages.map(page =>
            page.id === action.pageId
              ? { ...page, x: action.x, y: action.y }
              : page
          ),
          updatedAt: new Date(),
        },
      };

    // Element actions
    case 'ADD_ELEMENT':
      return {
        ...state,
        tool: {
          ...state.tool,
          pages: state.tool.pages.map(page =>
            page.id === action.pageId
              ? { ...page, elements: [...page.elements, action.element] }
              : page
          ),
          updatedAt: new Date(),
        },
      };

    case 'REMOVE_ELEMENT': {
      return {
        ...state,
        tool: {
          ...state.tool,
          pages: state.tool.pages.map(page =>
            page.id === action.pageId
              ? {
                  ...page,
                  elements: page.elements.filter(el => el.id !== action.elementId),
                  connections: page.connections.filter(
                    conn =>
                      conn.sourceElementId !== action.elementId &&
                      conn.targetElementId !== action.elementId
                  ),
                }
              : page
          ),
          updatedAt: new Date(),
        },
        selectedElements: state.selectedElements.filter(id => id !== action.elementId),
      };
    }

    case 'UPDATE_ELEMENT':
      return {
        ...state,
        tool: {
          ...state.tool,
          pages: state.tool.pages.map(page =>
            page.id === action.pageId
              ? {
                  ...page,
                  elements: page.elements.map(el =>
                    el.id === action.elementId ? { ...el, ...action.updates } : el
                  ),
                }
              : page
          ),
          updatedAt: new Date(),
        },
      };

    case 'MOVE_ELEMENT':
      return {
        ...state,
        tool: {
          ...state.tool,
          pages: state.tool.pages.map(page =>
            page.id === action.pageId
              ? {
                  ...page,
                  elements: page.elements.map(el =>
                    el.id === action.elementId
                      ? { ...el, x: action.x, y: action.y }
                      : el
                  ),
                }
              : page
          ),
          updatedAt: new Date(),
        },
      };

    case 'DUPLICATE_ELEMENT': {
      const page = state.tool.pages.find(p => p.id === action.pageId);
      const element = page?.elements.find(el => el.id === action.elementId);

      if (!page || !element) return state;

      const newElement: Element = {
        ...element,
        id: generateElementId(element.type),
        x: element.x + 20,
        y: element.y + 20,
        inputs: element.inputs.map(port => ({
          ...port,
          id: `${generateElementId(element.type)}-${port.name}`,
        })),
        outputs: element.outputs.map(port => ({
          ...port,
          id: `${generateElementId(element.type)}-${port.name}`,
        })),
      };

      return {
        ...state,
        tool: {
          ...state.tool,
          pages: state.tool.pages.map(p =>
            p.id === action.pageId
              ? { ...p, elements: [...p.elements, newElement] }
              : p
          ),
          updatedAt: new Date(),
        },
      };
    }

    // Connection actions
    case 'CREATE_CONNECTION':
      return {
        ...state,
        tool: {
          ...state.tool,
          pages: state.tool.pages.map(page =>
            page.id === action.pageId
              ? { ...page, connections: [...page.connections, action.connection] }
              : page
          ),
          updatedAt: new Date(),
        },
      };

    case 'DELETE_CONNECTION':
      return {
        ...state,
        tool: {
          ...state.tool,
          pages: state.tool.pages.map(page =>
            page.id === action.pageId
              ? {
                  ...page,
                  connections: page.connections.filter(c => c.id !== action.connectionId),
                }
              : page
          ),
          updatedAt: new Date(),
        },
        selectedConnection: state.selectedConnection === action.connectionId
          ? null
          : state.selectedConnection,
      };

    case 'UPDATE_CONNECTION':
      return {
        ...state,
        tool: {
          ...state.tool,
          pages: state.tool.pages.map(page =>
            page.id === action.pageId
              ? {
                  ...page,
                  connections: page.connections.map(conn =>
                    conn.id === action.connectionId
                      ? { ...conn, ...action.updates }
                      : conn
                  ),
                }
              : page
          ),
          updatedAt: new Date(),
        },
      };

    // Selection actions
    case 'SELECT_ELEMENTS':
      return {
        ...state,
        selectedElements: action.elementIds,
        selectedConnection: null,
      };

    case 'SELECT_CONNECTION':
      return {
        ...state,
        selectedConnection: action.connectionId,
        selectedElements: [],
      };

    case 'CLEAR_SELECTION':
      return {
        ...state,
        selectedElements: [],
        selectedConnection: null,
      };

    // Viewport actions
    case 'UPDATE_VIEWPORT':
      return {
        ...state,
        viewport: {
          ...state.viewport,
          ...action.viewport,
        },
      };

    case 'ZOOM_TO_FIT': {
      // Calculate bounding box for all elements on current page
      const currentPage = state.tool.pages.find(p => p.id === state.currentPage);
      if (!currentPage || currentPage.elements.length === 0) return state;

      // This would use calculateViewportToFit from utils
      // Simplified here for now
      return state;
    }

    case 'ZOOM_TO_PAGE': {
      const page = state.tool.pages.find(p => p.id === action.pageId);
      if (!page) return state;

      // This would use calculateViewportForPage from utils
      return {
        ...state,
        currentPage: action.pageId,
      };
    }

    case 'ZOOM_TO_SELECTION': {
      if (state.selectedElements.length === 0) return state;

      // This would calculate viewport to fit selected elements
      return state;
    }

    // Canvas mode actions
    case 'SET_CANVAS_MODE':
      return {
        ...state,
        canvasMode: action.mode,
      };

    // Connection draft actions
    case 'START_CONNECTION':
      return {
        ...state,
        connectionDraft: {
          isConnecting: true,
          sourceElementId: action.sourceElementId,
          sourcePortId: action.sourcePortId,
          sourceType: action.sourceType,
        },
        canvasMode: 'connect',
      };

    case 'UPDATE_CONNECTION_MOUSE':
      return {
        ...state,
        connectionDraft: {
          ...state.connectionDraft,
          mousePosition: action.position,
        },
      };

    case 'END_CONNECTION':
      return {
        ...state,
        connectionDraft: {
          isConnecting: false,
        },
        canvasMode: 'select',
      };

    // Selection box actions
    case 'START_SELECTION_BOX':
      return {
        ...state,
        selectionBox: {
          x: action.x,
          y: action.y,
          width: 0,
          height: 0,
          active: true,
        },
        canvasMode: 'multiselect',
      };

    case 'UPDATE_SELECTION_BOX':
      return {
        ...state,
        selectionBox: {
          x: action.x,
          y: action.y,
          width: action.width,
          height: action.height,
          active: true,
        },
      };

    case 'END_SELECTION_BOX':
      return {
        ...state,
        selectionBox: {
          ...state.selectionBox,
          active: false,
        },
        canvasMode: 'select',
      };

    // Panel actions
    case 'TOGGLE_PANEL':
      return {
        ...state,
        panels: {
          ...state.panels,
          [action.panel]: {
            ...state.panels[action.panel],
            isOpen: !state.panels[action.panel].isOpen,
          },
        },
      };

    case 'UPDATE_PANEL':
      return {
        ...state,
        panels: {
          ...state.panels,
          [action.panel]: {
            ...state.panels[action.panel],
            ...action.state,
          },
        },
      };

    // History actions
    case 'UNDO': {
      const { past, future } = state.history;
      if (past.length === 0) return state;

      const previous = past[past.length - 1];
      const newPast = past.slice(0, past.length - 1);

      return {
        ...state,
        tool: previous,
        history: {
          past: newPast,
          future: [state.tool, ...future],
        },
      };
    }

    case 'REDO': {
      const { past, future } = state.history;
      if (future.length === 0) return state;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        ...state,
        tool: next,
        history: {
          past: [...past, state.tool],
          future: newFuture,
        },
      };
    }

    case 'PUSH_HISTORY':
      return {
        ...state,
        history: {
          past: [...state.history.past, state.tool],
          future: [],
        },
      };

    // UI actions
    case 'SET_DRAGGING_ELEMENT':
      return {
        ...state,
        isDraggingElement: action.isDragging,
      };

    case 'SET_HOVERED_PORT':
      return {
        ...state,
        hoveredPort: action.portId,
      };

    case 'TOGGLE_GRID':
      return {
        ...state,
        showGrid: !state.showGrid,
      };

    case 'TOGGLE_SNAP_TO_GRID':
      return {
        ...state,
        snapToGrid: !state.snapToGrid,
      };

    default:
      return state;
  }
}

// ============================================================================
// Context
// ============================================================================

export interface HiveLabContextValue {
  state: HiveLabState;
  dispatch: React.Dispatch<HiveLabAction>;
  actions: {
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
    updateConnectionMouse: (position: { x: number; y: number }) => void;
    endConnection: () => void;
    undo: () => void;
    redo: () => void;
    togglePanel: (panel: keyof HiveLabState['panels']) => void;
    setDraggingElement: (isDragging: boolean) => void;
    setHoveredPort: (portId: string | null) => void;
    toggleGrid: () => void;
    toggleSnapToGrid: () => void;
  };
}

const HiveLabContext = createContext<HiveLabContextValue | undefined>(undefined);

// ============================================================================
// Provider
// ============================================================================

interface HiveLabProviderProps {
  children: ReactNode;
  initialTool?: Tool;
}

export function HiveLabProvider({ children, initialTool }: HiveLabProviderProps) {
  const [state, dispatch] = useReducer(
    hiveLabReducer,
    initialTool
      ? { ...createInitialState(), tool: initialTool, currentPage: initialTool.startPage }
      : createInitialState()
  );

  // Create actions object
  const actions = React.useMemo(() => ({
    // Tool actions
    loadTool: (tool: Tool) => dispatch({ type: 'LOAD_TOOL', tool }),
    updateTool: (updates: Partial<Tool>) => dispatch({ type: 'UPDATE_TOOL', updates }),

    // Page actions
    addPage: (page: Page) => dispatch({ type: 'ADD_PAGE', page }),
    deletePage: (pageId: string) => dispatch({ type: 'DELETE_PAGE', pageId }),
    updatePage: (pageId: string, updates: Partial<Page>) => dispatch({ type: 'UPDATE_PAGE', pageId, updates }),
    setCurrentPage: (pageId: string) => dispatch({ type: 'SET_CURRENT_PAGE', pageId }),

    // Element actions
    addElement: (element: Element, pageId: string) => {
      dispatch({ type: 'PUSH_HISTORY' });
      dispatch({ type: 'ADD_ELEMENT', element, pageId });
    },
    removeElement: (elementId: string, pageId: string) => {
      dispatch({ type: 'PUSH_HISTORY' });
      dispatch({ type: 'REMOVE_ELEMENT', elementId, pageId });
    },
    updateElement: (elementId: string, pageId: string, updates: Partial<Element>) => {
      dispatch({ type: 'UPDATE_ELEMENT', elementId, pageId, updates });
    },
    moveElement: (elementId: string, pageId: string, x: number, y: number) => {
      dispatch({ type: 'MOVE_ELEMENT', elementId, pageId, x, y });
    },
    duplicateElement: (elementId: string, pageId: string) => {
      dispatch({ type: 'PUSH_HISTORY' });
      dispatch({ type: 'DUPLICATE_ELEMENT', elementId, pageId });
    },

    // Connection actions
    createConnection: (connection: Connection, pageId: string) => {
      dispatch({ type: 'PUSH_HISTORY' });
      dispatch({ type: 'CREATE_CONNECTION', connection, pageId });
    },
    deleteConnection: (connectionId: string, pageId: string) => {
      dispatch({ type: 'PUSH_HISTORY' });
      dispatch({ type: 'DELETE_CONNECTION', connectionId, pageId });
    },

    // Selection actions
    selectElements: (elementIds: string[]) => dispatch({ type: 'SELECT_ELEMENTS', elementIds }),
    selectConnection: (connectionId: string | null) => dispatch({ type: 'SELECT_CONNECTION', connectionId }),
    clearSelection: () => dispatch({ type: 'CLEAR_SELECTION' }),

    // Viewport actions
    updateViewport: (viewport: Partial<Viewport>) => dispatch({ type: 'UPDATE_VIEWPORT', viewport }),
    zoomToFit: () => dispatch({ type: 'ZOOM_TO_FIT' }),
    zoomToPage: (pageId: string) => dispatch({ type: 'ZOOM_TO_PAGE', pageId }),

    // Connection draft actions
    startConnection: (sourceElementId: string, sourcePortId: string, sourceType: any) => {
      dispatch({ type: 'START_CONNECTION', sourceElementId, sourcePortId, sourceType });
    },
    updateConnectionMouse: (position: { x: number; y: number }) => {
      dispatch({ type: 'UPDATE_CONNECTION_MOUSE', position });
    },
    endConnection: () => dispatch({ type: 'END_CONNECTION' }),

    // History actions
    undo: () => dispatch({ type: 'UNDO' }),
    redo: () => dispatch({ type: 'REDO' }),

    // Panel actions
    togglePanel: (panel: keyof HiveLabState['panels']) => dispatch({ type: 'TOGGLE_PANEL', panel }),

    // UI actions
    setDraggingElement: (isDragging: boolean) => dispatch({ type: 'SET_DRAGGING_ELEMENT', isDragging }),
    setHoveredPort: (portId: string | null) => dispatch({ type: 'SET_HOVERED_PORT', portId }),
    toggleGrid: () => dispatch({ type: 'TOGGLE_GRID' }),
    toggleSnapToGrid: () => dispatch({ type: 'TOGGLE_SNAP_TO_GRID' }),
  }), []);

  return (
    <HiveLabContext.Provider value={{ state, dispatch, actions }}>
      {children}
    </HiveLabContext.Provider>
  );
}

// ============================================================================
// Hook
// ============================================================================

export function useHiveLab() {
  const context = useContext(HiveLabContext);

  if (context === undefined) {
    throw new Error('useHiveLab must be used within a HiveLabProvider');
  }

  return { state: context.state, actions: context.actions };
}

// ============================================================================
// Helper Action Functions
// ============================================================================

export function useHiveLabActions() {
  const { dispatch } = useHiveLab();

  return {
    // Tool actions
    loadTool: useCallback((tool: Tool) => {
      dispatch({ type: 'LOAD_TOOL', tool });
    }, [dispatch]),

    updateTool: useCallback((updates: Partial<Tool>) => {
      dispatch({ type: 'UPDATE_TOOL', updates });
    }, [dispatch]),

    // Page actions
    addPage: useCallback((page: Page) => {
      dispatch({ type: 'ADD_PAGE', page });
    }, [dispatch]),

    deletePage: useCallback((pageId: string) => {
      dispatch({ type: 'DELETE_PAGE', pageId });
    }, [dispatch]),

    updatePage: useCallback((pageId: string, updates: Partial<Page>) => {
      dispatch({ type: 'UPDATE_PAGE', pageId, updates });
    }, [dispatch]),

    setCurrentPage: useCallback((pageId: string) => {
      dispatch({ type: 'SET_CURRENT_PAGE', pageId });
    }, [dispatch]),

    // Element actions
    addElement: useCallback((element: Element, pageId: string) => {
      dispatch({ type: 'PUSH_HISTORY' });
      dispatch({ type: 'ADD_ELEMENT', element, pageId });
    }, [dispatch]),

    removeElement: useCallback((elementId: string, pageId: string) => {
      dispatch({ type: 'PUSH_HISTORY' });
      dispatch({ type: 'REMOVE_ELEMENT', elementId, pageId });
    }, [dispatch]),

    updateElement: useCallback((elementId: string, pageId: string, updates: Partial<Element>) => {
      dispatch({ type: 'UPDATE_ELEMENT', elementId, pageId, updates });
    }, [dispatch]),

    moveElement: useCallback((elementId: string, pageId: string, x: number, y: number) => {
      dispatch({ type: 'MOVE_ELEMENT', elementId, pageId, x, y });
    }, [dispatch]),

    duplicateElement: useCallback((elementId: string, pageId: string) => {
      dispatch({ type: 'PUSH_HISTORY' });
      dispatch({ type: 'DUPLICATE_ELEMENT', elementId, pageId });
    }, [dispatch]),

    // Connection actions
    createConnection: useCallback((connection: Connection, pageId: string) => {
      dispatch({ type: 'PUSH_HISTORY' });
      dispatch({ type: 'CREATE_CONNECTION', connection, pageId });
    }, [dispatch]),

    deleteConnection: useCallback((connectionId: string, pageId: string) => {
      dispatch({ type: 'PUSH_HISTORY' });
      dispatch({ type: 'DELETE_CONNECTION', connectionId, pageId });
    }, [dispatch]),

    // Selection actions
    selectElements: useCallback((elementIds: string[]) => {
      dispatch({ type: 'SELECT_ELEMENTS', elementIds });
    }, [dispatch]),

    selectConnection: useCallback((connectionId: string | null) => {
      dispatch({ type: 'SELECT_CONNECTION', connectionId });
    }, [dispatch]),

    clearSelection: useCallback(() => {
      dispatch({ type: 'CLEAR_SELECTION' });
    }, [dispatch]),

    // Viewport actions
    updateViewport: useCallback((viewport: Partial<Viewport>) => {
      dispatch({ type: 'UPDATE_VIEWPORT', viewport });
    }, [dispatch]),

    zoomToFit: useCallback(() => {
      dispatch({ type: 'ZOOM_TO_FIT' });
    }, [dispatch]),

    zoomToPage: useCallback((pageId: string) => {
      dispatch({ type: 'ZOOM_TO_PAGE', pageId });
    }, [dispatch]),

    // Connection draft actions
    startConnection: useCallback((sourceElementId: string, sourcePortId: string, sourceType: any) => {
      dispatch({ type: 'START_CONNECTION', sourceElementId, sourcePortId, sourceType });
    }, [dispatch]),

    updateConnectionMouse: useCallback((position: { x: number; y: number }) => {
      dispatch({ type: 'UPDATE_CONNECTION_MOUSE', position });
    }, [dispatch]),

    endConnection: useCallback(() => {
      dispatch({ type: 'END_CONNECTION' });
    }, [dispatch]),

    // History actions
    undo: useCallback(() => {
      dispatch({ type: 'UNDO' });
    }, [dispatch]),

    redo: useCallback(() => {
      dispatch({ type: 'REDO' });
    }, [dispatch]),

    // Panel actions
    togglePanel: useCallback((panel: keyof HiveLabState['panels']) => {
      dispatch({ type: 'TOGGLE_PANEL', panel });
    }, [dispatch]),

    // UI actions
    setDraggingElement: useCallback((isDragging: boolean) => {
      dispatch({ type: 'SET_DRAGGING_ELEMENT', isDragging });
    }, [dispatch]),

    setHoveredPort: useCallback((portId: string | null) => {
      dispatch({ type: 'SET_HOVERED_PORT', portId });
    }, [dispatch]),

    toggleGrid: useCallback(() => {
      dispatch({ type: 'TOGGLE_GRID' });
    }, [dispatch]),

    toggleSnapToGrid: useCallback(() => {
      dispatch({ type: 'TOGGLE_SNAP_TO_GRID' });
    }, [dispatch]),
  };
}
