"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "../atoms/dialog.js";
import { Button } from "../atoms/button.js";
import { Input } from "../atoms/input.js";
import { Label } from "../atoms/label.js";
import { Textarea } from "../atoms/textarea.js";
import { Switch } from "../atoms/switch.js";
export const PollModal = ({ open, onOpenChange, onSubmit }) => {
    const [question, setQuestion] = React.useState("");
    const [options, setOptions] = React.useState(["", ""]);
    const [anonymous, setAnonymous] = React.useState(false);
    const [multipleChoice, setMultipleChoice] = React.useState(false);
    const [endDate, setEndDate] = React.useState("");
    const addOption = () => {
        if (options.length < 5) {
            setOptions([...options, ""]);
        }
    };
    const removeOption = (index) => {
        if (options.length > 2) {
            setOptions(options.filter((_, i) => i !== index));
        }
    };
    const updateOption = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };
    const handleSubmit = () => {
        onSubmit({
            question,
            options: options.filter(o => o.trim() !== ""),
            settings: {
                anonymous,
                multipleChoice,
                endDate: endDate || undefined,
            },
        });
        // Reset form
        setQuestion("");
        setOptions(["", ""]);
        setAnonymous(false);
        setMultipleChoice(false);
        setEndDate("");
        onOpenChange(false);
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-[500px]", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-xl", children: "\uD83D\uDCCA" }), "Create Poll"] }), _jsx(DialogDescription, { children: "Ask a question and get quick feedback from space members" })] }), _jsxs("div", { className: "space-y-4 py-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "poll-question", children: "Question" }), _jsx(Input, { id: "poll-question", placeholder: "What's your question?", value: question, onChange: (e) => setQuestion(e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Options (2-5)" }), options.map((option, index) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Input, { placeholder: `Option ${index + 1}`, value: option, onChange: (e) => updateOption(index, e.target.value) }), options.length > 2 && (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => removeOption(index), children: _jsx(Trash2, { className: "w-4 h-4" }) }))] }, index))), options.length < 5 && (_jsxs(Button, { variant: "outline", size: "sm", onClick: addOption, className: "w-full", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Add Option"] }))] }), _jsxs("div", { className: "space-y-3 border-t border-white/8 pt-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "poll-anonymous", children: "Anonymous voting" }), _jsx(Switch, { id: "poll-anonymous", checked: anonymous, onCheckedChange: setAnonymous })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "poll-multiple", children: "Multiple choice" }), _jsx(Switch, { id: "poll-multiple", checked: multipleChoice, onCheckedChange: setMultipleChoice })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "poll-end", children: "End date (optional)" }), _jsx(Input, { id: "poll-end", type: "datetime-local", value: endDate, onChange: (e) => setEndDate(e.target.value) })] })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }), _jsx(Button, { onClick: handleSubmit, disabled: !question || options.filter(o => o.trim() !== "").length < 2, children: "Create Poll" })] })] }) }));
};
export const EventModal = ({ open, onOpenChange, onSubmit }) => {
    const [title, setTitle] = React.useState("");
    const [startTime, setStartTime] = React.useState("");
    const [endTime, setEndTime] = React.useState("");
    const [location, setLocation] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [rsvpLimit, setRsvpLimit] = React.useState("");
    const quickTemplates = [
        { id: "meeting", label: "Meeting", icon: "👥" },
        { id: "social", label: "Social", icon: "🎉" },
        { id: "workshop", label: "Workshop", icon: "🛠️" },
    ];
    const applyTemplate = (template) => {
        const templates = {
            meeting: { title: "Team Meeting", description: "Regular team sync" },
            social: { title: "Social Gathering", description: "Casual hangout" },
            workshop: { title: "Workshop", description: "Learning session" },
        };
        setTitle(templates[template].title);
        setDescription(templates[template].description);
    };
    const handleSubmit = () => {
        onSubmit({
            title,
            startTime,
            endTime: endTime || undefined,
            location: location || undefined,
            description: description || undefined,
            rsvpLimit: rsvpLimit ? parseInt(rsvpLimit) : undefined,
        });
        // Reset form
        setTitle("");
        setStartTime("");
        setEndTime("");
        setLocation("");
        setDescription("");
        setRsvpLimit("");
        onOpenChange(false);
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-[600px] max-h-[90vh] overflow-y-auto", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-xl", children: "\uD83D\uDCC5" }), "Create Event"] }), _jsx(DialogDescription, { children: "Schedule an event for your space members" })] }), _jsxs("div", { className: "space-y-4 py-4", children: [_jsx("div", { className: "flex gap-2", children: quickTemplates.map((template) => (_jsxs(Button, { variant: "outline", size: "sm", onClick: () => applyTemplate(template.id), className: "flex-1", children: [_jsx("span", { className: "mr-1", children: template.icon }), template.label] }, template.id))) }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "event-title", children: ["Title ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "event-title", placeholder: "Event name", value: title, onChange: (e) => setTitle(e.target.value) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "event-start", children: ["Start Time ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "event-start", type: "datetime-local", value: startTime, onChange: (e) => setStartTime(e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "event-end", children: "End Time" }), _jsx(Input, { id: "event-end", type: "datetime-local", value: endTime, onChange: (e) => setEndTime(e.target.value) })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "event-location", children: "Location" }), _jsx(Input, { id: "event-location", placeholder: "Where is this happening?", value: location, onChange: (e) => setLocation(e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "event-description", children: "Description" }), _jsx(Textarea, { id: "event-description", placeholder: "Event details...", value: description, onChange: (e) => setDescription(e.target.value), rows: 3 })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "event-rsvp", children: "RSVP Limit (optional)" }), _jsx(Input, { id: "event-rsvp", type: "number", placeholder: "Max attendees", value: rsvpLimit, onChange: (e) => setRsvpLimit(e.target.value) })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }), _jsx(Button, { onClick: handleSubmit, disabled: !title || !startTime, children: "Create Event" })] })] }) }));
};
export const TaskModal = ({ open, onOpenChange, onSubmit }) => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [dueDate, setDueDate] = React.useState("");
    const [priority, setPriority] = React.useState("medium");
    const handleSubmit = () => {
        onSubmit({
            title,
            description: description || undefined,
            dueDate,
            priority,
        });
        // Reset form
        setTitle("");
        setDescription("");
        setDueDate("");
        setPriority("medium");
        onOpenChange(false);
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-[500px]", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-xl", children: "\uD83D\uDCCB" }), "Create Task"] }), _jsx(DialogDescription, { children: "Assign a task with a deadline to space members" })] }), _jsxs("div", { className: "space-y-4 py-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "task-title", children: ["Title ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "task-title", placeholder: "What needs to be done?", value: title, onChange: (e) => setTitle(e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "task-description", children: "Description" }), _jsx(Textarea, { id: "task-description", placeholder: "Task details...", value: description, onChange: (e) => setDescription(e.target.value), rows: 3 })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "task-due", children: ["Due Date ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "task-due", type: "datetime-local", value: dueDate, onChange: (e) => setDueDate(e.target.value) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { children: "Priority" }), _jsx("div", { className: "flex gap-2", children: ["low", "medium", "high"].map((p) => (_jsx(Button, { variant: priority === p ? "default" : "outline", size: "sm", onClick: () => setPriority(p), className: "flex-1 capitalize", children: p }, p))) })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }), _jsx(Button, { onClick: handleSubmit, disabled: !title || !dueDate, children: "Create Task" })] })] }) }));
};
export const ResourceModal = ({ open, onOpenChange, onSubmit }) => {
    const [type, setType] = React.useState("link");
    const [title, setTitle] = React.useState("");
    const [url, setUrl] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [postAnnouncement, setPostAnnouncement] = React.useState(true);
    const handleSubmit = () => {
        onSubmit({
            type,
            title,
            url: type === "link" ? url : undefined,
            description: description || undefined,
            postAnnouncement,
        });
        // Reset form
        setType("link");
        setTitle("");
        setUrl("");
        setDescription("");
        setPostAnnouncement(true);
        onOpenChange(false);
    };
    return (_jsx(Dialog, { open: open, onOpenChange: onOpenChange, children: _jsxs(DialogContent, { className: "sm:max-w-[500px]", children: [_jsxs(DialogHeader, { children: [_jsxs(DialogTitle, { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-xl", children: "\uD83D\uDCDA" }), "Add Resource"] }), _jsx(DialogDescription, { children: "Upload a file or link to a resource for your space" })] }), _jsxs("div", { className: "space-y-4 py-4", children: [_jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: type === "link" ? "default" : "outline", size: "sm", onClick: () => setType("link"), className: "flex-1", children: "\uD83D\uDD17 Link" }), _jsx(Button, { variant: type === "upload" ? "default" : "outline", size: "sm", onClick: () => setType("upload"), className: "flex-1", children: "\uD83D\uDCCE Upload" })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "resource-title", children: ["Title ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "resource-title", placeholder: "Resource name", value: title, onChange: (e) => setTitle(e.target.value) })] }), type === "link" ? (_jsxs("div", { className: "space-y-2", children: [_jsxs(Label, { htmlFor: "resource-url", children: ["URL ", _jsx("span", { className: "text-red-500", children: "*" })] }), _jsx(Input, { id: "resource-url", type: "url", placeholder: "https://...", value: url, onChange: (e) => setUrl(e.target.value) })] })) : (_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "resource-file", children: "File" }), _jsx("div", { className: "border-2 border-dashed border-white/8 rounded-lg p-6 text-center", children: _jsx("p", { className: "text-sm text-white/70", children: "Drag & drop file here or click to browse" }) })] })), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "resource-description", children: "Description" }), _jsx(Textarea, { id: "resource-description", placeholder: "What is this resource for?", value: description, onChange: (e) => setDescription(e.target.value), rows: 3 })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "resource-announce", children: "Post announcement in feed" }), _jsx(Switch, { id: "resource-announce", checked: postAnnouncement, onCheckedChange: setPostAnnouncement })] })] }), _jsxs(DialogFooter, { children: [_jsx(Button, { variant: "outline", onClick: () => onOpenChange(false), children: "Cancel" }), _jsx(Button, { onClick: handleSubmit, disabled: !title || (type === "link" && !url), children: "Add Resource" })] })] }) }));
};
//# sourceMappingURL=tool-action-modals.js.map