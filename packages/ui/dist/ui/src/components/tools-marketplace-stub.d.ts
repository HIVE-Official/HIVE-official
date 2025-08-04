/**
 * HIVE Tools Marketplace Stub
 * Temporary components for tools ecosystem
 */
import React from 'react';
export interface ToolMarketplaceProps {
    className?: string;
    children?: React.ReactNode;
}
export declare const ToolMarketplace: React.FC<ToolMarketplaceProps>;
export interface LiveToolRuntimeProps {
    toolId?: string;
    className?: string;
    onToolLoad?: (toolId: string) => void;
}
export declare const LiveToolRuntime: React.FC<LiveToolRuntimeProps>;
//# sourceMappingURL=tools-marketplace-stub.d.ts.map