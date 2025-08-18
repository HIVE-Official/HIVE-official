"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from "../button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../card";
import { Input } from "../input";
import { Label } from "../label";
import { Textarea } from "../textarea";
import { Loader2 } from "lucide-react";
export const ClaimSpaceStep = ({ spaceName, spaceDescription, onSpaceNameChange, onSpaceDescriptionChange, onSubmit, isLoading, onBack, }) => {
    return (_jsxs(Card, { className: "w-full max-w-lg bg-card border-border", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-card-foreground", children: "Claim Your Space" }), _jsx(CardDescription, { className: "text-muted-foreground", children: "Create your own space to build and collaborate with others." })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "spaceName", children: "Space Name" }), _jsx(Input, { id: "spaceName", value: spaceName, onChange: (e) => onSpaceNameChange(e.target.value), placeholder: "e.g., UB Computer Science", required: true })] }), _jsxs("div", { className: "space-y-2", children: [_jsx(Label, { htmlFor: "spaceDescription", children: "Description" }), _jsx(Textarea, { id: "spaceDescription", value: spaceDescription, onChange: (e) => onSpaceDescriptionChange(e.target.value), placeholder: "What's this space about?", required: true })] })] }), _jsxs("div", { className: "flex gap-2", children: [onBack && (_jsx(Button, { type: "button", variant: "outline", onClick: onBack, className: "flex-1", children: "Back" })), _jsxs(Button, { type: "button", variant: "default", onClick: onSubmit, className: "flex-1", disabled: isLoading || !spaceName || !spaceDescription, children: [isLoading ? (_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" })) : null, "Continue"] })] })] })] }));
};
//# sourceMappingURL=claim-space-step.js.map