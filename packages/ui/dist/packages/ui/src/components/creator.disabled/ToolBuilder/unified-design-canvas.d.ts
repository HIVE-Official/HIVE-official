import React from "react";
import type { Tool, Element, ElementInstance } from "@hive/core";
interface UnifiedDesignCanvasProps {
    tool: Tool;
    elements: Map<string, Element>;
    selectedElementId: string | null;
    deviceMode: "desktop" | "tablet" | "mobile";
    mode: "full" | "enhanced" | "simple";
    onElementSelect: (elementId: string | null) => void;
    onElementUpdate: (elementId: string, updates: Partial<ElementInstance>) => void;
    onElementDelete: (elementId: string) => void;
    onElementDuplicate: (elementId: string) => void;
    onElementAdd: (elementId: string, position: {
        x: number;
        y: number;
    }) => void;
    className?: string;
}
export declare const UnifiedDesignCanvas: React.ForwardRefExoticComponent<UnifiedDesignCanvasProps & React.RefAttributes<HTMLDivElement>>;
export default UnifiedDesignCanvas;
//# sourceMappingURL=unified-design-canvas.d.ts.map