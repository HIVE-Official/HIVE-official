import * as React from "react";
import type { Element } from "./hivelab-element-library";
export interface CanvasElement extends Element {
    x: number;
    y: number;
    canvasId: string;
    connections?: {
        to: string;
        fromPort: string;
        toPort: string;
    }[];
}
export interface HiveLabBuilderCanvasProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Elements placed on canvas */
    elements?: CanvasElement[];
    /** Element added to canvas */
    onElementAdd?: (element: CanvasElement) => void;
    /** Element removed from canvas */
    onElementRemove?: (canvasId: string) => void;
    /** Element moved */
    onElementMove?: (canvasId: string, x: number, y: number) => void;
    /** Element selected */
    onElementSelect?: (canvasId: string | null) => void;
    /** Selected element ID */
    selectedElementId?: string | null;
    /** Test mode handler */
    onTestTool?: () => void;
    /** Clear canvas */
    onClearCanvas?: () => void;
    /** Tool name */
    toolName?: string;
}
declare const HiveLabBuilderCanvas: React.ForwardRefExoticComponent<HiveLabBuilderCanvasProps & React.RefAttributes<HTMLDivElement>>;
export { HiveLabBuilderCanvas };
//# sourceMappingURL=hivelab-builder-canvas.d.ts.map