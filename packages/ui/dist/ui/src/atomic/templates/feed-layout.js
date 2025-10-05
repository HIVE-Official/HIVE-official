"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
const FeedLayout = React.forwardRef(({ className, header, children, sidebar, layoutMode = "centered", ...props }, ref) => {
    if (layoutMode === "sidebar") {
        // Feed with right sidebar (trending, suggestions)
        return (_jsxs("div", { ref: ref, className: cn("flex flex-col min-h-screen bg-[#000000]", className), ...props, children: [header && (_jsx("div", { className: "sticky top-16 z-40 border-b border-white/8 bg-[#0c0c0c]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0c0c0c]/80", children: header })), _jsxs("div", { className: "flex gap-6 w-full max-w-7xl mx-auto p-6 flex-col lg:flex-row", children: [_jsx("div", { className: "flex-[7] min-w-0", children: children }), sidebar && (_jsx("div", { className: "flex-[3] space-y-4 min-w-0 lg:sticky lg:top-24 lg:self-start lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto", children: sidebar }))] })] }));
    }
    // Centered feed (no sidebar - default)
    return (_jsxs("div", { ref: ref, className: cn("flex flex-col min-h-screen bg-[#000000]", className), ...props, children: [header && (_jsx("div", { className: "sticky top-16 z-40 border-b border-white/8 bg-[#0c0c0c]/95 backdrop-blur supports-[backdrop-filter]:bg-[#0c0c0c]/80", children: header })), _jsx("div", { className: "w-full max-w-2xl mx-auto p-6", children: children })] }));
});
FeedLayout.displayName = "FeedLayout";
export { FeedLayout };
//# sourceMappingURL=feed-layout.js.map