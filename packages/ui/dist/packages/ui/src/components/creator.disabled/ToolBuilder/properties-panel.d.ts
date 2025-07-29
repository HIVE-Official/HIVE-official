import React from "react";
import type { Element, ElementInstance } from "@hive/core";
interface PropertiesPanelProps {
    selectedInstance: ElementInstance | null;
    element: Element | null;
    onConfigChange: (instanceId: string, newConfig: any) => void;
    onInstanceUpdate: (instanceId: string, updates: Partial<ElementInstance>) => void;
    onDeleteInstance: (instanceId: string) => void;
    onDuplicateInstance: (instanceId: string) => void;
    className?: string;
}
export declare const PropertiesPanel: React.FC<PropertiesPanelProps>;
export default PropertiesPanel;
//# sourceMappingURL=properties-panel.d.ts.map