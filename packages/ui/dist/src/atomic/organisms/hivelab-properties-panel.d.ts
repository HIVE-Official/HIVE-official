import * as React from "react";
import type { CanvasElement } from "./hivelab-builder-canvas";
export interface HiveLabPropertiesPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Selected element */
    selectedElement?: CanvasElement | null;
    /** Property change handler */
    onPropertyChange?: (property: string, value: any) => void;
    /** Delete element handler */
    onDeleteElement?: () => void;
}
declare const HiveLabPropertiesPanel: React.ForwardRefExoticComponent<HiveLabPropertiesPanelProps & React.RefAttributes<HTMLDivElement>>;
export { HiveLabPropertiesPanel };
//# sourceMappingURL=hivelab-properties-panel.d.ts.map