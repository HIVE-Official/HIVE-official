/**
 * Selection Box Component
 *
 * Visual rectangle shown during multi-select drag operation.
 * Updates in real-time as the user drags to select multiple elements.
 */
import type { Position } from '@/types/hivelab.types';
export interface SelectionBoxProps {
    /** Start position of the selection (where drag began) */
    start: Position;
    /** Current position (where drag is now) */
    current: Position;
    /** Additional class names */
    className?: string;
}
export declare function SelectionBox({ start, current, className }: SelectionBoxProps): import("react/jsx-runtime").JSX.Element;
export declare namespace SelectionBox {
    var displayName: string;
}
//# sourceMappingURL=selection-box.d.ts.map