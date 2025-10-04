/**
 * Data Type Badge Component
 *
 * Small badge showing data type with color-coding and optional icon.
 * Used in properties panels, port labels, and element configuration.
 */
import type { DataType } from '@/types/hivelab.types';
export interface DataTypeBadgeProps {
    /** Data type */
    type: DataType | DataType[];
    /** Show icon */
    showIcon?: boolean;
    /** Show label text */
    showLabel?: boolean;
    /** Badge size */
    size?: 'sm' | 'md' | 'lg';
    /** Badge variant */
    variant?: 'default' | 'outline' | 'subtle';
    /** Additional class names */
    className?: string;
}
export declare function DataTypeBadge({ type, showIcon, showLabel, size, variant, className, }: DataTypeBadgeProps): import("react/jsx-runtime").JSX.Element;
export declare namespace DataTypeBadge {
    var displayName: string;
}
//# sourceMappingURL=data-type-badge.d.ts.map