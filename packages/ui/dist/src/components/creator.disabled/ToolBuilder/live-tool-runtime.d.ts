import React from "react";
import type { ElementInstance } from "@hive/core";
interface LiveToolRuntimeProps {
    toolId: string;
    spaceId: string;
    userId: string;
    instances: ElementInstance[];
    toolName: string;
    className?: string;
    enablePersistence?: boolean;
    enableRealTime?: boolean;
    onAction?: (instanceId: string, action: string, data?: any) => void;
}
export declare const LiveToolRuntime: React.FC<LiveToolRuntimeProps>;
export default LiveToolRuntime;
//# sourceMappingURL=live-tool-runtime.d.ts.map