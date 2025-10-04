"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Calendar, BarChart3, CheckSquare, FileText } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";
export const InlineToolsWidget = React.forwardRef(({ isLeader = false, isNewMember = false, onCreateEvent, onCreatePoll, onCreateTask, onUploadResource }, ref) => {
    const tools = [
        {
            id: "event",
            icon: Calendar,
            label: "Event",
            emoji: "📅",
            description: "Create event",
            onClick: onCreateEvent,
            disabled: !isLeader,
            tooltip: isLeader ? "Create space event" : "Leaders only"
        },
        {
            id: "poll",
            icon: BarChart3,
            label: "Poll",
            emoji: "📊",
            description: "Quick poll",
            onClick: onCreatePoll,
            disabled: false,
            tooltip: "Create a poll"
        },
        {
            id: "task",
            icon: CheckSquare,
            label: "Task",
            emoji: "📋",
            description: "Assign task",
            onClick: onCreateTask,
            disabled: !isLeader,
            tooltip: isLeader ? "Assign a task" : "Leaders only"
        },
        {
            id: "resource",
            icon: FileText,
            label: "Resource",
            emoji: "📚",
            description: "Upload file",
            onClick: onUploadResource,
            disabled: isNewMember,
            tooltip: isNewMember ? "Available after 7 days" : "Upload or link resource"
        }
    ];
    return (_jsx("div", { ref: ref, className: "grid grid-cols-2 gap-2", children: tools.map((tool) => {
            const Icon = tool.icon;
            return (_jsxs(Button, { variant: "outline", size: "sm", disabled: tool.disabled, onClick: tool.onClick, className: cn("flex flex-col items-center gap-1.5 h-auto py-3 transition-all duration-200", !tool.disabled && "hover:border-[#FFD700]/50 hover:bg-[#FFD700]/5"), title: tool.tooltip, children: [_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "text-base", children: tool.emoji }), _jsx(Icon, { className: "h-3.5 w-3.5" })] }), _jsx("span", { className: "text-xs font-medium", children: tool.label })] }, tool.id));
        }) }));
});
InlineToolsWidget.displayName = "InlineToolsWidget";
//# sourceMappingURL=inline-tools-widget.js.map