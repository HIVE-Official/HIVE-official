import React from 'react';
interface ElementInstance {
    id: string;
    elementId: string;
    config: Record<string, any>;
    position: {
        x: number;
        y: number;
    };
    size: {
        width: number;
        height: number;
    };
    rotation?: number;
    parentId?: string;
    order: number;
    isVisible: boolean;
    isLocked: boolean;
    style?: Record<string, any>;
}
interface CanvasSettings {
    width: number;
    height: number;
    backgroundColor: string;
    gridSize: number;
    showGrid: boolean;
    snapToGrid: boolean;
    zoom: number;
}
interface EnhancedDesignCanvasProps {
    elements: ElementInstance[];
    canvasSettings: CanvasSettings;
    selectedElementIds: string[];
    onElementsUpdate: (elements: ElementInstance[]) => void;
    onSelectionChange: (elementIds: string[]) => void;
    onElementDoubleClick: (elementId: string) => void;
    onCanvasSettingsChange: (settings: CanvasSettings) => void;
    className?: string;
}
export declare const EnhancedDesignCanvas: React.FC<EnhancedDesignCanvasProps>;
export default EnhancedDesignCanvas;
//# sourceMappingURL=enhanced-design-canvas.d.ts.map