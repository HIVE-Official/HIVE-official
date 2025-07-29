import React from "react";
import type { ElementInstance } from "@hive/core";
interface ElementRuntimeState {
    [instanceId: string]: {
        value?: any;
        visible: boolean;
        disabled?: boolean;
        style?: React.CSSProperties;
        data?: Record<string, any>;
    };
}
interface ElementRuntimeProps {
    instances: ElementInstance[];
    onStateChange?: (instanceId: string, newState: any) => void;
    onAction?: (instanceId: string, action: string, data?: any) => void;
    initialState?: ElementRuntimeState;
    className?: string;
}
export declare const ElementRuntimeRenderer: React.FC<ElementRuntimeProps>;
export default ElementRuntimeRenderer;
//# sourceMappingURL=element-runtime-renderer.d.ts.map