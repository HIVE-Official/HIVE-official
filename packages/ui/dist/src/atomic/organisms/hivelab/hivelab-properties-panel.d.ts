/**
 * HiveLab Properties Panel
 *
 * Floating panel for configuring selected element properties.
 * Shows element info, configuration fields, port connections, and actions.
 */
import type { Element } from '@/types/hivelab.types';
export interface HiveLabPropertiesPanelProps {
    /** Selected element (null if nothing selected) */
    selectedElement: Element | null;
    /** All elements (for connection mapping) */
    allElements?: Element[];
    /** Property change handler */
    onPropertyChange?: (property: string, value: any) => void;
    /** Delete element handler */
    onDeleteElement?: () => void;
    /** Duplicate element handler */
    onDuplicateElement?: () => void;
    /** Panel position */
    position?: 'left' | 'right';
    /** Panel width */
    width?: number;
    /** Is panel collapsed? */
    isCollapsed?: boolean;
    /** Collapse handler */
    onToggleCollapse?: () => void;
    /** Close handler */
    onClose?: () => void;
    /** Additional class names */
    className?: string;
}
export declare function HiveLabPropertiesPanel({ selectedElement, allElements, onPropertyChange, onDeleteElement, onDuplicateElement, position, width, isCollapsed, onToggleCollapse, onClose, className, }: HiveLabPropertiesPanelProps): import("react/jsx-runtime").JSX.Element;
export declare namespace HiveLabPropertiesPanel {
    var displayName: string;
}
//# sourceMappingURL=hivelab-properties-panel.d.ts.map