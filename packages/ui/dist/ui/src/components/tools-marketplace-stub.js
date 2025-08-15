import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * HIVE Tools Marketplace Stub
 * Temporary components for tools ecosystem
 */
import React from 'react';
import { HiveCard } from './hive-card';
export const ToolMarketplace = ({ className, children }) => {
    return (_jsx(HiveCard, { className: className, variant: "elevated", children: _jsxs("div", { className: "p-6 text-center", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-2", children: "Tool Marketplace" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: "Coming soon - Discover and install tools built by the HIVE community" }), children] }) }));
};
export const LiveToolRuntime = ({ toolId, className, onToolLoad }) => {
    React.useEffect(() => {
        if (toolId && onToolLoad) {
            onToolLoad(toolId);
        }
    }, [toolId, onToolLoad]);
    return (_jsx(HiveCard, { className: className, variant: "elevated", children: _jsxs("div", { className: "p-6 text-center", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-2", children: "Live Tool Runtime" }), _jsx("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: toolId ? `Loading tool: ${toolId}` : 'Ready to execute HIVE tools' })] }) }));
};
//# sourceMappingURL=tools-marketplace-stub.js.map