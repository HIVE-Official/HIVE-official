export interface GridPosition {x: number;  // Column position (0-based)
  y: number;  // Row position (0-based)}

export interface WidgetSize {width: 1 | 2;  // Grid columns (1 = half width, 2 = full width)
  height: 1 | 2; // Grid rows (1 = standard height, 2 = tall)}

export interface WidgetConfiguration {id: string;
  type: WidgetType;
  title: string;
  position: GridPosition;
  size: WidgetSize;
  settings: WidgetSettings;
  isVisible: boolean;}

export interface LayoutConfiguration {widgets: WidgetConfiguration[];
  gridColumns: number;
  version: number;
  lastModified: Date;
  deviceType: 'desktop' | 'tablet' | 'mobile';}

export interface WidgetSettings {displayOptions: {
    showHeader: boolean;
    customTitle?: string;
    compactMode: boolean;
    updateFrequency: 'real-time' | 'hourly' | 'manual';};
  dataFilters: {
    primarySource?: string;
    timeRange?: 'today' | 'this_week' | 'this_month';
    includeTypes?: string[];
    excludeTypes?: string[];
  };
  privacy: {
    visibility: 'public' | 'community' | 'friends' | 'private';
    dataSharing: boolean;
  };
}

export type WidgetType = 
  | 'social-avatar'
  | 'priority-coordination' 
  | 'community-coordination'
  | 'social-calendar'
  | 'privacy-control'
  | 'personal-tools'
  | 'profile-stats'
  | 'campus-connections';

export interface BaseWidgetProps {id: string;
  title: string;
  size: WidgetSize;
  position: GridPosition;
  settings: WidgetSettings;
  isEditing: boolean;
  isDragging?: boolean;
  onSettingsChange: (settings: WidgetSettings) => void;
  onSizeChange: (size: WidgetSize) => void;
  onPositionChange: (position: GridPosition) => void;
  onRemove?: () => void;}

export interface DragDropState {draggedWidget: string | null;
  dragOffset: { x: number; y: number};
  dropZones: DropZone[];
  isValidDrop: boolean;
}

export interface DropZone {position: GridPosition;
  size: WidgetSize;
  isOccupied: boolean;
  isValid: boolean;}

export interface GridLayoutProps {widgets: WidgetConfiguration[];
  isEditing: boolean;
  isMobile?: boolean;
  isTablet?: boolean;
  onLayoutChange: (widgets: WidgetConfiguration[]) => void;
  onWidgetSettings: (widgetId: string, settings: WidgetSettings) => void;
  onAddWidget: (type: WidgetType) => void;
  onRemoveWidget: (widgetId: string) => void;}

export interface LayoutPersistenceState {layouts: Record<string, LayoutConfiguration>; // keyed by deviceType;
  unsavedChanges: boolean;
  lastSync: Date | null;
  syncStatus: 'idle' | 'syncing' | 'error' | 'success';}

export interface CoordinationOpportunity {id: string;
  type: 'urgent' | 'today' | 'this_week';
  source: 'calendar' | 'community' | 'social' | 'personal';
  title: string;
  description: string;
  deadline?: Date;
  actions: QuickAction[];
  context: CoordinationContext;
  priority: number; // 0-100 calculated score;}

export interface QuickAction {id: string;
  label: string;
  type: 'primary' | 'secondary';
  action: () => void;}

export interface CoordinationContext {communityId?: string;
  eventId?: string;
  participants?: string[];
  socialImpact: number; // 0-100
  personalRelevance: number; // 0-100}