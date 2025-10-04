/**
 * HiveLab Builder Type Definitions
 *
 * Complete type system for the visual no-code tool builder.
 * Based on n8n-style node connections with Figma-like canvas.
 */
/**
 * Data types that flow through element connections
 */
export type DataType = 'any' | 'text' | 'number' | 'boolean' | 'date' | 'user' | 'list' | 'object' | 'event' | 'file' | 'validation';
/**
 * Color mapping for data types
 */
export declare const DATA_TYPE_COLORS: Record<DataType, string>;
/**
 * Get primary data type (for display/color)
 */
export declare function getPrimaryType(type: DataType | DataType[]): DataType;
/**
 * Element categories (8 types from spec)
 */
export type ElementCategory = 'trigger' | 'collector' | 'transformer' | 'router' | 'storage' | 'display' | 'action' | 'connector';
/**
 * Element complexity level
 */
export type ElementComplexity = 'simple' | 'medium' | 'advanced';
/**
 * Port definition (input or output)
 */
export interface Port {
    id: string;
    name: string;
    type: DataType | DataType[];
    side: 'input' | 'output';
    required: boolean;
    description: string;
    defaultValue?: any;
}
/**
 * Element instance on canvas
 */
export interface Element {
    id: string;
    type: ElementCategory;
    name: string;
    icon: string;
    description: string;
    x: number;
    y: number;
    width: number;
    height: number;
    inputs: Port[];
    outputs: Port[];
    config: Record<string, any>;
    complexity?: ElementComplexity;
    isNew?: boolean;
    isFavorite?: boolean;
    pageId: string;
}
/**
 * Element definition (in library)
 */
export interface ElementDefinition {
    id: string;
    name: string;
    icon: string;
    category: ElementCategory;
    description: string;
    complexity: ElementComplexity;
    defaultWidth: number;
    defaultHeight: number;
    defaultInputs: Omit<Port, 'id'>[];
    defaultOutputs: Omit<Port, 'id'>[];
    defaultConfig: Record<string, any>;
    color?: string;
    isNew?: boolean;
}
/**
 * Connection between elements
 */
export interface Connection {
    id: string;
    sourceElementId: string;
    sourcePortId: string;
    targetElementId: string;
    targetPortId: string;
    path?: string;
    color?: string;
    pageId: string;
}
/**
 * Page type
 */
export type PageType = 'default' | 'modal' | 'drawer';
/**
 * Page transition animation
 */
export type PageTransition = 'push' | 'replace' | 'modal' | 'drawer';
/**
 * Role requirement for page access
 */
export type RequiredRole = 'member' | 'leader' | 'admin';
/**
 * Page frame on canvas
 */
export interface Page {
    id: string;
    name: string;
    description?: string;
    x: number;
    y: number;
    width: number;
    height: number;
    color?: string;
    thumbnail?: string;
    type: PageType;
    requiredRole?: RequiredRole;
    elements: Element[];
    connections: Connection[];
}
/**
 * Router element configuration
 */
export interface RouterConfig {
    targetPage: string;
    transition: PageTransition;
    condition?: {
        type: 'always' | 'if' | 'role';
        expression?: string;
        requiredRole?: RequiredRole;
    };
    pageData?: Record<string, string>;
    animation?: 'slide' | 'fade' | 'scale';
}
/**
 * Tool status
 */
export type ToolStatus = 'draft' | 'published' | 'archived';
/**
 * Tool visibility
 */
export type ToolVisibility = 'private' | 'space' | 'campus' | 'public';
/**
 * Complete tool definition
 */
export interface Tool {
    id: string;
    name: string;
    description: string;
    icon: string;
    version: string;
    createdBy: string;
    spaceId?: string;
    pages: Page[];
    startPage: string;
    globalVariables?: Record<string, any>;
    globalStyles?: Record<string, any>;
    status: ToolStatus;
    visibility: ToolVisibility;
    deployedTo: string[];
    uses: number;
    forks: number;
    rating: number;
    permissions: {
        canFork: boolean;
        canEdit: string[];
        requiresApproval: boolean;
    };
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
}
/**
 * Canvas viewport state
 */
export interface Viewport {
    x: number;
    y: number;
    zoom: number;
}
/**
 * Selection box (multi-select)
 */
export interface SelectionBox {
    x: number;
    y: number;
    width: number;
    height: number;
    active: boolean;
}
/**
 * Canvas interaction mode
 */
export type CanvasMode = 'select' | 'pan' | 'connect' | 'multiselect';
/**
 * Panel state
 */
export interface PanelState {
    isOpen: boolean;
    width: number;
    isDocked: boolean;
    position?: {
        x: number;
        y: number;
    };
}
/**
 * Connection creation state
 */
export interface ConnectionDraft {
    isConnecting: boolean;
    sourceElementId?: string;
    sourcePortId?: string;
    sourceType?: DataType | DataType[];
    mousePosition?: {
        x: number;
        y: number;
    };
}
/**
 * Complete HiveLab builder state
 */
