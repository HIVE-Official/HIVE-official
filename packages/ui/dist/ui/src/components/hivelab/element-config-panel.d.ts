/**
 * HIVE Element Configuration Panel
 * Properties panel for editing element configurations
 */
import React from 'react';
import { ElementInstance, Element } from '@hive/core';
interface ElementConfigPanelProps {
    element: ElementInstance | null;
    elementDefinition: Element | null;
    onChange: (config: any) => void;
    onClose?: () => void;
}
export declare const ElementConfigPanel: React.FC<ElementConfigPanelProps>;
export {};
//# sourceMappingURL=element-config-panel.d.ts.map