/**
 * HIVE Live Tool Runtime
 * The core system for executing HIVE tools in real-time
 */
import React from 'react';
import { Tool } from '@hive/core';
export interface LiveToolRuntimeProps {
    tool?: Tool;
    toolId?: string;
    deploymentId?: string;
    spaceId?: string;
    className?: string;
    onToolLoad?: (toolId: string) => void;
    onDataSubmit?: (data: Record<string, any>) => void;
    onError?: (error: Error) => void;
    readOnly?: boolean;
    showDebugInfo?: boolean;
    enableRealtime?: boolean;
    collectUsageData?: boolean;
}
export declare const LiveToolRuntime: React.FC<LiveToolRuntimeProps>, onUpdate: (update: any) => {
    if(showDebugInfo: any): any;
}, console: any, log: any;
//# sourceMappingURL=live-tool-runtime.d.ts.map