export interface HiveLabState {
    tool: Tool;
    currentPage: string;
    selectedElements: string[];
    selectedConnection: string | null;
    viewport: Viewport;
    canvasMode: CanvasMode;
    connectionDraft: ConnectionDraft;
    selectionBox: SelectionBox;
    panels: {
        library: PanelState;
        properties: PanelState;
        layers: PanelState;
        versions: PanelState;
    };
    history: {
        past: Tool[];
        future: Tool[];
    };
    isDraggingElement: boolean;
    hoveredPort: string | null;
    showGrid: boolean;
    snapToGrid: boolean;
}
/**
 * HiveLab reducer actions
 */
export type HiveLabAction = {
    type: 'LOAD_TOOL';
    tool: Tool;
} | {
    type: 'UPDATE_TOOL';
    updates: Partial<Tool>;
} | {
    type: 'ADD_PAGE';
    page: Page;
} | {
    type: 'DELETE_PAGE';
    pageId: string;
} | {
    type: 'UPDATE_PAGE';
    pageId: string;
    updates: Partial<Page>;
} | {
    type: 'SET_CURRENT_PAGE';
    pageId: string;
} | {
    type: 'MOVE_PAGE';
    pageId: string;
    x: number;
    y: number;
} | {
    type: 'ADD_ELEMENT';
    element: Element;
    pageId: string;
} | {
    type: 'REMOVE_ELEMENT';
    elementId: string;
    pageId: string;
} | {
    type: 'UPDATE_ELEMENT';
    elementId: string;
    pageId: string;
    updates: Partial<Element>;
} | {
    type: 'MOVE_ELEMENT';
    elementId: string;
    pageId: string;
    x: number;
    y: number;
} | {
    type: 'DUPLICATE_ELEMENT';
    elementId: string;
    pageId: string;
} | {
    type: 'CREATE_CONNECTION';
    connection: Connection;
    pageId: string;
} | {
    type: 'DELETE_CONNECTION';
    connectionId: string;
    pageId: string;
} | {
    type: 'UPDATE_CONNECTION';
    connectionId: string;
    pageId: string;
    updates: Partial<Connection>;
} | {
    type: 'SELECT_ELEMENTS';
    elementIds: string[];
} | {
    type: 'SELECT_CONNECTION';
    connectionId: string | null;
} | {
    type: 'CLEAR_SELECTION';
} | {
    type: 'UPDATE_VIEWPORT';
    viewport: Partial<Viewport>;
} | {
    type: 'ZOOM_TO_FIT';
} | {
    type: 'ZOOM_TO_PAGE';
    pageId: string;
} | {
    type: 'ZOOM_TO_SELECTION';
} | {
    type: 'SET_CANVAS_MODE';
    mode: CanvasMode;
} | {
    type: 'START_CONNECTION';
    sourceElementId: string;
    sourcePortId: string;
    sourceType: DataType | DataType[];
} | {
    type: 'UPDATE_CONNECTION_MOUSE';
    position: {
        x: number;
        y: number;
    };
} | {
    type: 'END_CONNECTION';
} | {
    type: 'START_SELECTION_BOX';
    x: number;
    y: number;
} | {
    type: 'UPDATE_SELECTION_BOX';
    x: number;
    y: number;
    width: number;
    height: number;
} | {
    type: 'END_SELECTION_BOX';
} | {
    type: 'TOGGLE_PANEL';
    panel: keyof HiveLabState['panels'];
} | {
    type: 'UPDATE_PANEL';
    panel: keyof HiveLabState['panels'];
    state: Partial<PanelState>;
} | {
    type: 'UNDO';
} | {
    type: 'REDO';
} | {
    type: 'PUSH_HISTORY';
} | {
    type: 'SET_DRAGGING_ELEMENT';
    isDragging: boolean;
} | {
    type: 'SET_HOVERED_PORT';
    portId: string | null;
} | {
    type: 'TOGGLE_GRID';
} | {
    type: 'TOGGLE_SNAP_TO_GRID';
};
/**
 * Pre-built tool template
 */
export interface ToolTemplate {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    category: string;
    tool: Omit<Tool, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>;
    elementCount: number;
    complexity: ElementComplexity;
    usageCount: number;
    rating: number;
    tags: string[];
}
/**
 * Position on canvas
 */
export interface Position {
    x: number;
    y: number;
}
/**
 * Size dimensions
 */
export interface Size {
    width: number;
    height: number;
}
/**
 * Bounding box
 */
export interface BoundingBox extends Position, Size {
}
/**
 * Connection path points
 */
export interface ConnectionPath {
    start: Position;
    end: Position;
    controlPoint1: Position;
    controlPoint2: Position;
}
//# sourceMappingURL=hivelab.types.d.ts.map