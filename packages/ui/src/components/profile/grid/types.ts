import type { LucideIcon } from "lucide-react";
import type { ComponentType } from "react";

// Core tile layout position and size
export interface TileLayout {
  id: string;
  x: number; // Grid column position (0-based)
  y: number; // Grid row position (0-based)
  width: number;
  height: number;
  isVisible: boolean;
  isPinned: boolean;
}

// Tile metadata and configuration
export interface TileMeta {
  id: string;
  name: string;
  description: string;
  category:
    | "system"
    | "academic"
    | "housing"
    | "community"
    | "activity"
    | "Profile"
    | "Academic"
    | "Housing"
    | "Community"
    | "Activity";
  defaultSize: TileSize;
  minSize: TileSize;
  maxSize: TileSize;
  isResizable: boolean;
  isHideable: boolean;
  isMandatory: boolean;
  builderOnly: boolean;
  component: string;
}

// Tile component props interface
export interface TileProps {
  user: Record<string, unknown>;
  layout?: TileLayout;
  isEditing?: boolean;
}

// Tile event system
export interface TileEvent {
  type: string;
  data?: Record<string, unknown>;
}

// Complete tile data combining meta + component
export interface TileData {
  user: Record<string, unknown>;
  [key: string]: unknown;
}

// Grid state management
export interface GridState {
  layout: TileLayout[];
  history: TileLayout[][];
  currentHistoryIndex: number;
}

// Layout update operations
export interface LayoutUpdate {
  x?: number;
  y?: number;
  w?: number;
  h?: number;
}

// Persistence format
export interface PersistedLayout {
  userId: string;
  layout: Array<{
    tileId: string;
    x: number;
    y: number;
    w: number;
    h: number;
    hidden?: boolean;
  }>;
  lastModified: string;
}

// Drag and resize handles
export type ResizeHandle = "nw" | "ne" | "sw" | "se" | "n" | "s" | "e" | "w";

// Mobile size presets
export type MobileSizePreset = "small" | "medium" | "large";

export interface MobileSizeConfig {
  small: { w: number; h: number };
  medium: { w: number; h: number };
  large: { w: number; h: number };
}

export interface TileSize {
  width: number;
  height: number;
}
