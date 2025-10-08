// HIVE UI Package - Clean Nuclear Reset
// Export atomic design system - EXPLICIT EXPORTS FOR ES MODULES
export * from "./src/atomic/atoms";
export * from "./src/atomic/molecules";
export * from "./src/atomic/organisms";
export * from "./src/atomic/templates";

// Export compatibility layer for legacy components that wrap shadcn foundation
export * from "./src/legacy";

// Export universal components
export { UniversalShell, useShell } from "./src/shells/UniversalShell";
export * from "./src/navigation/UniversalNav";
export * from "./src/systems/modal-toast-system";
export * from "./src/providers/HiveProvider";

// Export hooks - EXPLICIT EXPORTS FOR ES MODULES
export * from "./src/hooks";

// Export utilities
export { cn } from "./src/lib/utils";
// Note: hivelab-utils are internal-only, not exported from package

// Re-export common types
export type { ButtonProps } from "./src/atomic/atoms/button";

// Export types
export type { Event, Comment } from "./src/types/event";
export type { SearchableItem, SearchResult, SearchFilters } from "./src/types/search";

// Export HiveLab types (selective to avoid conflicts with components)
export type {
  DataType,
  ElementCategory,
  ElementComplexity,
  Port,
  Element,
  ElementDefinition,
  Connection,
  PageType,
  PageTransition,
  RequiredRole,
  Page,
  RouterConfig,
  ToolStatus,
  ToolVisibility,
  Tool,
  Viewport,
  // SelectionBox - SKIP: conflicts with SelectionBox component from molecules
  CanvasMode,
  PanelState,
  ConnectionDraft,
  HiveLabState,
  HiveLabAction,
  ToolTemplate,
  Position,
  Size,
  BoundingBox,
  ConnectionPath
} from "./src/types/hivelab.types";

export { DATA_TYPE_COLORS, getPrimaryType } from "./src/types/hivelab.types";
