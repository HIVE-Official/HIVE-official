import React from "react";
import type { Tool, Element } from "@hive/core";
interface ToolPreviewProps {
    tool: Tool;
    elements: Map<string, Element>;
    className?: string;
    onShare?: () => void;
    onSettings?: () => void;
}
export declare const ToolPreview: React.FC<ToolPreviewProps>;
export default ToolPreview;
//# sourceMappingURL=tool-preview.d.ts.map