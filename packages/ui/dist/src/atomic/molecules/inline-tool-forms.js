"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../atoms/button";
import { Input } from "../atoms/input";
import { Textarea } from "../atoms/textarea";
import { Label } from "../atoms/label";
export const InlineEventForm = React.forwardRef(({ onSubmit, onCancel, className }, ref) => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [startDate, setStartDate] = React.useState("");
    const [startTime, setStartTime] = React.useState("");
    const [location, setLocation] = React.useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !startDate || !startTime)
            return;
        onSubmit({ title, description, startDate, startTime, location });
    };
    return (_jsxs("div", { ref: ref, className: cn("rounded-lg border border-white/10 bg-[#0c0c0c] p-4", className), children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("h3", { className: "text-sm font-semibold text-white flex items-center gap-2", children: [_jsx("span", { children: "\uD83D\uDCC5" }), " Create Event"] }), _jsx(Button, { variant: "ghost", size: "icon", onClick: onCancel, className: "h-6 w-6", children: _jsx(X, { className: "h-4 w-4" }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "event-title", className: "text-xs", children: "Title *" }), _jsx(Input, { id: "event-title", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Weekly build session", required: true, className: "mt-1" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "event-date", className: "text-xs", children: "Date *" }), _jsx(Input, { id: "event-date", type: "date", value: startDate, onChange: (e) => setStartDate(e.target.value), required: true, className: "mt-1" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "event-time", className: "text-xs", children: "Time *" }), _jsx(Input, { id: "event-time", type: "time", value: startTime, onChange: (e) => setStartTime(e.target.value), required: true, className: "mt-1" })] })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "event-location", className: "text-xs", children: "Location" }), _jsx(Input, { id: "event-location", value: location, onChange: (e) => setLocation(e.target.value), placeholder: "Davis Hall Lab 101", className: "mt-1" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "event-description", className: "text-xs", children: "Description" }), _jsx(Textarea, { id: "event-description", value: description, onChange: (e) => setDescription(e.target.value), placeholder: "Hands-on work on competition bot...", rows: 2, className: "mt-1" })] }), _jsxs("div", { className: "flex gap-2 pt-2", children: [_jsx(Button, { type: "submit", size: "sm", className: "flex-1 bg-[#FFD700] text-black hover:bg-[#FFD700]/90", children: "Create Event" }), _jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: onCancel, children: "Cancel" })] })] })] }));
});
InlineEventForm.displayName = "InlineEventForm";
export const InlinePollForm = React.forwardRef(({ onSubmit, onCancel, className }, ref) => {
    const [question, setQuestion] = React.useState("");
    const [options, setOptions] = React.useState(["", ""]);
    const addOption = () => {
        if (options.length < 5) {
            setOptions([...options, ""]);
        }
    };
    const updateOption = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };
    const removeOption = (index) => {
        if (options.length > 2) {
            setOptions(options.filter((_, i) => i !== index));
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const validOptions = options.filter(opt => opt.trim());
        if (!question || validOptions.length < 2)
            return;
        onSubmit({ question, options: validOptions });
    };
    return (_jsxs("div", { ref: ref, className: cn("rounded-lg border border-white/10 bg-[#0c0c0c] p-4", className), children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("h3", { className: "text-sm font-semibold text-white flex items-center gap-2", children: [_jsx("span", { children: "\uD83D\uDCCA" }), " Create Poll"] }), _jsx(Button, { variant: "ghost", size: "icon", onClick: onCancel, className: "h-6 w-6", children: _jsx(X, { className: "h-4 w-4" }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "poll-question", className: "text-xs", children: "Question *" }), _jsx(Input, { id: "poll-question", value: question, onChange: (e) => setQuestion(e.target.value), placeholder: "What time works best for the meeting?", required: true, className: "mt-1" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { className: "text-xs", children: "Options (2-5) *" }), options.map((option, index) => (_jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { value: option, onChange: (e) => updateOption(index, e.target.value), placeholder: `Option ${index + 1}`, required: true, className: "flex-1" }), options.length > 2 && (_jsx(Button, { type: "button", variant: "ghost", size: "icon", onClick: () => removeOption(index), className: "h-9 w-9", children: _jsx(X, { className: "h-4 w-4" }) }))] }, index))), options.length < 5 && (_jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: addOption, className: "w-full", children: "+ Add Option" }))] }), _jsxs("div", { className: "flex gap-2 pt-2", children: [_jsx(Button, { type: "submit", size: "sm", className: "flex-1 bg-[#FFD700] text-black hover:bg-[#FFD700]/90", children: "Create Poll" }), _jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: onCancel, children: "Cancel" })] })] })] }));
});
InlinePollForm.displayName = "InlinePollForm";
export const InlineTaskForm = React.forwardRef(({ onSubmit, onCancel, className }, ref) => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [dueDate, setDueDate] = React.useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title)
            return;
        onSubmit({ title, description, dueDate });
    };
    return (_jsxs("div", { ref: ref, className: cn("rounded-lg border border-white/10 bg-[#0c0c0c] p-4", className), children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("h3", { className: "text-sm font-semibold text-white flex items-center gap-2", children: [_jsx("span", { children: "\uD83D\uDCCB" }), " Create Task"] }), _jsx(Button, { variant: "ghost", size: "icon", onClick: onCancel, className: "h-6 w-6", children: _jsx(X, { className: "h-4 w-4" }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "task-title", className: "text-xs", children: "Task *" }), _jsx(Input, { id: "task-title", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Clean common room", required: true, className: "mt-1" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "task-due", className: "text-xs", children: "Due Date" }), _jsx(Input, { id: "task-due", type: "date", value: dueDate, onChange: (e) => setDueDate(e.target.value), className: "mt-1" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "task-description", className: "text-xs", children: "Description" }), _jsx(Textarea, { id: "task-description", value: description, onChange: (e) => setDescription(e.target.value), placeholder: "Details about the task...", rows: 2, className: "mt-1" })] }), _jsxs("div", { className: "flex gap-2 pt-2", children: [_jsx(Button, { type: "submit", size: "sm", className: "flex-1 bg-[#FFD700] text-black hover:bg-[#FFD700]/90", children: "Create Task" }), _jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: onCancel, children: "Cancel" })] })] })] }));
});
InlineTaskForm.displayName = "InlineTaskForm";
export const InlineResourceForm = React.forwardRef(({ onSubmit, onCancel, className }, ref) => {
    const [title, setTitle] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [type, setType] = React.useState("link");
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || (type === "link" && !url))
            return;
        onSubmit({ title, url, description });
    };
    return (_jsxs("div", { ref: ref, className: cn("rounded-lg border border-white/10 bg-[#0c0c0c] p-4", className), children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("h3", { className: "text-sm font-semibold text-white flex items-center gap-2", children: [_jsx("span", { children: "\uD83D\uDCDA" }), " Add Resource"] }), _jsx(Button, { variant: "ghost", size: "icon", onClick: onCancel, className: "h-6 w-6", children: _jsx(X, { className: "h-4 w-4" }) })] }), _jsxs("form", { onSubmit: handleSubmit, className: "space-y-3", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "resource-title", className: "text-xs", children: "Title *" }), _jsx(Input, { id: "resource-title", value: title, onChange: (e) => setTitle(e.target.value), placeholder: "Study guide", required: true, className: "mt-1" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "resource-url", className: "text-xs", children: "Link or URL *" }), _jsx(Input, { id: "resource-url", type: "url", value: url, onChange: (e) => setUrl(e.target.value), placeholder: "https://...", required: true, className: "mt-1" })] }), _jsxs("div", { children: [_jsx(Label, { htmlFor: "resource-description", className: "text-xs", children: "Description" }), _jsx(Textarea, { id: "resource-description", value: description, onChange: (e) => setDescription(e.target.value), placeholder: "What is this resource for?", rows: 2, className: "mt-1" })] }), _jsxs("div", { className: "flex gap-2 pt-2", children: [_jsx(Button, { type: "submit", size: "sm", className: "flex-1 bg-[#FFD700] text-black hover:bg-[#FFD700]/90", children: "Add Resource" }), _jsx(Button, { type: "button", variant: "outline", size: "sm", onClick: onCancel, children: "Cancel" })] })] })] }));
});
InlineResourceForm.displayName = "InlineResourceForm";
//# sourceMappingURL=inline-tool-forms.js.map