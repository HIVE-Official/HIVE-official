"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Temporary stub component for ToolMarketplace
export function ToolMarketplace({ className }) {
    return (_jsx("div", { className: `flex items-center justify-center min-h-[400px] bg-[var(--hive-background-primary)] ${className || ''}`, children: _jsxs("div", { className: "text-center max-w-md", children: [_jsx("div", { className: "w-16 h-16 bg-[var(--hive-color-accent-primary)] rounded-2xl flex items-center justify-center mx-auto mb-6", children: _jsx("span", { className: "text-2xl", children: "\uD83D\uDEE0\uFE0F" }) }), _jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Tool Marketplace" }), _jsx("p", { className: "text-[var(--hive-text-secondary)] mb-6", children: "Discover and install tools created by your campus community." }), _jsx("p", { className: "text-xs text-[var(--hive-text-tertiary)]", children: "Full marketplace interface coming soon in v1.1" })] }) }));
}
// Temporary stub component for LiveToolRuntime
export function LiveToolRuntime({ toolId, className }) {
    return (_jsx("div", { className: `flex items-center justify-center min-h-[400px] bg-[var(--hive-background-primary)] ${className || ''}`, children: _jsxs("div", { className: "text-center max-w-md", children: [_jsx("div", { className: "w-16 h-16 bg-[var(--hive-color-accent-primary)] rounded-2xl flex items-center justify-center mx-auto mb-6", children: _jsx("span", { className: "text-2xl", children: "\u26A1" }) }), _jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)] mb-4", children: "Tool Runtime" }), _jsxs("p", { className: "text-[var(--hive-text-secondary)] mb-4", children: ["Running tool: ", toolId] }), _jsx("p", { className: "text-xs text-[var(--hive-text-tertiary)]", children: "Live tool execution coming soon in v1.1" })] }) }));
}
//# sourceMappingURL=tools-marketplace-stub.js.map