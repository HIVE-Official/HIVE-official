/**
 * HiveLab Builder Type Definitions
 *
 * Complete type system for the visual no-code tool builder.
 * Based on n8n-style node connections with Figma-like canvas.
 */

// ============================================================================
// Data Types
// ============================================================================

/**
 * Data types that flow through element connections
 */
export type DataType =
  | 'any'           // Accepts anything (rare, mostly for debugging)
  | 'text'          // String data
  | 'number'        // Numeric data
  | 'boolean'       // True/false
  | 'date'          // DateTime
  | 'user'          // User object
  | 'list'          // Array of items
  | 'object'        // Complex object
  | 'event'         // Trigger signal (no data, just fires)
  | 'file'          // File upload
  | 'validation';   // Validation result

/**
 * Color mapping for data types
 */
export const DATA_TYPE_COLORS: Record<DataType, string> = {
  any: 'hsl(var(--muted))',
  text: 'hsl(210, 100%, 60%)',
  number: 'hsl(280, 100%, 60%)',
  boolean: 'hsl(120, 100%, 40%)',
  date: 'hsl(40, 100%, 50%)',
  user: 'hsl(200, 100%, 50%)',
  list: 'hsl(180, 100%, 40%)',
  object: 'hsl(260, 100%, 60%)',
  event: 'hsl(0, 100%, 60%)',
  file: 'hsl(160, 100%, 40%)',
  validation: 'hsl(320, 100%, 50%)'
};

/**
 * Get primary data type (for display/color)
 */
export function getPrimaryType(type: DataType | DataType[]): DataType {
  return Array.isArray(type) ? type[0] : type;
}

// ============================================================================
// Element System
// ============================================================================

/**
 * Element categories (8 types from spec)
 */
export type ElementCategory =
  | 'trigger'       // Form load, button click, schedule, webhook
  | 'collector'     // Text, choice, date, member, file inputs
  | 'transformer'   // Format, validate, calculate, filter
  | 'router'        // If/else, for-each, page navigation
  | 'storage'       // Variable, database, file storage
  | 'display'       // Chart, list, progress, text display
  | 'action'        // Notify, post, email, create event
  | 'connector';    // Convert, merge, delay, error handler

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
  type: DataType | DataType[];  // Can accept multiple types
  side: 'input' | 'output';
  required: boolean;
  description: string;
  defaultValue?: any;
}

/**
 * Element instance on canvas
 */
export interface Element {
  // Identity
  id: string;
  type: ElementCategory;
  name: string;
  icon: string;
  description: string;

  // Position and size
  x: number;
  y: number;
  width: number;
  height: number;

  // Ports
  inputs: Port[];
  outputs: Port[];

  // Configuration
  config: Record<string, any>;

  // Metadata
  complexity?: ElementComplexity;
  isNew?: boolean;
  isFavorite?: boolean;

  // Page reference
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

  // Template for creating instances
  defaultWidth: number;
  defaultHeight: number;
  defaultInputs: Omit<Port, 'id'>[];
  defaultOutputs: Omit<Port, 'id'>[];
  defaultConfig: Record<string, any>;

  // UI
  color?: string;
  isNew?: boolean;
}

/**
 * Connection between elements
 */
export interface Connection {
  id: string;

  // Source (output)
  sourceElementId: string;
  sourcePortId: string;

  // Target (input)
  targetElementId: string;
  targetPortId: string;

  // Visual
  path?: string;        // SVG path (calculated)
  color?: string;       // Based on data type

  // Page reference
  pageId: string;
}

// ============================================================================
// Page System
// ============================================================================

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
  // Identity
  id: string;
  name: string;
  description?: string;

  // Position on infinite canvas
  x: number;
  y: number;
  width: number;
  height: number;

  // Visual
  color?: string;
  thumbnail?: string;  // Auto-generated preview

  // Type
  type: PageType;

  // Access control
  requiredRole?: RequiredRole;

  // Content
  elements: Element[];
  connections: Connection[];
}

/**
 * Router element configuration
 */
export interface RouterConfig {
  // Target page
  targetPage: string;
  transition: PageTransition;

  // Conditional navigation
  condition?: {
    type: 'always' | 'if' | 'role';
    expression?: string;
    requiredRole?: RequiredRole;
  };

  // Pass data to next page
  pageData?: Record<string, string>;

  // Animation
  animation?: 'slide' | 'fade' | 'scale';
}

// ============================================================================
// Tool System
// ============================================================================

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
  // Identity
  id: string;
  name: string;
  description: string;
  icon: string;
  version: string;

  // Creator
  createdBy: string;
  spaceId?: string;

  // Pages
  pages: Page[];
  startPage: string;  // Which page users see first

  // Global settings
  globalVariables?: Record<string, any>;
  globalStyles?: Record<string, any>;

  // Deployment
  status: ToolStatus;
  visibility: ToolVisibility;
  deployedTo: string[];

  // Usage
  uses: number;
  forks: number;
  rating: number;

  // Permissions
  permissions: {
    canFork: boolean;
    canEdit: string[];
    requiresApproval: boolean;
  };

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

// ============================================================================
// Canvas & Viewport
// ============================================================================

/**
 * Canvas viewport state
 */
