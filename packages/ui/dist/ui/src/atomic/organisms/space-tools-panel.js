"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { Calendar, BarChart3, ListTodo, FileText, Wrench, Plus, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils.js";
import { Button } from "../atoms/button.js";
import { Card } from "../atoms/card.js";
import { Badge } from "../atoms/badge.js";
const defaultToolsData = [
    {
        id: "event",
        name: "Event",
        icon: "📅",
        description: "Create an event",
        permissions: "leaders",
    },
    {
        id: "poll",
        name: "Poll",
        icon: "📊",
        description: "Quick poll (2-5 options)",
        permissions: "all",
    },
    {
        id: "task",
        name: "Task",
        icon: "📋",
        description: "Assign task with deadline",
        permissions: "leaders",
    },
    {
        id: "resource",
        name: "Resource",
        icon: "📚",
        description: "Upload or link resource",
        permissions: "all",
    },
];
const getIconComponent = (iconName) => {
    const icons = {
        Calendar,
        BarChart3,
        ListTodo,
        FileText,
        Wrench,
        Sparkles,
    };
    return icons[iconName] || Wrench;
};
const SpaceToolsPanel = React.forwardRef(({ className, defaultTools = defaultToolsData, customTools = [], isLeader = false, onToolClick, onManageTools, onCreateTool, isLoading = false, ...props }, ref) => {
    const hasCustomTools = customTools.length > 0;
    return (_jsxs(Card, { ref: ref, className: cn("p-4", className), ...props, children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Wrench, { className: "w-4 h-4 text-white/70" }), _jsx("h3", { className: "text-sm font-semibold text-white", children: "Tools" })] }), isLeader && onManageTools && (_jsxs(Button, { variant: "ghost", size: "sm", className: "h-7 text-xs", onClick: onManageTools, children: [_jsx(Wrench, { className: "w-3 h-3 mr-1" }), "Manage"] }))] }), isLoading ? (_jsx("div", { className: "space-y-2", children: [...Array(4)].map((_, i) => (_jsx("div", { className: "h-16 rounded-md bg-white/5 animate-pulse" }, i))) })) : (_jsxs(_Fragment, { children: [_jsx("div", { className: "grid grid-cols-2 gap-2 mb-3", children: defaultTools.map((tool) => (_jsxs("button", { onClick: () => onToolClick?.(tool), className: cn("flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg", "border border-white/8 bg-[#000000]", "hover:bg-white/10 hover:border-white/20 transition-all", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20", "group"), children: [_jsx("span", { className: "text-2xl group-hover:scale-110 transition-transform", children: tool.icon }), _jsx("span", { className: "text-xs font-medium text-white", children: tool.name }), tool.permissions === "leaders" && (_jsx(Badge, { variant: "sophomore", className: "text-[10px] h-4 px-1", children: "Leaders" }))] }, tool.id))) }), hasCustomTools && (_jsxs("div", { className: "border-t border-white/8 pt-3 mt-3", children: [_jsxs("div", { className: "flex items-center gap-2 mb-3", children: [_jsx(Sparkles, { className: "w-3 h-3 text-white/70" }), _jsx("h4", { className: "text-xs font-semibold text-white/70", children: "Custom Tools" })] }), _jsx("div", { className: "space-y-2", children: customTools.map((tool) => (_jsxs("button", { onClick: () => onToolClick?.(tool), className: cn("w-full flex items-center gap-3 p-2.5 rounded-lg", "border border-white/8 bg-[#000000]", "hover:bg-white/10 hover:border-white/20 transition-all", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20", "text-left group"), style: tool.color
                                        ? { borderLeftWidth: "3px", borderLeftColor: tool.color }
                                        : undefined, children: [_jsx("span", { className: "text-xl group-hover:scale-110 transition-transform", children: tool.icon }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "text-xs font-medium text-white truncate", children: tool.name }), tool.usageCount !== undefined && (_jsxs("div", { className: "text-[10px] text-white/70", children: [tool.usageCount, " uses"] }))] }), tool.isCustom && (_jsx(Badge, { variant: "freshman", className: "text-[10px] h-4 px-1 shrink-0", children: "Custom" }))] }, tool.id))) })] })), isLeader && onCreateTool && (_jsxs("div", { className: "border-t border-white/8 pt-3 mt-3", children: [_jsxs(Button, { variant: "outline", size: "sm", className: "w-full justify-start text-xs", onClick: onCreateTool, children: [_jsx(Plus, { className: "w-3 h-3 mr-2" }), "Create Custom Tool"] }), _jsx("p", { className: "text-[10px] text-white/70 mt-2 text-center", children: "Build tools in HiveLab" })] }))] }))] }));
});
SpaceToolsPanel.displayName = "SpaceToolsPanel";
export { SpaceToolsPanel };
//# sourceMappingURL=space-tools-panel.js.map