/**
 * HiveLab Builder Context
 *
 * React Context + useReducer for managing complete builder state.
 * Handles elements, connections, viewport, selection, and history.
 */
'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useReducer, useCallback } from 'react';
import { generatePageId, generateElementId } from '@/lib/hivelab-utils';
// ============================================================================
// Initial State Factory
// ============================================================================
function createDefaultTool() {
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
function createInitialState() {
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
function hiveLabReducer(state, action) {
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
                    pages: state.tool.pages.map(page => page.id === action.pageId ? { ...page, ...action.updates } : page),
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
                    pages: state.tool.pages.map(page => page.id === action.pageId
                        ? { ...page, x: action.x, y: action.y }
                        : page),
                    updatedAt: new Date(),
                },
            };
        // Element actions
        case 'ADD_ELEMENT':
            return {
                ...state,
                tool: {
                    ...state.tool,
                    pages: state.tool.pages.map(page => page.id === action.pageId
                        ? { ...page, elements: [...page.elements, action.element] }
                        : page),
                    updatedAt: new Date(),
                },
            };
        case 'REMOVE_ELEMENT': {
            return {
                ...state,
                tool: {
                    ...state.tool,
                    pages: state.tool.pages.map(page => page.id === action.pageId
                        ? {
                            ...page,
                            elements: page.elements.filter(el => el.id !== action.elementId),
                            connections: page.connections.filter(conn => conn.sourceElementId !== action.elementId &&
                                conn.targetElementId !== action.elementId),
                        }
                        : page),
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
                    pages: state.tool.pages.map(page => page.id === action.pageId
                        ? {
                            ...page,
                            elements: page.elements.map(el => el.id === action.elementId ? { ...el, ...action.updates } : el),
                        }
                        : page),
                    updatedAt: new Date(),
                },
            };
        case 'MOVE_ELEMENT':
            return {
                ...state,
                tool: {
                    ...state.tool,
                    pages: state.tool.pages.map(page => page.id === action.pageId
                        ? {
                            ...page,
                            elements: page.elements.map(el => el.id === action.elementId
                                ? { ...el, x: action.x, y: action.y }
                                : el),
                        }
                        : page),
                    updatedAt: new Date(),
                },
            };
        case 'DUPLICATE_ELEMENT': {
            const page = state.tool.pages.find(p => p.id === action.pageId);
            const element = page?.elements.find(el => el.id === action.elementId);
            if (!page || !element)
                return state;
            const newElement = {
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
                    pages: state.tool.pages.map(p => p.id === action.pageId
                        ? { ...p, elements: [...p.elements, newElement] }
                        : p),
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
                    pages: state.tool.pages.map(page => page.id === action.pageId
                        ? { ...page, connections: [...page.connections, action.connection] }
                        : page),
                    updatedAt: new Date(),
                },
            };
        case 'DELETE_CONNECTION':
            return {
                ...state,
                tool: {
                    ...state.tool,
                    pages: state.tool.pages.map(page => page.id === action.pageId
                        ? {
                            ...page,
                            connections: page.connections.filter(c => c.id !== action.connectionId),
                        }
                        : page),
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
                    pages: state.tool.pages.map(page => page.id === action.pageId
                        ? {
                            ...page,
                            connections: page.connections.map(conn => conn.id === action.connectionId
                                ? { ...conn, ...action.updates }
                                : conn),
                        }
                        : page),
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
            if (!currentPage || currentPage.elements.length === 0)
                return state;
            // This would use calculateViewportToFit from utils
            // Simplified here for now
            return state;
        }
        case 'ZOOM_TO_PAGE': {
            const page = state.tool.pages.find(p => p.id === action.pageId);
            if (!page)
                return state;
            // This would use calculateViewportForPage from utils
            return {
                ...state,
                currentPage: action.pageId,
            };
        }
        case 'ZOOM_TO_SELECTION': {
            if (state.selectedElements.length === 0)
                return state;
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
            if (past.length === 0)
                return state;
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
            if (future.length === 0)
                return state;
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
const HiveLabContext = createContext(undefined);
export function HiveLabProvider({ children, initialTool }) {
    const [state, dispatch] = useReducer(hiveLabReducer, initialTool
        ? { ...createInitialState(), tool: initialTool, currentPage: initialTool.startPage }
        : createInitialState());
    return (_jsx(HiveLabContext.Provider, { value: { state, dispatch }, children: children }));
}
// ============================================================================
// Hook
// ============================================================================
export function useHiveLab() {
    const context = useContext(HiveLabContext);
    if (context === undefined) {
        throw new Error('useHiveLab must be used within a HiveLabProvider');
    }
    return context;
}
// ============================================================================
// Helper Action Functions
// ============================================================================
export function useHiveLabActions() {
    const { dispatch } = useHiveLab();
    return {
        // Tool actions
        loadTool: useCallback((tool) => {
            dispatch({ type: 'LOAD_TOOL', tool });
        }, [dispatch]),
        updateTool: useCallback((updates) => {
            dispatch({ type: 'UPDATE_TOOL', updates });
        }, [dispatch]),
        // Page actions
        addPage: useCallback((page) => {
            dispatch({ type: 'ADD_PAGE', page });
        }, [dispatch]),
        deletePage: useCallback((pageId) => {
            dispatch({ type: 'DELETE_PAGE', pageId });
        }, [dispatch]),
        updatePage: useCallback((pageId, updates) => {
            dispatch({ type: 'UPDATE_PAGE', pageId, updates });
        }, [dispatch]),
        setCurrentPage: useCallback((pageId) => {
            dispatch({ type: 'SET_CURRENT_PAGE', pageId });
        }, [dispatch]),
        // Element actions
        addElement: useCallback((element, pageId) => {
            dispatch({ type: 'PUSH_HISTORY' });
            dispatch({ type: 'ADD_ELEMENT', element, pageId });
        }, [dispatch]),
        removeElement: useCallback((elementId, pageId) => {
            dispatch({ type: 'PUSH_HISTORY' });
            dispatch({ type: 'REMOVE_ELEMENT', elementId, pageId });
        }, [dispatch]),
        updateElement: useCallback((elementId, pageId, updates) => {
            dispatch({ type: 'UPDATE_ELEMENT', elementId, pageId, updates });
        }, [dispatch]),
        moveElement: useCallback((elementId, pageId, x, y) => {
            dispatch({ type: 'MOVE_ELEMENT', elementId, pageId, x, y });
        }, [dispatch]),
        duplicateElement: useCallback((elementId, pageId) => {
            dispatch({ type: 'PUSH_HISTORY' });
            dispatch({ type: 'DUPLICATE_ELEMENT', elementId, pageId });
        }, [dispatch]),
        // Connection actions
        createConnection: useCallback((connection, pageId) => {
            dispatch({ type: 'PUSH_HISTORY' });
            dispatch({ type: 'CREATE_CONNECTION', connection, pageId });
        }, [dispatch]),
        deleteConnection: useCallback((connectionId, pageId) => {
            dispatch({ type: 'PUSH_HISTORY' });
            dispatch({ type: 'DELETE_CONNECTION', connectionId, pageId });
        }, [dispatch]),
        // Selection actions
        selectElements: useCallback((elementIds) => {
            dispatch({ type: 'SELECT_ELEMENTS', elementIds });
        }, [dispatch]),
        selectConnection: useCallback((connectionId) => {
            dispatch({ type: 'SELECT_CONNECTION', connectionId });
        }, [dispatch]),
        clearSelection: useCallback(() => {
            dispatch({ type: 'CLEAR_SELECTION' });
        }, [dispatch]),
        // Viewport actions
        updateViewport: useCallback((viewport) => {
            dispatch({ type: 'UPDATE_VIEWPORT', viewport });
        }, [dispatch]),
        zoomToFit: useCallback(() => {
            dispatch({ type: 'ZOOM_TO_FIT' });
        }, [dispatch]),
        zoomToPage: useCallback((pageId) => {
            dispatch({ type: 'ZOOM_TO_PAGE', pageId });
        }, [dispatch]),
        // Connection draft actions
        startConnection: useCallback((sourceElementId, sourcePortId, sourceType) => {
            dispatch({ type: 'START_CONNECTION', sourceElementId, sourcePortId, sourceType });
        }, [dispatch]),
        updateConnectionMouse: useCallback((position) => {
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
        togglePanel: useCallback((panel) => {
            dispatch({ type: 'TOGGLE_PANEL', panel });
        }, [dispatch]),
        // UI actions
        setDraggingElement: useCallback((isDragging) => {
            dispatch({ type: 'SET_DRAGGING_ELEMENT', isDragging });
        }, [dispatch]),
        setHoveredPort: useCallback((portId) => {
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
//# sourceMappingURL=hivelab-context.js.map