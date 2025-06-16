import type { Element } from "@hive/core";
import type { ConfigObject } from "../ElementConfig/types";


export interface ElementInstance {
  /** Unique instance ID */
  id: string;
  /** Reference to the base element */
  elementId: string;
  /** Element type for quick access */
  elementType: string;
  /** Current configuration values */
  config: ConfigObject;
  /** Position on canvas */
  position: {
    x: number;
    y: number;
  };
  /** Size on canvas */
  size: {
    width: number;
    height: number;
  };
  /** Z-index for layering */
  zIndex: number;
  /** Whether this instance is currently selected */
  isSelected: boolean;
}

export interface CanvasState {
  /** All element instances on the canvas */
  instances: ElementInstance[];
  /** Currently selected instance IDs */
  selectedIds: string[];
  /** Canvas zoom level (0.1 to 3.0) */
  zoom: number;
  /** Canvas pan offset */
  pan: {
    x: number;
    y: number;
  };
  /** Whether in edit mode */
  isEditing: boolean;
  /** Canvas dimensions */
  dimensions: {
    width: number;
    height: number;
  };
}

export interface ToolBuilderCanvasProps {
  /** Current canvas state */
  canvasState: CanvasState;
  /** Available elements for reference */
  elements: Element[];
  /** Callback when canvas state changes */
  onStateChange: (newState: CanvasState) => void;
  /** Callback when an element is selected */
  onElementSelect: (instanceId: string | null) => void;
  /** Callback when an element's config changes */
  onElementConfig: (instanceId: string, config: ConfigObject) => void;
  /** Whether the canvas is in preview mode */
  isPreview?: boolean;
  /** Optional CSS class name */
  className?: string;
}

export interface ElementInstanceProps {
  /** The element instance to render */
  instance: ElementInstance;
  /** The base element definition */
  element: Element;
  /** Whether this instance is selected */
  isSelected: boolean;
  /** Whether the canvas is in preview mode */
  isPreview: boolean;
  /** Callback when clicked */
  onClick: (instanceId: string) => void;
  /** Callback when dragged */
  onDrag: (instanceId: string, position: { x: number; y: number }) => void;
  /** Callback when resized */
  onResize: (
    instanceId: string,
    size: { width: number; height: number }
  ) => void;
  /** Optional CSS class name */
  className?: string;
}

export interface DragData {
  type: "element" | "instance";
  elementId?: string;
  elementType?: string;
  instanceId?: string;
}
