import { type ElementDefinition } from '../../../lib/hivelab/element-system';
export interface HiveLabElementPaletteProps {
    onDragStart?: (element: ElementDefinition) => void;
    onInsert?: (element: ElementDefinition) => void;
}
export declare function HiveLabElementPalette({ onDragStart, onInsert }: HiveLabElementPaletteProps): import("react/jsx-runtime").JSX.Element;
export declare namespace HiveLabElementPalette {
    var displayName: string;
}
//# sourceMappingURL=hivelab-element-palette.d.ts.map