"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "../card";
import { Wrench } from "lucide-react";
export function DevModePanel({ userEmail }) {
    // Only render in development
    if (process.env.NODE_ENV === 'production') {
        return null;
    }
    // Temporary: Simple dev panel until dev mode functionality is implemented
    return (_jsxs(Card, { className: "fixed bottom-4 right-4 p-4 w-80 bg-zinc-900 border border-zinc-800 shadow-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Wrench, { className: "w-4 h-4" }), _jsx("h3", { className: "font-medium", children: "Developer Mode" })] }), _jsx("span", { className: "text-xs text-zinc-400", children: "Coming Soon" })] }), _jsxs("div", { className: "text-sm text-zinc-400", children: [_jsx("p", { children: "Developer tools will be available in future releases." }), _jsxs("p", { className: "mt-2", children: ["Current user: ", userEmail || 'Not logged in'] })] })] }));
}
//# sourceMappingURL=dev-mode-panel.js.map