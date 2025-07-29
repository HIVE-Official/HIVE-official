import React from "react";
import type { ElementInstance } from "@hive/core";
export interface ToolRuntimeState {
    toolId: string;
    spaceId: string;
    userId: string;
    elements: {
        [instanceId: string]: {
            value?: any;
            visible: boolean;
            disabled?: boolean;
            style?: React.CSSProperties;
            data?: Record<string, any>;
            lastUpdated: string;
        };
    };
    metadata: {
        createdAt: string;
        updatedAt: string;
        version: string;
        sessionId: string;
    };
}
interface StateManagerContext {
    state: ToolRuntimeState | null;
    loading: boolean;
    error: string | null;
    lastSynced: string | null;
    updateElement: (instanceId: string, newState: any) => void;
    bulkUpdate: (updates: Record<string, any>) => void;
    resetElement: (instanceId: string) => void;
    toggleVisibility: (instanceId: string, visible: boolean) => void;
    saveState: () => Promise<void>;
    loadState: () => Promise<void>;
    resetState: () => Promise<void>;
}
declare const StateManagerContext: React.Context<StateManagerContext>;
interface ElementStateManagerProps {
    toolId: string;
    spaceId: string;
    userId: string;
    instances: ElementInstance[];
    children: React.ReactNode;
    enablePersistence?: boolean;
    autoSaveInterval?: number;
}
export declare const ElementStateManager: React.FC<ElementStateManagerProps>;
export declare const useElementState: () => StateManagerContext;
export declare const useElementInstanceState: (instanceId: string) => {
    updateState: (newState: any) => void;
    value?: any;
    visible: boolean;
    disabled?: boolean;
    style?: React.CSSProperties;
    data?: Record<string, any>;
    lastUpdated: string;
};
export declare const useConditionalLogic: (instances: ElementInstance[]) => {
    evaluateConditions: () => void;
};
export default ElementStateManager;
//# sourceMappingURL=element-state-manager.d.ts.map