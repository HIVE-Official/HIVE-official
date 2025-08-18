"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../button";
import { Card, CardContent, CardHeader, CardTitle } from "../card";
import { Input } from "../input";
import { Label } from "../label";
import { Textarea } from "../textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { Crown, Users, Calendar, CheckCircle, AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
// Connection options based on space category
const CONNECTION_OPTIONS = {
    academic: [
        { value: "major", label: "I'm a student in this major/department" },
        { value: "ta", label: "I'm a TA or have been in this program" },
        { value: "tutor", label: "I tutor in this subject area" },
        { value: "leader", label: "I lead study groups or academic activities" },
        { value: "other", label: "Other (please explain)" },
    ],
    residential: [
        { value: "resident", label: "I live in this residence hall/area" },
        { value: "ra", label: "I'm an RA or floor leader" },
        { value: "former", label: "I previously lived here and stayed connected" },
        { value: "leader", label: "I organize events in this area" },
        { value: "other", label: "Other (please explain)" },
    ],
    social: [
        { value: "member", label: "I'm actively involved in this community" },
        { value: "organizer", label: "I organize events or activities" },
        { value: "founder", label: "I helped start this group/activity" },
        { value: "leader", label: "I have leadership experience in this area" },
        { value: "other", label: "Other (please explain)" },
    ],
    professional: [
        { value: "experience", label: "I have experience in this field" },
        { value: "internship", label: "I've interned or worked in this area" },
        { value: "leader", label: "I lead professional development activities" },
        { value: "network", label: "I have strong networks in this field" },
        { value: "other", label: "Other (please explain)" },
    ],
};
// First tool options
const FIRST_TOOL_OPTIONS = [
    { value: "events", label: "Event Calendar", description: "Schedule regular meetups and activities" },
    { value: "resources", label: "Resource Library", description: "Share study materials and helpful links" },
    { value: "discussions", label: "Discussion Board", description: "Start conversations and Q&A" },
    { value: "announcements", label: "Announcements", description: "Keep everyone updated on important news" },
    { value: "polls", label: "Polls & Surveys", description: "Gather input from the community" },
    { value: "marketplace", label: "Marketplace", description: "Buy/sell textbooks and items" },
];
export const SpaceActivationRequestForm = ({ space, onSubmit, onCancel, }) => {
    const [connection, setConnection] = useState("");
    const [connectionDetails, setConnectionDetails] = useState("");
    const [reason, setReason] = useState("");
    const [firstTool, setFirstTool] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const connectionOptions = CONNECTION_OPTIONS[space.category] || CONNECTION_OPTIONS.social;
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await onSubmit({
                connection,
                connectionDetails: connection === "other" ? connectionDetails : undefined,
                reason,
                firstTool,
            });
            setShowSuccess(true);
            setTimeout(() => {
                onCancel(); // Close form after success
            }, 2000);
        }
        catch (error) {
            console.error("Failed to submit activation request:", error);
            setIsSubmitting(false);
        }
    };
    if (showSuccess) {
        return (_jsx(Card, { className: "w-full max-w-2xl bg-surface border-border", children: _jsx(CardContent, { className: "pt-6", children: _jsxs("div", { className: "text-center space-y-4", children: [_jsx("div", { className: "w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto", children: _jsx(CheckCircle, { className: "w-8 h-8 text-accent" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-xl font-display font-semibold text-foreground mb-2", children: "Request Submitted!" }), _jsxs("p", { className: "text-muted-foreground", children: ["Your activation request for ", _jsx("strong", { children: space.name }), " has been submitted. You'll receive an email within 24 hours with the decision."] })] })] }) }) }));
    }
    return (_jsxs(Card, { className: "w-full max-w-2xl bg-surface border-border", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Button, { variant: "ghost", size: "sm", onClick: onCancel, className: "p-2", children: _jsx(ArrowLeft, { className: "w-4 h-4" }) }), _jsxs("div", { className: "flex-1", children: [_jsxs(CardTitle, { className: "text-xl font-display text-foreground", children: ["Request to Lead: ", space.name] }), _jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Help us understand why you're the right leader for this space" })] })] }) }), _jsx(CardContent, { children: _jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [_jsxs("div", { className: "p-4 bg-background rounded-lg border border-border", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx(Crown, { className: "w-5 h-5 text-accent" }), _jsx("h3", { className: "font-display font-semibold text-foreground", children: "Space Overview" })] }), _jsx("p", { className: "text-sm text-muted-foreground mb-3", children: space.description }), _jsxs("div", { className: "flex items-center gap-4 text-sm", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "w-4 h-4 text-muted-foreground" }), _jsxs("span", { className: "text-foreground", children: [space.potentialMembers.toLocaleString(), " potential members"] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Calendar, { className: "w-4 h-4 text-muted-foreground" }), _jsxs("span", { className: "text-foreground", children: [space.rssEvents.length, " upcoming events"] })] })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { className: "text-base font-medium text-foreground", children: "How are you connected to this space?" }), _jsxs(Select, { value: connection, onValueChange: setConnection, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Select your connection..." }) }), _jsx(SelectContent, { children: connectionOptions.map((option) => (_jsx(SelectItem, { value: option.value, children: option.label }, option.value))) })] })] }), connection === "other" && (_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { className: "text-base font-medium text-foreground", children: "Please explain your connection" }), _jsx(Input, { value: connectionDetails, onChange: (e) => setConnectionDetails(e.target.value), placeholder: "e.g., I'm president of a related club...", required: true })] })), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { className: "text-base font-medium text-foreground", children: "Why do you want to lead this space?" }), _jsx(Textarea, { value: reason, onChange: (e) => setReason(e.target.value), placeholder: "Share your vision for this space and what you hope to accomplish as its leader...", rows: 4, className: "resize-none", required: true }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Help us understand your motivation and plans for growing this community" })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { className: "text-base font-medium text-foreground", children: "What's the first tool you'd add to this space?" }), _jsx("div", { className: "grid gap-3", children: FIRST_TOOL_OPTIONS.map((tool) => (_jsx("div", { onClick: () => setFirstTool(tool.value), className: `p-3 border rounded-lg cursor-pointer transition-all ${firstTool === tool.value
                                            ? "border-accent bg-accent/5"
                                            : "border-border hover:border-accent/50 hover:bg-accent/5"}`, children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `w-4 h-4 rounded-full border-2 ${firstTool === tool.value
                                                        ? "border-accent bg-accent"
                                                        : "border-border"}`, children: firstTool === tool.value && (_jsx("div", { className: "w-full h-full bg-accent rounded-full" })) }), _jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-medium text-foreground", children: tool.label }), _jsx("p", { className: "text-sm text-muted-foreground", children: tool.description })] })] }) }, tool.value))) })] }), _jsxs("div", { className: "p-4 bg-background rounded-lg border border-border", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx(AlertCircle, { className: "w-4 h-4 text-accent" }), _jsx("h4", { className: "font-medium text-foreground", children: "What happens next?" })] }), _jsxs("ul", { className: "text-sm text-muted-foreground space-y-1", children: [_jsx("li", { children: "\u2022 We'll review your request within 24 hours" }), _jsx("li", { children: "\u2022 You'll receive an email with our decision" }), _jsx("li", { children: "\u2022 If approved, you'll get a welcome checklist to get started" }), _jsx("li", { children: "\u2022 The space will be activated and potential members notified" })] })] }), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: onCancel, className: "flex-1", disabled: isSubmitting, children: "Cancel" }), _jsx(Button, { type: "submit", className: "flex-1 bg-accent hover:bg-accent/90 text-background font-medium", disabled: isSubmitting ||
                                        !connection ||
                                        !reason ||
                                        !firstTool ||
                                        (connection === "other" && !connectionDetails), children: isSubmitting ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Submitting..."] })) : (_jsxs(_Fragment, { children: [_jsx(Crown, { className: "mr-2 h-4 w-4" }), "Submit Request"] })) })] })] }) })] }));
};
//# sourceMappingURL=space-activation-request-form.js.map