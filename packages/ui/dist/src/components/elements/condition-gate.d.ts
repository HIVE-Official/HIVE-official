import React from 'react';
import type { ConditionGateConfigSchema } from '@hive/core';
import { z } from 'zod';
type ConditionGateConfig = z.infer<typeof ConditionGateConfigSchema>;
interface ConditionGateProps {
    config: ConditionGateConfig;
    children: React.ReactNode;
    toolState: Record<string, any>;
    onAction?: (action: ConditionAction) => void;
    className?: string;
}
interface ConditionAction {
    type: 'show' | 'hide' | 'setValue' | 'trigger';
    targetElementId: string;
    value?: unknown;
}
interface ToolState {
    [elementId: string]: any;
}
export declare const ConditionGate: React.FC<ConditionGateProps>;
export declare const useConditionGate: (gateId: string, config: ConditionGateConfig, toolState: ToolState) => {
    isActive: boolean;
    lastEvaluation: Date;
    handleAction: (action: ConditionAction) => void;
    evaluateGate: () => boolean;
};
export default ConditionGate;
//# sourceMappingURL=condition-gate.d.ts.map