export interface Viewport {
  x: number;           // Pan X
  y: number;           // Pan Y
  zoom: number;        // Zoom level (0.1 - 4.0)
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
export type CanvasMode =
  | 'select'          // Default: select and move elements
  | 'pan'             // Pan canvas (space key held)
  | 'connect'         // Creating connection
  | 'multiselect';    // Drag selection box

// ============================================================================
// Builder State
// ============================================================================

/**
 * Panel state
 */
export interface PanelState {
  isOpen: boolean;
  width: number;
  isDocked: boolean;
  position?: { x: number; y: number };  // If floating
}

/**
 * Connection creation state
 */
export interface ConnectionDraft {
  isConnecting: boolean;
  sourceElementId?: string;
  sourcePortId?: string;
  sourceType?: DataType | DataType[];
  mousePosition?: { x: number; y: number };
}

/**
 * Complete HiveLab builder state
 */
export interface HiveLabState {
  // Tool data
  tool: Tool;

  // Current view
  currentPage: string;

  // Selection
  selectedElements: string[];
  selectedConnection: string | null;

  // Canvas
  viewport: Viewport;
  canvasMode: CanvasMode;

  // Interaction
  connectionDraft: ConnectionDraft;
  selectionBox: SelectionBox;

  // Panels
  panels: {
    library: PanelState;
    properties: PanelState;
    layers: PanelState;
    versions: PanelState;
  };

  // History (for undo/redo)
  history: {
    past: Tool[];
    future: Tool[];
  };

  // UI state
  isDraggingElement: boolean;
  hoveredPort: string | null;
  showGrid: boolean;
  snapToGrid: boolean;
}

// ============================================================================
// Actions
// ============================================================================

/**
 * HiveLab reducer actions
 */
export type HiveLabAction =
  // Tool actions
  | { type: 'LOAD_TOOL'; tool: Tool }
  | { type: 'UPDATE_TOOL'; updates: Partial<Tool> }

  // Page actions
  | { type: 'ADD_PAGE'; page: Page }
  | { type: 'DELETE_PAGE'; pageId: string }
  | { type: 'UPDATE_PAGE'; pageId: string; updates: Partial<Page> }
  | { type: 'SET_CURRENT_PAGE'; pageId: string }
  | { type: 'MOVE_PAGE'; pageId: string; x: number; y: number }

  // Element actions
  | { type: 'ADD_ELEMENT'; element: Element; pageId: string }
  | { type: 'REMOVE_ELEMENT'; elementId: string; pageId: string }
  | { type: 'UPDATE_ELEMENT'; elementId: string; pageId: string; updates: Partial<Element> }
  | { type: 'MOVE_ELEMENT'; elementId: string; pageId: string; x: number; y: number }
  | { type: 'DUPLICATE_ELEMENT'; elementId: string; pageId: string }

  // Connection actions
  | { type: 'CREATE_CONNECTION'; connection: Connection; pageId: string }
  | { type: 'DELETE_CONNECTION'; connectionId: string; pageId: string }
  | { type: 'UPDATE_CONNECTION'; connectionId: string; pageId: string; updates: Partial<Connection> }

  // Selection actions
  | { type: 'SELECT_ELEMENTS'; elementIds: string[] }
  | { type: 'SELECT_CONNECTION'; connectionId: string | null }
  | { type: 'CLEAR_SELECTION' }

  // Viewport actions
  | { type: 'UPDATE_VIEWPORT'; viewport: Partial<Viewport> }
  | { type: 'ZOOM_TO_FIT' }
  | { type: 'ZOOM_TO_PAGE'; pageId: string }
  | { type: 'ZOOM_TO_SELECTION' }

  // Canvas mode actions
  | { type: 'SET_CANVAS_MODE'; mode: CanvasMode }

  // Connection draft actions
  | { type: 'START_CONNECTION'; sourceElementId: string; sourcePortId: string; sourceType: DataType | DataType[] }
  | { type: 'UPDATE_CONNECTION_MOUSE'; position: { x: number; y: number } }
  | { type: 'END_CONNECTION' }

  // Selection box actions
  | { type: 'START_SELECTION_BOX'; x: number; y: number }
  | { type: 'UPDATE_SELECTION_BOX'; x: number; y: number; width: number; height: number }
  | { type: 'END_SELECTION_BOX' }

  // Panel actions
  | { type: 'TOGGLE_PANEL'; panel: keyof HiveLabState['panels'] }
  | { type: 'UPDATE_PANEL'; panel: keyof HiveLabState['panels']; state: Partial<PanelState> }

  // History actions
  | { type: 'UNDO' }
  | { type: 'REDO' }
  | { type: 'PUSH_HISTORY' }

  // UI actions
  | { type: 'SET_DRAGGING_ELEMENT'; isDragging: boolean }
  | { type: 'SET_HOVERED_PORT'; portId: string | null }
  | { type: 'TOGGLE_GRID' }
  | { type: 'TOGGLE_SNAP_TO_GRID' };

// ============================================================================
// Templates
// ============================================================================

/**
 * Pre-built tool template
 */
export interface ToolTemplate {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: string;

  // Template data
  tool: Omit<Tool, 'id' | 'createdBy' | 'createdAt' | 'updatedAt'>;

  // Metadata
  elementCount: number;
  complexity: ElementComplexity;
  usageCount: number;
  rating: number;

  // Tags
  tags: string[];
}

// ============================================================================
// Utility Types
// ============================================================================

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
export interface BoundingBox extends Position, Size {}

/**
 * Connection path points
 */
export interface ConnectionPath {
  start: Position;
  end: Position;
  controlPoint1: Position;
  controlPoint2: Position;
}
