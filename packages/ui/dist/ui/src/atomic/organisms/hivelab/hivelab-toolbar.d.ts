/**
 * HiveLab Toolbar Component
 *
 * Top toolbar for the HiveLab builder with file operations, undo/redo,
 * zoom controls, and tool actions.
 */
export interface HiveLabToolbarProps {
    /** Current tool name */
    toolName?: string;
    /** Can undo? */
    canUndo?: boolean;
    /** Can redo? */
    canRedo?: boolean;
    /** Current zoom level */
    zoom?: number;
    /** Is tool saved? */
    isSaved?: boolean;
    /** Is tool running (preview)? */
    isRunning?: boolean;
    /** Show grid? */
    showGrid?: boolean;
    /** Undo handler */
    onUndo?: () => void;
    /** Redo handler */
    onRedo?: () => void;
    /** Save handler */
    onSave?: () => void;
    /** Run/preview handler */
    onRun?: () => void;
    /** Settings handler */
    onSettings?: () => void;
    /** Export handler */
    onExport?: () => void;
    /** Import handler */
    onImport?: () => void;
    /** Delete handler */
    onDelete?: () => void;
    /** Duplicate handler */
    onDuplicate?: () => void;
    /** Zoom in handler */
    onZoomIn?: () => void;
    /** Zoom out handler */
    onZoomOut?: () => void;
    /** Zoom to fit handler */
    onZoomToFit?: () => void;
    /** Toggle grid handler */
    onToggleGrid?: () => void;
    /** View code handler */
    onViewCode?: () => void;
    /** View docs handler */
    onViewDocs?: () => void;
    /** Additional class names */
    className?: string;
}
export declare function HiveLabToolbar({ toolName, canUndo, canRedo, zoom, isSaved, isRunning, showGrid, onUndo, onRedo, onSave, onRun, onSettings, onExport, onImport, onDelete, onDuplicate, onZoomIn, onZoomOut, onZoomToFit, onToggleGrid, onViewCode, onViewDocs, className, }: HiveLabToolbarProps): import("react/jsx-runtime").JSX.Element;
export declare namespace HiveLabToolbar {
    var displayName: string;
}
//# sourceMappingURL=hivelab-toolbar.d.ts.map