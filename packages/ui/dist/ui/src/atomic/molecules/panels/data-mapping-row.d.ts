/**
 * Data Mapping Row Component
 *
 * Shows a single data mapping/connection between element ports.
 * Used in properties panel to visualize how data flows through elements.
 */
import type { Port } from '@/types/hivelab.types';
export interface DataMappingRowProps {
    /** Source port */
    sourcePort: Port;
    /** Target port */
    targetPort: Port;
    /** Source element name */
    sourceElementName: string;
    /** Is this mapping selected? */
    isSelected?: boolean;
    /** Can this mapping be removed? */
    removable?: boolean;
    /** Click handler */
    onClick?: () => void;
    /** Remove handler */
    onRemove?: () => void;
    /** Additional class names */
    className?: string;
}
export declare function DataMappingRow({ sourcePort, targetPort, sourceElementName, isSelected, removable, onClick, onRemove, className, }: DataMappingRowProps): import("react/jsx-runtime").JSX.Element;
export declare namespace DataMappingRow {
    var displayName: string;
}
//# sourceMappingURL=data-mapping-row.d.ts.map