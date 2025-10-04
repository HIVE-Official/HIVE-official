"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
const defaultTools = [
    {
        id: "poll",
        name: "Poll",
        icon: "📊",
        description: "Quick poll (2-5 options)",
    },
    {
        id: "event",
        name: "Event",
        icon: "📅",
        description: "Create an event",
    },
    {
        id: "task",
        name: "Task",
        icon: "📋",
        description: "Assign a task",
    },
    {
        id: "resource",
        name: "Resource",
        icon: "📚",
        description: "Share a resource",
    },
];
const InlineToolMenu = React.forwardRef(({ className, trigger, onToolSelect, position = "above", open: controlledOpen, onOpenChange, ...props }, ref) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const menuRef = React.useRef(null);
    // Use controlled or uncontrolled state
    const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
    const setOpen = onOpenChange || setInternalOpen;
    // Close on outside click
    React.useEffect(() => {
        if (!open)
            return;
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open, setOpen]);
    // Handle tool selection
    const handleToolClick = (toolId) => {
        onToolSelect?.(toolId);
        setOpen(false);
    };
    return (_jsxs("div", { ref: ref, className: cn("relative inline-block", className), ...props, children: [trigger && (_jsx("div", { onClick: () => setOpen(!open), children: trigger })), open && (_jsxs("div", { ref: menuRef, className: cn("absolute z-50 w-64 rounded-lg border border-white/8 bg-[#0c0c0c] shadow-lg", position === "above"
                    ? "bottom-full left-0 mb-2"
                    : "top-full left-0 mt-2", "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2"), children: [_jsxs("div", { className: "px-3 py-2 border-b border-white/8", children: [_jsx("h4", { className: "text-xs font-semibold text-white", children: "Quick Tools" }), _jsx("p", { className: "text-[10px] text-white/70", children: "Create polls, events, tasks, and more" })] }), _jsx("div", { className: "grid grid-cols-2 gap-2 p-2", children: defaultTools.map((tool) => (_jsxs("button", { onClick: () => handleToolClick(tool.id), className: cn("flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg", "border border-white/8 bg-[#000000]", "hover:bg-white/10 hover:border-white/20 transition-all", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20", "group"), children: [_jsx("span", { className: "text-2xl group-hover:scale-110 transition-transform", children: tool.icon }), _jsx("span", { className: "text-xs font-medium text-white", children: tool.name })] }, tool.id))) }), _jsx("div", { className: "px-3 py-2 border-t border-white/8 bg-white/5", children: _jsxs("p", { className: "text-[10px] text-white/70 text-center", children: ["Tip: Type ", _jsx("code", { className: "bg-[#000000] px-1 rounded", children: "/poll" }), " or", " ", _jsx("code", { className: "bg-[#000000] px-1 rounded", children: "/event" }), " for quick access"] }) })] }))] }));
});
InlineToolMenu.displayName = "InlineToolMenu";
export { InlineToolMenu };
//# sourceMappingURL=inline-tool-menu.js.map