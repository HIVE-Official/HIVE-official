import React from "react";
import type { Tool } from "@hive/core";
interface JsonViewerProps {
    tool: Tool;
    onImport?: (data: Tool) => void;
    className?: string;
    readOnly?: boolean;
}
export declare const JsonViewer: React.FC<JsonViewerProps>;
export default JsonViewer;
//# sourceMappingURL=json-viewer.d.ts.map