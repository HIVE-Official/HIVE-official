import React from "react";
import type { Tool, Element, ElementInstance } from "@hive/core";
interface DesignCanvasProps {
    tool: Tool;
    elements: Map<string, Element>;
    selectedElementId: string | null;
    deviceMode: "desktop" | "tablet" | "mobile";
    onElementSelect: (elementId: string | null) => void;
    onElementUpdate: (elementId: string, updates: Partial<ElementInstance>) => void;
    onElementDelete: (elementId: string) => void;
    onElementDuplicate: (elementId: string) => void;
    _onElementAdd: (elementId: string, position: {
        x: number;
        y: number;
    }) => void;
    className?: string;
}
export declare const DesignCanvas: React.ForwardRefExoticComponent<DesignCanvasProps & React.RefAttributes<HTMLDivElement>>;
export default DesignCanvas;
//# sourceMappingURL=design-canvas.d.ts.map