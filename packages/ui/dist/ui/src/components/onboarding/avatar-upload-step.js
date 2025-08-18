"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../card';
import { Button } from '../button';
import { Loader2 } from 'lucide-react';
export const AvatarUploadStep = ({ onSubmit, onSkip }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const handleFileChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);
        }
    };
    const handleSubmit = async () => {
        if (!selectedFile)
            return;
        setIsLoading(true);
        try {
            await onSubmit({ file: selectedFile });
        }
        catch {
            // console.error("Failed to upload avatar:", error);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleSkip = () => {
        if (onSkip) {
            onSkip();
        }
        else {
            void onSubmit(null);
        }
    };
    return (_jsxs(Card, { className: "w-full max-w-lg bg-card border-border", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-card-foreground", children: "Upload your avatar" }), _jsx(CardDescription, { className: "text-muted-foreground", children: "Choose a profile picture to help others recognize you." })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "flex flex-col items-center gap-4", children: [_jsx("input", { type: "file", accept: "image/*", onChange: handleFileChange, className: "hidden", id: "avatar-upload" }), _jsx("label", { htmlFor: "avatar-upload", className: "cursor-pointer bg-surface-01 hover:bg-surface-02 text-foreground px-4 py-2 rounded-md transition-colors", children: "Choose file" }), selectedFile && (_jsxs("div", { className: "text-muted-foreground", children: ["Selected: ", selectedFile.name] }))] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { type: "button", variant: "outline", onClick: handleSkip, className: "flex-1", children: "Skip for now" }), _jsxs(Button, { type: "button", variant: "default", onClick: handleSubmit, className: "flex-1", disabled: !selectedFile || isLoading, children: [isLoading ? (_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" })) : null, "Upload"] })] })] })] }));
};
//# sourceMappingURL=avatar-upload-step.js.map